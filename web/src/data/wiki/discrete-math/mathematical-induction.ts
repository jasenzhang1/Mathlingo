import type { WikiArticle } from "../types";

export const mathematicalInduction: WikiArticle = {
  conceptId: "mathematical-induction",
  summary:
    "To prove a statement $P(n)$ for every integer $n$ from some starting point, it's enough to check it at the start and show each case implies the next — the base case and the inductive step. It's an infinite family of direct proofs (each step from $k$ to $k+1$ is itself a direct proof) packaged into one finite argument, and it's how the Gauss-pairing identity from `direct-proof` gets proved a second, structurally different way.",
  sections: [
    {
      heading: "The structure",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Base case",
              description: "A direct verification that $P(n_0)$ holds, for the starting index $n_0$ (often 0 or 1).",
            },
            {
              term: "Inductive hypothesis",
              description: "The assumption, in the inductive step, that $P(k)$ holds for some arbitrary $k \\geq n_0$.",
            },
            {
              term: "Inductive step",
              description: "A direct proof that $P(k) \\to P(k+1)$, for arbitrary $k \\geq n_0$.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The domino picture",
          text: "The base case knocks over the first domino. The inductive step is the guarantee that domino $k$ falling always knocks over domino $k+1$ — checked once, for an arbitrary $k$, not domino by domino. Together, every domino falls, however far out the line goes. Remove the base case and nothing starts falling; remove the inductive step and the first domino falling tells you nothing about the second.",
        },
      ],
    },
    {
      heading: "Worked example: the sum formula, again",
      blocks: [
        {
          kind: "prose",
          text: "`direct-proof` proved this identity by pairing terms. Here it is proved a second way, by induction — the same fact, reached by a genuinely different route.",
        },
        {
          kind: "example",
          title: "$1+2+\\cdots+n = \\dfrac{n(n+1)}{2}$, by induction",
          problem: "Prove by induction that $1+2+\\cdots+n = \\dfrac{n(n+1)}{2}$ for every positive integer $n$.",
          steps: [
            "Base case ($n=1$): LHS $=1$; RHS $= \\dfrac{1\\cdot2}{2}=1$. Equal.",
            "Inductive hypothesis: assume $1+2+\\cdots+k = \\dfrac{k(k+1)}{2}$ for some $k \\geq 1$.",
            "Inductive step: $1+2+\\cdots+k+(k+1) = \\dfrac{k(k+1)}{2} + (k+1) = (k+1)\\left(\\dfrac{k}{2}+1\\right) = \\dfrac{(k+1)(k+2)}{2}$.",
            "This is exactly the claimed formula at $n=k+1$.",
          ],
          answer: "By induction, the formula holds for every $n \\geq 1$. `[verified: k=3: 6+4=10; formula at n=4: 10]`",
        },
      ],
    },
    {
      heading: "Worked example: an inequality",
      blocks: [
        {
          kind: "example",
          title: "$2^n > n$ for every $n \\geq 1$",
          problem: "Prove by induction that $2^n > n$ for every positive integer $n$.",
          steps: [
            "Base case ($n=1$): $2^1=2>1$. True.",
            "Inductive hypothesis: assume $2^k > k$ for some $k \\geq 1$.",
            "Inductive step: $2^{k+1} = 2\\cdot2^k > 2k$. Since $k \\geq 1$, $2k \\geq k+1$, so $2^{k+1} > 2k \\geq k+1$.",
          ],
          answer: "$2^{k+1} > k+1$, completing the step; by induction $2^n > n$ for all $n \\geq 1$. `[verified: n=1: 2>1; n=5: 32>5]`",
        },
      ],
    },
    {
      heading: "Where this goes wrong",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "A missing base case can prove a false statement",
          text: "Consider $P(n)$: \"$n = n+1$.\" The inductive step looks fine: if $k = k+1$, add 1 to both sides to get $k+1 = k+2$, which is exactly $P(k+1)$. Every domino would knock over the next — except there is no base case, because $P(n)$ is false for every $n$. The inductive step alone proves nothing; it only transmits truth, it never manufactures it.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Verifying the base case for the wrong starting index (e.g. checking $n=0$ when the claim is stated for $n \\geq 1$).",
            "In the inductive step, plugging in a *specific* $k$ (like $k=5$) instead of treating $k$ as arbitrary — that proves only one link in the chain, not the general step.",
            "Using the conclusion $P(k+1)$ somewhere inside the derivation of itself — circular reasoning disguised as an inductive step.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Levin, Discrete Mathematics: An Open Introduction", locator: "Ch. 3.7, \"Mathematical Induction\"" },
    { source: "Lehman, Leighton & Meyer, MIT 6.042J Mathematics for Computer Science", locator: "Ch. 2, \"Induction\"" },
    { source: "Rosen, Discrete Mathematics and Its Applications", locator: "§5.1, \"Mathematical Induction\"" },
  ],
};
