"use client";

import Link from "next/link";
import Image from "next/image";
import logoUrl from "@/assets/icons/logo.svg";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import SavedPlansButton from "./SavedPlansButton";
import closeIcon from "@/assets/icons/close.svg";
import hamburgerIcon from "@/assets/icons/hamburger.svg";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);

  // 모바일 메뉴 열림 상태
  const [mobileOpen, setMobileOpen] = useState(false);

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

  // 라우트 바뀔 때 모바일 메뉴 자동 닫기
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // 헤더 메뉴
  const navItems = [
    { label: "예산 플래너", href: "/planner" },
    { label: "환율 계산기", href: "/exchange" },
    { label: "이용 가이드", href: "/guide" },
  ];

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 z-50 w-full transition-colors",
        "px-4 sm:px-6 lg:px-20",
        "flex items-center justify-between",
        // 홈이면서 아직 히어로 구간 -> 투명 배경
        isHome && !scrolled && "bg-transparent",
        // 그 외 -> 흰색 배경 + 그림자
        (!isHome || scrolled) && "bg-white/90 shadow-sm backdrop-blur"
      )}
      style={{ height: 70 }}
    >
      {/* 좌측 로고 */}
      <div className="flex items-center gap-4">
        <Link href="/" className="shrink-0">
          <Image src={logoUrl} alt="logo" width={105} height={32} />
        </Link>
      </div>

      {/* 데스크톱: 내비 + 액션 */}
      <div className="hidden lg:flex items-center justify-between gap-10 w-full pl-20">
        <nav>
          <ul className="flex items-center justify-center gap-14 text-primary text-[13px]">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href); // 현재 경로 포함 여부 확인
              return (
                <li key={item.href} className="relative">
                  <Link href={item.href}>{item.label}</Link>
                  {/* 밑줄 인디케이터 */}
                  {isActive && (
                    <span className="absolute left-0 right-0 -bottom-[2px] h-[2px] bg-primary rounded-full" />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center justify-center mr-3">
          <SavedPlansButton />
        </div>
      </div>

      {/* 모바일: 우측 햄버거 버튼 */}
      <button
        type="button"
        className="lg:hidden inline-flex items-center justify-center rounded-md p-2 outline-none focus:ring-2 focus:ring-primary"
        aria-label="메뉴 열기"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((v) => !v)}
      >
        {mobileOpen ? (
          // X 아이콘
          <Image src={closeIcon} alt="닫기 아이콘" width={24} height={24} />
        ) : (
          // 햄버거 아이콘
          <Image
            src={hamburgerIcon}
            alt="햄버거 아이콘"
            width={26}
            height={26}
          />
        )}
      </button>

      {/* 모바일 드롭다운 */}
      {mobileOpen && (
        <div
          className={clsx(
            "lg:hidden absolute top-[70px] inset-x-0",
            "bg-white/95 backdrop-blur shadow-md border-t border-gray-100"
          )}
        >
          <nav className="px-4 py-4">
            <ul className="flex flex-col gap-3 text-primary text-[15px]">
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={clsx(
                        "block w-full rounded-md px-3 py-2",
                        isActive
                          ? "bg-primary/10 font-semibold"
                          : "hover:bg-gray-100"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-gray-100 px-4 py-3 flex items-center gap-2">
            <SavedPlansButton />
          </div>
        </div>
      )}
    </header>
  );
}
