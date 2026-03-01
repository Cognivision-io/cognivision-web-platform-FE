'use client';

import { useRef, useEffect, useState } from 'react';
import { Polygon, Point, ImageItem, AnnotationClass } from '@/types/annotation';
import { Move, Edit3, Trash2, Tag } from 'lucide-react';

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

                    const [scale, setScale] = useState(1);
                    const [offsetX, setOffsetX] = useState(0);
                    const [offsetY, setOffsetY] = useState(0);

                    const [isDrawingSelection, setIsDrawingSelection] = useState(false);
                    const [selectionStart, setSelectionStart] = useState<Point | null>(null);
                    const [selectionEnd, setSelectionEnd] = useState<Point | null>(null);

                    useEffect(() => {
                                        if (!image || !canvasRef.current || !containerRef.current) return;

                                        const canvas = canvasRef.current;
                                        const container = containerRef.current;

                                        canvas.width = container.clientWidth;
                                        canvas.height = container.clientHeight;

                                        const fitScale = Math.min(
                                                            canvas.width / image.width!,
                                                            canvas.height / image.height!,
                                                            1
                                        );

                                        setScale(fitScale);
                                        setOffsetX((canvas.width - image.width! * fitScale) / 2);
                                        setOffsetY((canvas.height - image.height! * fitScale) / 2);
                    }, [image]);

                    useEffect(() => {
                                        if (!image || !canvasRef.current) return;
                                        draw();
                    }, [image, polygons, selectedPolygonId, tool, scale, offsetX, offsetY, selectionStart, selectionEnd]);

                    const draw = () => {
                                        const canvas = canvasRef.current;
                                        if (!canvas || !image) return;

                                        const ctx = canvas.getContext('2d');
                                        if (!ctx) return;

                                        ctx.clearRect(0, 0, canvas.width, canvas.height);

                                        const img = new Image();
                                        img.onload = () => {
                                                            ctx.save();
                                                            ctx.translate(offsetX, offsetY);
                                                            ctx.scale(scale, scale);
                                                            ctx.drawImage(img, 0, 0, image.width!, image.height!);
                                                            ctx.restore();

                                                            polygons.forEach((polygon) => {
                                                                                const cls = classes.find((c) => c.id === polygon.classId);
                                                                                const color = cls?.color || '#3b82f6';
                                                                                const isSelected = polygon.id === selectedPolygonId;

                                                                                ctx.beginPath();
                                                                                polygon.points.forEach((point, i) => {
                                                                                                    const screenX = point.x * scale + offsetX;
                                                                                                    const screenY = point.y * scale + offsetY;
                                                                                                    if (i === 0) ctx.moveTo(screenX, screenY);
                                                                                                    else ctx.lineTo(screenX, screenY);
                                                                                });
                                                                                ctx.closePath();

                                                                                ctx.fillStyle = color + '33';
                                                                                ctx.fill();
                                                                                ctx.strokeStyle = isSelected ? '#ffffff' : color;
                                                                                ctx.lineWidth = isSelected ? 3 : 2;
                                                                                ctx.stroke();

                                                                                if (isSelected && tool === 'edit') {
                                                                                                    polygon.points.forEach((point) => {
                                                                                                                        const screenX = point.x * scale + offsetX;
                                                                                                                        const screenY = point.y * scale + offsetY;
                                                                                                                        ctx.beginPath();
                                                                                                                        ctx.arc(screenX, screenY, 5, 0, Math.PI * 2);
                                                                                                                        ctx.fillStyle = '#ffffff';
                                                                                                                        ctx.fill();
                                                                                                                        ctx.strokeStyle = color;
                                                                                                                        ctx.lineWidth = 2;
                                                                                                                        ctx.stroke();
                                                                                                    });
                                                                                }
                                                            });

                                                            // Draw selection rectangle
                                                            if (selectionStart && selectionEnd) {
                                                                                const startX = selectionStart.x * scale + offsetX;
                                                                                const startY = selectionStart.y * scale + offsetY;
                                                                                const endX = selectionEnd.x * scale + offsetX;
                                                                                const endY = selectionEnd.y * scale + offsetY;

                                                                                ctx.strokeStyle = '#3b82f6';
                                                                                ctx.lineWidth = 2;
                                                                                ctx.setLineDash([5, 5]);
                                                                                ctx.strokeRect(
                                                                                                    Math.min(startX, endX),
                                                                                                    Math.min(startY, endY),
                                                                                                    Math.abs(endX - startX),
                                                                                                    Math.abs(endY - startY)
                                                                                );
                                                                                ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
                                                                                ctx.fillRect(
                                                                                                    Math.min(startX, endX),
                                                                                                    Math.min(startY, endY),
                                                                                                    Math.abs(endX - startX),
                                                                                                    Math.abs(endY - startY)
                                                                                );
                                                                                ctx.setLineDash([]);
                                                            }
                                        };
                                        img.src = image.url;
                    };

                    const screenToImage = (screenX: number, screenY: number): Point => {
                                        return {
                                                            x: (screenX - offsetX) / scale,
                                                            y: (screenY - offsetY) / scale
                                        };
                    };

                    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
                                        const canvas = canvasRef.current;
                                        if (!canvas) return;

                                        const rect = canvas.getBoundingClientRect();
                                        const mouseX = e.clientX - rect.left;
                                        const mouseY = e.clientY - rect.top;
                                        const imagePoint = screenToImage(mouseX, mouseY);

                                        if (tool === 'select') {
                                                            setIsDrawingSelection(true);
                                                            setSelectionStart(imagePoint);
                                                            setSelectionEnd(imagePoint);
                                                            return;
                                        }

                                        if (tool === 'edit' && selectedPolygonId) {
                                                            const selectedPolygon = polygons.find((p) => p.id === selectedPolygonId);
                                                            if (!selectedPolygon) return;

                                                            const vertexIndex = selectedPolygon.points.findIndex((point) => {
                                                                                const dist = Math.sqrt(
                                                                                                    Math.pow(point.x - imagePoint.x, 2) +
                                                                                                    Math.pow(point.y - imagePoint.y, 2)
                                                                                );
                                                                                return dist < 10 / scale;
                                                            });

                                                            if (vertexIndex !== -1) {
                                                                                setDraggedVertexIndex(vertexIndex);
                                                            }
                                        }
                    };

                    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
                                        const canvas = canvasRef.current;
                                        if (!canvas) return;

                                        const rect = canvas.getBoundingClientRect();
                                        const mouseX = e.clientX - rect.left;
                                        const mouseY = e.clientY - rect.top;
                                        const imagePoint = screenToImage(mouseX, mouseY);

                                        if (isDrawingSelection && selectionStart) {
                                                            setSelectionEnd(imagePoint);
                                                            return;
                                        }

                                        if (draggedVertexIndex !== null && selectedPolygonId) {
                                                            const selectedPolygon = polygons.find((p) => p.id === selectedPolygonId);
                                                            if (!selectedPolygon) return;

                                                            const newPoints = [...selectedPolygon.points];
                                                            newPoints[draggedVertexIndex] = imagePoint;
                                                            onUpdatePolygon(selectedPolygonId, newPoints);
                                        }
                    };

                    const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
                                        if (isDrawingSelection && selectionStart && selectionEnd) {
                                                            const minX = Math.min(selectionStart.x, selectionEnd.x);
                                                            const maxX = Math.max(selectionStart.x, selectionEnd.x);
                                                            const minY = Math.min(selectionStart.y, selectionEnd.y);
                                                            const maxY = Math.max(selectionStart.y, selectionEnd.y);

                                                            // Find polygon that intersects with selection box
                                                            const selectedPolygon = polygons.find((polygon) => {
                                                                                return polygon.points.some((point) => {
                                                                                                    return point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY;
                                                                                });
                                                            });

                                                            if (selectedPolygon) {
                                                                                setSelectedPolygonId(selectedPolygon.id);
                                                            } else {
                                                                                setSelectedPolygonId(null);
                                                            }

                                                            setIsDrawingSelection(false);
                                                            setSelectionStart(null);
                                                            setSelectionEnd(null);
                                                            return;
                                        }

                                        if (draggedVertexIndex !== null) {
                                                            setDraggedVertexIndex(null);
                                                            return;
                                        }

                                        const canvas = canvasRef.current;
                                        if (!canvas) return;

                                        const rect = canvas.getBoundingClientRect();
                                        const mouseX = e.clientX - rect.left;
                                        const mouseY = e.clientY - rect.top;
                                        const imagePoint = screenToImage(mouseX, mouseY);

                                        if (tool === 'delete') {
                                                            const clickedPolygon = polygons.find((polygon) =>
                                                                                isPointInPolygon(imagePoint, polygon.points)
                                                            );

                                                            if (clickedPolygon) {
                                                                                onDeletePolygon(clickedPolygon.id);
                                                                                setSelectedPolygonId(null);
                                                            }
                                        }
                    };

                    const handleMouseLeave = () => {
                                        setDraggedVertexIndex(null);
                                        setIsDrawingSelection(false);
                                        setSelectionStart(null);
                                        setSelectionEnd(null);
                    };

                    const handleRelabel = (newClassId: string) => {
                                        if (selectedPolygonId) {
                                                            onRelabelPolygon(selectedPolygonId, newClassId);
                                        }
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
                                                            </div>

                                                            <div
                                                                                ref={containerRef}
                                                                                className="relative bg-gray-900 rounded-lg overflow-hidden"
                                                                                style={{ height: '600px' }}
                                                            >
                                                                                {image ? (
                                                                                                    <canvas
                                                                                                                        ref={canvasRef}
                                                                                                                        onMouseDown={handleMouseDown}
                                                                                                                        onMouseMove={handleMouseMove}
                                                                                                                        onMouseUp={handleMouseUp}
                                                                                                                        onMouseLeave={handleMouseLeave}
                                                                                                                        className="absolute top-0 left-0 w-full h-full cursor-crosshair"
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
