import type { ReactNode } from 'react';
import type { Question, QuizMode } from '../types';

type Props = {
  question: Question;
  mode: QuizMode;
  currentIdx: number;
  total: number;
  selectedAnswer: number | null;
  answered: boolean; // czy zatwierdzono (practice/review)
  onSelect: (idx: number) => void;
  onSubmit: () => void;
  onNext: () => void;
  onExit: () => void;
  rightHeader?: ReactNode; // np. <Timer />
};

const LETTERS = ['A', 'B', 'C', 'D'];

export default function QuizQuestion({
  question,
  mode,
  currentIdx,
  total,
  selectedAnswer,
  answered,
  onSelect,
  onSubmit,
  onNext,
  onExit,
  rightHeader,
}: Props) {
  const isExam = mode === 'exam';
  const showFeedback = !isExam && answered;
  const isLast = currentIdx === total - 1;

  const buttonClass = (idx: number): string => {
    const base =
      'flex w-full items-start gap-3 rounded-md border px-4 py-3 text-left text-sm transition-colors';
    if (!showFeedback) {
      if (selectedAnswer === idx) {
        return `${base} border-accent bg-accent/10 text-text`;
      }
      return `${base} border-border bg-surface text-text hover:bg-surface-2`;
    }
    // feedback (practice/review po submit)
    if (idx === question.correct) {
      return `${base} border-success bg-success/10 text-text`;
    }
    if (idx === selectedAnswer && idx !== question.correct) {
      return `${base} border-danger bg-danger/10 text-text`;
    }
    return `${base} border-border bg-surface text-text opacity-60`;
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between gap-2">
        <button
          onClick={onExit}
          className="text-sm text-text-muted hover:text-text"
        >
          ← Wyjdź
        </button>
        <div className="flex items-center gap-4">
          {rightHeader}
          <div className="font-mono text-sm text-text-muted tabular-nums">
            {currentIdx + 1} / {total}
          </div>
        </div>
      </div>

      <div className="mb-5 h-1 overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full bg-accent transition-all"
          style={{ width: `${((currentIdx + 1) / total) * 100}%` }}
        />
      </div>

      <article className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-base font-semibold leading-snug text-text sm:text-lg">
          {question.q}
        </h2>

        {question.code && (
          <pre className="mt-3 overflow-x-auto rounded-md border border-border bg-bg p-3 font-mono text-xs leading-relaxed text-text">
            <code>{question.code}</code>
          </pre>
        )}

        <div className="mt-5 space-y-2">
          {question.a.map((ans, idx) => (
            <button
              key={idx}
              onClick={() => !showFeedback && onSelect(idx)}
              disabled={showFeedback}
              className={buttonClass(idx)}
            >
              <span className="font-mono text-sm font-semibold text-text-muted">
                {LETTERS[idx]}
              </span>
              <span className="flex-1">{ans}</span>
            </button>
          ))}
        </div>

        {showFeedback && (
          <div className="mt-4 rounded-md border border-border bg-bg p-3">
            <div className="text-xs font-medium uppercase tracking-wide text-text-muted">
              Wyjaśnienie
            </div>
            <p className="mt-1 text-sm leading-relaxed text-text">
              {question.expl}
            </p>
          </div>
        )}
      </article>

      <div className="mt-6 flex justify-end gap-2">
        {isExam ? (
          <button
            onClick={onNext}
            className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover"
          >
            {isLast ? 'Zakończ egzamin' : 'Następne'}
          </button>
        ) : !showFeedback ? (
          <button
            onClick={onSubmit}
            disabled={selectedAnswer === null}
            className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            Zatwierdź
          </button>
        ) : (
          <button
            onClick={onNext}
            className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover"
          >
            {isLast ? 'Wyniki' : 'Następne'}
          </button>
        )}
      </div>
    </main>
  );
}
