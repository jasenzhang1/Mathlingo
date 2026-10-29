import type { WikiArticle } from "../types";

export const multinomialAndOrdinalLogisticWiki: WikiArticle = {
  conceptId: "multinomial-and-ordinal-logistic",

  summary:
    "When the outcome is one of $K$ categories, binary logistic regression generalises in two directions. For nominal " +
    "categories (apple, orange, pear) the multinomial logit models each category’s log odds against a reference; it is also " +
    "what you get when people choose the option with the highest utility and the utility errors are Gumbel, which is " +
    "McFadden’s discrete choice model. For ordered categories (one to five stars) the proportional odds model treats the " +
    "outcome as a cut-up latent variable and uses one slope for every threshold.",

  sections: [
    {
      heading: "The multinomial logit",
      blocks: [
        {
          kind: "formula",
          latex: "\\pi_k(\\mathbf{x}) = \\Pr(y = k \\mid \\mathbf{x}) = \\frac{e^{\\mathbf{x}^{\\top}\\boldsymbol{\\beta}_k}}{\\sum_{l = 1}^{K} e^{\\mathbf{x}^{\\top}\\boldsymbol{\\beta}_l}}, \\qquad \\boldsymbol{\\beta}_K = \\mathbf{0}",
          caption: "Equivalently $\\log\\{\\pi_k(\\mathbf{x})/\\pi_K(\\mathbf{x})\\} = \\mathbf{x}^{\\top}\\boldsymbol{\\beta}_k$.",
        },
        {
          kind: "definitions",
          items: [
            { term: "Identification", description: "Adding the same vector to every $\\boldsymbol{\\beta}_k$ leaves the probabilities unchanged, so only differences from the reference are identified; hence $\\boldsymbol{\\beta}_K = \\mathbf{0}$. There are $(K - 1)p$ free coefficients." },
            { term: "Interpretation", description: "$\\beta_{kj}$ is the change in $\\log(\\pi_k/\\pi_K)$ per unit of $x_j$: a log relative-odds ratio against the reference category." },
            { term: "Fitting", description: "The score for $\\boldsymbol{\\beta}_k$ is $\\sum_i \\mathbf{x}_i\\{\\mathbb{1}(y_i = k) - \\pi_k(\\mathbf{x}_i)\\}$. The Hessian’s blocks are minus the multinomial covariance $\\text{diag}(\\boldsymbol{\\pi}) - \\boldsymbol{\\pi}\\boldsymbol{\\pi}^{\\top}$ tensored with $\\mathbf{x}_i\\mathbf{x}_i^{\\top}$, so the log-likelihood is concave and Newton’s method (IRLS) works." },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Two derivations of the same model",
          text:
            "If $\\mathbf{x} \\mid y = k \\sim \\mathcal{N}(\\boldsymbol{\\mu}_k, \\Sigma)$ with a shared $\\Sigma$, Bayes’ rule gives a multinomial logit with slopes $\\Sigma^{-1}\\boldsymbol{\\mu}_k$ (discriminant analysis). And under outcome-dependent sampling with rates $p_k$, the slopes are unchanged and each intercept shifts by $\\log p_k$, the multinomial version of the case-control result.",
        },
      ],
    },
    {
      heading: "Latent utilities and discrete choice",
      blocks: [
        {
          kind: "formula",
          latex: "U_{ik} = V_{ik} + \\varepsilon_{ik},\\ \\ \\varepsilon_{ik} \\overset{\\text{iid}}{\\sim} \\text{Gumbel} \\quad\\Longrightarrow\\quad \\Pr\\Bigl(y_i = k\\Bigr) = \\Pr\\Bigl(U_{ik} = \\max_l U_{il}\\Bigr) = \\frac{e^{V_{ik}}}{\\sum_l e^{V_{il}}}",
          caption: "McFadden’s lemma: the maximum of Gumbel utilities gives the softmax.",
        },
        {
          kind: "prose",
          text:
            "McFadden’s conditional logit lets the utilities depend on attributes of the choices, $V_{ik} = \\mathbf{z}_{ik}^{\\top}\\boldsymbol{\\beta}$ (price, catch rate). " +
            "Anything that is the same across a person’s alternatives, such as an intercept or income with a common coefficient, cancels from the ratio, " +
            "so individual-level covariates must enter with alternative-specific coefficients, and baseline appeal enters through alternative-specific constants.",
        },
        {
          kind: "example",
          title: "A price rise in a conditional logit",
          problem:
            "Three fishing modes have utility $V_k = -0.025\\,\\text{price}_k + 0.8\\,\\text{catch}_k$, with prices $[20, 30, 50]$ and catch rates $[0.2, 0.5, 1.0]$. Mode 3’s price rises by $\\$10$. How does the probability of mode 1 change?",
          steps: [
            "Before: $\\mathbf{V} = [-0.34, -0.35, -0.45]$, so $e^{\\mathbf{V}} \\approx [0.712, 0.705, 0.638]$ and $\\pi_1 \\approx 0.712/2.054 = 0.3465$.",
            "After: $V_3 = -1.5 + 0.8 = -0.70$ and $e^{V_3} \\approx 0.497$, so $\\pi_1 \\approx 0.712/1.913 = 0.3721$.",
            "The ratio $\\pi_1/\\pi_2$ is unchanged ($e^{0.01}$ both times).",
          ],
          answer: "$\\pi_1$ rises by about $0.0255$. Modes 1 and 2 gain in proportion to their shares, which is IIA at work.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Independence of irrelevant alternatives",
          text:
            "Because $\\pi_k/\\pi_l = \\exp\\{(\\mathbf{z}_k - \\mathbf{z}_l)^{\\top}\\boldsymbol{\\beta}\\}$, adding a close substitute (a blue bus next to a red bus) draws share from every option proportionally, rather than mostly from its twin. Nested logit and multinomial probit relax this.",
        },
      ],
    },
    {
      heading: "The proportional odds model for ordinal outcomes",
      blocks: [
        {
          kind: "formula",
          latex: "y_i^{*} = \\mathbf{x}_i^{\\top}\\boldsymbol{\\beta} + \\varepsilon_i,\\quad y_i = k \\iff \\alpha_{k-1} < y_i^{*} \\le \\alpha_k \\quad\\Longrightarrow\\quad \\text{logit}\\,\\Pr(y_i \\le k \\mid \\mathbf{x}_i) = \\alpha_k - \\mathbf{x}_i^{\\top}\\boldsymbol{\\beta}",
          caption: "Logistic latent errors and ordered cut-points $\\alpha_1 < \\dots < \\alpha_{K-1}$ (the sign convention of R’s `polr`).",
        },
        {
          kind: "prose",
          text:
            "A one-unit increase in $x_j$ multiplies every cumulative odds $\\Pr(y \\le k)/\\Pr(y > k)$ by the same factor $e^{-\\beta_j}$, which is the “proportional odds” property. " +
            "A positive $\\beta_j$ shifts mass toward higher categories. The model has $K - 1 + p$ parameters, against $(K - 1)p$ for the multinomial logit, " +
            "and its cumulative curves can never cross. The ordered probit swaps the logistic error for a Normal one.",
        },
        {
          kind: "example",
          title: "Category probabilities from cut-points",
          problem: "With $K = 3$, $\\alpha_1 = -1$, $\\alpha_2 = 1$ and $\\mathbf{x}^{\\top}\\boldsymbol{\\beta} = 0.5$, find the three category probabilities.",
          steps: [
            "$\\Pr(y \\le 1) = \\text{expit}(-1.5) \\approx 0.1824$.",
            "$\\Pr(y \\le 2) = \\text{expit}(0.5) \\approx 0.6225$.",
            "$\\Pr(y = 2) = 0.6225 - 0.1824 = 0.4400$ and $\\Pr(y = 3) = 1 - 0.6225 = 0.3775$.",
          ],
          answer: "$(0.1824, 0.4400, 0.3775)$, which sums to $1$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Check the shared slope",
          text:
            "If a covariate moves people out of the bottom category but barely affects the top, a single $\\boldsymbol{\\beta}$ averages the two. Compare the slopes of separate cumulative logits, or a multinomial fit, before relying on proportional odds.",
        },
      ],
    },
  ],

  references: [
    { source: "Peng Ding, Linear Model and Extensions", locator: "Ch. 21, Logistic Regressions for Categorical Outcomes (§21.1–21.6)" },
    { source: "Peng Ding, Linear Model and Extensions", locator: "Ch. 20, §20.6.2 Case-control study and §20.7 Other model formulations" },
  ],
};
