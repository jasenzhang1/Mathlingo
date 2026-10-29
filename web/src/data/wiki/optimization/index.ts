import type { WikiArticle } from "../types";

import { admmWiki } from "./admm";
import { linearQuadraticRegulatorWiki } from "./linear-quadratic-regulator";
import { augmentedLagrangianMethodWiki } from "./augmented-lagrangian-method";
import { bisectionMethodWiki } from "./bisection-method";
import { conjugateGradientMethodWiki } from "./conjugate-gradient-method";
import { convexityForOptimizationWiki } from "./convexity-for-optimization";
import { coordinateDescentWiki } from "./coordinate-descent";
import { gradientMethodConvergenceWiki } from "./gradient-method-convergence";
import { interiorPointMethodsWiki } from "./interior-point-methods";
import { kktConditionsWiki } from "./kkt-conditions";
import { lagrangeMultipliersWiki } from "./lagrange-multipliers";
import { lagrangianDualityWiki } from "./lagrangian-duality";
import { lineSearchMethodsWiki } from "./line-search-methods";
import { linearProgrammingWiki } from "./linear-programming";
import { momentumAndAccelerationWiki } from "./momentum-and-acceleration";
import { newtonMethodOptimizationWiki } from "./newton-method-optimization";
import { newtonRaphsonMethodWiki } from "./newton-raphson-method";
import { nonlinearLeastSquaresWiki } from "./nonlinear-least-squares";
import { optimizationProblemsAndOptimalityWiki } from "./optimization-problems-and-optimality";
import { proximalGradientMethodWiki } from "./proximal-gradient-method";
import { quasiNewtonMethodsWiki } from "./quasi-newton-methods";
import { secantMethodWiki } from "./secant-method";
import { subgradientMethodWiki } from "./subgradient-method";

/** All 22 concepts of the `optimization` domain, in teaching order. */
export const optimizationWikis: WikiArticle[] = [
  optimizationProblemsAndOptimalityWiki,
  convexityForOptimizationWiki,
  bisectionMethodWiki,
  newtonRaphsonMethodWiki,
  secantMethodWiki,
  newtonMethodOptimizationWiki,
  lineSearchMethodsWiki,
  gradientMethodConvergenceWiki,
  momentumAndAccelerationWiki,
  conjugateGradientMethodWiki,
  coordinateDescentWiki,
  subgradientMethodWiki,
  proximalGradientMethodWiki,
  quasiNewtonMethodsWiki,
  nonlinearLeastSquaresWiki,
  lagrangeMultipliersWiki,
  kktConditionsWiki,
  lagrangianDualityWiki,
  linearProgrammingWiki,
  interiorPointMethodsWiki,
  augmentedLagrangianMethodWiki,
  admmWiki,
  linearQuadraticRegulatorWiki,
];
