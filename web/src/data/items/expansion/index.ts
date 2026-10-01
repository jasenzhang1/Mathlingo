import type { Item } from "../../../lib/assessment/types";
import { discreteLogicProofItems } from "./discrete-logic-proof";
import { discreteSetsFunctionsItems } from "./discrete-sets-functions";
import { discreteCombinatoricsItems } from "./discrete-combinatorics";
import { discreteGraphsNumbersItems } from "./discrete-graphs-numbers";
import { probabilityFoundationsItems } from "./probability-foundations";
import { probabilityRvDiscreteItems } from "./probability-rv-discrete";
import { probabilityContinuousJointItems } from "./probability-continuous-joint";
import { probabilityMgfLikelihoodItems } from "./probability-mgf-likelihood";
import { probabilityConvergenceEstimationItems } from "./probability-convergence-estimation";
import { laVectorsItems } from "./la-vectors";
import { laMatricesItems } from "./la-matrices";
import { laSpacesSubspacesItems } from "./la-spaces-subspaces";
import { laRankEigenItems } from "./la-rank-eigen";
import { laSpectralSvdItems } from "./la-spectral-svd";
import { multivariateItems } from "./multivariate";
import { infoTheoryAItems } from "./info-theory-a";
import { infoTheoryBItems } from "./info-theory-b";
import { statsFoundationsMachineryItems } from "./stats-foundations-machinery";
import { statsOptimalMultipleQqItems } from "./stats-optimal-multiple-qq";
import { statsTestsComparisonsItems } from "./stats-tests-comparisons";
import { regFoundationsAItems } from "./reg-foundations-a";
import { regFoundationsBItems } from "./reg-foundations-b";
import { regFitMeasuresItems } from "./reg-fit-measures";
import { regEstimationAItems } from "./reg-estimation-a";
import { regEstimationBItems } from "./reg-estimation-b";
import { regInferenceAItems } from "./reg-inference-a";
import { regInferenceBItems } from "./reg-inference-b";
import { regStraightLinesItems } from "./reg-straight-lines";
import { regCurvesItems } from "./reg-curves";
import { regAnovaAItems } from "./reg-anova-a";
import { regAnovaBItems } from "./reg-anova-b";
import { regDeparturesAItems } from "./reg-departures-a";
import { regDiagnosticsAItems } from "./reg-diagnostics-a";
import { regDiagnosticsBItems } from "./reg-diagnostics-b";
import { regRobustItems } from "./reg-robust";
import { regComputationItems } from "./reg-computation";
import { regSelectionAItems } from "./reg-selection-a";
import { regSelectionBItems } from "./reg-selection-b";
import { regGlmAItems } from "./reg-glm-a";
import { regGlmBItems } from "./reg-glm-b";
import { mlFoundationsItems } from "./ml-foundations";
import { mlEvaluationItems } from "./ml-evaluation";
import { mlMetricsItems } from "./ml-metrics";
import { mlOptimizationAItems } from "./ml-optimization-a";
import { mlSgdItems } from "./ml-sgd";
import { mlClassifiersAItems } from "./ml-classifiers-a";
import { mlClassifiersBItems } from "./ml-classifiers-b";
import { mlKernelsTreesItems } from "./ml-kernels-trees";
import { mlUnsupervisedAItems } from "./ml-unsupervised-a";
import { mlUnsupervisedBItems } from "./ml-unsupervised-b";
import { dlFoundationsItems } from "./dl-foundations";
import { dlCnnItems } from "./dl-cnn";
import { dlSsmGnnItems } from "./dl-ssm-gnn";
import { dlGenerativeItems } from "./dl-generative";
import { gmStructureItems } from "./gm-structure";
import { gmCausalItems } from "./gm-causal";
import { gmLatentItems } from "./gm-latent";
import { gmNumericalAItems } from "./gm-numerical-a";
import { gmNumericalBItems } from "./gm-numerical-b";
import { gmSamplingAItems } from "./gm-sampling-a";
import { gmSamplingBItems } from "./gm-sampling-b";
import { gmVariationalItems } from "./gm-variational";
import { spClassicItems } from "./sp-classic";
import { spPointItems } from "./sp-point";
import { scItoItems } from "./sc-ito";
import { scPricingItems } from "./sc-pricing";
import { fiBasicsItems } from "./fi-basics";
import { fiDerivativesItems } from "./fi-derivatives";
import { tsFoundationsItems } from "./ts-foundations";
import { tsModelsItems } from "./ts-models";
import { tsAdvancedItems } from "./ts-advanced";
import { pyNumpyItems } from "./py-numpy";
import { pyPandasAItems } from "./py-pandas-a";
import { pyPandasBItems } from "./py-pandas-b";
import { pyTextItems } from "./py-text";
import { pyLangItems } from "./py-lang";
import { pyOopItems } from "./py-oop";
import { tsFortyAItems } from "./ts-forty-a";
import { tsFortyBItems } from "./ts-forty-b";
import { itFortyItems } from "./it-forty";
import { mvFortyItems } from "./mv-forty";
import { spFortyAItems } from "./sp-forty-a";
import { spFortyBItems } from "./sp-forty-b";
import { scFortyAItems } from "./sc-forty-a";
import { scFortyBItems } from "./sc-forty-b";
import { fiFortyAItems } from "./fi-forty-a";
import { fiFortyBItems } from "./fi-forty-b";
import { dmFortyAItems } from "./dm-forty-a";
import { dmFortyBItems } from "./dm-forty-b";
import { dmFortyCItems } from "./dm-forty-c";
import { pyFortyCoreItems } from "./py-forty-core";
import { pyFortyNpItems } from "./py-forty-np";
import { pyFortyPdItems } from "./py-forty-pd";
import { pyFortyLangItems } from "./py-forty-lang";
import { dlFortyAItems } from "./dl-forty-a";
import { dlFortyBItems } from "./dl-forty-b";
import { dlFortyCItems } from "./dl-forty-c";
import { dlFortyDItems } from "./dl-forty-d";
import { gmFortyAItems } from "./gm-forty-a";
import { gmFortyBItems } from "./gm-forty-b";
import { gmFortyCItems } from "./gm-forty-c";
import { gmFortyDItems } from "./gm-forty-d";
import { stFortyAItems } from "./st-forty-a";
import { bayesFoundationsItems } from "./bayes-foundations";
import { bayesModelsItems } from "./bayes-models";
import { fdaFoundationsItems } from "./fda-foundations";
import { fdaOperatorsItems } from "./fda-operators";
import { bayesInversionItems } from "./bayes-inversion";
import { copulaItems } from "./copulas";
import { fdaBayesCopulaTopupItems } from "./fda-bayes-copula-topups";
import { rgToFortyAItems } from "./rg-to-forty-a";
import { rgToFortyBItems } from "./rg-to-forty-b";
import { rgToFortyCItems } from "./rg-to-forty-c";
import { rgToFortyDItems } from "./rg-to-forty-d";
import { mlFocusedAItems } from "./ml-focused-a";
import { mlFocusedBItems } from "./ml-focused-b";
import { spChainsItems } from "./sp-chains";
import { spStoppingItems } from "./sp-stopping";
import { spRenewalItems } from "./sp-renewal";
import { stFortyBItems } from "./st-forty-b";
import { stFortyCItems } from "./st-forty-c";
import { stFortyDItems } from "./st-forty-d";
import { prFortyAItems } from "./pr-forty-a";
import { prFortyBItems } from "./pr-forty-b";
import { prFortyCItems } from "./pr-forty-c";
import { prFortyDItems } from "./pr-forty-d";
import { prFortyEItems } from "./pr-forty-e";
import { laFortyAItems } from "./la-forty-a";
import { laFortyBItems } from "./la-forty-b";
import { laFortyCItems } from "./la-forty-c";
import { laFortyDItems } from "./la-forty-d";
import { laFortyEItems } from "./la-forty-e";
import { rgFortyAItems } from "./rg-forty-a";
import { rgFortyBItems } from "./rg-forty-b";
import { rgFortyCItems } from "./rg-forty-c";
import { rgFortyDItems } from "./rg-forty-d";
import { rgFortyEItems } from "./rg-forty-e";

