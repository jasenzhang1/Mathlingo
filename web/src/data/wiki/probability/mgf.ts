import type { WikiArticle } from "../types";

export const mgf: WikiArticle = {
  conceptId: "mgf",
  summary:
    "The moment generating function packages every moment of a distribution into a single function. Two facts make it worth the abstraction: differentiating it produces moments without integrating, and it determines the distribution uniquely — which turns \"what is the distribution of this sum?\" into a multiplication problem.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "M_X(t) = \\mathbb{E}\\big[e^{tX}\\big]",
          caption: "The moment generating function, defined wherever the expectation is finite",
        },
        {
          kind: "prose",
          text: "The name comes from the series expansion. Since $e^{tX} = 1 + tX + \\frac{t^{2}X^{2}}{2!} + \\cdots$, taking expectations gives",
        },
        {
          kind: "formula",
          latex: "M_X(t) = 1 + t\\,\\mathbb{E}[X] + \\frac{t^{2}}{2!}\\mathbb{E}[X^{2}] + \\frac{t^{3}}{3!}\\mathbb{E}[X^{3}] + \\cdots",
          caption: "The moments sit in the coefficients",
        },
        {
          kind: "formula",
          latex: "\\mathbb{E}[X^{n}] = M_X^{(n)}(0)",
          caption: "The $n$th moment is the $n$th derivative evaluated at zero",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The MGF need not exist",
          text: "$\\mathbb{E}[e^{tX}]$ can be infinite for every $t \\neq 0$ — this happens whenever the tails are heavy enough, as for the log-normal and the Cauchy. The MGF must be finite in some open interval around 0 for the theory to apply. The *characteristic function* $\\varphi_X(t) = \\mathbb{E}[e^{itX}]$ always exists, which is why measure-theoretic treatments prefer it, at the cost of complex arithmetic.",
        },
      ],
    },
    {
      heading: "The two properties that matter",
      blocks: [
        {
          kind: "formula",
          latex: "X \\perp\\!\\!\\!\\perp Y \\ \\Longrightarrow \\ M_{X+Y}(t) = M_X(t)\\,M_Y(t)",
          caption: "MGFs of independent variables multiply",
        },
        {
          kind: "prose",
          text: "This follows from $\\mathbb{E}[e^{t(X+Y)}] = \\mathbb{E}[e^{tX}e^{tY}] = \\mathbb{E}[e^{tX}]\\mathbb{E}[e^{tY}]$, using independence at the last step. It converts convolution — an integral — into a product.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Uniqueness is what makes the multiplication useful",
          text: "If two random variables have the same MGF on an open interval around 0, they have the same distribution. So having multiplied MGFs and recognised the product, you may conclude what the sum's distribution *is* — not merely that it has matching moments. Without uniqueness the product would be a curiosity; with it, the MGF becomes a proof technique.",
        },
        {
          kind: "example",
          title: "Sum of independent Poissons",
          problem:
            "$X \\sim \\text{Poisson}(\\lambda_1)$ and $Y \\sim \\text{Poisson}(\\lambda_2)$, independent. Find the distribution of $X + Y$.",
          steps: [
            "The Poisson MGF is $M(t) = \\exp\\{\\lambda(e^{t} - 1)\\}$.",
            "$M_{X+Y}(t) = \\exp\\{\\lambda_1(e^{t}-1)\\} \\cdot \\exp\\{\\lambda_2(e^{t}-1)\\}$.",
            "$= \\exp\\{(\\lambda_1 + \\lambda_2)(e^{t}-1)\\}$.",
            "That is the MGF of a Poisson$(\\lambda_1 + \\lambda_2)$, and MGFs are unique.",
          ],
          answer:
            "$X + Y \\sim \\text{Poisson}(\\lambda_1 + \\lambda_2)$ — obtained without a single convolution sum.",
        },
      ],
    },
    {
      heading: "Common MGFs",
      blocks: [
        {
          kind: "table",
          headers: ["Distribution", "$M_X(t)$", "Valid for"],
          rows: [
            ["Bernoulli$(p)$", "$1 - p + pe^{t}$", "all $t$"],
            ["Binomial$(n,p)$", "$(1 - p + pe^{t})^{n}$", "all $t$"],
            ["Poisson$(\\lambda)$", "$\\exp\\{\\lambda(e^{t}-1)\\}$", "all $t$"],
            ["Geometric$(p)$", "$\\dfrac{pe^{t}}{1 - (1-p)e^{t}}$", "$t < -\\ln(1-p)$"],
            ["Exponential$(\\lambda)$", "$\\dfrac{\\lambda}{\\lambda - t}$", "$t < \\lambda$"],
            ["Normal$(\\mu, \\sigma^{2})$", "$\\exp\\{\\mu t + \\sigma^{2}t^{2}/2\\}$", "all $t$"],
          ],
        },
        {
          kind: "prose",
          text: "The binomial MGF being the Bernoulli's raised to the $n$th power is the multiplication property in action, and it is the cleanest proof that a binomial is a sum of independent Bernoullis. The normal MGF makes closure under addition immediate: multiplying two of them adds the $\\mu$s and the $\\sigma^{2}$s.",
        },
      ],
    },
    {
      heading: "Practical use",
      blocks: [
        {
          kind: "example",
          title: "Moments by differentiation",
          problem: "Use the exponential MGF to find $\\mathbb{E}[X]$ and $\\operatorname{Var}(X)$.",
          steps: [
            "$M(t) = \\lambda/(\\lambda - t) = \\lambda(\\lambda - t)^{-1}$.",
            "$M'(t) = \\lambda(\\lambda - t)^{-2}$, so $M'(0) = \\lambda/\\lambda^{2} = 1/\\lambda$.",
            "$M''(t) = 2\\lambda(\\lambda - t)^{-3}$, so $M''(0) = 2\\lambda/\\lambda^{3} = 2/\\lambda^{2}$.",
            "$\\operatorname{Var}(X) = 2/\\lambda^{2} - (1/\\lambda)^{2} = 1/\\lambda^{2}$.",
          ],
          answer:
            "$\\mathbb{E}[X] = 1/\\lambda$, $\\operatorname{Var}(X) = 1/\\lambda^{2}$ — two derivatives instead of two integrals by parts.",
        },
        {
          kind: "prose",
          text: "Beyond moments and sums, MGFs give exponential tail bounds. Applying Markov's inequality to $e^{tX}$ yields $P(X \\ge a) \\le e^{-ta}M_X(t)$ for any $t > 0$, and optimising over $t$ produces the Chernoff bound — the basis of most modern concentration inequalities. This is also the route by which the central limit theorem is proved: expand the MGF of the standardised sum and watch it converge to $e^{t^{2}/2}$, the standard normal's.",
        },
      ],
    },
  ],
  references: [
    { source: "Casella & Berger, Statistical Inference", locator: "§2.3, Thm 2.3.11" },
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 6.4–6.5" },
    { source: "Wasserman, All of Statistics", locator: "§3.6" },
    { source: "Mathlingo assessment bank", locator: "assessments/mgf-likelihood-and-estimation.md" },
  ],
};
