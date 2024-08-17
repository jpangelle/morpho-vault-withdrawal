import { formatUnits } from "viem";

export const formatAmount = (value: bigint, decimals: number) => {
  const fixedValue = Number(formatUnits(value, decimals)).toFixed(2);
  const formattedValue = fixedValue.replace(/,/g, "");
  const parts = formattedValue.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};
