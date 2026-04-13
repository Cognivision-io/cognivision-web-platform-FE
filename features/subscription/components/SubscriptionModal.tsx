"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  BillingCycle,
  CreateSubscriptionPayload,
} from "@/types/subscription.interface";
import { useCreateSubscriptionMutation } from "@/features/subscription/mutations/subscription.mutation";
import { SubscriptionPlanKey } from "@/features/subscription/types";
import { useAuthStore } from "@/store/auth-store";
import { useSubscriptionModalStore } from "@/store/subscription-modal-store";
import CustomToast from "@/components/ui/sonner";

const PLAN_DETAILS: Record<
  SubscriptionPlanKey,
  {
    name: string;
    description: string;
    order: number;
    status: boolean;
    price: Record<BillingCycle, number>;
  }
> = {
  public: {
    name: "Public Plan",
    description: "Keep using the free tier for exploration and open research.",
    order: 1,
    status: true,
    price: { monthly: 0, annual: 0 },
  },
  core: {
    name: "Core Plan",
    description:
      "Unlock private data, extra credits, and unlimited projects for small teams.",
    order: 2,
    status: true,
    price: { monthly: 99, annual: 79 },
  },
  enterprise: {
    name: "Enterprise Plan",
    description:
      "Production-grade deployments with dedicated support and advanced controls.",
    order: 3,
    status: true,
    price: { monthly: 29.99, annual: 199 },
  },
};

const PLAN_LABELS: Record<SubscriptionPlanKey, string> = {
  public: "Public",
  core: "Core",
  enterprise: "Enterprise",
};

const SubscriptionModal = () => {
  const { isOpen, planKey, closeModal } = useSubscriptionModalStore();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const { mutateAsync, isPending } = useCreateSubscriptionMutation();
  const refreshUser = useAuthStore((state) => state.refreshUserFromSession);

  useEffect(() => {
    if (isOpen) {
      setBillingCycle("monthly");
    }
  }, [isOpen]);

  const plan = planKey ? PLAN_DETAILS[planKey] : undefined;
  const planTitle = planKey
    ? `Upgrade to ${PLAN_LABELS[planKey]}`
    : "Create subscription";
  const planDescription = planKey
    ? `You are requesting the ${PLAN_LABELS[planKey]} tier.`
    : "Create or update a subscription.";

  const currentPrice = plan ? plan.price[billingCycle] : 0;

  const handleConfirm = async () => {
    if (!plan || !planKey) return;

    const payload: CreateSubscriptionPayload = {
      name: plan.name,
      description: plan.description,
      price: currentPrice,
      billingCycle,
      status: plan.status,
      order: plan.order,
    };

    try {
      await mutateAsync(payload);
      CustomToast.success("Subscription created successfully");
      closeModal();
      void refreshUser();
    } catch (error: unknown) {
      const message = (error as { response?: { data?: { message?: string } } })
        ?.response?.data?.message;
      CustomToast.error(
        typeof message === "string" ? message : "Failed to create subscription",
      );
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="max-w-xl space-y-6">
        <DialogHeader className="space-y-1">
          <DialogTitle>{planTitle}</DialogTitle>
          <DialogDescription>{planDescription}</DialogDescription>
        </DialogHeader>

        <section className="space-y-4">
          <div className="space-y-2 border-b border-dashed border-slate-200 pb-4">
            <p className="text-sm text-muted-foreground">Billing cycle</p>
            <div className="flex gap-2">
              {(["monthly", "annual"] as const).map((cycle) => (
                <Button
                  key={cycle}
                  variant={billingCycle === cycle ? "secondary" : "outline"}
                  className="flex-1"
                  onClick={() => setBillingCycle(cycle)}
                >
                  {cycle === "monthly" ? "Monthly" : "Annual"}
                </Button>
              ))}
            </div>
          </div>

          {plan && (
            <div className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-lg font-semibold">{plan.name}</p>
              <p className="text-sm text-muted-foreground">
                {plan.description}
              </p>
              <div className="text-3xl font-bold">
                ${currentPrice.toFixed(2)}
              </div>
              {billingCycle === "annual" && (
                <p className="text-xs text-muted-foreground">
                  Billed annually (${(currentPrice * 12).toFixed(2)} total)
                </p>
              )}
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Order #{plan.order}
              </p>
            </div>
          )}
        </section>

        <DialogFooter>
          <Button
            className="w-full"
            disabled={isPending || !plan}
            onClick={handleConfirm}
          >
            {isPending ? "Processing..." : "Confirm Upgrade"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
