"use client";
import { AddressInput } from "@/components/AddressInput";
import { Card } from "@/components/Card";
import { Withdraw } from "@/components/Withdraw";
import { abi, metaMorphoAbi, mmFactoryAddress } from "@/contract";
import { useMetaMorphoVault } from "@/hooks/useMetaMorphoVault";
import { formatAmount } from "@/utilities";
import { useState } from "react";
import { formatUnits, parseUnits } from "viem";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { PendingTransaction } from "./PendingTransaction";
import { StatusCard } from "./StatusCard";

export const Vault = () => {
  const account = useAccount();
  const [address, setAddress] = useState("");
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [isPendingSignature, setIsPendingSignature] = useState(false);

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

  const { writeContract, isPending, isSuccess, isError, reset } =
    useWriteContract();

  const handleWithdraw = () => {
    setIsPendingSignature(true);
    writeContract(
      {
        abi: metaMorphoAbi,
        address: address as `0x${string}`,
        functionName: "withdraw",
        args: [vaultData.userShares, account.address, account.address],
      },
      {
        onSuccess: () => {
          setIsPendingSignature(false);
        },
      }
    );
  };

  const formattedShares =
    isLoaded &&
    formatAmount(
      Number(
        formatUnits(vaultData.userShares, vaultData.vaultDecimals)
      ).toFixed(2)
    );

  if (isPending) {
    return <PendingTransaction />;
  }

  if (isSuccess) {
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

  if (isError) {
    return (
      <StatusCard
        message="Please try again."
        type="error"
        buttonAction={() => {
          reset();
          writeContract({
            abi: metaMorphoAbi,
            address: address as `0x${string}`,
            functionName: "withdraw",
            args: [vaultData.userShares, account.address, account.address],
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
