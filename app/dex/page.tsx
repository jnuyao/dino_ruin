"use client";

import { DINO_POOL } from "@/lib/constants";
import { useSave } from "@/lib/useSave";

export default function DexPage() {
  const { save, hydrated } = useSave();

  if (!hydrated) return <div className="stone-panel p-6">加载中...</div>;

  return (
    <div className="space-y-4">
      <h1 className="ruin-title text-2xl font-black">恐龙图鉴</h1>
      <p className="text-sm text-ruinsStone/75">收集碎片解锁全部图鉴卡片。</p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {DINO_POOL.map((dinoId) => {
          const unlocked = save.dinosaursUnlocked.includes(dinoId);
          return (
            <div
              key={dinoId}
              className={`rounded-2xl border p-4 ${
                unlocked
                  ? "border-jungle/25 bg-gradient-to-br from-green-50 to-emerald-50"
                  : "border-ruinsStone/20 bg-white/60"
              }`}
            >
              <div className="text-xs text-ruinsStone/70">{unlocked ? "已解锁" : "未解锁"}</div>
              <div className="mt-2 text-lg font-black">{unlocked ? dinoId : "????"}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
