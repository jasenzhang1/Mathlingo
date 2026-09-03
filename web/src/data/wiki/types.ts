/**
 * Wiki articles are structured data rather than free-form markup so that all
 * 236 lessons render consistently and can be authored without touching React.
 * Math is written in unicode (σ², Σ, √) — good enough for the notation density
 * of this curriculum, and avoids pulling in a LaTeX renderer for now.
 */

export type WikiBlock =
  | { kind: "prose"; text: string }
  /** A centered, monospaced display formula with an optional caption. */
  | { kind: "formula"; latex: string; caption?: string }
  /** Definition-list rows, e.g. parameter meanings. */
  | { kind: "definitions"; items: { term: string; description: string }[] }
  /** A worked example: statement, then steps, then the answer. */
  | { kind: "example"; title: string; problem: string; steps: string[]; answer: string }
  /** A callout for pitfalls, intuitions, or warnings. */
  | { kind: "callout"; tone: "insight" | "warning"; title: string; text: string }
  | { kind: "table"; headers: string[]; rows: string[][]; caption?: string }
  | { kind: "list"; ordered?: boolean; items: string[] };

export interface WikiSection {
  heading: string;
  blocks: WikiBlock[];
}

export interface WikiArticle {
  conceptId: string;
  /** One-paragraph orientation shown above the first section. */
  summary: string;
  sections: WikiSection[];
  /** Textbook chapters this article draws on, shown as a references list. */
  references: { source: string; locator: string }[];
}
