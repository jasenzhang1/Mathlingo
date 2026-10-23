import type { WikiArticle } from "../types";

export const doublyRobustEstimationWiki: WikiArticle = {
  conceptId: "doubly-robust-estimation",

  summary:
    "Outcome regression is biased when the outcome model is wrong; inverse propensity weighting is biased when the propensity model is " +
    "wrong. The augmented inverse probability weighted (AIPW) estimator starts from the regression prediction and adds a weighted " +
    "correction built from the residuals. If the outcome model is right the residuals average to zero; if the propensity model is right " +
    "the weighting removes the outcome model's bias. Either way the estimate is consistent — it is doubly robust — and when both models " +
    "are right it attains the smallest variance any regular estimator can have.",

  sections: [
    {
      heading: "The AIPW estimator",
      blocks: [
        {
          kind: "prose",
          text:
            "Write $\\mu_a(X) = \\mathbb{E}[Y \\mid A = a, X]$ for the outcome regressions and $e(X) = \\mathbb{P}(A = 1 \\mid X)$ for the propensity score. " +
            "For the mean counterfactual under treatment:",
        },
        {
          kind: "formula",
          latex: "\\hat{\\psi}_1 = \\frac{1}{n}\\sum_{i=1}^{n} \\left[ \\hat{\\mu}_1(X_i) + \\frac{A_i\\left( Y_i - \\hat{\\mu}_1(X_i) \\right)}{\\hat{e}(X_i)} \\right]",
        },
        {
          kind: "formula",
          latex: "\\hat{\\tau}_{\\text{AIPW}} = \\hat{\\psi}_1 - \\hat{\\psi}_0, \\qquad \\hat{\\psi}_0 = \\frac{1}{n}\\sum_{i} \\left[ \\hat{\\mu}_0(X_i) + \\frac{(1 - A_i)\\left( Y_i - \\hat{\\mu}_0(X_i) \\right)}{1 - \\hat{e}(X_i)} \\right]",
          caption: "Average treatment effect",
        },
        {
          kind: "prose",
          text:
            "The same template estimates a mean with missing outcomes under MAR: replace $A$ by the response indicator $R$ and $e$ by the response " +
            "propensity $\\pi$, giving $\\frac{1}{n}\\sum_i \\left[ \\hat{m}(X_i) + \\frac{R_i(Y_i - \\hat{m}(X_i))}{\\hat{\\pi}(X_i)} \\right]$.",
        },
      ],
    },

    {
      heading: "Why it is doubly robust",
      blocks: [
        {
          kind: "prose",
          text: "Take expectations with limiting models $\\bar{\\mu}_1$ and $\\bar{e}$, possibly wrong. Using $\\mathbb{E}[A \\mid X] = e(X)$:",
        },
        {
          kind: "formula",
          latex: "\\mathbb{E}\\left[ \\bar{\\mu}_1 + \\frac{A(Y - \\bar{\\mu}_1)}{\\bar{e}} \\right] - \\mathbb{E}[Y(1)] = \\mathbb{E}\\left[ \\frac{\\left( e(X) - \\bar{e}(X) \\right)\\left( \\mu_1(X) - \\bar{\\mu}_1(X) \\right)}{\\bar{e}(X)} \\right]",
          caption: "The bias is a product of the two models' errors",
        },
        {
          kind: "prose",
          text:
            "If either factor is zero — correct propensity or correct outcome model — the bias vanishes. The product structure matters even when " +
            "neither is exactly right: if each is estimated at rate $n^{-1/4}$ (achievable by flexible machine learning), the bias is $o(n^{-1/2})$ " +
            "and the usual $\\sqrt{n}$ normal confidence interval is still valid. This is rate double robustness, the basis of double/debiased machine learning.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Cross-fit flexible models",
          text:
            "When $\\hat{\\mu}$ and $\\hat{e}$ come from random forests or neural nets, fit them on one fold and evaluate the AIPW terms on another, " +
            "then swap. Using the same data for both overfits the residuals toward zero and invalidates the variance estimate.",
        },
      ],
    },

    {
      heading: "Efficiency and inference",
      blocks: [
        {
          kind: "prose",
          text:
            "The bracketed term for each unit is its estimated efficient influence function plus $\\psi$. So the standard error is simply the sample " +
            "standard deviation of the per-unit terms divided by $\\sqrt{n}$, and $\\hat{\\tau} \\pm 1.96\\,\\widehat{\\text{SE}}$ is a $95\\%$ interval.",
        },
        {
          kind: "formula",
          latex: "V_{\\text{eff}} = \\mathbb{E}\\left[ \\frac{\\sigma^{2}_{1}(X)}{e(X)} + \\frac{\\sigma^{2}_{0}(X)}{1 - e(X)} + \\left( \\mu_1(X) - \\mu_0(X) - \\tau \\right)^{2} \\right]",
          caption: "Semiparametric efficiency bound for the ATE under a nonparametric model ($\\sigma^{2}_{a}(X) = \\text{Var}(Y \\mid A = a, X)$)",
        },
        {
          kind: "example",
          title: "Four units, one counterfactual mean",
          problem:
            "Estimate $\\mathbb{E}[Y(1)]$ from units $(A, Y, \\hat{\\mu}_1, \\hat{e})$: $(1, 7, 6, 0.5)$, $(0, \\cdot, 5, 0.25)$, $(1, 4, 5, 0.8)$, $(0, \\cdot, 3, 0.4)$.",
          steps: [
            "Unit 1: $6 + \\frac{7 - 6}{0.5} = 8$. Unit 2 (untreated): $5$. Unit 3: $5 + \\frac{4 - 5}{0.8} = 3.75$. Unit 4: $3$.",
            "AIPW: $\\frac{8 + 5 + 3.75 + 3}{4} = 4.9375$.",
            "For comparison, regression alone gives $\\frac{6 + 5 + 5 + 3}{4} = 4.75$ and IPW alone gives $\\frac{1}{4}\\left(\\frac{7}{0.5} + \\frac{4}{0.8}\\right) = 4.75$.",
          ],
          answer: "$\\approx 4.94$. The correction terms $+2$ and $-1.25$ adjust the regression predictions using the observed residuals.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Robust and efficient are different promises",
          text:
            "Double robustness is about consistency; efficiency is about variance. Under extra assumptions (say, MAR in a double-sampling design) a " +
            "more restricted estimator can be more efficient — the trade-off at the heart of adaptive estimation.",
        },
      ],
    },
  ],

  references: [
    { source: "Robins, Rotnitzky, Zhao, Estimation of Regression Coefficients When Some Regressors Are Not Always Observed (JASA 1994)", locator: "augmented IPW" },
    { source: "Hernán, Robins, Causal Inference: What If", locator: "Ch. 13, Standardization and the Parametric G-Formula (doubly robust estimators)" },
    { source: "Chernozhukov et al., Double/Debiased Machine Learning for Treatment and Structural Parameters (Econometrics Journal 2018)", locator: "§3, cross-fitting" },
  ],
};
