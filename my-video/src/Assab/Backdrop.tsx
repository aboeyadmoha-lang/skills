import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SURFACE } from "./theme";

// Light surface with soft purple and cyan light, drifting slowly.
export const Backdrop: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const drift = interpolate(frame, [0, durationInFrames], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: SURFACE, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          width: 1100,
          height: 1100,
          left: -380 + drift * 120,
          top: 380 - drift * 80,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(110,41,246,0.30) 0%, rgba(110,41,246,0) 65%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1000,
          height: 1000,
          right: -420 + drift * 100,
          bottom: -260 + drift * 60,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(1,246,247,0.28) 0%, rgba(1,246,247,0) 65%)",
        }}
      />
    </AbsoluteFill>
  );
};
