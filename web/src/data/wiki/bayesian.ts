import type { WikiArticle } from "./types";
import { bayesianModelWikis } from "./bayesian-models";
import { bayesianInversionWikis } from "./bayesian-inversion";

/**
 * Foundations of the Bayesian Statistics chapter. The chapter's later lessons
 * (MCMC, variational inference, Gaussian and Dirichlet processes, Bayesian
 * linear regression) have articles elsewhere — see `./index.ts`.
 */

const gelman = "Gelman, Carlin, Stern, Dunson, Vehtari & Rubin, Bayesian Data Analysis (3rd ed.)";
const hoff = "Hoff, A First Course in Bayesian Statistical Methods";

export const bayesianInferenceWiki: WikiArticle = {
  conceptId: "bayesian-inference",
  summary:
    "Bayesian inference treats unknown parameters as random quantities. Before seeing data, beliefs about a parameter " +
    "$\\theta$ are expressed as a prior distribution $p(\\theta)$; the data enter through the likelihood $p(y \\mid \\theta)$; " +
    "and Bayes' rule combines them into the posterior $p(\\theta \\mid y)$. Every conclusion — estimates, intervals, " +
    "predictions, decisions — is read off the posterior.",
  sections: [
    {
      heading: "The posterior",
      blocks: [
        {
          kind: "formula",
          latex: "p(\\theta \\mid y) = \\frac{p(y \\mid \\theta)\\,p(\\theta)}{p(y)} \\propto p(y \\mid \\theta)\\,p(\\theta)",
          caption: "posterior ∝ likelihood × prior; the evidence $p(y) = \\int p(y \\mid \\theta)p(\\theta)\\,d\\theta$ only normalises",
        },
        {
          kind: "definitions",
          items: [
            { term: "Prior $p(\\theta)$", description: "What is believed about $\\theta$ before the data — from earlier studies, physical constraints, or deliberately weak assumptions." },
            { term: "Likelihood $p(y \\mid \\theta)$", description: "The same function used in maximum likelihood, now read as a weight on each value of $\\theta$." },
            { term: "Posterior $p(\\theta \\mid y)$", description: "Updated beliefs. It can serve as the prior for the next batch of data: updating sequentially or all at once gives the same answer." },
            { term: "Evidence $p(y)$", description: "The marginal likelihood — irrelevant for the shape of the posterior, central for comparing models (Bayes factors)." },
          ],
        },
      ],
    },
    {
      heading: "Worked example: a coin",
      blocks: [
        {
          kind: "example",
          title: "Beta prior, binomial data",
          problem: "Prior $\\theta \\sim \\mathrm{Beta}(2, 2)$. You observe $7$ heads in $10$ tosses. Find the posterior and its mean.",
          steps: [
            "Likelihood $\\propto \\theta^7(1 - \\theta)^3$; prior $\\propto \\theta^{1}(1 - \\theta)^{1}$.",
            "Posterior $\\propto \\theta^{8}(1 - \\theta)^{4}$, i.e. $\\mathrm{Beta}(9, 5)$.",
            "Posterior mean $= 9/14 \\approx 0.643$, between the MLE $0.7$ and the prior mean $0.5$.",
          ],
          answer: "$\\theta \\mid y \\sim \\mathrm{Beta}(9, 5)$, with mean $0.643$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Data overwhelm the prior",
          text: "The posterior mean is a weighted average of prior mean and MLE, with weights proportional to the prior's pseudo-count ($4$ here) and the sample size. As $n$ grows, the posterior concentrates around the truth whatever the (non-degenerate) prior — the Bernstein–von Mises theorem makes this precise.",
        },
      ],
    },
    {
      heading: "Bayesian versus frequentist statements",
      blocks: [
        {
          kind: "table",
          headers: ["Question", "Frequentist answer", "Bayesian answer"],
          rows: [
            ["What is random?", "The data (over repeated samples)", "The parameter (given the observed data)"],
            ["Interval meaning", "95% of such intervals cover $\\theta$", "$P(\\theta \\in I \\mid y) = 0.95$"],
            ["Is $H_0$ true?", "A p-value: $P(\\text{data this extreme} \\mid H_0)$", "$P(H_0 \\mid y)$, given prior model probabilities"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The prior is part of the model",
          text: "Posterior conclusions are conditional on the prior as well as the likelihood. Report the prior, check its implications, and test sensitivity to reasonable alternatives — especially with little data.",
        },
      ],
    },
  ],
  references: [
    { source: gelman, locator: "Ch. 1–2" },
    { source: hoff, locator: "Ch. 1–3" },
  ],
};

export const priorSelectionWiki: WikiArticle = {
  conceptId: "prior-selection",
  summary:
    "Choosing a prior is choosing part of the model. Informative priors encode real knowledge; weakly informative priors " +
    "rule out absurd values while letting the data speak; “non-informative” priors try to say nothing — a goal that turns " +
    "out to depend on how the parameter is written down.",
  sections: [
    {
      heading: "Kinds of prior",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Informative", description: "Encodes substantive knowledge, e.g. a treatment effect prior centred on a previous trial's estimate." },
            { term: "Weakly informative", description: "Deliberately wide but proper, e.g. $N(0, 2.5^2)$ on standardised logistic coefficients — excludes effects no one believes possible, stabilising estimates." },
            { term: "Flat / improper", description: "$p(\\theta) \\propto 1$. Not a distribution; the posterior may still be proper, but must be checked." },
            { term: "Jeffreys", description: "$p(\\theta) \\propto \\sqrt{\\det I(\\theta)}$, invariant under reparameterisation; $\\mathrm{Beta}(\\tfrac12, \\tfrac12)$ for a Bernoulli probability." },
          ],
        },
      ],
    },
    {
      heading: "Flat is not neutral",
      blocks: [
        {
          kind: "prose",
          text:
            "A flat prior on $\\theta \\in (0, 1)$ is not flat on the log-odds $\\phi = \\log\\frac{\\theta}{1 - \\theta}$: by change of variables it " +
            "becomes the logistic density, concentrated near $\\phi = 0$. Every prior is informative about something; Jeffreys priors " +
            "resolve this by giving the same answer whichever parameterisation you start from.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Improper priors can give improper posteriors",
          text: "A flat prior on a hierarchical variance, or on logistic coefficients with perfectly separated data, can leave the posterior unnormalisable. MCMC will still produce numbers — they just mean nothing.",
        },
      ],
    },
    {
      heading: "Checking a prior",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Prior predictive simulation: draw $\\theta$ from the prior, then data from the model, and ask whether the simulated data look plausible.",
            "Sensitivity analysis: refit under alternative reasonable priors and report how much conclusions move.",
            "Prior–data conflict: compare the likelihood's location with the prior's; strong disagreement is informative in itself.",
          ],
        },
        {
          kind: "example",
          title: "A prior that implies nonsense",
          problem: "A logistic regression with $10$ predictors puts $N(0, 10^2)$ priors on each standardised coefficient. What do the implied probabilities look like?",
          steps: [
            "The linear predictor has prior SD about $\\sqrt{10} \\times 10 \\approx 32$.",
            "Applying the logistic function to values that large gives probabilities essentially $0$ or $1$.",
          ],
          answer: "The “vague” prior asserts that almost every outcome is certain — a weakly informative $N(0, 1)$ is far more neutral on the probability scale.",
        },
      ],
    },
  ],
  references: [
    { source: gelman, locator: "§2.8–2.9" },
    { source: "Kass & Wasserman (1996), The Selection of Prior Distributions by Formal Rules, JASA", locator: "§1–3" },
  ],
};

