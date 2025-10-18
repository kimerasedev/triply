"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import worldMapUrl from "@/assets/images/world-map.svg";
import { COUNTRIES } from "@/data/countries";

const COORDS: Record<string, { x: number; y: number }> = {
  USD: { x: 26, y: 51 },
  CAD: { x: 23, y: 37 },
  GBP: { x: 47, y: 40 },
  EUR: { x: 52, y: 39 },
  DKK: { x: 50, y: 42 },
  SEK: { x: 52, y: 30 },
  NOK: { x: 49, y: 37 },
  CHF: { x: 49, y: 47 },
  HKD: { x: 72, y: 60 },
  SGD: { x: 70, y: 69 },
  MYR: { x: 69, y: 68 },
  THB: { x: 69, y: 63 },
  IDR: { x: 73, y: 72 },
  JPY: { x: 77, y: 52 },
  AUD: { x: 76, y: 80 },
  NZD: { x: 85, y: 86 },
};

type Pin = { code: string; label: string; x: number; y: number };

function usePins(): Pin[] {
  return useMemo(
    () =>
      COUNTRIES.filter((c) => COORDS[c.code]) // -> 좌표 있는 나라만 표시
        .map((c) => {
          const p = COORDS[c.code]!;
          return {
            code: c.code,
            label: `${c.countryName} (${c.code})`,
            x: p.x,
            y: p.y,
          };
        }),
    []
  );
}

export default function WorldMapSection() {
  const pins = usePins();
  const [tip, setTip] = useState<{
    show: boolean;
    x: number;
    y: number;
    text: string;
  }>({ show: false, x: -9999, y: -9999, text: "" });

  return (
    <section className="w-full bg-primary">
      <div className="relative overflow-hidden text-white px-6 md:px-12 lg:px-20 py-12 md:py-16">
        {/* 배지 애니메이션 */}
        <div className="mb-3 text-sm">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
            <span className="relative inline-block size-2 rounded-full bg-secondary text-secondary animate-blink ring-ping" />
            추가 지원 국가 준비중
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold">
          전 세계 주요 16개국 지원
        </h2>
        <p className="font-light mt-3 text-sm md:text-base">
          미국, 일본, 유럽, 동남아까지 — 여행자들이 가장 많이 찾는 16개국 통화를
          지원합니다.
        </p>

        <div className="mt-10 md:mt-16 flex justify-center">
          <div
            className="relative w-full max-w-[1300px] aspect-[2/1] opacity-95"
            onMouseMove={(e) =>
              setTip((t) => ({ ...t, x: e.clientX + 16, y: e.clientY - 20 }))
            }
            onMouseLeave={() =>
              setTip({ show: false, x: -9999, y: -9999, text: "" })
            }
          >
            <Image
              src={worldMapUrl}
              alt="세계 지도"
              fill
              className="object-contain select-none pointer-events-none"
              priority
            />

            {/* 핀 */}
            {pins.map((p) => (
              <button
                key={p.code}
                className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                onMouseEnter={() =>
                  setTip((t) => ({ ...t, show: true, text: p.label }))
                }
                onMouseLeave={() =>
                  setTip({ show: false, x: -9999, y: -9999, text: "" })
                }
                aria-label={p.label}
              >
                <span className="block size-[17px] rounded-full bg-secondary ring-2 ring-white/90 group-hover:scale-110 transition-transform" />
                {/* 파동 */}
                <span
                  className="absolute inset-0 -m-1 rounded-full border-5 border-secondary/70 pointer-events-none"
                  style={{ animation: "triply-ping 1.8s infinite" }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* 툴팁 */}
        {tip.show && (
          <div
            className="pointer-events-none fixed z-[60] rounded-md bg-black/70 px-3 py-1 text-xs font-medium"
            style={{ left: tip.x, top: tip.y }}
          >
            {tip.text}
          </div>
        )}
      </div>
    </section>
  );
}
