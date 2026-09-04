import type { WikiArticle } from "../types";

export const power: WikiArticle = {
  conceptId: "power",
  summary:
    "Power is the probability that a test rejects the null when the null is false — the chance of detecting a real effect. It is the quantity that determines whether an experiment was worth running, and the one most often ignored: an underpowered study that finds nothing has established nothing, and an underpowered study that finds something has probably overstated it.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "\\text{Power} = P(\\text{reject } H_0 \\mid H_1 \\text{ true}) = 1 - \\beta",
          caption: "$\\beta$ is the Type II error rate — failing to detect a real effect",
        },
        {
          kind: "table",
          headers: ["", "$H_0$ true", "$H_0$ false"],
          rows: [
            ["Reject $H_0$", "Type I error, rate $\\alpha$", "**correct — power $= 1-\\beta$**"],
            ["Fail to reject", "correct, rate $1-\\alpha$", "Type II error, rate $\\beta$"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Power is not a single number",
          text: "It depends on the effect size, and there is no power without one. \"This test has 80% power\" is meaningless unless it names the effect it has 80% power to detect. Power rises toward 1 as the true effect grows, and falls toward $\\alpha$ as the effect approaches zero — so a test always has *some* effect size it cannot reliably detect.",
        },
      ],
    },
    {
      heading: "What drives it",
      blocks: [
        {
          kind: "formula",
          latex: "\\text{Power} \\ \\approx \\ \\Phi\\!\\left(\\frac{|\\delta|\\sqrt{n}}{\\sigma} - z_{1-\\alpha/2}\\right)",
          caption: "For a two-sided one-sample $z$-test with true effect $\\delta$",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "**Effect size $\\delta$.** Larger effects are easier to find. This is the one factor not under your control.",
            "**Sample size $n$.** Power rises with $\\sqrt{n}$, so quadrupling the sample roughly halves the detectable effect.",
            "**Variance $\\sigma^{2}$.** Reducing noise — better measurement, blocking, within-subject designs — raises power as effectively as collecting more data.",
            "**Significance level $\\alpha$.** A larger $\\alpha$ raises power, but only by accepting more false positives. This is a trade, not an improvement.",
          ],
        },
        {
          kind: "example",
          title: "Sample size planning",
          problem:
            "How many observations are needed for 80% power to detect a difference of 0.5 units, with $\\sigma = 2$ and $\\alpha = 0.05$ two-sided?",
          steps: [
            "Standardised effect: $d = \\delta/\\sigma = 0.5/2 = 0.25$.",
            "The standard formula: $n = \\dfrac{(z_{1-\\alpha/2} + z_{1-\\beta})^{2}}{d^{2}}$.",
            "$z_{0.975} = 1.96$, $z_{0.80} = 0.84$, so the numerator is $(2.80)^{2} = 7.84$.",
            "$n = 7.84/0.0625 \\approx 125.4$.",
          ],
          answer:
            "About 126 observations. Halving the detectable effect to $d = 0.125$ would require roughly 502 — four times as many, because $n$ scales with $1/d^{2}$.",
        },
      ],
    },
    {
      heading: "Why underpowered studies mislead twice",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "The winner's curse",
          text: "In a low-power study, an effect only reaches significance if the noise happens to push the estimate far from zero. So *conditional on being significant*, the estimated effect is systematically larger than the truth — often several times larger. This is why underpowered findings both fail to replicate and, when they do replicate, shrink. Low power damages the estimates that survive, not just the ones that do not.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Post-hoc power is not informative",
          text: "Computing power *after* the fact using the observed effect size adds nothing: it is a deterministic function of the p-value, so a non-significant result always yields low observed power. It cannot tell you whether a null result reflects a small effect or a poor design. The useful question after a null result is a confidence interval — which effect sizes remain consistent with the data.",
        },
        {
          kind: "prose",
          text: "The related quantity worth reporting is the *minimum detectable effect*: the smallest effect the design could have found with reasonable probability. A null result alongside \"we had 80% power to detect a difference of 0.5\" is informative; a null result alone is not.",
        },
      ],
    },
    {
      heading: "Related ideas",
      blocks: [
        {
          kind: "prose",
          text: "The *power function* $\\beta(\\theta) = P(\\text{reject} \\mid \\theta)$ treats power as a function of the whole parameter space. It equals $\\alpha$ at the null value and rises away from it. Comparing tests means comparing their power functions, and the Neyman–Pearson lemma identifies the likelihood ratio test as the most powerful one for a simple hypothesis against a simple alternative at a given $\\alpha$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Multiple testing costs power",
          text: "A Bonferroni correction divides $\\alpha$ by the number of tests, which raises the bar for every one and reduces power sharply. This is the real cost of testing many hypotheses — controlling false positives makes false negatives more common. False discovery rate procedures exist precisely because they give up less power than family-wise error control does.",
        },
      ],
    },
  ],
  references: [
    { source: "Casella & Berger, Statistical Inference", locator: "§8.3.1–8.3.2" },
    { source: "Wasserman, All of Statistics", locator: "§10.1–10.4" },
    { source: "Button et al., 'Power failure: why small sample size undermines the reliability of neuroscience'", locator: "Nature Reviews Neuroscience 14, 2013" },
    { source: "Mathlingo assessment bank", locator: "assessments/hypothesis-testing-machinery.md" },
  ],
};
