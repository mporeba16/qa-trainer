import type { Question, Category } from '../types';

/**
 * Baza pytań QA Trainer
 *
 * Kategorie:
 * - istqb: ISTQB Fundamenty (25 pytań)
 * - defects: Defekty i bug reporting (5)
 * - agile: Agile/Scrum (8)
 * - api: API/HTTP (12)
 * - web: Web Testing (10)
 * - tools: Postman/Charles (6)
 * - design: Test Design (6)
 * - soft: Soft skills / pytania rekrutacyjne (5)
 *
 * Format pytania:
 * - id: unikalny numer
 * - cat: kategoria
 * - q: treść pytania
 * - a: tablica 4 odpowiedzi (indexy 0-3)
 * - correct: index poprawnej odpowiedzi (0-3)
 * - expl: wyjaśnienie po odpowiedzi (markdown-light, **bold** OK)
 * - code (opcjonalnie): blok kodu pokazywany w pytaniu
 */

export const CATEGORIES: Record<Category, string> = {
  fundamenty: 'CTFL: Podstawy testowania',
  'cykl-wytwarzania': 'CTFL: Cykl wytwarzania',
  statyczne: 'CTFL: Testowanie statyczne',
  projektowanie: 'CTFL: Analiza i projektowanie',
  zarzadzanie: 'CTFL: Zarządzanie testowaniem',
  narzedzia: 'CTFL: Narzędzia testowe',
  istqb: 'ISTQB Fundamenty',
  defects: 'Defekty',
  agile: 'Agile/Scrum',
  api: 'API/HTTP',
  web: 'Web Testing',
  tools: 'Postman/Charles',
  design: 'Test Design',
  soft: 'Soft Skills',
  mobile: 'Mobile Testing',
};

