import type { Item, SourceRef } from "../../lib/assessment/types";
import { makeBuilders } from "./authoring";

/**
 * Graphical Models additions: the causal-inference section (`causal-dags`,
 * `backdoor-adjustment`, `mediation-analysis`), numerical integration
 * (`quadrature-rules`, `gaussian-quadrature`, `variance-reduction`,
 * `quasi-monte-carlo`) and two MCMC methods (`hamiltonian-monte-carlo`,
 * `reversible-jump-mcmc`). Eight items per concept, two per cognitive level.
 */
const AUTHORED: SourceRef = {
  id: "mathlingo-authored-causal-computational",
  tier: "generated",
  title: "Mathlingo authored item (causal inference and computational Bayes)",
};

const { mcq, short, num } = makeBuilders(AUTHORED);

// ---------------------------------------------------------------------------
const CD = "causal-dags";
const causalDags: Item[] = [
  mcq(
    { concept: CD, slug: "recall-do", cognitive: "recall", difficulty: -0.5, seconds: 40,
      stem: "In a causal DAG, what does the intervention $do(X = x)$ do to the graph?" },
    "Removes every arrow into $X$ and fixes $X$ at $x$, leaving the other mechanisms unchanged",
    [
      ["Removes every arrow out of $X$", "do-cuts-outgoing", "The effects of $X$ are what we want to measure; it is the causes of $X$ that the intervention overrides."],
      ["Nothing — $do(X = x)$ is the same as conditioning on $X = x$", "do-is-conditioning", "Conditioning restricts attention to units with $X = x$; intervening sets $X$ regardless of its usual causes."],
      ["Removes $X$ from the graph entirely", "do-deletes-node", "$X$ stays, fixed at $x$, and still affects its descendants."],
    ],
  ),
  mcq(
    { concept: CD, slug: "recall-roles", cognitive: "recall", difficulty: -0.6, seconds: 35,
      stem: "In the DAG $X \\leftarrow Z \\to Y$, what role does $Z$ play for the effect of $X$ on $Y$?" },
    "A confounder: it creates association between $X$ and $Y$ that is not causal",
    [
      ["A mediator", "role-mediator", "A mediator lies on a directed path $X \\to Z \\to Y$."],
      ["A collider", "role-collider", "A collider has both arrows pointing into it, $X \\to Z \\leftarrow Y$."],
      ["An instrument", "role-instrument", "An instrument affects $Y$ only through $X$; $Z$ here affects $Y$ directly."],
    ],
  ),
  mcq(
    { concept: CD, slug: "apply-collider", cognitive: "apply", difficulty: 0.1, seconds: 45,
      stem: "$X$ and $Y$ are independent causes of $Z$: $X \\to Z \\leftarrow Y$. What happens if you condition on $Z$?" },
    "$X$ and $Y$ become dependent — conditioning on a collider opens the path",
    [
      ["They remain independent", "collider-stays-closed", "The path is blocked only while $Z$ is not conditioned on."],
      ["They become independent, having been dependent before", "collider-reversed", "They were independent before; conditioning on the collider creates dependence."],
      ["$Z$ becomes independent of $X$", "collider-z-independent", "$Z$ is caused by $X$ and stays dependent on it."],
    ],
  ),
  num(
    { concept: CD, slug: "apply-confounded-slope", cognitive: "apply", difficulty: 0.7, seconds: 120,
      stem: "A structural model has $Z \\sim \\mathcal{N}(0, 1)$, $X = Z + \\eta$ and $Y = 2X + 3Z + \\varepsilon$, with $\\eta, \\varepsilon \\sim \\mathcal{N}(0, 1)$ independent of each other and of $Z$. The causal effect of $X$ on $Y$ is $2$. What slope does an observational regression of $Y$ on $X$ alone estimate?" },
    3.5,
  ),
  short(
    { concept: CD, slug: "explain-seeing-doing", cognitive: "explain", difficulty: 0.4, seconds: 100,
      stem: "Explain why $P(Y \\mid X = x)$ differs from $P(Y \\mid do(X = x))$ when $X$ and $Y$ share a common cause." },
    [
      ["conditioning", "Conditioning on $X = x$ selects units whose common cause took values that tend to produce $X = x$, and that common cause also affects $Y$, so the association mixes the effect of $X$ with the effect of the confounder.", 4, true],
      ["intervening", "Intervening sets $X$ without changing the confounder's distribution, so only the causal path from $X$ contributes.", 3, true],
    ],
  ),
  mcq(
    { concept: CD, slug: "explain-berkson", cognitive: "explain", difficulty: 0.5, seconds: 50,
      stem: "Among hospitalised patients, two diseases that each cause hospitalisation appear negatively correlated, although they are independent in the population. What explains this?" },
    "Studying only hospitalised patients conditions on a collider (hospitalisation), which induces a spurious association",
    [
      ["One disease protects against the other", "berkson-causal", "The diseases are independent in the population; the association is created by selection."],
      ["Hospitalisation confounds the two diseases", "berkson-confounder", "Hospitalisation is caused by the diseases, not a cause of them, so it is a collider, not a confounder."],
      ["Small sample sizes in hospitals", "berkson-sample-size", "The bias persists with any sample size; it is structural."],
    ],
  ),
  short(
    { concept: CD, slug: "transfer-randomisation", cognitive: "transfer", difficulty: 0.5, seconds: 100,
      stem: "Use a causal DAG to explain why a randomised experiment lets $P(Y \\mid X = x)$ be read as $P(Y \\mid do(X = x))$." },
    [
      ["no-arrows", "Randomisation means nothing but the coin determines $X$, so there are no arrows into $X$ from other variables.", 4, true],
      ["no-backdoor", "With no arrows into $X$ there are no backdoor paths, so the observed association equals the causal effect.", 3, true],
    ],
  ),
  mcq(
    { concept: CD, slug: "transfer-post-treatment", cognitive: "transfer", difficulty: 0.4, seconds: 50,
      stem: "To estimate the total effect of a job-training programme on earnings, an analyst proposes to control for the job title held six months after training. Is that wise?" },
    "No — job title is likely a mediator (training → job title → earnings), so adjusting for it removes part of the effect being estimated",
    [
      ["Yes — more controls always reduce bias", "adjust-everything", "Adjusting for mediators or colliders can introduce bias."],
      ["Yes — job title is a confounder", "post-treatment-confounder", "A variable measured after, and affected by, the treatment cannot be a confounder of it."],
      ["It makes no difference", "post-treatment-harmless", "Conditioning on a mediator changes the estimand from the total effect."],
    ],
  ),
];

