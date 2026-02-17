import DragToBucketsLevel from "@/components/levels/DragToBucketsLevel";
import DragToSlotsLevel from "@/components/levels/DragToSlotsLevel";
import SelectCardsLevel from "@/components/levels/SelectCardsLevel";
import type { DragToBucketsState, DragToSlotsState, Level, LevelState, SelectCardsState } from "@/lib/types";

type Props = {
  level: Level;
  state: LevelState;
  setState: (state: LevelState) => void;
};

export default function LevelRenderer({ level, state, setState }: Props) {
  if (level.type === "select_cards") {
    return (
      <SelectCardsLevel
        cards={level.ui.cards}
        state={state as SelectCardsState}
        setState={(next) => setState(next)}
      />
    );
  }

  if (level.type === "drag_to_slots") {
    return (
      <DragToSlotsLevel
        cards={level.ui.cards}
        slots={level.ui.slots ?? []}
        state={state as DragToSlotsState}
        setState={(next) => setState(next)}
      />
    );
  }

  return (
    <DragToBucketsLevel
      cards={level.ui.cards}
      buckets={level.ui.buckets ?? []}
      state={state as DragToBucketsState}
      setState={(next) => setState(next)}
    />
  );
}
