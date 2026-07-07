export interface VocabItem {
  word: string;
  reading: string;
  meaning: string;
  example?: string;
  exampleMeaning?: string;
  category: string;
}

export interface KanjiItem {
  kanji: string;
  onyomi: string;
  kunyomi: string;
  meaning: string;
  strokes: number;
  examples: string[];
  category: string;
}

export interface GrammarItem {
  pattern: string;
  meaning: string;
  explanation: string;
  examples: { jp: string; en: string }[];
  level: string;
}

export interface TestQuestion {
  id: number;
  type: "vocab" | "kanji" | "grammar" | "reading";
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface LevelData {
  level: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  kanjiCount: string;
  vocabCount: string;
  grammarCount: string;
  studyHours: string;
  vocab: VocabItem[];
  kanji: KanjiItem[];
  grammar: GrammarItem[];
  test: TestQuestion[];
}
