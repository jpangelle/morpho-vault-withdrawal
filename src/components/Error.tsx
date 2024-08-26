import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import Image from "next/image";

type Props = {
  reset: () => void;
};

export const Error = ({ reset }: Props) => {
  return (
    <Card w="w-[350px]" h="h-[270px]">
      <div className="flex flex-col h-full gap-[50px] justify-center">
        <div className="flex flex-col gap-2">
          <div className="flex justify-center">
            <Image
              src="/alert.svg"
              width={40}
              height={40}
              alt="alert"
              className="p-1"
            />
          </div>
          <div className="flex flex-col text-center gap-1">
            <div className="text-sm text-morpho-error">Oh no!</div>
            <div className="text-[11px] leading-4 text-morpho-primary/50 font-medium">
              Please try again.
            </div>
          </div>
        </div>
        <Button onClick={reset}>Retry</Button>
      </div>
    </Card>
  );
};
