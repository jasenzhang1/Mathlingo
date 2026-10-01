import type { WikiArticle } from "./types";

/**
 * Bayesian Statistics: exchangeability (a foundations lesson) and the Bayesian
 * inverse problems section — the posterior as a regularised answer to an
 * ill-posed problem, function-space priors, pCN, ensemble Kalman inversion
 * and approximate Bayesian computation. Collected into `bayesianWikis`.
 */

const stuart = "Stuart (2010), Inverse Problems: A Bayesian Perspective, Acta Numerica 19";
const ks = "Kaipio & Somersalo, Statistical and Computational Inverse Problems";
const gelman = "Gelman, Carlin, Stern, Dunson, Vehtari & Rubin, Bayesian Data Analysis (3rd ed.)";

export const exchangeabilityWiki: WikiArticle = {
  conceptId: "exchangeability",
  summary:
    "A sequence is exchangeable when its joint distribution doesn't care about order. It is weaker than i.i.d. — draws " +
    "can be correlated — and it is the assumption Bayesian modelling actually rests on. De Finetti's theorem says an " +
    "infinite exchangeable sequence behaves exactly as if the data were i.i.d. given some unknown parameter drawn from a " +
    "prior.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "(X_1, \\dots, X_n) \\overset{d}{=} (X_{\\pi(1)}, \\dots, X_{\\pi(n)}) \\quad\\text{for every permutation } \\pi",
        },
        {
          kind: "list",
          items: [
            "i.i.d. $\\Rightarrow$ exchangeable, but not conversely: draws from a Pólya urn are exchangeable and positively correlated.",
            "Exchangeable variables have identical marginals and identical pairwise correlations $\\rho$.",
            "A finite exchangeable sequence of length $n$ must have $\\rho \\ge -1/(n - 1)$; infinitely extendable ones have $\\rho \\ge 0$.",
            "Sampling without replacement from a finite population is exchangeable but can't be extended indefinitely.",
          ],
        },
      ],
    },
    {
      heading: "De Finetti's theorem",
      blocks: [
        {
          kind: "formula",
          latex: "P(X_1 = x_1, \\dots, X_n = x_n) = \\int_0^1 \\theta^{k}(1 - \\theta)^{n - k}\\,d\\mu(\\theta), \\qquad k = \\textstyle\\sum_i x_i",
          caption: "for an infinite exchangeable sequence of $0$/$1$ variables",
        },
        {
          kind: "prose",
          text:
            "The mixing measure $\\mu$ is the prior, and $\\theta$ is the long-run frequency $\\lim \\frac{1}{n}\\sum X_i$. So " +
            "“parameter”, “likelihood” and “prior” are not extra assumptions: they follow from judging the order of the " +
            "observations irrelevant. The theorem extends to general real-valued sequences (Hewitt–Savage).",
        },
        {
          kind: "example",
          title: "The Pólya urn",
          problem: "An urn holds $1$ red and $1$ blue ball. Draw a ball, return it with another of the same colour, and repeat. Find $P(\\text{red, red})$ and compare with de Finetti.",
          steps: [
            "$P(\\text{red first}) = 1/2$; then the urn has $2$ red of $3$: $P(\\text{red, red}) = \\tfrac{1}{2}\\cdot\\tfrac{2}{3} = \\tfrac{1}{3}$.",
            "The draws are exchangeable, with de Finetti measure $\\mu = \\mathrm{Uniform}(0, 1)$: $\\int_0^1 \\theta^2\\,d\\theta = 1/3$. ✓",
          ],
          answer: "$1/3$ — the urn is a Beta–Binomial model with a $\\mathrm{Beta}(1, 1)$ prior.",
        },
      ],
    },
    {
      heading: "Where it's used",
      blocks: [
        {
          kind: "list",
          items: [
            "Hierarchical models: treating groups as exchangeable justifies a common prior $\\theta_j \\sim p(\\theta \\mid \\phi)$.",
            "Permutation tests: under the null, exchangeability makes every relabelling equally likely.",
            "Conformal prediction: exchangeability of the calibration scores and the new point gives finite-sample coverage.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "When exchangeability fails",
          text: "Time trends, known group structure, or covariates that differ between units break exchangeability. The fix is conditional exchangeability — exchangeable given covariates or within groups — which is what regression and hierarchical models encode.",
        },
      ],
    },
  ],
  references: [
    { source: gelman, locator: "§1.2, §5.2" },
    { source: "Bernardo & Smith, Bayesian Theory", locator: "§4.2–4.3" },
  ],
};

