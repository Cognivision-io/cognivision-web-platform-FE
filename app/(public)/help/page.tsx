import { DocPageHeader } from "@/components/docs/DocPageHeader"

export default function HelpPage() {
                    return (
                                        <div className="space-y-6 pb-12 px-6">
                                                            <DocPageHeader
                                                                                heading="Getting Started"
                                                                                text="A minimal SDK documentation for integrating our services."
                                                            />

                                                            <div className="space-y-6">
                                                                                <section id="introduction" className="space-y-4">
                                                                                                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                                                                                                        Introduction
                                                                                                    </h3>
                                                                                                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                                                                                                                        Welcome to the CogniVision SDK documentation. This guide will help you integrate our powerful vision capabilities into your applications.
                                                                                                                        Our SDK is designed to be lightweight, easy to use, and performant.
                                                                                                    </p>
                                                                                </section>

                                                                                <section id="quick-start" className="space-y-4">
                                                                                                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                                                                                                        Quick Start
                                                                                                    </h3>
                                                                                                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                                                                                                                        To get started, you'll need to install our package using your preferred package manager.
                                                                                                    </p>
                                                                                                    <div className="relative rounded-lg bg-muted px-4 py-3 font-mono text-sm">
                                                                                                                        npm install @cognivision/sdk
                                                                                                    </div>
                                                                                                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                                                                                                                        Once installed, you can import the SDK and initialize it with your API key.
                                                                                                    </p>
                                                                                                    <div className="relative rounded-lg bg-muted px-4 py-3 font-mono text-sm whitespace-pre">
                                                                                                                        {`import { CogniVision } from '@cognivision/sdk';\n\nconst client = new CogniVision({\n  apiKey: 'YOUR_API_KEY',\n});`}
                                                                                                    </div>
                                                                                </section>
                                                            </div>
                                        </div>
                    )
}
