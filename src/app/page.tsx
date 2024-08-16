"use client";
import { Vault } from "@/components/Vault";
import { WalletConnect } from "@/components/WalletConnect";
import { WrongNetwork } from "@/components/WrongNetwork";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected, chainId } = useAccount();

  if (!isConnected) {
    return <WalletConnect />;
  }

  if (chainId !== 1) {
    return <WrongNetwork />;
  }

  return <Vault />;
}
