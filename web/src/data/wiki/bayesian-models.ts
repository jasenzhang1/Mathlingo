import type { WikiArticle } from "./types";

/**
 * Bayesian Statistics: the conjugate models worked one family at a time,
 * posterior predictive intervals, and the applied lessons — empirical Bayes,
 * A/B testing and MCMC diagnostics. Collected into `bayesianWikis`.
 */

const gelman = "Gelman, Carlin, Stern, Dunson, Vehtari & Rubin, Bayesian Data Analysis (3rd ed.)";
const hoff = "Hoff, A First Course in Bayesian Statistical Methods";
const efron = "Efron, Large-Scale Inference";

export const betaBinomialWiki: WikiArticle = {
  conceptId: "beta-binomial-model",
  summary:
    "The Beta–Binomial model is the simplest complete Bayesian analysis: a success probability $\\theta$ gets a " +
    "$\\mathrm{Beta}(a, b)$ prior, the data are $y$ successes in $n$ trials, and the posterior is again a Beta. Updating is " +
    "counting — add successes to $a$ and failures to $b$.",
  sections: [
    {
      heading: "The update",
      blocks: [
        {
          kind: "formula",
          latex: "\\theta \\sim \\mathrm{Beta}(a, b),\\quad y \\mid \\theta \\sim \\mathrm{Bin}(n, \\theta) \\;\\Longrightarrow\\; \\theta \\mid y \\sim \\mathrm{Beta}(a + y,\\; b + n - y)",
          caption: "prior pseudo-counts plus observed counts",
        },
        {
          kind: "definitions",
          items: [
            { term: "Pseudo-counts", description: "$\\mathrm{Beta}(a, b)$ behaves like $a$ earlier successes and $b$ earlier failures; $a + b$ is the prior's sample size." },
            { term: "Posterior mean", description: "$\\frac{a + y}{a + b + n} = w\\,\\frac{a}{a + b} + (1 - w)\\,\\frac{y}{n}$ with $w = \\frac{a + b}{a + b + n}$ — shrinkage of the sample proportion towards the prior mean." },
            { term: "Posterior mode", description: "$\\frac{a + y - 1}{a + b + n - 2}$ (for $a + y, b + n - y > 1$); with a uniform prior this is the MLE $y/n$." },
            { term: "Common priors", description: "$\\mathrm{Beta}(1, 1)$ uniform; $\\mathrm{Beta}(1/2, 1/2)$ Jeffreys; a prior with mean $m$ worth $k$ observations is $\\mathrm{Beta}(mk, (1 - m)k)$." },
          ],
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Shrinking a conversion rate",
          problem: "Past campaigns suggest a click rate near $0.2$, encoded as $\\mathrm{Beta}(2, 8)$. A new ad gets $6$ clicks from $20$ views. Find the posterior and its mean.",
          steps: [
            "Posterior: $\\mathrm{Beta}(2 + 6,\\; 8 + 14) = \\mathrm{Beta}(8, 22)$.",
            "Mean $= 8/30 \\approx 0.267$.",
            "Check the weights: $w = 10/30 = 1/3$, so $\\frac{1}{3}(0.2) + \\frac{2}{3}(0.3) = 0.267$.",
          ],
          answer: "$\\mathrm{Beta}(8, 22)$, mean $0.267$ — one third of the way from the sample proportion $0.3$ back to the prior mean $0.2$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Rule of succession",
          text: "With a uniform prior the posterior mean is $(y + 1)/(n + 2)$. It never returns $0$ or $1$, which is exactly what you want after $0$ failures in $50$ tests: the posterior $\\mathrm{Beta}(1, 51)$ still gives a $95\\%$ upper bound of about $0.057$.",
        },
      ],
    },
    {
      heading: "Predicting new trials",
      blocks: [
        {
          kind: "formula",
          latex: "P(\\tilde{y} = k \\mid y) = \\binom{m}{k}\\frac{B(a' + k,\\; b' + m - k)}{B(a', b')}",
          caption: "the beta-binomial predictive for $m$ new trials, with posterior $\\mathrm{Beta}(a', b')$",
        },
        {
          kind: "prose",
          text:
            "The probability the next trial succeeds is the posterior mean $a'/(a' + b')$. For several trials the predictive is " +
            "wider than a binomial: its variance is $m\\bar{p}(1 - \\bar{p})\\frac{a' + b' + m}{a' + b' + 1}$, the extra factor " +
            "coming from uncertainty about $\\theta$.",
        },
      ],
    },
  ],
  references: [
    { source: gelman, locator: "§2.1–2.4" },
    { source: hoff, locator: "Ch. 3.1" },
  ],
};