// ---------------------------------------------------------------------------
const BD = "backdoor-adjustment";
const backdoor: Item[] = [
  mcq(
    { concept: BD, slug: "recall-criterion", cognitive: "recall", difficulty: -0.4, seconds: 45,
      stem: "A set $Z$ satisfies the backdoor criterion for $X \\to Y$ when:" },
    "No member of $Z$ is a descendant of $X$, and $Z$ blocks every path between $X$ and $Y$ that starts with an arrow into $X$",
    [
      ["$Z$ contains every variable correlated with $Y$", "backdoor-all-correlates", "Some correlates are mediators or colliders, which must not be adjusted for."],
      ["$Z$ blocks every path between $X$ and $Y$, including directed ones", "backdoor-block-all", "Blocking the directed (causal) paths would remove the effect itself."],
      ["$Z$ is independent of $X$", "backdoor-independent", "Confounders are typically associated with $X$; that is why they must be adjusted for."],
    ],
  ),
  mcq(
    { concept: BD, slug: "recall-formula", cognitive: "recall", difficulty: -0.2, seconds: 40,
      stem: "If $Z$ satisfies the backdoor criterion, which formula gives $P(y \\mid do(x))$?" },
    "$\\sum_z P(y \\mid x, z)\\, P(z)$",
    [
      ["$\\sum_z P(y \\mid x, z)\\, P(z \\mid x)$", "backdoor-conditional-weights", "Weighting by $P(z \\mid x)$ just gives back $P(y \\mid x)$, confounding and all."],
      ["$P(y \\mid x)$", "backdoor-no-adjustment", "That is the confounded observational association."],
      ["$\\sum_z P(y \\mid z)\\, P(z \\mid x)$", "backdoor-front-door", "This drops $x$ from the outcome model."],
    ],
  ),
  num(
    { concept: BD, slug: "apply-adjustment", cognitive: "apply", difficulty: 0.2, seconds: 80,
      stem: "Success rates are $0.9$ (treated) and $0.8$ (untreated) among mild cases, and $0.4$ (treated) and $0.3$ (untreated) among severe cases. $30\\%$ of patients are severe, and severity satisfies the backdoor criterion. Compute $P(\\text{success} \\mid do(\\text{treat}))$." },
    0.75,
  ),
  mcq(
    { concept: BD, slug: "apply-valid-sets", cognitive: "apply", difficulty: 0.5, seconds: 60,
      stem: "The DAG is $X \\leftarrow Z_1 \\to Z_2 \\to Y$ together with $X \\to Y$. Which sets satisfy the backdoor criterion?" },
    "$\\{Z_1\\}$, $\\{Z_2\\}$ and $\\{Z_1, Z_2\\}$ all do",
    [
      ["Only $\\{Z_1, Z_2\\}$", "backdoor-need-all", "Blocking one non-collider on the only backdoor path is enough."],
      ["Only $\\{Z_1\\}$", "backdoor-only-parent", "Any non-collider on the backdoor path blocks it, including $Z_2$."],
      ["The empty set", "backdoor-empty", "The path $X \\leftarrow Z_1 \\to Z_2 \\to Y$ is open without adjustment."],
    ],
  ),
  short(
    { concept: BD, slug: "explain-no-descendants", cognitive: "explain", difficulty: 0.6, seconds: 100,
      stem: "Why does the backdoor criterion forbid adjusting for descendants of the treatment $X$?" },
    [
      ["mediator", "A descendant on the causal path (a mediator) carries part of the effect; conditioning on it blocks that part.", 3, true],
      ["collider", "A descendant can be a collider (or a descendant of one), and conditioning on it opens a spurious path between $X$ and $Y$.", 3, true],
      ["estimand", "Either way the adjusted quantity is no longer the total causal effect.", 1],
    ],
  ),
  mcq(
    { concept: BD, slug: "explain-many-sets", cognitive: "explain", difficulty: 0.5, seconds: 45,
      stem: "Two different sets both satisfy the backdoor criterion. How should you choose between them?" },
    "Either identifies the same causal effect, so choose on practical grounds — which is measured, and which gives the more precise estimate",
    [
      ["Always pick the larger set, which removes more bias", "backdoor-bigger-better", "Both valid sets remove all confounding bias; extra variables may only add variance."],
      ["They give different effects, so report both", "backdoor-different-answers", "All valid adjustment sets give the same $P(y \\mid do(x))$ in the population."],
      ["Pick whichever gives the largest effect", "backdoor-fish", "Choosing on the result invalidates the inference."],
    ],
  ),
  num(
    { concept: BD, slug: "transfer-simpson", cognitive: "transfer", difficulty: 0.7, seconds: 120,
      stem: "Use the success rates above ($0.9$ vs $0.8$ mild, $0.4$ vs $0.3$ severe). Doctors give the treatment mostly to severe cases: $80\\%$ of treated patients and $20\\%$ of untreated patients are severe. Compute the naive difference $P(\\text{success} \\mid \\text{treated}) - P(\\text{success} \\mid \\text{untreated})$." },
    -0.2,
  ),
  short(
    { concept: BD, slug: "transfer-unmeasured", cognitive: "transfer", difficulty: 0.8, seconds: 120,
      stem: "An observational study adjusts for age, sex and income and finds that a supplement lowers blood pressure. What assumption does the causal reading rest on, and how could the analysts probe it?" },
    [
      ["assumption", "That the adjusted variables block every backdoor path — no unmeasured confounding (e.g. health-consciousness affecting both supplement use and blood pressure).", 4, true],
      ["probe", "Sensitivity analysis (how strong an unmeasured confounder would need to be, e.g. E-values), negative controls, or comparison with experimental evidence.", 3, true],
    ],
  ),
];

