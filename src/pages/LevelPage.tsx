import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getLevelData, allLevels } from "@/data";
import { BookOpen, PenTool, Languages, GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";
import { VocabSection } from "@/components/learning/VocabSection";
import { KanjiSection } from "@/components/learning/KanjiSection";
import { GrammarSection } from "@/components/learning/GrammarSection";
import { PracticeTest } from "@/components/learning/PracticeTest";

const colorMap: Record<string, { accent: string; bg: string; border: string; badge: string; tabActive: string; heroGradient: string }> = {
  emerald: { accent: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", badge: "bg-emerald-100 text-emerald-700", tabActive: "bg-emerald-600 text-white", heroGradient: "from-emerald-50 via-emerald-50/50 to-transparent" },
  blue: { accent: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", badge: "bg-blue-100 text-blue-700", tabActive: "bg-blue-600 text-white", heroGradient: "from-blue-50 via-blue-50/50 to-transparent" },
  violet: { accent: "text-violet-600", bg: "bg-violet-50", border: "border-violet-200", badge: "bg-violet-100 text-violet-700", tabActive: "bg-violet-600 text-white", heroGradient: "from-violet-50 via-violet-50/50 to-transparent" },
  amber: { accent: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", badge: "bg-amber-100 text-amber-700", tabActive: "bg-amber-600 text-white", heroGradient: "from-amber-50 via-amber-50/50 to-transparent" },
  rose: { accent: "text-rose-600", bg: "bg-rose-50", border: "border-rose-200", badge: "bg-rose-100 text-rose-700", tabActive: "bg-rose-600 text-white", heroGradient: "from-rose-50 via-rose-50/50 to-transparent" },
};

type Tab = "overview" | "vocab" | "kanji" | "grammar" | "test";

const tabs: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "vocab", label: "Kosakata", icon: BookOpen },
  { id: "kanji", label: "Kanji", icon: PenTool },
  { id: "grammar", label: "Bunpou", icon: Languages },
  { id: "test", label: "Latihan Soal", icon: GraduationCap },
];

export function LevelPage() {
  const { level } = useParams<{ level: string }>();
  const [activeTab, setActiveTab] = useState<Tab>("vocab");

  const data = getLevelData(level || "");
  if (!data) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <p className="text-lg text-muted-foreground mb-4">Level tidak ditemukan</p>
        <Link to="/" className="text-primary font-medium hover:underline">← Kembali ke beranda</Link>
      </div>
    );
  }

  const colors = colorMap[data.color] || colorMap.emerald;

  // Find prev/next levels
  const currentIdx = allLevels.findIndex(l => l.level === data.level);
  const prevLevel = currentIdx > 0 ? allLevels[currentIdx - 1] : null;
  const nextLevel = currentIdx < allLevels.length - 1 ? allLevels[currentIdx + 1] : null;

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero */}
      <section className={`relative py-10 md:py-14 bg-gradient-to-b ${colors.heroGradient}`}>
        <div className="container">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ChevronLeft className="size-4" />
            Beranda
          </Link>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${colors.badge}`}>
                  {data.level}
                </span>
                <span className="text-sm text-muted-foreground">{data.subtitle}</span>
              </div>
              <h1 className={`text-3xl md:text-4xl font-bold ${colors.accent}`}>
                {data.title}
              </h1>
              <p className="text-muted-foreground mt-2 max-w-xl">{data.description}</p>
            </div>

            <div className="flex gap-3">
              <div className={`${colors.bg} ${colors.border} border rounded-xl px-3 py-2 text-center min-w-[70px]`}>
                <div className={`text-lg font-bold ${colors.accent}`}>{data.kanjiCount}</div>
                <div className="text-[10px] text-muted-foreground">Kanji</div>
              </div>
              <div className={`${colors.bg} ${colors.border} border rounded-xl px-3 py-2 text-center min-w-[70px]`}>
                <div className={`text-lg font-bold ${colors.accent}`}>{data.vocabCount}</div>
                <div className="text-[10px] text-muted-foreground">Kosakata</div>
              </div>
              <div className={`${colors.bg} ${colors.border} border rounded-xl px-3 py-2 text-center min-w-[70px]`}>
                <div className={`text-lg font-bold ${colors.accent}`}>{data.grammarCount}</div>
                <div className="text-[10px] text-muted-foreground">Bunpou</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="border-b bg-background sticky top-16 z-40">
        <div className="container">
          <div className="flex gap-1 py-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive ? colors.tabActive : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="size-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="flex-1 py-8 md:py-12">
        <div className="container">
          {activeTab === "vocab" && <VocabSection items={data.vocab} color={data.color} />}
          {activeTab === "kanji" && <KanjiSection items={data.kanji} color={data.color} />}
          {activeTab === "grammar" && <GrammarSection items={data.grammar} color={data.color} />}
          {activeTab === "test" && <PracticeTest questions={data.test} level={data.level} color={data.color} />}
        </div>
      </section>

      {/* Level navigation */}
      <div className="border-t py-6 bg-muted/20">
        <div className="container flex items-center justify-between">
          {prevLevel ? (
            <Link to={`/${prevLevel.level.toLowerCase()}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="size-4" />
              <span>{prevLevel.title}</span>
            </Link>
          ) : <div />}
          {nextLevel ? (
            <Link to={`/${nextLevel.level.toLowerCase()}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <span>{nextLevel.title}</span>
              <ChevronRight className="size-4" />
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
