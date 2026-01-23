"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Mail, UserX } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import CustomToast from "@/components/ui/sonner";
import {
  useDeleteUserMutation,
  useLogoutMutation,
  useUpdateUserMutation,
} from "@/features/auth/mutations/auth.mutation";
import {
  useGetSubscriptionQuery,
} from "@/features/subscription/mutations/subscription.mutation";
import { isValidEmail } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import { useSubscriptionModalStore } from "@/stores/subscription-modal-store";

const LoginSecurityPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const setUser = useAuthStore((state) => state.setUser);
  const { mutateAsync: triggerLogout, isPending: isLoggingOut } =
    useLogoutMutation();
  const { mutateAsync: triggerDeleteUser, isPending: isDeletingUser } =
    useDeleteUserMutation();
  const { mutateAsync: triggerUpdateUser, isPending: isUpdatingUser } =
    useUpdateUserMutation();
  const [isChangeEmailOpen, setIsChangeEmailOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const openSubscriptionModal = useSubscriptionModalStore(
    (state) => state.openModal
  );
  const subscriptionPlanId = user?.subscriptionPlans?.[0];
  const { data: subscriptionPlanResponse, isLoading: isPlanLoading } =
    useGetSubscriptionQuery(subscriptionPlanId);

  const subscriptionPlan = subscriptionPlanResponse?.data;
  const planPrice = subscriptionPlan?.price
    ? Number(subscriptionPlan.price)
    : 0;
  const planCycle = subscriptionPlan?.billingCycle ?? "monthly";
  const planCurrency = subscriptionPlan?.currency ?? "USD";
  const annualTotal =
    planCycle === "annual" ? (planPrice * 12).toFixed(2) : null;
  const planDisplayName = subscriptionPlan?.name ?? "Public Plan";
  const planPriceLabel = isPlanLoading
    ? "Loading..."
    : subscriptionPlan
      ? `$${planPrice.toFixed(2)}/mo`
      : "$0.00/mo";

  const displayName = useMemo(() => {
    if (!user) return "Hania Hasan";
    const composed = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
    if (composed.length > 0) {
      return composed;
    }
    return user.username ?? user.email ?? "Cognivision User";
  }, [user]);

  const initials = useMemo(() => {
    if (user?.firstName || user?.lastName) {
      const firstInitial = user.firstName?.[0] ?? "";
      const lastInitial = user.lastName?.[0] ?? "";
      const combined = `${firstInitial}${lastInitial}`.trim();
      return combined.toUpperCase() || "H";
    }
    return user?.email?.[0].toUpperCase() ?? "H";
  }, [user]);

  const providerLabel = useMemo(() => {
    const provider = user?.provider ?? "google";
    return provider.charAt(0).toUpperCase() + provider.slice(1);
  }, [user]);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    try {
      await triggerLogout();
      logout();
      CustomToast.success("Signed out successfully");
      router.replace("/login");
    } catch (error) {
      console.error("Failed to sign out", error);
      CustomToast.error("Failed to sign out. Please try again.");
    }
  };

  const handleDeleteAccount = async () => {
    if (isDeletingUser) return;
    if (!user?.id) {
      CustomToast.error("Unable to delete account. Please try again.");
      return;
    }

    try {
      await triggerDeleteUser(user.id);
      try {
        await triggerLogout();
      } catch (logoutError) {
        console.warn("Failed to sign out after deletion", logoutError);
      }
      logout();
      queryClient.clear();
      CustomToast.success("Account deleted successfully");
      router.replace("/login");
    } catch (error) {
      const message =
        (
          error as {
            response?: { data?: { message?: string | string[] } };
          }
        )?.response?.data?.message ?? "Failed to delete account";

      CustomToast.error(
        typeof message === "string" ? message : "Failed to delete account"
      );
    }
  };

  const handleChangeEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isUpdatingUser) return;
    if (!user?.id) {
      CustomToast.error("Unable to update email. Please try again.");
      return;
    }

    const trimmedEmail = newEmail.trim();
    if (!isValidEmail(trimmedEmail)) {
      CustomToast.error("Please enter a valid email address.");
      return;
    }

    try {
      const response = await triggerUpdateUser({
        id: user.id,
        payload: { email: trimmedEmail },
      });
      if (response?.data) {
        setUser(response.data);
      }
      CustomToast.success("Email updated successfully");
      setIsChangeEmailOpen(false);
      setNewEmail("");
    } catch (error) {
      const message = (
        error as { response?: { data?: { message?: string | string[] } } }
      )?.response?.data?.message;

      if (Array.isArray(message)) {
        message.forEach((msg) => CustomToast.error(msg));
      } else if (typeof message === "string") {
        CustomToast.error(message);
      } else {
        CustomToast.error("Failed to update email. Please try again.");
      }
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[32px] font-semibold text-[#141b2d]">
          Your Profile
        </h1>
      </div>

      <div className="rounded-lg border border-[#e0e5ff] bg-white px-5 py-5 shadow-[0_24px_50px_rgba(41,53,108,0.07)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="h-12 w-12 rounded-full bg-[#7b5cff] text-base font-semibold text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-base font-semibold text-[#1b2559]">
                {displayName}
              </p>
              <p className="text-[15px] text-[#6c7292]">
                {user?.email ?? "haniahasan825@gmail.com"}
              </p>
            </div>
          </div>
          <Button
            type="button"
            disabled={isLoggingOut}
            onClick={handleLogout}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#e0e4f8] bg-white px-3 text-sm font-semibold text-[#4b516f] shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition hover:border-[#cdd2f1] hover:text-[#2b3150]"
          >
            <LogOut className="h-4 w-4 text-[#9AA1C8]" />
            {isLoggingOut ? "Signing out..." : "Sign out"}
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-[#e0e5ff] bg-white px-5 py-6 shadow-[0_24px_50px_rgba(41,53,108,0.07)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9aa1c5]">
              Current Plan
            </p>
            <p className="text-lg font-semibold text-[#1b2559]">
              {isPlanLoading ? "Checking plan..." : planDisplayName}
            </p>
            <p className="text-sm text-[#6c7292]">
              {subscriptionPlan
                ? `${planCycle === "annual" ? "Annual billing" : "Monthly billing"} · ${planCurrency}`
                : "Public tier · Free"}
            </p>
            {subscriptionPlan && planCycle === "annual" && annualTotal && (
              <p className="text-xs text-[#9aa1c5]">
                ${annualTotal} billed once a year
              </p>
            )}
          </div>
          <div className="flex items-end gap-4">
            <div className="text-2xl font-bold text-[#141b2d]">
              {planPriceLabel}
            </div>
            <Button
              variant="outline"
              onClick={() => openSubscriptionModal("core")}
              className="h-10 rounded-xl px-4 text-sm font-semibold"
            >
              Upgrade Plan
            </Button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-[#1b2559]">Modify Account</h2>
        <div className="mt-4 flex flex-wrap gap-3">
            <Dialog open={isChangeEmailOpen} onOpenChange={setIsChangeEmailOpen}>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-xl border-[#d7dbef] bg-white px-4 text-sm font-semibold text-[#4b516f] shadow-[0_1px_2px_rgba(15,23,42,0.03)] hover:border-[#c3c8e4] hover:text-[#1e2748]"
              >
                <Mail className="h-4 w-4 text-[#8c94b6]" />
                Change Email
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[420px]">
              <DialogHeader>
                <DialogTitle>Change Email</DialogTitle>
                <DialogDescription>
                  Update your account email address.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleChangeEmail} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="newEmail" className="text-sm font-medium">
                    New Email Address
                  </label>
                  <Input
                    id="newEmail"
                    type="email"
                    placeholder="name@example.com"
                    value={newEmail}
                    onChange={(event) => setNewEmail(event.target.value)}
                    required
                    className="h-11"
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="h-10"
                    disabled={isUpdatingUser}
                  >
                    {isUpdatingUser ? "Updating..." : "Update Email"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
            </Dialog>
            <Button
            type="button"
            variant="outline"
            disabled={isDeletingUser}
            onClick={handleDeleteAccount}
            className="h-11 rounded-xl border-[#d7dbef] bg-white px-4 text-sm font-semibold text-[#4b516f] shadow-[0_1px_2px_rgba(15,23,42,0.03)] hover:border-[#c3c8e4] hover:text-[#8d1e1e]"
          >
            <UserX className="h-4 w-4 text-[#8c94b6]" />
            {isDeletingUser ? "Deleting..." : "Delete Account"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginSecurityPage;
