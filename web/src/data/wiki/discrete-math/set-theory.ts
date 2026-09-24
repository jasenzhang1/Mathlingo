import type { WikiArticle } from "../types";

export const setTheory: WikiArticle = {
  conceptId: "set-theory",
  summary:
    "Probability is built on sets. An experiment's possible outcomes form a sample space, an event is a subset of it, and the words we use for combining events — *and*, *or*, *not* — are exactly intersection, union, and complement. Getting fluent with these operations now means later results read as statements about sets rather than as formulas to memorise.",
  sections: [
    {
      heading: "Sample spaces, outcomes, events",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Sample space $\\Omega$",
              description:
                "The set of every outcome the experiment could produce. Rolling a die gives $\\Omega = \\{1,2,3,4,5,6\\}$; measuring a waiting time gives $\\Omega = [0, \\infty)$.",
            },
            {
              term: "Outcome $\\omega$",
              description:
                "A single element of $\\Omega$ — one complete result, with nothing left undetermined.",
            },
            {
              term: "Event $A$",
              description:
                "Any subset $A \\subseteq \\Omega$. \"The roll is even\" is the event $\\{2,4,6\\}$. An event *occurs* when the realised outcome lies in it.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why events are sets, not sentences",
          text: "\"The roll is even\" and \"the roll is 2, 4, or 6\" are different sentences describing the same subset. Treating events as sets means the mathematics cannot tell them apart — which is what we want, because probability should depend on which outcomes an event contains, never on how it was phrased.",
        },
      ],
    },
    {
      heading: "The operations",
      blocks: [
        {
          kind: "table",
          headers: ["Set notation", "Reads as", "Occurs when"],
          rows: [
            ["$A \\cup B$", "$A$ or $B$", "at least one of them occurs (inclusive or)"],
            ["$A \\cap B$", "$A$ and $B$", "both occur"],
            ["$A^{c}$", "not $A$", "$A$ does not occur"],
            ["$A \\setminus B$", "$A$ but not $B$", "$A$ occurs and $B$ does not"],
            ["$A \\subseteq B$", "$A$ implies $B$", "$A$ cannot occur without $B$ occurring"],
            ["$A \\cap B = \\varnothing$", "$A$, $B$ disjoint", "they cannot both occur"],
          ],
          caption:
            "The union is always inclusive. Everyday \"or\" is often exclusive — \"tea or coffee\" — and that mismatch is a common early source of error.",
        },
        {
          kind: "prose",
          text: "Two identities do most of the work later, and both are worth being able to state without looking them up. De Morgan's laws convert between unions and intersections through complementation:",
        },
        {
          kind: "formula",
          latex: "(A \\cup B)^{c} = A^{c} \\cap B^{c}, \\qquad (A \\cap B)^{c} = A^{c} \\cup B^{c}",
          caption: "De Morgan's laws",
        },
        {
          kind: "prose",
          text: "In words: *not (A or B)* means neither happened; *not (A and B)* means at least one failed to happen. These are the reason \"at least one\" problems are almost always easier through the complement — computing $1 - P(\\text{none})$ instead of summing over the many ways one or more could occur.",
        },
      ],
    },
    {
      heading: "Partitions",
      blocks: [
        {
          kind: "prose",
          text: "A collection of events $A_1, A_2, \\ldots$ partitions $\\Omega$ when they are pairwise disjoint and together cover everything. Exactly one of them occurs, whatever happens.",
        },
        {
          kind: "formula",
          latex: "A_i \\cap A_j = \\varnothing \\ (i \\neq j), \\qquad \\bigcup_{i} A_i = \\Omega",
          caption: "The two conditions defining a partition",
        },
        {
          kind: "prose",
          text: "This is the structural idea behind the law of total probability and Bayes' rule. Both work by splitting a complicated event along a partition, handling each piece separately, and adding up — which is only valid because the pieces do not overlap and nothing is left out.",
        },
        {
          kind: "example",
          title: "Worked example",
          problem:
            "Of 100 students, 60 take statistics, 45 take linear algebra, and 25 take both. How many take at least one? How many take neither?",
          steps: [
            "Let $S$ and $L$ be the two events. We want $|S \\cup L|$.",
            "Adding $|S| + |L| = 60 + 45 = 105$ counts the 25 students in both twice.",
            "Subtract the overlap once: $|S \\cup L| = 60 + 45 - 25 = 80$.",
            "\"Neither\" is the complement: $100 - 80 = 20$.",
          ],
          answer: "$80$ take at least one; $20$ take neither.",
        },
      ],
    },
    {
      heading: "Where this goes wrong",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Disjoint is not independent",
          text: "These are opposite ideas that beginners routinely merge. Disjoint events cannot both happen, so learning that one occurred tells you the other did not — that is maximal dependence, not independence. Two events with positive probability can never be both disjoint and independent.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Reading $\\cup$ as exclusive or, and so forgetting to subtract the overlap.",
            "Treating $A \\subseteq B$ as $A = B$ — implication runs one way only.",
            "Assuming $\\Omega$ is finite. Waiting times, measurements, and limits all need infinite sample spaces, which is what forces the machinery of the next concept.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 1.2–1.3" },
    { source: "Casella & Berger, Statistical Inference", locator: "§1.1" },
    { source: "Mathlingo assessment bank", locator: "assessments/foundations-of-probability.md" },
  ],
};
