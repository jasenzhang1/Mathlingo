import type { WikiArticle } from "./types";

export const populationVsSampleWiki: WikiArticle = {
  conceptId: "population-vs-sample",
  summary:
    "The population is the complete collection of units you want to draw a conclusion about. The " +
    "sample is the subset you actually observe. Every method in the statistics domain exists because " +
    "those two things are different: we never see the population, so everything we say about it is an " +
    "inference carrying quantifiable uncertainty. Getting the distinction crisp now is what makes " +
    "standard errors, confidence intervals, and p-values mean anything later.",

  sections: [
    {
      heading: "Two collections, one of which you never see",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Population",
              description:
                "The entire set of units the question is about — every bulb in the batch, every " +
                "registered voter, every future visit to the app.",
            },
            {
              term: "Sample",
              description:
                "The subset actually measured. Usually far smaller, and chosen by a procedure that " +
                "matters enormously (see Sampling Methods).",
            },
            {
              term: "Census",
              description:
                "An attempt to measure the entire population. A data-collection strategy, not an " +
                "inferential procedure — a census needs no inference because nothing is left unobserved.",
            },
          ],
        },
        {
          kind: "prose",
          text:
            "The logical structure of all statistical inference follows from this one asymmetry: we " +
            "compute properties of the sample and use them to make claims about properties of the " +
            "population, while quantifying how wrong those claims might be. Nothing else in this " +
            "domain makes sense without that sentence.",
        },
      ],
    },

    {
      heading: "Why not just take a census?",
      blocks: [
        {
          kind: "prose",
          text:
            "Cost and time are the obvious answers, and the least interesting ones. Three others " +
            "matter more, because they make sampling necessary rather than merely convenient.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Measurement is destructive. To learn a bulb's lifespan you run it until it fails. " +
              "A census of 10,000 bulbs destroys the entire batch you were trying to sell.",
            "The population is infinite or hypothetical. “All possible rolls of this die” and " +
              "“all measurements this scale could produce” have no last element to enumerate.",
            "The population is a moving target. “American voters” changes daily as people turn 18, " +
              "move, and die, so even defining it requires fixing a snapshot in time.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "A population need not be people",
          text:
            "A population is any well-defined collection you want to conclude something about. " +
            "Measurement-error models treat “every reading this instrument could ever produce” as the " +
            "population and the readings you took as the sample. The definition is about the question, " +
            "not about whether the units are human or finite.",
        },
      ],
    },

    {
      heading: "Defining the population is a methodological choice",
      blocks: [
        {
          kind: "prose",
          text:
            "Because the population is chosen rather than found, the choice can be contested — and " +
            "different reasonable definitions give genuinely different answers. A pre-election poll " +
            "can define its population as registered voters, eligible voters, or likely voters. Those " +
            "are three different populations, three different true values, and three defensible polls " +
            "that disagree without any of them being wrong.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "“The population” is rarely as obvious as it sounds",
          text:
            "Before comparing two studies, check that they defined the same population. A large share " +
            "of apparent contradictions in published results are two correct answers to two different " +
            "questions.",
        },
      ],
    },

    {
      heading: "Worked example: what population is an A/B test about?",
      blocks: [
        {
          kind: "example",
          title: "An intractable population made tractable",
          problem:
            "A company wants to know what fraction of “all possible users” would click a new button. " +
            "Most of those people have never used the app. What population is the test actually about?",
          steps: [
            "“All possible users” is not a well-defined collection — it has no membership rule and no " +
              "snapshot in time, so no parameter is attached to it.",
            "Redefine it pragmatically: all visits to the app under conditions like today's.",
            "The sample is then the visitors who happened to arrive during the test window.",
            "The inference is from that sample to that population — not to humanity at large.",
          ],
          answer:
            "A/B testing does not escape the population/sample framework; it replaces an undefined " +
            "population with a narrower, well-defined one, and the conclusions inherit that narrowing.",
        },
        {
          kind: "prose",
          text:
            "This is also why an A/B test run only in December, or only on desktop, generalises less " +
            "far than its sample size suggests. The precision comes from n; the reach comes from how " +
            "the population was defined.",
        },
      ],
    },
  ],

  references: [
    { source: "Wasserman, All of Statistics", locator: "Ch. 6, Models, Statistical Inference and Learning" },
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§5.1, Basic Concepts of Random Samples" },
    { source: "Mathlingo assessment bank", locator: "assessments/statistics-foundations.md" },
  ],
};
