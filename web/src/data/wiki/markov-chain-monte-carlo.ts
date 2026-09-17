import type { WikiArticle } from "./types";

export const markovChainMonteCarloWiki: WikiArticle = {
  conceptId: "markov-chain-monte-carlo",
  summary:
    "MCMC flips the usual relationship between Markov chains and stationary distributions: instead of " +
    "being handed a chain and asked for its stationary distribution, you start from the distribution you " +
    "want to sample — typically an intractable posterior — and build a chain whose stationary " +
    "distribution is exactly that. Run the chain long enough and its samples are (correlated, but " +
    "asymptotically correct) draws from the target.",
  sections: [
    {
      heading: "Why not importance sampling",
      blocks: [
        {
          kind: "prose",
          text: "`importance-sampling` needs one global proposal q that covers a possibly high-dimensional, oddly-shaped target well — hard to design by hand, and its weights degenerate badly as dimension grows. MCMC instead only needs *local* proposals: at each step, propose a small move from wherever the chain currently is, and decide whether to take it. Global coverage becomes something the chain achieves by wandering, not something a single proposal has to get right up front.",
        },
      ],
    },
    {
      heading: "Metropolis-Hastings",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "At current state x, propose x' from a proposal distribution q(x'|x).",
            "Compute the acceptance ratio α = min(1, [p̃(x')q(x|x')] / [p̃(x)q(x'|x)]), where p̃ is the target up to an unknown normalizing constant (which cancels in the ratio, exactly as in self-normalized importance sampling).",
            "Accept: move to x' with probability α. Reject: stay at x (this counts as another sample of x).",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why this converges to p: detailed balance",
          text: "The acceptance rule is constructed so that p(x)·P(x → x') = p(x')·P(x' → x) for every pair of states — detailed balance. A chain satisfying detailed balance with respect to p automatically has p as its stationary distribution, because the flow of probability between any two states is exactly balanced in both directions, so no state's probability mass can drift over time.",
        },
      ],
    },
    {
      heading: "What can go wrong",
      blocks: [
        {
          kind: "table",
          headers: ["Symptom", "Cause", "Fix"],
          rows: [
            [
              "Acceptance rate near 0",
              "Proposal steps too large — almost every proposal lands somewhere much less likely",
              "Shrink the proposal's step size",
            ],
            [
              "Acceptance rate near 1 but slow mixing",
              "Proposal steps too small — the chain barely moves",
              "Grow the proposal's step size",
            ],
            [
              "Early samples unrepresentative",
              "Chain hasn't forgotten its (possibly poor) starting point yet",
              "Discard a burn-in period before using samples",
            ],
          ],
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "One Metropolis step",
          problem:
            "Target p̃(x) ∝ e^{-x²/2} (an unnormalized standard normal). Current state x = 1. A symmetric proposal (so q(x'|x) = q(x|x'), cancelling from the ratio) suggests x' = 1.5. Should the chain accept?",
          steps: [
            "Symmetric proposal means α = min(1, p̃(x')/p̃(x)).",
            "p̃(1.5)/p̃(1) = e^{-1.5²/2} / e^{-1²/2} = e^{-(2.25-1)/2} = e^{-0.625} ≈ 0.535.",
            "α ≈ 0.535: accept with probability 0.535, otherwise stay at x = 1.",
          ],
          answer: "Accept with probability ≈ 0.535 — the proposal is less likely than the current state under p, but not rejected outright, which is exactly what lets the chain explore beyond the mode.",
        },
      ],
    },
  ],
  references: [
    { source: "Murphy, Probabilistic Machine Learning: An Introduction", locator: "§12.2–12.3, MCMC and Metropolis-Hastings" },
    { source: "Gelman et al., Bayesian Data Analysis", locator: "Ch. 11" },
  ],
};
