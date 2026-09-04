import type { WikiArticle } from "./types";

export const markovChainsWiki: WikiArticle = {
  conceptId: "markov-chains",
  summary:
    "A Markov chain is a sequence of random states in which the future depends on the past only " +
    "through the present. That single assumption collapses an unbounded history into one state " +
    "variable, and it turns almost every question about the process into linear algebra on the " +
    "transition matrix. The stationary distribution is a left eigenvector with eigenvalue 1, and the " +
    "remaining eigenvalues govern how fast the chain reaches it.",

  sections: [
    {
      heading: "The Markov property",
      blocks: [
        {
          kind: "formula",
          latex: "P(X_{n+1} = j | Xₙ = i, X_{n−1}, …, X₁) = P(X_{n+1} = j | Xₙ = i) = P_{ij}",
          caption: "The present state screens off the entire history — a chain-structured DAG",
        },
        {
          kind: "prose",
          text:
            "The claim is not that history is irrelevant. It is that all of history's relevance is " +
            "already summarised in the current state. Whether that holds is a modelling decision, and " +
            "when it fails the usual repair is to enlarge the state — a chain that needs the last two " +
            "observations becomes Markov again if you define the state to be the pair.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "State space",
              description: "The set of values Xₙ can take. Finite here; countable and continuous versions exist.",
            },
            {
              term: "Transition matrix P",
              description:
                "P_{ij} = P(next = j | now = i). Each row is a probability distribution, so every row sums to 1 — a right stochastic matrix.",
            },
            {
              term: "Time-homogeneous",
              description: "P does not change with n. Everything below assumes this.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "n steps is the nth matrix power",
          text:
            "P(X_{n} = j | X₀ = i) = (Pⁿ)_{ij}. Propagating a row-vector distribution forward is " +
            "π_{n} = π₀Pⁿ. The entire theory of long-run behaviour therefore reduces to asking what " +
            "happens to Pⁿ as n grows — which is an eigenvalue question, and exactly why this concept " +
            "sits downstream of eigenvalues and eigenvectors.",
        },
      ],
    },

    {
      heading: "The stationary distribution",
      blocks: [
        {
          kind: "formula",
          latex: "π = πP,   Σᵢ πᵢ = 1,   πᵢ ≥ 0",
          caption: "π is a left eigenvector of P with eigenvalue 1, normalised to be a distribution",
        },
        {
          kind: "prose",
          text:
            "A stationary distribution is one the chain does not change: start distributed as π and " +
            "after one step you are still distributed as π. Because every row of P sums to 1, the " +
            "all-ones column vector is a right eigenvector with eigenvalue 1, and so 1 is always an " +
            "eigenvalue of P. The corresponding left eigenvector, normalised, is π.",
        },
        {
          kind: "example",
          title: "Solving for π on a two-state chain",
          problem:
            "Weather: from Sunny, stay Sunny with probability 0.8; from Rainy, go Sunny with " +
            "probability 0.4. Find the long-run fraction of sunny days.",
          steps: [
            "P = [[0.8, 0.2], [0.4, 0.6]] with states ordered (Sunny, Rainy).",
            "π = πP gives πₛ = 0.8πₛ + 0.4π_r, so 0.2πₛ = 0.4π_r, i.e. πₛ = 2π_r.",
            "With πₛ + π_r = 1: 2π_r + π_r = 1, so π_r = 1/3.",
            "πₛ = 2/3.",
          ],
          answer:
            "π = (2/3, 1/3) — sunny about 66.7% of days in the long run, regardless of today's weather.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "π is not uniform in general",
          text:
            "The example above is a case in point: 2/3 and 1/3, not 1/2 and 1/2. The stationary " +
            "distribution is uniform only for special chains — doubly stochastic ones, where columns " +
            "as well as rows sum to 1. Assuming uniformity is a common and consequential error.",
        },
      ],
    },

    {
      heading: "When does a chain converge to π?",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Irreducible",
              description: "Every state is reachable from every other. Otherwise the chain has separate regions with their own stationary behaviour.",
            },
            {
              term: "Aperiodic",
              description:
                "The chain does not cycle with a fixed period. A chain that alternates A → B → A → B has period 2 and never settles, even though a stationary distribution exists.",
            },
            {
              term: "Ergodic",
              description:
                "Irreducible and aperiodic. Then π is unique and πₙ → π from any starting distribution.",
            },
          ],
        },
        {
          kind: "prose",
          text:
            "Existence and convergence are different questions. A periodic chain can have a perfectly " +
            "good stationary distribution that it orbits forever without approaching. Irreducibility " +
            "buys uniqueness; aperiodicity buys convergence.",
        },
      ],
    },

    {
      heading: "Mixing speed and the second eigenvalue",
      blocks: [
        {
          kind: "prose",
          text:
            "Order the eigenvalues of P by magnitude: λ₁ = 1 ≥ |λ₂| ≥ |λ₃| ≥ ⋯. Decomposing the " +
            "starting distribution in the eigenbasis, the component along the λ₁ direction is π and " +
            "stays put, while every other component is multiplied by λᵢⁿ and decays. The slowest to die " +
            "is the one attached to λ₂, so the distance to stationarity shrinks like |λ₂|ⁿ.",
        },
        {
          kind: "formula",
          latex: "‖πₙ − π‖ = O(|λ₂|ⁿ)",
          caption: "The spectral gap 1 − |λ₂| sets the mixing rate",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The same argument as matrix stability",
          text:
            "This is the eigenvalue-magnitude-governs-long-run-behaviour argument from matrix " +
            "stability, applied to a stochastic matrix. There the question was whether Aⁿx blows up or " +
            "decays; here every mode except the stationary one must decay, and how quickly is entirely " +
            "a matter of how far |λ₂| sits below 1. A small spectral gap means slow mixing.",
        },
        {
          kind: "example",
          title: "Mixing on the weather chain",
          problem: "How fast does P = [[0.8, 0.2], [0.4, 0.6]] approach its stationary distribution?",
          steps: [
            "For a 2×2 stochastic matrix, trace = λ₁ + λ₂ and λ₁ = 1.",
            "trace = 0.8 + 0.6 = 1.4, so λ₂ = 0.4.",
            "Deviation from π shrinks by a factor of 0.4 per step.",
            "After 5 steps the deviation is 0.4⁵ ≈ 0.0102 of its initial size.",
          ],
          answer:
            "λ₂ = 0.4, a spectral gap of 0.6 — fast mixing. Push the diagonal toward 1 (weather that " +
            "rarely changes) and λ₂ approaches 1, giving a chain that takes very many steps to forget " +
            "where it started.",
        },
      ],
    },

    {
      heading: "Why this matters: MCMC",
      blocks: [
        {
          kind: "prose",
          text:
            "Everything above is a theory of what a given chain does in the long run. Markov chain " +
            "Monte Carlo runs the logic backwards. You have a target distribution — typically a " +
            "Bayesian posterior you cannot sample from directly — and you *construct* a transition " +
            "rule whose stationary distribution is exactly that target. Run the chain long enough and " +
            "its states are samples from the target.",
        },
        {
          kind: "list",
          items: [
            "Metropolis–Hastings proposes a move and accepts it with a probability chosen so that detailed balance with the target holds.",
            "Gibbs sampling resamples one variable at a time from its conditional given the rest — the graphical model's Markov blanket is exactly what that conditional depends on.",
            "The burn-in period discarded at the start is the transient the |λ₂|ⁿ analysis above describes.",
            "Slow mixing — |λ₂| close to 1 — is the practical failure mode: the samples are correlated, so a long run carries much less information than its length suggests.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Convergence is asymptotic, and diagnostics are heuristics",
          text:
            "The theory guarantees convergence eventually; it does not tell you when. Diagnostics such " +
            "as R̂ and effective sample size can reveal a chain that has clearly not converged, but no " +
            "diagnostic can prove that one has. A chain stuck in one mode of a multimodal posterior can " +
            "look perfectly healthy.",
        },
      ],
    },
  ],

  references: [
    { source: "Ross, Stochastic Processes", locator: "Ch. 4, Markov Chains" },
    { source: "Resnick, Adventures in Stochastic Processes", locator: "Ch. 2, Markov Chains — classification of states and limiting behaviour" },
    { source: "Robert & Casella, Monte Carlo Statistical Methods", locator: "Ch. 6, Markov Chains and MCMC foundations" },
    { source: "Mathlingo assessment bank", locator: "assessments/gm-01-graphs-and-markov-structure.md" },
  ],
};
