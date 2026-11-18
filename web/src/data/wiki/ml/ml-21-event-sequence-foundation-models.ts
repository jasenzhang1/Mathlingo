import type { WikiArticle } from "../types";

/**
 * Foundation models for event sequences: the build-or-adapt decision, then the
 * three pretraining objectives for patient timelines in the order they grew
 * more faithful to the data — masked codes, next events, and time-to-event
 * pretraining (MOTOR).
 */

const bommasani =
  "Bommasani et al., On the Opportunities and Risks of Foundation Models (Stanford CRFM, 2021)";
const shaky =
  "Wornow et al., The shaky foundations of large language models and foundation models for electronic health records (npj Digital Medicine, 2023)";
const ehrshot =
  "Wornow et al., EHRSHOT: An EHR Benchmark for Few-Shot Evaluation of Foundation Models (NeurIPS Datasets & Benchmarks, 2023)";
const bert =
  "Devlin et al., BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding (NAACL, 2019)";
const behrt = "Li et al., BEHRT: Transformer for Electronic Health Records (Scientific Reports, 2020)";
const medbert =
  "Rasmy et al., Med-BERT: pretrained contextualized embeddings on large-scale structured electronic health records for disease prediction (npj Digital Medicine, 2021)";
const clmbr =
  "Steinberg et al., Language models are an effective representation learning technique for electronic health record data (Journal of Biomedical Informatics, 2021)";
const ethos =
  "Renc et al., Zero shot health trajectory prediction using transformer (npj Digital Medicine, 2024)";
const motor =
  "Steinberg et al., MOTOR: A Time-to-Event Foundation Model for Structured Medical Records (ICLR, 2024)";

