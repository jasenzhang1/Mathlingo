import type { WikiArticle } from "./types";

export const familyWiseErrorRateWiki: WikiArticle = {
  conceptId: "family-wise-error-rate",
  summary:
    "The family-wise error rate is the probability of making at least one false rejection among $m$ tests. " +
    "Controlling it at $\\alpha$ means that, with probability $1 - \\alpha$, every hypothesis you reject is a real " +
    "effect. Bonferroni does this with no assumptions at all; Šidák, Holm and Hochberg each buy back power, and " +
    "each costs something different — an independence assumption, a sequential procedure, or both.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "table",
          headers: ["", "Not rejected", "Rejected", "Total"],
          rows: [
            ["True null", "$U$", "$V$ (false positives)", "$m_0$"],
            ["False null", "$T$", "$S$ (true discoveries)", "$m - m_0$"],
            ["Total", "$m - R$", "$R$", "$m$"],
          ],
          caption: "Only $m$ and $R$ are observed; $V$ is what we want to keep small",
        },
        {
          kind: "formula",
          latex: "\\text{FWER} = P(V \\ge 1)",
        },
        {
          kind: "definitions",
          items: [
            { term: "Weak control", description: "$\\text{FWER} \\le \\alpha$ only when every null is true ($m_0 = m$). Enough to say ‘something is going on’, not enough to trust any individual rejection." },
            { term: "Strong control", description: "$\\text{FWER} \\le \\alpha$ whatever the configuration of true and false nulls. This is what licenses reporting the specific hypotheses rejected, and it is what Bonferroni, Holm and Hochberg provide." },
          ],
        },
      ],
    },
    {
      heading: "The procedures",
      blocks: [
        {
          kind: "table",
          headers: ["Procedure", "Rule", "Assumes"],
          rows: [
            ["Bonferroni", "reject $H_i$ if $p_i \\le \\alpha/m$", "nothing"],
            ["Šidák", "reject $H_i$ if $p_i \\le 1 - (1-\\alpha)^{1/m}$", "independent (or positively dependent) tests"],
            ["Holm (step-down)", "sort $p_{(1)} \\le \\cdots \\le p_{(m)}$; reject while $p_{(k)} \\le \\alpha/(m-k+1)$, stop at the first failure", "nothing"],
            ["Hochberg (step-up)", "find the largest $k$ with $p_{(k)} \\le \\alpha/(m-k+1)$; reject $H_{(1)}, \\ldots, H_{(k)}$", "independence or positive dependence (PRDS)"],
          ],
        },
        {
          kind: "prose",
          text: "Bonferroni is the union bound: $P(\\bigcup_i \\{p_i \\le \\alpha/m\\}) \\le \\sum_i \\alpha/m \\le \\alpha$ over the true nulls, which needs no independence. Šidák solves $1 - (1 - \\alpha_{\\text{each}})^m = \\alpha$ exactly under independence, so it is only slightly less conservative — at $m = 10$, $\\alpha = 0.05$ the per-test levels are $0.005$ versus $0.00512$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Holm is a free upgrade",
          text: "Holm's first threshold is Bonferroni's, $\\alpha/m$, and every later threshold is larger. It rejects everything Bonferroni rejects and sometimes more, with the same assumption-free strong control. There is no situation in which plain Bonferroni is preferable except simplicity of reporting.",
        },
        {
          kind: "prose",
          text: "Holm is an instance of the closed testing principle: reject $H_i$ only if every intersection hypothesis containing it is rejected by an $\\alpha$-level test. Any family of $\\alpha$-level intersection tests plugged into closed testing yields strong FWER control, which is how most modern gatekeeping and hierarchical procedures in clinical trials are built.",
        },
      ],
    },
    {
      heading: "Adjusted p-values",
      blocks: [
        {
          kind: "prose",
          text: "Rather than moving the threshold, you can move the p-values: the adjusted p-value is the smallest family-wise $\\alpha$ at which that hypothesis would be rejected. For Bonferroni it is $\\min(m p_i, 1)$; for Holm it is $\\max_{j \\le k} \\min\\big((m-j+1)p_{(j)}, 1\\big)$ for the $k$-th smallest, the running maximum keeping the adjusted values in the same order as the raw ones. Report adjusted p-values and compare them to $\\alpha$ as usual.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Bonferroni versus Holm",
          problem:
            "Five tests give sorted p-values $0.004, 0.011, 0.019, 0.030, 0.200$. At $\\alpha = 0.05$, how many does each procedure reject?",
          steps: [
            "Bonferroni threshold: $0.05/5 = 0.01$. Only $0.004$ is below it — $1$ rejection.",
            "Holm, $k=1$: $0.004 \\le 0.05/5 = 0.010$ — reject.",
            "Holm, $k=2$: $0.011 \\le 0.05/4 = 0.0125$ — reject.",
            "Holm, $k=3$: $0.019 \\le 0.05/3 \\approx 0.0167$? No — stop.",
          ],
          answer: "Bonferroni rejects $1$ hypothesis, Holm rejects $2$, both with strong FWER control at $0.05$.",
        },
      ],
    },
    {
      heading: "When FWER is the right target",
      blocks: [
        {
          kind: "prose",
          text: "Use FWER when a single false positive is expensive and every rejection will be acted on: primary endpoints in a confirmatory clinical trial, safety claims, a small family of pre-registered hypotheses. When $m$ is large and the goal is to find candidates for follow-up — thousands of genes, many A/B metrics — FWER control is so strict that it finds almost nothing, and the false discovery rate is the better bargain.",
        },
      ],
    },
  ],
  references: [
    { source: "Holm, A simple sequentially rejective multiple test procedure (Scandinavian Journal of Statistics, 1979)", locator: "§2" },
    { source: "Hochberg, A sharper Bonferroni procedure for multiple tests of significance (Biometrika, 1988)", locator: "full paper" },
    { source: "Wasserman, All of Statistics", locator: "§10.7, Multiple testing" },
  ],
};
