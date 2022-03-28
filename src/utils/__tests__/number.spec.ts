import { formatBillionValue, formatValue } from "../number";

describe("number utility", () => {
  describe("formatValue", () => {
    it("should format a value", () => {
      expect(formatValue(1234567.89)).toBe("$1,234,567.89");
      expect(formatValue(1234567.89, 3)).toBe("$1,234,567.890");
      expect(formatValue(1234567.89, 4)).toBe("$1,234,567.8900");
    });
  });

  describe("formatBillionValue", () => {
    it("should format a billion value", () => {
      expect(formatBillionValue("12345678901")).toBe("$12.346b");
      expect(formatBillionValue("12345678901", 2)).toBe("$12.35b");
      expect(formatBillionValue("12345678901", 3)).toBe("$12.346b");
      expect(formatBillionValue("12345678901", 4)).toBe("$12.3457b");
    });
  });
});
