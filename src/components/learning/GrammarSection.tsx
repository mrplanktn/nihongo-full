import { useState } from "react";
import type { GrammarItem } from "@/data/types";
import { ChevronDown, ChevronUp } from "lucide-react";

const accentMap: Record<string, { card: string; pattern: string; badge: string; example: string; exampleJp: string; exampleEn: string }> = {
  emerald: { card: "hover:border-emerald-300", pattern: "text-emerald-800 bg-emerald-50", badge: "bg-emerald-100 text-emerald-700", example: "bg-emerald-50 border-emerald-200", exampleJp: "text-emerald-900", exampleEn: "text-emerald-800" },
  blue: { card: "hover:border-blue-300", pattern: "text-blue-800 bg-blue-50", badge: "bg-blue-100 text-blue-700", example: "bg-blue-50 border-blue-200", exampleJp: "text-blue-900", exampleEn: "text-blue-800" },
  violet: { card: "hover:border-violet-300", pattern: "text-violet-800 bg-violet-50", badge: "bg-violet-100 text-violet-700", example: "bg-violet-50 border-violet-200", exampleJp: "text-violet-900", exampleEn: "text-violet-800" },
  amber: { card: "hover:border-amber-300", pattern: "text-amber-800 bg-amber-50", badge: "bg-amber-100 text-amber-700", example: "bg-amber-50 border-amber-200", exampleJp: "text-amber-900", exampleEn: "text-amber-800" },
  rose: { card: "hover:border-rose-300", pattern: "text-rose-800 bg-rose-50", badge: "bg-rose-100 text-rose-700", example: "bg-rose-50 border-rose-200", exampleJp: "text-rose-900", exampleEn: "text-rose-800" },
};

export function GrammarSection({ items, color }: { items: GrammarItem[]; color: string }) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);
  const colors = accentMap[color] || accentMap.emerald;

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-6">{items.length} pola tata bahasa</p>

      <div className="space-y-3 max-w-3xl">
        {items.map((item, idx) => {
          const isExpanded = expandedIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-xl border bg-card transition-all ${colors.card} ${isExpanded ? "shadow-sm" : ""}`}
            >
              {/* Header */}
              <button
                onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                className="w-full flex items-center justify-between p-4 md:p-5 text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${colors.badge}`}>
                    {idx + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold text-lg" style={{ fontFamily: "var(--font-jp)" }}>
                      {item.pattern}
                    </p>
                    <p className="text-sm text-muted-foreground">{item.meaning}</p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="size-5 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronDown className="size-5 text-muted-foreground shrink-0" />
                )}
              </button>

              {/* Body */}
              {isExpanded && (
                <div className="px-4 md:px-5 pb-5 animate-in fade-in-0 slide-in-from-top-1 duration-200">
                  <div className={`rounded-lg ${colors.pattern} px-4 py-3 mb-4`}>
                    <p className="text-sm leading-relaxed">{item.explanation}</p>
                  </div>

                  <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Contoh:</p>
                  <div className="space-y-2">
                    {item.examples.map((ex, i) => (
                      <div key={i} className={`rounded-lg border ${colors.example} px-4 py-3`}>
                        <p className={`text-base font-semibold ${colors.exampleJp}`} style={{ fontFamily: "var(--font-jp)" }}>
                          {ex.jp}
                        </p>
                        <p className={`text-sm font-medium mt-1 ${colors.exampleEn}`}>{ex.en}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
