'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ArrowRight, Save } from 'lucide-react';
import { cn } from '@/lib/utils';

// Editor components (reused)
import ClassManager from '@/components/annotation/ClassManager';
import AnnotationCanvas from '@/components/annotation/AnnotationCanvas';
import AIInference from '@/components/annotation/AIInference';

// Types
import type { ImageItem, AnnotationClass, Polygon } from '@/types/annotation';

// Queries and mutations
import {
  useUnannotatedImagesQuery,
} from '@/features/dataset/queries/image.query';
import { useProjectQuery } from '@/features/dataset/queries/project.query';
import { useUploadAnnotationMutation } from '@/features/dataset/mutations/project.mutation';

// Utils
import {
  polygonToAnnotationItem,
  annotationsToYOLO,
  imageToImageItem,
  projectClassesToAnnotationClasses,
} from '@/features/dataset/utils/annotation-conversion.utils';
import CustomToast from '@/components/ui/sonner';
import { getApiErrorMessage } from '@/lib/api-error';

interface ProjectAnnotationStepProps {
  onNext: () => void;
  uploadedData?: { roboflowProjectId: string; imageIds: string[] } | null;
}

export function ProjectAnnotationStep({ onNext, uploadedData }: ProjectAnnotationStepProps) {
  const params = useParams();
  const projectId = Number(params.id);

  // Fetch project and images
  const { data: projectData } = useProjectQuery(projectId);
  const { data: imagesData } = useUnannotatedImagesQuery(projectId, 0, 50);

  // Editor state (per-image)
  const [images, setImages] = useState<ImageItem[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageClasses, setImageClasses] = useState<Record<string, AnnotationClass[]>>({});
  const [imagePolygons, setImagePolygons] = useState<Record<string, Polygon[]>>({});
  const [hasUploadedAnnotations, setHasUploadedAnnotations] = useState(false);

  const roboflowProjectId = uploadedData?.roboflowProjectId || projectData?.data?.project?.id || '';
  const currentImage = images[currentImageIndex] || null;
  const currentClasses = currentImage ? (imageClasses[currentImage.id] || []) : [];
  const currentPolygons = currentImage ? (imagePolygons[currentImage.id] || []) : [];

  // Upload mutation
  const { mutate: uploadAnnotation, isPending: isUploading } = useUploadAnnotationMutation({
    onSuccess: () => {
      CustomToast.success('Annotations saved successfully!');
      setHasUploadedAnnotations(true);
    },
    onError: (error) => {
      CustomToast.error(getApiErrorMessage(error, 'Failed to save annotations'));
    },
  });

  // Initialize images from project
  useEffect(() => {
    if (imagesData?.results) {
      const transformedImages = imagesData.results.map(imageToImageItem);
      setImages(transformedImages);
    }
  }, [imagesData]);

  // Initialize classes from project metadata
  useEffect(() => {
    if (projectData?.data?.project?.classes && images.length > 0) {
      const projectClasses = projectClassesToAnnotationClasses(
        projectData.data.project.classes,
        projectData.data.project.colors
      );

      // Set same classes for all images initially
      const classesForAllImages: Record<string, AnnotationClass[]> = {};
      images.forEach(img => {
        classesForAllImages[img.id] = [...projectClasses];
      });
      setImageClasses(classesForAllImages);
    }
  }, [projectData, images]);

  // Load image dimensions dynamically
  useEffect(() => {
    if (currentImage && !currentImage.width) {
      const img = new Image();
      img.onload = () => {
        setImages(prev =>
          prev.map(i =>
            i.id === currentImage.id
              ? { ...i, width: img.naturalWidth, height: img.naturalHeight }
              : i
          )
        );
      };
      img.src = currentImage.url;
    }
  }, [currentImage]);

  // Class management handlers
  const handleAddClass = (name: string, color: string) => {
    if (!currentImage) return;
    const newClass: AnnotationClass = {
      id: `class-${Date.now()}`,
      name,
      color,
      prompt: name,
    };
    setImageClasses({
      ...imageClasses,
      [currentImage.id]: [...currentClasses, newClass],
    });
  };

  const handleEditClass = (id: string, name: string, color: string) => {
    if (!currentImage) return;
    setImageClasses({
      ...imageClasses,
      [currentImage.id]: currentClasses.map(cls =>
        cls.id === id ? { ...cls, name, color, prompt: name } : cls
      ),
    });
  };

  const handleDeleteClass = (id: string) => {
    if (!currentImage) return;
    setImageClasses({
      ...imageClasses,
      [currentImage.id]: currentClasses.filter(cls => cls.id !== id),
    });
    setImagePolygons({
      ...imagePolygons,
      [currentImage.id]: currentPolygons.filter(p => p.classId !== id),
    });
  };

  const handleUpdatePrompt = (id: string, prompt: string) => {
    if (!currentImage) return;
    setImageClasses({
      ...imageClasses,
      [currentImage.id]: currentClasses.map(cls =>
        cls.id === id ? { ...cls, prompt } : cls
      ),
    });
  };

  // Polygon handlers
  const handleMasksReceived = (masks: Polygon[]) => {
    if (!currentImage) return;
    setImagePolygons({
      ...imagePolygons,
      [currentImage.id]: [...currentPolygons, ...masks],
    });
  };

  const handleUpdatePolygon = (id: string, points: any[]) => {
    if (!currentImage) return;
    setImagePolygons({
      ...imagePolygons,
      [currentImage.id]: currentPolygons.map(p =>
        p.id === id ? { ...p, points } : p
      ),
    });
  };

  const handleDeletePolygon = (id: string) => {
    if (!currentImage) return;
    setImagePolygons({
      ...imagePolygons,
      [currentImage.id]: currentPolygons.filter(p => p.id !== id),
    });
  };

  const handleRelabelPolygon = (id: string, newClassId: string) => {
    if (!currentImage) return;
    const newClass = currentClasses.find(c => c.id === newClassId);
    if (!newClass) return;

    setImagePolygons({
      ...imagePolygons,
      [currentImage.id]: currentPolygons.map(p =>
        p.id === id ? { ...p, classId: newClassId, className: newClass.name } : p
      ),
    });
  };

  // Save annotations
  const handleSaveAnnotations = async () => {
    if (!currentImage || !currentImage.width || !currentImage.height) {
      CustomToast.error('Image dimensions not available');
      return;
    }

    const acceptedPolygons = currentPolygons.filter(p => p.accepted);
    if (acceptedPolygons.length === 0) {
      CustomToast.error('No accepted annotations to save');
      return;
    }

    // Convert polygons to annotation items
    const annotationItems = acceptedPolygons.map(polygon =>
      polygonToAnnotationItem(polygon, currentImage.width!, currentImage.height!)
    );

    // Convert to YOLO format
    const { yoloContent, classList } = annotationsToYOLO(annotationItems);

    // Create file
    const blob = new Blob([yoloContent], { type: 'text/plain' });
    const file = new File([blob], `${currentImage.id}_annotation.txt`, { type: 'text/plain' });

    // Create label map
    const labelMap: Record<string, string> = {};
    classList.forEach((cls, idx) => {
      labelMap[String(idx)] = cls;
    });

    // Upload
    uploadAnnotation({
      projectId,
      imageId: currentImage.id,
      file,
      labelMap,
    });
  };

  return (
    <div className="flex h-[calc(100vh-16rem)] min-h-[600px]">
      {/* Left Sidebar - Image List */}
      <div className="w-20 flex-none border-r border-slate-200 bg-white py-4">
        <div className="mb-4 flex flex-col items-center gap-1 px-2">
          <span className="text-xs font-semibold text-slate-500">Images</span>
          <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-slate-100 px-1.5 text-[10px] font-bold text-slate-600">
            {images.length}
          </span>
        </div>

        <div className="flex flex-col gap-2 overflow-y-auto px-2 max-h-[35rem]">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setCurrentImageIndex(i)}
              className={cn(
                "relative h-12 w-12 overflow-hidden rounded-lg border transition-all flex-none",
                currentImageIndex === i
                  ? 'border-[#6841ff] ring-2 ring-[#6841ff]/20'
                  : 'border-slate-200 hover:border-slate-300'
              )}
            >
              {img.url ? (
                <img src={img.url} alt="thumbnail" className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-slate-100 animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Center - Canvas */}
      <div className="flex flex-1 flex-col bg-[#f8f9fc]">
        <div className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-6">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-900">
              {currentImage?.name || 'No image selected'}
            </span>
            <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
              AI Annotation
            </span>
          </div>
        </div>

        <div className="flex-1 p-6">
          <AnnotationCanvas
            image={currentImage}
            polygons={currentPolygons}
            classes={currentClasses}
            onUpdatePolygon={handleUpdatePolygon}
            onDeletePolygon={handleDeletePolygon}
            onRelabelPolygon={handleRelabelPolygon}
          />

          {currentPolygons.length > 0 && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                {currentPolygons.filter(p => p.accepted).length} accepted, {currentPolygons.filter(p => !p.accepted).length} pending
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar - Controls */}
      <div className="w-80 flex-none border-l border-slate-200 bg-white p-6 space-y-6 overflow-y-auto">
        <div className="bg-white rounded-lg">
          <ClassManager
            classes={currentClasses}
            onAddClass={handleAddClass}
            onEditClass={handleEditClass}
            onDeleteClass={handleDeleteClass}
            onUpdatePrompt={handleUpdatePrompt}
          />
        </div>

        <div className="bg-white rounded-lg">
          <AIInference
            classes={currentClasses}
            imageUrl={currentImage?.url || null}
            onMasksReceived={handleMasksReceived}
          />
        </div>

        <div className="space-y-2">
          <button
            onClick={handleSaveAnnotations}
            disabled={isUploading || currentPolygons.filter(p => p.accepted).length === 0}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-4 w-4" />
            {isUploading ? 'Saving...' : 'Save Annotations'}
          </button>

          <button
            onClick={onNext}
            disabled={!hasUploadedAnnotations}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#6841ff] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#5936db] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Step
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