export const credibleIntervalsWiki: WikiArticle = {
  conceptId: "credible-intervals",
  summary:
    "A posterior distribution is summarised by a point estimate and an interval. Credible intervals contain the parameter " +
    "with a stated posterior probability — a direct statement about $\\theta$ given the data, unlike a confidence interval's " +
    "promise about repeated sampling.",
  sections: [
    {
      heading: "Point summaries",
      blocks: [
        {
          kind: "table",
          headers: ["Summary", "Definition", "Optimal under"],
          rows: [
            ["Posterior mean", "$\\mathbb{E}[\\theta \\mid y]$", "squared-error loss"],
            ["Posterior median", "$50$th percentile of the posterior", "absolute-error loss"],
            ["MAP", "$\\arg\\max_\\theta p(\\theta \\mid y)$", "$0$–$1$ loss (limit); not invariant to reparameterisation"],
          ],
        },
      ],
    },
    {
      heading: "Interval summaries",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Equal-tailed interval", description: "From the $2.5$th to the $97.5$th posterior percentile. Invariant under monotone transformations." },
            { term: "Highest posterior density (HPD)", description: "The shortest region with $95\\%$ posterior probability; every point inside has higher density than every point outside. Can be disjoint for multimodal posteriors." },
          ],
        },
        {
          kind: "example",
          title: "Normal posterior",
          problem: "The posterior is $\\theta \\mid y \\sim N(1.6, 0.2)$. Give the $95\\%$ credible interval.",
          steps: ["SD $= \\sqrt{0.2} \\approx 0.447$.", "Interval $= 1.6 \\pm 1.96 \\times 0.447$."],
          answer: "$(0.72, 2.48)$ — for a symmetric unimodal posterior, equal-tailed and HPD intervals coincide.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "When credible and confidence intervals agree",
          text: "With flat priors and normal likelihoods (and asymptotically under Bernstein–von Mises), the two intervals are numerically the same even though their interpretations differ. With small samples, bounded parameters or informative priors they can differ sharply.",
        },
      ],
    },
  ],
  references: [
    { source: gelman, locator: "§2.3" },
    { source: hoff, locator: "§3.1" },
  ],
};

