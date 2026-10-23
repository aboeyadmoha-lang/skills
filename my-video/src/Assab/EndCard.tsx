import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AssabMark } from "./AssabMark";
import { BRAND_CYAN, DISPLAY, LAVENDER, TEXT } from "./theme";
import { WriteOn } from "./WriteOn";

// Scene-relative cue times in seconds; [start, duration] for write-ons.
export type EndCues = {
  readonly mark: number;
  readonly cta: readonly [number, number];
  readonly status: readonly [number, number];
  readonly start?: readonly [number, number];
  readonly site: number;
  // One cyan pulse, kept away from the mark.
  readonly pulse?: number;
};

// Still end card: one call to action, then launch status and the website,
// all clear of the mark's protection area. No sign-up link or trial button.
const EndCardInner = ({
  cta,
  status,
  start,
  website,
  cues: e,
}: {
  readonly cta: string;
  readonly status: string;
  readonly start: string;
  readonly website: string;
  readonly cues: EndCues;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const siteIn = interpolate(
    frame,
    [e.site * fps, (e.site + 0.4) * fps],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    },
  );

  const pulse =
    e.pulse === undefined
      ? 0
      : interpolate(frame, [e.pulse * fps, (e.pulse + 1.1) * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });

  return (
    <>
      {pulse > 0 && pulse < 1 ? (
        <div
          style={{
            position: "absolute",
            left: 540 - 60 - pulse * 260,
            top: 1060 - 60 - pulse * 260,
            width: 120 + pulse * 520,
            height: 120 + pulse * 520,
            borderRadius: "50%",
            border: `${6 - pulse * 4}px solid ${BRAND_CYAN}`,
            opacity: 1 - pulse,
          }}
        />
      ) : null}
      <div
        style={{
          position: "absolute",
          top: 400,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <AssabMark height={170} variant="white" revealAt={e.mark} />
      </div>
      <div
        dir="rtl"
        lang="ar"
        style={{
          position: "absolute",
          top: 820,
          left: 80,
          right: 80,
          textAlign: "center",
          color: "#FFFFFF",
        }}
      >
        <Interactive.Div
          name="Call to action"
          style={{
            fontFamily: DISPLAY,
            fontWeight: 700,
            fontSize: 124,
            lineHeight: 1.25,
          }}
        >
          <WriteOn text={cta} at={e.cta[0]} dur={e.cta[1]} />
          <br />
          <WriteOn
            text={status}
            at={e.status[0]}
            dur={e.status[1]}
            style={{ color: BRAND_CYAN }}
          />
        </Interactive.Div>
        {start && e.start ? (
          <Interactive.Div
            name="Launch"
            style={{
              fontFamily: TEXT,
              fontWeight: 500,
              fontSize: 62,
              marginTop: 40,
              color: LAVENDER,
            }}
          >
            <WriteOn text={start} at={e.start[0]} dur={e.start[1]} />
          </Interactive.Div>
        ) : null}
        <Interactive.Div
          name="Website"
          dir="ltr"
          style={{
            fontFamily: TEXT,
            fontWeight: 500,
            fontSize: 50,
            marginTop: 110,
            opacity: siteIn,
          }}
        >
          {website}
        </Interactive.Div>
      </div>
    </>
  );
};

export const EndCard = Interactive.create({
  Component: EndCardInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    cta: {
      type: "string",
      default: "تابـــعوا عصـــب.",
      description: "Call to action",
    },
    status: { type: "string", default: "قريـــبًا.", description: "Status" },
    start: { type: "string", default: "", description: "Launch line" },
    website: { type: "string", default: "Assab.io", description: "Website" },
  },
});
