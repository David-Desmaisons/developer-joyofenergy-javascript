import { meters } from "../meters/meters";
import { Request } from "express";
import { pricePlanNames } from "../price-plans/price-plans";

export type Reading = { time: number; reading: number };

export type Data = Partial<Record<meters, Reading[]>>;

export type GetReadings = (meterId: meters) => Reading[];

export type SetReadings = (meterId: meters, readings: Reading[]) => Reading[];

export type PricePlan = {
  supplier: string;
  rate: number;
};

export type PricePlans = Record<pricePlanNames, PricePlan>;

export type UsageCost = Partial<Record<pricePlanNames, number>>;

export type RequestMeterId = Request<{ smartMeterId: string }>;
