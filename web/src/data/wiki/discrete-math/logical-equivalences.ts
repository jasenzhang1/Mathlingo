import type { WikiArticle } from "../types";

export const logicalEquivalences: WikiArticle = {
  conceptId: "logical-equivalences",
  summary:
    "Two propositions can look completely different and still mean exactly the same thing. De Morgan's laws convert between $\\vee$ and $\\wedge$ through negation; the contrapositive rewrites an if-then statement into an equivalent one running the opposite direction; and negating a quantified statement flips $\\forall$ to $\\exists$ (or back) while negating what's inside. These are the rewriting rules theorem statements are built and dismantled with.",
  sections: [
    {
      heading: "De Morgan's laws",
      blocks: [
        {
          kind: "formula",
          latex: "\\neg(p \\wedge q) \\equiv \\neg p \\vee \\neg q, \\qquad \\neg(p \\vee q) \\equiv \\neg p \\wedge \\neg q",
          caption: "De Morgan's laws for propositions",
        },
        {
          kind: "prose",
          text: "In words: \"not (p and q)\" means at least one of them fails; \"not (p or q)\" means both fail. The connective flips every time a negation is pushed through it.",
        },
      ],
    },
    {
      heading: "The conditional family",
      blocks: [
        {
          kind: "table",
          headers: ["Name", "Form", "Equivalent to $p \\to q$?"],
          rows: [
            ["Conditional", "$p \\to q$", "—"],
            ["Converse", "$q \\to p$", "No"],
            ["Inverse", "$\\neg p \\to \\neg q$", "No"],
            ["Contrapositive", "$\\neg q \\to \\neg p$", "Yes"],
          ],
          caption:
            "Only the contrapositive is logically equivalent to the original. The converse and inverse are, in fact, equivalent to *each other* (each is the contrapositive of the other), but not to $p \\to q$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why the contrapositive survives and the converse doesn't",
          text: "$p \\to q$ fails only at $(p{=}T, q{=}F)$. Swapping to $\\neg q \\to \\neg p$ asks the same question from the opposite direction and fails at exactly that same row. The converse $q \\to p$ instead fails at $(p{=}T, q{=}F)$'s partner row $(p{=}F,q{=}T)$ turned around — a genuinely different row — which is why it can diverge from the original.",
        },
      ],
    },
    {
      heading: "Negating quantifiers",
      blocks: [
        {
          kind: "formula",
          latex: "\\neg \\big(\\forall x\\, P(x)\\big) \\equiv \\exists x\\, \\neg P(x), \\qquad \\neg \\big(\\exists x\\, P(x)\\big) \\equiv \\forall x\\, \\neg P(x)",
          caption: "Negating a quantified statement",
        },
        {
          kind: "prose",
          text: "\"Not every $x$ has property $P$\" means \"some $x$ fails to have $P$\" — the quantifier flips and the negation moves inside. This is the single most common step in setting up a proof by contradiction of a $\\forall$-statement.",
        },
        {
          kind: "example",
          title: "Negating a compound statement",
          problem: "Negate: \"Every student passed the exam, and no student cheated.\"",
          steps: [
            "Write it symbolically: $(\\forall x\\, \\text{Passed}(x)) \\wedge (\\forall x\\, \\neg\\text{Cheated}(x))$.",
            "Negate with De Morgan's: $\\neg(\\forall x\\, \\text{Passed}(x)) \\vee \\neg(\\forall x\\, \\neg\\text{Cheated}(x))$.",
            "Push each negation through its quantifier: $(\\exists x\\, \\neg\\text{Passed}(x)) \\vee (\\exists x\\, \\text{Cheated}(x))$.",
          ],
          answer: "\"Some student did not pass, or some student cheated.\"",
        },
      ],
    },
    {
      heading: "Where this goes wrong",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "The converse is not a free equivalence",
          text: "\"If it's raining, the ground is wet\" does not license \"if the ground is wet, it's raining\" — a sprinkler could be running. Treating $p \\to q$ and $q \\to p$ as interchangeable is one of the most common logical errors in informal argument, and it is exactly the mistake proving the contrapositive is designed to avoid.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Negating $\\forall x\\, P(x)$ as $\\forall x\\, \\neg P(x)$ instead of flipping to $\\exists$.",
            "Applying De Morgan's laws to $p \\to q$ directly, instead of first rewriting it as $\\neg p \\vee q$.",
            "Assuming the inverse $\\neg p \\to \\neg q$ is equivalent to $p \\to q$ — it is only equivalent to the converse.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Levin, Discrete Mathematics: An Open Introduction", locator: "Ch. 3.2–3.3, \"Logical Equivalences\" and \"Quantifiers\"" },
    { source: "Lehman, Leighton & Meyer, MIT 6.042J Mathematics for Computer Science", locator: "Ch. 1.2, \"The Well Ordering Principle\" (propositional background)" },
    { source: "Rosen, Discrete Mathematics and Its Applications", locator: "§1.3–1.4, \"Propositional Equivalences\" and \"Predicates and Quantifiers\"" },
  ],
};
