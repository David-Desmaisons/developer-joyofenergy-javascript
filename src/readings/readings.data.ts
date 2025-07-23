import { meterNames } from "../meters/meters";
import { type Data, type Reading } from "../types";

const generateSingle = (): Reading[] => {
  const startTime = 1607686125; // Friday, 11 December 2020 11:28:45 GMT+00:00
  const hour = 3600;
  const readingsLength = Math.ceil(Math.random() * 20);

  return [...new Array(readingsLength)].map((_, index) => ({
    time: startTime - index * hour,
    reading: Math.random() * 2,
  }));
};

const generateAllMeters = () => {
  const readings: Data = {};
  for (const key of Object.values(meterNames)) {
    readings[key] = generateSingle();
  }
  return readings;
};

export const readingsData = generateAllMeters();
