"use client";

import { DocPageHeader } from "@/components/docs/DocPageHeader";
import { useDocsStore } from "@/stores/docs-store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function HelpPage() {
  const { platform } = useDocsStore();
  const isSwift = platform === "swift";

  const installCommand = {
    swift:
      '.package(url: "https://github.com/your-org/ARMeasurementKit.git", from: "1.0.0")',
    kotlin: "implementation 'com.cognivision:sdk:1.2.0'",
    "react-native": "npm install @cognivision/react-native-sdk",
  }[platform];

  const importCode = {
    swift: `import ARMeasurementKit

// 1. Create an ARView
let arView = ARView(frame: .zero)

// 2. Start an AR session
let config = ARWorldTrackingConfiguration()
config.planeDetection = [.horizontal, .vertical]
config.environmentTexturing = .automatic

arView.session.run(config)`,
    kotlin:
      'import com.cognivision.sdk.CogniVision\n\nCogniVision.initialize(context, "YOUR_API_KEY")',
    "react-native":
      "import { CogniVision } from '@cognivision/react-native-sdk';\n\nconst client = new CogniVision({\n  apiKey: 'YOUR_API_KEY',\n});",
  }[platform];

  const introText = {
    swift:
      "A lightweight Swift package built on ARKit + RealityKit that provides reusable utilities for raycasting, distance measurement, line rendering, and 3D text annotations in AR scenes.",
    kotlin:
      "Welcome to the CogniVision SDK documentation. This guide will help you integrate our powerful vision capabilities into your applications.",
    "react-native":
      "Welcome to the CogniVision SDK documentation. This guide will help you integrate our powerful vision capabilities into your applications.",
  }[platform];

  const overviewText = {
    swift:
      "ARMeasurementKit keeps its API focused around three building blocks: raycasting, distance calculations, and lightweight rendering helpers.",
    kotlin:
      "Use the CogniVision client to run fast or accurate analysis on images with a single, typed entry point.",
    "react-native":
      "Use the CogniVision client to run fast or accurate analysis on images with a single, typed entry point.",
  }[platform];

  const authText = {
    swift:
      "ARMeasurementKit runs locally and does not require authentication or network credentials.",
    kotlin:
      "All requests must be authenticated. Initialize the SDK with your API key found in your dashboard.",
    "react-native":
      "All requests must be authenticated. Initialize the SDK with your API key found in your dashboard.",
  }[platform];

  const imageType =
    {
      kotlin: "Bitmap | ByteArray",
      "react-native": "File | string (base64)",
    }[platform] || "File";

  const modeType =
    {
      kotlin: "AnalysisMode enum (FAST, ACCURATE)",
      "react-native": "string ('fast' | 'accurate')",
    }[platform] || "string";

  const basicExample = {
    swift: `// Initialize services
let raycastService = RaycastService(arView: arView)
let lineRenderer = LineRenderer(arView: arView)
let textRenderer = TextRenderer(arView: arView)

if let p1 = raycastService.worldPoint(fromX: x1, y: y1),
   let p2 = raycastService.worldPoint(fromX: x2, y: y2) {

  let distance = DistanceCalculator.distance(from: p1, to: p2)
  let text = String(format: "%.2f cm", distance * 100)

  lineRenderer.drawLine(from: p1, to: p2, identifier: "line-1")
  textRenderer.createText(text: text, position: p2, identifier: "label-1")
}`,
    kotlin: `val image = BitmapFactory.decodeResource(resources, R.drawable.example)
CogniVision.analyze(image, AnalysisMode.FAST) { result ->
  result.onSuccess { data ->
    println(data)
  }.onFailure { error ->
    println(error)
  }
}`,
    "react-native": `const result = await client.analyze({
  image: fileInput.files[0],
  mode: 'fast'
});

console.log(result.data);`,
  }[platform];

  const advancedExample = {
    swift: `// Remove specific objects
lineRenderer.removeLine(identifier: "line-1")
textRenderer.removeText(identifier: "label-1")

// Or clear everything
lineRenderer.clearAll()
textRenderer.clearAll()`,
    kotlin: `// Upload with progress
CogniVision.analyze(image,
  onProgress = { progress ->
    println("Upload progress: $progress")
  }
) { result ->
  // Handle result
}`,
    "react-native": `// React Native specific hook usage would go here
// ... (same as basic for now or custom logic)`,
  }[platform];

  return (
    <div className="space-y-10 pb-12">
      <DocPageHeader
        heading={isSwift ? "ARMeasurementKit" : "Getting Started"}
        text={
          isSwift
            ? "Clean APIs for AR measurements in Swift."
            : "A minimal SDK documentation for integrating our services."
        }
      />

      <section id="introduction" className="scroll-mt-32 space-y-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Introduction
        </h3>
        <p className="leading-7 [&:not(:first-child)]:mt-6">{introText}</p>
        {isSwift ? (
          <ul className="list-disc pl-6 leading-7">
            <li>Screen point → world position conversion (raycasting)</li>
            <li>3D distance calculation between two points</li>
            <li>Draw 3D lines between points</li>
            <li>Render 3D text labels in AR</li>
          </ul>
        ) : null}
      </section>

      <section id="quick-start" className="scroll-mt-32 space-y-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {isSwift ? "Installation" : "Quick Start"}
        </h3>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          {isSwift
            ? "Add the package to your project via Swift Package Manager:"
            : "To get started, you'll need to install our package."}
        </p>
        <div className="relative rounded-lg bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          {installCommand}
        </div>

        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight pt-2">
          {isSwift ? "Basic Setup" : "Initialization"}
        </h4>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          {isSwift
            ? "Initialize your ARView and configuration:"
            : "Once installed, initialize the SDK with your API key."}
        </p>
        <div className="relative rounded-lg bg-zinc-950 px-4 py-4 dark:bg-zinc-900">
          <pre className="overflow-x-auto">
            <code className="relative rounded font-mono text-sm text-zinc-50">
              {importCode}
            </code>
          </pre>
        </div>
      </section>

      <section id="overview" className="scroll-mt-32 space-y-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Overview
        </h3>
        <p className="leading-7 text-muted-foreground">{overviewText}</p>
        {!isSwift ? (
          <ul className="list-disc pl-6 text-sm text-muted-foreground">
            <li>One client, consistent results across platforms.</li>
            <li>Configurable performance modes for latency or accuracy.</li>
            <li>Structured responses for analysis results.</li>
          </ul>
        ) : null}
      </section>

      <section id="authentication" className="scroll-mt-32 space-y-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Authentication
        </h3>
        <p className="leading-7 text-muted-foreground">{authText}</p>
      </section>

      <section id="endpoints" className="scroll-mt-32 space-y-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {isSwift ? "Core Services" : "Endpoints"}
        </h3>
        {isSwift ? (
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-lg font-semibold">RaycastService</h4>
              <p className="text-sm text-muted-foreground">
                Convert a screen tap into a world position.
              </p>
              <div className="relative rounded-lg bg-zinc-950 px-4 py-4 dark:bg-zinc-900">
                <pre className="overflow-x-auto">
                  <code className="relative rounded font-mono text-sm text-zinc-50">
                    {`let raycastService = RaycastService(arView: arView)

// Returns SIMD3<Float>?
let worldPoint = raycastService.worldPoint(fromX: x, y: y)`}
                  </code>
                </pre>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-lg font-semibold">DistanceCalculator</h4>
              <p className="text-sm text-muted-foreground">
                Calculate distance between two 3D points.
              </p>
              <div className="relative rounded-lg bg-zinc-950 px-4 py-4 dark:bg-zinc-900">
                <pre className="overflow-x-auto">
                  <code className="relative rounded font-mono text-sm text-zinc-50">
                    {`let distance = DistanceCalculator.distance(from: startPoint, to: endPoint)
// Returns Float (meters)`}
                  </code>
                </pre>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-lg font-semibold">Rendering</h4>
              <div className="space-y-3">
                <h5 className="text-sm font-semibold">LineRenderer</h5>
                <div className="relative rounded-lg bg-zinc-950 px-4 py-4 dark:bg-zinc-900">
                  <pre className="overflow-x-auto">
                    <code className="relative rounded font-mono text-sm text-zinc-50">
                      {`let lineRenderer = LineRenderer(arView: arView)
lineRenderer.drawLine(
  from: start,
  to: end,
  identifier: "line-1",
  color: .blue,     // optional
  thickness: 0.003  // optional
)`}
                    </code>
                  </pre>
                </div>
                <h5 className="text-sm font-semibold">TextRenderer</h5>
                <div className="relative rounded-lg bg-zinc-950 px-4 py-4 dark:bg-zinc-900">
                  <pre className="overflow-x-auto">
                    <code className="relative rounded font-mono text-sm text-zinc-50">
                      {`let textRenderer = TextRenderer(arView: arView)
textRenderer.createText(
  text: "12.4 cm",
  position: endPoint,
  identifier: "label-1",
  scale: 0.01,
  color: .white
)`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Parameter</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono">image</TableCell>
                  <TableCell className="font-mono text-xs">
                    {imageType}
                  </TableCell>
                  <TableCell>The image to analyze.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono">mode</TableCell>
                  <TableCell className="font-mono text-xs">
                    {modeType}
                  </TableCell>
                  <TableCell>Performance mode (optional).</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}
      </section>

      <section id="basic" className="scroll-mt-32 space-y-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Basic Usage
        </h3>
        <p className="leading-7 text-muted-foreground">
          {isSwift
            ? "Combine services to perform a complete measurement."
            : "Analysis syntax for the SDK."}
        </p>
        <div className="relative rounded-lg bg-zinc-950 px-4 py-4 dark:bg-zinc-900">
          <pre className="overflow-x-auto">
            <code className="relative rounded font-mono text-sm text-zinc-50">
              {basicExample}
            </code>
          </pre>
        </div>
      </section>

      <section id="advanced" className="scroll-mt-32 space-y-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Advanced Scenarios
        </h3>
        <p className="leading-7 text-muted-foreground">
          {isSwift
            ? "Manage entities and clean up your AR scene."
            : "Handling progress updates and callbacks."}
        </p>
        <div className="relative rounded-lg bg-zinc-950 px-4 py-4 dark:bg-zinc-900">
          <pre className="overflow-x-auto">
            <code className="relative rounded font-mono text-sm text-zinc-50">
              {advancedExample}
            </code>
          </pre>
        </div>
      </section>
    </div>
  );
}
