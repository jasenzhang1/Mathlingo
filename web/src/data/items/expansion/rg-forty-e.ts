import type { Item } from "../../../lib/assessment/types";
import { makeBuilders } from "../authoring";
import { EXPANSION } from "./source";

/** Regression 40-pass (part E): smoothing splines, ANOVA designs, ANCOVA, blocking, sandwich SEs. */
const { mcq, short, num } = makeBuilders(EXPANSION);

const s = (concept: string, slug: string, level: number, stem: string, a: string, b: string) =>
  short({ concept, slug, cognitive: level >= 8.5 ? "transfer" : "explain", level, seconds: level >= 9 ? 300 : 200, stem },
    [["main", a, 5, true], ["detail", b, 4, true]]);
const n = (concept: string, slug: string, level: number, stem: string, key: number, tol = 0.01) =>
  num({ concept, slug, cognitive: "apply", level, seconds: level >= 7 ? 90 : 25, stem }, key, tol);
const m = (concept: string, slug: string, level: number, stem: string, right: string, wrong: [string, string][]) =>
  mcq({ concept, slug, cognitive: level <= 3 ? "recall" : "apply", level, seconds: 25, stem },
    right, wrong.map(([t, why], i) => [t, `${concept}-${slug}-${i}`, why] as [string, string, string]));

const SS = "smoothing-splines";
const OW = "one-way-anova-model";
const TK = "multiple-comparisons-tukey";
const TW = "two-way-anova-balanced";
const AC = "analysis-of-covariance";
const TU = "two-way-anova-unbalanced";
const TN = "tukey-nonadditivity-test";
const HW = "higher-way-anova";
const RB = "randomized-block-designs";
const SW = "sandwich-estimator";

