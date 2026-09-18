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
    "stem": "State the 68-95-99.7 empirical rule for $\\text{Normal}(\\mu, \\sigma^2)$: what fraction of the mass lies within $1\\sigma$, $2\\sigma$, and $3\\sigma$ of $\\mu$?",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "about 68% of the mass lies within $1\\sigma$ of $\\mu$",
          "weight": 1
        },
        {
          "id": "element-2",
          "description": "about 95% lies within $2\\sigma$, and about 99.7% lies within $3\\sigma$",
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
    "stem": "In $\\text{Normal}(\\mu, \\sigma^2)$, the parameter $\\sigma^2$ controls:",
    "choices": [
      {
        "id": "choice-1",
        "text": "the spread (dispersion) of the distribution around $\\mu$",
        "correct": true
      },
      {
        "id": "choice-2",
        "text": "the location of the peak",
        "correct": false,
        "misconception": {
          "id": "choice-2--misconception",
          "description": "confuses $\\sigma^2$ with $\\mu$, which controls location, not spread",
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
        "text": "the boundaries of $X$'s support",
        "correct": false,
        "misconception": {
          "id": "choice-4--misconception",
          "description": "Normal's support is all of $\\mathbb{R}$ regardless of $\\sigma$; $\\sigma^2$ never bounds it",
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
    "stem": "Give the standard normal CDF $\\Phi(z)$ as an integral of the standard normal density, and state $\\Phi(0)$.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$\\Phi(z) = \\int_{-\\infty}^{z} \\frac{1}{\\sqrt{2\\pi}}\\,e^{-t^2/2}\\,dt$",
          "weight": 1
        },
        {
          "id": "element-2",
          "description": "$\\Phi(0) = 0.5$, since the density is symmetric about 0",
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
    "stem": "True or false, with justification: the Normal density $f(x)$ is strictly positive for every real $x$, however far $x$ is from $\\mu$.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "true — the exponential term $e^{-(x-\\mu)^2/(2\\sigma^2)}$ never equals exactly 0 for any finite $x$, so the support is all of $\\mathbb{R}$ even though the tails become vanishingly small far from $\\mu$",
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
    "stem": "Adult male heights are modeled as $N(70, 3^2)$ inches. Find $P(66 < X < 76)$.",
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
    "stem": "A standardized test's scores are $N(500, 100^2)$. A scholarship requires being in the top 10% of scores. Find the minimum score needed.",
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
    "stem": "$X \\sim N(20, 4^2)$. Find $P(X < 15 \\text{ or } X > 25)$.",
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
          "description": "the empirical rule relies on the Normal density's rapidly (exponentially) decaying tails, which concentrate mass tightly within a few $\\sigma$ of the mean",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "Cauchy's tails decay only polynomially (as $1/x^2$) and Cauchy has no finite variance at all — there is no $\\sigma$ to even state the rule in terms of",
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
    "stem": "The Normal density's leading constant is $\\frac{1}{\\sigma\\sqrt{2\\pi}}$. Explain why doubling $\\sigma$ must shrink this constant rather than leave it fixed.",
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
          "description": "spreading the bump out over a wider range (larger $\\sigma$) lowers its peak height so the enclosed area stays fixed at 1; the constant scales as $1/\\sigma$ to compensate",
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
    "stem": "Derive $P(\\mu-\\sigma < X < \\mu+\\sigma)$ in terms of $\\Phi$, then use $\\Phi(1) \\approx 0.8413$ to recover the numeric '68%' of the empirical rule.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "standardizing gives $P(\\mu-\\sigma<X<\\mu+\\sigma) = P(-1<Z<1) = \\Phi(1) - \\Phi(-1)$",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "using $\\Phi(-1)=1-\\Phi(1)$, this is $2\\Phi(1)-1$",
          "weight": 1
        },
        {
          "id": "element-3",
          "description": "$2(0.8413)-1 = 0.6826 \\approx 68.3\\%$",
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
    "stem": "If $X\\sim N(\\mu,\\sigma^2)$, show that $Y=(X-\\mu)^2/\\sigma^2$ is distributed as $\\chi^2_1$ — a first glimpse of how Normal connects to Chi-Square.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$Z=(X-\\mu)/\\sigma$ is standard normal",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "$Y = Z^2$, and by the definition of chi-square with 1 degree of freedom, the square of a single standard normal is $\\chi^2_1$",
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
    "stem": "A chemical reaction's duration is $X \\sim N(30, 5^2)$ minutes. A quality check flags reactions in the extreme 1% combined (0.5% in each tail). Find the two cutoff times.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "the two-sided 1% cutoff uses $z_{0.995} \\approx 2.5758$",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "cutoffs are $30 \\pm 5(2.5758) \\approx 17.12$ minutes and $42.88$ minutes",
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
    "stem": "For $X \\sim \\text{Uniform}(a,b)$, give the CDF $F(x)$ piecewise.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$F(x) = 0$ for $x<a$; $F(x) = \\frac{x-a}{b-a}$ for $a\\leq x\\leq b$; $F(x) = 1$ for $x>b$",
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
    "stem": "Which statement about $\\text{Uniform}(a,b)$ is true?",
    "choices": [
      {
        "id": "choice-1",
        "text": "every value in $[a,b]$ is equally likely to be the mode, since the density is constant",
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
        "text": "$E[X] = a$",
        "correct": false,
        "misconception": {
          "id": "choice-3--misconception",
          "description": "misremembers the mean formula, which is the midpoint $(a+b)/2$, not the left endpoint",
          "blameConceptId": "uniform-distribution"
        }
      },
      {
        "id": "choice-4",
        "text": "$Var(X) = (b-a)/12$",
        "correct": false,
        "misconception": {
          "id": "choice-4--misconception",
          "description": "forgets the squaring in the variance formula $(b-a)^2/12$",
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
    "stem": "Is $\\text{Uniform}(a,b)$ symmetric, and if so, about what point?",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "yes — the constant density is symmetric about the midpoint $(a+b)/2$",
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
    "stem": "A random-number generator produces $X \\sim \\text{Uniform}(0,1)$. Find $P(X > 0.65)$.",
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
    "stem": "A machine's cycle time is $\\text{Uniform}(40,60)$ seconds. Find $Var(X)$ and $P(45 < X < 50)$.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$Var(X) = (60-40)^2/12 = 400/12 \\approx 33.33$",
          "weight": 1
        },
        {
          "id": "element-2",
          "description": "$P(45<X<50) = (50-45)/(60-40) = 5/20 = 0.25$",
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
    "stem": "$X \\sim \\text{Uniform}(-3,3)$. Find $P(|X| < 1)$.",
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
    "stem": "A temperature-sensor's reading error is $\\text{Uniform}(-0.5, 0.5)$ °C. Find $P(|\\text{error}| > 0.3)$.",
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
    "stem": "Explain why the mean and median of any $\\text{Uniform}(a,b)$ are always equal, using only symmetry (no integration).",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "the distribution is symmetric about the midpoint $(a+b)/2$ — for any symmetric distribution, that center of symmetry is simultaneously the mean (balance point) and the median (equal mass on both sides)",
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
    "stem": "Let $Y = X-a$, so $Y \\sim \\text{Uniform}(0, b-a)$. Show $Var(X) = Var(Y)$ without recomputing an integral over $[a,b]$.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "shifting a random variable by a constant $a$ doesn't change its spread: $Var(X) = Var(Y+a) = Var(Y)$, since variance is shift-invariant",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "so $Var(X)$ can be computed as $Var(\\text{Uniform}(0,b-a)) = (b-a)^2/12$ without ever integrating over the original interval $[a,b]$",
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
    "stem": "Explain, using the density's constant height, why $\\text{Uniform}(a,b)$ is the natural 'default' distribution when nothing distinguishes outcomes in an interval — and what real-world assumption would break this choice.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "a constant density encodes exactly the assumption that no sub-interval of $[a,b]$ is more likely than any other of the same length — no extra information is assumed",
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
    "stem": "A dart lands at $X \\sim \\text{Uniform}(0,1)$ meters along a ruler. Let $Y = X^2$ (distance squared). Find the density of $Y$ for $0<y<1$, using the CDF technique.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$F_Y(y) = P(X^2\\leq y) = P(X\\leq \\sqrt{y}) = \\sqrt{y}$ for $0<y<1$, since $X\\sim \\text{Uniform}(0,1)$ has CDF equal to its argument",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "differentiating gives $f_Y(y) = \\frac{1}{2\\sqrt{y}}$",
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
    "stem": "Inverse-transform sampling uses $\\text{Uniform}(0,1)$ as its building block: if $U\\sim \\text{Uniform}(0,1)$ and $F$ is a target CDF, $X=F^{-1}(U)$ has distribution $F$. Explain why.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$P(X\\leq x) = P(F^{-1}(U)\\leq x) = P(U\\leq F(x))$, applying $F$ (increasing) to both sides of the inequality",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "since $U\\sim \\text{Uniform}(0,1)$ has CDF equal to the identity on $[0,1]$, $P(U\\leq F(x)) = F(x)$ directly, so $X$'s CDF is exactly $F$",
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
    "stem": "Two independent measurements $X, Y \\sim \\text{Uniform}(0,1)$ are taken. Find $P(X+Y < 0.5)$.",
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
    "stem": "State the CDF and the hazard (instantaneous failure) function of $\\text{Exponential}(\\lambda)$.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$F(x) = 1 - e^{-\\lambda x}$ for $x\\geq 0$",
          "weight": 1
        },
        {
          "id": "element-2",
          "description": "hazard $h(x) = f(x)/(1-F(x)) = \\lambda e^{-\\lambda x}/e^{-\\lambda x} = \\lambda$ — constant, independent of $x$",
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
    "stem": "For $\\text{Exponential}(\\lambda)$, which is TRUE?",
    "choices": [
      {
        "id": "choice-1",
        "text": "$E[X] = 1/\\lambda$",
        "correct": true
      },
      {
        "id": "choice-2",
        "text": "$E[X] = \\lambda$",
        "correct": false,
        "misconception": {
          "id": "choice-2--misconception",
          "description": "confuses the rate parameter $\\lambda$ with the mean, which is its reciprocal",
          "blameConceptId": "exponential-distribution"
        }
      },
      {
        "id": "choice-3",
        "text": "$Var(X) = 1/\\lambda$",
        "correct": false,
        "misconception": {
          "id": "choice-3--misconception",
          "description": "forgets the squaring in the variance formula $Var(X)=1/\\lambda^2$",
          "blameConceptId": "exponential-distribution"
        }
      },
      {
        "id": "choice-4",
        "text": "the median equals the mean, $1/\\lambda$",
        "correct": false,
        "misconception": {
          "id": "choice-4--misconception",
          "description": "the median is $\\ln 2/\\lambda \\approx 0.693/\\lambda$, strictly less than the mean $1/\\lambda$, since Exponential is right-skewed",
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
    "stem": "Find the median of $\\text{Exponential}(\\lambda)$ in terms of $\\lambda$, and show it is less than the mean $1/\\lambda$.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "solve $1-e^{-\\lambda m}=0.5$ for $m$: $m = \\ln(2)/\\lambda \\approx 0.693/\\lambda$",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "since $\\ln 2\\approx 0.693<1$, the median is strictly less than the mean $1/\\lambda$",
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
    "stem": "A component has a constant failure rate $\\lambda=0.02$ per hour (Exponential lifetime). Find the probability it survives beyond 100 hours.",
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
          "description": "gaps are $\\text{Exponential}(5)$; $E[\\text{gap}] = 1/5 = 0.2$ minutes",
          "weight": 1
        },
        {
          "id": "element-2",
          "description": "$P(\\text{gap}>0.5) = e^{-5(0.5)} = e^{-2.5} \\approx 0.0821$",
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
    "stem": "An ATM's time between customers is Exponential with rate 0.5/minute. Find $P(1 < X < 3)$.",
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
    "stem": "Explain why the median of $\\text{Exponential}(\\lambda)$ is always less than its mean, in terms of the distribution's skew.",
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
          "description": "this matches $\\text{median} = \\ln 2/\\lambda \\approx 0.693/\\lambda < \\text{mean} = 1/\\lambda$",
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
    "stem": "Derive the CDF $F(x) = 1 - e^{-\\lambda x}$ for $\\text{Exponential}(\\lambda)$ by integrating the density from 0 to $x$.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$F(x) = \\int_0^x \\lambda e^{-\\lambda t}\\,dt$",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "$= [-e^{-\\lambda t}]_0^x = -e^{-\\lambda x} - (-1) = 1 - e^{-\\lambda x}$",
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
    "stem": "Explain why the hazard rate of $\\text{Exponential}(\\lambda)$ is constant and equal to $\\lambda$, connecting this directly to memorylessness.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$h(x) = f(x)/(1-F(x)) = \\lambda e^{-\\lambda x}/e^{-\\lambda x} = \\lambda$ for every $x$",
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
    "stem": "If $X \\sim \\text{Exponential}(\\lambda)$, show that $Y = \\lambda X \\sim \\text{Exponential}(1)$ — any Exponential rescales to the 'standard' rate-1 Exponential.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$P(Y>y) = P(\\lambda X>y) = P(X>y/\\lambda) = e^{-\\lambda(y/\\lambda)} = e^{-y}$",
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
    "stem": "A system fails as soon as the FIRST of 3 identical, independent Exponential($\\lambda=0.1$/hour) components fails. Find the mean lifetime of the system.",
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
    "stem": "Without computing anything, explain why the sum of $n$ iid $\\text{Exponential}(\\lambda)$ waiting times is NOT itself Exponential, but instead has a less-skewed, humped shape.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "summing $n$ memoryless waits produces a $\\text{Gamma}(n,\\lambda)$ distribution, not another Exponential",
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
    "stem": "$\\text{Gamma}(\\alpha,\\beta)$ has $E[X]=\\alpha/\\beta$. If $\\alpha$ is doubled while $\\beta$ stays fixed, what happens to $E[X]$ and $Var(X)$?",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$E[X]$ doubles, to $2\\alpha/\\beta$",
          "weight": 1
        },
        {
          "id": "element-2",
          "description": "$Var(X)=\\alpha/\\beta^2$ also doubles, to $2\\alpha/\\beta^2$",
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
    "stem": "In $\\text{Gamma}(\\alpha,\\beta)$, increasing the rate $\\beta$ while holding $\\alpha$ fixed does what to the mean and variance?",
    "choices": [
      {
        "id": "choice-1",
        "text": "both decrease, since $E[X]=\\alpha/\\beta$ and $Var(X)=\\alpha/\\beta^2$ both fall as $\\beta$ rises",
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
          "description": "mixes up the two formulas; both share the same $1/\\beta$-type dependence and move together",
          "blameConceptId": "gamma-distribution"
        }
      },
      {
        "id": "choice-4",
        "text": "neither changes, since only $\\alpha$ is a shape parameter",
        "correct": false,
        "misconception": {
          "id": "choice-4--misconception",
          "description": "misses that $\\beta$ enters both $E[X]=\\alpha/\\beta$ and $Var(X)=\\alpha/\\beta^2$ directly",
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
    "stem": "What is the mode of $\\text{Gamma}(\\alpha,\\beta)$ for $\\alpha\\geq 1$? Why does Gamma have no interior mode when $\\alpha<1$?",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "mode $= (\\alpha-1)/\\beta$ for $\\alpha\\geq 1$",
          "weight": 1
        },
        {
          "id": "element-2",
          "description": "for $\\alpha<1$ the density is unbounded and decreasing from $x=0$ (it blows up near 0 rather than peaking away from it), so there is no interior mode",
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
    "stem": "Website hits arrive as $\\text{Poisson}(6/\\text{hour})$. Using $\\text{Gamma}(8,6)$, find the standard deviation of the time until the 8th hit.",
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
    "stem": "A machine is replaced on its 3rd repair; repairs occur as a Poisson process at rate 0.5/month. Using $\\text{Gamma}(3,0.5)$, find $E[\\text{time to replacement}]$ and $Var(\\text{time to replacement})$.",
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
    "stem": "$X \\sim \\text{Gamma}(4,2)$. Find $E[X]$ and $Var(X)$.",
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
    "stem": "Insurance claims of a type arrive as $\\text{Poisson}(2/\\text{day})$. Find $P(\\text{the 4th claim arrives within the first day})$, using the Poisson-count duality (not the Gamma density).",
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
          "description": "$N(1)\\sim \\text{Poisson}(2)$; $P(N\\geq 4) = 1 - P(N\\leq 3) = 1 - (0.1353+0.2707+0.2707+0.1804) \\approx 1 - 0.8571 = 0.1429$",
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
    "stem": "Explain why $\\text{Gamma}(\\alpha,\\beta)$ becomes more symmetric as $\\alpha$ grows, connecting this to the sum-of-Exponentials interpretation.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "for integer $\\alpha$, $\\text{Gamma}(\\alpha,\\beta)$ is a sum of $\\alpha$ iid $\\text{Exponential}(\\beta)$ waits, and sums of many iid terms tend toward a symmetric, bell-shaped distribution",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "concretely, its relative spread $SD/\\text{mean} = 1/\\sqrt{\\alpha}$ shrinks as $\\alpha$ grows, so the shape tightens and symmetrizes relative to its own scale",
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
    "stem": "Show $Var(\\text{Gamma}(\\alpha,\\beta)) = \\alpha/\\beta^2$ by computing the variance of a sum of $\\alpha$ iid $\\text{Exponential}(\\beta)$ variables (do not integrate the Gamma density).",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$Var(\\text{Exponential}(\\beta)) = 1/\\beta^2$",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "for independent variables, variances add: $Var(\\text{sum of }\\alpha\\text{ of them}) = \\alpha\\cdot(1/\\beta^2) = \\alpha/\\beta^2$",
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
    "stem": "$\\text{Gamma}(\\alpha,\\beta)$ allows non-integer $\\alpha$, unlike the clean 'sum of $\\alpha$ iid Exponentials' story. Explain, informally, what a non-integer shape like $\\alpha=2.5$ could represent.",
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
    "stem": "Show that if $X \\sim \\text{Gamma}(\\alpha,\\beta)$, then $Y=cX$ ($c>0$) is $\\text{Gamma}(\\alpha, \\beta/c)$. Verify using $E[Y]=\\alpha/(\\beta/c)$.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$E[Y] = E[cX] = cE[X] = c\\alpha/\\beta$",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "this equals $\\alpha/(\\beta/c)$, matching the claimed parameters — scaling a Gamma variable rescales its rate inversely",
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
    "stem": "Explain how the Chi-Square distribution $\\chi^2_k$ is a special case of Gamma — state the $(\\alpha,\\beta)$ values that give $\\chi^2_k$.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$\\chi^2_k = \\text{Gamma}(k/2, 1/2)$",
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
    "stem": "Customers arrive as $\\text{Poisson}(4/\\text{hour})$. Using the count/waiting-time duality, find $P(\\text{the 6th customer arrives within the first 2 hours})$.",
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
    "stem": "State the density of $\\text{Beta}(\\alpha,\\beta)$ up to its normalizing constant $1/B(\\alpha,\\beta)$, and give its support.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$f(x) \\propto x^{\\alpha-1}(1-x)^{\\beta-1}$",
          "weight": 1
        },
        {
          "id": "element-2",
          "description": "support is $(0,1)$",
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
    "stem": "Which condition makes $\\text{Beta}(\\alpha,\\beta)$ symmetric about 0.5?",
    "choices": [
      {
        "id": "choice-1",
        "text": "$\\alpha = \\beta$",
        "correct": true
      },
      {
        "id": "choice-2",
        "text": "$\\alpha = 1$",
        "correct": false,
        "misconception": {
          "id": "choice-2--misconception",
          "description": "this only makes the left factor constant; it does not by itself force symmetry unless $\\beta=1$ too",
          "blameConceptId": "beta-distribution"
        }
      },
      {
        "id": "choice-3",
        "text": "$\\beta = 1$",
        "correct": false,
        "misconception": {
          "id": "choice-3--misconception",
          "description": "same issue as $\\alpha=1$ alone — symmetric shape needs the two exponents to match, i.e. $\\alpha=\\beta$",
          "blameConceptId": "beta-distribution"
        }
      },
      {
        "id": "choice-4",
        "text": "$\\alpha + \\beta = 1$",
        "correct": false,
        "misconception": {
          "id": "choice-4--misconception",
          "description": "this constrains the *sum*, not the *balance* between $\\alpha$ and $\\beta$, and does not force symmetry",
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
    "stem": "Describe the shape of $\\text{Beta}(0.5, 0.5)$ (the 'arcsine' distribution) — is it U-shaped, uniform, or bell-shaped?",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "U-shaped: since $\\alpha-1=\\beta-1=-0.5<0$, the density increases without bound toward both 0 and 1, with a dip in the middle",
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
    "stem": "$X \\sim \\text{Beta}(5,2)$. Find $E[X]$ and $Var(X)$.",
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
    "stem": "A coin's bias is modeled as $\\text{Beta}(3,7)$ before any flips are observed. Find the prior mean and the prior mode of the bias.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "mean $= \\alpha/(\\alpha+\\beta) = 3/10 = 0.3$",
          "weight": 1
        },
        {
          "id": "element-2",
          "description": "mode $= (\\alpha-1)/(\\alpha+\\beta-2) = 2/8 = 0.25$",
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
    "stem": "$X \\sim \\text{Beta}(1,4)$. Find $P(X < 0.5)$.",
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
    "stem": "$X \\sim \\text{Beta}(4,4)$. Find $E[X]$ and $Var(X)$.",
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
    "stem": "Explain why Beta's variance formula $\\alpha\\beta/[(\\alpha+\\beta)^2(\\alpha+\\beta+1)]$ guarantees $Var\\to 0$ as $\\alpha+\\beta\\to\\infty$ with the mean held fixed — the mechanism behind 'more data means more certainty' in Bayesian updating.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "treat $\\alpha+\\beta$ as a 'pseudo-count' or effective sample size",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "the denominator grows as the cube of $(\\alpha+\\beta)$ while the numerator $\\alpha\\beta$ grows only as its square, so the ratio shrinks toward 0 as $\\alpha+\\beta$ grows — mirroring how a posterior concentrates as more data accumulates",
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
    "stem": "For the symmetric case $\\alpha=\\beta=k$ (mean fixed at 0.5), show $Var(X) = \\frac{1}{4(2k+1)}$ using the general Beta variance formula.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$\\alpha\\beta = k^2$, $(\\alpha+\\beta)^2 = 4k^2$, $(\\alpha+\\beta+1) = 2k+1$",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "substituting: $k^2/(4k^2(2k+1)) = 1/(4(2k+1))$",
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
    "stem": "Explain the Bayesian reading of $\\text{Beta}(\\alpha,\\beta)$ as a belief about a probability $p$, where $\\alpha-1$ and $\\beta-1$ act like 'prior successes' and 'prior failures.' Why does observing $s$ successes and $f$ failures update the posterior to $\\text{Beta}(\\alpha+s, \\beta+f)$?",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "Beta's kernel $x^{\\alpha-1}(1-x)^{\\beta-1}$ multiplies with a Binomial likelihood $x^s(1-x)^f$ in exactly the same functional form",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "so the posterior $\\propto \\text{prior}\\times\\text{likelihood}$ stays in the Beta family, with the counts simply adding: $\\text{Beta}(\\alpha+s, \\beta+f)$ — this is why Beta is called the 'conjugate' prior for a Binomial/Bernoulli likelihood",
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
    "stem": "If $U\\sim \\text{Gamma}(\\alpha,1)$ and $V\\sim \\text{Gamma}(\\beta,1)$ are independent, what is the distribution of $X = U/(U+V)$? Name the connection to Beta.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$X \\sim \\text{Beta}(\\alpha,\\beta)$ — this is the standard Gamma-ratio construction of a Beta random variable",
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
    "stem": "An A/B test observes 8 successes out of 20 trials, starting from a $\\text{Beta}(1,1)$ (uniform) prior, giving posterior $\\text{Beta}(9,13)$. Find the posterior mean.",
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
    "stem": "As $\\alpha,\\beta\\to\\infty$ with $\\alpha/(\\alpha+\\beta)$ fixed at some value $p$, what shape does $\\text{Beta}(\\alpha,\\beta)$ approach? Justify using the variance-shrinkage argument from this concept's earlier items.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "it approaches a Normal-like bell shape, concentrated ever more tightly around $p$",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "this follows because $Var(X)\\to 0$ as $\\alpha+\\beta\\to\\infty$ with the mean fixed, so nearly all the mass piles up in a shrinking neighborhood of $p$",
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
    "stem": "Give the special case of Gamma that equals $\\chi^2_k$ — state the $(\\alpha,\\beta)$ values.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$\\chi^2_k = \\text{Gamma}(k/2, 1/2)$",
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
    "stem": "As the degrees of freedom $k$ increases, the skewness of $\\chi^2_k$:",
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
        "text": "stays exactly 0 for every $k$",
        "correct": false,
        "misconception": {
          "id": "choice-3--misconception",
          "description": "$\\chi^2_k$ is right-skewed for every finite $k$; it is never exactly symmetric except in the $k\\to\\infty$ limit",
          "blameConceptId": "chi-square-distribution"
        }
      },
      {
        "id": "choice-4",
        "text": "first increases, then decreases",
        "correct": false,
        "misconception": {
          "id": "choice-4--misconception",
          "description": "there is no such non-monotonic reversal — skewness $(2\\sqrt{2/k})$ decreases monotonically in $k$",
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
    "stem": "State the mode of $\\chi^2_k$ for $k\\geq 2$. Why does $\\chi^2_1$ have no interior mode?",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "mode $= k-2$ for $k\\geq 2$",
          "weight": 1
        },
        {
          "id": "element-2",
          "description": "for $k=1$, the density is proportional to $x^{-1/2}e^{-x/2}$, which diverges to $\\infty$ as $x\\to 0^+$ and decreases monotonically after — there is no interior peak",
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
    "stem": "$X \\sim \\chi^2_{20}$. Find $E[X]$, $Var(X)$, and $SD(X)$.",
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
    "stem": "If $Z_1,\\ldots,Z_6$ are iid $N(0,1)$, find $E[Z_1^2+\\cdots+Z_6^2]$ and its variance.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "the sum is $\\chi^2_6$",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "$E = 6$, $Var = 2(6) = 12$",
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
    "stem": "$X\\sim \\chi^2_4$, $Y\\sim \\chi^2_9$ independent. Find $E[X+Y]$.",
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
    "stem": "Find the coefficient of variation ($SD/\\text{mean}$) of $\\chi^2_{50}$.",
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
    "stem": "Using $Var(\\chi^2_k)=2k$, explain why the RELATIVE spread $\\sqrt{2/k}$ shrinks as $k$ grows, even though the ABSOLUTE spread $SD=\\sqrt{2k}$ actually grows.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$SD=\\sqrt{2k}$ grows without bound as $k\\to\\infty$ — more summed terms means more absolute variability",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "but relative to the also-growing mean $k$, $SD/\\text{mean}=\\sqrt{2/k}\\to 0$, so the shape tightens relative to its own scale even as its absolute spread increases",
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
    "stem": "Derive $Var(\\chi^2_k)=2k$ directly from the definition $\\sum_i Z_i^2$, using $Var(Z_i^2)=2$ for a standard normal $Z_i$ (you may take this fact as given) and independence.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$Var(\\sum Z_i^2) = \\sum Var(Z_i^2)$, using independence of the $Z_i$",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "$= k\\cdot 2 = 2k$",
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
    "stem": "Explain why $\\chi^2_k$ can never take a negative value, tracing the reason back to its definition.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "each $Z_i^2 \\geq 0$ for real $Z_i$, since squares of real numbers are never negative",
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
    "stem": "If $X\\sim \\chi^2_{10}$, identify Gamma's $\\alpha$ and $\\beta$ for $X$, and verify $E[X]=\\alpha/\\beta$ gives 10.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$\\alpha=5$, $\\beta=0.5$ (since $\\chi^2_k = \\text{Gamma}(k/2,1/2)$ with $k=10$)",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "$E[X] = \\alpha/\\beta = 5/0.5 = 10$, matching $\\chi^2_{10}$'s known mean",
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
    "stem": "In estimating variance from $n=15$ Normal measurements, the standardized sum of squared deviations follows $\\chi^2_{14}$ ($n-1$ degrees of freedom). Find $Var(\\chi^2_{14})$.",
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
    "stem": "Explain, conceptually (no formula needed), why $F_{d1,d2}$ is built from TWO independent chi-squares rather than one, when the goal is to compare two variances.",
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
    "stem": "$T_k = Z/\\sqrt{V/k}$ for standard normal $Z$ and independent $\\chi^2_k$ variable $V$. Is $T_k$ symmetric about 0 for every $k$? Justify briefly.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "yes, for every $k$",
          "weight": 1
        },
        {
          "id": "element-2",
          "description": "$Z$ is symmetric about 0, and the denominator $\\sqrt{V/k}$ is always positive and doesn't depend on $Z$'s sign, so $T_k$ inherits $Z$'s sign symmetry exactly",
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
    "stem": "For which values of $k$ is $Var(T_k)$ undefined or infinite?",
    "choices": [
      {
        "id": "choice-1",
        "text": "$k = 1$ or $k = 2$",
        "correct": true
      },
      {
        "id": "choice-2",
        "text": "$k = 0$ only",
        "correct": false,
        "misconception": {
          "id": "choice-2--misconception",
          "description": "misidentifies where $Var(T_k)=k/(k-2)$ diverges — the denominator vanishes at $k=2$, and t is not even defined for $k=0$",
          "blameConceptId": "t-distribution"
        }
      },
      {
        "id": "choice-3",
        "text": "$Var(T_k)$ is always finite for $k\\geq 1$",
        "correct": false,
        "misconception": {
          "id": "choice-3--misconception",
          "description": "false — the formula $k/(k-2)$ is undefined at $k=2$ and negative (nonsensical) for $k=1$, meaning the variance doesn't exist there",
          "blameConceptId": "t-distribution"
        }
      },
      {
        "id": "choice-4",
        "text": "$k \\geq 2$",
        "correct": false,
        "misconception": {
          "id": "choice-4--misconception",
          "description": "backwards — $Var(T_k)$ exists and is finite precisely for $k>2$, not for $k\\geq 2$",
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
    "stem": "As $k\\to\\infty$, what does $T_k$ converge to, and what principle (about $V/k$) drives this?",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$T_k$ converges to the standard normal $N(0,1)$",
          "weight": 1
        },
        {
          "id": "element-2",
          "description": "this happens because $V/k \\to 1$ as $k\\to\\infty$ (a law-of-large-numbers-type concentration of the chi-square average around its mean), so $T_k \\to Z/1 = Z$",
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
    "stem": "Find $Var(T_{10})$ using $Var(T_k)=k/(k-2)$.",
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
    "stem": "Find $Var(T_{30})$ and $Var(T_5)$. Which is closer to 1, and what does that mean?",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$Var(T_{30}) = 30/28 \\approx 1.071$; $Var(T_5) = 5/3 \\approx 1.667$",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "$T_{30}$ is much closer to Normal's variance of 1, confirming $T_k$ converges toward Normal as $k$ grows",
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
    "stem": "A sample of $n=6$ ($df=5$) gives a two-sided 95% critical value of about 2.571, versus Normal's 1.96. Explain why the t critical value must be larger in magnitude here.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "with only 5 degrees of freedom, $T_5$ has noticeably heavier tails than the standard normal",
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
    "stem": "Find $Var(T_6)$ and $Var(T_{100})$. Which is closer to 1?",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$Var(T_6) = 6/4 = 1.5$; $Var(T_{100}) = 100/98 \\approx 1.0204$",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "$T_{100}$ is much closer to 1, as expected from convergence to Normal",
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
    "stem": "Explain, using $T_k=Z/\\sqrt{V/k}$, why $T_k$ is always symmetric about 0 regardless of $k$.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$Z$ is symmetric about 0: $P(Z>z)=P(Z<-z)$ for every $z$",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "the denominator $\\sqrt{V/k}$ is always strictly positive and independent of $Z$'s sign, so $P(T_k>t)=P(T_k<-t)$ for every $t$",
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
    "stem": "Show $E[T_k]=0$ for $k>1$, using independence of $Z$ and $V$ and $E[Z]=0$ (you need not derive $E[1/\\sqrt{V/k}]$ itself).",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "by independence, $E[T_k] = E[Z/\\sqrt{V/k}] = E[Z]\\cdot E[1/\\sqrt{V/k}]$",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "$= 0 \\cdot$ (some finite constant) $= 0$, valid whenever $E[1/\\sqrt{V/k}]$ is finite, i.e. $k>1$",
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
    "stem": "Explain why $Var(T_k)$ is always strictly greater than $Var(Z)=1$ for $k>2$, tracing the extra variability to the random denominator.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "dividing $Z$ by a random quantity $\\sqrt{V/k}$ that fluctuates around 1 (rather than always being exactly 1) adds extra variability on top of $Z$'s own",
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
    "stem": "State the distribution of $T_k^2$, and its two degrees-of-freedom parameters.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$T_k^2 \\sim F_{1,k}$",
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
    "stem": "A confidence interval for a mean uses t with $df=20$, critical value $t_{0.025,20}\\approx 2.086$. If the sample mean is 50 and the standard error is 3, find the upper endpoint of the 95% CI.",
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
    "stem": "Explain why practitioners often use $z=1.96$ once $df$ exceeds about 100, even though the t-correction is technically always required whenever $\\sigma$ is estimated.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$Var(T_k)=k/(k-2)\\to 1$ rapidly — at $k=100$ it's already about 1.0204, with a critical value near 1.984 versus Normal's 1.96",
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
    "stem": "State $E[F_{d1,d2}]$ for $d2>2$, and explain why it doesn't depend on $d1$.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$E[F_{d1,d2}] = d2/(d2-2)$ for $d2>2$",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "this is because $E[V1/d1]=1$ regardless of $d1$, so by independence $E[F]=E[V1/d1]\\cdot E[d2/V2]=1\\cdot d2/(d2-2)$, leaving only $d2$ in the answer",
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
    "stem": "As both $d1$ and $d2 \\to \\infty$, $F_{d1,d2}$ approaches which value, with vanishing spread?",
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
        "text": "$d1/d2$",
        "correct": false,
        "misconception": {
          "id": "choice-3--misconception",
          "description": "mixes up F with an unnormalized ratio of raw chi-squares; each $V_i/d_i$ individually concentrates near 1, not near $d1/d2$",
          "blameConceptId": "f-distribution"
        }
      },
      {
        "id": "choice-4",
        "text": "$\\infty$",
        "correct": false,
        "misconception": {
          "id": "choice-4--misconception",
          "description": "misses that both the numerator and denominator ratios $V1/d1$, $V2/d2$ individually concentrate near their shared mean of 1",
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
    "stem": "For which values of $d2$ does $Var(F_{d1,d2})$ fail to exist (be infinite/undefined)?",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$Var(F_{d1,d2})$ requires $d2>4$; for $d2\\leq 4$ the variance is infinite or undefined",
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
    "stem": "Since $T^2 \\sim F_{1,k}$, and the two-sided t critical value at $df=20$ is $t_{0.025,20}\\approx 2.086$, find the corresponding F critical value $F_{0.05,1,20}$.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$F_{0.05,1,20} = (t_{0.025,20})^2 \\approx 2.086^2 \\approx 4.35$",
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
    "stem": "Independent sample variance-chi-squares give $V_1\\sim \\chi^2_8$ and $V_2\\sim \\chi^2_{12}$. Form $F=(V_1/8)/(V_2/12)$. State $F$'s distribution.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$F \\sim F_{8,12}$",
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
    "stem": "Find $E[F_{10,30}]$ using $E[F_{d1,d2}]=d2/(d2-2)$.",
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
    "stem": "Explain why $Var(F_{d1,d2})$ requires $d2>4$ to exist, connecting it to why $E[F]$ itself requires only $d2>2$.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "both moments come from $E[1/V2^m]$ for the denominator chi-square",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "this blows up unless the chi-square has enough degrees of freedom to keep its reciprocal moments finite: $E[1/V2]$ needs $d2>2$, while $E[1/V2^2]$ (needed for the second moment/variance) needs the stronger condition $d2>4$",
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
    "stem": "Explain why $F_{d1,d2}$ concentrates around 1 as BOTH $d1$ and $d2$ grow, but not if only one of them grows while the other stays small.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "concentration comes from each of $V1/d1$ and $V2/d2$ individually settling near 1 as its own df grows (relative spread $\\sqrt{2/d}$ shrinking)",
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
    "stem": "Show that as $d2\\to\\infty$ with $d1$ fixed, $F_{d1,d2}$ converges to $\\chi^2_{d1}/d1$ (the denominator becomes deterministic).",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "as $d2\\to\\infty$, $Var(V2/d2)=2/d2\\to 0$, so $V2/d2\\to 1$ by concentration",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "substituting into $F=(V1/d1)/(V2/d2)$ gives $F \\to (V1/d1)/1 = V1/d1 = \\chi^2_{d1}/d1$",
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
    "stem": "If $V_1\\sim \\chi^2_5$ and $V_2\\sim \\chi^2_5$ are independent (equal df), find $E[F_{5,5}]$. Does the equal-df case make $F$ symmetric about 1? Explain.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$E[F_{5,5}] = 5/3 \\approx 1.667$",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "no — $F$ remains right-skewed ($\\text{median}<1<\\text{mean}$) despite equal df, because it's a ratio of two positive skewed quantities; symmetry of the two marginal chi-squares doesn't make their ratio symmetric",
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
    "stem": "Two lines' variance estimates give an F-statistic of $F=0.4$ with $df$ $(10,10)$. Using the reciprocal-F property, find the equivalent 'line 2 vs line 1' statistic and its distribution.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "$1/0.4 = 2.5$, and it is $F_{10,10}$ — same family since $d1=d2=10$ here",
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
          "description": "a chi-square is combined with a fresh independent standard normal in a ratio $Z/\\sqrt{V/k}$ to build t; two independent chi-squares are combined in a ratio $(V1/d1)/(V2/d2)$ to build F",
          "weight": 1
        },
        {
          "id": "element-3",
          "description": "$T^2$ recovers $F_{1,k}$ exactly, tying the two ratio-constructions together",
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
    "stem": "A game pays \\$10 with probability 0.2, \\$0 with probability 0.5, and −\\$5 with probability 0.3. Find the expected payout.",
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
    "stem": "An investor holds asset A (returns \\$1000 w.p. 0.6, −\\$500 w.p. 0.4) and independent asset B (returns \\$200 w.p. 0.5, \\$0 otherwise). Using linearity, find E[total return].",
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
    "stem": "A lottery sells 1000 tickets at \\$5 each; exactly one ticket wins \\$2000, the rest win nothing. Find the buyer's expected net gain (payout minus price), and explain what this number means for a single play even though no ticket can lose exactly that amount.",
    "rubric": {
      "elements": [
        {
          "id": "element-1",
          "description": "E[payout] = 2000·(1/1000) = \\$2; net gain = 2 − 5 = −\\$3",
          "weight": 1,
          "required": true
        },
        {
          "id": "element-2",
          "description": "this is a long-run per-ticket average, not a possible single-play outcome — a ticket either nets +\\$1995 or −\\$5, never −\\$3",
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
