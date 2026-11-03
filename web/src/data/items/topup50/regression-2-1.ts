import type { Item } from "../../../lib/assessment/types";
import { m, n, s } from "./shared";

const LO = "loess-smoothing";
const loess: Item[] = [
  // level 1
  m(LO, "t50-recall-local-weighting", 1,
    "In LOESS, the fitted value at a target point $x_0$ comes from a local regression in which each observation is weighted by:",
    "Its distance from $x_0$ in the predictor space, with nearer points getting larger weights",
    [
      ["The size of its residual from a global least-squares line", "That describes the optional robustness iterations, not the basic local weighting."],
      ["Its position in the order the data were recorded", "Weights depend on closeness in $x$, not on row order."],
      ["Equally, using every observation in the dataset", "Equal weights on all data give one global regression, not a local fit."],
    ]),
  m(LO, "t50-recall-linear-smoother", 1,
    "A (non-robust) LOESS fit is called a linear smoother. This means:",
    "The fitted vector is $\\hat{\\mathbf{y}} = \\mathbf{S}\\mathbf{y}$ for a matrix $\\mathbf{S}$ that depends on the $x$ values and the span but not on $\\mathbf{y}$",
    [
      ["The fitted curve is a straight line in $x$", "“Linear” refers to linearity in $\\mathbf{y}$; the curve itself can bend freely."],
      ["The smoother matrix $\\mathbf{S}$ is a projection, so $\\mathbf{S}^2 = \\mathbf{S}$", "Unlike a hat matrix, a LOESS smoother matrix is generally not idempotent."],
      ["The robustness iterations keep the fit linear in $\\mathbf{y}$", "Robustness weights depend on residuals, so robust LOWESS is nonlinear in $\\mathbf{y}$."],
    ]),
  m(LO, "t50-recall-degree-zero", 1,
    "Local regression of degree $0$ (fitting a weighted constant in each neighbourhood) is the:",
    "Nadaraya–Watson kernel regression estimator",
    [
      ["Smoothing spline", "A smoothing spline comes from a roughness penalty, not from local constant fits."],
      ["Local linear regression", "Local linear regression fits degree $1$ in each neighbourhood."],
      ["Global polynomial regression", "A global polynomial uses one fit for all the data, with no local weighting."],
    ]),
  // level 2
  n(LO, "t50-apply-span-from-q", 2,
    "A LOESS fit on $n = 180$ observations uses the $q = 45$ nearest neighbours of each target point. Find the span $\\alpha = q/n$.",
    0.25),
  n(LO, "t50-apply-tricube-075", 2,
    "The target point is $x_0 = 10$ and the neighbourhood radius is $h = 4$. A point at $x = 13$ gets tricube weight $(1 - |u|^3)^3$ with $u = (x - x_0)/h$. Give $4$ decimal places.",
    0.1932),
  m(LO, "t50-apply-outside-window", 2,
    "With target $x_0 = 10$ and neighbourhood radius $h = 4$, what tricube weight does a point at $x = 15$ receive?",
    "$0$, because $|u| = 1.25 > 1$ and the tricube function has compact support",
    [
      ["$(1 - 1.25^3)^3$, a negative weight", "The formula applies only for $|u| < 1$; outside that the weight is set to $0$."],
      ["A small positive weight that keeps decaying with distance", "Tricube weights do not have infinite tails like a Gaussian kernel."],
      ["$1$, because every neighbour counts fully", "Weights decay from $1$ at $x_0$ to $0$ at the edge of the window."],
    ]),
  // level 3
  n(LO, "t50-apply-sigma2-edf", 3,
    "A LOESS fit on $n = 60$ points has $\\text{tr}(\\mathbf{S}) = 6.5$ and residual sum of squares $106$. Using $n - \\text{tr}(\\mathbf{S})$ residual degrees of freedom, estimate $\\sigma^2$. Give $3$ decimal places.",
    1.981),
  n(LO, "t50-apply-local-linear-value", 3,
    "At target $x_0 = 5$ a local-linear fit uses the model $a + b(x - x_0)$, and the weighted least-squares fit gives $\\hat{a} = 3.2$ and $\\hat{b} = 0.8$. Find the LOESS fitted value $\\hat{f}(x_0)$.",
    3.2),
  m(LO, "t50-apply-halve-span", 3,
    "You halve the span of a LOESS fit, keeping the local degree. The effective degrees of freedom $\\text{tr}(\\mathbf{S})$:",
    "Increase, because each local fit uses fewer points and tracks the data more closely",
    [
      ["Decrease, because fewer points enter each local fit", "Fewer points per fit makes the curve wigglier, which means more effective parameters, not fewer."],
      ["Stay the same, because the local polynomial degree is unchanged", "Effective degrees of freedom depend on the span as well as the degree."],
      ["Become exactly half as large", "There is no exact proportionality; $\\text{tr}(\\mathbf{S})$ rises, but not by a fixed factor."],
    ]),
  // level 4
  n(LO, "t50-apply-local-constant-fit", 4,
    "Points $(1, 2)$, $(2, 4)$, $(3, 5)$, $(4, 9)$. Fit a local constant (degree $0$) at $x_0 = 2.5$ with radius $h = 2$ and tricube weights $(1 - |u|^3)^3$, $u = (x - x_0)/h$. Find the fitted value. Give $3$ decimal places.",
    4.668),
  n(LO, "t50-apply-bisquare-robust", 4,
    "In a LOWESS robustness step the median absolute residual is $M = 0.5$. A point with residual $r = 1.8$ gets weight $\\left(1 - (r/6M)^2\\right)^2$. Give $4$ decimal places.",
    0.4096),
  n(LO, "t50-apply-symmetric-local-linear", 4,
    "Relative to the target point, three neighbours sit at $u = -1, 0, 1$ with weights $0.5, 1, 0.5$ and responses $1, 2, 5$. Fit $a + bu$ by weighted least squares. Find the fitted value $\\hat{a}$ at the target.",
    2.5),
  // level 5
  s(LO, "t50-explain-boundary-local-linear", 5,
    "Near the edge of the data, why does a local-linear LOESS fit have much less bias than a local-constant (kernel average) fit when the true curve is sloped there?",
    "Notes that at the boundary all neighbours lie on one side of $x_0$, so a local average is pulled toward the interior values of a sloped curve.",
    "Explains that fitting a local slope corrects this to first order (the fit extrapolates along the line to $x_0$), so the boundary bias drops, e.g. from order $h$ to order $h^2$."),
  // level 10
  s(LO, "t50-judge-varying-curvature", 10,
    "A scatterplot has a sharp peak in one region and a gentle trend elsewhere. Every single LOESS span chosen by GCV either flattens the peak or makes the gentle region wiggly. Explain why one global span cannot fit both, and propose a principled remedy.",
    "Explains that the best bandwidth depends on local curvature and noise: a sharp peak needs a small window (low bias), a gentle region a wide one (low variance), and a nearest-neighbour span adapts to data density, not to curvature.",
    "Proposes a remedy such as a locally varying span chosen by local cross-validation (e.g. Friedman’s supersmoother), a higher local degree (local quadratic) near the peak, or another locally adaptive method."),
];

