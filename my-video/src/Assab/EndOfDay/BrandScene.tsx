import { Interactive } from "remotion";
import { AssabMark } from "../AssabMark";
import { DISPLAY, TEXT } from "../theme";
import { WriteOn } from "../WriteOn";
import { T2 } from "./timeline";

const local = (s: number) => s - T2.brandStart;

// Identity space: the full original mark with its protection area, and the
// name as a separate editorial title, never set beside the mark as a logo.
const BrandSceneInner = ({
  title,
  line,
}: {
  readonly title: string;
  readonly line: string;
}) => {
  const b = T2.brand;
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 520,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <AssabMark height={230} variant="white" revealAt={local(b.mark)} />
      </div>
      <div
        dir="rtl"
        lang="ar"
        style={{
          position: "absolute",
          top: 1060,
          left: 80,
          right: 80,
          textAlign: "center",
          color: "#FFFFFF",
        }}
      >
        <Interactive.Div
          name="Title"
          style={{
            fontFamily: DISPLAY,
            fontWeight: 700,
            fontSize: 150,
            lineHeight: 1.2,
          }}
        >
          <WriteOn text={title} at={local(b.title[0])} dur={b.title[1]} />
        </Interactive.Div>
        <Interactive.Div
          name="Supporting line"
          style={{
            fontFamily: TEXT,
            fontWeight: 500,
            fontSize: 60,
            marginTop: 30,
            lineHeight: 1.4,
          }}
        >
          <WriteOn text={line} at={local(b.line[0])} dur={b.line[1]} />
        </Interactive.Div>
      </div>
    </>
  );
};

export const BrandScene = Interactive.create({
  Component: BrandSceneInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    title: { type: "string", default: "عصـــب", description: "Title" },
    line: {
      type: "string",
      default: "لمتابعـــة تشغيـــل المطـــاعم وأرقامهـــا",
      description: "Supporting line",
    },
  },
});
