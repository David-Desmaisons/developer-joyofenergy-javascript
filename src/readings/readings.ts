import { meters } from "../meters/meters";
import { Data } from "../types/Data";
import { Reading } from "../types/Reading";

export type GetReadings = (meterId: meters) => Reading[];
export type SetReadings = (meterId: meters, readings: Reading[]) => Reading[];

export const readings = (data: Data) => ({
  getReadings: (meterId: meters): Reading[] => data[meterId] || [],
  setReadings: (meterId: meters, readings: Reading[]) => {
    const currentReadings = data[meterId] || [];
    data[meterId] = [...currentReadings, ...readings];
    return data[meterId];
  },
});
