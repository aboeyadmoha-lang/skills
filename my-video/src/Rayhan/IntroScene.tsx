import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { GoldDivider } from "./GoldDivider";
import { amiri, GOLD, goldTextGradient } from "./theme";

const IntroSceneInner = ({
  brand,
  subtitle,
}: {
  readonly brand: string;
  readonly subtitle: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      <GoldDivider delay={0.2 * fps} />
      <Interactive.Div
        name="Brand name"
        dir="rtl"
        lang="ar"
        style={{
          fontFamily: amiri,
          fontWeight: 700,
          fontSize: 300,
          lineHeight: 1.3,
          padding: "0 40px",
          color: "transparent",
          backgroundImage: goldTextGradient,
          backgroundSize: "250% 100%",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          filter: `drop-shadow(0 0 30px rgba(212,175,55,0.35))`,
          backgroundPosition: interpolate(
            frame,
            [0.5 * fps, 4 * fps],
            ["100% 0%", "0% 0%"],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          ),
          opacity: interpolate(frame, [0.4 * fps, 1.6 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          scale: interpolate(frame, [0.4 * fps, 2.5 * fps], [1.25, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
          }),
        }}
      >
        {brand}
      </Interactive.Div>
      <Interactive.Div
        name="Subtitle"
        dir="rtl"
        lang="ar"
        style={{
          fontFamily: amiri,
          fontSize: 72,
          color: GOLD,
          marginBottom: 40,
          opacity: interpolate(frame, [1.5 * fps, 2.3 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(
            frame,
            [1.5 * fps, 2.3 * fps],
            ["0px 30px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      >
        {subtitle}
      </Interactive.Div>
      <GoldDivider delay={0.2 * fps} />
    </>
  );
};

export const IntroScene = Interactive.create({
  Component: IntroSceneInner,
  layout: "absolute-fill",
  schema: {
    brand: { type: "string", default: "ريحان", description: "Brand name" },
    subtitle: { type: "string", default: "عطور", description: "Subtitle" },
  },
});
