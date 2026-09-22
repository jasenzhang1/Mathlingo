import type { WikiArticle } from "../types";

export const powerSet: WikiArticle = {
  conceptId: "power-set",
  summary:
    "The power set collects *every* subset of a set into one new set — including the empty set and the set itself. It looks like a small definition, but it is the object that makes precise questions like \"how many distinct ways could this be configured\" and it is the first place the exponential $2^n$ shows up honestly, as a count of *subsets* rather than something pulled from a formula sheet.",
  sections: [
    {
      heading: "The definition",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Power set $\\mathcal{P}(S)$",
              description:
                "The set of all subsets of $S$: $\\mathcal{P}(S) = \\{A : A \\subseteq S\\}$. Its *elements* are sets, not the original elements of $S$.",
            },
            {
              term: "$\\varnothing \\in \\mathcal{P}(S)$",
              description: "Always, for any $S$ — the empty set is a subset of every set.",
            },
            {
              term: "$S \\in \\mathcal{P}(S)$",
              description: "Always — a set is a subset of itself.",
            },
          ],
        },
        {
          kind: "example",
          title: "Worked example",
          problem: "List $\\mathcal{P}(S)$ for $S = \\{1, 2, 3\\}$.",
          steps: [
            "Start with $\\varnothing$ — always included.",
            "Every single-element subset: $\\{1\\}, \\{2\\}, \\{3\\}$.",
            "Every two-element subset: $\\{1,2\\}, \\{1,3\\}, \\{2,3\\}$.",
            "The whole set: $\\{1,2,3\\}$.",
          ],
          answer:
            "$\\mathcal{P}(S) = \\{\\varnothing, \\{1\\}, \\{2\\}, \\{3\\}, \\{1,2\\}, \\{1,3\\}, \\{2,3\\}, \\{1,2,3\\}\\}$ — 8 elements.",
        },
      ],
    },
    {
      heading: "Why $|\\mathcal{P}(S)| = 2^n$",
      blocks: [
        {
          kind: "prose",
          text: "The count is not a coincidence to memorize; it comes from a bijection. Fix an ordering of $S$'s $n$ elements. Every subset $A \\subseteq S$ determines, and is determined by, a length-$n$ binary string: position $i$ is $1$ if the $i$-th element of $S$ is in $A$, and $0$ otherwise.",
        },
        {
          kind: "formula",
          latex: "\\mathcal{P}(S) \\;\\longleftrightarrow\\; \\{0,1\\}^n, \\qquad A \\;\\longmapsto\\; (\\mathbf{1}_A(x_1), \\ldots, \\mathbf{1}_A(x_n))",
          caption: "Each subset's indicator string, and back: a string determines a unique subset.",
        },
        {
          kind: "prose",
          text: "This correspondence is one-to-one in both directions — every subset gives exactly one string, and every string picks out exactly one subset — so $|\\mathcal{P}(S)|$ equals the number of length-$n$ binary strings, which is $2^n$ because each of the $n$ positions is an independent binary choice.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The same idea as \"n independent switches\"",
          text: "Reading a subset as a binary string is the same thing as reading it as a setting of $n$ independent on/off switches, one per element. That is exactly why $2^n$ shows up again for boolean feature flags, binary addresses, and truth tables — they're all power sets wearing different clothes.",
        },
      ],
    },
    {
      heading: "Subsets vs. elements",
      blocks: [
        {
          kind: "table",
          headers: ["Statement", "Meaning", "About"],
          rows: [
            ["$x \\in S$", "$x$ is an element of $S$", "membership"],
            ["$A \\subseteq S$", "every element of $A$ is also in $S$", "containment"],
            ["$A \\in \\mathcal{P}(S)$", "$A$ is one of the subsets collected by $\\mathcal{P}(S)$ — same statement as $A \\subseteq S$", "membership, one level up"],
          ],
          caption: "\"$\\in \\mathcal{P}(S)$\" and \"$\\subseteq S$\" say the exact same thing about $A$; the power set is just a device for turning \"is a subset\" into ordinary set membership.",
        },
      ],
    },
    {
      heading: "Where this goes wrong",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Forgetting $\\varnothing$ and $S$ itself",
          text: "The two subsets easiest to forget when listing $\\mathcal{P}(S)$ by hand are the two extremes: the empty set (it has no elements, so it's easy to feel it \"doesn't count\") and $S$ itself (it can feel like cheating to include the whole thing as one of its own subsets). Both belong, every time.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Writing an element of $S$, like $1$, where an element of $\\mathcal{P}(S)$ is required — $1 \\notin \\mathcal{P}(S)$, but $\\{1\\} \\in \\mathcal{P}(S)$.",
            "Asserting $|\\mathcal{P}(S)| = 2^n$ without the bijection — it is easy to state and easy to misremember (e.g. as $n^2$) if it was never actually derived.",
            "Confusing $\\mathcal{P}(S)$, a set of sets, with $S$ itself when checking whether some object is \"in\" it.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Levin, Discrete Mathematics: An Open Introduction", locator: "Ch. 0 (Sets)" },
    { source: "Rosen, Discrete Mathematics and Its Applications", locator: "§2.1–2.2 (Sets, Set Operations)" },
    { source: "MIT 6.042J, Mathematics for Computer Science", locator: "Ch. 4 (Sets)" },
  ],
};
