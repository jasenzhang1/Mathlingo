import type { Item } from "../../../lib/assessment/types";
import { chapter } from "./shared";

/**
 * Ding Parts I–III (Ch. 1–9): motivations, univariate and multivariate OLS,
 * Gauss–Markov, the Normal linear model, EHW standard errors, the FWL theorem
 * and its applications, and Cochran's formula.
 */

const REG = "regression";
const RTM = "regress-to-the-mean";
const SLR = "simple-linear-regression";
const OLS = "ordinary-least-squares";
const HAT = "hat-matrix";
const OLSP = "ols-properties";
const LRP = "linear-regression-probabilistic-version";
const GLH = "general-linear-hypothesis";
const SW = "sandwich-estimator";
const PR = "partitioned-regression";
const CS = "centering-and-scaling";
const MB = "misspecification-bias";

// --- Ch. 1 · Motivations for Statistical Models --------------------------------
const c1 = chapter("Ch. 1, Motivations for Statistical Models");
const ch1: Item[] = [
  c1.m(REG, "ding-linear-in-parameters", 1, "In the phrase “linear model”, the word “linear” means linear in:",
    "The parameters $\\boldsymbol{\\beta}$", [
      ["The covariates $x$", "Polynomials, logs and splines of $x$ are allowed; only the coefficients must enter linearly."],
      ["The error distribution", "Linearity says nothing about the shape of the errors."],
      ["Time", "It is not a time-series notion."],
    ]),
  c1.m(RTM, "ding-why-regression", 2, "Galton called the fitted relationship “regression” because, when $|\\hat{\\rho}_{xy}| < 1$:",
    "A child’s predicted deviation from the mean, in standard deviations, is smaller than the parents’", [
      ["Children are on average shorter than their parents", "The mean height need not change; it is the standardised deviation that shrinks."],
      ["The slope is always negative", "Galton’s slope was positive ($0.64$); it is less than the ratio of SDs, not negative."],
      ["Least squares regresses the residuals to zero", "Residuals summing to zero is a different fact about OLS."],
    ]),
  c1.n(RTM, "ding-galton-standardised", 3,
    "Galton’s formula reads $\\frac{\\hat{y} - \\bar{y}}{\\hat{\\sigma}_y} = \\hat{\\rho}_{xy}\\,\\frac{x - \\bar{x}}{\\hat{\\sigma}_x}$. With $\\hat{\\rho}_{xy} = 0.5$, parents $2$ standard deviations above the mean have a child predicted to be how many standard deviations above the mean?",
    1),
  c1.n(RTM, "ding-galton-fit", 3,
    "In Galton’s family data the fitted line of child height on mid-parent height (inches) is $\\hat{y} = 22.64 + 0.64x$. Predict the child’s height for a mid-parent height of $72$ inches.",
    68.72),
  c1.s(REG, "ding-three-questions", 6,
    "Ding organises modelling around three questions about data $(X, Y)$: describe how $Y$ is associated with $X$, predict a future $Y$ from its $X$, and estimate the causal effect of changing part of $X$. Why is the third much harder than the first two, and what kind of data makes it credible?",
    "Explains that regression coefficients describe associations or conditional comparisons, whereas a causal effect asks what would happen under an intervention, so confounders that move with $X$ can make the two differ.",
    "Names randomised experiments (for example FDA drug trials or randomised job-training programmes) as the design that makes a causal reading credible, contrasting them with observational data."),
];

