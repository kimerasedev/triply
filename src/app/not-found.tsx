"use client";

import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100dvh-265.38px)] flex flex-col items-center justify-center text-center">
      <DotLottieReact
        src="https://lottie.host/50ae32fb-e9db-4a25-94c4-2017efe5fda4/jWTgFRlKkl.lottie"
        loop
        autoplay
        className="w-40 mb-8"
      />
      <h1 className="text-3xl font-bold text-primary mb-2">
        페이지를 찾을 수 없습니다.
      </h1>
      <p className="text-text-secondary text-sm mb-8">
        잘못된 주소이거나 존재하지 않는 페이지입니다.
      </p>

      <Link
        href="/"
        className="text-sm text-primary underline hover:text-primary-dark"
      >
        홈으로 돌아가기 →
      </Link>
    </div>
  );
}
