import { useCallback, useEffect, useRef, useState, lazy, Suspense } from 'react';
import type {
  AppState,
  Cert,
  QuizMode,
  SessionState,
  SetupConfig,
  View,
} from './types';
import { DEFAULT_APP_STATE, isCorrectAnswer } from './types';
import { stateKeyForCert } from './data';
import { OFFICIAL_EXAM_META, loadExamSample, type ExamLetter } from './data/exam-sample-meta';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useAuth } from './hooks/useAuth';
import { shuffle, shuffleAnswers } from './utils/shuffle';
import {
  fetchCloudState,
  uploadCloudState,
  mergeAppStates,
} from './utils/syncState';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import QuizQuestion from './components/QuizQuestion';
import Timer from './components/Timer';
import ConfirmModal from './components/ConfirmModal';
import Toast from './components/Toast';
import InstallPrompt from './components/InstallPrompt';
import UpdatePrompt from './components/UpdatePrompt';

// Rzadziej używane komponenty — lazy-loadowane żeby zmniejszyć initial bundle.
// Każdy idzie do osobnego chunku, pobieranego dopiero gdy widok faktycznie potrzebuje.
const QuizSetup = lazy(() => import('./components/QuizSetup'));
const QuizResults = lazy(() => import('./components/QuizResults'));
const Flashcard = lazy(() => import('./components/Flashcard'));
const LoginModal = lazy(() => import('./components/LoginModal'));
const OnboardingModal = lazy(() => import('./components/OnboardingModal'));

const REVIEW_MAX = 30;
const TOAST_MS = 3000;
const SYNC_DEBOUNCE_MS = 1500;

type ToastState = { message: string; type: 'success' | 'danger' };

// Mapowanie mode → litera zbioru (dla lazy-loadowanych oficjalnych egzaminów).
function officialExamLetter(mode: QuizMode): ExamLetter | null {
  if (mode === 'official-exam') return 'A';
  if (mode === 'official-exam-b') return 'B';
  if (mode === 'official-exam-c') return 'C';
  if (mode === 'official-exam-d') return 'D';
  return null;
}

type Props = {
  cert: Cert;
  certs: Cert[];
  onSwitchCert: (certId: string) => void;
};

