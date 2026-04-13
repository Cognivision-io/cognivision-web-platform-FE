"use client";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Check, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CustomToast from "@/components/ui/sonner";
import { useUpdateUserMutation } from "@/features/auth/mutations/auth.mutation";
import { USER_QUERY_KEY, useUserQuery } from "@/features/auth/queries/user.query";
import {
  loginSecurityFormSchema,
  type LoginSecurityFormValues,
} from "@/features/auth/schemas/login-security.schema";
import { useAuthStore } from "@/stores/auth-store";

const emptyPasswordDefaults = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
} as const;

export default function LoginSecurityPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const { data: profileFromApi, isLoading: profileLoading } = useUserQuery(
    user?.id,
  );

  const profile = profileFromApi ?? user;

  const { mutateAsync: triggerUpdateUser, isPending: isUpdating } =
    useUpdateUserMutation();

  const form = useForm<LoginSecurityFormValues>({
    resolver: yupResolver(loginSecurityFormSchema),
    defaultValues: {
      name: "",
      email: "",
      ...emptyPasswordDefaults,
    },
  });

  useEffect(() => {
    const p = profileFromApi ?? user;
    if (!p) return;
    form.reset({
      name: p.name?.trim() ?? "",
      email: p.email ?? "",
      ...emptyPasswordDefaults,
    });
  }, [user?.id, user?.name, user?.email, profileFromApi, form]);

  const resetToProfile = () => {
    const p = profileFromApi ?? user;
    if (p) {
      form.reset({
        name: p.name?.trim() ?? "",
        email: p.email ?? "",
        ...emptyPasswordDefaults,
      });
    } else {
      form.reset({
        name: "",
        email: "",
        ...emptyPasswordDefaults,
      });
    }
  };

  const onSubmit = async (values: LoginSecurityFormValues) => {
    if (!user?.id) {
      CustomToast.error("You must be signed in to save changes.");
      return;
    }

    const pwdTouched =
      values.currentPassword.length > 0 ||
      values.newPassword.length > 0 ||
      values.confirmPassword.length > 0;

    const payload = {
      email: values.email.trim(),
      name: values.name.trim(),
      active: profile?.active ?? true,
      ...(pwdTouched
        ? {
            current_password: values.currentPassword,
            new_password: values.newPassword,
          }
        : {}),
    };

    try {
      const response = await triggerUpdateUser({
        id: user.id,
        payload,
      });
      if (response) {
        setUser(response);
      }
      await queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
      form.setValue("currentPassword", "");
      form.setValue("newPassword", "");
      form.setValue("confirmPassword", "");
      CustomToast.success("Changes saved successfully.");
    } catch {}
  };

  const formDisabled = isUpdating || (profileLoading && !user);

  return (
    <div className="bg-[#f4f7fe] px-4 py-6 md:px-8 md:py-6">
      <div className="mx-auto w-full max-w-[1280px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
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
              {profileLoading && !profileFromApi ? (
                <p className="text-[13px] text-[#94a3b8]">Loading profile…</p>
              ) : null}

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[13px] font-medium text-[#2b2b2b]">
                      Display Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={formDisabled}
                        className="h-[41.2px] rounded-[7px] border-[#e2e8f0] text-[14px] text-[#2b2b2b] shadow-none"
                        autoComplete="name"
                      />
                    </FormControl>
                    <p className="text-[12px] font-normal leading-[1.5] text-[#94a3b8]">
                      This is how your name will appear in the portal
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[13px] font-medium text-[#2b2b2b]">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        disabled={formDisabled}
                        className="h-[41.2px] rounded-[7px] border-[#e2e8f0] text-[14px] text-[#2b2b2b] shadow-none"
                        autoComplete="email"
                      />
                    </FormControl>
                    <p className="text-[12px] font-normal leading-[1.5] text-[#94a3b8]">
                      Used for sign-in and notifications
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="h-px bg-[#f1f5f9]" aria-hidden />

              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[13px] font-medium text-[#2b2b2b]">
                      Current Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="Enter current password"
                          className="h-[41.2px] rounded-[7px] border-[#e2e8f0] pr-10 text-[14px] shadow-none placeholder:text-[#94a3b8]"
                          autoComplete="current-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          aria-label={
                            showCurrentPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showCurrentPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[13px] font-medium text-[#2b2b2b]">
                      New Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          className="h-[41.2px] rounded-[7px] border-[#e2e8f0] pr-10 text-[14px] shadow-none placeholder:text-[#94a3b8]"
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          aria-label={
                            showNewPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </FormControl>
                    <p className="text-[12px] font-normal leading-[1.5] text-[#94a3b8]">
                      Leave blank to keep your current password. Must be at least 8 characters when
                      changing.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[13px] font-medium text-[#2b2b2b]">
                      Confirm New Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm new password"
                          className="h-[41.2px] rounded-[7px] border-[#e2e8f0] pr-10 text-[14px] shadow-none placeholder:text-[#94a3b8]"
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          aria-label={
                            showConfirmPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={formDisabled}
                  className="h-[36.4px] gap-2 rounded-[7px] bg-[#5925dc] px-5 text-[13px] font-medium text-white hover:bg-[#5925dc]/90"
                >
                  <Check className="size-[15px]" strokeWidth={2.5} aria-hidden />
                  {isUpdating ? "Saving…" : "Save Changes"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetToProfile}
                  className="h-[36.4px] rounded-[7px] border-[#e2e8f0] bg-white px-5 text-[13px] font-medium text-[#2b2b2b] hover:bg-[#f8fafc]"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
