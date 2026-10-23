import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AssabMark } from "../AssabMark";
import { BRAND_CYAN, BRAND_DARK, BRAND_PURPLE, DISPLAY, LAND } from "../theme";
import { WriteOn } from "../WriteOn";
import { T2 } from "./timeline";

const local = (s: number) => s - T2.deskStart;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const SKIN = "#C68F6C";
const SKIN_SHADE = "#A9765A";

// Receipt rows: an item bar on the right and a short value bar on the left.
// Bars only — no amounts, no data.
const LINES = [
  { y: 990, w: 250 },
  { y: 1050, w: 200 },
  { y: 1110, w: 280 },
  { y: 1170, w: 170 },
  { y: 1240, w: 240 },
  { y: 1310, w: 210 },
  { y: 1380, w: 270 },
  { y: 1450, w: 150 },
] as const;
const PAPER_RIGHT = 760;
const PAPER_LEFT = 330;
// Lines the hand marks for review, and when (global seconds).
const MARKS = [
  { line: 1, at: 6.2 },
  { line: 4, at: 7.6 },
  { line: 6, at: 8.9 },
] as const;

// A thermal receipt with a torn, zigzag bottom edge.
const Receipt: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
  readonly rotate: number;
}> = ({ x, y, w, h, rotate }) => {
  const teeth = Math.round(w / 24);
  const tooth = w / teeth;
  const edge = Array.from(
    { length: teeth },
    (_, i) =>
      `L${x + w - (i + 0.5) * tooth} ${y + h + 12} L${x + w - (i + 1) * tooth} ${y + h}`,
  ).join(" ");
  return (
    <g transform={`rotate(${rotate} ${x + w / 2} ${y + h / 2})`}>
      <path
        d={`M${x} ${y} H${x + w} V${y + h} ${edge} Z`}
        fill="#FFFFFF"
        filter="url(#paper-shadow)"
      />
      {rotate !== 0
        ? Array.from({ length: Math.floor((h - 120) / 60) }, (_, i) => (
            <g key={i}>
              <rect
                x={x + w - 40 - (90 + ((i * 37) % 70))}
                y={y + 90 + i * 60}
                width={90 + ((i * 37) % 70)}
                height={10}
                rx={5}
                fill="#E4DEF3"
              />
              <rect
                x={x + 40}
                y={y + 90 + i * 60}
                width={50}
                height={10}
                rx={5}
                fill="#E4DEF3"
              />
            </g>
          ))
        : null}
    </g>
  );
};

// The reviewer's hand in a white thobe sleeve with a cufflink, holding a
// pen; the pen tip sits at the group's origin.
const Hand: React.FC<{ readonly x: number; readonly y: number }> = ({
  x,
  y,
}) => (
  <g transform={`translate(${x} ${y})`}>
    <path
      d="M0 0 L172 195"
      stroke={BRAND_DARK}
      strokeWidth={14}
      strokeLinecap="round"
    />
    <path
      d="M7 8 L30 34"
      stroke={BRAND_CYAN}
      strokeWidth={10}
      strokeLinecap="round"
    />
    {/* Thumb on the near side of the pen */}
    <path
      d="M34 63 L78 132"
      stroke={SKIN_SHADE}
      strokeWidth={32}
      strokeLinecap="round"
    />
    {/* Curled middle, ring and little fingers under the pen */}
    <path
      d="M66 92 L118 138"
      stroke={SKIN_SHADE}
      strokeWidth={26}
      strokeLinecap="round"
    />
    <path
      d="M100 150 L140 186"
      stroke={SKIN_SHADE}
      strokeWidth={24}
      strokeLinecap="round"
    />
    <path
      d="M128 192 L160 218"
      stroke={SKIN_SHADE}
      strokeWidth={22}
      strokeLinecap="round"
    />
    {/* Back of the hand */}
    <path
      d="M98 66 C130 50 190 66 228 108 C258 142 252 200 218 230 C190 252 150 248 128 222 C112 204 110 160 100 130 C92 104 88 76 98 66 Z"
      fill={SKIN}
    />
    <path
      d="M136 84 C156 98 170 116 180 138"
      stroke={SKIN_SHADE}
      strokeWidth={3}
      fill="none"
      strokeLinecap="round"
      opacity={0.7}
    />
    {/* Index finger along the pen, with its nail */}
    <path
      d="M38 21 L98 81"
      stroke={SKIN}
      strokeWidth={30}
      strokeLinecap="round"
    />
    <ellipse
      cx={38}
      cy={22}
      rx={9}
      ry={6}
      transform="rotate(45 38 22)"
      fill="#E9C3A8"
    />
    {/* Thobe sleeve, cuff and cufflink */}
    <path
      d="M186 254 L262 186 L720 620 L644 700 Z"
      fill="#FFFFFF"
      stroke="#CFC6EE"
      strokeWidth={3}
    />
    <path d="M230 300 L290 246 L720 650 L690 680 Z" fill="#EEE9F8" />
    <path
      d="M186 254 L262 186 L292 214 L216 282 Z"
      fill="#E4DEF3"
      stroke="#CFC6EE"
      strokeWidth={3}
    />
    <circle cx={240} cy={236} r={7} fill={BRAND_PURPLE} />
  </g>
);

