import { describe, expect, it } from "vitest";
import { formatNumber } from "../../frontend/src/utils/formatters";

describe("formatNumber", () => {
  it("formats values using Indian digit grouping", () => {
    expect(formatNumber(1234567)).toBe("12,34,567");
  });
});
