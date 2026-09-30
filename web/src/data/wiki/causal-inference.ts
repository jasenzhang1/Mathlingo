import type { WikiArticle } from "./types";

/**
 * "Causal Inference with DAGs" — three articles that reuse d-separation from
 * the section before them. A DAG read causally says what intervening does; the
 * backdoor criterion says which variables to adjust for to compute it from
 * observational data; mediation analysis splits the resulting effect into the
 * part through a mediator and the part around it.
 */

export const causalDagsWiki: WikiArticle = {
  conceptId: "causal-dags",
  summary:
    "A causal DAG draws an arrow $X \\to Y$ when $X$ is a direct cause of $Y$. Read that way, the graph says not only " +
    "which variables are independent but what happens when you intervene: $P(Y \\mid do(X = x))$, the distribution of " +
    "$Y$ if $X$ were set to $x$, generally differs from $P(Y \\mid X = x)$, what you see when $X$ happens to equal $x$. " +
    "The three basic path shapes — chain, fork, collider — decide when they differ.",
  sections: [
    {
      heading: "Seeing versus doing",
      blocks: [
        {
          kind: "prose",
          text:
            "Intervening on $X$ cuts every arrow into $X$ — whatever normally causes $X$ no longer does — and leaves the rest of " +
            "the mechanism intact. Conditioning on $X$ leaves the graph alone and only restricts attention to units where $X$ took " +
            "that value. The two agree exactly when nothing that causes $X$ also affects $Y$ by another route.",
        },
        {
          kind: "formula",
          latex: "P(y \\mid do(x)) \\ne P(y \\mid x) \\text{ in general}; \\qquad \\text{ATE} = \\mathbb{E}[Y \\mid do(X = 1)] - \\mathbb{E}[Y \\mid do(X = 0)]",
        },
      ],
    },
    {
      heading: "Confounders, mediators and colliders",
      blocks: [
        {
          kind: "table",
          headers: ["Structure", "Role of $Z$", "Adjust for $Z$ to estimate $X \\to Y$?"],
          rows: [
            ["$X \\leftarrow Z \\to Y$ (fork)", "confounder: creates a non-causal association", "Yes — conditioning blocks the spurious path"],
            ["$X \\to Z \\to Y$ (chain)", "mediator: carries part of the effect", "No, for the total effect — it blocks part of what you want to measure"],
            ["$X \\to Z \\leftarrow Y$ (collider)", "collider: the path is already blocked", "No — conditioning opens a spurious path (collider bias)"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Collider bias is everywhere",
          text:
            "Among hospitalised patients, two diseases that each cause hospitalisation appear negatively correlated even if " +
            "independent in the population (Berkson's paradox): selecting on hospitalisation conditions on a collider. " +
            "“Adjust for everything” is not a safe default.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Confounding by severity",
          problem:
            "Sicker patients are more likely to get a treatment $T$ and more likely to die. Draw the DAG and explain why the raw death rate among the treated overstates harm.",
          steps: [
            "Severity $S$ causes both: $T \\leftarrow S \\to Y$, plus the effect of interest $T \\to Y$.",
            "The fork through $S$ is a backdoor path, so $P(Y \\mid T)$ mixes the effect of $T$ with the fact that treated patients were sicker.",
            "Comparing within levels of $S$ blocks the path and isolates $T \\to Y$.",
          ],
          answer: "Severity is a confounder; the observed association is biased towards harm until $S$ is adjusted for.",
        },
      ],
    },
  ],
  references: [
    { source: "Pearl, Glymour & Jewell, Causal Inference in Statistics: A Primer", locator: "Ch. 2–3" },
    { source: "Hernán & Robins, Causal Inference: What If", locator: "Ch. 6–8" },
  ],
};

export const backdoorAdjustmentWiki: WikiArticle = {
  conceptId: "backdoor-adjustment",
  summary:
    "A backdoor path from $X$ to $Y$ is a path that starts with an arrow into $X$. Such paths carry association that is " +
    "not causation. If a set $Z$ blocks every one of them and contains no descendant of $X$, then the causal effect is " +
    "identified by averaging the within-stratum associations over the population distribution of $Z$ — the adjustment " +
    "formula.",
  sections: [
    {
      heading: "The criterion and the formula",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "No variable in $Z$ is a descendant of $X$.",
            "$Z$ blocks every path between $X$ and $Y$ that begins with an arrow into $X$ (in the d-separation sense).",
          ],
        },
        {
          kind: "formula",
          latex: "P(y \\mid do(x)) = \\sum_z P(y \\mid x, z)\\, P(z)",
          caption: "weights by the marginal $P(z)$, not by $P(z \\mid x)$ — that difference is the whole adjustment",
        },
        {
          kind: "prose",
          text:
            "Condition 1 rules out adjusting for mediators and for colliders downstream of $X$. Condition 2 removes the " +
            "confounding. Several different sets may satisfy the criterion; any of them gives the same answer, so choose " +
            "the one that is measured and estimable with the least variance.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Simpson's paradox resolved",
          problem:
            "Treatment success rates: mild cases $0.9$ treated vs $0.8$ untreated; severe cases $0.4$ treated vs $0.3$ untreated. $50\\%$ of patients are severe. Severity affects both treatment choice and outcome. Find $P(\\text{success} \\mid do(\\text{treat}))$ and $P(\\text{success} \\mid do(\\text{no treat}))$.",
          steps: [
            "Severity satisfies the backdoor criterion.",
            "$P(s \\mid do(t)) = 0.9(0.5) + 0.4(0.5) = 0.65$.",
            "$P(s \\mid do(\\bar{t})) = 0.8(0.5) + 0.3(0.5) = 0.55$.",
          ],
          answer: "Treatment raises success by $0.10$ — whatever the raw pooled rates suggest, which depend on who happened to be treated.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Regression adjustment is the same idea",
          text:
            "Including $Z$ as covariates in a regression of $Y$ on $X$ is a model-based version of the adjustment formula. " +
            "It inherits the same rule: put confounders in, keep mediators and colliders out.",
        },
      ],
    },
  ],
  references: [
    { source: "Pearl, Glymour & Jewell, Causal Inference in Statistics: A Primer", locator: "§3.2–3.3" },
    { source: "Pearl, Causality (2nd ed.)", locator: "§3.3.1" },
  ],
};

