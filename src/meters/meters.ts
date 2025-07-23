import { pricePlans } from "../price-plans/price-plans";
import { meterNames, pricePlanNames } from "../types/type";

export const meterPricePlanMap = {
  [meterNames.METER0]: pricePlans[pricePlanNames.PRICEPLAN0],
  [meterNames.METER1]: pricePlans[pricePlanNames.PRICEPLAN1],
  [meterNames.METER2]: pricePlans[pricePlanNames.PRICEPLAN2],
};