export const gammaPoissonWiki: WikiArticle = {
  conceptId: "gamma-poisson-model",
  summary:
    "For counts — arrivals, defects, claims — the Poisson rate $\\lambda$ gets a Gamma prior. The posterior is Gamma again: " +
    "add the total count to the shape and the total exposure to the rate. Averaging the Poisson over the Gamma gives a " +
    "negative binomial, the standard model for overdispersed counts.",
  sections: [
    {
      heading: "The update",
      blocks: [
        {
          kind: "formula",
          latex: "\\lambda \\sim \\mathrm{Gamma}(\\alpha, \\beta),\\quad y_i \\mid \\lambda \\sim \\mathrm{Poisson}(t_i\\lambda) \\;\\Longrightarrow\\; \\lambda \\mid y \\sim \\mathrm{Gamma}\\Big(\\alpha + \\sum y_i,\\; \\beta + \\sum t_i\\Big)",
          caption: "rate parameterisation: mean $\\alpha/\\beta$, variance $\\alpha/\\beta^2$; with unit exposures $\\sum t_i = n$",
        },
        {
          kind: "definitions",
          items: [
            { term: "Pseudo-data", description: "$\\alpha$ events observed over $\\beta$ units of exposure." },
            { term: "Posterior mean", description: "$\\frac{\\alpha + \\sum y_i}{\\beta + n} = \\frac{\\beta}{\\beta + n}\\cdot\\frac{\\alpha}{\\beta} + \\frac{n}{\\beta + n}\\cdot\\bar{y}$." },
            { term: "Eliciting a prior", description: "Match a stated mean $m$ and SD $s$: $\\alpha = m^2/s^2$, $\\beta = m/s^2$." },
            { term: "Jeffreys prior", description: "$p(\\lambda) \\propto \\lambda^{-1/2}$, an improper $\\mathrm{Gamma}(1/2, 0)$; the posterior is proper after any data." },
          ],
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Daily support tickets",
          problem: "Prior $\\lambda \\sim \\mathrm{Gamma}(3, 1)$ tickets per day. Over $5$ days you see $20$ tickets. Find the posterior, then the predictive probability of a quiet day (no tickets).",
          steps: [
            "Posterior: $\\mathrm{Gamma}(3 + 20,\\; 1 + 5) = \\mathrm{Gamma}(23, 6)$, mean $23/6 \\approx 3.83$.",
            "The predictive for tomorrow is negative binomial; $P(\\tilde{y} = 0) = \\left(\\frac{\\beta}{\\beta + 1}\\right)^{\\alpha} = (6/7)^{23}$.",
          ],
          answer: "$\\mathrm{Gamma}(23, 6)$; $P(\\text{quiet day}) \\approx 0.029$.",
        },
      ],
    },
    {
      heading: "The negative binomial predictive",
      blocks: [
        {
          kind: "formula",
          latex: "P(\\tilde{y} = k \\mid y) = \\frac{\\Gamma(\\alpha' + k)}{\\Gamma(\\alpha')\\,k!}\\left(\\frac{\\beta'}{\\beta' + 1}\\right)^{\\alpha'}\\left(\\frac{1}{\\beta' + 1}\\right)^{k}",
          caption: "mean $\\alpha'/\\beta'$, variance $\\frac{\\alpha'}{\\beta'}\\left(1 + \\frac{1}{\\beta'}\\right)$",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Overdispersion from heterogeneity",
          text: "A Poisson has variance equal to its mean. Mixing over an uncertain or varying rate adds $\\operatorname{Var}(\\lambda)$, which is why a Gamma–Poisson (negative binomial) fits real counts whose variance exceeds their mean.",
        },
      ],
    },
  ],
  references: [
    { source: gelman, locator: "§2.6" },
    { source: hoff, locator: "Ch. 3.2" },
  ],
};

