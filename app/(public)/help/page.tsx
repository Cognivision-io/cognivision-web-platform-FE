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
  const isReactNative = platform === "react-native";

  const installCommand = {
    swift:
      '.package(url: "https://github.com/your-org/ARMeasurementKit.git", from: "1.0.0")',
    kotlin: "implementation 'com.cognivision:sdk:1.2.0'",
    "react-native": `npm install react-native-cogni-vision-rnroboflow react-native-ar-viewer
cd ios && pod install`,
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
    "react-native": `import { useEffect } from "react";
import Roboflow from "react-native-cogni-vision-rnroboflow";

useEffect(() => {
  (async () => {
    await Roboflow.initialize("YOUR_ROBOFLOW_API_KEY");
    await Roboflow.loadModel("your-project-slug", 1);
  })();
}, []);`,
  }[platform];

  const introText = {
    swift:
      "A lightweight Swift package built on ARKit + RealityKit that provides reusable utilities for raycasting, distance measurement, line rendering, and 3D text annotations in AR scenes.",
    kotlin:
      "Welcome to the CogniVision SDK documentation. This guide will help you integrate our powerful vision capabilities into your applications.",
    "react-native":
      "Build an AR workflow in React Native by combining our Roboflow-powered vision module with an AR viewer. Capture AR screenshots, run object detection, place 3D content at detected positions, and measure real-world distances by tapping objects.",
  }[platform];

  const overviewText = {
    swift:
      "ARMeasurementKit keeps its API focused around three building blocks: raycasting, distance calculations, and lightweight rendering helpers.",
    kotlin:
      "Use the CogniVision client to run fast or accurate analysis on images with a single, typed entry point.",
    "react-native":
      "The React Native SDK is designed around a simple loop: render an AR session, capture a frame, run detection, then convert 2D detection coordinates into 3D world positions for placement and measurement.",
  }[platform];

  const authText = {
    swift:
      "ARMeasurementKit runs locally and does not require authentication or network credentials.",
    kotlin:
      "All requests must be authenticated. Initialize the SDK with your API key found in your dashboard.",
    "react-native":
      "Roboflow inference requires an API key. Keep it out of source control and load it from env/config. Initialize once on app start, then load your model by project slug + version.",
  }[platform];

  const imageType =
    {
      kotlin: "Bitmap | ByteArray",
      "react-native": "ArViewerView screenshot (SDK compatible)",
      swift: "N/A",
    }[platform] || "File";

  const modeType =
    {
      kotlin: "AnalysisMode enum (FAST, ACCURATE)",
      "react-native": "N/A",
      swift: "N/A",
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
    "react-native": `// 1) Capture a frame from the AR view
const screenshot = await arRef.current?.takeScreenshot();
if (!screenshot) return;

// 2) Run detection
const detections = await Roboflow.detectObjects(screenshot);

// 3) Convert detection centers to world positions and place content
for (const det of detections.predictions) {
  const p = await arRef.current?.getPositionVector3(det.x, det.y);
  if (!p) continue;
  arRef.current?.placeModel(p.x, p.y, p.z);
}`,
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
    "react-native": `// Tap to select an object, tap another to measure distance.
// 1) Detect on tap (screenshot -> Roboflow.detectObjects)
// 2) Hit-test the tap against detection boxes
// 3) Use getPositionVector3(x, y) to raycast into 3D
// 4) Draw a line between two world points and read its distance`,
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

        {isReactNative ? (
          <div className="space-y-4 pt-3">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Requirements
            </h4>
            <ul className="list-disc pl-6 leading-7 text-muted-foreground">
              <li>
                Use a physical device (ARKit/ARCore is not supported on most
                simulators).
              </li>
              <li>
                iOS: ARKit-capable device. Android: ARCore-capable device.
              </li>
              <li>
                Expo: use a custom dev client / prebuild (these are native
                modules).
              </li>
            </ul>

            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Permissions
            </h4>
            <p className="leading-7 text-muted-foreground">
              The AR viewer needs camera access.
            </p>

            <div className="space-y-2">
              <div className="text-sm font-semibold">iOS (Info.plist)</div>
              <div className="relative rounded-lg bg-zinc-950 px-4 py-4 dark:bg-zinc-900">
                <pre className="overflow-x-auto">
                  <code className="relative rounded font-mono text-sm text-zinc-50">
                    {`<key>NSCameraUsageDescription</key>
<string>We use the camera to power AR and object detection.</string>`}
                  </code>
                </pre>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-semibold">
                Android (AndroidManifest.xml)
              </div>
              <div className="relative rounded-lg bg-zinc-950 px-4 py-4 dark:bg-zinc-900">
                <pre className="overflow-x-auto">
                  <code className="relative rounded font-mono text-sm text-zinc-50">
                    {`<uses-permission android:name="android.permission.CAMERA" />`}
                  </code>
                </pre>
              </div>
            </div>

            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Render the AR Viewer
            </h4>
            <p className="leading-7 text-muted-foreground">
              Mount <span className="font-mono">ArViewerView</span> with a ref so
              you can call <span className="font-mono">takeScreenshot()</span>,{" "}
              <span className="font-mono">getPositionVector3()</span>,{" "}
              <span className="font-mono">placeModel()</span>, and{" "}
              <span className="font-mono">createLineAndGetDistance()</span>.
            </p>
            <div className="relative rounded-lg bg-zinc-950 px-4 py-4 dark:bg-zinc-900">
              <pre className="overflow-x-auto">
                <code className="relative rounded font-mono text-sm text-zinc-50">
                  {`import { useRef } from "react";
import { View } from "react-native";
import { ArViewerView } from "react-native-ar-viewer";

const arRef = useRef<ArViewerView>(null);

export function ARScreen({ modelUri }: { modelUri?: string }) {
  return (
    <View style={{ flex: 1 }}>
      <ArViewerView
        ref={arRef}
        model={modelUri} // must be a file:// URI
        style={{ flex: 1 }}
        manageDepth
        allowRotate
        allowScale
        allowTranslate
        disableInstantPlacement
        onStarted={() => arRef.current?.loadModel?.()}
        onUserTap={(e) => {
          const coords = e?.nativeEvent?.coordinates;
          if (!coords) return;
          // coords.x / coords.y are screen-space coordinates
        }}
        planeOrientation="both"
      />
    </View>
  );
}`}
                </code>
              </pre>
            </div>

            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Load a 3D Model (local file)
            </h4>
            <p className="leading-7 text-muted-foreground">
              The AR viewer expects a local model path. A common pattern is to
              download a model once and keep it in{" "}
              <span className="font-mono">RNFS.DocumentDirectoryPath</span>.
              Android typically uses <span className="font-mono">.glb</span>;
              iOS typically uses <span className="font-mono">.usdz</span>.
            </p>
            <div className="relative rounded-lg bg-zinc-950 px-4 py-4 dark:bg-zinc-900">
              <pre className="overflow-x-auto">
                <code className="relative rounded font-mono text-sm text-zinc-50">
                  {`import { useEffect, useState } from "react";
import { Platform } from "react-native";
import RNFS from "react-native-fs";

export function useLocalModelUri() {
  const [uri, setUri] = useState<string>();

  useEffect(() => {
    (async () => {
      const modelSrc =
        Platform.OS === "android"
          ? "https://.../model.glb"
          : "https://.../model.usdz";

      const ext = Platform.OS === "android" ? "glb" : "usdz";
      const dst = \`\${RNFS.DocumentDirectoryPath}/model.\${ext}\`;

      if (!(await RNFS.exists(dst))) {
        await RNFS.downloadFile({ fromUrl: modelSrc, toFile: dst }).promise;
      }

      setUri("file://" + dst);
    })();
  }, []);

  return uri;
}`}
                </code>
              </pre>
            </div>
          </div>
        ) : null}
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
        ) : isReactNative ? (
          <div className="space-y-8">
            <div className="space-y-3">
              <h4 className="text-lg font-semibold">Roboflow</h4>
              <p className="text-sm text-muted-foreground">
                Initialize once, load a model, then run detection on AR
                screenshots.
              </p>
              <div className="relative rounded-lg bg-zinc-950 px-4 py-4 dark:bg-zinc-900">
                <pre className="overflow-x-auto">
                  <code className="relative rounded font-mono text-sm text-zinc-50">
                    {`await Roboflow.initialize("YOUR_ROBOFLOW_API_KEY");
await Roboflow.loadModel("your-project-slug", 1);

const result = await Roboflow.detectObjects(screenshot);
// result.predictions: Prediction[]`}
                  </code>
                </pre>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-lg font-semibold">ArViewerView (ref)</h4>
              <p className="text-sm text-muted-foreground">
                Imperative helpers for capturing frames, raycasting into 3D, and
                rendering overlays.
              </p>
              <div className="relative rounded-lg bg-zinc-950 px-4 py-4 dark:bg-zinc-900">
                <pre className="overflow-x-auto">
                  <code className="relative rounded font-mono text-sm text-zinc-50">
                    {`const screenshot = await arRef.current?.takeScreenshot();
const p = await arRef.current?.getPositionVector3(x, y);

arRef.current?.placeModel(p.x, p.y, p.z);
arRef.current?.placeText(p.x, p.y, p.z, "#FF0000", "Selected");

const meters = await arRef.current?.createLineAndGetDistance(p1, p2, "#FF0000");
arRef.current?.reset();`}
                  </code>
                </pre>
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
