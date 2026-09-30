import type { Item, SourceRef } from "../../lib/assessment/types";
import { makeBuilders } from "./authoring";

/**
 * `neyman-pearson-lemma`, `uniformly-most-powerful-test` and `qq-plots` — eight
 * items each, two per cognitive level. Normal-table values used: z(0.95) =
 * 1.645, Φ(0.645) = 0.7405, Φ(0.855) = 0.8037, Φ⁻¹(0.25) = −0.674.
 */
const AUTHORED: SourceRef = {
  id: "mathlingo-authored-optimal-tests",
  tier: "generated",
  title: "Mathlingo authored item (optimal tests and normality checks)",
};

const { mcq, short, num } = makeBuilders(AUTHORED);

const NP = "neyman-pearson-lemma";
const neymanPearson: Item[] = [
  mcq(
    { concept: NP, slug: "recall-statement", cognitive: "recall", difficulty: -0.4, seconds: 40,
      stem: "For $H_0: \\theta = \\theta_0$ against $H_1: \\theta = \\theta_1$, which test does the Neyman–Pearson lemma say is most powerful at size $\\alpha$?" },
    "Reject $H_0$ when $L(\\theta_1; x)/L(\\theta_0; x) > k$, with $k$ chosen so the size is $\\alpha$",
    [
      ["Reject $H_0$ when the p-value is below $\\alpha$, for any test statistic", "np-any-statistic", "Every valid test has size $\\alpha$; the lemma singles out the one built from the likelihood ratio."],
      ["Reject $H_0$ when $L(\\theta_0; x) > k$", "np-null-likelihood", "Rejecting when the null fits well is backwards, and ignores the alternative entirely."],
      ["Reject $H_0$ when the MLE differs from $\\theta_0$", "np-mle", "A single-point comparison of the MLE is not the likelihood-ratio rejection region, and its size is not controlled."],
    ],
  ),
  mcq(
    { concept: NP, slug: "recall-simple", cognitive: "recall", difficulty: -0.2, seconds: 35,
      stem: "The Neyman–Pearson lemma applies directly to which kind of hypotheses?" },
    "A simple null against a simple alternative — each specifying one distribution completely",
    [
      ["Any composite null against any composite alternative", "np-composite", "Composite hypotheses need extra structure, such as a monotone likelihood ratio, to extend the lemma."],
      ["Two-sided alternatives only", "np-two-sided", "Two-sided alternatives are composite; typically no single most powerful test exists for them."],
      ["Only hypotheses about normal means", "np-normal-only", "The lemma holds for any pair of fully specified distributions."],
    ],
  ),
  num(
    { concept: NP, slug: "apply-single-obs-power", cognitive: "apply", difficulty: 0.3, seconds: 80,
      stem: "One observation $X \\sim \\mathcal{N}(\\mu, 1)$. The most powerful size-$0.05$ test of $H_0: \\mu = 0$ vs $H_1: \\mu = 1$ rejects when $X > 1.645$. What is its power? Give $3$ decimal places." },
    0.2595,
  ),
  num(
    { concept: NP, slug: "apply-sample-power", cognitive: "apply", difficulty: 0.5, seconds: 100,
      stem: "$X_1, \\ldots, X_{25} \\sim \\mathcal{N}(\\mu, 1)$. Find the power of the most powerful size-$0.05$ test of $H_0: \\mu = 0$ vs $H_1: \\mu = 0.5$. Give $3$ decimal places." },
    0.804,
  ),
  short(
    { concept: NP, slug: "explain-proof", cognitive: "explain", difficulty: 1.0, seconds: 180,
      stem: "Sketch why the likelihood-ratio test $\\phi^*$ has at least the power of any other test $\\phi$ of size at most $\\alpha$." },
    [
      ["sign", "Shows $(\\phi^*(x) - \\phi(x))(f_1(x) - k f_0(x)) \\ge 0$ for every $x$, by considering where $\\phi^* = 1$ and where $\\phi^* = 0$.", 4, true],
      ["integrate", "Integrates to get $\\text{power}(\\phi^*) - \\text{power}(\\phi) \\ge k(\\text{size}(\\phi^*) - \\text{size}(\\phi)) \\ge 0$.", 4, true],
    ],
  ),
  mcq(
    { concept: NP, slug: "explain-randomisation", cognitive: "explain", difficulty: 0.6, seconds: 50,
      stem: "For discrete data the Neyman–Pearson test sometimes rejects at random when $\\Lambda(x) = k$. Why?" },
    "Because $P_{\\theta_0}(\\Lambda > k)$ jumps, randomising on the boundary is the only way to make the size exactly $\\alpha$",
    [
      ["To make the test unbiased", "np-random-unbiased", "Randomisation here is about hitting the size exactly, not unbiasedness."],
      ["Because the likelihood ratio is undefined for discrete data", "np-undefined", "The ratio of pmfs is perfectly well defined."],
      ["To increase the size above $\\alpha$ and gain power", "np-random-size", "Randomisation fills the size up to $\\alpha$, never beyond it."],
    ],
  ),
  mcq(
    { concept: NP, slug: "transfer-bernoulli", cognitive: "transfer", difficulty: 0.4, seconds: 60,
      stem: "$n$ Bernoulli trials test $H_0: p = 0.5$ against $H_1: p = 0.8$. What does the most powerful test reject for?" },
    "A large number of successes $\\sum x_i$",
    [
      ["A small number of successes", "np-bernoulli-direction", "$\\Lambda = (0.8/0.5)^{s}(0.2/0.5)^{n - s}$ increases in $s$, so large $s$ favours $H_1$."],
      ["A number of successes far from $n/2$ in either direction", "np-bernoulli-two-sided", "Against the single alternative $p = 0.8$ only the upper side is evidence."],
      ["A particular order of successes and failures", "np-bernoulli-order", "The likelihood ratio depends only on the count, which is sufficient."],
    ],
  ),
  short(
    { concept: NP, slug: "transfer-classifier", cognitive: "transfer", difficulty: 0.8, seconds: 120,
      stem: "A fraud detector must keep its false-positive rate on legitimate transactions at $1\\%$. The transaction features have known densities $f_{\\text{legit}}$ and $f_{\\text{fraud}}$. Use the Neyman–Pearson lemma to say which rule catches the most fraud, and how that relates to a ROC curve." },
    [
      ["rule", "Flag a transaction when $f_{\\text{fraud}}(x)/f_{\\text{legit}}(x) > k$, with $k$ set so $1\\%$ of legitimate transactions are flagged.", 4, true],
      ["optimal", "By the lemma no other rule with a $1\\%$ false-positive rate has a higher detection rate (power).", 2, true],
      ["roc", "Varying $k$ traces the ROC curve of the likelihood ratio, which lies on or above every other classifier's ROC curve.", 2],
    ],
  ),
];

