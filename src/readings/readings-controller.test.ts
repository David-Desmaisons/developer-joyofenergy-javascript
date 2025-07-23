import { read, store } from "./readings-controller";
import { readingsData } from "./readings.data";
import { readings } from "./readings";
import type { Request } from "express";
import { meterNames, type RequestMeterId } from "../types/type";

describe("readings", () => {
  it("should get readings with meter id from params", () => {
    const { getReadings } = readings(readingsData);
    const readingsForMeter = read(getReadings, {
      params: {
        smartMeterId: meterNames.METER0,
      },
    } as RequestMeterId);

    expect(readingsForMeter).toEqual(readingsData[meterNames.METER0]);
  });

  it("should store readings with meter id and readings from body", () => {
    const { setReadings, getReadings } = readings(readingsData);

    const originalLength = getReadings(meterNames.METER0).length;

    const fixture = {
      smartMeterId: meterNames.METER0,
      electricityReadings: [
        {
          time: 981438113,
          reading: 0.0503,
        },
        {
          time: 982087047,
          reading: 0.0213,
        },
      ],
    };

    store(setReadings, {
      body: fixture,
    } as Request);

    const newLength = getReadings(meterNames.METER0).length;

    expect(originalLength + 2).toEqual(newLength);
  });
});