export const posteriorPredictiveWiki: WikiArticle = {
  conceptId: "posterior-predictive-checks",
  summary:
    "The posterior predictive distribution (its own lesson, with prediction intervals) forecasts new data while accounting " +
    "for parameter uncertainty. Simulating replicated datasets from it and comparing them with the observed data is the " +
    "Bayesian way of checking whether a model fits.",
  sections: [
    {
      heading: "Recap: predicting new data",
      blocks: [
        {
          kind: "formula",
          latex: "p(\\tilde{y} \\mid y) = \\int p(\\tilde{y} \\mid \\theta)\\,p(\\theta \\mid y)\\,d\\theta",
          caption: "average the sampling distribution over the posterior",
        },
        {
          kind: "prose",
          text:
            "With posterior draws $\\theta^{(s)}$, simulate $\\tilde{y}^{(s)} \\sim p(\\tilde{y} \\mid \\theta^{(s)})$; the $\\tilde{y}^{(s)}$ are " +
            "draws from the predictive. The predictive is wider than the plug-in $p(\\tilde{y} \\mid \\hat{\\theta})$ because it includes " +
            "uncertainty about $\\theta$ — e.g. a Student-$t$ rather than normal predictive when the variance is estimated.",
        },
        {
          kind: "example",
          title: "Beta-binomial prediction",
          problem: "The posterior is $\\mathrm{Beta}(9, 5)$. What is the probability the next toss is heads?",
          steps: ["$P(\\tilde{y} = 1 \\mid y) = \\mathbb{E}[\\theta \\mid y]$."],
          answer: "$9/14 \\approx 0.643$.",
        },
      ],
    },
    {
      heading: "Posterior predictive checks",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Choose a test quantity $T(y)$ capturing a feature the model should reproduce (max, number of zeros, autocorrelation).",
            "For each posterior draw, simulate a replicated dataset $y^{\\text{rep}}$ and compute $T(y^{\\text{rep}})$.",
            "Compare with $T(y)$: the posterior predictive p-value is $P(T(y^{\\text{rep}}) \\ge T(y) \\mid y)$; values near $0$ or $1$ flag misfit.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Double use of the data",
          text: "The data inform the posterior and are then compared with its predictions, so checks are conservative — predictive p-values cluster near $0.5$. They reveal gross misfit well but are not calibrated tests; cross-validated (LOO) checks avoid the double use.",
        },
      ],
    },
  ],
  references: [
    { source: gelman, locator: "Ch. 6" },
  ],
};

export const hierarchicalModelsWiki: WikiArticle = {
  conceptId: "hierarchical-bayesian-models",
  summary:
    "Hierarchical models give group-level parameters a shared prior whose own parameters are learned from the data. " +
    "Groups borrow strength from one another: estimates for small groups are pulled towards the overall mean, large groups " +
    "keep their own estimates — partial pooling between the extremes of fitting each group separately and ignoring groups.",
  sections: [
    {
      heading: "Structure",
      blocks: [
        {
          kind: "formula",
          latex: "y_{ij} \\mid \\theta_j \\sim N(\\theta_j, \\sigma^2), \\quad \\theta_j \\mid \\mu, \\tau \\sim N(\\mu, \\tau^2), \\quad (\\mu, \\tau) \\sim p(\\mu, \\tau)",
          caption: "the normal hierarchical model",
        },
        {
          kind: "definitions",
          items: [
            { term: "No pooling", description: "Estimate each $\\theta_j$ separately ($\\tau \\to \\infty$). Noisy for small groups." },
            { term: "Complete pooling", description: "Force $\\theta_j = \\mu$ ($\\tau = 0$). Ignores real differences." },
            { term: "Partial pooling", description: "Learn $\\tau$; each group's estimate is a precision-weighted compromise." },
          ],
        },
      ],
    },
    {
      heading: "Shrinkage",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbb{E}[\\theta_j \\mid y, \\mu, \\tau] = \\frac{\\frac{n_j}{\\sigma^2}\\bar{y}_j + \\frac{1}{\\tau^2}\\mu}{\\frac{n_j}{\\sigma^2} + \\frac{1}{\\tau^2}}",
          caption: "the weight on the group mean grows with the group's sample size",
        },
        {
          kind: "example",
          title: "Shrinking a small school",
          problem: "A school has $\\bar{y}_j = 80$ from $n_j = 4$ students, $\\sigma^2 = 100$, and the population has $\\mu = 70$, $\\tau^2 = 25$. Find the posterior mean of $\\theta_j$.",
          steps: [
            "Data precision $n_j/\\sigma^2 = 0.04$; prior precision $1/\\tau^2 = 0.04$.",
            "Equal weights: $(0.04 \\times 80 + 0.04 \\times 70)/0.08$.",
          ],
          answer: "$75$ — halfway between the school's mean and the population mean.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Exchangeability",
          text: "Hierarchical models are justified when, before seeing data, groups are exchangeable — nothing distinguishes one from another. With known group-level covariates, put them in the prior mean (a multilevel regression) rather than assuming exchangeability.",
        },
      ],
    },
    {
      heading: "Computation pitfalls",
      blocks: [
        {
          kind: "prose",
          text:
            "When $\\tau$ is small, the $\\theta_j$ are tightly coupled to $\\mu$, producing a “funnel” posterior that samplers struggle " +
            "with. The non-centred parameterisation $\\theta_j = \\mu + \\tau\\eta_j$, $\\eta_j \\sim N(0, 1)$ usually fixes it when data per " +
            "group are sparse; the centred form is better when groups are well estimated.",
        },
      ],
    },
  ],
  references: [
    { source: gelman, locator: "Ch. 5" },
    { source: "Gelman & Hill, Data Analysis Using Regression and Multilevel/Hierarchical Models", locator: "Ch. 12" },
  ],
};

