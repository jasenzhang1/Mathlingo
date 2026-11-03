import type { WikiArticle } from "./types";

/**
 * The Empirical Bayes chapter beyond its opening lesson: parametric empirical
 * Bayes, rates and proportions, intervals, Robbins’ and Tweedie’s formulas,
 * the local false discovery rate and g-modeling. Collected into `bayesianWikis`.
 */

const efron = "Efron, Large-Scale Inference";
const casi = "Efron & Hastie, Computer Age Statistical Inference";
const gelman = "Gelman, Carlin, Stern, Dunson, Vehtari & Rubin, Bayesian Data Analysis (3rd ed.)";

export const parametricEmpiricalBayesWiki: WikiArticle = {
  conceptId: "parametric-empirical-bayes",
  summary:
    "Parametric empirical Bayes assumes the units’ true values come from a normal prior $\\mathcal{N}(\\mu, \\tau^2)$ whose two " +
    "parameters are unknown, estimates them from all the units at once, and then shrinks each unit’s estimate toward the group. " +
    "The Efron–Morris estimator is the classic form, and the James–Stein theorem guarantees it lowers total risk.",
  sections: [
    {
      heading: "Model and estimated shrinkage",
      blocks: [
        {
          kind: "formula",
          latex: "\\theta_i \\sim \\mathcal{N}(\\mu, \\tau^2),\\quad y_i \\mid \\theta_i \\sim \\mathcal{N}(\\theta_i, \\sigma^2),\\quad \\mathbb{E}[\\theta_i \\mid y_i] = \\mu + (1 - B)(y_i - \\mu),\\quad B = \\frac{\\sigma^2}{\\sigma^2 + \\tau^2}",
          caption: "with known hyperparameters, each posterior mean moves a fraction $B$ of the way from $y_i$ to $\\mu$",
        },
        {
          kind: "formula",
          latex: "\\hat{\\theta}_i^{\\text{EM}} = \\bar{y} + (1 - \\hat{B})(y_i - \\bar{y}),\\qquad \\hat{B} = \\frac{(k - 3)\\sigma^2}{\\sum_{i=1}^k(y_i - \\bar{y})^2}",
          caption: "the Efron–Morris estimator; $k - 3$ rather than $k - 1$ makes $\\hat{B}$ unbiased for $B$ when $\\mu$ is estimated",
        },
        {
          kind: "example",
          title: "Ten units",
          problem: "$k = 10$, $\\sigma^2 = 1$, $\\sum(y_i - \\bar{y})^2 = 28$, $\\bar{y} = 0.5$. Estimate $\\theta_i$ for $y_i = 1.3$.",
          steps: ["$\\hat{B} = 7/28 = 0.25$.", "$\\hat{\\theta}_i = 0.5 + 0.75(1.3 - 0.5) = 1.1$."],
          answer: "$1.1$.",
        },
      ],
    },
    {
      heading: "Why shrinkage wins",
      blocks: [
        {
          kind: "prose",
          text:
            "With known hyperparameters the Bayes risk per unit is $\\sigma^2\\tau^2/(\\sigma^2 + \\tau^2) = (1 - B)\\sigma^2$, against $\\sigma^2$ " +
            "for the raw estimates. Estimating $\\mu$ and $\\tau^2$ costs a little of that gain, but for $k \\ge 4$ the Efron–Morris estimator " +
            "still beats the raw $y_i$ in total squared error for every configuration of the $\\theta_i$ (the James–Stein result).",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Total risk, not every unit",
          text: "Units far from the group (a genuine outlier) can be estimated worse: the bias $-B(\\theta_i - \\mu)$ grows with the distance. Limited-translation rules cap how far any single estimate is moved.",
        },
      ],
    },
    {
      heading: "Extensions",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Unequal variances", description: "$B_i = \\sigma_i^2/(\\sigma_i^2 + \\tau^2)$: noisier units shrink more; $\\mu$ is estimated by a weighted mean with weights $1/(\\sigma_i^2 + \\tau^2)$, and $\\tau^2$ by marginal maximum likelihood." },
            { term: "Regression shrinkage (Fay–Herriot)", description: "Replace $\\mu$ by $\\mathbf{x}_i^{\\top}\\boldsymbol{\\beta}$, so each unit shrinks toward a regression prediction; used for small-area estimates." },
            { term: "Marginal (type-II) likelihood", description: "$y_i \\sim \\mathcal{N}(\\mu, \\sigma^2 + \\tau^2)$ marginally; maximising this over $(\\mu, \\tau^2)$ is an alternative to moments." },
          ],
        },
      ],
    },
  ],
  references: [
    { source: casi, locator: "Ch. 7" },
    { source: efron, locator: "Ch. 1" },
    { source: "Efron & Morris (1975), Data Analysis Using Stein’s Estimator and its Generalizations, JASA", locator: "§1–4" },
  ],
};

