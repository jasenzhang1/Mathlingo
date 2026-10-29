import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./qi-shared";

/**
 * Quantitative Investing, part 5: backtesting best practices, the Rademacher
 * Anti-Serum, and evaluating risk models (Paleologo, Ch. 4–5). Forty
 * questions per lesson, four at each level.
 */

// ---------------------------------------------------------------------------
// backtesting-protocol
// ---------------------------------------------------------------------------
const BT = "backtesting-protocol";
const backtesting: Item[] = [
  // level 1
  mcq(m(BT, "recall-leakage", "recall", 1, 15, "Data leakage in a backtest is:"),
    "Information about returns at $t + 1$ or later being present in the data used at time $t$",
    [
      ["Missing data in the backtest", "leak-missing", "Missingness is a separate (though related) problem."],
      ["Using too little data", "leak-little", "Leakage is about what the data contain, not how much."],
      ["Trading costs being ignored", "leak-costs", "That is unrealistic cost modelling."],
    ]),
  mcq(m(BT, "recall-survivorship", "recall", 1, 15, "Survivorship bias arises when a backtest:"),
    "Uses only stocks that are still trading at the end of the period",
    [
      ["Uses only stocks listed at the start", "surv-start", "Point-in-time membership is the remedy, not the bias."],
      ["Includes delisted stocks", "surv-include", "Including them avoids the bias."],
      ["Uses too short a history", "surv-short", "Short histories cause noise, not survivorship bias."],
    ]),
  mcq(m(BT, "recall-walk-forward", "recall", 1, 15, "A walk-forward backtest:"),
    "Fits on data up to period $t$ and evaluates on period $t + 1$, rolling forward through time",
    [
      ["Randomly shuffles periods into folds", "wf-shuffle", "That is $K$-fold cross-validation."],
      ["Fits once on all the data", "wf-all", "That is an in-sample fit."],
      ["Evaluates on periods before the training data", "wf-backward", "Walk-forward is never anticipative."],
    ]),
  mcq(m(BT, "recall-point-in-time", "recall", 1, 15, "Point-in-time data means:"),
    "Values as they were known on each date, without later corrections or restatements",
    [
      ["The latest corrected values for every date", "pit-restated", "Restated data leak information into the past."],
      ["Data sampled once per day", "pit-frequency", "It's about vintage, not frequency."],
      ["Data available only intraday", "pit-intraday", "It's about what was known when."],
    ]),
  // level 2
  num(m(BT, "apply-false-positive", "apply", 2, 25, "You test $20$ independent useless signals, each at the $5\\%$ significance level. Find the probability that at least one looks significant. Give $4$ decimal places."), 0.6415),
  num(m(BT, "apply-ic-sharpe", "apply", 2, 25, "A daily signal has information coefficient $0.01$ across $N = 1{,}000$ stocks. Using $\\text{SR} \\approx \\text{IC}\\sqrt{252N}$, find its annualised Sharpe ratio. Give $2$ decimal places."), 5.02),
  num(m(BT, "apply-five-fold", "apply", 2, 20, "In $5$-fold cross-validation, how many times is the model fitted?"), 5),
  mcq(m(BT, "apply-statement-date", "apply", 2, 20, "A company's Q2 earnings are released on August 7. In a backtest, the data should first be usable:"),
    "On August 7 (or the next trading day), when they became public",
    [
      ["On June 30, the end of the quarter", "stmt-quarter-end", "The numbers weren't known yet."],
      ["On July 1", "stmt-next-quarter", "That still precedes the release."],
      ["A fixed $30$ days after quarter end", "stmt-fixed-lag", "Fixed lags can precede actual release dates."],
    ]),
  // level 3
  num(m(BT, "apply-bonferroni", "apply", 3, 25, "To keep a family-wise false-positive rate of $5\\%$ across $100$ independent one-sided tests with Bonferroni, find the $z$-score threshold each test needs. Give $2$ decimal places."), 3.29),
  num(m(BT, "apply-max-normal", "apply", 3, 30, "The expected maximum of $100$ independent standard normals is about $2.51$. If each of $100$ useless strategies has an estimated Sharpe with standard error $0.45$, find the expected best estimated Sharpe. Give $2$ decimal places."), 1.13),
  mcq(m(BT, "apply-split-adjust", "apply", 3, 25, "Why should split-adjusted prices $\\textbf{NOT}$ be used to build predictive features?"),
    "A low adjusted price far in the past reveals that the stock was later split, usually after strong returns — future information",
    [
      ["Adjusted prices are less accurate", "split-accuracy", "They are fine for returns; the problem is look-ahead in features."],
      ["Splits change a company's value", "split-value", "Splits don't change value."],
      ["Adjusted prices ignore dividends", "split-dividends", "That's a different adjustment."],
    ]),
  mcq(m(BT, "apply-delisting", "apply", 3, 25, "A conservative backtest rule for a stock that is delisted while held is to:"),
    "Assume a severe loss, e.g. that the position is written off",
    [
      ["Drop the stock from the backtest entirely", "delist-drop", "That reintroduces survivorship bias."],
      ["Assume it was sold at the last price", "delist-last", "Delisted stocks often can't be sold there."],
      ["Assume it returns the market", "delist-market", "Delistings are usually bad news."],
    ]),
  // level 4
  num(m(BT, "apply-sharpe-se", "apply", 4, 40, "A strategy's daily Sharpe ratio is $0.1$, estimated from $T = 1{,}250$ days. Lo's standard error is $\\sqrt{\\frac{1 + \\text{SR}^{2}/2}{T}}$. Find the standard error of the annualised Sharpe (multiply by $\\sqrt{252}$). Give $2$ decimal places."), 0.45),
  num(m(BT, "apply-fifty-tests", "apply", 4, 35, "Fifty independent useless strategies are each tested at the $1\\%$ level. Find the probability at least one passes. Give $3$ decimal places."), 0.395),
  num(m(BT, "apply-years-needed", "apply", 4, 40, "The standard error of an annualised Sharpe ratio is roughly $\\frac{1}{\\sqrt{Y}}$ for $Y$ years of data (small Sharpe). How many years are needed for a two-standard-error test to detect a true Sharpe of $0.5$?"), 16),
  mcq(m(BT, "apply-cv-leak", "apply", 4, 35, "In $K$-fold cross-validation with a momentum feature, a test fold that precedes a training fold in time causes leakage because:"),
    "The training fold's momentum features are built from returns in the test fold, the very targets being predicted",
    [
      ["Folds have different sizes", "cvleak-size", "Size is irrelevant."],
      ["Momentum is not predictive", "cvleak-predictive", "Leakage happens whether or not momentum works."],
      ["The test fold is too small", "cvleak-small", "The problem is overlap of information."],
    ]),
  // level 5
  short(m(BT, "explain-survivorship", "explain", 5, 120, "Explain how survivorship bias inflates backtested performance and how to remove it."),
    [
      ["mechanism", "Stocks are mostly delisted after large losses; keeping only survivors tilts the universe toward winners (larger, more liquid, higher momentum)", 2, true],
      ["remedy", "Define the universe by a point-in-time rule applicable on each date, and apply a conservative return to delistings", 2, true],
    ]),
  mcq(m(BT, "apply-restated", "apply", 5, 30, "A 10-Q is restated a year later to correct a material error. A point-in-time backtest should use:"),
    "The original, erroneous figures until the restatement date",
    [
      ["The corrected figures from the start", "restated-corrected", "That is look-ahead: the correction wasn't known."],
      ["Neither version", "restated-neither", "The original was the information available."],
      ["The average of the two", "restated-average", "Nobody knew the average either."],
    ]),
  mcq(m(BT, "apply-same-setting", "apply", 5, 30, "Which practice best aligns backtested and live PnL?"),
    "Using the same data, optimizer, market-impact model and code in backtest and production, with the impact model calibrated to live trading",
    [
      ["Using a simpler optimizer in the backtest", "setting-simpler", "Differences in setting cause divergence."],
      ["Ignoring borrow costs in the backtest", "setting-borrow", "Borrow costs can materially reduce short-side PnL."],
      ["Taking the vendor impact model at face value", "setting-vendor", "It should be calibrated to your own live performance."],
    ]),
  num(m(BT, "apply-ic-breadth", "apply", 5, 35, "Using $\\text{SR} \\approx \\text{IC}\\sqrt{252N}$, what daily IC gives an annualised Sharpe of $2$ on $N = 400$ stocks? Give $4$ decimal places."), 0.0063),
  // level 6
  short(m(BT, "explain-cv-vs-wf", "explain", 6, 150, "Compare cross-validation and walk-forward backtesting for trading strategies."),
    [
      ["cv", "Cross-validation uses all data for training (good when many models are compared), but ignores serial dependence and risks leakage when test folds precede training folds", 2, true],
      ["wf", "Walk-forward is non-anticipative, mimics production and adapts to non-stationarity, but trains on less data and delays evaluation", 2, true],
    ]),
  num(m(BT, "apply-pass-threshold", "apply", 6, 40, "A daily-Sharpe test requires $\\text{SR} > 2.3\\sqrt{\\frac{1 + \\text{SR}^{2}/2}{T}}$. For $T = 1{,}250$ and small SR, approximate the threshold daily Sharpe. Give $4$ decimal places."), 0.0651),
  num(m(BT, "apply-max-of-ten", "apply", 6, 40, "The expected maximum of $10$ independent standard normals is $1.539$. Ten useless strategies have Sharpe estimates with standard error $0.5$. Find the expected best estimate. Give $2$ decimal places."), 0.77),
  mcq(m(BT, "apply-theory", "apply", 6, 35, "Having an economic theory before testing a characteristic helps mainly because it:"),
    "Narrows the set of variants tested, reducing data snooping, and makes results interpretable and criticisable",
    [
      ["Guarantees the factor will work", "theory-guarantee", "Theories can be wrong."],
      ["Removes the need for a backtest", "theory-no-test", "Backtests are still required."],
      ["Increases in-sample Sharpe", "theory-sharpe", "It reduces overfitting, not in-sample fit."],
    ]),
  // level 7
  short(m(BT, "explain-protocol-fixed", "explain", 7, 150, "Why should the backtesting protocol and the dataset be fixed in advance, and what should you do if the protocol changes?"),
    [
      ["snooping", "Changing rules or data after seeing results is a hidden form of multiple testing that inflates performance", 2, true],
      ["change", "Change it rarely and for good reason, then rerun and re-evaluate all strategies under the new protocol", 2, true],
    ]),
  num(m(BT, "apply-t-plus-one", "apply", 7, 45, "A $63$-day momentum signal for day $t$ is mistakenly built from returns over days $t - 61$ to $t + 1$ instead of $t - 62$ to $t$. How many days of the very return it is meant to predict (day $t + 1$) does the feature contain?"), 1),
  num(m(BT, "apply-max-thousand", "apply", 7, 45, "The expected maximum of $1{,}000$ standard normals is $3.24$. With $1{,}000$ useless strategies and a Sharpe standard error of $0.45$, find the expected best estimated Sharpe. Give $2$ decimal places."), 1.46),
  mcq(m(BT, "apply-missingness", "apply", 7, 40, "In an unstructured dataset, some records were redacted because they contained sensitive (often negative) information. Using the presence of data as a feature:"),
    "Can leak information, since missingness itself is informative about future returns",
    [
      ["Is always safe", "miss-safe", "Redaction can correlate with future outcomes."],
      ["Only adds noise", "miss-noise", "It can add look-ahead signal, which is worse."],
      ["Is required for completeness", "miss-required", "It should be used only if the pattern existed as-of-date."],
    ]),
  // level 8
  short(m(BT, "explain-simulation", "explain", 8, 150, "In a simulation with $p = 500$ random, useless characteristics and five years of data, the best in-sample characteristic often shows a large cross-validated Sharpe. Explain why, and what it implies."),
    [
      ["selection", "Selecting the best of many noisy candidates picks the one whose noise happened to align with returns; its estimate is biased upward", 2, true],
      ["implication", "Reported performance must be adjusted for the number (and dependence) of strategies tested — the motivation for multiple-testing corrections and the RAS haircut", 2, true],
    ]),
  num(m(BT, "apply-se-after-selection", "apply", 8, 50, "Two independent useless strategies each have estimated annual Sharpe with standard error $0.5$. The expected maximum of two standard normals is $\\frac{1}{\\sqrt{\\pi}}$. Find the expected Sharpe of the better one. Give $4$ decimal places."), 0.2821),
  num(m(BT, "apply-borrow-drag", "apply", 8, 40, "A long-short strategy is short $\\$100$M on average and pays an average borrow fee of $0.8\\%$ a year. Find the annual borrow cost in millions."), 0.8),
  mcq(m(BT, "apply-wf-variants", "apply", 8, 40, "Compared with an expanding training window, a fixed-length rolling window in walk-forward:"),
    "Keeps the estimation comparable over time and adapts faster to change, at the cost of less data",
    [
      ["Always uses more data", "wfvar-more", "Expanding windows use more data."],
      ["Leaks future information", "wfvar-leak", "Both are non-anticipative."],
      ["Cannot be used with daily data", "wfvar-daily", "It works at any frequency."],
    ]),
  // level 9
  short(m(BT, "design-research-hygiene", "transfer", 9, 180, "List the checks you would run before trusting a new alternative-data signal with a backtested Sharpe of $3$."),
    [
      ["data", "Data checks: definitions and units, provenance, point-in-time availability and release lags, coverage and missingness, vendor transformations", 2, true],
      ["process", "Process checks: walk-forward with realistic costs and borrow, count of variants tried (snooping haircut), stability across periods, a theory for why it works", 2, true],
    ]),
  short(m(BT, "explain-avoidable", "explain", 9, 150, "A characteristic shows an implausibly high IC. Give two “avoidable mistake” explanations Paleologo mentions, and how to catch them."),
    [
      ["examples", "E.g. the field was really a split-conversion factor, or an off-by-one ($t$ vs $t + 1$) error put the next day's return inside the feature", 2, true],
      ["catch", "Sanity-check implausible results: inspect the data's meaning, lag features, and test whether the IC vanishes when the timing is shifted", 2, true],
    ]),
  num(m(BT, "apply-fwer-sidak", "apply", 9, 60, "Using the Šidák correction, find the per-test significance level that keeps the family-wise error at $5\\%$ across $20$ independent tests. Give $5$ decimal places."), 0.00256),
  mcq(m(BT, "apply-correlated-tests", "apply", 9, 40, "You test $1{,}000$ strategies that are minor parameter variations of one idea (highly correlated). Compared with $1{,}000$ independent strategies, the data-snooping penalty should be:"),
    "Much smaller, because correlated strategies add few effective trials",
    [
      ["The same", "corr-same", "Dependence reduces the effective number of trials."],
      ["Larger", "corr-larger", "Near-duplicates add little opportunity to fit noise."],
      ["Zero", "corr-zero", "There is still more than one effective trial."],
    ]),
  // level 10
  short(m(BT, "judge-ideal-protocol", "transfer", 10, 180, "List the properties an ideal backtesting protocol should have, and which ones cross-validation and walk-forward each satisfy."),
    [
      ["properties", "Non-anticipative (no leakage), handles serial dependence, uses data efficiently, allows testing very many signals, and gives finite-sample guarantees", 2, true],
      ["coverage", "Walk-forward gives the first two; cross-validation uses data efficiently; neither handles massive multiple testing with finite-sample bounds", 2, true],
    ]),
  short(m(BT, "judge-reproducibility", "transfer", 10, 180, "Why do reproducibility and running all candidate strategies in parallel to production matter for a quant team's statistics, not just its engineering?"),
    [
      ["count", "You can only correct for data snooping if you know every strategy that was tried; undocumented variants make the true number of trials unknown", 2, true],
      ["evidence", "Parallel live tracking gives genuinely out-of-sample evidence and lets you recompute haircuts as the strategy set grows", 2, true],
    ]),
  num(m(BT, "apply-snooping-margin", "apply", 10, 90, "A team tested $1{,}000$ independent variants; the winner shows an annualised Sharpe of $1.6$ with standard error $0.45$. Subtracting the expected best-of-$1{,}000$ noise level ($3.24$ standard errors), find the remaining Sharpe. Give $2$ decimal places."), 0.14),
  mcq(m(BT, "judge-new-data", "transfer", 10, 60, "A researcher adds a new dataset to a backtest only because it improves the results, and drops one that hurt them. This is:"),
    "A selection bias that inflates performance, like changing the protocol after seeing results",
    [
      ["Good practice: use the best data", "newdata-good", "Selecting data on results is data snooping."],
      ["Harmless if the data are accurate", "newdata-harmless", "Accuracy doesn't fix selection on outcomes."],
      ["Required by point-in-time rules", "newdata-pit", "Point-in-time is about timing, not selection."],
    ]),
];

