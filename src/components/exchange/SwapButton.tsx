"use client";

import ExchangeIcon from "@/assets/icons/Exchange";

export default function SwapButton({ onClick }: { onClick: () => void }) {
  return (
    <>
      {/* 스왑 버튼 */}
      <button
        onClick={onClick}
        className="
          hidden md:grid
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          size-12 rounded-full bg-primary text-primary-dark place-items-center
          shadow-md hover:brightness-110 transition
        "
        title="통화 전환"
        aria-label="통화 전환"
      >
        <ExchangeIcon className="text-white -scale-75" />
      </button>

      {/* 모바일 하단 버튼 */}
      <div className="md:hidden mt-6 flex justify-center">
        <button
          onClick={onClick}
          className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-dark px-5 py-2 shadow hover:brightness-110"
          aria-label="통화 전환"
        >
          <ExchangeIcon className="text-white -scale-75" />
          <span className="text-sm text-white">통화 전환</span>
        </button>
      </div>
    </>
  );
}
