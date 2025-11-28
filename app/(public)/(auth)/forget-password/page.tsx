"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { capitalize } from "@/lib/utils";
import { useResendOtpMutation } from "@/features/auth/mutations/auth.mutation";

const ForgetPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const { mutateAsync: resendOtp, isPending } = useResendOtpMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await resendOtp({ email });
      toast.success("An OTP has been sent to your email");
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (error: unknown) {
      const message = (
        error as { response?: { data?: { message?: string | string[] } } }
      )?.response?.data?.message;
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
    <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2 lg:px-12">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-lg text-primary-foreground">
              V
            </div>
            <span className="text-lg font-semibold">Visionkit.ai</span>
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

          <Button type="submit" className="h-12 w-full text-base font-semibold" size="lg" disabled={isPending}>
            {isPending ? "Sending..." : "Verify"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
