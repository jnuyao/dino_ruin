import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type Props = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "ghost" | "danger";
  }
>;

export default function PrimaryButton({ children, variant = "primary", className = "", ...props }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-bold tracking-wide transition duration-150 disabled:cursor-not-allowed disabled:opacity-45";

  const tone =
    variant === "primary"
      ? "border border-jungle/40 bg-jungle text-white shadow-[0_6px_18px_rgba(47,111,70,0.28)] hover:-translate-y-0.5 hover:bg-jungle/95"
      : variant === "danger"
        ? "border border-red-300 bg-red-50 text-red-700 hover:bg-red-100"
        : "border border-ruinsStone/25 bg-white/80 text-ruinsStone hover:bg-white";

  return (
    <button className={`${base} ${tone} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
