import type { WikiArticle } from "../types";

/**
 * Doubly stochastic point processes, closing the "Point Processes" section:
 * the general Cox process (a Poisson process driven by a random intensity)
 * and its most-used special case, the log-Gaussian Cox process, whose
 * log-intensity is a Gaussian process.
 */

export const coxProcessWiki: WikiArticle = {
  conceptId: "cox-process",
  summary:
    "A Cox process is a Poisson process whose intensity is itself random. First nature draws an intensity " +
    "$\\Lambda(t)$ — a random, nonnegative function — and then, given $\\Lambda$, events fall as a non-homogeneous " +
    "Poisson process with that rate. The extra layer of randomness makes counts overdispersed (variance larger " +
    "than mean) and makes events cluster where the hidden intensity happens to be high. The model is called " +
    "“doubly stochastic” for this reason.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Cox process", description: "Let $\\Lambda = \\{\\Lambda(s) : s \\in S\\}$ be a nonnegative random field. $N$ is a Cox process driven by $\\Lambda$ if, conditional on $\\Lambda$, $N$ is a Poisson process with intensity function $\\Lambda$." },
            { term: "Integrated intensity", description: "For a region $A$, $\\Lambda(A) = \\int_A \\Lambda(s)\\,ds$. Conditional on $\\Lambda$, $N(A) \\sim \\operatorname{Poisson}(\\Lambda(A))$." },
            { term: "Mixed Poisson process", description: "The special case $\\Lambda(s) \\equiv L$ for a single random variable $L$: one random rate for the whole process." },
          ],
        },
        {
          kind: "prose",
          text:
            "Simulation follows the definition: draw a realisation of $\\Lambda$, then simulate a non-homogeneous Poisson " +
            "process with that intensity, for example by thinning a homogeneous process with rate $\\max_s \\Lambda(s)$.",
        },
      ],
    },
    {
      heading: "Moments and overdispersion",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbb{E}[N(A)] = \\mathbb{E}[\\Lambda(A)], \\qquad \\operatorname{Var}(N(A)) = \\mathbb{E}[\\Lambda(A)] + \\operatorname{Var}(\\Lambda(A))",
          caption: "the law of total variance: Poisson noise plus the variability of the intensity",
        },
        {
          kind: "list",
          items: [
            "Because $\\operatorname{Var}(\\Lambda(A)) \\ge 0$, a Cox process is never underdispersed: its counts are Poisson only when $\\Lambda(A)$ is deterministic.",
            "Mixed Poisson with $L \\sim \\operatorname{Gamma}(k, \\theta)$ (shape $k$, rate $\\theta$): $N(0, t]$ is negative binomial, with mean $kt/\\theta$ and variance $kt/\\theta + kt^2/\\theta^2$.",
            "Covariances between regions come entirely from the intensity: $\\operatorname{Cov}(N(A), N(B)) = \\operatorname{Cov}(\\Lambda(A), \\Lambda(B))$ for disjoint $A$ and $B$.",
            "The pair-correlation function $g(s, t) = \\mathbb{E}[\\Lambda(s)\\Lambda(t)]/(\\mathbb{E}\\Lambda(s)\\,\\mathbb{E}\\Lambda(t))$ is at least $1$ whenever the intensity is positively correlated — the signature of clustering.",
          ],
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "A two-regime call centre",
          problem:
            "Each day is independently “busy” (rate $3$ calls per hour) or “quiet” (rate $1$ per hour) with probability $\\tfrac{1}{2}$ each. Find the mean and variance of the number of calls in a $2$-hour window.",
          steps: [
            "Conditional on the regime, $N \\sim \\operatorname{Poisson}(2L)$ with $L \\in \\{1, 3\\}$.",
            "$\\mathbb{E}[N] = 2\\,\\mathbb{E}[L] = 2 \\times 2 = 4$.",
            "$\\operatorname{Var}(2L) = 4\\operatorname{Var}(L) = 4 \\times 1 = 4$, since $L$ is $2 \\pm 1$ with equal probability.",
            "$\\operatorname{Var}(N) = \\mathbb{E}[2L] + \\operatorname{Var}(2L) = 4 + 4 = 8$.",
          ],
          answer: "Mean $4$, variance $8$ — twice what a Poisson count with the same mean would have.",
        },
      ],
    },
    {
      heading: "Common families",
      blocks: [
        {
          kind: "table",
          headers: ["Model", "Random intensity", "Typical use"],
          rows: [
            ["Mixed Poisson", "One random level $L$", "Insurance claim counts with heterogeneous risk"],
            ["Markov-modulated Poisson", "$\\Lambda(t) = \\lambda_{J(t)}$ for a hidden Markov chain $J$", "Bursty network traffic, regime-switching arrivals"],
            ["Shot-noise Cox (Neyman–Scott)", "Sum of kernels around random centres", "Seedlings clustered around parent trees"],
            ["Log-Gaussian Cox", "$\\Lambda = e^{Z}$, $Z$ a Gaussian process", "Spatial epidemiology, ecology, crime maps"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Cox versus Hawkes",
          text:
            "Both produce clustered events, but for different reasons. In a Cox process the clustering is exogenous: a hidden " +
            "environment raises the rate, and events don't influence each other. In a Hawkes process it is endogenous: each " +
            "event raises the future rate. Given the intensity path, Cox events are independent; Hawkes events never are.",
        },
      ],
    },
    {
      heading: "Inference",
      blocks: [
        {
          kind: "prose",
          text:
            "Given the intensity, the likelihood of events $x_1, \\ldots, x_n$ in a window $W$ is the Poisson-process likelihood " +
            "$\\exp(-\\Lambda(W))\\prod_i \\Lambda(x_i)$. The marginal likelihood averages this over the law of $\\Lambda$, " +
            "and that expectation is rarely available in closed form. In practice one either treats $\\Lambda$ as a latent " +
            "variable (MCMC, EM, Laplace or variational approximations) or fits second-order summaries — the $K$-function or " +
            "pair-correlation function — by minimum contrast.",
        },
      ],
    },
  ],
  references: [
    { source: "Cox, Some statistical methods connected with series of events (JRSS B, 1955)", locator: "§3" },
    { source: "Møller & Waagepetersen, Statistical Inference and Simulation for Spatial Point Processes (2004)", locator: "Ch. 5" },
    { source: "Daley & Vere-Jones, An Introduction to the Theory of Point Processes, Vol. I (2nd ed.)", locator: "§6.2" },
  ],
};

