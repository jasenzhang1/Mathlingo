import { pythonIteratorsWiki } from "./python-iterators";
import { pythonGeneratorsWiki } from "./python-generators";
import { pythonItertoolsWiki } from "./python-itertools";
import { pythonClassesWiki } from "./python-classes";
import { pythonMethodsWiki } from "./python-methods";
import { pythonDunderWiki } from "./python-dunder";
import { pythonInheritanceWiki } from "./python-inheritance";
import { pythonStringsWiki } from "./python-strings";
import { pythonStringMethodsWiki } from "./python-string-methods";
import { pythonFstringsWiki } from "./python-fstrings";
import { pythonRegexWiki } from "./python-regex";
import { pythonExceptionsWiki } from "./python-exceptions";
import { pythonRaisingWiki } from "./python-raising";
import { pandasIoWiki } from "./pandas-io";
import { pandasSelectionWiki } from "./pandas-selection";
import { pandasFilteringWiki } from "./pandas-filtering";
import { pandasMissingWiki } from "./pandas-missing";
import { pandasDtypesWiki } from "./pandas-dtypes";
import { pandasSortingWiki } from "./pandas-sorting";
import { pandasApplyWiki } from "./pandas-apply";
import { pandasStringsWiki } from "./pandas-strings";
import { pandasDatetimeWiki } from "./pandas-datetime";
import { pandasPivotWiki } from "./pandas-pivot";
import { pandasConcatWiki } from "./pandas-concat";
import { pandasWindowWiki } from "./pandas-window";
import { pythonArgumentsWiki } from "./python-arguments";
import { pythonArgsKwargsWiki } from "./python-args-kwargs";
import { pythonScopeWiki } from "./python-scope";
import { pythonLambdaWiki } from "./python-lambda";
import { pythonHigherOrderWiki } from "./python-higher-order";
import { pythonSortingKeyWiki } from "./python-sorting-key";
import { numpyArraysWiki } from "./numpy-arrays";
import { numpyArrayCreationWiki } from "./numpy-array-creation";
import { numpyIndexingWiki } from "./numpy-indexing";
import { numpyBroadcastingWiki } from "./numpy-broadcasting";
import { numpyMatricesWiki } from "./numpy-matrices";
import { pandasDataframesWiki } from "./pandas-dataframes";
import { pandasGroupbyWiki } from "./pandas-groupby";
import { pythonComprehensionsWiki } from "./python-comprehensions";
import { pythonDictionariesWiki } from "./python-dictionaries";
import { pythonSetsWiki } from "./python-sets";
import { pythonListsIntroWiki } from "./python-lists-intro";
import { pythonIndexingWiki } from "./python-indexing";
import { pythonSlicingWiki } from "./python-slicing";
import { pythonListOperationsWiki } from "./python-list-operations";
import { pythonLoopsWiki } from "./python-loops";
import { pythonVariablesTypesWiki } from "./python-variables-types";
import { pythonTypeConversionWiki } from "./python-type-conversion";
import { pythonOperatorsWiki } from "./python-operators";
import { pythonConditionalsWiki } from "./python-conditionals";
import { pythonWhileLoopsWiki } from "./python-while-loops";
import { pythonForLoopsWiki } from "./python-for-loops";
import { pythonFunctionsWiki } from "./python-functions";
import { pythonTuplesWiki } from "./python-tuples";
import type { WikiArticle } from "../types";

/**
 * The `python` domain, in prerequisite order: variables and types, control
 * flow, the containers (split into intro/indexing/slicing/operations, plus
 * tuples/dictionaries/sets), the loop forms that walk them, comprehensions as
 * those loops written as expressions, and then the same work again at array
 * and table scale.
 *
 * The `python-lists` and `python-dicts` articles this file used to export
 * were split into finer ones — see `items/python-containers-split.ts` and
 * `items/python-control-flow.ts` for how the item banks were split/added
 * alongside them.
 */
export const pythonWikiArticles: WikiArticle[] = [
  pythonVariablesTypesWiki,
  pythonTypeConversionWiki,
  pythonOperatorsWiki,
  pythonConditionalsWiki,
  pythonWhileLoopsWiki,
  pythonForLoopsWiki,
  pythonFunctionsWiki,
  pythonListsIntroWiki,
  pythonIndexingWiki,
  pythonSlicingWiki,
  pythonListOperationsWiki,
  pythonTuplesWiki,
  pythonDictionariesWiki,
  pythonSetsWiki,
  pythonLoopsWiki,
  pythonComprehensionsWiki,
  numpyArraysWiki,
  numpyArrayCreationWiki,
  numpyIndexingWiki,
  numpyBroadcastingWiki,
  numpyMatricesWiki,
  pandasDataframesWiki,
  pandasGroupbyWiki,
  pythonArgumentsWiki,
  pythonArgsKwargsWiki,
  pythonScopeWiki,
  pythonLambdaWiki,
  pythonHigherOrderWiki,
  pythonSortingKeyWiki,
  pandasIoWiki,
  pandasSelectionWiki,
  pandasFilteringWiki,
  pandasMissingWiki,
  pandasDtypesWiki,
  pandasSortingWiki,
  pandasApplyWiki,
  pandasStringsWiki,
  pandasDatetimeWiki,
  pandasPivotWiki,
  pandasConcatWiki,
  pandasWindowWiki,
  pythonStringsWiki,
  pythonStringMethodsWiki,
  pythonFstringsWiki,
  pythonRegexWiki,
  pythonExceptionsWiki,
  pythonRaisingWiki,
  pythonIteratorsWiki,
  pythonGeneratorsWiki,
  pythonItertoolsWiki,
  pythonClassesWiki,
  pythonMethodsWiki,
  pythonDunderWiki,
  pythonInheritanceWiki,
];
