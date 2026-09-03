import { bernoulliBinomialWiki } from "./bernoulli-binomial";
import type { WikiArticle } from "./types";

/**
 * Concept id -> wiki article. Lessons without an article yet fall through to a
 * "coming soon" state, the same way `embedUrl` does for slides.
 */
export const wikiByConcept = new Map<string, WikiArticle>([
  [bernoulliBinomialWiki.conceptId, bernoulliBinomialWiki],
]);

export type { WikiArticle } from "./types";
