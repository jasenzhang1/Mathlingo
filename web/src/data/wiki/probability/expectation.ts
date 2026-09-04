import type { WikiArticle } from "../types";

export const expectation: WikiArticle = {
  conceptId: "expectation",
  summary:
    "The expectation of a random variable is its probability-weighted average — the long-run mean value over many independent repetitions. Its single most useful property is linearity, which holds whether or not the variables involved are independent, and which turns many otherwise painful calculations into one-line arguments.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbb{E}[X] = \\sum_{x} x\\, p_X(x) \\qquad \\text{(discrete)}, \\qquad \\mathbb{E}[X] = \\int_{-\\infty}^{\\infty} x\\, f_X(x)\\,dx \\qquad \\text{(continuous)}",
          caption: "Expectation, in the discrete and continuous cases",
        },
        {
          kind: "prose",
          text: "Both are the same idea: each value weighted by how much probability sits on it. The expectation need not be a value the variable can actually take — a fair die has $\\mathbb{E}[X] = 3.5$ — and it need not exist at all. The Cauchy distribution has a perfectly good density and no mean, because the defining integral diverges.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The law of the unconscious statistician",
          text: "To find $\\mathbb{E}[g(X)]$ you do not need the distribution of $g(X)$. Weight $g(x)$ by the distribution of $X$: $\\mathbb{E}[g(X)] = \\sum_x g(x)p_X(x)$. The name is a joke about people using it without noticing it needs proof — but it is what makes moments, variances, and moment generating functions computable at all.",
        },
      ],
    },
    {
      heading: "Linearity",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbb{E}[aX + bY + c] = a\\,\\mathbb{E}[X] + b\\,\\mathbb{E}[Y] + c",
          caption: "Linearity of expectation — no independence required",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why \"no independence required\" is the whole point",
          text: "Almost every other useful identity needs independence. $\\operatorname{Var}(X+Y) = \\operatorname{Var}(X) + \\operatorname{Var}(Y)$ does; $\\mathbb{E}[XY] = \\mathbb{E}[X]\\mathbb{E}[Y]$ does. Linearity does not, and that is what lets you decompose a complicated dependent quantity into simple indicator variables and sum their means without worrying about how they interact.",
        },
        {
          kind: "example",
          title: "Indicator decomposition",
          problem:
            "Ten people each check a hat at random on leaving. How many, on average, get their own hat back?",
          steps: [
            "Let $X_i = 1$ if person $i$ gets their own hat, $0$ otherwise. The total is $X = \\sum_{i=1}^{10} X_i$.",
            "The $X_i$ are strongly dependent — if nine people get their own hat, so does the tenth.",
            "Linearity does not care: $\\mathbb{E}[X] = \\sum_i \\mathbb{E}[X_i]$.",
            "$\\mathbb{E}[X_i] = P(X_i = 1) = 1/10$ by symmetry.",
            "So $\\mathbb{E}[X] = 10 \\times 1/10 = 1$.",
          ],
          answer: "$1$ person on average — and the answer is $1$ for any number of people.",
        },
      ],
    },
    {
      heading: "Key properties",
      blocks: [
        {
          kind: "table",
          headers: ["Property", "Statement", "Condition"],
          rows: [
            ["Constant", "$\\mathbb{E}[c] = c$", "always"],
            ["Linearity", "$\\mathbb{E}[aX + bY] = a\\mathbb{E}[X] + b\\mathbb{E}[Y]$", "always"],
            ["Monotonicity", "$X \\le Y \\Rightarrow \\mathbb{E}[X] \\le \\mathbb{E}[Y]$", "always"],
            ["Product", "$\\mathbb{E}[XY] = \\mathbb{E}[X]\\,\\mathbb{E}[Y]$", "**independence** (uncorrelated suffices)"],
            ["Jensen", "$\\mathbb{E}[g(X)] \\ge g(\\mathbb{E}[X])$", "$g$ convex"],
            ["Tail formula", "$\\mathbb{E}[X] = \\int_0^{\\infty} P(X > x)\\,dx$", "$X \\ge 0$"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "$\\mathbb{E}[g(X)] \\neq g(\\mathbb{E}[X])$",
          text: "Expectation passes through linear functions and nothing else. $\\mathbb{E}[X^2] \\neq (\\mathbb{E}[X])^2$ — the gap between them is exactly the variance. $\\mathbb{E}[1/X] \\neq 1/\\mathbb{E}[X]$. Jensen's inequality says which way the error runs: for convex $g$ the true expectation is the larger one.",
        },
      ],
    },
    {
      heading: "Conditional expectation",
      blocks: [
        {
          kind: "prose",
          text: "Conditioning gives an expectation computed inside a restricted world, $\\mathbb{E}[X \\mid Y = y]$. Letting $y$ vary makes $\\mathbb{E}[X \\mid Y]$ a random variable — a function of $Y$ — and averaging it recovers the unconditional mean.",
        },
        {
          kind: "formula",
          latex: "\\mathbb{E}[X] = \\mathbb{E}\\big[\\,\\mathbb{E}[X \\mid Y]\\,\\big]",
          caption: "The tower property, or law of total expectation",
        },
        {
          kind: "prose",
          text: "This is the expectation counterpart of the law of total probability, and it is the standard tool for problems with a natural first step to condition on — which machine made the part, how many customers arrived, which branch a process took.",
        },
      ],
    },
  ],
  references: [
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 4.1–4.5, 9.1" },
    { source: "Casella & Berger, Statistical Inference", locator: "§2.2, §4.4" },
    { source: "Wasserman, All of Statistics", locator: "§3.1–3.3" },
    { source: "Mathlingo assessment bank", locator: "assessments/random-variables-and-density.md" },
  ],
};