export const bayesianInverseProblemsWiki: WikiArticle = {
  conceptId: "bayesian-inverse-problems",
  summary:
    "An inverse problem recovers an unknown $u$ — a conductivity field, an initial condition, an image — from indirect, " +
    "noisy data $y = \\mathcal{G}(u) + \\eta$. Classical inversion is ill-posed: many $u$ fit the data, and small noise " +
    "causes large errors. The Bayesian approach puts a prior on $u$, and the posterior is a stable, well-defined answer " +
    "that also quantifies uncertainty.",
  sections: [
    {
      heading: "The posterior",
      blocks: [
        {
          kind: "formula",
          latex: "\\frac{d\\mu^y}{d\\mu_0}(u) \\propto \\exp\\big(-\\Phi(u; y)\\big), \\qquad \\Phi(u; y) = \\tfrac{1}{2}\\big\\|\\Gamma^{-1/2}\\big(y - \\mathcal{G}(u)\\big)\\big\\|^2",
          caption: "posterior $\\mu^y$ relative to prior $\\mu_0$, with Gaussian noise $\\eta \\sim N(0, \\Gamma)$; $\\Phi$ is the data misfit",
        },
        {
          kind: "definitions",
          items: [
            { term: "Forward map $\\mathcal{G}$", description: "The physics or simulator mapping the unknown to observables — often a PDE solve followed by observation at sensors." },
            { term: "Ill-posedness", description: "Non-existence, non-uniqueness or instability of the inverse (Hadamard). Smoothing forward maps are compact, so their inverses amplify noise." },
            { term: "Well-posed posterior", description: "Under mild conditions on $\\Phi$ and the prior, the posterior exists, is unique, and depends Lipschitz-continuously on $y$ in the Hellinger distance (Stuart, 2010)." },
            { term: "MAP estimate", description: "The mode minimises $\\Phi(u; y) + \\tfrac{1}{2}\\|u\\|_{\\mathcal{C}_0}^2$ for a Gaussian prior — exactly a Tikhonov-regularised least-squares problem." },
          ],
        },
      ],
    },
    {
      heading: "Why Bayesian?",
      blocks: [
        {
          kind: "table",
          headers: ["Classical regularisation", "Bayesian inversion"],
          rows: [
            ["Penalty $\\alpha R(u)$ chosen ad hoc", "Prior encodes the same assumption probabilistically"],
            ["One regularised point estimate", "A full posterior: mean, credible regions, samples"],
            ["$\\alpha$ tuned by L-curve or discrepancy", "Noise and prior scales can be inferred hierarchically"],
            ["Uncertainty rarely reported", "Uncertainty propagates to predictions and decisions"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Discretise last",
          text: "Formulating the prior and posterior on the function space first, and only then discretising, gives methods whose answers and cost don't degrade as the mesh is refined. That's the thread running through function-space priors and pCN.",
        },
      ],
    },
  ],
  references: [
    { source: stuart, locator: "§1–4" },
    { source: ks, locator: "Ch. 1–3" },
  ],
};

export const linearGaussianInversionWiki: WikiArticle = {
  conceptId: "linear-gaussian-inverse-problems",
  summary:
    "When the forward map is linear, $y = Au + \\eta$, and both prior and noise are Gaussian, the posterior is Gaussian " +
    "with a closed form. It is the workhorse and benchmark of Bayesian inversion, and it makes the link between priors " +
    "and Tikhonov regularisation exact.",
  sections: [
    {
      heading: "The posterior",
      blocks: [
        {
          kind: "formula",
          latex: "u \\sim N(m_0, C_0),\\;\\; \\eta \\sim N(0, \\Gamma) \\;\\Longrightarrow\\; C = (A^\\top\\Gamma^{-1}A + C_0^{-1})^{-1},\\quad m = C\\,(A^\\top\\Gamma^{-1}y + C_0^{-1}m_0)",
        },
        {
          kind: "formula",
          latex: "m = m_0 + K(y - Am_0),\\qquad C = (I - KA)\\,C_0,\\qquad K = C_0A^\\top(AC_0A^\\top + \\Gamma)^{-1}",
          caption: "equivalent Kalman-gain form: cheaper when there are fewer data than unknowns",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "A scalar inversion",
          problem: "Prior $u \\sim N(0, 1)$; observation $y = 2u + \\eta$ with $\\eta \\sim N(0, 1)$; you observe $y = 3$. Find the posterior both ways.",
          steps: [
            "Precision form: $C = (4 + 1)^{-1} = 0.2$; $m = 0.2 \\times 2 \\times 3 = 1.2$.",
            "Gain form: $K = 2/(4 + 1) = 0.4$; $m = 0.4 \\times 3 = 1.2$; $C = (1 - 0.8) \\times 1 = 0.2$.",
          ],
          answer: "$u \\mid y \\sim N(1.2, 0.2)$. The naive inverse $y/2 = 1.5$ is shrunk towards the prior mean.",
        },
      ],
    },
    {
      heading: "Spectral view and Tikhonov",
      blocks: [
        {
          kind: "prose",
          text:
            "With $C_0 = \\tau^2 I$ and $\\Gamma = \\sigma^2 I$, the posterior mean minimises $\\|y - Au\\|^2 + \\frac{\\sigma^2}{\\tau^2}\\|u\\|^2$ — Tikhonov " +
            "with $\\alpha = \\sigma^2/\\tau^2$. In the SVD $A = \\sum_j s_j v_j w_j^\\top$, it filters each component: " +
            "$m = \\sum_j \\frac{s_j^2}{s_j^2 + \\alpha}\\cdot\\frac{\\langle y, v_j\\rangle}{s_j}\\,w_j$. Well-determined directions ($s_j^2 \\gg \\alpha$) " +
            "follow the data; poorly determined ones fall back to the prior, and the posterior variance there stays near $\\tau^2$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The MAP is only one summary",
          text: "Tikhonov gives the posterior mean, which is also the MAP here. But the posterior covariance — how uncertain each direction remains — is information classical regularisation discards.",
        },
      ],
    },
  ],
  references: [
    { source: ks, locator: "§3.4" },
    { source: stuart, locator: "§2.4, §6.4" },
  ],
};

export const functionSpacePriorsWiki: WikiArticle = {
  conceptId: "function-space-priors",
  summary:
    "When the unknown is a function, the prior is a probability measure on a function space. Gaussian priors built from " +
    "an eigen-expansion are the standard choice; their covariance must decay fast enough for draws to be proper " +
    "functions, and its decay rate sets how smooth the draws are.",
  sections: [
    {
      heading: "Karhunen–Loève priors",
      blocks: [
        {
          kind: "formula",
          latex: "u = m_0 + \\sum_{j=1}^\\infty \\sqrt{\\lambda_j}\\,\\xi_j\\,\\phi_j, \\qquad \\xi_j \\overset{\\text{iid}}{\\sim} N(0, 1), \\qquad \\mathbb{E}\\|u - m_0\\|^2 = \\sum_j \\lambda_j",
        },
        {
          kind: "list",
          items: [
            "Draws lie in $L^2$ almost surely iff $\\sum_j \\lambda_j < \\infty$: the covariance must be trace class. White noise ($\\lambda_j = 1$) is not a function.",
            "With $\\lambda_j = j^{-2\\alpha}$ in one dimension, need $\\alpha > 1/2$; larger $\\alpha$ gives smoother draws.",
            "Truncating at $K$ terms gives a finite-dimensional parameterisation that converges as $K$ grows.",
          ],
        },
      ],
    },
    {
      heading: "Common choices",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Laplacian-type priors", description: "$C_0 = (-\\Delta)^{-\\alpha}$ (with boundary conditions): eigenfunctions of the Laplacian, eigenvalues decaying polynomially; in $d$ dimensions need $\\alpha > d/2$." },
            { term: "Matérn / Whittle", description: "$C_0 \\propto (\\kappa^2 I - \\Delta)^{-\\alpha}$: a length scale $1/\\kappa$ and smoothness $\\nu = \\alpha - d/2$. Sampled cheaply by solving the SPDE $(\\kappa^2 - \\Delta)^{\\alpha/2}u = W$ with sparse finite elements." },
            { term: "Cameron–Martin space", description: "The range of $C_0^{1/2}$: the directions in which the prior can be shifted without becoming singular. Draws themselves are almost surely rougher and lie outside it." },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Measures are easily singular in infinite dimensions",
          text: "Two Gaussian measures on a function space are either equivalent or mutually singular (Feldman–Hájek). Rescaling a prior's covariance by any factor $\\ne 1$ gives a singular measure — which is why naive samplers and naive hyperparameter updates break down as the mesh is refined.",
        },
      ],
    },
  ],
  references: [
    { source: stuart, locator: "§2.4, §6" },
    { source: "Lindgren, Rue & Lindström (2011), An Explicit Link Between Gaussian Fields and Gaussian Markov Random Fields, JRSS-B", locator: "§2" },
  ],
};

