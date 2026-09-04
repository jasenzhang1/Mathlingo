import type { WikiArticle } from "../types";

/**
 * Machine Learning cluster 4 — the classic classifiers, organised around the one
 * distinction that explains most of their differences: what each model chooses
 * to estimate. Mirrors
 * `assessments/ml-04-generative-discriminative-and-classic-classifiers.md`.
 */

const generativeVsDiscriminative: WikiArticle = {
  conceptId: "generative-vs-discriminative-models",
  summary:
    "A discriminative model estimates P(y | x) — the boundary between classes — and nothing more. A " +
    "generative model estimates the joint P(x, y), usually via P(x | y) and P(y), and derives the " +
    "boundary from it with Bayes' rule. Modelling more than you need costs data and risks " +
    "misspecification; modelling exactly what you need costs you everything else you might have " +
    "done with the model.",

  sections: [
    {
      heading: "What each one estimates",
      blocks: [
        {
          kind: "formula",
          latex: "generative:  P(y | x) ∝ P(x | y) P(y)        discriminative:  P(y | x) directly",
          caption: "The generative route goes through Bayes' rule; the discriminative route skips it",
        },
        {
          kind: "table",
          headers: ["Model", "Family", "What it estimates"],
          rows: [
            ["Naive Bayes", "Generative", "P(x | y) with conditionally independent features, and P(y)"],
            ["LDA / QDA", "Generative", "Class-conditional Gaussians and class priors"],
            ["Gaussian mixture / HMM", "Generative", "A full joint density over observations"],
            ["Logistic regression", "Discriminative", "P(y | x) as a logistic function of a linear score"],
            ["SVM", "Discriminative", "A boundary only — not even a probability"],
            ["Random forest, boosted trees", "Discriminative", "P(y | x) from partitioned regions"],
          ],
        },
      ],
    },

    {
      heading: "The trade-off",
      blocks: [
        {
          kind: "callout",
          tone: "insight",
          title: "Ng and Jordan's result: the curves cross",
          text:
            "A generative model with a wrong-but-reasonable density assumption has higher asymptotic " +
            "error than its discriminative counterpart, but approaches that error much faster — its " +
            "assumptions substitute for data. So naive Bayes typically beats logistic regression on " +
            "small samples and loses to it on large ones. The right question is not which family is " +
            "better but where you sit on the sample-size axis.",
        },
        {
          kind: "list",
          items: [
            "Generative models can sample new x, handle missing features by marginalising them out, and detect out-of-distribution inputs — none of which a discriminative model can do.",
            "Discriminative models spend all their capacity on the boundary, so they are not penalised for getting the shape of the input density wrong far from it.",
            "Naive Bayes and logistic regression form a generative–discriminative pair: same parametric form for P(y | x), different fitting criterion.",
            "Class priors are explicit in a generative model, so re-weighting for a shifted prior is a one-line change rather than a refit.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "\"Generative\" here is not \"generative AI\"",
          text:
            "The term is older and narrower than its current popular use. It means the model " +
            "specifies a distribution over the inputs, which is a statement about what is estimated " +
            "— nothing about scale, neural architecture, or the ability to produce fluent text. A " +
            "two-parameter Gaussian per class is a generative model.",
        },
      ],
    },
  ],

  references: [
    { source: "Ng & Jordan, On Discriminative vs. Generative Classifiers", locator: "NIPS 14, 2001" },
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§1.5.4 and §4.3, Probabilistic Generative and Discriminative Models" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-04-generative-discriminative-and-classic-classifiers.md" },
  ],
};