export const empiricalBayesRatesWiki: WikiArticle = {
  conceptId: "empirical-bayes-rates-and-proportions",
  summary:
    "When each unit reports successes out of trials, or events over an exposure, empirical Bayes fits a beta or gamma prior to " +
    "the whole collection and updates each unit with its own counts. Small units are pulled strongly toward the group; large ones " +
    "keep their own rate. This gives fairer rankings of hospitals, players or ads than raw rates.",
  sections: [
    {
      heading: "Beta–binomial",
      blocks: [
        {
          kind: "formula",
          latex: "p_i \\sim \\text{Beta}(a, b),\\quad y_i \\mid p_i \\sim \\text{Binomial}(n_i, p_i)\\;\\Longrightarrow\\; \\mathbb{E}[p_i \\mid y_i] = \\frac{y_i + a}{n_i + a + b}",
          caption: "a weighted average of $y_i/n_i$ (weight $n_i/(n_i + a + b)$) and the prior mean $a/(a + b)$",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Estimate the mean $m$ and variance of the observed proportions.",
            "Subtract the average sampling variance $m(1 - m)/n$ to get the variance $v$ of the true rates.",
            "Set $a + b = m(1 - m)/v - 1$ and $a = m(a + b)$, or maximise the beta-binomial marginal likelihood.",
          ],
        },
        {
          kind: "example",
          title: "Ranking two units",
          problem: "Prior $\\text{Beta}(4, 16)$. Unit A has $2/4$ successes, unit B $40/100$. Which has the higher estimated rate?",
          steps: ["A: $(2 + 4)/(4 + 20) = 0.25$.", "B: $(40 + 4)/(100 + 20) \\approx 0.367$."],
          answer: "B, although A’s raw rate ($0.5$) is higher.",
        },
      ],
    },
    {
      heading: "Gamma–Poisson and credibility",
      blocks: [
        {
          kind: "formula",
          latex: "\\lambda_i \\sim \\text{Gamma}(\\alpha, \\beta),\\quad y_i \\mid \\lambda_i \\sim \\text{Poisson}(\\lambda_it_i)\\;\\Longrightarrow\\; \\mathbb{E}[\\lambda_i \\mid y_i] = \\frac{y_i + \\alpha}{t_i + \\beta}",
          caption: "the same pseudo-count logic for event rates; $\\alpha = m^2/v$ and $\\beta = m/v$ by moments",
        },
        {
          kind: "prose",
          text:
            "Actuarial credibility (Bühlmann) is the linear version: estimate $Z\\bar{x}_i + (1 - Z)\\mu$ with $Z = n/(n + k)$ and " +
            "$k = \\sigma^2/\\tau^2$, the ratio of within-unit to between-unit variance. It is exactly the Bayes rule for these conjugate models.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Disease mapping",
          text: "With observed cases $O_i$ and expected cases $E_i$, a $\\text{Gamma}(\\alpha, \\alpha)$ prior on the relative risk gives $(O_i + \\alpha)/(E_i + \\alpha)$: small areas no longer dominate the extremes of the map.",
        },
      ],
    },
  ],
  references: [
    { source: casi, locator: "§6.1, Ch. 7" },
    { source: gelman, locator: "§2.7, §5.3" },
    { source: "Bühlmann & Gisler, A Course in Credibility Theory", locator: "Ch. 3–4" },
  ],
};