// ---------------------------------------------------------------------------
const MA = "mediation-analysis";
const mediation: Item[] = [
  mcq(
    { concept: MA, slug: "recall-decomposition", cognitive: "recall", difficulty: -0.5, seconds: 35,
      stem: "How do the natural direct and indirect effects relate to the total effect?" },
    "$\\text{TE} = \\text{NDE} + \\text{NIE}$",
    [
      ["$\\text{TE} = \\text{NDE} \\times \\text{NIE}$", "mediation-product", "The effects add on the difference scale; products appear inside the linear NIE, not in the decomposition."],
      ["$\\text{TE} = \\text{NDE} - \\text{NIE}$", "mediation-difference", "The indirect effect is added to the direct one."],
      ["$\\text{TE} = \\text{NIE}$ whenever a mediator exists", "mediation-all-indirect", "A direct effect can coexist with the mediated one."],
    ],
  ),
  mcq(
    { concept: MA, slug: "recall-product", cognitive: "recall", difficulty: -0.2, seconds: 40,
      stem: "In the linear models $M = \\alpha_0 + aX + \\varepsilon_M$ and $Y = \\beta_0 + c'X + bM + \\varepsilon_Y$, what is the indirect effect of $X$ on $Y$?" },
    "$ab$",
    [
      ["$c'$", "indirect-is-direct", "$c'$ is the direct effect, holding $M$ fixed."],
      ["$a + b$", "indirect-sum", "Effects along a path multiply."],
      ["$c' + ab$", "indirect-is-total", "That is the total effect."],
    ],
  ),
  num(
    { concept: MA, slug: "apply-proportion", cognitive: "apply", difficulty: -0.1, seconds: 50,
      stem: "In a linear mediation model $a = 0.5$, $b = 2$ and $c' = 1$. What proportion of the total effect is mediated?" },
    0.5,
  ),
  num(
    { concept: MA, slug: "apply-difference", cognitive: "apply", difficulty: -0.2, seconds: 45,
      stem: "Regressing $Y$ on $X$ gives a coefficient of $3.0$; adding the mediator $M$ to the regression reduces the coefficient on $X$ to $1.2$. In a linear model with no interaction, what is the indirect effect?" },
    1.8,
  ),
  short(
    { concept: MA, slug: "explain-randomisation-not-enough", cognitive: "explain", difficulty: 0.8, seconds: 120,
      stem: "The treatment $X$ was randomised. Explain why the direct and indirect effects can still be biased, using the DAG." },
    [
      ["mediator-observed", "Only $X$ is randomised; the mediator $M$ is observed, so the $M \\to Y$ relationship can be confounded by some $U$.", 4, true],
      ["collider", "Conditioning on $M$ to get the direct effect opens the path $X \\to M \\leftarrow U \\to Y$ ($M$ is a collider), biasing both the direct and indirect estimates.", 3, true],
      ["fix", "Mentions measuring and adjusting for mediator–outcome confounders, or sensitivity analysis.", 1],
    ],
  ),
  mcq(
    { concept: MA, slug: "explain-cde-nde", cognitive: "explain", difficulty: 0.6, seconds: 50,
      stem: "How does the controlled direct effect differ from the natural direct effect?" },
    "The CDE fixes the mediator at a chosen value $m$ for everyone; the NDE lets it take the value each unit would have had without treatment",
    [
      ["They are always equal", "cde-equals-nde", "They coincide in linear models without an $X \\times M$ interaction, but not in general."],
      ["The CDE includes the indirect effect", "cde-includes-indirect", "Holding $M$ fixed excludes the indirect path in both."],
      ["The NDE needs no assumptions, the CDE does", "nde-assumption-free", "Natural effects need stronger assumptions than controlled ones."],
    ],
  ),
  short(
    { concept: MA, slug: "transfer-design", cognitive: "transfer", difficulty: 0.7, seconds: 120,
      stem: "You want to know how much of a job-training programme's effect on wages works through improved skills. Outline the analysis, including what you must measure besides treatment, skills and wages." },
    [
      ["models", "Fit a model for skills on treatment (coefficient $a$) and for wages on treatment and skills ($c'$, $b$); the indirect effect is $ab$, the direct $c'$.", 3, true],
      ["confounders", "Measure and adjust for confounders of skills and wages (e.g. prior education, motivation), since randomisation of training doesn't protect that link.", 4, true],
      ["inference", "Use bootstrap confidence intervals for $ab$.", 1],
    ],
  ),
  mcq(
    { concept: MA, slug: "transfer-bootstrap", cognitive: "transfer", difficulty: 0.5, seconds: 45,
      stem: "Why are confidence intervals for the indirect effect $ab$ usually computed by bootstrap rather than with a normal approximation?" },
    "The product of two estimates is not normally distributed in small or moderate samples, so symmetric normal intervals are inaccurate",
    [
      ["Because $a$ and $b$ have no standard errors", "ab-no-se", "Each coefficient has a standard error; their product's distribution is the problem."],
      ["Because the bootstrap removes confounding", "bootstrap-confounding", "Resampling says nothing about confounding."],
      ["Because $ab$ is always zero under the null", "ab-null", "Being zero under the null doesn't make the sampling distribution normal."],
    ],
  ),
];

