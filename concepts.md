# Concepts Catalog

This is the running list of every concept Mathlingo teaches (or plans to teach), grouped by domain.
It mirrors `web/src/data/concepts.ts`, which is the source of truth the app actually reads from — the concept map on the homepage, the per-concept pages, and the prerequisite graph are all generated from that file.

When adding a new concept: add it to `web/src/data/concepts.ts` (id, title, domain, blurb, prerequisites, and an `embedUrl` once a lesson exists), then update this file to match.

**Total: 292 concepts listed here.** `concepts.ts` currently holds 306: this file's Python for Data
Work section still lists the original 8 concepts and has not been updated for the 14 added when that
chapter was expanded. Every other domain matches.

## Probability (56)

| Concept | Prerequisites | Lesson |
|---|---|---|
| Set Theory | — | — |
| PIE, Boole's Inequality | Set Theory | — |
| Sigma Algebra | Set Theory | — |
| Axioms of Probability | Sigma Algebra | — |
| Probability Function | Axioms of Probability | — |
| Counting Methods | Set Theory | — |
| Binomial Theorem | Counting Methods | — |
| Conditional Probability | Probability Function | — |
| Bayes' Rule | Conditional Probability | — |
| Independence (Set Theory) | Probability Function | — |
| Mutual Independence | Independence (Set Theory) | — |
| Random Variables | Probability Function | — |
| Discrete vs Continuous Random Variables | Random Variables | — |
| Cumulative Distribution Function (CDF) | Random Variables | — |
| Probability Mass Function (PMF) | Discrete vs Continuous Random Variables, Cumulative Distribution Function (CDF) | — |
| Probability Density Function (PDF) | Discrete vs Continuous Random Variables, Cumulative Distribution Function (CDF) | — |
| Bernoulli and Binomial Distributions | Probability Mass Function (PMF), Binomial Theorem, Mutual Independence, Expectation, Variance | ✅ |
| Poisson Distribution | Bernoulli and Binomial Distributions | — |
| Hypergeometric Distribution | Counting Methods, Probability Mass Function (PMF), Expectation, Variance | — |
| Geometric Distribution | Bernoulli and Binomial Distributions | — |
| Negative Binomial Distribution | Geometric Distribution | — |
| Normal Distribution | Probability Density Function (PDF), Expectation, Variance | — |
| Uniform Distribution | Probability Density Function (PDF), Expectation, Variance | — |
| Exponential Distribution | Probability Density Function (PDF), Poisson Distribution | — |
| Gamma Distribution | Exponential Distribution | — |
| Beta Distribution | Gamma Distribution | — |
| Chi Square Distribution | Normal Distribution, Gamma Distribution | — |
| Student's t-Distribution | Normal Distribution, Chi Square Distribution | — |
| F-Distribution | Chi Square Distribution | — |
| Expectation | Probability Mass Function (PMF), Probability Density Function (PDF) | — |
| Variance | Expectation | — |
| Joint Distribution | Random Variables | — |
| Marginal Distribution | Joint Distribution | — |
| Conditional Distribution | Joint Distribution, Conditional Probability | — |
| Covariance | Expectation, Joint Distribution | — |
| Law of Total Expectation | Expectation, Conditional Distribution | — |
| Moment Generating Function (MGF) | Expectation | — |
| MGF Properties and Applications | Moment Generating Function (MGF) | — |
| Likelihood vs Probability | Probability Function, Probability Mass Function (PMF), Probability Density Function (PDF) | — |
| Method of Moments Estimation | Expectation | — |
| Maximum Likelihood Estimation | Likelihood vs Probability | — |
| Unbiased Estimator | Maximum Likelihood Estimation, Method of Moments Estimation | — |
| Distribution Transformations | Probability Density Function (PDF), Probability Mass Function (PMF) | — |
| Exponential Family | Probability Mass Function (PMF), Probability Density Function (PDF), Moment Generating Function (MGF) | — |
| Power | Hypothesis Test, Type I and Type II Error | — |
| Sufficient Statistic | Likelihood vs Probability, Maximum Likelihood Estimation | — |
| Correlation | Covariance, Variance | — |
| Law of Total Variance | Variance, Law of Total Expectation | — |
| Markov's Inequality | Expectation | — |
| Chebyshev's Inequality | Markov's Inequality, Variance | — |
| Jensen's Inequality | Expectation | — |
| Modes of Convergence | Random Variables | — |
| Law of Large Numbers | Modes of Convergence, Chebyshev's Inequality | — |
| Order Statistics | Cumulative Distribution Function (CDF), Random Variables | — |
| Fisher Information | Likelihood vs Probability, Maximum Likelihood Estimation | — |
| Cramér–Rao Lower Bound | Fisher Information, Unbiased Estimator | — |

