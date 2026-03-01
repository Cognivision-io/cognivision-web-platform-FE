"use client";

import { useState, useRef, useEffect } from "react";
import { Check, Copy } from "lucide-react";
import { useAgentStore } from "@/stores/agent-store";
import { cn } from "@/lib/utils";
import type { AgentBlock } from "@/features/agent/types";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center gap-1 rounded px-2 py-1 text-xs text-zinc-400 transition-colors hover:text-zinc-200"
    >
      {copied ? (
        <>
          <Check className="h-3 w-3" /> Copied
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" /> Copy
        </>
      )}
    </button>
  );
}

function CodeBlock({ block }: { block: AgentBlock }) {
  return (
    <div className="my-3 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-950">
      <div className="flex items-center justify-between border-b border-zinc-700 px-4 py-2">
        <span className="text-xs text-zinc-400">
          {block.filename || block.language || "code"}
        </span>
        <CopyButton text={block.content} />
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-zinc-100">
        <code>{block.content}</code>
      </pre>
    </div>
  );
}

function TextBlock({ block }: { block: AgentBlock }) {
  return (
    <div className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-200">
      {block.content}
    </div>
  );
}

function BlockRenderer({ blocks }: { blocks: AgentBlock[] }) {
  return (
    <div className="space-y-2">
      {blocks.map((block, i) =>
        block.type === "code" ? (
          <CodeBlock key={i} block={block} />
        ) : (
          <TextBlock key={i} block={block} />
        )
      )}
    </div>
  );
}

export function AgentStreamingResponse() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const streamingContent = useAgentStore((s) => s.streamingContent);
  const status = useAgentStore((s) => s.status);
  const messages = useAgentStore((s) => s.messages);
  const suggestedQuestions = useAgentStore((s) => s.suggestedQuestions);
  const setPrompt = useAgentStore((s) => s.setPrompt);

  const isStreaming = status === "generating";
  const hasContent = streamingContent.length > 0 || messages.length > 0;

  // Auto-scroll to bottom on new content
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [streamingContent, messages]);

  if (!hasContent && !isStreaming) return null;

  return (
    <div className="w-full max-w-2xl">
      <div className="overflow-hidden rounded-2xl border border-zinc-700/50 bg-zinc-900 shadow-lg">
        {/* Scrollable chat area */}
        <div
          ref={scrollRef}
          className="max-h-112 space-y-4 overflow-y-auto p-5"
        >
          {/* Previous messages */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "rounded-xl px-4 py-3",
                msg.role === "user"
                  ? "ml-auto max-w-[80%] bg-primary text-sm text-primary-foreground"
                  : "mr-auto max-w-full bg-zinc-800/60 text-zinc-200"
              )}
            >
              {msg.role === "agent" && msg.blocks && msg.blocks.length > 0 ? (
                <BlockRenderer blocks={msg.blocks} />
              ) : (
                <div className="whitespace-pre-wrap text-sm">
                  {msg.content}
                </div>
              )}
            </div>
          ))}

          {/* Streaming response (live tokens) */}
          {isStreaming && (
            <div className="mr-auto max-w-full rounded-xl bg-zinc-800/60 px-4 py-3">
              <div className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-200">
                {streamingContent || (
                  <span className="text-zinc-500">Thinking...</span>
                )}
                <span className="ml-0.5 inline-block h-4 w-1 animate-pulse bg-primary" />
              </div>
            </div>
          )}
        </div>

        {/* Suggested questions — inside the container, below the chat */}
        {!isStreaming && suggestedQuestions.length > 0 && (
          <div className="border-t border-zinc-700/50 px-5 py-3">
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setPrompt(q)}
                  className="rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:border-primary hover:text-primary"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
