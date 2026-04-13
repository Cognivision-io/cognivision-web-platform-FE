"use client";

import { useAgentStore } from "@/store/agent-store";
import { SUGGESTION_PROMPTS } from "@/features/agent/utils/agent.utils";

export function AgentSuggestionChips() {
  const setPrompt = useAgentStore((s) => s.setPrompt);
  const status = useAgentStore((s) => s.status);
  const messages = useAgentStore((s) => s.messages);

  // Hide chips once a conversation has started
  if (messages.length > 0 || status === "generating") return null;

  return (
    <div className="flex max-w-2xl flex-wrap items-center justify-center gap-2">
      {SUGGESTION_PROMPTS.map((suggestion) => (
        <button
          key={suggestion}
          type="button"
          onClick={() => setPrompt(suggestion)}
          className="rounded-full border border-border bg-white px-4 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}
