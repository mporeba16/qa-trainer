# QA trainer

Trener pytań do egzaminu **ISTQB CTFL 4.0** (Foundation Level). Webowa, działa też jako PWA na telefonie. Bez backendu wymaganego — opcjonalnie sync między urządzeniami przez Supabase.

Aplikacja powstała jako narzędzie do własnej nauki, treść zgodna z oficjalnym sylabusem SJSI/ISTQB.

## Co umożliwia

**5 trybów nauki:**

- **Praktyka** — wybór kategorii (rozdziały sylabusa lub bonus rekrutacyjny), feedback od razu po odpowiedzi z wyjaśnieniem opartym o sylabus
- **Fiszki** — pytanie → odsłaniana odpowiedź, sam oceniasz "wiem / nie wiem"
- **Powtórki (SRS-light)** — tylko pytania, na które odpowiedziałeś źle. Poprawna odpowiedź usuwa pytanie z listy
- **Egzamin (losowy)** — 40 losowych pytań z bazy, 60 min, próg 65%, bez feedbacku w trakcie
- **Oficjalny egzamin ISTQB Zbiór A** — oryginalny zestaw 40 pytań z PDF SJSI (PL, wersja 1.6), stała kolejność, oficjalne wyjaśnienia z PDF odpowiedzi

**Materiał (277 pytań):**

- **112 pytań CTFL** pokrywających 1:1 sylabus v4.0.1 w 6 kategoriach:
  - Podstawy testowania (18) — rozdz. 1
  - Cykl wytwarzania (20) — rozdz. 2
  - Testowanie statyczne (14) — rozdz. 3
  - Analiza i projektowanie (26) — rozdz. 4
  - Zarządzanie testowaniem (24) — rozdz. 5
  - Narzędzia testowe (10) — rozdz. 6
- **40 pytań oficjalnego egzaminu** ISTQB Zbiór A z oficjalnymi wyjaśnieniami SJSI
- **125 pytań bonusowych** (defekty, agile, API, web, narzędzia, mobile, soft skills) — przydatne na rozmowy QA

Każde wyjaśnienie pytania CTFL referuje konkretną sekcję sylabusa (np. *"Sylabus 4.2.2"*), żeby ułatwić powrót do PDF.

**Funkcje quizu:**

- Obsługa pytań z 5 opcjami (a–e) i wymagających wyboru wielu odpowiedzi (multi-select all-or-nothing, jak na prawdziwym CTFL)
- Tasowanie kolejności opcji per sesja — eliminuje pamiętanie pozycji odpowiedzi
- Tabele i diagramy w pytaniach renderowane w monospace ze scrollem
- Inline markdown w wyjaśnieniach (`**bold**`, `*italic*`, `` `code` ``)
- Skróty klawiszowe: `1–5` lub `A–E` do wyboru, `Enter` do zatwierdzenia / następnego pytania
- Postęp wg kategorii na dashboardzie (pokrycie + procent opanowania)
- Timer w trybach egzaminacyjnych z paskiem kolorów (zielony → żółty < 5 min → czerwony < 1 min)

**Inne:**

- PWA — instalowalna na iOS / Android, działa offline (cache przez Workbox)
- Opcjonalna autentykacja przez Supabase (magic link) + cross-device sync postępu
- Modern dark UI w stylu Linear (fiolet/indygo na ciemnym tle), bez light mode

## Stack

- **React 19** + **TypeScript** strict
- **Vite 7** + **Tailwind CSS v4** (CSS-first config przez `@theme`)
- **localStorage** dla persistencji (klucz `qa_trainer_v1` per cert)
- **Supabase** (opcjonalnie) — auth + sync stanu między urządzeniami
- **vite-plugin-pwa** + Workbox dla offline
- Bez routera — manualne przełączanie widoków przez stan w `App.tsx`

## Struktura projektu

```
src/
├── data/
│   ├── questions.ts          # baza 237 pytań (CTFL + bonus)
│   ├── exam-sample-a.ts      # oficjalny egzamin ISTQB Zbiór A (40 pyt.)
│   ├── istqb-ctfl.ts         # definicja certyfikacji CTFL
│   └── index.ts              # rejestr certyfikacji
├── types/index.ts            # centralne typy + helper isCorrectAnswer
├── hooks/
│   ├── useAuth.ts            # Supabase magic link
│   └── useLocalStorage.ts
├── utils/
│   ├── shuffle.ts            # Fisher-Yates + shuffleAnswers (eliminacja bias B/C)
│   ├── markdown.tsx          # inline parser **bold** / *italic* / `code`
│   └── syncState.ts          # merge cloud + local przy logowaniu
├── components/
│   ├── Dashboard.tsx         # ekran główny z kafelkami trybów
│   ├── QuizSetup.tsx         # wybór kategorii (cały zakres)
│   ├── QuizQuestion.tsx      # pytanie z multi-select i 5 opcjami
│   ├── QuizResults.tsx       # ekran wyników z błędnymi + wyjaśnieniami
│   ├── Flashcard.tsx
│   ├── Timer.tsx
│   ├── CategoryBreakdown.tsx
│   ├── ConfirmModal.tsx
│   ├── Toast.tsx
│   ├── LoginModal.tsx
│   ├── InstallPrompt.tsx     # PWA install banner
│   └── Header.tsx            # sticky z logo "QA + trainer"
├── lib/supabase.ts
├── App.tsx
├── main.tsx
└── index.css                 # paleta dark Linear-style + Inter font
```

