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
];