// ---------------------------------------------------------------------------
const QR = "quadrature-rules";
const quadrature: Item[] = [
  mcq(
    { concept: QR, slug: "recall-simpson-degree", cognitive: "recall", difficulty: -0.4, seconds: 35,
      stem: "Simpson's rule integrates exactly all polynomials up to which degree?" },
    "$3$",
    [
      ["$2$", "simpson-degree-two", "Simpson is built from quadratics, but symmetry makes it exact for cubics too."],
      ["$1$", "simpson-degree-one", "Degree $1$ is the trapezoid rule's limit."],
      ["Any degree", "simpson-any-degree", "Quartics and above incur an $O(h^4)$ error."],
    ],
  ),
  mcq(
    { concept: QR, slug: "recall-trapezoid-order", cognitive: "recall", difficulty: -0.2, seconds: 35,
      stem: "For a smooth integrand, how does the composite trapezoid rule's error scale with the spacing $h$?" },
    "$O(h^2)$",
    [
      ["$O(h)$", "trap-first-order", "The linear error terms cancel; the leading error is proportional to $h^2 f''$."],
      ["$O(h^4)$", "trap-simpson-order", "That is Simpson's order."],
      ["It doesn't depend on $h$", "trap-constant", "Refining the grid reduces the error."],
    ],
  ),
  num(
    { concept: QR, slug: "apply-trapezoid", cognitive: "apply", difficulty: -0.1, seconds: 60,
      stem: "Approximate $\\int_0^1 x^3\\,dx$ with the composite trapezoid rule using $n = 2$ intervals. Give $4$ decimal places." },
    0.3125,
  ),
  num(
    { concept: QR, slug: "apply-simpson", cognitive: "apply", difficulty: 0.2, seconds: 80,
      stem: "Approximate $\\int_0^2 e^x\\,dx$ with Simpson's rule using $n = 2$ intervals. Give $3$ decimal places." },
    6.421,
  ),
  short(
    { concept: QR, slug: "explain-curse", cognitive: "explain", difficulty: 0.5, seconds: 100,
      stem: "Explain why product-grid quadrature becomes impractical in high dimensions, while Monte Carlo does not." },
    [
      ["grid", "A grid with $m$ points per axis needs $m^d$ evaluations, which grows exponentially in $d$.", 3, true],
      ["rate", "An $O(h^k)$ rule then has error $O(N^{-k/d})$ at total cost $N$, so its accuracy collapses as $d$ grows.", 3, true],
      ["mc", "Monte Carlo's error is $O(N^{-1/2})$ regardless of dimension.", 2],
    ],
  ),
  mcq(
    { concept: QR, slug: "explain-halving", cognitive: "explain", difficulty: 0.0, seconds: 35,
      stem: "For a smooth integrand, halving the step size $h$ in composite Simpson's rule reduces the error by roughly what factor?" },
    "$16$",
    [
      ["$2$", "halving-linear", "Simpson's error is $O(h^4)$, not $O(h)$."],
      ["$4$", "halving-trapezoid", "A factor of $4$ is the trapezoid rule's $O(h^2)$ behaviour."],
      ["$8$", "halving-cubic", "The exponent is $4$, giving $2^4 = 16$."],
    ],
  ),
  num(
    { concept: QR, slug: "transfer-grid-count", cognitive: "transfer", difficulty: 0.0, seconds: 40,
      stem: "A product grid uses $20$ points along each of $6$ dimensions. How many function evaluations does it need?" },
    64000000,
    0.001,
  ),
  mcq(
    { concept: QR, slug: "transfer-kink", cognitive: "transfer", difficulty: 0.5, seconds: 50,
      stem: "The integrand $|x - 0.3|$ on $[0, 1]$ has a kink at $0.3$. Which approach gives the most accurate integral for a given budget?" },
    "Split the interval at $0.3$ (or use adaptive quadrature), then apply a high-order rule on each smooth piece",
    [
      ["Simpson's rule on a fine uniform grid", "kink-high-order-uniform", "The kink destroys Simpson's $O(h^4)$ rate on the interval containing it."],
      ["Monte Carlo", "kink-monte-carlo", "In one dimension Monte Carlo's $n^{-1/2}$ rate is far slower than piecewise quadrature."],
      ["The trapezoid rule with a single interval", "kink-single-trap", "A single interval ignores the kink entirely."],
    ],
  ),
];

