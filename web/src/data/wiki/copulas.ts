import type { WikiArticle } from "./types";

/**
 * Copulas & Dependence — the section of Multivariate & Asymptotics that
 * separates a joint distribution's marginals from its dependence structure.
 */

const nelsen = "Nelsen, An Introduction to Copulas (2nd ed.)";
const mfe = "McNeil, Frey & Embrechts, Quantitative Risk Management (rev. ed.)";

export const copulasWiki: WikiArticle = {
  conceptId: "copulas",
  summary:
    "A copula is a joint distribution on the unit square (or cube) with uniform marginals. Sklar's theorem says every " +
    "joint distribution splits into its marginals and a copula, so dependence can be modelled separately from the " +
    "individual behaviour of each variable.",
  sections: [
    {
      heading: "Sklar's theorem",
      blocks: [
        {
          kind: "formula",
          latex: "F(x, y) = C\\big(F_X(x), F_Y(y)\\big), \\qquad C(u, v) = F\\big(F_X^{-1}(u), F_Y^{-1}(v)\\big)",
          caption: "$C$ is unique when the marginals are continuous",
        },
        {
          kind: "definitions",
          items: [
            { term: "Probability integral transform", description: "If $X$ is continuous, $U = F_X(X) \\sim \\mathrm{Uniform}(0, 1)$. The copula is the joint distribution of $(F_X(X), F_Y(Y))$." },
            { term: "Copula density", description: "$c(u, v) = \\partial^2 C/\\partial u\\,\\partial v$, and $f(x, y) = c(F_X(x), F_Y(y))\\,f_X(x)f_Y(y)$." },
            { term: "Invariance", description: "Strictly increasing transformations of $X$ or $Y$ change the marginals but not the copula." },
          ],
        },
      ],
    },
    {
      heading: "Three reference copulas",
      blocks: [
        {
          kind: "table",
          headers: ["Copula", "$C(u, v)$", "Meaning"],
          rows: [
            ["Independence $\\Pi$", "$uv$", "$X$ and $Y$ independent"],
            ["Comonotone $M$", "$\\min(u, v)$", "$Y$ an increasing function of $X$"],
            ["Countermonotone $W$", "$\\max(u + v - 1, 0)$", "$Y$ a decreasing function of $X$"],
          ],
        },
        {
          kind: "formula",
          latex: "\\max(u + v - 1, 0) \\;\\le\\; C(u, v) \\;\\le\\; \\min(u, v)",
          caption: "Fréchet–Hoeffding bounds: every copula lies between $W$ and $M$",
        },
        {
          kind: "example",
          title: "Building a joint distribution",
          problem: "$X \\sim \\mathrm{Exp}(1)$ and $Y \\sim \\mathrm{Uniform}(0, 1)$ are joined by the independence copula. Find $P(X \\le \\ln 2,\\; Y \\le 0.3)$, then its range over all copulas.",
          steps: [
            "$F_X(\\ln 2) = 1 - e^{-\\ln 2} = 0.5$ and $F_Y(0.3) = 0.3$.",
            "Independence: $C(0.5, 0.3) = 0.15$.",
            "Bounds: $\\max(0.5 + 0.3 - 1, 0) = 0$ and $\\min(0.5, 0.3) = 0.3$.",
          ],
          answer: "$0.15$; any copula gives a value in $[0, 0.3]$.",
        },
      ],
    },
  ],
  references: [
    { source: nelsen, locator: "Ch. 2" },
    { source: mfe, locator: "§7.1" },
  ],
};