export const mediationAnalysisWiki: WikiArticle = {
  conceptId: "mediation-analysis",
  summary:
    "Mediation analysis asks how an effect happens. In $X \\to M \\to Y$ with a direct arrow $X \\to Y$ as well, the total " +
    "effect of $X$ splits into an indirect part that flows through the mediator $M$ and a direct part that bypasses it. " +
    "Defining the parts needs counterfactuals; estimating them needs the DAG to rule out confounding of three relationships, " +
    "not one.",
  sections: [
    {
      heading: "Effects",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Total effect (TE)", description: "$\\mathbb{E}[Y \\mid do(X = 1)] - \\mathbb{E}[Y \\mid do(X = 0)]$." },
            { term: "Controlled direct effect (CDE)", description: "The effect of $X$ with the mediator held fixed at a value $m$: $\\mathbb{E}[Y \\mid do(X = 1, M = m)] - \\mathbb{E}[Y \\mid do(X = 0, M = m)]$." },
            { term: "Natural direct effect (NDE)", description: "Change $X$ from $0$ to $1$ while $M$ stays at the value it would naturally take under $X = 0$." },
            { term: "Natural indirect effect (NIE)", description: "Keep $X = 1$ but shift $M$ from its $X = 0$ value to its $X = 1$ value. $\\text{TE} = \\text{NDE} + \\text{NIE}$." },
          ],
        },
      ],
    },
    {
      heading: "The linear case: product of coefficients",
      blocks: [
        {
          kind: "formula",
          latex: "M = \\alpha_0 + a X + \\varepsilon_M, \\qquad Y = \\beta_0 + c' X + b M + \\varepsilon_Y \\;\\Longrightarrow\\; \\text{NIE} = ab, \\quad \\text{NDE} = c', \\quad \\text{TE} = c' + ab",
          caption: "with no $X \\times M$ interaction; with an interaction the decomposition depends on the reference level",
        },
        {
          kind: "prose",
          text:
            "Regressing $Y$ on $X$ alone gives the total effect $c = c' + ab$. Adding $M$ to the regression gives the direct " +
            "effect $c'$. Their difference $c - c'$ equals $ab$ in linear models — the Baron–Kenny logic — but the product-of-" +
            "coefficients form is what generalises. Its standard error is usually obtained by bootstrap, since $ab$ is not normal " +
            "in small samples.",
        },
      ],
    },
    {
      heading: "Identification assumptions",
      blocks: [
        {
          kind: "list",
          items: [
            "No unmeasured confounding of $X \\to Y$.",
            "No unmeasured confounding of $X \\to M$.",
            "No unmeasured confounding of $M \\to Y$ — the one randomising $X$ does not guarantee.",
            "No confounder of $M \\to Y$ that is itself affected by $X$ (for natural effects).",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Randomised treatment is not enough",
          text:
            "In a randomised trial $X$ is unconfounded, but the mediator is observed, not assigned. A common cause of $M$ and " +
            "$Y$ makes $M$ a collider on the path $X \\to M \\leftarrow U \\to Y$; conditioning on $M$ to get the direct effect " +
            "opens it and biases both $c'$ and $ab$.",
        },
        {
          kind: "example",
          title: "Product of coefficients",
          problem: "A training programme $X$ raises skill $M$ by $a = 2$ points; each point of skill raises wages $Y$ by $b = 1.5$; the direct effect of the programme on wages is $c' = 1$. Find the indirect, direct and total effects.",
          steps: [
            "$\\text{NIE} = ab = 3$.",
            "$\\text{NDE} = c' = 1$.",
            "$\\text{TE} = 4$, of which $3/4 = 75\\%$ is mediated by skill.",
          ],
          answer: "Indirect $3$, direct $1$, total $4$; proportion mediated $0.75$.",
        },
      ],
    },
  ],
  references: [
    { source: "Pearl, Glymour & Jewell, Causal Inference in Statistics: A Primer", locator: "§3.7, §4.5" },
    { source: "VanderWeele, Explanation in Causal Inference: Methods for Mediation and Interaction", locator: "Ch. 2" },
  ],
};
