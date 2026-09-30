import type { WikiArticle } from "./types";

/**
 * "Numerical Integration" (quadrature → Gaussian quadrature → Monte Carlo →
 * variance reduction → quasi-Monte Carlo; the Monte Carlo article is in
 * ./monte-carlo-integration) and the two MCMC additions to "Sampling-Based
 * Inference": Hamiltonian Monte Carlo and reversible jump MCMC.
 */

export const quadratureRulesWiki: WikiArticle = {
  conceptId: "quadrature-rules",
  summary:
    "A quadrature rule approximates $\\int_a^b f(x)\\,dx$ by a weighted sum of function values, $\\sum_i w_i f(x_i)$. The " +
    "trapezoid and Simpson rules place the points on an even grid and are exact for low-degree polynomials; their errors " +
    "shrink as a power of the grid spacing. In one or two dimensions they are hard to beat. In ten they are hopeless, " +
    "which is what motivates Monte Carlo.",
  sections: [
    {
      heading: "Newton–Cotes rules",
      blocks: [
        {
          kind: "formula",
          latex: "\\text{Trapezoid: } \\int_a^b f \\approx h\\Big[\\tfrac{1}{2}f_0 + f_1 + \\cdots + f_{n-1} + \\tfrac{1}{2}f_n\\Big], \\qquad \\text{Simpson: } \\int_a^b f \\approx \\tfrac{h}{3}\\big[f_0 + 4f_1 + 2f_2 + 4f_3 + \\cdots + 4f_{n-1} + f_n\\big]",
          caption: "$h = (b - a)/n$, $f_i = f(a + ih)$; Simpson needs $n$ even",
        },
        {
          kind: "table",
          headers: ["Rule", "Exact for polynomials of degree", "Composite error"],
          rows: [
            ["Midpoint", "$\\le 1$", "$O(h^2)$"],
            ["Trapezoid", "$\\le 1$", "$O(h^2)$, specifically $-\\tfrac{(b - a)h^2}{12} f''(\\xi)$"],
            ["Simpson", "$\\le 3$", "$O(h^4)$"],
          ],
        },
        {
          kind: "prose",
          text:
            "Halving $h$ cuts the trapezoid error by about $4$ and Simpson's by about $16$ — for smooth integrands. A kink or a " +
            "singularity destroys the high-order rate, and adaptive rules that refine where $f$ changes fast are then worth more " +
            "than a higher order.",
        },
      ],
    },
    {
      heading: "The curse of dimensionality",
      blocks: [
        {
          kind: "prose",
          text:
            "A product grid with $m$ points per axis in $d$ dimensions needs $N = m^d$ evaluations. A rule with error $O(h^k)$ " +
            "then has error $O(N^{-k/d})$: at fixed cost, the accuracy collapses as $d$ grows. With $10$ points per axis, " +
            "$d = 10$ already needs $10^{10}$ evaluations. Monte Carlo's error $O(N^{-1/2})$ does not depend on $d$ at all, " +
            "so beyond a handful of dimensions it wins.",
        },
        {
          kind: "example",
          title: "Trapezoid by hand",
          problem: "Approximate $\\int_0^1 x^2\\,dx$ with the trapezoid rule and $n = 2$, and compare with the exact value.",
          steps: [
            "$h = 0.5$; $f(0) = 0$, $f(0.5) = 0.25$, $f(1) = 1$.",
            "$0.5\\,[0 + 0.25 + 0.5] = 0.375$.",
            "Exact: $1/3 \\approx 0.3333$. Simpson with the same points gives $\\tfrac{0.5}{3}[0 + 1 + 1] = 1/3$ exactly.",
          ],
          answer: "Trapezoid $0.375$ (error $0.042$); Simpson is exact because $x^2$ is a polynomial of degree $\\le 3$.",
        },
      ],
    },
  ],
  references: [
    { source: "Givens & Hoeting, Computational Statistics (2nd ed.)", locator: "§5.1–5.2" },
    { source: "Press et al., Numerical Recipes (3rd ed.)", locator: "§4.1–4.2" },
  ],
};

