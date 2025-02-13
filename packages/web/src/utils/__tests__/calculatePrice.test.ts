import { expect, test, vi } from "vitest";

import { getMenuPrice } from "../calculatePrice";

test("get menu price case1", () => {
  const testCase = {
    name: "Menu A",
    id: "123",
    thumbnailImage: "",
    fullPrice: 120,
    discountedPercent: 0,
    discountedTimePeriod: {
      begin: "10:00",
      end: "11:00",
    },
    sold: 120,
    totalInStock: 300,
  };

  expect(getMenuPrice(testCase)).toBe(120);
});
test("get menu price case2", () => {
  const testCase = {
    name: "Menu B",
    id: "123",
    thumbnailImage: "",
    fullPrice: 20,
    discountedPercent: 0,
    discountedTimePeriod: {
      begin: "10:00",
      end: "11:00",
    },
    sold: 120,
    totalInStock: 300,
  };

  expect(getMenuPrice(testCase)).toBe(20);
});
test("get menu price case3 (all day discount period)", () => {
  const testCase = {
    name: "Menu C",
    id: "123",
    thumbnailImage: "",
    fullPrice: 120,
    discountedPercent: 10,
    discountedTimePeriod: {
      begin: "00:00",
      end: "24:00",
    },
    sold: 120,
    totalInStock: 300,
  };
  expect(getMenuPrice(testCase)).toBe(108);
});
test("get menu price case4 (all day discount period)", () => {
  const testCase = {
    name: "Menu D",
    id: "123",
    thumbnailImage: "",
    fullPrice: 100,
    discountedPercent: 50,
    discountedTimePeriod: {
      begin: "00:00",
      end: "24:00",
    },
    sold: 120,
    totalInStock: 300,
  };
  expect(getMenuPrice(testCase)).toBe(50);
});

test("get menu price case5 (all day discount period)", () => {
  const testCase = {
    name: "Menu D",
    id: "123",
    thumbnailImage: "",
    fullPrice: 0,
    discountedPercent: 50,
    discountedTimePeriod: {
      begin: "00:00",
      end: "24:00",
    },
    sold: 120,
    totalInStock: 300,
  };
  expect(getMenuPrice(testCase)).toBe(0);
});

test("get menu price case6 (discount 10:00 - 12:00)", () => {
  const testCase = {
    name: "Menu D",
    id: "123",
    thumbnailImage: "",
    fullPrice: 100,
    discountedPercent: 50,
    discountedTimePeriod: {
      begin: "10:00",
      end: "12:00",
    },
    sold: 120,
    totalInStock: 300,
  };

  const mockDate = new Date(2025, 1, 12, 11, 0); // 11:00
  vi.setSystemTime(mockDate);
  expect(getMenuPrice(testCase)).toBe(50);
});

test("get menu price case7 (out of discount time 10:00 - 12:00)", () => {
  const testCase = {
    name: "Menu D",
    id: "123",
    thumbnailImage: "",
    fullPrice: 100,
    discountedPercent: 50,
    discountedTimePeriod: {
      begin: "10:00",
      end: "12:00",
    },
    sold: 120,
    totalInStock: 300,
  };

  const mockDate = new Date(2025, 1, 12, 13, 0); // 13:00
  vi.setSystemTime(mockDate);
  expect(getMenuPrice(testCase)).toBe(100);
});
