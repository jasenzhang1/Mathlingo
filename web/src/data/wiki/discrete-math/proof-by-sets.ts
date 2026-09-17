import type { WikiArticle } from "../types";

export const proofBySets: WikiArticle = {
  conceptId: "proof-by-sets",
  summary:
    "Two sets are equal exactly when they contain the same elements — no more, no less. Double inclusion turns that single idea into a reusable proof technique: show $A \\subseteq B$ and $B \\subseteq A$ separately, each by the ordinary direct-proof pattern of chasing an arbitrary element. It looks like a set-theory trick, but it is really `direct-proof` applied twice, and it is the template behind almost every set-identity proof in the curriculum.",
  sections: [
    {
      heading: "The method",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Double inclusion",
              description:
                "To prove $A = B$: show (1) $A \\subseteq B$ and (2) $B \\subseteq A$. Since $A = B$ means \"same elements,\" and each inclusion rules out one direction of mismatch, both together force equality.",
            },
            {
              term: "Element-chasing",
              description:
                "The technique for proving $A \\subseteq B$: let $x$ be an *arbitrary* element of $A$ (not a specific one), and derive that $x \\in B$ using only the definitions of $A$ and $B$.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "It's a direct proof about an implication",
          text: "Proving $A \\subseteq B$ is proving the implication \"$x \\in A \\implies x \\in B$\" for an arbitrary $x$ — exactly the shape `direct-proof` teaches: assume the hypothesis, derive the conclusion. Double inclusion for $A=B$ is just two such implications, run in opposite directions.",
        },
      ],
    },
    {
      heading: "Worked example: A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)",
      blocks: [
        {
          kind: "prose",
          text: "This is the distributive law of intersection over union — genuinely true for all sets A, B, C, and proved here in full rather than merely stated.",
        },
        {
          kind: "example",
          title: "Direction 1: A ∩ (B ∪ C) ⊆ (A ∩ B) ∪ (A ∩ C)",
          problem: "Let x ∈ A ∩ (B ∪ C). Show x ∈ (A ∩ B) ∪ (A ∩ C).",
          steps: [
            "x ∈ A ∩ (B∪C) means x ∈ A, and x ∈ B or x ∈ C.",
            "Case x ∈ B: then x ∈ A and x ∈ B, so x ∈ A∩B, so x ∈ (A∩B)∪(A∩C).",
            "Case x ∈ C: then x ∈ A and x ∈ C, so x ∈ A∩C, so x ∈ (A∩B)∪(A∩C).",
            "Either case lands in (A∩B)∪(A∩C), so the inclusion holds.",
          ],
          answer: "A ∩ (B∪C) ⊆ (A∩B) ∪ (A∩C).",
        },
        {
          kind: "example",
          title: "Direction 2: (A ∩ B) ∪ (A ∩ C) ⊆ A ∩ (B ∪ C)",
          problem: "Let x ∈ (A ∩ B) ∪ (A ∩ C). Show x ∈ A ∩ (B ∪ C).",
          steps: [
            "x ∈ (A∩B)∪(A∩C) means x ∈ A∩B or x ∈ A∩C.",
            "Case x ∈ A∩B: then x ∈ A and x ∈ B, so x ∈ B∪C, so x ∈ A∩(B∪C).",
            "Case x ∈ A∩C: then x ∈ A and x ∈ C, so x ∈ B∪C, so x ∈ A∩(B∪C).",
            "Either case lands in A∩(B∪C), so the inclusion holds.",
          ],
          answer: "(A∩B) ∪ (A∩C) ⊆ A ∩ (B∪C). Combined with Direction 1: the sets are equal.",
        },
        {
          kind: "formula",
          latex: "A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)",
          caption: "Established by double inclusion, both directions shown above.",
        },
      ],
    },
    {
      heading: "When to reach for double inclusion vs. named set laws",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "A short chain of already-known identities (De Morgan, distributivity, absorption) is usually faster once those laws are established — that's an *algebraic* proof, not element-chasing.",
            "Double inclusion is the fallback that always works, especially for identities involving quantifiers, indexed unions, or anything not yet on the list of named laws.",
            "The two are not in competition: the named laws (like the one proved above) are themselves *established* by double inclusion the first time, then reused algebraically afterward.",
          ],
        },
      ],
    },
    {
      heading: "Where this goes wrong",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Proving only one direction",
          text: "By far the most common error: chasing an element through $A \\subseteq B$, feeling done, and declaring $A = B$. One inclusion only rules out elements of $A$ missing from $B$ — it says nothing about whether $B$ might have *extra* elements not in $A$. Both directions are required, with no exceptions.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Starting the proof from \"let x ∈ A ∩ B\" instead of an arbitrary x ∈ A — this smuggles in membership in B that hasn't been earned yet.",
            "Splitting on an \"or\" (as in x ∈ B ∪ C) and only following through one of the two cases.",
            "Picking a specific numerical example, verifying the identity there, and treating that as a proof for all sets — a single instance is evidence, never a proof.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Levin, Discrete Mathematics: An Open Introduction", locator: "Ch. 0 (Sets, Proof techniques)" },
    { source: "Rosen, Discrete Mathematics and Its Applications", locator: "§1.8 (Proof Methods), §2.2 (Set Operations)" },
    { source: "MIT 6.042J, Mathematics for Computer Science", locator: "Ch. 4 (Sets)" },
  ],
};
