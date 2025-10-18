"use client";

import { useEffect, useMemo, useState } from "react";
import CurrencySelect from "@/components/exchange/CurrencySelect";
import ResultBox from "@/components/exchange/ResultBox";
import SwapButton from "@/components/exchange/SwapButton";
import { COUNTRIES } from "@/data/countries";

interface ExchangeApiResp {
  map: Record<string, number>; // JPY/IDR: 100단위 값
}

export default function ExchangePage() {
  const [from, setFrom] = useState<string>("USD");
  const [to, setTo] = useState<string>("KRW");
  const [amount, setAmount] = useState<string>("100");

  // 셀렉트 옵션: KRW 수동 추가 + COUNTRIES 기반 + code 중복 제거 + 이름(ko) 정렬
  const currencyOptions = useMemo(() => {
    const base = [
      { code: "KRW", name: "대한민국 원" },
      ...COUNTRIES.map((c) => ({ code: c.code, name: c.countryName })),
    ];
    const byCode = new Map<string, { code: string; name: string }>();
    base.forEach((o) => {
      if (!byCode.has(o.code)) byCode.set(o.code, o);
    });
    return Array.from(byCode.values()).sort((a, b) =>
      a.name.localeCompare(b.name, "ko")
    );
  }, []);

  // 환율 상태
  const [rateMap, setRateMap] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/exchange")
      .then((r) => r.json())
      .then((data: ExchangeApiResp) => setRateMap(data.map ?? {}))
      .catch(() => setRateMap({}))
      .finally(() => setLoading(false));
  }, []);

  // 입력 금액 파싱
  const parsedAmount = useMemo(() => {
    const n = parseFloat(String(amount || "0").replace(/[^\d.]/g, ""));
    return Number.isFinite(n) && n >= 0 ? n : 0;
  }, [amount]);

  const krwPerOne = (code: string): number => {
    if (code === "KRW") return 1;
    const raw = rateMap[code];
    if (typeof raw !== "number") return NaN;
    return code === "JPY" ? raw / 100 : raw;
  };

  // 변환 비율 (from -> to)
  const rateFromTo = useMemo(() => {
    const kFrom = krwPerOne(from);
    const kTo = krwPerOne(to);
    if (
      !Number.isFinite(kFrom) ||
      !Number.isFinite(kTo) ||
      kFrom <= 0 ||
      kTo <= 0
    )
      return NaN;
    return kFrom / kTo;
  }, [from, to, rateMap]);

  // 변환 결과
  const result = useMemo(() => {
    if (!Number.isFinite(rateFromTo)) return "";
    const value = parsedAmount * rateFromTo;
    const digits = to === "KRW" ? 0 : 2;
    return value.toLocaleString(undefined, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
  }, [parsedAmount, rateFromTo, to]);

  // 보조 라인
  const rateLine = useMemo(() => {
    const r = rateFromTo;
    if (!Number.isFinite(r)) return "환율 불러오는 중…";
    const digits = to === "KRW" ? 0 : 4;
    const text = r.toLocaleString(undefined, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
    return `1 ${from} ≈ ${text} ${to}`;
  }, [rateFromTo, from, to]);

  // "1 통화 = ₩..." 표기
  const formatPerOneKRW = (code: string) => {
    const v = krwPerOne(code);
    if (!Number.isFinite(v)) return "—";
    if (code === "KRW") return "₩1";
    return `₩${v.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  };

  // from to 스왑
  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <section className="bg-[#f4fff0] w-full min-h-[calc(100vh-176px)] 2xl:py-30 flex flex-col px-16 py-14">
      <div className="text-center">
        <h1 className="text-4xl text-primary font-bold mb-3">환율 계산기</h1>
        <p className="text-sm text-text-secondary mb-12">
          실시간 환율로 정확한 환전을 계산해 보세요.
        </p>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-3">
        {/* 왼쪽 카드 */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4">
            <label className="text-xs text-text-secondary">보낼 통화</label>
            <CurrencySelect
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              options={currencyOptions}
            />

            <label className="mt-2 text-xs text-text-secondary">금액</label>
            <input
              inputMode="decimal"
              type="text"
              placeholder="금액을 입력하세요"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-3 text-[15px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />

            <p className="text-xs text-gray-500 mt-1">
              {loading
                ? "환율 불러오는 중…"
                : `1 ${from} ≈ ${formatPerOneKRW(from)} (KRW 기준)`}
            </p>
          </div>
        </div>

        {/* 오른쪽 카드 */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4">
            <label className="text-xs text-text-secondary">받을 통화</label>
            <CurrencySelect
              value={to}
              onChange={(e) => setTo(e.target.value)}
              options={currencyOptions}
            />

            <ResultBox
              loading={loading}
              resultText={
                loading
                  ? ""
                  : Number.isFinite(rateFromTo)
                  ? `${result} ${to}`
                  : "환율 데이터를 불러오지 못했어요"
              }
              helperLine={rateLine}
            />
          </div>
        </div>

        <SwapButton onClick={handleSwap} />
      </div>

      {/* 안내 문구 */}
      <p className="mt-16 text-xs text-text-secondary text-center">
        ※ 한국수출입은행 기준. 영업일 11시 이전 또는 비영업일은 최근 영업일
        기준으로 제공됩니다.
      </p>
    </section>
  );
}
