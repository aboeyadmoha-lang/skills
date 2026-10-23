import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

// Reveals right-to-left text as if it is being written, with a soft edge.
// `at` and `dur` are seconds relative to the scene.
export const WriteOn: React.FC<{
  readonly text: string;
  readonly at: number;
  readonly dur: number;
  readonly style?: React.CSSProperties;
}> = ({ text, at, dur, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const edge = 14;
  const head = interpolate(
    frame,
    [at * fps, (at + dur) * fps],
    [0, 100 + edge],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.33, 0, 0.4, 1),
    },
  );
  const mask = `linear-gradient(to left, #000 ${head - edge}%, transparent ${head}%)`;

  return (
    <span
      style={{
        display: "inline-block",
        maskImage: mask,
        WebkitMaskImage: mask,
        ...style,
      }}
    >
      {text}
    </span>
  );
};
