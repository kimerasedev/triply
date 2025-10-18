"use client";

export interface CurrencyOption {
  code: string;
  name: string; // 화면에 보여줄 국가명
}

interface CurrencySelectProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: CurrencyOption[];
}

export default function CurrencySelect({
  value,
  onChange,
  options,
}: CurrencySelectProps) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-[15px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
    >
      {options.map((c) => (
        <option key={c.code} value={c.code}>
          {c.code} · {c.name}
        </option>
      ))}
    </select>
  );
}
