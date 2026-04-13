import type { Polygon, Point, AnnotationClass, ImageItem } from '@/types/annotation';
import type { AnnotationItem } from '@/types/project.interface';
import type { Image } from '@/types/image.interface';

/**
 * Convert editor's Polygon format to AnnotationItem format
 * Transforms Point[] objects to [number, number][] tuples
 */
export function polygonToAnnotationItem(
  polygon: Polygon,
  imageWidth: number,
  imageHeight: number
): AnnotationItem {
  const tuplePolygon: [number, number][] = polygon.points.map(
    (p: Point) => [p.x, p.y] as [number, number]
  );

  return {
    class: polygon.className,
    polygon: tuplePolygon,
    imageWidth,
    imageHeight,
    confidence: polygon.confidence,
  };
}

/**
 * Convert AnnotationItems to YOLO format
 * Normalizes coordinates to 0-1 range and builds class list
 */
export function annotationsToYOLO(annotations: AnnotationItem[]): {
  yoloContent: string;
  classList: string[];
} {
  // Extract all classes from annotations
  const allClasses = annotations.map((ann) => ann.class || "unlabeled");
  const userLabels = allClasses.filter((cls) => !cls.startsWith("Object_"));
  const hasUnlabeled = allClasses.some((cls) => cls.startsWith("Object_"));

  // Build class list: user labels first (sorted), then 'unlabeled' if any exist
  const uniqueUserLabels = Array.from(new Set(userLabels)).sort();
  const classList = hasUnlabeled
    ? [...uniqueUserLabels, "unlabeled"]
    : uniqueUserLabels;

  const yoloLines = annotations
    .map((ann) => {
      // Map annotation class to class ID
      let className = ann.class || "unlabeled";
      // Convert auto-generated labels to 'unlabeled'
      if (className.startsWith("Object_")) {
        className = "unlabeled";
      }
      const classId = classList.indexOf(className);

      if (ann.polygon && ann.imageWidth && ann.imageHeight) {
        // Normalize polygon coordinates to 0-1 range
        const normalizedCoords = ann.polygon
          .map(([x, y]) => {
            return `${(x / ann.imageWidth!).toFixed(6)} ${(
              y / ann.imageHeight!
            ).toFixed(6)}`;
          })
          .join(" ");

        return `${classId} ${normalizedCoords}`;
      }
      return "";
    })
    .filter((line) => line);

  const finalYoloFormat = yoloLines.join("\n");

  return {
    yoloContent: finalYoloFormat,
    classList: classList,
  };
}

/**
 * Transform Roboflow Image to editor ImageItem format
 */
export function imageToImageItem(image: Image): ImageItem {
  return {
    id: image.id,
    url: image.urls?.original || image.url || "",
    name: image.name || `Image ${image.id}`,
    width: undefined, // Will be loaded dynamically
    height: undefined,
  };
}

/**
 * Default color palette for annotation classes
 */
const DEFAULT_COLORS = [
  '#ef4444', '#f97316', '#eab308', '#22c55e',
  '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'
];

/**
 * Convert project class metadata to editor AnnotationClass format
 */
export function projectClassesToAnnotationClasses(
  classes: Record<string, number>,
  colors?: Record<string, string>
): AnnotationClass[] {
  return Object.keys(classes).map((className, index) => ({
    id: `class-${index}`,
    name: className,
    color: colors?.[className] || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
    prompt: className,
  }));
}
