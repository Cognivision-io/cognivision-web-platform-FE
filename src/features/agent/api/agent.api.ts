import type { AgentChatPayload } from "@/features/agent/types";

const AGENT_BASE_URL =
  process.env.NEXT_PUBLIC_AGENT_API_URL || "https://cogni-bot.yameenyousuf.com/api/v1";

export const agentApi = {
 
  streamChat: async (
    payload: AgentChatPayload,
    signal?: AbortSignal
  ): Promise<Response> => {
    const response = await fetch(`${AGENT_BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify(payload),
      signal,
    });

    if (!response.ok) {
      throw new Error(
        `Agent stream failed: ${response.status} ${response.statusText}`
      );
    }

    return response;
  },
};
