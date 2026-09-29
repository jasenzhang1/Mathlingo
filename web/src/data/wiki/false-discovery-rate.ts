import type { WikiArticle } from "./types";

export const falseDiscoveryRateWiki: WikiArticle = {
  conceptId: "false-discovery-rate",
  summary:
    "The false discovery rate is the expected fraction of your rejections that are false. Where FWER asks ‘did I " +
    "make any mistake at all?’, FDR asks ‘what share of my discoveries should I expect to be wrong?’ — a much " +
    "looser demand when $m$ is large, and the one that makes large-scale screening possible. The " +
    "Benjamini–Hochberg procedure controls it with a threshold that grows with each p-value's rank.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "\\text{FDP} = \\frac{V}{\\max(R, 1)}, \\qquad \\text{FDR} = \\mathbb{E}[\\text{FDP}]",
          caption: "$V$ false rejections out of $R$ total; the $\\max$ defines $\\text{FDP} = 0$ when nothing is rejected",
        },
        {
          kind: "list",
          items: [
            "If every null is true, any rejection is false, so $\\text{FDP} = 1$ whenever $R \\ge 1$ and $\\text{FDR} = P(V \\ge 1) = \\text{FWER}$. FDR control therefore implies weak FWER control.",
            "When some nulls are false, $\\text{FDR} \\le \\text{FWER}$, so an FDR procedure can reject more. The gap grows with the number of real effects.",
            "FDR controls an average. In any one study the realised proportion FDP can be well above $q$; FDR control promises only that it is at most $q$ in expectation.",
          ],
        },
      ],
    },
    {
      heading: "Benjamini–Hochberg",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Sort the p-values: $p_{(1)} \\le p_{(2)} \\le \\cdots \\le p_{(m)}$.",
            "Find the largest $k$ such that $p_{(k)} \\le \\dfrac{k}{m}\\,q$.",
            "Reject $H_{(1)}, \\ldots, H_{(k)}$ — all hypotheses up to and including rank $k$, even any of them that individually sit above their own line.",
          ],
        },
        {
          kind: "prose",
          text: "It is a step-up procedure: scan from the largest p-value down and stop at the first one under its line. Under independence (or positive regression dependence, PRDS) it guarantees $\\text{FDR} = \\frac{m_0}{m}\\,q \\le q$. Plotting $p_{(k)}$ against $k$ and drawing the line of slope $q/m$ through the origin shows it at a glance: reject everything to the left of the last point under the line.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why the threshold grows with rank",
          text: "If $R = k$ hypotheses are rejected at threshold $t = kq/m$, the true nulls contribute about $m_0 t \\le m t = kq$ false rejections, so the false share is about $kq/k = q$. The threshold scales with $k$ precisely so that the expected false count scales with the number of discoveries.",
        },
      ],
    },
    {
      heading: "Dependence, adaptivity and q-values",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Benjamini–Yekutieli", description: "Replace $q$ by $q/c(m)$ with $c(m) = \\sum_{i=1}^{m} 1/i \\approx \\ln m + 0.577$. Controls FDR under arbitrary dependence, at the cost of a threshold roughly $\\ln m$ times smaller." },
            { term: "Adaptive BH / Storey", description: "BH actually controls FDR at $\\pi_0 q$, where $\\pi_0 = m_0/m$. Estimating $\\pi_0$ — e.g. from the density of p-values above $0.5$, which are mostly nulls — and running BH at $q/\\hat{\\pi}_0$ recovers the lost power when many effects are real." },
            { term: "q-value", description: "The smallest FDR level at which a hypothesis would be rejected — the FDR analogue of an adjusted p-value. For BH, $q_{(k)} = \\min_{j \\ge k} \\min\\big(\\tfrac{m}{j}\\,p_{(j)}, 1\\big)$." },
          ],
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "BH at $q = 0.05$ with $m = 8$",
          problem:
            "Sorted p-values: $0.001, 0.008, 0.012, 0.020, 0.041, 0.060, 0.300, 0.700$. How many hypotheses does BH reject at $q = 0.05$, and how many would Bonferroni reject?",
          steps: [
            "BH thresholds $kq/m = 0.00625k$: $0.00625, 0.0125, 0.01875, 0.025, 0.03125, 0.0375, 0.04375, 0.05$.",
            "Compare: $0.001 \\le 0.00625$ ✓, $0.008 \\le 0.0125$ ✓, $0.012 \\le 0.01875$ ✓, $0.020 \\le 0.025$ ✓, $0.041 > 0.03125$, $0.060 > 0.0375$, $0.300$, $0.700$ above.",
            "The largest $k$ under its line is $k = 4$.",
            "Bonferroni threshold $0.05/8 = 0.00625$: only $0.001$ passes.",
          ],
          answer: "BH rejects $4$; Bonferroni rejects $1$.",
        },
      ],
    },
    {
      heading: "Choosing between FDR and FWER",
      blocks: [
        {
          kind: "table",
          headers: ["Setting", "Target", "Why"],
          rows: [
            ["Genome-wide screening, many A/B metrics", "FDR", "rejections are leads for follow-up; a known fraction of duds is acceptable"],
            ["Confirmatory trial endpoints", "FWER", "each rejection becomes a claim; one false claim is costly"],
            ["Small pre-registered family ($m \\le 5$)", "FWER (Holm)", "the power difference is small and the guarantee is stronger"],
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Benjamini & Hochberg, Controlling the false discovery rate (JRSS B, 1995)", locator: "§3" },
    { source: "Benjamini & Yekutieli, The control of the false discovery rate under dependency (Annals of Statistics, 2001)", locator: "Theorem 1.3" },
    { source: "Storey & Tibshirani, Statistical significance for genomewide studies (PNAS, 2003)", locator: "full paper" },
  ],
};
