import { DINO_POOL, SAVE_KEY, SHARDS_PER_HATCH } from "@/lib/constants";
import type { Level, SaveData } from "@/lib/types";

export function createInitialSave(): SaveData {
  return {
    version: 1,
    unlockedLevel: 1,
    levels: {},
    shards: 0,
    dinosaursUnlocked: [],
    lastPlayedAt: Date.now()
  };
}

export function loadSave(): SaveData {
  if (typeof window === "undefined") return createInitialSave();

  const raw = window.localStorage.getItem(SAVE_KEY);
  if (!raw) return createInitialSave();

  try {
    const parsed = JSON.parse(raw) as SaveData;
    if (parsed.version !== 1) return createInitialSave();
    return parsed;
  } catch {
    return createInitialSave();
  }
}

export function persistSave(save: SaveData): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SAVE_KEY, JSON.stringify(save));
}

function calcStars(hintsUsed: number): 0 | 1 | 2 | 3 {
  if (hintsUsed <= 0) return 3;
  if (hintsUsed === 1) return 2;
  return 1;
}

export function applyReward(params: {
  save: SaveData;
  level: Level;
  hintsUsed: number;
  durationMs?: number;
}): SaveData {
  const { save, level, hintsUsed, durationMs } = params;
  const levelIdKey = String(level.id);
  const stars = calcStars(hintsUsed);
  const existing = save.levels[levelIdKey];
  const baseShards = level.reward.shards;
  const bonusShards = hintsUsed === 0 ? level.reward.bonusNoHint : 0;
  const gainedShards = baseShards + bonusShards;

  const bestTimeMs =
    existing?.bestTimeMs === undefined
      ? durationMs
      : durationMs === undefined
        ? existing.bestTimeMs
        : Math.min(existing.bestTimeMs, durationMs);

  const nextSave: SaveData = {
    ...save,
    shards: save.shards + gainedShards,
    unlockedLevel: Math.max(save.unlockedLevel, Math.min(level.id + 1, 20)),
    levels: {
      ...save.levels,
      [levelIdKey]: {
        cleared: true,
        stars: Math.max(existing?.stars ?? 0, stars) as 0 | 1 | 2 | 3,
        hintsUsed: existing ? Math.min(existing.hintsUsed, hintsUsed) : hintsUsed,
        bestTimeMs
      }
    },
    lastPlayedAt: Date.now()
  };

  return nextSave;
}

export function canHatch(save: SaveData): boolean {
  return save.shards >= SHARDS_PER_HATCH && save.dinosaursUnlocked.length < DINO_POOL.length;
}

export function hatchOneDino(save: SaveData): { save: SaveData; dinoId: string | null } {
  if (!canHatch(save)) return { save, dinoId: null };

  const nextDino = DINO_POOL.find((id) => !save.dinosaursUnlocked.includes(id));
  if (!nextDino) return { save, dinoId: null };

  return {
    dinoId: nextDino,
    save: {
      ...save,
      shards: save.shards - SHARDS_PER_HATCH,
      dinosaursUnlocked: [...save.dinosaursUnlocked, nextDino],
      lastPlayedAt: Date.now()
    }
  };
}

export function resetSave(): SaveData {
  const clean = createInitialSave();
  persistSave(clean);
  return clean;
}
