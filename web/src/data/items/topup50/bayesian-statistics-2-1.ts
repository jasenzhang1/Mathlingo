import type { Item } from "../../../lib/assessment/types";
import { m, n, s } from "./shared";

/**
 * Bayesian statistics top-up, part 1: Bayesian inverse problems — Gaussian
 * priors on function spaces, pCN, ensemble Kalman inversion and approximate
 * Bayesian computation. Twenty new items per lesson, weighted towards the
 * levels each bank was thinnest at.
 */

const FS = "function-space-priors";
const functionSpacePriors: Item[] = [
  // level 1
  m(FS, "t50-recall-kl-coefficients", 1, "In the Karhunen–Loève expansion $u = m_0 + \\sum_j \\sqrt{\\lambda_j}\\,\\xi_j\\,\\phi_j$ of a Gaussian prior, the coefficients $\\xi_j$ are:",
    "Independent standard normals, $\\xi_j \\overset{\\text{iid}}{\\sim} \\mathcal{N}(0, 1)$",
    [
      ["Fixed weights equal to $\\lambda_j$", "The $\\lambda_j$ already scale each term; the $\\xi_j$ are the random part of the draw."],
      ["Independent uniforms on $[-1, 1]$", "Uniform coefficients would give a non-Gaussian measure; Gaussian priors use Gaussian coefficients."],
      ["Correlated normals with covariance $C_0$", "The correlation is carried by the eigenfunctions and $\\sqrt{\\lambda_j}$; in the eigenbasis the coefficients are independent."],
    ]),
  m(FS, "t50-recall-eigenpairs", 1, "In a Karhunen–Loève prior, the pairs $(\\lambda_j, \\phi_j)$ are:",
    "The eigenvalues and eigenfunctions of the prior covariance operator $C_0$",
    [
      ["The Fourier coefficients of the prior mean $m_0$", "The mean only shifts the draw; the expansion comes from the covariance."],
      ["The singular values and vectors of the forward map", "Those describe what the data see; the prior is defined before any forward map."],
      ["The posterior mean and variance at each grid point", "The KL pairs describe the prior, not the posterior, and are functions rather than pointwise moments."],
    ]),
  m(FS, "t50-recall-trace-class", 1, "A covariance operator with eigenvalues $\\lambda_j$ is trace class when:",
    "$\\sum_j \\lambda_j < \\infty$",
    [
      ["$\\lambda_j \\to 0$", "Decay to zero is necessary but not enough: $\\lambda_j = 1/j$ tends to $0$ yet its sum diverges."],
      ["$\\sum_j \\lambda_j^2 < \\infty$", "That is the Hilbert–Schmidt condition, which is weaker than trace class."],
      ["Every $\\lambda_j > 0$", "Positivity makes the operator non-degenerate; it says nothing about summability."],
    ]),
  // level 2
  n(FS, "t50-apply-coef-sd", 2, "Eigenvalues are $\\lambda_j = j^{-3}$. Find the standard deviation $\\sqrt{\\lambda_2}$ of the KL term multiplying $\\phi_2$. Give $4$ decimal places.", 0.3536),
  m(FS, "t50-apply-harmonic-eigs", 2, "A prior has eigenvalues $\\lambda_j = 1/j$. Its draws:",
    "Are not in $L^2$ almost surely, because $\\sum_j 1/j$ diverges",
    [
      ["Are in $L^2$ because $\\lambda_j \\to 0$", "Eigenvalues tending to zero is not enough; the expected squared norm $\\sum_j \\lambda_j$ must be finite."],
      ["Are in $L^2$ because each $\\lambda_j$ is finite", "Every term being finite does not make the infinite sum finite."],
      ["Are white noise", "White noise has $\\lambda_j = 1$ for every $j$; here the eigenvalues decay, just too slowly."],
    ]),
  // level 3
  n(FS, "t50-apply-geometric-trace", 3, "Eigenvalues are $\\lambda_j = 3^{-j}$ for $j \\ge 1$. Find $\\mathbb{E}\\|u - m_0\\|^2$.", 0.5),
  // level 4
  n(FS, "t50-apply-truncation-error", 4, "Eigenvalues are $\\lambda_j = 1/j^2$, and the KL expansion is truncated after its first $2$ terms. Find the expected squared truncation error $\\mathbb{E}\\|u - u_2\\|^2$, using $\\sum_{j \\ge 1} 1/j^2 = \\pi^2/6$. Give $4$ decimal places.", 0.3949),
  n(FS, "t50-apply-point-cov", 4, "A prior has $m_0 = 0$ and three KL terms with $\\lambda = (4, 1, 0.25)$. At $t_0$ the eigenfunctions take values $(0.5, 1, 2)$; at $s_0$ they take values $(1, -1, 0)$. Find $\\text{Cov}\\big(u(t_0), u(s_0)\\big)$.", 1),
  // level 6
  m(FS, "t50-apply-iid-nodes", 6, "You put independent $\\mathcal{N}(0, 1)$ priors on the nodal values of a finite-element mesh and keep refining the mesh. The prior draws:",
    "Get ever rougher and converge to no function, so the inference depends on the mesh",
    [
      ["Converge to a smooth function", "Independent nodes have no correlation, so nothing makes neighbouring values agree as the mesh refines."],
      ["Stay statistically the same at every resolution", "Each refinement adds new independent nodes, so the field changes character with the mesh."],
      ["Become smoother because more nodes average out", "Nothing averages; each node keeps variance $1$ while the spacing shrinks, so the field oscillates faster."],
    ]),
  // level 7
  n(FS, "t50-apply-terms-for-error", 7, "Eigenvalues are $\\lambda_j = 1/j^2$. Find the smallest number of KL terms $K$ for which the expected squared truncation error $\\sum_{j > K} 1/j^2$ is below $0.1$.", 10),
  s(FS, "t50-explain-matern-alpha", 7, "Explain why increasing the exponent $\\alpha$ in a Matérn-type covariance $C_0 = (\\kappa^2 - \\Delta)^{-\\alpha}$ makes prior draws smoother.",
    "Larger $\\alpha$ makes the eigenvalues $(\\kappa^2 + \\mu_j)^{-\\alpha}$ decay faster, so high-frequency eigenfunctions get much less variance",
    "With little energy in high-frequency modes the sample paths have more derivatives (smoothness grows like $\\nu = \\alpha - d/2$)"),
  // level 8
  n(FS, "t50-apply-mode-variance-ratio", 8, "A sequence-space inverse problem observes each KL coefficient directly: $y_j = u_j + \\eta_j$ with $\\eta_j \\sim \\mathcal{N}(0, 0.1)$ independent and prior $u_j \\sim \\mathcal{N}(0, 1/j^2)$. Find the ratio of posterior to prior variance for $j = 3$. Give $4$ decimal places.", 0.4737),
  s(FS, "t50-explain-informed-directions", 8, "For a linear forward map $A$, noise covariance $\\Gamma$ and Gaussian prior, the posterior covariance is $(A^*\\Gamma^{-1}A + C_0^{-1})^{-1}$. Explain why for a smoothing forward map it differs from the prior in only a few directions.",
    "A smoothing $A$ makes $A^*\\Gamma^{-1}A$ large only on a few (low-frequency) directions; there the data precision dominates $C_0^{-1}$",
    "In all other directions $C_0^{-1}$ dominates, so the posterior equals the prior there; this is why low-rank or likelihood-informed approximations work"),
  // level 9
  m(FS, "t50-apply-sobolev-regularity", 9, "On $[0, 1]$ with Fourier eigenfunctions, take $\\lambda_j = j^{-4}$. Draws lie in the Sobolev space $H^t$ exactly when $\\sum_j j^{2t}\\lambda_j < \\infty$. Which is true?",
    "Draws are in $H^1$ but not in $H^{3/2}$",
    [
      ["Draws are in $H^2$", "$H^2$ is the Cameron–Martin space here; draws are rougher than it, since $\\sum_j j^{0}$ diverges."],
      ["Draws are in $H^{3/2}$", "At $t = 3/2$ the series is $\\sum_j j^{-1}$, which diverges; the condition needs $t < 3/2$ strictly."],
      ["Draws are not even in $L^2$", "With $t = 0$ the series $\\sum_j j^{-4}$ converges, so the draws are in $L^2$."],
    ]),
  s(FS, "t50-explain-prior-before-mesh", 9, "Explain why a Bayesian inverse problem should specify its prior on the function space before discretising, rather than choosing a prior directly on the discretised vector of unknowns.",
    "The posterior is a change of measure from the prior on function space; ad hoc priors on the discretised vector need not converge to any limit, so answers change with the mesh",
    "Defining the prior on function space (e.g. by a KL expansion or an SPDE) makes every discretisation an approximation of the same measure, which also enables mesh-robust samplers such as pCN"),
  s(FS, "t50-explain-laplacian-2d", 9, "In $d = 2$, a colleague uses the prior covariance $C_0 = (-\\Delta)^{-1}$ (with suitable boundary conditions). What goes wrong, and how would you fix it?",
    "Draws need $\\alpha > d/2 = 1$ to be in $L^2$; with $\\alpha = 1$ the eigenvalues decay like $1/j$, the trace diverges and draws are not functions in $L^2$",
    "Raise the exponent above $1$, for example $(-\\Delta)^{-2}$ or a Matérn operator $(\\kappa^2 - \\Delta)^{-2}$, which gives a trace-class covariance"),
  // level 10
  s(FS, "t50-judge-boundary-effects", 10, "A Matérn prior defined by the SPDE $(\\kappa^2 - \\Delta)^{\\alpha/2}u = W$ on a bounded domain with Neumann boundary conditions shows inflated pointwise variance near the boundary. Explain why, and how you would mitigate it.",
    "The boundary condition changes the operator: Neumann conditions reflect the field so that near the boundary the variance is inflated (up to about double), and Dirichlet conditions would force it to zero",
    "Mitigate by extending the computational domain beyond the region of interest by about a correlation length, or by using tuned Robin boundary conditions, and only reporting results on the interior"),
  s(FS, "t50-judge-prior-smoothness-contraction", 10, "You can choose a prior that is smoother than the truth or one that is rougher. Explain what each does to the posterior as data accumulate, and which mistake is safer.",
    "A prior smoother than the truth puts little mass near it, so the posterior contracts slowly and its credible sets can be overconfident and fail to cover the truth",
    "A rougher prior contracts more slowly but its credible sets tend to be conservative, so undersmoothing is safer; ideally match or learn the smoothness hierarchically or by empirical Bayes"),
  n(FS, "t50-derive-total-posterior-variance", 10, "In the sequence model $y_j = u_j + \\eta_j$ with $\\eta_j \\sim \\mathcal{N}(0, 1)$ independent and prior $u_j \\sim \\mathcal{N}(0, 1/j^2)$ for all $j \\ge 1$, find the expected squared posterior error $\\sum_j \\text{Var}(u_j \\mid y)$, using $\\sum_{j \\ge 1} \\frac{1}{1 + j^2} = \\frac{\\pi\\coth\\pi - 1}{2}$. Give $3$ decimal places.", 1.077),
  s(FS, "t50-judge-test-invariance", 10, "How would you check empirically that your discretised prior and posterior are discretisation-invariant before trusting results on the finest mesh?",
    "Repeat the analysis on successively refined meshes and check that prior and posterior summaries (pointwise variance, posterior mean, credible bands, quantities of interest) converge rather than drift",
    "Also check that sampler behaviour such as the pCN acceptance rate and effective sample size stays stable, and that the prior pointwise variance neither blows up nor vanishes as the mesh is refined"),
];

