// Video 2 cues in global seconds, aligned to the voiceover. Each line of
// the recording is cut out and placed so its text writes on as it is said.
export const T2 = {
  dayStart: 0,
  reviewStart: 4.6,
  brandStart: 12.6,
  endStart: 17.2,
  lockupStart: 21.6,
  end: 26.1,
  day: {
    mark: 0.3,
    title: [0.5, 0.8],
    income: [1.95, 0.6],
    spend: [3.4, 0.55],
    end: 5.0,
  },
  review: {
    title: [5.2, 1.2],
    cards: [5.7, 6.3, 6.9],
    settle: 8.4,
    understand: [9.75, 0.75],
    sub: [10.9, 0.8],
  },
  brand: { mark: 13.0, title: [13.4, 0.35], line: [14.1, 2.1] },
  endCard: {
    mark: 17.5,
    cta: [17.6, 0.5],
    status: [18.3, 0.4],
    start: [19.0, 0.9],
    site: 20.3,
  },
} as const;

// Voiceover clips: where each one plays, and where it sits in the recording.
export const VO_2 = [
  { name: "آخر اليوم", at: 0.5, from: 0.08, dur: 0.86 },
  { name: "تعرف وش دخل", at: 1.9, from: 1.32, dur: 0.98 },
  { name: "ووش طلع", at: 3.4, from: 2.47, dur: 0.59 },
  { name: "ووش باقي يحتاج مراجعة", at: 5.2, from: 3.41, dur: 1.47 },
  { name: "صاحب المطعم يحتاج يفهم يومه", at: 8.6, from: 5.31, dur: 1.92 },
  { name: "مو بس يخلصه", at: 10.9, from: 7.5, dur: 0.87 },
  { name: "عصب", at: 13.4, from: 8.87, dur: 0.32 },
  { name: "لمتابعة تشغيل المطاعم وأرقامها", at: 14.1, from: 9.63, dur: 2.18 },
  { name: "قريبا", at: 18.3, from: 12.21, dur: 0.39 },
  { name: "والبداية من الرياض", at: 19.0, from: 12.93, dur: 0.95 },
] as const;

export const VO_SPANS_2: readonly (readonly [number, number])[] = VO_2.map(
  (c) => [c.at, c.at + c.dur] as const,
);
