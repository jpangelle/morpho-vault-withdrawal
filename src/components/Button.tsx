import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
  isDisabled?: boolean;
};

export const Button = ({ children, isLoading, onClick, isDisabled }: Props) => (
  <button
    className={`w-full rounded h-8 text-[13px] leading-5 text-white bg-morpho-gradient ${
      (isLoading || isDisabled) && "opacity-30"
    }`}
    onClick={() => {
      if (!isLoading && !isDisabled) {
        onClick?.();
      }
    }}
  >
    {children}
  </button>
);
