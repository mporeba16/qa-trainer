// Centralne typy aplikacji QA Trainer.
// Jeśli dodajesz nowy stan/strukturę — najpierw tutaj.

// Category jest teraz luźnym stringiem — każda certyfikacja definiuje własny
// zestaw kategorii w swoim obiekcie Cert. Walidacja per cert, nie per typ.
export type Category = string;

// Certyfikacja = paczka pytań + parametrów egzaminu. Trener może obsłużyć wiele
// (np. ISTQB CTFL, CTAL-TA, AWS, ...). Stan postępu jest per cert (osobny klucz LS).
export type Cert = {
  id: string;          // np. 'istqb-ctfl', 'istqb-ctal-ta'
  name: string;        // pełna nazwa wyświetlana
  shortName: string;   // kompaktowa nazwa do switchera
  categories: Record<string, string>; // klucz kategorii -> etykieta
  questions: Question[];
  examCount: number;       // pytań w trybie egzamin
  examDurationSec: number; // czas egzaminu
  examPassPct: number;     // próg zdania (%)
};

export type Question = {
  id: number;
  cat: Category;
  q: string;
  a: string[]; // 4 lub 5 odpowiedzi (egzamin oficjalny ISTQB dopuszcza 5)
  // single-correct: jeden index; multi-correct (egzamin ISTQB "wybierz DWIE"): tablica indeksów
  correct: number | number[];
  expl: string;
  code?: string; // opcjonalny blok kodu / scenariusz pokazywany w pytaniu
};

// Typ odpowiedzi użytkownika: pojedynczy index (single-select), tablica (multi-select), null (brak)
export type Answer = number | number[] | null;

// Helper: czy odpowiedź użytkownika jest poprawna względem klucza pytania.
// Dla multi-select wymaga DOKŁADNEGO dopasowania zbioru (all-or-nothing, zgodnie z ISTQB).
export function isCorrectAnswer(answer: Answer, correct: number | number[]): boolean {
  if (answer === null) return false;
  if (Array.isArray(correct)) {
    if (!Array.isArray(answer)) return false;
    if (answer.length !== correct.length) return false;
    const s1 = [...answer].sort((x, y) => x - y);
    const s2 = [...correct].sort((x, y) => x - y);
    return s1.every((v, i) => v === s2[i]);
  }
  if (Array.isArray(answer)) return false;
  return answer === correct;
}

export type QuestionStat = {
  attempts: number;
  correct: number;
  lastAttempt: number; // ms timestamp
  lastCorrect: boolean;
};

// AppState = wszystko co persistujemy w localStorage (jeden klucz, jeden obiekt).
export type AppState = {
  questionStats: Record<number, QuestionStat>;
  wrongIds: number[];
};

export type QuizMode = 'practice' | 'review' | 'exam' | 'flashcards' | 'official-exam';

export type View = 'home' | 'setup' | 'quiz' | 'results';

export type SetupConfig = {
  categories: Category[]; // [] = wszystkie
  count: number;
};

export type SessionState = {
  mode: QuizMode;
  questions: Question[];
  currentIdx: number;
  // answers[i] = wybór dla pytania o indeksie i (single index, tablica dla multi-select, lub null)
  answers: Answer[];
  // czy bieżące pytanie zostało już zatwierdzone (tylko practice/review)
  answered: boolean;
  correctCount: number;
  wrongCount: number;
  startTime: number; // ms timestamp
  endTime?: number;
};

export const DEFAULT_APP_STATE: AppState = {
  questionStats: {},
  wrongIds: [],
};
