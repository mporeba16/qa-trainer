import type { Answer, Question, QuizMode } from '../types';
import { isCorrectAnswer } from '../types';
import { renderInline } from '../utils/markdown';

type Props = {
  mode: QuizMode;
  examPassPct: number;
  questions: Question[];
  answers: Answer[];
  correctCount: number;
  wrongCount: number;
  timeSec: number;
  hasWrong: boolean;
  onReviewWrong: () => void;
  onHome: () => void;
};

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

function formatAnswer(answer: Answer, options: string[]): string {
  if (answer === null) return '— brak —';
  if (Array.isArray(answer)) {
    if (answer.length === 0) return '— brak —';
    return answer
      .slice()
      .sort((a, b) => a - b)
      .map((i) => `${LETTERS[i]}. ${options[i]}`)
      .join(' | ');
  }
  return `${LETTERS[answer]}. ${options[answer]}`;
}

function formatCorrect(correct: number | number[], options: string[]): string {
  if (Array.isArray(correct)) {
    return correct
      .slice()
      .sort((a, b) => a - b)
      .map((i) => `${LETTERS[i]}. ${options[i]}`)
      .join(' | ');
  }
  return `${LETTERS[correct]}. ${options[correct]}`;
}

export default function QuizResults({
  mode,
  examPassPct,
  questions,
  answers,
  correctCount,
  timeSec,
  hasWrong,
  onReviewWrong,
  onHome,
}: Props) {
  const total = questions.length;
  const pct = total === 0 ? 0 : Math.round((correctCount / total) * 100);
  const isExam = mode === 'exam' || mode === 'official-exam';
  const passed = isExam && pct >= examPassPct;

  const mm = Math.floor(timeSec / 60);
  const ss = timeSec % 60;

  const wrongQuestions = questions
    .map((q, i) => ({ q, answer: answers[i] }))
    .filter(({ q, answer }) => !isCorrectAnswer(answer, q.correct));

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <section
        className={
          isExam && passed
            ? 'relative overflow-hidden rounded-2xl border border-success/30 bg-gradient-to-br from-success/10 via-surface to-surface p-8 text-center'
            : isExam && !passed
              ? 'relative overflow-hidden rounded-2xl border border-danger/30 bg-gradient-to-br from-danger/10 via-surface to-surface p-8 text-center'
              : 'relative overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 via-surface to-surface p-8 text-center'
        }
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative">
          {isExam && (
            <div
              className={
                passed
                  ? 'mb-4 inline-flex items-center gap-1.5 rounded-full border border-success/40 bg-success/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-success'
                  : 'mb-4 inline-flex items-center gap-1.5 rounded-full border border-danger/40 bg-danger/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-danger'
              }
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
              {passed ? 'Egzamin zdany' : 'Egzamin niezdany'}
            </div>
          )}
          <div className="font-mono text-6xl font-bold tracking-tight tabular-nums text-text">
            {pct}<span className="text-3xl text-text-muted">%</span>
          </div>
          <div className="mt-3 text-sm text-text-muted">
            <span className="font-semibold text-text">{correctCount}</span> / {total} poprawnych
            <span className="mx-2">·</span>
            <span className="font-mono tabular-nums">{mm}m {ss}s</span>
          </div>
          {isExam && (
            <div className="mt-1.5 text-xs text-text-muted">
              Próg zdania: {examPassPct}%
            </div>
          )}
        </div>
      </section>

      {wrongQuestions.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
            Błędne odpowiedzi ({wrongQuestions.length})
          </h2>
          <div className="space-y-3">
            {wrongQuestions.map(({ q, answer }) => (
              <div
                key={q.id}
                className="rounded-xl border border-border/80 bg-surface p-5"
              >
                <div className="whitespace-pre-line text-sm font-medium leading-relaxed text-text">{renderInline(q.q)}</div>
                {q.code && (
                  <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-bg p-3 font-mono text-xs leading-relaxed text-text">
                    <code>{q.code}</code>
                  </pre>
                )}
                <div className="mt-3 space-y-1.5 text-xs">
                  <div className="flex gap-2">
                    <span className="shrink-0 text-text-muted">Twoja:</span>
                    <span className="text-danger">{formatAnswer(answer, q.a)}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="shrink-0 text-text-muted">Poprawna:</span>
                    <span className="text-success">{formatCorrect(q.correct, q.a)}</span>
                  </div>
                </div>
                <p className="mt-3 whitespace-pre-line border-t border-border/60 pt-3 text-xs leading-relaxed text-text-muted">
                  {renderInline(q.expl)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
        {hasWrong && mode !== 'review' && mode !== 'official-exam' && (
          <button
            onClick={onReviewWrong}
            className="rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-medium text-text transition-colors hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
          >
            Powtórz błędne
          </button>
        )}
        <button
          onClick={onHome}
          className="rounded-lg bg-gradient-to-br from-accent to-accent-hover px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-accent/30 transition-all hover:shadow-xl hover:shadow-accent/40"
        >
          Wróć do dashboardu
        </button>
      </div>
    </main>
  );
}
