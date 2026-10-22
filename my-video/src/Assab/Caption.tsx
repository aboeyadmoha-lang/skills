import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { DISPLAY, PURPLE, TEXT, VIOLET } from "./theme";

// A kicker line over a headline. `start` and `end` are in seconds, relative to
// the scene, so each caption fades in and out on its own.
const CaptionInner = ({
  kicker,
  title,
  start,
  end,
  style,
}: {
  readonly kicker: string;
  readonly title: string;
  readonly start: number;
  readonly end: number;
  readonly style?: React.CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = interpolate(frame, [start * fps, (start + 0.6) * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const exit = interpolate(frame, [(end - 0.4) * fps, end * fps], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      dir="rtl"
      lang="ar"
      style={{
        position: "absolute",
        left: 90,
        right: 90,
        textAlign: "right",
        opacity: Math.min(enter, exit),
        translate: `0px ${(1 - enter) * 30}px`,
        ...style,
      }}
    >
      {kicker ? (
        <div
          style={{
            fontFamily: TEXT,
            fontWeight: 500,
            fontSize: 50,
            color: VIOLET,
            marginBottom: 12,
          }}
        >
          {kicker}
        </div>
      ) : null}
      <div
        style={{
          fontFamily: DISPLAY,
          fontWeight: 700,
          fontSize: 104,
          lineHeight: 1.25,
          color: PURPLE,
        }}
      >
        {title}
      </div>
    </div>
  );
};

export const Caption = Interactive.create({
  Component: CaptionInner,
  layout: "none",
  schema: {
    kicker: { type: "string", default: "", description: "Kicker" },
    title: { type: "string", default: "", description: "Headline" },
    start: {
      type: "number",
      default: 0,
      step: 0.1,
      description: "Start (s)",
      hiddenFromList: false,
      keyframable: false,
    },
    end: {
      type: "number",
      default: 3,
      step: 0.1,
      description: "End (s)",
      hiddenFromList: false,
      keyframable: false,
    },
  },
});
