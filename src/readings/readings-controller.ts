import type {
  GetReadings,
  Reading,
  RequestMeterId,
  SetReadings,
} from "../types";
import { Request } from "express";

export const read = (getData: GetReadings, req: RequestMeterId): Reading[] => {
  const meter = req.params.smartMeterId;
  return getData(meter);
};

export const store = (setData: SetReadings, req: Request): Reading[] => {
  const data = req.body;
  return setData(data.smartMeterId, data.electricityReadings);
};
