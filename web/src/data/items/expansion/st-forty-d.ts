import type { Item } from "../../../lib/assessment/types";
import { makeBuilders } from "../authoring";
import { EXPANSION } from "./source";

/** Statistics 40-pass (part D): multiplicity, sequential tests, nonparametrics. Weighted to the hard end. */
const { mcq, short, num } = makeBuilders(EXPANSION);

const s = (concept: string, slug: string, level: number, stem: string, a: string, b: string) =>
  short({ concept, slug, cognitive: level >= 8.5 ? "transfer" : "explain", level, seconds: level >= 9 ? 300 : 200, stem },
    [["main", a, 5, true], ["detail", b, 4, true]]);
const n = (concept: string, slug: string, level: number, stem: string, key: number, tol = 0.01) =>
  num({ concept, slug, cognitive: "apply", level, seconds: level >= 7 ? 90 : 25, stem }, key, tol);
const m = (concept: string, slug: string, level: number, stem: string, right: string, wrong: [string, string][]) =>
  mcq({ concept, slug, cognitive: level <= 3 ? "recall" : "apply", level, seconds: 25, stem },
    right, wrong.map(([t, why], i) => [t, `${concept}-${slug}-${i}`, why] as [string, string, string]));

const MT = "multiple-testing";
const SQ = "sequential-testing";
const TP = "two-sample-proportions-z-test";
const FW = "family-wise-error-rate";
const FD = "false-discovery-rate";
const QQ = "qq-plots";
const PM = "permutation-test";
const KW = "kruskal-wallis-test";
const KS = "kolmogorov-smirnov-test";
const SR = "wilcoxon-signed-rank-test";
const MC = "mcnemar-test";

const PS = "Sorted p-values $0.001$, $0.012$, $0.02$ and $0.04$ ($m = 4$, level $0.05$)";