export const QUESTIONS: Question[] = [
  // ===== ISTQB - FUNDAMENTY =====
  {
    id: 1, cat: 'istqb',
    q: 'Która z poniższych zasad NIE należy do 7 zasad testowania według ISTQB?',
    a: [
      'Testowanie pokazuje obecność defektów',
      'Testowanie wyczerpujące jest niemożliwe',
      'Automatyzacja zawsze przyspiesza proces testowania',
      'Wczesne testowanie oszczędza czas i pieniądze'
    ],
    correct: 2,
    expl: '7 zasad ISTQB: 1) Testowanie pokazuje obecność defektów, nie ich brak. 2) Wyczerpujące testowanie jest niemożliwe. 3) Wczesne testowanie. 4) Skupianie defektów. 5) Paradoks pestycydów (testy się starzeją). 6) Testowanie zależy od kontekstu. 7) Mylne przekonanie o braku błędów. Automatyzacja nie jest jedną z zasad.'
  },
  {
    id: 2, cat: 'istqb',
    q: 'Co oznacza zasada "paradoks pestycydów" w testowaniu?',
    a: [
      'Defekty grupują się w określonych modułach',
      'Powtarzane testy z czasem znajdują mniej nowych defektów',
      'Niemożliwe jest przetestowanie wszystkich kombinacji',
      'Wcześniejsze testowanie jest tańsze niż późniejsze'
    ],
    correct: 1,
    expl: 'Paradoks pestycydów: te same testy powtarzane wielokrotnie tracą skuteczność w wykrywaniu nowych defektów. Trzeba je aktualizować i tworzyć nowe, podobnie jak rotuje się pestycydy, by szkodniki się nie uodporniły.'
  },
  {
    id: 3, cat: 'istqb',
    q: 'Czym różni się testowanie od debugowania?',
    a: [
      'Testowanie znajduje defekty, debugowanie znajduje przyczynę i naprawia',
      'Testowanie robi tester, debugowanie robi PM',
      'To są synonimy używane zamiennie',
      'Testowanie dotyczy frontu, debugowanie backendu'
    ],
    correct: 0,
    expl: 'Testowanie to aktywność identyfikująca, że coś nie działa zgodnie z oczekiwaniami. Debugowanie to znajdowanie przyczyny w kodzie i jej naprawa. Testowaniem zajmuje się głównie tester, debugowaniem developer.'
  },
  {
    id: 4, cat: 'istqb',
    q: 'Jaka jest poprawna kolejność etapów STLC (Software Testing Life Cycle)?',
    a: [
      'Wykonanie → Planowanie → Analiza → Zamknięcie',
      'Planowanie → Analiza → Projektowanie → Implementacja → Wykonanie → Raportowanie → Zamknięcie',
      'Analiza → Wykonanie → Planowanie → Raportowanie',
      'Projektowanie → Wykonanie → Planowanie → Zamknięcie'
    ],
    correct: 1,
    expl: 'STLC: 1) Planowanie testów, 2) Analiza testów (co testować), 3) Projektowanie test cases, 4) Implementacja (przygotowanie środowiska), 5) Wykonanie, 6) Raportowanie wyników, 7) Zamknięcie aktywności testowych.'
  },
  {
    id: 5, cat: 'istqb',
    q: 'Co to jest testowanie statyczne?',
    a: [
      'Testowanie wykonywane na statycznych serwerach',
      'Testowanie aplikacji webowych bez JavaScript',
      'Testowanie produktów pracy bez uruchamiania kodu (np. recenzje, analiza statyczna)',
      'Testowanie funkcjonalne wykonywane ręcznie'
    ],
    correct: 2,
    expl: 'Testowanie statyczne to analiza artefaktów (kod, wymagania, user stories) BEZ ich uruchamiania. Należą tu: recenzje (walkthrough, inspekcja, technical review) i analiza statyczna kodu (linter, SonarQube). Pozwala wcześnie wykryć defekty.'
  },
  {
    id: 6, cat: 'istqb',
    q: 'Pole formularza akceptuje liczby od 1 do 100. Zgodnie z analizą wartości brzegowych (BVA), jakie wartości najlepiej przetestować?',
    a: [
      '1, 50, 100',
      '0, 1, 100, 101',
      '-1, 0, 50, 200',
      '1, 2, 99, 100'
    ],
    correct: 1,
    expl: 'BVA (Boundary Value Analysis) testuje wartości na granicy klas: tuż poniżej minimum (0), minimum (1), maksimum (100) i tuż powyżej (101). Tam najczęściej znajdują się błędy w warunkach `<`, `<=`, `>`, `>=`.'
  },
  {
    id: 7, cat: 'istqb',
    q: 'Aplikacja akceptuje wiek od 18 do 65 lat. Ile klas równoważności należy zidentyfikować?',
    a: [
      '1 klasa',
      '2 klasy',
      '3 klasy (poniżej 18, 18-65, powyżej 65)',
      '4 klasy'
    ],
    correct: 2,
    expl: 'Equivalence Partitioning dla zakresu 18-65 daje 3 klasy: 1) wartości nieprawidłowe poniżej (np. 0-17), 2) wartości prawidłowe (18-65), 3) wartości nieprawidłowe powyżej (66+). Wystarczy przetestować jedną wartość z każdej klasy.'
  },
  {
    id: 8, cat: 'istqb',
    q: 'Czym jest testowanie eksploracyjne?',
    a: [
      'Testowanie z góry zaplanowanymi skryptami',
      'Równoczesne projektowanie i wykonywanie testów, z minimalną dokumentacją',
      'Testowanie tylko interfejsu graficznego',
      'Testowanie wykonywane przez użytkowników końcowych'
    ],
    correct: 1,
    expl: 'Testowanie eksploracyjne to podejście, w którym tester jednocześnie uczy się aplikacji, projektuje testy i je wykonuje. Stosuje się je, gdy dokumentacja jest uboga, jest mało czasu lub szukamy bugów, których nie znajdą testy skryptowe.'
  },
  {
    id: 9, cat: 'istqb',
    q: 'Co oznacza pojęcie "shift-left testing"?',
    a: [
      'Testowanie wykonywane po lewej stronie ekranu',
      'Włączanie aktywności testowych wcześniej w cyklu wytwarzania oprogramowania',
      'Przesunięcie testów na zespół developerski',
      'Wykonywanie testów w odwrotnej kolejności'
    ],
    correct: 1,
    expl: 'Shift-left to praktyka włączania testowania wcześnie w SDLC: review wymagań, udział w refinement, statyczna analiza, TDD/BDD. Im wcześniej znajdziesz defekt, tym taniej go naprawić.'
  },
  {
    id: 10, cat: 'istqb',
    q: 'Jaka jest różnica między weryfikacją a walidacją?',
    a: [
      'To synonimy',
      'Weryfikacja: czy budujemy produkt poprawnie? Walidacja: czy budujemy poprawny produkt?',
      'Weryfikacja to testy automatyczne, walidacja to manualne',
      'Weryfikacja dotyczy bezpieczeństwa, walidacja funkcjonalności'
    ],
    correct: 1,
    expl: '**Weryfikacja** ("Are we building the product right?") - czy produkt spełnia specyfikację. **Walidacja** ("Are we building the right product?") - czy produkt spełnia potrzeby użytkownika. Można poprawnie zbudować coś, czego nikt nie potrzebuje.'
  },
  {
    id: 11, cat: 'istqb',
    q: 'Co to jest test pyramid (piramida testów)?',
    a: [
      'Hierarchia zarządzania zespołem QA',
      'Model: dużo testów jednostkowych u podstawy, mniej integracyjnych, najmniej E2E na górze',
      'Sekwencja faz testowania',
      'Diagram opisujący czasy odpowiedzi'
    ],
    correct: 1,
    expl: 'Test Pyramid (Mike Cohn): u podstawy najwięcej szybkich i tanich testów jednostkowych, w środku testy integracyjne, na szczycie mało wolnych i drogich testów E2E. Odwrócona piramida (dużo E2E, mało unit) to anty-wzorzec.'
  },
  {
    id: 12, cat: 'istqb',
    q: 'Czym jest testowanie regresyjne?',
    a: [
      'Testowanie wykonywane przed rozpoczęciem developmentu',
      'Sprawdzanie, czy nowe zmiany nie zepsuły wcześniej działających funkcji',
      'Testowanie wstecznej kompatybilności bazy danych',
      'Testowanie cofnięte do poprzedniej wersji'
    ],
    correct: 1,
    expl: 'Regression testing weryfikuje, że zmiana w kodzie (nowa funkcja, bugfix, refactor) nie zepsuła istniejących, wcześniej działających funkcjonalności. Często automatyzowany ze względu na powtarzalność.'
  },
  {
    id: 13, cat: 'istqb',
    q: 'Czym różni się smoke test od sanity test?',
    a: [
      'To są synonimy',
      'Smoke: ogólne sprawdzenie po deploy, czy build w ogóle działa. Sanity: po małej zmianie, czy konkretna funkcja działa',
      'Smoke testuje frontend, sanity backend',
      'Smoke wykonują developerzy, sanity testerzy'
    ],
    correct: 1,
    expl: '**Smoke test** - szybki, szeroki test po nowym buildzie/deploy: czy główne funkcje w ogóle działają ("czy nie dymi"). **Sanity test** - wąski test po małej zmianie/fixie: czy ta zmiana działa i nic obok się nie zepsuło.'
  },
  {
    id: 14, cat: 'istqb',
    q: 'Co to jest test case (przypadek testowy)?',
    a: [
      'Walizka z narzędziami testera',
      'Zestaw warunków, kroków, danych i oczekiwanego rezultatu dla zweryfikowania konkretnej funkcjonalności',
      'Lista wszystkich znalezionych bugów',
      'Dokument planu testów'
    ],
    correct: 1,
    expl: 'Test case to konkretny scenariusz testowy: ID, tytuł, preconditions, kroki, dane wejściowe, expected result, priority. Powinien być powtarzalny i jasny dla każdego testera.'
  },
  {
    id: 15, cat: 'istqb',
    q: 'Czym jest test plan?',
    a: [
      'Lista test cases',
      'Dokument opisujący zakres, podejście, zasoby, harmonogram i kryteria testów',
      'Diagram architektury aplikacji',
      'Backlog defektów'
    ],
    correct: 1,
    expl: 'Test plan to dokument strategiczny: co testujemy, kto, kiedy, jak, jakim podejściem, jakie kryteria wejścia/wyjścia, jakie ryzyka, jakie narzędzia. Standard IEEE 829 opisuje szablon.'
  },
  {
    id: 16, cat: 'istqb',
    q: 'Co to jest "test oracle"?',
    a: [
      'Wyrocznia QA',
      'Źródło wiedzy o oczekiwanym rezultacie testu (specyfikacja, dokumentacja, doświadczenie testera)',
      'Baza danych Oracle używana w testach',
      'Senior tester w zespole'
    ],
    correct: 1,
    expl: 'Test oracle to mechanizm/źródło, które pozwala stwierdzić, czy wynik testu jest poprawny: wymagania, specyfikacja, user story, dotychczasowe zachowanie systemu, intuicja testera, regulacje prawne.'
  },
  {
    id: 17, cat: 'istqb',
    q: 'Czym jest testowanie oparte na ryzyku (risk-based testing)?',
    a: [
      'Testowanie aplikacji finansowych',
      'Priorytetyzacja testów na podstawie prawdopodobieństwa wystąpienia i wpływu defektów',
      'Testowanie bez planu, na żywioł',
      'Testowanie tylko najnowszych funkcji'
    ],
    correct: 1,
    expl: 'Risk-based testing alokuje zasoby testowe tam, gdzie ryzyko jest największe. Ryzyko = prawdopodobieństwo × wpływ. Najpierw testujemy obszary krytyczne biznesowo, często używane, nowo dodane lub o słabej jakości.'
  },
  {
    id: 18, cat: 'istqb',
    q: 'Co oznacza pojęcie "Definition of Done" (DoD)?',
    a: [
      'Lista zakończonych projektów',
      'Zestaw kryteriów, które muszą być spełnione, aby user story uznać za skończoną',
      'Data zakończenia sprintu',
      'Status zadania w Jira'
    ],
    correct: 1,
    expl: 'DoD to wspólnie ustalona checklist w zespole: np. kod napisany, code review, testy unit pass, QA przetestował, dokumentacja zaktualizowana, deploy na staging. Każdy zespół ustala własną DoD.'
  },

  // ===== ISTQB - DEFEKTY =====
  {
    id: 19, cat: 'defects',
    q: 'Jaka jest różnica między severity a priority defektu?',
    a: [
      'To są synonimy',
      'Severity: jak poważny technicznie. Priority: jak szybko należy naprawić (biznesowo)',
      'Severity ustala tester, priority developer',
      'Severity dotyczy frontu, priority backendu'
    ],
    correct: 1,
    expl: '**Severity** mierzy techniczny wpływ buga (Critical/Major/Minor/Trivial). **Priority** mówi o pilności naprawy biznesowej (P1-P4). Przykład: literówka na stronie głównej - Severity LOW, Priority HIGH (psuje wizerunek).'
  },
  {
    id: 20, cat: 'defects',
    q: 'Które elementy powinien zawierać DOBRY raport o błędzie?',
    a: [
      'Tylko opis i screenshot',
      'Tytuł, środowisko, kroki reprodukcji, expected vs actual, severity, załączniki',
      'Imię i nazwisko reportera + data',
      'Tylko kroki reprodukcji'
    ],
    correct: 1,
    expl: 'Dobry bug report: zwięzły tytuł, środowisko (OS, browser, wersja), preconditions, kroki reprodukcji, expected result, actual result, severity/priority, załączniki (screen, video, logi). Im łatwiej dev odtworzy, tym szybciej naprawi.'
  },
  {
    id: 21, cat: 'defects',
    q: 'Typowy cykl życia defektu (bug lifecycle):',
    a: [
      'Open → Closed',
      'New → Assigned → In Progress → Fixed → Verified → Closed (lub Reopened)',
      'Created → Deleted',
      'Reported → Ignored'
    ],
    correct: 1,
    expl: 'Standardowy lifecycle: New (zgłoszony) → Assigned (przypisany do developera) → In Progress (naprawiany) → Fixed (naprawiony) → Verified (zweryfikowany przez testera) → Closed. Możliwe Reopened jeśli verification się nie powiodła.'
  },
  {
    id: 22, cat: 'defects',
    q: 'Co to jest "defect masking" (maskowanie defektów)?',
    a: [
      'Ukrywanie błędów przed klientem',
      'Sytuacja, gdy jeden defekt zasłania istnienie innego',
      'Zmienianie statusu buga w Jira',
      'Zaszyfrowane raporty bugów'
    ],
    correct: 1,
    expl: 'Defect masking: jeden bug uniemożliwia wykonanie testów, które wykryłyby kolejne. Np. crash przy logowaniu maskuje wszystkie bugi po zalogowaniu. Po naprawie pierwszego mogą się ujawnić następne.'
  },
  {
    id: 23, cat: 'defects',
    q: 'Status "Cannot Reproduce" w bug reporcie oznacza:',
    a: [
      'Developer nie chce naprawiać',
      'Developer nie potrafi odtworzyć błędu na podstawie opisu',
      'Bug jest niemożliwy do naprawy',
      'Bug został naprawiony'
    ],
    correct: 1,
    expl: '"Cannot Reproduce" - developer próbował odtworzyć błąd zgodnie z krokami, ale mu się nie udało. Możliwe przyczyny: niedokładne kroki, inna konfiguracja, intermittent bug, problem ze środowiskiem. Tester powinien doprecyzować.'
  },

  // ===== AGILE / SCRUM =====
  {
    id: 24, cat: 'agile',
    q: 'Ile osób typowo liczy zespół scrumowy?',
    a: [
      '2-3 osoby',
      '3-9 osób',
      '10-15 osób',
      '20+ osób'
    ],
    correct: 1,
    expl: 'Według Scrum Guide zespół powinien być na tyle mały, żeby być zwinnym, ale wystarczająco duży, żeby dostarczyć wartość. Optymalnie 3-9 osób (developerzy + QA + UX), plus Product Owner i Scrum Master.'
  },
  {
    id: 25, cat: 'agile',
    q: 'Co to jest sprint w metodologii Scrum?',
    a: [
      'Bieg w siedzibie firmy',
      'Iteracja trwająca zwykle 1-4 tygodnie, w której zespół dostarcza działający przyrost produktu',
      'Codzienne spotkanie zespołu',
      'Faza testów przed releasem'
    ],
    correct: 1,
    expl: 'Sprint to timeboxed iteracja (najczęściej 2 tygodnie). W jej trakcie zespół realizuje wybrane user stories. Na końcu sprintu powinien istnieć działający, potencjalnie wdrażalny przyrost produktu.'
  },
  {
    id: 26, cat: 'agile',
    q: 'Wymień ceremonie Scrum:',
    a: [
      'Tylko Daily Standup',
      'Sprint Planning, Daily Standup, Sprint Review, Retrospective, (Refinement)',
      'Code Review i Pair Programming',
      'Hackathony i team buildingi'
    ],
    correct: 1,
    expl: 'Scrum events: **Sprint Planning** (planowanie sprintu), **Daily Scrum** (15 min daily), **Sprint Review** (demo dla biznesu na końcu sprintu), **Sprint Retrospective** (refleksja zespołu). Backlog Refinement to ongoing activity, nie formalna ceremonia.'
  },
  {
    id: 27, cat: 'agile',
    q: 'Jaka jest rola QA w sprint planningu?',
    a: [
      'Nie uczestniczy, dochodzi później',
      'Estymuje testy, zgłasza ryzyka, doprecyzowuje acceptance criteria',
      'Tylko notuje co inni mówią',
      'Przygotowuje kawę dla zespołu'
    ],
    correct: 1,
    expl: 'QA w Sprint Planning: aktywnie estymuje effort testowy, identyfikuje ryzyka techniczne, dopytuje o niejasności w user stories, sugeruje uzupełnienie acceptance criteria, planuje przygotowanie środowiska testowego.'
  },
  {
    id: 28, cat: 'agile',
    q: 'Co to są user stories?',
    a: [
      'Historie użytkowników do działu marketingu',
      'Krótki opis funkcjonalności z perspektywy użytkownika: "Jako X, chcę Y, aby Z"',
      'Dokumentacja techniczna',
      'Test cases pisane przez Product Ownera'
    ],
    correct: 1,
    expl: 'User story (format Connextra): "Jako [rola/persona], chcę [funkcjonalność], aby [korzyść]". Krótki, czytelny opis funkcjonalności z perspektywy użytkownika. Powinna być INVEST: Independent, Negotiable, Valuable, Estimable, Small, Testable.'
  },
  {
    id: 29, cat: 'agile',
    q: 'Co to są acceptance criteria (kryteria akceptacji)?',
    a: [
      'Wymagania bezpieczeństwa',
      'Konkretne warunki, które muszą być spełnione, by user story uznać za zaakceptowaną',
      'Lista wymagań prawnych',
      'Specyfikacja sprzętowa'
    ],
    correct: 1,
    expl: 'Acceptance criteria precyzują, co dokładnie musi działać, by user story była zaakceptowana. Często w formacie Given/When/Then (BDD). Pisze głównie PO, ale QA i dev je review\'ują. Stanowią podstawę testów.'
  },
  {
    id: 30, cat: 'agile',
    q: 'Czym jest backlog refinement (grooming)?',
    a: [
      'Sprzątanie biura',
      'Doprecyzowanie, oszacowanie i podział user stories w product backlogu',
      'Spotkanie tylko PO i Scrum Mastera',
      'Faza testów akceptacyjnych'
    ],
    correct: 1,
    expl: 'Refinement (grooming) to ongoing activity: zespół doprecyzowuje user stories z backlogu (dodaje szczegóły, acceptance criteria), estymuje, dzieli zbyt duże stories. Cel: by stories były "Ready" przed sprint planningiem.'
  },
  {
    id: 31, cat: 'agile',
    q: 'Czym różni się Scrum od Kanban?',
    a: [
      'To są synonimy',
      'Scrum: iteracje (sprinty), stałe ceremonie. Kanban: ciągły flow, WIP limits, bez sprintów',
      'Scrum dla małych zespołów, Kanban dla dużych',
      'Scrum dla developerów, Kanban dla QA'
    ],
    correct: 1,
    expl: 'Scrum: timeboxed sprinty (np. 2 tyg), defined roles (PO, SM, Dev Team), ceremonie. Kanban: continuous flow, brak sprintów, kluczowe są WIP limits i wizualizacja tablicy. Kanban często stosowany w utrzymaniu i wsparciu.'
  },

  // ===== API / HTTP =====
  {
    id: 32, cat: 'api',
    q: 'Co oznacza kod HTTP 200?',
    a: [
      'Przekierowanie',
      'OK - request zakończony sukcesem',
      'Bad Request',
      'Server Error'
    ],
    correct: 1,
    expl: '**200 OK** - request został pomyślnie przetworzony, response zawiera oczekiwane dane. Najczęstszy kod sukcesu dla GET. Dla POST częściej zwracane jest 201 (Created).'
  },
  {
    id: 33, cat: 'api',
    q: 'Co oznacza kod HTTP 401?',
    a: [
      'Not Found - zasób nie istnieje',
      'Unauthorized - brak autentykacji lub niepoprawne dane logowania',
      'Forbidden - nie masz uprawnień',
      'Bad Request - błędne dane'
    ],
    correct: 1,
    expl: '**401 Unauthorized** - request wymaga autentykacji, ale nie została ona dostarczona lub jest niepoprawna (np. wygasły token JWT). To NIE to samo co 403.'
  },
  {
    id: 34, cat: 'api',
    q: 'Czym różni się kod 401 od 403?',
    a: [
      'To są synonimy',
      '401: nie wiemy kim jesteś (nie zalogowany). 403: wiemy kim jesteś, ale nie masz uprawnień',
      '401 dotyczy GET, 403 POST',
      '401 jest dla użytkowników, 403 dla adminów'
    ],
    correct: 1,
    expl: '**401 Unauthorized** = brak/błędna autentykacja (Auth required). **403 Forbidden** = jesteś zalogowany, ale nie masz uprawnień do tego zasobu. Klasyczne pytanie rekrutacyjne!'
  },
  {
    id: 35, cat: 'api',
    q: 'Co oznacza kod HTTP 500?',
    a: [
      'Bad Request',
      'Internal Server Error - nieoczekiwany błąd serwera',
      'Unauthorized',
      'Service Unavailable'
    ],
    correct: 1,
    expl: '**500 Internal Server Error** - generyczny błąd serwera, gdy coś poszło nie tak, ale serwer nie potrafi go bardziej skategoryzować. Wymaga uwagi developera - może być wyjątek, błąd w kodzie, problem z DB.'
  },
  {
    id: 36, cat: 'api',
    q: 'Jaka jest różnica między metodami PUT a PATCH?',
    a: [
      'To są synonimy',
      'PUT zastępuje cały zasób, PATCH modyfikuje tylko wskazane pola',
      'PUT służy do tworzenia, PATCH do usuwania',
      'PUT używa JSON, PATCH XML'
    ],
    correct: 1,
    expl: '**PUT** - pełna aktualizacja: wysyłasz cały obiekt, serwer go zastępuje. **PATCH** - częściowa aktualizacja: wysyłasz tylko zmienione pola. Przykład: zmiana tylko emaila - lepiej PATCH niż PUT z całym profilem.'
  },
  {
    id: 37, cat: 'api',
    q: 'Co oznacza, że metoda HTTP jest idempotentna?',
    a: [
      'Działa szybko',
      'Wielokrotne wywołanie daje ten sam efekt na serwerze co jedno wywołanie',
      'Zwraca zawsze JSON',
      'Wymaga autoryzacji'
    ],
    correct: 1,
    expl: 'Idempotentność: efekt N wywołań = efekt 1 wywołania. **Idempotentne**: GET, PUT, DELETE, HEAD, OPTIONS. **Nieidempotentne**: POST (wielokrotne wysłanie tworzy wiele zasobów). Ważne dla retry logic.'
  },
  {
    id: 38, cat: 'api',
    q: 'Co to jest REST API?',
    a: [
      'API tylko dla operacji odczytu',
      'Architektoniczny styl API używający HTTP, oparty na zasobach, metodach (GET/POST/PUT/DELETE) i stateless',
      'Wyłącznie XML-based',
      'Następca SOAP, ale tylko dla mikrousług'
    ],
    correct: 1,
    expl: 'REST (Representational State Transfer): zasoby identyfikowane przez URL, operacje przez metody HTTP, stateless (każdy request niezależny), reprezentacja zasobów (JSON, XML). Najpopularniejszy styl API w web.'
  },
  {
    id: 39, cat: 'api',
    q: 'Co znajdziesz w nagłówku Authorization typu Bearer?',
    a: [
      'Login i hasło w base64',
      'Token (np. JWT), który identyfikuje użytkownika',
      'Klucz prywatny',
      'Adres IP'
    ],
    correct: 1,
    expl: 'Bearer token (zwykle JWT) wysyłany w nagłówku: `Authorization: Bearer eyJhbGc...`. Token jest podpisany kryptograficznie i zawiera info o userze, uprawnieniach, expiration. Standard OAuth 2.0.'
  },
  {
    id: 40, cat: 'api',
    q: 'Co oznacza kod HTTP 429?',
    a: [
      'Service Unavailable',
      'Too Many Requests - przekroczono limit zapytań (rate limiting)',
      'Not Found',
      'Internal Server Error'
    ],
    correct: 1,
    expl: '**429 Too Many Requests** - klient wysyła zbyt wiele requestów w krótkim czasie (rate limiting). Response często zawiera nagłówek `Retry-After` mówiący, po jakim czasie spróbować ponownie. Ważne przy testach API!'
  },
  {
    id: 41, cat: 'api',
    q: 'W czym leży różnica między query parameter a path parameter?',
    a: [
      'Brak różnicy',
      'Path param to część URL (/users/123), query param to po znaku ? (/users?id=123)',
      'Query param to body requesta',
      'Path param używa JSON, query XML'
    ],
    correct: 1,
    expl: '**Path parameter**: `/users/123` - identyfikuje konkretny zasób. **Query parameter**: `/users?status=active&limit=10` - filtruje, sortuje, paginuje. Path: gdy zasób unikalny. Query: gdy filtry/opcje.'
  },
  {
    id: 42, cat: 'api',
    q: 'Co to jest Swagger / OpenAPI?',
    a: [
      'Narzędzie do automatyzacji testów UI',
      'Specyfikacja i narzędzia do dokumentowania REST API w czytelny sposób',
      'Framework do JavaScript',
      'System CI/CD'
    ],
    correct: 1,
    expl: 'OpenAPI Specification (wcześniej Swagger) to standard dokumentacji REST API: endpointy, metody, parametry, schemas, przykłady, kody odpowiedzi. Swagger UI generuje interaktywną dokumentację z możliwością "Try it out".'
  },
  {
    id: 43, cat: 'api',
    q: 'Jak w Postmanie można testować wiele requestów po kolei z dzieloną logiką?',
    a: [
      'Nie da się',
      'Collection Runner + zmienne środowiskowe (environment variables)',
      'Tylko ręcznie, jeden po drugim',
      'Wymaga płatnej licencji'
    ],
    correct: 1,
    expl: 'Collections w Postmanie grupują requesty. Collection Runner uruchamia je po kolei. Environment variables ({{base_url}}, {{token}}) pozwalają parametryzować. W zakładce Tests można pisać JS i przekazywać dane między requestami przez pm.environment.set().'
  },

  // ===== WEB TESTING =====
  {
    id: 44, cat: 'web',
    q: 'Co warto sprawdzić podczas testowania formularza logowania?',
    a: [
      'Tylko poprawne dane (happy path)',
      'Poprawne i błędne dane, walidację, SQL injection, XSS, edge cases (puste pola, max długość, polskie znaki)',
      'Tylko pole hasła',
      'Tylko UI'
    ],
    correct: 1,
    expl: 'Kompleksowe testowanie loginu: happy path, błędne dane (osobno login/hasło/oba), pusty/spacja, max długość, polskie znaki, copy-paste, SQL injection (`\' OR 1=1--`), XSS (`<script>`), case sensitivity emaila, brute force protection, capslock warning, remember me, password manager autofill.'
  },
  {
    id: 45, cat: 'web',
    q: 'Co to jest XSS (Cross-Site Scripting)?',
    a: [
      'Stylowanie CSS na wielu stronach',
      'Wstrzyknięcie złośliwego skryptu (np. JS) przez pole tekstowe, który wykona się u innych użytkowników',
      'Komunikacja między serwerami',
      'Test cross-browser'
    ],
    correct: 1,
    expl: 'XSS: atakujący wpisuje `<script>alert(1)</script>` lub `<img src=x onerror=alert(1)>` w pole, które potem renderuje się bez sanityzacji. Skrypt wykonuje się w przeglądarce ofiary, może wykraść cookies, sesję. Tester sprawdza, czy input jest escapowany.'
  },
  {
    id: 46, cat: 'web',
    q: 'Jakie typowe SQL injection wpiszesz w pole testowe?',
    a: [
      'SELECT * FROM users',
      "' OR 1=1 -- (próbuje obejść warunek WHERE w SQL)",
      '<script>alert(1)</script>',
      'admin/admin'
    ],
    correct: 1,
    expl: "Klasyczny test: `' OR 1=1 --`. Jeśli backend buduje query: `SELECT * FROM users WHERE email = '$input'`, to po wstrzyknięciu staje się: `SELECT * FROM users WHERE email = '' OR 1=1 --'`. Warunek zawsze prawdziwy, `--` komentuje resztę. Aplikacja powinna używać prepared statements."
  },
  {
    id: 47, cat: 'web',
    q: 'W DevTools, w której zakładce sprawdzisz wszystkie requesty HTTP wysłane przez stronę?',
    a: [
      'Console',
      'Network',
      'Elements',
      'Sources'
    ],
    correct: 1,
    expl: 'Zakładka **Network** w DevTools pokazuje wszystkie requesty: URL, metoda, status, czas, rozmiar, headers, payload, response. Filtrowanie po typie (XHR/Fetch dla API), throttling sieci, zapisywanie HAR file - bardzo przydatne narzędzie dla testera.'
  },
  {
    id: 48, cat: 'web',
    q: 'Co znajdziesz w zakładce Application w DevTools?',
    a: [
      'Kod źródłowy aplikacji',
      'localStorage, sessionStorage, cookies, IndexedDB, service workers',
      'Tylko strukturę HTML',
      'Logi konsoli'
    ],
    correct: 1,
    expl: 'Zakładka **Application** (w Firefox: Storage) - tu znajdziesz wszystkie mechanizmy przechowywania danych w przeglądarce: localStorage (key-value), sessionStorage, cookies (z atrybutami HttpOnly, Secure, SameSite), IndexedDB, Cache Storage, Service Workers.'
  },
  {
    id: 49, cat: 'web',
    q: 'Jakie minimalne rozdzielczości warto testować dla aplikacji web?',
    a: [
      'Tylko 1920x1080',
      'Mobile (~375px), tablet (~768px), desktop (1280px+)',
      'Tylko mobile',
      'Tylko 4K'
    ],
    correct: 1,
    expl: 'Responsive testing - breakpointy: mobile (320-480px - iPhone SE/12), tablet (768-1024px - iPad), desktop (1280px+). DevTools → Device Mode pozwala szybko testować. Sprawdź też landscape/portrait i bardzo małe (320px) i bardzo duże (2560px+) ekrany.'
  },
  {
    id: 50, cat: 'web',
    q: 'Co to jest accessibility (a11y) w kontekście testowania?',
    a: [
      'Szybkość ładowania strony',
      'Dostępność aplikacji dla osób z niepełnosprawnościami (czytniki ekranu, nawigacja klawiaturą, kontrasty)',
      'Dostępność serwerów',
      'Liczba klikalnych elementów'
    ],
    correct: 1,
    expl: 'A11y testing sprawdza, czy aplikacja jest dostępna dla wszystkich: nawigacja klawiaturą (Tab, Enter, Esc), screen readers (alt text, ARIA labels, semantic HTML), kontrasty kolorów (WCAG AA: 4.5:1 dla tekstu), focus indicators, no flashing content. Narzędzia: Lighthouse, axe DevTools, WAVE.'
  },
  {
    id: 51, cat: 'web',
    q: 'Co to jest cookie z atrybutem HttpOnly?',
    a: [
      'Cookie dostępne tylko przez HTTP, nie HTTPS',
      'Cookie niedostępne dla JavaScript (document.cookie) - chroni przed XSS',
      'Cookie wygasające po 1 godzinie',
      'Cookie tylko dla adminów'
    ],
    correct: 1,
    expl: '**HttpOnly** flag uniemożliwia dostęp do cookie przez JavaScript (document.cookie nie zwróci go). To ochrona przed XSS - nawet jeśli atakujący wstrzyknie skrypt, nie ukradnie session cookie. Cookies sesyjne powinny zawsze mieć HttpOnly + Secure + SameSite.'
  },
  {
    id: 52, cat: 'web',
    q: 'Aplikacja działa wolno. Od czego zaczniesz diagnozę?',
    a: [
      'Restart komputera',
      'DevTools → Network (czas odpowiedzi API), Performance/Lighthouse (front), monitoring backend',
      'Zmiana przeglądarki',
      'Reset hasła'
    ],
    correct: 1,
    expl: 'Diagnoza wolności: 1) DevTools Network - które requesty są wolne? Backend czy CDN? 2) Performance tab - czy JS nie blokuje main thread? 3) Lighthouse audit. 4) Backend monitoring (Datadog, Grafana) - latency API, slow queries DB. 5) Network tab → throttling - czy działa OK na wolnym łączu?'
  },
  {
    id: 53, cat: 'web',
    q: 'Czym jest CORS error w przeglądarce?',
    a: [
      'Błąd zapisu pliku',
      'Polityka bezpieczeństwa blokująca request między różnymi domenami bez odpowiednich headerów',
      'Błąd składni JSON',
      'Brak internetu'
    ],
    correct: 1,
    expl: 'CORS (Cross-Origin Resource Sharing): przeglądarka domyślnie blokuje requesty z domeny A do API w domenie B (Same-Origin Policy). Backend musi wysłać header `Access-Control-Allow-Origin: ...`. Częsty problem przy łączeniu front i back z różnych originów.'
  },

  // ===== POSTMAN / CHARLES =====
  {
    id: 54, cat: 'tools',
    q: 'W Postmanie, w jaki sposób przekażesz token autoryzacyjny do wielu requestów?',
    a: [
      'Wpisać ręcznie w każdym',
      'Environment variable + Pre-request Script lub Collection-level Authorization',
      'To niemożliwe',
      'Tylko przez API key w URL'
    ],
    correct: 1,
    expl: 'Najlepsze podejście: environment variable `{{token}}` ustawiana raz, np. po loginie (Tests script: `pm.environment.set("token", pm.response.json().token)`). Następnie w Collection → Authorization → Bearer Token: `{{token}}`. Wszystkie requesty dziedziczą.'
  },
  {
    id: 55, cat: 'tools',
    q: 'Co robi funkcja "Map Local" w Charles Proxy?',
    a: [
      'Pokazuje lokalizację serwera na mapie',
      'Podmienia response z serwera na lokalny plik (przydatne do testowania edge cases)',
      'Tłumaczy stronę',
      'Mapuje IP serwera'
    ],
    correct: 1,
    expl: 'Map Local: gdy aplikacja wysyła request, Charles zamiast przekazać go do serwera, zwraca lokalny plik jako response. Idealne do testowania scenariuszy, których serwer nie produkuje (błędy 500, puste listy, malformed JSON, edge case responses).'
  },
  {
    id: 56, cat: 'tools',
    q: 'Co robi funkcja "Throttling" w Charles Proxy?',
    a: [
      'Limituje liczbę requestów',
      'Symuluje wolne połączenie sieciowe (3G, edge, dial-up)',
      'Blokuje wybrane domeny',
      'Zwiększa prędkość połączenia'
    ],
    correct: 1,
    expl: 'Throttling sztucznie spowalnia ruch (bandwidth limit + latency), by przetestować jak aplikacja zachowuje się na słabym połączeniu. Ważne dla mobile - czy są loadery, timeouty, retry logic, offline mode. Charles ma presety: 3G, EDGE, GPRS.'
  },
  {
    id: 57, cat: 'tools',
    q: 'Jak w Charlesie modyfikujesz request lub response w locie?',
    a: [
      'To niemożliwe',
      'Breakpoints - zatrzymują request/response i pozwalają go edytować przed dalszą wysyłką',
      'Tylko po stronie serwera',
      'Edytując pliki konfiguracyjne'
    ],
    correct: 1,
    expl: 'Breakpoints: gdy request/response przechodzi przez Charlesa, jest zatrzymywany, możesz zmodyfikować headers/body/URL i kliknąć Execute. Przydatne do testowania jak aplikacja reaguje na konkretne zmiany (np. zmiana ceny w response, błąd serwera).'
  },
  {
    id: 58, cat: 'tools',
    q: 'Aby Charles mógł odszyfrować ruch HTTPS, trzeba:',
    a: [
      'Nic - działa automatycznie',
      'Zainstalować certyfikat Charles CA na urządzeniu testowanym i włączyć SSL Proxying dla domeny',
      'Wyłączyć HTTPS w aplikacji',
      'Zakupić licencję Pro'
    ],
    correct: 1,
    expl: 'HTTPS jest szyfrowany - by Charles go widział, robi MITM (man-in-the-middle): generuje własny cert dla każdej domeny. Musisz zainstalować Charles Root CA jako trusted na urządzeniu testowym (komputer, telefon) i włączyć SSL Proxying dla konkretnej domeny.'
  },
  {
    id: 59, cat: 'tools',
    q: 'W Postmanie, w jakim języku piszesz testy w zakładce "Tests"?',
    a: [
      'Python',
      'JavaScript (z dostępem do obiektu pm.*)',
      'YAML',
      'Bash'
    ],
    correct: 1,
    expl: 'Postman używa JavaScript w Tests i Pre-request Scripts. Specjalne API: `pm.test()`, `pm.response.json()`, `pm.expect()` (Chai-style assertions), `pm.environment.set()`, `pm.environment.get()`. Przykład: `pm.test("Status 200", () => pm.response.to.have.status(200));`'
  },

  // ===== TEST DESIGN / PRAKTYKA =====
  {
    id: 60, cat: 'design',
    q: 'Jak przetestujesz "przycisk Submit" w formularzu?',
    a: [
      'Kliknąć raz',
      'Sprawdzić: stan default/hover/active/disabled, klawiatura (Enter, spacja), double-click, mouseclick, wszystkie kombinacje walidacji, accessibility',
      'Tylko że klikalny',
      'Tylko kolor przycisku'
    ],
    correct: 1,
    expl: 'Komplet: states (default/hover/active/disabled/loading), keyboard (Tab focus + Enter/Space), pojedynczy/podwójny klik (no duplicate submissions), z różnymi stanami formularza (puste, walid, niewalid), accessibility (ARIA labels, tab order), na różnych rozdzielczościach.'
  },
  {
    id: 61, cat: 'design',
    q: 'Pole akceptuje email. Jakie wartości testowe wybierzesz?',
    a: [
      'test@test.com',
      'test@test.com, brak @, brak domeny, polskie znaki, spacje, max długość, formaty specjalne (a+b@c.com), unicode',
      'Tylko email z @',
      'Tylko duże litery'
    ],
    correct: 1,
    expl: 'Klasyczne EP+BVA dla emaila: poprawne (test@test.com, a+tag@gmail.com, polski@firma.pl), bez @ ("test"), bez domeny ("test@"), z spacjami, polskie znaki w lokalnej części, max długość (254 znaki RFC), case sensitivity, unicode (用户@测试.中国), kropki na końcu, podwójne @ ("a@@b").'
  },
  {
    id: 62, cat: 'design',
    q: 'Czym jest "happy path" w testowaniu?',
    a: [
      'Ścieżka do zadowolonego użytkownika',
      'Główny scenariusz, w którym wszystko idzie zgodnie z planem (poprawne dane, oczekiwany przebieg)',
      'Pozytywna ocena testów',
      'Test na koniec dnia pracy'
    ],
    correct: 1,
    expl: '**Happy path** to scenariusz, w którym użytkownik podaje poprawne dane i system działa zgodnie z oczekiwaniami. Zawsze testuj happy path NAJPIERW (sanity check), potem alternate paths i negative paths (błędne dane, edge cases, błędy systemowe).'
  },
  {
    id: 63, cat: 'design',
    q: 'Jak ustrukturyzujesz odpowiedź na pytanie "Przetestuj długopis"?',
    a: [
      'Sprawdzić czy pisze',
      'Kontekst (kto użytkownik) → funkcjonalne (pisze, klika) → niefunkcjonalne (jak długo, w jakich warunkach) → edge cases (woda, mróz, kosmos)',
      'Tylko kolor',
      'Tylko cenę'
    ],
    correct: 1,
    expl: 'Klasyczne zadanie rekrutacyjne. Schemat: 1) Kontekst (user persona, środowisko), 2) Funkcjonalne (czy pisze, czy klika, jak długo wkład), 3) Niefunkcjonalne (waga, ergonomia, hałas), 4) Cross-X (różne papiery, powierzchnie), 5) Edge cases (woda, mróz, do góry nogami, vacuum), 6) Bezpieczeństwo (zatkanie się), 7) Compatibility (uchwyt prawy/lewy).'
  },
  {
    id: 64, cat: 'design',
    q: 'Co to jest "negative testing"?',
    a: [
      'Testowanie w złym humorze',
      'Sprawdzanie reakcji systemu na nieprawidłowe dane wejściowe i nieoczekiwane sytuacje',
      'Pisanie negatywnych komentarzy',
      'Wycofanie zmian'
    ],
    correct: 1,
    expl: 'Negative testing: świadome wprowadzanie błędnych danych, by zobaczyć jak system reaguje. Czy waliduje? Czy crashuje? Czy zwraca pomocny błąd? Przykłady: pusty input, max długość +1, niedozwolone znaki, błędny format, ujemne liczby tam gdzie nie powinny być, race conditions.'
  },
  {
    id: 65, cat: 'design',
    q: 'Co testuje "boundary value analysis" dla zakresu wieku 18-65?',
    a: [
      'Tylko 18 i 65',
      'Wartości na granicach: 17, 18, 19, 64, 65, 66',
      'Tylko 18',
      'Wszystkie liczby od 18 do 65'
    ],
    correct: 1,
    expl: 'BVA dla 18-65: testujemy granice (najczęstsze miejsca błędów `<` vs `<=`): 17 (poniżej min, invalid), 18 (min, valid), 19 (tuż nad min, valid), 64 (tuż pod max, valid), 65 (max, valid), 66 (powyżej max, invalid). Dodatkowo edge: 0, -1, 999.'
  },

  // ===== SOFT / REKRUTACYJNE =====
  {
    id: 66, cat: 'soft',
    q: 'Pytanie: "Jak rozwiązujesz konflikt z developerem, który twierdzi że to nie bug?"',
    a: [
      'Eskaluję natychmiast do managera',
      'Pokazuję dokładne kroki repro, screenshot, specyfikację/AC, dyskutuję merytorycznie. Jeśli brak konsensusu - włączam PO',
      'Zgadzam się żeby uniknąć konfliktu',
      'Ignoruję i przechodzę do kolejnego'
    ],
    correct: 1,
    expl: 'Profesjonalne podejście: 1) Pokazuję precyzyjne kroki reprodukcji + screenshot/video. 2) Referuję do dokumentacji/AC/specyfikacji. 3) Dyskutujemy merytorycznie - może to feature, może niejasne wymagania. 4) Jeśli brak konsensusu - włączamy PO/BA do decyzji. Klucz: dane, nie emocje.'
  },
  {
    id: 67, cat: 'soft',
    q: 'Pytanie: "Jakie są Twoje słabe strony?" - co NIE warto mówić?',
    a: [
      'Jestem perfekcjonistą, pracuję za dużo - czyli klisze niewskazujące refleksji',
      'Mówię o konkretnej słabości, nad którą pracuję',
      'Podaję przykład z konkretnym planem rozwoju',
      'Łączę słabość z motywacją do nauki'
    ],
    correct: 0,
    expl: 'Klisze ("perfekcjonista", "za dużo pracuję") są transparentne i pokazują brak self-awareness. Dobre: konkretna, prawdziwa słabość + co robisz, by ją poprawić. Np.: "Moja automatyzacja jest podstawowa - skupiałem się na manualu, ale obecnie uczę się Playwright."'
  },
  {
    id: 68, cat: 'soft',
    q: 'Co powinieneś zrobić ZAWSZE na końcu rozmowy o pracę?',
    a: [
      'Spytać o wynagrodzenie',
      'Zadać 3-5 pytań do firmy/zespołu (przygotowanych wcześniej)',
      'Wyjść jak najszybciej',
      'Pochwalić rekrutera'
    ],
    correct: 1,
    expl: 'Zawsze miej 3-5 pytań: o zespół (struktura, seniority), proces release\'u, tech stack/debt, oczekiwania w pierwszych 90 dniach, kulturę, możliwości rozwoju, czemu stanowisko jest otwarte. Brak pytań = brak zainteresowania.'
  },
  {
    id: 69, cat: 'soft',
    q: 'Pytanie: "Czemu chcesz zmienić pracę?" - jak NIE odpowiadać?',
    a: [
      'Mówię o chęci rozwoju i nowych wyzwaniach',
      'Wymieniam wszystkie wady obecnej firmy i narzekam na byłego szefa',
      'Wskazuję co mnie pociąga w nowej roli',
      'Łączę zmianę z konkretnym celem zawodowym'
    ],
    correct: 1,
    expl: 'Klasyczna pułapka: narzekanie na obecnego pracodawcę zostaje zapamiętane jako Twoja cecha (lojalność, dojrzałość). Mów o **rozwoju**: nowe wyzwania, technologie, domena, większy produkt, kultura zespołu. Nawet jeśli jest źle - sformułuj pozytywnie.'
  },
  {
    id: 70, cat: 'soft',
    q: 'Co to jest metoda STAR przy odpowiadaniu na pytania behawioralne?',
    a: [
      'System ocen rekrutera',
      'Situation → Task → Action → Result - struktura odpowiedzi na pytania o doświadczenie',
      'Sposób oceniania kandydatów',
      'Skala 1-5 dla każdej odpowiedzi'
    ],
    correct: 1,
    expl: 'STAR: **Situation** (kontekst), **Task** (co miałeś zrobić), **Action** (co zrobiłeś - SZCZEGÓŁY), **Result** (efekt, najlepiej mierzalny). Używaj na pytania typu "Opowiedz o sytuacji gdy...". Najwięcej czasu na Action - to pokazuje Twoje kompetencje.'
  },

  // ===== DODATKOWE ISTQB =====
  {
    id: 71, cat: 'istqb',
    q: 'Co to jest "exit criteria" w testach?',
    a: [
      'Kryteria zwolnienia testera',
      'Warunki, które muszą być spełnione, by zakończyć fazę testów',
      'Lista test cases',
      'Procedura wyjścia z aplikacji'
    ],
    correct: 1,
    expl: 'Exit criteria definiują kiedy testowanie można zakończyć: np. wszystkie planowane testy wykonane, 95% pass rate, 0 critical bugs, 0 major bugs, coverage 80%, akceptacja PO. Bez nich testowanie może trwać w nieskończoność.'
  },
  {
    id: 72, cat: 'istqb',
    q: 'Co to jest test environment?',
    a: [
      'Biuro testerów',
      'Konfiguracja sprzętu, oprogramowania, sieci, danych, na której wykonywane są testy',
      'Środowisko produkcyjne',
      'Lista narzędzi QA'
    ],
    correct: 1,
    expl: 'Test environment to izolowane środowisko: serwery, bazy danych, aplikacja, dane testowe, konfiguracja sieci. Powinno być jak najbardziej podobne do produkcji. Typowo: dev → staging/QA → UAT → prod. Każde do różnych typów testów.'
  },
  {
    id: 73, cat: 'istqb',
    q: 'Czym jest "test data"?',
    a: [
      'Daty wykonania testów',
      'Dane wejściowe i oczekiwane dane wyjściowe używane w testach',
      'Wyniki testów w bazie',
      'Metryki testowe'
    ],
    correct: 1,
    expl: 'Test data: dane potrzebne do wykonania testów - userzy testowi, produkty, transakcje, edge cases. Wyzwania: realistyczne dane, ale anonimizowane (RODO), refresh między testami, generowanie dużych wolumenów, dane dla negative tests.'
  },
  {
    id: 74, cat: 'istqb',
    q: 'Co to jest "test coverage"?',
    a: [
      'Ubezpieczenie testerów',
      'Miara stopnia, w jakim testy pokrywają wymagania/kod/funkcjonalność',
      'Liczba zatrudnionych testerów',
      'Pokrycie geograficzne usługi'
    ],
    correct: 1,
    expl: 'Coverage: jaki procent wymagań/funkcji/kodu jest przetestowany. Rodzaje: requirements coverage (% wymagań pokrytych testami), code coverage (statement/branch/path), risk coverage. 100% coverage nie oznacza brak bugów (wartości danych mają znaczenie).'
  },
  {
    id: 75, cat: 'istqb',
    q: 'Czym różni się testowanie funkcjonalne od niefunkcjonalnego?',
    a: [
      'To są synonimy',
      'Funkcjonalne: CO robi system (features). Niefunkcjonalne: JAK (performance, security, usability, scalability)',
      'Funkcjonalne to manualne, niefunkcjonalne automatyczne',
      'Funkcjonalne dla GUI, niefunkcjonalne dla API'
    ],
    correct: 1,
    expl: '**Funkcjonalne**: czy login działa, czy zamówienie się składa, czy email się wysyła. **Niefunkcjonalne**: performance (czas odpowiedzi), security (czy bezpieczne), usability (czy intuicyjne), reliability (czy nie crashuje), scalability, accessibility.'
  },
  {
    id: 76, cat: 'istqb',
    q: 'Co to jest performance testing?',
    a: [
      'Ocena pracownika',
      'Testowanie zachowania systemu pod obciążeniem (czas odpowiedzi, throughput, resource usage)',
      'Test wydajności komputera',
      'Test szybkości pisania kodu'
    ],
    correct: 1,
    expl: 'Performance testing typy: **Load** (typowe obciążenie), **Stress** (powyżej limitu - kiedy padnie?), **Spike** (nagły wzrost), **Endurance** (długotrwałe obciążenie - memory leaks), **Volume** (duże ilości danych). Narzędzia: JMeter, k6, Gatling.'
  },
  {
    id: 77, cat: 'istqb',
    q: 'Co to są role w Scrum?',
    a: [
      'Tylko Scrum Master',
      'Product Owner, Scrum Master, Developers (Development Team)',
      'PM, Tech Lead, QA Lead',
      'CEO, CTO, COO'
    ],
    correct: 1,
    expl: '**Scrum Roles**: **Product Owner** (właściciel produktu, backlog, priorytety), **Scrum Master** (facylitator, usuwa blockery, chroni zespół), **Developers** (cały team produktowy: dev, QA, UX). QA jest częścią Developers, nie osobną rolą.'
  },

  // ===== KOLEJNE PYTANIA - mieszane =====
  {
    id: 78, cat: 'web',
    q: 'Co warto przetestować przy uploadzie pliku?',
    a: [
      'Tylko czy plik się załadował',
      'Różne typy (poprawne i niepoprawne), rozmiary (0B, max, max+1), nazwy (długie, polskie znaki, znaki specjalne), bezpieczeństwo (.exe, .php), wielokrotny upload, anulowanie',
      'Tylko PDF',
      'Tylko maksymalny rozmiar'
    ],
    correct: 1,
    expl: 'File upload testing: dozwolone typy (jpg, pdf), niedozwolone (.exe, .php, .sh), rozmiary (0B, 1B, max, max+1, GB), nazwy (długie, polskie, znaki specjalne, spacje, podwójne rozszerzenia .jpg.exe), bezpieczeństwo (skanowanie malware), anulowanie w trakcie, drag&drop vs button, wiele plików, duplicaty.'
  },
  {
    id: 79, cat: 'api',
    q: 'Co oznacza kod HTTP 204?',
    a: [
      'Bad Request',
      'No Content - request OK, ale response nie ma body (np. po DELETE)',
      'Not Found',
      'Server Error'
    ],
    correct: 1,
    expl: '**204 No Content** - sukces, ale response intencjonalnie nie ma body. Często po DELETE (usunięto, nie ma co zwracać) lub PUT bez potrzeby zwracania zaktualizowanego zasobu. NIE to samo co 200 z pustym body.'
  },
  {
    id: 80, cat: 'api',
    q: 'Co oznacza kod HTTP 422?',
    a: [
      'Server Error',
      'Unprocessable Entity - syntaktycznie poprawny request, ale niemożliwy do przetworzenia (np. walidacja semantyczna)',
      'Not Found',
      'Bad Request'
    ],
    correct: 1,
    expl: '**422 Unprocessable Entity** - JSON jest valid, ale dane nie przechodzą walidacji biznesowej (np. email w złym formacie, hasło za krótkie). Różnica od 400 Bad Request: 400 - syntax error (malformed JSON), 422 - semantic error (logika walidacji).'
  },
  {
    id: 81, cat: 'agile',
    q: 'Co to jest "burn-down chart"?',
    a: [
      'Wykres temperatury serwera',
      'Wykres pokazujący ilość pozostałej pracy w sprincie w czasie',
      'Lista bugów do naprawy',
      'Plan urlopów zespołu'
    ],
    correct: 1,
    expl: 'Burn-down chart pokazuje ile work pozostało (story points / hours) w sprincie z dnia na dzień. Linia idealna od total points do 0 vs rzeczywista. Pomaga zobaczyć czy sprint idzie zgodnie z planem, czy są problemy (linia płaska = blocker, gwałtowny spadek = bulk completion).'
  },
  {
    id: 82, cat: 'agile',
    q: 'Co to jest "Definition of Ready" (DoR)?',
    a: [
      'Definicja gotowości serwera',
      'Kryteria, które user story musi spełniać, by być gotowa do podjęcia w sprincie',
      'Status QA dla testów',
      'Status PO dla feature requestu'
    ],
    correct: 1,
    expl: 'DoR: kiedy user story jest "ready" do sprint planningu. Typowo: opisana z perspektywy usera, ma acceptance criteria, jest estimated, dependencies zidentyfikowane, mockupy gotowe, drobna na tyle by zmieścić się w sprincie. Bez DoR sprint planning gubi się w niejasnościach.'
  },
  {
    id: 83, cat: 'defects',
    q: 'Co to jest "blocker"?',
    a: [
      'Adblock w przeglądarce',
      'Bug, który uniemożliwia dalsze testowanie lub używanie kluczowej funkcji',
      'Funkcja blokowania userów',
      'Status w Jira oznaczający nieaktywne zadanie'
    ],
    correct: 1,
    expl: 'Blocker (najwyższy severity) - bug uniemożliwia kontynuację: aplikacja nie startuje, login nie działa, krytyczna funkcja crashuje, deployment niemożliwy. Wymaga natychmiastowej reakcji - dropuje się wszystko inne i naprawia.'
  },
  {
    id: 84, cat: 'tools',
    q: 'W jakim formacie najczęściej zapisujesz logi z testów?',
    a: [
      'JSON (strukturalny, łatwy do parsowania)',
      'TXT (czytelny, prosty)',
      'XML (semi-strukturalny)',
      'Wszystkie powyższe - zależnie od narzędzia'
    ],
    correct: 3,
    expl: 'Format zależy od narzędzia i celu: JSON/XML dla integracji z CI/CD i parsowania (JUnit XML jest standardem), HTML reports dla ludzkiego oglądu (Allure, Mochawesome), TXT/console dla quick debug. W twojej pracy z Logcat - format Android log.'
  },
  {
    id: 85, cat: 'web',
    q: 'Co znajdziesz w nagłówku User-Agent?',
    a: [
      'Login użytkownika',
      'Identyfikację przeglądarki/aplikacji wysyłającej request (np. Mozilla/5.0 Chrome/120)',
      'IP użytkownika',
      'Język użytkownika'
    ],
    correct: 1,
    expl: 'User-Agent: string opisujący klienta - przeglądarkę (Chrome, Firefox), wersję, OS, czasem urządzenie. Serwer może na jego podstawie zwracać różną zawartość (np. mobilną wersję). Tester może podszyć się pod różne urządzenia zmieniając UA w DevTools.'
  },
  {
    id: 86, cat: 'web',
    q: 'Co to jest CDN (Content Delivery Network)?',
    a: [
      'Sieć dostawców internetu',
      'Sieć serwerów rozproszonych geograficznie, dostarczająca statyczne zasoby (obrazy, JS, CSS) szybciej dzięki bliskości do usera',
      'Baza danych w chmurze',
      'Protokół DNS'
    ],
    correct: 1,
    expl: 'CDN (Cloudflare, AWS CloudFront, Akamai) - cachuje statyczne zasoby (img, JS, CSS, video) na serwerach blisko użytkownika. Zmniejsza latencję, odciąża origin server, zwiększa availability. Testując sprawdzaj: czy zasoby ładują się z CDN, cache headers, invalidation po deploy.'
  },
  {
    id: 87, cat: 'design',
    q: 'Czym jest "test pyramid" w kontekście automatyzacji?',
    a: [
      'Struktura zarządzania testami',
      'Model: dużo szybkich unit tests u podstawy, mniej integration, najmniej E2E na górze',
      'Lista kategorii testów',
      'Hierarchia QA w firmie'
    ],
    correct: 1,
    expl: 'Test Pyramid (Mike Cohn): u podstawy najwięcej **unit tests** (szybkie, izolowane, tanie), środek **integration tests** (komponenty razem), góra **E2E tests** (pełen flow, wolne, drogie, niestabilne). Odwrócona piramida (ice cream cone) to anty-wzorzec.'
  },
  {
    id: 88, cat: 'defects',
    q: 'Co to jest "flaky test"?',
    a: [
      'Test napisany w kruchym frameworku',
      'Test, który czasem przechodzi, a czasem nie przy tym samym kodzie (niedeterministyczny)',
      'Test eksploracyjny',
      'Test bez asercji'
    ],
    correct: 1,
    expl: 'Flaky test: niestabilny, niedeterministyczny - bez zmiany kodu raz pass, raz fail. Przyczyny: race conditions, hardcoded waits, zależność od daty/czasu, kolejność testów, zewnętrzne zależności, network issues. Toxic - psuje zaufanie do testów.'
  },
  {
    id: 89, cat: 'api',
    q: 'Co oznacza kod HTTP 502?',
    a: [
      'Service Unavailable',
      'Bad Gateway - serwer pośredniczący (proxy/load balancer) otrzymał błędną odpowiedź od upstream',
      'Gateway Timeout',
      'Not Found'
    ],
    correct: 1,
    expl: '**502 Bad Gateway** - gateway/proxy (nginx, load balancer, API gateway) dostał invalid response od backend service. Typowo: backend crashuje, restartuje się, deploy w trakcie. Często widoczny w chmurze i mikroserwisach.'
  },
  {
    id: 90, cat: 'api',
    q: 'Czym różni się 503 od 504?',
    a: [
      'To są synonimy',
      '503 Service Unavailable: serwer wie że jest niedostępny (maintenance). 504 Gateway Timeout: gateway nie dostał odpowiedzi od upstream w czasie',
      '503 dotyczy GET, 504 POST',
      '503 to client error, 504 server error'
    ],
    correct: 1,
    expl: '**503 Service Unavailable** - serwer celowo zwraca błąd: maintenance, overload, planowany downtime. Często z `Retry-After`. **504 Gateway Timeout** - gateway/proxy czekał na upstream zbyt długo, dostał timeout. Backend prawdopodobnie wolno działa lub padł.'
  },

  // ===== DEFEKTY (rozszerzenie) =====
  {
    id: 91, cat: 'defects',
    q: 'Czym różni się "severity" od "priority"?',
    a: [
      'To synonimy',
      'Severity = techniczny wpływ na system, priority = pilność naprawy z perspektywy biznesu',
      'Severity ustala dev, priority QA',
      'Priority dotyczy tylko backendu'
    ],
    correct: 1,
    expl: '**Severity** (poważność) opisuje techniczny wpływ defektu. **Priority** (priorytet) określa pilność naprawy z perspektywy biznesu/użytkownika. Wysoka severity ≠ wysoki priority (np. crash w mało używanej feature może mieć niski priority).'
  },
  {
    id: 92, cat: 'defects',
    q: 'Czym jest defect leakage?',
    a: [
      'Przeciek poufnych defektów na zewnątrz',
      'Defekt znaleziony w produkcji, który powinien zostać złapany w testach',
      'Wyciek pamięci w aplikacji',
      'Defekt powstały i znaleziony w jednej fazie'
    ],
    correct: 1,
    expl: 'Defect leakage = defekt, który "wymknął się" z fazy testowej do produkcji (lub z testów jednostkowych do integracyjnych). To KPI mierzące skuteczność procesu QA — im niższy, tym lepiej.'
  },
  {
    id: 93, cat: 'defects',
    q: 'Co oznacza retest (confirmation testing)?',
    a: [
      'Powtórzenie scenariusza, który ujawnił defekt, po jego naprawie — żeby potwierdzić fix',
      'Testowanie tego samego co wcześniej, bez powodu',
      'Test wykonany ponownie przez innego testera',
      'Smoke test'
    ],
    correct: 0,
    expl: '**Retest** = wykonanie scenariusza ujawniającego defekt, po jego naprawie, aby potwierdzić rozwiązanie. To NIE to samo co regression testing, który sprawdza, czy fix nie zepsuł innych obszarów aplikacji.'
  },
  {
    id: 94, cat: 'defects',
    q: 'Defekt o priorytecie "blocker" oznacza:',
    a: [
      'Drobny błąd kosmetyczny',
      'Bug uniemożliwiający kontynuację testów lub wydanie produktu — wymaga natychmiastowej naprawy',
      'Defekt znaleziony w nocy',
      'Bug zgłoszony przez VIP klienta'
    ],
    correct: 1,
    expl: '**Blocker** = najwyższy priorytet. Bez naprawy nie ma jak kontynuować testów lub wypuścić release. Showstopper to często używany synonim. Wymaga drop-everything reakcji zespołu.'
  },
  {
    id: 95, cat: 'defects',
    q: 'Co powinno znaleźć się w dobrym bug reporcie?',
    a: [
      'Tylko tytuł i screenshot',
      'Kroki reprodukcji, oczekiwane vs aktualne zachowanie, środowisko (OS/browser/wersja), severity/priority',
      'Sugerowana implementacja fix-a w kodzie',
      'Tylko opis emocjonalny problemu'
    ],
    correct: 1,
    expl: 'Minimum dobrego bug reportu: jasny tytuł, kroki reprodukcji, oczekiwane vs aktualne zachowanie, środowisko, severity/priority. Sugerowanie implementacji fix-a wykracza poza odpowiedzialność testera — dostarczasz informację o problemie, nie projekt rozwiązania.'
  },
  {
    id: 96, cat: 'defects',
    q: 'Status "Won\'t fix" w bug trackerze oznacza:',
    a: [
      'Bug zostanie naprawiony za chwilę',
      'Świadoma decyzja, że defekt nie zostanie naprawiony (niski wpływ vs koszt, zmiana scope-u, "feature not bug")',
      'Bug technicznie niemożliwy do naprawy',
      'Bug został usunięty z systemu'
    ],
    correct: 1,
    expl: '**Won\'t fix** = świadoma decyzja zespołu/PM, że problemu nie naprawiamy. Powody: niski priority, wysoki koszt, planowana zmiana architektury, uznanie "feature, not bug". Defekt pozostaje w trackerze dla historii.'
  },
  {
    id: 97, cat: 'defects',
    q: 'Bug triage to:',
    a: [
      'Sortowanie defektów alfabetycznie',
      'Regularne spotkanie, na którym klasyfikuje się nowe defekty: severity, priority, przypisanie, decyzja o włączeniu do sprintu',
      'Automatyczne usuwanie duplikatów',
      'Testowanie po naprawie'
    ],
    correct: 1,
    expl: 'Bug triage = regularne (często codzienne lub cotygodniowe) spotkanie z udziałem PM, lead, QA, ew. devów. Cele: klasyfikacja nowych zgłoszeń, deduplikacja, decyzje o włączeniu do najbliższego release.'
  },
  {
    id: 98, cat: 'defects',
    q: 'Tytuł bug reportu "Nie działa zapisywanie" jest:',
    a: [
      'Dobry — krótki i konkretny',
      'Zły — brak kontekstu (gdzie, kiedy, jak się manifestuje, na czym)',
      'Idealny',
      'Zależy od projektu'
    ],
    correct: 1,
    expl: 'Dobry tytuł zawiera: GDZIE (komponent/screen), CO (akcja), JAK się manifestuje (crash/błąd/brak feedback). Przykład: "[Profil][iOS 17] Klik Save w edycji profilu zwraca 500 i nie zapisuje danych".'
  },

  // ===== SOFT SKILLS (rozszerzenie) =====
  {
    id: 99, cat: 'soft',
    q: 'Klient zgłasza krytyczny bug w produkcji 5 minut przed Twoim wyjściem w piątek. Co robisz?',
    a: [
      'Wychodzę — bug poczeka do poniedziałku',
      'Zostaję sam i pracuję 8h żeby naprawić',
      'Reportuję ze szczegółami (severity, repro, impact), eskaluję do dyżurnego/oncall lub managera, pomagam w investigation, ale nie podejmuję sam decyzji o rollbacku',
      'Mówię klientowi że to wina developerów'
    ],
    correct: 2,
    expl: 'QA nie podejmuje sam decyzji produkcyjnych typu rollback. Dostarczasz info (bug report z severity i repro), eskalujesz przez właściwy kanał (oncall, manager), pomagasz reproducować/diagnozować. Decyzje należą do lead/manager.'
  },
  {
    id: 100, cat: 'soft',
    q: 'Masz 3 dni do release, znalazłeś 20 bugów: 1 blocker, 5 high, 14 low. Co priorytetyzujesz?',
    a: [
      'Wszystkie po kolei od najstarszego',
      'Najpierw blocker, potem high — eskaluj do PM jeśli high nie zdążą; low udokumentuj i przenieś do następnego sprintu',
      'Tylko najnowsze',
      'Niczego nie zgłaszam, sam naprawiam'
    ],
    correct: 1,
    expl: 'Priorytet = wpływ na release. Blocker MUSI być naprawiony. High zwykle też (negocjuj z PM jeśli grozi ślizganiem terminu). Low można przesunąć z udokumentowaniem. Komunikuj jasno co zdąży, a co nie.'
  },
  {
    id: 101, cat: 'soft',
    q: 'Dev twierdzi "u mnie działa". Co teraz?',
    a: [
      'Kłócę się że to jego wina',
      'Rezygnuję z bug reportu',
      'Sprawdzam różnice środowiska (OS, browser, dane, wersja), nagrywam video, dołączam logi, robię pair debugging — ułatwiam reprodukcję u niego',
      'Eskaluje do CTO'
    ],
    correct: 2,
    expl: '"Nie reprodukuje się" zwykle = różnica w środowisku, danych testowych, wersji buildu lub stanie. QA pomaga zdiagnozować: dokładne kroki, dane testowe, video, console logs, browser/OS info. Pair debugging często rozwiązuje w 15 min.'
  },
  {
    id: 102, cat: 'soft',
    q: 'Manager pyta "ile testów jeszcze zostało?" Co odpowiadasz?',
    a: [
      'Dużo',
      'Konkretne liczby: wykonane/zaplanowane, znalezione bugi z severity, oszacowany czas pozostały, ryzyka blokujące',
      'Skończyłem',
      'Zapytaj zespół'
    ],
    correct: 1,
    expl: 'Manager potrzebuje danych do decyzji. Daj: progress (15/30 case-ów), ryzyka (3 high bugi w fixie), ETA, blokery. Konkrety > "dużo"/"kilka". To podstawa do planowania release-u i komunikacji z biznesem.'
  },
  {
    id: 103, cat: 'soft',
    q: 'Na rozmowie pytają cię o słabe strony. Najgorsza odpowiedź:',
    a: [
      'Konkretna realna słabość + plan rozwoju',
      '"Jestem perfekcjonistą / za bardzo się angażuję" — generyczne, brzmi nieszczerze',
      'Przykład z konkretnego projektu',
      'Przyznanie się do luki technicznej z planem nauki'
    ],
    correct: 1,
    expl: 'Generyczne "słabości" typu "perfekcjonizm" są red flagiem — pokazują brak samoświadomości. Lepsze: realna luka (np. "automatyzacja w Cypress") + co z tym robisz (kurs, mentor, side project). Pokazuje refleksję i action bias.'
  },
  {
    id: 104, cat: 'soft',
    q: 'Czym dla ciebie różni się QA od testera?',
    a: [
      'To synonimy',
      'QA = szerokie podejście do jakości procesu (prevention, requirements review, automation, mentoring). Tester = wykonywanie konkretnych testów',
      'QA programuje, tester nie',
      'QA zarabia więcej'
    ],
    correct: 1,
    expl: '**Quality Assurance** to dyscyplina szersza: procesy, prewencja defektów, review wymagań, strategia testów, mentoring. **Tester** to rola wykonująca konkretną aktywność. W praktyce się przeplatają — ale na rozmowie warto pokazać tę różnicę i swoją pozycję na spektrum.'
  },
  {
    id: 105, cat: 'soft',
    q: 'Jaki jest najczęstszy błąd w komunikacji bug reportu?',
    a: [
      'Zbyt techniczny język',
      'Brak konkretnych kroków reprodukcji, danych testowych i kontekstu — dev musi zgadywać',
      'Pisanie po polsku',
      'Używanie screenshotów'
    ],
    correct: 1,
    expl: 'Najwięcej tarcia powstaje gdy dev musi zgadywać "jak ty to zrobiłeś". Konkretne kroki (kliknij X, wpisz Y), dane testowe (user: foo@bar.com), screenshot/video, env (browser, OS, wersja) — eliminują 80% pytań zwrotnych i ping-pongu.'
  },

  // ===== TEST DESIGN (rozszerzenie) =====
  {
    id: 106, cat: 'design',
    q: 'Czym są równoważne klasy (equivalence partitioning)?',
    a: [
      'Podział danych wejściowych na grupy, w których system zachowuje się tak samo — wystarczy test z każdej grupy',
      'Klasy w kodzie obiektowym',
      'Klasy ekwiwalencji w matematyce',
      'Grupowanie testerów po doświadczeniu'
    ],
    correct: 0,
    expl: '**Equivalence partitioning** to technika czarnoskrzynkowa: dzielisz dane wejściowe na partycje (np. wiek <18, 18-65, >65), w których system zachowuje się jednakowo. Testujesz jedną reprezentatywną wartość z każdej partycji zamiast wszystkich.'
  },
  {
    id: 107, cat: 'design',
    q: 'Boundary Value Analysis (BVA) testuje:',
    a: [
      'Wszystkie możliwe wartości',
      'Granice partycji + wartości tuż obok (np. dla granicy 18: 17, 18, 19)',
      'Tylko wartości typowe',
      'Tylko wartości negatywne'
    ],
    correct: 1,
    expl: '**BVA** opiera się na obserwacji, że bugi często siedzą na granicach (off-by-one, `<=` vs `<`). Testuje wartość graniczną + jeden poniżej + jeden powyżej. Dla zakresu 1-100: 0, 1, 2, 99, 100, 101. Komplementarne z equivalence partitioning.'
  },
  {
    id: 108, cat: 'design',
    q: 'Decision table testing najbardziej się przydaje gdy:',
    a: [
      'Jest jedna prosta reguła',
      'Logika zależy od kombinacji wielu warunków (np. rabaty zależne od typu klienta + kwoty + sezonu)',
      'Testujemy wydajność',
      'Testujemy UI'
    ],
    correct: 1,
    expl: '**Tabela decyzyjna** systematycznie pokrywa kombinacje warunków → akcji. Idealna do reguł biznesowych: rabaty, uprawnienia, walidacje wielowarunkowe. Pomaga znaleźć luki i sprzeczności w specyfikacji jeszcze przed kodowaniem.'
  },
  {
    id: 109, cat: 'design',
    q: 'State transition testing dotyczy:',
    a: [
      'Migracji bazy danych',
      'Przejść między stanami systemu (np. Order: Created → Paid → Shipped) i prób nieprawidłowych przejść',
      'Tylko backendu',
      'Tylko frontendu'
    ],
    correct: 1,
    expl: 'Państwa-przejścia (state-transition) testuje system z dyskretnymi stanami. Sprawdza: prawidłowe przejścia (Created → Paid ✓), nieprawidłowe (Shipped → Paid ✗), akcje w każdym stanie, edge case (Paid przy braku produktu).'
  },
  {
    id: 110, cat: 'design',
    q: 'Testowanie eksploracyjne to:',
    a: [
      'Bezmyślne klikanie po aplikacji',
      'Symultaniczne projektowanie, wykonywanie i uczenie się o systemie — testy bez wcześniej spisanego skryptu, ale z celem',
      'Test, który zawsze przechodzi',
      'Test wymyślony przez biznes'
    ],
    correct: 1,
    expl: '**Exploratory testing** = świadome odkrywanie systemu z uczeniem się i jednoczesnym testowaniem. Tester ma cel ("sprawdź payment flow 90 min"), używa charters/test ideas, ale bez sztywnego skryptu. Często znajduje bugi pomijane przez scripted testy.'
  },

  // ===== TOOLS (rozszerzenie) =====
  {
    id: 111, cat: 'tools',
    q: 'W Postmanie kolekcje pozwalają:',
    a: [
      'Tylko zapisać requesty',
      'Grupować requesty, dzielić środowiska (env), uruchamiać sekwencyjnie z testami (Runner), eksportować do CI przez Newman',
      'Tylko podpisać requesty cyfrowo',
      'Mockować bazy danych'
    ],
    correct: 1,
    expl: 'Kolekcje w Postman to potężny grouping mechanism. Mają: zmienne środowiskowe (dev/staging/prod), pre-request scripts, test scripts, Runner do sekwencyjnego wykonywania z danymi z CSV/JSON, eksport do **Newman** (CLI do CI/CD).'
  },
  {
    id: 112, cat: 'tools',
    q: 'Selenium WebDriver służy do:',
    a: [
      'Testowania REST API',
      'Automatyzacji interakcji z przeglądarką (klikanie, wpisywanie, czytanie DOM) — standard W3C',
      'Testowania wydajności',
      'Mockowania serwerów'
    ],
    correct: 1,
    expl: '**Selenium WebDriver** to standard W3C dla automatyzacji przeglądarek. Każdy major browser ma driver (ChromeDriver, GeckoDriver). Komunikacja przez protokół, nie obrazowo jak macro. Wspiera multi-browser, ale jest bardziej "low-level" niż Cypress/Playwright.'
  },
  {
    id: 113, cat: 'tools',
    q: 'Page Object Model (POM) w automatyzacji UI to:',
    a: [
      'Wzorzec: każda strona ma osobną klasę z lokatorami i metodami; testy używają abstrakcji zamiast surowych selektorów',
      'Narzędzie wbudowane w Selenium',
      'Biblioteka do generowania PDFów',
      'Framework do API testów'
    ],
    correct: 0,
    expl: '**POM** separuje WHAT (test scenario) od HOW (jak kliknąć przycisk). Strona = klasa z lokatorami + akcjami. Test mówi `loginPage.login(user, pass)`. Gdy UI się zmienia, naprawiasz tylko klasę strony, nie każdy test. Klasyczny wzorzec, ale bywa krytykowany za boilerplate.'
  },
  {
    id: 114, cat: 'tools',
    q: 'Charles Proxy (i podobne: mitmproxy, Proxyman) służy do:',
    a: [
      'Przechwytywania, oglądania i modyfikowania ruchu HTTP/HTTPS między klientem a serwerem',
      'Tylko generowania ruchu',
      'Edycji baz danych',
      'Statycznej analizy kodu'
    ],
    correct: 0,
    expl: '**Charles** działa jako proxy man-in-the-middle. Pozwala: oglądać requesty/responses, modyfikować je w locie (Rewrite), symulować slow network (Throttling), breakpoint na request. Niezbędne do debugowania mobile / SPA. Wymaga zaufanego certyfikatu CA na urządzeniu.'
  },
  {
    id: 115, cat: 'tools',
    q: 'Cypress różni się od Selenium głównie tym, że:',
    a: [
      'Działa wyłącznie z Chrome',
      'Wykonuje testy bezpośrednio w przeglądarce (w tym samym procesie co aplikacja), ma automatyczne czekanie na elementy, time-travel debugger',
      'Testuje tylko API',
      'Wymaga osobnego serwera'
    ],
    correct: 1,
    expl: '**Cypress** to nowoczesne narzędzie — testy live w przeglądarce, automatic retry/wait, time-travel debugger, snapshot każdego kroku, lepszy DX. Wspiera Chrome, Firefox, Edge, WebKit. **Selenium** wygrywa w multi-browser i obsłudze wielu kart/okien (Cypress przez długi czas miał ograniczenia).'
  },

  // ===== MOBILE TESTING (nowa kategoria) =====
  {
    id: 116, cat: 'mobile',
    q: 'ADB (Android Debug Bridge) służy do:',
    a: [
      'Tylko instalacji APK',
      'Komunikacji z urządzeniem Android: instalacja APK, dostęp do shell, logi (logcat), pull/push plików, debugowanie',
      'Tylko czytania logów',
      'Tylko emulatorów, nie urządzeń fizycznych'
    ],
    correct: 1,
    expl: '`adb` to CLI do komunikacji z dowolnym Android device (USB lub emulator). Kluczowe komendy: `adb install/uninstall`, `adb logcat`, `adb shell`, `adb pull/push`, `adb devices`. Działa zarówno z fizycznymi urządzeniami (USB debugging), jak i emulatorami.'
  },
  {
    id: 117, cat: 'mobile',
    q: 'Najważniejsza różnica między emulatorem a urządzeniem fizycznym:',
    a: [
      'Nie ma różnicy',
      'Emulator pomija real-world faktory: bateria, sieć (3G/LTE/Wi-Fi switching), GPU, kamera, czujniki, gestures, fragmentacja OEM-ów (Samsung One UI vs stock vs Xiaomi MIUI)',
      'Emulator jest dokładniejszy',
      'Tylko emulator obsługuje root'
    ],
    correct: 1,
    expl: 'Emulator dobry do szybkiej iteracji w devie. Ale przed release MUSISZ przetestować na realnych urządzeniach: różne rozdzielczości, OEM-y z customowymi launcherami, słabsze GPU, niskie RAM, bateria, kamera, czujniki, prawdziwe touch gestures.'
  },
  {
    id: 118, cat: 'mobile',
    q: 'Co testujesz dla permission flow na Androidzie?',
    a: [
      'Tylko sukces flow',
      'Akceptację, odmowę, "deny + don\'t ask again", revoke z systemu po zaakceptowaniu, runtime permissions vs install-time, downgrade po update',
      'Tylko pierwsze uruchomienie',
      'Nic — to robi system'
    ],
    correct: 1,
    expl: 'Permission flow ma wiele stanów: zgoda → cofnięcie z Settings (czy app crashuje?), odmowa → "don\'t ask again" (czy graceful?), permission revoke gdy app w tle (np. zmiana w innej apce), downgrade po update. Każdy stan wymaga testu.'
  },
  {
    id: 119, cat: 'mobile',
    q: 'Co to "deep link" w aplikacji mobilnej?',
    a: [
      'Link do bardzo zagłębionej strony w sitemap',
      'Link, który otwiera konkretny ekran w aplikacji (np. myapp://product/123 lub uniwersalny https://app.com/product/123)',
      'Link tylko dla admina',
      'Hyperlink w PDF'
    ],
    correct: 1,
    expl: '**Deep link** otwiera konkretny widok w app, zamiast tylko home screen. Testuj: link z nieuruchomioną aplikacją (kontekst zachowany?), link gdy nie zainstalowana (fallback do store?), Android App Links vs custom scheme, link z różnych źródeł (email, push, web).'
  },
  {
    id: 120, cat: 'mobile',
    q: 'Co testować przy zmianie orientacji ekranu (portrait ↔ landscape)?',
    a: [
      'Nic szczególnego',
      'Zachowanie stanu (wpisane dane formularza, scroll position, video playback, otwarte dialogi), brak crashu/freeze',
      'Tylko czy obrazek się skaluje',
      'Tylko czy klawiatura się chowa'
    ],
    correct: 1,
    expl: 'Zmiana orientacji = Activity recreate na Androidzie (domyślnie). Klasyczne miejsca bugów: utracone wpisane dane formularza, scroll wraca na top, video resetuje się, dialog znika, focus przechodzi gdzie indziej. Wymaga `onSaveInstanceState` w kodzie.'
  },
  {
    id: 121, cat: 'mobile',
    q: 'Push notifications — co najczęściej testuje QA?',
    a: [
      'Tylko że przyszły',
      'Dostarczenie w różnych stanach (foreground/background/killed), deep link z notyfikacji, action buttons, badge count, system-level disable, group notifications',
      'Tylko ikonę',
      'Czas dostarczenia'
    ],
    correct: 1,
    expl: 'Push to złożona feature — różny handler dla każdego stanu app. Testuj: foreground vs background vs killed, action buttons, deep link z notyfikacji, expanded vs collapsed view, group notifications, system-level disabled (czy app graceful?), rich media (image/video).'
  },
  {
    id: 122, cat: 'mobile',
    q: 'Crash reporting w mobile QA — popularne narzędzia to:',
    a: [
      'Tylko console.log',
      'Firebase Crashlytics, Sentry, Bugsnag, Instabug — zbierają stack trace, device info, breadcrumbs prowadzące do crashu',
      'Excel',
      'Tylko Logcat (Android Studio)'
    ],
    correct: 1,
    expl: 'Crash reporting agreguje crashe od prawdziwych użytkowników. **Crashlytics** (najpopularniejszy, free, część Firebase), **Sentry** (poza Google ekosystem), **Bugsnag**. Zbierają stack trace, OS/device info, custom logs (breadcrumbs). QA monitoruje po release i prioritetyzuje fixe.'
  },
  {
    id: 123, cat: 'mobile',
    q: 'Jak symulować słabe połączenie sieciowe na iOS?',
    a: [
      'Nie da się',
      'Settings → Developer → Network Link Conditioner (presety: 3G, Edge, Very Bad Network, 100% Loss) lub Charles Proxy z throttlingiem',
      'Wyłączyć Wi-Fi',
      'Tylko na real device'
    ],
    correct: 1,
    expl: 'iOS ma wbudowany **Network Link Conditioner** (Settings → Developer): presety dla 3G, Edge, Very Bad Network, Lossy, 100% Loss. Charles/Proxyman też mają throttling. Testuj: long loading states, timeout handling, offline mode, retry logic, request cancellation przy zmianie sieci.'
  },
  {
    id: 124, cat: 'mobile',
    q: 'scrcpy to narzędzie do:',
    a: [
      'Skanowania portów',
      'Mirrorowania ekranu Android z komputera + sterowanie myszą/klawiaturą (przez ADB) — przydatne do demo, bug reportów, nagrywania sesji',
      'Edycji XML layoutów',
      'Statycznej analizy APK'
    ],
    correct: 1,
    expl: '`scrcpy` mirroruje ekran Androida na desktop przez ADB (open-source). Możesz sterować myszą/klawiaturą laptopa, nagrywać sesje, robić wide screenshot. Super do live demo bugów na call, presentation, prep na rozmowy. Nie wymaga roota.'
  },
  {
    id: 125, cat: 'mobile',
    q: 'App size i cold start time — dlaczego ważne dla QA?',
    a: [
      'Nie są ważne',
      'Wpływają na konwersję (porzucenia pobierania) i UX. Sklepy ostrzegają o appkach >150 MB, cold start <2s to wartość docelowa dla dobrego UX',
      'Tylko dla developerów',
      'Tylko na iOS'
    ],
    correct: 1,
    expl: 'Rozmiar APK/IPA wpływa na install rate (>150 MB na cell network = duża rezygnacja). **Cold start** (z killed) to first impression — >3s frustruje, >5s = ludzie zamykają. QA monitoruje metryki przez build pipeline (size diff per PR) i performance testing na słabszych urządzeniach.'
  },

  // ===== CTFL ROZDZ. 1 — PODSTAWY TESTOWANIA (Sylabus v4.0.1) =====
  // Pokrywa LO FL-1.1.1 do FL-1.5.3

  {
    id: 126, cat: 'fundamenty',
    q: 'Które z poniższych NIE jest typowym celem testów wg ISTQB?',
    a: [
      'Powodowanie awarii i znajdowanie defektów',
      'Budowanie zaufania do jakości przedmiotu testów',
      'Udowodnienie, że oprogramowanie jest wolne od defektów',
      'Zapewnienie wymaganego pokrycia przedmiotu testów'
    ],
    correct: 2,
    expl: 'Testowanie **nie może udowodnić braku defektów** — to wprost pierwsza zasada testowania (1.3). Sylabus 1.1.1 wymienia 9 typowych celów: ocena produktów pracy, powodowanie awarii i wykrywanie defektów, zapewnienie pokrycia, obniżanie ryzyka, sprawdzanie wymagań, sprawdzanie wymagań umownych/prawnych, dostarczanie informacji dla decyzji, budowanie zaufania, sprawdzanie kompletności. Cele zależą od kontekstu projektu.'
  },
  {
    id: 127, cat: 'fundamenty',
    q: 'Jaka jest fundamentalna różnica między testowaniem a debugowaniem?',
    a: [
      'Testowanie i debugowanie to synonimy',
      'Testowanie wykrywa awarie/defekty, debugowanie znajduje przyczynę i ją usuwa',
      'Testowanie wykonują testerzy, debugowanie kierownicy projektu',
      'Debugowanie poprzedza testowanie w cyklu wytwarzania'
    ],
    correct: 1,
    expl: 'Sylabus 1.1.2: **testowanie** dynamiczne wywołuje awarie (objawy defektów), statyczne wykrywa defekty bezpośrednio w produkcie pracy. **Debugowanie** to osobna czynność: odtworzenie awarii → diagnoza (znalezienie defektu) → usunięcie. Po debugowaniu wykonuje się testowanie potwierdzające (czy naprawione) i ewentualnie regresji.'
  },
  {
    id: 128, cat: 'fundamenty',
    q: 'Test sprawdza, czy system spełnia spisane wymagania funkcjonalne. To przykład:',
    a: [
      'Walidacji',
      'Weryfikacji',
      'Testowania potwierdzającego',
      'Debugowania'
    ],
    correct: 1,
    expl: '**Weryfikacja** = sprawdzenie zgodności ze specyfikowanymi wymaganiami ("did we build the product right?"). **Walidacja** = sprawdzenie, czy system odpowiada na potrzeby użytkowników w środowisku produkcyjnym ("did we build the right product?"). Sylabus 1.1 mówi, że testowanie obejmuje OBA — nie tylko weryfikację.'
  },
  {
    id: 129, cat: 'fundamenty',
    q: 'Co poprawnie opisuje łańcuch przyczynowy: pomyłka → defekt → awaria?',
    a: [
      'Awaria człowieka powoduje defekt, który prowadzi do pomyłki w kodzie',
      'Człowiek popełnia pomyłkę → powstaje defekt w produkcie pracy → wykonanie wadliwego kodu może spowodować awarię',
      'Defekt to to samo co awaria; pomyłka to ogólne pojęcie',
      'Każdy defekt zawsze powoduje awarię'
    ],
    correct: 1,
    expl: 'Sylabus 1.2.3: **pomyłka** (błąd ludzki, np. ze zmęczenia, presji) → **defekt** (usterka, pluskwa w kodzie/dokumencie) → **awaria** (system robi nie to, co powinien, lub nie robi tego, co powinien). **Podstawowa przyczyna** = źródło pomyłki, którą można wyeliminować (np. brak szkolenia). Uwaga: nie każdy defekt powoduje awarię — niektóre tylko w konkretnych warunkach.'
  },
  {
    id: 130, cat: 'fundamenty',
    q: 'Awarie mogą być powodowane wyłącznie przez defekty w kodzie. Prawda czy fałsz?',
    a: [
      'Prawda — awaria zawsze wynika z defektu w oprogramowaniu',
      'Fałsz — awarie mogą być powodowane także przez warunki środowiskowe (np. promieniowanie, pole elektromagnetyczne)',
      'Prawda, jeśli mówimy o systemach krytycznych',
      'Fałsz — awarie wynikają wyłącznie z pomyłek operatorów'
    ],
    correct: 1,
    expl: 'Sylabus 1.2.3 explicite: pomyłki i defekty nie są jedynymi przyczynami awarii. Awarie mogą być spowodowane także **warunkami środowiskowymi** (promieniowanie kosmiczne, pole elektromagnetyczne, zanieczyszczenia powodujące błąd firmware\'u itp.). Dlatego analiza podstawowej przyczyny obejmuje też kontekst, nie tylko kod.'
  },
  {
    id: 131, cat: 'fundamenty',
    q: 'Testowanie a zapewnienie jakości (QA) — która para określeń jest poprawna?',
    a: [
      'Testowanie = QA; oba terminy są wymienne',
      'Testowanie to forma kontroli jakości (produkt, korekcyjne); QA to zapewnienie jakości procesu (prewencyjne)',
      'QA to to samo co testowanie potwierdzające',
      'Testowanie jest częścią QA — testerzy odpowiadają za jakość procesów'
    ],
    correct: 1,
    expl: 'Sylabus 1.2.2: **Testowanie** = kontrola jakości (QC), korekcyjne, ukierunkowane na produkt. **QA** = zapewnienie jakości, prewencyjne, ukierunkowane na proces (dobry proces → dobry produkt). Oba podejścia używają wyników testów: QC do usuwania defektów, QA do oceny przebiegu procesów. Często mylone, ale to dwa różne obszary.'
  },
  {
    id: 132, cat: 'fundamenty',
    q: 'Która z poniższych NIE jest jedną z 7 zasad testowania ISTQB?',
    a: [
      'Testowanie ujawnia defekty, ale nie może dowieść ich braku',
      'Wczesne testowanie oszczędza czas i pieniądze',
      'Automatyzacja zawsze zwiększa skuteczność testowania',
      'Testowanie zależy od kontekstu'
    ],
    correct: 2,
    expl: '7 zasad (1.3): 1) Testowanie ujawnia defekty, nie dowodzi ich braku. 2) Testowanie gruntowne jest niemożliwe. 3) Wczesne testowanie oszczędza czas i pieniądze. 4) Defekty mogą się kumulować (Pareto). 5) Testy ulegają zużyciu (paradoks pestycydów). 6) Testowanie zależy od kontekstu. 7) Przekonanie o braku defektów jest błędem. Automatyzacja nie jest zasadą — to środek, nie cel.'
  },
  {
    id: 133, cat: 'fundamenty',
    q: 'Co oznacza zasada "testy ulegają zużyciu" (paradoks pestycydów)?',
    a: [
      'Stare przypadki testowe trzeba archiwizować po roku',
      'Wielokrotne powtarzanie tych samych testów prowadzi do spadku ich skuteczności w wykrywaniu nowych defektów',
      'Każdy test po wykonaniu nie nadaje się do ponownego użycia',
      'Testy automatyczne psują się szybciej niż manualne'
    ],
    correct: 1,
    expl: 'Sylabus 1.3 zasada 5: te same testy z czasem znajdują coraz mniej defektów. Przeciwdziałanie: modyfikować istniejące testy i dane testowe, pisać nowe. Wyjątek: testowanie regresji — tam świadomie powtarzamy, ale typowo automatycznie i celowo bez oczekiwania znajdowania nowych defektów (chodzi o brak nawrotów).'
  },
  {
    id: 134, cat: 'fundamenty',
    q: 'Zasada "defekty mogą się kumulować" oznacza, że:',
    a: [
      'Im więcej testów, tym więcej defektów',
      'Większość defektów wykrytych przed wydaniem / awarii w eksploatacji pochodzi z niewielkiej liczby modułów (zasada Pareto)',
      'Defekty zawsze rosną wykładniczo wraz z rozmiarem kodu',
      'Defekty multiplikują się przy każdej zmianie kodu'
    ],
    correct: 1,
    expl: 'Sylabus 1.3 zasada 4 + Pareto: zwykle większość defektów koncentruje się w niewielkiej liczbie modułów (skupiska defektów). Praktyczne zastosowanie: w testowaniu opartym na ryzyku (5.2) celujemy w skupiska, w analizie pokrycia szukamy podobnych obszarów, w retrospektywach analizujemy przyczyny.'
  },
  {
    id: 135, cat: 'fundamenty',
    q: 'Które stwierdzenie najlepiej opisuje zasadę "testowanie zależy od kontekstu"?',
    a: [
      'Należy zawsze stosować techniki czarnoskrzynkowe — działają w każdym kontekście',
      'Nie ma jednego uniwersalnego podejścia; testowanie systemu medycznego wygląda inaczej niż gry mobilnej',
      'Kontekst projektu nie wpływa na wybór technik testowania',
      'Każdy projekt wymaga tego samego zestawu testów'
    ],
    correct: 1,
    expl: 'Sylabus 1.3 zasada 6 i 1.4.2: na proces testowy wpływają interesariusze, dziedzina biznesowa, krytyczność, technologia, ograniczenia (zakres/budżet/czas), regulacje, cykl wytwarzania, narzędzia. System krytyczny dla bezpieczeństwa wymaga większej rygorystyczności i niezależności niż prototyp PoC. Dobór podejścia ZAWSZE zależy od kontekstu.'
  },
  {
    id: 136, cat: 'fundamenty',
    q: 'W jakiej kolejności logicznej (choć nie zawsze chronologicznej) ustawione są główne czynności procesu testowego?',
    a: [
      'Planowanie → wykonywanie → analiza → monitoring → projektowanie → implementacja → ukończenie',
      'Planowanie → monitoring i nadzór → analiza → projektowanie → implementacja → wykonywanie → ukończenie',
      'Analiza → projektowanie → planowanie → wykonywanie → ukończenie → monitoring',
      'Implementacja → analiza → planowanie → projektowanie → wykonywanie → monitoring → ukończenie'
    ],
    correct: 1,
    expl: 'Sylabus 1.4.1 wymienia 7 głównych grup czynności: **planowanie** (cele, podejście) → **monitorowanie i nadzór** (ciągle) → **analiza** ("co testować") → **projektowanie** ("jak testować", przypadki) → **implementacja** (procedury, dane, środowisko) → **wykonywanie** → **ukończenie** (raport, archiwizacja, retrospekcja). Często iteracyjnie i równolegle.'
  },
  {
    id: 137, cat: 'fundamenty',
    q: 'Plan testów, harmonogram, rejestr ryzyk oraz kryteria wejścia/wyjścia to testalia związane z:',
    a: [
      'Wykonywaniem testów',
      'Planowaniem testów',
      'Ukończeniem testów',
      'Analizą testów'
    ],
    correct: 1,
    expl: 'Sylabus 1.4.3: produkty pracy planowania to plan testów, harmonogram, rejestr ryzyk, kryteria wejścia/wyjścia. Inne grupy: analiza → warunki testowe, raporty o defektach w podstawie testów; projektowanie → przypadki testowe, karty opisów testów; implementacja → procedury, skrypty, dane testowe, środowisko; wykonywanie → dzienniki testów, raporty o defektach; ukończenie → raport sumaryczny, lista usprawnień.'
  },
  {
    id: 138, cat: 'fundamenty',
    q: 'Jaka jest główna korzyść ze śledzenia powiązań (traceability) między podstawą testów a testaliami?',
    a: [
      'Spełnia wymóg formalny przy audycie ISO',
      'Umożliwia ocenę pokrycia, śledzenie wpływu zmian i raportowanie statusu w zrozumiały dla interesariuszy sposób',
      'Pozwala automatyzować wszystkie przypadki testowe',
      'Eliminuje potrzebę testowania regresji'
    ],
    correct: 1,
    expl: 'Sylabus 1.4.4: traceability łączy wymagania → warunki testowe → przypadki testowe → wyniki → defekty. Korzyści: ocena pokrycia testowego, ocena ryzyka rezydualnego (powiązanie wyników z ryzykami), analiza wpływu zmian, audyty, bardziej zrozumiałe raporty (np. KPI realizacji wymagań biznesowych zamiast "300 testów green").'
  },
  {
    id: 139, cat: 'fundamenty',
    q: 'Sylabus CTFL v4.0.1 wyróżnia dwie zasadnicze role w testowaniu. Które?',
    a: [
      'Test Manager i Test Architect',
      'Manualny tester i automatyczny tester',
      'Rola związana z zarządzaniem testami oraz rola związana z testowaniem',
      'QA Engineer i QA Analyst'
    ],
    correct: 2,
    expl: 'Sylabus 1.4.5: **zarządzanie testami** (planowanie, monitoring, nadzór, ukończenie — przykładowo: lider zespołu, kierownik testów) i **testowanie** (analiza, projektowanie, implementacja, wykonywanie). Ta sama osoba może pełnić obie role. W Scrumie zarządzanie często rozproszone na zespół, lider, czasem PO/SM.'
  },
  {
    id: 140, cat: 'fundamenty',
    q: 'Co oznacza zjawisko "confirmation bias" w kontekście pracy testera?',
    a: [
      'Skłonność do potwierdzania wyników testów drugim wykonaniem',
      'Tendencja do trudnego akceptowania informacji sprzecznych z dotychczasowymi przekonaniami (np. przez autora kodu odbierającego raport o defekcie)',
      'Wymóg zatwierdzania defektów przez kierownika testów',
      'Konieczność powtarzania testów potwierdzających'
    ],
    correct: 1,
    expl: 'Sylabus 1.5.1: **confirmation bias** (efekt potwierdzenia) — psychologiczna tendencja do odrzucania informacji sprzecznych z dotychczasowymi przekonaniami. Dlatego autor kodu może być oporny na raport o defekcie, a komunikacja z zespołem dewelopmentu musi być konstruktywna. Wymaga umiejętności komunikacyjnych, aktywnego słuchania, prezentowania defektów jako informacji, nie krytyki.'
  },
  {
    id: 141, cat: 'fundamenty',
    q: 'Podejście "cały zespół" (whole-team approach) oznacza, że:',
    a: [
      'Tylko testerzy odpowiadają za jakość produktu',
      'Każdy członek zespołu, mając niezbędną wiedzę i umiejętności, może wykonywać dowolne zadania; odpowiedzialność za jakość spoczywa na wszystkich',
      'Cały zespół testuje na koniec sprintu',
      'Każdy członek zespołu musi mieć certyfikat ISTQB'
    ],
    correct: 1,
    expl: 'Sylabus 1.5.2: pochodzi z eXtreme Programming (XP). Zwiększa dynamikę pracy zespołowej, ułatwia wymianę informacji, daje efekt synergii. Testerzy współpracują z biznesem przy testach akceptacyjnych, z programistami przy automatyzacji. Uwaga: w systemach krytycznych może być wymagana wysoka niezależność testów — wtedy whole-team nie wystarczy.'
  },
  {
    id: 142, cat: 'fundamenty',
    q: 'Które stwierdzenie o niezależności testowania jest prawdziwe?',
    a: [
      'Niezależność testowania całkowicie zastępuje znajomość produktu',
      'Programiści nie potrafią wykrywać defektów we własnym kodzie',
      'Pewien stopień niezależności zwykle zwiększa skuteczność wykrywania defektów, ale niezależność nie zastępuje znajomości produktu',
      'Im wyższy poziom niezależności, tym lepiej — zawsze należy zatrudniać firmę zewnętrzną'
    ],
    correct: 2,
    expl: 'Sylabus 1.5.3: niezależność zwiększa skuteczność (inne błędy poznawcze, inne doświadczenia), ale **nie zastępuje** znajomości produktu — programiści wykrywają wiele defektów we własnym kodzie. Najlepiej sprawdza się testowanie na wielu poziomach niezależności: dev robi unity i integrację modułów, zespół testowy systemowe, biznes akceptacyjne.'
  },
  {
    id: 143, cat: 'fundamenty',
    q: 'Co jest WADĄ wysokiej niezależności testowania (np. odizolowany zespół testowy lub firma zewnętrzna)?',
    a: [
      'Wykrywa się mniej defektów',
      'Ryzyko braku wymiany informacji i konfliktów z deweloperami, utrata poczucia odpowiedzialności za jakość przez programistów, możliwość traktowania testerów jako wąskiego gardła',
      'Wyższy koszt licencji narzędzi',
      'Konieczność dłuższych szkoleń'
    ],
    correct: 1,
    expl: 'Sylabus 1.5.3 wymienia konkretne wady: izolacja niezależnych testerów rodzi problemy komunikacyjne, konflikty, programiści mogą "zrzucić" odpowiedzialność za jakość na testerów ("oni to wyłapią"), istnieje ryzyko że testerzy zostaną obarczeni winą za nieterminowe wydania. To są realne risk-faktory — szczególnie w systemach o wysokim ryzyku.'
  },

  // ===== CTFL ROZDZ. 2 — TESTOWANIE W CYKLU WYTWARZANIA (Sylabus v4.0.1) =====
  // Pokrywa LO FL-2.1.1 do FL-2.3.1

  {
    id: 144, cat: 'cykl-wytwarzania',
    q: 'Który zestaw poprawnie klasyfikuje modele cyklu wytwarzania (SDLC)?',
    a: [
      'Sekwencyjne: kaskadowy, V-model; iteracyjne: spiralny, prototypowanie; przyrostowe: Unified Process',
      'Sekwencyjne: Scrum; iteracyjne: kaskadowy; przyrostowe: V-model',
      'Wszystkie modele są iteracyjne; tylko nazwy się różnią',
      'Sekwencyjne: Kanban; iteracyjne: kaskadowy; przyrostowe: XP'
    ],
    correct: 0,
    expl: 'Sylabus 2.1: **sekwencyjne** = kaskadowy (waterfall) i V-model (kod powstaje w późniejszych fazach, dynamiczne testowanie późno). **Iteracyjne** = spiralny, prototypowanie. **Przyrostowe** = Unified Process. Metody zwinne (Scrum, XP, Kanban) bazują głównie na podejściu iteracyjno-przyrostowym. ATDD/BDD/TDD to praktyki, nie modele SDLC.'
  },
  {
    id: 145, cat: 'cykl-wytwarzania',
    q: 'Na co wpływa wybrany model cyklu wytwarzania oprogramowania w kontekście testowania?',
    a: [
      'Tylko na koszt projektu',
      'Tylko na liczbę testerów w zespole',
      'Na zakres i czas wykonywania czynności testowych, szczegółowość testaliów, wybór technik i podejść, zakres automatyzacji oraz role i obowiązki testera',
      'Wyłącznie na używane narzędzia'
    ],
    correct: 2,
    expl: 'Sylabus 2.1.1 wymienia 5 aspektów na które wpływa model SDLC: (1) zakres i czas czynności testowych, (2) szczegółowość testaliów, (3) wybór technik i podejść do testowania, (4) zakres automatyzacji testów, (5) role i obowiązki testera. W modelu sekwencyjnym tester wchodzi późno; w zwinnym — od początku i często.'
  },
  {
    id: 146, cat: 'cykl-wytwarzania',
    q: 'Które stwierdzenie opisuje dobre praktyki testowania mające zastosowanie do KAŻDEGO modelu SDLC?',
    a: [
      'Tylko testy automatyczne są dobrą praktyką',
      'Każdej czynności wytwórczej odpowiada czynność testowa; każdy poziom testów ma odrębne cele; analiza i projektowanie testów rozpoczyna się w fazie wytwórczej tego poziomu; testerzy uczestniczą w przeglądach',
      'Testowanie zawsze rozpoczyna się po zakończeniu kodowania',
      'Każdy poziom testów ma identyczne cele'
    ],
    correct: 1,
    expl: 'Sylabus 2.1.2 — 4 dobre praktyki uniwersalne: (1) każda czynność wytwórcza ma odpowiadającą czynność testową, (2) różne cele dla różnych poziomów testów (unikanie nadmiarowości), (3) analiza/projektowanie testów dla danego poziomu zaczyna się w fazie wytwarzania tego poziomu (zgodnie z zasadą wczesnego testowania), (4) testerzy uczestniczą w przeglądach od momentu udostępnienia wersji roboczych.'
  },
  {
    id: 147, cat: 'cykl-wytwarzania',
    q: 'Czym różni się TDD od ATDD?',
    a: [
      'TDD i ATDD to to samo',
      'TDD pisze testy modułowe przed kodem (sterowane testami jednostkowymi); ATDD wywodzi testy z kryteriów akceptacji i pisze je przed wytworzeniem funkcjonalności',
      'TDD jest dla testerów, ATDD dla developerów',
      'TDD wymaga BDD, ATDD nie'
    ],
    correct: 1,
    expl: 'Sylabus 2.1.3: **TDD** (Test-Driven Development, Beck 2003) — najpierw piszemy test modułowy, potem minimum kodu, by przeszedł, potem refaktor. Sterowane przez programistę. **ATDD** (Acceptance Test-Driven Development) — testy wywodzą się z kryteriów akceptacji, pisane przed wytworzeniem fragmentu aplikacji (patrz 4.5.3). **BDD** — pożądane zachowanie w formie Given/When/Then, czytelne dla biznesu.'
  },
  {
    id: 148, cat: 'cykl-wytwarzania',
    q: 'W jakiej formie najczęściej zapisuje się scenariusze w BDD?',
    a: [
      'W formie kodu testowego (JUnit/PyTest)',
      'W formie matematycznej notacji formalnej',
      'W prostej formie języka naturalnego, zwykle Given/When/Then (Mając/Kiedy/Wtedy)',
      'W formie diagramu UML'
    ],
    correct: 2,
    expl: 'Sylabus 2.1.3: BDD (Behavior-Driven Development, Chelimsky 2010) opisuje pożądane zachowanie w **języku naturalnym**, formacie **Given/When/Then** (po polsku Mając/Kiedy/Wtedy). Cel: scenariusze są zrozumiałe dla interesariuszy biznesowych, ale jednocześnie automatycznie przekładalne na testy wykonywalne (np. przez Cucumber/SpecFlow).'
  },
  {
    id: 149, cat: 'cykl-wytwarzania',
    q: 'Jakie są typowe korzyści metodyki DevOps z perspektywy testowania?',
    a: [
      'Eliminacja potrzeby testowania manualnego',
      'Szybkie informacje zwrotne, ciągła integracja sprzyjająca shift-left, automatyczne pipeline\'y, większa widoczność charakterystyk niefunkcjonalnych, zmniejszenie ryzyka regresji dzięki skali automatyzacji',
      'Mniej testów regresji',
      'Brak konieczności posiadania środowisk testowych'
    ],
    correct: 1,
    expl: 'Sylabus 2.1.4 — korzyści DevOps dla testowania: (1) szybkie informacje zwrotne nt. jakości i wpływu zmian, (2) ciągła integracja → shift-left, (3) automatyzacja CI/CD ułatwia stabilne środowiska, (4) widoczność niefunkcjonalnych (wydajność, niezawodność), (5) mniej powtarzalnego testowania manualnego, (6) szeroki zasięg testów regresji = niższe ryzyko. Manualne wciąż potrzebne (zwłaszcza UX).'
  },
  {
    id: 150, cat: 'cykl-wytwarzania',
    q: 'Wdrożenie DevOps wiąże się z określonymi ryzykami i wyzwaniami. Które są wymienione w sylabusie?',
    a: [
      'Brak ryzyk — DevOps zawsze działa lepiej',
      'Konieczność zdefiniowania potoku dostarczania, narzędzi CI/CD oraz przeznaczenia zasobów na automatyzację i utrzymanie mechanizmów automatyzacji',
      'DevOps wymaga obowiązkowo testów manualnych',
      'DevOps zwiększa koszt testowania zawsze 2-krotnie'
    ],
    correct: 1,
    expl: 'Sylabus 2.1.4 wymienia konkretne ryzyka: (1) konieczność zdefiniowania potoku dostarczania DevOps, (2) wdrożenie i utrzymanie narzędzi CI/CD, (3) **dodatkowe zasoby na automatyzację testów oraz utrzymanie skryptów** — to często niedoceniany koszt. Sukces DevOps wymaga zmiany kultury organizacyjnej (likwidacja silosów dev–ops).'
  },
  {
    id: 151, cat: 'cykl-wytwarzania',
    q: 'Co oznacza "przesunięcie w lewo" (shift left)?',
    a: [
      'Przenoszenie testerów do zespołu deweloperskiego',
      'Wykonywanie testów regresji po wydaniu',
      'Wykonywanie testowania na wcześniejszych etapach cyklu wytwarzania (przeglądy specyfikacji, testy przed kodowaniem, analiza statyczna, niefunkcjonalne na poziomie modułowym, CI/CD)',
      'Zmiana metodyki z agile na waterfall'
    ],
    correct: 2,
    expl: 'Sylabus 2.1.5: shift left = realizacja zasady wczesnego testowania (1.3) w praktyce. Konkretne wdrożenia: (1) przegląd specyfikacji z perspektywy testera, (2) pisanie testów przed kodem (TDD/ATDD/BDD), (3) ciągła integracja, (4) analiza statyczna kodu przed testowaniem dynamicznym, (5) niefunkcjonalne już na modułowym. Wymaga większego wysiłku wcześnie, ale obniża koszty później. **Nie zwalnia** z późniejszego testowania!'
  },
  {
    id: 152, cat: 'cykl-wytwarzania',
    q: 'Kiedy organizuje się retrospektywy i jakie są typowe korzyści dla testowania?',
    a: [
      'Tylko po awariach produkcyjnych; korzyść to wina dla testera',
      'Po zakończeniu projektu/iteracji/kamienia milowego (zwykle przed przekazaniem do eksploatacji); korzyści: skuteczniejsze testy, lepsza jakość testaliów i podstawy testów, więź w zespole, lepsza współpraca dev↔QA',
      'Co tydzień, niezależnie od kontekstu',
      'Tylko w Scrumie'
    ],
    correct: 1,
    expl: 'Sylabus 2.1.6: retrospektywy zwykle po projekcie/iteracji/kamieniu milowym (przed przekazaniem do eksploatacji), ale mogą być też w innych momentach. Pytania: co poszło dobrze, co źle, co poprawić, jak zachować dobre praktyki. Korzyści dla testowania: lepsze testy, lepsze testalia, lepsza podstawa testów (analiza wymagań), wzmocnienie więzi zespołu, lepsza współpraca dev↔QA.'
  },
  {
    id: 153, cat: 'cykl-wytwarzania',
    q: 'Sylabus CTFL v4.0.1 wymienia 5 poziomów testów. Które to?',
    a: [
      'Modułowe, integracji modułów, systemowe, integracji systemów, akceptacyjne',
      'Smoke, sanity, regression, exploratory, acceptance',
      'Unit, API, UI, performance, security',
      'Plan, design, execute, report, close'
    ],
    correct: 0,
    expl: 'Sylabus 2.2.1 — 5 poziomów: (1) **modułowe** (jednostkowe/komponentowe) — programiści, frameworki, (2) **integracji modułów** — interfejsy między modułami, strategie zstępująca/wstępująca/big bang, (3) **systemowe** — całość systemu, często niezależny zespół, (4) **integracji systemów** — interfejsy z systemami zewnętrznymi, (5) **akceptacyjne** — walidacja gotowości do wdrożenia.'
  },
  {
    id: 154, cat: 'cykl-wytwarzania',
    q: 'Które formy testowania akceptacyjnego wymienia sylabus CTFL?',
    a: [
      'UAT i regresji',
      'Smoke i sanity',
      'Akceptacyjne użytkownika (UAT), operacyjne (OAT), zgodności z umową, zgodności z prawem oraz alfa i beta',
      'Tylko alfa i beta'
    ],
    correct: 2,
    expl: 'Sylabus 2.2.1 — formy akceptacyjnego: **UAT** (user acceptance — biznes, end-userzy), **OAT** (operational — backup, recovery, security ops), **contract acceptance** (zgodność z umową), **regulation acceptance** (regulacje prawne), **alfa** (u producenta, testują zewnętrzni użytkownicy), **beta** (u klientów). Często wykonywane przez docelowych użytkowników, nie testerów.'
  },
  {
    id: 155, cat: 'cykl-wytwarzania',
    q: 'Po czym rozróżnia się poziomy testów, aby uniknąć ich nakładania się?',
    a: [
      'Tylko po liczbie testerów',
      'Po przedmiocie testów, celach testów, podstawie testów, defektach/awariach oraz podejściach i odpowiedzialnościach',
      'Tylko po czasie wykonywania',
      'Po cenie licencji narzędzi'
    ],
    correct: 1,
    expl: 'Sylabus 2.2.1 wymienia 5 atrybutów rozróżniających poziomy testów: (1) przedmiot testów (moduł vs system vs interfejs systemów), (2) cele (znaleźć defekty modułu vs walidować gotowość), (3) podstawa testów (kod vs specyfikacja vs wymagania biznesowe), (4) typowe defekty i awarie, (5) podejścia i odpowiedzialności. Bez tego = nadmiarowość lub luki w pokryciu.'
  },
  {
    id: 156, cat: 'cykl-wytwarzania',
    q: 'Sprawdzanie, "co" powinien robić system (funkcje) vs "jak dobrze" się zachowuje (atrybuty) — które typy testów to opisują?',
    a: [
      'Czarnoskrzynkowe vs białoskrzynkowe',
      'Funkcjonalne vs niefunkcjonalne',
      'Akceptacyjne vs systemowe',
      'Manualne vs automatyczne'
    ],
    correct: 1,
    expl: 'Sylabus 2.2.2: **funkcjonalne** = "co" — ocena funkcji (kompletność, poprawność, adekwatność funkcjonalna). **Niefunkcjonalne** = "jak dobrze" — atrybuty inne niż funkcje. Ortogonalne do podziału czarno-/białoskrzynkowe — niefunkcjonalne można robić techniką czarnoskrzynkową (load test) lub białoskrzynkową (profiling kodu).'
  },
  {
    id: 157, cat: 'cykl-wytwarzania',
    q: 'ISO/IEC 25010 wymienia 8 charakterystyk niefunkcjonalnych. Która z poniższych NIE jest tam wymieniona?',
    a: [
      'Wydajność działania (performance efficiency)',
      'Niezawodność',
      'Czytelność kodu',
      'Użyteczność (zdolność do interakcji)'
    ],
    correct: 2,
    expl: 'Sylabus 2.2.2 cytuje ISO/IEC 25010: **wydajność działania, kompatybilność, użyteczność, niezawodność, zabezpieczenia, utrzymywalność, przenaszalność (elastyczność), bezpieczeństwo**. Czytelność kodu to atrybut wewnętrznej jakości kodu, nie jest osobną charakterystyką w 25010 (mieści się w utrzymywalności, ale jako sub-charakterystyka).'
  },
  {
    id: 158, cat: 'cykl-wytwarzania',
    q: 'Test wyprowadzony z analizy struktury wewnętrznej kodu (np. pokrycie gałęzi) to:',
    a: [
      'Testowanie czarnoskrzynkowe',
      'Testowanie białoskrzynkowe',
      'Testowanie potwierdzające',
      'Testowanie eksploracyjne'
    ],
    correct: 1,
    expl: 'Sylabus 2.2.2: **białoskrzynkowe** (strukturalne) — wyprowadzane z implementacji/struktury wewnętrznej (kod, architektura, przepływy pracy/danych). Cel: pokrycie struktury bazowej. **Czarnoskrzynkowe** — ze specyfikacji, niezależnie od implementacji. Oba można stosować na każdym poziomie testów.'
  },
  {
    id: 159, cat: 'cykl-wytwarzania',
    q: 'Czym różni się testowanie potwierdzające od testowania regresji?',
    a: [
      'Potwierdzające = czy poprawka naprawiła konkretny defekt; regresji = czy zmiana nie zepsuła czegoś innego (w tym samym lub innych modułach/systemach)',
      'Potwierdzające jest manualne, regresji automatyczne — to jedyna różnica',
      'Oba to synonimy',
      'Potwierdzające wykonujemy raz, regresji nigdy'
    ],
    correct: 0,
    expl: 'Sylabus 2.2.3: **potwierdzające** (re-test) — sprawdzenie, czy zgłoszony defekt został usunięty. Wykonuje się przypadki, które wcześniej nie przeszły, ewentualnie nowe pokrywające zmianę. **Regresji** — sprawdzenie, czy zmiana (w tym poprawka) nie wprowadziła negatywnych konsekwencji w niezmienionych obszarach. Regresja może wykraczać poza przedmiot testów i powinna obejmować analizę wpływu.'
  },
  {
    id: 160, cat: 'cykl-wytwarzania',
    q: 'Dlaczego testowanie regresji świetnie nadaje się do automatyzacji?',
    a: [
      'Bo wymaga kreatywności',
      'Bo zestawy regresji są wykonywane wielokrotnie (każda iteracja, każde wydanie) i liczba przypadków rośnie z czasem — automatyzacja jest opłacalna',
      'Bo nie wymaga oczekiwanych rezultatów',
      'Bo defekty regresji są nieistotne'
    ],
    correct: 1,
    expl: 'Sylabus 2.2.3: regresja powtarza się wielokrotnie, baza testów regresji rośnie z każdym wydaniem → wysokie ROI z automatyzacji. Automatyzację regresji warto zacząć wcześnie. W DevOps regresja w CI/CD = szybkie wykrywanie, że nowa zmiana nie złamała wcześniejszej funkcjonalności. Może obejmować różne poziomy testów.'
  },
  {
    id: 161, cat: 'cykl-wytwarzania',
    q: 'Co to jest testowanie pielęgnacyjne (maintenance testing)?',
    a: [
      'Czyszczenie środowisk testowych',
      'Aktualizacja dokumentacji testowej',
      'Testowanie wykonywane po wdrożeniu/przekazaniu do eksploatacji — przy modyfikacjach, migracjach lub wycofaniu systemu, aby zweryfikować zmiany i wychwycić regresję',
      'Testowanie tylko poprawek dla bugów blokujących'
    ],
    correct: 2,
    expl: 'Sylabus 2.3: pielęgnacyjne wynika z wdrożenia oprogramowania i obejmuje testowanie w fazie eksploatacji — zarówno planowane (releases, fixy), jak i niezaplanowane (hot fix). Obejmuje sprawdzenie czy zmiana wprowadzona pomyślnie + wykrycie regresji w niezmienionej części systemu. Standard: ISO/IEC 14764.'
  },
  {
    id: 162, cat: 'cykl-wytwarzania',
    q: 'Jakie czynniki wpływają na zakres testowania pielęgnacyjnego?',
    a: [
      'Tylko budżet',
      'Tylko liczba testerów',
      'Poziom ryzyka związanego ze zmianą, wielkość dotychczasowego systemu, wielkość wprowadzonej zmiany',
      'Tylko czas wykonania'
    ],
    correct: 2,
    expl: 'Sylabus 2.3: zakres testów pielęgnacyjnych zależy od (1) ryzyka zmiany (poprawka security w bankowości > zmiana koloru przycisku), (2) wielkości istniejącego systemu (duży system = więcej obszarów na regresję), (3) skali zmiany (refaktor architektury vs literówka w UI). Przed wprowadzeniem zmiany robi się **analizę wpływu**.'
  },
  {
    id: 163, cat: 'cykl-wytwarzania',
    q: 'Które zdarzenia wyzwalają testowanie pielęgnacyjne wg sylabusa?',
    a: [
      'Tylko bug fixy',
      'Modyfikacje (planowane release, korekcyjne, hot fixy), uaktualnienia/migracje środowiska, wycofanie systemu (archiwizacja, odzyskiwanie danych)',
      'Tylko zmiany w prawie',
      'Tylko zmiany interfejsu użytkownika'
    ],
    correct: 1,
    expl: 'Sylabus 2.3 — 3 kategorie zdarzeń: (1) **modyfikacje** (planowane usprawnienia, korekcyjne, hot fixy), (2) **uaktualnienia/migracje środowiska** (zmiana platformy, migracja danych — testy konwersji), (3) **wycofanie** (testy archiwizacji, procedur przywracania/odtwarzania danych, jeśli muszą być przechowywane długo).'
  },

  // ===== CTFL ROZDZ. 3 — TESTOWANIE STATYCZNE (Sylabus v4.0.1) =====
  // Pokrywa LO FL-3.1.1 do FL-3.2.5

  {
    id: 164, cat: 'statyczne',
    q: 'Czym charakteryzuje się testowanie statyczne w przeciwieństwie do dynamicznego?',
    a: [
      'Wykonuje się je tylko w środowisku produkcyjnym',
      'Nie wymaga uruchamiania testowanego oprogramowania — ocena następuje przez przeglądy manualne lub analizę statyczną narzędziem',
      'Wymaga uruchomienia kodu i obserwacji zachowania',
      'Można je stosować wyłącznie do kodu źródłowego'
    ],
    correct: 1,
    expl: 'Sylabus 3.1: testowanie **statyczne** nie uruchamia oprogramowania — ocenia produkty pracy przez **przeglądy** (manualnie) lub **analizę statyczną** (narzędzia). Bada np. kod, specyfikacje, modele, plany testów. Realizuje zasadę wczesnego testowania (1.3). Często mniej pracochłonne niż dynamiczne, bo nie wymaga tworzenia przypadków testowych.'
  },
  {
    id: 165, cat: 'statyczne',
    q: 'Które z poniższych produktów pracy mogą być badane technikami testowania statycznego?',
    a: [
      'Tylko kod źródłowy',
      'Tylko wymagania',
      'Niemal wszystkie: wymagania, kod, plany testów, przypadki testowe, pozycje backlogu, karty opisu testów, dokumentacja projektu, umowy, modele',
      'Tylko działające oprogramowanie'
    ],
    correct: 2,
    expl: 'Sylabus 3.1.1: niemal każdy produkt pracy. **Przegląd**: dowolny czytelny dokument. **Analiza statyczna**: tylko to, co ma formalną składnię (kod, modele formalne, tekst strukturalny). NIE nadają się: kod 3rd party bez praw do analizy, prototypy bardzo trudne do zinterpretowania przez człowieka.'
  },
  {
    id: 166, cat: 'statyczne',
    q: 'Jakie są typowe korzyści z testowania statycznego?',
    a: [
      'Zastępuje testowanie dynamiczne',
      'Wykrywa defekty na wczesnym etapie (zmniejszenie kosztów naprawy), znajduje defekty trudne lub niemożliwe do wykrycia dynamicznie, buduje wspólne zrozumienie w zespole, usprawnia komunikację',
      'Zawsze jest tańsze niż dynamiczne',
      'Eliminuje potrzebę pisania przypadków testowych'
    ],
    correct: 1,
    expl: 'Sylabus 3.1.2: (1) wczesne wykrycie = mniejszy koszt naprawy, (2) defekty trudne dla dynamicznego (nieosiągalny kod, błędne wzorce projektowe, defekty w niewykonywalnych produktach), (3) ocena jakości i budowanie zaufania, (4) wspólny punkt widzenia interesariuszy, (5) usprawnienie komunikacji. Łączny koszt projektu zwykle niższy mimo kosztu przeglądów.'
  },
  {
    id: 167, cat: 'statyczne',
    q: 'Które defekty są ŁATWIEJSZE lub TAŃSZE do wykrycia testowaniem statycznym niż dynamicznym?',
    a: [
      'Wycieki pamięci pod obciążeniem produkcyjnym',
      'Problemy wydajności pod 1000 użytkowników',
      'Defekty w wymaganiach (niespójność, niejednoznaczność), defekty projektowe, niezadeklarowane zmienne, odchylenia od standardów nazewnictwa, niepoprawne specyfikacje interfejsów, luki w pokryciu testami',
      'Awarie hardware\'u'
    ],
    correct: 2,
    expl: 'Sylabus 3.1.3 — przykłady defektów dla testowania statycznego: defekty w wymaganiach (niespójność, sprzeczność, niejednoznaczność, przeoczenia), nieefektywne struktury danych, nieosiągalny kod, niezadeklarowane zmienne, niezgodność z konwencjami nazewnictwa, błędne specyfikacje interfejsów (typ/liczba/kolejność parametrów), słabe punkty zabezpieczeń (np. buffer overflow), luki w pokryciu kryteriów akceptacji.'
  },
  {
    id: 168, cat: 'statyczne',
    q: 'Która różnica między testowaniem statycznym a dynamicznym jest poprawna?',
    a: [
      'Statyczne wymaga uruchomienia kodu, dynamiczne nie',
      'Statyczne wykrywa defekty bezpośrednio; dynamiczne powoduje awarie, które potem są analizowane w celu znalezienia defektów',
      'Oba wymagają oczekiwanych rezultatów',
      'Statyczne stosuje się tylko do wykonywalnego kodu'
    ],
    correct: 1,
    expl: 'Sylabus 3.1.3: testowanie **statyczne** wykrywa defekty **bezpośrednio** w produkcie. Testowanie **dynamiczne** wywołuje **awarie** (manifestację defektów), które potem są analizowane (debugging) by zlokalizować defekt. Statyczne stosuje się do dowolnych produktów (w tym niewykonywalnych); dynamiczne — tylko do wykonywalnych. Statyczne mierzy charakterystyki niezależne od wykonania (czytelność, utrzymywalność).'
  },
  {
    id: 169, cat: 'statyczne',
    q: 'Dlaczego ważne jest otrzymywanie informacji zwrotnych od interesariuszy wcześnie i często?',
    a: [
      'Bo to wymóg ISO',
      'Pozwala wcześnie rozpoznać problemy z jakością, uniknąć kosztownych poprawek, zapobiec niespełnieniu oczekiwań, niedotrzymaniu terminów i potencjalnemu niepowodzeniu projektu',
      'Pozwala zwiększyć liczbę spotkań w projekcie',
      'Skraca tylko fazę testowania, ale wydłuża wytwarzanie'
    ],
    correct: 1,
    expl: 'Sylabus 3.2.1: jeśli interesariusze włączają się późno, finalny produkt może rozjechać się z ich wizją. Konsekwencje: kosztowne poprawki, niedotrzymanie terminów, przerzucanie odpowiedzialności, możliwe niepowodzenie całego projektu. Częsty feedback we wszystkich fazach pozwala zespołowi szybciej analizować zmiany i koncentrować się na priorytetach interesariuszy.'
  },
  {
    id: 170, cat: 'statyczne',
    q: 'Jakie są kolejne czynności procesu przeglądu wg standardu ISO/IEC 20246?',
    a: [
      'Planowanie → wykonanie → ukończenie',
      'Planowanie → rozpoczęcie przeglądu → przegląd indywidualny → przekazanie informacji i analiza → usunięcie defektów i raportowanie',
      'Inspekcja → przejrzenie → przegląd nieformalny',
      'Pisanie kodu → review → merge'
    ],
    correct: 1,
    expl: 'Sylabus 3.2.2 cytuje ISO/IEC 20246 — 5 czynności: (1) **Planowanie** (zakres, cel, kryteria wyjścia, ramy czasowe), (2) **Rozpoczęcie** (dostęp do materiałów, role, gotowość), (3) **Przegląd indywidualny** (każdy ocenia, notuje anomalie), (4) **Przekazanie informacji i analiza** (spotkanie, kwalifikacja anomalii, decyzje), (5) **Usunięcie defektów i raportowanie** (raport, kryteria wyjścia).'
  },
  {
    id: 171, cat: 'statyczne',
    q: 'Kto według sylabusa decyduje o tym, CO ma być przedmiotem przeglądu i udostępnia zasoby?',
    a: [
      'Autor',
      'Moderator',
      'Kierownik (manager)',
      'Protokolant'
    ],
    correct: 2,
    expl: 'Sylabus 3.2.3 wymienia 6 ról: **Kierownik** — decyduje co ma być przedmiotem, udostępnia zasoby, wyznacza ludzi, określa ramy czasowe. **Autor** — tworzy produkt, usuwa defekty. **Moderator/facylitator** — dba o spotkanie, mediuje. **Protokolant/rejestrujący** — gromadzi informacje o anomaliach. **Przeglądający** — wykonuje przegląd. **Lider przeglądu** — odpowiada za przegląd, decyduje kto bierze udział, gdzie i kiedy.'
  },
  {
    id: 172, cat: 'statyczne',
    q: 'Główną rolą moderatora (facylitatora) w przeglądzie jest:',
    a: [
      'Tworzenie produktu pracy i usuwanie defektów',
      'Dbanie o sprawny przebieg spotkania, mediacja, zarządzanie czasem i zapewnienie warunków, w których każdy uczestnik może swobodnie wyrażać zdanie',
      'Decydowanie o tym, co jest przedmiotem przeglądu',
      'Protokołowanie anomalii'
    ],
    correct: 1,
    expl: 'Sylabus 3.2.3: **moderator** dba o sprawny przebieg spotkania, jest mediatorem, zarządza czasem, zapewnia bezpieczne warunki dla wszystkich uczestników. Nie myl z **liderem przeglądu** (ogólna odpowiedzialność, decyduje kto, gdzie, kiedy) ani z **protokolantem** (zbiera notatki). W inspekcji moderator musi być osobą inną niż autor.'
  },
  {
    id: 173, cat: 'statyczne',
    q: 'Który typ przeglądu jest najbardziej formalny i obejmuje pełny proces wg ISO/IEC 20246?',
    a: [
      'Przegląd nieformalny',
      'Przejrzenie (walkthrough)',
      'Przegląd techniczny',
      'Inspekcja'
    ],
    correct: 3,
    expl: 'Sylabus 3.2.4 — od najmniej do najbardziej formalnego: **(1) Nieformalny** (brak procesu, brak dokumentacji), **(2) Przejrzenie** (prowadzony przez autora, edukacja + konsensus + ocena), **(3) Techniczny** (przeglądający to eksperci techniczni, moderator czuwa nad procesem), **(4) Inspekcja** — pełny proces, metryki do doskonalenia, autor NIE może być liderem ani protokolantem.'
  },
  {
    id: 174, cat: 'statyczne',
    q: 'Czym charakteryzuje się "przejrzenie" (walkthrough)?',
    a: [
      'Najbardziej formalny przegląd ze zbieraniem metryk',
      'Przegląd nieformalny bez dokumentacji wyników',
      'Przegląd prowadzony przez AUTORA produktu — może służyć ocenie jakości, edukacji przeglądających, osiągnięciu konsensusu, wygenerowaniu pomysłów, motywacji autorów do usprawnień, wykryciu anomalii',
      'Przegląd wyłącznie kodu wykonywany automatycznie'
    ],
    correct: 2,
    expl: 'Sylabus 3.2.4: **przejrzenie (walkthrough)** prowadzi **autor** — pokazuje produkt, prowadzi przez niego przeglądających. Cele: ocena jakości, wzrost zaufania, edukacja przeglądających, konsensus, generowanie pomysłów, motywacja do dalszych usprawnień, wykrycie anomalii. Przegląd indywidualny przed przejrzeniem jest możliwy, ale niekonieczny.'
  },
  {
    id: 175, cat: 'statyczne',
    q: 'Co odróżnia przegląd techniczny od inspekcji?',
    a: [
      'Przegląd techniczny jest bardziej formalny niż inspekcja',
      'Inspekcja jest bardziej formalna, prowadzona zgodnie z pełnym procesem, zbiera metryki do doskonalenia procesów; w inspekcji autor NIE może być liderem ani protokolantem',
      'Inspekcja jest mniej formalna',
      'W przeglądzie technicznym autor nie może uczestniczyć'
    ],
    correct: 1,
    expl: 'Sylabus 3.2.4: **przegląd techniczny** — eksperci techniczni jako przeglądający, moderator czuwa nad procesem, cele to konsensus techniczny, decyzje, ocena. **Inspekcja** — najbardziej formalna, pełny proces ISO/IEC 20246, zbiera **metryki** do doskonalenia cyklu wytwarzania, twarda zasada: autor NIE pełni roli lidera ani protokolanta (eliminacja stronniczości).'
  },
  {
    id: 176, cat: 'statyczne',
    q: 'Które stwierdzenie o czynnikach powodzenia przeglądu jest poprawne?',
    a: [
      'Ocena uczestników powinna być wprost jednym z celów przeglądu',
      'Przeglądowi sprzyjają: jasne cele i mierzalne kryteria wyjścia (NIE ocena uczestników!), dobór typu przeglądu, mniejsze partie materiału, czas na przygotowanie, wsparcie kierownictwa, kultura organizacyjna, szkolenia',
      'Przeglądy działają bez kultury i wsparcia kierownictwa',
      'Brak ram czasowych pozwala na lepszy przegląd'
    ],
    correct: 1,
    expl: 'Sylabus 3.2.5: czynniki sukcesu — (1) jasne cele i mierzalne kryteria wyjścia (uwaga: celem **NIE** powinna być ocena uczestników!), (2) dobór typu przeglądu pod kontekst, (3) mniejsze partie materiału (zapobiega utracie koncentracji), (4) przekazywanie informacji zwrotnych, (5) czas na przygotowanie, (6) wsparcie kierownictwa, (7) atmosfera nauki w kulturze, (8) przeszkolenie uczestników, (9) sprawny przebieg spotkań.'
  },
  {
    id: 177, cat: 'statyczne',
    q: 'Tester w fazie analizy backlog refinement w Scrumie kwestionuje wymaganie, prosi o doprecyzowanie i sprawdza, czy historyjka ma testowalne kryteria akceptacji. Jakie testowanie wykonuje?',
    a: [
      'Testowanie dynamiczne',
      'Testowanie statyczne — przegląd produktu pracy (historyjki użytkownika) w trakcie example mapping/refinement',
      'Testowanie regresji',
      'Testowanie akceptacyjne'
    ],
    correct: 1,
    expl: 'Sylabus 3.1: testowanie statyczne obejmuje też udział w sesjach **example mapping** i **backlog refinement** — testerzy używają technik przeglądu, by upewnić się że historyjki są kompletne, zrozumiałe, mają testowalne kryteria akceptacji (zgodne z Definition of Ready, 5.1.3). Zadawanie właściwych pytań to forma weryfikacji i walidacji **bez uruchamiania kodu**.'
  },

  // ===== CTFL ROZDZ. 4 — ANALIZA I PROJEKTOWANIE TESTÓW (Sylabus v4.0.1) =====
  // Pokrywa LO FL-4.1.1 do FL-4.5.3 (4 techniki BBT na poziomie K3 = stosować)

  {
    id: 178, cat: 'projektowanie',
    q: 'Czym różnią się czarnoskrzynkowe i białoskrzynkowe techniki testowania?',
    a: [
      'Czarnoskrzynkowe wymagają dostępu do kodu, białoskrzynkowe nie',
      'Czarnoskrzynkowe bazują na specyfikacji bez odwoływania się do struktury wewnętrznej; białoskrzynkowe analizują strukturę wewnętrzną (kod, architekturę, przepływy)',
      'Czarnoskrzynkowe są tylko dla testerów manualnych, białoskrzynkowe dla automatów',
      'Oba terminy są synonimami'
    ],
    correct: 1,
    expl: 'Sylabus 4.1: **BBT (czarnoskrzynkowe)** = oparte na specyfikacji — niezależne od implementacji, więc nadal działają po refaktorze. **WBT (białoskrzynkowe)** = oparte na strukturze — wykrywają defekty wynikające z implementacji, ale przeoczają defekty wynikające z braków w wymaganiach. **Doświadczenie** = wiedza testera, intuicja, znajomość typowych błędów.'
  },
  {
    id: 179, cat: 'projektowanie',
    q: 'Klasa równoważności to:',
    a: [
      'Grupa testów wykonywanych równolegle',
      'Zbiór wartości, które przedmiot testów powinien traktować w ten sam sposób — jeśli test jednej wartości wykrywa defekt, pozostałe też powinny',
      'Zbiór testów o tym samym priorytecie',
      'Grupa testerów o równych kompetencjach'
    ],
    correct: 1,
    expl: 'Sylabus 4.2.1: klasa równoważności (EP) = zbiór wartości przetwarzanych w ten sam sposób. Założenie: wystarczy jeden test per klasa. **Klasa poprawna** = wartości akceptowane (wg specyfikacji), **niepoprawna** = wartości odrzucane lub takie, dla których specyfikacja nie definiuje przetwarzania. Klasy nie mogą się nakładać ani być pustymi zbiorami.'
  },
  {
    id: 180, cat: 'projektowanie',
    q: 'Pole formularza akceptuje wiek 18–65 (liczby całkowite). Ile klas równoważności wyznaczasz?',
    a: [
      '1 klasa poprawna',
      '2 klasy: poprawna (18–65) i jedna niepoprawna',
      '3 klasy: poprawna (18–65), niepoprawna <18, niepoprawna >65',
      '4 klasy z każdą wartością osobno'
    ],
    correct: 2,
    expl: 'Sylabus 4.2.1: dla zakresu liczbowego wyznaczamy **3 klasy** — jedną poprawną (18–65) i dwie niepoprawne (poniżej dolnej granicy i powyżej górnej). 100% pokrycia EP = test każdej klasy przynajmniej raz, czyli np. wartości {25, 10, 80}. Jeśli pole ma wiele wejść (np. wiek + kraj), używamy pokrycia "each choice" — każda klasa każdego zbioru co najmniej raz.'
  },
  {
    id: 181, cat: 'projektowanie',
    q: 'Analiza wartości brzegowych (BVA) skupia się na wartościach brzegowych klas, ponieważ:',
    a: [
      'Programiści celowo umieszczają tam defekty',
      'Defekty często znajdują się tam, gdzie programiści zaimplementowali wartości brzegowe omyłkowo powyżej, poniżej zamierzonego położenia lub całkowicie je pominęli (off-by-one)',
      'Wartości brzegowe są łatwiejsze do wpisania',
      'Sylabus wymaga jej zastosowania zawsze'
    ],
    correct: 1,
    expl: 'Sylabus 4.2.2: BVA stosuje się **tylko do klas uporządkowanych** i opiera się na założeniu, że jeśli dwa elementy należą do tej samej klasy, to wszystkie wartości między nimi też. Programiści często popełniają błędy off-by-one na granicach: `>` zamiast `>=`, pętla `< n` zamiast `<= n`, źle ustawione minimum/maksimum.'
  },
  {
    id: 182, cat: 'projektowanie',
    q: 'Czym różni się dwupunktowa od trójpunktowej analizy wartości brzegowych?',
    a: [
      'Dwupunktowa: sama wartość brzegowa + najbliższa sąsiednia (z drugiej klasy). Trójpunktowa: wartość brzegowa + OBIE sąsiednie wartości',
      'Dwupunktowa wymaga 2 testów, trójpunktowa 6',
      'Dwupunktowa stosuje się tylko do liczb, trójpunktowa do tekstu',
      'Trójpunktowa jest mniej rygorystyczna'
    ],
    correct: 0,
    expl: 'Sylabus 4.2.2: **2-point** (Craig, Myers) — dla każdej brzegowej: sama wartość + najbliższa sąsiednia z sąsiedniej klasy. **3-point** (Koomen, O\'Regan) — wartość brzegowa + obie sąsiednie. 3-point jest **bardziej rygorystyczna**: wykryje defekt typu "if (x <= 10)" zaimplementowane jako "if (x == 10)" (2-point z x=10 i x=11 nie wykryje, 3-point z x=9 wykryje).'
  },
  {
    id: 183, cat: 'projektowanie',
    q: 'Specyfikacja: hasło 8–20 znaków. Jakie wartości testujesz w 2-point BVA?',
    a: [
      '{8, 20}',
      '{8, 14, 20}',
      '{7, 8} dla dolnej granicy i {20, 21} dla górnej',
      '{1, 50}'
    ],
    correct: 2,
    expl: 'Sylabus 4.2.2 — **dwupunktowa BVA**: dla każdej brzegowej 2 elementy = sama wartość + najbliższa z sąsiedniej klasy. Dolna granica 8: testujemy {7, 8}. Górna granica 20: testujemy {20, 21}. **Trójpunktowa** dla tego samego: {7, 8, 9, 19, 20, 21}. Wartości środkowe (np. 14) pokrywają klasę równoważności — to nie BVA, tylko EP.'
  },
  {
    id: 184, cat: 'projektowanie',
    q: 'Tablica decyzyjna jest najodpowiedniejszą techniką dla testowania:',
    a: [
      'Wartości brzegowych w polu liczbowym',
      'Złożonych reguł biznesowych — kombinacji warunków powodujących różne wyniki (np. rabaty zależne od kilku czynników, taryfy ubezpieczeniowe)',
      'Pojedynczego pola tekstowego',
      'Diagramu stanów aplikacji'
    ],
    correct: 1,
    expl: 'Sylabus 4.2.3: tablice decyzyjne służą do testowania **implementacji wymagań systemowych** opisujących, jak kombinacje warunków produkują różne wyniki. Idealne dla reguł biznesowych typu: "klient VIP + zamówienie >1000 PLN + płatność kartą = rabat 15%". Każda kolumna = reguła decyzyjna (unikalna kombinacja warunków + akcji).'
  },
  {
    id: 185, cat: 'projektowanie',
    q: 'Elementem pokrycia w testowaniu w oparciu o tablicę decyzyjną są:',
    a: [
      'Wiersze tablicy (warunki)',
      'Kolumny zawierające możliwe do spełnienia kombinacje warunków (reguły decyzyjne)',
      'Tylko kolumny z akcją "wykonaj"',
      'Wszystkie permutacje wartości warunków'
    ],
    correct: 1,
    expl: 'Sylabus 4.2.3: elementy pokrycia = **kolumny** (reguły decyzyjne). 100% pokrycia = sprawdzenie wszystkich kolumn zawierających możliwe kombinacje. Tablicę można uprościć: (1) usuwając kolumny z niemożliwymi kombinacjami, (2) scalając kolumny gdzie część warunków nie wpływa na wynik ("nd" = nie dotyczy). W ograniczonych tablicach warunki są boolowskie (P/F), w uogólnionych mogą mieć wiele wartości.'
  },
  {
    id: 186, cat: 'projektowanie',
    q: 'Czym różni się tablica stanów od diagramu stanów?',
    a: [
      'Tablica jest mniej formalna',
      'W przeciwieństwie do diagramu, tablica wyraźnie wskazuje niepoprawne przejścia (puste komórki) — wiersze to stany, kolumny to zdarzenia',
      'Diagram nie pokazuje przejść',
      'Tablica nie obsługuje warunków dozoru'
    ],
    correct: 1,
    expl: 'Sylabus 4.2.4: **diagram stanów** pokazuje stany i przejścia w formie graficznej (notacja "zdarzenie [dozór] / akcja"). **Tablica stanów** = wiersze (stany) × kolumny (zdarzenia), wpisy = stan docelowy + akcja. Kluczowa różnica: tablica **wyraźnie wskazuje niepoprawne przejścia** (puste komórki), które na diagramie są niewidoczne.'
  },
  {
    id: 187, cat: 'projektowanie',
    q: 'Sylabus wymienia 3 kryteria pokrycia testowania przejść między stanami. Które jest NAJSŁABSZE?',
    a: [
      'Pokrycie wszystkich poprawnych przejść',
      'Pokrycie wszystkich przejść (poprawnych i niepoprawnych)',
      'Pokrycie wszystkich stanów',
      'Pokrycie wszystkich zdarzeń'
    ],
    correct: 2,
    expl: 'Sylabus 4.2.4 — od najsłabszego do najsilniejszego: (1) **Pokrycie stanów** — odwiedzić każdy stan; (2) **Pokrycie poprawnych przejść / 0-switch** — wykonać każde poprawne przejście co najmniej raz (najczęściej stosowane); (3) **Pokrycie wszystkich przejść** — w tym próby niepoprawnych przejść. (3) jest najsilniejsze; wymaga się go dla systemów krytycznych/bezpieczeństwa. Pokrycie poprawnych przejść implikuje pokrycie stanów (ale nie odwrotnie).'
  },
  {
    id: 188, cat: 'projektowanie',
    q: 'Pokrycie instrukcji (statement coverage) to:',
    a: [
      'Sprawdzenie wszystkich instrukcji wykonywalnych co najmniej raz przez przypadki testowe',
      'Sprawdzenie tylko instrukcji deklarujących zmienne',
      'Sprawdzenie wszystkich przypadków testowych',
      'Pokrycie wszystkich linii kodu (w tym komentarzy)'
    ],
    correct: 0,
    expl: 'Sylabus 4.3.1: pokrycie instrukcji = stosunek wykonanych instrukcji wykonywalnych do wszystkich instrukcji wykonywalnych. 100% gwarantuje że każda instrukcja zawierająca defekt zostanie **wykonana**, co może (ale nie musi!) wywołać awarię. Ograniczenia: nie pokrywa wszystkich gałęzi decyzyjnych; defekty zależne od danych (np. dzielenie przez zero) wymagają konkretnych wartości.'
  },
  {
    id: 189, cat: 'projektowanie',
    q: 'Relacja między pokryciem instrukcji a pokryciem gałęzi jest następująca:',
    a: [
      'Są niezależne',
      'Pokrycie instrukcji implikuje pokrycie gałęzi',
      'Pokrycie gałęzi subsumuje pokrycie instrukcji (100% gałęzi → 100% instrukcji, ale nie odwrotnie)',
      'Oba kryteria są równoważne'
    ],
    correct: 2,
    expl: 'Sylabus 4.3.2: pokrycie gałęzi **subsumuje** pokrycie instrukcji — każdy zbiór testów dający 100% gałęzi daje też 100% instrukcji, ale **nie odwrotnie**. Przykład: `if (x > 0) doSomething();` — jeden test z x=5 da 100% instrukcji, ale tylko 50% gałęzi (brak przypadku x<=0). Dlatego pokrycie gałęzi jest silniejszym kryterium.'
  },
  {
    id: 190, cat: 'projektowanie',
    q: 'Dla kodu poniżej — ile minimalnie testów potrzeba do 100% pokrycia gałęzi?',
    a: [
      '1',
      '2',
      '3',
      '4'
    ],
    correct: 1,
    expl: 'Sylabus 4.3.2: gałąź = przepływ sterowania między dwoma wierzchołkami w grafie przepływu. `if (a > 0)` ma 2 gałęzie (true/false). 100% pokrycia gałęzi = oba wyniki decyzji wykonane. Wystarczą **2 testy**: jeden z a>0 (np. a=5) → wypisze "positive"; drugi z a<=0 (np. a=-3) → pomija. Pokrycie instrukcji byłoby już 100% przy 1 teście (a=5), ale gałęzi już nie.',
    code: 'function check(a) {\n  if (a > 0) {\n    console.log("positive");\n  }\n  return a;\n}'
  },
  {
    id: 191, cat: 'projektowanie',
    q: 'Główna zaleta białoskrzynkowych technik testowania to:',
    a: [
      'Są szybsze niż czarnoskrzynkowe',
      'Uwzględniają faktyczną implementację, co ułatwia wykrycie defektów nawet gdy specyfikacja jest nieaktualna, niejednoznaczna lub niekompletna; dostarczają obiektywnej miary pokrycia kodu',
      'Nie wymagają znajomości języka programowania',
      'Wykrywają defekty wynikające z braków w wymaganiach'
    ],
    correct: 1,
    expl: 'Sylabus 4.3.3: **zalety** WBT — (1) testowanie uwzględnia całą implementację, więc znajdzie defekty których specyfikacja nie opisuje, (2) obiektywne miary pokrycia (statement, branch). **Wada**: jeśli wymaganie nie zostało w ogóle zaimplementowane, WBT tego nie wykryje (potrzebne BBT/przeglądy). WBT można też stosować statycznie — np. dry-run pseudokodu przed uruchomieniem.'
  },
  {
    id: 192, cat: 'projektowanie',
    q: 'Czym jest "zgadywanie błędów" jako technika testowania?',
    a: [
      'Losowe wpisywanie wartości w nadziei na crash',
      'Technika oparta na doświadczeniu: przewidywanie błędów, defektów i awarii na podstawie wiedzy testera o aplikacji, typowych pomyłkach programistów i awariach w podobnych systemach',
      'Wyłącznie testowanie wartości NULL i pustych stringów',
      'Generowanie danych testowych algorytmem AI'
    ],
    correct: 1,
    expl: 'Sylabus 4.4.1: **zgadywanie błędów** to systematyczna technika oparta na doświadczeniu. Bazuje na wiedzy o: typowych defektach (NULL, empty, off-by-one, granice typów), wcześniejszych awariach w aplikacji, błędach typowych dla programistów. **Ataki usterek** (Whittaker) to formalizacja: lista potencjalnych defektów + testy ich wywołania. Często odkrywa defekty pomijane przez BBT/WBT.'
  },
  {
    id: 193, cat: 'projektowanie',
    q: 'Testowanie eksploracyjne polega na:',
    a: [
      'Wykonywaniu testów wg z góry przygotowanego skryptu',
      'Równoczesnym projektowaniu, wykonywaniu i ocenie testów w czasie, gdy tester zapoznaje się z przedmiotem testów',
      'Wyłącznie testowaniu UI',
      'Pisaniu testów automatycznych'
    ],
    correct: 1,
    expl: 'Sylabus 4.4.2: eksploracyjne = projektowanie + wykonywanie + ocena **równocześnie**, w trakcie zapoznawania się z przedmiotem testów. Często organizowane jako **testowanie w sesjach (session-based)**: określony czas, **karta opisu testu (charter)** określająca cele, raport sesji. Przydatne gdy: specyfikacje są niepełne, jest presja czasu, jako uzupełnienie testów formalnych.'
  },
  {
    id: 194, cat: 'projektowanie',
    q: 'Testowanie w oparciu o listę kontrolną — które stwierdzenie jest poprawne?',
    a: [
      'Listy kontrolne zastępują przypadki testowe i nie wymagają aktualizacji',
      'Elementy listy są często formułowane jako pytania; listy nie powinny zawierać elementów łatwych do automatycznego sprawdzenia ani zbyt ogólnych; trzeba je regularnie aktualizować ale nie pozwolić im zbytnio rozrastać się',
      'Lista kontrolna jest formalniejsza od inspekcji',
      'Można jej używać tylko do testów niefunkcjonalnych'
    ],
    correct: 1,
    expl: 'Sylabus 4.4.3: dobre listy kontrolne mają elementy w formie pytań możliwych do sprawdzenia pojedynczo, NIE są zbyt ogólne ani łatwe do automatyzacji, są aktualizowane (bo programiści uczą się unikać starych pomyłek = "zużycie" pestycydów). Przykład: 10 heurystyk użyteczności Nielsena (1994). Daje pewien stopień spójności testowania, ale dopuszcza zmienność wykonania.'
  },
  {
    id: 195, cat: 'projektowanie',
    q: 'Co oznacza "3C" w kontekście historyjki użytkownika (Jeffries)?',
    a: [
      'Code, Compile, Commit',
      'Card (karta z opisem), Conversation (rozmowa o tym jak będzie używane), Confirmation (kryteria akceptacji)',
      'Customer, Contract, Communication',
      'Concept, Creation, Completion'
    ],
    correct: 1,
    expl: 'Sylabus 4.5.1 (Jeffries 2000): **3 C** historyjki — (1) **Card** — nośnik z krótkim opisem, (2) **Conversation** — rozmowa wyjaśniająca jak oprogramowanie będzie używane (udokumentowana lub słowna), (3) **Confirmation** — kryteria akceptacji. Forma historyjki: "Jako [rola] chcę [cel] aby [wartość biznesowa]". Dobre historyjki spełniają **INVEST** — Independent, Negotiable, Valuable, Estimable, Small, Testable.'
  },
  {
    id: 196, cat: 'projektowanie',
    q: 'Akronim INVEST opisuje cechy dobrej historyjki użytkownika. Co oznacza "T"?',
    a: [
      'Tracked',
      'Testable (testowalna)',
      'Timeboxed',
      'Templated'
    ],
    correct: 1,
    expl: 'Sylabus 4.5.1 (Wake 2003): **INVEST** = **I**ndependent (niezależna od innych), **N**egotiable (negocjowalna), **V**aluable (wartościowa dla użytkownika), **E**stimable (oszacowalna), **S**mall (zwięzła, mieści się w iteracji), **T**estable (testowalna). Jeśli historyjka jest "nie do przetestowania", to znak, że jest niejednoznaczna, niekompletna lub nie odzwierciedla rzeczywistej potrzeby interesariusza.'
  },
  {
    id: 197, cat: 'projektowanie',
    q: 'Sylabus wymienia 2 najpopularniejsze formaty kryteriów akceptacji. Które?',
    a: [
      'Format JSON i XML',
      'Format ukierunkowany na scenariusze (np. Given/When/Then) i format ukierunkowany na reguły (lista weryfikacyjna w punktach lub tabelaryczna)',
      'Markdown i plain text',
      'UML i BPMN'
    ],
    correct: 1,
    expl: 'Sylabus 4.5.2: **scenariuszowy** (np. Given/When/Then z BDD, sekcja 2.1.3) — opisuje przykłady zachowań. **Regułowy** — lista warunków/wymagań do spełnienia w punktach lub tabeli (np. mapowanie wejść na oczekiwane wyjścia). Zespoły mogą używać innych formatów pod warunkiem że kryteria są **zdefiniowane i jednoznaczne**.'
  },
  {
    id: 198, cat: 'projektowanie',
    q: 'Jaki jest cel kryteriów akceptacji historyjki użytkownika?',
    a: [
      'Tylko formalność dla product ownera',
      'Określenie zakresu historyjki, osiągnięcie konsensusu wśród interesariuszy, opisanie scenariuszy pozytywnych i negatywnych, podstawa dla testów akceptacyjnych, umożliwienie dokładnego planowania i szacowania',
      'Zastąpienie przypadków testowych',
      'Wyłącznie dokumentacja po wdrożeniu'
    ],
    correct: 1,
    expl: 'Sylabus 4.5.2 wymienia 5 celów: (1) określenie zakresu historyjki (gdzie kończy się ta historyjka, a zaczyna kolejna), (2) konsensus wśród interesariuszy, (3) scenariusze pozytywne **i negatywne**, (4) podstawa dla testów akceptacyjnych (sekcja 4.5.3 — ATDD), (5) precyzyjne planowanie i szacowanie. Powstają zwykle w wyniku **rozmowy** (Conversation z 3C).'
  },
  {
    id: 199, cat: 'projektowanie',
    q: 'Czym jest ATDD (Acceptance Test-Driven Development)?',
    a: [
      'Pisanie testów modułowych przed kodem (to TDD)',
      'Podejście typu "najpierw test": testy akceptacyjne tworzone są przed zaimplementowaniem historyjki, przez członków zespołu z różnych perspektyw (klient, programista, tester); ukierunkowane historyjką użytkownika',
      'Automatyzacja regresji po wdrożeniu',
      'Testowanie akceptacyjne wykonywane wyłącznie przez użytkowników końcowych'
    ],
    correct: 1,
    expl: 'Sylabus 4.5.3 (Adzic 2009): ATDD = "najpierw test" akceptacyjny. Proces: (1) **warsztaty tworzenia specyfikacji** — zespół analizuje historyjkę i AC, koryguje niejasności, (2) **tworzenie przypadków testowych** wg AC (cały zespół lub indywidualnie tester), (3) implementacja kodu który ma przejść testy. Testy traktowane jako "przykłady sposobu działania". Można je automatyzować → **wykonywalne wymagania**.'
  },
  {
    id: 200, cat: 'projektowanie',
    q: 'Jakie przypadki testowe powinny powstać w procesie ATDD?',
    a: [
      'Tylko pozytywne — sprawdzenie szczęśliwej ścieżki',
      'Tylko negatywne — sprawdzenie obsługi błędów',
      'Pierwsze pozytywne (sprawdzenie poprawnej ścieżki bez błędów), potem negatywne, na końcu pokrycie niefunkcjonalnych charakterystyk jakościowych (np. wydajność, użyteczność)',
      'Wyłącznie testy automatyczne'
    ],
    correct: 2,
    expl: 'Sylabus 4.5.3: pierwsze testy = **pozytywne** (potwierdzenie prawidłowego zachowania w "szczęśliwej ścieżce"). Potem **negatywne** (błędy, wyjątki, walidacja). Na końcu **niefunkcjonalne** (wydajność, użyteczność, bezpieczeństwo). Testy muszą pokrywać wszystkie charakterystyki historyjki, ale **nie wykraczać poza jej zakres**. Unikać duplikatów (dwóch testów na tę samą charakterystykę).'
  },
  {
    id: 201, cat: 'projektowanie',
    q: 'Pokrycie EP zwane "each choice" (każdy wybór) wymaga aby:',
    a: [
      'Wszystkie kombinacje klas wszystkich zbiorów zostały sprawdzone',
      'Każda klasa z każdego zbioru klas (parametru) została sprawdzona co najmniej raz, niezależnie od kombinacji',
      'Tylko klasy poprawne zostały sprawdzone',
      'Każda wartość brzegowa była sprawdzona'
    ],
    correct: 1,
    expl: 'Sylabus 4.2.1 (Ammann 2016): w wielu parametrach mamy kilka zbiorów klas (np. wiek × kraj × płeć). **Each choice** = każda klasa każdego zbioru pokryta przynajmniej raz, **bez wymagania kombinacji**. Najprostsze kryterium — daje znacznie mniej testów niż "all combinations". Przykład: 3 klasy wieku × 4 kraje × 2 płci → minimum 4 testy (max(3,4,2)), nie 24.'
  },
  {
    id: 202, cat: 'projektowanie',
    q: 'Decyzja `if (x <= 10)` została omyłkowo zaimplementowana jako `if (x == 10)`. Która technika BVA wykryje ten defekt?',
    a: [
      'Tylko dwupunktowa BVA (testy 10 i 11)',
      'Trójpunktowa BVA — z wartością x=9 (sąsiednia z drugiej strony) wykryje, że dla x=9 system zachowa się błędnie',
      'Żadna BVA nie wykryje tego defektu',
      'Pokrycie instrukcji wystarczy'
    ],
    correct: 1,
    expl: 'Sylabus 4.2.2 — klasyczny przykład z sylabusa. **2-point** dla granicy 10: testuje {10, 11}. Dla x=10: obie wersje zwracają true → defekt niewykryty. Dla x=11: obie zwracają false → niewykryty. **3-point**: testuje {9, 10, 11}. Dla x=9: poprawna wersja `<=10` zwraca true, błędna `==10` zwraca false → **wykrywa!** Dlatego 3-point jest rygorystyczniejsza.'
  },
  {
    id: 203, cat: 'projektowanie',
    q: 'System logowania: stan "Wylogowany" → po podaniu loginu/hasła → "Zalogowany" → po 30 min nieaktywności → "Wylogowany". Próba dostępu w stanie "Zalogowany" do panelu admin = przejście do "Panel admin". Które kryterium pokrycia jest najczęściej zalecane jako "domyślne" w sylabusie?',
    a: [
      'Pokrycie wszystkich stanów',
      'Pokrycie poprawnych przejść (0-switch)',
      'Pokrycie wszystkich przejść (w tym niepoprawnych)',
      'Pokrycie wszystkich zdarzeń'
    ],
    correct: 1,
    expl: 'Sylabus 4.2.4: **pokrycie poprawnych przejść** (0-switch coverage) — wykonać każde poprawne przejście co najmniej raz — jest **najczęściej stosowanym** kryterium, bo daje rozsądny balans (implikuje pokrycie wszystkich stanów). **Pokrycie wszystkich przejść** (w tym niepoprawnych, np. próba przejścia do "Panel admin" gdy jesteś wylogowany) zalecane dla systemów krytycznych/bezpieczeństwa.'
  },

  // ===== CTFL ROZDZ. 5 — ZARZĄDZANIE CZYNNOŚCIAMI TESTOWYMI (Sylabus v4.0.1) =====
  // Pokrywa LO FL-5.1.1 do FL-5.5.1

  {
    id: 204, cat: 'zarzadzanie',
    q: 'Jaki jest główny cel planu testów?',
    a: [
      'Wyłącznie spełnienie wymogu formalnego/audytu',
      'Udokumentować sposób i harmonogram osiągania celów testów, zapewnić zgodność czynności z kryteriami, umożliwić wymianę informacji z interesariuszami, wykazać zgodność z polityką testów',
      'Zastąpić strategię testów',
      'Lista przypadków testowych do wykonania'
    ],
    correct: 1,
    expl: 'Sylabus 5.1.1: plan testów (1) dokumentuje sposób i harmonogram osiągania celów, (2) gwarantuje że czynności spełnią kryteria, (3) służy wymianie informacji z zespołem i interesariuszami, (4) wykazuje zgodność z polityką/strategią testów (lub uzasadnia odstępstwa). Sam proces planowania zmusza testerów do przemyślenia ryzyk, harmonogramów, kosztów. Szczegóły: ISO/IEC/IEEE 29119-3.'
  },
  {
    id: 205, cat: 'zarzadzanie',
    q: 'Które zagadnienie NIE jest typowo poruszane w planie testów?',
    a: [
      'Kontekst testowania (zakres, cele, podstawa testów)',
      'Rejestr ryzyk i podejście do testowania',
      'Kryteria wejścia/wyjścia, budżet, harmonogram',
      'Szczegółowy kod implementacji testowanych funkcji'
    ],
    correct: 3,
    expl: 'Sylabus 5.1.1: plan testów zawiera kontekst, założenia i ograniczenia, interesariuszy, formy wymiany informacji, rejestr ryzyk, **podejście do testowania** (poziomy, typy, techniki, kryteria wejścia/wyjścia, metryki, wymogi dot. danych i środowiska), budżet, harmonogram. Implementacja funkcjonalności należy do dokumentacji deweloperskiej, NIE do planu testów.'
  },
  {
    id: 206, cat: 'zarzadzanie',
    q: 'Jak różni się wkład testera w planowanie wydań od planowania iteracji w cyklu zwinnym?',
    a: [
      'Tester uczestniczy tylko w planowaniu wydań',
      'W planowaniu wydań: pomoc w pisaniu historyjek, analiza ryzyka projektowego/produktowego, szacowanie pracochłonności na poziomie wydań. W planowaniu iteracji: szczegółowa analiza ryzyka, dzielenie historyjek na zadania testowe, doprecyzowanie aspektów funkcjonalnych/niefunkcjonalnych',
      'Wkład w obu jest identyczny',
      'Tester nie uczestniczy w planowaniu — to praca PO/SM'
    ],
    correct: 1,
    expl: 'Sylabus 5.1.2: **planowanie wydań** (release planning) — perspektywa wprowadzenia produktu do eksploatacji, definiowanie backlogu produktu, dzielenie dużych historyjek. Tester: pomaga pisać historyjki + AC, analizuje ryzyko, szacuje testy. **Planowanie iteracji** — perspektywa zakończenia jednej iteracji. Tester: szczegółowa analiza ryzyka, dzieli historyjki na zadania testowe, doprecyzowuje aspekty funkcjonalne/niefunkcjonalne.'
  },
  {
    id: 207, cat: 'zarzadzanie',
    q: 'Czym różnią się kryteria wejścia od kryteriów wyjścia?',
    a: [
      'Kryteria wejścia = warunki PRZED rozpoczęciem czynności (np. dostępne środowisko, testowalne wymagania); kryteria wyjścia = warunki uznania czynności za zakończoną (pokrycie, brak defektów krytycznych, zaliczenie testów dymnych)',
      'Wejścia stosuje się tylko w waterfall, wyjścia w agile',
      'Wejścia to to samo co wyjścia',
      'Wejścia opisują testerów, wyjścia narzędzia'
    ],
    correct: 0,
    expl: 'Sylabus 5.1.3: **Wejścia (entry criteria)** — warunki wstępne, bez których czynność trudna/kosztowna/ryzykowna: dostępność zasobów, testowalna podstawa testów, początkowa jakość (testy dymne OK). **Wyjścia (exit criteria)** — warunki uznania czynności za skończoną: miary (pokrycie, gęstość defektów) + binarne tak/nie (wszystkie defekty zgłoszone). Przekroczenie terminu/budżetu też może być uznane za wyjście, jeśli interesariusze akceptują ryzyko.'
  },
  {
    id: 208, cat: 'zarzadzanie',
    q: 'W modelu zwinnym kryteria wyjścia nazywane są:',
    a: [
      'Definition of Ready (DoR)',
      'Definition of Done (DoD)',
      'Definition of Goals',
      'Acceptance Criteria'
    ],
    correct: 1,
    expl: 'Sylabus 5.1.3: w zwinnym **kryteria wyjścia = Definition of Done (DoD)** — obiektywne metryki uznania elementu za nadający się do przekazania do eksploatacji. **Kryteria wejścia = Definition of Ready (DoR)** — historyjka musi je spełnić, by rozpocząć prace programistyczne i czynności testowe. AC (Acceptance Criteria) to coś innego — warunki akceptacji konkretnej historyjki (sylabus 4.5.2).'
  },
  {
    id: 209, cat: 'zarzadzanie',
    q: 'Sylabus wymienia 4 techniki szacowania pracochłonności testów. Które?',
    a: [
      'Story points, T-shirt sizes, planning poker, magic estimation',
      'Szacowanie na podstawie proporcji, ekstrapolacja, szerokopasmowa technika delficka, szacowanie trójpunktowe',
      'Waterfall, agile, hybrid, devops',
      'Top-down, bottom-up, sideways, diagonal'
    ],
    correct: 1,
    expl: 'Sylabus 5.1.4 — 4 techniki: (1) **Proporcji** — używa proporcji z historycznych projektów (np. dev:test 3:2), (2) **Ekstrapolacja** — pomiary z wczesnych iteracji ekstrapolowane na kolejne, (3) **Szerokopasmowa delficka** — eksperci szacują niezależnie, omawiają odchylenia, powtarzają do konsensusu (wariant: poker planistyczny), (4) **Trójpunktowa** — optymistyczne/prawdopodobne/pesymistyczne, ważona średnia.'
  },
  {
    id: 210, cat: 'zarzadzanie',
    q: 'Szacowanie trójpunktowe: a=6 osobogodzin (optymistycznie), m=9 (prawdopodobnie), b=18 (pesymistycznie). Jaki jest szacunkowy nakład pracy E i odchylenie standardowe SD?',
    a: [
      'E = 11, SD = 2',
      'E = 10, SD = 2',
      'E = 9, SD = 12',
      'E = 33, SD = 6'
    ],
    correct: 1,
    expl: 'Sylabus 5.1.4 (przykład wprost z sylabusa): wzór **E = (a + 4m + b) / 6** = (6 + 36 + 18) / 6 = 60/6 = **10**. **SD = (b − a) / 6** = (18 − 6) / 6 = **2**. Wynik: 10 ± 2 osobogodzin (czyli zakres 8–12). Zaleta trójpunktowej: oprócz wartości otrzymujemy błąd pomiaru.'
  },
  {
    id: 211, cat: 'zarzadzanie',
    q: 'Sylabus opisuje 3 strategie ustalania priorytetów przypadków testowych. Które?',
    a: [
      'Ryzyko, pokrycie, wymagania',
      'Pieniądze, czas, ludzie',
      'Severity, priority, status',
      'Manualne, automatyczne, eksploracyjne'
    ],
    correct: 0,
    expl: 'Sylabus 5.1.5: (1) **Na podstawie ryzyka** — pierwszeństwo dla testów pokrywających najważniejsze ryzyka (5.2.3), (2) **Na podstawie pokrycia** — najpierw przypadki dające największe pokrycie (lub największe dodatkowe pokrycie), (3) **Na podstawie wymagań** — kolejność wynika z priorytetów wymagań nadanych przez interesariuszy. Praktyka: uwzględnić też zależności (test wyższego priorytetu może wymagać niższego priorytetu) i dostępność zasobów.'
  },
  {
    id: 212, cat: 'zarzadzanie',
    q: 'Piramida testów (Cohn 2009) ilustruje:',
    a: [
      'Hierarchię testerów w organizacji',
      'Fakt, że różne testy mają różną szczegółowość — im wyższa warstwa, tym niższy poziom izolacji i dłuższy czas wykonania; w dolnych warstwach jest dużo małych, szybkich testów, w górnych — mało dużych, kompleksowych',
      'Liczbę bugów na poziom',
      'Koszt licencji narzędzi'
    ],
    correct: 1,
    expl: 'Sylabus 5.1.6 (Cohn 2009): piramida pomaga w automatyzacji i estymacji. **Niskie warstwy** = dużo testów małych, szybkich, izolowanych (jednostki) — sprawdzają małe fragmenty. **Wysokie warstwy** = mało testów dużych, kompleksowych, długich (end-to-end). Klasyczny Cohn: testy modułowe / testy usług / testy interfejsu użytkownika. Inne warianty: modułowe / integracji / end-to-end.'
  },
  {
    id: 213, cat: 'zarzadzanie',
    q: 'Kwadranty testowe (Marick) klasyfikują testy po dwóch osiach. Które?',
    a: [
      'Manualne vs automatyczne; szybkie vs wolne',
      'Cel: technologiczny vs biznesowy; wsparcie zespołu vs krytyka produktu',
      'Funkcjonalne vs niefunkcjonalne; statyczne vs dynamiczne',
      'Pozytywne vs negatywne; modułowe vs systemowe'
    ],
    correct: 1,
    expl: 'Sylabus 5.1.7 (Marick 2003, Crispin 2008): osie to **cel** (technologiczny ↔ biznesowy) i **rola** (wsparcie zespołu ↔ krytyka produktu). **Q1** (tech + wsparcie) — modułowe, integracji modułów, automatyczne w CI. **Q2** (biznes + wsparcie) — funkcjonalne, AC, API, prototypy UX. **Q3** (biznes + krytyka) — eksploracyjne, użyteczność, UAT, manualne. **Q4** (tech + krytyka) — niefunkcjonalne, dymne, automatyczne.'
  },
  {
    id: 214, cat: 'zarzadzanie',
    q: 'Czym jest ryzyko w testowaniu i jakie parametry je charakteryzują?',
    a: [
      'Każdy defekt znaleziony w produkcji',
      'Potencjalne zdarzenie/sytuacja powodująca niekorzystny skutek; charakteryzowane przez prawdopodobieństwo (>0, <1) i wpływ (szkodę)',
      'Liczba bugów otwartych',
      'Procent niezautomatyzowanych testów'
    ],
    correct: 1,
    expl: 'Sylabus 5.2.1: **ryzyko** = potencjalne zdarzenie/sytuacja powodująca niekorzystny skutek. Dwa parametry: (1) **prawdopodobieństwo** (większe niż 0, mniejsze niż 1 — jeśli 0 lub 1, to nie jest ryzyko tylko brak/pewność), (2) **wpływ** (szkoda, konsekwencja). **Poziom ryzyka** = miara wielkości, im wyższy tym ważniejsze działania zaradcze.'
  },
  {
    id: 215, cat: 'zarzadzanie',
    q: 'Sylabus wyróżnia 2 typy ryzyk istotnych dla testowania. Które przykłady pasują do RYZYK PROJEKTOWYCH?',
    a: [
      'Brakujące elementy funkcjonalności, niepoprawne obliczenia, awarie podczas wykonywania, słabe UX',
      'Niedokładne oszacowania, konflikty kadrowe, niedostarczenie elementu przez dostawcę, niewystarczające umiejętności zespołu',
      'Buffer overflow, SQL injection, XSS',
      'Wszystkie defekty w UI'
    ],
    correct: 1,
    expl: 'Sylabus 5.2.2: **Ryzyka projektowe** dotyczą zarządzania projektem — organizacyjne (opóźnienia, cięcia budżetu, oszacowania), kadrowe (umiejętności, konflikty, braki), techniczne (rozszerzenie zakresu, narzędzia), dostawców (upadłość, niedostarczenie). Wpływ na harmonogram/budżet/zakres. **Ryzyka produktowe** = charakterystyki jakościowe produktu (ISO 25010): brak funkcji, błędne obliczenia, awarie, UX, security.'
  },
  {
    id: 216, cat: 'zarzadzanie',
    q: 'Co obejmuje analiza ryzyka produktowego z perspektywy testowania?',
    a: [
      'Wyłącznie znalezienie wszystkich defektów',
      'Identyfikacja ryzyka (wyczerpująca lista przez warsztaty/burze mózgów/wywiady/diagramy przyczynowo-skutkowe) + ocena ryzyka (klasyfikacja, prawdopodobieństwo, wpływ, priorytet, sposoby postępowania)',
      'Tylko ocena ilościowa z pomnożeniem prawdopodobieństwa i wpływu',
      'Wyłącznie wybór narzędzi testowych'
    ],
    correct: 1,
    expl: 'Sylabus 5.2.3: analiza ryzyka produktowego = **identyfikacja** (wyczerpująca lista, techniki: burza mózgów, warsztaty, wywiady, diagramy Ishikawy) + **ocena** (klasyfikacja, prawdopodobieństwo, wpływ, priorytet, sposoby postępowania). Ocena może być: **ilościowa** (P × I), **jakościowa** (matryca ryzyka), **mieszana**. Wcześnie w cyklu, by zminimalizować ryzyko rezydualne.'
  },
  {
    id: 217, cat: 'zarzadzanie',
    q: 'Wyniki analizy ryzyka produktowego są wykorzystywane do:',
    a: [
      'Wyłącznie określenia liczby testerów',
      'Określenia zakresu testów, poziomów/typów testów, technik i pokrycia, oszacowania pracochłonności, ustalania priorytetów, decyzji o czynnościach poza testowaniem',
      'Tylko wyboru języka programowania',
      'Wyłącznie liczby przypadków testowych'
    ],
    correct: 1,
    expl: 'Sylabus 5.2.3 wymienia 6 zastosowań: (1) określenie **zakresu** testów, (2) ustalenie **poziomów i typów** testów, (3) wskazanie **technik i pokrycia**, (4) **oszacowanie pracochłonności** per zadanie, (5) **priorytetyzacja** dla wczesnego wykrycia defektów krytycznych, (6) decyzja czy potrzebne są dodatkowe czynności (np. dodatkowe przeglądy, audyty bezpieczeństwa) poza samym testowaniem.'
  },
  {
    id: 218, cat: 'zarzadzanie',
    q: 'Które działania można podjąć w celu ŁAGODZENIA ryzyka produktowego poprzez testowanie?',
    a: [
      'Wytypowanie testerów o właściwym doświadczeniu, zapewnienie niezależności testowania, przeglądy i analiza statyczna, dobór technik i poziomów pokrycia, dobór typów testów (charakterystyki ryzykowne), testowanie dynamiczne w tym regresji',
      'Tylko zwiększenie liczby testerów',
      'Wyłącznie pisanie większej liczby raportów',
      'Akceptacja każdego ryzyka bez działań'
    ],
    correct: 0,
    expl: 'Sylabus 5.2.4: środki łagodzenia ryzyka przez testowanie (1) wytypowanie testerów z odpowiednim doświadczeniem, (2) niezależność testowania, (3) przeglądy + analiza statyczna, (4) odpowiednie techniki testowania + poziomy pokrycia, (5) odpowiednie typy testów dotyczące ryzykownych charakterystyk jakościowych, (6) dynamiczne + regresja. Poza testowaniem są też inne opcje: akceptacja ryzyka, przeniesienie, plany awaryjne (Veenendaal 2012).'
  },
  {
    id: 219, cat: 'zarzadzanie',
    q: 'Sylabus wymienia 6 kategorii metryk w testowaniu. Która z poniższych NIE jest jedną z nich?',
    a: [
      'Metryki postępu projektu (ukończenie zadań, użycie zasobów, pracochłonność)',
      'Metryki postępu testów (postęp implementacji testów, środowiska, wykonane/niewykonane)',
      'Metryki jakości produktu (dostępność, czas odpowiedzi, MTBF)',
      'Metryki satysfakcji testerów w skali 1-10'
    ],
    correct: 3,
    expl: 'Sylabus 5.3.1 — 6 grup metryk: (1) **postęp projektu** (ukończenie zadań, użycie zasobów), (2) **postęp testów** (postęp implementacji, środowiska, liczba/status przypadków, czas wykonywania), (3) **jakość produktu** (dostępność, czas odpowiedzi, MTBF), (4) **defekty** (liczba, priorytety, gęstość, odsetek wykrytych), (5) **ryzyko** (ryzyko rezydualne), (6) **pokrycie** (wymagań, kodu), oraz (7) **koszty**. Satysfakcji testerów sylabus nie wymienia.'
  },
  {
    id: 220, cat: 'zarzadzanie',
    q: 'Czym różnią się raport o postępie testów i sumaryczny raport z testów?',
    a: [
      'Sumaryczny jest krótszy',
      'Raport o postępie: sporządzany regularnie (codziennie/tygodniowo), bieżące informacje dla nadzoru. Sumaryczny: po zakończeniu testowania danego poziomu/iteracji/projektu, ocena jakości wg pierwotnego planu, odstępstwa, niezłagodzone ryzyka, wnioski (lessons learned)',
      'Sumaryczny pisze tester, postępu kierownik',
      'Postępu jest tylko ustny, sumaryczny tylko pisemny'
    ],
    correct: 1,
    expl: 'Sylabus 5.3.2: **Raport o postępie** (test progress) — regularny, dla bieżącego nadzoru. Zawiera: okres, postęp + odchylenia, utrudnienia, metryki, nowe/zmienione ryzyka, plany na kolejny okres. **Sumaryczny** (summary report) — na koniec poziomu/iteracji/projektu. Zawiera: ocena jakości wg planu i kryteriów wyjścia, odstępstwa, utrudnienia, metryki, niezłagodzone ryzyka, nieusunięte defekty, **lessons learned**. Szablony: ISO/IEC/IEEE 29119-3.'
  },
  {
    id: 221, cat: 'zarzadzanie',
    q: 'Które z poniższych są sposobami przekazywania informacji o statusie testowania?',
    a: [
      'Wyłącznie formalne raporty PDF',
      'Słowna wymiana informacji, tablice wskaźników (dashboardy CI/CD, burndown), kanały elektroniczne (email/chat), dokumentacja elektroniczna, formalne raporty z testów',
      'Tylko spotkania zespołu',
      'Tylko tablice Kanban'
    ],
    correct: 1,
    expl: 'Sylabus 5.3.3: dostępne opcje — (1) słowna wymiana (najczęściej w obrębie zespołu), (2) dashboardy (CI/CD, burndown, tablice zadań), (3) komunikacja elektroniczna (email, chat), (4) dokumentacja elektroniczna, (5) formalne raporty. Dla zespołów rozproszonych formalniejsze formy bywają lepsze. Treść dostosować do odbiorcy — różni interesariusze potrzebują różnych informacji.'
  },
  {
    id: 222, cat: 'zarzadzanie',
    q: 'W kontekście zarządzania konfiguracją (SCM), elementy konfiguracji to:',
    a: [
      'Tylko kod źródłowy',
      'Plany testów, strategie testów, warunki testowe, przypadki, skrypty, wyniki testów, dzienniki testów, raporty — wszystko zatwierdzone do testowania staje się konfiguracją bazową i wymaga formalnego procesu zmiany',
      'Wyłącznie pliki konfiguracji środowiska',
      'Tylko narzędzia testowe'
    ],
    correct: 1,
    expl: 'Sylabus 5.4.1: SCM = uporządkowany proces nadzoru nad produktami pracy testowania. **Elementy konfiguracji**: plany testów, strategie, warunki testowe, przypadki testowe, skrypty, wyniki, dzienniki, raporty. Zatwierdzone do testowania → **konfiguracja bazowa (baseline)** — zmiany tylko przez formalny proces. Pozwala odtworzyć wcześniejsze wyniki testów (zmodyfikowane elementy są dokumentowane). W DevOps zwykle automatyczne.'
  },
  {
    id: 223, cat: 'zarzadzanie',
    q: 'Jakie dane powinien zawierać raport o defekcie zarejestrowany podczas testowania dynamicznego?',
    a: [
      'Tylko opis bugu i screenshot',
      'Jednoznaczny ID, tytuł + krótkie podsumowanie, data, autor, identyfikacja przedmiotu testów + środowiska, kontekst (przypadek testowy, faza, technika), opis awarii umożliwiający odtworzenie, oczekiwany vs rzeczywisty wynik, krytyczność, priorytet, status, odwołania',
      'Tylko ID i status',
      'Tylko logi z serwera'
    ],
    correct: 1,
    expl: 'Sylabus 5.5.1 — pełna typowa zawartość raportu o defekcie: jednoznaczny ID, tytuł + podsumowanie, data + autor + rola, przedmiot testów + środowisko, kontekst (testcase, faza cyklu, technika, dane), opis umożliwiający odtworzenie (kroki, dzienniki, zrzuty), oczekiwany vs rzeczywisty wynik, **krytyczność** (severity — z punktu widzenia wymagań/interesariuszy), **priorytet** (priority — kolejność usunięcia), **status** (otwarty/odroczony/zamknięty/odrzucony/...), odwołania. ISO/IEC/IEEE 29119-3.'
  },
  {
    id: 224, cat: 'zarzadzanie',
    q: 'Jakie są typowe cele raportu o defekcie?',
    a: [
      'Wymierzanie kary autorom kodu',
      'Dostarczenie odpowiedzialnym osobom informacji wystarczających do rozwiązania problemu, umożliwienie śledzenia jakości produktu, dostarczenie sugestii dotyczących usprawnień procesu wytwarzania i testowego',
      'Tylko archiwizacja statystyk',
      'Wyłącznie powiadomienie kierownictwa'
    ],
    correct: 1,
    expl: 'Sylabus 5.5: cele raportu o defekcie to: (1) dać osobom odpowiedzialnym informacje do rozwiązania (deweloperowi do naprawy), (2) umożliwić **śledzenie jakości produktu**, (3) zasugerować **usprawnienia procesu** (gdzie powstał defekt i co zmienić, by zapobiegać podobnym). Nie chodzi o obwinianie — chodzi o ulepszanie. Ustalona procedura zarządzania defektami obowiązuje wszystkich.'
  },
  {
    id: 225, cat: 'zarzadzanie',
    q: 'Co oznacza "krytyczność" (severity) vs "priorytet" (priority) defektu?',
    a: [
      'To synonimy',
      'Krytyczność = stopień wpływu defektu z punktu widzenia interesariuszy/wymagań; priorytet = pilność/kolejność usunięcia (może być różny od krytyczności)',
      'Krytyczność to liczba użytkowników dotkniętych defektem',
      'Priorytet = liczba zgłoszeń duplikatów'
    ],
    correct: 1,
    expl: 'Sylabus 5.5.1: **Krytyczność (severity)** mówi o WPŁYWIE defektu — jak bardzo szkodzi z punktu widzenia wymagań/interesariuszy (np. krytyczny/poważny/niski). **Priorytet (priority)** mówi o KOLEJNOŚCI usunięcia. Defekt o wysokiej krytyczności może mieć niski priorytet (np. crash, ale w nieużywanej funkcji), i odwrotnie — literówka u CEO ma niską krytyczność, wysoki priorytet.'
  },
  {
    id: 226, cat: 'zarzadzanie',
    q: 'Anomalia zgłoszona w raporcie o defekcie:',
    a: [
      'Zawsze oznacza rzeczywisty defekt',
      'Może okazać się rzeczywistym defektem, ale również czymś innym (np. rezultatem fałszywie pozytywnym, żądaniem zmiany funkcjonalności, nieporozumieniem co do specyfikacji)',
      'Może być zgłoszona tylko podczas testowania dynamicznego',
      'Nigdy nie jest false positive'
    ],
    correct: 1,
    expl: 'Sylabus 5.5: choć w sylabusie mówi się o "defektach", zgłaszamy **anomalie** — mogą być rzeczywistymi defektami, ale też **false positivami** (problem testera/środowiska), żądaniami zmiany, błędem w specyfikacji. Rozstrzygnięcie następuje podczas rozpatrywania raportu (sortowania, triażu). Anomalie można zgłaszać w **dowolnej fazie** cyklu wytwarzania, także podczas testowania statycznego (zwłaszcza analizy statycznej).'
  },
  {
    id: 227, cat: 'zarzadzanie',
    q: 'Ustalanie priorytetów testów oparte na pokryciu występuje w 2 wariantach. W którym kolejność testów po pierwszym wykonaniu wybiera się tak, by dodać MAKSYMALNIE NOWE pokrycie?',
    a: [
      'Wariant "dodatkowego pokrycia"',
      'Wariant "wszystkich kombinacji"',
      'Wariant ryzykowny',
      'Wariant wymagań'
    ],
    correct: 0,
    expl: 'Sylabus 5.1.5: priorytetyzacja oparta na pokryciu — wariant podstawowy: pierwsze wykonywane są testy dające największe **bezwzględne** pokrycie. **Wariant "dodatkowego pokrycia"**: pierwszy test = max pokrycie, każdy kolejny = test dodający największe **dodatkowe** (incremental) pokrycie. Cel: jak najszybciej osiągnąć wymagane pokrycie przy minimalnej liczbie testów.'
  },

  // ===== CTFL ROZDZ. 6 — NARZĘDZIA TESTOWE (Sylabus v4.0.1) =====
  // Pokrywa LO FL-6.1.1 i FL-6.2.1

  {
    id: 228, cat: 'narzedzia',
    q: 'Sylabus CTFL v4.0.1 wymienia kilka kategorii narzędzi wspomagających testowanie. Która kategoria NIE jest tam wymieniona?',
    a: [
      'Narzędzia do zarządzania (cyklem wytwarzania, wymaganiami, testami, defektami, konfiguracją)',
      'Narzędzia do testowania statycznego (przeglądy, analiza statyczna)',
      'Narzędzia DevOps (CI/CD, pipeline, śledzenie przepływu pracy)',
      'Narzędzia do automatycznej generacji kodu produkcyjnego'
    ],
    correct: 3,
    expl: 'Sylabus 6.1 wymienia: (1) zarządzania (cykl wytwarzania, wymagania, testy, defekty, konfiguracja), (2) testowania statycznego, (3) projektowania i implementacji testów, (4) wykonywania testów i pomiaru pokrycia, (5) testowania niefunkcjonalnego, (6) DevOps, (7) wspomagające współpracę, (8) zwiększające skalowalność (wirtualizacja, kontenery), (9) inne (np. arkusz kalkulacyjny). Generowanie kodu produkcyjnego nie należy do narzędzi testowych.'
  },
  {
    id: 229, cat: 'narzedzia',
    q: 'Jaką rolę pełnią narzędzia do testowania niefunkcjonalnego?',
    a: [
      'Zastępują kompletnie testerów manualnych',
      'Umożliwiają wykonywanie testów niefunkcjonalnych, które są trudne lub niemożliwe do wykonania w trybie manualnym (np. testy obciążeniowe, wydajności, bezpieczeństwa)',
      'Generują automatycznie wymagania',
      'Zarządzają backlogiem produktu'
    ],
    correct: 1,
    expl: 'Sylabus 6.1: narzędzia niefunkcjonalne pozwalają wykonać testy **trudne lub niemożliwe manualnie** — np. wygenerowanie obciążenia 10 000 użytkowników jednocześnie (load testing), pomiar precyzyjnego czasu odpowiedzi, fuzzy testing, skanery bezpieczeństwa. Część charakterystyk ISO 25010 (wydajność, niezawodność) bez narzędzi jest praktycznie niemierzalna.'
  },
  {
    id: 230, cat: 'narzedzia',
    q: 'Maszyny wirtualne i konteneryzacja w kontekście testowania to przykład narzędzi:',
    a: [
      'Do testowania statycznego',
      'Zwiększających skalowalność i standaryzację wdrażania (ułatwiają tworzenie spójnych, powtarzalnych środowisk testowych)',
      'Do zarządzania wymaganiami',
      'Do analizy statycznej kodu'
    ],
    correct: 1,
    expl: 'Sylabus 6.1: **konteneryzacja** (Docker) i **wirtualizacja** (VM) zwiększają skalowalność i standaryzację wdrażania. Korzyść dla testerów: szybkie stawianie spójnych, izolowanych środowisk testowych identycznych jak produkcyjne. Eliminują problem "u mnie działa". Szczególnie ważne w DevOps / CI/CD — środowiska są kodem, wersjonowane razem z aplikacją.'
  },
  {
    id: 231, cat: 'narzedzia',
    q: 'Sam zakup narzędzia gwarantuje sukces automatyzacji testowania?',
    a: [
      'Tak — wystarczy kupić, zainstalować, działa',
      'Nie. Sukces wymaga dodatkowego wysiłku (wdrożenie, utrzymanie, szkolenia) oraz analizy i łagodzenia ryzyk',
      'Tak, jeśli narzędzie jest komercyjne',
      'Tak, jeśli narzędzie jest open source'
    ],
    correct: 1,
    expl: 'Sylabus 6.2: **sam zakup nie wystarczy**. Realne korzyści wymagają dodatkowego wysiłku: wdrożenie, utrzymanie skryptów, szkolenia zespołu. Trzeba też przeanalizować i łagodzić **ryzyka**: nierealistyczne oczekiwania, niedoszacowanie kosztów wdrożenia/utrzymania, uzależnienie od dostawcy, niedopasowanie do platformy. Klasyczny błąd: kupić Selenium/Cypress license i oczekiwać że "samo się zautomatyzuje".'
  },
  {
    id: 232, cat: 'narzedzia',
    q: 'Które z poniższych są TYPOWYMI KORZYŚCIAMI automatyzacji testów wg sylabusa?',
    a: [
      'Oszczędność czasu przez eliminację powtarzalnych czynności, zapobieganie błędom ludzkim, obiektywne pomiary (np. pokrycie), łatwiejszy dostęp do informacji o testach, krótszy czas testów, więcej czasu testerów na projektowanie nowych testów',
      'Eliminacja potrzeby testowania manualnego',
      'Gwarantowane zerowe defekty w produkcji',
      'Brak konieczności pisania przypadków testowych'
    ],
    correct: 0,
    expl: 'Sylabus 6.2: korzyści (1) oszczędność czasu (regresja, dane testowe, porównania, sprawdzanie standardów), (2) zapobieganie błędom ludzkim (spójność, powtarzalność), (3) obiektywne pomiary (np. pokrycie), (4) łatwiejszy dostęp do informacji (dashboardy, statystyki), (5) krótszy czas testów = szybszy feedback i time-to-market, (6) tester ma więcej czasu na **nowe, wnikliwsze** testy. Manualne wciąż potrzebne (UX, eksploracja).'
  },
  {
    id: 233, cat: 'narzedzia',
    q: 'Jakie są potencjalne RYZYKA związane z automatyzacją testów?',
    a: [
      'Brak ryzyk — automatyzacja zawsze działa',
      'Nierealistyczne oczekiwania, niedoszacowanie kosztów wdrożenia/utrzymania, stosowanie tam gdzie lepsze byłoby manualne, nadmierne uzależnienie, uzależnienie od dostawcy, ryzyko porzucenia open-source, brak kompatybilności z platformą, niezgodność z prawem/normami',
      'Tylko koszt licencji',
      'Tylko wolniejsze działanie'
    ],
    correct: 1,
    expl: 'Sylabus 6.2: ryzyka (1) **nierealistyczne oczekiwania** (funkcjonalność, łatwość obsługi), (2) niedokładne **oszacowanie kosztów** wdrożenia i utrzymania skryptów, (3) stosowanie automatu tam gdzie lepiej działa manual (UX!), (4) **nadmierne uzależnienie** (zanik krytycznego myślenia), (5) uzależnienie od **dostawcy** (upadłość, koniec wsparcia), (6) porzucenie **open source**, (7) brak kompatybilności z platformą, (8) niespełnienie norm prawnych/bezpieczeństwa.'
  },
  {
    id: 234, cat: 'narzedzia',
    q: 'Tester planuje przepisać 50 testów eksploracyjnych UX na testy automatyczne, żeby "oszczędzić czas". Co jest złym pomysłem w tym podejściu?',
    a: [
      'Pomysł jest idealny',
      'Testowanie eksploracyjne i użyteczności (UX) to obszary, w których lepiej sprawdza się testowanie MANUALNE — automatyzacja tu nie przynosi korzyści, a może maskować rzeczywiste problemy UX',
      'Powinien przepisać 100 testów, nie 50',
      'Eksploracyjne testy zawsze trzeba automatyzować'
    ],
    correct: 1,
    expl: 'Sylabus 6.2 (ryzyko #3): "stosowanie narzędzia w sytuacjach, w których lepiej sprawdzi się testowanie manualne". Eksploracja, użyteczność, UX — wymagają oceny człowieka, kreatywności, intuicji. Automat sprawdzi czy przycisk istnieje, ale nie oceni czy jest "intuicyjny w użyciu". Sylabus 5.1.7 (kwadrant Q3) wskazuje wprost: UX, użyteczność, eksploracja są częściej manualne.'
  },
  {
    id: 235, cat: 'narzedzia',
    q: 'Co oznacza ryzyko "nadmiernego uzależnienia od narzędzia" wymienione w sylabusie?',
    a: [
      'Kupowanie wielu licencji',
      'Lekceważenie potrzeby krytycznego myślenia testera — zakładanie, że "skoro automat green, to wszystko jest OK"',
      'Używanie narzędzia codziennie',
      'Płacenie za licencje rocznie'
    ],
    correct: 1,
    expl: 'Sylabus 6.2: "nadmierne uzależnienie od narzędzia (np. lekceważenie potrzeby krytycznego myślenia)". Klasyczny problem: 1000 testów automatycznych przeszło, więc release\'ujemy. A testy mogły być źle zaprojektowane, pomijać krytyczne ścieżki, mieć false negatives. Tester musi nadal **krytycznie myśleć** o pokryciu, ryzyku, jakości — narzędzie wykonuje, ale nie myśli za testera.'
  },
  {
    id: 236, cat: 'narzedzia',
    q: 'Korzystanie z narzędzi open-source w testowaniu wiąże się ze szczególnym ryzykiem. Jakim?',
    a: [
      'Brak takiego ryzyka — open source jest zawsze lepszy',
      'Projekt może zostać porzucony (brak dalszych aktualizacji), a elementy wewnętrzne mogą wymagać stosunkowo częstych aktualizacji w związku z dalszymi pracami rozwojowymi',
      'Open source nie jest dozwolony w testowaniu',
      'Wyższy koszt licencji'
    ],
    correct: 1,
    expl: 'Sylabus 6.2: open-source może zostać **porzucony** (maintainer traci motywację, projekt umiera) — brak dalszych aktualizacji, security fixów, kompatybilności z nowymi wersjami platform. Dodatkowo elementy wewnętrzne (zależności) mogą wymagać częstych aktualizacji w miarę rozwoju. Z drugiej strony narzędzia komercyjne mają ryzyko upadłości dostawcy lub odsprzedaży komuś, kto świadczy słabej jakości wsparcie.'
  },
  {
    id: 237, cat: 'narzedzia',
    q: 'Które narzędzia testowe wspomagają konkretnie ZARZĄDZANIE konfiguracją (sekcja 5.4)?',
    a: [
      'Selenium, Cypress, Playwright',
      'JMeter, k6, LoadRunner',
      'Narzędzia do zarządzania (cyklem wytwarzania, wymaganiami, testami, defektami i konfiguracją) — np. systemy kontroli wersji, narzędzia ALM',
      'Tylko arkusze kalkulacyjne'
    ],
    correct: 2,
    expl: 'Sylabus 6.1: pierwsza kategoria — "narzędzia do zarządzania" pokrywa cały cykl wytwarzania (wymagania, testy, defekty **i konfiguracja**). Konkretnie: Git/SVN (kontrola wersji testaliów = elementów konfiguracji wg 5.4), Jira/ALM (testy, defekty), Jenkins/CI (konfiguracje builda). Selenium = wykonywanie testów. JMeter = niefunkcjonalne. Te kategorie się nie pokrywają.'
  },

  // ===== DEFECTS — pytania rekrutacyjne =====
  {
    id: 238, cat: 'defects',
    q: 'Czym różni się smoke testing od sanity testing?',
    a: [
      'To synonimy',
      'Smoke = szeroki, płytki test "czy build w ogóle działa" (np. login, główne menu). Sanity = wąski, głęboki test konkretnej funkcji po małej zmianie',
      'Smoke = automatyczny, sanity = manualny',
      'Smoke = przed release, sanity = po release'
    ],
    correct: 1,
    expl: '**Smoke test** to "build verification" — kilka kluczowych ścieżek (app startuje, login działa, dashboard się ładuje). Sprawdza CZY warto w ogóle testować dalej. **Sanity test** to wąska weryfikacja: zmieniono walidację emaila — sprawdzam tylko ten ekran szczegółowo. Smoke = szeroki + płytki. Sanity = wąski + głęboki.'
  },
  {
    id: 239, cat: 'defects',
    q: 'Verification vs Validation — kluczowa różnica:',
    a: [
      'To synonimy',
      'Verification: "czy budujemy produkt POPRAWNIE" (zgodnie ze specyfikacją). Validation: "czy budujemy POPRAWNY produkt" (czy zaspokaja potrzeby usera)',
      'Verification = automaty, Validation = manualne',
      'Verification = unit tests, Validation = E2E'
    ],
    correct: 1,
    expl: '**Verification** sprawdza zgodność ze specyfikacją (czy formularz działa zgodnie z dokumentem). **Validation** sprawdza czy produkt zaspokaja rzeczywiste potrzeby usera (czy ten formularz to JEST to, czego potrzebuje user). Można mieć app perfekcyjnie zwerifikowaną i kompletnie nie-zaspokajającą potrzeb.'
  },
  {
    id: 240, cat: 'defects',
    q: 'Defect Removal Efficiency (DRE) to:',
    a: [
      'Czas naprawy defektu',
      'Stosunek defektów wykrytych przed release do wszystkich (przed + po release). Wzór: DRE = defekty_przed / (defekty_przed + defekty_po) × 100%',
      'Liczba defektów na sprint',
      'Procent automatycznych testów'
    ],
    correct: 1,
    expl: '**DRE** to KPI procesu QA. Przykład: w testach znaleziono 90 bugów, w produkcji wyciekło 10. DRE = 90/(90+10) = 90%. Im wyżej, tym skuteczniejszy proces testowy. Mierzone per release / per sprint. Komplementarne z defect leakage (10% w przykładzie).'
  },
  {
    id: 241, cat: 'defects',
    q: 'Technika "5 Why" w analizie defektów polega na:',
    a: [
      'Zadaniu 5 różnych pytań developerowi',
      'Iteracyjnym pytaniu "dlaczego?" aż do odkrycia root cause (zwykle ~5 razy starczy)',
      'Pomijaniu 5 najmniej ważnych bugów',
      'Wypełnianiu 5-stopniowej ankiety'
    ],
    correct: 1,
    expl: '**5 Why** (Toyota) odkrywa root cause przez iteracyjne "dlaczego". Przykład: 1) Czemu crash? Bo null pointer. 2) Czemu null? Bo API zwróciło pusty obiekt. 3) Czemu pusty? Bo timeout. 4) Czemu timeout? Bo wolna DB. 5) Czemu wolna? Bo brak indexu. Każde "czemu" prowadzi głębiej. Pomaga uniknąć łatania objawów.'
  },
  {
    id: 242, cat: 'defects',
    q: 'Znajdujesz buga, ale jest workaround. Jak zgłosisz?',
    a: [
      'Nie zgłaszam, skoro jest workaround',
      'Zgłaszam bug, opisuję problem, kroki repro, oczekiwane vs aktualne — i w osobnej sekcji "Workaround:" dodaję obejście (przydatne dla supportu i innych testerów)',
      'Zgłaszam tylko workaround',
      'Daję workaround i nie wspominam o bug-u'
    ],
    correct: 1,
    expl: 'Bug i workaround to różne rzeczy. **Bug** = problem do naprawienia (z severity/priority). **Workaround** = tymczasowe obejście dla supportu i innych testerów. Jedno nie zastępuje drugiego. Workaround w bug reporcie pozwala biznesowi i userom funkcjonować, podczas gdy bug czeka na fix.'
  },

  // ===== AGILE — pytania rekrutacyjne =====
  {
    id: 243, cat: 'agile',
    q: 'Co to jest "Definition of Done" (DoD)?',
    a: [
      'Lista zakończonych sprintów',
      'Kryteria, które user story MUSI spełniać żeby być uznana za "ukończoną" (np. kod + review + testy + dokumentacja + deploy na staging)',
      'Plan demo dla klienta',
      'Tylko "kod skończony"'
    ],
    correct: 1,
    expl: '**DoD** to checklist dla "done": kod napisany, code review przeszedł, unit/integration tests napisane, manualnie przetestowane, AC spełnione, dokumentacja zaktualizowana, deploy na staging. Bez DoD każdy ma własną definicję "done" → bałagan. DoR (Ready) = co potrzeba przed startem. DoD = co potrzeba żeby skończyć.'
  },
  {
    id: 244, cat: 'agile',
    q: 'Praktyka "Three Amigos" w agile to:',
    a: [
      'Trzech najlepszych developerów',
      'Spotkanie BA/PO + Dev + QA przy każdej user story — żeby wspólnie wypracować zrozumienie wymagań i AC',
      'Trzech właścicieli produktu',
      'Wybór 3 osób do daily'
    ],
    correct: 1,
    expl: '**3 Amigos**: właściciel produktu (PERSPEKTYWA biznesu/usera) + developer (PERSPEKTYWA implementacji) + QA (PERSPEKTYWA "co może pójść źle") wspólnie omawiają story przed sprintem. Wczesne złapanie nieścisłości w AC, edge cases, technical risks. Często formalizowane jako 3 Cs: Card, Conversation, Confirmation.'
  },
  {
    id: 245, cat: 'agile',
    q: 'Velocity zespołu Scrum to:',
    a: [
      'Szybkość pisania kodu',
      'Średnia liczba story pointów ukończonych w sprincie — używana do prognozowania jak dużo zespół zdąży w kolejnych sprintach',
      'Frekwencja na daily',
      'Liczba członków zespołu'
    ],
    correct: 1,
    expl: '**Velocity** to średnia z ostatnich 3-5 sprintów. Jeśli zespół średnio kończy 30 SP/sprint, planujesz ~30 SP do następnego. Stabilizuje się po kilku sprintach. Velocity NIE jest do porównywania zespołów (skala SP jest subiektywna). Antypatern: kierownictwo presuje na "wyższe velocity" → zespół zaczyna inflować estymaty.'
  },
  {
    id: 246, cat: 'agile',
    q: 'Planning Poker służy do:',
    a: [
      'Gier zespołowych po pracy',
      'Wspólnego estymowania user stories — każdy pokazuje kartę (Fibonacci: 1,2,3,5,8,13), dyskusja gdy duże różnice, ponowne głosowanie',
      'Losowania kto robi co',
      'Decyzji o release'
    ],
    correct: 1,
    expl: '**Planning Poker**: każdy członek dostaje karty Fibonacci (1,2,3,5,8,13,21,?). PO opisuje story. Każdy WYBIERA kartę i POKAZUJE jednocześnie (nie wpływ na innych). Duże różnice (np. 1 i 13) → dyskusja "co widzisz że ja nie widzę?" → ponowne głosowanie. Wyłania ukryte założenia i ryzyka.'
  },
  {
    id: 247, cat: 'agile',
    q: 'Kryteria INVEST dotyczą dobrej user story. Co oznacza I-N-V-E-S-T?',
    a: [
      'Independent, Negotiable, Valuable, Estimable, Small, Testable',
      'Important, New, Verified, Estimated, Simple, Tracked',
      'Iterative, Numerous, Vital, Easy, Strict, Trustworthy',
      'Internal, Native, Visual, External, Stable, Targeted'
    ],
    correct: 0,
    expl: '**INVEST** (Bill Wake): **I**ndependent (niezależna od innych), **N**egotiable (do dyskusji), **V**aluable (wartość dla biznesu), **E**stimable (da się oszacować), **S**mall (mieści się w sprincie), **T**estable (mierzalne AC). Jeśli story nie spełnia INVEST → nie jest gotowa do sprintu. QA szczególnie patrzy na "Testable" — czy AC są jednoznaczne.'
  },

  // ===== API — pytania rekrutacyjne =====
  {
    id: 248, cat: 'api',
    q: 'Kluczowa różnica między REST a SOAP:',
    a: [
      'REST używa HTTP, SOAP nie',
      'REST = architektura (czasownik HTTP + URI, JSON), SOAP = protokół (XML envelope, WSDL, ściśle zdefiniowany kontrakt, własne specyfikacje WS-*)',
      'REST = nowoczesny, SOAP = przestarzały i niedziałający',
      'SOAP nie obsługuje JSON, REST nie obsługuje XML'
    ],
    correct: 1,
    expl: '**REST**: lekka architektura, JSON, używa HTTP czasowników (GET/POST/PUT/DELETE), URI = zasób, brak ścisłego kontraktu (OpenAPI/Swagger opcjonalnie). **SOAP**: protokół z envelope XML, WSDL = kontrakt, własne WS-* (Security, Reliability), tylko POST przez HTTP, "ciężki". SOAP w bankowości/enterprise. REST dominuje w web/mobile.'
  },
  {
    id: 249, cat: 'api',
    q: 'GraphQL różni się od REST tym, że:',
    a: [
      'GraphQL działa tylko na PHP',
      'Klient mówi DOKŁADNIE jakie pola chce w response (jedno endpointu na wszystko). REST: serwer decyduje co zwrócić, wiele endpointów',
      'GraphQL jest mniej bezpieczny',
      'GraphQL nie obsługuje uwierzytelnienia'
    ],
    correct: 1,
    expl: '**REST**: GET /users/1 zwraca CAŁY obiekt, GET /users/1/orders to osobny request. **GraphQL**: POST /graphql z query mówiącym `{ user(id:1) { name, orders { total } } }` — jedna odpowiedź, dokładnie te pola. Plus: over/under-fetching znika, mobile-friendly. Minus: trudniejszy caching, N+1 problem, learning curve, security (complex queries → DOS).'
  },
  {
    id: 250, cat: 'api',
    q: 'JWT (JSON Web Token) składa się z 3 części oddzielonych kropką. Jakie?',
    a: [
      'Username.password.timestamp',
      'Header (algorytm, typ) . Payload (claims: user_id, exp, role) . Signature (HMAC/RSA na header+payload)',
      'IP.session_id.expires',
      'Cookie.csrf.refresh_token'
    ],
    correct: 1,
    expl: 'JWT = **base64(header).base64(payload).signature**. Header: `{alg:HS256, typ:JWT}`. Payload: claims (sub=user_id, exp=expiry, role, custom). Signature: HMAC(header+payload, secret) lub RSA. **WAŻNE**: payload jest tylko zakodowany base64 — KAŻDY może go odczytać (jwt.io). NIE wkładaj tam haseł/PII. Signature chroni przed modyfikacją, nie przed odczytem.'
  },
  {
    id: 251, cat: 'api',
    q: 'Po sukces POST /users (utworzenie usera) jaki status code zwróci najczęściej:',
    a: [
      '200 OK',
      '201 Created — sukces + utworzono nowy zasób; często z nagłówkiem Location: /users/123',
      '204 No Content',
      '301 Moved Permanently'
    ],
    correct: 1,
    expl: '**201 Created** dla utworzenia nowego zasobu (preferowane RESTowo). Zwykle z `Location: /users/123` (URL nowego zasobu) i body z utworzonym obiektem. **200 OK** akceptowalne ale mniej precyzyjne. **202 Accepted** = przyjęto, ale przetwarzanie asynchroniczne. **204 No Content** = sukces bez body (częste po DELETE, nie po POST tworzącym).'
  },
  {
    id: 252, cat: 'api',
    q: 'Czym różni się redirect 301 od 302?',
    a: [
      'To synonimy',
      '301 = Moved PERMANENTLY (zmień zakładkę, przekaż SEO juice). 302 = Found / TEMPORARY (zachowaj oryginalny URL, np. login redirect)',
      '301 = HTTPS, 302 = HTTP',
      '301 = GET, 302 = POST'
    ],
    correct: 1,
    expl: '**301**: trwała zmiana adresu, przeglądarka cache-uje na zawsze, search engines aktualizują indeks. **302** (lub nowsze 303/307): tymczasowe, klient nie cache-uje. Klasyczne 302: redirect na login gdy session expired, redirect na success page po POST. Testing: 301 łatwo testować — pamiętaj że cache w przeglądarce może mylić.'
  },
  {
    id: 253, cat: 'api',
    q: 'CORS preflight (OPTIONS) jest wysyłany przed właściwym requestem gdy:',
    a: [
      'Zawsze przy każdym requeście',
      'Request "nieproste" (non-simple): zawiera nagłówki custom (np. Authorization), metodę inną niż GET/POST/HEAD, lub Content-Type inny niż application/x-www-form-urlencoded/multipart/text-plain',
      'Tylko przy POST',
      'Tylko gdy CORS jest wyłączony'
    ],
    correct: 1,
    expl: 'Browser robi OPTIONS preflight by zapytać serwer "czy mogę zrobić ten cross-origin request?". Wymagany gdy: custom header (Authorization, X-*), method PUT/DELETE/PATCH, Content-Type: application/json. Serwer odpowiada `Access-Control-Allow-Origin`, `Allow-Methods`, `Allow-Headers`. Jeśli OK — browser wysyła właściwy request. Częsty bug: preflight failuje (np. brak nagłówków) → property request nigdy nie idzie.'
  },
  {
    id: 254, cat: 'api',
    q: 'Webhook vs polling — kluczowa różnica:',
    a: [
      'To synonimy',
      'Polling = klient regularnie pyta serwer "są zmiany?". Webhook = serwer SAM woła klienta (POST na URL klienta) gdy coś się stanie. Webhook efektywniejszy, ale wymaga publicznego URL klienta',
      'Webhook tylko dla GET, polling dla POST',
      'Webhook działa tylko z REST'
    ],
    correct: 1,
    expl: '**Polling**: klient co X sekund GET-uje "/status" — proste, ale marnuje zasoby, opóźnione. **Webhook** (callback URL): serwer POST-uje na URL klienta gdy zdarzenie (np. payment.success). Stripe, GitHub, Slack — wszędzie webhooki. Testing webhooków: ngrok / webhook.site / RequestBin do odbierania webhooków na lokalnej maszynie. Pamiętaj o retry logic i idempotency!'
  },
  {
    id: 255, cat: 'api',
    q: 'Po co mockowanie API w testach?',
    a: [
      'Żeby udawać że testujemy',
      'Testować klienta NIEZALEŻNIE od backendu: gdy API nie gotowe, gdy chcemy odtworzyć edge case (500, timeout), gdy testujemy z izolacją (unit/component testy)',
      'Tylko żeby było szybciej',
      'Tylko żeby pominąć autoryzację'
    ],
    correct: 1,
    expl: 'Mockowanie API: **frontend testy gdy backend jeszcze nie gotowy** (mock-first development), **odtworzenie edge case** (500, 429, timeout, malformed JSON) — trudno zmusić prawdziwy serwer. **Izolacja** — testujesz tylko warstwę klienta. Narzędzia: MSW (Mock Service Worker), WireMock, Mockoon, json-server, Postman Mock Servers. Ważne: testy E2E muszą używać prawdziwego API!'
  },

  // ===== WEB — pytania rekrutacyjne =====
  {
    id: 256, cat: 'web',
    q: 'localStorage vs sessionStorage vs cookies — kluczowe różnice:',
    a: [
      'To synonimy',
      'localStorage: ~5-10MB, persist after tab close, nie idzie do servera. sessionStorage: per tab, znika z tabem. Cookies: małe (~4KB), idą AUTOMATYCZNIE w każdym requeście do domeny, mogą być HttpOnly/Secure',
      'Wszystkie idą do servera',
      'Tylko cookies są bezpieczne'
    ],
    correct: 1,
    expl: '**localStorage**: ~5-10MB, JS-accessible, persist after browser restart, **NIE jest wysyłane do servera** — używaj do client-side state. **sessionStorage**: jak localStorage ale tylko na czas otwartej karty. **Cookies**: ~4KB, **wysyłane w każdym requeście** do domeny, opcje HttpOnly (JS nie czyta), Secure (tylko HTTPS), SameSite (CSRF protection). Tokeny: HttpOnly cookie bezpieczniejsze niż localStorage (XSS).'
  },
  {
    id: 257, cat: 'web',
    q: 'Same-Origin Policy w przeglądarce oznacza:',
    a: [
      'Każda strona ma jeden serwer',
      'Skrypt z origin A.com nie może czytać responses z innego origin B.com (origin = protocol + domain + port). CORS to mechanizm rozluźniający tę zasadę',
      'Każda strona musi mieć HTTPS',
      'Login musi być na tej samej stronie co aplikacja'
    ],
    correct: 1,
    expl: '**Same-Origin Policy (SOP)** to fundamentalny security mechanism. Origin = scheme://domain:port. https://app.com:443 i http://app.com:80 to RÓŻNE origins. JS z origin A może wysyłać requesty do B, ale NIE może czytać response (chyba że B ma odpowiednie CORS headers). To powstrzymuje malicious site od kradzieży danych z innej domeny gdzie user jest zalogowany.'
  },
  {
    id: 258, cat: 'web',
    q: 'HTTPS różni się od HTTP tym, że szyfruje:',
    a: [
      'Tylko hasła i karty kredytowe',
      'Cały ruch HTTP (body, headers, URL path, query params) między klientem a serwerem za pomocą TLS. Nie szyfruje: domeny (DNS), IP, rozmiaru paczek',
      'Wszystko włącznie z DNS',
      'Tylko response, nie request'
    ],
    correct: 1,
    expl: 'TLS szyfruje **cały kontent HTTP** — headers (więc cookies, auth headers), body, URL path, query params. Atakujący na sieci widzi: TWOJEGO IP, IP serwera, domenę (przez DNS i SNI), przybliżony rozmiar paczek i czasy. **NIE widzi** treści. Implikacja dla testów: nawet GET /api/secret?token=XYZ jest szyfrowany, ALE token może wylądować w server logs!'
  },
  {
    id: 259, cat: 'web',
    q: 'Strona pokazuje stary content. Jak zrobić "twardy" refresh w Chrome/Firefox?',
    a: [
      'F5 lub Cmd+R (zwykły refresh — może użyć cache)',
      'Ctrl+Shift+R (Cmd+Shift+R na Mac) — refresh OBCHODZĄCY cache, lub DevTools → Network → "Disable cache" + zwykły refresh',
      'Restart komputera',
      'Zmiana hasła w aplikacji'
    ],
    correct: 1,
    expl: '**Ctrl+Shift+R** (Win/Linux) / **Cmd+Shift+R** (Mac) = hard refresh: ignoruje cache przeglądarki, pobiera świeże zasoby. Alternatywa: DevTools (F12) → Network tab → checkbox **"Disable cache"** + zwykły refresh (działa tylko gdy DevTools otwarte). Trzecia opcja: DevTools → Application → Clear storage. Przydatne gdy QA testuje deploy a widzi starą wersję.'
  },
  {
    id: 260, cat: 'web',
    q: 'CSS selectors vs XPath dla automatyzacji — co wybierzesz?',
    a: [
      'XPath zawsze, jest potężniejszy',
      'CSS selectors gdy się da (szybsze, czytelniejsze, lepsze wsparcie). XPath gdy CSS nie wystarczy (selekcja po tekście np. //*[text()="Save"], traversing w górę DOM, complex predicates)',
      'CSS tylko dla styles, XPath tylko dla testów',
      'Zawsze ID, nigdy CSS/XPath'
    ],
    correct: 1,
    expl: 'Priorytety lokatorów: **ID** (data-testid najlepsze) > **CSS** > **XPath** > tekst. CSS: `.btn[data-id="save"]`, `#login`, `input[type=email]`. Szybkie, czytelne, dobrze wspierane. XPath wygrywa gdy: selekcja po tekście (`//button[text()="Save"]`), iść w górę DOM (`parent::`), złożone predicates (`[position()=2]`). Anti-pattern: pełna ścieżka XPath (`/html/body/div[2]/...`) — kruche.'
  },
  {
    id: 261, cat: 'web',
    q: 'Responsive vs Adaptive design:',
    a: [
      'To synonimy',
      'Responsive: jeden layout płynnie skaluje się (CSS media queries, flex, grid). Adaptive: kilka WYBRANYCH layoutów dla konkretnych breakpointów (np. mobile/tablet/desktop osobne)',
      'Responsive tylko dla mobile',
      'Adaptive tylko dla desktopu'
    ],
    correct: 1,
    expl: '**Responsive** (1 layout, płynny): CSS dostosowuje się przez `@media (max-width: 768px)`, flexbox, grid. Lepsze pokrycie różnych rozdzielczości, mniej kodu. **Adaptive** (N layoutów, dyskretne): server (lub JS) wykrywa device i serwuje INNĄ wersję strony. Lepsze dla bardzo różnych use cases (np. desktop business app vs mobile consumer). QA testuje breakpointy: 320px, 375px, 768px, 1024px, 1440px.'
  },
  {
    id: 262, cat: 'web',
    q: 'Cross-browser testing — gdzie skoncentrujesz wysiłek?',
    a: [
      'Testuję na wszystkim co istnieje',
      'Statystyki userów aplikacji (analytics): pokrycie top 80%+ rynku. Standardowo: Chrome, Safari (mobile + desktop dla Apple userów), Firefox, Edge. IE11 tylko jeśli klient enterprise wymaga',
      'Tylko Chrome (większość userów)',
      'Tylko Safari (najbardziej restrykcyjny)'
    ],
    correct: 1,
    expl: 'Decyzja oparta o **dane**: sprawdź Google Analytics / Mixpanel aplikacji — które przeglądarki i wersje używa 80%+ userów. Typowo: Chrome (60%+), Safari (mobile dla iOS i desktop dla Apple), Firefox, Edge. **Mobile Safari** często sprawia najwięcej problemów (różni się od desktop, brak różnych API). IE11 zwykle deprecated. BrowserStack/LambdaTest do real device testing.'
  },

  // ===== TOOLS — pytania rekrutacyjne =====
  {
    id: 263, cat: 'tools',
    q: 'Typowy workflow zadania w JIRA wygląda tak:',
    a: [
      'Zawsze tak samo we wszystkich firmach',
      'Konfigurowalny, ale typowo: To Do → In Progress → In Review → QA / Testing → Done. Każda firma customizuje (np. dodaje Blocked, Ready for Deploy)',
      'JIRA nie ma workflowów',
      'Tylko Open/Closed'
    ],
    correct: 1,
    expl: 'Workflow w JIRA = ścieżka statusów + dozwolone tranzycje. Typowy: **To Do** → **In Progress** (dev pracuje) → **In Review** (code review) → **QA** / **Testing** → **Done**. Bugi często dodatkowo: **Reopened** (gdy QA odrzuca fix). Inne typowe: **Blocked**, **Ready for Deploy**, **In UAT**. Statusy można konfigurować per project. JQL: `status = "In QA" AND assignee = currentUser()`.'
  },
  {
    id: 264, cat: 'tools',
    q: 'Git: clone vs fork, branch, merge vs rebase — szybko:',
    a: [
      'Wszystko jest tym samym',
      'Clone = lokalna kopia repo. Fork = kopia repo na własne konto (GitHub). Branch = równoległa linia rozwoju. Merge = łączy historie (zachowuje merge commit). Rebase = przepisuje historię na top innej gałęzi (liniowa historia, ale modyfikuje commits)',
      'Branch = oddział firmy',
      'Merge zawsze lepszy od rebase'
    ],
    correct: 1,
    expl: '**Clone** kopiuje repo lokalnie. **Fork** (GitHub feature) kopiuje na własne konto — używasz gdy chcesz contribute do cudzego repo. **Branch** to wskaźnik na commit (`git checkout -b feature/login`). **Merge** zachowuje historię obu gałęzi + tworzy merge commit. **Rebase** "przesuwa" commits na top innej gałęzi — czystsza historia, ale przepisuje hashe (NIE rebase po push do shared branch!).'
  },
  {
    id: 265, cat: 'tools',
    q: 'TestRail vs Xray (JIRA plugin) — kiedy używamy?',
    a: [
      'TestRail jest darmowy, Xray płatny',
      'TestRail: dedicated test management tool (testcase repository, runs, milestones, reports). Xray: integracja z JIRA (testy = JIRA issues, test executions, traceability do user stories)',
      'Tylko jeden z nich istnieje',
      'TestRail tylko dla automatów, Xray dla manuala'
    ],
    correct: 1,
    expl: '**TestRail** (stand-alone): osobne narzędzie, świetne raporty, czytelne struktury (Project → Suite → Section → Case), integracje z JIRA przez API. **Xray** (JIRA plugin): testy są typami issue (Test, Test Execution, Test Plan) — jeśli zespół żyje w JIRA, świetna traceability story → AC → testy → bugi. **Zephyr** podobny do Xray. Wybór: zależy od ekosystemu firmy.'
  },
  {
    id: 266, cat: 'tools',
    q: 'Newman służy do:',
    a: [
      'Generowania danych testowych',
      'Uruchamiania kolekcji Postman z CLI (i w CI/CD) — `newman run collection.json -e env.json`',
      'Tworzenia API w Node.js',
      'Mockowania serwerów'
    ],
    correct: 1,
    expl: '**Newman** to CLI runner kolekcji Postman. Workflow: 1) Pracujesz w Postman GUI. 2) Eksportujesz kolekcję + środowisko jako JSON. 3) `newman run collection.json -e env.json -r html,junit` w pipeline CI (Jenkins/GitHub Actions). 4) Reports w HTML/JUnit XML — łatwo integrować z Jenkins/Allure. Pozwala mieć Postmana w CI bez kupowania Postman Enterprise.'
  },
  {
    id: 267, cat: 'tools',
    q: 'BrowserStack / Sauce Labs / LambdaTest to:',
    a: [
      'Frameworks do automatyzacji',
      'Cloud platformy z dostępem do real devices i przeglądarek (Selenium/Cypress hub) — testujesz aplikację na setkach kombinacji OS/browser/device bez własnego device lab',
      'Narzędzia load testing',
      'Tylko do mobile testing'
    ],
    correct: 1,
    expl: '**Cloud device labs**: BrowserStack (najpopularniejszy), Sauce Labs, LambdaTest. Co dają: 1) Real devices iOS/Android (nie emulatory). 2) Wszystkie kombinacje browser/OS — IE11 na Win7, Safari 14 na iPhone X. 3) Live testing (zdalny pulpit) + automation (Selenium Grid endpoint). 4) Screenshots na wszystkich kombinacjach. Drogie ale taniej niż własny device lab. Free tier ograniczony.'
  },
  {
    id: 268, cat: 'tools',
    q: 'Confluence vs JIRA — który do czego?',
    a: [
      'Tylko jeden z nich istnieje',
      'JIRA: zadania, sprinty, tracking (kanban/scrum boards). Confluence: dokumentacja, wiki, decision logs, test strategy, requirements, retro notes',
      'Confluence dla devów, JIRA dla QA',
      'JIRA dla projektów, Confluence dla maili'
    ],
    correct: 1,
    expl: 'Oba od Atlassian, complementary: **JIRA** = work tracking (issues, sprints, boards, workflow). **Confluence** = knowledge base (markdown-like pages, hierarchia spaces, page templates). Testowanie: JIRA = bugi + user stories, Confluence = test strategy, test plan, retros, runbooks. Linki: w JIRA issue link do Confluence page; w Confluence embed JIRA issues. Razem tworzą "single source of truth" dla zespołu.'
  },

  // ===== TEST DESIGN — pytania rekrutacyjne =====
  {
    id: 269, cat: 'design',
    q: 'Pairwise testing (all-pairs) służy do:',
    a: [
      'Testowania w parach (2 testerów)',
      'Pokrywania WSZYSTKICH par kombinacji parametrów (zamiast pełnej kartezjańskiej). Bazuje na obserwacji: większość bugów pojawia się przez interakcję 2 parametrów, nie 3+',
      'Testów wydajnościowych z 2 userami',
      'Code review w parach'
    ],
    correct: 1,
    expl: '**Pairwise** (all-pairs): zamiast testować WSZYSTKIE kombinacje (3 OS × 4 browser × 5 langs × 6 ról = 360!), pokryjemy tylko każdą **parę** wartości — wystarczy ~30 kombinacji. Bazuje na badaniach: 70-90% bugów to interakcja 2 parametrów. Narzędzia: ACTS, PICT, online generatory. Polega na założeniu o naturze defektów — nie zawsze pasuje (np. 3-way interactions w skomplikowanych formularzach).'
  },
  {
    id: 270, cat: 'design',
    q: 'Risk-based testing polega na:',
    a: [
      'Testowaniu tylko w bezpiecznym środowisku',
      'Priorytetyzowaniu testów na podstawie ryzyka (prawdopodobieństwo defektu × wpływ). Najwięcej wysiłku na obszary z wysokim ryzykiem, mniej na low-risk',
      'Unikanie ryzykownych testów',
      'Testowanie tylko nowych feature\'ów'
    ],
    correct: 1,
    expl: '**Risk = Likelihood × Impact**. Likelihood: częstotliwość zmian, złożoność, doświadczenie zespołu. Impact: użytkownicy dotknięci, koszt bugu, regulacje (np. financial). Risk matrix → priorytetyzacja: high/high — pełne testy + automaty; low/low — smoke wystarczy. Klasyk w embedded/medical/finance gdzie nie można testować wszystkiego. ISTQB to mocno promuje.'
  },
  {
    id: 271, cat: 'design',
    q: 'Test charter w testowaniu eksploracyjnym to:',
    a: [
      'Lista wszystkich możliwych test cases',
      'Krótki dokument: misja sesji ("zbadać payment flow przez 90 min, focus: edge cases kart kredytowych"), techniki, area, czas — daje strukturę eksploracji bez sztywnego skryptu',
      'Lista zatrudnionych testerów',
      'Umowa z klientem na testy'
    ],
    correct: 1,
    expl: 'Test charter (Session-Based Test Management / SBTM): "Explore [X] / With [Y] / To discover [Z]". Przykład: "Explore: shopping cart / With: różne kombinacje kuponów + walut / To discover: edge cases w obliczaniu kwoty". Czas: zwykle 60-120 min ("session"). Po sesji: session report (co testowano, znaleziska, pytania). Daje **focus** eksploracji bez sztywności skryptu.'
  },
  {
    id: 272, cat: 'design',
    q: 'Heurystyka SFDIPOT (J. Bach) pomaga generować test ideas. Co oznacza?',
    a: [
      'Structure, Function, Data, Interface, Platform, Operations, Time — 7 wymiarów do eksploracji produktu',
      'Software, File, Data, Internet, Program, Online, Type',
      'Random literki',
      'Tylko Function and Data'
    ],
    correct: 0,
    expl: '**SFDIPOT** = test ideas heurystyka: **S**tructure (z czego się składa — pliki, moduły, ekrany), **F**unction (co robi — features, opcje), **D**ata (jakie dane przetwarza — input/output/store), **I**nterface (API, UI, integracje), **P**latform (na czym działa — OS, browser, sieć), **O**perations (jak używany — actors, scenarios), **T**ime (timing, sekwencje, performance). Świetne na pytanie "przetestuj X" — daje strukturę.'
  },
  {
    id: 273, cat: 'design',
    q: 'Smoke vs Sanity vs Regression vs Retest — szybko porównanie:',
    a: [
      'Wszystkie to to samo',
      'Smoke = "czy build działa w ogóle" (szeroko, płytko). Sanity = wąsko, głęboko po małej zmianie. Regression = "czy nic nie zepsuliśmy" w całej aplikacji. Retest = "czy ten konkretny bug naprawiony"',
      'Smoke = ręczny, Sanity = automatyczny, Regression = oba',
      'Wszystkie to typy unit testów'
    ],
    correct: 1,
    expl: '**Smoke** (build verification): szeroki + płytki "czy app w ogóle żyje" — login, główne menu, kluczowe flows. Robisz przed każdym deploy. **Sanity**: wąski + głęboki "po zmianie X — czy ta jedna funkcja OK". **Regression**: po każdej zmianie — czy zmiana nie zepsuła starych feature\'ów (zwykle automaty). **Retest** (confirmation): konkretny scenariusz reprodukujący buga — czy fix działa.'
  },
  {
    id: 274, cat: 'design',
    q: 'Test Data Management — kluczowe wyzwanie:',
    a: [
      'Po prostu skopiować dane z produkcji',
      'Realistyczne dane (reprezentujące produkcję) + zgodność z RODO (anonimizacja PII) + dane dla edge cases (boundary, negative) + odświeżanie między testami + dane dla automatów (deterministyczne)',
      'Generowanie tylko losowych danych',
      'Hardcoding wszystkiego'
    ],
    correct: 1,
    expl: 'TDM to często niedoceniany obszar. Wyzwania: 1) **Realizm** — dane testowe powinny odzwierciedlać produkcję. 2) **Privacy** — RODO/GDPR zabrania używać prawdziwych PII (anonimizacja, syntetyczne dane). 3) **Edge cases** — celowe boundary values, polskie znaki, długie stringi. 4) **Refresh** — automaty potrzebują "czystych" danych przy każdym runie. 5) **Deterministic data** — automaty muszą być powtarzalne. Narzędzia: Faker, Bogus, Mockaroo, custom data builders.'
  },

  // ===== SOFT SKILLS — pytania rekrutacyjne =====
  {
    id: 275, cat: 'soft',
    q: 'Pytanie "Opowiedz o sobie" na rozmowie — najlepsza struktura odpowiedzi:',
    a: [
      'Opowieść autobiograficzna od dzieciństwa',
      'Present-Past-Future: aktualna rola (1 zdanie), kluczowe doświadczenia odpowiadające stanowisku (2-3 zdania), dlaczego ta firma teraz (1-2 zdania). Łącznie 60-90 sekund',
      'Tylko hobby',
      'Lista wszystkich technologii które znasz'
    ],
    correct: 1,
    expl: 'Klasyczny **Present-Past-Future**. PRESENT: "Jestem manualnym QA z 3-letnim doświadczeniem w fintech, ostatnio fokus na API testing w Postmanie." PAST: "Wcześniej testowałem aplikacje mobile dla e-commerce — nauczyłem się X." FUTURE: "Szukam roli gdzie mogę zacząć więcej automatyzacji i pracować z większą skalą." Zwięźle, ukierunkowane na rolę, nie autobiografia. Ma być "elevator pitch".'
  },
  {
    id: 276, cat: 'soft',
    q: '"Czemu chcesz pracować akurat w naszej firmie?" — najlepsze podejście:',
    a: [
      'Bo szukam pracy',
      'Konkrety o firmie (produkt, kultura, technologie, misja) wynikające z research-u + osobista więź (czemu to mnie pociąga). Pokaż że TO konkretne stanowisko, nie "byle gdzie"',
      'Bo płacicie najlepiej',
      'Bo to najbliżej domu'
    ],
    correct: 1,
    expl: 'Recruiterzy chcą widzieć **intencję**. Zrób research: stronę firmy, LinkedIn pracowników, blog firmowy, GitHub. Konkretne haczyki: "Wasz blog post o migracji do GraphQL pokazał mi, że dbacie o engineering excellence" / "Misja tej firmy (X) rezonuje z moim doświadczeniem w Y". UNIKAJ: "bo dobre opinie", "bo growing company" — pokazuje brak research. Pieniądze: nigdy jako pierwszy argument.'
  },
  {
    id: 277, cat: 'soft',
    q: '"Jak radzisz sobie z presją czasową?" — co recruiter chce usłyszeć?',
    a: [
      '"Pracuję po nocach żeby wszystko zrobić"',
      'Konkretny przykład: jak priorytetyzowałem (impact/risk), komunikowałem z teamem (early warning), negocjowałem scope. Pokazujesz proces, nie martyrologię',
      '"Nie odczuwam presji"',
      '"Po prostu robię szybciej"'
    ],
    correct: 1,
    expl: 'Anti-pattern: "pracuję po nocach" — to RED FLAG dla mądrego managera (burnout, brak priorytetyzacji). Lepiej: 1) **Priorytetyzuj** — co MUSI być w release, co może być later. 2) **Komunikuj wcześnie** — manager musi wiedzieć o ryzykach, nie być zaskoczony. 3) **Negocjuj scope** — może niektóre rzeczy odłożyć. 4) Mierz **realistycznie** swoje możliwości. STAR method: konkretny przykład z poprzedniej pracy.'
  },
  {
    id: 278, cat: 'soft',
    q: '"Jak uczysz się nowych technologii?" — najlepsza odpowiedź:',
    a: [
      'Czekam aż firma mnie nauczy',
      'Konkretne ostatnie przykłady: kurs/książka, side project, mentor/community, regularny "X% czasu na naukę". Pokazujesz **growth mindset** i samodzielność',
      'Nie uczę się, znam już wszystko',
      'Tylko gdy zmuszę mnie pracodawca'
    ],
    correct: 1,
    expl: 'QA to dziedzina która szybko ewoluuje — recruiter chce widzieć growth mindset. Konkretnie: "W ostatnich 6 miesiącach przerobiłem kurs Test Automation University z Playwright, zbudowałem mały framework do testowania mojego side project-u na GitHub. Czytam Ministry of Testing i podcast Test Talks. Co tydzień ~5h na naukę po godzinach." Konkrety > "lubię się uczyć".'
  },
  {
    id: 279, cat: 'soft',
    q: 'Jak przyjmujesz konstruktywną krytykę?',
    a: [
      'Bronię się i tłumaczę dlaczego mam rację',
      'Aktywne słuchanie (nie przerywam), pytam doprecyzowujące (jak to mogę poprawić?), nie biorę personalnie, działam (modyfikuję podejście, sprawdzam za miesiąc). Pokazujesz dojrzałość emocjonalną',
      'Ignoruję i robię swoje',
      'Płaczę i odchodzę'
    ],
    correct: 1,
    expl: 'To pytanie sprawdza **dojrzałość** i **uczenie się**. Anti-pattern: defensywność, branie do siebie ("on mnie nie lubi"). Right approach: 1) **Słuchaj** aktywnie, nie przerywaj. 2) **Pytaj**: "Możesz dać konkretny przykład?" "Jak proponujesz to poprawić?". 3) **Oddziel** osobę od feedback-u — to o twoim BEHAVIOUR, nie o tobie. 4) **Reaguj**: zmień podejście, follow-up za miesiąc. STAR: konkretny przykład z przeszłości.'
  },

  // ===== MOBILE — pytania rekrutacyjne =====
  {
    id: 280, cat: 'mobile',
    q: 'Native vs Hybrid vs Web app — kluczowe różnice:',
    a: [
      'To synonimy',
      'Native (Swift/Kotlin): osobny kod per platforma, dostęp do wszystkich API, najszybsze. Hybrid (React Native, Flutter, Ionic): jeden kod → 2 platformy, pełen dostęp do native API. Web (PWA): działa w przeglądarce, ograniczony dostęp do device',
      'Native = darmowe, Hybrid = płatne',
      'Native tylko dla Apple, Hybrid tylko Android'
    ],
    correct: 1,
    expl: '**Native** (Swift dla iOS, Kotlin/Java dla Android): osobny kod, pełen dostęp do API, najlepsza performance, ale 2x praca. **Hybrid** (React Native, Flutter): jeden kod, deploy na obie platformy, dostęp do native przez bridges. Trade-off: szybsza dev, ale czasem performance issues. **Web** (PWA): React/Vue w przeglądarce, ograniczony dostęp (geolocation tak, sensors trudniej), install na home screen możliwy. QA: testing differs! Native = device-specific bugs, Hybrid = bridge bugs, Web = browser quirks.'
  },
  {
    id: 281, cat: 'mobile',
    q: 'TestFlight (iOS) vs Internal Testing (Android) — jak się dystrybuuje buildy do testerów?',
    a: [
      'Wysyła się email z APK/IPA',
      'iOS TestFlight: do 100 internal + 10k external testerów, build via Apple review (~24h dla external). Android Internal Testing: do 100 testerów po emailu, instant publish. Plus: Google Play Open Testing, Closed Testing dla większych grup',
      'iOS i Android dystrybucja są identyczne',
      'Tylko produkcja, brak testowych buildów'
    ],
    correct: 1,
    expl: '**iOS TestFlight** (przez App Store Connect): 100 internal testerów (z firmy, instant), 10000 external (wymaga Beta App Review ~24h). Test build expires po 90 dniach. **Android Internal Testing**: do 100 testerów dodanych po Google account, instant publish. **Closed Testing**: większe grupy, ale czeka na review. **Open Testing**: każdy chętny z linku. QA flow: dev pushuje build → CI buduje → upload do TestFlight/Internal → mail do QA z linkiem.'
  },
  {
    id: 282, cat: 'mobile',
    q: 'Interruptions testing w mobile — co testujesz?',
    a: [
      'Tylko czy aplikacja crashuje',
      'Zachowanie app gdy: dzwoni telefon, SMS, push notification, low battery alert, alarm, screen lock, change of network (WiFi → 4G), app w tle przez długo, OS update prompts',
      'Tylko czy ekran się włącza',
      'Tylko volume buttons'
    ],
    correct: 1,
    expl: 'Mobile to mnóstwo **interrupts** które desktop nie ma. Testujesz: 1) Incoming call/SMS w trakcie krytycznej akcji (np. payment, recording). 2) Push notification (czy app handler je gdy w foreground). 3) Low battery / device locked. 4) Network change (WiFi → 4G → offline → back). 5) App backgrounded > 30 min (czy session expired? data preserved?). 6) Alarm / inny app przejmuje audio. 7) OS update / phone restart w trakcie. Każde to potencjalny crash/lost data.'
  },
  {
    id: 283, cat: 'mobile',
    q: 'Appium służy do:',
    a: [
      'Tylko Android automation',
      'Cross-platform mobile automation (iOS + Android) używając Selenium-compatible API. Wspiera native, hybrid i mobile web. Pisze się raz w preferowanym języku (Java, Python, JS, Ruby)',
      'Tylko web automation',
      'Tylko backend testing'
    ],
    correct: 1,
    expl: '**Appium** to "Selenium dla mobile". Cross-platform: jeden test script może działać na iOS i Android (z drobnymi different lokatorami). Wspiera **native** (XCUITest dla iOS, UiAutomator2 dla Android), **hybrid** (WebView), **mobile web** (Safari iOS, Chrome Android). Architecture: Appium server jako pośrednik między testem a urządzeniem. Inne: **Espresso** (Android native, in-process), **XCUITest** (iOS native). Appium = best dla cross-platform; Espresso/XCUITest = szybsze ale per platforma.'
  },
  {
    id: 284, cat: 'mobile',
    q: 'Accessibility na mobile — co testujesz?',
    a: [
      'Tylko czy app działa',
      'Screen readers (VoiceOver iOS, TalkBack Android — czy elementy mają opisy?), kontrast, dynamic font size (jak działa app gdy user zwiększy systemowy font?), focus order, touch targets ≥44pt, color blindness, dark mode',
      'Tylko ciemny motyw',
      'Tylko emulator obsługuje accessibility'
    ],
    correct: 1,
    expl: 'Mobile a11y: **VoiceOver** (iOS), **TalkBack** (Android) — czy każdy element ma sensowny content description? Włącz w Settings → Accessibility i przejdź flow. **Dynamic Type** (iOS) / **Font scale** (Android) — user może zwiększyć font do 200%; app musi się dostosować (nie obciąć tekstu, nie schować przycisków). **Touch targets** min 44x44pt (iOS) / 48dp (Android). **Color contrast** WCAG AA: 4.5:1 normal text. **Color blindness** — nie polegaj tylko na kolorze (np. error tylko czerwony — dodaj ikonę). Narzędzia: Accessibility Inspector (Xcode), Accessibility Scanner (Android).'
  }
];

/**
 * Helper: pobiera pytania z danej kategorii (lub wszystkie)
 */
export function getQuestionsByCategory(cat: Category | 'all'): Question[] {
  if (cat === 'all') return QUESTIONS;
  return QUESTIONS.filter((q) => q.cat === cat);
}

/**
 * Helper: zlicza pytania per kategoria - przydatne do UI
 */
export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = { all: QUESTIONS.length };
  for (const cat of Object.keys(CATEGORIES)) {
    counts[cat] = QUESTIONS.filter((q) => q.cat === cat).length;
  }
  return counts;
}
