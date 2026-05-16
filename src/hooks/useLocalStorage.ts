import { useEffect, useState } from 'react';

// Generic hook do persistencji wartości w localStorage.
// Gdy storage jest zablokowany (np. tryb incognito w niektórych przeglądarkach)
// — fallback do in-memory state z console.warn.
export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
): [T, (v: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') return defaultValue;
      const raw = window.localStorage.getItem(key);
      if (raw === null) return defaultValue;
      return JSON.parse(raw) as T;
    } catch (err) {
      console.warn(`[useLocalStorage] odczyt "${key}" nie powiódł się:`, err);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`[useLocalStorage] zapis "${key}" nie powiódł się:`, err);
    }
  }, [key, value]);

  return [value, setValue];
}
