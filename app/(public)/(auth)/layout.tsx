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
              Build AR powered apps; no coding.
            </h2>
            <p className="text-lg leading-relaxed text-primary-foreground/90">
              No Swift. No native bridging. Just describe what you want —
              Cognivision generates working AR code that runs on a real iPhone
              in minutes.
            </p>
          </div>

          <div className="relative z-10">
            <p className="text-lg font-medium">
              AR features in React Native, from a prompt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
