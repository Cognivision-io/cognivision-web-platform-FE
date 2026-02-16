'use client';

import { useState } from 'react';
import { Sparkles, Check, X } from 'lucide-react';
import { AnnotationClass, Polygon, SAM3Response } from '@/types/annotation';

interface AIInferenceProps {
                    classes: AnnotationClass[];
                    imageUrl: string | null;
                    onMasksReceived: (masks: Polygon[]) => void;
}

export default function AIInference({ classes, imageUrl, onMasksReceived }: AIInferenceProps) {
                    const [loading, setLoading] = useState(false);
                    const [pendingMasks, setPendingMasks] = useState<Polygon[]>([]);

                    const runInference = async () => {
                                        if (!imageUrl || classes.length === 0) {
                                                            alert('Please upload an image and create at least one class');
                                                            return;
                                        }

                                        setLoading(true);
                                        try {
                                                            const allMasks: Polygon[] = [];

                                                            for (const cls of classes) {
                                                                                const prompt = cls.prompt || cls.name;

                                                                                try {
                                                                                                    // Send imageUrl directly to avoid CORS issues
                                                                                                    const response = await fetch('/api/annotation/infer', {
                                                                                                                        method: 'POST',
                                                                                                                        headers: { 'Content-Type': 'application/json' },
                                                                                                                        body: JSON.stringify({ imageUrl, text: prompt })
                                                                                                    });

                                                                                                    if (!response.ok) {
                                                                                                                        const errorData = await response.json();
                                                                                                                        console.error('API error:', errorData);
                                                                                                                        throw new Error('Inference failed');
                                                                                                    }

                                                                                                    const data: SAM3Response = await response.json();

                                                                                                    if (data.outputs?.[0]?.model_predictions?.predictions) {
                                                                                                                        const predictions = data.outputs[0].model_predictions.predictions;

                                                                                                                        predictions.forEach((pred) => {
                                                                                                                                            allMasks.push({
                                                                                                                                                                id: pred.detection_id,
                                                                                                                                                                points: pred.points,
                                                                                                                                                                classId: cls.id,
                                                                                                                                                                className: cls.name,
                                                                                                                                                                confidence: pred.confidence,
                                                                                                                                                                accepted: false
                                                                                                                                            });
                                                                                                                        });
                                                                                                    }
                                                                                } catch (error) {
                                                                                                    console.error(`Inference failed for class ${cls.name}:`, error);
                                                                                }
                                                            }

                                                            setPendingMasks(allMasks);
                                        } catch (error) {
                                                            console.error('Inference error:', error);
                                                            alert('Inference failed');
                                        } finally {
                                                            setLoading(false);
                                        }
                    };

                    const acceptMasks = () => {
                                        onMasksReceived(pendingMasks.map(m => ({ ...m, accepted: true })));
                                        setPendingMasks([]);
                    };

                    const rejectMasks = () => {
                                        setPendingMasks([]);
                    };

                    return (
                                        <div className="space-y-4">
                                                            <button
                                                                                onClick={runInference}
                                                                                disabled={loading || !imageUrl || classes.length === 0}
                                                                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                                                            >
                                                                                <Sparkles className="w-5 h-5" />
                                                                                {loading ? 'Running AI...' : 'Run AI'}
                                                            </button>

                                                            {pendingMasks.length > 0 && (
                                                                                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-3">
                                                                                                    <p className="text-sm font-medium text-blue-900">
                                                                                                                        Found {pendingMasks.length} masks
                                                                                                    </p>
                                                                                                    <div className="flex gap-2">
                                                                                                                        <button
                                                                                                                                            onClick={acceptMasks}
                                                                                                                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                                                                                                        >
                                                                                                                                            <Check className="w-4 h-4" />
                                                                                                                                            Accept
                                                                                                                        </button>
                                                                                                                        <button
                                                                                                                                            onClick={rejectMasks}
                                                                                                                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                                                                                                        >
                                                                                                                                            <X className="w-4 h-4" />
                                                                                                                                            Reject
                                                                                                                        </button>
                                                                                                    </div>
                                                                                </div>
                                                            )}
                                        </div>
                    );
}
