"use client";

import { useMemo, useState } from "react";
import { Copy } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type WebApiTabProps = {
    apiKey?: string;
    apiKeyLoading?: boolean;
    baseUrl: string;
    workspaceName?: string;
};

export default function WebApiTab({
    apiKey,
    apiKeyLoading = false,
    baseUrl,
    workspaceName,
}: WebApiTabProps) {
    const [copied, setCopied] = useState<string | null>(null);

    const apiKeyValue = apiKey || "";

    const codeApiKey = apiKeyValue || "YOUR_API_KEY";
    const codeBaseUrl = baseUrl;

    const payloadSnippet = useMemo(
        () =>
            `{
  "imageData": "data:image/jpeg;base64,BASE64_IMAGE",
  "roboflowModelId": "workspace/model",
  "apiKey": "${codeApiKey}",
  "confidenceThreshold": 50,
  "overlapThreshold": 50
}`,
        [codeApiKey]
    );

    const curlCode = `curl -X POST "${codeBaseUrl}" \\\n+  -H "Content-Type: application/json" \\\n+  -d '${payloadSnippet}'`;

    const pythonCode = `import requests

url = "${codeBaseUrl}"
payload = ${payloadSnippet}

response = requests.post(url, json=payload)
print(response.json())`;

    const jsCode = `const payload = ${payloadSnippet};

fetch("${codeBaseUrl}", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
})
  .then((r) => r.json())
  .then(console.log);`;

    const handleCopy = async (key: string, text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(key);
            window.setTimeout(() => setCopied(null), 2000);
        } catch (e) {
            // ignore or optionally fallback
            console.error('copy failed', e);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold">Web API Endpoint</h2>
                <p className="text-sm text-muted-foreground">
                    {workspaceName
                        ? `Use the API key for ${workspaceName} to authenticate requests.`
                        : "Select a workspace to view its API key."}
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">API Details</CardTitle>

                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            Base API URL
                        </p>
                        <div className="mt-2 flex items-center gap-2 rounded border border-[#ecebed] bg-white px-3 py-2">
                            <code className="flex-1 text-xs text-slate-800 break-words">
                                {baseUrl}
                            </code>
                            <button
                                aria-label="copy-base"
                                className="p-1 text-muted-foreground hover:text-foreground"
                                onClick={() => handleCopy("base", baseUrl)}
                            >
                                <Copy className="h-4 w-4" />
                            </button>
                            {copied === "base" && (
                                <span className="text-[10px] text-slate-500">
                                    Copied
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            Workspace API key
                        </p>
                        <div className="mt-2 flex items-center gap-2 rounded border border-[#ecebed] bg-white px-3 py-2">
                            <code className="flex-1 text-xs text-slate-800 break-words">
                                {apiKeyLoading
                                    ? "Loading..."
                                    : apiKeyValue || "—"}
                            </code>
                            <div className="flex items-center gap-2">
                                <button
                                    aria-label="copy-token"
                                    className="p-1 text-muted-foreground hover:text-foreground"
                                    onClick={() => handleCopy("api-key", apiKeyValue)}
                                    disabled={!apiKeyValue}
                                >
                                    <Copy className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                        {copied === "api-key" && (
                            <span className="mt-1 inline-flex text-[10px] text-slate-500">
                                Copied
                            </span>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Example Request</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="curl">
                        <TabsList className="flex items-start justify-start gap-2 w-full bg-transparent">
                            <TabsTrigger
                                value="curl"
                                className="relative inline-flex items-center justify-start whitespace-nowrap px-3 py-2 text-sm font-medium border-b-2 border-transparent bg-[#5925DC] text-white transition-colors data-[state=active]:bg-transparent data-[state=active]:text-slate-800"
                            >
                                Curl
                            </TabsTrigger>

                            <TabsTrigger
                                value="python"
                                className="relative inline-flex items-center justify-start whitespace-nowrap px-3 py-2 text-sm font-medium border-b-2 border-transparent bg-[#5925DC] text-white transition-colors data-[state=active]:bg-transparent data-[state=active]:text-slate-800"
                            >
                                Python
                            </TabsTrigger>

                            <TabsTrigger
                                value="javascript"
                                className="relative inline-flex items-center justify-start whitespace-nowrap px-3 py-2 text-sm font-medium border-b-2 border-transparent bg-[#5925DC] text-white transition-colors data-[state=active]:bg-transparent data-[state=active]:text-slate-800"
                            >
                                Javascript
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="curl">
                            <div className="relative">
                                <button
                                    aria-label="copy-curl"
                                    onClick={() => handleCopy('curl', curlCode)}
                                    className="absolute right-2 top-2 p-1 rounded-md text-muted-foreground hover:text-foreground bg-white/5"
                                >
                                    <Copy className="h-4 w-4" />
                                </button>
                                {copied === 'curl' && (
                                    <span className="absolute right-12 top-2 rounded bg-slate-800 px-2 py-0.5 text-xs text-white">Copied</span>
                                )}
                                <pre className="rounded bg-[#fbfbfd] p-4 text-xs text-slate-800">{curlCode}</pre>
                            </div>
                        </TabsContent>

                        <TabsContent value="python">
                            <div className="relative">
                                <button
                                    aria-label="copy-python"
                                    onClick={() => handleCopy('python', pythonCode)}
                                    className="absolute right-2 top-2 p-1 rounded-md text-muted-foreground hover:text-foreground bg-white/5"
                                >
                                    <Copy className="h-4 w-4" />
                                </button>
                                {copied === 'python' && (
                                    <span className="absolute right-12 top-2 rounded bg-slate-800 px-2 py-0.5 text-xs text-white">Copied</span>
                                )}
                                <pre className="rounded bg-[#fbfbfd] p-4 text-xs text-slate-800">{pythonCode}</pre>
                            </div>
                        </TabsContent>

                        <TabsContent value="javascript">
                            <div className="relative">
                                <button
                                    aria-label="copy-javascript"
                                    onClick={() => handleCopy('javascript', jsCode)}
                                    className="absolute right-2 top-2 p-1 rounded-md text-muted-foreground hover:text-foreground bg-white/5"
                                >
                                    <Copy className="h-4 w-4" />
                                </button>
                                {copied === 'javascript' && (
                                    <span className="absolute right-12 top-2 rounded bg-slate-800 px-2 py-0.5 text-xs text-white">Copied</span>
                                )}
                                <pre className="rounded bg-[#fbfbfd] p-4 text-xs text-slate-800">{jsCode}</pre>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Example Response</CardTitle>
                </CardHeader>
                <CardContent>
                    <pre className="rounded bg-[#fbfbfd] p-4 text-xs text-slate-800">{`{
  "predictions": [
    { "object": "Ball", "confidence": 0.95, "x": 120, "y": 180 },
    { "object": "Net", "confidence": 0.89, "x": 300, "y": 220 }
  ]
}`}</pre>
                </CardContent>
            </Card>
        </div>
    );
}
