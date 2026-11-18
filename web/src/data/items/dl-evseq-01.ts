import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./dl-evseq-shared";

/**
 * Foundation models for event sequences: bespoke vs. foundation models, masked
 * code prediction, next-event prediction, and time-to-event pretraining
 * (MOTOR). Forty questions each, four per level.
 */

// ---------------------------------------------------------------------------
// bespoke-vs-foundation-models
// ---------------------------------------------------------------------------
const BF = "bespoke-vs-foundation-models";
const bespoke: Item[] = [
  // level 1
  mcq(m(BF, "recall-foundation-def", "recall", 1, 15, "A foundation model is best described as:"),
    "A model pretrained once on broad data, usually self-supervised, then adapted to many downstream tasks",
    [
      ["Any model with more than a billion parameters", "fm-size-only", "Size is common but not the definition; reuse across tasks is."],
      ["A model trained on one task’s labels with hand-built features", "fm-is-bespoke", "That describes a bespoke model."],
      ["A rule-based system written by domain experts", "fm-rules", "Foundation models are learned from data, not hand-written."],
    ]),
  mcq(m(BF, "recall-bespoke-def", "recall", 1, 15, "A bespoke (task-specific) model is:"),
    "A model built and trained for one prediction task on that task’s labelled data",
    [
      ["A pretrained model adapted with a linear probe", "bespoke-is-probe", "That is foundation-model adaptation."],
      ["Any model trained on a small dataset", "bespoke-small-data", "Bespoke refers to task-specificity, not dataset size."],
      ["A model that cannot use gradient-based training", "bespoke-no-gradient", "Bespoke models can be neural networks, trees or anything else."],
    ]),
  mcq(m(BF, "recall-linear-probe", "recall", 1, 15, "A linear probe adapts a foundation model by:"),
    "Freezing it and fitting a linear (e.g. logistic) model on its representations",
    [
      ["Retraining every weight on the new labels", "probe-is-finetune", "That is full fine-tuning."],
      ["Removing all but the first layer", "probe-truncate", "The full frozen model is used to compute the representation."],
      ["Pretraining it again on the downstream data without labels", "probe-continued-pretraining", "That is continued pretraining, not probing."],
    ]),
  mcq(m(BF, "recall-homogenisation", "recall", 1, 15, "In the foundation-model literature, “homogenisation” refers to:"),
    "Many downstream systems being built on one base model, so they share its strengths and defects",
    [
      ["Normalising every input feature to zero mean", "homog-normalise", "That is standardisation, unrelated to the term."],
      ["Making all training examples the same length", "homog-padding", "That is padding or truncation."],
      ["Averaging the weights of several models", "homog-averaging", "That is model averaging or souping."],
    ]),

  // level 2
  num(m(BF, "apply-break-even", "apply", 2, 25, "Pretraining costs $\\$60{,}000$. Each bespoke model costs $\\$5{,}000$; each adaptation of the foundation model costs $\\$1{,}000$. What is the smallest number of tasks for which the foundation route is strictly cheaper?"), 16),
  num(m(BF, "apply-total-cost", "apply", 2, 20, "Pretraining costs $\\$20{,}000$ and each adaptation $\\$400$. What does the foundation route cost in total, in dollars, for $10$ tasks?"), 24000),
  num(m(BF, "apply-probe-params", "apply", 2, 20, "A binary logistic-regression probe with a bias term is fitted on $768$-dimensional representations. How many parameters does it have?"), 769),
  mcq(m(BF, "apply-one-big-task", "apply", 2, 25, "A team has one task with $2$ million labelled examples and no other tasks planned. Which is usually the better default?"),
    "A well-tuned bespoke model — nothing amortises pretraining and labels are plentiful",
    [
      ["Pretrain a foundation model first, because it always transfers better", "always-pretrain", "With one task and abundant labels, pretraining's main advantages disappear."],
      ["A linear probe on a random, untrained network", "probe-random", "A random representation carries no learned structure."],
      ["Skip modelling; two million labels are too many to train on", "too-many-labels", "More labels make supervised learning easier, not harder."],
    ]),

  // level 3
  num(m(BF, "apply-amortised-per-task", "apply", 3, 30, "Pretraining takes $2{,}100$ GPU-hours and is shared by $30$ tasks; each task’s fine-tune takes $15$ GPU-hours. What is the foundation route’s total GPU-hours per task, pretraining included?"), 85),
  num(m(BF, "apply-label-saving", "apply", 3, 30, "Labels cost $\\$4$ each. A bespoke model needs $10{,}000$ labels; a probe matches it with $500$. How many dollars of labelling does the probe save on one task?"), 38000),
  num(m(BF, "apply-finetune-storage", "apply", 3, 30, "Twelve tasks each get a fully fine-tuned copy of a $350$-million-parameter model, stored at $2$ bytes per parameter. What is the total storage in GB ($10^{9}$ bytes)?"), 8.4),
  mcq(m(BF, "recall-few-shot-pattern", "recall", 3, 25, "In few-shot EHR benchmarks such as EHRSHOT, the advantage of a pretrained model over a count-based gradient-boosted baseline typically:"),
    "Is largest with few labels and shrinks as the number of labels grows",
    [
      ["Grows steadily as labels increase", "gap-grows", "With many labels the bespoke model learns the structure itself, so the gap narrows."],
      ["Is the same at every label count", "gap-constant", "The advantage depends strongly on label count."],
      ["Appears only once there are millions of labels", "gap-only-many", "It is the reverse: the gain is concentrated in the low-label regime."],
    ]),

  // level 4
  num(m(BF, "apply-break-even-upkeep", "apply", 4, 45, "Pretraining costs $\\$50{,}000$ plus $\\$10{,}000$ per year of upkeep, over a $2$-year horizon. Bespoke models cost $\\$4{,}000$ per task and adaptations $\\$1{,}500$. What is the smallest number of tasks for which the foundation route is strictly cheaper over the horizon?"), 29),
  num(m(BF, "apply-cost-per-task", "apply", 4, 35, "Pretraining costs $\\$40{,}000$ and each adaptation $\\$500$. With $50$ tasks, what is the foundation route’s cost per task in dollars, pretraining included?"), 1300),
  num(m(BF, "apply-label-ratio", "apply", 4, 35, "A bespoke model needs $8{,}000$ labels to reach an AUROC of $0.80$; a probe on a foundation model needs $400$. By what factor does the foundation model reduce the labels needed?"), 20),
  mcq(m(BF, "apply-unseen-codes", "apply", 4, 40, "A foundation model pretrained at hospital A is used at hospital B, which records labs with a local code set never seen in pretraining. The most likely consequence:"),
    "Those codes have no learned embeddings, so their information is lost unless they are mapped or the model is adapted",
    [
      ["The model infers their meaning from the code strings automatically", "codes-self-describing", "Codes are opaque identifiers; an unseen one maps to nothing learned."],
      ["Accuracy improves because the new codes are extra features", "codes-free-features", "Features the model cannot represent add nothing."],
      ["Nothing changes, because labs are never informative", "labs-useless", "Labs are often among the most informative inputs."],
    ]),

  // level 5
  short(m(BF, "explain-amortisation", "explain", 5, 120, "Explain why the economic case for a foundation model depends on the number of downstream tasks."),
    [
      ["fixed-cost", "Pretraining is a large fixed cost paid once, which is spread (amortised) over every task that reuses the model", 2, true],
      ["marginal", "Each additional task costs less to adapt than to build bespoke, so the saving per task accumulates and eventually exceeds the fixed cost (a break-even number of tasks)", 2, true],
    ]),
  mcq(m(BF, "explain-probe-overfit", "explain", 5, 45, "Why is a linear probe less prone than full fine-tuning to overfitting a small labelled set?"),
    "It fits a few hundred parameters on a fixed representation, instead of updating hundreds of millions",
    [
      ["Linear models cannot overfit under any circumstances", "linear-never-overfits", "They can, with many features and few examples — just far less readily here."],
      ["The probe uses the test set for training", "probe-uses-test", "That would be leakage, not a reason it generalises."],
      ["Fine-tuning ignores the labels", "finetune-ignores-labels", "Fine-tuning trains on the labels; that is why it can overfit them."],
    ]),
  mcq(m(BF, "explain-fair-baseline", "explain", 5, 45, "A paper reports a foundation model beating logistic regression by $0.08$ AUROC, but the baseline was untuned and used only $100$ hand-picked features. The main concern:"),
    "The gain may be overstated; it should be compared with a tuned bespoke baseline using full features, such as boosted trees on code counts",
    [
      ["AUROC cannot compare two models", "auroc-invalid", "AUROC compares models fine; the issue is the strength of the baseline."],
      ["Logistic regression always beats foundation models", "lr-always-wins", "Neither always wins; that is why a fair baseline matters."],
      ["$0.08$ AUROC is too small to matter", "gain-too-small", "It is a large gain — if it holds against a fair baseline."],
    ]),
  num(m(BF, "apply-independent-defects", "apply", 5, 45, "Each of $20$ bespoke models independently has a $5\\%$ chance of a serious defect. What is the probability that at least one is defective? Give $4$ decimal places."), 0.6415),

  // level 6
  short(m(BF, "explain-homogenisation-risk", "explain", 6, 150, "Contrast how a defect spreads across $20$ bespoke models and across $20$ models adapted from one shared base, and say what this implies for evaluation."),
    [
      ["independent-vs-correlated", "Bespoke defects are independent, so they rarely hit many models at once; a defect in the shared base reaches all twenty together and in the same direction", 2, true],
      ["evaluation", "The base model itself must be audited (bias, leakage, shift), not only each downstream task, because one flaw is a single point of failure", 2, true],
    ]),
  num(m(BF, "apply-shared-variance", "apply", 6, 60, "All $20$ models share one base that, with probability $0.05$, carries a defect breaking every one of them. What is the variance of the number of defective models?"), 19),
  num(m(BF, "apply-independent-variance", "apply", 6, 50, "Each of $20$ bespoke models is defective independently with probability $0.05$. What is the variance of the number of defective models?"), 0.95),
  mcq(m(BF, "explain-when-bespoke", "explain", 6, 50, "Which situation most favours a bespoke model?"),
    "A narrow task with abundant labels whose key signal (e.g. ECG waveforms) was absent from the pretraining data",
    [
      ["Many related tasks, each with a few hundred labels", "bespoke-many-small", "That is exactly where a shared representation pays off."],
      ["A new hospital with few local labels", "bespoke-new-site", "Few labels favour reusing a pretrained representation."],
      ["Tasks that use the same coded EHR data the model was pretrained on", "bespoke-same-data", "In-distribution inputs are where foundation models do best."],
    ]),

  // level 7
  short(m(BF, "explain-labels-vs-compute", "explain", 7, 150, "In clinical settings, why is the saving in labels often worth more than the saving in compute when moving from bespoke to foundation models?"),
    [
      ["labels-costly", "Clinical labels are expensive and slow: they need expert chart review or long follow-up for outcomes, while compute is comparatively cheap", 2, true],
      ["why-fewer", "Pretraining on unlabelled records puts much of the needed structure into the representation, so each task needs far fewer labels to reach the same accuracy", 2, true],
    ]),
  num(m(BF, "apply-chart-review-saving", "apply", 7, 60, "Chart review costs $\\$30$ per label. Bespoke models need $5{,}000$ labels per task and probes need $600$. How many dollars of labelling are saved across $8$ tasks?"), 1056000),
  num(m(BF, "apply-break-even-labels", "apply", 7, 60, "Pretraining costs $\\$200{,}000$. Each task saves $4{,}400$ labels at $\\$30$ each; ignore other costs. What is the smallest number of tasks for which the foundation route is strictly cheaper?"), 2),
  mcq(m(BF, "apply-coding-transition", "apply", 7, 60, "A foundation model pretrained only on ICD-9-era records is used after the hospital moves to ICD-10. The best response:"),
    "Map codes across versions, or continue pretraining on post-transition data, before adapting it",
    [
      ["Use it unchanged; diagnosis codes mean the same in every version", "codes-version-invariant", "ICD-10 codes are new identifiers the model has never seen."],
      ["Retrain every downstream probe but leave the base alone", "probes-only", "The probes cannot recover information the base cannot represent."],
      ["Drop all diagnosis codes from the input", "drop-diagnoses", "That throws away the most informative inputs."],
    ]),

  // level 8
  short(m(BF, "transfer-probe-or-finetune", "transfer", 8, 150, "You have $300$ labelled examples for a new task. Would you linear-probe or fully fine-tune a $100$-million-parameter foundation model? Justify the choice."),
    [
      ["choice", "Start with a linear probe (or a light, parameter-efficient adaptation) rather than full fine-tuning", 2, true],
      ["reason", "With $300$ labels, updating $100$ million weights overfits and is unstable, while a probe has few parameters and low variance; move to heavier adaptation only if validation shows the probe is underfitting", 2, true],
    ]),
  num(m(BF, "apply-softmax-probe-params", "apply", 8, 50, "A $5$-class softmax probe with biases is fitted on $512$-dimensional representations. How many parameters does it have?"), 2565),
  num(m(BF, "apply-shared-base-storage", "apply", 8, 60, "One frozen $300$-million-parameter base serves $25$ tasks, each with its own $513$-parameter probe. How many parameters are stored in total?"), 300012825),
  mcq(m(BF, "transfer-population-shift", "transfer", 8, 60, "A probe on a foundation model pretrained on adult records falls far below a bespoke model on a paediatric-ward task. The most likely explanation:"),
    "Population shift: the representation was shaped by adults and omits what matters for children",
    [
      ["Probes always underperform bespoke models", "probes-always-worse", "Probes often win in low-label settings; something specific is going on here."],
      ["Paediatric data cannot be modelled", "paeds-unmodellable", "The bespoke model shows it can."],
      ["The probe has too many parameters", "probe-too-big", "A probe is small; the limitation is the representation."],
    ]),

  // level 9
  short(m(BF, "transfer-validation-burden", "transfer", 9, 180, "A hospital must validate every model it deploys. How does moving from many bespoke models to one foundation model change the validation burden?"),
    [
      ["base", "The shared base must be validated once and deeply — for bias, leakage and subgroup performance — because its flaws reach every downstream model", 2, true],
      ["per-task-and-updates", "Each adaptation still needs task-level validation, and any update to the base changes every downstream model at once, forcing revalidation of all of them", 2, true],
    ]),
  short(m(BF, "transfer-base-update", "transfer", 9, 150, "The foundation model is retrained on a year of new data. Why can this be riskier than retraining one bespoke model?"),
    [
      ["all-change", "Every downstream task's representation changes at once, so behaviour can shift simultaneously across all deployed models", 2, true],
      ["probes-stale", "Probes fitted to the old representation no longer match it and must be refitted and revalidated", 2, true],
    ]),
  num(m(BF, "apply-break-even-labels-only", "apply", 9, 75, "A probe needs $400$ labels and a bespoke model $8{,}000$; labels cost $\\$25$ each and pretraining costs $\\$500{,}000$. Counting only labels and pretraining, what is the smallest number of tasks for which the foundation route is strictly cheaper?"), 3),
  mcq(m(BF, "transfer-evaluation-design", "transfer", 9, 75, "Which evaluation best supports the claim that a foundation model beats bespoke models?"),
    "Tuned bespoke baselines at several label counts, across more than one site, on held-out patients",
    [
      ["One site, one task, against an untuned baseline", "eval-weak-baseline", "This is the pattern critiques of clinical foundation models warn about."],
      ["Training-set accuracy of the foundation model", "eval-train-acc", "Training accuracy says nothing about generalisation."],
      ["The foundation model's pretraining loss", "eval-pretrain-loss", "A low pretraining loss does not guarantee useful downstream predictions."],
    ]),

  // level 10
  short(m(BF, "transfer-strategy", "transfer", 10, 180, "A health system has $40$ prediction tasks, most with under $1{,}000$ labels, plus $3$ high-stakes tasks with $500{,}000$ labels each. Propose a modelling strategy and justify it."),
    [
      ["low-label", "Use a foundation model with probes or light fine-tuning for the many low-label tasks, where its label efficiency and amortisation pay off", 2, true],
      ["high-label", "For the high-label, high-stakes tasks, compare tuned bespoke models with fine-tuned foundation models and choose on validation, since abundant labels shrink the pretraining advantage", 2, true],
      ["risk", "Audit and monitor the shared base, because a flaw in it would affect all forty tasks together", 1, false],
    ]),
  short(m(BF, "transfer-public-model", "transfer", 10, 180, "Why might a publicly released clinical foundation model fail to deliver its published gains at your institution?"),
    [
      ["shift", "Your patients, coding practices and code vocabularies differ from the pretraining site, so parts of your records are unseen or mean something different", 2, true],
      ["evaluation", "Published gains may come from different tasks, single-site tests or weak baselines; local adaptation (continued pretraining or fine-tuning) and local validation against tuned baselines are needed", 2, true],
    ]),
  num(m(BF, "apply-break-even-full", "apply", 10, 90, "Over $3$ years: pretraining costs $\\$120{,}000$ plus $\\$20{,}000$ per year of upkeep. Each adaptation costs $\\$2{,}000$ of compute plus $300$ labels; each bespoke model costs $\\$5{,}000$ of compute plus $4{,}000$ labels. Labels cost $\\$40$. What is the smallest number of tasks for which the foundation route is strictly cheaper?"), 2),
  mcq(m(BF, "transfer-choose-by-regime", "transfer", 10, 75, "Two foundation models have the same mean AUROC across $15$ tasks. Model X's gains over bespoke baselines are concentrated in tasks with few labels; model Y's are spread evenly. Most future tasks will have few labels. Choose:"),
    "Model X, because its advantage lies where future tasks will be",
    [
      ["Model Y, because uniform gains are always preferable", "uniform-better", "Uniformity is not the goal; performance on the expected task mix is."],
      ["Either, because the mean AUROCs are equal", "mean-sufficient", "The mean hides how the gain is distributed across label regimes."],
      ["Neither; bespoke models always win with few labels", "bespoke-few-labels", "The low-label regime is where pretrained models usually help most."],
    ]),
];

