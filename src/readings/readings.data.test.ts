import { meters } from "../meters/meters";
import { readingsData } from "./readings.data";

describe("generate data", () => {
  it("should generate readings for one meter", () => {
    expect(readingsData[meters.METER0]?.length).toBeGreaterThan(0);
  });
});
