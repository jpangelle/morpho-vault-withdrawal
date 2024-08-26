import { formatAmount } from "@/utilities";
import { parseUnits } from "viem";

it("should format amount", () => {
  const amount = parseUnits("1000", 18);
  const formattedAmount = formatAmount(amount, 18);
  expect(formattedAmount).toBe("1,000.00");
});
