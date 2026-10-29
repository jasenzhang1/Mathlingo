import type { Item, SourceRef } from "../../lib/assessment/types";
import { makeBuilders, type Spec } from "./authoring";

/**
 * Interview drills for the Linear Models course: the χ², t and F results
 * behind OLS inference, and "what happens if" perturbations of the data —
 * duplicating rows or columns, adding or deleting points, dropping a
 * regressor, changing units, selecting the sample. They mirror the interview
 * bank's *OLS Sampling Distributions* and *Perturb the Data* scenarios.
 * Every numeric key was recomputed independently in Python.
 */
const AUTHORED: SourceRef = {
  id: "mathlingo-authored-linear-models-interview",
  tier: "generated",
  title: "Mathlingo authored item (Linear Models interview drills)",
};

const builders = makeBuilders(AUTHORED);
const { mcq, short } = builders;

/** Keys below one get half a unit in their last decimal, not the ±0.01 absolute floor. */
function precisionTolerance(key: number): number | undefined {
  if (Math.abs(key) >= 1 || key === 0) return undefined;
  const decimals = (key.toFixed(12).replace(/0+$/, "").split(".")[1] ?? "").length;
  return Math.min(0.01, 0.5 * 10 ** -decimals);
}

const num = (spec: Spec, answerKey: number, tolerance?: number) =>
  builders.num(spec, answerKey, tolerance ?? precisionTolerance(answerKey));

const m = (concept: string, slug: string, cognitive: Spec["cognitive"], level: number, seconds: number, stem: string) =>
  ({ concept, slug, cognitive, level, seconds, stem });

const GAUSS = "In $Y = \\mathbf{X}\\boldsymbol{\\beta} + \\boldsymbol{\\varepsilon}$ with $\\mathbf{X}$ of full column rank $p$ and $\\boldsymbol{\\varepsilon} \\sim \\mathcal{N}(\\mathbf{0}, \\sigma^2\\mathbf{I}_n)$, ";

