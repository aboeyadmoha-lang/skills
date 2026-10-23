import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AssabMark } from "../AssabMark";
import { Backdrop } from "../Backdrop";
import { BRAND_DARK, BRAND_PURPLE, DISPLAY } from "../theme";
import { WriteOn } from "../WriteOn";
import { T3 } from "./timeline";

const local = (s: number) => s - T3.noteStart;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const INK = "#5B4E9A";

// A neutral operations note: hand-written strokes, no readable content.
const PAPER = { x: 290, y: 980, w: 500, h: 600 };
const STROKES = [
  { y: 1110, w: 380 },
  { y: 1190, w: 320 },
  { y: 1270, w: 360 },
  { y: 1350, w: 240 },
] as const;

const scribble = (right: number, y: number, w: number, seed: number) => {
  const pts: string[] = [`M${right} ${y}`];
  for (let x = 0; x <= w; x += 20) {
    pts.push(`L${right - x} ${y + Math.sin(x / 13 + seed) * 5}`);
  }
  return pts.join(" ");
};

const NoteSceneInner = ({
  context,
  question,
  solved,
  pending,
  writing,
  notEnd,
}: {
  readonly context: string;
  readonly question: string;
  readonly solved: string;
  readonly pending: string;
  readonly writing: string;
  readonly notEnd: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const n = T3.note;
  const f = (s: number) => local(s) * fps;
  const fade = (a: number, b: number) =>
    interpolate(frame, [f(a), f(b)], [1, 0], clamp);
  // Time passing: the note's shadow swings slowly, like moving daylight.
  const shadowX = interpolate(frame, [0, f(n.swap)], [-36, 36], clamp);
  // The note floats while the questions are open, then calms down.
  const calm = interpolate(frame, [f(n.calm), f(n.calm) + 1 * fps], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const float = (1 - calm) * Math.sin(frame / 24) * 10;
  const tilt = (1 - calm) * (-3 + Math.sin(frame / 30) * 1.2);
  const paperIn = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  // A thin line carries on past the edge of the note: follow-up continues.
  const trail = interpolate(
    frame,
    [f(n.trail[0]), f(n.trail[0] + n.trail[1])],
    [0, 1],
    { ...clamp, easing: Easing.inOut(Easing.cubic) },
  );
  const last = STROKES[STROKES.length - 1];
  const trailStart = PAPER.x + PAPER.w - 60 - last.w;

  return (
    <>
      <Backdrop />
      <svg
        viewBox="0 0 1080 1920"
        width={1080}
        height={1920}
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <filter id="note-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow
              dx={shadowX}
              dy={22}
              stdDeviation={22}
              floodColor={BRAND_DARK}
              floodOpacity={0.2}
            />
          </filter>
        </defs>
        <g
          opacity={paperIn}
          transform={`translate(0 ${float + (1 - paperIn) * 60}) rotate(${tilt} 540 1280)`}
        >
          <rect
            x={PAPER.x}
            y={PAPER.y}
            width={PAPER.w}
            height={PAPER.h}
            rx={12}
            fill="#FFFFFF"
            filter="url(#note-shadow)"
          />
          <rect
            x={470}
            y={955}
            width={140}
            height={46}
            rx={6}
            fill={BRAND_PURPLE}
            opacity={0.22}
          />
          <rect
            x={PAPER.x + PAPER.w - 220}
            y={1040}
            width={160}
            height={14}
            rx={7}
            fill="#CFC6EE"
          />
          {STROKES.map((s, i) => (
            <path
              key={i}
              d={scribble(PAPER.x + PAPER.w - 60, s.y, s.w, i * 2.1)}
              stroke={INK}
              strokeWidth={5}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity={0.75}
            />
          ))}
        </g>
        {/* Continues from the note's last stroke out past its edge */}
        <path
          d={`M${trailStart} ${last.y} C ${trailStart - 160} ${last.y + 10}, 120 ${last.y + 80}, -40 ${last.y + 40}`}
          stroke={BRAND_PURPLE}
          strokeWidth={5}
          strokeLinecap="round"
          fill="none"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - trail}
          opacity={trail > 0 ? 1 : 0}
        />
      </svg>

      <div style={{ position: "absolute", top: 110, left: 80 }}>
        <AssabMark height={60} variant="color" revealAt={local(n.mark)} />
      </div>
      <div
        dir="rtl"
        lang="ar"
        style={{
          position: "absolute",
          top: 110,
          right: 80,
          fontFamily: DISPLAY,
          fontWeight: 700,
          fontSize: 44,
          color: BRAND_DARK,
          opacity: interpolate(
            frame,
            [f(n.mark), f(n.mark) + 0.4 * fps],
            [0, 1],
            clamp,
          ),
        }}
      >
        عصـــب
      </div>

      <div
        dir="rtl"
        lang="ar"
        style={{
          position: "absolute",
          top: 270,
          left: 80,
          right: 80,
          textAlign: "right",
          fontFamily: DISPLAY,
          fontWeight: 700,
          color: BRAND_DARK,
        }}
      >
        {/* 1 · The note and the question */}
        <Interactive.Div
          name="Question"
          style={{
            opacity: fade(n.swap - 0.3, n.swap),
            position: "absolute",
            right: 0,
          }}
        >
          <div style={{ fontSize: 92, lineHeight: 1.3 }}>
            <WriteOn
              text={context}
              at={local(n.context[0])}
              dur={n.context[1]}
            />
          </div>
          <div style={{ fontSize: 124, lineHeight: 1.25, color: BRAND_PURPLE }}>
            <WriteOn
              text={question}
              at={local(n.question[0])}
              dur={n.question[1]}
            />
          </div>
        </Interactive.Div>
        {/* 2 · Two editorial questions, not buttons */}
        <Interactive.Div
          name="Open or not"
          style={{
            opacity: fade(n.calm - 0.3, n.calm),
            position: "absolute",
            right: 0,
            fontSize: 150,
            lineHeight: 1.2,
          }}
        >
          <WriteOn text={solved} at={local(n.solved[0])} dur={n.solved[1]} />
          <br />
          <WriteOn
            text={pending}
            at={local(n.pending[0])}
            dur={n.pending[1]}
            style={{ color: BRAND_PURPLE }}
          />
        </Interactive.Div>
        {/* 3 · The point, in two lines */}
        <Interactive.Div
          name="Not the end"
          style={{
            position: "absolute",
            right: 0,
            fontSize: 112,
            lineHeight: 1.25,
          }}
        >
          <WriteOn text={writing} at={local(n.writing[0])} dur={n.writing[1]} />
          <br />
          <WriteOn
            text={notEnd}
            at={local(n.notEnd[0])}
            dur={n.notEnd[1]}
            style={{ color: BRAND_PURPLE }}
          />
        </Interactive.Div>
      </div>
    </>
  );
};

export const NoteScene = Interactive.create({
  Component: NoteSceneInner,
  layout: "absolute-fill",
  schema: {
    context: {
      type: "string",
      default: "ملاحظـــة في مطعمـــك…",
      description: "Context",
    },
    question: {
      type: "string",
      default: "وش صـــار عليهـــا؟",
      description: "Question",
    },
    solved: {
      type: "string",
      default: "انحلّـــت؟",
      description: "First question",
    },
    pending: {
      type: "string",
      default: "ولا باقـــي؟",
      description: "Second question",
    },
    writing: {
      type: "string",
      default: "كتابـــة الملاحظـــة",
      description: "Line 1",
    },
    notEnd: {
      type: "string",
      default: "مو نهايـــة المتابعـــة",
      description: "Line 2",
    },
  },
});
