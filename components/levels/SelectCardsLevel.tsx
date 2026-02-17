import Card from "@/components/Card";
import type { CardItem, SelectCardsState } from "@/lib/types";

type Props = {
  cards: CardItem[];
  state: SelectCardsState;
  setState: (state: SelectCardsState) => void;
};

export default function SelectCardsLevel({ cards, state, setState }: Props) {
  const toggle = (id: string) => {
    const next = state.selectedIds.includes(id)
      ? state.selectedIds.filter((item) => item !== id)
      : [...state.selectedIds, id];
    setState({ selectedIds: next });
  };

  return (
    <div>
      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-ruinsStone/65">点击选择石板</div>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            item={card}
            selected={state.selectedIds.includes(card.id)}
            onClick={() => toggle(card.id)}
          />
        ))}
      </div>
    </div>
  );
}
