"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CodeSnippetsTab() {
    const [lang, setLang] = useState<"python" | "swift" | "java">("python");
    const [copied, setCopied] = useState(false);

    const snippets: Record<string, string> = {
        python: `import requests\n\nurl = "https://api.visioncore.ai/v1/models/v2/predict"\nfiles = {"file": open("apple.jpg", "rb")}\nheaders = {"Authorization": "Bearer sk_live_xxxxxxxx"}\n\nresponse = requests.post(url, files=files, headers=headers)\nprint(response.json())`,
        swift: `import Foundation\n\n// Swift snippet depends on your networking stack. Example with URLSession:\n// let url = URL(string: "https://api.visioncore.ai/v1/models/v2/predict")!\n// create multipart/form-data request and include Authorization header`,
        java: `// Java example (using OkHttp)\n// OkHttpClient client = new OkHttpClient();\n// Build multipart request with file and Authorization header, then execute and parse JSON response.`,
    };

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
                                <button onClick={copyCode} className="inline-flex items-center gap-2 rounded-md bg-muted px-2 py-1 text-xs">
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
