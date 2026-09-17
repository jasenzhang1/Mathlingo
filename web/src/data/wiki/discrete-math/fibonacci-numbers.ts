import type { WikiArticle } from "../types";

export const fibonacciNumbers: WikiArticle = {
  conceptId: "fibonacci-numbers",
  summary:
    "The Fibonacci sequence — 0, 1, 1, 2, 3, 5, 8, 13, 21, ... — is defined by the two-back recurrence $F(n)=F(n-1)+F(n-2)$, making it the canonical example of everything the last two concepts set up: two base cases, a strong-induction proof machinery, and (previewed here) a closed form built from an irrational number that always lands on an integer.",
  sections: [
    {
      heading: "The recurrence and the sequence",
      blocks: [
        {
          kind: "formula",
          latex: "F(0)=0, \\quad F(1)=1, \\quad F(n) = F(n-1) + F(n-2) \\text{ for } n \\geq 2",
          caption: "The Fibonacci recurrence",
        },
        {
          kind: "table",
          headers: ["$n$", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          rows: [["$F(n)$", "0", "1", "1", "2", "3", "5", "8", "13", "21", "34", "55"]],
          caption: "The first eleven Fibonacci numbers. `[verified]`",
        },
      ],
    },
    {
      heading: "An identity, proved by strong induction",
      blocks: [
        {
          kind: "prose",
          text: "Because the recurrence reaches back two terms, proving facts about $F(n)$ is the worked example `strong-induction` and `recursion` were both pointing toward.",
        },
        {
          kind: "example",
          title: "$F(1)+F(2)+\\cdots+F(n) = F(n+2) - 1$",
          problem: "Prove by induction that the sum of the first $n$ Fibonacci numbers (starting from $F(1)$) equals $F(n+2)-1$.",
          steps: [
            "Base case ($n=1$): LHS $= F(1) = 1$; RHS $= F(3)-1 = 2-1=1$. Equal.",
            "Inductive hypothesis: assume $F(1)+\\cdots+F(k) = F(k+2)-1$ for some $k \\geq 1$.",
            "Inductive step: $F(1)+\\cdots+F(k)+F(k+1) = \\big(F(k+2)-1\\big) + F(k+1) = \\big(F(k+2)+F(k+1)\\big) - 1$.",
            "By the Fibonacci recurrence itself, $F(k+2)+F(k+1) = F(k+3)$, so this equals $F(k+3)-1$ — the formula at $n=k+1$.",
          ],
          answer: "By induction, $F(1)+\\cdots+F(n)=F(n+2)-1$ for all $n \\geq 1$. `[verified: n=6: 1+1+2+3+5+8=20; F(8)-1=21-1=20]`",
        },
      ],
    },
    {
      heading: "The closed form: a preview",
      blocks: [
        {
          kind: "formula",
          latex: "F(n) = \\frac{\\varphi^n - \\psi^n}{\\sqrt5}, \\qquad \\varphi = \\frac{1+\\sqrt5}{2} \\approx 1.618, \\quad \\psi = \\frac{1-\\sqrt5}{2} \\approx -0.618",
          caption: "Binet's formula",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why an irrational formula always gives a whole number",
          text: "$\\varphi$ and $\\psi$ are the two roots of $x^2 = x+1$, so every integer-coefficient combination of their powers stays tied to $\\sqrt5$ in a way that cancels exactly in $(\\varphi^n-\\psi^n)/\\sqrt5$ — the result is always an integer, never a stray irrational remainder. And because $|\\psi| < 1$, $\\psi^n \\to 0$ as $n$ grows, so for large $n$, $F(n) \\approx \\varphi^n/\\sqrt5$ — which is why the ratio $F(n+1)/F(n)$ converges to the golden ratio $\\varphi$.",
        },
        {
          kind: "prose",
          text: "This formula is stated here as a preview, not proved — its derivation (via the recurrence's characteristic equation) belongs to later material on solving linear recurrences.",
        },
      ],
    },
    {
      heading: "Where this goes wrong",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Off-by-one indexing",
          text: "Some sources start the sequence at $F(1)=F(2)=1$ instead of $F(0)=0, F(1)=1$; both conventions are common in the wild. Within a single problem, mixing them silently shifts every later index by one — $F(7)$ is 13 under the $F(0)=0$ convention used here, but would be labeled $F(8)$ under the other. Always fix the convention explicitly before quoting a specific $F(n)$ value.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Treating the golden ratio $\\varphi$ itself as \"the\" Fibonacci formula, forgetting the $\\psi^n$ correction term that makes the exact value an integer rather than an approximation.",
            "Trying to prove a Fibonacci identity with ordinary (one-case) induction — the recurrence's two-term reach means the inductive step needs both $F(k)$ and $F(k-1)$-style information; strong induction is the right tool (see `strong-induction`, `recursion`).",
            "Confusing $F(n+2)-1$ (the sum identity above) with $F(n)-1$ or $F(n+1)-1$ — always re-derive small cases to pin down the exact shift.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Levin, Discrete Mathematics: An Open Introduction", locator: "Ch. 3.9, \"Recursive Definitions\" (Fibonacci example)" },
    { source: "Lehman, Leighton & Meyer, MIT 6.042J Mathematics for Computer Science", locator: "Ch. 2.4, \"Recursive Data Types and Structural Induction\" and Ch. 15, \"Recurrences\"" },
    { source: "Rosen, Discrete Mathematics and Its Applications", locator: "§5.3, \"Recursive Definitions\" (Fibonacci sequence)" },
  ],
};
