import {
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Logo files are 1.83042 : 1 (identity guide). The mark is never stretched,
// rotated, outlined or given a shadow; it may only be revealed with a mask.
const RATIO = 1.83042;

export const AssabMark: React.FC<{
  readonly height: number;
  readonly variant: "color" | "white";
  readonly revealAt?: number;
}> = ({ height, variant, revealAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reveal =
    revealAt === undefined
      ? 1
      : interpolate(frame, [revealAt * fps, (revealAt + 0.5) * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        });

  return (
    <Img
      src={staticFile(`assab/logo-${variant}.svg`)}
      style={{
        height,
        width: height * RATIO,
        clipPath: `inset(0 ${(1 - reveal) * 100}% 0 0)`,
      }}
    />
  );
};
