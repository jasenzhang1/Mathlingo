import type { Item } from "../../../lib/assessment/types";
import { m, n, s } from "./shared";

const BLR = "bayesian-linear-regression";
const BMA = "bayesian-model-averaging";
const GPR = "gp-regression";
const GPC = "gp-classification";

const blr: Item[] = [
  // level 1
  m(BLR, "t50-recall-prior-role", 1, "In Bayesian linear regression, the prior on $\\boldsymbol{\\beta}$ encodes:",
    "Beliefs about the coefficients before the data are seen",
    [
      ["The distribution of the errors $\\varepsilon_i$", "Confuses the prior with the likelihood: the error model is part of $p(\\mathbf{y} \\mid \\boldsymbol{\\beta}, \\sigma^2)$."],
      ["The sampling distribution of $\\hat{\\boldsymbol{\\beta}}_{\\text{OLS}}$", "Mixes in the frequentist view: the sampling distribution is over repeated datasets, not a belief about $\\boldsymbol{\\beta}$."],
      ["The distribution of the predictors $\\mathbf{X}$", "Regression conditions on $\\mathbf{X}$; the prior is on the coefficients, not on the inputs."],
    ]),
  m(BLR, "t50-recall-likelihood", 1, "With Gaussian errors, the likelihood in Bayesian linear regression is:",
    "$\\mathbf{y} \\mid \\boldsymbol{\\beta}, \\sigma^2 \\sim \\mathcal{N}(\\mathbf{X}\\boldsymbol{\\beta}, \\sigma^2\\mathbf{I})$",
    [
      ["$\\mathbf{y} \\mid \\boldsymbol{\\beta}, \\sigma^2 \\sim \\mathcal{N}(\\boldsymbol{\\beta}, \\sigma^2\\mathbf{I})$", "Forgets the design matrix: the mean of $\\mathbf{y}$ is the linear predictor $\\mathbf{X}\\boldsymbol{\\beta}$, not $\\boldsymbol{\\beta}$ itself."],
      ["$\\boldsymbol{\\beta} \\mid \\mathbf{y} \\sim \\mathcal{N}(\\hat{\\boldsymbol{\\beta}}, \\sigma^2\\mathbf{I})$", "That is a statement about the posterior (and with the wrong covariance), not the likelihood."],
      ["$\\mathbf{y} \\sim \\mathcal{N}(\\mathbf{0}, \\sigma^2\\mathbf{X}^\\top\\mathbf{X})$", "Confuses the likelihood with a marginal distribution, and the covariance has the wrong shape ($p \\times p$, not $n \\times n$)."],
    ]),
  m(BLR, "t50-recall-predictive", 1, "The posterior predictive distribution of a new response $y^*$ is obtained by averaging the likelihood of $y^*$ over:",
    "The posterior distribution of the parameters",
    [
      ["The prior distribution of the parameters", "Averaging over the prior gives the prior predictive, which ignores the observed data."],
      ["The sampling distribution of the OLS estimator", "That is a frequentist construction, not part of Bayesian prediction."],
      ["The empirical distribution of the training responses", "Resampling the old $y_i$ ignores the new input $\\mathbf{x}^*$ and the model entirely."],
    ]),
  // level 2
  n(BLR, "t50-apply-post-var", 2, "A single coefficient has prior precision $4$ and data precision $12$. What is its posterior variance? Give $4$ decimal places.", 0.0625),
  // level 3
  n(BLR, "t50-apply-precision-mean", 3, "A single coefficient has prior mean $1$ with precision $3$; the OLS estimate is $4$ with data precision $9$. What is the posterior mean?", 3.25),
  n(BLR, "t50-apply-ridge-k", 3, "The prior is $\\boldsymbol{\\beta} \\sim \\mathcal{N}(\\mathbf{0}, \\tau^2\\mathbf{I})$ with $\\tau^2 = 2$ and the noise variance is $\\sigma^2 = 4$. The posterior mean is a ridge estimator with penalty $k$. Find $k$.", 2),
  // level 4
  n(BLR, "t50-apply-origin-mean", 4, "Regression through the origin with $\\sigma^2 = 2$ known, $\\sum x_i^2 = 10$ and $\\sum x_iy_i = 30$. The prior is $\\beta \\sim \\mathcal{N}(0, 1)$. What is the posterior mean of $\\beta$?", 2.5),
  n(BLR, "t50-apply-origin-sd", 4, "Same setting ($\\sigma^2 = 2$, $\\sum x_i^2 = 10$, prior $\\beta \\sim \\mathcal{N}(0, 1)$). What is the posterior standard deviation of $\\beta$? Give $4$ decimal places.", 0.4082),
  n(BLR, "t50-apply-origin-pred", 4, "Same setting. What is the posterior predictive variance of a new response at $x_0 = 2$? Give $4$ decimal places.", 2.6667),
  // level 5
  n(BLR, "t50-apply-two-coef-mean", 5, "Two coefficients, $\\sigma^2 = 1$, prior $\\boldsymbol{\\beta} \\sim \\mathcal{N}(\\mathbf{0}, \\mathbf{I})$, $\\mathbf{X}^\\top\\mathbf{X} = \\begin{bmatrix} 4 & 0 \\\\ 0 & 1 \\end{bmatrix}$ and $\\mathbf{X}^\\top\\mathbf{y} = [10, 3]$. What is the posterior mean of $\\beta_2$?", 1.5),
  n(BLR, "t50-apply-two-coef-var", 5, "Same setting. What is the posterior variance of $\\beta_1$?", 0.2),
  // level 7
  s(BLR, "t50-explain-spread-shrink", 7, "Two coefficients get the same $\\mathcal{N}(0, \\tau^2)$ prior, but predictor $x_1$ has a much larger spread in the data than $x_2$. Which coefficient’s posterior mean is shrunk more toward $0$, and why?",
    "Identifies $\\beta_2$ (the low-spread predictor) as shrunk more.",
    "Explains that the data precision for a coefficient grows with $\\sum x_{ij}^2/\\sigma^2$, so a low-spread predictor carries less information and the prior gets more weight."),
  // level 8
  n(BLR, "t50-apply-sequential", 8, "Regression through the origin with $\\sigma^2 = 1$. After a first batch, the posterior is $\\beta \\sim \\mathcal{N}(2, 0.5)$. A second batch has $\\sum x_i^2 = 2$ and $\\sum x_iy_i = 8$. Using the first posterior as the prior, what is the final posterior mean?", 3),
  n(BLR, "t50-apply-collinear-corr", 8, "With $\\sigma^2 = 1$, prior $\\boldsymbol{\\beta} \\sim \\mathcal{N}(\\mathbf{0}, \\mathbf{I})$ and nearly collinear predictors, $\\mathbf{X}^\\top\\mathbf{X} = \\begin{bmatrix} 10 & 9 \\\\ 9 & 10 \\end{bmatrix}$. What is the posterior correlation of $\\beta_1$ and $\\beta_2$? Give $4$ decimal places.", -0.8182),
  s(BLR, "t50-derive-g-prior", 8, "Under Zellner’s $g$-prior $\\boldsymbol{\\beta} \\mid \\sigma^2 \\sim \\mathcal{N}(\\mathbf{0}, g\\sigma^2(\\mathbf{X}^\\top\\mathbf{X})^{-1})$, derive the posterior mean of $\\boldsymbol{\\beta}$ in terms of $\\hat{\\boldsymbol{\\beta}}_{\\text{OLS}}$.",
    "Adds the precisions: posterior precision is $\\left(1 + \\frac{1}{g}\\right)\\mathbf{X}^\\top\\mathbf{X}/\\sigma^2$.",
    "Concludes the mean is $\\frac{g}{1 + g}\\hat{\\boldsymbol{\\beta}}_{\\text{OLS}}$ (posterior covariance times $\\mathbf{X}^\\top\\mathbf{y}/\\sigma^2$)."),
  // level 9
  n(BLR, "t50-apply-eb-tau", 9, "One coefficient: its OLS estimate is $\\hat{\\beta} = 3$ with sampling variance $s^2 = 1$, and the prior is $\\beta \\sim \\mathcal{N}(0, \\tau^2)$. Empirical Bayes picks $\\tau^2 \\ge 0$ to maximise the marginal likelihood of $\\hat{\\beta}$. Find $\\tau^2$.", 8),
  s(BLR, "t50-transfer-units", 9, "A colleague puts an independent $\\mathcal{N}(0, 1)$ prior on every coefficient of a regression where one predictor is in dollars and another in millions of dollars. Explain the problem and how to fix it.",
    "Explains that the same prior scale means very different amounts of shrinkage depending on each predictor’s units, so the prior is not neutral across coefficients.",
    "Proposes standardising the predictors (or scaling each prior to its predictor’s units) before applying a common prior."),
  // level 10
  s(BLR, "t50-judge-evidence-tau", 10, "The marginal likelihood of Bayesian regression with prior $\\boldsymbol{\\beta} \\sim \\mathcal{N}(\\mathbf{0}, \\tau^2\\mathbf{I})$ is $\\mathbf{y} \\sim \\mathcal{N}(\\mathbf{0}, \\sigma^2\\mathbf{I} + \\tau^2\\mathbf{X}\\mathbf{X}^\\top)$. Explain how maximising it over $\\tau^2$ trades fit against complexity, and why it can return $\\tau^2 = 0$.",
    "Identifies the two terms: a data-fit quadratic form that rewards larger $\\tau^2$ when the signal is strong, and a log-determinant term that penalises spreading probability over many possible datasets.",
    "Explains that when the data look like pure noise (little signal along $\\mathbf{X}$), the penalty dominates and the optimum sits on the boundary $\\tau^2 = 0$, shrinking all coefficients to zero."),
  s(BLR, "t50-judge-shift", 10, "A Bayesian linear regression gives well-calibrated predictive intervals on inputs like the training data but intervals that are far too narrow on inputs from a new region. Explain why the model’s uncertainty fails to grow enough, and what you would change.",
    "Explains that the predictive variance $\\sigma^2 + \\mathbf{x}^{*\\top}\\boldsymbol{\\Sigma}\\mathbf{x}^*$ only reflects parameter uncertainty within a linear model, so misspecification (the true function bending away from a line) is invisible to it.",
    "Proposes a richer model whose uncertainty reflects distance from the data (basis expansion, a GP, model averaging) or otherwise representing model uncertainty."),
  s(BLR, "t50-judge-collinear", 10, "Two predictors are almost identical. Describe the joint posterior of $(\\beta_1, \\beta_2)$ and explain why $\\beta_1 + \\beta_2$ is estimated precisely while each coefficient is not.",
    "Describes an elongated posterior with strong negative correlation between $\\beta_1$ and $\\beta_2$.",
    "Explains that the data inform the combined effect $\\beta_1 + \\beta_2$, while the difference $\\beta_1 - \\beta_2$ is barely identified and is mainly controlled by the prior."),
];

