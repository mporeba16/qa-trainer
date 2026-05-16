# Pierwszy prompt do Claude Code

Otwórz Claude Code w folderze `qa-trainer/` (komendą `claude`), upewnij się że:
- `CLAUDE.md` jest w głównym folderze projektu
- `src/data/questions.ts` jest na miejscu

**Następnie skopiuj i wklej CAŁOŚĆ poniższego promptu jako pierwszą wiadomość:**

---

## 📋 PROMPT (kopiuj od tej linii ⬇️):

Cześć! Pracujemy nad projektem QA Trainer - webową aplikacją do nauki na rozmowy QA i egzamin ISTQB.

**Przed rozpoczęciem:**
1. Przeczytaj `CLAUDE.md` w głównym folderze - tam są wszystkie zasady projektu, stack, konwencje
2. Przeczytaj `src/data/questions.ts` - format pytań i typy
3. Sprawdź `package.json` i `vite.config.ts` - czy setup jest poprawny

**Twoje zadanie - Faza 1 MVP:**

Zbuduj kompletny MVP zgodnie z roadmapą w `CLAUDE.md` (sekcja "Faza 1 - MVP"). To znaczy:

1. **Stwórz typy** w `src/types/index.ts`:
   - `Question` (id, cat, q, a[], correct, expl, opcjonalnie code)
   - `Category` (typ literałowy: 'istqb' | 'defects' | 'agile' | 'api' | 'web' | 'tools' | 'design' | 'soft')
   - `QuestionStat` (attempts, correct, lastAttempt, lastCorrect)
   - `AppState` (stats, questionStats, wrongIds, theme)
   - `QuizMode` ('practice' | 'review' | 'exam')
   - `SessionState` (mode, questions, currentIdx, selectedAnswer, correctCount, wrongCount, startTime, ...)
   - Inne potrzebne typy

2. **Stwórz hook `useLocalStorage`** w `src/hooks/useLocalStorage.ts`:
   - Generic typem `<T>`
   - Argumenty: `key: string, defaultValue: T`
   - Zwraca: `[value: T, setValue: (v: T) => void]`
   - Pod spodem JSON serialize/deserialize
   - Graceful fallback gdy localStorage nieavailable

3. **Stwórz hook `useTheme`** w `src/hooks/useTheme.ts`:
   - Przechowuje preferencję w localStorage
   - Ustawia `data-theme` na `<html>` przy każdej zmianie
   - Default 'dark'
   - Eksportuje `theme` i `toggleTheme`

4. **Skonfiguruj theme przez CSS variables** w `src/index.css`:
   - `@import "tailwindcss";`
   - Pod tym `@theme` block z CSS variables (jeśli Tailwind v4)
   - LUB klasyczne `:root` i `[data-theme="dark"]` z custom properties (--bg, --text, --accent itp.)
   - Wzoruj się na palecie z poprzedniej aplikacji: dark mode oparty na #0d1117 (jak GitHub), accent zielony

5. **Stwórz komponenty (jeden po drugim, po każdym sprawdzaj że działa):**
   - `Header.tsx` - logo "qa_trainer.exe" + przyciski theme toggle i reset
   - `Dashboard.tsx` - 4 statystyki + 3 karty trybów + breakdown kategorii
   - `CategoryBreakdown.tsx` - pasek postępu dla każdej kategorii
   - `ConfirmModal.tsx` - reusable modal (props: open, title, message, onConfirm, onCancel)
   - `QuizSetup.tsx` - wybór kategorii (chipsy) i liczby pytań (5/10/20/30/50)
   - `QuizQuestion.tsx` - jedno pytanie + 4 odpowiedzi + (opcjonalnie) wyjaśnienie po odpowiedzi
   - `Timer.tsx` - licznik MM:SS dla exam mode, kolor zmienia się przy <5min (warning) i <1min (danger)
   - `QuizResults.tsx` - podsumowanie: score, %, czas, błędne, przycisk "powtórz błędne"

6. **Główna logika w `App.tsx`:**
   - State: `view` ('home' | 'setup' | 'quiz' | 'results')
   - State: `appState` przez `useLocalStorage('qa_trainer_v1', defaultState)`
   - State: `session` (in-memory, nie persisted - po reload tracimy quiz)
   - Routing przez switch po `view`
   - Logika quizu: shuffle pytań, tracking odpowiedzi, update appState

