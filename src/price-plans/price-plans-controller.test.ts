import { readings } from "../readings/readings";
import { compare, recommend } from "./price-plans-controller";
import type { Request } from "express";
import { pricePlanNames, type UsageCost, type RequestMeterId, CompareResult } from "../types";
import { meterNames } from "../meters/meters";

describe("price plans", () => {
  it("should compare usage cost for all price plans", () => {
    const { getReadings } = readings({
      [meterNames.METER0]: [
        { time: 1607686125, reading: 0.26785 },
        { time: 1607599724, reading: 0.26785 },
        { time: 1607513324, reading: 0.26785 },
      ],
    });

    const expected: CompareResult = {
      pricePlanComparisons: [
        {
          [pricePlanNames.PRICEPLAN0]: (0.26785 / 48) * 10,
        },
        {
          [pricePlanNames.PRICEPLAN1]: (0.26785 / 48) * 2,
        },
        {
          [pricePlanNames.PRICEPLAN2]: (0.26785 / 48) * 1,
        },
      ],
      smartMeterId: meterNames.METER0,
    };

    const recommendation = compare(getReadings, {
      params: {
        smartMeterId: meterNames.METER0,
      },
      query: {},
    } as RequestMeterId);

    expect(recommendation).toEqual(expected);
  });

  it("should recommend usage cost for all price plans by ordering from cheapest to expensive", () => {
    const { getReadings } = readings({
      [meterNames.METER0]: [
        { time: 1607686125, reading: 0.26785 },
        { time: 1607599724, reading: 0.26785 },
        { time: 1607513324, reading: 0.26785 },
      ],
    });

    const expected = [
      {
        [pricePlanNames.PRICEPLAN2]: (0.26785 / 48) * 1,
      },
      {
        [pricePlanNames.PRICEPLAN1]: (0.26785 / 48) * 2,
      },
      {
        [pricePlanNames.PRICEPLAN0]: (0.26785 / 48) * 10,
      },
    ];

    const recommendation = recommend(getReadings, {
      params: {
        smartMeterId: meterNames.METER0,
      },
      query: {},
    } as Request<{ smartMeterId: string }>);

    expect(recommendation).toEqual(expected);
  });

  it("should limit recommendation", () => {
    const { getReadings } = readings({
      [meterNames.METER0]: [
        { time: 1607686125, reading: 0.26785 },
        { time: 1607599724, reading: 0.26785 },
        { time: 1607513324, reading: 0.26785 },
      ],
    });

    const expected: UsageCost[] = [
      {
        [pricePlanNames.PRICEPLAN2]: (0.26785 / 48) * 1,
      },
      {
        [pricePlanNames.PRICEPLAN1]: (0.26785 / 48) * 2,
      },
    ];

    const recommendation = recommend(getReadings, {
      params: {
        smartMeterId: meterNames.METER0,
      },
      query: {
        limit: "2",
      },
    } as unknown as RequestMeterId);

    expect(recommendation).toEqual(expected);
  });
});
