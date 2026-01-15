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

export default function ApiReferencePage() {
  const { platform } = useDocsStore();

  if (platform === "swift") {
    return (
      <div className="space-y-6 pb-12">
        <DocPageHeader
          id="overview"
          className="scroll-mt-32"
          heading="API Reference"
          text="Core components of ARMeasurementKit."
        />

        <div className="space-y-12">
          <section id="raycasting" className="scroll-mt-32 space-y-4">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              RaycastService
            </h3>
            <p className="leading-7">
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
          </section>

          <section id="distance" className="scroll-mt-32 space-y-4">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              DistanceCalculator
            </h3>
            <p className="leading-7">
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
          </section>

          <section id="rendering" className="scroll-mt-32 space-y-4">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Rendering
            </h3>

            <h4 className="font-semibold text-lg mt-4">LineRenderer</h4>
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

            <h4 className="font-semibold text-lg mt-4">TextRenderer</h4>
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
          </section>
        </div>
      </div>
    );
  }

  // Default for Kotlin / React Native (CogniVision generic)
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

  return (
    <div className="space-y-6 pb-12">
      <DocPageHeader
        id="overview"
        className="scroll-mt-32"
        heading="API Reference"
        text={`Detailed documentation for the ${
          platform === "react-native" ? "React Native" : "Kotlin"
        } SDK.`}
      />

      <div className="space-y-8">
        <section id="authentication" className="scroll-mt-32 space-y-4">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Authentication
          </h3>
          <p className="leading-7">
            All requests must be authenticated. Initialize the SDK with your API
            Key found in your dashboard.
          </p>
        </section>

        <section id="endpoints" className="scroll-mt-32 space-y-4">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Methods
          </h3>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">analyze(image, mode?)</h4>
            <p className="text-muted-foreground">
              Analyze an image for objects and text.
            </p>

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
          </div>
        </section>
      </div>
    </div>
  );
}
