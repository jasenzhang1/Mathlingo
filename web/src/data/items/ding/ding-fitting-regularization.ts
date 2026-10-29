import type { Item } from "../../../lib/assessment/types";
import { chapter } from "./shared";

/**
 * Ding Parts IV–VI (Ch. 10–16, 18–19): R² and partial R², leverage and
 * leave-one-out formulas, population OLS and conformal prediction, overfitting,
 * ridge, lasso, transformations, restricted OLS and weighted least squares.
 * Ch. 17 (interactions) has its own lesson in ./ding-interactions.ts.
 */

const R2 = "r-squared";
const OLI = "outliers-leverage-influence";
const CDD = "case-deletion-diagnostics";
const UPD = "updating-and-sweep-operator";
const MB = "misspecification-bias";
const EIV = "errors-in-variables";
const OLSP = "ols-properties";
const VIF = "vif";
const SSC = "subset-selection-criteria";
const PSI = "post-selection-inference";
const POLY = "polynomial-regression";
const RR = "ridge-regression";
const LA = "lasso";
const BC = "box-cox-transformation";
const TPR = "two-phase-regression";
const RLS = "restricted-least-squares";
const WLS = "weighted-least-squares";
const GLS = "generalized-least-squares";
const LOESS = "loess-smoothing";

// --- Ch. 10 · Multiple Correlation Coefficient ----------------------------------
const c10 = chapter("Ch. 10, Multiple Correlation Coefficient");
const ch10: Item[] = [
  c10.m(R2, "ding-r2-correlation", 2, "With an intercept in the model, $R^2$ equals:",
    "The squared sample correlation between $y$ and the fitted values $\\hat{y}$", [
      ["The correlation between $y$ and $\\hat{y}$, unsquared", "$R^2$ is the square of that correlation."],
      ["The squared correlation between $y$ and the residuals", "With an intercept, residuals are uncorrelated with $\\hat{y}$, not with $y$; that quantity is $1 - R^2$."],
      ["The average squared correlation between $y$ and each covariate", "That ignores the correlation among covariates."],
    ]),
  c10.n(R2, "ding-F-from-R2", 4,
    "The overall $F$-statistic satisfies $F = \\frac{R^2/(p - 1)}{(1 - R^2)/(n - p)}$, where $p$ counts the intercept. Compute $F$ for $R^2 = 0.3$, $n = 54$ and $p = 4$. Give $2$ decimal places.",
    7.14),
  c10.n(R2, "ding-partial-R2", 5,
    "The partial $R^2$ of $Y$ on $X$ given $W$ is $\\frac{\\text{RSS}(Y \\sim 1 + W) - \\text{RSS}(Y \\sim 1 + X + W)}{\\text{RSS}(Y \\sim 1 + W)}$, which equals $\\frac{R^2_{Y.XW} - R^2_{Y.W}}{1 - R^2_{Y.W}}$. With $R^2_{Y.XW} = 0.5$ and $R^2_{Y.W} = 0.2$, compute it. Give $3$ decimal places.",
    0.375),
  c10.n(R2, "ding-null-r2-mean", 6,
    "Under the Normal linear model with all slopes zero, $R^2 \\sim \\text{Beta}\\left(\\frac{p - 1}{2}, \\frac{n - p}{2}\\right)$, so $\\mathbb{E}(R^2) = \\frac{p - 1}{n - 1}$. What is $\\mathbb{E}(R^2)$ for pure-noise regressors with $n = 41$ and $p = 11$ (counting the intercept)?",
    0.25),
  c10.m(R2, "ding-partial-R2-identity", 7, "Which identity relating $R^2_{Y.XW}$, $R^2_{Y.W}$ and the partial $R^2_{Y.X|W}$ holds in general?",
    "$1 - R^2_{Y.XW} = (1 - R^2_{Y.W})(1 - R^2_{Y.X|W})$", [
      ["$R^2_{Y.XW} = R^2_{Y.W} + R^2_{Y.X|W}$", "Partial $R^2$ is relative to the variation left after $W$, so the pieces do not add on the original scale."],
      ["$R^2_{Y.XW} = R^2_{Y.W|X} + R^2_{Y.X|W}$", "The two partial $R^2$ values are on different bases and can sum to more than $R^2_{Y.XW}$."],
      ["$R^2_{Y.XW} = R^2_{Y.W} R^2_{Y.X|W}$", "It is the unexplained fractions that multiply, not the explained ones."],
    ]),
  c10.s(R2, "ding-sensitivity-partial-r2", 9,
    "Cinelli and Hazlett write omitted-variable bias as $|\\tilde{\\beta}_1 - \\hat{\\beta}_1|^2 = R^2_{Y.U|ZX} \\cdot \\frac{R^2_{Z.U|X}}{1 - R^2_{Z.U|X}} \\cdot \\frac{\\text{RSS}(Y \\sim 1 + Z + X)}{\\text{RSS}(Z \\sim 1 + X)}$ for an unobserved confounder $U$. Why is this more useful for sensitivity analysis than the product form $\\hat{\\gamma}_3\\hat{\\delta}_1$?",
    "Explains that the product form depends on the arbitrary, unknown scale of $U$, whereas the two partial $R^2$ values are scale-free proportions of variance that researchers can reason about.",
    "Notes that the third factor is estimable from the observed data, so one can tabulate how strong the confounder–outcome and confounder–treatment associations must be to explain the estimate away, and benchmark them against observed covariates."),
];