const OP = "ols-properties";
const olsProperties: Item[] = [
  // level 4
  num(m(OP, "iv-var-sigma2", "apply", 4, 45,
    GAUSS + "$\\hat{\\sigma}^2 = \\text{SSE}/(n - p)$. With $\\sigma^2 = 4$ and $n - p = 20$, what is $\\text{Var}(\\hat{\\sigma}^2)$?"), 1.6),
  mcq(m(OP, "iv-dup-true-se", "apply", 4, 40,
    "You stack your data on top of itself (every row appears twice) and refit OLS. Compared with the original fit, the *true* sampling variance of $\\hat{\\boldsymbol{\\beta}}$ is:"),
    "Unchanged: the copies add no information, and their errors are perfectly correlated", [
      ["Halved, since $\\mathbf{X}^T\\mathbf{X}$ doubles", "iv-dup-halves-variance", "That is what the software reports, assuming $2n$ independent errors; the duplicated errors are identical, so the sandwich gives back $\\sigma^2(\\mathbf{X}^T\\mathbf{X})^{-1}$."],
      ["Doubled, since SSE doubles", "iv-dup-doubles-variance", "SSE doubles, but so do the df and $\\mathbf{X}^T\\mathbf{X}$; nothing about the estimator itself changes."],
      ["Undefined, because $\\mathbf{X}^T\\mathbf{X}$ becomes singular", "iv-dup-singular", "Duplicating rows keeps the column rank; $\\mathbf{X}^T\\mathbf{X}$ just doubles."],
    ]),
  // level 5
  num(m(OP, "iv-sigma2-ci-lower", "apply", 5, 60,
    GAUSS + "a fit with $n = 25$ and $p = 5$ gives $\\hat{\\sigma}^2 = 2$. Using the pivot $(n - p)\\hat{\\sigma}^2/\\sigma^2 \\sim \\chi^2_{n-p}$ and the upper quantile $\\chi^2_{20, 0.975} = 34.170$, compute the lower endpoint of the $95\\%$ confidence interval for $\\sigma^2$. Give $2$ decimal places."), 1.17),
  num(m(OP, "iv-dup-t-ratio", "apply", 5, 75,
    "An OLS fit has $n = 20$ observations and $p = 2$ parameters. You duplicate every row and refit on $40$ rows. By exactly what factor is each reported $t$-statistic multiplied? Give $3$ decimal places."), 1.453),
  num(m(OP, "iv-dup-f-ratio", "apply", 5, 75,
    "Same duplication ($n = 20$, $p = 2$, every row copied once). By what factor is the reported overall $F$-statistic multiplied? Give $3$ decimal places."), 2.111),
  // level 6
  num(m(OP, "iv-mse-divisor", "apply", 6, 90,
    GAUSS + "consider $\\text{SSE}/c$ as an estimator of $\\sigma^2$. With $n = 30$ and $p = 4$, which $c$ minimises its mean squared error?"), 28),
  num(m(OP, "iv-sigma-hat-bias", "apply", 6, 90,
    GAUSS + "with $n - p = 4$, compute $\\mathbb{E}[\\hat{\\sigma}]/\\sigma$, where $\\hat{\\sigma} = \\sqrt{\\text{SSE}/(n - p)}$. Use $\\mathbb{E}\\left[\\sqrt{\\chi^2_k}\\right] = \\sqrt{2}\\,\\Gamma\\left(\\frac{k + 1}{2}\\right)/\\Gamma\\left(\\frac{k}{2}\\right)$ and $\\Gamma(2.5) = 1.3293$. Give $2$ decimal places."), 0.94),
  short(m(OP, "iv-t-pivot", "explain", 6, 180,
    GAUSS + "prove that $\\frac{\\hat{\\beta}_j - \\beta_j}{\\hat{\\sigma}\\sqrt{c_{jj}}} \\sim t_{n-p}$, where $c_{jj} = [(\\mathbf{X}^T\\mathbf{X})^{-1}]_{jj}$."),
    [
      ["ingredients", "States $Z = (\\hat{\\beta}_j - \\beta_j)/(\\sigma\\sqrt{c_{jj}}) \\sim \\mathcal{N}(0, 1)$ and $V = (n - p)\\hat{\\sigma}^2/\\sigma^2 \\sim \\chi^2_{n-p}$.", 5, true],
      ["independence", "Uses the independence of $\\hat{\\boldsymbol{\\beta}}$ and $\\hat{\\sigma}^2$ to conclude $Z/\\sqrt{V/(n - p)} \\sim t_{n-p}$, with $\\sigma$ cancelling.", 4, true],
    ]),
  // level 7
  short(m(OP, "iv-sse-chi-square-proof", "explain", 7, 240,
    GAUSS + "prove that $\\text{SSE}/\\sigma^2 \\sim \\chi^2_{n-p}$."),
    [
      ["quadratic-form", "Writes $\\text{SSE} = \\boldsymbol{\\varepsilon}^T\\mathbf{M}\\boldsymbol{\\varepsilon}$ with $\\mathbf{M} = \\mathbf{I} - \\mathbf{H}$ symmetric idempotent of rank $\\text{tr}(\\mathbf{M}) = n - p$.", 5, true],
      ["rotation", "Diagonalises $\\mathbf{M} = \\mathbf{Q}\\boldsymbol{\\Lambda}\\mathbf{Q}^T$ (eigenvalues $0$ or $1$), notes $\\mathbf{Q}^T\\boldsymbol{\\varepsilon}/\\sigma \\sim \\mathcal{N}(\\mathbf{0}, \\mathbf{I})$, so SSE$/\\sigma^2$ is a sum of $n - p$ squared standard normals.", 4, true],
    ]),
  mcq(m(OP, "iv-variance-ci-robust", "apply", 7, 60,
    "The errors are i.i.d. with mean $0$ and finite fourth moment but heavy tails, and $n$ is large. Which classical procedure remains badly miscalibrated however large $n$ gets?"),
    "The $\\chi^2$ confidence interval for $\\sigma^2$", [
      ["The $t$-interval for a slope", "iv-robust-t", "By the CLT $\\hat{\\boldsymbol{\\beta}}$ is asymptotically normal and $\\hat{\\sigma}^2$ is consistent, so $t$-intervals become valid."],
      ["The overall $F$-test of the slopes", "iv-robust-f", "Under the null, $qF \\Rightarrow \\chi^2_q$ whatever the error distribution, provided the leverages vanish."],
      ["The prediction of $\\mathbb{E}[y \\mid \\mathbf{x}_0]$", "iv-robust-mean", "A confidence interval for the mean response is a $t$-interval for a linear combination of $\\hat{\\boldsymbol{\\beta}}$, so it is asymptotically valid."],
    ]),
  // level 9
  short(m(OP, "iv-divisor-comparison", "transfer", 9, 300,
    GAUSS + "compare $\\text{SSE}/n$ (the MLE), $\\text{SSE}/(n - p)$ and $\\text{SSE}/(n - p + 2)$ as estimators of $\\sigma^2$. Which is unbiased, which has the smallest MSE, and why might you still report the unbiased one?"),
    [
      ["mse", "Shows (or states) the MSE of $\\text{SSE}/c$ is $\\sigma^4[(k^2 + 2k)/c^2 - 2k/c + 1]$ with $k = n - p$, minimised at $c = k + 2$; $c = k$ is unbiased with MSE $2\\sigma^4/k$; the MLE is biased down by $p\\sigma^2/n$.", 5, true],
      ["judgement", "Explains that $\\hat{\\sigma}^2 = \\text{SSE}/(n - p)$ is the one that makes the $t$ and $F$ pivots exact, so it is reported for inference even though it is not MSE-optimal.", 4, true],
    ]),
];

