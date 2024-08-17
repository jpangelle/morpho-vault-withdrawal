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
    className={`shadow-morpho-shadow bg-morpho-card ${w} ${h} border border-morpho-primary/15 rounded-lg px-[19px]`}
  >
    {children}
  </div>
);
