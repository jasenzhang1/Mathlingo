import type { WikiArticle } from "./types";

export const gibbsSamplingWiki: WikiArticle = {
  conceptId: "gibbs-sampling",
  summary:
    "Gibbs sampling is `markov-chain-monte-carlo` for the special case where you can't easily evaluate " +
    "or propose over the full joint, but you can sample exactly from each variable's conditional " +
    "distribution given all the others. Cycle through the variables, resampling each from its full " +
    "conditional, and the resulting chain is Metropolis-Hastings with an acceptance rate of exactly 1 — " +
    "every proposal is accepted, because of how the proposal is constructed.",
  sections: [
    {
      heading: "The algorithm",
      blocks: [
        {
          kind: "prose",
          text: "For variables x = (x₁, …, x_d), maintain a current state and repeat: sample x₁' ~ p(x₁ | x₂, …, x_d), then x₂' ~ p(x₂ | x₁', x₃, …, x_d) using the just-updated x₁', and so on through x_d, always conditioning on the most recent value of every other coordinate. One full pass through all d coordinates is one Gibbs sweep.",
        },
        {
          kind: "formula",
          latex: "x_i^{(t+1)} \\sim p\\big(x_i \\mid x_1^{(t+1)}, \\ldots, x_{i-1}^{(t+1)}, x_{i+1}^{(t)}, \\ldots, x_d^{(t)}\\big)",
          caption: "Each coordinate updated in turn, conditioned on the current values of the rest",
        },
      ],
    },
    {
      heading: "Why it's a Metropolis-Hastings special case",
      blocks: [
        {
          kind: "callout",
          tone: "insight",
          title: "The proposal is the exact conditional, so α = 1 always",
          text: "Treat resampling xᵢ as a Metropolis-Hastings proposal that only moves coordinate i, drawn from q(xᵢ' | x₋ᵢ) = p(xᵢ' | x₋ᵢ) — the true conditional itself. Plugging this into the Metropolis-Hastings acceptance ratio, the target and proposal terms cancel exactly, giving α = 1 for every step. No proposal is ever rejected; the cost of never rejecting is that Gibbs only works when those full conditionals are ones you can actually sample from in closed form.",
        },
        {
          kind: "prose",
          text: "This is exactly the situation in a graphical model like `markov-random-fields` or a conjugate Bayesian hierarchy: each variable's full conditional, given its Markov blanket, is often a standard distribution (Normal, Gamma, Dirichlet, …) even when the joint has no closed form at all.",
        },
      ],
    },
    {
      heading: "When Gibbs struggles",
      blocks: [
        {
          kind: "prose",
          text: "Strongly correlated coordinates mix slowly: updating one variable at a time can only take small steps along a ridge that runs diagonally, so the chain crawls rather than jumps. Blocked Gibbs (sampling correlated groups of variables jointly from their conditional) or reparameterizing to reduce correlation are the standard fixes — and where no full conditional is tractable at all, the more general Metropolis-Hastings step is what remains available.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Bivariate normal by Gibbs",
          problem:
            "(X, Y) is bivariate normal with mean 0, unit variances, and correlation ρ = 0.6, so X | Y=y ~ N(0.6y, 1−0.36) and Y | X=x ~ N(0.6x, 0.64). Starting at (x, y) = (2, 0), run one Gibbs sweep.",
          steps: [
            "Update X: X | Y=0 ~ N(0.6·0, 0.64) = N(0, 0.64). Its mean is 0 — draw, say, x' = 0.1 (any draw from this conditional is valid).",
            "Update Y using the new x': Y | X=0.1 ~ N(0.6·0.1, 0.64) = N(0.06, 0.64). Draw y' from this, e.g. y' = 0.3.",
            "State after one sweep: (0.1, 0.3) — both coordinates have moved from the far-from-typical start (2, 0) toward the bulk of the distribution.",
          ],
          answer: "One sweep updates X from its conditional given the old Y, then Y from its conditional given the new X — each draw uses the most recently updated value of the other coordinate.",
        },
      ],
    },
  ],
  references: [
    { source: "Murphy, Probabilistic Machine Learning: An Introduction", locator: "§12.3.3, Gibbs sampling" },
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§11.3" },
  ],
};
