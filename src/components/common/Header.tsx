"use client";

import Link from "next/link";
import Image from "next/image";
import logoUrl from "@/assets/icons/logo.svg";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true); // 홈을 제외한 나머지 페이지는 흰색 배경
      return;
    }

    // 홈일 때만 히어로 높이 기준으로 전환
    const hero = document.getElementById("hero");
    const headerHeight = 80; // 헤더 높이
    // 스크롤 위치가 이 값을 넘어가면 헤더 스타일 바꾸는 기준점
    // hero.offsetHegiht - headerHeight = 750 - 70
    const threshold = (hero?.offsetHeight ?? 0) - headerHeight;

    const onScroll = () => {
      setScrolled(window.scrollY > Math.max(0, threshold));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // 헤더 메뉴
  const navItems = [
    { label: "예산 플래너", href: "/planner" },
    { label: "환율 계산기", href: "/exchange" },
    { label: "커뮤니티", href: "/community" },
  ];

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 z-50 w-full px-20 flex items-center justify-between transition-colors",
        // 홈이면서 아직 히어로 구간 -> 투명 배경
        isHome && !scrolled && "bg-transparent",
        // 그 외 -> 흰색 배경 + 그림자
        (!isHome || scrolled) && "bg-white/90 shadow-sm backdrop-blur"
      )}
      style={{ height: 70 }}
    >
      <div className="flex items-center justify-center gap-22">
        <Link href="/">
          <Image src={logoUrl} alt="logo" width={105} height={32} />
        </Link>

        <nav>
          <ul className="flex items-center justify-center gap-14 text-primary text-[13px]">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href); // 현재 경로 포함 여부 확인

              return (
                <li key={item.href} className="relative">
                  <Link href={item.href}>{item.label}</Link>

                  {/* 밑줄 인디케이터 */}
                  {isActive && (
                    <span className="absolute left-0 right-0 -bottom-[2px] h-[2px] bg-primary rounded-full"></span>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* 로그인 / 회원가입 */}
      <div className="flex items-center justify-center gap-2">
        <Link
          href="/login"
          className="text-primary text-xs bg-transparent px-3 py-2 rounded-full border border-primary hover:bg-gray-100"
        >
          로그인
        </Link>
        <Link
          href="/signup"
          className="text-white text-xs bg-primary px-4 py-2 rounded-full border border-primary hover:brightness-130"
        >
          회원가입
        </Link>
      </div>
    </header>
  );
}
