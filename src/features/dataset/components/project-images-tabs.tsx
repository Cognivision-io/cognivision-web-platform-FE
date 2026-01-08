"use client";

import { useMemo, type ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useAnnotatedImagesQuery,
  useUnannotatedImagesQuery,
} from "@/features/dataset/queries/image.query";
import type { Image } from "@/interfaces/image.interface";

const ROBOFLOW_SOURCE_BASE = "https://source.roboflow.com";

const buildImageUrl = (owner: string, id: string, suffix: string) =>
  `${ROBOFLOW_SOURCE_BASE}/${owner}/${id}/${suffix}`;

const renderGrid = (
  items: Image[],
  renderItem: (image: Image) => ReactNode,
  isLoading: boolean,
  emptyText: string
) => {
  if (isLoading) {
    return <div className="text-sm text-slate-500">Loading images...</div>;
  }

  if (items.length === 0) {
    return <div className="text-sm text-slate-500">{emptyText}</div>;
  }

  return (
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
  );
};

export const ProjectImagesTabs = ({ projectId }: { projectId: number }) => {
  const { data: unannotatedData, isLoading: isLoadingUnannotated } =
    useUnannotatedImagesQuery(projectId, 0, 50);
  const { data: annotatedData, isLoading: isLoadingAnnotated } =
    useAnnotatedImagesQuery(projectId, 0, 50);

  const unannotatedImages = unannotatedData?.results ?? [];
  const annotatedImages = annotatedData?.results ?? [];

  const unannotatedById = useMemo(
    () => new Map(unannotatedImages.map((image) => [image.id, image])),
    [unannotatedImages]
  );

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
        {renderGrid(
          unannotatedImages,
          (image) => {
            const imageUrl =
              image.url ||
              (image.owner
                ? buildImageUrl(image.owner, image.id, "thumb.jpg")
                : "");

            return imageUrl ? (
              <img
                src={imageUrl}
                alt={image.name || `Unannotated ${image.id}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                Image unavailable
              </div>
            );
          },
          isLoadingUnannotated,
          "No unannotated images found."
        )}
      </TabsContent>

      <TabsContent value="annotated">
        {renderGrid(
          annotatedImages,
          (image) => {
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
                  alt={image.name || `Annotated ${image.id}`}
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
          },
          isLoadingAnnotated || isLoadingUnannotated,
          "No annotated images found."
        )}
      </TabsContent>
    </Tabs>
  );
};