// ---------------------------------------------------------------------------
const GQ = "gaussian-quadrature";
const gaussQuad: Item[] = [
  mcq(
    { concept: GQ, slug: "recall-degree", cognitive: "recall", difficulty: -0.4, seconds: 35,
      stem: "An $n$-point Gaussian quadrature rule is exact for polynomials up to which degree?" },
    "$2n - 1$",
    [
      ["$n - 1$", "gq-interpolatory", "That is what fixed nodes guarantee; choosing the nodes as well doubles it."],
      ["$n$", "gq-degree-n", "The rule has $2n$ free parameters and uses them all."],
      ["$2n$", "gq-degree-2n", "$2n$ parameters match $2n$ coefficients, i.e. degree $2n - 1$."],
    ],
  ),
  mcq(
    { concept: GQ, slug: "recall-nodes", cognitive: "recall", difficulty: -0.1, seconds: 40,
      stem: "Where are the nodes of an $n$-point Gaussian quadrature rule placed?" },
    "At the roots of the degree-$n$ polynomial orthogonal with respect to the weight function",
    [
      ["Equally spaced across the interval", "gq-equal-spacing", "Equal spacing gives Newton–Cotes rules."],
      ["At random points", "gq-random", "Random points are Monte Carlo."],
      ["At the interval's endpoints and midpoint", "gq-simpson-nodes", "Those are Simpson's nodes."],
    ],
  ),
  num(
    { concept: GQ, slug: "apply-four-point", cognitive: "apply", difficulty: -0.3, seconds: 35,
      stem: "What is the highest polynomial degree a $4$-point Gauss–Legendre rule integrates exactly?" },
    7,
    0.001,
  ),
  num(
    { concept: GQ, slug: "apply-fourth-moment", cognitive: "apply", difficulty: 0.5, seconds: 90,
      stem: "The $2$-point Gauss–Hermite rule, mapped to $Z \\sim \\mathcal{N}(0, 1)$, evaluates $g$ at $z = \\pm 1$ with weight $\\tfrac{1}{2}$ each. What does it return for $\\mathbb{E}[Z^4]$?" },
    1,
  ),
  short(
    { concept: GQ, slug: "explain-2n-minus-1", cognitive: "explain", difficulty: 0.5, seconds: 100,
      stem: "Explain, by counting free parameters, why $2n - 1$ is the highest polynomial degree an $n$-point rule can integrate exactly." },
    [
      ["params", "The rule has $n$ nodes and $n$ weights: $2n$ free parameters.", 3, true],
      ["match", "A polynomial of degree $2n - 1$ has $2n$ coefficients, so exactness on all of them imposes $2n$ conditions, which $2n$ parameters can meet.", 3, true],
      ["upper", "No $n$-point rule integrates $\\prod_i (x - x_i)^2$ (degree $2n$) exactly — it is positive but the rule gives $0$.", 2],
    ],
  ),
  mcq(
    { concept: GQ, slug: "explain-hermite-mapping", cognitive: "explain", difficulty: 0.4, seconds: 45,
      stem: "Gauss–Hermite nodes $x_i$ are designed for the weight $e^{-x^2}$. How are they used to approximate $\\mathbb{E}[g(Z)]$ for $Z \\sim \\mathcal{N}(\\mu, \\sigma^2)$?" },
    "Evaluate $g$ at $\\mu + \\sqrt{2}\\,\\sigma x_i$ and divide the weighted sum by $\\sqrt{\\pi}$",
    [
      ["Evaluate $g$ at $\\mu + \\sigma x_i$", "gh-missing-sqrt2", "The normal density has $e^{-z^2/2}$, so the substitution needs the factor $\\sqrt{2}$."],
      ["Evaluate $g$ at the $x_i$ directly", "gh-no-mapping", "The nodes must be shifted and scaled to the distribution."],
      ["Gauss–Hermite can't be used for normal expectations", "gh-not-normal", "Normal expectations are exactly what it is designed for."],
    ],
  ),
  mcq(
    { concept: GQ, slug: "transfer-glmm", cognitive: "transfer", difficulty: 0.5, seconds: 45,
      stem: "Fitting a logistic mixed model requires, for each cluster, integrating the likelihood over a normally distributed random intercept. Which method is standard?" },
    "(Adaptive) Gauss–Hermite quadrature over the one-dimensional random effect",
    [
      ["Simpson's rule on $[-1, 1]$", "glmm-simpson", "The integral runs over the whole real line against a normal density."],
      ["Monte Carlo with $10^6$ draws per cluster", "glmm-mc", "For a one-dimensional smooth integral, a handful of quadrature nodes is far more accurate."],
      ["No integration is needed", "glmm-no-integral", "The marginal likelihood integrates the random effect out."],
    ],
  ),
  short(
    { concept: GQ, slug: "transfer-high-dim", cognitive: "transfer", difficulty: 0.7, seconds: 100,
      stem: "A colleague plans to compute a $20$-dimensional posterior expectation with a $5$-point Gauss–Hermite product rule. What goes wrong, and what would you suggest?" },
    [
      ["count", "The product grid needs $5^{20} \\approx 9.5 \\times 10^{13}$ evaluations — infeasible.", 4, true],
      ["alternative", "Use Monte Carlo/MCMC, quasi-Monte Carlo, sparse grids, or a Laplace approximation instead.", 3, true],
    ],
  ),
];

