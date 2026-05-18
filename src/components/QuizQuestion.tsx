import type { ReactNode } from 'react';
import type { Answer, Question, QuizMode } from '../types';
import { isCorrectAnswer } from '../types';
import { renderInline } from '../utils/markdown';

type Props = {
  question: Question;
  mode: QuizMode;
  currentIdx: number;
  total: number;
  selectedAnswer: Answer;
  answered: boolean; // czy zatwierdzono (practice/review)
  onSelect: (idx: number) => void;
  onSubmit: () => void;
  onNext: () => void;
  onExit: () => void;
  rightHeader?: ReactNode; // np. <Timer />
};

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

// Pomocnik: czy index jest zaznaczony w aktualnej odpowiedzi (single lub multi)
function isSelected(answer: Answer, idx: number): boolean {
  if (answer === null) return false;
  if (Array.isArray(answer)) return answer.includes(idx);
  return answer === idx;
}

// Pomocnik: czy odpowiedź ma cokolwiek wybranego
function hasSelection(answer: Answer): boolean {
  if (answer === null) return false;
  if (Array.isArray(answer)) return answer.length > 0;
  return true;
}

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
  const isExam = mode === 'exam' || mode === 'official-exam';
  const showFeedback = !isExam && answered;
  const isLast = currentIdx === total - 1;
  const isMulti = Array.isArray(question.correct);
  const expectedCount = isMulti ? (question.correct as number[]).length : 1;

  const buttonClass = (idx: number): string => {
    const base =
      'group/opt flex w-full items-start gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition-all duration-150';
    if (!showFeedback) {
      if (isSelected(selectedAnswer, idx)) {
        return `${base} border-accent bg-accent/10 text-text shadow-sm shadow-accent/10`;
      }
      return `${base} border-border bg-surface text-text hover:border-border/60 hover:bg-surface-2`;
    }
    // feedback (practice/review po submit)
    const correctIdxs = Array.isArray(question.correct)
      ? question.correct
      : [question.correct];
    const isThisCorrect = correctIdxs.includes(idx);
    const isThisSelected = isSelected(selectedAnswer, idx);
    if (isThisCorrect) {
      return `${base} border-success/60 bg-success/10 text-text`;
    }
    if (isThisSelected && !isThisCorrect) {
      return `${base} border-danger/60 bg-danger/10 text-text`;
    }
    return `${base} border-border/60 bg-surface text-text-muted`;
  };

  const letterClass = (idx: number): string => {
    const base =
      'flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-mono text-xs font-semibold transition-colors';
    if (!showFeedback) {
      if (isSelected(selectedAnswer, idx)) {
        return `${base} bg-accent text-white`;
      }
      return `${base} bg-surface-2 text-text-muted group-hover/opt:bg-surface-2 group-hover/opt:text-text`;
    }
    const correctIdxs = Array.isArray(question.correct)
      ? question.correct
      : [question.correct];
    if (correctIdxs.includes(idx)) return `${base} bg-success text-white`;
    if (isSelected(selectedAnswer, idx)) return `${base} bg-danger text-white`;
    return `${base} bg-surface-2 text-text-muted`;
  };

  const canSubmit = isMulti
    ? Array.isArray(selectedAnswer) && selectedAnswer.length === expectedCount
    : hasSelection(selectedAnswer);

  // W trybie exam dopuszczamy pominięcie pytania (puste), ale NIE pozwalamy
  // wybrać niepełnego multi (np. 1 z 2) — to gwarantowane "źle" w scoringu all-or-nothing.
  const examNextBlocked =
    isExam &&
    isMulti &&
    Array.isArray(selectedAnswer) &&
    selectedAnswer.length > 0 &&
    selectedAnswer.length < expectedCount;

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

      <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-hover transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / total) * 100}%` }}
        />
      </div>

      <article className="rounded-2xl border border-border/80 bg-surface p-6">
        <h2 className="whitespace-pre-line text-base font-semibold leading-relaxed tracking-tight text-text sm:text-lg">
          {renderInline(question.q)}
        </h2>

        {question.code && (
          <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-bg p-4 font-mono text-xs leading-relaxed text-text">
            <code>{question.code}</code>
          </pre>
        )}

        {isMulti && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-warning/40 bg-warning/10 px-3 py-1.5 text-xs font-medium text-warning">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-warning" />
            Wybierz dokładnie {expectedCount} odpowiedzi
          </div>
        )}

        <div className="mt-5 space-y-2">
          {question.a.map((ans, idx) => (
            <button
              key={idx}
              onClick={() => !showFeedback && onSelect(idx)}
              disabled={showFeedback}
              className={buttonClass(idx)}
            >
              <span className={letterClass(idx)}>{LETTERS[idx]}</span>
              <span className="flex-1 whitespace-pre-line leading-relaxed">{renderInline(ans)}</span>
            </button>
          ))}
        </div>

        {showFeedback && (
          <div
            className={
              isCorrectAnswer(selectedAnswer, question.correct)
                ? 'mt-5 rounded-xl border border-success/30 bg-success/5 p-4'
                : 'mt-5 rounded-xl border border-danger/30 bg-danger/5 p-4'
            }
          >
            <div className="flex items-center gap-2">
              <span
                className={
                  isCorrectAnswer(selectedAnswer, question.correct)
                    ? 'flex h-5 w-5 items-center justify-center rounded-full bg-success text-[11px] font-bold text-white'
                    : 'flex h-5 w-5 items-center justify-center rounded-full bg-danger text-[11px] font-bold text-white'
                }
              >
                {isCorrectAnswer(selectedAnswer, question.correct) ? '✓' : '✗'}
              </span>
              <span
                className={
                  isCorrectAnswer(selectedAnswer, question.correct)
                    ? 'text-sm font-semibold text-success'
                    : 'text-sm font-semibold text-danger'
                }
              >
                {isCorrectAnswer(selectedAnswer, question.correct)
                  ? 'Poprawnie'
                  : 'Błędnie'}
              </span>
            </div>
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-text">
              {renderInline(question.expl)}
            </p>
          </div>
        )}
      </article>

      <div className="mt-6 flex justify-end gap-2">
        {isExam ? (
          <button
            onClick={onNext}
            disabled={examNextBlocked}
            title={
              examNextBlocked
                ? `Wybierz ${expectedCount} odpowiedzi lub odznacz wszystkie, żeby pominąć`
                : undefined
            }
            className="rounded-lg bg-gradient-to-br from-accent to-accent-hover px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-accent/20 transition-all hover:shadow-lg hover:shadow-accent/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          >
            {isLast
              ? mode === 'official-exam'
                ? 'Zakończ egzamin oficjalny'
                : 'Zakończ egzamin'
              : 'Następne'}
          </button>
        ) : !showFeedback ? (
          <button
            onClick={onSubmit}
            disabled={!canSubmit}
            className="rounded-lg bg-gradient-to-br from-accent to-accent-hover px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-accent/20 transition-all hover:shadow-lg hover:shadow-accent/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          >
            Zatwierdź
          </button>
        ) : (
          <button
            onClick={onNext}
            className="rounded-lg bg-gradient-to-br from-accent to-accent-hover px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-accent/20 transition-all hover:shadow-lg hover:shadow-accent/30"
          >
            {isLast ? 'Wyniki' : 'Następne'}
          </button>
        )}
      </div>
    </main>
  );
}
