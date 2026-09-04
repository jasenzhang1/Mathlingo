# Graphical Models Cluster 1 — Graphs & Markov Structure

Graphs, Directed vs Undirected Graphs, Conditional Independence and D-Separation, Markov Random
Fields, Markov Chains, Hidden Markov Models (6 concepts). Same format as
[foundations-of-probability.md](foundations-of-probability.md).

`markov-chains`' R2 reuses `eigenvalues-eigenvectors`' original T1 example (the stationary
distribution as an eigenvector) directly, and its E1 connects long-run mixing speed to
`matrix-stability`'s spectral-radius argument from the linear-algebra sweep.

---

## Graphs (`graphs`)
*Prereq: Set Theory · ancestors 1 · b₀ = −0.15*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −1.15 | Define a graph, and what nodes/edges represent in a graphical model. | a set of nodes (vertices) and edges connecting pairs of them; in graphical models, nodes are random variables and edges are dependence relationships | — |
| R2 | recall | mcq | −0.9 | A graphical model's primary purpose is to: | compactly represent the conditional independence structure among many variables, avoiding writing out the full joint distribution | claims it's "to visualize data points directly (like a scatterplot)" — a graphical model encodes dependence structure, not raw data → `graphs` |
| A1 | apply | short-answer | −0.35 | A joint over 10 binary variables needs up to 1023 free parameters with no independence assumed. How does encoding independence via a graph reduce this? | if each variable depends directly only on a few others (its graph neighbors), the joint factors into small local pieces, each needing far fewer parameters than the full joint table — the graph makes this sparsity of dependence explicit *(required: the factorization-from-sparsity argument)* | — |
| E1 | explain | short-answer | 0.35 | Why is a graph structure a natural fit for specifying high-dimensional joint distributions? | each variable typically depends directly on only a few others (its "neighbors"), and the graph makes this sparsity of dependence explicit and visually clear, rather than leaving it implicit in a giant table *(required)* | — |
| T1 | transfer | short-answer | 0.85 | Why is a graphical model said to sit at the intersection of graph theory and probability theory? | the graph provides a purely combinatorial/structural object (nodes, edges), while the probabilistic interpretation (conditional independence, factorization of the joint) gives that structure its statistical meaning — neither half alone captures what a graphical model is *(required: names both halves as jointly necessary)* | — |

*Coverage: 5 items, −1.15…0.85.*

---

## Directed vs Undirected Graphs (`directed-vs-undirected-graphs`)
*Prereq: Graphs · ancestors 2 · b₀ = 0.05*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.95 | Distinguish directed and undirected graphs, and their probabilistic model names. | directed: edges have direction, often causal/generative — "Bayesian networks"; undirected: edges are symmetric — "Markov random fields" | — |
| R2 | recall | mcq | −0.65 | A directed edge A→B typically suggests: | B's distribution depends on (is conditioned on) A — A is a "parent" of B | claims "A and B are statistically independent" — the opposite of what a directed edge indicates → `directed-vs-undirected-graphs` |
| A1 | apply | short-answer | −0.1 | A graph has Rain→WetGrass and Sprinkler→WetGrass. What does this imply about computing P(WetGrass)? | it must be conditioned on both parents: P(WetGrass\|Rain, Sprinkler) — the graph structure specifies exactly which variables the conditional distribution depends on | — |
| E1 | explain | short-answer | 0.6 | Why must directed graphical models be acyclic (DAGs) for a sensible probabilistic interpretation? | a directed cycle (A causes B causes A) would make it impossible to write the joint as a well-defined product of conditionals — you'd need to condition on something that itself depends on what you're computing; acyclicity is exactly what guarantees such a factorization exists *(required: the circular-conditioning problem specifically)* | — |
| T1 | transfer | short-answer | 1.1 | Describe the "v-structure" issue in converting between directed and undirected representations. | two parents A, B pointing to the same child C, with no direct A–B edge, encodes that A and B are marginally independent but become dependent once C is conditioned on ("explaining away") — a subtlety undirected graphs, which only encode symmetric-looking relationships, cannot represent as naturally *(required: names the marginal-independence/conditional-dependence asymmetry)* — foreshadows `conditional-independence-d-separation` directly | — |

*Coverage: 5 items, −0.95…1.1.*

---

