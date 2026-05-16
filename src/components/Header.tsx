import type { Theme } from '../types';

type Props = {
  theme: Theme;
  onToggleTheme: () => void;
  onReset: () => void;
};

export default function Header({ theme, onToggleTheme, onReset }: Props) {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <h1 className="font-mono text-base font-semibold text-accent sm:text-lg">
          qa_trainer.exe
        </h1>
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
