"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import type { Level, SaveData } from "@/lib/types";
import { applyReward, createInitialSave, hatchOneDino, loadSave, persistSave, resetSave } from "@/lib/save";

export function useSave() {
  const [save, setSave] = useState<SaveData>(() => createInitialSave());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const next = loadSave();
    setSave(next);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    persistSave(save);
  }, [save, hydrated]);

  const completeLevel = useCallback((params: { level: Level; hintsUsed: number; durationMs: number }) => {
    setSave((prev) => applyReward({ save: prev, ...params }));
  }, []);

  const hatch = useCallback(() => {
    let unlocked: string | null = null;
    setSave((prev) => {
      const result = hatchOneDino(prev);
      unlocked = result.dinoId;
      return result.save;
    });
    return unlocked;
  }, []);

  const reset = useCallback(() => {
    setSave(resetSave());
  }, []);

  const stats = useMemo(() => {
    const clearedCount = Object.values(save.levels).filter((item) => item.cleared).length;
    return { clearedCount };
  }, [save]);

  return {
    save,
    hydrated,
    stats,
    completeLevel,
    hatch,
    reset,
    setSave
  };
}
