// Video 3 cues in global seconds. Placeholder timings from the script;
// they are re-aligned to the voiceover once the recording is in.
export const T3 = {
  noteStart: 0,
  brandStart: 13.0,
  endStart: 19.8,
  lockupStart: 26.0,
  end: 30.5,
  note: {
    mark: 0.3,
    context: [0.6, 1.3],
    question: [2.2, 1.0],
    swap: 4.0,
    solved: [4.3, 0.6],
    pending: [5.8, 0.7],
    calm: 8.0,
    writing: [8.4, 0.9],
    notEnd: [9.6, 1.1],
    trail: [10.2, 2.2],
  },
  brand: { mark: 13.6, title: [14.2, 0.5], line: [15.0, 1.6] },
  endCard: {
    mark: 20.1,
    cta: [20.6, 0.6],
    status: [21.6, 0.5],
    pulse: 22.2,
    site: 22.8,
  },
} as const;

export const VO_SPANS_3: readonly (readonly [number, number])[] = [
  [0.5, 3.6],
  [4.2, 6.6],
  [8.3, 11.0],
  [13.4, 17.5],
  [20.5, 23.0],
];
