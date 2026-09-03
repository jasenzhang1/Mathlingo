import type { WikiArticle } from "./types";

export const dataTypesWiki: WikiArticle = {
  conceptId: "data-types",
  summary:
    "Data comes in four basic types — nominal, ordinal, discrete quantitative, and continuous " +
    "quantitative — and the type is not a bookkeeping detail. It determines which summaries are " +
    "meaningful and which tests are applicable. Arithmetic will happily run on any numeric encoding; " +
    "whether the resulting number means anything is a question about the data type, not about the " +
    "computation.",

  sections: [
    {
      heading: "The four types",
      blocks: [
        {
          kind: "table",
          headers: ["Type", "Has order?", "Meaningful gaps?", "Example", "Typical summary"],
          rows: [
            ["Nominal", "No", "No", "Eye colour, blood type, zip code", "Mode, proportions"],
            ["Ordinal", "Yes", "Not necessarily", "T-shirt size, 1–5 rating", "Median, proportions"],
            ["Discrete quantitative", "Yes", "Yes", "Number of siblings", "Mean, variance"],
            ["Continuous quantitative", "Yes", "Yes", "Height, weight, time", "Mean, variance"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Numeric-looking is not quantitative",
          text:
            "A zip code is nominal. So is a jersey number, a patient ID, and a categorical variable " +
            "encoded as 1/2/3. The digits are labels. Averaging them is computable and meaningless.",
        },
      ],
    },

    {
      heading: "Ordinal data is the awkward middle",
      blocks: [
        {
          kind: "prose",
          text:
            "Ordinal data has order, unlike nominal, but the gaps between adjacent categories are not " +
            "guaranteed to be equal or even comparable. Is the satisfaction difference between " +
            "“1” and “2” the same as between “4” and “5”? Nothing in the data says so. That single " +
            "ambiguity is why computing a mean of ordinal data is a genuinely debated practice rather " +
            "than a settled error.",
        },
        {
          kind: "example",
          title: "The average opinion",
          problem:
            "A researcher codes Disagree = 1, Neutral = 2, Agree = 3, reports the mean as 2.3, and " +
            "calls it “the average opinion.” Critique this.",
          steps: [
            "The mean of 1/2/3 codes treats the scale as equally spaced.",
            "Equal spacing is an assumption about attitudes, not a fact about the coding.",
            "“2.3” implicitly asserts that Neutral sits exactly halfway between Disagree and Agree.",
            "A median response, or the full table of category percentages, needs no such assumption.",
          ],
          answer:
            "Report the median or the distribution of categories. If a mean is used, the equal-spacing " +
            "assumption must be stated and defended, not hidden in the encoding.",
        },
      ],
    },

    {
      heading: "Why the type drives the method",
      blocks: [
        {
          kind: "prose",
          text:
            "A standard deviation, a t-test, and a regression coefficient all assume numeric, ordered, " +
            "meaningfully-spaced values. Applied to nominal categories they return numbers that cannot " +
            "be interpreted. This is the mechanism connecting data type to test selection: the " +
            "chi-square tests exist precisely because categorical data needs its own machinery, and " +
            "the Wilcoxon rank-sum test exists because rank information is sometimes all you can trust.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Two quantitative groups → t-test on the means.",
            "Two categorical variables → chi-square test of independence.",
            "Ordinal or heavily skewed data → a rank-based test such as Wilcoxon.",
            "Counts against a hypothesised distribution → chi-square goodness of fit.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Continuous data is always recorded discretely",
          text:
            "Height is continuous, but it is measured to the nearest centimetre. The continuous/discrete " +
            "distinction is about the model you are entitled to use, not about the precision of the " +
            "recording device.",
        },
      ],
    },
  ],

  references: [
    { source: "Wasserman, All of Statistics", locator: "Ch. 1, Probability and Data" },
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 3, Random Variables and their Distributions" },
    { source: "Mathlingo assessment bank", locator: "assessments/statistics-foundations.md" },
  ],
};
