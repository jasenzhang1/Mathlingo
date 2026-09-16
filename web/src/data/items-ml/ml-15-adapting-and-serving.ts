import type { Item } from "../../lib/assessment/types";
import { ML_15 } from "./sources";

/**
 * Cluster 15 — scaling, adapting and serving. Eight items per concept, two each
 * at recall, apply, explain and transfer. Authored directly in typed form; see
 * `assessments/ml-15-adapting-and-serving.md` for the design record.
 *
 * This is the applied end of the branch, so the numeric items are the
 * back-of-envelope calculations the decisions actually turn on: the compute a
 * run will cost, the parameters a vocabulary buys, the fraction of a matrix an
 * adapter trains, the bytes a quantised model occupies.
 */
export const ml15Items: Item[] = [
  // --- Scaling Laws ---------------------------------------------------------
  {
    id: "scaling-laws--recall-form",
    conceptId: "scaling-laws",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "What functional form do neural scaling laws take, and what are the two parts of it?",
    rubric: {
      elements: [
        {
          id: "form",
          description:
            "Test loss falls as a power law in the scaled quantity — parameters, data or compute — of the form L ≈ L_∞ + (N_c/N)^α.",
          weight: 4,
          required: true,
        },
        {
          id: "parts",
          description:
            "An irreducible floor set by the entropy of the data itself, plus a reducible term that shrinks with scale.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.4,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["scaling-laws", "learning-curves"],
    source: ML_15,
    status: "live",
  },
  {
    id: "scaling-laws--recall-chinchilla",
    conceptId: "scaling-laws",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What did the Chinchilla result change about how a fixed training budget should be spent?",
    choices: [
      {
        id: "a",
        text: "Parameters and training tokens should grow together — roughly 20 tokens per parameter — rather than the budget going mostly into size",
        correct: true,
      },
      {
        id: "b",
        text: "That larger models are always better, so the budget should go into parameters",
        correct: false,
        misconception: {
          id: "chinchilla-inverted",
          description:
            "This is the reading Chinchilla corrected. Models built on it were substantially undertrained: the same compute spent on a smaller model and more data reached a lower loss.",
          blameConceptId: "scaling-laws",
        },
      },
      {
        id: "c",
        text: "That data quality matters more than quantity, so the budget should go into curation",
        correct: false,
        misconception: {
          id: "chinchilla-confused-with-data-quality",
          description:
            "Data quality matters, but Chinchilla is an argument about the allocation between parameters and token count at fixed compute, holding the corpus fixed.",
          blameConceptId: "scaling-laws",
        },
      },
      {
        id: "d",
        text: "That scaling laws do not hold beyond a few billion parameters",
        correct: false,
        misconception: {
          id: "chinchilla-read-as-refuting-scaling",
          description:
            "Chinchilla confirms the laws and re-fits their constants, having corrected an experimental flaw — the earlier runs did not match the learning-rate schedule to each run's length.",
          blameConceptId: "scaling-laws",
        },
      },
    ],
    difficulty: 1.0,
    discrimination: 1.4,
    expectedSeconds: 70,
    prereqClosure: ["scaling-laws", "autoregressive-models"],
    source: ML_15,
    status: "live",
  },
  {
    id: "scaling-laws--apply-compute-budget",
    conceptId: "scaling-laws",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Using C ≈ 6ND, what training compute does a 1-billion-parameter model trained on 20 billion tokens require? Give the answer in units of 10²⁰ FLOPs.",
    answerKey: 1.2,
    tolerance: 0.001,
    difficulty: 1.0,
    discrimination: 1.4,
    expectedSeconds: 110,
    prereqClosure: ["scaling-laws"],
    source: ML_15,
    status: "live",
  },
  {
    id: "scaling-laws--apply-halving-factor",
    conceptId: "scaling-laws",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "The reducible part of the loss scales as N^−0.076 in the parameter count. By what factor must N grow to halve it? Give the answer to the nearest whole number.",
    answerKey: 9139,
    tolerance: 0.001,
    difficulty: 1.6,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["scaling-laws"],
    source: ML_15,
    status: "live",
  },
  {
    id: "scaling-laws--explain-why-log-log",
    conceptId: "scaling-laws",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why are scaling results always plotted on log-log axes, and what does that let a team do before spending a large budget?",
    rubric: {
      elements: [
        {
          id: "straight-line",
          description:
            "A power law is a straight line in log-log coordinates, with the exponent as its slope, so the relationship is visible and its parameters can be read off a fit.",
          weight: 4,
          required: true,
        },
        {
          id: "extrapolation",
          description:
            "That makes it possible to fit two or three small, cheap runs and extrapolate the loss of a much larger one — turning 'how big should this be' into a prediction rather than a guess.",
          weight: 4,
          required: true,
        },
        {
          id: "caution",
          description:
            "Notes the caveat: the fit is empirical, so extrapolating far beyond the measured range assumes a regularity nothing guarantees.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["scaling-laws", "learning-curves"],
    source: ML_15,
    status: "live",
  },
  {
    id: "scaling-laws--explain-loss-vs-capability",
    conceptId: "scaling-laws",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed"],
    stem: "A model's cross-entropy falls smoothly with scale while its accuracy on a multi-step task jumps from near zero to substantial. Explain how both can be true.",
    rubric: {
      elements: [
        {
          id: "thresholding",
          description:
            "The benchmark applies a threshold to a continuous quantity — an answer is scored right only if every step is right — so a smooth improvement in per-token probability appears as a sudden jump once the product of the step probabilities crosses into the scoring range.",
          weight: 5,
          required: true,
        },
        {
          id: "implication",
          description:
            "The discontinuity is therefore a property of the metric as much as of the model, which is the core of the argument that many 'emergent abilities' are artefacts of discrete scoring.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["scaling-laws", "autoregressive-models", "conditional-probability"],
    source: ML_15,
    status: "live",
  },
  {
    id: "scaling-laws--transfer-inference-optimal",
    conceptId: "scaling-laws",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A team plans to serve a model to millions of users daily and asks whether to train at the compute-optimal point. What should the answer be, and why is it not a contradiction of the scaling result?",
    rubric: {
      elements: [
        {
          id: "answer",
          description:
            "No — train a smaller model on far more tokens than compute-optimal, since inference is paid on every request forever while training is paid once.",
          weight: 4,
          required: true,
        },
        {
          id: "not-a-contradiction",
          description:
            "Compute-optimal answers 'what is the lowest loss for a fixed training budget'; deployment asks for the lowest total cost of reaching a quality target, which is a different objective with a different optimum.",
          weight: 4,
          required: true,
        },
        {
          id: "diminishing",
          description:
            "Notes that training past the optimum has diminishing returns per token, so the extra training is worth it only when the inference volume is large enough to dominate.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["scaling-laws", "learning-curves"],
    source: ML_15,
    status: "live",
  },
  {
    id: "scaling-laws--transfer-limits",
    conceptId: "scaling-laws",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "A proposal cites a fitted scaling law to promise a specific loss at 1,000 times the largest scale ever measured for that architecture. Give two reasons to distrust the number.",
    rubric: {
      elements: [
        {
          id: "extrapolation",
          description:
            "The law is a fit over a measured range, not a derivation, so nothing guarantees the exponent survives three orders of magnitude beyond the data used to fit it.",
          weight: 4,
          required: true,
        },
        {
          id: "data-supply",
          description:
            "The data axis has a hard limit the curve knows nothing about: at that scale the required token count may exceed the supply of high-quality text, and repeating data does not scale the same way.",
          weight: 4,
          required: true,
        },
        {
          id: "transferability",
          description:
            "Notes that constants are fit per architecture and recipe, so a law fit to one family does not carry over unchanged to another.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["scaling-laws", "learning-curves", "overfitting-underfitting"],
    source: ML_15,
    status: "live",
  },

  // --- Tokenization ---------------------------------------------------------
  {
    id: "tokenization--recall-why-subwords",
    conceptId: "tokenization",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Why do language models use subword tokens rather than characters or whole words?",
    rubric: {
      elements: [
        {
          id: "characters",
          description:
            "Characters give a tiny vocabulary but very long sequences, which is expensive when the attention cost grows quadratically with length.",
          weight: 3,
          required: true,
        },
        {
          id: "words",
          description:
            "Words give short sequences but an unbounded vocabulary, and anything unseen collapses to an unknown token, so the model cannot spell a name it has never met.",
          weight: 3,
          required: true,
        },
        {
          id: "subwords",
          description:
            "Subwords take the middle: frequent words become single tokens and anything else is composed from smaller pieces, so nothing is unrepresentable.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.3,
    expectedSeconds: 70,
    prereqClosure: ["tokenization", "embeddings"],
    source: ML_15,
    status: "live",
  },
  {
    id: "tokenization--recall-bpe-procedure",
    conceptId: "tokenization",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "How does byte-pair encoding build its vocabulary?",
    choices: [
      {
        id: "a",
        text: "Start with single bytes and repeatedly merge the most frequent adjacent pair into a new token, until the vocabulary reaches the requested size",
        correct: true,
      },
      {
        id: "b",
        text: "Take the most frequent whole words in the corpus and add them until the vocabulary is full",
        correct: false,
        misconception: {
          id: "bpe-confused-with-word-frequency",
          description:
            "A frequency-ranked word list is exactly the word-level vocabulary BPE was designed to replace: it has no way to represent anything outside it.",
          blameConceptId: "tokenization",
        },
      },
      {
        id: "c",
        text: "Split text at whitespace and punctuation using language-specific rules",
        correct: false,
        misconception: {
          id: "bpe-confused-with-rule-based-segmentation",
          description:
            "That is classical rule-based tokenisation. BPE is learned from a corpus and needs no language-specific rules, which is why it applies to any script.",
          blameConceptId: "tokenization",
        },
      },
      {
        id: "d",
        text: "Cluster embeddings of character n-grams and keep one representative per cluster",
        correct: false,
        misconception: {
          id: "bpe-read-as-learned-embedding-method",
          description:
            "BPE runs before any model exists and involves no embeddings at all — it is pure corpus statistics producing an ordered list of merges.",
          blameConceptId: "tokenization",
        },
      },
    ],
    difficulty: 0.9,
    discrimination: 1.4,
    expectedSeconds: 60,
    prereqClosure: ["tokenization"],
    source: ML_15,
    status: "live",
  },
  {
    id: "tokenization--apply-embedding-params",
    conceptId: "tokenization",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A model has a vocabulary of 32,000 tokens and a model dimension of 4,096. How many parameters are in its embedding table?",
    answerKey: 131072000,
    tolerance: 0.0000001,
    difficulty: 0.8,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["tokenization", "embeddings"],
    source: ML_15,
    status: "live",
  },
  {
    id: "tokenization--apply-fertility",
    conceptId: "tokenization",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A document of 1,000 words encodes to 1,350 tokens. What is the tokeniser's fertility — tokens per word — for this text? Give the answer to two decimal places.",
    answerKey: 1.35,
    tolerance: 0.001,
    difficulty: 0.7,
    discrimination: 1.2,
    expectedSeconds: 70,
    prereqClosure: ["tokenization"],
    source: ML_15,
    status: "live",
  },
  {
    id: "tokenization--explain-arithmetic",
    conceptId: "tokenization",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Language models are unreliable at multi-digit arithmetic, and part of the reason is the tokeniser. Explain the mechanism, and the change that measurably helps.",
    rubric: {
      elements: [
        {
          id: "mechanism",
          description:
            "Numbers are segmented by corpus frequency, so one number may be a single token and the next a group of two or three — the model does not see a consistent per-digit representation to align and carry over.",
          weight: 4,
          required: true,
        },
        {
          id: "fix",
          description:
            "Forcing numbers to split into fixed digit groups, or into single digits, gives a consistent representation and measurably improves arithmetic — which is the evidence that the segmentation was part of the difficulty.",
          weight: 4,
          required: true,
        },
        {
          id: "scope",
          description:
            "Notes that this is a contributing cause rather than the whole story: multi-step carrying is hard for other reasons too.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["tokenization", "autoregressive-models"],
    source: ML_15,
    status: "live",
  },
  {
    id: "tokenization--explain-perplexity-incomparable",
    conceptId: "tokenization",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed"],
    stem: "Two language models report perplexities of 12 and 15 on the same text but use different tokenisers. Explain why the comparison is not meaningful, and what would be.",
    rubric: {
      elements: [
        {
          id: "per-token",
          description:
            "Perplexity is per token, so a model with a coarser vocabulary is predicting fewer and harder tokens over the same text — the two numbers are averages over different units.",
          weight: 4,
          required: true,
        },
        {
          id: "fix",
          description:
            "Normalising to a common unit — bits per character or per byte, or per word — makes the comparison valid, as does evaluating both with the same tokeniser.",
          weight: 4,
          required: true,
        },
        {
          id: "direction",
          description:
            "Notes that the bias has a direction: a tokeniser that packs more text into each token tends to report a higher perplexity for the same underlying quality.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["tokenization", "autoregressive-models"],
    source: ML_15,
    status: "live",
  },
  {
    id: "tokenization--transfer-multilingual-cost",
    conceptId: "tokenization",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A product priced per token costs three times as much for users writing in one language as another, for the same content. Explain the cause and the two consequences beyond price.",
    rubric: {
      elements: [
        {
          id: "cause",
          description:
            "The tokeniser's merges were learned from a corpus dominated by one language, so text in an under-represented script is segmented into many more, shorter tokens.",
          weight: 4,
          required: true,
        },
        {
          id: "context",
          description:
            "The same document consumes far more of the context window, so less of it fits at once.",
          weight: 3,
          required: true,
        },
        {
          id: "quality",
          description:
            "And more tokens per unit of meaning means more prediction steps per idea, plus fewer effective training examples of that language for a fixed token budget — so quality is usually worse as well as costlier.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["tokenization", "autoregressive-models"],
    source: ML_15,
    status: "live",
  },
  {
    id: "tokenization--transfer-vocabulary-change",
    conceptId: "tokenization",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "Halfway through a pretraining run a team wants to switch to a tokeniser better suited to their domain. What does that cost them, and what is the realistic alternative?",
    rubric: {
      elements: [
        {
          id: "cost",
          description:
            "Every embedding is indexed by token id, so a new vocabulary invalidates the embedding table and the output projection — the learned representations no longer correspond to the inputs, and the run effectively restarts.",
          weight: 4,
          required: true,
        },
        {
          id: "alternative",
          description:
            "Extend rather than replace: add new tokens as extra rows, initialise them from the average of the pieces they replace, and continue training so the rest of the model is preserved.",
          weight: 4,
          required: true,
        },
        {
          id: "lesson",
          description:
            "Names the general point: the tokeniser is the earliest irreversible decision in the pipeline and deserves more attention than it usually gets.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.5,
    expectedSeconds: 210,
    prereqClosure: ["tokenization", "embeddings"],
    source: ML_15,
    status: "live",
  },

  // --- Contrastive Learning -------------------------------------------------
  {
    id: "contrastive-learning--recall-objective",
    conceptId: "contrastive-learning",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "State what the InfoNCE objective asks a model to do, and what familiar loss it turns out to be.",
    rubric: {
      elements: [
        {
          id: "task",
          description:
            "Given an anchor, pick its matching view out of a set of candidates by similarity — pull the positive pair together and push the rest apart.",
          weight: 4,
          required: true,
        },
        {
          id: "cross-entropy",
          description:
            "It is a cross-entropy over a softmax of similarity scores, with the positive as the correct class — an ordinary classification loss over manufactured labels.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["contrastive-learning", "cross-entropy-loss"],
    source: ML_15,
    status: "live",
  },
  {
    id: "contrastive-learning--recall-in-batch-negatives",
    conceptId: "contrastive-learning",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Where do the negatives in a standard contrastive batch come from?",
    choices: [
      {
        id: "a",
        text: "The other examples in the same batch, used as candidates for every anchor",
        correct: true,
      },
      {
        id: "b",
        text: "A separately labelled set of hard negatives collected by annotators",
        correct: false,
        misconception: {
          id: "negatives-assumed-labelled",
          description:
            "Requiring annotation would defeat the purpose: the method is self-supervised precisely because the negatives are whatever else happened to be in the batch.",
          blameConceptId: "self-supervised-learning",
        },
      },
      {
        id: "c",
        text: "Random noise vectors sampled from the embedding space",
        correct: false,
        misconception: {
          id: "negatives-as-noise",
          description:
            "Noise is trivially separable and teaches nothing. The task is only informative when the negatives are real examples the model might plausibly confuse with the positive.",
          blameConceptId: "contrastive-learning",
        },
      },
      {
        id: "d",
        text: "Augmented copies of the anchor with the strongest transformations applied",
        correct: false,
        misconception: {
          id: "negatives-confused-with-positives",
          description:
            "Augmented copies of the anchor are the positives, however strong the augmentation. Treating them as negatives asks the model to separate two views of the same thing.",
          blameConceptId: "contrastive-learning",
        },
      },
    ],
    difficulty: 0.9,
    discrimination: 1.4,
    expectedSeconds: 60,
    prereqClosure: ["contrastive-learning", "self-supervised-learning"],
    source: ML_15,
    status: "live",
  },
  {
    id: "contrastive-learning--apply-chance-loss",
    conceptId: "contrastive-learning",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "An InfoNCE batch presents 512 candidates, one of which is the positive. What loss does an untrained model that scores every candidate alike achieve, in nats to four decimal places?",
    answerKey: 6.2383,
    tolerance: 0.0001,
    difficulty: 1.1,
    discrimination: 1.4,
    expectedSeconds: 110,
    prereqClosure: ["contrastive-learning", "cross-entropy-loss"],
    source: ML_15,
    status: "live",
  },
  {
    id: "contrastive-learning--apply-temperature",
    conceptId: "contrastive-learning",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "An anchor has cosine similarity 0.8 with its positive and 0.4 with the single negative, at temperature τ = 0.2. What is the InfoNCE loss, in nats to four decimal places?",
    answerKey: 0.1269,
    tolerance: 0.0001,
    difficulty: 1.5,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["contrastive-learning", "cross-entropy-loss"],
    source: ML_15,
    status: "live",
  },
  {
    id: "contrastive-learning--explain-augmentation-decides",
    conceptId: "contrastive-learning",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "A team pretrains a contrastive image model with heavy colour jitter, then finds it useless for grading fruit ripeness. Explain why, in terms of what the objective actually asked for.",
    rubric: {
      elements: [
        {
          id: "mechanism",
          description:
            "The two views of a positive pair differ by colour, and the loss requires them to map to the same representation — so the model is explicitly trained to discard colour information.",
          weight: 5,
          required: true,
        },
        {
          id: "general-point",
          description:
            "Whatever the augmentations vary is exactly what the representation is asked to ignore, so the augmentation policy is the specification of the invariances, not a training detail.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.8,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["contrastive-learning", "self-supervised-learning"],
    source: ML_15,
    status: "live",
  },
  {
    id: "contrastive-learning--explain-vs-autoencoder",
    conceptId: "contrastive-learning",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed"],
    stem: "An autoencoder and a contrastive model both learn representations without labels. Why does the contrastive one usually give better features for a downstream classifier?",
    rubric: {
      elements: [
        {
          id: "reconstruction-cost",
          description:
            "An autoencoder must reconstruct every input dimension, so it spends capacity on detail — texture, exact pixel values, background — that carries no semantic content but dominates the reconstruction error.",
          weight: 4,
          required: true,
        },
        {
          id: "weaker-requirement",
          description:
            "A contrastive model only has to tell matches from non-matches, which is a far weaker requirement and happens to align much better with what a classifier needs.",
          weight: 4,
          required: true,
        },
        {
          id: "caveat",
          description:
            "Notes the limit: the contrastive representation is only as good as the invariances its augmentations encode, and masked-reconstruction methods have since closed much of the gap.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["contrastive-learning", "autoencoders", "embeddings"],
    source: ML_15,
    status: "live",
  },
  {
    id: "contrastive-learning--transfer-false-negatives",
    conceptId: "contrastive-learning",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "A team adds hard negative mining to an unlabelled contrastive run and the representation gets worse. Explain the likely cause and one way to keep the benefit without the harm.",
    rubric: {
      elements: [
        {
          id: "false-negatives",
          description:
            "In an unlabelled corpus the hardest negatives are frequently other examples of the same underlying class, so mining them systematically selects false negatives and trains the model to separate things that belong together.",
          weight: 5,
          required: true,
        },
        {
          id: "mitigation",
          description:
            "Names a mitigation: cap the hardness rather than taking the extreme tail, use a debiased or class-aware objective, or exclude near-duplicates by a similarity threshold.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["contrastive-learning", "self-supervised-learning"],
    source: ML_15,
    status: "live",
  },
  {
    id: "contrastive-learning--transfer-batch-size",
    conceptId: "contrastive-learning",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Contrastive methods are famously sensitive to batch size in a way supervised classification is not. Explain why, and name the mechanism that decouples the two.",
    rubric: {
      elements: [
        {
          id: "why",
          description:
            "The batch supplies the negatives, so the batch size is the number of candidates the task discriminates among — a small batch is an easy task that stops being informative once solved.",
          weight: 4,
          required: true,
        },
        {
          id: "contrast",
          description:
            "In supervised classification the number of classes is fixed by the label set, so the batch affects only gradient noise, not the difficulty of the task itself.",
          weight: 3,
          required: true,
        },
        {
          id: "decoupling",
          description:
            "A memory bank or queue of embeddings from recent batches supplies negatives independently of the current batch, with a momentum encoder to keep the stored vectors consistent as the model changes.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["contrastive-learning", "cross-entropy-loss"],
    source: ML_15,
    status: "live",
  },

  // --- Parameter-Efficient Fine-Tuning --------------------------------------
  {
    id: "parameter-efficient-fine-tuning--recall-lora-form",
    conceptId: "parameter-efficient-fine-tuning",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "How does LoRA represent the change to a pretrained weight matrix, and which parameters are trained?",
    rubric: {
      elements: [
        {
          id: "form",
          description:
            "The update is factored as a product of two thin matrices, ΔW = BA with inner dimension r much smaller than either side, so the update is constrained to rank r.",
          weight: 4,
          required: true,
        },
        {
          id: "trained",
          description:
            "Only A and B are trained; the pretrained W is frozen and never updated.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["parameter-efficient-fine-tuning", "rank"],
    source: ML_15,
    status: "live",
  },
  {
    id: "parameter-efficient-fine-tuning--recall-zero-init",
    conceptId: "parameter-efficient-fine-tuning",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "LoRA initialises A at random and B at zero. What does that achieve?",
    choices: [
      {
        id: "a",
        text: "BA = 0 at the start, so the adapted model is exactly the pretrained one and fine-tuning departs from it smoothly",
        correct: true,
      },
      {
        id: "b",
        text: "It keeps the update low-rank, which random initialisation of both would not",
        correct: false,
        misconception: {
          id: "lora-init-confused-with-rank-constraint",
          description:
            "The rank constraint comes from the shapes of A and B, not from how they are initialised. Any values give a rank-r update.",
          blameConceptId: "rank",
        },
      },
      {
        id: "c",
        text: "It halves the number of trainable parameters, since the zeros need no gradient",
        correct: false,
        misconception: {
          id: "lora-init-read-as-parameter-saving",
          description:
            "B is initialised at zero, not fixed at zero — it receives gradient from the first step and is trained like any other parameter.",
          blameConceptId: "parameter-efficient-fine-tuning",
        },
      },
      {
        id: "d",
        text: "It prevents the two matrices from collapsing to the same values during training",
        correct: false,
        misconception: {
          id: "lora-init-read-as-symmetry-breaking",
          description:
            "Symmetry breaking is what the random initialisation of A provides. Zeroing B is about where the fine-tune starts, not about distinguishing the factors.",
          blameConceptId: "weight-initialization",
        },
      },
    ],
    difficulty: 1.1,
    discrimination: 1.4,
    expectedSeconds: 70,
    prereqClosure: ["parameter-efficient-fine-tuning", "rank"],
    source: ML_15,
    status: "live",
  },
  {
    id: "parameter-efficient-fine-tuning--apply-lora-params",
    conceptId: "parameter-efficient-fine-tuning",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A 1024 x 1024 weight matrix is adapted with LoRA at rank 16. How many trainable parameters does the adapter hold?",
    answerKey: 32768,
    tolerance: 0.000001,
    difficulty: 0.9,
    discrimination: 1.4,
    expectedSeconds: 100,
    prereqClosure: ["parameter-efficient-fine-tuning", "rank"],
    source: ML_15,
    status: "live",
  },
  {
    id: "parameter-efficient-fine-tuning--apply-ratio",
    conceptId: "parameter-efficient-fine-tuning",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "For that same 1024 x 1024 matrix, how many times fewer parameters does rank-16 LoRA train than full fine-tuning of the matrix?",
    answerKey: 32,
    tolerance: 0.000001,
    difficulty: 1.1,
    discrimination: 1.4,
    expectedSeconds: 110,
    prereqClosure: ["parameter-efficient-fine-tuning", "rank"],
    source: ML_15,
    status: "live",
  },
  {
    id: "parameter-efficient-fine-tuning--explain-why-low-rank-suffices",
    conceptId: "parameter-efficient-fine-tuning",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "What claim about fine-tuning does LoRA's rank constraint rest on, and what evidence supports it?",
    rubric: {
      elements: [
        {
          id: "claim",
          description:
            "That adapting a pretrained model to a downstream task needs a change of low intrinsic rank — the capabilities are already present, and fine-tuning mostly selects and reweights them rather than building anything new.",
          weight: 4,
          required: true,
        },
        {
          id: "evidence",
          description:
            "The weight change produced by full fine-tuning is itself close to low rank when measured afterwards, and rank 8 or 16 matches full fine-tuning on ordinary tasks while rank 1 does not.",
          weight: 4,
          required: true,
        },
        {
          id: "limit",
          description:
            "Notes where the claim fails: a target domain genuinely far from pretraining needs more than a low-rank nudge.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["parameter-efficient-fine-tuning", "rank", "transfer-learning"],
    source: ML_15,
    status: "live",
  },
  {
    id: "parameter-efficient-fine-tuning--explain-optimizer-memory",
    conceptId: "parameter-efficient-fine-tuning",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed"],
    stem: "LoRA's training memory saving is larger than its parameter saving alone suggests. Explain why.",
    rubric: {
      elements: [
        {
          id: "optimizer-state",
          description:
            "Adam holds two running moments per trainable parameter, and full fine-tuning also needs a full-precision master copy — roughly 12 extra bytes per parameter that are only allocated for parameters being trained.",
          weight: 4,
          required: true,
        },
        {
          id: "frozen-weights",
          description:
            "The frozen base weights need only be stored for the forward and backward pass, at inference precision, with no gradient and no optimiser state attached.",
          weight: 4,
          required: true,
        },
        {
          id: "consequence",
          description:
            "Notes what this makes possible: the base model can even be quantised, as in QLoRA, since it is never updated and cannot accumulate quantisation error.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.5,
    expectedSeconds: 200,
    prereqClosure: ["parameter-efficient-fine-tuning", "transfer-learning"],
    source: ML_15,
    status: "live",
  },
  {
    id: "parameter-efficient-fine-tuning--transfer-multi-tenant",
    conceptId: "parameter-efficient-fine-tuning",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A company must serve 200 customer-specific variants of one base model. Explain how adapters change the deployment, and the one case where merging them is still the right call.",
    rubric: {
      elements: [
        {
          id: "deployment",
          description:
            "One copy of the base model stays resident and each variant is a few megabytes of adapter weights swapped in per request, instead of 200 full model copies that could not be held at once.",
          weight: 4,
          required: true,
        },
        {
          id: "merging",
          description:
            "Because the update is additive, W + BA can be folded into a single matrix, giving a model architecturally identical to the base and running at exactly its speed — worth doing for a single high-volume variant served on dedicated hardware.",
          weight: 4,
          required: true,
        },
        {
          id: "trade",
          description:
            "Names the trade: merging removes the small per-request overhead but gives up the ability to serve many variants from one resident copy.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["parameter-efficient-fine-tuning", "transfer-learning"],
    source: ML_15,
    status: "live",
  },
  {
    id: "parameter-efficient-fine-tuning--transfer-wrong-tool",
    conceptId: "parameter-efficient-fine-tuning",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "A team fine-tunes with LoRA to make a model answer questions about their internal documentation, and it produces fluent, confidently wrong answers. Explain why fine-tuning was the wrong instrument, and what fits the goal.",
    rubric: {
      elements: [
        {
          id: "what-fine-tuning-does",
          description:
            "Fine-tuning teaches format, style and task behaviour; a small low-rank update over a modest dataset does not reliably install specific facts the base model never saw.",
          weight: 4,
          required: true,
        },
        {
          id: "symptom",
          description:
            "The observed symptom fits exactly that: the model has learned to sound like the documentation without acquiring its content, so it produces plausible text with invented details.",
          weight: 3,
          required: true,
        },
        {
          id: "alternative",
          description:
            "Retrieval — put the relevant documents in the context at answer time — addresses knowledge directly, and can be combined with a light fine-tune for the desired format.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["parameter-efficient-fine-tuning", "transfer-learning", "overfitting-underfitting"],
    source: ML_15,
    status: "live",
  },

  // --- Instruction Tuning and RLHF ------------------------------------------
  {
    id: "instruction-tuning-and-rlhf--recall-three-stages",
    conceptId: "instruction-tuning-and-rlhf",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Name the three training stages that turn a pretrained language model into an assistant, and what each contributes.",
    rubric: {
      elements: [
        {
          id: "pretraining",
          description: "Pretraining on a large corpus by next-token prediction, giving knowledge and fluency but no notion of being helpful.",
          weight: 3,
          required: true,
        },
        {
          id: "sft",
          description:
            "Supervised fine-tuning on human-written demonstrations, which installs the format — answer the question, follow the instruction.",
          weight: 3,
          required: true,
        },
        {
          id: "preference",
          description:
            "Preference optimisation against human comparisons of model outputs, which reaches qualities that are easy to judge and hard to demonstrate.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.3,
    expectedSeconds: 70,
    prereqClosure: ["instruction-tuning-and-rlhf", "autoregressive-models"],
    source: ML_15,
    status: "live",
  },
  {
    id: "instruction-tuning-and-rlhf--recall-why-comparisons",
    conceptId: "instruction-tuning-and-rlhf",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Why do annotators rank pairs of outputs rather than score each output on a scale?",
    choices: [
      {
        id: "a",
        text: "Absolute scores are not comparable between annotators or stable within one, while a pairwise preference is a much easier and more reliable judgement",
        correct: true,
      },
      {
        id: "b",
        text: "Because a scalar score cannot be turned into a training signal",
        correct: false,
        misconception: {
          id: "comparisons-read-as-technical-necessity",
          description:
            "Scalar scores could be regressed on directly. The reason for comparisons is the reliability of the human judgement, not a limitation of the method.",
          blameConceptId: "instruction-tuning-and-rlhf",
        },
      },
      {
        id: "c",
        text: "Because comparisons require fewer annotations for the same information",
        correct: false,
        misconception: {
          id: "comparisons-read-as-cheaper",
          description:
            "A comparison covers two outputs at once but yields one bit about their order; the case for it is quality and consistency of the labels, not volume.",
          blameConceptId: "instruction-tuning-and-rlhf",
        },
      },
      {
        id: "d",
        text: "Because the reward model can only represent differences, not levels",
        correct: false,
        misconception: {
          id: "comparisons-confused-with-model-limitation",
          description:
            "The reward being identified only up to a constant is a consequence of training on comparisons, not a prior limitation that forced them.",
          blameConceptId: "instruction-tuning-and-rlhf",
        },
      },
    ],
    difficulty: 1.1,
    discrimination: 1.4,
    expectedSeconds: 70,
    prereqClosure: ["instruction-tuning-and-rlhf", "reinforcement-learning"],
    source: ML_15,
    status: "live",
  },
  {
    id: "instruction-tuning-and-rlhf--apply-bradley-terry",
    conceptId: "instruction-tuning-and-rlhf",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Under the Bradley-Terry model P(A ≻ B) = σ(r(A) − r(B)), a reward model scores A at 0.7 and B at −0.3. What probability does it assign to a rater preferring A? Give the answer to four decimal places.",
    answerKey: 0.7311,
    tolerance: 0.0001,
    difficulty: 1.2,
    discrimination: 1.5,
    expectedSeconds: 120,
    prereqClosure: ["instruction-tuning-and-rlhf", "reinforcement-learning"],
    source: ML_15,
    status: "live",
  },
  {
    id: "instruction-tuning-and-rlhf--apply-reward-shift",
    conceptId: "instruction-tuning-and-rlhf",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Show that adding a constant c to every reward leaves all Bradley-Terry preference probabilities unchanged, and say what that means for interpreting a reward model's absolute scores.",
    rubric: {
      elements: [
        {
          id: "algebra",
          description:
            "(r(A) + c) − (r(B) + c) = r(A) − r(B), so σ of the difference is unchanged for every pair.",
          weight: 4,
          required: true,
        },
        {
          id: "meaning",
          description:
            "The reward is identified only up to an additive constant, so an absolute score means nothing on its own — only differences between outputs carry information.",
          weight: 4,
          required: true,
        },
        {
          id: "practice",
          description:
            "Notes the practical consequence: reward values are not comparable across reward models or across training runs, and are usually normalised before use.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["instruction-tuning-and-rlhf", "reinforcement-learning"],
    source: ML_15,
    status: "live",
  },
  {
    id: "instruction-tuning-and-rlhf--explain-kl-penalty",
    conceptId: "instruction-tuning-and-rlhf",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why is the objective E[r] − β·KL(π ‖ π_ref) rather than just E[r], and what happens as β goes to zero?",
    rubric: {
      elements: [
        {
          id: "imperfect-reward",
          description:
            "The reward model is an imperfect fit trained on outputs from a particular distribution, so it is only trustworthy near that distribution.",
          weight: 4,
          required: true,
        },
        {
          id: "hacking",
          description:
            "Unconstrained, the policy leaves that distribution and finds text that scores extremely well and reads as nonsense — reward hacking, which is the normal outcome rather than a rare failure.",
          weight: 4,
          required: true,
        },
        {
          id: "beta",
          description:
            "β is the dial between optimising the proxy and remaining close to the reference model; at β = 0 nothing anchors the policy, and at very large β nothing changes.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["instruction-tuning-and-rlhf", "kl-divergence", "reinforcement-learning"],
    source: ML_15,
    status: "live",
  },
  {
    id: "instruction-tuning-and-rlhf--explain-dpo",
    conceptId: "instruction-tuning-and-rlhf",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed"],
    stem: "DPO removes both the separate reward model and the reinforcement learning loop. What observation makes that possible, and what is given up?",
    rubric: {
      elements: [
        {
          id: "observation",
          description:
            "The optimum of the KL-constrained objective has a closed form relating the optimal policy to the reward, which can be inverted — so the reward is expressible as a function of the policy's own log-ratio against the reference.",
          weight: 4,
          required: true,
        },
        {
          id: "consequence",
          description:
            "Substituting it turns preference optimisation into a supervised classification loss on preference pairs: no reward model, no sampling loop, no four models in memory.",
          weight: 4,
          required: true,
        },
        {
          id: "given-up",
          description:
            "What is lost is on-policy sampling — the model is not scored on its own fresh outputs — and a reusable reward model that could rank new candidates at inference.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["instruction-tuning-and-rlhf", "kl-divergence", "reinforcement-learning"],
    source: ML_15,
    status: "live",
  },
  {
    id: "instruction-tuning-and-rlhf--transfer-length-bias",
    conceptId: "instruction-tuning-and-rlhf",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "After preference optimisation a model's answers become much longer and rated better by the reward model, while users report no improvement. Explain what has happened and what it says about the pipeline.",
    rubric: {
      elements: [
        {
          id: "learned-bias",
          description:
            "Annotators mildly prefer longer, more thorough-looking answers, so the reward model learned length as a proxy for quality, and optimising it optimises the proxy.",
          weight: 4,
          required: true,
        },
        {
          id: "not-a-bug",
          description:
            "Nothing malfunctioned: the policy maximised exactly what it was given, which is why a reward model's biases become the model's behaviour rather than staying a measurement artefact.",
          weight: 4,
          required: true,
        },
        {
          id: "remedies",
          description:
            "Names a remedy — length-normalised or debiased rewards, annotation guidelines that address it, or evaluation against held-out human judgements rather than the reward model.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["instruction-tuning-and-rlhf", "reinforcement-learning"],
    source: ML_15,
    status: "live",
  },
  {
    id: "instruction-tuning-and-rlhf--transfer-sft-ceiling",
    conceptId: "instruction-tuning-and-rlhf",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "A team proposes to skip preference optimisation and simply collect ten times more demonstrations. What does supervised fine-tuning structurally not give them, however many demonstrations they write?",
    rubric: {
      elements: [
        {
          id: "ceiling",
          description:
            "Demonstrations only show what a good answer looks like, so the model is trained toward its demonstrators and has no signal that would let it exceed them.",
          weight: 4,
          required: true,
        },
        {
          id: "negative-signal",
          description:
            "It gets no information about the outputs a person would reject: the vast space of answers an annotator would recognise as bad but would never have written is never labelled at all.",
          weight: 4,
          required: true,
        },
        {
          id: "economics",
          description:
            "Notes the asymmetry that motivates the second stage: judging which of two answers is better is far cheaper and more reliable than writing the better one.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["instruction-tuning-and-rlhf", "autoregressive-models", "reinforcement-learning"],
    source: ML_15,
    status: "live",
  },

  // --- Knowledge Distillation -----------------------------------------------
  {
    id: "knowledge-distillation--recall-soft-targets",
    conceptId: "knowledge-distillation",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "What does a student learn from a teacher's full output distribution that the hard label does not provide?",
    rubric: {
      elements: [
        {
          id: "relative-structure",
          description:
            "The relative plausibility of the wrong answers — that this 7 is somewhat 1-like and not at all 8-like — which the one-hot label deletes entirely.",
          weight: 4,
          required: true,
        },
        {
          id: "per-example",
          description:
            "That structure differs per example, so it is a similarity judgement about this input rather than a global statement about the classes.",
          weight: 3,
        },
      ],
    },
    difficulty: 0.4,
    discrimination: 1.3,
    expectedSeconds: 55,
    prereqClosure: ["knowledge-distillation", "cross-entropy-loss"],
    source: ML_15,
    status: "live",
  },
  {
    id: "knowledge-distillation--recall-temperature-role",
    conceptId: "knowledge-distillation",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Why is the teacher's distribution softened with a temperature above 1 before the student is trained on it?",
    choices: [
      {
        id: "a",
        text: "A confident teacher's distribution is nearly one-hot, so the information in the small probabilities is invisible to the loss until it is flattened",
        correct: true,
      },
      {
        id: "b",
        text: "To make the teacher less accurate, so the student is not overwhelmed",
        correct: false,
        misconception: {
          id: "temperature-read-as-handicapping-teacher",
          description:
            "The ranking is unchanged by temperature, so the teacher is no less accurate. What changes is how much of its relative judgement reaches the gradient.",
          blameConceptId: "knowledge-distillation",
        },
      },
      {
        id: "c",
        text: "To make the student's and teacher's architectures comparable",
        correct: false,
        misconception: {
          id: "temperature-confused-with-architecture-matching",
          description:
            "Temperature acts on output logits and says nothing about architecture. Distillation works across quite different architectures.",
          blameConceptId: "knowledge-distillation",
        },
      },
      {
        id: "d",
        text: "To prevent the student from overfitting the training set",
        correct: false,
        misconception: {
          id: "temperature-read-as-regularisation-only",
          description:
            "Soft targets do regularise, but that is a consequence. The temperature exists to expose the teacher's relative judgements, which is the signal being transferred.",
          blameConceptId: "knowledge-distillation",
        },
      },
    ],
    difficulty: 1.1,
    discrimination: 1.4,
    expectedSeconds: 70,
    prereqClosure: ["knowledge-distillation", "cross-entropy-loss"],
    source: ML_15,
    status: "live",
  },
  {
    id: "knowledge-distillation--apply-softmax-temperature",
    conceptId: "knowledge-distillation",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A teacher's logits for three classes are (5, 2, 1). What probability does the second class receive at temperature T = 2? Give the answer to four decimal places.",
    answerKey: 0.1643,
    tolerance: 0.0002,
    difficulty: 1.4,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["knowledge-distillation", "cross-entropy-loss"],
    source: ML_15,
    status: "live",
  },
  {
    id: "knowledge-distillation--apply-temperature-comparison",
    conceptId: "knowledge-distillation",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "For logits (5, 2, 1), the second class gets about 0.047 at T = 1 and about 0.164 at T = 2. Explain what has and has not changed, and why the change matters for the student.",
    rubric: {
      elements: [
        {
          id: "unchanged",
          description:
            "The ordering is unchanged, and so is the teacher's judgement that class 2 is roughly three times as plausible as class 3 — softening is monotone.",
          weight: 3,
          required: true,
        },
        {
          id: "changed",
          description:
            "The mass on the non-top classes has grown by more than a factor of three, so those terms now contribute meaningfully to the loss instead of being swamped by the top class.",
          weight: 4,
          required: true,
        },
        {
          id: "why-matters",
          description:
            "The student's gradient is what carries the transfer, and at T = 1 almost all of it comes from the single correct class — which is the information the hard label already had.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["knowledge-distillation", "cross-entropy-loss"],
    source: ML_15,
    status: "live",
  },
  {
    id: "knowledge-distillation--explain-self-distillation",
    conceptId: "knowledge-distillation",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Self-distillation — where the student has the same architecture and size as the teacher — still improves accuracy. What does that rule out as the explanation for distillation's benefit?",
    rubric: {
      elements: [
        {
          id: "rules-out",
          description:
            "It rules out capacity transfer as the whole story: the student is not smaller, so nothing is being compressed into a tighter budget.",
          weight: 4,
          required: true,
        },
        {
          id: "what-remains",
          description:
            "What remains is the soft targets themselves — an informative, example-specific smoothing of the labels that makes the optimisation problem easier and the solution better calibrated.",
          weight: 4,
          required: true,
        },
        {
          id: "link",
          description:
            "Connects it to label smoothing: both soften the target, but a teacher's smoothing is different for every example and says which classes are actually confusable.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["knowledge-distillation", "cross-entropy-loss", "neural-networks"],
    source: ML_15,
    status: "live",
  },
  {
    id: "knowledge-distillation--explain-vs-ensemble",
    conceptId: "knowledge-distillation",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed"],
    stem: "Distillation was introduced to replace an ensemble at inference. Explain what is kept and what is lost in that replacement.",
    rubric: {
      elements: [
        {
          id: "kept",
          description:
            "Most of the ensemble's accuracy: the averaged predictions are a better teacher than the labels, and a single student trained on them recovers much of the gain.",
          weight: 4,
          required: true,
        },
        {
          id: "cost-saved",
          description:
            "The inference cost falls from running every member to running one model, which is the entire point — an ensemble's cost is paid on every prediction forever.",
          weight: 3,
          required: true,
        },
        {
          id: "lost",
          description:
            "The ensemble's disagreement is lost, so the uncertainty estimate that came from members disagreeing is gone, and the student cannot exceed what its own capacity can represent.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["knowledge-distillation", "ensemble-methods"],
    source: ML_15,
    status: "live",
  },
  {
    id: "knowledge-distillation--transfer-capacity-gap",
    conceptId: "knowledge-distillation",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "A team distils a 70-billion-parameter teacher into a 100-million-parameter student and finds the student matches the teacher on easy inputs and diverges badly on hard ones. Explain why, and what to change.",
    rubric: {
      elements: [
        {
          id: "capacity-ceiling",
          description:
            "Distillation transfers only what the student can represent; across a gap of nearly three orders of magnitude the student cannot express the teacher's function, and the loss is minimised by matching the easy majority of inputs.",
          weight: 4,
          required: true,
        },
        {
          id: "not-a-loss-problem",
          description:
            "Pushing the distillation loss harder does not help — the failure is the hypothesis class, not the optimisation.",
          weight: 3,
          required: true,
        },
        {
          id: "options",
          description:
            "Names a change: a larger student, an intermediate teacher assistant to bridge the gap, focusing the distillation set on the hard cases, or narrowing the task the student must cover.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["knowledge-distillation", "neural-networks"],
    source: ML_15,
    status: "live",
  },
  {
    id: "knowledge-distillation--transfer-sequence-level",
    conceptId: "knowledge-distillation",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "For generative models the standard practice is to train the student on text the teacher generated, rather than on its per-token distributions. Give one practical and one statistical reason.",
    rubric: {
      elements: [
        {
          id: "practical",
          description:
            "A full distribution over a large vocabulary at every position is enormous to transport and store, while generated text is small and reusable — and it needs no access to the teacher's logits, only to its outputs.",
          weight: 4,
          required: true,
        },
        {
          id: "statistical",
          description:
            "Training on the teacher's own generations puts the student's training distribution close to what it will condition on at generation time, which addresses the exposure-bias mismatch rather than merely matching one-step conditionals.",
          weight: 4,
          required: true,
        },
        {
          id: "cost",
          description:
            "Notes the cost: sampling from the teacher is expensive, and the student inherits the teacher's mistakes as if they were ground truth.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.5,
    expectedSeconds: 220,
    prereqClosure: ["knowledge-distillation", "cross-entropy-loss"],
    source: ML_15,
    status: "live",
  },

  // --- Quantization ---------------------------------------------------------
  {
    id: "quantization--recall-affine-map",
    conceptId: "quantization",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "What two numbers define an affine quantisation of a group of weights, and how is the scale chosen?",
    rubric: {
      elements: [
        {
          id: "scale-zero",
          description: "A scale s and a zero point z, so that q = round(x/s) + z and x̂ = s(q − z).",
          weight: 4,
          required: true,
        },
        {
          id: "range",
          description:
            "The scale is set from the group's observed range divided by the number of representable levels, (max − min)/(2^b − 1).",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["quantization"],
    source: ML_15,
    status: "live",
  },
  {
    id: "quantization--recall-ptq-vs-qat",
    conceptId: "quantization",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What distinguishes quantisation-aware training from post-training quantisation?",
    choices: [
      {
        id: "a",
        text: "QAT simulates the quantisation in the forward pass during training, so the weights adapt to the error it introduces",
        correct: true,
      },
      {
        id: "b",
        text: "QAT quantises the gradients as well as the weights",
        correct: false,
        misconception: {
          id: "qat-confused-with-gradient-quantisation",
          description:
            "Gradients are kept in higher precision in QAT; the quantisation is simulated in the forward pass and gradients pass through it with a straight-through estimator.",
          blameConceptId: "mixed-precision-training",
        },
      },
      {
        id: "c",
        text: "QAT uses a calibration set and PTQ does not",
        correct: false,
        misconception: {
          id: "qat-ptq-calibration-inverted",
          description:
            "It is PTQ that uses a small calibration set to observe activation ranges. QAT needs a full training run.",
          blameConceptId: "quantization",
        },
      },
      {
        id: "d",
        text: "QAT only applies to weights, while PTQ can also quantise activations",
        correct: false,
        misconception: {
          id: "qat-scope-inverted",
          description:
            "Both can cover weights and activations. Activations are the harder half in either case, and QAT is the method more likely to make them work.",
          blameConceptId: "quantization",
        },
      },
    ],
    difficulty: 1.1,
    discrimination: 1.4,
    expectedSeconds: 70,
    prereqClosure: ["quantization"],
    source: ML_15,
    status: "live",
  },
  {
    id: "quantization--apply-quantise-a-weight",
    conceptId: "quantization",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A weight group is quantised symmetrically to signed int8 over [−0.5, 0.5], so s = 0.5/127. What value does a weight of 0.3 dequantise to? Give the answer to five decimal places.",
    answerKey: 0.29921,
    tolerance: 0.00002,
    difficulty: 1.3,
    discrimination: 1.5,
    expectedSeconds: 140,
    prereqClosure: ["quantization"],
    source: ML_15,
    status: "live",
  },
  {
    id: "quantization--apply-memory",
    conceptId: "quantization",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A 13-billion-parameter model's weights are stored at 4 bits each. How many gigabytes do they occupy, counting 1 GB as 10⁹ bytes and ignoring the group scales?",
    answerKey: 6.5,
    tolerance: 0.001,
    difficulty: 0.9,
    discrimination: 1.3,
    expectedSeconds: 100,
    prereqClosure: ["quantization", "mixed-precision-training"],
    source: ML_15,
    status: "live",
  },
  {
    id: "quantization--explain-why-error-tolerable",
    conceptId: "quantization",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Rounding every weight to one of 256 levels sounds destructive, yet 8-bit inference is usually indistinguishable from 16-bit. Explain why the damage is smaller than it looks.",
    rubric: {
      elements: [
        {
          id: "relative-error",
          description:
            "Within a well-chosen group the relative error per weight is a fraction of a percent, because the scale is fitted to that group's actual range rather than to the whole tensor.",
          weight: 4,
          required: true,
        },
        {
          id: "cancellation",
          description:
            "A matmul sums many terms whose rounding errors are close to independent and centred near zero, so they largely cancel rather than accumulating — the error in the sum grows far more slowly than the number of terms.",
          weight: 4,
          required: true,
        },
        {
          id: "caveat",
          description:
            "Notes what breaks this: a shared scale stretched by outliers, which makes the per-weight error large for everything else in the group.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.8,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["quantization"],
    source: ML_15,
    status: "live",
  },
  {
    id: "quantization--explain-memory-bound",
    conceptId: "quantization",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed"],
    stem: "Weight-only quantisation speeds up single-request generation even though the arithmetic still happens in higher precision after dequantising. Explain why.",
    rubric: {
      elements: [
        {
          id: "memory-bound",
          description:
            "Generating one token reads every weight once and does very little arithmetic per weight, so the step is bound by memory bandwidth rather than by compute.",
          weight: 4,
          required: true,
        },
        {
          id: "consequence",
          description:
            "Quartering the bytes per weight therefore quarters the dominant cost, and the extra dequantisation work is cheap because the hardware was idle waiting on memory anyway.",
          weight: 4,
          required: true,
        },
        {
          id: "batching",
          description:
            "Notes the boundary: with a large batch the same weights serve many tokens, the regime becomes compute-bound, and weight-only quantisation stops paying as much.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["quantization", "mixed-precision-training"],
    source: ML_15,
    status: "live",
  },
  {
    id: "quantization--transfer-outliers",
    conceptId: "quantization",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "A quantisation recipe validated on a small model degrades badly on a large one. Given that a few activation channels in large networks carry magnitudes hundreds of times the rest, explain the mechanism and two ways round it.",
    rubric: {
      elements: [
        {
          id: "mechanism",
          description:
            "A scale shared across a tensor must span the outlier's magnitude, so the representable step is huge relative to the ordinary values and almost every other weight or activation is crushed into a handful of levels.",
          weight: 4,
          required: true,
        },
        {
          id: "fixes",
          description:
            "Names two: finer granularity (per-channel or per-group scales) so an outlier only coarsens its own group, and keeping the outlier channels in higher precision — or migrating their magnitude into a scale factor applied elsewhere.",
          weight: 4,
          required: true,
        },
        {
          id: "lesson",
          description:
            "Draws the lesson: quantisation results do not transfer across scale, because the phenomenon that breaks them appears only in large models.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["quantization"],
    source: ML_15,
    status: "live",
  },
  {
    id: "quantization--transfer-vs-distillation",
    conceptId: "quantization",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A team must halve serving cost and is choosing between quantising their model and distilling it into a smaller one. Compare what each spends and what each risks, and say why the choice is not exclusive.",
    rubric: {
      elements: [
        {
          id: "quantisation",
          description:
            "Quantisation keeps the architecture and the learned function, losing numerical precision. It is cheap — hours, on a calibration set — and its risk is concentrated in outliers and in activations.",
          weight: 4,
          required: true,
        },
        {
          id: "distillation",
          description:
            "Distillation keeps precision and gives up capacity, requiring a training run and a teacher, with the risk that the student cannot represent the teacher's function on hard inputs.",
          weight: 4,
          required: true,
        },
        {
          id: "compose",
          description:
            "They compose: distil to a smaller student, then quantise it, since the two spend different budgets and their losses are largely independent.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["quantization", "knowledge-distillation"],
    source: ML_15,
    status: "live",
  },

  // =========================================================================
  // Doubling pass — additional items per concept
  // =========================================================================

  // --- Scaling Laws -----------------------------------------------------------
  {
    id: "scaling-laws--recall-what-n-to-infinity-approaches",
    conceptId: "scaling-laws",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In L ≈ L_∞ + (N_c/N)^α, what happens to the loss as N → ∞?",
    choices: [
      { id: "a", text: "L approaches L_∞, the irreducible floor", correct: true },
      {
        id: "b",
        text: "L approaches 0",
        correct: false,
        misconception: {
          id: "scaling-ignores-irreducible-floor",
          description: "The floor L_∞, set by the entropy of the data itself, is never reached by more scale alone.",
          blameConceptId: "scaling-laws",
        },
      },
      {
        id: "c",
        text: "L grows without bound",
        correct: false,
        misconception: {
          id: "scaling-direction-inverted",
          description: "The reducible term shrinks, not grows, as N increases — that is the entire content of the power law.",
          blameConceptId: "scaling-laws",
        },
      },
      {
        id: "d",
        text: "L oscillates around L_∞ indefinitely",
        correct: false,
        misconception: {
          id: "scaling-assumed-oscillatory",
          description: "The power-law fit is monotone, not oscillatory; there is no mechanism in the model for oscillation.",
          blameConceptId: "scaling-laws",
        },
      },
    ],
    difficulty: -1.6,
    discrimination: 1.0,
    expectedSeconds: 40,
    prereqClosure: ["scaling-laws"],
    source: ML_15,
    status: "live",
  },
  {
    id: "scaling-laws--recall-compute-optimal-definition",
    conceptId: "scaling-laws",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "What is meant by 'compute-optimal' in the scaling-laws literature?",
    rubric: {
      elements: [
        {
          id: "definition",
          description: "The allocation of a fixed compute budget between model size and data size that minimises loss for that budget.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: -1.2,
    discrimination: 1.0,
    expectedSeconds: 45,
    prereqClosure: ["scaling-laws"],
    source: ML_15,
    status: "live",
  },
  {
    id: "scaling-laws--apply-compute-budget-7b",
    conceptId: "scaling-laws",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Using C ≈ 6ND, what training compute does a 7-billion-parameter model trained on 140 billion tokens require? Give the answer in units of 10²⁰ FLOPs.",
    answerKey: 58.8,
    tolerance: 0.1,
    difficulty: 1.3,
    discrimination: 1.4,
    expectedSeconds: 110,
    prereqClosure: ["scaling-laws"],
    source: ML_15,
    status: "live",
  },
  {
    id: "scaling-laws--apply-data-exponent-growth-factor",
    conceptId: "scaling-laws",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "The reducible loss term scales as D^−0.095 in the data (token) count. By what factor must D grow to reduce that term to 90% of its original value (a 10% reduction)? Give the answer to two decimal places.",
    answerKey: 3.03,
    tolerance: 0.02,
    difficulty: 1.7,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["scaling-laws"],
    source: ML_15,
    status: "live",
  },
  {
    id: "scaling-laws--explain-isoflop-sweeps",
    conceptId: "scaling-laws",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Scaling curves are fit using compute-efficient 'IsoFLOP' runs: for several fixed compute budgets, sweep the split between parameters and data, and record the loss-minimising split at each budget. Explain why sweeping at fixed compute, rather than fixed parameter count, is the right axis to control for the compute-optimal question.",
    rubric: {
      elements: [
        {
          id: "isolates-the-right-variable",
          description:
            "The question is which split of a given budget is best, so holding compute fixed while varying the split isolates exactly that trade-off; holding parameters fixed instead would answer a different question — how loss changes with more data at one size — which conflates the compute spent with the split chosen.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.5,
    expectedSeconds: 190,
    prereqClosure: ["scaling-laws"],
    source: ML_15,
    status: "live",
  },
  {
    id: "scaling-laws--explain-exponent-not-universal",
    conceptId: "scaling-laws",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed"],
    stem: "A team fits a scaling law on models up to 1 billion parameters and observes α ≈ 0.34 for the reducible loss term. Explain why they should not assume α is a universal constant across architectures.",
    rubric: {
      elements: [
        {
          id: "exponent-is-fit-to-one-family",
          description:
            "The exponent is fit empirically to one architecture, tokenizer, and data distribution; changing any of these can shift the constants including α, so it describes this family, not scaling in general.",
          weight: 4,
          required: true,
        },
        {
          id: "empirical-note",
          description: "Bonus: notes that published scaling exponents have in fact varied across papers and model families for exactly this reason.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.15,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["scaling-laws"],
    source: ML_15,
    status: "live",
  },
  {
    id: "scaling-laws--transfer-bigger-is-not-always-better-split",
    conceptId: "scaling-laws",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A startup argues that since compute keeps getting cheaper and scaling laws show loss keeps falling with more compute, they should always train the largest model they can afford rather than think about the parameter/data split. Evaluate this argument.",
    rubric: {
      elements: [
        {
          id: "conflates-more-compute-with-more-parameters",
          description:
            "It conflates 'more compute helps' (true) with 'more parameters is the right way to spend that compute' (not necessarily) — at fixed compute, an undertrained large model can lose to a smaller model trained on more tokens.",
          weight: 4,
          required: true,
        },
        {
          id: "right-question-is-the-split",
          description:
            "The right question is the compute-optimal split for the budget available, which a Chinchilla-style analysis actually answers, rather than simply maximising size.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["scaling-laws", "autoregressive-models"],
    source: ML_15,
    status: "live",
  },
  {
    id: "scaling-laws--transfer-compute-vs-data-constrained",
    conceptId: "scaling-laws",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Two teams have the same total training compute budget but very different amounts of high-quality text available — one is compute-constrained, the other is data-constrained. Explain how each should adjust the standard compute-optimal recipe.",
    rubric: {
      elements: [
        {
          id: "compute-constrained-follows-standard",
          description:
            "The compute-constrained team (ample data, limited compute) should follow the standard compute-optimal split roughly as derived, since more data is available if the split calls for it.",
          weight: 3,
          required: true,
        },
        {
          id: "data-constrained-shifts-toward-larger-model",
          description:
            "The data-constrained team, having exhausted its unique high-quality tokens, cannot buy more data at the same quality by simply repeating it, so it should shift the split toward a larger model relative to what the naive formula recommends, accepting some inefficiency in exchange for using the compute it has.",
          weight: 5,
          required: true,
        },
        {
          id: "repeated-epochs-not-equivalent",
          description: "Bonus: notes repeated epochs over the same corpus are not equivalent to fresh tokens of the same count.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.25,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["scaling-laws"],
    source: ML_15,
    status: "live",
  },

  // --- Tokenization -------------------------------------------------------------
  {
    id: "tokenization--recall-vocabulary-definition",
    conceptId: "tokenization",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What is a tokenizer's 'vocabulary'?",
    choices: [
      { id: "a", text: "The fixed, finite set of subword tokens the tokenizer can produce", correct: true },
      {
        id: "b",
        text: "The set of all words in the training corpus",
        correct: false,
        misconception: {
          id: "vocabulary-confused-with-corpus-words",
          description: "The vocabulary is the tokenizer's own fixed token set, learned from a corpus but not equal to it — it also covers text it never saw, via composition.",
          blameConceptId: "tokenization",
        },
      },
      {
        id: "c",
        text: "The set of all possible byte sequences",
        correct: false,
        misconception: {
          id: "vocabulary-confused-with-all-bytes",
          description: "The vocabulary is a fixed, requested size much smaller than all possible byte sequences.",
          blameConceptId: "tokenization",
        },
      },
      {
        id: "d",
        text: "The model's embedding dimension",
        correct: false,
        misconception: {
          id: "vocabulary-confused-with-model-dimension",
          description: "Vocabulary size and embedding dimension are independent numbers that together determine the embedding table's total parameter count.",
          blameConceptId: "tokenization",
        },
      },
    ],
    difficulty: -1.8,
    discrimination: 1.0,
    expectedSeconds: 35,
    prereqClosure: ["tokenization"],
    source: ML_15,
    status: "live",
  },
  {
    id: "tokenization--recall-vocabulary-size-tradeoff",
    conceptId: "tokenization",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "What does vocabulary size trade off against sequence length, holding the text fixed?",
    rubric: {
      elements: [
        {
          id: "larger-vocab",
          description: "A larger vocabulary covers more text per token, shortening sequences for the same text, at the cost of larger embedding and output tables.",
          weight: 3,
          required: true,
        },
        {
          id: "smaller-vocab",
          description: "A smaller vocabulary keeps those tables small but produces longer sequences for the same text.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -1.4,
    discrimination: 1.0,
    expectedSeconds: 50,
    prereqClosure: ["tokenization"],
    source: ML_15,
    status: "live",
  },
  {
    id: "tokenization--apply-embedding-params-50k",
    conceptId: "tokenization",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A model has a vocabulary of 50,000 tokens and a model dimension of 2,048. How many parameters are in its embedding table?",
    answerKey: 102400000,
    tolerance: 0.0000001,
    difficulty: 0.4,
    discrimination: 1.2,
    expectedSeconds: 80,
    prereqClosure: ["tokenization", "embeddings"],
    source: ML_15,
    status: "live",
  },
  {
    id: "tokenization--apply-untied-output-projection",
    conceptId: "tokenization",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "The output (unembedding) layer of a model with vocabulary 50,000 and model dimension 2,048 does not tie weights with the input embedding. How many additional parameters does this output layer add?",
    answerKey: 102400000,
    tolerance: 0.0000001,
    difficulty: 0.9,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["tokenization", "embeddings"],
    source: ML_15,
    status: "live",
  },
  {
    id: "tokenization--explain-weight-tying",
    conceptId: "tokenization",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Some models 'tie' the input embedding and output projection weights (use the same matrix for both). Explain what parameters this saves, and one reason it might slightly hurt quality.",
    rubric: {
      elements: [
        {
          id: "saves-a-whole-matrix",
          description: "Saves an entire second copy of a vocab_size × d_model matrix — for a large vocabulary a meaningful fraction of total parameters.",
          weight: 4,
          required: true,
        },
        {
          id: "cost-of-shared-roles",
          description:
            "Cost: the input embedding's job (representing a token's identity for reading) and the output projection's job (scoring which token comes next) are not identical, so forcing them to share weights can mildly constrain how each independently specialises.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.5,
    expectedSeconds: 190,
    prereqClosure: ["tokenization", "embeddings"],
    source: ML_15,
    status: "live",
  },
  {
    id: "tokenization--explain-vocab-size-optimum",
    conceptId: "tokenization",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why increasing vocabulary size beyond a certain point stops helping compute efficiency, even though it keeps shortening sequences.",
    rubric: {
      elements: [
        {
          id: "tradeoff",
          description:
            "A larger vocabulary shortens sequences (less attention compute per document) but grows the embedding and output-projection matrices, and beyond a point the extra cost from bigger tables outweighs the savings from shorter sequences.",
          weight: 4,
          required: true,
        },
        {
          id: "depends-on-document-length",
          description:
            "Bonus: notes the extra table cost is fixed per token processed regardless of context length, while the sequence-length savings scale with document length, so the optimal vocabulary size shifts with typical document length.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.85,
    discrimination: 1.5,
    expectedSeconds: 190,
    prereqClosure: ["tokenization"],
    source: ML_15,
    status: "live",
  },
  {
    id: "tokenization--transfer-serving-memory-tax",
    conceptId: "tokenization",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "A retrieval system stores embeddings per token for a huge multilingual vocabulary of 250,000 tokens. Explain the specific cost this vocabulary choice adds to serving, beyond training.",
    rubric: {
      elements: [
        {
          id: "fixed-memory-tax",
          description:
            "The embedding table (and any untied output projection) must be held in memory for every deployed replica of the model, independent of how much traffic it serves — a fixed memory tax.",
          weight: 4,
          required: true,
        },
        {
          id: "per-token-softmax-cost",
          description:
            "Bonus: notes the softmax over the output vocabulary is also computed on every generated token, so a larger vocabulary means a larger per-token compute cost at generation time too.",
          weight: 3,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["tokenization", "embeddings"],
    source: ML_15,
    status: "live",
  },
  {
    id: "tokenization--transfer-new-script-embedding-gap",
    conceptId: "tokenization",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "A model trained with a 32,000-token English-centric vocabulary is fine-tuned to also serve a language with a very different script. Even after adding new tokens for that script, users report worse performance in the new language than in English at the same fine-tuning budget. Explain a tokenizer-level reason that would persist even with equal fine-tuning effort.",
    rubric: {
      elements: [
        {
          id: "exposure-gap",
          description:
            "The new script's tokens are recently added and were seen far less (or not at all) during pretraining, so their embeddings start with far less learned structure than the mature English tokens — equal fine-tuning steps do not equalise a gap that originates in pretraining exposure.",
          weight: 4,
          required: true,
        },
        {
          id: "segmentation-mismatch",
          description: "Bonus: notes the new tokens may also segment the new language more coarsely or finely than is natural for it, compounding the disadvantage.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["tokenization"],
    source: ML_15,
    status: "live",
  },

  // --- Contrastive Learning -------------------------------------------------------
  {
    id: "contrastive-learning--recall-temperature-role",
    conceptId: "contrastive-learning",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In InfoNCE, the temperature τ controls:",
    choices: [
      { id: "a", text: "how sharply the similarity scores are scaled before the softmax, controlling how much the loss penalises hard negatives", correct: true },
      {
        id: "b",
        text: "how many negatives are sampled",
        correct: false,
        misconception: {
          id: "temperature-confused-with-negative-count",
          description: "Negative count is set by batch size (or a memory bank); temperature only rescales the similarity scores already computed.",
          blameConceptId: "contrastive-learning",
        },
      },
      {
        id: "c",
        text: "the learning rate used to train the encoder",
        correct: false,
        misconception: {
          id: "temperature-confused-with-learning-rate",
          description: "The learning rate is a separate optimiser hyperparameter; temperature is internal to the loss's similarity scaling.",
          blameConceptId: "contrastive-learning",
        },
      },
      {
        id: "d",
        text: "the dimensionality of the embedding space",
        correct: false,
        misconception: {
          id: "temperature-confused-with-embedding-dim",
          description: "Embedding dimensionality is an architectural choice; temperature is a scalar in the loss applied after similarities are computed.",
          blameConceptId: "contrastive-learning",
        },
      },
    ],
    difficulty: -1.5,
    discrimination: 1.0,
    expectedSeconds: 40,
    prereqClosure: ["contrastive-learning"],
    source: ML_15,
    status: "live",
  },
  {
    id: "contrastive-learning--recall-labels-are-manufactured",
    conceptId: "contrastive-learning",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "State what makes contrastive learning a form of self-supervised learning: where do the labels come from?",
    rubric: {
      elements: [
        {
          id: "manufactured-labels",
          description:
            "The labels are manufactured from the data itself — which view came from the same original example (the positive) — with no human annotation required.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: -1.1,
    discrimination: 1.0,
    expectedSeconds: 45,
    prereqClosure: ["contrastive-learning", "self-supervised-learning"],
    source: ML_15,
    status: "live",
  },
  {
    id: "contrastive-learning--apply-chance-loss-256",
    conceptId: "contrastive-learning",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "An InfoNCE batch presents 256 candidates, one of which is the positive. What loss does an untrained model that scores every candidate alike achieve, in nats to four decimal places?",
    answerKey: 5.5452,
    tolerance: 0.0001,
    difficulty: 0.6,
    discrimination: 1.3,
    expectedSeconds: 100,
    prereqClosure: ["contrastive-learning", "cross-entropy-loss"],
    source: ML_15,
    status: "live",
  },
  {
    id: "contrastive-learning--apply-single-negative-temperature",
    conceptId: "contrastive-learning",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "An anchor has cosine similarity 0.6 with its positive and 0.2 with the single negative, at temperature τ = 0.1. What is the InfoNCE loss, in nats to four decimal places?",
    answerKey: 0.0181,
    tolerance: 0.0002,
    difficulty: 0.85,
    discrimination: 1.4,
    expectedSeconds: 130,
    prereqClosure: ["contrastive-learning", "cross-entropy-loss"],
    source: ML_15,
    status: "live",
  },
  {
    id: "contrastive-learning--explain-single-negative-is-logistic-regression",
    conceptId: "contrastive-learning",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "InfoNCE with a single negative reduces exactly to binary logistic regression on the pair. Show this and explain what changes once there are many negatives instead of one.",
    rubric: {
      elements: [
        {
          id: "reduces-to-logistic",
          description:
            "With one negative, the softmax over two logits is a sigmoid of their difference — exactly logistic regression's likelihood for the positive-vs-negative pair.",
          weight: 4,
          required: true,
        },
        {
          id: "many-negatives-is-harder",
          description:
            "With many negatives, the anchor must be distinguished from every one of them simultaneously, a k-way classification rather than a binary one, and a strictly harder, more informative task as k grows.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["contrastive-learning", "cross-entropy-loss"],
    source: ML_15,
    status: "live",
  },
  {
    id: "contrastive-learning--explain-more-negatives-raises-loss",
    conceptId: "contrastive-learning",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed"],
    stem: "Explain, in terms of the softmax normalisation, why increasing the number of negatives in a batch (holding the true similarity gap fixed) increases the InfoNCE loss for an untrained model, and what it implies about training difficulty at the start of training.",
    rubric: {
      elements: [
        {
          id: "normalisation-grows",
          description:
            "The normalising sum grows with the number of candidates, so the same fixed similarity gap yields a smaller share of the softmax mass for the positive and hence a larger loss, purely from having more candidates to be confused with.",
          weight: 4,
          required: true,
        },
        {
          id: "early-training-implication",
          description:
            "Early training is harder with larger batches — when the encoder barely distinguishes anything, the loss and gradient simply reflect there being more distractors, not that the true relationship is any harder.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["contrastive-learning", "cross-entropy-loss"],
    source: ML_15,
    status: "live",
  },
  {
    id: "contrastive-learning--transfer-time-stretch-augmentation",
    conceptId: "contrastive-learning",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A team pretrains a contrastive audio model using time-stretching (speeding up or slowing down the clip) as its augmentation. Predict one downstream task the resulting representation will do poorly on, and explain why using the invariance argument.",
    rubric: {
      elements: [
        {
          id: "predicts-tempo-task",
          description: "Predicts a task depending on tempo or timing (e.g. estimating a piece's tempo, or detecting speaking rate) will do poorly.",
          weight: 3,
          required: true,
        },
        {
          id: "invariance-argument",
          description:
            "Explains via the invariance argument: whatever the augmentation varies is exactly what the representation is trained to discard, and time-stretching varies tempo and duration, so tempo information is discarded from the representation.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["contrastive-learning", "self-supervised-learning"],
    source: ML_15,
    status: "live",
  },
  {
    id: "contrastive-learning--transfer-false-positive-duplicates",
    conceptId: "contrastive-learning",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "InfoNCE's softmax formulation assumes exactly one true positive per anchor among the candidates. Explain what goes wrong if, due to near-duplicate items in the data, an anchor actually has two nearly-identical 'correct' matches in the same batch, and how the loss punishes the model for correctly recognising this.",
    rubric: {
      elements: [
        {
          id: "punishes-correct-recognition",
          description:
            "The loss still forces all the softmax mass onto the single designated positive, so a model that (correctly) also assigns high similarity to the near-duplicate is penalised as if that were a wrong negative, even though semantically it is not wrong.",
          weight: 5,
          required: true,
        },
        {
          id: "fix",
          description:
            "Bonus: names a fix — deduplicating near-identical items before batching, or using a soft/multi-positive variant of the loss that does not force all mass onto one candidate.",
          weight: 3,
        },
      ],
    },
    difficulty: 2.35,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["contrastive-learning"],
    source: ML_15,
    status: "live",
  },

  // --- Parameter-Efficient Fine-Tuning --------------------------------------------
  {
    id: "parameter-efficient-fine-tuning--recall-rank-controls-capacity",
    conceptId: "parameter-efficient-fine-tuning",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In LoRA, the rank r primarily controls:",
    choices: [
      { id: "a", text: "the capacity of the adaptation — how expressive the learned update ΔW = BA can be", correct: true },
      {
        id: "b",
        text: "the learning rate used for the adapter",
        correct: false,
        misconception: {
          id: "rank-confused-with-learning-rate",
          description: "Rank sets the shapes of A and B; the learning rate is a separate optimiser setting.",
          blameConceptId: "rank",
        },
      },
      {
        id: "c",
        text: "the number of layers the adapter is applied to",
        correct: false,
        misconception: {
          id: "rank-confused-with-layer-coverage",
          description: "Which layers get an adapter is a separate architectural choice; rank sets the size of each individual adapter's update.",
          blameConceptId: "parameter-efficient-fine-tuning",
        },
      },
      {
        id: "d",
        text: "whether the base model is frozen",
        correct: false,
        misconception: {
          id: "rank-confused-with-freezing",
          description: "The base model is frozen unconditionally in LoRA; rank has nothing to do with that choice.",
          blameConceptId: "parameter-efficient-fine-tuning",
        },
      },
    ],
    difficulty: -1.6,
    discrimination: 1.0,
    expectedSeconds: 40,
    prereqClosure: ["parameter-efficient-fine-tuning", "rank"],
    source: ML_15,
    status: "live",
  },
  {
    id: "parameter-efficient-fine-tuning--recall-which-matrices",
    conceptId: "parameter-efficient-fine-tuning",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "State which weight matrices in a transformer LoRA is typically applied to, and why not all of them are usually adapted.",
    rubric: {
      elements: [
        {
          id: "typical-matrices",
          description: "Typically applied to the attention projection matrices (query and value, sometimes key and output).",
          weight: 3,
          required: true,
        },
        {
          id: "why-not-all",
          description:
            "Not all matrices are adapted because parameter budget is limited and the attention projections carry most of the useful adaptation signal for a given budget — spreading the same rank thinner across more matrices costs more parameters for a similar gain.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -1.1,
    discrimination: 1.0,
    expectedSeconds: 55,
    prereqClosure: ["parameter-efficient-fine-tuning", "rank"],
    source: ML_15,
    status: "live",
  },
  {
    id: "parameter-efficient-fine-tuning--apply-lora-params-rank8",
    conceptId: "parameter-efficient-fine-tuning",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A 2048 x 2048 weight matrix is adapted with LoRA at rank 8. How many trainable parameters does the adapter hold?",
    answerKey: 32768,
    tolerance: 0.000001,
    difficulty: 0.3,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["parameter-efficient-fine-tuning", "rank"],
    source: ML_15,
    status: "live",
  },
  {
    id: "parameter-efficient-fine-tuning--apply-ratio-rank8",
    conceptId: "parameter-efficient-fine-tuning",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "For that same 2048 x 2048 matrix, full fine-tuning would train 4,194,304 parameters. How many times fewer parameters does rank-8 LoRA train?",
    answerKey: 128,
    tolerance: 0.000001,
    difficulty: 0.75,
    discrimination: 1.3,
    expectedSeconds: 100,
    prereqClosure: ["parameter-efficient-fine-tuning", "rank"],
    source: ML_15,
    status: "live",
  },
  {
    id: "parameter-efficient-fine-tuning--explain-additive-vs-replace",
    conceptId: "parameter-efficient-fine-tuning",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why LoRA's adapter is applied as an additive update (W + BA) rather than, say, replacing W with a smaller matrix directly.",
    rubric: {
      elements: [
        {
          id: "preserves-pretrained-knowledge",
          description:
            "Replacing W outright would throw away the pretrained knowledge encoded in it; the additive form keeps W entirely intact and lets the adapter express only the change needed for the new task.",
          weight: 4,
          required: true,
        },
        {
          id: "enables-merging",
          description: "Bonus: this additive structure is also what makes merging (folding BA back into W) possible at no runtime cost.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.5,
    expectedSeconds: 190,
    prereqClosure: ["parameter-efficient-fine-tuning", "rank"],
    source: ML_15,
    status: "live",
  },
  {
    id: "parameter-efficient-fine-tuning--explain-rank-saturation",
    conceptId: "parameter-efficient-fine-tuning",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed"],
    stem: "A team trains LoRA adapters at rank 4 and rank 64 on the same task and dataset and finds nearly identical validation performance. What does this suggest about the task, and what would you predict for a much harder or more novel task?",
    rubric: {
      elements: [
        {
          id: "task-has-low-intrinsic-rank",
          description: "Suggests the true intrinsic rank of the needed update for this task is well below 4, so extra capacity beyond that is unused.",
          weight: 4,
          required: true,
        },
        {
          id: "harder-task-prediction",
          description:
            "For a much harder or more novel task, the needed update is plausibly higher-rank, so the gap between rank 4 and rank 64 should widen and low rank should start to underperform.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.85,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["parameter-efficient-fine-tuning", "rank"],
    source: ML_15,
    status: "live",
  },
  {
    id: "parameter-efficient-fine-tuning--transfer-lora-vs-soft-prompt",
    conceptId: "parameter-efficient-fine-tuning",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Contrast LoRA with prompt-based adaptation (e.g. prepending a learned soft prompt) as ways to specialise a frozen model. Where does each store its adaptation, and what does that imply about their relative inference-time cost?",
    rubric: {
      elements: [
        {
          id: "where-each-stores-adaptation",
          description:
            "LoRA stores adaptation in additional weight matrices merged (or applied) inside the model's linear layers; soft-prompt methods store adaptation as extra learned tokens prepended to the input sequence.",
          weight: 4,
          required: true,
        },
        {
          id: "cost-implication",
          description:
            "LoRA, once merged, adds no extra sequence length and no extra runtime cost; soft prompts occupy context-window budget and add compute proportional to the extra tokens on every forward pass, so LoRA is typically cheaper per request once deployed.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["parameter-efficient-fine-tuning", "transfer-learning"],
    source: ML_15,
    status: "live",
  },
  {
    id: "parameter-efficient-fine-tuning--transfer-averaging-adapters",
    conceptId: "parameter-efficient-fine-tuning",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "A company wants each of 50 customers to have a lightly customised model, but budget only allows storing the adapters, not 50 full model copies. It later wants to combine two customers' adapters into one model that handles both use cases. Explain whether simply averaging their LoRA A and B weights is a safe way to do this, and what could go wrong.",
    rubric: {
      elements: [
        {
          id: "bilinear-nonlinearity",
          description:
            "Because ΔW = BA is a nonlinear (bilinear) function of A and B, averaging A and B separately is not the same as averaging the resulting update BA — the average of two products is generally not the product of the averages, so the merged adapter's effective update is not simply 'half of each customer's behavior'.",
          weight: 5,
          required: true,
        },
        {
          id: "safer-alternative",
          description:
            "Safer alternatives: average the resulting ΔW matrices themselves (after computing each BA), or keep both adapters and route between them, rather than averaging A and B directly.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["parameter-efficient-fine-tuning", "rank"],
    source: ML_15,
    status: "live",
  },

  // --- Instruction Tuning and RLHF -------------------------------------------------
  {
    id: "instruction-tuning-and-rlhf--recall-sft-target",
    conceptId: "instruction-tuning-and-rlhf",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Supervised fine-tuning (SFT) on instructions trains the model to:",
    choices: [
      { id: "a", text: "imitate human-written demonstrations of following an instruction", correct: true },
      {
        id: "b",
        text: "maximise a learned reward model's score",
        correct: false,
        misconception: {
          id: "sft-confused-with-preference-stage",
          description: "Optimising against a reward model is the preference-optimisation stage, which happens after SFT, not what SFT itself trains on.",
          blameConceptId: "instruction-tuning-and-rlhf",
        },
      },
      {
        id: "c",
        text: "rank pairs of its own outputs",
        correct: false,
        misconception: {
          id: "sft-confused-with-comparison-labelling",
          description: "Ranking output pairs is how preference data is collected for the reward model, a separate stage from SFT's demonstration-based training.",
          blameConceptId: "instruction-tuning-and-rlhf",
        },
      },
      {
        id: "d",
        text: "predict the next token on raw, unlabelled web text",
        correct: false,
        misconception: {
          id: "sft-confused-with-pretraining",
          description: "That describes pretraining. SFT trains on curated instruction-response demonstrations, not raw web text.",
          blameConceptId: "autoregressive-models",
        },
      },
    ],
    difficulty: -1.6,
    discrimination: 1.0,
    expectedSeconds: 40,
    prereqClosure: ["instruction-tuning-and-rlhf"],
    source: ML_15,
    status: "live",
  },
  {
    id: "instruction-tuning-and-rlhf--recall-what-bt-model-learns",
    conceptId: "instruction-tuning-and-rlhf",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "In the Bradley-Terry model used to fit a reward model, what quantity does the model actually learn to predict, and what is it explicitly not trained to predict?",
    rubric: {
      elements: [
        {
          id: "predicts-a-comparison",
          description: "Learns to predict, via σ(r(A) − r(B)), the probability that a human prefers output A over output B — a comparison.",
          weight: 3,
          required: true,
        },
        {
          id: "not-an-absolute-score",
          description: "It is not trained to predict an absolute quality score on any fixed scale, since only differences of its outputs are ever compared against data.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -1.2,
    discrimination: 1.0,
    expectedSeconds: 55,
    prereqClosure: ["instruction-tuning-and-rlhf", "reinforcement-learning"],
    source: ML_15,
    status: "live",
  },
  {
    id: "instruction-tuning-and-rlhf--apply-bradley-terry-tie",
    conceptId: "instruction-tuning-and-rlhf",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Under the Bradley-Terry model P(A ≻ B) = σ(r(A) − r(B)), a reward model scores A and B equally, both at 1.2. What probability does it assign to A being preferred?",
    answerKey: 0.5,
    tolerance: 0.001,
    difficulty: -0.5,
    discrimination: 1.2,
    expectedSeconds: 45,
    prereqClosure: ["instruction-tuning-and-rlhf", "reinforcement-learning"],
    source: ML_15,
    status: "live",
  },
  {
    id: "instruction-tuning-and-rlhf--apply-bradley-terry-gap-2",
    conceptId: "instruction-tuning-and-rlhf",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A reward model scores A at 0.0 and B at −2.0. What probability does it assign to a rater preferring A? Give the answer to four decimal places.",
    answerKey: 0.8808,
    tolerance: 0.0005,
    difficulty: 0.6,
    discrimination: 1.4,
    expectedSeconds: 100,
    prereqClosure: ["instruction-tuning-and-rlhf", "reinforcement-learning"],
    source: ML_15,
    status: "live",
  },
  {
    id: "instruction-tuning-and-rlhf--explain-why-comparisons-not-regression",
    conceptId: "instruction-tuning-and-rlhf",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why the reward model is trained on pairwise comparisons rather than by regressing directly onto a human's numeric rating.",
    rubric: {
      elements: [
        {
          id: "raw-ratings-are-unreliable",
          description:
            "Human numeric ratings are noisy and inconsistent across raters and across time for the same rater, so regressing directly onto raw scores fits a lot of that instability.",
          weight: 4,
          required: true,
        },
        {
          id: "comparisons-are-easier-and-consistent",
          description:
            "Comparisons ask a strictly easier and more reliably reproducible judgement (which of two is better), and Bradley-Terry converts that into a consistent scale implicitly.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.5,
    expectedSeconds: 190,
    prereqClosure: ["instruction-tuning-and-rlhf", "reinforcement-learning"],
    source: ML_15,
    status: "live",
  },
  {
    id: "instruction-tuning-and-rlhf--explain-reward-hacking-defined",
    conceptId: "instruction-tuning-and-rlhf",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain the specific failure mode called 'reward hacking' in the RLHF pipeline, distinguishing it from the policy simply being wrong.",
    rubric: {
      elements: [
        {
          id: "hacking-defined",
          description:
            "Reward hacking is the policy finding outputs that score very highly under the reward model specifically, by exploiting some quirk or blind spot of that proxy, rather than outputs that are actually good by the standard the reward model was meant to approximate.",
          weight: 4,
          required: true,
        },
        {
          id: "differs-from-plain-error",
          description:
            "This differs from ordinary error: the policy is doing exactly what it was optimised to do (maximise the given reward), so the fault lies in the imperfect proxy, not in a failure to optimise.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["instruction-tuning-and-rlhf", "reinforcement-learning"],
    source: ML_15,
    status: "live",
  },
  {
    id: "instruction-tuning-and-rlhf--transfer-skip-sft",
    conceptId: "instruction-tuning-and-rlhf",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A company skips SFT entirely and goes straight from a pretrained base model into RLHF, with a reward model trained on human comparisons of the base model's raw completions. Predict what goes wrong, connecting it to what SFT is specifically responsible for.",
    rubric: {
      elements: [
        {
          id: "base-model-cannot-follow-instructions",
          description:
            "The base model does not reliably follow instructions or produce assistant-formatted responses, so most of its raw completions are off-topic continuations rather than answers — a reward model built from comparing these mostly captures which continuation happens to be less bad, not which is a genuinely good answer.",
          weight: 5,
          required: true,
        },
        {
          id: "sfts-job-was-skipped",
          description: "SFT's specific job — installing the format of answering an instruction — was never done, so RLHF is being asked to fix a much larger gap than it is designed for.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["instruction-tuning-and-rlhf", "autoregressive-models"],
    source: ML_15,
    status: "live",
  },
  {
    id: "instruction-tuning-and-rlhf--transfer-dpo-vs-ppo-sampling",
    conceptId: "instruction-tuning-and-rlhf",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "DPO and PPO-based RLHF both ultimately fit a policy to human preference data, but only PPO-based RLHF requires sampling from the policy during training. Explain why DPO can skip this, and name one scenario where PPO's on-policy sampling would still be preferred despite its extra cost.",
    rubric: {
      elements: [
        {
          id: "dpo-substitutes-closed-form",
          description:
            "DPO substitutes the closed-form relationship between the optimal KL-constrained policy and the reward directly into the preference loss, so it only needs the fixed preference dataset, never a fresh sample from the current policy, to compute a gradient.",
          weight: 4,
          required: true,
        },
        {
          id: "when-ppo-sampling-still-wins",
          description:
            "PPO's on-policy sampling is preferred when the preference signal needs to reflect the model's current behaviour rather than a static offline dataset — e.g. once the model has drifted enough during training that the original comparisons no longer describe its actual outputs, or when a live reward model needs to score fresh generations.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["instruction-tuning-and-rlhf", "kl-divergence", "reinforcement-learning"],
    source: ML_15,
    status: "live",
  },

  // --- Knowledge Distillation -------------------------------------------------------
  {
    id: "knowledge-distillation--recall-student-defined",
    conceptId: "knowledge-distillation",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The 'student' model in knowledge distillation is:",
    choices: [
      { id: "a", text: "typically smaller than the teacher, and trained to match the teacher's output distribution as well as (or instead of) the hard labels", correct: true },
      {
        id: "b",
        text: "always the same architecture and size as the teacher",
        correct: false,
        misconception: {
          id: "student-assumed-always-same-size",
          description: "Self-distillation (same size) is a notable exception used to isolate the soft-target effect, not the typical or defining case.",
          blameConceptId: "knowledge-distillation",
        },
      },
      {
        id: "c",
        text: "trained only on hard labels, with no teacher information used",
        correct: false,
        misconception: {
          id: "student-thought-to-ignore-teacher",
          description: "Using no teacher information at all would just be ordinary supervised training, not distillation.",
          blameConceptId: "knowledge-distillation",
        },
      },
      {
        id: "d",
        text: "used to generate the teacher's training data",
        correct: false,
        misconception: {
          id: "student-teacher-roles-reversed",
          description: "This reverses the roles: the teacher's outputs (or generations) supply signal to the student, not the other way around.",
          blameConceptId: "knowledge-distillation",
        },
      },
    ],
    difficulty: -1.7,
    discrimination: 1.0,
    expectedSeconds: 40,
    prereqClosure: ["knowledge-distillation"],
    source: ML_15,
    status: "live",
  },
  {
    id: "knowledge-distillation--recall-two-loss-terms",
    conceptId: "knowledge-distillation",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "State the two terms typically combined in a distillation loss, and what each one is measured against.",
    rubric: {
      elements: [
        {
          id: "two-terms",
          description: "A distillation term against the teacher's (softened) output distribution, and a standard supervised term against the true hard labels.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: -1.3,
    discrimination: 1.0,
    expectedSeconds: 55,
    prereqClosure: ["knowledge-distillation", "cross-entropy-loss"],
    source: ML_15,
    status: "live",
  },
  {
    id: "knowledge-distillation--apply-softmax-t1",
    conceptId: "knowledge-distillation",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A teacher's logits for two classes are (4, 1). What probability does the first class receive at temperature T = 1 (ordinary softmax)? Give the answer to four decimal places.",
    answerKey: 0.9526,
    tolerance: 0.0005,
    difficulty: 0.5,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["knowledge-distillation", "cross-entropy-loss"],
    source: ML_15,
    status: "live",
  },
  {
    id: "knowledge-distillation--apply-softmax-t4",
    conceptId: "knowledge-distillation",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "For the same logits (4, 1), what probability does the first class receive at temperature T = 4 (dividing logits by 4 before the softmax)? Give the answer to four decimal places.",
    answerKey: 0.6792,
    tolerance: 0.0005,
    difficulty: 1.1,
    discrimination: 1.4,
    expectedSeconds: 130,
    prereqClosure: ["knowledge-distillation", "cross-entropy-loss"],
    source: ML_15,
    status: "live",
  },
  {
    id: "knowledge-distillation--explain-t-squared-scaling",
    conceptId: "knowledge-distillation",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why distillation's soft-target loss is usually scaled by T² when the temperature T is used, relating it to the size of the gradients the softened targets produce.",
    rubric: {
      elements: [
        {
          id: "gradient-scale-argument",
          description:
            "Dividing logits by T before the softmax shrinks the gradients of the cross-entropy term by roughly 1/T², so multiplying the distillation loss by T² restores a gradient magnitude comparable to the hard-label term, keeping the two loss components on a similar scale as T is varied.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["knowledge-distillation", "cross-entropy-loss"],
    source: ML_15,
    status: "live",
  },
  {
    id: "knowledge-distillation--explain-label-smoothing-comparison",
    conceptId: "knowledge-distillation",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed"],
    stem: "Distillation is sometimes described as a form of label smoothing. Explain the resemblance, and the one important way distillation's smoothing differs from uniform label smoothing.",
    rubric: {
      elements: [
        {
          id: "resemblance",
          description:
            "Both replace a one-hot target with a softer distribution that puts some mass on the non-target classes, which regularises the student and improves calibration similarly to label smoothing.",
          weight: 4,
          required: true,
        },
        {
          id: "key-difference",
          description:
            "Uniform label smoothing spreads mass equally over all wrong classes regardless of the example, while the teacher's soft target spreads mass according to genuine, example-specific relative plausibility — informative smoothing rather than uniform smoothing.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.85,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["knowledge-distillation", "cross-entropy-loss"],
    source: ML_15,
    status: "live",
  },
  {
    id: "knowledge-distillation--transfer-ensemble-calibration-transfer",
    conceptId: "knowledge-distillation",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "A team distils an ensemble of five independently trained classifiers into a single student and finds the student's calibration (how well its confidence matches its accuracy) is notably better than any individual ensemble member's. Explain why, connecting it to what the teacher's soft targets actually encode.",
    rubric: {
      elements: [
        {
          id: "ensemble-averaging-improves-calibration",
          description:
            "Ensemble averaging itself tends to produce better-calibrated probabilities than any single member (overconfident errors by some members are diluted by others), and the student is trained to match exactly that averaged, better-calibrated distribution rather than any one member's overconfident one.",
          weight: 5,
          required: true,
        },
        {
          id: "inherited-without-running-ensemble",
          description: "So the student inherits the ensemble's calibration benefit through the soft targets, without needing to run the ensemble itself at inference time.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["knowledge-distillation", "ensemble-methods"],
    source: ML_15,
    status: "live",
  },
  {
    id: "knowledge-distillation--transfer-quantize-then-distill-order",
    conceptId: "knowledge-distillation",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "Quantisation and distillation can both reduce a model's inference footprint. A team applies quantisation first and then tries to distil from the now-quantised model. Explain why this ordering is a poor choice compared to distilling first and quantising the resulting student.",
    rubric: {
      elements: [
        {
          id: "quantised-teacher-is-degraded",
          description:
            "A quantised model has itself lost some fidelity relative to the original, so its output distribution is a noisier, slightly degraded version of the true teacher signal — distilling from it teaches the student to imitate quantisation artifacts on top of everything else.",
          weight: 4,
          required: true,
        },
        {
          id: "distill-first-is-cleaner",
          description:
            "Distilling from the full-precision teacher first gives the student the cleanest possible signal, and quantising the resulting (already smaller) student afterward degrades a model that has already captured the teacher's knowledge, rather than degrading the signal being taught.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["knowledge-distillation", "quantization"],
    source: ML_15,
    status: "live",
  },

  // --- Quantization -----------------------------------------------------------------
  {
    id: "quantization--recall-zero-point-purpose",
    conceptId: "quantization",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In affine quantisation, the 'zero point' z exists to:",
    choices: [
      { id: "a", text: "let the quantised range represent values that are not symmetric around zero (e.g. all-positive activations)", correct: true },
      {
        id: "b",
        text: "correct for rounding error after dequantisation",
        correct: false,
        misconception: {
          id: "zero-point-confused-with-rounding-correction",
          description: "Rounding error is inherent to representing continuous values with discrete levels; the zero point instead sets where zero falls in that discrete range.",
          blameConceptId: "quantization",
        },
      },
      {
        id: "c",
        text: "set the number of bits used",
        correct: false,
        misconception: {
          id: "zero-point-confused-with-bit-width",
          description: "Bit width is a separate choice (e.g. int8 vs int4); the zero point is one of the two numbers (with the scale) defining the affine map at a fixed bit width.",
          blameConceptId: "quantization",
        },
      },
      {
        id: "d",
        text: "scale the gradient during quantisation-aware training",
        correct: false,
        misconception: {
          id: "zero-point-confused-with-qat-gradient",
          description: "Gradient handling in QAT is managed by a straight-through estimator, unrelated to the zero point's role in the affine map.",
          blameConceptId: "quantization",
        },
      },
    ],
    difficulty: -1.4,
    discrimination: 1.0,
    expectedSeconds: 40,
    prereqClosure: ["quantization"],
    source: ML_15,
    status: "live",
  },
  {
    id: "quantization--recall-per-tensor-vs-per-channel",
    conceptId: "quantization",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Distinguish 'per-tensor' from 'per-channel' (or 'per-group') quantisation, and state which is more robust to outliers and why.",
    rubric: {
      elements: [
        {
          id: "definitions",
          description: "Per-tensor uses a single scale (and zero point) for an entire tensor; per-channel/per-group uses a separate scale for each channel or small group of values.",
          weight: 3,
          required: true,
        },
        {
          id: "which-is-robust",
          description:
            "Per-channel/per-group is more robust to outliers because one extreme value only stretches the scale of its own channel or group, rather than degrading precision for the entire tensor.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -1.0,
    discrimination: 1.0,
    expectedSeconds: 55,
    prereqClosure: ["quantization"],
    source: ML_15,
    status: "live",
  },
  {
    id: "quantization--apply-step-size",
    conceptId: "quantization",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A weight group is quantised to unsigned int8 (256 levels) over the range [0, 2.0]. What is the quantisation step size s? Give the answer to seven decimal places.",
    answerKey: 0.0078431,
    tolerance: 0.0000005,
    difficulty: 0.2,
    discrimination: 1.2,
    expectedSeconds: 70,
    prereqClosure: ["quantization"],
    source: ML_15,
    status: "live",
  },
  {
    id: "quantization--apply-dequantize-a-value",
    conceptId: "quantization",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Using the scale from the previous setup (s = 2.0/255), what value does a weight of 1.3 dequantise to? Round to the nearest representable level first, and give the answer to five decimal places.",
    answerKey: 1.30196,
    tolerance: 0.00002,
    difficulty: 1.0,
    discrimination: 1.4,
    expectedSeconds: 130,
    prereqClosure: ["quantization"],
    source: ML_15,
    status: "live",
  },
  {
    id: "quantization--explain-weights-vs-activations-difficulty",
    conceptId: "quantization",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why quantising activations is generally harder than quantising weights, in terms of what determines each one's numeric range.",
    rubric: {
      elements: [
        {
          id: "weights-fixed-activations-runtime",
          description:
            "Weight ranges are fixed once training finishes and can be measured exactly ahead of time; activation ranges depend on the actual input at runtime and can vary a lot between inputs (and spike on outlier inputs), so a scale fixed from a calibration set may not fit every real input well.",
          weight: 4,
          required: true,
        },
        {
          id: "consequence",
          description: "Bonus: notes this is why activation quantisation more often needs dynamic (per-batch) scales or careful calibration on representative data.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["quantization"],
    source: ML_15,
    status: "live",
  },
  {
    id: "quantization--explain-sequential-compensation",
    conceptId: "quantization",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed"],
    stem: "GPTQ and similar post-training quantisation methods quantise weights one group at a time and adjust the remaining unquantised weights to compensate for the error just introduced. Explain why this sequential compensation gives a better result than quantising every weight independently and simultaneously.",
    rubric: {
      elements: [
        {
          id: "weights-interact",
          description:
            "Quantising independently ignores that weights interact through the layer's linear combination — rounding one weight changes what the ideal (compensating) values of the others would be, so treating them independently accumulates avoidable error.",
          weight: 4,
          required: true,
        },
        {
          id: "compensation-mechanism",
          description:
            "By updating the still-unquantised weights after each group is rounded, the method lets the remaining weights absorb some of the error just introduced, keeping the overall layer output closer to the original than independent rounding would.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.95,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["quantization"],
    source: ML_15,
    status: "live",
  },
  {
    id: "quantization--transfer-embedding-matrix-outlier",
    conceptId: "quantization",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "A retrieval system stores millions of embedding vectors and quantises them to int8 to save memory, using one shared scale across the whole embedding matrix. Diagnose the likely failure and connect it to the general outlier problem in quantisation.",
    rubric: {
      elements: [
        {
          id: "shared-scale-stretched-by-outliers",
          description:
            "A single scale across the whole matrix must accommodate the largest-magnitude value anywhere in it, so if a small number of dimensions or vectors have unusually large magnitudes, the shared scale is stretched to fit them and every other, typical-magnitude value is quantised far too coarsely.",
          weight: 5,
          required: true,
        },
        {
          id: "same-mechanism-same-fix",
          description:
            "This is the same outlier mechanism that affects large-model activation quantisation, and the fix is the same in kind: finer granularity (per-vector or per-dimension scales) so an outlier only coarsens its own slice.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["quantization"],
    source: ML_15,
    status: "live",
  },
  {
    id: "quantization--transfer-moe-active-parameters",
    conceptId: "quantization",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Compare 4-bit weight-only quantisation applied to a dense model versus applied to a mixture-of-experts model with the same total parameter count, in terms of the memory-bandwidth benefit at inference for a single request.",
    rubric: {
      elements: [
        {
          id: "dense-full-benefit",
          description: "In a dense model every parameter is used on every token, so quartering the bytes per weight quarters the bytes read per token, giving the full expected speedup.",
          weight: 4,
          required: true,
        },
        {
          id: "moe-benefit-scales-with-active-params",
          description:
            "In a mixture-of-experts model only a small subset of experts (and hence weights) is active per token, so the memory-bandwidth benefit scales with the active weights actually touched, not with the much larger total quantised footprint.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 2.35,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["quantization"],
    source: ML_15,
    status: "live",
  },
];
