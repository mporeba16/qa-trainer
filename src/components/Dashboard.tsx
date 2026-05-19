import type { AppState, Cert, QuizMode } from '../types';
import { OFFICIAL_EXAM_META, type ExamLetter } from '../data/exam-sample-meta';
import CategoryBreakdown from './CategoryBreakdown';

type Props = {
  appState: AppState;
  cert: Cert;
  onStartMode: (mode: QuizMode) => void;
  loadingExamLetter: ExamLetter | null;
};

export default function Dashboard({ appState, cert, onStartMode, loadingExamLetter }: Props) {
  const { wrongIds, questionStats } = appState;
  const reviewDisabled = wrongIds.length === 0;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <section className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">
          {cert.name}
        </h1>
        <p className="mt-1.5 text-sm text-text-muted">
          Wybierz tryb nauki lub uruchom oficjalny egzamin ISTQB.
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <ModeCard
          title="Praktyka"
          description="Wybierz kategorie — cały zakres odpytany. Feedback od razu po odpowiedzi."
          actionLabel="Zacznij"
          accent="indigo"
          onClick={() => onStartMode('practice')}
        />
        <ModeCard
          title="Fiszki"
          description="Wybierz kategorie. Sam oceniasz: wiem / nie wiem."
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
          title="Egzamin (losowy)"
          description={`${cert.examCount} pytań losowo, ${Math.round(cert.examDurationSec / 60)} min, próg ${cert.examPassPct}%. Bez podpowiedzi.`}
          actionLabel="Egzamin"
          onClick={() => onStartMode('exam')}
        />
      </section>

      <section className="mt-4">
        <OfficialExamPanel
          samples={[
            { letter: 'A', mode: 'official-exam' },
            { letter: 'B', mode: 'official-exam-b' },
            { letter: 'C', mode: 'official-exam-c' },
            { letter: 'D', mode: 'official-exam-d' },
          ]}
          count={OFFICIAL_EXAM_META.totalQuestions}
          durationMin={Math.round(OFFICIAL_EXAM_META.durationSec / 60)}
          passPct={OFFICIAL_EXAM_META.passPct}
          onStart={onStartMode}
          loadingLetter={loadingExamLetter}
        />
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
          Postęp wg kategorii ({cert.shortName})
        </h2>
        <CategoryBreakdown
          questionStats={questionStats}
          categories={cert.categories}
          questions={cert.questions}
        />
      </section>
    </main>
  );
}

function ModeCard({
  title,
  description,
  actionLabel,
  onClick,
  disabled,
  accent,
}: {
  title: string;
  description: string;
  actionLabel: string;
  onClick: () => void;
  disabled?: boolean;
  accent?: 'indigo';
}) {
  const btnClass = accent === 'indigo'
    ? 'mt-4 rounded-lg bg-gradient-to-br from-accent to-accent-hover px-4 py-2 text-sm font-medium text-white shadow-md shadow-accent/20 transition-all hover:shadow-lg hover:shadow-accent/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none'
    : 'mt-4 rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-text transition-colors hover:border-accent/40 hover:bg-accent/10 hover:text-accent disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-surface-2 disabled:hover:text-text';

  return (
    <div className="group flex flex-col rounded-xl border border-border/80 bg-surface p-5 transition-colors hover:border-border">
      <h3 className="text-base font-semibold tracking-tight text-text">{title}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-text-muted">{description}</p>
      <button
        onClick={onClick}
        disabled={disabled}
        className={btnClass}
      >
        {actionLabel}
      </button>
    </div>
  );
}

type Sample = {
  letter: ExamLetter;
  mode: QuizMode;
};

function OfficialExamPanel({
  samples,
  count,
  durationMin,
  passPct,
  onStart,
  loadingLetter,
}: {
  samples: Sample[];
  count: number;
  durationMin: number;
  passPct: number;
  onStart: (mode: QuizMode) => void;
  loadingLetter: ExamLetter | null;
}) {
  const anyLoading = loadingLetter !== null;
  return (
    <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 via-surface to-surface p-6">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative">
        <span className="inline-block rounded-full border border-accent/40 bg-accent/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
          OFICJALNE EGZAMINY
        </span>
        <h3 className="mt-3 text-lg font-semibold tracking-tight text-text sm:text-xl">
          Egzamin ISTQB CTFL 4.0 — zestawy przykładowe (PL)
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
          Oryginalne pytania z oficjalnych egzaminów przykładowych ISTQB. Pytania w stałej kolejności,
          z licznikiem czasu i progiem zdania {passPct}%. Bez podpowiedzi w trakcie.
        </p>

        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {samples.map((s) => {
            const isLoading = loadingLetter === s.letter;
            return (
              <button
                key={s.letter}
                onClick={() => onStart(s.mode)}
                disabled={anyLoading}
                aria-busy={isLoading}
                className="group flex flex-col items-start gap-1 rounded-xl border border-accent/40 bg-gradient-to-br from-accent to-accent-hover px-4 py-3 text-left shadow-md shadow-accent/20 transition-all hover:shadow-lg hover:shadow-accent/30 disabled:cursor-wait disabled:opacity-60 disabled:shadow-none"
              >
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm font-semibold text-white">Zbiór {s.letter}</span>
                  {isLoading ? (
                    <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  ) : (
                    <span className="text-white transition-transform group-hover:translate-x-0.5">→</span>
                  )}
                </div>
                <span className="font-mono text-[11px] tabular-nums text-white/80">
                  {isLoading ? 'Ładowanie…' : `${count} pyt. · ${durationMin} min`}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
