import type { Item } from "../../../lib/assessment/types";
import { makeBuilders } from "../authoring";
import { EXPANSION } from "./source";

/**
 * Top-ups that bring every new Functional Data Analysis, Bayesian inversion and
 * copula lesson to at least 30 items.
 */
const { mcq, short, num } = makeBuilders(EXPANSION);

const s = (concept: string, slug: string, level: number, stem: string, a: string, b: string) =>
  short({ concept, slug, cognitive: level >= 8.5 ? "transfer" : "explain", level, seconds: level >= 9 ? 300 : 180, stem },
    [["main", a, 5, true], ["detail", b, 4, true]]);
const n = (concept: string, slug: string, level: number, stem: string, key: number, tol = 0.01) =>
  num({ concept, slug, cognitive: "apply", level, seconds: level >= 7 ? 90 : level >= 4 ? 60 : 30, stem }, key, tol);
const m = (concept: string, slug: string, level: number, stem: string, right: string, wrong: [string, string][]) =>
  mcq({ concept, slug, cognitive: level <= 3 ? "recall" : "apply", level, seconds: 25, stem },
    right, wrong.map(([t, why], i) => [t, `${concept}-${slug}-${i}`, why] as [string, string, string]));

export const fdaBayesCopulaTopupItems: Item[] = [
  // --- copulas section ---------------------------------------------------
  m("gaussian-and-t-copulas", "b-params", 1, "A bivariate $t$ copula is specified by:", "A correlation $\\rho$ and degrees of freedom $\\nu$",
    [["$\\rho$ only", "That's the Gaussian copula."], ["A generator function", "That's Archimedean."], ["Two marginal CDFs", "Copulas exclude the marginals."]]),
  n("gaussian-and-t-copulas", "b-tau03", 4, "For a Gaussian copula with $\\rho = 0.3$, what is Kendall's $\\tau$ (to $4$ decimals)?", 0.194, 0.003),
  m("gaussian-and-t-copulas", "b-factor", 7, "In the one-factor model $Z_i = \\sqrt{\\rho}\\,M + \\sqrt{1 - \\rho}\\,\\varepsilon_i$, the correlation between two firms' latent variables is:", "$\\rho$",
    [["$\\sqrt{\\rho}$", "Each loads $\\sqrt{\\rho}$ on $M$, so the covariance is $\\rho$."], ["$1 - \\rho$", "That's the idiosyncratic share."], ["$0$", "They share $M$."]]),
  m("archimedean-copulas", "b-symmetric", 3, "Bivariate Archimedean copulas are always:", "Exchangeable: $C(u, v) = C(v, u)$",
    [["Radially symmetric", "Clayton and Gumbel aren't."], ["Tail-independent", "Clayton and Gumbel aren't."], ["Elliptical", "They're a different class."]]),
  m("copula-rank-correlation", "b-range", 1, "Kendall's $\\tau$ takes values in:", "$[-1, 1]$",
    [["$[0, 1]$", "Negative dependence gives negative $\\tau$."], ["$[0, \\infty)$", "No."], ["$(-\\infty, \\infty)$", "It's bounded."]]),
  n("copula-rank-correlation", "b-tau-simple", 2, "Out of $20$ pairs (no ties), $12$ are concordant and $8$ discordant. What is $\\hat{\\tau}$?", 0.2, 0.001),
  n("copula-rank-correlation", "b-sp08", 5, "For a Gaussian copula with $\\rho = 0.8$, what is Spearman's $\\rho_S$ (to $4$ decimals)?", 0.7859, 0.002),
  m("copula-rank-correlation", "b-order", 6, "For a bivariate normal with $\\rho = 0.5$, the three measures are ordered:", "$\\tau < \\rho_S < \\rho$ ($0.33 < 0.48 < 0.5$)",
    [["$\\rho < \\rho_S < \\tau$", "Reversed."], ["All equal", "They measure different things."], ["$\\rho_S < \\tau < \\rho$", "$\\rho_S$ exceeds $\\tau$ here."]]),
  n("tail-dependence", "b-t09", 6, "A $t_4$ copula with $\\rho = 0.9$: $\\lambda = 2t_5(-0.513)$ with $t_5(-0.513) = 0.315$. What is $\\lambda$ (to $2$ decimals)?", 0.63, 0.01),
  m("tail-dependence", "b-gumbel-lower", 2, "The Gumbel copula's lower tail dependence is:", "$0$",
    [["$2 - 2^{1/\\theta}$", "That's upper."], ["$2^{-1/\\theta}$", "That's Clayton's lower."], ["$1$", "No."]]),
  m("copula-estimation", "b-why-ranks", 2, "Using ranks to fit the copula is attractive because:", "It avoids assumptions about the marginal distributions",
    [["It's always more efficient", "It trades some efficiency for robustness."], ["It needs no copula family", "A family is still fitted."], ["It removes dependence", "It preserves it."]]),
  n("copula-estimation", "b-gumbel-02", 4, "$\\hat{\\tau} = 0.2$. What Gumbel $\\theta = 1/(1 - \\tau)$ results?", 1.25, 0.001),

  // --- Bayesian inversion section ----------------------------------------
  m("bayesian-inverse-problems", "b-noise", 1, "In $y = \\mathcal{G}(u) + \\eta$, the term $\\eta$ represents:", "Observation noise (and often model error)",
    [["The unknown", "That's $u$."], ["The prior", "No."], ["The forward model", "That's $\\mathcal{G}$."]]),
  n("bayesian-inverse-problems", "b-misfit3", 3.5, "Residuals $(0.1, 0.2, -0.2)$ with $\\Gamma = 0.01I$. What is $\\Phi = \\frac{1}{2}r^\\top\\Gamma^{-1}r$?", 4.5, 0.001),
  m("bayesian-inverse-problems", "b-map-mean", 6, "For a nonlinear forward map, the MAP estimate and posterior mean:", "Can differ substantially, and the MAP may be unrepresentative of the posterior",
    [["Always coincide", "Only in the linear–Gaussian case."], ["Are both undefined", "No."], ["Differ only by noise", "No."]]),
  n("linear-gaussian-inverse-problems", "b-simple", 2, "Prior $u \\sim N(0, 4)$, $y = u + \\eta$ with $\\eta \\sim N(0, 4)$, $y = 2$. What is the posterior mean?", 1, 0.001),
  m("linear-gaussian-inverse-problems", "b-offline", 7, "In linear–Gaussian inversion the posterior covariance:", "Doesn't depend on the observed $y$, so it can be computed before data arrive",
    [["Depends strongly on $y$", "Only the mean depends on $y$."], ["Equals the prior covariance", "The data reduce it."], ["Is always diagonal", "No."]]),
  m("function-space-priors", "b-spec", 1, "A Gaussian prior on functions is specified by:", "A mean function and a covariance operator (or kernel)",
    [["A single variance", "Needs spatial structure."], ["A generator function", "That's copulas."], ["The data", "The prior precedes them."]]),
  n("function-space-priors", "b-lam3", 3, "Eigenvalues $\\lambda_j = 9/j^2$. What is the variance of the third KL coefficient $\\sqrt{\\lambda_3}\\,\\xi_3$?", 1, 0.001),
  n("function-space-priors", "b-frac1", 5, "Eigenvalues $\\lambda_j = 1/j^2$. What fraction of $\\mathbb{E}\\|u - m_0\\|^2$ does the first term capture, $1/(\\pi^2/6)$ (to $4$ decimals)?", 0.6079, 0.002),
  s("function-space-priors", "b-explain-penalty", 8, "How does a Gaussian prior's covariance correspond to a regularisation penalty?",
    "The negative log prior is $\\frac{1}{2}\\|C_0^{-1/2}(u - m_0)\\|^2$, the Cameron–Martin norm, which is the MAP's penalty term.",
    "For $C_0 = (-\\Delta)^{-\\alpha}$ this penalises $\\int |(-\\Delta)^{\\alpha/2}u|^2$ — derivatives of order $\\alpha$ — so faster eigenvalue decay means a stronger smoothness penalty."),
  m("pcn-mcmc", "b-acronym", 2, "pCN stands for:", "Preconditioned Crank–Nicolson",
    [["Posterior conditional normal", "No."], ["Particle chain network", "No."], ["Projected conjugate Newton", "No."]]),
  n("pcn-mcmc", "b-shrink08", 4, "With $\\beta = 0.8$, what is $\\sqrt{1 - \\beta^2}$?", 0.6, 0.001),
  s("pcn-mcmc", "b-transfer-nongauss", 8.5, "pCN needs a Gaussian prior. How can it be used with a non-Gaussian prior?",
    "Write $u = T(\\xi)$ with $\\xi$ Gaussian (e.g. $\\log$-transforms, level sets, or a whitening map), so the prior is a pushforward of a Gaussian.",
    "Run pCN on $\\xi$ with the misfit $\\Phi(T(\\xi))$; the proposal still preserves the Gaussian reference measure, keeping mesh-robustness."),
  m("ensemble-kalman-inversion", "b-size", 1.5, "Compared with the parameter dimension, EKI ensembles are typically:", "Much smaller (tens to hundreds of members)",
    [["Much larger", "Too expensive."], ["Exactly equal", "No."], ["Of size one", "Needs covariances."]]),
  n("ensemble-kalman-inversion", "b-gain-new", 4.5, "Ensemble parameters $1, 3, 5$ with predictions $1, 2, 3$ and $\\Gamma = 1$. $C^{up} = 2$ and $C^{pp} = 1$. What is the gain?", 1, 0.001),
  m("ensemble-kalman-inversion", "b-bimodal", 7, "EKI struggles with bimodal posteriors because:", "Its update uses only means and covariances, as if the problem were linear–Gaussian",
    [["It uses too many samples", "No."], ["It needs gradients", "It doesn't."], ["It ignores the prior", "It uses the prior ensemble."]]),
  m("approximate-bayesian-computation", "b-eps", 2, "In ABC, $\\varepsilon$ is:", "The tolerance on the distance between simulated and observed summaries",
    [["The noise variance", "Not in the likelihood sense."], ["The prior variance", "No."], ["The acceptance rate", "Related but not the same."]]),
  n("approximate-bayesian-computation", "b-rate", 4, "$200$ of $40\\,000$ simulations are accepted. What is the acceptance rate?", 0.005, 0.001),
  s("approximate-bayesian-computation", "b-explain-wide", 8.5, "Why is the rejection-ABC posterior typically wider than the true posterior when $\\varepsilon > 0$?",
    "Accepted $\\theta$ need only produce data near $y$, so parameters that rarely produce $y$ exactly but often come close are accepted too.",
    "This convolves the posterior with the tolerance kernel, inflating spread; smaller $\\varepsilon$ or regression adjustment reduces it."),

  // --- Functional Data Analysis ------------------------------------------
  m("orthonormal-function-bases", "b-period", 2, "A Fourier basis on $[0, T]$ has fundamental period:", "$T$",
    [["$2\\pi$", "Only if $T = 2\\pi$."], ["$1$", "Only if $T = 1$."], ["$T/2$", "No."]]),
  n("orthonormal-function-bases", "b-norm3", 3, "$f$ has orthonormal coefficients $1, -2, 2$ and $0$ after. What is $\\|f\\|$?", 3, 0.001),
  n("orthonormal-function-bases", "b-leg-const", 5.5, "On $[-1, 1]$, what is the coefficient of $f = 1$ on $\\sqrt{1/2}$ (to $4$ decimals)?", 1.4142, 0.002),
  m("basis-function-expansion", "b-knot", 6.5, "Adding one interior knot to a B-spline basis of fixed order:", "Adds one basis function",
    [["Adds as many functions as the order", "Only one."], ["Leaves the size unchanged", "It grows by one."], ["Doubles the basis", "No."]]),
  m("roughness-penalty-smoothing", "b-lambda-up", 2.5, "Increasing $\\lambda$ gives:", "A smoother fit with fewer effective degrees of freedom",
    [["A rougher fit", "Opposite."], ["More effective df", "Fewer."], ["No change", "No."]]),
  n("roughness-penalty-smoothing", "b-gcv3", 5, "$n = 50$, $\\mathrm{SSE} = 10$, $\\mathrm{df} = 5$. What is GCV (to $4$ decimals)?", 0.2469, 0.002),
  m("roughness-penalty-smoothing", "b-df-meaning", 7, "A smoother with $5$ effective degrees of freedom is roughly:", "As flexible as a regression with $5$ free parameters",
    [["Using exactly $5$ basis functions", "It may use many, shrunk."], ["Interpolating $5$ points", "No."], ["A degree-$5$ polynomial", "Not necessarily."]]),
  n("curve-registration", "b-h-sq", 2.5, "The warp $h(t) = t^2$ on $[0, 1]$. What is $h(0.5)$?", 0.25, 0.001),
  n("mean-covariance-functions", "b-sd", 2.5, "$C(t, t) = 9$. What is the pointwise standard deviation of $X(t)$?", 3, 0.001),
  n("bounded-linear-operators", "b-mult3", 3, "What is the norm of $(Mf)(t) = (3 - t)f(t)$ on $L^2[0, 1]$?", 3, 0.001),
  n("compact-operators", "b-lam4", 2.5, "A compact operator has eigenvalues $\\lambda_j = 1/j$. What is $\\lambda_4$?", 0.25, 0.001),
  n("projected-variance", "b-nonunit", 4, "Eigenvalues $6, 3, 1$. What is $\\operatorname{Var}\\langle X, \\phi_1 + \\phi_3\\rangle$?", 7, 0.001),
  n("fpc-scores", "b-read", 3, "$X - \\mu = 3\\phi_1 + 2\\phi_2$. What is the second score $\\xi_2$?", 2, 0.001),
  n("cross-covariance-operators", "b-scalar-proj", 4.5, "Scalar $Y$ with $c(s) = \\operatorname{Cov}(X(s), Y) = 2s$ on $[0, 1]$. What is $\\operatorname{Cov}(\\langle X, 1\\rangle, Y)$?", 1, 0.001),
];
