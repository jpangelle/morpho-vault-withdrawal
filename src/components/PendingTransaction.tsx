import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import Link from "next/link";

export const PendingTransaction = ({ trxHash }: { trxHash: string }) => {
  const getExplorerUrl = () => {
    if (process.env.NEXT_PUBLIC_TENDERLY_RPC_URL!.includes("tenderly")) {
      return `https://dashboard.tenderly.co/explorer/vnet/70e111b2-10bd-41a7-90b5-e6d8c29e037f/tx/${trxHash}`;
    } else {
      return `https://etherscan.io/tx/${trxHash}`;
    }
  };

  return (
    <Card w="w-[350px]" h="h-[350px]">
      <div className="flex flex-col h-full gap-[98px] justify-center">
        <div className="flex flex-col text-center">
          <div className="text-sm">Your transaction is pending</div>
          <div className="text-[11px] leading-4 text-morpho-primary/50 font-medium">
            View on{" "}
            <Link target="_blank" href={getExplorerUrl()}>
              <span className="underline cursor-pointer">Etherscan -{">"}</span>
            </Link>
          </div>
        </div>
        <Button isLoading>Transaction finalizing...</Button>
      </div>
    </Card>
  );
};
