import type { WikiArticle } from "../types";

export const chineseRemainderTheorem: WikiArticle = {
  conceptId: "chinese-remainder-theorem",
  summary:
    "The Chinese remainder theorem (CRT) says that a system of congruences with pairwise coprime moduli always has a solution, and that solution is unique modulo the product of the moduli — so knowing x's remainder mod several small numbers pins it down mod their product just as precisely as knowing it directly.",
  sections: [
    {
      heading: "The theorem",
      blocks: [
        {
          kind: "formula",
          latex: "x \\equiv a_1 \\pmod{n_1}, \\ \\ x \\equiv a_2 \\pmod{n_2}, \\ \\ \\ldots, \\ \\ x \\equiv a_k \\pmod{n_k}",
          caption: "With n₁, …, nₖ pairwise coprime, this system has a solution x, unique modulo N = n₁n₂⋯nₖ.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Pairwise coprime is doing the real work",
          text: "If two moduli shared a common factor, their congruences could contradict each other (e.g. x ≡ 1 mod 4 and x ≡ 0 mod 2 already conflict) or leave redundant information. Pairwise coprimality guarantees every combination of remainders is simultaneously achievable.",
        },
      ],
    },
    {
      heading: "Constructing the solution",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Let N = n₁n₂⋯nₖ, and for each i let Nᵢ = N / nᵢ (the product of all moduli except nᵢ).",
            "Since nᵢ is coprime to Nᵢ, find the modular inverse Mᵢ = Nᵢ⁻¹ (mod nᵢ).",
            "The solution is x = Σ aᵢ Nᵢ Mᵢ, reduced mod N.",
          ],
        },
        {
          kind: "prose",
          text: "The trick is that each term aᵢNᵢMᵢ is built to be ≡ aᵢ (mod nᵢ) while being ≡ 0 (mod nⱼ) for every other j — since Nᵢ already carries a factor of nⱼ for j≠i. Summing the terms lets each congruence 'pick out' its own contribution and ignore the rest.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Solving a small system",
          problem: "Find x with x ≡ 2 (mod 3) and x ≡ 3 (mod 5).",
          steps: [
            "N = 3×5 = 15. N₁ = 15/3 = 5, N₂ = 15/5 = 3.",
            "Find M₁ = 5⁻¹ mod 3: 5 ≡ 2 (mod 3), and 2×2=4≡1 (mod 3), so M₁ = 2.",
            "Find M₂ = 3⁻¹ mod 5: 3×2=6≡1 (mod 5), so M₂ = 2.",
            "x = a₁N₁M₁ + a₂N₂M₂ = 2×5×2 + 3×3×2 = 20 + 18 = 38 ≡ 8 (mod 15).",
            "Check: 8 mod 3 = 2 ✓. 8 mod 5 = 3 ✓.",
          ],
          answer: "x ≡ 8 (mod 15). `[verified: 8 mod 3=2, 8 mod 5=3]`",
        },
      ],
    },
    {
      heading: "Where CRT reasoning goes wrong",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Non-coprime moduli need a compatibility check first",
          text: "When moduli aren't pairwise coprime, CRT in its basic form doesn't apply directly — a solution exists only if the congruences agree on the shared factors (e.g. x ≡ 1 mod 4 and x ≡ 3 mod 6 are incompatible since both constrain x mod 2 differently: 1 mod 2 vs 1 mod 2 — here they'd actually agree; but x ≡ 0 mod 4 and x ≡ 1 mod 6 disagree mod 2 and have no solution).",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Forgetting the final answer is a residue class mod N = n₁⋯nₖ, not a single integer — infinitely many integers satisfy the system, all congruent to each other mod N.",
            "Mixing up Nᵢ (product of the *other* moduli) with nᵢ itself when computing the modular inverse — the inverse needed is of Nᵢ mod nᵢ, not of nᵢ.",
            "Skipping the verification step — plugging the constructed x back into every original congruence is cheap insurance against an arithmetic slip in the Nᵢ, Mᵢ computation.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Rosen, Discrete Mathematics and Its Applications, 7th ed.", locator: "§4.5" },
    { source: "Levin, Discrete Mathematics: An Open Introduction", locator: "Ch. 8 (Number Theory)" },
    { source: "MIT 6.042J Mathematics for Computer Science", locator: "Ch. 8 (Number Theory)" },
  ],
};
