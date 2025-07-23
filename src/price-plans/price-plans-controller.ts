import { pricePlans } from "./price-plans";
import { usageForAllPricePlans } from "../usage/usage";
import { Request } from "express";
import { GetReadings } from "../readings/readings";
import { meters } from "../meters/meters";
import { UsageCost } from "../types/UsageCost";

export const recommend = (
  getReadings: GetReadings,
  req: Request<{ smartMeterId: string }>
): UsageCost[] => {
  const meter = req.params.smartMeterId as meters;
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
  const meter = req.params.smartMeterId as meters;
  const pricePlanComparisons = usageForAllPricePlans(
    pricePlans,
    getData(meter)
  );
  return {
    smartMeterId: req.params.smartMeterId,
    pricePlanComparisons,
  };
};
