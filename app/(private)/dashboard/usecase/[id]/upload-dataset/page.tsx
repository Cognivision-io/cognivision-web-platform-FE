"use client";

import { useParams } from "next/navigation";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";

const UploadDatasetPage = () => {
    const params = useParams<{ id: string | string[] }>();
    const rawId = params?.id;
    const id = Array.isArray(rawId) ? rawId[0] : rawId;

    const [files, setFiles] = useState<File[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
    const [sliderValue, setSliderValue] = useState(50);
    const [zoom, setZoom] = useState(1);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const newFiles = Array.from(e.target.files);
            setFiles([...files, ...newFiles]);

            // Create preview for images
            newFiles.forEach((file) => {
                if (file.type.startsWith("image/")) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        setSelectedImage(event.target?.result as string);
                    };
                    reader.readAsDataURL(file);
                }
                simulateUpload([file]);
            });

            if (newFiles.length > 0) {
                setSelectedFile(newFiles[0]);
            }
        }
    };

    const simulateUpload = (newFiles: File[]) => {
        newFiles.forEach((file) => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 30;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                }
                setUploadProgress((prev) => ({
                    ...prev,
                    [file.name]: progress,
                }));
            }, 500);
        });
    };

    const removeFile = (fileName: string) => {
        setFiles(files.filter((f) => f.name !== fileName));
        setUploadProgress((prev) => {
            const newProgress = { ...prev };
            delete newProgress[fileName];
            return newProgress;
        });
        if (selectedFile?.name === fileName) {
            setSelectedFile(null);
            setSelectedImage(null);
        }
    };

    const handleReset = () => {
        setZoom(1);
    };

    const handleZoomIn = () => {
        setZoom((prev) => Math.min(prev + 0.5, 3));
    };

    const handleZoomOut = () => {
        setZoom((prev) => Math.max(prev - 0.5, 1));
    };

    return (
        <div className="min-h-[calc(100vh-3.5rem)] bg-white px-6 py-8 lg:px-10 flex flex-col">
            <div className="mx-auto w-full max-w-7xl flex-1 flex flex-col">
                {/* Header */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                    <h1 className="text-2xl font-semibold text-slate-900">Pre built Dataset</h1>
                </div>

                {/* Main Content Layout */}
                <div className="flex-1 flex gap-6 min-h-0">
                    {/* Left Sidebar - Files List */}
                    <div className="max-w-24 w-full rounded-2xl border border-gray-200 py-2 overflow-y-auto overflow-x-hidden space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-200 pb-2 px-3">
                            <span className="text-md font-semibold text-[#374151]">Files</span>
                            <span className="text-xs font-semibold max-w-7 w-full text-center rounded-full text-[#6B7280] bg-[#F3F4F6]">{files.length}</span>
                        </div>

                        {/* File Upload Input */}
                        <div className="px-3  border-b border-gray-200 pb-4">
                            <label className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-primary hover:bg-primary/5">
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleChange}
                                    className="hidden"
                                    accept="image/*,.zip,.csv"
                                />
                                <Plus className="h-6 w-6 text-gray-400" />
                            </label>
                        </div>


                        {/* Files List */}
                        <div className="space-y-2 px-3">
                            {files.map((file, index) => (
                                <div
                                    key={file.name}
                                    onClick={() => {
                                        setSelectedFile(file);
                                        if (file.type.startsWith("image/")) {
                                            const reader = new FileReader();
                                            reader.onload = (event) => {
                                                setSelectedImage(event.target?.result as string);
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                    className={`relative h-16 w-16 rounded-lg border-2 cursor-pointer transition-all ${selectedFile?.name === file.name
                                        ? "border-primary bg-primary/5"
                                        : "border-gray-200 bg-gray-50 hover:border-primary/40"
                                        }`}
                                >
                                    {file.type.startsWith("image/") ? (
                                        <div className="relative h-full w-full rounded-lg overflow-hidden">
                                            <Image
                                                src={URL.createObjectURL(file)}
                                                alt={file.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-purple-600 to-purple-400">
                                            <span className="text-xs font-bold text-white">{index + 1}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Center - Canvas/Preview */}
                    <div className="flex-1 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-gray-600">
                                {selectedFile?.name || "Image_Leaf(1).png"}
                            </h2>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleZoomIn}
                                    disabled={zoom >= 3}
                                    className={`p-1 rounded-full transition-colors ${zoom >= 3 ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100 text-gray-600'}`}
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={handleZoomOut}
                                    disabled={zoom <= 1}
                                    className={`p-1 rounded-full transition-colors ${zoom <= 1 ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100 text-gray-600'}`}
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={handleReset}
                                    className="text-xs font-medium text-gray-500 hover:text-gray-700 ml-2"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>

                        {/* Canvas Area */}
                        <div className="flex-1 rounded-2xl border border-gray-200 bg-[#0b0f2c] shadow-sm overflow-hidden flex items-center justify-center">
                            {selectedImage ? (
                                <div className="relative w-full h-full">
                                    <Image
                                        src={selectedImage}
                                        alt="Preview"
                                        fill
                                        className="object-contain p-4 transition-transform duration-200 ease-in-out"
                                        style={{ transform: `scale(${zoom})` }}
                                    />
                                </div>
                            ) : (
                                <div className="text-center text-gray-500">
                                    <p className="text-sm">No image selected</p>
                                </div>
                            )}
                        </div>

                        {/* Predictions Bar */}
                        <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-xs font-semibold text-gray-600 whitespace-nowrap">Predictions</span>
                                <div className="flex-1 flex gap-3 items-center">
                                    <button className="text-xs font-medium text-gray-500 hover:text-gray-700 whitespace-nowrap">
                                        Fewer Objects
                                    </button>
                                    <div className="flex-1">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={sliderValue}
                                            onChange={(e) => setSliderValue(parseInt(e.target.value))}
                                            className="w-full h-2 bg-gray-300 rounded-full appearance-none cursor-pointer slider"
                                            style={{
                                                background: `linear-gradient(to right, #9CA3AF 0%, #9CA3AF ${sliderValue}%, #E5E7EB ${sliderValue}%, #E5E7EB 100%)`
                                            }}
                                        />
                                    </div>
                                    <button className="text-xs font-medium text-gray-500 hover:text-gray-700 whitespace-nowrap">
                                        More Objects
                                    </button>
                                </div>
                            </div>
                        </div>

                        <style>{`
                            .slider::-webkit-slider-thumb {
                                appearance: none;
                                width: 18px;
                                height: 18px;
                                border-radius: 50%;
                                background: #6841ff;
                                cursor: pointer;
                                border: 3px solid white;
                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                                transition: all 0.2s ease;
                            }

                            .slider::-webkit-slider-thumb:hover {
                                box-shadow: 0 4px 8px rgba(104, 65, 255, 0.3);
                                transform: scale(1.1);
                            }

                            .slider::-moz-range-thumb {
                                width: 18px;
                                height: 18px;
                                border-radius: 50%;
                                background: #6841ff;
                                cursor: pointer;
                                border: 3px solid white;
                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                                transition: all 0.2s ease;
                            }

                            .slider::-moz-range-thumb:hover {
                                box-shadow: 0 4px 8px rgba(104, 65, 255, 0.3);
                                transform: scale(1.1);
                            }

                            .slider::-moz-range-track {
                                background: transparent;
                                border: none;
                            }

                            .slider::-moz-range-progress {
                                background-color: #9CA3AF;
                            }
                        `}</style>
                    </div>

                    {/* Right Sidebar - Model Info */}
                    <div className="w-72 border-l border-gray-200 pl-6 space-y-6 overflow-y-auto">
                        {/* Model Status */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-slate-900">
                                How is your model looking?
                            </h3>
                            <p className="text-xs text-gray-600">
                                You can adjust the slider to show more or less objects before taking your next action.
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="space-y-3">
                            <Button
                                className="w-full h-11 rounded-lg bg-white border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
                            >
                                <span>📦</span>
                                Deploy Your Model
                            </Button>
                            <p className="text-xs text-center text-gray-500">
                                Start using your model now.
                            </p>
                            <p className="text-xs text-center text-gray-400 font-medium">OR</p>
                        </div>

                        {/* Secondary Action */}
                        <Button
                            variant="outline"
                            className="w-full h-11 rounded-lg border-2 border-gray-200 text-gray-700 font-semibold hover:border-gray-300 transition-colors"
                        >
                            <Plus className="h-4 w-4" />
                            Test on More Files
                        </Button>

                        {/* Relabel Objects */}
                        <Button
                            variant="outline"
                            className="w-full h-11 rounded-lg border-2 border-gray-200 text-gray-700 font-semibold hover:border-gray-300 transition-colors"
                        >
                            Relabel Objects
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadDatasetPage;
