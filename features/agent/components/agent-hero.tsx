"use client";

export function AgentHero() {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="mb-3 text-sm font-semibold tracking-widest text-primary uppercase">
        ARkitect
      </p>
      <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        Build AR-powered mobile apps, fast.
      </h1>
      <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
        Describe the AR experience you want to build, and ARkitect will generate
        a working app using the CogniVision SDK. Hybrid and native, both
        supported.
      </p>
    </div>
  );
}