const ME = "mixed-effect-models";
const mixed: Item[] = [
  // level 1
  m(ME, "t50-recall-matrix-form", 1,
    "In matrix form, the linear mixed model is written:",
    "$\\mathbf{y} = \\mathbf{X}\\boldsymbol{\\beta} + \\mathbf{Z}\\mathbf{u} + \\boldsymbol{\\varepsilon}$ with $\\mathbf{u} \\sim \\mathcal{N}(\\mathbf{0}, \\mathbf{G})$ independent of $\\boldsymbol{\\varepsilon} \\sim \\mathcal{N}(\\mathbf{0}, \\mathbf{R})$",
    [
      ["$\\mathbf{y} = \\mathbf{X}\\boldsymbol{\\beta} + \\boldsymbol{\\varepsilon}$ with $\\boldsymbol{\\beta}$ random", "Making every coefficient random is a Bayesian regression, not the mixed model with fixed and random parts."],
      ["$\\mathbf{y} = \\mathbf{Z}\\mathbf{u} + \\boldsymbol{\\varepsilon}$ with $\\mathbf{u}$ a fixed parameter vector", "This drops the fixed effects and treats the group effects as fixed."],
      ["$\\mathbf{y} = \\mathbf{X}\\boldsymbol{\\beta} + \\mathbf{Z}\\mathbf{u}$ with no residual error", "Without $\\boldsymbol{\\varepsilon}$ there is no within-group variation."],
    ]),
  m(ME, "t50-recall-marginal-cov", 1,
    "Integrating out the random effects, the marginal covariance $\\text{Var}(\\mathbf{y})$ of the linear mixed model is:",
    "$\\mathbf{Z}\\mathbf{G}\\mathbf{Z}^{\\top} + \\mathbf{R}$",
    [
      ["$\\mathbf{G} + \\mathbf{R}$", "This forgets that $\\mathbf{Z}$ maps the random effects onto the observations."],
      ["$\\mathbf{R}$ only", "That treats $\\mathbf{u}$ as fixed and ignores the correlation it induces."],
      ["$\\sigma^2\\mathbf{X}\\mathbf{X}^{\\top}$", "The fixed-effects design does not enter the covariance of $\\mathbf{y}$."],
    ]),
  m(ME, "t50-recall-partial-pooling", 1,
    "Random-intercept estimates are said to use “partial pooling”. This means:",
    "Each group’s estimate is a compromise between its own mean and the overall mean, weighted by their precisions",
    [
      ["All groups share one common mean", "That is complete pooling, which ignores group differences."],
      ["Each group is estimated from its own data alone", "That is no pooling, the fixed-effects extreme."],
      ["Half of the groups are pooled and half are left separate", "Pooling is a weighting applied to every group, not a split of the groups."],
    ]),
  // level 2
  n(ME, "t50-apply-total-variance", 2,
    "A random-intercept model has $\\sigma_u^2 = 6$ and $\\sigma^2 = 10$. Find $\\text{Var}(y_{ij})$ for a single observation.",
    16),
  // level 3
  n(ME, "t50-apply-cluster-mean-var", 3,
    "Clusters have $m = 5$ members, intraclass correlation $\\rho = 0.2$ and total variance $\\sigma_u^2 + \\sigma^2 = 10$. Using $\\text{Var}(\\bar{y}_j) = (\\sigma_u^2 + \\sigma^2)\\left(1 + (m - 1)\\rho\\right)/m$, find the variance of a cluster mean.",
    3.6),
  n(ME, "t50-apply-random-slope-var", 3,
    "A random intercept-and-slope model gives $\\text{Var}(y_{ij}) = \\sigma_0^2 + 2t\\sigma_{01} + t^2\\sigma_1^2 + \\sigma^2$ at time $t$. With $\\sigma_0^2 = 4$, $\\sigma_{01} = -0.5$, $\\sigma_1^2 = 0.25$ and $\\sigma^2 = 2$, find the variance at $t = 2$.",
    5),
  // level 4
  n(ME, "t50-apply-group-size-for-shrinkage", 4,
    "With $\\sigma_u^2 = 2$ and $\\sigma^2 = 8$, the BLUP shrinkage factor is $\\sigma_u^2/(\\sigma_u^2 + \\sigma^2/n_j)$. Find the group size $n_j$ for which the factor equals $0.8$.",
    16),
  // level 5
  m(ME, "t50-apply-parameter-count", 5,
    "A study has $40$ schools. Treating school as a fixed factor adds $39$ coefficients to the model. Treating it as a random intercept instead adds how many parameters?",
    "$1$: the between-school variance $\\sigma_u^2$",
    [
      ["$39$, the same as the fixed-effects coding", "The $40$ school effects are predicted (BLUPs), not estimated as free parameters."],
      ["$40$, one per school", "Random effects are summarised by their distribution, which here has one variance parameter."],
      ["$0$, because random effects are not parameters", "The variance of the random effects is a parameter that must be estimated."],
    ]),
  // level 8
  s(ME, "t50-derive-blup", 8,
    "In $y_{ij} = \\mu + u_j + \\varepsilon_{ij}$ with $u_j \\sim \\mathcal{N}(0, \\sigma_u^2)$, $\\varepsilon_{ij} \\sim \\mathcal{N}(0, \\sigma^2)$ and $\\mu$, $\\sigma_u^2$, $\\sigma^2$ known, derive $\\mathbb{E}(u_j \\mid \\bar{y}_j)$ and show it is the familiar shrinkage formula.",
    "Notes that $u_j$ and $\\bar{y}_j$ are jointly normal with $\\text{Cov}(u_j, \\bar{y}_j) = \\sigma_u^2$ and $\\text{Var}(\\bar{y}_j) = \\sigma_u^2 + \\sigma^2/n_j$.",
    "Uses the normal conditional mean to get $\\mathbb{E}(u_j \\mid \\bar{y}_j) = \\dfrac{\\sigma_u^2}{\\sigma_u^2 + \\sigma^2/n_j}(\\bar{y}_j - \\mu)$, the shrinkage factor times the raw deviation."),
  n(ME, "t50-derive-gls-cluster-means", 8,
    "In a random-intercept model with $\\sigma_u^2 = 1$ and $\\sigma^2 = 4$, cluster $1$ has $n_1 = 1$ observation with mean $10$ and cluster $2$ has $n_2 = 4$ observations with mean $20$. The GLS estimate of $\\mu$ weights each cluster mean by $1/\\text{Var}(\\bar{y}_j)$. Find $\\hat{\\mu}$. Give $3$ decimal places.",
    17.143),
  // level 9
  s(ME, "t50-transfer-missing-random-slope", 9,
    "The effect of a within-group predictor truly varies across groups, but only a random intercept is fitted. Explain what this does to the standard error of the fixed slope and to tests about it.",
    "Explains that the slope variation becomes part of the error, inducing within-group correlation (and heteroskedasticity) that the random-intercept covariance does not capture.",
    "Concludes that the fixed-slope standard error is typically too small, so tests are anti-conservative; adding a random slope (or using cluster-robust errors) fixes it."),
  n(ME, "t50-transfer-infinite-clusters", 9,
    "There are $K = 10$ hospitals, each with an enormous number of patients ($n_j \\to \\infty$), and $\\sigma_u^2 = 4$. In a random-intercept model, what is $\\text{Var}(\\hat{\\mu})$ for the overall mean?",
    0.4),
  // level 10
  s(ME, "t50-judge-cluster-randomisation", 10,
    "A trial can randomise whole clinics ($20$ clinics, $50$ patients each, intraclass correlation $0.05$) or randomise patients within clinics. Explain how the choice changes the effective sample size and the analysis, and when cluster randomisation is still worth it.",
    "Computes or describes the design effect $1 + 49 \\times 0.05 = 3.45$, so $1{,}000$ cluster-randomised patients carry roughly $290$ patients’ worth of information, and the analysis must model clinic (random intercept or cluster-robust errors).",
    "Explains that randomising within clinics removes clinic variation from the treatment contrast (clinics act as blocks), making it far more efficient, but cluster randomisation is justified when contamination between arms or logistics rule out individual randomisation."),
  s(ME, "t50-judge-unequal-hospitals", 10,
    "One hospital contributes $5{,}000$ patients and $30$ others contribute $20$ each. Compare how the overall intercept is estimated by pooled OLS, by the unweighted mean of hospital means, and by the random-intercept GLS estimate, and say which suits the target “the average hospital”.",
    "States that pooled OLS weights patients, so the big hospital dominates; the mean of hospital means weights hospitals equally but ignores their different precisions.",
    "Explains that GLS weights each hospital by $1/(\\sigma_u^2 + \\sigma^2/n_j)$, which is capped at $1/\\sigma_u^2$, so the big hospital cannot dominate; this precision-aware compromise is the natural estimate of the average hospital."),
  s(ME, "t50-judge-random-slope-lrt", 10,
    "To test whether a random slope is needed, a colleague compares a random-intercept model with one that adds a slope variance and an intercept–slope covariance, using a $\\chi^2_2$ likelihood-ratio test. Explain what is wrong and what reference distribution is appropriate.",
    "Notes that under the null the slope variance lies on the boundary of its parameter space ($\\sigma_1^2 = 0$), so the usual $\\chi^2$ asymptotics fail.",
    "Gives the corrected null distribution as a $50{:}50$ mixture of $\\chi^2_1$ and $\\chi^2_2$, so the naive $\\chi^2_2$ $p$-value is conservative (too large)."),
];

