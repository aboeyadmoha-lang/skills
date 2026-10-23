import { Audio } from "@remotion/media";
import { staticFile, useVideoConfig } from "remotion";
import { makeBedVolume } from "../Soundtrack";
import { T3, VO_SPANS_3 } from "./timeline";

const bedVolume = makeBedVolume(VO_SPANS_3, T3.lockupStart);

export const Soundtrack3: React.FC = () => {
  const { fps } = useVideoConfig();
  const sfx = (name: string, file: string, at: number, volume: number) => (
    <Audio
      name={name}
      src={staticFile(`sfx/${file}.wav`)}
      from={Math.round(at * fps)}
      volume={volume}
    />
  );
  const write = (name: string, [at]: readonly [number, number]) =>
    sfx(name, "maximize-008", at, 0.22);
  const n = T3.note;

  return (
    <>
      <Audio
        name="Music bed"
        src={staticFile("sfx/bed.wav")}
        durationInFrames={Math.round((T3.lockupStart + 0.3) * fps)}
        volume={(f) => bedVolume(f / fps)}
      />
      {sfx("Mark", "maximize-004", n.mark, 0.35)}
      {write("Write: context", n.context)}
      {sfx("Question", "notification-pop", n.question[0], 0.35)}
      {write("Write: solved", n.solved)}
      {sfx("Question mark appears", "maximize-008", n.solved[0] + 0.1, 0.25)}
      {sfx("Question mark settles", "glass-002", n.pending[0] + 0.55, 0.4)}
      {write("Write: not the end", n.writing)}
      {sfx("Note grows", "maximize-004", n.extend[0], 0.3)}
      {n.strokes.map(([at], i) => sfx(`Pen ${i + 1}`, "tick-004", at, 0.15))}
      {sfx("To brand", "riser", T3.brandStart - 1.0, 0.35)}
      {sfx("Brand mark", "maximize-004", T3.brand.mark, 0.4)}
      {write("Write: title", T3.brand.title)}
      {write("Write: line", T3.brand.line)}
      {sfx("To end card", "riser", T3.endStart - 1.0, 0.3)}
      {write("Write: follow", T3.endCard.cta)}
      {sfx("Cyan pulse", "glass-002", T3.endCard.pulse, 0.4)}
      {sfx("Website", "select-007", T3.endCard.site, 0.35)}
    </>
  );
};
