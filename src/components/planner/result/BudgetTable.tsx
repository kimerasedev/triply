"use client";

interface Row {
  key: string;
  label: string;
  value: number;
}

interface BudgetTableProps {
  currencyCode: string;
  unit?: number; // 디폴트 1
  rateKrwPerUnit: number;
  rows: Row[]; // 외화 금액들
}

function fmtKRW(n: number) {
  return `${Math.round(n).toLocaleString()} 원`;
}
function fmtFX(n: number) {
  return `${Number(n || 0).toLocaleString()}`;
}

export default function BudgetTable({
  currencyCode,
  unit = 1,
  rateKrwPerUnit,
  rows,
}: BudgetTableProps) {
  const krwPerOne = rateKrwPerUnit / (unit || 1);

  // 각 행에 KRW 금액 붙이기
  const rowsWithKRW = (rows || []).map((r) => ({
    ...r,
    krw: r.value * krwPerOne,
  }));

  // 총합
  const totalFx = rowsWithKRW.reduce((s, r) => s + (r.value || 0), 0);
  const totalKrw = rowsWithKRW.reduce((s, r) => s + (r.krw || 0), 0);

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr className="text-text-primary">
            {/* 카테고리 */}
            <th className="px-5 py-4 w-[28%] text-left">카테고리</th>
            {/* 현재 통화 */}
            <th className="px-5 py-4 w-[24%] text-right">
              현재 통화 ({currencyCode}
              {unit === 100 ? " (100)" : ""})
            </th>
            {/* 원화 */}
            <th className="px-5 py-4 w-[24%] text-right">원화 (KRW)</th>
            {/* 비율 */}
            <th className="px-5 py-4 pr-6 text-right">비율</th>
          </tr>
        </thead>

        <tbody>
          {rowsWithKRW.map((r, idx) => {
            const pct = totalKrw ? Math.round((r.krw / totalKrw) * 100) : 0;
            return (
              <tr
                key={r.key}
                className={
                  idx % 2 === 1
                    ? "bg-white border-t border-gray-100"
                    : "border-t border-gray-100"
                }
              >
                {/* 카테고리 */}
                <td className="px-5 py-4 text-left text-text-primary">
                  {r.label}
                </td>
                {/* 현재 통화 */}
                <td className="px-5 py-4 text-right text-gray-700">
                  {fmtFX(r.value)} {currencyCode}
                </td>
                {/* 원화 */}
                <td className="px-5 py-4 text-right">{fmtKRW(r.krw)}</td>
                {/* 비율 */}
                <td className="px-5 py-4 pr-6 text-right text-gray-700">
                  {pct}%
                </td>
              </tr>
            );
          })}
        </tbody>

        <tfoot>
          <tr className="border-t-2 border-gray-200 bg-gray-50">
            {/* 총합 */}
            <th className="px-5 py-5 text-left text-primary">총합</th>
            {/* 현재 통화 */}
            <th className="px-5 py-5 text-right text-primary">
              {fmtFX(totalFx)} {currencyCode}
            </th>
            {/* 원화 */}
            <th className="px-5 py-5 text-right text-primary">
              {fmtKRW(totalKrw)}
            </th>
            {/* 비율 100% */}
            <th className="px-5 py-5 pr-6 text-right text-primary">100%</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
