import { create } from "zustand";

import { SubscriptionPlanKey } from "@/features/subscription/types";

type SubscriptionModalState = {
  isOpen: boolean;
  planKey?: SubscriptionPlanKey;
  openModal: (planKey?: SubscriptionPlanKey) => void;
  closeModal: () => void;
};

export const useSubscriptionModalStore = create<SubscriptionModalState>((set) => ({
  isOpen: false,
  planKey: undefined,
  openModal: (planKey) => set({ isOpen: true, planKey }),
  closeModal: () => set({ isOpen: false, planKey: undefined }),
}));
