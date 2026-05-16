import type { AppState, QuizMode } from '../types';
import CategoryBreakdown from './CategoryBreakdown';

type Props = {
  appState: AppState;
  onStartMode: (mode: QuizMode) => void;
};

export default function Dashboard({ appState, onStartMode }: Props) {
  const { stats, wrongIds, questionStats } = appState;
  const accuracy =
    stats.totalAnswered === 0
      ? 0
      : Math.round((stats.totalCorrect / stats.totalAnswered) * 100);
  const reviewDisabled = wrongIds.length === 0;

  return (
    <main className="mx-auto max-w-5xl px-4 py-6">
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Odpowiedzi" value={stats.totalAnswered.toString()} />
        <StatCard label="Skuteczność" value={`${accuracy}%`} />
        <StatCard label="Sesje" value={stats.sessions.toString()} />
        <StatCard
          label="Egzaminy"
          value={`${stats.examsPassed}/${stats.examsAttempted}`}
        />
      </section>

      <section className="mt-6 grid gap-3 sm:grid-cols-3">
        <ModeCard
          title="Praktyka"
          description="Wybierz kategorię i liczbę pytań. Feedback od razu po odpowiedzi."
          actionLabel="Zacznij"
          onClick={() => onStartMode('practice')}
        />
        <ModeCard
          title="Powtórki"
          description={
            reviewDisabled
              ? 'Brak pytań do powtórki — odpowiedz najpierw na kilka w praktyce.'
              : `Tylko błędnie odpowiedziane: ${wrongIds.length} pyt.`
          }
          actionLabel="Powtarzaj"
          onClick={() => onStartMode('review')}
          disabled={reviewDisabled}
        />
        <ModeCard
          title="Egzamin"
          description="40 pytań, 60 min, próg 65%. Bez podpowiedzi w trakcie."
          actionLabel="Egzamin"
          onClick={() => onStartMode('exam')}
        />
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-text-muted">
          Postęp wg kategorii
        </h2>
        <CategoryBreakdown questionStats={questionStats} />
      </section>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className="text-xs font-medium uppercase tracking-wide text-text-muted">
        {label}
      </div>
      <div className="mt-1 font-mono text-2xl font-semibold text-text tabular-nums">
        {value}
      </div>
    </div>
  );
}

function ModeCard({
  title,
  description,
  actionLabel,
  onClick,
  disabled,
}: {
  title: string;
  description: string;
  actionLabel: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col rounded-lg border border-border bg-surface p-4">
      <h3 className="text-lg font-semibold text-text">{title}</h3>
      <p className="mt-1 flex-1 text-sm text-text-muted">{description}</p>
      <button
        onClick={onClick}
        disabled={disabled}
        className="mt-4 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {actionLabel}
      </button>
    </div>
  );
}
