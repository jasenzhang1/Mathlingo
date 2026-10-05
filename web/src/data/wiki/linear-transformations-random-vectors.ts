import type { WikiArticle } from "./types";

export const linearTransformationsRandomVectorsWiki: WikiArticle = {
  conceptId: "linear-transformations-random-vectors",
  summary:
    "Portfolios, sample means, regression fits, principal components and differences of measurements are all of one form: a fixed matrix $\\mathbf{A}$ applied to a random vector $\\mathbf{X}$, perhaps plus a fixed shift $\\mathbf{b}$. This lesson answers what is known about $\\mathbf{Y} = \\mathbf{A}\\mathbf{X} + \\mathbf{b}$. Its mean and covariance are always determined by those of $\\mathbf{X}$, through $\\mathbf{A}\\boldsymbol{\\mu} + \\mathbf{b}$ and $\\mathbf{A}\\boldsymbol{\\Sigma}\\mathbf{A}^\\top$. Its full distribution is a harder question: it follows from a Jacobian when $\\mathbf{A}$ is square and invertible, and it is simply normal again when $\\mathbf{X}$ is normal — the fact that makes the multivariate normal possible.",

  sections: [
    {
      heading: "Mean and covariance: always available",
      blocks: [
        {
          kind: "prose",
          text: "Let $\\mathbf{X} \\in \\mathbb{R}^k$ have mean $\\boldsymbol{\\mu}$ and covariance matrix $\\boldsymbol{\\Sigma}$, and let $\\mathbf{A}$ be a fixed $m \\times k$ matrix and $\\mathbf{b} \\in \\mathbb{R}^m$ a fixed vector. Then $\\mathbf{Y} = \\mathbf{A}\\mathbf{X} + \\mathbf{b}$ is a random vector in $\\mathbb{R}^m$, and whatever the distribution of $\\mathbf{X}$,",
        },
        {
          kind: "formula",
          latex: "\\mathbb{E}[\\mathbf{A}\\mathbf{X} + \\mathbf{b}] = \\mathbf{A}\\boldsymbol{\\mu} + \\mathbf{b}, \\qquad \\text{Cov}(\\mathbf{A}\\mathbf{X} + \\mathbf{b}) = \\mathbf{A}\\boldsymbol{\\Sigma}\\mathbf{A}^\\top",
          caption: "The affine transformation rule: no assumption on the distribution of X",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "The mean is linearity of expectation, applied componentwise.",
            "Centre: $\\mathbf{Y} - \\mathbb{E}[\\mathbf{Y}] = \\mathbf{A}\\mathbf{X} + \\mathbf{b} - \\mathbf{A}\\boldsymbol{\\mu} - \\mathbf{b} = \\mathbf{A}(\\mathbf{X} - \\boldsymbol{\\mu})$. The shift $\\mathbf{b}$ has cancelled.",
            "So $\\text{Cov}(\\mathbf{Y}) = \\mathbb{E}\\!\\left[\\mathbf{A}(\\mathbf{X} - \\boldsymbol{\\mu})(\\mathbf{X} - \\boldsymbol{\\mu})^\\top\\mathbf{A}^\\top\\right]$, using $(\\mathbf{A}\\mathbf{v})^\\top = \\mathbf{v}^\\top\\mathbf{A}^\\top$.",
            "$\\mathbf{A}$ is fixed, so it comes out of the expectation on both sides: $\\mathbf{A}\\,\\mathbb{E}\\!\\left[(\\mathbf{X} - \\boldsymbol{\\mu})(\\mathbf{X} - \\boldsymbol{\\mu})^\\top\\right]\\mathbf{A}^\\top = \\mathbf{A}\\boldsymbol{\\Sigma}\\mathbf{A}^\\top$.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "It is $a^2\\sigma^2$, grown up",
          text: "For scalars, $\\text{Var}(aX + b) = a^2\\sigma^2$. The matrix version must be $m \\times m$ and symmetric, which forces $\\mathbf{A}$ to appear once on each side: $\\mathbf{A}\\boldsymbol{\\Sigma}\\mathbf{A}^\\top$. A quick shape check catches most errors — $\\mathbf{A}\\boldsymbol{\\Sigma}$ alone is $m \\times k$ and usually not even square, and $\\mathbf{A}^\\top\\boldsymbol{\\Sigma}\\mathbf{A}$ does not conform unless $m = k$.",
        },
        {
          kind: "example",
          title: "A sum and a weighted difference",
          problem:
            "$\\mathbf{X} = [X_1, X_2]^\\top$ has $\\boldsymbol{\\mu} = [1, 2]$ and $\\boldsymbol{\\Sigma} = \\begin{bmatrix} 4 & 1 \\\\ 1 & 2 \\end{bmatrix}$. Let $Y_1 = X_1 + X_2$ and $Y_2 = X_1 - 2X_2 + 3$. Find the mean vector and covariance matrix of $\\mathbf{Y} = [Y_1, Y_2]^\\top$.",
          steps: [
            "Write $\\mathbf{Y} = \\mathbf{A}\\mathbf{X} + \\mathbf{b}$ with $\\mathbf{A} = \\begin{bmatrix} 1 & 1 \\\\ 1 & -2 \\end{bmatrix}$ and $\\mathbf{b} = [0, 3]$.",
            "Mean: $\\mathbf{A}\\boldsymbol{\\mu} + \\mathbf{b} = [1 + 2,\\ 1 - 4] + [0, 3] = [3, 0]$.",
            "$\\mathbf{A}\\boldsymbol{\\Sigma} = \\begin{bmatrix} 5 & 3 \\\\ 2 & -3 \\end{bmatrix}$, then $\\mathbf{A}\\boldsymbol{\\Sigma}\\mathbf{A}^\\top = \\begin{bmatrix} 5 + 3 & 5 - 6 \\\\ 2 - 3 & 2 + 6 \\end{bmatrix}$.",
            "Check one entry the scalar way: $\\text{Var}(X_1 - 2X_2) = 4 + 4(2) - 2 \\cdot 2 \\cdot 1 = 8$. ✓",
          ],
          answer: "$\\mathbb{E}[\\mathbf{Y}] = [3, 0]$ and $\\text{Cov}(\\mathbf{Y}) = \\begin{bmatrix} 8 & -1 \\\\ -1 & 8 \\end{bmatrix}$. The $+3$ moved the mean and left the covariance alone.",
        },
        {
          kind: "table",
          headers: ["Choose A to be…", "and the rule gives…"],
          rows: [
            ["a row $\\mathbf{a}^\\top$", "$\\text{Var}(\\mathbf{a}^\\top\\mathbf{X}) = \\mathbf{a}^\\top\\boldsymbol{\\Sigma}\\mathbf{a}$, a scalar"],
            ["$\\tfrac{1}{n}\\mathbf{1}^\\top$, with $\\boldsymbol{\\Sigma} = \\sigma^2\\mathbf{I}$", "$\\text{Var}(\\bar{X}) = \\tfrac{1}{n^2}\\mathbf{1}^\\top(\\sigma^2\\mathbf{I})\\mathbf{1} = \\tfrac{\\sigma^2}{n}$"],
            ["a selection matrix (rows of $\\mathbf{I}$)", "the sub-block of $\\boldsymbol{\\Sigma}$ for the chosen components"],
            ["an orthogonal $\\mathbf{Q}$", "$\\mathbf{Q}\\boldsymbol{\\Sigma}\\mathbf{Q}^\\top$: the same spread, in rotated coordinates"],
            ["$\\mathbf{Q}^\\top$, $\\mathbf{Q}$ the eigenvectors of $\\boldsymbol{\\Sigma}$", "a diagonal matrix of eigenvalues: uncorrelated components (PCA)"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Two transformations of the same vector",
          text: "The same argument gives the cross-covariance of two linear maps of one vector: $\\text{Cov}(\\mathbf{A}\\mathbf{X}, \\mathbf{B}\\mathbf{X}) = \\mathbf{A}\\boldsymbol{\\Sigma}\\mathbf{B}^\\top$. So $\\mathbf{A}\\mathbf{X}$ and $\\mathbf{B}\\mathbf{X}$ are uncorrelated exactly when $\\mathbf{A}\\boldsymbol{\\Sigma}\\mathbf{B}^\\top = \\mathbf{0}$. With $\\boldsymbol{\\Sigma} = \\sigma^2\\mathbf{I}$ that is $\\mathbf{A}\\mathbf{B}^\\top = \\mathbf{0}$, which is why the sample mean and the vector of residuals $X_i - \\bar{X}$ are uncorrelated.",
        },
      ],
    },

    {
      heading: "When the transformed vector is degenerate",
      blocks: [
        {
          kind: "prose",
          text: "$\\text{rank}(\\mathbf{A}\\boldsymbol{\\Sigma}\\mathbf{A}^\\top) \\le \\min\\!\\left(\\text{rank}(\\mathbf{A}), \\text{rank}(\\boldsymbol{\\Sigma})\\right)$. If $\\mathbf{A}$ maps $\\mathbb{R}^k$ into a larger space ($m > k$), or has dependent rows, the covariance of $\\mathbf{Y}$ is singular. Some combination $\\mathbf{c}^\\top\\mathbf{Y}$ then has variance $\\mathbf{c}^\\top\\mathbf{A}\\boldsymbol{\\Sigma}\\mathbf{A}^\\top\\mathbf{c} = 0$ and is constant: $\\mathbf{Y}$ lives on a lower-dimensional flat in $\\mathbb{R}^m$.",
        },
        {
          kind: "example",
          title: "Copying a variable",
          problem: "$X$ is a scalar with variance $\\sigma^2$, and $\\mathbf{Y} = [X, X]^\\top$. Find $\\text{Cov}(\\mathbf{Y})$ and a combination of $\\mathbf{Y}$ with zero variance.",
          steps: [
            "$\\mathbf{A} = [1, 1]^\\top$ is $2 \\times 1$, so $\\text{Cov}(\\mathbf{Y}) = \\mathbf{A}\\sigma^2\\mathbf{A}^\\top = \\sigma^2\\begin{bmatrix} 1 & 1 \\\\ 1 & 1 \\end{bmatrix}$, which has determinant $0$.",
            "$\\mathbf{c} = [1, -1]$ is in its null space: $\\text{Var}(Y_1 - Y_2) = 0$.",
          ],
          answer: "$\\mathbf{Y}$ always lies on the line $y_1 = y_2$. It has no density on $\\mathbb{R}^2$, since all its probability sits on a set of zero area.",
        },
      ],
    },

    {
      heading: "The full distribution: what the mean and covariance miss",
      blocks: [
        {
          kind: "prose",
          text: "$\\mathbf{A}\\boldsymbol{\\mu} + \\mathbf{b}$ and $\\mathbf{A}\\boldsymbol{\\Sigma}\\mathbf{A}^\\top$ are two summaries of $\\mathbf{Y}$, not its distribution. In general, the family of $\\mathbf{X}$ is $\\textbf{NOT}$ preserved by a linear map. If $X_1, X_2$ are independent $\\text{Uniform}(0, 1)$, then $X_1 + X_2$ has mean $1$ and variance $\\tfrac{1}{6}$, but its density is the triangle $f(y) = 1 - |y - 1|$ on $[0, 2]$, not a uniform. To get the distribution itself, use a change of variables.",
        },
        {
          kind: "formula",
          latex: "f_{\\mathbf{Y}}(\\mathbf{y}) = \\frac{1}{|\\det \\mathbf{A}|}\\, f_{\\mathbf{X}}\\!\\left(\\mathbf{A}^{-1}(\\mathbf{y} - \\mathbf{b})\\right)",
          caption: "Density of Y = AX + b when A is square and invertible",
        },
        {
          kind: "prose",
          text: "This is the Jacobian formula for the inverse map $\\mathbf{x} = \\mathbf{A}^{-1}(\\mathbf{y} - \\mathbf{b})$. Its Jacobian matrix is the constant $\\mathbf{A}^{-1}$, with $|\\det \\mathbf{A}^{-1}| = 1/|\\det \\mathbf{A}|$. Geometrically, $\\mathbf{A}$ stretches every region's volume by $|\\det \\mathbf{A}|$, so the probability per unit volume must shrink by the same factor to keep the total at $1$.",
        },
        {
          kind: "example",
          title: "Shearing the unit square",
          problem:
            "$\\mathbf{X}$ is uniform on the unit square $[0, 1]^2$. Find the density of $\\mathbf{Y} = \\mathbf{A}\\mathbf{X}$ with $\\mathbf{A} = \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$, i.e. $Y_1 = X_1 + X_2$, $Y_2 = X_2$.",
          steps: [
            "$\\det \\mathbf{A} = 1$, and $\\mathbf{A}^{-1}\\mathbf{y} = [y_1 - y_2,\\ y_2]$.",
            "$f_{\\mathbf{X}}$ is $1$ on the square, so $f_{\\mathbf{Y}}(\\mathbf{y}) = 1$ whenever $0 \\le y_1 - y_2 \\le 1$ and $0 \\le y_2 \\le 1$.",
            "That region is the parallelogram with corners $(0, 0)$, $(1, 0)$, $(2, 1)$, $(1, 1)$, which has area $1$. ✓",
            "Integrating out $y_2$ gives the marginal of $Y_1 = X_1 + X_2$: the length of the slice at height $y_1$, which is the triangle $1 - |y_1 - 1|$.",
          ],
          answer: "$\\mathbf{Y}$ is uniform on a parallelogram. Its first coordinate is triangular — the shape-changing example above, recovered by the Jacobian method.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Non-square A: complete it, then marginalise",
          text: "The formula needs $\\mathbf{A}$ square and invertible. When $\\mathbf{A}$ is $m \\times k$ with $m < k$ and full row rank (e.g. one row, for a single sum), add $k - m$ rows that make it invertible, transform, and integrate the extra coordinates away — exactly what the second coordinate $Y_2 = X_2$ did above. When $m > k$, $\\mathbf{Y}$ is degenerate and has no density at all.",
        },
      ],
    },

    {
      heading: "The Gaussian case: the transformation determines everything",
      blocks: [
        {
          kind: "prose",
          text: "Normal vectors are the exception to “the family is not preserved”. Start from $\\mathbf{Z} = [Z_1, \\ldots, Z_k]^\\top$ with independent $\\mathcal{N}(0, 1)$ components, so $\\mathbb{E}[\\mathbf{Z}] = \\mathbf{0}$ and $\\text{Cov}(\\mathbf{Z}) = \\mathbf{I}$, and let $\\mathbf{Y} = \\mathbf{A}\\mathbf{Z} + \\mathbf{b}$.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Each component $Y_i = \\sum_j a_{ij}Z_j + b_i$ is a sum of independent normals plus a constant, so it is normal.",
            "More generally, any fixed combination $\\mathbf{c}^\\top\\mathbf{Y} = (\\mathbf{A}^\\top\\mathbf{c})^\\top\\mathbf{Z} + \\mathbf{c}^\\top\\mathbf{b}$ is also such a sum, so every linear combination of the components of $\\mathbf{Y}$ is normal.",
            "Its parameters come from the rule above: $\\mathbb{E}[\\mathbf{Y}] = \\mathbf{b}$ and $\\text{Cov}(\\mathbf{Y}) = \\mathbf{A}\\mathbf{I}\\mathbf{A}^\\top = \\mathbf{A}\\mathbf{A}^\\top$.",
          ],
        },
        {
          kind: "prose",
          text: "A vector all of whose linear combinations are normal is called multivariate normal, written $\\mathbf{Y} \\sim \\mathcal{N}(\\mathbf{b}, \\mathbf{A}\\mathbf{A}^\\top)$, and the next section of the course studies it in full. Applying the same argument to a vector that is already multivariate normal gives the closure rule, the one fact about Gaussian vectors used most often:",
        },
        {
          kind: "formula",
          latex: "\\mathbf{X} \\sim \\mathcal{N}(\\boldsymbol{\\mu}, \\boldsymbol{\\Sigma}) \\;\\Longrightarrow\\; \\mathbf{A}\\mathbf{X} + \\mathbf{b} \\sim \\mathcal{N}\\!\\left(\\mathbf{A}\\boldsymbol{\\mu} + \\mathbf{b},\\ \\mathbf{A}\\boldsymbol{\\Sigma}\\mathbf{A}^\\top\\right)",
          caption: "For a Gaussian vector, the mean and covariance rules are the whole answer",
        },
        {
          kind: "example",
          title: "Building a correlated normal from independent ones",
          problem:
            "Using independent $Z_1, Z_2 \\sim \\mathcal{N}(0, 1)$, construct $\\mathbf{X} \\sim \\mathcal{N}(\\mathbf{0}, \\boldsymbol{\\Sigma})$ with $\\boldsymbol{\\Sigma} = \\begin{bmatrix} 4 & 2 \\\\ 2 & 5 \\end{bmatrix}$.",
          steps: [
            "Look for a lower-triangular $\\mathbf{L}$ with $\\mathbf{L}\\mathbf{L}^\\top = \\boldsymbol{\\Sigma}$ (the Cholesky factor). Then $\\mathbf{X} = \\mathbf{L}\\mathbf{Z}$ has covariance $\\mathbf{L}\\mathbf{L}^\\top = \\boldsymbol{\\Sigma}$.",
            "$\\ell_{11} = \\sqrt{4} = 2$; $\\ell_{21} = 2/\\ell_{11} = 1$; $\\ell_{22} = \\sqrt{5 - 1^2} = 2$.",
            "So $\\mathbf{L} = \\begin{bmatrix} 2 & 0 \\\\ 1 & 2 \\end{bmatrix}$, and $X_1 = 2Z_1$, $X_2 = Z_1 + 2Z_2$.",
            "Check: $\\text{Var}(X_2) = 1 + 4 = 5$ and $\\text{Cov}(X_1, X_2) = \\text{Cov}(2Z_1, Z_1) = 2$. ✓",
          ],
          answer: "$\\mathbf{X} = \\mathbf{L}\\mathbf{Z}$ with $\\mathbf{L} = \\begin{bmatrix} 2 & 0 \\\\ 1 & 2 \\end{bmatrix}$. This is exactly how software draws correlated normal samples: factor $\\boldsymbol{\\Sigma}$ once, then multiply standard normal draws.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Normal marginals are not enough",
          text: "The closure rule needs $\\mathbf{X}$ to be jointly multivariate normal. If $X_1 \\sim \\mathcal{N}(0, 1)$ and $X_2 = SX_1$ with $S = \\pm 1$ a fair coin flip independent of $X_1$, both components are standard normal, but $X_1 + X_2$ equals $0$ with probability $\\tfrac{1}{2}$ — it is not normal. The marginals were normal; the vector was not.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Going backwards: whitening",
          text: "Run the construction in reverse. If $\\boldsymbol{\\Sigma} = \\mathbf{L}\\mathbf{L}^\\top$ is invertible, $\\mathbf{L}^{-1}(\\mathbf{X} - \\boldsymbol{\\mu})$ has covariance $\\mathbf{L}^{-1}\\boldsymbol{\\Sigma}\\mathbf{L}^{-\\top} = \\mathbf{I}$. For a Gaussian $\\mathbf{X}$ that means independent standard normal coordinates — the vector version of $z = (x - \\mu)/\\sigma$.",
        },
      ],
    },
  ],

  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§4.3, Bivariate Transformations; §4.6, Multivariate Distributions" },
    { source: "Blitzstein & Hwang, Introduction to Probability (2nd ed.)", locator: "§7.5, Multivariate Normal; §8.1, Change of Variables" },
    { source: "Rencher & Schaalje, Linear Models in Statistics (2nd ed.)", locator: "Ch. 3, Random Vectors and Matrices" },
  ],
};