export const gaussianTCopulasWiki: WikiArticle = {
  conceptId: "gaussian-and-t-copulas",
  summary:
    "Elliptical copulas are extracted from the multivariate normal and $t$ distributions. They're easy to simulate and " +
    "fit in high dimensions, which made the Gaussian copula the industry default — and its lack of joint extremes made it " +
    "notorious in the 2008 credit crisis.",
  sections: [
    {
      heading: "Definitions and simulation",
      blocks: [
        {
          kind: "formula",
          latex: "C^{\\text{Ga}}_\\rho(u, v) = \\Phi_\\rho\\big(\\Phi^{-1}(u), \\Phi^{-1}(v)\\big), \\qquad C^{t}_{\\nu, \\rho}(u, v) = t_{\\nu, \\rho}\\big(t_\\nu^{-1}(u), t_\\nu^{-1}(v)\\big)",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Draw $(Z_1, Z_2)$ bivariate normal with correlation $\\rho$ (or bivariate $t_\\nu$).",
            "Set $U_i = \\Phi(Z_i)$ (or $t_\\nu(Z_i)$): these have the copula.",
            "Apply any marginal quantile functions, $X_i = F_i^{-1}(U_i)$.",
          ],
        },
        {
          kind: "table",
          headers: ["Property", "Gaussian copula", "$t$ copula"],
          rows: [
            ["Kendall's $\\tau$", "$\\frac{2}{\\pi}\\arcsin\\rho$", "$\\frac{2}{\\pi}\\arcsin\\rho$"],
            ["Spearman's $\\rho_S$", "$\\frac{6}{\\pi}\\arcsin(\\rho/2)$", "no simple closed form"],
            ["Tail dependence", "$0$ for $|\\rho| < 1$", "$2\\,t_{\\nu+1}\\!\\left(-\\sqrt{\\frac{(\\nu + 1)(1 - \\rho)}{1 + \\rho}}\\right) > 0$"],
            ["Symmetry", "Radially symmetric", "Radially symmetric"],
          ],
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Same correlation, different extremes",
          problem: "Compare Gaussian and $t_4$ copulas with $\\rho = 0.5$: Kendall's $\\tau$ and upper tail dependence.",
          steps: [
            "Both: $\\tau = \\frac{2}{\\pi}\\arcsin(0.5) = \\frac{2}{\\pi}\\cdot\\frac{\\pi}{6} = 1/3$.",
            "Gaussian: $\\lambda_U = 0$.",
            "$t_4$: $\\lambda_U = 2t_5(-\\sqrt{5 \\times 0.5/1.5}) = 2t_5(-1.29) \\approx 0.25$.",
          ],
          answer: "Identical rank correlation, yet under the $t_4$ copula a joint extreme is far more likely.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The formula that killed Wall Street?",
          text: "Li's (2000) Gaussian copula model priced CDO tranches from default correlations calibrated in calm markets. With no tail dependence, it made simultaneous defaults look very unlikely — exactly the scenario that materialised. The model's assumptions, not copulas as such, were the problem.",
        },
      ],
    },
  ],
  references: [
    { source: mfe, locator: "§7.2–7.3" },
    { source: "Li (2000), On Default Correlation: A Copula Function Approach, Journal of Fixed Income", locator: "§4" },
  ],
};

export const archimedeanCopulasWiki: WikiArticle = {
  conceptId: "archimedean-copulas",
  summary:
    "Archimedean copulas are built from a single one-dimensional generator function. They have closed forms, one " +
    "parameter, and — unlike elliptical copulas — can make dependence stronger in one tail than the other.",
  sections: [
    {
      heading: "Construction",
      blocks: [
        {
          kind: "formula",
          latex: "C(u, v) = \\varphi^{-1}\\big(\\varphi(u) + \\varphi(v)\\big), \\qquad \\tau = 1 + 4\\int_0^1 \\frac{\\varphi(t)}{\\varphi'(t)}\\,dt",
          caption: "$\\varphi : [0, 1] \\to [0, \\infty]$ continuous, strictly decreasing, convex, $\\varphi(1) = 0$",
        },
        {
          kind: "table",
          headers: ["Family", "$C(u, v)$", "Kendall's $\\tau$", "Tail dependence"],
          rows: [
            ["Clayton, $\\theta > 0$", "$(u^{-\\theta} + v^{-\\theta} - 1)^{-1/\\theta}$", "$\\frac{\\theta}{\\theta + 2}$", "lower: $2^{-1/\\theta}$"],
            ["Gumbel, $\\theta \\ge 1$", "$\\exp\\!\\big(-[(-\\ln u)^\\theta + (-\\ln v)^\\theta]^{1/\\theta}\\big)$", "$1 - \\frac{1}{\\theta}$", "upper: $2 - 2^{1/\\theta}$"],
            ["Frank, $\\theta \\ne 0$", "$-\\frac{1}{\\theta}\\ln\\!\\Big(1 + \\frac{(e^{-\\theta u} - 1)(e^{-\\theta v} - 1)}{e^{-\\theta} - 1}\\Big)$", "Debye-function form", "none"],
          ],
        },
        {
          kind: "prose",
          text:
            "Clayton suits variables that crash together (joint losses); Gumbel suits joint extremes on the upside (floods at " +
            "neighbouring rivers); Frank is symmetric with light tails and, unlike the other two, allows negative dependence.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Matching Kendall's $\\tau = 0.5$",
          problem: "Find the Clayton and Gumbel parameters giving $\\tau = 0.5$, and their tail dependence.",
          steps: [
            "Clayton: $\\theta/(\\theta + 2) = 0.5 \\Rightarrow \\theta = 2$; $\\lambda_L = 2^{-1/2} \\approx 0.707$, $\\lambda_U = 0$.",
            "Gumbel: $1 - 1/\\theta = 0.5 \\Rightarrow \\theta = 2$; $\\lambda_U = 2 - \\sqrt{2} \\approx 0.586$, $\\lambda_L = 0$.",
          ],
          answer: "Same $\\tau$, opposite tails: Clayton clusters joint lows, Gumbel joint highs.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Rotations and higher dimensions",
          text: "Rotating a copula ($C(u, v) \\mapsto u + v - 1 + C(1 - u, 1 - v)$) swaps its tails, e.g. a survival Clayton has upper tail dependence. In $d > 2$ dimensions one generator forces exchangeable dependence — vine copulas build flexible models from bivariate pieces instead.",
        },
      ],
    },
  ],
  references: [
    { source: nelsen, locator: "Ch. 4" },
    { source: mfe, locator: "§7.4" },
  ],
};

