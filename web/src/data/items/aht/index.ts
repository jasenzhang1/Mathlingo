import type { Item } from "../../../lib/assessment/types";
import { ahtControlItems } from "./aht-control";
import { ahtEmpiricsItems } from "./aht-empirics";
import { ahtExecutionLoItems } from "./aht-execution-lo";
import { ahtExecutionMoItems } from "./aht-execution-mo";
import { ahtMarketMakingItems } from "./aht-market-making";
import { ahtMarketsItems } from "./aht-markets";
import { ahtMicrostructureItems } from "./aht-microstructure";
import { ahtStatArbImbalanceItems } from "./aht-statarb-imbalance";

/** Every item of the Algorithmic & High-Frequency Trading course, in chapter order. */
export const ahtItems: Item[] = [
  ...ahtMarketsItems,
  ...ahtMicrostructureItems,
  ...ahtEmpiricsItems,
  ...ahtControlItems,
  ...ahtExecutionMoItems,
  ...ahtExecutionLoItems,
  ...ahtMarketMakingItems,
  ...ahtStatArbImbalanceItems,
];
