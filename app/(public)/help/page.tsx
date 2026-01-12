"use client";

import { DocPageHeader } from "@/components/docs/DocPageHeader"
import { useDocsStore } from "@/stores/docs-store"

export default function HelpPage() {
                    const { platform } = useDocsStore();

                    const installCommand = {
                                        'swift': ".package(url: \"https://github.com/your-org/ARMeasurementKit.git\", from: \"1.0.0\")",
                                        'kotlin': "implementation 'com.cognivision:sdk:1.2.0'",
                                        'react-native': "npm install @cognivision/react-native-sdk"
                    }[platform];

                    const importCode = {
                                        'swift': `import ARMeasurementKit

// 1. Create an ARView
let arView = ARView(frame: .zero)

// 2. Start an AR session
let config = ARWorldTrackingConfiguration()
config.planeDetection = [.horizontal, .vertical]
config.environmentTexturing = .automatic

arView.session.run(config)`,
                                        'kotlin': "import com.cognivision.sdk.CogniVision\n\nCogniVision.initialize(context, \"YOUR_API_KEY\")",
                                        'react-native': "import { CogniVision } from '@cognivision/react-native-sdk';\n\nconst client = new CogniVision({\n  apiKey: 'YOUR_API_KEY',\n});"
                    }[platform];

                    const introText = {
                                        'swift': "A lightweight Swift package built on ARKit + RealityKit that provides reusable utilities for raycasting, distance measurement, line rendering, and 3D text annotations in AR scenes.",
                                        'kotlin': "Welcome to the CogniVision SDK documentation. This guide will help you integrate our powerful vision capabilities into your applications.",
                                        'react-native': "Welcome to the CogniVision SDK documentation. This guide will help you integrate our powerful vision capabilities into your applications."
                    }[platform];

                    return (
                                        <div className="space-y-6 pb-12 px-6">
                                                            <DocPageHeader
                                                                                heading={platform === 'swift' ? "ARMeasurementKit" : "Getting Started"}
                                                                                text={platform === 'swift' ? "Clean APIs for AR measurements in Swift." : "A minimal SDK documentation for integrating our services."}
                                                            />

                                                            <div className="space-y-6">
                                                                                <section id="introduction" className="space-y-4">
                                                                                                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                                                                                                        Introduction
                                                                                                    </h3>
                                                                                                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                                                                                                                        {introText}
                                                                                                    </p>
                                                                                                    {platform === 'swift' && (
                                                                                                                        <ul className="list-disc pl-6 leading-7">
                                                                                                                                            <li>Screen point → world position conversion (raycasting)</li>
                                                                                                                                            <li>3D distance calculation between two points</li>
                                                                                                                                            <li>Draw 3D lines between points</li>
                                                                                                                                            <li>Render 3D text labels in AR</li>
                                                                                                                        </ul>
                                                                                                    )}
                                                                                </section>

                                                                                <section id="quick-start" className="space-y-4">
                                                                                                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                                                                                                        {platform === 'swift' ? 'Installation' : 'Quick Start'}
                                                                                                    </h3>
                                                                                                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                                                                                                                        {platform === 'swift' ? 'Add the package to your project via Swift Package Manager:' : "To get started, you'll need to install our package."}
                                                                                                    </p>
                                                                                                    <div className="relative rounded-lg bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
                                                                                                                        {installCommand}
                                                                                                    </div>

                                                                                                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight pt-4">
                                                                                                                        {platform === 'swift' ? 'Basic Setup' : 'Initialization'}
                                                                                                    </h3>
                                                                                                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                                                                                                                        {platform === 'swift' ? 'Initialize your ARView and configuration:' : "Once installed, initialize the SDK with your API key."}
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
