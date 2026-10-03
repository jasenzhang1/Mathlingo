import type { Item } from "../../../lib/assessment/types";
import { makeBuilders } from "../authoring";
import { EXPANSION } from "./source";

/** Probability 40-pass (part D): likelihood, transformations, MGFs, estimation, convergence, order statistics. */
const { mcq, short, num } = makeBuilders(EXPANSION);

const s = (concept: string, slug: string, level: number, stem: string, a: string, b: string) =>
  short({ concept, slug, cognitive: level >= 8.5 ? "transfer" : "explain", level, seconds: level >= 9 ? 300 : 200, stem },
    [["main", a, 5, true], ["detail", b, 4, true]]);
const n = (concept: string, slug: string, level: number, stem: string, key: number, tol = 0.01) =>
  num({ concept, slug, cognitive: "apply", level, seconds: level >= 7 ? 90 : 25, stem }, key, tol);
const m = (concept: string, slug: string, level: number, stem: string, right: string, wrong: [string, string][]) =>
  mcq({ concept, slug, cognitive: level <= 3 ? "recall" : "apply", level, seconds: 25, stem },
    right, wrong.map(([t, why], i) => [t, `${concept}-${slug}-${i}`, why] as [string, string, string]));

const LP = "likelihood-vs-probability";
const DT = "distribution-transformations";
const MG = "mgf";
const MM = "method-of-moments";
const ML = "mle";
const MP = "mgf-properties";
const UE = "unbiased-estimator";
const EF = "exponential-family";
const MC = "modes-of-convergence";
const OS = "order-statistics";

