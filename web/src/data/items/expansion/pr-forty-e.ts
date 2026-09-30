import type { Item } from "../../../lib/assessment/types";
import { makeBuilders } from "../authoring";
import { EXPANSION } from "./source";

/** Probability 40-pass (part E): inequalities, laws of large numbers, sufficiency, information, power. */
const { mcq, short, num } = makeBuilders(EXPANSION);

const s = (concept: string, slug: string, level: number, stem: string, a: string, b: string) =>
  short({ concept, slug, cognitive: level >= 8.5 ? "transfer" : "explain", level, seconds: level >= 9 ? 300 : 200, stem },
    [["main", a, 5, true], ["detail", b, 4, true]]);
const n = (concept: string, slug: string, level: number, stem: string, key: number, tol = 0.01) =>
  num({ concept, slug, cognitive: "apply", level, seconds: level >= 7 ? 90 : 25, stem }, key, tol);
const m = (concept: string, slug: string, level: number, stem: string, right: string, wrong: [string, string][]) =>
  mcq({ concept, slug, cognitive: level <= 3 ? "recall" : "apply", level, seconds: 25, stem },
    right, wrong.map(([t, why], i) => [t, `${concept}-${slug}-${i}`, why] as [string, string, string]));

const MK = "markov-inequality";
const JE = "jensen-inequality";
const CH = "chebyshev-inequality";
const LL = "law-of-large-numbers";
const SU = "sufficient-statistic";
const CR = "correlation";
const TV = "law-of-total-variance";
const FI = "fisher-information";
const CB = "cramer-rao-lower-bound";
const PW = "power";

