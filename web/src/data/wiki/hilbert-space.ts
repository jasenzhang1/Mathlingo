import type { WikiArticle } from "./types";

export const hilbertSpaceWiki: WikiArticle = {
  conceptId: "hilbert-space",
  summary:
    "A Hilbert space is what `dot-product` and `vector-norm` generalize to once 'vector' no longer " +
    "means a finite list of numbers. It's a vector space equipped with an inner product (so angles and " +
    "lengths still make sense) that is also complete (so limits of sequences that ought to converge " +
    "actually land inside the space). That combination is what lets a whole function be treated as a " +
    "single point — the starting move behind `functional-data-analysis`, `rkhs`, and the Karhunen-Loève " +
    "expansion of a stochastic process.",
  sections: [
    {
      heading: "Three ingredients",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "**A vector space.** Vectors can be added and scaled — nothing new yet.",
            "**An inner product ⟨·,·⟩.** A generalization of the dot product that still defines a norm ‖x‖ = √⟨x,x⟩ and, via Cauchy-Schwarz, an angle between any two vectors. In ℝⁿ this is the ordinary dot product; for two functions f, g it's typically ⟨f, g⟩ = ∫ f(t)g(t) dt.",
            "**Completeness.** Every Cauchy sequence (one whose terms get arbitrarily close together) converges to a point *inside* the space, not just arbitrarily close to some point outside it.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Completeness isn't free",
          text: "ℚ, the rationals, has a norm (absolute value) but isn't complete: the sequence of decimal truncations of √2 is Cauchy in ℚ but its limit, √2, isn't rational. ℝⁿ is complete, so this never bites in ordinary linear algebra — which is exactly why the requirement is invisible there and only becomes a real constraint once the space of 'vectors' is infinite-dimensional, like a space of functions.",
        },
      ],
    },
    {
      heading: "Finite-dimensional vs. function spaces",
      blocks: [
        {
          kind: "table",
          headers: ["", "ℝⁿ", "L²[a, b] (square-integrable functions)"],
          rows: [
            ["A 'vector'", "A list of n numbers", "A whole function f(t)"],
            ["Inner product", "Σᵢ xᵢyᵢ", "∫ₐᵇ f(t)g(t) dt"],
            ["Dimension", "n (finite)", "Infinite"],
            ["Orthonormal basis", "n standard basis vectors", "An infinite sequence of basis functions (e.g. Fourier basis)"],
          ],
        },
        {
          kind: "prose",
          text: "Every Hilbert space, finite- or infinite-dimensional, has an orthonormal basis, and every element decomposes uniquely as a (possibly infinite) sum of basis elements times coefficients — exactly the pattern `karhunen-loeve-expansion` exploits for random functions, and exactly what a Fourier series is for L²[a, b].",
        },
      ],
    },
    {
      heading: "Why this unlocks functional data analysis",
      blocks: [
        {
          kind: "prose",
          text: "Once 'the data' is a curve — a patient's growth trajectory, a stock's price path, a sensor's reading over time — treating each curve as a single point in a Hilbert space of functions makes every tool built for vectors in ℝⁿ (distances, projections, means, PCA) available again, just applied to a space where a 'coordinate' is now a value of the function at one time rather than one entry of a finite list.",
        },
      ],
    },
  ],
  references: [
    { source: "Wasserman, All of Nonparametric Statistics", locator: "§A.4" },
    { source: "Ramsay & Silverman, Functional Data Analysis", locator: "Ch. 2" },
  ],
};
