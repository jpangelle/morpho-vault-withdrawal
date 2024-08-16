"use client";
import { WalletConnect } from "@/components/WalletConnect";
import { Withdraw } from "@/components/Withdraw";
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

  return <Withdraw />;
}
