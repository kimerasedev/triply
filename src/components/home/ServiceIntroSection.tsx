import ServiceIntroItem from "./ServiceIntroItem";
import autoBudgetIcon from "@/assets/icons/auto-budget.svg";
import autoExchangeIcon from "@/assets/icons/auto-exchange.svg";
import documentsIcon from "@/assets/icons/documents.svg";

export default function ServiceIntroSection() {
  return (
    <section className="flex justify-center items-center p-20 gap-52">
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
        icon={documentsIcon}
        title="내 플랜 저장"
        subtitle="여행 예산을 저장하고 언제든 다시 불러오기"
      />
    </section>
  );
}