export const prFortyDItems: Item[] = [
  // --- likelihood-vs-probability ---------------------------------------------------------
  m(LP, "x4p-function-of", 4, "The likelihood $L(\\theta) = f(x \\mid \\theta)$ is regarded as a function of:", "$\\theta$, with the data held fixed",
    [["$x$, with $\\theta$ fixed", "That's the probability model."], ["Both at once", "The data are fixed once observed."], ["Neither", "No."]]),
  n(LP, "x4p-binom", 7, "$7$ successes are observed in $10$ Bernoulli trials. Compute the likelihood at $p = 0.5$.", 0.1172, 0.001),
  n(LP, "x4p-ratio", 8, "For the same data, compute the likelihood ratio $L(0.7)/L(0.5)$.", 2.2769, 0.001),
  n(LP, "x4p-cutoff", 8, "A relative-likelihood cutoff of $1/8$ corresponds to what drop in log-likelihood from the maximum?", 2.0794, 0.001),
  s(LP, "x4p-integral", 8.5, "Why doesn't the likelihood integrate to $1$ over $\\theta$, and why is that fine?",
    "$f(x \\mid \\theta)$ is a density in $x$, not in $\\theta$; viewed as a function of $\\theta$ it has no reason to integrate to $1$ (the integral may even be infinite).",
    "Only likelihood ratios carry meaning; a Bayesian normalises likelihood $\\times$ prior to get a posterior density."),
  n(LP, "x4p-proportional", 8.5, "Binomial ($n = 12$ fixed, $3$ successes) and negative binomial (sample until the $3$rd success, which took $12$ trials) give proportional likelihoods. Compute the constant ratio $\\binom{12}{3}/\\binom{11}{2}$.", 4),
  s(LP, "x4p-principle", 9, "State the likelihood principle and explain the binomial versus negative binomial example.",
    "If two experiments give proportional likelihood functions, they carry the same evidence about $\\theta$.",
    "Both designs above give $L(p) \\propto p^3(1 - p)^9$, so Bayesian and likelihood inferences agree, but p-values differ because they depend on the unobserved sample space (the stopping rule)."),
  n(LP, "x4p-normal", 9, "One observation $x = 1.2$ from $\\mathcal{N}(\\mu, 1)$. Compute $\\ell(1.2) - \\ell(0)$.", 0.72, 0.001),
  n(LP, "x4p-interval", 9, "A $95\\%$ likelihood-based interval for one parameter keeps values within a log-likelihood drop of $\\chi^2_{1, 0.95}/2$. Compute that drop.", 1.92, 0.005),
  s(LP, "x4p-invariance", 9.5, "Why is the likelihood invariant under reparameterisation, while a density over $\\theta$ is not?",
    "Reparameterising with $\\phi = g(\\theta)$ just relabels the points: $L^*(\\phi) = L(g^{-1}(\\phi))$, with no Jacobian, since the likelihood isn't a density in $\\theta$.",
    "So the MLE is invariant ($\\hat\\phi = g(\\hat\\theta)$), whereas prior and posterior densities pick up a Jacobian and their modes can move."),

  // --- distribution-transformations (9) ---------------------------------------------------------
  n(DT, "x4p-neglog", 7, "$X \\sim \\mathrm{Uniform}(0, 1)$ and $Y = -\\ln X$. Compute $\\mathbb{E}[Y]$.", 1),
  n(DT, "x4p-sqrt", 8, "$X \\sim \\mathrm{Exp}(1)$ and $Y = \\sqrt{X}$, so $f_Y(y) = 2ye^{-y^2}$. Evaluate $f_Y(1)$.", 0.7358, 0.001),
  n(DT, "x4p-lognormal-median", 8, "$Z \\sim \\mathcal{N}(0, 1)$ and $Y = e^Z$. Compute the median of $Y$.", 1),
  n(DT, "x4p-lognormal-mean", 8.5, "For $Y = e^Z$, compute $\\mathbb{E}[Y]$.", 1.6487, 0.001),
  s(DT, "x4p-derive", 8.5, "Derive the change-of-variables formula for a monotone increasing transformation $Y = g(X)$.",
    "$F_Y(y) = P(g(X) \\le y) = F_X(g^{-1}(y))$; differentiating gives $f_Y(y) = f_X(g^{-1}(y))\\left|\\frac{d}{dy}g^{-1}(y)\\right|$.",
    "For decreasing $g$ the same formula holds with the absolute value; for non-monotone $g$, sum over all branches $x$ with $g(x) = y$."),
  n(DT, "x4p-chisq1", 9, "$Z \\sim \\mathcal{N}(0, 1)$ and $Y = Z^2$. Evaluate the density of $Y$ at $y = 1$.", 0.242, 0.001),
  n(DT, "x4p-boxmuller", 9, "Box–Muller uses $R = \\sqrt{-2\\ln U_1}$ with $U_1 \\sim \\mathrm{Uniform}(0, 1)$. Compute $P(R > 2)$.", 0.1353, 0.001),
  s(DT, "x4p-jacobian", 9, "Explain the Jacobian factor in multivariate transformations using polar coordinates.",
    "For an invertible map, $f_{Y}(y) = f_X(h^{-1}(y))|\\det J_{h^{-1}}(y)|$, since the determinant measures how areas change.",
    "For $(X, Y) \\mapsto (R, \\Theta)$, $dx\\,dy = r\\,dr\\,d\\theta$; with i.i.d. normals this gives $f(r, \\theta) = \\frac{1}{2\\pi}re^{-r^2/2}$ — independent Rayleigh radius and uniform angle."),
  s(DT, "x4p-convolution", 9.5, "Explain why the density of $X + Y$ for independent continuous variables is a convolution, and evaluate it at $1.5$ for two $\\mathrm{Uniform}(0, 1)$ variables.",
    "Transform $(X, Y) \\mapsto (X, S = X + Y)$ (Jacobian $1$) and integrate out $X$: $f_S(s) = \\int f_X(x)f_Y(s - x)\\,dx$.",
    "For two uniforms this is the triangular density $2 - s$ on $[1, 2]$, so $f_S(1.5) = 0.5$."),

  // --- mgf -------------------------------------------------------------------------------------
  n(MG, "x4p-bern", 4, "$M(t) = 0.3 + 0.7e^t$. Compute $\\mathbb{E}[X]$.", 0.7, 0.001),
  n(MG, "x4p-gamma-mean", 7, "$M(t) = (1 - 2t)^{-3}$. Compute $\\mathbb{E}[X]$.", 6),
  n(MG, "x4p-gamma-var", 8, "For the same MGF, compute $\\text{Var}(X)$.", 12),
  n(MG, "x4p-normal", 8, "$M(t) = e^{2t + 4.5t^2}$. Compute $\\text{Var}(X)$.", 9),
  s(MG, "x4p-lognormal", 8.5, "Why does the lognormal distribution have no MGF even though all its moments are finite?",
    "$\\mathbb{E}[e^{tX}] = \\infty$ for every $t > 0$, because $e^{tx}$ grows faster than the lognormal tail decays.",
    "Its moments grow so fast that they don't determine the distribution: other distributions share all of the lognormal's moments."),
  n(MG, "x4p-poisson", 8.5, "$M(t) = e^{3(e^t - 1)}$. Compute $P(X = 0)$.", 0.0498, 0.0005),
  n(MG, "x4p-cumulant", 9, "For $\\mathrm{Poisson}(3)$, compute the third cumulant (the third derivative of $\\log M$ at $0$).", 3),
  n(MG, "x4p-laplace", 9, "$M(t) = 1/(1 - t^2)$ for $|t| < 1$. Compute $\\text{Var}(X)$.", 2),
  s(MG, "x4p-unique", 9, "What does it mean that an MGF “determines the distribution,” and why is existence near $0$ needed?",
    "If two MGFs are finite and equal on an open interval around $0$, the distributions are identical (the MGF extends to the characteristic function by analytic continuation).",
    "If the MGF only exists at $t = 0$, it carries no information; that's why characteristic functions, which always exist, are used in general."),
  s(MG, "x4p-clt", 9.5, "Sketch the MGF proof of the central limit theorem.",
    "For standardised i.i.d. $X_i$ (mean $0$, variance $1$) with an MGF, the MGF of $S_n/\\sqrt{n}$ is $M(t/\\sqrt{n})^n = \\left(1 + \\frac{t^2}{2n} + o\\left(\\frac1n\\right)\\right)^n \\to e^{t^2/2}$.",
    "$e^{t^2/2}$ is the standard normal MGF, and pointwise convergence of MGFs near $0$ implies convergence in distribution (continuity theorem)."),

  // --- method-of-moments ---------------------------------------------------------------------
  n(MM, "x4p-poisson", 4, "Compute the method-of-moments estimate of a Poisson mean when $\\bar{x} = 3.2$.", 3.2, 0.001),
  n(MM, "x4p-exp", 7, "Compute the method-of-moments estimate of an exponential rate when $\\bar{x} = 4$.", 0.25, 0.001),
  n(MM, "x4p-unif", 8, "Compute the method-of-moments estimate of $\\theta$ for $\\mathrm{Uniform}(0, \\theta)$ when $\\bar{x} = 5$.", 10),
  n(MM, "x4p-gamma-shape", 8, "Gamma data have $\\bar{x} = 6$ and $s^2 = 12$. Compute the method-of-moments shape $\\hat\\alpha = \\bar{x}^2/s^2$.", 3),
  s(MM, "x4p-impossible", 8.5, "Why can the method-of-moments estimate of $\\theta$ for $\\mathrm{Uniform}(0, \\theta)$ be impossible?",
    "$2\\bar{x}$ can be smaller than the largest observation, giving a $\\theta$ the data rule out (e.g. data $1, 1, 9$ give $\\hat\\theta = 7.33 < 9$).",
    "The MLE (the sample maximum) always respects the support; method of moments ignores that constraint."),
  n(MM, "x4p-gamma-rate", 8.5, "Same data: compute the method-of-moments rate $\\hat\\beta = \\bar{x}/s^2$.", 0.5, 0.001),
  n(MM, "x4p-beta-sum", 9, "Beta data have $\\bar{x} = 0.4$ and $s^2 = 0.02$. Compute $\\hat\\alpha + \\hat\\beta = \\bar{x}(1 - \\bar{x})/s^2 - 1$.", 11),
  n(MM, "x4p-beta-alpha", 9, "Same data: compute $\\hat\\alpha = \\bar{x}(\\hat\\alpha + \\hat\\beta)$.", 4.4, 0.001),
  s(MM, "x4p-vs-mle", 9, "Compare the method of moments with maximum likelihood.",
    "Method of moments is simple and consistent but often less efficient, because moments may not use all the information in the data.",
    "In exponential families, matching the sufficient statistics' moments gives the MLE, so they coincide; otherwise method-of-moments estimates are useful as starting values for MLE."),
  s(MM, "x4p-gmm", 9.5, "Explain the generalised method of moments (GMM) and overidentification.",
    "With more moment conditions $\\mathbb{E}[g(X, \\theta)] = 0$ than parameters, GMM minimises $\\bar{g}(\\theta)^\\top W\\bar{g}(\\theta)$; the efficient weight matrix is the inverse covariance of the moments.",
    "The extra conditions can be tested: Hansen's J-test checks whether all moment conditions can hold at once. GMM is central in econometrics (e.g. instrumental variables)."),

  // --- mle -----------------------------------------------------------------------------------
  n(ML, "x4p-bern", 4, "Compute the MLE of $p$ from $7$ successes in $20$ trials.", 0.35, 0.001),
  n(ML, "x4p-poisson", 7, "Compute the MLE of a Poisson mean from the data $2, 4, 3, 7$.", 4),
  n(ML, "x4p-exp", 8, "Exponential data have $\\bar{x} = 2.5$. Compute the MLE of the rate.", 0.4, 0.001),
  n(ML, "x4p-sigma", 8, "Compute the normal MLE of $\\sigma^2$ (dividing by $n$) from the data $1, 2, 3, 4$.", 1.25, 0.001),
  s(ML, "x4p-invariance", 8.5, "State and justify the invariance property of the MLE.",
    "If $\\hat\\theta$ is the MLE of $\\theta$, then $g(\\hat\\theta)$ is the MLE of $g(\\theta)$.",
    "For one-to-one $g$ this is relabelling: the likelihood in $\\phi = g(\\theta)$ is maximised at $g(\\hat\\theta)$. For other $g$ one uses the induced (profile) likelihood."),
  n(ML, "x4p-survival", 8.5, "Exponential data have $\\bar{x} = 2.5$. Compute the MLE of $P(X > 1)$.", 0.6703, 0.001),
  n(ML, "x4p-shift-hi", 9, "$\\mathrm{Uniform}(\\theta, \\theta + 1)$ data: $2.3, 2.7, 3.1$. Every $\\theta$ in an interval maximises the likelihood. What is the interval's upper end?", 2.3, 0.001),
  n(ML, "x4p-shift-lo", 9, "What is its lower end?", 2.1, 0.001),
  s(ML, "x4p-fail", 9, "Give examples where the MLE doesn't exist or is inconsistent.",
    "In a normal mixture, centring one component on a data point and letting its variance go to $0$ sends the likelihood to infinity, so no MLE exists.",
    "Neyman–Scott: with a separate mean for each pair of observations and a common $\\sigma^2$, the MLE of $\\sigma^2$ converges to $\\sigma^2/2$ — the number of parameters grows with $n$."),
  n(ML, "x4p-neyman-scott", 9.5, "In the Neyman–Scott problem (pairs with their own means, common $\\sigma^2 = 4$), what does the MLE of $\\sigma^2$ converge to?", 2),

  // --- mgf-properties ---------------------------------------------------------------------------
  n(MP, "x4p-scale", 4, "$M_X(t) = e^{t^2/2}$. Compute $M_{2X}(1)$.", 7.389, 0.001),
  n(MP, "x4p-poisson-sum", 7, "$X \\sim \\mathrm{Poisson}(2)$ and $Y \\sim \\mathrm{Poisson}(3)$ are independent. $X + Y$ is Poisson; find its mean.", 5),
  n(MP, "x4p-binom", 8, "The MGF $(0.6 + 0.4e^t)^5$ identifies a binomial distribution. Compute its mean.", 2),
  n(MP, "x4p-normal-sum", 8, "$X \\sim \\mathcal{N}(1, 4)$ and $Y \\sim \\mathcal{N}(2, 5)$ are independent. Compute $\\text{Var}(X + Y)$.", 9),
  s(MP, "x4p-product", 8.5, "Why do the MGFs of independent random variables multiply for their sum?",
    "$M_{X+Y}(t) = \\mathbb{E}[e^{tX}e^{tY}] = \\mathbb{E}[e^{tX}]\\mathbb{E}[e^{tY}]$, since functions of independent variables are independent.",
    "This turns convolution of densities into multiplication, which is why MGFs make sums of independent variables easy."),
  n(MP, "x4p-gamma-square", 8.5, "The square of the $\\mathrm{Gamma}(2, 1)$ MGF is the MGF of a gamma distribution. What is its shape?", 4),
  n(MP, "x4p-hoeffding", 9, "Hoeffding's bound for $\\mathrm{Bin}(100, 0.5)$ gives $P(X \\ge 75) \\le e^{-2n(0.25)^2}$. Compute the bound.", 0.0000037267, 0.0000001),
  n(MP, "x4p-cumulant", 9, "$\\log M(t) = 2t + 3t^2$. Compute $\\mathbb{E}[X]$.", 2),
  s(MP, "x4p-chernoff", 9, "Explain the Chernoff bound technique.",
    "For $t > 0$, Markov's inequality applied to $e^{tX}$ gives $P(X \\ge a) \\le e^{-ta}M(t)$; then optimise over $t$.",
    "It gives exponentially small tail bounds for sums of independent variables; the optimised exponent is the large-deviations rate function (Cramér's theorem)."),
  s(MP, "x4p-uncorr", 9.5, "Why isn't being uncorrelated enough for $M_{X+Y} = M_XM_Y$?",
    "The product rule needs $\\mathbb{E}\\left[e^{tX}e^{tY}\\right] = \\mathbb{E}\\left[e^{tX}\\right]\\mathbb{E}\\left[e^{tY}\\right]$ for all $t$, i.e. uncorrelatedness of all exponential functions — essentially independence.",
    "Example: $X \\sim \\mathcal{N}(0, 1)$ and $Y = SX$ with a random sign are uncorrelated, but $X + Y$ equals $0$ with probability $\\tfrac12$, so its MGF isn’t $e^{t^2}$."),

  // --- unbiased-estimator ------------------------------------------------------------------------
  n(UE, "x4p-mean", 4, "i.i.d. observations have mean $7$. Compute $\\mathbb{E}[\\bar{X}]$.", 7),
  n(UE, "x4p-bias", 7, "Compute the bias of $\\hat\\sigma^2 = \\frac1n\\sum(x_i - \\bar{x})^2$ when $n = 5$ and $\\sigma^2 = 10$.", -2),
  n(UE, "x4p-es", 8, "For a normal sample of size $n = 2$ with $\\sigma = 1$, compute $\\mathbb{E}[s]$.", 0.7979, 0.001),
  n(UE, "x4p-mse", 8, "An estimator has bias $1$ and variance $3$. Compute its MSE.", 4),
  s(UE, "x4p-sd-bias", 8.5, "Why is $s$ biased for $\\sigma$ even though $s^2$ is unbiased for $\\sigma^2$?",
    "The square root is concave, so by Jensen's inequality $\\mathbb{E}[s] = \\mathbb{E}[\\sqrt{s^2}] \\le \\sqrt{\\mathbb{E}[s^2]} = \\sigma$, with strict inequality since $s^2$ is random.",
    "For normal data the bias correction is the constant $c_4(n)$, as used in control charts."),
  n(UE, "x4p-shrink-c", 8.5, "Estimator $c\\bar{X}$ with $\\text{Var}(\\bar{X}) = 1$ and $\\mu = 2$. Compute the MSE-optimal $c = \\dfrac{\\mu^2}{\\mu^2 + \\text{Var}(\\bar{X})}$.", 0.8, 0.001),
  n(UE, "x4p-shrink-mse", 9, "Compute the MSE of $0.8\\bar{X}$ in that setting (compared with $1$ for $\\bar{X}$).", 0.8, 0.001),
  n(UE, "x4p-p2", 9, "The unbiased estimator of $p^2$ from $X \\sim \\mathrm{Bin}(n, p)$ is $\\frac{X(X - 1)}{n(n - 1)}$. Evaluate it for $n = 10$ and $X = 4$.", 0.1333, 0.001),
  s(UE, "x4p-none", 9, "Give an example of a parameter with no unbiased estimator.",
    "For $X \\sim \\mathrm{Bin}(n, p)$, $\\mathbb{E}[g(X)] = \\sum_kg(k)\\binom{n}{k}p^k(1 - p)^{n-k}$ is a polynomial in $p$ of degree at most $n$.",
    "So $1/p$ (or the odds $p/(1 - p)$) can't be estimated unbiasedly — unbiasedness can be too restrictive a criterion."),
  s(UE, "x4p-stein", 9.5, "Explain Stein's paradox.",
    "For $X \\sim N_d(\\theta, I)$ with $d \\ge 3$, the James–Stein estimator $(1 - \\frac{d - 2}{\\|X\\|^2})X$ has lower total MSE than the unbiased $X$ for every $\\theta$.",
    "So $X$ is inadmissible; shrinking towards a common point trades a little bias for a large variance reduction, which has an empirical Bayes interpretation."),

  // --- exponential-family ----------------------------------------------------------------------
  m(EF, "x4p-not", 4, "Which of these is NOT an exponential family in its unknown parameter?", "$\\mathrm{Uniform}(0, \\theta)$",
    [["$\\mathrm{Poisson}(\\lambda)$", "It is one."], ["$\\mathcal{N}(\\mu, \\sigma^2)$", "It is one."], ["$\\mathrm{Gamma}(\\alpha, \\beta)$", "It is one."]]),
  n(EF, "x4p-logit", 7, "Compute the Bernoulli natural parameter $\\eta = \\log\\frac{p}{1 - p}$ at $p = 0.8$.", 1.3863, 0.001),
  n(EF, "x4p-poisson-mean", 8, "For the Poisson, $A(\\eta) = e^\\eta$. Compute $A'(\\eta)$ at $\\eta = \\ln 3$.", 3),
  n(EF, "x4p-normal-eta", 8, "Normal with known $\\sigma^2 = 4$: compute the natural parameter $\\eta = \\mu/\\sigma^2$ for $\\mu = 2$.", 0.5, 0.001),
  s(EF, "x4p-convex", 8.5, "Why is the log-partition function $A(\\eta)$ convex, and what do its derivatives give?",
    "$A'(\\eta) = \\mathbb{E}_\\eta[T(X)]$ and $A''(\\eta) = \\text{Var}_\\eta(T(X)) \\ge 0$, so $A$ is convex.",
    "$A$ is the cumulant generating function of $T$; convexity makes the log-likelihood concave in $\\eta$, so the MLE is unique when it exists."),
  n(EF, "x4p-bern-var", 8.5, "For the Bernoulli at $\\eta = 0$, compute $\\text{Var}(T) = A''(\\eta)$.", 0.25, 0.001),
  n(EF, "x4p-poisson-var", 9, "For the Poisson, compute $A''(\\eta)$ at $\\eta = \\ln 3$.", 3),
  s(EF, "x4p-suff", 9, "Why do exponential families have fixed-dimensional sufficient statistics and conjugate priors?",
    "The density $h(x)e^{\\eta^\\top T(x) - A(\\eta)}$ factorises, so $\\sum T(x_i)$ is sufficient whatever $n$ is; Pitman–Koopman–Darmois says (under regularity) only exponential families have this property.",
    "Priors $\\propto e^{\\eta^\\top\\tau - \\nu A(\\eta)}$ have the same form as the likelihood, so the posterior just updates $\\tau \\to \\tau + \\sum T(x_i)$ and $\\nu \\to \\nu + n$."),
  m(EF, "x4p-mle", 9, "In a full-rank exponential family, the MLE solves:", "$\\frac1n\\sum_iT(x_i) = \\mathbb{E}_\\eta[T(X)]$ — matching the sufficient statistic's mean",
    [["$\\eta = 0$", "No."], ["$A(\\eta) = 0$", "No."], ["$\\sum x_i = 0$", "No."]]),
  s(EF, "x4p-glm", 9.5, "Why are GLMs built on exponential families, and what does the canonical link achieve?",
    "The mean–variance relationship comes from $A$: $\\mu = A'(\\eta)$ and $\\text{Var} = \\phi A''(\\eta)$, which gives a unified fitting method (IRLS).",
    "The canonical link sets $\\eta = x^\\top\\beta$, making $X^\\top y$ sufficient, the log-likelihood concave, and Newton's method equal to Fisher scoring."),

  // --- modes-of-convergence (9) ---------------------------------------------------------------
  m(MC, "x4p-weakest", 7, "Which mode of convergence is the weakest?", "Convergence in distribution",
    [["Almost sure convergence", "The strongest of the common modes."], ["Convergence in probability", "Implies convergence in distribution."], ["Convergence in mean square", "Implies convergence in probability."]]),
  n(MC, "x4p-prob", 8, "$X_n = 1$ with probability $1/n$ and $0$ otherwise. Compute $P(|X_n| > 0.5)$ for $n = 100$.", 0.01, 0.0005),
  m(MC, "x4p-as", 8, "If those $X_n$ are independent, do they converge to $0$ almost surely?", "No — by the second Borel–Cantelli lemma, $X_n = 1$ infinitely often",
    [["Yes, since $P(X_n = 1) \\to 0$", "That gives convergence in probability only."], ["Yes, by the first Borel–Cantelli lemma", "$\\sum 1/n$ diverges."], ["It depends on $X_1$", "No."]]),
  n(MC, "x4p-bc", 8.5, "If instead $P(X_n = 1) = 1/n^2$, compute the expected number of $n$ with $X_n = 1$.", 1.6449, 0.001),
  s(MC, "x4p-prob-not-mean", 8.5, "Give an example of convergence in probability without convergence in mean.",
    "$X_n = n$ with probability $1/n$ and $0$ otherwise: $P(X_n \\ne 0) = 1/n \\to 0$, so $X_n \\to 0$ in probability.",
    "But $\\mathbb{E}[X_n] = 1$ for all $n$; the sequence isn't uniformly integrable, which is exactly what's needed to pass limits through expectations."),
  n(MC, "x4p-mean", 9, "For $X_n = n$ with probability $1/n$ (else $0$), compute $\\mathbb{E}[X_n]$.", 1),
  s(MC, "x4p-borel-cantelli", 9, "State the two Borel–Cantelli lemmas.",
    "If $\\sum P(A_n) < \\infty$, then with probability $1$ only finitely many $A_n$ occur.",
    "If the $A_n$ are independent and $\\sum P(A_n) = \\infty$, then with probability $1$ infinitely many occur. They're the standard tools for proving almost sure convergence."),
  s(MC, "x4p-slutsky", 9, "State Slutsky's theorem and give a standard use.",
    "If $X_n \\to X$ in distribution and $Y_n \\to c$ in probability (a constant), then $X_n + Y_n \\to X + c$ and $X_nY_n \\to cX$ in distribution.",
    "E.g. the $t$-statistic $\\sqrt{n}(\\bar{X} - \\mu)/s$ is asymptotically $\\mathcal{N}(0, 1)$ for any finite-variance data, since $s \\to \\sigma$ in probability."),
  s(MC, "x4p-delta", 9.5, "Explain the continuous mapping theorem and how the delta method follows from it.",
    "If $X_n \\to X$ (in distribution, probability or almost surely) and $g$ is continuous, then $g(X_n) \\to g(X)$ in the same mode.",
    "Delta method: if $\\sqrt{n}(T_n - \\theta) \\to \\mathcal{N}(0, \\sigma^2)$ and $g$ is differentiable, a Taylor expansion plus Slutsky gives $\\sqrt{n}\\left(g(T_n) - g(\\theta)\\right) \\to \\mathcal{N}\\left(0, g'(\\theta)^2\\sigma^2\\right)$."),

  // --- order-statistics --------------------------------------------------------------------------
  n(OS, "x4p-median", 4, "Find the sample median of $3, 9, 1, 7, 5$.", 5),
  n(OS, "x4p-max4", 7, "Compute $\\mathbb{E}[\\max]$ of $4$ i.i.d. $\\text{Uniform}(0, 1)$ variables.", 0.8, 0.001),
  n(OS, "x4p-maxexp", 8, "Compute $P(\\max < 2)$ for $5$ i.i.d. $\\text{Exp}(1)$ variables.", 0.4833, 0.001),
  n(OS, "x4p-range", 8, "Compute the expected range of $4$ i.i.d. $\\text{Uniform}(0, 1)$ variables.", 0.6, 0.001),
  s(OS, "x4p-density", 8.5, "Derive the density of the $k$th order statistic of $n$ i.i.d. observations with CDF $F$ and density $f$.",
    "For $X_{(k)} \\in [x, x + dx]$, one observation must be there, $k - 1$ below $x$ and $n - k$ above; count the arrangements.",
    "$f_{(k)}(x) = \\frac{n!}{(k - 1)!(n - k)!}F(x)^{k-1}(1 - F(x))^{n-k}f(x)$."),
  n(OS, "x4p-median3", 8.5, "Compute $P(\\text{sample median} < 0.3)$ for $3$ i.i.d. $\\text{Uniform}(0, 1)$ variables.", 0.216, 0.001),
  n(OS, "x4p-cov", 9, "For $n = 2$ i.i.d. uniforms, $\\text{Cov}(U_{(i)}, U_{(j)}) = \\frac{i(n - j + 1)}{(n + 1)^2(n + 2)}$. Compute $\\text{Cov}(U_{(1)}, U_{(2)})$.", 0.02778, 0.0002),
  n(OS, "x4p-median-var", 9, "The sample median of $n = 101$ standard normal observations has approximate variance $1/(4nf(0)^2)$. Compute it.", 0.01555, 0.0002),
  s(OS, "x4p-efficiency", 9, "What is the asymptotic efficiency of the sample median relative to the mean for normal data, and when is the median better?",
    "The median's variance is about $\\pi\\sigma^2/(2n)$ against $\\sigma^2/n$ for the mean, an efficiency of $2/\\pi \\approx 0.64$.",
    "For heavy-tailed data the median wins: its efficiency relative to the mean is $2$ for the Laplace, and the mean isn't even consistent for the Cauchy."),
  n(OS, "x4p-coverage", 9.5, "For $n = 10$ i.i.d. continuous observations, compute the probability that the population median lies between $X_{(2)}$ and $X_{(9)}$.", 0.9785, 0.001),
];