export const rgFortyEItems: Item[] = [
  // --- smoothing-splines ---------------------------------------------------------------
  m(SS, "x4r-inf", 5, "A smoothing spline minimises $\\sum(y_i - f(x_i))^2 + \\lambda\\int f''^2$. As $\\lambda \\to \\infty$, the fit becomes:", "The least squares straight line",
    [["The sample mean", "Lines have $f'' = 0$, so they're unpenalised."], ["An interpolating curve", "That's $\\lambda \\to 0$."], ["A step function", "No."]]),
  m(SS, "x4r-zero", 6.5, "As $\\lambda \\to 0$ (with distinct $x$ values), the smoothing spline becomes:", "A spline interpolating every data point",
    [["The least squares line", "That's $\\lambda \\to \\infty$."], ["The mean", "No."], ["Undefined", "It tends to the interpolating spline."]]),
  n(SS, "x4r-df-lin", 7, "What are the effective degrees of freedom $\\mathrm{tr}(S_\\lambda)$ in the straight-line limit?", 2),
  n(SS, "x4r-df-interp", 7.5, "What are the effective degrees of freedom in the interpolating limit with $n = 50$ distinct $x$ values?", 50),
  s(SS, "x4r-natural", 8, "Why is the minimiser of the smoothing-spline criterion a natural cubic spline with knots at the data points?",
    "Given any candidate $f$, the natural cubic spline interpolating $f(x_i)$ has the same fitted values but no larger $\\int f''^2$ (it's the smoothest interpolant).",
    "So the infinite-dimensional problem reduces to a finite one: a natural cubic spline with knots at the unique $x_i$, whose coefficients solve a penalised least squares problem."),
  n(SS, "x4r-gcv", 8, "Compute $\\mathrm{GCV} = n\\,\\mathrm{RSS}/(n - \\mathrm{tr}S)^2$ for $n = 100$, $\\mathrm{RSS} = 45$ and $\\mathrm{tr}S = 10$.", 0.5556, 0.001),
  s(SS, "x4r-bayes", 8.5, "Give a Bayesian interpretation of the smoothing spline.",
    "The penalty $\\lambda\\int f''^2$ corresponds to a Gaussian-process prior on $f$ (an integrated Wiener process) with a flat prior on the linear part.",
    "The spline is the posterior mean, $\\lambda$ is the ratio of noise to prior variance, and the posterior gives (Wahba's) credible bands."),
  n(SS, "x4r-shrink", 9, "The smoother shrinks eigencomponent $k$ by $1/(1 + \\lambda d_k)$. Compute this factor for $d_k = 4$ and $\\lambda = 0.5$.", 0.3333, 0.001),
  s(SS, "x4r-demmler", 9, "Explain the Demmler–Reinsch basis and the shrinkage view of smoothing splines.",
    "The smoother matrix has eigenvectors (the Demmler–Reinsch basis) ordered by increasing wiggliness, with eigenvalues $1/(1 + \\lambda d_k)$.",
    "Constant and linear components pass through unchanged ($d_k = 0$), while wiggly components are shrunk strongly — like ridge regression in that basis."),
  s(SS, "x4r-compare", 9.5, "Compare smoothing splines, regression splines and P-splines.",
    "Smoothing splines put a knot at every data point and control smoothness with $\\lambda$; regression splines use a few knots with no penalty, so the knots control smoothness.",
    "P-splines use a moderately rich B-spline basis with a difference penalty on the coefficients — nearly as flexible as smoothing splines but much cheaper for large $n$ (the basis of many GAM implementations)."),

  // --- one-way-anova-model -------------------------------------------------------------
  n(OW, "x4r-cellmeans", 5, "The cell-means model $y_{ij} = \\mu_i + \\varepsilon_{ij}$ with $k = 4$ groups has how many mean parameters?", 4),
  n(OW, "x4r-effect", 6.5, "Group means are $3$, $5$, $7$ and $9$ (equal sizes). Under the sum-to-zero constraint, what is $\\alpha_4$?", 3),
  n(OW, "x4r-grand", 7, "Two groups with $n = 2$ and $n = 8$ have means $10$ and $20$. Compute the weighted grand mean.", 18),
  n(OW, "x4r-df", 7.5, "With $N = 24$ observations in $k = 4$ groups, how many within-group degrees of freedom are there?", 20),
  s(OW, "x4r-fixed-random", 8, "Distinguish the fixed-effects and random-effects one-way models.",
    "Fixed effects: the groups are the levels of interest and $\\alpha_i$ are unknown constants; we compare these specific means.",
    "Random effects: groups are a sample from a population, $a_i \\sim N(0, \\sigma_a^2)$, and interest is in the variance component $\\sigma_a^2$ and generalising to other groups."),
  n(OW, "x4r-sigma-a", 8, "Random effects with $n = 5$ per group: $MS_B = 30$ and $MS_W = 10$. Using $\\mathbb{E}[MS_B] = \\sigma^2 + n\\sigma_a^2$, estimate $\\sigma_a^2$.", 4),
  n(OW, "x4r-icc", 8.5, "Estimate the intraclass correlation $\\sigma_a^2/(\\sigma_a^2 + \\sigma^2)$ from the same data.", 0.2857, 0.001),
  s(OW, "x4r-negative", 8.5, "Why can the ANOVA estimate of $\\sigma_a^2$ be negative, and what should be done?",
    "$\\hat\\sigma_a^2 = (MS_B - MS_W)/n$ is negative whenever $MS_B < MS_W$, which happens often by chance when $\\sigma_a^2$ is small.",
    "Truncating at zero biases it; REML (which respects the boundary) or Bayesian estimation are preferred, and a negative estimate is itself evidence that $\\sigma_a^2$ is small."),
  n(OW, "x4r-ncp", 9, "$k = 3$ groups of $n = 10$ with effects $(-1, 0, 1)$ and $\\sigma = 2$. Compute $\\lambda = n\\sum\\alpha_i^2/\\sigma^2$.", 5),
  s(OW, "x4r-assumptions", 9.5, "State the assumptions of the one-way model and how robust the F-test is to each.",
    "Independence, normality and equal variances. Independence is critical — violations badly distort the error rate.",
    "Non-normality matters little for moderate $n$ (the F-test is fairly robust); unequal variances matter a lot when group sizes are unequal (use Welch's test)."),

  // --- multiple-comparisons-tukey -----------------------------------------------------
  n(TK, "x4r-pairs", 5, "How many pairwise comparisons are there among $5$ means?", 10),
  n(TK, "x4r-hsd", 6.5, "Compute Tukey's HSD $q\\sqrt{MS_W/n}$ with $q = 3.5$, $MS_W = 8$ and $n = 8$.", 3.5, 0.001),
  n(TK, "x4r-diff", 7, "Two means are $12$ and $16.2$. What is their difference (compare it with an HSD of $3.5$)?", 4.2, 0.001),
  n(TK, "x4r-kramer", 7.5, "Tukey–Kramer uses $\\sqrt{\\frac{MS_W}{2}(\\frac1{n_1} + \\frac1{n_2})}$. Compute it with $MS_W = 8$, $n_1 = 4$ and $n_2 = 8$.", 1.2247, 0.001),
  s(TK, "x4r-range", 8, "Why does Tukey's method use the studentised range distribution?",
    "All pairwise differences are covered simultaneously exactly when the largest one, $\\max\\bar{y} - \\min\\bar{y}$, is covered.",
    "The distribution of that range divided by its estimated standard error is the studentised range $q$, so its quantile gives exact simultaneous coverage in balanced designs."),
  n(TK, "x4r-bonf", 8, "What Bonferroni per-comparison $\\alpha$ controls the family-wise rate at $0.05$ for $10$ pairwise comparisons?", 0.005, 0.0002),
  s(TK, "x4r-compare", 8.5, "Compare Tukey, Bonferroni and Scheffé for pairwise comparisons.",
    "For all pairwise comparisons, Tukey is exact (balanced) and gives the shortest intervals.",
    "Bonferroni is competitive for a few planned comparisons; Scheffé covers all contrasts and is the most conservative for pairwise differences alone."),
  n(TK, "x4r-dunnett", 9, "Dunnett's procedure compares each treatment with a control. With $5$ groups including the control, how many comparisons?", 4),
  s(TK, "x4r-dunnett-why", 9, "When is Dunnett's procedure preferable to Tukey's?",
    "When the only comparisons of interest are each treatment against a control.",
    "It accounts for the correlation among those comparisons (they share the control mean), giving shorter intervals than Tukey or Bonferroni for that family."),
  s(TK, "x4r-exact", 9.5, "Why is Tukey's method exact in balanced one-way designs, but only approximately valid (conservative) for Tukey–Kramer?",
    "With equal $n$, all pairwise differences share one standard error, so simultaneous coverage is equivalent to covering the range, whose distribution is known exactly.",
    "With unequal $n$ the standard errors differ; the Tukey–Kramer adjustment was proven conservative (Hayter), so its family-wise error rate is at most $\\alpha$."),

  // --- two-way-anova-balanced ----------------------------------------------------------
  n(TW, "x4r-N", 5, "A balanced two-way design has $a = 3$, $b = 4$ and $n = 2$ per cell. What is $N$?", 24),
  n(TW, "x4r-df-ab", 6.5, "How many degrees of freedom does the interaction have?", 6),
  n(TW, "x4r-df-e", 7, "How many error degrees of freedom are there?", 12),
  n(TW, "x4r-int-contrast", 7.5, "Cell means: $A_1B_1 = 10$, $A_1B_2 = 14$, $A_2B_1 = 12$, $A_2B_2 = 16$. Compute the interaction contrast $10 - 14 - 12 + 16$.", 0),
  s(TW, "x4r-interaction", 8, "What does an interaction mean, and why can main effects mislead when it's present?",
    "An interaction means the effect of one factor depends on the level of the other (non-parallel profiles).",
    "Main effects then average over levels of the other factor and may describe no actual condition — e.g. a treatment helping in one group and harming another can show zero main effect. Examine simple effects instead."),
  n(TW, "x4r-alpha", 8, "Row means are $12$ and $14$ with grand mean $13$. What is the row effect $\\alpha_1$?", -1),
  s(TW, "x4r-orthogonal", 8.5, "Why does a balanced design give an orthogonal sum-of-squares decomposition?",
    "With equal cell sizes the columns for A, B and AB (in contrast coding) are orthogonal, so their projections are orthogonal and the SS add up to the total.",
    "The SS don't depend on the order of fitting, and Types I, II and III coincide."),
  n(TW, "x4r-ems", 9, "Compute $\\mathbb{E}[MS_A] = \\sigma^2 + bn\\sum\\alpha_i^2/(a - 1)$ for $b = 4$, $n = 2$, $\\alpha = (-1, 1)$ and $\\sigma^2 = 3$.", 19),
  s(TW, "x4r-mixed", 9, "In a two-way design with A fixed and B random, what is the correct denominator for testing A?",
    "$\\mathbb{E}[MS_A] = \\sigma^2 + n\\sigma_{AB}^2 + bn\\sum\\alpha_i^2/(a - 1)$ contains the interaction variance, so the right comparison is $MS_A/MS_{AB}$, not $MS_A/MS_E$.",
    "Using $MS_E$ ignores the variability from sampling levels of B and overstates significance; B and AB are tested against $MS_E$ (under the unrestricted model)."),
  s(TW, "x4r-unreplicated", 9.5, "Why can't interaction be tested with one observation per cell, and what can be done?",
    "The interaction degrees of freedom are exactly the residual degrees of freedom, so there's no independent estimate of error to test against.",
    "Assume additivity and use the interaction mean square as error, or use Tukey's $1$-df test for a multiplicative interaction."),

  // --- analysis-of-covariance ----------------------------------------------------------
  n(AC, "x4r-adj1", 5, "ANCOVA adjusted mean: $\\bar{y}_i - b(\\bar{x}_i - \\bar{x})$. Compute it for $\\bar{y}_i = 20$, $b = 2$ and $\\bar{x}_i - \\bar{x} = 1.5$.", 17),
  n(AC, "x4r-adj2", 6.5, "Another group has $\\bar{y} = 18$ and $\\bar{x}_i - \\bar{x} = -1$. Compute its adjusted mean.", 20),
  n(AC, "x4r-diff", 7, "What is the adjusted difference (second group minus first)?", 3),
  n(AC, "x4r-resvar", 7.5, "Adjusting for a covariate with correlation $0.6$ multiplies the residual variance by $1 - \\rho^2$. Compute the factor.", 0.64, 0.001),
  s(AC, "x4r-purpose", 8, "What is the purpose of ANCOVA in a randomised trial?",
    "Adjusting for a prognostic baseline covariate removes outcome variance it explains, increasing precision and power.",
    "Randomisation ensures the adjustment doesn't bias the treatment effect (it also corrects chance imbalances); pre-specify the covariates."),
  n(AC, "x4r-gain", 8, "What is the corresponding efficiency gain $1/(1 - \\rho^2)$ for $\\rho = 0.6$?", 1.5625, 0.001),
  s(AC, "x4r-slopes", 8.5, "What is the homogeneity-of-slopes assumption, and what if it fails?",
    "Standard ANCOVA assumes the outcome–covariate slope is the same in all groups, so the treatment effect is the same at every covariate value.",
    "If slopes differ, the effect depends on the covariate; include a treatment × covariate interaction and report effects at chosen covariate values."),
  n(AC, "x4r-change", 9, "Variance of the change-score analysis relative to ANCOVA is $2(1 - \\rho)/(1 - \\rho^2)$. Compute it for $\\rho = 0.5$.", 1.3333, 0.001),
  s(AC, "x4r-lord", 9, "Why is ANCOVA in observational comparisons tricky? Explain Lord's paradox.",
    "With non-randomised groups differing at baseline, change-score analysis and ANCOVA can give opposite conclusions from the same data.",
    "They answer different causal questions and make different untestable assumptions (ANCOVA assumes adjustment for the covariate removes confounding; change scores assume parallel trends); neither is automatically right."),
  s(AC, "x4r-post-treatment", 9.5, "Why must an ANCOVA covariate not be affected by the treatment?",
    "If the treatment changes the covariate, adjusting for it removes part of the treatment effect (the part working through the covariate) or induces bias.",
    "So covariates should be measured before randomisation or be unaffected by treatment by design."),

  // --- two-way-anova-unbalanced ------------------------------------------------------
  m(TU, "x4r-order", 5, "In an unbalanced two-way design, the sums of squares:", "Depend on the order in which terms are fitted (Types I, II and III differ)",
    [["Are the same as in the balanced case", "Not with unequal cell sizes."], ["Can't be computed", "They can."], ["Always sum to the total", "Only sequential (Type I) SS do."]]),
  n(TU, "x4r-typeI", 6.5, "Are the Type I sums of squares for A-then-B and B-then-A generally equal in an unbalanced design? Answer $1$ for yes, $0$ for no.", 0),
  n(TU, "x4r-N", 7, "Cell counts are $2, 4$ in row 1 and $6, 8$ in row 2. What is $N$?", 20),
  n(TU, "x4r-weighted", 7.5, "Row 1 has cell means $10$ and $20$ with counts $2$ and $4$. Compute the weighted row mean.", 16.667, 0.001),
  s(TU, "x4r-types", 8, "Distinguish Type I, II and III sums of squares.",
    "Type I: sequential, each term adjusted for those before it. Type II: each term adjusted for all others not containing it (main effects adjusted for each other, not the interaction).",
    "Type III: each term adjusted for all others including interactions — tests of unweighted marginal means (needs sum-to-zero coding). They coincide in balanced designs."),
  n(TU, "x4r-unweighted", 8, "Compute the unweighted row mean $(10 + 20)/2$.", 15),
  s(TU, "x4r-lsmeans", 8.5, "Why do weighted and unweighted marginal means differ in unbalanced designs, and which should be reported?",
    "Weighted means reflect the sample's cell sizes, so they mix row effects with the column composition of each row.",
    "Least-squares (estimated marginal) means average cell means equally, comparing rows under a balanced column composition — usually what's wanted in experiments; weighted means suit representative samples."),
  n(TU, "x4r-empty", 9, "A $3 \\times 3$ layout has one empty cell. How many interaction degrees of freedom remain?", 3),
  s(TU, "x4r-missing", 9, "Why do empty cells break Type III hypotheses?",
    "Type III tests compare unweighted averages of cell means, which require every cell mean to be estimable.",
    "With an empty cell those averages don't exist; software silently tests some other hypothesis. Define explicitly the estimable contrasts of interest instead."),
  s(TU, "x4r-simpson", 9.5, "How can unbalanced two-way designs produce Simpson's-paradox effects?",
    "If the levels of B are distributed very differently across the levels of A, a comparison of A's weighted marginal means can reverse the comparison within every level of B.",
    "Adjusting for B (Type II/III or LS means) gives the within-B comparison; which is appropriate depends on whether B is a confounder or part of the effect."),

  // --- tukey-nonadditivity-test -----------------------------------------------------------
  n(TN, "x4r-df", 5, "How many degrees of freedom does Tukey's test for nonadditivity use?", 1),
  n(TN, "x4r-res", 6.5, "An unreplicated $4 \\times 5$ two-way layout with an additive model: how many residual degrees of freedom?", 12),
  n(TN, "x4r-res-after", 7, "After removing Tukey's $1$-df term, how many residual degrees of freedom remain?", 11),
  n(TN, "x4r-F", 7.5, "Compute $F = SS_N/(SS_{res}/11)$ with $SS_N = 4$ and $SS_{res} = 22$ (after removal).", 2),
  s(TN, "x4r-detects", 8, "What kind of interaction does Tukey's test detect?",
    "A multiplicative interaction of the form $D\\alpha_i\\beta_j$ — the interaction is proportional to the product of row and column effects.",
    "It uses one degree of freedom from the residual; the test statistic is based on $\\sum\\sum y_{ij}\\hat\\alpha_i\\hat\\beta_j$."),
  n(TN, "x4r-term", 8, "With $D = 0.5$, $\\alpha_1 = 2$ and $\\beta_1 = -1$, what is the interaction term $D\\alpha_1\\beta_1$ in cell $(1, 1)$?", -1),
  s(TN, "x4r-boxcox", 8.5, "How does Tukey's test relate to choosing a transformation?",
    "Multiplicative interaction often means additivity would hold on another scale.",
    "Tukey suggested transforming to the power $1 - D\\hat\\mu$ (with $\\hat\\mu$ the grand mean); a significant test points to a power transformation, similar in spirit to Box–Cox."),
  n(TN, "x4r-power", 9, "Compute the suggested power $1 - D\\hat\\mu$ for $D = 0.02$ and $\\hat\\mu = 25$.", 0.5, 0.001),
  s(TN, "x4r-why-useful", 9, "Why is Tukey's test useful for unreplicated designs?",
    "With one observation per cell the full interaction can't be tested, so the additivity assumption is usually taken on faith.",
    "Tukey's test spends one of the residual degrees of freedom on a plausible, specific kind of interaction, leaving the rest to estimate error — a check that's otherwise unavailable."),
  s(TN, "x4r-limits", 9.5, "What are the limitations of Tukey's nonadditivity test?",
    "It has power only against interactions resembling the multiplicative form $\\alpha_i\\beta_j$; other patterns (e.g. one aberrant cell or crossing effects unrelated to the main effects) can go undetected.",
    "A non-significant result doesn't establish additivity; more general tests (Mandel's, Johnson–Graybill) cover wider classes."),

  // --- higher-way-anova -------------------------------------------------------------
  n(HW, "x4r-cells", 5, "How many cells does a $2 \\times 3 \\times 4$ factorial have?", 24),
  n(HW, "x4r-df-abc", 6.5, "How many degrees of freedom does the $ABC$ interaction have in that design?", 6),
  n(HW, "x4r-terms", 7, "How many interaction terms (of all orders) does a three-factor model have?", 4),
  n(HW, "x4r-effects", 7.5, "How many effects (excluding the mean) does a $2^5$ factorial have?", 31),
  s(HW, "x4r-three-way", 8, "How should a three-way interaction be interpreted?",
    "The $AB$ interaction itself differs across levels of $C$: the way two factors combine depends on the third.",
    "Interpret it by plotting the $A \\times B$ profiles separately for each level of $C$; lower-order effects then have limited meaning on their own."),
  n(HW, "x4r-half", 8, "How many runs does the half-fraction $2^{5-1}$ design use?", 16),
  s(HW, "x4r-alias", 8.5, "What is aliasing in fractional factorial designs?",
    "Running only a fraction of the combinations makes some effects indistinguishable: their contrast columns are identical (aliased), given by the defining relation.",
    "E.g. with $I = ABCDE$, each main effect is aliased with a four-factor interaction and each two-factor interaction with a three-factor one."),
  n(HW, "x4r-resolution", 9, "What is the resolution of the $2^{5-1}$ design with defining relation $I = ABCDE$?", 5),
  s(HW, "x4r-sparsity", 9, "Explain the effect-sparsity and hierarchy principles.",
    "Sparsity: only a few effects are active. Hierarchy: main effects are likelier to matter than two-factor interactions, which are likelier than higher-order ones.",
    "Together they justify fractional factorials and screening designs that sacrifice high-order interactions."),
  s(HW, "x4r-pooling", 9.5, "Explain pooling high-order interactions into error, and its risks.",
    "In unreplicated factorials, higher-order interactions assumed negligible are used to estimate $\\sigma^2$.",
    "If some are real, the error estimate is inflated and power drops; choosing what to pool after seeing the data biases tests. Half-normal plots or Lenth's method are safer alternatives."),

  // --- randomized-block-designs ------------------------------------------------------
  n(RB, "x4r-N", 5, "A randomised complete block design has $4$ treatments and $5$ blocks. What is $N$?", 20),
  n(RB, "x4r-dfe", 6.5, "How many error degrees of freedom does it have?", 12),
  n(RB, "x4r-re", 7, "Relative efficiency: the equivalent CRD error mean square is $15$ and the RCBD's is $10$. Compute it.", 1.5, 0.001),
  n(RB, "x4r-dfb", 7.5, "How many degrees of freedom do the blocks have?", 4),
  s(RB, "x4r-why", 8, "Why block?",
    "Grouping similar units into blocks and randomising treatments within them removes between-block variability from the error term.",
    "Treatment comparisons are made within blocks, so they're more precise when blocks are homogeneous and differ from each other."),
  n(RB, "x4r-latin", 8, "How many error degrees of freedom does a $5 \\times 5$ Latin square have, $(n - 1)(n - 2)$?", 12),
  s(RB, "x4r-additivity", 8.5, "What assumption about block × treatment interaction does an RCBD make?",
    "With one unit per treatment per block, the model assumes additivity: treatment effects are the same in every block, and the interaction serves as error.",
    "If treatment effects vary across blocks, the analysis estimates an average effect with a larger error; Tukey's test can check for multiplicative interaction."),
  n(RB, "x4r-bibd", 9, "A balanced incomplete block design has $t = 7$, $k = 3$, $b = 7$ and $r = 3$. Compute $\\lambda = r(k - 1)/(t - 1)$.", 1),
  s(RB, "x4r-hurts", 9, "When can blocking hurt?",
    "Blocks use degrees of freedom; if they aren't more homogeneous within than between, the error variance isn't reduced and the lost degrees of freedom cost power.",
    "Blocking on an irrelevant variable is a small loss when $n$ is large but can matter in small experiments."),
  s(RB, "x4r-interblock", 9.5, "What is recovery of interblock information in incomplete block designs?",
    "In incomplete block designs, block totals carry some information about treatment differences, because blocks contain different sets of treatments.",
    "Treating blocks as random effects combines the intrablock estimate with this interblock estimate, weighted by their precisions (REML/mixed models), which improves efficiency."),

  // --- sandwich-estimator (9) -------------------------------------------------------------
  n(SW, "x4r-scalar", 5, "Scalar sandwich $\\frac{\\sum x_i^2e_i^2}{(\\sum x_i^2)^2}$: compute it with $X^\\top X = 10$ and $\\sum x_i^2e_i^2 = 40$.", 0.4, 0.001),
  n(SW, "x4r-classical", 6.5, "The classical variance is $s^2/X^\\top X$. Compute it with $s^2 = 3$ and $X^\\top X = 10$.", 0.3, 0.001),
  n(SW, "x4r-hc1", 8.5, "HC1 multiplies HC0 by $n/(n - p)$. Compute this factor for $n = 50$ and $p = 5$.", 1.1111, 0.001),
  s(SW, "x4r-consistent", 8.5, "Why is the sandwich variance estimator consistent without a model for the error variance?",
    "The true covariance is $(X^\\top X)^{-1}X^\\top\\Omega X(X^\\top X)^{-1}$; the “meat” $X^\\top\\Omega X = \\sum\\sigma_i^2x_ix_i^\\top$ is estimated by $\\sum e_i^2x_ix_i^\\top$.",
    "Individual $e_i^2$ are poor estimates of $\\sigma_i^2$, but their weighted average converges, so the sum is consistent (White, 1980)."),
  n(SW, "x4r-cluster", 9, "Cluster-robust SEs often use the factor $G/(G - 1)$. Compute it for $G = 10$ clusters.", 1.1111, 0.001),
  s(SW, "x4r-clusters", 9, "Why do cluster-robust standard errors need many clusters?",
    "The meat is a sum over clusters, so its precision depends on the number of clusters $G$, not the number of observations.",
    "With few clusters the SEs are biased downwards and t-tests over-reject; use small-sample corrections, t critical values with $G - 1$ df, or the wild cluster bootstrap."),
  s(SW, "x4r-hc3", 9, "Why is HC3 preferred to HC0 in small samples?",
    "OLS residuals are too small on average, especially at high-leverage points ($\\mathrm{Var}(e_i) = \\sigma^2(1 - h_{ii})$), so HC0 underestimates the variance.",
    "HC3 inflates each squared residual by $1/(1 - h_{ii})^2$, approximating a jackknife; simulations show much better test sizes in small samples."),
  n(SW, "x4r-hc3-calc", 9, "Compute the HC3 term $e_i^2/(1 - h_{ii})^2$ for $e_i = 1$ and $h_{ii} = 0.5$.", 4),
  s(SW, "x4r-misspec", 9.5, "Under model misspecification, what does the sandwich estimator estimate?",
    "The estimator converges to the pseudo-true parameter (e.g. the best linear approximation, or the KL-closest model), and the sandwich gives the correct variance of that estimator.",
    "So inference is valid for the pseudo-true value, not the unknown true mean function; robust SEs fix variance problems, not bias from a wrong mean model."),
];
