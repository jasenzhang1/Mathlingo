import type { WikiArticle } from "./types";

export const stickBreakingConstructionWiki: WikiArticle = {
  conceptId: "stick-breaking-construction",
  summary:
    "`dirichlet-process` defines G ~ DP(α, H) through its finite-dimensional Dirichlet marginals, which " +
    "is precise but doesn't say how to actually produce a sample. The stick-breaking construction " +
    "(Sethuraman, 1994) does: an explicit, simulate-able recipe that builds a valid DP draw atom by atom, " +
    "and is the version every practical implementation actually uses.",
  sections: [
    {
      heading: "The recipe",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Draw an infinite sequence β₁, β₂, β₃, … i.i.d. from Beta(1, α).",
            "Turn each βₖ into a weight by breaking off that fraction of whatever stick remains: wₖ = βₖ · ∏_{j<k}(1 − βⱼ).",
            "Draw atom locations θₖ i.i.d. from the base distribution H, independently of the βₖ.",
            "G = Σ_{k=1}^{∞} wₖ · δ_{θₖ} — a discrete distribution that puts weight wₖ on location θₖ.",
          ],
        },
        {
          kind: "formula",
          latex: "w_k = \\beta_k \\prod_{j=1}^{k-1} (1 - \\beta_j), \\qquad \\sum_{k=1}^{\\infty} w_k = 1 \\text{ a.s.}",
          caption: "Break off β₁ of the stick for atom 1; from what's left, break off β₂ for atom 2; and so on",
        },
      ],
    },
    {
      heading: "Why 'stick-breaking'",
      blocks: [
        {
          kind: "callout",
          tone: "insight",
          title: "A unit-length stick, broken forever",
          text: "Picture a stick of length 1. Break off a Beta(1, α) fraction — that's w₁. What remains has length 1 − β₁; break off a Beta(1, α) fraction of *that* — this is w₂, and it is necessarily smaller than what a naive β₂ fraction of the original stick would have been, because it's a fraction of an already-shrunk remainder. Repeat forever. The weights wₖ decrease (in expectation) as k grows, which is exactly why truncating the sum at some large K is a good finite approximation in practice — the tail atoms carry vanishingly little mass.",
        },
        {
          kind: "prose",
          text: "α's role from `dirichlet-process` shows up here directly: Beta(1, α) has mean 1/(1+α), so small α means each break tends to take a *large* bite (mass concentrates on the first few atoms), and large α means each break takes a *small* bite (mass spreads thinly across many atoms) — the same qualitative behavior as before, now visible as a single parameter of a single Beta distribution instead of an abstract property of the whole process.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "The first three weights",
          problem:
            "With α = 4, suppose the first three Beta(1, 4) draws happen to come out β₁ = 0.3, β₂ = 0.5, β₃ = 0.2. Compute w₁, w₂, w₃ and the stick length remaining after three breaks.",
          steps: [
            "w₁ = β₁ = 0.3. Remaining stick: 1 − 0.3 = 0.7.",
            "w₂ = β₂ · (1 − β₁) = 0.5 · 0.7 = 0.35. Remaining stick: 0.7 · (1 − 0.5) = 0.35.",
            "w₃ = β₃ · (1 − β₁)(1 − β₂) = 0.2 · 0.35 = 0.07. Remaining stick: 0.35 · (1 − 0.2) = 0.28.",
          ],
          answer: "w₁ = 0.30, w₂ = 0.35, w₃ = 0.07; 0.28 of the stick remains for atom 4 onward (0.30 + 0.35 + 0.07 + 0.28 = 1, as it must).",
        },
      ],
    },
  ],
  references: [
    { source: "Sethuraman (1994), A Constructive Definition of Dirichlet Priors", locator: "Statistica Sinica 4" },
    { source: "Murphy, Probabilistic Machine Learning: Advanced Topics", locator: "§31.2, Stick-breaking construction" },
  ],
};
