import { useMemo, useState } from "react";

import Card from "@/components/Card";
import type { CardItem, DragToBucketsState } from "@/lib/types";

type Bucket = { id: string; label: string };

type Props = {
  cards: CardItem[];
  buckets: Bucket[];
  state: DragToBucketsState;
  setState: (state: DragToBucketsState) => void;
};

export default function DragToBucketsLevel({ cards, buckets, state, setState }: Props) {
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const cardMap = useMemo(() => Object.fromEntries(cards.map((card) => [card.id, card])), [cards]);
  const assigned = useMemo(
    () =>
      new Set(
        Object.values(state.buckets)
          .flat()
          .filter(Boolean)
      ),
    [state.buckets]
  );

  const assign = (bucketId: string, cardId: string) => {
    const next: Record<string, string[]> = {};
    for (const [key, ids] of Object.entries(state.buckets)) {
      next[key] = ids.filter((id) => id !== cardId);
    }
    next[bucketId] = [...(next[bucketId] ?? []), cardId];
    setState({ buckets: next });
  };

  const remove = (bucketId: string, cardId: string) => {
    const next = { ...state.buckets, [bucketId]: (state.buckets[bucketId] ?? []).filter((id) => id !== cardId) };
    setState({ buckets: next });
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        {buckets.map((bucket) => (
          <div
            key={bucket.id}
            className="min-h-44 rounded-2xl border-2 border-dashed border-jungle/35 bg-green-50/45 p-3"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              const cardId = event.dataTransfer.getData("text/plain") || draggingId;
              if (!cardId) return;
              assign(bucket.id, cardId);
              setDraggingId(null);
            }}
          >
            <div className="mb-2 text-xs font-bold uppercase tracking-wide text-ruinsStone/70">{bucket.label}</div>
            <div className="space-y-2">
              {(state.buckets[bucket.id] ?? []).map((id) => {
                const card = cardMap[id];
                if (!card) return null;
                return (
                  <button
                    key={id}
                    type="button"
                    className="w-full rounded-lg border border-ruinsStone/20 bg-white/90 px-2 py-1.5 text-left text-sm font-semibold"
                    onClick={() => remove(bucket.id, id)}
                  >
                    {card.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="mb-2 text-xs font-bold uppercase tracking-wide text-ruinsStone/65">待分类石板</div>
        <div className="card-grid">
          {cards.map((card) => (
            <Card
              key={card.id}
              item={card}
              draggable
              selected={assigned.has(card.id)}
              onDragStart={(id) => setDraggingId(id)}
              onClick={() => {
                const firstBucket = buckets[0]?.id;
                if (firstBucket) assign(firstBucket, card.id);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