const OD = "odds-and-log-odds";
const odds: Item[] = [
  // level 1
  m(OD, "t50-recall-expit", 1,
    "The inverse of the logit, $p = \\dfrac{e^{\\eta}}{1 + e^{\\eta}}$, is called the:",
    "Logistic (expit) function",
    [
      ["Probit function", "The probit is the inverse of the standard normal CDF, a different link."],
      ["Log odds", "The log odds is the logit itself, which maps $p$ to $\\eta$, not back."],
      ["Hazard function", "A hazard is an instantaneous event rate in survival analysis."],
    ]),
  m(OD, "t50-recall-odds-below-one", 1,
    "Odds less than $1$ correspond to log odds that are:",
    "Negative",
    [
      ["Between $0$ and $1$", "That confuses the range of odds or probabilities with the range of log odds."],
      ["Positive but small", "$\\log$ of a number below $1$ is below $0$."],
      ["Undefined", "The log of any positive odds is defined; only odds of $0$ give $-\\infty$."],
    ]),
  // level 7
  n(OD, "t50-combine-two-tests", 7,
    "A disease has prior probability $0.1$. A positive result on test A has likelihood ratio $9$, and a positive result on an independent test B has likelihood ratio $4$. Both are positive. Find the posterior probability of disease.",
    0.8),
  n(OD, "t50-combine-same-shift", 7,
    "A fixed increase $\\delta$ in log odds moves a probability from $0.2$ to $0.5$. Applying the same $\\delta$ to a probability of $0.5$ gives what probability?",
    0.8),
  s(OD, "t50-explain-coding-symmetry", 7,
    "Why does a model that is linear on the logit scale treat “success” and “failure” symmetrically, while a model linear on the $\\log p$ (log-risk) scale does not?",
    "Uses $\\text{logit}(1 - p) = -\\text{logit}(p)$: recoding the outcome just flips the signs of all coefficients and changes nothing else.",
    "Notes that $\\log p$ and $\\log(1 - p)$ have no such simple relation, so a log-linear model for $p$ is not log-linear for $1 - p$ (and can even push $p$ above $1$)."),
  // level 8
  s(OD, "t50-derive-normal-classes", 8,
    "Suppose $X \\mid Y = 1 \\sim \\mathcal{N}(\\mu_1, \\sigma^2)$ and $X \\mid Y = 0 \\sim \\mathcal{N}(\\mu_0, \\sigma^2)$ with $\\Pr(Y = 1) = \\pi$. Show that the log odds of $Y = 1$ given $X = x$ is linear in $x$, and give its slope.",
    "Writes the posterior log odds as $\\log\\dfrac{\\pi}{1 - \\pi}$ plus the log ratio of the two normal densities, and notes that the $x^2$ terms cancel because the variances are equal.",
    "Obtains slope $(\\mu_1 - \\mu_0)/\\sigma^2$ (with intercept $\\log\\dfrac{\\pi}{1 - \\pi} - \\dfrac{\\mu_1^2 - \\mu_0^2}{2\\sigma^2}$)."),
  n(OD, "t50-derive-normal-classes-value", 8,
    "With $X \\mid Y = 1 \\sim \\mathcal{N}(2, 1)$, $X \\mid Y = 0 \\sim \\mathcal{N}(0, 1)$ and $\\Pr(Y = 1) = 0.5$, find $\\Pr(Y = 1 \\mid X = 1.5)$. Give $4$ decimal places.",
    0.7311),
  // level 9
  s(OD, "t50-transfer-empirical-logit", 9,
    "For a binomial count $y$ out of $n$, the empirical logit is often computed as $\\log\\dfrac{y + 0.5}{n - y + 0.5}$, with approximate variance $\\dfrac{1}{np(1 - p)}$. Explain why the $0.5$ is added and where the variance comes from.",
    "Explains that the raw logit $\\log\\dfrac{y}{n - y}$ is infinite when $y = 0$ or $y = n$, and adding $0.5$ keeps it finite and reduces its bias.",
    "Derives the variance by the delta method: the logit’s derivative is $\\dfrac{1}{p(1 - p)}$ and $\\text{Var}(\\hat{p}) = \\dfrac{p(1 - p)}{n}$, giving $\\dfrac{1}{np(1 - p)}$."),
  // level 10
  n(OD, "t50-judge-combine-forecasters", 10,
    "Two forecasters start from the same base rate $0.6$ and update on independent pieces of evidence, ending at $0.8$ and $0.7$. Combining both pieces of evidence by Bayes’ rule (conditionally independent evidence), find the probability of the event. Give $4$ decimal places.",
    0.8615),
  s(OD, "t50-judge-constant-effect-scale", 10,
    "Studies in populations with very different baseline risks all report the same odds ratio. Explain why the same odds ratio implies different risk ratios and risk differences, and what this means for saying an effect is “the same” across the populations.",
    "Shows that the risk ratio $\\text{OR}/(1 - p_0 + p_0\\,\\text{OR})$ and the risk difference depend on the baseline risk $p_0$, so a constant odds ratio means a varying effect on the probability scales.",
    "Concludes that “same effect” is scale-dependent: one should choose the scale on which the effect is plausibly constant and report absolute effects at the relevant baseline risk."),
];

