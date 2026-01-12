"use client";

import { DocPageHeader } from "@/components/docs/DocPageHeader"
import { useDocsStore } from "@/stores/docs-store"
import {
                    Table,
                    TableBody,
                    TableCell,
                    TableHead,
                    TableHeader,
                    TableRow,
} from "@/components/ui/table"

export default function ApiReferencePage() {
                    const { platform } = useDocsStore();

                    const imageType = {
                                        'swift': 'UIImage | Data',
                                        'kotlin': 'Bitmap | ByteArray',
                                        'react-native': 'File | string (base64)'
                    }[platform];

                    const modeType = {
                                        'swift': 'AnalysisMode enum (.fast, .accurate)',
                                        'kotlin': 'AnalysisMode enum (FAST, ACCURATE)',
                                        'react-native': "string ('fast' | 'accurate')"
                    }[platform];

                    return (
                                        <div className="space-y-6 pb-12 px-6">
                                                            <DocPageHeader
                                                                                heading="API Reference"
                                                                                text={`Detailed documentation for the ${platform === 'react-native' ? 'React Native' : platform === 'swift' ? 'Swift' : 'Kotlin'} SDK.`}
                                                            />

                                                            <div className="space-y-8">
                                                                                <section id="authentication" className="space-y-4">
                                                                                                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                                                                                                        Authentication
                                                                                                    </h3>
                                                                                                    <p className="leading-7">
                                                                                                                        All requests must be authenticated. Initialize the SDK with your API Key found in your dashboard.
                                                                                                    </p>
                                                                                </section>

                                                                                <section id="endpoints" className="space-y-4">
                                                                                                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                                                                                                        Methods
                                                                                                    </h3>

                                                                                                    <div className="space-y-4">
                                                                                                                        <h4 className="font-semibold text-lg">analyze(image, mode?)</h4>
                                                                                                                        <p className="text-muted-foreground">Analyze an image for objects and text.</p>

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
                                                                                                                                                                                                        <TableCell className="font-mono text-xs">{imageType}</TableCell>
                                                                                                                                                                                                        <TableCell>The image to analyze.</TableCell>
                                                                                                                                                                                    </TableRow>
                                                                                                                                                                                    <TableRow>
                                                                                                                                                                                                        <TableCell className="font-mono">mode</TableCell>
                                                                                                                                                                                                        <TableCell className="font-mono text-xs">{modeType}</TableCell>
                                                                                                                                                                                                        <TableCell>Performance mode (optional).</TableCell>
                                                                                                                                                                                    </TableRow>
                                                                                                                                                                </TableBody>
                                                                                                                                            </Table>
                                                                                                                        </div>
                                                                                                    </div>
                                                                                </section>
                                                            </div>
                                        </div>
                    )
}
