"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Mail, UserX } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import CustomToast from "@/components/ui/sonner";
import { useLogoutMutation } from "@/features/auth/mutations/auth.mutation";
import { useAuthStore } from "@/stores/auth-store";

const LoginSecurityPage = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { mutateAsync: triggerLogout, isPending: isLoggingOut } =
    useLogoutMutation();

  const displayName = useMemo(() => {
    if (!user) return "Hania Hasan";
    const composed = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
    if (composed.length > 0) {
      return composed;
    }
    return user.username ?? user.email ?? "VisionKit User";
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[32px] font-semibold text-[#141b2d]">
          Your Profile
        </h1>
        <p className="mt-1 text-base text-[#6c7394]">
          You are signed in with your {providerLabel.toLowerCase()} account
        </p>
      </div>

      <div className="rounded-2xl border border-[#e0e5ff] bg-white px-5 py-5 shadow-[0_24px_50px_rgba(41,53,108,0.07)]">
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
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#e0e4f8] bg-white px-5 text-sm font-semibold text-[#4b516f] shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition hover:border-[#cdd2f1] hover:text-[#2b3150]"
          >
            <LogOut className="h-4 w-4 text-[#9AA1C8]" />
            {isLoggingOut ? "Signing out..." : "Sign out"}
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-[#1b2559]">Modify Account</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-xl border-[#d7dbef] bg-white px-4 text-sm font-semibold text-[#4b516f] shadow-[0_1px_2px_rgba(15,23,42,0.03)] hover:border-[#c3c8e4] hover:text-[#1e2748]"
          >
            <Mail className="h-4 w-4 text-[#8c94b6]" />
            Change Email
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-xl border-[#d7dbef] bg-white px-4 text-sm font-semibold text-[#4b516f] shadow-[0_1px_2px_rgba(15,23,42,0.03)] hover:border-[#c3c8e4] hover:text-[#8d1e1e]"
          >
            <UserX className="h-4 w-4 text-[#8c94b6]" />
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginSecurityPage;