export const normalNormalWiki: WikiArticle = {
  conceptId: "normal-normal-model",
  summary:
    "When data are normal with known variance $\\sigma^2$ and the mean gets a normal prior, the posterior is normal. " +
    "Everything is clearest in precisions (inverse variances): they add, and the posterior mean is the precision-weighted " +
    "average of the prior mean and the sample mean.",
  sections: [
    {
      heading: "Known variance",
      blocks: [
        {
          kind: "formula",
          latex: "\\frac{1}{\\tau_n^2} = \\frac{1}{\\tau_0^2} + \\frac{n}{\\sigma^2},\\qquad \\mu_n = \\tau_n^2\\left(\\frac{\\mu_0}{\\tau_0^2} + \\frac{n\\bar{y}}{\\sigma^2}\\right)",
          caption: "prior $\\mu \\sim N(\\mu_0, \\tau_0^2)$, data $y_i \\sim N(\\mu, \\sigma^2)$, posterior $\\mu \\mid y \\sim N(\\mu_n, \\tau_n^2)$",
        },
        {
          kind: "list",
          items: [
            "The prior is worth $\\sigma^2/\\tau_0^2$ observations.",
            "The posterior variance is smaller than both $\\tau_0^2$ and $\\sigma^2/n$, and does not depend on $\\bar{y}$.",
            "As $\\tau_0^2 \\to \\infty$ the posterior becomes $N(\\bar{y}, \\sigma^2/n)$ — numerically the frequentist answer.",
          ],
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Test scores",
          problem: "Prior $\\mu \\sim N(100, 10^2)$. Nine scores with known $\\sigma = 15$ average $\\bar{y} = 110$. Find the posterior and a $95\\%$ credible interval.",
          steps: [
            "Prior precision $1/100 = 0.01$; data precision $9/225 = 0.04$; posterior precision $0.05$, so $\\tau_n^2 = 20$.",
            "$\\mu_n = 20(100 \\times 0.01 + 110 \\times 0.04) = 20 \\times 5.4 = 108$.",
            "Interval: $108 \\pm 1.96\\sqrt{20} = 108 \\pm 8.77$.",
          ],
          answer: "$\\mu \\mid y \\sim N(108, 20)$; $95\\%$ credible interval $(99.2, 116.8)$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Prior–data conflict",
          text: "Because the posterior variance ignores where $\\bar{y}$ lands, a normal prior and normal data that disagree sharply produce a confident compromise neither supports. Check the prior predictive $\\bar{y} \\sim N(\\mu_0, \\tau_0^2 + \\sigma^2/n)$, or use a heavier-tailed prior.",
        },
      ],
    },
    {
      heading: "Unknown variance",
      blocks: [
        {
          kind: "prose",
          text:
            "With $\\sigma^2$ unknown, the conjugate prior is normal–inverse-gamma. Under the reference prior " +
            "$p(\\mu, \\sigma^2) \\propto 1/\\sigma^2$ the marginal posterior is $\\mu \\mid y \\sim \\bar{y} + \\frac{s}{\\sqrt{n}}\\,t_{n - 1}$, " +
            "so the $95\\%$ credible interval coincides with the classical $t$-interval — with a direct probability interpretation.",
        },
        {
          kind: "table",
          headers: ["Setting", "Posterior for $\\mu$"],
          rows: [
            ["$\\sigma^2$ known, normal prior", "$N(\\mu_n, \\tau_n^2)$"],
            ["$\\sigma^2$ known, flat prior", "$N(\\bar{y}, \\sigma^2/n)$"],
            ["$\\sigma^2$ unknown, $p \\propto 1/\\sigma^2$", "$\\bar{y} + (s/\\sqrt{n})\\,t_{n - 1}$"],
          ],
        },
      ],
    },
  ],
  references: [
    { source: gelman, locator: "§2.5, §3.2–3.3" },
    { source: hoff, locator: "Ch. 5" },
  ],
};

