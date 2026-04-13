import Image from "next/image";

type SteppedImageCollageProps = {
  leftSrc: string; // back/left image
  rightSrc: string; // front/right image
  leftAlt?: string;
  rightAlt?: string;
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
  // Base height stays the same
  const H = 460;

  const OUT = 18; // outline inset
  const PAD = 12; // spacing between image and outline
  const R = 34; // radius

  // ✅ Your updated image boxes
  const LEFT = { x: 30, y: 25, w: 280, h: 300 };
  const RIGHT = { x: 270, y: 170, w: 300, h: 260 };

  // --- Build anchors from geometry ---
  const xL = LEFT.x + LEFT.w + PAD;
  const yStep = RIGHT.y - PAD;
  const xR = RIGHT.x + RIGHT.w + PAD;
  const xInner = RIGHT.x - PAD;
  const yInner = LEFT.y + LEFT.h + PAD;

  // ✅ Auto-fit canvas width so nothing gets clipped.
  // Ensure rightmost outline fits: needs xR + OUT
  const W = Math.max(560, Math.ceil(xR + OUT));

  const yB = H - OUT;

  const PATH =
    `M${OUT} ${OUT} ` +
    `H${xL - R} ` +
    `A${R} ${R} 0 0 1 ${xL} ${OUT + R} ` +
    `V${yStep} ` +
    `H${xR} ` +
    `V${yB - R} ` +
    `A${R} ${R} 0 0 1 ${xR - R} ${yB} ` +
    `H${xInner} ` +
    `V${yInner} ` +
    `H${OUT + R} ` +
    `A${R} ${R} 0 0 1 ${OUT} ${yInner - R} ` +
    `V${OUT} Z`;

  const pctX = (px: number) => `${(px / W) * 100}%`;
  const pctY = (px: number) => `${(px / H) * 100}%`;

  return (
    <div
      className={["relative w-full max-w-[560px]", className]
        .filter(Boolean)
        .join(" ")}
      // ✅ Keep it responsive + correct aspect even if W changes (e.g. becomes 600)
      style={{ aspectRatio: `${W} / ${H}` }}
    >
      {/* Double outline */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
        aria-hidden
      >
        <path
          d={PATH}
          stroke="rgba(91,47,232,0.25)"
          strokeWidth="6"
          strokeLinejoin="miter"
          strokeLinecap="square"
        />
        <path
          d={PATH}
          stroke="rgba(91,47,232,0.85)"
          strokeWidth="2"
          strokeLinejoin="miter"
          strokeLinecap="square"
        />
      </svg>

      {/* Back image */}
      <div
        className="absolute z-10 overflow-hidden rounded-[34px]"
        style={{
          left: pctX(LEFT.x),
          top: pctY(LEFT.y),
          width: pctX(LEFT.w),
          height: pctY(LEFT.h),
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

      {/* Front image */}
      <div
        className="absolute z-20 overflow-hidden rounded-[34px]"
        style={{
          left: pctX(RIGHT.x),
          top: pctY(RIGHT.y),
          width: pctX(RIGHT.w),
          height: pctY(RIGHT.h),
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
