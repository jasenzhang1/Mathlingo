import type { Item } from "../../../lib/assessment/types";
import { makeBuilders } from "../authoring";
import { EXPANSION } from "./source";

/** Probability 40-pass (part C): continuous families, joint/marginal/conditional, covariance, total expectation. */
const { mcq, short, num } = makeBuilders(EXPANSION);

const s = (concept: string, slug: string, level: number, stem: string, a: string, b: string) =>
  short({ concept, slug, cognitive: level >= 8.5 ? "transfer" : "explain", level, seconds: level >= 9 ? 300 : 200, stem },
    [["main", a, 5, true], ["detail", b, 4, true]]);
const n = (concept: string, slug: string, level: number, stem: string, key: number, tol = 0.01) =>
  num({ concept, slug, cognitive: "apply", level, seconds: level >= 7 ? 90 : 25, stem }, key, tol);
const m = (concept: string, slug: string, level: number, stem: string, right: string, wrong: [string, string][]) =>
  mcq({ concept, slug, cognitive: level <= 3 ? "recall" : "apply", level, seconds: 25, stem },
    right, wrong.map(([t, why], i) => [t, `${concept}-${slug}-${i}`, why] as [string, string, string]));

const EP = "exponential-distribution";
const GA = "gamma-distribution";
const BE = "beta-distribution";
const CS = "chi-square-distribution";
const TD = "t-distribution";
const FD = "f-distribution";
const JO = "joint-distribution";
const MA = "marginal-distribution";
const CO = "conditional-distribution";
const CV = "covariance";
const TE = "law-of-total-expectation";

const PXY = "Joint pmf $p(0, 0) = 0.1$, $p(0, 1) = 0.2$, $p(1, 0) = 0.3$, $p(1, 1) = 0.4$";

