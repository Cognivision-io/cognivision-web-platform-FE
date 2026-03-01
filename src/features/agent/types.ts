export type AgentPlatform = "react-native" | "swift" | "kotlin";

export type AgentJobStatus = "idle" | "generating" | "completed" | "failed";

// --- API types ---

export interface AgentChatPayload {
  message: string;
  conversation_id?: string;
}

export interface AgentBlock {
  type: "text" | "code";
  content: string;
  language: string | null;
  filename: string | null;
}

export interface AgentDoneEvent {
  event: "done";
  data: string;
  conversation_id: string;
  blocks: AgentBlock[];
  intent: string;
  sources: string[];
  suggested_questions: string[];
}

// --- SSE event shapes ---

export interface AgentTokenEvent {
  event: "token";
  data: string;
}

export type AgentSSEEvent = AgentTokenEvent | AgentDoneEvent;

// --- Store / UI types ---

export interface AgentMessage {
  id: string;
  role: "user" | "agent";
  content: string;
  blocks?: AgentBlock[];
  timestamp: string;
  suggestedQuestions?: string[];
}
