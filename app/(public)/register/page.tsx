'use client';

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authAPI } from "@/api/auth";
import { capitalize } from "@/lib/utils";

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    fName: "",
    lName: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.confirmPassword !== formData.password) {
      toast.error("Passwords must match.");
      return;
    }

    try {
      const res = await authAPI.register({
        dateOfBirth: formData.dob,
        email: formData.email,
        firstName: formData.fName,
        lastName: formData.lName,
        password: formData.password,
        username: formData.username,
        phone: formData.phone,
      });

      if (res.status !== 201 && res.status !== 200) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      toast.success(capitalize(res.data?.message));

      router.push(
        `/verify-otp?email=${encodeURIComponent(formData.email)}&phone=${encodeURIComponent(formData.phone)}`,
      );
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
            <h1 className="text-3xl font-bold">Create your account 🚀</h1>
            <p className="text-muted-foreground">Start building vision-powered applications</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <Input
                required
                id="username"
                type="text"
                placeholder="johndoe123"
                value={formData.username}
                onChange={(event) => setFormData({ ...formData, username: event.target.value })}
                className="h-12"
              />
            </div>

            <div className="flex flex-row gap-x-3">
              <div className="flex-1 space-y-2">
                <label htmlFor="fname" className="text-sm font-medium">
                  First Name
                </label>
                <Input
                  required
                  id="fname"
                  type="text"
                  placeholder="John"
                  value={formData.fName}
                  onChange={(event) => setFormData({ ...formData, fName: event.target.value })}
                  className="h-12"
                />
              </div>
              <div className="flex-1 space-y-2">
                <label htmlFor="lname" className="text-sm font-medium">
                  Last Name
                </label>
                <Input
                  required
                  id="lname"
                  type="text"
                  placeholder="Doe"
                  value={formData.lName}
                  onChange={(event) => setFormData({ ...formData, lName: event.target.value })}
                  className="h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <Input
                required
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone
              </label>
              <Input
                required
                id="phone"
                type="tel"
                placeholder="+1 234 567 8901"
                value={formData.phone}
                onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="dob" className="text-sm font-medium">
                Date Of Birth
              </label>
              <Input
                required
                id="dob"
                type="date"
                value={formData.dob}
                onChange={(event) => setFormData({ ...formData, dob: event.target.value })}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••••"
                  value={formData.password}
                  onChange={(event) => setFormData({ ...formData, password: event.target.value })}
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

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  required
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••••••••"
                  value={formData.confirmPassword}
                  onChange={(event) => setFormData({ ...formData, confirmPassword: event.target.value })}
                  className="h-12 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button type="submit" className="h-12 w-full text-base font-semibold" size="lg">
              Create Account
            </Button>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Sign In
              </Link>
            </p>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-4 text-muted-foreground">Or</span>
            </div>
          </div>

          <Button variant="outline" className="h-12 w-full" type="button">
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2">
        <div className="relative flex w-full flex-col justify-between bg-primary p-12 text-primary-foreground">
          <div className="absolute inset-0 bg-linear-to-b from-primary to-primary/90" />

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

export default RegisterPage;
