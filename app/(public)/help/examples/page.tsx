import { DocPageHeader } from "@/components/docs/DocPageHeader"

export default function ExamplesPage() {
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
                                                                                                                        This example shows how to perform a basic image analysis request.
                                                                                                    </p>
                                                                                                    <div className="relative rounded-lg bg-zinc-950 px-4 py-4 dark:bg-zinc-900">
                                                                                                                        <pre className="overflow-x-auto">
                                                                                                                                            <code className="relative rounded font-mono text-sm text-zinc-50">
                                                                                                                                                                {`const result = await client.analyze({
  image: fileInput.files[0],
  mode: 'fast'
});

console.log(result.data);`}
                                                                                                                                            </code>
                                                                                                                        </pre>
                                                                                                    </div>
                                                                                </section>

                                                                                <section id="advanced" className="space-y-4">
                                                                                                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                                                                                                        Advanced Usage with React
                                                                                                    </h3>
                                                                                                    <p className="leading-7">
                                                                                                                        Implementing a file upload handler with progress tracking.
                                                                                                    </p>
                                                                                                    <div className="relative rounded-lg bg-zinc-950 px-4 py-4 dark:bg-zinc-900">
                                                                                                                        <pre className="overflow-x-auto">
                                                                                                                                            <code className="relative rounded font-mono text-sm text-zinc-50">
                                                                                                                                                                {`import { useState } from 'react';
import { useCogniVision } from './hooks';

export function ImageAnalyzer() {
  const { analyze, isLoading } = useCogniVision();
  const [result, setResult] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const data = await analyze(file);
      setResult(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      {isLoading && <p>Analyzing...</p>}
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}`}
                                                                                                                                            </code>
                                                                                                                        </pre>
                                                                                                    </div>
                                                                                </section>
                                                            </div>
                                        </div>
                    )
}
