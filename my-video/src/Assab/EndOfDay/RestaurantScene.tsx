import {
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AssabMark } from "../AssabMark";
import { BRAND_DARK, BRAND_PURPLE, DISPLAY, SURFACE } from "../theme";
import { WriteOn } from "../WriteOn";
import { AbayaWoman, DiningTable, ThobeMan, Waiter } from "./People";
import { T2 } from "./timeline";

const local = (s: number) => s - T2.restaurantStart;

const Lamp: React.FC<{ readonly x: number }> = ({ x }) => (
  <g>
    <line x1={x} y1={560} x2={x} y2={690} stroke={BRAND_DARK} strokeWidth={3} />
    <circle cx={x} cy={740} r={150} fill="url(#lamp-glow)" />
    <path
      d={`M${x - 46} 730 L${x - 22} 690 H${x + 22} L${x + 46} 730 Z`}
      fill={BRAND_DARK}
    />
    <ellipse cx={x} cy={731} rx={40} ry={7} fill="#FFF6D6" />
  </g>
);

const Cook: React.FC<{ readonly x: number; readonly bob: number }> = ({
  x,
  bob,
}) => (
  <g transform={`translate(${x} ${bob})`}>
    <path d="M-40 905 Q0 860 40 905 Z" fill="#F4F2FA" />
    <circle cx={0} cy={842} r={20} fill="#B47C5C" />
    <path
      d="M-20 828 h40 v-14 a14 14 0 0 0 -8 -24 a16 16 0 0 0 -24 0 a14 14 0 0 0 -8 24 Z"
      fill="#FFFFFF"
    />
  </g>
);

const Plant: React.FC<{ readonly x: number }> = ({ x }) => (
  <g transform={`translate(${x} 1020)`}>
    {[-40, -15, 10, 35].map((a) => (
      <ellipse
        key={a}
        cx={0}
        cy={-70}
        rx={16}
        ry={64}
        fill="#5B9E73"
        transform={`rotate(${a} 0 0)`}
      />
    ))}
    <path d="M-30 -10 h60 l-8 60 h-44 Z" fill={BRAND_DARK} />
  </g>
);

// Seat a pair of diners at a table; arms rise and fall as they eat.
const TableGroup: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly scale: number;
  readonly left: "man" | "woman";
  readonly right: "man" | "woman";
  readonly skins: readonly [number, number];
  readonly phase: number;
}> = ({ x, y, scale, left, right, skins, phase }) => {
  const frame = useCurrentFrame();
  const lift = (o: number) =>
    Math.max(0, Math.sin(frame / 14 + phase + o)) * 26;
  const seatY = y + 92 * scale;
  const Left = left === "man" ? ThobeMan : AbayaWoman;
  const Right = right === "man" ? ThobeMan : AbayaWoman;
  return (
    <g>
      <ellipse
        cx={x}
        cy={y + 165 * scale}
        rx={260 * scale}
        ry={34 * scale}
        fill={BRAND_DARK}
        opacity={0.12}
      />
      <DiningTable x={x} y={y} scale={scale} />
      <Left
        x={x - 150 * scale}
        y={seatY}
        scale={scale}
        skin={skins[0]}
        lift={lift(0)}
      />
      <Right
        x={x + 150 * scale}
        y={seatY}
        scale={scale}
        flip
        skin={skins[1]}
        lift={lift(2)}
      />
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
      {/* A full restaurant at peak time, slow push in */}
      <svg
        viewBox="0 0 1080 1920"
        width={1080}
        height={1920}
        style={{
          position: "absolute",
          inset: 0,
          scale: interpolate(frame, [0, local(r.end) * fps], [1, 1.05]),
          transformOrigin: "50% 70%",
        }}
      >
        <defs>
          <radialGradient id="lamp-glow">
            <stop offset="0%" stopColor="#FFF6D6" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#FFF6D6" stopOpacity={0} />
          </radialGradient>
          <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D9CFF7" />
            <stop offset="100%" stopColor="#C2B4F0" />
          </linearGradient>
        </defs>
        <rect width={1080} height={1920} fill={SURFACE} />
        {/* Najdi triangle band along the wall */}
        <path
          d={Array.from(
            { length: 28 },
            (_, i) => `M${i * 40} 640 l20 -26 l20 26 Z`,
          ).join(" ")}
          fill="#DCD3F6"
        />
        <rect y={640} width={1080} height={8} fill="#DCD3F6" />
        {/* Kitchen pass with cooks at work, and the counter */}
        <rect
          x={80}
          y={760}
          width={920}
          height={170}
          rx={14}
          fill={BRAND_DARK}
        />
        <rect x={110} y={785} width={860} height={120} rx={8} fill="#2A1F66" />
        <Cook x={330} bob={Math.sin(frame / 9) * 3} />
        <Cook x={720} bob={Math.sin(frame / 9 + 2) * 3} />
        <rect
          x={110}
          y={850}
          width={860}
          height={55}
          fill="#FFF6D6"
          opacity={0.16}
        />
        <rect
          x={60}
          y={930}
          width={960}
          height={26}
          rx={6}
          fill={BRAND_PURPLE}
        />
        <rect x={60} y={956} width={960} height={70} fill="#4A3C96" />
        <Plant x={40} />
        <Plant x={1040} />
        <Lamp x={300} />
        <Lamp x={540} />
        <Lamp x={780} />
        <rect y={1026} width={1080} height={894} fill="url(#floor)" />
        {/* Back row */}
        <TableGroup
          x={210}
          y={1150}
          scale={0.6}
          left="man"
          right="woman"
          skins={[0, 2]}
          phase={0}
        />
        <TableGroup
          x={545}
          y={1150}
          scale={0.6}
          left="man"
          right="man"
          skins={[1, 3]}
          phase={1.3}
        />
        <TableGroup
          x={875}
          y={1150}
          scale={0.6}
          left="woman"
          right="man"
          skins={[2, 0]}
          phase={2.6}
        />
        {/* Front row */}
        <TableGroup
          x={270}
          y={1560}
          scale={0.95}
          left="man"
          right="man"
          skins={[3, 1]}
          phase={0.7}
        />
        <TableGroup
          x={815}
          y={1560}
          scale={0.95}
          left="woman"
          right="woman"
          skins={[0, 2]}
          phase={2.0}
        />
        <Waiter
          x={interpolate(frame, [0, local(r.end) * fps], [640, 500])}
          y={1880}
          scale={0.95}
          step={frame / 5}
        />
      </svg>

      <div style={{ position: "absolute", top: 110, left: 80 }}>
        <AssabMark height={60} variant="color" revealAt={local(r.mark)} />
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
          color: BRAND_DARK,
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
          color: BRAND_DARK,
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
              style={{ color: BRAND_PURPLE }}
            />
          </div>
          <div style={{ position: "absolute", right: 0 }}>
            <WriteOn
              text={spend}
              at={local(r.spend[0])}
              dur={r.spend[1]}
              style={{ color: BRAND_PURPLE }}
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
