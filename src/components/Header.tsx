import type { Cert, Theme } from '../types';

type Props = {
  cert: Cert;
  certs: Cert[];
  onSwitchCert: (certId: string) => void;
  theme: Theme;
  onToggleTheme: () => void;
  onReset: () => void;
};

export default function Header({
  cert,
  certs,
  onSwitchCert,
  theme,
  onToggleTheme,
  onReset,
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
        <div className="flex items-center gap-2">
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
