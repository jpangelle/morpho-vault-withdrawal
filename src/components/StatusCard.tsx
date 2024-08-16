import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import Image from "next/image";

type Props = {
  type: "success" | "error";
  buttonAction: () => void;
  message?: string;
};

const statuses = {
  success: {
    color: "text-morpho-success",
    title: "Success!",
    buttonText: "Reset",
    image: (
      <Image
        src="/check.svg"
        width={40}
        height={40}
        alt="check-mark"
        className="p-1"
      />
    ),
  },
  error: {
    color: "text-morpho-error",
    title: "Oh no!",
    buttonText: "Retry",
    image: <Image src="/alert.svg" width={40} height={40} alt="alert" />,
  },
};

export const StatusCard = ({ type, buttonAction, message }: Props) => {
  return (
    <Card w="w-[350px]" h="h-[270px]">
      <div className="flex flex-col h-full gap-[50px] justify-center">
        <div className="flex flex-col gap-2">
          <div className="flex justify-center">{statuses[type].image}</div>
          <div className="flex flex-col text-center gap-1">
            <div className={`text-sm ${statuses[type].color}`}>
              {statuses[type].title}
            </div>
            {message && (
              <div className="text-[11px] leading-4 text-morpho-primary/50 font-medium">
                {message}
              </div>
            )}
          </div>
        </div>
        <Button onClick={buttonAction}>{statuses[type].buttonText}</Button>
      </div>
    </Card>
  );
};
