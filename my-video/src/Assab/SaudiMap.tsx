import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SAUDI_MAP } from "./saudiMap";
import { BRAND_CYAN, BRAND_DARK, BRAND_PURPLE, LAND } from "./theme";
import { LINE_DRAW, T } from "./timeline";

type Point = readonly [number, number];

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

// Scene-relative seconds for the map cues.
const local = (globalSeconds: number) => globalSeconds - T.mapStart;

// A gentle arc between two points, bowed upwards.
const arc = (from: Point, to: Point, lift: number) => {
  const c: Point = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2 - lift];
  const at = (p: number): Point => [
    (1 - p) ** 2 * from[0] + 2 * (1 - p) * p * c[0] + p ** 2 * to[0],
    (1 - p) ** 2 * from[1] + 2 * (1 - p) * p * c[1] + p ** 2 * to[1],
  ];
  return {
    d: `M ${from[0]} ${from[1]} Q ${c[0]} ${c[1]} ${to[0]} ${to[1]}`,
    at,
  };
};

const Route: React.FC<{
  readonly from: Point;
  readonly to: Point;
  readonly lift: number;
  readonly at: number;
}> = ({ from, to, lift, at }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = interpolate(frame, [at * fps, (at + LINE_DRAW) * fps], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.45, 0, 0.25, 1),
  });
  const { d, at: pointAt } = arc(from, to, lift);
  const [hx, hy] = pointAt(p);

  return (
    <g opacity={p > 0 ? 1 : 0}>
      <path
        d={d}
        fill="none"
        stroke={BRAND_PURPLE}
        strokeWidth={5}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - p}
      />
      {p < 1 ? <circle cx={hx} cy={hy} r={9} fill={BRAND_CYAN} /> : null}
    </g>
  );
};

const CityPoint: React.FC<{ readonly point: Point; readonly at: number }> = ({
  point,
  at,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = interpolate(frame, [at * fps, (at + 0.35) * fps], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.34, 1.6, 0.64, 1),
  });
  // A ring that keeps pulsing outwards once the point is on the map.
  const cycle = 1.4 * fps;
  const since = frame - at * fps;
  const ring = since > 0 ? (since % cycle) / cycle : 0;

  return (
    <g opacity={pop > 0 ? 1 : 0}>
      <circle
        cx={point[0]}
        cy={point[1]}
        r={12 + ring * 34}
        fill="none"
        stroke={BRAND_PURPLE}
        strokeWidth={3}
        opacity={(1 - ring) * 0.7}
      />
      <circle cx={point[0]} cy={point[1]} r={15 * pop} fill="#FFFFFF" />
      <circle cx={point[0]} cy={point[1]} r={9 * pop} fill={BRAND_DARK} />
    </g>
  );
};

export const SaudiMap: React.FC<{ readonly width: number }> = ({ width }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fadeIn = (at: number, dur = 0.6) =>
    interpolate(frame, [at * fps, (at + dur) * fps], [0, 1], clamp);
  const riyadh = SAUDI_MAP.riyadhCity;
  const [wx, wy] = SAUDI_MAP.westCenter;
  const later = local(T.later.sweep);
  const sweepRadius = interpolate(
    frame,
    [later * fps, (later + 2.4) * fps],
    [0, 820],
    { ...clamp, easing: Easing.bezier(0.33, 0, 0.2, 1) },
  );

  return (
    <svg
      viewBox={`0 0 ${SAUDI_MAP.width} ${SAUDI_MAP.height}`}
      width={width}
      height={width}
      style={{ overflow: "visible" }}
    >
      <defs>
        <clipPath id="ksa-clip">
          <path d={SAUDI_MAP.country} />
        </clipPath>
        <radialGradient
          id="west-glow"
          cx={wx}
          cy={wy}
          r={260}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={BRAND_PURPLE} stopOpacity={0.7} />
          <stop offset="60%" stopColor={BRAND_PURPLE} stopOpacity={0.28} />
          <stop offset="100%" stopColor={BRAND_PURPLE} stopOpacity={0} />
        </radialGradient>
        <radialGradient
          id="sweep"
          cx={riyadh[0]}
          cy={riyadh[1]}
          r={Math.max(sweepRadius, 1)}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={BRAND_PURPLE} stopOpacity={0.55} />
          <stop offset="70%" stopColor={BRAND_PURPLE} stopOpacity={0.3} />
          <stop offset="100%" stopColor={BRAND_CYAN} stopOpacity={0.4} />
        </radialGradient>
      </defs>

      <path d={SAUDI_MAP.country} fill={LAND} />
      <path
        d={SAUDI_MAP.regions}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={1.6}
      />

      {/* Riyadh region fills once its point lands */}
      <path
        d={SAUDI_MAP.riyadh}
        fill={BRAND_PURPLE}
        opacity={0.85 * fadeIn(local(T.riyadh.fill))}
      />
      {/* West: a broad glow around Jeddah, not an invented boundary */}
      <g clipPath="url(#ksa-clip)" opacity={fadeIn(local(T.next.westPoint))}>
        <circle cx={wx} cy={wy} r={260} fill="url(#west-glow)" />
      </g>
      {/* East: the Eastern Province fills when its route arrives */}
      <path
        d={SAUDI_MAP.eastern}
        fill={BRAND_PURPLE}
        opacity={0.6 * fadeIn(local(T.next.eastPoint))}
      />
      {/* Later: light spreading from Riyadh through the whole kingdom */}
      <g clipPath="url(#ksa-clip)" opacity={fadeIn(later, 0.4)}>
        <rect
          width={SAUDI_MAP.width}
          height={SAUDI_MAP.height}
          fill="url(#sweep)"
        />
      </g>

      {/* Borders and islands drawn on top so they always stay intact */}
      <path
        d={SAUDI_MAP.country}
        fill="none"
        stroke={BRAND_DARK}
        strokeWidth={2.4}
        strokeLinejoin="round"
      />

      <Route
        from={riyadh}
        to={SAUDI_MAP.jeddah}
        lift={140}
        at={local(T.next.westLine)}
      />
      <Route
        from={riyadh}
        to={SAUDI_MAP.dammam}
        lift={90}
        at={local(T.next.eastLine)}
      />
      <CityPoint point={SAUDI_MAP.jeddah} at={local(T.next.westPoint)} />
      <CityPoint point={SAUDI_MAP.dammam} at={local(T.next.eastPoint)} />
      <CityPoint point={riyadh} at={local(T.riyadh.dot)} />
    </svg>
  );
};
