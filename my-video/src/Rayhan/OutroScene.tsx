import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { amiri, GOLD, GOLD_DARK, GOLD_LIGHT, goldTextGradient } from "./theme";

const PerfumeBottle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const draw = interpolate(frame, [0, 1.8 * fps], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.65, 0, 0.35, 1),
  });
  const fill = interpolate(frame, [1.2 * fps, 2.4 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const stroke = {
    fill: "none",
    stroke: GOLD,
    strokeWidth: 3,
    pathLength: 1,
    strokeDasharray: 1,
    strokeDashoffset: draw,
  };

  return (
    <svg
      viewBox="0 0 200 340"
      width={340}
      height={578}
      style={{ filter: `drop-shadow(0 0 30px rgba(212,175,55,0.45))` }}
    >
      <defs>
        <linearGradient id="liquid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={GOLD_LIGHT} stopOpacity={0.55} />
          <stop offset="55%" stopColor={GOLD} stopOpacity={0.35} />
          <stop offset="100%" stopColor={GOLD_DARK} stopOpacity={0.6} />
        </linearGradient>
      </defs>
      {/* Liquid */}
      <rect
        x={36}
        y={120}
        width={128}
        height={200}
        rx={20}
        fill="url(#liquid)"
        opacity={fill}
      />
      {/* Body */}
      <rect x={28} y={86} width={144} height={242} rx={28} {...stroke} />
      {/* Neck */}
      <rect x={84} y={60} width={32} height={26} {...stroke} />
      {/* Cap */}
      <rect x={70} y={14} width={60} height={46} rx={6} {...stroke} />
      {/* Highlight */}
      <line
        x1={52}
        y1={120}
        x2={52}
        y2={280}
        stroke={GOLD_LIGHT}
        strokeWidth={4}
        strokeLinecap="round"
        opacity={fill * 0.8}
      />
    </svg>
  );
};

const OutroSceneInner = ({
  brand,
  tagline,
}: {
  readonly brand: string;
  readonly tagline: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      <PerfumeBottle />
      <Interactive.Div
        name="Brand name"
        dir="rtl"
        lang="ar"
        style={{
          fontFamily: amiri,
          fontWeight: 700,
          fontSize: 220,
          lineHeight: 1.3,
          marginTop: 40,
          padding: "0 40px",
          color: "transparent",
          backgroundImage: goldTextGradient,
          backgroundSize: "250% 100%",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          backgroundPosition: interpolate(
            frame,
            [1.5 * fps, 5 * fps],
            ["100% 0%", "0% 0%"],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          ),
          opacity: interpolate(frame, [1.6 * fps, 2.6 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(
            frame,
            [1.6 * fps, 2.6 * fps],
            ["0px 40px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      >
        {brand}
      </Interactive.Div>
      <Interactive.Div
        name="Closing tagline"
        dir="rtl"
        lang="ar"
        style={{
          fontFamily: amiri,
          fontSize: 76,
          color: GOLD,
          opacity: interpolate(frame, [2.6 * fps, 3.4 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {tagline}
      </Interactive.Div>
    </>
  );
};

export const OutroScene = Interactive.create({
  Component: OutroSceneInner,
  layout: "absolute-fill",
  schema: {
    brand: { type: "string", default: "ريحان", description: "Brand name" },
    tagline: {
      type: "string",
      default: "عطرك يحكي عنك",
      description: "Tagline",
    },
  },
});