// ---------------------------------------------------------------------------
const VR = "variance-reduction";
const varianceReduction: Item[] = [
  mcq(
    { concept: VR, slug: "recall-beta", cognitive: "recall", difficulty: -0.2, seconds: 40,
      stem: "For the control-variate estimator of $\\mathbb{E}[g - \\beta(C - \\mu_C)]$, which $\\beta$ minimises the variance?" },
    "$\\beta^* = \\operatorname{Cov}(g, C)/\\operatorname{Var}(C)$",
    [
      ["$\\beta = 1$ always", "cv-beta-one", "$\\beta = 1$ is optimal only when the regression slope happens to be $1$."],
      ["$\\beta = \\operatorname{Corr}(g, C)$", "cv-beta-corr", "The correlation must be rescaled by $\\sigma_g/\\sigma_C$."],
      ["$\\beta = \\operatorname{Var}(C)/\\operatorname{Cov}(g, C)$", "cv-beta-inverted", "The ratio is inverted."],
    ],
  ),
  mcq(
    { concept: VR, slug: "recall-antithetic", cognitive: "recall", difficulty: -0.1, seconds: 40,
      stem: "Antithetic sampling pairs each $U$ with $1 - U$. When is it guaranteed to reduce variance?" },
    "When $g$ is monotone, so $g(U)$ and $g(1 - U)$ are negatively correlated",
    [
      ["Always", "antithetic-always", "For a symmetric $g$ such as $(u - 0.5)^2$ the pair is perfectly positively correlated and variance doubles relative to independent pairs."],
      ["When $g$ is symmetric about $0.5$", "antithetic-symmetric", "Symmetry makes the two draws identical, the worst case."],
      ["Only in one dimension", "antithetic-1d", "Antithetic pairs work in any dimension; monotonicity is what matters."],
    ],
  ),
  num(
    { concept: VR, slug: "apply-control-variate", cognitive: "apply", difficulty: 0.0, seconds: 50,
      stem: "Plain Monte Carlo has per-draw variance $4$. A control variate with correlation $0.9$ to the integrand is used with the optimal coefficient. What is the new per-draw variance?" },
    0.76,
  ),
  num(
    { concept: VR, slug: "apply-antithetic", cognitive: "apply", difficulty: 0.3, seconds: 70,
      stem: "Each draw has variance $1$, and an antithetic pair has correlation $-0.6$. What is the variance of the average of one antithetic pair?" },
    0.2,
  ),
  short(
    { concept: VR, slug: "explain-stratification", cognitive: "explain", difficulty: 0.7, seconds: 120,
      stem: "Explain why stratified sampling with proportional allocation never has higher variance than simple Monte Carlo with the same number of draws." },
    [
      ["decompose", "The law of total variance splits $\\operatorname{Var}(g)$ into a within-strata part and a between-strata part.", 4, true],
      ["remove", "Proportional allocation fixes how many draws land in each stratum, eliminating the between-strata part and leaving only the within-strata variance.", 3, true],
    ],
  ),
  mcq(
    { concept: VR, slug: "explain-worth", cognitive: "explain", difficulty: 0.2, seconds: 40,
      stem: "A variance-reduction technique cuts the per-draw variance by a factor of $5$. What is that worth?" },
    "The same accuracy as $5$ times as many plain Monte Carlo draws",
    [
      ["The same accuracy as $\\sqrt{5}$ times as many draws", "vr-sqrt", "Error scales as $\\sqrt{\\sigma^2/n}$, so a factor on $\\sigma^2$ is equivalent to the same factor on $n$."],
      ["A faster convergence rate than $n^{-1/2}$", "vr-rate", "The rate stays $n^{-1/2}$; only the constant improves."],
      ["It removes the bias of the estimator", "vr-bias", "Plain Monte Carlo is already unbiased."],
    ],
  ),
  short(
    { concept: VR, slug: "transfer-option", cognitive: "transfer", difficulty: 0.7, seconds: 120,
      stem: "You price a path-dependent option by simulating stock paths. Suggest a control variate, and explain why it would help." },
    [
      ["choice", "Proposes a quantity with known expectation that is strongly correlated with the payoff — e.g. the terminal stock price (known mean under the risk-neutral measure) or a European/geometric-average option with a closed-form price.", 4, true],
      ["why", "High correlation means the variance factor $1 - \\rho^2$ is small, so far fewer paths are needed for the same accuracy.", 3, true],
    ],
  ),
  num(
    { concept: VR, slug: "transfer-equivalent-draws", cognitive: "transfer", difficulty: 0.4, seconds: 60,
      stem: "A control variate has $\\rho^2 = 0.75$ with the integrand. How many plain Monte Carlo draws give the same accuracy as $1000$ controlled draws?" },
    4000,
  ),
];

// ---------------------------------------------------------------------------
const QMC = "quasi-monte-carlo";
const qmc: Item[] = [
  mcq(
    { concept: QMC, slug: "recall-rate", cognitive: "recall", difficulty: -0.2, seconds: 35,
      stem: "For smooth integrands in $d$ dimensions, how does quasi-Monte Carlo's error typically scale with $n$ points?" },
    "About $(\\log n)^d / n$",
    [
      ["$n^{-1/2}$", "qmc-mc-rate", "That is plain Monte Carlo's rate."],
      ["$n^{-k/d}$", "qmc-grid-rate", "That is a product-grid rule of order $k$."],
      ["It doesn't improve with $n$", "qmc-no-improve", "The error falls roughly like $1/n$."],
    ],
  ),
  mcq(
    { concept: QMC, slug: "recall-van-der-corput", cognitive: "recall", difficulty: -0.3, seconds: 40,
      stem: "The base-$2$ van der Corput sequence begins $0.5, 0.25, \\ldots$. What is its third term?" },
    "$0.75$",
    [
      ["$0.125$", "vdc-halving", "The sequence reflects binary digits: $3 = 11_2 \\mapsto 0.11_2 = 0.75$."],
      ["$0.375$", "vdc-arithmetic", "It fills gaps by digit reversal, not by averaging neighbours."],
      ["$1.0$", "vdc-one", "All terms lie in $[0, 1)$."],
    ],
  ),
  num(
    { concept: QMC, slug: "apply-vdc-base2", cognitive: "apply", difficulty: 0.0, seconds: 50,
      stem: "Compute the $5$th term of the base-$2$ van der Corput sequence (reflect the binary digits of $5$ about the radix point)." },
    0.625,
  ),
  num(
    { concept: QMC, slug: "apply-vdc-base3", cognitive: "apply", difficulty: 0.3, seconds: 60,
      stem: "Compute the $4$th term of the base-$3$ van der Corput sequence. Give $3$ decimal places." },
    0.444,
  ),
  short(
    { concept: QMC, slug: "explain-randomised", cognitive: "explain", difficulty: 0.6, seconds: 100,
      stem: "Why is randomised quasi-Monte Carlo (e.g. a random shift or scrambling) often preferred over plain QMC?" },
    [
      ["no-error-bar", "Plain QMC is deterministic, so it gives no variance or standard error, and the Koksma–Hlawka bound is rarely computable.", 4, true],
      ["rqmc", "Randomisation keeps the low discrepancy, makes each estimate unbiased, and independent replicates give a confidence interval.", 3, true],
      ["bonus", "Mentions that scrambling can even improve the rate for smooth integrands.", 1],
    ],
  ),
  mcq(
    { concept: QMC, slug: "explain-koksma", cognitive: "explain", difficulty: 0.5, seconds: 45,
      stem: "What does the Koksma–Hlawka inequality bound the QMC error by?" },
    "The integrand's variation times the point set's star discrepancy",
    [
      ["The integrand's variance divided by $\\sqrt{n}$", "kh-mc", "That is the Monte Carlo standard error."],
      ["The largest gap between consecutive points", "kh-gap", "Discrepancy measures box-volume mismatch over all boxes, not one gap."],
      ["The dimension $d$ divided by $n$", "kh-dimension", "The bound involves the discrepancy, which depends on $d$ through $(\\log n)^d$."],
    ],
  ),
  mcq(
    { concept: QMC, slug: "transfer-when", cognitive: "transfer", difficulty: 0.5, seconds: 45,
      stem: "In which problem is quasi-Monte Carlo most likely to beat plain Monte Carlo substantially?" },
    "Pricing a smooth payoff whose value depends mainly on a few leading coordinates (low effective dimension)",
    [
      ["An integrand full of discontinuities in $500$ equally important dimensions", "qmc-rough-high-dim", "Discontinuities and high effective dimension erode QMC's advantage."],
      ["Sampling from an unnormalised posterior with MCMC", "qmc-mcmc", "Standard QMC constructions are for integrals over the unit cube, not Markov chains."],
      ["A one-dimensional smooth integral", "qmc-1d", "In one dimension Gaussian quadrature is better still."],
    ],
  ),
  num(
    { concept: QMC, slug: "transfer-sample-size", cognitive: "transfer", difficulty: 0.4, seconds: 60,
      stem: "With $10{,}000$ points both plain MC and QMC reach an error of about $0.01$. To reach $0.001$, how many points does QMC need, assuming its error falls like $1/n$?" },
    100000,
  ),
];

