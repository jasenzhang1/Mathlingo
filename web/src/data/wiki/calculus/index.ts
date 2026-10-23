import type { WikiArticle } from "../types";

import { appliedOptimizationWiki } from "./applied-optimization";
import { applicationsOfIntegrationWiki } from "./applications-of-integration";
import { chainRuleWiki } from "./chain-rule";
import { continuityWiki } from "./continuity";
import { curveSketchingWiki } from "./curve-sketching";
import { derivativeDefinitionWiki } from "./derivative-definition";
import { derivativeLinearityWiki } from "./derivative-linearity";
import { differentiationRulesWiki } from "./differentiation-rules";
import { evaluatingLimitsWiki } from "./evaluating-limits";
import { exponentialDerivativesWiki } from "./exponential-derivatives";
import { fundamentalTheoremOfCalculusWiki } from "./fundamental-theorem-of-calculus";
import { gradientAndDirectionalDerivativesWiki } from "./gradient-and-directional-derivatives";
import { implicitDifferentiationWiki } from "./implicit-differentiation";
import { improperIntegralsWiki } from "./improper-integrals";
import { infiniteSeriesWiki } from "./infinite-series";
import { integrationByPartsWiki } from "./integration-by-parts";
import { lhopitalsRuleWiki } from "./lhopitals-rule";
import { limitsWiki } from "./limits";
import { limitsAtInfinityWiki } from "./limits-at-infinity";
import { linearApproximationWiki } from "./linear-approximation";
import { logarithmicDerivativesWiki } from "./logarithmic-derivatives";
import { meanValueTheoremWiki } from "./mean-value-theorem";
import { multipleIntegralsWiki } from "./multiple-integrals";
import { multivariableExtremaWiki } from "./multivariable-extrema";
import { partialDerivativesWiki } from "./partial-derivatives";
import { partialFractionsWiki } from "./partial-fractions";
import { powerRuleWiki } from "./power-rule";
import { powerSeriesWiki } from "./power-series";
import { riemannSumsWiki } from "./riemann-sums";
import { sequencesWiki } from "./sequences";
import { taylorSeriesWiki } from "./taylor-series";
import { transcendentalDerivativesWiki } from "./transcendental-derivatives";
import { trigDerivativesWiki } from "./trig-derivatives";
import { uSubstitutionWiki } from "./u-substitution";

/** All 34 concepts of the `calculus` domain, in teaching order. */
export const calculusWikis: WikiArticle[] = [
  limitsWiki,
  evaluatingLimitsWiki,
  limitsAtInfinityWiki,
  continuityWiki,
  derivativeDefinitionWiki,
  derivativeLinearityWiki,
  powerRuleWiki,
  differentiationRulesWiki,
  chainRuleWiki,
  exponentialDerivativesWiki,
  logarithmicDerivativesWiki,
  trigDerivativesWiki,
  transcendentalDerivativesWiki,
  implicitDifferentiationWiki,
  meanValueTheoremWiki,
  curveSketchingWiki,
  appliedOptimizationWiki,
  lhopitalsRuleWiki,
  linearApproximationWiki,
  riemannSumsWiki,
  fundamentalTheoremOfCalculusWiki,
  uSubstitutionWiki,
  integrationByPartsWiki,
  partialFractionsWiki,
  improperIntegralsWiki,
  applicationsOfIntegrationWiki,
  sequencesWiki,
  infiniteSeriesWiki,
  powerSeriesWiki,
  taylorSeriesWiki,
  partialDerivativesWiki,
  gradientAndDirectionalDerivativesWiki,
  multivariableExtremaWiki,
  multipleIntegralsWiki,
];
