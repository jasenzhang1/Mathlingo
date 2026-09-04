import type { WikiArticle } from "../types";

export const conditionalProbability: WikiArticle = {
  conceptId: "conditional-probability",
  summary:
    "Conditioning on $B$ means restricting attention to the outcomes where $B$ happened and renormalising so those outcomes account for all the probability. Nearly every mistake with conditional probability comes from one of two places: forgetting that $P(A \\mid B)$ and $P(B \\mid A)$ are different quantities, or dropping the condition partway through a calculation.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}, \\qquad P(B) > 0",
          caption: "The conditional probability of $A$ given $B$",
        },
        {
          kind: "prose",
          text: "Read the formula geometrically. $B$ becomes the new sample space; $A \\cap B$ is the part of $A$ that survives inside it; dividing by $P(B)$ rescales so the restricted space has total probability 1. The requirement $P(B) > 0$ is not a technicality — conditioning on something impossible has no meaning, and the expression is genuinely undefined.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "$P(\\cdot \\mid B)$ is itself a probability measure",
          text: "Fix $B$ and let $A$ vary: the result satisfies all three Kolmogorov axioms. It is non-negative, $P(\\Omega \\mid B) = P(B)/P(B) = 1$, and it is countably additive because intersecting with $B$ preserves disjointness. So every theorem proved for probability measures applies unchanged to conditional ones — including the complement rule, giving $P(A^{c} \\mid B) = 1 - P(A \\mid B)$.",
        },
      ],
    },
    {
      heading: "The multiplication rule",
      blocks: [
        {
          kind: "prose",
          text: "Rearranging the definition gives the form used to build up probabilities of sequences:",
        },
        {
          kind: "formula",
          latex: "P(A \\cap B) = P(A \\mid B)\\,P(B) = P(B \\mid A)\\,P(A)",
          caption: "The multiplication rule, in both directions",
        },
        {
          kind: "prose",
          text: "Chaining it handles longer sequences, which is how the probability of drawing a specific hand, or of a Markov chain following a given path, is computed:",
        },
        {
          kind: "formula",
          latex: "P(A_1 \\cap \\cdots \\cap A_n) = P(A_1)\\,P(A_2 \\mid A_1)\\,P(A_3 \\mid A_1 \\cap A_2)\\cdots P(A_n \\mid A_1 \\cap \\cdots \\cap A_{n-1})",
          caption: "The chain rule",
        },
      ],
    },
    {
      heading: "Law of total probability",
      blocks: [
        {
          kind: "prose",
          text: "When a partition $B_1, \\ldots, B_n$ splits the sample space, the probability of any event can be assembled from its conditional probabilities on each piece.",
        },
        {
          kind: "formula",
          latex: "P(A) = \\sum_{i=1}^{n} P(A \\mid B_i)\\,P(B_i)",
          caption: "Total probability, for a partition $\\{B_i\\}$ with $P(B_i) > 0$",
        },
        {
          kind: "prose",
          text: "This is a weighted average of conditional probabilities, weighted by how likely each case is. It is the step people skip when they compute $P(A \\mid B)$ for the most salient $B$ and quietly treat it as $P(A)$.",
        },
        {
          kind: "example",
          title: "Worked example",
          problem:
            "Two machines make a part. Machine 1 makes 70% of output with a 2% defect rate; machine 2 makes 30% with a 5% defect rate. What fraction of parts are defective?",
          steps: [
            "The machines partition the output, so total probability applies.",
            "$P(D) = P(D \\mid M_1)P(M_1) + P(D \\mid M_2)P(M_2)$.",
            "$= (0.02)(0.70) + (0.05)(0.30) = 0.014 + 0.015$.",
            "Note the smaller machine contributes more defects in absolute terms, despite making less.",
          ],
          answer: "$P(D) = 0.029$, about 2.9%.",
        },
      ],
    },
    {
      heading: "The two classic errors",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Confusing $P(A \\mid B)$ with $P(B \\mid A)$",
          text: "These are different numbers and can differ by orders of magnitude. $P(\\text{positive test} \\mid \\text{disease})$ is a property of the test and is usually high; $P(\\text{disease} \\mid \\text{positive test})$ depends on how common the disease is and can be small. Swapping them is the prosecutor's fallacy, and Bayes' rule exists precisely to convert between the two.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Dropping the condition mid-derivation",
          text: "Inside a conditional world every probability must stay conditioned on the same event. $P(A \\cup C \\mid B) = P(A \\mid B) + P(C \\mid B) - P(A \\cap C \\mid B)$ — the $\\mid B$ appears in every term. Writing $P(A \\cap C)$ for one of them silently switches sample spaces halfway through.",
        },
      ],
    },
  ],
  references: [
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 2.1–2.4" },
    { source: "Casella & Berger, Statistical Inference", locator: "§1.3" },
    { source: "Mathlingo assessment bank", locator: "assessments/foundations-of-probability.md" },
  ],
};
