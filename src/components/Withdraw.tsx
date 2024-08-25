import { MetaMorpho } from "@/types";
import { formatAmount } from "@/utilities";
import { formatUnits } from "viem";
import { Button } from "./Button";
import { Card } from "./Card";
import { VaultSkeleton } from "./VaultSkeleton";

type Props = {
  handleWithdraw: () => void;
  metaMorphoVaultData: MetaMorpho;
  isSigningPending: boolean;
  isMetaMorphoVaultFetching: boolean;
  isMetaMorphoVaultLoaded: boolean;
  address: string;
};

export const Withdraw = ({
  handleWithdraw,
  metaMorphoVaultData,
  isSigningPending,
  isMetaMorphoVaultFetching,
  isMetaMorphoVaultLoaded,
  address,
}: Props) => {
  const {
    userAssets,
    userShares,
    vaultDecimals,
    assetDecimals,
    userMaxRedeem,
    vaultName,
    vaultSymbol,
    assetSymbol,
  } = metaMorphoVaultData;

  const formattedShares =
    userShares && vaultDecimals ? formatAmount(userShares, vaultDecimals) : 0;
  const formattedAssets =
    userAssets && assetDecimals ? formatAmount(userAssets, assetDecimals) : 0;
  const formattedMaxRedeem =
    (userMaxRedeem &&
      vaultDecimals &&
      Number(formatUnits(userMaxRedeem, vaultDecimals))) ||
    0;

  if (isMetaMorphoVaultFetching) {
    return (
      <Card h="h-[321px]" w="w-[350px]">
        <VaultSkeleton />
      </Card>
    );
  }

  if (isMetaMorphoVaultLoaded && address) {
    return (
      <Card h="h-[321px]" w="w-[350px]">
        <div className="flex flex-col h-full justify-center">
          <div className="text-[20px] leading-6 mb-[25px]">{vaultName}</div>
          <div className="flex flex-col gap-[10px] mb-[50px]">
            <div className="flex flex-col gap-1">
              <div className="text-[11px] leading-4 text-morpho-primary/50 font-medium">
                User shares
              </div>
              <div className="text-[14px] leading-5">
                {formattedAssets} {vaultSymbol}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-[11px] leading-4 text-morpho-primary/50 font-medium">
                User assets
              </div>
              <div className="text-[14px] leading-5">
                ${formattedShares} {assetSymbol}
              </div>
            </div>
          </div>
          <Button
            onClick={handleWithdraw}
            isLoading={isSigningPending}
            isDisabled={formattedMaxRedeem === 0}
          >
            {isSigningPending ? "Sign your transaction..." : "Withdraw userMax"}
          </Button>
        </div>
      </Card>
    );
  }

  return null;
};
