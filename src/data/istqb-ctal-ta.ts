import type { Cert, Question } from '../types';

// ISTQB Certified Tester Advanced Level - Test Analyst (CTAL-TA).
// Próbka 25 pytań pokrywających podstawowe obszary syllabusa.
// Zakłada znajomość CTFL — pytania na poziomie Advanced.

const CATEGORIES: Record<string, string> = {
  techniques: 'Techniki testowania',
  analysis: 'Analiza wymagań',
  reviews: 'Przeglądy',
  defects: 'Zarządzanie defektami',
  process: 'Proces / Test Analyst',
};

const QUESTIONS: Question[] = [
  // ===== TECHNIKI TESTOWANIA =====
  {
    id: 1, cat: 'techniques',
    q: 'Cause-effect graph (graf przyczyna-skutek) służy do:',
    a: [
      'Wizualizacji defektów',
      'Modelowania logicznych zależności między warunkami (przyczynami) a działaniami (skutkami), z której można generować tabelę decyzyjną',
      'Analizy regresji',
      'Statycznej analizy kodu'
    ],
    correct: 1,
    expl: '**Cause-effect graph** to graficzna metoda specyfikacji złożonej logiki kombinacyjnej. Strzałki łączą przyczyny (warunki wejściowe) ze skutkami (akcje) przez operatory AND/OR/NOT. Można z niego algorytmicznie wygenerować decision table — przydatne gdy ręczne sprawdzenie kombinacji staje się trudne.'
  },
  {
    id: 2, cat: 'techniques',
    q: 'Pairwise testing redukuje liczbę test case-ów przez:',
    a: [
      'Losowe wybieranie kombinacji',
      'Pokrycie WSZYSTKICH par wartości parametrów co najmniej raz, zamiast wszystkich możliwych kombinacji n-krotnych',
      'Tylko najczęstsze przypadki',
      'Tylko boundary values'
    ],
    correct: 1,
    expl: '**Pairwise (all-pairs)** opiera się na obserwacji że większość defektów wynika z interakcji 1-2 parametrów. Zamiast Cartesian product (n^k przypadków), generujemy minimalny zbiór pokrywający każdą parę raz. Narzędzia: PICT, ACTS. Redukcja: 3 parametry × 5 wartości = 125 kombinacji → ~25 par.'
  },
  {
    id: 3, cat: 'techniques',
    q: 'Classification tree method (CTM) to:',
    a: [
      'Algorytm ML',
      'Hierarchiczna dekompozycja dziedziny wejściowej na klasyfikacje i klasy — wizualne drzewo prowadzi do generowania kombinacji testowych',
      'Drzewo decyzyjne dla testów regresyjnych',
      'Tylko narzędzie dokumentacyjne'
    ],
    correct: 1,
    expl: '**Classification tree** dzieli każde wejście na klasyfikacje (np. typ użytkownika), a każdą klasyfikację na klasy (admin/user/guest). Wizualne drzewo + kombinacje na liściach generują test cases. Narzędzia: Classification Tree Editor (CTE). Bardziej strukturalne niż equivalence partitioning, dobre do produktów z wieloma wymiarami konfiguracji.'
  },
  {
    id: 4, cat: 'techniques',
    q: 'Use case testing skupia się na:',
    a: [
      'Testowaniu pojedynczych funkcji',
      'Scenariuszach interakcji aktora z systemem — testowanie scenariusza głównego + alternatywnych + wyjątków',
      'Tylko backendzie',
      'Pomiarach wydajności'
    ],
    correct: 1,
    expl: '**Use case testing** ćwiczy system z perspektywy użytkownika końcowego: main success scenario + alternative flows + exception flows. Każdy flow = osobny test case. Świetne do testowania end-to-end UX, ale słabe do pokrycia logiki wewnętrznej.'
  },
  {
    id: 5, cat: 'techniques',
    q: 'N-switch coverage w state transition testing oznacza:',
    a: [
      'Pokrycie N stanów',
      'Pokrycie wszystkich sekwencji N+1 kolejnych przejść między stanami (0-switch = pojedyncze przejścia, 1-switch = pary przejść)',
      'Wykonanie testów N razy',
      'Liczbę przełączników w UI'
    ],
    correct: 1,
    expl: '**N-switch coverage** to poziom pokrycia w state transition. **0-switch** = każde pojedyncze legalne przejście (state A → B). **1-switch** = każda para przejść (A→B→C). **2-switch** = trzy z rzędu. Wyższe N znajduje bugi w kontekście historii, ale eksponencjalnie rośnie liczba testów.'
  },
  {
    id: 6, cat: 'techniques',
    q: 'Domain analysis (analiza dziedziny) łączy:',
    a: [
      'Tylko boundary value',
      'Equivalence partitioning + boundary value analysis dla wielu zmiennych jednocześnie — analizuje granice w wielowymiarowej przestrzeni dziedziny',
      'Analizę biznesową',
      'Decision tables i state transition'
    ],
    correct: 1,
    expl: '**Domain analysis** rozszerza EP+BVA na wiele zmiennych powiązanych warunkami (np. `x + y < 100 AND z > 5`). Identyfikuje on/off points (na granicy / poza), in/out points (wewnątrz / na zewnątrz dziedziny). Bardziej kompletne pokrycie dla skomplikowanych walidacji.'
  },
  {
    id: 7, cat: 'techniques',
    q: 'Attack patterns (Whittaker) w experience-based testing to:',
    a: [
      'Testy bezpieczeństwa',
      'Skatalogowane techniki "ataku" na słabe miejsca aplikacji (np. zerowanie wartości, długie stringi, równoczesne kliki) — heurystyki na bazie typowych defektów',
      'Testy obciążeniowe',
      'Testy zgodności'
    ],
    correct: 1,
    expl: '**Attack patterns** (z książki "How to Break Software" Whittakera) to katalog techniki targetujące znane miejsca pęknięć: input attacks, data attacks, computation attacks, UI attacks. Tester świadomie próbuje "złamać" aplikację w konkretny sposób. Dobre uzupełnienie scripted testing.'
  },

  // ===== ANALIZA WYMAGAŃ =====
  {
    id: 8, cat: 'analysis',
    q: 'Główna rola Test Analyst podczas review wymagań:',
    a: [
      'Tylko sprawdzać literówki',
      'Weryfikacja testowalności (testability), kompletności, jednoznaczności, mierzalności kryteriów akceptacji — z perspektywy "czy mogę to przetestować?"',
      'Akceptacja wymagań biznesowych',
      'Pisanie wymagań'
    ],
    correct: 1,
    expl: 'Test Analyst patrzy na requirements okiem testera: czy są **testable** (mierzalne kryteria), **unambiguous** (jedna interpretacja), **complete** (wszystkie scenariusze pokryte), **consistent** (brak sprzeczności). Wyłapywanie problemów na review = oszczędność czasu na późniejsze defekty.'
  },
  {
    id: 9, cat: 'analysis',
    q: 'Po co macierz śledzenia (traceability matrix)?',
    a: [
      'Tylko dla audytu',
      'Powiązanie wymagań z test case-ami z defektami — pokazuje pokrycie testowe, ułatwia impact analysis przy zmianach, dowód kompletności testowania',
      'Pomiar produktywności testerów',
      'Tylko dla projektów regulowanych'
    ],
    correct: 1,
    expl: '**Traceability matrix** mapuje: requirement → test case → execution result → defect. Korzyści: dowód że każde wymaganie jest pokryte (compliance), impact analysis przy zmianach (które testy uruchomić), gap analysis (które wymagania nie mają testów). W projektach safety-critical (medycyna, lotnictwo) - obowiązek.'
  },
  {
    id: 10, cat: 'analysis',
    q: 'Wymaganie "system powinien być szybki" jest:',
    a: [
      'Dobre — krótkie i zrozumiałe',
      'Złe — niemierzalne (czym jest "szybki"? 1s? 1min?). Test Analyst musi poprosić o konkretne kryterium (np. "p95 latency < 500ms")',
      'Akceptowalne dla MVP',
      'Wystarczające jeśli klient się zgadza'
    ],
    correct: 1,
    expl: 'Wymagania jakościowe (non-functional) MUSZĄ mieć mierzalne progi. "Szybki", "łatwy w użyciu", "bezpieczny" są bezużyteczne dla testera. Negocjuj konkretne metryki: response time, error rate, throughput, completion time dla zadania, OWASP requirements.'
  },
  {
    id: 11, cat: 'analysis',
    q: 'Acceptance criteria vs test cases:',
    a: [
      'To synonimy',
      'AC = warunki biznesowe które user story musi spełnić (poziom WHAT). Test case = konkretne kroki + dane + oczekiwany rezultat sprawdzające AC (poziom HOW)',
      'AC pisze QA, test case PM',
      'AC tylko dla bug-ów'
    ],
    correct: 1,
    expl: '**Acceptance criteria** (Gherkin: Given/When/Then) opisują warunki akceptacji story z perspektywy biznesu. **Test case** to konkretna procedura: dane testowe, kroki UI, asercje. Jeden AC może mieć wiele test case-ów (happy path, edge cases, negatywne). Test Analyst tworzy test cases NA PODSTAWIE AC.'
  },

  // ===== PRZEGLĄDY =====
  {
    id: 12, cat: 'reviews',
    q: 'Klasyczne 6 etapów formal review (Fagan inspection):',
    a: [
      'Plan, Code, Test, Deploy, Monitor, Rollback',
      'Planning, Kick-off, Individual preparation, Review meeting, Rework, Follow-up',
      'Analyze, Design, Implement, Verify, Validate, Release',
      'Initiation, Elaboration, Construction, Transition, Maintenance, Retirement'
    ],
    correct: 1,
    expl: 'Formal review (Fagan/ISTQB): **Planning** (scope, ludzie), **Kick-off** (wprowadzenie do artefaktu), **Individual preparation** (każdy review-er czyta osobno), **Review meeting** (omówienie znalezisk), **Rework** (autor poprawia), **Follow-up** (moderator sprawdza fixy). Każdy etap ma cel — pominięcie zwykle obniża wartość review.'
  },
  {
    id: 13, cat: 'reviews',
    q: 'Inspection vs walkthrough:',
    a: [
      'To synonimy',
      'Inspection: formalna, prowadzona przez wyszkolonego moderatora, defined entry/exit criteria, mierzona. Walkthrough: nieformalna, prowadzona przez autora, edukacyjna lub konsensusowa',
      'Inspection tylko dla kodu, walkthrough dla dokumentacji',
      'Inspection zawsze online, walkthrough offline'
    ],
    correct: 1,
    expl: '**Inspection**: najformalniejszy typ review, moderator (nie autor!) prowadzi, formalne role (reader, recorder), checklisty, metryki defektów. **Walkthrough**: autor "przeprowadza" przez artefakt, więcej luźnej dyskusji, cele: edukacja zespołu, alignment, wczesne fb. Oba ważne, w różnych momentach.'
  },
  {
    id: 14, cat: 'reviews',
    q: 'Główne role w formal review:',
    a: [
      'Tylko autor i reviewer',
      'Author, Moderator (prowadzi proces), Reader (prezentuje artefakt), Recorder (notuje defekty), Reviewer (znajduje defekty), Manager (sponsoruje)',
      'Tylko QA i developer',
      'Product owner i scrum master'
    ],
    correct: 1,
    expl: 'Formal review (Fagan) ma rozdzielone role: **Author** (autor artefaktu, NIE moderuje), **Moderator** (planuje i prowadzi), **Reader** (przedstawia artefakt na meeting), **Recorder** (loguje defekty), **Reviewer** (przegląda i wskazuje problemy), **Manager** (zapewnia zasoby). W mniejszych zespołach role są łączone, ale autor moderacji nigdy.'
  },
  {
    id: 15, cat: 'reviews',
    q: 'Jak radzić sobie z defensywnością autora w trakcie review?',
    a: [
      'Zignorować i forsować zmiany',
      'Skupiać dyskusję na artefakcie, nie na autorze. Ground rules na początku ("rozmawiamy o kodzie/dokumencie, nie o człowieku"). Moderator interweniuje gdy ton się ostrza',
      'Zakończyć review',
      'Eskalować do managera'
    ],
    correct: 1,
    expl: 'Defensywność = naturalna reakcja na publiczną krytykę. Rozwiązania: **rozdzielić autora od artefaktu** w dyskusji ("ten paragraf jest niejasny" zamiast "źle to napisałeś"), **moderator pilnuje tonu**, **ground rules** ustalone na początku, **doceniaj dobre rzeczy** też (nie tylko defekty). Cel review = poprawa artefaktu, nie ocena autora.'
  },

  // ===== ZARZĄDZANIE DEFEKTAMI =====
  {
    id: 16, cat: 'defects',
    q: 'Defect taxonomy (taksonomia defektów) to:',
    a: [
      'Łacińskie nazwy bugów',
      'Skatalogowana hierarchia typów defektów (np. Beizer\'s bug taxonomy): functional, structural, data, interface, etc. — używana do checklist, error guessing, defect-based testing',
      'Lista TOP 10 bugów w projekcie',
      'OWASP Top 10'
    ],
    correct: 1,
    expl: '**Defect taxonomy** to ustrukturyzowana lista możliwych typów defektów. Beizer ma kategoryzację 4-poziomową (~700 typów). Cele: input do error guessing ("czy sprawdziłem ten typ defektu?"), checklist dla review, wybór technik testowych pod typowe defekty produktu/domeny.'
  },
  {
    id: 17, cat: 'defects',
    q: 'Defect-based test technique zaczyna od:',
    a: [
      'Wymagań',
      'Spodziewanych defektów (taksonomia, historyczne dane, doświadczenie) — testy są projektowane żeby je wywołać',
      'Architektury',
      'Test casów z poprzednich projektów'
    ],
    correct: 1,
    expl: '**Defect-based testing** odwraca myślenie: zamiast "co system robi → jak to przetestować?", pytamy "jakie defekty są tu prawdopodobne → jak je wywołać?". Wejście: taksonomia defektów, historical defect data, domain expertise. Świetnie uzupełnia specification-based (które bazuje na "happy path").'
  },
  {
    id: 18, cat: 'defects',
    q: 'Kto powinien ustalać severity defektu?',
    a: [
      'Tylko tester który zgłosił',
      'Tester proponuje (zna techniczny wpływ), ale finalna decyzja często z lead/PM którzy znają wpływ biznesowy. Często aktualizowane na triage',
      'Tylko PM',
      'Klient'
    ],
    correct: 1,
    expl: 'Severity to PROPOZYCJA testera oparta na widocznym technicznym impact. Ale ostateczna ocena uwzględnia kontekst biznesowy (jak często ta ścieżka jest używana?), regulacyjny (czy to złamie compliance?), reputacyjny. Dlatego na **triage** PM/lead potwierdza lub modyfikuje wartość.'
  },
  {
    id: 19, cat: 'defects',
    q: 'Dobry triage process zawiera:',
    a: [
      'Tylko klasyfikację priority',
      'Klasyfikacja (severity, priority, kategoria), deduplikacja, sprawdzenie reprodukcji, przypisanie ownera, decyzja o release‑target — z udziałem QA + PM + dev lead',
      'Tylko developerów',
      'Tylko code review'
    ],
    correct: 1,
    expl: 'Bug triage to wielopunktowy proces: **klasyfikacja** (severity, priority, area), **deduplikacja** (czy to znany bug?), **walidacja repro** (czy QA potwierdzi kroki?), **przypisanie** (właściciel fix), **release decision** (ten sprint, następny, won\'t fix). Regularność (codziennie/tygodniowo) > długość pojedynczego spotkania.'
  },

  // ===== PROCES / TEST ANALYST =====
  {
    id: 20, cat: 'process',
    q: 'Główna różnica Test Analyst vs Test Manager:',
    a: [
      'TA pisze testy, TM zarządza budżetem i zespołem (planowanie strategii, raportowanie, ryzyko, koordynacja stakeholderów)',
      'TA jest junior, TM senior',
      'TA pisze automatyzację, TM testy ręczne',
      'Brak różnic'
    ],
    correct: 0,
    expl: '**Test Analyst**: analizuje wymagania, projektuje test cases (using techniques), wykonuje testy, raportuje defekty. **Test Manager**: planuje strategię, alokuje zasoby, zarządza ryzykiem, komunikuje statusem, mentoruje. TA = tactical/operational, TM = strategic/managerial. CTAL ma osobne syllabusy dla obu ról.'
  },
  {
    id: 21, cat: 'process',
    q: 'Risk-based prioritization w testowaniu polega na:',
    a: [
      'Robieniu wszystkich testów po kolei',
      'Skupianiu testów na obszarach o najwyższym ryzyku (P × I): wysoka probability awarii × wysoki impact biznesowy → więcej testów, głębsze techniki',
      'Robieniu tylko negatywnych testów',
      'Pomijaniu testów niskiego priorytetu'
    ],
    correct: 1,
    expl: '**Risk = Probability × Impact**. Wysokie ryzyko → priorytetowo i głębiej (więcej technik, więcej krawędzi, większa próbka). Niskie ryzyko → smoke testing wystarczy. Identyfikacja ryzyk na warsztatach z PM/biznesem. Cel: optymalne wykorzystanie ograniczonego czasu testów.'
  },
  {
    id: 22, cat: 'process',
    q: 'Dobre praktyki przygotowania test data:',
    a: [
      'Tylko produkcyjne dane',
      'Mix syntetyczne + anonimizowane real, version-controlled, refreshable (reset do known state), pokrywające equivalence classes + boundary + negatywne, zgodne z GDPR',
      'Tylko hardcoded w testach',
      'Generowane losowo bez kontroli'
    ],
    correct: 1,
    expl: 'Dobre test data: **deterministic** (powtarzalne testy), **realistyczne** (anonimizowane prod data), **wersjonowane** (kod jako truth), **resetowane** (każdy test ma known starting state), **pokrywające klasy** (happy, edge, error). GDPR/compliance: nigdy real PII w testach poza prod.'
  },
  {
    id: 23, cat: 'process',
    q: 'Test environment considerations dla Test Analyst:',
    a: [
      'Nie obchodzi mnie',
      'Mirror prod ile się da (OS, browser, DB, sieć), control over data (refreshable), izolacja (testy nie wpływają na siebie), monitoring/logs, easy reset',
      'Tylko jeden environment dla wszystkich testów',
      'Tylko produkcja'
    ],
    correct: 1,
    expl: 'Test environment musi być **wiarygodne** (jak prod) i **kontrolowane** (powtarzalne). Klucz: izolacja testów (jeden test nie psuje danych drugiego), refresh between runs, dostęp do logów, monitoring. Często wąskie gardło projektów — mów o tym wcześnie z DevOps, nie na 3 dni przed release.'
  },

  // ===== DODATKOWE TECHNIKI =====
  {
    id: 24, cat: 'techniques',
    q: '3-point boundary value (na granicy + 1 poniżej + 1 powyżej) vs 2-point:',
    a: [
      'To samo',
      '2-point: tylko on/off (granica + 1 poza). 3-point: granica + 1 poniżej + 1 powyżej (bardziej dokładne, łapie off-by-one w obie strony, ale więcej test cases)',
      '3-point tylko dla integerów',
      '2-point jest deprecated'
    ],
    correct: 1,
    expl: '**2-point BVA** (ISTQB CTFL): wartość graniczna + jedna sąsiednia poza (dla zakresu 1-100: testuj 1, 0 i 100, 101). **3-point BVA** (CTAL-TA): granica + obie sąsiednie (1, 0, 2, 99, 100, 101). 3-point jest bardziej kompletny i wykrywa więcej typów off-by-one, ale ~50% więcej testów. Wybór zależy od ryzyka.'
  },
  {
    id: 25, cat: 'techniques',
    q: 'Dobry error guesser to ktoś, kto:',
    a: [
      'Pisze najwięcej test casów',
      'Zna domain (historical bugi), kod (gdzie zwykle pękają moduły), produkt (czemu klient klikał), używa heuristics i taxonomies. Doświadczenie + intuicja + struktura',
      'Pracuje najdłużej w firmie',
      'Tylko junior może być świeżym okiem'
    ],
    correct: 1,
    expl: '**Error guessing** to NIE losowe zgadywanie. Świetny error guesser opiera się na: **historical defect data** (czego było najwięcej?), **domain knowledge** (gdzie biznes mówi że pęka?), **technical knowledge** (które moduły są kruche?), **defect taxonomies** (co przeoczyłem?), **heuristics** (Whittaker attacks, SFDIPOT z James Bach). Doświadczenie + struktura, nie sama intuicja.'
  },
];

export const ISTQB_CTAL_TA: Cert = {
  id: 'istqb-ctal-ta',
  name: 'ISTQB Advanced — Test Analyst',
  shortName: 'CTAL-TA',
  categories: CATEGORIES,
  questions: QUESTIONS,
  examCount: 40,
  examDurationSec: 90 * 60, // CTAL: 90 min (więcej czasu niż CTFL)
  examPassPct: 65,
};
