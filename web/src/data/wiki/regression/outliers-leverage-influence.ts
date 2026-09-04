import type { WikiArticle } from "../types";

export const outliersLeverageInfluenceWiki: WikiArticle = {
  conceptId: "outliers-leverage-influence",

  summary:
    "Three different words describe three different ways an observation can be unusual, and confusing " +
    "them is the standard mistake. An outlier has a surprising response. A high-leverage point has " +
    "unusual predictor values. An influential point is one whose removal would meaningfully change the " +
    "fit — and it takes leverage and a poor fit acting together to produce real influence. Cook's " +
    "distance is the single number that combines the two and answers the only question that actually " +
    "matters: does this point matter?",

  sections: [
    {
      heading: "Three different questions",
      blocks: [
        {
          kind: "table",
          headers: ["Term", "Question it answers", "Computed from"],
          rows: [
            ["Outlier", "Is this response surprising given this point's predictors?", "The residual, usually standardised"],
            ["Leverage", "Are this point's predictor values unusual, on their own?", "hᵢᵢ, the diagonal of the hat matrix — depends only on X"],
            ["Influence", "Would removing this point change the fitted coefficients much?", "Both of the above, combined"],
          ],
        },
        {
          kind: "prose",
          text:
            "Leverage is computable before a single response value is ever observed — it is a property " +
            "of where a point sits in predictor space, full stop. A point can therefore have enormous " +
            "leverage and be perfectly unremarkable, if its response happens to fall right where the " +
            "rest of the data already predicted. Only when high leverage meets a response the model " +
            "would not otherwise have predicted does a point become genuinely influential.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A high-leverage point often has a small residual — by construction",
          text:
            "This is the trap that makes the distinction matter in practice. From geometric-interpretation-of-ols, " +
            "Var(eᵢ) = σ²(1 − hᵢᵢ) — as leverage approaches 1, the residual's own variance shrinks toward " +
            "zero, because the fitted line is dragged toward that point rather than resisting it. So the " +
            "single most consequential observation in a dataset frequently shows one of the smallest raw " +
            "residuals, and scanning for large residuals alone reliably misses it.",
        },
      ],
    },

    {
      heading: "Leverage",
      blocks: [
        {
          kind: "formula",
          latex: "hᵢᵢ = [X(XᵀX)⁻¹Xᵀ]ᵢᵢ,   0 ≤ hᵢᵢ ≤ 1,   Σᵢ hᵢᵢ = p + 1",
          caption: "The i-th diagonal entry of the hat matrix — how much observation i's own response pulls its own fitted value.",
        },
        {
          kind: "prose",
          text:
            "Since ŷᵢ = Σⱼ hᵢⱼyⱼ, leverage is literally ∂ŷᵢ/∂yᵢ. A rule of thumb flags hᵢᵢ > 2(p+1)/n — " +
            "twice the average leverage a point would have if every point contributed equally — as worth " +
            "a look. In simple regression, hᵢᵢ = 1/n + (xᵢ − x̄)²/Σⱼ(xⱼ − x̄)², so leverage grows purely " +
            "with distance from x̄; a point at the extreme edge of the observed predictor range always " +
            "carries the most.",
        },
      ],
    },

    {
      heading: "Cook's distance",
      blocks: [
        {
          kind: "formula",
          latex: "Dᵢ = [eᵢ² / (p+1)σ̂²] · [hᵢᵢ / (1 − hᵢᵢ)²]",
          caption: "Standardised squared residual times a factor that blows up as leverage approaches 1.",
        },
        {
          kind: "prose",
          text:
            "The formula is the product of exactly the two ingredients the earlier table separated: a " +
            "term measuring how surprising the residual is, and a term measuring how much leverage the " +
            "point has. Either factor at zero collapses the whole product to zero — a huge residual on a " +
            "low-leverage point, or huge leverage with a residual of zero, is not influential. Only the " +
            "combination is.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "It literally measures a counterfactual",
          text:
            "Cook's original derivation is not an ad hoc combination — Dᵢ is exactly proportional to " +
            "‖ŷ − ŷ₍ᵢ₎‖², the squared distance between the fitted values from the full data and the " +
            "fitted values from a model refitted with observation i deleted. It answers 'how much would " +
            "the whole fit move if I dropped this one point?' without ever actually needing to refit " +
            "n separate models to find out.",
        },
        {
          kind: "table",
          headers: ["Rule of thumb", "Reading"],
          rows: [
            ["Dᵢ > 4/n", "A common, permissive flag — worth a look"],
            ["Dᵢ > 1", "A more conservative threshold, roughly where the point single-handedly shifts the fit by about one standard error"],
            ["Dᵢ near the largest few among all n points", "Often more useful than any fixed cutoff — look at the shape of the distribution, not just one number"],
          ],
        },
      ],
    },

    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Reading the four possibilities",
          problem:
            "Four points in a simple regression: (a) x near x̄, y close to the fitted line; (b) x far from " +
            "x̄, y close to the fitted line; (c) x near x̄, y far from the fitted line; (d) x far from x̄, y " +
            "far from the fitted line. Classify each by leverage, residual size, and influence.",
          steps: [
            "(a): low leverage, small residual — an ordinary, unremarkable point.",
            "(b): high leverage, small residual — the fitted line already passes near this point, or was pulled to; low influence despite the extreme x.",
            "(c): low leverage, large residual — a genuine outlier in y, but with x near the centre of mass the line resists it; moderate influence at most.",
            "(d): high leverage, large residual — both ingredients of Cook's distance are large at once.",
          ],
          answer:
            "(d) is the influential point. It is worth checking specifically whether it is a data-entry error, a genuinely different regime, or simply an extreme but valid case — the three call for different responses (fix, exclude with justification, or keep and report sensitivity to it).",
        },
      ],
    },

    {
      heading: "What to do about an influential point",
      blocks: [
        {
          kind: "list",
          items: [
            "Verify it before doing anything else — a data-entry error or unit mismatch is the most common cause and the easiest to fix correctly.",
            "Report the fit with and without the point, rather than silently choosing one. If the conclusion reverses, that is itself the finding.",
            "Consider whether the point reveals model misspecification rather than being a defect in the data — an influential point at an extreme x is sometimes evidence the relationship is not linear that far out.",
            "Prefer a robust regression method (Huber loss, or an M-estimator) over deletion when influential points are numerous rather than a handful — deleting several observations one at a time can compound rather than resolve the problem.",
            "Never delete a point solely because it is influential. Influence measures leverage over the fit, not correctness of the observation.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Deleting the influential point is not automatically the right move",
          text:
            "An influential point is sometimes the most informative observation in the dataset — the one " +
            "extreme case that pins down the slope at all. Removing every influential point in sequence " +
            "can leave a fit that looks stable purely because it has been shorn of everything that " +
            "disagreed with it, which is the opposite of what a diagnostic is supposed to protect " +
            "against.",
        },
      ],
    },
  ],

  references: [
    { source: "NIST/SEMATECH e-Handbook of Statistical Methods", locator: "§4.4.4, Detection of Outliers and Influential Observations" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§3.2, Linear Regression Models and Least Squares" },
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§11.3, Regression Diagnostics" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-03-model-fit-and-diagnostics.md" },
  ],
};
