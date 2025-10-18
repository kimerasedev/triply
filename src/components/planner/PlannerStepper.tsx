"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";

const steps = [
  { key: "select", label: "국가 선택", href: "/planner/select" },
  { key: "budget", label: "예산 입력", href: "/planner/budget" },
  { key: "result", label: "결과 확인", href: "/planner/result" },
];

export default function PlannerStepper() {
  const pathname = usePathname();

  const activeIndex = steps.findIndex((s) => pathname?.startsWith(s.href));
  const isActive = (idx: number) => activeIndex >= idx;

  return (
    <aside className="sticky top-20 hidden md:flex flex-col pr-20 select-none pointer-events-none">
      {steps.map((s, i) => (
        <div key={s.key} className="group">
          <div className="flex items-center gap-3">
            <span
              className={clsx(
                "size-7 rounded-full flex items-center justify-center text-xs font-semibold",
                isActive(i)
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-600"
              )}
            >
              {i + 1}
            </span>
            <span
              className={clsx(
                "text-sm",
                isActive(i) ? "text-primary font-semibold" : "text-gray-500"
              )}
            >
              {s.label}
            </span>
          </div>

          {/* 진행 라인 (마지막은 생략) */}
          {i < steps.length - 1 && (
            <div
              className={clsx(
                "ml-3 h-12 w-[2px]",
                isActive(i + 1) ? "bg-primary/70" : "bg-gray-200"
              )}
            />
          )}
        </div>
      ))}
    </aside>
  );
}
