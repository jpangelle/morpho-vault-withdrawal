"use client";
import { WalletConnect } from "@/components/WalletConnect";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected, chainId } = useAccount();

  if (!isConnected) {
    return <WalletConnect />;
  }

  if (chainId !== 1) {
    return <div>Wrong network</div>;
  }

  return <div>Withdraw</div>;
}
