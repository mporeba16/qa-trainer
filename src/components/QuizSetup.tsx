import { useMemo, useState } from 'react';
import type { Cert, SetupConfig } from '../types';

type Props = {
  mode: 'practice' | 'review' | 'flashcards';
  cert: Cert;
  wrongIdsCount: number;
  onCancel: () => void;
  onStart: (config: SetupConfig) => void;
};

const REVIEW_MAX = 30;

const TITLES: Record<Props['mode'], string> = {
  practice: 'Praktyka',
  review: 'Powtórki',
  flashcards: 'Fiszki',
};

export default function QuizSetup({ mode, cert, wrongIdsCount, onCancel, onStart }: Props) {
  const isReview = mode === 'review';
  const [selectedCats, setSelectedCats] = useState<string[]>([]);

  // Cały zakres z wybranych kategorii (lub wszystkich, gdy nie wybrano żadnej)
  const availableCount = useMemo(() => {
    if (isReview) return Math.min(wrongIdsCount, REVIEW_MAX);
    if (selectedCats.length === 0) return cert.questions.length;
    return cert.questions.filter((q) => selectedCats.includes(q.cat)).length;
  }, [isReview, wrongIdsCount, selectedCats, cert.questions]);

  const toggleCat = (cat: string) => {
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const handleStart = () => {
    onStart({
      categories: isReview ? [] : selectedCats,
      count: availableCount,
    });
  };

  const catKeys = Object.keys(cert.categories);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <button
        onClick={onCancel}
        className="mb-4 text-sm text-text-muted hover:text-text"
      >
        ← Wróć
      </button>

      <h1 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">{TITLES[mode]}</h1>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">
        {isReview
          ? `Tylko pytania, na które kiedyś odpowiedziałeś źle. Dostępnych: ${wrongIdsCount}.`
          : mode === 'flashcards'
            ? 'Wybierz kategorie (puste = wszystkie). Sam oceniasz, czy wiedziałeś odpowiedź.'
            : 'Wybierz kategorie (puste = wszystkie). Cały zakres zostanie odpytany.'}
      </p>

      {!isReview && (
        <section className="mt-8">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
            Kategorie
          </h2>
          <div className="flex flex-wrap gap-2">
            {catKeys.map((cat) => {
              const active = selectedCats.includes(cat);
              const catCount = cert.questions.filter((q) => q.cat === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => toggleCat(cat)}
                  className={
                    active
                      ? 'inline-flex items-center gap-2 rounded-full border border-accent bg-accent/15 px-3.5 py-1.5 text-sm font-medium text-accent shadow-sm shadow-accent/10'
                      : 'inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-text-muted transition-colors hover:border-border/60 hover:bg-surface-2 hover:text-text'
                  }
                >
                  <span>{cert.categories[cat]}</span>
                  <span
                    className={
                      active
                        ? 'rounded-md bg-accent/20 px-1.5 py-0.5 font-mono text-[10px] font-semibold tabular-nums text-accent'
                        : 'rounded-md bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] font-semibold tabular-nums text-text-muted'
                    }
                  >
                    {catCount}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      <div className="mt-8 flex items-baseline gap-2">
        <span className="text-xs uppercase tracking-wider text-text-muted">Do odpytania</span>
        <span className="font-mono text-2xl font-bold tabular-nums text-text">{availableCount}</span>
        <span className="text-sm text-text-muted">pyt.</span>
      </div>
      {availableCount === 0 && (
        <p className="mt-2 text-xs text-danger">
          Brak pytań dla wybranych filtrów.
        </p>
      )}

      <button
        onClick={handleStart}
        disabled={availableCount === 0}
        className="mt-6 w-full rounded-lg bg-gradient-to-br from-accent to-accent-hover px-5 py-3 text-sm font-medium text-white shadow-lg shadow-accent/30 transition-all hover:shadow-xl hover:shadow-accent/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none sm:w-auto"
      >
        {mode === 'flashcards' ? 'Zacznij fiszki' : 'Zacznij quiz'} →
      </button>
    </main>
  );
}