const LR = "logistic-regression";
const logistic: Item[] = [
  // level 1
  m(LR, "t50-recall-score-equations", 1,
    "The maximum-likelihood estimate in logistic regression solves the score equations:",
    "$\\sum_i (y_i - \\hat{p}_i)\\mathbf{x}_i = \\mathbf{0}$",
    [
      ["$\\sum_i (y_i - \\hat{p}_i)^2$ is minimised", "That is nonlinear least squares, not maximum likelihood."],
      ["$\\sum_i y_i\\mathbf{x}_i = \\mathbf{0}$", "The score involves the residuals $y_i - \\hat{p}_i$, not the responses alone."],
      ["$\\sum_i \\hat{p}_i(1 - \\hat{p}_i)\\mathbf{x}_i = \\mathbf{0}$", "$\\hat{p}_i(1 - \\hat{p}_i)$ are the IRLS weights, not the score."],
    ]),
  m(LR, "t50-recall-irls", 1,
    "Newton’s method for logistic regression is usually implemented as:",
    "Iteratively reweighted least squares with weights $\\hat{p}_i(1 - \\hat{p}_i)$",
    [
      ["A single OLS regression of $y$ on $\\mathbf{X}$", "OLS gives the linear probability model, not the logistic MLE."],
      ["Closed-form normal equations $\\mathbf{X}^{\\top}\\mathbf{X}\\mathbf{b} = \\mathbf{X}^{\\top}\\mathbf{y}$", "The logistic score equations are nonlinear in $\\mathbf{b}$ and have no closed form."],
      ["Gradient descent with weights $y_i$", "The weights come from the Bernoulli variance $\\hat{p}_i(1 - \\hat{p}_i)$, not from $y_i$."],
    ]),
  // level 2
  n(LR, "t50-apply-irls-weight", 2,
    "In IRLS for logistic regression an observation has current fitted probability $\\hat{p} = 0.3$. Find its weight $\\hat{p}(1 - \\hat{p})$.",
    0.21),
  // level 3
  n(LR, "t50-apply-working-response", 3,
    "The IRLS working response is $z = \\eta + \\dfrac{y - p}{p(1 - p)}$. Find $z$ for an observation with $y = 1$ at current $\\eta = 0$ (so $p = 0.5$).",
    2),
  // level 4
  n(LR, "t50-apply-prob-ci-lower", 4,
    "At $\\mathbf{x}_0$ a logistic model gives $\\hat{\\eta} = 0.4$ with standard error $0.5$. Transform the lower end of the $95\\%$ interval $\\hat{\\eta} - 1.96 \\times 0.5$ to the probability scale. Give $4$ decimal places.",
    0.3589),
  n(LR, "t50-apply-log-likelihood", 4,
    "Three observations have $y = (1, 0, 1)$ and fitted probabilities $\\hat{p} = (0.8, 0.4, 0.5)$. Find the Bernoulli log-likelihood $\\sum_i [y_i\\log\\hat{p}_i + (1 - y_i)\\log(1 - \\hat{p}_i)]$. Give $3$ decimal places.",
    -1.427),
  // level 5
  m(LR, "t50-apply-separation-example", 5,
    "Data: $x = 1, 2, 3, 4$ with $y = 0, 0, 1, 1$. A logistic regression of $y$ on $x$ (with intercept) is fitted. The slope MLE:",
    "Does not exist: it diverges to $+\\infty$ because a cut between $x = 2$ and $x = 3$ separates the classes perfectly",
    [
      ["Equals $1$, the slope of the least-squares line through the points", "That is not even the OLS slope ($0.4$), and the logistic likelihood has no finite maximiser here."],
      ["Is finite, but its standard error is infinite", "Under complete separation the estimate itself runs off to infinity."],
      ["Equals $0$, because four points carry no information", "The data strongly favour a positive slope; the problem is that no finite slope is best."],
    ]),
  // level 10
  s(LR, "t50-judge-transport-prevalence", 10,
    "A readmission model was fitted at a hospital where $10\\%$ of patients are readmitted and is now deployed at one with a $25\\%$ rate. Explain which parts of the model may transfer, how to recalibrate it, and how to check the result.",
    "Explains that the covariate log odds ratios may transfer, but the baseline differs, so predicted risks are miscalibrated; the intercept should shift (by about $\\text{logit}(0.25) - \\text{logit}(0.10)$, or be re-estimated).",
    "Recalibrates on local data (refit the intercept, or the intercept and a slope on the linear predictor) and checks with a calibration plot or calibration-in-the-large, noting that discrimination (AUC) may be unchanged."),
  s(LR, "t50-judge-lpm-vs-logit-rct", 10,
    "In a randomised trial with a binary outcome, you can report the OLS coefficient on treatment (with robust standard errors) or the logistic regression coefficient. Compare the two, including what happens when baseline covariates are added.",
    "States that with only a treatment dummy the OLS coefficient is exactly the difference in proportions (the average effect on the risk scale) and robust standard errors are valid, while the logistic coefficient is a log odds ratio; the two tests usually agree.",
    "Explains that the odds ratio is non-collapsible, so adding prognostic covariates changes the logistic coefficient even without confounding, while the risk difference keeps its meaning; the choice should follow the estimand."),
];

