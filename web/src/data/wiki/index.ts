import { conceptById, type Domain } from "../concepts";
import type { WikiArticle } from "./types";

/**
 * Articles are loaded per domain, on demand.
 *
 * The wiki is by some margin the largest thing in this repository — several
 * hundred articles, most of them long. Importing them statically put every one
 * into the main bundle, so a visitor reading the landing page downloaded the
 * whole curriculum's prose before seeing anything. This is the same trade
 * `items.ts` makes for the question bank, for the same reason: a lesson page
 * needs exactly one article, and which one is not known until it is opened.
 *
 * The unit of loading is the domain rather than the article. Articles within a
 * domain are written as one argument and cross-reference each other constantly,
 * so a learner who opens one is very likely to open its neighbours — and one
 * chunk per article would trade a large bundle for a few hundred round trips.
 *
 * `linear-algebra` is deliberately absent below. It has an article module on
 * disk (`./linear-algebra`) that no version of this file has ever imported;
 * wiring it in would put ~35 unreviewed articles in front of learners as a
 * side effect of a refactor, so it stays unwired until someone lands it on
 * purpose. `probability` was in the same state — its ~55 articles, including
 * the one for `set-theory`, existed on disk but were never wired in, which
 * left the Set Theory lesson's wiki tab permanently on "coming soon" — and is
 * now wired below.
 */
const loaders: Partial<Record<Domain, () => Promise<WikiArticle[]>>> = {
  statistics: () => import("./core").then((m) => m.coreWikiArticles),
  "multivariate-probability": () => import("./core").then((m) => m.coreWikiArticles),
  "graphical-models": () => import("./core").then((m) => m.coreWikiArticles),
  probability: () => import("./probability").then((m) => m.default),
  regression: () => import("./regression").then((m) => m.regressionWikis),
  "machine-learning": () => import("./ml").then((m) => m.mlWikiArticles),
  python: () => import("./python").then((m) => m.pythonWikiArticles),
};

/** Domain -> its articles, indexed by concept id. Cached, so each chunk is fetched once. */
const cache = new Map<Domain, Promise<Map<string, WikiArticle>>>();

function loadDomain(domain: Domain): Promise<Map<string, WikiArticle>> {
  let pending = cache.get(domain);
  if (!pending) {
    const load = loaders[domain];
    pending = load
      ? load().then((articles) => new Map(articles.map((a) => [a.conceptId, a])))
      : Promise.resolve(new Map<string, WikiArticle>());
    cache.set(domain, pending);
  }
  return pending;
}

/**
 * The article for a concept, or undefined if none has been written yet —
 * lessons without one fall through to a "coming soon" state, the same way
 * `embedUrl` does for slides.
 */
export async function loadArticle(conceptId: string): Promise<WikiArticle | undefined> {
  const concept = conceptById.get(conceptId);
  if (!concept) return undefined;
  return (await loadDomain(concept.domain)).get(conceptId);
}

/**
 * Every article, in one map. This pulls every chunk, so it is for the tools
 * (`audit:coverage`, `verify:wiki`) rather than for anything a learner loads.
 */
export async function loadAllArticles(): Promise<Map<string, WikiArticle>> {
  const domains = Object.keys(loaders) as Domain[];
  const maps = await Promise.all(domains.map(loadDomain));
  return new Map(maps.flatMap((m) => [...m]));
}

export type { WikiArticle } from "./types";
