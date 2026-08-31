export interface Feature {
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    title: "Spaced repetition",
    description:
      "Flashcards resurface right before you'd forget them, so concepts stay drilled instead of fading after one pass.",
  },
  {
    title: "Real-world analogies",
    description:
      "Every idea earns its keep with a concrete example first — like the mean and variance of a tennis serve's speed — before the formalism.",
  },
  {
    title: "A visual skill tree",
    description:
      "See how linear algebra, calculus, and probability chain into the ML and quant ideas that depend on them.",
  },
  {
    title: "Critical thinking prompts",
    description:
      "Some cards don't ask what's true — they ask why. Why must rank(A) ≤ min(m, n)? You explain it, not just recall it.",
  },
  {
    title: "AI-graded free response",
    description:
      "Answer in writing, by voice, or in a mock-interview conversation, and get graded the way an interviewer actually would.",
  },
];
