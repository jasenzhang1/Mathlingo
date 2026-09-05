import { numpyArraysWiki } from "./numpy-arrays";
import { numpyBroadcastingWiki } from "./numpy-broadcasting";
import { pandasDataframesWiki } from "./pandas-dataframes";
import { pandasGroupbyWiki } from "./pandas-groupby";
import { pythonComprehensionsWiki } from "./python-comprehensions";
import { pythonDictsWiki } from "./python-dicts";
import { pythonListsWiki } from "./python-lists";
import { pythonLoopsWiki } from "./python-loops";
import type { WikiArticle } from "../types";

/**
 * The `python` domain, in prerequisite order: the two containers, the loop
 * forms that walk them, comprehensions as those loops written as expressions,
 * and then the same work again at array and table scale.
 *
 * These eight are written as one argument, the way the statistics cluster is.
 * The argument is that a loop is a cost you can often delete: `python-loops`
 * establishes what iterating an element at a time actually does, `numpy-arrays`
 * shows the loop moving into compiled code, `numpy-broadcasting` shows it
 * disappearing into a shape rule, and `pandas-groupby`'s transform is the same
 * move once more at table scale — which is why that article closes by naming
 * keepdims explicitly. The pitfalls are chosen on the same principle: every
 * warning callout here is a failure that produces a plausible wrong answer
 * rather than an exception, because those are the ones drilling has to catch.
 */
export const pythonWikiArticles: WikiArticle[] = [
  pythonListsWiki,
  pythonDictsWiki,
  pythonLoopsWiki,
  pythonComprehensionsWiki,
  numpyArraysWiki,
  numpyBroadcastingWiki,
  pandasDataframesWiki,
  pandasGroupbyWiki,
];
