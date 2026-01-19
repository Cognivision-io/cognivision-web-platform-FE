"use client";

import { DocPageHeader } from "@/components/docs/DocPageHeader";
import { useDocsStore } from "@/stores/docs-store";

export default function ExamplesPage() {
  const { platform } = useDocsStore();

  if (platform === "swift") {
    return (
      <div className="space-y-6 pb-12">
        <DocPageHeader
          id="overview"
          className="scroll-mt-32"
          heading="Code Examples"
          text="Building a full measurement AR experience."
        />

        <div className="space-y-8">
          <section id="full-measurement" className="scroll-mt-32 space-y-4">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Full Measurement Example
            </h3>
            <p className="leading-7">
              This example demonstrates how to combine the services to measure
              the distance between two tapped points.
            </p>
            <div className="relative rounded-lg bg-zinc-950 px-4 py-4 dark:bg-zinc-900">
              <pre className="overflow-x-auto">
                <code className="relative rounded font-mono text-sm text-zinc-50">
                  {`// Initialize services
let raycastService = RaycastService(arView: arView)
let lineRenderer = LineRenderer(arView: arView)
let textRenderer = TextRenderer(arView: arView)

// Assuming x1, y1 and x2, y2 are screen tap coordinates
if let p1 = raycastService.worldPoint(fromX: x1, y: y1),
   let p2 = raycastService.worldPoint(fromX: x2, y: y2) {

  // 1. Calculate distance
  let distance = DistanceCalculator.distance(from: p1, to: p2)
  let text = String(format: "%.2f cm", distance * 100)

  // 2. Draw line
  lineRenderer.drawLine(from: p1, to: p2, identifier: "line-1")

  // 3. Show label
  textRenderer.createText(text: text, position: p2, identifier: "label-1")
}`}
                </code>
              </pre>
            </div>
          </section>

          <section id="management" className="scroll-mt-32 space-y-4">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Entity Management
            </h3>
            <p className="leading-7">
              Cleaning up AR entities when they are no longer needed.
            </p>
            <div className="relative rounded-lg bg-zinc-950 px-4 py-4 dark:bg-zinc-900">
              <pre className="overflow-x-auto">
                <code className="relative rounded font-mono text-sm text-zinc-50">
                  {`// Remove specific objects
lineRenderer.removeLine(identifier: "line-1")
textRenderer.removeText(identifier: "label-1")

// Or clear everything
lineRenderer.clearAll()
textRenderer.clearAll()`}
                </code>
              </pre>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (platform === "react-native") {
    const fullExample = `import { useEffect, useRef, useState } from "react";
import { StyleSheet, Platform, Text, TouchableOpacity, View } from "react-native";
import RNFS from "react-native-fs";
import Roboflow, { Prediction } from "react-native-cogni-vision-rnroboflow";
import { ArViewerView } from "react-native-ar-viewer";

interface Point2D {
  x: number;
  y: number;
}

interface DistanceResult {
  shortestDistance: number;
  closestPoint1: Point2D | null;
  closestPoint2: Point2D | null;
}

export default function App() {
  const [ready, setReady] = useState(false);
  const [localModelPath, setLocalModelPath] = useState<string>();
  const [selectedObject, setSelectedObject] = useState<Prediction>();

  const arRef = useRef<ArViewerView>(null);

  const loadModelToDevice = async () => {
    const modelSrc =
      Platform.OS === "android"
        ? "https://github.com/riderodd/react-native-ar/blob/main/example/src/dice.glb?raw=true"
        : "https://github.com/usmanthesuper/react-native-ar/blob/master/example/src/arrow.usdz?raw=true";

    const modelPath = \`\${RNFS.DocumentDirectoryPath}/model.\${
      Platform.OS === "android" ? "glb" : "usdz"
    }\`;

    const exists = await RNFS.exists(modelPath);
    if (!exists) {
      await RNFS.downloadFile({ fromUrl: modelSrc, toFile: modelPath }).promise;
    }

    setLocalModelPath("file://" + modelPath);
  };

  useEffect(() => {
    (async () => {
      try {
        await Roboflow.initialize("YOUR_ROBOFLOW_API_KEY");
        await Roboflow.loadModel("YOUR_PROJECT_SLUG", 1);
        setReady(true);
        console.log("✅ Roboflow ready!");
      } catch (error) {
        console.error("Setup failed:", error);
      }
    })();

    loadModelToDevice();
  }, []);

  const reset = () => {
    arRef.current?.reset();
    setSelectedObject(undefined);
  };

  const scan = async () => {
    reset();

    const screenshot = await arRef.current?.takeScreenshot();
    if (!screenshot) return;

    const detections = await Roboflow.detectObjects(screenshot);

    for (const det of detections.predictions) {
      const p = await arRef.current?.getPositionVector3(det.x, det.y);
      if (!p) continue;
      arRef.current?.placeModel(p.x, p.y, p.z);
    }
  };

  const didUserTapObject = (tapX: number, tapY: number, box: Prediction) => {
    const left = box.x - box.width / 2;
    const right = box.x + box.width / 2;
    const top = box.y - box.height / 2;
    const bottom = box.y + box.height / 2;
    return tapX >= left && tapX <= right && tapY >= top && tapY <= bottom;
  };

  const findShortestDistanceBetweenPolygons = (
    polygon1Points: Point2D[],
    polygon2Points: Point2D[]
  ): DistanceResult => {
    if (polygon1Points.length === 0 || polygon2Points.length === 0) {
      return { shortestDistance: 0, closestPoint1: null, closestPoint2: null };
    }

    // Use only points near the bottom of each polygon (screen Y increases downward).
    const maxY1 = Math.max(...polygon1Points.map((p) => p.y));
    const minY1 = Math.min(...polygon1Points.map((p) => p.y));
    const maxY2 = Math.max(...polygon2Points.map((p) => p.y));
    const minY2 = Math.min(...polygon2Points.map((p) => p.y));

    const threshold1 = maxY1 - 0.25 * (maxY1 - minY1);
    const threshold2 = maxY2 - 0.25 * (maxY2 - minY2);

    const bottomPoints1 = polygon1Points.filter((p) => p.y >= threshold1);
    const bottomPoints2 = polygon2Points.filter((p) => p.y >= threshold2);

    let shortestDistance = Number.MAX_VALUE;
    let closestPoint1: Point2D | null = null;
    let closestPoint2: Point2D | null = null;

    for (const p1 of bottomPoints1) {
      for (const p2 of bottomPoints2) {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < shortestDistance) {
          shortestDistance = distance;
          closestPoint1 = p1;
          closestPoint2 = p2;
        }
      }
    }

    return { shortestDistance, closestPoint1, closestPoint2 };
  };

  const detectObjectsFromAR = async () => {
    const screenshot = await arRef.current?.takeScreenshot();
    if (!screenshot) return null;
    return Roboflow.detectObjects(screenshot);
  };

  const handleObjectSelection = async (
    detection: Prediction,
    coords: { x: number; y: number }
  ) => {
    const p = await arRef.current?.getPositionVector3(coords.x, coords.y);
    if (!p) return;

    setSelectedObject(detection);
    arRef.current?.placeText(p.x, p.y, p.z, "#FF0000", "Selected");
  };

  const handleDistanceMeasurement = async (detection: Prediction) => {
    if (!detection.points || !selectedObject?.points) return;

    const res = findShortestDistanceBetweenPolygons(
      detection.points,
      selectedObject.points
    );

    if (!res.closestPoint1 || !res.closestPoint2) return;

    const p1 = await arRef.current?.getPositionVector3(
      res.closestPoint1.x,
      res.closestPoint1.y
    );
    const p2 = await arRef.current?.getPositionVector3(
      res.closestPoint2.x,
      res.closestPoint2.y
    );
    if (!p1 || !p2) return;

    const meters = await arRef.current?.createLineAndGetDistance(p1, p2, "#FF0000");
    console.log("📏 Distance (m):", meters);
  };

  const handleTapOnDetections = async (
    coords: { x: number; y: number },
    predictions: Prediction[]
  ) => {
    for (const prediction of predictions) {
      if (!didUserTapObject(coords.x, coords.y, prediction)) continue;

      if (selectedObject) {
        await handleDistanceMeasurement(prediction);
      } else {
        await handleObjectSelection(prediction, coords);
      }

      break;
    }
  };

  const ActionButton = ({
    title,
    onPress,
  }: {
    title: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <ArViewerView
        model={localModelPath}
        ref={arRef}
        style={{ flex: 1 }}
        lightEstimation
        manageDepth
        allowRotate
        allowScale
        allowTranslate
        disableInstantPlacement
        onStarted={() => {
          // Some versions require manually loading the model after the AR session starts.
          arRef.current?.loadModel?.();
        }}
        onUserTap={async (e) => {
          if (!ready) return;

          const coords = e?.nativeEvent?.coordinates;
          if (!coords) return;

          const detections = await detectObjectsFromAR();
          if (!detections) return;

          await handleTapOnDetections(coords, detections.predictions);
        }}
        planeOrientation="both"
      />

      <View style={styles.container}>
        <ActionButton title="SCAN" onPress={scan} />
        <ActionButton title="Reset" onPress={reset} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  button: {
    width: 160,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#1A1A1A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#333",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});`;

    return (
      <div className="space-y-6 pb-12">
        <DocPageHeader
          id="overview"
          className="scroll-mt-32"
          heading="Code Examples"
          text="AR object detection + placement + distance measurement in React Native."
        />

        <div className="space-y-8">
          <section id="full-example" className="scroll-mt-32 space-y-4">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Full AR Example
            </h3>
            <p className="leading-7 text-muted-foreground">
              Installs{" "}
              <span className="font-mono">
                react-native-ar-viewer
              </span>{" "}
              and{" "}
              <span className="font-mono">
                react-native-cogni-vision-rnroboflow
              </span>
              , then uses a screenshot → detect → raycast → place loop.
            </p>
            <div className="relative rounded-lg bg-zinc-950 px-4 py-4 dark:bg-zinc-900">
              <pre className="overflow-x-auto">
                <code className="relative rounded font-mono text-sm text-zinc-50">
                  {fullExample}
                </code>
              </pre>
            </div>
          </section>

          <section id="notes" className="scroll-mt-32 space-y-4">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Notes
            </h3>
            <ul className="list-disc pl-6 leading-7 text-muted-foreground">
              <li>
                Replace <span className="font-mono">YOUR_ROBOFLOW_API_KEY</span>
                , <span className="font-mono">YOUR_PROJECT_SLUG</span>, and the
                model version with your published model.
              </li>
              <li>
                AR requires a physical device with ARKit/ARCore support.
              </li>
              <li>
                If taps don&apos;t match detections, verify that{" "}
                <span className="font-mono">onUserTap</span> coordinates and
                screenshot detection coordinates are aligned.
              </li>
            </ul>
          </section>
        </div>
      </div>
    );
  }

  // Kotlin example (generic)
  const basicExample = `val image = BitmapFactory.decodeResource(resources, R.drawable.example)
CogniVision.analyze(image, AnalysisMode.FAST) { result ->
  result.onSuccess { data ->
    println(data)
  }.onFailure { error ->
    println(error)
  }
}`;

  const advancedExample = `// Upload with progress
CogniVision.analyze(image,
  onProgress = { progress ->
    println("Upload progress: $progress")
  }
) { result ->
  // Handle result
}`;

  return (
    <div className="space-y-6 pb-12">
      <DocPageHeader
        id="overview"
        className="scroll-mt-32"
        heading="Code Examples"
        text="Real-world examples to help you build faster."
      />

      <div className="space-y-8">
        <section id="basic" className="scroll-mt-32 space-y-4">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Basic Analysis
          </h3>
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
            Advanced Usage
          </h3>
          <p className="leading-7 text-muted-foreground">
            Handling progress updates and callbacks.
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
    </div>
  );
}