export const gaussianQuadratureWiki: WikiArticle = {
  conceptId: "gaussian-quadrature",
  summary:
    "Newton–Cotes rules fix the nodes and choose only the weights. Gaussian quadrature chooses both, and with $n$ nodes it " +
    "integrates every polynomial of degree up to $2n - 1$ exactly — double what fixed nodes allow. The nodes are the roots " +
    "of orthogonal polynomials; Gauss–Hermite quadrature is the version built for expectations under a normal distribution.",
  sections: [
    {
      heading: "The rule",
      blocks: [
        {
          kind: "formula",
          latex: "\\int w(x) f(x)\\,dx \\approx \\sum_{i=1}^{n} w_i f(x_i), \\qquad \\text{exact for } \\deg f \\le 2n - 1",
          caption: "$x_i$ are the roots of the degree-$n$ polynomial orthogonal with respect to the weight function $w$",
        },
        {
          kind: "table",
          headers: ["Family", "Weight $w(x)$", "Interval"],
          rows: [
            ["Gauss–Legendre", "$1$", "$[-1, 1]$"],
            ["Gauss–Hermite", "$e^{-x^2}$", "$(-\\infty, \\infty)$"],
            ["Gauss–Laguerre", "$e^{-x}$", "$[0, \\infty)$"],
          ],
        },
        {
          kind: "prose",
          text:
            "Counting parameters shows why $2n - 1$ is the ceiling: $n$ nodes and $n$ weights are $2n$ free numbers, which can " +
            "match the $2n$ coefficients of a polynomial of degree $2n - 1$.",
        },
      ],
    },
    {
      heading: "Normal expectations",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbb{E}[g(Z)],\\; Z \\sim \\mathcal{N}(\\mu, \\sigma^2): \\qquad \\mathbb{E}[g(Z)] \\approx \\frac{1}{\\sqrt{\\pi}}\\sum_{i=1}^{n} w_i\\, g\\big(\\mu + \\sqrt{2}\\,\\sigma x_i\\big)",
          caption: "the change of variables $z = \\mu + \\sqrt{2}\\sigma x$ turns the normal density into the Hermite weight",
        },
        {
          kind: "example",
          title: "Two-point Gauss–Hermite",
          problem: "The $2$-point Gauss–Hermite rule has nodes $\\pm 1/\\sqrt{2}$ and weights $\\sqrt{\\pi}/2$. Use it to compute $\\mathbb{E}[Z^2]$ for $Z \\sim \\mathcal{N}(0, 1)$.",
          steps: [
            "The mapped points are $\\sqrt{2} \\cdot (\\pm 1/\\sqrt{2}) = \\pm 1$, each with weight $\\tfrac{1}{\\sqrt{\\pi}} \\cdot \\tfrac{\\sqrt{\\pi}}{2} = \\tfrac{1}{2}$.",
            "$\\mathbb{E}[Z^2] \\approx \\tfrac{1}{2}(1) + \\tfrac{1}{2}(1) = 1$.",
          ],
          answer: "$1$, exactly — two nodes integrate polynomials up to degree $3$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Where it is used",
          text:
            "Gauss–Hermite quadrature integrates out normal random effects in GLMMs (adaptive quadrature in `lme4` and SAS), " +
            "and prices options under lognormal models. Like any product rule, it suffers the curse of dimensionality: sparse " +
            "grids delay it, Monte Carlo avoids it.",
        },
      ],
    },
  ],
  references: [
    { source: "Givens & Hoeting, Computational Statistics (2nd ed.)", locator: "§5.3" },
    { source: "Golub & Welsch, Calculation of Gauss quadrature rules (Math. Comp., 1969)", locator: "§2" },
  ],
};

