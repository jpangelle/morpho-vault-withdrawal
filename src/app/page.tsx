"use client";
import { AddressInput } from "@/components/AddressInput";
import { WalletConnect } from "@/components/WalletConnect";
import { WrongNetwork } from "@/components/WrongNetwork";
import { useState } from "react";
import { useAccount } from "wagmi";

export default function Home() {
  const [isValidAddress, setIsValidAddress] = useState(false);

  const { isConnected, chainId } = useAccount();

  if (!isConnected) {
    return <WalletConnect />;
  }

  if (chainId !== 1) {
    return <WrongNetwork />;
  }

  return (
    <AddressInput
      setIsValidAddress={setIsValidAddress}
      isValidAddress={isValidAddress}
    />
  );
}
