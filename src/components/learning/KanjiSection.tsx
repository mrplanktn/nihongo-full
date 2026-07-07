import { useState } from "react";
import type { KanjiItem } from "@/data/types";
import { Search } from "lucide-react";

const accentMap: Record<string, { card: string; cat: string; kanji: string; strokes: string }> = {
  emerald: { card: "hover:border-emerald-300", cat: "bg-emerald-100 text-emerald-700", kanji: "text-emerald-700", strokes: "bg-emerald-50 text-emerald-600" },
  blue: { card: "hover:border-blue-300", cat: "bg-blue-100 text-blue-700", kanji: "text-blue-700", strokes: "bg-blue-50 text-blue-600" },
  violet: { card: "hover:border-violet-300", cat: "bg-violet-100 text-violet-700", kanji: "text-violet-700", strokes: "bg-violet-50 text-violet-600" },
  amber: { card: "hover:border-amber-300", cat: "bg-amber-100 text-amber-700", kanji: "text-amber-700", strokes: "bg-amber-50 text-amber-600" },
  rose: { card: "hover:border-rose-300", cat: "bg-rose-100 text-rose-700", kanji: "text-rose-700", strokes: "bg-rose-50 text-rose-600" },
};

export function KanjiSection({ items, color }: { items: KanjiItem[]; color: string }) {
  const [search, setSearch] = useState("");
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const colors = accentMap[color] || accentMap.emerald;

  const categories = ["Semua", ...Array.from(new Set(items.map(i => i.category)))];
  const filtered = items.filter(item => {
    const matchesSearch = !search ||
      item.kanji.includes(search) ||
      item.meaning.toLowerCase().includes(search.toLowerCase()) ||
      item.onyomi.includes(search) ||
      item.kunyomi.includes(search);
    const matchesCategory = selectedCategory === "Semua" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari kanji..."
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

      <p className="text-sm text-muted-foreground mb-4">{filtered.length} kanji</p>

      {/* Kanji Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((item, idx) => {
          const isExpanded = expandedIdx === idx;
          return (
            <div
              key={idx}
              onClick={() => setExpandedIdx(isExpanded ? null : idx)}
              className={`group rounded-xl border bg-card p-5 transition-all cursor-pointer ${colors.card} hover:shadow-md`}
            >
              <div className="flex items-start gap-4">
                <div className={`text-5xl font-bold ${colors.kanji} shrink-0`} style={{ fontFamily: "var(--font-jp)" }}>
                  {item.kanji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${colors.strokes}`}>
                      {item.strokes}画
                    </span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${colors.cat}`}>
                      {item.category}
                    </span>
                  </div>
                  <p className="font-semibold text-sm">{item.meaning}</p>
                  <div className="mt-1.5 space-y-0.5 text-xs text-muted-foreground">
                    <p><span className="font-medium text-foreground/70">音:</span> {item.onyomi}</p>
                    <p><span className="font-medium text-foreground/70">訓:</span> {item.kunyomi}</p>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="mt-4 pt-3 border-t space-y-1.5 animate-in fade-in-0 slide-in-from-top-1 duration-200">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Contoh kata:</p>
                  {item.examples.map((ex, i) => (
                    <p key={i} className="text-sm" style={{ fontFamily: "var(--font-jp)" }}>• {ex}</p>
                  ))}
                </div>
              )}

              {!isExpanded && (
                <p className="text-[10px] text-muted-foreground/60 mt-3">Klik untuk contoh →</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
