import { type Data, meterNames, type Reading } from "../types/type";

export const readings = (data: Data) => ({
  getReadings: (meterId: meterNames): Reading[] => data[meterId] || [],
  setReadings: (meterId: meterNames, readings: Reading[]) => {
    const currentReadings = data[meterId] || [];
    data[meterId] = [...currentReadings, ...readings];
    return data[meterId];
  },
});
