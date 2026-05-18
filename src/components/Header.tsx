import type { User } from '@supabase/supabase-js';
import type { Cert } from '../types';

type Props = {
  cert: Cert;
  certs: Cert[];
  onSwitchCert: (certId: string) => void;
  onReset: () => void;
  onHome: () => void;
  sessionActive: boolean;
  // auth (opcjonalne — gdy Supabase nie skonfigurowany, hide login UI)
  authEnabled: boolean;
  user: User | null;
  syncing: boolean;
  onLoginClick: () => void;
  onLogout: () => void;
};

export default function Header({
  cert,
  certs,
  onSwitchCert,
  onReset,
  onHome,
  sessionActive,
  authEnabled,
  user,
  syncing,
  onLoginClick,
  onLogout,
}: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onHome}
            aria-label="Wróć do dashboardu"
            className="group flex items-center gap-2.5 transition-opacity hover:opacity-80"
          >
            <span className="flex h-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-hover px-2 text-sm font-bold tracking-tight text-white shadow-lg shadow-accent/30">
              QA
            </span>
            <span className="font-mono text-sm font-semibold tracking-tight text-text sm:text-base">
              trainer
            </span>
          </button>
          {certs.length > 1 && (
            <select
              value={cert.id}
              onChange={(e) => onSwitchCert(e.target.value)}
              aria-label="Wybierz certyfikację"
              className="rounded-lg border border-border bg-surface px-2.5 py-1 text-xs text-text hover:border-border/80 hover:bg-surface-2 focus:outline-none"
            >
              {certs.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.shortName}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {authEnabled && user && (
            <span
              className="hidden max-w-[160px] items-center gap-1.5 truncate font-mono text-xs text-text-muted sm:inline-flex"
              title={user.email ?? ''}
            >
              <span className="truncate">{user.email}</span>
              {syncing && (
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              )}
            </span>
          )}
          {authEnabled && !user && (
            <button
              onClick={onLoginClick}
              className="rounded-lg border border-accent/40 bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent transition-colors hover:border-accent hover:bg-accent hover:text-white"
            >
              Zaloguj
            </button>
          )}
          {authEnabled && user && (
            <button
              onClick={onLogout}
              className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-text-muted transition-colors hover:bg-surface-2 hover:text-text"
            >
              Wyloguj
            </button>
          )}
          <button
            onClick={onReset}
            disabled={sessionActive}
            aria-label="Resetuj postęp"
            title={sessionActive ? 'Zakończ lub wyjdź z quizu, by zresetować postęp' : undefined}
            className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-text-muted transition-colors hover:border-danger/60 hover:text-danger disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-text-muted"
          >
            Reset
          </button>
        </div>
      </div>
    </header>
  );
}
