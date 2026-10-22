import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND_DARK, BRAND_PURPLE, DISPLAY, TEXT } from "./theme";

// Optional tag pill, a dark headline line and a purple accent line.
// `start` and `end` are seconds relative to the scene.
const CaptionInner = ({
  tag,
  title,
  accent,
  start,
  end,
  style,
}: {
  readonly tag: string;
  readonly title: string;
  readonly accent: string;
  readonly start: number;
  readonly end: number;
  readonly style?: React.CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = interpolate(
    frame,
    [start * fps, (start + 0.45) * fps],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    },
  );
  const exit = interpolate(frame, [(end - 0.35) * fps, end * fps], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      dir="rtl"
      lang="ar"
      style={{
        position: "absolute",
        left: 80,
        right: 80,
        textAlign: "right",
        opacity: Math.min(enter, exit),
        translate: `0px ${(1 - enter) * 24}px`,
        ...style,
      }}
    >
      {tag ? (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "8px 22px",
            borderRadius: 999,
            backgroundColor: BRAND_DARK,
            color: "#FFFFFF",
            fontFamily: TEXT,
            fontWeight: 500,
            fontSize: 38,
            marginBottom: 22,
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#FFFFFF",
            }}
          />
          {tag}
        </div>
      ) : null}
      <div
        style={{
          fontFamily: DISPLAY,
          fontWeight: 700,
          fontSize: 104,
          lineHeight: 1.2,
          color: BRAND_DARK,
        }}
      >
        {title}
        {accent ? (
          <>
            <br />
            <span style={{ color: BRAND_PURPLE }}>{accent}</span>
          </>
        ) : null}
      </div>
    </div>
  );
};

export const Caption = Interactive.create({
  Component: CaptionInner,
  layout: "none",
  schema: {
    tag: { type: "string", default: "", description: "Tag" },
    title: { type: "string", default: "", description: "Headline" },
    accent: { type: "string", default: "", description: "Accent line" },
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
