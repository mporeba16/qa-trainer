import { useEffect } from 'react';
import type { Theme } from '../types';
import { useLocalStorage } from './useLocalStorage';

// useTheme trzyma własny klucz w localStorage (decoupled od AppState),
// żeby toggle nie musiał przepisywać całego stanu aplikacji.
export function useTheme(): {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
} {
  const [theme, setTheme] = useLocalStorage<Theme>('qa_trainer_theme_v1', 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return { theme, toggleTheme, setTheme };
}
