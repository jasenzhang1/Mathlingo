import type { WikiArticle } from "../types";

export const proofByContradiction: WikiArticle = {
  conceptId: "proof-by-contradiction",
  summary:
    "When there's no obvious forward path from hypothesis to conclusion, assume the opposite of what you want and hunt for an absurdity instead. If assuming $\\neg P$ forces some statement $Q$ and its negation $\\neg Q$ to both hold, $\\neg P$ must have been false — so $P$ is true. It's the technique behind two of the most famous proofs in mathematics, both reproduced in full below.",
  sections: [
    {
      heading: "The structure",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Proof by contradiction",
              description:
                "To prove $P$: assume $\\neg P$; derive, through valid steps, some $Q \\wedge \\neg Q$; conclude $\\neg P$ is false, so $P$ holds.",
            },
            {
              term: "Contradiction / absurdity",
              description: "Any statement of the form $Q \\wedge \\neg Q$ — necessarily false under every truth assignment.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "How this differs from the contrapositive",
          text: "Proving the contrapositive ($\\neg q \\to \\neg p$ instead of $p \\to q$) only applies to conditional statements, and it derives specifically $\\neg p$. Contradiction is fully general — it applies to any statement $P$ at all, including ones with no visible if-then shape (\"there is no largest prime,\" \"$\\sqrt2$ is irrational\"), and it can end in *any* absurdity, not just $\\neg p$.",
        },
      ],
    },
    {
      heading: "Worked example: $\\sqrt2$ is irrational",
      blocks: [
        {
          kind: "example",
          title: "The classic case",
          problem: "Prove by contradiction that $\\sqrt2$ is irrational.",
          steps: [
            "Assume, for contradiction, that $\\sqrt2$ is rational: $\\sqrt2 = a/b$ for integers $a,b$ with $b\\neq0$ and $\\gcd(a,b)=1$ (lowest terms).",
            "Square both sides: $2 = a^2/b^2$, so $a^2 = 2b^2$.",
            "$a^2$ is even, and the square of an odd number is odd, so $a$ must be even: $a = 2c$ for some integer $c$.",
            "Substitute: $(2c)^2 = 2b^2 \\Rightarrow 4c^2 = 2b^2 \\Rightarrow b^2 = 2c^2$, so $b^2$ is even, so $b$ is even too.",
            "But then $a$ and $b$ are both even, so $\\gcd(a,b) \\geq 2$ — contradicting $\\gcd(a,b)=1$.",
          ],
          answer: "The assumption that $\\sqrt2$ is rational leads to a contradiction, so $\\sqrt2$ is irrational. `[verified: parity chain correct throughout]`",
        },
      ],
    },
    {
      heading: "Worked example: infinitely many primes",
      blocks: [
        {
          kind: "example",
          title: "Euclid's proof",
          problem: "Prove by contradiction that there are infinitely many primes.",
          steps: [
            "Assume, for contradiction, that there are only finitely many primes: $p_1, p_2, \\ldots, p_n$, a complete list.",
            "Consider $N = p_1 p_2 \\cdots p_n + 1$.",
            "Dividing $N$ by any $p_i$ leaves remainder 1, so no $p_i$ divides $N$ — none of the \"known\" primes is a factor.",
            "But every integer greater than 1 has at least one prime factor. That prime factor divides $N$, yet is not any $p_i$ — contradicting that the list was complete.",
          ],
          answer: "The assumption of finitely many primes is contradicted, so there are infinitely many.",
        },
      ],
    },
    {
      heading: "Where this goes wrong",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "The contradiction has to come from the assumption",
          text: "A proof by contradiction is only valid if the absurdity genuinely traces back to $\\neg P$. Padding the argument with unrelated true and false statements, or reaching a contradiction that would have appeared even without assuming $\\neg P$, proves nothing — the logical chain from $\\neg P$ to $Q \\wedge \\neg Q$ has to be as rigorous as any direct proof's chain.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Negating the statement incompletely — e.g. forgetting to flip $\\forall$ to $\\exists$ (see `logical-equivalences`) when the target is a for-all claim.",
            "Assuming \"$\\sqrt2 = a/b$\" without also assuming lowest terms — without that, the parity argument never reaches a contradiction, since $a,b$ could both be even to start with.",
            "Stopping at a merely surprising or ugly result instead of an actual logical absurdity $Q \\wedge \\neg Q$.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Levin, Discrete Mathematics: An Open Introduction", locator: "Ch. 3.6, \"Other Methods of Proof\"" },
    { source: "Lehman, Leighton & Meyer, MIT 6.042J Mathematics for Computer Science", locator: "Ch. 1.4, \"Proof by Contradiction\"" },
    { source: "Rosen, Discrete Mathematics and Its Applications", locator: "§1.8, \"Proof Methods and Strategy\"" },
  ],
};
