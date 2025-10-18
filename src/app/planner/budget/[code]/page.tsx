"use client";

import PlannerStepper from "@/components/planner/PlannerStepper";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { COUNTRIES } from "@/data/countries";
import BudgetInputCard from "@/components/planner/budget/BudgetInputCard";

const CATEGORIES = [
  { key: "stay", label: "숙박비", desc: "에어비앤비, 호텔, 게스트하우스 등" },
  { key: "food", label: "식비", desc: "식당, 마트, 배달음식 등" },
  { key: "transport", label: "교통비", desc: "대중교통, 택시, 렌터카 등" },
  {
    key: "activity",
    label: "관광/액티비티",
    desc: "입장료, 투어, 체험활동 등",
  },
  { key: "shopping", label: "쇼핑", desc: "의류, 기념품, 생활용품 등" },
  { key: "etc", label: "기타", desc: "통신비, 보험, 기타 비용" },
] as const;

interface ExchangeApiResp {
  map: Record<string, number>;
}

const parseNumber = (s: string) =>
  Number(String(s || "0").replace(/[^\d.]/g, "")) || 0;

const fmtKRW = (n: number) => `${Math.round(n).toLocaleString()}`;

export default function BudgetPage() {
  /* URL 파라미터에서 통화코드 받기 (/planner/budget/CAD -> CAD) */
  const params = useParams<{ code: string }>();
  const code = (params.code || "").toUpperCase();

  /* 국가 데이터 찾기 */
  const country = COUNTRIES.find((c) => c.code === code);
  if (!country) {
    notFound();
  }

  const [rateMap, setRateMap] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/exchange")
      .then((r) => r.json())
      .then((data: ExchangeApiResp) => {
        setRateMap(data.map ?? {});
      })
      .catch(() => setRateMap({}))
      .finally(() => setLoading(false));
  }, []);

  const krwPerOne = useMemo(() => {
    const raw = rateMap[code];
    if (typeof raw !== "number") return 0;
    return code === "JPY" || code === "IDR" ? raw / 100 : raw;
  }, [rateMap, code]);

  /* 상단 안내 라인 (JPY/IDR은 100단위로 표기) */
  const rateLine = useMemo(() => {
    const raw = rateMap[code];
    if (loading) return "환율 불러오는 중…";
    if (typeof raw !== "number") return "—";
    const unit = code === "JPY" || code === "IDR" ? 100 : 1;
    return `${unit} ${code} = ${raw.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })} 원`;
  }, [loading, rateMap, code]);

  /* 입력값 상태 */
  const [inputs, setInputs] = useState<Record<string, string>>({});

  /* 저장값 복원 (로컬스토리지) */
  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(`triply:budget:${code}`) || "null"
      );
      if (saved?.rows) {
        const next: Record<string, string> = {};
        for (const r of saved.rows) next[r.key] = String(r.value || "");
        setInputs(next);
      }
    } catch {}
  }, [code]);

  /* 입력 변경 + 즉시 저장 (로컬스토리지) */
  const onChangeCat = (key: string, val: string) =>
    setInputs((prev) => {
      const next = { ...prev, [key]: val };
      const rows = CATEGORIES.map((c) => ({
        key: c.key,
        value: parseNumber(next[c.key]),
      }));
      localStorage.setItem(
        `triply:budget:${code}`,
        JSON.stringify({ code, rows })
      );
      return next;
    });

  /* 총합 계산 (외화 합계, KRW 합계) */
  const totals = useMemo(() => {
    let fx = 0;
    let krw = 0;
    for (const c of CATEGORIES) {
      const v = parseNumber(inputs[c.key]);
      fx += v;
      krw += v * krwPerOne;
    }
    return { fx, krw };
  }, [inputs, krwPerOne]);

  return (
    <div className="bg-[#f4fff0] w-full flex flex-col items-center px-4 py-20">
      <div className="fixed right-5">
        <PlannerStepper />
      </div>

      <div className="w-3xl flex-1">
        {/* 헤더 */}
        <div className="flex items-center gap-2 mb-2">
          <Image src={country.flag} alt="국기" width={28} height={28} />
          <h2 className="text-2xl font-bold">
            {country.countryName} 한 달 살기 예산
          </h2>
        </div>

        {/* 환율 라인 */}
        <p className="text-sm text-text-secondary mb-8">
          현재 환율: <span className="font-medium">{rateLine}</span>
        </p>

        {/* 입력 카드들 */}
        <div className="space-y-4">
          {CATEGORIES.map((item) => (
            <BudgetInputCard
              key={item.key}
              label={item.label}
              desc={item.desc}
              code={code}
              krwPerOne={krwPerOne}
              value={inputs[item.key] ?? ""}
              onChange={(v) => onChangeCat(item.key, v)}
            />
          ))}
        </div>

        {/* 총 합계 */}
        <div className="mt-6 bg-white border border-gray-200 rounded-lg shadow px-6 py-4">
          <p className="text-sm text-text-secondary">총 합계</p>
          <p className="mt-1 text-lg font-semibold text-primary">
            {totals.fx.toLocaleString()} {code} ≈ {fmtKRW(totals.krw)}
          </p>
        </div>

        {/* 버튼 */}
        <div className="flex items-center justify-between mt-16">
          <Link
            href="/planner/select"
            className="text-xs text-gray-400 underline"
          >
            ← 국가 선택으로 돌아가기
          </Link>
          <Link href={`/planner/result/${code}`}>
            <button className="text-[15px] bg-primary text-white px-10 py-2 rounded-full hover:brightness-130 transition">
              결과 보기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
