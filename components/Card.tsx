import type { CardItem } from "@/lib/types";

type Props = {
  item: CardItem;
  selected?: boolean;
  draggable?: boolean;
  onClick?: () => void;
  onDragStart?: (id: string) => void;
};

export default function Card({ item, selected, draggable, onClick, onDragStart }: Props) {
  return (
    <button
      type="button"
      className={`relative rounded-2xl border px-3 py-4 text-lg font-black shadow-sm transition duration-150 ${
        selected
          ? "border-ember bg-gradient-to-br from-amber-100 to-orange-100 text-amber-800"
          : "border-ruinsStone/25 bg-white/80 text-ruinsStone hover:-translate-y-0.5 hover:bg-white"
      }`}
      onClick={onClick}
      draggable={draggable}
      onDragStart={(event) => {
        event.dataTransfer.setData("text/plain", item.id);
        onDragStart?.(item.id);
      }}
    >
      <span className="pointer-events-none absolute right-2 top-2 text-[10px] text-ruinsStone/40">石板</span>
      {item.label}
    </button>
  );
}
