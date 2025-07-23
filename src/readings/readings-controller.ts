import type { GetReadings, RequestMeterId, SetReadings } from "../types/type";
import { Request } from "express";

export const read = (getData: GetReadings, req: RequestMeterId) => {
  const meter = req.params.smartMeterId;
  return getData(meter);
};

export const store = (setData: SetReadings, req: Request) => {
  const data = req.body;
  return setData(data.smartMeterId, data.electricityReadings);
};