export const stFortyDItems: Item[] = [
  // --- multiple-testing -----------------------------------------------------------
  n(MT, "x4d-bonf", 4, "What is the Bonferroni per-test threshold for $20$ tests at $\\alpha = 0.05$?", 0.0025, 0.0001),
  n(MT, "x4d-sidak", 4, "What is the Šidák per-test threshold $1 - 0.95^{1/20}$ for $20$ tests?", 0.002561, 0.00005),
  n(MT, "x4d-holm", 8, `${PS}. How many hypotheses does Holm's procedure reject?`, 4),
  n(MT, "x4d-bonf-count", 8, `${PS}. How many does Bonferroni reject?`, 2),
  n(MT, "x4d-bh", 8.5, `${PS}. How many does Benjamini–Hochberg reject at FDR $0.05$?`, 4),
  s(MT, "x4d-forking", 8.5, "Explain the “garden of forking paths.”",
    "Analysis choices (outcomes, exclusions, covariates, subgroups) are made in response to the data, so there are many potential comparisons even if only one test is run and reported.",
    "The reported test's error rate is inflated although no explicit fishing occurred; pre-registration and multiverse analyses are the remedies."),
  s(MT, "x4d-conservative", 9, "When is Bonferroni overly conservative, and what does better?",
    "With many positively correlated tests (voxels, SNPs in linkage), the effective number of independent tests is much smaller than $m$, so Bonferroni over-corrects.",
    "Permutation-based max-T or min-P procedures (Westfall–Young) adapt to the dependence; Holm always dominates Bonferroni; FDR control suits screening."),
  n(MT, "x4d-expected", 9, "You test $1000$ true nulls at an unadjusted $\\alpha = 0.05$. What is the expected number of false discoveries?", 50),
  n(MT, "x4d-minp", 9, "For $m = 10$ independent null tests, the $5\\%$ quantile of the minimum p-value is $1 - 0.95^{1/10}$. Compute it.", 0.005116, 0.0001),
  s(MT, "x4d-goal", 9.5, "Why should the choice between FWER and FDR control depend on the scientific goal?",
    "FWER control suits confirmatory settings where any single false claim is costly (e.g. a drug's primary endpoints); FDR suits exploratory screening where the proportion of false leads matters.",
    "FDR control is far more powerful with many tests and adapts to the number of real signals; FWER guarantees become very stringent as $m$ grows."),

  // --- sequential-testing ---------------------------------------------------------
  m(SQ, "x4d-peek", 3, "Repeatedly peeking at a fixed-sample test and stopping when it's significant:", "Inflates the Type I error",
    [["Leaves the Type I error unchanged", "Each look is another chance to reject."], ["Reduces the Type I error", "No."], ["Only affects power", "No."]]),
  n(SQ, "x4d-pocock", 4, "Pocock's boundary for $5$ looks at overall $\\alpha = 0.05$ is about $z = 2.413$. What nominal two-sided p-value is used at each look?", 0.0158, 0.0005),
  n(SQ, "x4d-obf", 4, "An O'Brien–Fleming design with $5$ looks has a final critical value of about $2.04$; the first look uses $2.04\\sqrt{5}$. Compute it.", 4.5616, 0.001),
  n(SQ, "x4d-A", 8, "Wald's SPRT with $\\alpha = 0.05$ and $\\beta = 0.2$: compute the upper boundary $A = (1 - \\beta)/\\alpha$.", 16),
  n(SQ, "x4d-B", 8, "Same: compute the lower boundary $B = \\beta/(1 - \\alpha)$.", 0.2105, 0.001),
  s(SQ, "x4d-sprt", 8.5, "Describe the sequential probability ratio test and its optimality property.",
    "After each observation, update the likelihood ratio $\\Lambda_n$; stop and reject $H_0$ if $\\Lambda_n \\ge A$, accept it if $\\Lambda_n \\le B$, otherwise continue.",
    "Wald–Wolfowitz: among tests with the same error rates, the SPRT minimises the expected sample size under both simple hypotheses — often by about half — though its sample size is unbounded."),
  n(SQ, "x4d-spend", 9, "O'Brien–Fleming-type alpha spending is $2 - 2\\Phi(z_{\\alpha/2}/\\sqrt{t})$. Compute the alpha spent by information fraction $t = 0.5$ with $\\alpha = 0.05$.", 0.00557, 0.0002),
  s(SQ, "x4d-bias", 9, "Why are effect estimates from trials stopped early for benefit biased?",
    "Stopping happens when the estimate crosses a high boundary, which preferentially selects random highs; the estimate's distribution is truncated.",
    "Early-stopped trials overstate effects, especially with few events; use bias-adjusted or median-unbiased estimators and interpret early stops cautiously."),
  n(SQ, "x4d-looks", 9, "If $5$ looks at $\\alpha = 0.05$ were independent, what would be the probability that at least one rejects? (Real looks are correlated, so the actual inflation is smaller.)", 0.2262, 0.001),
  s(SQ, "x4d-always", 9.5, "Contrast always-valid inference (e-processes, mixture SPRTs) with group-sequential designs.",
    "An e-process is a non-negative supermartingale under $H_0$; Ville's inequality bounds the probability it ever exceeds $1/\\alpha$, so you can monitor continuously and stop at any time.",
    "Group-sequential designs need pre-planned looks or an alpha-spending function but can be more powerful at those looks; always-valid methods suit online A/B testing with continuous peeking."),

  // --- two-sample-proportions-z-test ---------------------------------------------------
  n(TP, "x4d-pool", 3, "$\\hat{p}_1 = 0.30$ ($n_1 = 200$) and $\\hat{p}_2 = 0.20$ ($n_2 = 200$). Compute the pooled proportion.", 0.25, 0.001),
  n(TP, "x4d-rr", 3.5, "Compute the relative risk $\\hat{p}_1/\\hat{p}_2$.", 1.5),
  n(TP, "x4d-se", 4, "Compute the pooled SE of $\\hat{p}_1 - \\hat{p}_2$.", 0.0433, 0.0005),
  n(TP, "x4d-z", 4, "Compute the z-statistic.", 2.3094, 0.001),
  n(TP, "x4d-unpooled", 8, "Compute the unpooled SE used for the confidence interval.", 0.04301, 0.0002),
  s(TP, "x4d-why-pool", 8, "Why use a pooled SE for the test but an unpooled SE for the confidence interval?",
    "Under $H_0$ the proportions are equal, so pooling gives the best estimate of the common variance under the null — which is what the test's null distribution needs.",
    "The confidence interval makes no null assumption, so each group's variance is estimated from its own proportion."),
  n(TP, "x4d-n", 8.5, "How many per group are needed to detect $0.30$ versus $0.20$ with two-sided $\\alpha = 0.05$ and power $0.8$? Use $(1.96 + 0.8416)^2(p_1q_1 + p_2q_2)/\\delta^2$ and round up.", 291),
  n(TP, "x4d-selrr", 9, "Compute the SE of $\\log\\widehat{RR}$, $\\sqrt{\\frac{1 - p_1}{n_1p_1} + \\frac{1 - p_2}{n_2p_2}}$, for $p_1 = 0.3$, $p_2 = 0.2$ and $200$ per group.", 0.178, 0.001),
  s(TP, "x4d-measures", 9, "When do the risk difference, relative risk and odds ratio give different impressions, and which of them is non-collapsible?",
    "The odds ratio approximates the relative risk only for rare outcomes; with common outcomes the OR is further from $1$. A constant RR implies very different risk differences at different baselines.",
    "The risk difference and relative risk are collapsible, but the odds ratio isn't: adjusting for a prognostic non-confounder changes the conditional OR."),
  s(TP, "x4d-clusters", 9.5, "In an A/B test randomised by user, why is a two-proportion z-test on session-level conversions invalid?",
    "Sessions from the same user are correlated, so there are far fewer independent units than sessions; the SE is underestimated and false positives inflate.",
    "Analyse at the randomisation unit (per-user metrics), use the delta method for ratio metrics, or use cluster-robust standard errors."),

  // --- family-wise-error-rate --------------------------------------------------------
  n(FW, "x4d-fwer10", 6.5, "What is the FWER for $10$ independent tests, each at $\\alpha = 0.05$?", 0.4013, 0.001),
  n(FW, "x4d-sidak10", 7, "What per-test $\\alpha$ gives FWER $0.05$ under Šidák with $m = 10$?", 0.005116, 0.0001),
  s(FW, "x4d-weak", 7.5, "Distinguish weak from strong FWER control.",
    "Weak control bounds the FWER only when all nulls are true; strong control bounds it under every configuration of true and false nulls.",
    "Strong control is what's needed for claims about individual hypotheses. Closed testing gives it; Fisher's LSD with more than three groups only controls it weakly."),
  n(FW, "x4d-hochberg", 8, "Hochberg's step-up procedure with p-values $0.02$, $0.03$ and $0.04$ ($m = 3$, $\\alpha = 0.05$). How many hypotheses are rejected?", 3),
  n(FW, "x4d-holm", 8.5, "Holm's procedure with the same p-values: how many are rejected?", 0),
  s(FW, "x4d-closed", 8.5, "Explain the closed testing principle.",
    "Reject $H_i$ only if every intersection hypothesis that includes $H_i$ is rejected by a level-$\\alpha$ test.",
    "This controls the FWER strongly for any choice of local tests; Holm's procedure is closed testing with Bonferroni local tests."),
  s(FW, "x4d-hoch-assume", 9, "Why does Hochberg's procedure need assumptions that Holm's doesn't?",
    "Hochberg relies on Simes' inequality, which holds under independence or positive regression dependence (PRDS) but can fail under some negative dependence.",
    "Holm uses only Bonferroni's inequality, valid under any dependence. Hochberg is more powerful when its assumptions hold."),
  n(FW, "x4d-pairs", 9, "How many pairwise comparisons are there among $6$ groups?", 15),
  n(FW, "x4d-pairs-alpha", 9.5, "What Bonferroni per-comparison $\\alpha$ gives FWER $0.05$ for all pairwise comparisons among $6$ groups?", 0.003333, 0.0001),
  s(FW, "x4d-fixed-seq", 9.5, "Explain fixed-sequence (hierarchical) testing in clinical trials.",
    "Hypotheses are ordered in advance; each is tested at the full $\\alpha$, but only if all earlier ones were rejected. This controls the FWER without splitting $\\alpha$.",
    "If an early hypothesis fails, later ones can't be claimed; graphical approaches (Bretz et al.) generalise this by passing on alpha from rejected hypotheses."),

  // --- false-discovery-rate ----------------------------------------------------------
  m(FD, "x4d-vs-fwer", 7, "Compared with FWER control at the same level, Benjamini–Hochberg:", "Is more powerful, tolerating a controlled proportion of false positives among discoveries",
    [["Is more conservative", "It's less conservative."], ["Controls the FWER too", "Only weakly (when all nulls are true)."], ["Needs independence to work at all", "It's valid under PRDS too."]]),
  n(FD, "x4d-bh", 7, "Benjamini–Hochberg with $m = 5$, $q = 0.05$ and sorted p-values $0.001$, $0.008$, $0.039$, $0.041$, $0.2$. How many are rejected?", 2),
  n(FD, "x4d-adj", 7.5, "Compute the BH-adjusted p-value of the smallest p-value in that list, $\\min_{k \\ge 1}mp_{(k)}/k$.", 0.005, 0.0002),
  n(FD, "x4d-storey", 8, "Storey's estimator: $1000$ tests, $400$ of which have $p > \\lambda = 0.5$. Compute $\\hat\\pi_0 = \\#\\lbrace p > \\lambda\\rbrace/(m(1 - \\lambda))$.", 0.8, 0.001),
  n(FD, "x4d-adaptive", 8.5, "Adaptive BH runs at level $q/\\hat\\pi_0$. Compute it for $q = 0.05$ and $\\hat\\pi_0 = 0.8$.", 0.0625, 0.0005),
  s(FD, "x4d-pi0", 8.5, "Why does BH actually control the FDR at $\\pi_0q$ rather than $q$?",
    "Under independence, the expected false discovery proportion of BH is exactly $(m_0/m)q = \\pi_0q$.",
    "When many hypotheses are non-null this is conservative; adaptive procedures estimate $\\pi_0$ and raise the level to recover power."),
  s(FD, "x4d-dependence", 9, "When is BH valid under dependence, and what can you do if it isn't?",
    "Benjamini & Yekutieli (2001) showed BH controls the FDR under positive regression dependence (PRDS), which covers many one-sided tests on positively correlated statistics.",
    "Under arbitrary dependence, the BY procedure uses level $q/\\sum_{i=1}^m1/i$, which is much more conservative."),
  n(FD, "x4d-by", 9, "Compute the BY correction factor $\\sum_{i=1}^{m}1/i$ for $m = 10$.", 2.929, 0.001),
  s(FD, "x4d-local", 9.5, "Distinguish the FDR (and q-values) from the local false discovery rate.",
    "The FDR is a tail-area quantity averaged over all rejected tests; a test's q-value is the smallest FDR at which it would be rejected. The local fdr, $\\pi_0f_0(z)/f(z)$, is the posterior probability that that particular test is null.",
    "Tests near the rejection boundary have a local fdr much higher than the FDR of the rejected set, so the local fdr is more relevant for decisions about individual findings (Efron's empirical Bayes)."),
  n(FD, "x4d-lfdr", 9.5, "Two-groups model: $\\pi_0 = 0.9$, and at the observed $z$, $f_0(z) = 0.05$ and $f_1(z) = 0.3$. Compute the local fdr.", 0.6, 0.001),

  // --- qq-plots ------------------------------------------------------------------------
  m(QQ, "x4d-heavy", 6, "In a normal QQ plot (sample quantiles against theoretical), points lie below the line at the left end and above it at the right end. The data have:", "Heavier tails than the normal",
    [["Lighter tails than the normal", "The reverse pattern."], ["Right skew only", "That bends up at both ends."], ["A perfect normal shape", "They'd follow the line."]]),
  m(QQ, "x4d-skew", 6.5, "The points form a convex curve, above the line at both ends and below it in the middle. The data are:", "Right-skewed",
    [["Left-skewed", "That gives a concave curve."], ["Heavy-tailed and symmetric", "That's an S-shape."], ["Uniform", "That's a flattened S-shape."]]),
  n(QQ, "x4d-pos", 7, "Using plotting positions $(i - 0.5)/n$, compute the position for $i = 3$ and $n = 10$.", 0.25, 0.001),
  n(QQ, "x4d-quant", 7, "What standard normal quantile corresponds to that position?", -0.6745, 0.001),
  s(QQ, "x4d-vs-test", 8, "Why is a QQ plot often more useful than a formal normality test such as Shapiro–Wilk?",
    "It shows how and where the data depart from normality (tails, skew, outliers), which tells you whether the departure matters for your analysis.",
    "Formal tests reject trivial departures with large $n$ and miss important ones with small $n$."),
  n(QQ, "x4d-slope", 8, "Normal data with mean $50$ and SD $10$: what is the slope of the reference line in a normal QQ plot?", 10),
  n(QQ, "x4d-int", 8.5, "What is its intercept?", 50),
  s(QQ, "x4d-gwas", 9, "How are QQ plots of p-values (on a $-\\log_{10}$ scale) used in genome-wide association studies?",
    "Observed $-\\log_{10}p$ values are plotted against those expected under uniformity. Departure along the whole range suggests systematic inflation (e.g. population stratification), while departure only in the extreme tail suggests true signals.",
    "The genomic inflation factor $\\lambda = \\text{median observed } \\chi^2_1/0.455$ quantifies the inflation."),
  n(QQ, "x4d-lambda", 9, "The median observed $\\chi^2_1$ statistic is $0.5$. Compute $\\lambda = 0.5/0.4549$.", 1.0991, 0.001),
  s(QQ, "x4d-envelope", 9.5, "Why do QQ plots of regression residuals tend to look more normal than the true errors, and how do simulation envelopes help?",
    "Residuals are linear combinations of all the errors, so by a CLT effect they look more normal than the errors (supernormality); they also have unequal variances because of leverage.",
    "Simulate many datasets from the fitted model, recompute (studentised) residuals, and plot pointwise envelopes; observed residuals outside the envelope indicate a real departure."),

  // --- permutation-test ---------------------------------------------------------------
  n(PM, "x4d-splits", 3, "In how many ways can $6$ observations be split into two labelled groups of $3$?", 20),
  n(PM, "x4d-minp", 4, "With that design, what is the smallest possible one-sided permutation p-value?", 0.05, 0.001),
  n(PM, "x4d-mc", 8, "With $B = 999$ random permutations, $24$ are at least as extreme as the observed statistic. Compute $p = (1 + 24)/(1 + 999)$.", 0.025, 0.0005),
  s(PM, "x4d-plus1", 8, "Why add $1$ to both the numerator and the denominator of a Monte Carlo permutation p-value?",
    "The observed labelling is itself one of the equally likely arrangements under the null, so counting it gives a valid (exact) p-value.",
    "It also ensures the p-value is never $0$, which would overstate the evidence."),
  m(PM, "x4d-exch", 8, "A permutation test of equal means relies on exchangeability, which fails when:", "The groups have different variances even though their means are equal",
    [["The data are non-normal", "Permutation tests don't need normality."], ["The samples are small", "They're exact in small samples."], ["The groups have equal sizes", "Irrelevant."]]),
  n(PM, "x4d-mcse", 8.5, "What is the Monte Carlo SE of a permutation p-value near $0.05$ estimated from $B = 1000$ permutations?", 0.006892, 0.0002),
  s(PM, "x4d-exact", 9, "In what sense is a permutation test exact, and for which null hypothesis?",
    "Under the null of exchangeability (identical distributions, or no treatment effect for any unit), every relabelling is equally likely, so the permutation distribution is the exact null distribution.",
    "For a weaker null such as “equal means” with unequal variances it isn't exact; a studentised statistic makes it asymptotically valid."),
  s(PM, "x4d-regression", 9, "How do you do a permutation test for one coefficient in a regression with other covariates (e.g. Freedman–Lane)?",
    "Permuting $y$ destroys its relationship with the nuisance covariates as well. Instead, fit the reduced model without the variable of interest, permute its residuals, add them back to its fitted values, and refit the full model.",
    "This keeps the nuisance structure intact; permuting the variable of interest is valid only if it's independent of the other covariates."),
  n(PM, "x4d-signflip", 9.5, "A paired sign-flip permutation test uses $n = 10$ pairs. How many sign assignments are there?", 1024),
  s(PM, "x4d-randomisation", 9.5, "Distinguish Fisher's randomisation inference from a permutation test justified by a model.",
    "Randomisation inference draws its null distribution from the actual random assignment in the experiment, under the sharp null that no unit's outcome is affected; it's valid by design.",
    "A model-based permutation test relies on assuming the observations are exchangeable under the null — reasonable for observational data only when that assumption holds."),

  // --- kruskal-wallis-test --------------------------------------------------------------
  n(KW, "x4d-df", 4, "What are the approximate degrees of freedom of a Kruskal–Wallis test with $3$ groups?", 2),
  n(KW, "x4d-meanrank", 4, "With $N = 12$ observations in total, what is the average of all ranks?", 6.5),
  n(KW, "x4d-H", 8, "$N = 9$, three groups of $3$ with rank sums $6$, $15$ and $24$. Compute $H = \\frac{12}{N(N + 1)}\\sum\\frac{R_i^2}{n_i} - 3(N + 1)$.", 7.2, 0.001),
  n(KW, "x4d-eps", 8.5, "Compute the effect size $\\varepsilon^2 = H/(N - 1)$ for that result.", 0.9, 0.001),
  s(KW, "x4d-posthoc", 8, "What post-hoc procedure should follow a significant Kruskal–Wallis test?",
    "Dunn's test: pairwise comparisons of mean ranks using the pooled ranking, with a multiplicity adjustment.",
    "Separate Mann–Whitney tests re-rank each pair and aren't consistent with the omnibus test; Conover–Iman is another option."),
  m(KW, "x4d-two", 8.5, "With two groups, the Kruskal–Wallis test is equivalent to:", "The Wilcoxon rank-sum test ($H = z^2$)",
    [["The sign test", "No."], ["The paired t-test", "No."], ["Fisher's exact test", "No."]]),
  s(KW, "x4d-medians", 9, "When is the Kruskal–Wallis test a test of medians?",
    "Only under a location-shift model, where all groups have the same shape and spread.",
    "Otherwise it tests whether mean ranks differ (stochastic dominance); groups with equal medians but different spreads or shapes can produce a significant result."),
  n(KW, "x4d-ties", 9, "The tie correction divides $H$ by $1 - \\sum(t^3 - t)/(N^3 - N)$. Compute the factor for $N = 10$ with one group of $3$ tied values.", 0.9758, 0.001),
  s(KW, "x4d-anova", 9.5, "Relate the Kruskal–Wallis statistic to one-way ANOVA on ranks.",
    "Without ties, $H = (N - 1)\\,SS_{\\text{between}}/SS_{\\text{total}}$ computed on the ranks, so it's a monotone function of the rank-ANOVA F-statistic.",
    "This is the rank-transform idea: replace data by ranks and apply the parametric procedure, using the permutation (or $\\chi^2$) null distribution."),
  n(KW, "x4d-anova-calc", 9.5, "Ranks $1$–$9$ in three groups have $SS_{\\text{between}} = 54$ and $SS_{\\text{total}} = 60$. Compute $H = (N - 1)SS_{\\text{between}}/SS_{\\text{total}}$.", 7.2, 0.001),

  // --- kolmogorov-smirnov-test -------------------------------------------------------------
  n(KS, "x4d-gap", 4, "$3$ of $10$ observations are at most $x$, and $F_0(x) = 0.5$. What is $|F_n(x) - F_0(x)|$?", 0.2, 0.001),
  m(KS, "x4d-two", 4, "The two-sample Kolmogorov–Smirnov test compares:", "The empirical CDFs of the two samples",
    [["The two means", "No."], ["The two variances", "No."], ["Rank sums", "That's Wilcoxon."]]),
  n(KS, "x4d-crit1", 8, "The asymptotic $5\\%$ critical value of the one-sample KS statistic is $1.358/\\sqrt{n}$. Compute it for $n = 100$.", 0.1358, 0.0005),
  n(KS, "x4d-crit2", 8, "For two samples it's $1.358\\sqrt{(n + m)/(nm)}$. Compute it for $n = m = 50$.", 0.2716, 0.001),
  s(KS, "x4d-lilliefors", 8, "Why is the KS test invalid when the reference distribution's parameters are estimated from the same data, and what fixes it?",
    "Estimating parameters pulls $F_0$ towards the data, so the statistic is stochastically smaller than its tabled null distribution and the test becomes very conservative.",
    "Use the Lilliefors test (critical values adjusted for estimation) or a parametric bootstrap of the statistic."),
  s(KS, "x4d-tails", 8.5, "Why is the KS test insensitive to differences in the tails, and which test does better?",
    "The ECDF's variance $F(1 - F)/n$ is largest in the middle, so the supremum is dominated by central deviations; tail discrepancies are small in absolute terms.",
    "The Anderson–Darling test weights squared deviations by $1/[F(1 - F)]$, making it more sensitive in the tails."),
  m(KS, "x4d-free", 8.5, "For a continuous $F_0$, the null distribution of the KS statistic is:", "Distribution-free — the same for every continuous $F_0$",
    [["Normal", "No."], ["Dependent on $F_0$'s shape", "Not for continuous $F_0$."], ["$\\chi^2$", "No."]]),
  n(KS, "x4d-calc", 9, "Test the sample $0.1$, $0.4$, $0.7$ against $\\mathrm{Uniform}(0, 1)$. Compute $D_n$.", 0.3, 0.001),
  s(KS, "x4d-discrete", 9, "Why isn't the standard KS test valid for discrete distributions?",
    "Its distribution-free property relies on $F_0$ being continuous (the probability integral transform); with a discrete $F_0$ or ties, the statistic is stochastically smaller.",
    "The standard test is then conservative; use discrete-KS critical values or simulate the null distribution."),
  s(KS, "x4d-bridge", 9.5, "Explain the limiting distribution of the KS statistic via the Brownian bridge.",
    "$\\sqrt{n}(F_n - F)$ converges to $B(F(x))$, where $B$ is a Brownian bridge, so $\\sqrt{n}D_n \\to \\sup_t|B(t)|$.",
    "That supremum has the Kolmogorov distribution $P(K \\le x) = 1 - 2\\sum_{k \\ge 1}(-1)^{k-1}e^{-2k^2x^2}$, whose $95\\%$ point is $1.358$."),

  // --- wilcoxon-signed-rank-test ------------------------------------------------------------
  n(SR, "x4d-wplus", 4, "Differences are $3, -1, 4, -2, 5$. Compute $W^+$, the sum of the ranks of the positive differences.", 12),
  n(SR, "x4d-ew", 4, "What is $\\mathbb{E}[W^+]$ under $H_0$ when $n = 5$?", 7.5),
  m(SR, "x4d-zeros", 4, "In Wilcoxon's original method, zero differences are:", "Dropped, reducing $n$",
    [["Ranked as the largest", "No."], ["Counted as positive", "No."], ["Counted as negative", "No."]]),
  n(SR, "x4d-var", 8, "Compute $\\mathrm{Var}(W^+) = n(n + 1)(2n + 1)/24$ for $n = 20$.", 717.5, 0.001),
  n(SR, "x4d-z", 8, "Compute the normal-approximation $z$ for $W^+ = 150$ with $n = 20$.", 1.68, 0.002),
  n(SR, "x4d-exact", 8.5, "With $n = 5$ and all differences positive ($W^+ = 15$), what is the exact one-sided p-value?", 0.03125, 0.0005),
  s(SR, "x4d-symmetry", 8.5, "What does the signed-rank test assume, and when does that assumption matter?",
    "Under $H_0$ the differences are assumed symmetric about zero, so it tests the centre of symmetry (the pseudo-median).",
    "With skewed differences it isn't a test of the median; the sign test needs no symmetry assumption."),
  s(SR, "x4d-vs-sign", 9, "Compare the signed-rank test with the sign test.",
    "The sign test uses only the signs (a binomial test), while the signed-rank test also uses the ranks of the magnitudes, making it more powerful (ARE $0.955$ vs the t-test under normality, against $0.637$ for the sign test).",
    "The sign test is more robust: it needs no symmetry and is unaffected by how large the differences are."),
  n(SR, "x4d-hl", 9, "Compute the Hodges–Lehmann estimate (the median of the Walsh averages $(x_i + x_j)/2$, $i \\le j$) for data $1$, $2$, $6$.", 2.75, 0.001),
  s(SR, "x4d-transform", 9.5, "Why can the signed-rank test give different answers on raw paired values and on log-transformed ones, and what does that say about choosing a scale?",
    "Transforming the measurements changes the differences' relative sizes and their symmetry, so the ranks of $|d|$ can change; the test is invariant only to transformations that preserve the ranks of the differences.",
    "Only the sign test is invariant to monotone transformations. Choose the scale on which symmetric differences are plausible (often logs for ratio-scale data)."),

  // --- mcnemar-test ------------------------------------------------------------------------
  n(MC, "x4d-chi", 3, "Paired binary outcomes with $b = 15$ discordant pairs one way and $c = 5$ the other. Compute McNemar's $\\chi^2$ without continuity correction.", 5),
  m(MC, "x4d-uses", 4, "McNemar's test uses:", "Only the discordant pairs",
    [["All four cells", "Concordant pairs are ignored."], ["Only concordant pairs", "No."], ["The marginal totals only", "Through the discordant cells."]]),
  n(MC, "x4d-cc", 4, "Compute McNemar's $\\chi^2$ with continuity correction for the same data, $(|b - c| - 1)^2/(b + c)$.", 4.05, 0.001),
  n(MC, "x4d-exact", 8, "Exact McNemar test with $b = 8$ and $c = 1$: compute the two-sided binomial p-value $2P(X \\le 1)$ for $X \\sim \\mathrm{Bin}(9, 0.5)$.", 0.03906, 0.0005),
  n(MC, "x4d-diff", 8, "With $N = 100$ pairs, $b = 15$ and $c = 5$, estimate the difference in marginal proportions.", 0.1, 0.001),
  s(MC, "x4d-why", 8.5, "Why can McNemar's test ignore the concordant pairs?",
    "Concordant pairs contribute equally to both marginal proportions, so they carry no information about the difference between them.",
    "Conditional on $b + c$ discordant pairs, $b \\sim \\mathrm{Bin}(b + c, \\tfrac12)$ under $H_0$ — the test is a sign test on the discordant pairs."),
  n(MC, "x4d-se", 8.5, "Compute the SE of the difference in paired proportions, $\\sqrt{b + c - (b - c)^2/N}/N$, for $N = 100$, $b = 15$ and $c = 5$.", 0.04359, 0.0002),
  s(MC, "x4d-cor", 9, "What does $b/c$ estimate in a matched-pairs study?",
    "In matched case–control or paired designs, $b/c$ is the conditional (within-pair) odds ratio.",
    "Conditional logistic regression generalises this to covariates; the conditional OR generally differs from the marginal (population-averaged) OR."),
  n(MC, "x4d-or", 9, "Compute the conditional odds ratio estimate $b/c$ for $b = 15$ and $c = 5$.", 3),
  s(MC, "x4d-ext", 9.5, "How do Cochran's Q test and the Stuart–Maxwell test extend McNemar's test?",
    "Cochran's Q tests whether $k \\ge 2$ related binary measurements (e.g. several raters or time points) have equal success probabilities; with $k = 2$ it reduces to McNemar's test.",
    "Stuart–Maxwell (or Bhapkar's test) checks marginal homogeneity of a $k \\times k$ paired table with more than two categories."),
];
