/** Placeholder monthly series for the usage trend chart (Figma: Oct–Apr). */
export const USAGE_TREND_MONTHLY = [
  { month: "Oct", api: 30000, errors: 105 },
  { month: "Nov", api: 28500, errors: 118 },
  { month: "Dec", api: 26500, errors: 132 },
  { month: "Jan", api: 32000, errors: 155 },
  { month: "Feb", api: 38000, errors: 188 },
  { month: "Mar", api: 44000, errors: 215 },
  { month: "Apr", api: 50000, errors: 247 },
];

const APR_LABELS = [
  "Apr 1",
  "Apr 2",
  "Apr 3",
  "Apr 4",
  "Apr 5",
  "Apr 6",
  "Apr 7",
  "Apr 8",
  "Apr 9",
  "Apr 10",
  "Apr 11",
  "Apr 12",
  "Apr 13",
  "Apr 14",
];

/** Daily view: placeholder last-two-weeks shape. */
export const USAGE_TREND_DAILY = APR_LABELS.map((month, i) => ({
  month,
  api: 1200 + i * 180 + (i % 3) * 50,
  errors: 4 + Math.floor(i / 2),
}));