/** Every expansion module, in curriculum order. */
export const expansionItems: Item[] = [
  ...discreteLogicProofItems,
  ...discreteSetsFunctionsItems,
  ...discreteCombinatoricsItems,
  ...discreteGraphsNumbersItems,
  ...probabilityFoundationsItems,
  ...probabilityRvDiscreteItems,
  ...probabilityContinuousJointItems,
  ...probabilityMgfLikelihoodItems,
  ...probabilityConvergenceEstimationItems,
  ...laVectorsItems,
  ...laMatricesItems,
  ...laSpacesSubspacesItems,
  ...laRankEigenItems,
  ...laSpectralSvdItems,
  ...multivariateItems,
  ...infoTheoryAItems,
  ...infoTheoryBItems,
  ...statsFoundationsMachineryItems,
  ...statsOptimalMultipleQqItems,
  ...statsTestsComparisonsItems,
  ...regFoundationsAItems,
  ...regFoundationsBItems,
  ...regFitMeasuresItems,
  ...regEstimationAItems,
  ...regEstimationBItems,
  ...regInferenceAItems,
  ...regInferenceBItems,
  ...regStraightLinesItems,
  ...regCurvesItems,
  ...regAnovaAItems,
  ...regAnovaBItems,
  ...regDeparturesAItems,
  ...regDiagnosticsAItems,
  ...regDiagnosticsBItems,
  ...regRobustItems,
  ...regComputationItems,
  ...regSelectionAItems,
  ...regSelectionBItems,
  ...regGlmAItems,
  ...regGlmBItems,
  ...mlFoundationsItems,
  ...mlEvaluationItems,
  ...mlMetricsItems,
  ...mlOptimizationAItems,
  ...mlSgdItems,
  ...mlClassifiersAItems,
  ...mlClassifiersBItems,
  ...mlKernelsTreesItems,
  ...mlUnsupervisedAItems,
  ...mlUnsupervisedBItems,
  ...dlFoundationsItems,
  ...dlCnnItems,
  ...dlSsmGnnItems,
  ...dlGenerativeItems,
  ...gmStructureItems,
  ...gmCausalItems,
  ...gmLatentItems,
  ...gmNumericalAItems,
  ...gmNumericalBItems,
  ...gmSamplingAItems,
  ...gmSamplingBItems,
  ...gmVariationalItems,
  ...spClassicItems,
  ...spPointItems,
  ...scItoItems,
  ...scPricingItems,
  ...fiBasicsItems,
  ...fiDerivativesItems,
  ...tsFoundationsItems,
  ...tsModelsItems,
  ...tsAdvancedItems,
  ...pyNumpyItems,
  ...pyPandasAItems,
  ...pyPandasBItems,
  ...pyTextItems,
  ...pyLangItems,
  ...pyOopItems,
  ...tsFortyAItems,
  ...tsFortyBItems,
  ...itFortyItems,
  ...mvFortyItems,
  ...spFortyAItems,
  ...spFortyBItems,
  ...scFortyAItems,
  ...scFortyBItems,
  ...fiFortyAItems,
  ...fiFortyBItems,
  ...dmFortyAItems,
  ...dmFortyBItems,
  ...dmFortyCItems,
  ...pyFortyCoreItems,
  ...pyFortyNpItems,
  ...pyFortyPdItems,
  ...pyFortyLangItems,
  ...dlFortyAItems,
  ...dlFortyBItems,
  ...dlFortyCItems,
  ...dlFortyDItems,
  ...gmFortyAItems,
  ...gmFortyBItems,
  ...gmFortyCItems,
  ...gmFortyDItems,
  ...stFortyAItems,
  ...bayesFoundationsItems,
  ...bayesModelsItems,
  ...fdaFoundationsItems,
  ...fdaOperatorsItems,
  ...bayesInversionItems,
  ...copulaItems,
  ...fdaBayesCopulaTopupItems,
  ...rgToFortyAItems,
  ...rgToFortyBItems,
  ...rgToFortyCItems,
  ...rgToFortyDItems,
  ...mlFocusedAItems,
  ...mlFocusedBItems,
  ...spChainsItems,
  ...spStoppingItems,
  ...spRenewalItems,
  ...stFortyBItems,
  ...stFortyCItems,
  ...stFortyDItems,
  ...prFortyAItems,
  ...prFortyBItems,
  ...prFortyCItems,
  ...prFortyDItems,
  ...prFortyEItems,
  ...laFortyAItems,
  ...laFortyBItems,
  ...laFortyCItems,
  ...laFortyDItems,
  ...laFortyEItems,
  ...rgFortyAItems,
  ...rgFortyBItems,
  ...rgFortyCItems,
  ...rgFortyDItems,
  ...rgFortyEItems,
];
