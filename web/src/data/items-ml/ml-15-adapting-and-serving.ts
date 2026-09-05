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
];
