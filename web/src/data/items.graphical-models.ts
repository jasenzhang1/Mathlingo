import type { Item, SourceRef } from "../lib/assessment/types";

/**
 * The servable bank for the graphical-models domain — all 15 concepts, 8 items
 * each, authored from `assessments/gm-01`…`gm-03` and from the wiki articles in
 * `data/wiki/`.
 *
 * Eight per concept is not an arbitrary round number: `auditCoverage` wants at
 * least 8 live items, live coverage at recall/apply/explain, and a difficulty
 * spread of 1.5 logits or more before it will call a pool adequate. Every
 * cluster below clears all three.
 *
 * One deliberate divergence from the markdown bank. Several of its strongest
 * items reach sideways across the graph — the stationary distribution as an
 * eigenvector, EM as soft K-means, BIC for choosing K in a GMM. Those target
 * concepts are not upstream of the graphical-models concepts in `concepts.ts`,
 * so `checkPrereqClosure` would (correctly) block the items: a learner who has
 * legitimately reached `markov-chains` has not necessarily met
 * `eigenvalues-eigenvectors`. Rather than widen the prerequisite graph as a
 * side effect of authoring, those items are re-framed here to be self-contained
 * — the stationary distribution via the balance equations, EM via
 * responsibilities — and the cross-links are kept in the wiki, where they cost
 * nothing. Whether those edges genuinely belong in the graph is a separate
 * question worth its own decision.
 */

/** Authored from the concept and its prerequisites, with no external seed. */
const AUTHORED: SourceRef = {
  id: "mathlingo-authored-gm",
  tier: "generated",
  title: "Mathlingo authored item (graphical models sweep)",
};

const BISHOP: SourceRef = {
  id: "bishop-prml",
  tier: "restricted",
  title: "Pattern Recognition and Machine Learning (Bishop, 2006)",
  locator: "Ch. 8–10, graphical models, mixture models, and approximate inference",
  rewriteApprovedBy: "pending-review",
};

const MURPHY: SourceRef = {
  id: "murphy-pml-intro",
  tier: "restricted",
  title: "Probabilistic Machine Learning: An Introduction (Murphy, 2022)",
  locator: "Ch. 4, 10, 17 — graphical models, variational inference, Gaussian processes",
  rewriteApprovedBy: "pending-review",
};

const GPML: SourceRef = {
  id: "rasmussen-williams-gpml",
  tier: "open",
  title: "Gaussian Processes for Machine Learning (Rasmussen & Williams)",
  url: "https://gaussianprocess.org/gpml/",
  license: "free online edition; verify terms before redistribution",
};

