import { useState, type FormEvent } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (email: string) => Promise<{ error: string | null }>;
};

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function LoginModal({ open, onClose, onSubmit }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

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
          <form onSubmit={handleSubmit} className="mt-3 space-y-3">
            <p className="text-sm text-text-muted">
              Wpisz email — wyślemy link do logowania (zero hasła). Logowanie
              synchronizuje Twój postęp między urządzeniami.
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ty@email.pl"
              required
              autoFocus
              autoComplete="email"
              disabled={status === 'sending'}
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
                disabled={status === 'sending' || !email}
                className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === 'sending' ? 'Wysyłanie…' : 'Wyślij link'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
