import type { WikiArticle } from "../types";

/**
 * Machine Learning cluster 15 — scaling, adapting and serving.
 *
 * The last stretch of the deep-learning branch, and the part a working
 * practitioner spends most time on. How large should a model be for a compute
 * budget; what is the input chopped into before it is embedded; how is a
 * pretrained model bent to a new task without retraining it; how is a
 * preference turned into an objective; and how is the result made small enough
 * to serve. Every article here depends on the adaptation concepts in cluster
 * 12, which is why the section reads after them.
 */

const scalingLaws: WikiArticle = {
  conceptId: "scaling-laws",
  summary:
    "Test loss falls as a power law in model size, dataset size and compute, over many orders of " +
    "magnitude and with remarkably little scatter. That regularity turns 'how big should this model " +
    "be' from a matter of taste into an optimisation problem with a numerical answer — and the " +
    "answer changed the field's practice once it was worked out properly.",

  sections: [
    {
      heading: "The shape of the curve",
      blocks: [
        {
          kind: "formula",
          latex: "L(N) ≈ L_∞ + (N_c / N)^α",
          caption: "Loss against parameter count: an irreducible floor plus a power-law term, with α typically small",
        },
        {
          kind: "prose",
          text:
            "Three things follow from the form. The floor L_∞ is the entropy of the data itself, " +
            "which no model beats. The exponent is small — around 0.05 to 0.35 depending on which " +
            "axis is varied and what is held fixed — so the returns are real but slow, and each " +
            "further decrement of loss costs a multiple of the previous one. And a power law is " +
            "straight on a log-log plot, which is what makes these curves so useful for " +
            "extrapolation: fit two small runs and read off the third.",
        },
        {
          kind: "example",
          title: "What a small exponent means for a budget",
          problem: "Suppose the reducible part of the loss scales as N^−0.34. How much larger must the model be to halve it?",
          steps: [
            "Require (N'/N)^−0.34 = ½, so N'/N = 2^(1/0.34).",
            "1/0.34 ≈ 2.94.",
            "2^2.94 ≈ 7.7.",
          ],
          answer:
            "About 7.7 times the parameters — for one halving of the part of the loss you can actually move. The next halving costs another factor of 7.7. Scaling laws are the reason progress at the frontier is expensive and predictable at the same time.",
        },
      ],
    },

    {
      heading: "The budget question",
      blocks: [
        {
          kind: "formula",
          latex: "C ≈ 6 · N · D",
          caption: "Training FLOPs from parameters N and training tokens D — the identity every budget argument starts from",
        },
        {
          kind: "prose",
          text:
            "Fix C and the choice is a trade: a bigger model on less data, or a smaller model on " +
            "more. The first published laws were read as favouring size heavily, and a generation of " +
            "models was trained accordingly. The Chinchilla result re-ran the experiment with the " +
            "learning-rate schedule matched to each run's length — the earlier work had not — and " +
            "found that N and D should grow together, roughly 20 tokens per parameter. The models " +
            "built under the old reading were substantially undertrained for their size.",
        },
        {
          kind: "example",
          title: "Sizing a run",
          problem: "A 7-billion-parameter model is trained on 140 billion tokens, the compute-optimal ratio of roughly 20 tokens per parameter. What is the training compute?",
          steps: [
            "C ≈ 6ND with N = 7 x 10⁹ and D = 1.4 x 10¹¹.",
            "6 x 7 x 1.4 = 58.8.",
            "10⁹ x 10¹¹ = 10²⁰.",
          ],
          answer:
            "About 5.88 x 10²¹ FLOPs. In practice models of this size are trained well past the compute-optimal token count — training is paid once and inference is paid forever, so a smaller model trained longer is often the cheaper product even though it is not the cheaper experiment.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Compute-optimal is not deployment-optimal",
          text:
            "Chinchilla answers 'what is the best loss for a fixed training budget'. If a model will " +
            "serve billions of requests, the right question includes inference cost, and its answer " +
            "is a smaller model trained on far more data than the compute-optimal point. Both " +
            "answers are correct; they are answers to different questions, and the confusion between " +
            "them is common.",
        },
      ],
    },

    {
      heading: "What the laws do not tell you",
      blocks: [
        {
          kind: "list",
          items: [
            "They are fits, not derivations. They describe a regime that has been measured; nothing guarantees the exponent holds three orders of magnitude beyond the data used to fit it.",
            "They predict loss, not capability. A smooth fall in cross-entropy can sit under a benchmark score that moves in steps, because a discrete metric thresholds a continuous quantity — much of the 'emergence' literature is an argument about exactly this.",
            "They assume the data is there. Extrapolating the data axis eventually meets the finite supply of high-quality text, which is a constraint no curve accounts for.",
            "They hold within an architecture family and a training recipe. A law fit to dense transformers does not transfer unchanged to a sparse mixture, which has its own curve with its own constants.",
            "They say nothing about what a model should be used for, and a good fit is not a safety argument.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Kaplan et al., Scaling Laws for Neural Language Models", locator: "2020" },
    { source: "Hoffmann et al., Training Compute-Optimal Large Language Models", locator: "NeurIPS 2022 (Chinchilla)" },
    { source: "Schaeffer, Miranda & Koyejo, Are Emergent Abilities of Large Language Models a Mirage?", locator: "NeurIPS 2023" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-15-adapting-and-serving.md" },
  ],
};

const tokenization: WikiArticle = {
  conceptId: "tokenization",
  summary:
    "Before any weight is trained, the input has to be cut into a finite vocabulary of symbols. " +
    "Characters give a tiny vocabulary and very long sequences; words give short sequences and an " +
    "unbounded vocabulary with no way to spell anything new. Subword tokenisation takes the middle: " +
    "learn a vocabulary of frequent fragments, so common words are one token and anything else is " +
    "spelled out of pieces.",

  sections: [
    {
      heading: "The trade being made",
      blocks: [
        {
          kind: "table",
          headers: ["Unit", "Vocabulary", "Sequence length", "Unknown inputs", "Verdict"],
          rows: [
            ["Characters or bytes", "Tiny (≈ 256)", "Very long", "Impossible by construction", "Attention cost is quadratic in length, so this is expensive"],
            ["Words", "Unbounded, and heavy-tailed", "Short", "Fall back to an UNK token — information destroyed", "Cannot spell a name it never saw"],
            ["Subwords (BPE and relatives)", "Chosen, typically 32k-256k", "Moderate", "Composed from smaller pieces", "The standard, and the reason is this row"],
          ],
        },
        {
          kind: "prose",
          text:
            "Byte-pair encoding builds the vocabulary greedily. Start with every byte as its own " +
            "token; count adjacent pairs across the corpus; merge the most frequent pair into a new " +
            "token; repeat until the vocabulary is the size you asked for. The learned artefact is " +
            "an ordered list of merges, and applying it to new text is just replaying that list. " +
            "Frequent words end up as single tokens because their internal pairs were merged early; " +
            "rare words stay decomposed.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The embedding table is where the vocabulary size is paid",
          text:
            "A vocabulary of 50,000 with a model dimension of 768 is 38.4 million parameters in the " +
            "embedding table alone, and as much again in the output projection unless the two are " +
            "tied. Enlarging the vocabulary shortens sequences — which helps quadratic attention — " +
            "and grows this table linearly. The choice is a real optimisation, not a default to " +
            "accept without thought.",
        },
      ],
    },

    {
      heading: "Consequences you can see in a model's behaviour",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Arithmetic is hard partly because of this",
              description:
                "If '1234' is one token and '1235' is two, the model cannot see the digits it is being asked to add. Tokenisers that split numbers into fixed digit groups measurably improve arithmetic, which is a strong hint about where the difficulty was.",
            },
            {
              term: "Languages are not charged equally",
              description:
                "A tokeniser fit mostly on English spends few tokens per English word and many per word of a language written in another script. The same paragraph can cost several times more tokens — and therefore more money and more context — in one language than another.",
            },
            {
              term: "Perplexity is not comparable across tokenisers",
              description:
                "Perplexity is per token, so a model with a coarser vocabulary predicts fewer, harder tokens. Comparing two models' perplexities without a common tokeniser compares the tokenisers as much as the models.",
            },
            {
              term: "Trailing whitespace and glitch tokens",
              description:
                "A prompt ending in a space can tokenise differently from one that does not, changing the continuation. And tokens that appeared in the tokeniser's corpus but almost never in training data end up with near-random embeddings, producing the strange outputs sometimes called glitch tokens.",
            },
          ],
        },
        {
          kind: "example",
          title: "Counting the embedding parameters",
          problem: "A model has a vocabulary of 50,000 tokens and a model dimension of 768. How many parameters are in its embedding table?",
          steps: [
            "One vector of length 768 per vocabulary entry.",
            "50,000 x 768.",
          ],
          answer:
            "38,400,000 — 38.4M parameters that do no computation at all, only lookup. In a small model this is a substantial share of the total, which is why small models often tie the input embedding and the output projection to the same matrix and halve it.",
        },
      ],
    },

    {
      heading: "The variants, briefly",
      blocks: [
        {
          kind: "list",
          items: [
            "BPE — merge the most frequent adjacent pair, repeatedly. Used by GPT-family models, operating on bytes so that no input is unrepresentable.",
            "WordPiece — the same greedy shape, but merges the pair that most increases the corpus likelihood rather than the most frequent one. BERT's tokeniser.",
            "Unigram (SentencePiece) — start from a large candidate vocabulary and prune it to maximise likelihood, keeping a probability per token. Supports sampling different segmentations of the same string, which is a regulariser.",
            "Byte-level fallbacks matter: a tokeniser that cannot represent an arbitrary byte sequence will eventually meet input it cannot encode, and in production that is an outage rather than a curiosity.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The tokeniser is frozen before pretraining and cannot be changed after",
          text:
            "Every embedding is indexed by token id, so changing the vocabulary invalidates the " +
            "embedding table and everything downstream of it. Extending a vocabulary for a new " +
            "domain means adding rows and training them from scratch inside an otherwise trained " +
            "model. It is the earliest irreversible decision in the pipeline, and it is usually made " +
            "the fastest.",
        },
      ],
    },
  ],

  references: [
    { source: "Sennrich, Haddow & Birch, Neural Machine Translation of Rare Words with Subword Units", locator: "ACL 2016 (BPE)" },
    { source: "Kudo, Subword Regularization", locator: "ACL 2018 (unigram LM)" },
    { source: "Kudo & Richardson, SentencePiece", locator: "EMNLP 2018" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-15-adapting-and-serving.md" },
  ],
};

const contrastiveLearning: WikiArticle = {
  conceptId: "contrastive-learning",
  summary:
    "Contrastive learning builds a representation by answering one question over and over: which of " +
    "these candidates is the match? Two views of the same thing should land close together, and " +
    "everything else should be pushed apart. The objective is literally a cross-entropy over " +
    "similarity scores, which is why it trains as stably as a classifier while needing no labels.",

  sections: [
    {
      heading: "InfoNCE is a classification loss in disguise",
      blocks: [
        {
          kind: "formula",
          latex: "L = −log[ exp(sim(z, z⁺)/τ) / Σⱼ exp(sim(z, zⱼ)/τ) ]",
          caption: "Cross-entropy over a batch, where the 'classes' are the candidates and the correct one is the positive",
        },
        {
          kind: "prose",
          text:
            "Read the denominator as the softmax over candidates and the loss is the ordinary " +
            "negative log-likelihood of picking the right one. Nothing about the machinery is new; " +
            "what is new is where the label came from. The positive pair is manufactured — two " +
            "augmentations of one image, an image and its caption, adjacent segments of one audio " +
            "clip — so the supervision is a property of the data collection rather than of an " +
            "annotator.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Temperature τ",
              description:
                "Divides the similarities before the softmax. Small τ sharpens the distribution and concentrates the gradient on the hardest negatives; large τ treats all negatives alike. It is the most consequential hyperparameter in the method and is usually around 0.05 to 0.1.",
            },
            {
              term: "Normalised embeddings",
              description:
                "Similarities are cosine, so vectors are projected onto the unit sphere first. Without that the model can lower the loss by inflating magnitudes rather than by improving the geometry.",
            },
            {
              term: "Projection head",
              description:
                "The loss is applied to the output of a small MLP on top of the encoder, and the head is discarded afterwards. The representation used downstream is the layer beneath it, which is empirically much better — the head absorbs the information the objective forces the model to throw away.",
            },
          ],
        },
        {
          kind: "example",
          title: "What the temperature does to one pair",
          problem: "A positive pair has cosine similarity 0.9 and the single negative has 0.6. What is the loss at τ = 0.1?",
          steps: [
            "Scaled scores: 0.9/0.1 = 9 and 0.6/0.1 = 6.",
            "The positive's probability is 1/(1 + e^(6−9)) = 1/(1 + e⁻³).",
            "e⁻³ ≈ 0.0498, so the probability is ≈ 0.9526 and the loss is −ln(0.9526).",
          ],
          answer:
            "About 0.0486 — nearly solved. At τ = 1 the same pair gives 1/(1 + e^(−0.3)) ≈ 0.574 and a loss of about 0.555, so the model would still be pushed hard on a pair it already ranks correctly. The temperature decides what counts as 'close enough'.",
        },
      ],
    },

    {
      heading: "Where the negatives come from",
      blocks: [
        {
          kind: "list",
          items: [
            "In-batch negatives — every other example in the batch. Free, and the reason contrastive methods want large batches: with 256 in-batch candidates, chance performance is a loss of ln(256) ≈ 5.545, and the task gets harder and more informative as the batch grows.",
            "Memory bank — keep a queue of embeddings from recent batches, so the candidate pool is decoupled from the batch size. MoCo adds a slowly updated momentum encoder so the stored embeddings stay consistent as the model moves.",
            "Hard negative mining — deliberately sample candidates that are nearly correct. Effective, and dangerous: in an unlabelled corpus the hardest negative is often a false negative, another example of the same unlabelled class.",
            "No negatives at all — BYOL and SimSiam match two views with a predictor and a stop-gradient, and do not collapse despite having no repulsive term. That they work at all is a standing argument that the contrastive framing is sufficient rather than necessary.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Your augmentations decide what the representation cannot see",
          text:
            "Whatever the positive pair varies is what the model learns to ignore. Augment with " +
            "aggressive colour jitter and the representation becomes colour-blind — excellent for " +
            "object recognition, useless for classifying ripe against unripe fruit. The augmentation " +
            "policy is not a training detail here; it is the specification of the invariances you " +
            "are asking for, and it is the first thing to change when the features are wrong.",
        },
      ],
    },

    {
      heading: "Why it mattered",
      blocks: [
        {
          kind: "prose",
          text:
            "Contrastive pretraining is what made self-supervised vision competitive with supervised " +
            "pretraining, and then made cross-modal models possible. CLIP applies exactly this loss " +
            "to (image, caption) pairs scraped from the web, with the other captions in the batch as " +
            "negatives; the result is an image encoder and a text encoder in a shared space, which " +
            "is enough to classify images against arbitrary label names the model was never trained " +
            "on. The same objective underlies modern text embedding models and the retrieval half of " +
            "retrieval-augmented systems.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "It is a discriminative objective producing a general-purpose representation",
          text:
            "An autoencoder must reconstruct every pixel, so it spends capacity on detail that " +
            "carries no semantics. A contrastive model only has to tell matches from non-matches, " +
            "which is a far weaker requirement and, as it turns out, a much better proxy for what a " +
            "downstream classifier needs. That is the core empirical finding of the area.",
        },
      ],
    },
  ],

  references: [
    { source: "Chen et al., A Simple Framework for Contrastive Learning of Visual Representations", locator: "ICML 2020 (SimCLR)" },
    { source: "He et al., Momentum Contrast for Unsupervised Visual Representation Learning", locator: "CVPR 2020 (MoCo)" },
    { source: "Radford et al., Learning Transferable Visual Models From Natural Language Supervision", locator: "ICML 2021 (CLIP)" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-15-adapting-and-serving.md" },
  ],
};

const parameterEfficientFineTuning: WikiArticle = {
  conceptId: "parameter-efficient-fine-tuning",
  summary:
    "Full fine-tuning updates every weight and produces a complete copy of the model per task. " +
    "Parameter-efficient methods freeze the pretrained weights and train a small number of new " +
    "ones instead. LoRA is the dominant form: represent the update to a weight matrix as a product " +
    "of two thin matrices, train those, and add the product back at inference.",

  sections: [
    {
      heading: "The arithmetic",
      blocks: [
        {
          kind: "formula",
          latex: "W' = W + ΔW,   ΔW = BA  with  B ∈ ℝ^(d×r), A ∈ ℝ^(r×k), r ≪ min(d, k)",
          caption: "The update is constrained to rank r, so it is described by 2dr numbers instead of dk",
        },
        {
          kind: "example",
          title: "What the constraint saves",
          problem: "For a 4096 x 4096 weight matrix, compare full fine-tuning against LoRA at rank 8.",
          steps: [
            "Full: 4096 x 4096 = 16,777,216 trainable parameters.",
            "LoRA: A is 8 x 4096 and B is 4096 x 8, so 2 x 4096 x 8 = 65,536.",
            "Ratio: 16,777,216 / 65,536 = 256.",
          ],
          answer:
            "256 times fewer trainable parameters — about 0.39% of the matrix. The memory saving during training is larger still, because Adam's two moments are kept only for the trainable parameters: it is the optimiser state, not the weights, that usually decides whether a fine-tune fits on the hardware you have.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Initialise B at zero so the adapted model starts as the original",
          text:
            "A is drawn at random and B is set to zero, so BA = 0 at the start and the model is " +
            "exactly the pretrained one. Fine-tuning then departs from it smoothly rather than " +
            "beginning with a random perturbation applied to every layer — the same reasoning as " +
            "zero-initialising the last layer of a residual block.",
        },
      ],
    },

    {
      heading: "Why a low-rank update is enough",
      blocks: [
        {
          kind: "prose",
          text:
            "The empirical claim is that adapting a pretrained model to a downstream task requires a " +
            "change with low intrinsic rank: the model already contains the capabilities, and " +
            "fine-tuning is largely a matter of selecting and reweighting them rather than building " +
            "anything new. That is consistent with what full fine-tuning does — its weight change, " +
            "measured after the fact, is close to low rank — and it is why rank 8 or 16 usually " +
            "matches full fine-tuning on ordinary tasks while rank 1 does not.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Which matrices to target",
              description:
                "Originally the attention projections; applying it to the feed-forward matrices as well generally works better at equal parameter budget. Targeting everything at a lower rank tends to beat targeting a little at a high rank.",
            },
            {
              term: "The α/r scaling",
              description:
                "The update is applied as (α/r)·BA, so changing the rank does not implicitly change the effective learning rate. This is why LoRA hyperparameters transfer between ranks, and why α and r are always reported together.",
            },
            {
              term: "Adapters",
              description:
                "Small bottleneck MLPs inserted between layers. The predecessor to LoRA, and its drawback is structural: they add depth, so they add latency that cannot be removed.",
            },
            {
              term: "Prefix and prompt tuning",
              description:
                "Train a set of virtual tokens prepended to the input and leave the network untouched entirely. The smallest footprint of all, at some cost in achievable quality, and it consumes context length.",
            },
            {
              term: "QLoRA",
              description:
                "Quantise the frozen base model to 4 bits and train the adapter in higher precision on top. The base weights are never updated, so quantisation error does not accumulate — which is what makes fine-tuning a very large model on a single device possible.",
            },
          ],
        },
      ],
    },

    {
      heading: "Serving many tasks from one model",
      blocks: [
        {
          kind: "callout",
          tone: "insight",
          title: "The adapter can be merged, so inference costs nothing extra",
          text:
            "Because the update is additive, W + BA can be computed once and stored as a single " +
            "matrix. A merged LoRA model is architecturally identical to the base model and runs at " +
            "exactly its speed — unlike an adapter layer, which adds computation forever. Keeping " +
            "them unmerged is also a choice: one base model in memory plus many small adapters lets " +
            "one server host hundreds of task-specific variants, swapping a few megabytes per " +
            "request instead of loading a new model.",
        },
        {
          kind: "list",
          items: [
            "Storage per task falls from a full model copy — tens of gigabytes — to tens of megabytes, which changes what is worth fine-tuning at all.",
            "Catastrophic forgetting is milder, since the pretrained weights are literally unchanged and the adapter can simply be removed.",
            "It does not add knowledge the base model lacks. Fine-tuning teaches format, style and task; facts that were never in pretraining are better handled by retrieval.",
            "It is not the right tool when the target domain is genuinely far from pretraining — a base model that has never seen the modality needs more than a low-rank nudge.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Hu et al., LoRA: Low-Rank Adaptation of Large Language Models", locator: "ICLR 2022" },
    { source: "Houlsby et al., Parameter-Efficient Transfer Learning for NLP", locator: "ICML 2019 (adapters)" },
    { source: "Dettmers et al., QLoRA: Efficient Finetuning of Quantized LLMs", locator: "NeurIPS 2023" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-15-adapting-and-serving.md" },
  ],
};

const instructionTuningAndRlhf: WikiArticle = {
  conceptId: "instruction-tuning-and-rlhf",
  summary:
    "A pretrained language model predicts the next token; it does not answer questions, because " +
    "nothing in its objective ever asked it to. Two further stages close that gap: supervised " +
    "fine-tuning on demonstrations of the behaviour wanted, then optimisation against human " +
    "preferences. The second stage exists because it is far easier to say which of two answers is " +
    "better than to write the better one.",

  sections: [
    {
      heading: "Three stages, and what each one fixes",
      blocks: [
        {
          kind: "table",
          headers: ["Stage", "Data", "Objective", "What it buys"],
          rows: [
            ["Pretraining", "Unlabelled corpus", "Next-token likelihood", "Knowledge and fluency; no notion of being helpful"],
            ["Supervised fine-tuning", "Demonstrations written by people", "Same likelihood objective, on curated data", "The format: answer the question, follow the instruction"],
            ["Preference optimisation", "Pairwise comparisons of model outputs", "Maximise a learned reward under a KL constraint", "The qualities that are easy to judge and hard to write"],
          ],
        },
        {
          kind: "prose",
          text:
            "The middle stage is cheap and does most of the visible work: a few tens of thousands of " +
            "good demonstrations turn a completion engine into something that behaves like an " +
            "assistant. What it cannot do is exceed its demonstrations, and it gives no signal about " +
            "the many outputs an annotator would recognise as bad but would never have written.",
        },
      ],
    },

    {
      heading: "Turning comparisons into a reward",
      blocks: [
        {
          kind: "formula",
          latex: "P(A ≻ B) = σ(r(A) − r(B))",
          caption: "The Bradley-Terry model: a preference probability from a difference of scalar rewards",
        },
        {
          kind: "prose",
          text:
            "Annotators rank outputs rather than scoring them, because absolute scores are not " +
            "comparable between people or stable within one. Bradley-Terry converts those rankings " +
            "into a regression problem: fit a scalar reward model so that the logistic of the reward " +
            "difference reproduces the observed preferences. Only differences are identified — " +
            "adding a constant to every reward changes nothing — which is a hint that the reward is " +
            "a means, not a measurement.",
        },
        {
          kind: "example",
          title: "Reading a reward gap",
          problem: "The reward model scores answer A at 1.5 and answer B at −0.5. What probability does the model assign to a rater preferring A?",
          steps: [
            "Difference: 1.5 − (−0.5) = 2.",
            "σ(2) = 1/(1 + e⁻²).",
            "e⁻² ≈ 0.1353.",
          ],
          answer:
            "About 0.881. Note what this does not say: it is the probability a rater prefers A, not the probability that A is correct. A reward model trained on human comparisons learns human preferences including their biases — length, confidence, formatting — and optimising it hard optimises those too.",
        },
      ],
    },

    {
      heading: "The KL leash, and what replaced PPO",
      blocks: [
        {
          kind: "formula",
          latex: "maximise  E_π[r(x, y)] − β · KL(π ‖ π_ref)",
          caption: "The policy is rewarded for scoring well and penalised for drifting from the fine-tuned reference",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Without the penalty the policy finds the reward model's blind spots",
          text:
            "The reward model is an imperfect fit trained on outputs from a particular distribution. " +
            "A policy optimised against it without constraint leaves that distribution immediately " +
            "and finds text that scores extremely well and reads as gibberish — reward hacking, and " +
            "it is the normal outcome, not a rare failure. The KL term keeps the policy in the region " +
            "where the reward model was actually fit, and β is the dial between 'optimised' and " +
            "'still a language model'.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "PPO",
              description:
                "The original method: treat generation as a policy, the reward model as the environment, and run policy-gradient updates with a clipped objective. It works and it is operationally heavy — four models in memory at once (policy, reference, reward, value) and a reputation for sensitivity to hyperparameters.",
            },
            {
              term: "DPO",
              description:
                "Observes that the KL-constrained optimum has a closed form in terms of the reward, which can be inverted: the reward is a function of the policy's own log-ratio against the reference. Substituting it turns the whole problem into a supervised classification loss on preference pairs, with no reward model and no sampling loop.",
            },
            {
              term: "RLAIF and constitutional methods",
              description:
                "Replace or supplement the human comparisons with model-generated ones against a written set of principles. Cheaper and faster to iterate; it inherits whatever the judging model gets wrong.",
            },
            {
              term: "Alignment tax",
              description:
                "Preference optimisation can cost measurable capability on benchmarks even as it improves what people prefer. Whether that is a real loss or a mismatch between benchmarks and usefulness is genuinely contested.",
            },
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Ouyang et al., Training Language Models to Follow Instructions with Human Feedback", locator: "NeurIPS 2022 (InstructGPT)" },
    { source: "Rafailov et al., Direct Preference Optimization", locator: "NeurIPS 2023" },
    { source: "Bai et al., Constitutional AI: Harmlessness from AI Feedback", locator: "2022" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-15-adapting-and-serving.md" },
  ],
};

const knowledgeDistillation: WikiArticle = {
  conceptId: "knowledge-distillation",
  summary:
    "Distillation trains a small student on a large teacher's full output distribution rather than " +
    "on the hard labels. The teacher's relative scores over the wrong answers — that this 7 is " +
    "somewhat 1-like and not at all 8-like — carry information the one-hot label deletes, and that " +
    "extra signal is what lets a small model reach an accuracy it cannot reach by training on the " +
    "labels alone.",

  sections: [
    {
      heading: "Soft targets carry more than labels",
      blocks: [
        {
          kind: "formula",
          latex: "L = (1 − λ) · CE(y, p_student) + λ · T² · KL(p_teacher^T ‖ p_student^T)",
          caption: "A weighted sum of the hard-label loss and the divergence from the softened teacher",
        },
        {
          kind: "prose",
          text:
            "The temperature T divides the logits before the softmax on both sides. At T = 1 a " +
            "confident teacher puts almost all its mass on one class and its distribution is nearly " +
            "the one-hot label, so nothing extra is transferred. Raising T flattens it and brings " +
            "the ratios among the small probabilities into view — which is the whole content of the " +
            "method. The T² factor compensates for the fact that soft-target gradients shrink like " +
            "1/T², so that changing T does not silently change the balance between the two terms.",
        },
        {
          kind: "example",
          title: "What the temperature exposes",
          problem: "A teacher's logits for three classes are (5, 2, 1). What probability does the second class receive at T = 1, and at T = 2?",
          steps: [
            "T = 1: exponentials are e⁵ ≈ 148.41, e² ≈ 7.39, e¹ ≈ 2.72, summing to ≈ 158.52. The second class gets 7.39/158.52.",
            "T = 2: the logits become (2.5, 1, 0.5), with exponentials ≈ 12.18, 2.72, 1.65, summing to ≈ 16.55.",
            "The second class gets 2.72/16.55.",
          ],
          answer:
            "About 0.047 at T = 1 and about 0.164 at T = 2. The teacher's judgement that class 2 is roughly three times as plausible as class 3 is present in both, but at T = 1 it sits in probabilities so small that the student's gradient barely registers them. Temperature is what makes the dark knowledge visible to the loss.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "A soft target is a regulariser you did not have to invent",
          text:
            "Training on one-hot labels asks the model to be infinitely confident, which is false and " +
            "which label smoothing exists to soften with a constant. A teacher's distribution is a " +
            "smoothing that is different for every example and informative about that example — the " +
            "confusable classes for this input rather than a uniform allowance. That is a large part " +
            "of why the student generalises better than its size suggests.",
        },
      ],
    },

    {
      heading: "Variants",
      blocks: [
        {
          kind: "list",
          items: [
            "Ensemble distillation — train the student on the averaged predictions of many models, recovering most of the ensemble's accuracy at one model's inference cost. This was the original motivation, and it remains the cleanest case for the method.",
            "Self-distillation — teacher and student have the same architecture. It still helps, which rules out capacity transfer as the whole explanation and points back at the soft targets themselves.",
            "Feature or attention matching — match intermediate representations as well as outputs. More signal, and it requires the architectures to correspond closely enough for the matching to mean something.",
            "Sequence-level distillation — for generative models, train the student on text the teacher generated rather than on per-token distributions. Simpler to implement at scale and now the standard way small language models are built.",
            "Distilling a diffusion model's sampling loop into a few steps is the same idea applied to a procedure rather than a distribution, and it is how few-step image generators are made.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The student's capacity is still a ceiling",
          text:
            "Distillation transfers what the student is able to represent. Beyond a gap of roughly an " +
            "order of magnitude the student cannot follow the teacher, and pushing the loss harder " +
            "produces a model that matches the teacher on easy inputs and diverges on exactly the " +
            "hard ones. Distillation compresses; it does not create capacity, and the compression " +
            "ratio is bounded by the task.",
        },
      ],
    },
  ],

  references: [
    { source: "Hinton, Vinyals & Dean, Distilling the Knowledge in a Neural Network", locator: "NeurIPS 2014 workshop" },
    { source: "Sanh et al., DistilBERT", locator: "2019" },
    { source: "Kim & Rush, Sequence-Level Knowledge Distillation", locator: "EMNLP 2016" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-15-adapting-and-serving.md" },
  ],
};

const quantization: WikiArticle = {
  conceptId: "quantization",
  summary:
    "Quantisation stores weights, and sometimes activations, in 8 or 4 bits instead of 16 or 32. " +
    "The mapping is a scale and an offset per group of values, and the error it introduces is " +
    "usually far smaller than the intuition suggests. It matters because generating a token is " +
    "bound by moving weights from memory rather than by arithmetic — so fewer bits per weight is " +
    "directly fewer milliseconds per token.",

  sections: [
    {
      heading: "The map",
      blocks: [
        {
          kind: "formula",
          latex: "q = round(x / s) + z,   x̂ = s · (q − z),   s = (max − min) / (2^b − 1)",
          caption: "Affine quantisation: a scale s and a zero point z per group, chosen from the group's range",
        },
        {
          kind: "example",
          title: "Quantising one weight",
          problem: "A weight group is symmetric in [−0.5, 0.5] and is quantised to signed int8, so s = 0.5/127. What happens to a weight of 0.3?",
          steps: [
            "s = 0.5/127 ≈ 0.0039370.",
            "q = round(0.3 / 0.0039370) = round(76.2) = 76.",
            "Dequantised: 76 x 0.0039370 ≈ 0.29921.",
          ],
          answer:
            "0.29921 — an error of about 0.0008, roughly 0.26% of the value. Averaged over a matrix these errors are close to independent and largely cancel in the sum a matmul computes, which is why 8-bit inference is usually indistinguishable from 16-bit on quality metrics.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Per-tensor, per-channel, per-group",
              description:
                "One scale for a whole tensor is cheapest and worst: a single large value stretches the range and coarsens every other weight. Per-output-channel is standard; per-group of 64 or 128 weights is what 4-bit methods use, and the scales themselves then become a small storage cost worth counting.",
            },
            {
              term: "Symmetric vs asymmetric",
              description:
                "Symmetric fixes z = 0 and is faster; asymmetric keeps a zero point and fits skewed distributions better. Weights are usually roughly symmetric; activations after a ReLU are emphatically not.",
            },
            {
              term: "Weight-only vs full quantisation",
              description:
                "Quantising weights alone and computing in 16-bit already captures the memory-bandwidth win for generation. Quantising activations too speeds up the arithmetic and is much harder to keep accurate.",
            },
          ],
        },
      ],
    },

    {
      heading: "Post-training or during training",
      blocks: [
        {
          kind: "table",
          headers: ["", "Post-training (PTQ)", "Quantisation-aware (QAT)"],
          rows: [
            ["Cost", "Minutes, on a small calibration set", "A full fine-tuning run"],
            ["How it works", "Fit scales from observed ranges; optionally adjust weights to compensate", "Simulate quantisation in the forward pass, pass gradients through with a straight-through estimator"],
            ["Typical floor", "8-bit reliably; 4-bit with a good method", "Down to 4 bits and below, more reliably"],
            ["When to use", "Almost always the first thing to try", "When PTQ's accuracy loss is unacceptable and a training run is affordable"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A few outlier channels do most of the damage",
          text:
            "In large transformers a small number of activation channels carry magnitudes hundreds " +
            "of times larger than the rest, and a shared scale sized for them destroys the " +
            "precision of everything else. Every serious low-bit method is in part a strategy for " +
            "these outliers — keeping them in higher precision, factoring them out into a scale, or " +
            "choosing which weights to keep exact based on their effect on the layer's output. This " +
            "is why quantisation results from small models do not transfer to large ones.",
        },
      ],
    },

    {
      heading: "Why it pays at serving time",
      blocks: [
        {
          kind: "example",
          title: "Whether a model fits at all",
          problem: "A 70-billion-parameter model is served in fp16 and then in 4-bit. What do the weights weigh in each case?",
          steps: [
            "fp16: 2 bytes per parameter, so 140 GB.",
            "4-bit: half a byte per parameter, so 35 GB.",
            "Plus the group scales, a few percent on top.",
          ],
          answer:
            "140 GB against about 35 GB — the difference between several accelerators and one. Generating a token reads every weight once, so at batch size 1 the time per token is set almost entirely by that byte count: quantising to a quarter of the size is close to a fourfold speedup, even though the arithmetic still happens in higher precision after dequantising.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The trade is against distillation, and they compose",
          text:
            "Both make a model cheaper to serve, in different currencies. Quantisation keeps the " +
            "architecture and loses precision; distillation keeps precision and loses capacity. They " +
            "are routinely used together — distil to a smaller student, then quantise the student — " +
            "and the practical question is always which one the quality budget can afford first.",
        },
      ],
    },
  ],

  references: [
    { source: "Jacob et al., Quantization and Training of Neural Networks for Efficient Integer-Arithmetic-Only Inference", locator: "CVPR 2018" },
    { source: "Dettmers et al., LLM.int8(): 8-bit Matrix Multiplication for Transformers at Scale", locator: "NeurIPS 2022, on outlier channels" },
    { source: "Frantar et al., GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers", locator: "ICLR 2023" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-15-adapting-and-serving.md" },
  ],
};

export const ml15AdaptingAndServing: WikiArticle[] = [
  scalingLaws,
  tokenization,
  contrastiveLearning,
  parameterEfficientFineTuning,
  instructionTuningAndRlhf,
  knowledgeDistillation,
  quantization,
];