export const posteriorPredictiveDistributionWiki: WikiArticle = {
  conceptId: "posterior-predictive-distribution",
  summary:
    "The posterior predictive distribution forecasts a new observation $\\tilde{y}$ by averaging the sampling model over the " +
    "posterior. Its intervals — posterior predictive intervals — answer “where will the next value land?”, and they are " +
    "always wider than credible intervals for a parameter because they carry observation noise as well as parameter " +
    "uncertainty.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "p(\\tilde{y} \\mid y) = \\int p(\\tilde{y} \\mid \\theta)\\,p(\\theta \\mid y)\\,d\\theta",
          caption: "compare the plug-in $p(\\tilde{y} \\mid \\hat{\\theta})$, which pretends $\\theta$ is known",
        },
        {
          kind: "formula",
          latex: "\\operatorname{Var}(\\tilde{y} \\mid y) = \\underbrace{\\mathbb{E}[\\operatorname{Var}(\\tilde{y} \\mid \\theta) \\mid y]}_{\\text{observation noise}} + \\underbrace{\\operatorname{Var}(\\mathbb{E}[\\tilde{y} \\mid \\theta] \\mid y)}_{\\text{parameter uncertainty}}",
          caption: "law of total variance: only the second term shrinks as $n$ grows",
        },
      ],
    },
    {
      heading: "Closed forms",
      blocks: [
        {
          kind: "table",
          headers: ["Model", "Posterior", "Predictive for one new $\\tilde{y}$"],
          rows: [
            ["Bernoulli", "$\\mathrm{Beta}(a', b')$", "$\\mathrm{Bernoulli}(a'/(a' + b'))$; beta-binomial for $m$ trials"],
            ["Poisson", "$\\mathrm{Gamma}(\\alpha', \\beta')$", "Negative binomial, variance $\\frac{\\alpha'}{\\beta'}(1 + 1/\\beta')$"],
            ["Normal, $\\sigma^2$ known", "$N(\\mu_n, \\tau_n^2)$", "$N(\\mu_n, \\tau_n^2 + \\sigma^2)$"],
            ["Normal, $p \\propto 1/\\sigma^2$", "$t_{n - 1}$ for $\\mu$", "$\\bar{y} + s\\sqrt{1 + 1/n}\\;t_{n - 1}$"],
          ],
        },
      ],
    },
    {
      heading: "Worked example: a prediction interval",
      blocks: [
        {
          kind: "example",
          title: "Next test score",
          problem: "Posterior $\\mu \\mid y \\sim N(108, 20)$ and scores are $N(\\mu, 15^2)$. Give a $95\\%$ interval for the next student's score.",
          steps: [
            "Predictive: $N(108,\\; 20 + 225) = N(108, 245)$, SD $\\approx 15.65$.",
            "Interval: $108 \\pm 1.96 \\times 15.65 = 108 \\pm 30.7$.",
            "Compare the credible interval for $\\mu$, $108 \\pm 8.8$ — the predictive interval is $\\sqrt{245/20} = 3.5$ times wider.",
          ],
          answer: "$(77.3, 138.7)$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "By simulation",
          text: "Without a closed form: for each posterior draw $\\theta^{(s)}$ simulate $\\tilde{y}^{(s)} \\sim p(\\tilde{y} \\mid \\theta^{(s)})$, then take sample quantiles of the $\\tilde{y}^{(s)}$. The same recipe predicts sums, maxima or any function of future data.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Plug-in intervals under-cover",
          text: "Using $p(\\tilde{y} \\mid \\hat{\\theta})$ drops the parameter-uncertainty term, so intervals are too narrow — badly so with small samples, far-from-data covariates in regression, or new groups in a hierarchical model.",
        },
      ],
    },
  ],
  references: [
    { source: gelman, locator: "§1.3, §2.5, §3.2" },
    { source: hoff, locator: "§3.1, §5.2" },
  ],
};