export const empiricalBayesIntervalsWiki: WikiArticle = {
  conceptId: "empirical-bayes-intervals",
  summary:
    "Plugging estimated hyperparameters into the Bayes interval treats them as known, so the intervals are too narrow and cover " +
    "less often than claimed, especially with few units or when a unit is far from the centre. Morris’s correction, the parametric " +
    "bootstrap and full hierarchical Bayes each add back the missing uncertainty.",
  sections: [
    {
      heading: "The naive interval and its flaw",
      blocks: [
        {
          kind: "formula",
          latex: "\\hat{\\theta}_i \\pm 1.96\\sqrt{(1 - \\hat{B})\\sigma^2}",
          caption: "the plug-in interval; with $\\hat{B} = 1$ it collapses to a point",
        },
        {
          kind: "prose",
          text:
            "The variance $(1 - B)\\sigma^2$ is correct only if $\\mu$ and $B$ are known. The estimate $\\hat{\\theta}_i$ also varies because " +
            "$\\hat{\\mu}$ and $\\hat{B}$ vary, and that variation matters most for units far from $\\bar{y}$, which are moved the most.",
        },
      ],
    },
    {
      heading: "Morris’s correction",
      blocks: [
        {
          kind: "formula",
          latex: "\\widehat{\\text{Var}}(\\theta_i \\mid \\mathbf{y}) \\approx \\sigma^2\\left(1 - \\frac{k - 1}{k}\\hat{B}\\right) + \\frac{2}{k - 3}\\hat{B}^2(y_i - \\bar{y})^2",
          caption: "the first term adds uncertainty in $\\hat{\\mu}$; the second, uncertainty in $\\hat{B}$, grows with the distance from the centre",
        },
        {
          kind: "example",
          title: "How much wider?",
          problem: "$k = 10$, $\\sigma^2 = 1$, $\\hat{B} = 0.25$, $y_i - \\bar{y} = 2$.",
          steps: [
            "Naive variance: $0.75$.",
            "Morris: $1 - 0.9 \\times 0.25 + \\frac{2}{7}(0.0625)(4) \\approx 0.846$.",
          ],
          answer: "About $13\\%$ more variance; half-width $1.80$ instead of $1.70$.",
        },
      ],
    },
    {
      heading: "Other remedies",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Parametric bootstrap", description: "Simulate new data from the fitted model, re-estimate the hyperparameters and the shrunken estimates, and add the spread of the refits to the plug-in variance." },
            { term: "Hierarchical Bayes", description: "Put a prior on $(\\mu, \\tau)$ and integrate: $\\text{Var}(\\theta_i \\mid \\mathbf{y}) = \\mathbb{E}_\\tau[\\text{Var}(\\theta_i \\mid \\mathbf{y}, \\tau)] + \\text{Var}_\\tau[\\mathbb{E}(\\theta_i \\mid \\mathbf{y}, \\tau)]$." },
            { term: "Coverage checks", description: "Simulate from plausible priors and count how often the intervals cover; $1{,}900$ replications give a Monte Carlo standard error of $0.005$ at $95\\%$." },
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Morris (1983), Parametric Empirical Bayes Inference: Theory and Applications, JASA", locator: "§3–5" },
    { source: casi, locator: "Ch. 7, §10.4" },
    { source: gelman, locator: "§5.4–5.5" },
  ],
};

export const robbinsFormulaWiki: WikiArticle = {
  conceptId: "robbins-formula",
  summary:
    "Robbins showed that for Poisson data the Bayes posterior mean can be estimated with no assumption at all about the prior: it " +
    "is a ratio of neighbouring count frequencies. The same identity gives the Good–Turing estimate of unseen species. It is simple " +
    "and assumption-free, but erratic wherever counts are sparse.",
  sections: [
    {
      heading: "The formula",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbb{E}[\\theta \\mid x] = \\frac{\\int\\theta\\,\\frac{e^{-\\theta}\\theta^x}{x!}\\,g(\\theta)\\,d\\theta}{\\int\\frac{e^{-\\theta}\\theta^x}{x!}\\,g(\\theta)\\,d\\theta} = (x + 1)\\frac{f(x + 1)}{f(x)}",
          caption: "using $\\theta\\cdot\\theta^x/x! = (x + 1)\\theta^{x+1}/(x + 1)!$; estimate $f$ by the observed proportions",
        },
        {
          kind: "table",
          headers: ["Claims $x$", "$0$", "$1$", "$2$", "$3$", "$4$", "$5$", "$6$", "$7$"],
          rows: [
            ["Policyholders", "$7{,}840$", "$1{,}317$", "$239$", "$42$", "$14$", "$4$", "$4$", "$1$"],
            ["Robbins estimate", "$0.168$", "$0.363$", "$0.527$", "$1.33$", "$1.43$", "$6.00$", "$1.75$", ""],
          ],
          caption: "Efron and Hastie’s insurance data: estimates are sensible for small $x$ and erratic for large $x$",
        },
        {
          kind: "example",
          title: "One claim last year",
          problem: "Using the table, estimate next year’s expected claims for a policyholder who made one claim.",
          steps: [
            "$f(2)/f(1) = 239/1{,}317$ (the total $9{,}461$ cancels).",
            "$\\mathbb{E}[\\theta \\mid x = 1] = 2 \\times 239/1{,}317 \\approx 0.363$.",
          ],
          answer: "About $0.36$ claims, far below the raw estimate of $1$.",
        },
      ],
    },
    {
      heading: "Unseen species",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Good–Turing", description: "The probability that the next observation is a new species is about $n_1/N$, with $n_1$ the number of species seen once; adjusted counts are $r^{*} = (r + 1)n_{r+1}/n_r$." },
            { term: "Good–Toulmin", description: "Sampling $t$ times as long finds about $\\sum_{k \\ge 1}(-1)^{k+1}t^kn_k$ new species; reliable for $t \\le 1$, wild beyond." },
            { term: "Chao1", description: "A lower bound for total richness, $S_{\\text{obs}} + n_1^2/(2n_2)$." },
          ],
        },
      ],
    },
    {
      heading: "Strengths and limits",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Sparse tails",
          text: "Where $f(x)$ and $f(x + 1)$ rest on a handful of units, the ratio jumps around and need not be monotone; if $f(x + 1) = 0$ the estimate is $0$. Smooth $f$ (Poisson regression on the counts) or switch to a parametric or g-modeling fit.",
        },
        {
          kind: "prose",
          text:
            "As the number of units grows, the risk of Robbins’ estimator converges to that of the true Bayes rule, whatever the prior: " +
            "it learns from the experience of others with a frequentist guarantee.",
        },
      ],
    },
  ],
  references: [
    { source: casi, locator: "§6.1–6.2" },
    { source: "Robbins (1956), An Empirical Bayes Approach to Statistics", locator: "§1–3" },
    { source: efron, locator: "§11.5" },
  ],
};

