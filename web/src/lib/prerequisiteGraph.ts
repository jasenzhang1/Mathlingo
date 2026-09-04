import { concepts } from "../data/concepts";

/**
 * The authored `prerequisites` arrays in concepts.ts are meant to be immediate
 * prerequisites, but nothing enforces that in the data. This module computes
 * the transitive reduction once — dropping any edge a -> c for which a path
 * a -> b -> ... -> c already exists — so both the concept map and the
 * per-concept "prerequisites / unlocks" lists stay sparse and consistent,
 * even if a future edit to concepts.ts accidentally adds a redundant edge.
 */

type Edge = readonly [string, string];

function buildAdjacency(nodeIds: string[], edges: Edge[]): Map<string, Set<string>> {
  const adj = new Map<string, Set<string>>();
  for (const id of nodeIds) adj.set(id, new Set());
  for (const [u, v] of edges) adj.get(u)?.add(v);
  return adj;
}

function computeReachability(
  nodeIds: string[],
  adj: Map<string, Set<string>>,
): Map<string, Set<string>> {
  const reach = new Map<string, Set<string>>();

  function visit(u: string): Set<string> {
    const cached = reach.get(u);
    if (cached) return cached;
    const result = new Set<string>();
    reach.set(u, result);
    for (const v of adj.get(u) ?? []) {
      result.add(v);
      for (const w of visit(v)) result.add(w);
    }
    return result;
  }

  for (const id of nodeIds) visit(id);
  return reach;
}

function transitiveReduction(nodeIds: string[], edges: Edge[]): Edge[] {
  const adj = buildAdjacency(nodeIds, edges);
  const reach = computeReachability(nodeIds, adj);

  return edges.filter(([u, v]) => {
    for (const w of adj.get(u) ?? []) {
      if (w !== v && reach.get(w)?.has(v)) return false;
    }
    return true;
  });
}

const allNodeIds = concepts.map((c) => c.id);
const rawEdges: Edge[] = concepts.flatMap((c) =>
  c.prerequisites.map((prereqId): Edge => [prereqId, c.id]),
);

/** The sparse set of edges (prerequisite -> concept) after transitive reduction. */
export const reducedEdges: Edge[] = transitiveReduction(allNodeIds, rawEdges);

export const prereqsOf = new Map<string, string[]>();
export const unlocksOf = new Map<string, string[]>();
for (const id of allNodeIds) {
  prereqsOf.set(id, []);
  unlocksOf.set(id, []);
}
for (const [u, v] of reducedEdges) {
  prereqsOf.get(v)!.push(u);
  unlocksOf.get(u)!.push(v);
}

const forwardAdj = buildAdjacency(allNodeIds, rawEdges);
const reverseAdj = buildAdjacency(
  allNodeIds,
  rawEdges.map(([u, v]): Edge => [v, u]),
);
const descendantReach = computeReachability(allNodeIds, forwardAdj);
const ancestorReach = computeReachability(allNodeIds, reverseAdj);

/**
 * How many earlier concepts (transitively) feed into this one. Used to size
 * "bottleneck" nodes in the map — a topic like Eigenvalues and Eigenvectors
 * that quietly depends on a dozen earlier ideas should read as a hub, not a
 * dot the same size as a root concept.
 */
export const ancestorCountOf = new Map<string, number>(
  allNodeIds.map((id) => [id, ancestorReach.get(id)?.size ?? 0]),
);

/**
 * Every concept transitively upstream of each concept.
 *
 * This is what `prereqClosure` is validated against: an item for concept C may
 * only draw on C and C's ancestors, otherwise it is quietly testing material the
 * learner has not reached yet — and the resulting failure gets blamed on C.
 */
export const ancestorsOf = ancestorReach;

export const descendantCountOf = new Map<string, number>(
  allNodeIds.map((id) => [id, descendantReach.get(id)?.size ?? 0]),
);
