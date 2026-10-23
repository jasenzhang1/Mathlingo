import type { WikiArticle } from "../types";

export const missingDataMechanismsWiki: WikiArticle = {
  conceptId: "missing-data-mechanisms",

  summary:
    "Almost every real dataset has holes — electronic health records most of all, where an outcome is recorded only if the patient " +
    "comes back. Rubin's taxonomy classifies the holes by what the probability of being missing depends on. Missing completely at " +
    "random (MCAR): nothing. Missing at random (MAR): only observed variables. Missing not at random (MNAR): the missing value itself. " +
    "The class decides which analyses are valid, and the uncomfortable fact is that the observed data alone can never distinguish MAR " +
    "from MNAR.",

  sections: [
    {
      heading: "The three mechanisms",
      blocks: [
        {
          kind: "prose",
          text:
            "Let $R = 1$ when the outcome $Y$ is observed and $R = 0$ when it is missing, with covariates $X$ always observed.",
        },
        {
          kind: "table",
          headers: ["Mechanism", "Condition", "Example"],
          rows: [
            ["MCAR", "$R \\perp (X, Y)$", "A lab sample is dropped on the floor"],
            ["MAR", "$R \\perp Y \\mid X$", "Older patients miss follow-up more often, but within an age group missingness is unrelated to the outcome"],
            ["MNAR", "$R$ depends on $Y$ even given $X$", "Patients who regained weight after surgery are less likely to return for a weigh-in"],
          ],
        },
        {
          kind: "definitions",
          items: [
            { term: "Complete-case analysis", description: "Drop every unit with a missing value. Valid for $\\mathbb{E}[Y]$ under MCAR only." },
            { term: "Ignorable missingness", description: "MAR plus distinct parameters for the data and the missingness: likelihood inference can then ignore the missingness model." },
            { term: "Response propensity", description: "$\\pi(X) = \\mathbb{P}(R = 1 \\mid X)$, estimable from the data because $R$ and $X$ are always observed." },
          ],
        },
      ],
    },

    {
      heading: "What MAR buys you",
      blocks: [
        {
          kind: "prose",
          text:
            "Under MAR the respondents with covariate value $x$ are a random sample of everyone with value $x$, so $\\mathbb{E}[Y \\mid X, R = 1] = \\mathbb{E}[Y \\mid X]$. " +
            "Two identification formulas follow, and they are the two estimators used throughout missing-data and causal analysis:",
        },
        {
          kind: "formula",
          latex: "\\mathbb{E}[Y] = \\mathbb{E}\\left[ \\mathbb{E}[Y \\mid X, R = 1] \\right] = \\mathbb{E}\\left[ \\frac{R\\,Y}{\\pi(X)} \\right]",
          caption: "Regression (imputation) and inverse probability weighting — equal under MAR",
        },
        {
          kind: "example",
          title: "Complete cases versus MAR",
          problem:
            "Half the patients have $X = 1$. Response rates are $0.8$ when $X = 0$ and $0.4$ when $X = 1$. Respondent means are $10$ ($X = 0$) and $20$ ($X = 1$). " +
            "Estimate $\\mathbb{E}[Y]$ by complete cases and under MAR.",
          steps: [
            "Respondents: $0.5 \\times 0.8 = 0.4$ of the population with $X = 0$ and $0.5 \\times 0.4 = 0.2$ with $X = 1$.",
            "Complete-case mean: $\\frac{0.4 \\times 10 + 0.2 \\times 20}{0.6} = \\frac{8}{0.6} \\approx 13.33$.",
            "MAR: impute each stratum by its respondent mean: $0.5 \\times 10 + 0.5 \\times 20 = 15$.",
          ],
          answer: "Complete cases under-weight the $X = 1$ group and give $13.33$; the MAR estimate is $15$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Regression of $Y$ on $X$ is safer than the mean",
          text:
            "If missingness depends only on $X$, the complete-case regression of $Y$ on $X$ is still unbiased for $\\mathbb{E}[Y \\mid X]$ — selecting on a " +
            "predictor does not bias a correctly specified regression. It is the marginal mean that needs reweighting.",
        },
      ],
    },

    {
      heading: "MNAR and sensitivity analysis",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "MAR cannot be tested from the observed data",
          text:
            "The observed data tell you $\\mathbb{P}(R \\mid X)$ and the distribution of $Y$ among respondents. They say nothing about $Y$ among " +
            "non-respondents, so for every MNAR model there is a MAR model that fits the observed data equally well. Testing MAR requires data on " +
            "some non-respondents — the motivation for double sampling.",
        },
        {
          kind: "prose",
          text:
            "Without extra data, the standard response is a sensitivity analysis. The pattern-mixture (delta) version shifts the non-respondents' mean by an " +
            "unidentified amount $\\delta$ and reports how conclusions move:",
        },
        {
          kind: "formula",
          latex: "\\mathbb{E}[Y \\mid X, R = 0] = \\mathbb{E}[Y \\mid X, R = 1] + \\delta",
          caption: "$\\delta = 0$ is MAR; the tipping point is the $\\delta$ at which the conclusion flips",
        },
        {
          kind: "prose",
          text:
            "In the example above, $\\delta = -2$ gives $0.5(0.8 \\times 10 + 0.2 \\times 8) + 0.5(0.4 \\times 20 + 0.6 \\times 18) = 0.5 \\times 9.6 + 0.5 \\times 18.8 = 14.2$. " +
            "Sensitivity analyses are honest but often unsatisfying: if the tipping point is a plausible $\\delta$, the study cannot reach an actionable conclusion.",
        },
        {
          kind: "formula",
          latex: "T = \\bar{W} + \\left(1 + \\frac{1}{m}\\right) B",
          caption: "Rubin's rules for $m$ multiple imputations: total variance is the average within-imputation variance $\\bar{W}$ plus inflated between-imputation variance $B$",
        },
      ],
    },
  ],

  references: [
    { source: "Little, Rubin, Statistical Analysis with Missing Data", locator: "Ch. 1, Introduction (missingness mechanisms)" },
    { source: "Rubin, Inference and Missing Data (Biometrika 1976)", locator: "MAR and ignorability" },
    { source: "Gelman et al., Bayesian Data Analysis (BDA3)", locator: "Ch. 18, Models for Missing Data" },
  ],
};
