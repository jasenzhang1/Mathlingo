import type { WikiArticle } from "../types";

/**
 * Three additions to "Beyond the Linear Model": odds and log odds (the scale
 * logistic regression is linear on), odds ratios (how its coefficients are
 * read), and deviance with deviance residuals (how any GLM's fit is judged).
 */

export const oddsAndLogOddsWiki: WikiArticle = {
  conceptId: "odds-and-log-odds",
  summary:
    "Odds re-express a probability as a ratio of “for” to “against”: $p/(1 - p)$. Taking the log gives the logit, which " +
    "maps $(0, 1)$ onto the whole real line, symmetric about $p = \\tfrac{1}{2}$. That is exactly what a linear predictor " +
    "needs, which is why logistic regression models the log odds rather than the probability.",
  sections: [
    {
      heading: "Definitions",
      blocks: [
        {
          kind: "formula",
          latex: "\\text{odds}(p) = \\frac{p}{1 - p}, \\qquad \\operatorname{logit}(p) = \\log \\frac{p}{1 - p}, \\qquad p = \\frac{\\text{odds}}{1 + \\text{odds}} = \\frac{1}{1 + e^{-\\operatorname{logit}(p)}}",
        },
        {
          kind: "table",
          headers: ["$p$", "Odds", "Log odds"],
          rows: [
            ["$0.1$", "$1/9 \\approx 0.111$", "$-2.197$"],
            ["$0.5$", "$1$", "$0$"],
            ["$0.8$", "$4$", "$1.386$"],
            ["$0.9$", "$9$", "$2.197$"],
          ],
        },
        {
          kind: "list",
          items: [
            "Odds run from $0$ to $\\infty$; log odds run from $-\\infty$ to $\\infty$.",
            "Symmetry: $\\operatorname{logit}(1 - p) = -\\operatorname{logit}(p)$, so swapping which outcome is “success” flips the sign.",
            "The inverse of the logit is the logistic (sigmoid) function $\\sigma(\\eta) = 1/(1 + e^{-\\eta})$.",
          ],
        },
      ],
    },
    {
      heading: "Why model the log odds",
      blocks: [
        {
          kind: "prose",
          text:
            "A linear predictor $\\eta = \\beta_0 + \\beta^\\top x$ can take any real value, but a probability cannot. Modelling " +
            "$p = \\eta$ directly produces predictions outside $[0, 1]$. Modelling $\\operatorname{logit}(p) = \\eta$ removes the " +
            "constraint: every $\\eta$ corresponds to a valid probability. The logit is also the canonical link of the Bernoulli " +
            "in exponential-family form, which gives logistic regression its clean score equations.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Odds are not probabilities",
          text:
            "Odds of $3$ means $p = 0.75$, not $3$ times as likely as something else. For rare events odds and probability " +
            "nearly coincide ($p = 0.01$ gives odds $0.0101$), but for common events they diverge fast.",
        },
      ],
    },
  ],
  references: [
    { source: "Agresti, Categorical Data Analysis (3rd ed.)", locator: "§2.3, §5.1" },
    { source: "James et al., An Introduction to Statistical Learning (2nd ed.)", locator: "§4.3.1" },
  ],
};

export const oddsRatioWiki: WikiArticle = {
  conceptId: "odds-ratio",
  summary:
    "In logistic regression, $\\operatorname{logit}(p) = \\beta_0 + \\beta_1 x_1 + \\cdots$. A one-unit increase in $x_1$, " +
    "holding the others fixed, adds $\\beta_1$ to the log odds — so it multiplies the odds by $e^{\\beta_1}$, the odds " +
    "ratio. That multiplicative reading is constant across all $x$; the effect on the probability is not.",
  sections: [
    {
      heading: "From coefficient to odds ratio",
      blocks: [
        {
          kind: "formula",
          latex: "\\text{OR} = \\frac{\\text{odds}(x_1 + 1)}{\\text{odds}(x_1)} = \\frac{e^{\\beta_0 + \\beta_1(x_1 + 1) + \\cdots}}{e^{\\beta_0 + \\beta_1 x_1 + \\cdots}} = e^{\\beta_1}",
        },
        {
          kind: "list",
          items: [
            "$\\beta_1 > 0 \\iff \\text{OR} > 1$: higher $x_1$ raises the odds. $\\beta_1 = 0 \\iff \\text{OR} = 1$: no association.",
            "A $c$-unit change multiplies the odds by $e^{c\\beta_1}$.",
            "For a binary predictor, $e^{\\beta_1}$ is the odds ratio between the two groups, adjusted for the other covariates.",
            "Confidence interval: exponentiate the endpoints of the interval for $\\beta_1$, $e^{\\hat{\\beta}_1 \\pm 1.96\\,\\widehat{\\text{SE}}}$. It is asymmetric around $e^{\\hat{\\beta}_1}$.",
          ],
        },
      ],
    },
    {
      heading: "Odds ratio versus risk ratio",
      blocks: [
        {
          kind: "prose",
          text:
            "The risk ratio $p_1/p_0$ is what most people mean by “twice as likely”. The odds ratio agrees with it only when " +
            "the outcome is rare; for common outcomes the OR is further from $1$. With $p_0 = 0.4$ and $p_1 = 0.6$, the risk " +
            "ratio is $1.5$ but the odds ratio is $(0.6/0.4)/(0.4/0.6) = 2.25$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why case-control studies love odds ratios",
          text:
            "Sampling on the outcome (cases vs controls) distorts $p$ and so the risk ratio, but leaves the odds ratio " +
            "unchanged — only the intercept of a logistic regression absorbs the sampling. So the OR can be estimated from a " +
            "case-control design; the risk ratio cannot.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Interpreting a coefficient",
          problem: "A model for loan default has coefficient $\\beta = 0.25$ on debt-to-income ratio (in units of $10$ percentage points). Interpret it.",
          steps: [
            "$e^{0.25} \\approx 1.284$.",
            "Each $10$-point rise in debt-to-income multiplies the odds of default by about $1.28$ — a $28\\%$ increase in the odds — holding other predictors fixed.",
            "A $30$-point rise multiplies the odds by $e^{0.75} \\approx 2.12$.",
          ],
          answer: "Odds ratio $\\approx 1.28$ per $10$ points; the change in probability depends on the baseline.",
        },
      ],
    },
  ],
  references: [
    { source: "Agresti, Categorical Data Analysis (3rd ed.)", locator: "§2.3.3, §5.1.3" },
    { source: "Hosmer, Lemeshow & Sturdivant, Applied Logistic Regression (3rd ed.)", locator: "Ch. 3" },
  ],
};

