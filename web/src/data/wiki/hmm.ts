import type { WikiArticle } from "./types";

export const hmmWiki: WikiArticle = {
  conceptId: "hmm",
  summary:
    "A hidden Markov model is a Markov chain you cannot see. The states evolve with the Markov " +
    "property as usual, but each one emits an observation, and only the emissions are recorded. Every " +
    "practical question — what is the probability of this sequence, what states most likely produced " +
    "it, what parameters best explain a corpus — has an exact dynamic-programming answer, which is " +
    "why the same three algorithms turn up in speech recognition, genomics, and finance alike.",

  sections: [
    {
      heading: "Structure",
      blocks: [
        {
          kind: "prose",
          text:
            "Two layers. The hidden layer Z₁ → Z₂ → ⋯ → Z_T is an ordinary Markov chain over a finite " +
            "set of states. The observed layer hangs off it: each Z_t emits X_t, and X_t depends on " +
            "nothing else. As a DAG it is a ladder, and the missing edges say everything.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Transition matrix A",
              description: "A_{ij} = P(Z_{t+1} = j | Z_t = i) — the hidden chain's own dynamics.",
            },
            {
              term: "Emission distribution B",
              description:
                "B_{ik} = P(X_t = k | Z_t = i), or a density for continuous observations. What a state looks like from outside.",
            },
            {
              term: "Initial distribution π",
              description: "P(Z₁ = i). Often taken as the chain's stationary distribution.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "“Hidden” describes the states, not the emissions",
          text:
            "This gets inverted constantly. The emissions are the only thing you observe — they are the " +
            "data. The state sequence is what you never see and must infer. Reversing the two makes " +
            "every subsequent algorithm unreadable.",
        },
      ],
    },

    {
      heading: "The joint factorization",
      blocks: [
        {
          kind: "formula",
          latex: "p(z₁:T, x₁:T) = p(z₁) ∏_{t=2}^{T} p(z_t | z_{t−1}) · ∏_{t=1}^{T} p(x_t | z_t)",
          caption: "Initial × transitions × emissions — one factor per edge in the ladder",
        },
        {
          kind: "prose",
          text:
            "This is the DAG factorization applied to the HMM's specific parent structure: Z_t's only " +
            "parent is Z_{t−1}, and X_t's only parent is Z_t. Two conditional-independence claims are " +
            "packed into it. First, the hidden chain is Markov. Second, an observation is independent of " +
            "everything else given its own state — X_t ⊥ (everything) | Z_t. The second is the stronger " +
            "modelling commitment and the one most often violated in practice.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The observations are not Markov",
          text:
            "Marginalising the hidden states out leaves an observation sequence with long-range " +
            "dependence: X₁ genuinely carries information about X_T, because both are informative about " +
            "the state path in between. This is precisely why HMMs are useful — a short-memory hidden " +
            "process generates a long-memory observed one.",
        },
      ],
    },

    {
      heading: "The three canonical problems",
      blocks: [
        {
          kind: "table",
          headers: ["Problem", "Question", "Algorithm", "Cost"],
          rows: [
            ["Evaluation", "P(x₁:T | model)?", "Forward algorithm", "O(TN²)"],
            ["Decoding", "argmax over z₁:T of p(z₁:T | x₁:T)?", "Viterbi", "O(TN²)"],
            ["Learning", "Which A, B, π maximise the likelihood?", "Baum–Welch (EM)", "O(TN²) per iteration"],
          ],
          caption: "N states, T time steps. The naive alternative to each is a sum or search over Nᵀ paths.",
        },
        {
          kind: "prose",
          text:
            "The saving in every case is the same trick: the Markov property means a partial path's " +
            "future depends only on where it currently is, so all Nᵗ⁻¹ paths arriving at a given state " +
            "at time t can be collapsed into one number. Dynamic programming over states rather than " +
            "over paths turns exponential into linear.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Forward variable α_t(i)",
              description:
                "p(x₁:t, Z_t = i), built by α_t(j) = [Σᵢ α_{t−1}(i)A_{ij}]·B_j(x_t). Summing α_T over states gives the sequence likelihood.",
            },
            {
              term: "Viterbi variable δ_t(i)",
              description:
                "The same recursion with the sum replaced by a max, plus backpointers. Max instead of sum is the entire difference between decoding and evaluation.",
            },
            {
              term: "Posterior γ_t(i)",
              description:
                "p(Z_t = i | x₁:T), from the forward–backward algorithm. Note this gives the most likely state at each time, which need not form a valid path — that is what Viterbi is for.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Per-timestep marginals are not the best path",
          text:
            "Stringing together argmax γ_t(i) at each t can produce a sequence containing a transition " +
            "the model assigns probability zero. Viterbi optimises the joint path; the marginals " +
            "optimise each position separately. Which you want depends on whether you need a coherent " +
            "sequence or per-position confidences.",
        },
      ],
    },

    {
      heading: "Worked example: decoding a mood",
      blocks: [
        {
          kind: "example",
          title: "Two states, one observation",
          problem:
            "States {Happy, Sad} with π = (0.5, 0.5). P(Walk | Happy) = 0.6, P(Walk | Sad) = 0.1. You " +
            "observe a walk on day 1. What is P(Happy | Walk)?",
          steps: [
            "Bayes' rule: P(H | W) = P(W | H)P(H) / [P(W | H)P(H) + P(W | S)P(S)].",
            "Numerator: 0.6 × 0.5 = 0.30.",
            "Denominator: 0.30 + (0.1 × 0.5) = 0.35.",
            "0.30 / 0.35.",
          ],
          answer:
            "≈ 0.857. One emission has moved the belief from 0.5 to 0.857; the forward algorithm is " +
            "this same update run repeatedly, with the transition matrix propagating the belief " +
            "forward between observations.",
        },
      ],
    },

    {
      heading: "Where HMMs are used, and why so widely",
      blocks: [
        {
          kind: "prose",
          text:
            "HMMs became famous through speech recognition, but nothing in the model is about speech. " +
            "The abstract pattern — a latent regime that persists over time, observed only through " +
            "noisy signals — recurs everywhere, and the same three algorithms apply unchanged.",
        },
        {
          kind: "list",
          items: [
            "Speech: hidden phonemes, observed acoustic frames.",
            "Genomics: hidden gene/non-gene regions, observed nucleotide sequence.",
            "Finance: hidden volatility regimes (calm vs. crisis), observed returns.",
            "NLP: hidden part-of-speech tags, observed words.",
            "Sensors and robotics: hidden position, observed noisy readings — with continuous states and Gaussian noise this is exactly the Kalman filter.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The known limitations",
          text:
            "The Markov assumption gives state durations a geometric distribution, which is often wrong " +
            "— real phonemes and real market regimes do not have memoryless lengths. Baum–Welch is EM " +
            "and so finds local optima only, making initialisation matter. And the number of hidden " +
            "states is a modelling choice the algorithm will not make for you.",
        },
      ],
    },
  ],

  references: [
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§13.2, Hidden Markov Models — forward-backward, Viterbi, EM" },
    { source: "Murphy, Probabilistic Machine Learning: An Introduction", locator: "Ch. 29, State-space models" },
    { source: "Shumway & Stoffer, Time Series Analysis and Its Applications", locator: "Ch. 6, State-Space Models and regime switching" },
    { source: "Mathlingo assessment bank", locator: "assessments/gm-01-graphs-and-markov-structure.md" },
  ],
};
