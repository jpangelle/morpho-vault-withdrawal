import { mmFactoryabi, mmFactoryAddress } from "@/contract";
import { isAddress } from "viem";
import { useReadContract } from "wagmi";

export const useIsMetaMorpho = (address: string) => {
  const {
    data: isMetaMorphoData,
    isSuccess: isMetaMorphoSuccess,
    isError: isMetaMorphoError,
    refetch: refetchIsMetaMorpho,
  } = useReadContract({
    abi: mmFactoryabi,
    address: mmFactoryAddress,
    functionName: "isMetaMorpho",
    args: [address as `0x${string}`],
    query: {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: isAddress(address),
      gcTime: 0,
      staleTime: Infinity,
    },
  });

  return {
    isMetaMorpho: !!isMetaMorphoData,
    isMetaMorphoSuccess,
    isMetaMorphoError,
    refetchIsMetaMorpho,
  };
};