const UMP = "uniformly-most-powerful-test";
const ump: Item[] = [
  mcq(
    { concept: UMP, slug: "recall-definition", cognitive: "recall", difficulty: -0.3, seconds: 40,
      stem: "What makes a size-$\\alpha$ test uniformly most powerful?" },
    "Its power is at least that of every other size-$\\alpha$ test at every parameter value in the alternative",
    [
      ["Its power is the same at every alternative", "ump-constant-power", "“Uniformly” refers to being best at every alternative, not to having flat power."],
      ["It is most powerful against one chosen alternative", "ump-one-alternative", "That is Neyman–Pearson's guarantee; UMP requires it for all alternatives at once."],
      ["It has the smallest Type I error rate", "ump-smallest-size", "All competitors have size $\\alpha$; the comparison is on power."],
    ],
  ),
  mcq(
    { concept: UMP, slug: "recall-karlin-rubin", cognitive: "recall", difficulty: 0.0, seconds: 45,
      stem: "The Karlin–Rubin theorem gives a UMP test for $H_0: \\theta \\le \\theta_0$ vs $H_1: \\theta > \\theta_0$ under which condition?" },
    "The family has a monotone likelihood ratio in a sufficient statistic $T$; the test rejects when $T > c$",
    [
      ["The data are normal with known variance", "kr-normal-only", "Normal data are one example; the condition is MLR, which many families have."],
      ["The hypotheses are two-sided", "kr-two-sided", "Karlin–Rubin is about one-sided hypotheses; two-sided ones generally have no UMP test."],
      ["The MLE is unbiased", "kr-unbiased-mle", "Unbiasedness of the estimator plays no role in the theorem."],
    ],
  ),
  mcq(
    { concept: UMP, slug: "apply-exponential", cognitive: "apply", difficulty: 0.5, seconds: 70,
      stem: "$X_1, \\ldots, X_n$ are exponential with rate $\\lambda$ (density $\\lambda e^{-\\lambda x}$). What is the UMP test of $H_0: \\lambda \\le \\lambda_0$ vs $H_1: \\lambda > \\lambda_0$?" },
    "Reject when $\\sum x_i < c$",
    [
      ["Reject when $\\sum x_i > c$", "ump-exp-direction", "The likelihood $\\lambda^n e^{-\\lambda \\sum x_i}$ has a ratio decreasing in $\\sum x_i$: a high rate means short waits."],
      ["Reject when $\\max x_i > c$", "ump-exp-max", "The sufficient statistic is $\\sum x_i$, not the maximum."],
      ["Reject when $|\\sum x_i - n/\\lambda_0| > c$", "ump-exp-two-sided", "The alternative is one-sided, so only one tail is evidence."],
    ],
  ),
  num(
    { concept: UMP, slug: "apply-cutoff", cognitive: "apply", difficulty: 0.2, seconds: 60,
      stem: "$X_1, \\ldots, X_{16} \\sim \\mathcal{N}(\\mu, 1)$. The UMP size-$0.05$ test of $H_0: \\mu \\le 0$ vs $H_1: \\mu > 0$ rejects when $\\bar{X} > c$. Find $c$ to $3$ decimal places." },
    0.411,
  ),
  short(
    { concept: UMP, slug: "explain-no-two-sided", cognitive: "explain", difficulty: 0.7, seconds: 120,
      stem: "Explain why there is no UMP test of $H_0: \\mu = 0$ vs $H_1: \\mu \\ne 0$ for normal data with known variance, and what is used instead." },
    [
      ["conflict", "By Neyman–Pearson the most powerful test against $\\mu > 0$ rejects for large $\\bar{x}$, and against $\\mu < 0$ for small $\\bar{x}$; no single region is best for both.", 4, true],
      ["instead", "The two-sided test $|\\bar{x}| > c$ is used; it is UMP among unbiased tests.", 3, true],
    ],
  ),
  mcq(
    { concept: UMP, slug: "explain-mlr", cognitive: "explain", difficulty: 0.3, seconds: 45,
      stem: "A family has a monotone likelihood ratio in $T$. What does that mean?" },
    "For every $\\theta_1 > \\theta_0$, the ratio $f_{\\theta_1}(x)/f_{\\theta_0}(x)$ is non-decreasing in $T(x)$",
    [
      ["The likelihood is monotone in $\\theta$ for every $x$", "mlr-likelihood-monotone", "MLR is about the ratio as a function of the data, not the likelihood as a function of $\\theta$."],
      ["$T$ is an increasing function of $\\theta$", "mlr-t-in-theta", "$T$ is a statistic — a function of the data, not of the parameter."],
      ["The density is monotone in $x$", "mlr-density-monotone", "The densities themselves can have any shape; only their ratio must be monotone in $T$."],
    ],
  ),
  short(
    { concept: UMP, slug: "transfer-ab-one-sided", cognitive: "transfer", difficulty: 0.6, seconds: 120,
      stem: "A team will ship a new checkout page only if it raises conversion. They propose a one-sided $z$-test. Explain what optimality property that test has, and what they give up compared with a two-sided test." },
    [
      ["ump", "For the one-sided alternative, the one-sided $z$-test is UMP (normal family has MLR in the mean), so it has the highest power against every improvement size.", 4, true],
      ["cost", "It cannot detect a decrease: a harmful change is simply “not significant”, so they must not read a non-rejection as “no harm”.", 3, true],
      ["commit", "The direction must be fixed before seeing data.", 1],
    ],
  ),
  mcq(
    { concept: UMP, slug: "transfer-cauchy", cognitive: "transfer", difficulty: 0.9, seconds: 60,
      stem: "For which of these families does a one-sided UMP test of the parameter typically fail to exist?" },
    "The Cauchy location family",
    [
      ["The Poisson family, testing the rate", "ump-poisson-fails", "Poisson is a one-parameter exponential family with MLR in $\\sum x_i$, so Karlin–Rubin applies."],
      ["The binomial family, testing $p$", "ump-binomial-fails", "The binomial has MLR in the number of successes."],
      ["The normal family with known variance, testing the mean", "ump-normal-fails", "The normal mean is the textbook case with a one-sided UMP test."],
    ],
  ),
];

