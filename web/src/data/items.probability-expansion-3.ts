import type { Item, SourceRef } from "../lib/assessment/types";

const AUTHORED: SourceRef = {
  id: "mathlingo-authored-probability-expansion",
  tier: "generated",
  title: "Mathlingo authored item (probability 20-per-concept expansion)",
};

export const probabilityExpansion3Items: Item[] = [
  // ===== normal-distribution =====
  {
    "id": "normal-distribution--r3",
    "conceptId": "normal-distribution",
    "format": "short-answer",
    "cognitive": "recall",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "State the 68-95-99.7 empirical rule for Normal(μ, σ²): what fraction of the mass lies within 1σ, 2σ, and 3σ of μ?",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "about 68% of the mass lies within 1σ of μ",
          "weight": 1
        },
        {
          "id": "element-2",
          "description": "about 95% lies within 2σ, and about 99.7% lies within 3σ",
          "weight": 1
        }
      ]
    },
    "difficulty": -1.55,
    "discrimination": 1.1,
    "expectedSeconds": 30,
    "prereqClosure": [
      "normal-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "normal-distribution--r4",
    "conceptId": "normal-distribution",
    "format": "mcq",
    "cognitive": "recall",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "In Normal(μ, σ²), the parameter σ² controls:",
    "choices": [
      {
        "id": "choice-1",
        "text": "the spread (dispersion) of the distribution around μ",
        "correct": true
      },
      {
        "id": "choice-2",
        "text": "the location of the peak",
        "correct": false,
        "misconception": {
          "id": "choice-2--misconception",
          "description": "confuses σ² with μ, which controls location, not spread",
          "blameConceptId": "normal-distribution"
        }
      },
      {
        "id": "choice-3",
        "text": "the skewness of the distribution",
        "correct": false,
        "misconception": {
          "id": "choice-3--misconception",
          "description": "Normal has no adjustable skewness parameter at all — it is always symmetric",
          "blameConceptId": "normal-distribution"
        }
      },
      {
        "id": "choice-4",
        "text": "the boundaries of X's support",
        "correct": false,
        "misconception": {
          "id": "choice-4--misconception",
          "description": "Normal's support is all of ℝ regardless of σ; σ² never bounds it",
          "blameConceptId": "normal-distribution"
        }
      }
    ],
    "difficulty": -1.4,
    "discrimination": 1.15,
    "expectedSeconds": 25,
    "prereqClosure": [
      "normal-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "normal-distribution--r5",
    "conceptId": "normal-distribution",
    "format": "short-answer",
    "cognitive": "recall",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Give the standard normal CDF Φ(z) as an integral of the standard normal density, and state Φ(0).",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "Φ(z) = ∫_{−∞}^{z} (1/√(2π))·e^{−t²/2} dt",
          "weight": 1
        },
        {
          "id": "element-2",
          "description": "Φ(0) = 0.5, since the density is symmetric about 0",
          "weight": 1
        }
      ]
    },
    "difficulty": -1.2,
    "discrimination": 1.2,
    "expectedSeconds": 30,
    "prereqClosure": [
      "normal-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "normal-distribution--r6",
    "conceptId": "normal-distribution",
    "format": "short-answer",
    "cognitive": "recall",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "True or false, with justification: the Normal density f(x) is strictly positive for every real x, however far x is from μ.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "true — the exponential term e^{−(x−μ)²/(2σ²)} never equals exactly 0 for any finite x, so the support is all of ℝ even though the tails become vanishingly small far from μ",
          "weight": 1,
          "required": true
        }
      ]
    },
    "difficulty": -0.9,
    "discrimination": 1.1,
    "expectedSeconds": 30,
    "prereqClosure": [
      "normal-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "normal-distribution--a3",
    "conceptId": "normal-distribution",
    "format": "numeric",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "Adult male heights are modeled as N(70, 3²) inches. Find P(66 < X < 76).",
    "answerKey": 0.886,
    "tolerance": 0.02,
    "difficulty": -0.45,
    "discrimination": 1.2,
    "expectedSeconds": 75,
    "prereqClosure": [
      "normal-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "normal-distribution--a4",
    "conceptId": "normal-distribution",
    "format": "numeric",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "A standardized test's scores are N(500, 100²). A scholarship requires being in the top 10% of scores. Find the minimum score needed.",
    "answerKey": 628.2,
    "tolerance": 0.02,
    "difficulty": -0.2,
    "discrimination": 1.2,
    "expectedSeconds": 75,
    "prereqClosure": [
      "normal-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "normal-distribution--a5",
    "conceptId": "normal-distribution",
    "format": "numeric",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "X ~ N(20, 4²). Find P(X < 15 or X > 25).",
    "answerKey": 0.211,
    "tolerance": 0.02,
    "difficulty": 0.05,
    "discrimination": 1.15,
    "expectedSeconds": 70,
    "prereqClosure": [
      "normal-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "normal-distribution--e3",
    "conceptId": "normal-distribution",
    "format": "short-answer",
    "cognitive": "explain",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Explain why the 68-95-99.7 empirical rule fails badly for a symmetric, bell-shaped-looking distribution like Cauchy.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "the empirical rule relies on the Normal density's rapidly (exponentially) decaying tails, which concentrate mass tightly within a few σ of the mean",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "Cauchy's tails decay only polynomially (as 1/x²) and Cauchy has no finite variance at all — there is no σ to even state the rule in terms of",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.25,
    "discrimination": 1.15,
    "expectedSeconds": 80,
    "prereqClosure": [
      "normal-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "normal-distribution--e4",
    "conceptId": "normal-distribution",
    "format": "short-answer",
    "cognitive": "explain",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "The Normal density's leading constant is 1/(σ√(2π)). Explain why doubling σ must shrink this constant rather than leave it fixed.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "every valid density must integrate to exactly 1 over its support",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "spreading the bump out over a wider range (larger σ) lowers its peak height so the enclosed area stays fixed at 1; the constant scales as 1/σ to compensate",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.4,
    "discrimination": 1.2,
    "expectedSeconds": 70,
    "prereqClosure": [
      "normal-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "normal-distribution--e5",
    "conceptId": "normal-distribution",
    "format": "derivation",
    "cognitive": "explain",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Derive P(μ−σ < X < μ+σ) in terms of Φ, then use Φ(1) ≈ 0.8413 to recover the numeric '68%' of the empirical rule.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "standardizing gives P(μ−σ<X<μ+σ) = P(−1<Z<1) = Φ(1) − Φ(−1)",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "using Φ(−1)=1−Φ(1), this is 2Φ(1)−1",
          "weight": 1
        },
        {
          "id": "element-3",
          "description": "2(0.8413)−1 = 0.6826 ≈ 68.3%",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.55,
    "discrimination": 1.25,
    "expectedSeconds": 85,
    "prereqClosure": [
      "normal-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "normal-distribution--t2",
    "conceptId": "normal-distribution",
    "format": "derivation",
    "cognitive": "transfer",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "If X~N(μ,σ²), show that Y=(X−μ)²/σ² is distributed as χ²₁ — a first glimpse of how Normal connects to Chi-Square.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "Z=(X−μ)/σ is standard normal",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "Y = Z², and by the definition of chi-square with 1 degree of freedom, the square of a single standard normal is χ²₁",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.6,
    "discrimination": 1.2,
    "expectedSeconds": 100,
    "prereqClosure": [
      "normal-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "normal-distribution--t3",
    "conceptId": "normal-distribution",
    "format": "short-answer",
    "cognitive": "transfer",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "A chemical reaction's duration is X ~ N(30, 5²) minutes. A quality check flags reactions in the extreme 1% combined (0.5% in each tail). Find the two cutoff times.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "the two-sided 1% cutoff uses z₀.₉₉₅ ≈ 2.5758",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "cutoffs are 30 ± 5(2.5758) ≈ 17.12 minutes and 42.88 minutes",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.85,
    "discrimination": 1.15,
    "expectedSeconds": 100,
    "prereqClosure": [
      "normal-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "normal-distribution--t4",
    "conceptId": "normal-distribution",
    "format": "short-answer",
    "cognitive": "transfer",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "A financial analyst models daily stock returns as Normal, despite real returns showing 'fat tails' (extreme moves happen more often than Normal predicts). Explain the practical consequence for a risk measure like Value-at-Risk.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "Normal underestimates the probability of extreme losses because it decays too fast in the tails compared to real returns",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "risk models built on Normal understate how often large drawdowns ('black swan' events) actually occur, giving false confidence",
          "weight": 1
        }
      ]
    },
    "difficulty": 1.05,
    "discrimination": 1.2,
    "expectedSeconds": 100,
    "prereqClosure": [
      "normal-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  // ===== uniform-distribution =====
  {
    "id": "uniform-distribution--r3",
    "conceptId": "uniform-distribution",
    "format": "short-answer",
    "cognitive": "recall",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "For X ~ Uniform(a,b), give the CDF F(x) piecewise.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "F(x) = 0 for x<a; F(x) = (x−a)/(b−a) for a≤x≤b; F(x) = 1 for x>b",
          "weight": 1
        }
      ]
    },
    "difficulty": -1.55,
    "discrimination": 1.1,
    "expectedSeconds": 30,
    "prereqClosure": [
      "uniform-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "uniform-distribution--r4",
    "conceptId": "uniform-distribution",
    "format": "mcq",
    "cognitive": "recall",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "Which statement about Uniform(a,b) is true?",
    "choices": [
      {
        "id": "choice-1",
        "text": "every value in [a,b] is equally likely to be the mode, since the density is constant",
        "correct": true
      },
      {
        "id": "choice-2",
        "text": "Uniform has a single, sharply-peaked mode like Normal",
        "correct": false,
        "misconception": {
          "id": "choice-2--misconception",
          "description": "confuses Uniform's flat density with a peaked distribution — there is no unique peak",
          "blameConceptId": "uniform-distribution"
        }
      },
      {
        "id": "choice-3",
        "text": "E[X] = a",
        "correct": false,
        "misconception": {
          "id": "choice-3--misconception",
          "description": "misremembers the mean formula, which is the midpoint (a+b)/2, not the left endpoint",
          "blameConceptId": "uniform-distribution"
        }
      },
      {
        "id": "choice-4",
        "text": "Var(X) = (b−a)/12",
        "correct": false,
        "misconception": {
          "id": "choice-4--misconception",
          "description": "forgets the squaring in the variance formula (b−a)²/12",
          "blameConceptId": "uniform-distribution"
        }
      }
    ],
    "difficulty": -1.3,
    "discrimination": 1.15,
    "expectedSeconds": 25,
    "prereqClosure": [
      "uniform-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "uniform-distribution--r5",
    "conceptId": "uniform-distribution",
    "format": "short-answer",
    "cognitive": "recall",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Is Uniform(a,b) symmetric, and if so, about what point?",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "yes — the constant density is symmetric about the midpoint (a+b)/2",
          "weight": 1
        }
      ]
    },
    "difficulty": -1.0,
    "discrimination": 1.1,
    "expectedSeconds": 30,
    "prereqClosure": [
      "uniform-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "uniform-distribution--a3",
    "conceptId": "uniform-distribution",
    "format": "numeric",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "A random-number generator produces X ~ Uniform(0,1). Find P(X > 0.65).",
    "answerKey": 0.35,
    "tolerance": 0.01,
    "difficulty": -0.5,
    "discrimination": 1.1,
    "expectedSeconds": 50,
    "prereqClosure": [
      "uniform-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "uniform-distribution--a4",
    "conceptId": "uniform-distribution",
    "format": "short-answer",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "A machine's cycle time is Uniform(40,60) seconds. Find Var(X) and P(45 < X < 50).",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "Var(X) = (60−40)²/12 = 400/12 ≈ 33.33",
          "weight": 1
        },
        {
          "id": "element-2",
          "description": "P(45<X<50) = (50−45)/(60−40) = 5/20 = 0.25",
          "weight": 1
        }
      ]
    },
    "difficulty": -0.3,
    "discrimination": 1.15,
    "expectedSeconds": 75,
    "prereqClosure": [
      "uniform-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "uniform-distribution--a5",
    "conceptId": "uniform-distribution",
    "format": "numeric",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "X ~ Uniform(−3,3). Find P(|X| < 1).",
    "answerKey": 0.333,
    "tolerance": 0.02,
    "difficulty": -0.05,
    "discrimination": 1.1,
    "expectedSeconds": 60,
    "prereqClosure": [
      "uniform-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "uniform-distribution--a6",
    "conceptId": "uniform-distribution",
    "format": "numeric",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "A temperature-sensor's reading error is Uniform(−0.5, 0.5) °C. Find P(|error| > 0.3).",
    "answerKey": 0.4,
    "tolerance": 0.02,
    "difficulty": 0.15,
    "discrimination": 1.2,
    "expectedSeconds": 70,
    "prereqClosure": [
      "uniform-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "uniform-distribution--e3",
    "conceptId": "uniform-distribution",
    "format": "short-answer",
    "cognitive": "explain",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Explain why the mean and median of any Uniform(a,b) are always equal, using only symmetry (no integration).",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "the distribution is symmetric about the midpoint (a+b)/2 — for any symmetric distribution, that center of symmetry is simultaneously the mean (balance point) and the median (equal mass on both sides)",
          "weight": 1,
          "required": true
        }
      ]
    },
    "difficulty": 0.25,
    "discrimination": 1.1,
    "expectedSeconds": 60,
    "prereqClosure": [
      "uniform-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "uniform-distribution--e4",
    "conceptId": "uniform-distribution",
    "format": "derivation",
    "cognitive": "explain",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Let Y = X−a, so Y ~ Uniform(0, b−a). Show Var(X) = Var(Y) without recomputing an integral over [a,b].",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "shifting a random variable by a constant a doesn't change its spread: Var(X) = Var(Y+a) = Var(Y), since variance is shift-invariant",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "so Var(X) can be computed as Var(Uniform(0,b−a)) = (b−a)²/12 without ever integrating over the original interval [a,b]",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.45,
    "discrimination": 1.2,
    "expectedSeconds": 85,
    "prereqClosure": [
      "uniform-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "uniform-distribution--e5",
    "conceptId": "uniform-distribution",
    "format": "short-answer",
    "cognitive": "explain",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Explain, using the density's constant height, why Uniform(a,b) is the natural 'default' distribution when nothing distinguishes outcomes in an interval — and what real-world assumption would break this choice.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "a constant density encodes exactly the assumption that no sub-interval of [a,b] is more likely than any other of the same length — no extra information is assumed",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "this breaks if outcomes cluster (e.g. near the center or an edge) for a real reason, since then the true density is not flat",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.6,
    "discrimination": 1.15,
    "expectedSeconds": 80,
    "prereqClosure": [
      "uniform-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "uniform-distribution--t2",
    "conceptId": "uniform-distribution",
    "format": "derivation",
    "cognitive": "transfer",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "A dart lands at X ~ Uniform(0,1) meters along a ruler. Let Y = X² (distance squared). Find the density of Y for 0<y<1, using the CDF technique.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "F_Y(y) = P(X²≤y) = P(X≤√y) = √y for 0<y<1, since X~Uniform(0,1) has CDF equal to its argument",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "differentiating gives f_Y(y) = 1/(2√y)",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.65,
    "discrimination": 1.2,
    "expectedSeconds": 100,
    "prereqClosure": [
      "uniform-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "uniform-distribution--t3",
    "conceptId": "uniform-distribution",
    "format": "short-answer",
    "cognitive": "transfer",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Inverse-transform sampling uses Uniform(0,1) as its building block: if U~Uniform(0,1) and F is a target CDF, X=F⁻¹(U) has distribution F. Explain why.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "P(X≤x) = P(F⁻¹(U)≤x) = P(U≤F(x)), applying F (increasing) to both sides of the inequality",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "since U~Uniform(0,1) has CDF equal to the identity on [0,1], P(U≤F(x)) = F(x) directly, so X's CDF is exactly F",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.9,
    "discrimination": 1.15,
    "expectedSeconds": 100,
    "prereqClosure": [
      "uniform-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "uniform-distribution--t4",
    "conceptId": "uniform-distribution",
    "format": "numeric",
    "cognitive": "transfer",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "Two independent measurements X, Y ~ Uniform(0,1) are taken. Find P(X+Y < 0.5).",
    "answerKey": 0.125,
    "tolerance": 0.02,
    "difficulty": 1.05,
    "discrimination": 1.2,
    "expectedSeconds": 100,
    "prereqClosure": [
      "uniform-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  // ===== exponential-distribution =====
  {
    "id": "exponential-distribution--r3",
    "conceptId": "exponential-distribution",
    "format": "short-answer",
    "cognitive": "recall",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "State the CDF and the hazard (instantaneous failure) function of Exponential(λ).",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "F(x) = 1 − e^{−λx} for x≥0",
          "weight": 1
        },
        {
          "id": "element-2",
          "description": "hazard h(x) = f(x)/(1−F(x)) = λe^{−λx}/e^{−λx} = λ — constant, independent of x",
          "weight": 1
        }
      ]
    },
    "difficulty": -1.55,
    "discrimination": 1.1,
    "expectedSeconds": 30,
    "prereqClosure": [
      "exponential-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "exponential-distribution--r4",
    "conceptId": "exponential-distribution",
    "format": "mcq",
    "cognitive": "recall",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "For Exponential(λ), which is TRUE?",
    "choices": [
      {
        "id": "choice-1",
        "text": "E[X] = 1/λ",
        "correct": true
      },
      {
        "id": "choice-2",
        "text": "E[X] = λ",
        "correct": false,
        "misconception": {
          "id": "choice-2--misconception",
          "description": "confuses the rate parameter λ with the mean, which is its reciprocal",
          "blameConceptId": "exponential-distribution"
        }
      },
      {
        "id": "choice-3",
        "text": "Var(X) = 1/λ",
        "correct": false,
        "misconception": {
          "id": "choice-3--misconception",
          "description": "forgets the squaring in the variance formula Var(X)=1/λ²",
          "blameConceptId": "exponential-distribution"
        }
      },
      {
        "id": "choice-4",
        "text": "the median equals the mean, 1/λ",
        "correct": false,
        "misconception": {
          "id": "choice-4--misconception",
          "description": "the median is ln2/λ ≈ 0.693/λ, strictly less than the mean 1/λ, since Exponential is right-skewed",
          "blameConceptId": "exponential-distribution"
        }
      }
    ],
    "difficulty": -1.35,
    "discrimination": 1.15,
    "expectedSeconds": 25,
    "prereqClosure": [
      "exponential-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "exponential-distribution--r5",
    "conceptId": "exponential-distribution",
    "format": "short-answer",
    "cognitive": "recall",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Find the median of Exponential(λ) in terms of λ, and show it is less than the mean 1/λ.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "solve 1−e^{−λm}=0.5 for m: m = ln(2)/λ ≈ 0.693/λ",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "since ln2≈0.693<1, the median is strictly less than the mean 1/λ",
          "weight": 1
        }
      ]
    },
    "difficulty": -1.1,
    "discrimination": 1.2,
    "expectedSeconds": 40,
    "prereqClosure": [
      "exponential-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "exponential-distribution--a3",
    "conceptId": "exponential-distribution",
    "format": "numeric",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "Time between customer arrivals at a call center is Exponential with mean 4 minutes. Find P(the next arrival is within 2 minutes).",
    "answerKey": 0.3935,
    "tolerance": 0.02,
    "difficulty": -0.45,
    "discrimination": 1.15,
    "expectedSeconds": 70,
    "prereqClosure": [
      "exponential-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "exponential-distribution--a4",
    "conceptId": "exponential-distribution",
    "format": "numeric",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "A component has a constant failure rate λ=0.02 per hour (Exponential lifetime). Find the probability it survives beyond 100 hours.",
    "answerKey": 0.1353,
    "tolerance": 0.02,
    "difficulty": -0.25,
    "discrimination": 1.15,
    "expectedSeconds": 70,
    "prereqClosure": [
      "exponential-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "exponential-distribution--a5",
    "conceptId": "exponential-distribution",
    "format": "short-answer",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Radioactive decay events occur as a Poisson process at rate 5/minute. Find the expected gap between consecutive decays and the probability that a gap exceeds 30 seconds (0.5 minutes).",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "gaps are Exponential(5); E[gap] = 1/5 = 0.2 minutes",
          "weight": 1
        },
        {
          "id": "element-2",
          "description": "P(gap>0.5) = e^{−5(0.5)} = e^{−2.5} ≈ 0.0821",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.0,
    "discrimination": 1.2,
    "expectedSeconds": 80,
    "prereqClosure": [
      "exponential-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "exponential-distribution--a6",
    "conceptId": "exponential-distribution",
    "format": "numeric",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "An ATM's time between customers is Exponential with rate 0.5/minute. Find P(1 < X < 3).",
    "answerKey": 0.3834,
    "tolerance": 0.02,
    "difficulty": 0.15,
    "discrimination": 1.2,
    "expectedSeconds": 75,
    "prereqClosure": [
      "exponential-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "exponential-distribution--e3",
    "conceptId": "exponential-distribution",
    "format": "short-answer",
    "cognitive": "explain",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Explain why the median of Exponential(λ) is always less than its mean, in terms of the distribution's skew.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "Exponential is right-skewed: a heavy right tail pulls the mean up more than the median, which only tracks the 50th percentile",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "this matches median = ln2/λ ≈ 0.693/λ < mean = 1/λ",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.25,
    "discrimination": 1.1,
    "expectedSeconds": 70,
    "prereqClosure": [
      "exponential-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "exponential-distribution--e4",
    "conceptId": "exponential-distribution",
    "format": "derivation",
    "cognitive": "explain",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Derive the CDF F(x) = 1 − e^{−λx} for Exponential(λ) by integrating the density from 0 to x.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "F(x) = ∫₀ˣ λe^{−λt} dt",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "= [−e^{−λt}]₀ˣ = −e^{−λx} − (−1) = 1 − e^{−λx}",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.4,
    "discrimination": 1.2,
    "expectedSeconds": 80,
    "prereqClosure": [
      "exponential-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "exponential-distribution--e5",
    "conceptId": "exponential-distribution",
    "format": "short-answer",
    "cognitive": "explain",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Explain why the hazard rate of Exponential(λ) is constant and equal to λ, connecting this directly to memorylessness.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "h(x) = f(x)/(1−F(x)) = λe^{−λx}/e^{−λx} = λ for every x",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "this constancy IS memorylessness restated: the chance of failing in the next instant never depends on how long the item has already survived",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.55,
    "discrimination": 1.2,
    "expectedSeconds": 80,
    "prereqClosure": [
      "exponential-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "exponential-distribution--t2",
    "conceptId": "exponential-distribution",
    "format": "derivation",
    "cognitive": "transfer",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "If X ~ Exponential(λ), show that Y = λX ~ Exponential(1) — any Exponential rescales to the 'standard' rate-1 Exponential.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "P(Y>y) = P(λX>y) = P(X>y/λ) = e^{−λ(y/λ)} = e^{−y}",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "this matches the survival function of Exponential(1) exactly",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.6,
    "discrimination": 1.2,
    "expectedSeconds": 100,
    "prereqClosure": [
      "exponential-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "exponential-distribution--t3",
    "conceptId": "exponential-distribution",
    "format": "numeric",
    "cognitive": "transfer",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "A system fails as soon as the FIRST of 3 identical, independent Exponential(λ=0.1/hour) components fails. Find the mean lifetime of the system.",
    "answerKey": 3.333,
    "tolerance": 0.02,
    "difficulty": 0.85,
    "discrimination": 1.15,
    "expectedSeconds": 100,
    "prereqClosure": [
      "exponential-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "exponential-distribution--t4",
    "conceptId": "exponential-distribution",
    "format": "short-answer",
    "cognitive": "transfer",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Without computing anything, explain why the sum of n iid Exponential(λ) waiting times is NOT itself Exponential, but instead has a less-skewed, humped shape.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "summing n memoryless waits produces a Gamma(n,λ) distribution, not another Exponential",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "averaging effects (like those behind the CLT) reduce relative variability as terms are summed, producing a hump away from 0 — unlike Exponential's own density, which is always maximized at 0",
          "weight": 1
        }
      ]
    },
    "difficulty": 1.05,
    "discrimination": 1.15,
    "expectedSeconds": 100,
    "prereqClosure": [
      "exponential-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  // ===== gamma-distribution =====
  {
    "id": "gamma-distribution--r3",
    "conceptId": "gamma-distribution",
    "format": "short-answer",
    "cognitive": "recall",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Gamma(α,β) has E[X]=α/β. If α is doubled while β stays fixed, what happens to E[X] and Var(X)?",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "E[X] doubles, to 2α/β",
          "weight": 1
        },
        {
          "id": "element-2",
          "description": "Var(X)=α/β² also doubles, to 2α/β²",
          "weight": 1
        }
      ]
    },
    "difficulty": -1.55,
    "discrimination": 1.1,
    "expectedSeconds": 30,
    "prereqClosure": [
      "gamma-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "gamma-distribution--r4",
    "conceptId": "gamma-distribution",
    "format": "mcq",
    "cognitive": "recall",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "In Gamma(α,β), increasing the rate β while holding α fixed does what to the mean and variance?",
    "choices": [
      {
        "id": "choice-1",
        "text": "both decrease, since E[X]=α/β and Var(X)=α/β² both fall as β rises",
        "correct": true
      },
      {
        "id": "choice-2",
        "text": "both increase",
        "correct": false,
        "misconception": {
          "id": "choice-2--misconception",
          "description": "has the direction of the rate parameter's effect backwards — a higher rate means shorter waits, not longer",
          "blameConceptId": "gamma-distribution"
        }
      },
      {
        "id": "choice-3",
        "text": "the mean increases but the variance decreases",
        "correct": false,
        "misconception": {
          "id": "choice-3--misconception",
          "description": "mixes up the two formulas; both share the same 1/β-type dependence and move together",
          "blameConceptId": "gamma-distribution"
        }
      },
      {
        "id": "choice-4",
        "text": "neither changes, since only α is a shape parameter",
        "correct": false,
        "misconception": {
          "id": "choice-4--misconception",
          "description": "misses that β enters both E[X]=α/β and Var(X)=α/β² directly",
          "blameConceptId": "gamma-distribution"
        }
      }
    ],
    "difficulty": -1.3,
    "discrimination": 1.15,
    "expectedSeconds": 25,
    "prereqClosure": [
      "gamma-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "gamma-distribution--r5",
    "conceptId": "gamma-distribution",
    "format": "short-answer",
    "cognitive": "recall",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "What is the mode of Gamma(α,β) for α≥1? Why does Gamma have no interior mode when α<1?",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "mode = (α−1)/β for α≥1",
          "weight": 1
        },
        {
          "id": "element-2",
          "description": "for α<1 the density is unbounded and decreasing from x=0 (it blows up near 0 rather than peaking away from it), so there is no interior mode",
          "weight": 1
        }
      ]
    },
    "difficulty": -0.95,
    "discrimination": 1.1,
    "expectedSeconds": 40,
    "prereqClosure": [
      "gamma-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "gamma-distribution--a3",
    "conceptId": "gamma-distribution",
    "format": "numeric",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "Website hits arrive as Poisson(6/hour). Using Gamma(8,6), find the standard deviation of the time until the 8th hit.",
    "answerKey": 0.4714,
    "tolerance": 0.02,
    "difficulty": -0.4,
    "discrimination": 1.15,
    "expectedSeconds": 75,
    "prereqClosure": [
      "gamma-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "gamma-distribution--a4",
    "conceptId": "gamma-distribution",
    "format": "numeric",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "A machine is replaced on its 3rd repair; repairs occur as a Poisson process at rate 0.5/month. Using Gamma(3,0.5), find E[time to replacement] and Var(time to replacement).",
    "answerKey": 6,
    "tolerance": 0.02,
    "difficulty": -0.15,
    "discrimination": 1.2,
    "expectedSeconds": 80,
    "prereqClosure": [
      "gamma-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "gamma-distribution--a5",
    "conceptId": "gamma-distribution",
    "format": "numeric",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "X ~ Gamma(4,2). Find E[X] and Var(X).",
    "answerKey": 2,
    "tolerance": 0.01,
    "difficulty": 0.1,
    "discrimination": 1.1,
    "expectedSeconds": 60,
    "prereqClosure": [
      "gamma-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "gamma-distribution--a6",
    "conceptId": "gamma-distribution",
    "format": "short-answer",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Insurance claims of a type arrive as Poisson(2/day). Find P(the 4th claim arrives within the first day), using the Poisson-count duality (not the Gamma density).",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "'4th claim by time 1' is the same event as 'at least 4 claims by time 1'",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "N(1)~Poisson(2); P(N≥4) = 1 − P(N≤3) = 1 − (0.1353+0.2707+0.2707+0.1804) ≈ 1 − 0.8571 = 0.1429",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.15,
    "discrimination": 1.2,
    "expectedSeconds": 90,
    "prereqClosure": [
      "gamma-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "gamma-distribution--e3",
    "conceptId": "gamma-distribution",
    "format": "short-answer",
    "cognitive": "explain",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Explain why Gamma(α,β) becomes more symmetric as α grows, connecting this to the sum-of-Exponentials interpretation.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "for integer α, Gamma(α,β) is a sum of α iid Exponential(β) waits, and sums of many iid terms tend toward a symmetric, bell-shaped distribution",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "concretely, its relative spread SD/mean = 1/√α shrinks as α grows, so the shape tightens and symmetrizes relative to its own scale",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.25,
    "discrimination": 1.1,
    "expectedSeconds": 70,
    "prereqClosure": [
      "gamma-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "gamma-distribution--e4",
    "conceptId": "gamma-distribution",
    "format": "derivation",
    "cognitive": "explain",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Show Var(Gamma(α,β)) = α/β² by computing the variance of a sum of α iid Exponential(β) variables (do not integrate the Gamma density).",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "Var(Exponential(β)) = 1/β²",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "for independent variables, variances add: Var(sum of α of them) = α·(1/β²) = α/β²",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.45,
    "discrimination": 1.2,
    "expectedSeconds": 85,
    "prereqClosure": [
      "gamma-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "gamma-distribution--e5",
    "conceptId": "gamma-distribution",
    "format": "short-answer",
    "cognitive": "explain",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Gamma(α,β) allows non-integer α, unlike the clean 'sum of α iid Exponentials' story. Explain, informally, what a non-integer shape like α=2.5 could represent.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "the Gamma function replaces the factorial in the sum-of-Exponentials story, generalizing 'number of stages summed' to a fractional value",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "this lets Gamma model a waiting process whose intensity build-up looks like a fractional number of stages — useful when observed skew doesn't match any integer-α Gamma",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.6,
    "discrimination": 1.15,
    "expectedSeconds": 85,
    "prereqClosure": [
      "gamma-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "gamma-distribution--t2",
    "conceptId": "gamma-distribution",
    "format": "short-answer",
    "cognitive": "transfer",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Show that if X ~ Gamma(α,β), then Y=cX (c>0) is Gamma(α, β/c). Verify using E[Y]=α/(β/c).",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "E[Y] = E[cX] = cE[X] = cα/β",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "this equals α/(β/c), matching the claimed parameters — scaling a Gamma variable rescales its rate inversely",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.6,
    "discrimination": 1.15,
    "expectedSeconds": 90,
    "prereqClosure": [
      "gamma-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "gamma-distribution--t3",
    "conceptId": "gamma-distribution",
    "format": "short-answer",
    "cognitive": "transfer",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Explain how the Chi-Square distribution χ²ₖ is a special case of Gamma — state the (α,β) values that give χ²ₖ.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "χ²ₖ = Gamma(k/2, 1/2)",
          "weight": 1,
          "required": true
        }
      ]
    },
    "difficulty": 0.85,
    "discrimination": 1.15,
    "expectedSeconds": 90,
    "prereqClosure": [
      "gamma-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "gamma-distribution--t4",
    "conceptId": "gamma-distribution",
    "format": "numeric",
    "cognitive": "transfer",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "Customers arrive as Poisson(4/hour). Using the count/waiting-time duality, find P(the 6th customer arrives within the first 2 hours).",
    "answerKey": 0.8088,
    "tolerance": 0.02,
    "difficulty": 1.05,
    "discrimination": 1.2,
    "expectedSeconds": 110,
    "prereqClosure": [
      "gamma-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  // ===== beta-distribution =====
  {
    "id": "beta-distribution--r3",
    "conceptId": "beta-distribution",
    "format": "short-answer",
    "cognitive": "recall",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "State the density of Beta(α,β) up to its normalizing constant 1/B(α,β), and give its support.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "f(x) ∝ x^(α−1)(1−x)^(β−1)",
          "weight": 1
        },
        {
          "id": "element-2",
          "description": "support is (0,1)",
          "weight": 1
        }
      ]
    },
    "difficulty": -1.55,
    "discrimination": 1.1,
    "expectedSeconds": 30,
    "prereqClosure": [
      "beta-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "beta-distribution--r4",
    "conceptId": "beta-distribution",
    "format": "mcq",
    "cognitive": "recall",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "Which condition makes Beta(α,β) symmetric about 0.5?",
    "choices": [
      {
        "id": "choice-1",
        "text": "α = β",
        "correct": true
      },
      {
        "id": "choice-2",
        "text": "α = 1",
        "correct": false,
        "misconception": {
          "id": "choice-2--misconception",
          "description": "this only makes the left factor constant; it does not by itself force symmetry unless β=1 too",
          "blameConceptId": "beta-distribution"
        }
      },
      {
        "id": "choice-3",
        "text": "β = 1",
        "correct": false,
        "misconception": {
          "id": "choice-3--misconception",
          "description": "same issue as α=1 alone — symmetric shape needs the two exponents to match, i.e. α=β",
          "blameConceptId": "beta-distribution"
        }
      },
      {
        "id": "choice-4",
        "text": "α + β = 1",
        "correct": false,
        "misconception": {
          "id": "choice-4--misconception",
          "description": "this constrains the *sum*, not the *balance* between α and β, and does not force symmetry",
          "blameConceptId": "beta-distribution"
        }
      }
    ],
    "difficulty": -1.3,
    "discrimination": 1.15,
    "expectedSeconds": 25,
    "prereqClosure": [
      "beta-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "beta-distribution--r5",
    "conceptId": "beta-distribution",
    "format": "short-answer",
    "cognitive": "recall",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Describe the shape of Beta(0.5, 0.5) (the 'arcsine' distribution) — is it U-shaped, uniform, or bell-shaped?",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "U-shaped: since α−1=β−1=−0.5<0, the density increases without bound toward both 0 and 1, with a dip in the middle",
          "weight": 1
        }
      ]
    },
    "difficulty": -1.0,
    "discrimination": 1.1,
    "expectedSeconds": 35,
    "prereqClosure": [
      "beta-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "beta-distribution--a3",
    "conceptId": "beta-distribution",
    "format": "numeric",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "X ~ Beta(5,2). Find E[X] and Var(X).",
    "answerKey": 0.7143,
    "tolerance": 0.02,
    "difficulty": -0.4,
    "discrimination": 1.15,
    "expectedSeconds": 70,
    "prereqClosure": [
      "beta-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "beta-distribution--a4",
    "conceptId": "beta-distribution",
    "format": "short-answer",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "A coin's bias is modeled as Beta(3,7) before any flips are observed. Find the prior mean and the prior mode of the bias.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "mean = α/(α+β) = 3/10 = 0.3",
          "weight": 1
        },
        {
          "id": "element-2",
          "description": "mode = (α−1)/(α+β−2) = 2/8 = 0.25",
          "weight": 1
        }
      ]
    },
    "difficulty": -0.2,
    "discrimination": 1.15,
    "expectedSeconds": 75,
    "prereqClosure": [
      "beta-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "beta-distribution--a5",
    "conceptId": "beta-distribution",
    "format": "numeric",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "X ~ Beta(1,4). Find P(X < 0.5).",
    "answerKey": 0.9375,
    "tolerance": 0.01,
    "difficulty": 0.05,
    "discrimination": 1.2,
    "expectedSeconds": 80,
    "prereqClosure": [
      "beta-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "beta-distribution--a6",
    "conceptId": "beta-distribution",
    "format": "numeric",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "X ~ Beta(4,4). Find E[X] and Var(X).",
    "answerKey": 0.5,
    "tolerance": 0.01,
    "difficulty": 0.2,
    "discrimination": 1.1,
    "expectedSeconds": 60,
    "prereqClosure": [
      "beta-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "beta-distribution--e3",
    "conceptId": "beta-distribution",
    "format": "short-answer",
    "cognitive": "explain",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Explain why Beta's variance formula αβ/[(α+β)²(α+β+1)] guarantees Var→0 as α+β→∞ with the mean held fixed — the mechanism behind 'more data means more certainty' in Bayesian updating.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "treat α+β as a 'pseudo-count' or effective sample size",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "the denominator grows as the cube of (α+β) while the numerator αβ grows only as its square, so the ratio shrinks toward 0 as α+β grows — mirroring how a posterior concentrates as more data accumulates",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.25,
    "discrimination": 1.15,
    "expectedSeconds": 85,
    "prereqClosure": [
      "beta-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "beta-distribution--e4",
    "conceptId": "beta-distribution",
    "format": "derivation",
    "cognitive": "explain",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "For the symmetric case α=β=k (mean fixed at 0.5), show Var(X) = 1/(4(2k+1)) using the general Beta variance formula.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "αβ = k², (α+β)² = 4k², (α+β+1) = 2k+1",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "substituting: k²/(4k²(2k+1)) = 1/(4(2k+1))",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.5,
    "discrimination": 1.2,
    "expectedSeconds": 90,
    "prereqClosure": [
      "beta-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "beta-distribution--e5",
    "conceptId": "beta-distribution",
    "format": "short-answer",
    "cognitive": "explain",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Explain the Bayesian reading of Beta(α,β) as a belief about a probability p, where α−1 and β−1 act like 'prior successes' and 'prior failures.' Why does observing s successes and f failures update the posterior to Beta(α+s, β+f)?",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "Beta's kernel x^(α−1)(1−x)^(β−1) multiplies with a Binomial likelihood x^s(1−x)^f in exactly the same functional form",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "so the posterior ∝ prior×likelihood stays in the Beta family, with the counts simply adding: Beta(α+s, β+f) — this is why Beta is called the 'conjugate' prior for a Binomial/Bernoulli likelihood",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.6,
    "discrimination": 1.2,
    "expectedSeconds": 90,
    "prereqClosure": [
      "beta-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "beta-distribution--t2",
    "conceptId": "beta-distribution",
    "format": "short-answer",
    "cognitive": "transfer",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "If U~Gamma(α,1) and V~Gamma(β,1) are independent, what is the distribution of X = U/(U+V)? Name the connection to Beta.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "X ~ Beta(α,β) — this is the standard Gamma-ratio construction of a Beta random variable",
          "weight": 1,
          "required": true
        }
      ]
    },
    "difficulty": 0.65,
    "discrimination": 1.15,
    "expectedSeconds": 90,
    "prereqClosure": [
      "beta-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "beta-distribution--t3",
    "conceptId": "beta-distribution",
    "format": "numeric",
    "cognitive": "transfer",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "An A/B test observes 8 successes out of 20 trials, starting from a Beta(1,1) (uniform) prior, giving posterior Beta(9,13). Find the posterior mean.",
    "answerKey": 0.4091,
    "tolerance": 0.02,
    "difficulty": 0.9,
    "discrimination": 1.15,
    "expectedSeconds": 90,
    "prereqClosure": [
      "beta-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "beta-distribution--t4",
    "conceptId": "beta-distribution",
    "format": "short-answer",
    "cognitive": "transfer",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "As α,β→∞ with α/(α+β) fixed at some value p, what shape does Beta(α,β) approach? Justify using the variance-shrinkage argument from this concept's earlier items.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "it approaches a Normal-like bell shape, concentrated ever more tightly around p",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "this follows because Var(X)→0 as α+β→∞ with the mean fixed, so nearly all the mass piles up in a shrinking neighborhood of p",
          "weight": 1
        }
      ]
    },
    "difficulty": 1.05,
    "discrimination": 1.2,
    "expectedSeconds": 100,
    "prereqClosure": [
      "beta-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  // ===== chi-square-distribution =====
  {
    "id": "chi-square-distribution--r3",
    "conceptId": "chi-square-distribution",
    "format": "short-answer",
    "cognitive": "recall",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Give the special case of Gamma that equals χ²ₖ — state the (α,β) values.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "χ²ₖ = Gamma(k/2, 1/2)",
          "weight": 1
        }
      ]
    },
    "difficulty": -1.55,
    "discrimination": 1.1,
    "expectedSeconds": 30,
    "prereqClosure": [
      "chi-square-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "chi-square-distribution--r4",
    "conceptId": "chi-square-distribution",
    "format": "mcq",
    "cognitive": "recall",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "As the degrees of freedom k increases, the skewness of χ²ₖ:",
    "choices": [
      {
        "id": "choice-1",
        "text": "decreases — the distribution becomes more symmetric, approaching Normal",
        "correct": true
      },
      {
        "id": "choice-2",
        "text": "increases without bound",
        "correct": false,
        "misconception": {
          "id": "choice-2--misconception",
          "description": "has the direction backwards; larger k averages more squared-normal terms, which reduces relative skew",
          "blameConceptId": "chi-square-distribution"
        }
      },
      {
        "id": "choice-3",
        "text": "stays exactly 0 for every k",
        "correct": false,
        "misconception": {
          "id": "choice-3--misconception",
          "description": "χ²ₖ is right-skewed for every finite k; it is never exactly symmetric except in the k→∞ limit",
          "blameConceptId": "chi-square-distribution"
        }
      },
      {
        "id": "choice-4",
        "text": "first increases, then decreases",
        "correct": false,
        "misconception": {
          "id": "choice-4--misconception",
          "description": "there is no such non-monotonic reversal — skewness (2√(2/k)) decreases monotonically in k",
          "blameConceptId": "chi-square-distribution"
        }
      }
    ],
    "difficulty": -1.3,
    "discrimination": 1.15,
    "expectedSeconds": 25,
    "prereqClosure": [
      "chi-square-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "chi-square-distribution--r5",
    "conceptId": "chi-square-distribution",
    "format": "short-answer",
    "cognitive": "recall",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "State the mode of χ²ₖ for k≥2. Why does χ²₁ have no interior mode?",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "mode = k−2 for k≥2",
          "weight": 1
        },
        {
          "id": "element-2",
          "description": "for k=1, the density is proportional to x^{−1/2}e^{−x/2}, which diverges to ∞ as x→0⁺ and decreases monotonically after — there is no interior peak",
          "weight": 1
        }
      ]
    },
    "difficulty": -1.0,
    "discrimination": 1.1,
    "expectedSeconds": 40,
    "prereqClosure": [
      "chi-square-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "chi-square-distribution--a3",
    "conceptId": "chi-square-distribution",
    "format": "numeric",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "X ~ χ²₂₀. Find E[X], Var(X), and SD(X).",
    "answerKey": 6.325,
    "tolerance": 0.02,
    "difficulty": -0.4,
    "discrimination": 1.15,
    "expectedSeconds": 65,
    "prereqClosure": [
      "chi-square-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "chi-square-distribution--a4",
    "conceptId": "chi-square-distribution",
    "format": "short-answer",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "If Z₁,…,Z₆ are iid N(0,1), find E[Z₁²+⋯+Z₆²] and its variance.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "the sum is χ²₆",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "E = 6, Var = 2(6) = 12",
          "weight": 1
        }
      ]
    },
    "difficulty": -0.2,
    "discrimination": 1.1,
    "expectedSeconds": 60,
    "prereqClosure": [
      "chi-square-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "chi-square-distribution--a5",
    "conceptId": "chi-square-distribution",
    "format": "numeric",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "X~χ²₄, Y~χ²₉ independent. Find E[X+Y].",
    "answerKey": 13,
    "tolerance": 0.01,
    "difficulty": 0.0,
    "discrimination": 1.1,
    "expectedSeconds": 55,
    "prereqClosure": [
      "chi-square-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "chi-square-distribution--a6",
    "conceptId": "chi-square-distribution",
    "format": "numeric",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "Find the coefficient of variation (SD/mean) of χ²₅₀.",
    "answerKey": 0.2,
    "tolerance": 0.02,
    "difficulty": 0.15,
    "discrimination": 1.15,
    "expectedSeconds": 70,
    "prereqClosure": [
      "chi-square-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "chi-square-distribution--e3",
    "conceptId": "chi-square-distribution",
    "format": "short-answer",
    "cognitive": "explain",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Using Var(χ²ₖ)=2k, explain why the RELATIVE spread √(2/k) shrinks as k grows, even though the ABSOLUTE spread SD=√(2k) actually grows.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "SD=√(2k) grows without bound as k→∞ — more summed terms means more absolute variability",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "but relative to the also-growing mean k, SD/mean=√(2/k)→0, so the shape tightens relative to its own scale even as its absolute spread increases",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.25,
    "discrimination": 1.15,
    "expectedSeconds": 80,
    "prereqClosure": [
      "chi-square-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "chi-square-distribution--e4",
    "conceptId": "chi-square-distribution",
    "format": "derivation",
    "cognitive": "explain",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Derive Var(χ²ₖ)=2k directly from the definition Σᵢ Zᵢ², using Var(Zᵢ²)=2 for a standard normal Zᵢ (you may take this fact as given) and independence.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "Var(ΣZᵢ²) = ΣVar(Zᵢ²), using independence of the Zᵢ",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "= k·2 = 2k",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.45,
    "discrimination": 1.2,
    "expectedSeconds": 85,
    "prereqClosure": [
      "chi-square-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "chi-square-distribution--e5",
    "conceptId": "chi-square-distribution",
    "format": "short-answer",
    "cognitive": "explain",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Explain why χ²ₖ can never take a negative value, tracing the reason back to its definition.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "each Zᵢ² ≥ 0 for real Zᵢ, since squares of real numbers are never negative",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "a sum of nonnegative terms is nonnegative — the squaring in the definition is exactly what forecloses negative values",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.6,
    "discrimination": 1.1,
    "expectedSeconds": 65,
    "prereqClosure": [
      "chi-square-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "chi-square-distribution--t2",
    "conceptId": "chi-square-distribution",
    "format": "short-answer",
    "cognitive": "transfer",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "If X~χ²₁₀, identify Gamma's α and β for X, and verify E[X]=α/β gives 10.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "α=5, β=0.5 (since χ²ₖ = Gamma(k/2,1/2) with k=10)",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "E[X] = α/β = 5/0.5 = 10, matching χ²₁₀'s known mean",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.6,
    "discrimination": 1.15,
    "expectedSeconds": 85,
    "prereqClosure": [
      "chi-square-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "chi-square-distribution--t3",
    "conceptId": "chi-square-distribution",
    "format": "numeric",
    "cognitive": "transfer",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "In estimating variance from n=15 Normal measurements, the standardized sum of squared deviations follows χ²₁₄ (n−1 degrees of freedom). Find Var(χ²₁₄).",
    "answerKey": 28,
    "tolerance": 0.01,
    "difficulty": 0.85,
    "discrimination": 1.15,
    "expectedSeconds": 90,
    "prereqClosure": [
      "chi-square-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "chi-square-distribution--t4",
    "conceptId": "chi-square-distribution",
    "format": "short-answer",
    "cognitive": "transfer",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Explain, conceptually (no formula needed), why F_{d1,d2} is built from TWO independent chi-squares rather than one, when the goal is to compare two variances.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "comparing two independent variance estimates needs one chi-square for each sample's own sum-of-squared-deviations, each with its own degrees of freedom",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "the ratio of the two (each divided by its own df) is what tests whether the two population variances are equal — a single chi-square alone can't represent two separate estimates at once",
          "weight": 1
        }
      ]
    },
    "difficulty": 1.05,
    "discrimination": 1.2,
    "expectedSeconds": 100,
    "prereqClosure": [
      "chi-square-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  // ===== t-distribution =====
  {
    "id": "t-distribution--r3",
    "conceptId": "t-distribution",
    "format": "short-answer",
    "cognitive": "recall",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "T_k = Z/√(V/k) for standard normal Z and independent χ²_k variable V. Is T_k symmetric about 0 for every k? Justify briefly.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "yes, for every k",
          "weight": 1
        },
        {
          "id": "element-2",
          "description": "Z is symmetric about 0, and the denominator √(V/k) is always positive and doesn't depend on Z's sign, so T_k inherits Z's sign symmetry exactly",
          "weight": 1
        }
      ]
    },
    "difficulty": -1.55,
    "discrimination": 1.1,
    "expectedSeconds": 35,
    "prereqClosure": [
      "t-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "t-distribution--r4",
    "conceptId": "t-distribution",
    "format": "mcq",
    "cognitive": "recall",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "For which values of k is Var(T_k) undefined or infinite?",
    "choices": [
      {
        "id": "choice-1",
        "text": "k = 1 or k = 2",
        "correct": true
      },
      {
        "id": "choice-2",
        "text": "k = 0 only",
        "correct": false,
        "misconception": {
          "id": "choice-2--misconception",
          "description": "misidentifies where Var(T_k)=k/(k−2) diverges — the denominator vanishes at k=2, and t is not even defined for k=0",
          "blameConceptId": "t-distribution"
        }
      },
      {
        "id": "choice-3",
        "text": "Var(T_k) is always finite for k≥1",
        "correct": false,
        "misconception": {
          "id": "choice-3--misconception",
          "description": "false — the formula k/(k−2) is undefined at k=2 and negative (nonsensical) for k=1, meaning the variance doesn't exist there",
          "blameConceptId": "t-distribution"
        }
      },
      {
        "id": "choice-4",
        "text": "k ≥ 2",
        "correct": false,
        "misconception": {
          "id": "choice-4--misconception",
          "description": "backwards — Var(T_k) exists and is finite precisely for k>2, not for k≥2",
          "blameConceptId": "t-distribution"
        }
      }
    ],
    "difficulty": -1.3,
    "discrimination": 1.15,
    "expectedSeconds": 25,
    "prereqClosure": [
      "t-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "t-distribution--r5",
    "conceptId": "t-distribution",
    "format": "short-answer",
    "cognitive": "recall",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "As k→∞, what does T_k converge to, and what principle (about V/k) drives this?",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "T_k converges to the standard normal N(0,1)",
          "weight": 1
        },
        {
          "id": "element-2",
          "description": "this happens because V/k → 1 as k→∞ (a law-of-large-numbers-type concentration of the chi-square average around its mean), so T_k → Z/1 = Z",
          "weight": 1
        }
      ]
    },
    "difficulty": -1.0,
    "discrimination": 1.1,
    "expectedSeconds": 35,
    "prereqClosure": [
      "t-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "t-distribution--a3",
    "conceptId": "t-distribution",
    "format": "numeric",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "Find Var(T₁₀) using Var(T_k)=k/(k−2).",
    "answerKey": 1.25,
    "tolerance": 0.01,
    "difficulty": -0.45,
    "discrimination": 1.1,
    "expectedSeconds": 50,
    "prereqClosure": [
      "t-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "t-distribution--a4",
    "conceptId": "t-distribution",
    "format": "short-answer",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Find Var(T₃₀) and Var(T₅). Which is closer to 1, and what does that mean?",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "Var(T₃₀) = 30/28 ≈ 1.071; Var(T₅) = 5/3 ≈ 1.667",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "T₃₀ is much closer to Normal's variance of 1, confirming T_k converges toward Normal as k grows",
          "weight": 1
        }
      ]
    },
    "difficulty": -0.2,
    "discrimination": 1.15,
    "expectedSeconds": 70,
    "prereqClosure": [
      "t-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "t-distribution--a5",
    "conceptId": "t-distribution",
    "format": "short-answer",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "A sample of n=6 (df=5) gives a two-sided 95% critical value of about 2.571, versus Normal's 1.96. Explain why the t critical value must be larger in magnitude here.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "with only 5 degrees of freedom, T₅ has noticeably heavier tails than the standard normal",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "a larger cutoff is needed to enclose the same 95% central probability, since more mass sits out in the tails",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.05,
    "discrimination": 1.15,
    "expectedSeconds": 70,
    "prereqClosure": [
      "t-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "t-distribution--a6",
    "conceptId": "t-distribution",
    "format": "short-answer",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Find Var(T₆) and Var(T₁₀₀). Which is closer to 1?",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "Var(T₆) = 6/4 = 1.5; Var(T₁₀₀) = 100/98 ≈ 1.0204",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "T₁₀₀ is much closer to 1, as expected from convergence to Normal",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.2,
    "discrimination": 1.15,
    "expectedSeconds": 65,
    "prereqClosure": [
      "t-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "t-distribution--e3",
    "conceptId": "t-distribution",
    "format": "short-answer",
    "cognitive": "explain",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Explain, using T_k=Z/√(V/k), why T_k is always symmetric about 0 regardless of k.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "Z is symmetric about 0: P(Z>z)=P(Z<−z) for every z",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "the denominator √(V/k) is always strictly positive and independent of Z's sign, so P(T_k>t)=P(T_k<−t) for every t",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.25,
    "discrimination": 1.15,
    "expectedSeconds": 75,
    "prereqClosure": [
      "t-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "t-distribution--e4",
    "conceptId": "t-distribution",
    "format": "derivation",
    "cognitive": "explain",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Show E[T_k]=0 for k>1, using independence of Z and V and E[Z]=0 (you need not derive E[1/√(V/k)] itself).",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "by independence, E[T_k] = E[Z/√(V/k)] = E[Z]·E[1/√(V/k)]",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "= 0 · (some finite constant) = 0, valid whenever E[1/√(V/k)] is finite, i.e. k>1",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.45,
    "discrimination": 1.2,
    "expectedSeconds": 85,
    "prereqClosure": [
      "t-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "t-distribution--e5",
    "conceptId": "t-distribution",
    "format": "short-answer",
    "cognitive": "explain",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Explain why Var(T_k) is always strictly greater than Var(Z)=1 for k>2, tracing the extra variability to the random denominator.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "dividing Z by a random quantity √(V/k) that fluctuates around 1 (rather than always being exactly 1) adds extra variability on top of Z's own",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "the denominator's own noise stacks with the numerator's, inflating total variance above 1",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.6,
    "discrimination": 1.2,
    "expectedSeconds": 85,
    "prereqClosure": [
      "t-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "t-distribution--t2",
    "conceptId": "t-distribution",
    "format": "short-answer",
    "cognitive": "transfer",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "State the distribution of T_k², and its two degrees-of-freedom parameters.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "T_k² ~ F_{1,k}",
          "weight": 1,
          "required": true
        }
      ]
    },
    "difficulty": 0.6,
    "discrimination": 1.15,
    "expectedSeconds": 80,
    "prereqClosure": [
      "t-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "t-distribution--t3",
    "conceptId": "t-distribution",
    "format": "numeric",
    "cognitive": "transfer",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "A confidence interval for a mean uses t with df=20, critical value t_{0.025,20}≈2.086. If the sample mean is 50 and the standard error is 3, find the upper endpoint of the 95% CI.",
    "answerKey": 56.26,
    "tolerance": 0.02,
    "difficulty": 0.85,
    "discrimination": 1.15,
    "expectedSeconds": 95,
    "prereqClosure": [
      "t-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "t-distribution--t4",
    "conceptId": "t-distribution",
    "format": "short-answer",
    "cognitive": "transfer",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Explain why practitioners often use z=1.96 once df exceeds about 100, even though the t-correction is technically always required whenever σ is estimated.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "Var(T_k)=k/(k−2)→1 rapidly — at k=100 it's already about 1.0204, with a critical value near 1.984 versus Normal's 1.96",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "the correction becomes practically negligible well before k is enormous, so the simplification introduces only trivial error",
          "weight": 1
        }
      ]
    },
    "difficulty": 1.05,
    "discrimination": 1.2,
    "expectedSeconds": 100,
    "prereqClosure": [
      "t-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  // ===== f-distribution =====
  {
    "id": "f-distribution--r3",
    "conceptId": "f-distribution",
    "format": "short-answer",
    "cognitive": "recall",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "State E[F_{d1,d2}] for d2>2, and explain why it doesn't depend on d1.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "E[F_{d1,d2}] = d2/(d2−2) for d2>2",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "this is because E[V1/d1]=1 regardless of d1, so by independence E[F]=E[V1/d1]·E[d2/V2]=1·d2/(d2−2), leaving only d2 in the answer",
          "weight": 1
        }
      ]
    },
    "difficulty": -1.5,
    "discrimination": 1.1,
    "expectedSeconds": 40,
    "prereqClosure": [
      "f-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "f-distribution--r4",
    "conceptId": "f-distribution",
    "format": "mcq",
    "cognitive": "recall",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "As both d1 and d2 → ∞, F_{d1,d2} approaches which value, with vanishing spread?",
    "choices": [
      {
        "id": "choice-1",
        "text": "1",
        "correct": true
      },
      {
        "id": "choice-2",
        "text": "0",
        "correct": false,
        "misconception": {
          "id": "choice-2--misconception",
          "description": "confuses F's lower bound (0) with its limiting central value, which is 1",
          "blameConceptId": "f-distribution"
        }
      },
      {
        "id": "choice-3",
        "text": "d1/d2",
        "correct": false,
        "misconception": {
          "id": "choice-3--misconception",
          "description": "mixes up F with an unnormalized ratio of raw chi-squares; each V_i/d_i individually concentrates near 1, not near d1/d2",
          "blameConceptId": "f-distribution"
        }
      },
      {
        "id": "choice-4",
        "text": "∞",
        "correct": false,
        "misconception": {
          "id": "choice-4--misconception",
          "description": "misses that both the numerator and denominator ratios V1/d1, V2/d2 individually concentrate near their shared mean of 1",
          "blameConceptId": "f-distribution"
        }
      }
    ],
    "difficulty": -1.25,
    "discrimination": 1.15,
    "expectedSeconds": 25,
    "prereqClosure": [
      "f-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "f-distribution--r5",
    "conceptId": "f-distribution",
    "format": "short-answer",
    "cognitive": "recall",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "For which values of d2 does Var(F_{d1,d2}) fail to exist (be infinite/undefined)?",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "Var(F_{d1,d2}) requires d2>4; for d2≤4 the variance is infinite or undefined",
          "weight": 1
        }
      ]
    },
    "difficulty": -1.0,
    "discrimination": 1.1,
    "expectedSeconds": 40,
    "prereqClosure": [
      "f-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "f-distribution--a3",
    "conceptId": "f-distribution",
    "format": "short-answer",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Since T² ~ F_{1,k}, and the two-sided t critical value at df=20 is t_{0.025,20}≈2.086, find the corresponding F critical value F_{0.05,1,20}.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "F_{0.05,1,20} = (t_{0.025,20})² ≈ 2.086² ≈ 4.35",
          "weight": 1,
          "required": true
        }
      ]
    },
    "difficulty": -0.35,
    "discrimination": 1.15,
    "expectedSeconds": 70,
    "prereqClosure": [
      "f-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "f-distribution--a4",
    "conceptId": "f-distribution",
    "format": "short-answer",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Independent sample variance-chi-squares give V₁~χ²₈ and V₂~χ²₁₂. Form F=(V₁/8)/(V₂/12). State F's distribution.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "F ~ F_{8,12}",
          "weight": 1,
          "required": true
        }
      ]
    },
    "difficulty": -0.1,
    "discrimination": 1.1,
    "expectedSeconds": 60,
    "prereqClosure": [
      "f-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "f-distribution--a5",
    "conceptId": "f-distribution",
    "format": "numeric",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "Find E[F_{10,30}] using E[F_{d1,d2}]=d2/(d2−2).",
    "answerKey": 1.0714,
    "tolerance": 0.02,
    "difficulty": 0.15,
    "discrimination": 1.1,
    "expectedSeconds": 55,
    "prereqClosure": [
      "f-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "f-distribution--e3",
    "conceptId": "f-distribution",
    "format": "short-answer",
    "cognitive": "explain",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Explain why Var(F_{d1,d2}) requires d2>4 to exist, connecting it to why E[F] itself requires only d2>2.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "both moments come from E[1/V2^m] for the denominator chi-square",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "this blows up unless the chi-square has enough degrees of freedom to keep its reciprocal moments finite: E[1/V2] needs d2>2, while E[1/V2²] (needed for the second moment/variance) needs the stronger condition d2>4",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.25,
    "discrimination": 1.15,
    "expectedSeconds": 85,
    "prereqClosure": [
      "f-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "f-distribution--e4",
    "conceptId": "f-distribution",
    "format": "short-answer",
    "cognitive": "explain",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Explain why F_{d1,d2} concentrates around 1 as BOTH d1 and d2 grow, but not if only one of them grows while the other stays small.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "concentration comes from each of V1/d1 and V2/d2 individually settling near 1 as its own df grows (relative spread √(2/d) shrinking)",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "if only one df grows, the other ratio still fluctuates a lot, so the overall ratio F stays noisy — both chi-squares must concentrate for their ratio to",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.45,
    "discrimination": 1.2,
    "expectedSeconds": 85,
    "prereqClosure": [
      "f-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "f-distribution--e5",
    "conceptId": "f-distribution",
    "format": "derivation",
    "cognitive": "explain",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Show that as d2→∞ with d1 fixed, F_{d1,d2} converges to χ²_{d1}/d1 (the denominator becomes deterministic).",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "as d2→∞, Var(V2/d2)=2/d2→0, so V2/d2→1 by concentration",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "substituting into F=(V1/d1)/(V2/d2) gives F → (V1/d1)/1 = V1/d1 = χ²_{d1}/d1",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.6,
    "discrimination": 1.2,
    "expectedSeconds": 95,
    "prereqClosure": [
      "f-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "f-distribution--t3",
    "conceptId": "f-distribution",
    "format": "short-answer",
    "cognitive": "transfer",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "If V₁~χ²₅ and V₂~χ²₅ are independent (equal df), find E[F_{5,5}]. Does the equal-df case make F symmetric about 1? Explain.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "E[F_{5,5}] = 5/3 ≈ 1.667",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "no — F remains right-skewed (median<1<mean) despite equal df, because it's a ratio of two positive skewed quantities; symmetry of the two marginal chi-squares doesn't make their ratio symmetric",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.7,
    "discrimination": 1.15,
    "expectedSeconds": 90,
    "prereqClosure": [
      "f-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "f-distribution--t4",
    "conceptId": "f-distribution",
    "format": "short-answer",
    "cognitive": "transfer",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Two lines' variance estimates give an F-statistic of F=0.4 with df (10,10). Using the reciprocal-F property, find the equivalent 'line 2 vs line 1' statistic and its distribution.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "1/0.4 = 2.5, and it is F_{10,10} — same family since d1=d2=10 here",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "reciprocating F just flips which line is 'on top' without changing the F family, when d1=d2",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.9,
    "discrimination": 1.15,
    "expectedSeconds": 90,
    "prereqClosure": [
      "f-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "f-distribution--t5",
    "conceptId": "f-distribution",
    "format": "short-answer",
    "cognitive": "transfer",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Trace the chain Normal → Chi-Square → t and F in terms of what operation is applied at each step.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "a Normal is squared to build chi-square (a sum of squared, independent standardized Normals)",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "a chi-square is combined with a fresh independent standard normal in a ratio Z/√(V/k) to build t; two independent chi-squares are combined in a ratio (V1/d1)/(V2/d2) to build F",
          "weight": 1
        },
        {
          "id": "element-3",
          "description": "T² recovers F_{1,k} exactly, tying the two ratio-constructions together",
          "weight": 1
        }
      ]
    },
    "difficulty": 1.05,
    "discrimination": 1.2,
    "expectedSeconds": 100,
    "prereqClosure": [
      "f-distribution"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  // ===== expectation =====
  {
    "id": "expectation--r3",
    "conceptId": "expectation",
    "format": "short-answer",
    "cognitive": "recall",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "State the 'law of the unconscious statistician' (LOTUS): how is E[g(X)] computed directly from X's PMF/PDF, without first finding the distribution of g(X)?",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "E[g(X)] = Σₓ g(x)p(x) (discrete) or ∫g(x)f(x)dx (continuous)",
          "weight": 1
        },
        {
          "id": "element-2",
          "description": "computed directly using X's own distribution, without deriving Y=g(X)'s distribution first",
          "weight": 1
        }
      ]
    },
    "difficulty": -1.55,
    "discrimination": 1.1,
    "expectedSeconds": 35,
    "prereqClosure": [
      "expectation"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "expectation--r4",
    "conceptId": "expectation",
    "format": "mcq",
    "cognitive": "recall",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "Linearity of expectation, E[X+Y]=E[X]+E[Y], is guaranteed to hold:",
    "choices": [
      {
        "id": "choice-1",
        "text": "even when X and Y are dependent",
        "correct": true
      },
      {
        "id": "choice-2",
        "text": "only when X and Y are independent",
        "correct": false,
        "misconception": {
          "id": "choice-2--misconception",
          "description": "linearity of expectation needs no independence assumption at all — it holds unconditionally",
          "blameConceptId": "expectation"
        }
      },
      {
        "id": "choice-3",
        "text": "only when X and Y are identically distributed",
        "correct": false,
        "misconception": {
          "id": "choice-3--misconception",
          "description": "identical distribution is irrelevant to linearity; it holds for any two random variables with finite expectations",
          "blameConceptId": "expectation"
        }
      },
      {
        "id": "choice-4",
        "text": "only for discrete random variables",
        "correct": false,
        "misconception": {
          "id": "choice-4--misconception",
          "description": "linearity holds equally for continuous, discrete, or mixed random variables",
          "blameConceptId": "expectation"
        }
      }
    ],
    "difficulty": -1.3,
    "discrimination": 1.15,
    "expectedSeconds": 25,
    "prereqClosure": [
      "expectation"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "expectation--r5",
    "conceptId": "expectation",
    "format": "short-answer",
    "cognitive": "recall",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Can E[X] be negative even if X takes positive values with high probability? Explain the idea.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "yes — if X occasionally takes a very large negative value, even with small probability, that value can pull the weighted average below 0",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "a fat left tail can dominate the weighted sum despite X being positive 'most of the time'",
          "weight": 1
        }
      ]
    },
    "difficulty": -1.0,
    "discrimination": 1.1,
    "expectedSeconds": 35,
    "prereqClosure": [
      "expectation"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "expectation--a3",
    "conceptId": "expectation",
    "format": "numeric",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "A game pays $10 with probability 0.2, $0 with probability 0.5, and −$5 with probability 0.3. Find the expected payout.",
    "answerKey": 0.5,
    "tolerance": 0.01,
    "difficulty": -0.45,
    "discrimination": 1.1,
    "expectedSeconds": 50,
    "prereqClosure": [
      "expectation"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "expectation--a4",
    "conceptId": "expectation",
    "format": "numeric",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "X has density f(x)=3x² on [0,1]. Find E[X].",
    "answerKey": 0.75,
    "tolerance": 0.01,
    "difficulty": -0.25,
    "discrimination": 1.15,
    "expectedSeconds": 60,
    "prereqClosure": [
      "expectation"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "expectation--a5",
    "conceptId": "expectation",
    "format": "numeric",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "Using LOTUS, find E[X²] for X with PMF p(1)=0.4, p(2)=0.4, p(3)=0.2 (without first finding Var(X)).",
    "answerKey": 3.8,
    "tolerance": 0.01,
    "difficulty": 0.0,
    "discrimination": 1.1,
    "expectedSeconds": 55,
    "prereqClosure": [
      "expectation"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "expectation--a6",
    "conceptId": "expectation",
    "format": "numeric",
    "cognitive": "apply",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "X ~ Uniform(0,1). Using LOTUS, find E[X³].",
    "answerKey": 0.25,
    "tolerance": 0.01,
    "difficulty": 0.15,
    "discrimination": 1.1,
    "expectedSeconds": 50,
    "prereqClosure": [
      "expectation"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "expectation--e3",
    "conceptId": "expectation",
    "format": "short-answer",
    "cognitive": "explain",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Explain why LOTUS (averaging g(x)f(x)) is necessary — give the concrete reason E[X²] ≠ (E[X])² in general.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "averaging is not the same operation as squaring; by Jensen's inequality E[g(X)]≥g(E[X]) for convex g like x², with equality only when X is constant",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "plugging the mean into g first, rather than averaging g(X) over the whole distribution, generally gives a different (smaller, for convex g) number",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.25,
    "discrimination": 1.15,
    "expectedSeconds": 70,
    "prereqClosure": [
      "expectation"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "expectation--e4",
    "conceptId": "expectation",
    "format": "derivation",
    "cognitive": "explain",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Derive E[X] for a fair six-sided die from the discrete sum definition, and confirm it need not be an achievable face.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "E[X] = Σ x·(1/6) for x=1,…,6 = (1+2+3+4+5+6)/6 = 21/6 = 3.5",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "3.5 is not a face the die can show, confirming the mean need not be an attainable value",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.4,
    "discrimination": 1.15,
    "expectedSeconds": 65,
    "prereqClosure": [
      "expectation"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "expectation--e5",
    "conceptId": "expectation",
    "format": "short-answer",
    "cognitive": "explain",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "Explain why E[c]=c for any constant c, treating c as a degenerate random variable, using the discrete definition directly.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "a constant c can be viewed as a random variable taking the single value c with probability 1",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "the sum Σx·p(x) collapses to c·1 = c — expectation of something with no randomness is just that fixed value",
          "weight": 1
        }
      ]
    },
    "difficulty": 0.6,
    "discrimination": 1.1,
    "expectedSeconds": 60,
    "prereqClosure": [
      "expectation"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "expectation--t2",
    "conceptId": "expectation",
    "format": "numeric",
    "cognitive": "transfer",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "A fair die is rolled twice; let S be the sum. Using linearity (not the joint PMF of S), find E[S].",
    "answerKey": 7,
    "tolerance": 0.01,
    "difficulty": 0.6,
    "discrimination": 1.1,
    "expectedSeconds": 55,
    "prereqClosure": [
      "expectation"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "expectation--t3",
    "conceptId": "expectation",
    "format": "numeric",
    "cognitive": "transfer",
    "channels": [
      "typed",
      "handwritten"
    ],
    "stem": "An investor holds asset A (returns $1000 w.p. 0.6, −$500 w.p. 0.4) and independent asset B (returns $200 w.p. 0.5, $0 otherwise). Using linearity, find E[total return].",
    "answerKey": 500,
    "tolerance": 0.02,
    "difficulty": 0.85,
    "discrimination": 1.15,
    "expectedSeconds": 85,
    "prereqClosure": [
      "expectation"
    ],
    "source": AUTHORED,
    "status": "live"
  },
  {
    "id": "expectation--t4",
    "conceptId": "expectation",
    "format": "short-answer",
    "cognitive": "transfer",
    "channels": [
      "typed",
      "handwritten",
      "spoken"
    ],
    "stem": "A lottery sells 1000 tickets at $5 each; exactly one ticket wins $2000, the rest win nothing. Find the buyer's expected net gain (payout minus price), and explain what this number means for a single play even though no ticket can lose exactly that amount.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "E[payout] = 2000·(1/1000) = $2; net gain = 2 − 5 = −$3",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "this is a long-run per-ticket average, not a possible single-play outcome — a ticket either nets +$1995 or −$5, never −$3",
          "weight": 1
        }
      ]
    },
    "difficulty": 1.05,
    "discrimination": 1.2,
    "expectedSeconds": 100,
    "prereqClosure": [
      "expectation"
    ],
    "source": AUTHORED,
    "status": "live"
  },

];
