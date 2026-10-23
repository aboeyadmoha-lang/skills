import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AssabMark } from "../AssabMark";
import { Backdrop } from "../Backdrop";
import { BRAND_CYAN, BRAND_DARK, BRAND_PURPLE, DISPLAY } from "../theme";
import { WriteOn } from "../WriteOn";
import { EditorialCard } from "./EditorialCard";
import { InIcon, OutIcon } from "./Icons";
import { T2 } from "./timeline";

const local = (s: number) => s - T2.dayStart;
const CARD_W = 820;
// Centre of the card's icon tile, inside the card wrapper.
const TILE = { x: CARD_W - 34 - 57, y: 30 + 57 };
// Just past the right edge of the frame, in card-wrapper coordinates.
const OFF_RIGHT = 1080 - 130 + 90;
// Pieces of the day: each drops in on "دخل" and flies out on "طلع".
const PIECES = [
  { dx: -90, color: BRAND_PURPLE, spin: 70, inAt: 2.05, outAt: 3.55 },
  { dx: 40, color: BRAND_CYAN, spin: -90, inAt: 2.17, outAt: 3.63 },
  { dx: -30, color: "#C9B8FF", spin: 50, inAt: 2.29, outAt: 3.71 },
  { dx: 80, color: BRAND_DARK, spin: -60, inAt: 2.41, outAt: 3.79 },
  { dx: -60, color: BRAND_CYAN, spin: 80, inAt: 2.53, outAt: 3.87 },
  { dx: 20, color: BRAND_PURPLE, spin: -70, inAt: 2.65, outAt: 3.95 },
] as const;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const DaySceneInner = ({
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
  const d = T2.day;
  const f = (s: number) => local(s) * fps;
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  // The day sets: the sun sinks behind the horizon and the light deepens.
  const dusk = interpolate(frame, [0, f(d.end)], [0, 1], clamp);
  const inIn = interpolate(
    frame,
    [f(d.income[0]), f(d.income[0]) + 0.4 * fps],
    [0, 1],
    { ...clamp, easing: ease },
  );
  const inOut = interpolate(
    frame,
    [f(d.spend[0]) - 0.35 * fps, f(d.spend[0])],
    [0, 1],
    clamp,
  );
  const outIn = interpolate(
    frame,
    [f(d.spend[0]), f(d.spend[0]) + 0.4 * fps],
    [0, 1],
    { ...clamp, easing: ease },
  );
  const landPulse = PIECES.reduce(
    (acc, p) =>
      acc +
      Math.max(
        0,
        1 - Math.abs(frame - (f(p.inAt) + 0.45 * fps)) / (0.12 * fps),
      ),
    0,
  );
  const lift = interpolate(frame, [f(3.5), f(3.75), f(4.2)], [0, 1, 0], clamp);
  // Arrows dip into the tray as pieces arrive, and lift out as they leave.
  const inArrow = interpolate(
    frame,
    [f(2.05), f(2.4), f(2.7), f(3.0)],
    [-4, 1.5, -1, 0],
    clamp,
  );
  const outArrow = interpolate(
    frame,
    [f(3.55), f(3.85), f(4.15), f(4.4)],
    [-1, 3, -0.5, 0],
    clamp,
  );

  return (
    <>
      <Backdrop />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, rgba(58,45,125,0) 30%, rgba(58,45,125,${0.1 + dusk * 0.18}) 100%)`,
        }}
      />
      {/* Setting sun over the horizon */}
      <svg
        viewBox="0 0 1080 1920"
        width={1080}
        height={1920}
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <linearGradient id="sun" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={BRAND_CYAN} />
            <stop offset="100%" stopColor={BRAND_PURPLE} />
          </linearGradient>
          <clipPath id="above-horizon">
            <rect width={1080} height={1520} />
          </clipPath>
        </defs>
        <g clipPath="url(#above-horizon)">
          <circle
            cx={540}
            cy={1300 + dusk * 260}
            r={230}
            fill="url(#sun)"
            opacity={0.9}
          />
        </g>
        <rect
          y={1520}
          width={1080}
          height={4}
          fill={BRAND_DARK}
          opacity={0.5}
        />
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={200 + i * 40}
            y={1560 + i * 44}
            width={680 - i * 80}
            height={6}
            rx={3}
            fill={BRAND_DARK}
            opacity={0.12}
          />
        ))}
      </svg>

      <div style={{ position: "absolute", top: 110, left: 80 }}>
        <AssabMark height={60} variant="color" revealAt={local(d.mark)} />
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
          opacity: interpolate(
            frame,
            [f(d.mark), f(d.mark) + 0.4 * fps],
            [0, 1],
            clamp,
          ),
        }}
      >
        عصـــب
      </div>
      <Interactive.Div
        name="Title"
        dir="rtl"
        lang="ar"
        style={{
          position: "absolute",
          top: 280,
          left: 80,
          right: 80,
          textAlign: "right",
          fontFamily: DISPLAY,
          fontWeight: 700,
          fontSize: 130,
          lineHeight: 1.2,
          color: BRAND_DARK,
        }}
      >
        <WriteOn text={title} at={local(d.title[0])} dur={d.title[1]} />
      </Interactive.Div>
      {/* Two editorial phrases in turn, never side by side. Small pieces
          drop into the "in" card's icon, then fly out of the "out" card's. */}
      <div
        style={{
          position: "absolute",
          top: 640,
          left: 130,
          width: CARD_W,
          height: 200,
        }}
      >
        <EditorialCard
          icon={<InIcon size={70} shift={inArrow} />}
          label={income}
          width={CARD_W}
          fontSize={72}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            opacity: inIn * (1 - inOut),
            translate: `0px ${(1 - inIn) * -90 - inOut * 40}px`,
            scale: `${1 + Math.min(landPulse, 1) * 0.025}`,
          }}
        />
        <EditorialCard
          icon={<OutIcon size={70} shift={outArrow} />}
          label={spend}
          width={CARD_W}
          fontSize={72}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            opacity: outIn,
            translate: `0px ${(1 - outIn) * 40 - lift * 14}px`,
          }}
        />
        {PIECES.map((p, i) => {
          const tIn = interpolate(
            frame,
            [f(p.inAt), f(p.inAt) + 0.45 * fps],
            [0, 1],
            {
              ...clamp,
              easing: Easing.in(Easing.quad),
            },
          );
          const tOut = interpolate(
            frame,
            [f(p.outAt), f(p.outAt) + 0.6 * fps],
            [0, 1],
            {
              ...clamp,
              easing: Easing.out(Easing.quad),
            },
          );
          const falling = tIn > 0 && tIn < 1;
          const rising = tOut > 0 && tOut < 1;
          if (!falling && !rising) return null;
          // In: arc up from off-screen lower right into the icon tile.
          // Out: arc from the tile off-screen to the upper right. Both paths
          // stay clear of the headline.
          const t = falling ? tIn : tOut;
          const from = falling
            ? { x: OFF_RIGHT + p.dx * 0.4, y: TILE.y + 300 + p.dx }
            : { x: TILE.x, y: TILE.y };
          const to = falling
            ? { x: TILE.x, y: TILE.y }
            : { x: OFF_RIGHT + p.dx * 0.4, y: TILE.y - 230 + p.dx * 0.6 };
          const x = from.x + (to.x - from.x) * t;
          const y = from.y + (to.y - from.y) * t - Math.sin(Math.PI * t) * 90;
          const size = falling ? 96 - 52 * tIn : 44 + 52 * tOut;
          const alpha = falling
            ? Math.min(1, tIn * 5) * (1 - Math.max(0, tIn - 0.8) * 5)
            : Math.min(1, (1 - tOut) * 3);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: x - size / 2,
                top: y - size * 0.35,
                width: size,
                height: size * 0.7,
                borderRadius: size * 0.16,
                backgroundColor: p.color,
                opacity: alpha,
                rotate: `${(falling ? tIn : tOut) * p.spin}deg`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: size * 0.1,
                padding: `0 ${size * 0.18}px`,
                boxShadow: "0 8px 18px rgba(58,45,125,0.18)",
              }}
            >
              <div
                style={{
                  height: size * 0.08,
                  borderRadius: 9,
                  backgroundColor: "rgba(255,255,255,0.85)",
                }}
              />
              <div
                style={{
                  height: size * 0.08,
                  width: "60%",
                  borderRadius: 9,
                  backgroundColor: "rgba(255,255,255,0.85)",
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export const DayScene = Interactive.create({
  Component: DaySceneInner,
  layout: "absolute-fill",
  schema: {
    title: { type: "string", default: "آخر اليـــوم", description: "Title" },
    income: {
      type: "string",
      default: "وش دخـــل؟",
      description: "First phrase",
    },
    spend: {
      type: "string",
      default: "ووش طلـــع؟",
      description: "Second phrase",
    },
  },
});
