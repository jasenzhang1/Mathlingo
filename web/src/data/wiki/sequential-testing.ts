import type { WikiArticle } from "./types";

export const sequentialTestingWiki: WikiArticle = {
  conceptId: "sequential-testing",
  summary:
    "Checking a running experiment and stopping the moment it looks significant is one of the most " +
    "common ways to manufacture a false positive. The fixed-sample procedures assume the sample " +
    "size was decided in advance, and repeated looks quietly turn one test into many. Designs exist " +
    "that permit early stopping — they simply charge for it up front.",

  sections: [
    {
      heading: "Why peeking inflates the error rate",
      blocks: [
        {
          kind: "prose",
          text:
            "A stopping rule that says \"reject as soon as any look clears the threshold\" is testing " +
            "the union of several events, not one. The relevant error rate is the probability that " +
            "*at least one* look crosses, which is larger than the probability that a designated one " +
            "does. It is the multiple-testing problem wearing a different hat.",
        },
        {
          kind: "prose",
          text:
            "The looks are heavily correlated — each day's data contains all previous days — so the " +
            "inflation is less than the 1 − (1 − α)^m that independence would give. Simulations put " +
            "a daily-peek rule over two weeks at roughly 20–30% rather than 5%. The direction is not " +
            "in doubt even though the exact figure depends on the schedule.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "With unlimited looks the false positive rate goes to 1",
          text:
            "Under the null the test statistic behaves like a random walk with no drift, and such a " +
            "walk crosses any fixed boundary eventually with probability one. \"Run it until it's " +
            "significant\" is guaranteed to succeed on data with no effect whatsoever, given enough " +
            "patience.",
        },
      ],
    },

    {
      heading: "Three legitimate designs",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Fixed sample size — compute n from a power calculation, analyse once at the end. " +
              "Simplest and most powerful per observation, but forfeits early stopping entirely.",
            "Group sequential with alpha spending — pre-specify the number and timing of interim " +
              "looks and allocate the total α across them. O'Brien–Fleming spends very little early " +
              "and nearly all at the end; Pocock spreads it evenly.",
            "Always-valid inference — sequential probability ratio tests, confidence sequences, " +
              "e-values. Constructed so the guarantee holds at every sample size simultaneously, so " +
              "you may look continuously and stop whenever you like.",
          ],
        },
        {
          kind: "table",
          headers: ["Design", "Can stop early?", "Looks allowed", "Cost"],
          rows: [
            ["Fixed n", "No", "One", "None — the efficiency baseline"],
            ["O'Brien–Fleming", "Yes", "Pre-specified schedule", "Small: the final threshold is barely stricter"],
            ["Pocock", "Yes", "Pre-specified schedule", "Moderate: every threshold is stricter"],
            ["Always-valid", "Yes", "Unlimited, continuous", "Largest: widest thresholds throughout"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "You pay for optionality, and it is often worth it",
          text:
            "Sequential designs are less efficient than a fixed-n test at the same power, because " +
            "the thresholds must be stricter to cover the extra looks. What they buy is the ability " +
            "to stop a harmful treatment early, or to cut a losing experiment short — which is " +
            "frequently worth more than the lost efficiency, and in clinical settings is an ethical " +
            "requirement rather than a convenience.",
        },
      ],
    },

    {
      heading: "Worked example: the cost of a daily peek",
      blocks: [
        {
          kind: "example",
          title: "Fourteen looks at α = 0.05",
          problem:
            "An analyst checks a two-week experiment daily and stops at the first p < 0.05. Under " +
            "the null, how often does this procedure reject? Bound it two ways.",
          steps: [
            "Independence bound (an over-estimate, since looks are correlated): 1 − 0.95¹⁴ ≈ 0.51.",
            "Bonferroni-style floor if each look were tested at 0.05/14 ≈ 0.0036, the rate would be ≤ 0.05.",
            "The truth lies between: correlated looks give roughly 0.20–0.30 in simulation.",
          ],
          answer:
            "Somewhere around a quarter of null experiments would be declared significant — four to " +
            "six times the nominal rate. The independence calculation overstates it and the fixed-n " +
            "rate understates it; both bracket the answer usefully.",
        },
        {
          kind: "prose",
          text:
            "The remedy is not to look less anxiously. It is to decide the stopping rule before " +
            "starting, and to use thresholds built for it. A rule chosen in advance — even a " +
            "generous one — is analysable; a rule that emerges from watching the numbers is not.",
        },
      ],
    },
  ],

  references: [
    { source: "Wasserman, All of Statistics", locator: "Ch. 10, Hypothesis Testing and p-values" },
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§8.3, evaluating tests" },
    { source: "Mathlingo assessment bank", locator: "assessments/beyond-a-single-comparison.md" },
  ],
};
