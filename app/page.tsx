"use client";

import Link from "next/link";

import PrimaryButton from "@/components/PrimaryButton";
import { SHARDS_PER_HATCH } from "@/lib/constants";
import { levels } from "@/lib/levels";
import { canHatch } from "@/lib/save";
import { useSave } from "@/lib/useSave";

export default function HomePage() {
  const { save, hydrated, stats } = useSave();

  if (!hydrated) {
    return <div className="stone-panel p-6 text-lg font-semibold">加载进度中...</div>;
  }

  const hatchReady = canHatch(save);
  const hatchProgress = Math.min((save.shards / SHARDS_PER_HATCH) * 100, 100);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="stone-panel p-5 sm:p-6">
          <h1 className="ruin-title text-3xl font-black">开始闯关</h1>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="level-chip border-jungle/20 bg-jungle/10">
              <div className="text-xs text-ruinsStone/70">已通关</div>
              <div className="text-2xl font-black text-jungle">{stats.clearedCount}/20</div>
            </div>
            <div className="level-chip border-ember/25 bg-amber-50">
              <div className="text-xs text-ruinsStone/70">碎片库存</div>
              <div className="text-2xl font-black text-ember">{save.shards}</div>
            </div>
            <div className="level-chip border-ruinsStone/20 bg-white/80">
              <div className="text-xs text-ruinsStone/70">已解锁恐龙</div>
              <div className="text-2xl font-black">{save.dinosaursUnlocked.length}</div>
            </div>
          </div>
        </div>

        <div className="stone-panel p-5">
          <div className="text-sm font-bold text-ruinsStone/80">下一步</div>
          <div className="mt-2 text-lg font-black">{hatchReady ? "去孵蛋" : "去开门"}</div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-ruinsStone/15">
            <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-ember" style={{ width: `${hatchProgress}%` }} />
          </div>
          <div className="mt-2 text-xs text-ruinsStone/70">碎片 {save.shards}/{SHARDS_PER_HATCH}</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {hatchReady ? (
              <Link href="/hatch">
                <PrimaryButton className="egg-pulse">去孵蛋</PrimaryButton>
              </Link>
            ) : (
              <PrimaryButton disabled>去孵蛋</PrimaryButton>
            )}
            <Link href="/dex">
              <PrimaryButton variant="ghost">查看图鉴</PrimaryButton>
            </Link>
          </div>
        </div>
      </section>

      <section className="stone-panel p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="ruin-title text-xl font-black">遗迹门阵</h2>
          <span className="text-xs text-ruinsStone/70">点亮下一门</span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
          {levels.map((level, index) => {
            const cleared = Boolean(save.levels[String(level.id)]?.cleared);
            const unlocked = level.id <= save.unlockedLevel;
            const base = cleared
              ? "border-jungle/35 bg-jungle/10"
              : unlocked
                ? "border-amber-400/50 bg-amber-50"
                : "border-ruinsStone/20 bg-white/45 opacity-70";

            const content = (
              <>
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold">
                  <span className={`status-dot ${cleared ? "bg-jungle" : unlocked ? "bg-ember" : "bg-ruinsStone/35"}`} />
                  <span>{cleared ? "通关" : unlocked ? "可玩" : "锁定"}</span>
                </div>
                <div className="text-2xl font-black">{level.id}</div>
                <div className="mt-1 text-xs text-ruinsStone/75">{unlocked ? "点我进入" : ""}</div>
              </>
            );

            if (!unlocked) {
              return (
                <div key={level.id} className={`map-node ${base}`} style={{ animationDelay: `${index * 40}ms` }}>
                  {content}
                </div>
              );
            }

            return (
              <Link
                key={level.id}
                href={`/level/${level.id}`}
                className={`map-node ${base}`}
                style={{ animationDelay: `${index * 40}ms` }}
              >
                {content}
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
