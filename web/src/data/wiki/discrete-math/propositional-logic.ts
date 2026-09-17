import type { WikiArticle } from "../types";

export const propositionalLogic: WikiArticle = {
  conceptId: "propositional-logic",
  summary:
    "Proofs are built out of propositions — declarative sentences that are true or false, never both — combined with a handful of connectives: not, and, or, if-then, and iff. Every later proof technique is really just a disciplined way of manipulating these connectives, so getting their truth-table meanings exactly right now is what makes every subsequent argument trustworthy.",
  sections: [
    {
      heading: "Propositions and connectives",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Proposition",
              description:
                "A declarative sentence with a definite truth value — true or false, and never both. \"7 is prime\" is a proposition (true); \"close the door\" is not a proposition at all, since it has no truth value.",
            },
            {
              term: "Negation $\\neg p$",
              description: "\"Not $p$.\" True exactly when $p$ is false.",
            },
            {
              term: "Conjunction $p \\wedge q$",
              description: "\"$p$ and $q$.\" True only when both $p$ and $q$ are true.",
            },
            {
              term: "Disjunction $p \\vee q$",
              description: "\"$p$ or $q$.\" True when at least one of $p$, $q$ is true — this is the *inclusive* or.",
            },
            {
              term: "Conditional $p \\to q$",
              description: "\"If $p$ then $q$.\" False only in the single case where $p$ is true and $q$ is false.",
            },
            {
              term: "Biconditional $p \\leftrightarrow q$",
              description: "\"$p$ if and only if $q$.\" True exactly when $p$ and $q$ have the same truth value.",
            },
          ],
        },
      ],
    },
    {
      heading: "Truth tables",
      blocks: [
        {
          kind: "table",
          headers: ["$p$", "$q$", "$p \\wedge q$", "$p \\vee q$", "$p \\to q$", "$p \\leftrightarrow q$"],
          rows: [
            ["T", "T", "T", "T", "T", "T"],
            ["T", "F", "F", "T", "F", "F"],
            ["F", "T", "F", "T", "T", "F"],
            ["F", "F", "F", "F", "T", "T"],
          ],
          caption:
            "Every compound proposition's truth table has $2^{n}$ rows for $n$ propositional variables — one row per assignment of T/F to each variable.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why $p \\to q$ is true when $p$ is false",
          text: "\"If it rains, the game is cancelled\" is not broken just because it didn't rain — it says nothing at all about what happens then, so it can't be caught in a lie. A conditional is only *falsified* by the one case its hypothesis explicitly rules out: $p$ true, $q$ false. Every other row gets a pass by default, which is what \"vacuously true\" means.",
        },
        {
          kind: "prose",
          text: "The conditional and biconditional are not independent primitives — both can be rewritten using only $\\neg$, $\\wedge$, $\\vee$:",
        },
        {
          kind: "formula",
          latex: "p \\to q \\equiv \\neg p \\vee q, \\qquad p \\leftrightarrow q \\equiv (p \\to q) \\wedge (q \\to p)",
          caption: "The conditional and biconditional, expanded",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Evaluating a compound proposition",
          problem: "Let $p$ = \"5 is odd\" (true) and $q$ = \"5 is prime\" (true). Evaluate $\\neg p \\vee (q \\wedge \\neg p)$.",
          steps: [
            "$p$ is true, so $\\neg p$ is false.",
            "$q$ is true and $\\neg p$ is false, so $q \\wedge \\neg p$ is false.",
            "$\\neg p \\vee (q \\wedge \\neg p)$ is false $\\vee$ false.",
          ],
          answer: "False.",
        },
      ],
    },
    {
      heading: "Where this goes wrong",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "\"Or\" in logic is always inclusive",
          text: "Everyday English often uses \"or\" exclusively — \"soup or salad\" usually means not both. Logic's $\\vee$ never does; $p \\vee q$ is true even when both $p$ and $q$ are true. Reading a disjunction as exclusive is a standing source of truth-table errors.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Treating $p \\to q$ as false whenever $p$ is false — it's the opposite: a false $p$ makes the whole conditional true automatically.",
            "Confusing $p \\to q$ with $q \\to p$ (the converse) — these are different propositions with different truth tables, covered in the next concept.",
            "Forgetting that a proposition needs a definite truth value at all — questions, commands, and vague claims (\"this sentence is interesting\") aren't propositions.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Levin, Discrete Mathematics: An Open Introduction", locator: "Ch. 3.1, \"Propositional Logic\"" },
    { source: "Lehman, Leighton & Meyer, MIT 6.042J Mathematics for Computer Science", locator: "Ch. 1, \"What is a Proof?\"" },
    { source: "Rosen, Discrete Mathematics and Its Applications", locator: "§1.1, \"Propositional Logic\"" },
  ],
};
