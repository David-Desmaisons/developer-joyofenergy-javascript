import { meterNames, meterPricePlanMap } from "../meters/meters";
import { pricePlans } from "../price-plans/price-plans";
import { readings } from "../readings/readings";
import { pricePlanNames } from "../types/type";
import {
  average,
  timeElapsedInHours,
  usage,
  usageCost,
  usageForAllPricePlans,
} from "./usage";

describe("usage", () => {
  it("should average all readings for a meter", () => {
    const { getReadings } = readings({
      [meterNames.METER0]: [
        { time: 923874692387, reading: 0.26785 },
        { time: 923874692387, reading: 0.26785 },
        { time: 923874692387, reading: 0.26785 },
      ],
    });

    const averageMeter0 = average(getReadings(meterNames.METER0));

    expect(averageMeter0).toBe(0.26785);
  });

  it("should get time elapsed in hours for all readings for a meter", () => {
    const { getReadings } = readings({
      [meterNames.METER0]: [
        { time: 1607686135, reading: 0.26785 },
        { time: 1607599724, reading: 0.26785 },
        { time: 1607512024, reading: 0.26785 },
      ],
    });

    const timeElapsedMeter0 = timeElapsedInHours(
      getReadings(meterNames.METER0)
    );

    expect(timeElapsedMeter0).toBe(48);
  });

  it("should get usage for all readings for a meter", () => {
    const { getReadings } = readings({
      [meterNames.METER0]: [
        { time: 1607686125, reading: 0.26785 },
        { time: 1607599724, reading: 0.26785 },
        { time: 1607513324, reading: 0.26785 },
      ],
    });

    const usageMeter0 = usage(getReadings(meterNames.METER0));

    expect(usageMeter0).toBe(0.26785 / 48);
  });

  it("should get usage cost for all readings for a meter", () => {
    const { getReadings } = readings({
      [meterNames.METER2]: [
        { time: 1607686125, reading: 0.26785 },
        { time: 1607599724, reading: 0.26785 },
        { time: 1607513324, reading: 0.26785 },
      ],
    });

    const rate = meterPricePlanMap[meterNames.METER2].rate;
    const usageCostForMeter = usageCost(getReadings(meterNames.METER2), rate);

    expect(usageCostForMeter).toBe((0.26785 / 48) * 1);
  });

  it("should get usage cost for all readings for all price plans", () => {
    const { getReadings } = readings({
      [meterNames.METER2]: [
        { time: 1607686125, reading: 0.26785 },
        { time: 1607599724, reading: 0.26785 },
        { time: 1607513324, reading: 0.26785 },
      ],
    });

    const expected = [
      {
        [pricePlanNames.PRICEPLAN0]: (0.26785 / 48) * 10,
      },
      {
        [pricePlanNames.PRICEPLAN1]: (0.26785 / 48) * 2,
      },
      {
        [pricePlanNames.PRICEPLAN2]: (0.26785 / 48) * 1,
      },
    ];

    const usageForAllPricePlansArray = usageForAllPricePlans(
      pricePlans,
      getReadings(meterNames.METER2)
    );

    expect(usageForAllPricePlansArray).toEqual(expected);
  });
});
