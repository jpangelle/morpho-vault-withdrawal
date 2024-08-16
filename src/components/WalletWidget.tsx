import Image from "next/image";

type Props = {
  walletAddress: string;
};

export const WalletWidget = ({ walletAddress }: Props) => (
  <div className="w-[110px] h-[26px] bg-morpho-primary/[.06] rounded-[3px] pl-[2px] flex">
    <div className="flex gap-[2px] items-center">
      <Image src="/avatar.svg" width={20} height={20} alt="avatar" />
      <div className="text-[11px] leading-4 font-medium text-morpho-primary/95">
        {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
      </div>
    </div>
  </div>
);