const OR = "odds-ratio";
const oddsRatio: Item[] = [
  // level 1
  m(OR, "t50-recall-risk-ratio", 1,
    "The risk ratio (relative risk) comparing exposed and unexposed groups with risks $p_1$ and $p_0$ is:",
    "$p_1/p_0$",
    [
      ["$\\dfrac{p_1/(1 - p_1)}{p_0/(1 - p_0)}$", "That is the odds ratio."],
      ["$p_1 - p_0$", "That is the risk difference."],
      ["$\\log(p_1/p_0)$", "That is the log risk ratio, not the ratio itself."],
    ]),
  m(OR, "t50-recall-table-or", 1,
    "A $2 \\times 2$ table has exposed cases $a$, exposed non-cases $b$, unexposed cases $c$ and unexposed non-cases $d$. The sample odds ratio is:",
    "$\\dfrac{ad}{bc}$",
    [
      ["$\\dfrac{a/(a + b)}{c/(c + d)}$", "That is the sample risk ratio."],
      ["$\\dfrac{a}{c}$", "This compares case counts and ignores the non-cases."],
      ["$\\dfrac{a + d}{b + c}$", "Odds ratios are cross-products of the cells, not sums."],
    ]),
  m(OR, "t50-recall-k-units", 1,
    "A logistic model has coefficient $\\beta$ on age in years. The odds ratio for a $k$-year increase in age is:",
    "$e^{k\\beta}$",
    [
      ["$k e^{\\beta}$", "Effects add on the log-odds scale, so odds ratios multiply; they do not scale linearly with $k$."],
      ["$e^{\\beta} + k$", "Adding $k$ has no basis on either the odds or log-odds scale."],
      ["$e^{\\beta/k}$", "That divides the effect instead of accumulating $k$ one-year effects."],
    ]),
  // level 4
  n(OR, "t50-apply-or-ci-lower", 4,
    "A $2 \\times 2$ table has $a = 15$, $b = 35$, $c = 5$, $d = 45$. Using $\\log\\text{OR} = \\log\\dfrac{ad}{bc}$ and standard error $\\sqrt{1/a + 1/b + 1/c + 1/d}$, find the lower end of the $95\\%$ confidence interval for the odds ratio (multiplier $1.96$). Give $3$ decimal places.",
    1.278),
  n(OR, "t50-apply-rr-from-or", 4,
    "The unexposed risk is $0.3$ and the odds ratio is $3$. Find the risk ratio. Give $3$ decimal places.",
    1.875),
  // level 7
  s(OR, "t50-explain-or-farther-than-rr", 7,
    "Explain why the odds ratio is always farther from $1$ than the risk ratio, and when the gap matters for communicating results.",
    "Uses $\\text{OR} = \\text{RR} \\times \\dfrac{1 - p_0}{1 - p_1}$: when $\\text{RR} > 1$ we have $p_1 > p_0$, so the factor exceeds $1$ and $\\text{OR} > \\text{RR}$ (and the reverse below $1$).",
    "Notes that the gap is negligible for rare outcomes but large for common ones, so reading an odds ratio as “times as likely” then overstates the effect."),
  // level 8
  n(OR, "t50-derive-noncollapsible", 8,
    "Two equal-sized strata, exposure assigned to half of each stratum (so no confounding). Stratum $1$ risks: unexposed $0.2$, exposed $1/3$. Stratum $2$: unexposed $0.5$, exposed $2/3$. Each stratum’s odds ratio is $2$. Find the marginal odds ratio from the pooled risks. Give $3$ decimal places.",
    1.857),
  s(OR, "t50-derive-log-or-se", 8,
    "Derive the large-sample standard error $\\sqrt{1/a + 1/b + 1/c + 1/d}$ of the log odds ratio from a $2 \\times 2$ table.",
    "Writes $\\log\\text{OR} = \\log a - \\log b - \\log c + \\log d$ and uses the delta method: for a count with mean $\\mu$ (Poisson-like), $\\text{Var}(\\log X) \\approx \\text{Var}(X)/\\mu^2 = 1/\\mu$.",
    "Adds the four variances because the cells are independent (or the within-row covariances cancel under binomial sampling), giving $1/a + 1/b + 1/c + 1/d$ with observed counts plugged in."),
  // level 9
  s(OR, "t50-transfer-matched-pairs", 9,
    "In a $1{:}1$ matched case–control study, explain why the conditional maximum-likelihood odds ratio equals the ratio of the two kinds of discordant pairs, and why concordant pairs carry no information.",
    "Explains that conditioning on each pair containing exactly one case removes the pair-specific intercept; for a concordant pair the conditional probability is $1$ whatever $\\beta$, so it drops out.",
    "Shows that each discordant pair contributes $e^{\\beta}/(1 + e^{\\beta})$ or $1/(1 + e^{\\beta})$, so the likelihood is binomial and $e^{\\hat{\\beta}} = n_{10}/n_{01}$ (case-exposed-only pairs over control-exposed-only pairs)."),
  // level 10
  s(OR, "t50-judge-absolute-effects", 10,
    "Two trials both report an odds ratio of $2$ for a harmful side effect; the control risk is $0.05$ in one and $0.5$ in the other. A policymaker wants the extra events per $100$ treated patients. Explain how the odds ratio translates in each trial and what you would report.",
    "Converts each: control odds $0.0526 \\to 0.105$, risk about $0.095$, so about $4.5$ extra events per $100$; control odds $1 \\to 2$, risk $0.667$, so about $16.7$ extra per $100$.",
    "Concludes that the same odds ratio gives very different absolute harm, so one should report risk differences (or numbers needed to harm) at the baseline risk relevant to the decision."),
];