// ---------------------------------------------------------------------------
// bespoke-vs-foundation-models
// ---------------------------------------------------------------------------
const bespokeVsFoundation: WikiArticle = {
  conceptId: "bespoke-vs-foundation-models",
  summary:
    "A bespoke model is trained for one task on that task's labelled data — a readmission model, a sepsis " +
    "model, a churn model, each built from scratch. A foundation model is pretrained once, self-supervised, " +
    "on a large unlabelled corpus, and then adapted to many tasks with a linear probe or a short fine-tune. " +
    "The choice between them is not about which is more modern: it is an accounting question about labels, " +
    "compute, maintenance and shared risk, and the answer flips depending on how many tasks you have and how " +
    "many labels each one comes with.",

  sections: [
    {
      heading: "The two pipelines",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Bespoke (task-specific) model",
              description:
                "Features and model are chosen for one prediction target, and trained only on examples labelled for it. In tabular and EHR settings the strong baseline is usually gradient-boosted trees or regularised logistic regression on count features.",
            },
            {
              term: "Foundation model",
              description:
                "A large model pretrained with a self-supervised objective on broad data, whose representation is then reused. The term is from Bommasani et al. (2021): the model is a foundation because many downstream systems are built on it.",
            },
            {
              term: "Linear probe",
              description:
                "Freeze the foundation model, compute its representation $\\mathbf{h}(x)$ for each example, and fit a logistic regression on $\\mathbf{h}(x)$. Cheap, hard to overfit, and the standard way to measure how much a representation already knows.",
            },
            {
              term: "Fine-tuning",
              description:
                "Continue training some or all of the foundation model's weights on the task's labels. Usually more accurate than a probe given enough labels, and more expensive and fragile.",
            },
          ],
        },
        {
          kind: "table",
          headers: ["", "Bespoke", "Foundation + adaptation"],
          rows: [
            ["Labels needed per task", "Many", "Few (the representation carries the rest)"],
            ["Up-front cost", "None", "One large pretraining run"],
            ["Marginal cost per new task", "Full build and validation", "A probe or short fine-tune"],
            ["Failure modes", "Independent across tasks", "Shared — a flaw in the base reaches every task"],
            ["Inspectability", "Often high (trees, sparse linear models)", "Low; a dense learned representation"],
            ["Transfer to a new hospital or market", "Rebuild", "Often adapts with few local labels, but not guaranteed"],
          ],
        },
      ],
    },
    {
      heading: "The arithmetic of amortisation",
      blocks: [
        {
          kind: "prose",
          text:
            "Pretraining is a fixed cost $C_p$ paid once. If each adaptation costs $c_f$ and each bespoke build " +
            "costs $c_b > c_f$, then serving $N$ tasks costs $C_p + N c_f$ one way and $N c_b$ the other. The " +
            "foundation route wins once",
        },
        {
          kind: "formula",
          latex: "N > \\frac{C_p}{c_b - c_f}",
          caption: "Break-even number of tasks",
        },
        {
          kind: "example",
          title: "When does pretraining pay for itself?",
          problem:
            "Pretraining costs $\\$40{,}000$. Each bespoke model costs $\\$3{,}000$ to build and validate; each " +
            "adaptation of the foundation model costs $\\$500$. How many tasks are needed before the foundation " +
            "route is cheaper?",
          steps: [
            "Saving per task: $c_b - c_f = 3{,}000 - 500 = 2{,}500$ dollars.",
            "Break-even: $N > 40{,}000 / 2{,}500 = 16$.",
            "At $N = 16$ the two routes tie at $\\$48{,}000$; at $N = 17$ the foundation route costs $\\$48{,}500$ against $\\$51{,}000$.",
          ],
          answer:
            "$17$ tasks. With one or two tasks the bespoke route is cheaper outright, which is why a single, well-labelled problem rarely justifies pretraining.",
        },
        {
          kind: "prose",
          text:
            "Money is the easy part. The larger saving is in labels: a representation pretrained on millions of " +
            "unlabelled records can reach with a few hundred labels the accuracy a bespoke model needs thousands " +
            "for. Benchmarks such as EHRSHOT show exactly this pattern — the pretrained model's advantage is " +
            "largest in the few-shot regime and shrinks as labels become plentiful, where a tuned " +
            "gradient-boosted model on counts is often competitive.",
        },
      ],
    },
    {
      heading: "When bespoke still wins",
      blocks: [
        {
          kind: "list",
          items: [
            "Labels are abundant and the task is narrow — the representation has nothing left to contribute that the labels do not.",
            "The task lives outside the pretraining distribution: a different population, a coding system the model never saw, or a signal (waveforms, images) the pretraining corpus did not contain.",
            "Inspectability, latency or regulatory validation dominate, and a sparse model whose every feature can be defended is worth more than a point of AUROC.",
            "There is only one task, so nothing amortises the pretraining cost.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Homogenisation",
          text:
            "When twenty deployed models share one base, a defect in the base — a leaked label, a biased " +
            "subpopulation, a coding change it never saw — fails all twenty at once, and in the same direction. " +
            "Bespoke models fail independently. Shared failure is the hidden cost on the foundation side of the " +
            "ledger, and it argues for evaluating the base itself, not only each downstream task.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Compare at equal tuning effort",
          text:
            "Foundation-model papers often compare a carefully adapted model against an untuned baseline. " +
            "Wornow et al. (2023) found that many clinical foundation-model claims rest on such comparisons, on " +
            "a single site, or on tasks that do not reflect deployment. A fair comparison tunes the bespoke " +
            "baseline too, and reports performance across the full range of label counts.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "What comes next",
          text:
            "The rest of this chapter is about the pretraining objective — what the model is asked to predict " +
            "about unlabelled patient timelines. The objective decides what the representation knows, and so " +
            "which downstream tasks it helps.",
        },
      ],
    },
  ],

  references: [
    { source: bommasani, locator: "§1.1 (emergence and homogenization)" },
    { source: shaky, locator: "Full paper (evaluation critique)" },
    { source: ehrshot, locator: "Results (few-shot comparison with count-based baselines)" },
  ],
};