export const copulaRankCorrelationWiki: WikiArticle = {
  conceptId: "copula-rank-correlation",
  summary:
    "Pearson correlation measures linear association and depends on the marginals. Rank correlations — Kendall's $\\tau$ " +
    "and Spearman's $\\rho_S$ — depend only on the copula, so they're the natural summaries of dependence.",
  sections: [
    {
      heading: "Definitions",
      blocks: [
        {
          kind: "formula",
          latex: "\\tau = P\\big[(X_1 - X_2)(Y_1 - Y_2) > 0\\big] - P\\big[(X_1 - X_2)(Y_1 - Y_2) < 0\\big] = 4\\,\\mathbb{E}\\big[C(U, V)\\big] - 1",
          caption: "concordance minus discordance of two independent copies",
        },
        {
          kind: "formula",
          latex: "\\rho_S = \\operatorname{corr}\\big(F_X(X), F_Y(Y)\\big) = 12\\int_0^1\\!\\!\\int_0^1 C(u, v)\\,du\\,dv - 3",
        },
        {
          kind: "list",
          items: [
            "Both equal $1$ for $M$, $-1$ for $W$ and $0$ for $\\Pi$ — but zero rank correlation does not imply independence.",
            "Sample $\\tau$: (concordant pairs $-$ discordant pairs)$/\\binom{n}{2}$. Sample $\\rho_S$: Pearson correlation of the ranks.",
            "Both are unchanged by strictly increasing transformations of either variable.",
          ],
        },
      ],
    },
    {
      heading: "Pitfalls of Pearson correlation",
      blocks: [
        {
          kind: "list",
          items: [
            "It changes under monotone transformations: $\\operatorname{corr}(X, Y) \\ne \\operatorname{corr}(e^X, e^Y)$ in general.",
            "Attainable values depend on the marginals: for $X \\sim \\mathrm{LN}(0, 1)$ and $Y \\sim \\mathrm{LN}(0, 4)$, the maximum correlation, attained when $Y$ is a function of $X$, is only about $0.67$.",
            "It is undefined when variances are infinite (heavy tails), while rank correlations always exist.",
          ],
        },
        {
          kind: "example",
          title: "Sample Kendall's $\\tau$",
          problem: "$5$ observations give $10$ pairs: $7$ concordant, $3$ discordant. Find $\\hat{\\tau}$, and the Gaussian-copula $\\rho$ it implies.",
          steps: ["$\\hat{\\tau} = (7 - 3)/10 = 0.4$.", "Invert $\\tau = \\frac{2}{\\pi}\\arcsin\\rho$: $\\rho = \\sin(\\pi \\times 0.4/2) \\approx 0.588$."],
          answer: "$\\hat{\\tau} = 0.4$; $\\hat{\\rho} \\approx 0.59$.",
        },
      ],
    },
  ],
  references: [
    { source: nelsen, locator: "Ch. 5" },
    { source: "Embrechts, McNeil & Straumann (2002), Correlation and Dependence in Risk Management: Properties and Pitfalls", locator: "§3–4" },
  ],
};