const PB = "probit-regression";
const probit: Item[] = [
  // level 1
  m(PB, "t50-recall-model", 1,
    "The probit model specifies $\\Pr(Y = 1 \\mid \\mathbf{x})$ as:",
    "$\\Phi(\\mathbf{x}^{\\top}\\boldsymbol{\\beta})$",
    [
      ["$\\phi(\\mathbf{x}^{\\top}\\boldsymbol{\\beta})$", "$\\phi$ is the normal density, which is not a probability curve rising from $0$ to $1$."],
      ["$1/\\left(1 + e^{-\\mathbf{x}^{\\top}\\boldsymbol{\\beta}}\\right)$", "That is the logistic model."],
      ["$\\Phi^{-1}(\\mathbf{x}^{\\top}\\boldsymbol{\\beta})$", "$\\Phi^{-1}$ is the link, applied to the probability, not to the linear predictor."],
    ]),
  m(PB, "t50-recall-loglik", 1,
    "The probit log-likelihood, with $\\eta_i = \\mathbf{x}_i^{\\top}\\boldsymbol{\\beta}$, is:",
    "$\\sum_i \\left[y_i\\log\\Phi(\\eta_i) + (1 - y_i)\\log\\left(1 - \\Phi(\\eta_i)\\right)\\right]$",
    [
      ["$-\\sum_i \\left(y_i - \\Phi(\\eta_i)\\right)^2$", "That is a least-squares criterion, not the Bernoulli likelihood."],
      ["$\\sum_i y_i\\log\\phi(\\eta_i)$", "The likelihood uses the CDF probabilities, not the density."],
      ["$\\sum_i \\left[y_i\\eta_i - \\log(1 + e^{\\eta_i})\\right]$", "That is the logistic log-likelihood."],
    ]),
  m(PB, "t50-recall-bioassay", 1,
    "Probit analysis was introduced in bioassay (Bliss) to model:",
    "The proportion of organisms responding as a function of (log) dose, assuming normally distributed tolerances",
    [
      ["Survival times subject to censoring", "Censored survival times are handled by survival models such as Cox regression."],
      ["The number of responses per unit time", "Counts of events are modelled with Poisson regression."],
      ["Ordered rating categories", "Ordered categories use ordinal models (ordered probit came later as an extension)."],
    ]),
  m(PB, "t50-recall-glm", 1,
    "As a generalized linear model, probit regression has:",
    "A Bernoulli response and link $g(p) = \\Phi^{-1}(p)$",
    [
      ["A normal response and identity link", "That is ordinary linear regression."],
      ["A Bernoulli response and the canonical link", "The canonical Bernoulli link is the logit; the probit link is not canonical."],
      ["A Poisson response and log link", "That is Poisson regression for counts."],
    ]),
  // level 2
  m(PB, "t50-apply-ed50-condition", 2,
    "In the dose–response model $\\Pr(\\text{response}) = \\Phi(\\beta_0 + \\beta_1\\log d)$, the median effective dose ED50 satisfies:",
    "$\\beta_0 + \\beta_1\\log d = 0$, so $\\log\\text{ED50} = -\\beta_0/\\beta_1$",
    [
      ["$\\beta_0 + \\beta_1\\log d = 0.5$", "$0.5$ is the probability; the linear predictor at probability $0.5$ is $\\Phi^{-1}(0.5) = 0$."],
      ["$\\log\\text{ED50} = \\beta_0/\\beta_1$", "The sign is wrong: solving $\\beta_0 + \\beta_1\\log d = 0$ gives $-\\beta_0/\\beta_1$."],
      ["$\\text{ED50} = \\Phi(0.5)$", "This applies $\\Phi$ to a probability and ignores the coefficients."],
    ]),
  n(PB, "t50-apply-ed50-value", 2,
    "A probit dose–response fit is $\\Phi(-4 + 2\\log_{10} d)$. Find the dose $d$ at which the response probability is $0.5$.",
    100),
  // level 3
  n(PB, "t50-apply-prob", 3,
    "A probit model has linear predictor $-0.5 + 0.3x$. Using $\\Phi(1) = 0.8413$, find the predicted probability at $x = 5$.",
    0.8413),
  // level 4
  n(PB, "t50-apply-loglik-term", 4,
    "An observation with $y = 0$ has probit linear predictor $\\eta = 1$. Using $\\Phi(1) = 0.8413$, find its log-likelihood contribution $\\log\\left(1 - \\Phi(\\eta)\\right)$. Give $3$ decimal places.",
    -1.841),
  // level 5
  n(PB, "t50-apply-average-marginal-effect", 5,
    "A probit coefficient is $\\beta = 0.6$. Three units have linear predictors $0$, $1$ and $-1$, with $\\phi(0) = 0.3989$ and $\\phi(\\pm 1) = 0.2420$. Find the average marginal effect $\\beta \\cdot \\frac{1}{3}\\sum_i\\phi(\\eta_i)$. Give $4$ decimal places.",
    0.1766),
  m(PB, "t50-apply-tails", 5,
    "Probit and logit fits agree closely near $p = 0.5$. For a very large linear predictor, which model sends $\\Pr(Y = 0)$ to $0$ faster?",
    "Probit, because normal tails decay like $e^{-\\eta^2/2}$, faster than the logistic’s $e^{-\\eta}$",
    [
      ["Logit, because its coefficients are larger", "Larger logit coefficients just reflect the logistic’s larger scale; its tails are heavier."],
      ["Both at the same rate, since the fits agree", "Agreement in the middle does not imply agreement in the extreme tails."],
      ["It depends only on the sample size", "Tail decay is a property of the link’s distribution, not of $n$."],
    ]),
  m(PB, "t50-apply-double-coefficients", 5,
    "Every coefficient of a fitted probit model, intercept included, is doubled. The predicted probabilities:",
    "Move farther from $0.5$ (a steeper curve), while the set where $p = 0.5$ stays the same",
    [
      ["All double", "Probabilities pass through $\\Phi$, which is bounded by $1$; nothing doubles."],
      ["Do not change, since probit coefficients are identified only up to scale", "The scale is pinned by $\\text{Var}(\\varepsilon) = 1$, so changing $\\boldsymbol{\\beta}$ changes the fit."],
      ["Shift so that a different set of $\\mathbf{x}$ has $p = 0.5$", "$\\mathbf{x}^{\\top}\\boldsymbol{\\beta} = 0$ exactly when $\\mathbf{x}^{\\top}(2\\boldsymbol{\\beta}) = 0$."],
    ]),
  // level 9
  s(PB, "t50-transfer-bivariate-probit", 9,
    "Two binary outcomes come from correlated latent normals (a bivariate probit with error correlation $\\rho$). Explain what $\\rho$ captures and what you gain or lose by fitting two separate probits instead.",
    "Explains that $\\rho$ measures correlation between the latent errors, i.e. unobserved factors that push both outcomes together.",
    "Notes that each latent margin is still univariate normal, so separate probits estimate each $\\boldsymbol{\\beta}$ consistently, but they cannot give joint probabilities or $\\rho$ and are less efficient."),
  n(PB, "t50-transfer-omitted-normal", 9,
    "The latent model is $Y^* = \\beta x + \\gamma z + \\varepsilon$ with $\\varepsilon \\sim \\mathcal{N}(0, 1)$, $z \\sim \\mathcal{N}(0, 1)$ independent of $x$ and $\\varepsilon$, and $Y = \\mathbb{1}(Y^* > 0)$. With $\\beta = 1$ and $\\gamma = 1$, a probit of $Y$ on $x$ alone converges to what coefficient on $x$? Give $4$ decimal places.",
    0.7071),
];

