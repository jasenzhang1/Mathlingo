import type { WikiArticle } from "../types";

export const numpyRandomWiki: WikiArticle = {
  conceptId: "numpy-random",
  summary: "The modern interface is a Generator from np.random.default_rng(seed). Seeding it makes a run reproducible, which is the difference between a result someone else can check and one they cannot. The older np.random.seed / np.random.rand functions share one global generator and are kept only for compatibility.",

  sections: [
    {
      heading: "default_rng and reproducibility",
      blocks: [
        {
          kind: "code",
          source: "import numpy as np\n\nrng = np.random.default_rng(42)     # seeded: same numbers every run\n\nrng.random(3)                       # uniform on [0, 1)\nrng.integers(1, 7, size=10)         # dice — high is EXCLUSIVE\nrng.normal(loc=0, scale=1, size=5)\nrng.choice([\"a\", \"b\", \"c\"], size=2, replace=False)\nrng.shuffle(a)                      # in place; returns None",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "integers excludes the high end; randint did not always",
          text: "rng.integers(1, 7) yields 1 through 6, matching range and every other Python convention. The legacy np.random.randint behaves the same way, but random.randint from the standard library is inclusive on both ends — so the same call gives 1 through 7. Three functions, two conventions, one off-by-one waiting to happen.",
        },
      ],
    },
    {
      heading: "Why a Generator rather than the global functions",
      blocks: [
        {
          kind: "list",
          items: [
            "Independence: two Generators can be seeded separately, so one part of a program cannot perturb another's stream by drawing from it.",
            "Explicitness: the seed lives with the code that uses it, rather than in a global set once at import time and forgotten.",
            "Thread and process safety: a shared global generator is exactly what you do not want across workers, which is how parallel runs end up with duplicate 'random' data.",
            "Better algorithms: default_rng uses PCG64, with better statistical properties than the legacy Mersenne Twister.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "A seed is not randomness you have lost",
          text: "Seeding does not make the numbers less random in any way that matters for simulation — it makes the sequence reproducible. For anything security-related, none of this applies: use the secrets module, which is designed to be unpredictable rather than repeatable.",
        },
      ],
    },
  ],

  references: [
    { source: "NumPy User Guide", locator: "Random sampling — Generator" },
    { source: "NEP 19", locator: "Random number generator policy" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
