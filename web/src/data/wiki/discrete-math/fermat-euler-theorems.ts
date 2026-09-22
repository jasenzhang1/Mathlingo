import type { WikiArticle } from "../types";

export const fermatEulerTheorems: WikiArticle = {
  conceptId: "fermat-euler-theorems",
  summary:
    "Fermat's little theorem says that raising any number to the (p−1)th power mod a prime p always lands on 1 — a strikingly rigid pattern with no obvious reason to hold. Euler's theorem generalizes it to any modulus, replacing p−1 with the totient function φ(n), and together they're the engine behind fast modular exponentiation and RSA encryption.",
  sections: [
    {
      heading: "Fermat's little theorem",
      blocks: [
        {
          kind: "formula",
          latex: "a^{p-1} \\equiv 1 \\pmod{p} \\quad \\text{whenever } p \\text{ is prime and } p \\nmid a",
          caption: "Equivalently, aᵖ ≡ a (mod p) for every integer a, prime or not.",
        },
        {
          kind: "prose",
          text: "The condition p ∤ a matters: if p divides a, then a ≡ 0 (mod p), and 0^(p−1) ≡ 0, not 1. The theorem is specifically about the p−1 nonzero residues mod p, which turn out to permute among themselves under multiplication by a.",
        },
      ],
    },
    {
      heading: "Euler's theorem and the totient",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Euler's totient φ(n)",
              description: "The number of integers in {1, …, n} that are coprime to n.",
            },
          ],
        },
        {
          kind: "formula",
          latex: "a^{\\varphi(n)} \\equiv 1 \\pmod{n} \\quad \\text{whenever } \\gcd(a, n) = 1",
          caption: "Euler's theorem — Fermat's little theorem is the special case n = p prime, where φ(p) = p − 1.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "φ is multiplicative and easy to compute from a factorization",
          text: "For a prime p, φ(p) = p − 1. For a prime power, φ(pᵏ) = pᵏ − pᵏ⁻¹. And φ(mn) = φ(m)φ(n) whenever m, n are coprime — so φ(n) is computed directly from n's prime factorization, without checking coprimality against every integer up to n.",
        },
      ],
    },
    {
      heading: "Worked examples",
      blocks: [
        {
          kind: "example",
          title: "Applying Fermat's little theorem",
          problem: "Compute 3^100 mod 7.",
          steps: [
            "7 is prime and 7 ∤ 3, so by Fermat's little theorem, 3^6 ≡ 1 (mod 7).",
            "Write 100 = 6×16 + 4, so 3^100 = (3^6)^16 × 3^4 ≡ 1^16 × 3^4 (mod 7).",
            "3^4 = 81 = 7×11 + 4, so 3^4 ≡ 4 (mod 7).",
          ],
          answer: "3^100 ≡ 4 (mod 7). `[verified: 100=6×16+4, 3^4=81=7×11+4]`",
        },
        {
          kind: "example",
          title: "Computing φ(n) from a factorization",
          problem: "Compute φ(12).",
          steps: [
            "Factor: 12 = 2² × 3.",
            "φ(2²) = 2² − 2¹ = 4 − 2 = 2.",
            "φ(3) = 3 − 1 = 2.",
            "φ(12) = φ(2²) × φ(3) = 2 × 2 = 4 (2² and 3 are coprime, so multiplicativity applies).",
            "Check directly: integers in {1,…,12} coprime to 12 are {1, 5, 7, 11} — exactly 4 of them. ✓",
          ],
          answer: "φ(12) = 4. `[verified: {1,5,7,11} are the 4 integers ≤12 coprime to 12]`",
        },
      ],
    },
    {
      heading: "Where these theorems go wrong",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Both theorems require a coprimality condition",
          text: "Fermat's little theorem needs p ∤ a; Euler's theorem needs gcd(a,n) = 1. Applying either formula to a value sharing a factor with the modulus gives a false conclusion — e.g. 2^φ(4) = 2² = 4 ≢ 1 (mod 4), because gcd(2,4) = 2 ≠ 1.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Using p − 1 as the exponent when the modulus isn't actually prime — that's specifically Fermat's special case; a composite modulus needs φ(n), not n − 1.",
            "Computing φ(n) by counting one-by-one for large n instead of factoring — multiplicativity makes it fast, brute-force checking does not.",
            "Forgetting Fermat's theorem only pins down a^(p−1); an intermediate exponent like a^((p−1)/2) has its own separate meaning (Euler's criterion, for quadratic residues) and isn't automatically 1.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Rosen, Discrete Mathematics and Its Applications, 7th ed.", locator: "§4.4" },
    { source: "Levin, Discrete Mathematics: An Open Introduction", locator: "Ch. 8 (Number Theory)" },
    { source: "MIT 6.042J Mathematics for Computer Science", locator: "Ch. 8 (Number Theory)" },
  ],
};
