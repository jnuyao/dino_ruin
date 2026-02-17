import type { Metadata } from "next";
import Link from "next/link";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Dino Math Ruins",
  description: "机关闯关学数学"
};

const navItems: Array<{ href: "/" | "/hatch" | "/dex" | "/parent"; label: string }> = [
  { href: "/", label: "遗迹地图" },
  { href: "/hatch", label: "孵蛋" },
  { href: "/dex", label: "图鉴" },
  { href: "/parent", label: "家长" }
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="pointer-events-none fixed inset-x-0 top-0 h-28 bg-gradient-to-b from-amber-100/70 to-transparent" />
        <header className="sticky top-0 z-20 border-b border-ruinsStone/10 bg-[#f6ecd0]/85 backdrop-blur-sm">
          <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
            <div>
              <div className="ruin-title text-xl font-black">Dino Math Ruins</div>
              <div className="text-xs text-ruinsStone/70">小探险家数学遗迹</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg border border-ruinsStone/20 bg-white/70 px-3 py-1.5 text-sm font-semibold text-ruinsStone hover:bg-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
