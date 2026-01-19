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

  if (platform === "react-native") {
    return (
      <div className="space-y-6 pb-12">
        <DocPageHeader
          id="overview"
          className="scroll-mt-32"
          heading="API Reference"
          text="React Native AR + Roboflow integration reference."
        />

        <div className="space-y-10">
          <section id="authentication" className="scroll-mt-32 space-y-4">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Authentication
            </h3>
            <p className="leading-7">
              Roboflow inference requires an API key. Initialize once on app
              start and keep keys out of source control (use environment/config
              injection).
            </p>
          </section>

          <section id="roboflow" className="scroll-mt-32 space-y-4">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Roboflow
            </h3>
            <p className="leading-7 text-muted-foreground">
              Object detection entry points exposed by{" "}
              <span className="font-mono">react-native-cogni-vision-rnroboflow</span>
              .
            </p>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Method</TableHead>
                    <TableHead>Signature</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">initialize</TableCell>
                    <TableCell className="font-mono text-xs">
                      (apiKey: string, workspaceURL: string, modelId: string,
                      version: number) =&gt; Promise&lt;void&gt;
                    </TableCell>
                    <TableCell>
                      Configure the SDK and select a model to load.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">loadModel</TableCell>
                    <TableCell className="font-mono text-xs">
                      () =&gt; Promise&lt;void&gt;
                    </TableCell>
                    <TableCell>
                      Load the model configured in{" "}
                      <span className="font-mono">initialize()</span>.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">detectObjects</TableCell>
                    <TableCell className="font-mono text-xs">
                      (image: unknown) =&gt; Promise&lt;{"{ predictions: Prediction[] }"}&gt;
                    </TableCell>
                    <TableCell>
                      Run inference on an image. Pass the output of{" "}
                      <span className="font-mono">ArViewerView.takeScreenshot()</span>
                      .
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </section>

          <section id="ar-viewer" className="scroll-mt-32 space-y-4">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              ArViewerView
            </h3>
            <p className="leading-7 text-muted-foreground">
              AR session view and imperative ref helpers exposed by{" "}
              <span className="font-mono">react-native-ar-viewer</span>.
            </p>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ref Method</TableHead>
                    <TableHead>Signature</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">takeScreenshot</TableCell>
                    <TableCell className="font-mono text-xs">
                      () =&gt; Promise&lt;unknown | null&gt;
                    </TableCell>
                    <TableCell>Capture the current AR frame.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">getPositionVector3</TableCell>
                    <TableCell className="font-mono text-xs">
                      (x: number, y: number) =&gt; Promise&lt;{"{ x: number; y: number; z: number }"} | null&gt;
                    </TableCell>
                    <TableCell>
                      Raycast a 2D screen point into a 3D world position.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">placeModel</TableCell>
                    <TableCell className="font-mono text-xs">
                      (x: number, y: number, z: number) =&gt; void
                    </TableCell>
                    <TableCell>
                      Place the currently loaded model at a world position.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">placeText</TableCell>
                    <TableCell className="font-mono text-xs">
                      (x: number, y: number, z: number, color: string, text: string) =&gt; void
                    </TableCell>
                    <TableCell>Render a 3D text label in the scene.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      createLineAndGetDistance
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      (p1: {"{ x:number; y:number; z:number }"}, p2: {"{ x:number; y:number; z:number }"}, color: string) =&gt; Promise&lt;number&gt;
                    </TableCell>
                    <TableCell>
                      Draw a line between two world points and return the
                      distance (meters).
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">reset</TableCell>
                    <TableCell className="font-mono text-xs">
                      () =&gt; void
                    </TableCell>
                    <TableCell>
                      Clear placed content and reset the AR state.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </section>

          <section id="types" className="scroll-mt-32 space-y-4">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Types
            </h3>

            <p className="leading-7 text-muted-foreground">
              Predictions are returned in screenshot coordinate space.
            </p>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Field</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">x</TableCell>
                    <TableCell className="font-mono text-xs">number</TableCell>
                    <TableCell>Bounding box center X.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">y</TableCell>
                    <TableCell className="font-mono text-xs">number</TableCell>
                    <TableCell>Bounding box center Y.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">width</TableCell>
                    <TableCell className="font-mono text-xs">number</TableCell>
                    <TableCell>Bounding box width.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">height</TableCell>
                    <TableCell className="font-mono text-xs">number</TableCell>
                    <TableCell>Bounding box height.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">class</TableCell>
                    <TableCell className="font-mono text-xs">string</TableCell>
                    <TableCell>Predicted label.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">confidence</TableCell>
                    <TableCell className="font-mono text-xs">number</TableCell>
                    <TableCell>Confidence score (0–1).</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">points</TableCell>
                    <TableCell className="font-mono text-xs">
                      {"{ x:number; y:number }"}[] | undefined
                    </TableCell>
                    <TableCell>
                      Optional polygon/segmentation points when available.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </section>

          <section id="errors" className="scroll-mt-32 space-y-4">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Troubleshooting
            </h3>
            <ul className="list-disc pl-6 leading-7 text-muted-foreground">
              <li>
                Ensure you&apos;re testing on a physical device with AR support.
              </li>
              <li>
                If the AR session is black or won&apos;t start, confirm camera
                permissions are granted and (Android) Google Play Services for
                AR is installed.
              </li>
              <li>
                If detection boxes don&apos;t align with taps, verify you are
                using the same coordinate space (tap coordinates vs screenshot
                coordinates).
              </li>
              <li>
                If initialization fails, confirm the API key and that the model
                slug + version are published and accessible.
              </li>
            </ul>
          </section>
        </div>
      </div>
    );
  }

  // Default for Kotlin (CogniVision generic)
  const imageType =
    {
      kotlin: "Bitmap | ByteArray",
    }[platform] || "File";

  const modeType =
    {
      kotlin: "AnalysisMode enum (FAST, ACCURATE)",
    }[platform] || "string";

  return (
    <div className="space-y-6 pb-12">
      <DocPageHeader
        id="overview"
        className="scroll-mt-32"
        heading="API Reference"
        text="Detailed documentation for the Kotlin SDK."
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
