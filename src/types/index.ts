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
  a: string[]; // dokładnie 4 odpowiedzi
  correct: number; // index 0-3
  expl: string;
  code?: string; // opcjonalny blok kodu pokazywany w pytaniu
};

export type QuestionStat = {
  attempts: number;
  correct: number;
  lastAttempt: number; // ms timestamp
  lastCorrect: boolean;
};

export type GlobalStats = {
  totalAnswered: number;
  totalCorrect: number;
  sessions: number;
  examsAttempted: number;
  examsPassed: number;
  totalTimeSec: number;
};

export type Theme = 'light' | 'dark';

// Rekord pojedynczej zakończonej sesji — feed dla wykresu trendu.
export type SessionRecord = {
  timestamp: number; // ms timestamp zakończenia
  mode: QuizMode;
  total: number;
  correct: number;
};

// AppState = wszystko co persistujemy w localStorage (jeden klucz, jeden obiekt).
// Theme trzymamy osobno przez useTheme — żeby toggle nie musiał ruszać całego stanu.
// sessionHistory: optional dla backward compat — istniejący LS bez tego pola czyta jako undefined.
export type AppState = {
  stats: GlobalStats;
  questionStats: Record<number, QuestionStat>;
  wrongIds: number[];
  sessionHistory?: SessionRecord[];
};

export type QuizMode = 'practice' | 'review' | 'exam' | 'flashcards';

export type View = 'home' | 'setup' | 'quiz' | 'results';

export type SetupConfig = {
  categories: Category[]; // [] = wszystkie
  count: number;
};

export type SessionState = {
  mode: QuizMode;
  questions: Question[];
  currentIdx: number;
  // answers[i] = wybór dla pytania o indeksie i (null = brak odpowiedzi)
  answers: (number | null)[];
  // czy bieżące pytanie zostało już zatwierdzone (tylko practice/review)
  answered: boolean;
  correctCount: number;
  wrongCount: number;
  startTime: number; // ms timestamp
  endTime?: number;
};

export const DEFAULT_APP_STATE: AppState = {
  stats: {
    totalAnswered: 0,
    totalCorrect: 0,
    sessions: 0,
    examsAttempted: 0,
    examsPassed: 0,
    totalTimeSec: 0,
  },
  questionStats: {},
  wrongIds: [],
  sessionHistory: [],
};