export const varianceReductionWiki: WikiArticle = {
  conceptId: "variance-reduction",
  summary:
    "Monte Carlo error falls like $\\sigma/\\sqrt{n}$, and the rate cannot be improved by random sampling alone — but " +
    "$\\sigma$ can. Variance reduction techniques rewrite the same expectation as the mean of a less variable quantity. A " +
    "tenfold variance reduction is worth as much as ten times more samples.",
  sections: [
    {
      heading: "Three standard techniques",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Antithetic variates", description: "Pair each draw $U$ with a mirror $1 - U$ (or $Z$ with $-Z$) and average $\\tfrac{1}{2}[g(U) + g(1 - U)]$. If $g$ is monotone, the pair is negatively correlated and the variance falls: $\\operatorname{Var} = \\tfrac{1}{2}\\sigma^2(1 + \\rho)$ per pair." },
            { term: "Control variates", description: "Use a variable $C$ with known mean $\\mu_C$ that is correlated with $g$: estimate $\\mathbb{E}[g - \\beta(C - \\mu_C)]$. The optimal $\\beta^* = \\operatorname{Cov}(g, C)/\\operatorname{Var}(C)$ cuts the variance by the factor $1 - \\rho^2_{gC}$." },
            { term: "Stratified sampling", description: "Split the domain into strata and sample a fixed number in each. It removes the between-strata variance and never increases variance with proportional allocation." },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Control variates are regression",
          text:
            "Estimating $\\beta^*$ from the same draws is exactly regressing $g(X_i)$ on $C_i$ and reading off the fitted value " +
            "at $C = \\mu_C$. Multiple controls become multiple regression.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "How much does a control variate buy?",
          problem: "Plain Monte Carlo for $\\mathbb{E}[g(X)]$ has per-draw variance $4$. A control variate with correlation $\\rho = 0.9$ is available. What is the new variance, and how many plain draws would match $1000$ controlled ones?",
          steps: [
            "Variance factor $1 - \\rho^2 = 1 - 0.81 = 0.19$, so the new per-draw variance is $0.76$.",
            "Equal accuracy needs $4/n_{\\text{plain}} = 0.76/1000$, so $n_{\\text{plain}} \\approx 5263$.",
          ],
          answer: "Variance $0.76$; the control variate is worth about $5.3$ times as many plain draws.",
        },
      ],
    },
  ],
  references: [
    { source: "Robert & Casella, Monte Carlo Statistical Methods (2nd ed.)", locator: "§4.4–4.5" },
    { source: "Glasserman, Monte Carlo Methods in Financial Engineering", locator: "Ch. 4" },
  ],
};

export const quasiMonteCarloWiki: WikiArticle = {
  conceptId: "quasi-monte-carlo",
  summary:
    "Random points clump and leave gaps, and that unevenness is where Monte Carlo's $1/\\sqrt{n}$ error comes from. " +
    "Quasi-Monte Carlo replaces them with deterministic low-discrepancy sequences — Halton, Sobol — that fill the unit " +
    "cube evenly. For smooth integrands the error falls close to $1/n$. Randomising the sequence restores an error " +
    "estimate.",
  sections: [
    {
      heading: "Discrepancy and the Koksma–Hlawka bound",
      blocks: [
        {
          kind: "formula",
          latex: "\\Big|\\frac{1}{n}\\sum_{i=1}^{n} f(u_i) - \\int_{[0,1]^d} f(u)\\,du\\Big| \\le V_{\\mathrm{HK}}(f)\\, D_n^*(u_1, \\ldots, u_n)",
          caption: "$V_{\\mathrm{HK}}$ is the Hardy–Krause variation of $f$; $D_n^*$ is the star discrepancy of the points",
        },
        {
          kind: "list",
          items: [
            "The star discrepancy measures the worst gap between the fraction of points in a box $[0, a)$ and the box's volume.",
            "Low-discrepancy sequences achieve $D_n^* = O\\big((\\log n)^d / n\\big)$, versus about $n^{-1/2}$ for random points.",
            "The bound separates the integrand's roughness from the points' evenness; QMC helps most when $f$ is smooth and depends mainly on a few coordinates (low effective dimension).",
          ],
        },
      ],
    },
    {
      heading: "Sequences",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Van der Corput (base $b$)", description: "Write $i$ in base $b$ and reflect its digits about the radix point: in base $2$, $1, 2, 3, 4 \\mapsto 0.5, 0.25, 0.75, 0.125$." },
            { term: "Halton", description: "A van der Corput sequence in a different prime base for each coordinate. Simple, but correlated projections appear in high dimensions." },
            { term: "Sobol", description: "Base-$2$ digital nets with carefully chosen direction numbers; the standard choice in finance and sensitivity analysis." },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Deterministic points have no standard error",
          text:
            "A QMC estimate comes with no variance to report. Randomised QMC — a random shift modulo $1$, or Owen scrambling — " +
            "keeps the evenness, makes each estimate unbiased, and lets independent replicates give a confidence interval. " +
            "Scrambled Sobol can even reach $O(n^{-3/2})$ RMSE for smooth integrands.",
        },
      ],
    },
  ],
  references: [
    { source: "Owen, Monte Carlo Theory, Methods and Examples", locator: "Ch. 15–17" },
    { source: "Glasserman, Monte Carlo Methods in Financial Engineering", locator: "Ch. 5" },
  ],
};

