"use client";

import PlannerStepper from "@/components/planner/PlannerStepper";
import BudgetTable from "@/components/planner/result/BudgetTable";
import { COUNTRIES } from "@/data/countries";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const CATEGORIES = [
  { key: "stay", label: "숙박비" },
  { key: "food", label: "식비" },
  { key: "transport", label: "교통비" },
  { key: "activity", label: "관광/액티비티" },
  { key: "shopping", label: "쇼핑" },
  { key: "etc", label: "기타" },
] as const;

interface ExchangeApiResp {
  map: Record<string, number>;
}

/* 입력 페이지에서 저장해둔 예산 (로컬스토리지) */
interface SavedBudget {
  code: string;
  rows: { key: string; value: number }[];
}

/* 기본 rows(0) 생성 */
const DEFAULT_ROWS = CATEGORIES.map((c) => ({
  key: c.key,
  label: c.label,
  value: 0,
}));

export default function ResultPage() {
  const params = useParams<{ code: string }>();
  const code = (params.code || "").toUpperCase();

  const country = COUNTRIES.find((c) => c.code === code);
  if (!country) notFound();

  const [rateMap, setRateMap] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/exchange")
      .then((r) => r.json())
      .then((data: ExchangeApiResp) => setRateMap(data.map ?? {}))
      .catch(() => setRateMap({})) // 실패해도 화면은 표시
      .finally(() => setLoading(false));
  }, []);

  const unitForDisplay = code === "JPY" || code === "IDR" ? 100 : 1;

  const krwPerOne = useMemo(() => {
    const raw = rateMap[code];
    if (typeof raw !== "number") return 0;
    return unitForDisplay === 100 ? raw / 100 : raw;
  }, [rateMap, code, unitForDisplay]);

  /* 상단 환율 표기 라인 (표시는 JPY/IDR 100단위 그대로) */
  const rateLine = useMemo(() => {
    const raw = rateMap[code];
    if (loading) return "환율 불러오는 중…";
    if (typeof raw !== "number") return "—";
    return `${unitForDisplay} ${code} = ${raw.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })} 원`;
  }, [loading, rateMap, code, unitForDisplay]);

  /* 입력 페이지에서 저장한 값 복원 */
  const [rows, setRows] =
    useState<{ key: string; label: string; value: number }[]>(DEFAULT_ROWS);

  useEffect(() => {
    try {
      const saved: SavedBudget | null = JSON.parse(
        localStorage.getItem(`triply:budget:${code}`) || "null"
      );
      const mapByKey = new Map(saved?.rows?.map((r) => [r.key, r.value]) || []);
      const restored = DEFAULT_ROWS.map((r) => ({
        ...r,
        value: Number(mapByKey.get(r.key) || 0),
      }));
      setRows(restored);
    } catch {
      setRows(DEFAULT_ROWS);
    }
  }, [code]);

  /* 합계 계산(외화, KRW) */
  const totals = useMemo(() => {
    const fx = rows.reduce((sum, r) => sum + (Number(r.value) || 0), 0);
    const krw = fx * krwPerOne;
    return { fx, krw };
  }, [rows, krwPerOne]);

  const fmtKRW = (n: number) => `${Math.round(n).toLocaleString()} 원`;
  const fmtFX = (n: number) =>
    n.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="bg-[#f4fff0] w-full flex flex-col items-center px-4 py-20">
      <div className="fixed right-5">
        <PlannerStepper />
      </div>

      <div className="w-3xl flex-1">
        {/* 헤더 */}
        <div className="flex items-center gap-2 mb-2">
          <Image src={country!.flag} alt="국기" width={28} height={28} />
          <h2 className="text-2xl font-bold">
            {country!.countryName} 한 달 살기 예산 결과
          </h2>
        </div>

        <p className="text-sm text-text-secondary mb-8">
          현재 환율:&nbsp; <span className="font-medium">{rateLine}</span>
        </p>

        {/* 총 예산 카드 */}
        <div className="w-full mb-8">
          <div className="relative overflow-hidden rounded-lg bg-white/80 backdrop-blur-sm shadow px-6 py-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(22,51,0,0.06),transparent_60%)]" />
            <h3 className="text-primary text-center">총 예산</h3>
            <p className="mt-2 text-4xl font-bold text-text-primary text-center">
              {fmtKRW(totals.krw)}
            </p>
            <p className="mt-1 text-sm text-text-secondary text-center">
              {fmtFX(totals.fx)} {code}
            </p>
          </div>
        </div>

        {/* 상세 내역 테이블 */}
        <div className="w-full max-w-[1000px] bg-white p-6 rounded-lg shadow mb-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-secondary p-1 rounded-full"></div>
            <p className="text-text-primary">상세 내역</p>
          </div>

          <BudgetTable
            currencyCode={code}
            unit={unitForDisplay} /* JPY/IDR만 100, 나머지는 1 (표기용) */
            rateKrwPerUnit={rateMap[code] || 0} /* 표기용 원본 값 그대로 전달 */
            rows={rows}
          />
        </div>
      </div>

      <Link
        href={`/planner/budget/${code}`}
        className="mt-10 inline-block text-xs text-gray-400 underline"
      >
        ← 예산 입력으로 돌아가기
      </Link>
    </div>
  );
}
