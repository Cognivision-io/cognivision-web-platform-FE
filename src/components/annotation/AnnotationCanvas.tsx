'use client';

import { useRef, useEffect, useState } from 'react';
import { Polygon, Point, ImageItem, AnnotationClass } from '@/types/annotation';
import { Move, Edit3, Trash2, Tag, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';

interface AnnotationCanvasProps {
                    image: ImageItem | null;
                    polygons: Polygon[];
                    classes: AnnotationClass[];
                    onUpdatePolygon: (id: string, points: Point[]) => void;
                    onDeletePolygon: (id: string) => void;
                    onRelabelPolygon: (id: string, newClassId: string) => void;
}

type Tool = 'select' | 'edit' | 'delete' | 'relabel';

export default function AnnotationCanvas({
                    image,
                    polygons,
                    classes,
                    onUpdatePolygon,
                    onDeletePolygon,
                    onRelabelPolygon
}: AnnotationCanvasProps) {
                    const canvasRef = useRef<HTMLCanvasElement>(null);
                    const containerRef = useRef<HTMLDivElement>(null);
                    const [tool, setTool] = useState<Tool>('select');
                    const [selectedPolygonId, setSelectedPolygonId] = useState<string | null>(null);
                    const [draggedVertexIndex, setDraggedVertexIndex] = useState<number | null>(null);
                    const [zoom, setZoom] = useState(1);
                    const [baseScale, setBaseScale] = useState(1);
                    const [offset, setOffset] = useState({ x: 0, y: 0 });
                    const [isPanning, setIsPanning] = useState(false);
                    const [panStart, setPanStart] = useState({ x: 0, y: 0 });

                    useEffect(() => {
                                        if (!image || !canvasRef.current) return;

                                        const canvas = canvasRef.current;
                                        const ctx = canvas.getContext('2d');
                                        if (!ctx) return;

                                        const img = new window.Image();
                                        img.onload = () => {
                                                            const containerWidth = containerRef.current?.clientWidth || 800;
                                                            const containerHeight = containerRef.current?.clientHeight || 600;

                                                            const scaleX = containerWidth / img.width;
                                                            const scaleY = containerHeight / img.height;
                                                            const newBaseScale = Math.min(scaleX, scaleY, 1);

                                                            setBaseScale(newBaseScale);
                                                            canvas.width = img.width;
                                                            canvas.height = img.height;

                                                            const offsetX = (containerWidth - img.width * newBaseScale * zoom) / 2;
                                                            const offsetY = (containerHeight - img.height * newBaseScale * zoom) / 2;
                                                            setOffset({ x: offsetX, y: offsetY });

                                                            drawCanvas(ctx, img);
                                        };
                                        img.src = image.url;
                    }, [image, polygons, selectedPolygonId, tool, zoom]);

                    const drawCanvas = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
                                        const scale = baseScale * zoom;
                                        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                                        ctx.save();
                                        ctx.scale(scale, scale);
                                        ctx.drawImage(img, 0, 0);
                                        ctx.restore();

                                        polygons.forEach((polygon) => {
                                                            const cls = classes.find((c) => c.id === polygon.classId);
                                                            const color = cls?.color || '#3b82f6';
                                                            const isSelected = polygon.id === selectedPolygonId;

                                                            ctx.beginPath();
                                                            polygon.points.forEach((point, i) => {
                                                                                const x = point.x * scale;
                                                                                const y = point.y * scale;
                                                                                if (i === 0) ctx.moveTo(x, y);
                                                                                else ctx.lineTo(x, y);
                                                            });
                                                            ctx.closePath();

                                                            ctx.fillStyle = color + '33';
                                                            ctx.fill();
                                                            ctx.strokeStyle = isSelected ? '#ffffff' : color;
                                                            ctx.lineWidth = isSelected ? 3 : 2;
                                                            ctx.stroke();

                                                            if (isSelected && tool === 'edit') {
                                                                                polygon.points.forEach((point) => {
                                                                                                    const x = point.x * scale;
                                                                                                    const y = point.y * scale;
                                                                                                    ctx.beginPath();
                                                                                                    ctx.arc(x, y, 5, 0, Math.PI * 2);
                                                                                                    ctx.fillStyle = '#ffffff';
                                                                                                    ctx.fill();
                                                                                                    ctx.strokeStyle = color;
                                                                                                    ctx.lineWidth = 2;
                                                                                                    ctx.stroke();
                                                                                });
                                                            }
                                        });
                    };

                    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
                                        e.preventDefault();
                                        const delta = e.deltaY > 0 ? 0.9 : 1.1;
                                        setZoom((prev) => Math.min(Math.max(prev * delta, 0.1), 5));
                    };

                    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
                                        const canvas = canvasRef.current;
                                        if (!canvas) return;

                                        const scale = baseScale * zoom;
                                        const rect = canvas.getBoundingClientRect();
                                        const x = (e.clientX - rect.left) / scale;
                                        const y = (e.clientY - rect.top) / scale;

                                        const clickedPolygon = polygons.find((polygon) =>
                                                            isPointInPolygon({ x, y }, polygon.points)
                                        );

                                        if (tool === 'select') {
                                                            setSelectedPolygonId(clickedPolygon?.id || null);
                                        } else if (tool === 'delete' && clickedPolygon) {
                                                            onDeletePolygon(clickedPolygon.id);
                                                            setSelectedPolygonId(null);
                                        }
                    };

                    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
                                        if (tool !== 'edit' || !selectedPolygonId) return;

                                        const canvas = canvasRef.current;
                                        if (!canvas) return;

                                        const scale = baseScale * zoom;
                                        const rect = canvas.getBoundingClientRect();
                                        const x = (e.clientX - rect.left) / scale;
                                        const y = (e.clientY - rect.top) / scale;

                                        const selectedPolygon = polygons.find((p) => p.id === selectedPolygonId);
                                        if (!selectedPolygon) return;

                                        const vertexIndex = selectedPolygon.points.findIndex((point) => {
                                                            const distance = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2));
                                                            return distance < 10 / scale;
                                        });

                                        if (vertexIndex !== -1) {
                                                            setDraggedVertexIndex(vertexIndex);
                                        }
                    };

                    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
                                        if (draggedVertexIndex === null || !selectedPolygonId) return;

                                        const canvas = canvasRef.current;
                                        if (!canvas) return;

                                        const scale = baseScale * zoom;
                                        const rect = canvas.getBoundingClientRect();
                                        const x = (e.clientX - rect.left) / scale;
                                        const y = (e.clientY - rect.top) / scale;

                                        const selectedPolygon = polygons.find((p) => p.id === selectedPolygonId);
                                        if (!selectedPolygon) return;

                                        const newPoints = [...selectedPolygon.points];
                                        newPoints[draggedVertexIndex] = { x, y };
                                        onUpdatePolygon(selectedPolygonId, newPoints);
                    };

                    const handleMouseUp = () => {
                                        setDraggedVertexIndex(null);
                    };

                    const handleRelabel = (newClassId: string) => {
                                        if (selectedPolygonId) {
                                                            onRelabelPolygon(selectedPolygonId, newClassId);
                                        }
                    };

                    const handleZoomIn = () => {
                                        setZoom((prev) => Math.min(prev * 1.2, 5));
                    };

                    const handleZoomOut = () => {
                                        setZoom((prev) => Math.max(prev / 1.2, 0.1));
                    };

                    const handleResetZoom = () => {
                                        setZoom(1);
                    };

                    const isPointInPolygon = (point: Point, polygon: Point[]): boolean => {
                                        let inside = false;
                                        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
                                                            const xi = polygon[i].x;
                                                            const yi = polygon[i].y;
                                                            const xj = polygon[j].x;
                                                            const yj = polygon[j].y;

                                                            const intersect =
                                                                                yi > point.y !== yj > point.y &&
                                                                                point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;
                                                            if (intersect) inside = !inside;
                                        }
                                        return inside;
                    };

                    return (
                                        <div className="space-y-4">
                                                            <div className="flex gap-2 p-2 bg-gray-100 rounded-lg">
                                                                                <button
                                                                                                    onClick={() => setTool('select')}
                                                                                                    className={`flex items-center gap-2 px-3 py-2 rounded ${tool === 'select' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                                                                                                                        }`}
                                                                                >
                                                                                                    <Move className="w-4 h-4" />
                                                                                                    Select
                                                                                </button>
                                                                                <button
                                                                                                    onClick={() => setTool('edit')}
                                                                                                    className={`flex items-center gap-2 px-3 py-2 rounded ${tool === 'edit' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                                                                                                                        }`}
                                                                                >
                                                                                                    <Edit3 className="w-4 h-4" />
                                                                                                    Edit
                                                                                </button>
                                                                                <button
                                                                                                    onClick={() => setTool('delete')}
                                                                                                    className={`flex items-center gap-2 px-3 py-2 rounded ${tool === 'delete' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                                                                                                                        }`}
                                                                                >
                                                                                                    <Trash2 className="w-4 h-4" />
                                                                                                    Delete
                                                                                </button>
                                                                                <button
                                                                                                    onClick={() => setTool('relabel')}
                                                                                                    className={`flex items-center gap-2 px-3 py-2 rounded ${tool === 'relabel' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                                                                                                                        }`}
                                                                                >
                                                                                                    <Tag className="w-4 h-4" />
                                                                                                    Relabel
                                                                                </button>

                                                                                {tool === 'relabel' && selectedPolygonId && (
                                                                                                    <select
                                                                                                                        onChange={(e) => handleRelabel(e.target.value)}
                                                                                                                        className="ml-auto px-3 py-2 border rounded bg-white"
                                                                                                    >
                                                                                                                        <option value="">Select class</option>
                                                                                                                        {classes.map((cls) => (
                                                                                                                                            <option key={cls.id} value={cls.id}>
                                                                                                                                                                {cls.name}
                                                                                                                                            </option>
                                                                                                                        ))}
                                                                                                    </select>
                                                                                )}

                                                                                <div className="ml-auto flex gap-1">
                                                                                                    <button
                                                                                                                        onClick={handleZoomOut}
                                                                                                                        className="px-2 py-2 bg-white text-gray-700 hover:bg-gray-50 rounded"
                                                                                                                        title="Zoom out"
                                                                                                    >
                                                                                                                        <ZoomOut className="w-4 h-4" />
                                                                                                    </button>
                                                                                                    <button
                                                                                                                        onClick={handleResetZoom}
                                                                                                                        className="px-2 py-2 bg-white text-gray-700 hover:bg-gray-50 rounded"
                                                                                                                        title="Reset zoom"
                                                                                                    >
                                                                                                                        <RefreshCw className="w-4 h-4" />
                                                                                                    </button>
                                                                                                    <button
                                                                                                                        onClick={handleZoomIn}
                                                                                                                        className="px-2 py-2 bg-white text-gray-700 hover:bg-gray-50 rounded"
                                                                                                                        title="Zoom in"
                                                                                                    >
                                                                                                                        <ZoomIn className="w-4 h-4" />
                                                                                                    </button>
                                                                                                    <span className="px-3 py-2 bg-white text-gray-700 rounded text-sm">
                                                                                                                        {Math.round(zoom * 100)}%
                                                                                                    </span>
                                                                                </div>
                                                            </div>

                                                            <div
                                                                                ref={containerRef}
                                                                                className="relative bg-gray-900 rounded-lg overflow-hidden"
                                                                                style={{ height: '600px' }}
                                                                                onWheel={handleWheel}
                                                            >
                                                                                {image ? (
                                                                                                    <canvas
                                                                                                                        ref={canvasRef}
                                                                                                                        onClick={handleCanvasClick}
                                                                                                                        onMouseDown={handleMouseDown}
                                                                                                                        onMouseMove={handleMouseMove}
                                                                                                                        onMouseUp={handleMouseUp}
                                                                                                                        onMouseLeave={handleMouseUp}
                                                                                                                        className="absolute cursor-crosshair"
                                                                                                                        style={{
                                                                                                                                            left: `${offset.x}px`,
                                                                                                                                            top: `${offset.y}px`,
                                                                                                                                            width: `${image.width! * baseScale * zoom}px`,
                                                                                                                                            height: `${image.height! * baseScale * zoom}px`,
                                                                                                                        }}
                                                                                                    />
                                                                                ) : (
                                                                                                    <div className="flex items-center justify-center h-full text-gray-400">
                                                                                                                        No image selected
                                                                                                    </div>
                                                                                )}
                                                            </div>
                                        </div>
                    );
}
