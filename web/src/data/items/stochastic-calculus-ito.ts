import type { Item, SourceRef } from "../../lib/assessment/types";

/**
 * Seed bank for `ito-integral`, `ito-doeblin-formula`, and
 * `multidimensional-ito-calculus` — 20 items each, spanning recall / apply /
 * explain / transfer. Modeled on the treatment in Shreve, *Stochastic
 * Calculus for Finance II* (chs. 4), cross-checked against the wiki articles
 * for each concept.
 */

const SHREVE: SourceRef = {
  id: "shreve-scff2",
  tier: "restricted",
  title: "Stochastic Calculus for Finance II (Shreve)",
  locator: "§4.2, The Itô Integral",
  rewriteApprovedBy: "pending-review",
};

const AUTHORED: SourceRef = {
  id: "mathlingo-authored-stochastic-calculus",
  tier: "generated",
  title: "Mathlingo authored item (stochastic calculus)",
};

/** Shallow-clone SHREVE with a different locator, so each item can cite its own section. */
function shreve(locator: string): SourceRef {
  return { ...SHREVE, locator };
}

// Three ANCESTORS constants stood here — ITO_INTEGRAL_ANCESTORS, and two
// derived from it — intended as the prereqClosure for the items below. None
// was ever referenced: every item still declares a narrow closure such as
// prereqClosure: ["multidimensional-ito-calculus"]. Being unused they failed
// noUnusedLocals and broke `tsc -b` for the whole repo, so they are removed
// here rather than wired in; wiring them would change these items' blame
// propagation, which is an editorial call for whoever authored them.

