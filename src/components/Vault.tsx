"use client";
import { AddressInput } from "@/components/AddressInput";
import { Card } from "@/components/Card";
import { Withdraw } from "@/components/Withdraw";
import { metaMorphoAbi } from "@/contract";
import { useMetaMorphoVault } from "@/hooks/useMetaMorphoVault";
import { useRedeem } from "@/hooks/useRedeem";
import { useRedeemGasEstimate } from "@/hooks/useRedeemGasEstimate";
import { formatAmount } from "@/utilities";
import { debounce } from "lodash";
import { useRef, useState } from "react";
import { isAddress } from "viem";
import { useAccount } from "wagmi";
import { PendingTransaction } from "./PendingTransaction";
import { StatusCard } from "./StatusCard";

export const Vault = () => {
  const account = useAccount();
  const [address, setAddress] = useState("");

  const {
    metaMorphoVaultData,
    isMetaMorphoVaultLoaded,
    isMetaMorphoVaultFetching,
    isMetaMorphoVaultError,
  } = useMetaMorphoVault(address);

  const estimatedGasData = useRedeemGasEstimate(address);

  const {
    writeContract,
    isSigningPending,
    isSigningSuccess,
    isSigningError,
    reset,
    trxHash,
    transactionStatus,
  } = useRedeem();

  const handleWithdraw = () => {
    writeContract({
      abi: metaMorphoAbi,
      address: address as `0x${string}`,
      functionName: "redeem",
      args: [
        metaMorphoVaultData.userShares!,
        account.address!,
        account.address!,
      ],
      gas: estimatedGasData,
    });
  };

  const formattedShares =
    isMetaMorphoVaultLoaded &&
    formatAmount(
      metaMorphoVaultData.userShares!,
      metaMorphoVaultData.vaultDecimals!
    );

  const debouncedSetAddress = useRef(
    debounce((value: string) => {
      setAddress(value);
    }, 250)
  );

  if (isSigningSuccess && !transactionStatus) {
    return <PendingTransaction trxHash={trxHash!} />;
  }

  if (transactionStatus === "success") {
    return (
      <StatusCard
        type="success"
        buttonAction={() => {
          reset();
          setAddress("");
        }}
        message={`You have received ${formattedShares} ${metaMorphoVaultData.assetSymbol}`}
      />
    );
  }

  if (
    transactionStatus === "reverted" ||
    isSigningError ||
    isMetaMorphoVaultError
  ) {
    return (
      <StatusCard
        message="Please try again."
        type="error"
        buttonAction={() => {
          reset();
        }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-[25px]">
      <AddressInput
        address={address}
        isValidAddress={isAddress(address)}
        debouncedSetAddress={debouncedSetAddress.current}
      />
      {isMetaMorphoVaultLoaded && !isMetaMorphoVaultFetching && (
        <Withdraw
          handleWithdraw={handleWithdraw}
          metaMorphoVaultData={metaMorphoVaultData}
          isSigningPending={isSigningPending}
        />
      )}
      {!isMetaMorphoVaultLoaded && isMetaMorphoVaultFetching && (
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
