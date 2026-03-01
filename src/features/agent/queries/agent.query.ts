/**
 * Agent query keys for React Query.
 * Currently the agent uses SSE streaming via useAgentStream hook.
 * These keys are reserved for future REST-based conversation history endpoints.
 */
export const AGENT_CONVERSATIONS_QUERY_KEY = ["agent", "conversations"] as const;
export const AGENT_CONVERSATION_QUERY_KEY = ["agent", "conversation"] as const;
