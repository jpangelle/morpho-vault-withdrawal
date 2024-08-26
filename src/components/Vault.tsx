"use client";
import { AddressInput } from "@/components/AddressInput";
import { Error } from "@/components/Error";
import { PendingTransaction } from "@/components/PendingTransaction";
import { Success } from "@/components/Success";
import { Withdraw } from "@/components/Withdraw";
import { metaMorphoAbi } from "@/contract";
import { useMetaMorphoVault } from "@/hooks/useMetaMorphoVault";
import { useRedeem } from "@/hooks/useRedeem";
import { useRedeemGasEstimate } from "@/hooks/useRedeemGasEstimate";
import { formatAmount } from "@/utilities";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useAccount } from "wagmi";

export const Vault = () => {
  const account = useAccount();
  const [address, setAddress] = useState("");
  const [debouncedAddress] = useDebounce(address, 250);

  const {
    metaMorphoVaultData,
    isMetaMorphoVaultLoaded,
    isMetaMorphoVaultFetching,
    isMetaMorphoVaultError,
  } = useMetaMorphoVault(debouncedAddress);

  const estimatedGasData = useRedeemGasEstimate(debouncedAddress);

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

  if (isSigningSuccess && !transactionStatus) {
    return <PendingTransaction trxHash={trxHash!} />;
  }

  if (transactionStatus === "success") {
    return (
      <Success
        reset={() => {
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
    return <Error reset={reset} />;
  }

  return (
    <div className="flex flex-col gap-[25px]">
      <AddressInput address={address} setAddress={setAddress} />
      <Withdraw
        address={address}
        handleWithdraw={handleWithdraw}
        metaMorphoVaultData={metaMorphoVaultData}
        isSigningPending={isSigningPending}
        isMetaMorphoVaultFetching={isMetaMorphoVaultFetching}
        isMetaMorphoVaultLoaded={isMetaMorphoVaultLoaded}
      />
    </div>
  );
};
