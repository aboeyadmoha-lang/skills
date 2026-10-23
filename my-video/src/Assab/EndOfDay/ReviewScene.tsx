import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AssabMark } from "../AssabMark";
import { Backdrop } from "../Backdrop";
import { BRAND_DARK, BRAND_PURPLE, DISPLAY, TEXT } from "../theme";
import { WriteOn } from "../WriteOn";
import { EditorialCard } from "./EditorialCard";
import { BoxIcon, DocumentIcon, TransferIcon } from "./Icons";
import { T2 } from "./timeline";

const local = (s: number) => s - T2.reviewStart;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Loose, floating positions while items wait, and the calm column they
// settle into once the day is understood.
const CARDS = [
  { icon: TransferIcon, loose: { x: -70, y: 0, r: -4 }, still: { y: 0 } },
  { icon: DocumentIcon, loose: { x: 60, y: 250, r: 3 }, still: { y: 230 } },
  { icon: BoxIcon, loose: { x: -30, y: 500, r: -2 }, still: { y: 460 } },
] as const;

const ReviewSceneInner = ({
  title,
  understand,
  sub,
  cash,
  expenses,
  purchases,
  status,
}: {
  readonly title: string;
  readonly understand: string;
  readonly sub: string;
  readonly cash: string;
  readonly expenses: string;
  readonly purchases: string;
  readonly status: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = T2.review;
  const f = (s: number) => local(s) * fps;
  const settle = interpolate(
    frame,
    [f(r.settle), f(r.settle) + 1.2 * fps],
    [0, 1],
    {
      ...clamp,
      easing: Easing.inOut(Easing.cubic),
    },
  );
  const swap = interpolate(
    frame,
    [f(r.settle), f(r.settle) + 0.35 * fps],
    [1, 0],
    clamp,
  );
  const labels = [cash, expenses, purchases];

  return (
    <>
      <Backdrop />
      <div style={{ position: "absolute", top: 110, left: 80 }}>
        <AssabMark height={60} variant="color" />
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
          fontSize: 120,
          lineHeight: 1.2,
          color: BRAND_DARK,
        }}
      >
        <Interactive.Div name="Review" style={{ opacity: swap }}>
          <WriteOn text={title} at={local(r.title[0])} dur={r.title[1]} />
        </Interactive.Div>
        <Interactive.Div
          name="Understand"
          style={{ position: "absolute", top: 0, right: 0 }}
        >
          <WriteOn
            text={understand}
            at={local(r.understand[0])}
            dur={r.understand[1]}
            style={{ color: BRAND_PURPLE }}
          />
          <div
            style={{
              fontFamily: TEXT,
              fontWeight: 500,
              fontSize: 60,
              marginTop: 6,
            }}
          >
            <WriteOn text={sub} at={local(r.sub[0])} dur={r.sub[1]} />
          </div>
        </Interactive.Div>
      </div>

      {/* Items for review, floating, then settling into a calm column */}
      <div
        style={{
          position: "absolute",
          top: 820,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          scale: interpolate(settle, [0, 1], [1, 0.92]),
          transformOrigin: "50% 0%",
        }}
      >
        {CARDS.map((c, i) => {
          const at = r.cards[i];
          const enter = interpolate(
            frame,
            [f(at), f(at) + 0.45 * fps],
            [0, 1],
            {
              ...clamp,
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          );
          const bob = Math.sin(frame / 18 + i * 1.7) * 10 * (1 - settle);
          const x = c.loose.x * (1 - settle);
          const y =
            c.loose.y +
            (c.still.y - c.loose.y) * settle +
            bob +
            (1 - enter) * 60;
          const Icon = c.icon;
          return (
            <EditorialCard
              key={i}
              icon={<Icon size={64} />}
              label={labels[i]}
              status={status}
              width={820}
              fontSize={58}
              style={{
                position: "absolute",
                opacity: enter,
                translate: `${x}px ${y}px`,
                rotate: `${c.loose.r * (1 - settle)}deg`,
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export const ReviewScene = Interactive.create({
  Component: ReviewSceneInner,
  layout: "absolute-fill",
  schema: {
    title: {
      type: "string",
      default: "بنـــود للمراجعـــة",
      description: "Review title",
    },
    understand: {
      type: "string",
      default: "افهـــم يومـــك",
      description: "Focus title",
    },
    sub: {
      type: "string",
      default: "مو بس تخلّصـــه",
      description: "Focus line",
    },
    cash: {
      type: "string",
      default: "تسليـــم النقـــد",
      description: "Card 1",
    },
    expenses: {
      type: "string",
      default: "العهـــد والمصروفـــات",
      description: "Card 2",
    },
    purchases: {
      type: "string",
      default: "استـــلام المشتريـــات",
      description: "Card 3",
    },
    status: {
      type: "string",
      default: "بانتظار المراجعـــة",
      description: "Status",
    },
  },
});
