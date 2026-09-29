import type { WikiArticle } from "../types";

/**
 * Machine Learning cluster 17 — the deeper lessons of two architecture chapters.
 *
 * `state-space-models` introduces the linear recurrence and its two evaluation
 * forms; S4 and Mamba are the two ideas that made it competitive — a principled
 * initialisation and fast kernel for the time-invariant case, then giving that
 * up for input-dependent (selective) dynamics. `graph-neural-networks`
 * introduces message passing; the next two articles cover the framework that
 * unifies the named variants and bounds their power, and the failure modes that
 * decide whether a GNN works in practice.
 */

const structuredStateSpaces: WikiArticle = {
  conceptId: "structured-state-spaces-s4",
  summary:
    "S4 is a linear, time-invariant state space layer designed to remember over tens of thousands of steps. Two " +
    "ideas make it work: initialise the state matrix with HiPPO, which is built to compress the input's history, " +
    "and give that matrix a structure (diagonal, or diagonal plus low-rank) under which the layer's convolution " +
    "kernel can be computed quickly. Training then runs as one long convolution; inference runs as a recurrence.",
  sections: [
    {
      heading: "From continuous system to sequence layer",
      blocks: [
        {
          kind: "formula",
          latex: "x'(t) = A x(t) + B u(t), \\quad y(t) = C x(t) \\;\\;\\xrightarrow{\\;\\Delta\\;}\\;\\; x_k = \\bar{A} x_{k-1} + \\bar{B} u_k, \\quad y_k = C x_k",
          caption: "Discretise with step size $\\Delta$, e.g. zero-order hold: $\\bar{A} = e^{\\Delta A}$, $\\bar{B} = (\\Delta A)^{-1}(e^{\\Delta A} - I)\\,\\Delta B$",
        },
        {
          kind: "prose",
          text: "$\\Delta$ is a learned timescale. Because the underlying model is continuous, changing $\\Delta$ changes how finely it samples the same dynamics — which is why an S4 layer can be run at a different sampling rate than it was trained on by rescaling $\\Delta$.",
        },
      ],
    },
    {
      heading: "The convolution view",
      blocks: [
        {
          kind: "formula",
          latex: "y = \\bar{K} * u, \\qquad \\bar{K} = \\left(C\\bar{B},\\; C\\bar{A}\\bar{B},\\; C\\bar{A}^2\\bar{B},\\; \\ldots,\\; C\\bar{A}^{L-1}\\bar{B}\\right)",
          caption: "Unrolling the recurrence from $x_{-1} = 0$ gives a convolution with a length-$L$ kernel",
        },
        {
          kind: "list",
          items: [
            "Training: compute $\\bar{K}$ once per layer, then convolve with an FFT in $O(L \\log L)$ — fully parallel over the sequence, unlike an RNN.",
            "Inference: step the recurrence, $O(1)$ time and memory per new token with a fixed-size state.",
            "The equivalence needs time invariance: the same $\\bar{A}, \\bar{B}, C$ at every step. That is exactly what Mamba later gives up.",
          ],
        },
      ],
    },
    {
      heading: "Why HiPPO and structure",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "HiPPO initialisation", description: "A specific $A$ derived so that the state holds the coefficients of the best polynomial approximation (in a Legendre basis) of the whole input history so far. Randomly initialised $A$ forgets within tens of steps; HiPPO-initialised $A$ gives the model memory to start from." },
            { term: "Structured $A$", description: "Computing $\\bar{A}^k$ for every $k$ up to $L$ naively costs far too much. Writing $A$ as diagonal plus low-rank (S4), or simply diagonal (S4D, DSS), turns the kernel into sums of geometric sequences in the eigenvalues, computable in near-linear time." },
            { term: "Stability", description: "Eigenvalues of $A$ are kept with negative real part, so $|e^{\\Delta\\lambda}| < 1$ and nothing blows up over long sequences; their magnitude sets how quickly each state channel forgets." },
          ],
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "A scalar kernel",
          problem:
            "A one-dimensional discretised SSM has $\\bar{A} = 0.9$, $\\bar{B} = 1$, $C = 1$. Write the first four kernel entries and compute $y_2$ for the input $u = (2, 1, 0, \\ldots)$.",
          steps: [
            "$\\bar{K}_j = C\\bar{A}^j\\bar{B} = 0.9^j$: $(1, 0.9, 0.81, 0.729)$.",
            "$y_2 = \\bar{K}_0 u_2 + \\bar{K}_1 u_1 + \\bar{K}_2 u_0 = 0 + 0.9 \\cdot 1 + 0.81 \\cdot 2$.",
          ],
          answer: "$y_2 = 2.52$ — the same number the recurrence gives by stepping $x_0 = 2$, $x_1 = 2.8$, $x_2 = 2.52$.",
        },
      ],
    },
    {
      heading: "Strengths and the gap",
      blocks: [
        {
          kind: "prose",
          text: "S4 was the first model to solve the hardest Long Range Arena tasks, including Path-X on sequences of $16{,}384$ steps, and it is strong on continuous signals — audio, time series, genomics. Its weakness is the flip side of time invariance: the kernel is the same whatever the input says, so it cannot decide to remember one token and ignore the next. Tasks like selective copying and associative recall, trivial for attention, expose this.",
        },
      ],
    },
  ],
  references: [
    { source: "Gu, Goel & Ré, Efficiently Modeling Long Sequences with Structured State Spaces (ICLR 2022)", locator: "§2–3" },
    { source: "Gu et al., HiPPO: Recurrent Memory with Optimal Polynomial Projections (NeurIPS 2020)", locator: "§2" },
    { source: "Gu et al., On the Parameterization and Initialization of Diagonal State Space Models (NeurIPS 2022)", locator: "§3" },
  ],
};

