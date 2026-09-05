import type { WikiArticle } from "../types";

export const randomVariables: WikiArticle = {
  conceptId: "random-variables",
  summary:
    "A random variable is not a variable and is not random: it is a *function* from the sample space to the real numbers. That definition looks pedantic until it starts doing work — it is what lets you add random variables, transform them, and speak about their distribution without ever mentioning the underlying sample space again.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "X : \\Omega \\to \\mathbb{R}",
          caption: "A random variable maps outcomes to numbers",
        },
        {
          kind: "prose",
          text: "Roll two dice. The sample space is the 36 ordered pairs. \"The sum\" is a function sending $(3,4) \\mapsto 7$; \"the maximum\" is a different function on the same space. The randomness lives in which $\\omega$ occurs; $X$ itself is a fixed, deterministic rule.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why the function view earns its keep",
          text: "Because $X$ and $Y$ are functions on the *same* $\\Omega$, $X + Y$ is just pointwise addition — no new machinery needed. It also explains dependence: two random variables are dependent exactly when they read overlapping information out of the same underlying outcome. And it is why $\\{X \\le x\\}$ is an event — it is the preimage $\\{\\omega : X(\\omega) \\le x\\}$, a subset of $\\Omega$ we can assign probability to.",
        },
        {
          kind: "prose",
          text: "The measurability requirement — that every preimage $\\{X \\le x\\}$ lies in the $\\sigma$-algebra — is what makes $P(X \\le x)$ meaningful at all. For any function you are likely to write down it holds automatically, but it is the reason a $\\sigma$-algebra had to be set up first.",
        },
      ],
    },
    {
      heading: "The distribution",
      blocks: [
        {
          kind: "prose",
          text: "Once $X$ is defined, the sample space can be discarded. Everything probabilistic about $X$ is captured by how probability is spread over the values it takes — its distribution. Two random variables on completely different sample spaces can have identical distributions and are then interchangeable for any question about one of them alone.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Discrete",
              description:
                "Takes countably many values. Described by a probability mass function $p_X(x) = P(X = x)$, which is a genuine probability.",
            },
            {
              term: "Continuous",
              description:
                "Takes uncountably many values, with $P(X = x) = 0$ for every single $x$. Described by a density $f_X$, which is *not* a probability — only its integral over an interval is.",
            },
            {
              term: "Mixed",
              description:
                "Both, e.g. rainfall: an atom of probability at exactly zero for dry days, and a continuous spread over positive amounts.",
            },
          ],
        },
        {
          kind: "prose",
          text: "The CDF $F_X(x) = P(X \\le x)$ covers all three cases uniformly, which is why it, rather than the pmf or density, is the general-purpose description of a distribution.",
        },
      ],
    },
    {
      heading: "Functions of random variables",
      blocks: [
        {
          kind: "prose",
          text: "If $X$ is a random variable and $g$ a reasonable function, $g(X)$ is another random variable — the composition $\\omega \\mapsto g(X(\\omega))$. Its distribution is generally *not* obtained by applying $g$ to the parameters of $X$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The most common error in the whole subject",
          text: "$\\mathbb{E}[g(X)] \\neq g(\\mathbb{E}[X])$ unless $g$ is linear. If $X$ is a fair die, $\\mathbb{E}[X] = 3.5$ but $\\mathbb{E}[X^2] = 15.17$, not $3.5^2 = 12.25$. The gap is the variance. The same error appears as assuming the average of a ratio equals the ratio of averages, or that a portfolio's expected growth is the growth at the expected return.",
        },
        {
          kind: "example",
          title: "Distribution of a transform",
          problem: "$X$ is uniform on $\\{1,2,3,4,5,6\\}$. Find the distribution of $Y = (X - 3)^2$.",
          steps: [
            "Map each outcome: $1 \\mapsto 4$, $2 \\mapsto 1$, $3 \\mapsto 0$, $4 \\mapsto 1$, $5 \\mapsto 4$, $6 \\mapsto 9$.",
            "Collect equal values: $Y = 0$ once, $Y = 1$ twice, $Y = 4$ twice, $Y = 9$ once.",
            "Each original outcome has probability $1/6$.",
          ],
          answer:
            "$P(Y=0) = 1/6$, $P(Y=1) = 1/3$, $P(Y=4) = 1/3$, $P(Y=9) = 1/6$ — no longer uniform, because $g$ collapses distinct inputs onto the same output.",
        },
      ],
    },
  ],
  references: [
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 3.1–3.2" },
    { source: "Casella & Berger, Statistical Inference", locator: "§1.4–1.5" },
    { source: "Wasserman, All of Statistics", locator: "§2.1–2.2" },
    { source: "Mathlingo assessment bank", locator: "assessments/random-variables-and-density.md" },
  ],
};
