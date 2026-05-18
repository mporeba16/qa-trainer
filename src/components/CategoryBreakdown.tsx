import type { Question, QuestionStat } from '../types';

type Props = {
  questionStats: Record<number, QuestionStat>;
  categories: Record<string, string>;
  questions: Question[];
};

type CatRow = {
  total: number;
  attempted: number;
  knownNow: number; // pytań z lastCorrect=true (SRS-light "wiem")
};

export default function CategoryBreakdown({
  questionStats,
  categories,
  questions,
}: Props) {
  const catKeys = Object.keys(categories);
  const byCat: Record<string, CatRow> = {};
  catKeys.forEach((c) => {
    byCat[c] = { total: 0, attempted: 0, knownNow: 0 };
  });
  questions.forEach((q) => {
    if (byCat[q.cat]) byCat[q.cat].total += 1;
  });
  Object.entries(questionStats).forEach(([idStr, stat]) => {
    const id = Number(idStr);
    const question = questions.find((q) => q.id === id);
    if (!question || !byCat[question.cat]) return;
    byCat[question.cat].attempted += 1;
    if (stat.lastCorrect) byCat[question.cat].knownNow += 1;
  });

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {catKeys.map((cat) => {
        const row = byCat[cat];
        const pct = row.total === 0 ? 0 : Math.round((row.knownNow / row.total) * 100);
        return (
          <div
            key={cat}
            className="rounded-xl border border-border/80 bg-surface px-4 py-3 transition-colors hover:border-border"
          >
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="truncate text-text">{categories[cat]}</span>
              <span className="shrink-0 font-mono text-xs tabular-nums text-text-muted">
                {row.knownNow}/{row.total} · {pct}%
              </span>
            </div>
            <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent to-accent-hover transition-all duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
