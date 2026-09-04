import type { WikiArticle } from "../types";

export const lawOfTotalExpectation: WikiArticle = {
  conceptId: "law-of-total-expectation",
  summary:
    "The law of total expectation — the tower property — says you can compute a mean by conditioning on something, averaging within each case, and then averaging those results. It converts hard unconditional problems into easy conditional ones, and it is the workhorse behind random sums, branching processes, and hierarchical models.",
  sections: [
    {
      heading: "Statement",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbb{E}[X] = \\mathbb{E}\\big[\\,\\mathbb{E}[X \\mid Y]\\,\\big]",
          caption: "The tower property",
        },
        {
          kind: "formula",
          latex: "\\mathbb{E}[X] = \\sum_{y} \\mathbb{E}[X \\mid Y = y]\\,P(Y = y)",
          caption: "The same statement written out for discrete $Y$",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "$\\mathbb{E}[X \\mid Y]$ is a random variable",
          text: "This is the step that makes the notation confusing at first. $\\mathbb{E}[X \\mid Y = y]$ is a number, computed for a specific $y$. But $\\mathbb{E}[X \\mid Y]$ leaves $y$ unspecified — it is a *function of $Y$*, and since $Y$ is random, so is it. The outer expectation averages that function over the distribution of $Y$. Once this lands, the tower property reads as an obvious statement: average the group means, weighted by group size.",
        },
      ],
    },
    {
      heading: "How it is used",
      blocks: [
        {
          kind: "prose",
          text: "The strategy is always the same: find something to condition on that makes the remaining problem easy. Good candidates are the first step of a process, a hidden category, or a random count.",
        },
        {
          kind: "example",
          title: "A random sum",
          problem:
            "A shop serves $N$ customers a day, where $\\mathbb{E}[N] = 40$. Each spends $X_i$ with $\\mathbb{E}[X_i] = £25$, independently of $N$ and of each other. What is expected daily revenue $S = \\sum_{i=1}^{N} X_i$?",
          steps: [
            "The number of terms is itself random, so linearity cannot be applied directly.",
            "Condition on $N$: given $N = n$, the sum has exactly $n$ terms, and $\\mathbb{E}[S \\mid N = n] = 25n$.",
            "So $\\mathbb{E}[S \\mid N] = 25N$ as a random variable.",
            "Tower: $\\mathbb{E}[S] = \\mathbb{E}[25N] = 25\\,\\mathbb{E}[N] = 25 \\times 40$.",
          ],
          answer: "£1,000 per day — Wald's identity, $\\mathbb{E}[S] = \\mathbb{E}[N]\\,\\mathbb{E}[X]$.",
        },
        {
          kind: "example",
          title: "Conditioning on the first step",
          problem:
            "A fair coin is flipped until the first head. What is the expected number of flips?",
          steps: [
            "Let $T$ be the number of flips and condition on the first one.",
            "If it is a head (probability $1/2$): $T = 1$.",
            "If it is a tail (probability $1/2$): one flip is spent and the situation resets, so $\\mathbb{E}[T \\mid \\text{tail}] = 1 + \\mathbb{E}[T]$.",
            "Tower: $\\mathbb{E}[T] = \\tfrac{1}{2}(1) + \\tfrac{1}{2}(1 + \\mathbb{E}[T])$.",
            "Solving: $\\mathbb{E}[T] = 1 + \\tfrac{1}{2}\\mathbb{E}[T] \\Rightarrow \\mathbb{E}[T] = 2$.",
          ],
          answer:
            "2 flips. Note the technique — conditioning on the first step turns an infinite sum into a one-line equation, using memorylessness of the process.",
        },
      ],
    },
    {
      heading: "The variance counterpart",
      blocks: [
        {
          kind: "formula",
          latex: "\\operatorname{Var}(X) = \\mathbb{E}\\big[\\operatorname{Var}(X \\mid Y)\\big] + \\operatorname{Var}\\big(\\mathbb{E}[X \\mid Y]\\big)",
          caption: "The law of total variance — within-group plus between-group",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Variance does not simply average",
          text: "The naive analogue $\\operatorname{Var}(X) = \\mathbb{E}[\\operatorname{Var}(X \\mid Y)]$ is wrong, and always understates the truth. Averaging the within-group variances ignores the fact that the groups have *different means*, and that spread between the group means is real variation in $X$. The second term is exactly that missing piece, and dropping it is a common source of standard errors that are too small in hierarchical and clustered data.",
        },
        {
          kind: "prose",
          text: "This decomposition is the same identity that appears as ANOVA's within/between sum-of-squares split, as the random-effects variance components, and as the bias–variance decomposition in machine learning — three fields, one theorem, applied to different choices of $Y$.",
        },
      ],
    },
  ],
  references: [
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 9.1–9.5" },
    { source: "Casella & Berger, Statistical Inference", locator: "§4.4" },
    { source: "Wasserman, All of Statistics", locator: "§3.5" },
    { source: "Mathlingo assessment bank", locator: "assessments/joint-and-conditional-structure.md" },
  ],
};
