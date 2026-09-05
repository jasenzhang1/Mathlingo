import type { WikiArticle } from "../types";

export const lawOfTotalVariance: WikiArticle = {
  conceptId: "law-of-total-variance",
  summary:
    "The law of total variance splits variability into two parts: the average variability within groups, and the variability between group means. It is the identity behind ANOVA, mixed models, and the bias–variance decomposition — three results that look unrelated until you notice they are the same theorem with different choices of grouping variable.",
  sections: [
    {
      heading: "Statement",
      blocks: [
        {
          kind: "formula",
          latex: "\\operatorname{Var}(X) = \\underbrace{\\mathbb{E}\\big[\\operatorname{Var}(X \\mid Y)\\big]}_{\\text{within-group}} + \\underbrace{\\operatorname{Var}\\big(\\mathbb{E}[X \\mid Y]\\big)}_{\\text{between-group}}",
          caption: "Eve's law — total variance decomposes into two non-negative pieces",
        },
        {
          kind: "prose",
          text: "Both terms are non-negative, so each is a lower bound on the total. Conditioning on $Y$ can only reduce the *expected* remaining variance — never increase it — which is the formal sense in which information helps.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The second term is the one people forget",
          text: "The plausible-looking $\\operatorname{Var}(X) = \\mathbb{E}[\\operatorname{Var}(X \\mid Y)]$ is wrong and always understates the truth. Averaging within-group variances treats every group as though it had the same mean. If the group means differ, that spread is real variation in $X$, and dropping it produces standard errors that are too small — the standard failure mode when analysing clustered or hierarchical data as though it were a simple random sample.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Two machines, one output stream",
          problem:
            "Machine A makes 70% of parts with mean length 10 and variance 4. Machine B makes 30% with mean length 14 and variance 9. Find the variance of a randomly chosen part's length.",
          steps: [
            "**Within:** $\\mathbb{E}[\\operatorname{Var}(X \\mid Y)] = 0.7(4) + 0.3(9) = 2.8 + 2.7 = 5.5$.",
            "**Between:** first the overall mean, $\\mathbb{E}[X] = 0.7(10) + 0.3(14) = 11.2$.",
            "$\\operatorname{Var}(\\mathbb{E}[X \\mid Y]) = 0.7(10 - 11.2)^{2} + 0.3(14 - 11.2)^{2}$.",
            "$= 0.7(1.44) + 0.3(7.84) = 1.008 + 2.352 = 3.36$.",
            "**Total:** $5.5 + 3.36 = 8.86$.",
          ],
          answer:
            "$\\operatorname{Var}(X) = 8.86$. Note it exceeds either machine's own variance — the difference between the machines is itself a source of variability.",
        },
        {
          kind: "prose",
          text: "That last observation is the practical content. Pooling heterogeneous groups inflates variance, which is why stratifying a sample reduces the variance of an estimate: it removes the between-group term from the error.",
        },
      ],
    },
    {
      heading: "The same identity, three names",
      blocks: [
        {
          kind: "table",
          headers: ["Field", "Conditioning on", "Within / Between called"],
          rows: [
            [
              "ANOVA",
              "treatment group",
              "SS within (error) / SS between (treatment)",
            ],
            [
              "Mixed models",
              "random effect (subject, school)",
              "residual variance / random-effect variance",
            ],
            [
              "Machine learning",
              "training set drawn",
              "variance of the predictor / squared bias",
            ],
            [
              "Finance",
              "market regime",
              "idiosyncratic risk / systematic risk",
            ],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The intraclass correlation is the ratio",
          text: "$\\text{ICC} = \\dfrac{\\text{between}}{\\text{between} + \\text{within}}$ is the fraction of variance attributable to group membership. It answers \"how much does knowing someone's school tell me about their score?\" — and it is what determines the design effect, the factor by which a clustered sample's effective size falls below its nominal one. Ignoring a non-zero ICC is exactly the error of dropping the between term.",
        },
      ],
    },
    {
      heading: "A caution",
      blocks: [
        {
          kind: "prose",
          text: "The decomposition is exact and always true, but it is a statement about a *specific* $Y$. Choosing a different grouping variable produces a different split of the same total. So \"70% of the variance is between groups\" is meaningful only alongside a statement of what the groups are, and comparing such figures across studies with different groupings is not meaningful at all.",
        },
        {
          kind: "prose",
          text: "The mean has a simpler counterpart: $\\mathbb{E}[X] = \\mathbb{E}[\\mathbb{E}[X \\mid Y]]$, with only one term. The asymmetry is worth remembering — averages of averages are averages, but variances of variances are not variances.",
        },
      ],
    },
  ],
  references: [
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 9.5" },
    { source: "Casella & Berger, Statistical Inference", locator: "§4.4, Thm 4.4.7" },
    { source: "Gelman & Hill, Data Analysis Using Regression and Multilevel Models", locator: "Ch. 12" },
    { source: "Mathlingo assessment bank", locator: "assessments/joint-and-conditional-structure.md" },
  ],
};