## Linear Algebra (54)

| Concept | Prerequisites | Lesson |
|---|---|---|
| Vectors | — | — |
| Vector Operations | Vectors | — |
| Dot Product | Vector Operations | — |
| Vector Norm | Dot Product | — |
| Cauchy-Schwarz Inequality | Dot Product, Vector Norm | — |
| Vector Angles | Cauchy-Schwarz Inequality | — |
| Vector Projection | Dot Product, Vector Norm | — |
| Linear Dependence | Vector Operations | — |
| Orthogonal Vectors | Dot Product | — |
| Matrix Multiplication | Vector Operations | — |
| Matrices | Matrix Multiplication | — |
| Trace | Matrices | — |
| Linear Transformations | Matrices | — |
| Matrix Calculus (Gradients & Jacobians) | Linear Transformations, Vector Norm | — |
| Vector Spaces | Vector Operations | — |
| Span | Vector Spaces, Linear Dependence | — |
| Basis | Span, Linear Dependence | — |
| Change of Basis | Basis, Linear Transformations | — |
| Four Fundamental Subspaces | Linear Transformations, Vector Spaces | — |
| Column Space | Four Fundamental Subspaces | — |
| Null Space | Four Fundamental Subspaces | — |
| Row Space | Four Fundamental Subspaces | — |
| Left Null Space | Four Fundamental Subspaces | — |
| Matmul on Four Fundamental Subspaces | Column Space, Null Space, Row Space, Left Null Space | — |
| Disjointness of Four Fundamental Subspaces | Matmul on Four Fundamental Subspaces | — |
| Rank | Column Space, Row Space | — |
| Rank-Nullity Theorem | Rank, Null Space | — |
| Orthonormal Basis | Basis, Orthogonal Vectors | — |
| Gram-Schmidt Algorithm | Orthonormal Basis | — |
| QR Decomposition | Gram-Schmidt Algorithm | — |
| Invertible Matrices | Rank, Matrices | — |
| LU Decomposition | Invertible Matrices | — |
| Determinant | Matrices | — |
| Determinant Properties | Determinant | — |
| Eigenvalues and Eigenvectors | Invertible Matrices, Determinant | — |
| Diagonalization | Eigenvalues and Eigenvectors | — |
| Eigendecomposition | Diagonalization | — |
| Symmetric Matrices | Matrices | — |
| Spectral Theorem | Symmetric Matrices, Eigendecomposition, Orthonormal Basis | — |
| Orthogonal Matrices | Orthonormal Basis | — |
| Positive Definite Matrices | Symmetric Matrices, Eigenvalues and Eigenvectors | — |
| Cholesky Decomposition | Positive Definite Matrices | — |
| Schur Complement | Invertible Matrices | — |
| Singular Value Decomposition (SVD) | Positive Definite Matrices, Eigendecomposition | — |
| Uniqueness of SVD | Singular Value Decomposition (SVD) | — |
| SVD and Four Fundamental Subspaces | Singular Value Decomposition (SVD), Four Fundamental Subspaces | — |
| Moore-Penrose Inverse | Singular Value Decomposition (SVD) | — |
| Rayleigh Quotient | Symmetric Matrices, Eigenvalues and Eigenvectors | — |
| Principal Component Analysis (Matrix Edition) | Singular Value Decomposition (SVD), Rayleigh Quotient, Covariance | — |
| Eckart-Young Theorem | Singular Value Decomposition (SVD) | — |
| Matrix Norms | Vector Norm | — |
| Matrix Stability | Eigenvalues and Eigenvectors, Matrix Norms | — |
| Kronecker Product | Matrix Multiplication | — |
| Subspace Operations | Vector Spaces, Span | — |

