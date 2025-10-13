"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Header from "./Header";
import clsx from "clsx";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      <Header />
      <section
        className={clsx(
          // 홈을 제외한 나머지 페이지는 헤더 높이만큼 공간 확보
          !isHome && "pt-[70px]"
        )}
      >
        {children}
      </section>
      <Footer />
    </>
  );
}
