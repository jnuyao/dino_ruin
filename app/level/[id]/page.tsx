"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import HintPanel from "@/components/HintPanel";
import LevelRenderer from "@/components/LevelRenderer";
import PrimaryButton from "@/components/PrimaryButton";
import SubmitBar from "@/components/SubmitBar";
import ClearModal from "@/components/ClearModal";
import { evaluateLevel } from "@/lib/evaluator";
import { getLevel } from "@/lib/levels";
import type { LevelState, SelectCardsState } from "@/lib/types";
import { useSave } from "@/lib/useSave";

export default function LevelPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const level = getLevel(id);
  const router = useRouter();
  const { save, hydrated, completeLevel } = useSave();

  const initial = useMemo(() => {
    if (!level) return { selectedIds: [] } as SelectCardsState;
    if (level.type === "select_cards") return { selectedIds: [] } as SelectCardsState;
    if (level.type === "drag_to_slots") return { slots: new Array(level.ui.slots?.length ?? 2).fill(null) };
    const buckets = Object.fromEntries((level.ui.buckets ?? []).map((bucket) => [bucket.id, []]));
    return { buckets };
  }, [level]);

  const [state, setState] = useState<LevelState>(initial as LevelState);
  const [feedback, setFeedback] = useState<string>("");
  const [hintsShown, setHintsShown] = useState(0);
  const [startedAt] = useState(() => Date.now());
  const [showClearModal, setShowClearModal] = useState(false);
  const [gainedShards, setGainedShards] = useState(0);

  if (!level) return <div className="stone-panel p-6">关卡不存在。</div>;
  if (!hydrated) return <div className="stone-panel p-6">加载进度中...</div>;

  if (id > save.unlockedLevel) {
    return (
      <div className="stone-panel space-y-4 p-6">
        <div className="text-xl font-black">还没解锁</div>
        <p className="text-sm text-ruinsStone/70">先通关前一关</p>
        <Link href="/">
          <PrimaryButton>返回地图</PrimaryButton>
        </Link>
      </div>
    );
  }

  const howTo =
    level.type === "select_cards"
      ? "点石板"
      : level.type === "drag_to_slots"
        ? "拖到槽里"
        : "拖到分组桶";
  const target =
    level.type === "select_cards"
      ? `${level.ui.cards.length} 选对`
      : level.type === "drag_to_slots"
        ? `${level.ui.slots?.length ?? 2} 个槽填满`
        : `${level.ui.buckets?.length ?? 2} 个桶分对`;

  const submit = () => {
    if (showClearModal) return;
    const result = evaluateLevel(level, state);
    console.log("level_submit", { level_id: level.id, ok: result.ok });
    setFeedback(result.feedback);

    if (!result.ok) return;

    const durationMs = Date.now() - startedAt;
    completeLevel({ level, hintsUsed: hintsShown, durationMs });
    const gained = level.reward.shards + (hintsShown === 0 ? level.reward.bonusNoHint : 0);
    setGainedShards(gained);
    setShowClearModal(true);
    console.log("level_clear", { level_id: level.id, hints_used: hintsShown, duration_ms: durationMs });
  };

  const reset = () => {
    setState(initial as LevelState);
    setFeedback("");
  };

  const rewardInfo = `碎片 +${level.reward.shards} / 无提示再 +${level.reward.bonusNoHint}`;

  const speakTask = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const text = `第${level.id}关。${level.title}。任务是：${level.ui.prompt}。`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-5">
      <section className="stone-panel p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-ruinsStone/70">Level {level.id}</div>
            <h1 className="ruin-title mt-1 text-2xl font-black">{level.title}</h1>
            <p className="mt-1 text-sm text-ruinsStone/80">{level.story}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="level-chip border-amber-300/70 bg-amber-50 text-amber-800">{rewardInfo}</div>
            <PrimaryButton variant="ghost" onClick={speakTask}>
              读任务
            </PrimaryButton>
          </div>
        </div>
        <div className="mt-4 rounded-xl bg-white/75 px-4 py-3">
          <div className="text-xs font-bold text-ruinsStone/60">任务</div>
          <div className="mt-1 text-lg font-black text-ruinsStone">{level.ui.prompt}</div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <div className="rounded-xl border border-ruinsStone/15 bg-white/65 px-3 py-2 text-center text-sm font-bold">1 看任务</div>
          <div className="rounded-xl border border-ruinsStone/15 bg-white/65 px-3 py-2 text-center text-sm font-bold">2 {howTo}</div>
          <div className="rounded-xl border border-ruinsStone/15 bg-white/65 px-3 py-2 text-center text-sm font-bold">3 点提交</div>
        </div>
        <div className="mt-2 text-xs font-semibold text-ruinsStone/65">目标: {target}</div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="stone-panel p-4 sm:p-5">
          <LevelRenderer level={level} state={state} setState={setState} />
        </div>

        <div className="space-y-4">
          <HintPanel
            hints={level.hints}
            shownCount={hintsShown}
            onUseHint={() => {
              if (hintsShown >= 3) return;
              const next = hintsShown + 1;
              setHintsShown(next);
              console.log("hint_used", { level_id: level.id, hint_index: next });
            }}
          />
          <SubmitBar onSubmit={submit} onReset={reset} />
        </div>
      </section>

      {feedback && (
        <div
          className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
            feedback.includes("成功") || feedback.includes("正确") || feedback.includes("启动")
              ? "border-jungle/30 bg-jungle/10 text-jungle"
              : "border-amber-300/60 bg-amber-50 text-amber-800"
          }`}
        >
          {feedback}
        </div>
      )}

      <ClearModal
        open={showClearModal}
        levelId={level.id}
        levelTitle={level.title}
        gainedShards={gainedShards}
        onDone={() => {
          setShowClearModal(false);
          router.push("/");
        }}
      />
    </div>
  );
}
