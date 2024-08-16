export const formatAmount = (value: string) => {
  const formattedValue = value.replace(/,/g, "");
  const parts = formattedValue.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};
