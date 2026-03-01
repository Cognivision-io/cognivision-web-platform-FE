/**
 * Agent mutation keys for React Query.
 * Currently the agent uses SSE streaming via useAgentStream hook.
 * These keys are reserved for future non-streaming mutation endpoints.
 */
export const AGENT_CHAT_MUTATION_KEY = ["agent", "chat"] as const;