// --- Ch. 2 · OLS with a Univariate Covariate ------------------------------------
const c2 = chapter("Ch. 2, Ordinary Least Squares with a Univariate Covariate");
const ch2: Item[] = [
  c2.m(SLR, "ding-mean-as-ols", 1, "Least squares on an intercept alone, $\\min_{\\mu} \\sum_i (y_i - \\mu)^2$, returns:",
    "The sample mean $\\bar{y}$", [
      ["The sample median", "The median minimises the sum of absolute deviations (LAD), not squares."],
      ["Zero", "Zero is the minimiser only when the data already average to zero."],
      ["The midrange", "The midrange minimises the largest absolute deviation."],
    ]),
  c2.m(SLR, "ding-through-means", 2, "The first normal equation of simple OLS forces the fitted line to pass through:",
    "The point of means $(\\bar{x}, \\bar{y})$", [
      ["The origin", "Only a no-intercept fit is forced through the origin."],
      ["The first observation", "No single observation is special in OLS."],
      ["The point of medians", "The normal equations involve sums, hence means."],
    ]),
  c2.n(SLR, "ding-no-intercept-slope", 3,
    "Fit OLS of $y$ on $x$ with no intercept, for $\\mathbf{x} = [1, 2, 3]$ and $\\mathbf{y} = [2, 3, 7]$. The slope is $\\langle \\mathbf{x}, \\mathbf{y} \\rangle / \\langle \\mathbf{x}, \\mathbf{x} \\rangle$. Give $4$ decimal places.",
    2.0714),
  c2.n(SLR, "ding-pairwise-slopes", 6,
    "The OLS slope equals a weighted average of all pairwise slopes $b_{ij} = (y_i - y_j)/(x_i - x_j)$ with weights proportional to $(x_i - x_j)^2$. For $\\mathbf{x} = [0, 1, 3]$ and $\\mathbf{y} = [0, 2, 3]$, compute that weighted average. Give $4$ decimal places.",
    0.9286),
  c2.s(SLR, "ding-woolley-no-regression", 8,
    "Woolley (1941) fitted a line by minimising the total area of the triangles between each point and the line, instead of squared vertical residuals. When $\\hat{\\sigma}_{xy} > 0$ his slope is $\\hat{\\sigma}_y/\\hat{\\sigma}_x$. Compare his line with OLS in standardised form and explain why Ding calls it “no regression”.",
    "Writes both lines in standardised form: OLS gives $(\\hat{y} - \\bar{y})/\\hat{\\sigma}_y = \\hat{\\rho}_{xy}(x - \\bar{x})/\\hat{\\sigma}_x$, Woolley’s gives the same with the factor $\\hat{\\rho}_{xy}$ removed.",
    "Explains that without the factor $|\\hat{\\rho}_{xy}| < 1$ predictions are not pulled toward the mean (no regression to the mean), and the line is the same whichever variable is called the outcome."),
];

// --- Ch. 3 · OLS with Multiple Covariates ---------------------------------------
const c3 = chapter("Ch. 3, Ordinary Least Squares with Multiple Covariates");
const ch3: Item[] = [
  c3.n(HAT, "ding-hat-intercept-only", 2,
    "With $X = \\mathbf{1}_n$ (an intercept only) and $n = 8$, every entry of the hat matrix $H$ equals what?",
    0.125),
  c3.m(HAT, "ding-hat-invariant", 3, "If $X$ is replaced by $X\\Gamma$ for a non-singular $p \\times p$ matrix $\\Gamma$, the hat matrix:",
    "Stays the same, because $X$ and $X\\Gamma$ have the same column space", [
      ["Becomes $\\Gamma H \\Gamma^{\\top}$", "$H$ is $n \\times n$ and $\\Gamma$ is $p \\times p$; the dimensions do not even match."],
      ["Scales by $\\det \\Gamma$", "A projection is idempotent; it cannot be rescaled and stay a projection."],
      ["Changes unless $\\Gamma$ is orthogonal", "Any non-singular $\\Gamma$ preserves the column space, so the projection is unchanged."],
    ]),
  c3.m(OLS, "ding-invariance", 4, "Replace $X$ by $\\tilde{X} = X\\Gamma$ with $\\Gamma$ non-singular (for example, rescale or recombine columns). What happens to the OLS fit?",
    "Fitted values and residuals are unchanged; the new coefficient is $\\Gamma^{-1}\\hat{\\boldsymbol{\\beta}}$", [
      ["Everything is unchanged, including the coefficient", "The coefficients must change to compensate: $\\tilde{X}\\tilde{\\boldsymbol{\\beta}} = X\\hat{\\boldsymbol{\\beta}}$ forces $\\tilde{\\boldsymbol{\\beta}} = \\Gamma^{-1}\\hat{\\boldsymbol{\\beta}}$."],
      ["The coefficient becomes $\\Gamma\\hat{\\boldsymbol{\\beta}}$", "That inverts the relationship; it is $\\hat{\\boldsymbol{\\beta}} = \\Gamma\\tilde{\\boldsymbol{\\beta}}$."],
      ["The residuals rescale by $\\Gamma$", "The residual is the projection of $Y$ off a column space that did not change."],
    ]),
  c3.m(OLS, "ding-multiple-responses", 3, "Fit OLS of an $n \\times q$ response matrix $Y$ on $X$ by minimising $\\sum_i \\lVert \\mathbf{y}_i - B^{\\top}\\mathbf{x}_i \\rVert^2$. The $k$th column of $\\hat{B}$ is:",
    "$(X^{\\top}X)^{-1}X^{\\top}Y_k$, the separate OLS of the $k$th response on $X$", [
      ["A GLS fit that uses the correlation between responses", "With a common $X$ the objective separates by column; correlation between responses does not enter."],
      ["$(X^{\\top}X)^{-1}X^{\\top}\\bar{Y}$ for the row means $\\bar{Y}$", "Each column keeps its own fit; nothing is averaged."],
      ["Not defined unless $q \\le p$", "Any number of responses can be fitted column by column."],
    ]),
  c3.n(OLS, "ding-subsample-weights", 5,
    "No-intercept OLS. Subsample 1 has $\\sum x_i^2 = 10$ and slope $2$; subsample 2 has $\\sum x_i^2 = 30$ and slope $4$. The full-sample slope is a weighted average of the subsample slopes with weights proportional to $\\sum x_i^2$. What is it?",
    3.5),
  c3.s(OLS, "ding-jacobi", 9,
    "Jacobi’s theorem: $\\hat{\\boldsymbol{\\beta}}$ is a weighted average, over all size-$p$ subsets $S$ of the rows, of the exact-fit coefficients $X_S^{-1}Y_S$, with weights $|\\det X_S|^2 / \\sum_{S'} |\\det X_{S'}|^2$. Explain how this generalises the pairwise-slope formula for simple regression, and what it says about which observations dominate $\\hat{\\boldsymbol{\\beta}}$.",
    "For $p = 2$ with rows $(1, x_i)$, $\\det X_S = x_j - x_i$, so the weights are proportional to $(x_i - x_j)^2$ and $X_S^{-1}Y_S$ is the line through the pair: the pairwise-slope theorem.",
    "Subsets whose rows are spread out (large $|\\det X_S|$, well conditioned) carry most of the weight, while nearly collinear subsets carry almost none, so spread-out or high-leverage points dominate the fit."),
];

