import type { WikiArticle } from "../types";

export const cdf: WikiArticle = {
  conceptId: "cdf",
  summary:
    "The cumulative distribution function $F_X(x) = P(X \\le x)$ is the one description that works for every random variable — discrete, continuous, or mixed. It always exists, it determines the distribution completely, and its three defining properties are exactly what a function needs to be a CDF of something.",
  sections: [
    {
      heading: "Definition and properties",
      blocks: [
        {
          kind: "formula",
          latex: "F_X(x) = P(X \\le x), \\qquad x \\in \\mathbb{R}",
          caption: "The cumulative distribution function",
        },
        {
          kind: "prose",
          text: "Three properties characterise CDFs. A function satisfying all three is the CDF of some random variable, and any CDF satisfies all three — so this is a complete description, not just a list of consequences.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "**Non-decreasing.** $x \\le y \\Rightarrow F(x) \\le F(y)$, since $\\{X \\le x\\} \\subseteq \\{X \\le y\\}$ and probability is monotone.",
            "**Limits.** $\\lim_{x \\to -\\infty} F(x) = 0$ and $\\lim_{x \\to \\infty} F(x) = 1$.",
            "**Right-continuous.** $\\lim_{h \\downarrow 0} F(x+h) = F(x)$.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why right-continuous and not left",
          text: "It follows from the $\\le$ in the definition. $F$ jumps at any value carrying positive probability, and writing $P(X \\le x)$ rather than $P(X < x)$ means the jump *includes* its endpoint — so approaching $x$ from above lands on $F(x)$, while approaching from below stops short by exactly $P(X = x)$. Defining the CDF with $<$ would make it left-continuous instead; the convention is arbitrary but universal, and mixing the two is a reliable source of off-by-one errors on discrete variables.",
        },
      ],
    },
    {
      heading: "Reading probabilities off the CDF",
      blocks: [
        {
          kind: "table",
          headers: ["Quantity", "In terms of $F$"],
          rows: [
            ["$P(X \\le a)$", "$F(a)$"],
            ["$P(X > a)$", "$1 - F(a)$"],
            ["$P(a < X \\le b)$", "$F(b) - F(a)$"],
            ["$P(X = a)$", "$F(a) - F(a^{-})$ — the size of the jump at $a$"],
            ["$P(X < a)$", "$F(a^{-})$, the left limit"],
          ],
        },
        {
          kind: "prose",
          text: "For a continuous variable $F$ has no jumps, so $P(X = a) = 0$ and all four interval forms — strict or not at either end — agree. For a discrete variable they do not, and keeping track of which endpoints are included is most of the work.",
        },
      ],
    },
    {
      heading: "Shape tells you the type",
      blocks: [
        {
          kind: "table",
          headers: ["Variable", "CDF shape", "Recovering the distribution"],
          rows: [
            [
              "Discrete",
              "Step function; flat between values, jumping at each",
              "$p_X(a)$ is the height of the jump at $a$",
            ],
            [
              "Continuous",
              "Continuous and non-decreasing, no jumps",
              "$f_X(x) = F_X'(x)$ wherever the derivative exists",
            ],
            [
              "Mixed",
              "Rises continuously but with jumps at atoms",
              "Both, on their respective parts",
            ],
          ],
        },
        {
          kind: "example",
          title: "Worked example",
          problem:
            "$X$ has CDF $F(x) = 0$ for $x < 0$, $F(x) = x^2$ for $0 \\le x < 1$, and $F(x) = 1$ for $x \\ge 1$. Find $P(0.3 < X \\le 0.7)$ and the density.",
          steps: [
            "$P(0.3 < X \\le 0.7) = F(0.7) - F(0.3) = 0.49 - 0.09$.",
            "$F$ is continuous everywhere, so $X$ has no atoms and the strictness of the inequalities does not matter.",
            "Differentiate on $(0,1)$: $f(x) = \\frac{d}{dx} x^2 = 2x$.",
            "Check it integrates to 1: $\\int_0^1 2x\\,dx = 1$. ✓",
          ],
          answer: "$P = 0.40$; density $f(x) = 2x$ on $[0,1]$, zero elsewhere.",
        },
      ],
    },
    {
      heading: "The quantile function",
      blocks: [
        {
          kind: "formula",
          latex: "F^{-1}(u) = \\inf\\{x : F(x) \\ge u\\}, \\qquad u \\in (0,1)",
          caption: "The generalised inverse, defined even when $F$ is not strictly increasing",
        },
        {
          kind: "prose",
          text: "This gives medians ($u = 0.5$), quartiles, and the critical values behind every confidence interval. It also gives a way to simulate any distribution from uniform randomness:",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Inverse transform sampling",
          text: "If $U \\sim \\text{Uniform}(0,1)$ then $F^{-1}(U)$ has CDF $F$. One line of proof: $P(F^{-1}(U) \\le x) = P(U \\le F(x)) = F(x)$. This is how a random number generator producing uniforms is turned into samples from any distribution whose CDF can be inverted, and it is why the CDF — not the density — is the object simulation cares about.",
        },
      ],
    },
  ],
  references: [
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 3.6, 5.3" },
    { source: "Casella & Berger, Statistical Inference", locator: "§1.5, Thm 2.1.10" },
    { source: "Wasserman, All of Statistics", locator: "§2.3" },
    { source: "Mathlingo assessment bank", locator: "assessments/random-variables-and-density.md" },
  ],
};
