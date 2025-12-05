"use client";

import { useState } from "react";
import { Download, Copy } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    SelectGroup,
    SelectLabel,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function DownloadTab() {
    const [format, setFormat] = useState<string | undefined>(undefined);
    const [lang, setLang] = useState<"python" | "swift" | "java">("python");
    const [copied, setCopied] = useState(false);

    const formatExt = (f?: string) => {
        switch (f) {
            case "tflite":
                return "tflite";
            case "onnx":
                return "onnx";
            case "coreml":
                return "mlmodel";
            case "pytorch":
                return "pt";
            default:
                return "tflite";
        }
    };

    const snippets: Record<string, Record<string, string>> = {
        python: {
            tflite: `from visioncore import load_model\n\nmodel = load_model("fruit_detector_v2.tflite")\npredictions = model.predict("test_image.jpg")\nprint(predictions)`,
            onnx: `from visioncore import load_model\n\nmodel = load_model("fruit_detector_v2.onnx")\npredictions = model.predict("test_image.jpg")\nprint(predictions)`,
            coreml: `from visioncore import load_model\n\nmodel = load_model("fruit_detector_v2.mlmodel")\npredictions = model.predict("test_image.jpg")\nprint(predictions)`,
            pytorch: `from visioncore import load_model\n\nmodel = load_model("fruit_detector_v2.pt")\npredictions = model.predict("test_image.jpg")\nprint(predictions)`,
        },
        swift: {
            tflite: `import VisionCore\n\nlet model = try! VisionCore.loadModel(named: "fruit_detector_v2.tflite")\nlet preds = model.predict(image: "test_image.jpg")\nprint(preds)`,
            onnx: `// Swift example for ONNX may require different runtime\n// Load and run your ONNX model with a compatible runtime.`,
            coreml: `import CoreML\n\nlet model = try! MLModel(contentsOf: URL(fileURLWithPath: "fruit_detector_v2.mlmodel"))\n// run prediction using Core ML APIs`,
            pytorch: `// Swift example for PyTorch requires LibTorch bindings or conversion to CoreML.`,
        },
        java: {
            tflite: `import org.visioncore.Model;\n\nModel model = Model.load("fruit_detector_v2.tflite");\nvar preds = model.predict("test_image.jpg");\nSystem.out.println(preds);`,
            onnx: `// Java example for ONNX will vary by runtime (e.g., ONNX Runtime Java API).`,
            coreml: `// CoreML is not directly supported on Java; convert model or use an appropriate runtime.`,
            pytorch: `// Java example for PyTorch requires appropriate bindings (e.g., PyTorch Java API).`,
        },
    };

    const currentSnippet = () => {
        const ext = formatExt(format);
        const key = ext === "mlmodel" ? "coreml" : ext;
        return snippets[lang][key] ?? snippets[lang].tflite;
    };

    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(currentSnippet());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (e) {
            // ignore
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold">Download Model</h3>
                <p className="text-sm text-muted-foreground">Export your trained model for mobile or edge devices.</p>
            </div>

            <Card className="bg-white">
                <CardContent className="pt-6 ">
                    <div className="grid grid-cols-3 gap-6 mb-6 bg-[#F9FAFB] rounded-md p-4 border-[#E5E7EB] border">
                        <div className="flex flex-col gap-3">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-900">Model Name:</label>
                                <Input
                                    defaultValue="Fruit_Detector_v1"
                                    className="bg-white border-gray-300"
                                    readOnly
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-900">Version:</label>
                                <Input
                                    defaultValue="V1"
                                    className="bg-white border-gray-300"
                                    readOnly
                                />
                            </div>

                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-900">Format</label>
                            <Select onValueChange={(v) => setFormat(v)}>
                                <SelectTrigger className="bg-white border-gray-300">
                                    <SelectValue placeholder="Select Format" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Export Formats</SelectLabel>
                                        <SelectItem value="tflite">TensorFlow Lite</SelectItem>
                                        <SelectItem value="onnx">ONNX</SelectItem>
                                        <SelectItem value="coreml">Core ML</SelectItem>
                                        <SelectItem value="pytorch">PyTorch</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Button variant="default" size="lg" className="gap-2">
                        <Download className="h-5 w-5" />
                        Download
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Example Request</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="inline-flex rounded-md bg-muted p-1">
                                <button
                                    onClick={() => setLang("python")}
                                    className={`px-3 py-1 text-sm rounded-md ${lang === "python" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
                                    Python
                                </button>
                                <button
                                    onClick={() => setLang("swift")}
                                    className={`px-3 py-1 text-sm rounded-md ${lang === "swift" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
                                    Swift
                                </button>
                                <button
                                    onClick={() => setLang("java")}
                                    className={`px-3 py-1 text-sm rounded-md ${lang === "java" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
                                    Java
                                </button>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">{format ? `Format: ${format.toUpperCase()}` : "Select a format"}</span>
                                <button onClick={copyCode} className="inline-flex items-center gap-2 rounded-md bg-muted px-2 py-1 text-xs">
                                    <Copy className="h-3 w-3" />
                                    <span>{copied ? "Copied" : "Copy"}</span>
                                </button>
                            </div>
                        </div>

                        <div className="relative">
                            <pre className="rounded bg-[#fbfbfd] p-4 text-xs text-slate-800 overflow-x-auto">{currentSnippet()}</pre>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
