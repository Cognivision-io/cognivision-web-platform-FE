"use client";

import { Terminal } from "lucide-react";
import { AgentHero } from "@/features/agent/components/agent-hero";
import { AgentPromptInput } from "@/features/agent/components/agent-prompt-input";
import { AgentSuggestionChips } from "@/features/agent/components/agent-suggestion-chips";
import { AgentStreamingResponse } from "@/features/agent/components/agent-streaming-response";

export default function AgentPage() {
  return (
    <div className="flex min-h-[calc(100vh-7rem)] flex-col items-center justify-center gap-8 px-6 py-12 lg:px-10">
      <AgentHero />
      <AgentPromptInput />
      <AgentSuggestionChips />
      <AgentStreamingResponse />

      <div className="flex items-center gap-2 rounded-full border border-zinc-700/50 bg-zinc-900/60 px-4 py-2">
        <Terminal className="h-3.5 w-3.5 text-white" />
        <span className="text-xs text-white">
          VS Code Extension coming soon
        </span>
        <span className="rounded-full px-2 py-0.5 text-[10px] font-medium bg-primary text-white">
          CLI
        </span>
      </div>
    </div>
  );
}
