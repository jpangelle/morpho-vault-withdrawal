import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
};

export const Button = ({ children, isLoading, onClick }: Props) => (
  <button
    className={`w-full rounded h-8 text-[13px] leading-5 text-white bg-morpho-gradient ${
      isLoading && "opacity-30"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);
