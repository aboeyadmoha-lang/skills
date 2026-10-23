import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND_DARK, BRAND_PURPLE, DISPLAY, TEXT } from "./theme";
import { WriteOn } from "./WriteOn";

// Optional tag pill, a dark headline line and a purple accent line, each
// written on in time with the voiceover. Times are scene-relative seconds.
const CaptionInner = ({
  tag,
  title,
  accent,
  titleAt,
  titleDur,
  accentAt,
  accentDur,
  end,
  style,
}: {
  readonly tag: string;
  readonly title: string;
  readonly accent: string;
  readonly titleAt: number;
  readonly titleDur: number;
  readonly accentAt: number;
  readonly accentDur: number;
  readonly end: number;
  readonly style?: React.CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tagIn = interpolate(
    frame,
    [(titleAt - 0.2) * fps, (titleAt + 0.2) * fps],
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
        opacity: exit,
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
            opacity: tagIn,
            scale: interpolate(tagIn, [0, 1], [0.85, 1]),
            transformOrigin: "right center",
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
          fontSize: 100,
          lineHeight: 1.25,
          color: BRAND_DARK,
        }}
      >
        <WriteOn text={title} at={titleAt} dur={titleDur} />
        {accent ? (
          <>
            <br />
            <WriteOn
              text={accent}
              at={accentAt}
              dur={accentDur}
              style={{ color: BRAND_PURPLE }}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};

const seconds = (description: string, value: number) =>
  ({
    type: "number",
    default: value,
    step: 0.05,
    description,
    hiddenFromList: false,
    keyframable: false,
  }) as const;

export const Caption = Interactive.create({
  Component: CaptionInner,
  layout: "none",
  schema: {
    tag: { type: "string", default: "", description: "Tag" },
    title: { type: "string", default: "", description: "Headline" },
    accent: { type: "string", default: "", description: "Accent line" },
    titleAt: seconds("Headline start (s)", 0),
    titleDur: seconds("Headline write (s)", 1),
    accentAt: seconds("Accent start (s)", 1),
    accentDur: seconds("Accent write (s)", 1),
    end: seconds("End (s)", 3),
  },
});
