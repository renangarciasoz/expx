import { ONE_BILLION } from "constants/numbers.constants";

export const formatValue = (value: number, minimumFractionDigits = 2) =>
  Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits,
  }).format(value);

export const formatBillionValue = (
  value: string,
  minimumFractionDigits = 3
) => {
  const floatValue = parseFloat(value);
  return `${formatValue(floatValue / ONE_BILLION, minimumFractionDigits)}b`;
};