// ---------------------------------------------------------------------------
// masked-code-prediction
// ---------------------------------------------------------------------------
const MC = "masked-code-prediction";
const masked: Item[] = [
  // level 1
  mcq(m(MC, "recall-objective", "recall", 1, 15, "In masked code prediction, the model is trained to:"),
    "Recover hidden codes in a patient’s record from the codes left visible",
    [
      ["Predict the next code from only the earlier ones", "mc-is-next", "That is next-event (autoregressive) prediction."],
      ["Classify each patient by a human-provided outcome label", "mc-is-supervised", "The targets come from the record itself; no labels are needed."],
      ["Compress the record into as few codes as possible", "mc-is-compression", "The objective is reconstruction of hidden codes, not compression."],
    ]),
  mcq(m(MC, "recall-rate", "recall", 1, 15, "BERT’s default scheme selects what fraction of positions for prediction?"),
    "$15\\%$",
    [
      ["$50\\%$", "rate-half", "Masking half the input leaves too little context."],
      ["$1\\%$", "rate-one", "Too few positions would give very little training signal per sequence."],
      ["$100\\%$", "rate-all", "With every position hidden there is nothing to predict from."],
    ]),
  mcq(m(MC, "recall-801010", "recall", 1, 15, "Of the positions selected for prediction, BERT replaces:"),
    "$80\\%$ with `[MASK]`, $10\\%$ with a random token and leaves $10\\%$ unchanged",
    [
      ["All of them with `[MASK]`", "all-mask", "The 80/10/10 split exists so the model does not only learn about `[MASK]` positions."],
      ["Half with `[MASK]` and half with random tokens", "half-half", "BERT uses 80/10/10, keeping some tokens unchanged."],
      ["All of them with random tokens", "all-random", "Most are replaced by `[MASK]`."],
    ]),
  mcq(m(MC, "recall-bidirectional", "recall", 1, 15, "The encoder used for masked code prediction lets each position attend to:"),
    "Codes on both sides of it, earlier and later",
    [
      ["Only earlier codes", "mc-causal", "That is the causal mask of next-event models."],
      ["Only codes in the same visit", "mc-visit-only", "Attention spans the whole record."],
      ["Only the `[MASK]` positions", "mc-mask-only", "The visible codes are the context it predicts from."],
    ]),

  // level 2
  num(m(MC, "apply-selected-count", "apply", 2, 20, "A record has $80$ codes. Under BERT’s scheme, how many positions are selected for prediction on average?"), 12),
  num(m(MC, "apply-mask-token-count", "apply", 2, 20, "A record has $80$ codes. Under BERT’s scheme, how many are replaced by `[MASK]` on average?"), 9.6),
  num(m(MC, "apply-loss-single", "apply", 2, 20, "The model gives the true code at a masked position probability $0.25$. What is the cross-entropy loss at that position, in nats? Give $4$ decimal places."), 1.3863),
  mcq(m(MC, "apply-loss-scope", "apply", 2, 20, "The masked-prediction loss is computed over:"),
    "Only the positions selected for prediction",
    [
      ["Every position in the record", "loss-all", "Unselected positions are visible inputs, so predicting them would be trivial copying."],
      ["Only the visible positions", "loss-visible", "The visible codes are the context, not the targets."],
      ["Only the first position", "loss-first", "Every selected position contributes."],
    ]),

  // level 3
  num(m(MC, "apply-mean-loss", "apply", 3, 30, "At three masked positions the model gives the true codes probabilities $0.8$, $0.4$ and $0.1$. What is the mean loss in nats? Give $4$ decimal places."), 1.1473),
  num(m(MC, "apply-perplexity", "apply", 3, 25, "The mean masked loss is $2$ nats. What is the perplexity? Give $2$ decimal places."), 7.39),
  num(m(MC, "apply-uniform-loss", "apply", 3, 25, "The vocabulary has $20{,}000$ codes. What loss, in nats, does a model guessing uniformly over it incur? Give $4$ decimal places."), 9.9035),
  mcq(m(MC, "explain-random-replacement", "explain", 3, 30, "Why does BERT replace some selected tokens with random tokens or leave them unchanged, rather than always using `[MASK]`?"),
    "So the model must represent every position well, not just `[MASK]` ones, and because `[MASK]` never appears at fine-tuning time",
    [
      ["To make the loss smaller", "random-smaller-loss", "The aim is a better representation, not a smaller number."],
      ["Because `[MASK]` tokens are expensive to compute", "mask-expensive", "`[MASK]` costs the same as any token."],
      ["To add label noise that regularises the classifier head", "random-label-noise", "The targets are unchanged; only the inputs are corrupted."],
    ]),

  // level 4
  num(m(MC, "apply-random-count", "apply", 4, 35, "A record has $200$ codes. Under BERT’s scheme, how many are replaced by a random code on average?"), 3),
  num(m(MC, "apply-scored-per-epoch", "apply", 4, 40, "A corpus has $1$ million patients averaging $150$ codes each. How many positions are scored in one epoch of masked pretraining at a $15\\%$ selection rate?"), 22500000),
  num(m(MC, "apply-softmax-params", "apply", 4, 40, "The output layer maps a $256$-dimensional hidden state to logits over $30{,}000$ codes, with biases. How many parameters does it have?"), 7710000),
  mcq(m(MC, "apply-shortcut", "apply", 4, 45, "A type 2 diabetes code is masked, but metformin and an HbA1c lab code from the same visit remain visible. The model recovers the diagnosis easily. What has it mostly used?"),
    "Within-visit co-occurrence — a shortcut — rather than inference from the longer history",
    [
      ["Deep physiological reasoning about glucose metabolism", "shortcut-is-reasoning", "The treating drug and monitoring lab give the answer away directly."],
      ["The patient’s demographics alone", "shortcut-demographics", "The co-recorded drug and lab are far stronger cues."],
      ["Nothing; masked codes cannot be recovered", "unrecoverable", "It recovered it — the question is from what."],
    ]),

  // level 5
  short(m(MC, "explain-order-free", "explain", 5, 120, "Why is a masked (order-free) objective a natural fit for the codes inside a single visit?"),
    [
      ["arbitrary-order", "The order of codes within a visit is usually an artefact of export or billing, not a real sequence, so an objective that does not depend on order avoids learning noise", 2, true],
      ["still-time", "The model still needs visit or time embeddings to know which codes co-occurred and when", 2, false],
    ]),
  mcq(m(MC, "explain-time-embedding", "explain", 5, 45, "Positional embeddings tell a masked code model each code’s index in the sequence. What do they miss?"),
    "How much time separates events, and which codes belong to the same visit",
    [
      ["Which code is which", "pos-identity", "The code embedding supplies identity."],
      ["Nothing; index and time are equivalent", "index-is-time", "Gaps between visits vary from hours to years, which an index cannot express."],
      ["Whether a position is masked", "pos-masked", "The `[MASK]` token shows that."],
    ]),
  mcq(m(MC, "explain-cannot-generate", "explain", 5, 45, "Why can a masked code model not directly sample a patient’s future?"),
    "It models each code given both sides of the record, not a left-to-right joint distribution of future events",
    [
      ["It has too few parameters", "too-small", "The limitation is the objective, not the size."],
      ["It has never seen time information", "no-time", "Even with time embeddings, the objective is not generative."],
      ["It can, by masking the last position repeatedly", "mask-last", "Repeated masking does not give a consistent joint distribution over futures."],
    ]),
  num(m(MC, "apply-visit-masking", "apply", 5, 40, "A patient has $10$ visits averaging $12$ codes each. Whole visits are masked at a rate of $15\\%$. How many codes are masked on average?"), 18),

  // level 6
  short(m(MC, "explain-span-masking", "explain", 6, 150, "Why does masking whole visits, or spans of related codes, often give a better representation than masking single codes?"),
    [
      ["blocks-shortcut", "Codes in a visit predict one another (a diagnosis, its drug, its lab), so masking one leaves the answer visible; masking the group removes that shortcut", 2, true],
      ["longitudinal", "The model must then infer the hidden codes from the patient's longer history, which is the structure useful downstream", 2, true],
    ]),
  num(m(MC, "apply-perplexity-three", "apply", 6, 50, "At three masked positions the true codes get probabilities $0.5$, $0.2$ and $0.05$. What is the perplexity of the mean loss? Give $2$ decimal places."), 5.85),
  num(m(MC, "apply-perplexity-factor", "apply", 6, 45, "The mean masked loss falls from $4$ to $3$ nats. By what factor does the perplexity fall? Give $4$ decimal places."), 2.7183),
  mcq(m(MC, "apply-rare-codes", "apply", 6, 50, "A code appearing in $0.001\\%$ of records gets very little training signal. A common remedy:"),
    "Also predict, or map to, its parent in the code hierarchy, so rare codes share statistical strength",
    [
      ["Increase the masking rate for every code to $90\\%$", "mask-more", "That destroys the context without helping rare codes."],
      ["Delete the rare code from all records", "delete-rare", "Rare codes are often the clinically important ones."],
      ["Give the rare code a larger embedding dimension", "bigger-embedding", "More parameters with the same scarce data makes it worse."],
    ]),

  // level 7
  short(m(MC, "explain-auxiliary-task", "explain", 7, 150, "Med-BERT adds prolonged-length-of-stay prediction to masked prediction during pretraining. What can such an auxiliary task add, and what is its risk?"),
    [
      ["adds", "It injects a clinically meaningful, patient-level signal that pure code reconstruction may not emphasise", 2, true],
      ["risk", "It needs labels and can tilt the representation toward that one outcome, helping related tasks but possibly hurting others", 2, true],
    ]),
  num(m(MC, "apply-hierarchy-loss-gap", "apply", 7, 60, "ICD-10-CM has about $70{,}000$ codes, and grouping to three-character categories leaves about $1{,}900$. How much lower, in nats, is the loss of a uniform guess over the categories than over the full codes? Give $4$ decimal places."), 3.6066),
  num(m(MC, "apply-mixture-loss", "apply", 7, 60, "On $70\\%$ of masked positions the model gives the true code probability $0.6$; on the rest, $0.05$. What is the mean loss in nats? Give $4$ decimal places."), 1.2563),
  mcq(m(MC, "explain-accuracy-trap", "explain", 7, 60, "A masked code model reaches very high masked-token accuracy, yet gives poor downstream risk predictions. Why is this possible?"),
    "Accuracy is dominated by frequent, predictable routine codes and says little about the rare outcomes downstream tasks target",
    [
      ["High accuracy always means good downstream performance", "acc-implies-downstream", "The pretext metric and the downstream goal can diverge."],
      ["The model must be overfitting the test set", "acc-overfit", "No test-set leakage is needed to explain this."],
      ["Downstream tasks cannot use masked-pretrained models", "downstream-impossible", "They routinely do, via probes or fine-tuning."],
    ]),

  // level 8
  short(m(MC, "transfer-masking-rate", "transfer", 8, 150, "What goes wrong if the masking rate is set far too low (say $1\\%$) or far too high (say $80\\%$)?"),
    [
      ["too-low", "Too low: very few targets per sequence, so learning is slow and the task is easy", 2, true],
      ["too-high", "Too high: too little visible context remains to infer the hidden codes, so predictions approach guessing and the representation learns little", 2, true],
    ]),
  num(m(MC, "apply-scored-ratio", "apply", 8, 50, "A next-event model scores every position; a masked model scores $15\\%$. How many times as many scored predictions does the next-event model get from the same record? Give $2$ decimal places."), 6.67),
  num(m(MC, "apply-mask-fraction", "apply", 8, 45, "Under BERT’s scheme, what fraction of all positions in a record show the `[MASK]` token?"), 0.12),
  mcq(m(MC, "transfer-leakage", "transfer", 8, 60, "To predict $30$-day readmission at discharge, a representation is computed from the full record, including codes after discharge. The problem:"),
    "Label leakage: post-discharge codes can reveal the readmission, so the input must stop at the prediction time",
    [
      ["None; more context always helps", "more-context", "Context from after the prediction time is not available in practice."],
      ["The record becomes too long to process", "too-long", "Length is a cost, not the main flaw."],
      ["Masked models cannot read post-discharge codes", "cannot-read", "They can — which is exactly the problem."],
    ]),

  // level 9
  short(m(MC, "transfer-readout", "transfer", 9, 150, "How is one patient-level representation obtained from a masked code model for a downstream probe, and what choices matter?"),
    [
      ["pooling", "Take a summary token's output (such as `[CLS]`) or pool the token outputs (mean, or the last visit) into one vector", 2, true],
      ["truncation", "Compute it only from events before the prediction time, and choose the pooling on validation, since it changes what the probe can see", 2, true],
    ]),
  short(m(MC, "transfer-codes-vs-text", "transfer", 9, 150, "Name two ways patient code sequences differ from text that a masked code model has to handle."),
    [
      ["difference-one", "One genuine difference, e.g. codes within a visit are unordered, or the gaps between events are irregular", 2, true],
      ["difference-two", "A second, e.g. a huge heavy-tailed vocabulary spanning several ontologies, hierarchical codes, or very long records", 2, true],
    ]),
  num(m(MC, "apply-attention-cost", "apply", 9, 60, "A $2{,}000$-code record is truncated to $512$ codes. By what factor does self-attention cost fall, taking it as quadratic in length? Give $2$ decimal places."), 15.26),
  mcq(m(MC, "recall-behrt-input", "recall", 9, 45, "BEHRT represents each input code as:"),
    "The sum of a code embedding, an age embedding, a visit-segment embedding and a position embedding",
    [
      ["A one-hot vector with no learned embedding", "one-hot", "BEHRT uses learned embeddings."],
      ["The code's text description run through a language model", "text-description", "BEHRT embeds the code identifier, not its description."],
      ["The code embedding alone", "code-only", "Age and visit embeddings are what give it a sense of time."],
    ]),

  // level 10
  short(m(MC, "transfer-design-masking", "transfer", 10, 180, "Design a masking scheme for records in which each visit’s diagnoses, medications and labs strongly predict one another, and justify it."),
    [
      ["scheme", "Mask whole visits or whole related groups (a diagnosis with its drugs and labs), possibly mixed with some single-code masking", 2, true],
      ["justify", "This blocks the within-visit shortcut and forces inference from the patient's history; mixing keeps the task neither trivial nor impossible", 2, true],
    ]),
  short(m(MC, "transfer-fit-to-question", "transfer", 10, 180, "For a downstream task predicting the time until a heart-failure diagnosis, what does a masked-code representation provide, and what does it not?"),
    [
      ["provides", "A summary of the patient's state from which codes go together, usable by a probe", 2, true],
      ["lacks", "Pretraining did not model order, timing or censoring, so a survival head must be trained on labels — or time-to-event pretraining used instead", 2, true],
    ]),
  num(m(MC, "apply-no-mask-prob", "apply", 10, 60, "Each of a record’s $10$ codes is selected independently with probability $0.15$. What is the probability that none is selected? Give $4$ decimal places."), 0.1969),
  mcq(m(MC, "transfer-abundant-labels", "transfer", 10, 75, "A probe on a masked-pretrained model gives AUROC $0.78$; a gradient-boosted model on code counts trained on $50{,}000$ labels gives $0.80$. The most reasonable conclusion:"),
    "With abundant labels a bespoke baseline can match or beat the representation; the pretrained model's gain is expected mainly with few labels",
    [
      ["Masked pretraining does not work on medical codes", "mlm-fails", "One high-label comparison does not show that; the low-label regime is where it is expected to help."],
      ["The probe must have a bug", "probe-bug", "This pattern is common and needs no bug to explain it."],
      ["Boosted trees are always better than neural networks", "trees-always", "Neither always wins."],
    ]),
];

