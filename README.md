# QA Trainer - Pakiet startowy

Wszystko, co potrzebne, żeby zbudować QA Trainer jako aplikację webową w React + TypeScript + Vite + Tailwind, używając Claude Code, i wdrożyć ją na Netlify.

## Co jest w pakiecie

| Plik | Co to | Gdzie wrzucić |
|---|---|---|
| `SETUP.md` | Instrukcja krok po kroku: setup projektu, Git, Netlify | Czytasz - nie kopiujesz |
| `CLAUDE.md` | Zasady projektu dla Claude Code (stack, konwencje, roadmapa) | Główny folder projektu (`qa-trainer/CLAUDE.md`) |
| `FIRST_PROMPT.md` | Gotowy pierwszy prompt do skopiowania w Claude Code | Czytasz - kopiujesz prompt |
| `questions.ts` | Baza 90 pytań w TypeScript, gotowa do użycia | `qa-trainer/src/data/questions.ts` |

## Kolejność działania

### 1. Otwórz `SETUP.md` i wykonaj **Część 1** (5 min)
Zakłada projekt: Vite + React + TypeScript + Tailwind.

### 2. Wrzuć dwa pliki do projektu:
- `CLAUDE.md` → `qa-trainer/CLAUDE.md`
- `questions.ts` → `qa-trainer/src/data/questions.ts` (folder stwórz)

### 3. Otwórz Claude Code w folderze projektu
```bash
cd qa-trainer
claude
```

### 4. Skopiuj prompt z `FIRST_PROMPT.md` i wklej jako pierwszą wiadomość
Claude Code zbuduje MVP. To może zająć 10-20 minut Claude'a + Twoje testy w przeglądarce.

### 5. Po MVP: wdrożenie online
Wróć do `SETUP.md` → **Część 3: Deployment na Netlify**.

## Co dostaniesz po skończeniu Fazy 1

- Lokalna aplikacja na `localhost:5173`
- Wdrożona online: `qa-trainer-maciej.netlify.app` (lub podobny URL)
- Repo na GitHub - element do portfolio
- Stack, którego się uczysz: React, TypeScript, Tailwind, Vite, Git, deployment
- Doświadczenie z Claude Code w "real-world" projekcie

## Wskazówki

### Jak czytać `CLAUDE.md`
Nie musisz znać wszystkiego na pamięć - to jest plik dla Claude Code, żeby on wiedział, jak pracować. Ty go aktualizujesz, gdy coś ustalisz inaczej.

### Jak iterować
- **Faza 1 (MVP)** - tylko podstawy, niech działa. Nie dodawaj wszystkiego od razu.
- **Faza 2** (po deploy) - dodajesz feature'y po kolei, jedna na raz.
- Każda działająca feature → `git commit` → `git push` → Netlify deployuje.

### Jak rozmawiać z Claude Code
Konkretne komendy działają lepiej niż ogólne:
- ❌ "popraw to"
- ✅ "w `Dashboard.tsx`, sekcja statystyk - dodaj animację liczb (count-up) gdy widok się otwiera"

### Gdy coś nie działa
1. Lokalnie: `npm run dev` - sprawdź errors w terminalu i konsoli przeglądarki
2. Build: `npm run build` - jeśli przechodzi lokalnie, przejdzie i na Netlify
3. Claude Code głupieje: `/clear` i wklej `FIRST_PROMPT.md` jeszcze raz z kontekstem "to już istnieje, dokończ X"

## Roadmap rozwoju

### Tydzień 1 - MVP
- Setup + deploy
- Wszystkie 3 tryby quizu działają
- Persistencja w localStorage
- Dark mode

### Tydzień 2-3 - Polish
- Animacje
- Mobile UX
- Eksport wyników (JSON)
- Wykresy progresu (recharts)

### Tydzień 4+ - Rozszerzenia (przy nauce JS)
- Tryb fiszek
- PWA (instalacja na telefonie)
- Więcej pytań (cel: 200+)
- Tryb pytań otwartych

### Nice-to-have później
- Backend (Supabase) + sync między urządzeniami
- Auth (Google login)
- Tryb dla innych certyfikacji (CTAL, AWS)
- Mode multiplayer

## Pomoc

Jeśli się zatniesz - wróć do Claude w czacie (claude.ai) z konkretnym pytaniem:
- "[plik X] [problem Y] - jak to naprawić?"
- "Co oznacza error: [error message]?"
- "Jak dodać feature [X] do mojego projektu QA Trainer?"

Powodzenia! 🎯
