import type { Item } from "../../lib/assessment/types";
import { ML_18 } from "./sources";

/**
 * Cluster 18 — the road into diffusion: normalizing flows, score matching and
 * denoising score matching. Eight items per concept, two each at recall,
 * apply, explain and transfer. The numeric items are one-dimensional on
 * purpose: a Gaussian is the one case where the density, the score and the
 * optimal denoiser can all be written down, so a learner can check each
 * identity by hand before trusting it in a thousand dimensions.
 */
const FLOWS = ["normalizing-flows", "change-of-variables-jacobian", "mle"];
const SCORE = ["score-matching", "normalizing-flows", "kl-divergence"];
const DSM = ["denoising-score-matching", "score-matching", "normal-distribution"];

export const ml18Items: Item[] = [
  // --- Normalizing Flows ------------------------------------------------------
  {
    id: "normalizing-flows--recall-log-likelihood",
    conceptId: "normalizing-flows",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "handwritten"],
    stem: "A flow maps $z \\sim p_Z$ to $x = f(z)$ with $f$ invertible. Write $\\log p_X(x)$ in terms of $p_Z$ and $f$, and say why $f$ must be invertible.",
    rubric: {
      elements: [
        { id: "formula", description: "$\\log p_X(x) = \\log p_Z(f^{-1}(x)) + \\log|\\det J_{f^{-1}}(x)| = \\log p_Z(z) - \\log|\\det J_f(z)|$ (for a composition, a sum of per-layer log-determinants).", weight: 4, required: true },
        { id: "invertible", description: "Invertibility is needed to map each data point back to a unique $z$ and for the change-of-variables formula to hold, so the likelihood of any $x$ can be evaluated exactly.", weight: 3 },
      ],
    },
    difficulty: -0.6,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: FLOWS,
    source: ML_18,
    status: "live",
  },
  {
    id: "normalizing-flows--recall-coupling-layer",
    conceptId: "normalizing-flows",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Why are affine coupling layers (as in RealNVP) the standard building block of normalizing flows?",
    choices: [
      { id: "a", text: "Their Jacobian is triangular, so the log-determinant is a simple sum, and their inverse is as cheap as the forward pass", correct: true },
      {
        id: "b",
        text: "They reduce the dimension of the data, giving a compact latent code",
        correct: false,
        misconception: {
          id: "flows-reduce-dimension",
          description: "Flows are bijections and must preserve dimension; coupling layers do not compress.",
          blameConceptId: "normalizing-flows",
        },
      },
      {
        id: "c",
        text: "They remove the need to compute any determinant",
        correct: false,
        misconception: {
          id: "flows-no-determinant",
          description: "The determinant is still needed; coupling makes it cheap, not unnecessary.",
          blameConceptId: "change-of-variables-jacobian",
        },
      },
      {
        id: "d",
        text: "Their scale and shift networks $s$ and $t$ must themselves be invertible",
        correct: false,
        misconception: {
          id: "flows-st-invertible",
          description: "$s$ and $t$ can be arbitrary networks; invertibility comes from the coupling structure, which leaves half the input unchanged.",
          blameConceptId: "normalizing-flows",
        },
      },
    ],
    difficulty: -0.4,
    discrimination: 1.2,
    expectedSeconds: 45,
    prereqClosure: FLOWS,
    source: ML_18,
    status: "live",
  },
  {
    id: "normalizing-flows--apply-one-d-density",
    conceptId: "normalizing-flows",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "With $z \\sim \\mathcal{N}(0, 1)$ and the flow $x = 3z - 2$, compute the density $p_X(-2)$ to $4$ decimal places. " +
      "(The standard normal density at $0$ is $1/\\sqrt{2\\pi} \\approx 0.39894$.)",
    answerKey: 0.13298,
    tolerance: 0.001,
    difficulty: 0.0,
    discrimination: 1.2,
    expectedSeconds: 70,
    prereqClosure: FLOWS,
    source: ML_18,
    status: "live",
  },
  {
    id: "normalizing-flows--apply-coupling-log-det",
    conceptId: "normalizing-flows",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "An affine coupling layer computes $y_b = x_b \\odot e^{s(x_a)} + t(x_a)$. For one input, $s(x_a) = (0.2, -0.5, 0.1)$ " +
      "and $t(x_a) = (1, 0, 3)$. What is $\\log|\\det J|$ for this layer at this input?",
    answerKey: -0.2,
    tolerance: 0.001,
    difficulty: 0.2,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: FLOWS,
    source: ML_18,
    status: "live",
  },
  {
    id: "normalizing-flows--explain-maf-vs-iaf",
    conceptId: "normalizing-flows",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Masked autoregressive flows (MAF) and inverse autoregressive flows (IAF) use the same kind of layer in opposite directions. Explain which is fast at density evaluation, which is fast at sampling, and why.",
    rubric: {
      elements: [
        { id: "maf", description: "MAF: each $z_i$ is computed from $x_i$ and the already-known $x_{<i}$, so all of $z = f^{-1}(x)$ comes from one parallel pass — fast density evaluation; but sampling must generate $x_1, x_2, \\ldots$ one at a time, $D$ sequential steps.", weight: 4, required: true },
        { id: "iaf", description: "IAF conditions on $z_{<i}$ instead, so sampling is one parallel pass but evaluating the density of an arbitrary $x$ is sequential — suited to use as a variational posterior that scores its own samples.", weight: 3, required: true },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.2,
    expectedSeconds: 120,
    prereqClosure: FLOWS,
    source: ML_18,
    status: "live",
  },
  {
    id: "normalizing-flows--explain-topology",
    conceptId: "normalizing-flows",
    format: "mcq",
    cognitive: "explain",
    channels: ["typed"],
    stem: "A flow from a single Gaussian is trained on data with two well-separated clusters. Its samples keep appearing in the empty gap between them. Why?",
    choices: [
      { id: "a", text: "A continuous invertible map cannot tear one connected blob into two, so it must stretch a thin bridge of probability mass across the gap", correct: true },
      {
        id: "b",
        text: "The model was not trained long enough; with more training the bridge vanishes entirely",
        correct: false,
        misconception: {
          id: "flows-train-longer",
          description: "The bridge can be thinned with steep Jacobians but never removed, since the map is continuous and invertible.",
          blameConceptId: "normalizing-flows",
        },
      },
      {
        id: "c",
        text: "Maximum likelihood rewards putting mass between the clusters",
        correct: false,
        misconception: {
          id: "flows-mle-rewards-gap",
          description: "Likelihood penalises mass where there is no data; the constraint comes from the architecture.",
          blameConceptId: "mle",
        },
      },
      {
        id: "d",
        text: "The Jacobian determinant is always $1$, so volumes cannot change",
        correct: false,
        misconception: {
          id: "flows-volume-preserving",
          description: "Only special (volume-preserving) flows have unit determinant; general flows stretch and compress volume.",
          blameConceptId: "change-of-variables-jacobian",
        },
      },
    ],
    difficulty: 0.6,
    discrimination: 1.2,
    expectedSeconds: 55,
    prereqClosure: FLOWS,
    source: ML_18,
    status: "live",
  },
  {
    id: "normalizing-flows--transfer-anomaly-detection",
    conceptId: "normalizing-flows",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A team uses a flow trained on photos of manufactured parts as an anomaly detector: low likelihood means defective. " +
      "They find that blank, low-texture images score higher than genuine parts. Explain why, and suggest a more robust score.",
    rubric: {
      elements: [
        { id: "why", description: "Image likelihood is dominated by low-level statistics (smoothness, local correlation, background), so simple low-complexity inputs can receive higher density than typical in-distribution images — high likelihood is not the same as being typical.", weight: 4, required: true },
        { id: "fix", description: "Proposes a correction: likelihood ratio against a background/complexity model, a typicality test, input-complexity normalisation, or scoring in a learned semantic feature space.", weight: 3 },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.2,
    expectedSeconds: 150,
    prereqClosure: FLOWS,
    source: ML_18,
    status: "live",
  },
  {
    id: "normalizing-flows--transfer-flow-posterior",
    conceptId: "normalizing-flows",
    format: "mcq",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "In a VAE you want a flexible approximate posterior $q(z \\mid x)$: you must sample $z$ from it and evaluate $\\log q$ at those same samples. Which flow direction fits?",
    choices: [
      { id: "a", text: "An inverse autoregressive flow — sampling is parallel, and the density of a sample it just produced is available from the forward pass", correct: true },
      {
        id: "b",
        text: "A masked autoregressive flow, because its density evaluation is fast",
        correct: false,
        misconception: {
          id: "vae-maf-posterior",
          description: "MAF samples sequentially, which is the expensive operation in this setting.",
          blameConceptId: "normalizing-flows",
        },
      },
      {
        id: "c",
        text: "Neither — flows cannot be used inside variational inference",
        correct: false,
        misconception: {
          id: "flows-not-for-vi",
          description: "Flow posteriors are a standard way to make VI more expressive.",
          blameConceptId: "normalizing-flows",
        },
      },
      {
        id: "d",
        text: "Any flow works equally well, since all flows are invertible",
        correct: false,
        misconception: {
          id: "flows-direction-irrelevant",
          description: "Invertible is not the same as cheap in both directions; the direction determines which operation is fast.",
          blameConceptId: "normalizing-flows",
        },
      },
    ],
    difficulty: 0.8,
    discrimination: 1.2,
    expectedSeconds: 55,
    prereqClosure: FLOWS,
    source: ML_18,
    status: "live",
  },

  // --- Score Matching ----------------------------------------------------------
  {
    id: "score-matching--recall-normaliser-cancels",
    conceptId: "score-matching",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Why can an energy-based model $p_\\theta(x) = e^{-E_\\theta(x)}/Z_\\theta$ be trained by score matching without ever computing $Z_\\theta$?",
    choices: [
      { id: "a", text: "The score $\\nabla_x \\log p_\\theta(x) = -\\nabla_x E_\\theta(x)$ does not involve $Z_\\theta$, which is constant in $x$", correct: true },
      {
        id: "b",
        text: "Score matching estimates $Z_\\theta$ by Monte Carlo along the way",
        correct: false,
        misconception: {
          id: "score-estimates-z",
          description: "The whole point is that $Z_\\theta$ never appears; nothing needs estimating.",
          blameConceptId: "score-matching",
        },
      },
      {
        id: "c",
        text: "$Z_\\theta = 1$ for every energy-based model",
        correct: false,
        misconception: {
          id: "score-z-is-one",
          description: "$Z_\\theta$ is an integral over all $x$ and is generally unknown; it is removed by differentiating with respect to $x$, not assumed away.",
          blameConceptId: "score-matching",
        },
      },
      {
        id: "d",
        text: "The gradient is taken with respect to $\\theta$, and $Z_\\theta$ does not depend on $\\theta$",
        correct: false,
        misconception: {
          id: "score-wrong-gradient-variable",
          description: "$Z_\\theta$ does depend on $\\theta$; the score is a gradient in $x$, which is why the normaliser drops out.",
          blameConceptId: "score-matching",
        },
      },
    ],
    difficulty: -0.6,
    discrimination: 1.2,
    expectedSeconds: 45,
    prereqClosure: SCORE,
    source: ML_18,
    status: "live",
  },
  {
    id: "score-matching--recall-langevin",
    conceptId: "score-matching",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "handwritten"],
    stem: "Define the score of a density, and write the Langevin dynamics update that uses a learned score $s_\\theta$ to draw samples.",
    rubric: {
      elements: [
        { id: "score", description: "The score is $s(x) = \\nabla_x \\log p(x)$.", weight: 3, required: true },
        { id: "langevin", description: "$x_{k+1} = x_k + \\frac{\\epsilon}{2} s_\\theta(x_k) + \\sqrt{\\epsilon}\\, z_k$ with $z_k \\sim \\mathcal{N}(0, I)$ — gradient ascent on $\\log p$ plus injected noise.", weight: 4, required: true },
      ],
    },
    difficulty: -0.4,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: SCORE,
    source: ML_18,
    status: "live",
  },
  {
    id: "score-matching--apply-gaussian-score",
    conceptId: "score-matching",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Compute the score $\\nabla_x \\log p(x)$ of $p = \\mathcal{N}(1, 4)$ (mean $1$, variance $4$) at $x = 3$.",
    answerKey: -0.5,
    tolerance: 0.001,
    difficulty: -0.1,
    discrimination: 1.2,
    expectedSeconds: 50,
    prereqClosure: SCORE,
    source: ML_18,
    status: "live",
  },
  {
    id: "score-matching--apply-langevin-step",
    conceptId: "score-matching",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Take one Langevin step toward $\\mathcal{N}(0, 1)$ from $x_0 = 2$ with step size $\\epsilon = 0.1$ and noise draw " +
      "$z_0 = 0.5$, using the exact score. Give $x_1$ to $3$ decimal places.",
    answerKey: 2.058,
    tolerance: 0.001,
    difficulty: 0.3,
    discrimination: 1.2,
    expectedSeconds: 80,
    prereqClosure: SCORE,
    source: ML_18,
    status: "live",
  },
  {
    id: "score-matching--explain-hyvarinen",
    conceptId: "score-matching",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "The score matching objective $\\tfrac{1}{2}\\mathbb{E}_p\\|s_\\theta(x) - \\nabla_x \\log p(x)\\|^2$ contains the unknown " +
      "true score. Explain how Hyvärinen's reformulation makes it computable from data, and what makes it expensive in high dimensions.",
    rubric: {
      elements: [
        { id: "ibp", description: "Expanding the square, the cross term $\\mathbb{E}_p[s_\\theta^\\top \\nabla \\log p]$ is rewritten by integration by parts (assuming $p$ vanishes at infinity), giving $\\mathbb{E}_p[\\operatorname{tr}(\\nabla_x s_\\theta) + \\tfrac{1}{2}\\|s_\\theta\\|^2]$ plus a constant — only the model and samples from $p$ are needed.", weight: 4, required: true },
        { id: "cost", description: "The Jacobian trace needs about $D$ backward passes in $D$ dimensions; sliced score matching (random projections) or denoising score matching avoid it.", weight: 3, required: true },
      ],
    },
    difficulty: 0.7,
    discrimination: 1.2,
    expectedSeconds: 130,
    prereqClosure: SCORE,
    source: ML_18,
    status: "live",
  },
  {
    id: "score-matching--explain-low-density",
    conceptId: "score-matching",
    format: "mcq",
    cognitive: "explain",
    channels: ["typed"],
    stem: "A score model trained on clean images produces garbage when Langevin sampling starts from random noise. What is the main reason?",
    choices: [
      { id: "a", text: "The objective weights errors by $p(x)$, so the score is only learned near the data; chains starting from noise begin exactly where it is unreliable", correct: true },
      {
        id: "b",
        text: "Langevin dynamics only works for Gaussian targets",
        correct: false,
        misconception: {
          id: "langevin-gaussian-only",
          description: "Langevin dynamics samples from general smooth densities given an accurate score.",
          blameConceptId: "score-matching",
        },
      },
      {
        id: "c",
        text: "The score is undefined wherever $p(x)$ is small",
        correct: false,
        misconception: {
          id: "score-undefined",
          description: "The score is well defined wherever $p > 0$; the problem is that the learned approximation is poor there.",
          blameConceptId: "score-matching",
        },
      },
      {
        id: "d",
        text: "The step size must be zero for Langevin to be exact",
        correct: false,
        misconception: {
          id: "langevin-step-zero",
          description: "Small steps reduce discretisation error, but that is not why chains fail from noise.",
          blameConceptId: "score-matching",
        },
      },
    ],
    difficulty: 0.6,
    discrimination: 1.2,
    expectedSeconds: 55,
    prereqClosure: SCORE,
    source: ML_18,
    status: "live",
  },
  {
    id: "score-matching--transfer-mode-weights",
    conceptId: "score-matching",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Data come from a mixture $0.9\\,p_1 + 0.1\\,p_2$ whose components have disjoint supports. Explain why even a perfectly " +
      "learned score cannot recover the $0.9 / 0.1$ weights, and how adding noise to the data fixes it.",
    rubric: {
      elements: [
        { id: "why", description: "On the support of $p_1$ alone, $\\nabla \\log(0.9 p_1) = \\nabla \\log p_1$: the weight is a constant factor that the gradient of the log removes, so the score is identical for any weights, and Langevin chains keep whatever proportions they start in.", weight: 4, required: true },
        { id: "noise", description: "Convolving the data with noise makes the noised components overlap, so the score in the overlap region depends on the relative weights and chains can move between modes in the right proportions (annealing the noise down afterwards).", weight: 3, required: true },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.2,
    expectedSeconds: 150,
    prereqClosure: SCORE,
    source: ML_18,
    status: "live",
  },
  {
    id: "score-matching--transfer-ebm-training",
    conceptId: "score-matching",
    format: "mcq",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "Compared with maximum-likelihood training of an energy-based model, what does training it by score matching avoid?",
    choices: [
      { id: "a", text: "Running MCMC inside every training step to estimate the gradient of $\\log Z_\\theta$", correct: true },
      {
        id: "b",
        text: "Having to define an energy function at all",
        correct: false,
        misconception: {
          id: "ebm-no-energy",
          description: "Score matching still trains an energy (or score) model; it changes the objective, not the model.",
          blameConceptId: "score-matching",
        },
      },
      {
        id: "c",
        text: "Needing any samples from the data distribution",
        correct: false,
        misconception: {
          id: "score-no-data",
          description: "Score matching is an expectation under the data distribution and needs data samples.",
          blameConceptId: "score-matching",
        },
      },
      {
        id: "d",
        text: "Using gradients, since score matching is gradient-free",
        correct: false,
        misconception: {
          id: "score-gradient-free",
          description: "Score matching is optimised by gradient descent like any other neural objective.",
          blameConceptId: "score-matching",
        },
      },
    ],
    difficulty: 0.7,
    discrimination: 1.2,
    expectedSeconds: 50,
    prereqClosure: SCORE,
    source: ML_18,
    status: "live",
  },

  // --- Denoising Score Matching -------------------------------------------------
  {
    id: "denoising-score-matching--recall-objective",
    conceptId: "denoising-score-matching",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "handwritten"],
    stem: "Data are corrupted as $\\tilde{x} = x + \\sigma\\varepsilon$ with $\\varepsilon \\sim \\mathcal{N}(0, I)$. Write the denoising score matching loss, and state which score its minimiser recovers.",
    rubric: {
      elements: [
        { id: "loss", description: "$\\mathbb{E}\\|s_\\theta(\\tilde{x}) + (\\tilde{x} - x)/\\sigma^2\\|^2$, equivalently $\\mathbb{E}\\|s_\\theta(\\tilde{x}) + \\varepsilon/\\sigma\\|^2$.", weight: 4, required: true },
        { id: "target", description: "The minimiser is the score of the noised data distribution, $\\nabla \\log q_\\sigma(\\tilde{x})$, not of the clean data.", weight: 3, required: true },
      ],
    },
    difficulty: -0.5,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: DSM,
    source: ML_18,
    status: "live",
  },
  {
    id: "denoising-score-matching--recall-noise-prediction",
    conceptId: "denoising-score-matching",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "A network $\\hat{\\varepsilon}(\\tilde{x})$ is trained to predict the noise in $\\tilde{x} = x + \\sigma\\varepsilon$. How is the score of the noised data obtained from it?",
    choices: [
      { id: "a", text: "$s(\\tilde{x}) = -\\hat{\\varepsilon}(\\tilde{x})/\\sigma$", correct: true },
      {
        id: "b",
        text: "$s(\\tilde{x}) = \\hat{\\varepsilon}(\\tilde{x})$",
        correct: false,
        misconception: {
          id: "dsm-noise-is-score",
          description: "Drops the sign and the scale: the score points back toward the data, opposite to the added noise, and scales as $1/\\sigma$.",
          blameConceptId: "denoising-score-matching",
        },
      },
      {
        id: "c",
        text: "$s(\\tilde{x}) = \\tilde{x} - \\sigma\\hat{\\varepsilon}(\\tilde{x})$",
        correct: false,
        misconception: {
          id: "dsm-denoised-is-score",
          description: "That is the denoised estimate of $x$, not the score.",
          blameConceptId: "denoising-score-matching",
        },
      },
      {
        id: "d",
        text: "It cannot be; noise prediction and score estimation are unrelated",
        correct: false,
        misconception: {
          id: "dsm-unrelated",
          description: "Misses that predicting the noise is score estimation up to scale — the foundation of diffusion training.",
          blameConceptId: "score-matching",
        },
      },
    ],
    difficulty: -0.3,
    discrimination: 1.2,
    expectedSeconds: 45,
    prereqClosure: DSM,
    source: ML_18,
    status: "live",
  },
  {
    id: "denoising-score-matching--apply-tweedie",
    conceptId: "denoising-score-matching",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Let $x \\sim \\mathcal{N}(0, 1)$ and $\\tilde{x} = x + \\varepsilon$ with $\\varepsilon \\sim \\mathcal{N}(0, 1)$. Using Tweedie's " +
      "formula $\\mathbb{E}[x \\mid \\tilde{x}] = \\tilde{x} + \\sigma^2 \\nabla \\log q_\\sigma(\\tilde{x})$, compute the optimal denoised estimate when $\\tilde{x} = 3$.",
    answerKey: 1.5,
    tolerance: 0.001,
    difficulty: 0.2,
    discrimination: 1.2,
    expectedSeconds: 80,
    prereqClosure: DSM,
    source: ML_18,
    status: "live",
  },
  {
    id: "denoising-score-matching--apply-target-value",
    conceptId: "denoising-score-matching",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A training pair has clean value $x = 1.0$, noise level $\\sigma = 0.5$ and noise draw $\\varepsilon = 0.8$. Compute the " +
      "denoising score matching regression target $-(\\tilde{x} - x)/\\sigma^2$ for this pair.",
    answerKey: -1.6,
    tolerance: 0.001,
    difficulty: 0.0,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: DSM,
    source: ML_18,
    status: "live",
  },
  {
    id: "denoising-score-matching--explain-why-noisy-target-works",
    conceptId: "denoising-score-matching",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "The target $-(\\tilde{x} - x)/\\sigma^2$ depends on which clean $x$ produced $\\tilde{x}$, which the network never sees. " +
      "Explain why regressing on this noisy target still yields the score of the noised distribution.",
    rubric: {
      elements: [
        { id: "regression", description: "Squared-error regression is minimised by the conditional expectation of the target given the input: $s^*(\\tilde{x}) = \\mathbb{E}[\\nabla_{\\tilde{x}} \\log q(\\tilde{x} \\mid x) \\mid \\tilde{x}]$.", weight: 4, required: true },
        { id: "identity", description: "Averaging the conditional score over the posterior of $x$ given $\\tilde{x}$ gives $\\nabla \\log q_\\sigma(\\tilde{x})$ (differentiate $q_\\sigma = \\int q(\\tilde{x} \\mid x) p(x)\\,dx$), so the per-sample noise averages out.", weight: 3, required: true },
      ],
    },
    difficulty: 0.7,
    discrimination: 1.2,
    expectedSeconds: 130,
    prereqClosure: DSM,
    source: ML_18,
    status: "live",
  },
  {
    id: "denoising-score-matching--explain-multiple-scales",
    conceptId: "denoising-score-matching",
    format: "mcq",
    cognitive: "explain",
    channels: ["typed"],
    stem: "Why do score-based models train on many noise levels $\\sigma$ instead of one small $\\sigma$?",
    choices: [
      { id: "a", text: "Large $\\sigma$ gives a score that is reliable everywhere and connects modes; small $\\sigma$ gives a score close to the data — sampling anneals from large to small", correct: true },
      {
        id: "b",
        text: "To augment the dataset, since each noise level is a new training image",
        correct: false,
        misconception: {
          id: "dsm-noise-is-augmentation",
          description: "The noise levels define different target distributions whose scores are all used at sampling time; it is not augmentation for a single task.",
          blameConceptId: "denoising-score-matching",
        },
      },
      {
        id: "c",
        text: "Because a single small $\\sigma$ makes the loss non-differentiable",
        correct: false,
        misconception: {
          id: "dsm-small-sigma-nondiff",
          description: "The loss stays differentiable; the problem is poor coverage of low-density regions.",
          blameConceptId: "score-matching",
        },
      },
      {
        id: "d",
        text: "Large $\\sigma$ alone would be enough; smaller ones just speed up training",
        correct: false,
        misconception: {
          id: "dsm-large-sigma-enough",
          description: "A large-$\\sigma$ score describes a blurred distribution; small scales are needed for sharp samples.",
          blameConceptId: "denoising-score-matching",
        },
      },
    ],
    difficulty: 0.5,
    discrimination: 1.2,
    expectedSeconds: 55,
    prereqClosure: DSM,
    source: ML_18,
    status: "live",
  },
  {
    id: "denoising-score-matching--transfer-denoiser-prior",
    conceptId: "denoising-score-matching",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "You have an image denoiser $D_\\sigma(\\tilde{x})$ trained with mean-squared error at several known noise levels, and " +
      "want to use it as a generative prior. Explain how to extract a score from it and how that score would drive sampling.",
    rubric: {
      elements: [
        { id: "tweedie", description: "By Tweedie's formula the MSE-optimal denoiser is $\\mathbb{E}[x \\mid \\tilde{x}]$, so $s_\\sigma(\\tilde{x}) = (D_\\sigma(\\tilde{x}) - \\tilde{x})/\\sigma^2$.", weight: 4, required: true },
        { id: "sampling", description: "Use these scores in annealed Langevin dynamics or a reverse diffusion / probability-flow sampler, starting at the largest $\\sigma$ and moving to the smallest.", weight: 3, required: true },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.2,
    expectedSeconds: 140,
    prereqClosure: DSM,
    source: ML_18,
    status: "live",
  },
  {
    id: "denoising-score-matching--transfer-ddpm-loss",
    conceptId: "denoising-score-matching",
    format: "mcq",
    cognitive: "transfer",
    channels: ["typed"],
    stem:
      "The DDPM training loss is $\\mathbb{E}\\|\\varepsilon - \\varepsilon_\\theta(\\sqrt{\\bar{\\alpha}_t}\\,x_0 + \\sqrt{1 - \\bar{\\alpha}_t}\\,\\varepsilon,\\, t)\\|^2$. " +
      "How does it relate to denoising score matching?",
    choices: [
      { id: "a", text: "It is denoising score matching at every noise level $t$, with the network predicting a scaled score, $\\varepsilon_\\theta \\approx -\\sqrt{1 - \\bar{\\alpha}_t}\\, \\nabla \\log q_t$", correct: true },
      {
        id: "b",
        text: "It is unrelated — DDPM is trained through a variational bound, not a score",
        correct: false,
        misconception: {
          id: "ddpm-not-score",
          description: "The simplified DDPM loss derived from the variational bound is exactly a weighted denoising score matching objective.",
          blameConceptId: "denoising-score-matching",
        },
      },
      {
        id: "c",
        text: "It is exact (Hyvärinen) score matching, which is why it needs Jacobian traces",
        correct: false,
        misconception: {
          id: "ddpm-hyvarinen",
          description: "DDPM uses the denoising form precisely to avoid Jacobian traces.",
          blameConceptId: "score-matching",
        },
      },
      {
        id: "d",
        text: "It learns the score of the clean data distribution at $t = 0$ only",
        correct: false,
        misconception: {
          id: "ddpm-clean-only",
          description: "The network is conditioned on $t$ and learns the score of each noised marginal, which sampling needs at every step.",
          blameConceptId: "denoising-score-matching",
        },
      },
    ],
    difficulty: 0.8,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: DSM,
    source: ML_18,
    status: "live",
  },
];
