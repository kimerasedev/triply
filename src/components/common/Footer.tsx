import Link from "next/link";
import Image from "next/image";
import logoUrl from "@/assets/icons/logo.svg";

export default function Footer() {
  return (
    <footer className="w-full bg-[#ECEFEC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          {/* 로고 */}
          <Link href="/" className="shrink-0">
            <Image src={logoUrl} alt="logo" width={100} height={30} />
          </Link>

          <div className="space-x-8 font-semibold text-primary text-[13px]">
            <Link href="/planner" className="hover:underline">
              예산 플래너
            </Link>
            <Link href="/exchange" className="hover:underline">
              환율 계산기
            </Link>
            <Link href="/guide" className="hover:underline">
              이용 가이드
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-white/80 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[12px] text-gray-600">
          <p>TRIPLY — 한 달 살기 예산 플래너 & 환율 계산기</p>
          <p>© 2025 TRIPLY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
