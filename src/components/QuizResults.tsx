import type { Question, QuizMode } from '../types';

type Props = {
  mode: QuizMode;
  questions: Question[];
  answers: (number | null)[];
  correctCount: number;
  wrongCount: number;
  timeSec: number;
  hasWrong: boolean;
  onReviewWrong: () => void;
  onHome: () => void;
};

const EXAM_PASS = 65;

export default function QuizResults({
  mode,
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
  const isExam = mode === 'exam';
  const passed = isExam && pct >= EXAM_PASS;

  const mm = Math.floor(timeSec / 60);
  const ss = timeSec % 60;

  const wrongQuestions = questions
    .map((q, i) => ({ q, answer: answers[i] }))
    .filter(({ q, answer }) => answer !== q.correct);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <section className="rounded-lg border border-border bg-surface p-6 text-center">
        {isExam && (
          <div
            className={
              passed
                ? 'mb-3 inline-block rounded-full bg-success/15 px-3 py-1 text-sm font-semibold text-success'
                : 'mb-3 inline-block rounded-full bg-danger/15 px-3 py-1 text-sm font-semibold text-danger'
            }
          >
            {passed ? 'EGZAMIN ZDANY' : 'EGZAMIN NIEZDANY'}
          </div>
        )}
        <div className="font-mono text-5xl font-semibold text-text tabular-nums">
          {pct}%
        </div>
        <div className="mt-2 text-sm text-text-muted">
          {correctCount} / {total} poprawnych · {mm}m {ss}s
        </div>
        {isExam && (
          <div className="mt-1 text-xs text-text-muted">
            Próg zdania: {EXAM_PASS}%
          </div>
        )}
      </section>

      {wrongQuestions.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-text-muted">
            Błędne ({wrongQuestions.length})
          </h2>
          <div className="space-y-2">
            {wrongQuestions.map(({ q, answer }) => (
              <div
                key={q.id}
                className="rounded-md border border-border bg-surface p-4"
              >
                <div className="text-sm font-medium text-text">{q.q}</div>
                <div className="mt-2 text-xs text-text-muted">
                  Twoja odpowiedź:{' '}
                  <span className="text-danger">
                    {answer === null ? '— brak —' : q.a[answer]}
                  </span>
                </div>
                <div className="text-xs text-text-muted">
                  Poprawna:{' '}
                  <span className="text-success">{q.a[q.correct]}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-text">
                  {q.expl}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
        {hasWrong && mode !== 'review' && (
          <button
            onClick={onReviewWrong}
            className="rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-medium text-text hover:bg-surface-2"
          >
            Powtórz błędne
          </button>
        )}
        <button
          onClick={onHome}
          className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover"
        >
          Wróć do dashboardu
        </button>
      </div>
    </main>
  );
}