// --- Ch. 11 · Leverage Scores and Leave-One-Out Formulas -------------------------
const c11 = chapter("Ch. 11, Leverage Scores and Leave-One-Out Formulas");
const ch11: Item[] = [
  c11.n(OLI, "ding-average-leverage", 2,
    "A regression with $n = 50$ observations and $p = 5$ columns (including the intercept). What is the average leverage $\\frac{1}{n}\\sum_i h_{ii}$?",
    0.1),
  c11.m(OLI, "ding-leverage-bounds", 3, "With an intercept in the model, every leverage satisfies:",
    "$1/n \\le h_{ii} \\le 1$", [
      ["$0 \\le h_{ii} \\le p/n$", "$p/n$ is the average leverage, not a maximum."],
      ["$1/n \\le h_{ii} \\le p$", "$h_{ii}$ is a diagonal entry of a projection, so it is at most $1$."],
      ["$h_{ii} = p/n$ for every $i$", "Equal leverages need a very special design; in general they vary."],
    ]),
  c11.n(CDD, "ding-loo-residual", 3,
    "An observation has residual $\\hat{\\varepsilon}_i = 1.2$ and leverage $h_{ii} = 0.4$. Its leave-one-out prediction error is $y_i - \\mathbf{x}_i^{\\top}\\hat{\\boldsymbol{\\beta}}_{[-i]} = \\hat{\\varepsilon}_i/(1 - h_{ii})$. Compute it.",
    2),
  c11.n(CDD, "ding-jackknife-weight", 5,
    "The full-data coefficient is a weighted average of the leave-one-out coefficients, $\\hat{\\boldsymbol{\\beta}} = \\sum_i w_i\\hat{\\boldsymbol{\\beta}}_{[-i]}$, with $w_i = (1 - h_{ii})/(n - p)$. With $n = 10$ and $p = 2$, what weight does an observation with $h_{ii} = 0.3$ get? Give $4$ decimal places.",
    0.0875),
  c11.m(CDD, "ding-jackknife-average", 6, "Is $\\hat{\\boldsymbol{\\beta}}$ the simple average $n^{-1}\\sum_i \\hat{\\boldsymbol{\\beta}}_{[-i]}$ of the leave-one-out coefficients?",
    "Not in general; it is the weighted average with weights $(1 - h_{ii})/(n - p)$, which equals the simple average only when all leverages are equal", [
      ["Yes, always", "$\\hat{\\boldsymbol{\\beta}}_{[-i]} = \\hat{\\boldsymbol{\\beta}} - (X^{\\top}X)^{-1}\\mathbf{x}_i\\hat{\\varepsilon}_i/(1 - h_{ii})$, and the corrections do not cancel under equal weights."],
      ["No; there is no exact relation", "Weights $(1 - h_{ii})$ make the corrections sum to $(X^{\\top}X)^{-1}\\sum_i \\mathbf{x}_i\\hat{\\varepsilon}_i = \\mathbf{0}$."],
      ["Only when the errors are Normal", "The relation is algebraic and needs no distribution."],
    ]),
  c11.n(CDD, "ding-sigma-loo", 6,
    "Leaving observation $i$ out changes the variance estimate by $(n - p - 1)\\hat{\\sigma}^2_{[-i]} = (n - p)\\hat{\\sigma}^2 - \\hat{\\varepsilon}_i^2/(1 - h_{ii})$. With $n = 22$, $p = 2$, $\\hat{\\sigma}^2 = 4$, $\\hat{\\varepsilon}_i = 3$ and $h_{ii} = 0.1$, compute $\\hat{\\sigma}^2_{[-i]}$. Give $4$ decimal places.",
    3.6842),
  c11.n(CDD, "ding-studentized-from-standardized", 7,
    "The externally studentized residual is a monotone function of the standardised one: $r_i^{*} = r_i\\sqrt{\\frac{n - p - 1}{n - p - r_i^2}}$. With $n = 22$, $p = 2$ and standardised residual $r_i = 2.5$, compute $r_i^{*}$. Give $2$ decimal places.",
    2.94),
  c11.m(OLI, "ding-leverage-one", 8, "Suppose observation $i$ has $h_{ii} = 1$. Which statement is true?",
    "Its residual is $0$, $h_{ij} = 0$ for every $j \\ne i$, and deleting it makes $X_{[-i]}^{\\top}X_{[-i]}$ singular", [
      ["Its residual is the largest in the sample", "The fit passes exactly through it, so its residual is $0$."],
      ["Deleting it leaves $\\hat{\\boldsymbol{\\beta}}$ unchanged", "$\\det(X_{[-i]}^{\\top}X_{[-i]}) = (1 - h_{ii})\\det(X^{\\top}X) = 0$, so $\\boldsymbol{\\beta}$ is no longer identified."],
      ["It must be a data-entry error", "It can be a legitimate unit, for example the only one in its category of a dummy variable."],
    ]),
  c11.s(UPD, "ding-gauss-updating", 7,
    "Gauss’s updating formula adds observation $(\\mathbf{x}_{n+1}, y_{n+1})$ to an existing fit without refitting. State the update for $\\hat{\\boldsymbol{\\beta}}$ and say why it is cheap.",
    "Gives $\\hat{\\boldsymbol{\\beta}}_{\\text{new}} = \\hat{\\boldsymbol{\\beta}} + \\frac{(X^{\\top}X)^{-1}\\mathbf{x}_{n+1}(y_{n+1} - \\mathbf{x}_{n+1}^{\\top}\\hat{\\boldsymbol{\\beta}})}{1 + \\mathbf{x}_{n+1}^{\\top}(X^{\\top}X)^{-1}\\mathbf{x}_{n+1}}$, with $(X^{\\top}X)^{-1}$ updated by Sherman–Morrison.",
    "Explains that each update costs $O(p^2)$ instead of refitting at $O(np^2)$, and is driven by the new point’s prediction error times a gain vector (recursive least squares)."),
];

