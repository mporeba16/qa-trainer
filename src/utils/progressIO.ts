import type { AppState } from '../types';

// Wymuszony download backupu jako .json — bez bibliotek, czysty Web API.
export function exportProgress(state: AppState): void {
  const json = JSON.stringify(state, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const a = document.createElement('a');
  a.href = url;
  a.download = `qa-trainer-${date}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Parse + light validation. Zwraca AppState albo null jeśli plik jest popsuty.
// Dopuszczamy dodatkowe pola (forward-compat na wypadek nowych pól w przyszłości).
export function parseProgress(json: string): AppState | null {
  let obj: unknown;
  try {
    obj = JSON.parse(json);
  } catch {
    return null;
  }
  if (!obj || typeof obj !== 'object') return null;
  const o = obj as Record<string, unknown>;

  const stats = o.stats as Record<string, unknown> | undefined;
  if (
    !stats ||
    typeof stats.totalAnswered !== 'number' ||
    typeof stats.totalCorrect !== 'number' ||
    typeof stats.sessions !== 'number' ||
    typeof stats.examsAttempted !== 'number' ||
    typeof stats.examsPassed !== 'number'
  ) {
    return null;
  }

  if (!o.questionStats || typeof o.questionStats !== 'object') return null;
  if (!Array.isArray(o.wrongIds)) return null;

  // wrongIds powinno być tablicą number
  if (!o.wrongIds.every((id) => typeof id === 'number')) return null;

  return obj as AppState;
}
