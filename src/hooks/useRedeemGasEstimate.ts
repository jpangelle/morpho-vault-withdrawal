import { metaMorphoAbi } from "@/contract";
import { useMetaMorphoVault } from "@/hooks/useMetaMorphoVault";
import { encodeFunctionData } from "viem";
import { useAccount, useEstimateGas } from "wagmi";

export const useRedeemGasEstimate = (address: string) => {
  const account = useAccount();

  const { metaMorphoVaultData, isMetaMorphoVaultLoaded } =
    useMetaMorphoVault(address);

  const { data: estimatedGasData } = useEstimateGas({
    data: metaMorphoVaultData.userShares
      ? encodeFunctionData({
          abi: metaMorphoAbi,
          functionName: "redeem",
          args: [
            metaMorphoVaultData.userShares,
            account.address!,
            account.address!,
          ],
        })
      : "0x",
    to: address as `0x${string}`,
    query: {
      enabled: isMetaMorphoVaultLoaded && !!account.address,
    },
  });

  return estimatedGasData;
};
