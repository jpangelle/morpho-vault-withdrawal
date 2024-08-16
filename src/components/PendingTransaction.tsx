import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

export const PendingTransaction = () => (
  <Card w="w-[350px]" h="h-[350px]">
    <div className="flex flex-col h-full gap-[98px] justify-center">
      <div className="flex flex-col text-center">
        <div className="text-sm">Your transaction is pending</div>
      </div>
      <Button isLoading>Transaction finalizing...</Button>
    </div>
  </Card>
);
