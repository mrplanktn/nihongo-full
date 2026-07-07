import { useState, useCallback } from "react";
import type { TestQuestion } from "@/data/types";
import { CheckCircle2, XCircle, RotateCcw, Trophy, ChevronRight } from "lucide-react";

const accentMap: Record<string, { btn: string; btnActive: string; progress: string; badge: string }> = {
  emerald: { btn: "hover:border-emerald-300 hover:bg-emerald-50/50", btnActive: "border-emerald-500 bg-emerald-50", progress: "bg-emerald-500", badge: "bg-emerald-100 text-emerald-700" },
  blue: { btn: "hover:border-blue-300 hover:bg-blue-50/50", btnActive: "border-blue-500 bg-blue-50", progress: "bg-blue-500", badge: "bg-blue-100 text-blue-700" },
  violet: { btn: "hover:border-violet-300 hover:bg-violet-50/50", btnActive: "border-violet-500 bg-violet-50", progress: "bg-violet-500", badge: "bg-violet-100 text-violet-700" },
  amber: { btn: "hover:border-amber-300 hover:bg-amber-50/50", btnActive: "border-amber-500 bg-amber-50", progress: "bg-amber-500", badge: "bg-amber-100 text-amber-700" },
  rose: { btn: "hover:border-rose-300 hover:bg-rose-50/50", btnActive: "border-rose-500 bg-rose-50", progress: "bg-rose-500", badge: "bg-rose-100 text-rose-700" },
};

const typeLabels: Record<string, string> = {
  vocab: "Kosakata",
  kanji: "Kanji",
  grammar: "Tata Bahasa",
  reading: "Pemahaman",
};

export function PracticeTest({ questions, level, color }: { questions: TestQuestion[]; level: string; color: string }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [isFinished, setIsFinished] = useState(false);

  const colors = accentMap[color] || accentMap.emerald;
  const q = questions[currentQ];
  const progress = ((currentQ + (isAnswered ? 1 : 0)) / questions.length) * 100;

  const handleSelect = useCallback((optIdx: number) => {
    if (isAnswered) return;
    setSelectedAnswer(optIdx);
  }, [isAnswered]);

  const handleSubmit = useCallback(() => {
    if (selectedAnswer === null) return;
    setIsAnswered(true);
    const newAnswers = [...answers];
    newAnswers[currentQ] = selectedAnswer;
    setAnswers(newAnswers);
    if (selectedAnswer === q.correct) {
      setScore(s => s + 1);
    }
  }, [selectedAnswer, currentQ, q.correct, answers]);

  const handleNext = useCallback(() => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  }, [currentQ, questions.length]);

  const handleReset = useCallback(() => {
    setCurrentQ(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setAnswers(Array(questions.length).fill(null));
    setIsFinished(false);
  }, [questions.length]);

  // Finished screen
  if (isFinished) {
    const pct = Math.round((score / questions.length) * 100);
    const grade = pct >= 80 ? "🎉 Luar Biasa!" : pct >= 60 ? "👍 Bagus!" : pct >= 40 ? "💪 Terus Belajar!" : "📚 Perlu Latihan Lagi";

    return (
      <div className="max-w-lg mx-auto text-center py-8">
        <Trophy className={`size-16 mx-auto mb-4 ${pct >= 60 ? "text-yellow-500" : "text-muted-foreground"}`} />
        <h2 className="text-2xl font-bold mb-2">Hasil Latihan {level}</h2>
        <p className="text-3xl font-bold mb-1">{score} / {questions.length}</p>
        <p className="text-lg text-muted-foreground mb-2">{pct}% benar</p>
        <p className="text-xl mb-6">{grade}</p>

        {/* Review */}
        <div className="text-left space-y-3 mb-8">
          {questions.map((qq, i) => {
            const userAns = answers[i];
            const isCorrect = userAns === qq.correct;
            return (
              <div key={i} className={`rounded-lg border p-3 ${isCorrect ? "border-emerald-200 bg-emerald-50/50" : "border-red-200 bg-red-50/50"}`}>
                <div className="flex items-start gap-2">
                  {isCorrect ? (
                    <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="size-4 text-red-500 shrink-0 mt-0.5" />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium" style={{ fontFamily: "var(--font-jp)" }}>{qq.question}</p>
                    {!isCorrect && (
                      <p className="text-xs text-red-600 mt-1">
                        Jawabanmu: {userAns !== null ? qq.options[userAns] : "—"} → Benar: {qq.options[qq.correct]}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">{qq.explanation}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all"
        >
          <RotateCcw className="size-4" />
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-2 text-sm text-muted-foreground">
        <span>Soal {currentQ + 1} dari {questions.length}</span>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.badge}`}>
          {typeLabels[q.type] || q.type}
        </span>
      </div>
      <div className="w-full h-2 rounded-full bg-muted mb-8">
        <div
          className={`h-full rounded-full transition-all duration-300 ${colors.progress}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <h3 className="text-xl md:text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-jp)" }}>
        {q.question}
      </h3>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {q.options.map((opt, optIdx) => {
          let optClass = `w-full text-left rounded-xl border-2 p-4 transition-all text-sm font-medium `;

          if (isAnswered) {
            if (optIdx === q.correct) {
              optClass += "border-emerald-500 bg-emerald-50 text-emerald-700";
            } else if (optIdx === selectedAnswer && optIdx !== q.correct) {
              optClass += "border-red-400 bg-red-50 text-red-700";
            } else {
              optClass += "border-muted text-muted-foreground opacity-50";
            }
          } else {
            if (optIdx === selectedAnswer) {
              optClass += colors.btnActive;
            } else {
              optClass += `border-muted ${colors.btn}`;
            }
          }

          return (
            <button
              key={optIdx}
              onClick={() => handleSelect(optIdx)}
              disabled={isAnswered}
              className={optClass}
            >
              <span className="inline-flex items-center gap-3">
                <span className="size-7 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0">
                  {String.fromCharCode(65 + optIdx)}
                </span>
                <span>{opt}</span>
                {isAnswered && optIdx === q.correct && (
                  <CheckCircle2 className="size-5 text-emerald-500 ml-auto" />
                )}
                {isAnswered && optIdx === selectedAnswer && optIdx !== q.correct && (
                  <XCircle className="size-5 text-red-500 ml-auto" />
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {isAnswered && (
        <div className={`rounded-xl border p-4 mb-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-200 ${
          selectedAnswer === q.correct ? "border-emerald-200 bg-emerald-50/50" : "border-red-200 bg-red-50/50"
        }`}>
          <div className="flex items-start gap-2">
            {selectedAnswer === q.correct ? (
              <CheckCircle2 className="size-5 text-emerald-500 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="size-5 text-red-500 shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-semibold text-sm mb-1">
                {selectedAnswer === q.correct ? "Benar! ✨" : "Salah!"}
              </p>
              <p className="text-sm text-muted-foreground">{q.explanation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Skor: <span className="font-bold text-foreground">{score}</span> / {currentQ + (isAnswered ? 1 : 0)}
        </div>

        {!isAnswered ? (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition-all"
          >
            Jawab
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all"
          >
            {currentQ < questions.length - 1 ? "Selanjutnya" : "Lihat Hasil"}
            <ChevronRight className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}
