import type { WikiArticle } from "../types";

export const backtestingProtocolWiki: WikiArticle = {
  conceptId: "backtesting-protocol",

  summary:
    "Every quant tests ideas on the same few decades of history, many times over. That makes backtests dangerously easy " +
    "to fool: data that weren't known at the time leak in, the universe quietly keeps only the winners, and the best of " +
    "a thousand variants looks brilliant by luck alone. This lesson collects the hygiene — data, process and strategy " +
    "development — and compares the two standard evaluation schemes, cross-validation and walk-forward. The statistical " +
    "side builds on K-Fold Cross-Validation, Data Leakage and Multiple Testing.",

  sections: [
    {
      heading: "Data",
      blocks: [
        {
          kind: "list",
          items: [
            "**Definition and units**: what exactly is measured, in which currency, over which time unit. Unit errors are astonishingly common.",
            "**Provenance and completeness**: who collected it and how; what is obviously or silently missing.",
            "**Quality assurance and transformations**: how the vendor checks data, imputes, winsorizes and computes end-of-period prices — documented and, ideally, verified.",
            "**Point-in-time versus restated**: use values as known on each date, not later corrections.",
            "**Alternatives and complements**: broader coverage, better sources, data that are more valuable together.",
          ],
        },
      ],
    },
    {
      heading: "Leakage: the rule and its disguises",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "The reference rule",
          text:
            "Never use data in a backtest on a given date that you could not have used in production on that date. Leakage " +
            "is information about returns at $t + 1$ or later in the data used at $t$.",
        },
        {
          kind: "table",
          headers: ["Disguise", "What goes wrong", "Remedy"],
          rows: [
            ["Survivorship bias", "Keeping only stocks alive at the end drops the big losers; survivors are larger, more liquid, higher-momentum", "A point-in-time universe rule, set before testing; write off delistings"],
            ["Financial statements", "Using Q2 numbers from June 30 when they were released in August", "Use the public release date"],
            ["Restatements", "Corrected 10-Qs weren't known at the time", "Point-in-time data, errors included"],
            ["Split-adjusted prices", "A tiny adjusted price long ago reveals later splits, i.e. later strong returns", "Adjusted prices for returns only; as-of prices for features"],
            ["Informative missingness", "Redacted records may be the bad news", "Only use missingness patterns that existed as of the date"],
            ["Off-by-one errors", "A momentum feature that includes tomorrow's return", "Treat implausible ICs as bugs until proven otherwise"],
          ],
        },
      ],
    },
    {
      heading: "Process and strategy development",
      blocks: [
        {
          kind: "list",
          items: [
            "**Have a theory** where possible, and pre-register its predictions: fewer variants tested, results you can interpret and criticise.",
            "**Reproducibility**: document every strategy and be able to rerun it — you can only correct for snooping if you know everything you tried.",
            "**Same setting as production**: same data, optimizer, market-impact model and code.",
            "**Calibrate the impact model** to your own live performance rather than trusting a vendor's.",
            "**Include borrow costs** for shorts (historical rates may need modelling).",
            "**Fix the protocol and dataset beforehand**; change them rarely, for good reason, and then re-evaluate everything. Adding the data that help and dropping the data that hurt is selection on outcomes.",
          ],
        },
      ],
    },
    {
      heading: "Cross-validation versus walk-forward",
      blocks: [
        {
          kind: "table",
          headers: ["", "$K$-fold cross-validation", "Walk-forward"],
          rows: [
            ["Scheme", "Fit on $K - 1$ folds, test on the held-out fold, average; confirm on a final holdout", "Fit on data up to $t$, evaluate at $t + 1$, roll forward (fixed or expanding window)"],
            ["Data efficiency", "High — every period trains a model", "Lower — early periods have little training data"],
            ["Serial dependence", "Ignored unless order is preserved and buffers added", "Respected"],
            ["Leakage", "Likely: a test fold before a training fold leaks through features like momentum", "None by construction"],
            ["Non-stationarity", "Mixes regimes", "Adapts naturally"],
          ],
        },
        {
          kind: "prose",
          text:
            "Paleologo's simulation makes the danger concrete: with $1{,}000$ assets, $500$ purely random characteristics " +
            "and five years of daily data, picking the best characteristic in-sample and cross-validating it produces " +
            "Sharpe ratios with a wide spread around zero — and a sizable fraction “pass” a $1\\%$ significance test. " +
            "Neither scheme handles selection among very many candidates.",
        },
        {
          kind: "example",
          title: "The best of many useless strategies",
          problem: "You backtest $1{,}000$ independent strategies with true Sharpe $0$, each estimated with standard error $0.45$ (five years of data). What is the expected best estimated Sharpe?",
          steps: [
            "The expected maximum of $1{,}000$ independent standard normals is about $3.24$.",
            "Best estimate $\\approx 3.24 \\times 0.45 \\approx 1.46$.",
          ],
          answer: "A Sharpe of nearly $1.5$ from pure noise. A real winner must clear that bar — the problem the Rademacher Anti-Serum solves while also accounting for correlation between strategies.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "What an ideal protocol needs",
          text:
            "Non-anticipative, aware of serial dependence, data-efficient, able to test a very large number of signals, and " +
            "giving finite-sample guarantees. Walk-forward meets the first two, cross-validation the third; neither meets " +
            "the last two.",
        },
      ],
    },
  ],

  references: [
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 4, §4.1 Backtesting Best Practices and §4.2 The Backtesting Protocol" },
    { source: "López de Prado, Advances in Financial Machine Learning", locator: "Ch. 7 and 11, cross-validation and the dangers of backtesting" },
    { source: "Hastie, Tibshirani and Friedman, The Elements of Statistical Learning", locator: "Ch. 7, Model Assessment and Selection" },
  ],
};
