import type { WikiArticle } from "./types";

export const randomVectorsWiki: WikiArticle = {
  conceptId: "random-vectors",
  summary:
    "A random vector stacks $k$ random variables defined on the same experiment into a single object $\\mathbf{X} = [X_1, \\ldots, X_k]^\\top$. Nothing new is being modelled — a random vector is exactly a joint distribution — but writing it as one vector lets expectation, linearity and later the normal distribution be stated in matrix form. The first thing the vector view exposes is a gap: the mean generalises to a vector with no fuss, but the spread of $\\mathbf{X}$ cannot be captured by $k$ variances. It needs every pairwise covariance, and that is what motivates the covariance matrix.",

  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{X} = \\begin{bmatrix} X_1 \\\\ X_2 \\\\ \\vdots \\\\ X_k \\end{bmatrix}, \\qquad X_1, \\ldots, X_k \\text{ defined on the same sample space}",
          caption: "A random vector is a column of random variables on one experiment",
        },
        {
          kind: "prose",
          text: "Each outcome $\\omega$ of the experiment produces a whole vector of numbers $\\mathbf{x} = \\mathbf{X}(\\omega) \\in \\mathbb{R}^k$, so a random vector is a random point in $\\mathbb{R}^k$. Following the usual convention, $\\mathbf{X}$ (capital) is the random vector and $\\mathbf{x}$ (lowercase) is a realisation of it.",
        },
        {
          kind: "prose",
          text: "The phrase “on the same sample space” matters. Two variables measured on unrelated experiments cannot be stacked, because there is no joint distribution linking them. Stacking only makes sense when one random outcome determines all $k$ components at once — the height and weight of the same person, the returns of several stocks on the same day.",
        },
        {
          kind: "definitions",
          items: [
            { term: "Joint CDF", description: "$F_{\\mathbf{X}}(\\mathbf{x}) = P(X_1 \\le x_1, \\ldots, X_k \\le x_k)$ — one function of a vector argument." },
            { term: "Joint PMF / PDF", description: "$p_{\\mathbf{X}}(\\mathbf{x})$ or $f_{\\mathbf{X}}(\\mathbf{x})$, with $P(\\mathbf{X} \\in B) = \\int_B f_{\\mathbf{X}}(\\mathbf{x})\\, d\\mathbf{x}$ for a region $B \\subseteq \\mathbb{R}^k$." },
            { term: "Marginal of $X_i$", description: "Sum or integrate the joint distribution over every other component." },
            { term: "Independent components", description: "The joint density factors: $f_{\\mathbf{X}}(\\mathbf{x}) = \\prod_i f_{X_i}(x_i)$." },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The marginals do not determine the vector",
          text: "Knowing the distribution of every $X_i$ separately is $\textbf{NOT}$ the same as knowing the distribution of $\\mathbf{X}$. If $X_1 \\sim \\mathcal{N}(0, 1)$, both $[X_1, X_1]^\\top$ and $[X_1, -X_1]^\\top$ have two standard normal marginals, yet one lives on the line $x_2 = x_1$ and the other on $x_2 = -x_1$. The joint law carries the dependence; the marginals throw it away.",
        },
      ],
    },

    {
      heading: "The mean vector",
      blocks: [
        {
          kind: "formula",
          latex: "\\boldsymbol{\\mu} = \\mathbb{E}[\\mathbf{X}] = \\begin{bmatrix} \\mathbb{E}[X_1] \\\\ \\vdots \\\\ \\mathbb{E}[X_k] \\end{bmatrix}",
          caption: "Expectation of a random vector is taken componentwise",
        },
        {
          kind: "prose",
          text: "The same componentwise rule defines the expectation of a random matrix. Combined with linearity of scalar expectation, it gives the identity that the rest of the chapter runs on: for a fixed $m \\times k$ matrix $\\mathbf{A}$ and fixed vector $\\mathbf{b} \\in \\mathbb{R}^m$,",
        },
        {
          kind: "formula",
          latex: "\\mathbb{E}[\\mathbf{A}\\mathbf{X} + \\mathbf{b}] = \\mathbf{A}\\,\\mathbb{E}[\\mathbf{X}] + \\mathbf{b}",
          caption: "Linearity of expectation, in matrix form",
        },
        {
          kind: "prose",
          text: "The proof is one line: the $i$-th entry of $\\mathbf{A}\\mathbf{X} + \\mathbf{b}$ is $\\sum_j a_{ij} X_j + b_i$, and scalar linearity gives $\\sum_j a_{ij}\\mathbb{E}[X_j] + b_i$, which is the $i$-th entry of $\\mathbf{A}\\boldsymbol{\\mu} + \\mathbf{b}$. No independence is needed — exactly as in the scalar case.",
        },
        {
          kind: "example",
          title: "Mean of a portfolio",
          problem:
            "$\\mathbf{X} = [X_1, X_2, X_3]^\\top$ are three daily returns with $\\boldsymbol{\\mu} = [0.01, 0.02, -0.01]$. A portfolio holds weights $\\mathbf{w} = [0.5, 0.3, 0.2]$. Find the expected portfolio return $\\mathbb{E}[\\mathbf{w}^\\top\\mathbf{X}]$.",
          steps: [
            "Here $\\mathbf{A} = \\mathbf{w}^\\top$ is a $1 \\times 3$ matrix, so $\\mathbb{E}[\\mathbf{w}^\\top\\mathbf{X}] = \\mathbf{w}^\\top\\boldsymbol{\\mu}$.",
            "$\\mathbf{w}^\\top\\boldsymbol{\\mu} = 0.5(0.01) + 0.3(0.02) + 0.2(-0.01) = 0.005 + 0.006 - 0.002$.",
          ],
          answer: "$\\mathbb{E}[\\mathbf{w}^\\top\\mathbf{X}] = 0.009$. The correlations between the stocks are irrelevant to the mean — they will matter for the variance.",
        },
      ],
    },

    {
      heading: "Why one variance is not enough",
      blocks: [
        {
          kind: "prose",
          text: "For a scalar, $\\text{Var}(X) = \\mathbb{E}[(X - \\mu)^2]$ measures spread with a single number. The tempting generalisation is to list the $k$ variances $\\text{Var}(X_1), \\ldots, \\text{Var}(X_k)$. That list is not enough, and the portfolio shows why. Its variance is",
        },
        {
          kind: "formula",
          latex: "\\text{Var}\\!\\left(\\sum_{i} w_i X_i\\right) = \\sum_{i} w_i^2\\, \\text{Var}(X_i) + \\sum_{i \\ne j} w_i w_j\\, \\text{Cov}(X_i, X_j)",
          caption: "The variance of a linear combination needs every covariance",
        },
        {
          kind: "prose",
          text: "The cross terms involve every pair $(i, j)$. Two random vectors can share all $k$ means and all $k$ variances and still give a linear combination wildly different spreads, because their covariances differ. The spread of a random vector is therefore described by $k$ variances and $\\binom{k}{2}$ covariances — $k^2$ numbers once both orderings $(i, j)$ and $(j, i)$ are counted.",
        },
        {
          kind: "example",
          title: "Same marginals, different spread",
          problem:
            "$X_1$ and $X_2$ each have variance $1$. Compute $\\text{Var}(X_1 + X_2)$ when (a) $\\text{Cov}(X_1, X_2) = 0$, (b) $X_2 = X_1$, (c) $X_2 = -X_1$.",
          steps: [
            "$\\text{Var}(X_1 + X_2) = 1 + 1 + 2\\,\\text{Cov}(X_1, X_2)$.",
            "(a) $2 + 0 = 2$; (b) $\\text{Cov} = 1$, so $4$; (c) $\\text{Cov} = -1$, so $0$.",
          ],
          answer: "$2$, $4$ and $0$. The individual variances are identical in all three cases; the covariance alone decides whether the sum is noisy, very noisy, or constant.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The natural home for $k^2$ numbers is a matrix",
          text: "The covariances are indexed by a pair $(i, j)$, which is exactly what a $k \\times k$ array is for. Put $\\text{Cov}(X_i, X_j)$ in entry $(i, j)$ and the variances land on the diagonal, since $\\text{Cov}(X_i, X_i) = \\text{Var}(X_i)$. The resulting matrix $\\boldsymbol{\\Sigma}$ is the vector analogue of $\\sigma^2$, and the messy double sum above collapses to $\\text{Var}(\\mathbf{w}^\\top\\mathbf{X}) = \\mathbf{w}^\\top\\boldsymbol{\\Sigma}\\mathbf{w}$. That matrix is the subject of the next lesson.",
        },
      ],
    },

    {
      heading: "Independence and uncorrelatedness for vectors",
      blocks: [
        {
          kind: "table",
          headers: ["Property", "What it means for the vector"],
          rows: [
            ["Mutually independent components", "$f_{\\mathbf{X}}(\\mathbf{x}) = \\prod_i f_{X_i}(x_i)$ for all $\\mathbf{x}$"],
            ["Pairwise uncorrelated components", "$\\text{Cov}(X_i, X_j) = 0$ for every $i \\ne j$"],
            ["i.i.d. sample", "Independent components that also share one distribution"],
            ["Independent vectors $\\mathbf{X}, \\mathbf{Y}$", "$f_{\\mathbf{X}, \\mathbf{Y}}(\\mathbf{x}, \\mathbf{y}) = f_{\\mathbf{X}}(\\mathbf{x})\\, f_{\\mathbf{Y}}(\\mathbf{y})$ — the components within each vector may still be dependent"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Uncorrelated is weaker than independent",
          text: "Independence implies every covariance is $0$, but not conversely. With $X_1 \\sim \\mathcal{N}(0, 1)$ and $X_2 = X_1^2$, $\\text{Cov}(X_1, X_2) = \\mathbb{E}[X_1^3] = 0$, yet $X_2$ is a function of $X_1$. Covariances only see linear dependence, which is why describing a random vector by its mean and covariances alone is a summary, not the full distribution.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "An i.i.d. sample is a random vector",
          text: "A sample $X_1, \\ldots, X_n$ is a random vector in $\\mathbb{R}^n$ with independent, identically distributed components. Its sample mean is $\\bar{X} = \\tfrac{1}{n}\\mathbf{1}^\\top\\mathbf{X}$ — a linear function of the vector. Statistics is full of such linear functions, and the vector view is what lets their means and variances be computed in one stroke.",
        },
      ],
    },
  ],

  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§4.6, Multivariate Distributions" },
    { source: "Blitzstein & Hwang, Introduction to Probability (2nd ed.)", locator: "Ch. 7, Joint Distributions" },
    { source: "Deisenroth, Faisal & Ong, Mathematics for Machine Learning", locator: "§6.4, Summary Statistics and Independence" },
  ],
};
