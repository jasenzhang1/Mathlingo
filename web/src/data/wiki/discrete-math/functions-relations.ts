import type { WikiArticle } from "../types";

export const functionsRelations: WikiArticle = {
  conceptId: "functions-relations",
  summary:
    "A relation is just a subset of a Cartesian product — any collection of pairings between two sets, with no further requirements. A function is the special case where every input is paired with *exactly one* output. Almost everything downstream in this cluster (equivalence relations, injections, cardinality) is a property of one or the other of these two ideas, so getting the definitions — and the one property distinguishing them — solid now pays off repeatedly.",
  sections: [
    {
      heading: "Relations",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Relation from A to B",
              description:
                "Any subset $R \\subseteq A \\times B$. \"$a$ is related to $b$\" means $(a,b) \\in R$.",
            },
            {
              term: "Domain, codomain",
              description:
                "For $f: A \\to B$, $A$ is the *domain* (where inputs live) and $B$ is the *codomain* (the declared space outputs live in — not necessarily all reached).",
            },
            {
              term: "Image / range",
              description:
                "The *actual* set of outputs produced: $\\{f(a) : a \\in A\\} \\subseteq B$. Can be a strict subset of the codomain.",
            },
          ],
        },
        {
          kind: "prose",
          text: "Relations are the general object; functions are relations obeying one extra rule. Every function is a relation, but most relations are not functions.",
        },
      ],
    },
    {
      heading: "What makes a relation a function",
      blocks: [
        {
          kind: "prose",
          text: "$f \\subseteq A \\times B$ is a function exactly when every $a \\in A$ is the first coordinate of *exactly one* pair in $f$ — not zero, not two or more.",
        },
        {
          kind: "formula",
          latex: "\\forall a \\in A,\\ \\exists! \\, b \\in B \\text{ such that } (a,b) \\in f",
          caption: "The defining condition. $\\exists!$ reads \"there exists a unique.\"",
        },
        {
          kind: "example",
          title: "Worked example",
          problem: "f: {1,2,3} → {4,5}. Is R = {(1,4),(1,5),(2,4),(3,5)} a function?",
          steps: [
            "Check element 1: it appears as first coordinate in (1,4) and (1,5) — two different outputs.",
            "This violates \"exactly one output per input\": f(1) would have to be both 4 and 5.",
          ],
          answer: "No — R is a relation, but not a function, because 1 has two images.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "\"Onto\" is a different question entirely",
          text: "Whether every element of B is used (surjectivity) has nothing to do with whether R is a function. R = {(1,4),(2,4),(3,4)} is a perfectly good function — every input has exactly one output — even though 5 ∈ B is never hit. Function-ness is about inputs never being ambiguous; surjectivity is about outputs never being missed. They are covered separately in `injections-surjections-bijections`.",
        },
      ],
    },
    {
      heading: "Relations beyond functions",
      blocks: [
        {
          kind: "table",
          headers: ["Property (relation R on a set)", "Meaning"],
          rows: [
            ["Reflexive", "$a \\mathrel{R} a$ for every $a$"],
            ["Symmetric", "$a \\mathrel{R} b \\implies b \\mathrel{R} a$"],
            ["Transitive", "$a \\mathrel{R} b$ and $b \\mathrel{R} c \\implies a \\mathrel{R} c$"],
          ],
          caption: "These three properties, together, define the equivalence relations of the next concept — none of them require R to be a function at all.",
        },
        {
          kind: "prose",
          text: "A relational database table is exactly a relation in this sense: its rows are a subset of the Cartesian product of its columns' possible values. \"Column Y is functionally dependent on column X\" means the (X-value, Y-value) pairs that actually occur in the table form a function — every X-value that appears is paired with exactly one Y-value.",
        },
      ],
    },
    {
      heading: "Where this goes wrong",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Two arrows out of one input",
          text: "The single most common way a proposed \"function\" turns out not to be one: some input, traced through the rule, produces two different outputs depending on how it's computed. If the rule for f(a) is ever ambiguous, f is not well-defined as a function — no matter how natural the rule looks.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Confusing the codomain (declared target) with the image (actual outputs) — a function into ℝ need not, and often doesn't, hit every real number.",
            "Treating \"every input maps somewhere\" as sufficient, forgetting the uniqueness half of the definition.",
            "Assuming every relation is a function by default — most relations (like ≤, or \"is a friend of\") are not.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Levin, Discrete Mathematics: An Open Introduction", locator: "Ch. 0 (Functions and relations)" },
    { source: "Rosen, Discrete Mathematics and Its Applications", locator: "§2.3 (Functions), Ch. 9.1 (Relations and Their Properties)" },
    { source: "MIT 6.042J, Mathematics for Computer Science", locator: "Ch. 8 (Relations)" },
  ],
};