const QQ = "qq-plots";
const qqPlots: Item[] = [
  mcq(
    { concept: QQ, slug: "recall-axes", cognitive: "recall", difficulty: -0.8, seconds: 35,
      stem: "What does a normal Q-Q plot display?" },
    "The sorted data against the corresponding quantiles of the standard normal",
    [
      ["A histogram with a normal curve overlaid", "qq-histogram", "That is a density comparison; a Q-Q plot compares quantiles point by point."],
      ["The data against their index in the sample", "qq-index-plot", "That is a run-order plot; it checks drift, not distributional shape."],
      ["The empirical CDF against the normal CDF", "qq-pp-plot", "That is a P-P plot, which compares probabilities rather than quantiles."],
    ],
  ),
  mcq(
    { concept: QQ, slug: "recall-line", cognitive: "recall", difficulty: -0.3, seconds: 40,
      stem: "For data from $\\mathcal{N}(\\mu, \\sigma^2)$, a normal Q-Q plot lies near a line with what intercept and slope?" },
    "Intercept $\\mu$, slope $\\sigma$",
    [
      ["Intercept $0$, slope $1$, whatever $\\mu$ and $\\sigma$ are", "qq-identity-line", "Only standardised data follow $y = x$; raw data follow $\\mu + \\sigma z$."],
      ["Intercept $\\mu$, slope $\\sigma^2$", "qq-variance-slope", "Quantiles scale with the standard deviation, not the variance."],
      ["Intercept $\\sigma$, slope $\\mu$", "qq-swapped", "Location shifts the line and scale tilts it, not the other way round."],
    ],
  ),
  num(
    { concept: QQ, slug: "apply-plotting-position", cognitive: "apply", difficulty: -0.1, seconds: 60,
      stem: "With $n = 10$ observations and plotting positions $p_i = (i - 0.5)/n$, what theoretical normal quantile is paired with the $3$rd smallest observation? Give $3$ decimal places." },
    -0.674,
  ),
  mcq(
    { concept: QQ, slug: "apply-s-shape", cognitive: "apply", difficulty: 0.2, seconds: 45,
      stem: "On a normal Q-Q plot, the lowest points fall below the reference line and the highest points rise above it, with the middle on the line. What does this indicate?" },
    "Heavier tails than the normal",
    [
      ["Lighter tails than the normal", "qq-tails-reversed", "Light tails pull the extremes towards the centre: low end above the line, high end below."],
      ["Right skew", "qq-skew-for-tails", "Right skew bends both ends upward; an S-shape symmetric about the centre is a tail issue."],
      ["A larger variance than assumed", "qq-variance", "A larger variance only steepens the whole line; it does not bend it."],
    ],
  ),
  short(
    { concept: QQ, slug: "explain-vs-histogram", cognitive: "explain", difficulty: 0.3, seconds: 90,
      stem: "Why is a Q-Q plot usually a better check of normality than a histogram?" },
    [
      ["bins", "A histogram's shape depends on bin width and position, especially with small samples; a Q-Q plot needs no binning.", 3, true],
      ["tails", "Departures in the tails — where normality usually matters — are spread out and visible on a Q-Q plot, but are a few short bars on a histogram.", 3, true],
      ["line", "Judging whether points lie on a straight line is easier than judging a bell shape.", 2],
    ],
  ),
  mcq(
    { concept: QQ, slug: "explain-right-skew", cognitive: "explain", difficulty: 0.3, seconds: 45,
      stem: "Income data are strongly right-skewed. What does their normal Q-Q plot look like?" },
    "A convex curve: both ends bend upward, the upper tail most steeply",
    [
      ["A concave curve bending downward at both ends", "qq-left-for-right", "That pattern is left skew."],
      ["A straight line with a steep slope", "qq-skew-as-scale", "Skew bends the plot; a steep straight line only means a large spread."],
      ["An S-shape symmetric about the centre", "qq-skew-as-tails", "A symmetric S-shape indicates heavy tails, not skew."],
    ],
  ),
  short(
    { concept: QQ, slug: "transfer-large-n", cognitive: "transfer", difficulty: 0.7, seconds: 120,
      stem: "With $n = 20{,}000$ residuals, a Shapiro–Wilk test rejects normality at $p < 10^{-6}$, but the Q-Q plot looks nearly straight. The analysis uses $t$-based confidence intervals. What should the analyst conclude, and why?" },
    [
      ["power", "With a huge $n$ the test detects deviations far too small to matter; the p-value reflects sample size, not the size of the departure.", 3, true],
      ["qq", "The Q-Q plot shows the departure is small, so normality is a reasonable working approximation.", 2, true],
      ["robust", "$t$-intervals for means are robust with large $n$ by the CLT, so the conclusion is little affected.", 3],
    ],
  ),
  mcq(
    { concept: QQ, slug: "transfer-exponential", cognitive: "transfer", difficulty: 0.5, seconds: 50,
      stem: "You want to check whether waiting times between events are exponential. How can a Q-Q plot help?" },
    "Plot the sorted waiting times against exponential quantiles $-\\ln(1 - p_i)$; a straight line through the origin supports the model",
    [
      ["It can’t — Q-Q plots only test normality", "qq-normal-only", "A Q-Q plot works for any reference distribution with known quantiles."],
      ["Use a normal Q-Q plot and look for a straight line", "qq-wrong-reference", "Exponential data are skewed and would curve on a normal Q-Q plot even when the model is right."],
      ["Plot the waiting times against their order of arrival", "qq-time-order", "That checks for trends over time, not the distributional shape."],
    ],
  ),
];

export const optimalTestItems: Item[] = [...neymanPearson, ...ump, ...qqPlots];
