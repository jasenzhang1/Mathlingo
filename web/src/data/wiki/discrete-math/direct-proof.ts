import type { WikiArticle } from "../types";

export const directProof: WikiArticle = {
  conceptId: "direct-proof",
  summary:
    "The most straightforward way to prove $p \\to q$: assume $p$, and chain forward through definitions and known facts until $q$ falls out. No contradiction, no cases — just a single unbroken path from hypothesis to conclusion. It's the default first thing to try, and the technique every two-column geometry proof and algebraic derivation is secretly built from.",
  sections: [
    {
      heading: "The structure",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Hypothesis",
              description: "The proposition $p$ you're allowed to assume true, at the start of the proof.",
            },
            {
              term: "Conclusion",
              description: "The proposition $q$ you must reach, using only $p$, definitions, and previously established results.",
            },
            {
              term: "Direct proof",
              description:
                "A sequence of statements $p = s_0, s_1, \\ldots, s_n = q$, where each $s_i$ follows from $s_{i-1}$ (plus known facts) by a valid logical step.",
            },
          ],
        },
        {
          kind: "prose",
          text: "This is nothing more than iterated modus ponens: if $s_{i-1} \\to s_i$ is justified at every step, then $p \\to q$ is justified overall, because implication chains ($p \\to s_1$, $s_1 \\to s_2$, …, $s_{n-1} \\to q$) compose.",
        },
      ],
    },
    {
      heading: "Worked example: a parity argument",
      blocks: [
        {
          kind: "example",
          title: "If $n$ is odd, then $n^2$ is odd",
          problem: "Prove directly: for every integer $n$, if $n$ is odd then $n^2$ is odd.",
          steps: [
            "Assume $n$ is odd. By definition, $n = 2k+1$ for some integer $k$.",
            "Compute $n^2 = (2k+1)^2 = 4k^2 + 4k + 1$.",
            "Rewrite: $n^2 = 2(2k^2+2k) + 1$, which has the form $2m+1$ with $m = 2k^2+2k$ an integer.",
            "By definition, $n^2$ is odd.",
          ],
          answer: "The chain runs entirely forward from \"$n$ is odd\" to \"$n^2$ is odd\" — a direct proof.",
        },
      ],
    },
    {
      heading: "Worked example: the Gauss pairing trick",
      blocks: [
        {
          kind: "prose",
          text: "Not every direct proof is a one-line computation. This one is the standard non-inductive proof of a formula that will resurface, proved a second way, in `mathematical-induction`.",
        },
        {
          kind: "example",
          title: "$1+2+\\cdots+n = \\dfrac{n(n+1)}{2}$",
          problem: "Prove directly, without induction, that $1+2+\\cdots+n = \\dfrac{n(n+1)}{2}$ for every positive integer $n$.",
          steps: [
            "Let $S = 1 + 2 + \\cdots + n$, and also write it backwards: $S = n + (n-1) + \\cdots + 1$.",
            "Add the two expressions term by term: the $i$-th pair is $i + (n+1-i) = n+1$, for every $i$ from 1 to $n$.",
            "There are $n$ such pairs, all equal to $n+1$, so $2S = n(n+1)$.",
            "Divide by 2: $S = \\dfrac{n(n+1)}{2}$.",
          ],
          answer: "For $n=4$: $S=1+2+3+4=10$, and $\\dfrac{4\\cdot5}{2}=10$. `[verified]`",
        },
      ],
    },
    {
      heading: "Where this goes wrong",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Assuming the conclusion instead of the hypothesis",
          text: "A very common broken \"direct proof\" of $p \\to q$ starts by assuming $q$ (or the thing to be shown) and works backward to something true — that only shows $q \\to \\text{(something true)}$, which proves nothing about $p \\to q$. A direct proof must start from $p$ and arrive at $q$, not the reverse. Working backward from the goal is fine as *scratch work* to find the steps, but the proof you write up has to read forward.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Skipping the translation of \"odd\"/\"even\"/\"divisible by $k$\" into an algebraic form ($n=2k+1$, etc.) and reasoning about the words instead of the numbers.",
            "Using a specific example (\"it works for $n=4$\") as if it were a proof for all $n$ — direct proof must handle an arbitrary, unspecified case.",
            "Reaching for a direct proof on a statement that has no obvious forward path — that's the signal to try contradiction or induction instead.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Levin, Discrete Mathematics: An Open Introduction", locator: "Ch. 3.4–3.5, \"Proofs\"" },
    { source: "Lehman, Leighton & Meyer, MIT 6.042J Mathematics for Computer Science", locator: "Ch. 1.1, \"Propositions\" and Ch. 1.3, \"Logical Deductions\"" },
    { source: "Rosen, Discrete Mathematics and Its Applications", locator: "§1.7, \"Introduction to Proofs\"" },
  ],
};
