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
 */
export function useProficiency(): {
  proficiency: Map<string, number>;
  loading: boolean;
} {
  const { user, loading: authLoading } = useAuth();
  const [proficiency, setProficiency] = useState<Map<string, number>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (authLoading) return;
      if (!user) {
        setProficiency(new Map());
        setLoading(false);
        return;
      }

      const states = await loadAllConceptStates(user.id);
      if (cancelled) return;

      const now = Date.now();
      setProficiency(
        new Map(
          states.map((state) => [state.conceptId, expFor(state, now).value]),
        ),
      );
      setLoading(false);
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  return { proficiency, loading };
}