// --- Ch. 12 · Population OLS and the Misspecified Linear Model -------------------
const c12 = chapter("Ch. 12, Population Ordinary Least Squares and Misspecified Linear Model");
const ch12: Item[] = [
  c12.m(MB, "ding-population-ols-meaning", 3, "With IID draws of $(\\mathbf{x}, y)$ and no model assumed, the population OLS coefficient $\\boldsymbol{\\beta} = \\mathbb{E}(\\mathbf{x}\\mathbf{x}^{\\top})^{-1}\\mathbb{E}(\\mathbf{x}y)$ is:",
    "The best linear predictor of $y$, and the best linear approximation to $\\mathbb{E}(y \\mid \\mathbf{x})$ in mean square", [
      ["Meaningless unless $\\mathbb{E}(y \\mid \\mathbf{x})$ is linear", "It is always defined and always has the best-linear-approximation reading."],
      ["The causal effect of $\\mathbf{x}$ on $y$", "It is a feature of the joint distribution, an association."],
      ["Equal to $\\mathbb{E}(y \\mid \\mathbf{x})$ evaluated at $\\mathbb{E}(\\mathbf{x})$", "It is a projection, not an evaluation of the conditional mean."],
    ]),
  c12.n(MB, "ding-mse-decomposition", 4,
    "For any predictor $m(\\mathbf{x})$, $\\mathbb{E}\\{y - m(\\mathbf{x})\\}^2 = \\mathbb{E}\\{\\mathbb{E}(y \\mid \\mathbf{x}) - m(\\mathbf{x})\\}^2 + \\mathbb{E}\\{\\text{Var}(y \\mid \\mathbf{x})\\}$. If $\\mathbb{E}\\{\\text{Var}(y \\mid \\mathbf{x})\\} = 2$ and a linear predictor misses the conditional mean by $\\mathbb{E}\\{\\mathbb{E}(y \\mid \\mathbf{x}) - m(\\mathbf{x})\\}^2 = 0.5$, what is its mean squared prediction error?",
    2.5),
  c12.n(MB, "ding-best-linear-cubic", 5,
    "Let $x \\sim \\mathcal{N}(0, 1)$ and $y = x^3 + \\varepsilon$ with $\\varepsilon$ independent noise. The best linear approximation of $\\mathbb{E}(y \\mid x)$ on $(1, x)$ has slope $\\text{Cov}(x, x^3)/\\text{Var}(x)$. Compute it.",
    3),
  c12.n(MB, "ding-conformal-rank", 4,
    "Conformal prediction with $n = 19$ training points and $\\alpha = 0.1$. A candidate value $y$ is kept when the rank of $|\\hat{\\varepsilon}_{n+1}(y)|$ among the $n + 1$ absolute residuals is at most $(1 - \\alpha)(n + 1)$. How many of the $20$ possible ranks are accepted?",
    18),
  c12.s(MB, "ding-conformal", 8,
    "Explain how conformal prediction gives a valid prediction interval for $y_{n+1}$ around an OLS fit without assuming the linear model is correct.",
    "Describes the procedure: for each candidate $y$, refit OLS on the $n + 1$ points and rank $|\\hat{\\varepsilon}_{n+1}(y)|$ among all absolute residuals; exchangeability makes that rank uniform on $\\{1, \\dots, n + 1\\}$.",
    "States that keeping the candidates whose rank is at most $(1 - \\alpha)(n + 1)$ gives coverage of at least $1 - \\alpha$ in finite samples from exchangeability alone; the model affects only the interval’s width."),
  c12.m(EIV, "ding-frisch-bounds", 7, "Both $x$ and $y$ are measured with independent mean-zero errors. Let $\\beta^{*}$ be the observed slope of $y$ on $x$ and $b^{*}$ the observed slope of $x$ on $y$. The true slope $\\beta \\ne 0$ satisfies:",
    "$|\\beta^{*}| \\le |\\beta| \\le 1/|b^{*}|$ (Frisch’s bounds)", [
      ["$\\beta = \\beta^{*}$, because error in $y$ is harmless", "Error in $x$ attenuates the slope of $y$ on $x$ toward zero."],
      ["$\\beta = 1/b^{*}$", "Error in $y$ attenuates $b^{*}$, so $1/b^{*}$ overshoots; it is an upper bound."],
      ["$1/|b^{*}| \\le |\\beta| \\le |\\beta^{*}|$", "The direct regression understates and the reverse regression overstates, not the other way round."],
    ]),
  c12.n(EIV, "ding-frisch-num", 5,
    "With errors in both variables, the observed slope of $y$ on $x$ is $0.8$ and the observed slope of $x$ on $y$ is $0.5$. What is Frisch’s upper bound for the true $|\\beta|$?",
    2),
  c12.s(OLSP, "ding-cox-theorem", 9,
    "Cox (1960): the chain $x_1 \\to x_2 \\to y$ with $x_{i2} = \\alpha_0 + \\alpha_1 x_{i1} + \\delta_i$ and $y_i = \\beta_0 + \\beta_1 x_{i2} + \\varepsilon_i$. You can estimate $\\alpha_1\\beta_1$ by the direct slope of $y$ on $x_1$, or by the product $\\hat{\\alpha}_1\\hat{\\beta}_1$ of the two stage-wise slopes. Which is more precise, and why?",
    "Notes that the direct regression has error $\\varepsilon_i + \\beta_1\\delta_i$ with variance $\\sigma^2 + \\beta_1^2\\tau^2$, so its variance is $(\\sigma^2 + \\beta_1^2\\tau^2)/\\sum_i (x_{i1} - \\bar{x}_1)^2$.",
    "States that the product estimator has the smaller conditional variance, because it uses the observed intermediate $x_2$ and separates the two noise sources; under Normal errors it is the MLE."),
];