// ---------------------------------------------------------------------------
// rademacher-anti-serum
// ---------------------------------------------------------------------------
const RA = "rademacher-anti-serum";
const ras: Item[] = [
  // level 1
  mcq(m(RA, "recall-matrix", "recall", 1, 15, "The input to the Rademacher Anti-Serum is:"),
    "A $T \\times N$ matrix $\\mathbf{X}$ of walk-forward performance (standardized returns or ICs) for $N$ strategies over $T$ periods",
    [
      ["The covariance matrix of asset returns", "rasinput-cov", "RAS works on strategy performance, not asset covariances."],
      ["A single strategy's return series", "rasinput-single", "It handles many strategies at once."],
      ["The in-sample fitted parameters", "rasinput-params", "It uses walk-forward performance."],
    ]),
  mcq(m(RA, "recall-rademacher", "recall", 1, 15, "A Rademacher vector $\\boldsymbol{\\epsilon}$ has entries that are:"),
    "Independent, each $+1$ or $-1$ with probability $\\frac{1}{2}$",
    [
      ["Standard normal", "rv-normal", "Those would be Gaussian, not Rademacher."],
      ["All equal to $1$", "rv-ones", "Random signs are the point."],
      ["Uniform on $[0, 1]$", "rv-uniform", "Entries are $\\pm 1$."],
    ]),
  mcq(m(RA, "recall-haircut", "recall", 1, 15, "RAS provides:"),
    "A lower bound on every strategy's true performance that holds simultaneously with high probability",
    [
      ["An unbiased estimate of each Sharpe ratio", "hc-unbiased", "It gives a conservative bound, not an unbiased estimate."],
      ["A p-value for one strategy", "hc-pvalue", "It covers all strategies at once."],
      ["The optimal portfolio weights", "hc-weights", "It is an evaluation tool."],
    ]),
  mcq(m(RA, "recall-two-terms", "recall", 1, 15, "The RAS haircut has two parts:"),
    "A data-snooping term $2\\hat{R}$ and an estimation-error term",
    [
      ["A bias term and a trading-cost term", "terms-cost", "Costs are in the backtest itself."],
      ["A market term and an idiosyncratic term", "terms-factor", "That's a risk decomposition."],
      ["A skewness term and a kurtosis term", "terms-moments", "The bound is distribution-free in that sense."],
    ]),
  // level 2
  num(m(RA, "apply-snoop", "apply", 2, 20, "A set of strategies has empirical Rademacher complexity $\\hat{R} = 0.03$. Find the data-snooping part of the haircut, $2\\hat{R}$."), 0.06),
  num(m(RA, "apply-sqrt-term", "apply", 2, 25, "Find $\\sqrt{\\frac{2\\log(2/\\delta)}{T}}$ for $\\delta = 0.01$ and $T = 2{,}500$. Give $4$ decimal places."), 0.0651),
  num(m(RA, "apply-identical", "apply", 2, 20, "You test one strategy duplicated a million times. Find the empirical Rademacher complexity of this set, given that for a single strategy it is $\\mathbb{E}_\\epsilon\\left[\\frac{1}{T}\\sum_t \\epsilon_t x_t\\right]$."), 0),
  mcq(m(RA, "apply-dependence", "apply", 2, 20, "Adding many uncorrelated strategies to the tested set makes $\\hat{R}$:"),
    "Larger — more ways to fit random noise",
    [
      ["Smaller", "dep-smaller", "More distinct strategies can only raise the supremum."],
      ["Unchanged", "dep-unchanged", "The supremum is over a larger set."],
      ["Zero", "dep-zero", "It can't fall."],
    ]),
  // level 3
  num(m(RA, "apply-sharpe-bound", "apply", 3, 30, "The RAS Sharpe bound is $\\theta_n \\ge \\hat{\\theta}_n - 2\\hat{R} - 3\\sqrt{\\frac{2\\log(2/\\delta)}{T}} - \\sqrt{\\frac{2\\log(2N/\\delta)}{T}}$ (daily units). With $\\hat{\\theta}_n = 0.5$, $\\hat{R} = 0.02$, and the two error terms equal to $0.195$ and $0.124$, find the lower bound. Give $3$ decimal places."), 0.141),
  num(m(RA, "apply-annualise", "apply", 3, 25, "A daily Sharpe haircut of $0.31$ corresponds to what annualised haircut (multiply by $\\sqrt{252}$)? Give $2$ decimal places."), 4.92),
  mcq(m(RA, "apply-uniform", "apply", 3, 25, "The RAS haircut is “uniform”, meaning:"),
    "The same amount is subtracted from every strategy's estimate",
    [
      ["Each strategy gets its own haircut", "uniform-own", "The bound applies one haircut to all."],
      ["Returns are uniformly distributed", "uniform-dist", "No such assumption is made."],
      ["The haircut is constant across $T$", "uniform-T", "It shrinks with $T$."],
    ]),
  mcq(m(RA, "apply-finite", "apply", 3, 25, "The RAS bound holds:"),
    "For any finite $T$, with no asymptotic approximation",
    [
      ["Only as $T \\to \\infty$", "finite-asymptotic", "It is a finite-sample bound."],
      ["Only for Gaussian returns", "finite-gaussian", "It needs boundedness or sub-Gaussian tails, not normality."],
      ["Only for one strategy", "finite-one", "It holds uniformly over all $N$."],
    ]),
  // level 4
  num(m(RA, "apply-full-bound", "apply", 4, 45, "Compute the RAS estimation error $3\\sqrt{\\frac{2\\log(2/\\delta)}{T}} + \\sqrt{\\frac{2\\log(2N/\\delta)}{T}}$ for $\\delta = 0.01$, $T = 2{,}500$, $N = 10^{6}$. Give $2$ decimal places."), 0.32),
  num(m(RA, "apply-full-bound-small", "apply", 4, 45, "Compute the same estimation error for $\\delta = 0.05$, $T = 2{,}500$, $N = 1{,}000$. Give $3$ decimal places."), 0.255),
  num(m(RA, "apply-ic-error", "apply", 4, 35, "For signals with $|x_{t,n}| \\le \\kappa$, the estimation term scales to $\\kappa\\sqrt{\\frac{2\\log(2/\\delta)}{T}}$. With $\\kappa = 0.02$, $\\delta = 0.01$ and $T = 2{,}500$, find it. Give $4$ decimal places."), 0.0013),
  mcq(m(RA, "apply-block", "apply", 4, 30, "RAS assumes i.i.d. rows of $\\mathbf{X}$. If a strategy's performance is autocorrelated up to lag $s$, the recommended fix is to:"),
    "Replace the series with non-overlapping averages over blocks of length $s$",
    [
      ["Ignore the autocorrelation", "block-ignore", "That would understate the error."],
      ["Shuffle the rows", "block-shuffle", "Shuffling destroys the dependence structure without accounting for it."],
      ["Use cross-validation instead", "block-cv", "That doesn't fix the dependence."],
    ]),
  // level 5
  short(m(RA, "explain-covariance-noise", "explain", 5, 120, "Interpret $\\hat{R} = \\mathbb{E}_\\epsilon\\left[\\sup_n \\frac{1}{T}\\sum_t \\epsilon_t x_{t,n}\\right]$ as a covariance with noise."),
    [
      ["noise", "$\\boldsymbol{\\epsilon}$ is a random $\\pm 1$ series; $\\frac{1}{T}\\sum_t \\epsilon_t x_{t,n}$ is how well strategy $n$ covaries with it", 2, true],
      ["meaning", "If for most random sign sequences some strategy covaries well, the set can “fit anything” — its good backtests are likely luck", 2, true],
    ]),
  mcq(m(RA, "apply-two-way-cv", "apply", 5, 30, "With about half of the $\\epsilon_t$ equal to $+1$, $\\frac{1}{T}\\sum_t\\epsilon_t x_{t,n}$ is proportional to:"),
    "The difference between strategy $n$'s average performance on two random halves of the sample",
    [
      ["The strategy's total performance", "twoway-total", "The signs split the sample in two."],
      ["The strategy's volatility", "twoway-vol", "It's a difference of means."],
      ["Zero always", "twoway-zero", "Only in expectation for a single strategy."],
    ]),
  num(m(RA, "apply-massart", "apply", 5, 40, "For $N$ strategies with $|x_{t,n}| \\le 1$, Massart's lemma gives $\\hat{R} \\le \\sqrt{\\frac{2\\log N}{T}}$. Find the bound for $N = 1{,}000$ and $T = 2{,}500$. Give $4$ decimal places."), 0.0743),
  mcq(m(RA, "apply-snoop-T", "apply", 5, 30, "As $T \\to \\infty$ with a fixed set of strategies, the estimation term:"),
    "Goes to zero",
    [
      ["Grows without bound", "snoopT-grow", "It shrinks like $\\frac{1}{\\sqrt{T}}$."],
      ["Stays constant", "snoopT-constant", "It depends on $T$."],
      ["Becomes negative", "snoopT-negative", "It is non-negative."],
    ]),
  // level 6
  short(m(RA, "explain-span", "explain", 6, 150, "Interpret the Rademacher complexity geometrically, as a measure of how much the strategy vectors span $\\mathbb{R}^{T}$."),
    [
      ["geometry", "With standardized returns, each strategy is a vector of norm about $\\sqrt{T}$; $\\boldsymbol{\\epsilon}$ is a random direction; $\\hat{R}$ is the expected best cosine between them", 2, true],
      ["dependence", "Copies of one vector span little (low $\\hat{R}$); many orthogonal vectors cover many directions (high $\\hat{R}$, more overfitting risk)", 2, true],
    ]),
  num(m(RA, "apply-two-strategies", "apply", 6, 50, "Two strategies over $T = 2$ periods have performance $x_1 = [1, 1]$ and $x_2 = [1, -1]$. Compute $\\hat{R} = \\mathbb{E}_\\epsilon\\left[\\max_n \\frac{1}{2}\\sum_t \\epsilon_t x_{t,n}\\right]$ over the four equally likely sign vectors."), 0.5),
  num(m(RA, "apply-duplicate-pair", "apply", 6, 45, "Two identical strategies with $x = [1, 1]$ over $T = 2$ periods. Compute $\\hat{R}$ over the four sign vectors."), 0),
  mcq(m(RA, "apply-lo-compare", "apply", 6, 35, "Compared with Lo's standard error for a single strategy's Sharpe, the RAS estimation term for a million strategies is:"),
    "Looser (larger), because it holds uniformly over all strategies and uses simple constants",
    [
      ["Always tighter", "lo-tighter", "The book notes it is a loose bound."],
      ["Identical", "lo-identical", "They answer different questions."],
      ["Not comparable in units", "lo-units", "Both are in Sharpe units."],
    ]),
  // level 7
  short(m(RA, "explain-why-walk-forward", "explain", 7, 150, "Why must the strategies fed to RAS be backtested walk-forward, with parameters tuned only on past data?"),
    [
      ["assumption", "The bound treats each column as the out-of-sample performance of a fixed strategy; in-sample fitting would leak information and invalidate it", 2, true],
      ["complete", "And every strategy tried must be included, otherwise $\\hat{R}$ understates the true snooping", 1, true],
    ]),
  num(m(RA, "apply-orthogonal-three", "apply", 7, 50, "Three strategies over $T = 2$: $x_1 = [1, 1]$, $x_2 = [1, -1]$, $x_3 = [-1, 1]$. Compute $\\hat{R} = \\mathbb{E}_\\epsilon\\left[\\max_n \\frac{1}{2}\\sum_t \\epsilon_t x_{t,n}\\right]$."), 0.75),
  num(m(RA, "apply-scaled", "apply", 7, 40, "If every entry of $\\mathbf{X}$ is multiplied by $0.5$, by what factor does $\\hat{R}$ change?"), 0.5),
  mcq(m(RA, "apply-signals-bound", "apply", 7, 40, "For ICs, the boundedness $|x_{t,n}| \\le 1$ holds because:"),
    "Each IC is a correlation",
    [
      ["Returns are bounded", "icb-returns", "Returns are not bounded by $1$ in general."],
      ["Signals are z-scored", "icb-zscore", "Z-scores are unbounded."],
      ["The number of stocks is finite", "icb-finite", "Correlations lie in $[-1, 1]$ regardless."],
    ]),
  // level 8
  short(m(RA, "explain-proof-idea", "explain", 8, 150, "Sketch the two main steps behind the RAS bound."),
    [
      ["concentration", "McDiarmid's inequality: $\\sup_n |\\hat{\\theta}_n - \\theta_n|$ concentrates around its mean, since changing one period moves it by at most $\\frac{2a}{T}$", 2, true],
      ["symmetrization", "Symmetrization with a ghost sample and Rademacher signs bounds that mean by $2R$; a second McDiarmid step replaces $R$ by its empirical $\\hat{R}$, and a union bound combines them", 2, true],
    ]),
  num(m(RA, "apply-mcdiarmid", "apply", 8, 45, "McDiarmid: if changing any one of $T$ inputs moves $f$ by at most $c$, then $P(f - \\mathbb{E}f > \\varepsilon) \\le \\exp\\left(-\\frac{2\\varepsilon^{2}}{Tc^{2}}\\right)$. With $c = \\frac{2}{T}$, $T = 2{,}500$ and $\\varepsilon = 0.05$, find the bound. Give $4$ decimal places."), 0.0439),
  num(m(RA, "apply-annual-ras", "apply", 8, 45, "A strategy's estimated daily Sharpe is $0.15$; $\\hat{R} = 0.01$ and the estimation term is $0.08$. Find the RAS lower bound on its annualised Sharpe. Give $2$ decimal places."), 0.79),
  mcq(m(RA, "apply-sub-gaussian", "apply", 8, 40, "For Sharpe analysis the standardized returns are unbounded, so RAS instead assumes they are:"),
    "Sub-Gaussian, which adds a $\\sqrt{\\frac{2\\log(2N/\\delta)}{T}}$ term to the error",
    [
      ["Bounded by $1$", "subg-bounded", "Standardized returns aren't bounded."],
      ["Exactly Gaussian", "subg-gaussian", "Sub-Gaussian is weaker."],
      ["Uniformly distributed", "subg-uniform", "No such assumption."],
    ]),
  // level 9
  short(m(RA, "transfer-apply-ras", "transfer", 9, 180, "Your team has $50{,}000$ walk-forward strategy variants over $10$ years of daily data. Describe how you would apply RAS and interpret a result where the best strategy's lower bound is negative."),
    [
      ["procedure", "Build $\\mathbf{X}$ of standardized daily returns, check autocorrelation (block if needed), compute $\\hat{\\theta}$, estimate $\\hat{R}$ by averaging the sup over many random sign vectors, and subtract both haircut terms", 2, true],
      ["interpret", "A negative bound means the data can't rule out zero true Sharpe for that strategy at confidence $1 - \\delta$ — not that it is worthless, but that evidence is insufficient", 2, true],
    ]),
  short(m(RA, "explain-dependence-benefit", "explain", 9, 150, "Why is it an advantage that RAS accounts for dependence between strategies, compared with Bonferroni?"),
    [
      ["bonferroni", "Bonferroni treats $N$ tests as independent, so highly correlated variants are penalised as if each were a new idea — far too conservative", 2, true],
      ["ras", "$\\hat{R}$ grows only with the effective diversity of the set, so near-duplicates cost almost nothing", 2, true],
    ]),
  num(m(RA, "apply-T-needed", "apply", 9, 60, "For the term $\\sqrt{\\frac{2\\log(2/\\delta)}{T}}$ with $\\delta = 0.01$ to fall to $0.03$, find the smallest whole $T$."), 11775),
  mcq(m(RA, "apply-snoop-persist", "apply", 9, 40, "Paleologo notes that the data-snooping term $2\\hat{R}$:"),
    "Does not vanish as $T$ grows, unlike the estimation term",
    [
      ["Vanishes as $T$ grows", "persist-vanish", "He notes it does not go to zero."],
      ["Equals the estimation term", "persist-equal", "They are distinct terms."],
      ["Is always negative", "persist-negative", "It is non-negative."],
    ]),
  // level 10
  short(m(RA, "judge-vs-lo", "transfer", 10, 180, "A colleague prefers to report each strategy's Sharpe with Lo's standard error instead of RAS. When is that adequate and when is it misleading?"),
    [
      ["adequate", "Adequate for a single, pre-specified strategy tested once", 2, true],
      ["misleading", "Misleading when the strategy was selected from many: the reported Sharpe is biased up and its standard error ignores the selection, which RAS accounts for", 2, true],
    ]),
  short(m(RA, "judge-signal-set", "transfer", 10, 180, "How would you design the set of candidate signals to keep the RAS haircut small without fooling yourself?"),
    [
      ["theory", "Generate fewer, theory-driven candidates and avoid scanning huge unstructured parameter grids", 2, true],
      ["honesty", "But include every variant actually tried; pruning tried variants from $\\mathbf{X}$ would shrink $\\hat{R}$ dishonestly", 2, true],
    ]),
  num(m(RA, "apply-full-example", "apply", 10, 90, "A best strategy has estimated daily Sharpe $0.12$ over $T = 2{,}500$ days, tested among $N = 10{,}000$ variants with $\\hat{R} = 0.015$. With $\\delta = 0.05$, compute the RAS lower bound $\\hat{\\theta} - 2\\hat{R} - 3\\sqrt{\\frac{2\\log(2/\\delta)}{T}} - \\sqrt{\\frac{2\\log(2N/\\delta)}{T}}$ in daily units. Give $3$ decimal places."), -0.175),
  mcq(m(RA, "judge-negative-bound", "transfer", 10, 60, "Given that the book calls the Sharpe estimation term loose, the most sensible use of RAS in practice is:"),
    "As a conservative screen and a way to compare strategy sets, alongside other evidence, not as a precise Sharpe forecast",
    [
      ["As the exact expected live Sharpe", "negb-exact", "It is a high-probability lower bound."],
      ["To reject every strategy with a negative bound forever", "negb-reject", "Evidence can accumulate with more data."],
      ["Only for sets of fewer than ten strategies", "negb-few", "It is designed for very large sets."],
    ]),
];

