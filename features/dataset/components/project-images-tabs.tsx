"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import {
  useAnnotatedImagesQuery,
  useUnannotatedImagesQuery,
} from "@/features/dataset/queries/image.query";
import type { Image } from "@/types/image.interface";

const ROBOFLOW_SOURCE_BASE = "https://source.roboflow.com";
const GRID_GAP_PX = 16; // gap-4

const buildImageUrl = (owner: string, id: string, suffix: string) =>
  `${ROBOFLOW_SOURCE_BASE}/${owner}/${id}/${suffix}`;

const getColumnsForViewport = (viewportWidth: number) => {
  if (viewportWidth >= 1280) return 5; // xl:grid-cols-5
  if (viewportWidth >= 1024) return 4; // lg:grid-cols-4
  if (viewportWidth >= 640) return 3; // sm:grid-cols-3
  return 2; // grid-cols-2
};

const useThreeRowScrollMaxHeight = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const recompute = () => {
      const containerWidth = el.clientWidth;
      if (!containerWidth) return;

      const cols = getColumnsForViewport(window.innerWidth);
      const itemSize = (containerWidth - GRID_GAP_PX * (cols - 1)) / cols;
      const totalHeight = itemSize * 3 + GRID_GAP_PX * 2;

      setMaxHeight(Math.max(0, Math.round(totalHeight)));
    };

    const resizeObserver = new ResizeObserver(recompute);
    resizeObserver.observe(el);
    window.addEventListener("resize", recompute);
    recompute();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", recompute);
    };
  }, []);

  return { ref, maxHeight };
};

const ImagesGrid = ({
  items,
  renderItem,
  isLoading,
  emptyText,
}: {
  items: Image[];
  renderItem: (image: Image) => ReactNode;
  isLoading: boolean;
  emptyText: string;
}) => {
  const { ref, maxHeight } = useThreeRowScrollMaxHeight();

  if (isLoading) {
    return <div className="text-sm text-slate-500">Loading images...</div>;
  }

  if (items.length === 0) {
    return <div className="text-sm text-slate-500">{emptyText}</div>;
  }

  return (
    <div
      ref={ref}
      className="overflow-y-auto pr-1"
      style={maxHeight ? { maxHeight } : undefined}
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((image) => (
          <div
            key={image.id}
            className="group relative aspect-square overflow-hidden rounded-lg border border-[#e3e5f1] bg-[#f8f9fc]"
          >
            {renderItem(image)}
          </div>
        ))}
      </div>
    </div>
  );
};

export const ProjectImagesTabs = ({ projectId }: { projectId: number }) => {
  const router = useRouter();
  const { data: unannotatedData, isLoading: isLoadingUnannotated } =
    useUnannotatedImagesQuery(projectId, 0, 50);
  const { data: annotatedData, isLoading: isLoadingAnnotated } =
    useAnnotatedImagesQuery(projectId, 0, 50);

  const unannotatedImages = unannotatedData?.results ?? [];
  const annotatedImages = annotatedData?.results ?? [];

  const unannotatedById = useMemo(
    () => new Map(unannotatedImages.map((image) => [image.id, image])),
    [unannotatedImages],
  );

  const navigateToAnnotate = (imageId: string) => {
    const nextParams = new URLSearchParams();
    nextParams.set("step", "annotate");
    nextParams.set("focusImageId", imageId);

    router.push(
      `/dashboard/dataset/${projectId}/upload-dataset?${nextParams.toString()}`
    );
  };

  return (
    <Tabs defaultValue="unannotated" className="w-full">
      <TabsList className="mb-4 bg-[#eef1fb] text-slate-600">
        <TabsTrigger value="unannotated" className="rounded-md">
          Unannotated{unannotatedData?.total ? ` (${unannotatedData.total})` : ""}
        </TabsTrigger>
        <TabsTrigger value="annotated" className="rounded-md">
          Annotated{annotatedData?.total ? ` (${annotatedData.total})` : ""}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="unannotated">
        <ImagesGrid
          items={unannotatedImages}
          renderItem={(image) => {
            const imageUrl =
              image.url ||
              (image.owner
                ? buildImageUrl(image.owner, image.id, "thumb.jpg")
                : "");

            return (
              <button
                type="button"
                onClick={() => navigateToAnnotate(image.id)}
                className="relative h-full w-full text-left"
                aria-label={"Annotate " + (image.name || image.id)}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={image.name || "Unannotated " + image.id}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                    Image unavailable
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0 opacity-0 transition group-hover:opacity-100" />
                <div className="pointer-events-none absolute bottom-2 left-2 rounded-md bg-white/90 px-2 py-1 text-xs font-medium text-slate-900 opacity-0 transition group-hover:opacity-100">
                  Annotate
                </div>
              </button>
            );
          }}
          isLoading={isLoadingUnannotated}
          emptyText="No unannotated images found."
        />
      </TabsContent>

      <TabsContent value="annotated">
        <ImagesGrid
          items={annotatedImages}
          renderItem={(image) => {
            const fallbackImage = unannotatedById.get(image.id);
            const owner = image.owner || fallbackImage?.owner;
            const baseUrl =
              fallbackImage?.url ||
              image.url ||
              (owner ? buildImageUrl(owner, image.id, "thumb.jpg") : "");
            const overlayUrl =
              image.urls?.annotation ||
              (owner
                ? buildImageUrl(owner, image.id, "annotation-PASC.png")
                : "");

            if (!baseUrl) {
              return (
                <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                  Image unavailable
                </div>
              );
            }

            return (
              <>
                <img
                  src={baseUrl}
                  alt={image.name || "Annotated " + image.id}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                {overlayUrl ? (
                  <img
                    src={overlayUrl}
                    alt=""
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : null}
              </>
            );
          }}
          isLoading={isLoadingAnnotated || isLoadingUnannotated}
          emptyText="No annotated images found."
        />
      </TabsContent>
    </Tabs>
  );
};