const GLH = "general-linear-hypothesis";
const linearHypothesis: Item[] = [
  // level 3
  num(m(GLH, "iv-overall-f-from-r2", "apply", 3, 40,
    "A regression with an intercept and $4$ slopes on $n = 50$ observations has $R^2 = 0.30$. Compute the overall $F$-statistic. Give $3$ decimal places."), 4.821),
  // level 4
  num(m(GLH, "iv-null-mean-f", "apply", 4, 45,
    "Under $H_0$ an $F$-statistic follows $F_{3, 20}$. What is its expected value? Give $3$ decimal places."), 1.111),
  // level 6
  num(m(GLH, "iv-noncentrality", "apply", 6, 75,
    "In simple regression with Gaussian errors, the $F$-test of $\\beta_1 = 0$ follows $F_{1, n-2}(\\lambda)$ under the alternative, with $\\mathbb{E}[\\chi^2_1(\\lambda)] = 1 + \\lambda$. With $\\beta_1 = 0.5$, $\\sigma = 2$ and $S_{xx} = 64$, what is $\\lambda$?"), 4),
  // level 7
  mcq(m(GLH, "iv-wald-lr-lm-order", "apply", 7, 75,
    "In the Gaussian linear model with $\\sigma^2$ estimated by maximum likelihood under each model, the Wald ($W$), likelihood-ratio ($LR$) and score ($LM$) statistics for $q$ linear restrictions satisfy:"),
    "$W \\ge LR \\ge LM$, and all three are increasing functions of the $F$-statistic", [
      ["$W = LR = LM$ exactly", "iv-wlrlm-equal", "They are asymptotically equivalent, but with $u = (\\text{SSE}_R - \\text{SSE})/\\text{SSE}$ they are $nu$, $n\\log(1 + u)$ and $nu/(1 + u)$."],
      ["$LM \\ge LR \\ge W$", "iv-wlrlm-reversed", "Since $u/(1 + u) \\le \\log(1 + u) \\le u$, the ordering runs the other way."],
      ["They can order differently depending on the data", "iv-wlrlm-data", "In this model the ordering $W \\ge LR \\ge LM$ holds for every data set."],
    ]),
  num(m(GLH, "iv-fwl-se-factor", "apply", 7, 90,
    "With $n = 30$ and $p = 5$ (including an intercept), you residualise $Y$ and $\\mathbf{x}_5$ on the other four columns and regress $\\tilde{Y}$ on $\\tilde{\\mathbf{x}}_5$ without an intercept. The slope equals $\\hat{\\beta}_5$, but the software divides SSE by $n - 1$. By what factor is the reported standard error off (reported over correct)? Give $4$ decimal places."), 0.9285),
  // level 8
  num(m(GLH, "iv-lr-from-f", "apply", 8, 120,
    "In the Gaussian linear model, the likelihood-ratio statistic for $q$ linear restrictions is $n\\log(\\text{SSE}_R/\\text{SSE}) = n\\log\\left(1 + \\frac{qF}{n - p}\\right)$. With $n = 40$, $q = 2$, $n - p = 36$ and $F = 4.5$, compute it. Give $4$ decimal places."), 8.9257),
  short(m(GLH, "iv-f-distribution-proof", "transfer", 8, 300,
    GAUSS + "show that $F = \\frac{(\\mathbf{C}\\hat{\\boldsymbol{\\beta}} - \\mathbf{d})^T[\\mathbf{C}(\\mathbf{X}^T\\mathbf{X})^{-1}\\mathbf{C}^T]^{-1}(\\mathbf{C}\\hat{\\boldsymbol{\\beta}} - \\mathbf{d})}{q\\hat{\\sigma}^2} \\sim F_{q, n-p}$ under $H_0: \\mathbf{C}\\boldsymbol{\\beta} = \\mathbf{d}$, with $\\mathbf{C}$ of full row rank $q$."),
    [
      ["numerator", "Notes $\\mathbf{C}\\hat{\\boldsymbol{\\beta}} - \\mathbf{d} \\sim \\mathcal{N}(\\mathbf{0}, \\sigma^2\\mathbf{C}(\\mathbf{X}^T\\mathbf{X})^{-1}\\mathbf{C}^T)$ under $H_0$, so the quadratic form over $\\sigma^2$ is $\\chi^2_q$ (whitening by the inverse covariance).", 5, true],
      ["ratio", "Combines it with the independent $\\text{SSE}/\\sigma^2 \\sim \\chi^2_{n-p}$, so the ratio of the two scaled by their df is $F_{q,n-p}$ and $\\sigma^2$ cancels.", 4, true],
    ]),
];

