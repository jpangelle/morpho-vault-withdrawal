"use client";
import { AddressInput } from "@/components/AddressInput";
import { Withdraw } from "@/components/Withdraw";
import { abi, mmFactoryAddress } from "@/contract";
import { useMetaMorphoVault } from "@/hooks/useMetaMorphoVault";
import { useState } from "react";
import { useReadContract } from "wagmi";

export const Vault = () => {
  const [address, setAddress] = useState("");
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [isPendingSignature, setIsPendingSignature] = useState(false);

  const { data: isMetaMorphoData, status: isMetaMorphoStatus } =
    useReadContract({
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

  const isMetaMorpho = !!isMetaMorphoData && isMetaMorphoStatus === "success";

  const {
    data: vaultData,
    isLoaded,
    isFetching,
  } = useMetaMorphoVault(address, isMetaMorpho);

  const handleWithdraw = async () => {
    setIsPendingSignature(true);
    vaultData.withdraw();
  };

  return (
    <div className="flex flex-col gap-[25px]">
      <AddressInput
        isValidAddress={isValidAddress}
        setIsValidAddress={setIsValidAddress}
        address={address}
        setAddress={setAddress}
        isMetaMorpho={isMetaMorpho}
      />
      {isLoaded && (
        <Withdraw
          handleWithdraw={handleWithdraw}
          vaultData={vaultData}
          isPendingSignature={isPendingSignature}
        />
      )}
      {isFetching && <div>Fetching...</div>}
    </div>
  );
};
