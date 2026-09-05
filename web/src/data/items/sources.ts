import type { SourceRef } from "../../lib/assessment/types";

/**
 * Source registry for the regression bank.
 *
 * Tiers follow `assessment.md` §1.1 and are enforced by `checkLicence`: an
 * `open` source must carry a licence so it can be attributed, and a
 * `restricted` one must carry a rewrite approval, because only the *task
 * skeleton* of a copyrighted exercise may be reused — the stem text, the
 * numbers and the setting in this bank are ours.
 */

export const ISLR: SourceRef = {
  id: "islr",
  tier: "open",
  title: "An Introduction to Statistical Learning (James, Witten, Hastie & Tibshirani), free online edition",
  url: "https://www.statlearning.com/",
  license: "free-to-use with attribution; verify before redistribution",
};

export const ESL: SourceRef = {
  id: "esl",
  tier: "open",
  title: "The Elements of Statistical Learning (Hastie, Tibshirani & Friedman), free online edition",
  url: "https://hastie.su.domains/ElemStatLearn/",
  license: "free-to-use with attribution; verify before redistribution",
};

export const NIST_HANDBOOK: SourceRef = {
  id: "nist-sematech",
  tier: "open",
  title: "NIST/SEMATECH e-Handbook of Statistical Methods",
  url: "https://www.itl.nist.gov/div898/handbook/",
  license: "public domain (US Government work)",
};

export const OCW_18_650: SourceRef = {
  id: "mit-ocw-18.650",
  tier: "open",
  title: "MIT 18.650 Statistics for Applications (OpenCourseWare)",
  url: "https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/",
  license: "CC-BY-NC-SA-4.0",
};

export const OCW_18_06: SourceRef = {
  id: "mit-ocw-18.06",
  tier: "open",
  title: "MIT 18.06 Linear Algebra (Strang, OpenCourseWare)",
  url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
  license: "CC-BY-NC-SA-4.0",
};

export const CASELLA_BERGER_REG: SourceRef = {
  id: "casella-berger-ch11",
  tier: "restricted",
  title: "Statistical Inference (Casella & Berger, 2nd ed.)",
  locator: "Ch. 11, Analysis of Variance and Regression",
  rewriteApprovedBy: "pending-review",
};

export const BISHOP_PRML: SourceRef = {
  id: "bishop-prml",
  tier: "restricted",
  title: "Pattern Recognition and Machine Learning (Bishop)",
  locator: "Ch. 3–4, Linear Models for Regression and Classification",
  rewriteApprovedBy: "pending-review",
};

export const VERBEKE_MOLENBERGHS: SourceRef = {
  id: "verbeke-molenberghs",
  tier: "restricted",
  title: "Linear Mixed Models for Longitudinal Data (Verbeke & Molenberghs)",
  locator: "Ch. 3–5, The Linear Mixed Model",
  rewriteApprovedBy: "pending-review",
};

export const SINGER_WILLETT: SourceRef = {
  id: "singer-willett",
  tier: "restricted",
  title: "Applied Longitudinal Data Analysis (Singer & Willett)",
  locator: "Ch. 14–15, Fitting Cox Regression Models",
  rewriteApprovedBy: "pending-review",
};

/**
 * Items with no external seed at all — authored from the concept and its
 * prerequisites. `assessment.md` §1.1 notes these carry the highest
 * verification burden, so every numeric key on a `generated` item in this bank
 * was checked by script before being written down.
 */
export const AUTHORED: SourceRef = {
  id: "mathlingo-authored",
  tier: "generated",
  title: "Authored for Mathlingo from the concept and its prerequisites",
};
