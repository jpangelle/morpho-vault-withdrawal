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

  const { isMetaMorpho } = useIsMetaMorpho(address);

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

  const [asset, balanceOf, maxRedeem, name, symbol, decimals] =
    metaMorphoVaultData ? metaMorphoVaultData : [];

  const erc20Contract = {
    address: asset?.result,
    abi: erc20Abi,
  };

  const {
    data: assetData,
    isSuccess: isAssetSuccess,
    isFetching: isAssetFetching,
    isError: isAssetError,
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
      {
        ...metaMorphoContract,
        functionName: "convertToAssets",
        args: [balanceOf?.result!],
      },
    ],
    query: {
      enabled: isMetaMorphoVaultSuccess,
      retry: false,
      refetchOnWindowFocus: false,
    },
  });

  const [assetSymbol, assetDecimals, userAssets] = assetData ? assetData : [];

  return {
    metaMorphoVaultData: {
      userShares: balanceOf?.result,
      userMaxRedeem: maxRedeem?.result,
      vaultName: name?.result,
      vaultSymbol: symbol?.result,
      vaultDecimals: decimals?.result,
      assetSymbol: assetSymbol?.result,
      assetDecimals: assetDecimals?.result,
      userAssets: userAssets?.result,
    },
    isMetaMorphoVaultLoaded: isMetaMorphoVaultSuccess && isAssetSuccess,
    isMetaMorphoVaultFetching: isMetaMorphoVaultFetching || isAssetFetching,
    isMetaMorphoVaultError: isMetaMorphoVaultError || isAssetError,
  };
};