const EA = "effect-of-adding-another-variable";
const addingVariables: Item[] = [
  // level 3
  mcq(m(EA, "iv-add-residuals", "apply", 3, 40,
    "After regressing $\\mathbf{y}$ on $\\mathbf{X}$, you add the residual vector $\\mathbf{e}$ as an extra column and refit. What do you get?"),
    "The same coefficients on $\\mathbf{X}$, a coefficient of $1$ on $\\mathbf{e}$, and $R^2 = 1$", [
      ["The same fit; $\\mathbf{e}$ gets coefficient $0$ because it is orthogonal to $\\mathbf{X}$", "iv-resid-zero", "$\\mathbf{e}$ is orthogonal to $\\mathbf{X}$ but not to $\\mathbf{y}$: $\\mathbf{y} = \\mathbf{X}\\hat{\\boldsymbol{\\beta}} + 1\\cdot\\mathbf{e}$ exactly."],
      ["A singular design, so the fit fails", "iv-resid-singular", "$\\mathbf{e}$ lies outside $C(\\mathbf{X})$ (unless the fit was perfect), so the design keeps full rank."],
      ["New coefficients on $\\mathbf{X}$, since adding a column always changes them", "iv-resid-shift", "A new column orthogonal to $C(\\mathbf{X})$ leaves the existing coefficients unchanged."],
    ]),
  // level 4
  mcq(m(EA, "iv-r2-unchanged", "apply", 4, 45,
    "Adding a regressor $\\mathbf{z}$ (not collinear with $\\mathbf{X}$) leaves $R^2$ exactly unchanged. What follows?"),
    "Its coefficient is exactly $0$ and the other coefficients are unchanged", [
      ["$\\mathbf{z}$ is uncorrelated with $\\mathbf{y}$", "iv-r2-uncorrelated-y", "What matters is the part of $\\mathbf{z}$ orthogonal to $\\mathbf{X}$ being orthogonal to the residuals; $\\mathbf{z}$ itself can correlate with $\\mathbf{y}$ through $\\mathbf{X}$."],
      ["$\\mathbf{z}$ is orthogonal to every column of $\\mathbf{X}$", "iv-r2-orthogonal-x", "Orthogonality to $\\mathbf{X}$ leaves the other coefficients alone, but $R^2$ would still rise unless $\\mathbf{z} \\perp \\mathbf{e}$."],
      ["Adjusted $R^2$ is also unchanged", "iv-r2-adjusted", "Adjusted $R^2$ falls, because a degree of freedom was spent for nothing."],
    ]),
  num(m(EA, "iv-short-long-slope", "apply", 4, 60,
    "The long regression of $y$ on an intercept, $x_1$ and $x_2$ gives $\\hat{\\beta}_1 = 0.5$ and $\\hat{\\beta}_2 = 2$; regressing $x_2$ on an intercept and $x_1$ gives slope $0.3$. What slope does the short regression of $y$ on an intercept and $x_1$ give?"), 1.1),
  // level 5
  mcq(m(EA, "iv-drop-orthogonal-direction", "apply", 5, 60,
    "A column $\\mathbf{x}_k$ is orthogonal to all other columns and has $\\lvert t_k\\rvert = 0.6$. You drop it. The $t$-statistics of the other coefficients:"),
    "Rise, because $\\hat{\\sigma}^2$ falls when $\\lvert t_k\\rvert < 1$", [
      ["Stay the same, because orthogonality leaves everything unchanged", "iv-orth-unchanged", "The coefficients are unchanged, but $\\hat{\\sigma}^2$ is multiplied by $(n - p + t_k^2)/(n - p + 1)$."],
      ["Fall, because SSE rises", "iv-orth-fall", "SSE rises by $t_k^2\\hat{\\sigma}^2$ but the df rise by $1$; with $t_k^2 < 1$, $\\hat{\\sigma}^2$ falls."],
      ["Change sign", "iv-orth-sign", "The coefficients themselves do not move when an orthogonal column is dropped."],
    ]),
  num(m(EA, "iv-t-to-partial-r2", "apply", 5, 60,
    "A coefficient has $t = 3$ with $n - p = 27$ residual df. Using partial $R^2 = \\frac{t^2}{t^2 + (n - p)}$, compute the partial $R^2$ of that regressor."), 0.25),
  // level 6
  num(m(EA, "iv-drop-orthogonal-factor", "apply", 6, 90,
    "In a fit with $n - p = 20$, column $\\mathbf{x}_k$ is orthogonal to every other column (including the intercept) and has $t_k = 3$. You drop it. By what factor are the other coefficients’ $t$-statistics multiplied? Give $3$ decimal places."), 0.851),
  // level 7
  num(m(EA, "iv-duplicate-column-ridge", "apply", 7, 120,
    "You include the regressor $\\mathbf{x}$ twice (no other columns), with $\\mathbf{x}^T\\mathbf{y} = 10$ and $\\mathbf{x}^T\\mathbf{x} = 5$, and fit ridge regression with $\\lambda = 2$. What coefficient does each copy receive? Give $4$ decimal places."), 0.8333),
  // level 8
  short(m(EA, "iv-add-orthogonal-control", "transfer", 8, 240,
    "In a randomised experiment the treatment dummy is (in sample) exactly orthogonal to a strong pre-treatment covariate. Explain what adding the covariate does to the treatment coefficient, to its standard error, and why."),
    [
      ["coefficient", "States that the treatment coefficient is unchanged, because the new column is orthogonal to it (FWL: residualising on an orthogonal column changes nothing).", 5, true],
      ["precision", "Explains that the covariate absorbs outcome variance, so SSE and $\\hat{\\sigma}^2$ fall and the standard error shrinks — provided its $\\lvert t\\rvert > 1$, since it also costs a degree of freedom.", 4, true],
    ]),
];

