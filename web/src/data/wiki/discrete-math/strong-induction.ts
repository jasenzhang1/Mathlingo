import type { WikiArticle } from "../types";

export const strongInduction: WikiArticle = {
  conceptId: "strong-induction",
  summary:
    "Ordinary induction's inductive step may use only the single immediately preceding case, $P(k)$, to prove $P(k+1)$. Strong induction allows the inductive step to use *every* smaller case, $P(n_0), \\ldots, P(k)$, at once. The two are logically equivalent in what they can prove — but strong induction is the natural tool whenever the step needs to reach back further than one, which is exactly what happens once recursive definitions reach back two terms.",
  sections: [
    {
      heading: "How the inductive step differs",
      blocks: [
        {
          kind: "table",
          headers: ["", "Ordinary induction", "Strong induction"],
          rows: [
            ["Base case(s)", "$P(n_0)$", "$P(n_0)$ (sometimes several)"],
            ["Available hypothesis", "$P(k)$ only", "$P(n_0), P(n_0+1), \\ldots, P(k)$, all of them"],
            ["Proves", "$P(k+1)$", "$P(k+1)$"],
          ],
          caption:
            "Both conclude $P(n)$ for all $n \\geq n_0$. Strong induction is never logically necessary — anything provable with it is provable with ordinary induction too, by folding the extra hypotheses into a single combined statement — but it is very often the more natural way to write the proof.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Not a more powerful axiom",
          text: "It's tempting to think strong induction proves things ordinary induction can't. It doesn't — the two are provably equivalent principles. The difference is purely about convenience: some inductive steps genuinely need an arbitrary earlier case (not just the last one), and strong induction lets you reach for it directly instead of restating the whole history inside $P(k)$ by hand.",
        },
      ],
    },
    {
      heading: "Worked example: every integer factors into primes",
      blocks: [
        {
          kind: "example",
          title: "Existence part of the Fundamental Theorem of Arithmetic",
          problem: "Prove by strong induction: every integer $n \\geq 2$ is either prime or a product of primes.",
          steps: [
            "Base case ($n=2$): 2 is prime. Done.",
            "Strong inductive hypothesis: for some $n > 2$, assume every integer $k$ with $2 \\leq k < n$ is prime or a product of primes.",
            "If $n$ is prime, done.",
            "Otherwise $n$ is composite: $n = ab$ with $1 < a,b < n$. Since $2 \\leq a < n$ and $2 \\leq b < n$, the hypothesis applies to *both* $a$ and $b$: each is prime or a product of primes.",
            "So $n = ab$ is a product of primes too.",
          ],
          answer: "By strong induction, every integer $n \\geq 2$ is prime or a product of primes.",
        },
      ],
    },
    {
      heading: "Worked example: the postage-stamp problem",
      blocks: [
        {
          kind: "example",
          title: "3 and 5 stamps",
          problem: "Every integer $n \\geq 8$ can be written as $3a+5b$ for nonnegative integers $a,b$. What base cases does a strong-induction proof of this need, and why more than one?",
          steps: [
            "The natural inductive step writes $n+1$ using a representation of $n+1-3 = n-2$: if $n-2 = 3a+5b$, then $n+1 = 3(a+1)+5b$.",
            "That step reaches back 3 steps, not 1 — so it needs $P(n-2)$, which could be any of the previous three cases depending on $n \\bmod 3$.",
            "To be safe for every $n \\geq 8$, the argument needs three consecutive base cases to anchor all three residues: $n=8$: $8=3+5$; $n=9$: $9=3+3+3$; $n=10$: $10=5+5$.",
          ],
          answer: "Three base cases (8, 9, 10), each covering one residue class mod 3, then the strong-induction step carries every larger $n$. `[verified: 8=3+5, 9=3·3, 10=5·2]`",
        },
      ],
    },
    {
      heading: "Where this goes wrong",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Using only one prior case when the step needs several",
          text: "In the prime-factorization proof above, $n=ab$ splits into *two* smaller pieces, $a$ and $b$, and the argument needs the hypothesis at both. An attempted ordinary-induction proof that only assumes $P(n-1)$ has nothing to say about $a$ or $b$ specifically (neither is necessarily $n-1$) and stalls. That mismatch — a step that branches into multiple smaller sub-cases — is the tell that strong induction, not ordinary induction, is the right tool.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Writing a strong-induction step but only actually using $P(k)$, the single most recent case — that's ordinary induction wearing strong induction's clothes, harmless but a sign the wrong base cases may have been set up.",
            "Failing to check *all* the base cases a step's reach requires (the postage problem needs three, not one).",
            "Assuming strong induction proves a strictly larger class of theorems than ordinary induction — the two principles are equivalent.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Levin, Discrete Mathematics: An Open Introduction", locator: "Ch. 3.7, \"Strong Induction\"" },
    { source: "Lehman, Leighton & Meyer, MIT 6.042J Mathematics for Computer Science", locator: "Ch. 2.3, \"Strong Induction\"" },
    { source: "Rosen, Discrete Mathematics and Its Applications", locator: "§5.2, \"Strong Induction and Well-Ordering\"" },
  ],
};