export const graphicalModelsItems: Item[] = [
  // =========================================================================
  // Cluster 1 — Graphs & Markov structure
  // =========================================================================

  // --- Graphs ---------------------------------------------------------------
  {
    id: "graphs--recall-what-nodes-are",
    conceptId: "graphs",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In a graphical model, what does a single node represent?",
    choices: [
      { id: "a", text: "A random variable", correct: true },
      {
        id: "b",
        text: "One observation in the dataset",
        correct: false,
        misconception: {
          id: "nodes-as-datapoints",
          description:
            "Reads the graph as a plot of the data. Nodes are variables; the graph is the same whether you have ten observations or ten million.",
          blameConceptId: "graphs",
        },
      },
      {
        id: "c",
        text: "A parameter of the model to be estimated",
        correct: false,
        misconception: {
          id: "nodes-as-parameters",
          description:
            "Confuses the variables the graph is about with the numbers inside its local factors.",
          blameConceptId: "graphs",
        },
      },
      {
        id: "d",
        text: "A probability value between 0 and 1",
        correct: false,
        misconception: {
          id: "nodes-as-probabilities",
          description: "Collapses the variable with the probability assigned to its values.",
          blameConceptId: "graphs",
        },
      },
    ],
    difficulty: -1.3,
    discrimination: 1.2,
    expectedSeconds: 25,
    prereqClosure: ["graphs"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "graphs--recall-define-graph",
    conceptId: "graphs",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Define a graph, and say what nodes and edges stand for once a graph is used as a graphical model.",
    rubric: {
      elements: [
        {
          id: "graph-object",
          description: "States that a graph is a set of nodes (vertices) together with edges joining pairs of them.",
          weight: 2,
          required: true,
        },
        {
          id: "nodes-are-variables",
          description: "Nodes are random variables.",
          weight: 2,
          required: true,
          misconception: {
            id: "nodes-as-datapoints",
            description: "Treats nodes as data points rather than variables.",
            blameConceptId: "graphs",
          },
        },
        {
          id: "edges-are-dependence",
          description: "Edges represent direct dependence between the variables they join.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: -1.0,
    discrimination: 1.1,
    expectedSeconds: 60,
    prereqClosure: ["graphs", "set-theory"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "graphs--recall-what-graphical-models-do",
    conceptId: "graphs",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which of the following are true of a graphical model? Select all that apply.",
    choices: [
      { id: "a", text: "It encodes conditional independence structure among variables", correct: true },
      { id: "b", text: "A missing edge is an assumption, and carries information", correct: true },
      { id: "c", text: "It can let a joint distribution be stored with far fewer parameters", correct: true },
      {
        id: "d",
        text: "It visualises the observed data the way a scatterplot does",
        correct: false,
        misconception: {
          id: "graph-as-data-viz",
          description:
            "The single most common first-encounter error: a graphical model describes the dependence structure of a distribution, not the data drawn from it.",
          blameConceptId: "graphs",
        },
      },
      {
        id: "e",
        text: "A fully connected graph is the most informative one",
        correct: false,
        misconception: {
          id: "dense-is-informative",
          description:
            "Backwards — a fully connected graph permits every dependence and so imposes no constraint at all. The information is in the gaps.",
          blameConceptId: "graphs",
        },
      },
    ],
    difficulty: -0.7,
    discrimination: 1.3,
    expectedSeconds: 55,
    prereqClosure: ["graphs"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "graphs--apply-full-joint-parameters",
    conceptId: "graphs",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "Ten binary random variables, with no independence assumed at all. How many free parameters " +
      "does the full joint distribution have? (Remember the probabilities must sum to 1.)",
    answerKey: 1023,
    tolerance: 0.001,
    difficulty: -0.3,
    discrimination: 1.4,
    expectedSeconds: 70,
    prereqClosure: ["graphs", "set-theory"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "graphs--apply-chain-parameters",
    conceptId: "graphs",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "The same ten binary variables, now arranged in a chain: each one depends directly only on the " +
      "one before it, so the joint is p(x1)·p(x2|x1)·…·p(x10|x9). How many free parameters now?",
    answerKey: 19,
    tolerance: 0.001,
    difficulty: 0.2,
    discrimination: 1.6,
    expectedSeconds: 130,
    prereqClosure: ["graphs", "set-theory"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "graphs--explain-missing-edges",
    conceptId: "graphs",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Someone proposes using a fully connected graph so as 'not to lose any information'. Explain " +
      "why this gets the logic of graphical models exactly backwards.",
    rubric: {
      elements: [
        {
          id: "edges-permit",
          description:
            "States that an edge permits a dependence rather than asserting one, so a complete graph imposes no constraint on the joint.",
          weight: 3,
          required: true,
          misconception: {
            id: "dense-is-informative",
            description: "Believes more edges means more information encoded.",
            blameConceptId: "graphs",
          },
        },
        {
          id: "absence-is-the-claim",
          description:
            "States that the missing edges are the assumptions, and therefore where all the content is.",
          weight: 3,
          required: true,
        },
        {
          id: "cost",
          description:
            "Notes the practical consequence: with no missing edges you are back to the full exponential parameter table.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.4,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["graphs"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "graphs--explain-why-graphs-fit-joints",
    conceptId: "graphs",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Why is a graph a natural way to specify a joint distribution over many variables, rather than " +
      "just a convenient picture of one?",
    rubric: {
      elements: [
        {
          id: "sparsity",
          description:
            "Argues that each variable typically depends directly on only a few others, so the dependence structure is sparse.",
          weight: 3,
          required: true,
        },
        {
          id: "makes-sparsity-explicit",
          description:
            "States that the graph makes that sparsity explicit and checkable, rather than leaving it buried in a large table.",
          weight: 3,
          required: true,
        },
        {
          id: "factorization",
          description:
            "Connects sparsity to factorization: the joint becomes a product of small local pieces, each cheap to specify.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.4,
    expectedSeconds: 150,
    prereqClosure: ["graphs", "set-theory"],
    source: BISHOP,
    status: "live",
  },
  {
    id: "graphs--transfer-two-fields",
    conceptId: "graphs",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Graphical models are often said to sit at the intersection of graph theory and probability " +
      "theory. Explain why neither half alone is enough to say what a graphical model is.",
    rubric: {
      elements: [
        {
          id: "graph-half",
          description:
            "Identifies the combinatorial half: nodes and edges give a purely structural object, with algorithms (paths, separation, connectivity) that need no numbers.",
          weight: 3,
          required: true,
        },
        {
          id: "probability-half",
          description:
            "Identifies the probabilistic half: conditional independence and factorization of the joint are what give that structure statistical meaning.",
          weight: 3,
          required: true,
        },
        {
          id: "jointly-necessary",
          description:
            "States explicitly that both are needed — a graph alone is a drawing, a factorization alone has no structure to reason over.",
          weight: 2,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "names-without-explaining",
          description:
            "Names both fields without saying what each contributes or why the other cannot supply it.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["graphs", "set-theory"],
    source: AUTHORED,
    status: "live",
  },
  // --- Directed vs Undirected Graphs ---------------------------------------
  {
    id: "dvug--recall-arrow-meaning",
    conceptId: "directed-vs-undirected-graphs",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In a directed graphical model, a directed edge A → B indicates that:",
    choices: [
      { id: "a", text: "B's conditional distribution is written given A — A is a parent of B", correct: true },
      {
        id: "b",
        text: "A and B are statistically independent",
        correct: false,
        misconception: {
          id: "edge-read-as-independence",
          description:
            "Exactly inverts the meaning. An edge is the presence of a direct dependence; it is the *missing* edges that assert independence.",
          blameConceptId: "directed-vs-undirected-graphs",
        },
      },
      {
        id: "c",
        text: "A occurs earlier in time than B",
        correct: false,
        misconception: {
          id: "arrow-as-time",
          description:
            "Directed models are often drawn in a temporal or generative order, but the arrow's content is the factorization, not a timestamp.",
          blameConceptId: "directed-vs-undirected-graphs",
        },
      },
      {
        id: "d",
        text: "A and B always take the same value",
        correct: false,
        misconception: {
          id: "edge-as-determinism",
          description: "Confuses a probabilistic dependence with a deterministic one.",
          blameConceptId: "directed-vs-undirected-graphs",
        },
      },
    ],
    difficulty: -1.1,
    discrimination: 1.2,
    expectedSeconds: 30,
    prereqClosure: ["directed-vs-undirected-graphs", "graphs"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "dvug--recall-distinguish-the-two",
    conceptId: "directed-vs-undirected-graphs",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem:
      "Distinguish directed from undirected graphical models, and give the usual name for each.",
    rubric: {
      elements: [
        {
          id: "directed",
          description:
            "Directed: edges carry a direction, parent to child; the model is called a Bayesian network (or belief network).",
          weight: 3,
          required: true,
        },
        {
          id: "undirected",
          description:
            "Undirected: edges are symmetric; the model is called a Markov random field (or Markov network).",
          weight: 3,
          required: true,
        },
        {
          id: "factorization-difference",
          description:
            "Notes the factorizations differ: a product of conditionals given parents, versus a product of clique potentials divided by a normaliser.",
          weight: 2,
        },
      ],
    },
    difficulty: -0.8,
    discrimination: 1.2,
    expectedSeconds: 75,
    prereqClosure: ["directed-vs-undirected-graphs", "graphs"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "dvug--apply-read-off-factorization",
    conceptId: "directed-vs-undirected-graphs",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A model has exactly two edges: Rain → WetGrass and Sprinkler → WetGrass. Write the joint " +
      "distribution p(Rain, Sprinkler, WetGrass) as the graph specifies it, and say what the absent " +
      "Rain–Sprinkler edge is asserting.",
    rubric: {
      elements: [
        {
          id: "factorization",
          description:
            "Gives p(R)·p(S)·p(W | R, S) — one factor per node, each conditioned on exactly its parents.",
          weight: 3,
          required: true,
        },
        {
          id: "both-parents",
          description:
            "Conditions WetGrass on BOTH parents, not on one of them or on neither.",
          weight: 2,
          required: true,
          misconception: {
            id: "drops-a-parent",
            description:
              "Writes p(W | R) or p(W | S), losing the fact that the graph specifies exactly which variables the conditional depends on.",
            blameConceptId: "directed-vs-undirected-graphs",
          },
        },
        {
          id: "missing-edge",
          description:
            "States that the absent edge asserts Rain and Sprinkler are marginally independent — there is no p(S | R) factor.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -0.2,
    discrimination: 1.5,
    expectedSeconds: 140,
    prereqClosure: ["directed-vs-undirected-graphs", "graphs"],
    source: BISHOP,
    status: "live",
  },
  {
    id: "dvug--apply-count-dag-parameters",
    conceptId: "directed-vs-undirected-graphs",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "All three variables in the Rain → WetGrass ← Sprinkler model are binary. Counting free " +
      "parameters: p(Rain) needs 1, p(Sprinkler) needs 1, and p(WetGrass | Rain, Sprinkler) needs one " +
      "per parent configuration. How many free parameters does the model have in total?",
    answerKey: 6,
    tolerance: 0.001,
    difficulty: 0.3,
    discrimination: 1.5,
    expectedSeconds: 120,
    prereqClosure: ["directed-vs-undirected-graphs", "graphs"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "dvug--explain-acyclicity",
    conceptId: "directed-vs-undirected-graphs",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Why must a directed graphical model be acyclic for its factorization to define a valid joint " +
      "distribution?",
    rubric: {
      elements: [
        {
          id: "circular-conditioning",
          description:
            "Identifies the circularity: with A → B → A, each factor conditions on something that itself depends on what you are computing, so the product is not a chain-rule expansion of any joint.",
          weight: 4,
          required: true,
          misconception: {
            id: "acyclicity-as-convention",
            description:
              "Treats acyclicity as a drawing convention or a computational nicety rather than the condition that makes the factorization well defined.",
            blameConceptId: "directed-vs-undirected-graphs",
          },
        },
        {
          id: "ordering",
          description:
            "Notes that acyclicity is exactly what guarantees a topological ordering exists, so the product of conditionals is a genuine chain rule with terms dropped.",
          weight: 3,
          required: true,
        },
        {
          id: "normalisation",
          description: "Observes that the resulting product need not normalise to 1 if a cycle is present.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.6,
    expectedSeconds: 170,
    prereqClosure: ["directed-vs-undirected-graphs", "graphs"],
    source: BISHOP,
    status: "live",
  },
  {
    id: "dvug--explain-normalisation-asymmetry",
    conceptId: "directed-vs-undirected-graphs",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "An undirected model's factorization needs a global normalising constant Z, while a directed " +
      "model's does not. Explain where that asymmetry comes from, and why it matters in practice.",
    rubric: {
      elements: [
        {
          id: "directed-free",
          description:
            "States that each directed factor is already a conditional probability distribution summing to 1, so the product normalises automatically.",
          weight: 3,
          required: true,
        },
        {
          id: "undirected-potentials",
          description:
            "States that an undirected factor is only a non-negative compatibility score, not a probability, so nothing forces the product to sum to 1.",
          weight: 3,
          required: true,
        },
        {
          id: "cost",
          description:
            "Notes the practical cost: computing Z means summing over every joint configuration — the exponential sum the graph was meant to avoid.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["directed-vs-undirected-graphs", "graphs"],
    source: MURPHY,
    status: "live",
  },
  {
    id: "dvug--transfer-v-structure-conversion",
    conceptId: "directed-vs-undirected-graphs",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Consider two parents A and B pointing into a common child C, with no A–B edge. Explain what " +
      "independence structure this encodes, and why an undirected graph cannot represent it faithfully.",
    rubric: {
      elements: [
        {
          id: "marginal-independence",
          description: "States that A and B are marginally independent when C is not observed.",
          weight: 3,
          required: true,
        },
        {
          id: "conditional-dependence",
          description:
            "States that observing C makes A and B dependent — the reverse of what conditioning usually does.",
          weight: 3,
          required: true,
          misconception: {
            id: "v-structure-flattened",
            description:
              "Claims A and B are independent regardless of C, missing that the v-structure's whole content is the flip.",
            blameConceptId: "directed-vs-undirected-graphs",
          },
        },
        {
          id: "undirected-cannot",
          description:
            "Explains that an undirected graph's symmetric edges cannot express 'independent normally, dependent when conditioned on', so converting requires adding an A–B edge and losing the independence.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.2,
    discrimination: 1.8,
    expectedSeconds: 200,
    prereqClosure: ["directed-vs-undirected-graphs", "graphs"],
    source: BISHOP,
    status: "live",
  },
  {
    id: "dvug--transfer-unrolling-feedback",
    conceptId: "directed-vs-undirected-graphs",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Price affects demand, and demand affects price — genuine feedback. Since a directed graphical " +
      "model may not contain a cycle, how can such a system be modelled with one anyway?",
    rubric: {
      elements: [
        {
          id: "unroll-in-time",
          description:
            "Proposes indexing the variables by time — Price(t) → Demand(t) → Price(t+1) — so each time step is its own node.",
          weight: 4,
          required: true,
        },
        {
          id: "why-acyclic",
          description:
            "Explains that the unrolled graph is acyclic because edges always point forward in time, even though the underlying system is not.",
          weight: 3,
          required: true,
        },
        {
          id: "cost",
          description:
            "Notes a cost of the trick: the model grows with the time horizon, and parameters are usually tied across steps to keep it finite.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["directed-vs-undirected-graphs", "graphs"],
    source: AUTHORED,
    status: "live",
  },
  // --- Conditional Independence and D-Separation ----------------------------
  {
    id: "dsep--recall-describe",
    conceptId: "conditional-independence-d-separation",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe what d-separation is and what it lets you do.",
    rubric: {
      elements: [
        {
          id: "graphical-criterion",
          description:
            "States that it is a purely graphical criterion — read off the graph's structure, with no numerical computation.",
          weight: 3,
          required: true,
        },
        {
          id: "what-it-yields",
          description:
            "States the conclusion it licenses: nodes d-separated by a set Z are conditionally independent given Z.",
          weight: 3,
          required: true,
        },
        {
          id: "path-blocking",
          description: "Mentions that the criterion works by checking whether every path between the nodes is blocked.",
          weight: 2,
        },
      ],
    },
    difficulty: -0.6,
    discrimination: 1.2,
    expectedSeconds: 80,
    prereqClosure: ["conditional-independence-d-separation", "conditional-probability"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "dsep--recall-explaining-away",
    conceptId: "conditional-independence-d-separation",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem:
      "Two parents A and B point into a common child C, with no edge between A and B. Which statement is correct?",
    choices: [
      {
        id: "a",
        text: "A and B are marginally independent, but become dependent once C is observed",
        correct: true,
      },
      {
        id: "b",
        text: "A and B are independent whether or not C is observed",
        correct: false,
        misconception: {
          id: "collider-never-opens",
          description:
            "Misses the defining behaviour of a collider: conditioning on it creates dependence rather than removing it.",
          blameConceptId: "conditional-independence-d-separation",
        },
      },
      {
        id: "c",
        text: "A and B are dependent until C is observed, after which they become independent",
        correct: false,
        misconception: {
          id: "collider-treated-as-chain",
          description:
            "Applies the chain/fork rule to a collider. Conditioning blocks a chain or fork; it opens a collider.",
          blameConceptId: "conditional-independence-d-separation",
        },
      },
      {
        id: "d",
        text: "A and B are dependent regardless of whether C is observed",
        correct: false,
        misconception: {
          id: "ignores-marginal-independence",
          description:
            "Overlooks that with no A–B edge and C unobserved, the only path between them is blocked.",
          blameConceptId: "conditional-independence-d-separation",
        },
      },
    ],
    difficulty: -0.2,
    discrimination: 1.7,
    expectedSeconds: 45,
    prereqClosure: ["conditional-independence-d-separation", "independence-set-theory"],
    source: BISHOP,
    status: "live",
  },
  {
    id: "dsep--recall-three-structures",
    conceptId: "conditional-independence-d-separation",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem:
      "Which of the following correctly describe the effect of conditioning on the middle node C? Select all that apply.",
    choices: [
      { id: "a", text: "In a chain A → C → B, conditioning on C blocks the path", correct: true },
      { id: "b", text: "In a fork A ← C → B, conditioning on C blocks the path", correct: true },
      { id: "c", text: "In a collider A → C ← B, conditioning on C opens the path", correct: true },
      {
        id: "d",
        text: "In a collider A → C ← B, conditioning on a descendant of C leaves the path blocked",
        correct: false,
        misconception: {
          id: "descendant-clause-forgotten",
          description:
            "Forgets that conditioning on any descendant of a collider opens it too — the clause that makes collider bias so easy to trigger accidentally.",
          blameConceptId: "conditional-independence-d-separation",
        },
      },
      {
        id: "e",
        text: "Conditioning on C always removes dependence between A and B",
        correct: false,
        misconception: {
          id: "conditioning-always-blocks",
          description:
            "The single most consequential error in this topic: treats conditioning as universally independence-inducing, which is false for colliders.",
          blameConceptId: "conditional-independence-d-separation",
        },
      },
    ],
    difficulty: 0.1,
    discrimination: 1.7,
    expectedSeconds: 90,
    prereqClosure: ["conditional-independence-d-separation", "conditional-probability"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "dsep--apply-explaining-away-direction",
    conceptId: "conditional-independence-d-separation",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "A burglary and an earthquake can each independently set off your alarm. The alarm is ringing. " +
      "You then learn from the radio that there has just been an earthquake. Does burglary become " +
      "more or less likely, and why?",
    rubric: {
      elements: [
        {
          id: "direction",
          description: "Says explicitly that burglary becomes LESS likely.",
          weight: 3,
          required: true,
          misconception: {
            id: "explaining-away-reversed",
            description:
              "Gets the direction backwards, usually by reasoning that 'more bad things are happening' rather than tracking which cause the evidence needs.",
            blameConceptId: "conditional-independence-d-separation",
          },
        },
        {
          id: "mechanism",
          description:
            "Gives the mechanism: the earthquake already accounts for the alarm, so burglary is no longer needed as an explanation.",
          weight: 3,
          required: true,
        },
        {
          id: "structure",
          description:
            "Connects it to the structure: the two causes were marginally independent, and conditioning on their common effect made them compete.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.4,
    discrimination: 1.8,
    expectedSeconds: 150,
    prereqClosure: [
      "conditional-independence-d-separation",
      "conditional-probability",
      "independence-set-theory",
    ],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "dsep--apply-alarm-posterior",
    conceptId: "conditional-independence-d-separation",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "P(Burglary) = 0.001 and P(Earthquake) = 0.002, independently, and the alarm rings exactly when " +
      "at least one of them occurs. Given only that the alarm rang, what is P(Burglary)? Give a " +
      "decimal to three places.",
    answerKey: 0.334,
    tolerance: 0.01,
    difficulty: 0.8,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: [
      "conditional-independence-d-separation",
      "conditional-probability",
      "probability-function",
    ],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "dsep--explain-collider-vs-chain",
    conceptId: "conditional-independence-d-separation",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "State what conditioning on C does in a collider A → C ← B, and contrast it with what " +
      "conditioning on C does in a chain A → C → B.",
    rubric: {
      elements: [
        {
          id: "chain-blocks",
          description:
            "Chain: A and B are dependent unconditionally, and conditioning on C blocks the path, giving A ⊥ B | C.",
          weight: 3,
          required: true,
        },
        {
          id: "collider-opens",
          description:
            "Collider: A and B are independent unconditionally, and conditioning on C (or any descendant of C) opens the path, making them dependent.",
          weight: 3,
          required: true,
        },
        {
          id: "opposite",
          description:
            "States clearly that the two behaviours are opposites, so no single rule of thumb about conditioning covers both.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.8,
    expectedSeconds: 190,
    prereqClosure: ["conditional-independence-d-separation", "conditional-probability"],
    source: BISHOP,
    status: "live",
  },
  {
    id: "dsep--explain-soundness",
    conceptId: "conditional-independence-d-separation",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "If two nodes are d-connected given Z, is it correct to conclude they are definitely dependent " +
      "given Z? Explain what d-separation does and does not guarantee.",
    rubric: {
      elements: [
        {
          id: "soundness",
          description:
            "States the guarantee that does hold: d-separation implies conditional independence in every distribution factorizing over the graph.",
          weight: 3,
          required: true,
        },
        {
          id: "no-converse",
          description:
            "States that the converse does not hold — a particular distribution may have extra independences that the graph does not display, so d-connection does not prove dependence.",
          weight: 4,
          required: true,
          misconception: {
            id: "dsep-read-as-iff",
            description:
              "Treats d-separation as an if-and-only-if criterion, over-reading what the graph promises.",
            blameConceptId: "conditional-independence-d-separation",
          },
        },
        {
          id: "why",
          description:
            "Explains why: extra independences can arise from numerical coincidences in the parameters, and the graph encodes only what structure alone guarantees.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.7,
    expectedSeconds: 200,
    prereqClosure: [
      "conditional-independence-d-separation",
      "independence-set-theory",
      "conditional-probability",
    ],
    source: MURPHY,
    status: "live",
  },
  {
    id: "dsep--transfer-collider-bias",
    conceptId: "conditional-independence-d-separation",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A colleague says the safe thing to do in an observational study is to control for every " +
      "covariate you measured. Explain how this can manufacture an association between variables that " +
      "were genuinely independent, and name the phenomenon.",
    rubric: {
      elements: [
        {
          id: "collider-vs-confounder",
          description:
            "Distinguishes the two cases: conditioning on a confounder (fork) removes spurious association, but conditioning on a collider (common effect) creates one.",
          weight: 4,
          required: true,
          misconception: {
            id: "control-for-everything",
            description:
              "Treats adjustment as uniformly protective, missing that whether a covariate helps or harms depends on where it sits in the structure.",
            blameConceptId: "conditional-independence-d-separation",
          },
        },
        {
          id: "names-it",
          description: "Names collider bias, Berkson's paradox, or selection bias.",
          weight: 2,
          required: true,
        },
        {
          id: "selection-is-conditioning",
          description:
            "Notes that restricting the sample is itself conditioning, so the bias can enter through who is in the study rather than through any fitted coefficient.",
          weight: 3,
        },
      ],
      forbiddenMoves: [
        {
          id: "data-can-decide",
          description:
            "Claims the data alone can reveal which covariates are safe to adjust for — it cannot; that is a structural question.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.9,
    expectedSeconds: 240,
    prereqClosure: [
      "conditional-independence-d-separation",
      "conditional-probability",
      "independence-set-theory",
    ],
    source: MURPHY,
    status: "live",
  },
  // --- Markov Random Fields -------------------------------------------------
  {
    id: "mrf--recall-defining-property",
    conceptId: "markov-random-fields",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "State the defining local property of a Markov random field, and name the node set it involves.",
    rubric: {
      elements: [
        {
          id: "local-markov",
          description:
            "States that a node is conditionally independent of every other node in the graph given its immediate neighbours.",
          weight: 4,
          required: true,
        },
        {
          id: "markov-blanket",
          description:
            "Names that neighbour set as the node's Markov blanket (for an undirected graph it is exactly the neighbours).",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: -0.5,
    discrimination: 1.2,
    expectedSeconds: 75,
    prereqClosure: ["markov-random-fields", "conditional-independence-d-separation"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mrf--recall-why-undirected",
    conceptId: "markov-random-fields",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem:
      "MRFs are usually preferred over directed models for spatial problems such as image labelling. The motivating reason is that:",
    choices: [
      {
        id: "a",
        text: "Spatial adjacency has no natural direction, so symmetric edges avoid inventing one",
        correct: true,
      },
      {
        id: "b",
        text: "MRFs always require fewer parameters than a directed model",
        correct: false,
        misconception: {
          id: "mrf-justified-by-parameter-count",
          description:
            "Not a general guarantee — a densely connected MRF with large cliques can need far more parameters than a sparse DAG. The motivation is symmetry, not economy.",
          blameConceptId: "markov-random-fields",
        },
      },
      {
        id: "c",
        text: "MRFs make exact inference cheaper than directed models do",
        correct: false,
        misconception: {
          id: "mrf-cheaper-inference",
          description:
            "The opposite is closer to true: undirected models carry a partition function that directed models get for free.",
          blameConceptId: "markov-random-fields",
        },
      },
      {
        id: "d",
        text: "Undirected edges allow cycles, which directed models forbid entirely",
        correct: false,
        misconception: {
          id: "cycles-as-the-point",
          description:
            "Cycles are permitted in an MRF, but that permission is a consequence of dropping directions, not the reason a modeller wants them here.",
          blameConceptId: "markov-random-fields",
        },
      },
    ],
    difficulty: -0.1,
    discrimination: 1.5,
    expectedSeconds: 45,
    prereqClosure: ["markov-random-fields", "directed-vs-undirected-graphs"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mrf--apply-why-directed-pixels-awkward",
    conceptId: "markov-random-fields",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "You want neighbouring pixels in an image to tend to share a label. Explain why modelling this " +
      "with a directed graph feels forced.",
    rubric: {
      elements: [
        {
          id: "arbitrary-direction",
          description:
            "States that it forces an arbitrary choice of which pixel 'causes' which, when spatial adjacency has no genuine direction.",
          weight: 4,
          required: true,
        },
        {
          id: "artefact",
          description:
            "Notes the choice is an artefact of the modeller (e.g. raster-scan order), not a feature of the image, and can show up as directional artefacts in the output.",
          weight: 3,
        },
        {
          id: "symmetry-preserved",
          description: "States that an undirected model preserves the symmetry the problem actually has.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 0.4,
    discrimination: 1.4,
    expectedSeconds: 150,
    prereqClosure: ["markov-random-fields", "directed-vs-undirected-graphs"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mrf--apply-two-node-normalisation",
    conceptId: "markov-random-fields",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Two binary spins X and Y, each taking the value −1 or +1, are joined by a single edge with " +
      "potential psi(x, y) = exp(0.5·x·y). Using the MRF factorization with its partition function, " +
      "what is P(X = Y)? Give a decimal to three places.",
    answerKey: 0.731,
    tolerance: 0.01,
    difficulty: 0.9,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["markov-random-fields", "probability-function"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mrf--explain-hammersley-clifford",
    conceptId: "markov-random-fields",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "State the Hammersley–Clifford theorem informally, and say why it is a substantive result rather than a definition.",
    rubric: {
      elements: [
        {
          id: "statement",
          description:
            "States that for a strictly positive distribution, satisfying the graph's Markov properties is equivalent to factorizing as a product of potentials over the graph's cliques.",
          weight: 4,
          required: true,
        },
        {
          id: "cliques",
          description: "Names cliques (fully connected subsets) as the factor domains.",
          weight: 2,
          required: true,
        },
        {
          id: "why-substantive",
          description:
            "Explains why it is not a definition: the Markov properties are constraints on conditional independences while the factorization is a recipe for building a distribution, and it is not obvious these coincide.",
          weight: 3,
        },
        {
          id: "no-causal-reading",
          description:
            "Notes that unlike a directed factor, a potential is not a conditional probability and carries no causal or marginal interpretation on its own.",
          weight: 2,
          misconception: {
            id: "potential-read-as-probability",
            description:
              "Reads a clique potential as a probability. Potentials are only meaningful relative to each other through Z; scaling one changes nothing.",
            blameConceptId: "markov-random-fields",
          },
        },
      ],
    },
    difficulty: 1.2,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["markov-random-fields", "conditional-independence-d-separation"],
    source: BISHOP,
    status: "live",
  },
  {
    id: "mrf--explain-partition-function-cost",
    conceptId: "markov-random-fields",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "The whole point of a graphical model is to avoid working with an exponentially large joint " +
      "table. Explain why the partition function Z threatens to undo that saving in an MRF.",
    rubric: {
      elements: [
        {
          id: "z-definition",
          description:
            "States that Z sums the product of potentials over every joint configuration of every variable.",
          weight: 3,
          required: true,
        },
        {
          id: "exponential",
          description:
            "Notes that this is exactly the exponential sum the factorization was supposed to spare you.",
          weight: 3,
          required: true,
        },
        {
          id: "what-still-works",
          description:
            "Observes that many quantities — conditional distributions, ratios of probabilities, MAP configurations — do not need Z, which is why unnormalised models remain usable.",
          weight: 3,
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["markov-random-fields", "probability-function"],
    source: MURPHY,
    status: "live",
  },
  {
    id: "mrf--transfer-chain-as-mrf",
    conceptId: "markov-random-fields",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Explain why a Markov chain is a special case of a Markov random field, being specific about " +
      "which graph structure and which property line up.",
    rubric: {
      elements: [
        {
          id: "graph-shape",
          description:
            "Identifies the graph: a path, X1–X2–…–Xn, where each node is joined only to its immediate predecessor and successor.",
          weight: 3,
          required: true,
        },
        {
          id: "property-mapping",
          description:
            "Maps the MRF's 'independent of everything else given neighbours' onto the Markov property: restricted to the forward direction, the neighbours are the previous and next states, so the future depends on the past only through the present.",
          weight: 4,
          required: true,
        },
        {
          id: "cliques-are-edges",
          description:
            "Notes that a path's cliques are its edges, so Hammersley–Clifford gives a product of pairwise factors — exactly the transition structure.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.65,
    discrimination: 1.7,
    expectedSeconds: 220,
    prereqClosure: ["markov-random-fields", "conditional-independence-d-separation"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mrf--transfer-tractability-of-trees",
    conceptId: "markov-random-fields",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Exact inference in a chain-structured MRF is cheap, but in a grid-structured one (as used for " +
      "images) it is not. What changes, and what do practitioners do instead?",
    rubric: {
      elements: [
        {
          id: "cycles",
          description:
            "Identifies the structural change: a grid contains cycles, while a chain or tree does not.",
          weight: 3,
          required: true,
        },
        {
          id: "cost",
          description:
            "States that on a chain or tree, message passing gives exact inference in time linear in the number of nodes, while cycles make exact inference exponential in the graph's treewidth.",
          weight: 3,
          required: true,
        },
        {
          id: "remedies",
          description:
            "Names at least one practical response: loopy belief propagation, variational inference, or MCMC.",
          weight: 3,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.6,
    expectedSeconds: 230,
    prereqClosure: ["markov-random-fields", "graphs"],
    source: MURPHY,
    status: "live",
  },
  // --- Markov Chains --------------------------------------------------------
  {
    id: "markov-chains--recall-markov-property",
    conceptId: "markov-chains",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "State the Markov property, in words and in symbols.",
    rubric: {
      elements: [
        {
          id: "symbols",
          description:
            "Gives P(X_{n+1} | X_n, …, X_1) = P(X_{n+1} | X_n) or an equivalent expression.",
          weight: 3,
          required: true,
        },
        {
          id: "words",
          description:
            "States in words that the future depends on the past only through the present state.",
          weight: 3,
          required: true,
        },
        {
          id: "not-history-free",
          description:
            "Notes the subtlety: history is not irrelevant, it is that all its relevance is already summarised in the current state.",
          weight: 2,
        },
      ],
    },
    difficulty: -0.5,
    discrimination: 1.2,
    expectedSeconds: 70,
    prereqClosure: ["markov-chains", "conditional-probability"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "markov-chains--recall-stationary-definition",
    conceptId: "markov-chains",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem:
      "A stationary distribution pi of a chain with transition probabilities P(i → j) is characterised by which condition?",
    choices: [
      {
        id: "a",
        text: "pi(j) = sum over i of pi(i)·P(i → j) for every state j, with the pi(j) summing to 1",
        correct: true,
      },
      {
        id: "b",
        text: "pi is uniform over the states",
        correct: false,
        misconception: {
          id: "stationary-assumed-uniform",
          description:
            "Uniformity holds only for special (doubly stochastic) chains, not in general — and assuming it silently replaces the answer with a guess.",
          blameConceptId: "markov-chains",
        },
      },
      {
        id: "c",
        text: "pi(j) equals the probability of starting in state j",
        correct: false,
        misconception: {
          id: "stationary-as-initial",
          description:
            "Confuses the initial distribution with the long-run one; an ergodic chain forgets its starting distribution entirely.",
          blameConceptId: "markov-chains",
        },
      },
      {
        id: "d",
        text: "P(i → j) = P(j → i) for every pair of states",
        correct: false,
        misconception: {
          id: "stationarity-as-symmetry",
          description:
            "Confuses stationarity with symmetric transitions; symmetric transitions are sufficient for a uniform stationary distribution but are not what stationarity means.",
          blameConceptId: "markov-chains",
        },
      },
    ],
    difficulty: -0.15,
    discrimination: 1.5,
    expectedSeconds: 50,
    prereqClosure: ["markov-chains", "conditional-probability"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "markov-chains--apply-two-state-stationary",
    conceptId: "markov-chains",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Weather is Sunny or Rainy. From Sunny, tomorrow is Sunny with probability 0.8. From Rainy, " +
      "tomorrow is Sunny with probability 0.4. In the long run, what fraction of days are Sunny? " +
      "Give a decimal to three places.",
    answerKey: 0.667,
    tolerance: 0.01,
    difficulty: 0.3,
    discrimination: 1.6,
    expectedSeconds: 170,
    prereqClosure: ["markov-chains", "conditional-probability"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "markov-chains--apply-two-step",
    conceptId: "markov-chains",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Same weather chain: from Sunny, tomorrow is Sunny with probability 0.8; from Rainy, tomorrow " +
      "is Sunny with probability 0.4. Today is Sunny. What is the probability that the day after " +
      "tomorrow is Sunny? Give a decimal to three places.",
    answerKey: 0.72,
    tolerance: 0.005,
    difficulty: 0.6,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["markov-chains", "conditional-probability", "probability-function"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "markov-chains--explain-state-augmentation",
    conceptId: "markov-chains",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "A process you want to model clearly depends on the last two observations, not just the most " +
      "recent one. Does that rule out a Markov chain? Explain.",
    rubric: {
      elements: [
        {
          id: "no",
          description: "Answers that it does not rule one out.",
          weight: 2,
          required: true,
        },
        {
          id: "augmentation",
          description:
            "Gives the repair: redefine the state to be the ordered pair of the last two observations, after which the process is Markov in the new state space.",
          weight: 4,
          required: true,
          misconception: {
            id: "markov-as-fixed-property",
            description:
              "Treats the Markov property as an intrinsic property of the process rather than of the process together with a chosen state definition.",
            blameConceptId: "markov-chains",
          },
        },
        {
          id: "cost",
          description:
            "Notes the cost: the state space grows (squares, for a pair), and with it the number of transition probabilities to estimate.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["markov-chains", "conditional-probability"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "markov-chains--explain-uniform-is-special",
    conceptId: "markov-chains",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "A student asserts that every Markov chain settles into a uniform distribution over its states " +
      "in the long run. Explain what is wrong, using a concrete counterexample.",
    rubric: {
      elements: [
        {
          id: "false",
          description: "States that this is false in general.",
          weight: 2,
          required: true,
          misconception: {
            id: "stationary-assumed-uniform",
            description: "Assumes the stationary distribution is uniform without checking.",
            blameConceptId: "markov-chains",
          },
        },
        {
          id: "counterexample",
          description:
            "Gives a concrete chain whose stationary distribution is not uniform — e.g. the two-state weather chain, whose long-run distribution is (2/3, 1/3).",
          weight: 4,
          required: true,
        },
        {
          id: "when-it-holds",
          description:
            "States the condition under which uniformity does hold: the transitions into each state must balance the way they do for a doubly stochastic chain.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["markov-chains", "conditional-probability"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "markov-chains--explain-irreducible-aperiodic",
    conceptId: "markov-chains",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "A chain has a stationary distribution, but simulating it from a given starting state never " +
      "settles down — the distribution keeps oscillating. What condition has failed, and how does it " +
      "differ from the condition guaranteeing uniqueness?",
    rubric: {
      elements: [
        {
          id: "aperiodicity",
          description:
            "Identifies aperiodicity as the failed condition: a periodic chain cycles with a fixed period and orbits the stationary distribution without approaching it.",
          weight: 4,
          required: true,
          misconception: {
            id: "existence-conflated-with-convergence",
            description:
              "Assumes that having a stationary distribution implies converging to it. Existence and convergence are separate guarantees.",
            blameConceptId: "markov-chains",
          },
        },
        {
          id: "irreducibility",
          description:
            "Distinguishes irreducibility — every state reachable from every other — as what buys uniqueness rather than convergence.",
          weight: 3,
          required: true,
        },
        {
          id: "example",
          description: "Offers an example, such as a chain that alternates deterministically between two states.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.2,
    discrimination: 1.7,
    expectedSeconds: 200,
    prereqClosure: ["markov-chains", "conditional-probability"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "markov-chains--transfer-mcmc",
    conceptId: "markov-chains",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Markov chain Monte Carlo runs the theory of stationary distributions backwards. Explain what " +
      "that means, and name one practical consequence of the theory for how MCMC output is used.",
    rubric: {
      elements: [
        {
          id: "backwards",
          description:
            "States the reversal: instead of asking what a given chain settles to, MCMC constructs a chain whose stationary distribution is engineered to be the target one wants to sample from.",
          weight: 4,
          required: true,
        },
        {
          id: "why-useful",
          description:
            "Notes that this turns an intractable sampling problem into running a chain long enough, which is what makes complex Bayesian posteriors samplable at all.",
          weight: 2,
          required: true,
        },
        {
          id: "consequence",
          description:
            "Names a practical consequence: discarding a burn-in period because early samples reflect the starting state, or that slow-mixing chains give correlated samples worth far less than their count suggests.",
          weight: 3,
        },
      ],
      forbiddenMoves: [
        {
          id: "convergence-guaranteed-in-practice",
          description:
            "Claims the theory tells you when a chain has converged. It guarantees convergence eventually and says nothing about when; diagnostics can refute convergence but never confirm it.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.8,
    expectedSeconds: 230,
    prereqClosure: ["markov-chains", "conditional-probability", "probability-function"],
    source: MURPHY,
    status: "live",
  },
  // --- Hidden Markov Models -------------------------------------------------
  {
    id: "hmm--recall-structure",
    conceptId: "hmm",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe the structure of a hidden Markov model.",
    rubric: {
      elements: [
        {
          id: "hidden-chain",
          description: "States there is a Markov chain of hidden states.",
          weight: 3,
          required: true,
        },
        {
          id: "emissions",
          description:
            "States that each hidden state probabilistically generates an observation (an emission).",
          weight: 3,
          required: true,
        },
        {
          id: "what-is-seen",
          description: "States that only the emissions are observed; the state sequence is not.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: -0.4,
    discrimination: 1.3,
    expectedSeconds: 80,
    prereqClosure: ["hmm", "markov-chains"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "hmm--recall-what-is-hidden",
    conceptId: "hmm",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In a hidden Markov model, what is 'hidden'?",
    choices: [
      { id: "a", text: "The underlying state sequence", correct: true },
      {
        id: "b",
        text: "The emissions",
        correct: false,
        misconception: {
          id: "hidden-label-inverted",
          description:
            "Exactly backwards, and it makes every subsequent algorithm unreadable: the emissions are the data, the states are what must be inferred.",
          blameConceptId: "hmm",
        },
      },
      {
        id: "c",
        text: "The transition probabilities, which can never be estimated",
        correct: false,
        misconception: {
          id: "hidden-as-unlearnable-parameters",
          description:
            "Confuses latent variables with parameters. The transition probabilities are ordinary parameters and are exactly what Baum–Welch estimates.",
          blameConceptId: "hmm",
        },
      },
      {
        id: "d",
        text: "The number of time steps in the sequence",
        correct: false,
        misconception: {
          id: "hidden-as-length",
          description: "The sequence length is observed; it is the state at each step that is not.",
          blameConceptId: "hmm",
        },
      },
    ],
    difficulty: 0.0,
    discrimination: 1.6,
    expectedSeconds: 30,
    prereqClosure: ["hmm"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "hmm--recall-components",
    conceptId: "hmm",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which of the following are parameters of a standard HMM? Select all that apply.",
    choices: [
      { id: "a", text: "Transition probabilities between hidden states", correct: true },
      { id: "b", text: "Emission probabilities of an observation given a hidden state", correct: true },
      { id: "c", text: "An initial distribution over the first hidden state", correct: true },
      {
        id: "d",
        text: "Transition probabilities between consecutive observations",
        correct: false,
        misconception: {
          id: "emissions-given-own-dynamics",
          description:
            "Puts the dynamics on the wrong layer. Observations have no direct edges to one another; all their dependence runs through the hidden chain.",
          blameConceptId: "hmm",
        },
      },
      {
        id: "e",
        text: "The observed sequence itself",
        correct: false,
        misconception: {
          id: "data-as-parameter",
          description: "Confuses the data with the parameters that generate it.",
          blameConceptId: "hmm",
        },
      },
    ],
    difficulty: 0.25,
    discrimination: 1.5,
    expectedSeconds: 70,
    prereqClosure: ["hmm", "markov-chains", "joint-distribution"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "hmm--apply-single-step-posterior",
    conceptId: "hmm",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A person's mood is Happy or Sad, equally likely on day 1. P(Walk | Happy) = 0.6 and " +
      "P(Walk | Sad) = 0.1. You observe a walk on day 1. What is P(Happy | Walk)? Give a decimal to " +
      "three places.",
    answerKey: 0.857,
    tolerance: 0.01,
    difficulty: 0.55,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["hmm", "conditional-probability", "joint-distribution"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "hmm--apply-decoding-problem",
    conceptId: "hmm",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "A person's true mood drives their observable daily activities. You have a month of activities " +
      "and want the most likely sequence of moods. Name this problem, name the algorithm that solves " +
      "it, and say why brute force is not an option.",
    rubric: {
      elements: [
        {
          id: "names-decoding",
          description: "Names the decoding problem — recovering the most likely hidden state sequence.",
          weight: 3,
          required: true,
        },
        {
          id: "names-viterbi",
          description: "Names the Viterbi algorithm.",
          weight: 3,
          required: true,
        },
        {
          id: "why-dp",
          description:
            "Explains the combinatorics: with N states over T steps there are N^T candidate paths, and dynamic programming collapses all paths arriving at a state at time t into one number because the Markov property makes the future depend only on where you are now.",
          weight: 3,
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["hmm", "markov-chains"],
    source: BISHOP,
    status: "live",
  },
  {
    id: "hmm--explain-joint-factorization",
    conceptId: "hmm",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Explain why an HMM's joint distribution over states and observations factors into just " +
      "transition terms and emission terms, and state the two conditional-independence claims that " +
      "makes.",
    rubric: {
      elements: [
        {
          id: "factorization",
          description:
            "Writes or describes the factorization: an initial term, one transition factor per step, and one emission factor per observation.",
          weight: 3,
          required: true,
        },
        {
          id: "claim-one",
          description:
            "States the first claim: each hidden state depends on the previous hidden state and nothing earlier — the Markov property on the hidden layer.",
          weight: 3,
          required: true,
        },
        {
          id: "claim-two",
          description:
            "States the second claim: each observation depends only on its own hidden state, and is independent of everything else given it.",
          weight: 3,
          required: true,
        },
        {
          id: "which-is-stronger",
          description:
            "Notes that the emission independence is the stronger modelling commitment and the one more often violated in practice.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.2,
    discrimination: 1.7,
    expectedSeconds: 200,
    prereqClosure: ["hmm", "markov-chains", "joint-distribution"],
    source: BISHOP,
    status: "live",
  },
  {
    id: "hmm--explain-observations-not-markov",
    conceptId: "hmm",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "The hidden states of an HMM are Markov. Are the observations Markov too? Explain, and say why " +
      "the answer is what makes HMMs worth using.",
    rubric: {
      elements: [
        {
          id: "no",
          description: "Answers no — the observation sequence is not Markov.",
          weight: 3,
          required: true,
          misconception: {
            id: "markov-inherited-by-emissions",
            description:
              "Assumes the Markov property passes down to the observed layer. Marginalising the hidden states out leaves long-range dependence.",
            blameConceptId: "hmm",
          },
        },
        {
          id: "why",
          description:
            "Explains that the first and last observations are both informative about the intervening state path, so dependence persists across arbitrary distances once the states are marginalised out.",
          weight: 4,
          required: true,
        },
        {
          id: "why-useful",
          description:
            "Draws the conclusion: a short-memory hidden process generates a long-memory observed one, which is exactly the modelling leverage an HMM provides.",
          weight: 3,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.8,
    expectedSeconds: 210,
    prereqClosure: ["hmm", "markov-chains", "joint-distribution"],
    source: MURPHY,
    status: "live",
  },
  {
    id: "hmm--transfer-general-purpose",
    conceptId: "hmm",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "HMMs became famous through speech recognition. Explain why they are nonetheless a " +
      "general-purpose modelling tool, giving at least two concrete applications outside speech.",
    rubric: {
      elements: [
        {
          id: "abstract-pattern",
          description:
            "Identifies the abstract pattern that recurs: a latent regime that persists over time, observed only through noisy signals.",
          weight: 3,
          required: true,
        },
        {
          id: "two-applications",
          description:
            "Gives at least two concrete non-speech applications — e.g. gene sequence annotation, financial regime switching, part-of-speech tagging, robot localisation.",
          weight: 3,
          required: true,
        },
        {
          id: "algorithms-unchanged",
          description:
            "Notes that the same three algorithms (forward, Viterbi, Baum–Welch) apply unchanged across all of them, since nothing in the model is about speech.",
          weight: 3,
        },
      ],
      forbiddenMoves: [
        {
          id: "lists-without-pattern",
          description:
            "Lists applications without identifying what they share structurally, which is the actual question.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.75,
    discrimination: 1.7,
    expectedSeconds: 220,
    prereqClosure: ["hmm", "markov-chains"],
    source: AUTHORED,
    status: "live",
  },
  // =========================================================================
  // Cluster 2 — Latent variables & EM
  // =========================================================================

  // --- Mixture Models and Latent Variables ----------------------------------
  {
    id: "mixtures--recall-describe",
    conceptId: "mixture-models-and-latent-variables",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe a mixture model, including the role of the latent variable.",
    rubric: {
      elements: [
        {
          id: "components",
          description:
            "States that each observation comes from one of several component distributions.",
          weight: 3,
          required: true,
        },
        {
          id: "latent-indicator",
          description:
            "States that a latent variable Z records which component generated each observation, and is never recorded in the data.",
          weight: 3,
          required: true,
        },
        {
          id: "marginal",
          description:
            "States that the observed distribution is the marginal of the joint over (Z, X), obtained by summing or integrating Z out.",
          weight: 2,
        },
      ],
    },
    difficulty: -0.5,
    discrimination: 1.2,
    expectedSeconds: 85,
    prereqClosure: [
      "mixture-models-and-latent-variables",
      "joint-distribution",
      "marginal-distribution",
    ],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mixtures--recall-latent-means",
    conceptId: "mixture-models-and-latent-variables",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In a mixture model, the latent variable Z is:",
    choices: [
      { id: "a", text: "Never observed — it must be inferred from the data", correct: true },
      {
        id: "b",
        text: "Recorded directly in the dataset alongside X",
        correct: false,
        misconception: {
          id: "latent-assumed-observed",
          description:
            "Contradicts the meaning of 'latent'. If Z were recorded, fitting the model would be ordinary supervised estimation and EM would be unnecessary.",
          blameConceptId: "mixture-models-and-latent-variables",
        },
      },
      {
        id: "c",
        text: "A parameter estimated once for the whole dataset",
        correct: false,
        misconception: {
          id: "latent-as-global-parameter",
          description:
            "Confuses the per-observation latent variable with the global mixing weights, which are parameters.",
          blameConceptId: "mixture-models-and-latent-variables",
        },
      },
      {
        id: "d",
        text: "Always binary",
        correct: false,
        misconception: {
          id: "latent-assumed-binary",
          description: "Z is categorical over K components, and K need not be 2.",
          blameConceptId: "mixture-models-and-latent-variables",
        },
      },
    ],
    difficulty: -0.15,
    discrimination: 1.5,
    expectedSeconds: 35,
    prereqClosure: ["mixture-models-and-latent-variables"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mixtures--apply-marginalise-to-mixture",
    conceptId: "mixture-models-and-latent-variables",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Starting from the marginal-distribution rule p(x) = sum over z of p(x, z), derive the mixture " +
      "density p(x) = sum over k of pi_k · f_k(x). Show which step introduces each factor.",
    rubric: {
      elements: [
        {
          id: "starts-from-marginal",
          description:
            "Begins from the sum-out rule applied with Z as the variable being marginalised, rather than asserting the mixture form fresh.",
          weight: 3,
          required: true,
          misconception: {
            id: "mixture-as-new-object",
            description:
              "Treats the mixture density as a new construction rather than an instance of marginalisation already covered.",
            blameConceptId: "marginal-distribution",
          },
        },
        {
          id: "chain-rule",
          description:
            "Expands the joint as p(x, Z = k) = P(Z = k)·p(x | Z = k), identifying P(Z = k) as pi_k and p(x | Z = k) as f_k.",
          weight: 4,
          required: true,
        },
        {
          id: "result",
          description: "Arrives at the weighted sum over k.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.35,
    discrimination: 1.6,
    expectedSeconds: 160,
    prereqClosure: [
      "mixture-models-and-latent-variables",
      "marginal-distribution",
      "joint-distribution",
    ],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mixtures--apply-two-coin-marginal",
    conceptId: "mixture-models-and-latent-variables",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A box holds two kinds of coin in equal numbers. Type 1 lands heads with probability 0.3; type " +
      "2 with probability 0.8. You draw a coin at random and flip it once. What is the probability of " +
      "heads? Give a decimal to three places.",
    answerKey: 0.55,
    tolerance: 0.005,
    difficulty: 0.3,
    discrimination: 1.4,
    expectedSeconds: 100,
    prereqClosure: [
      "mixture-models-and-latent-variables",
      "marginal-distribution",
      "joint-distribution",
    ],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mixtures--apply-responsibility",
    conceptId: "mixture-models-and-latent-variables",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Same box of coins: half are type 1 (heads with probability 0.3), half type 2 (heads with " +
      "probability 0.8). You draw one, flip it, and see heads. What is the probability it was a type " +
      "1 coin? Give a decimal to three places.",
    answerKey: 0.273,
    tolerance: 0.01,
    difficulty: 0.7,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: [
      "mixture-models-and-latent-variables",
      "joint-distribution",
      "marginal-distribution",
    ],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mixtures--explain-simple-to-complex",
    conceptId: "mixture-models-and-latent-variables",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Each component of a mixture may be simple, symmetric, and single-peaked. Explain how the " +
      "mixture as a whole can nonetheless be skewed or have several peaks.",
    rubric: {
      elements: [
        {
          id: "combination-not-component",
          description:
            "States that the complexity comes from the weighted combination, not from any individual component.",
          weight: 4,
          required: true,
        },
        {
          id: "concrete-shape",
          description:
            "Gives a concrete instance: components far apart produce separate peaks; components close together with different spreads produce skew or a heavy tail.",
          weight: 3,
          required: true,
        },
        {
          id: "analogy",
          description:
            "Offers a comparable construction — a Fourier series building complex waveforms from simple sines is the standard one — or notes the approximation result that enough components can match any smooth density.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.05,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["mixture-models-and-latent-variables", "marginal-distribution"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mixtures--explain-log-of-sum",
    conceptId: "mixture-models-and-latent-variables",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Fitting a mixture by maximum likelihood is much harder than fitting a single component. Point " +
      "at the precise algebraic reason, and say what would change if the latent labels were observed.",
    rubric: {
      elements: [
        {
          id: "log-of-sum",
          description:
            "Identifies that the observed-data log-likelihood is a sum of logs of sums — the log cannot be distributed over the sum inside — so terms do not separate.",
          weight: 4,
          required: true,
          misconception: {
            id: "difficulty-blamed-on-size",
            description:
              "Attributes the difficulty to the number of parameters or the size of the data rather than to the structural log-of-a-sum obstruction.",
            blameConceptId: "mixture-models-and-latent-variables",
          },
        },
        {
          id: "complete-data-easy",
          description:
            "States that with Z observed the log sits directly on the joint, terms separate by component, and each component can be fitted by its usual closed form.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.35,
    discrimination: 1.7,
    expectedSeconds: 200,
    prereqClosure: [
      "mixture-models-and-latent-variables",
      "marginal-distribution",
      "joint-distribution",
    ],
    source: BISHOP,
    status: "live",
  },
  {
    id: "mixtures--transfer-segmentation",
    conceptId: "mixture-models-and-latent-variables",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A retailer models customers as a mixture of 'budget-conscious' and 'luxury' types. Explain why " +
      "the type is latent here, why the inference is still useful, and one thing that would be wrong " +
      "to do with the inferred segment.",
    rubric: {
      elements: [
        {
          id: "why-latent",
          description:
            "States that no column in the data records the type — nobody fills it in — so it must be inferred from the observed behaviour it generates.",
          weight: 3,
          required: true,
        },
        {
          id: "why-useful",
          description:
            "States that the inferred membership, though a model-dependent inference rather than a recorded fact, is precise enough to guide decisions such as targeting.",
          weight: 3,
          required: true,
        },
        {
          id: "misuse",
          description:
            "Names a misuse: treating the assignment as an observed attribute, or hard-assigning and feeding it into a downstream model, which propagates the model's assumptions while discarding its uncertainty.",
          weight: 3,
          required: true,
          misconception: {
            id: "inferred-treated-as-observed",
            description:
              "Treats a responsibility as a recorded fact rather than a belief conditional on a chosen model and a chosen number of components.",
            blameConceptId: "mixture-models-and-latent-variables",
          },
        },
      ],
    },
    difficulty: 1.55,
    discrimination: 1.7,
    expectedSeconds: 220,
    prereqClosure: ["mixture-models-and-latent-variables", "marginal-distribution"],
    source: AUTHORED,
    status: "live",
  },
  // --- EM Algorithm ---------------------------------------------------------
  {
    id: "em--recall-two-steps",
    conceptId: "em-algorithm",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe the two steps of the EM algorithm and what each one holds fixed.",
    rubric: {
      elements: [
        {
          id: "e-step",
          description:
            "E-step: with the parameters held fixed, compute the posterior distribution over the latent variables given the data (the responsibilities), and form the expected complete-data log-likelihood.",
          weight: 4,
          required: true,
        },
        {
          id: "m-step",
          description:
            "M-step: with those inferred latent quantities held fixed, maximise over the parameters as if the latent values had been observed.",
          weight: 4,
          required: true,
        },
        {
          id: "alternation",
          description:
            "Notes that the alternation breaks a chicken-and-egg problem: parameters make assignments easy and assignments make parameters easy, but neither is known at the start.",
          weight: 2,
        },
      ],
    },
    difficulty: -0.2,
    discrimination: 1.3,
    expectedSeconds: 100,
    prereqClosure: ["em-algorithm", "mixture-models-and-latent-variables", "mle"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "em--recall-why-needed",
    conceptId: "em-algorithm",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "EM exists specifically because:",
    choices: [
      {
        id: "a",
        text: "Marginalising the latent variables out puts a sum inside the log, so the likelihood no longer separates and cannot be maximised directly",
        correct: true,
      },
      {
        id: "b",
        text: "The likelihood is impossible to evaluate at any parameter value",
        correct: false,
        misconception: {
          id: "likelihood-assumed-unevaluable",
          description:
            "The likelihood can be evaluated fine — indeed you should monitor it every iteration. It is maximising it in closed form that fails.",
          blameConceptId: "em-algorithm",
        },
      },
      {
        id: "c",
        text: "Latent-variable models have too many parameters for gradient methods",
        correct: false,
        misconception: {
          id: "difficulty-blamed-on-dimension",
          description:
            "Attributes the difficulty to scale rather than to the structural log-of-a-sum obstruction; gradient methods do in fact work, just without EM's monotonicity guarantee.",
          blameConceptId: "em-algorithm",
        },
      },
      {
        id: "d",
        text: "The prior over the latent variables is unknown",
        correct: false,
        misconception: {
          id: "em-as-prior-estimation",
          description:
            "The mixing weights are estimated like any other parameter; EM is not a device for supplying a missing prior.",
          blameConceptId: "em-algorithm",
        },
      },
    ],
    difficulty: 0.15,
    discrimination: 1.6,
    expectedSeconds: 50,
    prereqClosure: ["em-algorithm", "mle", "mixture-models-and-latent-variables"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "em--recall-what-it-guarantees",
    conceptId: "em-algorithm",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does EM guarantee about the observed-data likelihood across iterations?",
    choices: [
      {
        id: "a",
        text: "It never decreases, and the algorithm converges to a stationary point that may be a local optimum",
        correct: true,
      },
      {
        id: "b",
        text: "It converges to the global maximum",
        correct: false,
        misconception: {
          id: "em-assumed-global",
          description:
            "Confuses monotone improvement with global optimality. EM climbs a non-convex surface and stops wherever it lands, which is why multiple random restarts are standard.",
          blameConceptId: "em-algorithm",
        },
      },
      {
        id: "c",
        text: "It increases strictly at every iteration until convergence",
        correct: false,
        misconception: {
          id: "strict-increase-assumed",
          description:
            "The guarantee is non-decrease; at a stationary point the likelihood stops changing, which is exactly the convergence criterion.",
          blameConceptId: "em-algorithm",
        },
      },
      {
        id: "d",
        text: "Nothing — EM is a heuristic with no guarantee",
        correct: false,
        misconception: {
          id: "guarantee-denied",
          description:
            "Understates the result. The monotonicity is a theorem, and a decrease in your log-likelihood trace is a bug in the implementation.",
          blameConceptId: "em-algorithm",
        },
      },
    ],
    difficulty: 0.4,
    discrimination: 1.7,
    expectedSeconds: 55,
    prereqClosure: ["em-algorithm", "mle"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "em--apply-e-step-responsibility",
    conceptId: "em-algorithm",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "An EM run on a two-component mixture currently has mixing weights 0.5 and 0.5, with component " +
      "likelihoods for one observation of 0.3 and 0.8 respectively. What responsibility does the " +
      "E-step assign that observation to component 1? Give a decimal to three places.",
    answerKey: 0.273,
    tolerance: 0.01,
    difficulty: 0.65,
    discrimination: 1.5,
    expectedSeconds: 130,
    prereqClosure: ["em-algorithm", "mixture-models-and-latent-variables", "joint-distribution"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "em--apply-m-step-weighted-mle",
    conceptId: "em-algorithm",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Explain what the M-step actually computes for a mixture, and why it is usually available in " +
      "closed form when the original maximum-likelihood problem was not.",
    rubric: {
      elements: [
        {
          id: "weighted-mle",
          description:
            "States that the M-step performs the ordinary maximum-likelihood update for each component, weighted by the responsibilities — a responsibility-weighted version of the fully observed fit.",
          weight: 4,
          required: true,
        },
        {
          id: "why-closed-form",
          description:
            "Explains the reason: taking the expectation moved outside the log, so the objective is a sum of logs of joints rather than a log of a sum, and terms separate by component again.",
          weight: 4,
          required: true,
        },
        {
          id: "effective-count",
          description:
            "Notes that the sum of responsibilities for a component acts as an effective count — the number of points it owns, counting fractions.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.95,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["em-algorithm", "mle", "mixture-models-and-latent-variables"],
    source: BISHOP,
    status: "live",
  },
  {
    id: "em--explain-log-of-sum-obstruction",
    conceptId: "em-algorithm",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Write down (or describe precisely) the observed-data log-likelihood for a latent-variable " +
      "model, and contrast it with the complete-data log-likelihood. Which one is EM trying to get " +
      "back to, and why?",
    rubric: {
      elements: [
        {
          id: "observed-form",
          description:
            "Gives the observed-data form: a sum over observations of the log of a sum over latent values of the joint.",
          weight: 3,
          required: true,
        },
        {
          id: "complete-form",
          description:
            "Gives the complete-data form: a sum over observations of the log of the joint, with the latent value supplied.",
          weight: 3,
          required: true,
        },
        {
          id: "what-em-does",
          description:
            "States that EM works with the expected complete-data log-likelihood, supplying the missing latent values with a current best posterior guess so the convenient form is recovered.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["em-algorithm", "mle", "mixture-models-and-latent-variables"],
    source: BISHOP,
    status: "live",
  },
  {
    id: "em--explain-monotonicity",
    conceptId: "em-algorithm",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "EM never directly maximises the observed-data likelihood, yet that likelihood provably never " +
      "decreases. Explain the mechanism that makes this work.",
    rubric: {
      elements: [
        {
          id: "lower-bound",
          description:
            "Identifies that the two steps construct and maximise a lower bound on the observed log-likelihood, rather than the log-likelihood itself.",
          weight: 4,
          required: true,
          misconception: {
            id: "monotonicity-asserted",
            description:
              "Asserts that EM improves each round without naming the bound, which is the only thing that makes the claim provable.",
            blameConceptId: "em-algorithm",
          },
        },
        {
          id: "tightness",
          description:
            "States that the E-step makes the bound tight at the current parameters — the gap between the bound and the true log-likelihood is driven to zero there.",
          weight: 3,
          required: true,
        },
        {
          id: "sandwich",
          description:
            "Completes the argument: the M-step raises the bound, and since the true log-likelihood is always at least the bound and was equal to it before the move, it must have risen at least as much.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.35,
    discrimination: 1.8,
    expectedSeconds: 240,
    prereqClosure: ["em-algorithm", "mle", "mixture-models-and-latent-variables"],
    source: BISHOP,
    status: "live",
  },
  {
    id: "em--transfer-restarts",
    conceptId: "em-algorithm",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Standard practice is to run EM several times from different random initialisations and keep " +
      "the best result. Explain what property of EM makes this necessary, and how you would decide " +
      "which run is 'best'.",
    rubric: {
      elements: [
        {
          id: "local-optima",
          description:
            "States that the likelihood surface is not concave, so EM converges to a local optimum that depends on where it started.",
          weight: 4,
          required: true,
          misconception: {
            id: "em-assumed-global",
            description: "Believes EM finds the global optimum, making restarts pointless.",
            blameConceptId: "em-algorithm",
          },
        },
        {
          id: "selection-criterion",
          description:
            "States that runs are compared by their final observed-data log-likelihood, since that is the objective — not by visual appeal or by which produced the most balanced components.",
          weight: 3,
          required: true,
        },
        {
          id: "degeneracy",
          description:
            "Notes a related trap: a run whose likelihood ran away to infinity because a component collapsed onto a single point is not the 'best' run, and needs a variance floor or a prior to prevent.",
          weight: 3,
        },
      ],
    },
    difficulty: 1.85,
    discrimination: 1.8,
    expectedSeconds: 230,
    prereqClosure: ["em-algorithm", "mle", "mixture-models-and-latent-variables"],
    source: AUTHORED,
    status: "live",
  },
  // --- Gaussian Mixture Models ---------------------------------------------
  {
    id: "gmm--recall-describe",
    conceptId: "gaussian-mixture-models",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe a Gaussian mixture model and the parameters each component carries.",
    rubric: {
      elements: [
        {
          id: "components",
          description: "States that each component is a (multivariate) Normal distribution.",
          weight: 3,
          required: true,
        },
        {
          id: "parameters",
          description:
            "Names the three per-component parameters: a mixing weight, a mean, and a covariance.",
          weight: 3,
          required: true,
        },
        {
          id: "fitting",
          description:
            "States that it is fitted by EM, alternating soft assignments with re-estimation of those parameters.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["gaussian-mixture-models", "em-algorithm", "multivariate-normal"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "gmm--recall-vs-hard-assignment",
    conceptId: "gaussian-mixture-models",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem:
      "Compared with a method that assigns each point wholly to its nearest centroid (as K-means " +
      "does), a GMM offers:",
    choices: [
      {
        id: "a",
        text: "Soft assignments, plus the ability to model elliptical clusters of differing size and orientation through each component's own covariance",
        correct: true,
      },
      {
        id: "b",
        text: "The same hard, all-or-nothing assignments, but computed faster",
        correct: false,
        misconception: {
          id: "gmm-softness-missed",
          description:
            "Misses the entire probabilistic-assignment advantage, and is also wrong about speed — a GMM iteration is more expensive, not less.",
          blameConceptId: "gaussian-mixture-models",
        },
      },
      {
        id: "c",
        text: "Guaranteed convergence to the globally best clustering",
        correct: false,
        misconception: {
          id: "gmm-assumed-global",
          description:
            "A GMM inherits EM's local-optimum behaviour; it improves on flexibility, not on optimality.",
          blameConceptId: "em-algorithm",
        },
      },
      {
        id: "d",
        text: "Freedom from having to choose the number of clusters",
        correct: false,
        misconception: {
          id: "k-assumed-solved",
          description:
            "A GMM still requires K to be chosen. It offers better tools for choosing it, not an escape from the choice.",
          blameConceptId: "gaussian-mixture-models",
        },
      },
    ],
    difficulty: 0.65,
    discrimination: 1.6,
    expectedSeconds: 50,
    prereqClosure: ["gaussian-mixture-models", "em-algorithm"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "gmm--apply-responsibility-1d",
    conceptId: "gaussian-mixture-models",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A one-dimensional GMM has equal mixing weights, means 0 and 4, and both variances equal to 1. " +
      "For the observation x = 1, what responsibility does component 1 (the one with mean 0) receive? " +
      "Give a decimal to three places.",
    answerKey: 0.982,
    tolerance: 0.01,
    difficulty: 0.95,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: [
      "gaussian-mixture-models",
      "em-algorithm",
      "normal-distribution",
      "mixture-models-and-latent-variables",
    ],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "gmm--apply-parameter-count",
    conceptId: "gaussian-mixture-models",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A GMM with 3 components on 2-dimensional data, each component having its own unrestricted " +
      "covariance matrix. Counting free parameters — 2 per mean, 3 per symmetric 2x2 covariance, and " +
      "the mixing weights (which must sum to 1) — how many free parameters in total?",
    answerKey: 17,
    tolerance: 0.001,
    difficulty: 1.2,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["gaussian-mixture-models", "covariance-matrix", "multivariate-normal"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "gmm--explain-effective-count",
    conceptId: "gaussian-mixture-models",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "In the GMM M-step, each component's mean is a responsibility-weighted average of ALL the data " +
      "points, not just the ones assigned to it. Explain why that is the right thing to do rather than " +
      "a sloppy approximation.",
    rubric: {
      elements: [
        {
          id: "no-assignment-exists",
          description:
            "States that there is no hard assignment to restrict to — the model's belief about which component generated each point is genuinely a distribution, not a label.",
          weight: 4,
          required: true,
        },
        {
          id: "effective-count",
          description:
            "Explains that the sum of responsibilities plays the role of the component's count, so the weighted average is exactly the per-component sample mean with fractional membership.",
          weight: 3,
          required: true,
        },
        {
          id: "information-preserved",
          description:
            "Notes that a distant point contributes a negligible weight anyway, so nothing is distorted — and that hard-assigning instead would discard the model's uncertainty.",
          weight: 3,
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["gaussian-mixture-models", "em-algorithm", "expectation"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "gmm--explain-singularity",
    conceptId: "gaussian-mixture-models",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "For a GMM with unrestricted covariances, the maximum-likelihood problem is unbounded — the " +
      "likelihood can be driven to infinity. Describe the configuration that does this, and say what " +
      "practitioners do about it.",
    rubric: {
      elements: [
        {
          id: "the-configuration",
          description:
            "Describes it: put one component's mean exactly on a single data point and shrink its covariance toward zero, so that point's density diverges.",
          weight: 4,
          required: true,
          misconception: {
            id: "singularity-as-numerical-bug",
            description:
              "Treats the blow-up as a floating-point or implementation problem rather than a genuine unboundedness of the objective.",
            blameConceptId: "gaussian-mixture-models",
          },
        },
        {
          id: "consequence",
          description:
            "Draws the consequence: 'find the global maximum' is not even well posed for this model, so the useful solutions are interior local optima.",
          weight: 3,
          required: true,
        },
        {
          id: "remedies",
          description:
            "Names at least one fix: a ridge added to the covariance diagonal, a minimum-variance floor, or a MAP formulation with an inverse-Wishart prior.",
          weight: 3,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.8,
    expectedSeconds: 220,
    prereqClosure: [
      "gaussian-mixture-models",
      "multivariate-normal",
      "covariance-matrix",
      "mle",
    ],
    source: BISHOP,
    status: "live",
  },
  {
    id: "gmm--explain-ellipsoids",
    conceptId: "gaussian-mixture-models",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Using the eigendecomposition of a covariance matrix, explain precisely what cluster shapes a " +
      "GMM component can take that a nearest-centroid method cannot.",
    rubric: {
      elements: [
        {
          id: "eigendecomposition",
          description:
            "Uses the decomposition explicitly: the eigenvectors give the axes of the cluster's ellipsoid and the eigenvalues give its extent along each axis.",
          weight: 4,
          required: true,
          misconception: {
            id: "flexibility-asserted",
            description:
              "Says only that a GMM is 'more flexible' without naming the mechanism, which is the thing being asked for.",
            blameConceptId: "gaussian-mixture-models",
          },
        },
        {
          id: "arbitrary-orientation",
          description:
            "Concludes that a component can be long, thin, and tilted at any angle, and that different components can differ in all of this.",
          weight: 3,
          required: true,
        },
        {
          id: "kmeans-implicit-assumption",
          description:
            "Identifies the contrast: minimising plain Euclidean distance to a centroid implicitly assumes a spherical, equally-sized covariance for every cluster.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.85,
    discrimination: 1.8,
    expectedSeconds: 240,
    prereqClosure: [
      "gaussian-mixture-models",
      "multivariate-normal",
      "covariance-matrix",
      "eigendecomposition",
      "eigenvalues-eigenvectors",
    ],
    source: BISHOP,
    status: "live",
  },
  {
    id: "gmm--transfer-hard-assignment-limit",
    conceptId: "gaussian-mixture-models",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "Show that nearest-centroid clustering is not merely similar to a GMM but a limiting case of " +
      "one. Which constraint on the covariances, and which limit?",
    rubric: {
      elements: [
        {
          id: "the-constraint",
          description:
            "States the constraint: tie every component's covariance to a common spherical form (a scalar times the identity).",
          weight: 3,
          required: true,
        },
        {
          id: "the-limit",
          description:
            "States the limit: let that scalar variance go to zero.",
          weight: 3,
          required: true,
        },
        {
          id: "why-hard",
          description:
            "Explains the mechanism: the density ratio between components is governed by an exponential in the negative squared distance divided by that variance, so as the variance vanishes the ratio becomes infinitely sharp and essentially all responsibility goes to the nearest component.",
          weight: 4,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "analogy-only",
          description:
            "Argues only that the two algorithms have a similar two-step shape, which does not establish a limiting case.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.15,
    discrimination: 1.9,
    expectedSeconds: 260,
    prereqClosure: [
      "gaussian-mixture-models",
      "em-algorithm",
      "multivariate-normal",
      "covariance-matrix",
    ],
    source: BISHOP,
    status: "live",
  },
  // --- Laplace Approximation -----------------------------------------------
  {
    id: "laplace--recall-describe",
    conceptId: "laplace-approximation",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe the Laplace approximation: what it produces, where it is centred, and what sets its spread.",
    rubric: {
      elements: [
        {
          id: "gaussian",
          description: "States that it approximates the target distribution with a Normal.",
          weight: 3,
          required: true,
        },
        {
          id: "centred-at-mode",
          description: "States that the Normal is centred at the mode of the target.",
          weight: 3,
          required: true,
        },
        {
          id: "covariance",
          description:
            "States that the covariance is the inverse of the negative Hessian (second-derivative matrix) of the log-density at that mode.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["laplace-approximation", "multivariate-normal", "mle"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "laplace--recall-covariance-source",
    conceptId: "laplace-approximation",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In the Laplace approximation, the covariance of the fitted Normal is given by:",
    choices: [
      {
        id: "a",
        text: "The inverse of the negative second derivative of the log-density, evaluated at the mode",
        correct: true,
      },
      {
        id: "b",
        text: "The sample variance of the data",
        correct: false,
        misconception: {
          id: "covariance-from-data-spread",
          description:
            "Confuses the spread of the data with the spread of the approximated distribution over parameters, which is governed by how sharply the log-density peaks.",
          blameConceptId: "laplace-approximation",
        },
      },
      {
        id: "c",
        text: "The negative second derivative of the log-density itself, not its inverse",
        correct: false,
        misconception: {
          id: "curvature-not-inverted",
          description:
            "Drops the inversion, which flips the relationship: sharper curvature would then mean a wider approximation instead of a narrower one.",
          blameConceptId: "laplace-approximation",
        },
      },
      {
        id: "d",
        text: "The first derivative of the log-density at the mode",
        correct: false,
        misconception: {
          id: "uses-gradient",
          description:
            "The gradient is exactly zero at a mode — that vanishing is what makes the expansion work — so it carries no information about spread.",
          blameConceptId: "laplace-approximation",
        },
      },
    ],
    difficulty: 0.6,
    discrimination: 1.6,
    expectedSeconds: 50,
    prereqClosure: ["laplace-approximation", "multivariate-normal"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "laplace--apply-beta-mode",
    conceptId: "laplace-approximation",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A posterior for p has log-density proportional to 2·log(p) + log(1 − p) on the interval from 0 " +
      "to 1. Where does the Laplace approximation place its centre? Give a decimal to three places.",
    answerKey: 0.667,
    tolerance: 0.01,
    difficulty: 1.0,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["laplace-approximation", "mle"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "laplace--apply-beta-variance",
    conceptId: "laplace-approximation",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Same posterior: log-density proportional to 2·log(p) + log(1 − p), with its mode at p = 2/3. " +
      "What variance does the Laplace approximation assign? Give a decimal to three places.",
    answerKey: 0.074,
    tolerance: 0.01,
    difficulty: 1.4,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["laplace-approximation", "mle", "variance"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "laplace--explain-sharp-vs-flat",
    conceptId: "laplace-approximation",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why a sharply peaked mode yields a narrow Normal approximation while a flat one yields " +
      "a wide approximation. Say what the width is really reporting.",
    rubric: {
      elements: [
        {
          id: "curvature",
          description:
            "Connects a sharp peak to a large-magnitude negative second derivative, and a flat peak to a small one.",
          weight: 3,
          required: true,
        },
        {
          id: "inversion",
          description:
            "Explains that the covariance is the inverse of that curvature, so large curvature gives small variance and vice versa.",
          weight: 3,
          required: true,
        },
        {
          id: "interpretation",
          description:
            "Interprets it: a flat log-density means the data barely distinguishes nearby parameter values, so wide uncertainty is the honest answer — the same information-versus-variance relationship that governs the precision of an estimator.",
          weight: 3,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["laplace-approximation", "mle", "variance"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "laplace--explain-why-gaussian-forced",
    conceptId: "laplace-approximation",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "The Laplace approximation always produces a Normal distribution. Is that a convenient choice, " +
      "or is it forced? Explain.",
    rubric: {
      elements: [
        {
          id: "forced",
          description: "Answers that it is forced, not chosen.",
          weight: 2,
          required: true,
          misconception: {
            id: "gaussian-as-arbitrary-choice",
            description:
              "Treats the Normal as one option among several the method could have picked, missing that it is determined by the decision to expand to second order.",
            blameConceptId: "laplace-approximation",
          },
        },
        {
          id: "quadratic-log",
          description:
            "Explains that a second-order Taylor expansion of any log-density is a quadratic, and the only distribution whose log is exactly quadratic is the Normal.",
          weight: 4,
          required: true,
        },
        {
          id: "higher-order",
          description:
            "Notes that going to higher order would not give a nicer distribution — the result need not even be integrable.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.7,
    expectedSeconds: 200,
    prereqClosure: ["laplace-approximation", "multivariate-normal", "normal-distribution"],
    source: BISHOP,
    status: "live",
  },
  {
    id: "laplace--explain-derivation",
    conceptId: "laplace-approximation",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Sketch the derivation of the Laplace approximation by Taylor expansion, being explicit about " +
      "which term drops out and why.",
    rubric: {
      elements: [
        {
          id: "expand-the-log",
          description:
            "Expands the LOG of the target density around its mode to second order, rather than expanding the density itself.",
          weight: 3,
          required: true,
        },
        {
          id: "vanishing-linear-term",
          description:
            "States explicitly that the first-order (gradient) term vanishes because the gradient is zero at a mode.",
          weight: 4,
          required: true,
          misconception: {
            id: "linear-term-retained",
            description:
              "Keeps or ignores the linear term, losing the step that makes the result a clean quadratic centred at the mode.",
            blameConceptId: "laplace-approximation",
          },
        },
        {
          id: "exponentiate",
          description:
            "Exponentiates the remaining constant-minus-quadratic to recognise an unnormalised Normal, and matches terms to read off the covariance.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.8,
    discrimination: 1.8,
    expectedSeconds: 270,
    prereqClosure: ["laplace-approximation", "multivariate-normal", "normal-distribution"],
    source: BISHOP,
    status: "live",
  },
  {
    id: "laplace--transfer-multimodal-failure",
    conceptId: "laplace-approximation",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Give a class of posteriors on which the Laplace approximation performs badly, explain the " +
      "mechanism of the failure, and say what it motivates.",
    rubric: {
      elements: [
        {
          id: "multimodal-or-skewed",
          description:
            "Names multimodal or strongly skewed posteriors — mixture models and anything with label-switching symmetry are canonical examples.",
          weight: 3,
          required: true,
        },
        {
          id: "mechanism",
          description:
            "Gives the mechanism: the expansion is local to one mode, so other modes are not merely underweighted but invisible; and a symmetric Normal cannot represent skew by construction.",
          weight: 4,
          required: true,
          misconception: {
            id: "failure-blamed-on-optimiser",
            description:
              "Blames the optimiser for finding the wrong mode, rather than recognising that a single Normal cannot represent several modes however the optimisation goes.",
            blameConceptId: "laplace-approximation",
          },
        },
        {
          id: "motivates",
          description:
            "States what it motivates: methods that fit an approximating distribution against a global criterion rather than local curvature, such as variational inference.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.8,
    expectedSeconds: 250,
    prereqClosure: [
      "laplace-approximation",
      "multivariate-normal",
      "normal-distribution",
      "mle",
    ],
    source: MURPHY,
    status: "live",
  },
  // =========================================================================
  // Cluster 3 — Variational inference & kernels
  // =========================================================================

  // --- Variational Inference: ELBO -----------------------------------------
  {
    id: "elbo--recall-vi-goal",
    conceptId: "variational-inference-elbo",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "State the goal of variational inference, including what is being minimised over what.",
    rubric: {
      elements: [
        {
          id: "approximate-posterior",
          description:
            "States that an intractable posterior is approximated by a simpler, tractable distribution q.",
          weight: 3,
          required: true,
        },
        {
          id: "kl-objective",
          description:
            "States that q is chosen to minimise the KL divergence from q to the true posterior.",
          weight: 3,
          required: true,
        },
        {
          id: "optimisation-not-sampling",
          description:
            "Notes the character of the method: inference has been turned into an optimisation problem over a family of distributions, in contrast to sampling approaches.",
          weight: 2,
        },
      ],
    },
    difficulty: -0.2,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["variational-inference-elbo", "kl-divergence"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "elbo--recall-why-not-direct-kl",
    conceptId: "variational-inference-elbo",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Why is the ELBO maximised instead of the KL divergence being minimised directly?",
    choices: [
      {
        id: "a",
        text: "The KL objective still refers to the true posterior, and hence to the intractable evidence p(X); maximising the ELBO is equivalent but needs only quantities you can compute",
        correct: true,
      },
      {
        id: "b",
        text: "KL divergence is easier to compute directly, but the ELBO converges faster",
        correct: false,
        misconception: {
          id: "kl-assumed-computable",
          description:
            "Exactly backwards. It is precisely the intractability of the evidence that forces the ELBO detour; speed has nothing to do with it.",
          blameConceptId: "variational-inference-elbo",
        },
      },
      {
        id: "c",
        text: "The KL divergence can be negative, so it has no minimum",
        correct: false,
        misconception: {
          id: "kl-sign-confusion",
          description:
            "KL divergence is non-negative — that is exactly the fact that makes the ELBO a lower bound.",
          blameConceptId: "kl-divergence",
        },
      },
      {
        id: "d",
        text: "The ELBO and the KL divergence have different optimisers, and the ELBO's is preferable",
        correct: false,
        misconception: {
          id: "optimisers-assumed-different",
          description:
            "They have the SAME optimiser — that equivalence is the entire justification for the substitution.",
          blameConceptId: "variational-inference-elbo",
        },
      },
    ],
    difficulty: 0.15,
    discrimination: 1.7,
    expectedSeconds: 60,
    prereqClosure: ["variational-inference-elbo", "kl-divergence"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "elbo--apply-gap-arithmetic",
    conceptId: "variational-inference-elbo",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "For a fitted approximation q, the log evidence is −100 and the ELBO evaluates to −105.5. What " +
      "is the KL divergence from q to the true posterior? Give a decimal to one place.",
    answerKey: 5.5,
    tolerance: 0.05,
    difficulty: 0.5,
    discrimination: 1.4,
    expectedSeconds: 110,
    prereqClosure: ["variational-inference-elbo", "kl-divergence"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "elbo--apply-why-lower-bound",
    conceptId: "variational-inference-elbo",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "State the decomposition of the log evidence into the ELBO plus a KL term, and use it to " +
      "explain why the ELBO deserves the name 'lower bound'.",
    rubric: {
      elements: [
        {
          id: "decomposition",
          description:
            "States log p(X) = ELBO + KL(q ‖ posterior), as an exact identity holding for every q.",
          weight: 3,
          required: true,
        },
        {
          id: "nonnegativity",
          description:
            "Invokes the non-negativity of KL divergence — Gibbs' inequality, itself a consequence of Jensen's inequality — rather than arguing the bound afresh.",
          weight: 4,
          required: true,
          misconception: {
            id: "bound-asserted",
            description:
              "Asserts the ELBO is below the evidence without naming the non-negative quantity that separates them.",
            blameConceptId: "kl-divergence",
          },
        },
        {
          id: "equality-case",
          description:
            "Notes that equality holds exactly when q equals the true posterior, which is when the KL term vanishes.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.65,
    discrimination: 1.7,
    expectedSeconds: 180,
    prereqClosure: ["variational-inference-elbo", "kl-divergence", "expectation"],
    source: BISHOP,
    status: "live",
  },
  {
    id: "elbo--explain-equivalence",
    conceptId: "variational-inference-elbo",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Explain why maximising the ELBO over q is exactly the same problem as minimising the KL " +
      "divergence from q to the posterior — not merely a good proxy for it.",
    rubric: {
      elements: [
        {
          id: "constant-in-q",
          description:
            "Identifies that the log evidence is a property of the model and data alone, containing no q, so it is a constant as q varies.",
          weight: 4,
          required: true,
          misconception: {
            id: "elbo-as-approximation",
            description:
              "Treats the ELBO as a heuristic surrogate rather than recognising the exact algebraic equivalence.",
            blameConceptId: "variational-inference-elbo",
          },
        },
        {
          id: "tradeoff",
          description:
            "Draws the conclusion: the two terms on the right must trade off exactly, so raising one lowers the other by the same amount and the argmax and argmin coincide.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.35,
    discrimination: 1.8,
    expectedSeconds: 200,
    prereqClosure: ["variational-inference-elbo", "kl-divergence"],
    source: BISHOP,
    status: "live",
  },
  {
    id: "elbo--explain-two-term-reading",
    conceptId: "variational-inference-elbo",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "The ELBO can be regrouped as an expected log-likelihood term minus a KL-to-the-prior term. " +
      "Explain what each term is doing and what would happen if either were dropped.",
    rubric: {
      elements: [
        {
          id: "reconstruction",
          description:
            "Identifies the first term as a fit or reconstruction term: does a latent value drawn from q explain the observed data?",
          weight: 3,
          required: true,
        },
        {
          id: "regularisation",
          description:
            "Identifies the second as a regulariser pulling q toward the prior.",
          weight: 3,
          required: true,
        },
        {
          id: "what-breaks",
          description:
            "Says what each omission causes: with no KL term q is free to collapse onto whatever explains the data, ignoring the prior entirely; with no fit term q is driven straight onto the prior and carries no information about the data.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["variational-inference-elbo", "kl-divergence", "expectation"],
    source: MURPHY,
    status: "live",
  },
  {
    id: "elbo--transfer-mean-field-variance",
    conceptId: "variational-inference-elbo",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A colleague reports 95% credible intervals from a mean-field variational fit and treats them " +
      "like MCMC intervals. What systematic problem should you warn them about, and where does it " +
      "come from?",
    rubric: {
      elements: [
        {
          id: "underestimates",
          description:
            "States that mean-field VI systematically underestimates posterior variance, so the intervals are too narrow.",
          weight: 3,
          required: true,
        },
        {
          id: "mechanism",
          description:
            "Gives the mechanism: this direction of the KL heavily penalises q placing mass where the posterior has little, so the optimiser keeps q inside the high-density region — mode-seeking rather than mass-covering. On a correlated posterior a factorised q fits inside the correlation ellipse.",
          weight: 4,
          required: true,
          misconception: {
            id: "kl-direction-ignored",
            description:
              "Overlooks that the asymmetry of KL divergence has a concrete consequence for the shape of the fitted approximation.",
            blameConceptId: "kl-divergence",
          },
        },
        {
          id: "why-not-reversed",
          description:
            "Notes that reversing the KL would give mass-covering behaviour, but that direction needs expectations under the posterior — precisely what was unavailable.",
          weight: 3,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.9,
    expectedSeconds: 240,
    prereqClosure: ["variational-inference-elbo", "kl-divergence", "expectation"],
    source: MURPHY,
    status: "live",
  },
  {
    id: "elbo--transfer-bound-for-model-comparison",
    conceptId: "variational-inference-elbo",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Two models are compared by their ELBO values, and the higher one is declared the better model. " +
      "Under what circumstance is this reasoning sound, and when could it mislead?",
    rubric: {
      elements: [
        {
          id: "bound-not-evidence",
          description:
            "States that the ELBO is a lower bound on the log evidence, not the evidence itself, so comparing bounds is not the same as comparing evidences.",
          weight: 4,
          required: true,
          misconception: {
            id: "elbo-read-as-evidence",
            description:
              "Treats the bound as if it were the quantity it bounds, ignoring the gap.",
            blameConceptId: "variational-inference-elbo",
          },
        },
        {
          id: "gap-varies",
          description:
            "Explains the failure mode: the gap is the KL between q and each model's own posterior, and it can differ between models — a model whose posterior the variational family fits badly is penalised by its looser bound, not by being a worse model.",
          weight: 4,
          required: true,
        },
        {
          id: "when-sound",
          description:
            "Says when it is defensible: when the variational family fits both posteriors comparably well, so the gaps are similar and the comparison is not dominated by approximation quality.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.85,
    discrimination: 1.8,
    expectedSeconds: 250,
    prereqClosure: ["variational-inference-elbo", "kl-divergence"],
    source: MURPHY,
    status: "live",
  },
  // --- Variational Inference: VAEs -----------------------------------------
  {
    id: "vae--recall-two-networks",
    conceptId: "variational-inference-vaes",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Name the two networks in a VAE, say what distribution each parameterises, and name the training objective.",
    rubric: {
      elements: [
        {
          id: "encoder",
          description:
            "Encoder (recognition network): parameterises the approximate posterior over the latent code given a data point.",
          weight: 3,
          required: true,
        },
        {
          id: "decoder",
          description:
            "Decoder (generative network): parameterises the likelihood of the data given a latent code.",
          weight: 3,
          required: true,
        },
        {
          id: "objective",
          description: "States that both are trained by maximising the ELBO, via backpropagation.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 0.2,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["variational-inference-vaes", "variational-inference-elbo", "neural-networks"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "vae--recall-generalisation",
    conceptId: "variational-inference-vaes",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In what way do VAEs generalise classical variational inference?",
    choices: [
      {
        id: "a",
        text: "Neural networks supply the approximate posterior and the likelihood, replacing hand-chosen parametric families, and one shared encoder amortises inference across all data points",
        correct: true,
      },
      {
        id: "b",
        text: "They are identical to classical VI, just implemented on a GPU",
        correct: false,
        misconception: {
          id: "vae-seen-as-implementation-detail",
          description:
            "Misses the entire generalisation: the flexibility of the approximating family and the amortisation of inference are modelling changes, not engineering ones.",
          blameConceptId: "variational-inference-vaes",
        },
      },
      {
        id: "c",
        text: "They dispense with the ELBO and optimise the exact posterior instead",
        correct: false,
        misconception: {
          id: "elbo-assumed-abandoned",
          description:
            "The ELBO is exactly what a VAE maximises; the neural networks change what family q ranges over, not the objective.",
          blameConceptId: "variational-inference-elbo",
        },
      },
      {
        id: "d",
        text: "They remove the need for a prior over the latent variables",
        correct: false,
        misconception: {
          id: "prior-assumed-dropped",
          description:
            "The prior is still there and still essential — it is what the KL term regularises toward, and what you sample from to generate.",
          blameConceptId: "variational-inference-vaes",
        },
      },
    ],
    difficulty: 0.5,
    discrimination: 1.6,
    expectedSeconds: 55,
    prereqClosure: ["variational-inference-vaes", "variational-inference-elbo"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "vae--apply-kl-closed-form",
    conceptId: "variational-inference-vaes",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "For a one-dimensional latent with a standard Normal prior, the KL term is " +
      "0.5·(mu² + sigma² − log(sigma²) − 1). The encoder outputs mu = 1 and sigma = 1 for some input. " +
      "What is the KL term? Give a decimal to three places.",
    answerKey: 0.5,
    tolerance: 0.005,
    difficulty: 1.3,
    discrimination: 1.4,
    expectedSeconds: 120,
    prereqClosure: ["variational-inference-vaes", "kl-divergence"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "vae--apply-reparameterization",
    conceptId: "variational-inference-vaes",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Why can a VAE not simply sample the latent code from the encoder's output distribution and " +
      "backpropagate through it? Describe the reparameterization trick and what it fixes.",
    rubric: {
      elements: [
        {
          id: "non-differentiable-sampling",
          description:
            "Identifies the specific problem: drawing a random sample is not a differentiable function of the parameters that governed the draw, so backpropagation cannot pass through the sampling node to reach the encoder.",
          weight: 4,
          required: true,
          misconception: {
            id: "blames-randomness-generally",
            description:
              "Says only that 'randomness breaks gradients'. Randomness itself is fine — a VAE still samples after the trick; what matters is whether the parameters sit inside the sampling operation.",
            blameConceptId: "variational-inference-vaes",
          },
        },
        {
          id: "the-trick",
          description:
            "States the reformulation: draw noise from a fixed parameter-free distribution and write the latent as the encoder's mean plus its scale times that noise.",
          weight: 4,
          required: true,
        },
        {
          id: "same-distribution",
          description:
            "Notes that the latent has exactly the same distribution as before — it is the same sample generated differently, not an approximation.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.05,
    discrimination: 1.8,
    expectedSeconds: 210,
    prereqClosure: [
      "variational-inference-vaes",
      "variational-inference-elbo",
      "backpropagation",
      "neural-networks",
    ],
    source: MURPHY,
    status: "live",
  },
  {
    id: "vae--explain-amortisation",
    conceptId: "variational-inference-vaes",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Classical VI fits a separate approximate posterior for every observation; a VAE trains one " +
      "encoder for all of them. Explain what this buys, and what it costs.",
    rubric: {
      elements: [
        {
          id: "what-it-buys",
          description:
            "States the benefit: the optimisation cost is paid once at training time, and inference on a new point becomes a single forward pass rather than a fresh optimisation.",
          weight: 4,
          required: true,
        },
        {
          id: "the-cost",
          description:
            "Names the amortisation gap: a shared network cannot match what per-point optimisation would have found for each individual observation, so the approximation is somewhat worse per point.",
          weight: 4,
          required: true,
        },
        {
          id: "the-trade",
          description:
            "Judges the trade: worth it at scale, since per-point optimisation over millions of observations is infeasible.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["variational-inference-vaes", "variational-inference-elbo"],
    source: MURPHY,
    status: "live",
  },
  {
    id: "vae--explain-joint-training",
    conceptId: "variational-inference-vaes",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Why must a VAE's encoder and decoder be trained jointly rather than one after the other? " +
      "Refer to both terms of the ELBO.",
    rubric: {
      elements: [
        {
          id: "both-terms",
          description:
            "Names the two terms: a reconstruction term measuring how well the decoder recovers the input from a sampled code, and a KL term keeping the encoder's output near the prior.",
          weight: 3,
          required: true,
        },
        {
          id: "shared-objective",
          description:
            "States that both networks' parameters enter the shared objective — the encoder determines which codes the decoder must handle — so neither has a well-defined target without the other.",
          weight: 4,
          required: true,
        },
        {
          id: "opposing-pressures",
          description:
            "Explains the balance: reconstruction pressure alone spreads codes far apart and leaves a latent space full of gaps, while KL pressure alone collapses every code onto the prior and discards all information. Their sum is what produces a latent space both informative and densely covered.",
          weight: 3,
        },
      ],
    },
    difficulty: 1.75,
    discrimination: 1.7,
    expectedSeconds: 230,
    prereqClosure: [
      "variational-inference-vaes",
      "variational-inference-elbo",
      "kl-divergence",
      "neural-networks",
    ],
    source: MURPHY,
    status: "live",
  },
  {
    id: "vae--explain-posterior-collapse",
    conceptId: "variational-inference-vaes",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "A VAE trains to a good ELBO, but its latent codes turn out to carry no information about the " +
      "input — every input maps to essentially the prior. Diagnose what has happened and why a " +
      "powerful decoder makes it more likely.",
    rubric: {
      elements: [
        {
          id: "names-it",
          description: "Names posterior collapse (or latent-variable collapse).",
          weight: 2,
          required: true,
        },
        {
          id: "mechanism",
          description:
            "Gives the mechanism: if the decoder can model the data well without using the code, the reconstruction term stops rewarding informative codes, and the KL term then drives the approximate posterior exactly onto the prior.",
          weight: 4,
          required: true,
          misconception: {
            id: "collapse-read-as-underfitting",
            description:
              "Reads the symptom as the model failing to train, when in fact the objective is being optimised successfully — just in a degenerate way.",
            blameConceptId: "variational-inference-vaes",
          },
        },
        {
          id: "remedies",
          description:
            "Names a countermeasure: annealing the KL weight up from zero, or a free-bits constraint that stops the KL term being driven below a floor.",
          weight: 3,
        },
      ],
    },
    difficulty: 1.95,
    discrimination: 1.8,
    expectedSeconds: 240,
    prereqClosure: [
      "variational-inference-vaes",
      "variational-inference-elbo",
      "kl-divergence",
      "neural-networks",
    ],
    source: MURPHY,
    status: "live",
  },
  {
    id: "vae--transfer-why-generative",
    conceptId: "variational-inference-vaes",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "After training, what can a VAE do that a classifier trained on the same data fundamentally " +
      "cannot? Describe the procedure, and say what property of the model makes it possible.",
    rubric: {
      elements: [
        {
          id: "the-capability",
          description:
            "States that a VAE can generate new data that was never in the training set.",
          weight: 3,
          required: true,
        },
        {
          id: "the-procedure",
          description:
            "Gives the procedure concretely: draw a latent code from the simple prior and pass it through the decoder.",
          weight: 3,
          required: true,
        },
        {
          id: "why-possible",
          description:
            "Identifies the reason: the VAE models the distribution of the data itself, through a latent-variable decomposition, whereas a classifier models only a conditional boundary and has no distribution over inputs to sample from.",
          weight: 4,
          required: true,
          misconception: {
            id: "generation-attributed-to-architecture",
            description:
              "Credits the encoder-decoder architecture rather than the fact that the model represents a distribution over the data — an ordinary autoencoder has the same architecture and no usable prior to sample from.",
            blameConceptId: "variational-inference-vaes",
          },
        },
      ],
    },
    difficulty: 2.25,
    discrimination: 1.8,
    expectedSeconds: 250,
    prereqClosure: [
      "variational-inference-vaes",
      "variational-inference-elbo",
      "neural-networks",
      "joint-distribution",
    ],
    source: AUTHORED,
    status: "live",
  },
  // --- Gaussian Process -----------------------------------------------------
  {
    id: "gp--recall-definition",
    conceptId: "gaussian-process",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Define a Gaussian process, and say what has to be specified to pin one down.",
    rubric: {
      elements: [
        {
          id: "distribution-over-functions",
          description: "States that it is a distribution over functions.",
          weight: 3,
          required: true,
        },
        {
          id: "finite-marginals",
          description:
            "Gives the defining property: any finite collection of function values has a joint multivariate Normal distribution.",
          weight: 4,
          required: true,
        },
        {
          id: "mean-and-kernel",
          description:
            "States that it is fully specified by a mean function and a covariance (kernel) function.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.4,
    expectedSeconds: 100,
    prereqClosure: ["gaussian-process", "multivariate-normal", "kernel"],
    source: GPML,
    status: "live",
  },
  {
    id: "gp--recall-nonparametric-meaning",
    conceptId: "gaussian-process",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which of these is NOT true of a Gaussian process being called 'nonparametric'?",
    choices: [
      {
        id: "a",
        text: "It has no parameters or hyperparameters whatsoever",
        correct: true,
      },
      {
        id: "b",
        text: "Its effective complexity grows with the amount of data",
        correct: false,
        misconception: {
          id: "growing-complexity-denied",
          description:
            "This is true, and is what the term actually means — the representation is a sum of one kernel function per training point.",
          blameConceptId: "gaussian-process",
        },
      },
      {
        id: "c",
        text: "It places a prior over an entire function space rather than a fixed parameter vector",
        correct: false,
        misconception: {
          id: "function-space-prior-denied",
          description: "This is true and is the sense in which a GP differs from a parametric model.",
          blameConceptId: "gaussian-process",
        },
      },
      {
        id: "d",
        text: "Its predictions still depend on choices made by the modeller",
        correct: false,
        misconception: {
          id: "assumes-assumption-free",
          description:
            "This is true — the kernel encodes every smoothness assumption the model makes, and its hyperparameters matter enormously.",
          blameConceptId: "gaussian-process",
        },
      },
    ],
    difficulty: 0.6,
    discrimination: 1.6,
    expectedSeconds: 60,
    prereqClosure: ["gaussian-process", "kernel"],
    source: GPML,
    status: "live",
  },
  {
    id: "gp--apply-posterior-mean",
    conceptId: "gaussian-process",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A zero-mean GP has kernel k(x, x') = exp(−(x − x')²/2) and no observation noise. You observe " +
      "f(0) = 2. What is the posterior mean at x = 1? Give a decimal to three places.",
    answerKey: 1.213,
    tolerance: 0.01,
    difficulty: 1.1,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["gaussian-process", "multivariate-normal", "kernel", "covariance-matrix"],
    source: GPML,
    status: "live",
  },
  {
    id: "gp--apply-posterior-variance",
    conceptId: "gaussian-process",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Same setup: zero-mean GP, kernel k(x, x') = exp(−(x − x')²/2), noiseless observation f(0) = 2. " +
      "What is the posterior variance at x = 1? Give a decimal to three places.",
    answerKey: 0.632,
    tolerance: 0.01,
    difficulty: 1.35,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["gaussian-process", "multivariate-normal", "kernel", "covariance-matrix"],
    source: GPML,
    status: "live",
  },
  {
    id: "gp--explain-variance-independent-of-y",
    conceptId: "gaussian-process",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "In GP regression the posterior variance does not depend on the observed y values at all — only " +
      "on where you observed. Explain why, and give one application that exploits this.",
    rubric: {
      elements: [
        {
          id: "why",
          description:
            "Explains that the posterior covariance of a jointly Gaussian vector depends only on the covariance structure, and the kernel evaluates covariance from inputs alone — so the y values shift the mean and leave the spread untouched.",
          weight: 4,
          required: true,
        },
        {
          id: "behaviour",
          description:
            "Describes the resulting behaviour: uncertainty shrinks near observed inputs and reverts toward the prior far from them.",
          weight: 3,
          required: true,
        },
        {
          id: "application",
          description:
            "Names an application that uses it, most naturally Bayesian optimisation or active learning, where knowing where the model is ignorant is precisely the point and can be computed before measuring anything.",
          weight: 3,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.8,
    expectedSeconds: 230,
    prereqClosure: ["gaussian-process", "multivariate-normal", "covariance-matrix", "kernel"],
    source: GPML,
    status: "live",
  },
  {
    id: "gp--explain-infinite-dimensional-mvn",
    conceptId: "gaussian-process",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "A GP has no visible nodes or edges. Explain in what sense it is nevertheless a graphical model.",
    rubric: {
      elements: [
        {
          id: "infinite-mvn",
          description:
            "Frames it as the infinite-dimensional generalisation of a multivariate Normal graphical model, with the index set becoming a continuum.",
          weight: 4,
          required: true,
          misconception: {
            id: "gp-treated-as-unrelated",
            description:
              "Treats the GP as a technique filed here by convention, missing that it is the limit of a Gaussian graphical model.",
            blameConceptId: "gaussian-process",
          },
        },
        {
          id: "nodes-and-edges",
          description:
            "Identifies the correspondence: every possible input point is implicitly a node, and the kernel supplies the dependence between every pair of them.",
          weight: 4,
          required: true,
        },
        {
          id: "why-usable",
          description:
            "Notes the consistency property that makes this workable: any finite subset is itself Gaussian with the corresponding submatrix, so you never manipulate more than the finitely many points you care about.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.85,
    discrimination: 1.7,
    expectedSeconds: 230,
    prereqClosure: ["gaussian-process", "multivariate-normal", "covariance-matrix"],
    source: GPML,
    status: "live",
  },
  {
    id: "gp--explain-cubic-cost",
    conceptId: "gaussian-process",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "GPs have excellent statistical properties but are far less widely deployed than those " +
      "properties would suggest. Identify the main practical obstacle and where in the method it " +
      "arises.",
    rubric: {
      elements: [
        {
          id: "cubic",
          description:
            "Identifies the cost: the prediction equations require solving with (or inverting) an n-by-n kernel matrix, costing cubic time and quadratic memory in the number of training points.",
          weight: 4,
          required: true,
        },
        {
          id: "scale",
          description:
            "Gives a sense of scale: comfortable to a few thousand points, painful well beyond that.",
          weight: 2,
          required: true,
        },
        {
          id: "remedies",
          description:
            "Names an approach that mitigates it, such as sparse approximations built on a smaller set of inducing points, or structured kernels that exploit grid structure.",
          weight: 3,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.5,
    expectedSeconds: 200,
    prereqClosure: ["gaussian-process", "kernel", "invertible-matrices", "matrix-multiplication"],
    source: GPML,
    status: "live",
  },
  {
    id: "gp--transfer-why-bayesian",
    conceptId: "gaussian-process",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "In what precise sense is a Gaussian process a Bayesian method? Identify the prior, the update, " +
      "and the posterior, and say what is unusual about the object being updated.",
    rubric: {
      elements: [
        {
          id: "prior",
          description:
            "Identifies the GP itself, before data, as a prior — over functions rather than over a parameter vector.",
          weight: 3,
          required: true,
        },
        {
          id: "update",
          description:
            "States that observing data updates it by Bayes' rule, implemented as conditioning the joint Normal on the observed coordinates.",
          weight: 3,
          required: true,
        },
        {
          id: "posterior-is-a-gp",
          description:
            "Notes that the posterior is again a GP, with an updated mean and covariance — the family is closed under the update.",
          weight: 2,
          required: true,
        },
        {
          id: "what-is-unusual",
          description:
            "Identifies what is unusual: the object carrying the prior-to-posterior update is infinite-dimensional, a whole function, rather than a finite parameter vector.",
          weight: 3,
        },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.8,
    expectedSeconds: 250,
    prereqClosure: ["gaussian-process", "multivariate-normal", "kernel", "covariance-matrix"],
    source: GPML,
    status: "live",
  },
  // --- Reproducing Kernel Hilbert Space -------------------------------------
  {
    id: "rkhs--recall-describe",
    conceptId: "rkhs",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe informally what an RKHS is, and state the reproducing property.",
    rubric: {
      elements: [
        {
          id: "what-it-is",
          description:
            "States that it is the (possibly infinite-dimensional) space of functions implicitly defined by a valid kernel.",
          weight: 3,
          required: true,
        },
        {
          id: "reproducing-property",
          description:
            "States the property: the inner product of any function in the space with the kernel slice at a point equals the function's value at that point.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: -0.05,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["rkhs", "kernel", "mercers-theorem"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "rkhs--recall-what-it-founds",
    conceptId: "rkhs",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "RKHS theory supplies the rigorous foundation for:",
    choices: [
      {
        id: "a",
        text: "Why the kernel trick is valid — why replacing inner products with kernel evaluations corresponds to a genuine inner product in a well-defined space",
        correct: true,
      },
      {
        id: "b",
        text: "Computing p-values for hypothesis tests",
        correct: false,
        misconception: {
          id: "rkhs-conflated-with-testing",
          description:
            "Entirely unrelated. RKHS theory is functional analysis underpinning kernel methods, not inferential machinery.",
          blameConceptId: "rkhs",
        },
      },
      {
        id: "c",
        text: "Proving that gradient descent converges on non-convex objectives",
        correct: false,
        misconception: {
          id: "rkhs-conflated-with-optimisation-theory",
          description:
            "RKHS theory does bear on optimisation — the representer theorem makes an infinite-dimensional problem finite — but it says nothing about non-convex convergence.",
          blameConceptId: "rkhs",
        },
      },
      {
        id: "d",
        text: "Establishing that every symmetric matrix has real eigenvalues",
        correct: false,
        misconception: {
          id: "rkhs-conflated-with-spectral-theorem",
          description:
            "That is the spectral theorem, a finite-dimensional result about matrices rather than a construction of a function space.",
          blameConceptId: "rkhs",
        },
      },
    ],
    difficulty: 0.3,
    discrimination: 1.5,
    expectedSeconds: 50,
    prereqClosure: ["rkhs", "kernel"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "rkhs--apply-reproducing-usefulness",
    conceptId: "rkhs",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "The reproducing property equates evaluating a function at a point with an inner product. Why " +
      "is turning evaluation into an inner product useful rather than merely elegant?",
    rubric: {
      elements: [
        {
          id: "geometry-available",
          description:
            "States that it makes the whole apparatus of Hilbert-space geometry — projections, orthogonality, norms, Cauchy–Schwarz — available for reasoning about function values.",
          weight: 4,
          required: true,
        },
        {
          id: "norm-controls-values",
          description:
            "Gives a concrete consequence: by Cauchy–Schwarz, the difference between two functions at any point is bounded by their norm difference, so controlling the norm controls the function everywhere and norm convergence implies pointwise convergence.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["rkhs", "kernel", "dot-product"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "rkhs--apply-canonical-feature-map",
    conceptId: "rkhs",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Use the reproducing property to identify the canonical feature map — the function taking an " +
      "input point to its representative in the space — and verify it reproduces the kernel.",
    rubric: {
      elements: [
        {
          id: "identifies-map",
          description:
            "Identifies the feature map as sending a point to the kernel slice at that point: the kernel with one argument left open.",
          weight: 4,
          required: true,
        },
        {
          id: "verifies",
          description:
            "Verifies by substituting one kernel slice for the function in the reproducing property, obtaining the inner product of two slices equal to the kernel evaluated at the two points.",
          weight: 4,
          required: true,
        },
        {
          id: "connects",
          description:
            "Notes that this is exactly the factorisation the kernel trick assumes, now with the space and the map made explicit rather than merely asserted to exist.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.7,
    expectedSeconds: 200,
    prereqClosure: ["rkhs", "kernel", "mercers-theorem", "dot-product"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "rkhs--explain-point-evaluation",
    conceptId: "rkhs",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Point evaluation sounds like the most basic thing you could do to a function. Explain why it is " +
      "actually a strong condition to impose on a function space, and what it rules out.",
    rubric: {
      elements: [
        {
          id: "l2-problem",
          description:
            "Gives the contrast: in a space like L², functions are equivalence classes agreeing up to sets of measure zero, so 'the value at a point' is not even well defined.",
          weight: 4,
          required: true,
        },
        {
          id: "continuity",
          description:
            "States the actual condition: in an RKHS point evaluation is not just defined but continuous — a bounded linear functional.",
          weight: 3,
          required: true,
        },
        {
          id: "riesz",
          description:
            "Notes that boundedness is what lets the Riesz representation theorem produce an element representing evaluation as an inner product, which is where the kernel slice comes from.",
          weight: 3,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.7,
    expectedSeconds: 220,
    prereqClosure: ["rkhs", "kernel", "vector-spaces"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "rkhs--explain-mercer-vs-rkhs",
    conceptId: "rkhs",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Mercer's theorem already guarantees a kernel corresponds to an inner product in some feature " +
      "space. What does RKHS theory add that Mercer's theorem does not supply?",
    rubric: {
      elements: [
        {
          id: "existence",
          description:
            "Characterises Mercer's theorem as an existence result: it guarantees that SOME suitable inner-product space exists, without naming it.",
          weight: 4,
          required: true,
          misconception: {
            id: "mercer-and-rkhs-conflated",
            description:
              "Treats the two as the same result restated, missing the existence-versus-construction distinction that is the whole point of the question.",
            blameConceptId: "mercers-theorem",
          },
        },
        {
          id: "construction",
          description:
            "States that RKHS theory gives the explicit, canonical construction of that space, making precise what 'the feature space implied by a kernel' actually is.",
          weight: 4,
          required: true,
        },
        {
          id: "what-it-enables",
          description:
            "Notes what the construction then enables: a norm on the space, and with it the representer theorem and a meaning for regularisation.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.45,
    discrimination: 1.8,
    expectedSeconds: 210,
    prereqClosure: ["rkhs", "mercers-theorem", "kernel"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "rkhs--explain-representer-theorem",
    conceptId: "rkhs",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "State the representer theorem and sketch why it holds. Why is it what makes kernel methods " +
      "computable at all?",
    rubric: {
      elements: [
        {
          id: "statement",
          description:
            "States that the minimiser of a data-fit term plus a norm penalty, searched over the whole space, is always a finite linear combination of kernel slices at the training points.",
          weight: 3,
          required: true,
        },
        {
          id: "orthogonality-argument",
          description:
            "Sketches the argument: decompose any candidate into a component in the span of the training slices plus an orthogonal remainder; by the reproducing property the remainder leaves every training-point value unchanged while strictly increasing the norm, so the optimum has no such component.",
          weight: 4,
          required: true,
        },
        {
          id: "why-it-matters",
          description:
            "Draws the consequence: an optimisation over a possibly infinite-dimensional space collapses to solving for one coefficient per training point.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.8,
    expectedSeconds: 270,
    prereqClosure: ["rkhs", "kernel", "dot-product", "vector-spaces"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "rkhs--transfer-norm-as-penalty",
    conceptId: "rkhs",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Kernel ridge regression minimises a squared-error term plus a penalty on the RKHS norm of the " +
      "fitted function. Explain what that penalty is actually controlling, and why it is a principled " +
      "notion of complexity rather than an arbitrary one.",
    rubric: {
      elements: [
        {
          id: "norm-measures-roughness",
          description:
            "States that the RKHS norm measures roughness — smoother functions have smaller norm — so penalising it discourages wiggly fits and controls overfitting.",
          weight: 4,
          required: true,
        },
        {
          id: "derived-from-kernel",
          description:
            "Explains why it is principled: the notion of 'simple' is derived from the chosen kernel rather than asserted, so the penalty is consistent with the same assumptions the kernel already encodes.",
          weight: 4,
          required: true,
          misconception: {
            id: "penalty-seen-as-arbitrary",
            description:
              "Treats the norm penalty as a generic shrinkage device, missing that the kernel determines what counts as smooth.",
            blameConceptId: "rkhs",
          },
        },
        {
          id: "same-shape-as-ridge",
          description:
            "Notes that this is the same loss-plus-penalty shape as ordinary ridge regression, with the RKHS norm standing in for the coefficient norm — indeed ridge is the special case where the space is the linear functions.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.8,
    expectedSeconds: 250,
    prereqClosure: ["rkhs", "kernel", "mercers-theorem"],
    source: AUTHORED,
    status: "live",
  },
  // --- Wasserstein Distance -------------------------------------------------
  {
    id: "wasserstein--recall-describe",
    conceptId: "wasserstein-distance",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem:
      "Describe the Wasserstein distance, and name one structural way it differs from KL divergence.",
    rubric: {
      elements: [
        {
          id: "transport-cost",
          description:
            "States that it is the minimum cost of transforming one distribution into the other, cost being mass moved times the distance it moves.",
          weight: 4,
          required: true,
        },
        {
          id: "true-metric",
          description:
            "Names a structural difference: unlike KL divergence it is a true metric — symmetric and satisfying the triangle inequality.",
          weight: 3,
          required: true,
        },
        {
          id: "uses-geometry",
          description:
            "Notes that it depends on the geometry of the underlying space through the ground metric, whereas KL divergence has no notion of the space at all.",
          weight: 2,
        },
      ],
    },
    difficulty: -0.35,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["wasserstein-distance", "kl-divergence"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "wasserstein--recall-advantage",
    conceptId: "wasserstein-distance",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "A key advantage of Wasserstein distance over KL divergence is that:",
    choices: [
      {
        id: "a",
        text: "It stays finite and informative even when the two distributions have non-overlapping support",
        correct: true,
      },
      {
        id: "b",
        text: "It is mathematically identical to KL divergence but faster to compute",
        correct: false,
        misconception: {
          id: "wasserstein-conflated-with-kl",
          description:
            "Wrong on both counts — the two measure genuinely different things, and Wasserstein is generally the more expensive of the two.",
          blameConceptId: "wasserstein-distance",
        },
      },
      {
        id: "c",
        text: "It is always cheaper to compute than KL divergence",
        correct: false,
        misconception: {
          id: "cost-inverted",
          description:
            "The reverse: KL divergence is often available in closed form, while Wasserstein requires solving an optimisation over transport plans.",
          blameConceptId: "wasserstein-distance",
        },
      },
      {
        id: "d",
        text: "It requires no assumptions about the space the distributions live on",
        correct: false,
        misconception: {
          id: "ground-metric-forgotten",
          description:
            "It requires MORE: a ground metric on the space. That extra structure is exactly what buys the good behaviour on disjoint supports.",
          blameConceptId: "wasserstein-distance",
        },
      },
    ],
    difficulty: 0.05,
    discrimination: 1.6,
    expectedSeconds: 45,
    prereqClosure: ["wasserstein-distance", "kl-divergence"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "wasserstein--apply-point-masses",
    conceptId: "wasserstein-distance",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "P places all its probability at the point 0; Q places all of its at the point 3. What is the " +
      "1-Wasserstein distance between them? Give a decimal to three places.",
    answerKey: 3,
    tolerance: 0.01,
    difficulty: 0.45,
    discrimination: 1.4,
    expectedSeconds: 100,
    prereqClosure: ["wasserstein-distance"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "wasserstein--apply-discrete-transport",
    conceptId: "wasserstein-distance",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "P places probability 0.5 at the point 0 and 0.5 at the point 1. Q places all its probability at " +
      "the point 2. What is the 1-Wasserstein distance? Give a decimal to three places.",
    answerKey: 1.5,
    tolerance: 0.01,
    difficulty: 0.9,
    discrimination: 1.6,
    expectedSeconds: 170,
    prereqClosure: ["wasserstein-distance", "expectation"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "wasserstein--explain-kl-blowup",
    conceptId: "wasserstein-distance",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Explain from the definition of KL divergence why it becomes infinite when P puts mass where Q " +
      "puts none, and why Wasserstein does not.",
    rubric: {
      elements: [
        {
          id: "log-blowup",
          description:
            "Works from the definition — an expectation under P of the log of the ratio of P to Q — and identifies that where Q is zero and P is not, the ratio diverges and so does the log.",
          weight: 4,
          required: true,
          misconception: {
            id: "infinity-seen-as-numerical",
            description:
              "Treats the divergence as a numerical or implementation artefact rather than what the definition literally says.",
            blameConceptId: "kl-divergence",
          },
        },
        {
          id: "wasserstein-finite",
          description:
            "Explains that Wasserstein instead measures how far the mass must travel, which is finite regardless of overlap.",
          weight: 3,
          required: true,
        },
        {
          id: "not-exotic",
          description:
            "Notes that disjoint support is not an edge case: distributions supported on different low-dimensional manifolds inside a high-dimensional space essentially never overlap.",
          weight: 3,
        },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.7,
    expectedSeconds: 190,
    prereqClosure: ["wasserstein-distance", "kl-divergence", "expectation"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "wasserstein--explain-earth-mover",
    conceptId: "wasserstein-distance",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "State the 'earth mover's' intuition precisely enough that someone could compute with it — say " +
      "exactly what is being minimised and over what.",
    rubric: {
      elements: [
        {
          id: "the-picture",
          description:
            "Sets up the picture: one distribution as a pile of dirt shaped like its density, the other as a hole of the same total mass shaped like its density.",
          weight: 2,
          required: true,
        },
        {
          id: "work",
          description:
            "States the cost precisely as mass times distance moved, summed over all the mass — a quantity with the character of work.",
          weight: 4,
          required: true,
        },
        {
          id: "minimisation",
          description:
            "States what is minimised over: all valid transport plans, meaning all ways of moving the mass that remove exactly what P has everywhere and deliver exactly what Q needs everywhere.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.25,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["wasserstein-distance", "expectation"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "wasserstein--explain-metric-properties",
    conceptId: "wasserstein-distance",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "KL divergence is routinely called a 'distance'. Say which metric axioms it fails, and explain " +
      "why the failure is a signature of what KL is measuring rather than a defect to be patched.",
    rubric: {
      elements: [
        {
          id: "which-axioms",
          description:
            "Names the failures: symmetry and the triangle inequality. (It does satisfy non-negativity, and is zero exactly when the distributions agree.)",
          weight: 3,
          required: true,
        },
        {
          id: "why-asymmetric",
          description:
            "Explains the asymmetry as inherent to the quantity: it is an expected log-likelihood ratio taken under one of the two distributions, so which one you average under changes the answer.",
          weight: 4,
          required: true,
        },
        {
          id: "consequence",
          description:
            "Draws the practical consequence: metric intuitions do not transfer, so 'KL distance' is a misnomer and the direction must always be stated.",
          weight: 3,
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["wasserstein-distance", "kl-divergence", "expectation"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "wasserstein--transfer-wgan",
    conceptId: "wasserstein-distance",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Explain why Wasserstein distance made GAN training more stable. Be specific about the regime " +
      "where the older objectives failed and what goes wrong there.",
    rubric: {
      elements: [
        {
          id: "the-regime",
          description:
            "Identifies the regime: early in training the generator's output distribution and the data distribution live on different low-dimensional manifolds and share essentially no support.",
          weight: 3,
          required: true,
        },
        {
          id: "what-fails",
          description:
            "Explains the failure: KL-like and Jensen–Shannon objectives saturate or diverge there, so the gradient vanishes and the generator is told it is wrong without being told which way to move.",
          weight: 4,
          required: true,
          misconception: {
            id: "instability-blamed-on-architecture",
            description:
              "Attributes GAN instability to network architecture or hyperparameters rather than to the behaviour of the divergence being optimised.",
            blameConceptId: "wasserstein-distance",
          },
        },
        {
          id: "what-fixes-it",
          description:
            "States the fix: Wasserstein distance keeps varying smoothly with how far the mass must move even with no overlap, so a usable gradient survives — the two-point-mass case being the argument in miniature.",
          weight: 3,
          required: true,
        },
        {
          id: "honest-caveat",
          description:
            "Bonus: notes it is a stabilisation rather than a cure — the Lipschitz constraint on the critic is only approximately enforced, and the theory's guarantee assumes a near-optimal critic.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.75,
    discrimination: 1.9,
    expectedSeconds: 250,
    prereqClosure: ["wasserstein-distance", "kl-divergence"],
    source: MURPHY,
    status: "live",
  },
  // =========================================================================
  // Doubling sweep — additional items appended per concept, widening
  // cognitive-level and difficulty coverage beyond the original 8-per-concept
  // seed. See doubling-spec.md for the authoring rules this batch follows.
  // =========================================================================

  // --- Graphs (additional) ---------------------------------------------------
  {
    id: "graphs--recall-model-vs-flowchart",
    conceptId: "graphs",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What is the common name for a graph used to encode the dependence structure of a probability distribution?",
    choices: [
      { id: "a", text: "A graphical model", correct: true },
      {
        id: "b",
        text: "A flowchart",
        correct: false,
        misconception: {
          id: "graph-as-flowchart",
          description: "Confuses a static dependence structure with a diagram of procedural steps.",
          blameConceptId: "graphs",
        },
      },
      {
        id: "c",
        text: "A decision tree",
        correct: false,
        misconception: {
          id: "graph-as-decision-tree",
          description: "Confuses a graphical model with a supervised-learning predictor built from splits.",
          blameConceptId: "graphs",
        },
      },
      {
        id: "d",
        text: "A computation graph",
        correct: false,
        misconception: {
          id: "graph-as-computation-graph",
          description: "Confuses a probabilistic dependence structure with a graph of arithmetic operations for autodiff.",
          blameConceptId: "graphs",
        },
      },
    ],
    difficulty: -2.2,
    discrimination: 1.1,
    expectedSeconds: 20,
    prereqClosure: ["graphs"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "graphs--recall-edge-vs-node-roles",
    conceptId: "graphs",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "In one sentence each, say what a node is and what an edge is in a graphical model.",
    rubric: {
      elements: [
        { id: "node", description: "A node is a random variable.", weight: 2, required: true },
        { id: "edge", description: "An edge represents a direct dependence between the two variables it joins.", weight: 2, required: true },
      ],
    },
    difficulty: -1.9,
    discrimination: 1.1,
    expectedSeconds: 40,
    prereqClosure: ["graphs"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "graphs--apply-full-joint-five-binary",
    conceptId: "graphs",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem: "Five binary random variables, with no independence assumed at all. How many free parameters does the full joint distribution have?",
    answerKey: 31,
    tolerance: 0.001,
    difficulty: -0.05,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["graphs", "set-theory"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "graphs--apply-chain-twenty",
    conceptId: "graphs",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Twenty binary variables arranged in a chain, each depending directly only on the one before it. How many free parameters does the joint have?",
    answerKey: 39,
    tolerance: 0.001,
    difficulty: 1.6,
    discrimination: 1.5,
    expectedSeconds: 140,
    prereqClosure: ["graphs", "set-theory"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "graphs--explain-graph-not-unique",
    conceptId: "graphs",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Two different graphs can represent the same set of conditional independences. Explain why this means " +
      "'the graph' for a distribution is not always unique, and what is preserved across such graphs.",
    rubric: {
      elements: [
        {
          id: "multiple-graphs",
          description: "States that more than one graph can encode the same independence structure (Markov equivalence).",
          weight: 3,
          required: true,
        },
        {
          id: "independence-preserved",
          description: "States that the set of conditional independences implied is what stays the same across the equivalent graphs.",
          weight: 3,
          required: true,
        },
        {
          id: "caution",
          description: "Notes that edges present or their directions may differ even though the independence statements coincide.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["graphs"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "graphs--explain-parameter-savings-tradeoff",
    conceptId: "graphs",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Sparser graphs need fewer parameters to fit, but a graph that is too sparse fits the data poorly. " +
      "Explain this tradeoff and what determines the right amount of sparsity for a given problem.",
    rubric: {
      elements: [
        {
          id: "fewer-params",
          description: "States that sparser graphs need fewer parameters, which are cheaper to estimate from data.",
          weight: 3,
          required: true,
        },
        {
          id: "underfit-risk",
          description: "States that omitting real dependencies leaves the model unable to represent the true distribution well.",
          weight: 3,
          required: true,
        },
        {
          id: "domain-knowledge",
          description: "Notes the right sparsity reflects genuine independences in the domain, not a bare preference for simplicity.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["graphs"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "graphs--transfer-scaling-with-n",
    conceptId: "graphs",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "As the number of variables n grows, the full joint's parameter count grows as 2^n − 1, while a sparse " +
      "graph's can grow only linearly in n. Explain why this difference in growth RATE, not the raw count at " +
      "one particular n, is what makes graphical models necessary for large systems.",
    rubric: {
      elements: [
        {
          id: "exponential-vs-linear",
          description: "Identifies the qualitative difference in growth rate: exponential versus linear/polynomial in n.",
          weight: 4,
          required: true,
        },
        {
          id: "data-requirement",
          description: "States that more parameters require proportionally more data to estimate reliably, so an exponential count becomes infeasible to fit long before it becomes infeasible merely to store.",
          weight: 3,
          required: true,
        },
        {
          id: "why-sparsity-scales",
          description: "Notes that if each variable's number of direct dependencies stays bounded as n grows, the per-node cost stays bounded and the total stays linear.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.8,
    expectedSeconds: 220,
    prereqClosure: ["graphs", "set-theory"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "graphs--transfer-graph-does-not-imply-causality",
    conceptId: "graphs",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A graphical model licenses conditional-independence claims. Explain why it does not, by itself, license " +
      "causal claims, and what extra assumption would be needed to read edges causally.",
    rubric: {
      elements: [
        {
          id: "independence-only",
          description: "States that the graph as introduced encodes statistical (in)dependence, symmetric information, with nothing privileging a causal direction.",
          weight: 3,
          required: true,
        },
        {
          id: "extra-assumption",
          description: "States that a causal reading requires additional assumptions, such as no unmeasured confounding and a genuine mechanistic or temporal ordering, that the pure probabilistic model does not supply.",
          weight: 4,
          required: true,
        },
        {
          id: "example",
          description: "Gives an example where a correlation induced by a common unmeasured cause produces the same graph a genuine causal edge would.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.8,
    expectedSeconds: 230,
    prereqClosure: ["graphs"],
    source: AUTHORED,
    status: "live",
  },
  // --- Directed vs Undirected Graphs (additional) ----------------------------
  {
    id: "dvug--recall-mrf-vs-bn-names",
    conceptId: "directed-vs-undirected-graphs",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which pairing is correct: does a Bayesian network use directed or undirected edges, and a Markov random field?",
    choices: [
      { id: "a", text: "Bayesian network: directed; Markov random field: undirected", correct: true },
      {
        id: "b",
        text: "Bayesian network: undirected; Markov random field: directed",
        correct: false,
        misconception: {
          id: "bn-mrf-swapped",
          description: "Swaps the two standard names for the two edge types.",
          blameConceptId: "directed-vs-undirected-graphs",
        },
      },
      {
        id: "c",
        text: "Both use directed edges",
        correct: false,
        misconception: {
          id: "both-assumed-directed",
          description: "Misses that an MRF is defined by symmetric, undirected edges.",
          blameConceptId: "directed-vs-undirected-graphs",
        },
      },
      {
        id: "d",
        text: "Both use undirected edges",
        correct: false,
        misconception: {
          id: "both-assumed-undirected",
          description: "Misses that a Bayesian network is defined by directed, parent-to-child edges.",
          blameConceptId: "directed-vs-undirected-graphs",
        },
      },
    ],
    difficulty: -2.0,
    discrimination: 1.1,
    expectedSeconds: 20,
    prereqClosure: ["directed-vs-undirected-graphs"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "dvug--recall-clique-potential-term",
    conceptId: "directed-vs-undirected-graphs",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Name the object each undirected-graph factor is called, and name the object each directed-graph factor is called.",
    rubric: {
      elements: [
        { id: "undirected-term", description: "A clique potential (or compatibility function).", weight: 2, required: true },
        { id: "directed-term", description: "A conditional probability distribution.", weight: 2, required: true },
      ],
    },
    difficulty: -1.7,
    discrimination: 1.1,
    expectedSeconds: 40,
    prereqClosure: ["directed-vs-undirected-graphs"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "dvug--apply-three-chain-factorization",
    conceptId: "directed-vs-undirected-graphs",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A directed chain A → B → C. Write its factorization, then write the factorization for the same three " +
      "nodes joined in an undirected chain A–B–C.",
    rubric: {
      elements: [
        { id: "directed-form", description: "Gives p(A)·p(B|A)·p(C|B).", weight: 3, required: true },
        { id: "undirected-form", description: "Gives (1/Z)·psi(A,B)·psi(B,C).", weight: 3, required: true },
        {
          id: "z-needed",
          description: "Notes the undirected version needs a normalising constant Z while the directed one does not.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.05,
    discrimination: 1.4,
    expectedSeconds: 150,
    prereqClosure: ["directed-vs-undirected-graphs", "graphs"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "dvug--apply-count-mrf-parameters",
    conceptId: "directed-vs-undirected-graphs",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Three binary variables A–B–C joined in an undirected chain (edges A–B and B–C), each edge given by an " +
      "unconstrained table of 4 potential values. Counting the table entries across both edge potentials, how " +
      "many free parameters are there in total?",
    answerKey: 8,
    tolerance: 0.001,
    difficulty: 1.0,
    discrimination: 1.5,
    expectedSeconds: 130,
    prereqClosure: ["directed-vs-undirected-graphs", "graphs"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "dvug--explain-choosing-representation",
    conceptId: "directed-vs-undirected-graphs",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Given a genuinely symmetric, non-causal relationship among three variables with no natural generative " +
      "order, explain why forcing a directed representation is worse than using an undirected one, referring " +
      "to what the modeller would have to invent.",
    rubric: {
      elements: [
        {
          id: "arbitrary-order",
          description: "States the modeller must invent an arbitrary ordering or direction that the problem does not supply.",
          weight: 4,
          required: true,
        },
        {
          id: "artefact-risk",
          description: "States that this arbitrary choice can introduce spurious asymmetric structure not present in the phenomenon.",
          weight: 3,
          required: true,
        },
        { id: "undirected-natural", description: "Notes an undirected graph matches the symmetric structure directly.", weight: 2 },
      ],
    },
    difficulty: 0.75,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["directed-vs-undirected-graphs", "graphs"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "dvug--explain-moralization",
    conceptId: "directed-vs-undirected-graphs",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Converting a directed graph to an undirected one for inference sometimes requires adding edges between " +
      "a node's parents ('moralization') even when those parents had no edge in the original graph. Explain " +
      "why this step is necessary.",
    rubric: {
      elements: [
        {
          id: "joint-parent-factor",
          description:
            "Explains a node's conditional given several parents is a single factor over all of them jointly, and an undirected graph must place a factor over a fully connected (clique) set, so those parents must become mutually connected.",
          weight: 4,
          required: true,
        },
        {
          id: "otherwise-lost",
          description: "States that without the added edge the undirected graph could not represent that the parents interact jointly within one factor.",
          weight: 3,
          required: true,
        },
        { id: "name", description: "Optionally names moralization or the moral graph.", weight: 2 },
      ],
    },
    difficulty: 1.55,
    discrimination: 1.7,
    expectedSeconds: 190,
    prereqClosure: ["directed-vs-undirected-graphs", "graphs"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "dvug--transfer-chain-graphs",
    conceptId: "directed-vs-undirected-graphs",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A 'chain graph' mixes directed and undirected edges in one model. At a high level, explain what kind of " +
      "dependence structure this hybrid is meant to capture that neither a purely directed nor a purely " +
      "undirected graph captures cleanly.",
    rubric: {
      elements: [
        {
          id: "mixed-structure",
          description: "States some groups of variables are jointly and symmetrically dependent (undirected within group), while other dependence has a genuine direction between groups (directed between groups).",
          weight: 4,
          required: true,
        },
        {
          id: "why-neither-alone",
          description: "Explains a purely directed graph would force an arbitrary order within the symmetric group, while a purely undirected graph would erase the genuine directionality between groups.",
          weight: 3,
          required: true,
        },
        { id: "example", description: "Gives an example, e.g. equilibrium among prices within one period, followed by a directed effect on the next.", weight: 2 },
      ],
    },
    difficulty: 1.85,
    discrimination: 1.7,
    expectedSeconds: 220,
    prereqClosure: ["directed-vs-undirected-graphs", "graphs"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "dvug--transfer-representable-independences-differ",
    conceptId: "directed-vs-undirected-graphs",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Some conditional-independence structures representable by a directed graph cannot be represented exactly " +
      "by any undirected graph, and vice versa. Using the v-structure as your example, explain concretely why " +
      "undirected graphs cannot capture what a v-structure captures.",
    rubric: {
      elements: [
        {
          id: "undirected-single-rule",
          description: "States undirected graphs obey one uniform rule — a node is independent of the rest given its neighbours, with no exception — so conditioning on a neighbour can only remove dependence, never create it.",
          weight: 4,
          required: true,
        },
        {
          id: "v-structure-needs-exception",
          description: "States the v-structure requires the opposite behaviour for its collider — conditioning creates dependence — which the uniform undirected rule cannot express with any fixed neighbourhood structure.",
          weight: 4,
          required: true,
        },
        { id: "conclusion", description: "Concludes the two graph families have genuinely different expressive power, so translating between them is lossy in general.", weight: 2 },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.9,
    expectedSeconds: 240,
    prereqClosure: ["directed-vs-undirected-graphs", "graphs"],
    source: AUTHORED,
    status: "live",
  },
  // --- Conditional Independence and D-Separation (additional) ---------------
  {
    id: "dsep--recall-name-of-blocking-rule",
    conceptId: "conditional-independence-d-separation",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem:
      "The graphical rule that decides whether two variables are conditionally independent given a set Z, by " +
      "checking whether every path between them is blocked, is called:",
    choices: [
      { id: "a", text: "d-separation", correct: true },
      {
        id: "b",
        text: "Bayes' rule",
        correct: false,
        misconception: { id: "confuses-with-bayes-rule", description: "Confuses a graphical criterion with the rule for inverting a conditional probability.", blameConceptId: "conditional-independence-d-separation" },
      },
      {
        id: "c",
        text: "The law of total probability",
        correct: false,
        misconception: { id: "confuses-with-total-probability", description: "Confuses d-separation with the rule for computing a marginal from conditionals.", blameConceptId: "conditional-independence-d-separation" },
      },
      {
        id: "d",
        text: "Marginalization",
        correct: false,
        misconception: { id: "confuses-with-marginalization", description: "Confuses a graphical independence test with the operation of summing out a variable.", blameConceptId: "conditional-independence-d-separation" },
      },
    ],
    difficulty: -2.0,
    discrimination: 1.1,
    expectedSeconds: 20,
    prereqClosure: ["conditional-independence-d-separation"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "dsep--recall-name-three-structures",
    conceptId: "conditional-independence-d-separation",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Name the three basic three-node structures that d-separation analyses — the ones formed by two edges meeting at a middle node.",
    rubric: {
      elements: [
        { id: "chain", description: "Chain.", weight: 2, required: true },
        { id: "fork", description: "Fork.", weight: 2, required: true },
        { id: "collider", description: "Collider.", weight: 2, required: true },
      ],
    },
    difficulty: -1.6,
    discrimination: 1.1,
    expectedSeconds: 40,
    prereqClosure: ["conditional-independence-d-separation"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "dsep--apply-two-cause-common-effect",
    conceptId: "conditional-independence-d-separation",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Two independent risk factors A and B, with P(A) = 0.02 and P(B) = 0.05, each independently can trigger " +
      "an event E; E occurs iff at least one of A, B occurs. Given only that E occurred, what is P(A)? Give a " +
      "decimal to three places.",
    answerKey: 0.29,
    tolerance: 0.01,
    difficulty: -0.1,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["conditional-independence-d-separation", "conditional-probability", "probability-function"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "dsep--apply-identify-structure",
    conceptId: "conditional-independence-d-separation",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "In the graph Rain → WetGrass ← Sprinkler, classify the structure at WetGrass, and say whether Rain and " +
      "Sprinkler are dependent when WetGrass is unobserved.",
    rubric: {
      elements: [
        { id: "collider", description: "Identifies WetGrass as a collider.", weight: 3, required: true },
        { id: "independent-unobserved", description: "States Rain and Sprinkler are marginally independent, since with WetGrass unobserved the path is blocked.", weight: 3, required: true },
      ],
    },
    difficulty: 0.55,
    discrimination: 1.4,
    expectedSeconds: 120,
    prereqClosure: ["conditional-independence-d-separation", "conditional-probability"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "dsep--explain-why-chains-and-forks-alike",
    conceptId: "conditional-independence-d-separation",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Chains (A → C → B) and forks (A ← C → B) behave identically under conditioning on C, despite looking " +
      "structurally different. Explain why, in terms of what conditioning on C does to the flow of dependence " +
      "in each.",
    rubric: {
      elements: [
        { id: "same-blocking", description: "States both are blocked by conditioning on the middle node C.", weight: 3, required: true },
        {
          id: "mechanism",
          description: "Explains knowing C screens off the association that ran through it, whichever direction the arrows point, since C is the sole conduit between A and B in both cases.",
          weight: 3,
          required: true,
        },
        { id: "contrast-with-collider", description: "Contrasts this with a collider, where the conduit only opens once you condition.", weight: 2 },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.6,
    expectedSeconds: 170,
    prereqClosure: ["conditional-independence-d-separation", "conditional-probability"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "dsep--explain-descendant-rule",
    conceptId: "conditional-independence-d-separation",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Why does conditioning on a descendant of a collider (rather than the collider itself) also open the " +
      "path, even though the descendant is further away in the graph?",
    rubric: {
      elements: [
        {
          id: "partial-information",
          description: "Explains a descendant carries partial information about its collider ancestor, so conditioning on it partially conditions on the collider too.",
          weight: 4,
          required: true,
        },
        { id: "degree-matters", description: "Notes the effect can be weaker the further downstream, but is present in principle whenever the descendant is informative about the collider.", weight: 3, required: true },
        { id: "contrast", description: "Contrasts with chain/fork blocking, which a descendant does not restore.", weight: 2 },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.7,
    expectedSeconds: 200,
    prereqClosure: ["conditional-independence-d-separation", "conditional-probability"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "dsep--transfer-instrumental-variable",
    conceptId: "conditional-independence-d-separation",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "An instrumental variable Z affects treatment T, which affects outcome Y, and Z has no path to Y except " +
      "through T. Using d-separation reasoning, explain why Z's being d-separated from unmeasured confounders " +
      "of T and Y is the graphical property that makes it useful for causal identification.",
    rubric: {
      elements: [
        {
          id: "graph-structure",
          description: "Describes the graph: Z → T → Y with an unmeasured confounder U affecting both T and Y, and no edge from Z to U or Z to Y other than through T.",
          weight: 3,
          required: true,
        },
        {
          id: "no-backdoor",
          description: "Explains that because Z is d-separated from U (and from Y except via T), Z carries no confounded signal, so the association between Z and Y running only through T can be exploited despite U being unobserved.",
          weight: 4,
          required: true,
        },
        { id: "why-useful", description: "Notes this is what allows estimating the causal effect of T on Y without observing U.", weight: 2 },
      ],
    },
    difficulty: 2.05,
    discrimination: 1.9,
    expectedSeconds: 250,
    prereqClosure: ["conditional-independence-d-separation", "conditional-probability", "independence-set-theory"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "dsep--transfer-markov-blanket-link",
    conceptId: "conditional-independence-d-separation",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Show how d-separation implies that a node's Markov blanket in a directed graph consists of its parents, " +
      "its children, and its children's other parents (co-parents) — not merely its parents and children.",
    rubric: {
      elements: [
        { id: "parents-children-block", description: "Notes parents and children alone would seem to block ordinary chains and forks through the node.", weight: 3, required: true },
        {
          id: "coparent-needed",
          description: "Explains a child creates a collider structure at itself with its other parents, so conditioning on the child alone opens a path to its co-parents; including the co-parents in the conditioning set re-blocks that opened path.",
          weight: 4,
          required: true,
        },
        { id: "conclusion", description: "Concludes the full blanket — parents, children, co-parents — is exactly the minimal set that d-separates the node from everything else.", weight: 2 },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.9,
    expectedSeconds: 250,
    prereqClosure: ["conditional-independence-d-separation", "conditional-probability"],
    source: AUTHORED,
    status: "live",
  },
  // --- Markov Random Fields (additional) -------------------------------------
  {
    id: "mrf--recall-name-of-object",
    conceptId: "markov-random-fields",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What is the object attached to each clique in a Markov random field's factorization called?",
    choices: [
      { id: "a", text: "A potential function (clique potential)", correct: true },
      {
        id: "b",
        text: "A conditional probability",
        correct: false,
        misconception: { id: "potential-called-conditional", description: "Confuses an undirected potential with a directed model's conditional distribution.", blameConceptId: "markov-random-fields" },
      },
      {
        id: "c",
        text: "A prior",
        correct: false,
        misconception: { id: "potential-called-prior", description: "Confuses a local compatibility function with a Bayesian prior over parameters.", blameConceptId: "markov-random-fields" },
      },
      {
        id: "d",
        text: "A likelihood",
        correct: false,
        misconception: { id: "potential-called-likelihood", description: "Confuses a clique potential with the model's overall likelihood of the data.", blameConceptId: "markov-random-fields" },
      },
    ],
    difficulty: -1.9,
    discrimination: 1.1,
    expectedSeconds: 20,
    prereqClosure: ["markov-random-fields"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mrf--recall-clique-definition",
    conceptId: "markov-random-fields",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Define a clique in a graph, and say why cliques are the right domain for an MRF's factors.",
    rubric: {
      elements: [
        { id: "clique-def", description: "A fully-connected subset of nodes.", weight: 2, required: true },
        { id: "factor-domain", description: "Hammersley–Clifford requires factors over sets whose members are all mutually connected, i.e. cliques.", weight: 3, required: true },
      ],
    },
    difficulty: -1.5,
    discrimination: 1.2,
    expectedSeconds: 50,
    prereqClosure: ["markov-random-fields", "graphs"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mrf--apply-three-node-normalisation",
    conceptId: "markov-random-fields",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Three binary spins on a chain X–Y–Z, each in {−1, +1}, with each edge potential psi(a, b) = " +
      "exp(0.5·a·b). Compute the partition function Z, summing the unnormalised weight over all 8 " +
      "configurations. Give a decimal to three places.",
    answerKey: 10.172,
    tolerance: 0.01,
    difficulty: 0.5,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["markov-random-fields", "probability-function"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mrf--apply-identify-cliques",
    conceptId: "markov-random-fields",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A graph has edges A–B, B–C, and A–C (a triangle), plus a separate edge C–D. List the maximal cliques, " +
      "and say how many factors the MRF's factorization therefore has.",
    rubric: {
      elements: [
        { id: "triangle-clique", description: "Identifies {A, B, C} as one maximal clique, since all three edges are present.", weight: 3, required: true },
        { id: "cd-clique", description: "Identifies {C, D} as the other maximal clique.", weight: 2, required: true },
        { id: "count", description: "Two factors total, not one per edge.", weight: 2, required: true },
      ],
    },
    difficulty: 0.85,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["markov-random-fields", "graphs"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mrf--explain-conditional-vs-joint-blanket",
    conceptId: "markov-random-fields",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "For a node in an MRF, its Markov blanket is exactly its neighbours — simpler than the directed case " +
      "(parents, children, co-parents). Explain why the undirected case does not need the extra co-parent-style " +
      "correction.",
    rubric: {
      elements: [
        {
          id: "symmetric-rule",
          description: "Explains conditioning on a neighbour in an undirected graph can only block, never open, a path — there is no collider-style exception — so no extra nodes counteract an opened path.",
          weight: 4,
          required: true,
        },
        { id: "contrast", description: "Contrasts explicitly with the directed case, where conditioning on a child can open a path to its co-parents.", weight: 3, required: true },
      ],
    },
    difficulty: 1.05,
    discrimination: 1.6,
    expectedSeconds: 170,
    prereqClosure: ["markov-random-fields", "conditional-independence-d-separation"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mrf--explain-log-linear-form",
    conceptId: "markov-random-fields",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "MRF potentials are often written as psi_c(x_c) = exp(w_c · f_c(x_c)) — a 'log-linear' form. Explain what " +
      "this buys over an arbitrary non-negative table of values.",
    rubric: {
      elements: [
        { id: "guarantees-positivity", description: "The exponential guarantees positivity automatically, with no constraint needed on the weights w_c.", weight: 3, required: true },
        {
          id: "easy-gradients",
          description: "The log of the joint becomes linear in the weights up to the log partition function, making maximum-likelihood training tractable by gradient methods (a clean observed-minus-expected-feature gradient).",
          weight: 4,
          required: true,
        },
        { id: "generalizes", description: "Notes this is the exponential-family form applied to structured factors.", weight: 2 },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.7,
    expectedSeconds: 200,
    prereqClosure: ["markov-random-fields", "probability-function"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mrf--transfer-conditional-random-fields",
    conceptId: "markov-random-fields",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A conditional random field (CRF) models p(Y|X) with an MRF structure over Y only, with X entering as " +
      "fixed evidence in the potentials. Explain what problem this solves relative to modelling the full joint " +
      "p(X, Y) as one big MRF, and what is given up.",
    rubric: {
      elements: [
        {
          id: "no-model-of-x",
          description: "Explains the CRF avoids having to model the (often high-dimensional, hard to characterise) distribution of X itself, since only conditional dependence on Y given X is needed for the prediction task.",
          weight: 4,
          required: true,
        },
        { id: "discriminative-vs-generative", description: "Frames this as the discriminative versus generative distinction: a CRF spends its capacity entirely on getting p(Y|X) right.", weight: 3, required: true },
        { id: "giveup", description: "Notes it cannot generate new X, or answer queries about the marginal distribution of X, the way a joint model could.", weight: 2 },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.8,
    expectedSeconds: 220,
    prereqClosure: ["markov-random-fields", "conditional-probability"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mrf--transfer-ising-phase-transition",
    conceptId: "markov-random-fields",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "The Ising model (a pairwise binary MRF) exhibits a phase transition as its coupling strength crosses a " +
      "critical value: correlations that were short-range abruptly become long-range. Explain, at the level of " +
      "the graphical model, why increasing pairwise coupling strength alone — with no change to the graph — can " +
      "qualitatively change how information propagates across the whole grid.",
    rubric: {
      elements: [
        {
          id: "local-vs-global",
          description: "Explains that although each factor is still local (pairwise), the cumulative effect of many local couplings compounding across a large connected graph can produce global, long-range correlated behaviour once coupling exceeds a threshold.",
          weight: 4,
          required: true,
        },
        { id: "why-not-obvious", description: "Notes this is why exact pairwise correlations require solving the whole model rather than reading them off single edges.", weight: 3, required: true },
        { id: "real-world-analogue", description: "Offers an example, e.g. ferromagnetism, or consensus emergence in an opinion-dynamics model on a similar structure.", weight: 2 },
      ],
    },
    difficulty: 2.35,
    discrimination: 1.9,
    expectedSeconds: 250,
    prereqClosure: ["markov-random-fields", "graphs"],
    source: AUTHORED,
    status: "live",
  },
  // --- Markov Chains (additional) ---------------------------------------------
  {
    id: "markov-chains--recall-name-of-property",
    conceptId: "markov-chains",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What is the property called that says the future depends on the past only through the present state?",
    choices: [
      { id: "a", text: "The Markov property", correct: true },
      {
        id: "b",
        text: "Stationarity",
        correct: false,
        misconception: { id: "confuses-markov-with-stationarity", description: "Confuses memorylessness with the chain having settled to an unchanging distribution.", blameConceptId: "markov-chains" },
      },
      {
        id: "c",
        text: "Ergodicity",
        correct: false,
        misconception: { id: "confuses-markov-with-ergodicity", description: "Confuses memorylessness with the long-run mixing/uniqueness property.", blameConceptId: "markov-chains" },
      },
      {
        id: "d",
        text: "Independence",
        correct: false,
        misconception: { id: "confuses-markov-with-independence", description: "The Markov property allows dependence on the present state; it only rules out dependence on more distant history.", blameConceptId: "markov-chains" },
      },
    ],
    difficulty: -1.8,
    discrimination: 1.1,
    expectedSeconds: 20,
    prereqClosure: ["markov-chains"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "markov-chains--recall-transition-matrix",
    conceptId: "markov-chains",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "What is a transition matrix, and what must each of its rows satisfy?",
    rubric: {
      elements: [
        { id: "entries", description: "Entry (i, j) is P(state j at the next step | state i now).", weight: 2, required: true },
        { id: "rows-sum-to-one", description: "Each row sums to 1, since it is a distribution over next states given the current one.", weight: 3, required: true },
      ],
    },
    difficulty: -1.5,
    discrimination: 1.2,
    expectedSeconds: 45,
    prereqClosure: ["markov-chains", "conditional-probability"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "markov-chains--apply-three-step",
    conceptId: "markov-chains",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Same weather chain: from Sunny, tomorrow is Sunny with probability 0.8; from Rainy, tomorrow is Sunny " +
      "with probability 0.4. Today is Rainy. What is the probability that in three days it is Sunny? Give a " +
      "decimal to three places.",
    answerKey: 0.624,
    tolerance: 0.01,
    difficulty: 0.45,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["markov-chains", "conditional-probability", "probability-function"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "markov-chains--apply-balance-equation-setup",
    conceptId: "markov-chains",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Write the balance equation a stationary distribution pi must satisfy for the weather chain (Sunny→Sunny " +
      "0.8, Rainy→Sunny 0.4), and say what makes it a linear system rather than requiring simulation.",
    rubric: {
      elements: [
        { id: "equation", description: "Gives pi(S) = pi(S)·0.8 + pi(R)·0.4, with pi(S) + pi(R) = 1.", weight: 3, required: true },
        { id: "linear", description: "Explains stationarity is defined by a fixed set of linear equations (pi·P = pi plus normalization), solvable by linear algebra without ever running the chain forward.", weight: 3, required: true },
      ],
    },
    difficulty: 0.75,
    discrimination: 1.4,
    expectedSeconds: 150,
    prereqClosure: ["markov-chains", "conditional-probability"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "markov-chains--explain-memorylessness-vs-determinism",
    conceptId: "markov-chains",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "The Markov property is sometimes mistaken for saying the process is deterministic given the current " +
      "state. Explain the difference between 'memoryless' and 'deterministic', and why a Markov chain can be " +
      "genuinely random at every step.",
    rubric: {
      elements: [
        {
          id: "distinguishes",
          description: "Explains memoryless means the DISTRIBUTION of the next state depends only on the current state, not that the next state is a fixed function of it.",
          weight: 4,
          required: true,
          misconception: {
            id: "markov-as-deterministic",
            description: "Reads the Markov property as removing randomness rather than removing dependence on history.",
            blameConceptId: "markov-chains",
          },
        },
        { id: "still-random", description: "States transition probabilities typically put positive probability on several next states, so the outcome remains genuinely random.", weight: 3, required: true },
        { id: "misconception-source", description: "Notes the confusion likely comes from deterministic dynamical systems, a Markov chain's degenerate special case.", weight: 2 },
      ],
    },
    difficulty: 1.15,
    discrimination: 1.6,
    expectedSeconds: 170,
    prereqClosure: ["markov-chains", "conditional-probability"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "markov-chains--explain-detailed-balance-sufficiency",
    conceptId: "markov-chains",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Detailed balance (pi(i)·P(i→j) = pi(j)·P(j→i) for every pair) is a sufficient but not necessary " +
      "condition for pi to be stationary. Explain why it implies stationarity, and give an intuition for why it " +
      "is stronger than necessary.",
    rubric: {
      elements: [
        { id: "implies", description: "Explains summing the detailed balance equation over i recovers the ordinary stationarity balance equation, so detailed balance implies stationarity.", weight: 4, required: true },
        {
          id: "stronger",
          description: "Notes detailed balance requires the flow between every individual pair of states to balance, while stationarity only requires the total flow into and out of each state to balance in aggregate — a chain with net circulating flow can still be stationary.",
          weight: 3,
          required: true,
        },
        { id: "example", description: "Optionally names a chain with a cyclic, non-reversible structure as such an example.", weight: 2 },
      ],
    },
    difficulty: 1.8,
    discrimination: 1.7,
    expectedSeconds: 200,
    prereqClosure: ["markov-chains", "conditional-probability"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "markov-chains--transfer-pagerank",
    conceptId: "markov-chains",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Explain how PageRank can be understood as finding the stationary distribution of a Markov chain, being " +
      "specific about what the states and transition probabilities represent.",
    rubric: {
      elements: [
        { id: "states-are-pages", description: "States: states are web pages; transitions follow a random outgoing link (with a damping or random-jump term).", weight: 3, required: true },
        {
          id: "stationary-as-importance",
          description: "Explains the stationary probability of a page is interpreted as its long-run importance, since pages linked to by many high-rank pages accumulate more stationary mass.",
          weight: 4,
          required: true,
        },
        { id: "why-it-works", description: "Notes this only requires the chain to be irreducible and aperiodic, which the damping factor is added to guarantee.", weight: 2 },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.8,
    expectedSeconds: 220,
    prereqClosure: ["markov-chains", "conditional-probability"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "markov-chains--transfer-mixing-time",
    conceptId: "markov-chains",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Two chains share the same stationary distribution but one 'mixes' much faster than the other. Explain " +
      "what mixing time measures, why two chains with identical stationary distributions can differ in it, and " +
      "one practical consequence for someone using MCMC.",
    rubric: {
      elements: [
        { id: "definition", description: "Mixing time measures how long it takes the chain's distribution, from a given start, to get close to the stationary distribution.", weight: 3, required: true },
        {
          id: "depends-on-transitions",
          description: "Explains mixing time depends on the transition structure — how quickly probability mass can move between distant states — not just on the destination distribution; two chains can share a stationary distribution while one has much weaker connectivity.",
          weight: 4,
          required: true,
        },
        { id: "consequence", description: "Draws the MCMC consequence: a slow-mixing chain needs a much longer burn-in and more samples between draws for near-independent samples, even though both are eventually valid samplers.", weight: 3, required: true },
      ],
    },
    difficulty: 2.4,
    discrimination: 1.8,
    expectedSeconds: 240,
    prereqClosure: ["markov-chains", "conditional-probability"],
    source: AUTHORED,
    status: "live",
  },
  // --- Hidden Markov Models (additional) --------------------------------------
  {
    id: "hmm--recall-name-forward-algorithm",
    conceptId: "hmm",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem:
      "The algorithm that efficiently computes P(observation sequence) by summing over all hidden state paths " +
      "using dynamic programming is called:",
    choices: [
      { id: "a", text: "The forward algorithm", correct: true },
      {
        id: "b",
        text: "The Viterbi algorithm",
        correct: false,
        misconception: { id: "confuses-forward-with-viterbi", description: "Viterbi finds the single most likely state sequence (a max), while the forward algorithm sums over all sequences.", blameConceptId: "hmm" },
      },
      {
        id: "c",
        text: "Baum–Welch",
        correct: false,
        misconception: { id: "confuses-forward-with-baumwelch", description: "Baum–Welch is the parameter-learning procedure, not the evaluation computation.", blameConceptId: "hmm" },
      },
      {
        id: "d",
        text: "Gradient descent",
        correct: false,
        misconception: { id: "confuses-forward-with-gradient-descent", description: "The evaluation problem has an exact dynamic-programming solution; it needs no iterative optimisation.", blameConceptId: "hmm" },
      },
    ],
    difficulty: -1.8,
    discrimination: 1.1,
    expectedSeconds: 20,
    prereqClosure: ["hmm"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "hmm--recall-three-problems",
    conceptId: "hmm",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem:
      "Name the three canonical problems associated with HMMs — evaluation, decoding, and learning — and the " +
      "algorithm usually used for each.",
    rubric: {
      elements: [
        { id: "evaluation", description: "Evaluation: the forward algorithm.", weight: 2, required: true },
        { id: "decoding", description: "Decoding: the Viterbi algorithm.", weight: 2, required: true },
        { id: "learning", description: "Learning: Baum–Welch.", weight: 2, required: true },
      ],
    },
    difficulty: -1.4,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["hmm", "markov-chains"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "hmm--apply-two-step-posterior",
    conceptId: "hmm",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Mood is Happy or Sad, equally likely on day 1. P(Walk | Happy) = 0.6, P(Walk | Sad) = 0.1. Transitions: " +
      "from Happy, stays Happy with probability 0.7; from Sad, stays Sad with probability 0.6. You observe a " +
      "walk on day 1 only (no observation on day 2). What is P(Happy on day 2)? Give a decimal to three places.",
    answerKey: 0.657,
    tolerance: 0.01,
    difficulty: 0.35,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["hmm", "conditional-probability", "joint-distribution", "markov-chains"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "hmm--apply-forward-recursion-setup",
    conceptId: "hmm",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Write the recursive step of the forward algorithm: given alpha_t(i) for every state i at time t, express " +
      "alpha_{t+1}(j) in terms of it.",
    rubric: {
      elements: [
        {
          id: "recursion",
          description: "Gives alpha_{t+1}(j) = [sum over i of alpha_t(i)·transition(i→j)] · emission(observation_{t+1} | j).",
          weight: 4,
          required: true,
        },
        { id: "explains-terms", description: "Explains the bracket sums over all ways to have reached j through any prior state, and the emission term multiplies in the new evidence.", weight: 3, required: true },
      ],
    },
    difficulty: 0.95,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["hmm", "markov-chains", "conditional-probability"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "hmm--explain-why-not-brute-force-forward",
    conceptId: "hmm",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why computing P(observations) by summing the joint probability over every possible hidden state " +
      "sequence directly is infeasible, and how the forward algorithm avoids that cost.",
    rubric: {
      elements: [
        { id: "exponential-paths", description: "States with N states over T steps there are N^T sequences, exponential in T.", weight: 4, required: true },
        {
          id: "dp-reuse",
          description: "Explains the forward algorithm reuses partial sums (alpha values) computed once per state per time step, collapsing exponentially many shared-prefix paths into O(N^2·T) work via the Markov property.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.35,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["hmm", "markov-chains"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "hmm--explain-viterbi-vs-forward-difference",
    conceptId: "hmm",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "The forward algorithm and Viterbi have almost identical recursions, except sum replaces max. Explain " +
      "precisely what each is computing and why that single operator swap changes the answer's meaning so much.",
    rubric: {
      elements: [
        { id: "forward-sums", description: "Forward sums over all paths to get the total probability of the observations (a marginal).", weight: 3, required: true },
        { id: "viterbi-maxes", description: "Viterbi takes the max over paths to find the single most probable path (and its probability).", weight: 3, required: true },
        {
          id: "why-different",
          description: "Explains summing aggregates evidence across all explanations while maxing picks out one, so forward answers 'how likely is this data overall' and Viterbi answers 'what is the most likely explanation' — a class of many somewhat-likely paths can outweigh one single most-likely path.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.8,
    expectedSeconds: 210,
    prereqClosure: ["hmm", "markov-chains"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "hmm--transfer-baum-welch-alternation",
    conceptId: "hmm",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "HMM parameter learning alternates between inferring, for the current parameters, a distribution over " +
      "which hidden state sequence generated the data, and then re-estimating the transition and emission " +
      "probabilities as if those inferred quantities were observed counts. Explain why this alternation, rather " +
      "than direct maximization, is necessary, and what in principle guarantees each round does not make the " +
      "fit worse.",
    rubric: {
      elements: [
        {
          id: "why-necessary",
          description: "Explains the state sequence is never observed, so maximizing the likelihood directly requires marginalizing over an exponential number of hidden paths at every step, making direct optimization intractable in closed form.",
          weight: 4,
          required: true,
        },
        {
          id: "guarantee",
          description: "Explains each round replaces an intractable direct maximization with a tractable surrogate built from the current best guess about the hidden sequence, and because the surrogate touches the true likelihood at the current parameters and is then improved, the true likelihood cannot decrease.",
          weight: 4,
          required: true,
        },
        { id: "name", description: "Optionally names this the Baum–Welch algorithm.", weight: 1 },
      ],
    },
    difficulty: 2.15,
    discrimination: 1.8,
    expectedSeconds: 230,
    prereqClosure: ["hmm", "markov-chains"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "hmm--transfer-semi-markov-extension",
    conceptId: "hmm",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A standard HMM implicitly assumes state durations are geometrically distributed. Explain where that " +
      "assumption is hiding in the model, and why a hidden semi-Markov model relaxes it.",
    rubric: {
      elements: [
        {
          id: "where-hiding",
          description: "Explains the transition matrix gives a constant self-transition probability at every step regardless of how long the chain has already stayed in the state, and that memoryless-per-step behaviour is exactly what produces a geometric duration distribution.",
          weight: 4,
          required: true,
        },
        {
          id: "relaxation",
          description: "Explains a hidden semi-Markov model explicitly models the duration distribution for each state (allowing any shape, not just geometric), at the cost of extra bookkeeping since the pure Markov transition structure no longer suffices.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.4,
    discrimination: 1.9,
    expectedSeconds: 250,
    prereqClosure: ["hmm", "markov-chains"],
    source: AUTHORED,
    status: "live",
  },
  // --- Mixture Models and Latent Variables (additional) -----------------------
  {
    id: "mixtures--recall-name-of-weights",
    conceptId: "mixture-models-and-latent-variables",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In a K-component mixture, the mixing weights pi_1, ..., pi_K must satisfy:",
    choices: [
      { id: "a", text: "They are non-negative and sum to 1", correct: true },
      {
        id: "b",
        text: "They must all be equal",
        correct: false,
        misconception: { id: "weights-assumed-equal", description: "The weights are estimated; nothing forces components to be equally common.", blameConceptId: "mixture-models-and-latent-variables" },
      },
      {
        id: "c",
        text: "They must sum to K",
        correct: false,
        misconception: { id: "weights-sum-wrong", description: "Confuses a normalized probability distribution over components with an unnormalized count.", blameConceptId: "mixture-models-and-latent-variables" },
      },
      {
        id: "d",
        text: "They can be negative as long as the resulting density stays positive",
        correct: false,
        misconception: { id: "weights-assumed-signed", description: "Mixing weights are themselves a probability distribution over Z, so each must be non-negative on its own.", blameConceptId: "mixture-models-and-latent-variables" },
      },
    ],
    difficulty: -1.8,
    discrimination: 1.1,
    expectedSeconds: 20,
    prereqClosure: ["mixture-models-and-latent-variables"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mixtures--recall-generative-story",
    conceptId: "mixture-models-and-latent-variables",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe the two-step generative story a mixture model tells for producing one observation.",
    rubric: {
      elements: [
        { id: "step1", description: "First draw a component label Z from the categorical mixing distribution.", weight: 2, required: true },
        { id: "step2", description: "Then draw the observation X from the component distribution indexed by Z.", weight: 3, required: true },
      ],
    },
    difficulty: -1.5,
    discrimination: 1.2,
    expectedSeconds: 45,
    prereqClosure: ["mixture-models-and-latent-variables"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mixtures--apply-three-component-marginal",
    conceptId: "mixture-models-and-latent-variables",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A box has coins of three types in proportions 0.2, 0.3, 0.5, with heads probabilities 0.1, 0.5, 0.9 " +
      "respectively. Draw a coin at random and flip it once. What is P(heads)? Give a decimal to three places.",
    answerKey: 0.62,
    tolerance: 0.005,
    difficulty: 0.05,
    discrimination: 1.4,
    expectedSeconds: 100,
    prereqClosure: ["mixture-models-and-latent-variables", "marginal-distribution", "joint-distribution"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mixtures--apply-three-component-responsibility",
    conceptId: "mixture-models-and-latent-variables",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Same box (proportions 0.2, 0.3, 0.5; heads probabilities 0.1, 0.5, 0.9). Given heads was observed, what " +
      "is the probability the coin was type 1? Give a decimal to three places.",
    answerKey: 0.032,
    tolerance: 0.005,
    difficulty: 0.85,
    discrimination: 1.6,
    expectedSeconds: 160,
    prereqClosure: ["mixture-models-and-latent-variables", "joint-distribution", "marginal-distribution"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mixtures--explain-identifiability-label-switching",
    conceptId: "mixture-models-and-latent-variables",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Fitting a mixture by maximum likelihood gives parameters only up to a relabelling of the components " +
      "('label switching'). Explain why this happens and what it does and does not mean for the fit's quality.",
    rubric: {
      elements: [
        {
          id: "why",
          description: "Explains the likelihood is invariant to permuting the K component labels together with their parameters, since the mixture density (a sum) does not care about the order of its terms.",
          weight: 4,
          required: true,
        },
        { id: "not-a-flaw", description: "States this is a genuine symmetry of the model, not a defect of the fitting procedure.", weight: 3, required: true },
        { id: "consequence", description: "Notes that comparing components across independent fits (or across MCMC samples) requires resolving the labelling first.", weight: 2 },
      ],
    },
    difficulty: 1.2,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["mixture-models-and-latent-variables"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mixtures--explain-choosing-k",
    conceptId: "mixture-models-and-latent-variables",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why maximizing likelihood alone cannot be used to choose the number of components K, and name " +
      "one method that can.",
    rubric: {
      elements: [
        {
          id: "monotone-in-k",
          description: "Explains a K-component mixture nests a K+1-component one (by duplicating or zero-weighting a component), so adding components can only weakly increase the maximized likelihood, always favouring more components up to overfitting.",
          weight: 4,
          required: true,
        },
        { id: "remedy", description: "Names a penalized or held-out criterion such as BIC, AIC, or cross-validated likelihood that trades off fit against complexity.", weight: 3, required: true },
      ],
    },
    difficulty: 1.75,
    discrimination: 1.7,
    expectedSeconds: 190,
    prereqClosure: ["mixture-models-and-latent-variables"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mixtures--transfer-universal-approximation",
    conceptId: "mixture-models-and-latent-variables",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Explain the sense in which a mixture with enough components can approximate essentially any smooth " +
      "density arbitrarily well, and why this flexibility is also a practical danger.",
    rubric: {
      elements: [
        { id: "approximation-claim", description: "States that increasing K and placing components appropriately lets the mixture approximate a wide class of densities to arbitrary accuracy, analogous to a basis expansion.", weight: 3, required: true },
        {
          id: "danger",
          description: "Explains that with enough components a mixture can fit noise in a finite sample (memorizing rather than generalizing), so flexibility must be paired with a complexity control such as the K-selection criteria discussed elsewhere.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.05,
    discrimination: 1.8,
    expectedSeconds: 220,
    prereqClosure: ["mixture-models-and-latent-variables"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mixtures--transfer-nonparametric-mixture",
    conceptId: "mixture-models-and-latent-variables",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A Dirichlet process mixture lets the effective number of components grow with the data rather than being " +
      "fixed in advance. Explain, at a conceptual level, what problem this solves relative to a finite mixture " +
      "with a fixed K.",
    rubric: {
      elements: [
        { id: "fixed-k-problem", description: "States a finite mixture must commit to K before seeing how much structure the data actually supports, so getting K wrong either under- or over-fits.", weight: 4, required: true },
        {
          id: "dp-solution",
          description: "Explains a Dirichlet process places a prior over an unbounded number of components, letting the posterior effectively determine how many components are supported by the observed data, so K is inferred rather than fixed.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.8,
    expectedSeconds: 230,
    prereqClosure: ["mixture-models-and-latent-variables"],
    source: AUTHORED,
    status: "live",
  },
  // --- EM Algorithm (additional) -----------------------------------------------
  {
    id: "em--recall-full-name",
    conceptId: "em-algorithm",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does 'EM' stand for?",
    choices: [
      { id: "a", text: "Expectation-Maximization", correct: true },
      {
        id: "b",
        text: "Estimation-Marginalization",
        correct: false,
        misconception: { id: "wrong-expansion", description: "Misremembers the acronym's two words.", blameConceptId: "em-algorithm" },
      },
      {
        id: "c",
        text: "Exact Minimization",
        correct: false,
        misconception: { id: "wrong-expansion-2", description: "EM maximizes a likelihood-related bound; it is not framed as minimization, and it is not exact.", blameConceptId: "em-algorithm" },
      },
      {
        id: "d",
        text: "Empirical Maximization",
        correct: false,
        misconception: { id: "wrong-expansion-3", description: "Misremembers the first word of the acronym.", blameConceptId: "em-algorithm" },
      },
    ],
    difficulty: -1.7,
    discrimination: 1.1,
    expectedSeconds: 15,
    prereqClosure: ["em-algorithm"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "em--recall-when-used",
    conceptId: "em-algorithm",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "In one sentence, describe the situation that calls for EM rather than direct maximum likelihood.",
    rubric: {
      elements: [
        {
          id: "setting",
          description: "States EM is used when the model has latent/unobserved variables such that maximizing the observed-data likelihood directly is intractable, but maximizing the complete-data likelihood would be easy.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -1.3,
    discrimination: 1.2,
    expectedSeconds: 50,
    prereqClosure: ["em-algorithm", "mle"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "em--apply-e-step-three-component",
    conceptId: "em-algorithm",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "An E-step for a three-component mixture with equal weights (1/3 each) has component likelihoods 0.1, " +
      "0.4, and 0.9 for one observation. What responsibility does the E-step assign to component 2? Give a " +
      "decimal to three places.",
    answerKey: 0.286,
    tolerance: 0.01,
    difficulty: 0.55,
    discrimination: 1.5,
    expectedSeconds: 130,
    prereqClosure: ["em-algorithm", "mixture-models-and-latent-variables", "joint-distribution"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "em--apply-convergence-check",
    conceptId: "em-algorithm",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "Describe a practical stopping criterion for EM iterations, and explain why monitoring the parameters " +
      "themselves is not by itself sufficient.",
    rubric: {
      elements: [
        { id: "criterion", description: "States the standard criterion: stop when the observed-data log-likelihood's increase between iterations falls below a small threshold.", weight: 3, required: true },
        {
          id: "why-params-insufficient",
          description: "Explains parameters can move slowly near a flat region while still improving meaningfully, or can be reparameterized (e.g. under label switching) without the likelihood changing, so tracking the likelihood is the more reliable signal.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.05,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["em-algorithm", "mle"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "em--explain-jensen-connection",
    conceptId: "em-algorithm",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "The EM lower bound can be derived by applying Jensen's inequality to the observed-data log-likelihood. " +
      "Sketch how, and say which direction of Jensen's inequality is used.",
    rubric: {
      elements: [
        {
          id: "setup",
          description: "Writes the log-likelihood as the log of an expectation, under some distribution q over the latent, of the complete-data likelihood divided by q.",
          weight: 3,
          required: true,
        },
        {
          id: "jensen",
          description: "Applies concavity of log — Jensen's inequality for concave functions says the log of an expectation is at least the expectation of the log — to pull the log inside and produce the ELBO-style lower bound.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.35,
    discrimination: 1.7,
    expectedSeconds: 200,
    prereqClosure: ["em-algorithm", "mle", "mixture-models-and-latent-variables"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "em--explain-generalises-beyond-mixtures",
    conceptId: "em-algorithm",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "EM is presented via mixture models, but it applies to any latent-variable model. Explain what property " +
      "of a model is actually required for EM to be applicable, independent of what the latent variable " +
      "represents.",
    rubric: {
      elements: [
        {
          id: "general-requirement",
          description: "States the requirement: the complete-data log-likelihood (data and latents together) must be tractable to maximize (or take expectation of and maximize), even though the observed-data likelihood alone is not.",
          weight: 4,
          required: true,
        },
        { id: "examples", description: "Names at least one non-mixture example, e.g. HMMs, factor analysis, or missing-data problems generally.", weight: 3, required: true },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.7,
    expectedSeconds: 200,
    prereqClosure: ["em-algorithm", "mle"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "em--transfer-hard-em-vs-soft-em",
    conceptId: "em-algorithm",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "'Hard EM' replaces the E-step's soft responsibilities with a hard, winner-take-all assignment, turning " +
      "the algorithm into something like K-means. Explain what guarantee this loses relative to standard (soft) " +
      "EM.",
    rubric: {
      elements: [
        {
          id: "loses-monotonicity",
          description: "Explains hard EM no longer performs the exact E-step maximization over the true expected complete-data log-likelihood, so the sandwich argument for the lower bound's tightness — and hence monotone improvement of the true likelihood — breaks.",
          weight: 4,
          required: true,
        },
        { id: "practical-note", description: "Notes hard EM can still be useful and faster, but without the same guarantee, and typically converges to a worse local optimum of the actual observed-data likelihood.", weight: 3, required: true },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.8,
    expectedSeconds: 220,
    prereqClosure: ["em-algorithm", "mle", "mixture-models-and-latent-variables"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "em--transfer-generalized-em",
    conceptId: "em-algorithm",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Generalized EM (GEM) only requires the M-step to improve the lower bound, not maximize it exactly. " +
      "Explain why the monotonicity guarantee survives this weakening, and when this variant is useful.",
    rubric: {
      elements: [
        {
          id: "guarantee-survives",
          description: "Explains the sandwich argument only needs the M-step to raise the bound above its value at the E-step's tight point, not to find its maximum, so any improving M-step preserves the non-decrease of the true likelihood.",
          weight: 4,
          required: true,
        },
        {
          id: "when-useful",
          description: "States GEM is useful when the exact M-step has no closed form and must itself be solved by an iterative method (e.g. one gradient step), letting EM's overall guarantee be kept even when each M-step is only partially optimized.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.8,
    expectedSeconds: 230,
    prereqClosure: ["em-algorithm", "mle"],
    source: AUTHORED,
    status: "live",
  },
  // --- Gaussian Mixture Models (additional) -----------------------------------
  {
    id: "gmm--recall-component-distribution",
    conceptId: "gaussian-mixture-models",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In a Gaussian mixture model, what distribution does each component use?",
    choices: [
      { id: "a", text: "A (multivariate) Normal distribution", correct: true },
      {
        id: "b",
        text: "A uniform distribution",
        correct: false,
        misconception: { id: "wrong-component-dist", description: "Misidentifies the family of the component distribution.", blameConceptId: "gaussian-mixture-models" },
      },
      {
        id: "c",
        text: "A Bernoulli distribution",
        correct: false,
        misconception: { id: "wrong-component-dist-2", description: "Confuses a continuous GMM component with a distribution over binary outcomes.", blameConceptId: "gaussian-mixture-models" },
      },
      {
        id: "d",
        text: "A Poisson distribution",
        correct: false,
        misconception: { id: "wrong-component-dist-3", description: "Confuses a continuous GMM component with a distribution over counts.", blameConceptId: "gaussian-mixture-models" },
      },
    ],
    difficulty: -1.5,
    discrimination: 1.1,
    expectedSeconds: 20,
    prereqClosure: ["gaussian-mixture-models"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "gmm--recall-fitting-method",
    conceptId: "gaussian-mixture-models",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem:
      "Name the standard algorithm used to fit a GMM's parameters by maximum likelihood, and say which two " +
      "quantities it alternates between updating.",
    rubric: {
      elements: [
        { id: "names-em", description: "Names EM.", weight: 2, required: true },
        { id: "alternates", description: "Alternates between the responsibilities (E-step) and the mixing weights, means, and covariances (M-step).", weight: 3, required: true },
      ],
    },
    difficulty: -0.9,
    discrimination: 1.2,
    expectedSeconds: 45,
    prereqClosure: ["gaussian-mixture-models", "em-algorithm"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "gmm--apply-two-component-different-variance",
    conceptId: "gaussian-mixture-models",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A one-dimensional GMM has equal mixing weights; component 1 has mean 0 and variance 1, component 2 has " +
      "mean 4 and variance 4. For x = 2, what responsibility does component 1 receive? Give a decimal to three " +
      "places.",
    answerKey: 0.309,
    tolerance: 0.01,
    difficulty: 0.55,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["gaussian-mixture-models", "em-algorithm", "normal-distribution", "mixture-models-and-latent-variables"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "gmm--apply-covariance-types",
    conceptId: "gaussian-mixture-models",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "GMM implementations offer covariance options such as 'spherical', 'diagonal', and 'full'. Rank these " +
      "from fewest to most free parameters per component, and explain the modelling tradeoff choosing between " +
      "them involves.",
    rubric: {
      elements: [
        { id: "ranking", description: "Ranks spherical (1 parameter) below diagonal (d parameters) below full (d(d+1)/2 parameters).", weight: 3, required: true },
        {
          id: "tradeoff",
          description: "Explains more flexible covariance fits more varied cluster shapes but needs more data per component to estimate reliably and risks overfitting or singularity, especially with few points per cluster.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["gaussian-mixture-models", "covariance-matrix", "multivariate-normal"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "gmm--explain-initialization-sensitivity",
    conceptId: "gaussian-mixture-models",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "GMM fits are known to be sensitive to initialization even more than plain K-means. Explain a mechanism " +
      "specific to GMMs, beyond ordinary EM local optima, that makes bad initializations especially costly.",
    rubric: {
      elements: [
        {
          id: "variance-collapse-risk",
          description: "Explains a poorly initialized component can end up owning very few or tightly clustered points, driving its estimated covariance toward singularity and its likelihood contribution toward the unbounded blow-up, effectively trapping the fit.",
          weight: 4,
          required: true,
        },
        { id: "remedy", description: "Names a mitigation, e.g. initializing means with K-means output, multiple restarts, or a variance floor/prior.", weight: 3, required: true },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.7,
    expectedSeconds: 200,
    prereqClosure: ["gaussian-mixture-models", "em-algorithm", "mle"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "gmm--explain-bic-for-k",
    conceptId: "gaussian-mixture-models",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain how BIC is used to choose the number of components K for a GMM, and why it penalizes K more " +
      "heavily as the number of free parameters per additional component grows (e.g. full covariance versus " +
      "spherical).",
    rubric: {
      elements: [
        { id: "bic-formula-idea", description: "States BIC trades off maximized log-likelihood against a penalty proportional to the number of free parameters times log(n).", weight: 3, required: true },
        {
          id: "full-covariance-effect",
          description: "Explains a full-covariance component contributes far more parameters than a spherical one, so the same increase in K adds a much larger penalty under full covariance, making BIC favor smaller K when covariances are unrestricted.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["gaussian-mixture-models", "covariance-matrix", "multivariate-normal"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "gmm--transfer-density-estimation-vs-clustering",
    conceptId: "gaussian-mixture-models",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "A GMM can be used either as a general-purpose density estimator or as a clustering method. Explain how " +
      "the same fitted model supports both uses, and give a scenario where a GMM fits the density well but the " +
      "components do not correspond to any meaningful 'clusters'.",
    rubric: {
      elements: [
        { id: "shared-fit", description: "States the same fitted mixture supplies both a density (evaluating the fitted p(x)) and a clustering (taking the most probable component, or the responsibilities, per point).", weight: 3, required: true },
        {
          id: "counterexample",
          description: "Gives a scenario where a single skewed or heavy-tailed true distribution is well-approximated by several overlapping components whose regions do not correspond to genuinely separate subpopulations — a basis-expansion device, not evidence of distinct groups.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.4,
    discrimination: 1.9,
    expectedSeconds: 240,
    prereqClosure: ["gaussian-mixture-models", "mixture-models-and-latent-variables"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "gmm--transfer-em-as-coordinate-ascent",
    conceptId: "gaussian-mixture-models",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "Show that GMM fitting by EM can be viewed as coordinate ascent on the ELBO of variational inference, " +
      "alternating between optimizing over q (the responsibilities) and over the model parameters. Be specific " +
      "about what plays the role of q.",
    rubric: {
      elements: [
        {
          id: "q-role",
          description: "Identifies the E-step's responsibilities as exactly the optimal q — a per-observation categorical distribution over which component generated it — obtained by maximizing the ELBO over q with parameters fixed.",
          weight: 4,
          required: true,
        },
        { id: "m-step-role", description: "Identifies the M-step as maximizing the same ELBO over the model parameters with q fixed, which reduces to a weighted MLE.", weight: 4, required: true },
        {
          id: "conclusion",
          description: "Concludes EM is exactly coordinate ascent on the ELBO with the latent-posterior family left completely unconstrained, so no variational approximation gap arises, unlike mean-field VI.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.6,
    discrimination: 1.9,
    expectedSeconds: 260,
    prereqClosure: ["gaussian-mixture-models", "em-algorithm", "mixture-models-and-latent-variables"],
    source: AUTHORED,
    status: "live",
  },
  // --- Laplace Approximation (additional) --------------------------------------
  {
    id: "laplace--recall-what-it-approximates",
    conceptId: "laplace-approximation",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The Laplace approximation is used to approximate:",
    choices: [
      { id: "a", text: "A complicated (often posterior) distribution, by a Normal centred at its mode", correct: true },
      {
        id: "b",
        text: "A complicated function's integral by Monte Carlo sampling",
        correct: false,
        misconception: { id: "confuses-with-monte-carlo", description: "Confuses Laplace's deterministic quadratic-expansion approach with a sampling-based method.", blameConceptId: "laplace-approximation" },
      },
      {
        id: "c",
        text: "A dataset by its sample mean and variance",
        correct: false,
        misconception: { id: "confuses-with-summary-stats", description: "Confuses approximating a distribution's shape with summarizing raw data.", blameConceptId: "laplace-approximation" },
      },
      {
        id: "d",
        text: "A kernel by its Fourier transform",
        correct: false,
        misconception: { id: "confuses-with-fourier", description: "Confuses a local quadratic approximation with an unrelated spectral technique.", blameConceptId: "laplace-approximation" },
      },
    ],
    difficulty: -1.8,
    discrimination: 1.1,
    expectedSeconds: 20,
    prereqClosure: ["laplace-approximation"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "laplace--recall-when-used",
    conceptId: "laplace-approximation",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "In one sentence, describe the situation that calls for a Laplace approximation.",
    rubric: {
      elements: [
        {
          id: "setting",
          description: "States it is used when a target distribution has no closed-form normalizing constant or summary but its mode is findable by optimization, and a quick Gaussian summary is wanted.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -1.4,
    discrimination: 1.2,
    expectedSeconds: 50,
    prereqClosure: ["laplace-approximation", "mle"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "laplace--apply-exponential-posterior-mode",
    conceptId: "laplace-approximation",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A posterior for lambda has log-density proportional to 4·log(lambda) − 3·lambda on lambda > 0. Where " +
      "does the Laplace approximation place its centre? Give a decimal to three places.",
    answerKey: 1.333,
    tolerance: 0.01,
    difficulty: 0.6,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["laplace-approximation", "mle"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "laplace--apply-exponential-posterior-variance",
    conceptId: "laplace-approximation",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Same posterior: log-density proportional to 4·log(lambda) − 3·lambda, with its mode at lambda = 4/3. " +
      "What variance does the Laplace approximation assign? Give a decimal to three places.",
    answerKey: 0.444,
    tolerance: 0.01,
    difficulty: 0.95,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["laplace-approximation", "mle", "variance"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "laplace--explain-cost-relative-to-mcmc",
    conceptId: "laplace-approximation",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why the Laplace approximation is far cheaper computationally than MCMC, and what specific step " +
      "of Bayesian inference it substitutes an optimization for.",
    rubric: {
      elements: [
        {
          id: "substitutes-optimization",
          description: "Explains it replaces characterising the posterior by sampling with a single optimization (finding the mode) plus one Hessian evaluation.",
          weight: 4,
          required: true,
        },
        { id: "cost-comparison", description: "Notes optimizing to a local mode is typically far cheaper than running a Markov chain long enough to mix and produce enough effective samples.", weight: 3, required: true },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["laplace-approximation", "mle"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "laplace--explain-transform-then-approximate",
    conceptId: "laplace-approximation",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "A Laplace approximation applied directly to a variance parameter (which must be positive) can assign " +
      "nontrivial probability to negative values. Explain why this happens and how reparameterizing (e.g. " +
      "working with the log of the variance) fixes it.",
    rubric: {
      elements: [
        {
          id: "why",
          description: "Explains a Normal approximation has support on the whole real line by construction, so approximating a constrained positive quantity directly with one necessarily puts some mass outside the constraint.",
          weight: 4,
          required: true,
        },
        {
          id: "fix",
          description: "Explains applying the Laplace approximation to an unconstrained reparameterization (e.g. log variance) respects the constraint automatically, since exponentiating a Normal is always positive.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.85,
    discrimination: 1.7,
    expectedSeconds: 200,
    prereqClosure: ["laplace-approximation", "mle", "normal-distribution"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "laplace--transfer-model-evidence-approximation",
    conceptId: "laplace-approximation",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "The Laplace approximation can also approximate the marginal likelihood (model evidence) itself, not " +
      "just the posterior over parameters. Sketch how, and name the resulting well-known model-comparison " +
      "criterion it underlies.",
    rubric: {
      elements: [
        {
          id: "idea",
          description: "Explains that integrating a Laplace-approximated (Gaussian) unnormalized posterior in closed form gives an explicit approximation to the evidence, involving the maximized likelihood, the prior at the mode, and a term from the Hessian's determinant penalizing model complexity.",
          weight: 4,
          required: true,
        },
        { id: "names-criterion", description: "Names the Bayesian Information Criterion (BIC) as the crude large-sample limit of this approximation.", weight: 3, required: true },
      ],
    },
    difficulty: 2.35,
    discrimination: 1.8,
    expectedSeconds: 230,
    prereqClosure: ["laplace-approximation", "mle", "multivariate-normal"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "laplace--transfer-vs-full-bayes",
    conceptId: "laplace-approximation",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Explain what information a full Bayesian treatment (integrating over the posterior exactly, e.g. by " +
      "MCMC) preserves that the Laplace approximation, even when it captures the mode and local curvature " +
      "correctly, cannot — and when that lost information actually matters for downstream decisions.",
    rubric: {
      elements: [
        {
          id: "loses-global-shape",
          description: "Explains a single local Gaussian summary cannot represent global features such as multiple modes, heavy tails, or strong nonlinear correlation structure that a full posterior may have even when locally well-approximated near its main mode.",
          weight: 4,
          required: true,
        },
        { id: "when-matters", description: "Gives a case where this matters, e.g. decisions sensitive to tail risk, or downstream computations that integrate over regions the Gaussian systematically mis-weights.", weight: 3, required: true },
      ],
    },
    difficulty: 2.6,
    discrimination: 1.9,
    expectedSeconds: 250,
    prereqClosure: ["laplace-approximation", "multivariate-normal", "mle"],
    source: AUTHORED,
    status: "live",
  },
  // --- Variational Inference: ELBO (additional) --------------------------------
  {
    id: "elbo--recall-full-name",
    conceptId: "variational-inference-elbo",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does 'ELBO' stand for?",
    choices: [
      { id: "a", text: "Evidence Lower BOund", correct: true },
      {
        id: "b",
        text: "Estimated Likelihood Bayes Objective",
        correct: false,
        misconception: { id: "wrong-acronym", description: "Misremembers the acronym's words.", blameConceptId: "variational-inference-elbo" },
      },
      {
        id: "c",
        text: "Expected Log-Bayes Objective",
        correct: false,
        misconception: { id: "wrong-acronym-2", description: "Misremembers the acronym's words.", blameConceptId: "variational-inference-elbo" },
      },
      {
        id: "d",
        text: "Exact Lower Bound Optimum",
        correct: false,
        misconception: { id: "wrong-acronym-3", description: "The ELBO is a lower bound, not the optimum of one, and 'exact' is wrong — it is an approximation device.", blameConceptId: "variational-inference-elbo" },
      },
    ],
    difficulty: -1.8,
    discrimination: 1.1,
    expectedSeconds: 15,
    prereqClosure: ["variational-inference-elbo"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "elbo--recall-what-is-optimised",
    conceptId: "variational-inference-elbo",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "In one sentence, say what the ELBO is a function of, and over what it is maximised.",
    rubric: {
      elements: [
        { id: "arguments", description: "States it is a functional of the approximate distribution q, depending also on the model and observed data.", weight: 2, required: true },
        { id: "maximised-over", description: "States it is maximised over q, ranging over some tractable family.", weight: 3, required: true },
      ],
    },
    difficulty: -1.4,
    discrimination: 1.2,
    expectedSeconds: 40,
    prereqClosure: ["variational-inference-elbo", "kl-divergence"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "elbo--apply-gap-arithmetic-two",
    conceptId: "variational-inference-elbo",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "For a fitted q, the ELBO evaluates to −220 and the KL divergence from q to the true posterior is 3.2. " +
      "What is the log evidence? Give a decimal to one place.",
    answerKey: -216.8,
    tolerance: 0.1,
    difficulty: 0.15,
    discrimination: 1.4,
    expectedSeconds: 100,
    prereqClosure: ["variational-inference-elbo", "kl-divergence"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "elbo--apply-monte-carlo-elbo",
    conceptId: "variational-inference-elbo",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "The expected-log-likelihood term in the ELBO usually has no closed form. Describe how it is estimated " +
      "in practice, and what randomness that estimate introduces into training.",
    rubric: {
      elements: [
        {
          id: "mc-estimate",
          description: "States it is estimated by drawing one or more samples of the latent from q and averaging the log-joint (or log-likelihood) at those samples — a Monte Carlo estimate.",
          weight: 4,
          required: true,
        },
        {
          id: "noisy-gradient",
          description: "Notes this makes the resulting gradient noisy or stochastic, requiring stochastic-optimization techniques and, for continuous latents, often the reparameterization trick to get a usable gradient through the sampling step.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.85,
    discrimination: 1.6,
    expectedSeconds: 170,
    prereqClosure: ["variational-inference-elbo", "kl-divergence", "expectation"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "elbo--explain-family-choice-tradeoff",
    conceptId: "variational-inference-elbo",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain the tradeoff involved in choosing the variational family for q — say, a fully factorized " +
      "(mean-field) family versus a richer family with correlations.",
    rubric: {
      elements: [
        { id: "tractability", description: "States a simpler family (e.g. mean-field) makes the ELBO and its optimization more tractable, often with closed-form updates.", weight: 3, required: true },
        {
          id: "approximation-quality",
          description: "Explains a richer family can represent the true posterior's dependence structure more faithfully, closing the KL gap further, at the cost of a harder optimization and possibly no closed form.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["variational-inference-elbo", "kl-divergence"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "elbo--explain-coordinate-ascent-mean-field",
    conceptId: "variational-inference-elbo",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "For a mean-field family, coordinate ascent variational inference (CAVI) updates one factor of q at a " +
      "time holding the others fixed, and each update has a known closed form. Explain, at a high level, why " +
      "fixing all-but-one factor turns the ELBO into something with a tractable optimum for that factor.",
    rubric: {
      elements: [
        {
          id: "conditional-form",
          description: "Explains that with the other factors of q fixed, the ELBO as a function of the remaining factor reduces (up to a constant) to minus the KL divergence from that factor to a specific unnormalized density built from the expected log-joint under the other fixed factors, and KL is minimized by matching that density exactly.",
          weight: 4,
          required: true,
        },
        {
          id: "closed-form-result",
          description: "Concludes the optimal update for that factor is proportional to the exponentiated expected log-joint (holding the rest of q fixed), which is often a recognizable, easy-to-normalize distribution for common model families.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.8,
    expectedSeconds: 220,
    prereqClosure: ["variational-inference-elbo", "kl-divergence", "expectation"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "elbo--transfer-stochastic-vi",
    conceptId: "variational-inference-elbo",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Stochastic variational inference applies the ELBO framework to datasets too large to process in one " +
      "batch, using noisy gradients from mini-batches. Explain why the ELBO's structure — a sum over data " +
      "points of per-point terms, plus one global regularization term — makes this possible.",
    rubric: {
      elements: [
        {
          id: "sum-structure",
          description: "Explains the expected log-likelihood term decomposes as a sum over independent data points, so an unbiased estimate of the whole sum can be built from a mini-batch by rescaling the mini-batch average by the total dataset size.",
          weight: 4,
          required: true,
        },
        { id: "rest-is-global", description: "Notes the KL-to-prior term is typically over global parameters and can be included exactly or subsampled consistently, keeping the overall gradient estimate unbiased.", weight: 3, required: true },
        { id: "consequence", description: "Draws the consequence: stochastic gradient ascent on this noisy but unbiased objective scales VI to datasets a batch method could never fit into memory or wall-clock budget.", weight: 2 },
      ],
    },
    difficulty: 2.25,
    discrimination: 1.8,
    expectedSeconds: 230,
    prereqClosure: ["variational-inference-elbo", "kl-divergence", "expectation"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "elbo--transfer-alpha-divergence-generalisation",
    conceptId: "variational-inference-elbo",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "KL divergence is one member of a broader family of divergences (e.g. alpha-divergences) that could in " +
      "principle define a generalized ELBO-like objective. Explain, conceptually, what changes about the " +
      "resulting approximation's behaviour as the divergence is varied between mode-seeking and mass-covering " +
      "extremes.",
    rubric: {
      elements: [
        {
          id: "spectrum",
          description: "Explains different divergences weight the mismatch between q and the true posterior differently across the space, producing a spectrum from strongly mode-seeking (concentrating on one high-density region) to strongly mass-covering (spreading q to avoid missing any region where the posterior has mass).",
          weight: 4,
          required: true,
        },
        {
          id: "consequence",
          description: "Draws the consequence for uncertainty quantification: a mode-seeking choice tends to underestimate variance and ignore secondary modes, while a mass-covering choice tends to inflate variance, so the choice of divergence is itself a modeling decision with real downstream effects on calibration.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.45,
    discrimination: 1.9,
    expectedSeconds: 250,
    prereqClosure: ["variational-inference-elbo", "kl-divergence"],
    source: AUTHORED,
    status: "live",
  },
  // --- Variational Inference: VAEs (additional) --------------------------------
  {
    id: "vae--recall-full-name",
    conceptId: "variational-inference-vaes",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does 'VAE' stand for?",
    choices: [
      { id: "a", text: "Variational Autoencoder", correct: true },
      {
        id: "b",
        text: "Vector Autoregressive Encoder",
        correct: false,
        misconception: { id: "wrong-acronym", description: "Misremembers the acronym's words.", blameConceptId: "variational-inference-vaes" },
      },
      {
        id: "c",
        text: "Value-Aligned Estimator",
        correct: false,
        misconception: { id: "wrong-acronym-2", description: "Misremembers the acronym's words.", blameConceptId: "variational-inference-vaes" },
      },
      {
        id: "d",
        text: "Variance-Adjusted Estimator",
        correct: false,
        misconception: { id: "wrong-acronym-3", description: "Misremembers the acronym's words.", blameConceptId: "variational-inference-vaes" },
      },
    ],
    difficulty: -1.5,
    discrimination: 1.1,
    expectedSeconds: 15,
    prereqClosure: ["variational-inference-vaes"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "vae--recall-prior-choice",
    conceptId: "variational-inference-vaes",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "What prior is standardly placed on the latent code in a VAE, and why is that choice convenient?",
    rubric: {
      elements: [
        { id: "names-prior", description: "A standard multivariate Normal (mean 0, identity covariance).", weight: 2, required: true },
        { id: "convenience", description: "It is easy to sample from, and its KL divergence to a Normal encoder output has a simple closed form.", weight: 3, required: true },
      ],
    },
    difficulty: -1.0,
    discrimination: 1.2,
    expectedSeconds: 45,
    prereqClosure: ["variational-inference-vaes", "variational-inference-elbo"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "vae--apply-kl-nonzero-mean-and-scale",
    conceptId: "variational-inference-vaes",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "For a one-dimensional latent with a standard Normal prior, the KL term is 0.5·(mu² + sigma² − " +
      "log(sigma²) − 1). The encoder outputs mu = 0.5 and sigma = 2 for some input. What is the KL term? Give " +
      "a decimal to three places.",
    answerKey: 0.932,
    tolerance: 0.01,
    difficulty: 1.5,
    discrimination: 1.5,
    expectedSeconds: 140,
    prereqClosure: ["variational-inference-vaes", "kl-divergence"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "vae--apply-latent-dim-choice",
    conceptId: "variational-inference-vaes",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "Explain the tradeoff involved in choosing the dimensionality of a VAE's latent space, in terms of the " +
      "reconstruction and KL terms of the ELBO.",
    rubric: {
      elements: [
        { id: "too-small", description: "Too few dimensions bottleneck the information the decoder can use, hurting reconstruction quality.", weight: 3, required: true },
        {
          id: "too-large",
          description: "Too many dimensions give the encoder room to help reconstruction, but also more room for the KL term to be satisfied cheaply in unused dimensions without truly using the latent space efficiently, and risks overfitting.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["variational-inference-vaes", "variational-inference-elbo"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "vae--explain-beta-vae",
    conceptId: "variational-inference-vaes",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "A beta-VAE multiplies the KL term in the ELBO by a factor beta > 1. Explain what effect this has on the " +
      "latent representation, and what is sacrificed to get it.",
    rubric: {
      elements: [
        {
          id: "effect",
          description: "Explains upweighting the KL term pushes the encoder's outputs harder toward the (typically factorized) prior, tending to encourage a more disentangled, compressed latent representation where dimensions align more with independent factors of variation.",
          weight: 4,
          required: true,
        },
        { id: "cost", description: "Explains this trades away reconstruction quality, since the objective no longer optimizes the true ELBO or log-likelihood bound.", weight: 4, required: true },
      ],
    },
    difficulty: 1.85,
    discrimination: 1.7,
    expectedSeconds: 190,
    prereqClosure: ["variational-inference-vaes", "variational-inference-elbo", "kl-divergence"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "vae--explain-decoder-variance-role",
    conceptId: "variational-inference-vaes",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "A Gaussian decoder's output variance is often fixed rather than learned. Explain what role that fixed " +
      "variance plays in the ELBO's reconstruction term, and what happens to training if it is set too small.",
    rubric: {
      elements: [
        {
          id: "role",
          description: "Explains the fixed decoder variance sets the relative weight of the reconstruction term versus the KL term (a Gaussian log-likelihood scales inversely with variance), effectively playing the same role as a manually chosen beta.",
          weight: 4,
          required: true,
        },
        {
          id: "too-small",
          description: "Explains too small a fixed variance makes the reconstruction term dominate overwhelmingly, so the optimizer chases near-perfect reconstruction and is barely penalized for a poorly regularized, uninformative-to-the-prior latent space.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.05,
    discrimination: 1.8,
    expectedSeconds: 210,
    prereqClosure: ["variational-inference-vaes", "variational-inference-elbo"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "vae--transfer-vs-normalizing-flows",
    conceptId: "variational-inference-vaes",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Normalizing flows model a density by an invertible, differentiable transformation of a simple base " +
      "distribution, with an exact (not lower-bounded) log-likelihood. Explain what a VAE gives up relative to " +
      "a flow, and what it gains in exchange.",
    rubric: {
      elements: [
        { id: "gives-up", description: "Explains a VAE only ever optimizes a lower bound on the log-likelihood, never the exact log-likelihood, because its encoder-decoder structure is not invertible or dimension-preserving.", weight: 4, required: true },
        {
          id: "gains",
          description: "Explains the VAE buys a genuinely lower-dimensional latent space enabling a meaningful bottleneck representation, and no architectural requirement that every layer be invertible with a tractable Jacobian, freeing decoder architecture choices a flow could not easily accommodate.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.4,
    discrimination: 1.9,
    expectedSeconds: 240,
    prereqClosure: ["variational-inference-vaes", "variational-inference-elbo"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "vae--transfer-hierarchical-latents",
    conceptId: "variational-inference-vaes",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A hierarchical VAE stacks several layers of latent variables (a latent generating another latent, " +
      "generating the data). Explain what limitation of a single-layer VAE this addresses, and what new " +
      "difficulty it introduces for the ELBO's KL term.",
    rubric: {
      elements: [
        {
          id: "limitation-addressed",
          description: "Explains a single Gaussian layer may be too limited to capture genuinely multi-scale structure in the data, so stacking layers gives the approximate posterior more expressive power overall.",
          weight: 4,
          required: true,
        },
        {
          id: "new-difficulty",
          description: "Explains the KL term must now be computed or estimated across the whole chain of latents, and posterior collapse can occur independently at each layer, especially higher, more abstract layers, compounding the free-bits/annealing issues from posterior collapse.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.55,
    discrimination: 1.9,
    expectedSeconds: 250,
    prereqClosure: ["variational-inference-vaes", "variational-inference-elbo", "kl-divergence"],
    source: AUTHORED,
    status: "live",
  },
  // --- Gaussian Process (additional) -------------------------------------------
  {
    id: "gp--recall-what-it-is",
    conceptId: "gaussian-process",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "A Gaussian process is best described as:",
    choices: [
      { id: "a", text: "A distribution over functions, such that any finite set of function values is jointly Normal", correct: true },
      {
        id: "b",
        text: "A single random variable that is Normally distributed",
        correct: false,
        misconception: { id: "confuses-with-single-normal", description: "Confuses a distribution over an entire function with a distribution over one number.", blameConceptId: "gaussian-process" },
      },
      {
        id: "c",
        text: "A neural network with Gaussian-initialized weights",
        correct: false,
        misconception: { id: "confuses-with-nn-init", description: "Confuses a nonparametric prior over functions with a weight-initialization scheme.", blameConceptId: "gaussian-process" },
      },
      {
        id: "d",
        text: "A method for generating Gaussian random numbers",
        correct: false,
        misconception: { id: "confuses-with-rng", description: "Confuses a probabilistic model over functions with a random-number generator.", blameConceptId: "gaussian-process" },
      },
    ],
    difficulty: -1.7,
    discrimination: 1.1,
    expectedSeconds: 20,
    prereqClosure: ["gaussian-process"],
    source: GPML,
    status: "live",
  },
  {
    id: "gp--recall-hyperparameters",
    conceptId: "gaussian-process",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem:
      "Name two hyperparameters a typical kernel (e.g. the squared-exponential kernel) has, and briefly say " +
      "what each controls.",
    rubric: {
      elements: [
        { id: "lengthscale", description: "A length-scale, controlling how quickly correlation decays with distance.", weight: 2, required: true },
        { id: "variance", description: "A signal variance (amplitude), controlling the overall scale of function values.", weight: 2, required: true },
      ],
    },
    difficulty: -1.1,
    discrimination: 1.2,
    expectedSeconds: 50,
    prereqClosure: ["gaussian-process", "kernel"],
    source: GPML,
    status: "live",
  },
  {
    id: "gp--apply-posterior-mean-with-noise",
    conceptId: "gaussian-process",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A zero-mean GP has kernel k(x, x') = exp(−(x − x')²/2). You observe a noisy value y(0) = 2 with " +
      "observation noise variance 1. What is the posterior mean at x = 1? Give a decimal to three places.",
    answerKey: 0.607,
    tolerance: 0.01,
    difficulty: 0.75,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["gaussian-process", "multivariate-normal", "kernel", "covariance-matrix"],
    source: GPML,
    status: "live",
  },
  {
    id: "gp--apply-effect-of-lengthscale",
    conceptId: "gaussian-process",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "Explain, without computing anything, how increasing the kernel's length-scale changes GP predictions " +
      "away from the observed data points.",
    rubric: {
      elements: [
        { id: "smoother", description: "States larger length-scale means the kernel treats farther-apart points as more correlated, producing smoother functions.", weight: 3, required: true },
        { id: "slower-reversion", description: "Predictions revert to the prior mean more slowly moving away from observed points, and the posterior variance grows more slowly with distance.", weight: 3, required: true },
        { id: "underfit-risk", description: "Notes an overly large length-scale can miss genuine local structure, just as an overly small one overfits to noise.", weight: 2 },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["gaussian-process", "kernel"],
    source: GPML,
    status: "live",
  },
  {
    id: "gp--explain-marginal-likelihood-for-hyperparameters",
    conceptId: "gaussian-process",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "GP hyperparameters (like length-scale) are typically chosen by maximizing the marginal likelihood " +
      "rather than by cross-validation. Explain what the marginal likelihood automatically trades off, without " +
      "needing a held-out set.",
    rubric: {
      elements: [
        {
          id: "tradeoff",
          description: "Explains the log marginal likelihood decomposes into a data-fit term and a complexity-penalty term (from the covariance matrix's determinant, penalizing overly flexible or overconfident kernels), balancing fit against complexity automatically using only the training data.",
          weight: 4,
          required: true,
        },
        { id: "why-no-cv-needed", description: "Notes this Occam's-razor-like penalty is built into the marginal likelihood itself, unlike a plain likelihood, which is why no separate held-out set is required.", weight: 3, required: true },
      ],
    },
    difficulty: 1.85,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["gaussian-process", "multivariate-normal", "kernel"],
    source: GPML,
    status: "live",
  },
  {
    id: "gp--explain-kernel-encodes-assumptions",
    conceptId: "gaussian-process",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Two different kernels (say, squared-exponential vs. Matérn) fit to the same data can produce visibly " +
      "different extrapolations far from the observed points, even if they fit the observed points equally " +
      "well. Explain why, tying your answer to what a kernel actually specifies.",
    rubric: {
      elements: [
        {
          id: "kernel-specifies-smoothness",
          description: "Explains the kernel encodes prior assumptions about function smoothness or regularity, which constrains behavior everywhere, including regions with no data to constrain it empirically.",
          weight: 4,
          required: true,
        },
        {
          id: "extrapolation-driven-by-prior",
          description: "Explains that far from observed points predictions revert toward the prior, so it is the kernel's structural assumptions, not the data, that determine extrapolation behavior there.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.8,
    expectedSeconds: 220,
    prereqClosure: ["gaussian-process", "kernel"],
    source: GPML,
    status: "live",
  },
  {
    id: "gp--transfer-bayesian-optimization",
    conceptId: "gaussian-process",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Explain how a GP's posterior mean and variance are combined into an acquisition function for Bayesian " +
      "optimization, and why having both quantities, not just the mean, is essential to the method working " +
      "well.",
    rubric: {
      elements: [
        {
          id: "acquisition-idea",
          description: "Explains an acquisition function combines the predicted mean (exploitation) with the predicted uncertainty (exploration: where the model is unsure and evaluating would be informative).",
          weight: 4,
          required: true,
        },
        {
          id: "why-both-needed",
          description: "Explains optimizing on the mean alone would just repeatedly query near the current best-known point and might miss a better unexplored region, since the model can be confidently wrong where it has no data — the variance term drives exploration there.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.45,
    discrimination: 1.8,
    expectedSeconds: 240,
    prereqClosure: ["gaussian-process", "multivariate-normal", "kernel"],
    source: GPML,
    status: "live",
  },
  {
    id: "gp--transfer-sparse-approximation-tradeoff",
    conceptId: "gaussian-process",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A sparse GP approximation summarizes the training data by a smaller set of 'inducing points', reducing " +
      "the cubic-cost bottleneck. Explain what is being approximated relative to the exact GP posterior, and " +
      "how the number of inducing points controls the accuracy-versus-cost tradeoff.",
    rubric: {
      elements: [
        {
          id: "what-approximated",
          description: "Explains the exact posterior (which conditions on all n training points, at cubic cost) is replaced by a posterior conditioned through a smaller set of m << n inducing points chosen or optimized to summarize the full dataset, at lower cost.",
          weight: 4,
          required: true,
        },
        {
          id: "tradeoff",
          description: "Explains increasing m brings the approximation closer to the exact GP posterior (recovering it exactly as m approaches n) at increasing computational cost, so m is chosen to balance fidelity against scalability.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.6,
    discrimination: 1.9,
    expectedSeconds: 250,
    prereqClosure: ["gaussian-process", "kernel", "invertible-matrices"],
    source: GPML,
    status: "live",
  },
  // --- Reproducing Kernel Hilbert Space (additional) ---------------------------
  {
    id: "rkhs--recall-full-name",
    conceptId: "rkhs",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does 'RKHS' stand for?",
    choices: [
      { id: "a", text: "Reproducing Kernel Hilbert Space", correct: true },
      {
        id: "b",
        text: "Random Kernel Hypothesis Space",
        correct: false,
        misconception: { id: "wrong-expansion", description: "Misremembers the acronym's words.", blameConceptId: "rkhs" },
      },
      {
        id: "c",
        text: "Regularized Kernel Hyperplane Solver",
        correct: false,
        misconception: { id: "wrong-expansion-2", description: "Misremembers the acronym's words.", blameConceptId: "rkhs" },
      },
      {
        id: "d",
        text: "Restricted Kernel Hilbert Set",
        correct: false,
        misconception: { id: "wrong-expansion-3", description: "Misremembers the acronym's words.", blameConceptId: "rkhs" },
      },
    ],
    difficulty: -1.8,
    discrimination: 1.1,
    expectedSeconds: 20,
    prereqClosure: ["rkhs"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "rkhs--recall-kernel-slice",
    conceptId: "rkhs",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "What is meant by a 'kernel slice' at a point x, written k(x, ·)?",
    rubric: {
      elements: [
        { id: "definition", description: "It is the function of one remaining argument obtained by fixing the first argument of the kernel to x — an element of the RKHS itself.", weight: 3, required: true },
      ],
    },
    difficulty: -1.2,
    discrimination: 1.2,
    expectedSeconds: 45,
    prereqClosure: ["rkhs", "kernel"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "rkhs--apply-linear-kernel-space",
    conceptId: "rkhs",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "For the linear kernel k(x, x') = x·x' on R^d, identify the RKHS explicitly — what space of functions it " +
      "is and what its norm is — and verify the reproducing property in this simple case.",
    rubric: {
      elements: [
        { id: "identifies-space", description: "States the RKHS is the space of linear functions f(x) = w·x for w in R^d, with the RKHS norm equal to the Euclidean norm of w.", weight: 3, required: true },
        {
          id: "verify",
          description: "Verifies that the kernel slice at x is the function x' -> x·x', whose inner product with f(x') = w·x' equals w·x = f(x), matching the reproducing property directly.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.4,
    expectedSeconds: 150,
    prereqClosure: ["rkhs", "kernel", "dot-product"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "rkhs--apply-valid-kernel-check",
    conceptId: "rkhs",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "State Mercer's condition for k to be a valid kernel (one that admits an RKHS), and explain in one " +
      "sentence why this condition is what the RKHS construction relies on.",
    rubric: {
      elements: [
        { id: "condition", description: "States the kernel matrix formed by evaluating k at any finite set of points must be symmetric and positive semi-definite.", weight: 3, required: true },
        { id: "why-relied-on", description: "Explains positive semi-definiteness is exactly what guarantees the resulting bilinear form behaves like a genuine inner product, which the whole Hilbert-space construction needs.", weight: 3, required: true },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["rkhs", "kernel", "mercers-theorem"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "rkhs--explain-why-not-every-function-space-works",
    conceptId: "rkhs",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Not every space of functions can be given an inner product making it a valid RKHS for some kernel. " +
      "Explain, using the point-evaluation requirement, what rules a space like L² out.",
    rubric: {
      elements: [
        {
          id: "l2-not-pointwise",
          description: "Explains L² identifies functions that differ only on a measure-zero set, so 'the value at a point x' is not even a well-defined functional on L².",
          weight: 4,
          required: true,
        },
        { id: "rkhs-requirement", description: "Contrasts this with an RKHS, where by definition every point evaluation is a well-defined, continuous linear functional — a genuinely restrictive condition.", weight: 3, required: true },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["rkhs", "kernel"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "rkhs--explain-kernel-trick-mechanism",
    conceptId: "rkhs",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Explain precisely what the 'kernel trick' substitutes for what, and why that substitution is licensed " +
      "by the RKHS construction rather than being a computational shortcut taken on faith.",
    rubric: {
      elements: [
        { id: "substitution", description: "States the trick replaces an explicit inner product of feature-mapped inputs, phi(x)·phi(x'), with a direct kernel evaluation k(x, x'), often avoiding ever computing phi.", weight: 3, required: true },
        {
          id: "licensed-by-rkhs",
          description: "Explains RKHS theory supplies an actual feature map (the canonical map x -> k(x, ·)) and an actual inner product space for which this equality is a theorem — the reproducing property applied to two slices — not merely a convenient assumption.",
          weight: 4,
          required: true,
        },
        { id: "practical-payoff", description: "Notes this lets algorithms expressed only via inner products run in implicit, possibly infinite-dimensional feature spaces at the cost of one kernel evaluation.", weight: 2 },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["rkhs", "kernel", "dot-product"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "rkhs--transfer-svm-margin",
    conceptId: "rkhs",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "The SVM margin is defined as 2/||w|| in feature space. Explain, using the RKHS norm, why maximizing the " +
      "margin is exactly a smoothness-penalizing regularizer, connecting this to the representer theorem.",
    rubric: {
      elements: [
        {
          id: "norm-as-smoothness",
          description: "Explains that in the RKHS view, ||w|| measures the same kind of roughness/complexity discussed for kernel ridge regression, so maximizing margin (minimizing ||w||) minimizes that complexity measure.",
          weight: 4,
          required: true,
        },
        {
          id: "representer-connection",
          description: "Connects this to the representer theorem: since the optimal decision function again lies in the span of kernel slices at the training points, the infinite-dimensional margin-maximization problem reduces to a finite quadratic program over the training points' coefficients.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.35,
    discrimination: 1.9,
    expectedSeconds: 240,
    prereqClosure: ["rkhs", "kernel"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "rkhs--transfer-mmd",
    conceptId: "rkhs",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Maximum Mean Discrepancy (MMD) measures the distance between two distributions by embedding each into " +
      "an RKHS as a 'mean embedding' and comparing the embeddings' distance. Explain at a high level why the " +
      "RKHS norm gives a meaningful way to compare distributions, and what property of the kernel is needed for " +
      "MMD to be zero only when the distributions are identical.",
    rubric: {
      elements: [
        {
          id: "embedding-idea",
          description: "Explains the mean embedding of a distribution is the RKHS-norm average of the kernel slices at points drawn from it, and MMD is the RKHS distance between two such embeddings, effectively comparing all the features the kernel implicitly represents rather than a fixed finite statistic.",
          weight: 4,
          required: true,
        },
        {
          id: "characteristic-kernel",
          description: "States the kernel must be 'characteristic' — the embedding map must be injective on the space of distributions — for MMD to vanish exactly when the two distributions coincide.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.55,
    discrimination: 1.9,
    expectedSeconds: 250,
    prereqClosure: ["rkhs", "kernel"],
    source: AUTHORED,
    status: "live",
  },
  // --- Wasserstein Distance (additional) ---------------------------------------
  {
    id: "wasserstein--recall-alt-name",
    conceptId: "wasserstein-distance",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The Wasserstein distance is also commonly known as the:",
    choices: [
      { id: "a", text: "Earth mover's distance", correct: true },
      {
        id: "b",
        text: "Total variation distance",
        correct: false,
        misconception: { id: "confuses-with-tv", description: "Confuses a transport-cost distance with the total variation metric.", blameConceptId: "wasserstein-distance" },
      },
      {
        id: "c",
        text: "Bhattacharyya distance",
        correct: false,
        misconception: { id: "confuses-with-bhattacharyya", description: "Confuses Wasserstein with an overlap-based similarity measure.", blameConceptId: "wasserstein-distance" },
      },
      {
        id: "d",
        text: "Hellinger distance",
        correct: false,
        misconception: { id: "confuses-with-hellinger", description: "Confuses Wasserstein with a different, non-transport-based divergence.", blameConceptId: "wasserstein-distance" },
      },
    ],
    difficulty: -2.0,
    discrimination: 1.1,
    expectedSeconds: 20,
    prereqClosure: ["wasserstein-distance"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "wasserstein--recall-ground-metric",
    conceptId: "wasserstein-distance",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "What is a 'ground metric' in the definition of Wasserstein distance, and why is it needed?",
    rubric: {
      elements: [
        { id: "definition", description: "It is the distance function on the underlying space that measures the cost of moving one unit of mass from one point to another.", weight: 3, required: true },
        { id: "why-needed", description: "Without it there is no notion of how far mass travels, so the transport cost cannot be defined.", weight: 2, required: true },
      ],
    },
    difficulty: -1.5,
    discrimination: 1.2,
    expectedSeconds: 45,
    prereqClosure: ["wasserstein-distance"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "wasserstein--apply-two-point-masses-scaled",
    conceptId: "wasserstein-distance",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "P places all its probability at the point −2; Q places all of its at the point 5. What is the 1-Wasserstein distance between them?",
    answerKey: 7,
    tolerance: 0.01,
    difficulty: -0.05,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["wasserstein-distance"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "wasserstein--apply-three-point-transport",
    conceptId: "wasserstein-distance",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "P places probability 1/3 at each of the points 0, 1, and 2. Q places all its probability at the point " +
      "1. What is the 1-Wasserstein distance? Give a decimal to three places.",
    answerKey: 0.667,
    tolerance: 0.01,
    difficulty: 1.15,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["wasserstein-distance", "expectation"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "wasserstein--explain-order-of-moment",
    conceptId: "wasserstein-distance",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "The '1' in 1-Wasserstein distance refers to using the ground distance to the first power inside the " +
      "optimization. Explain what changes conceptually — not the formula — if you instead used the squared " +
      "ground distance and took a square root at the end (the 2-Wasserstein distance).",
    rubric: {
      elements: [
        {
          id: "more-sensitive-to-outliers",
          description: "Explains squaring distance weights moving mass a long way much more heavily than a short way, so the 2-Wasserstein distance is more sensitive to a small amount of mass that must travel very far.",
          weight: 4,
          required: true,
        },
        { id: "still-a-metric", description: "Notes both are still valid metrics, just weighting large single moves differently.", weight: 3, required: true },
      ],
    },
    difficulty: 0.4,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["wasserstein-distance", "expectation"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "wasserstein--explain-dual-formulation-teaser",
    conceptId: "wasserstein-distance",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "The Wasserstein distance has a dual formulation as a supremum over 1-Lipschitz functions (Kantorovich " +
      "duality), used directly in Wasserstein GAN training. Explain, without deriving it, why a Lipschitz " +
      "constraint specifically — rather than any constraint — shows up in this dual.",
    rubric: {
      elements: [
        {
          id: "ties-to-primal",
          description: "Explains the transport-cost primal problem bounds how much a function's value can change per unit of ground distance moved, and Lipschitz continuity is exactly the condition that a function's change is bounded by distance moved with constant 1 — the matching dual constraint.",
          weight: 4,
          required: true,
        },
        { id: "connects-to-training", description: "Connects it to WGAN practice: the critic network must be approximately enforced to be 1-Lipschitz (e.g. weight clipping or a gradient penalty) for the estimated distance to be meaningful.", weight: 3, required: true },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["wasserstein-distance"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "wasserstein--transfer-barycenters",
    conceptId: "wasserstein-distance",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A Wasserstein barycenter is the distribution minimizing the weighted average of its Wasserstein " +
      "distances to a set of given distributions — an analogue of the mean, but for distributions. Explain why " +
      "averaging distributions this way behaves differently, and often more sensibly, than simply averaging " +
      "their densities pointwise, using two well-separated unimodal distributions as your example.",
    rubric: {
      elements: [
        { id: "pointwise-average-problem", description: "Explains pointwise-averaging the densities of two distributions with well-separated modes produces a bimodal density with a dip in between, rather than anything like an 'in-between' distribution.", weight: 4, required: true },
        {
          id: "barycenter-behavior",
          description: "Explains the Wasserstein barycenter instead interpolates the mass geometrically, transporting each distribution's mass toward a shared middle location, producing a genuinely unimodal distribution located between the two.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.05,
    discrimination: 1.8,
    expectedSeconds: 230,
    prereqClosure: ["wasserstein-distance"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "wasserstein--transfer-optimal-transport-in-domain-adaptation",
    conceptId: "wasserstein-distance",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Domain adaptation methods sometimes minimize the Wasserstein distance between a source domain's feature " +
      "distribution and a target domain's, to help a classifier trained on the source transfer to the target. " +
      "Explain what assumption this approach makes about the relationship between the domains, and a scenario " +
      "where minimizing this distance would not by itself guarantee good target performance.",
    rubric: {
      elements: [
        {
          id: "assumption",
          description: "Explains the approach assumes that once the feature distributions are aligned, a classifier's decision boundary learned on the source will also be appropriate on the target — i.e. it assumes the label-conditional structure transfers, not just the marginal feature distribution.",
          weight: 4,
          required: true,
        },
        {
          id: "failure-scenario",
          description: "Gives a scenario where the relationship between features and labels genuinely differs between domains, so aligning marginals perfectly can still leave the classifier making systematically wrong predictions on the target.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.4,
    discrimination: 1.9,
    expectedSeconds: 250,
    prereqClosure: ["wasserstein-distance"],
    source: AUTHORED,
    status: "live",
  },
];
