"use client";

import PlannerStepper from "@/components/planner/PlannerStepper";
import CountryCard from "@/components/planner/select/CountryCard";
import { COUNTRIES } from "@/data/countries";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ExchangeApiResp {
  map: Record<string, number>; // code -> KRW 값 (JPY/IDR은 100단위 값)
}

export default function SelectPage() {
  const router = useRouter();

  // 선택된 카드 (ring 표시용)
  const [selected, setSelected] = useState<string | null>(null);

  // 환율 상태
  const [rateMap, setRateMap] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/exchange")
      .then((r) => r.json())
      .then((data: ExchangeApiResp) => {
        setRateMap(data.map ?? {});
      })
      .catch(() => {
        setRateMap({});
      })
      .finally(() => setLoading(false));
  }, []);

  // 카드 클릭하고 1초 뒤 이동
  const handleSelect = (code: string) => {
    setSelected(code);
    setTimeout(() => router.push(`/planner/budget/${code}`), 1000);
  };

  // 카드 표시용 환율 문자열
  const formatRate = (code: string) => {
    const v = rateMap[code];
    if (loading) return "환율 불러오는 중…";
    if (typeof v !== "number") return "—";

    const unit = code === "JPY" || code === "IDR" ? 100 : 1;
    const text = v.toLocaleString(undefined, { maximumFractionDigits: 2 });
    return `${unit} ${code} = ${text} 원`;
  };

  return (
    <div className="bg-[#f4fff0] w-full flex flex-col items-center px-4 py-20">
      <div className="fixed right-5">
        <PlannerStepper />
      </div>

      <h1 className="text-4xl text-primary font-bold mb-3">
        어느 나라로 떠나시나요?
      </h1>
      <p className="text-sm text-text-secondary mb-8">
        국가를 선택하면 실시간 환율과 함께 예산을 계산해 드려요.
      </p>

      <div className="mt-6 mb-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {COUNTRIES.map((c) => (
          <CountryCard
            key={c.code}
            flag={c.flag}
            countryName={c.countryName}
            exchangeRate={formatRate(c.code)}
            livingCost={c.livingCost}
            isSelected={selected === c.code}
            onClick={() => handleSelect(c.code)}
          />
        ))}
      </div>

      {/* 안내 문구 */}
      <p className="mt-10 text-xs text-text-secondary text-center">
        ※ 한국수출입은행 기준. 영업일 11시 이전 또는 비영업일은 최근 영업일
        기준으로 제공됩니다.
      </p>
    </div>
  );
}