// ---------------------------------------------------------------------------
// masked-code-prediction
// ---------------------------------------------------------------------------
const maskedCodePrediction: WikiArticle = {
  conceptId: "masked-code-prediction",
  summary:
    "A patient's structured record is a sequence of medical codes — diagnoses, procedures, medications, labs — " +
    "grouped into visits. Masked code prediction is BERT's pretraining objective carried over to that sequence: " +
    "hide a random subset of codes and train a bidirectional transformer to recover each one from everything " +
    "else in the record. It needs no labels, it uses context on both sides, and it suits data whose order " +
    "within a visit is arbitrary. BEHRT and Med-BERT are the standard examples.",

  sections: [
    {
      heading: "The objective",
      blocks: [
        {
          kind: "prose",
          text:
            "Write the record as codes $x_1, \\dots, x_n$ from a vocabulary $\\mathcal{V}$. Choose a random set " +
            "$M$ of positions, corrupt them to get $\\tilde{\\mathbf{x}}$, and maximise the probability of the " +
            "originals given the corrupted record:",
        },
        {
          kind: "formula",
          latex:
            "\\mathcal{L}_{\\text{MLM}} = -\\,\\mathbb{E}_{M}\\left[\\frac{1}{|M|}\\sum_{i \\in M} \\log p_\\theta\\big(x_i \\mid \\tilde{\\mathbf{x}}\\big)\\right]",
          caption: "Cross-entropy over the vocabulary, averaged over masked positions only",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Masking rate",
              description:
                "BERT selects $15\\%$ of positions. Of those, $80\\%$ are replaced by a `[MASK]` token, $10\\%$ by a random code and $10\\%$ left unchanged — so the model cannot learn that only `[MASK]` positions matter, and the token it sees at fine-tuning time is never `[MASK]`.",
            },
            {
              term: "Code, visit and time embeddings",
              description:
                "Each input is the sum of a code embedding and embeddings for its visit (segment) and the patient's age or date. Without them a bag of codes loses when things happened. BEHRT adds age and visit-segment embeddings; CEHR-BERT adds explicit time-interval tokens.",
            },
            {
              term: "Bidirectional context",
              description:
                "Every position attends to every other, including later visits. That is what makes the representation rich, and also what makes it unable to generate a future.",
            },
          ],
        },
      ],
    },
    {
      heading: "A worked example",
      blocks: [
        {
          kind: "example",
          title: "Counting masks and scoring a prediction",
          problem:
            "A record has $60$ codes and BERT's masking scheme is used. In one draw, three of the selected " +
            "positions are scored, and the model gives the true code probabilities $0.5$, $0.2$ and $0.05$. " +
            "How many positions are selected and replaced by `[MASK]` on average, and what are the mean masked " +
            "loss and its perplexity?",
          steps: [
            "Selected: $0.15 \\times 60 = 9$ positions on average; of those $0.8 \\times 9 = 7.2$ become `[MASK]`, $0.9$ become random codes and $0.9$ stay unchanged.",
            "Losses: $-\\ln 0.5 = 0.6931$, $-\\ln 0.2 = 1.6094$, $-\\ln 0.05 = 2.9957$.",
            "Mean: $(0.6931 + 1.6094 + 2.9957)/3 = 1.7661$ nats.",
            "Perplexity: $e^{1.7661} = (2 \\times 5 \\times 20)^{1/3} = \\sqrt[3]{200} \\approx 5.85$.",
          ],
          answer:
            "$9$ selected, $7.2$ masked; loss $1.7661$, perplexity $5.85$ — the model is as uncertain as a uniform guess among about six codes.",
        },
      ],
    },
    {
      heading: "Making it work on medical codes",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Shortcuts through correlated codes",
          text:
            "Codes arrive in tight clusters: a diagnosis, the drug that treats it and the lab that monitors it. " +
            "Mask the diagnosis alone and the drug reveals it — the model learns billing co-occurrence rather " +
            "than physiology. Masking whole visits, or spans of related codes, forces it to infer from the " +
            "longer history instead.",
        },
        {
          kind: "list",
          items: [
            "Vocabularies are large (tens of thousands of ICD, CPT, RxNorm and LOINC codes) and heavy-tailed, so rare codes get little signal; mapping to a coarser level of the code hierarchy, or predicting the parent as well, helps.",
            "Order within a visit is usually an artefact of how codes were exported, so an order-free objective is a natural fit — the transformer still needs visit and time embeddings to know which codes co-occurred.",
            "Auxiliary supervised targets can be added: Med-BERT also predicts prolonged length of stay during pretraining.",
            "The representation is read out at the first token or by pooling, then probed or fine-tuned on a downstream label.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "What masking cannot do",
          text:
            "A masked model scores the record it is shown; it does not model the joint distribution of " +
            "futures, so it cannot sample what happens next or say when. That requires a left-to-right " +
            "factorisation — the next lesson.",
        },
      ],
    },
  ],

  references: [
    { source: bert, locator: "§3.1 (masked LM and the 80/10/10 rule)" },
    { source: behrt, locator: "Methods (embeddings and pretraining)" },
    { source: medbert, locator: "Methods (pretraining tasks)" },
  ],
};

