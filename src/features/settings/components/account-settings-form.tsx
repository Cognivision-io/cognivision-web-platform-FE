"use client";

import { FormEvent, useEffect, useState } from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomToast from "@/components/ui/sonner";
import { toast } from "sonner";
import { useUpdateUserMutation } from "@/features/auth/mutations/auth.mutation";
import { useAuthStore } from "@/stores/auth-store";

function splitDisplayName(value: string): { firstName: string; lastName: string | null } {
  const trimmed = value.trim();
  if (!trimmed) return { firstName: "", lastName: null };
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: null };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

export function AccountSettingsForm() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const { mutateAsync: triggerUpdateUser, isPending: isUpdating } = useUpdateUserMutation();

  const initialDisplayName =
    user == null
      ? ""
      : [user.firstName, user.lastName].filter(Boolean).join(" ").trim() ||
        user.username ||
        "";

  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setDisplayName(initialDisplayName);
  }, [initialDisplayName]);

  const resetForm = () => {
    setDisplayName(initialDisplayName);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user?.id) {
      CustomToast.error("You must be signed in to save changes.");
      return;
    }

    const pwdTouched =
      currentPassword.length > 0 || newPassword.length > 0 || confirmPassword.length > 0;
    if (pwdTouched) {
      toast("Password changes aren’t available in the app yet. Contact support to reset your password.");
      return;
    }

    const { firstName, lastName } = splitDisplayName(displayName);
    if (!firstName.trim()) {
      CustomToast.error("Please enter a display name.");
      return;
    }

    try {
      const response = await triggerUpdateUser({
        id: user.id,
        payload: {
          email: user.email,
          firstName: firstName.trim(),
          lastName: lastName?.trim() ? lastName.trim() : null,
        },
      });
      if (response?.data) {
        setUser(response.data);
      }
      CustomToast.success("Changes saved successfully.");
    } catch (error) {
      const message = (
        error as { response?: { data?: { message?: string | string[] } } }
      )?.response?.data?.message;
      if (Array.isArray(message)) {
        message.forEach((m) => CustomToast.error(m));
      } else if (typeof message === "string") {
        CustomToast.error(message);
      } else {
        CustomToast.error("Could not save changes. Please try again.");
      }
    }
  };

  return (
    <div className="bg-[#f4f7fe] px-4 py-6 md:px-8 md:py-6">
      <div className="mx-auto w-full max-w-[1280px]">
        <form
          onSubmit={handleSubmit}
          className="rounded-[14px] border border-[#e2e8f0] bg-white shadow-sm"
        >
          <div className="border-b border-[#f1f5f9] px-8 pb-6 pt-8">
            <h1 className="text-[18px] font-semibold tracking-[-0.3px] text-[#2b2b2b]">
              Account Information
            </h1>
            <p className="mt-1 text-[13px] font-normal leading-relaxed text-[#94a3b8]">
              Manage your personal details and account settings
            </p>
          </div>

          <div className="space-y-7 px-8 py-8">
            <div className="space-y-2">
              <label htmlFor="displayName" className="text-[13px] font-medium text-[#2b2b2b]">
                Display Name
              </label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="h-[41.2px] rounded-[7px] border-[#e2e8f0] text-[14px] text-[#2b2b2b] shadow-none"
                autoComplete="name"
              />
              <p className="text-[12px] font-normal leading-[1.5] text-[#94a3b8]">
                This is how your name will appear in the portal
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-[13px] font-medium text-[#2b2b2b]">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={user?.email ?? ""}
                readOnly
                disabled
                className="h-[41.2px] cursor-not-allowed rounded-[7px] border-[#e2e8f0] bg-[#f4f7fe] text-[14px] text-[#94a3b8] shadow-none"
              />
              <p className="text-[12px] font-normal leading-[1.5] text-[#94a3b8]">
                Contact support to change your email address
              </p>
            </div>

            <div className="h-px bg-[#f1f5f9]" aria-hidden />

            <div className="space-y-2">
              <label htmlFor="currentPassword" className="text-[13px] font-medium text-[#2b2b2b]">
                Current Password
              </label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="h-[41.2px] rounded-[7px] border-[#e2e8f0] text-[14px] shadow-none placeholder:text-[#94a3b8]"
                autoComplete="current-password"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="newPassword" className="text-[13px] font-medium text-[#2b2b2b]">
                New Password
              </label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="h-[41.2px] rounded-[7px] border-[#e2e8f0] text-[14px] shadow-none placeholder:text-[#94a3b8]"
                autoComplete="new-password"
              />
              <p className="text-[12px] font-normal leading-[1.5] text-[#94a3b8]">
                Password must be at least 8 characters long
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-[13px] font-medium text-[#2b2b2b]">
                Confirm New Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="h-[41.2px] rounded-[7px] border-[#e2e8f0] text-[14px] shadow-none placeholder:text-[#94a3b8]"
                autoComplete="new-password"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                type="submit"
                disabled={isUpdating}
                className="h-[36.4px] gap-2 rounded-[7px] bg-[#5925dc] px-5 text-[13px] font-medium text-white hover:bg-[#5925dc]/90"
              >
                <Check className="size-[15px]" strokeWidth={2.5} aria-hidden />
                {isUpdating ? "Saving…" : "Save Changes"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                className="h-[36.4px] rounded-[7px] border-[#e2e8f0] bg-white px-5 text-[13px] font-medium text-[#2b2b2b] hover:bg-[#f8fafc]"
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