const bma: Item[] = [
  // level 1
  m(BMA, "t50-recall-needs", 1, "To compute the posterior model probability $p(M_k \\mid \\mathbf{y})$, each model needs:",
    "Its marginal likelihood (evidence) and its prior probability",
    [
      ["Only its maximised likelihood", "The maximised likelihood always favours the largest model; Bayes integrates over parameters instead."],
      ["Only its number of parameters", "Complexity alone ignores how well the model fits the data."],
      ["Only its residual variance", "A residual variance is a fit summary, not a probability for the model."],
    ]),
  m(BMA, "t50-recall-pip", 1, "The posterior inclusion probability of a predictor is:",
    "The total posterior probability of the models that contain it",
    [
      ["The p-value of its coefficient in the full model", "Confuses a frequentist test statistic with a posterior probability."],
      ["The prior probability that it is in the model", "That is the prior inclusion probability, before seeing data."],
      ["The size of its coefficient in the best model", "A coefficient magnitude is not a probability of inclusion."],
    ]),
  m(BMA, "t50-recall-coef-mixture", 1, "Under BMA, the posterior distribution of a coefficient $\\beta_j$ is:",
    "A mixture over models, including a point mass at $0$ from models that exclude $x_j$",
    [
      ["The normal posterior from the single best model", "That is model selection, not model averaging."],
      ["The average of each model’s point estimate", "Averaging point estimates gives only the mean, not the full distribution."],
      ["Uniform over the range of the estimates", "There is no reason for a uniform shape; the mixture weights are the model probabilities."],
    ]),
  // level 2
  n(BMA, "t50-apply-avg-three", 2, "Three models have posterior probabilities $0.6$, $0.3$ and $0.1$ and predict $5$, $8$ and $2$. What is the BMA prediction?", 5.6),
  n(BMA, "t50-apply-bf-post", 2, "Two models have equal prior probabilities and $\\text{BF}_{21} = 3$. What is $p(M_2 \\mid \\mathbf{y})$?", 0.75),
  // level 3
  n(BMA, "t50-apply-unequal-prior", 3, "Prior probabilities are $0.8$ for $M_1$ and $0.2$ for $M_2$; marginal likelihoods are $1 \\times 10^{-6}$ and $4 \\times 10^{-6}$. What is $p(M_2 \\mid \\mathbf{y})$?", 0.5),
  n(BMA, "t50-apply-three-evidence", 3, "Three models with equal prior probabilities have marginal likelihoods proportional to $1$, $2$ and $5$. What is the posterior probability of the third?", 0.625),
  // level 4
  n(BMA, "t50-apply-occam-window", 4, "Five models have posterior probabilities $0.6$, $0.25$, $0.11$, $0.025$ and $0.015$. Occam’s window drops every model with probability below $1/20$ of the best, then renormalises. What is the renormalised probability of the best model? Give $3$ decimal places.", 0.625),
  n(BMA, "t50-apply-bic-three", 4, "Three models with equal priors have BIC values $100$, $102$ and $106$; weights are proportional to $e^{-\\text{BIC}/2}$. What is the weight of the first model? Give $4$ decimal places.", 0.7054),
  // level 5
  n(BMA, "t50-apply-mix-var", 5, "Two models with weights $0.5$ each give predictive means $0$ and $4$ and predictive variances $1$ and $3$. What is the BMA predictive variance?", 6),
  m(BMA, "t50-apply-when-same", 5, "BMA predictions are nearly identical to those of the single top model when:",
    "One model has posterior probability close to $1$",
    [
      ["All models have equal posterior probability", "Equal weights is when averaging changes the prediction the most."],
      ["The models disagree strongly", "Disagreement plus non-trivial weights makes the average differ from any one model."],
      ["Never, because averaging always changes the prediction", "If the weights collapse onto one model, the average is that model."],
    ]),
  // level 8
  n(BMA, "t50-apply-pip-four", 8, "With predictors $x_1$ and $x_2$ and a uniform prior over the four models, the marginal likelihoods (common scale) are: no predictors $1$, $\\lbrace x_1 \\rbrace$ $4$, $\\lbrace x_2 \\rbrace$ $2$, $\\lbrace x_1, x_2 \\rbrace$ $3$. What is the posterior inclusion probability of $x_1$?", 0.7),
  n(BMA, "t50-apply-coef-var", 8, "Model $M_1$ (probability $0.6$) contains $x_1$ with $\\beta_1 \\mid M_1 \\sim \\mathcal{N}(2, 0.5)$; model $M_0$ (probability $0.4$) excludes it, so $\\beta_1 = 0$. What is the BMA posterior variance of $\\beta_1$?", 1.26),
  s(BMA, "t50-explain-log-score", 8, "Explain why, if the true model is one of the candidates and the priors are correct, BMA gives better expected log predictive score than committing to any single model.",
    "States that the BMA predictive is the exact posterior predictive when the model set and priors are right, so it is the expected-score optimal forecast under the log score (a proper scoring rule).",
    "Notes that choosing one model is a special case (all weight on one model) and so cannot do better on average; it ignores model uncertainty."),
  // level 9
  n(BMA, "t50-apply-size-prior", 9, "With $p = 4$ candidate predictors, a prior puts equal probability on each model size $0, 1, \\ldots, 4$ and splits it equally among models of that size. What is the prior probability of one particular model with $2$ predictors? Give $4$ decimal places.", 0.0333),
  s(BMA, "t50-transfer-dilution", 9, "A model space contains ten nearly identical copies of one predictor alongside one unrelated predictor, with a uniform prior over models. Explain how this distorts BMA, and how to fix it.",
    "Explains dilution: posterior mass for the shared signal is split across many near-equivalent models, so each copy’s inclusion probability looks low and the prior effectively overweights that region of model space.",
    "Proposes a dilution prior or hierarchical prior that accounts for redundancy (or combining the copies), rather than a uniform prior over models."),
  // level 10
  s(BMA, "t50-judge-coef-meaning", 10, "Explain why averaging a coefficient across models can mislead when $x_1$ is correlated with $x_2$ and some models omit $x_2$, while averaging predictions is unproblematic.",
    "Explains that $\\beta_1$ means different things in different models (an effect adjusted for $x_2$ or not), so the average mixes incompatible quantities.",
    "Notes that predictions target the same observable $y$ in every model, so averaging them is coherent."),
  s(BMA, "t50-judge-m-open-collapse", 10, "As $n$ grows, BMA weights collapse onto one model even when the truth is outside the candidate set. Explain why this is dangerous and what you would do instead.",
    "Explains that the weights concentrate on the model closest to the truth in KL divergence, so BMA becomes overconfident and its intervals ignore the remaining misspecification.",
    "Suggests an alternative such as stacking predictive distributions, expanding the model, or checking fit with posterior predictive or cross-validation checks."),
  s(BMA, "t50-judge-mc3", 10, "With $40$ candidate predictors, $2^{40}$ models cannot be enumerated. Describe how MC³ explores model space and how posterior model probabilities are estimated from its output.",
    "Describes a Metropolis–Hastings chain over models that proposes adding or dropping one predictor and accepts with the ratio of marginal likelihood times prior.",
    "Explains estimating probabilities from visit frequencies, or by renormalising the exact evidences of the visited models, with the caveat that unvisited models are missed."),
  s(BMA, "t50-judge-median-model", 10, "A team must deploy one model rather than an average. When is the median probability model (predictors with inclusion probability above $0.5$) a good choice, and what is lost compared with full BMA?",
    "States that the median probability model is predictively optimal under certain conditions (e.g. orthogonal designs, Barbieri–Berger) and is often better than the single highest-probability model.",
    "Notes that committing to one model loses the extra predictive variance from model uncertainty, so intervals become overconfident."),
];

