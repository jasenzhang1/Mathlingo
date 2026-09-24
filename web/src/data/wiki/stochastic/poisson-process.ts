import type { WikiArticle } from "../types";

export const poissonProcessWiki: WikiArticle = {
  conceptId: "poisson-process",
  summary:
    "A Poisson process is the continuous-time model for events landing one at a time, at a constant " +
    "average rate, independently of each other — phone calls arriving, radioactive decays, claims hitting " +
    "an insurer. It is the bridge between two distributions already familiar on their own: the *count* of " +
    "events in a fixed window is Poisson, and the *gap* between consecutive events is Exponential. Neither " +
    "fact is a coincidence — each is forced by the other, and both are forced by the process having no " +
    "memory.",
  sections: [
    {
      heading: "Two equivalent definitions",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "**Counting definition.** N(t) counts events on [0, t]. N(0) = 0, increments over disjoint intervals are independent, and the count over any interval of length h is Poisson(λh).",
            "**Waiting-time definition.** Draw i.i.d. gaps T₁, T₂, … ~ Exponential(λ) and let the k-th event land at T₁ + ⋯ + Tₖ. N(t) is then just the number of arrival times that have occurred by t.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why the gaps have to be memoryless",
          text: "Independent increments means the process cannot remember how long it has already waited: the chance of an event in the next instant is λ dt regardless of how long since the last one. Exponential is the only continuous distribution with that memoryless property, which is why it and only it can be the gap distribution.",
        },
      ],
    },
    {
      heading: "The rate parameter",
      blocks: [
        {
          kind: "formula",
          latex: "P(N(t+h) - N(t) = k) = \\frac{e^{-\\lambda h}(\\lambda h)^{k}}{k!}",
          caption: "Stationary, independent increments",
        },
        {
          kind: "prose",
          text: "λ is an intensity — events per unit time — so it scales with the window exactly the way the Poisson distribution's own λ does. This is the same object as `poisson-distribution`'s parameter; the process is what supplies the justification for treating a count as Poisson in the first place, rather than just asserting it.",
        },
      ],
    },
    {
      heading: "Closure properties",
      blocks: [
        {
          kind: "list",
          items: [
            "**Superposition.** Independent Poisson processes with rates λ₁, λ₂ merge into one with rate λ₁ + λ₂.",
            "**Thinning.** Keep each event independently with probability p, and the kept events form a Poisson process with rate pλ — the discarded ones form an independent Poisson process with rate (1−p)λ.",
            "**Conditional uniformity.** Given that exactly n events fell in [0, t], their locations are distributed exactly like n independent Uniform(0, t) order statistics.",
          ],
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Thinning a call stream",
          problem:
            "Support calls arrive as a Poisson process at 12/hour. 25% are billing questions. What is the probability of exactly 2 billing calls in a 30-minute window, and what is the expected gap between billing calls?",
          steps: [
            "Thinning: billing calls form their own Poisson process, rate = 0.25 × 12 = 3/hour.",
            "30-minute window: λh = 3 × 0.5 = 1.5. P(N = 2) = e^{-1.5}(1.5)²/2! ≈ 0.2510.",
            "Gaps between a rate-3/hour Poisson process are Exponential(3), mean 1/3 hour = 20 minutes.",
          ],
          answer: "P(exactly 2 in 30 min) ≈ 0.251; expected gap between billing calls = 20 minutes.",
        },
      ],
    },
  ],
  references: [
    { source: "Ross, Introduction to Probability Models", locator: "Ch. 5, The Poisson Process" },
    { source: "Shreve, Stochastic Calculus for Finance II", locator: "§11.2 (jump processes)" },
  ],
};
