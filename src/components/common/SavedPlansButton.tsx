"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import closeIcon from "@/assets/icons/close.svg";

type SavedBudget = { code: string; rows: { key: string; value: number }[] };

export default function SavedPlansButton() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<{ code: string; total: number }[]>([]);

  useEffect(() => {
    // triply:budget:CODE 형태로 저장된 키들을 수집
    const list: { code: string; total: number }[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i) || "";
      if (!k.startsWith("triply:budget:")) continue;
      const code = k.split(":").pop() || "";
      try {
        const saved: SavedBudget = JSON.parse(
          localStorage.getItem(k) || "null"
        );
        const total = (saved?.rows || []).reduce(
          (s, r) => s + Number(r.value || 0),
          0
        );
        list.push({ code, total });
      } catch {}
    }
    // 최신 저장순으로 보이게 정렬(선택)
    list.sort((a, b) => a.code.localeCompare(b.code));
    setItems(list);
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className=" bg-primary text-white text-xs rounded-full px-4 py-2 hover:brightness-130 transition"
      >
        내 플랜
      </button>

      {open && (
        <div className="fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-6 top-20 w-[320px] bg-white rounded-2xl shadow-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-primary">저장된 플랜</p>
              <button
                className="text-xs text-gray-500 hover:text-gray-700"
                onClick={() => setOpen(false)}
              >
                <Image
                  src={closeIcon}
                  alt="닫기 아이콘"
                  width={18}
                  height={18}
                  className="cursor-pointer"
                />
              </button>
            </div>

            {items.length === 0 ? (
              <p className="text-xs text-gray-500">
                아직 저장된 플랜이 없어요.
              </p>
            ) : (
              <ul className="space-y-2 max-h-[300px] overflow-auto">
                {items.map((it) => (
                  <li
                    key={it.code}
                    className="border border-gray-200 rounded-lg px-3 py-2 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium">{it.code}</p>
                      <p className="text-[11px] text-gray-500">
                        총 외화: {it.total.toLocaleString()} {it.code}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/planner/budget/${it.code}`}
                        className="text-xs text-primary underline"
                      >
                        수정
                      </Link>
                      <Link
                        href={`/planner/result/${it.code}`}
                        className="text-xs text-primary underline"
                      >
                        결과
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}