// --- Ch. 4 · Gauss–Markov Model and Theorem -------------------------------------
const c4 = chapter("Ch. 4, Gauss–Markov Model and Gauss–Markov Theorem");
const ch4: Item[] = [
  c4.m(OLSP, "ding-blue-mean", 2, "The $y_i$ are uncorrelated with common mean $\\mu$ and variance $\\sigma^2$. Among linear unbiased estimators $\\sum a_i y_i$ (so $\\sum a_i = 1$), the BLUE is:",
    "$\\bar{y}$, with every $a_i = 1/n$", [
      ["The median", "The median is not a linear function of the data."],
      ["$y_1$", "$y_1$ is unbiased but has variance $\\sigma^2$, $n$ times that of $\\bar{y}$."],
      ["Any choice; they all have the same variance", "The variance is $\\sigma^2\\sum a_i^2$, minimised under $\\sum a_i = 1$ by equal weights."],
    ]),
  c4.m(OLSP, "ding-optimal-design-choice", 4, "Under $y_i = \\alpha + \\beta x_i + \\varepsilon_i$ with homoskedastic errors and $n$ even, you may choose each $x_i \\in [0, 1]$. Which design minimises $\\text{Var}(\\hat{\\beta})$?",
    "Half the points at $x = 0$ and half at $x = 1$", [
      ["Points evenly spaced over $[0, 1]$", "Even spacing gives $\\sum(x_i - \\bar{x})^2 \\approx n/12$, three times worse than $n/4$."],
      ["All points at $x = 0.5$", "With no spread in $x$, the slope cannot be estimated at all."],
      ["All points at $x = 1$", "Again no spread in $x$; $\\text{Var}(\\hat{\\beta})$ is infinite."],
    ]),
  c4.n(OLSP, "ding-blue-var-ratio", 5,
    "Uncorrelated $y_1, \\dots, y_4$ with common mean and variance $\\sigma^2$. The unbiased estimator with weights $[0.4, 0.4, 0.1, 0.1]$ has variance $\\sigma^2 \\sum a_i^2$. How many times larger is that than $\\text{Var}(\\bar{y})$?",
    1.36),
  c4.n(OLSP, "ding-optimal-design", 6,
    "Under $y_i = \\alpha + \\beta x_i + \\varepsilon_i$ with $\\sigma^2 = 1$, $n = 20$ and every $x_i \\in [0, 1]$, $\\text{Var}(\\hat{\\beta}) = \\sigma^2 / \\sum_i (x_i - \\bar{x})^2$. What is $\\text{Var}(\\hat{\\beta})$ under the variance-minimising design?",
    0.2),
  c4.n(OLSP, "ding-gm-counterexample", 7,
    "The true model is $y_i = \\beta x_i + \\varepsilon_i$ (no intercept) with $\\mathbf{x} = [1, 2, 3]$ and error variances $[1, 100, 1]$. Compare $\\hat{\\beta} = \\sum x_i y_i / \\sum x_i^2$ with the intercept-including slope $\\tilde{\\beta} = \\sum (x_i - \\bar{x}) y_i / \\sum (x_i - \\bar{x})^2$. Compute $\\text{Var}(\\hat{\\beta})/\\text{Var}(\\tilde{\\beta})$.",
    4.18),
  c4.s(OLSP, "ding-useless-regressors", 7,
    "Under the Gauss–Markov model with $\\boldsymbol{\\beta}_2 = \\mathbf{0}$, compare $\\hat{\\boldsymbol{\\beta}}_1$ from the long regression on $(X_1, X_2)$ with $\\tilde{\\boldsymbol{\\beta}}_1$ from the short regression on $X_1$ alone. Which has the smaller covariance, and why doesn’t this mean you should always drop variables?",
    "States that both are unbiased when $\\boldsymbol{\\beta}_2 = \\mathbf{0}$ and $\\text{cov}(\\hat{\\boldsymbol{\\beta}}_1) \\succeq \\text{cov}(\\tilde{\\boldsymbol{\\beta}}_1)$: useless regressors only inflate variance (by FWL, the residualised $X_1$ has less variation).",
    "Notes that if $\\boldsymbol{\\beta}_2 \\ne \\mathbf{0}$ the short regression is biased (omitted-variable bias), and we never know $\\boldsymbol{\\beta}_2 = \\mathbf{0}$, so dropping variables trades variance for bias."),
  c4.s(OLSP, "ding-gm-prediction", 8,
    "Ding extends Gauss–Markov to prediction: $\\hat{Y} = HY$ has the smallest covariance among linear predictors $\\tilde{H}Y$ with $\\mathbb{E}(\\tilde{H}Y) = X\\boldsymbol{\\beta}$ for every $\\boldsymbol{\\beta}$. Sketch why, and say what fails under heteroskedasticity.",
    "Unbiasedness forces $\\tilde{H}X = X$, so $\\tilde{H}Y - HY = (\\tilde{H} - H)\\boldsymbol{\\varepsilon}$, which under $\\sigma^2 I_n$ is uncorrelated with $HY$ because $(\\tilde{H} - H)H = 0$; hence $\\text{cov}(\\tilde{H}Y) = \\text{cov}(HY) + \\text{cov}((\\tilde{H} - H)Y)$.",
    "The cross-term vanishes only because $\\text{cov}(\\boldsymbol{\\varepsilon}) = \\sigma^2 I_n$; with unequal variances it does not, and a weighted (GLS) predictor can do better."),
];

