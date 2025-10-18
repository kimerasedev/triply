"use client";

interface ResultBoxProps {
  loading: boolean;
  resultText: string; // "12,300 KRW" 같은 최종 결과 문자열
  helperLine: string; // "1 USD ≈ 1,234.0000 KRW" 같은 보조 라인
}

export default function ResultBox({
  loading,
  resultText,
  helperLine,
}: ResultBoxProps) {
  return (
    <div className="mt-2">
      <p className="text-xs text-text-secondary">결과</p>
      <div className="mt-2 rounded-lg bg-secondary border border-primary/10 px-4 py-4">
        <p className="text-2xl font-semibold text-primary">
          {loading ? "환율 불러오는 중…" : resultText}
        </p>
      </div>
      <p className="text-xs text-gray-500 mt-2">{helperLine}</p>
    </div>
  );
}
