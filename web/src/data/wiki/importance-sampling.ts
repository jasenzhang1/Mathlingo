import type { WikiArticle } from "./types";

export const importanceSamplingWiki: WikiArticle = {
  conceptId: "importance-sampling",
  summary:
    "Importance sampling estimates an expectation under a distribution p you can't (easily) sample " +
    "from by sampling instead from a proposal q you can, and correcting each sample by how over- or " +
    "under-represented it was under q relative to p. It costs nothing in bias, exactly — the estimator " +
    "is unbiased for any q with the right support — but the wrong q can make the variance explode.",
  sections: [
    {
      heading: "The identity",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbb{E}_p[f(X)] = \\int f(x)\\,p(x)\\,dx = \\int f(x)\\,\\frac{p(x)}{q(x)}\\,q(x)\\,dx = \\mathbb{E}_q\\!\\left[f(X)\\,\\frac{p(X)}{q(X)}\\right]",
          caption: "Multiply and divide by q — one line, no approximation",
        },
        {
          kind: "prose",
          text: "w(x) = p(x)/q(x) is the importance weight. Draw X₁, …, Xₙ ~ q, and the sample average of f(Xᵢ)·w(Xᵢ) is an unbiased, consistent estimator of 𝔼_p[f(X)] by the law of large numbers — for any q whose support covers everywhere p puts mass.",
        },
      ],
    },
    {
      heading: "Why this is useful",
      blocks: [
        {
          kind: "list",
          items: [
            "**p is only known up to a constant.** Bayesian posteriors are the standard case: p(θ|data) ∝ likelihood × prior, and the normalizing constant is an intractable integral. Importance sampling with a tractable q sidesteps needing it (self-normalized importance sampling divides the weighted sum by the sum of weights, cancelling the unknown constant).",
            "**p puts most of its mass somewhere rarely visited by direct simulation.** Estimating a rare-event probability by simulating from p directly can require an astronomical sample size; a proposal q that oversamples the rare region and reweights down can be dramatically more efficient.",
          ],
        },
      ],
    },
    {
      heading: "The variance problem",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "A bad q doesn't just hurt — it can lie",
          text: "If q has thinner tails than p, the ratio p(x)/q(x) blows up exactly where q rarely samples — so the estimator is dominated by a handful of enormous weights from draws that almost never occur. The sample variance can look small while the true variance is infinite, and the estimate can be badly wrong with no warning sign in the output. The rule of thumb: q's tails should be at least as heavy as p's.",
        },
        {
          kind: "formula",
          latex: "\\operatorname{ESS} = \\frac{\\left(\\sum_i w_i\\right)^2}{\\sum_i w_i^2}",
          caption: "Effective sample size — how many *equally-weighted* draws n weighted ones are worth",
        },
        {
          kind: "prose",
          text: "ESS close to n means the weights are roughly uniform and q tracks p well. ESS collapsing toward 1 (dominated by one or two huge weights) is the standard diagnostic that q is a poor match for p, even when the point estimate itself looks plausible.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Self-normalized weights",
          problem:
            "You want 𝔼_p[f(X)] but can only evaluate p̃(x) = c·p(x) for unknown c. You draw 3 samples from q and compute unnormalized weights w̃ᵢ = p̃(xᵢ)/q(xᵢ) = 2, 6, 2, with f-values f(x₁)=1, f(x₂)=4, f(x₃)=2. Estimate 𝔼_p[f(X)].",
          steps: [
            "Self-normalized estimator: Σᵢ w̃ᵢ f(xᵢ) / Σᵢ w̃ᵢ — the unknown constant c appears in every w̃ᵢ and cancels.",
            "Numerator: 2·1 + 6·4 + 2·2 = 2 + 24 + 4 = 30.",
            "Denominator: 2 + 6 + 2 = 10.",
          ],
          answer: "Estimate = 30/10 = 3.",
        },
      ],
    },
  ],
  references: [
    { source: "Murphy, Probabilistic Machine Learning: An Introduction", locator: "§11.5, Importance sampling" },
    { source: "Owen, Monte Carlo Theory, Methods and Examples", locator: "Ch. 9" },
  ],
};