// --- Ch. 13 · Perils of Overfitting ----------------------------------------------
const c13 = chapter("Ch. 13, Perils of Overfitting");
const ch13: Item[] = [
  c13.n(VIF, "ding-variance-ratio", 4,
    "Under homoskedasticity, $\\frac{\\text{Var}(\\hat{\\beta}_1 \\text{ long})}{\\text{Var}(\\tilde{\\beta}_1 \\text{ short})} = \\frac{1 - R^2_{X_1.\\text{short}}}{1 - R^2_{X_1.\\text{long}}}$, where $R^2_{X_1.\\cdot}$ is the $R^2$ of $X_1$ on the other covariates in that model. If $X_1$ on the short model’s covariates gives $R^2 = 0.2$ and on the long model’s gives $R^2 = 0.6$, what is the ratio?",
    2),
  c13.s(VIF, "ding-estimated-variance-deflation", 8,
    "Adding covariates never decreases the true variance of $\\hat{\\beta}_1$ under homoskedasticity, yet the estimated variance (and the reported standard error) often falls. Explain using Ding’s three-factor decomposition of the ratio of estimated variances.",
    "Identifies the deflating factor $\\frac{1 - R^2_{Y.\\text{long}}}{1 - R^2_{Y.\\text{short}}} \\le 1$: extra covariates explain more of $Y$, shrinking $\\hat{\\sigma}^2$.",
    "Identifies the two inflating factors, the true variance ratio (a VIF-type term $\\ge 1$) and the degrees-of-freedom ratio $(n - q - 1)/(n - p - 1) \\ge 1$, and concludes the net effect depends on their interplay."),
  c13.m(SSC, "ding-press-expectation", 5, "Under the Gauss–Markov model, $\\mathbb{E}(\\text{PRESS})$, with $\\text{PRESS} = \\sum_i \\hat{\\varepsilon}_i^2/(1 - h_{ii})^2$, equals:",
    "$\\sigma^2\\sum_i (1 - h_{ii})^{-1}$", [
      ["$\\sigma^2(n - p)$", "That is $\\mathbb{E}(\\text{RSS})$; dividing each residual by $1 - h_{ii}$ inflates it."],
      ["$\\sigma^2 n$", "Each term has expectation $\\sigma^2/(1 - h_{ii}) > \\sigma^2$."],
      ["$\\sigma^2(n + p)$", "That is close only when every leverage equals $p/n$ and $p \\ll n$."],
    ]),
  c13.n(SSC, "ding-press-sigma", 6,
    "Since $\\mathbb{E}(\\text{PRESS}) = \\sigma^2\\sum_i (1 - h_{ii})^{-1}$, the estimator $\\hat{\\sigma}^2_{\\text{press}} = \\text{PRESS}/\\sum_i (1 - h_{ii})^{-1}$ is unbiased. With leverages $[0.2, 0.2, 0.6, 0.5, 0.5]$ and $\\text{PRESS} = 27$, compute it.",
    3),
  c13.n(PSI, "ding-freedman-r2-sd", 7,
    "Freedman’s simulation: $n = 100$, $p = 50$ (counting the intercept), every slope truly zero. Then $\\text{Var}(R^2) = \\frac{2(p - 1)(n - p)}{(n - 1)^2(n + 1)}$. What is the standard deviation of $R^2$? Give $2$ decimal places.",
    0.07),
  c13.s(POLY, "ding-perfect-polynomial", 6,
    "Why can a polynomial of degree $n - 1$ always fit $n$ points with distinct $x_i$ exactly, and what does that imply about $R^2$ as a model-selection criterion?",
    "Explains that the $n \\times n$ Vandermonde matrix with distinct $x_i$ is invertible, so the coefficients can interpolate every $y_i$: $\\text{RSS} = 0$ and $R^2 = 1$.",
    "Concludes that $R^2$ never falls as terms are added, so it always picks the biggest model; selection needs criteria that penalise complexity or measure out-of-sample error (adjusted $R^2$, AIC/BIC, PRESS, cross-validation)."),
];

