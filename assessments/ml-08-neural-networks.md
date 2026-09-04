# Machine Learning Cluster 8 — Neural Networks

Perceptron, Neural Networks, Backpropagation (3 concepts). Same format as
[Cluster 1](ml-01-foundations.md). All three concepts were added to the graph for this sweep (see
`concepts.md`) — the graph previously had no representation of neural networks at all, despite
`variational-inference-vaes` already assuming one existed.

---

## Perceptron (`perceptron`)
*Prereq: Classification vs Regression · ancestors 4 · b₀ = 0.30*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.7 | Describe the perceptron. | a weighted sum of inputs plus a bias term, passed through a threshold (step) function to output a binary classification | — |
| R2 | recall | mcq | −0.45 | The perceptron's learning rule updates weights by: | a simple mistake-driven rule: if a point is misclassified, nudge the weights toward making that point's prediction more correct | claims it "uses calculus/gradients like modern methods" — the original perceptron rule predates and differs from gradient descent, though related in spirit → `perceptron` |
| A1 | apply | numeric | 0.1 | w=(1,−1), b=0. Classify x=(2,3) via sign(w·x+b). `[verified: score=-1]` | w·x+b = 2−3+0 = −1; sign(−1) = negative class | — |
| E1 | explain | short-answer | 0.8 | Describe the perceptron's famous XOR limitation and its historical consequence. | a single perceptron can only learn linearly separable patterns and cannot represent XOR, since no single straight line separates XOR's positive and negative cases; this limitation historically contributed to a decline in neural-network research (the "AI winter") until multi-layer networks were shown to overcome it *(required: names XOR specifically and the historical consequence)* | — |
| T1 | transfer | short-answer | 1.3 | Why is a single perceptron's decision boundary mathematically the same *kind* of object as logistic regression's or a linear SVM's boundary? | all three find some linear separating hyperplane; they differ mainly in *how* that boundary is trained (perceptron's mistake-driven update, logistic regression's likelihood-based gradient descent, SVM's margin maximization), not in the *form* of the boundary itself *(required: names all three training mechanisms as the actual difference)* | — |

*Coverage: 5 items, −0.7…1.3.*

---

## Neural Networks (`neural-networks`)
*Prereq: Perceptron, Matrix Calculus · ancestors 13 · b₀ = 0.82*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.18 | Describe a feedforward neural network. | multiple layers of perceptron-like units, each applying a weighted sum plus a *nonlinear* activation function, with one layer's output feeding the next | — |
| R2 | recall | mcq | 0.12 | Without a nonlinear activation between layers, stacking multiple linear layers is: | mathematically equivalent to a single linear layer | claims it's "more powerful than a single layer" — composing linear functions only ever gives another linear function → `neural-networks` |
| A1 | apply | derivation | 0.62 | Show that two layers with weights W₁, W₂ but no activation between them are equivalent to one layer with weight W₂W₁. `[verified: matrix composition is associative/trivial to check]` | applying W₁ then W₂ to input x gives W₂(W₁x)=(W₂W₁)x — exactly `matrix-multiplication`'s composition-of-linear-transformations fact, directly reused *(required: the explicit (W₂W₁)x derivation)* | — |
| E1 | explain | short-answer | 1.32 | State the Universal Approximation Theorem informally, and explain why deep (many-layer) networks are often preferred over wide-but-shallow ones despite it. | a sufficiently wide network with one hidden layer and a nonlinear activation can approximate any continuous function arbitrarily well; nonetheless, depth can represent certain functions far more efficiently — with exponentially fewer total parameters — than width alone can *(required: both the theorem statement and the efficiency argument for depth)* | — |
| T1 | transfer | short-answer | 1.82 | How does adding one hidden layer let a small network solve the XOR problem a single perceptron can't? | hidden units can learn intermediate, linearly-separable sub-patterns of the input (e.g. each hidden unit detects a different linear combination), and the output layer then combines those intermediate results — a composition of simple linear pieces that together represents a genuinely nonlinear function *(required: the "intermediate linearly-separable sub-patterns, combined" mechanism)* | — |

*Coverage: 5 items, −0.18…1.82.*

---

## Backpropagation (`backpropagation`)
*Prereq: Neural Networks, Gradient Descent · ancestors 16 · b₀ = 0.92*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.08 | Describe backpropagation. | an efficient algorithm computing the gradient of a network's loss with respect to every weight, using the chain rule, propagating backward from the output layer toward the input | — |
| R2 | recall | mcq | 0.22 | Backpropagation is: | the method used to *compute* the gradients that gradient descent then uses to update weights | treats it as "an alternative to gradient descent" — the two are complementary, not competing: one computes, the other applies → `backpropagation` |
| A1 | apply | short-answer | 0.72 | Why does computing the gradient for a weight in an early layer require the chain rule applied through every subsequent layer? | that early weight's effect on the final loss is mediated by everything that happens to its output as it passes through every later layer — the chain rule composes each layer's local derivative to trace that full path *(required: the "mediated through every later layer" argument)* | — |
| E1 | explain | short-answer | 1.42 | Why is backpropagation efficient compared to numerically perturbing each weight individually? | it computes *all* the gradients in roughly the cost of one forward pass, by carefully reusing intermediate computations through the chain rule — a naive perturb-and-recompute approach would need a separate forward pass per weight, astronomically slower for networks with millions of parameters *(required: the "one forward pass for all gradients" efficiency argument)* | — |
| T1 | transfer | short-answer | 1.92 | Describe the vanishing gradient problem and why it makes early layers of very deep networks learn slowly. | the chain rule multiplies many terms together across layers; if each term has magnitude less than 1, the product shrinks exponentially with depth, leaving early-layer gradients extremely small and their weights nearly frozen — motivating techniques like residual connections or activation functions (e.g. ReLU instead of sigmoid) chosen to mitigate the shrinkage *(required: the exponential-product mechanism and at least one named mitigation)* | — |

*Coverage: 5 items, −0.08…1.92.*

---

## Cluster misconception index

| Tag | Blame |
|---|---|
| perceptron learning rule confused with gradient-based methods | `perceptron` |
| stacked linear layers assumed more expressive than one linear layer | `neural-networks` |
| backpropagation and gradient descent treated as alternatives rather than complementary | `backpropagation` |
| vanishing gradients attributed to a single bad layer rather than the multiplicative chain | `backpropagation` |

**Cluster total: 15 items across 3 concepts.** All numeric/derivation claims verified, including the
direct reuse of `matrix-multiplication`'s composition-of-linear-transformations fact to prove that
un-activated stacked layers collapse to one.
