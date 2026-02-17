import PrimaryButton from "@/components/PrimaryButton";

type Props = {
  onSubmit: () => void;
  onReset: () => void;
};

export default function SubmitBar({ onSubmit, onReset }: Props) {
  return (
    <div className="stone-panel flex flex-wrap items-center gap-2 p-3">
      <PrimaryButton className="min-w-32" onClick={onSubmit}>
        提交机关
      </PrimaryButton>
      <PrimaryButton variant="ghost" onClick={onReset}>
        重置摆放
      </PrimaryButton>
    </div>
  );
}
