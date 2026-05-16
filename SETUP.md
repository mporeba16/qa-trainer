# QA Trainer - Setup od zera

Kompletna instrukcja jak postawić projekt lokalnie, rozwijać go w Claude Code i wdrożyć na Vercel.

**Czas całości:** ~30 minut.

---

## Część 1: Założenie projektu (5 min)

### 1. Otwórz terminal w wybranym folderze

```bash
cd ~/Documents  # albo gdzie trzymasz projekty
```

### 2. Stwórz projekt Vite + React + TypeScript

```bash
npm create vite@latest qa-trainer -- --template react-ts
```

Wybierze szablon automatycznie (`-- --template react-ts` przekazuje argumenty).

### 3. Wejdź do projektu i zainstaluj zależności

```bash
cd qa-trainer
npm install
```

### 4. Dodaj Tailwind CSS

```bash
npm install -D tailwindcss@latest @tailwindcss/vite@latest
```

### 5. Skonfiguruj Tailwind (Vite 7 + Tailwind 4)

**Edytuj `vite.config.ts`:**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

**Edytuj `src/index.css` (usuń wszystko i wklej):**

```css
@import "tailwindcss";
```

### 6. Sprawdź, że działa

```bash
npm run dev
```

Powinieneś zobaczyć URL typu `http://localhost:5173`. Otwórz go - zobaczysz domyślną stronę Vite.

### 7. Wrzuć pliki z pakietu

Skopiuj do projektu:
- **`CLAUDE.md`** → do głównego folderu projektu (`qa-trainer/CLAUDE.md`)
- **`questions.ts`** → do `src/data/questions.ts` (folder `data` trzeba stworzyć)

```bash
mkdir -p src/data
# Wklej tu plik questions.ts ręcznie albo cp z miejsca, gdzie go pobrałeś
```

### 8. Zainicjuj Git

```bash
git init
git add .
git commit -m "Initial commit: Vite + React + Tailwind setup"
```

---

## Część 2: Praca z Claude Code (główna część)

### 1. Otwórz projekt w Claude Code

W folderze `qa-trainer/`:

```bash
claude
```

### 2. Sprawdź, czy Claude Code widzi `CLAUDE.md`

Pierwszą wiadomością zapytaj:
```
Sprawdź czy widzisz plik CLAUDE.md w tym projekcie. Streść mi jego główne założenia.
```

Powinien przeczytać i zrobić podsumowanie.

### 3. Pierwszy prompt - budowa MVP

Skopiuj i wklej **CAŁY pierwszy prompt z pliku `FIRST_PROMPT.md`** (dołączony do pakietu).

Claude Code zacznie tworzyć komponenty. Pozwól mu pracować - może zająć kilka minut. Sprawdza pytania:
- Tworzy typy w `src/types/`
- Tworzy hooks w `src/hooks/`
- Tworzy komponenty w `src/components/`
- Aktualizuje `App.tsx` i `main.tsx`

### 4. Testuj w trakcie

Po każdej dużej zmianie odśwież `localhost:5173` w przeglądarce. Jeśli coś nie działa - mów Claude'owi konkretnie co i gdzie.

### 5. Committuj często

Po każdej działającej feature paczce:

```bash
git add .
git commit -m "feat: dodano komponent X"
```

Claude Code może to robić za Ciebie - poproś: *"zrób commit z opisowym message"*.

---

## Część 3: Deployment na Netlify (10 min)

### 1. Stwórz konto na GitHub (jeśli nie masz)