export const bayesFactorsWiki: WikiArticle = {
  conceptId: "bayes-factors",
  summary:
    "The Bayes factor compares two models by how well each predicted the observed data, averaging over its prior. It " +
    "updates prior odds to posterior odds and embodies an automatic Occam's razor — but it depends strongly on priors, " +
    "which leads to predictive alternatives such as LOO cross-validation and WAIC.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathrm{BF}_{10} = \\frac{p(y \\mid M_1)}{p(y \\mid M_0)}, \\qquad \\frac{P(M_1 \\mid y)}{P(M_0 \\mid y)} = \\mathrm{BF}_{10} \\times \\frac{P(M_1)}{P(M_0)}",
          caption: "marginal likelihoods $p(y \\mid M) = \\int p(y \\mid \\theta, M)p(\\theta \\mid M)d\\theta$",
        },
        {
          kind: "example",
          title: "Point null for a coin",
          problem: "$M_0$: $\\theta = 0.5$. $M_1$: $\\theta \\sim \\mathrm{Uniform}(0, 1)$. Data: $9$ heads in $10$ tosses. Compute $\\mathrm{BF}_{10}$.",
          steps: [
            "$p(y \\mid M_0) = \\binom{10}{9}0.5^{10} = 10/1024 \\approx 0.00977$.",
            "$p(y \\mid M_1) = \\int_0^1\\binom{10}{9}\\theta^9(1 - \\theta)d\\theta = 10 \\cdot B(10, 2) = 1/11 \\approx 0.0909$.",
          ],
          answer: "$\\mathrm{BF}_{10} \\approx 9.3$ — moderate evidence for a biased coin.",
        },
      ],
    },
    {
      heading: "Occam's razor and Lindley's paradox",
      blocks: [
        {
          kind: "prose",
          text:
            "A flexible model spreads its prior predictive over many possible datasets, so it assigns less probability to any " +
            "particular one; unless the data need the flexibility, the simpler model wins. The flip side: making $M_1$'s prior " +
            "on the effect very wide lowers $p(y \\mid M_1)$ without limit, so a result that is “significant” at $p < 0.05$ can " +
            "strongly favour the null — Lindley's paradox.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "No improper priors on non-shared parameters",
          text: "An improper prior's arbitrary constant multiplies the marginal likelihood, so Bayes factors are undefined for parameters that appear in only one model. Use proper priors, intrinsic/fractional Bayes factors, or predictive criteria.",
        },
      ],
    },
    {
      heading: "Computation and alternatives",
      blocks: [
        {
          kind: "list",
          items: [
            "Closed form under conjugacy; otherwise Laplace approximation (leading to BIC), bridge sampling, nested sampling, or Savage–Dickey density ratios for nested models.",
            "Predictive alternatives estimate out-of-sample fit instead: PSIS-LOO and WAIC are far less sensitive to prior width.",
            "Model averaging weights predictions by posterior model probabilities rather than picking one model.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Kass & Raftery (1995), Bayes Factors, JASA", locator: "§1–4" },
    { source: gelman, locator: "§7.4" },
  ],
};

export const bayesianWikis: WikiArticle[] = [
  bayesianInferenceWiki,
  priorSelectionWiki,
  credibleIntervalsWiki,
  posteriorPredictiveWiki,
  hierarchicalModelsWiki,
  bayesFactorsWiki,
  ...bayesianModelWikis,
  ...bayesianInversionWikis,
];
