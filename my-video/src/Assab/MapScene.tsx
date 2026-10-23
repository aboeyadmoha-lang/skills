import {
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AssabMark } from "./AssabMark";
import { Backdrop } from "./Backdrop";
import { Caption } from "./Caption";
import { SAUDI_MAP } from "./saudiMap";
import { SaudiMap } from "./SaudiMap";
import { T } from "./timeline";

const TILT = 32;
const local = (globalSeconds: number) => globalSeconds - T.mapStart;

const MapSceneInner = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [rx, ry] = SAUDI_MAP.riyadhCity;

  return (
    <>
      <Backdrop />
      {/* Small mark, kept clear of the map */}
      <div style={{ position: "absolute", top: 110, left: 80 }}>
        <AssabMark height={64} variant="color" revealAt={0.3} />
      </div>
      {/* The map lies tilted back */}
      <div
        style={{
          position: "absolute",
          top: 820,
          left: 40,
          width: 1000,
          height: 1000,
          perspective: 1800,
          perspectiveOrigin: "50% 0%",
          opacity: interpolate(frame, [0, 0.5 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transformOrigin: `${rx / 10}% ${ry / 10}%`,
            rotate: `x ${TILT}deg`,
            scale: interpolate(
              frame,
              [0, local(T.later.sweep) * fps, local(T.later.end) * fps],
              [1, 1.04, 1.08],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            ),
          }}
        >
          <SaudiMap width={1000} />
        </div>
      </div>
      <Caption
        name="Platform caption"
        tag=""
        title="متابعـــة أوضـــح"
        accent="لتشغيـــل مطعمـــك"
        titleAt={local(T.platform.title[0])}
        titleDur={T.platform.title[1]}
        accentAt={local(T.platform.accent[0])}
        accentDur={T.platform.accent[1]}
        end={local(T.platform.end)}
        style={{ top: 330 }}
      />
      <Caption
        name="Riyadh caption"
        tag="خطـــة الانطـــلاق"
        title="البدايـــة:"
        accent="الريـــاض"
        titleAt={local(T.riyadh.title[0])}
        titleDur={T.riyadh.title[1]}
        accentAt={local(T.riyadh.accent[0])}
        accentDur={T.riyadh.accent[1]}
        end={local(T.riyadh.end)}
        style={{ top: 270 }}
      />
      <Caption
        name="Next step caption"
        tag=""
        title="الخطـــوة القادمـــة"
        accent="الغربيـــة والشرقيـــة"
        titleAt={local(T.next.title[0])}
        titleDur={T.next.title[1]}
        accentAt={local(T.next.accent[0])}
        accentDur={T.next.accent[1]}
        end={local(T.next.end)}
        style={{ top: 330 }}
      />
      <Caption
        name="Later caption"
        tag=""
        title="لاحـــقًا بإذن الله"
        accent="كل مدن المملكـــة"
        titleAt={local(T.later.title[0])}
        titleDur={T.later.title[1]}
        accentAt={local(T.later.accent[0])}
        accentDur={T.later.accent[1]}
        end={local(T.later.end)}
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
