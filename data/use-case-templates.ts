import type { LucideIcon } from "lucide-react";
import { Dumbbell, Gamepad2, Sprout, Store, Stethoscope } from "lucide-react";
export type UseCaseTemplate = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tagline: string;
  heroTitle: string;
  heroDescription: string;
  highlights: string[];
  videoTitle: string;
  videoDuration: string;
  videoSubtitle: string;
  serverStatus: {
    label: string;
    value: string;
    description: string;
  };
  modelStatus: {
    label: string;
    value: string;
    description: string;
  };
  preview: {
    label: string;
    meta: string;
    image: string;
    tags: string[];
  };
};

export const useCaseTemplates: UseCaseTemplate[] = [
  {
    id: "sports",
    title: "Sports",
    description:
      "Detect balls, track players, and create high-impact coaching overlays powered by Cognivision.",
    icon: Dumbbell,
    tagline: "Explore our sports use case SDK",
    heroTitle: "Build smarter sports apps with our Vision SDK.",
    heroDescription:
      "Upload your pre-built dataset or start from scratch — Cognivision lets you ingest raw match footage, label it with smart tools, and train custom models for live broadcasts in minutes.",
    highlights: [
      "Player tracking templates",
      "Instant AR measurement",
      "32ms edge inference",
    ],
    videoTitle: "Demo video",
    videoDuration: "02:18",
    videoSubtitle: "Live capture powered by Cognivision Edge",
    serverStatus: {
      label: "Server started",
      value: "Stadium node online",
      description: "Latency steady at 32ms",
    },
    modelStatus: {
      label: "Model loaded",
      value: "SportsVision v2.2",
      description: "Players • ball • custom events",
    },
    preview: {
      label: "Live inference preview",
      meta: "SportsVision overlay",
      image: "/Resources1UseCase.png",
      tags: ["Player tags", "Speed heatmap", "Offside alerts"],
    },
  },
  // {
  //   id: "retail",
  //   title: "Retail",
  //   description:
  //     "Audit shelves, measure footfall, and detect pricing issues with real-time computer vision.",
  //   icon: Store,
  //   tagline: "Explore our retail SDK",
  //   heroTitle: "Bring visual AI to every store.",
  //   heroDescription:
  //     "Quantify shelf health, locate empty facings, and guide associates with AR instructions generated from any in-store camera or smartphone stream.",
  //   highlights: ["Planogram checks", "Price tag reading", "Footfall heatmaps"],
  //   videoTitle: "Planogram walkthrough",
  //   videoDuration: "01:52",
  //   videoSubtitle: "Shelf audit from mobile capture",
  //   serverStatus: {
  //     label: "Server started",
  //     value: "Store hub synced",
  //     description: "Edge ingest every 5s",
  //   },
  //   modelStatus: {
  //     label: "Model loaded",
  //     value: "ShelfIntel v1.5",
  //     description: "Facing fill • product mix",
  //   },
  //   preview: {
  //     label: "Planogram overlay",
  //     meta: "Retail QA flow",
  //     image: "/Resources2UseCase.png",
  //     tags: ["SKU tags", "Restock cues", "Compliance"],
  //   },
  // },
  {
    id: "gaming",
    title: "Gaming",
    description:
      "Stream XR-ready scene data, classify player gestures, and deliver immersive HUDs.",
    icon: Gamepad2,
    tagline: "Explore our gaming SDK",
    heroTitle: "Deliver immersive gaming HUDs with Cognivision.",
    heroDescription:
      "Blend camera feeds with real-time segmentation to power AR mini-maps, spectator overlays, or training simulators that react to every move.",
    highlights: ["Gesture capture", "XR overlays", "Latency-aware streaming"],
    videoTitle: "Immersive demo",
    videoDuration: "03:04",
    videoSubtitle: "Mixed reality spectator feed",
    serverStatus: {
      label: "Server started",
      value: "Arena XR core",
      description: "Synced to Unreal plugin",
    },
    modelStatus: {
      label: "Model loaded",
      value: "GameSense v3.0",
      description: "Gesture • props • spatial anchors",
    },
    preview: {
      label: "Spectator overlay",
      meta: "Gaming HUD preview",
      image: "/Resources3UseCase.png",
      tags: ["Gesture tags", "Spatial mesh", "Scene notes"],
    },
  },
  // {
  //   id: "healthcare",
  //   title: "Healthcare",
  //   description:
  //     "Detect wounds, lesions, or anatomy landmarks with privacy-first workflows.",
  //   icon: Stethoscope,
  //   tagline: "Explore our healthcare SDK",
  //   heroTitle: "Scale diagnostic workflows with Cognivision.",
  //   heroDescription:
  //     "Standardize documentation, triage scans, and build longitudinal tracking with templates tuned for telehealth, wound care, and radiology assist.",
  //   highlights: [
  //     "HIPAA-ready storage",
  //     "Measurement overlays",
  //     "Longitudinal tracking",
  //   ],
  //   videoTitle: "Clinical AI walkthrough",
  //   videoDuration: "02:05",
  //   videoSubtitle: "Dermatology triage capture",
  //   serverStatus: {
  //     label: "Server started",
  //     value: "Clinic edge online",
  //     description: "Encrypted hand-off verified",
  //   },
  //   modelStatus: {
  //     label: "Model loaded",
  //     value: "CareScan v1.8",
  //     description: "Lesion grading • edema detection",
  //   },
  //   preview: {
  //     label: "Clinical measurement overlay",
  //     meta: "Healthcare workflow",
  //     image: "/Resources4UseCase.png",
  //     tags: ["De-identification", "Progress charts", "Treatment guides"],
  //   },
  // },
];

export const getUseCaseTemplate = (id: string) => {
  console.log("Fetching use case template for id:", id);
  return useCaseTemplates.find((template) => template.id === id);
};
