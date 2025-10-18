import Image from "next/image";
import guideUrl from "@/assets/images/guide.svg";

export default function GuidePage() {
  return (
    <section className="bg-[#f4fff0] w-full px-80 py-20">
      <h1 className="text-3xl font-bold text-primary mb-4">사용 가이드</h1>
      <div className="flex items-center justify-between">
        <ol className="pl-5 space-y-2 text-sm text-text-primary">
          <li>1. 여행 국가를 선택합니다.</li>
          <li>2. 카테고리별 예산을 외화로 입력합니다.</li>
          <li>3. 자동으로 환율을 적용해 원화로 변환됩니다.</li>
          <li>4. “결과 확인”에서 총합 및 상세내역을 확인합니다.</li>
          <li>5. 상단 “내 플랜”에서 저장된 예산을 불러올 수 있습니다.</li>
        </ol>
        <Image src={guideUrl} alt="가이드 이미지" width={320} height={100} />
      </div>

      <hr className="my-6 text-text-secondary" />
      <p className="text-xs text-text-secondary">
        ※ 한국수출입은행 기준. 영업일 11시 이전 또는 비영업일은 최근 영업일
        기준으로 제공됩니다.
      </p>
    </section>
  );
}
