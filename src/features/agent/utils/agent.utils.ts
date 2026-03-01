import type { AgentPlatform } from "@/features/agent/types";

export const PLATFORM_LABELS: Record<AgentPlatform, string> = {
  "react-native": "React Native",
  swift: "Swift",
  kotlin: "Kotlin",
};

export const SUGGESTION_PROMPTS = [
  "AR product viewer for e-commerce",
  "Indoor navigation with object detection",
  "AR measurement tool for construction",
  "Real-time defect detection overlay",
  "AR furniture placement app",
  "Interactive AR learning experience",
];
