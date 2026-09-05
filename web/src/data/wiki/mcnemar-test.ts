import type { WikiArticle } from "./types";

export const mcnemarTestWiki: WikiArticle = {
  conceptId: "mcnemar-test",
  summary:
    "When the same subjects are measured twice on a yes/no outcome, the pairs that agree carry no " +
    "information about change — only the discordant pairs do. McNemar's test uses exactly those and " +
    "ignores the rest. Applying an ordinary chi-square test of independence to such a table is a " +
    "common and serious error, because that test assumes the two samples are independent when by " +
    "construction they are the same people.",

  sections: [
    {
      heading: "The 2×2 table of pairs",
      blocks: [
        {
          kind: "table",
          headers: ["", "After: yes", "After: no"],
          rows: [["Before: yes", "a (agree)", "b (discordant)"], ["Before: no", "c (discordant)", "d (agree)"]],
          caption: "Each cell counts pairs, not individuals",
        },
        {
          kind: "prose",
          text:
            "The a and d cells are subjects whose answer did not change. They tell you the outcome " +
            "is common or rare, but nothing about whether the intervention moved anyone. All the " +
            "evidence about change is in b and c — those who switched, and in which direction.",
        },
        {
          kind: "formula",
          latex: "χ² = (b − c)² / (b + c)   ~  χ²₁ under H₀",
          caption: "Only the discordant pairs appear",
        },
        {
          kind: "prose",
          text:
            "Under the null that switching is equally likely in both directions, each discordant " +
            "pair is a coin flip, so b given b + c is Binomial(b + c, ½). The statistic above is the " +
            "normal approximation to that binomial; for small b + c, use the exact binomial test " +
            "instead.",
        },
      ],
    },

    {
      heading: "Why the ordinary chi-square is wrong here",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "The independence test answers a different question",
          text:
            "A chi-square test of independence asks whether row and column classification are " +
            "associated across independent units. With paired data the two measurements come from " +
            "the same person and are strongly correlated, so the independence assumption fails. " +
            "Worse, the two tests are asking different things: independence asks whether before and " +
            "after are related at all — and for repeated measures on the same people they obviously " +
            "are — while McNemar asks whether the *marginal* rates changed.",
        },
        {
          kind: "prose",
          text:
            "The practical consequence mirrors the paired-versus-unpaired t-test. Ignoring the " +
            "pairing throws away the very structure that makes the comparison precise, and the " +
            "concordant pairs — which can be the overwhelming majority — dilute the signal from the " +
            "discordant ones.",
        },
      ],
    },

    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Did the campaign change anyone's mind?",
          problem:
            "200 voters are surveyed before and after. 120 support both times, 50 oppose both times, " +
            "20 switch from oppose to support, and 10 switch from support to oppose. Test at α = 0.05.",
          steps: [
            "Concordant: 120 + 50 = 170 pairs, which contribute nothing.",
            "Discordant: b = 10 (support → oppose), c = 20 (oppose → support).",
            "χ² = (10 − 20)² / (10 + 20) = 100/30 = 3.33, on 1 degree of freedom.",
            "Critical value at α = 0.05 is 3.841.",
          ],
          answer:
            "3.33 < 3.841, so we fail to reject — the shift is in the expected direction but 30 " +
            "switchers are not enough to establish it. Note the entire test rested on those 30 " +
            "people; the other 170 were irrelevant to the question asked.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Sample size means discordant pairs",
          text:
            "Powering a McNemar study means planning for enough *switchers*, not enough subjects. A " +
            "study of 10,000 people where almost nobody changes their mind has less power than a " +
            "study of 200 where many do.",
        },
      ],
    },
  ],

  references: [
    { source: "Wasserman, All of Statistics", locator: "Ch. 10, Hypothesis Testing and p-values" },
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§10.3, asymptotic tests" },
    { source: "Mathlingo assessment bank", locator: "assessments/distribution-free-methods.md" },
  ],
};
