import rawLevels from "@/data/levels.json";
import type { Level } from "@/lib/types";

export const levels = rawLevels as Level[];

export function getLevel(id: number): Level | undefined {
  return levels.find((level) => level.id === id);
}
