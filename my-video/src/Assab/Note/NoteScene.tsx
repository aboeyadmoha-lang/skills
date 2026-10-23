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
const PAPER_GROWN = 820;
// Strokes write on as the voiceover speaks; the last two only exist once
// the note has grown, because follow-up does not stop at the writing.
const STROKES = [
  { y: 1110, w: 380, at: T3.note.strokes[0] },
  { y: 1190, w: 320, at: T3.note.strokes[1] },
  { y: 1270, w: 360, at: T3.note.strokes[2] },
  { y: 1350, w: 240, at: T3.note.strokes[3] },
  { y: 1460, w: 340, at: T3.note.strokes[4] },
  { y: 1540, w: 280, at: T3.note.strokes[5] },
] as const;
// The pushpin that holds the note up, at the top centre of the paper.
const PIN = { x: 540, y: PAPER.y + 34 };

// A pushpin in the identity purples, its head at (0, 0).
const Pushpin: React.FC = () => (
  <g>
    <path
      d="M4 8 L16 34"
      stroke="#8A84A8"
      strokeWidth={4}
      strokeLinecap="round"
    />
    <ellipse cx={0} cy={8} rx={30} ry={13} fill={BRAND_DARK} />
    <path d="M-17 -10 H17 V6 H-17 Z" fill={BRAND_PURPLE} />
    <ellipse cx={0} cy={-10} rx={25} ry={12} fill="#9B6BFF" />
    <ellipse cx={-8} cy={-13} rx={8} ry={3.5} fill="#FFFFFF" opacity={0.7} />
  </g>
);

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
  // Writing does not end the follow-up: the note grows and keeps going.
  const grow = interpolate(
    frame,
    [f(n.extend[0]), f(n.extend[0] + n.extend[1])],
    [0, 1],
    { ...clamp, easing: Easing.inOut(Easing.cubic) },
  );
  // The pin drops in and fixes the note as it appears; the paper gives a
  // small jolt on impact.
  const drop = interpolate(frame, [f(n.pin), f(n.pin) + 0.3 * fps], [0, 1], {
    ...clamp,
    easing: Easing.in(Easing.quad),
  });
  const impact = interpolate(
    frame,
    [f(n.pin) + 0.3 * fps, f(n.pin) + 0.4 * fps, f(n.pin) + 0.6 * fps],
    [0, 1, 0],
    clamp,
  );
  // On "ولا باقي؟" the pin pulses once: the note is still pinned up.
  const stillPinned = interpolate(
    frame,
    [f(n.pinPulse), f(n.pinPulse) + 0.9 * fps],
    [0, 1],
    { ...clamp, easing: Easing.out(Easing.cubic) },
  );

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
          transform={`translate(0 ${float + (1 - paperIn) * 60 + impact * 6}) rotate(${tilt} 540 1280)`}
        >
          <rect
            x={PAPER.x}
            y={PAPER.y}
            width={PAPER.w}
            height={PAPER.h + (PAPER_GROWN - PAPER.h) * grow}
            rx={12}
            fill="#FFFFFF"
            filter="url(#note-shadow)"
          />
          <rect
            x={PAPER.x + PAPER.w - 180}
            y={1040}
            width={120}
            height={14}
            rx={7}
            fill="#CFC6EE"
          />
          {STROKES.map((st, i) => {
            const right = PAPER.x + PAPER.w - 60;
            const p = interpolate(
              frame,
              [f(st.at[0]), f(st.at[0] + st.at[1])],
              [0, 1],
              {
                ...clamp,
                easing: Easing.inOut(Easing.quad),
              },
            );
            if (p === 0) return null;
            const hx = right - st.w * p;
            const hy = st.y + Math.sin((st.w * p) / 13 + i * 2.1) * 5;
            return (
              <g key={i}>
                <path
                  d={scribble(right, st.y, st.w, i * 2.1)}
                  stroke={INK}
                  strokeWidth={5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  opacity={0.75}
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1 - p}
                />
                {p < 1 ? (
                  <circle cx={hx} cy={hy} r={7} fill={BRAND_PURPLE} />
                ) : null}
              </g>
            );
          })}
          {/* Pin shadow on the paper, then the pin itself */}
          <ellipse
            cx={PIN.x + 20 + (1 - drop) * 40}
            cy={PIN.y + 32 + (1 - drop) * 30}
            rx={38 + (1 - drop) * 24}
            ry={15 + (1 - drop) * 10}
            fill={BRAND_DARK}
            opacity={0.22 * drop}
          />
          {stillPinned > 0 && stillPinned < 1 ? (
            <circle
              cx={PIN.x}
              cy={PIN.y}
              r={44 + stillPinned * 90}
              fill="none"
              stroke={BRAND_PURPLE}
              strokeWidth={4 - stillPinned * 3}
              opacity={1 - stillPinned}
            />
          ) : null}
          <g
            opacity={drop > 0 ? 1 : 0}
            transform={`translate(${PIN.x} ${PIN.y - (1 - drop) * 240 + impact * 3}) scale(${1.45 * (1 + (1 - drop) * 0.5 - impact * 0.06)} ${1.45 * (1 + (1 - drop) * 0.5 + impact * 0.04)})`}
          >
            <Pushpin />
          </g>
        </g>
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
      default: "انحلّـــت",
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
