import type { WikiArticle } from "../types";

import { acfWiki } from "./acf";
import { arModelsWiki } from "./ar-models";
import { arimaWiki } from "./arima";
import { armaWiki } from "./arma";
import { cointegrationWiki } from "./cointegration";
import { garchWiki } from "./garch";
import { maModelsWiki } from "./ma-models";
import { pacfWiki } from "./pacf";
import { stationarityWhiteNoiseWiki } from "./stationarity-white-noise";
import { stochasticProcessesWiki } from "./stochastic-processes";
import { woldDecompositionWiki } from "./wold-decomposition";

/** All 11 concepts of the `time-series` domain, in teaching order. */
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
  garchWiki,
  cointegrationWiki,
];
