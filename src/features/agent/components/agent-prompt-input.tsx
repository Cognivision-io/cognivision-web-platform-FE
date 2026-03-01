"use client";

import { useRef, useCallback, type KeyboardEvent } from "react";
import { Send, Smartphone, Apple, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAgentStore } from "@/stores/agent-store";
import { useAgentStream } from "@/features/agent/hooks/use-agent-stream";
import { PLATFORM_LABELS } from "@/features/agent/utils/agent.utils";
import type { AgentPlatform } from "@/features/agent/types";

const PLATFORM_ICONS: Record<AgentPlatform, React.ElementType> = {
  "react-native": Smartphone,
  swift: Apple,
  kotlin: Code2,
};

export function AgentPromptInput() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { startStream, stopStream } = useAgentStream();

  const prompt = useAgentStore((s) => s.prompt);
  const setPrompt = useAgentStore((s) => s.setPrompt);
  const platform = useAgentStore((s) => s.platform);
  const setPlatform = useAgentStore((s) => s.setPlatform);
  const conversationId = useAgentStore((s) => s.conversationId);
  const status = useAgentStore((s) => s.status);
  const addMessage = useAgentStore((s) => s.addMessage);

  const isStreaming = status === "generating";

  const handleSubmit = useCallback(() => {
    const trimmed = prompt.trim();
    if (!trimmed || isStreaming) return;

    addMessage({
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
      timestamp: new Date().toISOString(),
    });

    startStream({
      message: trimmed,
      ...(conversationId ? { conversation_id: conversationId } : {}),
    });
    setPrompt("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [prompt, conversationId, isStreaming, startStream, setPrompt, addMessage]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
    }
  };

  const PlatformIcon = PLATFORM_ICONS[platform];

  return (
    <div className="w-full max-w-2xl">
      <div className="rounded-2xl border border-border bg-zinc-900 p-4 shadow-lg">
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          placeholder="Describe the AR mobile app you want to build..."
          rows={1}
          className="w-full resize-none border-0 bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-0"
        />

        <div className="mt-3 flex items-center justify-between">
          {/* Platform selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg bg-zinc-800 px-3 py-1.5 text-xs text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-white/10"
              >
                <PlatformIcon className="h-4 w-4" />
                <span>{PLATFORM_LABELS[platform]}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {(Object.keys(PLATFORM_LABELS) as AgentPlatform[]).map((p) => {
                const Icon = PLATFORM_ICONS[p];
                return (
                  <DropdownMenuItem
                    key={p}
                    onClick={() => setPlatform(p)}
                    className={cn(platform === p && "bg-accent")}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {PLATFORM_LABELS[p]}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Submit / Stop button */}
          {isStreaming ? (
            <Button
              size="sm"
              variant="destructive"
              onClick={stopStream}
              className="h-8 w-8 rounded-full p-0"
            >
              <div className="h-3 w-3 rounded-sm bg-white" />
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={!prompt.trim()}
              className="h-8 w-8 rounded-full p-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
