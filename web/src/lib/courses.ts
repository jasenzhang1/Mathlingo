import type { Domain } from "../data/concepts";
import { chapters } from "./learningOrder";

/**
 * The course catalogue for the Courses tab: one course per curriculum chapter
 * (a `Domain`), with a short summary written for someone deciding whether to
 * enrol. Chapter and lesson counts are computed from the curriculum itself, so
 * they never go stale.
 */

const SUMMARIES: Record<Domain, string> = {
  "discrete-math": "Logic, proofs, sets, counting, graphs and number theory — the language the rest of mathematics is written in.",
  probability: "From the axioms to random variables, the named distributions, conditioning, expectation and the moment-generating function.",
  "linear-algebra": "Vectors, matrices, the four fundamental subspaces, orthogonality, eigenvalues and the SVD — with the intuition, not just the algebra.",
  "multivariate-probability": "Random vectors, the multivariate normal, quadratic forms, copulas and the limit theorems behind every large-sample method.",
  "information-theory": "Entropy, KL divergence, mutual information and coding — how to measure information and why ML losses look the way they do.",
  statistics: "Estimation, confidence intervals, hypothesis tests from Neyman–Pearson to permutation tests, and comparing many things at once.",
  regression: "Linear models end to end: least squares, inference, diagnostics, ANOVA, model selection, regularisation and GLMs.",
  "bayesian-statistics": "Priors and posteriors, conjugate models, prediction, hierarchical models, MCMC, Gaussian processes and Bayesian inversion.",
  "machine-learning": "The core of applied ML: losses, optimisation, validation, trees and ensembles, kernels, clustering, interpretability and RL.",
  "deep-learning": "Neural networks from backprop to transformers, CNNs, state-space models, graph networks and generative models.",
  "graphical-models": "Graphs as probability models, causal inference with DAGs, latent variables and EM, and numerical integration.",
  "stochastic-processes": "Random walks, Markov chains, stopping times, Poisson and point processes, and the road to Brownian motion.",
  "stochastic-calculus": "Martingales, the Itô integral and formula, SDEs, Girsanov and risk-neutral pricing, and the link to PDEs.",
  "functional-data": "Curves as data: function spaces, smoothing and registration, operators, functional PCA and functional regression.",
  "financial-instruments": "Bonds and the yield curve, equities and funds, forwards, futures and options, and swaps and credit derivatives.",
  "time-series": "Stationarity, autocorrelation, ARMA and ARIMA models, and volatility models like GARCH.",
  python: "Python for data work: the language itself, then NumPy and pandas, text, errors, iterators and classes.",
};

export interface Course {
  id: Domain;
  label: string;
  color: string;
  summary: string;
  chapterCount: number;
  lessonCount: number;
  /** A few chapter names, for a taste of what's inside. */
  chapterNames: string[];
  /** Every chapter with its lesson titles, in learning order, for previewing. */
  chapters: { id: string; name: string; lessons: string[] }[];
}

export const COURSES: Course[] = chapters
  .filter((c) => c.concepts.length > 0)
  .map((c) => ({
    id: c.domain,
    label: c.label,
    color: c.color,
    summary: SUMMARIES[c.domain],
    chapterCount: c.sections.length,
    lessonCount: c.concepts.length,
    chapterNames: c.sections.map((s) => s.label.replace(/^Ch\. \d+ · /, "")),
    chapters: c.sections.map((s) => ({
      id: s.id,
      name: s.label.replace(/^Ch\. \d+ · /, ""),
      lessons: s.concepts.map((concept) => concept.title),
    })),
  }));

export const courseById = new Map(COURSES.map((c) => [c.id, c]));

export const isCourse = (id: string | null | undefined): id is Domain => Boolean(id && courseById.has(id as Domain));
