import type { Item } from "../../../lib/assessment/types";
import { makeBuilders } from "../authoring";
import { EXPANSION } from "./source";

/** Statistics 40-pass (part B): confidence intervals → rank-sum test. Weighted to the hard end. */
const { mcq, short, num } = makeBuilders(EXPANSION);

const s = (concept: string, slug: string, level: number, stem: string, a: string, b: string) =>
  short({ concept, slug, cognitive: level >= 8.5 ? "transfer" : "explain", level, seconds: level >= 9 ? 300 : 200, stem },
    [["main", a, 5, true], ["detail", b, 4, true]]);
const n = (concept: string, slug: string, level: number, stem: string, key: number, tol = 0.01) =>
  num({ concept, slug, cognitive: "apply", level, seconds: level >= 7 ? 90 : 25, stem }, key, tol);
const m = (concept: string, slug: string, level: number, stem: string, right: string, wrong: [string, string][]) =>
  mcq({ concept, slug, cognitive: level <= 3 ? "recall" : "apply", level, seconds: 25, stem },
    right, wrong.map(([t, why], i) => [t, `${concept}-${slug}-${i}`, why] as [string, string, string]));

const CI = "confidence-interval";
const HY = "hypothesis-test";
const PV = "p-value";
const TE = "type-i-ii-error";
const NP = "neyman-pearson-lemma";
const UM = "uniformly-most-powerful-test";
const BS = "bootstrapping";
const OZ = "one-sample-z-test";
const CX = "chi-square-test-of-independence";
const WR = "wilcoxon-rank-sum-test";

