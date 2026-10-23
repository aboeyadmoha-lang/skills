import { Audio, Video } from "@remotion/media";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { staticFile, Track, useVideoConfig } from "remotion";
import { BRAND_PURPLE, NIGHT } from "../theme";
import { BrandScene } from "./BrandScene";
import { EndCard } from "./EndCard";
import { DayScene } from "./DayScene";
import { ReviewScene } from "./ReviewScene";
import { Soundtrack2 } from "./Soundtrack";
import { VO_2 } from "./timeline";

// Video 2, "آخر اليوم". 5 + 8.4 + 5 + 4.8 + 4.5 lockup - 4 × 0.4 fades
// = 26.1s, paced to the recorded voiceover, ending on the original lockup.
export const EndOfDay: React.FC = () => {
  const { fps } = useVideoConfig();
  const fadeTiming = linearTiming({ durationInFrames: 0.4 * fps });

  return (
    <>
      <TransitionSeries>
        <TransitionSeries.Sequence name="Day" durationInFrames={5 * fps}>
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
        <TransitionSeries.Sequence name="Review" durationInFrames={8.4 * fps}>
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
        <TransitionSeries.Sequence name="Brand" durationInFrames={5 * fps}>
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
        <TransitionSeries.Sequence name="End card" durationInFrames={4.8 * fps}>
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
      <Track name="Voiceover">
        {VO_2.map((c) => (
          <Audio
            key={c.name}
            name={`VO – ${c.name}`}
            src={staticFile("assab/voiceover-2.mp3")}
            from={Math.round(c.at * fps)}
            trimBefore={Math.round(c.from * fps)}
            durationInFrames={Math.round(c.dur * fps)}
          />
        ))}
      </Track>
      <Soundtrack2 />
    </>
  );
};