7. **Skróty klawiszowe:**
   - `1`, `2`, `3`, `4` lub `A`, `B`, `C`, `D` → wybór odpowiedzi
   - `Enter` → następne pytanie (jeśli przycisk aktywny)
   - Implementuj przez `useEffect` z `window.addEventListener('keydown', ...)` w `App.tsx`

8. **Tryby - kluczowe różnice:**
   - **Practice**: feedback po każdej odpowiedzi (kolory + wyjaśnienie), wybór kategorii i liczby
   - **Review**: tylko `wrongIds`, podobnie jak practice z feedback, max = liczba wrongIds (cap 30)
   - **Exam**: 40 random pytań, 60min timer, **bez feedbacku w trakcie**, wynik na końcu z progiem 65%

9. **Walidacje i edge cases:**
   - Review niedostępne (disabled card) gdy `wrongIds.length === 0`
   - Setup count > dostępne pytania → cap automatic
   - Timer cleanup w `useEffect` return
   - localStorage zablokowany → fallback in-memory + console.warn

10. **Po skończeniu MVP:**
    - `npm run build` - musi przejść bez błędów
    - Pokaż mi listę plików, które stworzyłeś
    - Powiedz, na co warto zwrócić uwagę przy testowaniu

**Zasady pracy:**

- **Pracuj iteracyjnie** - po każdym ważnym komponencie powiedz "gotowe, sprawdź czy działa" zanim pójdziesz dalej
- **Trzymaj się konwencji z CLAUDE.md** - jeśli coś jest tam ustalone, nie kombinuj na boku
- **Wszystko typowane**, brak `any`
- **Tailwind classes** zamiast custom CSS
- **Komentarze tylko tam, gdzie naprawdę potrzebne** - kod ma się tłumaczyć sam
- **Jeśli coś jest niejasne, pytaj** - nie zgaduj

Zaczynamy! Pokaż mi najpierw, że przeczytałeś `CLAUDE.md` i `questions.ts` (krótkie streszczenie + pytania jeśli coś niejasne), potem zacznij od typów.

---

## 📋 KONIEC PROMPTU ⬆️

## Co robić dalej

Po wykonaniu pierwszego promptu, Claude Code zacznie tworzyć pliki. Możliwe że:
- Zapyta o detale (np. dokładne kolory) - odpowiadasz
- Pokaże komponenty po kolei i poprosi o test - testujesz w przeglądarce
- Zaproponuje warianty - wybierasz

### Kolejne prompty (gdy MVP gotowy)

**Po przetestowaniu MVP:**

> Świetnie, MVP działa. Teraz:
> 1. Dodaj animacje wejścia/wyjścia dla komponentów (subtle, bez przesady)
> 2. Popraw responsywność - mobile breakpoint w `Dashboard` (statystyki w grid 2x2 zamiast 1x4)
> 3. Dodaj toast notification po reset postępu

**Dodawanie pytań:**

> Dodaj do `src/data/questions.ts` 20 nowych pytań w kategorii `mobile` (testowanie mobilne, Android, ADB, scrcpy, Firebase, crash reports). Format zgodny z istniejącymi. Pytania na poziomie mid-level QA.

**Nowe feature:**

> Dodaj nowy widok "Statystyki" - osobny ekran z:
> - wykresem postępu w czasie (recharts)
> - listą wszystkich pytań z statusem (✓/✗/nie próbowane)
> - możliwością filtrowania po kategorii
> 
> Dodaj nawigację do tego widoku z Dashboard.

### Debug / problemy

Gdy Claude Code coś źle zrobi:

> [Plik X.tsx] linia Y - błąd: [opis]. Pokaż jak to naprawić i wyjaśnij DLACZEGO to było źle.

> Zmiana w [pliku] nie działa - po kliknięciu [X] nie dzieje się [Y]. Pokaż kod tego flow i znajdź problem.

### Refaktor

> [Komponent X] ma już 250 linii. Wyodrębnij logikę do custom hooka i podziel UI na 2 mniejsze komponenty. Zachowaj zachowanie 1:1.

---

## Tips

- **Nie kopiuj wszystkiego naraz** - po dużej zmianie commituj i testuj
- **Jeśli Claude Code zaczyna głupieć** - `/compact` lub nawet `/clear` i podlinkuj `CLAUDE.md` jeszcze raz
- **Aktualizuj `CLAUDE.md` regularnie** - gdy nauczysz się czegoś nowego o projekcie, dopisz zasadę

Powodzenia! 🚀
