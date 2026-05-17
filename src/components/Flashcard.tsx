import { useEffect, useState } from 'react';
import type { Question } from '../types';

type Props = {
  question: Question;
  categoryLabel: string;
  currentIdx: number;
  total: number;
  onRate: (knew: boolean) => void;
  onExit: () => void;
};

export default function Flashcard({
  question,
  categoryLabel,
  currentIdx,
  total,
  onRate,
  onExit,
}: Props) {
  const [revealed, setRevealed] = useState(false);

  // reset rewelacji przy zmianie pytania
  useEffect(() => {
    setRevealed(false);
  }, [question.id]);

  // skróty klawiszowe: Space/Enter = pokaż; po pokazaniu: 1/N = nie wiem, 2/W = wiem
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      const k = e.key.toLowerCase();
      if (!revealed) {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          setRevealed(true);
        }
        return;
      }
      if (e.key === '1' || k === 'n') {
        e.preventDefault();
        onRate(false);
      } else if (e.key === '2' || k === 'w') {
        e.preventDefault();
        onRate(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [revealed, onRate]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between gap-2">
        <button
          onClick={onExit}
          className="text-sm text-text-muted hover:text-text"
        >
          ← Wyjdź
        </button>
        <div className="font-mono text-sm text-text-muted tabular-nums">
          {currentIdx + 1} / {total}
        </div>
      </div>

      <div className="mb-5 h-1 overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full bg-accent transition-all"
          style={{ width: `${((currentIdx + 1) / total) * 100}%` }}
        />
      </div>

      <article className="rounded-lg border border-border bg-surface p-6">
        <div className="text-xs font-medium uppercase tracking-wide text-text-muted">
          {categoryLabel}
        </div>
        <h2 className="mt-2 text-lg font-semibold leading-snug text-text sm:text-xl">
          {question.q}
        </h2>

        {question.code && (
          <pre className="mt-3 overflow-x-auto rounded-md border border-border bg-bg p-3 font-mono text-xs leading-relaxed text-text">
            <code>{question.code}</code>
          </pre>
        )}

        {revealed && (
          <div className="mt-5 space-y-3 border-t border-border pt-5">
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-text-muted">
                Odpowiedź
              </div>
              <p className="mt-1 text-base font-semibold text-success">
                {question.a[question.correct]}
              </p>
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-text-muted">
                Wyjaśnienie
              </div>
              <p className="mt-1 text-sm leading-relaxed text-text">
                {question.expl}
              </p>
            </div>
          </div>
        )}
      </article>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover"
          >
            Pokaż odpowiedź
          </button>
        ) : (
          <>
            <button
              onClick={() => onRate(false)}
              className="rounded-md border border-danger/40 bg-danger/10 px-5 py-2.5 text-sm font-medium text-danger hover:bg-danger hover:text-white"
            >
              Nie wiedziałem
            </button>
            <button
              onClick={() => onRate(true)}
              className="rounded-md bg-success px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              Wiedziałem
            </button>
          </>
        )}
      </div>
    </main>
  );
}
