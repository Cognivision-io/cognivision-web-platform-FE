"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authAPI } from "@/api/auth";
import { capitalize } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await authAPI.login(email, password);

      if (res.status !== 200 && res.status !== 201) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      toast.success(capitalize(res.data?.message));

      const token = res.data?.data?.tokens?.token;
      const userPayload = res.data?.data?.user;

      await login(token, {
        dateOfBirth: userPayload?.dateOfBirth,
        email: userPayload?.email,
        firstName: userPayload?.firstName,
        lastName: userPayload?.lastName,
        username: userPayload?.username,
        phone: userPayload?.phone,
        id: userPayload?.id,
      });

      router.replace("/dashboard");
    } catch (error: unknown) {
      const message = (
        error as { response?: { data?: { message?: string | string[] } } }
      )?.response?.data?.message;

      if (message === "Email is not verifed") {
        toast.success("Verify your email");
        router.push(
          `/verify-otp?email=${encodeURIComponent(email)}&redirectToLogin=true`
        );
        return;
      }

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
          <h1 className="text-3xl font-bold">Welcome to Visionkit.ai 👋</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
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

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <Input
                required
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-12 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <Link href="/forget-password" className="text-sm font-medium text-primary hover:underline">
              Forget Password
            </Link>
          </div>

          <Button type="submit" className="h-12 w-full text-base font-semibold" size="lg">
            Sign In
          </Button>

          <p className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-primary hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
