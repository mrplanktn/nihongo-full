import { useState } from "react";
import type { VocabItem } from "@/data/types";
import { Search, Volume2 } from "lucide-react";

const accentMap: Record<string, { card: string; dot: string; cat: string }> = {
  emerald: { card: "hover:border-emerald-300", dot: "bg-emerald-500", cat: "bg-emerald-100 text-emerald-700" },
  blue: { card: "hover:border-blue-300", dot: "bg-blue-500", cat: "bg-blue-100 text-blue-700" },
  violet: { card: "hover:border-violet-300", dot: "bg-violet-500", cat: "bg-violet-100 text-violet-700" },
  amber: { card: "hover:border-amber-300", dot: "bg-amber-500", cat: "bg-amber-100 text-amber-700" },
  rose: { card: "hover:border-rose-300", dot: "bg-rose-500", cat: "bg-rose-100 text-rose-700" },
};

export function VocabSection({ items, color }: { items: VocabItem[]; color: string }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const colors = accentMap[color] || accentMap.emerald;

  const categories = ["Semua", ...Array.from(new Set(items.map(i => i.category)))];
  const filtered = items.filter(item => {
    const matchesSearch = !search || 
      item.word.includes(search) || 
      item.reading.includes(search) || 
      item.meaning.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "Semua" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFlip = (idx: number) => {
    setFlippedCards(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari kosakata..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === cat ? colors.cat : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4">{filtered.length} kosakata</p>

      {/* Cards Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, idx) => {
          const isFlipped = flippedCards.has(idx);
          return (
            <div
              key={idx}
              onClick={() => toggleFlip(idx)}
              className={`group relative rounded-xl border bg-card p-5 transition-all cursor-pointer ${colors.card} hover:shadow-md`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-jp)" }}>{item.word}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{item.reading}</p>
                </div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${colors.cat}`}>
                  {item.category}
                </span>
              </div>

              <p className="text-base font-medium mb-3">{item.meaning}</p>

              {isFlipped && item.example && (
                <div className="mt-3 pt-3 border-t space-y-1 animate-in fade-in-0 slide-in-from-top-1 duration-200">
                  <p className="text-sm" style={{ fontFamily: "var(--font-jp)" }}>
                    <Volume2 className="inline size-3 mr-1 text-muted-foreground" />
                    {item.example}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.exampleMeaning}</p>
                </div>
              )}

              {!isFlipped && item.example && (
                <p className="text-[10px] text-muted-foreground/60 mt-2">Klik untuk contoh kalimat →</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
