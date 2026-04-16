/** Instagram handle without @ — drives the footer byline on every slide. */
export const IG_HANDLE = "realalexhale";

/** Brand wordmark — always-on top-left on every slide. */
export const BRAND_NAME = "PRETTYFLY";

export const FOOTER_LABEL = `@${IG_HANDLE} · opus 4.7 playbook`;

/** Accent palette — one per slide for rhythm across the carousel. */
export const ACCENTS = {
  cyan: "#22D3EE",
  amber: "#F59E0B",
  lime: "#A3E635",
  rose: "#F43F5E",
  violet: "#A78BFA",
} as const;

export type AccentKey = keyof typeof ACCENTS;
