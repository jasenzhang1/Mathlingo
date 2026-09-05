import type { WikiArticle } from "../types";

export const pdf: WikiArticle = {
  conceptId: "pdf",
  summary:
    "A probability density function describes a continuous random variable. Its values are *not* probabilities — they are probability per unit length, and can exceed 1. Only areas under the curve are probabilities, which is why $P(X = x) = 0$ for every single point and why intervals are the only meaningful questions to ask.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "P(a \\le X \\le b) = \\int_{a}^{b} f_X(x)\\,dx",
          caption: "Probability is area under the density",
        },
        {
          kind: "prose",
          text: "A valid density satisfies two conditions, mirroring the pmf's but with an integral in place of a sum:",
        },
        {
          kind: "formula",
          latex: "f_X(x) \\ge 0 \\ \\text{ for all } x, \\qquad \\int_{-\\infty}^{\\infty} f_X(x)\\,dx = 1",
          caption: "Non-negativity and total area 1",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "$f_X(x)$ is not $P(X = x)$",
          text: "This is the central point and the most persistent confusion. A Uniform$(0, 0.5)$ has density $f(x) = 2$ on its support — a value of 2 is not a probability of 2. Densities can be arbitrarily large: as a distribution concentrates on a narrow interval, its density there grows without bound while the area stays 1. Only $\\int f$ over a region is a probability.",
        },
        {
          kind: "prose",
          text: "The reason every single point has probability zero is that the interval has zero width, so the integral over it is zero. A consequence worth internalising: for continuous variables the strictness of inequalities never matters, and $P(a < X < b) = P(a \\le X \\le b)$.",
        },
      ],
    },
    {
      heading: "What the density does mean",
      blocks: [
        {
          kind: "formula",
          latex: "P(x < X \\le x + \\varepsilon) \\approx f_X(x)\\,\\varepsilon \\quad \\text{for small } \\varepsilon",
          caption: "Density times width approximates probability",
        },
        {
          kind: "prose",
          text: "So $f_X(x)$ measures how densely probability is packed near $x$, in the same way mass density measures kilograms per cubic metre. Comparing $f_X(2) = 0.4$ with $f_X(5) = 0.1$ says values near 2 are four times as likely as values near 5, per unit width — a statement about relative likelihood, not about probabilities.",
        },
      ],
    },
    {
      heading: "Relationship to the CDF",
      blocks: [
        {
          kind: "formula",
          latex: "F_X(x) = \\int_{-\\infty}^{x} f_X(t)\\,dt, \\qquad f_X(x) = \\frac{d}{dx}F_X(x)",
          caption: "The CDF integrates the density; the density differentiates the CDF",
        },
        {
          kind: "prose",
          text: "The CDF is the more fundamental object — it exists for every random variable, while a density exists only when $F$ is differentiable. In practice the CDF is often the easier route: to find the distribution of a transformed variable, computing $P(g(X) \\le y)$ and then differentiating usually beats manipulating densities directly.",
        },
        {
          kind: "example",
          title: "Worked example",
          problem:
            "$X$ has density $f(x) = 3x^{2}$ on $[0,1]$ and zero elsewhere. Verify it is a density, then find $P(X > 0.5)$ and $\\mathbb{E}[X]$.",
          steps: [
            "Non-negative on $[0,1]$. ✓",
            "$\\int_0^1 3x^2\\,dx = [x^3]_0^1 = 1$. ✓ Valid density.",
            "$P(X > 0.5) = \\int_{0.5}^{1} 3x^2\\,dx = 1 - 0.5^3 = 1 - 0.125 = 0.875$.",
            "$\\mathbb{E}[X] = \\int_0^1 x \\cdot 3x^2\\,dx = \\int_0^1 3x^3\\,dx = 3/4$.",
          ],
          answer: "$P(X > 0.5) = 0.875$ and $\\mathbb{E}[X] = 0.75$.",
        },
      ],
    },
    {
      heading: "Common continuous densities",
      blocks: [
        {
          kind: "table",
          headers: ["Distribution", "Density", "Support", "Mean"],
          rows: [
            ["Uniform$(a,b)$", "$\\dfrac{1}{b-a}$", "$[a,b]$", "$\\dfrac{a+b}{2}$"],
            [
              "Exponential$(\\lambda)$",
              "$\\lambda e^{-\\lambda x}$",
              "$[0,\\infty)$",
              "$1/\\lambda$",
            ],
            [
              "Normal$(\\mu,\\sigma^{2})$",
              "$\\dfrac{1}{\\sigma\\sqrt{2\\pi}}e^{-(x-\\mu)^{2}/(2\\sigma^{2})}$",
              "$\\mathbb{R}$",
              "$\\mu$",
            ],
            [
              "Beta$(\\alpha,\\beta)$",
              "$\\dfrac{x^{\\alpha-1}(1-x)^{\\beta-1}}{B(\\alpha,\\beta)}$",
              "$[0,1]$",
              "$\\dfrac{\\alpha}{\\alpha+\\beta}$",
            ],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Support is part of the definition",
          text: "A density is only meaningful alongside the set where it is non-zero. Writing $f(x) = \\lambda e^{-\\lambda x}$ without \"for $x \\ge 0$\" describes a function that integrates to infinity over $\\mathbb{R}$. Most integration errors in this material come from carrying the wrong limits rather than from the calculus.",
        },
      ],
    },
  ],
  references: [
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 5.1–5.2" },
    { source: "Casella & Berger, Statistical Inference", locator: "§1.6, §3.3" },
    { source: "Wasserman, All of Statistics", locator: "§2.3–2.4" },
    { source: "Mathlingo assessment bank", locator: "assessments/random-variables-and-density.md" },
  ],
};