// ---------------------------------------------------------------------------
// evaluating-risk-models
// ---------------------------------------------------------------------------
const ER = "evaluating-risk-models";
const evaluatingRisk: Item[] = [
  // level 1
  mcq(m(ER, "recall-qlike", "recall", 1, 15, "The QLIKE loss for a variance forecast $\\hat{\\sigma}^{2}$ against a proxy $\\tilde{\\sigma}^{2}$ is:"),
    "$\\frac{\\tilde{\\sigma}^{2}}{\\hat{\\sigma}^{2}} - \\log\\frac{\\tilde{\\sigma}^{2}}{\\hat{\\sigma}^{2}} - 1$",
    [
      ["$(\\tilde{\\sigma}^{2} - \\hat{\\sigma}^{2})^{2}$", "qlike-mse", "That is MSE, the other robust loss."],
      ["$|\\tilde{\\sigma} - \\hat{\\sigma}|$", "qlike-mae", "Absolute error in volatility is not rank-robust."],
      ["$\\log\\hat{\\sigma}^{2}$", "qlike-log", "Missing the realized term."],
    ]),
  mcq(m(ER, "recall-robust", "recall", 1, 15, "A loss is “rank-robust” (Hansen–Lunde, Patton) if:"),
    "Ranking forecasts with a noisy but unbiased volatility proxy gives the same order as ranking with the true volatility",
    [
      ["It ignores outliers", "robust-outliers", "Robust here means robust to proxy noise."],
      ["It is always below $1$", "robust-bounded", "Boundedness is not the property."],
      ["It is symmetric", "robust-symmetric", "QLIKE is robust and asymmetric."],
    ]),
  mcq(m(ER, "recall-mahalanobis", "recall", 1, 15, "For $\\mathbf{r} \\sim \\mathcal{N}(\\mathbf{0}, \\boldsymbol{\\Omega})$ in $\\mathbb{R}^{n}$, the squared Mahalanobis distance $\\mathbf{r}^{\\top}\\boldsymbol{\\Omega}^{-1}\\mathbf{r}$ follows:"),
    "A chi-square distribution with $n$ degrees of freedom",
    [
      ["A standard normal", "maha-normal", "It is a sum of $n$ squared standard normals."],
      ["A $t$ distribution", "maha-t", "No estimated scale is involved."],
      ["A chi-square with $1$ degree of freedom", "maha-one", "It has $n$ degrees of freedom."],
    ]),
  mcq(m(ER, "recall-mvp-test", "recall", 1, 15, "The minimum-variance test of a covariance model says that, with the true covariance:"),
    "The minimum-variance portfolio has the lowest possible realized variance",
    [
      ["The portfolio has the highest return", "mvp-return", "It's about variance."],
      ["Any portfolio has the same variance", "mvp-same", "Estimated MVPs differ in realized variance."],
      ["The forecast variance is zero", "mvp-zero", "The minimum variance is positive."],
    ]),
  // level 2
  num(m(ER, "apply-qlike-2", "apply", 2, 25, "Find QLIKE when the realized variance proxy is twice the forecast. Give $4$ decimal places."), 0.3069),
  num(m(ER, "apply-qlike-half", "apply", 2, 25, "Find QLIKE when the realized variance proxy is half the forecast. Give $4$ decimal places."), 0.1931),
  num(m(ER, "apply-mse", "apply", 2, 20, "Find the MSE loss for forecast variance $0.04$ and proxy $0.05$."), 0.0001),
  mcq(m(ER, "apply-qlike-asym", "apply", 2, 20, "QLIKE penalises:"),
    "Under-prediction of variance more than over-prediction of the same ratio",
    [
      ["Over-prediction more", "asym-over", "The ratio $2$ costs $0.307$ against $0.193$ for $\\frac{1}{2}$."],
      ["Both equally", "asym-equal", "It is asymmetric."],
      ["Neither", "asym-none", "It is zero only when they match."],
    ]),
  // level 3
  num(m(ER, "apply-mahal-mean", "apply", 3, 25, "For $n = 100$ assets under the true covariance, find the expected value of $\\frac{1}{n}\\mathbf{r}^{\\top}\\boldsymbol{\\Omega}^{-1}\\mathbf{r}$."), 1),
  num(m(ER, "apply-mahal-sd", "apply", 3, 25, "For $n = 100$, find the standard deviation of $\\frac{1}{n}\\mathbf{r}^{\\top}\\boldsymbol{\\Omega}^{-1}\\mathbf{r}$ under the true covariance. Give $4$ decimal places."), 0.1414),
  num(m(ER, "apply-bias-stat", "apply", 3, 25, "A portfolio's realized returns divided by its forecast volatility have standard deviation $1.25$. By what percentage is volatility under-forecast?"), 25),
  mcq(m(ER, "apply-proxy", "apply", 3, 25, "Volatility losses are computed against a proxy $\\tilde{\\sigma}$ (e.g. realized volatility) because:"),
    "True volatility is never observed",
    [
      ["Proxies are more accurate than the truth", "proxy-accurate", "They are noisy stand-ins."],
      ["Losses require integers", "proxy-integer", "No such requirement."],
      ["Forecasts are biased", "proxy-biased", "The proxy is needed regardless."],
    ]),
  // level 4
  num(m(ER, "apply-loglik", "apply", 4, 40, "One asset: forecast variance $0.04$, realized return $0.3$. Find the Gaussian negative log-likelihood term $\\frac{r^{2}}{\\hat{\\sigma}^{2}} + \\log\\hat{\\sigma}^{2}$. Give $4$ decimal places."), -0.9689),
  num(m(ER, "apply-mvp-two", "apply", 4, 45, "Two uncorrelated assets with variances $0.04$ and $0.09$. Find the minimum-variance weight on asset 1 with $w_1 + w_2 = 1$. Give $4$ decimal places."), 0.6923),
  num(m(ER, "apply-mvp-realized", "apply", 4, 50, "A model wrongly assumes both assets have variance $0.04$ and holds $[0.5, 0.5]$. The true variances are $0.04$ and $0.09$ (uncorrelated). Find the realized variance. Give $4$ decimal places."), 0.0325),
  mcq(m(ER, "apply-r2-critique", "apply", 4, 30, "Why is the average cross-sectional $R^{2}$ a poor criterion for choosing a factor model?"),
    "It has no out-of-sample version, always rises with added factors, and ignores rotations that change the factor covariance",
    [
      ["It is hard to compute", "r2-compute", "It's easy to compute."],
      ["It is always low", "r2-low", "Its level isn't the issue."],
      ["It measures returns, not risk", "r2-returns", "The issue is that it can't rank risk forecasts."],
    ]),
  // level 5
  short(m(ER, "explain-mvp-ranking", "explain", 5, 120, "Explain how minimum-variance portfolios rank covariance models and why the test targets the precision matrix."),
    [
      ["theorem", "The MVP built from an estimate has realized variance at least that of the MVP built from the true covariance, with equality only for the truth (up to scale)", 2, true],
      ["precision", "MVP weights are proportional to $\\hat{\\boldsymbol{\\Omega}}^{-1}\\mathbf{b}$, so the test checks the inverse — what optimizers actually use — rather than the volatility forecasts", 2, true],
    ]),
  num(m(ER, "apply-mvp-true", "apply", 5, 40, "For the two uncorrelated assets with variances $0.04$ and $0.09$, find the realized variance of the true minimum-variance portfolio. Give $4$ decimal places."), 0.0277),
  mcq(m(ER, "apply-average-case", "apply", 5, 30, "A drawback of average-case testing over random portfolios is that:"),
    "The result depends on the arbitrary choice of portfolio distribution or basis",
    [
      ["It can't use QLIKE", "avg-qlike", "Any loss can be used."],
      ["It needs no returns", "avg-no-returns", "It uses historical returns."],
      ["It only tests one asset", "avg-one", "It tests many portfolios."],
    ]),
  mcq(m(ER, "apply-alpha-portfolios", "apply", 5, 30, "Testing on MVO portfolios built from realized leading returns is appealing because:"),
    "Volatility accuracy matters most for the portfolios a strategy with alpha would actually hold",
    [
      ["It needs no covariance model", "alpha-no-model", "The model builds the portfolios."],
      ["Those portfolios have zero risk", "alpha-zero-risk", "They have risk to forecast."],
      ["It avoids look-ahead", "alpha-no-lookahead", "Using leading returns is deliberate, for testing only."],
    ]),
  // level 6
  short(m(ER, "explain-qlike-vs-bias", "explain", 6, 150, "Why are QLIKE and MSE replacing the traditional bias statistic (the standard deviation of standardized returns) for evaluating volatility forecasts?"),
    [
      ["bias-flaw", "The bias statistic only checks average calibration; forecasts can be well calibrated on average yet poorly track time variation", 2, true],
      ["robust", "QLIKE and MSE score each forecast against a proxy and are rank-robust to proxy noise, so they rank forecasters consistently", 2, true],
    ]),
  num(m(ER, "apply-mstd", "apply", 6, 40, "A model gives $\\frac{1}{n}\\mathbf{r}_t^{\\top}\\hat{\\boldsymbol{\\Omega}}^{-1}\\mathbf{r}_t$ values of $0.8$, $1.0$, $1.2$, $1.4$, $0.6$ on five days. Find their population standard deviation. Give $4$ decimal places."), 0.2828),
  num(m(ER, "apply-predicted-beta", "apply", 6, 45, "With covariance $\\begin{bmatrix} 0.04 & 0.02 \\\\ 0.02 & 0.09 \\end{bmatrix}$ and reference portfolio $\\mathbf{w} = [1, 0]$, find asset 2's predicted beta $\\frac{(\\boldsymbol{\\Omega}\\mathbf{w})_2}{\\mathbf{w}^{\\top}\\boldsymbol{\\Omega}\\mathbf{w}}$."), 0.5),
  mcq(m(ER, "apply-worst-case", "apply", 6, 35, "Worst-case variance testing (maximise the loss over unit-norm portfolios) is hard because:"),
    "The objective is not convex, so with many assets the search is intractable",
    [
      ["The constraint is not convex", "worst-constraint", "The unit ball is convex; the objective isn't."],
      ["Losses are always zero", "worst-zero", "They aren't."],
      ["It needs future data", "worst-future", "It uses historical returns."],
    ]),
  // level 7
  short(m(ER, "explain-random-rotation", "explain", 7, 150, "Paleologo builds a model that randomly flips the sign of each factor each period. Explain what this example shows about $R^{2}$."),
    [
      ["same-r2", "Sign flips are rotations, so the fitted values and $R^{2}$ (and AIC/BIC) are identical to the true model's", 2, true],
      ["wrong-cov", "But the flips decorrelate the estimated factor returns, so the factor covariance — and every risk forecast — is wrong. $R^{2}$ can't tell the models apart", 2, true],
    ]),
  num(m(ER, "apply-fmp-turnover", "apply", 7, 45, "A factor-mimicking weight matrix changes from $\\begin{bmatrix} 0.5 \\\\ 0.5 \\end{bmatrix}$ to $\\begin{bmatrix} 0.6 \\\\ 0.4 \\end{bmatrix}$. Find the Frobenius norm of the change. Give $4$ decimal places."), 0.1414),
  num(m(ER, "apply-chi-quantile", "apply", 7, 45, "For $n = 100$ assets, a day's Mahalanobis statistic $\\frac{1}{n}d^{2}$ is $1.6$. How many standard deviations above its mean is it under a correct model? Give $2$ decimal places."), 4.24),
  mcq(m(ER, "apply-no-best", "apply", 7, 40, "Paleologo warns that there may be no single “best” risk model because:"),
    "Models are judged on several metrics, and one rarely wins on all of them",
    [
      ["All models are identical", "nobest-identical", "They differ."],
      ["Risk can't be measured", "nobest-unmeasurable", "It can be measured imperfectly."],
      ["Vendors forbid comparisons", "nobest-vendors", "Not a statistical reason."],
    ]),
  // level 8
  short(m(ER, "explain-production-test", "explain", 8, 150, "Why should a model be tested by running the production strategy end to end on it, rather than optimizing with model A and evaluating risk with model B?"),
    [
      ["asymmetry", "Portfolios built with model A are tilted toward A's blind spots; scoring them with B mixes the two models' errors and biases the comparison", 2, true],
      ["relevance", "End-to-end runs measure what matters — realized risk and Sharpe of the actual strategy — under each model", 2, true],
    ]),
  num(m(ER, "apply-mvp-correlated", "apply", 8, 50, "Two assets with variances $0.04$ and $0.09$ and covariance $0.03$. Find the minimum-variance weight on asset 1 with weights summing to one. Give $4$ decimal places."), 0.8571),
  num(m(ER, "apply-qlike-avg", "apply", 8, 45, "Over two days a forecast's realized-to-forecast variance ratios are $2$ and $0.5$. Find the average QLIKE. Give $4$ decimal places."), 0.25),
  mcq(m(ER, "apply-beta-test", "apply", 8, 40, "Testing predicted against realized betas to a thematic portfolio checks:"),
    "Whether the model's covariances with that portfolio are accurate, which matters for hedging it",
    [
      ["Whether the portfolio has alpha", "betatest-alpha", "Betas are about covariance."],
      ["The portfolio's turnover", "betatest-turnover", "That's a separate test."],
      ["Whether returns are Gaussian", "betatest-gaussian", "It checks second moments."],
    ]),
  // level 9
  short(m(ER, "design-eval-suite", "transfer", 9, 180, "Design an evaluation suite to choose between two vendor risk models for a long-short equity strategy."),
    [
      ["vol", "Volatility: QLIKE/MSE on the production portfolios and on realized-alpha MVO portfolios, plus random or eigenportfolios", 1, true],
      ["precision", "Precision: realized variance of minimum-variance (and factor-exposure-constrained) portfolios, and Mahalanobis dispersion", 2, true],
      ["ancillary", "Ancillary: turnover of factor-mimicking portfolios, accuracy of predicted betas; end-to-end strategy Sharpe under each model", 1, true],
    ]),
  short(m(ER, "explain-mahal-meaning", "explain", 9, 150, "What does a very small dispersion of $\\frac{1}{n}\\mathbf{r}_t^{\\top}\\hat{\\boldsymbol{\\Omega}}_t^{-1}\\mathbf{r}_t$ over time tell you about $\\hat{\\boldsymbol{\\Omega}}$, and what doesn't it tell you?"),
    [
      ["tells", "That the precision matrix whitens returns well: $\\hat{\\boldsymbol{\\Omega}}^{-1/2}\\mathbf{r}$ looks like isotropic noise, close to the $\\sqrt{2/n}$ dispersion of a correct model", 2, true],
      ["doesnt", "It is insensitive to an overall scale factor, so volatility level must be checked separately", 2, true],
    ]),
  num(m(ER, "apply-mvp-loss", "apply", 9, 60, "In the two-asset example (true variances $0.04$, $0.09$, uncorrelated), the equal-weight portfolio has realized variance $0.0325$ and the true MVP $0.0277$. By what percent does the misspecified model's realized variance exceed the optimum? Give $1$ decimal place."), 17.3),
  mcq(m(ER, "apply-t-stat-heuristic", "apply", 9, 40, "Modelers who distrust $R^{2}$ check how often each factor's cross-sectional $t$-statistic exceeds $2$. This helps because:"),
    "Factors that are rarely significant add noise to the factor covariance without explaining returns",
    [
      ["It proves the model is correct", "tstat-correct", "It's a heuristic."],
      ["It measures turnover", "tstat-turnover", "It measures factor relevance."],
      ["It replaces volatility tests", "tstat-replace", "It complements them."],
    ]),
  // level 10
  short(m(ER, "judge-tradeoffs", "transfer", 10, 180, "Model A has better QLIKE on single stocks; model B produces lower realized variance for minimum-variance portfolios. Which would you choose for a market-neutral optimizer, and why?"),
    [
      ["choose-b", "Model B: the optimizer depends on the precision matrix, and B's better MVP performance means its inverse is more accurate for the portfolios that matter", 2, true],
      ["nuance", "But verify on the actual strategy end to end; A may be better for single-name risk reporting — no single best model", 2, true],
    ]),
  short(m(ER, "judge-r2-gaming", "transfer", 10, 180, "A vendor advertises that its new model raised average cross-sectional $R^{2}$ from $30\\%$ to $35\\%$. What questions would you ask?"),
    [
      ["mechanism", "Did they add factors or tweak loadings in-sample? $R^{2}$ always rises with factors and has no out-of-sample version", 2, true],
      ["evidence", "Ask for out-of-sample risk tests: QLIKE, minimum-variance realized variance, Mahalanobis dispersion, turnover and beta accuracy", 2, true],
    ]),
  num(m(ER, "apply-mvp-error-ratio", "apply", 10, 90, "Three uncorrelated assets have true variances $0.04$, $0.04$ and $0.16$. A model assumes all three are $0.04$ and holds the equal-weight portfolio (weights sum to one). Find the ratio of its realized variance to the true MVP's variance. Give $1$ decimal place."), 1.5),
  mcq(m(ER, "judge-loglik", "transfer", 10, 60, "The multivariate Gaussian log-likelihood $\\mathbf{r}_t^{\\top}\\hat{\\boldsymbol{\\Omega}}_t^{-1}\\mathbf{r}_t + \\log|\\hat{\\boldsymbol{\\Omega}}_t|$ is attractive as a model score because:"),
    "It doesn't depend on a choice of test portfolios, and it tests both the precision matrix and the overall scale",
    [
      ["It is robust to heavy tails", "loglik-tails", "Gaussian likelihood is sensitive to outliers."],
      ["It needs no inverse", "loglik-inverse", "It uses the inverse explicitly."],
      ["It equals $R^{2}$", "loglik-r2", "They are different measures."],
    ]),
];

export const qi05Items: Item[] = [...backtesting, ...ras, ...evaluatingRisk];