export default function App({ cert, certs, onSwitchCert }: Props) {
  const [appState, setAppState] = useLocalStorage<AppState>(
    stateKeyForCert(cert.id),
    DEFAULT_APP_STATE,
  );
  const {
    user,
    enabled: authEnabled,
    signInWithMagicLink,
    signInWithGoogle,
    signOut,
  } = useAuth();

  // Flag onboardingu: true gdy user już zobaczył kartę powitalną (zalogował się
  // albo świadomie kliknął "Kontynuuj bez logowania"). Nie pytamy ponownie.
  const [onboarded, setOnboarded] = useLocalStorage<boolean>(
    'qa_trainer_onboarded_v1',
    false,
  );
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(null);

  const [view, setView] = useState<View>('home');
  const [pendingMode, setPendingMode] = useState<QuizMode | null>(null);
  const [session, setSession] = useState<SessionState | null>(null);
  const [resetOpen, setResetOpen] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  // Loading state dla lazy-loadowanego oficjalnego egzaminu (litera A/B/C/D albo null).
  const [loadingExamLetter, setLoadingExamLetter] = useState<ExamLetter | null>(null);

  // Auth/sync state
  const [loginOpen, setLoginOpen] = useState(false);
  const [synced, setSynced] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const initialSyncRanRef = useRef(false);

  const showToast = (message: string, type: 'success' | 'danger' = 'success') => {
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    setToast({ message, type });
    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, TOAST_MS);
  };

  // cleanup timera przy unmount
  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  // --- Sync: initial fetch + merge (jednorazowy per cert mount, gdy user jest zalogowany)
  useEffect(() => {
    if (!user || initialSyncRanRef.current) return;
    initialSyncRanRef.current = true;
    let cancelled = false;
    setSyncing(true);

    (async () => {
      const cloud = await fetchCloudState(user.id, cert.id);
      if (cancelled) return;
      const merged = mergeAppStates(cloud, appState);
      setAppState(merged);
      await uploadCloudState(user.id, cert.id, merged);
      if (cancelled) return;
      setSynced(true);
      setSyncing(false);
      if (cloud) {
        const wrongCount = merged.wrongIds.length;
        const seenCount = Object.keys(merged.questionStats).length;
        showToast(`Pobrano postęp z chmury (${seenCount} pyt., ${wrongCount} powtórek)`);
      }
    })();

    return () => {
      cancelled = true;
    };
    // celowo bez appState — initial sync ma sie odpalic raz po login, nie po kazdej zmianie
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, cert.id]);

  // --- Sync: debounced upload przy zmianie stanu (gdy zalogowany i po initial sync)
  useEffect(() => {
    if (!user || !synced) return;
    setSyncing(true);
    const t = window.setTimeout(() => {
      uploadCloudState(user.id, cert.id, appState).finally(() => setSyncing(false));
    }, SYNC_DEBOUNCE_MS);
    return () => {
      window.clearTimeout(t);
      setSyncing(false);
    };
  }, [user, synced, cert.id, appState]);

  // --- Reset sync state przy wylogowaniu (next login = re-init)
  useEffect(() => {
    if (!user) {
      initialSyncRanRef.current = false;
      setSynced(false);
      setSyncing(false);
    }
  }, [user]);

  // --- Auth handlery
  const handleLogout = async () => {
    await signOut();
    showToast('Wylogowano');
  };

  // Po zalogowaniu automatycznie zamykamy onboarding (i nie pokazujemy więcej).
  useEffect(() => {
    if (user && !onboarded) setOnboarded(true);
  }, [user, onboarded, setOnboarded]);

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setGoogleError(null);
    const { error } = await signInWithGoogle();
    if (error) {
      setGoogleLoading(false);
      setGoogleError(error);
    }
    // Brak else — Supabase robi redirect; po powrocie user się ustawi
    // (onAuthStateChange) i useEffect powyżej ustawi onboarded=true.
    return { error };
  };

  const handleOnboardingSkip = () => {
    setOnboarded(true);
    setGoogleError(null);
  };

  const handleOnboardingEmail = () => {
    // Zamykamy onboarding (oznaczamy obeznanego) i otwieramy klasyczny LoginModal.
    setOnboarded(true);
    setLoginOpen(true);
  };

  // Pokaż onboarding tylko gdy: auth jest skonfigurowany + user nieosiągnięty
  // + flag w LS nieustawiony. Brak useState lokalnego — czytamy z LS.
  const onboardingOpen = authEnabled && !user && !onboarded;

  // --- Start ---
  const startMode = (mode: QuizMode) => {
    if (mode === 'exam') {
      beginQuiz('exam', { categories: [], count: cert.examCount });
      return;
    }
    // Oficjalny egzamin (A/B/C/D): stała pula, stała kolejność, brak setupu.
    // Pytania lazy-loadowane przez dynamic import — chunk per zbiór.
    const letter = officialExamLetter(mode);
    if (letter !== null) {
      if (loadingExamLetter !== null) return; // Zapobiegamy podwójnemu kliknięciu.
      setLoadingExamLetter(letter);
      loadExamSample(letter)
        .then((questions) => {
          setSession({
            mode,
            questions,
            currentIdx: 0,
            answers: new Array(questions.length).fill(null),
            answered: false,
            correctCount: 0,
            wrongCount: 0,
            startTime: Date.now(),
          });
          setView('quiz');
        })
        .catch((err) => {
          console.warn('[exam] load failed:', err);
          showToast('Nie udało się załadować egzaminu', 'danger');
        })
        .finally(() => {
          setLoadingExamLetter(null);
        });
      return;
    }
    if (mode === 'review' && appState.wrongIds.length === 0) return;
    setPendingMode(mode);
    setView('setup');
  };

  const beginQuiz = (mode: QuizMode, config: SetupConfig) => {
    let pool;
    if (mode === 'review') {
      pool = cert.questions.filter((q) => appState.wrongIds.includes(q.id));
    } else if (mode === 'exam') {
      pool = cert.questions;
    } else {
      pool =
        config.categories.length === 0
          ? cert.questions
          : cert.questions.filter((q) => config.categories.includes(q.cat));
    }
    // Tasujemy kolejność pytań + tasujemy opcje w każdym pytaniu (eliminuje bias B/C).
    const shuffled = shuffle(pool).slice(0, config.count).map(shuffleAnswers);
    setSession({
      mode,
      questions: shuffled,
      currentIdx: 0,
      answers: new Array(shuffled.length).fill(null),
      answered: false,
      correctCount: 0,
      wrongCount: 0,
      startTime: Date.now(),
    });
    setView('quiz');
  };

  // --- Quiz actions ---
  const selectAnswer = (idx: number) => {
    if (!session || session.answered) return;
    const q = session.questions[session.currentIdx];
    const isMulti = Array.isArray(q.correct);
    const expectedCount = isMulti ? (q.correct as number[]).length : 1;
    setSession({
      ...session,
      answers: session.answers.map((a, i) => {
        if (i !== session.currentIdx) return a;
        if (!isMulti) return idx;
        // multi-select: toggle; cap na expectedCount (FIFO przy przekroczeniu)
        const cur = Array.isArray(a) ? a : [];
        if (cur.includes(idx)) return cur.filter((x) => x !== idx);
        const next = [...cur, idx];
        return next.length > expectedCount ? next.slice(-expectedCount) : next;
      }),
    });
  };

  const recordAnswer = (questionId: number, isCorrect: boolean) => {
    setAppState((prev) => {
      const prevStat = prev.questionStats[questionId] ?? {
        attempts: 0,
        correct: 0,
        lastAttempt: 0,
        lastCorrect: false,
      };
      const newStat = {
        attempts: prevStat.attempts + 1,
        correct: prevStat.correct + (isCorrect ? 1 : 0),
        lastAttempt: Date.now(),
        lastCorrect: isCorrect,
      };
      const inWrong = prev.wrongIds.includes(questionId);
      const newWrongIds = isCorrect
        ? prev.wrongIds.filter((id) => id !== questionId)
        : inWrong
          ? prev.wrongIds
          : [...prev.wrongIds, questionId];
      return {
        ...prev,
        questionStats: { ...prev.questionStats, [questionId]: newStat },
        wrongIds: newWrongIds,
      };
    });
  };

  const submitAnswer = () => {
    if (!session || session.answered) return;
    if (session.mode === 'exam' || session.mode === 'official-exam' || session.mode === 'official-exam-b' || session.mode === 'official-exam-c' || session.mode === 'official-exam-d') return;
    const cur = session.answers[session.currentIdx];
    if (cur === null) return;
    const q = session.questions[session.currentIdx];
    // Dla multi-select: nie zatwierdzaj zanim user wybierze wszystkie oczekiwane.
    if (Array.isArray(q.correct)) {
      if (!Array.isArray(cur) || cur.length !== q.correct.length) return;
    }
    const isCorrect = isCorrectAnswer(cur, q.correct);
    recordAnswer(q.id, isCorrect);
    setSession({
      ...session,
      answered: true,
      correctCount: session.correctCount + (isCorrect ? 1 : 0),
      wrongCount: session.wrongCount + (isCorrect ? 0 : 1),
    });
  };

  const finishQuiz = useCallback(() => {
    setSession((s) => {
      if (!s || s.endTime) return s;
      let correctCount = s.correctCount;
      let wrongCount = s.wrongCount;
      const isAnyExam = s.mode === 'exam' || s.mode === 'official-exam' || s.mode === 'official-exam-b' || s.mode === 'official-exam-c' || s.mode === 'official-exam-d';
      if (isAnyExam) {
        correctCount = 0;
        wrongCount = 0;
        s.questions.forEach((q, i) => {
          const ans = s.answers[i];
          const isCorrect = isCorrectAnswer(ans, q.correct);
          if (isCorrect) correctCount += 1;
          else wrongCount += 1;
          // Personal stats (questionStats/wrongIds) tylko dla zwykłego egzaminu z puli cert.
          // Oficjalny egzamin ma izolowane statystyki — nie miesza z review.
          if (s.mode === 'exam') {
            recordAnswer(q.id, isCorrect);
          }
        });
      }
      const endTime = Date.now();
      return { ...s, correctCount, wrongCount, endTime };
    });
    setView('results');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goNext = () => {
    if (!session) return;
    const isLast = session.currentIdx === session.questions.length - 1;
    if (isLast) {
      finishQuiz();
      return;
    }
    setSession({
      ...session,
      currentIdx: session.currentIdx + 1,
      answered: false,
    });
  };

  const exitQuiz = () => {
    setExitOpen(false);
    setSession(null);
    setView('home');
  };

  const resetAll = () => {
    setAppState(DEFAULT_APP_STATE);
    setResetOpen(false);
    showToast('Postęp zresetowany');
  };

  // --- Fiszki: ocena karty (wiem / nie wiem) ---
  const rateFlashcard = (knew: boolean) => {
    if (!session || session.mode !== 'flashcards') return;
    const q = session.questions[session.currentIdx];
    recordAnswer(q.id, knew);
    const isLast = session.currentIdx === session.questions.length - 1;
    const newCorrect = session.correctCount + (knew ? 1 : 0);
    const newWrong = session.wrongCount + (knew ? 0 : 1);

    if (isLast) {
      // fiszki nie mają osobnego ekranu wyników — toast + powrót
      showToast(`Fiszki: ${newCorrect} wiem, ${newWrong} nie wiem`);
      setSession(null);
      setView('home');
      return;
    }

    setSession({
      ...session,
      currentIdx: session.currentIdx + 1,
      correctCount: newCorrect,
      wrongCount: newWrong,
    });
  };

  // --- Skróty klawiszowe (tylko w widoku quizu, pomijamy fiszki) ---
  // Trzymamy mutable ref na bieżący snapshot, żeby listener attachował się
  // tylko raz (nie re-mount przy każdym kliknięciu odpowiedzi). Modale blokują
  // klawiaturę — inaczej Enter w "Wyjdź z quizu?" wywoływałby goNext().
  const kbdStateRef = useRef({
    view,
    session,
    resetOpen,
    exitOpen,
    loginOpen,
  });
  kbdStateRef.current = { view, session, resetOpen, exitOpen, loginOpen };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const s = kbdStateRef.current;
      // Blokuj klawiaturę gdy modal jest otwarty — niech modal się sam obsłuży.
      if (s.resetOpen || s.exitOpen || s.loginOpen) return;
      if (s.view !== 'quiz' || !s.session) return;
      if (s.session.mode === 'flashcards') return;

      const k = e.key.toLowerCase();
      const mapping: Record<string, number> = {
        '1': 0, '2': 1, '3': 2, '4': 3, '5': 4,
        a: 0, b: 1, c: 2, d: 3, e: 4,
      };
      if (k in mapping) {
        const q = s.session.questions[s.session.currentIdx];
        if (mapping[k] >= q.a.length) return; // pytanie 4-opcyjne, klawisz E/5 nieaktywny
        e.preventDefault();
        if (!s.session.answered) selectAnswer(mapping[k]);
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        const isExamLike = s.session.mode === 'exam' || officialExamLetter(s.session.mode) !== null;
        if (isExamLike) {
          // Blokuj Enter gdy multi-correct i niepełny wybór (np. 1 z 2)
          const q = s.session.questions[s.session.currentIdx];
          const ans = s.session.answers[s.session.currentIdx];
          if (
            Array.isArray(q.correct) &&
            Array.isArray(ans) &&
            ans.length > 0 &&
            ans.length < q.correct.length
          ) return;
          goNext();
        } else if (!s.session.answered) {
          if (s.session.answers[s.session.currentIdx] !== null) submitAnswer();
        } else {
          goNext();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // Listener attachuje się raz; aktualne state-y czyta przez ref.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Render ---
  return (
    <div className="min-h-screen bg-bg text-text">
      <Header
        cert={cert}
        certs={certs}
        onSwitchCert={onSwitchCert}
        onReset={() => setResetOpen(true)}
        sessionActive={session !== null}
        onHome={() => {
          // Aktywna sesja: poproś o potwierdzenie (utracony progres), reuse modala "Wyjść z quizu?"
          if (session) {
            setExitOpen(true);
            return;
          }
          setPendingMode(null);
          setView('home');
        }}
        authEnabled={authEnabled}
        user={user}
        syncing={syncing}
        onLoginClick={() => setLoginOpen(true)}
        onLogout={handleLogout}
      />

      <UpdatePrompt />
      <InstallPrompt />

      {view === 'home' && (
        <Dashboard
          appState={appState}
          cert={cert}
          onStartMode={startMode}
          loadingExamLetter={loadingExamLetter}
        />
      )}

      <Suspense fallback={null}>
        {view === 'setup' && pendingMode && pendingMode !== 'exam' && pendingMode !== 'official-exam' && pendingMode !== 'official-exam-b' && pendingMode !== 'official-exam-c' && pendingMode !== 'official-exam-d' && (
          <QuizSetup
            mode={pendingMode}
            cert={cert}
            wrongIdsCount={appState.wrongIds.length}
            onCancel={() => {
              setPendingMode(null);
              setView('home');
            }}
            onStart={(config) => beginQuiz(pendingMode, config)}
          />
        )}

        {view === 'quiz' && session && session.mode === 'flashcards' && (
          <Flashcard
            question={session.questions[session.currentIdx]}
            categoryLabel={cert.categories[session.questions[session.currentIdx].cat] ?? session.questions[session.currentIdx].cat}
            currentIdx={session.currentIdx}
            total={session.questions.length}
            onRate={rateFlashcard}
            onExit={() => setExitOpen(true)}
          />
        )}
      </Suspense>

      {view === 'quiz' && session && session.mode !== 'flashcards' && (
        <QuizQuestion
          question={session.questions[session.currentIdx]}
          mode={session.mode}
          currentIdx={session.currentIdx}
          total={session.questions.length}
          selectedAnswer={session.answers[session.currentIdx]}
          answered={session.answered}
          onSelect={selectAnswer}
          onSubmit={submitAnswer}
          onNext={goNext}
          onExit={() => setExitOpen(true)}
          rightHeader={
            session.mode === 'exam' ? (
              <Timer
                startTime={session.startTime}
                durationSec={cert.examDurationSec}
                onTimeUp={finishQuiz}
              />
            ) : officialExamLetter(session.mode) !== null ? (
              <Timer
                startTime={session.startTime}
                durationSec={OFFICIAL_EXAM_META.durationSec}
                onTimeUp={finishQuiz}
              />
            ) : null
          }
        />
      )}

      {view === 'results' && session && (
        <Suspense fallback={null}>
        <QuizResults
          mode={session.mode}
          examPassPct={
            officialExamLetter(session.mode) !== null
              ? OFFICIAL_EXAM_META.passPct
              : cert.examPassPct
          }
          questions={session.questions}
          answers={session.answers}
          correctCount={session.correctCount}
          wrongCount={session.wrongCount}
          timeSec={Math.floor(
            ((session.endTime ?? Date.now()) - session.startTime) / 1000,
          )}
          hasWrong={session.wrongCount > 0}
          onReviewWrong={() => {
            if (appState.wrongIds.length === 0) {
              setSession(null);
              setView('home');
              return;
            }
            beginQuiz('review', {
              categories: [],
              count: Math.min(appState.wrongIds.length, REVIEW_MAX),
            });
          }}
          onHome={() => {
            setSession(null);
            setView('home');
          }}
        />
        </Suspense>
      )}

      <ConfirmModal
        open={resetOpen}
        title="Zresetować postęp?"
        message="Usunie statystyki, listę powtórek i wyniki egzaminów. Tej operacji nie można cofnąć."
        confirmLabel="Resetuj"
        danger
        onConfirm={resetAll}
        onCancel={() => setResetOpen(false)}
      />

      <ConfirmModal
        open={exitOpen}
        title="Wyjść z quizu?"
        message="Bieżący quiz nie zostanie zapisany."
        confirmLabel="Wyjdź"
        onConfirm={exitQuiz}
        onCancel={() => setExitOpen(false)}
      />

      <Suspense fallback={null}>
        {loginOpen && (
          <LoginModal
            open={loginOpen}
            onClose={() => setLoginOpen(false)}
            onSubmit={signInWithMagicLink}
            onGoogle={handleGoogleSignIn}
          />
        )}
        {onboardingOpen && (
          <OnboardingModal
            open={onboardingOpen}
            onGoogle={handleGoogleSignIn}
            onEmail={handleOnboardingEmail}
            onSkip={handleOnboardingSkip}
            loadingGoogle={googleLoading}
            googleError={googleError}
          />
        )}
      </Suspense>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
}
