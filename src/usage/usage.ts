import { PricePlans, Reading, UsageCost } from "../types/type";

export const average = (readings: Reading[]) => {
  return (
    readings.reduce((prev, next) => prev + next.reading, 0) / readings.length
  );
};

export const timeElapsedInHours = (readings: Reading[]) => {
  readings.sort((a, b) => a.time - b.time);
  const seconds = readings[readings.length - 1].time - readings[0].time;
  const hours = Math.floor(seconds / 3600);
  return hours;
};

export const usage = (readings: Reading[]) => {
  return average(readings) / timeElapsedInHours(readings);
};

export const usageCost = (readings: Reading[], rate: number) => {
  return usage(readings) * rate;
};

export const usageForAllPricePlans = (
  pricePlans: PricePlans,
  readings: Reading[]
): UsageCost[] => {
  return Object.entries(pricePlans).map(([key, value]) => {
    return {
      [key]: usageCost(readings, value.rate),
    };
  });
};
