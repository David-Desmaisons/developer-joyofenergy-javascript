import { pricePlans } from "../price-plans/price-plans";
import { pricePlanNames } from "../types";

export const meterNames = {
  METER0: "smart-meter-0",
  METER1: "smart-meter-1",
  METER2: "smart-meter-2",
  METER3: "smart-meter-3",
  METER4: "smart-meter-4",
};

export const meterPricePlanMap = {
  [meterNames.METER0]: pricePlans[pricePlanNames.PRICEPLAN0],
  [meterNames.METER1]: pricePlans[pricePlanNames.PRICEPLAN1],
  [meterNames.METER2]: pricePlans[pricePlanNames.PRICEPLAN2],
};
