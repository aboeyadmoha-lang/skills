// Every cue in global seconds, matched to where each voiceover phrase is
// spoken. [start, duration] pairs drive the write-on of each text line.
export const T = {
  mapStart: 3.8,
  outroStart: 26.0,
  lockupStart: 29.6,
  end: 34.1,
  intro: { logo: 0.2, audience: [0.37, 1.55], title: [2.53, 1.05] },
  platform: { title: [4.6, 1.5], accent: [6.2, 1.7], end: 9.0 },
  riyadh: {
    tag: 9.2,
    title: [9.39, 0.42],
    accent: [9.8, 0.56],
    dot: 9.4,
    fill: 9.9,
    pin: 10.5,
    end: 12.1,
  },
  next: {
    title: [12.5, 0.9],
    accent: [13.7, 1.9],
    westPoint: 14.2,
    eastPoint: 14.95,
    end: 19.1,
  },
  later: { title: [19.51, 0.85], accent: [20.65, 1.6], sweep: 20.6, end: 26.4 },
  outro: { cta: [26.41, 0.5], status: [27.17, 0.6], site: 28.0 },
} as const;

// Where the voiceover is speaking, for ducking the background bed.
export const VO_SPANS: readonly (readonly [number, number])[] = [
  [0.37, 3.6],
  [4.6, 8.32],
  [9.39, 10.36],
  [12.5, 15.59],
  [19.51, 22.99],
  [26.41, 28.45],
];
