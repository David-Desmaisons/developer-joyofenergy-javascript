import { pricePlanNames } from "../price-plans/price-plans";

export type UsageCost = Partial<Record<pricePlanNames, number>>;