const mambaSelectiveSsm: WikiArticle = {
  conceptId: "mamba-selective-ssm",
  summary:
    "Mamba makes a state space model selective: the step size $\\Delta$ and the projections $B$ and $C$ are computed " +
    "from the current input, so the model can choose, token by token, whether to write into its state, keep it, or " +
    "reset it. That breaks the convolution trick S4 relied on, so Mamba trains with a hardware-aware parallel " +
    "scan instead — keeping linear time in sequence length and a constant-size state at inference.",
  sections: [
    {
      heading: "What becomes input-dependent",
      blocks: [
        {
          kind: "formula",
          latex: "\\Delta_t = \\operatorname{softplus}(W_\\Delta u_t), \\quad B_t = W_B u_t, \\quad C_t = W_C u_t, \\qquad x_t = e^{\\Delta_t A}\\, x_{t-1} + \\Delta_t B_t\\, u_t, \\quad y_t = C_t x_t",
          caption: "$A$ is diagonal and fixed across time; $\\Delta_t$, $B_t$, $C_t$ change with every token (simplified discretisation of $B$)",
        },
        {
          kind: "definitions",
          items: [
            { term: "Large $\\Delta_t$", description: "$e^{\\Delta_t A} \\to 0$: the old state is wiped and the current input dominates — ‘focus on this token’." },
            { term: "Small $\\Delta_t$", description: "$e^{\\Delta_t A} \\to I$ and the input term vanishes: the state passes through untouched — ‘ignore this token’." },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Selectivity is gating",
          text: "With a single state dimension, $A = -1$, $B = 1$ and the exact zero-order-hold discretisation, the update is $x_t = (1 - g_t)x_{t-1} + g_t u_t$ with $g_t = 1 - e^{-\\Delta_t}$ — exactly the gated update of an LSTM or GRU. Mamba is a linear RNN whose gates are driven by the input, with a much wider state.",
        },
      ],
    },
    {
      heading: "Losing the convolution, keeping the speed",
      blocks: [
        {
          kind: "list",
          items: [
            "Time-varying $\\bar{A}_t$ means there is no single kernel $\\bar{K}$, so the FFT convolution is gone.",
            "The recurrence $x_t = \\bar{A}_t x_{t-1} + \\bar{B}_t u_t$ is still linear in $x$, and composing linear maps is associative — so a parallel prefix scan computes all states in $O(L)$ work and $O(\\log L)$ depth.",
            "The expanded state has size (batch $\\times$ length $\\times$ channels $\\times$ $N$), too big to write to GPU main memory. Mamba's kernel keeps it in fast on-chip SRAM, fuses discretisation, scan and output projection into one pass, and recomputes the states in the backward pass instead of storing them.",
          ],
        },
      ],
    },
    {
      heading: "The block and the trade-offs",
      blocks: [
        {
          kind: "prose",
          text: "A Mamba block expands the input, applies a short causal convolution, a SiLU, the selective SSM, multiplies by a gated branch, and projects back — one homogeneous block replacing the attention-plus-MLP pair. Generation costs $O(1)$ per token with a state of fixed size, where a transformer's KV cache grows linearly with the context.",
        },
        {
          kind: "table",
          headers: ["", "Attention", "Mamba"],
          rows: [
            ["Training cost in length $L$", "$O(L^2)$", "$O(L)$"],
            ["Generation memory", "KV cache grows with $L$", "constant state"],
            ["Exact recall of an arbitrary earlier token", "easy — it is still in the cache", "limited by what fit in the state"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A fixed state is a fixed budget",
          text: "Anything not written into the state is gone. Copying long strings or looking up a phone number seen $100{,}000$ tokens ago is hard for a pure SSM, which is why production models (Jamba, Zamba, and others) interleave a few attention layers with many Mamba layers.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Reading $\\Delta$ as a gate",
          problem:
            "A state channel has $A = -2$. Compute the decay factor $e^{\\Delta A}$ for $\\Delta = 0.01$ and $\\Delta = 2$, and interpret each.",
          steps: [
            "$\\Delta = 0.01$: $e^{-0.02} \\approx 0.980$ — the state is almost fully preserved.",
            "$\\Delta = 2$: $e^{-4} \\approx 0.018$ — the state is almost fully overwritten by the new input.",
          ],
          answer: "The same channel acts as long memory on one token and as a reset on another, chosen by the input.",
        },
      ],
    },
  ],
  references: [
    { source: "Gu & Dao, Mamba: Linear-Time Sequence Modeling with Selective State Spaces (2023)", locator: "§3" },
    { source: "Dao & Gu, Transformers are SSMs (Mamba-2, ICML 2024)", locator: "§2–3" },
    { source: "Lieber et al., Jamba: A Hybrid Transformer-Mamba Language Model (2024)", locator: "§2" },
  ],
};

const messagePassingNeuralNetworks: WikiArticle = {
  conceptId: "message-passing-neural-networks",
  summary:
    "Almost every graph neural network is a message passing neural network: each node computes messages from its " +
    "neighbours, aggregates them with a permutation-invariant function, and updates its own state. GCN, GraphSAGE, " +
    "GAT and GIN differ only in those three choices — and the Weisfeiler–Lehman test sets a hard ceiling on what any " +
    "of them can tell apart.",
  sections: [
    {
      heading: "The framework",
      blocks: [
        {
          kind: "formula",
          latex: "m_v^{(\\ell)} = \\bigoplus_{u \\in N(v)} \\psi\\big(h_v^{(\\ell)}, h_u^{(\\ell)}, e_{uv}\\big), \\qquad h_v^{(\\ell+1)} = \\phi\\big(h_v^{(\\ell)}, m_v^{(\\ell)}\\big)",
          caption: "Message $\\psi$, permutation-invariant aggregation $\\bigoplus$ (sum, mean, max, attention), update $\\phi$",
        },
      ],
    },
    {
      heading: "The named variants",
      blocks: [
        {
          kind: "table",
          headers: ["Model", "Aggregation", "Update / distinguishing idea"],
          rows: [
            ["GCN", "degree-normalised sum $\\sum_u h_u/\\sqrt{d_u d_v}$ (self-loop included)", "one shared linear map, then non-linearity"],
            ["GraphSAGE", "mean, max or LSTM over a sampled set of neighbours", "concatenate own state with the aggregate; neighbour sampling makes it inductive and scalable"],
            ["GAT", "weighted sum with learned attention $\\alpha_{uv} = \\operatorname{softmax}_u(a^\\top[Wh_v \\,\\|\\, Wh_u])$", "neighbours contribute unequally, decided by their features"],
            ["GIN", "plain sum", "$h_v' = \\text{MLP}\\big((1+\\varepsilon)h_v + \\sum_u h_u\\big)$ — as expressive as 1-WL"],
          ],
        },
      ],
    },
    {
      heading: "The Weisfeiler–Lehman ceiling",
      blocks: [
        {
          kind: "prose",
          text: "The 1-WL test colours every node, then repeatedly recolours each node by hashing its colour together with the multiset of its neighbours' colours. Two graphs whose colour histograms never differ are declared ‘possibly isomorphic’. A message passing layer is a learned, continuous version of one WL round, so no MPNN can distinguish two graphs that 1-WL cannot.",
        },
        {
          kind: "list",
          items: [
            "Sum is injective on multisets (with suitable features), so sum-aggregating GNNs like GIN can match 1-WL exactly.",
            "Mean loses multiplicity — neighbourhoods $\\{a\\}$ and $\\{a, a\\}$ look the same; max loses even more — $\\{a, b\\}$ and $\\{a, a, b\\}$ look the same. GCN and mean-GraphSAGE are therefore strictly weaker than 1-WL.",
            "1-WL cannot tell two disjoint triangles from a hexagon (every node has two neighbours of the same colour in both), cannot count cycles in general, and cannot tell many regular graphs apart. Positional encodings, subgraph GNNs and higher-order ($k$-WL) networks exist to break this ceiling.",
          ],
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "One GIN update",
          problem:
            "Scalar features: node $v$ has $h_v = 1$ and neighbours with features $2, 3, 4$. With $\\varepsilon = 0.5$ and the MLP taken as the identity, compute $h_v'$. What would a mean aggregator with the same self-weighting give?",
          steps: [
            "GIN: $(1 + 0.5) \\cdot 1 + (2 + 3 + 4) = 1.5 + 9 = 10.5$.",
            "Mean: $1.5 + (2 + 3 + 4)/3 = 1.5 + 3 = 4.5$ — the same as a node with the single neighbour $3$ would get.",
          ],
          answer: "$h_v' = 10.5$; the mean version gives $4.5$ and has thrown away the neighbour count.",
        },
      ],
    },
  ],
  references: [
    { source: "Gilmer et al., Neural Message Passing for Quantum Chemistry (ICML 2017)", locator: "§2" },
    { source: "Xu et al., How Powerful are Graph Neural Networks? (ICLR 2019)", locator: "§3–4" },
    { source: "Hamilton, Graph Representation Learning", locator: "Ch. 5 and §7.3" },
  ],
};

const gnnPitfalls: WikiArticle = {
  conceptId: "gnn-pitfalls",
  summary:
    "Graph neural networks fail in characteristic ways. Stack too many layers and node representations blur into " +
    "one another (over-smoothing) or information from far away gets crushed through bottleneck edges " +
    "(over-squashing). Apply them where neighbours tend to differ (heterophily) and message passing actively hurts. " +
    "Scale them naively and the neighbourhood explodes. And evaluate them carelessly and the benchmark leaks the answer.",
  sections: [
    {
      heading: "Over-smoothing",
      blocks: [
        {
          kind: "prose",
          text: "Each GCN-style layer replaces a node's state with a weighted average of its neighbourhood. Repeated averaging is a random walk converging to its stationary distribution: after many layers every node in a connected component has nearly the same representation, and a classifier cannot tell them apart. This is why GCN accuracy on citation graphs typically peaks at $2$–$3$ layers and falls after.",
        },
        {
          kind: "list",
          items: [
            "Residual or skip connections and jumping-knowledge (combining every layer's output) let a node keep its own information.",
            "Normalisation designed for graphs (PairNorm) keeps pairwise distances from collapsing.",
            "Decoupling: compute a shallow transformation, then propagate with a personalised-PageRank style scheme (APPNP) that keeps a fixed fraction of each node's own signal.",
          ],
        },
      ],
    },
    {
      heading: "Over-squashing",
      blocks: [
        {
          kind: "prose",
          text: "A node's $L$-hop neighbourhood can grow exponentially with $L$, but everything in it must be compressed into one fixed-size vector passed along a few edges. When the task needs information from far away — long-range interactions in molecules, dependencies across a sparse graph — the signal is squashed through bottleneck edges (regions of negative curvature) and effectively lost. Unlike over-smoothing, adding layers does not help. Fixes change the graph: rewiring to add shortcut edges, a virtual node connected to all others, or a graph transformer that attends globally.",
        },
      ],
    },
    {
      heading: "Heterophily",
      blocks: [
        {
          kind: "formula",
          latex: "h(v) = \\frac{\\big|\\{u \\in N(v) : y_u = y_v\\}\\big|}{|N(v)|}",
          caption: "Node homophily ratio; averaged over nodes it describes the whole graph",
        },
        {
          kind: "prose",
          text: "Averaging neighbours is a good idea when neighbours share your label (citation networks, $h \\approx 0.8$) and a bad one when they don't — fraudsters linking to legitimate accounts, amino acids bonding to different types, dating networks. On low-homophily graphs a plain MLP on node features often beats a GCN. Heterophily-aware designs keep ego and neighbour embeddings separate, aggregate over multi-hop neighbourhoods, or allow signed (subtractive) messages.",
        },
      ],
    },
    {
      heading: "Neighbourhood explosion",
      blocks: [
        {
          kind: "prose",
          text: "Computing one node's output from an $L$-layer GNN needs its whole $L$-hop neighbourhood — roughly $d^L$ nodes at average degree $d$, which on a social graph is most of the graph. Mini-batch training therefore samples: GraphSAGE keeps a fixed fan-out per layer (e.g. $15, 10, 5$ neighbours, so at most $15 \\cdot 10 \\cdot 5 = 750$ nodes at the third hop), ClusterGCN trains on dense subgraph clusters, and GraphSAINT samples whole subgraphs with bias corrections.",
        },
      ],
    },
    {
      heading: "Evaluation traps",
      blocks: [
        {
          kind: "list",
          items: [
            "Link-prediction leakage: if the edges you are testing remain in the graph used for message passing, the model sees the answer. Test (and validation) edges must be removed from the message graph.",
            "Tiny, fixed benchmarks: Cora, Citeseer and PubMed have a few thousand nodes and one canonical split; differences of $1$–$2$ points are within split-to-split and seed-to-seed variance. Report means over many random splits.",
            "Weak baselines: a tuned MLP, or label propagation, is frequently within noise of published GNNs — compare against them with the same tuning budget.",
          ],
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Is this graph homophilous?",
          problem:
            "A node has $8$ neighbours, $2$ of which share its label. Across the graph the average node homophily is $0.22$. Should you expect a GCN to beat an MLP on node features?",
          steps: [
            "This node's homophily is $2/8 = 0.25$.",
            "A graph-wide average of $0.22$ means most messages come from differently labelled nodes, so averaging dilutes each node's own evidence.",
          ],
          answer: "No — on a graph this heterophilous, expect a plain GCN to do no better (often worse) than an MLP unless the architecture separates ego and neighbour information.",
        },
      ],
    },
  ],
  references: [
    { source: "Li, Han & Wu, Deeper Insights into Graph Convolutional Networks for Semi-Supervised Learning (AAAI 2018)", locator: "§4" },
    { source: "Alon & Yahav, On the Bottleneck of Graph Neural Networks and its Practical Implications (ICLR 2021)", locator: "§3" },
    { source: "Zhu et al., Beyond Homophily in Graph Neural Networks (NeurIPS 2020)", locator: "§2–3" },
    { source: "Shchur et al., Pitfalls of Graph Neural Network Evaluation (2018)", locator: "§4" },
  ],
};

export const ml17SsmAndGnn: WikiArticle[] = [structuredStateSpaces, mambaSelectiveSsm, messagePassingNeuralNetworks, gnnPitfalls];