// ---------------------------------------------------------------------------
const HMC = "hamiltonian-monte-carlo";
const hmc: Item[] = [
  mcq(
    { concept: HMC, slug: "recall-needs", cognitive: "recall", difficulty: -0.4, seconds: 35,
      stem: "What does Hamiltonian Monte Carlo require that random-walk Metropolis does not?" },
    "The gradient of the log posterior density",
    [
      ["The normalising constant of the posterior", "hmc-normaliser", "Like Metropolis, HMC only needs the density up to a constant."],
      ["Closed-form full conditionals", "hmc-conditionals", "That is Gibbs sampling's requirement."],
      ["Independent proposals", "hmc-independent", "HMC proposals depend on the current state through the simulated trajectory."],
    ],
  ),
  mcq(
    { concept: HMC, slug: "recall-leapfrog", cognitive: "recall", difficulty: 0.1, seconds: 45,
      stem: "Why does HMC's acceptance probability need no Jacobian term?" },
    "The leapfrog integrator is volume-preserving and reversible",
    [
      ["Because the momentum is Gaussian", "hmc-gaussian-momentum", "The momentum distribution doesn't remove the need for a Jacobian; volume preservation does."],
      ["Because every proposal is accepted", "hmc-always-accept", "The discretised dynamics do not conserve energy exactly, so rejections occur."],
      ["Because HMC is a Gibbs sampler", "hmc-is-gibbs", "HMC is a Metropolis method with a deterministic proposal map."],
    ],
  ),
  num(
    { concept: HMC, slug: "apply-leapfrog", cognitive: "apply", difficulty: 0.5, seconds: 120,
      stem: "For $U(\\theta) = \\theta^2/2$ and $K(p) = p^2/2$, start at $\\theta = 1$, $p = 0$ and take one leapfrog step of size $\\epsilon = 0.5$: half-step $p$, full-step $\\theta$, half-step $p$. What is the new $\\theta$?" },
    0.875,
  ),
  num(
    { concept: HMC, slug: "apply-acceptance", cognitive: "apply", difficulty: 0.1, seconds: 45,
      stem: "A trajectory ends with Hamiltonian $0.2$ higher than it started. What is the acceptance probability, $\\min(1, e^{-\\Delta H})$? Give $3$ decimal places." },
    0.819,
  ),
  short(
    { concept: HMC, slug: "explain-high-dim", cognitive: "explain", difficulty: 0.6, seconds: 100,
      stem: "Explain why HMC explores high-dimensional posteriors far more efficiently than random-walk Metropolis." },
    [
      ["random-walk", "Random-walk proposals ignore the density's shape; in high dimensions most directions lead to low density, so the step must shrink to keep acceptance, and the chain moves diffusively.", 4, true],
      ["hmc", "HMC follows the gradient-guided dynamics along the posterior's typical set, making long moves that approximately conserve energy and are still accepted with high probability.", 4, true],
    ],
  ),
  mcq(
    { concept: HMC, slug: "explain-divergences", cognitive: "explain", difficulty: 0.5, seconds: 50,
      stem: "Stan reports many “divergent transitions”. What do they indicate?" },
    "The integrator's energy error blew up in regions of high curvature, so those regions are not being explored reliably",
    [
      ["The chain has converged", "divergence-converged", "Divergences are a warning sign, not a convergence indicator."],
      ["The prior is improper", "divergence-improper", "Improper priors can cause problems, but divergences specifically signal integration failure in high-curvature regions."],
      ["The model has too few parameters", "divergence-too-few", "Divergences relate to geometry, not parameter count."],
    ],
  ),
  mcq(
    { concept: HMC, slug: "transfer-funnel", cognitive: "transfer", difficulty: 0.7, seconds: 50,
      stem: "A hierarchical model $\\theta_j \\sim \\mathcal{N}(\\mu, \\tau^2)$ with few observations per group produces divergences near small $\\tau$. What is the standard remedy?" },
    "Reparameterise non-centrally: $\\theta_j = \\mu + \\tau z_j$ with $z_j \\sim \\mathcal{N}(0, 1)$",
    [
      ["Increase the number of warmup iterations only", "funnel-more-warmup", "Longer warmup rarely fixes the funnel's geometry."],
      ["Switch to random-walk Metropolis", "funnel-rwm", "Random-walk Metropolis struggles with the funnel too, and gives no warning."],
      ["Ignore the divergences if $\\hat{R} \\approx 1$", "funnel-ignore", "Divergences can bias estimates even when $\\hat{R}$ looks fine."],
    ],
  ),
  short(
    { concept: HMC, slug: "transfer-discrete", cognitive: "transfer", difficulty: 0.7, seconds: 100,
      stem: "A model has a discrete latent variable (e.g. a mixture component label). Why can't plain HMC sample it, and what are the usual workarounds?" },
    [
      ["gradient", "HMC needs gradients of the log density with respect to continuous parameters; a discrete variable has none, and the dynamics are defined on $\\mathbb{R}^d$.", 4, true],
      ["workaround", "Marginalise the discrete variable out analytically (sum over labels), or alternate HMC for continuous parameters with Gibbs updates for the discrete ones.", 3, true],
    ],
  ),
];