// --- Ch. 5 · Normal Linear Model ------------------------------------------------
const c5 = chapter("Ch. 5, Normal Linear Model: Inference and Prediction");
const ch5: Item[] = [
  c5.m(LRP, "ding-mle-sigma", 2, "Under the Normal linear model $Y \\sim \\mathcal{N}(X\\boldsymbol{\\beta}, \\sigma^2 I_n)$, the maximum likelihood estimator of $\\sigma^2$ is:",
    "$\\text{RSS}/n$", [
      ["$\\text{RSS}/(n - p)$", "That is the unbiased estimator; the MLE divides by $n$."],
      ["$\\text{RSS}/(n - 1)$", "There is no single-mean correction here; $p$ coefficients were estimated."],
      ["$\\text{TSS}/n$", "The MLE uses the residuals after fitting $\\boldsymbol{\\beta}$, not total variation."],
    ]),
  c5.m(GLH, "ding-two-sample-equal", 3, "Regress the outcome on an intercept and a group dummy. The classical (homoskedastic) $t$-statistic of the dummy coefficient is numerically identical to:",
    "The pooled-variance two-sample $t$-statistic", [
      ["Welch’s unequal-variance $t$-statistic", "Welch’s statistic matches the EHW standard error with the HC2 correction, not the classical one."],
      ["The paired $t$-statistic", "The groups are independent samples, not pairs."],
      ["The $z$-statistic for a difference in proportions", "The outcome need not be binary; the identity is with the pooled $t$-test."],
    ]),
  c5.n(GLH, "ding-t-from-r", 4,
    "In simple regression the homoskedastic $t$-statistic of the slope equals $\\hat{\\rho}_{xy} \\big/ \\sqrt{(1 - \\hat{\\rho}_{xy}^2)/(n - 2)}$. Compute it for $n = 27$ and $\\hat{\\rho}_{xy} = 0.6$.",
    3.75),
  c5.s(LRP, "ding-anscombe", 5,
    "Anscombe’s quartet is four datasets with essentially the same OLS line, $R^2$ and $t$-statistics. What does Ding take from it about inference under the Normal linear model?",
    "Notes that the summaries and tests are identical even though the scatterplots differ completely (one curved, one with an outlier, one driven by a single high-leverage point).",
    "Concludes that the formulas are valid only if the model holds, so the data and residuals must be plotted to check linearity, outliers and leverage before the output is trusted."),
  c5.m(GLH, "ding-t-symmetric", 6, "You regress $y$ on $(1, x)$, then $x$ on $(1, y)$, and compute the classical (homoskedastic) $t$-statistic of each slope. They are:",
    "Exactly equal, because each depends only on $\\hat{\\rho}_{xy}$ and $n$", [
      ["Reciprocals of each other", "The slopes multiply to $\\hat{\\rho}_{xy}^2$, but the $t$-statistics are equal."],
      ["Equal only if the errors are Normal", "It is a numerical identity that holds for any data."],
      ["Unrelated in general", "Both are $\\hat{\\rho}_{xy}\\sqrt{n - 2}/\\sqrt{1 - \\hat{\\rho}_{xy}^2}$."],
    ]),
  c5.n(LRP, "ding-mse-sigma", 7,
    "With $n = 12$ and $p = 2$, compare $\\hat{\\sigma}^2 = \\text{RSS}/(n - p)$ with the MLE $\\tilde{\\sigma}^2 = \\text{RSS}/n$, using $\\text{RSS}/\\sigma^2 \\sim \\chi^2_{n-p}$. Report $\\text{MSE}(\\tilde{\\sigma}^2)/\\text{MSE}(\\hat{\\sigma}^2)$. Give $3$ decimal places.",
    0.833),
  c5.m(LRP, "ding-independence-beta-sigma", 6, "Under $Y \\sim \\mathcal{N}(X\\boldsymbol{\\beta}, \\sigma^2 I_n)$, why are $\\hat{\\boldsymbol{\\beta}}$ and $\\hat{\\sigma}^2$ independent?",
    "$\\hat{\\boldsymbol{\\beta}}$ depends on $HY$ and $\\hat{\\sigma}^2$ on $(I_n - H)Y$, which are jointly Normal and uncorrelated because $H(I_n - H) = 0$", [
      ["Because $\\hat{\\boldsymbol{\\beta}}$ is unbiased", "Unbiasedness says nothing about dependence."],
      ["Because $\\sigma^2$ is a fixed constant", "The estimator $\\hat{\\sigma}^2$ is random; independence needs a structural argument."],
      ["They are independent under any error distribution", "For non-Normal errors, uncorrelated does not imply independent."],
    ]),
];

