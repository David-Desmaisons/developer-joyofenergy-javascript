import { Data } from "../types/Data";
import { Reading } from "../types/Reading";

export const readings = (data: Data) => ({
  getReadings: (meterId: string) => data[meterId] || [],
  setReadings: (meterId: string, readings: Reading[]) => {
    const currentReadings = data[meterId];
    data[meterId] = [...currentReadings, ...readings];
    return data[meterId];
  },
});
