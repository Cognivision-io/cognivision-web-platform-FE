import Image from "next/image";

type SteppedImageCollageProps = {
  /** Left/top image (e.g. "/Hero2.svg") */
  leftSrc: string;
  /** Right/bottom image (e.g. "/Hero3.svg") */
  rightSrc: string;

  leftAlt?: string;
  rightAlt?: string;

  /** Optional wrapper classes (e.g. "max-w-[600px]") */
  className?: string;
  priorityLeft?: boolean;
  priorityRight?: boolean;
};

export function SteppedImageCollage({
  leftSrc,
  rightSrc,
  leftAlt = "Left image",
  rightAlt = "Right image",
  className,
  priorityLeft = false,
  priorityRight = false,
}: SteppedImageCollageProps) {
  // Built for viewBox 560x460, scales responsively.
  // Top-left is sharp (no rounding).
  const PATH =
    "M18 18 " + // ✅ sharp top-left
    "H308 " +
    "A34 34 0 0 1 342 52 " + // rounded top-right of left block
    "V118 " +
    "H542 " +
    "V408 " +
    "A34 34 0 0 1 508 442 " + // rounded bottom-right
    "H158 " +
    "V342 " +
    "H52 " +
    "A34 34 0 0 1 18 308 " + // rounded bottom-left (keep like reference)
    "V18 Z";

  return (
    <div
      className={["relative w-full max-w-[560px] aspect-[560/460]", className]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Double outline */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 560 460"
        fill="none"
        aria-hidden
      >
        {/* soft outer line */}
        <path
          d={PATH}
          stroke="rgba(91,47,232,0.25)"
          strokeWidth="6"
          strokeLinejoin="miter"
          strokeLinecap="square"
        />
        {/* main inner line */}
        <path
          d={PATH}
          stroke="rgba(91,47,232,0.85)"
          strokeWidth="2"
          strokeLinejoin="miter"
          strokeLinecap="square"
        />
      </svg>

      {/* Left image (inset) */}
      <div
        className="absolute z-10 overflow-hidden rounded-[34px]"
        style={{
          left: "5.36%", // 30 / 560
          top: "6.52%", // 30 / 460
          width: "53.57%", // 300 / 560
          height: "65.22%", // 300 / 460
        }}
      >
        <Image
          src={leftSrc}
          alt={leftAlt}
          fill
          priority={priorityLeft}
          draggable={false}
          className="select-none object-cover"
          sizes="(max-width: 1024px) 90vw, 560px"
        />
      </div>

      {/* Right image (on top) */}
      <div
        className="absolute z-20 overflow-hidden rounded-[34px]"
        style={{
          left: "30.36%", // 170 / 560
          top: "28.26%", // 130 / 460
          width: "64.29%", // 360 / 560
          height: "65.22%", // 300 / 460
        }}
      >
        <Image
          src={rightSrc}
          alt={rightAlt}
          fill
          priority={priorityRight}
          draggable={false}
          className="select-none object-cover"
          sizes="(max-width: 1024px) 90vw, 560px"
        />
      </div>
    </div>
  );
}
