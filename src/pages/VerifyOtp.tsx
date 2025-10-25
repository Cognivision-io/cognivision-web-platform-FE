import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const { toast } = useToast();

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter all 6 digits",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "OTP Verified",
      description: "Successfully verified your code",
    });
  };

  const handleResendCode = () => {
    toast({
      title: "Code Resent",
      description: "A new OTP has been sent to your email",
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - OTP Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="text-xl font-semibold">Visionkit.ai</span>
            </div>
            
            <h1 className="text-3xl font-bold tracking-tight">Enter OTP</h1>
            <p className="text-muted-foreground">
              Enter the OTP that we have sent on your email{" "}
              <span className="text-foreground font-medium">User@ex.com</span>
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
              className="w-full h-12 text-base font-medium"
              size="lg"
            >
              Verify OTP
            </Button>

            <div className="text-center">
              <span className="text-muted-foreground">Haven't got the code yet? </span>
              <button
                type="button"
                onClick={handleResendCode}
                className="text-primary hover:underline font-medium"
              >
                Resend code
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Hero Section */}
      <div className="hidden lg:flex flex-1 bg-gradient-hero items-center justify-center p-12">
        <div className="max-w-2xl space-y-6 text-white">
          <h2 className="text-5xl font-bold leading-tight">
            Build vision-powered apps; no heavy lifting.
          </h2>
          <p className="text-lg text-white/90 leading-relaxed">
            Empower your applications with computer vision and augmented reality in just a few lines of code. Our SDK handles everything; from dataset management and model training to real-time object detection and spatial measurement; so you can focus on building experiences, not infrastructure.
          </p>
          <p className="text-white/80 text-sm pt-8">
            Your data. Your models. Your vision.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
