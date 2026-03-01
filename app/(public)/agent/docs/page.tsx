"use client";

export default function AgentDocsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12 lg:px-10">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        ARkitect Documentation
      </h1>
      <p className="mt-2 text-muted-foreground">
        Learn how to get the best results from the ARkitect agent.
      </p>

      <div className="mt-10 space-y-10">
        {/* How it Works */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">
            How ARkitect Works
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Describe your AR app idea in natural language. ARkitect analyzes your
            prompt, selects the appropriate CogniVision SDK modules, and
            generates production-ready code for your chosen platform (React
            Native, Swift, or Kotlin).
          </p>
        </section>

        {/* Prompting Guide */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">
            Prompting Guide
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The quality of the generated app depends on how you describe it.
            Follow these tips for better results.
          </p>

          <div className="mt-4 space-y-4">
            <div className="rounded-xl border border-border bg-white p-4">
              <h3 className="font-medium text-foreground">
                Be specific about the AR experience
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Instead of &quot;make an AR app&quot;, describe what the user
                sees and interacts with: &quot;An AR product viewer that lets
                users place 3D furniture models in their room using the phone
                camera, with pinch-to-resize and rotation gestures.&quot;
              </p>
            </div>

            <div className="rounded-xl border border-border bg-white p-4">
              <h3 className="font-medium text-foreground">
                Mention your target use case
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Specify the domain: e-commerce, education, construction,
                manufacturing, gaming, or navigation. This helps ARkitect pick
                the right SDK modules (object detection, spatial mapping, image
                recognition, etc.).
              </p>
            </div>

            <div className="rounded-xl border border-border bg-white p-4">
              <h3 className="font-medium text-foreground">
                Describe the data flow
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Tell ARkitect what data the app needs: &quot;Load 3D models from
                an API&quot;, &quot;Run real-time object detection on camera
                feed&quot;, or &quot;Save measurement results to local
                storage.&quot;
              </p>
            </div>

            <div className="rounded-xl border border-border bg-white p-4">
              <h3 className="font-medium text-foreground">
                Include UI preferences
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Mention the interface you want: &quot;minimal overlay with a
                bottom toolbar&quot;, &quot;full-screen camera view with
                floating action buttons&quot;, or &quot;tabbed layout with AR
                view and settings.&quot;
              </p>
            </div>
          </div>
        </section>

        {/* Example Prompts */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">
            Example Prompts
          </h2>
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-border bg-zinc-50 p-4">
              <p className="text-sm font-medium text-foreground">
                E-commerce AR Viewer
              </p>
              <p className="mt-1 text-xs text-muted-foreground italic">
                &quot;Build a React Native AR app for an e-commerce store. Users
                can select a product from a catalog, then tap &apos;View in
                AR&apos; to place a 3D model in their space. Include
                pinch-to-scale, rotation, and a &apos;Add to Cart&apos; button
                overlay.&quot;
              </p>
            </div>

            <div className="rounded-xl border border-border bg-zinc-50 p-4">
              <p className="text-sm font-medium text-foreground">
                Construction Measurement Tool
              </p>
              <p className="mt-1 text-xs text-muted-foreground italic">
                &quot;Create a Swift ARKit app for construction workers. Users
                point their phone camera at a wall or surface and tap two points
                to measure distance. Show measurements as an overlay with
                centimeter and inch units. Save measurements to a local
                list.&quot;
              </p>
            </div>

            <div className="rounded-xl border border-border bg-zinc-50 p-4">
              <p className="text-sm font-medium text-foreground">
                Manufacturing Defect Detection
              </p>
              <p className="mt-1 text-xs text-muted-foreground italic">
                &quot;Build a Kotlin AR app that uses the CogniVision SDK to run
                real-time defect detection on a camera feed pointed at a
                conveyor belt. Highlight defective items with a red bounding box
                overlay and log each detection with a timestamp.&quot;
              </p>
            </div>
          </div>
        </section>

        {/* Supported Platforms */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">
            Supported Platforms
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-white p-4">
              <h3 className="font-medium text-foreground">React Native</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Cross-platform apps for iOS and Android with a single codebase.
                Best for teams that want fast iteration across both platforms.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-4">
              <h3 className="font-medium text-foreground">Swift</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Native iOS apps leveraging ARKit and the full Apple ecosystem.
                Best for iOS-only apps needing maximum AR performance.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-4">
              <h3 className="font-medium text-foreground">Kotlin</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Native Android apps leveraging ARCore and Material Design. Best
                for Android-first apps with tight platform integration.
              </p>
            </div>
          </div>
        </section>

        {/* SDK Integration */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">
            CogniVision SDK Integration
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Generated apps come pre-configured with the CogniVision SDK. The SDK
            provides:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Object detection and image recognition on live camera feeds
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Spatial mapping and surface detection for AR placement
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              3D model rendering and AR overlay management
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Real-time inference with on-device and cloud-based models
            </li>
          </ul>
        </section>

        {/* Output Format */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">
            What You Get
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            ARkitect generates a complete project structure including source
            code, configuration files, dependency manifests, and setup
            instructions. Projects are ready to build and deploy out of the box.
          </p>
        </section>
      </div>
    </div>
  );
}
