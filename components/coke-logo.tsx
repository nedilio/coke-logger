import { useId } from "react";
import { cn } from "@/lib/utils";

interface CokeLogoProps {
  className?: string;
  /** "tile" draws the red rounded square (like the iOS app icon); "mark" draws only the glass. */
  variant?: "tile" | "mark";
}

const INNER_BUBBLES: ReadonlyArray<readonly [number, number, number]> = [
  [383, 413, 14], [391, 408, 10], [406, 482, 16], [379, 503, 15],
  [438, 555, 13], [401, 604, 10], [499, 458, 13], [536, 438, 16],
  [606, 419, 10], [637, 420, 8], [631, 436, 13], [628, 463, 8],
  [654, 504, 7], [470, 682, 12], [531, 682, 15], [577, 685, 7],
];

const OUTER_BUBBLES: ReadonlyArray<readonly [number, number, number]> = [
  [250, 140, 14], [300, 210, 24], [760, 170, 20], [820, 260, 10],
];

/** Coca-Cola glass logo, shared with the iOS app (CokeTracker AppIcon). */
export function CokeLogo({ className, variant = "tile" }: CokeLogoProps): React.ReactElement {
  const gradientId = useId();

  return (
    <svg
      viewBox="0 0 1024 1024"
      className={cn("size-10", className)}
      role="img"
      aria-label="Coke Logger"
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === "tile" && (
        <>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E8232E" />
              <stop offset="100%" stopColor="#C00C14" />
            </linearGradient>
          </defs>
          <rect width="1024" height="1024" rx="228" fill={`url(#${gradientId})`} />
        </>
      )}

      {/* Straw */}
      <line x1="572" y1="240" x2="662" y2="80" stroke="#fff" strokeWidth="34" />

      {/* Glass */}
      <path d="M278 250 H748 L693 800 H332 Z" fill="#FBEDEE" />
      <rect x="314" y="284" width="396" height="80" fill="#fff" />
      <path d="M322 360 H703 L663 767 H362 Z" fill="#4A0B10" />

      {/* Bubbles */}
      <g fill="none" stroke="#fff" strokeWidth="6" opacity="0.9">
        {OUTER_BUBBLES.map(([cx, cy, r]) => (
          <circle key={`o-${cx}-${cy}`} cx={cx} cy={cy} r={r} />
        ))}
      </g>
      <g fill="none" stroke="#E5D5D6" strokeWidth="5">
        {INNER_BUBBLES.map(([cx, cy, r]) => (
          <circle key={`i-${cx}-${cy}`} cx={cx} cy={cy} r={r} />
        ))}
      </g>
    </svg>
  );
}