## Multivariate & Asymptotics (11)

| Concept | Prerequisites | Lesson |
|---|---|---|
| Change of Variables (Jacobian) | Probability Density Function (PDF), Determinant | — |
| Covariance Matrix | Covariance, Variance, Positive Definite Matrices | — |
| Bivariate Normal | Normal Distribution, Covariance, Change of Variables (Jacobian) | — |
| Multivariate Normal | Bivariate Normal, Covariance Matrix, Eigendecomposition | — |
| Multivariate MGF | Moment Generating Function (MGF), MGF Properties and Applications, Multivariate Normal, Covariance Matrix, Mutual Independence | — |
| Pearson Correlation | Correlation, Sample Variance | — |
| Quadratic Forms in Random Vectors | Multivariate Normal, Covariance Matrix, Trace, Rank, Chi Square Distribution | — |
| Cochran's Theorem | Quadratic Forms in Random Vectors, Mutual Independence, Sample Variance, t-Distribution | — |
| Distribution of β̂ | Cochran's Theorem, Multivariate MGF, Linear Regression (Probabilistic Version), Geometric Interpretation of OLS, F-Distribution | — |
| Central Limit Theorem | Modes of Convergence, Moment Generating Function (MGF), Law of Large Numbers, Normal Distribution, Mutual Independence | — |
| Kullback-Leibler Divergence | Probability Density Function (PDF), Probability Mass Function (PMF), Expectation, Jensen's Inequality | — |

## Statistical Inference (36)

| Concept | Prerequisites | Lesson |
|---|---|---|
| Population vs Sample | — | — |
| Parameter vs Statistic | Population vs Sample | — |
| Data Types | Population vs Sample | — |
| Sampling Methods | Population vs Sample | — |
| Sample Mean | Parameter vs Statistic, Expectation | — |
| Sample Variance | Sample Mean, Variance | — |
| Sampling Distribution | Sample Mean, Sample Variance, Central Limit Theorem | — |
| Standard Error | Sampling Distribution | — |
| Test Statistic | Sampling Distribution | — |
| Rejection Region | Test Statistic | — |
| Hypothesis Test | Test Statistic, Rejection Region | — |
| P-Value | Hypothesis Test | — |
| Type I and Type II Error | Hypothesis Test | — |
| Confidence Interval | Standard Error, Sampling Distribution | — |
| One Sample Z-Test | Hypothesis Test, Standard Error, Normal Distribution | — |
| One Sample T-Test | One Sample Z-Test, Student's t-Distribution | — |
| One Sample Proportions Z-Test | One Sample Z-Test, Bernoulli and Binomial Distributions | — |
| Two Sample Z-Test | One Sample Z-Test | — |
| Two Sample T-Test | One Sample T-Test, Two Sample Z-Test | — |
| Paired T-Test | Two Sample T-Test | — |
| Chi Square Test of Independence | Chi Square Distribution, Hypothesis Test | — |
| Chi Square Goodness of Fit Test | Chi Square Test of Independence | — |
| Fisher's Exact Test | Chi Square Test of Independence, Hypergeometric Distribution | — |
| Wilcoxon Rank Sum Test | Order Statistics, Hypothesis Test | — |
| Bootstrapping | Sampling Distribution, Sample Mean | — |
| Two Sample Proportions Z-Test | One Sample Proportions Z-Test, Two Sample Z-Test | — |
| Effect Size | P-Value, Standard Error | — |
| Multiple Testing | P-Value, Type I and Type II Error | — |
| Equivalence Testing | Confidence Interval, Hypothesis Test | — |
| Sequential Testing and Optional Stopping | P-Value, Type I and Type II Error | — |
| Prediction Interval | Confidence Interval, Sampling Distribution | — |
| Permutation Test | Hypothesis Test, P-Value, Counting Methods | — |
| Wilcoxon Signed Rank Test | Wilcoxon Rank Sum Test, Paired T-Test | — |
| Kruskal-Wallis Test | Wilcoxon Rank Sum Test, Chi Square Distribution | — |
| McNemar's Test | Chi Square Test of Independence, Paired T-Test | — |
| Kolmogorov-Smirnov Test | Chi Square Goodness of Fit Test, CDF | — |

