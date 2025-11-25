'use client';

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import toast from "react-hot-toast";

import { authAPI } from "@/api/auth";
import { capitalize } from "@/lib/utils";

const VerifyOtpPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const phone = searchParams.get("phone") ?? "";
  const [otp, setOtp] = useState("");

  const handleVerifyOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    try {
      const res = await authAPI.verifyOTP(Number(otp));

      if (res.status !== 200 && res.status !== 201) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      toast.success("Successfully verified your code");
      router.replace("/login");
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string | string[] } } })?.response?.data?.message;
      if (Array.isArray(message)) {
        message.forEach((msg: string) => toast.error(capitalize(msg)));
      } else if (typeof message === "string") {
        toast.error(capitalize(message));
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const handleResendCode = async () => {
    try {
      const res = await authAPI.resendOTP(email, phone);
      if (res.status !== 200 && res.status !== 201) {
        toast.error("Something went wrong. Please try again.");
        return;
      }
      setOtp("");
      toast.success("A new OTP has been sent to your email");
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string | string[] } } })?.response?.data?.message;
      if (Array.isArray(message)) {
        message.forEach((msg: string) => toast.error(capitalize(msg)));
      } else if (typeof message === "string") {
        toast.error(capitalize(message));
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 items-center justify-center bg-background p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <div className="mb-8 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80">
                <span className="text-lg font-bold text-white">V</span>
              </div>
              <span className="text-xl font-semibold">Visionkit.ai</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight">Enter OTP</h1>
            <p className="text-muted-foreground">
              Enter the OTP that we have sent on your email{" "}
              <span className="text-foreground font-medium">{email || "account email"}</span>
            </p>
          </div>

          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
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

            <Button type="submit" className="h-12 w-full text-base font-medium" size="lg">
              Verify OTP
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Haven&apos;t got the code yet? </span>
              <button type="button" onClick={handleResendCode} className="text-primary hover:underline">
                Resend code
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden flex-1 bg-primary lg:flex">
        <div className="flex flex-1 items-center justify-center p-12 text-primary-foreground">
          <div className="max-w-2xl space-y-6">
            <h2 className="text-5xl font-bold leading-tight">Build vision-powered apps; no heavy lifting.</h2>
            <p className="text-lg text-white/90 leading-relaxed">
              Empower your applications with computer vision and augmented reality in just a few lines of code. Our SDK
              handles everything; from dataset management and model training to real-time object detection and spatial
              measurement; so you can focus on building experiences, not infrastructure.
            </p>
            <p className="pt-8 text-sm text-white/80">Your data. Your models. Your vision.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
