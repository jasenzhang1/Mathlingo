import type { WikiArticle } from "../types";

import { acfWiki } from "./acf";
import { arModelsWiki } from "./ar-models";
import { arimaWiki } from "./arima";
import { armaWiki } from "./arma";
import { cointegrationWiki } from "./cointegration";
import { famaMacbethRegressionWiki } from "./fama-macbeth-regression";
import { grangerCausalityWiki } from "./granger-causality";
import { predictiveRegressionStambaughBiasWiki } from "./predictive-regression-stambaugh-bias";
import { unitRootTestsWiki } from "./unit-root-tests";
import { exponentialSmoothingWiki } from "./exponential-smoothing";
import { garchWiki } from "./garch";
import { maModelsWiki } from "./ma-models";
import { pacfWiki } from "./pacf";
import { stationarityWhiteNoiseWiki } from "./stationarity-white-noise";
import { stochasticProcessesWiki } from "./stochastic-processes";
import { pathSignaturesWiki } from "./path-signatures";
import { signatureMethodsTimeSeriesWiki } from "./signature-methods-time-series";
import { woldDecompositionWiki } from "./wold-decomposition";

/** All 18 concepts of the `time-series` domain, in teaching order. */
export const timeSeriesWikis: WikiArticle[] = [
  stochasticProcessesWiki,
  stationarityWhiteNoiseWiki,
  acfWiki,
  pacfWiki,
  arModelsWiki,
  maModelsWiki,
  woldDecompositionWiki,
  armaWiki,
  arimaWiki,
  exponentialSmoothingWiki,
  garchWiki,
  cointegrationWiki,
  unitRootTestsWiki,
  predictiveRegressionStambaughBiasWiki,
  grangerCausalityWiki,
  famaMacbethRegressionWiki,
  pathSignaturesWiki,
  signatureMethodsTimeSeriesWiki,
];
