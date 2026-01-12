"use client";

import { DocPageHeader } from "@/components/docs/DocPageHeader"
import { useDocsStore } from "@/stores/docs-store"

export default function ExamplesPage() {
                    const { platform } = useDocsStore();

                    if (platform === 'swift') {
                                        return (
                                                            <div className="space-y-6 pb-12 px-6">
                                                                                <DocPageHeader
                                                                                                    heading="Code Examples"
                                                                                                    text="Building a full measurement AR experience."
                                                                                />

                                                                                <div className="space-y-8">
                                                                                                    <section id="full-measurement" className="space-y-4">
                                                                                                                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                                                                                                                            Full Measurement Example
                                                                                                                        </h3>
                                                                                                                        <p className="leading-7">
                                                                                                                                            This example demonstrates how to combine the services to measure the distance between two tapped points.
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

                                                                                                    <section id="management" className="space-y-4">
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

                    // Default for Kotlin / React Native
                    const basicExample = {
                                        'kotlin': `val image = BitmapFactory.decodeResource(resources, R.drawable.example)
CogniVision.analyze(image, AnalysisMode.FAST) { result ->
    result.onSuccess { data ->
        println(data)
    }.onFailure { error ->
        println(error)
    }
}`,
                                        'react-native': `const result = await client.analyze({
  image: fileInput.files[0],
  mode: 'fast'
});

console.log(result.data);`
                    }[platform] || "";

                    const advancedExample = {
                                        'kotlin': `// Upload with progress
CogniVision.analyze(image, 
    onProgress = { progress -> 
        println("Upload progress: $progress") 
    }
) { result ->
    // Handle result
}`,
                                        'react-native': `// React Native specific hook usage would go here
// ... (same as basic for now or custom logic)`
                    }[platform] || "";

                    return (
                                        <div className="space-y-6 pb-12 px-6">
                                                            <DocPageHeader
                                                                                heading="Code Examples"
                                                                                text="Real-world examples to help you build faster."
                                                            />

                                                            <div className="space-y-8">
                                                                                <section id="basic" className="space-y-4">
                                                                                                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                                                                                                        Basic Analysis
                                                                                                    </h3>
                                                                                                    <p className="leading-7">
                                                                                                                        Analysis syntax for <strong>{platform === 'react-native' ? 'React Native' : 'Kotlin'}</strong>.
                                                                                                    </p>
                                                                                                    <div className="relative rounded-lg bg-zinc-950 px-4 py-4 dark:bg-zinc-900">
                                                                                                                        <pre className="overflow-x-auto">
                                                                                                                                            <code className="relative rounded font-mono text-sm text-zinc-50">
                                                                                                                                                                {basicExample}
                                                                                                                                            </code>
                                                                                                                        </pre>
                                                                                                    </div>
                                                                                </section>

                                                                                <section id="advanced" className="space-y-4">
                                                                                                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                                                                                                        Advanced Usage
                                                                                                    </h3>
                                                                                                    <p className="leading-7">
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
                    )
}