// --- Ch. 14 · Ridge Regression ---------------------------------------------------
const c14 = chapter("Ch. 14, Ridge Regression");
const ch14: Item[] = [
  c14.m(RR, "ding-posterior-mode", 3, "Ridge with penalty $\\lambda$ is the posterior mode under $Y \\mid \\boldsymbol{\\beta} \\sim \\mathcal{N}(X\\boldsymbol{\\beta}, \\sigma^2 I_n)$ and the prior $\\boldsymbol{\\beta} \\sim \\mathcal{N}(\\mathbf{0}, \\tau^2 I_p)$ when:",
    "$\\lambda = \\sigma^2/\\tau^2$", [
      ["$\\lambda = \\tau^2/\\sigma^2$", "A tighter prior (small $\\tau^2$) should mean more shrinkage, a larger $\\lambda$."],
      ["$\\lambda = \\sigma^2\\tau^2$", "The penalty comes from the ratio of the two quadratic terms in the log-posterior."],
      ["$\\lambda = 1/\\tau^2$ regardless of $\\sigma^2$", "That holds only when $\\sigma^2 = 1$."],
    ]),
  c14.n(RR, "ding-shrink-factor", 3,
    "In SVD coordinates, ridge multiplies the OLS component along the $j$th singular direction by $d_j^2/(d_j^2 + \\lambda)$. For $d_j = 3$ and $\\lambda = 9$, what is the factor?",
    0.5),
  c14.n(RR, "ding-ridge-df", 5,
    "The degrees of freedom of ridge, $\\sum_i \\text{Cov}(y_i, \\hat{y}_i)/\\sigma^2$, equal $\\sum_j d_j^2/(d_j^2 + \\lambda)$. With $d_j^2 = [16, 4, 1]$ and $\\lambda = 4$, compute them.",
    1.5),
  c14.m(RR, "ding-dual-form", 6, "For $\\lambda > 0$, $(X^{\\top}X + \\lambda I_p)^{-1}X^{\\top}Y$ also equals:",
    "$X^{\\top}(XX^{\\top} + \\lambda I_n)^{-1}Y$, so the ridge estimate always lies in the row space of $X$", [
      ["$(XX^{\\top} + \\lambda I_n)^{-1}X Y$", "The dimensions do not conform; $X^{\\top}$ must come first."],
      ["$(X^{\\top}X)^{-1}X^{\\top}Y/(1 + \\lambda)$", "Uniform shrinkage holds only for an orthonormal design."],
      ["Nothing simpler; the $p \\times p$ inverse is unavoidable", "The push-through identity swaps to an $n \\times n$ inverse, which helps when $p > n$."],
    ]),
  c14.m(RR, "ding-min-norm-limit", 7, "With $p > n$ and $XX^{\\top}$ invertible, as $\\lambda \\to 0^{+}$ the ridge estimate converges to:",
    "The minimum-norm least-squares solution $X^{\\top}(XX^{\\top})^{-1}Y = X^{+}Y$", [
      ["The OLS estimate $(X^{\\top}X)^{-1}X^{\\top}Y$", "$X^{\\top}X$ is singular when $p > n$, so that formula does not exist."],
      ["$\\mathbf{0}$", "Shrinkage to zero happens as $\\lambda \\to \\infty$."],
      ["It diverges", "The dual form has a finite limit because $XX^{\\top}$ is invertible."],
    ]),
  c14.s(RR, "ding-mse-derivative", 8,
    "Explain why ridge with a small enough $\\lambda > 0$ always has lower mean squared error than OLS (Hoerl and Kennard), using the derivative of $\\text{MSE}(\\lambda)$ at $\\lambda = 0$.",
    "Splits $\\text{MSE}(\\lambda)$ into variance plus squared bias: the variance $\\sigma^2\\sum_j d_j^2/(d_j^2 + \\lambda)^2$ has a strictly negative derivative at $0$, while the squared bias is $O(\\lambda^2)$, so its derivative at $0$ is zero.",
    "Concludes that $\\text{MSE}'(0) < 0$, so some $\\lambda > 0$ beats OLS for every $\\boldsymbol{\\beta}$, though the best $\\lambda$ depends on the unknown $\\boldsymbol{\\beta}$ and $\\sigma^2$ and must be tuned (for example by PRESS or cross-validation)."),
  c14.s(RR, "ding-unify-ols-ridge-pcr", 9,
    "OLS, ridge and principal components regression all have fitted values $\\hat{Y} = \\sum_j s_j U_j U_j^{\\top}Y$, with $s_j = 1$, $d_j^2/(d_j^2 + \\lambda)$ and $\\mathbb{1}(j \\le k)$ respectively. Compare how ridge and PCR treat low-variance directions, and use $\\text{cov}(\\hat{Y}) = \\sigma^2\\sum_j s_j^2 U_j U_j^{\\top}$ to describe the trade-off.",
    "Contrasts smooth shrinkage (ridge shrinks every direction, most strongly those with small $d_j$) with hard truncation (PCR keeps the top $k$ directions intact and drops the rest).",
    "Explains that $s_j < 1$ cuts variance in the noisy small-$d_j$ directions but biases $\\mathbb{E}(\\hat{Y}) = \\sum_j s_j d_j\\gamma_j U_j$ wherever the signal $\\gamma_j$ lies along them."),
];