export const stFortyBItems: Item[] = [
  // --- confidence-interval -------------------------------------------------------
  m(CI, "x4b-z-ci", 2, "With $\\bar{x} = 50$, known $\\sigma = 10$ and $n = 25$, the $95\\%$ confidence interval for $\\mu$ is:", "$50 \\pm 3.92$",
    [["$50 \\pm 1.96$", "The margin is $1.96 \\times 10/\\sqrt{25}$."], ["$50 \\pm 19.6$", "Divide $\\sigma$ by $\\sqrt{n}$."], ["$50 \\pm 0.392$", "Divide by $\\sqrt{n}$, not $n$."]]),
  n(CI, "x4b-t-half", 3, "$n = 16$, $\\bar{x} = 20$, $s = 4$ and $t_{0.975, 15} = 2.131$. Compute the half-width of the $95\\%$ CI.", 2.131, 0.001),
  n(CI, "x4b-halve", 4, "To halve the width of a confidence interval, by what factor must the sample size grow?", 4),
  n(CI, "x4b-moe", 6, "Compute the $95\\%$ margin of error for a proportion with $\\hat{p} = 0.4$ and $n = 600$.", 0.0392, 0.0005),
  s(CI, "x4b-wald", 8, "Why can the Wald interval $\\hat{p} \\pm z\\sqrt{\\hat{p}(1 - \\hat{p})/n}$ have coverage far below its nominal level, and what should be used instead?",
    "For small $n$ or $p$ near $0$ or $1$ the binomial is discrete and skewed, and plugging $\\hat{p}$ into the SE is unreliable — with $\\hat{p} = 0$ the interval has zero width.",
    "Use the Wilson (score) interval, Agresti–Coull, or the exact Clopper–Pearson interval."),
  n(CI, "x4b-wilson", 8, "The Wilson interval is centred at $\\frac{\\hat{p} + z^2/2n}{1 + z^2/n}$. Compute the centre for $0$ successes in $n = 20$ with $z = 1.96$.", 0.08057, 0.0005),
  n(CI, "x4b-rule3", 8.5, "Rule of three: $0$ events are observed in $n = 300$ trials. What is the approximate $95\\%$ upper confidence bound for $p$?", 0.01, 0.0005),
  s(CI, "x4b-duality", 9, "Explain the duality between confidence intervals and hypothesis tests, and why inverting a test gives valid coverage.",
    "The set of $\\theta_0$ not rejected by a level-$\\alpha$ test of $H_0: \\theta = \\theta_0$ is a confidence set. It contains the true $\\theta$ exactly when the test at the true value fails to reject, which has probability at least $1 - \\alpha$.",
    "Clopper–Pearson intervals invert exact binomial tests, so they inherit the tests' conservativeness for discrete data."),
  n(CI, "x4b-delta", 9, "Delta method: with $\\hat{p} = 0.2$ and $n = 400$, compute the SE of the log-odds $\\log\\frac{\\hat{p}}{1 - \\hat{p}}$, which is $1/\\sqrt{n\\hat{p}(1 - \\hat{p})}$.", 0.125, 0.001),
  s(CI, "x4b-winner", 9.5, "You report a $95\\%$ CI for the largest of $20$ estimated effects. Why does it undercover, and how can you fix it?",
    "Selecting the largest estimate conditions on it being extreme; given selection, its sampling distribution is shifted away from the truth, but the nominal interval ignores the selection (the winner's curse).",
    "Fixes: selective inference (conditional intervals from a truncated distribution), simultaneous (e.g. Bonferroni) intervals, or estimating on fresh data after selecting."),

  // --- hypothesis-test -------------------------------------------------------------
  m(HY, "x4b-null", 2, "The null hypothesis is usually:", "The default claim (often “no effect”) that the test seeks evidence against",
    [["The claim the researcher hopes to prove", "That's usually the alternative."], ["Always $\\mu = 0$", "Not necessarily."], ["The conclusion after the test", "No."]]),
  m(HY, "x4b-fail", 3, "Failing to reject $H_0$ means:", "The data don't provide strong enough evidence against $H_0$ — not that $H_0$ is true",
    [["$H_0$ has been proven", "Absence of evidence isn't evidence of absence."], ["$H_1$ is false", "No."], ["The test was invalid", "No."]]),
  n(HY, "x4b-p23", 4, "A two-sided z-test gives $z = 2.3$. Compute the p-value.", 0.02145, 0.0005),
  n(HY, "x4b-power", 6, "A one-sided z-test at $\\alpha = 0.05$ faces a true standardised shift $\\delta\\sqrt{n}/\\sigma = 2.5$. Compute its power.", 0.8037, 0.001),
  n(HY, "x4b-n", 8, "A one-sided z-test at $\\alpha = 0.05$ needs power $0.8$ for effect size $d = 0.25$. Compute $n = ((z_{0.95} + z_{0.8})/d)^2$, rounded up.", 99),
  s(HY, "x4b-big-n", 8, "Why is a statistically significant result from a huge sample not necessarily important?",
    "Power grows with $n$, so arbitrarily small effects become significant; significance says the effect is probably non-zero, not that it's large.",
    "Report the effect size with a confidence interval and judge practical significance, or use an equivalence or minimum-effect test."),
  s(HY, "x4b-lindley", 8.5, "Explain the Jeffreys–Lindley paradox.",
    "With a very large sample, a result with $p$ just under $0.05$ can have a Bayes factor strongly favouring $H_0$ under a diffuse prior on the alternative.",
    "At fixed $p$, the implied effect shrinks like $1/\\sqrt{n}$, which is more plausible under $H_0$ than under a spread-out $H_1$; this suggests significance thresholds should tighten as $n$ grows."),
  n(HY, "x4b-min-post", 9, "A two-sided z-test gives exactly $z = 1.96$. Using the minimum Bayes factor $e^{-z^2/2}$ and prior odds $1{:}1$, what is the smallest possible posterior probability of $H_0$?", 0.1278, 0.001),
  s(HY, "x4b-fisher-np", 9, "Distinguish Fisher's significance testing from Neyman–Pearson hypothesis testing.",
    "Fisher: the p-value is a graded measure of evidence against a single null, with no alternative and no fixed $\\alpha$. Neyman–Pearson: a decision rule with $\\alpha$ fixed in advance, an explicit alternative, and power, controlling long-run error rates.",
    "Modern practice blends them — reporting p-values and comparing them to $0.05$ — which is the source of much confusion."),
  s(HY, "x4b-lrt", 9.5, "State Wilks' theorem for the likelihood ratio test and explain when its $\\chi^2$ approximation fails.",
    "$2[\\ell(\\hat\\theta) - \\ell(\\hat\\theta_0)] \\to \\chi^2_k$ under $H_0$, where $k$ is the difference in the number of free parameters.",
    "It fails when the null lies on the parameter boundary (e.g. a variance component $= 0$ gives a $\\tfrac12\\chi^2_0 + \\tfrac12\\chi^2_1$ mixture), when parameters are unidentifiable under $H_0$ (mixture components), or with small samples."),

  // --- p-value -------------------------------------------------------------------------
  m(PV, "x4b-meaning", 2, "A p-value of $0.03$ means:", "If $H_0$ were true, data at least this extreme would occur $3\\%$ of the time",
    [["$H_0$ has a $3\\%$ chance of being true", "That's a posterior probability."], ["The effect is $3\\%$", "No."], ["There's a $97\\%$ chance the result replicates", "No."]]),
  n(PV, "x4b-z15", 3, "An upper one-sided z-test gives $z = 1.5$. Compute the p-value.", 0.0668, 0.0005),
  n(PV, "x4b-z21", 4, "A two-sided test gives $z = 2.1$. Compute the p-value.", 0.03573, 0.0005),
  m(PV, "x4b-uniform", 6, "Under a true simple null with a continuous test statistic, the p-value is distributed:", "Uniformly on $[0, 1]$",
    [["Concentrated near $0$", "That's under the alternative."], ["Normally", "No."], ["Concentrated near $1$", "No."]]),
  n(PV, "x4b-fisher", 8, "Fisher's method combines independent p-values $0.1$, $0.2$ and $0.05$ as $X = -2\\sum\\ln p_i$. Compute $X$.", 13.816, 0.001),
  n(PV, "x4b-fpr", 8.5, "Prior $P(H_0) = 0.9$, $\\alpha = 0.05$ and power $0.5$. What is $P(H_0 \\mid \\text{significant})$?", 0.4737, 0.001),
  s(PV, "x4b-hacking", 8.5, "What is p-hacking, and why does it inflate false positives?",
    "Trying many analyses — outcomes, subgroups, covariates, stopping points — and reporting the one with the smallest p-value.",
    "The reported p-value is then the minimum of several, which is no longer uniform under $H_0$, so the real false-positive rate far exceeds $\\alpha$. Pre-registration and multiplicity corrections counter it."),
  n(PV, "x4b-sbb", 9, "The Sellke–Bayarri–Berger bound says the Bayes factor for $H_0$ is at least $-ep\\ln p$. Evaluate it for $p = 0.05$.", 0.4072, 0.001),
  s(PV, "x4b-super-uniform", 9, "The p-value is exactly uniform under a simple continuous null. What happens under composite nulls and with discrete test statistics?",
    "By the probability integral transform, $P(p \\le u) = u$ under a simple continuous null. With a composite null, p-values are computed at the least favourable point, so elsewhere in the null they're super-uniform (conservative).",
    "Discrete statistics make p-values stochastically larger than uniform (conservative); mid-p values or randomisation correct this."),
  s(PV, "x4b-049", 9.5, "A study reports $p = 0.049$. Explain why the probability that $H_0$ is true can be far above $5\\%$.",
    "$P(H_0 \\mid \\text{significant}) = \\frac{\\alpha\\pi_0}{\\alpha\\pi_0 + \\text{power} \\cdot \\pi_1}$; with $\\pi_0 = 0.9$ and power $0.5$ this is about $0.47$.",
    "Moreover, $p$ just below $\\alpha$ is weaker evidence than “$p \\le \\alpha$”: conditioning on $p \\approx 0.049$ gives an even higher false-positive risk (Colquhoun)."),

  // --- type-i-ii-error ---------------------------------------------------------------
  m(TE, "x4b-type2", 2, "A Type II error is:", "Failing to reject a false null hypothesis",
    [["Rejecting a true null", "That's Type I."], ["Using the wrong test", "No."], ["Rejecting a false null", "That's correct."]]),
  n(TE, "x4b-expect", 3, "You run $20$ independent tests of true nulls at $\\alpha = 0.05$. What is the expected number of false rejections?", 1),
  n(TE, "x4b-atleast", 4, "Same: what is the probability of at least one false rejection?", 0.6415, 0.001),
  n(TE, "x4b-beta", 6, "A one-sided z-test at $\\alpha = 0.05$ with true standardised shift $2$. Compute $\\beta$.", 0.3613, 0.001),
  m(TE, "x4b-tradeoff", 8, "With $n$ fixed, lowering $\\alpha$ from $0.05$ to $0.01$:", "Increases $\\beta$, reducing power",
    [["Decreases $\\beta$", "The rejection region shrinks."], ["Leaves power unchanged", "No."], ["Changes the effect size", "No."]]),
  n(TE, "x4b-mult", 8, "By what factor must $n$ grow to keep power $0.8$ when a two-sided test moves from $\\alpha = 0.05$ to $0.01$? Compute $((z_{0.995} + z_{0.8})/(z_{0.975} + z_{0.8}))^2$.", 1.4879, 0.001),
  s(TE, "x4b-type-sm", 8.5, "Explain Type S and Type M errors (Gelman & Carlin).",
    "A Type S (sign) error is a significant estimate with the wrong sign; a Type M (magnitude) error is the exaggeration of the true effect among significant estimates.",
    "Both are severe in low-power studies: filtering on significance keeps only overestimates."),
  n(TE, "x4b-lowpower", 9, "True effect $0.1$, standard error $0.1$, two-sided z-test at $\\alpha = 0.05$. Compute the power (both tails).", 0.1701, 0.001),
  n(TE, "x4b-types", 9, "Same study: what is the probability that a significant result has the wrong sign?", 0.00904, 0.0002),
  s(TE, "x4b-alpha-n", 9.5, "Why does minimising a weighted sum of $\\alpha$ and $\\beta$ make the optimal $\\alpha$ shrink as $n$ grows, and what does this imply for a fixed $0.05$?",
    "At fixed $\\alpha$, $\\beta$ goes to $0$ as $n$ grows, so almost all remaining error is Type I; trading a little power for a smaller $\\alpha$ reduces total error. The optimal critical value grows roughly like $\\sqrt{\\log n}$.",
    "A fixed $\\alpha = 0.05$ with huge samples rejects for trivially small effects — the same issue behind Lindley's paradox and BIC's $\\log n$ penalty."),

  // --- neyman-pearson-lemma ----------------------------------------------------------
  m(NP, "x4b-simple", 3, "The Neyman–Pearson lemma applies directly to testing:", "A simple null against a simple alternative",
    [["Two composite hypotheses", "Extensions needed."], ["Only normal means", "Any densities."], ["Goodness of fit", "No."]]),
  n(NP, "x4b-thresh", 4, "One observation $X \\sim N(\\mu, 1)$; $H_0: \\mu = 0$ vs $H_1: \\mu = 1$ at $\\alpha = 0.05$. What is the rejection threshold for $x$?", 1.645, 0.001),
  n(NP, "x4b-power1", 6, "Compute the power of that test.", 0.2595, 0.001),
  n(NP, "x4b-c9", 7, "With $n = 9$ observations, the test rejects when $\\bar{x} > c$. Compute $c$.", 0.5483, 0.001),
  n(NP, "x4b-power9", 8, "Compute the power of the $n = 9$ test.", 0.9123, 0.001),
  s(NP, "x4b-exp", 8, "Derive the most powerful test of $H_0: \\lambda = 1$ vs $H_1: \\lambda = 2$ for $n$ i.i.d. exponential observations.",
    "The likelihood ratio is $\\prod 2e^{-2x_i}/e^{-x_i} = 2^ne^{-\\sum x_i}$, which is large when $\\sum x_i$ is small.",
    "So reject when $\\sum x_i < c$, with $c$ the $\\alpha$-quantile of $\\mathrm{Gamma}(n, 1)$, the null distribution of $\\sum x_i$."),
  n(NP, "x4b-exp-c", 8.5, "For that test with $n = 1$ and $\\alpha = 0.05$, the test rejects when $x < c$. Compute $c$.", 0.05129, 0.0002),
  n(NP, "x4b-exp-power", 9, "Compute the power of that test.", 0.0975, 0.0005),
  s(NP, "x4b-randomise", 9, "Why do discrete test statistics need randomisation to attain an exact level $\\alpha$ in the Neyman–Pearson lemma?",
    "With a discrete statistic the achievable sizes jump, so no non-randomised test has size exactly $\\alpha$.",
    "The optimal test rejects when the LR exceeds $k$ and rejects with probability $\\gamma$ when it equals $k$; without this you must settle for a smaller size and lose power."),
  n(NP, "x4b-gamma", 9.5, "$X \\sim \\mathrm{Bin}(10, p)$, $H_0: p = 0.5$ vs $H_1: p = 0.8$, $\\alpha = 0.05$. Rejecting for $X \\ge 9$ has size $11/1024$, and $P(X = 8) = 45/1024$. With what probability $\\gamma$ should the test reject when $X = 8$?", 0.8933, 0.001),

  // --- uniformly-most-powerful-test -------------------------------------------------
  m(UM, "x4b-kr", 4, "A UMP test for one-sided hypotheses exists in families that have:", "A monotone likelihood ratio in some statistic (Karlin–Rubin)",
    [["Any continuous density", "No."], ["Symmetric densities", "No."], ["Two parameters", "No."]]),
  m(UM, "x4b-two-sided", 5, "For $H_1: \\mu \\ne \\mu_0$ in the normal family, a UMP test:", "Doesn't exist; the usual two-sided test is UMP among unbiased tests",
    [["Is the two-sided z-test", "It isn't most powerful against each side."], ["Is the one-sided test", "It fails against the other side."], ["Always exists", "No."]]),
  n(UM, "x4b-cut", 7, "Normal with $\\sigma = 2$ and $n = 16$; $H_0: \\mu \\le 0$ vs $H_1: \\mu > 0$ at $\\alpha = 0.05$. The UMP test rejects when $\\bar{x}$ exceeds what?", 0.8225, 0.001),
  n(UM, "x4b-pow", 7, "Compute the power of that test at $\\mu = 1$.", 0.6387, 0.001),
  n(UM, "x4b-unif-c", 8, "$\\mathrm{Uniform}(0, \\theta)$ with $n = 5$; $H_0: \\theta \\le 1$ vs $H_1: \\theta > 1$. The UMP test rejects when $\\max X_i > c$ at $\\alpha = 0.05$. Compute $c$.", 0.9898, 0.0005),
  n(UM, "x4b-unif-pow", 8.5, "Compute the power of that test at $\\theta = 1.2$.", 0.6182, 0.001),
  s(UM, "x4b-karlin", 8.5, "State the Karlin–Rubin theorem and explain why MLR makes the one-sided Neyman–Pearson test uniform across alternatives.",
    "For each $\\theta_1 > \\theta_0$ the NP test rejects for a large likelihood ratio, which (by MLR) means $T > c$; the cutoff $c$ is fixed by the size at $\\theta_0$, so it doesn't depend on $\\theta_1$.",
    "Because the power function is increasing in $\\theta$, the size over the composite null $\\theta \\le \\theta_0$ is attained at $\\theta_0$, so the same test is UMP for the composite problem."),
  s(UM, "x4b-not-ump", 9, "Why isn't the two-sided z-test UMP, and in what sense is it optimal?",
    "The most powerful test against $\\mu > \\mu_0$ is the upper one-sided test, and against $\\mu < \\mu_0$ the lower one; no single test is best against both.",
    "The two-sided test is UMP among unbiased tests (UMPU) and UMP among tests invariant to sign changes."),
  m(UM, "x4b-expfam", 9, "A one-parameter exponential family has MLR in its sufficient statistic $T(x)$ when:", "The natural parameter $\\eta(\\theta)$ is monotone in $\\theta$",
    [["$T$ is bounded", "Not required."], ["The support depends on $\\theta$", "Exponential families have fixed support."], ["The family is symmetric", "No."]]),
  s(UM, "x4b-nuisance", 9.5, "Why do UMP tests rarely exist with nuisance parameters (e.g. testing $\\mu$ with $\\sigma$ unknown), and how is the t-test justified?",
    "The best test would depend on the unknown nuisance value, and validity requires the size to be controlled for every $\\sigma$.",
    "Restricting to unbiased or similar tests (conditioning on the sufficient statistic for $\\sigma$), or to scale-invariant tests, the t-test is UMP within that class."),

  // --- bootstrapping -----------------------------------------------------------------------
  m(BS, "x4b-resample", 2, "The nonparametric bootstrap resamples:", "The observed data, with replacement",
    [["The population", "It's unavailable."], ["The data without replacement", "That just permutes the sample."], ["From a fitted normal", "That's the parametric bootstrap."]]),
  m(BS, "x4b-size", 3, "Each bootstrap sample has size:", "Equal to the original sample size",
    [["Half the sample size", "That's subsampling."], ["$1$", "No."], ["$n^2$", "No."]]),
  n(BS, "x4b-absent", 3.5, "With $n = 100$, what is the probability a given observation is absent from a bootstrap sample?", 0.366, 0.001),
  n(BS, "x4b-limit", 4, "What does that probability tend to as $n \\to \\infty$?", 0.3679, 0.001),
  n(BS, "x4b-distinct", 4.5, "How many distinct bootstrap samples (as multisets) are there when $n = 3$?", 10),
  m(BS, "x4b-bca", 8, "The percentile bootstrap interval can perform poorly for:", "Biased or skewed statistics — BCa intervals correct for bias and skewness",
    [["Sample means from large samples", "It does fine there."], ["Symmetric pivots", "It works well."], ["Any statistic with finite variance", "Too broad."]]),
  s(BS, "x4b-max", 8, "Why does the naive bootstrap fail for the sample maximum?",
    "The maximum isn't a smooth function of the data: the bootstrap maximum equals the sample maximum with probability $1 - (1 - 1/n)^n \\to 1 - e^{-1} \\approx 0.632$, so the bootstrap distribution has a large atom and doesn't approximate the true sampling distribution.",
    "Use the $m$-out-of-$n$ bootstrap, a parametric bootstrap, or extreme-value theory."),
  n(BS, "x4b-max-atom", 8.5, "With $n = 50$, what is the probability the bootstrap maximum equals the sample maximum?", 0.6358, 0.001),
  s(BS, "x4b-block", 9, "Why does the ordinary bootstrap fail for time series, and how does the block bootstrap fix it?",
    "Resampling individual observations destroys autocorrelation, so it underestimates the variance of statistics like the mean when there's positive dependence.",
    "The moving-block (or stationary) bootstrap resamples blocks of consecutive observations, preserving dependence within blocks; block length must grow with $n$."),
  s(BS, "x4b-student", 9.5, "Explain bootstrap-t (studentised) intervals and why they are second-order accurate.",
    "Bootstrap the pivot $(\\hat\\theta^* - \\hat\\theta)/\\widehat{\\mathrm{SE}}^*$ and use its quantiles; the pivot's distribution depends much less on unknown parameters than $\\hat\\theta$'s does.",
    "Edgeworth expansions show coverage error $O(1/n)$ versus $O(1/\\sqrt{n})$ for percentile intervals; the cost is needing an SE for every resample (a formula or a nested bootstrap)."),

  // --- one-sample-z-test ---------------------------------------------------------------------
  m(OZ, "x4b-req", 2, "The one-sample z-test assumes:", "A known population standard deviation (or a sample large enough to treat it as known)",
    [["A small sample", "No."], ["Paired data", "That's the paired test."], ["Categorical data", "No."]]),
  n(OZ, "x4b-z", 3, "$\\bar{x} = 52$, $\\mu_0 = 50$, $\\sigma = 10$ and $n = 100$. Compute $z$.", 2),
  n(OZ, "x4b-p", 4, "Compute the two-sided p-value for $z = 2$.", 0.0455, 0.0005),
  n(OZ, "x4b-crit", 4, "What is the critical value for a two-sided z-test at $\\alpha = 0.01$?", 2.5758, 0.001),
  n(OZ, "x4b-n", 8, "What is the minimum $n$ to detect a shift of $2$ with $\\sigma = 10$, two-sided $\\alpha = 0.05$ and power $0.9$?", 263),
  n(OZ, "x4b-power", 8.5, "Two-sided $\\alpha = 0.05$, $\\sigma = 10$, $n = 100$ and a true shift of $3$. Compute the power, including both tails.", 0.8508, 0.001),
  s(OZ, "x4b-small-s", 8, "What goes wrong if you run a z-test with the sample SD in place of $\\sigma$ when $n$ is small?",
    "It ignores the uncertainty in $s$: the statistic actually follows a $t$ distribution with heavier tails than the normal.",
    "The real Type I error exceeds $\\alpha$ — about $12\\%$ instead of $5\\%$ when $n = 5$."),
  n(OZ, "x4b-size5", 9, "Compute the actual size of a nominal $5\\%$ two-sided z-test that uses $s$ with $n = 5$, i.e. $P(|t_4| > 1.96)$.", 0.1216, 0.002),
  s(OZ, "x4b-wald", 9, "How does the z-test relate to the Wald test for a general maximum likelihood estimate?",
    "The Wald statistic $(\\hat\\theta - \\theta_0)/\\mathrm{SE}(\\hat\\theta)$ is asymptotically $N(0, 1)$; the one-sample z-test is the special case of a normal mean.",
    "Wald tests aren't invariant to reparameterisation and behave badly near boundaries; score and likelihood ratio tests are alternatives."),
  s(OZ, "x4b-million", 9.5, "An A/B test with $10^6$ users rejects with $p = 10^{-8}$ for an effect of $0.01\\sigma$. How should this be reported and acted on?",
    "The effect is almost certainly non-zero but tiny; report the effect size and its confidence interval and decide based on whether an effect that small matters (cost, practical threshold).",
    "Also check the assumptions behind $n$: if users are clustered or measured repeatedly, observations aren't independent, the SE is understated and the p-value is too small."),

  // --- chi-square-test-of-independence --------------------------------------------------------
  m(CX, "x4b-expected", 2, "Under independence, the expected count in cell $(i, j)$ is:", "Row total × column total ÷ grand total",
    [["Row total ÷ column total", "No."], ["Grand total ÷ number of cells", "Only if margins are equal."], ["The observed count", "No."]]),
  n(CX, "x4b-e", 3, "Row total $40$, column total $30$, grand total $100$. What is the expected count?", 12),
  n(CX, "x4b-df", 3.5, "How many degrees of freedom does the test have for a $3 \\times 4$ table?", 6),
  n(CX, "x4b-cell", 4, "What is the $\\chi^2$ contribution of a cell with $O = 20$ and $E = 12$?", 5.3333, 0.001),
  n(CX, "x4b-chi", 8, "Compute $\\chi^2$ (without continuity correction) for the $2 \\times 2$ table with rows $(30, 10)$ and $(20, 40)$.", 16.667, 0.001),
  n(CX, "x4b-v", 8.5, "Compute Cramér's $V$ for that table.", 0.4082, 0.001),
  s(CX, "x4b-five", 8, "Why should expected counts be at least about $5$ for the $\\chi^2$ approximation?",
    "The $\\chi^2$ distribution comes from a normal approximation to the multinomial counts, which is poor when expected counts are small; the Type I error can then be inflated.",
    "Use Fisher's exact test or a Monte Carlo (permutation) p-value, or merge sparse categories."),
  s(CX, "x4b-simpson", 9, "Explain Simpson's paradox for contingency tables and what it implies for independence tests.",
    "An association in each stratum can vanish or reverse when strata are pooled, because a confounder is related to both variables.",
    "Testing independence on the pooled table can mislead; stratify (Cochran–Mantel–Haenszel) or use log-linear models that include the confounder."),
  n(CX, "x4b-g2", 9, "Compute the likelihood-ratio statistic $G^2 = 2\\sum O\\ln(O/E)$ for the table with rows $(30, 10)$ and $(20, 40)$.", 17.261, 0.001),
  s(CX, "x4b-z2", 9.5, "Show that for a $2 \\times 2$ table the $\\chi^2$ statistic equals the square of the pooled two-proportion z-statistic.",
    "Both reduce to $\\frac{N(ad - bc)^2}{r_1r_2c_1c_2}$: write $\\hat{p}_1 - \\hat{p}_2$ and the pooled SE in terms of the cells and square.",
    "Since $\\chi^2_1 = Z^2$, the two-sided z-test and the $\\chi^2$ test give identical p-values."),

  // --- wilcoxon-rank-sum-test -------------------------------------------------------------
  m(WR, "x4b-ranks", 2, "The Wilcoxon rank-sum test compares two groups using:", "The ranks of the pooled observations",
    [["Differences within pairs", "That's the signed-rank test."], ["Group means", "That's the t-test."], ["Counts in a table", "No."]]),
  n(WR, "x4b-w", 3, "Group A: $1, 4, 6$. Group B: $2, 3, 8$. Compute A's rank sum.", 10),
  n(WR, "x4b-u", 4, "Compute the Mann–Whitney $U = W - n_1(n_1 + 1)/2$ for group A.", 4),
  n(WR, "x4b-ew", 4, "With $n_1 = n_2 = 3$, what is the expected rank sum of group A under $H_0$?", 10.5),
  n(WR, "x4b-var", 8, "Compute $\\mathrm{Var}(W) = n_1n_2(N + 1)/12$ for $n_1 = 10$ and $n_2 = 12$.", 230),
  n(WR, "x4b-zval", 8.5, "Group 1 ($n_1 = 10$, $n_2 = 12$) has rank sum $W = 150$. Compute the normal-approximation $z$.", 2.3078, 0.001),
  s(WR, "x4b-what", 8, "What does the rank-sum test actually test, and when is it a test of medians?",
    "Its null is that the two distributions are identical; it is sensitive to $P(X > Y) \\ne \\tfrac12$ (stochastic dominance).",
    "Under a pure shift model it tests a difference in medians; if the shapes or spreads differ, a significant result needn't mean the medians differ."),
  n(WR, "x4b-cles", 9, "Compute the common-language effect size $U/(n_1n_2)$ for $U = 4$ and $n_1 = n_2 = 3$.", 0.4444, 0.001),
  s(WR, "x4b-ties", 9, "How are ties handled in the rank-sum test?",
    "Tied observations get the average of the ranks they span (midranks).",
    "The null variance is reduced: multiply the bracket by the correction $1 - \\sum(t^3 - t)/(N^3 - N)$ over tie groups; or use the exact permutation distribution of the midranks."),
  s(WR, "x4b-are", 9.5, "Explain the asymptotic relative efficiency of the Wilcoxon test versus the t-test: $0.955$, and the bound $0.864$.",
    "Under normal data, the Wilcoxon test needs about $1/0.955$ times as many observations as the t-test for the same power ($3/\\pi \\approx 0.955$).",
    "Hodges and Lehmann showed the ARE is never below $0.864$ for any continuous distribution, and it can be arbitrarily large for heavy-tailed data — so little is lost and much can be gained."),
];