## Regression (34)

| Concept | Prerequisites | Lesson |
|---|---|---|
| Regression | — | — |
| Regress to the Mean | Regression | — |
| Linear Regression Terminology | Regression | — |
| Simple Linear Regression | Linear Regression Terminology, Covariance, Sample Variance | — |
| Ordinary Least Squares | Simple Linear Regression | — |
| Normal Equations | Ordinary Least Squares, Matrix Multiplication | — |
| Geometric Interpretation of OLS | Normal Equations, Column Space, Vector Projection | — |
| Multiple Linear Regression | Ordinary Least Squares, Normal Equations | — |
| Linear Regression, Probabilistic Version | Multiple Linear Regression, Maximum Likelihood Estimation, Normal Distribution | — |
| OLS Assumptions | Multiple Linear Regression | — |
| Homoskedasticity | OLS Assumptions | — |
| Weighted Least Squares | Homoskedasticity | — |
| OLS Properties | OLS Assumptions, Linear Regression, Probabilistic Version, Central Limit Theorem | — |
| SSR, SSE, SST | Simple Linear Regression | — |
| R² | SSR, SSE, SST | — |
| ANOVA | SSR, SSE, SST, F-Distribution, Hypothesis Test | — |
| Effect of Adding Another Variable | Multiple Linear Regression, R² | — |
| Variance Inflation Factor (VIF) | Effect of Adding Another Variable | — |
| Outliers, Leverage, and Influence | Geometric Interpretation of OLS | — |
| AIC, BIC | Linear Regression, Probabilistic Version, Maximum Likelihood Estimation | — |
| Forward, Backward, Stepwise Selection | AIC, BIC, Multiple Linear Regression | — |
| Regularization | Multiple Linear Regression, Bias Variance Tradeoff | — |
| LASSO | Regularization | — |
| Ridge Regression | Regularization | — |
| Elastic Net | LASSO, Ridge Regression | — |
| Polynomial Regression | Multiple Linear Regression, Variance Inflation Factor (VIF) | — |
| Quantile Regression | Ordinary Least Squares | — |
| LOESS Smoothing | Simple Linear Regression | — |
| Mixed Effect Models | Multiple Linear Regression, Sampling Methods | — |
| Logistic Regression | Maximum Likelihood Estimation, Bernoulli and Binomial Distributions, Multiple Linear Regression | — |
| Probit Regression | Logistic Regression, Normal Distribution | — |
| Generalized Linear Model (GLM) | Logistic Regression, Exponential Family | — |
| Poisson Regression | Generalized Linear Model (GLM), Poisson Distribution | — |
| Cox Proportional Hazards Model | Generalized Linear Model (GLM), Maximum Likelihood Estimation | — |

## Machine Learning (78)

