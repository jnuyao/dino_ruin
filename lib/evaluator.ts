import type {
  DragToBucketsRule,
  DragToBucketsState,
  DragToSlotsRule,
  DragToSlotsState,
  EvaluateResult,
  Level,
  SelectCardsRule,
  SelectCardsState
} from "@/lib/types";

const asSet = (items: string[]) => new Set(items);

const sameItems = (a: string[], b: string[]) => {
  if (a.length !== b.length) return false;
  const target = asSet(b);
  return a.every((id) => target.has(id));
};

function evalSelect(rule: SelectCardsRule, state: SelectCardsState): EvaluateResult {
  if (state.selectedIds.length === 0) {
    return { ok: false, kind: "hard_feedback", feedback: "先选至少一张卡片。" };
  }

  if (sameItems(state.selectedIds, rule.ids)) {
    return { ok: true, kind: "soft_feedback", feedback: "机关成功启动。" };
  }

  return {
    ok: false,
    kind: "soft_feedback",
    feedback: "还差一点点，再检查是否多选或漏选了。"
  };
}

function evalSlots(rule: DragToSlotsRule, state: DragToSlotsState): EvaluateResult {
  if (state.slots.some((slot) => !slot)) {
    return { ok: false, kind: "hard_feedback", feedback: "还有槽位是空的。" };
  }

  const exact = state.slots.every((id, index) => id === rule.slotTargets[index]);
  if (exact) {
    return { ok: true, kind: "soft_feedback", feedback: "槽位匹配成功。" };
  }

  const swapped =
    state.slots.length === 2 &&
    state.slots[0] === rule.slotTargets[1] &&
    state.slots[1] === rule.slotTargets[0];

  if (swapped) {
    return { ok: true, kind: "soft_feedback", feedback: "顺序不同但也正确。" };
  }

  return { ok: false, kind: "hard_feedback", feedback: "槽位放置还不正确。" };
}

function evalBuckets(rule: DragToBucketsRule, state: DragToBucketsState): EvaluateResult {
  const bucketIds = Object.keys(rule.bucketItems);

  for (const bucketId of bucketIds) {
    const required = rule.bucketItems[bucketId];
    const actual = state.buckets[bucketId] ?? [];
    if (!sameItems(actual, required)) {
      return { ok: false, kind: "soft_feedback", feedback: "分组还需要再调整。" };
    }
  }

  return { ok: true, kind: "soft_feedback", feedback: "分类完全正确。" };
}

export function evaluateLevel(level: Level, state: unknown): EvaluateResult {
  switch (level.type) {
    case "select_cards":
      return evalSelect(level.rule as SelectCardsRule, state as SelectCardsState);
    case "drag_to_slots":
      return evalSlots(level.rule as DragToSlotsRule, state as DragToSlotsState);
    case "drag_to_buckets":
      return evalBuckets(level.rule as DragToBucketsRule, state as DragToBucketsState);
    default:
      return { ok: false, kind: "hard_feedback", feedback: "暂不支持的关卡类型。" };
  }
}
