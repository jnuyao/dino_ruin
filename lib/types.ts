export type LevelType = "select_cards" | "drag_to_slots" | "drag_to_buckets";

export type CardItem = {
  id: string;
  label: string;
  value?: number;
  tag?: string;
};

export type SelectCardsRule = {
  mode: "select_exact_ids";
  ids: string[];
};

export type DragToSlotsRule = {
  mode: "slot_exact_match";
  slotTargets: string[];
};

export type DragToBucketsRule = {
  mode: "bucket_exact_match";
  bucketItems: Record<string, string[]>;
};

export type Level = {
  id: number;
  title: string;
  story: string;
  type: LevelType;
  ui: {
    cards: CardItem[];
    prompt?: string;
    slots?: { id: string; label: string }[];
    buckets?: { id: string; label: string }[];
  };
  rule: SelectCardsRule | DragToSlotsRule | DragToBucketsRule;
  hints: string[];
  reward: {
    shards: number;
    bonusNoHint: number;
  };
};

export type SelectCardsState = {
  selectedIds: string[];
};

export type DragToSlotsState = {
  slots: Array<string | null>;
};

export type DragToBucketsState = {
  buckets: Record<string, string[]>;
};

export type LevelState = SelectCardsState | DragToSlotsState | DragToBucketsState;

export type LevelProgress = {
  cleared: boolean;
  stars: 0 | 1 | 2 | 3;
  hintsUsed: number;
  bestTimeMs?: number;
};

export type SaveData = {
  version: 1;
  unlockedLevel: number;
  levels: Record<string, LevelProgress>;
  shards: number;
  dinosaursUnlocked: string[];
  lastPlayedAt: number;
};

export type EvaluateResult = {
  ok: boolean;
  feedback: string;
  kind: "soft_feedback" | "hard_feedback";
};
