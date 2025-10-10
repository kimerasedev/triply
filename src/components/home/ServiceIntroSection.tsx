import ServiceIntroItem from "./ServiceIntroItem";
import autoBudgetIcon from "@/assets/icons/auto-budget.svg";
import autoExchangeIcon from "@/assets/icons/auto-exchange.svg";
import communityIcon from "@/assets/icons/community.svg";

export default function ServiceIntroSection() {
  return (
    <section className="flex justify-center items-center px-20 py-18">
      <ServiceIntroItem
        icon={autoBudgetIcon}
        title="예산 자동 계산"
        subtitle="숙소/식비/교통비 입력만 하면 끝"
      />
      <ServiceIntroItem
        icon={autoExchangeIcon}
        title="환율 자동 반영"
        subtitle="매일 갱신되는 기준환율로 정확하게"
      />
      <ServiceIntroItem
        icon={communityIcon}
        title="여행 커뮤니티"
        subtitle="각 나라별 여행자들과 한 달 살기 정보 공유"
      />
    </section>
  );
}