// ---------------------------------------------------------------------------
// next-event-prediction
// ---------------------------------------------------------------------------
const NE = "next-event-prediction";
const nextEvent: Item[] = [
  // level 1
  mcq(m(NE, "recall-objective", "recall", 1, 15, "Next-event prediction trains a model to:"),
    "Predict each event in a timeline from the events before it",
    [
      ["Recover randomly hidden events from both sides", "ne-is-masked", "That is masked prediction."],
      ["Predict a patient's outcome label from a human annotator", "ne-supervised", "The targets come from the timeline itself."],
      ["Sort events into chronological order", "ne-sorting", "The order is given; the task is predicting what comes next."],
    ]),
  mcq(m(NE, "recall-causal-mask", "recall", 1, 15, "The causal attention mask ensures that:"),
    "Each position attends only to itself and earlier positions",
    [
      ["Each position attends only to later positions", "mask-future", "That would let the model read the answer."],
      ["Attention is limited to a fixed window", "mask-window", "That is local attention, a separate idea."],
      ["Masked codes are hidden at random", "mask-random", "That is the masked-prediction corruption, not the causal mask."],
    ]),
  mcq(m(NE, "recall-chain-rule", "recall", 1, 15, "The joint probability of a timeline $e_1, \\dots, e_n$ is factorised as:"),
    "$\\prod_{i} p(e_i \\mid e_{<i})$",
    [
      ["$\\prod_{i} p(e_i)$", "assume-independent", "That assumes events are independent, which throws away the history."],
      ["$\\sum_{i} p(e_i \\mid e_{<i})$", "sum-not-product", "Conditionals multiply under the chain rule."],
      ["$\\prod_{i} p(e_i \\mid e_{>i})$", "condition-future", "Conditioning on the future reverses the direction."],
    ]),
  mcq(m(NE, "recall-time-tokens", "recall", 1, 15, "In ETHOS-style tokenisation, the time between events is represented by:"),
    "Tokens for quantised time gaps inserted between events",
    [
      ["Nothing; time is discarded", "time-dropped", "Discarding time loses clinically important signal."],
      ["A continuous number appended to every code's name", "time-in-name", "Gaps are binned into dedicated tokens."],
      ["The patient's date of birth only", "time-birth", "Birth date gives age, not gaps between events."],
    ]),

  // level 2
  num(m(NE, "apply-joint-prob", "apply", 2, 20, "A model gives $p(A) = 0.5$, $p(B \\mid A) = 0.4$ and $p(C \\mid A, B) = 0.25$. What is the probability of the sequence $A, B, C$?"), 0.05),
  num(m(NE, "apply-nll-single", "apply", 2, 20, "The true next event is given probability $0.1$. What is its loss in nats? Give $4$ decimal places."), 2.3026),
  num(m(NE, "apply-rollout-risk", "apply", 2, 20, "Of $1{,}000$ sampled one-year futures for a patient, $120$ contain a readmission. What is the estimated one-year readmission risk?"), 0.12),
  mcq(m(NE, "recall-positions-scored", "recall", 2, 20, "For a timeline of $n$ events, how many predictions does next-event training score?"),
    "About $n$ — every position",
    [
      ["About $0.15n$", "scored-fifteen", "That is masked prediction's selection rate."],
      ["Exactly $1$", "scored-one", "Every position predicts its successor."],
      ["About $n^{2}$", "scored-square", "Attention cost is quadratic, but the number of targets is linear."],
    ]),

  // level 3
  num(m(NE, "apply-seq-nll", "apply", 3, 25, "A model gives successive events probabilities $0.2$, $0.5$ and $0.8$. What is the negative log-likelihood of the sequence in nats? Give $4$ decimal places."), 2.5257),
  num(m(NE, "apply-per-token-nll", "apply", 3, 25, "For the same sequence (probabilities $0.2$, $0.5$, $0.8$), what is the mean loss per event in nats? Give $4$ decimal places."), 0.8419),
  num(m(NE, "apply-rollout-se", "apply", 3, 30, "Of $1{,}000$ sampled futures, $120$ contain the event. What is the Monte Carlo standard error of the risk estimate? Give $4$ decimal places."), 0.0103),
  mcq(m(NE, "recall-clmbr-set", "recall", 3, 25, "Codes recorded on the same day have no true order. CLMBR deals with this by:"),
    "Predicting the set of codes on the next day as a multi-label target",
    [
      ["Sorting them alphabetically and predicting one at a time", "alphabetical", "That imposes an artificial order the model would waste capacity learning."],
      ["Discarding all but one code per day", "one-per-day", "That throws away most of the record."],
      ["Using a bidirectional encoder within each day", "bidirectional-day", "CLMBR is an autoregressive model that predicts the next day's codes."],
    ]),

  // level 4
  num(m(NE, "apply-rollouts-needed", "apply", 4, 40, "A risk near $0.1$ is estimated by rollout. How many sampled futures are needed for a standard error of $0.005$?"), 3600),
  num(m(NE, "apply-log-bin", "apply", 4, 35, "Gaps are binned as $[2^{k}, 2^{k+1})$ days for $k = 0, 1, 2, \\dots$. Into which $k$ does a $20$-day gap fall?"), 4),
  num(m(NE, "apply-no-event-prob", "apply", 4, 35, "Events follow a constant intensity of $0.5$ per year. What is the probability of no event in the next $2$ years? Give $4$ decimal places."), 0.3679),
  mcq(m(NE, "apply-mask-bug", "apply", 4, 40, "A bug removes the causal mask during training, and the training loss falls almost to zero. Why?"),
    "Each position can now see the token it is predicting, so the model copies it",
    [
      ["The model has learned the data perfectly", "perfect-learning", "Near-zero loss on next-event prediction is a sign of leakage, not mastery."],
      ["Removing the mask acts as regularisation", "mask-regularises", "It removes the difficulty of the task instead."],
      ["The learning rate became too small", "lr-small", "A small learning rate would slow the loss, not collapse it."],
    ]),

  // level 5
  short(m(NE, "explain-predict-time", "explain", 5, 120, "Why predict the time gap as well as the next code?"),
    [
      ["meaning", "Gaps carry clinical meaning — a readmission after $3$ days differs from one after $3$ years — so dropping them throws away signal", 2, true],
      ["use", "Modelling time lets the model answer horizon questions (does $E$ happen within $H$?) and sample futures on a real clock", 2, true],
    ]),
  mcq(m(NE, "explain-zero-shot", "explain", 5, 45, "Zero-shot risk prediction with a generative next-event model works by:"),
    "Sampling many futures from the patient's history and counting those containing the event within the horizon",
    [
      ["Fitting a logistic regression on labelled outcomes", "zs-probe", "That needs labels; zero-shot does not."],
      ["Reading the probability of the event as the very next token only", "zs-next-only", "The event may happen many steps later within the horizon."],
      ["Masking the event code and recovering it", "zs-masking", "That is masked prediction, which does not simulate futures."],
    ]),
  mcq(m(NE, "explain-exposure-bias", "explain", 5, 45, "Exposure bias in a generative timeline model means:"),
    "At generation time the model conditions on its own samples, which differ from the real histories it was trained on, so errors compound",
    [
      ["The model sees too few patients during training", "exposure-data", "That is data scarcity, a different problem."],
      ["Patients exposed to a drug are over-represented", "exposure-drug", "The term is about training versus generation inputs."],
      ["The causal mask leaks future information", "exposure-leak", "That is leakage, not exposure bias."],
    ]),
  num(m(NE, "apply-pp-loglik", "apply", 5, 45, "A point process has constant intensity $\\lambda = 2$ per year. Events occur at $t = 0.5$ and $t = 1$, and observation ends at $T = 1.5$. What is the log-likelihood $\\sum_i \\log \\lambda - \\int_0^{T} \\lambda\\,ds$? Give $4$ decimal places."), -1.6137),

  // level 6
  short(m(NE, "explain-vs-masked", "explain", 6, 150, "What can a next-event model do that a masked code model cannot, and what does it give up?"),
    [
      ["gains", "It models the joint distribution of the timeline, so it can sample futures and make zero-shot horizon predictions", 2, true],
      ["gives-up", "Each position sees only the past, so the representation of an event cannot use later context, unlike a bidirectional encoder", 2, true],
    ]),
  num(m(NE, "apply-mean-loss-mix", "apply", 6, 45, "Routine codes are $90\\%$ of positions with loss $0.5$; rare outcome codes are $10\\%$ with loss $4$. What is the mean loss per position?"), 0.85),
  num(m(NE, "apply-outcome-share", "apply", 6, 50, "In the same mix ($90\\%$ at loss $0.5$, $10\\%$ at loss $4$), what fraction of the total loss comes from the outcome codes? Give $4$ decimal places."), 0.4706),
  mcq(m(NE, "explain-loss-vs-auroc", "explain", 6, 50, "A change lowers the average next-code loss by $5\\%$, but AUROC for predicting rare strokes falls. How is this possible?"),
    "The loss is dominated by frequent routine codes, so it can improve while prediction of rare outcomes worsens",
    [
      ["It is impossible; lower loss always means better predictions of every event", "loss-monotone", "An average can improve while one rare component gets worse."],
      ["AUROC is not defined for generative models", "auroc-undefined", "Risks from rollouts or probes can be scored by AUROC."],
      ["Strokes are not in the vocabulary", "stroke-missing", "Then AUROC could not have been measured at all."],
    ]),

  // level 7
  short(m(NE, "explain-backdating", "explain", 7, 150, "Why must a representation for a prediction at time $t$ use only events recorded before $t$, and how can back-dated codes break this?"),
    [
      ["why", "Events after $t$ would not exist when the prediction is made, so using them leaks the future and inflates performance", 2, true],
      ["backdating", "Codes entered later (e.g. billing) are often stamped with an earlier event date, so they appear before $t$ though unavailable then; filtering on recording or availability time prevents this", 2, true],
    ]),
  num(m(NE, "apply-rare-rollout-se", "apply", 7, 60, "Of $10{,}000$ sampled futures, $230$ contain the event. What is the Monte Carlo standard error of the risk? Give $4$ decimal places."), 0.0015),
  num(m(NE, "apply-compounding", "apply", 7, 60, "Each generated step independently drifts off-distribution with probability $0.01$. What is the probability a $200$-step rollout never drifts? Give $4$ decimal places."), 0.134),
  mcq(m(NE, "explain-integral-term", "explain", 7, 60, "In the point-process log-likelihood $\\sum_i \\log \\lambda^*(t_i) - \\int_0^{T} \\lambda^*(s)\\,ds$, the integral term rewards:"),
    "Low intensity during the stretches in which nothing happened",
    [
      ["High intensity everywhere", "high-everywhere", "That would make the integral large and the log-likelihood small."],
      ["Predicting the right code at each event", "code-term", "The integral concerns timing, not which code occurs."],
      ["Longer sequences regardless of fit", "longer-better", "It penalises intensity over the observed window."],
    ]),

  // level 8
  short(m(NE, "transfer-ordering", "transfer", 8, 150, "Codes A, B and C share one timestamp, and the training data shuffle their order at random. What goes wrong, and what are two fixes?"),
    [
      ["problem", "The model must spend capacity on a meaningless order, and the likelihood is noisy because many orders are equally real", 2, true],
      ["fixes", "Fix a canonical order (e.g. by code type), or predict the codes at each timestamp as a set with a multi-label loss", 2, true],
    ]),
  num(m(NE, "apply-multilabel-bce", "apply", 8, 60, "The next day has true codes with sigmoid outputs $0.9$, $0.6$ and $0.3$; two absent codes have outputs $0.2$ and $0.1$ (ignore all others). What is the summed binary cross-entropy over these five outputs, in nats? Give $4$ decimal places."), 2.1487),
  num(m(NE, "apply-horizon-risk", "apply", 8, 50, "With a constant hazard of $0.05$ per year, what is the probability of the event within $5$ years? Give $4$ decimal places."), 0.2212),
  mcq(m(NE, "transfer-rollout-vs-probe", "transfer", 8, 60, "For a $5$-year risk, why might you fit a probe on labels rather than estimate it by rollout?"),
    "Long rollouts compound errors and are expensive, while a probe targets the horizon directly",
    [
      ["Rollouts cannot produce probabilities", "rollout-no-prob", "Counting sampled futures gives a probability."],
      ["Probes need no labels", "probe-no-labels", "A probe needs labels; that is the trade-off."],
      ["The causal mask forbids long rollouts", "mask-forbids", "The mask governs training, not rollout length."],
    ]),

  // level 9
  short(m(NE, "transfer-calibration", "transfer", 9, 180, "Zero-shot rollout risks rank patients well but are systematically too high. Why might this happen, and how would you fix it?"),
    [
      ["why", "The generator is biased — exposure bias, sampling temperature, or a pretraining population at higher risk than the target one", 2, true],
      ["fix", "Recalibrate on a labelled sample (e.g. Platt scaling or isotonic regression), or adjust the sampling temperature, and recheck calibration", 2, true],
    ]),
  short(m(NE, "transfer-to-survival", "transfer", 9, 150, "Explain how the point-process likelihood of next-event prediction relates to survival analysis."),
    [
      ["intensity-hazard", "The conditional intensity plays the role of a hazard, and the integral is the cumulative hazard, so its negative exponential is a survival probability", 2, true],
      ["censoring", "The final stretch after the last event, with no event observed, acts like a censored observation", 2, true],
    ]),
  num(m(NE, "apply-kv-cache", "apply", 9, 75, "A $12$-layer model with width $768$ caches keys and values for $4{,}096$ tokens in $2$-byte precision. How many MiB ($2^{20}$ bytes) does the cache take?"), 144),
  mcq(m(NE, "transfer-fair-eval", "transfer", 9, 60, "Which evaluation fairly compares zero-shot rollout risks with a bespoke model?"),
    "Same patients, same prediction time and horizon, censoring handled, with discrimination and calibration both reported",
    [
      ["Different patients for each model, to avoid bias", "different-patients", "Different cohorts make the comparison meaningless."],
      ["Discrimination only, since calibration is cosmetic", "calibration-cosmetic", "Badly calibrated risks mislead decisions."],
      ["The generator's pretraining loss against the bespoke model's AUROC", "loss-vs-auroc", "These are not comparable quantities."],
    ]),

  // level 10
  short(m(NE, "transfer-tokenisation-design", "transfer", 10, 180, "Design a next-event tokenisation for a timeline with codes, numeric lab values and irregular gaps. Justify two of your choices."),
    [
      ["labs", "Turn numeric lab values into tokens, e.g. one per quantile bin of that lab, so they share the vocabulary", 2, true],
      ["time", "Insert gap tokens on a log-spaced scale (minutes to years), since relative resolution matters more than absolute", 2, true],
      ["justify", "Justifies the choices, e.g. the quantile bins adapt to each lab's units and range, and the log bins keep the vocabulary small", 1, false],
    ]),
  short(m(NE, "transfer-already-tte", "transfer", 10, 180, "A colleague says next-event pretraining already provides time-to-event predictions because it can sample futures. Assess the claim."),
    [
      ["partly-true", "In principle yes: with time modelled, rollouts give event-by-horizon probabilities for any outcome", 2, true],
      ["limits", "But rare events need very many samples, long rollouts compound errors, and the objective never targets specific outcomes under censoring — a direct time-to-event objective is more efficient", 2, true],
    ]),
  num(m(NE, "apply-rare-samples", "apply", 10, 75, "A risk near $0.002$ is estimated by rollout. How many samples give a standard error of $10\\%$ of the risk ($0.0002$)?"), 49900),
  mcq(m(NE, "explain-log-bins", "explain", 10, 60, "Why are log-spaced gap bins (e.g. $[1, 2)$, $[2, 4)$, $[4, 8)$ days) preferred to equal-width bins?"),
    "Gaps range from minutes to years and relative differences matter, so equal-width bins either need very many bins or lose the short gaps",
    [
      ["Logarithms are cheaper to compute", "log-cheap", "Speed is not the reason."],
      ["Equal-width bins cannot represent long gaps at all", "equal-cannot", "They can, but only by wasting resolution or bins."],
      ["Log bins remove the need for time tokens", "log-no-tokens", "They are a way of building the tokens."],
    ]),
];

