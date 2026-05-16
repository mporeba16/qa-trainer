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
  istqb: 'ISTQB Fundamenty',
  defects: 'Defekty',
  agile: 'Agile/Scrum',
  api: 'API/HTTP',
  web: 'Web Testing',
  tools: 'Postman/Charles',
  design: 'Test Design',
  soft: 'Soft Skills',
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