const naiveBayes: WikiArticle = {
  conceptId: "naive-bayes",
  summary:
    "Naive Bayes applies Bayes' rule with one deliberately false simplification: that features are " +
    "conditionally independent given the class. That assumption reduces estimating a " +
    "d-dimensional density to estimating d one-dimensional ones, which is why the method works on " +
    "vocabulary-sized feature spaces with very little data.",

  sections: [
    {
      heading: "The rule and the assumption",
      blocks: [
        {
          kind: "formula",
          latex: "P(y | x₁…x_d) ∝ P(y) ∏ⱼ P(xⱼ | y)",
          caption: "The product over features is the \"naive\" step — everything else is Bayes' rule",
        },
        {
          kind: "prose",
          text:
            "Without the assumption you would need P(x₁ … x_d | y), a joint over all feature " +
            "combinations. For 1,000 binary features that is 2¹⁰⁰⁰ − 1 parameters per class. The " +
            "factorisation replaces it with 1,000 parameters per class, estimable from a few " +
            "thousand documents. The evidence P(x) in the denominator is dropped because it is the " +
            "same for every class and cannot change the argmax.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why a false assumption still classifies well",
          text:
            "Conditional independence is essentially always violated — \"New\" and \"York\" are not " +
            "independent given the topic. But classification needs only the correct argmax, not " +
            "correct probabilities. Double-counting correlated evidence pushes the estimated " +
            "posterior towards 0 or 1 without usually changing which class is on top. Naive Bayes " +
            "is a badly calibrated probability estimator and a surprisingly good classifier, and " +
            "those two facts are the same fact.",
        },
      ],
    },

    {
      heading: "Variants and mechanics",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Multinomial NB", description: "Features are counts. The standard for bag-of-words text classification." },
            { term: "Bernoulli NB", description: "Features are binary presence/absence, and explicit absence is informative." },
            { term: "Gaussian NB", description: "Continuous features, one Gaussian per feature per class — d means and d variances, no covariances." },
          ],
        },
        {
          kind: "example",
          title: "The zero-frequency problem",
          problem:
            "A word appears in no spam training document. What does the model predict for a new email containing it?",
          steps: [
            "P(word | spam) is estimated as 0/n = 0.",
            "The posterior is a product over features, so one zero factor annihilates the whole product.",
            "P(spam | email) = 0 regardless of how many other strong spam indicators are present.",
          ],
          answer:
            "Laplace (add-one) smoothing: P(word | y) = (count + α) / (total + α·V). One unseen word can no longer veto every other piece of evidence.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Work in log space",
          text:
            "Multiplying thousands of small probabilities underflows to exactly 0 in floating point. " +
            "Take logs and sum: argmax over log P(y) + Σⱼ log P(xⱼ | y) is the same argmax, computed " +
            "stably. Every real implementation does this.",
        },
      ],
    },
  ],

  references: [
    { source: "Manning, Raghavan & Schütze, Introduction to Information Retrieval", locator: "Ch. 13, Text Classification and Naive Bayes" },
    { source: "Murphy, Probabilistic Machine Learning: An Introduction", locator: "§9.3, Naive Bayes Classifiers" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-04-generative-discriminative-and-classic-classifiers.md" },
  ],
};

