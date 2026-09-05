import type { WikiArticle } from "../types";

export const markovInequality: WikiArticle = {
  conceptId: "markov-inequality",
  summary:
    "Markov's inequality bounds how much probability a non-negative random variable can put in its upper tail, using nothing but its mean. It is deliberately crude — it assumes almost nothing — and that is the point: it holds for distributions you know nothing about, and it is the foundation every sharper concentration bound is built on.",
  sections: [
    {
      heading: "Statement",
      blocks: [
        {
          kind: "formula",
          latex: "P(X \\ge a) \\le \\frac{\\mathbb{E}[X]}{a}, \\qquad X \\ge 0,\\ a > 0",
          caption: "Markov's inequality",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Non-negativity is not optional",
          text: "The bound is false without it. A variable equal to $-1000$ or $+1000$ with equal probability has mean 0, so the bound would claim $P(X \\ge 1) \\le 0$ — but that probability is $1/2$. Negative values can drag the mean down while leaving the upper tail untouched, which is exactly what the inequality cannot tolerate.",
        },
        {
          kind: "prose",
          text: "The proof is a single line of reasoning worth internalising, because the same trick recurs throughout probability. Split the expectation by whether $X$ clears the threshold:",
        },
        {
          kind: "formula",
          latex: "\\mathbb{E}[X] \\ \\ge \\ \\mathbb{E}\\big[X \\cdot \\mathbb{1}\\{X \\ge a\\}\\big] \\ \\ge \\ a \\cdot \\mathbb{E}\\big[\\mathbb{1}\\{X \\ge a\\}\\big] \\ = \\ a\\,P(X \\ge a)",
          caption: "Discard the part below the threshold, then bound the rest below by $a$",
        },
        {
          kind: "prose",
          text: "Both inequalities need $X \\ge 0$: the first to discard the low part without the total falling, the second to replace $X$ by the smaller value $a$ on the event where $X \\ge a$.",
        },
      ],
    },
    {
      heading: "How weak is it?",
      blocks: [
        {
          kind: "example",
          title: "A bound that is nearly useless — and one that is tight",
          problem:
            "Exam scores average 60 out of 100. Bound the fraction scoring at least 90. Then find a distribution making the bound exact.",
          steps: [
            "Markov: $P(X \\ge 90) \\le 60/90 = 2/3$.",
            "So at most 67% scored 90+. True, and almost content-free — you knew it was under 100%.",
            "Now suppose scores are 0 or 90, with $P(X = 90) = 2/3$. Then $\\mathbb{E}[X] = 60$. ✓",
            "And $P(X \\ge 90) = 2/3$ exactly, matching the bound.",
          ],
          answer:
            "$\\le 2/3$. The bound cannot be improved using only the mean, because a distribution attaining it exists.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why keep something this weak",
          text: "Because it assumes so little that it applies where nothing else does — no variance needed, no independence, no distributional form. And it is the engine underneath sharper results: apply Markov to $(X - \\mu)^2$ and you get Chebyshev; apply it to $e^{tX}$ and you get the Chernoff bounds behind most of concentration inequality theory. Its weakness in isolation is the price of its generality as a building block.",
        },
      ],
    },
    {
      heading: "What it implies",
      blocks: [
        {
          kind: "table",
          headers: ["Threshold", "Bound", "Reading"],
          rows: [
            ["$a = 2\\mathbb{E}[X]$", "$P(X \\ge 2\\mu) \\le 1/2$", "At most half can be twice the mean"],
            ["$a = 10\\mathbb{E}[X]$", "$P(X \\ge 10\\mu) \\le 1/10$", "At most a tenth can be ten times the mean"],
            ["$a = k\\mathbb{E}[X]$", "$P(X \\ge k\\mu) \\le 1/k$", "The general form"],
          ],
          caption:
            "This is why \"most people earn below the mean income\" is not paradoxical: a right-skewed distribution puts a small fraction far above the mean and the majority below it.",
        },
        {
          kind: "prose",
          text: "The bound decays only like $1/a$, which is very slow. For distributions with more structure — finite variance, or a moment generating function — the tail typically decays like $1/a^2$ or like $e^{-a}$, and the corresponding inequalities capture that. Markov is the floor, not the target.",
        },
      ],
    },
  ],
  references: [
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 10.1" },
    { source: "Casella & Berger, Statistical Inference", locator: "§3.6, §5.5" },
    { source: "Wasserman, All of Statistics", locator: "§4.1" },
    { source: "Mathlingo assessment bank", locator: "assessments/inequalities-and-convergence.md" },
  ],
};
