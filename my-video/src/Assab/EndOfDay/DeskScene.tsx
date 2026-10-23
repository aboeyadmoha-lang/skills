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
const SKIN = "#C08A68";

// Neutral paper lines: no amounts, no data, just the shape of a day's notes.
const LINES = [
  { y: 960, w: 520 },
  { y: 1030, w: 430 },
  { y: 1100, w: 560 },
  { y: 1170, w: 380 },
  { y: 1240, w: 500 },
  { y: 1310, w: 450 },
  { y: 1380, w: 540 },
  { y: 1450, w: 300 },
] as const;
const PAPER_RIGHT = 860;
// Lines the hand marks for review, and when (global seconds).
const MARKS = [
  { line: 1, at: 6.2 },
  { line: 4, at: 7.6 },
  { line: 6, at: 8.9 },
] as const;

// A hand holding a pen, reaching in from the lower right; the pen tip sits
// at the group's origin.
const Hand: React.FC<{ readonly x: number; readonly y: number }> = ({
  x,
  y,
}) => (
  <g transform={`translate(${x} ${y})`}>
    {/* Sleeve and cuff */}
    <path d="M190 200 L250 140 L760 650 L700 710 Z" fill={BRAND_DARK} />
    <path d="M178 212 L262 128 L282 148 L198 232 Z" fill="#F4F2FA" />
    {/* Pen */}
    <path
      d="M0 0 L150 178"
      stroke={BRAND_DARK}
      strokeWidth={15}
      strokeLinecap="round"
    />
    <path
      d="M0 0 L22 26"
      stroke={BRAND_CYAN}
      strokeWidth={9}
      strokeLinecap="round"
    />
    {/* Hand: back of the hand, folded fingers, index finger along the pen */}
    <path
      d="M92 112 C118 84 176 92 214 128 C248 160 240 206 204 224 C168 242 124 226 102 196 C84 172 80 130 92 112 Z"
      fill={SKIN}
    />
    <path
      d="M48 62 C58 50 86 64 118 96 L104 116 C80 100 56 84 48 62 Z"
      fill={SKIN}
    />
    <path
      d="M96 160 C76 160 64 144 72 132 C92 130 116 142 122 160 Z"
      fill="#A9765A"
    />
    <path
      d="M150 120 C160 150 168 170 190 190"
      stroke="#A9765A"
      strokeWidth={4}
      fill="none"
      strokeLinecap="round"
    />
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
        {/* Paper underneath */}
        <rect
          x={150}
          y={820}
          width={700}
          height={880}
          rx={10}
          fill="#FBFAFE"
          filter="url(#paper-shadow)"
          transform={`rotate(${-7 + drift * 1.5} 500 1260)`}
        />
        {/* Working sheet */}
        <g
          transform={`rotate(${3 - drift * 1.5} 540 1250) translate(${drift * -10} 0)`}
        >
          <rect
            x={200}
            y={860}
            width={700}
            height={760}
            rx={10}
            fill="#FFFFFF"
            filter="url(#paper-shadow)"
          />
          <rect
            x={PAPER_RIGHT - 320}
            y={900}
            width={320}
            height={22}
            rx={11}
            fill="#CFC6EE"
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
            return (
              <g key={i}>
                <rect
                  x={PAPER_RIGHT - l.w - 8}
                  y={l.y - 14}
                  width={(l.w + 16) * on}
                  height={40}
                  rx={8}
                  fill={BRAND_CYAN}
                  opacity={0.35}
                  transform={`translate(${(l.w + 16) * (1 - on)} 0)`}
                />
                <rect
                  x={PAPER_RIGHT - l.w}
                  y={l.y}
                  width={l.w}
                  height={12}
                  rx={6}
                  fill="#DCD6EF"
                />
                {mark ? (
                  <circle
                    cx={PAPER_RIGHT + 30}
                    cy={l.y + 6}
                    r={11 * on}
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