const PC = "pcn-mcmc";
const pcnMcmc: Item[] = [
  // level 1
  m(PC, "t50-recall-beta-role", 1, "In the pCN proposal $v = \\sqrt{1 - \\beta^2}\\,u + \\beta\\,\\xi$, the parameter $\\beta \\in (0, 1]$ controls:",
    "The step size: how far the proposal moves from the current state",
    [
      ["The prior variance", "The prior covariance is fixed by $C_0$; $\\beta$ only mixes the current state with fresh prior noise."],
      ["The observation noise level", "Noise enters through the misfit $\\Phi$, not through the proposal."],
      ["The number of leapfrog steps", "Leapfrog steps belong to Hamiltonian Monte Carlo; pCN has no integrator."],
    ]),
  m(PC, "t50-recall-invariance", 1, "The pCN proposal kernel on its own is reversible with respect to:",
    "The prior $\\mu_0 = \\mathcal{N}(0, C_0)$; the Metropolis–Hastings accept step then corrects it to the posterior",
    [
      ["The posterior", "The proposal never looks at the data; it is the accept–reject step that brings in the likelihood."],
      ["The likelihood", "A likelihood is not a probability measure on $u$, and the proposal ignores it."],
      ["A Laplace approximation of the posterior", "That is generalised pCN; standard pCN uses the prior covariance."],
    ]),
  m(PC, "t50-recall-noise-dist", 1, "In pCN, the noise $\\xi$ in the proposal is drawn from:",
    "The prior covariance, $\\xi \\sim \\mathcal{N}(0, C_0)$",
    [
      ["White noise, $\\xi \\sim \\mathcal{N}(0, I)$", "White noise would not preserve the prior and is not even a function in infinite dimensions."],
      ["The posterior", "Sampling the posterior is the goal; it cannot be drawn from directly."],
      ["The observation noise distribution $\\mathcal{N}(0, \\Gamma)$", "$\\Gamma$ lives in data space, while $\\xi$ must live in parameter space."],
    ]),
  m(PC, "t50-recall-nonzero-mean", 1, "If the prior is $\\mathcal{N}(m_0, C_0)$ with $m_0 \\ne 0$, the pCN proposal is:",
    "$v = m_0 + \\sqrt{1 - \\beta^2}\\,(u - m_0) + \\beta\\,\\xi$",
    [
      ["$v = \\sqrt{1 - \\beta^2}\\,u + \\beta\\,\\xi$, unchanged", "That shrinks towards $0$ rather than towards $m_0$, so it no longer preserves the prior."],
      ["$v = u + \\beta\\,\\xi$", "That is a random walk, which does not preserve the prior and degenerates under mesh refinement."],
      ["$v = m_0 + \\beta\\,\\xi$", "That ignores the current state; it is a prior independence sampler only when $\\beta = 1$."],
    ]),
  // level 2
  n(PC, "t50-apply-proposal-value", 2, "A scalar pCN chain with prior mean $0$ is at $u = 2$. With $\\beta = 0.6$ and noise draw $\\xi = 0.5$, find the proposal $v$.", 1.9),
  // level 3
  n(PC, "t50-apply-accept-prob", 3, "The current misfit is $\\Phi(u) = 3.2$ and the proposal has $\\Phi(v) = 4.5$. Find the pCN acceptance probability. Give $4$ decimal places.", 0.2725),
  n(PC, "t50-apply-centred-proposal", 3, "A scalar prior has mean $m_0 = 1$. The chain is at $u = 3$, $\\beta = 0.6$ and the noise draw is $\\xi = 0$. Find the pCN proposal $v$.", 2.6),
  // level 5
  n(PC, "t50-apply-scalar-gaussian", 5, "Scalar prior $\\mathcal{N}(0, 1)$, misfit $\\Phi(u) = \\frac{1}{2}(1 - u)^2$. The chain is at $u = 0$; with $\\beta = 0.6$ the noise draw is $\\xi = -1$. Find the pCN acceptance probability of the resulting proposal. Give $4$ decimal places.", 0.4584),
  m(PC, "t50-apply-tuning-target", 5, "When tuning $\\beta$ for pCN in practice, a common target acceptance rate is about:",
    "$20\\%$ to $30\\%$",
    [
      ["Close to $100\\%$", "Near-certain acceptance means $\\beta$ is tiny and the chain barely moves."],
      ["About $1\\%$", "With so few acceptances the chain sits still for long stretches."],
      ["Exactly $57.4\\%$", "$0.574$ is the asymptotic optimum for MALA, not a pCN rule."],
    ]),
  // level 6
  n(PC, "t50-derive-sq-jump", 6, "A coordinate where the posterior equals the prior $\\mathcal{N}(0, 1)$ is at stationarity, and a pCN proposal with $\\beta = 0.6$ is accepted. Find $\\mathbb{E}\\big[(v - u)^2\\big]$.", 0.4),
  // level 7
  s(PC, "t50-explain-ratio-cancel", 7, "The posterior has density $\\propto \\exp(-\\Phi(u))$ with respect to the prior $\\mu_0$. Explain why the pCN Metropolis–Hastings ratio reduces to $\\exp\\big(\\Phi(u) - \\Phi(v)\\big)$.",
    "The pCN proposal is reversible with respect to the prior: $\\mu_0(du)\\,q(u, dv) = \\mu_0(dv)\\,q(v, du)$",
    "So in the MH ratio the prior and proposal terms cancel, leaving only the likelihood ratio $\\exp(-\\Phi(v))/\\exp(-\\Phi(u))$"),
  // level 8
  s(PC, "t50-explain-white-noise", 8, "Why can’t pCN use white noise $\\xi \\sim \\mathcal{N}(0, I)$ in place of $\\xi \\sim \\mathcal{N}(0, C_0)$ when the prior covariance $C_0$ is trace class?",
    "With white noise the proposal no longer preserves the prior, so the prior and proposal terms stop cancelling; in infinite dimensions the two measures are mutually singular",
    "The acceptance ratio then depends on the discretisation and the acceptance rate degenerates to $0$ as the mesh is refined"),
  n(PC, "t50-apply-rwm-scaling", 8, "Random-walk Metropolis needs a step size $\\propto d^{-1/2}$, so the number of iterations for a fixed effective sample size grows like $d$. Refining a mesh from $d = 100$ to $d = 1600$ unknowns multiplies the iterations RWM needs by what factor? (pCN needs no such increase.)", 16),
  s(PC, "t50-explain-beta-one", 8, "pCN with $\\beta = 1$ is an independence sampler that proposes fresh prior draws. Explain why it works badly when the data are informative, and what $\\beta < 1$ buys.",
    "Fresh prior draws rarely land in the small region of high posterior mass, so $\\exp(\\Phi(u) - \\Phi(v))$ is usually tiny and almost everything is rejected",
    "With $\\beta < 1$ the proposal stays near the current state, keeping a reasonable acceptance rate while still preserving the prior, so the method stays well-defined in function space"),
  // level 9
  s(PC, "t50-explain-gpcn", 9, "Generalised pCN replaces $C_0$ in the proposal by the covariance of a Gaussian approximation to the posterior (e.g. a Laplace approximation). Why does this help, and why is it still well-defined in function space?",
    "Its proposals match the posterior’s narrower spread in the data-informed directions, so it can take larger effective steps and mix faster",
    "The Laplace covariance differs from $C_0$ only through a likelihood term in a few directions, so the approximate Gaussian is equivalent to the prior and the acceptance ratio stays mesh-independent"),
  m(PC, "t50-apply-diagnose-slow", 9, "A pCN chain needs $\\beta = 0.01$ to reach a $25\\%$ acceptance rate, and coefficients that the data barely inform are extremely autocorrelated. The most likely explanation is:",
    "The data tightly constrain a few directions, forcing a tiny $\\beta$ that slows every other direction; a likelihood-informed proposal (DILI or gpCN) fixes this",
    [
      ["The mesh is too fine, so coarsen it", "pCN’s behaviour is robust to the mesh; the bottleneck is the posterior’s anisotropy, not the resolution."],
      ["$\\beta$ is too small, so set $\\beta = 1$", "Larger steps in the tightly constrained directions would push the acceptance rate towards $0$."],
      ["The prior is improper", "pCN needs a proper Gaussian prior; with one there is nothing improper to cause this."],
    ]),
  // level 10
  s(PC, "t50-judge-multimodal", 10, "The posterior for a subsurface field is bimodal: two distinct geological scenarios fit the data. Why will a single pCN chain struggle, and what would you do?",
    "pCN makes local moves accepted with $\\exp(\\Phi(u) - \\Phi(v))$; crossing the low-posterior region between modes needs many unlikely steps, so the chain stays in one mode and its diagnostics can look fine",
    "Use likelihood tempering (SMC or parallel tempering with pCN kernels at each temperature), or several chains from dispersed starts combined with proper weights, and check mode coverage"),
  s(PC, "t50-judge-smc-mutation", 10, "Explain how pCN is used as the mutation kernel in sequential Monte Carlo with tempered targets $\\mu_k(du) \\propto \\exp(-\\phi_k\\Phi(u))\\,\\mu_0(du)$, $0 = \\phi_0 < \\dots < \\phi_K = 1$.",
    "pCN with misfit $\\phi_k\\Phi$ leaves $\\mu_k$ invariant, because the proposal preserves the prior and only the tempered misfit enters the acceptance ratio",
    "Each stage reweights particles by $\\exp\\big(-(\\phi_{k+1} - \\phi_k)\\Phi\\big)$, resamples when the effective sample size drops, then applies pCN moves to diversify; increments are chosen to keep the ESS high"),
  m(PC, "t50-judge-sampler-choice", 10, "A function-space posterior is strongly non-Gaussian along a few data-informed directions and close to the prior elsewhere. Which sampler is most suitable?",
    "A likelihood-informed method (DILI): curvature-adapted proposals in the informed subspace, pCN-type moves on its complement",
    [
      ["Random-walk Metropolis on the full nodal vector", "Its acceptance rate degenerates as the mesh is refined."],
      ["pCN with $\\beta = 1$", "Independent prior proposals almost never land in the concentrated posterior."],
      ["Single-site Gibbs on each nodal value", "Nodal values are strongly correlated, so one-at-a-time updates mix very slowly and get worse as the mesh refines."],
    ]),
  s(PC, "t50-judge-budget", 10, "Each forward PDE solve takes one minute and you have one week of compute. Compare pCN, $\\infty$-MALA (which needs an adjoint gradient) and EKI for producing calibrated uncertainty, and justify a choice.",
    "Budget is about $10{,}000$ solves: pCN with integrated autocorrelation times in the hundreds yields only tens of effective samples; $\\infty$-MALA costs roughly twice as much per step but mixes better if an adjoint exists; EKI is cheap and parallel but gives an approximate, not exact, posterior",
    "A justified choice that matches the trade-off, e.g. calibrate with EKI and then sample with pCN or delayed-acceptance pCN on a surrogate, or $\\infty$-MALA if gradients are available"),
];

