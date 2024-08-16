"use client";
import { Card } from "@/components/Card";
import Image from "next/image";
import { useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

export const WalletConnect = () => {
  const { status, connect } = useConnect();
  const isLoading = status === "pending";

  return (
    <Card w="w-[350px]" h="h-[350px]">
      <div className="flex flex-col gap-[50px] h-full justify-center">
        <div className="flex flex-col gap-[10px]">
          <div className="flex justify-center">
            <div className="size-6 flex justify-center">
              <Image
                className="w-auto h-auto p-1"
                src="/morpho.svg"
                alt="morpho-logo"
                width={16}
                height={16}
              />
            </div>
          </div>
          <div className="text-center text-[20px] leading-6 text-morpho-primary/95">
            Welcome to Morpho
          </div>
          <div className="text-center text-sm text-morpho-primary/70">
            To get started, please connect your wallet below
          </div>
        </div>
        <div className="flex justify-center">
          <button onClick={() => connect({ connector: injected() })}>
            {isLoading ? "Loading..." : "Connect wallet"}
          </button>
        </div>
      </div>
    </Card>
  );
};
