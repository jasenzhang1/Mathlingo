import type { WikiArticle } from "../types";

export const recursion: WikiArticle = {
  conceptId: "recursion",
  summary:
    "A recursive definition builds a sequence or structure out of smaller instances of itself: one or more base cases give explicit starting values, and a recursive rule builds every later term from earlier ones. It's the natural companion to induction — a recursive definition is what a proof by induction is usually proving something about — and a rule that reaches back more than one term is exactly where strong induction, not ordinary induction, becomes the right proof tool.",
  sections: [
    {
      heading: "What a recursive definition needs",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Base case(s)",
              description: "Explicit starting value(s) given directly, with no reference to the rule — e.g. $a(1) = 1$.",
            },
            {
              term: "Recursive rule",
              description: "A formula for $a(n)$ in terms of one or more earlier terms, e.g. $a(n) = 2a(n-1)+1$ for $n \\geq 2$.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Recursion needs a floor, or it never bottoms out",
          text: "A recursive rule with no base case is like an inductive step with no base case: it describes a relationship between consecutive terms, but never actually pins any term down. Evaluating $a(n)$ requires $a(n-1)$, which requires $a(n-2)$, forever — nothing terminates the chain. The base case is what makes a recursive definition a definition, not just a pattern.",
        },
      ],
    },
    {
      heading: "Worked examples",
      blocks: [
        {
          kind: "example",
          title: "The factorial",
          problem: "The factorial is defined recursively by $0! = 1$ and $n! = n \\cdot (n-1)!$ for $n \\geq 1$. Compute $4!$ by unwinding the recursion.",
          steps: [
            "$4! = 4 \\cdot 3!$",
            "$3! = 3 \\cdot 2!$",
            "$2! = 2 \\cdot 1!$",
            "$1! = 1 \\cdot 0! = 1 \\cdot 1 = 1$ (base case reached)",
            "Unwinding back up: $2!=2$, $3!=6$, $4!=24$.",
          ],
          answer: "$4! = 24$.",
        },
        {
          kind: "example",
          title: "A one-back recurrence",
          problem: "$a(1)=1$, $a(n) = 2a(n-1)+1$ for $n \\geq 2$. Compute $a(4)$, then prove $a(n) = 2^n - 1$ for all $n \\geq 1$ by induction.",
          steps: [
            "$a(2) = 2(1)+1 = 3$; $a(3) = 2(3)+1=7$; $a(4) = 2(7)+1 = 15$. `[verified]`",
            "Base case ($n=1$): $2^1-1 = 1 = a(1)$.",
            "Inductive step: assume $a(k) = 2^k - 1$. Then $a(k+1) = 2a(k)+1 = 2(2^k-1)+1 = 2^{k+1}-1$, the formula at $n=k+1$.",
          ],
          answer: "$a(4) = 15$, and $a(n) = 2^n-1$ for all $n \\geq 1$ by induction. `[verified: 2^4-1=15]`",
        },
      ],
    },
    {
      heading: "When a rule reaches back more than one term",
      blocks: [
        {
          kind: "prose",
          text: "The recurrence above reaches back only one term, so an ordinary-induction proof about it works cleanly — the inductive hypothesis at $k$ is exactly what's needed to compute $a(k+1)$. The Fibonacci recurrence is different:",
        },
        {
          kind: "formula",
          latex: "F(0)=0, \\quad F(1)=1, \\quad F(n) = F(n-1) + F(n-2) \\text{ for } n \\geq 2",
          caption: "A two-back recurrence",
        },
        {
          kind: "prose",
          text: "Any proof about $F(n)$ needs the inductive hypothesis available at *both* $n-1$ and $n-2$ simultaneously — precisely the situation `strong-induction` describes. A rigorous induction proof of a Fibonacci identity therefore needs two base cases ($F(0)$ and $F(1)$) and a strong-induction step, covered in full in the next concept.",
        },
      ],
    },
    {
      heading: "Where this goes wrong",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Reaching back further than the base cases supply",
          text: "A recursive rule that reaches back two terms needs *two* base cases, not one. Defining $a(0)=0$ alone and then $a(n)=a(n-1)+a(n-2)$ leaves $a(1)$ undefined — $a(1)$ would need $a(-1)$, which doesn't exist. Every term the recursive rule reaches back to must ultimately bottom out at a base case.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Computing a few terms by hand and assuming the pattern continues, instead of proving the closed form by induction.",
            "Using ordinary induction's single-case hypothesis to try to prove something about a rule that reaches back two or more terms — the hypothesis at $k$ alone isn't enough; see `strong-induction`.",
            "Confusing a recursive *definition* (which builds terms) with a recursive *algorithm* implementing it — the algorithm can be inefficient (recomputing the same subproblem many times) even when the definition is perfectly sound.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Levin, Discrete Mathematics: An Open Introduction", locator: "Ch. 3.9, \"Recursive Definitions\"" },
    { source: "Lehman, Leighton & Meyer, MIT 6.042J Mathematics for Computer Science", locator: "Ch. 2.4, \"Recursive Data Types and Structural Induction\"" },
    { source: "Rosen, Discrete Mathematics and Its Applications", locator: "§5.3–5.4, \"Recursive Definitions\" and \"Recursive Algorithms\"" },
  ],
};
