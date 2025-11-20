import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "@/api/auth";
import toast from "react-hot-toast";
import { capitalize } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await authAPI.resendOTP(email);
      if (res.status != 201 && res.status != 200) {
        toast.error("Something went wrong. Please try again.");
        return;
      }
      toast.success("An OTP has been sent to your email");

      navigate("/verify-otp", {
        state: {
          email: email,
        },
      });
    } catch (error) {
      const message = error?.response?.data?.message;

      if (Array.isArray(message)) {
        message.forEach((msg) => toast.error(capitalize(msg)));
      } else if (typeof message === "string") {
        toast.error(capitalize(message));
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Sign In Form */}
      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2 lg:px-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Branding */}
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

          {/* Welcome Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Forgot Password?</h1>
            <p className="text-muted-foreground">
              Please enter your email we’ll send a one-time password (OTP) to
              verify your identity.
            </p>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <Input
                required
                id="email"
                type="email"
                placeholder="Hania Hasan"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
              />
            </div>

            <Button
              type="submit"
              className="h-12 w-full text-base font-semibold"
              size="lg"
            >
              Verify
            </Button>
          </form>
        </div>
      </div>

      {/* Right Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2">
        <div className="relative flex w-full flex-col justify-between bg-primary p-12 text-primary-foreground">
          <div className="absolute inset-0 bg-gradient-to-b from-primary to-primary/90"></div>

          <div className="relative z-10 flex-1 flex flex-col justify-center space-y-6">
            <h2 className="text-5xl font-bold leading-tight">
              Build vision-powered apps; no heavy lifting.
            </h2>
            <p className="text-lg leading-relaxed text-primary-foreground/90">
              Empower your applications with computer vision and augmented
              reality in just a few lines of code. Our SDK handles everything;
              from dataset management and model training to real-time object
              detection and spatial measurement; so you can focus on building
              experiences, not infrastructure.
            </p>
          </div>

          <div className="relative z-10">
            <p className="text-lg font-medium">
              Your data. Your models. Your vision.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