const lda: WikiArticle = {
  conceptId: "lda",
  summary:
    "Linear discriminant analysis models each class as a multivariate Gaussian and — crucially — " +
    "assumes they all share one covariance matrix. That single assumption is what makes the " +
    "decision boundary linear, and dropping it (QDA) makes the boundary quadratic. LDA doubles as " +
    "a supervised dimensionality reduction that maximises class separation.",

  sections: [
    {
      heading: "The model",
      blocks: [
        {
          kind: "formula",
          latex: "x | y = k  ~  N(μₖ, Σ)      δₖ(x) = xᵀΣ⁻¹μₖ − ½μₖᵀΣ⁻¹μₖ + log πₖ",
          caption: "Shared Σ across classes; the discriminant δₖ is linear in x",
        },
        {
          kind: "prose",
          text:
            "Assign x to whichever class has the largest δₖ(x). The quadratic term xᵀΣ⁻¹x appears in " +
            "every class's discriminant identically when Σ is shared, so it cancels in every " +
            "pairwise comparison and the boundary is a hyperplane. Let each class keep its own Σₖ " +
            "and the cancellation fails — that is QDA, and its boundaries are conic sections.",
        },
        {
          kind: "table",
          headers: ["", "LDA", "QDA"],
          rows: [
            ["Covariance", "One shared Σ", "One Σₖ per class"],
            ["Boundary", "Linear", "Quadratic"],
            ["Parameters", "≈ d(d+1)/2 + Kd", "≈ K·d(d+1)/2 + Kd"],
            ["Prefers", "Small n, many features, similar class spreads", "Large n, genuinely different class shapes"],
          ],
        },
      ],
    },

    {
      heading: "LDA as dimensionality reduction",
      blocks: [
        {
          kind: "prose",
          text:
            "The same machinery yields at most K − 1 discriminant directions that maximise the ratio " +
            "of between-class scatter to within-class scatter. Those directions are what you plot " +
            "when you want a low-dimensional picture in which the classes are as separated as a " +
            "linear projection can make them.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "LDA and PCA answer different questions",
          text:
            "PCA finds the directions of maximum total variance and never looks at the labels; LDA " +
            "finds directions of maximum class separation and is meaningless without them. On data " +
            "where the largest variance runs along the class boundary rather than across it, PCA's " +
            "top component can be exactly the least useful direction for classification while LDA's " +
            "is the best. Supervised versus unsupervised, in one picture.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The shared-covariance assumption is testable and often wrong",
          text:
            "If one class is a tight cluster and another is diffuse, forcing a common Σ splits the " +
            "difference and puts the boundary in the wrong place. QDA fixes it if you have the data " +
            "to estimate K covariance matrices; regularised discriminant analysis shrinks each Σₖ " +
            "towards the pooled Σ and interpolates between them when you do not.",
        },
        {
          kind: "prose",
          text:
            "Note also the acronym collision: this LDA is linear discriminant analysis, a supervised " +
            "classifier. Latent Dirichlet allocation, an unsupervised topic model, shares the " +
            "initials and nothing else.",
        },
      ],
    },
  ],

  references: [
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§4.3, Linear Discriminant Analysis" },
    { source: "James et al., An Introduction to Statistical Learning", locator: "§4.4, Generative Models for Classification" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-04-generative-discriminative-and-classic-classifiers.md" },
  ],
};

const knn: WikiArticle = {
  conceptId: "knn",
  summary:
    "K-nearest-neighbours predicts by looking up the k closest training points and letting them " +
    "vote or average. There is no training phase and no fitted parameters — the training data is " +
    "the model — which makes it the cleanest illustration of both the power and the failure modes " +
    "of purely local methods.",

  sections: [
    {
      heading: "The algorithm",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Compute the distance from the query point to every training point.",
            "Take the k smallest.",
            "Classification: majority vote among those k. Regression: their mean (or a distance-weighted mean).",
          ],
        },
        {
          kind: "prose",
          text:
            "Fitting is O(1) — you store the data. Prediction is O(nd) per query with a naive scan, " +
            "which is the reverse of most models and matters enormously in deployment. KD-trees and " +
            "ball trees reduce this in low dimensions; in high dimensions they degrade to the linear " +
            "scan, which is the curse of dimensionality arriving in the form of an engineering bill.",
        },
      ],
    },

    {
      heading: "What k controls",
      blocks: [
        {
          kind: "table",
          headers: ["k", "Boundary", "Bias", "Variance"],
          rows: [
            ["1", "Highly irregular; every training point is its own island", "Lowest", "Highest"],
            ["Moderate", "Smooth, follows the data", "Moderate", "Moderate"],
            ["n", "Constant — predicts the global majority everywhere", "Highest", "Zero"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "k = 1 has zero training error and tells you nothing",
          text:
            "Every training point is its own nearest neighbour at distance 0, so 1-NN reproduces the " +
            "training labels exactly — including mislabelled ones. This is the purest available " +
            "demonstration that training error is not evidence of generalisation, and it is why k " +
            "must be chosen by cross-validation rather than by fit.",
        },
        {
          kind: "prose",
          text:
            "For binary classification, choose k odd to avoid ties. As n → ∞ with k → ∞ and k/n → 0, " +
            "k-NN is consistent — it converges to the Bayes-optimal classifier. The rate at which it " +
            "does so is what the curse of dimensionality destroys.",
        },
      ],
    },

    {
      heading: "The two things that break it",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Unscaled features silently choose the metric for you",
          text:
            "With income in dollars (~10⁴) and age in years (~10¹), Euclidean distance is income " +
            "distance plus rounding error. The model has not decided income matters more; the units " +
            "have. Standardise before computing any distance, every time — and note that this is " +
            "not a step trees ever need, which is a real reason to prefer them on messy raw data.",
        },
        {
          kind: "example",
          title: "Why k-NN dies in high dimensions",
          problem: "In 100 dimensions, how local is a neighbourhood containing 1% of the data?",
          steps: [
            "A hypercube capturing fraction r of a unit cube has side r^(1/d).",
            "0.01^(1/100) = e^{ln(0.01)/100} ≈ e^{−0.046} ≈ 0.955.",
            "The \"neighbourhood\" spans 95% of every axis.",
          ],
          answer:
            "Nothing local remains. The k nearest neighbours are barely nearer than random points, so the vote is close to a global prior — which is why dimensionality reduction is usually a prerequisite for k-NN, not an optimisation.",
        },
      ],
    },
  ],

  references: [
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§2.3.2 and §13.3, k-Nearest-Neighbor Classifiers" },
    { source: "James et al., An Introduction to Statistical Learning", locator: "§2.2.3 and §3.5, KNN" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-04-generative-discriminative-and-classic-classifiers.md" },
  ],
};

