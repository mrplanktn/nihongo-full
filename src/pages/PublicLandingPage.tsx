import { Link } from "react-router-dom";
import { BookOpen, Languages, PenTool, GraduationCap, ChevronRight, Sparkles } from "lucide-react";
import { allLevels } from "@/data";

const levelColors: Record<string, { bg: string; border: string; text: string; badge: string; glow: string }> = {
  N5: { bg: "from-emerald-50 to-emerald-100/50", border: "border-emerald-200 hover:border-emerald-300", text: "text-emerald-700", badge: "bg-emerald-100 text-emerald-700", glow: "bg-emerald-400/20" },
  N4: { bg: "from-blue-50 to-blue-100/50", border: "border-blue-200 hover:border-blue-300", text: "text-blue-700", badge: "bg-blue-100 text-blue-700", glow: "bg-blue-400/20" },
  N3: { bg: "from-violet-50 to-violet-100/50", border: "border-violet-200 hover:border-violet-300", text: "text-violet-700", badge: "bg-violet-100 text-violet-700", glow: "bg-violet-400/20" },
  N2: { bg: "from-amber-50 to-amber-100/50", border: "border-amber-200 hover:border-amber-300", text: "text-amber-700", badge: "bg-amber-100 text-amber-700", glow: "bg-amber-400/20" },
  N1: { bg: "from-rose-50 to-rose-100/50", border: "border-rose-200 hover:border-rose-300", text: "text-rose-700", badge: "bg-rose-100 text-rose-700", glow: "bg-rose-400/20" },
};

const levelEmoji: Record<string, string> = {
  N5: "🌱", N4: "🌿", N3: "🌳", N2: "⚡", N1: "🏯",
};

export function PublicLandingPage() {
  const totalVocab = allLevels.reduce((sum, l) => sum + l.vocab.length, 0);
  const totalKanji = allLevels.reduce((sum, l) => sum + l.kanji.length, 0);
  const totalGrammar = allLevels.reduce((sum, l) => sum + l.grammar.length, 0);
  const totalTest = allLevels.reduce((sum, l) => sum + l.test.length, 0);

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 -z-10 jp-pattern" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-background/80 backdrop-blur-sm text-xs font-medium">
            <Sparkles className="size-3.5 text-red-500" />
            Belajar Bahasa Jepang — JLPT N5 sampai N1
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-orange-500">
              日本語
            </span>
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl text-foreground/80">
              マスター
            </span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Platform belajar bahasa Jepang lengkap dari level pemula (N5) hingga mahir (N1). 
            Kosakata, Kanji, Tata Bahasa, dan Latihan Soal JLPT.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <BookOpen className="size-4 text-emerald-500" />
              <span>{totalVocab}+ Kosakata</span>
            </div>
            <div className="flex items-center gap-1.5">
              <PenTool className="size-4 text-blue-500" />
              <span>{totalKanji}+ Kanji</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Languages className="size-4 text-violet-500" />
              <span>{totalGrammar} Pola Tata Bahasa</span>
            </div>
            <div className="flex items-center gap-1.5">
              <GraduationCap className="size-4 text-rose-500" />
              <span>{totalTest} Soal Latihan</span>
            </div>
          </div>

          <div className="pt-4">
            <Link
              to="/n5"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold shadow-lg shadow-red-500/20 hover:shadow-red-500/30 hover:brightness-110 transition-all"
            >
              Mulai Belajar dari N5
              <ChevronRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Level Cards Section */}
      <section className="py-16 md:py-24 border-t bg-muted/20">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-muted-foreground mb-2 tracking-wide uppercase">
              5 Level JLPT
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Pilih Level Belajarmu
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Setiap level dilengkapi dengan kosakata, kanji, tata bahasa (bunpou), dan latihan soal tes JLPT.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {allLevels.map((level) => {
              const colors = levelColors[level.level] || levelColors.N5;
              return (
                <Link
                  key={level.level}
                  to={`/${level.level.toLowerCase()}`}
                  className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${colors.bg} border ${colors.border} p-6 transition-all hover:shadow-lg`}
                >
                  <div className={`absolute top-0 right-0 -mt-6 -mr-6 size-24 rounded-full ${colors.glow} blur-2xl transition-all group-hover:scale-150`} />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{levelEmoji[level.level]}</span>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.badge}`}>
                        {level.level}
                      </span>
                    </div>
                    <h3 className={`font-bold text-lg mb-1 ${colors.text}`}>{level.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{level.subtitle}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {level.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-white/60 rounded-lg px-2.5 py-1.5">
                        <span className="text-muted-foreground">Kanji:</span>{" "}
                        <span className="font-semibold">{level.kanjiCount}</span>
                      </div>
                      <div className="bg-white/60 rounded-lg px-2.5 py-1.5">
                        <span className="text-muted-foreground">Kosakata:</span>{" "}
                        <span className="font-semibold">{level.vocabCount}</span>
                      </div>
                      <div className="bg-white/60 rounded-lg px-2.5 py-1.5">
                        <span className="text-muted-foreground">Bunpou:</span>{" "}
                        <span className="font-semibold">{level.grammarCount}</span>
                      </div>
                      <div className="bg-white/60 rounded-lg px-2.5 py-1.5">
                        <span className="text-muted-foreground">Belajar:</span>{" "}
                        <span className="font-semibold">{level.studyHours}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">
                      <span className={colors.text}>Mulai Belajar</span>
                      <ChevronRight className={`size-4 ${colors.text}`} />
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* CTA Card */}
            <Link
              to="/n5"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 to-red-700 text-white p-6 transition-all hover:shadow-lg hover:shadow-red-500/20 lg:col-span-2 md:col-span-2"
            >
              <div className="absolute inset-0 jp-wave opacity-20" />
              <div className="relative flex flex-col md:flex-row md:items-center gap-4">
                <div className="text-4xl">🎌</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Mulai Perjalananmu!</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Baru mulai belajar? Mulai dari level N5 — pelajari hiragana, katakana, 
                    kanji dasar, dan percakapan sehari-hari.
                  </p>
                </div>
                <ChevronRight className="size-6 shrink-0 ml-auto hidden md:block group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-muted/20">
        <div className="container text-center text-sm text-muted-foreground">
          <p>日本語マスター — Platform Belajar Bahasa Jepang</p>
          <p className="mt-1 text-xs">JLPT N5 · N4 · N3 · N2 · N1</p>
        </div>
      </footer>
    </div>
  );
}
