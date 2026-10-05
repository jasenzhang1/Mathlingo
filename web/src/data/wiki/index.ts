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
 * `linear-algebra` sat on disk unwired until 2026-10-03, when its 55 articles
 * (one per lesson) were reviewed, checked to render, and brought up to the
 * formatting standard (bold vectors and matrices, square brackets, curly
 * quotes) before being landed on purpose. `probability` was in the same state
 * earlier — its articles existed on disk but were never wired in, which left
 * the Set Theory lesson's wiki tab permanently on "coming soon".
 */
const loaders: Partial<Record<Domain, () => Promise<WikiArticle[]>>> = {
  "discrete-math": () => import("./discrete-math").then((m) => m.default),
  "linear-algebra": () => import("./linear-algebra").then((m) => m.default),
  statistics: () => import("./core").then((m) => m.coreWikiArticles),
  "multivariate-probability": () =>
    Promise.all([import("./core"), import("./copulas")]).then(([core, cop]) => [
      ...core.coreWikiArticles,
      ...cop.copulaWikis,
    ]),
  // KL divergence moved into this chapter but its article stayed in `./core`.
  "information-theory": () =>
    Promise.all([import("./information-theory"), import("./core")]).then(([it, core]) => [
      ...it.informationTheoryWikis,
      ...core.coreWikiArticles,
    ]),
  "graphical-models": () => import("./core").then((m) => m.coreWikiArticles),
  // Bayesian Statistics gathered lessons from three chapters, so its articles
  // are spread across `./core` (graphical models), `./regression` (Bayesian
  // linear regression, model averaging) and `./ml` (GP regression and
  // classification), plus the new foundations in `./bayesian`.
  "bayesian-statistics": () =>
    Promise.all([import("./bayesian"), import("./core"), import("./regression"), import("./ml")]).then(
      ([bayes, core, reg, ml]) => [
        ...bayes.bayesianWikis,
        ...core.coreWikiArticles,
        ...reg.regressionWikis,
        ...ml.mlWikiArticles,
      ],
    ),
  probability: () => import("./probability").then((m) => m.default),
  regression: () => import("./regression").then((m) => m.regressionWikis),
  "time-series": () => import("./time-series").then((m) => m.timeSeriesWikis),
  "machine-learning": () => import("./ml").then((m) => m.mlWikiArticles),
  // Deep learning concepts were split out of `machine-learning` (most articles
  // live in `./ml`) and one, `variational-inference-vaes`, out of
  // `graphical-models` (its article lives in `./core`). Load both chunks.
  "deep-learning": () =>
    Promise.all([import("./ml"), import("./core")]).then(([ml, core]) => [
      ...ml.mlWikiArticles,
      ...core.coreWikiArticles,
    ]),
  python: () => import("./python").then((m) => m.pythonWikiArticles),
  "stochastic-processes": () => import("./stochastic").then((m) => m.stochasticWikiArticles),
  "stochastic-calculus": () => import("./stochastic").then((m) => m.stochasticWikiArticles),
  // Functional Data Analysis was a section of graphical-models (articles in
  // `./core`) plus Karhunen–Loève from stochastic processes (`./stochastic`);
  // the operator, smoothing and score lessons are in `./functional-data`.
  "functional-data": () =>
    Promise.all([import("./functional-data"), import("./core"), import("./stochastic")]).then(
      ([fda, core, sp]) => [...fda.functionalDataWikis, ...core.coreWikiArticles, ...sp.stochasticWikiArticles],
    ),
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
