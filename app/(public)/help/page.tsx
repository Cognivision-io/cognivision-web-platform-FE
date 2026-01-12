"use client";

import { DocPageHeader } from "@/components/docs/DocPageHeader"
import { useDocsStore } from "@/stores/docs-store"

export default function HelpPage() {
                    const { platform } = useDocsStore();

                    const installCommand = {
                                        'swift': "pod 'CogniVisionSDK'",
                                        'kotlin': "implementation 'com.cognivision:sdk:1.2.0'",
                                        'react-native': "npm install @cognivision/react-native-sdk"
                    }[platform];

                    const importCode = {
                                        'swift': "import CogniVisionSDK\n\nCogniVision.shared.setup(apiKey: \"YOUR_API_KEY\")",
                                        'kotlin': "import com.cognivision.sdk.CogniVision\n\nCogniVision.initialize(context, \"YOUR_API_KEY\")",
                                        'react-native': "import { CogniVision } from '@cognivision/react-native-sdk';\n\nconst client = new CogniVision({\n  apiKey: 'YOUR_API_KEY',\n});"
                    }[platform];

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
                                                                                                                        To get started, you'll need to install our package.
                                                                                                    </p>
                                                                                                    <div className="relative rounded-lg bg-muted px-4 py-3 font-mono text-sm">
                                                                                                                        {installCommand}
                                                                                                    </div>
                                                                                                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                                                                                                                        Once installed, initialize the SDK with your API key.
                                                                                                    </p>
                                                                                                    <div className="relative rounded-lg bg-zinc-950 px-4 py-4 dark:bg-zinc-900">
                                                                                                                        <pre className="overflow-x-auto">
                                                                                                                                            <code className="relative rounded font-mono text-sm text-zinc-50">
                                                                                                                                                                {importCode}
                                                                                                                                            </code>
                                                                                                                        </pre>
                                                                                                    </div>
                                                                                </section>
                                                            </div>
                                        </div>
                    )
}
