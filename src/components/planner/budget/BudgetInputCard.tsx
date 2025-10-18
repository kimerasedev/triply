"use client";

interface BudgetInputCardProps {
  label: string;
  desc: string;
  code: string;
  krwPerOne: number;
  value: string; // 외화 입력값 (문자열 유지)
  onChange: (v: string) => void;
}

// "12,345.6" → 12345.6
const parseNumber = (s: string) =>
  Number(String(s || "0").replace(/[^\d.]/g, "")) || 0;

const fmtKRW = (n: number) => `${Math.round(n).toLocaleString()}`;

export default function BudgetInputCard({
  label,
  desc,
  code,
  krwPerOne,
  value,
  onChange,
}: BudgetInputCardProps) {
  // 실시간 KRW 계산: 입력 * 1단위 KRW
  const krwValue = krwPerOne ? parseNumber(value) * krwPerOne : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow px-6 py-4">
      <p className="text-text-primary font-medium">{label}</p>
      <p className="text-[11px] text-text-secondary">{desc}</p>

      <div className="mt-3 flex items-center gap-2">
        {/* 외화 입력 */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-48 px-3 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          placeholder="0"
          inputMode="decimal"
        />
        <span className="text-sm text-text-secondary">{code}</span>

        <span className="text-text-secondary mx-2">→</span>

        {/* 원화 표시 */}
        <input
          type="text"
          readOnly
          tabIndex={-1} // 탭 이동 제외
          value={fmtKRW(krwValue)}
          className="w-48 px-3 py-1 border border-gray-200 rounded bg-gray-50 text-sm text-right focus:outline-none"
        />
        <span className="text-sm text-text-secondary">원</span>
      </div>
    </div>
  );
}
