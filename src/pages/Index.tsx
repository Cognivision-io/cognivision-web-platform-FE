import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "@/api/auth";
import toast from "react-hot-toast";
import { capitalize } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign in attempted with:", { email, password });
    try {
      const res = await authAPI.login(email, password);

      if (res.status != 201 && res.status != 200) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      toast.success(capitalize(res.data?.message));

      const token = res.data?.data?.tokens?.token;

      login(token, {
        dateOfBirth: res.data?.data?.user?.dateOfBirth,
        email: res.data?.data?.user?.email,
        firstName: res.data?.data?.user?.firstName,
        lastName: res.data?.data?.user?.lastName,
        username: res.data?.data?.user?.username,
        phone: res.data?.data?.user?.phone,
        id: res.data?.data?.user?.id,
      });

      navigate("/dashboard");
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error.response);

      const message = error?.response?.data?.message;

      if (message == "Email is not verifed") {
        toast.success("Verify your email");
        navigate("/verify-otp", {
          state: {
            email: email,
            redirectToLogin: true,
          },
        });
        return;
      }

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
            <h1 className="text-3xl font-bold">Welcome to Visionkit.ai 👋</h1>
            <p className="text-muted-foreground">Sign in to your account</p>
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
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                to="/forget-password"
                className="text-sm font-medium text-primary hover:underline"
              >
                Forget Password
              </Link>
            </div>

            <Button
              type="submit"
              className="h-12 w-full text-base font-semibold"
              size="lg"
            >
              Sign In
            </Button>

            <p className="text-center text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-primary hover:underline"
              >
                Register
              </Link>
            </p>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-4 text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          {/* Google Sign In */}
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

export default Index;
