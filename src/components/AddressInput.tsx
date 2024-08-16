"use client";
import { Card } from "@/components/Card";
import Image from "next/image";
import { useState } from "react";
import { isAddress } from "viem";

type Props = {
  isValidAddress: boolean;
  setIsValidAddress: (value: boolean) => void;
  address: string;
  setAddress: (value: string) => void;
  isMetaMorpho: boolean;
  isMetaMorphoError: boolean;
};

export const AddressInput = ({
  isValidAddress,
  setIsValidAddress,
  address,
  setAddress,
  isMetaMorpho,
  isMetaMorphoError,
}: Props) => {
  const [isDirty, setIsDirty] = useState(false);

  const isValid = isValidAddress && isMetaMorpho && !isMetaMorphoError;

  const getErrorMessage = () => {
    if (!isValidAddress) return "Input is not an address";
    if (isMetaMorphoError) return "An error occurred checking the contract";
    if (!isMetaMorpho) return "Input is not a MetaMorpho address";
    return "";
  };

  return (
    <Card w="w-[350px]" h="h-[160px]">
      <div className="flex flex-col gap-2 h-full justify-center">
        <div className="text-xs font-medium text-morpho-primary/70">
          MetaMorpho Address
        </div>
        <div className="relative">
          <input
            spellCheck="false"
            className={`${
              isDirty &&
              (isValid ? "text-morpho-primary/95" : "text-morpho-error")
            } focus:outline-none focus:input-focus-outline focus:ring-1 focus:input-focus-outline h-8 text-ellipsis rounded-md bg-morpho-primary/[.03] w-full py-2 pl-[10px] pr-[38px] text-[13px] leading-5 placeholder-morpho-primary/40`}
            placeholder="0xabc...12345"
            type="text"
            value={address}
            onChange={(event) => {
              setAddress(event.target.value);
              setIsValidAddress(isAddress(event.target.value));
            }}
            onBlur={() => setIsDirty(true)}
          />
          {isValid && (
            <div className="absolute top-1.5 right-1 size-5 flex justify-center">
              <Image
                className="w-auto h-auto"
                src="/check.svg"
                width={16}
                height={16}
                alt="check mark"
              />
            </div>
          )}
          {isDirty && !isValid && (
            <div className="absolute top-1.5 right-1 size-5 flex justify-center">
              <Image src="/alert.svg" width={20} height={20} alt="check mark" />
            </div>
          )}
          <div
            className={`text-morpho-error text-[11px] leading-4 text-right ${
              (!isDirty || isValid) && "invisible"
            }`}
          >
            {getErrorMessage()}
          </div>
        </div>
      </div>
    </Card>
  );
};
