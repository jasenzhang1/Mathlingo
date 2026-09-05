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
];