## Conditional Independence and D-Separation (`conditional-independence-d-separation`)
*Prereq: Directed vs Undirected Graphs, Independence (Set Theory), Conditional Probability · ancestors 8 · b₀ = 0.60*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.4 | Describe d-separation. | a graphical criterion for reading conditional independence directly off a DAG's structure, with no numerical computation — d-separated nodes are conditionally independent given the separating set | — |
| R2 | recall | mcq | −0.1 | The "explaining away" pattern (two parents A, B of child C, no A–B edge) means: | A and B are marginally independent but become dependent once C is observed | resolves `directed-vs-undirected-graphs`'s T1 cliffhanger incorrectly, e.g. claiming "A and B are always independent regardless of whether C is observed" → `conditional-independence-d-separation` |
| A1 | apply | short-answer | 0.4 | Burglary (A) and Earthquake (B) can each independently trigger an Alarm (C). Given the alarm rang and you then learn there was an earthquake, does burglary become more or less likely? | less likely — the earthquake "explains away" the alarm, making burglary a less necessary explanation, a vivid illustration of dependence induced between A and B once C is observed, despite A and B being marginally independent *(required: the explicit "less likely" direction with the explaining-away reasoning)* | — |
| E1 | explain | short-answer | 1.1 | State the d-separation rule for a "collider" (A→C←B), contrasting it with a simple chain (A→C→B). | A and B are d-connected (dependent) when conditioning on C (or any descendant of C), but d-separated when C is not conditioned on — the exact opposite of a chain, where conditioning on C *blocks* dependence between A and B rather than creating it *(required: both structures and their opposite conditioning behavior)* | — |
| T1 | transfer | short-answer | 1.6 | Why can conditioning on the wrong variable actually introduce a spurious association between originally independent variables? | conditioning on a collider (rather than a genuine confounder) induces exactly the dependence described in A1/E1 between variables that were marginally independent — known as collider bias or Berkson's paradox, a genuinely important and often-violated principle in observational data analysis *(required: names collider bias/Berkson's paradox and the collider-vs-confounder distinction)* | — |

*Coverage: 5 items, −0.4…1.6.*

---

## Markov Random Fields (`markov-random-fields`)
*Prereq: Conditional Independence and D-Separation · ancestors 9 · b₀ = 0.65*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.35 | Describe a Markov Random Field's defining property. | a node is conditionally independent of all other nodes given its immediate neighbors — the "Markov blanket" for an undirected graph is exactly its neighbor set | — |
| R2 | recall | mcq | −0.05 | MRFs are often preferred for spatial/symmetric dependence (neighboring pixels) because: | spatial relationships have no natural direction — undirected edges capture this symmetry naturally | claims "MRFs always require fewer parameters" — not a general guarantee, and not the actual motivating reason → `markov-random-fields` |
| A1 | apply | short-answer | 0.45 | Why would modeling neighboring image pixels with a *directed* graph feel awkward? | it would force an arbitrary choice of which pixel "causes" which, when spatial adjacency has no genuine directionality — directly the lack-of-natural-direction point from R2 *(required: connects explicitly to R2)* | — |
| E1 | explain | short-answer | 1.15 | State the Hammersley-Clifford theorem informally. | an MRF's joint distribution factors as a product of "potential functions" over cliques (fully-connected subsets) of the graph — the undirected analog of a Bayesian network's product-of-conditionals factorization, without any directional/causal interpretation attached to each factor *(required: names cliques and the lack of causal interpretation)* | — |
| T1 | transfer | short-answer | 1.65 | Why is a Markov chain a special, simple case of an MRF? | a chain-structured graph (X₁–X₂–X₃–⋯–Xₙ, each connected only to immediate neighbors in a linear sequence) has the Markov property (future depends on past only through the present) exactly matching MRFs' "conditionally independent given neighbors" property, applied to this specific linear graph structure *(required: the explicit graph-structure-to-Markov-property mapping)* | — |

*Coverage: 5 items, −0.35…1.65.*

---

