import { useEffect, useState } from "react";
import { expFor } from "./assessment/exp";
import { loadAllConceptStates } from "./assessment/persistence";
import { useAuth } from "./auth/useAuth";

/**
 * Current proficiency (0–100) for every concept this user has been assessed on,
 * the same number the concept page's proficiency bar shows.
 *
 * Concepts absent from the map have never been attempted, so callers read them
 * as 0 — which is exactly what a new learner sees everywhere, and what a signed
 * -out visitor sees for the whole graph.
 *
 * `dueAt` carries the timestamp each concept's bar drops below its target
 * retention — the same value the review queue sorts by — for concepts that
 * have been reviewed at least once. It's how callers turn a bar the learner
 * hasn't touched in a while into a countdown before it starts sliding.
 */
export function useProficiency(): {
  proficiency: Map<string, number>;
  dueAt: Map<string, number>;
  loading: boolean;
} {
  const { user, loading: authLoading } = useAuth();
  const [proficiency, setProficiency] = useState<Map<string, number>>(new Map());
  const [dueAt, setDueAt] = useState<Map<string, number>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (authLoading) return;
      if (!user) {
        setProficiency(new Map());
        setDueAt(new Map());
        setLoading(false);
        return;
      }

      const states = await loadAllConceptStates(user.id);
      if (cancelled) return;

      const now = Date.now();
      const proficiencyMap = new Map<string, number>();
      const dueAtMap = new Map<string, number>();
      for (const state of states) {
        const snapshot = expFor(state, now);
        proficiencyMap.set(state.conceptId, snapshot.value);
        if (snapshot.dueAt !== undefined) {
          dueAtMap.set(state.conceptId, snapshot.dueAt);
        }
      }
      setProficiency(proficiencyMap);
      setDueAt(dueAtMap);
      setLoading(false);
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  return { proficiency, dueAt, loading };
}
