import {
  concepts,
  domainMeta,
  type Concept,
  type Domain,
} from "../data/concepts";
import { sectionSpecs } from "../data/sections";
import { depthOf } from "./prerequisiteGraph";

/**
 * The same curriculum the concept map draws, flattened into reading order:
 * chapters top to bottom, each chapter split into the sections `data/sections.ts`
 * declares, and inside a section the concepts you can start cold first, the ones
 * resting on everything else last.
 */

export interface Section {
  id: string;
  label: string;
  concepts: Concept[];
}

export interface Chapter {
  domain: Domain;
  label: string;
  color: string;
  sections: Section[];
  /** Every concept in the chapter, in the order the sections read. */
  concepts: Concept[];
}

const authoredIndex = new Map(concepts.map((c, i) => [c.id, i]));

/**
 * Longest prerequisite chain first, ties broken by the order concepts.ts lists
 * them, which keeps siblings in their authored grouping instead of shuffling
 * them by id.
 */
function inLearningOrder(list: Concept[]): Concept[] {
  return [...list].sort(
    (a, b) =>
      (depthOf.get(a.id) ?? 0) - (depthOf.get(b.id) ?? 0) ||
      (authoredIndex.get(a.id) ?? 0) - (authoredIndex.get(b.id) ?? 0),
  );
}

/**
 * Chapters run in the order domainMeta declares them, which is an editorial
 * call about how the subject is taught — probability and linear algebra first,
 * the models that need both after. It deliberately isn't derived from the
 * graph: by prerequisite depth Machine Learning would open before Statistical
 * Inference, because plenty of ML concepts sit shallow while inference builds
 * a long chain, and that is not the book anyone wants to read.
 *
 * Sections run in the order data/sections.ts declares them, for the same
 * reason. A concept no section claims still has to appear somewhere, so it
 * lands in a trailing "Further Topics" section rather than vanishing from the
 * list the moment someone adds it to the graph.
 */
export const chapters: Chapter[] = (Object.keys(domainMeta) as Domain[]).map(
  (domain) => {
    const inDomain = concepts.filter((c) => c.domain === domain);
    const byId = new Map(inDomain.map((c) => [c.id, c]));
    const claimed = new Set<string>();

    const sections: Section[] = (sectionSpecs[domain] ?? [])
      .map((spec) => {
        const members = spec.conceptIds
          // A spec can name a concept that hasn't been written yet, or one that
          // has since moved domain. Skip it rather than render a hole.
          .map((id) => byId.get(id))
          .filter((c): c is Concept => c !== undefined);

        for (const concept of members) claimed.add(concept.id);

        return {
          id: spec.id,
          label: spec.label,
          concepts: inLearningOrder(members),
        };
      })
      .filter((section) => section.concepts.length > 0);

    const unclaimed = inDomain.filter((c) => !claimed.has(c.id));
    if (unclaimed.length > 0) {
      sections.push({
        id: "further-topics",
        label: "Further Topics",
        concepts: inLearningOrder(unclaimed),
      });
    }

    return {
      domain,
      label: domainMeta[domain].label,
      color: domainMeta[domain].color,
      sections,
      concepts: sections.flatMap((section) => section.concepts),
    };
  },
);
