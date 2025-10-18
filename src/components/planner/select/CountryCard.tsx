"use client";

import clsx from "clsx";
import Image from "next/image";

interface CountryCardProps {
  flag: string;
  countryName: string;
  exchangeRate: string;
  livingCost: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function CountryCard({
  flag,
  countryName,
  exchangeRate,
  livingCost,
  isSelected = false,
  onClick,
}: CountryCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "w-[200px] h-[250px] rounded-2xl p-6 cursor-pointer flex flex-col items-center justify-center bg-white shadow-lg hover:scale-105 transition-all duration-300",
        isSelected ? "ring-3 ring-primary transition-all duration-500" : ""
      )}
    >
      <Image src={flag} alt={`${countryName} flag`} width={32} height={32} />
      <p className="mt-5 text-[15px] font-bold text-text-primary">
        {countryName}
      </p>

      <p className="text-sm mt-1 text-text-primary">{exchangeRate}</p>

      <p className="text-[11px] text-text-secondary mt-6 font-light">
        평균 한 달 생활비
      </p>
      <p className="text-xs text-text-secondary font-light">{livingCost}원</p>
    </button>
  );
}