// --- Ch. 6 · EHW robust standard errors -----------------------------------------
const c6 = chapter("Ch. 6, Asymptotic Inference in OLS: the Eicker–Huber–White Robust Standard Error");
const ch6: Item[] = [
  c6.m(SW, "ding-normality-vs-homoskedasticity", 2, "Ding’s Chapter 6 conclusion about the Normal linear model’s assumptions, for large-sample inference on $\\hat{\\boldsymbol{\\beta}}$:",
    "Normal errors are not crucial, but homoskedasticity is, unless the covariance estimator is replaced by the sandwich", [
      ["Normality is crucial; homoskedasticity is not", "It is the other way round: the CLT handles non-Normality, but unequal variances break $\\sigma^2(X^{\\top}X)^{-1}$."],
      ["Both are crucial at any sample size", "With large $n$, Normality stops mattering."],
      ["Neither matters once $n$ is large", "Heteroskedasticity makes the classical covariance inconsistent at any $n$."],
    ]),
  c6.n(SW, "ding-hc0-expectation", 4,
    "Homoskedastic errors with $\\sigma^2 = 4$. An observation has leverage $h_{ii} = 0.2$. What is $\\mathbb{E}(\\hat{\\varepsilon}_i^2)$, the expected squared residual?",
    3.2),
  c6.n(SW, "ding-welch-se", 3,
    "Group 1 has $m = 20$ and sample variance $8$; group 2 has $n = 50$ and sample variance $5$. Regress the outcome on $(1, z)$ for the group dummy $z$. The HC2 robust standard error of the dummy coefficient is $\\sqrt{S_1^2/m + S_2^2/n}$. Give $4$ decimal places.",
    0.7071),
  c6.m(SW, "ding-hc2-welch", 4, "Regress $y$ on $(1, z)$ with a binary $z$. The $t$-statistic built from the HC2 robust standard error is numerically identical to:",
    "Welch’s unequal-variance $t$-statistic", [
      ["The pooled-variance $t$-statistic", "That matches the classical, homoskedastic standard error."],
      ["The HC0 $t$-statistic", "HC0 divides each group variance by $m$ and $n$ with $(m-1)/m$ factors, so it differs slightly."],
      ["The Mann–Whitney statistic", "That is a rank test with no regression analogue here."],
    ]),
  c6.m(SW, "ding-hc2-unbiased", 5, "Under homoskedastic errors, which EHW variant is exactly unbiased for $\\text{cov}(\\hat{\\boldsymbol{\\beta}})$?",
    "HC2, which divides each squared residual by $1 - h_{ii}$", [
      ["HC0", "$\\mathbb{E}(\\hat{\\varepsilon}_i^2) = \\sigma^2(1 - h_{ii}) < \\sigma^2$, so HC0 is biased downward."],
      ["HC1", "The uniform factor $n/(n - p)$ is exact only when every leverage is equal."],
      ["HC3", "Dividing by $(1 - h_{ii})^2$ over-corrects, giving an upward bias."],
    ]),
  c6.s(SW, "ding-ehw-asymmetry", 8,
    "With classical standard errors, the $t$-statistic from regressing $y$ on $x$ equals the one from regressing $x$ on $y$. Explain why this symmetry breaks with EHW standard errors.",
    "Notes that the classical $t$ depends only on $\\hat{\\rho}_{xy}$ and $n$, which are symmetric in $x$ and $y$.",
    "Explains that the EHW variance weights squared residuals by the squared centred regressor ($\\sum (x_i - \\bar{x})^2\\hat{\\varepsilon}_i^2$), so the two directions use different residuals and weights, and heteroskedasticity in $y$ given $x$ need not mirror that in $x$ given $y$."),
];

