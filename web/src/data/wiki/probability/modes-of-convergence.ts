import type { WikiArticle } from "../types";

export const modesOfConvergence: WikiArticle = {
  conceptId: "modes-of-convergence",
  summary:
    "Sequences of random variables can converge in several inequivalent senses, and the choice matters because the major limit theorems are stated in different ones. The hierarchy is strict: almost sure implies in probability implies in distribution, and none of the reverse implications hold.",
  sections: [
    {
      heading: "The four modes",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Almost surely, $X_n \\xrightarrow{a.s.} X$",
              description:
                "$P\\big(\\lim_{n\\to\\infty} X_n = X\\big) = 1$. The sequence converges pointwise, for all outcomes except a set of probability zero. The strongest of the four.",
            },
            {
              term: "In probability, $X_n \\xrightarrow{P} X$",
              description:
                "$P(|X_n - X| > \\varepsilon) \\to 0$ for every $\\varepsilon > 0$. For any fixed large $n$, being far off is unlikely — but the sequence may still stray infinitely often.",
            },
            {
              term: "In $L^{p}$, $X_n \\xrightarrow{L^p} X$",
              description:
                "$\\mathbb{E}\\big[|X_n - X|^{p}\\big] \\to 0$. Convergence of moments; $p = 2$ is mean-square convergence.",
            },
            {
              term: "In distribution, $X_n \\xrightarrow{d} X$",
              description:
                "$F_n(x) \\to F(x)$ at every continuity point of $F$. Only the *distributions* converge — the variables need not live on the same probability space at all. The weakest.",
            },
          ],
        },
        {
          kind: "formula",
          latex: "X_n \\xrightarrow{a.s.} X \\ \\Longrightarrow \\ X_n \\xrightarrow{P} X \\ \\Longrightarrow \\ X_n \\xrightarrow{d} X, \\qquad X_n \\xrightarrow{L^p} X \\ \\Longrightarrow \\ X_n \\xrightarrow{P} X",
          caption: "The hierarchy — every arrow is strict, and none reverses in general",
        },
      ],
    },
    {
      heading: "Why the distinctions are real",
      blocks: [
        {
          kind: "example",
          title: "In probability but not almost surely",
          problem:
            "The typewriter sequence: on $[0,1]$ with the uniform measure, let $X_n$ be the indicator of a window of width $1/k$ that sweeps across the interval, then restarts with a narrower window.",
          steps: [
            "The windows have widths $1, \\tfrac{1}{2}, \\tfrac{1}{2}, \\tfrac{1}{3}, \\tfrac{1}{3}, \\tfrac{1}{3}, \\ldots$",
            "$P(X_n = 1)$ equals the window width, which tends to 0 — so $X_n \\xrightarrow{P} 0$.",
            "But every point of $[0,1]$ is covered by infinitely many windows, so $X_n(\\omega) = 1$ infinitely often for every $\\omega$.",
            "So $X_n(\\omega)$ does not converge for any $\\omega$.",
          ],
          answer:
            "Converges in probability to 0, almost surely to nothing. The excursions become rare but never stop.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "In distribution says nothing about the variables",
          text: "Let $X \\sim \\mathcal{N}(0,1)$ and set $X_n = -X$ for every $n$. Then $X_n$ has the standard normal distribution for all $n$, so $X_n \\xrightarrow{d} X$ trivially. But $|X_n - X| = 2|X|$, which does not go to zero in any sense. Convergence in distribution is a statement about CDFs, not about the random variables being close — which is why it is the right notion for the CLT and the wrong one for the LLN.",
        },
      ],
    },
    {
      heading: "Which theorem uses which",
      blocks: [
        {
          kind: "table",
          headers: ["Result", "Mode", "Statement"],
          rows: [
            [
              "Weak law of large numbers",
              "in probability",
              "$\\bar{X}_n \\xrightarrow{P} \\mu$",
            ],
            [
              "Strong law of large numbers",
              "almost surely",
              "$\\bar{X}_n \\xrightarrow{a.s.} \\mu$",
            ],
            [
              "Central limit theorem",
              "in distribution",
              "$\\sqrt{n}(\\bar{X}_n - \\mu)/\\sigma \\xrightarrow{d} \\mathcal{N}(0,1)$",
            ],
            [
              "Consistency of an estimator",
              "in probability",
              "$\\hat{\\theta}_n \\xrightarrow{P} \\theta$",
            ],
          ],
        },
        {
          kind: "prose",
          text: "The naming is now transparent: the *weak* law is the in-probability version and the *strong* law is the almost-sure one. The CLT cannot be stated more strongly — the standardised sum does not converge to any particular random variable, only its distribution stabilises.",
        },
      ],
    },
    {
      heading: "Tools",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**Slutsky's theorem.** If $X_n \\xrightarrow{d} X$ and $Y_n \\xrightarrow{P} c$ for a constant $c$, then $X_n + Y_n \\xrightarrow{d} X + c$ and $X_nY_n \\xrightarrow{d} cX$. This is what licenses replacing $\\sigma$ by a consistent estimate $s$ inside a CLT statement — the workhorse behind every $t$-based confidence interval.",
            "**Continuous mapping theorem.** Convergence in any of these modes is preserved by continuous functions: $X_n \\to X$ implies $g(X_n) \\to g(X)$.",
            "**Borel–Cantelli.** If $\\sum_n P(|X_n - X| > \\varepsilon) < \\infty$ then convergence is almost sure — the standard route for upgrading from in-probability.",
            "**Delta method.** Combines the CLT with a Taylor expansion to get the limiting distribution of $g(\\hat{\\theta}_n)$ from that of $\\hat{\\theta}_n$.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Convergence in distribution does not give convergence of moments",
          text: "$X_n \\xrightarrow{d} X$ does not imply $\\mathbb{E}[X_n] \\to \\mathbb{E}[X]$. A sequence can converge in distribution to a standard normal while having a mean that diverges, if a vanishing amount of probability escapes to a very large value. Uniform integrability is the extra condition needed to move moments across the limit, and it is exactly what $L^{p}$ convergence supplies.",
        },
      ],
    },
  ],
  references: [
    { source: "Casella & Berger, Statistical Inference", locator: "§5.5" },
    { source: "Wasserman, All of Statistics", locator: "§5.1–5.5" },
    { source: "Billingsley, Probability and Measure", locator: "§25" },
    { source: "Mathlingo assessment bank", locator: "assessments/inequalities-and-convergence.md" },
  ],
};
