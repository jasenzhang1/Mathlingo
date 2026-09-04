import type { WikiArticle } from "./types";

export const graphsWiki: WikiArticle = {
  conceptId: "graphs",
  summary:
    "A graph is a set of nodes and a set of edges joining pairs of them. In a graphical model the " +
    "nodes are random variables and the edges are direct dependence relationships, which turns a " +
    "combinatorial object into a statement about a joint distribution. The payoff is compression: a " +
    "joint over many variables that would need an astronomically large table can often be written as " +
    "a product of small local factors, and the graph is what makes that factorization visible.",

  sections: [
    {
      heading: "The object itself",
      blocks: [
        {
          kind: "prose",
          text:
            "A graph G = (V, E) is a set of vertices V (also called nodes) together with a set of " +
            "edges E, each edge joining a pair of vertices. Nothing probabilistic has been said yet — " +
            "at this stage a graph is pure combinatorics, the same object used for road networks and " +
            "social networks.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Node (vertex)",
              description:
                "In a graphical model, one random variable. A node for Rain, a node for Temperature.",
            },
            {
              term: "Edge",
              description:
                "A direct dependence between the two variables it joins. Crucially, the absence of an " +
                "edge is the informative part: it asserts a conditional independence.",
            },
            {
              term: "Neighbours",
              description: "The nodes joined to a given node by a single edge.",
            },
            {
              term: "Path",
              description:
                "A sequence of nodes each joined to the next. Paths are how dependence travels through " +
                "the graph, which is why d-separation is stated in terms of blocking paths.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Missing edges carry the information",
          text:
            "A fully connected graph says nothing — it permits every dependence, so it encodes no " +
            "constraint on the joint at all. Every edge you leave out is an assumption you are making, " +
            "and it is those assumptions that buy you the parameter savings. Reading a graphical model " +
            "means reading the gaps.",
        },
      ],
    },

    {
      heading: "Why a joint distribution needs a graph",
      blocks: [
        {
          kind: "prose",
          text:
            "Consider n binary variables. The joint distribution assigns a probability to each of the " +
            "2ⁿ possible configurations, and those probabilities must sum to 1, so the table has " +
            "2ⁿ − 1 free parameters. For n = 10 that is 1023 numbers; for n = 30 it is over a billion. " +
            "You cannot estimate them, store them, or reason about them.",
        },
        {
          kind: "formula",
          latex: "2ⁿ − 1 free parameters  vs.  Σᵢ (2^{|paᵢ|}) with a graph",
          caption:
            "Full table versus a factorization where each variable has only |paᵢ| direct influences",
        },
        {
          kind: "prose",
          text:
            "But most variables in a realistic model do not interact with most others directly. If " +
            "each variable depends directly on only a handful of neighbours, the joint factors into " +
            "small local pieces, and each piece needs only a few parameters. The graph is exactly the " +
            "record of which variables those are.",
        },
        {
          kind: "example",
          title: "The saving, concretely",
          problem:
            "Ten binary variables arranged in a chain: each Xᵢ depends directly only on Xᵢ₋₁. How many " +
            "parameters does the joint need?",
          steps: [
            "With no assumptions: 2¹⁰ − 1 = 1023 free parameters.",
            "With the chain structure: p(x₁,…,x₁₀) = p(x₁)·∏ᵢ₌₂ p(xᵢ | xᵢ₋₁).",
            "p(x₁) needs 1 parameter; each of the 9 conditionals p(xᵢ | xᵢ₋₁) is a 2×2 table with 2 free parameters.",
            "Total: 1 + 9 × 2 = 19.",
          ],
          answer:
            "19 parameters instead of 1023 — a 54× reduction, bought entirely by the missing edges.",
        },
      ],
    },

    {
      heading: "Two languages, one object",
      blocks: [
        {
          kind: "prose",
          text:
            "A graphical model sits at the intersection of graph theory and probability theory, and " +
            "neither half alone is enough to say what one is. The graph supplies a structural, purely " +
            "combinatorial object; the probabilistic semantics supply what that structure means about " +
            "the joint. Take away the graph and you have a factorization with no way to reason about it " +
            "visually; take away the probability and you have a drawing.",
        },
        {
          kind: "table",
          headers: ["Graph-theoretic notion", "Probabilistic meaning"],
          rows: [
            ["Node", "Random variable"],
            ["Edge", "Direct dependence"],
            ["Missing edge", "A conditional independence assumption"],
            ["Neighbourhood / parents", "What a variable's local factor conditions on"],
            ["Separation of two node sets", "Conditional independence of the corresponding variables"],
            ["Clique", "A group of variables sharing one potential function"],
          ],
          caption:
            "The dictionary that makes graph algorithms into inference algorithms and back again.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why the dictionary is worth its weight",
          text:
            "Because separation is a graph property, questions like “are X and Y independent given Z?” " +
            "become path-searching problems that can be answered without touching a single number. " +
            "That is the whole reason the field bothers with graphs rather than writing factorizations " +
            "down algebraically.",
        },
      ],
    },

    {
      heading: "What a graphical model is not",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "It is not a plot of your data",
          text:
            "A scatterplot's points are observations; a graphical model's nodes are variables. The " +
            "model has the same structure whether you have collected ten data points or ten million, " +
            "because it describes the dependence structure of the distribution, not the data drawn from " +
            "it. This is the single most common first-encounter confusion.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "An edge is not necessarily causation",
          text:
            "Even in a directed model, an arrow is a statement about conditional factorization, not " +
            "automatically about cause. Directed models are often *drawn* to follow a causal story " +
            "because that makes them easy to elicit from experts, but the probabilistic content is the " +
            "factorization. Causal claims need extra assumptions the graph alone does not supply.",
        },
        {
          kind: "list",
          items: [
            "A missing edge is an assumption, and a wrong one biases every inference downstream.",
            "The same joint distribution can often be represented by several different graphs, so a " +
              "graph is a chosen representation rather than a unique fact about the distribution.",
            "Graph structure can itself be learned from data, but structure learning is a much harder " +
              "problem than parameter estimation given a fixed structure.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "Ch. 8, Graphical Models — §8.0 introduction" },
    { source: "Murphy, Probabilistic Machine Learning: An Introduction", locator: "Ch. 4, Graphical Models" },
    { source: "Mathlingo assessment bank", locator: "assessments/gm-01-graphs-and-markov-structure.md" },
  ],
};
