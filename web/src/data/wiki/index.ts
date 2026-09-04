import { conceptById, type Domain } from "../concepts";
import type { WikiArticle } from "./types";

/**
 * Wiki articles, loaded one domain at a time.
 *
 * There is roughly one article per concept and they are text-heavy, so a single
 * bundle would mean a reader opening one linear algebra lesson downloading every
 * article in probability, machine learning, and the rest. Splitting by domain
 * keeps each fetch proportional to what is being read, and matches how learners
 * move — within a domain, rarely across.
 *
 * Adding an article means adding it to its domain's barrel file. This module
 * does not change.
 */

type ArticleModule = { default: WikiArticle[] };

const loaders: Partial<Record<Domain, () => Promise<ArticleModule>>> = {
  probability: () => import("./probability/index"),
  "linear-algebra": () => import("./linear-algebra/index"),
};

/** Domain -> its articles. Cached so a domain is fetched at most once. */
const cache = new Map<Domain, Promise<Map<string, WikiArticle>>>();

function loadDomain(domain: Domain): Promise<Map<string, WikiArticle>> {
  const existing = cache.get(domain);
  if (existing) return existing;

  const loader = loaders[domain];
  const promise: Promise<Map<string, WikiArticle>> = loader
    ? loader().then((module) => new Map(module.default.map((a) => [a.conceptId, a])))
    : Promise.resolve(new Map());

  cache.set(domain, promise);
  return promise;
}

/**
 * The article for a concept, or undefined if none is written yet.
 *
 * The concept's domain is resolved first, so only that domain's chunk is
 * fetched — a lesson never pulls in an article set it cannot display.
 */
export async function loadArticle(conceptId: string): Promise<WikiArticle | undefined> {
  const concept = conceptById.get(conceptId);
  if (!concept) return undefined;
  const articles = await loadDomain(concept.domain);
  return articles.get(conceptId);
}

/** Every article, for tooling that audits the whole set. Not used by the app. */
export async function loadAllArticles(): Promise<Map<string, WikiArticle>> {
  const all = new Map<string, WikiArticle>();
  for (const domain of Object.keys(loaders) as Domain[]) {
    for (const [id, article] of await loadDomain(domain)) all.set(id, article);
  }
  return all;
}

export type { WikiArticle } from "./types";
