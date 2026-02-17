import PrimaryButton from "@/components/PrimaryButton";

type Props = {
  hints: string[];
  shownCount: number;
  onUseHint: () => void;
};

export default function HintPanel({ hints, shownCount, onUseHint }: Props) {
  const total = Math.min(hints.length, 3);
  const hasMore = shownCount < total;

  return (
    <div className="stone-panel p-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <div className="text-sm font-bold">提示</div>
          <div className="mt-1 flex gap-1.5">
            {Array.from({ length: total }).map((_, index) => (
              <span
                key={index}
                className={`h-2.5 w-2.5 rounded-full ${index < shownCount ? "bg-ember" : "bg-ruinsStone/20"}`}
              />
            ))}
          </div>
        </div>
        <PrimaryButton variant="ghost" onClick={onUseHint} disabled={!hasMore}>
          使用提示
        </PrimaryButton>
      </div>

      {shownCount > 0 ? (
        <ul className="mt-3 space-y-2 text-sm leading-6">
          {hints.slice(0, shownCount).map((hint, index) => (
            <li key={hint} className="rounded-lg bg-amber-50/80 px-3 py-2">
              {`${index + 1}. ${hint}`}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-ruinsStone/70">卡住就点提示</p>
      )}
    </div>
  );
}
