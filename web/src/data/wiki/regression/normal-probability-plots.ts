import type { WikiArticle } from "../types";

export const normalProbabilityPlotsWiki: WikiArticle = {
  conceptId: "normal-probability-plots",

  summary:
    "A normal probability (Q–Q) plot sorts the residuals and plots them against the values a normal sample " +
    "of the same size would be expected to have in the same positions. Normal errors give a straight line; " +
    "the ways the plot bends identify skewness, heavy tails, and outliers at a glance. It is the standard " +
    "check of the one assumption that the exact t- and F-distributions need.",

  sections: [
    {
      heading: "Construction",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Order the studentized residuals: r₍₁₎ ≤ r₍₂₎ ≤ ⋯ ≤ r₍ₙ₎.",
            "For position i, compute the normal score Φ⁻¹((i − 3/8)/(n + 1/4)) — Blom's approximation to the expected value of the i-th normal order statistic.",
            "Plot r₍ᵢ₎ against the normal scores. Under normality the points lie near a straight line through the origin with slope about 1.",
          ],
        },
        {
          kind: "example",
          title: "A plotting position",
          problem: "With n = 20, find the plotting probability and normal score for the largest residual.",
          steps: [
            "p = (20 − 3/8)/(20 + 1/4) = 19.625/20.25 ≈ 0.969.",
            "Φ⁻¹(0.969) ≈ 1.87.",
          ],
          answer: "The largest residual is plotted at a normal score of about 1.87.",
        },
      ],
    },

    {
      heading: "Reading the shapes",
      blocks: [
        {
          kind: "table",
          headers: ["Pattern", "Interpretation"],
          rows: [
            ["Straight line", "Consistent with normality"],
            ["S-shape: flat in the middle, steep at both ends", "Heavy tails (more extreme values than normal)"],
            ["Reverse S: steep in the middle, flat at the ends", "Light tails"],
            ["Convex curve (bending up)", "Right skew"],
            ["Concave curve (bending down)", "Left skew"],
            ["A line with one or two points far off at an end", "Outliers"],
          ],
        },
      ],
    },

    {
      heading: "Caveats specific to residuals",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Residuals are not the errors",
          text:
            "e = (I − H)ε. Each residual is a weighted combination of all the errors, so by the central limit " +
            "theorem residuals look more normal than the errors really are — 'supernormality' — especially when " +
            "p is large relative to n. A straight plot is weaker evidence of normal errors than it appears.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Other problems masquerade as non-normality",
          text:
            "An omitted predictor, a wrong functional form, or non-constant variance can all bend a normal " +
            "plot. Check the mean and variance structure first; only then read the plot as a statement about " +
            "the error distribution.",
        },
        {
          kind: "prose",
          text:
            "Judging straightness takes practice: small samples wobble a lot even when normal. Simulation " +
            "envelopes — the range of plots from many simulated normal samples of the same size and design — " +
            "give a reference band. Formal tests (Shapiro–Wilk) can supplement the plot but do not replace it.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§10.5.1, Normal Plotting" },
  ],
};