export const stochasticCalculusItoItems: Item[] = [
  // ================= ito-integral =================

  {
    id: "ito-integral--recall-left-endpoint",
    conceptId: "ito-integral",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem:
      "In the Riemann-sum definition of ∫₀ᵗ Δₛ dWₛ, at which point of each sub-interval [tᵢ, tᵢ₊₁] is the " +
      "integrand Δ evaluated, and what kind of limit is taken as the partition mesh shrinks to 0?",
    rubric: {
      elements: [
        {
          id: "left-endpoint",
          description: "States that Δ is evaluated at the left endpoint tᵢ of each sub-interval.",
          weight: 3,
          required: true,
        },
        {
          id: "l2-limit",
          description: "States that the limit is an L² (mean-square) limit, not a pathwise/almost-sure limit.",
          weight: 2,
        },
      ],
    },
    difficulty: -1.1,
    discrimination: 0.9,
    expectedSeconds: 50,
    prereqClosure: ["ito-integral"],
    source: shreve("§4.2, The Itô Integral"),
    status: "live",
  },
  {
    id: "ito-integral--recall-adaptedness-condition",
    conceptId: "ito-integral",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which condition must the integrand Δₛ satisfy for ∫₀ᵗ Δₛ dWₛ to be defined as an Itô integral?",
    choices: [
      {
        id: "a",
        text: "Δₛ is adapted to the Brownian filtration and E[∫₀ᵗ Δₛ² ds] < ∞",
        correct: true,
      },
      {
        id: "b",
        text: "Δₛ is a deterministic (non-random) function of s",
        correct: false,
        misconception: {
          id: "deterministic-only",
          description: "Confuses the Itô integral with a Wiener integral against a deterministic integrand; Itô integrands may be random as long as they are adapted.",
          blameConceptId: "ito-integral",
        },
      },
      {
        id: "c",
        text: "Δₛ must be continuous and of bounded variation in s",
        correct: false,
        misconception: {
          id: "bounded-variation-integrand",
          description: "Imports the classical Riemann-Stieltjes requirement of bounded variation, which is exactly what fails for Wₛ itself and is not required of the integrand either.",
          blameConceptId: "ito-integral",
        },
      },
      {
        id: "d",
        text: "Δₛ must be independent of the Brownian motion Wₛ it is integrated against",
        correct: false,
        misconception: {
          id: "independence-required",
          description: "The whole point of the theory is that Δₛ may depend on the path of W up to time s (adapted); independence is not required and would make the theory nearly useless for SDEs.",
          blameConceptId: "filtrations-and-adapted-processes",
        },
      },
    ],
    difficulty: -0.6,
    discrimination: 1.1,
    expectedSeconds: 55,
    prereqClosure: ["ito-integral", "filtrations-and-adapted-processes"],
    source: shreve("§4.2, The Itô Integral"),
    status: "live",
  },
  {
    id: "ito-integral--recall-isometry-statement",
    conceptId: "ito-integral",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "State the Itô isometry.",
    rubric: {
      elements: [
        {
          id: "formula",
          description: "Writes E[(∫₀ᵗ Δₛ dWₛ)²] = E[∫₀ᵗ Δₛ² ds].",
          weight: 4,
          required: true,
        },
        {
          id: "interpretation",
          description: "Notes it converts the variance of a stochastic integral into an ordinary (deterministic-style) time integral.",
          weight: 2,
        },
      ],
    },
    difficulty: -0.9,
    discrimination: 1.0,
    expectedSeconds: 55,
    prereqClosure: ["ito-integral"],
    source: shreve("§4.3, The Itô Isometry"),
    status: "live",
  },
  {
    id: "ito-integral--recall-martingale-property",
    conceptId: "ito-integral",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "As a process in t, what is E[∫₀ᵗ Δₛ dWₛ], and what property does the process I(t) = ∫₀ᵗ Δₛ dWₛ have?",
    choices: [
      { id: "a", text: "E[I(t)] = 0 for all t, and I(t) is a martingale", correct: true },
      {
        id: "b",
        text: "E[I(t)] = t, and I(t) is a submartingale",
        correct: false,
        misconception: {
          id: "confuses-with-wt-squared",
          description: "Confuses the mean of the Itô integral itself (0) with the mean of Wₜ² (which is t) — a different, related quantity.",
          blameConceptId: "quadratic-variation",
        },
      },
      {
        id: "c",
        text: "E[I(t)] = 0, but I(t) is not a martingale because dWₛ has unbounded variation",
        correct: false,
        misconception: {
          id: "unbounded-variation-breaks-martingale",
          description: "Unbounded variation of the integrator is exactly the obstacle the left-endpoint construction was designed to overcome; it does not prevent the martingale property.",
          blameConceptId: "ito-integral",
        },
      },
    ],
    difficulty: -0.5,
    discrimination: 1.1,
    expectedSeconds: 55,
    prereqClosure: ["ito-integral", "martingales-continuous-time"],
    source: shreve("§4.2, The Itô Integral"),
    status: "live",
  },
  {
    id: "ito-integral--recall-quadratic-variation-of-integral",
    conceptId: "ito-integral",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "What is the quadratic variation ⟨I, I⟩ₜ of the Itô integral I(t) = ∫₀ᵗ Δₛ dWₛ, in terms of Δ?",
    rubric: {
      elements: [
        {
          id: "formula",
          description: "States ⟨I,I⟩ₜ = ∫₀ᵗ Δₛ² ds.",
          weight: 4,
          required: true,
        },
        {
          id: "mechanism",
          description: "Connects this to dI·dI = Δₛ² dWₛ·dWₛ = Δₛ² ds.",
          weight: 2,
        },
      ],
    },
    difficulty: -0.3,
    discrimination: 1.1,
    expectedSeconds: 60,
    prereqClosure: ["ito-integral", "quadratic-variation"],
    source: shreve("§4.4, Quadratic Variation of an Itô Integral"),
    status: "live",
  },
  {
    id: "ito-integral--apply-isometry-ws-squared",
    conceptId: "ito-integral",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Using the Itô isometry, compute Var(∫₀⁴ Wₛ dWₛ).",
    answerKey: 8,
    tolerance: 0.01,
    difficulty: 0.1,
    discrimination: 1.2,
    expectedSeconds: 100,
    prereqClosure: ["ito-integral"],
    source: shreve("§4.3, The Itô Isometry"),
    status: "live",
  },
  {
    id: "ito-integral--apply-isometry-deterministic-integrand",
    conceptId: "ito-integral",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Let Δₛ = s. Using the Itô isometry, find Var(∫₀³ s dWₛ).",
    answerKey: 9,
    tolerance: 0.01,
    difficulty: -0.2,
    discrimination: 1.1,
    expectedSeconds: 90,
    prereqClosure: ["ito-integral"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "ito-integral--apply-mean-of-ito-integral",
    conceptId: "ito-integral",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "For any adapted, square-integrable Δ, what is E[∫₀⁵ Δₛ dWₛ]?",
    answerKey: 0,
    tolerance: 0.001,
    difficulty: -1.0,
    discrimination: 0.8,
    expectedSeconds: 40,
    prereqClosure: ["ito-integral"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "ito-integral--apply-isometry-constant-integrand",
    conceptId: "ito-integral",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Let Δₛ = 3 (a constant). Using the Itô isometry, find Var(∫₀² 3 dWₛ), and check it against the fact " +
      "that ∫₀² 3 dWₛ = 3(W₂ − W₀) is just 3 times a Normal increment.",
    answerKey: 36,
    tolerance: 0.01,
    difficulty: -0.3,
    discrimination: 1.0,
    expectedSeconds: 90,
    prereqClosure: ["ito-integral", "normal-distribution"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "ito-integral--apply-partition-sum-limit",
    conceptId: "ito-integral",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A partition 0 = t₀ < t₁ < … < tₙ = t is refined so its mesh → 0. Which sum converges (in L²) to " +
      "∫₀ᵗ Wₛ dWₛ?",
    choices: [
      { id: "a", text: "Σᵢ W(tᵢ)[W(tᵢ₊₁) − W(tᵢ)]", correct: true },
      {
        id: "b",
        text: "Σᵢ W(tᵢ₊₁)[W(tᵢ₊₁) − W(tᵢ)]",
        correct: false,
        misconception: {
          id: "right-endpoint-sum",
          description: "This right-endpoint sum converges instead to the Stratonovich integral, ∫Wₛ∘dWₛ = W²ₜ/2, not the Itô integral.",
          blameConceptId: "ito-integral",
        },
      },
      {
        id: "c",
        text: "Σᵢ ½[W(tᵢ) + W(tᵢ₊₁)][W(tᵢ₊₁) − W(tᵢ)]",
        correct: false,
        misconception: {
          id: "midpoint-sum",
          description: "The midpoint (trapezoidal) sum is a different discretization scheme; it also converges to the Stratonovich integral, not the left-endpoint Itô integral.",
          blameConceptId: "ito-integral",
        },
      },
    ],
    difficulty: 0.2,
    discrimination: 1.3,
    expectedSeconds: 75,
    prereqClosure: ["ito-integral"],
    source: shreve("§4.2, The Itô Integral"),
    status: "live",
  },
  {
    id: "ito-integral--explain-why-left-endpoint-martingale",
    conceptId: "ito-integral",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Explain why evaluating Δ at the left endpoint of each sub-interval — rather than the right endpoint " +
      "or midpoint — is what makes the partial Riemann sums, and hence the Itô integral, a martingale.",
    rubric: {
      elements: [
        {
          id: "condition-on-filtration",
          description: "Conditions the increment of the partial sum on ℱ(tᵢ) and notes Δ(tᵢ) is ℱ(tᵢ)-measurable, so it factors out of the conditional expectation.",
          weight: 3,
          required: true,
        },
        {
          id: "zero-mean-increment",
          description: "Uses E[W(tᵢ₊₁) − W(tᵢ) | ℱ(tᵢ)] = 0 from independent increments to conclude the conditional expected increment of the sum is 0.",
          weight: 3,
          required: true,
        },
        {
          id: "right-endpoint-fails",
          description: "Notes that evaluating at the right endpoint tᵢ₊₁ would make the integrand depend on information not yet available at tᵢ, breaking the conditioning argument.",
          weight: 2,
        },
      ],
      forbiddenMoves: [
        {
          id: "claims-pathwise-argument-suffices",
          description: "Argues the martingale property from a pathwise limit rather than the conditional-expectation argument at each partition step — the actual mechanism is discrete-time and probabilistic, not a calculus limit.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.4,
    expectedSeconds: 150,
    prereqClosure: ["ito-integral", "filtrations-and-adapted-processes", "martingales-continuous-time"],
    source: shreve("§4.2, The Itô Integral"),
    status: "live",
  },
  {
    id: "ito-integral--explain-stratonovich-contrast",
    conceptId: "ito-integral",
    format: "mcq",
    cognitive: "explain",
    channels: ["typed"],
    stem: "Which statement correctly contrasts the Itô and Stratonovich integrals?",
    choices: [
      {
        id: "a",
        text:
          "The Stratonovich integral (right/midpoint evaluation) obeys the ordinary chain rule with no correction " +
          "term, but is generally not a martingale; the Itô integral is a martingale but needs the second-order " +
          "correction term in its chain rule.",
        correct: true,
      },
      {
        id: "b",
        text: "The two integrals always agree for smooth enough integrands, so the choice is purely stylistic",
        correct: false,
        misconception: {
          id: "integrals-always-agree",
          description: "The Itô and Stratonovich integrals differ by a deterministic correction term (a covariation term) whenever the integrand depends on W itself; they are related, not interchangeable.",
          blameConceptId: "ito-integral",
        },
      },
      {
        id: "c",
        text: "The Itô integral is the one used in physics because it respects ordinary calculus, while Stratonovich is used in finance for its martingale property",
        correct: false,
        misconception: {
          id: "swapped-fields",
          description: "Gets the convention backwards: Itô (martingale-friendly) dominates finance, while Stratonovich (ordinary-chain-rule-friendly) is more common in physical modeling of noise.",
          blameConceptId: "ito-integral",
        },
      },
    ],
    difficulty: 0.6,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["ito-integral"],
    source: shreve("§4.2, The Itô Integral"),
    status: "live",
  },
  {
    id: "ito-integral--explain-role-of-square-integrability",
    conceptId: "ito-integral",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why does the definition of the Itô integral require E[∫₀ᵗ Δₛ² ds] < ∞, rather than just adaptedness?",
    rubric: {
      elements: [
        {
          id: "isometry-needs-it",
          description: "Explains that this condition is exactly what makes the Itô isometry's right-hand side finite, which is needed for the L² limit defining the integral to exist and be well-behaved.",
          weight: 4,
          required: true,
        },
        {
          id: "l2-space",
          description: "Frames Δ as living in the space of adapted, square-integrable processes on which the integral is an isometry into L²(Ω).",
          weight: 2,
        },
      ],
    },
    difficulty: 0.7,
    discrimination: 1.2,
    expectedSeconds: 90,
    prereqClosure: ["ito-integral"],
    source: shreve("§4.3, The Itô Isometry"),
    status: "live",
  },
  {
    id: "ito-integral--explain-why-not-riemann-stieltjes",
    conceptId: "ito-integral",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why can't ∫₀ᵗ Δₛ dWₛ be defined path-by-path as an ordinary Riemann-Stieltjes integral?",
    rubric: {
      elements: [
        {
          id: "unbounded-variation",
          description: "States that Brownian paths have infinite total variation on any interval, which Riemann-Stieltjes theory requires of the integrator to be finite.",
          weight: 4,
          required: true,
        },
        {
          id: "quadratic-variation-nonzero",
          description: "Connects this to the fact that quadratic variation of W is t (nonzero), which is the quantity a finite-variation path would instead have equal to zero.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.1,
    expectedSeconds: 80,
    prereqClosure: ["ito-integral", "quadratic-variation"],
    source: shreve("§4.2, The Itô Integral"),
    status: "live",
  },
  {
    id: "ito-integral--explain-isometry-cross-terms-vanish",
    conceptId: "ito-integral",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Sketch why, when squaring the Riemann sum Σᵢ Δ(tᵢ)[W(tᵢ₊₁) − W(tᵢ)] and taking expectations, the " +
      "cross terms (i ≠ j) vanish while the diagonal terms (i = j) survive to give E[∫₀ᵗ Δₛ² ds].",
    rubric: {
      elements: [
        {
          id: "independent-increments-cross",
          description: "Explains that for i < j, conditioning on ℱ(tⱼ) makes the later increment W(tⱼ₊₁) − W(tⱼ) independent of everything before it with mean zero, killing the cross term in expectation.",
          weight: 4,
          required: true,
        },
        {
          id: "diagonal-variance",
          description: "Explains that on the diagonal, E[Δ(tᵢ)²(W(tᵢ₊₁) − W(tᵢ))²] = E[Δ(tᵢ)²](tᵢ₊₁ − tᵢ), which sums (in the limit) to E[∫₀ᵗ Δₛ² ds].",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["ito-integral", "quadratic-variation"],
    source: shreve("§4.3, The Itô Isometry"),
    status: "live",
  },
  {
    id: "ito-integral--transfer-martingale-representation-preview",
    conceptId: "ito-integral",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Every Itô integral I(t) = ∫₀ᵗ Δₛ dWₛ is a martingale. What deeper theorem (stated for the general " +
      "Brownian filtration) says the converse essentially holds — that martingales in this filtration all look " +
      "like this?",
    rubric: {
      elements: [
        {
          id: "names-mrt",
          description: "Names the martingale representation theorem.",
          weight: 3,
          required: true,
        },
        {
          id: "states-content",
          description: "States that every martingale M(t) adapted to the Brownian filtration can be written as M(0) + ∫₀ᵗ Δₛ dWₛ for some adapted Δ.",
          weight: 3,
        },
      ],
    },
    difficulty: 1.2,
    discrimination: 1.3,
    expectedSeconds: 100,
    prereqClosure: ["ito-integral", "martingales-continuous-time"],
    source: shreve("§4.2, The Itô Integral"),
    status: "live",
  },
  {
    id: "ito-integral--transfer-connects-to-clt-variance",
    conceptId: "ito-integral",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Both the Itô isometry and the classical variance-of-a-sum formula for independent random variables " +
      "produce a variance by summing squared contributions with no cross terms. Explain the structural analogy: " +
      "what plays the role of \"independent increments\" in each setting?",
    rubric: {
      elements: [
        {
          id: "discrete-analogy",
          description: "Notes that for independent Xᵢ, Var(ΣXᵢ) = ΣVar(Xᵢ) because Cov(Xᵢ,Xⱼ) = 0 for i≠j.",
          weight: 3,
          required: true,
        },
        {
          id: "continuous-analogy",
          description: "Identifies that the Itô isometry's vanishing cross terms come from the same source: non-overlapping Brownian increments are independent, so their product has mean zero.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.2,
    expectedSeconds: 130,
    prereqClosure: ["ito-integral", "variance", "mutual-independence"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "ito-integral--transfer-approximating-integral-numerically",
    conceptId: "ito-integral",
    format: "numeric",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "A Brownian path is sampled at t = 0, 1, 2, 3 with W(0)=0, W(1)=1, W(2)=0.5, W(3)=2. Using the " +
      "left-endpoint Riemann sum (the discrete approximation underlying the Itô integral) with this partition, " +
      "estimate ∫₀³ Wₛ dWₛ.",
    answerKey: 0.75,
    tolerance: 0.01,
    difficulty: 0.9,
    discrimination: 1.1,
    expectedSeconds: 140,
    prereqClosure: ["ito-integral", "brownian-motion"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "ito-integral--transfer-why-right-endpoint-breaks-clt-style-clt",
    conceptId: "ito-integral",
    format: "mcq",
    cognitive: "transfer",
    channels: ["typed"],
    stem:
      "In a simple random walk, martingale differences (fair-game bets decided *before* each step) sum to a " +
      "martingale — the discrete analog of the left-endpoint Itô construction. Which modification to a simple " +
      "random walk's betting strategy would break the martingale property, mirroring what right-endpoint " +
      "evaluation does to the Itô integral?",
    choices: [
      {
        id: "a",
        text: "Letting the bet size on step i depend on the outcome of step i itself, not just on steps before it",
        correct: true,
      },
      {
        id: "b",
        text: "Making the bet size on step i a fixed nonrandom constant",
        correct: false,
        misconception: {
          id: "deterministic-bets-still-fine",
          description: "A deterministic (or ℱ-previsible) bet size is exactly the well-behaved case; it does not break the martingale property.",
          blameConceptId: "martingales-continuous-time",
        },
      },
      {
        id: "c",
        text: "Increasing the number of steps in the random walk",
        correct: false,
        misconception: {
          id: "more-steps-irrelevant",
          description: "The number of steps does not affect whether the strategy is previsible; the martingale property is about information timing, not step count.",
          blameConceptId: "simple-random-walk",
        },
      },
    ],
    difficulty: 1.4,
    discrimination: 1.4,
    expectedSeconds: 120,
    prereqClosure: ["ito-integral", "simple-random-walk", "martingales-continuous-time"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "ito-integral--transfer-isometry-generalizes-chebyshev-bound",
    conceptId: "ito-integral",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Using the Itô isometry together with Chebyshev's inequality, explain how you would bound " +
      "P(|∫₀ᵗ Δₛ dWₛ| > a) for a known bound on E[∫₀ᵗ Δₛ² ds].",
    rubric: {
      elements: [
        {
          id: "isometry-gives-variance",
          description: "Uses the Itô isometry to identify Var(∫₀ᵗ Δₛ dWₛ) = E[∫₀ᵗ Δₛ² ds].",
          weight: 3,
          required: true,
        },
        {
          id: "chebyshev-applied",
          description: "Applies Chebyshev's inequality, P(|X − E[X]| > a) ≤ Var(X)/a², using that the Itô integral has mean 0.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.2,
    expectedSeconds: 130,
    prereqClosure: ["ito-integral", "chebyshev-inequality"],
    source: AUTHORED,
    status: "live",
  },

  // ================= ito-doeblin-formula =================

  {
    id: "ito-doeblin--recall-statement",
    conceptId: "ito-doeblin-formula",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "For dX = μ dt + σ dW, write Itô's formula for df(t, Xₜ), naming each term.",
    rubric: {
      elements: [
        {
          id: "formula",
          description: "Writes df = [f_t + μf_x + ½σ²f_xx] dt + σf_x dW.",
          weight: 4,
          required: true,
        },
        {
          id: "names-correction",
          description: "Identifies ½σ²f_xx dt specifically as the Itô correction term absent from the ordinary chain rule.",
          weight: 2,
        },
      ],
    },
    difficulty: -1.0,
    discrimination: 1.0,
    expectedSeconds: 60,
    prereqClosure: ["ito-doeblin-formula"],
    source: shreve("§4.4, Itô's Formula"),
    status: "live",
  },
  {
    id: "ito-doeblin--recall-why-second-order-survives",
    conceptId: "ito-doeblin-formula",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In the Taylor expansion behind Itô's formula, why does the second-order term ½f_xx(dX)² survive while higher terms vanish?",
    choices: [
      {
        id: "a",
        text: "Because (dW)² = dt is order dt, not smaller, so ½σ²f_xx(dW)² contributes an order-dt term that cannot be dropped",
        correct: true,
      },
      {
        id: "b",
        text: "Because f_xx is generally larger in magnitude than f_x for smooth functions",
        correct: false,
        misconception: {
          id: "magnitude-of-derivative",
          description: "The reason is about the order of dt each term contributes, not the relative size of the derivatives themselves.",
          blameConceptId: "ito-doeblin-formula",
        },
      },
      {
        id: "c",
        text: "Because dt itself is negligible compared to dW, so only quadratic-in-dW terms matter",
        correct: false,
        misconception: {
          id: "dt-negligible-vs-dw",
          description: "Gets the scaling backwards: dt and (dW)² are the same order; dt is not smaller than dW-squared, it equals its expected value/limit.",
          blameConceptId: "quadratic-variation",
        },
      },
    ],
    difficulty: -0.2,
    discrimination: 1.2,
    expectedSeconds: 80,
    prereqClosure: ["ito-doeblin-formula", "quadratic-variation"],
    source: shreve("§4.4, Itô's Formula"),
    status: "live",
  },
  {
    id: "ito-doeblin--recall-multiplication-table",
    conceptId: "ito-doeblin-formula",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "State the Itô multiplication table: what are dt·dt, dt·dW, and dW·dW?",
    rubric: {
      elements: [
        { id: "dtdt", description: "dt · dt = 0.", weight: 2, required: true },
        { id: "dtdw", description: "dt · dW = 0.", weight: 2, required: true },
        { id: "dwdw", description: "dW · dW = dt.", weight: 3, required: true },
      ],
    },
    difficulty: -1.3,
    discrimination: 0.9,
    expectedSeconds: 50,
    prereqClosure: ["ito-doeblin-formula", "quadratic-variation"],
    source: shreve("§4.4, Itô's Formula"),
    status: "live",
  },
  {
    id: "ito-doeblin--recall-form-for-f-of-w-only",
    conceptId: "ito-doeblin-formula",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Specialize Itô's formula to X = W (so μ = 0, σ = 1) and f(x) depending only on x, not t. Write df(Wₜ).",
    rubric: {
      elements: [
        {
          id: "formula",
          description: "Writes df(Wₜ) = ½f''(Wₜ) dt + f'(Wₜ) dWₜ.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: -0.7,
    discrimination: 1.0,
    expectedSeconds: 60,
    prereqClosure: ["ito-doeblin-formula"],
    source: shreve("§4.4, Itô's Formula"),
    status: "live",
  },
  {
    id: "ito-doeblin--apply-f-equals-x-squared",
    conceptId: "ito-doeblin-formula",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Apply Itô's formula to f(x) = x² and X = W to find d(Wₜ²).",
    rubric: {
      elements: [
        {
          id: "formula",
          description: "Derives d(Wₜ²) = dt + 2Wₜ dWₜ (using f_x=2x, f_xx=2, μ=0, σ=1).",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: -0.3,
    discrimination: 1.2,
    expectedSeconds: 90,
    prereqClosure: ["ito-doeblin-formula"],
    source: shreve("§4.4, Itô's Formula"),
    status: "live",
  },
  {
    id: "ito-doeblin--apply-wt-cubed-drift-at-t1",
    conceptId: "ito-doeblin-formula",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Apply Itô's formula to f(x) = x³ and X = W. The drift coefficient of d(Wₜ³) is 3Wₜ. Evaluate this " +
      "drift coefficient at Wₜ = 2.",
    answerKey: 6,
    tolerance: 0.01,
    difficulty: 0.0,
    discrimination: 1.1,
    expectedSeconds: 100,
    prereqClosure: ["ito-doeblin-formula"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "ito-doeblin--apply-geometric-brownian-motion",
    conceptId: "ito-doeblin-formula",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Let Xₜ = exp(σWₜ − ½σ²t) and f(t,x) = ln x. Show that Itô's formula applied to f(t, Xₜ) recovers " +
      "dXₜ = σXₜ dWₜ (i.e., verify Xₜ is driftless geometric Brownian motion).",
    rubric: {
      elements: [
        {
          id: "ito-on-log",
          description: "Correctly computes d(ln Xₜ) directly from the given exponent: ln Xₜ = σWₜ − ½σ²t, so d(ln Xₜ) = σ dWₜ − ½σ² dt.",
          weight: 3,
          required: true,
        },
        {
          id: "invert-with-ito",
          description: "Applies Itô's formula to g(y) = e^y at y = ln Xₜ (g_y = g, g_yy = g) to get dXₜ = Xₜ d(ln Xₜ) + ½Xₜ (d ln Xₜ)² = Xₜ(σ dWₜ − ½σ²dt) + ½Xₜσ²dt.",
          weight: 4,
          required: true,
        },
        {
          id: "cancellation",
          description: "Shows the −½σ² dt and +½σ² dt terms cancel, leaving dXₜ = σXₜ dWₜ exactly.",
          weight: 3,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "drops-correction-both-ways",
          description: "Treats ln and exp as ordinary inverse chain-rule operations without ever applying the ½·second-derivative correction, which happens to hide the very cancellation the item is testing.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["ito-doeblin-formula"],
    source: shreve("§4.4, Itô's Formula, geometric Brownian motion example"),
    status: "live",
  },
  {
    id: "ito-doeblin--apply-integrate-dw2-formula",
    conceptId: "ito-doeblin-formula",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "From d(Wₜ²) = dt + 2Wₜ dWₜ, integrate both sides from 0 to t = 9 and solve for ∫₀⁹ Wₛ dWₛ in terms of " +
      "W₉ and t, then evaluate it given W₉ = 5.",
    answerKey: 8,
    tolerance: 0.01,
    difficulty: 0.5,
    discrimination: 1.3,
    expectedSeconds: 130,
    prereqClosure: ["ito-doeblin-formula", "ito-integral"],
    source: shreve("§4.4, Itô's Formula, example"),
    status: "live",
  },
  {
    id: "ito-doeblin--apply-f-of-t-and-x-mixed",
    conceptId: "ito-doeblin-formula",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Let f(t,x) = eᵗ x². Apply Itô's formula with X = W to write df(t, Wₜ).",
    rubric: {
      elements: [
        {
          id: "partials",
          description: "Correctly computes f_t = e^t x², f_x = 2e^t x, f_xx = 2e^t.",
          weight: 3,
          required: true,
        },
        {
          id: "assemble",
          description: "Assembles df = e^t[Wₜ² + 1] dt + 2e^t Wₜ dWₜ (using μ=0, σ=1 for W).",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.3,
    expectedSeconds: 140,
    prereqClosure: ["ito-doeblin-formula"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "ito-doeblin--apply-numeric-drift-coefficient-sde",
    conceptId: "ito-doeblin-formula",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Let dXₜ = 2 dt + 3 dWₜ and f(x) = x². By Itô's formula, the dt-coefficient of d(f(Xₜ)) is 2Xₜ·μ + " +
      "½σ²f_xx = 2Xₜ(2) + ½(9)(2). Evaluate this dt-coefficient at Xₜ = 1.",
    answerKey: 13,
    tolerance: 0.01,
    difficulty: 0.3,
    discrimination: 1.1,
    expectedSeconds: 110,
    prereqClosure: ["ito-doeblin-formula"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "ito-doeblin--explain-taylor-expansion-origin",
    conceptId: "ito-doeblin-formula",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Starting from the full second-order Taylor expansion df = f_t dt + f_x dX + ½f_xx(dX)² + …, derive " +
      "Itô's formula by substituting dX = μ dt + σ dW and discarding negligible terms. Be explicit about which " +
      "terms are discarded and why.",
    rubric: {
      elements: [
        {
          id: "expand-dx-squared",
          description: "Expands (dX)² = μ²(dt)² + 2μσ dt dW + σ²(dW)² using the substitution.",
          weight: 3,
          required: true,
        },
        {
          id: "apply-multiplication-table",
          description: "Applies dt·dt = 0, dt·dW = 0, dW·dW = dt to reduce (dX)² to exactly σ² dt.",
          weight: 3,
          required: true,
        },
        {
          id: "discard-higher-order",
          description: "Explains that f_tt(dt)², f_tx dt·dX, and higher terms are all o(dt) and correctly discarded, unlike ½f_xx(dX)² which is not.",
          weight: 3,
          required: true,
        },
        {
          id: "assemble-final",
          description: "Collects surviving terms into df = [f_t + μf_x + ½σ²f_xx] dt + σf_x dW.",
          weight: 3,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "drops-second-order-entirely",
          description: "Truncates the Taylor expansion at first order the way ordinary multivariable calculus would, discarding ½f_xx(dX)² along with the genuinely negligible terms.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.5,
    expectedSeconds: 220,
    prereqClosure: ["ito-doeblin-formula", "quadratic-variation"],
    source: shreve("§4.4, Itô's Formula, derivation"),
    status: "live",
  },
  {
    id: "ito-doeblin--explain-what-breaks-if-correction-dropped",
    conceptId: "ito-doeblin-formula",
    format: "mcq",
    cognitive: "explain",
    channels: ["typed"],
    stem:
      "Suppose someone applies the ordinary chain rule to d(Wₜ²), getting d(Wₜ²) = 2Wₜ dWₜ (dropping the dt " +
      "term). What goes wrong?",
    choices: [
      {
        id: "a",
        text: "The result would claim Wₜ² is a martingale (an Itô integral has mean 0), but E[Wₜ²] = t ≠ 0, a direct contradiction",
        correct: true,
      },
      {
        id: "b",
        text: "Nothing goes wrong for small t, since the dt term is negligible for short time horizons",
        correct: false,
        misconception: {
          id: "small-t-approximation",
          description: "The dt correction is order dt, exactly the same order as the time increment itself — it is never negligible relative to the interval over which it accumulates, at any time horizon.",
          blameConceptId: "ito-doeblin-formula",
        },
      },
      {
        id: "c",
        text: "The formula is still correct, just missing a constant of integration",
        correct: false,
        misconception: {
          id: "missing-constant-of-integration",
          description: "This isn't a missing constant — it's a missing dt term that accumulates over time (∫₀ᵗ dt = t), fundamentally changing the process's mean.",
          blameConceptId: "ito-doeblin-formula",
        },
      },
    ],
    difficulty: 0.4,
    discrimination: 1.4,
    expectedSeconds: 100,
    prereqClosure: ["ito-doeblin-formula", "martingales-continuous-time"],
    source: shreve("§4.4, Itô's Formula, example"),
    status: "live",
  },
  {
    id: "ito-doeblin--explain-role-of-f-smoothness",
    conceptId: "ito-doeblin-formula",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why does Itô's formula require f to be twice differentiable in x, but only once differentiable in t?",
    rubric: {
      elements: [
        {
          id: "x-second-order",
          description: "Explains that the second x-derivative is needed because (dX)² is order dt (via dW·dW=dt), so f_xx appears in the surviving dt-order term.",
          weight: 3,
          required: true,
        },
        {
          id: "t-first-order",
          description: "Explains that dt itself is already order dt, so (dt)² is negligible and no second t-derivative term ever survives.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.2,
    expectedSeconds: 100,
    prereqClosure: ["ito-doeblin-formula"],
    source: shreve("§4.4, Itô's Formula"),
    status: "live",
  },
  {
    id: "ito-doeblin--explain-connects-to-quadratic-variation",
    conceptId: "ito-doeblin-formula",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "In one sentence, connect the Itô correction term to the concept of quadratic variation.",
    rubric: {
      elements: [
        {
          id: "connection",
          description: "States that the correction term exists because Brownian motion accumulates nonzero quadratic variation at rate dt, unlike a differentiable path whose quadratic variation is 0.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.1,
    expectedSeconds: 70,
    prereqClosure: ["ito-doeblin-formula", "quadratic-variation"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "ito-doeblin--transfer-black-scholes-pde-preview",
    conceptId: "ito-doeblin-formula",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "In the derivation of the Black-Scholes-Merton PDE, Itô's formula is applied to the option value " +
      "function V(t, Sₜ) where Sₜ follows geometric Brownian motion. Which term in Itô's formula is responsible " +
      "for the PDE containing a ½σ²S²V_SS term (the 'gamma' term)?",
    rubric: {
      elements: [
        {
          id: "identifies-correction-term",
          description: "Identifies the ½σ²f_xx dt Itô correction term (here with f=V, σ→σS from GBM) as the direct source of the ½σ²S²V_SS term.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.3,
    expectedSeconds: 110,
    prereqClosure: ["ito-doeblin-formula"],
    source: shreve("§4.4, Itô's Formula, why this matters"),
    status: "live",
  },
  {
    id: "ito-doeblin--transfer-ornstein-uhlenbeck-integrating-factor",
    conceptId: "ito-doeblin-formula",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "For the Ornstein-Uhlenbeck SDE dXₜ = −θXₜ dt + σ dWₜ, applying Itô's formula to f(t,x) = e^{θt}x lets " +
      "you solve the SDE exactly. Compute d(e^{θt}Xₜ) using Itô's formula, and explain why no second-order " +
      "correction term appears despite this being an Itô-formula application.",
    rubric: {
      elements: [
        {
          id: "formula",
          description: "Derives d(e^{θt}Xₜ) = e^{θt}σ dWₜ, i.e., the drift terms exactly cancel.",
          weight: 4,
          required: true,
        },
        {
          id: "no-correction-because-linear",
          description: "Explains that f(t,x)=e^{θt}x is linear in x, so f_xx = 0, making the Itô correction term ½σ²f_xx vanish identically — not because the formula doesn't apply, but because this particular f has zero curvature in x.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.4,
    expectedSeconds: 180,
    prereqClosure: ["ito-doeblin-formula"],
    source: shreve("§4.4, Itô's Formula, integrating-factor technique"),
    status: "live",
  },
  {
    id: "ito-doeblin--transfer-numeric-ou-check",
    conceptId: "ito-doeblin-formula",
    format: "numeric",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "Using d(e^{θt}Xₜ) = e^{θt}σ dWₜ from the Ornstein-Uhlenbeck integrating-factor trick, integrate from " +
      "0 to t and solve for Xₜ: Xₜ = X₀e^{−θt} + σ∫₀ᵗ e^{−θ(t−s)} dWₛ. With θ = 1, X₀ = 2, t = ln 4 (so " +
      "e^{−θt} = 1/4), and assuming the stochastic integral term happens to equal 0 on this sample path, what is Xₜ?",
    answerKey: 0.5,
    tolerance: 0.01,
    difficulty: 1.2,
    discrimination: 1.1,
    expectedSeconds: 150,
    prereqClosure: ["ito-doeblin-formula", "ito-integral"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "ito-doeblin--transfer-compare-to-classical-chain-rule",
    conceptId: "ito-doeblin-formula",
    format: "mcq",
    cognitive: "transfer",
    channels: ["typed"],
    stem:
      "If Xₜ were instead a differentiable deterministic function of t (σ = 0), what would Itô's formula " +
      "reduce to, and why?",
    choices: [
      {
        id: "a",
        text: "The ordinary chain rule df = [f_t + μf_x] dt, because σ=0 makes both the dW term and the ½σ²f_xx correction vanish",
        correct: true,
      },
      {
        id: "b",
        text: "Itô's formula still needs the ½σ²f_xx term even with σ=0, since it depends only on f's curvature",
        correct: false,
        misconception: {
          id: "correction-independent-of-sigma",
          description: "The correction term is ½σ²f_xx — it scales with σ², so σ=0 makes it exactly zero regardless of f's curvature.",
          blameConceptId: "ito-doeblin-formula",
        },
      },
      {
        id: "c",
        text: "The formula becomes undefined when σ=0, since Itô's formula assumes genuine randomness",
        correct: false,
        misconception: {
          id: "assumes-formula-needs-randomness",
          description: "Itô's formula is a Taylor-expansion identity that degenerates gracefully to the deterministic chain rule when σ=0; it doesn't become undefined.",
          blameConceptId: "ito-doeblin-formula",
        },
      },
    ],
    difficulty: 0.7,
    discrimination: 1.2,
    expectedSeconds: 90,
    prereqClosure: ["ito-doeblin-formula"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "ito-doeblin--transfer-mgf-style-exponential-martingale",
    conceptId: "ito-doeblin-formula",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Let f(t,x) = exp(θx − ½θ²t) for constant θ, applied to X = W. Show, using Itô's formula, that " +
      "f(t, Wₜ) is driftless (i.e., its dt-coefficient is exactly 0), which is why this exponential process is a " +
      "martingale — the continuous-time analogue of a moment generating function trick.",
    rubric: {
      elements: [
        {
          id: "partials",
          description: "Computes f_t = −½θ²f, f_x = θf, f_xx = θ²f.",
          weight: 3,
          required: true,
        },
        {
          id: "dt-coefficient-zero",
          description: "Assembles the dt-coefficient f_t + 0·f_x + ½(1)²f_xx = −½θ²f + ½θ²f = 0 and concludes the process has zero drift.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.5,
    expectedSeconds: 200,
    prereqClosure: ["ito-doeblin-formula", "mgf"],
    source: shreve("§4.4, Itô's Formula, exponential martingale"),
    status: "live",
  },
  {
    id: "ito-doeblin--apply-numeric-exponential-martingale-value",
    conceptId: "ito-doeblin-formula",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "For f(t,x) = exp(θx − ½θ²t) applied to Brownian motion with θ = 2, evaluate the dt-coefficient's two " +
      "pieces f_t and ½f_xx separately at t = 3, x = 1, and report their sum (which Itô's formula says must be 0).",
    answerKey: 0,
    tolerance: 1e-9,
    difficulty: 0.5,
    discrimination: 1.1,
    expectedSeconds: 100,
    prereqClosure: ["ito-doeblin-formula"],
    source: AUTHORED,
    status: "live",
  },

  // ================= multidimensional-ito-calculus =================

  {
    id: "multidim-ito--recall-cross-variation-table",
    conceptId: "multidimensional-ito-calculus",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem:
      "For two Brownian motions W¹ and W² with instantaneous correlation ρ, what is dW¹·dW²? What does it " +
      "reduce to when ρ = 0 and when the two are the same process (i = j)?",
    rubric: {
      elements: [
        { id: "general", description: "States dW¹·dW² = ρ dt.", weight: 3, required: true },
        { id: "independent-case", description: "States it reduces to 0 when ρ = 0 (independent).", weight: 2 },
        { id: "same-process-case", description: "States it reduces to dt when i = j (ρ_ii = 1), recovering the one-dimensional rule.", weight: 2 },
      ],
    },
    difficulty: -0.8,
    discrimination: 1.0,
    expectedSeconds: 60,
    prereqClosure: ["multidimensional-ito-calculus"],
    source: shreve("§4.7, Multiple Stock Prices"),
    status: "live",
  },
  {
    id: "multidim-ito--recall-multivariate-formula",
    conceptId: "multidimensional-ito-calculus",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem:
      "Write the multivariate Itô formula for df(t, Xₜ) where dXⁱ = μᵢ dt + Σₖσᵢₖ dWᵏ, naming what plays " +
      "the role of the one-dimensional ½σ²f_xx term.",
    rubric: {
      elements: [
        {
          id: "formula",
          description: "Writes df = f_t dt + ∇f·dX + ½Σᵢⱼ(σσᵀ)ᵢⱼ f_{xᵢxⱼ} dt.",
          weight: 4,
          required: true,
        },
        {
          id: "role",
          description: "Identifies the ½Σᵢⱼ(σσᵀ)ᵢⱼf_{xᵢxⱼ} dt sum as the multidimensional generalization of the single ½σ²f_xx term.",
          weight: 3,
        },
      ],
    },
    difficulty: -0.2,
    discrimination: 1.1,
    expectedSeconds: 80,
    prereqClosure: ["multidimensional-ito-calculus"],
    source: shreve("§4.7, Multiple Stock Prices"),
    status: "live",
  },
  {
    id: "multidim-ito--recall-when-cross-terms-vanish",
    conceptId: "multidimensional-ito-calculus",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Under what condition does the multivariate Itô formula collapse into n separate copies of the one-dimensional formula?",
    choices: [
      {
        id: "a",
        text: "When all the Brownian motions are pairwise independent (ρᵢⱼ = 0 for i ≠ j)",
        correct: true,
      },
      {
        id: "b",
        text: "When f is linear in each coordinate",
        correct: false,
        misconception: {
          id: "linearity-not-independence",
          description: "Linear f makes all second-derivative terms (diagonal and off-diagonal) vanish entirely, which is a stronger and different condition — it removes the correction terms rather than merely decoupling coordinates.",
          blameConceptId: "multidimensional-ito-calculus",
        },
      },
      {
        id: "c",
        text: "When n = 2, since cross terms only appear with three or more processes",
        correct: false,
        misconception: {
          id: "cross-terms-need-three-processes",
          description: "Cross terms appear with as few as two correlated processes (the i≠j pair); the count n is irrelevant to whether they vanish.",
          blameConceptId: "multidimensional-ito-calculus",
        },
      },
    ],
    difficulty: 0.0,
    discrimination: 1.2,
    expectedSeconds: 80,
    prereqClosure: ["multidimensional-ito-calculus"],
    source: shreve("§4.7, Multiple Stock Prices"),
    status: "live",
  },
  {
    id: "multidim-ito--recall-product-rule-form",
    conceptId: "multidimensional-ito-calculus",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "State the Itô product rule d(XₜYₜ) for two Itô processes X, Y in terms of dX, dY, and their cross-variation.",
    rubric: {
      elements: [
        {
          id: "formula",
          description: "Writes d(XY) = X dY + Y dX + dX·dY (the multidimensional Itô formula applied to f(x,y)=xy).",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: -0.5,
    discrimination: 1.0,
    expectedSeconds: 70,
    prereqClosure: ["multidimensional-ito-calculus"],
    source: shreve("§4.7, Multiple Stock Prices"),
    status: "live",
  },
  {
    id: "multidim-ito--recall-generalizes-covariance",
    conceptId: "multidimensional-ito-calculus",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "What discrete-probability concept does the cross-variation rate ρᵢⱼ (or more generally (σσᵀ)ᵢⱼ) generalize?",
    rubric: {
      elements: [
        {
          id: "covariance",
          description: "States that it plays the role of covariance/correlation between the two noise sources, generalized to continuous time.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: -0.4,
    discrimination: 0.9,
    expectedSeconds: 55,
    prereqClosure: ["multidimensional-ito-calculus", "variance"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "multidim-ito--apply-product-of-two-gbms",
    conceptId: "multidimensional-ito-calculus",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Let dS¹ = μ₁S¹dt + σ₁S¹dW¹ and dS² = μ₂S²dt + σ₂S²dW², with d⟨W¹,W²⟩ₜ = ρ dt. Apply the multivariate " +
      "Itô formula to f(x,y)=xy to find d(S¹S²).",
    rubric: {
      elements: [
        {
          id: "chain-rule-terms",
          description: "Includes the ordinary terms S²dS¹ + S¹dS².",
          weight: 3,
          required: true,
        },
        {
          id: "cross-term",
          description: "Includes the cross-variation term ρσ₁σ₂S¹S² dt from f_{xy}=1 times dS¹·dS².",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.3,
    expectedSeconds: 140,
    prereqClosure: ["multidimensional-ito-calculus"],
    source: shreve("§4.7, Multiple Stock Prices, product example"),
    status: "live",
  },
  {
    id: "multidim-ito--apply-numeric-drift-of-product",
    conceptId: "multidimensional-ito-calculus",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Two correlated GBMs have μ₁ = 0.05, μ₂ = 0.03, σ₁ = 0.2, σ₂ = 0.3, ρ = 0.5. The combined drift of " +
      "S¹S² is (μ₁+μ₂+ρσ₁σ₂). Compute this combined drift.",
    answerKey: 0.11,
    tolerance: 0.001,
    difficulty: 0.4,
    discrimination: 1.2,
    expectedSeconds: 100,
    prereqClosure: ["multidimensional-ito-calculus"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "multidim-ito--apply-quotient-rule",
    conceptId: "multidimensional-ito-calculus",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Apply the multivariate Itô formula to f(x,y) = x/y to derive d(Sₜ¹/Sₜ²) for two correlated Itô " +
      "processes S¹, S² (with S² ≠ 0), including all necessary partial derivatives f_x, f_y, f_xx, f_yy, f_xy.",
    rubric: {
      elements: [
        {
          id: "partials",
          description: "Correctly computes f_x=1/y, f_y=−x/y², f_xx=0, f_yy=2x/y³, f_xy=−1/y².",
          weight: 3,
          required: true,
        },
        {
          id: "assembles-all-terms",
          description: "Assembles the full formula including both diagonal terms (½·f_yy·dY·dY) and the off-diagonal cross term (f_xy·dX·dY), not just the naive quotient-rule terms f_x dX + f_y dY.",
          weight: 5,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "ordinary-quotient-rule-only",
          description: "Applies only the deterministic quotient rule d(x/y) = dX/Y − X dY/Y² without any second-order correction terms — this is exactly the mistake the multidimensional Itô formula exists to correct.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.5,
    expectedSeconds: 200,
    prereqClosure: ["multidimensional-ito-calculus"],
    source: shreve("§4.7, Multiple Stock Prices, ratio process"),
    status: "live",
  },
  {
    id: "multidim-ito--apply-independent-case-numeric",
    conceptId: "multidimensional-ito-calculus",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Two independent Brownian motions W¹, W² drive dX = X dW¹ + X dW². Apply the multivariate Itô formula " +
      "to f(x) = x² to find the dt-coefficient of d(Xₜ²) at Xₜ = 3. (Hint: (σσᵀ) here is the sum of squared " +
      "diffusion coefficients since ρ=0 makes cross terms vanish, each coefficient is 1.)",
    answerKey: 9,
    tolerance: 0.01,
    difficulty: 0.6,
    discrimination: 1.3,
    expectedSeconds: 130,
    prereqClosure: ["multidimensional-ito-calculus"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "multidim-ito--apply-covariance-of-two-integrals",
    conceptId: "multidimensional-ito-calculus",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "For correlated Brownian motions with d⟨W¹,W²⟩ₜ=ρdt, ρ=0.4, the multidimensional analog of the Itô " +
      "isometry gives Cov(∫₀ᵗdW¹ₛ, ∫₀ᵗdW²ₛ) = ρt. Compute this covariance for t = 5.",
    answerKey: 2,
    tolerance: 0.01,
    difficulty: 0.2,
    discrimination: 1.1,
    expectedSeconds: 90,
    prereqClosure: ["multidimensional-ito-calculus", "ito-integral"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "multidim-ito--explain-why-off-diagonal-hessian-matters",
    conceptId: "multidimensional-ito-calculus",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why the off-diagonal Hessian term (σσᵀ)ᵢⱼf_{xᵢxⱼ}dt (for i≠j) is 'genuinely new' compared to " +
      "the one-dimensional case, and name the two conditions both of which must hold for it to be nonzero.",
    rubric: {
      elements: [
        {
          id: "two-conditions",
          description: "States both conditions: the two noise sources must be correlated (ρᵢⱼ≠0) AND f must have nonzero mixed curvature (f_{xᵢxⱼ}≠0) between those coordinates.",
          weight: 4,
          required: true,
        },
        {
          id: "one-dim-has-no-analog",
          description: "Explains that with only one Brownian motion there is no 'other' coordinate to correlate with, so this term simply cannot arise in the 1-D formula.",
          weight: 3,
        },
      ],
    },
    difficulty: 0.7,
    discrimination: 1.3,
    expectedSeconds: 110,
    prereqClosure: ["multidimensional-ito-calculus"],
    source: shreve("§4.7, Multiple Stock Prices"),
    status: "live",
  },
  {
    id: "multidim-ito--explain-independence-collapses-formula",
    conceptId: "multidimensional-ito-calculus",
    format: "mcq",
    cognitive: "explain",
    channels: ["typed"],
    stem:
      "If ρᵢⱼ = 0 for all i ≠ j, which statement correctly describes what happens to the multivariate Itô " +
      "formula?",
    choices: [
      {
        id: "a",
        text: "It reduces to n separate one-dimensional Itô formulas, one per coordinate, since every cross term vanishes",
        correct: true,
      },
      {
        id: "b",
        text: "It reduces to the ordinary multivariable chain rule with no correction terms at all",
        correct: false,
        misconception: {
          id: "drops-diagonal-terms-too",
          description: "Independence kills only the off-diagonal (i≠j) terms; the diagonal ½σᵢᵢ²f_{xᵢxᵢ}dt terms survive exactly as in the one-dimensional case, since ρᵢᵢ=1 always.",
          blameConceptId: "multidimensional-ito-calculus",
        },
      },
      {
        id: "c",
        text: "The formula becomes undefined, since it was built specifically to handle correlation",
        correct: false,
        misconception: {
          id: "assumes-formula-requires-correlation",
          description: "Zero correlation is a special (and perfectly valid) case of the general formula, not something outside its scope.",
          blameConceptId: "multidimensional-ito-calculus",
        },
      },
    ],
    difficulty: 0.5,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["multidimensional-ito-calculus"],
    source: shreve("§4.7, Multiple Stock Prices"),
    status: "live",
  },
  {
    id: "multidim-ito--explain-derive-multiplication-table-from-correlation",
    conceptId: "multidimensional-ito-calculus",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Two Brownian motions are constructed as W¹ = B¹ and W² = ρB¹ + √(1−ρ²)B², where B¹, B² are " +
      "independent standard Brownian motions. Derive that d⟨W¹,W²⟩ₜ = ρ dt from this construction.",
    rubric: {
      elements: [
        {
          id: "expand-product",
          description: "Computes dW¹·dW² = dB¹·(ρdB¹+√(1−ρ²)dB²) = ρ(dB¹)² + √(1−ρ²)dB¹dB².",
          weight: 4,
          required: true,
        },
        {
          id: "apply-independence-and-table",
          description: "Uses (dB¹)²=dt and, by independence of B¹,B², dB¹dB²=0, leaving exactly ρ dt.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["multidimensional-ito-calculus", "mutual-independence"],
    source: shreve("§4.7, Multiple Stock Prices, correlated BM construction"),
    status: "live",
  },
  {
    id: "multidim-ito--explain-hessian-symmetric-role",
    conceptId: "multidimensional-ito-calculus",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "In the sum ½Σᵢⱼ(σσᵀ)ᵢⱼf_{xᵢxⱼ}dt, explain why each off-diagonal pair (i,j) with i≠j is effectively " +
      "counted twice (once as (i,j) and once as (j,i)), and why this is correct rather than double-counting error.",
    rubric: {
      elements: [
        {
          id: "symmetry-of-both-matrices",
          description: "Notes that both (σσᵀ) and the Hessian f_{xᵢxⱼ} are symmetric matrices (Clairaut's theorem for f), so the (i,j) and (j,i) terms are numerically equal.",
          weight: 3,
          required: true,
        },
        {
          id: "half-factor-compensates",
          description: "Explains the leading ½ exists precisely to compensate for this symmetric double-counting, so the total correctly represents each unordered pair's contribution once.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.2,
    expectedSeconds: 130,
    prereqClosure: ["multidimensional-ito-calculus"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "multidim-ito--transfer-multivariate-girsanov-link",
    conceptId: "multidimensional-ito-calculus",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Why does the multivariate Girsanov theorem (changing measure for several correlated Brownian motions " +
      "at once) need the multivariate Itô formula, rather than just applying the one-dimensional Girsanov " +
      "theorem separately to each Wⁱ?",
    rubric: {
      elements: [
        {
          id: "correlation-not-separable",
          description: "Explains that applying the change of measure coordinate-by-coordinate would ignore the cross-variation between the Wⁱ, which the multivariate formula (and multivariate Girsanov) must track jointly to get the correct drift adjustment for correlated assets.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.4,
    expectedSeconds: 140,
    prereqClosure: ["multidimensional-ito-calculus"],
    source: shreve("§4.7, Multiple Stock Prices, why this matters"),
    status: "live",
  },
  {
    id: "multidim-ito--transfer-basket-option-variance",
    conceptId: "multidimensional-ito-calculus",
    format: "numeric",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "A portfolio value is V = S¹ + S², with dS¹=σ₁S¹dW¹, dS²=σ₂S²dW² (zero drift for simplicity), " +
      "d⟨W¹,W²⟩ₜ=ρdt. Apply the multivariate Itô formula to f(x,y)=x+y (so f_xx=f_yy=f_xy=0) to find dV, and " +
      "hence the *quadratic variation rate* d⟨V,V⟩ₜ/dt at S¹=S²=1, σ₁=0.2, σ₂=0.3, ρ=0.5. (⟨V,V⟩ variance " +
      "rate = σ₁²S¹²+σ₂²S²²+2ρσ₁σ₂S¹S².)",
    answerKey: 0.19,
    tolerance: 0.001,
    difficulty: 1.5,
    discrimination: 1.4,
    expectedSeconds: 200,
    prereqClosure: ["multidimensional-ito-calculus", "variance"],
    source: shreve("§4.7, Multiple Stock Prices, portfolio variance"),
    status: "live",
  },
  {
    id: "multidim-ito--transfer-compare-clt-covariance-structure",
    conceptId: "multidimensional-ito-calculus",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Explain the structural parallel between Var(X+Y) = Var(X)+Var(Y)+2Cov(X,Y) for ordinary random " +
      "variables, and the quadratic variation rate d⟨S¹+S²,S¹+S²⟩ₜ formula that includes a 2ρσ₁σ₂S¹S² cross " +
      "term.",
    rubric: {
      elements: [
        {
          id: "identifies-parallel",
          description: "Identifies that the cross-variation term 2ρσ₁σ₂S¹S²dt plays exactly the role of 2Cov(X,Y) in the classical variance-of-a-sum formula, both arising from the bilinearity of variance/covariation.",
          weight: 4,
          required: true,
        },
        {
          id: "notes-continuous-time-mechanism",
          description: "Notes the continuous-time version arises mechanically from the off-diagonal Hessian term of the multivariate Itô formula applied to f(x,y)=x+y, rather than from an independent probabilistic argument.",
          weight: 3,
        },
      ],
    },
    difficulty: 1.2,
    discrimination: 1.3,
    expectedSeconds: 140,
    prereqClosure: ["multidimensional-ito-calculus", "variance"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "multidim-ito--transfer-exchange-option-driver",
    conceptId: "multidimensional-ito-calculus",
    format: "mcq",
    cognitive: "transfer",
    channels: ["typed"],
    stem:
      "An exchange option's payoff depends on S¹/S² at maturity. Which fact about the multidimensional Itô " +
      "formula explains why the *correlation* ρ between the two underlyings' Brownian motions directly affects " +
      "the option's fair price, not just each stock's individual volatility?",
    choices: [
      {
        id: "a",
        text: "Because d(S¹/S²) picks up a cross-variation term proportional to ρσ₁σ₂ from the off-diagonal Hessian of f(x,y)=x/y, which changes the ratio process's own effective volatility",
        correct: true,
      },
      {
        id: "b",
        text: "Because correlation changes each stock's own drift μᵢ, which directly appears in the option pricing formula",
        correct: false,
        misconception: {
          id: "correlation-changes-individual-drift",
          description: "Correlation ρ is a property of the joint noise structure and does not alter either stock's own marginal drift μᵢ; its effect enters only through the cross-variation term in a function of both processes.",
          blameConceptId: "multidimensional-ito-calculus",
        },
      },
      {
        id: "c",
        text: "It doesn't — under risk-neutral pricing, correlation between the underlyings cancels out of any ratio-based payoff",
        correct: false,
        misconception: {
          id: "correlation-cancels-in-ratio",
          description: "The opposite is true: for a ratio or exchange payoff, correlation directly determines the ratio process's effective diffusion coefficient (σ₁²+σ₂²−2ρσ₁σ₂ style term), so it strongly affects the price.",
          blameConceptId: "multidimensional-ito-calculus",
        },
      },
    ],
    difficulty: 1.8,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["multidimensional-ito-calculus"],
    source: shreve("§4.7, Multiple Stock Prices, exchange option"),
    status: "live",
  },
  {
    id: "multidim-ito--explain-two-dimensional-formula-derivation",
    conceptId: "multidimensional-ito-calculus",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "For X = W¹ (independent of W²) and Y = W², derive Itô's formula for f(X,Y) from the general " +
      "two-variable Taylor expansion, and show why the dW¹dW² cross term drops out entirely.",
    rubric: {
      elements: [
        {
          id: "taylor-terms",
          description: "Writes the second-order Taylor expansion df = f_x dX + f_y dY + ½f_xx(dX)² + f_xy dXdY + ½f_yy(dY)².",
          weight: 3,
          required: true,
        },
        {
          id: "independence-kills-cross-term",
          description: "Uses independence of W¹ and W² to argue dW¹dW² = ρ dt with ρ = 0, so the f_xy term vanishes and only the diagonal ½f_xx dt + ½f_yy dt terms survive.",
          weight: 4,
          required: true,
          misconception: {
            id: "assumes-cross-term-always-present",
            description: "Keeps a nonzero dW¹dW² cross term even when the two driving Brownian motions are independent, treating correlation as always present rather than as a modeling choice.",
            blameConceptId: "multidimensional-ito-calculus",
          },
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.4,
    expectedSeconds: 180,
    prereqClosure: ["multidimensional-ito-calculus", "ito-doeblin-formula", "mutual-independence"],
    source: shreve("§4.7, Two Functions of Two Brownian Motions"),
    status: "live",
  },
  {
    id: "multidim-ito--transfer-portfolio-variance-numeric",
    conceptId: "multidimensional-ito-calculus",
    format: "numeric",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "A portfolio value is V = S¹ + S², where dS¹ = σ₁S¹dW¹ and dS² = σ₂S²dW² with σ₁ = 0.3, σ₂ = 0.2, " +
      "correlation ρ = 0.5, and at some instant S¹ = S² = 10. Using the multidimensional Itô product/sum rule, " +
      "find the instantaneous variance rate of dV (i.e. the dt-coefficient of (dV)²).",
    answerKey: 19,
    tolerance: 0.5,
    difficulty: 1.4,
    discrimination: 1.4,
    expectedSeconds: 160,
    prereqClosure: ["multidimensional-ito-calculus", "variance"],
    source: AUTHORED,
    status: "live",
  },
];
