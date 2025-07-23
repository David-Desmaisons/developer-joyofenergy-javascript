import { meters } from "../meters/meters";
import { Data } from "../types/Data";
import { Reading } from "../types/Reading";

export const readings = (data: Data) => ({
  getReadings: (meterId: meters) => data[meterId] || [],
  setReadings: (meterId: meters, readings: Reading[]) => {
    const currentReadings = data[meterId] || [];
    data[meterId] = [...currentReadings, ...readings];
    return data[meterId];
  },
});
