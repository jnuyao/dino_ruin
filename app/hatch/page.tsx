"use client";

import Link from "next/link";
import { useState } from "react";

import PrimaryButton from "@/components/PrimaryButton";
import { SHARDS_PER_HATCH } from "@/lib/constants";
import { canHatch } from "@/lib/save";
import { useSave } from "@/lib/useSave";

export default function HatchPage() {
  const { save, hydrated, hatch } = useSave();
  const [result, setResult] = useState<string | null>(null);

  if (!hydrated) return <div className="stone-panel p-6">加载中...</div>;

  const ready = canHatch(save);
  const progress = Math.min((save.shards / SHARDS_PER_HATCH) * 100, 100);

  return (
    <div className="space-y-5">
      <section className="stone-panel p-5 sm:p-6">
        <h1 className="ruin-title text-2xl font-black">孵蛋大厅</h1>
        <p className="mt-1 text-sm text-ruinsStone/75">当碎片足够时，遗迹孵化台会唤醒一只新恐龙。</p>

        <div className="mt-5 grid gap-4 md:grid-cols-[1fr_1.2fr]">
          <div className="flex items-center justify-center rounded-2xl border border-amber-300/50 bg-amber-50/70 p-6">
            <div className={`egg-pulse h-36 w-28 rounded-[50%_50%_46%_46%] border-4 border-amber-300 bg-white`} />
          </div>

          <div className="space-y-3">
            <div className="level-chip border-ember/25 bg-white/80">当前碎片: {save.shards}</div>
            <div className="level-chip border-ruinsStone/20 bg-white/80">每次孵蛋消耗: {SHARDS_PER_HATCH}</div>
            <div className="h-2 overflow-hidden rounded-full bg-ruinsStone/15">
              <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-ember" style={{ width: `${progress}%` }} />
            </div>
            <PrimaryButton
              className={ready ? "egg-pulse" : ""}
              disabled={!ready}
              onClick={() => {
                const dinoId = hatch();
                setResult(dinoId);
                if (dinoId) {
                  console.log("hatch", { dino_id: dinoId, shards_spent: SHARDS_PER_HATCH });
                }
              }}
            >
              立即孵蛋
            </PrimaryButton>
          </div>
        </div>
      </section>

      {result && <div className="stone-panel border border-jungle/20 bg-jungle/10 p-4">解锁成功: {result}</div>}

      <Link href="/dex">
        <PrimaryButton variant="ghost">去图鉴查看</PrimaryButton>
      </Link>
    </div>
  );
}