## Markov Chains (`markov-chains`)
*Prereq: Directed vs Undirected Graphs, Conditional Probability · ancestors 7 · b₀ = 0.54*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.46 | State the Markov property. | P(X_{n+1}\|Xₙ,…,X₁) = P(X_{n+1}\|Xₙ) — the future depends on the past only through the present state | — |
| R2 | recall | mcq | −0.16 | The stationary distribution π (if it exists) satisfies: | π = πP — π is a left eigenvector of the transition matrix P with eigenvalue 1 | claims "π is always uniform" — only true for special transition matrices, not in general → `markov-chains` |
| A1 | apply | short-answer | 0.34 | Why is finding a Markov chain's stationary distribution a direct application of `eigenvalues-eigenvectors`? | this is the exact fact that concept's own T1 introduced: finding π is finding the left eigenvector of the transition matrix with eigenvalue 1, a direct reuse rather than a fresh technique *(required: the explicit callback to that earlier item)* | — |
| E1 | explain | short-answer | 1.04 | How does `matrix-stability`'s spectral-radius logic govern a Markov chain's convergence to its stationary distribution? | eigenvalues of the transition matrix other than the guaranteed eigenvalue 1 determine how fast the chain converges — eigenvalues close to 1 in magnitude mean slow "mixing," eigenvalues far from 1 mean fast convergence, the same eigenvalue-magnitude-governs-long-run-behavior logic from `matrix-stability` *(required: the direct callback to that concept's spectral-radius argument)* | — |
| T1 | transfer | short-answer | 1.54 | How does MCMC connect the abstract theory of stationary distributions to a practical computational technique? | MCMC constructs a Markov chain whose stationary distribution is exactly the target posterior one wants to sample from, converting the abstract R1/R2 theory into a genuinely practical, widely-used tool for sampling from complex distributions *(required: names that the chain's stationary distribution is engineered to match the target)* | — |

*Coverage: 5 items, −0.46…1.54.*

---

## Hidden Markov Models (`hmm`)
*Prereq: Markov Chains, Joint Distribution · ancestors 10 · b₀ = 0.70*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.3 | Describe an HMM's structure. | a Markov chain of hidden states, where each state probabilistically generates an observed "emission"; the observer sees only emissions, not the hidden states | — |
| R2 | recall | mcq | 0.0 | "Hidden" in HMM refers to: | the underlying state sequence being unobserved — only emissions are directly observed | claims "the emissions being hidden" — backwards; emissions are exactly what's observed → `hmm` |
| A1 | apply | short-answer | 0.5 | A person's true mood (hidden) influences observed activities (emissions). Why is inferring the mood sequence from only the activity sequence the central HMM inference problem? | this is exactly the "decoding" problem — recovering the most likely hidden state sequence given only observed emissions — solved by the Viterbi algorithm; it's the defining inference task an HMM is built to answer *(required: names decoding/Viterbi specifically)* | — |
| E1 | explain | short-answer | 1.2 | Why does an HMM's joint distribution factor into transition and emission probabilities? | this is a direct application of `joint-distribution`'s factorization ideas, structured according to the specific dependence pattern an HMM assumes: each hidden state depends only on the previous hidden state (transition), and each emission depends only on its own hidden state (emission) *(required: names both factor types and their dependence pattern)* | — |
| T1 | transfer | short-answer | 1.7 | Why are HMMs considered a general-purpose modeling tool rather than a speech-specific technique? | the same "latent state generates a noisy observation" structure appears across many applications — gene sequence analysis, financial regime-switching models, part-of-speech tagging — all sharing the identical hidden/emission structure that made HMMs foundational for speech recognition originally *(required: at least two concrete non-speech applications)* | — |

*Coverage: 5 items, −0.3…1.7.*

---

## Cluster misconception index

| Tag | Blame |
|---|---|
| graphical models mistaken for data visualization tools | `graphs` |
| directed edge direction misread as independence | `directed-vs-undirected-graphs` |
| explaining-away resolved in the wrong direction | `conditional-independence-d-separation` |
| collider bias unrecognized when conditioning on the wrong variable | `conditional-independence-d-separation` |
| MRF's motivation reduced to "fewer parameters" rather than the lack of natural direction | `markov-random-fields` |
| stationary distribution assumed uniform | `markov-chains` |
| HMM's "hidden" label misapplied to emissions rather than states | `hmm` |

**Cluster total: 30 items across 6 concepts.** This cluster is conceptually dense (structural graph
reasoning) rather than numerically heavy; the classic burglar-alarm "explaining away" example is
Pearl's standard illustration, reused verbatim as it's the clearest concrete instance of the phenomenon.