const svm: WikiArticle = {
  conceptId: "svm",
  summary:
    "A support vector machine finds the separating hyperplane with the largest margin — the widest " +
    "gap to the nearest points of either class. The solution depends only on those nearest points, " +
    "the support vectors, and the optimisation is expressible entirely in inner products, which is " +
    "what lets the kernel trick apply.",

  sections: [
    {
      heading: "Maximum margin",
      blocks: [
        {
          kind: "formula",
          latex: "min ½‖w‖²  subject to  yᵢ(wᵀxᵢ + b) ≥ 1 ∀i",
          caption: "The hard-margin primal: margin = 2/‖w‖, so minimising ‖w‖ maximises the margin",
        },
        {
          kind: "prose",
          text:
            "Infinitely many hyperplanes separate a linearly separable dataset; the SVM picks the " +
            "one furthest from both classes. The motivation is generalisation: a boundary that sits " +
            "in the middle of the gap tolerates the most perturbation of the data before it starts " +
            "making mistakes, and margin-based bounds make that intuition quantitative.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Only the support vectors matter",
          text:
            "In the dual solution, every training point carries a coefficient αᵢ, and αᵢ = 0 for " +
            "every point outside the margin. Delete all of those and refit: the boundary is " +
            "identical. This sparsity is why SVMs are memory-efficient at prediction time and why " +
            "they are far less sensitive to distant outliers than, say, logistic regression.",
        },
      ],
    },

    {
      heading: "Soft margins and C",
      blocks: [
        {
          kind: "formula",
          latex: "min ½‖w‖² + C Σᵢ ξᵢ,   yᵢ(wᵀxᵢ + b) ≥ 1 − ξᵢ,  ξᵢ ≥ 0",
          caption: "Slack variables ξᵢ let points violate the margin at a price C per unit",
        },
        {
          kind: "table",
          headers: ["C", "Margin", "Violations tolerated", "Behaviour"],
          rows: [
            ["Large", "Narrow", "Few", "Tries hard to classify every training point — low bias, high variance"],
            ["Small", "Wide", "Many", "Accepts errors for a broader margin — high bias, low variance"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "C is inverse regularisation, and the direction trips people constantly",
          text:
            "Large C means *less* regularisation, because C is the price of violating the margin. " +
            "It is the reciprocal of the λ you know from ridge regression. Getting this backwards " +
            "turns a hyperparameter sweep into an exercise in choosing the most overfit model in " +
            "the grid.",
        },
      ],
    },

    {
      heading: "The dual, and why it opens the door to kernels",
      blocks: [
        {
          kind: "formula",
          latex: "max Σᵢ αᵢ − ½ ΣᵢΣⱼ αᵢαⱼ yᵢyⱼ ⟨xᵢ, xⱼ⟩,  0 ≤ αᵢ ≤ C,  Σᵢ αᵢyᵢ = 0",
          caption: "The data enters only through inner products ⟨xᵢ, xⱼ⟩",
        },
        {
          kind: "prose",
          text:
            "Because the training inputs appear nowhere except inside an inner product, replacing " +
            "⟨xᵢ, xⱼ⟩ with a kernel K(xᵢ, xⱼ) fits a maximum-margin hyperplane in whatever feature " +
            "space that kernel corresponds to — without ever computing the mapping. That is the " +
            "kernel trick, and the SVM is its most famous consumer. The hinge loss " +
            "max(0, 1 − y f(x)) is the unconstrained form of the same objective.",
        },
        {
          kind: "list",
          items: [
            "SVMs output a signed distance, not a probability. Platt scaling fits a logistic function to that score when probabilities are needed.",
            "Intrinsically binary: multiclass is handled by one-vs-one or one-vs-rest wrappers.",
            "Training is roughly O(n²)–O(n³), so SVMs are a poor fit for very large n; linear SVMs with specialised solvers scale far better.",
            "Features must be scaled — the margin is measured in the input metric.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "Ch. 12, Support Vector Machines and Flexible Discriminants" },
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§7.1, Maximum Margin Classifiers" },
    { source: "Schölkopf & Smola, Learning with Kernels", locator: "Ch. 7, Pattern Recognition" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-04-generative-discriminative-and-classic-classifiers.md" },
  ],
};

const svmsForRegression: WikiArticle = {
  conceptId: "svms-for-regression",
  summary:
    "Support vector regression keeps the SVM's machinery and inverts its geometry: instead of a " +
    "margin that must contain no points, it fits a tube of width ε that should contain as many " +
    "points as possible. Errors inside the tube cost nothing, which is what preserves the sparse, " +
    "support-vector-only solution.",

  sections: [
    {
      heading: "The ε-insensitive tube",
      blocks: [
        {
          kind: "formula",
          latex: "L_ε(y, f(x)) = max(0, |y − f(x)| − ε)",
          caption: "Zero loss inside the tube; linear in the excess outside it",
        },
        {
          kind: "prose",
          text:
            "Squared error charges for every deviation, however small, so every training point " +
            "influences the fit and none can be discarded. The ε-insensitive loss charges nothing " +
            "until the error exceeds ε. Points strictly inside the tube therefore have zero " +
            "coefficient, and only the points on or outside the boundary — the support vectors — " +
            "determine the function.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The classification margin and the regression tube are mirror images",
          text:
            "In classification the margin is a corridor that should be *empty*: points inside it are " +
            "penalised. In regression the tube is a corridor that should be *full*: points inside it " +
            "are free and points outside are penalised. Same optimisation, same duality, same " +
            "kernel trick — the sign of what counts as a violation is flipped.",
        },
      ],
    },

    {
      heading: "The three hyperparameters",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "ε — tube width", description: "How much error is free. Larger ε means fewer support vectors, a simpler and flatter fit, and a deliberate refusal to chase noise." },
            { term: "C — violation cost", description: "The price of leaving the tube. As in classification, large C means less regularisation." },
            { term: "Kernel (and its parameters)", description: "Linear, polynomial, or RBF. Exactly the same choice as in classification, with the same consequences for flexibility." },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "ε has units, so it must be set on a scaled target",
          text:
            "An ε of 0.1 means one thing when y is a probability and something else entirely when y " +
            "is a house price in dollars. Standardise the target, or choose ε from the noise scale " +
            "you actually expect — the default in most libraries is a value, not a judgement about " +
            "your data.",
        },
        {
          kind: "prose",
          text:
            "SVR inherits the SVM's robustness to outliers: the loss is linear rather than quadratic " +
            "beyond the tube, so an extreme point pulls the fit far less than it would under squared " +
            "error. It also inherits the poor scaling in n, which is why gradient-boosted trees " +
            "displaced it for most large tabular regression problems.",
        },
      ],
    },
  ],

  references: [
    { source: "Smola & Schölkopf, A Tutorial on Support Vector Regression", locator: "Statistics and Computing 14, 2004" },
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§7.1.4, SVMs for Regression" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-04-generative-discriminative-and-classic-classifiers.md" },
  ],
};

export const ml04ClassicClassifiers: WikiArticle[] = [
  generativeVsDiscriminative,
  naiveBayes,
  lda,
  knn,
  svm,
  svmsForRegression,
];
