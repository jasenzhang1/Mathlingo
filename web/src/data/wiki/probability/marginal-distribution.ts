import type { WikiArticle } from "../types";

export const marginalDistribution: WikiArticle = {
  conceptId: "marginal-distribution",
  summary:
    "A marginal distribution is what remains after averaging a joint distribution over the variables you are not interested in. The operation is simple — sum or integrate them out — but it is irreversible, and the information it discards is exactly the information about how the variables relate.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "p_X(x) = \\sum_{y} p_{X,Y}(x, y), \\qquad f_X(x) = \\int_{-\\infty}^{\\infty} f_{X,Y}(x, y)\\,dy",
          caption: "Marginalising out $Y$",
        },
        {
          kind: "prose",
          text: "The name is literal. Writing a discrete joint distribution as a table and summing each row and column, the totals were traditionally written in the margins — and those totals are the marginal distributions.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Marginalising is averaging over uncertainty, not ignoring it",
          text: "Integrating $Y$ out does not assume $Y$ is absent or fixed; it accounts for every value $Y$ could take, weighted by how probable each is. That distinction matters: the marginal variance of $X$ includes variability inherited from $Y$'s randomness, which is exactly the between-group term of the law of total variance.",
        },
      ],
    },
    {
      heading: "What marginalising destroys",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "The marginals do not determine the joint",
          text: "Given only $f_X$ and $f_Y$, the joint cannot be recovered. Two variables can each be standard normal while being independent, perfectly correlated, or anything between — infinitely many joints share the same pair of margins. Everything about the relationship lives in the joint and is invisible in the margins, which is why you cannot compute a correlation from separately reported summary statistics.",
        },
        {
          kind: "prose",
          text: "The formal statement of what is missing is the *copula*: any joint distribution factors into its marginals plus a copula capturing the dependence structure, and the two parts vary independently. This is Sklar's theorem, and it is the basis of dependence modelling in risk management — where assuming a convenient copula while matching the observed marginals was a well-documented contributor to the 2008 mispricing of correlated defaults.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Marginals from a joint",
          problem:
            "$f_{X,Y}(x,y) = x + y$ on the unit square $[0,1]^{2}$. Find both marginals and check independence.",
          steps: [
            "Verify it is a density: $\\int_0^1\\!\\!\\int_0^1 (x+y)\\,dx\\,dy = \\tfrac{1}{2} + \\tfrac{1}{2} = 1$. ✓",
            "$f_X(x) = \\int_0^1 (x + y)\\,dy = x + \\tfrac{1}{2}$ for $0 \\le x \\le 1$.",
            "By symmetry, $f_Y(y) = y + \\tfrac{1}{2}$.",
            "Product: $(x + \\tfrac{1}{2})(y + \\tfrac{1}{2}) = xy + \\tfrac{x}{2} + \\tfrac{y}{2} + \\tfrac{1}{4}$.",
            "That is not $x + y$, so the joint does not factorise.",
          ],
          answer:
            "$f_X(x) = x + 1/2$, $f_Y(y) = y + 1/2$; the variables are dependent, even though the support is a rectangle.",
        },
        {
          kind: "prose",
          text: "The last point is worth noting alongside the support test from the joint-distribution article: a non-rectangular support proves dependence, but a rectangular one proves nothing. Here the support is a perfectly good square and the variables are still dependent — the factorisation has to be checked.",
        },
      ],
    },
    {
      heading: "Where marginalising appears",
      blocks: [
        {
          kind: "table",
          headers: ["Setting", "What is integrated out", "Result"],
          rows: [
            [
              "Law of total probability",
              "the conditioning variable",
              "$P(A) = \\sum_i P(A \\mid B_i)P(B_i)$",
            ],
            [
              "Bayesian inference",
              "nuisance parameters",
              "the marginal posterior for the parameter of interest",
            ],
            [
              "Model evidence",
              "all parameters",
              "$p(x) = \\int p(x \\mid \\theta)p(\\theta)\\,d\\theta$",
            ],
            [
              "Mixture models",
              "the latent component label",
              "the observed marginal density",
            ],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Marginal and conditional answer different questions",
          text: "The marginal distribution of income is not the distribution of income given a profession. Conditioning restricts to a slice; marginalising averages across all of them. Reporting a marginal when the audience wants a conditional — or the reverse — is the mechanism behind Simpson's paradox and the ecological fallacy, and both are failures of this distinction rather than of the arithmetic.",
        },
      ],
    },
  ],
  references: [
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 7.1" },
    { source: "Casella & Berger, Statistical Inference", locator: "§4.1" },
    { source: "Wasserman, All of Statistics", locator: "§2.7" },
    { source: "Mathlingo assessment bank", locator: "assessments/joint-and-conditional-structure.md" },
  ],
};