## Uruchomienie lokalnie

```bash
npm install
npm run dev
```

Otwórz `http://localhost:5173`. Aplikacja działa **bez Supabase** — wystarczy localStorage. Jeśli chcesz włączyć sync między urządzeniami, ustaw zmienne w `.env.local`:

```env
VITE_SUPABASE_URL=https://twój-projekt.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

Bez tych zmiennych UI logowania jest ukryty (offline-only mode).

## Build i deployment

```bash
npm run build     # tsc -b && vite build
npm run preview   # podgląd builda produkcyjnego
```

Build trafia do `dist/` (~450 KB gzipped). Wdrożenie: dowolny statyczny host. Obecnie Netlify z auto-deploy z `main`.

## Skróty klawiszowe

- `1`–`5` lub `A`–`E` — wybór odpowiedzi (toggle przy multi-select)
- `Enter` — zatwierdzenie odpowiedzi (practice) / następne pytanie (exam)
- Klik logo "QA trainer" w nagłówku — powrót do dashboardu (z potwierdzeniem podczas sesji)

## Aktualizowanie pytań

Pytania CTFL leżą w `src/data/questions.ts`. Format:

```typescript
{
  id: 178,                    // unikalny w skali bazy (1–237 praktyczne, 10001+ oficjalny egzamin)
  cat: 'projektowanie',       // klucz kategorii (zgodny z CATEGORIES)
  q: 'Treść pytania...',      // markdown inline + \n dla nowych linii
  a: ['A', 'B', 'C', 'D'],    // 4 lub 5 opcji
  correct: 2,                 // index 0-3 (lub tablica dla multi-select)
  expl: 'Wyjaśnienie...',     // markdown inline
  code: '...',                // opcjonalnie: blok kodu/tabeli w monospace
}
```

Multi-select: `correct: [0, 4]` (a + e). Tabele/diagramy w pytaniach idą do pola `code` (monospace + scroll), nie do `q`.

## Roadmap

Zrealizowane (kolejność chronologiczna):

- ✓ MVP — 3 tryby quizu, persistencja, dark mode
- ✓ Wykres trendu skuteczności, eksport JSON, fiszki, PWA, system theme default
- ✓ Multi-cert support (architektura) + Supabase auth + cross-device sync
- ✓ Komplet 6 rozdziałów sylabusa CTFL v4.0.1 (102 nowe pytania, każde z referencją do sekcji sylabusa)
- ✓ Oficjalny egzamin ISTQB Zbiór A (40 pytań, multi-select, 5 opcji, oficjalne wyjaśnienia)
- ✓ Tasowanie opcji w runtime (eliminacja bias pozycji)
- ✓ Modernizacja UI (Linear-style paleta, dark-only, nowe ikony PWA)

Możliwe rozszerzenia (omawiane):

- Pełny SRS z interwałami (SM-2, Anki-style) zamiast obecnego "źle wraca, dobrze znika"
- Egzamin losowy zbalansowany sylabusowo (wagi z prawdziwego CTFL zamiast czystego random)
- Pytania dodatkowe A1–A26 z PDF egzaminu jako osobna kategoria
- Browse mode — przeglądanie pytań poza quizem
- Streaki / dziennik nauki / heatmapa kalendarza
- Flagi i własne notatki do pytań
- Sample exam Zbiór B (jeśli PDF dostępny)

## Licencja i źródła

Treść 112 pytań CTFL + 40 pytań egzaminu opracowana na podstawie:

- **ISTQB Certified Tester Foundation Level Syllabus v4.0.1** (PL, SJSI, 2025) — `ISTQB_CertyfikowanyTester_PoziomPodstawowy_v4.0.1.pdf`
- **CTFL 4.0 Egzamin przykładowy Zbiór A** (PL, SJSI, czerwiec 2024) — pytania i odpowiedzi

ISTQB® i logo są zastrzeżonymi znakami International Software Testing Qualifications Board. Aplikacja nie jest akredytowanym materiałem szkoleniowym ani oficjalnym egzaminem ISTQB.
