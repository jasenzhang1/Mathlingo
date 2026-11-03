import type { Item } from "../../../lib/assessment/types";
import { m, n, s } from "./shared";

/**
 * Large-scale testing as empirical Bayes: the two-groups model, the local
 * false discovery rate, its tail-area cousin Fdr and Benjamini–Hochberg, π₀
 * estimation and the empirical null (Efron, Large-Scale Inference, chs. 2–6).
 * 50 items, levels 1–10.
 */

const LF = "local-false-discovery-rate";

const twoGroups = "In the two-groups model, each $z$-value is null with probability $\\pi_0$ (density $f_0$) or non-null with probability $\\pi_1 = 1 - \\pi_0$ (density $f_1$), so the mixture density is $f = \\pi_0f_0 + \\pi_1f_1$.";

export const ebTestingItems: Item[] = [
  // level 1
  m(LF, "recall-two-groups", 1, "The two-groups model for large-scale testing says that each $z$-value comes from:",
    "A mixture: the null density $f_0$ with probability $\\pi_0$ and a non-null density $f_1$ with probability $1 - \\pi_0$", [
      ["One normal distribution with unknown mean", "That is the estimation model, not the testing model."],
      ["The null distribution only", "Some cases are non-null."],
      ["A uniform distribution", "$p$-values are uniform under the null; $z$-values have density $f_0$."],
    ]),
  m(LF, "recall-local-fdr", 1, "The local false discovery rate at $z$ is defined as:",
    "$\\text{fdr}(z) = \\Pr(\\text{null} \\mid z) = \\pi_0f_0(z)/f(z)$", [
      ["$\\Pr(z \\mid \\text{null})$", "That is the null density, not a posterior probability."],
      ["The $p$-value of $z$", "A $p$-value is a tail area under the null only."],
      ["$\\pi_0F_0(z)/F(z)$", "That is the tail-area Fdr."],
    ]),
  m(LF, "recall-tail-fdr", 1, "The tail-area false discovery rate $\\text{Fdr}(z)$ is:",
    "$\\Pr(\\text{null} \\mid Z \\ge z) = \\pi_0F_0(z)/F(z)$, using right-tail probabilities", [
      ["$\\Pr(\\text{null} \\mid Z = z)$", "That is the local fdr."],
      ["The family-wise error rate", "Fdr is a rate among rejections, not the chance of any error."],
      ["$1 - \\text{fdr}(z)$", "That is the probability of being non-null."],
    ]),
  m(LF, "recall-pi0", 1, "In genomics studies $\\pi_0$ is usually:",
    "Close to $1$: most genes are null", [
      ["Close to $0$", "Most cases are unaffected."],
      ["Exactly $0.5$", "There is no reason for equal groups."],
      ["Unidentifiable", "It is estimated, e.g. from the central $z$-values."],
    ]),
  m(LF, "recall-empirical-null", 1, "An empirical null is:",
    "A null density $f_0$ estimated from the central bulk of the $z$-values rather than assumed $\\mathcal{N}(0, 1)$", [
      ["The theoretical $\\mathcal{N}(0, 1)$", "That is the theoretical null."],
      ["The distribution of the non-null cases", "That is $f_1$."],
      ["The prior on $\\pi_0$", "It is a density for null $z$-values."],
    ]),

  // level 2
  n(LF, "apply-fdr", 2,
    `${twoGroups} With $\\pi_0 = 0.9$, $f_0(z) = 0.05$ and $f(z) = 0.15$, compute $\\text{fdr}(z)$.`,
    0.3),
  n(LF, "apply-Fdr", 2,
    `${twoGroups} With $\\pi_0 = 0.9$, $F_0(z) = 0.01$ and $F(z) = 0.03$ (right-tail probabilities), compute $\\text{Fdr}(z)$.`,
    0.3),
  n(LF, "apply-nonnull-prob", 2,
    "A gene has $\\text{fdr}(z) = 0.15$. What is the posterior probability that it is non-null?",
    0.85),
  n(LF, "apply-expected-nulls", 2,
    "A study tests $N = 6{,}000$ genes with $\\pi_0 = 0.95$. How many null genes are expected?",
    5700),
  m(LF, "recall-threshold", 2, "Efron’s conventional reporting rule is to call cases “interesting” when:",
    "$\\text{fdr}(z) \\le 0.2$", [
      ["$p \\le 0.05$", "That is a single-test rule, ignoring multiplicity."],
      ["$\\text{fdr}(z) \\ge 0.8$", "High fdr means probably null."],
      ["$z \\ge 0$", "Most such cases are null."],
    ]),

  // level 3
  n(LF, "apply-mixture-fdr", 3,
    `${twoGroups} With $\\pi_0 = 0.9$, $f_0(z) = 0.054$ and $f_1(z) = 0.3$, compute $\\text{fdr}(z)$. Give $4$ decimal places.`,
    0.6183),
  n(LF, "apply-pi0-central", 3,
    "Of $N = 6{,}000$ $z$-values, $3{,}900$ lie in $[-1, 1]$, where the $\\mathcal{N}(0, 1)$ null has probability $0.6827$. Assuming all central cases are null, estimate $\\pi_0 = 3{,}900/(N \\times 0.6827)$. Give $4$ decimal places.",
    0.9521),
  n(LF, "apply-bh-threshold", 3,
    "Benjamini–Hochberg with $N = 1{,}000$ tests and $q = 0.1$ compares the $k$-th smallest $p$-value with $kq/N$. What is the threshold for $k = 20$?",
    0.002),
  n(LF, "apply-Fdr-count", 3,
    "With $\\pi_0 = 1$ (conservatively), $N = 6{,}000$ and $40$ $z$-values above $3$, estimate $\\text{Fdr}$ for the region $z > 3$ by $N\\,\\Pr_0(Z > 3)/40$, using $\\Pr_0(Z > 3) = 0.00135$. Give $4$ decimal places.",
    0.2025),
  m(LF, "apply-pi0-upper", 3, "Treating every central $z$-value as null when estimating $\\pi_0$ tends to:",
    "Overestimate $\\pi_0$ slightly, which makes fdr estimates conservative", [
      ["Underestimate $\\pi_0$", "Non-null cases in the centre inflate the count, so $\\pi_0$ is overestimated."],
      ["Give $\\pi_0$ exactly", "Some non-nulls fall in the centre."],
      ["Make fdr estimates anti-conservative", "A larger $\\pi_0$ raises fdr."],
    ]),

  // level 4
  n(LF, "apply-normal-alt", 4,
    "Null $\\mathcal{N}(0, 1)$, alternative $\\mathcal{N}(3, 1)$, $\\pi_0 = 0.9$. Compute $\\text{fdr}(3)$. Give $4$ decimal places.",
    0.0909),
  n(LF, "apply-ratio-form", 4,
    "Write $\\text{fdr}(z) = 1/\\left(1 + \\frac{\\pi_1}{\\pi_0}\\frac{f_1(z)}{f_0(z)}\\right)$. With $\\pi_1/\\pi_0 = 1/9$ and $f_1(z)/f_0(z) = 36$, compute it.",
    0.2),
  n(LF, "apply-expected-false", 4,
    "Ten genes are reported with local fdr values averaging $0.12$. How many of them are expected to be null?",
    1.2),
  n(LF, "apply-empirical-z", 4,
    "The empirical null is $\\mathcal{N}(0.1, 1.3^2)$. Standardise $z = 4$ against it: $(z - \\delta_0)/\\sigma_0$.",
    3),
  m(LF, "apply-fdr-vs-Fdr", 4, "For a right-tail region, $\\text{Fdr}(z)$ compared with $\\text{fdr}(z)$ at the boundary is usually:",
    "Smaller, since Fdr averages fdr over the more extreme (more surely non-null) cases beyond $z$", [
      ["Larger", "The tail beyond $z$ is more non-null than $z$ itself."],
      ["Always equal", "Equal only if fdr is constant in the tail."],
      ["Unrelated", "Fdr is the average of fdr over the tail."],
    ]),

  // level 5
  n(LF, "apply-lindsey-fdr", 5,
    "Lindsey’s method estimates $f(3) = 0.03$. With $\\pi_0 = 0.95$ and $f_0(3) = \\varphi(3) = 0.004432$, compute $\\widehat{\\text{fdr}}(3)$. Give $4$ decimal places.",
    0.1403),
  n(LF, "apply-expected-true", 5,
    "Ten genes are reported with local fdr values averaging $0.12$. How many true discoveries are expected among them?",
    8.8),
  s(LF, "explain-bayes", 5,
    "Explain why the local fdr is an empirical Bayes quantity.",
    "Explains that $\\text{fdr}(z) = \\pi_0f_0(z)/f(z)$ is a Bayes posterior probability of the null under the two-groups prior ($\\pi_0$, $f_1$).",
    "Explains that the prior is not specified but estimated from all $N$ cases: $f$ from the histogram of $z$-values and $\\pi_0$ (and possibly $f_0$) from the central region, so the many tests supply the prior."),
  m(LF, "apply-f-not-f1", 5, "Why is the local fdr estimated through $f$ rather than through $f_1$?",
    "$f$ is the density of all $z$-values, directly estimable from their histogram; $f_1$ is never observed separately", [
      ["$f_1$ is known", "The non-null density is unknown."],
      ["$f$ equals $f_0$", "$f$ includes non-null cases."],
      ["It is a matter of notation", "Estimability is the point."],
    ]),
  s(LF, "explain-bh-link", 5,
    "How is the Benjamini–Hochberg procedure related to the empirical Bayes Fdr?",
    "Explains that BH rejects the $z$-values whose estimated $\\widehat{\\text{Fdr}}(z) = \\pi_0F_0(z)/\\hat{F}(z)$, with $\\hat{F}$ the empirical tail proportion and $\\pi_0 = 1$, is at most $q$.",
    "Concludes that BH at level $q$ is equivalent to thresholding the estimated tail-area Fdr, giving it a Bayesian interpretation: the rejected set is expected to be about $q$ null."),

  // level 6
  n(LF, "apply-threshold-z", 6,
    "Null $\\mathcal{N}(0, 1)$, alternative $\\mathcal{N}(3, 1)$, $\\pi_0 = 0.9$. Then $f_1/f_0 = e^{3z - 4.5}$. Find the $z$ at which $\\text{fdr}(z) = 0.2$. Give $4$ decimal places.",
    2.6945),
  n(LF, "apply-storey", 6,
    "Storey’s estimate is $\\hat{\\pi}_0 = \\#\\lbrace p_i > \\lambda \\rbrace/(N(1 - \\lambda))$. With $\\lambda = 0.5$, $N = 6{,}000$ and $2{,}850$ $p$-values above $0.5$, compute it.",
    0.95),
  s(LF, "explain-empirical-null-why", 6,
    "Give two reasons why the theoretical $\\mathcal{N}(0, 1)$ null may be wrong in a large study, and what the empirical null does.",
    "Names reasons such as correlation between cases, unobserved covariates or batch effects, and failed mathematical assumptions (e.g. a test statistic that is not exactly normal), all widening or shifting the central bulk.",
    "Explains that the empirical null fits $\\mathcal{N}(\\delta_0, \\sigma_0^2)$ to the central $z$-values, so cases are judged against how ordinary cases actually look in this study."),
  m(LF, "apply-wider-null", 6, "If the empirical null has $\\sigma_0 = 1.3$ but the theoretical $\\mathcal{N}(0, 1)$ is used, the analysis will:",
    "Report far too many discoveries, mistaking ordinary spread for signal", [
      ["Report too few discoveries", "A too-narrow null makes ordinary cases look extreme."],
      ["Be unaffected", "Tail probabilities change greatly."],
      ["Lose all power", "It gains false discoveries instead."],
    ]),
  s(LF, "explain-size-matters", 6,
    "Why must one be careful applying local fdr methods to a study with only $N = 50$ tests?",
    "Explains that the method estimates $f$ (and $\\pi_0$, $f_0$) from the data; with few cases the histogram is too sparse to estimate the density and its tails reliably.",
    "Concludes that with small $N$ the estimates are noisy and the empirical null is poorly determined, so the theoretical null and simpler procedures are preferable."),

  // level 7
  n(LF, "apply-Fdr-normal", 7,
    "Null $\\mathcal{N}(0, 1)$, alternative $\\mathcal{N}(3, 1)$, $\\pi_0 = 0.9$. With $\\Pr_0(Z > 2.5) = 0.00621$ and $\\Pr_1(Z > 2.5) = 0.69146$, compute $\\text{Fdr}(2.5)$. Give $4$ decimal places.",
    0.0748),
  n(LF, "apply-empirical-null-count", 7,
    "With $N = 6{,}000$ all-null cases, the empirical null $\\mathcal{N}(0, 1.3^2)$ and $\\Pr(Z > 3/1.3) = 0.010508$ under the standard normal, how many $z$-values above $3$ are expected? Give $1$ decimal place.",
    63.0),
  s(LF, "explain-fdr-average", 7,
    "Show that $\\text{Fdr}$ over a region is the average of $\\text{fdr}$ over that region with respect to $f$.",
    "Writes $\\text{Fdr}(\\mathcal{Z}) = \\frac{\\pi_0\\int_{\\mathcal{Z}}f_0}{\\int_{\\mathcal{Z}}f} = \\frac{\\int_{\\mathcal{Z}}\\text{fdr}(z)f(z)\\,dz}{\\int_{\\mathcal{Z}}f(z)\\,dz}$, using $\\pi_0f_0 = \\text{fdr}\\cdot f$.",
    "Concludes that Fdr is the $f$-weighted average of fdr over $\\mathcal{Z}$, so a rejection region can have small Fdr while cases near its boundary have much larger fdr."),
  m(LF, "apply-boundary", 7, "A study reports a set with $\\text{Fdr} = 0.1$. The case just inside the boundary has:",
    "A local fdr that may be well above $0.1$, since Fdr is an average dominated by extreme cases", [
      ["Local fdr exactly $0.1$", "Fdr is an average over the region."],
      ["Local fdr below $0.1$", "Boundary cases are the least convincing."],
      ["Local fdr of $0$", "Boundary cases may well be null."],
    ]),
  s(LF, "explain-correlation", 7,
    "How does correlation among the $z$-values affect large-scale testing, according to Efron?",
    "Explains that correlation leaves each $z$-value’s marginal distribution unchanged but makes the histogram itself vary much more from study to study, typically widening or narrowing the central bulk.",
    "Concludes that the theoretical null can be badly wrong for the realised study and that estimates (counts, Fdr) are less accurate than independence suggests, so the empirical null and accuracy formulas with correlation are needed."),

  // level 8
  s(LF, "explain-central-matching", 8,
    "Describe central matching for estimating the empirical null and $\\pi_0$.",
    "Describes fitting a quadratic to $\\log\\hat{f}(z)$ over the central region (where nearly all cases are null), since $\\log\\pi_0f_0(z)$ is quadratic for a normal null.",
    "Explains that the quadratic’s centre and curvature give $\\delta_0$ and $\\sigma_0$, and its height gives $\\pi_0$, because $\\pi_0f_0$ should match $f$ there."),
  n(LF, "apply-central-sigma", 8,
    "Central matching fits $\\log\\hat{f}(z) \\approx c - 0.2959z^2$ near the centre. For a normal null, the quadratic coefficient is $-1/(2\\sigma_0^2)$. Estimate $\\sigma_0$. Give $2$ decimal places.",
    1.3),
  m(LF, "apply-power", 8, "Efron measures the power of a large-scale study by:",
    "The expected non-null fdr: the average of $\\text{fdr}(z)$ over non-null cases, small values meaning non-nulls are found", [
      ["The number of tests", "Size is not power."],
      ["$\\pi_0$", "$\\pi_0$ says how many non-nulls there are, not whether we can find them."],
      ["The BH $q$ level", "That controls errors."],
    ]),
  s(LF, "explain-one-vs-two-sided", 8,
    "How should the local fdr analysis handle effects in both directions, and why can the two tails behave differently?",
    "Explains that fdr is computed at every $z$ from the two-sided density, so negative and positive tails are both handled naturally; there is no need to fold the $z$-values.",
    "Explains that non-null effects may be asymmetric (e.g. more up-regulated genes), so one tail may have many discoveries and the other few; folding into $|z|$ would hide this."),
  n(LF, "apply-q-value", 8,
    "In a BH analysis with $N = 2{,}000$ tests, the $25$th smallest $p$-value is $0.0006$. Its BH-adjusted value $Np_{(k)}/k$ (ignoring the monotonicity step) is:",
    0.048),

  // level 9
  n(LF, "apply-expected-false-Fdr", 9,
    "A study rejects $50$ hypotheses where the estimated $\\text{Fdr}$ of the rejected region is $0.1$. How many false discoveries are expected?",
    5),
  s(LF, "transfer-fund-managers", 9,
    "You have $t$-statistics for $3{,}000$ fund managers’ alphas. Apply the two-groups model to estimate how many have real skill and which to trust.",
    "Proposes treating each $t$-statistic as a $z$-value, estimating $f$ from their histogram and $\\pi_0$ and the null from the central region (possibly an empirical null, since managers’ returns are correlated through common factors).",
    "Reports $1 - \\pi_0$ as the estimated share with non-zero alpha and flags managers with $\\text{fdr}(z) \\le 0.2$, noting that the right tail and the left tail (negative skill) may differ and that correlation makes the estimates uncertain."),
  m(LF, "apply-relevance", 9, "Efron’s “relevance” problem in large-scale testing concerns:",
    "Whether all $N$ cases should share one fdr analysis, or subgroups (e.g. genes by chromosome) need separate priors", [
      ["Whether the $p$-values are uniform", "That concerns the null, not grouping."],
      ["Whether $\\pi_0 = 1$", "It is about which cases are comparable."],
      ["Whether to use one- or two-sided tests", "That is a separate choice."],
    ]),
  s(LF, "transfer-separate-analysis", 9,
    "A study combines two kinds of hypotheses with very different non-null rates. Explain the risks of a combined analysis and the remedy.",
    "Explains that a combined analysis uses one $\\pi_0$ and $f$, so cases from the richer group are penalised by the poor group’s nulls and vice versa; true fdr differs between groups.",
    "Proposes separate analyses (or a model with group-specific $\\pi_0$ and $f_1$), noting each group must still be large enough to estimate its own density."),
  n(LF, "apply-pi1-count", 9,
    "With $N = 6{,}000$ and an estimated $\\hat{\\pi}_0 = 0.9521$, how many non-null genes are estimated? Round to the nearest whole number.",
    287),

  // level 10
  s(LF, "transfer-design", 10,
    "Design an empirical Bayes testing analysis for $20{,}000$ correlated brain-imaging voxels, including what to report and how to check it.",
    "Proposes computing a $z$-value per voxel, estimating $f$ by Lindsey’s method, the empirical null by central matching (correlation and spatial structure make the theoretical null unreliable) and reporting voxels with $\\text{fdr} \\le 0.2$.",
    "Adds checks: compare theoretical and empirical nulls, consider separate analyses by region (relevance), quantify accuracy with correlation-aware or permutation methods, and report Fdr, estimated $\\pi_0$ and effect-size estimates (e.g. Tweedie) for the discoveries."),
  s(LF, "transfer-fdr-vs-pvalue", 10,
    "A scientist says “this gene has $p = 0.001$, so it is a discovery.” Explain why, in a study of $10{,}000$ genes, the local fdr can still be high.",
    "Explains that among $10{,}000$ mostly null genes about $10$ nulls are expected to have $p \\le 0.001$; whether this gene is interesting depends on how many genes have similar $z$-values compared with that null expectation.",
    "Explains that fdr $= \\pi_0f_0(z)/f(z)$: if the density of $z$-values near this one is barely above the null density, fdr is near $1$ despite the small $p$-value."),
  n(LF, "apply-expected-small-p", 10,
    "In a study of $10{,}000$ genes with $\\pi_0 = 0.98$, how many null genes are expected to have $p \\le 0.001$?",
    9.8),
  m(LF, "transfer-false", 10, "Which statement about the local fdr is false?",
    "It requires specifying the non-null density $f_1$ in advance", [
      ["It is a posterior probability of being null", "This is true."],
      ["It can use an empirical null", "This is true."],
      ["It needs many cases to estimate $f$", "This is true."],
    ]),
  s(LF, "transfer-combine", 10,
    "Explain how the local fdr and Tweedie’s formula combine to give a full empirical Bayes report on the top genes.",
    "Explains that the local fdr says how likely each top gene is to be null at all, using the two-groups model.",
    "Explains that Tweedie’s formula (from the same estimated $f$) estimates each gene’s effect size corrected for selection, so the report gives for each gene both a probability of being real and a realistic magnitude."),
];