export const logGaussianCoxProcessWiki: WikiArticle = {
  conceptId: "log-gaussian-cox-process",
  summary:
    "A log-Gaussian Cox process (LGCP) is a Cox process whose intensity is the exponential of a Gaussian process: " +
    "$\\Lambda(s) = \\exp(Z(s))$. Exponentiating keeps the intensity positive. The Gaussian process gives a flexible " +
    "smooth surface, controlled by a mean function and a covariance kernel. Its moments come out in closed form — " +
    "the pair-correlation function is simply $\\exp(C(r))$ — so the LGCP is the default model for clustered spatial " +
    "point patterns in ecology, epidemiology and criminology.",
  sections: [
    {
      heading: "Definition and moments",
      blocks: [
        {
          kind: "formula",
          latex: "\\Lambda(s) = \\exp\\{Z(s)\\}, \\qquad Z \\sim \\mathcal{GP}\\big(\\mu(s), C(s, s')\\big)",
          caption: "a Cox process driven by a log-Gaussian random field",
        },
        {
          kind: "list",
          items: [
            "First-order intensity: $\\rho(s) = \\mathbb{E}[e^{Z(s)}] = \\exp\\{\\mu(s) + \\tfrac{1}{2}\\sigma^2(s)\\}$, with $\\sigma^2(s) = C(s, s)$ — the lognormal mean.",
            "Second-order intensity: $\\rho^{(2)}(s, s') = \\rho(s)\\rho(s')\\exp\\{C(s, s')\\}$.",
            "Pair-correlation function: $g(s, s') = \\exp\\{C(s, s')\\}$. For a stationary isotropic kernel, $g(r) = \\exp\\{C(r)\\}$, which exceeds $1$ wherever $C(r) > 0$.",
            "Covariates enter through the mean: $\\mu(s) = \\mathbf{x}(s)^\\top\\boldsymbol{\\beta}$, so $e^{\\beta_j}$ is the multiplicative effect of a covariate on the intensity.",
          ],
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Reading off intensity and clustering",
          problem:
            "An LGCP on the plane has constant mean $\\mu = -1$ and exponential covariance $C(r) = 2e^{-r/5}$. Find the expected number of points per unit area and the pair correlation at distance $r = 0$ and $r = 5$.",
          steps: [
            "$\\sigma^2 = C(0) = 2$, so $\\rho = \\exp(-1 + \\tfrac{1}{2} \\cdot 2) = e^0 = 1$ point per unit area.",
            "$g(0) = \\exp(C(0)) = e^2 \\approx 7.39$: pairs at very short range are over seven times as common as under complete spatial randomness.",
            "$g(5) = \\exp(2e^{-1}) = \\exp(0.736) \\approx 2.09$.",
          ],
          answer: "$\\rho = 1$; $g(0) \\approx 7.39$ and $g(5) \\approx 2.09$, decaying toward $1$ at long range.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Mean and variance are entangled",
          text:
            "Raising the field variance $\\sigma^2$ with $\\mu$ fixed also raises the intensity, through the $\\tfrac{1}{2}\\sigma^2$ " +
            "term. To compare clustering strengths at the same average intensity, set $\\mu = \\log\\rho - \\tfrac{1}{2}\\sigma^2$.",
        },
      ],
    },
    {
      heading: "Fitting an LGCP",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Discretise the window into cells $j$ of area $a_j$. Then $y_j \\mid z_j \\sim \\operatorname{Poisson}(a_je^{z_j})$ with $\\mathbf{z} \\sim N(\\boldsymbol{\\mu}, \\Sigma)$ — a latent Gaussian model.",
            "The posterior of $\\mathbf{z}$ has no closed form. Standard tools are MCMC with gradient information (MALA or HMC), the integrated nested Laplace approximation (INLA, often with an SPDE representation of a Matérn field), and variational approximations.",
            "For the covariance parameters, a fast alternative is minimum contrast: match the empirical pair-correlation function or $K$-function to $\\exp(C(r))$.",
            "Predict the intensity surface via the posterior of $e^{Z(s)}$, and exceedance probabilities $P(\\Lambda(s) > c \\mid \\text{data})$ for hotspot maps.",
          ],
        },
        {
          kind: "prose",
          text:
            "The grid makes the computation feasible. A fine grid with $m$ cells needs $\\Sigma$ to be tractable at size " +
            "$m \\times m$, which is why circulant embedding (FFT) on regular grids and sparse Markov (SPDE) precision " +
            "matrices dominate practice.",
        },
      ],
    },
  ],
  references: [
    { source: "Møller, Syversveen & Waagepetersen, Log Gaussian Cox processes (Scandinavian Journal of Statistics, 1998)", locator: "§2–4" },
    { source: "Diggle, Moraga, Rowlingson & Taylor, Spatial and spatio-temporal log-Gaussian Cox processes (Statistical Science, 2013)", locator: "§2–3" },
    { source: "Møller & Waagepetersen, Statistical Inference and Simulation for Spatial Point Processes (2004)", locator: "§5.6" },
  ],
};
