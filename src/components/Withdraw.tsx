"use client";
import { AddressInput } from "@/components/AddressInput";
import { abi, mmFactoryAddress } from "@/contract";
import { useState } from "react";
import { useReadContract } from "wagmi";
import { Button } from "./Button";
import { Card } from "./Card";

export const Withdraw = () => {
  const [address, setAddress] = useState("");
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [isPendingSignature, setIsPendingSignature] = useState(false);

  const { data, status } = useReadContract({
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

  const isMetaMorpho = !!data && status === "success";

  const handleWithdraw = async () => {
    setIsPendingSignature(true);
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
      {isMetaMorpho && (
        <Card h="h-[321px]" w="w-[350px]">
          <div className="flex flex-col h-full justify-center">
            <div className="text-[20px] leading-6 mb-[25px]">Flagship ETH</div>
            <div className="flex flex-col gap-[10px] mb-[50px]">
              <div className="flex flex-col gap-1">
                <div className="text-[11px] leading-4 text-morpho-primary/50 font-medium">
                  User shares
                </div>
                <div className="text-[14px] leading-5">x.xx bbETH</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[11px] leading-4 text-morpho-primary/50 font-medium">
                  User assets
                </div>
                <div className="text-[14px] leading-5">x.xx WETH</div>
              </div>
            </div>
            <Button onClick={handleWithdraw} isLoading={isPendingSignature}>
              {isPendingSignature
                ? "Sign your transaction..."
                : "Withdraw userMax"}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
