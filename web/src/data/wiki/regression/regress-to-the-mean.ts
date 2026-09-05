import type { WikiArticle } from "../types";

export const regressToTheMeanWiki: WikiArticle = {
  conceptId: "regress-to-the-mean",

  summary:
    "Regression to the mean is the tendency of an extreme measurement to be followed by a less " +
    "extreme one, for no reason other than that the first measurement contained luck and the luck " +
    "does not repeat. It requires no cause, no intervention, and no change in the underlying " +
    "quantity. Because it looks exactly like a treatment effect, it is the single most common " +
    "source of spurious causal conclusions in applied work — and the reason 'we selected the worst " +
    "performers and they improved' is evidence of almost nothing.",

  sections: [
    {
      heading: "The mechanism",
      blocks: [
        {
          kind: "prose",
          text:
            "Model any measured performance as a stable component plus independent noise. The " +
            "stable part is what the unit is really like; the noise is the day, the weather, the " +
            "questions that happened to come up, the measurement error.",
        },
        {
          kind: "formula",
          latex: "Observed = True + Noise,   Noise₁ ⟂ Noise₂,   E[Noise] = 0",
          caption: "Two measurements of the same unit share the true part but draw fresh noise.",
        },
        {
          kind: "prose",
          text:
            "Now condition on the first observation being extreme. There are two ways to score in " +
            "the top 1%: a genuinely exceptional true value, or a very good true value paired with a " +
            "large favourable noise draw. The second route is more common simply because there are " +
            "far more merely-good units than exceptional ones. So a top-1% observation is, on " +
            "average, sitting on top of a positive noise term. The second measurement redraws the " +
            "noise, which now averages zero — and the observation falls back toward the true value.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "It is selection, not a force",
          text:
            "Nothing pulls the second measurement down. The unit's true ability is unchanged. What " +
            "changed is that you selected on a quantity containing noise, and selection on noise " +
            "cannot be sustained. The same argument runs in reverse for the bottom of the " +
            "distribution: the worst performers were unlucky, and unluck does not repeat either.",
        },
      ],
    },

    {
      heading: "How strong is the effect?",
      blocks: [
        {
          kind: "prose",
          text:
            "The amount of regression is governed entirely by the correlation r between the two " +
            "measurements. In standardised units, the expected second score given the first is:",
        },
        {
          kind: "formula",
          latex: "E[z₂ | z₁] = r · z₁",
          caption: "With |r| < 1, the expected second score is strictly closer to the mean than the first.",
        },
        {
          kind: "table",
          headers: ["Correlation r", "First score (SD above mean)", "Expected second score"],
          rows: [
            ["0.9 (very reliable measure)", "+2.0", "+1.8"],
            ["0.5 (moderately noisy)", "+2.0", "+1.0"],
            ["0.2 (mostly noise)", "+2.0", "+0.4"],
            ["1.0 (no noise at all)", "+2.0", "+2.0 — no regression"],
          ],
          caption:
            "Regression to the mean is not a fixed amount: it is exactly the fraction 1 − r of the way back.",
        },
        {
          kind: "prose",
          text:
            "Two consequences follow. First, the noisier the measure, the more dramatic the " +
            "apparent 'improvement' of selected extremes — so unreliable measures manufacture the " +
            "most convincing fake effects. Second, r = 1 removes the effect entirely, which is why " +
            "deterministic quantities never regress.",
        },
      ],
    },

    {
      heading: "The classic misreadings",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "The flight instructors",
          text:
            "Israeli flight instructors told Kahneman that praising a good landing was followed by " +
            "a worse one, and criticising a bad landing by a better one — concluding that criticism " +
            "works and praise backfires. But an unusually good landing is partly luck, so the next " +
            "one is worse on average whatever the instructor says; an unusually bad one is partly " +
            "bad luck, so the next is better. Both groups regress. The feedback was doing nothing " +
            "the data could detect, and the instructors had been taught the opposite by the noise.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The sophomore slump and the Sports Illustrated jinx",
          text:
            "Rookie of the Year, then a worse second season. On the cover of the magazine, then a " +
            "slump. Both are selection on a peak. No jinx is needed and none has ever been found — " +
            "the athlete was selected precisely because they had just had their luckiest stretch.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The uncontrolled clinical trial",
          text:
            "Enrol patients whose blood pressure is highest, give them anything at all, measure " +
            "again: their average drops. This is why single-arm 'before and after' studies on " +
            "selected extremes are close to uninterpretable, and why the fix is a control group " +
            "selected the same way — the controls regress too, so the difference between arms " +
            "isolates the treatment.",
        },
      ],
    },

    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "A school improvement programme",
          problem:
            "A district gives extra funding to the 10% of schools with the lowest test scores in " +
            "2024. In 2025 those schools' average score rises by 6 points while the district average " +
            "is flat. Is the programme working?",
          steps: [
            "Scores = school quality + year-specific noise (which cohort sat the test, illness, a bad marking day).",
            "Selecting the bottom 10% of the observed distribution selects schools that are genuinely weak AND schools that had an unlucky year.",
            "In 2025 the unlucky ones draw fresh noise, which averages zero, so their scores rise with no change in quality.",
            "The district average being flat is not a control: it includes schools not selected on an extreme, which have nothing to regress from.",
          ],
          answer:
            "Undetermined from this design. The 6-point rise is what regression to the mean alone predicts. The programme's effect can only be separated by randomising among the eligible low-scoring schools, so that treated and untreated schools were selected on the same extreme and regress by the same amount.",
        },
      ],
    },

    {
      heading: "How to avoid being fooled",
      blocks: [
        {
          kind: "list",
          items: [
            "Never select units on an extreme value of the same noisy measure you will use to judge change.",
            "If you must select on an extreme, add a control group selected by the identical rule — regression then affects both arms equally and cancels in the difference.",
            "Randomise. Random assignment is orthogonal to noise, so treated and control units carry the same expected luck.",
            "Where possible, select on one measurement and evaluate on an independent one.",
            "Estimate r between repeated measurements. It tells you in advance how much 'improvement' to expect from nothing at all.",
            "Be most suspicious when the measure is least reliable — that is exactly when the artefact is largest.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The same algebra as the regression line",
          text:
            "E[z₂ | z₁] = r·z₁ is the standardised simple-linear-regression line, and the slope " +
            "β̂₁ = r·(s_Y/s_X) is the same statement in raw units. Galton's discovery and the " +
            "least-squares line are not two facts that happen to share a name: the shrinkage toward " +
            "the mean is what a slope of magnitude less than one, in standardised units, means.",
        },
      ],
    },
  ],

  references: [
    { source: "Kahneman, Thinking, Fast and Slow", locator: "Ch. 17, Regression to the Mean" },
    { source: "Wasserman, All of Statistics", locator: "Ch. 13, Linear Regression" },
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 7, Covariance and Correlation" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-01-foundations.md" },
  ],
};