export const empiricalBayesWiki: WikiArticle = {
  conceptId: "empirical-bayes",
  summary:
    "When many similar quantities are estimated at once — batting averages, hospital rates, gene effects — the ensemble " +
    "itself reveals what a sensible prior looks like. Empirical Bayes estimates the prior's hyperparameters from the data, " +
    "then shrinks every individual estimate towards the group. The James–Stein estimator shows this beats estimating each " +
    "one separately.",
  sections: [
    {
      heading: "The normal model",
      blocks: [
        {
          kind: "formula",
          latex: "\\theta_i \\sim N(\\mu, \\tau^2),\\quad y_i \\mid \\theta_i \\sim N(\\theta_i, \\sigma^2) \\;\\Longrightarrow\\; y_i \\sim N(\\mu, \\sigma^2 + \\tau^2)",
          caption: "the marginal distribution of the $y_i$ identifies $\\mu$ and $\\tau^2$",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Estimate the hyperparameters: $\\hat{\\mu} = \\bar{y}$, $\\hat{\\tau}^2 = \\max(0,\\; s_y^2 - \\sigma^2)$ (or maximise the marginal likelihood — type-II ML).",
            "Form the shrinkage factor $\\hat{B} = \\sigma^2/(\\sigma^2 + \\hat{\\tau}^2)$.",
            "Estimate each unit: $\\hat{\\theta}_i = \\bar{y} + (1 - \\hat{B})(y_i - \\bar{y})$.",
          ],
        },
        {
          kind: "example",
          title: "Shrinking one estimate",
          problem: "Noise variance $\\sigma^2 = 2$; the $y_i$ have mean $1$ and sample variance $5$. Estimate $\\theta_i$ for $y_i = 6$.",
          steps: [
            "$\\hat{\\tau}^2 = 5 - 2 = 3$, so $\\hat{B} = 2/5 = 0.4$.",
            "$\\hat{\\theta}_i = 1 + 0.6(6 - 1) = 4$.",
          ],
          answer: "$4$ — pulled $40\\%$ of the way back to the grand mean.",
        },
      ],
    },
    {
      heading: "James–Stein",
      blocks: [
        {
          kind: "formula",
          latex: "\\hat{\\theta}_{JS} = \\left(1 - \\frac{(p - 2)\\sigma^2}{\\|y\\|^2}\\right)y",
          caption: "for $y \\sim N_p(\\theta, \\sigma^2 I)$; shrinking towards $\\bar{y}$ instead uses $p - 3$",
        },
        {
          kind: "prose",
          text:
            "For $p \\ge 3$, $\\mathbb{E}\\|\\hat{\\theta}_{JS} - \\theta\\|^2 < p\\sigma^2 = \\mathbb{E}\\|y - \\theta\\|^2$ for every $\\theta$ — the MLE is " +
            "inadmissible. The positive-part version, which truncates the factor at $0$, is better still. The gain is in total " +
            "risk: individual components can be estimated worse.",
        },
      ],
    },
    {
      heading: "Beyond the normal case",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Beta–Binomial EB", description: "Fit $\\mathrm{Beta}(a, b)$ to many success rates by moments ($a + b = m(1 - m)/v - 1$) or marginal likelihood, then update each unit's counts." },
            { term: "Robbins' formula", description: "For Poisson data, $\\mathbb{E}[\\theta \\mid y] = (y + 1)f(y + 1)/f(y)$ with $f$ the empirical count frequencies — no parametric prior at all." },
            { term: "Local FDR", description: "With thousands of $z$-scores, $\\mathrm{fdr}(z) = \\pi_0 f_0(z)/f(z)$ is an empirical Bayes posterior probability that a case is null." },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Plug-in intervals are too narrow",
          text: "Treating $\\hat{\\mu}, \\hat{\\tau}^2$ as known ignores their uncertainty. With few groups, prefer a full hierarchical model with a prior on $(\\mu, \\tau)$, or correct the intervals (Morris; parametric bootstrap).",
        },
      ],
    },
  ],
  references: [
    { source: efron, locator: "Ch. 1–2, 5" },
    { source: "Efron & Morris (1975), Data Analysis Using Stein's Estimator and its Generalizations, JASA", locator: "§1–3" },
    { source: gelman, locator: "§5.4" },
  ],
};

