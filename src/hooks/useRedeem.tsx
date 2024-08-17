import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

export const useRedeem = () => {
  const {
    writeContract,
    isPending: isSigningPending,
    isSuccess: isSigningSuccess,
    isError: isSigningError,
    reset,
    data: trxHash,
  } = useWriteContract();

  const { data: transactionReceiptData } = useWaitForTransactionReceipt({
    hash: trxHash,
    query: {
      enabled: !!trxHash,
    },
  });

  return {
    writeContract,
    isSigningPending,
    isSigningSuccess,
    isSigningError,
    reset,
    trxHash,
    transactionStatus: transactionReceiptData?.status,
  };
};
