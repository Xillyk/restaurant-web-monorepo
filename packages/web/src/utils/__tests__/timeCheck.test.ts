import { expect, test, vi } from "vitest";

import { checkIsInDiscountPeriod, checkIsRestaurantOpen } from "../timeCheck";

// checkIsRestaurantOpen
test("check is restaurant open case1", () => {
  const testCase = {
    open: "11:00",
    close: "13:00",
  };

  const mockDate = new Date(2025, 1, 12, 12, 0); // 12:00
  vi.setSystemTime(mockDate);

  expect(checkIsRestaurantOpen(testCase)).toBe(true);
});

test("check is restaurant open case2", () => {
  const testCase = {
    open: "00:00",
    close: "24:00",
  };

  const mockDate = new Date(2025, 1, 12, 12, 0); // 12:00
  vi.setSystemTime(mockDate);

  expect(checkIsRestaurantOpen(testCase)).toBe(true);
});

test("check is restaurant close case1", () => {
  const testCase = {
    open: "08:00",
    close: "10:00",
  };

  const mockDate = new Date(2025, 1, 12, 12, 0); // 12:00
  vi.setSystemTime(mockDate);

  expect(checkIsRestaurantOpen(testCase)).toBe(false);
});

test("check is restaurant close case2", () => {
  const testCase = {
    open: "08:00",
    close: "10:00",
  };

  const mockDate = new Date(2025, 1, 12, 10, 1); // 10:01
  vi.setSystemTime(mockDate);

  expect(checkIsRestaurantOpen(testCase)).toBe(false);
});

// checkIsInDiscountPeriod;
test("check is in discount period case1", () => {
  const testCase = {
    begin: "08:00",
    end: "10:00",
  };

  const mockDate = new Date(2025, 1, 12, 9, 0); // 09:00
  vi.setSystemTime(mockDate);

  expect(checkIsInDiscountPeriod(testCase)).toBe(true);
});

test("check is in discount period case2", () => {
  const testCase = {
    begin: "00:00",
    end: "24:00",
  };

  const mockDate = new Date(2025, 1, 12, 9, 0); // 09:00
  vi.setSystemTime(mockDate);

  expect(checkIsInDiscountPeriod(testCase)).toBe(true);
});

test("check is in discount period case3", () => {
  const testCase = {
    begin: "10:00",
    end: "18:00",
  };

  const mockDate = new Date(2025, 1, 12, 18, 1); // 18:01
  vi.setSystemTime(mockDate);

  expect(checkIsInDiscountPeriod(testCase)).toBe(false);
});

test("check is in discount period case4", () => {
  const testCase = {
    begin: "10:00",
    end: "18:00",
  };

  const mockDate = new Date(2025, 1, 12, 9, 30); // 09:30
  vi.setSystemTime(mockDate);

  expect(checkIsInDiscountPeriod(testCase)).toBe(false);
});