// --- Ch. 7 · Frisch–Waugh–Lovell Theorem ----------------------------------------
const c7 = chapter("Ch. 7, Frisch–Waugh–Lovell Theorem");
const ch7: Item[] = [
  c7.m(PR, "ding-gram-schmidt", 3, "Gram–Schmidt orthogonalisation of the columns of $X$ is equivalent to:",
    "A sequence of OLS fits, each column regressed on the residualised earlier columns, which yields $X = QR$", [
      ["A single OLS fit of $Y$ on $X$", "Gram–Schmidt involves only $X$, one column at a time."],
      ["The eigen-decomposition of $X^{\\top}X$", "That gives the SVD directions, not a triangular factorisation."],
      ["Centring and scaling the columns", "Centring orthogonalises each column against $\\mathbf{1}_n$ only."],
    ]),
  c7.n(PR, "ding-leverage-sum-num", 4,
    "Long regression on $(X_1, X_2)$. Observation $i$ has leverage $0.15$ in the fit on $X_1$ alone and $0.10$ in the fit on $\\tilde{X}_2 = (I - H_1)X_2$. What is its leverage in the long regression?",
    0.25),
  c7.m(PR, "ding-fwl-residuals", 5, "Regress the raw $Y$ (not residualised) on $\\tilde{X}_2 = (I - H_1)X_2$. Compared with the long regression of $Y$ on $(X_1, X_2)$:",
    "The coefficient equals $\\hat{\\boldsymbol{\\beta}}_2$, but the residuals generally differ", [
      ["Both the coefficient and the residuals match", "The residuals match only if $Y$ is residualised on $X_1$ too."],
      ["Neither matches", "FWL guarantees the coefficient, because $\\tilde{X}_2^{\\top}H_1 Y = 0$."],
      ["The residuals match but the coefficient does not", "It is the coefficient that FWL preserves."],
    ]),
  c7.n(PR, "ding-fwl-ehw-weights", 6,
    "By FWL the squared EHW standard error of $\\hat{\\beta}_2$ is $\\sum_i w_i \\hat{\\varepsilon}_i^2$ with $w_i = \\tilde{x}_{i2}^2 / (\\sum_k \\tilde{x}_{k2}^2)^2$. With residualised regressor $\\tilde{\\mathbf{x}}_2 = [-1, 0, 1]$ and residuals $\\hat{\\boldsymbol{\\varepsilon}} = [1, 2, -1]$, compute it.",
    0.5),
  c7.m(PR, "ding-leverage-sum", 7, "Let $h_{ii}$ be the leverages of the long regression on $(X_1, X_2)$. In terms of (R1) the fit of $X_2$ on $X_1$ and (R2) the fit on $\\tilde{X}_2 = (I - H_1)X_2$:",
    "$h_{ii}$ equals the leverage from (R1) plus the leverage from (R2)", [
      ["$h_{ii}$ equals the leverage from (R2) alone", "(R2) recovers the coefficient but loses the $X_1$ part of the projection."],
      ["$h_{ii}$ is the product of the two leverages", "Projections onto orthogonal subspaces add: $H = H_1 + H_{\\tilde{X}_2}$."],
      ["$h_{ii}$ is the larger of the two", "Both pieces contribute because the subspaces are orthogonal."],
    ]),
  c7.s(PR, "ding-invariance-shift", 8,
    "Show, in outline, that replacing $X_2$ by $X_2 - X_1A$ for any matrix $A$ leaves $\\hat{\\boldsymbol{\\beta}}_2$ and the residuals unchanged, and explain why the FWL theorem is the case $A = (X_1^{\\top}X_1)^{-1}X_1^{\\top}X_2$.",
    "Notes that $(X_1, X_2 - X_1A) = (X_1, X_2)\\Gamma$ with $\\Gamma = \\begin{bmatrix} I & -A \\\\ 0 & I \\end{bmatrix}$ non-singular, so the column space, fit and residuals are unchanged, and the second block of $\\Gamma^{-1}\\hat{\\boldsymbol{\\beta}}$ is still $\\hat{\\boldsymbol{\\beta}}_2$.",
    "With $A$ the OLS coefficient of $X_2$ on $X_1$, the new block $\\tilde{X}_2$ is orthogonal to $X_1$, so the fit splits into two separate regressions and $\\hat{\\boldsymbol{\\beta}}_2$ is the coefficient of $Y$ on $\\tilde{X}_2$, which is FWL."),
];

