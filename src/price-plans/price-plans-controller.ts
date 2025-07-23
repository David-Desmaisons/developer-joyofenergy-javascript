import { pricePlans } from "./price-plans";
import { usageForAllPricePlans } from "../usage/usage";
import type { Request } from "express";
import type { GetReadings, RequestMeterId, UsageCost } from "../types";

export const recommend = (
  getReadings: GetReadings,
  req: RequestMeterId
): UsageCost[] => {
  const meter = req.params.smartMeterId;
  const pricePlanComparisons = usageForAllPricePlans(
    pricePlans,
    getReadings(meter)
  ).sort((a, b) => extractCost(a) - extractCost(b));
  if ("limit" in req.query && typeof req.query.limit === "string") {
    return pricePlanComparisons.slice(0, parseInt(req.query.limit));
  }
  return pricePlanComparisons;
};

const extractCost = (cost: UsageCost): number => {
  const [, value] = Object.entries(cost).find(([key]) => key in pricePlans) || [
    "",
    NaN,
  ];
  return value;
};

export const compare = (getData: GetReadings, req: Request) => {
  const meter = req.params.smartMeterId;
  const pricePlanComparisons = usageForAllPricePlans(
    pricePlans,
    getData(meter)
  );
  return {
    smartMeterId: req.params.smartMeterId,
    pricePlanComparisons,
  };
};