const gpr: Item[] = [
  // level 1
  m(GPR, "t50-recall-kernel-gives", 1, "In GP regression, the kernel value $k(\\mathbf{x}, \\mathbf{x}')$ gives:",
    "The prior covariance between $f(\\mathbf{x})$ and $f(\\mathbf{x}')$",
    [
      ["The distance between $\\mathbf{x}$ and $\\mathbf{x}'$", "Many kernels depend on distance, but the kernel value is a covariance, which decreases as distance grows."],
      ["The predictive mean at $\\mathbf{x}$", "The predictive mean comes from conditioning, not from a single kernel value."],
      ["The observation noise variance", "Noise variance is a separate likelihood parameter added on the diagonal."],
    ]),
  m(GPR, "t50-recall-closed-form", 1, "With Gaussian observation noise, the GP regression posterior at test points is:",
    "Gaussian, available in closed form",
    [
      ["Intractable, requiring MCMC", "Confuses regression with classification: a Gaussian likelihood keeps everything jointly Gaussian."],
      ["A point estimate with no variance", "A GP gives a full predictive distribution."],
      ["Always Student-$t$", "A Student-$t$ arises only if the noise or kernel scale is integrated out."],
    ]),
  m(GPR, "t50-recall-noise", 1, "In GP regression, the noise variance $\\sigma_n^2$ models:",
    "Measurement noise added to the latent function value",
    [
      ["The prior variance of $f$", "That is the kernel amplitude, $k(\\mathbf{x}, \\mathbf{x})$."],
      ["How quickly $f$ varies with $\\mathbf{x}$", "That is the lengthscale."],
      ["The prior mean of $f$", "The mean function is separate from the noise model."],
    ]),
  // level 2
  n(GPR, "t50-apply-rbf-two", 2, "Find the RBF kernel value $k(x, x') = \\exp\\left(-\\frac{(x - x')^2}{2\\ell^2}\\right)$ with $\\ell = 1$, $x = 0$ and $x' = 2$. Give $4$ decimal places.", 0.1353),
  n(GPR, "t50-apply-amplitude", 2, "The kernel is $k(x, x') = s^2\\exp\\left(-\\frac{(x - x')^2}{2}\\right)$ with $s = 3$. What is the prior variance of $f(x)$?", 9),
  // level 3
  n(GPR, "t50-apply-one-mean0", 3, "One training point $(x_1, y_1) = (0, 3)$, kernel $k(x, x') = \\exp\\left(-\\frac{(x - x')^2}{2}\\right)$, noise variance $0.5$. What is the predictive mean at $x = 0$?", 2),
  n(GPR, "t50-apply-one-mean1", 3, "Same setting. What is the predictive mean at $x = 1$? Give $4$ decimal places.", 1.2131),
  n(GPR, "t50-apply-one-var0", 3, "Same setting. What is the predictive variance of $f(0)$? Give $4$ decimal places.", 0.3333),
  // level 4
  n(GPR, "t50-apply-two-mean", 4, "Two training points $x = 0$ and $x = 1$ with $y = [1, 1]$, kernel $k(x, x') = \\exp\\left(-\\frac{(x - x')^2}{2}\\right)$ and noise variance $1$. What is the predictive mean at $x = 0$? Give $4$ decimal places.", 0.6164),
  n(GPR, "t50-apply-two-var", 4, "Same setting. What is the predictive variance of $f(0)$? Give $4$ decimal places.", 0.4494),
  n(GPR, "t50-apply-fit-term", 4, "One training point with $y = 2$, $k(x, x) = 1$ and noise variance $1$. What is the data-fit term $-\\frac{1}{2}\\mathbf{y}^\\top(\\mathbf{K} + \\sigma_n^2\\mathbf{I})^{-1}\\mathbf{y}$ of the log marginal likelihood?", -1),
  m(GPR, "t50-apply-more-noise", 4, "Raising the noise variance $\\sigma_n^2$ (all else fixed) makes the predictive mean at a training input:",
    "Move further from the observed $y$, toward the prior mean",
    [
      ["Pass exactly through the observed $y$", "Exact interpolation happens only as $\\sigma_n^2 \\to 0$."],
      ["Stay the same", "The noise level changes how much the data are trusted, so the mean changes."],
      ["Overshoot the observed $y$", "With a single point the posterior mean is a shrunken version of $y$, never beyond it."],
    ]),
  // level 5
  n(GPR, "t50-apply-new-y-var", 5, "One training point $(0, 3)$, kernel $k(x, x') = \\exp\\left(-\\frac{(x - x')^2}{2}\\right)$, noise variance $0.5$. What is the predictive variance of a new noisy observation $y$ at $x = 0$? Give $4$ decimal places.", 0.8333),
  n(GPR, "t50-apply-memory", 5, "Storing the kernel matrix for $n = 20{,}000$ training points in double precision ($8$ bytes per entry) takes how many gigabytes ($10^9$ bytes)?", 3.2),
  m(GPR, "t50-apply-rough-kernel", 5, "Which kernel gives sample paths that are continuous but nowhere differentiable?",
    "The Matérn kernel with $\\nu = 1/2$ (exponential kernel)",
    [
      ["The RBF (squared exponential) kernel", "RBF samples are infinitely differentiable — the opposite extreme."],
      ["The linear kernel $k(x, x') = xx'$", "Linear-kernel samples are straight lines, which are smooth."],
      ["The periodic kernel", "Periodic-kernel samples are smooth repeating functions."],
    ]),
  m(GPR, "t50-apply-sum-kernel", 5, "Using the kernel $k_1 + k_2$ corresponds to modelling $f$ as:",
    "A sum $f_1 + f_2$ of independent GPs with kernels $k_1$ and $k_2$",
    [
      ["A product $f_1 f_2$", "Products of functions do not give summed covariances; a product kernel is a different construction."],
      ["A random choice between $f_1$ and $f_2$", "A mixture would not have covariance $k_1 + k_2$."],
      ["The convolution of $f_1$ and $f_2$", "Convolution is not what adding covariance functions does."],
    ]),
  n(GPR, "t50-apply-linear-corr", 5, "With the linear kernel $k(x, x') = 2xx'$, what is $\\text{Corr}(f(2), f(5))$?", 1),
  // level 8
  s(GPR, "t50-derive-linear-kernel", 8, "Show that GP regression with kernel $k(\\mathbf{x}, \\mathbf{x}') = \\tau^2\\mathbf{x}^\\top\\mathbf{x}'$ is Bayesian linear regression with prior $\\boldsymbol{\\beta} \\sim \\mathcal{N}(\\mathbf{0}, \\tau^2\\mathbf{I})$.",
    "Shows that $f(\\mathbf{x}) = \\mathbf{x}^\\top\\boldsymbol{\\beta}$ is Gaussian with covariance $\\text{Cov}(f(\\mathbf{x}), f(\\mathbf{x}')) = \\tau^2\\mathbf{x}^\\top\\mathbf{x}'$.",
    "Concludes that the two models define the same distribution over functions, so their predictions agree (weight-space versus function-space view)."),
  // level 9
  n(GPR, "t50-apply-repeat-mean", 9, "Two noisy observations at the same input $x = 0$: $y = [1, 3]$, with $k(0, 0) = 1$ and noise variance $1$. What is the predictive mean of $f(0)$? Give $4$ decimal places.", 1.3333),
  s(GPR, "t50-transfer-overfit", 9, "A GP fitted to a time series passes almost exactly through every point, but predictions between the points oscillate wildly. Diagnose this in terms of the hyperparameters and say how you would fix it.",
    "Diagnoses a lengthscale that is too short and/or a noise variance driven toward zero, so the GP interpolates noise.",
    "Proposes refitting with hyperpriors or a noise floor, multiple restarts of the marginal-likelihood optimisation, or checking the fit by cross-validation."),
  s(GPR, "t50-transfer-occam", 9, "Explain why the GP log marginal likelihood automatically penalises overly flexible kernels, referring to its terms.",
    "Names the data-fit term $-\\frac{1}{2}\\mathbf{y}^\\top\\mathbf{K}_y^{-1}\\mathbf{y}$ and the complexity term $-\\frac{1}{2}\\log|\\mathbf{K}_y|$.",
    "Explains that a flexible kernel spreads probability over many possible datasets, giving a large determinant and lower density for the observed one, so it wins only if the fit gain outweighs this."),
  // level 10
  s(GPR, "t50-judge-extrapolate", 10, "An RBF-kernel GP with zero mean is used to forecast a steadily growing series five years past the data. What will its predictive mean and variance do, and how would you redesign the model?",
    "Explains that far from the data the mean reverts to the prior mean $0$ and the variance to the prior variance, so the trend is not continued.",
    "Proposes adding a linear (or polynomial) kernel component or a trend mean function so the growth is extrapolated."),
  s(GPR, "t50-judge-hetero", 10, "The noise level of your data is much larger in one region of input space than another. What goes wrong with a standard GP, and how could you model it properly?",
    "Explains that a single noise variance is a compromise, giving intervals too wide in the quiet region and too narrow in the noisy one.",
    "Proposes input-dependent noise, e.g. a second GP on the log noise variance (heteroscedastic GP) or a transformation that stabilises the variance."),
  s(GPR, "t50-judge-kernel-tie", 10, "Two kernels give nearly equal marginal likelihoods on your data but very different extrapolations. How should you decide what to report?",
    "Recognises that the data cannot distinguish them, so the extrapolation is driven by the prior (kernel) assumptions.",
    "Recommends using domain knowledge to choose, or averaging over kernels and reporting the wider spread of predictions."),
  s(GPR, "t50-prove-var-shrinks", 10, "Prove that the GP posterior variance of $f$ at any test point cannot exceed its prior variance, and say when they are equal.",
    "Writes $\\text{Var} = k_{**} - \\mathbf{k}_*^\\top(\\mathbf{K} + \\sigma_n^2\\mathbf{I})^{-1}\\mathbf{k}_*$ and notes the subtracted quadratic form is non-negative because the matrix is positive definite.",
    "States equality holds exactly when $\\mathbf{k}_* = \\mathbf{0}$, i.e. the test value is uncorrelated with every training value."),
];

