import type { WikiArticle } from "../types";

export const modularInverses: WikiArticle = {
  conceptId: "modular-inverses",
  summary:
    "Ordinary division has no direct analogue mod n, but multiplying by a modular inverse plays the same role: a⁻¹ mod n is the number that turns a × a⁻¹ back into 1. It exists exactly when a and n share no common factor, and the extended Euclidean algorithm hands it over directly.",
  sections: [
    {
      heading: "Definitions",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Modular inverse of a mod n",
              description: "An integer x such that ax ≡ 1 (mod n), written a⁻¹.",
            },
          ],
        },
        {
          kind: "formula",
          latex: "a^{-1} \\ \\text{exists mod } n \\iff \\gcd(a, n) = 1",
          caption: "An inverse mod n exists exactly when a and n are coprime — and it is unique mod n when it does.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Bézout supplies the inverse",
          text: "Bézout's identity gives ax + ny = gcd(a,n). When gcd(a,n) = 1, this reads ax + ny = 1, i.e. ax ≡ 1 (mod n) after dropping the ny term (a multiple of n vanishes mod n). That x is exactly a⁻¹ — the extended Euclidean algorithm finds it in the same pass that finds the gcd.",
        },
      ],
    },
    {
      heading: "Worked examples",
      blocks: [
        {
          kind: "example",
          title: "Finding an inverse via extended Euclidean",
          problem: "Find 3⁻¹ mod 11.",
          steps: [
            "Run Euclidean algorithm: 11 = 3×3 + 2, then 3 = 2×1 + 1, then 2 = 1×2 + 0. gcd(3,11)=1, so an inverse exists.",
            "Back-substitute: 1 = 3 − 2×1.",
            "Substitute 2 = 11 − 3×3: 1 = 3 − (11 − 3×3) = 3×4 − 11×1.",
            "So 3×4 ≡ 1 (mod 11): the inverse is 4.",
            "Check: 3×4 = 12 = 11 + 1 ≡ 1 (mod 11). ✓",
          ],
          answer: "3⁻¹ ≡ 4 (mod 11). `[verified: 3×4=12≡1 (mod 11)]`",
        },
        {
          kind: "example",
          title: "Recognizing when no inverse exists",
          problem: "Does 6 have an inverse mod 8?",
          steps: [
            "Compute gcd(6, 8): 8 = 6×1 + 2, 6 = 2×3 + 0, so gcd(6,8) = 2.",
            "Since gcd(6,8) = 2 ≠ 1, 6 and 8 are not coprime.",
            "No modular inverse of 6 exists mod 8.",
          ],
          answer: "No inverse exists, since gcd(6,8) = 2 ≠ 1. `[verified: 8=6×1+2, 6=2×3+0, gcd=2]`",
        },
      ],
    },
    {
      heading: "Where modular inverse reasoning goes wrong",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "\"Divide both sides\" needs the inverse to exist first",
          text: "Solving ax ≡ b (mod n) by \"dividing by a\" is really multiplying both sides by a⁻¹ — and that step is only legal once gcd(a,n)=1 is checked. Skipping the check can silently produce a wrong or incomplete answer when a and n share a factor.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Assuming every nonzero number has an inverse mod n — only true when n is prime; for composite n, any a sharing a factor with n has none.",
            "Mixing up a⁻¹ mod n with 1/a as a real number — they're unrelated except in name; a⁻¹ is an integer in {0,…,n−1} satisfying a specific congruence.",
            "Forgetting that the inverse is only unique modulo n — 4 and 4+11=15 are both valid representatives of 3⁻¹ mod 11.",
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