// --- Ch. 8 · Applications of FWL ------------------------------------------------
const c8 = chapter("Ch. 8, Applications of the Frisch–Waugh–Lovell Theorem");
const ch8: Item[] = [
  c8.m(CS, "ding-centering-matrix", 1, "Multiplying a vector by $C_n = I_n - n^{-1}\\mathbf{1}_n\\mathbf{1}_n^{\\top}$:",
    "Centres it, subtracting its mean from every entry", [
      ["Averages it, replacing every entry by the mean", "That is $n^{-1}\\mathbf{1}_n\\mathbf{1}_n^{\\top}$, the complementary projection."],
      ["Standardises it to unit variance", "$C_n$ subtracts the mean but does not divide by the standard deviation."],
      ["Sorts it", "$C_n$ is a linear projection; it does not reorder entries."],
    ]),
  c8.n(CS, "ding-two-way-demeaning", 5,
    "Two-way fixed effects demean each cell as $\\tilde{y}_{it} = y_{it} - \\bar{y}_{i\\cdot} - \\bar{y}_{\\cdot t} + \\bar{y}_{\\cdot\\cdot}$. For two units over two periods with $y_{11} = 1$, $y_{12} = 3$, $y_{21} = 5$ and $y_{22} = 11$, compute $\\tilde{y}_{22}$.",
    1),
  c8.n(PR, "ding-within-slope", 4,
    "Fixed-effects regression, one unit observed over $T = 3$ periods with $\\mathbf{y} = [5, 7, 9]$ and $\\mathbf{x} = [1, 2, 6]$. By FWL, the within-unit slope regresses the unit-demeaned $y$ on the unit-demeaned $x$ with no intercept. Compute it for this unit alone. Give $4$ decimal places.",
    0.7143),
  c8.n(PR, "ding-t-partial-corr", 5,
    "With an intercept, the homoskedastic $t$-statistic of $\\hat{\\beta}_1$ is $\\hat{\\rho}_{yx_1|x_2} \\big/ \\sqrt{(1 - \\hat{\\rho}_{yx_1|x_2}^2)/(n - p)}$, where $\\hat{\\rho}_{yx_1|x_2}$ is the sample partial correlation. With $\\hat{\\rho}_{yx_1|x_2} = 0.3$, $n = 103$ and $p = 3$, compute it.",
    3.14),
  c8.m(PR, "ding-coefficient-correlation", 6, "Regress $Y$ on $(\\mathbf{1}_n, X_1, X_2)$ where the sample correlation of $X_1$ and $X_2$ is positive. Under the Gauss–Markov model, $\\hat{\\beta}_1$ and $\\hat{\\beta}_2$ are:",
    "Negatively correlated", [
      ["Positively correlated, like the regressors", "If $\\hat{\\beta}_1$ overshoots, $\\hat{\\beta}_2$ must undershoot to keep the fitted values on track."],
      ["Uncorrelated", "They are uncorrelated only when $X_1$ and $X_2$ are (partially) uncorrelated."],
      ["Perfectly correlated", "That happens only under exact collinearity, when neither is identified."],
    ]),
  c8.s(PR, "ding-simpson", 6,
    "Simpson’s paradox in regression form: the coefficient of $x$ is positive when $y$ is regressed on $x$ but negative when $y$ is regressed on $(x, w)$. Use FWL to explain how this can happen.",
    "Explains that FWL makes the long coefficient the slope of $y$ on $x$ after residualising on $w$, that is, the association within levels of $w$, which can differ in sign from the raw association.",
    "Gives the mechanism: $w$ is correlated with both $x$ and $y$ (for example, groups with high $x$ also have high $y$), so the between-group trend dominates the raw slope while the within-group slope runs the other way."),
  c8.m(PR, "ding-precision-zero", 7, "For the sample covariance matrix $\\hat{\\Sigma}$ of $p$ variables with inverse $\\hat{\\Omega}$, the entry $\\hat{\\Omega}_{jk} = 0$ ($j \\ne k$) exactly when:",
    "The sample partial correlation of $X_j$ and $X_k$ given all the other variables is zero", [
      ["The sample correlation of $X_j$ and $X_k$ is zero", "A zero in $\\hat{\\Sigma}$, not in its inverse, corresponds to zero marginal correlation."],
      ["$X_j$ and $X_k$ are independent", "Sample moments cannot certify independence; the statement is about partial correlation."],
      ["$X_j$ has zero variance", "That would make $\\hat{\\Sigma}$ singular, with no inverse."],
    ]),
];

