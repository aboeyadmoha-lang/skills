import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SAUDI_MAP } from "./saudiMap";
import { BRAND_CYAN, BRAND_DARK, BRAND_PURPLE, LAND } from "./theme";

// Phase boundaries in seconds, relative to the map scene.
export const MAP_PHASES = {
  riyadh: 5.2,
  next: 8.2,
  later: 15.2,
  end: 22.6,
};

const fade = (
  frame: number,
  fps: number,
  from: number,
  to: number,
  fadeIn = 0.6,
  fadeOut = 0.6,
) =>
  interpolate(
    frame,
    [from * fps, (from + fadeIn) * fps, (to - fadeOut) * fps, to * fps],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

export const SaudiMap: React.FC<{ readonly width: number }> = ({ width }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { riyadh, next, later, end } = MAP_PHASES;
  const [rx, ry] = SAUDI_MAP.riyadhCentroid;
  const [wx, wy] = SAUDI_MAP.westCenter;

  // Riyadh is fully lit at the start, then stays softly marked as the origin.
  const riyadhOpacity = interpolate(
    frame,
    [
      riyadh * fps,
      (riyadh + 0.6) * fps,
      next * fps,
      (next + 0.6) * fps,
      later * fps,
      (later + 0.8) * fps,
    ],
    [0, 1, 1, 0.18, 0.18, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const nextOpacity = fade(frame, fps, next + 0.3, later + 0.4);
  const sweepRadius = interpolate(
    frame,
    [later * fps, (later + 4) * fps],
    [0, 820],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <svg
      viewBox={`0 0 ${SAUDI_MAP.width} ${SAUDI_MAP.height}`}
      width={width}
      height={width}
      style={{
        overflow: "visible",
        transformOrigin: `${(rx / SAUDI_MAP.width) * 100}% ${(ry / SAUDI_MAP.height) * 100}%`,
        scale: interpolate(
          frame,
          [
            0,
            riyadh * fps,
            (riyadh + 1.5) * fps,
            next * fps,
            (next + 1) * fps,
            later * fps,
            end * fps,
          ],
          [1, 1.03, 1.07, 1.07, 1, 1, 1.03],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        ),
      }}
    >
      <defs>
        <clipPath id="ksa-clip">
          <path d={SAUDI_MAP.country} />
        </clipPath>
        <radialGradient
          id="west-glow"
          cx={wx}
          cy={wy}
          r={300}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={BRAND_PURPLE} stopOpacity={0.75} />
          <stop offset="60%" stopColor={BRAND_PURPLE} stopOpacity={0.3} />
          <stop offset="100%" stopColor={BRAND_PURPLE} stopOpacity={0} />
        </radialGradient>
        <radialGradient
          id="sweep"
          cx={rx}
          cy={ry}
          r={Math.max(sweepRadius, 1)}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={BRAND_PURPLE} stopOpacity={0.7} />
          <stop offset="65%" stopColor={BRAND_PURPLE} stopOpacity={0.35} />
          <stop offset="100%" stopColor={BRAND_CYAN} stopOpacity={0.35} />
        </radialGradient>
        <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>

      {/* Land and internal region lines */}
      <path d={SAUDI_MAP.country} fill={LAND} />
      <path
        d={SAUDI_MAP.regions}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={1.6}
      />

      {/* Next step: a broad western glow and the Eastern Province, each standing alone */}
      <g clipPath="url(#ksa-clip)" opacity={nextOpacity}>
        <circle cx={wx} cy={wy} r={300} fill="url(#west-glow)" />
        <path d={SAUDI_MAP.eastern} fill={BRAND_PURPLE} fillOpacity={0.55} />
      </g>

      {/* Starting point: Riyadh region */}
      <g opacity={riyadhOpacity}>
        <path
          d={SAUDI_MAP.riyadh}
          fill={BRAND_PURPLE}
          filter="url(#soft-glow)"
          opacity={0.6}
        />
        <path d={SAUDI_MAP.riyadh} fill={BRAND_PURPLE} />
      </g>

      {/* Later: graduated light spreading through the whole kingdom */}
      <g
        clipPath="url(#ksa-clip)"
        opacity={fade(frame, fps, later, end + 1, 0.4, 0.4)}
      >
        <rect
          width={SAUDI_MAP.width}
          height={SAUDI_MAP.height}
          fill="url(#sweep)"
        />
      </g>

      {/* Borders and islands drawn last so they always stay intact */}
      <path
        d={SAUDI_MAP.country}
        fill="none"
        stroke={BRAND_DARK}
        strokeWidth={2.4}
        strokeLinejoin="round"
      />
    </svg>
  );
};
