import { Audio, Video } from "@remotion/media";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { staticFile, Track, useVideoConfig } from "remotion";
import { BrandScene } from "../BrandScene";
import { EndCard } from "../EndCard";
import { BRAND_PURPLE, NIGHT } from "../theme";
import { NoteScene } from "./NoteScene";
import { Soundtrack3 } from "./Soundtrack";
import { T3, VO_3 } from "./timeline";

// Video 3, "وش صار عليها". 11.1 + 6.2 + 5.2 + 4.5 lockup - (0.5 + 2 × 0.4)
// transitions = 25.7s, paced to the recorded voiceover.
// The note slides away to reveal the identity space.
export const WhatHappened: React.FC = () => {
  const { fps } = useVideoConfig();
  const fadeTiming = linearTiming({ durationInFrames: 0.4 * fps });
  const b = T3.brand;
  const e = T3.endCard;

  return (
    <>
      <TransitionSeries>
        <TransitionSeries.Sequence name="Note" durationInFrames={11.1 * fps}>
          <NoteScene
            name="Note"
            context="ملاحظـــة في مطعمـــك…"
            question="وش صـــار عليهـــا؟"
            solved="انحلّـــت"
            pending="ولا باقـــي؟"
            writing="كتابـــة الملاحظـــة"
            notEnd="مو نهايـــة المتابعـــة"
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: 0.5 * fps })}
        />
        <TransitionSeries.Sequence name="Brand" durationInFrames={6.2 * fps}>
          <BrandScene
            name="Brand"
            title="عصـــب"
            line="متابعـــة أوضـــح لتشغيـــل مطعمـــك"
            cues={{
              mark: b.mark - T3.brandStart,
              title: [b.title[0] - T3.brandStart, b.title[1]],
              line: [b.line[0] - T3.brandStart, b.line[1]],
            }}
            style={{ backgroundColor: BRAND_PURPLE }}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={fadeTiming}
        />
        <TransitionSeries.Sequence name="End card" durationInFrames={5.2 * fps}>
          <EndCard
            name="End card"
            cta="تابـــعوا عصـــب."
            status="قريـــبًا."
            start=""
            website="Assab.io"
            cues={{
              mark: e.mark - T3.endStart,
              cta: [e.cta[0] - T3.endStart, e.cta[1]],
              status: [e.status[0] - T3.endStart, e.status[1]],
              pulse: e.pulse - T3.endStart,
              site: e.site - T3.endStart,
            }}
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
        {VO_3.map((c) => (
          <Audio
            key={c.name}
            name={`VO – ${c.name}`}
            src={staticFile("assab/voiceover-3.mp3")}
            from={Math.round(c.at * fps)}
            trimBefore={Math.round(c.from * fps)}
            durationInFrames={Math.round(c.dur * fps)}
          />
        ))}
      </Track>
      <Soundtrack3 />
    </>
  );
};