export const hamiltonianMonteCarloWiki: WikiArticle = {
  conceptId: "hamiltonian-monte-carlo",
  summary:
    "Random-walk Metropolis proposes blind steps and, in high dimensions, must take tiny ones to be accepted. Hamiltonian " +
    "Monte Carlo instead treats $-\\log \\pi(\\theta)$ as a landscape, gives the sampler a random momentum, and simulates " +
    "frictionless motion across it. Proposals travel far along the posterior's shape and are still accepted with high " +
    "probability. It needs gradients — which modern autodiff provides — and underlies Stan and NumPyro.",
  sections: [
    {
      heading: "The Hamiltonian",
      blocks: [
        {
          kind: "formula",
          latex: "H(\\theta, p) = U(\\theta) + K(p), \\qquad U(\\theta) = -\\log \\pi(\\theta), \\qquad K(p) = \\tfrac{1}{2} p^\\top M^{-1} p",
          caption: "$p \\sim \\mathcal{N}(0, M)$ is an auxiliary momentum; the joint target is $\\propto e^{-H}$, whose $\\theta$-marginal is $\\pi$",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Draw a fresh momentum $p \\sim \\mathcal{N}(0, M)$.",
            "Simulate Hamiltonian dynamics for $L$ leapfrog steps of size $\\epsilon$: $p \\leftarrow p - \\tfrac{\\epsilon}{2}\\nabla U(\\theta)$, $\\theta \\leftarrow \\theta + \\epsilon M^{-1} p$, $p \\leftarrow p - \\tfrac{\\epsilon}{2}\\nabla U(\\theta)$.",
            "Accept the endpoint with probability $\\min\\big(1, e^{H(\\theta, p) - H(\\theta^*, p^*)}\\big)$.",
          ],
        },
        {
          kind: "prose",
          text:
            "Exact dynamics conserve $H$, so every proposal would be accepted. The leapfrog integrator is not exact but is " +
            "reversible and volume-preserving, so the Metropolis correction needs no Jacobian and only has to absorb the small " +
            "energy error.",
        },
      ],
    },
    {
      heading: "Tuning and NUTS",
      blocks: [
        {
          kind: "list",
          items: [
            "Step size $\\epsilon$: too large and the energy error explodes (rejections, “divergent transitions”); too small and trajectories are expensive. Adapted to hit an acceptance rate around $0.65$–$0.8$.",
            "Path length $L\\epsilon$: too short gives random-walk behaviour; too long makes the trajectory U-turn and waste effort. The No-U-Turn Sampler (NUTS) grows the trajectory until it starts to double back.",
            "Mass matrix $M$: set to an estimate of the posterior covariance's inverse so all directions have similar scale.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Divergences are a diagnostic",
          text:
            "Divergent transitions mark regions of high curvature — the neck of a hierarchical model's funnel is the classic " +
            "case — that the sampler cannot explore. The usual fix is to reparameterise (non-centred parameterisation), not to " +
            "ignore the warning.",
        },
        {
          kind: "prose",
          text:
            "Scaling: to keep acceptance fixed, random-walk Metropolis needs $O(d)$ steps to move across a $d$-dimensional " +
            "Gaussian, while HMC needs about $O(d^{1/4})$ gradient evaluations per effective sample.",
        },
      ],
    },
  ],
  references: [
    { source: "Neal, MCMC using Hamiltonian dynamics (Handbook of MCMC, 2011)", locator: "§5.2–5.4" },
    { source: "Hoffman & Gelman, The No-U-Turn Sampler (JMLR, 2014)", locator: "§3" },
  ],
};

