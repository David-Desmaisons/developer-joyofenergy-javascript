import { meterNames } from "../types/type";
import { readings } from "./readings";
import { readingsData } from "./readings.data";

describe("readings", () => {
  it("should get readings", () => {
    const { getReadings } = readings(readingsData);

    expect(getReadings(meterNames.METER0).length).toBeGreaterThan(0);
  });

  it("should get readings with meter id", () => {
    const { getReadings } = readings(readingsData);

    expect(getReadings(meterNames.METER1)[0]).toHaveProperty("time");
    expect(getReadings(meterNames.METER1)[0]).toHaveProperty("reading");
  });

  it("should get empty array if can't find meter id", () => {
    const { getReadings } = readings(readingsData);

    expect(getReadings("meter-no" as meterNames)).toHaveLength(0);
  });

  it("should set readings with meter id", () => {
    const { getReadings, setReadings } = readings(readingsData);

    const length = getReadings(meterNames.METER0).length;

    setReadings(meterNames.METER0, [
      { time: 923874692387, reading: 0.26785 },
      { time: 923874692387, reading: 0.26785 },
      { time: 923874692387, reading: 0.111 },
    ]);

    const newLength = getReadings(meterNames.METER0).length;

    expect(length + 3).toEqual(newLength);
  });
});
