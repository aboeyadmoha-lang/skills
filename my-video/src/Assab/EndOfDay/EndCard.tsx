import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AssabMark } from "../AssabMark";
import { BRAND_CYAN, DISPLAY, LAVENDER, TEXT } from "../theme";
import { WriteOn } from "../WriteOn";
import { T2 } from "./timeline";

const local = (s: number) => s - T2.endStart;

// Still end card: one call to action, then launch status and the website,
// all clear of the mark's protection area. No sign-up link or trial button.
const EndCardInner = ({
  cta,
  status,
  start,
  website,
}: {
  readonly cta: string;
  readonly status: string;
  readonly start: string;
  readonly website: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = T2.endCard;
  const siteIn = interpolate(
    frame,
    [local(e.site) * fps, (local(e.site) + 0.4) * fps],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    },
  );

  return (
    <>
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
        <AssabMark height={170} variant="white" revealAt={local(e.mark)} />
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
          <WriteOn text={cta} at={local(e.cta[0])} dur={e.cta[1]} />
          <br />
          <WriteOn
            text={status}
            at={local(e.status[0])}
            dur={e.status[1]}
            style={{ color: BRAND_CYAN }}
          />
        </Interactive.Div>
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
          <WriteOn text={start} at={local(e.start[0])} dur={e.start[1]} />
        </Interactive.Div>
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
    start: {
      type: "string",
      default: "البدايـــة من الريـــاض",
      description: "Launch line",
    },
    website: { type: "string", default: "Assab.io", description: "Website" },
  },
});