const EK = "ensemble-kalman-inversion";
const ensembleKalmanInversion: Item[] = [
  // level 1
  m(EK, "t50-recall-needs", 1, "Which does EKI need from the forward model $\\mathcal{G}$?",
    "Only the evaluations $\\mathcal{G}(u^{(j)})$ for each ensemble member",
    [
      ["Its Jacobian or adjoint", "Avoiding derivatives is EKI’s main selling point; ensemble covariances stand in for the Jacobian."],
      ["The Hessian of the misfit", "Second derivatives are never used."],
      ["A closed-form inverse $\\mathcal{G}^{-1}$", "Inverse problems rarely have one, and EKI does not need it."],
    ]),
  m(EK, "t50-recall-cpp", 1, "In EKI, $C^{pp}$ is:",
    "The empirical covariance of the ensemble’s predictions $\\mathcal{G}(u^{(j)})$",
    [
      ["The prior covariance of $u$", "$C^{pp}$ lives in data space and is computed from the predictions."],
      ["The observation noise covariance $\\Gamma$", "$\\Gamma$ is added to $C^{pp}$ in the gain; they are different terms."],
      ["The cross-covariance between parameters and predictions", "That is $C^{up}$."],
    ]),
  m(EK, "t50-recall-estimate", 1, "After iterating EKI, the usual point estimate of $u$ is:",
    "The ensemble mean",
    [
      ["The member with the largest prediction", "Size of the prediction is not a fit criterion."],
      ["The first ensemble member", "Members are exchangeable; none is special."],
      ["The prior mean", "That ignores the data the ensemble has been updated with."],
    ]),
  m(EK, "t50-recall-initial", 1, "EKI’s initial ensemble is usually drawn from:",
    "The prior",
    [
      ["A point mass at the MAP estimate", "A collapsed ensemble has zero covariance, so the gain would be zero and nothing would move."],
      ["The likelihood", "A likelihood is not a distribution over $u$ to sample from."],
      ["The observed data", "Data live in observation space, not parameter space."],
    ]),
  // level 2
  n(EK, "t50-apply-gain", 2, "In a scalar problem, $C^{up} = 1.5$, $C^{pp} = 2$ and $\\Gamma = 0.5$. Find the gain $C^{up}(C^{pp} + \\Gamma)^{-1}$.", 0.6),
  // level 3
  n(EK, "t50-apply-member-update", 3, "With gain $0.6$, a member at $u = 2$ has perturbed observation $y^{(j)} = 7$ and prediction $\\mathcal{G}(u) = 5$. Find its updated value.", 3.2),
  n(EK, "t50-apply-updated-mean", 3, "Four members $u = 1, 1, 2, 4$ share the gain $0.5$ and have innovations $y^{(j)} - \\mathcal{G}(u^{(j)}) = 2, -2, 4, 0$. Find the updated ensemble mean.", 2.5),
  // level 4
  n(EK, "t50-apply-cup", 4, "Ensemble parameters $-1, 0, 1$ have predictions $3, 4, 8$. Find $C^{up}$ using divisor $J - 1$.", 2.5),
  // level 6
  m(EK, "t50-apply-collapse", 6, "Without noise injection or inflation, iterating EKI many times makes the ensemble spread:",
    "Collapse towards zero, so the ensemble stops representing posterior uncertainty",
    [
      ["Converge to the posterior spread", "Only a single step with a linear map and Gaussian prior reproduces the posterior; repeated steps keep shrinking it."],
      ["Grow without bound", "Each update contracts the spread in the directions the data inform."],
      ["Stay at the prior spread", "The update reduces spread whenever the data are informative."],
    ]),
  // level 7
  n(EK, "t50-apply-linear-mean", 7, "Linear forward map $\\mathcal{G}(u) = 2u$, prior $u \\sim \\mathcal{N}(0, 1)$, $\\Gamma = 1$ and $y = 3$. In the infinite-ensemble limit, one EKI step moves the ensemble mean to what value?", 1.2),
  // level 8
  n(EK, "t50-derive-linear-variance", 8, "Same problem: $\\mathcal{G}(u) = 2u$, prior $\\mathcal{N}(0, 1)$, $\\Gamma = 1$, infinite ensemble, perturbed observations $y + \\eta^{(j)}$. Find the ensemble variance after one step.", 0.2),
  s(EK, "t50-explain-teki", 8, "Explain how Tikhonov-regularised EKI (TEKI) keeps the solution close to the prior.",
    "It augments the data with a prior pseudo-observation: the observation vector becomes $[y, 0]$ and the forward map $[\\mathcal{G}(u), u]$, with noise covariance $\\Gamma$ and $C_0$ respectively",
    "The update then minimises a regularised misfit $\\tfrac{1}{2}\\|y - \\mathcal{G}(u)\\|_{\\Gamma}^2 + \\tfrac{1}{2}\\|u\\|_{C_0}^2$ and stops the iteration from overfitting the data"),
  s(EK, "t50-explain-early-stopping", 8, "Iterated EKI on noisy data eventually overfits. Explain why, and give a stopping rule.",
    "Repeated updates keep driving the data misfit down towards zero, so the estimate starts fitting the noise in $y$",
    "Stop by the discrepancy principle: when $\\|\\Gamma^{-1/2}(y - \\mathcal{G}(\\bar{u}))\\|^2$ falls to about $\\tau$ times the data dimension, with $\\tau$ slightly above $1$"),
  // level 9
  n(EK, "t50-apply-2d-gain", 9, "An ensemble of $J = 3$ two-dimensional members $\\mathbf{u} = [0, 0]$, $[1, 2]$, $[2, 1]$ has scalar predictions $1, 2, 3$. With divisor $J - 1$ and $\\Gamma = 0.5$, find the second component of the gain $C^{up}(C^{pp} + \\Gamma)^{-1}$. Give $4$ decimal places.", 0.3333),
  s(EK, "t50-explain-gradient-flow", 9, "In the continuous-time limit, noise-free EKI is a preconditioned gradient flow. What is the preconditioner, and how does this explain the subspace property and ensemble collapse?",
    "For a linear map each member follows $\\dot{u}^{(j)} = -C^{uu}\\nabla\\Phi(u^{(j)})$: the gradient of the misfit preconditioned by the ensemble covariance $C^{uu}$",
    "The range of $C^{uu}$ is the span of the ensemble deviations, so members never leave that span; and as the flow converges $C^{uu}$ shrinks, so the ensemble collapses"),
  s(EK, "t50-explain-nonlinear-bias", 9, "For a strongly nonlinear forward map, why is EKI’s output not a sample from the Bayesian posterior even with an infinite ensemble?",
    "The Kalman update uses only first and second moments, which is exact only for a linear forward map with a Gaussian prior",
    "Non-Gaussian features such as skew or multiple modes are lost, so EKI gives an optimiser or Gaussian-like approximation; correct uncertainty needs MCMC, SMC or a sampler such as EKS"),
  // level 10
  s(EK, "t50-judge-budget", 10, "You can afford $1000$ forward runs to calibrate a model with $50$ parameters from $200$ observations. How would you split them between ensemble size and EKI iterations, and why?",
    "The ensemble must be large enough to span the important directions (comparable to or above the effective parameter dimension), and a nonlinear map needs several iterations, e.g. about $100$ members for about $10$ iterations",
    "Mentions safeguards and checks: localisation or inflation if the ensemble is small, stopping by the discrepancy principle, keeping some runs for validation or an emulator"),
  s(EK, "t50-judge-vs-adjoint", 10, "Compare EKI with adjoint-based optimisation (as in 4D-Var) for a large calibration problem. When would you choose each?",
    "Adjoint methods give exact gradients and scale to huge parameter dimensions, but need differentiable code and adjoint development; EKI is derivative-free, black-box and parallel but limited to the ensemble subspace and approximate for nonlinear maps",
    "Chooses sensibly: adjoint when gradients exist and the parameter space is huge; EKI when the model is a black box, gradients are unavailable or noisy, and many parallel runs are cheap"),
  n(EK, "t50-derive-two-steps", 10, "Scalar problem $\\mathcal{G}(u) = u$, prior $\\mathcal{N}(0, 1)$, $\\Gamma = 1$, $y = 2$. Run two full EKI steps (perturbed observations, infinite ensemble), each using the same $y$ and $\\Gamma$. Find the ensemble variance after the second step. Give $4$ decimal places.", 0.3333),
  m(EK, "t50-judge-data-reuse", 10, "With a linear map and Gaussian prior, applying the full EKI update $K$ times with the same data $y$ and noise $\\Gamma$ is equivalent to:",
    "One Bayesian update with noise covariance $\\Gamma/K$: the data are counted $K$ times, so the spread is too small",
    [
      ["The exact posterior, for every $K$", "Only $K = 1$ gives the posterior; reusing data adds information that is not there."],
      ["The prior", "Each update moves the ensemble towards the data, not back to the prior."],
      ["One update with noise $K\\Gamma$", "That is the remedy: inflating the noise to $K\\Gamma$ at each of $K$ steps recovers the posterior; plain reuse does the opposite."],
    ]),
];

