import type { WikiArticle } from "../types";

export const regressionWiki: WikiArticle = {
  conceptId: "regression",

  summary:
    "Regression is the study of how the average value of an outcome changes as one or more " +
    "predictors change. Everything else in this domain — least squares, the normal equations, " +
    "ridge, logistic regression, Cox models — is a variation on that one sentence: pick a family " +
    "of candidate functions for E[Y | X], pick a rule for scoring how well a candidate fits, and " +
    "solve. Knowing which of those two choices a method changes is the fastest way to keep the " +
    "whole domain straight.",

  sections: [
    {
      heading: "What regression estimates",
      blocks: [
        {
          kind: "prose",
          text:
            "Given a response Y and predictors X, regression targets the conditional mean function " +
            "μ(x) = E[Y | X = x]. This is a curve (or surface) through the cloud of data, not a " +
            "single number: it says what Y averages to among all units sharing that value of x. " +
            "The conditional mean is not an arbitrary choice of summary — it is the function of X " +
            "that minimises expected squared prediction error, which is exactly why squared error " +
            "and regression turn up together everywhere.",
        },
        {
          kind: "formula",
          latex: "Y = μ(X) + ε,   E[ε | X] = 0",
          caption: "The regression decomposition: a systematic part plus mean-zero noise.",
        },
        {
          kind: "prose",
          text:
            "The condition E[ε | X] = 0 is definitional rather than an assumption — whatever part " +
            "of Y is predictable from X has been swept into μ(X), so what is left has no remaining " +
            "predictable component. Modelling assumptions enter one step later, when we insist μ " +
            "belongs to a particular family (linear in β, say) and that ε has a particular variance " +
            "or distribution.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Response (Y)",
              description:
                "The outcome being explained or predicted. Also called the dependent variable, the target, or the endogenous variable depending on the field.",
            },
            {
              term: "Predictors (X)",
              description:
                "The inputs used to explain it. Also independent variables, features, covariates, regressors, or exogenous variables.",
            },
            {
              term: "Systematic part μ(X)",
              description: "What the predictors can account for — the signal.",
            },
            {
              term: "Error ε",
              description:
                "What they cannot — measurement noise plus every omitted cause. Not 'mistakes'.",
            },
          ],
        },
      ],
    },

    {
      heading: "The two choices every regression method makes",
      blocks: [
        {
          kind: "prose",
          text:
            "Nearly every named method in this domain is a specific answer to two questions. Read a " +
            "new method by asking which of the two it changed, and it stops being a separate thing " +
            "to memorise.",
        },
        {
          kind: "table",
          headers: ["Method", "Family for μ(x)", "Scoring rule"],
          rows: [
            ["Ordinary least squares", "Linear in β", "Sum of squared residuals"],
            ["Ridge / LASSO", "Linear in β", "Squared residuals + a penalty on β"],
            ["LOESS", "Locally linear, no global form", "Distance-weighted squared residuals"],
            ["Logistic regression", "sigmoid(xᵀβ)", "Bernoulli log-likelihood"],
            ["Cox proportional hazards", "h₀(t)·exp(xᵀβ)", "Partial likelihood"],
          ],
          caption:
            "Two columns, one row per method. The first column is 'what shapes are allowed', the second is 'what counts as a good fit'.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "'Linear' constrains β, not x",
          text:
            "A linear model is linear in its coefficients, not in its predictors. " +
            "Y = β₀ + β₁x + β₂x² + ε is a linear regression — fit it by including x² as a column " +
            "of the design matrix. Y = β₀·exp(β₁x) + ε is not, because β₁ appears inside a " +
            "nonlinear function. This distinction decides whether the closed-form normal equations " +
            "apply, so it is worth being precise about early.",
        },
      ],
    },

    {
      heading: "Prediction and explanation are different jobs",
      blocks: [
        {
          kind: "prose",
          text:
            "A regression can be fitted to answer 'what will Y be for a new unit with this x?' or " +
            "'how does Y move when x moves?'. These sound like the same question and are not, and " +
            "much confusion about regression comes from switching between them mid-argument.",
        },
        {
          kind: "table",
          headers: ["", "Prediction", "Explanation"],
          rows: [
            ["Question", "What is Ŷ for a new x?", "What is β₁, and is it real?"],
            ["Success metric", "Error on held-out data", "Unbiasedness, coverage of the interval for β₁"],
            ["Extra predictors", "Add them if they help the test error", "Adding the wrong one biases β₁"],
            ["Preferred model", "Whatever generalises — often opaque", "Simple enough to interpret"],
          ],
          caption: "The two goals pull in opposite directions often enough to be worth separating explicitly.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A coefficient is not a causal effect by default",
          text:
            "β₁ is the average difference in Y between units differing by one unit of X₁ and " +
            "matching on the other predictors in the model. It equals the causal effect only if " +
            "the model contains the right set of confounders. Nothing in the fitting procedure " +
            "checks this, and no amount of statistical significance supplies it — which is why " +
            "'controlling for' a variable is a claim about the world, not about the arithmetic.",
        },
      ],
    },

    {
      heading: "Where the name comes from",
      blocks: [
        {
          kind: "prose",
          text:
            "Francis Galton, studying the heights of parents and their adult children in the 1880s, " +
            "found that unusually tall parents had children who were tall but closer to average. He " +
            "called this 'regression towards mediocrity'. The line he drew through the scatter was " +
            "named after the phenomenon, and the name outlived the finding: today 'regression' means " +
            "any model of a continuous conditional mean, whether or not anything regresses anywhere. " +
            "The original phenomenon survives under its own heading, regression to the mean, and it " +
            "is still one of the most reliably misread patterns in applied statistics.",
        },
        {
          kind: "example",
          title: "Is this a regression problem?",
          problem:
            "Classify each: (a) predicting a house's sale price from square footage; (b) predicting " +
            "whether an email is spam; (c) finding groups of similar customers with no labelled outcome.",
          steps: [
            "(a) The outcome is continuous and observed for the training data — a regression problem.",
            "(b) The outcome is a labelled category, so this is supervised but classification. Logistic regression handles it by modelling P(Y = 1 | X), which is itself continuous.",
            "(c) There is no outcome variable at all, so nothing can be regressed on anything — this is unsupervised.",
          ],
          answer:
            "(a) regression; (b) classification, reachable by regression methods through a link function; (c) not a regression problem at all.",
        },
      ],
    },

    {
      heading: "What comes next in this domain",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Fix the family: linear in β. That gives simple and multiple linear regression.",
            "Fix the scoring rule: squared error. That gives ordinary least squares and, in matrix form, the normal equations.",
            "Ask what OLS is doing geometrically — projecting y onto the column space of X.",
            "Ask what it is doing probabilistically — maximum likelihood under normal errors, which is what makes confidence intervals and tests available.",
            "Ask when it goes wrong: the OLS assumptions, heteroskedasticity, collinearity.",
            "Change the scoring rule to include a penalty: ridge, LASSO, elastic net.",
            "Change the family and the likelihood: logistic, probit, GLMs, Cox.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning", locator: "Ch. 2–3, Statistical Learning and Linear Regression" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§2.4, Statistical Decision Theory" },
    { source: "Wasserman, All of Statistics", locator: "Ch. 13, Linear and Logistic Regression" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-01-foundations.md" },
  ],
};
