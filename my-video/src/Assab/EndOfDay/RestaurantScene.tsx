import {
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AssabMark } from "../AssabMark";
import {
  BRAND_CYAN,
  BRAND_DARK,
  BRAND_PURPLE,
  DISPLAY,
  LAVENDER,
} from "../theme";
import { WriteOn } from "../WriteOn";
import { T2 } from "./timeline";

const local = (s: number) => s - T2.restaurantStart;
const SHADOW = "#120B33";
const WALL = "#22185A";

// Chairs turned upside down on the table: the restaurant after closing.
const Table: React.FC<{ readonly x: number }> = ({ x }) => (
  <g transform={`translate(${x} 1470)`}>
    {/* Chairs, seats on the table, legs up */}
    {[-90, 90].map((dx) => (
      <g key={dx} transform={`translate(${dx} 0)`}>
        <rect
          x={-55}
          y={-26}
          width={110}
          height={16}
          rx={4}
          fill={BRAND_DARK}
        />
        <rect x={-50} y={-120} width={9} height={96} rx={3} fill={BRAND_DARK} />
        <rect x={41} y={-120} width={9} height={96} rx={3} fill={BRAND_DARK} />
        <rect x={-50} y={-10} width={100} height={10} rx={3} fill="#4A3C96" />
      </g>
    ))}
    <rect x={-170} y={0} width={340} height={22} rx={6} fill="#4A3C96" />
    <rect x={-150} y={22} width={14} height={200} fill={BRAND_DARK} />
    <rect x={136} y={22} width={14} height={200} fill={BRAND_DARK} />
  </g>
);

const Lamp: React.FC<{ readonly x: number; readonly phase: number }> = ({
  x,
  phase,
}) => {
  const frame = useCurrentFrame();
  const glow = 0.85 + 0.15 * Math.sin(frame / 22 + phase);
  return (
    <g>
      <line x1={x} y1={0} x2={x} y2={600} stroke="#4A3C96" strokeWidth={3} />
      <circle cx={x} cy={690} r={300} fill="url(#lamp-glow)" opacity={glow} />
      <path
        d={`M${x - 70} 680 L${x - 34} 600 H${x + 34} L${x + 70} 680 Z`}
        fill={BRAND_DARK}
      />
      <ellipse cx={x} cy={682} rx={60} ry={10} fill="#F4F2FA" opacity={0.9} />
    </g>
  );
};

const RestaurantSceneInner = ({
  title,
  income,
  spend,
}: {
  readonly title: string;
  readonly income: string;
  readonly spend: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = T2.restaurant;
  const phraseIn = (at: number) =>
    interpolate(frame, [local(at) * fps, (local(at) + 0.3) * fps], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  return (
    <>
      {/* After-hours interior, slow push in */}
      <svg
        viewBox="0 0 1080 1920"
        width={1080}
        height={1920}
        style={{
          position: "absolute",
          inset: 0,
          scale: interpolate(frame, [0, local(r.end) * fps], [1, 1.06]),
          transformOrigin: "50% 60%",
        }}
      >
        <defs>
          <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1A1146" />
            <stop offset="100%" stopColor={WALL} />
          </linearGradient>
          <linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={BRAND_DARK} />
            <stop offset="60%" stopColor={BRAND_PURPLE} />
            <stop offset="100%" stopColor={BRAND_CYAN} />
          </linearGradient>
          <radialGradient id="lamp-glow">
            <stop offset="0%" stopColor={LAVENDER} stopOpacity={0.45} />
            <stop offset="100%" stopColor={LAVENDER} stopOpacity={0} />
          </radialGradient>
        </defs>
        <rect width={1080} height={1920} fill="url(#wall)" />
        {/* Window onto the evening city */}
        <rect
          x={120}
          y={800}
          width={840}
          height={480}
          rx={20}
          fill="url(#dusk)"
        />
        <path
          d="M120 1280 V1180 H200 V1120 H260 V1160 H330 V1080 H380 V1150 H470 V1110 H520 V1040 H560 V1110 H650 V1150 H720 V1090 H790 V1160 H860 V1130 H960 V1280 Z"
          fill={SHADOW}
          opacity={0.85}
        />
        <rect
          x={120}
          y={800}
          width={840}
          height={480}
          rx={20}
          fill="none"
          stroke={SHADOW}
          strokeWidth={14}
        />
        <line
          x1={540}
          y1={800}
          x2={540}
          y2={1280}
          stroke={SHADOW}
          strokeWidth={10}
        />
        <Lamp x={270} phase={0} />
        <Lamp x={540} phase={2} />
        <Lamp x={810} phase={4} />
        {/* Floor and tables */}
        <rect y={1690} width={1080} height={230} fill={SHADOW} />
        <Table x={300} />
        <Table x={780} />
      </svg>

      <div style={{ position: "absolute", top: 110, left: 80 }}>
        <AssabMark height={60} variant="white" revealAt={local(r.mark)} />
      </div>
      <div
        dir="rtl"
        lang="ar"
        style={{
          position: "absolute",
          top: 110,
          right: 80,
          fontFamily: DISPLAY,
          fontWeight: 700,
          fontSize: 44,
          color: LAVENDER,
          opacity: phraseIn(r.mark),
        }}
      >
        عصـــب
      </div>

      <div
        dir="rtl"
        lang="ar"
        style={{
          position: "absolute",
          top: 270,
          left: 80,
          right: 80,
          textAlign: "right",
          fontFamily: DISPLAY,
          fontWeight: 700,
          color: "#FFFFFF",
        }}
      >
        <Interactive.Div
          name="Title"
          style={{ fontSize: 120, lineHeight: 1.25 }}
        >
          <WriteOn text={title} at={local(r.title[0])} dur={r.title[1]} />
        </Interactive.Div>
        {/* Two editorial phrases in turn, never side by side */}
        <div style={{ position: "relative", height: 130, fontSize: 92 }}>
          <div
            style={{
              position: "absolute",
              right: 0,
              opacity: 1 - phraseIn(r.spend[0] - 0.3),
            }}
          >
            <WriteOn
              text={income}
              at={local(r.income[0])}
              dur={r.income[1]}
              style={{ color: BRAND_CYAN }}
            />
          </div>
          <div style={{ position: "absolute", right: 0 }}>
            <WriteOn
              text={spend}
              at={local(r.spend[0])}
              dur={r.spend[1]}
              style={{ color: BRAND_CYAN }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export const RestaurantScene = Interactive.create({
  Component: RestaurantSceneInner,
  layout: "absolute-fill",
  schema: {
    title: { type: "string", default: "آخر اليـــوم", description: "Title" },
    income: {
      type: "string",
      default: "إيرادات اليـــوم",
      description: "First phrase",
    },
    spend: {
      type: "string",
      default: "ومصروفـــاته",
      description: "Second phrase",
    },
  },
});
