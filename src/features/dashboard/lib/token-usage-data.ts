/** Placeholder series for the token usage chart (billing cycle). */
export const TOKEN_USAGE_30D = [
  { day: "Apr 1", value: 1200 },
  { day: "Apr 3", value: 1800 },
  { day: "Apr 5", value: 2100 },
  { day: "Apr 7", value: 2600 },
  { day: "Apr 9", value: 2400 },
  { day: "Apr 11", value: 3200 },
  { day: "Apr 13", value: 3800 },
  { day: "Apr 15", value: 3500 },
  { day: "Apr 17", value: 4200 },
  { day: "Apr 19", value: 4800 },
  { day: "Apr 21", value: 5100 },
  { day: "Apr 23", value: 4900 },
  { day: "Apr 25", value: 5600 },
  { day: "Apr 27", value: 5300 },
  { day: "Apr 29", value: 5800 },
];

export const TOKEN_USAGE_7D = TOKEN_USAGE_30D.filter((_, i) => i % 2 === 0).slice(-7);
export const TOKEN_USAGE_90D = [
  { day: "W1", value: 2100 },
  { day: "W2", value: 2800 },
  { day: "W3", value: 3200 },
  { day: "W4", value: 3600 },
  { day: "W5", value: 4100 },
  { day: "W6", value: 4500 },
  { day: "W7", value: 4900 },
  { day: "W8", value: 5200 },
  { day: "W9", value: 5100 },
  { day: "W10", value: 5400 },
  { day: "W11", value: 5600 },
  { day: "W12", value: 5800 },
];
