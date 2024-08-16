"use client";
import { WalletWidget } from "@/components/WalletWidget";
import Image from "next/image";
import { useAccount } from "wagmi";

export const Header = () => {
  const account = useAccount();

  return (
    <header className="h-[50px] w-full flex justify-between px-10 py-3 border-b-[0.5px] border-morpho-primary/15">
      <div className="flex gap-8">
        <div className="flex justify-center size-6">
          <Image
            className="w-auto h-auto p-1"
            src="/morpho.svg"
            alt="morpho-logo"
            width={16}
            height={16}
          />
        </div>
        <div className="text-[13px] leading-4 content-center text-morpho-primary/95">
          Morpho Test
        </div>
      </div>
      {account?.address && <WalletWidget walletAddress={account.address} />}
    </header>
  );
};
