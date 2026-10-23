// Video 2 cues in global seconds. Placeholder timings from the script;
// they are re-aligned to the voiceover once the recording is in.
export const T2 = {
  dayStart: 0,
  reviewStart: 4.8,
  brandStart: 14.8,
  endStart: 21.8,
  lockupStart: 28.0,
  end: 32.5,
  day: {
    mark: 0.3,
    title: [0.4, 1.0],
    income: [2.0, 0.6],
    spend: [3.2, 0.6],
    end: 5.2,
  },
  review: {
    title: [5.5, 1.1],
    cards: [5.9, 6.5, 7.1],
    settle: 10.0,
    understand: [10.6, 1.0],
    sub: [11.9, 1.0],
  },
  brand: { mark: 15.3, title: [15.6, 0.6], line: [16.4, 2.0] },
  endCard: {
    mark: 22.1,
    cta: [22.4, 0.6],
    status: [23.3, 0.5],
    start: [24.0, 1.0],
    site: 25.4,
  },
} as const;

export const VO_SPANS_2: readonly (readonly [number, number])[] = [
  [0.3, 4.5],
  [5.3, 7.5],
  [10.3, 13.8],
  [15.4, 19.5],
  [22.3, 25.0],
];
