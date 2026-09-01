export type Track = "refresh" | "bootcamp";

export interface Lesson {
  id: string;
  title: string;
  description: string;
  embedUrl: string;
}

export interface Topic {
  id: string;
  name: string;
  tagline: string;
  description: string;
  hours: number;
  tracks: Track[];
  lessons?: Lesson[];
}

export const topics: Topic[] = [
  {
    id: "linear-algebra",
    name: "Linear Algebra",
    tagline: "Matrices, eigenvectors, and the machinery under every model",
    description:
      "Vectors, matrix decompositions, eigenvalues, and why rank(A) ≤ min(m, n) — rebuilt with intuition, not just proofs.",
    hours: 8,
    tracks: ["refresh", "bootcamp"],
  },
  {
    id: "calculus-optimization",
    name: "Calculus & Optimization",
    tagline: "Gradients, chain rule, and how models actually learn",
    description:
      "Derivatives, the chain rule, convexity, and gradient descent — the engine behind backpropagation.",
    hours: 7,
    tracks: ["refresh", "bootcamp"],
  },
  {
    id: "probability-statistics",
    name: "Probability & Statistics",
    tagline: "Distributions, inference, and reasoning under uncertainty",
    description:
      "From Bayes' rule to hypothesis testing, motivated with real examples like a tennis serve's speed variance.",
    hours: 9,
    tracks: ["refresh", "bootcamp"],
    lessons: [
      {
        id: "bernoulli-binomial",
        title: "Bernoulli and Binomial Distributions",
        description:
          "The building blocks of discrete probability: a single yes/no trial, and what happens when you repeat it.",
        embedUrl:
          "https://vanessawong.my.canva.site/024-bernoulli-and-binomial-distributions",
      },
    ],
  },
  {
    id: "ml-foundations",
    name: "Machine Learning Foundations",
    tagline: "From linear regression to backprop, from first principles",
    description:
      "Loss functions, regularization, and neural networks — built up so nothing feels like a black box.",
    hours: 10,
    tracks: ["bootcamp"],
  },
  {
    id: "dsa",
    name: "Data Structures & Algorithms",
    tagline: "The CS fundamentals technical interviews still test",
    description:
      "Big-O, trees, graphs, and dynamic programming, drilled the way you'd drill vocabulary in a language app.",
    hours: 8,
    tracks: ["bootcamp"],
  },
  {
    id: "quant-finance",
    name: "Quantitative Finance",
    tagline: "Stochastic calculus, risk, and the math behind trading desks",
    description:
      "Brownian motion, Itô's lemma, and portfolio risk — for professionals sharpening skills they haven't used since grad school.",
    hours: 8,
    tracks: ["refresh"],
  },
];