// ---------------------------------------------------------------------------
// time-to-event-pretraining
// ---------------------------------------------------------------------------
const TE = "time-to-event-pretraining";
const timeToEvent: Item[] = [
  // level 1
  mcq(m(TE, "recall-censoring", "recall", 1, 15, "A patient is right-censored for an outcome when:"),
    "Their record ends before the outcome has been observed",
    [
      ["The outcome is observed early", "censor-early-event", "An observed event is not censored."],
      ["Their record is removed for privacy", "censor-privacy", "Censoring is about incomplete follow-up, not redaction."],
      ["They have the outcome twice", "censor-repeat", "Recurrence is a separate issue."],
    ]),
  mcq(m(TE, "recall-motor-labels", "recall", 1, 15, "MOTOR's pretraining labels are:"),
    "The times until each of thousands of codes next occurs, with censoring when the record ends first",
    [
      ["The next code in the sequence", "motor-next-code", "That is next-event prediction."],
      ["Randomly masked codes", "motor-masked", "That is masked prediction."],
      ["Human-annotated diagnoses", "motor-annotated", "The labels come from the records themselves."],
    ]),
  mcq(m(TE, "recall-piecewise", "recall", 1, 15, "In a piecewise-exponential survival model, the hazard is:"),
    "Constant within each time piece, and free to change between pieces",
    [
      ["Constant for all time", "pwe-constant", "That is the plain exponential model."],
      ["Zero inside each piece", "pwe-zero", "Then no event could occur."],
      ["Linear within each piece", "pwe-linear", "It is piecewise constant."],
    ]),
  mcq(m(TE, "recall-survival-hazard", "recall", 1, 15, "The survival function in terms of the hazard $\\lambda$ is:"),
    "$S(t) = \\exp\\!\\left(-\\int_0^{t} \\lambda(s)\\,ds\\right)$",
    [
      ["$S(t) = \\int_0^{t} \\lambda(s)\\,ds$", "s-is-cumhaz", "That is the cumulative hazard."],
      ["$S(t) = \\lambda(t)$", "s-is-hazard", "The hazard is a rate, not a probability of survival."],
      ["$S(t) = 1 - \\lambda(t)\\,t$", "s-linear", "This is only an approximation for tiny $\\lambda t$, and wrong in general."],
    ]),

  // level 2
  num(m(TE, "apply-const-survival", "apply", 2, 20, "With a constant hazard of $0.2$ per year, what is $S(3)$? Give $4$ decimal places."), 0.5488),
  num(m(TE, "apply-cum-hazard", "apply", 2, 25, "The hazard is $0.1$ per year on $[0, 1)$ and $0.3$ per year afterwards. What is the cumulative hazard at $t = 2.5$?"), 0.55),
  num(m(TE, "apply-event-loglik", "apply", 2, 25, "With that hazard ($0.1$ on $[0, 1)$, $0.3$ afterwards), a patient has the event at $t = 2.5$. What is the log-likelihood $\\log \\lambda(t) - \\Lambda(t)$? Give $4$ decimal places."), -1.754),
  mcq(m(TE, "explain-keep-censored", "explain", 2, 20, "Why not simply drop censored patients from training?"),
    "It discards their event-free time and biases risk estimates",
    [
      ["Censored patients are always healthy", "censored-healthy", "Censoring says only that follow-up ended."],
      ["Dropping them is the standard, unbiased approach", "drop-standard", "It biases estimates; the survival likelihood exists to avoid it."],
      ["Censored patients have no codes", "censored-no-codes", "They have records up to the censoring time."],
    ]),

  // level 3
  num(m(TE, "apply-hazard-exp", "apply", 3, 25, "In MOTOR's head, $\\lambda = \\exp(\\boldsymbol{\\beta}^{\\top}\\mathbf{h})$. If $\\boldsymbol{\\beta}^{\\top}\\mathbf{h} = -2$, what is the hazard? Give $4$ decimal places."), 0.1353),
  num(m(TE, "apply-hazard-dot", "apply", 3, 25, "With $\\boldsymbol{\\beta} = [0.5, -1]$ and $\\mathbf{h} = [2, 1]$, what is $\\lambda = \\exp(\\boldsymbol{\\beta}^{\\top}\\mathbf{h})$?"), 1),
  num(m(TE, "apply-task-params", "apply", 3, 30, "There are $8{,}192$ pretraining tasks, each with a $512$-dimensional task vector $\\boldsymbol{\\beta}$. How many parameters do the task vectors take?"), 4194304),
  mcq(m(TE, "explain-censored-as-negative", "explain", 3, 25, "Treating censored patients as “no event” negatives:"),
    "Underestimates risk, because some of them would have had the event after their record ended",
    [
      ["Overestimates risk", "neg-overestimate", "Counting would-be events as non-events pushes risk down."],
      ["Is unbiased if the sample is large", "neg-large-sample", "Sample size does not remove this bias."],
      ["Has no effect on the estimate", "neg-no-effect", "It mislabels some future events as non-events."],
    ]),

  // level 4
  num(m(TE, "apply-pwe-survival", "apply", 4, 40, "Hazards are $0.1$ on $[0, 2)$, $0.04$ on $[2, 5)$ and $0.01$ on $[5, \\infty)$ per year. What is $S(6)$? Give $4$ decimal places."), 0.7189),
  num(m(TE, "apply-pwe-event-loglik", "apply", 4, 40, "With the same hazards ($0.1$ on $[0, 2)$, $0.04$ on $[2, 5)$, $0.01$ afterwards), a patient has the event at $t = 3$. What is the log-likelihood? Give $4$ decimal places."), -3.4589),
  num(m(TE, "apply-projection-params", "apply", 4, 40, "A linear layer with biases maps the $768$-dimensional transformer output to $8$ piece vectors of dimension $512$. How many parameters does it have?"), 3149824),
  mcq(m(TE, "explain-shared-pieces", "explain", 4, 40, "Why does MOTOR share the piece vectors $\\mathbf{h}_j$ across all tasks?"),
    "It makes the tasks-by-pieces hazard matrix low rank, so each extra task costs only one vector",
    [
      ["Because every task has the same hazard", "same-hazard", "Each task's own vector $\\boldsymbol{\\beta}$ gives it different hazards."],
      ["To force the hazard to be constant over time", "force-constant", "Different pieces still have different vectors."],
      ["Because tasks are trained one at a time", "sequential-tasks", "All tasks are trained jointly."],
    ]),

  // level 5
  short(m(TE, "explain-why-tte", "explain", 5, 120, "Why is a time-to-event objective a better fit for clinical prediction than predicting the next code?"),
    [
      ["question", "Clinical questions ask when a specific outcome happens, wherever it falls in the sequence, not which code is next", 2, true],
      ["censoring", "The survival likelihood uses censored patients correctly and gives a full survival curve, so any horizon can be read off", 2, true],
    ]),
  mcq(m(TE, "apply-one-year-risk", "apply", 5, 40, "From a MOTOR-style model's piece hazards, the probability of the event by $1$ year is:"),
    "$1 - S(1)$, with $S$ computed from the cumulative hazard",
    [
      ["The hazard in the first piece", "risk-is-hazard", "A hazard is a rate, not a probability."],
      ["$S(1)$", "risk-is-survival", "$S(1)$ is the probability of no event."],
      ["The sum of the hazards in all pieces", "risk-sum-hazards", "Rates must be multiplied by time and passed through the exponential."],
    ]),
  mcq(m(TE, "recall-tte-metrics", "recall", 5, 40, "Which metrics suit a time-to-event model evaluated on censored test data?"),
    "The time-dependent concordance index and the integrated Brier score",
    [
      ["Accuracy at a $0.5$ threshold", "accuracy", "It ignores time and mishandles censoring."],
      ["Perplexity of the next code", "perplexity", "That evaluates a next-event model, not survival predictions."],
      ["Mean squared error of event times, ignoring censored patients", "mse-drop-censored", "Dropping censored patients biases the evaluation."],
    ]),
  num(m(TE, "apply-full-head-params", "apply", 5, 45, "Instead of shared piece vectors, suppose each (task, piece) pair had its own $512$-dimensional weight vector, with $8{,}192$ tasks and $8$ pieces. How many weights would that take?"), 33554432),

  // level 6
  short(m(TE, "explain-low-rank", "explain", 6, 150, "What does the factorisation $\\lambda_{\\text{task}, j} = \\exp(\\boldsymbol{\\beta}_{\\text{task}}^{\\top}\\mathbf{h}_j)$ assume, and why is that reasonable?"),
    [
      ["assumes", "It assumes the log-hazards of all tasks and pieces lie in a low-dimensional space spanned by a shared patient representation", 2, true],
      ["reasonable", "Outcomes are driven by a common underlying health state, so they are correlated; sharing saves parameters and lets rare tasks borrow strength from common ones", 2, true],
    ]),
  num(m(TE, "apply-param-ratio", "apply", 6, 45, "How many times larger are the per-(task, piece) weights ($33{,}554{,}432$) than MOTOR-style shared task vectors ($4{,}194{,}304$)?"), 8),
  num(m(TE, "apply-first-year-risk", "apply", 6, 45, "The hazard on $[0, 1)$ is $0.3$ per year. What is the probability of the event in the first year? Give $4$ decimal places."), 0.2592),
  mcq(m(TE, "explain-censored-contribution", "explain", 6, 50, "A patient is censored at $4$ years for stroke. Their contribution to the stroke likelihood is:"),
    "$S(4)$, the probability of being stroke-free for $4$ years",
    [
      ["Zero, because no stroke was seen", "censored-zero", "They tell us four stroke-free years happened."],
      ["The hazard at $4$ years", "censored-hazard", "The hazard term belongs to observed events."],
      ["$1 - S(4)$", "censored-one-minus", "That is the probability of a stroke by $4$ years."],
    ]),

  // level 7
  short(m(TE, "explain-informative-censoring", "explain", 7, 150, "Give an EHR example of informative censoring and explain how it biases a MOTOR-style model."),
    [
      ["example", "A concrete example, e.g. the sickest patients transfer to another hospital and leave the record, or healthy patients stop visiting", 2, true],
      ["bias", "The likelihood treats leaving as unrelated to risk, so in the transfer case risk is underestimated (the high-risk leavers look event-free), and pretraining cannot fix this", 2, true],
    ]),
  num(m(TE, "apply-median-const", "apply", 7, 50, "With a constant hazard of $0.1$ per year, what is the median survival time in years? Give $4$ decimal places."), 6.9315),
  num(m(TE, "apply-median-pwe", "apply", 7, 60, "The hazard is $0.2$ per year on $[0, 2)$ and $0.1$ afterwards. What is the median survival time in years? Give $4$ decimal places."), 4.9315),
  mcq(m(TE, "apply-adapt-new-outcome", "apply", 7, 60, "Adapting MOTOR to a new outcome with few labels is closest to:"),
    "Fitting a new task vector $\\boldsymbol{\\beta}$ on the frozen piece representations, or fine-tuning",
    [
      ["Pretraining a new model from scratch", "adapt-scratch", "That throws away the pretrained representation."],
      ["Masking the outcome code and recovering it", "adapt-mask", "That is a different pretraining objective."],
      ["Reading the outcome's probability as the next token", "adapt-next-token", "MOTOR's output is a survival curve, not a next-token distribution."],
    ]),

  // level 8
  short(m(TE, "transfer-task-selection", "transfer", 8, 150, "MOTOR pretrains on thousands of codes as tasks. What makes a code a good pretraining task, and why not use every code?"),
    [
      ["good-task", "Common enough to have many observed events, informative rather than routine or near-certain, and varied across clinical areas", 2, true],
      ["not-all", "Vocabularies are huge and heavy-tailed: very rare codes give almost no events to learn from and add cost, so a selected subset gives more signal per parameter", 2, true],
    ]),
  num(m(TE, "apply-two-task-loglik", "apply", 8, 60, "At one prediction time, task A has the event at $t = 1.5$ with constant hazard $0.4$, and task B is censored at $t = 1.5$ with constant hazard $0.1$. Treating the tasks as independent, what is the total log-likelihood? Give $4$ decimal places."), -1.6663),
  num(m(TE, "apply-five-year-risk", "apply", 8, 50, "The hazard is $0.08$ on $[0, 1)$ and $0.03$ on $[1, 5)$ per year. What is the $5$-year risk? Give $4$ decimal places."), 0.1813),
  mcq(m(TE, "explain-full-curve", "explain", 8, 60, "Why does MOTOR output a full survival curve per task rather than one probability at a fixed horizon?"),
    "Any horizon can be read from the same model without retraining, with censoring handled consistently",
    [
      ["Curves are cheaper to store than one number", "curve-cheaper", "Storage is not the reason."],
      ["Fixed-horizon probabilities cannot be computed from hazards", "horizon-impossible", "They can: $1 - S(H)$."],
      ["To avoid needing a transformer", "curve-no-transformer", "The curve comes from the transformer's output."],
    ]),

  // level 9
  short(m(TE, "transfer-compare-objectives", "transfer", 9, 180, "Compare masked, next-event and time-to-event pretraining by what each representation is pushed to learn."),
    [
      ["masked", "Masked prediction learns which codes go together, from context on both sides", 2, true],
      ["next-event", "Next-event prediction learns order and can generate futures, with timing if it is modelled", 2, true],
      ["tte", "Time-to-event pretraining learns when specific outcomes happen, under censoring, for many outcomes at once — closest to downstream survival tasks", 2, true],
    ]),
  short(m(TE, "transfer-auroc-pitfall", "transfer", 9, 150, "Why is AUROC on a yes/no “event within $10$ years” label misleading for a survival model on EHR data?"),
    [
      ["censoring", "Patients censored before $10$ years have unknown labels; dropping them or counting them as negatives biases the evaluation", 2, true],
      ["alternative", "It also ignores timing; use censoring-aware metrics such as the time-dependent C-index or IPCW-weighted measures", 2, true],
    ]),
  num(m(TE, "apply-c-index", "apply", 9, 90, "Four patients (time, status, predicted risk): A $(1,\\ \\text{event},\\ 0.9)$, B $(3,\\ \\text{event},\\ 0.5)$, C $(2,\\ \\text{censored},\\ 0.95)$, D $(2.5,\\ \\text{event},\\ 0.6)$. A pair is comparable when the patient with the shorter time had an event. What is Harrell's C-index?"), 0.75),
  mcq(m(TE, "transfer-short-follow-up", "transfer", 9, 60, "A MOTOR probe is moved to a health system with much shorter follow-up. The main effect:"),
    "More patients are censored early, so few events inform the late pieces and long-horizon estimates become uncertain",
    [
      ["Long-horizon risks become more accurate", "short-more-accurate", "Less follow-up means less information about late times."],
      ["The model can no longer produce survival curves", "no-curves", "It still produces them; they are just less certain late on."],
      ["Censoring disappears", "no-censoring", "Shorter follow-up increases censoring."],
    ]),

  // level 10
  short(m(TE, "transfer-bank-design", "transfer", 10, 180, "Adapt MOTOR's design to a bank’s customer histories, with events such as default, churn and product purchase."),
    [
      ["tasks", "Treat event types as tasks with labels = time to next occurrence from each prediction point, censored at account closure or the end of data", 2, true],
      ["head", "Use a sequence model over transactions with a piecewise-exponential head: shared piece vectors and a per-task vector", 2, true],
      ["caveats", "Check for informative censoring (e.g. customers leaving before default) and evaluate with censoring-aware metrics", 1, false],
    ]),
  short(m(TE, "transfer-piece-boundaries", "transfer", 10, 180, "How should piece boundaries be chosen, and what goes wrong with too few or too many pieces?"),
    [
      ["choose", "Place boundaries where events are dense, e.g. at quantiles of event times or on a log scale, so each piece has enough events", 2, true],
      ["trade-off", "Too few pieces force a crude, biased hazard shape; too many leave few events per piece, giving noisy estimates and more parameters", 2, true],
    ]),
  num(m(TE, "apply-three-piece-loglik", "apply", 10, 75, "Hazards are $0.4$ on $[0, 0.5)$, $0.1$ on $[0.5, 2)$ and $0.05$ on $[2, \\infty)$ per year. A patient has the event at $t = 3$. What is the log-likelihood? Give $4$ decimal places."), -3.3957),
  mcq(m(TE, "transfer-label-regimes", "transfer", 10, 75, "A MOTOR probe and a bespoke Cox model have equal C-index with $50{,}000$ labels; with $500$ labels the probe is far better. The explanation most consistent with this chapter:"),
    "The pretrained representation supplies structure that a small labelled set cannot, while with many labels the bespoke model learns it itself",
    [
      ["The Cox model is broken at small sample sizes", "cox-broken", "It is working as expected; it simply has little data."],
      ["Probes always beat Cox models", "probes-always", "At $50{,}000$ labels they tie."],
      ["The C-index is unreliable at $500$ labels", "cindex-unreliable", "A noisier estimate does not explain a consistent large gap."],
    ]),
];

export const dlEvseq01Items: Item[] = [...bespoke, ...masked, ...nextEvent, ...timeToEvent];
