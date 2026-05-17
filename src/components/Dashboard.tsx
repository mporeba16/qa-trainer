import { useRef, type ChangeEvent } from 'react';
import type { AppState, Cert, QuizMode } from '../types';
import { parseProgress } from '../utils/progressIO';
import { formatDuration } from '../utils/format';
import CategoryBreakdown from './CategoryBreakdown';
import ProgressChart from './ProgressChart';

type Props = {
  appState: AppState;
  cert: Cert;
  onStartMode: (mode: QuizMode) => void;
  onExport: () => void;
  onImport: (state: AppState) => void;
  onImportError: () => void;
};

export default function Dashboard({
  appState,
  cert,
  onStartMode,
  onExport,
  onImport,
  onImportError,
}: Props) {
  const { stats, wrongIds, questionStats } = appState;
  const accuracy =
    stats.totalAnswered === 0
      ? 0
      : Math.round((stats.totalCorrect / stats.totalAnswered) * 100);
  const reviewDisabled = wrongIds.length === 0;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // reset wartości — żeby ponowny wybór tego samego pliku też trigger'ował change
    e.target.value = '';
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = parseProgress(text);
      if (parsed) onImport(parsed);
      else onImportError();
    } catch {
      onImportError();
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-6">
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="Odpowiedzi" value={stats.totalAnswered.toString()} />
        <StatCard label="Skuteczność" value={`${accuracy}%`} />
        <StatCard label="Sesje" value={stats.sessions.toString()} />
        <StatCard
          label="Egzaminy"
          value={`${stats.examsPassed}/${stats.examsAttempted}`}
        />
        <StatCard label="Czas nauki" value={formatDuration(stats.totalTimeSec ?? 0)} />
      </section>

      <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <ModeCard
          title="Praktyka"
          description="Wybierz kategorię i liczbę pytań. Feedback od razu po odpowiedzi."
          actionLabel="Zacznij"
          onClick={() => onStartMode('practice')}
        />
        <ModeCard
          title="Fiszki"
          description="Pytanie z odsłanianą odpowiedzią. Sam oceniasz: wiem / nie wiem."
          actionLabel="Fiszki"
          onClick={() => onStartMode('flashcards')}
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
          description={`${cert.examCount} pytań, ${Math.round(cert.examDurationSec / 60)} min, próg ${cert.examPassPct}%. Bez podpowiedzi w trakcie.`}
          actionLabel="Egzamin"
          onClick={() => onStartMode('exam')}
        />
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-text-muted">
          Trend skuteczności
        </h2>
        <ProgressChart history={appState.sessionHistory ?? []} />
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-text-muted">
          Postęp wg kategorii ({cert.shortName})
        </h2>
        <CategoryBreakdown
          questionStats={questionStats}
          categories={cert.categories}
          questions={cert.questions}
        />
      </section>

      <section className="mt-8 border-t border-border pt-6">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-text-muted">
          Backup
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={onExport}
            className="rounded-md border border-border bg-surface px-4 py-2 text-sm text-text hover:bg-surface-2"
          >
            Eksportuj JSON
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="rounded-md border border-border bg-surface px-4 py-2 text-sm text-text hover:bg-surface-2"
          >
            Importuj JSON
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            onChange={handleFile}
            hidden
          />
        </div>
        <p className="mt-2 text-xs text-text-muted">
          Eksport zapisze backup statystyk i powtórek do pliku. Import nadpisze obecny postęp (poprosi o potwierdzenie).
        </p>
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