const OL = "outliers-leverage-influence";
const leverage: Item[] = [
  // level 4
  num(m(OL, "iv-point-at-mean", "apply", 4, 60,
    "A simple regression is fitted to $n = 10$ points. You add an 11th point at $x = \\bar{x}$ with $y = \\bar{y} + 5$. The slope does not change. By how much does the intercept increase? Give $4$ decimal places."), 0.4545),
  num(m(OL, "iv-zero-residual-delete", "apply", 4, 60,
    "In a fit with $n = 22$ and $p = 2$, observation $i$ has residual exactly $0$. You delete it and refit. By what factor is $\\hat{\\sigma}^2 = \\text{SSE}/(n - p)$ multiplied? Give $4$ decimal places."), 1.0526),
  // level 5
  mcq(m(OL, "iv-point-on-line", "apply", 5, 60,
    "You add one far-out observation $(\\mathbf{x}_0, y_0)$ lying exactly on the fitted surface, $y_0 = \\mathbf{x}_0^T\\hat{\\boldsymbol{\\beta}}$. What happens?"),
    "$\\hat{\\boldsymbol{\\beta}}$ is unchanged, the standard errors shrink, and $R^2$ rises", [
      ["$\\hat{\\boldsymbol{\\beta}}$ changes a lot, because the point has high leverage", "iv-online-moves", "Influence is residual times leverage; with a zero residual the normal equations still hold at the old $\\hat{\\boldsymbol{\\beta}}$."],
      ["Nothing changes at all", "iv-online-nothing", "$\\mathbf{X}^T\\mathbf{X}$ grows by $\\mathbf{x}_0\\mathbf{x}_0^T$ and the df rise, so the standard errors shrink, and SST grows."],
      ["$R^2$ falls, because the point is an outlier in $x$", "iv-online-r2-falls", "SSE is unchanged while SST grows, so $R^2$ rises."],
    ]),
  mcq(m(OL, "iv-external-t-df", "recall", 5, 40,
    "With Gaussian errors, the externally studentised residual $t_i = e_i/(\\hat{\\sigma}_{(i)}\\sqrt{1 - h_{ii}})$ follows:"),
    "$t_{n-p-1}$ exactly", [
      ["$t_{n-p}$", "iv-ext-df-n-p", "Deleting point $i$ leaves $n - 1$ observations and $p$ parameters, so $\\hat{\\sigma}_{(i)}$ has $n - p - 1$ df."],
      ["$\\mathcal{N}(0, 1)$ exactly", "iv-ext-normal", "$\\hat{\\sigma}_{(i)}$ is estimated, which gives a $t$ rather than a normal."],
      ["A scaled Beta distribution, bounded by $\\sqrt{n - p}$", "iv-ext-beta", "That describes the *internally* studentised residual, whose numerator also appears in $\\hat{\\sigma}$."],
    ]),
  // level 6
  num(m(OL, "iv-k-copies-residual", "apply", 6, 90,
    "Observation $i$ has residual $e_i = 2$ and leverage $h_{ii} = 0.1$. You append $k = 10$ extra copies of that row and refit. Using $e_i^{\\text{new}} = \\frac{e_i}{1 + k h_{ii}}$, what is the new residual at $\\mathbf{x}_i$?"), 1),
  // level 7
  num(m(OL, "iv-studentized-bound", "apply", 7, 90,
    "The internally studentised residual is $r_i = e_i/(\\hat{\\sigma}\\sqrt{1 - h_{ii}})$, and $r_i^2/(n - p)$ follows a Beta distribution on $[0, 1]$. With $n - p = 16$, what is the largest possible value of $\\lvert r_i\\rvert$?"), 4),
  // level 8
  short(m(OL, "iv-internal-not-t", "transfer", 8, 240,
    "Why is the internally studentised residual $r_i = e_i/(\\hat{\\sigma}\\sqrt{1 - h_{ii}})$ not $t$-distributed, while the externally studentised $t_i$ (using $\\hat{\\sigma}_{(i)}$) is?"),
    [
      ["dependence", "Explains that $e_i$ enters $\\hat{\\sigma}$ itself (SSE $= e_i^2/(1 - h_{ii}) + \\text{SSE}_{(i)}$), so numerator and denominator are dependent and $\\lvert r_i\\rvert \\le \\sqrt{n - p}$; $r_i^2/(n - p) \\sim \\text{Beta}(\\tfrac{1}{2}, \\tfrac{n - p - 1}{2})$.", 5, true],
      ["fix", "Explains that $\\text{SSE}_{(i)}$ is independent of $e_i$, so using $\\hat{\\sigma}_{(i)}$ gives a normal over an independent $\\sqrt{\\chi^2_{n-p-1}/(n - p - 1)}$: an exact $t_{n-p-1}$.", 4, true],
    ]),
];

