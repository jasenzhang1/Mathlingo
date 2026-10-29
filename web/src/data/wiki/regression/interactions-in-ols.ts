import type { WikiArticle } from "../types";

export const interactionsInOlsWiki: WikiArticle = {
  conceptId: "interactions-in-ols",

  summary:
    "An interaction lets the effect of one covariate depend on the level of another. In OLS it is a product term, $x_1x_2$, " +
    "and with two binary covariates its coefficient is exactly a difference in differences of four cell means. With a binary " +
    "treatment and general covariates, interactions describe how the treatment effect varies, which leads to the Johnson–Neyman " +
    "technique, the Blinder–Oaxaca decomposition and the Chow test. Interactions are also slippery: whether one exists can " +
    "depend on the scale of the outcome, main effects change meaning once a product term is present, and tests for interaction " +
    "have little power.",

  sections: [
    {
      heading: "Two binary covariates: a difference in differences",
      blocks: [
        {
          kind: "formula",
          latex: "y_i = \\hat{\\beta}_0 + \\hat{\\beta}_1 x_{i1} + \\hat{\\beta}_2 x_{i2} + \\hat{\\beta}_{12}x_{i1}x_{i2} + \\hat{\\varepsilon}_i",
          caption: "The saturated model for two binary covariates: four coefficients for four cells.",
        },
        {
          kind: "definitions",
          items: [
            { term: "$\\hat{\\beta}_0 = \\bar{y}_{00}$", description: "The mean of the reference cell, $x_1 = x_2 = 0$." },
            { term: "$\\hat{\\beta}_1 = \\bar{y}_{10} - \\bar{y}_{00}$", description: "The effect of $x_1$ when $x_2 = 0$, not an average effect of $x_1$." },
            { term: "$\\hat{\\beta}_{12} = (\\bar{y}_{11} - \\bar{y}_{10}) - (\\bar{y}_{01} - \\bar{y}_{00})$", description: "How much the effect of $x_2$ changes when $x_1$ switches on. The formula is symmetric: it is also the change in the effect of $x_1$ when $x_2$ switches on." },
          ],
        },
        {
          kind: "example",
          title: "Reading coefficients off a $2 \\times 2$ table",
          problem: "Cell means are $\\bar{y}_{00} = 10$, $\\bar{y}_{10} = 14$, $\\bar{y}_{01} = 12$ and $\\bar{y}_{11} = 20$. Find all four coefficients.",
          steps: [
            "$\\hat{\\beta}_0 = \\bar{y}_{00} = 10$.",
            "$\\hat{\\beta}_1 = 14 - 10 = 4$ and $\\hat{\\beta}_2 = 12 - 10 = 2$.",
            "$\\hat{\\beta}_{12} = (20 - 12) - (14 - 10) = 8 - 4 = 4$.",
            "Check: $\\hat{\\beta}_0 + \\hat{\\beta}_1 + \\hat{\\beta}_2 + \\hat{\\beta}_{12} = 20 = \\bar{y}_{11}$.",
          ],
          answer: "$(10, 4, 2, 4)$. The effect of $x_1$ is $4$ when $x_2 = 0$ and $8$ when $x_2 = 1$; the interaction is the gap between them.",
        },
        {
          kind: "prose",
          text:
            "The cell form also explains why interactions are hard to detect. $\\text{Var}(\\hat{\\beta}_{12}) = \\sum_{\\text{cells}} \\sigma^2_{f_1f_2}/n_{f_1f_2}$, " +
            "so the smallest cell dominates. Even in a balanced design the interaction contrast has four times the variance of a main-effect contrast, " +
            "and detecting an interaction half the size of a main effect needs about sixteen times the sample.",
        },
      ],
    },
    {
      heading: "Treatment-effect heterogeneity",
      blocks: [
        {
          kind: "formula",
          latex: "y_i = \\beta_0 + \\beta_1 z_i + \\boldsymbol{\\beta}_2^{\\top}\\mathbf{x}_i + \\boldsymbol{\\beta}_3^{\\top}\\mathbf{x}_i z_i + \\varepsilon_i \\quad\\Longrightarrow\\quad \\mathbb{E}(y \\mid z = 1, \\mathbf{x}) - \\mathbb{E}(y \\mid z = 0, \\mathbf{x}) = \\beta_1 + \\boldsymbol{\\beta}_3^{\\top}\\mathbf{x}",
          caption: "The conditional average treatment effect (CATE) is linear in the covariates; $\\boldsymbol{\\beta}_3 \\ne \\mathbf{0}$ is effect modification.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Johnson–Neyman technique",
              description: "Test $\\beta_1 + \\boldsymbol{\\beta}_3^{\\top}\\mathbf{x} = 0$ at each $\\mathbf{x}$, a linear combination of coefficients with variance $\\mathbf{c}^{\\top}\\hat{V}\\mathbf{c}$. The values of $\\mathbf{x}$ where the test does not reject form the region of no detectable effect.",
            },
            {
              term: "Blinder–Oaxaca decomposition",
              description: "With $z$ a group indicator, the gap in mean outcomes splits into endowments $E = \\boldsymbol{\\beta}_2^{\\top}(\\bar{\\mathbf{x}}_1 - \\bar{\\mathbf{x}}_0)$, coefficients $C = \\beta_1 + \\boldsymbol{\\beta}_3^{\\top}\\bar{\\mathbf{x}}_0$, and their interaction $I = \\boldsymbol{\\beta}_3^{\\top}(\\bar{\\mathbf{x}}_1 - \\bar{\\mathbf{x}}_0)$. Each part is linear in the OLS coefficients.",
            },
            {
              term: "Chow test",
              description: "The $F$-test of $\\beta_1 = 0$ and $\\boldsymbol{\\beta}_3 = \\mathbf{0}$: one regression line for both groups. Under the null the whole mean gap is endowment.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Separate fits and the pooled interacted fit are the same model",
          text:
            "Fitting OLS separately in each group gives the same fitted values and leverages as the pooled regression of $y$ on $(1, z, \\mathbf{x}, z\\mathbf{x})$; the pooled coefficients are the group-0 line plus the differences. With covariates centred at their means, the coefficient of $z$ is the average treatment effect.",
        },
      ],
    },
    {
      heading: "Why interactions are slippery",
      blocks: [
        {
          kind: "list",
          items: [
            "**Removable interaction.** If $\\mathbb{E}(\\log y)$ is additive in $x_1$ and $x_2$, then $y$ is roughly multiplicative, and a product term looks significant on the raw scale. Only a qualitative (crossover) interaction, where an effect changes sign, survives every monotone transformation.",
            "**Main effects in the presence of interaction.** With uncentred covariates, $\\beta_1$ is the slope in $x_1$ at $x_2 = 0$, which may lie far outside the data. The average partial effect is $\\beta_1 + \\beta_{12}\\bar{x}_2$; centring makes the main-effect coefficients equal to it, while $\\hat{\\beta}_{12}$ and its standard error do not change at all.",
            "**Power.** The variance formula above means interactions are usually under-powered, so a non-significant interaction is weak evidence of none.",
            "**Spurious interaction.** Omitted curvature, such as an $x_1^2$ term, is correlated with $x_1x_2$ when the covariates are correlated, and the product term can absorb it.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Effect modification is not causal interaction",
          text:
            "In a trial that randomises only $z$, a $z \\times w$ interaction describes how the effect differs across levels of $w$; it does not show that changing $w$ would change the effect, because $w$ was not randomised.",
        },
      ],
    },
  ],

  references: [
    { source: "Peng Ding, Linear Model and Extensions", locator: "Ch. 17, Interactions in OLS (§17.1–17.3)" },
  ],
};
