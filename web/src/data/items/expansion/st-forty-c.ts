import type { Item } from "../../../lib/assessment/types";
import { makeBuilders } from "../authoring";
import { EXPANSION } from "./source";

/** Statistics 40-pass (part C): one-sample t-test → effect size. Weighted to the hard end. */
const { mcq, short, num } = makeBuilders(EXPANSION);

const s = (concept: string, slug: string, level: number, stem: string, a: string, b: string) =>
  short({ concept, slug, cognitive: level >= 8.5 ? "transfer" : "explain", level, seconds: level >= 9 ? 300 : 200, stem },
    [["main", a, 5, true], ["detail", b, 4, true]]);
const n = (concept: string, slug: string, level: number, stem: string, key: number, tol = 0.01) =>
  num({ concept, slug, cognitive: "apply", level, seconds: level >= 7 ? 90 : 25, stem }, key, tol);
const m = (concept: string, slug: string, level: number, stem: string, right: string, wrong: [string, string][]) =>
  mcq({ concept, slug, cognitive: level <= 3 ? "recall" : "apply", level, seconds: 25, stem },
    right, wrong.map(([t, why], i) => [t, `${concept}-${slug}-${i}`, why] as [string, string, string]));

const OT = "one-sample-t-test";
const OP = "one-sample-proportions-z-test";
const TZ = "two-sample-z-test";
const GF = "chi-square-goodness-of-fit-test";
const FE = "fischers-exact-test";
const TT = "two-sample-t-test";
const PT = "paired-t-test";
const PI = "prediction-interval";
const EQ = "equivalence-testing";
const ES = "effect-size";

