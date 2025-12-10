"use client";

import { FormEvent, Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { capitalize } from "@/lib/utils";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "@/features/auth/mutations/auth.mutation";
import { useCreateWorkspaceMutation } from "@/features/workspace/mutations/workspace.mutation";
import CustomToast from "@/components/ui/sonner";
import { useAuthStore } from "@/stores/auth-store";

const VerifyOtpContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const shouldAutoSend = searchParams.get("autoSend") === "true";
  const [otp, setOtp] = useState("");
  const [hasTriggeredAutoSend, setHasTriggeredAutoSend] = useState(false);
  const { mutateAsync: verifyOtpMutation, isPending: isVerifying } =
    useVerifyOtpMutation();
  const { mutateAsync: resendOtpMutation, isPending: isResending } =
    useResendOtpMutation();
  const { mutateAsync: createWorkspace, isPending: isCreatingWorkspace } =
    useCreateWorkspaceMutation();

  const handleVerifyOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (otp.length !== 6) {
      CustomToast.error("Please enter all 6 digits");
      return;
    }

    try {
      const response = await verifyOtpMutation({ code: Number(otp) });
      const token = response.data?.tokens?.token;

      if (token) {
        useAuthStore.getState().setToken(token);
      }

      await createWorkspace({
        name: "Default Workspace",
        status: true,
        order: 1,
      });
      CustomToast.success("Successfully verified your code");
      router.replace("/login");
    } catch (error: unknown) {
      const message = (
        error as { response?: { data?: { message?: string | string[] } } }
      )?.response?.data?.message;
      if (Array.isArray(message)) {
        message.forEach((msg: string) => CustomToast.error(capitalize(msg)));
      } else if (typeof message === "string") {
        CustomToast.error(capitalize(message));
      } else {
        CustomToast.error("Something went wrong. Please try again.");
      }
    }
  };

  const resendOtp = useCallback(async () => {
    if (!email) {
      CustomToast.error("Missing email. Please go back and try again.");
      return;
    }

    try {
      await resendOtpMutation({ email });
      setOtp("");
      CustomToast.success("A new OTP has been sent to your email");
    } catch (error: unknown) {
      const message = (
        error as { response?: { data?: { message?: string | string[] } } }
      )?.response?.data?.message;
      if (Array.isArray(message)) {
        message.forEach((msg: string) => CustomToast.error(capitalize(msg)));
      } else if (typeof message === "string") {
        CustomToast.error(capitalize(message));
      } else {
        CustomToast.error("Something went wrong. Please try again.");
      }
    }
  }, [email, resendOtpMutation]);

  useEffect(() => {
    if (!shouldAutoSend || !email || hasTriggeredAutoSend) {
      return;
    }
    setHasTriggeredAutoSend(true);
    void resendOtp();
  }, [shouldAutoSend, email, hasTriggeredAutoSend, resendOtp]);

  const handleResendCode = () => {
    void resendOtp();
  };

  return (
    <div className="flex w-full items-center justify-center bg-background px-6 py-12 lg:w-1/2 lg:px-12">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2">
          <div className="mb-8 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-primary to-primary/80">
              <span className="text-lg font-bold text-white">V</span>
            </div>
            <span className="text-xl font-semibold">Visionkit.ai</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight">Enter OTP</h1>
          <p className="text-muted-foreground">
            Enter the OTP that we have sent on your email{" "}
            <span className="text-foreground font-medium">
              {email || "account email"}
            </span>
          </p>
        </div>

        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            type="submit"
            className="h-12 w-full text-base font-medium"
            size="lg"
            disabled={isVerifying || isCreatingWorkspace}
          >
            {isVerifying || isCreatingWorkspace ? "Verifying..." : "Verify OTP"}
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              Haven&apos;t got the code yet?{" "}
            </span>
            <Button
              type="button"
              variant="link"
              className="px-1 text-base"
              onClick={handleResendCode}
              disabled={isResending}
            >
              {isResending ? "Sending..." : "Resend code"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const VerifyOtpPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex w-full items-center justify-center px-6 py-12 text-muted-foreground lg:w-1/2 lg:px-12">
          <div className="text-center text-sm">
            Loading verification screen...
          </div>
        </div>
      }
    >
      <VerifyOtpContent />
    </Suspense>
  );
};

export default VerifyOtpPage;
