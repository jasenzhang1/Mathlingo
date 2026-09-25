import type { WikiArticle } from "../types";

export const estimableFunctionsWiki: WikiArticle = {
  conceptId: "estimable-functions",

  summary:
    "If X has less than full rank, β cannot be estimated — but some linear combinations of it can. A " +
    "function aᵀβ is estimable when it has a linear unbiased estimator, which turns out to mean that aᵀ " +
    "is a linear combination of the rows of X. Estimable functions are precisely the quantities on which " +
    "every least-squares solution agrees, and the Gauss–Markov theorem goes through for them unchanged.",

  sections: [
    {
      heading: "Definition and characterisation",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Estimable",
              description: "aᵀβ is estimable if there is a vector b with E(bᵀy) = aᵀβ for every β.",
            },
          ],
        },
        {
          kind: "formula",
          latex: "E(bᵀy) = bᵀXβ = aᵀβ  ∀β  ⟺  aᵀ = bᵀX  ⟺  a ∈ C(Xᵀ)",
          caption: "Estimable ⟺ aᵀ lies in the row space of X ⟺ a is orthogonal to every null-space vector of X.",
        },
        {
          kind: "prose",
          text:
            "Two immediate consequences. First, every element of Xβ — each observation's expected value — is " +
            "estimable, by taking b to be a unit vector. Second, a linear combination of estimable functions " +
            "is estimable. So anything you can build from cell means is estimable, and nothing else is.",
        },
      ],
    },

    {
      heading: "Why every solution agrees",
      blocks: [
        {
          kind: "prose",
          text:
            "Two least-squares solutions differ by a vector z in N(X). If aᵀ = bᵀX then aᵀz = bᵀXz = 0, so " +
            "aᵀβ̂ is the same whichever solution you use. Conversely, if a is not in the row space there is a " +
            "null-space direction with aᵀz ≠ 0, and aᵀβ̂ can be moved to any value at all without changing " +
            "the fit. Non-estimable quantities are not merely hard to estimate: the data carry no " +
            "information about them.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Gauss–Markov for estimable functions",
          text:
            "Under E(ε) = 0, Var(ε) = σ²I, aᵀβ̂ is the BLUE of an estimable aᵀβ, with variance " +
            "σ²aᵀ(XᵀX)⁻a — invariant to the choice of g-inverse. The proof is the full-rank proof with " +
            "(XᵀX)⁻¹ replaced by a g-inverse, and uniqueness of the projection doing the work that " +
            "invertibility used to do.",
        },
      ],
    },

    {
      heading: "Estimability in the one-way model",
      blocks: [
        {
          kind: "table",
          headers: ["Function of μ + αᵢ", "Estimable?", "Reason"],
          rows: [
            ["μ + αᵢ", "Yes", "It is the expected value of any observation in group i"],
            ["αᵢ − αⱼ", "Yes", "Difference of two estimable functions"],
            ["Σcᵢαᵢ with Σcᵢ = 0 (a contrast)", "Yes", "The μ terms cancel"],
            ["αᵢ alone", "No", "Adding δ to μ and subtracting δ from every αᵢ changes αᵢ but not Xβ"],
            ["μ alone", "No", "Same argument"],
          ],
        },
        {
          kind: "example",
          title: "Testing a candidate function",
          problem:
            "In yᵢⱼ = μ + αᵢ + εᵢⱼ with three groups, is 2α₁ − α₂ − α₃ estimable? Is α₁ + α₂?",
          steps: [
            "The null space of X is spanned by z = (1, −1, −1, −1) in the order (μ, α₁, α₂, α₃).",
            "For 2α₁ − α₂ − α₃, a = (0, 2, −1, −1): aᵀz = −2 + 1 + 1 = 0, so estimable.",
            "For α₁ + α₂, a = (0, 1, 1, 0): aᵀz = −1 − 1 = −2 ≠ 0, so not estimable.",
          ],
          answer: "The contrast 2α₁ − α₂ − α₃ is estimable; α₁ + α₂ is not (its coefficients do not sum to zero).",
        },
      ],
    },

    {
      heading: "Testable hypotheses",
      blocks: [
        {
          kind: "prose",
          text:
            "A hypothesis Aβ = c is testable only if every row of Aβ is estimable. 'All αᵢ are equal' is " +
            "testable (it is α₁ − α₂ = 0, α₁ − α₃ = 0, …); 'α₁ = 0' is not. Imposing a non-estimable " +
            "constraint like Σαᵢ = 0 does not test anything — it simply chooses which of the equally good " +
            "solutions to print.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§3.9.2, Estimable Functions" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§3.9.3–3.9.4, further variables and restrictions in the less-than-full-rank case" },
  ],
};
