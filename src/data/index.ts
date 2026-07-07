import { n5Data } from "./n5";
import { n4Data } from "./n4";
import { n3Data } from "./n3";
import { n2Data } from "./n2";
import { n1Data } from "./n1";
import type { LevelData } from "./types";

export const allLevels: LevelData[] = [n5Data, n4Data, n3Data, n2Data, n1Data];

export function getLevelData(level: string): LevelData | undefined {
  return allLevels.find(l => l.level.toLowerCase() === level.toLowerCase());
}

export { n5Data, n4Data, n3Data, n2Data, n1Data };
export type { LevelData, VocabItem, KanjiItem, GrammarItem, TestQuestion } from "./types";
