import type { WikiArticle } from "../types";

export const unitRootTestsWiki: WikiArticle = {
  conceptId: "unit-root-tests",

  summary:
    "Whether a series has a unit root decides almost everything downstream: whether to difference it, whether a " +
    "regression on it is spurious, and which asymptotics apply. The augmented Dickey–Fuller (ADF) test takes a unit " +
    "root as its null; KPSS takes stationarity as its null. Both are low-powered against persistent stationary " +
    "alternatives, so they are best read together, and neither can use normal critical values.",

  sections: [
    {
      heading: "The Dickey–Fuller regression",
      blocks: [
        {
          kind: "formula",
          latex: "\\Delta Y_t = \\alpha + \\rho Y_{t-1} + \\sum_{j=1}^{k}\\gamma_j\\Delta Y_{t-j} + u_t, \\qquad H_0: \\rho = 0 \\;(\\text{unit root}) \\quad\\text{vs.}\\quad H_1: \\rho < 0",
          caption: "$\\rho = \\phi - 1$ in the AR form $Y_t = \\alpha + \\phi Y_{t-1} + \\dots$; the lagged differences soak up serial correlation (the “augmented” part).",
        },
        {
          kind: "prose",
          text:
            "Under the null the regressor $Y_{t-1}$ is a random walk, so $\\sum Y_{t-1}^2$ grows like $T^2$, $\\hat{\\rho}$ is $T$-consistent, and the " +
            "$t$-ratio $\\tau = \\hat{\\rho}/\\text{se}(\\hat{\\rho})$ converges to the Dickey–Fuller distribution $\\frac{\\int_0^1 W\\,dW}{\\left(\\int_0^1 W^2\\,dr\\right)^{1/2}}$ " +
            "(with a demeaned $W$ when there is an intercept). It is skewed left: the $5\\%$ critical value is about $-2.86$ with a constant and " +
            "$-3.41$ with a constant and trend, against $-1.645$ for a normal one-sided test.",
        },
        {
          kind: "definitions",
          items: [
            { term: "Lag length $k$", description: "Too few lags leaves autocorrelated errors and size distortion; too many costs power. Choose by AIC/BIC or a general-to-specific $t$-test sequence." },
            { term: "Deterministic terms", description: "Include a constant if the series has a nonzero mean, and a trend if it drifts; the critical values change with each choice." },
          ],
        },
      ],
    },

    {
      heading: "A worked example",
      blocks: [
        {
          kind: "example",
          title: "Normal versus Dickey–Fuller critical values",
          problem:
            "An ADF regression with a constant on $T = 200$ observations gives $\\tau = -2.5$. Do you reject a unit root at $5\\%$?",
          steps: [
            "With a normal critical value ($-1.645$) you would reject.",
            "The Dickey–Fuller critical value with a constant is about $-2.86$.",
            "$-2.5 > -2.86$, so you do not reject.",
          ],
          answer:
            "No: the evidence is not strong enough to rule out a unit root. Using normal tables would have declared the series stationary.",
        },
      ],
    },

    {
      heading: "KPSS and reading the two together",
      blocks: [
        {
          kind: "prose",
          text:
            "KPSS writes $Y_t = \\xi_t + \\varepsilon_t$ with a random-walk component $\\xi_t$ and tests whether its innovation variance is zero. " +
            "With residuals $e_t$ from regressing $Y_t$ on a constant (or trend) and partial sums $S_t = \\sum_{s \\le t}e_s$, " +
            "$\\text{KPSS} = \\frac{1}{T^2\\hat{\\lambda}^2}\\sum_t S_t^2$, where $\\hat{\\lambda}^2$ is a Newey–West long-run variance. " +
            "Large values reject stationarity ($5\\%$ critical value about $0.463$ in the level case).",
        },
        {
          kind: "table",
          headers: ["ADF (null: unit root)", "KPSS (null: stationary)", "Reading"],
          rows: [
            ["Reject", "Do not reject", "Stationary, I(0)"],
            ["Do not reject", "Reject", "Unit root, I(1)"],
            ["Reject", "Reject", "Conflict: long memory, a structural break, or misspecified deterministic terms"],
            ["Do not reject", "Do not reject", "Data not informative; persistent but undetermined"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Breaks look like unit roots",
          text:
            "A stationary series with a level shift often fails to reject ADF (Perron 1989). Test with break-robust versions (Zivot–Andrews) when a break is plausible.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why it matters for regression",
          text:
            "Regressing one independent random walk on another gives significant $t$-statistics with probability tending to $1$ (spurious regression). Test the residuals of a levels regression for a unit root: if they are stationary the series are cointegrated, and the regression is meaningful. Those residual tests need Engle–Granger critical values, since the residuals were fitted.",
        },
      ],
    },
  ],

  references: [
    { source: "Hamilton, Time Series Analysis", locator: "Ch. 17, Univariate Processes with Unit Roots" },
    { source: "Shumway & Stoffer, Time Series Analysis and Its Applications (4th ed.)", locator: "§5.2, Unit Root Testing" },
    { source: "Kwiatkowski, Phillips, Schmidt & Shin, “Testing the Null Hypothesis of Stationarity”, Journal of Econometrics 1992", locator: "The KPSS test" },
  ],
};