export const prFortyCItems: Item[] = [
  // --- exponential-distribution -----------------------------------------------------
  n(EP, "x4p-mean", 4, "Compute the mean of an exponential distribution with rate $0.5$.", 2),
  n(EP, "x4p-median", 7, "Compute the median of $\\mathrm{Exp}(2)$.", 0.3466, 0.001),
  n(EP, "x4p-memory", 8, "For $X \\sim \\mathrm{Exp}(1)$, compute $P(X > 3 \\mid X > 1)$.", 0.1353, 0.001),
  n(EP, "x4p-min", 8, "Compute the mean of $\\min(X_1, X_2, X_3)$ for independent exponentials with rates $1$, $2$ and $3$.", 0.1667, 0.001),
  s(EP, "x4p-unique", 8.5, "Show that the exponential is the only continuous memoryless distribution.",
    "Memorylessness says the survival function satisfies $S(s + t) = S(s)S(t)$ for all $s, t \\ge 0$.",
    "The only monotone solutions of this Cauchy functional equation are $S(t) = e^{-\\lambda t}$, i.e. exponential distributions."),
  n(EP, "x4p-cond-mean", 8.5, "For $X \\sim \\mathrm{Exp}(1)$, compute $\\mathbb{E}[X \\mid X > 2]$.", 3),
  n(EP, "x4p-race", 9, "$X, Y$ are independent $\\mathrm{Exp}(1)$. Compute $P(2X < Y)$.", 0.3333, 0.001),
  n(EP, "x4p-hazard", 9, "What is the hazard rate of $\\mathrm{Exp}(0.25)$ at time $t = 7$?", 0.25, 0.001),
  s(EP, "x4p-renyi", 9, "Explain the Rényi representation of exponential order statistics.",
    "For $n$ i.i.d. $\\text{Exp}(\\lambda)$ variables, the minimum is $\\text{Exp}(n\\lambda)$; by memorylessness the remaining $n - 1$ restart, so the next gap is $\\text{Exp}\\left((n - 1)\\lambda\\right)$, and so on.",
    "The spacings are independent exponentials with rates $n\\lambda, (n - 1)\\lambda, \\ldots, \\lambda$, giving $\\mathbb{E}[\\max] = \\frac1\\lambda\\sum_{k=1}^n\\frac1k$."),
  n(EP, "x4p-max3", 9.5, "Compute $\\mathbb{E}[\\max]$ of $3$ i.i.d. $\\text{Exp}(1)$ variables.", 1.8333, 0.001),

  // --- gamma-distribution -----------------------------------------------------------
  n(GA, "x4p-mean", 4, "Compute the mean of $\\mathrm{Gamma}(\\text{shape } 3, \\text{rate } 2)$.", 1.5),
  n(GA, "x4p-var", 7, "Compute its variance.", 0.75, 0.001),
  n(GA, "x4p-shape", 8, "The sum of $4$ i.i.d. $\\text{Exp}(\\text{rate } 2)$ variables is gamma. What is its shape?", 4),
  n(GA, "x4p-mode", 8, "Compute the mode of $\\mathrm{Gamma}(\\text{shape } 3, \\text{rate } 2)$.", 1),
  s(GA, "x4p-poisson", 8.5, "Explain the relation $P(S_n \\le t) = P(N(t) \\ge n)$ between gamma and Poisson distributions.",
    "$S_n$, the $n$th arrival time of a rate-$\\lambda$ Poisson process, is $\\mathrm{Gamma}(n, \\lambda)$, and the $n$th arrival has happened by $t$ exactly when at least $n$ events occurred in $[0, t]$.",
    "So gamma CDFs with integer shape equal Poisson tail sums: $P(S_n \\le t) = \\sum_{k \\ge n}e^{-\\lambda t}(\\lambda t)^k/k!$."),
  n(GA, "x4p-half", 8.5, "Compute $\\Gamma(\\tfrac12)$.", 1.7725, 0.001),
  n(GA, "x4p-tail", 9, "For $X \\sim \\mathrm{Gamma}(\\text{shape } 2, \\text{rate } 1)$, compute $P(X > 3)$.", 0.1991, 0.001),
  n(GA, "x4p-conj", 9, "A $\\text{Gamma}(2, \\text{rate } 1)$ prior on a Poisson rate is updated with counts $3$, $5$ and $4$. Compute the posterior mean.", 3.5),
  s(GA, "x4p-conj-why", 9, "Why is the gamma the conjugate prior for a Poisson rate?",
    "The Poisson likelihood is $\\propto\\lambda^{\\sum x_i}e^{-n\\lambda}$, which has the form of a gamma kernel in $\\lambda$.",
    "Multiplying by a $\\text{Gamma}(\\alpha, \\beta)$ prior gives a $\\text{Gamma}\\left(\\alpha + \\sum x_i, \\beta + n\\right)$ posterior: $\\alpha$ and $\\beta$ act as prior counts and exposure."),
  n(GA, "x4p-beta", 9.5, "$X \\sim \\mathrm{Gamma}(5, 1)$ and $Z \\sim \\mathrm{Gamma}(3, 1)$ are independent. Compute $\\mathbb{E}[X/(X + Z)]$.", 0.625, 0.001),

  // --- beta-distribution --------------------------------------------------------------
  n(BE, "x4p-mean", 4, "Compute the mean of $\\mathrm{Beta}(2, 3)$.", 0.4, 0.001),
  n(BE, "x4p-var", 7, "Compute the variance of $\\mathrm{Beta}(2, 3)$.", 0.04, 0.0005),
  n(BE, "x4p-cdf", 8, "For $\\mathrm{Beta}(2, 2)$, compute $P(X < 0.25)$.", 0.1563, 0.001),
  n(BE, "x4p-post", 8, "A $\\text{Beta}(1, 1)$ prior is updated with $7$ successes in $10$ trials. Compute the posterior mean.", 0.6667, 0.001),
  s(BE, "x4p-order", 8.5, "Why is the $k$th smallest of $n$ i.i.d. uniforms $\\text{Beta}(k, n - k + 1)$?",
    "For $U_{(k)}$ to lie in $[x, x + dx]$, one point must fall there, $k - 1$ below $x$ and $n - k$ above: the density is $\\frac{n!}{(k - 1)!(n - k)!}x^{k-1}(1 - x)^{n-k}$.",
    "That is exactly the $\\mathrm{Beta}(k, n - k + 1)$ density, with mean $k/(n + 1)$."),
  n(BE, "x4p-mode", 8.5, "Compute the mode of $\\mathrm{Beta}(3, 5)$.", 0.3333, 0.001),
  n(BE, "x4p-median-order", 9, "Compute the expected value of the $3$rd smallest of $5$ i.i.d. uniforms.", 0.5, 0.001),
  n(BE, "x4p-pred2", 9, "With a $\\text{Beta}(8, 4)$ posterior, compute the probability that the next two trials are both successes.", 0.4615, 0.001),
  s(BE, "x4p-pseudo", 9, "Explain the interpretation of a beta prior as pseudo-counts and its effective sample size.",
    "$\\mathrm{Beta}(\\alpha, \\beta)$ behaves like $\\alpha$ prior successes and $\\beta$ prior failures (in the posterior update), so its effective sample size is $\\alpha + \\beta$.",
    "The posterior mean $\\frac{\\alpha + x}{\\alpha + \\beta + n}$ is a weighted average of the prior mean and the MLE, with weights $\\alpha + \\beta$ and $n$."),
  n(BE, "x4p-moments", 9.5, "A beta distribution has mean $0.3$ and variance $0.01$. Compute $\\alpha + \\beta$.", 20),

  // --- chi-square-distribution -------------------------------------------------------
  n(CS, "x4p-mean", 4, "Compute the mean of $\\chi^2_5$.", 5),
  n(CS, "x4p-var", 7, "Compute the variance of $\\chi^2_5$.", 10),
  n(CS, "x4p-crit", 8, "The $95$th percentile of $\\chi^2_3$ is $7.815$. What is the probability that the sum of squares of $3$ i.i.d. $\\mathcal{N}(0, 1)$ variables exceeds $7.815$?", 0.05, 0.001),
  n(CS, "x4p-s2", 8, "For a normal sample of size $n = 10$, $(n - 1)S^2/\\sigma^2$ follows a chi-square distribution. Compute its mean.", 9),
  s(CS, "x4p-df", 8.5, "Why does $(n - 1)S^2/\\sigma^2$ have $n - 1$ degrees of freedom rather than $n$?",
    "The residuals $x_i - \\bar{x}$ satisfy one linear constraint, $\\sum(x_i - \\bar{x}) = 0$, so they live in an $(n - 1)$-dimensional subspace.",
    "Rotating to an orthonormal basis of that subspace writes $\\sum(x_i - \\bar{x})^2/\\sigma^2$ as a sum of $n - 1$ independent squared standard normals (Cochran's theorem)."),
  n(CS, "x4p-df2", 8.5, "$\\chi^2_2$ is an exponential distribution. What is its mean?", 2),
  n(CS, "x4p-tail2", 9, "Compute $P(\\chi^2_2 > 6)$.", 0.0498, 0.0005),
  n(CS, "x4p-ci", 9, "A $95\\%$ CI for $\\sigma^2$ with $n = 11$ and $s^2 = 4$, using $\\chi^2_{0.975, 10} = 20.483$ and $\\chi^2_{0.025, 10} = 3.247$. Compute the upper limit.", 12.319, 0.001),
  s(CS, "x4p-nonrobust", 9, "Why is the chi-square confidence interval for a variance so sensitive to non-normality?",
    "Its validity depends on $\\text{Var}(S^2)$, which involves the fourth moment (kurtosis); the chi-square formula assumes normal kurtosis.",
    "With heavy tails the true variance of $S^2$ is much larger, so the interval undercovers badly — and unlike the t-interval, this doesn't improve as $n$ grows."),
  n(CS, "x4p-noncentral", 9.5, "Compute the mean of a noncentral $\\chi^2$ with $k = 3$ degrees of freedom and noncentrality $\\lambda = 4$.", 7),

  // --- t-distribution -----------------------------------------------------------------
  n(TD, "x4p-var", 4, "Compute the variance of $t_5$.", 1.6667, 0.001),
  m(TD, "x4p-t1", 7, "The $t$ distribution with $1$ degree of freedom is:", "The standard Cauchy distribution",
    [["The standard normal", "That's the limit as $\\nu \\to \\infty$."], ["$\\chi^2_1$", "No."], ["Uniform", "No."]]),
  n(TD, "x4p-kurt", 8, "The excess kurtosis of $t_\\nu$ is $6/(\\nu - 4)$. Compute it for $\\nu = 10$.", 1),
  n(TD, "x4p-limit", 8, "What value does the $97.5\\%$ quantile of $t_\\nu$ approach as $\\nu \\to \\infty$?", 1.96, 0.001),
  s(TD, "x4p-mixture", 8.5, "Show how the $t$ distribution is a scale mixture of normals.",
    "$T = Z/\\sqrt{V/\\nu}$ with $V \\sim \\chi^2_\\nu$; equivalently $T \\mid \\tau \\sim \\mathcal{N}(0, 1/\\tau)$ with precision $\\tau \\sim \\text{Gamma}(\\nu/2, \\nu/2)$.",
    "Occasional small precisions produce heavy tails; this representation drives robust t-regression and its EM or Gibbs fitting."),
  n(TD, "x4p-moments", 8.5, "What is the largest integer $k$ with $\\mathbb{E}|T|^k < \\infty$ for $T \\sim t_4$?", 3),
  n(TD, "x4p-density0", 9, "Compute the density of $t_1$ at $0$.", 0.3183, 0.001),
  n(TD, "x4p-ratio", 9, "The $97.5\\%$ quantile of $t_3$ is $3.182$. How many times wider is a $t_3$ interval than a $z$ interval, other things equal?", 1.6235, 0.001),
  s(TD, "x4p-why", 9, "Why use the $t$ distribution rather than the normal for small-sample confidence intervals, and when does it matter?",
    "Replacing $\\sigma$ by $s$ adds uncertainty, so the standardised mean has heavier tails than the normal; normal critical values would give intervals that are too short.",
    "It matters for small $n$ ($t_3$ needs $3.18$ instead of $1.96$); by $n \\approx 30$ the difference is small."),
  s(TD, "x4p-bayes", 9.5, "Explain how the $t$ distribution appears as a marginal posterior in the Bayesian normal model.",
    "With unknown $\\mu$ and $\\sigma^2$ and the reference prior $p(\\mu, \\sigma^2) \\propto 1/\\sigma^2$, the posterior of $\\mu$ given $\\sigma^2$ is normal and $\\sigma^2$ has an inverse-gamma posterior.",
    "Integrating out $\\sigma^2$ gives $\\mu \\mid y \\sim t_{n-1}(\\bar{y}, s^2/n)$, matching the frequentist t-interval numerically."),

  // --- f-distribution -----------------------------------------------------------------
  n(FD, "x4p-mean", 4, "The mean of $F(a, b)$ is $b/(b - 2)$. Compute it for $F(5, 10)$.", 1.25, 0.001),
  m(FD, "x4p-t2", 7, "If $T \\sim t_\\nu$, then $T^2$ follows:", "$F(1, \\nu)$",
    [["$F(\\nu, 1)$", "Degrees of freedom reversed."], ["$\\chi^2_\\nu$", "No."], ["$t_{\\nu^2}$", "No."]]),
  n(FD, "x4p-anova", 8, "An ANOVA has $MS_{\\text{between}} = 20$ and $MS_{\\text{within}} = 5$. Compute $F$.", 4),
  n(FD, "x4p-recip", 8, "If $F \\sim F(5, 10)$, then $1/F \\sim F(a, b)$. What is $a$?", 10),
  s(FD, "x4p-var-test", 8.5, "Why is the F-test for equal variances notoriously sensitive to non-normality?",
    "Its null distribution depends on the ratio of $\\chi^2$ variables, which relies on normal kurtosis; heavy tails make the sample variances far more variable.",
    "So its Type I error can be far from nominal even in large samples; Levene's or Brown–Forsythe tests are robust alternatives."),
  n(FD, "x4p-beta", 8.5, "If $F \\sim F(a, b)$, then $aF/(aF + b) \\sim \\mathrm{Beta}(a/2, b/2)$. Compute the mean of that beta for $a = 4$ and $b = 6$.", 0.4, 0.001),
  n(FD, "x4p-partial", 9, "Partial F-test: $RSS_{\\text{reduced}} = 120$, $RSS_{\\text{full}} = 100$, $q = 2$ restrictions and $n - p = 50$ residual degrees of freedom. Compute $F$.", 5),
  n(FD, "x4p-var", 9, "The variance of $F(a, b)$ is $\\frac{2b^2(a + b - 2)}{a(b - 2)^2(b - 4)}$. Compute it for $F(5, 10)$.", 1.3542, 0.001),
  s(FD, "x4p-t-eq", 9, "Show that for two groups the one-way ANOVA F-statistic equals the square of the pooled two-sample t-statistic.",
    "With two groups, $SS_{\\text{between}} = \\frac{n_1n_2}{n_1 + n_2}(\\bar{x}_1 - \\bar{x}_2)^2$ on $1$ df, and $MS_{\\text{within}}$ is the pooled variance $s_p^2$.",
    "So $F = \\frac{(\\bar{x}_1 - \\bar{x}_2)^2}{s_p^2(1/n_1 + 1/n_2)} = t^2$, and $F(1, n - 2)$ is the distribution of $t_{n-2}^2$."),
  s(FD, "x4p-noncentral", 9.5, "Explain the noncentral $F$ distribution and how it is used for power calculations.",
    "Under the alternative, the numerator sum of squares is a noncentral $\\chi^2$ with noncentrality $\\lambda = \\sum n_i(\\mu_i - \\bar\\mu)^2/\\sigma^2$, so the $F$-statistic is noncentral $F$.",
    "Power is $P(F'(a, b, \\lambda) > F_{\\text{crit}})$; with Cohen's $f^2$, $\\lambda \\approx f^2N$, which is how sample sizes for ANOVA and regression are chosen."),

  // --- joint-distribution --------------------------------------------------------------
  n(JO, "x4p-const", 4, "$f(x, y) = c(x + y)$ on $[0, 1]^2$. Compute $c$.", 1),
  n(JO, "x4p-rect", 7, "For $f(x, y) = x + y$ on $[0, 1]^2$, compute $P(X < 0.5, Y < 0.5)$.", 0.125, 0.001),
  n(JO, "x4p-triangle", 8, "$f(x, y) = 2$ on $0 < x < y < 1$. Compute $P(X + Y < 1)$.", 0.5, 0.001),
  n(JO, "x4p-ex", 8, "For the same density, compute $\\mathbb{E}[X]$.", 0.3333, 0.001),
  s(JO, "x4p-not-marginals", 8.5, "Why can't a joint distribution be recovered from its marginals?",
    "Marginals say nothing about dependence: many joint distributions (independent, comonotone, anything between) share the same marginals.",
    "Copulas describe exactly this missing dependence structure, and the Fréchet–Hoeffding bounds give the range of possible joint CDFs."),
  n(JO, "x4p-cond", 8.5, "Joint pmf $p(0, 0) = 0.2$, $p(0, 1) = 0.3$, $p(1, 0) = 0.1$, $p(1, 1) = 0.4$. Compute $P(X = 1 \\mid Y = 1)$.", 0.5714, 0.001),
  n(JO, "x4p-cov", 9, "For the same pmf, compute $\\text{Cov}(X, Y)$.", 0.05, 0.001),
  n(JO, "x4p-minmax", 9, "$X, Y$ are i.i.d. $\\text{Uniform}(0, 1)$. Compute $P\\left(\\max(X, Y) < 0.8, \\min(X, Y) > 0.3\\right)$.", 0.25, 0.001),
  s(JO, "x4p-sklar", 9, "State Sklar's theorem.",
    "Any joint CDF can be written $F(x, y) = C(F_X(x), F_Y(y))$ for a copula $C$ (a joint CDF on $[0, 1]^2$ with uniform marginals).",
    "The copula is unique when the marginals are continuous; this separates modelling the marginals from modelling the dependence."),
  n(JO, "x4p-radius", 9.5, "$X, Y$ are i.i.d. $\\mathcal{N}(0, 1)$. Compute $P(X^2 + Y^2 > 4)$.", 0.1353, 0.001),

  // --- marginal-distribution ------------------------------------------------------------
  n(MA, "x4p-pmf", 4, `${PXY}. Compute $P(X = 1)$.`, 0.7, 0.001),
  n(MA, "x4p-density", 7, "For $f(x, y) = x + y$ on $[0, 1]^2$, compute the marginal density $f_X(0.5)$.", 1),
  n(MA, "x4p-product", 8, "For $f(x, y) = 6xy^2$ on $[0, 1]^2$, compute the marginal density $f_Y(0.5)$.", 0.75, 0.001),
  n(MA, "x4p-ex", 8, "$f(x, y) = e^{-y}$ for $0 < x < y$. The marginal of $X$ is $e^{-x}$; compute $\\mathbb{E}[X]$.", 1),
  s(MA, "x4p-nuisance", 8.5, "In Bayesian inference, why integrate out nuisance parameters rather than plug in their estimates?",
    "Integrating (marginalising) propagates uncertainty about the nuisance parameters into the inference about the parameter of interest, giving honestly wider intervals.",
    "E.g. integrating out $\\sigma^2$ turns a normal posterior for $\\mu$ into a $t$; plugging in $\\hat\\sigma$ would understate the uncertainty."),
  n(MA, "x4p-ey", 8.5, "For $f(x, y) = e^{-y}$ on $0 < x < y$, the marginal of $Y$ is $\\mathrm{Gamma}(2, 1)$. Compute $\\mathbb{E}[Y]$.", 2),
  n(MA, "x4p-mvn", 9, "Bivariate normal with $\\mu = (1, 2)$ and $\\Sigma = \\begin{bmatrix}4 & 1\\\\1 & 9\\end{bmatrix}$. What is the marginal SD of $Y$?", 3),
  n(MA, "x4p-hier", 9, "$X \\mid \\theta \\sim \\mathcal{N}(\\theta, 1)$ and $\\theta \\sim \\mathcal{N}(0, 4)$. Compute the marginal variance of $X$.", 5),
  s(MA, "x4p-normal-margins", 9, "Why can two variables have normal marginals without being jointly normal?",
    "Joint normality is a statement about the dependence as well as the margins; any copula other than the Gaussian copula combined with normal marginals gives a non-normal joint.",
    "Example: $Y = SX$ with a random sign $S$ has normal margins, but $X + Y$ has an atom at $0$, which is impossible for a bivariate normal."),
  n(MA, "x4p-betabin", 9.5, "$p \\sim \\mathrm{Beta}(1, 1)$ and $X \\mid p \\sim \\mathrm{Bin}(10, p)$. Compute the marginal $P(X = 3)$.", 0.0909, 0.001),

  // --- conditional-distribution --------------------------------------------------------
  n(CO, "x4p-pmf", 4, `${PXY}. Compute $P(Y = 1 \\mid X = 0)$.`, 0.6667, 0.001),
  n(CO, "x4p-bvn-mean", 7, "A standard bivariate normal has $\\rho = 0.6$. Compute $\\mathbb{E}[Y \\mid X = 2]$.", 1.2, 0.001),
  n(CO, "x4p-bvn-var", 8, "Same: compute $\\text{Var}(Y \\mid X = 2)$.", 0.64, 0.001),
  n(CO, "x4p-shift", 8, "$f(x, y) = e^{-y}$ for $0 < x < y$. Compute $\\mathbb{E}[Y \\mid X = 2]$.", 3),
  s(CO, "x4p-density", 8.5, "Why is $f(y \\mid x) = f(x, y)/f_X(x)$ used for continuous $X$ even though $P(X = x) = 0$?",
    "It's the limit of $P(Y \\in dy \\mid X \\in [x, x + h])$ as $h \\to 0$, and it defines a conditional distribution satisfying $P(X \\in A, Y \\in B) = \\int_A\\int_Bf(y \\mid x)\\,dy\\,f_X(x)\\,dx$.",
    "It's only defined up to null sets of $x$; conditioning on a single null event is ambiguous (Borel–Kolmogorov)."),
  n(CO, "x4p-poisson", 8.5, "$X \\sim \\mathrm{Poisson}(3)$ and $Y \\sim \\mathrm{Poisson}(5)$ are independent. Given $X + Y = 8$, compute $\\mathbb{E}[X]$.", 3),
  n(CO, "x4p-poisson-var", 9, "Same: compute $\\text{Var}(X \\mid X + Y = 8)$.", 1.875, 0.001),
  n(CO, "x4p-triangle", 9, "A point is uniform on the triangle $0 < x < y < 1$. Compute $\\mathbb{E}[X \\mid Y = 0.6]$.", 0.3, 0.001),
  s(CO, "x4p-regression", 9, "Explain regression to the mean using the conditional distribution of a bivariate normal.",
    "$\\mathbb{E}[Y \\mid X = x] = \\mu_Y + \\rho\\frac{\\sigma_Y}{\\sigma_X}(x - \\mu_X)$; with $|\\rho| < 1$, an extreme $x$ predicts a less extreme $y$ in standard units.",
    "It runs both ways: $\\mathbb{E}[X \\mid Y]$ also shrinks, so the two regression lines differ — they aren't inverses of each other."),
  n(CO, "x4p-prob", 9.5, "Standard bivariate normal with $\\rho = 0.5$. Compute $P(Y > 0 \\mid X = 1)$.", 0.7181, 0.001),

  // --- covariance --------------------------------------------------------------------------
  n(CV, "x4p-scale", 4, "$\\text{Cov}(X, Y) = 1$. Compute $\\text{Cov}(2X, 3Y)$.", 6),
  n(CV, "x4p-sum", 7, "$\\text{Var}(X) = 4$, $\\text{Var}(Y) = 9$ and $\\text{Cov}(X, Y) = -2$. Compute $\\text{Var}(X + Y)$.", 9),
  n(CV, "x4p-multinomial", 8, "Multinomial with $n = 10$ and $p = (0.2, 0.3, 0.5)$. Compute $\\text{Cov}(N_1, N_2)$.", -0.6, 0.001),
  n(CV, "x4p-square", 8, "$X$ is uniform on $\\lbrace -1, 0, 1\\rbrace$ and $Y = X^2$. Compute $\\text{Cov}(X, Y)$.", 0),
  s(CV, "x4p-zero", 8.5, "Use the previous example to explain why zero covariance doesn't imply independence.",
    "$Y = X^2$ is completely determined by $X$, yet $\\text{Cov}(X, Y) = \\mathbb{E}[X^3] - \\mathbb{E}[X]\\mathbb{E}[X^2] = 0$ by symmetry.",
    "Covariance only measures linear association; a symmetric nonlinear relationship can have zero covariance."),
  n(CV, "x4p-resid", 8.5, "For i.i.d. data with $\\sigma^2 = 4$ and $n = 10$, compute $\\text{Cov}(\\bar{X}, X_1 - \\bar{X})$.", 0),
  n(CV, "x4p-portfolio", 9, "A portfolio has weights $(0.6, 0.4)$, return variances $(0.04, 0.09)$ and correlation $0.3$. Compute the portfolio variance.", 0.03744, 0.0002),
  n(CV, "x4p-minvar", 9, "Two uncorrelated assets have variances $0.04$ and $0.09$. What weight on the first minimises portfolio variance?", 0.6923, 0.001),
  s(CV, "x4p-psd", 9, "Why must a covariance matrix be positive semidefinite, and what does that rule out?",
    "For any weights $\\mathbf{a}$, $\\text{Var}(\\mathbf{a}^\\top \\mathbf{X}) = \\mathbf{a}^\\top\\boldsymbol{\\Sigma} \\mathbf{a} \\ge 0$.",
    "So not every symmetric matrix of plausible numbers is a valid covariance matrix; e.g. three variables can't all have pairwise correlation $-0.9$."),
  n(CV, "x4p-exch", 9.5, "What is the smallest possible common pairwise correlation among $4$ exchangeable random variables?", -0.3333, 0.001),

  // --- law-of-total-expectation ---------------------------------------------------------
  n(TE, "x4p-basic", 4, "$\\mathbb{E}[Y \\mid X = 0] = 2$ with $P(X = 0) = 0.3$, and $\\mathbb{E}[Y \\mid X = 1] = 5$ with $P(X = 1) = 0.7$. Compute $\\mathbb{E}[Y]$.", 4.1, 0.001),
  n(TE, "x4p-customers", 7, "The number of customers is $\\mathrm{Poisson}(4)$ and each spends $25$ on average, independently. Compute the expected total spending.", 100),
  n(TE, "x4p-die-coins", 8, "Roll a die to get $N$, then flip $N$ fair coins. Compute the expected number of heads.", 1.75, 0.001),
  n(TE, "x4p-miner", 8, "A miner picks one of three doors uniformly each time: door $1$ leads out after $2$ hours, door $2$ returns him after $3$ hours, door $3$ after $5$ hours. Compute the expected time to escape.", 10),
  s(TE, "x4p-proof", 8.5, "Prove the law of total expectation for discrete random variables.",
    "$\\mathbb{E}[\\mathbb{E}[Y \\mid X]] = \\sum_x\\mathbb{E}[Y \\mid X = x]P(X = x) = \\sum_x\\sum_yy\\frac{P(X = x, Y = y)}{P(X = x)}P(X = x)$.",
    "This equals $\\sum_yy\\sum_xP(X = x, Y = y) = \\sum_yyP(Y = y) = \\mathbb{E}[Y]$."),
  n(TE, "x4p-random-sum", 8.5, "$N$ is geometric (trials) with $p = 0.25$, and the $X_i$ are i.i.d. exponential with mean $2$, independent of $N$. Compute $\\mathbb{E}\\left[\\sum_{i=1}^N X_i\\right]$.", 8),
  n(TE, "x4p-e", 9, "What is the expected number of $\\mathrm{Uniform}(0, 1)$ draws needed for their sum to exceed $1$?", 2.7183, 0.001),
  n(TE, "x4p-nested", 9, "$X \\sim \\mathrm{Uniform}(0, 1)$ and $Y \\mid X \\sim \\mathrm{Uniform}(0, X)$. Compute $\\mathbb{E}[Y]$.", 0.25, 0.001),
  s(TE, "x4p-e-why", 9, "Why is the expected number of uniform draws needed to exceed a sum of $1$ equal to $e$?",
    "$N > n$ exactly when $U_1 + \\cdots + U_n \\le 1$, which has probability $1/n!$ (the volume of the simplex).",
    "So $\\mathbb{E}[N] = \\sum_{n \\ge 0}P(N > n) = \\sum_{n \\ge 0}1/n! = e$."),
  n(TE, "x4p-branching", 9.5, "In a branching process each individual has $\\mathrm{Poisson}(1.5)$ offspring. Starting from one individual, compute the expected size of generation $5$.", 7.594, 0.001),
];