export const tweediesFormulaWiki: WikiArticle = {
  conceptId: "tweedies-formula",
  summary:
    "Tweedie’s formula writes the posterior mean of a normal mean as the observation plus a correction from the slope of the log " +
    "marginal density. Since the marginal can be estimated from thousands of observations, it gives empirical Bayes estimates with no " +
    "prior specified, and it automatically corrects the winner’s curse for units selected for being extreme.",
  sections: [
    {
      heading: "The formula",
      blocks: [
        {
          kind: "formula",
          latex: "z \\mid \\mu \\sim \\mathcal{N}(\\mu, \\sigma^2):\\quad \\mathbb{E}[\\mu \\mid z] = z + \\sigma^2\\,l'(z),\\quad \\text{Var}(\\mu \\mid z) = \\sigma^2\\left(1 + \\sigma^2\\,l''(z)\\right),\\quad l = \\log f",
          caption: "valid for any prior; the prior enters only through the marginal density $f$",
        },
        {
          kind: "prose",
          text:
            "Differentiating $f(z) = \\int\\varphi_\\sigma(z - \\mu)g(\\mu)\\,d\\mu$ gives $f'(z)/f(z) = (\\mathbb{E}[\\mu \\mid z] - z)/\\sigma^2$. " +
            "With a $\\mathcal{N}(0, A)$ prior, $l'(z) = -z/(A + \\sigma^2)$ and the formula reduces to linear James–Stein shrinkage; with a " +
            "sparse prior it shrinks moderate $z$ heavily and large $z$ lightly.",
        },
      ],
    },
    {
      heading: "Estimating $l'$: Lindsey’s method",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Bin the $N$ $z$-values into a histogram.",
            "Fit Poisson regression of the bin counts on a low-degree polynomial in $z$: $\\log f(z) \\approx \\beta_0 + \\beta_1z + \\dots + \\beta_Jz^J$.",
            "Differentiate the fitted polynomial and apply Tweedie’s formula.",
          ],
        },
        {
          kind: "example",
          title: "A quadratic fit",
          problem: "$l(z) = \\beta_0 + 0.1z - 0.3z^2$, $\\sigma^2 = 1$. Estimate $\\mu$ for $z = 2$.",
          steps: ["$l'(2) = 0.1 - 0.6 \\times 2 = -1.1$.", "$\\mathbb{E}[\\mu \\mid z] = 2 - 1.1 = 0.9$."],
          answer: "$0.9$, with posterior variance $1 + 2(-0.3) = 0.4$.",
        },
      ],
    },
    {
      heading: "Selection bias",
      blocks: [
        {
          kind: "callout",
          tone: "insight",
          title: "Why selection does not matter",
          text: "Choosing the top $z$-values picks units with lucky noise, so their raw $z$ overstate $\\mu$. The posterior mean conditions on the exact $z$, and a selection rule based only on $z$ adds no information, so $\\mathbb{E}[\\mu \\mid z]$ needs no further correction.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Assumptions",
          text: "A known, common $\\sigma$; exchangeable units; a smooth estimate of $f$. Correlated $z$-values, the wrong $\\sigma$ or a noisy fit in the far tail all degrade the estimates.",
        },
      ],
    },
  ],
  references: [
    { source: efron, locator: "Ch. 11" },
    { source: "Efron (2011), Tweedie’s Formula and Selection Bias, JASA", locator: "§1–4" },
    { source: casi, locator: "§6.3, §15.6" },
  ],
};

