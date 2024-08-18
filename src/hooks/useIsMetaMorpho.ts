import { mmFactoryabi, mmFactoryAddress } from "@/contract";
import { isAddress } from "viem";
import { useReadContract } from "wagmi";

export const useIsMetaMorpho = (address: string) => {
  const {
    data: isMetaMorphoData,
    isSuccess: isMetaMorphoSuccess,
    isError: isMetaMorphoError,
  } = useReadContract({
    abi: mmFactoryabi,
    address: mmFactoryAddress,
    functionName: "isMetaMorpho",
    args: [address as `0x${string}`],
    query: {
      enabled: isAddress(address),
      retry: false,
      refetchOnWindowFocus: false,
    },
  });
  return {
    isMetaMorpho: !!isMetaMorphoData,
    isMetaMorphoSuccess,
    isMetaMorphoError,
  };
};
