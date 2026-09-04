import type { WikiArticle } from "./types";

export const markovRandomFieldsWiki: WikiArticle = {
  conceptId: "markov-random-fields",
  summary:
    "A Markov random field is an undirected graphical model. Its defining property is local: every " +
    "node is conditionally independent of the whole rest of the graph given its immediate neighbours. " +
    "The Hammersley–Clifford theorem turns that local statement into a global one — the joint " +
    "factorizes as a product of potentials over cliques — and that equivalence between “what the graph " +
    "says” and “how the distribution is built” is what makes MRFs usable.",

  sections: [
    {
      heading: "The Markov properties",
      blocks: [
        {
          kind: "prose",
          text:
            "Three conditions are stated for undirected models. They are equivalent for strictly " +
            "positive distributions, which is the case you will meet in practice, so they are usually " +
            "treated as one idea seen from three angles.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Pairwise Markov",
              description:
                "Any two non-adjacent nodes are conditionally independent given all the others.",
            },
            {
              term: "Local Markov",
              description:
                "A node is conditionally independent of everything else given its neighbours. Those " +
                "neighbours are its Markov blanket.",
            },
            {
              term: "Global Markov",
              description:
                "If removing the node set Z disconnects the graph into pieces containing X and Y " +
                "respectively, then X ⊥ Y | Z.",
            },
          ],
        },
        {
          kind: "formula",
          latex: "Xᵢ ⊥ X_{V∖({i}∪N(i))} | X_{N(i)}",
          caption: "The local Markov property: neighbours screen a node off from everything else",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Separation is simpler here than in a DAG",
          text:
            "Undirected separation is ordinary graph separation: cut the conditioning nodes out and see " +
            "whether a path remains. There is no collider case, no flipped rule, nothing to remember " +
            "beyond “is there still a path?”. That simplicity is the flip side of the expressiveness " +
            "an MRF gives up — with no arrows there are no v-structures to represent.",
        },
      ],
    },

    {
      heading: "Why symmetric edges are the right tool sometimes",
      blocks: [
        {
          kind: "prose",
          text:
            "Take an image, and model each pixel's label as a random variable that should agree with " +
            "its four neighbours. Does the pixel above cause the pixel below, or the other way around? " +
            "The question has no answer. Any directed model must pick an ordering — raster-scan order, " +
            "say — and that choice is an artefact of the modeller, not a feature of the image. It also " +
            "breaks the symmetry of the model in ways that show up as directional artefacts in the " +
            "output.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The reason is symmetry, not parameter count",
          text:
            "MRFs are sometimes justified as “needing fewer parameters”. That is not a general " +
            "guarantee — a densely connected MRF with large cliques can need far more parameters than a " +
            "sparse DAG on the same variables. The motivating reason is that spatial and relational " +
            "dependence genuinely has no direction, and an undirected model is the one that does not " +
            "invent one.",
        },
        {
          kind: "list",
          items: [
            "Image segmentation and denoising — neighbouring pixels likely share a label.",
            "The Ising and Potts models in statistical physics, where MRFs originated.",
            "Conditional random fields for sequence labelling, an MRF conditioned on observed inputs.",
            "Social and relational networks, where “influence” runs both ways along an edge.",
          ],
        },
      ],
    },

    {
      heading: "Hammersley–Clifford: local implies global",
      blocks: [
        {
          kind: "prose",
          text:
            "The Markov properties are constraints on conditional independences. The factorization is " +
            "a recipe for building a distribution. It is not obvious that they meet. Hammersley–Clifford " +
            "says that for any strictly positive distribution they are the same thing: a distribution " +
            "satisfies the Markov properties of a graph if and only if it factorizes as a product of " +
            "non-negative potentials over the graph's cliques.",
        },
        {
          kind: "formula",
          latex: "p(x) = (1/Z) ∏_{C ∈ cliques(G)} ψ_C(x_C)",
          caption:
            "ψ_C ≥ 0 is a potential on clique C; Z = Σ_x ∏_C ψ_C(x_C) is the partition function",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Clique",
              description:
                "A set of nodes that are all pairwise adjacent. Maximal cliques — those not contained " +
                "in a larger clique — are enough, since a smaller clique's potential can be absorbed.",
            },
            {
              term: "Potential ψ_C",
              description:
                "A non-negative compatibility score for a joint configuration of the clique. Higher " +
                "means more preferred. It is not a probability and need not sum to anything.",
            },
            {
              term: "Partition function Z",
              description:
                "The global normaliser. Computing it in general requires summing over all " +
                "configurations, and it is the central computational obstacle in MRFs.",
            },
          ],
        },
        {
          kind: "prose",
          text:
            "Potentials are usually written in exponential form, ψ_C(x_C) = exp(−E_C(x_C)), which makes " +
            "the product a sum of energies and the distribution a Gibbs distribution — the inheritance " +
            "from statistical physics is direct. Low energy means high probability.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Potentials do not carry causal meaning",
          text:
            "In a Bayesian network each factor is a conditional probability, so it can be read on its " +
            "own: p(W | R, S) means something. In an MRF a potential is only meaningful relative to all " +
            "the others through Z. Doubling one potential changes nothing after normalisation. Do not " +
            "read a potential as a marginal, a conditional, or a causal strength.",
        },
      ],
    },

    {
      heading: "Worked example: a two-node MRF",
      blocks: [
        {
          kind: "example",
          title: "Normalising an Ising-style pair",
          problem:
            "Two binary spins X, Y ∈ {−1, +1} joined by one edge, with ψ(x, y) = exp(β·x·y) and " +
            "β = 0.5. Find P(X = Y).",
          steps: [
            "The four configurations give ψ = e^{0.5} for the two agreeing states, e^{−0.5} for the two disagreeing states.",
            "e^{0.5} ≈ 1.6487, e^{−0.5} ≈ 0.6065.",
            "Z = 2(1.6487) + 2(0.6065) = 4.5104.",
            "P(X = Y) = 2(1.6487) / 4.5104.",
          ],
          answer:
            "≈ 0.731. A positive β rewards agreement; β = 0 would give 0.5, and large β drives the pair " +
            "toward always matching — the mechanism behind smoothing in image models.",
        },
      ],
    },

    {
      heading: "A Markov chain is the simplest MRF",
      blocks: [
        {
          kind: "prose",
          text:
            "Lay the nodes out in a line, X₁ – X₂ – X₃ – ⋯ – Xₙ, each joined only to its immediate " +
            "neighbours. The local Markov property then reads: Xᵢ is conditionally independent of " +
            "everything else given Xᵢ₋₁ and Xᵢ₊₁. Restricted to the forward direction, that is exactly " +
            "the Markov property — the future depends on the past only through the present.",
        },
        {
          kind: "prose",
          text:
            "The cliques of a chain graph are its edges, so Hammersley–Clifford gives " +
            "p(x) = (1/Z)∏ᵢ ψ(xᵢ, xᵢ₊₁): a product of pairwise transition potentials. Normalise each " +
            "potential into a conditional distribution and Z becomes 1, recovering the familiar " +
            "p(x₁)∏ p(xᵢ₊₁ | xᵢ). A Markov chain is an MRF whose graph happens to be a path.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Tree structure is what makes inference tractable",
          text:
            "Chains and trees have no cycles, and on them exact inference runs in linear time by " +
            "message passing — the forward–backward algorithm for chains is precisely this. Add one " +
            "cycle and exact inference becomes exponential in the graph's treewidth, which is why " +
            "grid-structured MRFs need approximate methods such as loopy belief propagation or " +
            "variational inference.",
        },
      ],
    },
  ],

  references: [
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§8.3, Markov Random Fields — factorization and the Hammersley–Clifford theorem" },
    { source: "Murphy, Probabilistic Machine Learning: An Introduction", locator: "§4.3, Undirected Graphical Models" },
    { source: "Mathlingo assessment bank", locator: "assessments/gm-01-graphs-and-markov-structure.md" },
  ],
};
