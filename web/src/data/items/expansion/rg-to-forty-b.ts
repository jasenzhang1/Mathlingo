import type { Item } from "../../../lib/assessment/types";
import { makeBuilders } from "../authoring";
import { EXPANSION } from "./source";

/**
 * Linear Models to 40: model selection and regularisation — AIC/BIC, stepwise
 * and subset selection, ridge, lasso, elastic net, Stein shrinkage,
 * post-selection inference and principal components regression.
 */
const { mcq, short, num } = makeBuilders(EXPANSION);

const s = (concept: string, slug: string, level: number, stem: string, a: string, b: string) =>
  short({ concept, slug, cognitive: level >= 8.5 ? "transfer" : "explain", level, seconds: level >= 9 ? 300 : 180, stem },
    [["main", a, 5, true], ["detail", b, 4, true]]);
const n = (concept: string, slug: string, level: number, stem: string, key: number, tol = 0.01) =>
  num({ concept, slug, cognitive: "apply", level, seconds: level >= 7 ? 90 : level >= 4 ? 60 : 30, stem }, key, tol);
const m = (concept: string, slug: string, level: number, stem: string, right: string, wrong: [string, string][]) =>
  mcq({ concept, slug, cognitive: level <= 3 ? "recall" : "apply", level, seconds: 25, stem },
    right, wrong.map(([t, why], i) => [t, `${concept}-${slug}-${i}`, why] as [string, string, string]));

const AB = "aic-bic";
const SW = "forward-backward-stepwise-selection";
const RG = "regularization";
const LA = "lasso";
const RI = "ridge-regression";
const EN = "elastic-net";
const SC = "subset-selection-criteria";
const AS = "all-subsets-regression";
const ST = "stein-shrinkage";
const PS = "post-selection-inference";
const PC = "principal-components-regression";

