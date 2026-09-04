import {
  concepts,
  domainMeta,
  type Concept,
  type Domain,
} from "../data/concepts";
import { depthOf } from "./prerequisiteGraph";

/**
 * The same curriculum the concept map draws, flattened into reading order:
 * chapters top to bottom, and inside each chapter the concepts you can start
 * cold first, the ones resting on everything else last.
 */

export interface Chapter {
  domain: Domain;
  label: string;
  color: string;
  concepts: Concept[];
}

const authoredIndex = new Map(concepts.map((c, i) => [c.id, i]));

/**
 * Chapters run in the order domainMeta declares them, which is an editorial
 * call about how the subject is taught — probability and linear algebra first,
 * the models that need both after. It deliberately isn't derived from the
 * graph: by prerequisite depth Machine Learning would open before Statistical
 * Inference, because plenty of ML concepts sit shallow while inference builds
 * a long chain, and that is not the book anyone wants to read.
 *
 * Within a chapter the graph does decide: longest prerequisite chain first,
 * ties broken by the order concepts.ts lists them, which keeps siblings in
 * their authored grouping instead of shuffling them by id.
 */
export const chapters: Chapter[] = (Object.keys(domainMeta) as Domain[]).map(
  (domain) => ({
    domain,
    label: domainMeta[domain].label,
    color: domainMeta[domain].color,
    concepts: concepts
      .filter((c) => c.domain === domain)
      .sort(
        (a, b) =>
          (depthOf.get(a.id) ?? 0) - (depthOf.get(b.id) ?? 0) ||
          (authoredIndex.get(a.id) ?? 0) - (authoredIndex.get(b.id) ?? 0),
      ),
  }),
);
