import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { GoldDivider } from "./GoldDivider";
import { amiri, goldTextGradient } from "./theme";

const Word: React.FC<{ readonly word: string; readonly delay: number }> = ({
  word,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = interpolate(frame, [delay, delay + 0.9 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.1em 14px 0.4em",
        color: "transparent",
        backgroundImage: goldTextGradient,
        backgroundSize: "200% 100%",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        backgroundPosition: `${interpolate(frame, [0, 6 * fps], [100, 0])}% 0%`,
        opacity: progress,
        translate: `0px ${(1 - progress) * 60}px`,
        filter: `blur(${(1 - progress) * 14}px)`,
      }}
    >
      {word}
    </span>
  );
};

const TaglineSceneInner = ({ tagline }: { readonly tagline: string }) => {
  const { fps } = useVideoConfig();
  const words = tagline.split(" ").filter(Boolean);

  return (
    <>
      <div
        dir="rtl"
        lang="ar"
        style={{
          fontFamily: amiri,
          fontWeight: 700,
          fontSize: 150,
          lineHeight: 1.2,
          textAlign: "center",
          padding: "0 80px",
          filter: "drop-shadow(0 0 26px rgba(212,175,55,0.35))",
        }}
      >
        {words.map((word, i) => (
          <Word key={i} word={word} delay={0.4 * fps + i * 0.55 * fps} />
        ))}
      </div>
      <GoldDivider delay={0.4 * fps + words.length * 0.55 * fps} />
    </>
  );
};

export const TaglineScene = Interactive.create({
  Component: TaglineSceneInner,
  layout: "absolute-fill",
  schema: {
    tagline: {
      type: "string",
      default: "عطرك يحكي عنك",
      description: "Tagline",
    },
  },
});
