import { useEffect } from 'react';
import type { Theme } from '../types';
import { useLocalStorage } from './useLocalStorage';

// Pierwszy default: preferencja systemowa. Po manualnym toggle wartość
// trafia do localStorage i tam zostaje — system już jej nie nadpisze.
function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  try {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
  } catch {
    // matchMedia może rzucić w wyjątkowych środowiskach (jsdom bez polyfilla)
  }
  return 'dark';
}

// useTheme trzyma własny klucz w localStorage (decoupled od AppState),
// żeby toggle nie musiał przepisywać całego stanu aplikacji.
export function useTheme(): {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
} {
  const [theme, setTheme] = useLocalStorage<Theme>(
    'qa_trainer_theme_v1',
    getSystemTheme(),
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return { theme, toggleTheme, setTheme };
}
