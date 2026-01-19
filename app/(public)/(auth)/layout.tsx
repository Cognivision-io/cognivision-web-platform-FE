import type { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      {children}
      <div className="hidden lg:flex lg:w-1/2">
        <div className="relative flex w-full flex-col justify-between bg-primary p-12 text-primary-foreground">
          <div className="absolute inset-0 bg-linear-to-b from-primary to-primary/90" />

          <div className="relative z-10 flex flex-1 flex-col justify-center space-y-6">
            <h2 className="text-5xl font-bold leading-tight">
              Build AR powered apps; no heavy coding.
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

export default AuthLayout;
