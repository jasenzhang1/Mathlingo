import type { WikiArticle } from "../types";

export const martingalesContinuousTimeWiki: WikiArticle = {
  conceptId: "martingales-continuous-time",
  summary:
    "A continuous-time martingale is a process whose best forecast of any future value, given " +
    "everything observable now, is exactly its current value — a fair game with no drift in either " +
    "direction. Brownian motion is the simplest example; $W_t^2 - t$ is a subtler one, and it is a " +
    "direct forward-pointer to quadratic variation, since the compensating $-t$ is precisely what makes " +
    "the extra randomness in $W_t^2$ fair.",

  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "M_t \\text{ adapted, integrable, and } E[M_t \\mid \\mathcal F_s] = M_s \\text{ for all } s < t",
          caption: "The continuous-time martingale property",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Adapted",
              description: "M_t must be F_t-measurable — it can only depend on information available by time t.",
            },
            {
              term: "Integrable",
              description: "$E[|M_t|] < \\infty$ for every t, so the conditional expectation is well-defined.",
            },
            {
              term: "$E[M_t \\mid \\mathcal F_s] = M_s$",
              description: "Conditioning on today's information, the expected value of any future observation is exactly today's value — no drift.",
            },
          ],
        },
        {
          kind: "prose",
          text:
            "This generalizes the discrete-time martingale property of the simple random walk, $E[S_{n+1} " +
            "\\mid S_1, \\ldots, S_n] = S_n$, verbatim: the index set is now the continuum $[0, \\infty)$ " +
            "rather than the integers, and the conditioning is on the filtration $\\mathcal F_s$ rather " +
            "than on the finite history $S_1, \\ldots, S_n$, but the content — 'the present value is the " +
            "best forecast of the future' — is identical.",
        },
      ],
    },

    {
      heading: "Brownian motion is a martingale",
      blocks: [
        {
          kind: "formula",
          latex: "E[W_t \\mid \\mathcal F_s] = E[W_t - W_s + W_s \\mid \\mathcal F_s] = E[W_t - W_s] + W_s = 0 + W_s = W_s",
          caption: "Uses independent increments (so $W_t - W_s$ is independent of $\\mathcal F_s$) and mean-zero increments",
        },
        {
          kind: "prose",
          text:
            "The derivation uses exactly the two structural properties from the previous article: $W_t - " +
            "W_s$ is independent of everything up to time $s$, so conditioning on $\\mathcal F_s$ leaves " +
            "its expectation unchanged at 0, and $W_s$ itself is $\\mathcal F_s$-measurable so it passes " +
            "straight through the conditional expectation.",
        },
      ],
    },

    {
      heading: "A less obvious example: W_t² − t",
      blocks: [
        {
          kind: "prose",
          text:
            "$W_t^2$ by itself is not a martingale — it has to grow on average, since it's a squared " +
            "quantity with increasing variance. Subtracting $t$ exactly compensates for that growth.",
        },
        {
          kind: "formula",
          latex:
            "E[W_t^2 - t \\mid \\mathcal F_s] = E[(W_t - W_s + W_s)^2 \\mid \\mathcal F_s] - t",
        },
        {
          kind: "prose",
          text:
            "Expand the square: $(W_t - W_s)^2 + 2 W_s (W_t - W_s) + W_s^2$. Conditioning on " +
            "$\\mathcal F_s$, the middle term has expectation $2W_s \\cdot E[W_t - W_s] = 0$, the last term " +
            "is already $\\mathcal F_s$-measurable, and the first term has expectation $\\text{Var}(W_t - " +
            "W_s) = t - s$ (independent increments, mean zero). So the conditional expectation is " +
            "$(t - s) + W_s^2 - t = W_s^2 - s$ — exactly the value of the process at time $s$.",
        },
        {
          kind: "formula",
          latex: "E[W_t^2 - t \\mid \\mathcal F_s] = W_s^2 - s",
          caption: "W_t² − t is a martingale",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The −t is quadratic variation, showing up as a compensator",
          text:
            "That $-t$ is not an arbitrary correction — it is $[W,W]_t$, Brownian motion's quadratic " +
            "variation. $W_t^2$ accumulates extra randomness at exactly the rate quadratic variation " +
            "accumulates, and subtracting it off is precisely what cancels that drift and restores the " +
            "fair-game property. This is the first appearance of a pattern that recurs constantly in this " +
            "domain: a process built from Brownian motion picks up a deterministic drift equal to its " +
            "quadratic variation, and that drift is exactly what must be subtracted to recover a " +
            "martingale.",
        },
      ],
    },

    {
      heading: "Why this matters",
      blocks: [
        {
          kind: "list",
          items: [
            "The martingale property is what makes an Itô integral against an adapted integrand a martingale in turn — the entire theory of stochastic integration is built to preserve this property, not to break it.",
            "Girsanov's theorem is fundamentally a statement about changing the probability measure so that a process with drift becomes a martingale under the new measure.",
            "Risk-neutral pricing chooses a measure specifically so that the discounted asset price is a martingale — 'martingale under Q' is the technical content behind the informal phrase 'no arbitrage'.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Martingale does not mean constant, or even bounded",
          text:
            "A common misreading of $E[M_t \\mid \\mathcal F_s] = M_s$ is that $M_t$ 'doesn't really move'. " +
            "It moves plenty — $W_t$ itself wanders arbitrarily far from 0 — the property only constrains " +
            "the *conditional expectation* of future values, not their realized variability. A martingale " +
            "can have unbounded variance and even fail to converge to anything as $t \\to \\infty$.",
        },
      ],
    },
  ],

  references: [
    { source: "Shreve, Stochastic Calculus for Finance II", locator: "§3.3, Martingales" },
    { source: "Øksendal, Stochastic Differential Equations", locator: "Ch. 3, Itô Integrals — martingale properties" },
    { source: "Ross, Stochastic Processes", locator: "Ch. 6, Martingales" },
  ],
};
