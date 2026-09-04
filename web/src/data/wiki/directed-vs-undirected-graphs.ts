import type { WikiArticle } from "./types";

export const directedVsUndirectedGraphsWiki: WikiArticle = {
  conceptId: "directed-vs-undirected-graphs",
  summary:
    "Graphical models come in two flavours, and the difference is not cosmetic. Directed models " +
    "(Bayesian networks) use arrows and factor the joint into a product of conditionals, one per " +
    "variable given its parents. Undirected models (Markov random fields) use symmetric edges and " +
    "factor the joint into potentials over cliques. Each can express independence structures the " +
    "other cannot, which is why both survive rather than one winning.",

  sections: [
    {
      heading: "Directed graphs: Bayesian networks",
      blocks: [
        {
          kind: "prose",
          text:
            "In a directed model each edge carries an arrow. An edge A → B makes A a parent of B, and " +
            "says that B's conditional distribution is written given A. The graph must be acyclic — a " +
            "directed acyclic graph, or DAG — and the joint is the product of one conditional per node.",
        },
        {
          kind: "formula",
          latex: "p(x₁, …, xₙ) = ∏ᵢ p(xᵢ | pa(xᵢ))",
          caption: "The chain-rule factorization a DAG encodes; pa(xᵢ) is the parent set of node i",
        },
        {
          kind: "prose",
          text:
            "This is just the ordinary chain rule of probability with terms deleted. The full chain " +
            "rule conditions each variable on all its predecessors in some ordering; the DAG says you " +
            "may drop every predecessor that is not a parent. Each dropped variable is one missing edge, " +
            "and one conditional-independence assumption.",
        },
        {
          kind: "example",
          title: "Reading a factorization off a DAG",
          problem: "A model has Rain → WetGrass and Sprinkler → WetGrass. Write the joint.",
          steps: [
            "Rain has no parents, so it contributes p(Rain).",
            "Sprinkler has no parents, so it contributes p(Sprinkler).",
            "WetGrass has both as parents, so it contributes p(WetGrass | Rain, Sprinkler).",
            "Multiply the three factors.",
          ],
          answer:
            "p(R, S, W) = p(R)·p(S)·p(W | R, S). Note there is no p(S | R) factor — the missing R–S " +
            "edge asserts Rain and Sprinkler are marginally independent.",
        },
      ],
    },

    {
      heading: "Why acyclicity is not a technicality",
      blocks: [
        {
          kind: "prose",
          text:
            "Suppose you allowed A → B and B → A. The factorization would ask for p(A | B)·p(B | A), " +
            "which is not in general a valid joint distribution — it need not normalise, and it defines " +
            "each factor in terms of the very thing you are trying to compute. Acyclicity is exactly the " +
            "condition guaranteeing that a topological ordering exists, and therefore that the product of " +
            "conditionals is a genuine chain-rule expansion of a genuine joint.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Feedback loops need a different device",
          text:
            "Real systems do contain feedback — a price affects demand, which affects the price. The " +
            "DAG framework handles this by unrolling time: Priceₜ → Demandₜ → Priceₜ₊₁. Each time " +
            "index is its own node, and the unrolled graph is acyclic even though the system it models " +
            "is not. A dynamic Bayesian network is precisely this trick.",
        },
      ],
    },

    {
      heading: "Undirected graphs: Markov random fields",
      blocks: [
        {
          kind: "prose",
          text:
            "When a relationship has no natural direction — adjacent pixels in an image, neighbouring " +
            "sites on a lattice, mutual friends in a social network — forcing an arrow means inventing " +
            "an asymmetry the problem does not have. Undirected models keep the edges symmetric. The " +
            "cost is that the factors no longer have a clean interpretation as conditional " +
            "probabilities, so a global normalising constant is needed.",
        },
        {
          kind: "formula",
          latex: "p(x) = (1/Z) ∏_C ψ_C(x_C),   Z = Σ_x ∏_C ψ_C(x_C)",
          caption:
            "Product of non-negative potentials over cliques C, divided by the partition function Z",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Z is where the difficulty lives",
          text:
            "Each ψ_C is only required to be non-negative, not to be a probability, so the product " +
            "does not normalise by itself. Computing Z means summing over every configuration of every " +
            "variable — exactly the exponential sum the graph was supposed to save you from. Directed " +
            "models get their normalisation for free because each factor is already a conditional " +
            "distribution summing to 1. This is the practical price of dropping directions.",
        },
      ],
    },

    {
      heading: "Neither one subsumes the other",
      blocks: [
        {
          kind: "table",
          headers: ["", "Directed (Bayesian network)", "Undirected (MRF)"],
          rows: [
            ["Edge meaning", "Parent → child, asymmetric", "Symmetric association"],
            ["Factorization", "∏ p(xᵢ | parents)", "(1/Z) ∏ potentials over cliques"],
            ["Normalisation", "Automatic — each factor is a conditional", "Requires the partition function Z"],
            ["Natural fit", "Generative / temporal / causal stories", "Spatial, relational, symmetric structure"],
            ["Can express", "Explaining-away (v-structures)", "Cyclic symmetric dependence"],
            ["Cannot express", "Some symmetric cyclic structures", "V-structures, without adding edges"],
          ],
        },
        {
          kind: "prose",
          text:
            "The asymmetry in the last two rows is the reason both formalisms persist. A four-cycle " +
            "A–B–C–D–A with no chords encodes independences no DAG can capture without adding edges. " +
            "Conversely the v-structure below is invisible to any undirected graph.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The v-structure: A → C ← B",
          text:
            "Two parents pointing into a common child, with no edge between them, encodes something " +
            "genuinely peculiar: A and B are marginally independent, but become dependent once C is " +
            "observed. Learning the alarm rang makes burglary and earthquake compete as explanations. " +
            "An undirected graph has no way to say “independent normally, dependent when conditioned on” " +
            "— its edges are symmetric statements that do not flip direction under conditioning. " +
            "Moralization (marrying the parents with an A–B edge before dropping the arrows) is the " +
            "standard conversion, and it necessarily loses this independence.",
        },
      ],
    },

    {
      heading: "Choosing between them",
      blocks: [
        {
          kind: "list",
          items: [
            "If you can tell a generative story — first this is drawn, then that is drawn given it — " +
              "a DAG will usually be easier to specify and to sample from.",
            "If the variables sit on a grid, a lattice, or any structure where “which one came first” " +
              "is meaningless, reach for an MRF.",
            "If you need to compute normalised probabilities cheaply, the directed form's free " +
              "normalisation is a large practical advantage.",
            "Both convert into the same factor graph for inference, which is why message-passing " +
              "algorithms are usually stated on factor graphs rather than on either form directly.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§8.1–8.3, Bayesian Networks and Markov Random Fields" },
    { source: "Murphy, Probabilistic Machine Learning: An Introduction", locator: "§4.2–4.3, Directed and Undirected Graphical Models" },
    { source: "Mathlingo assessment bank", locator: "assessments/gm-01-graphs-and-markov-structure.md" },
  ],
};