// --- Ch. 15 · Lasso ----------------------------------------------------------------
const c15 = chapter("Ch. 15, Lasso");
const ch15: Item[] = [
  c15.n(LA, "ding-ridge-orthonormal", 3,
    "Orthonormal design ($X^{\\top}X = I_p$) with objective $\\lVert Y - X\\mathbf{b} \\rVert^2 + \\lambda\\lVert \\mathbf{b} \\rVert_2^2$. Each ridge coordinate is $\\hat{\\beta}_j/(1 + \\lambda)$. With $\\hat{\\beta}_j = 2$ and $\\lambda = 1$, what is it?",
    1),
  c15.n(LA, "ding-soft-orthonormal", 4,
    "Same orthonormal design, objective $\\lVert Y - X\\mathbf{b} \\rVert^2 + \\lambda\\lVert \\mathbf{b} \\rVert_1$. The lasso coordinate is $\\text{sign}(\\hat{\\beta}_j)(|\\hat{\\beta}_j| - \\lambda/2)_{+}$. With $\\hat{\\beta}_j = 1.3$ and $\\lambda = 1$, what is it?",
    0.8),
  c15.m(LA, "ding-coordinate-descent", 4, "Each step of coordinate descent for the lasso:",
    "Soft-thresholds one coefficient’s fit to the partial residual, holding the others fixed", [
      ["Takes a gradient step on all coefficients at once", "Coordinate descent updates one coordinate exactly, not all of them by a gradient step."],
      ["Hard-thresholds the OLS estimate", "Hard thresholding solves the $\\ell_0$ (best subset) problem, not the lasso."],
      ["Refits OLS on the current active set", "That is a relaxed-lasso or LARS-style step, not coordinate descent."],
    ]),
  c15.n(LA, "ding-hard-orthonormal", 5,
    "Orthonormal design, best-subset objective $\\lVert Y - X\\mathbf{b} \\rVert^2 + \\lambda\\lVert \\mathbf{b} \\rVert_0$. A coordinate is kept (at its OLS value) exactly when $|\\hat{\\beta}_j| > \\sqrt{\\lambda}$. With $\\hat{\\boldsymbol{\\beta}} = [0.5, -1.2, 2.0, 0.9]$ and $\\lambda = 1$, how many coordinates are kept?",
    2),
  c15.m(LA, "ding-lasso-unique-fit", 7, "If $\\hat{\\boldsymbol{\\beta}}^{(1)}$ and $\\hat{\\boldsymbol{\\beta}}^{(2)}$ both solve $\\min_{\\mathbf{b}} \\lVert Y - X\\mathbf{b} \\rVert^2 + \\lambda\\lVert \\mathbf{b} \\rVert_1$, then:",
    "They give the same fitted values, and every convex combination of them is also a solution", [
      ["They must be equal", "When $p > n$ or columns are collinear the lasso solution can be non-unique."],
      ["They can give different fitted values with the same objective", "Strict convexity of $\\lVert \\cdot \\rVert^2$ in $X\\mathbf{b}$ forces the fits to agree."],
      ["Only one of them can have the minimal $\\ell_1$ norm", "Equal objectives and equal fits force equal $\\ell_1$ norms too."],
    ]),
  c15.s(LA, "ding-hoff-reformulation", 9,
    "Hoff (2017) writes $\\mathbf{b} = \\mathbf{u} \\circ \\mathbf{v}$ and solves $\\min_{\\mathbf{u}, \\mathbf{v}} \\lVert Y - X(\\mathbf{u} \\circ \\mathbf{v}) \\rVert^2 + \\lambda(\\lVert \\mathbf{u} \\rVert^2 + \\lVert \\mathbf{v} \\rVert^2)/2$. Why does this recover the lasso penalty, and what algorithm does it suggest?",
    "Uses $\\min_{ac = b}(a^2 + c^2)/2 = |b|$ (AM–GM), so minimising over factorisations of each coordinate turns the penalty into $\\lambda\\lVert \\mathbf{b} \\rVert_1$.",
    "Notes that for fixed $\\mathbf{u}$ the problem in $\\mathbf{v}$ is ridge regression of $Y$ on $X\\,\\text{diag}(\\mathbf{u})$ with parameter $\\lambda/2$ (and symmetrically), so the lasso can be computed by alternating ridge fits."),
];

