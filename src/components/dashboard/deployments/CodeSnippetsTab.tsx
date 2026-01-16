"use client";

import { useMemo, useState } from "react";
import { Copy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CodeSnippetsTabProps = {
        apiKey?: string;
};

export default function CodeSnippetsTab({ apiKey }: CodeSnippetsTabProps) {
        const [lang, setLang] = useState<"swift" | "kotlin" | "react-native">(
                "react-native"
        );
        const [copied, setCopied] = useState(false);

        const snippets = useMemo(() => {
                const resolvedApiKey = apiKey || "YOUR_API_KEY";

                return {
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
                        "react-native": `import { CogniVision } from '@cognivision/react-native-sdk';

const client = new CogniVision({
    apiKey: '${resolvedApiKey}',
});

const result = await client.analyze({
    image: fileInput.files[0],
    mode: 'fast'
});

console.log(result.data);`,
                };
        }, [apiKey]);

        const copyCode = async () => {
                try {
                        await navigator.clipboard.writeText(snippets[lang]);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                } catch (e) {
                        // ignore
                }
        };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold">Code Snippets Integration</h3>
                <p className="text-sm text-muted-foreground">Quickly integrate your trained model into your app or backend.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Example Request</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="inline-flex rounded-md bg-muted p-1">
                                <button
                                    onClick={() => setLang("swift")}
                                    className={`px-3 py-1 text-sm rounded-md ${lang === "swift" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                                >
                                    Swift
                                </button>
                                <button
                                    onClick={() => setLang("kotlin")}
                                    className={`px-3 py-1 text-sm rounded-md ${lang === "kotlin" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                                >
                                    Kotlin
                                </button>
                                <button
                                    onClick={() => setLang("react-native")}
                                    className={`px-3 py-1 text-sm rounded-md ${lang === "react-native" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                                >
                                    React Native
                                </button>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={copyCode}
                                    className="inline-flex items-center gap-2 rounded-md bg-muted px-2 py-1 text-xs"
                                >
                                    <Copy className="h-3 w-3" />
                                    <span>{copied ? "Copied" : "Copy"}</span>
                                </button>
                            </div>
                        </div>

                        <div className="relative">
                            <pre className="rounded bg-[#fbfbfd] p-4 text-xs text-slate-800 overflow-x-auto">{snippets[lang]}</pre>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