| Concept | Prerequisites | Lesson |
|---|---|---|
| Machine Learning Introduction | — | — |
| Types of Machine Learning | Machine Learning Introduction | — |
| Supervised vs Unsupervised Learning | Types of Machine Learning | — |
| Classification vs Regression | Supervised vs Unsupervised Learning | — |
| Perceptron | Classification vs Regression | — |
| Neural Networks | Perceptron, Matrix Calculus (Gradients & Jacobians) | — |
| Backpropagation | Neural Networks, Gradient Descent | — |
| Loss Functions | Machine Learning Introduction | — |
| Cross Entropy Loss | Loss Functions, Likelihood vs Probability | — |
| Gradient Descent | Loss Functions, Matrix Calculus (Gradients & Jacobians) | — |
| Bias Variance Tradeoff | Loss Functions, Variance | — |
| Overfitting and Underfitting | Bias Variance Tradeoff | — |
| Curse of Dimensionality | Machine Learning Introduction | — |
| Training vs Validation vs Test Set | Supervised vs Unsupervised Learning | — |
| K-Fold Cross-Validation | Training vs Validation vs Test Set, Overfitting and Underfitting | — |
| Hyperparameters | K-Fold Cross-Validation | — |
| Multiclass Classification | Classification vs Regression | — |
| Confusion Matrices | Classification vs Regression | — |
| ROC Curves | Confusion Matrices | — |
| Data Leakage | Training vs Validation vs Test Set | — |
| Sensitivity Analysis | Hyperparameters | — |
| Generative vs Discriminative Models | Classification vs Regression | — |
| K Nearest Neighbors | Classification vs Regression, Curse of Dimensionality | — |
| Linear Discriminant Analysis | Classification vs Regression, Multivariate Normal, Generative vs Discriminative Models | — |
| Naive Bayes | Bayes' Rule, Generative vs Discriminative Models | — |
| Principal Component Analysis (PCA) | Principal Component Analysis (Matrix Edition), Covariance Matrix | — |
| Kernel | Dot Product | — |
| Mercer's Theorem | Kernel, Positive Definite Matrices | — |
| Radial Basis Function (RBF) | Kernel | — |
| Support Vector Machine | Kernel, Classification vs Regression | — |
| SVMs for Regression | Support Vector Machine | — |
| Decision Tree | Classification vs Regression | — |
| Splitting Criteria | Decision Tree | — |
| Pruning Trees | Decision Tree, Overfitting and Underfitting | — |
| Ensemble Methods | Decision Tree | — |
| Bagging | Ensemble Methods | — |
| Random Forests | Bagging, Splitting Criteria | — |
| AdaBoost | Ensemble Methods | — |
| Gradient Boosting | Ensemble Methods, Gradient Descent | — |
| XGBoost | Gradient Boosting | — |
| Clustering Methods | Supervised vs Unsupervised Learning | — |
| K-Means Clustering | Clustering Methods | — |
| SVD for Clustering | Clustering Methods, Singular Value Decomposition (SVD) | — |
| Probabilistic PCA | Principal Component Analysis (PCA), Maximum Likelihood Estimation | — |
| Kernel PCA | Principal Component Analysis (PCA), Kernel | — |
| t-SNE | Clustering Methods, Kullback-Leibler Divergence | — |
| UMAP | t-SNE | — |
| Independent Component Analysis (ICA) | Principal Component Analysis (PCA), Kullback-Leibler Divergence | — |
| GP Regression | Multivariate Normal, Kernel | — |
| GP Classification | GP Regression, Logistic Regression | — |
| Feature Scaling | Curse of Dimensionality, Training vs Validation vs Test Set | — |
| Feature Selection | Curse of Dimensionality, K-Fold Cross-Validation, Data Leakage | — |
| Class Imbalance | Confusion Matrices, Loss Functions | — |
| Precision-Recall Curves | ROC Curves, Class Imbalance | — |
| Probability Calibration | ROC Curves, Cross Entropy Loss, Training vs Validation vs Test Set | — |
| Nested Cross-Validation | Hyperparameters, Data Leakage | — |
| Learning Curves | Overfitting and Underfitting, K-Fold Cross-Validation | — |
| Distribution Shift | Training vs Validation vs Test Set, Generative vs Discriminative Models, Data Leakage | — |
| Model Interpretability | Random Forests, Sensitivity Analysis | — |
| Anomaly Detection | Clustering Methods, Generative vs Discriminative Models, Curse of Dimensionality | — |
| Activation Functions | Neural Networks | — |
| SGD and Adaptive Optimizers | Gradient Descent, Backpropagation | — |
| Dropout | Neural Networks, Overfitting and Underfitting | — |
| Batch Normalization | Backpropagation, Feature Scaling | — |
| Convolutional Neural Networks | Neural Networks, Activation Functions, Overfitting and Underfitting | — |
| Recurrent Neural Networks | Backpropagation, Activation Functions | — |
| Attention Mechanism | Recurrent Neural Networks, Dot Product, Variance | — |
| Transformers | Attention Mechanism, Batch Normalization | — |
| Embeddings | Neural Networks, Principal Component Analysis (PCA) | — |
| Autoencoders | Neural Networks, Probabilistic PCA | — |
| Transfer Learning | Convolutional Neural Networks, Embeddings, Feature Scaling | — |
| Self-Supervised Learning | Transfer Learning, Autoencoders | — |
| Reinforcement Learning | Types of Machine Learning, Markov Chains | — |
| Multi-Armed Bandits | Reinforcement Learning, Confidence Interval | — |
| Bayesian Optimization | GP Regression, Hyperparameters | — |
| Stacking | Ensemble Methods, Nested Cross-Validation | — |
| Hierarchical Clustering | Clustering Methods | — |
| Density-Based Clustering | Clustering Methods, K-Means Clustering | — |

