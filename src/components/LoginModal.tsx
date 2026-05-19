import { useState, type FormEvent } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (email: string) => Promise<{ error: string | null }>;
  onGoogle: () => Promise<{ error: string | null }>;
};

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function LoginModal({ open, onClose, onSubmit, onGoogle }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [googleLoading, setGoogleLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('sending');
    setErrorMsg('');
    const { error } = await onSubmit(email);
    if (error) {
      setStatus('error');
      setErrorMsg(error);
    } else {
      setStatus('sent');
    }
  };

  const reset = () => {
    setEmail('');
    setStatus('idle');
    setErrorMsg('');
    setGoogleLoading(false);
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    setErrorMsg('');
    const { error } = await onGoogle();
    if (error) {
      setGoogleLoading(false);
      setStatus('error');
      setErrorMsg(error);
    }
    // Brak else — Supabase robi redirect; powracamy z tokenem w URL.
  };

  const handleClose = () => {
    onClose();
    // reset stanu po krotkim opoznieniu zeby user nie zobaczyl flashu
    setTimeout(reset, 200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md rounded-lg border border-border bg-bg p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-text">Zaloguj się</h2>

        {status === 'sent' ? (
          <div className="mt-3 space-y-3">
            <p className="text-sm text-text">
              Wysłaliśmy magic link na <span className="font-mono text-accent">{email}</span>.
              Otwórz email i kliknij link, żeby się zalogować.
            </p>
            <p className="text-xs text-text-muted">
              Link wygasa po godzinie. Jeśli nie widzisz emaila — sprawdź spam.
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleClose}
                className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover"
              >
                OK
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-3 space-y-3">
            <p className="text-sm text-text-muted">
              Logowanie synchronizuje Twój postęp między urządzeniami.
              Wybierz metodę:
            </p>

            <button
              type="button"
              onClick={handleGoogle}
              disabled={googleLoading || status === 'sending'}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text transition-colors hover:border-accent/40 hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <GoogleIcon />
              {googleLoading ? 'Łączenie z Google…' : 'Kontynuuj z Google'}
            </button>

            <div className="flex items-center gap-3 py-1">
              <div className="h-px flex-1 bg-border" />
              <span className="text-[10px] uppercase tracking-wider text-text-muted">lub</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ty@email.pl"
                required
                autoComplete="email"
                disabled={status === 'sending' || googleLoading}
                className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
              {status === 'error' && (
                <p className="text-xs text-danger">{errorMsg}</p>
              )}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-md border border-border bg-bg px-4 py-2 text-sm text-text hover:bg-surface-2"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  disabled={status === 'sending' || !email || googleLoading}
                  className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === 'sending' ? 'Wysyłanie…' : 'Wyślij link na email'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// Oficjalne SVG logo Google (Google Brand Guidelines — multi-color G).
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
