'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import { AnnotationClass } from '@/types/annotation';

interface ClassManagerProps {
                    classes: AnnotationClass[];
                    onAddClass: (className: string, color: string) => void;
                    onEditClass: (id: string, className: string, color: string) => void;
                    onDeleteClass: (id: string) => void;
                    onUpdatePrompt: (id: string, prompt: string) => void;
}

const PRESET_COLORS = [
                    '#ef4444', '#f97316', '#eab308', '#22c55e',
                    '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'
];

export default function ClassManager({
                    classes,
                    onAddClass,
                    onEditClass,
                    onDeleteClass,
                    onUpdatePrompt
}: ClassManagerProps) {
                    const [newClassName, setNewClassName] = useState('');
                    const [newClassColor, setNewClassColor] = useState(PRESET_COLORS[0]);
                    const [editingId, setEditingId] = useState<string | null>(null);
                    const [editName, setEditName] = useState('');
                    const [editColor, setEditColor] = useState('');

                    const handleAdd = () => {
                                        if (!newClassName.trim()) return;
                                        onAddClass(newClassName.trim(), newClassColor);
                                        setNewClassName('');
                                        setNewClassColor(PRESET_COLORS[0]);
                    };

                    const startEdit = (cls: AnnotationClass) => {
                                        setEditingId(cls.id);
                                        setEditName(cls.name);
                                        setEditColor(cls.color);
                    };

                    const saveEdit = () => {
                                        if (!editingId || !editName.trim()) return;
                                        onEditClass(editingId, editName.trim(), editColor);
                                        setEditingId(null);
                    };

                    return (
                                        <div className="space-y-4">
                                                            <h3 className="font-semibold text-lg">Classes</h3>

                                                            <div className="flex gap-2 items-stretch">
                                                                                <input
                                                                                                    type="text"
                                                                                                    value={newClassName}
                                                                                                    onChange={(e) => setNewClassName(e.target.value)}
                                                                                                    onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                                                                                                    placeholder="Class name"
                                                                                                    className="flex-1 min-w-0 px-3 py-2 border rounded-md text-sm"
                                                                                />
                                                                                <div
                                                                                                    className="w-10 h-10 rounded-md border cursor-pointer flex items-center justify-center"
                                                                                                    style={{ backgroundColor: newClassColor }}
                                                                                                    onClick={() => {
                                                                                                                        const currentIndex = PRESET_COLORS.indexOf(newClassColor);
                                                                                                                        const nextIndex = (currentIndex + 1) % PRESET_COLORS.length;
                                                                                                                        setNewClassColor(PRESET_COLORS[nextIndex]);
                                                                                                    }}
                                                                                                    title="Click to change color"
                                                                                />
                                                                                <button
                                                                                                    onClick={handleAdd}
                                                                                                    className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex-shrink-0"
                                                                                >
                                                                                                    <Plus className="w-4 h-4" />
                                                                                </button>
                                                            </div>

                                                            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                                                                                {classes.map((cls) => (
                                                                                                    <div key={cls.id} className="border rounded-lg p-3 space-y-2">
                                                                                                                        {editingId === cls.id ? (
                                                                                                                                            <div className="space-y-2">
                                                                                                                                                                <div className="flex gap-2">
                                                                                                                                                                                    <input
                                                                                                                                                                                                        type="text"
                                                                                                                                                                                                        value={editName}
                                                                                                                                                                                                        onChange={(e) => setEditName(e.target.value)}
                                                                                                                                                                                                        className="flex-1 px-2 py-1 border rounded text-sm"
                                                                                                                                                                                    />
                                                                                                                                                                                    <select
                                                                                                                                                                                                        value={editColor}
                                                                                                                                                                                                        onChange={(e) => setEditColor(e.target.value)}
                                                                                                                                                                                                        className="px-2 py-1 border rounded text-sm"
                                                                                                                                                                                                        style={{ backgroundColor: editColor, color: 'white' }}
                                                                                                                                                                                    >
                                                                                                                                                                                                        {PRESET_COLORS.map((color) => (
                                                                                                                                                                                                                            <option key={color} value={color} style={{ backgroundColor: color }}>
                                                                                                                                                                                                                                                {color}
                                                                                                                                                                                                                            </option>
                                                                                                                                                                                                        ))}
                                                                                                                                                                                    </select>
                                                                                                                                                                                    <button onClick={saveEdit} className="p-1 text-green-600 hover:bg-green-50 rounded">
                                                                                                                                                                                                        <Check className="w-4 h-4" />
                                                                                                                                                                                    </button>
                                                                                                                                                                                    <button onClick={() => setEditingId(null)} className="p-1 text-gray-600 hover:bg-gray-50 rounded">
                                                                                                                                                                                                        <X className="w-4 h-4" />
                                                                                                                                                                                    </button>
                                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                        ) : (
                                                                                                                                            <div className="flex items-center justify-between">
                                                                                                                                                                <div className="flex items-center gap-2">
                                                                                                                                                                                    <div
                                                                                                                                                                                                        className="w-4 h-4 rounded"
                                                                                                                                                                                                        style={{ backgroundColor: cls.color }}
                                                                                                                                                                                    />
                                                                                                                                                                                    <span className="font-medium">{cls.name}</span>
                                                                                                                                                                </div>
                                                                                                                                                                <div className="flex gap-1">
                                                                                                                                                                                    <button
                                                                                                                                                                                                        onClick={() => startEdit(cls)}
                                                                                                                                                                                                        className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                                                                                                                                                                                    >
                                                                                                                                                                                                        <Edit2 className="w-4 h-4" />
                                                                                                                                                                                    </button>
                                                                                                                                                                                    <button
                                                                                                                                                                                                        onClick={() => onDeleteClass(cls.id)}
                                                                                                                                                                                                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                                                                                                                                                                                    >
                                                                                                                                                                                                        <Trash2 className="w-4 h-4" />
                                                                                                                                                                                    </button>
                                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                        )}

                                                                                                                        <div className="space-y-1">
                                                                                                                                            <label className="text-xs text-gray-500">Auto-generated prompt:</label>
                                                                                                                                            <input
                                                                                                                                                                type="text"
                                                                                                                                                                value={cls.prompt || cls.name}
                                                                                                                                                                onChange={(e) => onUpdatePrompt(cls.id, e.target.value)}
                                                                                                                                                                className="w-full px-2 py-1 border rounded text-sm bg-gray-50"
                                                                                                                                                                placeholder="Custom prompt"
                                                                                                                                            />
                                                                                                                        </div>
                                                                                                    </div>
                                                                                ))}
                                                            </div>
                                        </div>
                    );
}