## Graphical Models & Bayesian ML (15)

| Concept | Prerequisites | Lesson |
|---|---|---|
| Graphs | Set Theory | — |
| Directed vs Undirected Graphs | Graphs | — |
| Conditional Independence and D-Separation | Directed vs Undirected Graphs, Independence (Set Theory), Conditional Probability | — |
| Markov Random Fields | Directed vs Undirected Graphs, Conditional Independence and D-Separation | — |
| Markov Chains | Directed vs Undirected Graphs, Conditional Probability | — |
| Hidden Markov Models (HMM) | Markov Chains, Joint Distribution | — |
| Mixture Models and Latent Variables | Joint Distribution, Marginal Distribution | — |
| EM Algorithm | Maximum Likelihood Estimation, Mixture Models and Latent Variables | — |
| Gaussian Mixture Models | EM Algorithm, Multivariate Normal | — |
| Variational Inference: ELBO | Mixture Models and Latent Variables, Kullback-Leibler Divergence | — |
| Laplace Approximation | Maximum Likelihood Estimation, Multivariate Normal | — |
| Variational Inference: VAEs | Variational Inference: ELBO, Neural Networks, Backpropagation | — |
| Gaussian Process | Multivariate Normal, Kernel | — |
| Reproducing Kernel Hilbert Space (RKHS) | Kernel, Mercer's Theorem | — |
| Wasserstein Distance | Kullback-Leibler Divergence | — |

## Python for Data Work (8)

The toolkit rather than the mathematics, and the one chapter with no prerequisite edges into or out
of the rest of the graph — a learner can read it cold, first or last. It is listed last in
`domainMeta`, which is what puts it last in the concept map's chapter order.

| Concept | Prerequisites | Lesson |
|---|---|---|
| Lists, Indexing, and Slicing | — | — |
| Dictionaries and Sets | Lists, Indexing, and Slicing | — |
| Loops, enumerate, and zip | Lists, Indexing, and Slicing, Dictionaries and Sets | — |
| Comprehensions | Loops, enumerate, and zip | — |
| NumPy Arrays and Vectorization | Lists, Indexing, and Slicing, Loops, enumerate, and zip | — |
| Broadcasting and Axis Reductions | NumPy Arrays and Vectorization | — |
| pandas Series and DataFrames | NumPy Arrays and Vectorization, Dictionaries and Sets | — |
| groupby, Merge, and Reshape | pandas Series and DataFrames, Comprehensions | — |
