"use client";
import { AddressInput } from "@/components/AddressInput";
import { Card } from "@/components/Card";
import { Withdraw } from "@/components/Withdraw";
import { abi, metaMorphoAbi, mmFactoryAddress } from "@/contract";
import { useMetaMorphoVault } from "@/hooks/useMetaMorphoVault";
import { formatAmount } from "@/utilities";
import { debounce } from "lodash";
import { useRef, useState } from "react";
import { encodeFunctionData, formatUnits, isAddress } from "viem";
import {
  useAccount,
  useEstimateGas,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { PendingTransaction } from "./PendingTransaction";
import { StatusCard } from "./StatusCard";

export const Vault = () => {
  const account = useAccount();
  const [address, setAddress] = useState("");
  const [isValidAddress, setIsValidAddress] = useState(false);

  const {
    data: isMetaMorphoData,
    isSuccess: isMetaMorphoSuccess,
    isError: isMetaMorphoError,
  } = useReadContract({
    abi,
    address: mmFactoryAddress,
    functionName: "isMetaMorpho",
    args: [address],
    query: {
      enabled: isValidAddress,
      retry: false,
      refetchOnWindowFocus: false,
    },
  });

  const isMetaMorpho = !!isMetaMorphoData && isMetaMorphoSuccess;

  const {
    data: vaultData,
    isLoaded,
    isFetching,
  } = useMetaMorphoVault(address, isMetaMorpho);

  const { data: estimatedGasData } = useEstimateGas({
    data: vaultData.userShares
      ? encodeFunctionData({
          abi: metaMorphoAbi,
          functionName: "redeem",
          args: [vaultData.userShares, account.address, account.address],
        })
      : "0x",
    to: address as `0x${string}`,
    query: {
      enabled: isLoaded && !!account.address,
    },
  });

  const {
    writeContract,
    isPending: isPendingSignature,
    isSuccess,
    isError,
    reset,
    data: trxHash,
    error,
  } = useWriteContract();

  const debouncedAddress = useRef(
    debounce((value: string) => {
      setAddress(value);
      setIsValidAddress(isAddress(value));
    }, 250)
  );

  const { data: transactionReceiptData } = useWaitForTransactionReceipt({
    hash: trxHash,
    query: {
      enabled: !!trxHash,
    },
  });

  const handleWithdraw = () => {
    writeContract({
      abi: metaMorphoAbi,
      address: address as `0x${string}`,
      functionName: "redeem",
      args: [vaultData.userShares, account.address, account.address],
      gas: estimatedGasData,
    });
  };

  const formattedShares =
    isLoaded &&
    formatAmount(
      Number(
        formatUnits(vaultData.userShares, vaultData.vaultDecimals)
      ).toFixed(2)
    );

  if (isSuccess && !transactionReceiptData?.status) {
    return <PendingTransaction trxHash={trxHash} />;
  }

  if (transactionReceiptData?.status === "success") {
    return (
      <StatusCard
        type="success"
        buttonAction={() => {
          setAddress("");
          reset();
        }}
        message={`You have received ${formattedShares} ${vaultData.assetSymbol}`}
      />
    );
  }

  if (transactionReceiptData?.status === "reverted" || isError) {
    return (
      <StatusCard
        message="Please try again."
        type="error"
        buttonAction={() => {
          reset();
          writeContract({
            abi: metaMorphoAbi,
            address: address as `0x${string}`,
            functionName: "redeem",
            args: [vaultData.userShares, account.address, account.address],
            gas: estimatedGasData,
          });
        }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-[25px]">
      <AddressInput
        isValidAddress={isValidAddress}
        setIsValidAddress={setIsValidAddress}
        address={address}
        setAddress={setAddress}
        isMetaMorpho={isMetaMorpho}
        isMetaMorphoError={isMetaMorphoError}
        debouncedAddress={debouncedAddress.current}
      />
      {isLoaded && !isFetching && (
        <Withdraw
          handleWithdraw={handleWithdraw}
          vaultData={vaultData}
          isPendingSignature={isPendingSignature}
        />
      )}
      {isFetching && !isLoaded && (
        <Card h="h-[321px]" w="w-[350px]">
          <div className="flex flex-col h-full gap-[98px] justify-center">
            <div className="flex flex-col text-center">
              <div className="text-sm">Fetching vault data...</div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
