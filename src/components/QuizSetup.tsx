import { useMemo, useState } from 'react';
import type { Category, SetupConfig } from '../types';
import { CATEGORIES, QUESTIONS } from '../data/questions';

type Props = {
  mode: 'practice' | 'review' | 'flashcards';
  wrongIdsCount: number;
  onCancel: () => void;
  onStart: (config: SetupConfig) => void;
};

const COUNT_OPTIONS = [5, 10, 20, 30, 50] as const;
const REVIEW_MAX = 30;

const TITLES: Record<Props['mode'], string> = {
  practice: 'Praktyka',
  review: 'Powtórki',
  flashcards: 'Fiszki',
};

export default function QuizSetup({ mode, wrongIdsCount, onCancel, onStart }: Props) {
  const isReview = mode === 'review';
  const [selectedCats, setSelectedCats] = useState<Category[]>([]);
  const [count, setCount] = useState<number>(10);

  // Ile pytań mamy faktycznie do dyspozycji dla aktualnych filtrów
  const availableCount = useMemo(() => {
    if (isReview) return Math.min(wrongIdsCount, REVIEW_MAX);
    if (selectedCats.length === 0) return QUESTIONS.length;
    return QUESTIONS.filter((q) => selectedCats.includes(q.cat)).length;
  }, [isReview, wrongIdsCount, selectedCats]);

  // Jeśli żadna z opcji COUNT_OPTIONS nie mieści się w dostępnych pytaniach
  // (rzadki edge case dla review), zaproponuj "wszystkie".
  const showAllAvailable =
    availableCount > 0 && availableCount < COUNT_OPTIONS[0];

  const toggleCat = (cat: Category) => {
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const handleStart = () => {
    const finalCount = Math.min(count, availableCount);
    onStart({
      categories: isReview ? [] : selectedCats,
      count: finalCount,
    });
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <button
        onClick={onCancel}
        className="mb-4 text-sm text-text-muted hover:text-text"
      >
        ← Wróć
      </button>

      <h1 className="text-2xl font-semibold text-text">{TITLES[mode]}</h1>
      <p className="mt-1 text-sm text-text-muted">
        {isReview
          ? `Tylko pytania, na które kiedyś odpowiedziałeś źle. Dostępnych: ${wrongIdsCount}.`
          : mode === 'flashcards'
            ? 'Wybierz kategorie (puste = wszystkie) i liczbę fiszek. Sam oceniasz, czy wiedziałeś odpowiedź.'
            : 'Wybierz kategorie (puste = wszystkie) i liczbę pytań.'}
      </p>

      {!isReview && (
        <section className="mt-6">
          <h2 className="mb-2 text-sm font-medium uppercase tracking-wide text-text-muted">
            Kategorie
          </h2>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(CATEGORIES) as Category[]).map((cat) => {
              const active = selectedCats.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleCat(cat)}
                  className={
                    active
                      ? 'rounded-full border border-accent bg-accent px-3 py-1.5 text-sm font-medium text-white'
                      : 'rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-text hover:bg-surface-2'
                  }
                >
                  {CATEGORIES[cat]}
                </button>
              );
            })}
          </div>
        </section>
      )}

      <section className="mt-6">
        <h2 className="mb-2 text-sm font-medium uppercase tracking-wide text-text-muted">
          Liczba pytań
        </h2>
        <div className="flex flex-wrap gap-2">
          {COUNT_OPTIONS.map((c) => {
            const disabled = c > availableCount;
            const active = c === count && !disabled;
            return (
              <button
                key={c}
                onClick={() => setCount(c)}
                disabled={disabled}
                className={
                  active
                    ? 'rounded-md border border-accent bg-accent px-4 py-2 text-sm font-medium text-white'
                    : 'rounded-md border border-border bg-surface px-4 py-2 text-sm text-text hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-surface'
                }
              >
                {c}
              </button>
            );
          })}
          {showAllAvailable && (
            <button
              onClick={() => setCount(availableCount)}
              className={
                count === availableCount
                  ? 'rounded-md border border-accent bg-accent px-4 py-2 text-sm font-medium text-white'
                  : 'rounded-md border border-border bg-surface px-4 py-2 text-sm text-text hover:bg-surface-2'
              }
            >
              Wszystkie ({availableCount})
            </button>
          )}
        </div>
        {count > availableCount && availableCount > 0 && (
          <p className="mt-2 text-xs text-warning">
            Dostępnych jest tylko {availableCount} pytań — tyle zostanie wylosowane.
          </p>
        )}
        {availableCount === 0 && (
          <p className="mt-2 text-xs text-danger">
            Brak pytań dla wybranych filtrów.
          </p>
        )}
      </section>

      <button
        onClick={handleStart}
        disabled={availableCount === 0}
        className="mt-8 w-full rounded-md bg-accent px-4 py-3 text-sm font-medium text-white hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {mode === 'flashcards' ? 'Zacznij fiszki' : 'Zacznij quiz'}
      </button>
    </main>
  );
}
