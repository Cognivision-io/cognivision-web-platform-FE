import { create } from "zustand";
import type {
  AgentPlatform,
  AgentJobStatus,
  AgentMessage,
  AgentBlock,
} from "@/features/agent/types";

type AgentStore = {
  prompt: string;
  setPrompt: (prompt: string) => void;

  platform: AgentPlatform;
  setPlatform: (platform: AgentPlatform) => void;

  conversationId: string | null;
  setConversationId: (id: string | null) => void;

  messages: AgentMessage[];
  addMessage: (message: AgentMessage) => void;
  clearMessages: () => void;

  streamingContent: string;
  setStreamingContent: (content: string) => void;
  appendStreamingContent: (chunk: string) => void;

  streamingBlocks: AgentBlock[];
  setStreamingBlocks: (blocks: AgentBlock[]) => void;

  suggestedQuestions: string[];
  setSuggestedQuestions: (questions: string[]) => void;

  status: AgentJobStatus;
  setStatus: (status: AgentJobStatus) => void;

  reset: () => void;
};

const initialState = {
  prompt: "",
  platform: "react-native" as AgentPlatform,
  conversationId: null as string | null,
  messages: [] as AgentMessage[],
  streamingContent: "",
  streamingBlocks: [] as AgentBlock[],
  suggestedQuestions: [] as string[],
  status: "idle" as AgentJobStatus,
};

export const useAgentStore = create<AgentStore>((set) => ({
  ...initialState,

  setPrompt: (prompt) => set({ prompt }),

  setPlatform: (platform) => set({ platform }),

  setConversationId: (id) => set({ conversationId: id }),

  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  clearMessages: () => set({ messages: [], conversationId: null }),

  setStreamingContent: (content) => set({ streamingContent: content }),

  appendStreamingContent: (chunk) =>
    set((state) => ({ streamingContent: state.streamingContent + chunk })),

  setStreamingBlocks: (blocks) => set({ streamingBlocks: blocks }),

  setSuggestedQuestions: (questions) =>
    set({ suggestedQuestions: questions }),

  setStatus: (status) => set({ status }),

  reset: () => set(initialState),
}));