export const localFdrWiki: WikiArticle = {
  conceptId: "local-false-discovery-rate",
  summary:
    "With thousands of simultaneous tests, the two-groups model treats each case as null or non-null with prior probabilities " +
    "$\\pi_0$ and $\\pi_1$. The local false discovery rate is the posterior probability that a case is null given its $z$-value, " +
    "estimated from the histogram of all the $z$-values. Its tail-area version connects directly to Benjamini–Hochberg.",
  sections: [
    {
      heading: "The two-groups model",
      blocks: [
        {
          kind: "formula",
          latex: "f(z) = \\pi_0f_0(z) + \\pi_1f_1(z),\\qquad \\text{fdr}(z) = \\frac{\\pi_0f_0(z)}{f(z)},\\qquad \\text{Fdr}(z) = \\frac{\\pi_0F_0(z)}{F(z)}",
          caption: "$F_0$ and $F$ are tail probabilities; Fdr is the $f$-weighted average of fdr over the tail",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Estimate $f$ by Lindsey’s method (Poisson regression on histogram counts).",
            "Take the theoretical null $\\mathcal{N}(0, 1)$, or estimate an empirical null from the central $z$-values.",
            "Estimate $\\pi_0$ from the centre, where almost every case is null, and report cases with $\\widehat{\\text{fdr}}(z) \\le 0.2$.",
          ],
        },
        {
          kind: "example",
          title: "A normal alternative",
          problem: "Null $\\mathcal{N}(0, 1)$, alternative $\\mathcal{N}(3, 1)$, $\\pi_0 = 0.9$. Find $\\text{fdr}(3)$.",
          steps: [
            "$\\pi_0f_0(3) = 0.9\\varphi(3) \\approx 0.00399$; $\\pi_1f_1(3) = 0.1\\varphi(0) \\approx 0.0399$.",
            "$\\text{fdr}(3) = 0.00399/(0.00399 + 0.0399) \\approx 0.091$.",
          ],
          answer: "About $9\\%$ chance of being null.",
        },
      ],
    },
    {
      heading: "Benjamini–Hochberg as empirical Bayes",
      blocks: [
        {
          kind: "prose",
          text:
            "BH at level $q$ rejects every $z$-value whose estimated $\\widehat{\\text{Fdr}}(z) = F_0(z)/\\hat{F}(z) \\le q$, where $\\hat{F}$ is the " +
            "observed tail proportion and $\\pi_0$ is set to $1$. The rejected set is then expected to be about a fraction $q$ null, but " +
            "its boundary cases have local fdr well above $q$.",
        },
      ],
    },
    {
      heading: "The empirical null",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "When $\\mathcal{N}(0, 1)$ is wrong",
          text: "Correlation, hidden covariates and failed assumptions widen or shift the central bulk. If the null is really $\\mathcal{N}(0, 1.3^2)$ but $\\mathcal{N}(0, 1)$ is used, $6{,}000$ null cases yield about $63$ $z$-values above $3$ instead of $8$, all reported as discoveries.",
        },
        {
          kind: "prose",
          text:
            "Central matching fits a quadratic to $\\log\\hat{f}$ near $z = 0$; its centre, curvature and height give $\\delta_0$, $\\sigma_0$ and $\\pi_0$. " +
            "Separate analyses are needed when subgroups of cases differ (the relevance problem).",
        },
      ],
    },
  ],
  references: [
    { source: efron, locator: "Ch. 2, 4–6, 10" },
    { source: casi, locator: "Ch. 15" },
    { source: "Benjamini & Hochberg (1995), Controlling the False Discovery Rate, JRSS B", locator: "§2–3" },
  ],
};