export const reversibleJumpMcmcWiki: WikiArticle = {
  conceptId: "reversible-jump-mcmc",
  summary:
    "Some posteriors live on spaces of different dimension: the number of mixture components, of change points, of " +
    "regression predictors is itself unknown. Reversible jump MCMC lets one chain move between models by pairing each " +
    "jump up in dimension with a jump down, padding the smaller space with auxiliary random variables so the two sides " +
    "match. The time the chain spends in each model estimates its posterior probability.",
  sections: [
    {
      heading: "Dimension matching",
      blocks: [
        {
          kind: "prose",
          text:
            "To move from model $k$ with parameters $\\theta_k \\in \\mathbb{R}^{d_k}$ to model $k'$ with $d_{k'} > d_k$, draw " +
            "$u \\in \\mathbb{R}^{d_{k'} - d_k}$ from a proposal $q(u)$ and set $\\theta_{k'} = h(\\theta_k, u)$ for a bijection " +
            "$h$. The reverse move applies $h^{-1}$ and discards $u$. Both sides now live in spaces of the same dimension, so " +
            "a Metropolis–Hastings ratio makes sense.",
        },
        {
          kind: "formula",
          latex: "\\alpha = \\min\\left(1,\\; \\frac{\\pi(k', \\theta_{k'} \\mid y)\\; j(k \\mid k')}{\\pi(k, \\theta_k \\mid y)\\; j(k' \\mid k)\\; q(u)} \\left|\\frac{\\partial \\theta_{k'}}{\\partial(\\theta_k, u)}\\right|\\right)",
          caption: "$j(\\cdot \\mid \\cdot)$ are the probabilities of choosing each move type; the Jacobian accounts for the change of variables $h$",
        },
      ],
    },
    {
      heading: "Example: split and merge",
      blocks: [
        {
          kind: "example",
          title: "Splitting a mixture component",
          problem: "In a Gaussian mixture, propose splitting a component with mean $\\mu$ into two with means $\\mu_1, \\mu_2$. How is dimension matched?",
          steps: [
            "Draw $u \\sim \\mathcal{N}(0, \\tau^2)$ and set $\\mu_1 = \\mu - u$, $\\mu_2 = \\mu + u$ (weights and variances are split similarly with further auxiliary draws).",
            "The map $(\\mu, u) \\mapsto (\\mu_1, \\mu_2)$ has Jacobian determinant $|\\partial(\\mu_1, \\mu_2)/\\partial(\\mu, u)| = 2$.",
            "The reverse merge sets $\\mu = (\\mu_1 + \\mu_2)/2$ and $u = (\\mu_2 - \\mu_1)/2$ deterministically.",
          ],
          answer: "One extra scalar $u$ fills the missing dimension; the acceptance ratio includes $q(u)$ and the Jacobian $2$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Mixing across models is the hard part",
          text:
            "A naive proposal lands in low-posterior regions of the new model and is almost always rejected, so the chain gets " +
            "stuck in one dimension. Good jump proposals are problem-specific; product-space methods, marginal likelihood " +
            "estimation or Bayesian model averaging over a small model set are common alternatives.",
        },
      ],
    },
  ],
  references: [
    { source: "Green, Reversible jump MCMC computation and Bayesian model determination (Biometrika, 1995)", locator: "§3–4" },
    { source: "Richardson & Green, On Bayesian analysis of mixtures with an unknown number of components (JRSS B, 1997)", locator: "§3" },
  ],
};