// --- Ch. 16 · Transformations in OLS ---------------------------------------------
const c16 = chapter("Ch. 16, Transformations in OLS");
const ch16: Item[] = [
  c16.n(BC, "ding-semi-elasticity", 2,
    "In $\\log y = \\beta_0 + \\beta_1 x + \\varepsilon$ the fitted slope is $0.05$. By roughly what percentage does the average outcome rise per unit increase in $x$?",
    5),
  c16.n(BC, "ding-elasticity", 3,
    "In $\\log y = \\beta_0 + \\beta_1\\log x + \\varepsilon$ the fitted elasticity is $0.8$. If $x$ rises by $2\\%$, by about what percentage does $y$ rise?",
    1.6),
  c16.m(BC, "ding-boxcox-limit", 3, "As $\\lambda \\to 0$, the Box–Cox transformation $(y^{\\lambda} - 1)/\\lambda$ tends to:",
    "$\\log y$", [
      ["$0$", "The numerator and the denominator both vanish; L’Hôpital’s rule gives $\\log y$."],
      ["$y - 1$", "That is the value at $\\lambda = 1$."],
      ["$1/y$", "Close to $\\lambda = -1$ the transformation is $1 - 1/y$, a different limit."],
    ]),
  c16.m(BC, "ding-jacobian", 6, "Why does the Box–Cox likelihood for $\\lambda$ include the factor $\\prod_i y_i^{\\lambda - 1}$?",
    "It is the Jacobian of the map from $y$ to $g_\\lambda(y)$, which puts the likelihoods for different $\\lambda$ on the common scale of the original data", [
      ["It is a prior on $\\lambda$", "Box and Cox’s criterion is a likelihood, and this factor comes from the change of variables."],
      ["It corrects for heteroskedasticity", "The Jacobian has nothing to do with the error variance."],
      ["It is optional and only speeds up the optimisation", "Without it the likelihood would favour $\\lambda$ values that simply shrink the data."],
    ]),
  c16.n(TPR, "ding-kink-slope", 3,
    "Regression kink: $y = \\beta_1 + \\beta_2\\max(0, x - c) + \\beta_3(x - c) + \\varepsilon$ with $\\beta_2 = 0.7$ and $\\beta_3 = 0.4$. What is the slope of the mean function to the right of $c$?",
    1.1),
  c16.n(TPR, "ding-rd-jump", 4,
    "Regression discontinuity: $y = \\beta_1 + \\beta_2 x + \\beta_3\\mathbb{1}(x > c) + \\beta_4 x\\mathbb{1}(x > c) + \\varepsilon$, with $\\beta_3 = 2$, $\\beta_4 = -0.5$ and cutoff $c = 3$. What is the size of the jump in the mean at $c$?",
    0.5),
  c16.m(TPR, "ding-rd-test", 5, "In $y = \\beta_1 + \\beta_2 x + \\beta_3\\mathbb{1}(x > c) + \\beta_4 x\\mathbb{1}(x > c) + \\varepsilon$, the null hypothesis of no discontinuity at $c$ is:",
    "$\\beta_3 + \\beta_4 c = 0$, which becomes simply $\\beta_3 = 0$ if $x$ is centred at $c$", [
      ["$\\beta_3 = 0$, whatever the coding of $x$", "With uncentred $x$ the jump at $c$ is $\\beta_3 + \\beta_4 c$; $\\beta_3$ alone is the jump at $x = 0$."],
      ["$\\beta_4 = 0$", "$\\beta_4$ is the change in slope, which is a kink, not a jump."],
      ["$\\beta_3 = \\beta_4 = 0$", "That tests for any change at all, jump or slope."],
    ]),
];

// --- Ch. 18 · Restricted OLS ---------------------------------------------------------
const c18 = chapter("Ch. 18, Restricted OLS");
const ch18: Item[] = [
  c18.m(RLS, "ding-short-as-restricted", 3, "The short regression of $Y$ on $X_1$ is the restricted OLS of $Y$ on $(X_1, X_2)$ subject to $C\\boldsymbol{\\beta} = \\mathbf{r}$ with:",
    "$C = [0, I_l]$ and $\\mathbf{r} = \\mathbf{0}$, which forces $\\boldsymbol{\\beta}_2 = \\mathbf{0}$", [
      ["$C = [I_k, 0]$ and $\\mathbf{r} = \\mathbf{0}$", "That forces $\\boldsymbol{\\beta}_1 = \\mathbf{0}$, dropping $X_1$ instead."],
      ["$C = [I_k, I_l]$ and $\\mathbf{r} = \\mathbf{0}$", "That restricts sums of coefficients and needs $k = l$."],
      ["No restriction, because the short regression is unrelated to restricted OLS", "Setting coefficients to zero is the simplest linear restriction."],
    ]),
  c18.n(RLS, "ding-reparametrize", 4,
    "Impose $\\beta_1 + \\beta_2 = 1$ in $y = \\beta_1 x_1 + \\beta_2 x_2 + \\varepsilon$ (no intercept) by substituting: $y - x_2 = \\beta_1(x_1 - x_2) + \\varepsilon$. With $\\mathbf{x}_1 = [1, 2, 3]$, $\\mathbf{x}_2 = [0, 1, 1]$ and $\\mathbf{y} = [1, 2, 2]$, compute the restricted $\\hat{\\beta}_1$. Give $4$ decimal places.",
    0.6667),
  c18.n(RLS, "ding-min-norm", 5,
    "The minimum-norm solution of the under-determined system $X\\mathbf{b} = Y$ is $X^{\\top}(XX^{\\top})^{-1}Y$. For the single equation $b_1 + b_2 = 4$, what is $\\lVert \\hat{\\mathbf{b}} \\rVert^2$ for that solution?",
    8),
  c18.s(RLS, "ding-restricted-blue", 7,
    "Under the Gauss–Markov model with true restriction $C\\boldsymbol{\\beta} = \\mathbf{r}$, restricted OLS is BLUE among linear estimators unbiased under the restriction. What matrix inequality follows, and what is the catch?",
    "Concludes $\\text{cov}(\\hat{\\boldsymbol{\\beta}}_r) \\preceq \\text{cov}(\\hat{\\boldsymbol{\\beta}})$, that is $M_r(X^{\\top}X)^{-1}M_r^{\\top} \\preceq (X^{\\top}X)^{-1}$, because unrestricted OLS is also unbiased under the restriction: imposing a true restriction never costs precision.",
    "Notes that if the restriction is false, $\\hat{\\boldsymbol{\\beta}}_r$ is biased, so the precision gain is a bias–variance bet on the restriction."),
  c18.m(RLS, "ding-kkt-invertible", 8, "With $C$ of full row rank, the bordered matrix $W = \\begin{bmatrix} X^{\\top}X & C^{\\top} \\\\ C & 0 \\end{bmatrix}$ is invertible exactly when:",
    "The stacked matrix $\\begin{bmatrix} X \\\\ C \\end{bmatrix}$ has full column rank $p$, so $X^{\\top}X$ itself may be singular", [
      ["$X^{\\top}X$ is invertible", "That is sufficient but not necessary; the restrictions can identify directions that $X$ cannot."],
      ["$C$ is square", "$C$ has $l < p$ rows; squareness would pin $\\boldsymbol{\\beta}$ completely."],
      ["Always, because $C$ has full row rank", "If some direction lies in the null spaces of both $X$ and $C$, $W$ is singular."],
    ]),
];

