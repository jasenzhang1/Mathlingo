import type { WikiArticle } from "../types";

export const equivalenceRelations: WikiArticle = {
  conceptId: "equivalence-relations",
  summary:
    "An equivalence relation is what \"the same, for the purpose at hand\" means made precise: reflexive, symmetric, and transitive. Every equivalence relation splits its set into equivalence classes that partition it — no overlaps, nothing left over — and that partition is the mechanism behind constructions as different as mod-n arithmetic and the rational numbers themselves.",
  sections: [
    {
      heading: "The three properties",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Reflexive",
              description: "$a \\sim a$ for every $a$ in the set — everything is related to itself.",
            },
            {
              term: "Symmetric",
              description: "$a \\sim b \\implies b \\sim a$ — the relation doesn't care about order.",
            },
            {
              term: "Transitive",
              description: "$a \\sim b$ and $b \\sim c \\implies a \\sim c$ — relatedness chains.",
            },
            {
              term: "Equivalence relation",
              description: "A relation satisfying all three properties at once.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "All three, or it doesn't count",
          text: "≤ on the integers is reflexive and transitive, but not symmetric ($3 \\le 5$ does not give $5 \\le 3$) — so ≤ is not an equivalence relation, even though two of the three properties hold. Missing even one property disqualifies the whole thing.",
        },
      ],
    },
    {
      heading: "Equivalence classes and partitions",
      blocks: [
        {
          kind: "prose",
          text: "The equivalence class of $a$, written $[a]$, is the set of everything related to $a$: $[a] = \\{x : x \\sim a\\}$. The central fact is that these classes partition the whole set — every element belongs to exactly one class.",
        },
        {
          kind: "formula",
          latex: "\\bigcup_i [a_i] = S, \\qquad [a_i] \\cap [a_j] = \\varnothing \\text{ whenever } [a_i] \\neq [a_j]",
          caption: "The two conditions of a partition, delivered automatically by any equivalence relation.",
        },
        {
          kind: "example",
          title: "Worked example: congruence mod 3",
          problem: "Partition {0,1,2,3,4,5,6,7} under \"congruent mod 3.\"",
          steps: [
            "Group by remainder on division by 3.",
            "Remainder 0: {0, 3, 6}.",
            "Remainder 1: {1, 4, 7}.",
            "Remainder 2: {2, 5}.",
            "Check: the three groups are disjoint and their union is {0,...,7} — 3 + 3 + 2 = 8 elements accounted for.",
          ],
          answer: "[0] = {0,3,6}, [1] = {1,4,7}, [2] = {2,5} — a valid 3-block partition.",
        },
      ],
    },
    {
      heading: "Proving congruence mod n is an equivalence relation",
      blocks: [
        {
          kind: "prose",
          text: "\"$a \\equiv b \\pmod n$\" means $n \\mid (a-b)$. All three properties follow directly from that definition.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Reflexive: $n \\mid (a - a) = 0$ — true for every $a$, since $n$ divides $0$.",
            "Symmetric: if $n \\mid (a-b)$, write $a - b = kn$; then $b - a = (-k)n$, so $n \\mid (b-a)$.",
            "Transitive: if $n \\mid (a-b)$ and $n \\mid (b-c)$, write $a-b=kn$, $b-c=mn$; adding, $a-c = (k+m)n$, so $n \\mid (a-c)$.",
          ],
        },
        {
          kind: "prose",
          text: "This is the general template: to show a relation is an equivalence relation, unpack the definition and check the three properties directly against it — the same pattern works for \"same remainder,\" \"same parity,\" \"same image under f,\" and countless others.",
        },
      ],
    },
    {
      heading: "Quotients: representatives that aren't privileged",
      blocks: [
        {
          kind: "callout",
          tone: "insight",
          title: "Rational numbers *are* equivalence classes",
          text: "$\\mathbb{Q}$ is formally built as pairs of integers $(a,b)$, $b \\neq 0$, under $(a,b) \\sim (c,d)$ iff $ad = bc$. The rational number \"$1/2$\" is not the pair $(1,2)$ — it's the whole equivalence class $\\{(1,2), (2,4), (3,6), \\ldots\\}$. That's exactly why $1/2$ and $2/4$ are the same number: they're two representatives of one class, and neither is more correct than the other.",
        },
      ],
    },
    {
      heading: "Where this goes wrong",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "Checking reflexivity and transitivity but skipping symmetry, since it's easy to assume \"related\" is automatically mutual.",
            "Treating one representative of an equivalence class as the \"real\" value and others as merely equal to it — the class itself is the object; every representative names it equally well.",
            "Forgetting to verify both partition conditions (covering everything, and no overlaps) when checking that a proposed grouping actually comes from an equivalence relation.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Levin, Discrete Mathematics: An Open Introduction", locator: "Ch. 0 (Relations)" },
    { source: "Rosen, Discrete Mathematics and Its Applications", locator: "§9.1, §9.5 (Equivalence Relations)" },
    { source: "MIT 6.042J, Mathematics for Computer Science", locator: "Ch. 8 (Relations)" },
  ],
};