export const tailDependenceWiki: WikiArticle = {
  conceptId: "tail-dependence",
  summary:
    "Tail dependence asks: given that one variable is extreme, how likely is the other to be extreme too? Two copulas can " +
    "share a rank correlation yet differ completely here — and for risk, the tails are what matter.",
  sections: [
    {
      heading: "Definitions",
      blocks: [
        {
          kind: "formula",
          latex: "\\lambda_U = \\lim_{u \\to 1^-} P(V > u \\mid U > u) = \\lim_{u \\to 1^-}\\frac{1 - 2u + C(u, u)}{1 - u}, \\qquad \\lambda_L = \\lim_{u \\to 0^+}\\frac{C(u, u)}{u}",
        },
        {
          kind: "table",
          headers: ["Copula", "$\\lambda_L$", "$\\lambda_U$"],
          rows: [
            ["Independence", "$0$", "$0$"],
            ["Gaussian, $|\\rho| < 1$", "$0$", "$0$"],
            ["$t_\\nu$", "$> 0$ (equal)", "$> 0$ (equal)"],
            ["Clayton", "$2^{-1/\\theta}$", "$0$"],
            ["Gumbel", "$0$", "$2 - 2^{1/\\theta}$"],
            ["Comonotone $M$", "$1$", "$1$"],
          ],
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Lower tail of the independence copula",
          problem: "Show that $\\Pi(u, v) = uv$ has $\\lambda_L = 0$, and $M = \\min(u, v)$ has $\\lambda_L = 1$.",
          steps: ["$\\Pi$: $C(u, u)/u = u^2/u = u \\to 0$.", "$M$: $C(u, u)/u = u/u = 1$."],
          answer: "$0$ and $1$ — no joint extremes versus certain joint extremes.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Asymptotic independence isn't independence",
          text: "A Gaussian copula with $\\rho = 0.9$ has $\\lambda_U = 0$, yet at any finite threshold joint exceedances are much more common than under independence. They just become rare relative to single exceedances in the limit. Finite-threshold measures (or the coefficient $\\bar{\\chi}$) capture this.",
        },
      ],
    },
  ],
  references: [
    { source: mfe, locator: "§7.2.4" },
    { source: "Coles, An Introduction to Statistical Modeling of Extreme Values", locator: "§8.4" },
  ],
};

export const copulaEstimationWiki: WikiArticle = {
  conceptId: "copula-estimation",
  summary:
    "Fitting a copula model means estimating marginals and dependence. Ranks let the dependence be estimated without " +
    "committing to the marginals at all.",
  sections: [
    {
      heading: "Methods",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Pseudo-observations", description: "$\\hat{U}_i = R_i/(n + 1)$, with $R_i$ the rank of $X_i$ — the empirical CDF rescaled to stay inside $(0, 1)$." },
            { term: "Inversion of Kendall's $\\tau$", description: "Match $\\hat{\\tau}$ to the family's formula: Gaussian $\\rho = \\sin(\\pi\\tau/2)$; Clayton $\\theta = 2\\tau/(1 - \\tau)$; Gumbel $\\theta = 1/(1 - \\tau)$." },
            { term: "Maximum pseudo-likelihood", description: "Maximise $\\sum_i \\log c_\\theta(\\hat{U}_i, \\hat{V}_i)$ — semiparametric, robust to marginal misspecification." },
            { term: "IFM (inference functions for margins)", description: "Fit parametric marginals first, transform with the fitted CDFs, then maximise the copula likelihood. Efficient if the marginals are right, biased if not." },
            { term: "Full MLE", description: "Maximise the joint likelihood in all parameters at once — most efficient, most fragile." },
          ],
        },
      ],
    },
    {
      heading: "Checking and choosing",
      blocks: [
        {
          kind: "list",
          items: [
            "Plot the pseudo-observations: clustering in a corner reveals tail dependence the family must capture.",
            "Compare empirical and fitted copulas with a Cramér–von Mises statistic, calibrated by parametric bootstrap.",
            "Compare families by AIC on the pseudo-likelihood, and check implied $\\lambda_L, \\lambda_U$ against the data.",
          ],
        },
        {
          kind: "example",
          title: "Moment-matching two families",
          problem: "Pseudo-observations give $\\hat{\\tau} = 0.5$. Fit Clayton and Gumbel by inversion.",
          steps: ["Clayton: $\\theta = 2(0.5)/0.5 = 2$.", "Gumbel: $\\theta = 1/0.5 = 2$."],
          answer: "Both $\\theta = 2$; choose between them by which tail the data cluster in.",
        },
      ],
    },
  ],
  references: [
    { source: "Genest, Ghoudi & Rivest (1995), A Semiparametric Estimation Procedure of Dependence Parameters in Multivariate Families, Biometrika", locator: "§2–3" },
    { source: mfe, locator: "§7.5" },
  ],
};

export const copulaWikis: WikiArticle[] = [
  copulasWiki,
  gaussianTCopulasWiki,
  archimedeanCopulasWiki,
  copulaRankCorrelationWiki,
  tailDependenceWiki,
  copulaEstimationWiki,
];