[github.com/signup](https://github.com/signup)

### 2. Stwórz repozytorium

Na GitHub: **New repository** → nazwa `qa-trainer` → **Private** (jeśli nie chcesz publicznie) → **Create**.

### 3. Wypchnij kod

W terminalu w folderze projektu:

```bash
git remote add origin https://github.com/TWOJ_USERNAME/qa-trainer.git
git branch -M main
git push -u origin main
```

(GitHub poprosi o token - wygeneruj go w Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token z uprawnieniem `repo`.)

### 4. Załóż konto na Netlify

[netlify.com](https://netlify.com) → **Sign Up** → użyj GitHub jako logowania (najwygodniej).

### 5. Importuj projekt

Netlify Dashboard → **Add new site** → **Import an existing project** → **Deploy with GitHub** → wybierz repo `qa-trainer`.

**Build settings Netlify zwykle wykryje automatycznie**, ale upewnij się że są:
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 20 (jeśli pyta, w Environment variables dodaj `NODE_VERSION=20`)

Kliknij **Deploy site**.

### 6. SPA routing - WAŻNE dla React

Netlify domyślnie nie wie, że to Single Page Application. Bez tego refresh na podstronach (jeśli kiedyś dodasz routing) zwróci 404.

**Stwórz plik `public/_redirects` w projekcie** z zawartością:

```
/*  /index.html  200
```

Potem:
```bash
git add public/_redirects
git commit -m "chore: add Netlify SPA redirect"
git push
```

(Tego pliku nie tworzy Vite domyślnie - musisz go dodać sam. Folder `public/` w Vite to assety, które trafiają do `dist/` bez przetwarzania.)

### 7. Po ~1 minucie

Dostajesz link typu `random-name-12345.netlify.app`. To Twoja aplikacja **online**.

**Zmień nazwę:** Site configuration → Change site name → `qa-trainer-maciej` (jeśli wolne) → dostajesz `qa-trainer-maciej.netlify.app`.

### 8. Każdy `git push` = automatyczny redeploy

Od teraz: zmiana w kodzie → `git push` → Netlify automatycznie deployuje nową wersję. W dashboardzie widzisz historię deployów, możesz w razie problemu rollback do poprzedniej wersji.

---

## Część 4: Iteracja (długoterminowo)

### Codzienny workflow

```bash
cd ~/Documents/qa-trainer
claude
```

W Claude Code:
- *"Dodaj feature X"*
- *"Popraw bug w komponencie Y"*
- *"Dodaj 10 nowych pytań do kategorii API"*

Po skończeniu pracy:
```bash
git add .
git commit -m "feat: opis zmiany"
git push
```

Netlify deployuje automatycznie. Sprawdzasz online za ~1-2 min.

### Częste komendy w Claude Code

| Komenda | Co robi |
|---|---|
| `/init` | Inicjalizuje (już zrobione) |
| `/clear` | Czyści historię w razie problemów |
| `/compact` | Kompresuje kontekst, gdy długa rozmowa |
| `/help` | Lista wszystkich komend |

### Co robić, gdy Claude Code "głupieje"

1. **`/compact`** - skraca kontekst
2. **`/clear` + nowy prompt z konkretnym celem** - zaczyna od nowa
3. **Update `CLAUDE.md`** - dodaj zasadę, której nie przestrzega

---

## Lista rzeczy do zrobienia (roadmap)

### MVP (Tydzień 1)
- [ ] Setup projektu (Vite + React + Tailwind + TypeScript)
- [ ] Wrzucenie `questions.ts` z 90 pytaniami
- [ ] Dashboard z statystykami
- [ ] Tryb Practice (quiz z feedback)
- [ ] Tryb Review (powtórki błędnych)
- [ ] Tryb Exam (40 pytań, 60 min)
- [ ] Persistencja w localStorage
- [ ] Dark/Light mode
- [ ] Deploy na Vercel

### V2 (Tydzień 2-3)
- [ ] Więcej pytań (cel: 200+)
- [ ] Kategorie filtrowane
- [ ] Wykresy postępu w czasie (recharts)
- [ ] Eksport wyników do JSON
- [ ] Tryb "fiszki" (flashcards)
- [ ] PWA (instalacja jako apka na telefonie)

### V3 (przy okazji nauki)
- [ ] Backend (Supabase albo Firebase) - synchronizacja między urządzeniami
- [ ] Auth (Google login)
- [ ] Tryb pytań otwartych (porównanie z modelową odpowiedzią)
- [ ] Multiplayer mode (rywalizacja ze znajomymi)

---

## Pomocne linki

- **Vite docs:** https://vite.dev
- **React docs:** https://react.dev
- **Tailwind v4 docs:** https://tailwindcss.com
- **TypeScript docs:** https://www.typescriptlang.org/docs/
- **Vercel docs:** https://vercel.com/docs
- **Netlify docs:** https://docs.netlify.com
- **Claude Code docs:** https://docs.claude.com/en/docs/claude-code

---

## Troubleshooting

### "npm: command not found"
Nie masz Node.js - pobierz z [nodejs.org](https://nodejs.org) (LTS).

### "Permission denied" przy `git push`
Setup GitHub Personal Access Token, opisany wyżej.

### Netlify deploy się wywala
Sprawdź **Deploy log** w Netlify dashboard. 99% przypadków: błąd TypeScript lub brakująca zależność. Lokalnie: `npm run build` - musi przejść bezbłędnie. Jeśli przechodzi lokalnie, a w Netlify nie - sprawdź Node version (Environment variables → `NODE_VERSION=20`).

### Tailwind classes nie działają
Sprawdź `vite.config.ts` - czy plugin `tailwindcss` jest dodany.

### Claude Code "nie pamięta" projektu
`/clear`, potem zapytaj o `CLAUDE.md` - zmusisz go do przeczytania kontekstu.

---

**Powodzenia! 🚀**

Jeśli coś nie działa, wróć do mnie (Claude'a w czacie) - rozwiążemy.
