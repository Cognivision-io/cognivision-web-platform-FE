"use client";

import { DocPageHeader } from "@/components/docs/DocPageHeader"
import { useDocsStore } from "@/stores/docs-store"

export default function ExamplesPage() {
                    const { platform } = useDocsStore();

                    const basicExample = {
                                        'swift': `let image = UIImage(named: "example")!
CogniVision.shared.analyze(image: image, mode: .fast) { result in
    switch result {
    case .success(let data):
        print(data)
    case .failure(let error):
        print(error)
    }
}`,
                                        'kotlin': `val image = BitmapFactory.decodeResource(resources, R.drawable.example)
CogniVision.analyze(image, AnalysisMode.FAST) { result ->
    result.onSuccess { data ->
        println(data)
    }.onFailure { error ->
        println(error)
    }
}`,
                                        'react-native': `const result = await client.analyze({
  image: fileInput.files[0],
  mode: 'fast'
});

console.log(result.data);`
                    }[platform];

                    const advancedExample = {
                                        'swift': `// Upload with progress
CogniVision.shared.analyze(image: image, onProgress: { progress in
    print("Upload progress: \\(progress)")
}) { result in
    // Handle result
}`,
                                        'kotlin': `// Upload with progress
CogniVision.analyze(image, 
    onProgress = { progress -> 
        println("Upload progress: $progress") 
    }
) { result ->
    // Handle result
}`,
                                        'react-native': `// React Native specific hook usage would go here
// ... (same as basic for now or custom logic)`
                    }[platform];

                    return (
                                        <div className="space-y-6 pb-12 px-6">
                                                            <DocPageHeader
                                                                                heading="Code Examples"
                                                                                text="Real-world examples to help you build faster."
                                                            />

                                                            <div className="space-y-8">
                                                                                <section id="basic" className="space-y-4">
                                                                                                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                                                                                                        Basic Analysis
                                                                                                    </h3>
                                                                                                    <p className="leading-7">
                                                                                                                        Analysis syntax for <strong>{platform === 'react-native' ? 'React Native' : platform === 'swift' ? 'Swift' : 'Kotlin'}</strong>.
                                                                                                    </p>
                                                                                                    <div className="relative rounded-lg bg-zinc-950 px-4 py-4 dark:bg-zinc-900">
                                                                                                                        <pre className="overflow-x-auto">
                                                                                                                                            <code className="relative rounded font-mono text-sm text-zinc-50">
                                                                                                                                                                {basicExample}
                                                                                                                                            </code>
                                                                                                                        </pre>
                                                                                                    </div>
                                                                                </section>

                                                                                <section id="advanced" className="space-y-4">
                                                                                                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                                                                                                        Advanced Usage
                                                                                                    </h3>
                                                                                                    <p className="leading-7">
                                                                                                                        Handling progress updates and callbacks.
                                                                                                    </p>
                                                                                                    <div className="relative rounded-lg bg-zinc-950 px-4 py-4 dark:bg-zinc-900">
                                                                                                                        <pre className="overflow-x-auto">
                                                                                                                                            <code className="relative rounded font-mono text-sm text-zinc-50">
                                                                                                                                                                {advancedExample}
                                                                                                                                            </code>
                                                                                                                        </pre>
                                                                                                    </div>
                                                                                </section>
                                                            </div>
                                        </div>
                    )
}
