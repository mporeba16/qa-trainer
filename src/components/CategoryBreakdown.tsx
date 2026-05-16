import type { Category, QuestionStat } from '../types';
import { CATEGORIES, QUESTIONS } from '../data/questions';

type Props = {
  questionStats: Record<number, QuestionStat>;
};

type CatRow = {
  total: number;
  attempted: number;
  knownNow: number; // pytań z lastCorrect=true (SRS-light "wiem")
};

export default function CategoryBreakdown({ questionStats }: Props) {
  // policz total/attempted/knownNow per kategorię
  const byCat: Record<Category, CatRow> = {} as Record<Category, CatRow>;
  (Object.keys(CATEGORIES) as Category[]).forEach((c) => {
    byCat[c] = { total: 0, attempted: 0, knownNow: 0 };
  });
  QUESTIONS.forEach((q) => {
    byCat[q.cat].total += 1;
  });
  Object.entries(questionStats).forEach(([idStr, stat]) => {
    const id = Number(idStr);
    const question = QUESTIONS.find((q) => q.id === id);
    if (!question) return;
    byCat[question.cat].attempted += 1;
    if (stat.lastCorrect) byCat[question.cat].knownNow += 1;
  });

  return (
    <div className="space-y-2">
      {(Object.keys(CATEGORIES) as Category[]).map((cat) => {
        const row = byCat[cat];
        const pct = row.total === 0 ? 0 : Math.round((row.knownNow / row.total) * 100);
        return (
          <div
            key={cat}
            className="rounded-md border border-border bg-surface px-3 py-2.5"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-text">{CATEGORIES[cat]}</span>
              <span className="font-mono text-xs text-text-muted">
                {row.knownNow}/{row.total} ({pct}%)
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full bg-accent transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
