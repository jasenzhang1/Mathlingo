import { createContext, useContext } from "react";
import type { Bundle } from "./types";

/**
 * How much of interview prep the current visitor gets, set by `InterviewGate`:
 * subscribers and developers get everything, signed-in users without the
 * subscription get the free bundles and free questions only.
 */
export const InterviewAccessContext = createContext<{ full: boolean }>({ full: false });

export function useInterviewAccess() {
  return useContext(InterviewAccessContext);
}

/** Free bundles are marked in `bundles.json` (or in the dev editor). */
export const isFreeBundle = (b: Bundle) => Boolean(b.free);