const MO = "multinomial-and-ordinal-logistic";
const multinomial: Item[] = [
  // level 1
  m(MO, "t50-recall-baseline-coef", 1,
    "In a multinomial logit with reference category $K$, the coefficient $\\beta_{kj}$ is:",
    "The change in $\\log(\\pi_k/\\pi_K)$ per unit increase in $x_j$",
    [
      ["The change in $\\log\\left(\\pi_k/(1 - \\pi_k)\\right)$", "That is a separate binary logit of category $k$ against all others."],
      ["The change in $\\pi_k$", "Coefficients act on log probability ratios, not on probabilities."],
      ["The change in a cumulative log odds", "Cumulative log odds belong to the proportional odds model."],
    ]),
  // level 2
  n(MO, "t50-apply-category-prob", 2,
    "A $K = 3$ multinomial logit has linear predictors $\\eta_1 = \\log 2$, $\\eta_2 = \\log 3$ and $\\eta_3 = 0$ (reference). Find $\\pi_2$.",
    0.5),
  // level 3
  n(MO, "t50-apply-po-middle", 3,
    "A proportional odds model has $\\text{logit}\\Pr(y \\le k) = \\alpha_k - \\eta$ with $\\alpha_1 = 0$ and $\\alpha_2 = \\log 4$. Find $\\Pr(y = 2)$ at $\\eta = 0$.",
    0.3),
  // level 4
  n(MO, "t50-apply-ratio-two-categories", 4,
    "With category $3$ as reference, a covariate has $\\beta_1 = 0.5$ and $\\beta_2 = -0.2$. By what factor does a one-unit increase multiply $\\pi_1/\\pi_2$? Give $3$ decimal places.",
    2.014),
  // level 5
  m(MO, "t50-apply-iia-removal", 5,
    "A logit choice model gives car, bus and train probabilities $0.5$, $0.3$ and $0.2$. The train line closes. What does the model predict?",
    "Car $0.625$, bus $0.375$",
    [
      ["Car $0.6$, bus $0.4$", "This splits the train’s share equally; IIA keeps the car-to-bus ratio at $5{:}3$."],
      ["Car $0.7$, bus $0.3$", "This sends all train riders to the car; the logit model reallocates proportionally."],
      ["Car $0.5$, bus $0.3$", "Probabilities must still sum to $1$ after the train is removed."],
    ]),
  // level 6
  s(MO, "t50-explain-ordinal-vs-multinomial", 6,
    "An ordinal outcome has $5$ levels and there are $4$ covariates. Compare the multinomial logit and the proportional odds model in parameter count and interpretation, and say when you would still use the multinomial logit.",
    "Counts parameters: the multinomial logit has $(K - 1)(p + 1) = 4 \\times 5 = 20$, the proportional odds model $4$ cutpoints plus $4$ slopes $= 8$, with one cumulative odds ratio per covariate.",
    "Says the multinomial logit is still preferable when proportional odds clearly fails, e.g. covariate effects differ across thresholds or are non-monotone across the ordered levels."),
  // level 7
  n(MO, "t50-combine-po-top-change", 7,
    "A proportional odds model has $\\text{logit}\\Pr(y \\le k) = \\alpha_k - \\eta$ with cutpoints $\\alpha_1 = -1$ and $\\alpha_2 = 1$ ($3$ categories). Unit A has $\\eta = 0$, unit B has $\\eta = 1$. By how much does $\\Pr(y = 3)$ for B exceed that for A? Give $4$ decimal places.",
    0.2311),
  // level 8
  s(MO, "t50-derive-pairwise-logit", 8,
    "Show that in a multinomial logit the log odds of category $k$ versus category $l$ is linear in $\\mathbf{x}$ with coefficient $\\boldsymbol{\\beta}_k - \\boldsymbol{\\beta}_l$, and explain why a binary logit fitted only to units with $y \\in \\lbrace k, l\\rbrace$ estimates the same coefficients.",
    "Shows that the common denominator cancels in $\\pi_k/\\pi_l$, giving $\\log(\\pi_k/\\pi_l) = \\mathbf{x}^{\\top}(\\boldsymbol{\\beta}_k - \\boldsymbol{\\beta}_l)$.",
    "Notes that $\\Pr(y = k \\mid y \\in \\lbrace k, l\\rbrace, \\mathbf{x}) = \\text{expit}\\left(\\mathbf{x}^{\\top}(\\boldsymbol{\\beta}_k - \\boldsymbol{\\beta}_l)\\right)$, so the subset logit is consistent for the difference (though less efficient than the joint fit)."),
  // level 9
  s(MO, "t50-transfer-brand-deletion", 9,
    "A marketer fits a conditional logit to choices among $4$ cereal brands, two of which are near-identical, and uses it to forecast shares after one of the twins is discontinued. Explain the bias IIA creates and suggest two better models.",
    "Explains that the logit reallocates the discontinued brand’s share to all others in proportion to their shares, whereas in reality its close twin should absorb most of it, so the twin’s gain is understated and the others’ overstated.",
    "Suggests models that allow correlated utilities, such as nested logit (twins in one nest), mixed logit with random coefficients, or multinomial probit."),
  // level 10
  s(MO, "t50-judge-partial-po", 10,
    "In an ordinal outcome model one covariate violates proportional odds badly (its effect on the low threshold is positive, on the high threshold negative). Discuss the modelling options and a risk that comes with relaxing the assumption.",
    "Names options such as a partial proportional odds model (threshold-specific coefficients for that covariate only), a multinomial logit that ignores order, or other ordinal forms (continuation-ratio, adjacent-category).",
    "Warns that threshold-specific coefficients can make cumulative probabilities cross (negative category probabilities) for some $\\mathbf{x}$, so fitted probabilities must be checked over the covariate range, trading parsimony for fit."),
];

export const t50Regression21Items: Item[] = [
  ...loess,
  ...mixed,
  ...odds,
  ...logistic,
  ...oddsRatio,
  ...probit,
  ...multinomial,
];
