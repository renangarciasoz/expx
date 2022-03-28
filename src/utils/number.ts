import { ONE_BILLION } from "constants/numbers.constants";

export const formatValue = (value: number, minimumFractionDigits = 2) =>
  Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits,
  }).format(value);

export const formatBillionValue = (
  value: string | number,
  minimumFractionDigits = 3
) => {
  return `${formatValue(Number(value) / ONE_BILLION, minimumFractionDigits)}b`;
};
