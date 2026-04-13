"use client";

import { useCallback, useRef } from "react";

import type { AgentChatPayload } from "@/features/agent/types";
import { useAgentStore } from "@/store/agent-store";

/** Agent / conversation HTTP APIs are disabled; streaming is a no-op. */
export function useAgentStream() {
  const abortRef = useRef<AbortController | null>(null);

  const setStreamingContent = useAgentStore((s) => s.setStreamingContent);
  const setStreamingBlocks = useAgentStore((s) => s.setStreamingBlocks);
  const setStatus = useAgentStore((s) => s.setStatus);
  const setSuggestedQuestions = useAgentStore((s) => s.setSuggestedQuestions);

  const startStream = useCallback(
    async (_payload: AgentChatPayload) => {
      abortRef.current?.abort();
      setStreamingContent("");
      setStreamingBlocks([]);
      setSuggestedQuestions([]);
      setStatus("failed");
    },
    [setStreamingContent, setStreamingBlocks, setSuggestedQuestions, setStatus],
  );

  const stopStream = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setStatus("idle");
  }, [setStatus]);

  return { startStream, stopStream };
}
