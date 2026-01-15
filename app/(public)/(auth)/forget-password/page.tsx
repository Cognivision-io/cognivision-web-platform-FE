"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { capitalize } from "@/lib/utils";
import { useResendOtpMutation } from "@/features/auth/mutations/auth.mutation";
import CustomToast from "@/components/ui/sonner";
import Link from "next/link";

const ForgetPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const { mutateAsync: resendOtp, isPending } = useResendOtpMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await resendOtp({ email });
      CustomToast.success("An OTP has been sent to your email");
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
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

  return (
    <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2 lg:px-12">
      <div className="w-full max-w-md space-y-8">
        <Link href="/" className="flex items-center gap-3">
          {/* use your exact logo asset */}
          <img
            src="/logo-text-black.svg"
            alt="CogniVision"
            className="h-9 w-auto select-none"
            draggable={false}
          />
        </Link>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Forgot Password?</h1>
          <p className="text-muted-foreground">
            Please enter your email we’ll send a one-time password (OTP) to
            verify your identity.
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
              placeholder="hania@cognivision"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-12"
            />
          </div>

          <Button
            type="submit"
            className="h-12 w-full text-base font-semibold"
            size="lg"
            disabled={isPending}
          >
            {isPending ? "Sending..." : "Verify"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
