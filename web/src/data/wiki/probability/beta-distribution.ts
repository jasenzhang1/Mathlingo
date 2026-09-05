import type { WikiArticle } from "../types";

export const betaDistribution: WikiArticle = {
  conceptId: "beta-distribution",
  summary:
    "The beta distribution lives on $[0,1]$, which makes it the natural model for a proportion or a probability. Its central role in Bayesian statistics comes from conjugacy: a beta prior combined with binomial data gives a beta posterior, obtained by adding the observed counts to the parameters.",
  sections: [
    {
      heading: "Density and shape",
      blocks: [
        {
          kind: "formula",
          latex: "f_X(x) = \\frac{x^{\\alpha-1}(1-x)^{\\beta-1}}{B(\\alpha, \\beta)}, \\qquad 0 < x < 1",
          caption: "Beta$(\\alpha, \\beta)$, with $B(\\alpha,\\beta) = \\Gamma(\\alpha)\\Gamma(\\beta)/\\Gamma(\\alpha+\\beta)$",
        },
        {
          kind: "formula",
          latex: "\\mathbb{E}[X] = \\frac{\\alpha}{\\alpha + \\beta}, \\qquad \\operatorname{Var}(X) = \\frac{\\alpha\\beta}{(\\alpha+\\beta)^{2}(\\alpha+\\beta+1)}",
          caption: "Mean and variance",
        },
        {
          kind: "table",
          headers: ["Parameters", "Shape", "Reading"],
          rows: [
            ["$\\alpha = \\beta = 1$", "Uniform$(0,1)$", "no information"],
            ["$\\alpha = \\beta > 1$", "symmetric, bell-shaped", "centred at $1/2$, concentration rising with $\\alpha$"],
            ["$\\alpha > \\beta$", "skewed toward 1", "successes outweigh failures"],
            ["$\\alpha, \\beta < 1$", "U-shaped, spikes at both ends", "belief the proportion is near 0 or near 1"],
            ["large $\\alpha + \\beta$", "tightly concentrated", "strong information"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The parameters count pseudo-observations",
          text: "Read $\\alpha$ as a number of prior successes and $\\beta$ as prior failures. Then the mean $\\alpha/(\\alpha+\\beta)$ is just the implied success rate, and $\\alpha + \\beta$ is the effective sample size of the prior — how much data it is worth. Beta$(1,1)$ is one imaginary success and one failure, which is genuinely uninformative; Beta$(50,50)$ asserts a fair coin about as firmly as 100 real flips would.",
        },
      ],
    },
    {
      heading: "Conjugacy",
      blocks: [
        {
          kind: "formula",
          latex: "p \\sim \\text{Beta}(\\alpha, \\beta), \\quad X \\mid p \\sim \\text{Binomial}(n, p) \\ \\Longrightarrow \\ p \\mid X = k \\ \\sim \\ \\text{Beta}(\\alpha + k,\\ \\beta + n - k)",
          caption: "The beta–binomial conjugate pair",
        },
        {
          kind: "prose",
          text: "The proof is one line of proportionality. The posterior is prior × likelihood, $p^{\\alpha-1}(1-p)^{\\beta-1} \\times p^{k}(1-p)^{n-k}$, which collects to $p^{\\alpha+k-1}(1-p)^{\\beta+n-k-1}$ — a beta density, with no integration required. Updating means adding successes to $\\alpha$ and failures to $\\beta$.",
        },
        {
          kind: "example",
          title: "Bayesian updating",
          problem:
            "Starting from a Beta$(2,2)$ prior for a coin's bias, you observe 7 heads in 10 flips. What is the posterior, and how does its mean compare with the MLE?",
          steps: [
            "Posterior: Beta$(2 + 7,\\ 2 + 3) = $ Beta$(9, 5)$.",
            "Posterior mean: $9/14 \\approx 0.643$.",
            "MLE: $7/10 = 0.700$.",
            "The posterior is pulled toward the prior mean of $0.5$ — shrinkage, in proportion to the prior's weight of $\\alpha+\\beta = 4$ against 10 observations.",
          ],
          answer:
            "Beta$(9,5)$, mean $\\approx 0.643$. With more data the prior's influence fades: 70 heads in 100 would give a posterior mean of $72/104 \\approx 0.692$.",
        },
      ],
    },
    {
      heading: "Related facts",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**Order statistics.** The $k$th smallest of $n$ i.i.d. Uniform$(0,1)$ variables is Beta$(k,\\ n-k+1)$ — the cleanest non-Bayesian appearance of the distribution.",
            "**From gammas.** If $U \\sim \\text{Gamma}(\\alpha, \\lambda)$ and $V \\sim \\text{Gamma}(\\beta, \\lambda)$ independently, then $U/(U+V) \\sim \\text{Beta}(\\alpha,\\beta)$ — a proportion of two waiting times.",
            "**Beta-binomial.** Marginalising $p$ out of the binomial gives an overdispersed count distribution, the discrete analogue of what gamma mixing does for the Poisson.",
            "**Jeffreys prior.** For a binomial proportion this is Beta$(1/2, 1/2)$ — U-shaped, and invariant under reparameterisation in a way that Beta$(1,1)$ is not.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Uniform is not the neutral choice it appears to be",
          text: "Beta$(1,1)$ looks maximally ignorant about $p$, but it is not ignorant about functions of $p$ — it implies a definite, non-uniform belief about the odds $p/(1-p)$, and about $p^{2}$. There is no prior that is uninformative about everything simultaneously, which is why Jeffreys priors, defined by invariance rather than flatness, exist.",
        },
      ],
    },
  ],
  references: [
    { source: "Casella & Berger, Statistical Inference", locator: "§3.3.2, §7.2.3" },
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 8.3" },
    { source: "Gelman et al., Bayesian Data Analysis", locator: "Ch. 2" },
    { source: "Mathlingo assessment bank", locator: "assessments/continuous-distributions.md" },
  ],
};
