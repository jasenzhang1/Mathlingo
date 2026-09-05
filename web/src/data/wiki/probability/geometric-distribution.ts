import type { WikiArticle } from "../types";

export const geometricDistribution: WikiArticle = {
  conceptId: "geometric-distribution",
  summary:
    "The geometric distribution counts trials until the first success, when each trial succeeds independently with the same probability. It is the discrete memoryless distribution — the coin has no idea how long you have been flipping — and the source of the useful fact that the expected wait is $1/p$.",
  sections: [
    {
      heading: "Two conventions",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Check which version you are reading",
          text: "\"Geometric\" means one of two things, and textbooks and software disagree. Counting *trials including the success* gives support $\\{1, 2, 3, \\ldots\\}$ and mean $1/p$. Counting *failures before the success* gives support $\\{0, 1, 2, \\ldots\\}$ and mean $(1-p)/p$. The two differ by exactly 1. R's `rgeom` uses the failures version; most probability courses use the trials version. Neither is wrong — mixing them is.",
        },
        {
          kind: "formula",
          latex: "P(X = k) = (1-p)^{k-1}\\,p, \\qquad k = 1, 2, 3, \\ldots",
          caption: "Trials-until-success convention, used throughout this article",
        },
        {
          kind: "prose",
          text: "The form reads directly off the experiment: $k-1$ failures, each with probability $1-p$, then one success with probability $p$. Independence is what lets them multiply.",
        },
      ],
    },
    {
      heading: "Moments and tail",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbb{E}[X] = \\frac{1}{p}, \\qquad \\operatorname{Var}(X) = \\frac{1-p}{p^{2}}, \\qquad P(X > k) = (1-p)^{k}",
          caption: "Mean, variance, and survival function",
        },
        {
          kind: "prose",
          text: "The tail probability has an immediate reading: $X > k$ means the first $k$ trials all failed, which happens with probability $(1-p)^{k}$. This is usually the fastest route to any geometric probability — easier than summing the pmf.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why the mean is $1/p$",
          text: "Condition on the first trial. With probability $p$ you are done in one; with probability $1-p$ you have used a trial and face the identical problem again. So $\\mathbb{E}[X] = p(1) + (1-p)(1 + \\mathbb{E}[X])$, which rearranges to $\\mathbb{E}[X] = 1/p$. No series summation required — the memorylessness does the work.",
        },
      ],
    },
    {
      heading: "Memorylessness",
      blocks: [
        {
          kind: "formula",
          latex: "P(X > m + n \\mid X > m) = P(X > n)",
          caption: "The geometric is the only discrete distribution with this property",
        },
        {
          kind: "prose",
          text: "The proof is one line: $(1-p)^{m+n}/(1-p)^{m} = (1-p)^{n}$. Having failed 20 times, your remaining wait has exactly the same distribution as when you started. This is the discrete counterpart of the exponential distribution's memorylessness, and the two are related as limits of one another.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "This is the gambler's fallacy, formalised",
          text: "\"I'm due for a win\" asserts that past failures raise the chance of imminent success. Memorylessness says precisely the opposite: they change nothing. If the trials really are independent with constant $p$, the distribution of your remaining wait after 20 failures is identical to a fresh start. The caveat worth holding onto is *if* — in many real settings failures are informative, because they suggest $p$ was smaller than you assumed.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Expected trials and a tail probability",
          problem:
            "A basketball player makes 15% of three-point attempts. How many attempts until the first make, on average? What is the chance it takes more than 10?",
          steps: [
            "$p = 0.15$, so $\\mathbb{E}[X] = 1/0.15 \\approx 6.67$ attempts.",
            "$P(X > 10) = (1 - 0.15)^{10} = 0.85^{10}$.",
            "$0.85^{10} \\approx 0.1969$.",
            "$\\operatorname{Var}(X) = 0.85/0.15^{2} \\approx 37.8$, so SD $\\approx 6.15$ — nearly as large as the mean.",
          ],
          answer:
            "About 6.7 attempts on average; roughly a 19.7% chance of needing more than 10. The large standard deviation is characteristic — geometric waits are highly variable.",
        },
        {
          kind: "prose",
          text: "That last point is worth noting. The distribution is heavily right-skewed: the mode is always 1 — the single most likely outcome is succeeding immediately — while the mean sits well above it and the tail runs long. Reporting only the mean wait considerably understates how long an unlucky run can be.",
        },
      ],
    },
    {
      heading: "Related distributions",
      blocks: [
        {
          kind: "table",
          headers: ["Question", "Distribution"],
          rows: [
            ["Trials until the 1st success", "Geometric$(p)$"],
            ["Trials until the $r$th success", "Negative binomial$(r, p)$"],
            ["Successes in a fixed $n$ trials", "Binomial$(n, p)$"],
            ["Continuous-time wait to next event", "Exponential$(\\lambda)$"],
          ],
          caption:
            "Binomial fixes the number of trials and lets the successes vary; geometric fixes the successes at one and lets the trials vary. They describe the same experiment from opposite ends.",
        },
      ],
    },
  ],
  references: [
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 4.3" },
    { source: "Casella & Berger, Statistical Inference", locator: "§3.2.2" },
    { source: "Mathlingo assessment bank", locator: "assessments/discrete-distributions.md" },
  ],
};
