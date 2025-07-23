import { meters } from "../meters/meters";
import { Data, Reading } from "../types/type";

export const readings = (data: Data) => ({
  getReadings: (meterId: meters): Reading[] => data[meterId] || [],
  setReadings: (meterId: meters, readings: Reading[]) => {
    const currentReadings = data[meterId] || [];
    data[meterId] = [...currentReadings, ...readings];
    return data[meterId];
  },
});
