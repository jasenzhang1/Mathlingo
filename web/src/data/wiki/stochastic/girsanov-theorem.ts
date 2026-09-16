import type { WikiArticle } from "../types";

export const girsanovTheoremWiki: WikiArticle = {
  conceptId: "girsanov-theorem",
  summary:
    "Girsanov's theorem says a drift can be entirely removed (or added) by changing the probability " +
    "measure, while leaving the process's volatility completely untouched. The change of measure is " +
    "carried out with an exponential Radon-Nikodym derivative $Z_t$, and under the new measure the same " +
    "path that looked like Brownian motion plus drift now looks like a plain, driftless Brownian motion. " +
    "This single fact is the engine behind risk-neutral pricing.",

  sections: [
    {
      heading: "The change-of-measure density",
      blocks: [
        {
          kind: "formula",
          latex:
            "Z_t = \\exp\\left(-\\int_0^t \\theta_s\\, dW_s - \\tfrac{1}{2}\\int_0^t \\theta_s^2\\, ds\\right)",
          caption: "Z_t is the Radon-Nikodym derivative dQ/dP restricted to F_t",
        },
        {
          kind: "prose",
          text:
            "$\\theta_s$ is an adapted process (the 'market price of risk' in the finance application " +
            "below). $Z_t$ is itself an Itô process — applying Itô's lemma to the exponent shows " +
            "$dZ_t = -\\theta_t Z_t\\, dW_t$, so $Z_t$ is a martingale under $P$ provided a technical " +
            "integrability condition, Novikov's condition ($E\\left[\\exp\\left(\\tfrac12 \\int_0^T " +
            "\\theta_s^2\\, ds\\right)\\right] < \\infty$), holds. That condition is what guarantees $Z_t$ " +
            "is a *true* martingale rather than merely a local one — without it, $E[Z_T]$ could be less " +
            "than 1 and $Q$ would fail to be a genuine probability measure.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "$Q$",
              description: "The new probability measure, defined by $dQ = Z_T\\, dP$ on $\\mathcal F_T$ — assigning probability $E^P[Z_T \\mathbf 1_A]$ to any event A.",
            },
            {
              term: "Equivalent measures",
              description: "Q and P agree on which events have probability zero (since Z_t > 0 always) even though they disagree on the probabilities themselves.",
            },
          ],
        },
      ],
    },

    {
      heading: "The theorem",
      blocks: [
        {
          kind: "formula",
          latex: "\\tilde W_t = W_t + \\int_0^t \\theta_s\\, ds \\quad \\text{is a Brownian motion under } Q",
          caption: "Girsanov's theorem: adding back the drift ∫θ ds exactly cancels the measure change",
        },
        {
          kind: "prose",
          text:
            "Under the original measure $P$, $W_t$ is a standard Brownian motion. Under the new measure " +
            "$Q$ built from $Z_t$, $W_t$ itself is no longer driftless — it behaves like Brownian motion " +
            "with drift $-\\theta_t$. But the shifted process $\\tilde W_t = W_t + \\int_0^t \\theta_s\\, " +
            "ds$ exactly undoes that drift and turns out to satisfy all four defining properties of " +
            "Brownian motion under $Q$: it starts at 0, has independent increments, has continuous paths, " +
            "and $\\tilde W_t - \\tilde W_s \\sim N(0, t-s)$ under $Q$.",
        },
      ],
    },

    {
      heading: "What changes and what doesn't",
      blocks: [
        {
          kind: "callout",
          tone: "insight",
          title: "You can cancel drift by a measure change — but never volatility",
          text:
            "This is the single most important thing to take from Girsanov's theorem, and the most " +
            "commonly misunderstood: a change of measure can shift a process's drift to essentially " +
            "anything, but the quadratic variation — and hence the volatility $\\sigma$ — is completely " +
            "invariant under any equivalent change of measure. $\\tilde W_t$ still has quadratic variation " +
            "$t$ under $Q$, identical to $W_t$'s under $P$. Drift is a statement about the mean of the " +
            "process, which a reweighting of probabilities can move freely; quadratic variation is a " +
            "pathwise, almost-sure property of the sample paths themselves, and no relabeling of " +
            "probabilities can touch it.",
        },
        {
          kind: "table",
          headers: ["Quantity", "Changes under a Girsanov measure change?", "Why"],
          rows: [
            ["Drift", "Yes — can be shifted to any adapted $\\theta_t$", "It's a statement about expectations, which the reweighting Z_t directly controls"],
            ["Volatility σ / quadratic variation", "No — invariant", "A pathwise property of the sample path, unaffected by which probabilities are attached to which paths"],
          ],
        },
      ],
    },

    {
      heading: "Why this matters",
      blocks: [
        {
          kind: "list",
          items: [
            "Risk-neutral pricing chooses θ = (μ − r)/σ specifically so that Girsanov's theorem removes the excess drift μ − r from a discounted stock, making it a martingale under the new measure Q.",
            "It is the standard tool for computing expectations that would otherwise require solving a PDE — shift the measure to make the computation trivial, then shift back with the Radon-Nikodym derivative.",
            "The martingale representation theorem, combined with Girsanov, is what proves market completeness rigorously: together they guarantee both that a risk-neutral measure exists and that every payoff can be replicated under it.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Shreve, Stochastic Calculus for Finance II", locator: "§5.2-5.3, Girsanov's Theorem" },
    { source: "Øksendal, Stochastic Differential Equations", locator: "Ch. 8, Girsanov's Theorem" },
  ],
};
