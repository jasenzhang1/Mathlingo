import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./dl-sixty-shared";

/**
 * Scaling laws, tokenisation, contrastive learning, PEFT, instruction tuning
 * and RLHF, distillation, quantisation and VAEs, each brought from 40 to 60
 * questions. Most of these pools sat at levels 5–8, so the additions fill
 * 1–4 and 9–10.
 */

// ---------------------------------------------------------------------------
// scaling-laws
// ---------------------------------------------------------------------------
const SC = "scaling-laws";
const scaling: Item[] = [
  mcq(m(SC, "recall-power-law", "recall", 1, 15, "Neural scaling laws say test loss falls with model size, data and compute roughly as:"),
    "A power law",
    [
      ["A straight line on linear axes", "power-law-linear", "It's linear only on log–log axes."],
      ["An exponential decay to zero", "power-law-exponential", "It's a power law toward an irreducible floor."],
      ["A step function", "power-law-step", "The loss curve is smooth."],
    ]),
  mcq(m(SC, "recall-kaplan", "recall", 1, 15, "An influential $2020$ paper on scaling laws for language models came from:"),
    "Kaplan et al. at OpenAI",
    [
      ["Rosenblatt", "kaplan-rosenblatt", "He introduced the perceptron."],
      ["Ioffe and Szegedy", "kaplan-batchnorm", "They introduced batch norm."],
      ["Goodfellow et al.", "kaplan-gan", "They introduced GANs."],
    ]),
  mcq(m(SC, "recall-quantities", "recall", 1, 15, "Scaling laws are usually stated in terms of which three quantities?"),
    "Parameters $N$, training tokens $D$ and compute $C$",
    [
      ["Learning rate, batch size and momentum", "quantities-hyper", "Those are hyperparameters."],
      ["Accuracy, precision and recall", "quantities-metrics", "Those are metrics."],
      ["Layers, heads and width only", "quantities-architecture", "Shape matters less than total size."],
    ]),
  mcq(m(SC, "recall-chinchilla", "recall", 1, 15, "The Chinchilla result suggests about how many training tokens per parameter for compute-optimal training?"),
    "About $20$",
    [
      ["About $1$", "chinchilla-one", "That badly undertrains the model."],
      ["About $1{,}000$", "chinchilla-thousand", "That's far beyond compute-optimal."],
      ["Exactly $2$", "chinchilla-two", "The rule of thumb is about $20$."],
    ]),
  num(m(SC, "apply-compute", "apply", 2, 20, "Using $C \\approx 6ND$, how much compute does a $10^{8}$-parameter model trained on $2 \\times 10^{9}$ tokens need, in units of $10^{18}$ FLOPs?"), 1.2),
  num(m(SC, "apply-chinchilla-tokens", "apply", 2, 20, "At $20$ tokens per parameter, how many billion tokens should a $10$-billion-parameter model see?"), 200),
  num(m(SC, "apply-double-both", "apply", 2, 20, "Doubling both $N$ and $D$ multiplies training compute by what factor?"), 4),
  num(m(SC, "apply-power", "apply", 3, 25, "The reducible loss scales as $N^{-0.5}$ and is $2$ at some size. What is it after multiplying $N$ by $4$?"), 1),
  num(m(SC, "apply-optimal-n", "apply", 3, 25, "Compute-optimal $N$ grows like $C^{0.5}$. If compute grows $100\\times$, by what factor should $N$ grow?"), 10),
  num(m(SC, "apply-exponent", "apply", 3, 25, "The reducible loss halves when $N$ grows $1{,}000\\times$. What is the exponent $\\alpha$ in $N^{-\\alpha}$? Give $4$ decimal places."), 0.1003),
  num(m(SC, "apply-law", "apply", 3, 25, "$L(N) = 2 + 4N^{-0.5}$, with $N$ in billions. What is $L$ at $N = 4$?"), 4),
  num(m(SC, "apply-optimal-size", "apply", 4, 30, "With $C = 6ND$ and $D = 20N$, the optimal $N = \\sqrt{\\frac{C}{120}}$. For $C = 1.2 \\times 10^{21}$, how many billion parameters? Give $4$ decimal places."), 3.1623),
  num(m(SC, "apply-inference", "apply", 4, 30, "Generating one token costs about $2N$ FLOPs. For $N = 7 \\times 10^{9}$, how many units of $10^{10}$ FLOPs is that?"), 1.4),
  short(m(SC, "transfer-overtrain", "transfer", 9, 150, "Why do many production models train far beyond Chinchilla's $20$ tokens per parameter?"),
    [
      ["inference", "Chinchilla minimises training compute only; when a model serves huge inference volume, a smaller model is cheaper to run", 2, true],
      ["tradeoff", "Training a smaller model on more tokens reaches similar quality at extra training cost but much lower lifetime inference cost", 2, true],
    ]),
  short(m(SC, "transfer-emergence", "transfer", 9, 150, "Some argue “emergent abilities” are partly an artefact of the metric. Explain."),
    [
      ["metric", "All-or-nothing metrics like exact-match accuracy stay near zero until per-token accuracy is high, then jump", 2, true],
      ["smooth", "Measured with continuous metrics (e.g. log-likelihood of the answer), the same improvement is often smooth and predictable", 2, true],
    ]),
  mcq(m(SC, "transfer-repeat", "transfer", 9, 75, "When unique data run out, repeating the data for a few epochs:"),
    "Is nearly as good as fresh data for the first few epochs, with diminishing value after that",
    [
      ["Is worthless from the second epoch", "repeat-worthless", "A few repeats help almost as much as new data."],
      ["Is always better than new data", "repeat-better", "New data is at least as good."],
      ["Has no effect on loss", "repeat-no-effect", "It does reduce loss, with diminishing returns."],
    ]),
  num(m(SC, "transfer-lifetime", "transfer", 9, 75, "Training costs $6ND$ and each generated token $2N$. How many trillion tokens must a model trained on $D = 2 \\times 10^{12}$ tokens generate before inference compute equals training compute?"), 6),
  short(m(SC, "transfer-extrapolation", "transfer", 10, 180, "Why should predictions from a fitted scaling law be treated with caution far beyond the fitted range?"),
    [
      ["fit", "Exponents and constants are fitted over a limited range and depend on data, architecture and tuning, so small fitting errors grow when extrapolated", 2, true],
      ["regime", "New regimes (data exhaustion, different data mix, irreducible loss estimates) can bend the curve; downstream metrics are noisier still", 2, true],
    ]),
  mcq(m(SC, "transfer-test-time", "transfer", 10, 90, "“Test-time compute scaling” refers to:"),
    "Improving answers by spending more computation at inference, e.g. longer reasoning or sampling several candidates",
    [
      ["Training on the test set", "test-time-train", "That's leakage."],
      ["Shrinking the model at inference", "test-time-shrink", "It spends more compute."],
      ["Measuring loss on the test set", "test-time-measure", "It's about using more inference compute."],
    ]),
  short(m(SC, "transfer-downstream", "transfer", 10, 180, "Why are scaling laws for downstream task accuracy harder to fit than for pretraining loss?"),
    [
      ["noisy", "Task metrics are discrete, saturating and noisy, often flat then sharply rising, unlike smooth cross-entropy", 2, true],
      ["indirect", "They depend on prompting, task format and data overlap, so the link from pretraining loss to task accuracy varies by task", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// tokenization
// ---------------------------------------------------------------------------
const TK = "tokenization";
const tokenization: Item[] = [
  mcq(m(TK, "recall-ids", "recall", 1, 15, "After tokenisation, each token's integer id is used to:"),
    "Look up its row in the embedding table",
    [
      ["Count its letters", "ids-letters", "Ids are indices."],
      ["Sort the vocabulary", "ids-sort", "They index embeddings."],
      ["Choose the learning rate", "ids-lr", "Unrelated."],
    ]),
  mcq(m(TK, "recall-sentencepiece", "recall", 1, 15, "SentencePiece differs from many earlier tokenisers by:"),
    "Treating input as a raw character stream, encoding spaces as ordinary symbols, with no pre-tokenisation into words",
    [
      ["Using whole words only", "sentencepiece-words", "It learns subwords."],
      ["Ignoring spaces entirely", "sentencepiece-spaces", "Spaces become symbols."],
      ["Requiring a dictionary per language", "sentencepiece-dictionary", "It's language-independent."],
    ]),
  mcq(m(TK, "recall-byte-level", "recall", 1, 15, "A byte-level BPE tokeniser can encode:"),
    "Any string, since every byte is in its base vocabulary",
    [
      ["Only English text", "byte-english", "Bytes cover all text."],
      ["Only words seen in training", "byte-seen", "Unseen words fall back to bytes."],
      ["Only numbers", "byte-numbers", "It covers any text."],
    ]),
  mcq(m(TK, "recall-subword", "recall", 1, 15, "Subword tokenisers handle a rare word like “unhappiness” by:"),
    "Splitting it into more common pieces, e.g. “un”, “happi”, “ness”",
    [
      ["Replacing it with an unknown token", "subword-unk", "That's word-level behaviour."],
      ["Deleting it", "subword-delete", "It's encoded in pieces."],
      ["Spelling it backwards", "subword-backwards", "Pieces keep order."],
    ]),
  num(m(TK, "apply-embedding", "apply", 2, 20, "A vocabulary of $32{,}000$ with $d = 1{,}024$ gives an embedding table of how many million parameters?"), 32.768),
  num(m(TK, "apply-fertility", "apply", 2, 20, "$1{,}000$ words encode to $1{,}300$ tokens. What is the fertility (tokens per word)?"), 1.3),
  num(m(TK, "apply-base", "apply", 2, 20, "How many base symbols does a byte-level vocabulary start with?"), 256),
  num(m(TK, "apply-merges", "apply", 3, 25, "Starting from $256$ byte symbols, BPE performs $1{,}000$ merges. How large is the vocabulary (ignoring special tokens)?"), 1256),
  num(m(TK, "apply-context-words", "apply", 3, 25, "A context of $8{,}192$ tokens at $1.3$ tokens per word holds about how many words, to the nearest whole word?"), 6302),
  num(m(TK, "apply-bits", "apply", 3, 25, "How many bits are needed to index one of $65{,}536$ tokens?"), 16),
  num(m(TK, "apply-chars", "apply", 3, 25, "$4{,}000$ characters encode to $1{,}000$ tokens. How many characters per token on average?"), 4),
  num(m(TK, "apply-cost-ratio", "apply", 4, 30, "One language averages $3.0$ tokens per word and another $1.2$. How many times more does the same word count cost in the first?"), 2.5),
  num(m(TK, "apply-output-flops", "apply", 4, 30, "The output layer costs $2Vd$ FLOPs per token. For $V = 50{,}000$ and $d = 4{,}096$, how many million FLOPs?"), 409.6),
  short(m(TK, "transfer-digits", "transfer", 9, 150, "How can tokenisation make multi-digit arithmetic harder for a language model, and what fixes have been tried?"),
    [
      ["problem", "Numbers split into irregular multi-digit chunks (e.g. “1234” as “12”+“34” or “123”+“4”), so digit positions aren't aligned consistently", 2, true],
      ["fix", "Split numbers into single digits (or fixed groups), right-to-left grouping, or add position-aware number encodings", 2, true],
    ]),
  short(m(TK, "transfer-glitch", "transfer", 9, 150, "What are “glitch tokens,” and how do they arise?"),
    [
      ["arise", "Tokens that were frequent in the tokeniser's training data but almost absent from the model's training data, so their embeddings were barely trained", 2, true],
      ["effect", "Prompts containing them can make the model behave erratically, since their embeddings are near-random", 2, true],
    ]),
  mcq(m(TK, "transfer-perplexity", "transfer", 9, 75, "Why can't perplexities of models with different tokenisers be compared directly?"),
    "Perplexity is per token, and the tokenisers split the same text into different numbers of tokens; bits per byte is comparable",
    [
      ["Perplexity is always identical", "perplexity-identical", "It varies with tokenisation."],
      ["Perplexity ignores the text", "perplexity-ignores", "It's per token of the text."],
      ["Larger vocabularies always win", "perplexity-larger", "Normalisation, not vocabulary size, is the issue."],
    ]),
  num(m(TK, "transfer-bpb", "transfer", 9, 75, "A model's cross-entropy is $2.0$ nats per token, and tokens average $4$ bytes. What is that in bits per byte? Give $4$ decimal places."), 0.7213),
  short(m(TK, "transfer-byte-models", "transfer", 10, 180, "What do tokeniser-free (byte-level) models gain and lose?"),
    [
      ["gain", "No vocabulary to design, robustness to typos and rare scripts, and no glitch or splitting artefacts", 2, true],
      ["lose", "Sequences get several times longer, raising attention cost; designs like patching or hierarchical models are needed to compensate", 2, true],
    ]),
  mcq(m(TK, "transfer-vocab-scale", "transfer", 10, 90, "As models grow, the best vocabulary size tends to:"),
    "Grow too, since larger models can use more (rarer) tokens well and shorter sequences save compute",
    [
      ["Shrink to a few hundred", "vocab-scale-shrink", "Larger models favour larger vocabularies."],
      ["Stay fixed at $32{,}000$", "vocab-scale-fixed", "Optimal size depends on scale."],
      ["Become irrelevant", "vocab-scale-irrelevant", "It still matters."],
    ]),
  short(m(TK, "transfer-multilingual", "transfer", 10, 180, "Why can an English-centric tokeniser be unfair to speakers of other languages?"),
    [
      ["fertility", "Other languages split into many more tokens per word, so the same content costs more and uses more context", 2, true],
      ["quality", "Longer, more fragmented sequences can also lower model quality for those languages; balanced multilingual tokeniser training helps", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// contrastive-learning
// ---------------------------------------------------------------------------
const CL = "contrastive-learning";
const contrastive: Item[] = [
  mcq(m(CL, "recall-positives", "recall", 1, 15, "A contrastive objective pulls together:"),
    "Representations of positive pairs, such as two views of the same image",
    [
      ["All representations in the batch", "positives-all", "Negatives are pushed apart."],
      ["Images from different classes", "positives-classes", "Those are usually negatives."],
      ["Random noise vectors", "positives-noise", "Pairs come from data."],
    ]),
  mcq(m(CL, "recall-negatives", "recall", 1, 15, "In a contrastive batch, negatives are:"),
    "Other examples, whose representations are pushed away from the anchor",
    [
      ["Augmented copies of the anchor", "negatives-copies", "Those are positives."],
      ["Labels", "negatives-labels", "They're examples."],
      ["Never used", "negatives-never", "InfoNCE relies on them."],
    ]),
  mcq(m(CL, "recall-clip", "recall", 1, 15, "CLIP learns by contrasting:"),
    "Images with their matching and non-matching text captions",
    [
      ["Two crops of the same image only", "clip-crops", "It pairs images with text."],
      ["Audio with video", "clip-audio", "It uses images and text."],
      ["Images with class labels from ImageNet", "clip-labels", "It uses free-form captions."],
    ]),
  mcq(m(CL, "recall-projection", "recall", 1, 15, "In SimCLR, the contrastive loss is applied to:"),
    "The output of a small projection head on top of the encoder",
    [
      ["The raw pixels", "projection-pixels", "It acts on learned features."],
      ["The class labels", "projection-labels", "There are none."],
      ["The encoder's weights", "projection-weights", "It acts on representations."],
    ]),
  num(m(CL, "apply-chance", "apply", 2, 20, "With $128$ candidates and uniform scores, InfoNCE's loss is $\\ln 128$. What is it? Give $4$ decimal places."), 4.852),
  num(m(CL, "apply-self-similarity", "apply", 2, 20, "What is the cosine similarity of a normalised vector with itself?"), 1),
  num(m(CL, "apply-logit", "apply", 2, 20, "A cosine similarity of $0.5$ divided by temperature $0.05$ gives what logit?"), 10),
  num(m(CL, "apply-infonce", "apply", 3, 25, "With $\\tau = 1$, the positive has cosine $0.5$ and the only negative $0$. What is $-\\ln\\frac{e^{0.5}}{e^{0.5} + e^{0}}$? Give $4$ decimal places."), 0.4741),
  num(m(CL, "apply-clip-pairs", "apply", 3, 25, "A CLIP batch of $32{,}768$ image–text pairs scores every image against every caption. How many similarities?"), 1073741824),
  num(m(CL, "apply-mi-bound", "apply", 3, 25, "InfoNCE gives the mutual-information bound $\\ln N - \\mathcal{L}$. With $N = 1{,}024$ and $\\mathcal{L} = 2$, what is it? Give $4$ decimal places."), 4.9315),
  num(m(CL, "apply-clip-negatives", "apply", 3, 25, "In a CLIP batch of $1{,}024$ pairs, how many negative captions does each image have?"), 1023),
  num(m(CL, "apply-positive-prob", "apply", 4, 30, "With $\\tau = 0.1$, the positive has cosine $0.8$ and the single negative $0.4$. What softmax probability does the positive get? Give $4$ decimal places."), 0.982),
  num(m(CL, "apply-triplet", "apply", 4, 30, "A triplet loss is $\\max(0, d_{\\text{pos}} - d_{\\text{neg}} + m)$. With $d_{\\text{pos}} = 0.3$, $d_{\\text{neg}} = 0.5$ and margin $0.5$, what is it?"), 0.3),
  short(m(CL, "transfer-false-negatives", "transfer", 9, 150, "What are false negatives in contrastive learning, and how can they be reduced?"),
    [
      ["what", "Other batch items treated as negatives that are actually semantically the same (e.g. two different photos of dogs), which the loss wrongly pushes apart", 2, true],
      ["reduce", "Use labels when available (SupCon), detect and remove likely false negatives by similarity, or use methods without explicit negatives", 2, true],
    ]),
  short(m(CL, "transfer-alignment-uniformity", "transfer", 9, 150, "Contrastive losses are often analysed as balancing “alignment” and “uniformity.” What do these mean?"),
    [
      ["alignment", "Alignment: positive pairs map to nearby points", 2, true],
      ["uniformity", "Uniformity: embeddings spread evenly over the hypersphere, preserving information and avoiding collapse", 2, true],
    ]),
  mcq(m(CL, "transfer-moco", "transfer", 9, 75, "MoCo gets many negatives without huge batches by:"),
    "Keeping a queue of embeddings from recent batches, produced by a slowly updated momentum encoder",
    [
      ["Generating negatives with a GAN", "moco-gan", "Negatives are past embeddings."],
      ["Using labels to find negatives", "moco-labels", "It's self-supervised."],
      ["Dropping negatives entirely", "moco-none", "It relies on many negatives."],
    ]),
  num(m(CL, "transfer-queue", "transfer", 9, 75, "A MoCo queue holds $65{,}536$ negatives while the batch is $256$. How many times more negatives than the batch would give?"), 256),
  short(m(CL, "transfer-learned-temperature", "transfer", 10, 180, "Why does CLIP learn its temperature rather than fixing it, and what happens if it's too low?"),
    [
      ["learned", "The best sharpness changes during training and is hard to tune by hand, so learning it (with a clip on its range) adapts it automatically", 2, true],
      ["low", "Too low a temperature makes the softmax nearly one-hot, focusing on the hardest negatives and making training unstable", 2, true],
    ]),
  mcq(m(CL, "transfer-supcon", "transfer", 10, 90, "Supervised contrastive learning (SupCon) differs from SimCLR by:"),
    "Treating all same-class examples in the batch as positives",
    [
      ["Using no augmentations", "supcon-no-aug", "It still augments."],
      ["Ignoring labels", "supcon-no-labels", "It uses labels to pick positives."],
      ["Using a single negative", "supcon-single", "It uses all other-class examples as negatives."],
    ]),
  short(m(CL, "transfer-modality-gap", "transfer", 10, 180, "In CLIP, image and text embeddings occupy separate regions of the shared space (the modality gap). Why does that matter?"),
    [
      ["what", "Even matching pairs aren't close in absolute terms; each modality sits in its own cone, partly due to initialisation and the contrastive loss", 2, true],
      ["matters", "Cross-modal retrieval still works by relative ranking, but mixing image and text embeddings (e.g. averaging, or using text to stand in for images) can behave poorly", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// parameter-efficient-fine-tuning
// ---------------------------------------------------------------------------
const PF = "parameter-efficient-fine-tuning";
const peft: Item[] = [
  mcq(m(PF, "recall-frozen", "recall", 1, 15, "Parameter-efficient fine-tuning keeps:"),
    "Most pretrained weights frozen, training only a small number of new or selected parameters",
    [
      ["All weights trainable", "frozen-all", "That's full fine-tuning."],
      ["No weights at all", "frozen-none", "Some parameters are trained."],
      ["Only the embeddings frozen", "frozen-embeddings", "Most of the model is frozen."],
    ]),
  mcq(m(PF, "recall-adapters", "recall", 1, 15, "Adapter layers are:"),
    "Small bottleneck modules inserted into each block and trained while the rest is frozen",
    [
      ["Full copies of each layer", "adapters-copies", "They're small."],
      ["Data augmentation steps", "adapters-augmentation", "They're network modules."],
      ["The model's tokeniser", "adapters-tokeniser", "Unrelated."],
    ]),
  mcq(m(PF, "recall-low-rank", "recall", 1, 15, "LoRA represents the weight update as:"),
    "A product of two small low-rank matrices",
    [
      ["A full-size dense matrix", "low-rank-full", "That's full fine-tuning."],
      ["A single scalar", "low-rank-scalar", "It's low-rank, not scalar."],
      ["A sparse random mask", "low-rank-mask", "It's a low-rank product."],
    ]),
  mcq(m(PF, "recall-prefix", "recall", 1, 15, "Prefix tuning trains:"),
    "Continuous vectors prepended to the keys and values (or inputs) of each layer",
    [
      ["All of the model's weights", "prefix-all", "The model stays frozen."],
      ["The tokeniser's vocabulary", "prefix-vocab", "It trains vectors."],
      ["Only the biases", "prefix-biases", "That's BitFit."],
    ]),
  num(m(PF, "apply-lora", "apply", 2, 20, "A $512 \\times 512$ matrix is adapted with LoRA at rank $4$. How many trainable parameters?"), 4096),
  num(m(PF, "apply-full", "apply", 2, 20, "How many parameters does full fine-tuning of that matrix train?"), 262144),
  num(m(PF, "apply-ratio", "apply", 2, 20, "How many times fewer parameters does the rank-$4$ adapter train?"), 64),
  num(m(PF, "apply-rectangular", "apply", 3, 25, "A $4{,}096 \\times 1{,}024$ matrix is adapted at rank $16$. How many trainable parameters?"), 81920),
  num(m(PF, "apply-adapter", "apply", 3, 25, "An adapter maps $768 \\to 64 \\to 768$ with biases. How many parameters?"), 99136),
  num(m(PF, "apply-prompt", "apply", 3, 25, "Prompt tuning learns $20$ soft tokens in a $4{,}096$-dimensional model. How many parameters?"), 81920),
  num(m(PF, "apply-scale", "apply", 3, 25, "LoRA scales its update by $\\frac{\\alpha}{r}$. What is the scale for $\\alpha = 32$ and $r = 8$?"), 4),
  num(m(PF, "apply-total-lora", "apply", 4, 30, "LoRA at rank $8$ on $4$ square $4{,}096 \\times 4{,}096$ matrices in each of $32$ layers. How many million trainable parameters? Give $4$ decimal places."), 8.3886),
  num(m(PF, "apply-qlora", "apply", 4, 30, "QLoRA stores a $7 \\times 10^{9}$-parameter base model in $4$ bits. How many gigabytes ($10^{9}$ bytes) for the base weights?"), 3.5),
  short(m(PF, "transfer-rank", "transfer", 9, 150, "How would you choose LoRA's rank for a new task?"),
    [
      ["task", "Narrow tasks (style, format) often work at low rank (4–16); tasks needing more new behaviour may need higher rank or more target matrices", 2, true],
      ["validate", "Try a few ranks and check validation quality; beyond some rank gains plateau while memory and overfitting risk grow", 2, true],
    ]),
  short(m(PF, "transfer-knowledge", "transfer", 9, 150, "Why is LoRA fine-tuning a poor way to teach a model a large body of new facts, and what is often better?"),
    [
      ["limits", "Low-rank updates on limited data mostly adjust behaviour and format; injecting many new facts is unreliable and can cause hallucination", 2, true],
      ["better", "Retrieval-augmented generation supplies facts at inference, or continued pretraining when knowledge must be internalised", 2, true],
    ]),
  mcq(m(PF, "transfer-dora", "transfer", 9, 75, "DoRA modifies LoRA by:"),
    "Separating each weight's magnitude and direction, applying the low-rank update to the direction",
    [
      ["Removing the low-rank update", "dora-remove", "It keeps a LoRA-style update."],
      ["Training all weights", "dora-all", "It stays parameter-efficient."],
      ["Using a GAN loss", "dora-gan", "Unrelated."],
    ]),
  num(m(PF, "transfer-merge", "transfer", 9, 75, "Merging computes $W' = W + \\frac{\\alpha}{r}BA$. An entry has $W = 0.1$ and $(BA) = 0.02$, with $\\frac{\\alpha}{r} = 2$. What is $W'$?"), 0.14),
  short(m(PF, "transfer-multi-tenant", "transfer", 10, 180, "How can one server host hundreds of LoRA-customised variants of one base model efficiently?"),
    [
      ["share", "Keep one copy of the base weights in GPU memory and store each customer's small adapter separately", 2, true],
      ["batch", "Batch requests for different adapters together, applying each request's adapter on the fly (as in S-LoRA/Punica), instead of merging per customer", 2, true],
    ]),
  mcq(m(PF, "transfer-intrinsic", "transfer", 10, 90, "LoRA's motivation draws on the finding that fine-tuning has low:"),
    "Intrinsic dimensionality — good solutions exist in a small subspace of weight space",
    [
      ["Learning rate", "intrinsic-lr", "It's about the update's dimensionality."],
      ["Data requirements always", "intrinsic-data", "It's about parameter-space structure."],
      ["Accuracy", "intrinsic-accuracy", "Accuracy can be high."],
    ]),
  num(m(PF, "transfer-adapter-size", "transfer", 10, 90, "An adapter has $8.39$ million parameters stored in fp16. How many megabytes ($10^{6}$ bytes)?"), 16.78),
];

// ---------------------------------------------------------------------------
// instruction-tuning-and-rlhf
// ---------------------------------------------------------------------------
const RH = "instruction-tuning-and-rlhf";
const rlhf: Item[] = [
  mcq(m(RH, "recall-sft", "recall", 1, 15, "Supervised fine-tuning (SFT) trains a model on:"),
    "Demonstrations of good responses to prompts",
    [
      ["Pairs of preferred and rejected responses", "sft-pairs", "That's preference data."],
      ["Unlabelled web text", "sft-web", "That's pretraining."],
      ["Random noise", "sft-noise", "It uses demonstrations."],
    ]),
  mcq(m(RH, "recall-preferences", "recall", 1, 15, "Preference data for RLHF usually consist of:"),
    "Two responses to the same prompt, with a human choosing the better one",
    [
      ["A single correct answer per prompt", "preferences-single", "That's SFT data."],
      ["Numeric grades for every token", "preferences-tokens", "Comparisons are at response level."],
      ["Unlabelled prompts only", "preferences-unlabelled", "A choice is recorded."],
    ]),
  mcq(m(RH, "recall-acronym", "recall", 1, 15, "RLHF stands for:"),
    "Reinforcement learning from human feedback",
    [
      ["Recurrent learning with hidden features", "acronym-recurrent", "It's about human feedback."],
      ["Regularised learning of high frequencies", "acronym-regularised", "Not this."],
      ["Random labels for human faces", "acronym-faces", "Not this."],
    ]),
  mcq(m(RH, "recall-kl", "recall", 1, 15, "The KL penalty in RLHF keeps the policy:"),
    "Close to the reference (SFT) model",
    [
      ["Far from the reference model", "kl-far", "It penalises drifting away."],
      ["Identical to the reward model", "kl-reward", "It's measured against the reference policy."],
      ["Deterministic", "kl-deterministic", "It constrains distance, not randomness."],
    ]),
  num(m(RH, "apply-bt", "apply", 2, 20, "Under Bradley–Terry, $P(A \\succ B) = \\sigma(r_A - r_B)$. What is it when $r_A - r_B = 1$? Give $4$ decimal places."), 0.7311),
  num(m(RH, "apply-tie", "apply", 2, 20, "What is $P(A \\succ B)$ when the rewards are equal?"), 0.5),
  num(m(RH, "apply-gap", "apply", 2, 20, "What reward gap $r_A - r_B$ gives $P(A \\succ B) = 0.75$? Give $4$ decimal places."), 1.0986),
  num(m(RH, "apply-dpo-zero", "apply", 3, 25, "The DPO loss for a pair is $-\\ln\\sigma(\\Delta)$. What is it at $\\Delta = 0$? Give $4$ decimal places."), 0.6931),
  num(m(RH, "apply-rm-loss", "apply", 3, 25, "A reward model's loss on a pair is $-\\ln\\sigma(r_{\\text{chosen}} - r_{\\text{rejected}})$. What is it for a gap of $2$? Give $4$ decimal places."), 0.1269),
  num(m(RH, "apply-penalised", "apply", 3, 25, "A response has reward $2$, $\\beta = 0.1$ and KL to the reference of $5$. What is $r - \\beta\\,\\text{KL}$?"), 1.5),
  num(m(RH, "apply-implied", "apply", 3, 25, "DPO's implied reward is $\\beta\\ln\\frac{\\pi(y)}{\\pi_{\\text{ref}}(y)}$. With $\\beta = 0.1$ and $\\frac{\\pi}{\\pi_{\\text{ref}}} = e^{2}$, what is it?"), 0.2),
  num(m(RH, "apply-dpo-margin", "apply", 4, 30, "$\\Delta = \\beta[(\\ln\\pi - \\ln\\pi_{\\text{ref}})(y_w) - (\\ln\\pi - \\ln\\pi_{\\text{ref}})(y_l)]$. With $\\beta = 0.5$, and the two log-ratios $1$ and $-1$, what is $\\Delta$?"), 1),
  num(m(RH, "apply-optimal-policy", "apply", 4, 30, "The KL-regularised optimum is $\\pi^{*} \\propto \\pi_{\\text{ref}}e^{r/\\beta}$. Two responses have $\\pi_{\\text{ref}} = 0.5$ each and rewards $1$ and $0$, with $\\beta = 0.5$. What is $\\pi^{*}$ of the first? Give $4$ decimal places."), 0.8808),
  short(m(RH, "transfer-rlaif", "transfer", 9, 150, "What is RLAIF (or Constitutional AI-style feedback), and what are its trade-offs?"),
    [
      ["what", "An AI model, guided by written principles, produces the preference labels or critiques instead of humans", 2, true],
      ["tradeoffs", "It's cheap, fast and consistent, but inherits the labelling model's biases and blind spots, so human oversight is still needed", 2, true],
    ]),
  short(m(RH, "transfer-overoptimisation", "transfer", 9, 150, "What is reward over-optimisation, and how does it show up as training continues?"),
    [
      ["what", "The policy exploits errors in the learned reward model, so the proxy reward keeps rising while true quality peaks and then falls", 2, true],
      ["mitigate", "Use KL penalties, early stopping on held-out human evaluation, reward-model ensembles, or refreshed preference data", 2, true],
    ]),
  mcq(m(RH, "transfer-best-of-n", "transfer", 9, 75, "Best-of-$n$ sampling uses a reward model by:"),
    "Generating $n$ responses and returning the one the reward model scores highest, with no weight updates",
    [
      ["Training the policy with PPO", "best-of-n-ppo", "No training happens."],
      ["Averaging $n$ responses", "best-of-n-average", "It picks one."],
      ["Returning a random response", "best-of-n-random", "It picks the highest-scoring one."],
    ]),
  num(m(RH, "transfer-best-of-n-kl", "transfer", 9, 75, "Best-of-$n$ moves the output distribution by about $\\ln n - \\frac{n - 1}{n}$ nats of KL. What is it for $n = 4$? Give $4$ decimal places."), 0.6363),
  short(m(RH, "transfer-length-bias", "transfer", 10, 180, "Why do preference-tuned models often become longer-winded, and how can it be countered?"),
    [
      ["why", "Raters and reward models tend to prefer longer, more thorough-looking answers, so optimisation exploits length", 2, true],
      ["counter", "Control for length in the reward or loss (length penalties or normalisation), balance preference data, and evaluate with length-controlled comparisons", 2, true],
    ]),
  mcq(m(RH, "transfer-grpo", "transfer", 10, 90, "GRPO-style training estimates each response's advantage by:"),
    "Comparing its reward with the other responses sampled for the same prompt, avoiding a learned value network",
    [
      ["Training a separate critic network", "grpo-critic", "It replaces the critic with group statistics."],
      ["Ignoring rewards", "grpo-ignore", "Rewards drive the advantage."],
      ["Using the reference model's likelihood only", "grpo-reference", "Rewards of the group are used."],
    ]),
  short(m(RH, "transfer-noisy-preferences", "transfer", 10, 180, "Annotators disagree on about a quarter of comparisons. How should this shape reward modelling?"),
    [
      ["ceiling", "Agreement sets a ceiling on achievable reward-model accuracy, so a model near that level is doing well", 2, true],
      ["handle", "Model uncertainty (soft labels, rater-specific effects), collect multiple ratings on ambiguous items, and avoid over-optimising a noisy reward", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// knowledge-distillation
// ---------------------------------------------------------------------------
const KD = "knowledge-distillation";
const distillation: Item[] = [
  mcq(m(KD, "recall-sizes", "recall", 1, 15, "In knowledge distillation, typically:"),
    "A large teacher trains a smaller student",
    [
      ["A small teacher trains a larger student", "sizes-reversed", "The student is usually smaller."],
      ["Two identical models train each other from scratch", "sizes-identical", "The teacher is already trained."],
      ["No teacher is used", "sizes-none", "The teacher supplies targets."],
    ]),
  mcq(m(KD, "recall-soft", "recall", 1, 15, "The student is trained to match the teacher's:"),
    "Output probability distribution (soft targets)",
    [
      ["Weights", "soft-weights", "It matches outputs, not weights."],
      ["Training data only", "soft-data", "It matches the teacher's predictions."],
      ["Learning rate", "soft-lr", "Unrelated."],
    ]),
  mcq(m(KD, "recall-hinton", "recall", 1, 15, "The classic paper on distillation with temperature is by:"),
    "Hinton, Vinyals and Dean ($2015$)",
    [
      ["Vaswani et al. ($2017$)", "hinton-vaswani", "That's the transformer."],
      ["He et al. ($2015$)", "hinton-he", "That's ResNet."],
      ["Kingma and Ba ($2014$)", "hinton-adam", "That's Adam."],
    ]),
  mcq(m(KD, "recall-goal", "recall", 1, 15, "The main practical reason to distil a model is to:"),
    "Get a cheaper, faster model that keeps much of the teacher's accuracy",
    [
      ["Make the teacher larger", "goal-larger", "The teacher is unchanged."],
      ["Avoid needing any data", "goal-no-data", "Distillation still needs inputs."],
      ["Increase inference cost", "goal-cost", "It reduces cost."],
    ]),
  num(m(KD, "apply-t1", "apply", 2, 20, "Teacher logits $(2, 0)$ at temperature $T = 1$. What probability does the first class get? Give $4$ decimal places."), 0.8808),
  num(m(KD, "apply-t2", "apply", 2, 20, "The same logits at $T = 2$. Give $4$ decimal places."), 0.7311),
  num(m(KD, "apply-t-squared", "apply", 2, 20, "The soft-target loss is scaled by $T^{2}$. What is the factor for $T = 4$?"), 16),
  num(m(KD, "apply-kl-equal", "apply", 3, 25, "Teacher and student both output $(0.5, 0.5)$. What is the KL divergence between them?"), 0),
  num(m(KD, "apply-combined", "apply", 3, 25, "The loss is $\\alpha \\cdot \\text{hard} + (1 - \\alpha) \\cdot \\text{soft}$ with $\\alpha = 0.5$, hard loss $2$ and soft loss $1$. What is it?"), 1.5),
  num(m(KD, "apply-compression", "apply", 3, 25, "A $340$-million-parameter teacher is distilled into a $66$-million-parameter student. What is the compression ratio? Give $4$ decimal places."), 5.1515),
  num(m(KD, "apply-logit-mse", "apply", 3, 25, "Logit matching uses MSE. Teacher logits $(2, 0)$, student logits $(1, 0)$. What is the MSE?"), 0.5),
  num(m(KD, "apply-sharpen", "apply", 4, 30, "Teacher logits $(2, 0)$ at $T = 0.5$. What probability does the first class get? Give $4$ decimal places."), 0.982),
  num(m(KD, "apply-soft-ce", "apply", 4, 30, "Soft target $(0.7, 0.3)$ and student $(0.5, 0.5)$. What is the cross-entropy $-\\sum p_i\\ln q_i$? Give $4$ decimal places."), 0.6931),
  short(m(KD, "transfer-llm", "transfer", 9, 150, "How is distillation usually done for large language models, compared with classifier distillation?"),
    [
      ["sequence", "Often sequence-level: the teacher generates responses (synthetic data) and the student is fine-tuned on them", 2, true],
      ["logits", "Where teacher logits are available, token-level KL to the teacher's next-token distributions adds richer signal", 2, true],
    ]),
  short(m(KD, "transfer-capacity-gap", "transfer", 9, 150, "Why can a much stronger teacher sometimes produce a worse student than a moderately strong one?"),
    [
      ["gap", "If the student is far too small, it can't represent the teacher's function and the targets are too hard to fit", 2, true],
      ["fix", "Use an intermediate teacher assistant, early-stopped teachers, or tune temperature and loss weights", 2, true],
    ]),
  mcq(m(KD, "transfer-on-policy", "transfer", 9, 75, "On-policy distillation trains the student on:"),
    "Sequences the student itself generates, scored token by token against the teacher",
    [
      ["Only the teacher's own generated sequences", "on-policy-teacher", "That's off-policy distillation."],
      ["Human labels only", "on-policy-human", "The teacher supplies the signal."],
      ["Random tokens", "on-policy-random", "It uses student samples."],
    ]),
  num(m(KD, "transfer-speedup", "transfer", 9, 75, "A student keeps the teacher's width but uses $6$ layers instead of $12$. Roughly what inference speed-up?"), 2),
  short(m(KD, "transfer-dark-knowledge", "transfer", 10, 180, "What is the “dark knowledge” in a teacher's soft targets?"),
    [
      ["relative", "The relative probabilities of wrong classes, e.g. a “7” looking more like a “1” than a “3”", 2, true],
      ["value", "These similarities carry much more information per example than one-hot labels, helping the student generalise", 2, true],
    ]),
  mcq(m(KD, "transfer-fitnets", "transfer", 10, 90, "FitNets-style feature distillation trains the student to:"),
    "Match the teacher's intermediate representations (hints), through a small projection if widths differ",
    [
      ["Copy the teacher's weights", "fitnets-weights", "It matches activations."],
      ["Ignore the teacher's outputs", "fitnets-ignore", "It adds hint losses."],
      ["Use labels only", "fitnets-labels", "It uses the teacher's features."],
    ]),
  short(m(KD, "transfer-unlabelled", "transfer", 10, 180, "How can distillation make use of unlabelled data?"),
    [
      ["labels", "The teacher labels unlabelled inputs with soft targets, so no human labels are needed for those examples", 2, true],
      ["coverage", "Distilling on a large, diverse transfer set helps the student match the teacher across the input distribution", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// quantization
// ---------------------------------------------------------------------------
const QZ = "quantization";
const quantization: Item[] = [
  mcq(m(QZ, "recall-what", "recall", 1, 15, "Quantisation in deep learning means:"),
    "Storing and computing with lower-precision numbers, such as int8 instead of fp32",
    [
      ["Adding more layers", "what-layers", "It changes number formats."],
      ["Removing training data", "what-data", "It acts on weights and activations."],
      ["Using quantum computers", "what-quantum", "Unrelated."],
    ]),
  mcq(m(QZ, "recall-ptq", "recall", 1, 15, "Post-training quantisation (PTQ):"),
    "Quantises an already-trained model, usually with a small calibration set and no retraining",
    [
      ["Retrains the model from scratch", "ptq-retrain", "It needs no full retraining."],
      ["Is applied during pretraining", "ptq-during", "It's after training."],
      ["Increases precision", "ptq-increase", "It reduces precision."],
    ]),
  mcq(m(QZ, "recall-dequantise", "recall", 1, 15, "To dequantise an integer $q$ with scale $s$ and zero point $z$, compute:"),
    "$s(q - z)$",
    [
      ["$q + s$", "dequantise-add", "Scale multiplies."],
      ["$\\frac{q}{z}$", "dequantise-divide", "Subtract the zero point, then scale."],
      ["$q^{s}$", "dequantise-power", "It's affine."],
    ]),
  mcq(m(QZ, "recall-qat", "recall", 1, 15, "Quantisation-aware training (QAT):"),
    "Simulates quantisation in the forward pass during training so the model learns to tolerate it",
    [
      ["Trains in full precision and quantises afterwards", "qat-ptq", "That's PTQ."],
      ["Uses integer gradients only", "qat-integer", "Gradients stay in floating point."],
      ["Removes quantisation", "qat-remove", "It prepares for it."],
    ]),
  num(m(QZ, "apply-factor", "apply", 2, 20, "Storing weights in int8 instead of fp32 shrinks them by what factor?"), 4),
  num(m(QZ, "apply-4bit", "apply", 2, 20, "A $7 \\times 10^{9}$-parameter model at $4$ bits per weight takes how many gigabytes ($10^{9}$ bytes)?"), 3.5),
  num(m(QZ, "apply-levels", "apply", 2, 20, "How many levels does a $3$-bit format have?"), 8),
  num(m(QZ, "apply-scale", "apply", 3, 25, "Symmetric int8 over $[-1.27, 1.27]$ uses scale $s = \\frac{1.27}{127}$. What is $s$?"), 0.01),
  num(m(QZ, "apply-quantise", "apply", 3, 25, "With $s = 0.01$ and zero point $0$, what integer does $0.5$ quantise to?"), 50),
  num(m(QZ, "apply-dequantise", "apply", 3, 25, "With $s = 0.02$ and zero point $0$, what real value does $q = -30$ represent?"), -0.6),
  num(m(QZ, "apply-zero-point", "apply", 3, 25, "Asymmetric uint8 over $[-1, 1.55]$ has $s = \\frac{2.55}{255} = 0.01$. What zero point $z = \\operatorname{round}\\left(\\frac{1}{s}\\right)$ maps $0.0$ correctly?"), 100),
  num(m(QZ, "apply-max-error", "apply", 4, 30, "With round-to-nearest and scale $0.01$, what is the largest rounding error for an in-range value?"), 0.005),
  num(m(QZ, "apply-clip", "apply", 4, 30, "Symmetric int8 over $[-1.27, 1.27]$ with $s = 0.01$. A value of $1.5$ is clipped to $127$. What does it dequantise to?"), 1.27),
  short(m(QZ, "transfer-outliers", "transfer", 9, 150, "Why do activation outliers make LLM quantisation hard, and how does SmoothQuant address them?"),
    [
      ["outliers", "A few channels have huge activations, stretching the range so all other values get very coarse levels", 2, true],
      ["smoothquant", "SmoothQuant divides those activation channels by a factor and multiplies the matching weights by it, moving the difficulty into the easier-to-quantise weights", 2, true],
    ]),
  short(m(QZ, "transfer-kv-cache", "transfer", 9, 150, "Why quantise the KV cache during long-context inference, and what's the risk?"),
    [
      ["why", "The KV cache grows with context and batch, often dominating memory; lower precision lets more context or users fit", 2, true],
      ["risk", "Keys feed attention scores, so errors (especially on outlier channels) can distort attention; per-channel or mixed schemes limit damage", 2, true],
    ]),
  mcq(m(QZ, "transfer-awq", "transfer", 9, 75, "AWQ improves 4-bit weight quantisation by:"),
    "Protecting the weights tied to large activations, scaling those channels before quantising",
    [
      ["Quantising every weight to 1 bit", "awq-binary", "It targets 4-bit with care."],
      ["Retraining the model from scratch", "awq-retrain", "It's post-training."],
      ["Ignoring activations", "awq-ignore", "It's activation-aware."],
    ]),
  num(m(QZ, "transfer-group-overhead", "transfer", 9, 75, "Groups of $128$ weights at $4$ bits each share one fp16 ($16$-bit) scale. What is the average number of bits per weight?"), 4.125),
  short(m(QZ, "transfer-small-models", "transfer", 10, 180, "Why does aggressive quantisation often hurt small models more than large ones?"),
    [
      ["redundancy", "Large models have more redundant parameters, so each weight's error matters less", 2, true],
      ["small", "Small models pack more information per weight, so the same relative noise removes a larger share of what they know", 2, true],
    ]),
  mcq(m(QZ, "transfer-nf4", "transfer", 10, 90, "The NF4 format used in QLoRA chooses its $16$ levels to:"),
    "Match the quantiles of a normal distribution, suiting roughly Gaussian weights",
    [
      ["Be evenly spaced between $-1$ and $1$", "nf4-uniform", "That's uniform int4."],
      ["Represent only positive values", "nf4-positive", "Weights can be negative."],
      ["Follow powers of $2$", "nf4-powers", "That's closer to a float format."],
    ]),
  num(m(QZ, "transfer-bandwidth", "transfer", 10, 90, "Batch-$1$ decoding is memory-bandwidth-bound. Moving from fp16 to $4$-bit weights could speed it up by at most what factor?"), 4),
];

// ---------------------------------------------------------------------------
// variational-inference-vaes
// ---------------------------------------------------------------------------
const VA = "variational-inference-vaes";
const vaes: Item[] = [
  mcq(m(VA, "recall-decoder", "recall", 1, 15, "A VAE's decoder maps:"),
    "A latent code $\\mathbf{z}$ to a distribution over data $p(\\mathbf{x} \\mid \\mathbf{z})$",
    [
      ["Data to a class label", "decoder-label", "That's a classifier."],
      ["Data to a latent distribution", "decoder-encoder", "That's the encoder."],
      ["Noise to a discriminator score", "decoder-gan", "That's GAN vocabulary."],
    ]),
  mcq(m(VA, "recall-elbo", "recall", 1, 15, "The ELBO is:"),
    "A lower bound on the log-likelihood $\\ln p(\\mathbf{x})$",
    [
      ["An upper bound on the log-likelihood", "elbo-upper", "It's a lower bound."],
      ["The exact log-likelihood", "elbo-exact", "It's a bound."],
      ["A classification accuracy", "elbo-accuracy", "It's a likelihood bound."],
    ]),
  num(m(VA, "apply-reparam", "apply", 2, 20, "$z = \\mu + \\sigma\\epsilon$ with $\\mu = 0$, $\\sigma = 2$ and $\\epsilon = -0.5$. What is $z$?"), -1),
  num(m(VA, "apply-elbo", "apply", 2, 20, "The expected reconstruction log-likelihood is $-80$ and the KL term is $10$. What is the ELBO?"), -90),
  num(m(VA, "apply-kl-mean", "apply", 3, 25, "$\\text{KL}(\\mathcal{N}(\\mu, \\sigma^{2}) \\| \\mathcal{N}(0, 1)) = \\frac{1}{2}(\\mu^{2} + \\sigma^{2} - 1 - \\ln\\sigma^{2})$. What is it for $\\mu = 1$ and $\\sigma = 1$?"), 0.5),
  num(m(VA, "apply-kl-var", "apply", 3, 25, "Same formula with $\\mu = 0$ and $\\sigma^{2} = 0.5$. Give $4$ decimal places."), 0.0966),
  num(m(VA, "apply-logvar", "apply", 4, 30, "The encoder outputs $\\ln\\sigma^{2} = 0$. What is $\\sigma$?"), 1),
  num(m(VA, "apply-gap", "apply", 4, 30, "$\\ln p(\\mathbf{x}) = -50$ and the ELBO is $-53$. What is $\\text{KL}(q(\\mathbf{z} \\mid \\mathbf{x}) \\| p(\\mathbf{z} \\mid \\mathbf{x}))$?"), 3),
  mcq(m(VA, "apply-amortised", "apply", 5, 40, "A VAE's encoder performs “amortised” inference, meaning:"),
    "One network predicts the approximate posterior for any input, instead of optimising separate parameters per data point",
    [
      ["Inference is spread over many epochs", "amortised-epochs", "It's about sharing one network."],
      ["The posterior is exact", "amortised-exact", "It's still approximate."],
      ["No encoder is used", "amortised-no-encoder", "The encoder does the amortisation."],
    ]),
  short(m(VA, "explain-blur", "explain", 5, 90, "Why do VAEs with a Gaussian decoder often produce blurry samples?"),
    [
      ["average", "A Gaussian likelihood is like an L2 loss, which is minimised by averaging over plausible outputs", 2, true],
      ["consequence", "When the latent doesn't pin down fine details, the decoder outputs their average, which looks blurry; stronger decoders or adversarial/perceptual losses help", 2, true],
    ]),
  num(m(VA, "apply-kl-two-dims", "apply", 6, 45, "A 2-D diagonal Gaussian posterior has $\\mu = (1, 1)$ and $\\sigma = (1, 1)$. What is its KL to $\\mathcal{N}(\\mathbf{0}, I)$?"), 1),
  num(m(VA, "transfer-beta", "transfer", 7, 60, "A $\\beta$-VAE objective is $\\text{recon} - \\beta\\,\\text{KL}$. With reconstruction log-likelihood $-100$, KL $10$ and $\\beta = 4$, what is it?"), -140),
  short(m(VA, "transfer-vq", "transfer", 7, 120, "How does a VQ-VAE's latent space differ from a standard VAE's, and why is that useful?"),
    [
      ["discrete", "Its latents are discrete codebook entries rather than continuous Gaussian samples", 2, true],
      ["useful", "Discrete tokens avoid posterior collapse and can be modelled by a powerful autoregressive or transformer prior, as in image and audio tokenisers", 2, true],
    ]),
  num(m(VA, "transfer-iwae", "transfer", 8, 60, "IWAE averages importance weights inside the log. With two samples whose log-weights are $0$ and $\\ln 3$, what is $\\ln\\left(\\frac{1}{2}(w_1 + w_2)\\right)$? Give $4$ decimal places."), 0.6931),
  mcq(m(VA, "transfer-kl-annealing", "transfer", 8, 60, "KL annealing during VAE training means:"),
    "Starting with a small weight on the KL term and gradually raising it to $1$",
    [
      ["Removing the KL term permanently", "annealing-remove", "It's restored to full weight."],
      ["Lowering the learning rate", "annealing-lr", "It changes the KL weight."],
      ["Increasing the latent size", "annealing-size", "Size is fixed."],
    ]),
  num(m(VA, "transfer-free-bits", "transfer", 9, 75, "With “free bits” of $\\lambda = 0.5$ nats per dimension, a dimension's KL penalty is $\\max(\\lambda, \\text{KL})$. What is it for a dimension with KL $0.2$?"), 0.5),
  short(m(VA, "transfer-collapse", "transfer", 9, 150, "Why are VAEs with powerful autoregressive decoders prone to posterior collapse?"),
    [
      ["decoder", "The decoder can model the data well on its own, so it learns to ignore $\\mathbf{z}$", 2, true],
      ["kl", "The KL term then pushes $q(\\mathbf{z} \\mid \\mathbf{x})$ to equal the prior, giving uninformative latents; free bits, KL annealing or weaker decoders counter this", 2, true],
    ]),
  short(m(VA, "transfer-latent-diffusion", "transfer", 10, 180, "What role does a VAE play in latent diffusion models like Stable Diffusion?"),
    [
      ["compress", "Its encoder compresses images into a smaller latent space and its decoder maps latents back to pixels", 2, true],
      ["why", "Diffusion runs in that latent space, far cheaper than pixel space, while the light KL regularisation keeps latents well-behaved", 2, true],
    ]),
  num(m(VA, "transfer-bits-per-dim", "transfer", 10, 90, "A VAE's negative ELBO on a $3{,}072$-dimensional image is $3{,}000$ nats. What is that in bits per dimension? Give $4$ decimal places."), 1.4089),
  mcq(m(VA, "transfer-hierarchical", "transfer", 10, 90, "Hierarchical VAEs such as NVAE improve sample quality by:"),
    "Using many layers of latent variables at different scales, each conditioned on the ones above",
    [
      ["Removing the KL term", "hierarchical-no-kl", "Every level keeps a KL term."],
      ["Using a single scalar latent", "hierarchical-scalar", "They use many latents."],
      ["Replacing the decoder with a classifier", "hierarchical-classifier", "They still decode images."],
    ]),
];

export const dlSixty06Items: Item[] = [
  ...scaling,
  ...tokenization,
  ...contrastive,
  ...peft,
  ...rlhf,
  ...distillation,
  ...quantization,
  ...vaes,
];
