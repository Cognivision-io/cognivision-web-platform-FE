'use client';

import { useState } from 'react';
import ImageUpload from '@/components/annotation/ImageUpload';
import ClassManager from '@/components/annotation/ClassManager';
import AnnotationCanvas from '@/components/annotation/AnnotationCanvas';
import AIInference from '@/components/annotation/AIInference';
import { ImageItem, AnnotationClass, Polygon } from '@/types/annotation';
import { Save, Download } from 'lucide-react';

export default function AnnotationEditor() {
                    const [images, setImages] = useState<ImageItem[]>([]);
                    const [currentImage, setCurrentImage] = useState<ImageItem | null>(null);
                    const [classes, setClasses] = useState<AnnotationClass[]>([]);
                    const [polygons, setPolygons] = useState<Polygon[]>([]);

                    const handleImageSelect = (image: ImageItem) => {
                                        if (!images.find(img => img.id === image.id)) {
                                                            setImages([...images, image]);
                                        }
                                        setCurrentImage(image);
                                        setPolygons([]);
                    };

                    const handleAddClass = (name: string, color: string) => {
                                        const newClass: AnnotationClass = {
                                                            id: `class-${Date.now()}`,
                                                            name,
                                                            color,
                                                            prompt: `all ${name} visible in the image`
                                        };
                                        setClasses([...classes, newClass]);
                    };

                    const handleEditClass = (id: string, name: string, color: string) => {
                                        setClasses(classes.map(cls =>
                                                            cls.id === id ? { ...cls, name, color, prompt: `all ${name} visible in the image` } : cls
                                        ));
                    };

                    const handleDeleteClass = (id: string) => {
                                        setClasses(classes.filter(cls => cls.id !== id));
                                        setPolygons(polygons.filter(p => p.classId !== id));
                    };

                    const handleUpdatePrompt = (id: string, prompt: string) => {
                                        setClasses(classes.map(cls =>
                                                            cls.id === id ? { ...cls, prompt } : cls
                                        ));
                    };

                    const handleMasksReceived = (masks: Polygon[]) => {
                                        setPolygons([...polygons, ...masks]);
                    };

                    const handleUpdatePolygon = (id: string, points: any[]) => {
                                        setPolygons(polygons.map(p =>
                                                            p.id === id ? { ...p, points } : p
                                        ));
                    };

                    const handleDeletePolygon = (id: string) => {
                                        setPolygons(polygons.filter(p => p.id !== id));
                    };

                    const handleRelabelPolygon = (id: string, newClassId: string) => {
                                        const newClass = classes.find(c => c.id === newClassId);
                                        if (!newClass) return;

                                        setPolygons(polygons.map(p =>
                                                            p.id === id ? { ...p, classId: newClassId, className: newClass.name } : p
                                        ));
                    };

                    const handleSave = async () => {
                                        const annotations = {
                                                            image: currentImage,
                                                            classes,
                                                            polygons: polygons.filter(p => p.accepted),
                                                            timestamp: new Date().toISOString()
                                        };

                                        try {
                                                            const response = await fetch('/api/annotation/save', {
                                                                                method: 'POST',
                                                                                headers: { 'Content-Type': 'application/json' },
                                                                                body: JSON.stringify(annotations)
                                                            });

                                                            if (!response.ok) throw new Error('Save failed');

                                                            const data = await response.json();
                                                            alert(`Annotations saved: ${data.filename}`);
                                        } catch (error) {
                                                            console.error('Save error:', error);
                                                            alert('Failed to save annotations');
                                        }
                    };

                    const handleExport = () => {
                                        const annotations = {
                                                            image: currentImage,
                                                            classes,
                                                            polygons: polygons.filter(p => p.accepted),
                                                            timestamp: new Date().toISOString()
                                        };

                                        const blob = new Blob([JSON.stringify(annotations, null, 2)], { type: 'application/json' });
                                        const url = URL.createObjectURL(blob);
                                        const a = document.createElement('a');
                                        a.href = url;
                                        a.download = `annotations-${Date.now()}.json`;
                                        a.click();
                                        URL.revokeObjectURL(url);
                    };

                    return (
                                        <div className="min-h-screen bg-gray-50 p-6">
                                                            <div className="max-w-7xl mx-auto">
                                                                                <div className="mb-6">
                                                                                                    <h1 className="text-3xl font-bold text-gray-900">Annotation Editor</h1>
                                                                                                    <p className="text-gray-600 mt-1">AI-powered image annotation with SAM-3</p>
                                                                                </div>

                                                                                <div className="grid grid-cols-12 gap-6">
                                                                                                    <div className="col-span-3 space-y-6 max-h-[calc(100vh-180px)] overflow-y-auto pr-2">
                                                                                                                        <div className="bg-white rounded-lg shadow-sm p-4">
                                                                                                                                            <ImageUpload onImageSelect={handleImageSelect} images={images} />
                                                                                                                        </div>

                                                                                                                        <div className="bg-white rounded-lg shadow-sm p-4">
                                                                                                                                            <ClassManager
                                                                                                                                                                classes={classes}
                                                                                                                                                                onAddClass={handleAddClass}
                                                                                                                                                                onEditClass={handleEditClass}
                                                                                                                                                                onDeleteClass={handleDeleteClass}
                                                                                                                                                                onUpdatePrompt={handleUpdatePrompt}
                                                                                                                                            />
                                                                                                                        </div>

                                                                                                                        <div className="bg-white rounded-lg shadow-sm p-4">
                                                                                                                                            <AIInference
                                                                                                                                                                classes={classes}
                                                                                                                                                                imageUrl={currentImage?.url || null}
                                                                                                                                                                onMasksReceived={handleMasksReceived}
                                                                                                                                            />
                                                                                                                        </div>

                                                                                                                        <div className="bg-white rounded-lg shadow-sm p-4 space-y-2">
                                                                                                                                            <button
                                                                                                                                                                onClick={handleSave}
                                                                                                                                                                disabled={!currentImage || polygons.filter(p => p.accepted).length === 0}
                                                                                                                                                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                                                                                                                            >
                                                                                                                                                                <Save className="w-4 h-4" />
                                                                                                                                                                Save
                                                                                                                                            </button>
                                                                                                                                            <button
                                                                                                                                                                onClick={handleExport}
                                                                                                                                                                disabled={!currentImage || polygons.filter(p => p.accepted).length === 0}
                                                                                                                                                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                                                                                                                            >
                                                                                                                                                                <Download className="w-4 h-4" />
                                                                                                                                                                Export JSON
                                                                                                                                            </button>
                                                                                                                        </div>
                                                                                                    </div>

                                                                                                    <div className="col-span-9 bg-white rounded-lg shadow-sm p-6">
                                                                                                                        <AnnotationCanvas
                                                                                                                                            image={currentImage}
                                                                                                                                            polygons={polygons}
                                                                                                                                            classes={classes}
                                                                                                                                            onUpdatePolygon={handleUpdatePolygon}
                                                                                                                                            onDeletePolygon={handleDeletePolygon}
                                                                                                                                            onRelabelPolygon={handleRelabelPolygon}
                                                                                                                        />

                                                                                                                        {polygons.length > 0 && (
                                                                                                                                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                                                                                                                                                <p className="text-sm text-gray-600">
                                                                                                                                                                                    {polygons.filter(p => p.accepted).length} accepted, {polygons.filter(p => !p.accepted).length} pending
                                                                                                                                                                </p>
                                                                                                                                            </div>
                                                                                                                        )}
                                                                                                    </div>
                                                                                </div>
                                                            </div>
                                        </div>
                    );
}
