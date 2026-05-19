// Onboarding modal — pojawia się przy pierwszym uruchomieniu aplikacji
// (gdy LS flag `qa_trainer_onboarded_v1` jest false i user nie jest zalogowany).
// Trzy CTA: Google one-tap, email magic link, kontynuuj bez logowania.

type Props = {
  open: boolean;
  onGoogle: () => Promise<{ error: string | null }>;
  onEmail: () => void; // otwiera klasyczny LoginModal
  onSkip: () => void;
  loadingGoogle: boolean;
  googleError: string | null;
};

export default function OnboardingModal({
  open,
  onGoogle,
  onEmail,
  onSkip,
  loadingGoogle,
  googleError,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md rounded-2xl border border-border bg-bg p-6 shadow-2xl">
        <div className="mb-1 inline-flex items-center gap-2">
          <span className="rounded-md bg-gradient-to-br from-accent to-accent-hover px-2 py-0.5 text-sm font-semibold tracking-tight text-white">
            QA
          </span>
          <span className="font-mono text-xs text-text-muted">trainer</span>
        </div>

        <h2 className="mt-3 text-xl font-semibold tracking-tight text-text">
          Witaj!
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          Zaloguj się żeby Twój postęp był zsynchronizowany między urządzeniami
          (telefon, laptop, tablet). Bez logowania dane zostają tylko na tym
          urządzeniu.
        </p>

        <div className="mt-5 space-y-2">
          <button
            type="button"
            onClick={onGoogle}
            disabled={loadingGoogle}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text transition-colors hover:border-accent/40 hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <GoogleIcon />
            {loadingGoogle ? 'Łączenie z Google…' : 'Kontynuuj z Google'}
          </button>

          <button
            type="button"
            onClick={onEmail}
            disabled={loadingGoogle}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text transition-colors hover:border-accent/40 hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ✉️ Zaloguj przez email (magic link)
          </button>
        </div>

        {googleError && (
          <p className="mt-3 text-xs text-danger">{googleError}</p>
        )}

        <div className="mt-5 border-t border-border/60 pt-4">
          <button
            type="button"
            onClick={onSkip}
            disabled={loadingGoogle}
            className="w-full rounded-lg px-4 py-2 text-sm text-text-muted transition-colors hover:bg-surface-2 hover:text-text disabled:cursor-not-allowed disabled:opacity-50"
          >
            Kontynuuj bez logowania
          </button>
          <p className="mt-1.5 text-[11px] text-text-muted">
            Możesz zalogować się później przez przycisk konta w nagłówku.
          </p>
        </div>
      </div>
    </div>
  );
}

// Oficjalne SVG logo Google.
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      />
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      />
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      />
    </svg>
  );
}
