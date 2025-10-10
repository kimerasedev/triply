"use client";

import { useMemo, useState } from "react";
import CommunityCard from "./CommunityCard";
import ArrowIcon from "@/assets/icons/Arrow";

// 더미 데이터
const communityCardData = [
  { flag: "Canada", content: "첫번째 카드 내용..." },
  { flag: "UnitedStates", content: "두번째 카드 내용..." },
  { flag: "Japan", content: "세번째 카드 내용..." },
  { flag: "UnitedKingdom", content: "네번째 카드 내용..." },
  { flag: "NewZealand", content: "다섯번째 카드 내용..." },
  { flag: "NewZealand", content: "여섯번째 카드 내용..." },
  { flag: "NewZealand", content: "일곱번째 카드 내용..." },
];

const CARD_W = 260; // 카드 너비(px): CommunityCard와 동일
const GAP = 12; // 카드 사이 간격(px): gap-x-*와 맞추기
const VISIBLE = 1; // 한 화면에 보일 카드 개수

export default function CommunitySection() {
  const [index, setIndex] = useState(0);

  const maxIndex = useMemo(
    () => Math.max(0, communityCardData.length - VISIBLE),
    []
  );

  const handlePrev = () => setIndex((i) => Math.max(0, i - 1));
  const handleNext = () => setIndex((i) => Math.min(maxIndex, i + 1));

  const offset = index * (CARD_W + GAP); // 이동 거리

  const prevDisabled = index === 0;
  const nextDisabled = index === maxIndex;

  return (
    <section className="w-full mt-10 mb-40 px-13 py-10">
      <div className="flex items-start justify-between gap-20">
        <div className="shrink-0 w-[360px]">
          <h2 className="text-4xl font-bold text-text-primary leading-snug">
            나만의 <br /> 한 달 살기 이야기
          </h2>
          <p className="text-text-secondary mt-2 mb-10">
            전 세계 여행자들의 한 달 살기 경험을 공유해요.
          </p>

          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              disabled={prevDisabled}
              aria-label="이전 카드"
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors
                ${
                  prevDisabled ? "bg-gray-100" : "bg-secondary hover:opacity-90"
                }
              `}
            >
              <ArrowIcon
                className={`rotate-180 scale-125 ${
                  prevDisabled ? "text-gray-400" : "text-primary"
                }`}
              />
            </button>

            <button
              onClick={handleNext}
              disabled={nextDisabled}
              aria-label="다음 카드"
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors
                ${
                  nextDisabled ? "bg-gray-100" : "bg-secondary hover:opacity-90"
                }
              `}
            >
              <ArrowIcon
                className={`scale-125 ${
                  nextDisabled ? "text-gray-400" : "text-primary"
                }`}
              />
            </button>
          </div>
        </div>

        {/* 카드 슬라이더 */}
        <div className="relative grow overflow-hidden">
          <div
            className="flex gap-x-3 transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(-${offset}px)`,
              // 트랙 최소 너비 확보 (안 튕기게)
              minWidth: (CARD_W + GAP) * communityCardData.length - GAP,
            }}
          >
            {communityCardData.map((item, i) => (
              <CommunityCard
                key={i}
                flag={item.flag}
                content={item.content}
                variant={i % 2 === 0 ? "primary" : "secondary"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