export const stFortyCItems: Item[] = [
  // --- one-sample-t-test ---------------------------------------------------------
  m(OT, "x4c-stat", 2, "The one-sample t-statistic is:", "$(\\bar{x} - \\mu_0)/(s/\\sqrt{n})$",
    [["$(\\bar{x} - \\mu_0)/s$", "Divide $s$ by $\\sqrt{n}$."], ["$(\\bar{x} - \\mu_0)/(\\sigma/\\sqrt{n})$", "That's the z-statistic."], ["$\\bar{x}/s$", "Missing $\\mu_0$ and $\\sqrt{n}$."]]),
  n(OT, "x4c-t", 3, "$n = 25$, $\\bar{x} = 10.5$, $\\mu_0 = 10$ and $s = 2$. Compute $t$.", 1.25),
  n(OT, "x4c-df", 3.5, "How many degrees of freedom does the test have when $n = 25$?", 24),
  n(OT, "x4c-t2", 4, "$n = 9$, $\\bar{x} = 12$, $\\mu_0 = 10$ and $s = 3$. Compute $t$.", 2),
  n(OT, "x4c-p", 8, "Compute the two-sided p-value for $t = 2$ with $8$ degrees of freedom.", 0.0805, 0.001),
  s(OT, "x4c-robust", 8, "How robust is the t-test to non-normal data?",
    "By the CLT the sample mean is close to normal for moderate $n$, so the test is fairly robust, especially to symmetric non-normality.",
    "Strong skewness hurts at small $n$ (particularly one-sided tests), and outliers inflate $s$ and cut power; bootstrap or the Wilcoxon signed-rank test are alternatives."),
  n(OT, "x4c-half", 8.5, "$n = 9$, $s = 3$ and $t_{0.975, 8} = 2.306$. Compute the half-width of the $95\\%$ CI.", 2.306, 0.001),
  n(OT, "x4c-power", 9, "Approximate the power of a two-sided t-test at $\\alpha = 0.05$ with $n = 16$ and effect size $d = 0.5$, using $\\Phi(d\\sqrt{n} - 1.96)$.", 0.516, 0.002),
  s(OT, "x4c-derive", 9, "Why does $(\\bar{X} - \\mu)/(S/\\sqrt{n})$ have a $t_{n-1}$ distribution for normal data?",
    "$\\bar{X} \\sim N(\\mu, \\sigma^2/n)$ and $(n - 1)S^2/\\sigma^2 \\sim \\chi^2_{n-1}$, and for normal samples $\\bar{X}$ and $S^2$ are independent.",
    "So the statistic is $Z/\\sqrt{V/(n - 1)}$ with independent $Z \\sim N(0, 1)$ and $V \\sim \\chi^2_{n-1}$, which is the definition of $t_{n-1}$; the independence fails without normality."),
  s(OT, "x4c-skew", 9.5, "With right-skewed data (e.g. log-normal) and $n = 20$, why are the error rates of the two one-sided t-tests unequal, and how can you fix this?",
    "Under skewness $\\bar{x}$ and $s$ are positively correlated: large means come with large SDs, so the t-statistic is skewed to the left. The upper-tailed test is conservative and the lower-tailed test anti-conservative.",
    "Fixes: analyse $\\log x$, use a bootstrap-t interval, or Johnson's skewness-corrected t."),

  // --- one-sample-proportions-z-test ----------------------------------------------------
  m(OP, "x4c-se", 2, "The one-proportion z-test uses the standard error:", "$\\sqrt{p_0(1 - p_0)/n}$",
    [["$\\sqrt{\\hat{p}(1 - \\hat{p})/n}$", "That's the Wald SE; the test uses $p_0$."], ["$p_0/\\sqrt{n}$", "No."], ["$\\sqrt{p_0/n}$", "No."]]),
  n(OP, "x4c-z", 3, "$\\hat{p} = 0.55$, $p_0 = 0.5$ and $n = 400$. Compute $z$.", 2),
  n(OP, "x4c-cond", 4, "For the normal approximation to be reliable, $np_0$ and $n(1 - p_0)$ should be at least about $10$. Compute $np_0$ for $n = 40$ and $p_0 = 0.1$.", 4),
  n(OP, "x4c-exact", 4, "Exact test: $n = 10$, $p_0 = 0.5$, and $9$ successes are observed. Compute the one-sided p-value $P(X \\ge 9)$.", 0.01074, 0.0002),
  n(OP, "x4c-n", 8, "What sample size gives a $95\\%$ margin of error of $0.03$ in the worst case $p = 0.5$?", 1068),
  n(OP, "x4c-score", 8.5, "$\\hat{p} = 0.1$, $n = 100$ and $p_0 = 0.2$. Compute the score z-statistic, which uses $p_0$ in the SE.", -2.5),
  n(OP, "x4c-wald", 8.5, "Same data: compute the Wald z-statistic, which uses $\\hat{p}$ in the SE.", -3.3333, 0.001),
  s(OP, "x4c-why-score", 9, "Why is the score test (with the null SE) usually preferred over the Wald test for a proportion?",
    "The score test computes the SE under $H_0$, so its null distribution is closer to normal and its size is accurate.",
    "The Wald SE uses $\\hat{p}$, which is unstable near $0$ or $1$ and makes the test anti-conservative; inverting the score test gives the Wilson interval."),
  s(OP, "x4c-midp", 9, "What is a mid-p value for an exact binomial test, and why use it?",
    "It counts only half the probability of the observed outcome: $P(X > x) + \\tfrac12P(X = x)$.",
    "It reduces the conservativeness caused by discreteness (its null expectation is $\\tfrac12$), at the cost of no strict guarantee that the size is at most $\\alpha$."),
  n(OP, "x4c-midp-calc", 9.5, "Compute the one-sided mid-p value for $n = 10$, $p_0 = 0.5$ and $9$ observed successes.", 0.005859, 0.0001),

  // --- two-sample-z-test ------------------------------------------------------------------
  m(TZ, "x4c-what", 2, "The two-sample z-test compares:", "Two population means when both standard deviations are known (or samples are large)",
    [["Two proportions only", "That's a special case."], ["Paired measurements", "Use the paired test."], ["Two variances", "That's the F-test."]]),
  n(TZ, "x4c-se", 2.5, "$\\sigma_1 = \\sigma_2 = 10$ and $n_1 = n_2 = 50$. Compute the SE of $\\bar{x}_1 - \\bar{x}_2$.", 2),
  n(TZ, "x4c-z", 3, "With that SE, $\\bar{x}_1 - \\bar{x}_2 = 5$. Compute $z$.", 2.5),
  n(TZ, "x4c-p", 4, "Compute the two-sided p-value for $z = 2.5$.", 0.0124, 0.0005),
  n(TZ, "x4c-neyman", 8, "Total sample $200$, $\\sigma_1 = 10$ and $\\sigma_2 = 20$. Neyman allocation sets $n_1 \\propto \\sigma_1$. Compute $n_1$.", 66.67, 0.001),
  n(TZ, "x4c-ratio", 8.5, "Compute the ratio of the SE under that allocation to the SE with $100$ per group.", 0.9487, 0.001),
  s(TZ, "x4c-paired", 8, "Why shouldn't paired measurements be analysed as two independent samples?",
    "$\\mathrm{Var}(\\bar{x}_1 - \\bar{x}_2)$ includes $-2\\mathrm{Cov}/n$; with positive within-pair correlation the true SE is smaller than the independent-samples SE, so the test is conservative and loses power.",
    "With negative correlation it's anti-conservative. Use the paired test on the differences."),
  n(TZ, "x4c-npg", 9, "How many per group are needed to detect a difference of $5$ with $\\sigma = 10$ in each group, two-sided $\\alpha = 0.05$ and power $0.8$?", 63),
  s(TZ, "x4c-alloc", 9, "Why does unequal allocation lose power when $\\sigma_1 = \\sigma_2$, and when is a $2{:}1$ allocation worth it?",
    "The SE is proportional to $\\sqrt{1/n_1 + 1/n_2}$, which for fixed $n_1 + n_2$ is smallest at an equal split; $2{:}1$ loses only about $11\\%$ efficiency.",
    "It's worth it when one arm is cheaper or ethically preferable, or variances differ: the cost-optimal allocation has $n_i \\propto \\sigma_i/\\sqrt{c_i}$."),
  n(TZ, "x4c-eff21", 9.5, "For a fixed total $N$ and equal variances, compute the relative efficiency of a $2{:}1$ allocation (variance with equal allocation ÷ variance with $2{:}1$).", 0.8889, 0.001),

  // --- chi-square-goodness-of-fit-test ------------------------------------------------------
  m(GF, "x4c-what", 2, "The $\\chi^2$ goodness-of-fit test compares:", "Observed category counts with those expected under a hypothesised distribution",
    [["Two sample means", "No."], ["Two categorical variables", "That's the independence test."], ["Variances", "No."]]),
  n(GF, "x4c-die", 3, "A die is rolled $60$ times. Under fairness, what is the expected count per face?", 10),
  n(GF, "x4c-df", 3.5, "How many degrees of freedom does the test have for $6$ categories with fully specified probabilities?", 5),
  n(GF, "x4c-cell", 4, "What is the contribution of a category with $O = 14$ and $E = 10$?", 1.6, 0.001),
  n(GF, "x4c-df-est", 4.5, "Testing a Poisson fit with $5$ categories, with $\\lambda$ estimated from the data. How many degrees of freedom?", 3),
  n(GF, "x4c-chi", 8, "A die shows counts $5, 8, 9, 8, 10, 20$ in $60$ rolls. Compute $\\chi^2$.", 13.4, 0.001),
  s(GF, "x4c-est", 8, "Why subtract a degree of freedom for each estimated parameter, and does it matter how the parameters are estimated?",
    "Fitting parameters moves the expected counts towards the observed ones, which shrinks the statistic; each parameter removes about one degree of freedom.",
    "The $\\chi^2_{k-1-p}$ result holds for estimates from the grouped counts (minimum $\\chi^2$ or grouped MLE). With MLEs from ungrouped data the null distribution lies between $\\chi^2_{k-1-p}$ and $\\chi^2_{k-1}$ (Chernoff–Lehmann)."),
  n(GF, "x4c-hwe-p", 8.5, "Genotype counts: AA $50$, Aa $30$, aa $20$ ($n = 100$). Estimate the frequency $p$ of allele A.", 0.65, 0.001),
  n(GF, "x4c-hwe-e", 9, "Under Hardy–Weinberg equilibrium with that $p$, what is the expected AA count?", 42.25, 0.001),
  s(GF, "x4c-huge", 9.5, "Why does a $\\chi^2$ goodness-of-fit test with a huge sample almost always reject, and what should you do instead?",
    "Models are approximations; with enough data any small deviation from the exact hypothesised distribution becomes significant.",
    "Judge the size of the misfit (e.g. Cohen's $w = \\sqrt{\\chi^2/n}$), use graphical checks, or test whether the deviation is within an acceptable tolerance."),

  // --- fischers-exact-test -------------------------------------------------------------------
  m(FE, "x4c-cond", 2, "Fisher's exact test conditions on:", "Both the row and the column totals of the table",
    [["Only the grand total", "Both margins."], ["The cell counts", "Those are random."], ["Nothing", "It's conditional."]]),
  n(FE, "x4c-ptable", 3, "A $2 \\times 2$ table with rows $(3, 1)$ and $(1, 3)$ has all margins $4$. Compute its hypergeometric probability.", 0.2286, 0.001),
  n(FE, "x4c-count", 4, "How many distinct $2 \\times 2$ tables have all margins equal to $4$?", 5),
  n(FE, "x4c-one", 4.5, "Compute the one-sided p-value for the table with rows $(3, 1)$ and $(1, 3)$.", 0.2429, 0.001),
  n(FE, "x4c-two", 8, "Compute the two-sided p-value (summing tables no more probable than the observed one) for that table.", 0.4857, 0.001),
  s(FE, "x4c-conserv", 8, "Why is Fisher's exact test conservative?",
    "The conditional distribution is discrete, so only a few p-values are attainable and the actual size is usually well below $\\alpha$.",
    "Mid-p values or unconditional tests (Barnard's, Boschloo's) are more powerful."),
  n(FE, "x4c-tea", 8.5, "Lady tasting tea: of $8$ cups, $4$ had milk first, and she identifies all $4$ correctly. Compute the p-value.", 0.01429, 0.0002),
  n(FE, "x4c-or", 9, "Compute the sample odds ratio for the table with rows $(3, 1)$ and $(1, 3)$.", 9),
  s(FE, "x4c-barnard", 9, "Contrast Barnard's unconditional test with Fisher's conditional test.",
    "Barnard treats only one margin as fixed (two independent binomials) and maximises the p-value over the unknown common proportion.",
    "It's usually more powerful but computationally heavier; whether to condition on the second margin is a long-running debate about ancillarity."),
  s(FE, "x4c-ancillary", 9.5, "Why is conditioning on both margins defensible even when only one was fixed by design?",
    "The other margin is approximately ancillary for the odds ratio: it carries little information about it. Conditioning removes the nuisance baseline proportion, giving a test with exact size.",
    "The conditional distribution is Fisher's noncentral hypergeometric, which depends only on the odds ratio; this also gives the conditional MLE and exact confidence intervals for the odds ratio."),

  // --- two-sample-t-test ------------------------------------------------------------------------
  m(TT, "x4c-assume", 2, "The pooled two-sample t-test assumes:", "Independent samples from normal populations with equal variances",
    [["Paired samples", "No."], ["Known variances", "That's the z-test."], ["Equal sample sizes", "Not required."]]),
  n(TT, "x4c-pooled", 3, "$s_1^2 = 4$, $s_2^2 = 9$ and $n_1 = n_2 = 11$. Compute the pooled variance.", 6.5),
  n(TT, "x4c-df", 3.5, "How many degrees of freedom does the pooled test have when $n_1 = n_2 = 11$?", 20),
  n(TT, "x4c-se", 4, "With pooled variance $6.5$ and $n_1 = n_2 = 11$, compute the SE of $\\bar{x}_1 - \\bar{x}_2$.", 1.0871, 0.001),
  n(TT, "x4c-welch", 8, "Compute the Welch–Satterthwaite degrees of freedom for $s_1^2 = 4$, $n_1 = 10$, $s_2^2 = 16$ and $n_2 = 20$.", 27.98, 0.001),
  s(TT, "x4c-default", 8, "Why is Welch's test a sensible default over the pooled t-test?",
    "When variances differ, the pooled test's size is wrong, especially with unequal $n$ (a smaller group with the larger variance makes it anti-conservative).",
    "Welch loses very little power when variances are equal, so there's little cost to using it always."),
  n(TT, "x4c-d", 8.5, "Mean difference $3$ with pooled variance $6.5$. Compute Cohen's $d$.", 1.1767, 0.001),
  n(TT, "x4c-mismatch", 9, "Group 1: $n_1 = 10$, $\\sigma_1^2 = 16$. Group 2: $n_2 = 40$, $\\sigma_2^2 = 1$. The pooled test estimates $\\mathrm{Var}(\\bar{x}_1 - \\bar{x}_2)$ as $s_p^2(1/n_1 + 1/n_2)$ with $\\mathbb{E}[s_p^2] = (9 \\cdot 16 + 39 \\cdot 1)/48$. Compute the true variance divided by this estimate's expectation.", 3.41, 0.001),
  s(TT, "x4c-behrens", 9, "What is the Behrens–Fisher problem?",
    "Testing a difference in normal means with unequal, unknown variances has no exact pivot: the statistic's null distribution depends on the unknown variance ratio.",
    "Welch–Satterthwaite gives an accurate approximation; fiducial and Bayesian approaches offer other solutions."),
  s(TT, "x4c-pretest", 9.5, "Why is “test the variances first, then choose the pooled or Welch test” a poor procedure?",
    "The two-stage procedure's overall size isn't controlled: the choice depends on the same data, and variance tests are underpowered at small $n$ — precisely when the choice matters.",
    "Variance tests like the F-test are also very sensitive to non-normality. Simulations show that always using Welch's test does at least as well."),

  // --- paired-t-test ---------------------------------------------------------------------------
  m(PT, "x4c-what", 2, "A paired t-test analyses:", "The within-pair differences as a one-sample problem",
    [["The two groups as independent samples", "That ignores the pairing."], ["Ranks of the differences", "That's the signed-rank test."], ["The correlation", "No."]]),
  n(PT, "x4c-mean", 3, "Differences are $2, 4, 3, 5, 1$. Compute their mean.", 3),
  n(PT, "x4c-sd", 3.5, "Compute the SD of those differences.", 1.5811, 0.001),
  n(PT, "x4c-t", 4, "Compute the paired t-statistic.", 4.2426, 0.001),
  n(PT, "x4c-vardiff", 8, "$\\mathrm{Var}(X) = \\mathrm{Var}(Y) = 25$ and $\\mathrm{corr}(X, Y) = 0.8$. Compute $\\mathrm{Var}(X - Y)$.", 10),
  n(PT, "x4c-eff", 8.5, "In that setting, what is the efficiency gain of pairing: the variance of the difference for independent samples divided by that for pairs?", 5),
  s(PT, "x4c-hurt", 8, "When can pairing hurt?",
    "If the within-pair correlation is near zero, pairing gains nothing but halves the degrees of freedom ($n - 1$ instead of $2n - 2$), costing some power.",
    "If the correlation is negative, the variance of the differences exceeds the independent-samples variance."),
  s(PT, "x4c-crossover", 9, "Crossover trials use paired comparisons. What are carryover and period effects, and how do they bias a paired t-test?",
    "Carryover: the first treatment's effect persists into the second period. Period effect: outcomes drift over time regardless of treatment.",
    "Either one is confounded with treatment unless order is balanced (AB/BA sequences) and washout is adequate; analyse with a period term (and test carryover)."),
  n(PT, "x4c-ci", 9, "Paired data: $n = 10$, mean difference $1$, SD of differences $2$, and $t_{0.975, 9} = 2.262$. Compute the half-width of the $95\\%$ CI.", 1.4306, 0.001),
  s(PT, "x4c-anova", 9.5, "Show that the paired t-test is equivalent to a two-way ANOVA with subject and treatment factors.",
    "With two treatments, the treatment F-statistic in the subject-by-treatment ANOVA equals $t^2$ from the paired test, with $n - 1$ residual degrees of freedom.",
    "Blocking on subjects removes the between-subject variance, just as differencing does; a mixed model with random subject effects gives the same test."),

  // --- prediction-interval ----------------------------------------------------------------------
  n(PI, "x4c-known", 3, "Normal data with known $\\mu = 100$ and $\\sigma = 15$. Compute the half-width of a $95\\%$ prediction interval for a new observation.", 29.4, 0.001),
  m(PI, "x4c-wider", 4, "A prediction interval is wider than a confidence interval for the mean because:", "It includes the variability of a single new observation, not just the uncertainty in the mean",
    [["It uses a higher confidence level", "Not necessarily."], ["It uses the $t$ distribution", "Both can."], ["It ignores the sample size", "No."]]),
  n(PI, "x4c-t", 4, "$n = 25$, $s = 15$ and $t = 2.064$. Compute the prediction-interval half-width $ts\\sqrt{1 + 1/n}$.", 31.573, 0.001),
  n(PI, "x4c-reg-pi", 8, "Regression: $s = 2$, $n = 20$, $(x - \\bar{x})^2/S_{xx} = 0.15$ and $t = 2.101$. Compute the prediction-interval half-width $ts\\sqrt{1 + 1/n + 0.15}$.", 4.603, 0.001),
  n(PI, "x4c-reg-ci", 8, "Same regression: compute the half-width of the CI for the mean response, $ts\\sqrt{1/n + 0.15}$.", 1.8792, 0.001),
  s(PI, "x4c-limit", 8.5, "Why doesn't a prediction interval shrink to zero width as $n \\to \\infty$, unlike a confidence interval?",
    "A new observation has irreducible noise with variance $\\sigma^2$, however well the mean is estimated.",
    "As $n$ grows the width tends to $2z\\sigma$, while the CI width shrinks like $1/\\sqrt{n}$."),
  n(PI, "x4c-np", 8.5, "With $n = 19$ i.i.d. continuous observations, what is the probability a new observation falls between the sample minimum and maximum?", 0.9, 0.001),
  s(PI, "x4c-conformal", 9, "Explain split conformal prediction intervals and their guarantee.",
    "Fit a model on one part of the data, compute absolute residuals (scores) on a calibration set, and add and subtract their $\\lceil(n + 1)(1 - \\alpha)\\rceil$-th smallest value to new predictions.",
    "Under exchangeability this gives marginal coverage of at least $1 - \\alpha$ in finite samples, with no distributional assumptions; coverage is marginal, not conditional on $x$."),
  n(PI, "x4c-conformal-k", 9, "Split conformal with $n = 99$ calibration points and $\\alpha = 0.1$: which order statistic of the scores is used?", 90),
  s(PI, "x4c-skew", 9.5, "Why do normal-theory prediction intervals fail for skewed or heteroscedastic data, and what are the alternatives?",
    "They are symmetric with constant width, so they miscover: too short in the long tail and where variance is high, too long elsewhere.",
    "Alternatives: transform the response (e.g. logs), quantile regression, conformalised quantile regression, or bootstrap predictive intervals."),

  // --- equivalence-testing ---------------------------------------------------------------------
  m(EQ, "x4c-tost", 3, "In the two one-sided tests (TOST) procedure, equivalence is concluded when:", "Both one-sided tests reject, placing the effect inside $(-\\Delta, \\Delta)$",
    [["Either one-sided test rejects", "Both must."], ["The usual two-sided test fails to reject", "That's not evidence of equivalence."], ["The p-value exceeds $0.05$", "No."]]),
  n(EQ, "x4c-ci-level", 4, "TOST at $\\alpha = 0.05$ is equivalent to checking whether a confidence interval of what level (in percent) lies within the margins?", 90),
  n(EQ, "x4c-upper", 4, "Margin $\\Delta = 2$, estimate $0.5$ and SE $0.6$. Compute the upper test statistic $(\\hat\\theta - \\Delta)/\\mathrm{SE}$.", -2.5),
  n(EQ, "x4c-lower", 7.5, "Same: compute the lower test statistic $(\\hat\\theta + \\Delta)/\\mathrm{SE}$.", 4.1667, 0.001),
  m(EQ, "x4c-conclude", 8, "With those statistics, $\\alpha = 0.05$ and z critical values, the conclusion is:", "Equivalence: both statistics exceed $1.645$ in the required direction",
    [["Not equivalent: the estimate isn't $0$", "Irrelevant."], ["Inconclusive", "Both tests reject."], ["Not equivalent: the upper test fails", "$-2.5 < -1.645$, so it rejects."]]),
  n(EQ, "x4c-p", 8.5, "Compute the TOST p-value, the larger of the two one-sided p-values: $\\max(\\Phi(-2.5), 1 - \\Phi(4.1667))$.", 0.00621, 0.0002),
  s(EQ, "x4c-neither", 8.5, "How can a study be both “not significantly different from zero” and “not equivalent”?",
    "A wide confidence interval can contain $0$ and also extend beyond the equivalence margins.",
    "The study is simply inconclusive (underpowered); only a larger sample or a more precise design can settle it."),
  n(EQ, "x4c-power", 9, "True effect $0$, $\\Delta = 2$, SE $0.8$, $\\alpha = 0.05$ (z). Compute the TOST power $2\\Phi(\\Delta/\\mathrm{SE} - 1.645) - 1$.", 0.6074, 0.001),
  s(EQ, "x4c-margin", 9, "How should an equivalence margin be chosen, and what goes wrong if it's chosen after seeing the data?",
    "It should be fixed in advance from substantive considerations: the largest difference that wouldn't matter clinically or practically (or a regulatory standard).",
    "A margin chosen post hoc can always be made wide enough to declare equivalence, so the test's error guarantees disappear."),
  s(EQ, "x4c-biocreep", 9.5, "Explain non-inferiority trials and the concern known as biocreep.",
    "A non-inferiority trial tests one-sidedly that a new treatment is not worse than an active control by more than a margin $\\Delta$.",
    "If each new drug is only shown non-inferior to a slightly worse predecessor, effectiveness can drift towards placebo over generations; this relies on assay sensitivity and the constancy assumption."),

  // --- effect-size ----------------------------------------------------------------------------
  n(ES, "x4c-d", 3, "Group means $105$ and $100$ with pooled SD $10$. Compute Cohen's $d$.", 0.5, 0.001),
  m(ES, "x4c-large", 3, "By Cohen's conventions, $d = 0.8$ is considered:", "Large",
    [["Small", "That's about $0.2$."], ["Medium", "That's about $0.5$."], ["Negligible", "No."]]),
  n(ES, "x4c-r", 4, "Convert $d = 0.5$ to a correlation using $r = d/\\sqrt{d^2 + 4}$.", 0.2425, 0.001),
  n(ES, "x4c-hedges", 8, "Hedges' correction is $J = 1 - 3/(4(n_1 + n_2) - 9)$. Compute $g = Jd$ for $d = 0.5$ and $n_1 = n_2 = 10$.", 0.4789, 0.001),
  n(ES, "x4c-or-d", 8.5, "Convert an odds ratio of $3$ to $d$ using $d = \\ln(\\mathrm{OR})\\sqrt{3}/\\pi$.", 0.6057, 0.001),
  s(ES, "x4c-std-mislead", 8.5, "Why can standardised effect sizes mislead when comparing studies?",
    "They divide by the SD, which depends on the population's heterogeneity and the measurement's reliability; the same raw effect gives a larger $d$ in a homogeneous sample.",
    "Range restriction and measurement error distort comparisons; report raw effects in meaningful units when possible."),
  n(ES, "x4c-ps", 9, "For equal-variance normal groups, the probability of superiority is $\\Phi(d/\\sqrt{2})$. Compute it for $d = 0.5$.", 0.6382, 0.001),
  n(ES, "x4c-omega", 9, "ANOVA: $SS_b = 30$, $SS_t = 150$, $df_b = 2$ and $MS_w = 2$. Compute $\\omega^2 = (SS_b - df_bMS_w)/(SS_t + MS_w)$.", 0.1711, 0.001),
  s(ES, "x4c-inflate", 9, "Why are effect sizes from small, significant studies biased upward?",
    "With low power, only estimates that happen to be large reach significance, so the significant ones systematically overstate the true effect (Type M error).",
    "Publication bias compounds this; meta-analyses show it as funnel-plot asymmetry, and shrinkage or bias-corrected meta-analysis counteracts it."),
  s(ES, "x4c-r2", 9.5, "Why can $r^2$ (“variance explained”) understate practical importance? Give an example.",
    "A small $r^2$ can correspond to a large difference in outcomes that matter, especially for binary outcomes or effects applied to many people.",
    "Rosenthal's binomial effect size display: $r = 0.32$ ($r^2 = 0.1$) corresponds to success rates of $34\\%$ versus $66\\%$; in the aspirin trial $r^2 \\approx 0.001$, yet heart attacks were substantially reduced."),
];
