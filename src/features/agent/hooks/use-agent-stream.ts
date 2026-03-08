"use client";

import { useCallback, useRef } from "react";
import { agentApi } from "@/features/agent/api/agent.api";
import { conversationApi } from "@/features/agent/api/conversation.api";
import { useAgentStore } from "@/stores/agent-store";
import type { AgentChatPayload, AgentDoneEvent } from "@/features/agent/types";

/** Parse a single SSE frame (one double-newline-delimited chunk). */
function parseSSEPart(part: string): {
  eventType: string;
  parsed: Record<string, unknown> | null;
  rawData: string;
} | null {
  const trimmed = part.trim();
  if (!trimmed) return null;

  const lines = trimmed.split("\n");
  let sseEvent = "";
  let sseData = "";

  for (const line of lines) {
    if (line.startsWith(":")) continue;

    if (line.startsWith("event: ")) {
      sseEvent = line.slice(7).trim();
    } else if (line.startsWith("data: ")) {
      sseData += line.slice(6);
    } else if (line.startsWith("data:")) {
      sseData += line.slice(5);
    }
  }

  if (!sseData) return null;

  let parsed: Record<string, unknown> | null = null;
  try {
    parsed = JSON.parse(sseData);
  } catch {
    // Not valid JSON
  }

  const eventType = sseEvent || (parsed?.event as string) || "token";
  return { eventType, parsed, rawData: sseData };
}

/**
 * Custom hook for consuming SSE streaming responses from the FastAPI agent.
 *
 * Token events carry plain text chunks → appended immediately for typewriter effect.
 * Done event carries structured blocks, conversation_id, suggested_questions.
 */
export function useAgentStream() {
  const abortRef = useRef<AbortController | null>(null);

  const setStreamingContent = useAgentStore((s) => s.setStreamingContent);
  const appendStreamingContent = useAgentStore((s) => s.appendStreamingContent);
  const setStreamingBlocks = useAgentStore((s) => s.setStreamingBlocks);
  const setStatus = useAgentStore((s) => s.setStatus);
  const addMessage = useAgentStore((s) => s.addMessage);
  const setConversationId = useAgentStore((s) => s.setConversationId);
  const setSuggestedQuestions = useAgentStore((s) => s.setSuggestedQuestions);
  const setTokensUsed = useAgentStore((s) => s.setTokensUsed);

  const startStream = useCallback(
    async (payload: AgentChatPayload) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setStreamingContent("");
      setStreamingBlocks([]);
      setSuggestedQuestions([]);
      setStatus("generating");

      let doneHandled = false;
      let savedTokensUsed: number | null = null;

      try {
        const response = await agentApi.streamChat(payload, controller.signal);
        const reader = response.body?.getReader();

        if (!reader) {
          throw new Error("No readable stream in response");
        }

        const decoder = new TextDecoder();
        let buffer = "";
        let fullContent = "";

        const handleEvent = (result: {
          eventType: string;
          parsed: Record<string, unknown> | null;
          rawData: string;
        }) => {
          if (result.eventType === "token") {
            const chunk =
              result.parsed !== null
                ? String(result.parsed.data ?? result.rawData)
                : result.rawData;

            fullContent += chunk;
            appendStreamingContent(chunk);
          } else if (result.eventType === "done") {
            doneHandled = true;
            const doneData = result.parsed as unknown as AgentDoneEvent | null;

            // Debug: log raw done event to verify usage structure
            console.log("[ARkitect] done event payload:", result.parsed);

            if (doneData) {
              setConversationId(doneData.conversation_id);
              setStreamingBlocks(doneData.blocks ?? []);
              setSuggestedQuestions(doneData.suggested_questions ?? []);

              // Extract usage — check both top-level and nested locations
              const usage =
                doneData.usage ??
                (result.parsed?.usage as AgentDoneEvent["usage"]);
              if (usage) {
                savedTokensUsed =
                  (usage.input_tokens ?? 0) + (usage.output_tokens ?? 0);
                setTokensUsed(savedTokensUsed);
              }

              addMessage({
                id: crypto.randomUUID(),
                role: "agent",
                content: fullContent,
                blocks: doneData.blocks,
                timestamp: new Date().toISOString(),
                suggestedQuestions: doneData.suggested_questions,
              });
            } else {
              addMessage({
                id: crypto.randomUUID(),
                role: "agent",
                content: fullContent,
                timestamp: new Date().toISOString(),
              });
            }
          }
        };

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          // Strip \r — backend sends \r\n line endings
          buffer += decoder.decode(value, { stream: true }).replace(/\r/g, "");

          const parts = buffer.split("\n\n");
          buffer = parts.pop() || "";

          for (const part of parts) {
            const result = parseSSEPart(part);
            if (result) handleEvent(result);
          }
        }

        // Process remaining buffer — catches the "done" event
        // (last message, may lack trailing \n\n)
        if (buffer.trim()) {
          const result = parseSSEPart(buffer);
          if (result) handleEvent(result);
        }

        // Fallback: stream ended without a "done" event
        if (!doneHandled && fullContent) {
          addMessage({
            id: crypto.randomUUID(),
            role: "agent",
            content: fullContent,
            timestamp: new Date().toISOString(),
          });
        }

        setStatus("completed");

        // Save conversation to backend
        if (fullContent) {
          conversationApi
            .create({
              prompt: payload.message,
              response: fullContent,
              tokensUsed: savedTokensUsed ?? undefined,
            })
            .catch((err) => {
              console.error("Failed to save conversation:", err);
            });
        }
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "AbortError") {
          setStatus("idle");
          return;
        }
        setStatus("failed");
        throw error;
      }
    },
    [
      setStreamingContent,
      appendStreamingContent,
      setStreamingBlocks,
      setStatus,
      addMessage,
      setConversationId,
      setSuggestedQuestions,
      setTokensUsed,
    ]
  );

  const stopStream = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setStatus("idle");
  }, [setStatus]);

  return { startStream, stopStream };
}
