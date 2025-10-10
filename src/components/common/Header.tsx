import Link from "next/link";
import Image from "next/image";
import logoUrl from "@/assets/icons/logo.svg";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-50  w-full max-w-screen h-18 flex items-center justify-between px-10 bg-transparent">
      <div className="flex items-center justify-center gap-20">
        <Link href="/">
          <Image src={logoUrl} alt="logo" width={105} height={32} />
        </Link>
        <nav>
          <ul className="flex items-center justify-center gap-10 text-primary text-sm">
            <li>
              <Link href="/planner">예산 플래너</Link>
            </li>
            <li>
              <Link href="/exchange">환율 계산기</Link>
            </li>
            <li>
              <Link href="/community">커뮤니티</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex items-center justify-center gap-2">
        <Link
          href="/"
          className="text-primary text-xs bg-transparent px-3 py-2 rounded-full border border-primary hover:bg-gray-100"
        >
          로그인
        </Link>
        <Link
          href="/"
          className="text-white text-xs bg-primary px-4 py-2 rounded-full border border-primary hover:brightness-130"
        >
          회원가입
        </Link>
      </div>
    </header>
  );
}
