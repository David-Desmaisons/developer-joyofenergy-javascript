import { pricePlanNames } from "../price-plans/price-plans";

export type PricePlan = {
  supplier: string;
  rate: number;
};

export type PricePlans = Record<pricePlanNames, PricePlan>;
