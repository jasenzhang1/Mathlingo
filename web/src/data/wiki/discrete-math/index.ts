import type { WikiArticle } from "../types";

/**
 * Every discrete-math article, in one chunk.
 *
 * Loaded on demand by ../index.ts when a learner opens a discrete-math lesson,
 * so no other domain's articles are fetched. Add new articles here.
 *
 * `setTheory`, `countingMethods`, and `binomialTheorem` moved here from
 * `../probability/` when the three concepts moved domains in `concepts.ts` (see
 * `concepts.md`'s note on the discrete-math sweep) — the articles themselves
 * were written for this content already and needed no rewrite.
 */
import { binomialTheorem } from "./binomial-theorem";
import { countingMethods } from "./counting-methods";
import { setTheory } from "./set-theory";

const articles: WikiArticle[] = [binomialTheorem, countingMethods, setTheory];

export default articles;
