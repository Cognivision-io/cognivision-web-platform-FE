'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { ImageItem } from '@/types/annotation';

interface ImageUploadProps {
                    onImageSelect: (image: ImageItem) => void;
                    images: ImageItem[];
}

export default function ImageUpload({ onImageSelect, images }: ImageUploadProps) {
                    const [uploading, setUploading] = useState(false);

                    const onDrop = useCallback(async (acceptedFiles: File[]) => {
                                        if (acceptedFiles.length === 0) return;

                                        setUploading(true);
                                        const file = acceptedFiles[0];

                                        try {
                                                            const objectUrl = URL.createObjectURL(file);
                                                            const img = new Image();
                                                            await new Promise<void>((resolve, reject) => {
                                                                                img.onload = () => resolve();
                                                                                img.onerror = () => reject(new Error('Could not read image'));
                                                                                img.src = objectUrl;
                                                            });
                                                            onImageSelect({
                                                                                id: `local-${Date.now()}`,
                                                                                url: objectUrl,
                                                                                name: file.name,
                                                                                width: img.width,
                                                                                height: img.height,
                                                            });
                                        } catch (error) {
                                                            console.error('Upload error:', error);
                                                            alert('Failed to load image');
                                        } finally {
                                                            setUploading(false);
                                        }
                    }, [onImageSelect]);

                    const { getRootProps, getInputProps, isDragActive } = useDropzone({
                                        onDrop,
                                        accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
                                        multiple: false
                    });

                    return (
                                        <div className="space-y-4">
                                                            <div
                                                                                {...getRootProps()}
                                                                                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                                                                                                    }`}
                                                            >
                                                                                <input {...getInputProps()} />
                                                                                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                                                                {uploading ? (
                                                                                                    <p className="text-gray-600">Uploading...</p>
                                                                                ) : isDragActive ? (
                                                                                                    <p className="text-blue-600">Drop image here</p>
                                                                                ) : (
                                                                                                    <>
                                                                                                                        <p className="text-gray-600 mb-2">Drag & drop an image here</p>
                                                                                                                        <p className="text-sm text-gray-400">or click to select</p>
                                                                                                    </>
                                                                                )}
                                                            </div>

                                                            {images.length > 0 && (
                                                                                <div className="space-y-2">
                                                                                                    <h3 className="font-medium text-sm text-gray-700">Images</h3>
                                                                                                    <div className="space-y-1">
                                                                                                                        {images.map((img) => (
                                                                                                                                            <div
                                                                                                                                                                key={img.id}
                                                                                                                                                                onClick={() => onImageSelect(img)}
                                                                                                                                                                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer"
                                                                                                                                            >
                                                                                                                                                                <ImageIcon className="w-4 h-4 text-gray-500" />
                                                                                                                                                                <span className="text-sm truncate">{img.name}</span>
                                                                                                                                            </div>
                                                                                                                        ))}
                                                                                                    </div>
                                                                                </div>
                                                            )}
                                        </div>
                    );
}
