import { useMemo, useState } from "react";

import Card from "@/components/Card";
import type { CardItem, DragToSlotsState } from "@/lib/types";

type Slot = { id: string; label: string };

type Props = {
  cards: CardItem[];
  slots: Slot[];
  state: DragToSlotsState;
  setState: (state: DragToSlotsState) => void;
};

export default function DragToSlotsLevel({ cards, slots, state, setState }: Props) {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const usedCards = useMemo(() => new Set(state.slots.filter(Boolean) as string[]), [state.slots]);

  const place = (slotIndex: number, cardId: string) => {
    const next = [...state.slots];
    const oldIndex = next.findIndex((id) => id === cardId);
    if (oldIndex >= 0) next[oldIndex] = null;
    next[slotIndex] = cardId;
    setState({ slots: next });
  };

  const clearSlot = (slotIndex: number) => {
    const next = [...state.slots];
    next[slotIndex] = null;
    setState({ slots: next });
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        {slots.map((slot, index) => {
          const card = cards.find((item) => item.id === state.slots[index]);
          return (
            <div
              key={slot.id}
              className="rounded-2xl border-2 border-dashed border-amber-300/70 bg-amber-50/50 p-4 text-center"
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                const cardId = event.dataTransfer.getData("text/plain") || draggingId;
                if (!cardId) return;
                place(index, cardId);
                setDraggingId(null);
              }}
            >
              <div className="text-xs font-bold uppercase tracking-wide text-ruinsStone/65">{slot.label}</div>
              <div className="mt-2 text-2xl font-black">{card?.label ?? "?"}</div>
              {card && (
                <button type="button" className="mt-2 text-xs text-ruinsStone/70 underline" onClick={() => clearSlot(index)}>
                  清空
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div>
        <div className="mb-2 text-xs font-bold uppercase tracking-wide text-ruinsStone/65">可用石板</div>
        <div className="card-grid">
          {cards.map((card) => (
            <Card
              key={card.id}
              item={card}
              draggable
              selected={usedCards.has(card.id)}
              onClick={() => {
                const target = state.slots.findIndex((slot) => !slot);
                if (target >= 0) place(target, card.id);
              }}
              onDragStart={(id) => setDraggingId(id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
