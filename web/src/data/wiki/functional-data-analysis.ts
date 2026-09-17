import type { WikiArticle } from "./types";

export const functionalDataAnalysisWiki: WikiArticle = {
  conceptId: "functional-data-analysis",
  summary:
    "Functional data analysis (FDA) treats each observation as an entire curve — a growth trajectory, " +
    "a temperature profile over a year, a stock's intraday price path — rather than a finite vector of " +
    "measurements. The move that makes this workable is `hilbert-space`: once curves are points in a " +
    "Hilbert space of functions, distances, means, and principal components all carry over from ordinary " +
    "multivariate statistics with 'vector' reinterpreted as 'function.'",
  sections: [
    {
      heading: "Why not just discretize?",
      blocks: [
        {
          kind: "prose",
          text: "The obvious shortcut — sample each curve at a fixed grid of time points and treat that as an ordinary p-dimensional vector — throws away the fact that nearby time points are highly correlated and that the curve is smooth between them. It also breaks the moment two subjects are measured at different times, different numbers of points, or with missing observations, none of which is a problem for a method that operates on the function itself.",
        },
      ],
    },
    {
      heading: "The two functional generalizations",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Functional PCA (via Karhunen-Loève)",
              description: "Ordinary PCA finds the directions of greatest variance in ℝⁿ; `karhunen-loeve-expansion` is the exact function-space analogue, finding an orthogonal basis of functions ordered by how much variance each one explains, so a whole curve is summarized by a handful of scores.",
            },
            {
              term: "Kernel methods (via RKHS)",
              description: "`rkhs` is a special Hilbert space of functions where evaluation at a point is itself a continuous, inner-product-representable operation — the property that makes kernel ridge regression, Gaussian process regression (`gaussian-process`), and SVMs work directly with functions without ever writing out an explicit infinite-dimensional feature vector.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Same Hilbert space, two different jobs",
          text: "Both tools start from 'my data lives in a Hilbert space of functions,' but they exploit different structure. Functional PCA / Karhunen-Loève cares about the *covariance* of the random functions themselves — it's a statement about the data-generating process. RKHS theory cares about a *kernel* chosen by the modeler to make evaluation well-behaved — it's a statement about the function space used to represent a model. A Gaussian process regression model, not coincidentally, has a covariance kernel that plays both roles at once — which is why `gaussian-process` sits at the intersection of the two.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Recognizing functional data",
          problem:
            "A hospital records each patient's heart rate every second during a 10-minute procedure. Is this dataset more naturally treated as ordinary multivariate data (600 features per patient) or as functional data — and why does it matter for computing a 'typical' heart-rate trajectory?",
          steps: [
            "The 600 measurements per patient are really 600 samples of one underlying smooth curve, not 600 independent, exchangeable features — adjacent seconds are highly correlated by construction.",
            "Treating it as functional data lets the 'average patient' be computed as the mean *function* (pointwise mean of the underlying smooth curves), and lets functional PCA summarize the dominant modes of variation (e.g., 'this component captures an early spike vs. a late spike') in a way a plain 600-dimensional PCA would fragment across many components dominated by measurement noise.",
          ],
          answer: "Functional data — the smoothness and ordering along time is real structure that a functional treatment preserves and an unstructured 600-feature vector treatment discards.",
        },
      ],
    },
  ],
  references: [
    { source: "Ramsay & Silverman, Functional Data Analysis", locator: "Ch. 1, 3, 8" },
    { source: "Wang, Chiou & Müller (2016), Functional Data Analysis", locator: "Annual Review of Statistics and Its Application 3" },
  ],
};