const gpc: Item[] = [
  // level 1
  m(GPC, "t50-recall-latent-is", 1, "In binary GP classification, the latent function $f(\\mathbf{x})$ is:",
    "An unobserved real-valued function with a GP prior, squashed to give a class probability",
    [
      ["The observed class label", "The labels are observed; $f$ is a hidden quantity behind them."],
      ["The class probability itself", "A GP is unbounded, so it cannot directly be a probability in $[0, 1]$."],
      ["The kernel function", "The kernel is the covariance of $f$, not $f$ itself."],
    ]),
  m(GPC, "t50-recall-likelihood", 1, "For a label $y \\in \\lbrace 0, 1 \\rbrace$, the GP classification likelihood is:",
    "Bernoulli with success probability $\\sigma(f(\\mathbf{x}))$",
    [
      ["Gaussian with mean $f(\\mathbf{x})$", "That is the regression likelihood; labels are binary."],
      ["Poisson with rate $e^{f(\\mathbf{x})}$", "Poisson is for counts, not binary labels."],
      ["Beta with mean $\\sigma(f(\\mathbf{x}))$", "A Beta describes a probability, not an observed $0$/$1$ label."],
    ]),
  m(GPC, "t50-recall-probit", 1, "The probit link maps the latent value $f$ to:",
    "$\\Phi(f)$, the standard normal CDF",
    [
      ["$1/(1 + e^{-f})$", "That is the logistic (logit) link, not probit."],
      ["$e^{f}$", "This is not bounded by $1$, so it cannot be a probability."],
      ["$\\phi(f)$, the standard normal density", "A density is not a probability and does not increase monotonically."],
    ]),
  // level 2
  n(GPC, "t50-apply-logistic2", 2, "The latent value is $f = 2$. What is $p(y = 1)$ under the logistic link? Give $4$ decimal places.", 0.8808),
  n(GPC, "t50-apply-probit-neg1", 2, "The latent value is $f = -1$. What is $p(y = 1)$ under the probit link? Give $4$ decimal places.", 0.1587),
  // level 3
  n(GPC, "t50-apply-logit-inverse", 3, "Under the logistic link, what latent value $f$ gives $p(y = 1) = 0.9$? Give $4$ decimal places.", 2.1972),
  n(GPC, "t50-apply-probit-avg", 3, "The latent posterior is $\\mathcal{N}(1, 3)$ and the link is probit, so $p = \\Phi\\left(\\frac{\\mu}{\\sqrt{1 + s^2}}\\right)$. What is $p$? Give $4$ decimal places.", 0.6915),
  m(GPC, "t50-apply-far-prob", 3, "Far from all training data, a zero-mean GP classifier’s predicted probability tends to:",
    "$0.5$",
    [
      ["The proportion of class $1$ in the training data", "That would need a non-zero mean function; with zero mean the latent posterior reverts to the prior centred at $0$."],
      ["$0$ or $1$, whichever class is nearest", "Far from data the latent values are uncorrelated with the training points."],
      ["It is undefined", "The prior still gives a well-defined predictive probability."],
    ]),
  // level 4
  n(GPC, "t50-apply-mackay", 4, "MacKay’s approximation for the logistic link is $p \\approx \\sigma(\\kappa\\mu)$ with $\\kappa = (1 + \\pi s^2/8)^{-1/2}$. With $\\mu = 2$ and $s^2 = 8/\\pi$, what is $p$? Give $4$ decimal places.", 0.8044),
  n(GPC, "t50-apply-w-zero", 4, "For the logistic likelihood, the Laplace approximation uses $W = \\pi(1 - \\pi)$ with $\\pi = \\sigma(f)$. What is $W$ at $f = 0$?", 0.25),
  n(GPC, "t50-apply-probit-one", 4, "Probit link with latent posterior mean $\\mu = 1.5$ and variance $s^2 = 1.25$. What is the averaged probability $\\Phi\\left(\\frac{\\mu}{\\sqrt{1 + s^2}}\\right)$? Give $4$ decimal places.", 0.8413),
  m(GPC, "t50-apply-laplace-form", 4, "The Laplace approximation for GP classification replaces the posterior over latent values $\\mathbf{f}$ with:",
    "A Gaussian at the posterior mode $\\hat{\\mathbf{f}}$ with covariance $(\\mathbf{K}^{-1} + \\mathbf{W})^{-1}$",
    [
      ["The GP prior $\\mathcal{N}(\\mathbf{0}, \\mathbf{K})$", "That ignores the labels entirely."],
      ["A Gaussian at the exact posterior mean", "The Laplace method centres at the mode found by Newton’s method; the exact mean is not available."],
      ["A point mass at $\\hat{\\mathbf{f}}$", "That is MAP estimation, which discards the uncertainty Laplace keeps."],
    ]),
  // level 5
  n(GPC, "t50-apply-latent-var", 5, "One training point, $k(\\mathbf{x}, \\mathbf{x}) = 1$, and the test point equals the training point ($k_* = k_{**} = 1$). At the mode $W = 0.25$. The Laplace latent predictive variance is $k_{**} - k_*(K + W^{-1})^{-1}k_*$. What is it?", 0.8),
  n(GPC, "t50-apply-latent-mean", 5, "Under Laplace, the latent predictive mean is $\\mathbf{k}_*^\\top\\nabla\\log p(\\mathbf{y} \\mid \\hat{\\mathbf{f}})$. With one training point, $k_* = 0.5$ and gradient $y - \\hat{\\pi} = 0.4$, what is it?", 0.2),
  m(GPC, "t50-apply-same-decision", 5, "With a probit link, plugging in the latent mean $\\Phi(\\mu)$ versus averaging $\\Phi\\left(\\frac{\\mu}{\\sqrt{1 + s^2}}\\right)$ gives the same predicted class (threshold $0.5$):",
    "Always, because both are above $0.5$ exactly when $\\mu > 0$",
    [
      ["Never, because averaging changes the probability", "Averaging moves the probability toward $0.5$ but cannot cross it."],
      ["Only when $s^2 = 0$", "The probabilities agree only then, but the decisions agree always."],
      ["Only for the logistic link", "The argument works for any symmetric link whose averaging preserves the sign of $\\mu$."],
    ]),
  m(GPC, "t50-apply-short-ell", 5, "A GP classifier whose lengthscale is far too short tends to give:",
    "A boundary wrapped tightly around each training point, with probabilities near $0.5$ between them",
    [
      ["A nearly linear decision boundary", "That is the long-lengthscale extreme."],
      ["Probability $1$ everywhere", "Short lengthscales do not push all predictions to one class."],
      ["No change at all", "The lengthscale controls how far each label’s influence reaches."],
    ]),
  // level 7
  n(GPC, "t50-apply-laplace-mode", 7, "One training point with label $y = 1$, prior $f \\sim \\mathcal{N}(0, 1)$, logistic likelihood. The Laplace mode solves $\\hat{f} = 1 - \\sigma(\\hat{f})$. Find $\\hat{f}$. Give $4$ decimal places.", 0.4011),
  n(GPC, "t50-apply-laplace-var", 7, "Same problem. The Laplace posterior variance of $f$ is $1/(1 + W)$ with $W = \\sigma(\\hat{f})(1 - \\sigma(\\hat{f}))$. What is it? Give $4$ decimal places.", 0.8077),
  // level 9
  s(GPC, "t50-explain-log-concave", 9, "Explain why the GP classification posterior over latent values has a unique mode, and why that matters for the Laplace approximation.",
    "Notes that $\\log\\sigma(yf)$ (and the probit analogue) is concave and the Gaussian prior is log-concave, so the log posterior is strictly concave with a single maximum.",
    "Explains that Newton’s method then converges reliably to the mode and $\\mathbf{W}$ is positive, so the Laplace covariance is well defined."),
  s(GPC, "t50-derive-probit-avg", 9, "Derive $\\mathbb{E}[\\Phi(F)] = \\Phi\\left(\\frac{\\mu}{\\sqrt{1 + s^2}}\\right)$ for $F \\sim \\mathcal{N}(\\mu, s^2)$.",
    "Writes $\\Phi(F) = P(Z \\le F \\mid F)$ for an independent $Z \\sim \\mathcal{N}(0, 1)$, so $\\mathbb{E}[\\Phi(F)] = P(Z - F \\le 0)$.",
    "Uses $Z - F \\sim \\mathcal{N}(-\\mu, 1 + s^2)$ to conclude the probability is $\\Phi\\left(\\frac{\\mu}{\\sqrt{1 + s^2}}\\right)$."),
  s(GPC, "t50-transfer-imbalance", 9, "A zero-mean GP classifier is trained on data with $99\\%$ class $0$. What does it predict far from the training data, and how would you fix it?",
    "Explains that far from data it reverts to $0.5$, which ignores the strong base rate.",
    "Proposes a constant (bias) mean function or bias kernel term learned from the data, so the prior latent mean reflects the base rate."),
  // level 10
  s(GPC, "t50-judge-scale", 10, "You need a GP classifier for $10^6$ labelled points. Which approach makes this feasible, and what do you give up?",
    "Proposes sparse variational GP classification with inducing points trained by stochastic (mini-batch) optimisation of the ELBO.",
    "Notes the loss: fine detail beyond the inducing-point resolution and an approximation bias, especially in posterior variance."),
  s(GPC, "t50-judge-label-noise", 10, "Some training labels are flipped at random. How does this affect a standard logistic GP classifier, and how could the likelihood be made robust?",
    "Explains that a mislabeled point deep in the other class forces the latent function to bend sharply, distorting the boundary and confidence.",
    "Proposes a robust likelihood such as $p(y = 1) = \\varepsilon/2 + (1 - \\varepsilon)\\sigma(f)$ that allows label flips."),
  s(GPC, "t50-judge-hyper", 10, "Explain why learning kernel hyperparameters is harder for GP classification than for GP regression.",
    "Explains that the marginal likelihood is no longer available in closed form, so it and its gradient must come from an approximation (Laplace, EP, variational).",
    "Notes the consequences: nested optimisation (inner mode-finding inside outer hyperparameter search) and bias from the approximation error."),
  s(GPC, "t50-judge-vs-svm", 10, "A GP classifier and an SVM with the same RBF kernel give nearly identical decision boundaries. What does the GP give that the SVM does not, and when does that matter?",
    "Identifies calibrated class probabilities whose uncertainty grows away from the data.",
    "Gives a case where it matters, such as decisions with asymmetric costs, active learning, or flagging out-of-distribution inputs."),
];

export const t50BayesianStatistics11Items: Item[] = [...blr, ...bma, ...gpr, ...gpc];
