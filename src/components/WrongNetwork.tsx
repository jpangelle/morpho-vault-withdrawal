import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import Image from "next/image";
import { useSwitchChain } from "wagmi";

export const WrongNetwork = () => {
  const { switchChain } = useSwitchChain();

  return (
    <Card w="w-[350px]" h="h-[350px]">
      <div className="flex flex-col gap-[50px] h-full justify-center">
        <div className="flex flex-col gap-[10px]">
          <div className="flex justify-center">
            <div className="size-6 flex justify-center">
              <Image src="/alert.svg" width={24} height={24} alt="logo" />
            </div>
          </div>
          <div className="text-center text-[20px] leading-6 text-morpho-primary/95">
            Wrong network
          </div>
          <div className="text-center text-sm text-morpho-primary/70">
            You are not on Mainnet. Please click the button below to switch.
          </div>
        </div>
        <div className="flex justify-center">
          <Button onClick={() => switchChain({ chainId: 1 })}>Switch</Button>
        </div>
      </div>
    </Card>
  );
};
