import Link from "next/link";
import Image from "next/image";
import logoUrl from "@/assets/icons/logo.svg";

export default function Footer() {
  return (
    <footer className="w-full bg-[#ECEFEC]">
      <div className="px-6 sm:px-6 lg:px-24 py-10 sm:py-12 lg:py-14">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* 로고 */}
          <Link href="/" className="shrink-0">
            <Image src={logoUrl} alt="logo" width={100} height={30} />
          </Link>

          <nav className="text-primary text-[13px] max-[500px]:text-[12px]">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-x-8">
              <li>
                <Link href="/planner" className="hover:underline">
                  예산 플래너
                </Link>
              </li>
              <li>
                <Link href="/exchange" className="hover:underline">
                  환율 계산기
                </Link>
              </li>
              <li>
                <Link href="/guide" className="hover:underline">
                  이용 가이드
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div
          className="
            mt-8 sm:mt-10 border-t border-white/80 pt-6
            flex flex-col items-center gap-2
            sm:flex-row sm:items-center sm:justify-between sm:gap-4
            text-[12px] max-[500px]:text-[11px] text-gray-600
            text-center sm:text-left
          "
        >
          <p>TRIPLY — 한 달 살기 예산 플래너 & 환율 계산기</p>
          <p>© 2025 TRIPLY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