const CS = "centering-and-scaling";
const centering: Item[] = [
  // level 3
  mcq(m(CS, "iv-units-change", "apply", 3, 40,
    "You re-express $y$ in cents ($100y$) and $x_j$ in thousands ($x_j/1{,}000$), keeping the intercept. Which quantity is unchanged?"),
    "The $t$-statistic of $\\hat{\\beta}_j$", [
      ["$\\hat{\\beta}_j$", "iv-units-beta", "$\\hat{\\beta}_j$ is multiplied by $100 \\times 1{,}000 = 10^5$."],
      ["$\\hat{\\sigma}$", "iv-units-sigma", "$\\hat{\\sigma}$ is in units of $y$, so it is multiplied by $100$."],
      ["The standard error of $\\hat{\\beta}_j$", "iv-units-se", "The standard error scales with $\\hat{\\beta}_j$, by $10^5$; only their ratio is unit-free."],
    ]),
  // level 4
  num(m(CS, "iv-y-minus-x", "apply", 4, 60,
    "Regressing $y$ on $x$ (with an intercept) gives slope $1.3$ with standard error $0.1$. What $t$-statistic does the slope have if you instead regress $y - x$ on $x$?"), 3),
  // level 5
  num(m(CS, "iv-intercept-slope-corr", "apply", 5, 75,
    "In simple regression with homoskedastic errors, $\\text{Corr}(\\hat{\\beta}_0, \\hat{\\beta}_1) = -\\bar{x}\\big/\\sqrt{\\tfrac{1}{n}\\sum_i x_i^2}$. With $\\bar{x} = 3$ and $\\frac{1}{n}\\sum_i x_i^2 = 10$, compute it. Give $4$ decimal places."), -0.9487),
  // level 6
  num(m(CS, "iv-band-factor", "apply", 6, 75,
    "In simple regression, $\\text{Var}(\\hat{\\beta}_0 + \\hat{\\beta}_1 x_0) = \\sigma^2\\left(\\frac{1}{n} + \\frac{(x_0 - \\bar{x})^2}{S_{xx}}\\right)$. With $s_x^2 = S_{xx}/n$, by what factor is the standard error at $x_0 = \\bar{x} + 2s_x$ larger than at $\\bar{x}$? Give $3$ decimal places."), 2.236),
  // level 7
  short(m(CS, "iv-y-minus-x-r2", "explain", 7, 180,
    "Regressing $y$ on $x$ and regressing $y - x$ on $x$ give identical residuals. Explain why their $R^2$ values can still differ, and what the second regression is useful for."),
    [
      ["sst", "Explains that $R^2 = 1 - \\text{SSE}/\\text{SST}$ and the SST of $y - x$ differs from that of $y$, so the same SSE gives a different $R^2$; $R^2$ depends on what is called the response.", 5, true],
      ["use", "Notes the slope shifts by $1$ with the same standard error, so its $t$-statistic tests $\\beta_1 = 1$ directly (e.g. a hedge ratio or pass-through of one).", 4, true],
    ]),
];

