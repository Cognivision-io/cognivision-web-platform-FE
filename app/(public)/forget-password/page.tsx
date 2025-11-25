'use client';

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authAPI } from "@/api/auth";
import { capitalize } from "@/lib/utils";

const ForgetPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await authAPI.resendOTP(email);
      if (res.status !== 200 && res.status !== 201) {
        toast.error("Something went wrong. Please try again.");
        return;
      }
      toast.success("An OTP has been sent to your email");
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
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
      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2 lg:px-12">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-lg text-primary-foreground">
                V
              </div>
              <span className="text-lg font-semibold">Visionkit.ai</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-secondary">
                <span className="text-xs">C</span>
              </div>
              <span>CogniVision.io</span>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Forgot Password?</h1>
            <p className="text-muted-foreground">
              Please enter your email we’ll send a one-time password (OTP) to verify your identity.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <Input
                required
                id="email"
                type="email"
                placeholder="hania@cognivision.io"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-12"
              />
            </div>

            <Button type="submit" className="h-12 w-full text-base font-semibold" size="lg">
              Verify
            </Button>
          </form>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2">
        <div className="relative flex w-full flex-col justify-between bg-primary p-12 text-primary-foreground">
          <div className="absolute inset-0 bg-gradient-to-b from-primary to-primary/90" />
          <div className="relative z-10 flex flex-1 flex-col justify-center space-y-6">
            <h2 className="text-5xl font-bold leading-tight">Build vision-powered apps; no heavy lifting.</h2>
            <p className="text-lg leading-relaxed text-primary-foreground/90">
              Empower your applications with computer vision and augmented reality in just a few lines of code. Our SDK
              handles everything; from dataset management and model training to real-time object detection and spatial
              measurement; so you can focus on building experiences, not infrastructure.
            </p>
          </div>
          <div className="relative z-10">
            <p className="text-lg font-medium">Your data. Your models. Your vision.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
