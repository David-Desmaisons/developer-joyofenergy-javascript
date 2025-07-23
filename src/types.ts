import type { Request } from "express";

export type Reading = { time: number; reading: number };

export type Data = Record<string, Reading[]>;

export type GetReadings = (meterId: string) => Reading[];

export type SetReadings = (meterId: string, readings: Reading[]) => Reading[];

export type PricePlan = {
  supplier: string;
  rate: number;
};

export enum pricePlanNames {
  PRICEPLAN0 = "price-plan-0",
  PRICEPLAN1 = "price-plan-1",
  PRICEPLAN2 = "price-plan-2",
}

export type PricePlans = Record<pricePlanNames, PricePlan>;

export type UsageCosts<TKey extends pricePlanNames> = {
  [Property in TKey]: number;
};

export type UsageCost =
  | UsageCosts<pricePlanNames.PRICEPLAN0>
  | UsageCosts<pricePlanNames.PRICEPLAN1>
  | UsageCosts<pricePlanNames.PRICEPLAN2>;

export type RequestMeterId = Request<{ smartMeterId: string }>;
