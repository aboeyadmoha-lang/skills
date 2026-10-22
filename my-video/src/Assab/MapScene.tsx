import {
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AssabMark } from "./AssabMark";
import { Backdrop } from "./Backdrop";
import { Caption } from "./Caption";
import { MAP_PHASES, SaudiMap } from "./SaudiMap";

const MapSceneInner = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      <Backdrop />
      {/* Small mark, kept clear of the map */}
      <div style={{ position: "absolute", top: 110, left: 80 }}>
        <AssabMark height={64} variant="color" revealAt={0.3} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 860,
          left: 40,
          opacity: interpolate(frame, [0, 0.5 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <SaudiMap width={1000} />
      </div>
      <Caption
        name="Platform caption"
        tag=""
        title="متابعة أوضح"
        accent="لتشغيل مطعمك"
        start={0.4}
        end={MAP_PHASES.riyadh}
        style={{ top: 330 }}
      />
      <Caption
        name="Riyadh caption"
        tag="خطة الانطلاق"
        title="البداية:"
        accent="الرياض"
        start={MAP_PHASES.riyadh}
        end={MAP_PHASES.next}
        style={{ top: 280 }}
      />
      <Caption
        name="Next step caption"
        tag=""
        title="الخطوة القادمة"
        accent="الغربية والشرقية"
        start={MAP_PHASES.next}
        end={MAP_PHASES.later}
        style={{ top: 330 }}
      />
      <Caption
        name="Later caption"
        tag=""
        title="لاحقًا بإذن الله"
        accent="كل مدن المملكة"
        start={MAP_PHASES.later}
        end={MAP_PHASES.end}
        style={{ top: 330 }}
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