export const pcnMcmcWiki: WikiArticle = {
  conceptId: "pcn-mcmc",
  summary:
    "Random-walk Metropolis gets worse as an inverse problem's mesh is refined: to keep a fixed acceptance rate, its step " +
    "size must shrink with the dimension. The preconditioned Crank–Nicolson (pCN) proposal is built to leave the Gaussian " +
    "prior invariant, so it is well defined on the function space and its acceptance rate doesn't depend on the mesh.",
  sections: [
    {
      heading: "The algorithm",
      blocks: [
        {
          kind: "formula",
          latex: "v = \\sqrt{1 - \\beta^2}\\,u + \\beta\\,\\xi,\\quad \\xi \\sim N(0, C_0), \\qquad a(u, v) = \\min\\big\\{1, \\exp\\big(\\Phi(u) - \\Phi(v)\\big)\\big\\}",
          caption: "for a centred Gaussian prior $N(0, C_0)$ and data misfit $\\Phi$; $\\beta \\in (0, 1]$",
        },
        {
          kind: "list",
          items: [
            "The proposal is reversible with respect to the prior, so the prior ratio cancels: only the misfit enters the acceptance probability.",
            "$\\beta = 1$ proposes independent prior draws; small $\\beta$ makes local moves. Tune $\\beta$ for an acceptance rate around $0.2$–$0.3$.",
            "Standard random-walk Metropolis ($v = u + \\beta\\xi$) has acceptance tending to $0$ as dimension grows for fixed $\\beta$; pCN's doesn't.",
          ],
        },
        {
          kind: "example",
          title: "One proposal",
          problem: "With $\\beta = 0.6$, current $u$ has misfit $\\Phi(u) = 10$, the proposal has $\\Phi(v) = 11$. Find the shrink factor and the acceptance probability.",
          steps: ["$\\sqrt{1 - 0.36} = 0.8$, so $v = 0.8u + 0.6\\xi$.", "$a = \\min(1, e^{10 - 11}) = e^{-1} \\approx 0.368$."],
          answer: "Shrink factor $0.8$; accept with probability $0.368$.",
        },
      ],
    },
    {
      heading: "Beyond pCN",
      blocks: [
        {
          kind: "prose",
          text:
            "pCN uses no information from the likelihood, so it mixes slowly when data are informative in a few directions. " +
            "Dimension-robust extensions — $\\infty$-MALA, $\\infty$-HMC, and likelihood-informed subspace (DILI) methods — add " +
            "gradient or Hessian information in the data-informed directions while keeping the pCN structure in the rest.",
        },
      ],
    },
  ],
  references: [
    { source: "Cotter, Roberts, Stuart & White (2013), MCMC Methods for Functions: Modifying Old Algorithms to Make Them Faster, Statistical Science", locator: "§1–4" },
  ],
};