// --- Ch. 9 · Cochran's Formula and Omitted-Variable Bias ------------------------
const c9 = chapter("Ch. 9, Cochran's Formula and Omitted-Variable Bias");
const ch9: Item[] = [
  c9.m(MB, "ding-cochran-algebra", 2, "Cochran’s formula $\\tilde{\\boldsymbol{\\beta}}_2 = \\hat{\\boldsymbol{\\beta}}_2 + \\hat{\\delta}\\hat{\\boldsymbol{\\beta}}_1$ (short $=$ long $+$ auxiliary $\\times$ omitted) holds:",
    "As an exact algebraic identity for any data, with no model assumed", [
      ["Only in expectation under the Gauss–Markov model", "The expectation version is the omitted-variable bias formula; the sample identity is exact."],
      ["Only when $X_1$ and $X_2$ are uncorrelated", "Then $\\hat{\\delta} = 0$ and the formula is trivial, but it holds in general."],
      ["Only asymptotically", "It is a finite-sample identity, like FWL."],
    ]),
  c9.n(MB, "ding-cochran-num", 3,
    "Long regression: $Y$ on $(X_1, X_2)$ gives $\\hat{\\beta}_1 = 2$ and $\\hat{\\beta}_2 = 1.5$. Auxiliary regression: $X_1$ on $X_2$ gives slope $\\hat{\\delta} = 0.4$. What is the coefficient of $X_2$ in the short regression of $Y$ on $X_2$ alone? (All fits include an intercept.)",
    2.3),
  c9.m(MB, "ding-ovb-sign", 4, "An unmeasured $u$ raises the outcome ($\\beta_u > 0$) and is positively associated with the treatment $z$ given the other covariates. Omitting $u$ biases the coefficient of $z$:",
    "Upward", [
      ["Downward", "The bias is $\\beta_u\\delta$, the product of two positives, so it is positive."],
      ["Not at all, because $u$ is unmeasured", "Being unmeasured is exactly why it is omitted and causes bias."],
      ["Toward zero", "The bias has a sign, $\\beta_u\\delta$, not a fixed direction toward zero."],
    ]),
  c9.n(MB, "ding-baron-kenny", 5,
    "Baron–Kenny mediation: $Y$ on $(1, Z, M, X)$ gives coefficient $0.8$ on $Z$ and $0.5$ on $M$; $M$ on $(1, Z, X)$ gives coefficient $1.2$ on $Z$. By Cochran’s formula, what is the coefficient of $Z$ in $Y$ on $(1, Z, X)$?",
    1.4),
  c9.n(MB, "ding-path-analysis", 7,
    "Path model $X_1 \\to X_2 \\to X_3 \\to Y$ with every earlier variable also pointing at every later one. The fits give: $Y$ on $(1, X_1, X_2, X_3)$ with coefficients $0.5, 0.4, 0.3$; $X_3$ on $(1, X_1, X_2)$ with $1, 0.5$; $X_2$ on $(1, X_1)$ with $2$. The coefficient of $X_1$ in $Y$ on $(1, X_1)$ is the sum over all paths of the products of path coefficients. What is it?",
    1.9),
  c9.s(MB, "ding-underfit-sigma", 8,
    "The truth is $Y = X_1\\boldsymbol{\\beta}_1 + X_2\\boldsymbol{\\beta}_2 + \\boldsymbol{\\varepsilon}$ (Gauss–Markov), but you fit $Y$ on $X_2$ only. Describe $\\mathbb{E}(\\tilde{\\boldsymbol{\\beta}}_2)$ and $\\mathbb{E}(\\tilde{\\sigma}^2)$, and what they do to the usual confidence interval.",
    "States $\\mathbb{E}(\\tilde{\\boldsymbol{\\beta}}_2) = \\boldsymbol{\\beta}_2 + (X_2^{\\top}X_2)^{-1}X_2^{\\top}X_1\\boldsymbol{\\beta}_1$ and $\\mathbb{E}(\\tilde{\\sigma}^2) = \\sigma^2 + \\boldsymbol{\\beta}_1^{\\top}X_1^{\\top}(I - H_2)X_1\\boldsymbol{\\beta}_1/(n - l) \\ge \\sigma^2$.",
    "Concludes that the interval is centred in the wrong place (bias) and is wider than it should be (the omitted signal is counted as noise), so its coverage of $\\boldsymbol{\\beta}_2$ can be far from nominal."),
];

export const dingOlsInferenceItems: Item[] = [...ch1, ...ch2, ...ch3, ...ch4, ...ch5, ...ch6, ...ch7, ...ch8, ...ch9];
