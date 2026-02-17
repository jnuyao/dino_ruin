"use client";

import PrimaryButton from "@/components/PrimaryButton";
import { useSave } from "@/lib/useSave";

export default function ParentPage() {
  const { save, hydrated, reset } = useSave();

  if (!hydrated) return <div className="stone-panel p-6">加载中...</div>;

  const cleared = Object.values(save.levels).filter((v) => v.cleared).length;

  return (
    <div className="space-y-4">
      <h1 className="ruin-title text-2xl font-black">家长页</h1>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="stone-panel p-4">
          <div className="text-xs text-ruinsStone/70">当前解锁关卡</div>
          <div className="text-2xl font-black">{save.unlockedLevel}</div>
        </div>
        <div className="stone-panel p-4">
          <div className="text-xs text-ruinsStone/70">已通关数量</div>
          <div className="text-2xl font-black">{cleared}</div>
        </div>
        <div className="stone-panel p-4">
          <div className="text-xs text-ruinsStone/70">碎片数量</div>
          <div className="text-2xl font-black">{save.shards}</div>
        </div>
      </div>

      <div className="stone-panel p-4">
        <div className="mb-2 text-sm font-bold">危险操作</div>
        <PrimaryButton variant="danger" onClick={reset}>
          重置存档
        </PrimaryButton>
      </div>
    </div>
  );
}
