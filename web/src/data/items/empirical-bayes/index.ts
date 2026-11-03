import type { Item } from "../../../lib/assessment/types";
import { ebNonparametricItems } from "./eb-nonparametric";
import { ebParametricItems } from "./eb-parametric";
import { ebTestingItems } from "./eb-testing";

/** Every item of the Empirical Bayes chapter beyond the original empirical-bayes lesson. */
export const empiricalBayesItems: Item[] = [...ebParametricItems, ...ebNonparametricItems, ...ebTestingItems];