// ---------------------------------------------------------------------------
// next-event-prediction
// ---------------------------------------------------------------------------
const nextEventPrediction: WikiArticle = {
  conceptId: "next-event-prediction",
  summary:
    "Next-event prediction trains a causal (left-to-right) transformer to predict each event in a patient " +
    "timeline from everything before it. It is the language-model objective applied to medical events, and " +
    "because it models the joint distribution of the whole sequence it can do something a masked model " +
    "cannot: sample plausible futures. Adding time — as time-interval tokens or as a separate time head — " +
    "turns it from predicting what comes next into predicting what comes next and when. CLMBR, ETHOS and " +
    "CEHR-GPT are examples.",

  sections: [
    {
      heading: "The objective",
      blocks: [
        {
          kind: "formula",
          latex:
            "p_\\theta(e_1, \\dots, e_n) = \\prod_{i=1}^{n} p_\\theta(e_i \\mid e_{<i}), \\qquad \\mathcal{L} = -\\sum_{i=1}^{n} \\log p_\\theta(e_i \\mid e_{<i})",
          caption: "The chain rule of probability, learned with a causal mask",
        },
        {
          kind: "prose",
          text:
            "Every position is a training example, so one patient contributes $n$ predictions rather than the " +
            "$15\\%$ a masked model scores. The causal mask stops each position attending to the future; " +
            "without it the model reads the answer.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Event",
              description:
                "A pair $(c_i, t_i)$ of a code and a timestamp. Predicting only $c_i$ throws away the gaps, which carry much of the clinical signal: a second admission after $3$ days is not the same as one after $3$ years.",
            },
            {
              term: "Time tokens",
              description:
                "Quantise the gap $t_i - t_{i-1}$ into bins and insert a token for it (ETHOS, CEHR-GPT). Time then becomes something the model predicts like any other token.",
            },
            {
              term: "Temporal point process view",
              description:
                "Alternatively model a conditional intensity $\\lambda^*(t)$ of the next event; the log-likelihood is $\\sum_i \\log \\lambda^*(t_i) - \\int_0^T \\lambda^*(s)\\,ds$. The integral is the probability of nothing happening in between, and it is what links this lesson to survival analysis.",
            },
            {
              term: "Simultaneous events",
              description:
                "Codes stamped with the same time have no true order. Models either fix a canonical order, or predict the next visit's codes as a set (multi-label sigmoid outputs), as CLMBR does for the next day.",
            },
          ],
        },
      ],
    },
    {
      heading: "A worked example",
      blocks: [
        {
          kind: "example",
          title: "Scoring a sequence and estimating a risk by simulation",
          problem:
            "A model gives $p(A) = 0.3$, $p(B \\mid A) = 0.4$ and $p(C \\mid A, B) = 0.5$. What is the " +
            "negative log-likelihood of the sequence $A, B, C$? Separately, $1{,}000$ one-year futures are " +
            "sampled for a patient and $87$ contain a heart-failure admission. Estimate the one-year risk and " +
            "its Monte Carlo standard error.",
          steps: [
            "Joint probability: $0.3 \\times 0.4 \\times 0.5 = 0.06$.",
            "NLL: $-\\ln 0.06 = 2.8134$ nats — the sum of the three per-step losses.",
            "Risk: $\\hat p = 87 / 1{,}000 = 0.087$.",
            "Standard error: $\\sqrt{0.087 \\times 0.913 / 1{,}000} \\approx 0.0089$.",
          ],
          answer:
            "NLL $2.8134$; risk $0.087 \\pm 0.009$. The risk came with no task-specific training at all — it is a zero-shot prediction read off the generative model.",
        },
      ],
    },
    {
      heading: "Strengths and traps",
      blocks: [
        {
          kind: "callout",
          tone: "insight",
          title: "Zero-shot prediction by rollout",
          text:
            "Because the model is generative, any question of the form “does event $E$ happen within horizon " +
            "$H$?” can be answered by sampling many futures and counting. ETHOS does this for mortality and " +
            "readmission without fine-tuning. The estimate inherits every bias of the generator, and its error " +
            "compounds over long horizons as samples drift off the data distribution.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Exposure bias and frequent codes",
          text:
            "Trained on real histories and run on its own samples, the model meets inputs it never saw in " +
            "training. And because the loss is dominated by frequent, routine codes — vitals, common labs — a " +
            "low average loss can hide poor prediction of the rare outcomes a clinician cares about.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Leakage through the timeline",
          text:
            "When a representation is extracted for a downstream label, it must stop at the prediction time. " +
            "Events recorded after it — including codes entered later but back-dated to an earlier timestamp — " +
            "give the answer away.",
        },
        {
          kind: "table",
          headers: ["", "Masked codes", "Next event"],
          rows: [
            ["Context", "Both sides", "Past only"],
            ["Scored positions", "About $15\\%$", "All"],
            ["Can sample futures", "No", "Yes"],
            ["Handles time", "Only as an input", "As a prediction target, if modelled"],
            ["Within-visit order", "Irrelevant", "Must be fixed or treated as a set"],
          ],
        },
      ],
    },
  ],

  references: [
    { source: clmbr, locator: "Methods (CLMBR pretraining objective)" },
    { source: ethos, locator: "Methods (tokenisation of time and zero-shot inference)" },
  ],
};