const AB = "approximate-bayesian-computation";
const approximateBayesianComputation: Item[] = [
  // level 1
  m(AB, "t50-recall-likelihood-free", 1, "ABC is called “likelihood-free” because it:",
    "Only needs to simulate data from the model, never to evaluate $p(y \\mid \\theta)$",
    [
      ["Uses no prior", "ABC draws its proposals from the prior."],
      ["Ignores the data", "Simulations are compared with the observed data."],
      ["Uses a flat likelihood", "The likelihood is never written down, flat or otherwise."],
    ]),
  m(AB, "t50-recall-summary", 1, "In ABC, $S(\\cdot)$ denotes:",
    "Summary statistics that reduce a dataset to a few features",
    [
      ["A sample from the posterior", "$S$ acts on datasets, not parameters."],
      ["The support of the prior", "$S$ is applied to simulated and observed data."],
      ["The tolerance", "The tolerance is $\\varepsilon$."],
    ]),
  m(AB, "t50-recall-distance", 1, "In ABC, $\\rho\\big(S(x), S(y)\\big)$ is:",
    "A distance between the simulated and observed summaries",
    [
      ["The correlation between $\\theta$ and $y$", "$\\rho$ compares two datasets’ summaries, not a parameter and data."],
      ["A likelihood ratio", "No likelihood is evaluated in ABC."],
      ["The acceptance rate", "The acceptance rate is how often $\\rho \\le \\varepsilon$, not $\\rho$ itself."],
    ]),
  m(AB, "t50-recall-steps", 1, "Which is one iteration of rejection ABC?",
    "Draw $\\theta^*$ from the prior, simulate $x^* \\sim p(\\cdot \\mid \\theta^*)$, keep $\\theta^*$ if $\\rho(S(x^*), S(y)) \\le \\varepsilon$",
    [
      ["Simulate $x^*$, then draw $\\theta^*$ from the posterior", "The posterior is the unknown; it cannot be sampled directly."],
      ["Draw $\\theta^*$ from the posterior and keep it if the likelihood exceeds $\\varepsilon$", "ABC never evaluates a likelihood."],
      ["Evaluate $p(y \\mid \\theta^*)$ and accept with that probability", "That is ordinary rejection sampling, which needs the likelihood ABC avoids."],
    ]),
  // level 2
  n(AB, "t50-apply-wall-time", 2, "Each simulation takes $2$ seconds and rejection ABC accepts $1\\%$ of them. How many hours does it take to collect $360$ accepted draws?", 20),
  // level 3
  n(AB, "t50-apply-accept-set", 3, "Five prior draws $\\theta = 1, 2, 3, 4, 5$ give simulated summaries $4.1, 3.2, 2.6, 2.95, 1.0$. The observed summary is $3.0$ and $\\varepsilon = 0.25$. Find the ABC posterior mean of $\\theta$.", 3),
  // level 5
  n(AB, "t50-apply-kernel-mean", 5, "Draws $\\theta = 1, 2, 3$ have distances $d = 0, 0.1, 0.2$ and get Gaussian-kernel weights $\\exp\\big(-d^2/(2\\varepsilon^2)\\big)$ with $\\varepsilon = 0.1$. Find the weighted ABC posterior mean. Give $4$ decimal places.", 1.5036),
  // level 6
  m(AB, "t50-apply-many-summaries", 6, "You add more roughly independent summary statistics while keeping $\\varepsilon$ fixed. The acceptance rate:",
    "Falls roughly geometrically in the number of summaries (the curse of dimensionality)",
    [
      ["Rises, because more information is used", "Each extra summary is one more condition a simulation must meet, so fewer pass."],
      ["Stays the same, because $\\varepsilon$ is unchanged", "The same $\\varepsilon$ ball is far harder to hit in more dimensions."],
      ["Halves exactly with each summary", "The drop depends on how tight $\\varepsilon$ is relative to each summary’s spread; there is no fixed factor."],
    ]),
  n(AB, "t50-apply-smc-ess", 6, "An ABC-SMC population has normalised importance weights $0.5, 0.25, 0.25$. Find its effective sample size $1/\\sum_i w_i^2$. Give $4$ decimal places.", 2.6667),
  // level 7
  s(AB, "t50-explain-sufficiency", 7, "Why does a sufficient summary statistic make the $\\varepsilon \\to 0$ ABC posterior exact, and why is sufficiency rarely available in practice?",
    "If $S$ is sufficient the likelihood depends on the data only through $S$, so $p(\\theta \\mid S(y)) = p(\\theta \\mid y)$ and conditioning on $S$ loses nothing",
    "Models that need ABC have intractable likelihoods, which rarely admit low-dimensional sufficient statistics (essentially only exponential families do)"),
  n(AB, "t50-apply-poisson-exact", 7, "Two Poisson counts with rate $\\theta$ are observed with sum $3$. The prior puts equal mass on $\\theta = 1$ and $\\theta = 2$, and ABC accepts exactly when the simulated sum equals $3$. Find the ABC posterior probability of $\\theta = 2$. Give $4$ decimal places.", 0.5198),
  // level 8
  s(AB, "t50-explain-sticky", 8, "ABC-MCMC chains often get stuck at one value for long stretches. Explain why, and give a remedy.",
    "A move is accepted only if a single simulation lands within $\\varepsilon$; in regions where that is unlikely (for example the tails) the chain rejects over and over",
    "Remedies: start with a larger $\\varepsilon$ and lower it adaptively, average several simulations per proposal, or use ABC-SMC instead"),
  n(AB, "t50-derive-abc-variance", 8, "Data are $n = 10$ draws from $\\mathcal{N}(\\theta, 1)$ with a flat prior. ABC uses the sample mean as its summary and accepts when $|\\bar{x}^* - \\bar{y}| \\le \\varepsilon$ with $\\varepsilon = 0.3$. Treating the accepted discrepancy as uniform on $[-\\varepsilon, \\varepsilon]$, find the variance of the ABC posterior.", 0.13),
  m(AB, "t50-apply-semiautomatic", 8, "Fearnhead and Prangle showed that under quadratic loss the best single summary for each parameter is:",
    "The posterior mean $\\mathbb{E}[\\theta \\mid x]$, estimated by regressing $\\theta$ on features of pilot simulations",
    [
      ["The maximum likelihood estimate", "It is optimal in some senses, but computing it needs the likelihood ABC lacks."],
      ["The sample variance of the data", "Variance is informative only for scale parameters, not in general."],
      ["A random projection of the raw data", "Random projections lose information arbitrarily; the point is to choose summaries targeted at $\\theta$."],
    ]),
  // level 9
  s(AB, "t50-explain-pseudo-marginal", 9, "Explain why ABC-MCMC with an indicator kernel targets the ABC posterior $p_\\varepsilon(\\theta \\mid y)$ exactly, and what using $M$ simulations per proposal changes.",
    "The indicator $\\mathbb{1}\\lbrace\\rho(S(x^*), S(y)) \\le \\varepsilon\\rbrace$ is an unbiased, non-negative estimate of the ABC likelihood $P(\\rho \\le \\varepsilon \\mid \\theta)$, so the chain is a pseudo-marginal sampler with the exact target",
    "Averaging $M$ simulations reduces that estimate’s variance, so fewer sticky rejections, at $M$ times the cost per step; the target distribution is unchanged"),
  s(AB, "t50-explain-calibration", 9, "How would you check that an ABC posterior is calibrated before applying it to real data?",
    "Simulate datasets from parameters drawn from the prior, run ABC on each, and check that credible intervals cover the true parameter at their nominal rate (or that SBC rank histograms are uniform)",
    "Also compare with the exact posterior on a tractable version of the model, or check posterior predictive summaries against the observed ones"),
  // level 10
  s(AB, "t50-judge-synthetic-likelihood", 10, "Compare ABC with synthetic likelihood (Wood, 2010). When would you prefer each?",
    "Synthetic likelihood assumes the summaries are Gaussian given $\\theta$, estimates their mean and covariance from simulations and plugs the Gaussian likelihood into MCMC; it needs no $\\varepsilon$ and copes better with many summaries",
    "ABC makes no distributional assumption about summaries, but suffers from the curse of dimensionality in $\\varepsilon$; prefer synthetic likelihood when summaries are roughly normal and numerous, ABC when they are few or clearly non-Gaussian"),
  s(AB, "t50-judge-sir-design", 10, "Design an ABC analysis for an SIR epidemic model with parameters $\\beta$ and $\\gamma$, given daily case counts. Specify summaries, a distance and an algorithm.",
    "Summaries informative about each parameter, such as early growth rate, peak timing and size, final size, standardised (e.g. by their simulated spread) before a Euclidean distance",
    "An ABC-SMC scheme with an adaptively shrinking $\\varepsilon$ and sensible priors, plus checks of identifiability and calibration on simulated epidemics"),
  n(AB, "t50-derive-budget-epsilon", 10, "The bias of an ABC posterior mean is of order $\\varepsilon^2$ and its Monte Carlo variance of order $1/(N\\varepsilon^q)$, where $N$ is the simulation budget and $q$ the summary dimension. Minimising mean squared error, by what factor must $N$ grow to halve the optimal $\\varepsilon$ when $q = 2$?", 64),
  s(AB, "t50-judge-identifiability", 10, "In a simulator, two parameters affect the output only through their product $\\theta_1\\theta_2$. What will the ABC posterior look like, and how would you detect and handle it?",
    "Accepted draws lie along a ridge $\\theta_1\\theta_2 \\approx c$, so each marginal stays wide and largely prior-driven even when the product is well determined",
    "Detect it with pair plots or strong posterior correlation; reparameterise to the product plus one other coordinate, report the identifiable combination, and rely on the prior (or extra data) for the rest"),
];

export const t50BayesianStatistics21Items: Item[] = [
  ...functionSpacePriors,
  ...pcnMcmc,
  ...ensembleKalmanInversion,
  ...approximateBayesianComputation,
];
