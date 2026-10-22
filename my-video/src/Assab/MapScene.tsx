import {
  Interactive,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { AssabMark } from "./AssabMark";
import { Caption } from "./Caption";
import { MAP_PHASES, SaudiMap } from "./SaudiMap";
import { PURPLE } from "./theme";

const MapSceneInner = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      {/* Small protected mark, kept clear of the map */}
      <div
        style={{
          position: "absolute",
          top: 130,
          left: 90,
          opacity: interpolate(frame, [0.3 * fps, 0.9 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <AssabMark size={110} color={PURPLE} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 820,
          left: 40,
          opacity: interpolate(frame, [0, 0.8 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <SaudiMap width={1000} />
      </div>
      <Caption
        name="Intro caption"
        kicker=""
        title="متابعة أوضح لتشغيل مطعمك"
        start={0.4}
        end={MAP_PHASES.riyadh}
        style={{ top: 420 }}
      />
      <Caption
        name="Riyadh caption"
        kicker="خطة الانطلاق"
        title="البداية: الرياض"
        start={MAP_PHASES.riyadh}
        end={MAP_PHASES.next}
        style={{ top: 420 }}
      />
      <Caption
        name="Next step caption"
        kicker="الخطوة القادمة"
        title="الغربية والشرقية"
        start={MAP_PHASES.next}
        end={MAP_PHASES.later}
        style={{ top: 420 }}
      />
      <Caption
        name="Later caption"
        kicker="لاحقًا بإذن الله"
        title="كل مدن المملكة"
        start={MAP_PHASES.later}
        end={MAP_PHASES.end}
        style={{ top: 420 }}
      />
    </>
  );
};

export const MapScene = Interactive.create({
  Component: MapSceneInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
  },
});