// ---------------------------------------------------------------------------
// time-to-event-pretraining
// ---------------------------------------------------------------------------
const timeToEventPretraining: WikiArticle = {
  conceptId: "time-to-event-pretraining",
  summary:
    "Most clinical questions are time-to-event questions — when will this patient be diagnosed, readmitted, " +
    "or die — and most of their labels are censored. MOTOR (Steinberg et al., 2024) makes the pretraining " +
    "objective itself a survival problem: from each point in a patient's timeline it predicts, for thousands " +
    "of codes at once, the time until that code next appears, with censoring handled by the likelihood. A " +
    "piecewise-exponential head keeps this tractable, and the resulting model adapts to new time-to-event " +
    "tasks with few labels.",

  sections: [
    {
      heading: "Why a survival objective",
      blocks: [
        {
          kind: "prose",
          text:
            "Next-event prediction asks which code is next. A survival question asks how long until a " +
            "particular code — wherever it falls in the sequence — and must cope with patients who leave the " +
            "health system before it happens. Dropping them biases risk downwards; treating them as negatives " +
            "biases it further. The survival likelihood uses them correctly: a censored patient contributes the " +
            "probability of surviving to the censoring time.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Pretraining tasks",
              description:
                "Thousands of codes (MOTOR uses $8{,}192$) chosen to be informative. At each prediction time and for each task, the label is the time to that code's next occurrence, or a censoring time if the record ends first.",
            },
            {
              term: "Hazard",
              description:
                "$\\lambda(t)$, the instantaneous event rate at $t$ given survival to $t$. The survival function is $S(t) = \\exp\\!\\left(-\\int_0^t \\lambda(s)\\,ds\\right)$.",
            },
            {
              term: "Piecewise-exponential model",
              description:
                "Split time into pieces $[b_{j-1}, b_j)$ and hold the hazard constant at $\\lambda_j$ on each. The cumulative hazard is then a sum of rate × time spent in each piece.",
            },
          ],
        },
      ],
    },
    {
      heading: "The likelihood and the head",
      blocks: [
        {
          kind: "formula",
          latex:
            "\\log L = \\delta \\, \\log \\lambda_{k(t)} \\; - \\; \\sum_{j} \\lambda_j \\, \\Delta_j(t), \\qquad \\Delta_j(t) = \\text{time spent in piece } j \\text{ before } t",
          caption: "One task, one patient: $\\delta = 1$ for an observed event at $t$, $\\delta = 0$ if censored at $t$",
        },
        {
          kind: "formula",
          latex:
            "\\lambda_{\\text{task},\\,j} = \\exp\\!\\left(\\boldsymbol{\\beta}_{\\text{task}}^{\\top} \\mathbf{h}_j\\right)",
          caption: "MOTOR's head: piece-specific patient vectors, shared across tasks, dotted with a task embedding",
        },
        {
          kind: "prose",
          text:
            "The transformer produces one representation of the patient at the prediction time, which a linear " +
            "layer turns into one vector $\\mathbf{h}_j$ per time piece. Each task has its own vector " +
            "$\\boldsymbol{\\beta}_{\\text{task}}$. The hazard matrix (tasks × pieces) is therefore low rank, " +
            "which is what makes $8{,}192$ simultaneous survival models affordable: the patient-side " +
            "computation is shared, and each task adds only one vector of parameters.",
        },
        {
          kind: "example",
          title: "Evaluating the piecewise-exponential likelihood",
          problem:
            "Pieces are $[0, 1)$, $[1, 3)$ and $[3, \\infty)$ years with hazards $0.1$, $0.05$ and $0.02$ per " +
            "year. Patient 1 has the event at $t = 2$. Patient 2 is censored at $t = 4$. Find each patient's " +
            "log-likelihood and patient 2's survival probability.",
          steps: [
            "Patient 1: one year in piece $1$ and one in piece $2$, so the cumulative hazard is $0.1 \\times 1 + 0.05 \\times 1 = 0.15$. The event falls in piece $2$: $\\log L = \\ln 0.05 - 0.15 = -2.9957 - 0.15 = -3.1457$.",
            "Patient 2: cumulative hazard $0.1 \\times 1 + 0.05 \\times 2 + 0.02 \\times 1 = 0.22$, no event term, so $\\log L = -0.22$.",
            "Survival: $S(4) = e^{-0.22} = 0.8025$.",
          ],
          answer:
            "$-3.1457$ and $-0.22$; $S(4) = 0.8025$. The censored patient still contributes information — four event-free years — instead of being dropped.",
        },
      ],
    },
    {
      heading: "What it buys and what to watch",
      blocks: [
        {
          kind: "list",
          items: [
            "The pretraining target and the downstream target have the same form, so adaptation is close to a change of task vector: fit a new $\\boldsymbol{\\beta}$ on the frozen $\\mathbf{h}_j$, or fine-tune.",
            "The model outputs a full survival curve per task, not a single probability at one horizon, so any horizon can be read off without retraining.",
            "Reported results show better discrimination and calibration than bespoke survival models and next-code pretraining on time-to-event tasks, with the largest gains when downstream labels are scarce.",
            "Evaluation must use survival metrics that respect censoring — the time-dependent concordance index and the integrated Brier score — not AUROC on a dichotomised label.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Censoring must be non-informative",
          text:
            "The likelihood assumes a patient's leaving the record says nothing about their risk. In EHR data " +
            "that often fails — the sickest patients transfer to another hospital, the healthiest stop " +
            "visiting — and no amount of pretraining corrects a biased likelihood.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The thread through the chapter",
          text:
            "Masked prediction learns which codes go together; next-event prediction learns order and can " +
            "sample futures; time-to-event pretraining learns when, under censoring, for many outcomes at " +
            "once. Each is a closer match to the questions the downstream tasks actually ask.",
        },
      ],
    },
  ],

  references: [
    { source: motor, locator: "Methods (piecewise-exponential head and pretraining tasks)" },
    { source: "Kalbfleisch & Prentice, The Statistical Analysis of Failure Time Data (2nd ed.)", locator: "Ch. 1–2 (hazard, survival and censoring)" },
  ],
};

export const ml21EventSequenceFoundationModels: WikiArticle[] = [
  bespokeVsFoundation,
  maskedCodePrediction,
  nextEventPrediction,
  timeToEventPretraining,
];