const DeskSceneInner = ({
  review,
  understand,
}: {
  readonly review: string;
  readonly understand: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const d = T2.desk;
  const f = (s: number) => local(s) * fps;
  const stop = f(d.stop);

  // The hand works down the page, then rests and slides away.
  const handKeys = [
    f(5.0),
    f(5.6),
    f(6.2),
    f(7.6),
    f(8.9),
    stop,
    stop + 0.8 * fps,
  ];
  const handY = interpolate(
    frame,
    handKeys,
    [1500, 1020, 1045, 1255, 1395, 1420, 2100],
    {
      ...clamp,
      easing: Easing.inOut(Easing.cubic),
    },
  );
  const handX = interpolate(
    frame,
    handKeys,
    [860, 700, 660, 690, 650, 670, 980],
    {
      ...clamp,
      easing: Easing.inOut(Easing.cubic),
    },
  );
  // Papers drift while the hand works, then hold still.
  const drift = interpolate(frame, [0, stop], [0, 1], clamp);
  const widen = interpolate(frame, [stop, stop + 1.6 * fps], [1.22, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const swap = interpolate(frame, [stop, stop + 0.35 * fps], [1, 0], clamp);

  return (
    <>
      <svg
        viewBox="0 0 1080 1920"
        width={1080}
        height={1920}
        style={{
          position: "absolute",
          inset: 0,
          scale: widen,
          transformOrigin: "55% 62%",
        }}
      >
        <defs>
          <radialGradient id="desk-light" cx="60%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.7} />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
          </radialGradient>
          <filter
            id="paper-shadow"
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
          >
            <feDropShadow
              dx={0}
              dy={14}
              stdDeviation={18}
              floodColor={BRAND_DARK}
              floodOpacity={0.22}
            />
          </filter>
        </defs>
        <rect width={1080} height={1920} fill={LAND} />
        <rect width={1080} height={1920} fill="url(#desk-light)" />
        {/* Saudi coffee cup and two receipts already reviewed */}
        <g transform="translate(190 1660)">
          <circle r={70} fill="#FFFFFF" filter="url(#paper-shadow)" />
          <circle r={42} fill="#F4F2FA" />
          <circle r={32} fill="#E3C27D" />
        </g>
        <Receipt x={110} y={760} w={330} h={720} rotate={-11 + drift} />
        <Receipt x={690} y={720} w={320} h={640} rotate={10 - drift} />
        {/* The receipt under review */}
        <g transform={`rotate(${2 - drift * 1.2} 545 1270)`}>
          <Receipt x={300} y={820} w={500} h={900} rotate={0} />
          <circle cx={545} cy={878} r={18} fill="#CFC6EE" />
          <rect x={455} y={910} width={180} height={12} rx={6} fill="#CFC6EE" />
          <path
            d="M340 950 H750"
            stroke="#CFC6EE"
            strokeWidth={3}
            strokeDasharray="10 8"
          />
          <path
            d="M340 1500 H750"
            stroke="#CFC6EE"
            strokeWidth={3}
            strokeDasharray="10 8"
          />
          <rect
            x={PAPER_RIGHT - 160}
            y={1540}
            width={160}
            height={18}
            rx={9}
            fill="#BDB2EA"
          />
          <rect
            x={PAPER_LEFT}
            y={1540}
            width={110}
            height={18}
            rx={9}
            fill="#BDB2EA"
          />
          {LINES.map((l, i) => {
            const mark = MARKS.find((m) => m.line === i);
            const on = mark
              ? interpolate(
                  frame,
                  [f(mark.at), f(mark.at) + 0.35 * fps],
                  [0, 1],
                  clamp,
                )
              : 0;
            const span = PAPER_RIGHT - PAPER_LEFT + 20;
            return (
              <g key={i}>
                <rect
                  x={PAPER_LEFT - 10 + span * (1 - on)}
                  y={l.y - 12}
                  width={span * on}
                  height={36}
                  rx={8}
                  fill={BRAND_CYAN}
                  opacity={0.4}
                />
                <rect
                  x={PAPER_RIGHT - l.w}
                  y={l.y}
                  width={l.w}
                  height={12}
                  rx={6}
                  fill="#DCD6EF"
                />
                <rect
                  x={PAPER_LEFT}
                  y={l.y}
                  width={70}
                  height={12}
                  rx={6}
                  fill="#DCD6EF"
                />
                {mark ? (
                  <circle
                    cx={PAPER_RIGHT + 24}
                    cy={l.y + 6}
                    r={10 * on}
                    fill={BRAND_PURPLE}
                  />
                ) : null}
              </g>
            );
          })}
        </g>
        <Hand x={handX} y={handY} />
      </svg>

      <div style={{ position: "absolute", top: 110, left: 80 }}>
        <AssabMark height={60} variant="color" />
      </div>
      <div
        dir="rtl"
        lang="ar"
        style={{
          position: "absolute",
          top: 260,
          left: 80,
          right: 80,
          textAlign: "right",
          fontFamily: DISPLAY,
          fontWeight: 700,
          fontSize: 120,
          lineHeight: 1.25,
          color: BRAND_DARK,
        }}
      >
        <Interactive.Div name="Review" style={{ opacity: swap }}>
          <WriteOn text={review} at={local(d.review[0])} dur={d.review[1]} />
        </Interactive.Div>
        <Interactive.Div
          name="Understand"
          style={{ position: "absolute", top: 0, right: 0 }}
        >
          <WriteOn
            text={understand}
            at={local(d.understand[0])}
            dur={d.understand[1]}
            style={{ color: BRAND_PURPLE }}
          />
        </Interactive.Div>
      </div>
    </>
  );
};

export const DeskScene = Interactive.create({
  Component: DeskSceneInner,
  layout: "absolute-fill",
  schema: {
    review: {
      type: "string",
      default: "بنـــود للمراجعـــة",
      description: "Review phrase",
    },
    understand: {
      type: "string",
      default: "افهـــم يومـــك",
      description: "Focus phrase",
    },
  },
});
