import { Video } from "@remotion/media";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { staticFile, useVideoConfig } from "remotion";
import { BRAND_PURPLE, NIGHT } from "../theme";
import { BrandScene } from "./BrandScene";
import { EndCard } from "./EndCard";
import { DayScene } from "./DayScene";
import { ReviewScene } from "./ReviewScene";
import { Soundtrack2 } from "./Soundtrack";

// Video 2, "آخر اليوم". 5.2 + 10.4 + 7.4 + 6.6 + 4.5 lockup - 4 × 0.4 fades
// = 32.5s: the scripted 28s plus the original Assab logo lockup.
export const EndOfDay: React.FC = () => {
  const { fps } = useVideoConfig();
  const fadeTiming = linearTiming({ durationInFrames: 0.4 * fps });

  return (
    <>
      <TransitionSeries>
        <TransitionSeries.Sequence name="Day" durationInFrames={5.2 * fps}>
          <DayScene
            name="Day"
            title="آخر اليـــوم"
            income="وش دخـــل؟"
            spend="ووش طلـــع؟"
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={fadeTiming}
        />
        <TransitionSeries.Sequence name="Review" durationInFrames={10.4 * fps}>
          <ReviewScene
            name="Review"
            title="بنـــود للمراجعـــة"
            understand="افهـــم يومـــك"
            sub="مو بس تخلّصـــه"
            cash="تسليـــم النقـــد"
            expenses="العهـــد والمصروفـــات"
            purchases="استـــلام المشتريـــات"
            status="بانتظار المراجعـــة"
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={fadeTiming}
        />
        <TransitionSeries.Sequence name="Brand" durationInFrames={7.4 * fps}>
          <BrandScene
            name="Brand"
            title="عصـــب"
            line="لمتابعـــة تشغيـــل المطـــاعم وأرقامهـــا"
            style={{ backgroundColor: BRAND_PURPLE }}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={fadeTiming}
        />
        <TransitionSeries.Sequence name="End card" durationInFrames={6.6 * fps}>
          <EndCard
            name="End card"
            cta="تابـــعوا عصـــب."
            status="قريـــبًا."
            start="البدايـــة من الريـــاض"
            website="Assab.io"
            style={{ backgroundColor: NIGHT }}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={fadeTiming}
        />
        <TransitionSeries.Sequence
          name="Logo lockup"
          durationInFrames={4.5 * fps}
        >
          <Video src={staticFile("assab/closing-lockup.mp4")} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Soundtrack2 />
    </>
  );
};
