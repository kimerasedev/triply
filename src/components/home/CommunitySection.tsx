"use client";

import { useMemo, useState } from "react";
import CommunityCard from "./CommunityCard";
import ArrowIcon from "@/assets/icons/Arrow";

const communityCardData = [
  {
    flag: "Canada",
    content:
      "밴쿠버에서 한 달 살기 했어요. 공원 산책하고, 주말엔 가까운 호수로 캠핑 갔어요. 물가가 좀 비쌌지만, 자연 덕분에 마음이 편해졌어요. 날씨는 선선해서 걷기 정말 좋았어요.",
  },
  {
    flag: "Malaysia",
    content:
      "쿠알라룸푸르에서 한 달 머물렀는데, 생각보다 현대적이고 교통도 편했어요. 호커센터에서 현지 음식 먹는 재미가 쏠쏠했어요. 하루 예산 3만 원 안쪽으로도 충분했어요!",
  },
  {
    flag: "NewZealand",
    content:
      "퀸스타운에서 한 달 살았는데 매일이 영화 같았어요. 주말마다 하이킹 코스 다니며 자연을 느꼈죠. 현지 마트 식재료가 신선해서 요리도 즐거웠어요.",
  },
  {
    flag: "Indonesia",
    content:
      "발리에서 한 달 살기 도전! 스쿠터 타고 해변 돌아다니며 코워킹 카페에서 일했어요. 하루가 여유롭고, 현지 사람들도 친절했어요. 바다 보며 일하니 스트레스가 사라졌어요.",
  },
  {
    flag: "UnitedKingdom",
    content:
      "런던에서 한 달 동안 머물렀는데, 비가 자주 와도 분위기가 참 좋았어요. 마켓에서 브런치 먹고 공원 산책하는 게 일상이었죠. 버스 타고 돌아다니며 혼자 여행하기 딱이었어요.",
  },
  {
    flag: "Thailand",
    content:
      "치앙마이에서 디지털 노마드처럼 한 달 살았어요. 저렴한 숙소와 맛있는 길거리 음식 덕분에 살기 좋았어요. 카페 문화도 발달해서 하루 종일 노트북으로 작업하기 편했어요.",
  },
  {
    flag: "Switzerland",
    content:
      "루체른 근처에서 한 달 동안 머물렀어요. 창밖으로 보이는 알프스가 매일 그림 같았죠. 물가는 비쌌지만, 산책로와 호수 풍경 덕분에 그만한 가치가 있었어요.",
  },
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
    <section className="w-full px-30 py-20">
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
