import { DocPageHeader } from "@/components/docs/DocPageHeader"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function ChangelogPage() {
                    return (
                                        <div className="space-y-6 pb-12 px-6">
                                                            <DocPageHeader
                                                                                heading="Changelog"
                                                                                text="Latest updates and improvements to the SDK."
                                                            />

                                                            <div className="space-y-12">

                                                                                {/* Version 1.2.0 */}
                                                                                <section id="v.1.2.0" className="relative pl-8 border-l-2 border-muted">
                                                                                                    <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary" />
                                                                                                    <div className="space-y-2 mb-6">
                                                                                                                        <div className="flex items-center gap-3">
                                                                                                                                            <h2 className="text-2xl font-bold">v1.2.0</h2>
                                                                                                                                            <Badge>Latest</Badge>
                                                                                                                                            <span className="text-muted-foreground text-sm">January 10, 2026</span>
                                                                                                                        </div>
                                                                                                                        <p className="text-lg text-muted-foreground">
                                                                                                                                            Introducing video analysis support and improved error handling for large payloads.
                                                                                                                        </p>
                                                                                                    </div>

                                                                                                    <div className="grid gap-6 md:grid-cols-2">
                                                                                                                        <Card>
                                                                                                                                            <CardHeader>
                                                                                                                                                                <CardTitle className="text-base">🚀 New Features</CardTitle>
                                                                                                                                            </CardHeader>
                                                                                                                                            <CardContent className="space-y-2 text-sm">
                                                                                                                                                                <p>• Added <code className="bg-muted px-1 py-0.5 rounded">analyzeVideo()</code> endpoint for processing video files up to 50MB.</p>
                                                                                                                                                                <p>• New <code className="bg-muted px-1 py-0.5 rounded">onProgress</code> callback for file uploads.</p>
                                                                                                                                            </CardContent>
                                                                                                                        </Card>
                                                                                                                        <Card>
                                                                                                                                            <CardHeader>
                                                                                                                                                                <CardTitle className="text-base">🐛 Bug Fixes</CardTitle>
                                                                                                                                            </CardHeader>
                                                                                                                                            <CardContent className="space-y-2 text-sm">
                                                                                                                                                                <p>• Fixed a memory leak in the WebSocket connection handler.</p>
                                                                                                                                                                <p>• Resolved an issue where PNG transparency was lost during compression.</p>
                                                                                                                                            </CardContent>
                                                                                                                        </Card>
                                                                                                    </div>
                                                                                </section>

                                                                                {/* Version 1.1.0 */}
                                                                                <section id="v.1.1.0" className="relative pl-8 border-l-2 border-muted">
                                                                                                    <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-muted-foreground/30" />
                                                                                                    <div className="space-y-2 mb-6">
                                                                                                                        <div className="flex items-center gap-3">
                                                                                                                                            <h2 className="text-2xl font-bold">v1.1.0</h2>
                                                                                                                                            <span className="text-muted-foreground text-sm">December 25, 2025</span>
                                                                                                                        </div>
                                                                                                                        <p className="text-muted-foreground">
                                                                                                                                            Christmas update bringing React hooks and TypeScript improvements.
                                                                                                                        </p>
                                                                                                    </div>
                                                                                                    <div className="space-y-2">
                                                                                                                        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Improvements</h4>
                                                                                                                        <ul className="list-disc list-inside space-y-1 ml-2">
                                                                                                                                            <li>Added <code className="bg-muted px-1 py-0.5 rounded">useCogniVision</code> hook for easier React integration.</li>
                                                                                                                                            <li>Exported full TypeScript interfaces for all API response types.</li>
                                                                                                                                            <li>Reduced bundle size by 15%.</li>
                                                                                                                        </ul>
                                                                                                    </div>
                                                                                </section>

                                                                                {/* Version 1.0.0 */}
                                                                                <section id="v1.0.0" className="relative pl-8 border-l-2 border-muted">
                                                                                                    <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-muted-foreground/30" />
                                                                                                    <div className="space-y-2 mb-6">
                                                                                                                        <div className="flex items-center gap-3">
                                                                                                                                            <h2 className="text-2xl font-bold">v1.0.0</h2>
                                                                                                                                            <span className="text-muted-foreground text-sm">December 01, 2025</span>
                                                                                                                        </div>
                                                                                                                        <p className="text-muted-foreground">
                                                                                                                                            Initial public release.
                                                                                                                        </p>
                                                                                                    </div>
                                                                                                    <div className="space-y-2">
                                                                                                                        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Features</h4>
                                                                                                                        <ul className="list-disc list-inside space-y-1 ml-2">
                                                                                                                                            <li>Basic image analysis API.</li>
                                                                                                                                            <li>Support for JPEG, PNG, and WebP.</li>
                                                                                                                                            <li>Simple authentication via API Key.</li>
                                                                                                                        </ul>
                                                                                                    </div>
                                                                                </section>

                                                            </div>
                                        </div>
                    )
}
