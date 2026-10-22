import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { GOLD, GOLD_LIGHT } from "./theme";

// A thin gold line with a diamond in the middle that draws outward from the center.
export const GoldDivider: React.FC<{ readonly delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = interpolate(frame, [delay, delay + 1.2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        width: 640,
      }}
    >
      <div
        style={{
          flex: 1,
          height: 2,
          background: `linear-gradient(90deg, rgba(212,175,55,0), ${GOLD})`,
          scale: `${progress} 1`,
          transformOrigin: "right center",
        }}
      />
      <div
        style={{
          width: 18,
          height: 18,
          rotate: "45deg",
          backgroundColor: GOLD_LIGHT,
          boxShadow: `0 0 24px ${GOLD}`,
          opacity: progress,
        }}
      />
      <div
        style={{
          flex: 1,
          height: 2,
          background: `linear-gradient(90deg, ${GOLD}, rgba(212,175,55,0))`,
          scale: `${progress} 1`,
          transformOrigin: "left center",
        }}
      />
    </div>
  );
};