export const prFortyEItems: Item[] = [
  // --- markov-inequality ----------------------------------------------------------------
  n(MK, "x4p-basic", 4, "$X \\ge 0$ has mean $5$. What is Markov's bound on $P(X \\ge 20)$?", 0.25, 0.001),
  n(MK, "x4p-square", 7, "$\\mathbb{E}[X^2] = 4$. Apply Markov's inequality to $X^2$ to bound $P(|X| \\ge 4)$.", 0.25, 0.001),
  n(MK, "x4p-true", 8, "For $X \\sim \\mathrm{Exp}(1)$, compute the exact $P(X \\ge 3)$.", 0.0498, 0.0005),
  n(MK, "x4p-bound", 8, "What is Markov's bound on $P(X \\ge 3)$ for the same $X$?", 0.3333, 0.001),
  s(MK, "x4p-tight", 8.5, "When is Markov's inequality tight?",
    "When $X$ takes only the values $0$ and $a$, with $P(X = a) = \\mu/a$: then $P(X \\ge a) = \\mu/a$ exactly.",
    "So the bound can't be improved using only the mean; better bounds need more information (variance, MGF)."),
  n(MK, "x4p-extremal", 8.5, "For the distribution making Markov's bound tight with mean $5$ and $a = 20$, compute $P(X = 20)$.", 0.25, 0.001),
  n(MK, "x4p-chernoff", 9, "Apply Markov's inequality to $e^{tX}$ for $X \\sim N(0, 1)$ and optimise over $t$. What bound results for $P(X \\ge 3)$?", 0.01111, 0.0002),
  s(MK, "x4p-parent", 9, "Explain how Markov's inequality underlies Chebyshev's inequality and Chernoff bounds.",
    "Apply Markov's inequality to a non-negative increasing function of the deviation: $(X - \\mu)^2$ gives Chebyshev; $e^{tX}$ gives Chernoff.",
    "The more of the distribution the function captures, the tighter the bound: variance gives $1/k^2$ decay, the MGF exponential decay."),
  n(MK, "x4p-runtime", 9, "A randomised algorithm has expected running time $10$ seconds. Bound the probability that it runs for at least $100$ seconds.", 0.1, 0.001),
  s(MK, "x4p-lasvegas", 9.5, "How does Markov's inequality turn a Las Vegas algorithm (always correct, random running time) into a Monte Carlo algorithm with bounded running time?",
    "Stop the algorithm after $2\\mathbb{E}[T]$ steps: by Markov's inequality it fails to finish with probability at most $\\tfrac12$.",
    "Repeating $k$ independent runs drives the failure probability to at most $2^{-k}$ with total time $O(k\\mathbb{E}[T])$."),

  // --- jensen-inequality -----------------------------------------------------------------
  m(JE, "x4p-statement", 4, "For a convex function $g$, Jensen's inequality says:", "$g(\\mathbb{E}[X]) \\le \\mathbb{E}[g(X)]$",
    [["$g(\\mathbb{E}[X]) \\ge \\mathbb{E}[g(X)]$", "That's for concave $g$."], ["$g(\\mathbb{E}[X]) = \\mathbb{E}[g(X)]$", "Only for linear $g$."], ["$\\mathbb{E}[g(X)] \\le 0$", "No."]]),
  n(JE, "x4p-sqrt", 7, "$X$ is equally likely to be $1$ or $9$. Compute $\\sqrt{\\mathbb{E}[X]} - \\mathbb{E}[\\sqrt{X}]$.", 0.2361, 0.001),
  n(JE, "x4p-square", 8, "For the same $X$, compute $\\mathbb{E}[X^2] - (\\mathbb{E}[X])^2$.", 16),
  n(JE, "x4p-gm", 8, "Compute the geometric mean of $1$ and $9$.", 3),
  s(JE, "x4p-amgm", 8.5, "Use Jensen's inequality to prove the AM–GM inequality.",
    "$\\log$ is concave, so $\\mathbb{E}[\\log X] \\le \\log\\mathbb{E}[X]$; with $X$ uniform on $x_1, \\ldots, x_n$ this is $\\frac1n\\sum\\log x_i \\le \\log\\frac1n\\sum x_i$.",
    "Exponentiating gives $(\\prod x_i)^{1/n} \\le \\frac1n\\sum x_i$, with equality only when all $x_i$ are equal."),
  n(JE, "x4p-recip", 8.5, "$X$ is equally likely to be $1$ or $4$. Compute $\\mathbb{E}[1/X] - 1/\\mathbb{E}[X]$.", 0.225, 0.001),
  n(JE, "x4p-drag", 9, "An investment returns $+50\\%$ then $-50\\%$. What multiple of the starting wealth remains?", 0.75, 0.001),
  s(JE, "x4p-volatility", 9, "Explain volatility drag using Jensen's inequality.",
    "Long-run wealth grows at $\\mathbb{E}[\\log(1 + R)]$, and since $\\log$ is concave this is below $\\log(1 + \\mathbb{E}[R])$.",
    "For small returns, $\\mathbb{E}[\\log(1 + R)] \\approx \\mu - \\sigma^2/2$: volatility lowers compound growth even when the average return is unchanged."),
  n(JE, "x4p-growth", 9, "Approximate the compound growth rate $\\mu - \\sigma^2/2$ for $\\mu = 0.08$ and $\\sigma = 0.2$.", 0.06, 0.0005),
  s(JE, "x4p-gibbs", 9.5, "Use Jensen's inequality to prove that KL divergence is non-negative.",
    "$-\\mathrm{KL}(p\\|q) = \\mathbb{E}_p[\\log\\frac{q(X)}{p(X)}] \\le \\log\\mathbb{E}_p[\\frac{q(X)}{p(X)}] = \\log\\sum_xq(x) \\le \\log 1 = 0$.",
    "Since $\\log$ is strictly concave, equality requires $q/p$ to be constant, i.e. $p = q$ (Gibbs' inequality)."),

  // --- chebyshev-inequality ---------------------------------------------------------------
  n(CH, "x4p-2sd", 4, "What is Chebyshev's bound on $P(|X - \\mu| \\ge 2\\sigma)$?", 0.25, 0.001),
  n(CH, "x4p-within", 7, "$X$ has mean $50$ and SD $5$. What lower bound does Chebyshev give for $P(40 < X < 60)$?", 0.75, 0.001),
  n(CH, "x4p-k95", 8, "How many SDs from the mean does Chebyshev need to guarantee at least $95\\%$ coverage?", 4.4721, 0.001),
  n(CH, "x4p-sample", 8, "Using Chebyshev with $\\mathrm{Var}(X_i) \\le \\tfrac14$, how large must $n$ be to ensure $P(|\\bar{X} - p| \\ge 0.05) \\le 0.05$ for Bernoulli data?", 2000),
  s(CH, "x4p-loose", 8.5, "Why is Chebyshev's inequality often loose, and when is it tight?",
    "It uses only the variance, so it must hold for every distribution with that variance; for normal data $P(|Z| \\ge 2) \\approx 0.046$ versus the bound $0.25$.",
    "It's tight for the three-point distribution with mass $\\frac{1}{2k^2}$ at $\\mu \\pm k\\sigma$ and the rest at $\\mu$."),
  n(CH, "x4p-extremal", 8.5, "For the distribution making Chebyshev tight at $k = 2$, what total probability sits at $\\mu \\pm 2\\sigma$?", 0.25, 0.001),
  n(CH, "x4p-cantelli", 9, "Cantelli's one-sided inequality gives $P(X - \\mu \\ge k\\sigma) \\le 1/(1 + k^2)$. Compute it for $k = 2$.", 0.2, 0.001),
  s(CH, "x4p-wlln", 9, "Prove the weak law of large numbers using Chebyshev's inequality.",
    "For i.i.d. $X_i$ with variance $\\sigma^2$, $\\mathrm{Var}(\\bar{X}_n) = \\sigma^2/n$.",
    "Chebyshev gives $P(|\\bar{X}_n - \\mu| \\ge \\varepsilon) \\le \\sigma^2/(n\\varepsilon^2) \\to 0$, so $\\bar{X}_n \\to \\mu$ in probability."),
  n(CH, "x4p-ratio", 9, "For $k = 3$, how many times larger is Chebyshev's bound $1/9$ than the exact normal probability $P(|Z| \\ge 3)$?", 41.16, 0.001),
  s(CH, "x4p-vp", 9.5, "Explain the Vysochanskij–Petunin refinement of Chebyshev's inequality.",
    "For any unimodal distribution, $P(|X - \\mu| \\ge k\\sigma) \\le \\frac{4}{9k^2}$ for $k > \\sqrt{8/3}$.",
    "It justifies the “three-sigma rule”: for any unimodal distribution at most about $4.9\\%$ lies beyond $3\\sigma$, versus $11\\%$ from Chebyshev."),

  // --- law-of-large-numbers --------------------------------------------------------------
  m(LL, "x4p-statement", 4, "The law of large numbers says that the sample mean:", "Converges to the population mean as $n$ grows",
    [["Equals the population mean for $n \\ge 30$", "Only in the limit."], ["Becomes normally distributed", "That's the CLT."], ["Has variance that grows with $n$", "It shrinks."]]),
  n(LL, "x4p-sd", 7, "What is the SD of the proportion of heads after $10{,}000$ fair flips?", 0.005, 0.0001),
  n(LL, "x4p-abs", 8, "The expected $|\\text{heads} - \\text{tails}|$ is about $\\sqrt{2n/\\pi}$. Compute it for $n = 10{,}000$.", 79.79, 0.001),
  m(LL, "x4p-fallacy", 8, "The gambler's fallacy misreads the law of large numbers because:", "Averages converge by swamping past deviations, not by future outcomes compensating for them",
    [["The law doesn't apply to coins", "It does."], ["Streaks make future outcomes independent", "They were always independent."], ["The law needs $n \\ge 30$", "No."]]),
  s(LL, "x4p-weak-strong", 8.5, "Distinguish the weak law from the strong law of large numbers.",
    "Weak law: $\\bar{X}_n \\to \\mu$ in probability — for each large $n$, a big deviation is unlikely.",
    "Strong law: $\\bar{X}_n \\to \\mu$ almost surely — with probability $1$ the entire sequence converges. The strong law needs only $\\mathbb{E}|X| < \\infty$ for i.i.d. data (Kolmogorov)."),
  n(LL, "x4p-mc-pi", 8.5, "Estimate $\\pi$ as $4\\hat{p}$ from $10{,}000$ uniform points in the unit square ($p = \\pi/4$ lands in the quarter circle). Compute the SE of the estimate.", 0.01642, 0.0002),
  n(LL, "x4p-cauchy", 9, "The mean of $1000$ i.i.d. standard Cauchy variables: compute $P(|\\bar{X}| > 1)$.", 0.5, 0.001),
  s(LL, "x4p-cauchy-why", 9, "Why does the law of large numbers fail for Cauchy data?",
    "The Cauchy has no mean ($\\mathbb{E}|X| = \\infty$), so the LLN's hypothesis fails.",
    "In fact $\\bar{X}_n$ has exactly the same standard Cauchy distribution for every $n$: occasional huge values keep dominating the average."),
  s(LL, "x4p-ergodic", 9, "Explain the ergodic theorem as a law of large numbers for dependent data.",
    "For a stationary ergodic process, time averages $\\frac1n\\sum f(X_t)$ converge to $\\mathbb{E}[f(X)]$ even though observations are dependent.",
    "This justifies MCMC and time-series averages; dependence slows convergence by the integrated autocorrelation factor."),
  n(LL, "x4p-ar1", 9.5, "An AR(1) process with $\\phi = 0.9$ has variance $1$. Approximate the variance of the mean of $1000$ observations, $\\frac1n\\frac{1 + \\phi}{1 - \\phi}$.", 0.019, 0.0005),

  // --- sufficient-statistic --------------------------------------------------------------
  m(SU, "x4p-def", 4, "A statistic $T$ is sufficient for $\\theta$ if:", "The conditional distribution of the data given $T$ doesn't depend on $\\theta$",
    [["$T$ is unbiased for $\\theta$", "Different concept."], ["$T$ has minimum variance", "No."], ["$T$ equals the MLE", "Not the definition."]]),
  m(SU, "x4p-bern", 7, "A sufficient statistic for $p$ from $n$ Bernoulli trials is:", "The number of successes",
    [["The first observation", "Throws information away."], ["The sample variance only", "No."], ["The order of successes", "The order carries no information about $p$."]]),
  m(SU, "x4p-unif", 8, "A sufficient statistic for $\\theta$ in $\\mathrm{Uniform}(0, \\theta)$ is:", "The sample maximum",
    [["The sample mean", "Not sufficient."], ["The sample minimum", "No."], ["The median", "No."]]),
  m(SU, "x4p-normal", 8, "A minimal sufficient statistic for $(\\mu, \\sigma^2)$ in the normal model is:", "$(\\sum x_i, \\sum x_i^2)$",
    [["$\\sum x_i$ alone", "Misses $\\sigma^2$."], ["The whole sample", "Sufficient but not minimal."], ["The median", "No."]]),
  s(SU, "x4p-factor", 8.5, "State the factorisation theorem.",
    "$T$ is sufficient for $\\theta$ if and only if the likelihood factorises as $f(x \\mid \\theta) = g(T(x), \\theta)h(x)$.",
    "The data affect the likelihood's shape in $\\theta$ only through $T$; e.g. for Poisson data $\\prod e^{-\\lambda}\\lambda^{x_i}/x_i! = e^{-n\\lambda}\\lambda^{\\sum x_i} \\cdot \\prod 1/x_i!$."),
  n(SU, "x4p-cond", 8.5, "$5$ Bernoulli trials with total $T = 3$ successes. Compute $P(X_1 = 1 \\mid T = 3)$.", 0.6, 0.001),
  s(SU, "x4p-rb", 9, "Explain the Rao–Blackwell theorem.",
    "If $\\delta$ is an estimator and $T$ is sufficient, $\\mathbb{E}[\\delta \\mid T]$ is a valid estimator (it doesn't depend on $\\theta$) with the same bias and no larger MSE.",
    "With a complete sufficient $T$, the Lehmann–Scheffé theorem says the Rao–Blackwellised unbiased estimator is the unique UMVUE."),
  n(SU, "x4p-rb-calc", 9, "Rao–Blackwellise $\\delta = X_1$ (the first Bernoulli observation) given $T = 3$ successes in $n = 5$. Compute the result.", 0.6, 0.001),
  m(SU, "x4p-cauchy", 9, "For the Cauchy location model, the minimal sufficient statistic is:", "The order statistics — no reduction beyond them is possible",
    [["The sample mean", "Not sufficient."], ["The sample median", "Not sufficient."], ["$(\\sum x_i, \\sum x_i^2)$", "That's the normal model."]]),
  s(SU, "x4p-complete", 9.5, "What is completeness, and why does it matter?",
    "$T$ is complete if $\\mathbb{E}_\\theta[g(T)] = 0$ for all $\\theta$ implies $g(T) = 0$ almost surely: no non-trivial function of $T$ has mean zero everywhere.",
    "It makes unbiased functions of $T$ unique (so Rao–Blackwellisation gives the UMVUE), and Basu's theorem says a complete sufficient statistic is independent of every ancillary statistic."),

  // --- correlation (9) ---------------------------------------------------------------------
  n(CR, "x4p-rho", 7, "$\\mathrm{Cov}(X, Y) = 6$, $\\mathrm{SD}(X) = 2$ and $\\mathrm{SD}(Y) = 5$. Compute $\\rho$.", 0.6, 0.001),
  n(CR, "x4p-linear", 8, "$Y = 3 - 2X$. Compute $\\rho(X, Y)$.", -1),
  n(CR, "x4p-sum", 8, "$X$ and $Y$ are i.i.d. Compute $\\rho(X, X + Y)$.", 0.7071, 0.001),
  s(CR, "x4p-not", 8.5, "Why is correlation neither causation nor a full measure of dependence?",
    "A correlation can arise from confounding, reverse causation or selection, so it doesn't identify a causal effect.",
    "It measures only linear association: variables can be strongly dependent (e.g. $Y = X^2$ for symmetric $X$) with zero correlation."),
  n(CR, "x4p-atten", 8.5, "True correlation $0.6$; the measures have reliabilities $0.8$ and $0.9$. Compute the attenuated observed correlation $\\rho\\sqrt{r_1r_2}$.", 0.5091, 0.001),
  n(CR, "x4p-fisherz", 9, "Compute Fisher's $z$-transform $\\operatorname{artanh}(r)$ for $r = 0.5$.", 0.5493, 0.001),
  n(CR, "x4p-se", 9, "What is the SE of Fisher's $z$ with $n = 28$?", 0.2, 0.001),
  s(CR, "x4p-range", 9, "Explain how range restriction affects correlation.",
    "Selecting cases on a narrow range of $X$ (e.g. only admitted students) reduces $X$'s variance while noise stays the same, so the correlation shrinks.",
    "Predictors can look useless within a selected group even though they predict well in the full population; corrections (Thorndike) exist."),
  s(CR, "x4p-ecological", 9.5, "What is the ecological fallacy, and how does aggregation affect correlations?",
    "Correlations between group averages (states, schools) are usually much larger than, and can even differ in sign from, correlations between individuals.",
    "Averaging removes within-group noise; Robinson (1950) showed literacy and nativity correlations reversing between state and individual levels. Don't infer individual relationships from aggregate data."),

  // --- law-of-total-variance -------------------------------------------------------------
  n(TV, "x4p-basic", 4, "$\\mathbb{E}[\\mathrm{Var}(Y \\mid X)] = 4$ and $\\mathrm{Var}(\\mathbb{E}[Y \\mid X]) = 5$. Compute $\\mathrm{Var}(Y)$.", 9),
  n(TV, "x4p-mixture", 7, "$X \\sim \\mathrm{Bernoulli}(0.5)$; $Y \\mid X = 0 \\sim N(0, 1)$ and $Y \\mid X = 1 \\sim N(4, 1)$. Compute $\\mathrm{Var}(Y)$.", 5),
  n(TV, "x4p-random-sum", 8, "$N \\sim \\mathrm{Poisson}(4)$, and the $X_i$ have mean $2$ and variance $3$. Compute $\\mathrm{Var}(\\sum_{i=1}^NX_i) = \\mathbb{E}[N]\\mathrm{Var}(X) + \\mathrm{Var}(N)(\\mathbb{E}X)^2$.", 28),
  n(TV, "x4p-fixed", 8, "Compute the variance of the same sum if $N$ is fixed at $4$.", 12),
  s(TV, "x4p-derive", 8.5, "Derive the law of total variance.",
    "$\\mathrm{Var}(Y) = \\mathbb{E}[Y^2] - (\\mathbb{E}Y)^2 = \\mathbb{E}[\\mathbb{E}[Y^2 \\mid X]] - (\\mathbb{E}[\\mathbb{E}[Y \\mid X]])^2$.",
    "Write $\\mathbb{E}[Y^2 \\mid X] = \\mathrm{Var}(Y \\mid X) + \\mathbb{E}[Y \\mid X]^2$; regrouping gives $\\mathbb{E}[\\mathrm{Var}(Y \\mid X)] + \\mathrm{Var}(\\mathbb{E}[Y \\mid X])$."),
  n(TV, "x4p-betabin", 8.5, "$p \\sim \\mathrm{Beta}(1, 1)$ and $X \\mid p \\sim \\mathrm{Bin}(10, p)$. Compute $\\mathrm{Var}(X)$.", 10),
  n(TV, "x4p-icc", 9, "$\\theta \\sim N(0, 4)$ and $Y \\mid \\theta \\sim N(\\theta, 1)$. What fraction of $\\mathrm{Var}(Y)$ is due to $\\theta$ (the intraclass correlation)?", 0.8, 0.001),
  s(TV, "x4p-r2", 9, "Explain $R^2$ as a law-of-total-variance decomposition.",
    "$\\mathrm{Var}(Y) = \\mathrm{Var}(\\mathbb{E}[Y \\mid X]) + \\mathbb{E}[\\mathrm{Var}(Y \\mid X)]$: explained plus unexplained variance.",
    "The population $R^2$ is $\\mathrm{Var}(\\mathbb{E}[Y \\mid X])/\\mathrm{Var}(Y)$, the share explained by the best predictor; linear regression estimates it for the best linear predictor."),
  n(TV, "x4p-compound", 9, "Compound Poisson claims: $N \\sim \\mathrm{Poisson}(10)$ with exponential claim sizes of mean $100$. Compute $\\mathrm{Var}(\\text{total}) = \\lambda\\mathbb{E}[X^2]$.", 200000),
  s(TV, "x4p-components", 9.5, "Explain how the law of total variance underlies variance-components and random-effects models.",
    "With $Y_{ij} = \\mu + a_i + e_{ij}$, conditioning on the group gives $\\mathrm{Var}(Y) = \\sigma_a^2 + \\sigma_e^2$: between-group plus within-group variance.",
    "Random-effects models estimate these components (e.g. from ANOVA mean squares or REML); the intraclass correlation $\\sigma_a^2/(\\sigma_a^2 + \\sigma_e^2)$ governs design effects and shrinkage."),

  // --- fisher-information ------------------------------------------------------------------
  n(FI, "x4p-bern", 4, "Compute the Fisher information for $p$ in one Bernoulli trial at $p = 0.5$.", 4),
  n(FI, "x4p-poisson", 7, "Compute the Fisher information for $\\lambda$ in one Poisson observation at $\\lambda = 2$.", 0.5, 0.001),
  n(FI, "x4p-normal", 8, "Normal mean with $\\sigma = 2$ and $n = 25$: compute the Fisher information.", 6.25, 0.001),
  n(FI, "x4p-exp", 8, "Exponential rate $\\lambda = 0.5$ with $n = 10$: compute $I_n(\\lambda) = n/\\lambda^2$.", 40),
  s(FI, "x4p-forms", 8.5, "Give the two equivalent forms of Fisher information and explain why they agree.",
    "$I(\\theta) = \\mathbb{E}[(\\partial_\\theta\\log f)^2] = -\\mathbb{E}[\\partial_\\theta^2\\log f]$.",
    "The score has mean $0$; differentiating $\\int\\partial_\\theta f = 0$ once more gives $\\mathbb{E}[\\partial^2\\log f] + \\mathbb{E}[(\\partial\\log f)^2] = 0$ (under regularity conditions allowing differentiation under the integral)."),
  n(FI, "x4p-logodds", 8.5, "In the log-odds parameterisation of a Bernoulli, $I(\\eta) = p(1 - p)$. Evaluate it at $p = 0.2$.", 0.16, 0.001),
  n(FI, "x4p-observed", 9, "$7$ successes in $10$ trials. Compute the observed information at the MLE, $n/(\\hat{p}(1 - \\hat{p}))$.", 47.619, 0.001),
  s(FI, "x4p-obs-exp", 9, "Distinguish observed from expected Fisher information, and say which to use for standard errors.",
    "Expected information averages $-\\partial^2\\ell$ over the model; observed information is $-\\partial^2\\ell$ evaluated at the data and the MLE.",
    "Efron and Hinkley argued the observed information gives more relevant (conditional) standard errors; they coincide in canonical exponential families."),
  n(FI, "x4p-sigma2", 9, "Normal with known mean: the information about $\\sigma^2$ per observation is $1/(2\\sigma^4)$. Compute it for $\\sigma^2 = 2$.", 0.125, 0.001),
  s(FI, "x4p-jeffreys", 9.5, "Explain the Jeffreys prior and why its construction makes it reparameterisation-invariant.",
    "The Jeffreys prior is $\\pi(\\theta) \\propto \\sqrt{I(\\theta)}$.",
    "Under $\\phi = g(\\theta)$, $I(\\phi) = I(\\theta)(d\\theta/d\\phi)^2$, so $\\sqrt{I(\\phi)} = \\sqrt{I(\\theta)}|d\\theta/d\\phi|$ — exactly the Jacobian rule for densities, so every parameterisation gives the same prior. For a Bernoulli it's $\\mathrm{Beta}(\\tfrac12, \\tfrac12)$."),

  // --- cramer-rao-lower-bound -----------------------------------------------------------
  n(CB, "x4p-normal", 4, "Compute the Cramér–Rao lower bound for unbiased estimators of a normal mean with $\\sigma^2 = 9$ and $n = 36$.", 0.25, 0.001),
  n(CB, "x4p-bern", 7, "Compute the Cramér–Rao lower bound for $p$ from $100$ Bernoulli trials at $p = 0.3$.", 0.0021, 0.0001),
  n(CB, "x4p-median-eff", 8, "What is the asymptotic efficiency of the sample median for a normal mean?", 0.6366, 0.001),
  n(CB, "x4p-poisson", 8, "Compute the Cramér–Rao lower bound for $\\lambda = 4$ from $50$ Poisson observations.", 0.08, 0.001),
  s(CB, "x4p-attained", 8.5, "When is the Cramér–Rao lower bound attained exactly?",
    "Only when the score is a linear function of the estimator, $\\partial_\\theta\\ell = I(\\theta)(T - \\theta)$ — which happens exactly in exponential families, for estimators of the mean parameter.",
    "Otherwise no unbiased estimator attains it in finite samples, though the MLE attains it asymptotically."),
  n(CB, "x4p-exp-mean", 8.5, "Exponential data with mean $\\theta = 3$ and $n = 9$; the information per observation is $1/\\theta^2$. Compute the bound.", 1),
  n(CB, "x4p-function", 9, "Normal mean with $\\sigma = 1$ and $n = 16$. Compute the bound for unbiased estimators of $g(\\theta) = \\theta^2$ at $\\theta = 2$, i.e. $g'(\\theta)^2/I_n$.", 1),
  s(CB, "x4p-biased", 9, "How can a biased estimator have variance below the Cramér–Rao lower bound?",
    "The bound as usually stated applies only to unbiased estimators; for bias $b(\\theta)$ it becomes $(1 + b'(\\theta))^2/I_n(\\theta)$.",
    "Shrinkage estimators with $b' < 0$ reduce variance below $1/I_n$, and can have lower MSE despite their bias."),
  s(CB, "x4p-uniform", 9, "Why doesn't the Cramér–Rao lower bound apply to $\\mathrm{Uniform}(0, \\theta)$?",
    "The support depends on $\\theta$, so you can't differentiate under the integral and the regularity conditions fail.",
    "The unbiased estimator $\\frac{n + 1}{n}\\max$ has variance $O(1/n^2)$, far below any $O(1/n)$ “bound”."),
  n(CB, "x4p-uniform-var", 9.5, "Compute the variance of $\\frac{n + 1}{n}\\max$ for $\\mathrm{Uniform}(0, 1)$ with $n = 10$, which is $\\theta^2/(n(n + 2))$.", 0.008333, 0.0001),

  // --- power ------------------------------------------------------------------------------
  n(PW, "x4p-def", 4, "Compute the power of a test with $\\beta = 0.2$.", 0.8, 0.001),
  n(PW, "x4p-z", 7, "A one-sided z-test at $\\alpha = 0.05$ has standardised effect $\\delta\\sqrt{n}/\\sigma = 3$. Compute its power.", 0.9123, 0.001),
  n(PW, "x4p-n", 8, "What $n$ gives $80\\%$ power for a two-sided one-sample z-test at $\\alpha = 0.05$ with $d = 0.5$?", 32),
  n(PW, "x4p-double", 8, "Doubling $n$ multiplies the standardised effect $\\delta\\sqrt{n}/\\sigma$ by what factor?", 1.4142, 0.001),
  s(PW, "x4p-posthoc", 8.5, "Why is post-hoc (“observed”) power uninformative?",
    "Computed from the observed effect, it's a one-to-one function of the p-value, so it adds no information.",
    "A result with $p = 0.05$ always has observed power of about $50\\%$; power is for planning, based on effects that matter."),
  n(PW, "x4p-observed", 8.5, "A two-sided z-test gives exactly $p = 0.05$. What is its observed power (to two decimals)?", 0.5, 0.005),
  n(PW, "x4p-two-sample", 9, "Two-sample test with $d = 0.3$ and $100$ per group at two-sided $\\alpha = 0.05$. Approximate the power as $\\Phi(d\\sqrt{n/2} - 1.96)$.", 0.5641, 0.001),
  s(PW, "x4p-levers", 9, "Explain how power depends on sample size, effect size, variability and $\\alpha$.",
    "Power rises with the standardised effect $\\delta\\sqrt{n}/\\sigma$: larger effects, larger samples and less noise all help; a larger $\\alpha$ also raises power at the cost of more false positives.",
    "Because the effect scales with $\\sqrt{n}$, halving the detectable effect needs four times the sample; reducing variance (better measurement, blocking, covariates) is often cheaper."),
  n(PW, "x4p-n-group", 9, "How many per group give $80\\%$ power for $d = 0.3$ at two-sided $\\alpha = 0.05$? Use $2(2.8016/d)^2$ and round up.", 175),
  s(PW, "x4p-planning", 9.5, "Why do underpowered studies that reach significance overestimate effects, and how should power be planned?",
    "With low power, only estimates that happen to be much larger than the true effect cross the significance threshold, so published significant effects are inflated (Type M error).",
    "Plan power around the smallest effect worth detecting, or a conservative (shrunken) estimate from prior work — not an optimistic pilot estimate."),
];