const MB = "misspecification-bias";
const selection: Item[] = [
  // level 6
  mcq(m(MB, "iv-select-on-y", "apply", 6, 75,
    "The model $y = \\beta_0 + \\beta_1 x + \\varepsilon$ holds with $\\mathbb{E}[\\varepsilon \\mid x] = 0$ and $\\beta_1 > 0$. You keep only observations with $y \\le c$ and run OLS. The slope estimate is:"),
    "Biased toward zero, because at high $x$ only observations with very negative errors survive", [
      ["Unbiased, since dropping observations only costs precision", "iv-select-y-unbiased", "That is true for selection on $x$; selecting on $y$ makes $\\mathbb{E}[\\varepsilon \\mid x, \\text{kept}]$ decrease in $x$."],
      ["Biased away from zero", "iv-select-y-away", "The kept errors become negatively correlated with $x$, which flattens the line."],
      ["Unbiased but with a biased intercept only", "iv-select-y-intercept", "The truncation point depends on $x$, so the bias is not a constant shift."],
    ]),
  // level 8
  short(m(MB, "iv-select-x-vs-y", "transfer", 8, 240,
    "Explain why dropping all observations with $x > c$ leaves OLS unbiased, while dropping all observations with $y > c$ does not. Give a finance example of the second."),
    [
      ["mechanism", "Explains that selecting on $x$ conditions only on the regressor, so $\\mathbb{E}[\\varepsilon \\mid x] = 0$ still holds (at a cost in variance), while selecting on $y$ conditions on $\\varepsilon \\le c - \\beta_0 - \\beta_1 x$, which correlates the kept errors with $x$ (truncation bias).", 5, true],
      ["example", "Gives a valid example of selection on the outcome, e.g. survivorship (only funds or stocks that survived), approved loans only, or trades that were filled.", 4, true],
    ]),
];

export const linearModelsInterviewItems: Item[] = [
  ...olsProperties,
  ...linearHypothesis,
  ...addingVariables,
  ...leverage,
  ...centering,
  ...selection,
];
