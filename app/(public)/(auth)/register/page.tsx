"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { InferType } from "yup";

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
import { useRegisterMutation } from "@/features/auth/mutations/auth.mutation";
import { capitalize } from "@/lib/utils";
import CustomToast from "@/components/ui/sonner";

const registerSchema = yup.object({
  firstName: yup.string().trim().required("Full Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  useCase: yup.string().trim().required("Define Use Case is required"),
});

type RegisterFormValues = InferType<typeof registerSchema>;

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { mutateAsync: register, isPending } = useRegisterMutation();
  const form = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstName: "",
      email: "",
      password: "",
      useCase: "",
    },
  });

  const handleError = (error: unknown) => {
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
  };

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      const data = await register(values);
      CustomToast.success(
        capitalize(data.message ?? "Account created successfully")
      );
      const params = new URLSearchParams({
        email: values.email,
      });
      router.push(`/verify-otp?${params.toString()}`);
    } catch (error: unknown) {
      handleError(error);
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
          <h1 className="text-3xl font-bold">
            Create your account with us below
          </h1>
          <p className="text-left text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="cursor-pointer font-medium text-primary underline"
            >
              Login
            </Link>
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="John Doe"
                      className="h-12"
                      autoComplete="name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="john@example.com"
                      className="h-12"
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••••••••"
                        className="h-12 pr-10"
                        autoComplete="new-password"
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="useCase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Define Use Case</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Describe how you plan to use CogniVision"
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="h-12 w-full text-base font-semibold"
              size="lg"
              disabled={isPending}
            >
              {isPending ? "Creating account..." : "Create Account"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