export const devianceResidualsWiki: WikiArticle = {
  conceptId: "deviance-residuals",
  summary:
    "A GLM has no residual sum of squares, so its fit is measured by the deviance: twice the log-likelihood gap between " +
    "the fitted model and the saturated model, which fits every observation exactly. The deviance splits into one " +
    "contribution per observation; their signed square roots are the deviance residuals, the GLM's answer to ordinary " +
    "residuals.",
  sections: [
    {
      heading: "Deviance",
      blocks: [
        {
          kind: "formula",
          latex: "D = 2\\big[\\ell(\\text{saturated}) - \\ell(\\hat{\\beta})\\big] = \\sum_{i=1}^{n} d_i",
        },
        {
          kind: "table",
          headers: ["Family", "Unit deviance $d_i$"],
          rows: [
            ["Normal", "$(y_i - \\hat{\\mu}_i)^2$ — the deviance is the RSS"],
            ["Poisson", "$2\\big[y_i \\log(y_i/\\hat{\\mu}_i) - (y_i - \\hat{\\mu}_i)\\big]$"],
            ["Binomial ($m_i$ trials)", "$2\\big[y_i \\log\\tfrac{y_i}{\\hat{\\mu}_i} + (m_i - y_i)\\log\\tfrac{m_i - y_i}{m_i - \\hat{\\mu}_i}\\big]$"],
          ],
          caption: "with $0 \\log 0 = 0$",
        },
        {
          kind: "list",
          items: [
            "Goodness of fit: when the model is correct and counts are large, $D \\approx \\chi^2_{n - p}$. A deviance much larger than its degrees of freedom signals lack of fit or overdispersion.",
            "Comparing nested models: $D_{\\text{reduced}} - D_{\\text{full}} \\approx \\chi^2_{\\Delta p}$ — the likelihood-ratio test, valid even when the absolute deviance test is not.",
            "For ungrouped binary data ($m_i = 1$) the absolute deviance says nothing about fit — its distribution is not close to $\\chi^2$. Use the Hosmer–Lemeshow test or grouped checks instead.",
          ],
        },
      ],
    },
    {
      heading: "Deviance residuals",
      blocks: [
        {
          kind: "formula",
          latex: "r^D_i = \\operatorname{sign}(y_i - \\hat{\\mu}_i)\\sqrt{d_i}, \\qquad \\sum_i (r^D_i)^2 = D",
        },
        {
          kind: "definitions",
          items: [
            { term: "Pearson residual", description: "$r^P_i = (y_i - \\hat{\\mu}_i)/\\sqrt{V(\\hat{\\mu}_i)}$ — raw residual over the model's standard deviation. Their sum of squares is Pearson's $X^2$." },
            { term: "Deviance residual", description: "Usually closer to normally distributed than Pearson residuals, especially for skewed families such as Poisson with small means, so better for plots and outlier checks." },
            { term: "Standardised versions", description: "Divide by $\\sqrt{\\hat{\\phi}(1 - h_{ii})}$, with $h_{ii}$ the leverage from the IRLS hat matrix, just as studentised residuals do for linear models." },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "What to plot",
          text:
            "Plot deviance residuals against the linear predictor $\\hat{\\eta}_i$ (curvature suggests a wrong link or missing " +
            "term) and on a normal Q-Q plot (heavy tails or outliers). For binary responses the residuals fall on two curves; " +
            "binned residual plots are easier to read.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Checking a Poisson regression",
          problem: "A Poisson regression with $p = 4$ parameters fitted to $n = 54$ counts has residual deviance $98.3$. Is the fit adequate?",
          steps: [
            "Degrees of freedom $n - p = 50$; under a good fit $D \\approx \\chi^2_{50}$, which has mean $50$.",
            "$D/\\text{df} \\approx 1.97$, and $P(\\chi^2_{50} > 98.3) < 0.001$.",
            "The model fits poorly. Common causes: overdispersion (variance larger than the mean), a missing covariate, or a wrong link. Inspect deviance residuals; consider a quasi-Poisson or negative binomial model.",
          ],
          answer: "No — the deviance is about twice its degrees of freedom, strong evidence of lack of fit or overdispersion.",
        },
      ],
    },
  ],
  references: [
    { source: "McCullagh & Nelder, Generalized Linear Models (2nd ed.)", locator: "§2.3, §12.4" },
    { source: "Agresti, Categorical Data Analysis (3rd ed.)", locator: "§4.4, §6.2" },
  ],
};
