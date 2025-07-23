import type { Data, Reading } from "../types";

export const readings = (data: Data) => ({
  getReadings: (meterId: string): Reading[] => data[meterId] || [],
  setReadings: (meterId: string, readings: Reading[]) => {
    const currentReadings = data[meterId] || [];
    data[meterId] = [...currentReadings, ...readings];
    return data[meterId];
  },
});
