import type { WikiArticle } from "./types";

export const chiSquareTestOfIndependenceWiki: WikiArticle = {
  conceptId: "chi-square-test-of-independence",
  summary:
    "The chi-square test of independence asks whether two categorical variables are associated. It " +
    "compares the counts actually observed in a contingency table against the counts expected if the " +
    "variables were independent — where “expected” is computed directly from the definition " +
    "P(A ∩ B) = P(A)P(B), applied to the table's own margins.",

  sections: [
    {
      heading: "Expected counts come from independence",
      blocks: [
        {
          kind: "formula",
          latex: "Eᵢⱼ = (row i total × column j total) / grand total",
        },
        {
          kind: "prose",
          text:
            "This is not a formula to memorise separately — it is independence applied to counts. If " +
            "row and column are independent, the probability of a cell is the product of the marginal " +
            "probabilities, and multiplying by n gives the expected count. Everything else in the test " +
            "measures how far the table strays from that product structure.",
        },
        {
          kind: "formula",
          latex: "X² = Σ (Oᵢⱼ − Eᵢⱼ)² / Eᵢⱼ   ~  χ²_{(r−1)(c−1)} under H₀",
        },
        {
          kind: "prose",
          text:
            "Dividing by E rather than by n is what makes each cell's contribution comparable: a " +
            "discrepancy of 10 is enormous where 5 were expected and trivial where 5,000 were. The " +
            "degrees of freedom (r − 1)(c − 1) count the cells you are free to fill once the margins " +
            "are fixed — in a 2×2 table, choosing one cell determines the other three.",
        },
      ],
    },

    {
      heading: "Assumptions and scope",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "Counts, not proportions or percentages. Feeding percentages in silently sets n = 100.",
            "Independent observations — each unit contributes to exactly one cell.",
            "Expected counts large enough: the usual rule is all Eᵢⱼ ≥ 5, or at least 80% of cells ≥ 5.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The rule is about expected counts, not observed",
          text:
            "A cell with 0 observed is fine if its expected count is 12. A cell with 4 expected is a " +
            "problem even if 9 were observed. When expected counts are too small the chi-square " +
            "approximation to the discrete sampling distribution breaks down — use Fisher's exact " +
            "test instead.",
        },
        {
          kind: "prose",
          text:
            "The test is inherently two-sided in a particular sense: X² is always non-negative and " +
            "large values mean “far from independence” in any direction. It tells you that an " +
            "association exists, not what shape it takes. For that, inspect the standardised residuals " +
            "(O − E)/√E cell by cell — they show which cells drive the result.",
        },
      ],
    },

    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Treatment versus outcome",
          problem:
            "Of 200 patients, 100 received treatment and 100 control. 60 treated and 40 control " +
            "recovered. Is recovery associated with treatment?",
          steps: [
            "Margins: 100 per row; recovered = 100, not recovered = 100; grand total 200.",
            "Every expected count is (100 × 100)/200 = 50, so all four Eᵢⱼ = 50.",
            "X² = (60−50)²/50 + (40−50)²/50 + (40−50)²/50 + (60−50)²/50 = 4 × (100/50) = 8.0.",
            "df = (2−1)(2−1) = 1; critical value at α = 0.05 is 3.841.",
          ],
          answer:
            "X² = 8.0 > 3.841, so reject independence (p ≈ 0.0047). Recovery rates of 60% versus 40% " +
            "differ by more than chance would explain at this sample size.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "For a 2×2 table, chi-square equals the two-proportion z squared",
          text:
            "Here z = (0.6 − 0.4)/√(0.5 × 0.5 × (1/100 + 1/100)) = 0.2/0.0707 = 2.83, and 2.83² = 8.0. " +
            "The two tests are algebraically identical in the 2×2 case, which is a useful check and a " +
            "reminder that χ²₁ is the square of a standard normal.",
        },
      ],
    },
  ],

  references: [
    { source: "Wasserman, All of Statistics", locator: "Ch. 10, Hypothesis Testing and p-values" },
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§10.3, Asymptotic Evaluations" },
    { source: "Mathlingo assessment bank", locator: "assessments/named-tests-and-resampling.md" },
  ],
};
