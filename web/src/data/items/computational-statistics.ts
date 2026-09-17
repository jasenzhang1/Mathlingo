import type { Item, SourceRef } from "../../lib/assessment/types";

/**
 * Seed bank for the six sampling-based-inference / nonparametric-Bayes concepts
 * added to `graphical-models`: `importance-sampling`, `markov-chain-monte-carlo`,
 * `gibbs-sampling`, `conjugate-priors`, `dirichlet-process`, and
 * `stick-breaking-construction`. Three items per concept, same as the other new
 * clusters — enough to be drillable, below `auditCoverage`'s 8-per-concept bar
 * for a fully mature pool.
 */

const AUTHORED: SourceRef = {
  id: "mathlingo-authored-compstat",
  tier: "generated",
  title: "Mathlingo authored item (computational statistics)",
};

export const computationalStatisticsItems: Item[] = [
  // --- importance-sampling ---
  {
    id: "importance-sampling--recall-identity",
    conceptId: "importance-sampling",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Write the importance-sampling identity that rewrites 𝔼_p[f(X)] as an expectation under a proposal q, and name the weight.",
    rubric: {
      elements: [
        { id: "identity", description: "Writes 𝔼_p[f(X)] = 𝔼_q[f(X)·p(X)/q(X)] (or an equivalent statement).", weight: 4, required: true },
        { id: "weight", description: "Names w(x) = p(x)/q(x) as the importance weight.", weight: 2 },
      ],
    },
    difficulty: -0.2,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["importance-sampling"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "importance-sampling--apply-self-normalized",
    conceptId: "importance-sampling",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Self-normalized importance sampling with 4 draws gives unnormalized weights 1, 3, 1, 5 and " +
      "f-values 2, 4, 6, 2 respectively. Estimate 𝔼_p[f(X)] as Σwᵢf(xᵢ)/Σwᵢ.",
    answerKey: 3,
    tolerance: 0.01,
    difficulty: 0.2,
    discrimination: 1.2,
    expectedSeconds: 100,
    prereqClosure: ["importance-sampling"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "importance-sampling--explain-thin-tails-danger",
    conceptId: "importance-sampling",
    format: "mcq",
    cognitive: "explain",
    channels: ["typed"],
    stem: "Why is a proposal q with thinner tails than the target p especially dangerous for importance sampling?",
    choices: [
      { id: "a", text: "The weight p(x)/q(x) blows up in the tails, where q rarely samples — so the estimate can be dominated by one rare, enormous weight", correct: true },
      {
        id: "b",
        text: "It biases the estimator, since a thin-tailed q undercounts extreme values",
        correct: false,
        misconception: {
          id: "is-bias-confusion",
          description: "Importance sampling stays unbiased for any q with adequate support; the danger is variance (a heavy-tailed weight distribution), not bias.",
          blameConceptId: "importance-sampling",
        },
      },
      {
        id: "c",
        text: "It makes the sample average converge faster, since fewer draws matter",
        correct: false,
        misconception: {
          id: "is-fewer-draws-faster",
          description: "A handful of dominant weights is a sign of high variance and slow, unreliable convergence, not fast convergence.",
          blameConceptId: "importance-sampling",
        },
      },
    ],
    difficulty: 0.5,
    discrimination: 1.3,
    expectedSeconds: 80,
    prereqClosure: ["importance-sampling"],
    source: AUTHORED,
    status: "live",
  },

  // --- markov-chain-monte-carlo ---
  {
    id: "mcmc--recall-detailed-balance",
    conceptId: "markov-chain-monte-carlo",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "State detailed balance, and explain in one sentence why a chain satisfying it has p as its stationary distribution.",
    rubric: {
      elements: [
        { id: "equation", description: "States p(x)P(x→x') = p(x')P(x'→x) for every pair of states.", weight: 3, required: true },
        { id: "why", description: "Explains that the flow of probability between any two states is exactly balanced in both directions, so no state's mass can drift over time.", weight: 3 },
      ],
    },
    difficulty: 0,
    discrimination: 1.2,
    expectedSeconds: 70,
    prereqClosure: ["markov-chain-monte-carlo"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mcmc--apply-metropolis-ratio",
    conceptId: "markov-chain-monte-carlo",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Target p̃(x) ∝ e^{-x²/2}. Current state x = 0. A symmetric proposal suggests x' = 1. Compute the " +
      "Metropolis acceptance probability α = min(1, p̃(x')/p̃(x)) to three decimal places.",
    answerKey: 0.607,
    tolerance: 0.01,
    difficulty: 0.4,
    discrimination: 1.2,
    expectedSeconds: 110,
    prereqClosure: ["markov-chain-monte-carlo"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mcmc--explain-step-size-tradeoff",
    conceptId: "markov-chain-monte-carlo",
    format: "mcq",
    cognitive: "explain",
    channels: ["typed"],
    stem: "A Metropolis-Hastings chain has an acceptance rate near 0. What is the most likely fix?",
    choices: [
      { id: "a", text: "Shrink the proposal's step size — proposals are landing too far into low-probability territory", correct: true },
      {
        id: "b",
        text: "Grow the proposal's step size, so the chain explores more of the space",
        correct: false,
        misconception: {
          id: "mcmc-grow-when-rejecting",
          description: "Growing the step size when acceptance is already near zero makes proposals even more extreme, driving acceptance further down, not up.",
          blameConceptId: "markov-chain-monte-carlo",
        },
      },
      {
        id: "c",
        text: "Increase the burn-in period",
        correct: false,
        misconception: {
          id: "mcmc-burnin-confusion",
          description: "Burn-in addresses a poor starting point, not a structurally bad proposal — a longer burn-in with a near-zero acceptance rate still barely moves at all.",
          blameConceptId: "markov-chain-monte-carlo",
        },
      },
    ],
    difficulty: 0.2,
    discrimination: 1.2,
    expectedSeconds: 70,
    prereqClosure: ["markov-chain-monte-carlo"],
    source: AUTHORED,
    status: "live",
  },

  // --- gibbs-sampling ---
  {
    id: "gibbs-sampling--recall-acceptance-rate",
    conceptId: "gibbs-sampling",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "In Gibbs sampling, what is the Metropolis-Hastings acceptance probability for every proposed move, and why?",
    rubric: {
      elements: [
        { id: "always-one", description: "States that the acceptance probability is always 1.", weight: 3, required: true },
        {
          id: "why",
          description: "Explains that the proposal is drawn from the exact full conditional, which makes the target and proposal terms in the Metropolis-Hastings ratio cancel exactly.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.1,
    discrimination: 1.2,
    expectedSeconds: 65,
    prereqClosure: ["gibbs-sampling", "markov-chain-monte-carlo"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "gibbs-sampling--apply-conditional-sweep",
    conceptId: "gibbs-sampling",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "Given full conditionals X | Y=y ~ N(0.5y, 1) and Y | X=x ~ N(0.5x, 1), and current state (x, y) = (4, 0), " +
      "describe the two draws of one Gibbs sweep, including which value of the other coordinate each draw conditions on.",
    rubric: {
      elements: [
        { id: "update-x", description: "Updates X by drawing from N(0.5·0, 1) = N(0, 1), i.e. conditions on the old Y = 0.", weight: 3, required: true },
        { id: "update-y", description: "Updates Y by drawing from N(0.5·x', 1) using the just-drawn new x' (not the old x = 4), i.e. conditions on the updated X.", weight: 3, required: true },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.2,
    expectedSeconds: 100,
    prereqClosure: ["gibbs-sampling"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "gibbs-sampling--explain-slow-mixing",
    conceptId: "gibbs-sampling",
    format: "mcq",
    cognitive: "explain",
    channels: ["typed"],
    stem: "Gibbs sampling tends to mix slowly when the variables being sampled are:",
    choices: [
      { id: "a", text: "Strongly correlated with each other", correct: true },
      {
        id: "b",
        text: "Independent of each other",
        correct: false,
        misconception: {
          id: "gibbs-independence-slow",
          description: "Independent coordinates are the easy case for Gibbs — each conditional reduces to the marginal, and the chain mixes quickly, not slowly.",
          blameConceptId: "gibbs-sampling",
        },
      },
      {
        id: "c",
        text: "Each Gaussian-distributed",
        correct: false,
        misconception: {
          id: "gibbs-gaussian-slow",
          description: "Being Gaussian by itself says nothing about mixing speed — what matters is the correlation structure between the variables, not their marginal family.",
          blameConceptId: "gibbs-sampling",
        },
      },
    ],
    difficulty: 0.5,
    discrimination: 1.3,
    expectedSeconds: 75,
    prereqClosure: ["gibbs-sampling"],
    source: AUTHORED,
    status: "live",
  },

  // --- conjugate-priors ---
  {
    id: "conjugate-priors--recall-beta-binomial",
    conceptId: "conjugate-priors",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "If the prior on a coin's bias θ is Beta(α, β) and you observe k heads in n flips, what is the posterior?",
    rubric: {
      elements: [
        { id: "posterior", description: "States the posterior is Beta(α + k, β + n − k).", weight: 4, required: true },
      ],
    },
    difficulty: -0.3,
    discrimination: 1.1,
    expectedSeconds: 55,
    prereqClosure: ["conjugate-priors"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "conjugate-priors--apply-posterior-mean",
    conceptId: "conjugate-priors",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Prior Beta(3, 3) on a conversion rate. You observe 20 conversions out of 60 visitors. Find the " +
      "posterior mean, to three decimal places.",
    answerKey: 0.348,
    tolerance: 0.01,
    difficulty: 0.2,
    discrimination: 1.2,
    expectedSeconds: 100,
    prereqClosure: ["conjugate-priors"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "conjugate-priors--explain-pseudo-counts",
    conceptId: "conjugate-priors",
    format: "mcq",
    cognitive: "explain",
    channels: ["typed"],
    stem: "A Beta(1, 1) prior (uniform) vs. a Beta(20, 20) prior, both with mean 0.5. After observing the same small dataset, which posterior will have moved further from its prior mean?",
    choices: [
      { id: "a", text: "Beta(1, 1) — its 'pseudo-count' of prior data is much smaller, so real data dominates it more easily", correct: true },
      {
        id: "b",
        text: "Beta(20, 20) — a wider-looking prior label suggests more flexibility to move",
        correct: false,
        misconception: {
          id: "conjugate-prior-strength-confusion",
          description: "Beta(20, 20) is actually a *concentrated*, strongly-held prior (equivalent to having already seen 38 pseudo-observations) despite sharing the same mean as Beta(1, 1) — it moves less, not more, given the same new data.",
          blameConceptId: "conjugate-priors",
        },
      },
      {
        id: "c",
        text: "Both move by exactly the same amount, since they share the same prior mean",
        correct: false,
        misconception: {
          id: "conjugate-prior-mean-only",
          description: "Two priors can share a mean while differing enormously in how much 'prior data' they encode — the mean alone doesn't determine how much the posterior moves.",
          blameConceptId: "conjugate-priors",
        },
      },
    ],
    difficulty: 0.6,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["conjugate-priors"],
    source: AUTHORED,
    status: "live",
  },

  // --- dirichlet-process ---
  {
    id: "dirichlet-process--recall-parameters",
    conceptId: "dirichlet-process",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "A Dirichlet process is parameterized by two things. Name them and what each controls.",
    rubric: {
      elements: [
        { id: "base", description: "Names the base distribution H, which controls where atom locations tend to be drawn from.", weight: 3, required: true },
        { id: "concentration", description: "Names the concentration parameter α, which controls how spread out the probability mass is across many atoms vs. concentrated on a few.", weight: 3, required: true },
      ],
    },
    difficulty: 0.2,
    discrimination: 1.2,
    expectedSeconds: 65,
    prereqClosure: ["dirichlet-process"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "dirichlet-process--explain-discreteness",
    conceptId: "dirichlet-process",
    format: "mcq",
    cognitive: "explain",
    channels: ["typed"],
    stem: "A Dirichlet process draw G ~ DP(α, H) is used even when the base distribution H is continuous. What does G itself look like?",
    choices: [
      { id: "a", text: "Discrete, almost surely — a countably infinite set of weighted atoms, even though H is continuous", correct: true },
      {
        id: "b",
        text: "Continuous, since it inherits H's continuity",
        correct: false,
        misconception: {
          id: "dp-continuity-inherited",
          description: "A DP draw is discrete almost surely regardless of whether the base distribution H is continuous — this is what makes it usable as a clustering prior at all.",
          blameConceptId: "dirichlet-process",
        },
      },
    ],
    difficulty: 0.5,
    discrimination: 1.3,
    expectedSeconds: 70,
    prereqClosure: ["dirichlet-process"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "dirichlet-process--transfer-concentration-effect",
    conceptId: "dirichlet-process",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "In a DP mixture model fit by Gibbs sampling, why does the concentration parameter α effectively control the number of clusters the model tends to use?",
    rubric: {
      elements: [
        {
          id: "link",
          description: "Connects α to the Chinese-Restaurant-Process-style full conditional: larger α raises the relative probability of a data point starting a brand-new cluster rather than joining an existing one, so more clusters end up populated.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.3,
    expectedSeconds: 100,
    prereqClosure: ["dirichlet-process", "gibbs-sampling"],
    source: AUTHORED,
    status: "live",
  },

  // --- stick-breaking-construction ---
  {
    id: "stick-breaking--recall-recipe",
    conceptId: "stick-breaking-construction",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Write the formula for the k-th stick-breaking weight wₖ in terms of the Beta(1, α) draws β₁, β₂, ….",
    rubric: {
      elements: [
        { id: "formula", description: "States wₖ = βₖ · ∏_{j<k}(1 − βⱼ) — the k-th break times what remains of the stick after the first k−1 breaks.", weight: 4, required: true },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.2,
    expectedSeconds: 65,
    prereqClosure: ["stick-breaking-construction"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "stick-breaking--apply-first-two-weights",
    conceptId: "stick-breaking-construction",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "The first two Beta(1, α) draws are β₁ = 0.4, β₂ = 0.5. Compute w₂ = β₂·(1 − β₁).",
    answerKey: 0.3,
    tolerance: 0.01,
    difficulty: 0.2,
    discrimination: 1.1,
    expectedSeconds: 80,
    prereqClosure: ["stick-breaking-construction"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "stick-breaking--explain-alpha-role",
    conceptId: "stick-breaking-construction",
    format: "mcq",
    cognitive: "explain",
    channels: ["typed"],
    stem: "Beta(1, α) has mean 1/(1+α). What does a small α (say, 0.1) imply about the stick-breaking weights?",
    choices: [
      { id: "a", text: "Each break tends to take a large bite of what remains, so mass concentrates on the first few atoms", correct: true },
      {
        id: "b",
        text: "Each break tends to take a small bite, spreading mass across many atoms",
        correct: false,
        misconception: {
          id: "stick-breaking-alpha-inverted",
          description: "Small α gives Beta(1, α) a large mean (close to 1), so each break takes a *large* fraction of the remaining stick, not a small one — the direction is inverted here.",
          blameConceptId: "stick-breaking-construction",
        },
      },
    ],
    difficulty: 0.6,
    discrimination: 1.3,
    expectedSeconds: 85,
    prereqClosure: ["stick-breaking-construction"],
    source: AUTHORED,
    status: "live",
  },
];