export const rgToFortyBItems: Item[] = [
  // --- aic-bic -----------------------------------------------------------
  m(AB, "f40-lower", 1.5, "Between two models fitted to the same data, a lower AIC indicates:", "A better estimated trade-off between fit and complexity",
    [["A model with more parameters", "Not necessarily."], ["A higher likelihood only", "AIC also penalises parameters."], ["The true model", "AIC compares candidates; none need be true."]]),
  n(AB, "f40-aic", 2.5, "A model has $\\log L = -50$ and $k = 3$ parameters. What is its AIC?", 106, 0.001),
  n(AB, "f40-weight", 3.5, "Two models have AIC $300$ and $296$. What is the Akaike weight of the second (to $4$ decimals)?", 0.8808, 0.002),
  n(AB, "f40-bic", 4.5, "$n = 100$, $k = 6$ and $\\log L = -120$. What is BIC (to $2$ decimals; $\\ln 100 = 4.6052$)?", 267.63, 0.001),
  m(AB, "f40-delta2", 5, "By the usual rule of thumb, two models whose AICs differ by less than $2$:", "Both have substantial support",
    [["The lower one is decisively better", "Differences under $2$ are small."], ["Must both be wrong", "No."], ["Can't be compared", "They can."]]),
  n(AB, "f40-gauss", 5.5, "Gaussian linear model with $\\text{AIC} = n\\ln(\\mathrm{RSS}/n) + 2p$, $n = 50$. Adding a predictor lowers RSS from $100$ to $96$. What is the change in AIC (to $3$ decimals)?", -0.041, 0.03),
  m(AB, "f40-kl", 6.5, "AIC estimates (up to a constant):", "The expected out-of-sample deviance, i.e. KL divergence from the truth to the fitted model",
    [["The posterior probability of the model", "That's BIC's motivation."], ["The in-sample $R^2$", "No."], ["The number of true predictors", "No."]]),
  s(AB, "f40-laplace", 8, "Explain how BIC arises from a Laplace approximation to the log marginal likelihood, and what it drops.",
    "$\\log p(y \\mid M) \\approx \\log L(\\hat{\\theta}) - \\frac{k}{2}\\log n + O(1)$ after a Laplace approximation of $\\int L(\\theta)p(\\theta)d\\theta$; $-2\\times$ this gives BIC.",
    "It drops the prior density and the Hessian's determinant terms, which are $O(1)$ — fine for large $n$ but not when $k$ grows with $n$ or priors are informative."),
  s(AB, "f40-loo", 9, "What is the connection between AIC and leave-one-out cross-validation, and what does it imply in practice?",
    "Stone (1977) showed that for well-specified models, AIC and LOO-CV log-likelihood are asymptotically equivalent model-selection criteria.",
    "So AIC is a cheap proxy for predictive cross-validation; when assumptions fail (misspecification, small $n$, many parameters) actual CV or AICc/TIC is safer."),

  // --- forward-backward-stepwise-selection -------------------------------
  m(SW, "f40-bidirectional", 1.5, "Bidirectional stepwise selection differs from pure forward selection in that:", "Variables added earlier can be removed at later steps",
    [["It starts from the full model", "That's backward elimination."], ["It considers every subset", "That's best subset."], ["It never removes variables", "That's forward selection."]]),
  n(SW, "f40-backward-count", 2.5, "Backward elimination run all the way down from $p = 6$ fits $1 + 6 + 5 + 4 + 3 + 2 + 1$ models. How many?", 22, 0.001),
  m(SW, "f40-stop", 3.5, "A common stopping rule for stepwise selection is to stop when:", "No candidate addition or removal improves the criterion (e.g. AIC)",
    [["All variables are in the model", "That's not stopping early."], ["$R^2$ stops increasing", "$R^2$ always increases."], ["The first variable enters", "Too early."]]),
  n(SW, "f40-noise", 4, "At the first forward step, $20$ pure-noise candidates are each tested at an entry threshold of $\\alpha = 0.15$. How many are expected to pass?", 3, 0.001),
  m(SW, "f40-order", 5, "The order in which forward selection adds variables reflects:", "Each variable's greedy marginal contribution given those already in — not its importance",
    [["Causal importance", "No."], ["The true effect sizes", "Correlations among predictors scramble the order."], ["Alphabetical order", "No."]]),
  n(SW, "f40-stagewise", 5.5, "Forward stagewise regression moves a coefficient in steps of $0.01$. How many steps to reach $0.5$?", 50, 0.001),
  m(SW, "f40-lars", 6, "Least angle regression (LARS) relates forward selection and the lasso by:", "Adding variables one at a time but moving coefficients only partway, giving the lasso path with a small modification",
    [["Using best subset at each step", "No."], ["Ignoring correlations", "It uses them to stay equiangular."], ["Fitting full OLS at each step", "That's forward selection."]]),
  n(SW, "f40-partial-f", 6.5, "Adding a variable lowers RSS from $120$ to $100$; $n = 30$ and the larger model has $4$ parameters. What is the partial $F = \\frac{(120 - 100)/1}{100/26}$?", 5.2, 0.001),
  s(SW, "f40-inflate", 7.5, "Why does stepwise selection inflate $R^2$ and bias retained coefficients away from zero?",
    "Variables enter when their sample association is large, partly by chance, so the selected fit capitalises on noise in that sample.",
    "Coefficients selected because they're large overstate their true size (winner's curse); $R^2$ on new data will be lower."),
  s(SW, "f40-bootstrap", 8.5, "How can the bootstrap be used to assess the stability of a stepwise-selected model?",
    "Repeat the whole stepwise procedure on many bootstrap samples and record how often each variable is selected (inclusion frequencies) and which models occur.",
    "Low or erratic inclusion frequencies show the selected model is unstable; the bootstrap distribution of coefficients (including zeros) shows honest variability."),

  // --- regularization ----------------------------------------------------
  m(RG, "f40-bias", 1.5, "Shrinkage estimators deliberately introduce:", "Some bias, in exchange for lower variance",
    [["More variance", "They reduce variance."], ["No change in bias", "They add bias."], ["Additional predictors", "No."]]),
  n(RG, "f40-mse", 2.5, "An estimator has bias $2$ and variance $5$. What is its mean squared error?", 9, 0.001),
  n(RG, "f40-opt-c", 3.5, "Scalar estimator $c\\hat{\\beta}$ with $\\operatorname{Var}\\hat{\\beta} = 4$, true $\\beta = 2$. The MSE-optimal $c = \\beta^2/(\\beta^2 + \\operatorname{Var}\\hat{\\beta})$. What is it?", 0.5, 0.001),
  n(RG, "f40-opt-mse", 4.5, "Same setting: MSE$(c) = c^2 \\cdot 4 + (1 - c)^2 \\cdot 4$. What is the MSE at the optimal $c$ (compare $4$ for $c = 1$)?", 2, 0.001),
  m(RG, "f40-train", 5, "As the penalty $\\lambda$ increases, the training error:", "Never decreases",
    [["Always decreases", "Penalties restrict the fit."], ["Stays constant", "It rises with $\\lambda$."], ["Is unrelated to $\\lambda$", "No."]]),
  m(RG, "f40-df", 5.5, "The effective degrees of freedom of ridge regression are:", "$\\sum_j d_j^2/(d_j^2 + \\lambda)$, with $d_j$ the singular values of $X$",
    [["$p$ for every $\\lambda$", "They shrink as $\\lambda$ grows."], ["The number of nonzero coefficients", "That's for the lasso."], ["$n - p$", "That's residual df."]]),
  n(RG, "f40-df-num", 6, "Squared singular values $9$ and $1$, with $\\lambda = 1$. What are ridge's effective degrees of freedom?", 1.4, 0.001),
  m(RG, "f40-group", 6.5, "The group lasso penalty $\\lambda\\sum_g\\|\\beta_g\\|_2$:", "Selects or drops whole predefined groups of coefficients together",
    [["Selects individual coefficients within groups", "That's the sparse group lasso."], ["Never sets coefficients to zero", "It zeroes whole groups."], ["Is the same as ridge", "Unsquared group norms create sparsity."]]),
  s(RG, "f40-early", 8, "Explain how early stopping of gradient descent acts as implicit regularisation for least squares.",
    "Starting from $\\beta = 0$, gradient descent fits large-singular-value directions first; small-singular-value (noisy) directions converge slowly.",
    "Stopping after $t$ steps applies filter factors $1 - (1 - \\eta d_j^2)^t$, similar to ridge's $d_j^2/(d_j^2 + \\lambda)$ with $\\lambda \\approx 1/(\\eta t)$."),
  s(RG, "f40-uncertainty", 9, "Why don't penalised estimates come with standard errors in the usual sense, and how can uncertainty be quantified?",
    "The estimators are biased and, for the lasso, non-smooth in the data, so $\\mathrm{SE}$s around a biased point don't give valid intervals; the naive bootstrap also fails near zero.",
    "Options: debiased (desparsified) lasso intervals, selective inference, Bayesian posteriors under the corresponding prior, or sample splitting."),

  // --- lasso -------------------------------------------------------------
  m(LA, "f40-path", 1.5, "As $\\lambda$ increases from $0$, lasso coefficients:", "Shrink, and some become exactly zero",
    [["Grow", "The penalty shrinks them."], ["Stay fixed", "No."], ["Shrink but never reach zero", "That's ridge."]]),
  n(LA, "f40-soft", 2.5, "Soft-threshold $\\operatorname{sign}(z)(|z| - \\lambda)_+$ with $z = 1.5$ and $\\lambda = 0.5$.", 1, 0.001),
  n(LA, "f40-penalty", 3.5, "What is the lasso penalty $\\lambda\\sum_j|\\beta_j|$ for $\\lambda = 0.5$ and $\\beta = (2, 0, -1)$?", 1.5, 0.001),
  m(LA, "f40-unique", 4, "The lasso solution:", "Is unique when the columns of $X$ are in general position, but can be non-unique otherwise",
    [["Is always unique", "Not with collinear columns."], ["Is never unique", "Usually unique for continuous data."], ["Is unique only when $p < n$", "Uniqueness can hold with $p > n$."]]),
  n(LA, "f40-max-nonzero", 4.5, "With $p = 200$ predictors and $n = 50$ observations in general position, at most how many lasso coefficients can be nonzero?", 50, 0.001),
  m(LA, "f40-relaxed", 5, "Refitting OLS on the variables the lasso selects (relaxed lasso / post-lasso):", "Reduces the shrinkage bias of the selected coefficients",
    [["Adds more variables", "It uses the selected set."], ["Makes inference automatically valid", "Selection still invalidates naive inference."], ["Is identical to the lasso", "It removes shrinkage."]]),
  n(LA, "f40-adaptive", 5.5, "The adaptive lasso uses weights $w_j = 1/|\\hat{\\beta}_j^{\\text{init}}|$. With $\\hat{\\beta}_j^{\\text{init}} = 0.25$, what is $w_j$?", 4, 0.001),
  m(LA, "f40-cd", 6, "Coordinate descent for the lasso:", "Updates one coefficient at a time by soft-thresholding against the partial residual",
    [["Inverts $X^\\top X$ once", "No closed form."], ["Uses Newton's method on the full gradient", "The penalty isn't differentiable."], ["Updates all coefficients at random", "It cycles coordinates."]]),
  s(LA, "f40-oracle", 8, "Why does the lasso bias large coefficients, and how does the adaptive lasso fix this?",
    "The same penalty $\\lambda$ applies to every coefficient, so large true effects are shrunk by about $\\lambda$ even when clearly nonzero.",
    "The adaptive lasso uses smaller penalties for coefficients with large initial estimates, giving the oracle property: consistent selection and asymptotically unbiased estimates."),
  s(LA, "f40-lars", 9, "Describe how the LARS algorithm computes the entire lasso path.",
    "The lasso path is piecewise linear in $\\lambda$; LARS moves the active coefficients in the equiangular direction until another predictor's correlation with the residual ties.",
    "That predictor joins the active set (or, with the lasso modification, a coefficient hitting zero leaves); the whole path costs about the same as one least-squares fit."),

  // --- ridge-regression --------------------------------------------------
  m(RI, "f40-towards", 1.5, "The ridge penalty shrinks coefficients:", "Towards zero, without making any exactly zero",
    [["Exactly to zero", "That's the lasso."], ["Towards the OLS estimate", "They start there."], ["Away from zero", "No."]]),
  n(RI, "f40-one", 2.5, "One predictor: $x^\\top x = 10$, $x^\\top y = 20$, $\\lambda = 10$. What is the ridge estimate?", 1, 0.001),
  n(RI, "f40-ortho", 3.5, "Orthonormal design: the OLS coefficient is $6$ and $\\lambda = 2$. What is the ridge coefficient $z/(1 + \\lambda)$?", 2, 0.001),
  n(RI, "f40-df", 4.5, "Squared singular values $4$ and $1$ with $\\lambda = 4$. What are the effective degrees of freedom?", 0.7, 0.001),
  m(RI, "f40-bayes", 5, "Ridge regression's estimate is the posterior mean under the prior:", "$\\beta \\sim N(0, (\\sigma^2/\\lambda)I)$",
    [["$\\beta_j \\sim \\mathrm{Laplace}$", "That's the lasso (as a MAP)."], ["A flat prior", "That gives OLS."], ["$\\beta \\sim N(0, \\lambda I)$", "The variance is $\\sigma^2/\\lambda$."]]),
  n(RI, "f40-lambda", 5.5, "Noise SD $\\sigma = 1$ and prior SD $\\tau = 0.5$ on each coefficient. What is the equivalent ridge $\\lambda = \\sigma^2/\\tau^2$?", 4, 0.001),
  m(RI, "f40-augment", 6, "Ridge regression can be computed as OLS on augmented data by:", "Appending $\\sqrt{\\lambda}I$ as extra rows of $X$ and zeros to $y$",
    [["Appending $\\lambda I$ as extra columns", "Rows, scaled by $\\sqrt{\\lambda}$."], ["Duplicating every observation", "No."], ["Removing correlated columns", "That's variable selection."]]),
  n(RI, "f40-bias", 6.5, "Orthonormal design with true $\\beta = 3$ and $\\lambda = 0.5$: $E\\hat{\\beta} = \\beta/(1 + \\lambda)$. What is the bias?", -1, 0.001),
  s(RI, "f40-kernel", 8, "Explain the dual form of ridge regression and how it leads to kernel ridge regression.",
    "$\\hat{\\beta} = (X^\\top X + \\lambda I)^{-1}X^\\top y = X^\\top(XX^\\top + \\lambda I)^{-1}y$, so predictions are $x^\\top X^\\top\\alpha$ with $\\alpha = (XX^\\top + \\lambda I)^{-1}y$.",
    "Predictions depend only on inner products $x_i^\\top x_j$; replacing them with a kernel $k(x_i, x_j)$ gives kernel ridge regression, costing $O(n^3)$ instead of $O(p^3)$."),
  s(RI, "f40-generalised", 9, "What is generalised ridge regression, and how can its penalties be chosen from the data?",
    "Use a separate penalty per coefficient (or per principal direction), $\\sum_j\\lambda_j\\beta_j^2$, i.e. a prior $\\beta_j \\sim N(0, \\sigma^2/\\lambda_j)$.",
    "Penalties can be chosen by maximising the marginal likelihood (empirical Bayes / automatic relevance determination), by GCV, or by REML in a mixed-model representation."),

  // --- elastic-net -------------------------------------------------------
  m(EN, "f40-zeros", 1.5, "An elastic net with $0 < \\alpha < 1$:", "Can still set some coefficients exactly to zero",
    [["Never produces zeros", "The $\\ell_1$ part still creates sparsity."], ["Always selects all variables", "No."], ["Is identical to ridge", "Only when $\\alpha = 0$."]]),
  n(EN, "f40-penalty", 2.5, "Penalty $\\lambda[\\alpha\\|\\beta\\|_1 + (1 - \\alpha)\\|\\beta\\|_2^2]$ with $\\lambda = 1$, $\\alpha = 0.5$ and $\\beta = (2, -2)$. What is it?", 6, 0.001),
  n(EN, "f40-ortho", 3.5, "Orthonormal design: the elastic-net estimate is $(|z| - \\lambda_1)_+/(1 + \\lambda_2)$ (times the sign). With $z = 3$, $\\lambda_1 = 1$, $\\lambda_2 = 1$, what is it?", 1, 0.001),
  n(EN, "f40-zero", 4.5, "Same formula with $z = 0.8$, $\\lambda_1 = 1$, $\\lambda_2 = 1$. What is the estimate?", 0, 0.001),
  m(EN, "f40-more-n", 5, "Unlike the lasso, the elastic net can select more than $n$ variables because:", "The ridge term makes the problem strictly convex, so the solution isn't limited to $n$ nonzeros",
    [["It ignores the $\\ell_1$ penalty", "It keeps it."], ["It uses more data", "Same data."], ["It refits OLS", "No."]]),
  n(EN, "f40-rescale", 5.5, "Zou–Hastie's correction rescales the naive elastic-net estimate by $(1 + \\lambda_2)$. A naive estimate of $1$ with $\\lambda_2 = 1$ becomes what?", 2, 0.001),
  m(EN, "f40-augment", 6, "The elastic net can be computed as:", "A lasso on augmented data with $\\sqrt{\\lambda_2}I$ appended to $X$ (and rescaled)",
    [["A ridge on augmented data", "The $\\ell_1$ part remains."], ["OLS on selected variables", "No."], ["Two separate fits averaged", "No."]]),
  n(EN, "f40-rows", 6.5, "With $n = 50$ and $p = 200$, the augmented design for that lasso has how many rows?", 250, 0.001),
  s(EN, "f40-prior", 8, "Give the Bayesian interpretation of the elastic-net penalty.",
    "The penalty $\\lambda_1|\\beta_j| + \\lambda_2\\beta_j^2$ is minus the log of a prior $\\propto \\exp(-\\lambda_1|\\beta_j| - \\lambda_2\\beta_j^2)$, a compromise between Laplace and Gaussian.",
    "The elastic-net estimate is the posterior mode (MAP) under that prior: the Laplace part favours exact zeros, the Gaussian part spreads weight across correlated predictors."),
  s(EN, "f40-genomics", 9, "In genomics, SNPs come in correlated blocks. Why is the elastic net popular there, and why might stability selection be added?",
    "Within a block, the lasso picks one SNP arbitrarily; the elastic net's grouping effect keeps correlated SNPs together, giving more reproducible selections.",
    "Selected sets still vary across resamples; stability selection (selecting variables chosen in a high fraction of subsamples) controls false selections and improves reproducibility."),

  // --- subset-selection-criteria -----------------------------------------
  m(SC, "f40-adjr2", 1.5, "Adjusted $R^2$ differs from $R^2$ by:", "Penalising the number of predictors",
    [["Using a different response", "No."], ["Always being larger", "It's never larger."], ["Ignoring the intercept", "No."]]),
  n(SC, "f40-adjr2-num", 2.5, "$R^2 = 0.8$, $n = 26$, $k = 5$ predictors. What is adjusted $R^2 = 1 - (1 - R^2)\\frac{n - 1}{n - k - 1}$?", 0.75, 0.001),
  n(SC, "f40-cp", 3.5, "$\\mathrm{SSE}_p = 90$, $\\hat{\\sigma}^2 = 3$, $n = 25$, $p = 4$. What is $C_p = \\mathrm{SSE}_p/\\hat{\\sigma}^2 - n + 2p$?", 13, 0.001),
  n(SC, "f40-gcv", 4.5, "GCV $= n\\,\\mathrm{SSE}/(n - p)^2$ with $n = 50$, SSE $= 40$, $p = 5$. What is it (to $4$ decimals)?", 0.9877, 0.002),
  m(SC, "f40-cp-aic", 5, "With $\\sigma^2$ known, minimising Mallows' $C_p$ is equivalent to minimising:", "AIC (both estimate prediction error)",
    [["BIC", "BIC's penalty is $\\ln n$, not $2$."], ["RSS", "RSS always favours larger models."], ["$R^2$", "No."]]),
  n(SC, "f40-s2", 5.5, "Model B has SSE $= 95$ on $38$ residual df. What is $s^2 = \\mathrm{SSE}/(n - p)$?", 2.5, 0.001),
  m(SC, "f40-hetero", 6, "Under strong heteroskedasticity, compared with $C_p$, cross-validation:", "Remains a sensible estimate of prediction error, since it doesn't assume constant $\\sigma^2$",
    [["Becomes invalid", "CV doesn't assume homoskedasticity."], ["Always chooses the full model", "No."], ["Is identical to $C_p$", "Not under heteroskedasticity."]]),
  n(SC, "f40-ric", 6.5, "The risk inflation criterion charges $2\\ln p$ per parameter. With $p = 50$ candidates, what is the charge (to $3$ decimals)?", 7.824, 0.002),
  s(SC, "f40-onese", 7, "Explain the one-standard-error rule in cross-validated model selection and why it's used.",
    "Instead of the model with the lowest CV error, pick the simplest model whose CV error is within one standard error of that minimum.",
    "CV error curves are noisy and flat near the minimum, so the rule trades a negligible loss in estimated accuracy for a simpler, more stable model."),
  s(SC, "f40-ebic", 9, "Why do AIC and BIC break down when the number of candidate predictors $p$ is comparable to or larger than $n$, and what does the extended BIC do?",
    "With many candidates, the number of models of each size is huge, so the minimum criterion over a large model space is badly optimistic and selects too many variables.",
    "EBIC adds $2\\gamma\\ln\\binom{p}{k}$ to BIC, accounting for the size of the model space at each $k$; it's consistent in sparse high-dimensional settings."),

  // --- all-subsets-regression --------------------------------------------
  m(AS, "f40-def", 1.5, "The best subset of size $k$ is the one that:", "Minimises the residual sum of squares among all subsets with $k$ predictors",
    [["Has the most significant $p$-values", "Not the criterion."], ["Was added first by forward selection", "That's greedy."], ["Minimises AIC across all sizes", "That compares sizes."]]),
  n(AS, "f40-count7", 2, "How many subsets (including the empty one) are there of $7$ predictors?", 128, 0.001),
  n(AS, "f40-choose", 3, "How many subsets of exactly $4$ predictors can be formed from $9$?", 126, 0.001),
  n(AS, "f40-atmost2", 4, "How many models have at most $2$ of $10$ predictors (including the empty one)?", 56, 0.001),
  m(AS, "f40-r2", 5, "As the subset size increases, the $R^2$ of the best subset:", "Never decreases",
    [["Always decreases", "More predictors can't worsen the best fit."], ["Peaks then falls", "In-sample $R^2$ doesn't fall."], ["Is constant", "No."]]),
  n(AS, "f40-cp-size", 5.5, "Best subsets of size $1, 2, 3$ have RSS $50, 30, 28$; $\\hat{\\sigma}^2 = 2$, $n = 20$, and $p = $ size $+ 1$. Which size minimises $C_p = \\mathrm{RSS}/\\hat{\\sigma}^2 - n + 2p$?", 2, 0.001),
  m(AS, "f40-infeasible", 6, "With $60$ candidate predictors, exhaustive search is infeasible. Practical alternatives include:", "Stepwise search, the lasso, or mixed-integer optimisation",
    [["Fitting all subsets anyway", "$2^{60}$ is too many."], ["Using $R^2$ on the full model", "Doesn't select."], ["Dropping half the data", "Doesn't help."]]),
  n(AS, "f40-time", 6.5, "At $10^6$ models per second, how many seconds to fit all $2^{30}$ subsets (to the nearest second)?", 1074, 0.002),
  s(AS, "f40-unstable", 7.5, "Why is best-subset selection called unstable, and what are the consequences?",
    "Small changes in the data can switch which subset wins, making the fitted model a discontinuous function of the data (Breiman, 1996).",
    "That discontinuity adds variance to predictions; bagging or continuous shrinkage (ridge, lasso) often predicts better despite best subset's lower bias."),
  s(AS, "f40-uncertainty", 9, "How can you express uncertainty about which subset is best?",
    "Bootstrap the whole selection procedure and report inclusion frequencies for variables and the frequency of each selected model.",
    "Alternatively, form a model confidence set (models not significantly worse than the best) or use Bayesian model averaging to get posterior inclusion probabilities."),

  // --- stein-shrinkage ---------------------------------------------------
  m(ST, "f40-why", 1.5, "Stein-type shrinkage reduces total MSE mainly by:", "Trading a little bias for a larger reduction in variance across many coordinates",
    [["Reducing bias", "It adds bias."], ["Discarding coordinates", "It shrinks, not discards."], ["Using more data", "Same data."]]),
  n(ST, "f40-factor", 2.5, "James–Stein with $p = 6$, $\\sigma^2 = 1$ and $\\|x\\|^2 = 16$. What is the factor $1 - (p - 2)\\sigma^2/\\|x\\|^2$?", 0.75, 0.001),
  n(ST, "f40-pospart", 3.5, "$p = 12$, $\\sigma^2 = 1$, $\\|x\\|^2 = 5$. What is the positive-part James–Stein factor?", 0, 0.001),
  n(ST, "f40-garrote", 4, "Garrote factor $c_j = (1 - \\lambda/\\hat{\\beta}_j^2)_+$ with $\\lambda = 1$ and $\\hat{\\beta}_j = 3$. What is $c_j$ (to $4$ decimals)?", 0.8889, 0.002),
  m(ST, "f40-garrote-needs", 5, "The non-negative garrote requires:", "Initial OLS estimates (so $p < n$), shrunk by non-negative factors",
    [["No initial estimates", "It scales OLS estimates."], ["$p > n$", "OLS must exist."], ["Negative factors", "Factors are constrained $\\ge 0$."]]),
  n(ST, "f40-grand", 5.5, "Shrinking towards the grand mean: $\\bar{x} = 10$, $c = 0.6$, $x_i = 15$. What is $\\bar{x} + c(x_i - \\bar{x})$?", 13, 0.001),
  m(ST, "f40-inadmissible", 6, "The original James–Stein estimator is itself:", "Inadmissible — the positive-part version dominates it",
    [["Admissible", "It's dominated."], ["Worse than least squares", "It dominates least squares."], ["Unbiased", "It's biased."]]),
  n(ST, "f40-expected-norm", 6.5, "$x \\sim N(\\theta, I_p)$ with $\\|\\theta\\|^2 = 6$ and $p = 4$. What is $E\\|x\\|^2 = \\|\\theta\\|^2 + p$?", 10, 0.001),
  s(ST, "f40-regression", 7.5, "Explain why Stein's result implies that OLS is inadmissible for estimating $p \\ge 3$ regression coefficients.",
    "Transform to an orthonormal design: $\\hat{\\beta}$ becomes $p$ independent normal means with common variance, the setting of Stein's theorem.",
    "So under total squared error loss for $\\beta$ (in the right metric), a James–Stein-type shrinkage of OLS has lower risk for every $\\beta$ when $p \\ge 3$."),
  s(ST, "f40-ridge-link", 9, "How is ridge regression related to Stein shrinkage, and how can $\\lambda$ be chosen to mimic it?",
    "In an orthonormal design ridge multiplies OLS by $1/(1 + \\lambda)$ — uniform shrinkage like James–Stein's factor $1 - (p - 2)\\sigma^2/\\|\\hat{\\beta}\\|^2$.",
    "Choosing $\\lambda$ from the data so that $1/(1 + \\lambda)$ matches that factor (an empirical Bayes choice) recovers James–Stein; GCV or marginal likelihood pick $\\lambda$ in the same spirit."),

  // --- post-selection-inference ------------------------------------------
  m(PS, "f40-double", 1.5, "“Double dipping” in model selection means:", "Using the same data both to choose the model and to test it",
    [["Fitting two models", "Not the issue."], ["Collecting data twice", "No."], ["Using two significance levels", "No."]]),
  n(PS, "f40-expected", 2.5, "$40$ pure-noise predictors are each tested at $\\alpha = 0.05$. How many false positives are expected?", 2, 0.001),
  n(PS, "f40-bonf", 3.5, "What per-test level gives a family-wise error of $0.05$ over $25$ tests with Bonferroni?", 0.002, 0.001),
  n(PS, "f40-fwer", 4.5, "Ten independent null tests at $\\alpha = 0.05$. What is the probability of at least one false positive (to $4$ decimals)?", 0.4013, 0.002),
  m(PS, "f40-split-need", 5, "Sample splitting gives valid inference provided:", "The selection half and the inference half are independent",
    [["The model is correct", "Validity comes from independence."], ["The same observations are reused", "That breaks it."], ["The selection is linear", "Any selection rule works."]]),
  n(PS, "f40-width", 5.5, "Using only $25\\%$ of the data for inference instead of all of it multiplies interval widths by what factor?", 2, 0.001),
  m(PS, "f40-selective", 6, "Selective inference controls error rates:", "Conditional on the selection event that occurred",
    [["Unconditionally over all models", "That's PoSI-style."], ["Only for the true model", "No."], ["Not at all", "It does control them."]]),
  n(PS, "f40-max2", 6.5, "Two independent $N(0, 1)$ estimates; you report the larger. What is its expected value, $1/\\sqrt{\\pi}$ (to $4$ decimals)?", 0.5642, 0.002),
  s(PS, "f40-nested", 7.5, "Why is the cross-validation error used to tune a model an optimistic estimate of its performance, and what fixes it?",
    "Choosing the tuning value with the lowest CV error selects partly on noise in those CV estimates, so the minimum is biased downward.",
    "Nested CV — an outer loop for assessment around an inner loop for tuning — or a held-out test set gives an honest estimate."),
  s(PS, "f40-debiased", 9, "Describe how the debiased (desparsified) lasso produces confidence intervals in high dimensions.",
    "Correct the lasso estimate with a one-step adjustment $\\hat{\\beta}^d = \\hat{\\beta} + \\hat{\\Theta}X^\\top(y - X\\hat{\\beta})/n$, where $\\hat{\\Theta}$ approximates the inverse covariance (e.g. by nodewise lasso).",
    "The debiased estimator is asymptotically normal for each coordinate under sparsity, giving intervals $\\hat{\\beta}^d_j \\pm z\\,\\widehat{\\mathrm{se}}_j$ for the full-model coefficients."),

  // --- principal-components-regression -----------------------------------
  m(PC, "f40-regressors", 1.5, "PCR uses as regressors:", "The principal component scores of the predictors",
    [["The original predictors", "It transforms them first."], ["The response's components", "Components come from $X$."], ["Random projections", "No."]]),
  n(PC, "f40-first", 2.5, "Eigenvalues are $4, 1, 0.5, 0.5$. What proportion of predictor variance does the first component explain (to $4$ decimals)?", 0.6667, 0.002),
  n(PC, "f40-cum", 3.5, "Same eigenvalues. What cumulative proportion do the first two components explain (to $4$ decimals)?", 0.8333, 0.002),
  m(PC, "f40-unsupervised", 4, "PCR's components are chosen without reference to $y$. This means:", "Components with small variance may be dropped even if they predict $y$ well",
    [["PCR always predicts better than OLS", "Not guaranteed."], ["The components are correlated with $y$ by construction", "No."], ["PCR equals PLS", "PLS uses $y$."]]),
  n(PC, "f40-cond", 4.5, "The largest and smallest eigenvalues of $X^\\top X$ are $4$ and $0.04$. What is the condition number $\\sqrt{\\lambda_{\\max}/\\lambda_{\\min}}$?", 10, 0.001),
  m(PC, "f40-back", 5, "PCR coefficients on the original (standardised) predictors are recovered by:", "$\\hat{\\beta} = V_k\\hat{\\gamma}$, with $V_k$ the first $k$ loading vectors",
    [["$\\hat{\\beta} = \\hat{\\gamma}$", "Only if $V = I$."], ["$\\hat{\\beta} = V_k^\\top\\hat{\\gamma}$", "Dimensions don't match."], ["They can't be recovered", "They can."]]),
  n(PC, "f40-beta", 5.5, "One component with loading $v = (0.8, 0.6)$ and coefficient $\\hat{\\gamma} = 2$. What is $\\hat{\\beta}_2$?", 1.2, 0.001),
  n(PC, "f40-var", 6, "$\\operatorname{Var}(\\hat{\\gamma}_k) = \\sigma^2/((n - 1)\\lambda_k)$ with $\\sigma^2 = 4$, $n = 21$, $\\lambda_k = 0.5$. What is it?", 0.4, 0.001),
  s(PC, "f40-jolliffe", 7.5, "Explain how the response can depend only on a low-variance component, and what that means for PCR.",
    "The eigenvalues describe $X$'s variance, not each component's correlation with $y$; nothing prevents $y$ depending on a small-eigenvalue direction (Jolliffe, 1982).",
    "Dropping low-variance components then discards the signal, so PCR fits poorly; choose components by cross-validated prediction, or use PLS or ridge."),
  s(PC, "f40-cv", 8.5, "How should the number of PCR components be chosen by cross-validation, and why must the PCA be redone inside each fold?",
    "For each $k$, estimate prediction error by $K$-fold CV and pick the $k$ with the lowest error (or the one-SE choice).",
    "Computing the components on all the data leaks the held-out fold's information into the training directions, making the CV error optimistic; refit PCA (and standardisation) on each training fold."),
];
