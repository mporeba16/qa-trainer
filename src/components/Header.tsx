import type { User } from '@supabase/supabase-js';
import type { Cert, Theme } from '../types';

type Props = {
  cert: Cert;
  certs: Cert[];
  onSwitchCert: (certId: string) => void;
  theme: Theme;
  onToggleTheme: () => void;
  onReset: () => void;
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
  theme,
  onToggleTheme,
  onReset,
  authEnabled,
  user,
  syncing,
  onLoginClick,
  onLogout,
}: Props) {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <div className="flex items-center gap-3">
          <h1 className="font-mono text-base font-semibold text-accent sm:text-lg">
            qa_trainer.exe
          </h1>
          {certs.length > 1 && (
            <select
              value={cert.id}
              onChange={(e) => onSwitchCert(e.target.value)}
              aria-label="Wybierz certyfikację"
              className="rounded-md border border-border bg-bg px-2 py-1 text-xs text-text hover:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-accent"
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
              className="hidden max-w-[160px] truncate font-mono text-xs text-text-muted sm:inline"
              title={user.email ?? ''}
            >
              {user.email}
              {syncing && <span className="ml-2 text-accent">●</span>}
            </span>
          )}
          {authEnabled && !user && (
            <button
              onClick={onLoginClick}
              className="rounded-md border border-accent bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent hover:bg-accent hover:text-white"
            >
              Zaloguj
            </button>
          )}
          {authEnabled && user && (
            <button
              onClick={onLogout}
              className="rounded-md border border-border bg-bg px-3 py-1.5 text-sm text-text hover:bg-surface-2"
            >
              Wyloguj
            </button>
          )}
          <button
            onClick={onToggleTheme}
            aria-label="Przełącz motyw"
            className="rounded-md border border-border bg-bg px-3 py-1.5 text-sm text-text hover:bg-surface-2"
          >
            {theme === 'dark' ? 'Jasny' : 'Ciemny'}
          </button>
          <button
            onClick={onReset}
            aria-label="Resetuj postęp"
            className="rounded-md border border-border bg-bg px-3 py-1.5 text-sm text-text hover:border-danger hover:text-danger"
          >
            Reset
          </button>
        </div>
      </div>
    </header>
  );
}
