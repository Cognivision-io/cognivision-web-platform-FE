import { DocPageHeader } from "@/components/docs/DocPageHeader"
import {
                    Table,
                    TableBody,
                    TableCell,
                    TableHead,
                    TableHeader,
                    TableRow,
} from "@/components/ui/table"

export default function ApiReferencePage() {
                    return (
                                        <div className="space-y-6 pb-12 px-6">
                                                            <DocPageHeader
                                                                                heading="API Reference"
                                                                                text="Detailed documentation of our API endpoints and methods."
                                                            />

                                                            <div className="space-y-8">
                                                                                <section id="authentication" className="space-y-4">
                                                                                                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                                                                                                        Authentication
                                                                                                    </h3>
                                                                                                    <p className="leading-7">
                                                                                                                        All requests must be authenticated using your API key. You can pass it in the constructor or via headers.
                                                                                                    </p>
                                                                                                    <div className="relative rounded-lg bg-muted px-4 py-3 font-mono text-sm">
                                                                                                                        Authorization: Bearer YOUR_API_KEY
                                                                                                    </div>
                                                                                </section>

                                                                                <section id="endpoints" className="space-y-4">
                                                                                                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                                                                                                        Endpoints
                                                                                                    </h3>

                                                                                                    <div className="space-y-4">
                                                                                                                        <h4 className="font-semibold text-lg">POST /v1/analyze</h4>
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
                                                                                                                                                                                                        <TableCell>File | string</TableCell>
                                                                                                                                                                                                        <TableCell>The image file or base64 string to analyze.</TableCell>
                                                                                                                                                                                    </TableRow>
                                                                                                                                                                                    <TableRow>
                                                                                                                                                                                                        <TableCell className="font-mono">mode</TableCell>
                                                                                                                                                                                                        <TableCell>string</TableCell>
                                                                                                                                                                                                        <TableCell>Analysis mode: 'fast' or 'accurate'.</TableCell>
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
