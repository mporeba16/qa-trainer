import type { AppState, Cert, QuizMode } from '../types';
import { OFFICIAL_EXAM_CONFIG } from '../data/exam-sample-a';
import CategoryBreakdown from './CategoryBreakdown';

type Props = {
  appState: AppState;
  cert: Cert;
  onStartMode: (mode: QuizMode) => void;
};

export default function Dashboard({ appState, cert, onStartMode }: Props) {
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
        <FeaturedCard
          badge="OFICJALNE"
          title="Egzamin ISTQB CTFL 4.0 — Zbiór A"
          description={`Oryginalny przykładowy egzamin ISTQB (PL). ${OFFICIAL_EXAM_CONFIG.totalQuestions} pytań w oficjalnej kolejności, ${Math.round(OFFICIAL_EXAM_CONFIG.durationSec / 60)} min, próg ${OFFICIAL_EXAM_CONFIG.passPct}%. Niektóre pytania mają 5 opcji lub wymagają wyboru 2 odpowiedzi.`}
          actionLabel="Rozpocznij egzamin oficjalny"
          onClick={() => onStartMode('official-exam')}
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

function FeaturedCard({
  badge,
  title,
  description,
  actionLabel,
  onClick,
}: {
  badge: string;
  title: string;
  description: string;
  actionLabel: string;
  onClick: () => void;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 via-surface to-surface p-6">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative">
        <span className="inline-block rounded-full border border-accent/40 bg-accent/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
          {badge}
        </span>
        <h3 className="mt-3 text-lg font-semibold tracking-tight text-text sm:text-xl">{title}</h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">{description}</p>
        <button
          onClick={onClick}
          className="mt-5 rounded-lg bg-gradient-to-br from-accent to-accent-hover px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-accent/30 transition-all hover:shadow-xl hover:shadow-accent/40"
        >
          {actionLabel} →
        </button>
      </div>
    </div>
  );
}
