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
      {/* Two editorial phrases in turn, never side by side */}
      <div
        style={{
          position: "absolute",
          top: 640,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <EditorialCard
          icon={<InIcon size={70} />}
          label={income}
          width={820}
          fontSize={72}
          style={{
            position: "absolute",
            opacity: inIn * (1 - inOut),
            translate: `0px ${(1 - inIn) * 40 - inOut * 40}px`,
          }}
        />
        <EditorialCard
          icon={<OutIcon size={70} />}
          label={spend}
          width={820}
          fontSize={72}
          style={{
            position: "absolute",
            opacity: outIn,
            translate: `0px ${(1 - outIn) * 40}px`,
          }}
        />
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
