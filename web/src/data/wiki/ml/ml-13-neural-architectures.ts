import type { WikiArticle } from "../types";

/**
 * Machine Learning cluster 13 — neural network architectures.
 *
 * Cluster 11 introduces three families and stops. What it never does is put
 * them side by side, or carry the sequence story past attention: the LSTM is a
 * paragraph inside `recurrent-neural-networks`, next-token prediction is
 * assumed by `transformers` and defined nowhere, and the linear-recurrence
 * models that now compete with attention on long sequences are absent. These
 * nine articles are the architecture zoo — what each family assumes about its
 * data, what that assumption buys, and what it costs.
 *
 * Numbered 13 because it was authored after cluster 12; it is taught between 11
 * and 12, which is where `sections.ts` places it.
 */

const architectureFamilies: WikiArticle = {
  conceptId: "architecture-families",
  summary:
    "An architecture is a hypothesis about the data, written in which weights exist and which are " +
    "shared. A dense layer assumes nothing and pays for it in parameters; a convolution assumes " +
    "translation invariance; a recurrence assumes the past reaches the present through a single " +
    "state; attention assumes nothing about distance and pays quadratically. Choosing one is " +
    "choosing a prior, and the bias-variance trade applies to it exactly as it does to model size.",

  sections: [
    {
      heading: "The families, side by side",
      blocks: [
        {
          kind: "table",
          headers: ["Family", "Assumption built into the wiring", "What is shared", "Path between distant inputs", "Cost per layer"],
          rows: [
            ["Dense (MLP)", "None — every input may interact with every other", "Nothing", "1", "O(n · m) in the layer widths"],
            ["Convolutional", "Locality and translation invariance: a pattern means the same thing anywhere", "One kernel across all positions", "O(depth), growing with the receptive field", "O(n · k · channels²)"],
            ["Recurrent", "The past reaches the present only through a fixed-size state", "One weight matrix across all time steps", "O(sequence length)", "O(L · d²), sequential"],
            ["Attention", "Any position may be relevant to any other; relevance is content-based", "One projection set across all positions", "1", "O(L² · d)"],
            ["Graph", "Interaction follows given edges, and node order carries no meaning", "One message function across all edges", "O(hops)", "O(|E| · d)"],
            ["State space", "The past reaches the present through a linear recurrence", "One transition across all steps", "O(1) through the state", "O(L · d), parallelisable"],
          ],
        },
        {
          kind: "prose",
          text:
            "Read the table as a single trade. Each row after the first deletes weights the dense " +
            "layer would have had, and the deletion is only free if the assumption that licensed it " +
            "is true of the data. A convolution applied to tabular data whose columns have no " +
            "spatial order is not a cheaper dense layer; it is a wrong one.",
        },
      ],
    },

    {
      heading: "The parameter count is where the prior becomes visible",
      blocks: [
        {
          kind: "example",
          title: "A dense layer and a convolution on the same image",
          problem:
            "Take a 224 x 224 RGB image. Compare the weight count of a dense layer mapping it to 1,000 units against a 3 x 3 convolution with 3 input and 64 output channels.",
          steps: [
            "Flattened input: 224 x 224 x 3 = 150,528 values.",
            "Dense: 150,528 x 1,000 = 150,528,000 weights, and each is used exactly once per image.",
            "Convolution: 3 x 3 x 3 x 64 = 1,728 weights, each reused at every one of the roughly 50,000 spatial positions.",
          ],
          answer:
            "About 87,000x fewer weights. The convolution has not approximated the dense layer — it has assumed that a feature detected at the top-left is the same feature at the bottom-right, and deleted every weight that could have said otherwise. On natural images that assumption is close enough to true that the deletion is pure gain.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Weight sharing is a hard constraint, not a regulariser",
          text:
            "Weight decay and dropout make some solutions expensive. Weight sharing makes them " +
            "unreachable: a convolutional network cannot represent a position-dependent detector " +
            "at all, at any setting of its weights. That is why architectural priors bite hardest " +
            "in the small-data regime and matter least when data is effectively unlimited.",
        },
      ],
    },

    {
      heading: "Which prior, and when",
      blocks: [
        {
          kind: "list",
          items: [
            "Grid-structured data with local, repeated patterns — images, spectrograms, short text windows: convolution.",
            "Sequences where the whole context matters and it fits in memory: attention.",
            "Sequences that are long, streaming, or must be generated at constant memory per step: a gated recurrence or a state space model.",
            "Data whose interactions are given as edges — molecules, citation networks, road maps: message passing.",
            "Genuinely unstructured features, or a small head on top of a learned representation: dense.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "More data flips the answer",
          text:
            "A vision transformer, which is nearly prior-free about space, loses to a convolutional " +
            "network of the same size on a small dataset and wins on a very large one. Nothing " +
            "about either architecture changed — the value of a correct-but-restrictive prior falls " +
            "as the data that could have taught the same fact grows. Benchmarks quoted without " +
            "their dataset size are close to meaningless here.",
        },
      ],
    },
  ],

  references: [
    { source: "Goodfellow, Bengio & Courville, Deep Learning", locator: "Ch. 9-10, Convolutional and Sequence Modeling" },
    { source: "Prince, Understanding Deep Learning", locator: "§10.1, Invariance and Equivariance" },
    { source: "Dosovitskiy et al., An Image is Worth 16x16 Words", locator: "ICLR 2021, §4.2 on data scale" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-13-neural-architectures.md" },
  ],
};

const residualNetworks: WikiArticle = {
  conceptId: "residual-networks",
  summary:
    "A residual block computes y = F(x) + x: the layer learns a correction to its input rather " +
    "than a replacement for it. The addition gives backpropagation a path whose local derivative " +
    "is exactly 1, which is what makes networks of a hundred layers trainable at all. It is the " +
    "same trick as the LSTM's additive cell state, moved from time into depth.",

  sections: [
    {
      heading: "The degradation problem it solves",
      blocks: [
        {
          kind: "prose",
          text:
            "Before residual connections, adding layers past roughly twenty made a network worse on " +
            "its *training* set. That is the tell: overfitting raises test error while training " +
            "error falls, so a deeper network that trains worse is not overfitting — it is failing " +
            "to optimise. And it cannot be a capacity problem either, since the deeper network can " +
            "represent the shallower one by setting the extra layers to the identity. The extra " +
            "layers were representable and unreachable.",
        },
        {
          kind: "formula",
          latex: "y = F(x, W) + x",
          caption: "The block learns the residual F, so 'do nothing' is F = 0 rather than an identity map to be discovered",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Zero is easy to reach; the identity is not",
          text:
            "Weight decay already pulls every weight toward zero, so a residual block's default " +
            "behaviour — the one it falls into when a layer has nothing useful to add — is to pass " +
            "its input through unchanged. A plain stack has to *learn* the identity out of a product " +
            "of matrices and nonlinearities, which is a narrow target in a very large space.",
        },
      ],
    },

    {
      heading: "What the addition does to the gradient",
      blocks: [
        {
          kind: "formula",
          latex: "∂y/∂x = I + ∂F/∂x",
          caption: "The Jacobian of a residual block, with an identity term the chain rule cannot delete",
        },
        {
          kind: "example",
          title: "Fifty blocks, with and without the skip",
          problem:
            "Suppose each block's own Jacobian has norm about 0.9. Compare the gradient reaching the first of 50 blocks in a plain stack against a residual stack.",
          steps: [
            "Plain: backpropagation multiplies 50 factors of 0.9. 0.9^50 ≈ 0.0052.",
            "Residual: each factor is I + ∂F/∂x, so the product expands into a sum of paths — including the path that takes the identity term at every block, whose contribution is exactly 1.",
            "That path is not scaled by depth at all; the other 2^50 − 1 paths add to it rather than replacing it.",
          ],
          answer:
            "The plain stack delivers about 0.5% of the gradient to its first layer and effectively stops training it; the residual stack delivers a signal bounded below by the pure-identity path however deep the network gets. The skip does not make the gradient larger — it makes the multiplicative chain unable to drive it to zero.",
        },
        {
          kind: "prose",
          text:
            "Reading the expansion the other way is just as useful: a residual network of depth n " +
            "behaves like an ensemble of 2^n paths of every length, most of them short. Deleting a " +
            "single block from a trained residual network barely changes its output, while deleting " +
            "one layer from a trained plain network destroys it — which is not what a single deep " +
            "function would do, and is exactly what an ensemble of shallow ones does.",
        },
      ],
    },

    {
      heading: "Details that matter in practice",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Shape mismatch",
              description:
                "F(x) and x must be addable. When a block changes channel count or spatial size, the skip carries a 1 x 1 convolution with a matching stride — a projection, not an identity, and the only place a residual path holds parameters.",
            },
            {
              term: "Pre-activation ordering",
              description:
                "Putting normalisation and activation *inside* F, so the skip path is a clean addition with nothing applied to it, trains deeper than the original ordering. The point is to keep one path from input to loss that is unmodified end to end.",
            },
            {
              term: "Zero-initialised final layer",
              description:
                "Initialising the last layer of F at zero makes every block start as an exact identity, so a freshly initialised deep network is a well-behaved shallow one and gets deeper as training proceeds.",
            },
            {
              term: "Where else it appears",
              description:
                "Every transformer sublayer is a residual block, dense blocks concatenate instead of adding, and the LSTM cell state is the same additive path running across time rather than depth. The pattern outlived the architecture it was introduced in.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A skip does not license unlimited depth",
          text:
            "Residual connections fix the optimisation failure, not the statistics. A 1,000-layer " +
            "network still overfits, still costs what it costs to run, and on most datasets buys " +
            "nothing over a 50-layer one. What changed is that depth stopped failing for a reason " +
            "unrelated to the problem being solved.",
        },
      ],
    },
  ],

  references: [
    { source: "He et al., Deep Residual Learning for Image Recognition", locator: "CVPR 2016" },
    { source: "He et al., Identity Mappings in Deep Residual Networks", locator: "ECCV 2016" },
    { source: "Veit, Wilber & Belongie, Residual Networks Behave Like Ensembles", locator: "NeurIPS 2016" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-13-neural-architectures.md" },
  ],
};

const lstmAndGru: WikiArticle = {
  conceptId: "lstm-and-gru",
  summary:
    "A plain recurrent network reaches step 1 from step 500 through 500 matrix multiplications, so " +
    "the gradient vanishes. An LSTM adds a cell state updated by addition and gated multiplication: " +
    "the derivative along the memory path is a forget gate rather than a weight matrix, so a value " +
    "can be carried for hundreds of steps and the gradient with it. The GRU does the same job with " +
    "two gates instead of three and no separate cell.",

  sections: [
    {
      heading: "The cell",
      blocks: [
        {
          kind: "formula",
          latex: "fₜ = σ(W_f·[hₜ₋₁, xₜ]);   iₜ = σ(W_i·[hₜ₋₁, xₜ]);   oₜ = σ(W_o·[hₜ₋₁, xₜ])",
          caption: "Three gates, each a sigmoid, each producing a number in (0, 1) per cell dimension",
        },
        {
          kind: "formula",
          latex: "c̃ₜ = tanh(W_c·[hₜ₋₁, xₜ]);   cₜ = fₜ ⊙ cₜ₋₁ + iₜ ⊙ c̃ₜ;   hₜ = oₜ ⊙ tanh(cₜ)",
          caption: "The cell state is updated by a gated add; the hidden state is a gated view of it",
        },
        {
          kind: "definitions",
          items: [
            { term: "Forget gate f", description: "How much of the previous cell state survives. f = 1 keeps a memory perfectly; f = 0 erases it." },
            { term: "Input gate i", description: "How much of the freshly computed candidate is written in. Writing and forgetting are separate decisions, which is what lets a cell hold a value while still reading new input." },
            { term: "Output gate o", description: "How much of the cell is exposed as this step's hidden state. A cell can hold something it is not currently reporting." },
            { term: "Candidate c̃", description: "The new content on offer, squashed to (−1, 1) by tanh so repeated additions cannot run away." },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The gates are sigmoids on purpose",
          text:
            "A gate multiplies. Multiplying by something bounded in (0, 1) is an interpolation — keep " +
            "this fraction, discard the rest — and nothing else has that reading. This is the one " +
            "place a saturating activation is the right choice rather than a legacy one: a gate that " +
            "saturates at 1 is a gate that has firmly decided to remember.",
        },
      ],
    },

    {
      heading: "Why the gradient survives",
      blocks: [
        {
          kind: "formula",
          latex: "∂cₜ/∂cₜ₋₁ = fₜ",
          caption: "The derivative along the memory path is the forget gate itself — no weight matrix appears",
        },
        {
          kind: "example",
          title: "Carrying a gradient 100 steps",
          problem:
            "Compare the factor a gradient picks up over 100 steps through a plain recurrence whose relevant singular value is 0.9, against an LSTM cell path whose forget gate sits at 0.99.",
          steps: [
            "Plain: 0.9^100 ≈ 2.7 x 10^-5 — the signal reaching step 1 is effectively noise.",
            "LSTM: the product along the cell path is the product of the forget gates, 0.99^100 ≈ 0.37.",
            "And the forget gate is learned per step and per dimension, so a dimension that needs to remember can push its gate to 0.999 and pay almost nothing over the same span.",
          ],
          answer:
            "About 0.37 against 0.000027 — four orders of magnitude, from replacing a repeated matrix multiplication with a repeated multiplication by a learnable number the network can set near 1. Note what has *not* happened: nothing was amplified, and gradients through the gates themselves still shrink. Only the memory path is protected.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Initialise the forget-gate bias positive",
          text:
            "At zero bias the forget gate starts near 0.5, so a memory decays by half per step and " +
            "is gone in twenty. Initialising that bias to 1 or 2 starts the gate near 'keep', which " +
            "is a one-line change that repeatedly turns a network that learns nothing into one that " +
            "trains. It is the single most load-bearing default in the cell.",
        },
      ],
    },

    {
      heading: "GRU, and what to reach for",
      blocks: [
        {
          kind: "formula",
          latex: "zₜ = σ(W_z·[hₜ₋₁, xₜ]);   rₜ = σ(W_r·[hₜ₋₁, xₜ]);   hₜ = (1 − zₜ) ⊙ hₜ₋₁ + zₜ ⊙ tanh(W·[rₜ ⊙ hₜ₋₁, xₜ])",
          caption: "One update gate does the LSTM's forget and input jobs, tied so that writing implies forgetting",
        },
        {
          kind: "table",
          headers: ["", "LSTM", "GRU"],
          rows: [
            ["Gates", "3 (forget, input, output)", "2 (update, reset)"],
            ["Separate memory", "Yes — cell state, only partly exposed", "No — the hidden state is the memory"],
            ["Weights, hidden size d, input size x", "4d(d + x) + 4d", "3d(d + x) + 3d"],
            ["Typical verdict", "Slight edge on very long dependencies", "Fewer parameters, trains faster, usually as accurate"],
          ],
        },
        {
          kind: "prose",
          text:
            "The tie is the real difference: the GRU's write is 1 − forget, so it cannot add to a " +
            "memory without displacing it, while an LSTM can. That matters rarely. In practice the " +
            "GRU is the better default at small data sizes and the two are within noise elsewhere. " +
            "Both lost their place at scale to attention, and for one reason above accuracy: step t " +
            "cannot be computed before step t − 1, so training does not parallelise across a " +
            "sequence however much hardware you have. State space models are the attempt to get " +
            "that parallelism back without paying attention's quadratic cost.",
        },
      ],
    },
  ],

  references: [
    { source: "Hochreiter & Schmidhuber, Long Short-Term Memory", locator: "Neural Computation 9(8), 1997" },
    { source: "Cho et al., Learning Phrase Representations using RNN Encoder-Decoder", locator: "EMNLP 2014" },
    { source: "Jozefowicz, Zaremba & Sutskever, An Empirical Exploration of Recurrent Network Architectures", locator: "ICML 2015, on forget-gate bias" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-13-neural-architectures.md" },
  ],
};

const autoregressiveModels: WikiArticle = {
  conceptId: "autoregressive-models",
  summary:
    "An autoregressive model factorises the joint distribution of a sequence into a product of " +
    "next-step conditionals and learns each one. That single choice is what makes a language model " +
    "trainable by maximum likelihood on unlabelled text, and it is also what makes generation " +
    "sequential, exposure bias real, and perplexity the number everyone quotes.",

  sections: [
    {
      heading: "The factorisation",
      blocks: [
        {
          kind: "formula",
          latex: "p(x₁, …, x_n) = p(x₁) · p(x₂ | x₁) · p(x₃ | x₁, x₂) ⋯ p(x_n | x₁, …, x_{n−1})",
          caption: "The chain rule of probability applied n − 1 times — exact, and true of any ordering",
        },
        {
          kind: "prose",
          text:
            "Nothing is approximated here: the chain rule is an identity. The modelling choice is " +
            "to parameterise every conditional with one shared network, so a sequence of length n " +
            "supplies n training signals rather than one, and the loss is the negative log of the " +
            "product — a sum of per-position cross-entropies. This is why unlabelled text is a " +
            "supervised dataset: the label for each position is the next token, which is already " +
            "there.",
        },
        {
          kind: "formula",
          latex: "L = −(1/n) Σₜ log p_θ(xₜ | x_{<t})",
          caption: "Mean next-token cross-entropy, in nats per token when the log is natural",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Perplexity is that loss, exponentiated",
          text:
            "Perplexity = exp(L). A cross-entropy of 2.0 nats per token is a perplexity of about " +
            "7.39, which reads as 'the model is as uncertain as if it were choosing uniformly among " +
            "7.4 tokens at each step'. It is a restatement of the loss, not extra information — " +
            "which is exactly why comparing perplexities across different tokenisers is meaningless.",
        },
      ],
    },

    {
      heading: "Training and generating are not the same computation",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Teacher forcing",
              description:
                "At training time every conditional is fed the true prefix, not the model's own outputs. All n positions can then be computed in parallel, which is the entire reason a transformer trains faster than a recurrent network on the same data.",
            },
            {
              term: "Causal masking",
              description:
                "The parallelism is only legitimate if position t cannot see position t + 1. In a transformer that is a mask setting future attention scores to −∞ before the softmax; in a convolutional autoregressive model it is a shifted kernel. Get it wrong and the model achieves a spectacular loss and generates nonsense.",
            },
            {
              term: "Exposure bias",
              description:
                "At generation time the prefix is the model's own output, which is a distribution it never trained on. One early mistake moves the context off-distribution and later predictions degrade — the failure mode behind a generation that starts well and drifts.",
            },
            {
              term: "KV caching",
              description:
                "Generating token t recomputes attention over the whole prefix. Caching each position's keys and values makes each new token O(t) instead of O(t²), at the cost of a cache that grows linearly with context — the memory wall behind long-context inference.",
            },
          ],
        },
        {
          kind: "example",
          title: "Why the loss is a sum but the sampling is a loop",
          problem: "A 1,000-token training sequence and a 1,000-token generation both involve 1,000 conditionals. Why is only one of them parallel?",
          steps: [
            "In training every conditioning prefix is known in advance — it is the data.",
            "So all 1,000 masked forward passes are one batched forward pass.",
            "In generation the prefix for step t contains the token sampled at step t − 1, which does not exist yet.",
          ],
          answer:
            "Training is parallel over positions and generation is inherently serial in them. This asymmetry — cheap training, expensive sampling — is the defining cost profile of autoregressive models, and it is precisely reversed in diffusion models, which train on independent noise levels but also sample in a loop.",
        },
      ],
    },

    {
      heading: "Sampling from the conditionals",
      blocks: [
        {
          kind: "list",
          items: [
            "Greedy: take the argmax each step. Deterministic, and reliably dull — it also compounds, since one confident wrong token is never escaped.",
            "Temperature: divide the logits by T before the softmax. T < 1 sharpens toward greedy, T > 1 flattens toward uniform, T → 0 is greedy exactly.",
            "Top-k: renormalise over the k most likely tokens, cutting the tail that holds most of the probability mass in aggregate but none of the good options.",
            "Top-p (nucleus): renormalise over the smallest set whose mass exceeds p, so the candidate set is wide where the model is unsure and narrow where it is confident.",
            "Beam search: keep b partial sequences by total log-probability. Standard for translation, where one answer is wanted; poor for open-ended text, where it produces bland, repetitive output.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The highest-probability sequence is not the best one",
          text:
            "Maximising the joint probability favours short, generic, repetitive text, because those " +
            "sequences genuinely are the most likely under any well-fit model of human text. Sampling " +
            "methods are not a workaround for a badly trained model; they exist because the mode of " +
            "the distribution is not what anyone wanted.",
        },
      ],
    },
  ],

  references: [
    { source: "Bengio et al., A Neural Probabilistic Language Model", locator: "JMLR 3, 2003" },
    { source: "Radford et al., Language Models are Unsupervised Multitask Learners", locator: "GPT-2 technical report, 2019" },
    { source: "Holtzman et al., The Curious Case of Neural Text Degeneration", locator: "ICLR 2020, on nucleus sampling" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-13-neural-architectures.md" },
  ],
};

const stateSpaceModels: WikiArticle = {
  conceptId: "state-space-models",
  summary:
    "A state space model is a linear recurrence: the state is a linear map of the previous state " +
    "plus a linear map of the input. Dropping the nonlinearity inside the recurrence sounds like a " +
    "loss and buys something no gated cell has — because the recurrence is linear it also unrolls " +
    "into a convolution, so it trains in parallel like a convolutional network and runs at constant " +
    "memory per step like a recurrent one.",

  sections: [
    {
      heading: "One model, two computations",
      blocks: [
        {
          kind: "formula",
          latex: "hₖ = Ā hₖ₋₁ + B̄ uₖ;   yₖ = C hₖ + D uₖ",
          caption: "The discretised recurrence: a linear state update driven by the input",
        },
        {
          kind: "prose",
          text:
            "Unroll it from h₋₁ = 0 and every output is an explicit sum over past inputs. Because " +
            "no nonlinearity intervenes, the coefficients do not depend on the inputs at all, so " +
            "the whole sequence of outputs is a convolution of the input with a fixed kernel.",
        },
        {
          kind: "formula",
          latex: "K = (C B̄, C Ā B̄, C Ā² B̄, …, C Ā^{L−1} B̄);   y = K ∗ u",
          caption: "The same model as a convolution with a kernel as long as the sequence",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Train as a convolution, generate as a recurrence",
          text:
            "Training sees the whole sequence at once, so the convolutional form runs in parallel " +
            "across positions and can be evaluated with an FFT in O(L log L). Generation sees one " +
            "token at a time, so the recurrent form runs in O(1) per step with a fixed-size state " +
            "and no growing cache. A gated recurrence cannot do the first; attention cannot do the " +
            "second. Linearity is what makes both available from one set of weights.",
        },
      ],
    },

    {
      heading: "The eigenvalues are the memory",
      blocks: [
        {
          kind: "prose",
          text:
            "Ā^k is what the model applies to an input k steps old, so its eigenvalues decide how " +
            "long anything is remembered. Diagonalise Ā and the k-step influence of each mode is " +
            "λ^k: modulus below 1 decays, above 1 explodes, and exactly 1 never forgets. Practical " +
            "parameterisations therefore constrain the eigenvalues to the unit disc — often by " +
            "learning a complex diagonal Ā directly, which also makes Ā^k a per-element power " +
            "instead of a matrix power.",
        },
        {
          kind: "example",
          title: "How far back does a mode reach?",
          problem: "A mode of Ā has eigenvalue modulus 0.9. After how many steps has its contribution halved?",
          steps: [
            "The influence of an input k steps back is scaled by 0.9^k.",
            "Solve 0.9^k = 0.5, so k = ln(0.5) / ln(0.9).",
            "ln(0.5) ≈ −0.6931, ln(0.9) ≈ −0.1054.",
          ],
          answer:
            "k ≈ 6.6 steps — a mode at 0.9 is a short-term memory. At 0.999 the half-life is about 693 steps. This is why initialisation matters so much here: HiPPO initialises Ā so that the state approximates a basis of orthogonal polynomials over the input's history, giving well-spread time scales from the start rather than hoping gradient descent finds them.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A random Ā is almost always the wrong Ā",
          text:
            "Randomly initialised state space layers perform poorly — the result that motivated S4. " +
            "The eigenvalue spectrum is the model's memory, and a spectrum drawn at random is a " +
            "memory that decays over a single arbitrary time scale. Structured initialisation is not " +
            "a tuning refinement in this family; it is the difference between working and not.",
        },
      ],
    },

    {
      heading: "Selectivity, and the trade against attention",
      blocks: [
        {
          kind: "prose",
          text:
            "A fixed Ā, B̄ treats every input the same way, so the model cannot choose to ignore a " +
            "filler token or to hold one that just became important — a content-based decision, " +
            "which is exactly what attention is good at. Mamba makes B̄, C and the discretisation " +
            "step functions of the current input. The recurrence stays linear in the state, so a " +
            "parallel scan still trains it in O(L), but the coefficients now vary with position, " +
            "which costs the convolutional form and buys content-dependent memory.",
        },
        {
          kind: "table",
          headers: ["", "Attention", "State space (S4 / Mamba)"],
          rows: [
            ["Training cost in sequence length L", "O(L²)", "O(L log L) convolution, or O(L) parallel scan"],
            ["State carried at generation time", "KV cache, grows linearly with context", "Fixed-size state, independent of context"],
            ["Reaching an arbitrary past token", "Direct, content-addressed", "Through the state, and only if the state kept it"],
            ["Exact recall of a rare token", "Strong", "Weaker — this is the known gap, and why hybrids exist"],
          ],
        },
        {
          kind: "prose",
          text:
            "The honest summary is that neither dominates. Attention's cost is quadratic but its " +
            "recall is exact; a state space layer is linear but must compress the past into a " +
            "fixed-size state, and compression loses things. Production models increasingly " +
            "interleave the two — most layers linear, a few attention layers to do the exact lookups " +
            "— which is a statement about the trade rather than a winner.",
        },
      ],
    },
  ],

  references: [
    { source: "Gu, Goel & Ré, Efficiently Modeling Long Sequences with Structured State Spaces", locator: "ICLR 2022 (S4)" },
    { source: "Gu & Dao, Mamba: Linear-Time Sequence Modeling with Selective State Spaces", locator: "2023" },
    { source: "Gu et al., HiPPO: Recurrent Memory with Optimal Polynomial Projections", locator: "NeurIPS 2020" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-13-neural-architectures.md" },
  ],
};

const graphNeuralNetworks: WikiArticle = {
  conceptId: "graph-neural-networks",
  summary:
    "A graph neural network updates each node from its neighbours: gather messages along edges, " +
    "aggregate them with a permutation-invariant function, combine with the node's own state, " +
    "repeat. It is a convolution for data whose neighbourhoods are given by edges rather than by a " +
    "grid — and the constraint that the aggregation ignore order is what makes the model well " +
    "defined at all.",

  sections: [
    {
      heading: "Message passing",
      blocks: [
        {
          kind: "formula",
          latex: "h_v^{(k+1)} = UPDATE(h_v^{(k)}, AGG({ MSG(h_v^{(k)}, h_u^{(k)}, e_{uv}) : u ∈ N(v) }))",
          caption: "One layer: every node hears from its neighbours, then updates",
        },
        {
          kind: "prose",
          text:
            "AGG must be permutation invariant — sum, mean, or max — because a node's neighbours " +
            "arrive as a set with no canonical order. Anything order-sensitive would make the " +
            "model's output depend on how the adjacency list happened to be written down. That " +
            "single requirement is the graph analogue of a convolution's translation invariance, " +
            "and it is where the family's inductive bias lives.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "GCN",
              description:
                "Aggregation by a degree-normalised mean, D^{−1/2} Â D^{−1/2} H W with Â the adjacency plus self-loops. The normalisation stops high-degree nodes from dominating and keeps activation scales stable across a graph with wildly uneven degrees.",
            },
            {
              term: "GraphSAGE",
              description:
                "Sample a fixed number of neighbours instead of using all of them, so cost per node is bounded and the model can be applied to graphs too large to fit in memory — and to nodes never seen in training.",
            },
            {
              term: "GAT",
              description:
                "Learn attention weights over neighbours rather than fixing them by degree. This is attention restricted to the edges that exist, which is also a fair description of a transformer as a graph network on a complete graph.",
            },
            {
              term: "Readout",
              description:
                "For a graph-level prediction, pool all node states with another permutation-invariant function. Node-level tasks skip this and read h_v directly.",
            },
          ],
        },
      ],
    },

    {
      heading: "Depth behaves differently here",
      blocks: [
        {
          kind: "example",
          title: "What a k-layer network can see",
          problem: "In a graph where every node has 10 neighbours, how much of the graph does a node's 4-layer representation depend on?",
          steps: [
            "One layer reaches the 1-hop neighbourhood: 10 nodes.",
            "Each additional layer composes one more hop, so k layers reach the k-hop neighbourhood.",
            "Four hops in a 10-regular graph is on the order of 10⁴ = 10,000 nodes.",
          ],
          answer:
            "Roughly ten thousand nodes — and in a social graph with hubs, four hops often reaches most of the graph. That is the opposite of the convolutional situation, where depth grows the receptive field gently. It is also why GNNs are usually 2 to 4 layers deep while CNNs are 50: the receptive field is already the whole graph, and going deeper only makes the next problem worse.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Over-smoothing: every node converges to the same vector",
          text:
            "Repeated neighbourhood averaging is a diffusion process, and diffusion run long enough " +
            "reaches a stationary state that depends on the graph but not on where you started. " +
            "After many layers, node representations become indistinguishable and node-level " +
            "accuracy collapses. Residual connections, jumping-knowledge readouts that keep every " +
            "layer's output, and simply staying shallow are the standard defences.",
        },
      ],
    },

    {
      heading: "What message passing cannot do",
      blocks: [
        {
          kind: "prose",
          text:
            "Standard message passing is exactly as expressive as the 1-dimensional " +
            "Weisfeiler-Lehman colour-refinement test: if two graphs are indistinguishable to 1-WL, " +
            "no amount of training separates them. The classic pair is a 6-cycle and two disjoint " +
            "triangles — every node has degree 2 and every neighbourhood looks identical forever, " +
            "so a GNN gives the two graphs the same representation while any human sees the " +
            "difference immediately.",
        },
        {
          kind: "list",
          items: [
            "Sum aggregation is strictly more expressive than mean or max — mean cannot count, and max cannot tell one neighbour from five identical ones. This is the GIN argument.",
            "Adding node features that break the symmetry — degrees, cycle counts, random identifiers, or positional encodings from the graph Laplacian — raises expressiveness beyond 1-WL.",
            "Higher-order variants pass messages between node tuples rather than nodes, which lifts the ceiling and costs a great deal more compute.",
            "Molecules are the standard application precisely because the graph is the data: atoms are nodes, bonds are edges, and the permutation invariance is a physical fact rather than a modelling convenience.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Kipf & Welling, Semi-Supervised Classification with Graph Convolutional Networks", locator: "ICLR 2017" },
    { source: "Hamilton, Ying & Leskovec, Inductive Representation Learning on Large Graphs", locator: "NeurIPS 2017 (GraphSAGE)" },
    { source: "Xu et al., How Powerful are Graph Neural Networks?", locator: "ICLR 2019 (GIN and the 1-WL bound)" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-13-neural-architectures.md" },
  ],
};

const generativeAdversarialNetworks: WikiArticle = {
  conceptId: "generative-adversarial-networks",
  summary:
    "A GAN trains two networks against each other: a generator turning noise into samples, and a " +
    "discriminator trying to tell those samples from real data. Neither has a likelihood and " +
    "neither has a loss that decreases — the objective is a saddle point, not a minimum, which is " +
    "the source of both the sample quality and every training pathology the family is known for.",

  sections: [
    {
      heading: "The game",
      blocks: [
        {
          kind: "formula",
          latex: "min_G max_D  E_{x∼p_data}[log D(x)] + E_{z∼p_z}[log(1 − D(G(z)))]",
          caption: "The discriminator maximises; the generator minimises the same quantity",
        },
        {
          kind: "prose",
          text:
            "Hold the generator fixed and the inner problem is ordinary binary classification, so " +
            "its solution can be written down pointwise. That optimal discriminator is the object " +
            "everything else is read off from.",
        },
        {
          kind: "formula",
          latex: "D*(x) = p_data(x) / (p_data(x) + p_g(x))",
          caption: "The Bayes-optimal discriminator against a fixed generator",
        },
        {
          kind: "example",
          title: "Reading the optimal discriminator",
          problem: "At a point x, the data density is 0.3 and the generator's density is 0.1. What does the optimal discriminator output, and what does the generator want to happen?",
          steps: [
            "D*(x) = 0.3 / (0.3 + 0.1) = 0.75.",
            "The generator improves at x by raising p_g toward 0.3, which drives D*(x) toward 0.5.",
            "Substituting D* into the objective gives 2·JSD(p_data ‖ p_g) − 2 log 2.",
          ],
          answer:
            "0.75, and the generator's incentive is to push it to 0.5 everywhere — which happens exactly when p_g = p_data, where the Jensen-Shannon divergence is zero and the discriminator is reduced to guessing. So the game's equilibrium is the right one; the entire difficulty is reaching it.",
        },
      ],
    },

    {
      heading: "Why it is hard to train",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Vanishing generator gradient",
              description:
                "Early on the discriminator wins easily, D(G(z)) ≈ 0, and log(1 − D(G(z))) is flat there — the generator gets almost no gradient exactly when it is worst. The standard fix is the non-saturating loss: maximise log D(G(z)) instead of minimising log(1 − D(G(z))). Same fixed point, usable gradients.",
            },
            {
              term: "Mode collapse",
              description:
                "Nothing in the objective rewards covering the data. A generator that produces one convincing digit forever can fool a discriminator that has not yet noticed, and the two can chase each other around a subset of the modes indefinitely. This is the family's signature failure.",
            },
            {
              term: "No convergence signal",
              description:
                "At equilibrium both losses sit at their starting values. A GAN loss curve says nothing about sample quality, which is why the field evaluates with FID — a Fréchet distance between Gaussian fits to features of real and generated samples — rather than with its own objective.",
            },
            {
              term: "Disjoint support",
              description:
                "When p_data and p_g share no support, JSD is constant at log 2 and its gradient is zero. Wasserstein GANs replace the divergence with an earth-mover distance that still varies in that case, and enforce the required Lipschitz constraint by gradient penalty.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A perfect discriminator is a failure state, not a milestone",
          text:
            "Everything the generator learns arrives through the discriminator's gradient. Train " +
            "the discriminator to perfection and that gradient goes to zero, so the generator stops " +
            "improving. The two networks must be kept roughly balanced — which is why GAN recipes " +
            "specify update ratios and learning rates so precisely, and why they transfer badly " +
            "between datasets.",
        },
      ],
    },

    {
      heading: "Where it sits among generative models",
      blocks: [
        {
          kind: "table",
          headers: ["", "GAN", "VAE / autoencoder", "Autoregressive", "Diffusion"],
          rows: [
            ["Likelihood available", "No", "A lower bound (the ELBO)", "Exact", "A bound, in practice a proxy loss"],
            ["Sampling cost", "One forward pass", "One forward pass", "One pass per token", "Tens to hundreds of steps"],
            ["Sample sharpness", "High", "Blurry — the pixel-wise likelihood averages over modes", "High in its own domain", "High"],
            ["Mode coverage", "Poor, and hard to detect", "Good", "Good", "Good"],
            ["Training stability", "Fragile", "Stable", "Stable", "Stable"],
          ],
        },
        {
          kind: "prose",
          text:
            "GANs held the image-quality lead for roughly five years and then largely lost it to " +
            "diffusion — not on sample quality alone but on the combination of quality, coverage, " +
            "and a loss that behaves like a loss. They remain the right tool where one-pass sampling " +
            "is the binding constraint, such as real-time generation and super-resolution, and the " +
            "adversarial idea itself long outlived the architecture: it appears in domain " +
            "adaptation, in learned perceptual losses, and inside the decoders of latent diffusion " +
            "models.",
        },
      ],
    },
  ],

  references: [
    { source: "Goodfellow et al., Generative Adversarial Nets", locator: "NeurIPS 2014" },
    { source: "Arjovsky, Chintala & Bottou, Wasserstein GAN", locator: "ICML 2017" },
    { source: "Heusel et al., GANs Trained by a Two Time-Scale Update Rule", locator: "NeurIPS 2017 (FID)" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-13-neural-architectures.md" },
  ],
};

const diffusionModels: WikiArticle = {
  conceptId: "diffusion-models",
  summary:
    "A diffusion model destroys its training data with Gaussian noise on a fixed schedule, then " +
    "learns to undo one step of that destruction. Generation runs the learned reverse process from " +
    "pure noise. The forward process has no parameters and the reverse target is a plain regression " +
    "on the noise that was added — which is why training is as stable as it is, and why sampling " +
    "is as slow as it is.",

  sections: [
    {
      heading: "Forward: a schedule, not a model",
      blocks: [
        {
          kind: "formula",
          latex: "q(xₜ | xₜ₋₁) = N(xₜ; √(1 − βₜ) · xₜ₋₁, βₜ I)",
          caption: "One step of the fixed forward process, with a small variance βₜ from a chosen schedule",
        },
        {
          kind: "prose",
          text:
            "Gaussians compose, so the t-step marginal is available in closed form and there is no " +
            "need to simulate the chain during training. Write αₜ = 1 − βₜ and ᾱₜ for the product of " +
            "α₁ through αₜ.",
        },
        {
          kind: "formula",
          latex: "xₜ = √ᾱₜ · x₀ + √(1 − ᾱₜ) · ε,   ε ∼ N(0, I)",
          caption: "Jump to any noise level in one shot — the identity the training loop is built on",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "This is what makes training parallel",
          text:
            "Each training step draws a random t, noises a clean sample straight to that level, and " +
            "asks the network to predict the ε that was used. Every noise level is an independent " +
            "regression problem, so training parallelises completely across t — the exact mirror " +
            "image of an autoregressive model, which parallelises over positions in training and " +
            "serialises in sampling. Diffusion serialises in sampling too, but for a different " +
            "reason: the chain, not the data.",
        },
      ],
    },

    {
      heading: "Reverse: predict the noise",
      blocks: [
        {
          kind: "formula",
          latex: "L = E_{x₀, ε, t} ‖ ε − ε_θ(√ᾱₜ x₀ + √(1 − ᾱₜ) ε, t) ‖²",
          caption: "The simplified DDPM objective: mean squared error on the noise, conditioned on the level t",
        },
        {
          kind: "prose",
          text:
            "That is a supervised regression with a target the training loop generated itself, which " +
            "is why there is no adversary, no discriminator balance to maintain, and a loss that " +
            "actually decreases when the model improves. Predicting ε is equivalent up to scaling to " +
            "predicting x₀, and to predicting the score ∇ log p(xₜ) — the gradient of the log density " +
            "of the noised data, which is the connection to score-based generative models and the " +
            "reason the same network can be plugged into an ODE solver instead of a stochastic chain.",
        },
        {
          kind: "example",
          title: "Reading a noise schedule",
          problem: "With a constant βₜ = 0.02 for 100 steps, how much of the original signal survives at t = 100?",
          steps: [
            "αₜ = 1 − 0.02 = 0.98 at every step.",
            "ᾱ₁₀₀ = 0.98¹⁰⁰ ≈ 0.133.",
            "The signal coefficient is √0.133 ≈ 0.365, and the noise coefficient is √(1 − 0.133) ≈ 0.931.",
          ],
          answer:
            "Roughly a third of the original amplitude remains, which is not yet the pure noise the sampler needs to start from — real schedules run 1,000 steps, or shape β so ᾱ reaches nearly zero. The schedule is a design choice with real consequences: it decides how the model's capacity is spread across noise levels, and cosine schedules beat linear ones mostly by spending less of the budget on levels that are already nearly pure noise.",
        },
      ],
    },

    {
      heading: "Sampling, and what it costs",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "The sampling loop",
              description:
                "Start from x_T ∼ N(0, I), and at each step predict the noise, subtract a scaled version of it, and add a little fresh noise back. Every step is a full forward pass of the network, so a 1,000-step sample costs 1,000 passes.",
            },
            {
              term: "Fast samplers",
              description:
                "DDIM makes the reverse process deterministic and skips steps; higher-order ODE solvers and distillation push a good sample down to tens of steps or fewer. This is where most engineering effort in the family has gone, because sampling cost is its one real weakness.",
            },
            {
              term: "Classifier-free guidance",
              description:
                "Train with the conditioning dropped some fraction of the time, then at sampling extrapolate away from the unconditional prediction: ε = ε_uncond + s(ε_cond − ε_uncond). Raising s buys prompt adherence and costs diversity — the single most consequential knob in a text-to-image model.",
            },
            {
              term: "Latent diffusion",
              description:
                "Run the whole process in the latent space of a pretrained autoencoder rather than in pixels. A 512 x 512 image becomes a 64 x 64 latent, cutting the cost of every one of those forward passes by more than an order of magnitude. This is what made high-resolution image generation practical on ordinary hardware.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Stable training does not mean cheap generation",
          text:
            "A GAN produces a sample in one forward pass; a diffusion model needs a sequence of " +
            "them. The family traded sampling cost for training stability and mode coverage, and " +
            "that trade is why it won — training a model once is a fixed cost, while a fragile " +
            "adversarial recipe is a cost paid on every new dataset.",
        },
      ],
    },
  ],

  references: [
    { source: "Ho, Jain & Abbeel, Denoising Diffusion Probabilistic Models", locator: "NeurIPS 2020" },
    { source: "Song, Meng & Ermon, Denoising Diffusion Implicit Models", locator: "ICLR 2021 (DDIM)" },
    { source: "Rombach et al., High-Resolution Image Synthesis with Latent Diffusion Models", locator: "CVPR 2022" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-13-neural-architectures.md" },
  ],
};

const mixtureOfExperts: WikiArticle = {
  conceptId: "mixture-of-experts",
  summary:
    "A mixture-of-experts layer replaces one feed-forward block with many, and a router that sends " +
    "each token to a small number of them. Parameters grow with the number of experts while the " +
    "compute per token grows with the number actually used — so a model can hold far more knowledge " +
    "than it spends on any single token. What it does not save is memory, and the router is a " +
    "discrete decision inside a system trained by gradients.",

  sections: [
    {
      heading: "Sparse routing",
      blocks: [
        {
          kind: "formula",
          latex: "y = Σ_{i ∈ TopK(g(x))} gᵢ(x) · Eᵢ(x)",
          caption: "A gate scores every expert; only the top k are evaluated, and their outputs are combined by gate weight",
        },
        {
          kind: "example",
          title: "Total parameters against active parameters",
          problem: "A layer has 8 experts of 100M parameters each, with top-2 routing. What does it hold, and what does it cost per token?",
          steps: [
            "Total expert parameters: 8 x 100M = 800M, all of which must live in memory.",
            "Evaluated per token: 2 x 100M = 200M.",
            "Active fraction: 2/8 = 25%.",
          ],
          answer:
            "800M parameters held, 200M used per token — four times the capacity at the same compute as a 200M dense layer. That ratio is the entire proposition, and it is why frontier models report two parameter counts. The catch is in the first line: all 800M must be resident, so the memory bill is that of the large model even though the FLOP bill is that of the small one.",
        },
        {
          kind: "prose",
          text:
            "The dense/sparse comparison is best read as a claim about what scales. Adding experts " +
            "buys capacity at near-constant compute per token; making a dense model wider buys " +
            "capacity at proportional compute. Where a task's difficulty is knowledge rather than " +
            "reasoning depth, the first trade is the better one — which is roughly the empirical " +
            "finding that made the technique standard.",
        },
      ],
    },

    {
      heading: "Keeping the router honest",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Routing collapse is the default outcome",
          text:
            "The gate is trained by gradients that only flow through the experts it chose. An " +
            "expert that is picked early gets trained, becomes better, and is picked more; an expert " +
            "that is never picked never improves and is never picked again. Left alone, a top-2 " +
            "router over 8 experts converges to using 2 of them and wasting the rest — a rich-get-" +
            "richer feedback loop, not a slow drift.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Load-balancing loss",
              description:
                "An auxiliary term, added to the main loss with a small coefficient, penalising the correlation between the fraction of tokens routed to each expert and the mean gate probability assigned to it. Minimised when both are uniform, so it pushes traffic to spread without dictating which expert gets what.",
            },
            {
              term: "Capacity factor",
              description:
                "Each expert has a fixed buffer per batch, sized as capacity_factor x tokens / experts. Tokens arriving at a full expert are dropped — passed through the residual connection unchanged. A factor near 1.0 is efficient and drops more; 1.25 is a common compromise.",
            },
            {
              term: "Noisy top-k",
              description:
                "Adding noise to the gate logits before the top-k selection keeps under-used experts occasionally sampled, which gives them gradient and is a cheap partial defence against collapse.",
            },
            {
              term: "Shared experts",
              description:
                "Reserving one or two experts that every token visits, alongside the routed ones. The shared expert absorbs the generic computation every token needs, freeing the routed experts to specialise rather than each relearning the common case.",
            },
          ],
        },
      ],
    },

    {
      heading: "What it is really trading",
      blocks: [
        {
          kind: "table",
          headers: ["Resource", "Dense model", "Sparse mixture at equal active parameters"],
          rows: [
            ["FLOPs per token", "Baseline", "About the same — that is the design goal"],
            ["Parameters held in memory", "Baseline", "Several times larger; usually the binding constraint"],
            ["Quality at fixed compute", "Baseline", "Better, given enough data to train every expert"],
            ["Serving complexity", "Simple", "Experts sharded across devices; a token's route decides which device does its work"],
            ["Training stability", "Standard", "Extra loss terms, and sensitivity to routing hyperparameters"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "It is an ensemble that never averages",
          text:
            "Bagging trains many models on resampled data and averages all of them at inference, " +
            "paying full cost for every member. A mixture of experts trains its members jointly and " +
            "evaluates a chosen few, so its cost is set by k rather than by the number of experts. " +
            "The variance reduction that motivates bagging is largely gone; what is bought instead " +
            "is specialisation at bounded compute.",
        },
      ],
    },
  ],

  references: [
    { source: "Shazeer et al., Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer", locator: "ICLR 2017" },
    { source: "Fedus, Zoph & Shazeer, Switch Transformers", locator: "JMLR 23, 2022" },
    { source: "Jacobs et al., Adaptive Mixtures of Local Experts", locator: "Neural Computation 3(1), 1991" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-13-neural-architectures.md" },
  ],
};

export const ml13NeuralArchitectures: WikiArticle[] = [
  architectureFamilies,
  residualNetworks,
  lstmAndGru,
  autoregressiveModels,
  stateSpaceModels,
  graphNeuralNetworks,
  generativeAdversarialNetworks,
  diffusionModels,
  mixtureOfExperts,
];
