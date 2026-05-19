// Metadata oficjalnych egzaminów ISTQB CTFL 4.0 (Zbiory A/B/C/D).
// Wartości stałe wg specyfikacji ISTQB — identyczne dla wszystkich zbiorów.
// Ten plik jest ładowany eagerly (mała stała), pytania (ciężka treść) lazy
// przez `loadExamSample` poniżej, żeby nie powiększać initial bundle.

import type { Question } from '../types';

export const OFFICIAL_EXAM_META = {
  totalQuestions: 40,
  durationSec: 60 * 60,
  passPct: 65,
} as const;

export type ExamLetter = 'A' | 'B' | 'C' | 'D';

// Dynamic import — każdy zbiór staje się osobnym chunkiem JS, pobieranym
// dopiero przy rozpoczęciu egzaminu. Bundle initial spada o ~120 kB.
export async function loadExamSample(letter: ExamLetter): Promise<Question[]> {
  switch (letter) {
    case 'A': {
      const m = await import('./exam-sample-a');
      return m.EXAM_SAMPLE_A;
    }
    case 'B': {
      const m = await import('./exam-sample-b');
      return m.EXAM_SAMPLE_B;
    }
    case 'C': {
      const m = await import('./exam-sample-c');
      return m.EXAM_SAMPLE_C;
    }
    case 'D': {
      const m = await import('./exam-sample-d');
      return m.EXAM_SAMPLE_D;
    }
  }
}