// ---------------------------------------------------------------------------
const RJ = "reversible-jump-mcmc";
const rjmcmc: Item[] = [
  mcq(
    { concept: RJ, slug: "recall-purpose", cognitive: "recall", difficulty: -0.5, seconds: 35,
      stem: "What problem does reversible jump MCMC solve?" },
    "Sampling a posterior over models whose parameter spaces have different dimensions",
    [
      ["Sampling a posterior with no gradient available", "rj-no-gradient", "Plain Metropolis already handles that."],
      ["Speeding up Gibbs sampling in one fixed model", "rj-speed-gibbs", "RJMCMC is about moving between models."],
      ["Computing the normalising constant exactly", "rj-normaliser", "It estimates model probabilities by visit frequencies, not exact constants."],
    ],
  ),
  mcq(
    { concept: RJ, slug: "recall-jacobian", cognitive: "recall", difficulty: 0.1, seconds: 45,
      stem: "Why does the reversible jump acceptance ratio include a Jacobian?" },
    "The move maps $(\\theta_k, u)$ to $\\theta_{k'}$ through a deterministic bijection, and densities change by the Jacobian under a change of variables",
    [
      ["To penalise larger models", "rj-jacobian-penalty", "Complexity penalties come from the priors and likelihood, not the Jacobian."],
      ["Because the proposal is Gaussian", "rj-jacobian-gaussian", "The proposal density $q(u)$ appears separately; the Jacobian comes from the transformation."],
      ["It doesn't; RJMCMC uses the plain Metropolis ratio", "rj-no-jacobian", "Without the Jacobian the chain targets the wrong distribution unless the map has unit Jacobian."],
    ],
  ),
  num(
    { concept: RJ, slug: "apply-jacobian", cognitive: "apply", difficulty: 0.3, seconds: 60,
      stem: "A split move sets $\\mu_1 = \\mu - u$ and $\\mu_2 = \\mu + u$. What is the absolute Jacobian determinant $\\left|\\partial(\\mu_1, \\mu_2)/\\partial(\\mu, u)\\right|$?" },
    2,
  ),
  num(
    { concept: RJ, slug: "apply-bayes-factor", cognitive: "apply", difficulty: 0.5, seconds: 80,
      stem: "An RJMCMC run of $10{,}000$ iterations spends $6000$ in model $1$ and $2000$ in model $2$. The prior probabilities were $0.5$ for model $1$ and $0.25$ for model $2$. Estimate the Bayes factor $B_{12}$." },
    1.5,
  ),
  short(
    { concept: RJ, slug: "explain-dimension-matching", cognitive: "explain", difficulty: 0.6, seconds: 100,
      stem: "Explain the idea of dimension matching in reversible jump MCMC." },
    [
      ["pad", "To jump from a $d_k$- to a $d_{k'}$-dimensional model, draw auxiliary variables $u$ of dimension $d_{k'} - d_k$ so that $(\\theta_k, u)$ and $\\theta_{k'}$ have equal dimension.", 4, true],
      ["bijection", "Link them by a bijection, so the reverse move is well defined and a Metropolis–Hastings ratio (with the Jacobian) compares densities on the same space.", 3, true],
    ],
  ),
  mcq(
    { concept: RJ, slug: "explain-mixing", cognitive: "explain", difficulty: 0.5, seconds: 45,
      stem: "In practice, what most often goes wrong with RJMCMC?" },
    "Jump proposals land in low-posterior regions of the new model, so they are rejected and the chain rarely switches models",
    [
      ["The chain switches models too often", "rj-too-many-jumps", "The usual problem is the opposite: too few accepted jumps."],
      ["The Jacobian is always zero", "rj-zero-jacobian", "Bijections have nonzero Jacobians."],
      ["It can only handle two models", "rj-two-models", "RJMCMC works with any countable set of models."],
    ],
  ),
  mcq(
    { concept: RJ, slug: "transfer-change-points", cognitive: "transfer", difficulty: 0.3, seconds: 45,
      stem: "Which problem is a natural application of reversible jump MCMC?" },
    "Estimating a piecewise-constant rate when the number of change points is unknown",
    [
      ["Estimating a single normal mean", "rj-single-mean", "A fixed-dimension model needs no jumps."],
      ["Fitting a linear regression with a known set of predictors", "rj-fixed-regression", "The dimension is fixed; ordinary MCMC suffices."],
      ["Computing a sample median", "rj-median", "No posterior over models is involved."],
    ],
  ),
  short(
    { concept: RJ, slug: "transfer-alternatives", cognitive: "transfer", difficulty: 0.7, seconds: 100,
      stem: "You are comparing only three candidate regression models. Suggest an alternative to reversible jump MCMC and say when it is preferable." },
    [
      ["alternative", "Fit each model separately and estimate its marginal likelihood (e.g. bridge sampling, or approximations such as BIC / Laplace), then combine into posterior model probabilities or Bayesian model averaging.", 4, true],
      ["when", "Preferable when the model set is small and enumerable, since it avoids designing cross-model jumps and the mixing problems they bring.", 3, true],
    ],
  ),
];

export const causalAndComputationalItems: Item[] = [
  ...causalDags,
  ...backdoor,
  ...mediation,
  ...quadrature,
  ...gaussQuad,
  ...varianceReduction,
  ...qmc,
  ...hmc,
  ...rjmcmc,
];