export const gModelingWiki: WikiArticle = {
  conceptId: "g-modeling-deconvolution",
  summary:
    "f-modeling (Robbins, Tweedie) estimates the marginal density of the observations; g-modeling estimates the prior $g$ itself by " +
    "deconvolution. Once $\\hat{g}$ is in hand, any posterior quantity follows from Bayes’ rule, coherently and for units with " +
    "different noise levels, at the price of an ill-posed inverse problem that needs regularisation.",
  sections: [
    {
      heading: "Deconvolution",
      blocks: [
        {
          kind: "formula",
          latex: "f(x) = \\int p(x \\mid \\theta)\\,g(\\theta)\\,d\\theta,\\qquad \\hat{g} = \\arg\\max_g\\sum_{i=1}^n\\log\\int p(x_i \\mid \\theta)\\,g(\\theta)\\,d\\theta",
          caption: "the known noise model blurs $g$ into $f$; maximising the marginal likelihood over all $g$ gives the NPMLE",
        },
        {
          kind: "definitions",
          items: [
            { term: "NPMLE (Kiefer–Wolfowitz)", description: "The unrestricted maximiser is discrete with few atoms; it is tuning-free and gives excellent posterior means, though a poor picture of $g$’s shape." },
            { term: "EM on a grid", description: "$g_j^{\\text{new}} = \\frac{1}{n}\\sum_i\\frac{g_jp(x_i \\mid \\theta_j)}{\\sum_kg_kp(x_i \\mid \\theta_k)}$; each step never lowers the likelihood. Convex solvers are faster." },
            { term: "Efron’s g-model", description: "$\\log g(\\theta_j) = \\mathbf{Q}_j^{\\top}\\boldsymbol{\\alpha} - \\phi(\\boldsymbol{\\alpha})$ with a spline basis $\\mathbf{Q}$, fitted by penalised maximum likelihood; smooth, with delta-method standard errors." },
          ],
        },
        {
          kind: "example",
          title: "A two-point prior",
          problem: "$g$ puts $0.5$ on each of $\\theta = 0$ and $\\theta = 2$; $x \\mid \\theta \\sim \\text{Poisson}(\\theta)$. Find $\\mathbb{E}[\\theta \\mid x = 0]$.",
          steps: [
            "$f(0) = 0.5 + 0.5e^{-2} \\approx 0.568$.",
            "$\\mathbb{E}[\\theta \\mid 0] = 2 \\times 0.5e^{-2}/f(0) \\approx 0.238$.",
          ],
          answer: "$0.238$.",
        },
      ],
    },
    {
      heading: "f- versus g-modeling",
      blocks: [
        {
          kind: "table",
          headers: ["", "f-modeling", "g-modeling"],
          rows: [
            ["Estimates", "Marginal $f$", "Prior $g$"],
            ["Targets", "Posterior means and variances via identities", "Any posterior quantity"],
            ["Heteroskedastic noise", "Awkward", "Natural: each unit uses its own likelihood"],
            ["Difficulty", "Smooth, well-posed; erratic in sparse tails", "Ill-posed; needs a penalty or discreteness"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Ill-posedness",
          text: "Normal noise damps the fine structure of $g$ by $e^{-\\sigma^2\\omega^2/2}$ in frequency; undoing it amplifies noise, so $g$ converges slowly and only its broad shape is recoverable. Check a fit by comparing its implied marginal with the histogram of $x$.",
        },
      ],
    },
  ],
  references: [
    { source: casi, locator: "Ch. 21" },
    { source: "Efron (2016), Empirical Bayes Deconvolution Estimates, Biometrika", locator: "§1–4" },
    { source: "Koenker & Mizera (2014), Convex Optimization, Shape Constraints, Compound Decisions, and Empirical Bayes Rules, JASA", locator: "§2–3" },
  ],
};

export const empiricalBayesChapterWikis: WikiArticle[] = [
  parametricEmpiricalBayesWiki,
  empiricalBayesRatesWiki,
  empiricalBayesIntervalsWiki,
  robbinsFormulaWiki,
  tweediesFormulaWiki,
  localFdrWiki,
  gModelingWiki,
];
