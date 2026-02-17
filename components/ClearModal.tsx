"use client";

import { useEffect } from "react";

type Props = {
  open: boolean;
  levelId: number;
  levelTitle: string;
  gainedShards: number;
  onDone: () => void;
};

export default function ClearModal({ open, levelId, levelTitle, gainedShards, onDone }: Props) {
  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => onDone(), 2300);
    return () => window.clearTimeout(timer);
  }, [open, onDone]);

  if (!open) return null;

  const shardBursts = Math.max(1, Math.min(gainedShards, 6));

  return (
    <div className="clear-overlay" role="dialog" aria-modal="true">
      <div className="clear-bag">
        <span className="clear-bag-label">碎片袋</span>
      </div>

      <div className="clear-modal">
        <div className="clear-door-frame">
          <div className="clear-door clear-door-left" />
          <div className="clear-door clear-door-right" />
          <div className="clear-glow" />
        </div>

        <div className="mt-4 text-center">
          <div className="text-xs font-bold uppercase tracking-wider text-ruinsStone/70">Level {levelId}</div>
          <h2 className="ruin-title mt-1 text-3xl font-black">机关开启</h2>
          <p className="mt-1 text-sm text-ruinsStone/75">{levelTitle}</p>
          <div className="mt-3 inline-flex rounded-full border border-amber-300/70 bg-amber-50 px-4 py-1 text-sm font-bold text-amber-800">
            碎片 +{gainedShards}
          </div>
        </div>

        {Array.from({ length: shardBursts }).map((_, index) => (
          <span
            key={index}
            className="shard-fly"
            style={{ animationDelay: `${0.55 + index * 0.12}s` }}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}
