import { createContext, useContext } from "react";

/**
 * How much of interview prep the current visitor gets, set by `InterviewGate`:
 * subscribers and developers get everything, signed-in users without the
 * subscription get the first problems of the list only (no mock interviews,
 * no training).
 */
export const InterviewAccessContext = createContext<{ full: boolean }>({ full: false });

export function useInterviewAccess() {
  return useContext(InterviewAccessContext);
}
