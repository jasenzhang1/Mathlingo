import { simpleRandomWalkWiki } from "./simple-random-walk";
import { brownianMotionWiki } from "./brownian-motion";
import { filtrationsAndAdaptedProcessesWiki } from "./filtrations-and-adapted-processes";
import { martingalesContinuousTimeWiki } from "./martingales-continuous-time";
import { quadraticVariationWiki } from "./quadratic-variation";
import { itoIntegralWiki } from "./ito-integral";
import { itoDoeblinFormulaWiki } from "./ito-doeblin-formula";
import { stochasticDifferentialEquationsWiki } from "./stochastic-differential-equations";
import { geometricBrownianMotionWiki } from "./geometric-brownian-motion";
import { multidimensionalItoCalculusWiki } from "./multidimensional-ito-calculus";
import { ornsteinUhlenbeckProcessWiki } from "./ornstein-uhlenbeck-process";
import { blackScholesMertonEquationWiki } from "./black-scholes-merton-equation";
import { girsanovTheoremWiki } from "./girsanov-theorem";
import { riskNeutralPricingWiki } from "./risk-neutral-pricing";
import { martingaleRepresentationTheoremWiki } from "./martingale-representation-theorem";
import { feynmanKacTheoremWiki } from "./feynman-kac-theorem";
import type { WikiArticle } from "../types";

/**
 * The `stochastic-processes` and `stochastic-calculus` domains' wiki articles,
 * in prerequisite order (see the "Stochastic Processes" and "Stochastic
 * Calculus" sections of `concepts.ts`, which follow the spine of Shreve's
 * Stochastic Calculus for Finance II): the discrete random walk, its
 * continuous-time limit, the machinery to differentiate and integrate against
 * it (filtrations, martingales, quadratic variation, the Itô integral and
 * lemma), the general SDE it makes solvable, the two named SDEs solved in
 * closed form (geometric Brownian motion, Ornstein-Uhlenbeck), the
 * multivariate case, and then the finance spine — Black-Scholes-Merton,
 * Girsanov's change of measure, risk-neutral pricing, the martingale
 * representation theorem, and the Feynman-Kac bridge back to PDEs.
 */
export const stochasticWikiArticles: WikiArticle[] = [
  simpleRandomWalkWiki,
  brownianMotionWiki,
  filtrationsAndAdaptedProcessesWiki,
  martingalesContinuousTimeWiki,
  quadraticVariationWiki,
  itoIntegralWiki,
  itoDoeblinFormulaWiki,
  stochasticDifferentialEquationsWiki,
  geometricBrownianMotionWiki,
  multidimensionalItoCalculusWiki,
  ornsteinUhlenbeckProcessWiki,
  blackScholesMertonEquationWiki,
  girsanovTheoremWiki,
  riskNeutralPricingWiki,
  martingaleRepresentationTheoremWiki,
  feynmanKacTheoremWiki,
];
