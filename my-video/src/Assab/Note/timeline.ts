// Video 3 cues in global seconds, aligned to the voiceover. Each line of
// the recording is cut out and placed so its text writes on as it is said.
export const T3 = {
  noteStart: 0,
  brandStart: 10.6,
  endStart: 16.4,
  lockupStart: 21.2,
  end: 25.7,
  note: {
    mark: 0.3,
    pin: 0.35,
    context: [0.6, 1.18],
    question: [2.3, 0.72],
    swap: 3.9,
    solved: [4.2, 0.57],
    pending: [5.1, 0.56],
    pinPulse: 5.5,
    calm: 6.4,
    writing: [6.8, 1.08],
    notEnd: [8.1, 1.06],
    strokes: [
      [0.6, 0.6],
      [1.2, 0.58],
      [2.3, 0.72],
      [6.8, 1.08],
      [8.75, 0.85],
      [9.65, 0.9],
    ],
    extend: [8.1, 0.8],
  },
  brand: { mark: 11.1, title: [11.7, 0.46], line: [12.6, 2.6] },
  endCard: {
    mark: 16.6,
    cta: [16.9, 0.58],
    status: [17.6, 0.5],
    pulse: 18.6,
    site: 19.3,
  },
} as const;

// Voiceover clips: where each one plays, and where it sits in the recording.
export const VO_3 = [
  { name: "ملاحظة في مطعمك", at: 0.6, from: 0.35, dur: 1.18 },
  { name: "وش صار عليها", at: 2.3, from: 1.98, dur: 0.72 },
  { name: "انحلت", at: 4.2, from: 3.2, dur: 0.57 },
  { name: "ولا باقي", at: 5.1, from: 4.13, dur: 0.56 },
  { name: "كتابة الملاحظة", at: 6.8, from: 5.47, dur: 1.08 },
  { name: "مو نهاية المتابعة", at: 8.1, from: 6.91, dur: 1.06 },
  { name: "وعصب", at: 11.7, from: 8.66, dur: 0.46 },
  { name: "جاي يساعدك تتابع تشغيل مطعمك", at: 12.4, from: 9.51, dur: 2.04 },
  { name: "بصورة أوضح", at: 14.65, from: 11.87, dur: 0.7 },
  { name: "تابعونا", at: 16.9, from: 13.21, dur: 0.58 },
  { name: "وخلكم معنا من البداية", at: 17.8, from: 14.15, dur: 1.29 },
] as const;

export const VO_SPANS_3: readonly (readonly [number, number])[] = VO_3.map(
  (c) => [c.at, c.at + c.dur] as const,
);