export const ensembleKalmanInversionWiki: WikiArticle = {
  conceptId: "ensemble-kalman-inversion",
  summary:
    "Many forward models are black-box simulators with no gradients. Ensemble Kalman inversion (EKI) moves a cloud of " +
    "candidate parameters towards the data using only forward runs, replacing the covariances in the Kalman update by " +
    "ensemble sample covariances. It is exact for linear–Gaussian problems with a large ensemble and a useful " +
    "approximation otherwise.",
  sections: [
    {
      heading: "The update",
      blocks: [
        {
          kind: "formula",
          latex: "u^{(j)} \\leftarrow u^{(j)} + C^{up}\\big(C^{pp} + \\Gamma\\big)^{-1}\\big(y^{(j)} - \\mathcal{G}(u^{(j)})\\big), \\qquad y^{(j)} = y + \\eta^{(j)}",
          caption: "$C^{up}$: sample cross-covariance of parameters and predictions; $C^{pp}$: sample covariance of predictions",
        },
        {
          kind: "list",
          items: [
            "Only forward evaluations $\\mathcal{G}(u^{(j)})$ are needed — no adjoints or derivatives — and they run in parallel.",
            "Updates stay in the span of the initial ensemble (the subspace property), so the prior ensemble matters.",
            "With a linear $\\mathcal{G}$, Gaussian prior and $J \\to \\infty$ members, one step gives exact posterior samples; for nonlinear $\\mathcal{G}$ it's an approximation, often iterated.",
            "Small ensembles under-represent variance and collapse; inflation and localisation (from weather data assimilation) counter this.",
          ],
        },
        {
          kind: "example",
          title: "One scalar update",
          problem: "Ensemble statistics: $C^{up} = 2$, $C^{pp} = 4$, noise $\\Gamma = 1$. A member's perturbed data minus prediction is $1$. How far does it move?",
          steps: ["Gain $= 2/(4 + 1) = 0.4$.", "Move $= 0.4 \\times 1 = 0.4$."],
          answer: "$+0.4$.",
        },
      ],
    },
    {
      heading: "Relatives",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Ensemble Kalman filter", description: "The same update applied sequentially in time to a dynamical state — the origin of the method in weather forecasting." },
            { term: "3D-Var / 4D-Var", description: "Variational data assimilation: the MAP estimate of the state (or initial condition), found by optimisation with adjoint-based gradients." },
            { term: "Ensemble Kalman sampler", description: "A continuous-time variant with noise that approximately samples the posterior rather than collapsing to a point." },
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Iglesias, Law & Stuart (2013), Ensemble Kalman Methods for Inverse Problems, Inverse Problems 29", locator: "§2–3" },
    { source: "Evensen, Data Assimilation: The Ensemble Kalman Filter", locator: "Ch. 9" },
  ],
};

export const approximateBayesianComputationWiki: WikiArticle = {
  conceptId: "approximate-bayesian-computation",
  summary:
    "Some models can be simulated but their likelihood can't be written down — population genetics, epidemics, " +
    "agent-based models. Approximate Bayesian computation replaces likelihood evaluation with simulation: keep " +
    "parameter values whose simulated data look like the real data.",
  sections: [
    {
      heading: "Rejection ABC",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Draw $\\theta^* \\sim p(\\theta)$ from the prior.",
            "Simulate $x^* \\sim p(x \\mid \\theta^*)$.",
            "Accept $\\theta^*$ if $\\rho\\big(S(x^*), S(y)\\big) \\le \\varepsilon$ for summary statistics $S$ and distance $\\rho$.",
          ],
        },
        {
          kind: "formula",
          latex: "p_\\varepsilon(\\theta \\mid y) \\propto p(\\theta)\\,P\\big(\\rho(S(x), S(y)) \\le \\varepsilon \\mid \\theta\\big)",
          caption: "the target of rejection ABC; equals $p(\\theta \\mid S(y))$ as $\\varepsilon \\to 0$",
        },
      ],
    },
    {
      heading: "The three approximations",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Tolerance $\\varepsilon$", description: "Larger $\\varepsilon$ accepts more but inflates and biases the posterior; smaller $\\varepsilon$ is accurate but accepts almost nothing." },
            { term: "Summary statistics", description: "Only if $S$ is sufficient does $p(\\theta \\mid S(y)) = p(\\theta \\mid y)$. Too many summaries → curse of dimensionality in the distance; too few → information loss." },
            { term: "Monte Carlo error", description: "From the finite number of accepted draws." },
          ],
        },
        {
          kind: "example",
          title: "Budgeting simulations",
          problem: "Rejection ABC accepts $0.5\\%$ of proposals. How many simulations give $1000$ accepted draws?",
          steps: ["$1000/0.005 = 200\\,000$."],
          answer: "$200\\,000$ simulations — why ABC-MCMC and ABC-SMC, which propose from better than the prior, are used in practice.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Neural simulation-based inference",
          text: "Modern likelihood-free methods train neural networks on simulated $(\\theta, x)$ pairs to learn the posterior, likelihood or likelihood ratio directly (NPE, NLE, NRE), removing the tolerance and learning summaries automatically.",
        },
      ],
    },
  ],
  references: [
    { source: "Sisson, Fan & Beaumont (eds.), Handbook of Approximate Bayesian Computation", locator: "Ch. 1" },
    { source: "Cranmer, Brehmer & Louppe (2020), The Frontier of Simulation-Based Inference, PNAS", locator: "§1–3" },
  ],
};

export const bayesianInversionWikis: WikiArticle[] = [
  exchangeabilityWiki,
  bayesianInverseProblemsWiki,
  linearGaussianInversionWiki,
  functionSpacePriorsWiki,
  pcnMcmcWiki,
  ensembleKalmanInversionWiki,
  approximateBayesianComputationWiki,
];