// --- Ch. 19 · Weighted Least Squares -----------------------------------------------
const c19 = chapter("Ch. 19, Weighted Least Squares");
const ch19: Item[] = [
  c19.m(WLS, "ding-aggregate-weights", 3, "The individual-level model is homoskedastic, but you observe only group averages $(\\bar{x}_j, \\bar{y}_j)$ for groups of size $n_j$. The natural WLS weight for group $j$ is:",
    "$n_j$, because $\\text{Var}(\\bar{y}_j) = \\sigma^2/n_j$", [
      ["$1/n_j$", "Larger groups have more precise averages and deserve more weight, not less."],
      ["$1$ for every group", "Equal weights ignore that the averages differ in precision."],
      ["$\\sqrt{n_j}$", "Weights are inverse variances, proportional to $n_j$."],
    ]),
  c19.m(WLS, "ding-survey-weights", 4, "Population unit $i$ enters the sample with probability $\\pi_i$. To estimate the population OLS coefficient from the sample, weight each sampled unit by:",
    "$1/\\pi_i$ (Horvitz–Thompson inverse-probability weighting)", [
      ["$\\pi_i$", "Over-sampled units would get even more influence; the weights must undo the over-sampling."],
      ["$1/\\pi_i^2$", "Inverse probability, not its square, makes each weighted sum unbiased for the population sum."],
      ["$1/\\text{Var}(\\varepsilon_i)$", "That is the heteroskedasticity motive for WLS; survey weights fix representativeness."],
    ]),
  c19.n(WLS, "ding-weighted-slope", 4,
    "Univariate WLS with weights $\\mathbf{w} = [1, 1, 2]$, $\\mathbf{x} = [0, 1, 2]$ and $\\mathbf{y} = [1, 2, 5]$. The slope is $\\sum_i w_i(x_i - \\bar{x}_w)(y_i - \\bar{y}_w) / \\sum_i w_i(x_i - \\bar{x}_w)^2$, with weighted means $\\bar{x}_w$ and $\\bar{y}_w$. Give $4$ decimal places.",
    2.0909),
  c19.n(WLS, "ding-ecological", 5,
    "Goodman’s ecological regression assumes $\\bar{y}_i = p_1\\bar{x}_i + p_0(1 - \\bar{x}_i)$, where $\\bar{x}_i$ is precinct $i$’s share of group 1 and $\\bar{y}_i$ its turnout. Two precincts give $(\\bar{x}, \\bar{y}) = (0.2, 0.62)$ and $(0.6, 0.66)$. Solve for $p_1$, group 1’s turnout rate.",
    0.7),
  c19.m(GLS, "ding-gls-block", 4, "With block-diagonal error covariance $\\Sigma = \\text{diag}(\\Sigma_1, \\dots, \\Sigma_K)$, the GLS estimator is:",
    "$\\left(\\sum_k X_k^{\\top}\\Sigma_k^{-1}X_k\\right)^{-1}\\sum_k X_k^{\\top}\\Sigma_k^{-1}Y_k$", [
      ["The average of the $K$ separate GLS estimates", "Blocks with more information get more weight; it is a matrix-weighted combination, not a simple average."],
      ["$\\left(\\sum_k X_k^{\\top}X_k\\right)^{-1}\\sum_k X_k^{\\top}Y_k$", "That is pooled OLS, which ignores $\\Sigma_k$."],
      ["$\\sum_k (X_k^{\\top}\\Sigma_k^{-1}X_k)^{-1}X_k^{\\top}\\Sigma_k^{-1}Y_k$", "The inverse goes around the sum, not inside it."],
    ]),
  c19.m(LOESS, "ding-local-linear-wls", 6, "Ding presents local linear regression at a point $x_0$ as:",
    "WLS of $y$ on $(1, x - x_0)$ with kernel weights $K\\{(x_i - x_0)/h\\}$, whose intercept estimates $\\mathbb{E}(y \\mid x_0)$", [
      ["OLS on the $k$ nearest neighbours, using the slope as the estimate", "The fitted value at $x_0$ is the intercept of the centred local fit, not the slope."],
      ["A global polynomial of high degree", "Local fitting uses a low-degree polynomial with weights that vanish far from $x_0$."],
      ["WLS with weights $1/\\hat{\\varepsilon}_i^2$", "Those are FGLS weights for heteroskedasticity, not distance-based kernel weights."],
    ]),
  c19.s(GLS, "ding-why-not-fgls", 7,
    "FGLS can be more efficient than OLS under heteroskedasticity, yet Ding notes practitioners rarely use it. Give at least two of his reasons.",
    "EHW standard errors already make OLS inference valid under heteroskedasticity, and the efficiency gain from FGLS is usually small, possibly negative if the variance function is misspecified.",
    "If the linear model is misspecified, OLS and FGLS estimate different targets: OLS keeps its best-linear-approximation interpretation while FGLS’s target is harder to interpret, and a large OLS–FGLS gap is itself a sign of misspecification."),
];

export const dingFittingRegularizationItems: Item[] = [
  ...ch10, ...ch11, ...ch12, ...ch13, ...ch14, ...ch15, ...ch16, ...ch18, ...ch19,
];
