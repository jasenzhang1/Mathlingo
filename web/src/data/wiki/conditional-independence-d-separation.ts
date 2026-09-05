import type { WikiArticle } from "./types";

export const conditionalIndependenceDSeparationWiki: WikiArticle = {
  conceptId: "conditional-independence-d-separation",
  summary:
    "D-separation is a purely graphical criterion that answers a probabilistic question: given a DAG, " +
    "is X independent of Y once Z is observed? You answer it by checking whether every path from X to " +
    "Y is blocked, with no arithmetic at all. Three local structures — the chain, the fork, and the " +
    "collider — govern the whole rule, and the collider behaves backwards from the other two. That " +
    "reversal is the source of both “explaining away” and collider bias.",

  sections: [
    {
      heading: "Conditional independence, stated",
      blocks: [
        {
          kind: "formula",
          latex: "X ⊥ Y | Z   ⟺   p(x, y | z) = p(x | z)·p(y | z)   for all z with p(z) > 0",
          caption: "Equivalently p(x | y, z) = p(x | z): once you know Z, learning Y tells you nothing more about X",
        },
        {
          kind: "prose",
          text:
            "Conditional independence is neither stronger nor weaker than marginal independence — the " +
            "two are logically unrelated. Variables can be dependent overall yet independent given a " +
            "third (the fork case below), or independent overall yet dependent given a third (the " +
            "collider case). Assuming one implies the other is the root of most errors in this topic.",
        },
      ],
    },

    {
      heading: "The three local structures",
      blocks: [
        {
          kind: "prose",
          text:
            "Every path between two nodes passes through intermediate nodes in one of exactly three " +
            "local patterns. Learn how each behaves and you have learned d-separation.",
        },
        {
          kind: "table",
          headers: ["Structure", "Shape", "Unconditioned", "Conditioning on C"],
          rows: [
            ["Chain", "A → C → B", "A and B dependent", "Blocks — A ⊥ B | C"],
            ["Fork (common cause)", "A ← C → B", "A and B dependent", "Blocks — A ⊥ B | C"],
            ["Collider (v-structure)", "A → C ← B", "A ⊥ B already", "Opens — A and B become dependent"],
          ],
          caption:
            "The collider is the odd one out: conditioning opens it rather than blocking it. Conditioning " +
            "on any descendant of C opens it too.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Chain — A → C → B",
              description:
                "Influence flows from A to B through C. Fix C and the channel is cut: Altitude → " +
                "Temperature → SnowDepth; once you know the temperature, altitude adds nothing.",
            },
            {
              term: "Fork — A ← C → B",
              description:
                "A common cause induces association between its effects. Ice-cream sales and drownings " +
                "correlate because both are driven by hot weather; condition on temperature and the " +
                "association disappears. C here is a confounder.",
            },
            {
              term: "Collider — A → C ← B",
              description:
                "Two causes of a shared effect. They are independent until you observe the effect, at " +
                "which point they start competing to explain it.",
            },
          ],
        },
      ],
    },

    {
      heading: "The d-separation rule",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "List every undirected path between X and Y (ignore arrow directions when enumerating paths; use them when classifying nodes).",
            "A path is blocked by the conditioning set Z if it contains a chain or fork node that is in Z, or a collider node such that neither it nor any of its descendants is in Z.",
            "If every path is blocked, X and Y are d-separated given Z, and therefore X ⊥ Y | Z.",
            "If even one path is unblocked, they are d-connected, and independence is not guaranteed by the graph.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "What d-separation does and does not promise",
          text:
            "D-separation is sound: if X and Y are d-separated given Z, then X ⊥ Y | Z holds in every " +
            "distribution that factorizes over the graph. The converse is weaker — a particular " +
            "distribution may have extra independences that its graph does not display, arising from a " +
            "numerical coincidence in the parameters rather than from structure. The graph gives you " +
            "the independences guaranteed by structure alone.",
        },
        {
          kind: "example",
          title: "A worked separation query",
          problem:
            "In the DAG Season → Rain → WetGrass ← Sprinkler ← Season, is Rain ⊥ Sprinkler given " +
            "WetGrass?",
          steps: [
            "Path 1: Rain → WetGrass ← Sprinkler. WetGrass is a collider on it, and WetGrass is in the conditioning set, so this path is OPEN.",
            "One open path is enough — no need to check the path through Season.",
            "So Rain and Sprinkler are d-connected given WetGrass.",
          ],
          answer:
            "No — they are dependent given WetGrass. Conditioning on the collider created the " +
            "dependence, even though the arrows never point from one to the other.",
        },
      ],
    },

    {
      heading: "Explaining away",
      blocks: [
        {
          kind: "prose",
          text:
            "Pearl's burglar-alarm example is the standard illustration because nothing else states the " +
            "phenomenon as cleanly. A Burglary can set off your Alarm; so can an Earthquake. The two " +
            "causes are unrelated, so they are marginally independent. You come home and the alarm is " +
            "ringing: burglary now looks likely. Then the radio reports an earthquake — and burglary " +
            "immediately looks less likely again, without any direct link between earthquakes and " +
            "burglars.",
        },
        {
          kind: "example",
          title: "Explaining away, with numbers",
          problem:
            "P(B) = 0.001, P(E) = 0.002. The alarm rings if either occurs. Compare P(B) with P(B | A) " +
            "and P(B | A, E), taking the alarm to be a deterministic OR of the two causes.",
          steps: [
            "Prior: P(B) = 0.001.",
            "P(A) = P(B or E) = 0.001 + 0.002 − 0.001·0.002 ≈ 0.002998.",
            "P(B | A) = P(B)/P(A) ≈ 0.001 / 0.002998 ≈ 0.334 — the alarm raised burglary sharply.",
            "P(B | A, E): given the earthquake, the alarm is already fully explained, so B reverts to its prior 0.001.",
          ],
          answer:
            "0.001 → 0.334 → 0.001. Learning E cut P(B | A) by a factor of roughly 334. E and B were " +
            "independent to begin with; conditioning on A made them compete.",
        },
      ],
    },

    {
      heading: "Collider bias: the practical consequence",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Conditioning on the wrong variable manufactures an association",
          text:
            "The standard advice to “control for confounders” is right, and the standard practice of " +
            "controlling for everything measured is wrong. Adjusting for a confounder (a fork) removes " +
            "spurious association. Adjusting for a collider *creates* one between variables that were " +
            "genuinely independent. Whether a covariate helps or harms depends on where it sits in the " +
            "causal structure — a question no amount of data alone can answer.",
        },
        {
          kind: "prose",
          text:
            "This is variously called collider bias, Berkson's paradox, or selection bias, and the " +
            "selection framing shows how easily it slips into a study. Restricting your sample is " +
            "conditioning: if admission to the sample is a collider — caused by both variables you are " +
            "studying — the restriction alone will produce a correlation inside the sample that does " +
            "not exist in the population.",
        },
        {
          kind: "example",
          title: "Berkson's paradox in hospital admissions",
          problem:
            "Two unrelated diseases each raise the chance of hospitalisation. Among hospitalised " +
            "patients, are they still unrelated?",
          steps: [
            "Disease1 → Hospitalised ← Disease2 is a collider.",
            "Studying only hospitalised patients conditions on that collider.",
            "Inside the hospital, a patient without disease 1 more likely got in because of disease 2.",
          ],
          answer:
            "They appear negatively associated among hospitalised patients, despite being independent " +
            "in the population. The association is an artefact of who is in the sample.",
        },
        {
          kind: "list",
          items: [
            "Never condition on a variable that could be a common effect of your exposure and your outcome.",
            "Be especially wary of post-treatment variables — anything measured after the exposure is a candidate collider.",
            "Sample-selection rules are conditioning too, even when no regression coefficient records them.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§8.2, Conditional Independence — d-separation" },
    { source: "Murphy, Probabilistic Machine Learning: An Introduction", locator: "§4.2.4, d-separation and the Bayes ball algorithm" },
    { source: "Mathlingo assessment bank", locator: "assessments/gm-01-graphs-and-markov-structure.md" },
  ],
};
