import type { WikiArticle } from "../types";

export const structuralBreaksChowTestWiki: WikiArticle = {
  conceptId: "structural-breaks-chow-test",

  summary:
    "A regression fitted over a long sample assumes the coefficients never changed. The Chow test checks that " +
    "assumption at a known date $T^*$: fit the model before and after, and ask whether the split fits significantly " +
    "better than one pooled line. It is just a partial $F$-test on a break dummy interacted with every regressor. " +
    "When the date is chosen by looking at the data, the largest $F$ over all dates needs Andrews' critical values instead.",

  sections: [
    {
      heading: "The test",
      blocks: [
        {
          kind: "formula",
          latex: "F_{\\text{Chow}} = \\frac{(\\text{SSE}_{\\text{pool}} - \\text{SSE}_1 - \\text{SSE}_2)/p}{(\\text{SSE}_1 + \\text{SSE}_2)/(T - 2p)} \\sim F_{p,\\, T - 2p}",
          caption: "$p$ coefficients per regime, $T$ observations, Gaussian errors with the same variance in both regimes.",
        },
        {
          kind: "prose",
          text:
            "Let $d_t = \\mathbb{1}[t > T^*]$. The model $Y_t = \\mathbf{x}_t^T\\boldsymbol{\\beta} + d_t\\mathbf{x}_t^T\\boldsymbol{\\delta} + \\varepsilon_t$ " +
            "fits exactly the two separate regressions, so its SSE is $\\text{SSE}_1 + \\text{SSE}_2$ with $2p$ parameters. " +
            "The pooled fit is the restriction $\\boldsymbol{\\delta} = \\mathbf{0}$, and the Chow statistic is the general linear " +
            "hypothesis $F$-test of that restriction.",
        },
        {
          kind: "example",
          title: "A break in a two-parameter model",
          problem:
            "A line ($p = 2$) is fitted to $T = 60$ observations. Pooled $\\text{SSE} = 120$; before the candidate date $\\text{SSE}_1 = 40$, after it $\\text{SSE}_2 = 50$. Test for a break at the $5\\%$ level ($F_{2,56,0.95} \\approx 3.16$).",
          steps: [
            "Numerator: $(120 - 90)/2 = 15$.",
            "Denominator: $90/(60 - 4) \\approx 1.607$.",
            "$F \\approx 15/1.607 \\approx 9.33 > 3.16$.",
          ],
          answer: "Reject: the coefficients differ before and after the date (provided the date was fixed in advance).",
        },
      ],
    },

    {
      heading: "Unknown break dates",
      blocks: [
        {
          kind: "prose",
          text:
            "If you compute $F(\\tau)$ at every candidate date in a trimmed range and report the largest, you have run many correlated tests. " +
            "$\\sup_\\tau F(\\tau)$ is stochastically much larger than any single $F$, so $F$-tables reject far too often. " +
            "Andrews (1993) derived its limit as the supremum of a squared, normalized Brownian bridge, $\\sup_\\pi \\frac{\\lVert\\mathbf{W}_p(\\pi) - \\pi\\mathbf{W}_p(1)\\rVert^2}{p\\,\\pi(1 - \\pi)}$, " +
            "with critical values that depend on $p$ and the trimming.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Picking the date by eye is data snooping",
          text:
            "A date chosen because the chart “looks different” afterwards has already used the data. Either fix the date from outside information (a regulation change, a strategy going live) or use sup-$F$.",
        },
        {
          kind: "list",
          items: [
            "Unequal error variances across regimes invalidate the classic $F$; use a Wald test with robust variances.",
            "CUSUM tests on recursive residuals monitor for a break without naming a date.",
            "With several breaks, Bai–Perron sequential tests estimate both their number and their dates.",
          ],
        },
      ],
    },

    {
      heading: "What a break means for estimation",
      blocks: [
        {
          kind: "prose",
          text:
            "After a break at $T^*$, an expanding-window estimate at time $t$ is roughly $\\frac{T^*}{t}\\boldsymbol{\\beta}_{\\text{old}} + \\frac{t - T^*}{t}\\boldsymbol{\\beta}_{\\text{new}}$: " +
            "biased toward the old regime for a long time. A rolling window of length $W$ forgets faster but is noisier. " +
            "Pooling regimes also distorts the estimate itself: with a zero-mean factor, the pooled beta is a factor-variance-weighted " +
            "average of the regime betas, so a high-volatility regime counts for more than its share of time.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Breaks and dummy variables",
          text:
            "The Chow test is the same machinery as comparing regression lines with dummy variables: the break date defines the groups. Testing only the intercept dummy asks whether the level shifted; interacting every slope asks whether the whole relationship did.",
        },
      ],
    },
  ],

  references: [
    { source: "Chow, “Tests of Equality Between Sets of Coefficients in Two Linear Regressions”, Econometrica 1960", locator: "The original test" },
    { source: "Andrews, “Tests for Parameter Instability and Structural Change with Unknown Change Point”, Econometrica 1993", locator: "The sup-F test and its critical values" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§6.4, Comparing Straight Lines" },
  ],
};