export const bayesianAbTestingWiki: WikiArticle = {
  conceptId: "bayesian-ab-testing",
  summary:
    "A Bayesian A/B test gives each variant's conversion rate a Beta posterior and asks the questions a product decision " +
    "actually needs: how likely is B better, by how much, and what do we stand to lose if we ship it and are wrong?",
  sections: [
    {
      heading: "Setup",
      blocks: [
        {
          kind: "formula",
          latex: "p_A \\mid \\text{data} \\sim \\mathrm{Beta}(a_0 + c_A,\\; b_0 + n_A - c_A),\\qquad p_B \\mid \\text{data} \\sim \\mathrm{Beta}(a_0 + c_B,\\; b_0 + n_B - c_B)",
          caption: "independent Beta–Binomial updates; $\\mathrm{Beta}(1, 1)$ or a prior fitted to past experiments",
        },
        {
          kind: "definitions",
          items: [
            { term: "Probability to beat", description: "$P(p_B > p_A \\mid \\text{data})$ — estimated as the fraction of paired posterior draws with $p_B^{(s)} > p_A^{(s)}$." },
            { term: "Lift", description: "The posterior of $p_B - p_A$ or $p_B/p_A - 1$, summarised by its mean and a credible interval." },
            { term: "Expected loss", description: "$\\mathbb{E}[\\max(p_A - p_B, 0) \\mid \\text{data}]$ for shipping B: the average conversion rate you give up in the scenarios where B is actually worse." },
          ],
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Two landing pages",
          problem: "A converts $120/1000$, B converts $150/1000$. Uniform priors. Should you ship B?",
          steps: [
            "Posteriors: $\\mathrm{Beta}(121, 881)$ with mean $0.121$, and $\\mathrm{Beta}(151, 851)$ with mean $0.151$.",
            "$p_B - p_A$ has mean $0.030$ and SD $\\approx 0.0153$, so $P(p_B > p_A) \\approx \\Phi(1.96) \\approx 0.975$.",
            "Expected loss of shipping B $\\approx 0.00014$ — about $1.4$ conversions per $10\\,000$ visitors in the worst-case scenarios, weighted by their probability.",
          ],
          answer: "Ship B if a loss of $0.014$ percentage points is below your threshold of caring — it almost certainly is.",
        },
      ],
    },
    {
      heading: "Practice",
      blocks: [
        {
          kind: "list",
          items: [
            "Stop when the expected loss of the leading variant drops below a pre-agreed threshold, rather than when a probability crosses $0.95$.",
            "Thompson sampling turns the test into a bandit: send each visitor to the arm whose posterior draw is largest, so traffic flows to likely winners as evidence accrues.",
            "With several variants, report $P(\\text{variant } k \\text{ is best})$ from joint draws.",
            "For revenue, model conversion and order value separately and simulate revenue per visitor.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Peeking is not free",
          text: "The posterior is a valid summary whenever you look (the likelihood principle), but a rule like “stop the moment $P(p_B > p_A) > 0.95$” still produces more false wins over many tests than a fixed-horizon rule. Informative priors and loss-based stopping blunt this.",
        },
      ],
    },
  ],
  references: [
    { source: gelman, locator: "§2.4, §9" },
    { source: "Russo, Van Roy, Kazerouni, Osband & Wen, A Tutorial on Thompson Sampling", locator: "§1–3" },
  ],
};

export const mcmcDiagnosticsWiki: WikiArticle = {
  conceptId: "mcmc-diagnostics",
  summary:
    "MCMC gives correct answers only in the limit. Diagnostics ask two practical questions of a finite run: have the chains " +
    "forgotten where they started and found the same distribution (convergence), and do the draws hold enough independent " +
    "information for the estimates you report (efficiency)? They can reveal failure; they can never certify success.",
  sections: [
    {
      heading: "Convergence",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Warm-up (burn-in)", description: "Early draws discarded while the chain moves from its start into the typical set; in Stan it also tunes step size and mass matrix." },
            { term: "Trace plot", description: "Draws against iteration, one colour per chain. Healthy chains overlap like a “fuzzy caterpillar”; drifts and stuck levels are red flags." },
            { term: "Split-$\\hat{R}$", description: "Compares between- and within-chain variance after splitting each chain in half (to catch trends). Use only if $\\hat{R} < 1.01$." },
          ],
        },
        {
          kind: "formula",
          latex: "\\widehat{\\operatorname{var}}^+ = \\frac{n - 1}{n}W + \\frac{1}{n}B,\\qquad \\hat{R} = \\sqrt{\\widehat{\\operatorname{var}}^+ / W}",
          caption: "$W$: mean within-chain variance; $B$: $n$ times the variance of the chain means",
        },
      ],
    },
    {
      heading: "Efficiency",
      blocks: [
        {
          kind: "formula",
          latex: "\\text{ESS} = \\frac{S}{1 + 2\\sum_{k \\ge 1}\\rho_k},\\qquad \\text{MCSE} = \\frac{\\mathrm{sd}(\\theta \\mid y)}{\\sqrt{\\text{ESS}}}",
          caption: "for an AR(1)-like chain, $1 + 2\\sum\\rho_k = (1 + \\rho)/(1 - \\rho)$",
        },
        {
          kind: "example",
          title: "How precise is the posterior mean?",
          problem: "$4000$ draws from a chain with lag-$1$ autocorrelation $0.9$ (AR(1)-like); posterior SD $2$. Find ESS and MCSE.",
          steps: [
            "$\\text{ESS} = 4000 \\times 0.1/1.9 \\approx 211$.",
            "$\\text{MCSE} = 2/\\sqrt{211} \\approx 0.14$.",
          ],
          answer: "Report the mean to about one decimal place — not four.",
        },
        {
          kind: "list",
          items: [
            "Report both bulk-ESS (centre) and tail-ESS (for interval endpoints); aim for several hundred of each.",
            "Thinning saves storage but never raises ESS for a fixed amount of computation.",
            "For random-walk Metropolis, tune towards an acceptance rate near $0.234$ in high dimensions.",
          ],
        },
      ],
    },
    {
      heading: "HMC-specific warnings",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Divergences mean bias",
          text: "A divergent transition means the leapfrog integrator failed in a region of high curvature — classically the neck of a hierarchical funnel when $\\tau$ is small. The chain then under-explores that region. Fix the geometry (non-centred parameterisation $\\theta_j = \\mu + \\tau z_j$, tighter priors), not the symptoms.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "What diagnostics can't see",
          text: "If every chain misses a mode, $\\hat{R}$ is $1$ and ESS is large. Dispersed initialisations, simulation-based calibration and understanding the model's geometry are the defences.",
        },
      ],
    },
  ],
  references: [
    { source: gelman, locator: "§11.4–11.5" },
    { source: "Vehtari, Gelman, Simpson, Carpenter & Bürkner (2021), Rank-Normalization, Folding, and Localization: An Improved R̂", locator: "§2–4" },
  ],
};

export const bayesianModelWikis: WikiArticle[] = [
  betaBinomialWiki,
  gammaPoissonWiki,
  normalNormalWiki,
  posteriorPredictiveDistributionWiki,
  empiricalBayesWiki,
  bayesianAbTestingWiki,
  mcmcDiagnosticsWiki,
];
