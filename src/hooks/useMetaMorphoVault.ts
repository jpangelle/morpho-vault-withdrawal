"use client";
import { metaMorphoAbi } from "@/contract";
import { useIsMetaMorpho } from "@/hooks/useIsMetaMorpho";
import { erc20Abi } from "viem";
import { useAccount, useReadContracts } from "wagmi";

export const useMetaMorphoVault = (address: string) => {
  const account = useAccount();

  const metaMorphoContract = {
    address: address as `0x${string}`,
    abi: metaMorphoAbi,
  };

  const { isMetaMorpho, isMetaMorphoError } = useIsMetaMorpho(address);

  const {
    data: metaMorphoVaultData,
    isSuccess: isMetaMorphoVaultSuccess,
    isFetching: isMetaMorphoVaultFetching,
    isError: isMetaMorphoVaultError,
  } = useReadContracts({
    contracts: [
      {
        ...metaMorphoContract,
        functionName: "asset",
      },
      {
        ...metaMorphoContract,
        functionName: "balanceOf",
        args: [account.address!],
      },
      {
        ...metaMorphoContract,
        functionName: "maxRedeem",
        args: [account.address!],
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
    isError: isAssetError,
  } = useReadContracts({
    contracts: [
      {
        ...metaMorphoContract,
        functionName: "convertToAssets",
        args: [metaMorphoVaultData?.[1].result!],
      },
      {
        ...metaMorphoContract,
        functionName: "convertToAssets",
        args: [metaMorphoVaultData?.[2].result!],
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
    address: metaMorphoVaultData?.[0].result,
    abi: erc20Abi,
  };

  const {
    data: erc20Data,
    isSuccess: isErc20Success,
    isFetching: isErc20Fetching,
    isError: isErc20Error,
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
    metaMorphoVaultData: {
      userShares: metaMorphoVaultData?.[1].result,
      userMaxRedeem: metaMorphoVaultData?.[2].result,
      vaultName: metaMorphoVaultData?.[3].result,
      vaultSymbol: metaMorphoVaultData?.[4].result,
      vaultDecimals: metaMorphoVaultData?.[5].result,
      assetSymbol: erc20Data?.[0].result,
      assetDecimals: erc20Data?.[1].result,
      userAssets: assetData?.[0].result,
      userMaxWithdraw: assetData?.[1].result,
    },
    isMetaMorpho,
    isMetaMorphoError,
    isMetaMorphoVaultLoaded:
      isMetaMorphoVaultSuccess && isErc20Success && isAssetSuccess,
    isMetaMorphoVaultFetching:
      isMetaMorphoVaultFetching || isErc20Fetching || isAssetFetching,
    isMetaMorphoVaultError:
      isMetaMorphoVaultError || isErc20Error || isAssetError,
  };
};
