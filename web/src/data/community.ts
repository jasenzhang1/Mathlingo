export interface Contribution {
  id: string;
  topicId: string;
  question: string;
  answer: string;
  author: string;
  createdAt: string;
  votes: number;
  /** Curator pick — pinned regardless of vote count. */
  featured: boolean;
}

/** Upvotes a community card needs before it pins itself to the top of the board. */
export const PIN_VOTE_THRESHOLD = 12;

export function isPinned(contribution: Contribution): boolean {
  return contribution.featured || contribution.votes >= PIN_VOTE_THRESHOLD;
}

export const seedContributions: Contribution[] = [
  {
    id: "c-rank-bound",
    topicId: "linear-algebra",
    question: "Why must rank(A) ≤ min(m, n) for an m × n matrix?",
    answer:
      "Rank is the dimension of the column space. There are only n columns, so they can span at most n dimensions — and every column lives in R^m, so the span sits inside an m-dimensional space. Both ceilings apply at once, so the smaller one wins.",
    author: "Priya R.",
    createdAt: "2026-07-14",
    votes: 24,
    featured: true,
  },
  {
    id: "c-squared-deviations",
    topicId: "probability-statistics",
    question: "Why does variance square the deviations instead of taking absolute values?",
    answer:
      "Squaring keeps the measure differentiable everywhere, and it makes variance additive for independent variables — Var(X + Y) = Var(X) + Var(Y). Mean absolute deviation has neither property, which is why almost every downstream result (least squares, the CLT, the bias–variance split) is built on the squared version.",
    author: "Marcus L.",
    createdAt: "2026-07-22",
    votes: 16,
    featured: false,
  },
  {
    id: "c-chain-rule-backprop",
    topicId: "calculus-optimization",
    question: "What is the chain rule actually computing during backpropagation?",
    answer:
      "It is bookkeeping for blame. Each layer asks 'if my output moved by ε, how much would the loss move?' and multiplies that by 'if my weights moved by ε, how much would my output move?'. Backprop just evaluates that product right-to-left so every layer reuses the gradient the layer above already computed.",
    author: "Dev O.",
    createdAt: "2026-08-02",
    votes: 11,
    featured: false,
  },
  {
    id: "c-l2-shrinkage",
    topicId: "ml-foundations",
    question: "Why does L2 regularization shrink weights but rarely drive them to exactly zero?",
    answer:
      "The L2 penalty's gradient is 2λw, which vanishes as w approaches zero — the pull gets weaker the closer you are, so you converge toward zero without landing on it. L1's gradient is a constant λ·sign(w), so it keeps pushing at full strength all the way in, which is why lasso produces genuinely sparse weights.",
    author: "Ana S.",
    createdAt: "2026-08-09",
    votes: 9,
    featured: false,
  },
  {
    id: "c-amortized-append",
    topicId: "dsa",
    question: "Why is appending to a dynamic array called amortized O(1) rather than O(n)?",
    answer:
      "Doubling means a resize happens on appends 1, 2, 4, 8, … so n appends cost 1 + 2 + 4 + … + n < 2n copies total. Spread across n operations that is a constant per append. Any single append can still be O(n) — the guarantee is about the sequence, not the worst case.",
    author: "Yuki T.",
    createdAt: "2026-08-15",
    votes: 7,
    featured: false,
  },
  {
    id: "c-ito-lemma",
    topicId: "quant-finance",
    question: "What does Itô's lemma add that the ordinary chain rule misses?",
    answer:
      "A second-order term you cannot drop. For smooth paths (dt)² is negligible, but Brownian motion has (dW)² = dt, so the ½f''(X)dt term survives. That extra term is exactly why log returns drift at μ − σ²/2 rather than μ.",
    author: "Priya R.",
    createdAt: "2026-08-21",
    votes: 14,
    featured: false,
  },
];
