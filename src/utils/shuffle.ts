import type { Question } from '../types';

// Fisher–Yates shuffle (na kopii, nie mutuje wejścia).
export function shuffle<T>(arr: readonly T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Tasuje opcje odpowiedzi w pytaniu i remapuje indeksy correct.
// Eliminuje bias autora pytań (np. większość poprawnych pod B/C).
// Działa zarówno dla single-correct (number), jak i multi-correct (number[]).
// Wyjaśnienia w `expl` mogą referować litery a/b/c/d — po tasowaniu treść tych liter
// w UI będzie inna; treść wyjaśnienia pozostaje wiarygodna, ale numeracja "a)/b)" w expl
// odnosi się do ORYGINALNEJ kolejności z PDF/bazy. OK kompromis: user uczy się od treści.
export function shuffleAnswers(q: Question): Question {
  const n = q.a.length;
  const perm = Array.from({ length: n }, (_, i) => i);
  for (let i = perm.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [perm[i], perm[j]] = [perm[j], perm[i]];
  }
  // newA[newIdx] = old a[perm[newIdx]] — czyli "co było na perm[newIdx], jest teraz na newIdx"
  const newA = perm.map((origIdx) => q.a[origIdx]);
  // Remapping correct: stary index → nowy index = perm.indexOf(stary)
  const newCorrect = Array.isArray(q.correct)
    ? q.correct.map((c) => perm.indexOf(c)).sort((a, b) => a - b)
    : perm.indexOf(q.correct);
  return { ...q, a: newA, correct: newCorrect };
}
