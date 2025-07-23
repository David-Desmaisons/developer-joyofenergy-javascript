import type { Request } from "express";

export enum meterNames {
  METER0 = "smart-meter-0",
  METER1 = "smart-meter-1",
  METER2 = "smart-meter-2",
  METER3 = "smart-meter-3",
  METER4 = "smart-meter-4",
}

export type Reading = { time: number; reading: number };

export type Data = Partial<Record<meterNames, Reading[]>>;

export type GetReadings = (meterId: meterNames) => Reading[];

export type SetReadings = (
  meterId: meterNames,
  readings: Reading[]
) => Reading[];

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

export type UsageCost = Partial<Record<pricePlanNames, number>>;

export type RequestMeterId = Request<{ smartMeterId: string }>;
