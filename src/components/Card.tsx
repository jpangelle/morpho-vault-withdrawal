import { ReactNode } from "react";

export const Card = ({
  children,
  w,
  h,
}: {
  children: ReactNode;
  w?: string;
  h?: string;
}) => (
  <div
    className={`shadow-[0_3px_12px_0_rgba(0,0,0,0.09)] bg-[rgba(250, 252, 255, 1)] ${w} ${h} border border-morpho-primary/15 rounded-lg px-[19px]`}
  >
    {children}
  </div>
);
