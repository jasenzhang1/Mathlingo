import type { WikiArticle } from "../types";

export const continuousTimeMarkovChainsWiki: WikiArticle = {
  conceptId: "continuous-time-markov-chains",
  summary:
    "A continuous-time Markov chain (CTMC) is what you get when a discrete-time Markov chain stops " +
    "waiting a fixed step and instead waits a random, Exponentially-distributed amount of time in each " +
    "state before jumping. The transition matrix's job is taken over by a generator matrix, whose off-" +
    "diagonal entries are jump rates and whose rows sum to zero.",
  sections: [
    {
      heading: "Holding times and the generator",
      blocks: [
        {
          kind: "prose",
          text: "In state i, the chain waits an Exponential(qᵢ) amount of time — memoryless, so 'how long have I been here' never matters, exactly as in `poisson-process`. When it jumps, it moves to state j with probability qᵢⱼ/qᵢ. Packaging this as a matrix Q with off-diagonal entries qᵢⱼ ≥ 0 and diagonal entries qᵢᵢ = −Σⱼ≠ᵢ qᵢⱼ gives every row sum zero — the generator.",
        },
        {
          kind: "formula",
          latex: "P(t) = e^{Qt} = \\sum_{n=0}^{\\infty} \\frac{(Qt)^n}{n!}",
          caption: "The transition-probability matrix at time t, from the generator",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Q is the derivative of P at t = 0",
          text: "P(0) = I and P'(0) = Q. Every finite-time transition probability is recovered by exponentiating the generator, the same way a scalar exponential rate gives e^{qt} — Q is simply the matrix version of 'the instantaneous rate of change.'",
        },
      ],
    },
    {
      heading: "Stationary distribution",
      blocks: [
        {
          kind: "formula",
          latex: "\\pi Q = 0, \\qquad \\sum_i \\pi_i = 1",
          caption: "Balance equations for a CTMC — the generator's analogue of πP = π",
        },
        {
          kind: "prose",
          text: "Same idea as the discrete-time stationary distribution in `markov-chains`, rewritten for continuous time: the rate of probability flowing out of a state equals the rate flowing in, for every state simultaneously.",
        },
      ],
    },
    {
      heading: "The Poisson process as the simplest CTMC",
      blocks: [
        {
          kind: "prose",
          text: "A Poisson process with rate λ is a CTMC on the states {0, 1, 2, …} with qᵢ,ᵢ₊₁ = λ and every other off-diagonal rate zero — it only ever moves up by one. Everything about CTMCs specialises correctly: the holding time in state n is Exponential(λ), matching `poisson-process` exactly.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "A two-state machine",
          problem:
            "A machine is Up or Down. From Up it fails at rate 0.5/day; from Down it is repaired at rate 2/day. Write the generator and find the long-run fraction of time Up.",
          steps: [
            "States {Up, Down}. Q = [[−0.5, 0.5], [2, −2]].",
            "Balance: π_Up · 0.5 = π_Down · 2 (flow out of Up into Down equals flow back).",
            "So π_Up = 4 π_Down, and π_Up + π_Down = 1 gives π_Down = 0.2, π_Up = 0.8.",
          ],
          answer: "Long-run fraction of time Up = 0.8 (expected: mean Up-time 2 days, mean Down-time 0.5 days, 2/(2+0.5) = 0.8).",
        },
      ],
    },
  ],
  references: [
    { source: "Ross, Introduction to Probability Models", locator: "Ch. 6, Continuous-Time Markov Chains" },
    { source: "Norris, Markov Chains", locator: "Ch. 2–3" },
  ],
};
