"use client";
import { metaMorphoAbi } from "@/contract";
import { erc20Abi } from "viem";
import { useAccount, useReadContracts } from "wagmi";

export const useMetaMorphoVault = (address: string, isMetaMorpho: boolean) => {
  const account = useAccount();

  const metaMorphoContract = {
    address: address as `0x${string}`,
    abi: metaMorphoAbi,
  };

  const {
    data: metaMorphoVaultData,
    isSuccess: isMetaMorphoVaultSuccess,
    isFetching: isMetaMorphoVaultFetching,
  } = useReadContracts({
    contracts: [
      {
        ...metaMorphoContract,
        functionName: "asset",
      },
      {
        ...metaMorphoContract,
        functionName: "balanceOf",
        args: [account.address],
      },
      {
        ...metaMorphoContract,
        functionName: "maxRedeem",
        args: [account.address],
      },
      {
        ...metaMorphoContract,
        functionName: "name",
      },
      {
        ...metaMorphoContract,
        functionName: "symbol",
      },
      {
        ...metaMorphoContract,
        functionName: "decimals",
      },
    ],
    query: {
      enabled: isMetaMorpho,
      retry: false,
      refetchOnWindowFocus: false,
    },
  });

  const {
    data: assetData,
    isSuccess: isAssetSuccess,
    isFetching: isAssetFetching,
  } = useReadContracts({
    contracts: [
      {
        ...metaMorphoContract,
        functionName: "convertToAssets",
        args: [metaMorphoVaultData?.[1].result],
      },

      {
        ...metaMorphoContract,
        functionName: "convertToAssets",
        args: [metaMorphoVaultData?.[2].result],
      },
    ],

    query: {
      enabled:
        metaMorphoVaultData?.[1].status === "success" &&
        metaMorphoVaultData?.[2].status === "success",
      retry: false,
      refetchOnWindowFocus: false,
    },
  });

  const erc20Contract = {
    address: metaMorphoVaultData?.[0].result as `0x${string}`,
    abi: erc20Abi,
  };

  const {
    data: erc20Data,
    isSuccess: isErc20Success,
    isFetching: isErc20Fetching,
  } = useReadContracts({
    contracts: [
      {
        ...erc20Contract,
        functionName: "symbol",
      },
      {
        ...erc20Contract,
        functionName: "decimals",
      },
    ],
    query: {
      enabled: metaMorphoVaultData?.[0].status === "success",
      retry: false,
      refetchOnWindowFocus: false,
    },
  });

  return {
    data: {
      userShares: metaMorphoVaultData?.[1].result as bigint,
      userMaxRedeem: metaMorphoVaultData?.[2].result as bigint,
      vaultName: metaMorphoVaultData?.[3].result as string,
      vaultSymbol: metaMorphoVaultData?.[4].result as string,
      vaultDecimals: metaMorphoVaultData?.[5].result as number,
      assetSymbol: erc20Data?.[0].result as string,
      assetDecimals: erc20Data?.[1].result as number,
      userAssets: assetData?.[0].result as bigint,
      userMaxWithdraw: assetData?.[1].result as bigint,
    },
    isLoaded: isMetaMorphoVaultSuccess && isErc20Success && isAssetSuccess,
    isFetching: isMetaMorphoVaultFetching || isErc20Fetching || isAssetFetching,
  };
};
