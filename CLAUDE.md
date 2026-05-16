# QA Trainer - Project Guide for Claude Code

## Cel projektu

Webowa aplikacja do nauki na rozmowy QA i egzamin ISTQB CTFL.
Quiz ABCD z trackingiem postępu, systemem powtórek (SRS-light), trybem egzaminacyjnym.

**Użytkownik:** Maciej, manual QA z 3-letnim doświadczeniem, uczy się TypeScript/React od podstaw.
Dlatego: **prosty, czytelny kod**, dużo komentarzy przy ważnych miejscach, brak nadmiernych abstrakcji.

## Stack techniczny

- **React 19** + **TypeScript** (strict mode)
- **Vite 7** jako bundler (`npm run dev`, `npm run build`)
- **Tailwind CSS v4** do stylowania (`@import "tailwindcss"` w `src/index.css`, plugin `@tailwindcss/vite`)
- **localStorage** do persistencji - **bez backendu**, bez routingu
- **Deploy:** Netlify (auto-deploy z GitHub main)

## Architektura

Single-page app z manualnym przełączaniem widoków przez stan (bez `react-router` - przekombinowanie dla tego scope'u).

### Struktura folderów

```
src/
├── data/
│   └── questions.ts          # baza pytań - jedyne źródło prawdy
├── types/
│   └── index.ts              # wszystkie typy TS
├── hooks/
│   ├── useLocalStorage.ts    # generic hook do persistencji
│   ├── useTheme.ts           # dark/light mode
│   └── useQuiz.ts            # logika quizu
├── components/
│   ├── Header.tsx            # logo + toggle theme + reset
│   ├── Dashboard.tsx         # ekran główny ze statsami
│   ├── QuizSetup.tsx         # wybór kategorii i liczby pytań
│   ├── QuizQuestion.tsx      # jedno pytanie z odpowiedziami
│   ├── QuizResults.tsx       # ekran wyników
│   ├── Timer.tsx             # licznik czasu w exam mode
│   ├── CategoryBreakdown.tsx # progres po kategoriach
│   └── ConfirmModal.tsx      # reusable modal (reset, exit)
├── utils/
│   └── shuffle.ts            # pomocnicze funkcje
├── App.tsx                   # router widoków, główny state
├── main.tsx
└── index.css                 # tylko @import tailwindcss
```

**Zasada:** jeśli plik ma więcej niż 200 linii - czas go rozdzielić.

## Konwencje kodu

### TypeScript
- **Strict mode ON** (już jest w `tsconfig.json` z Vite template)
- **Wszystkie funkcje, propsy i hooki typowane** - żadnego `any`
- Typy w jednym miejscu: `src/types/index.ts`
- Wolimy `type` od `interface` dla prostoty (chyba że extending)

### React
- **Tylko function components**, nigdy class components
- **Hooki** - `useState`, `useEffect`, custom hooks dla logiki współdzielonej
- **Bez Redux/Zustand** - dla tego projektu wystarczy useState + custom hooks
- Propsy typowane przez `type Props = { ... }` powyżej komponentu
- Komponenty default export (na końcu pliku), typy named export

### Styling (Tailwind v4)
- Wszystko przez klasy Tailwind, **żadnego CSS-in-JS**, żadnych modułów
- Używamy CSS variables zdefiniowanych w `index.css` dla theme (light/dark)
- Theme przez `data-theme="dark"` na `<html>` lub `<body>`
- Dla powtarzających się patternów - zmienna ze stringiem klas, **nie nowy komponent**

### Pliki i nazewnictwo
- Komponenty: **PascalCase.tsx** (`Dashboard.tsx`)
- Hooki: **camelCase z prefiksem `use`** (`useLocalStorage.ts`)
- Utils: **camelCase** (`shuffle.ts`)
- Typy: w `types/index.ts` jako named exports

## Zasady kluczowe

### 1. Persistencja
Wszystko, co user robi, **musi przeżyć reload**:
- statystyki (totalAnswered, totalCorrect, sessions)
- per-question stats (attempts, lastCorrect)
- wrongIds (pytania do powtórki)
- theme preference

**Klucz w localStorage:** `qa_trainer_v1` (versionowany na wypadek migracji w przyszłości).

### 2. Tryby quizu
- **practice** - feedback od razu po odpowiedzi + wyjaśnienie, wybór kategorii i liczby pytań
- **review** - tylko pytania z `wrongIds`, użytkownik wybiera ile (max = ile ma w wrongIds, capped na 30)
- **exam** - 40 random pytań, 60 min timer, **bez feedbacku w trakcie**, wynik dopiero na końcu, próg 65%

### 3. Algorytm wrongIds (SRS-light)
- Pytanie odpowiedziane **źle** → dodaj do `wrongIds` (jeśli nie ma)
- Pytanie odpowiedziane **dobrze** → usuń z `wrongIds`
- Nie używamy pełnego algorytmu SM-2 / Anki - **prostota > optymalność**

### 4. Edge cases (zawsze przemyśl)
- Co jeśli `wrongIds` jest pusty? → przycisk "Powtórki" disabled albo info
- Co jeśli kategoria ma mniej pytań niż wybrał użytkownik? → cap na maksymalną liczbę
- Co jeśli localStorage jest zablokowany (incognito)? → graceful fallback (in-memory state)
- Co jeśli user odświeży stronę w trakcie exam? → na razie tracimy progres (NIE komplikujemy)

### 5. Accessibility
- Wszystkie interaktywne elementy: `<button>` (nie `<div onClick>`)
- Skróty klawiszowe: `1-4` lub `A-D` do wyboru, `Enter` do next
- Focus states czytelne (Tailwind `focus:ring-2`)
- `aria-label` tam, gdzie ikony bez tekstu

## Workflow developerski

### Małe iteracje
- **Jedna feature na raz**, nie wszystko na hura
- Po każdej działającej feature: `git commit` z opisowym message
- Format commitów: `feat:`, `fix:`, `chore:`, `refactor:`, `style:`

### Testowanie ręczne
Po każdej zmianie:
1. `npm run dev` - sprawdź czy działa
2. Przejdź przez happy path danej feature
3. Sprawdź edge case (puste, max, błędne)
4. Sprawdź dark + light mode
5. Sprawdź na mobile (DevTools → Device Mode)

### Przed commitem
- `npm run build` musi przejść bez błędów TypeScript
- Brak `console.log` w finalnym kodzie (chyba że error handling)
- Brak zakomentowanego martwego kodu

## Czego NIE robić

- ❌ **Nie dodawaj zależności bez potrzeby** - każda nowa biblioteka = potencjalny problem
- ❌ **Nie nadinżynieruj** - dla tego scope'u nie potrzebujemy Redux, react-query, framework testowy
- ❌ **Nie pisz custom CSS** - 99% przypadków da się Tailwindem
- ❌ **Nie używaj `any`** - jeśli kusi, znaczy że typy są źle ułożone
- ❌ **Nie commituj `node_modules`** - jest w `.gitignore`
- ❌ **Nie zmieniaj struktury folderów bez powodu** - konsekwencja > "lepsza" struktura

## Co robić zawsze

- ✅ **Czytaj `questions.ts` przed dodawaniem funkcji** związanych z pytaniami - format/typy stamtąd
- ✅ **Sprawdzaj `src/types/index.ts`** zanim wymyślisz nowy typ - może już istnieje
- ✅ **Po dodaniu komponentu**: dodaj typy `Props`, eksportuj default
- ✅ **Po dodaniu state'u**: pomyśl czy musi być persisted (localStorage)
- ✅ **Mów mi gdy coś jest niejasne** - nie zgaduj wymagań

## Częste pułapki

1. **Tailwind v4 ≠ v3** - składnia config się zmieniła, używamy CSS-first config przez `@theme` w `index.css`
2. **localStorage w SSR** - nie ma tu SSR, ale jakby co: zawsze `typeof window !== 'undefined'`
3. **Stale closures w useEffect** - dodawaj zależności do dependency array
4. **localStorage sync między tabami** - na razie ignorujemy, gdyby user otworzył 2 taby
5. **Timer w exam** - `setInterval` musi być cleared w `useEffect` cleanup, inaczej memory leak

## Skróty do referencji

- **Baza pytań:** `src/data/questions.ts` - 90 pytań w 8 kategoriach
- **Kategorie:** istqb, defects, agile, api, web, tools, design, soft
- **Egzamin ISTQB:** 40 pytań, 60 min, próg 65% (zgodnie z CTFL v4.0)
- **Live preview:** `npm run dev` → http://localhost:5173
- **Build:** `npm run build` → `dist/` folder

## Roadmap (kolejność implementacji)

### Faza 1 - MVP (Tydzień 1)
1. Types (`types/index.ts`)
2. Hook `useLocalStorage`
3. Hook `useTheme`
4. Header + theme toggle
5. Dashboard (statystyki + 3 karty trybów)
6. QuizSetup (wybór kategorii i liczby)
7. QuizQuestion + logika practice mode
8. QuizResults
9. Tryb Review
10. Tryb Exam + Timer
11. CategoryBreakdown
12. ConfirmModal (reset + exit)
13. Skróty klawiszowe
14. Polish + deploy

### Faza 2 - rozszerzenia (Tydzień 2+)
- Eksport wyników (JSON)
- Wykres postępu w czasie (recharts)
- Tryb fiszek
- PWA (offline + install)
- Więcej pytań

---

**Ostatnia aktualizacja:** maj 2026 - przy okazji każdej większej zmiany aktualizuj tę sekcję.
