import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  AppState,
  Cert,
  QuizMode,
  SessionRecord,
  SessionState,
  SetupConfig,
  View,
} from './types';
import { DEFAULT_APP_STATE } from './types';
import { stateKeyForCert } from './data';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';
import { useAuth } from './hooks/useAuth';
import { shuffle } from './utils/shuffle';
import { exportProgress } from './utils/progressIO';
import {
  fetchCloudState,
  uploadCloudState,
  mergeAppStates,
} from './utils/syncState';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import QuizSetup from './components/QuizSetup';
import QuizQuestion from './components/QuizQuestion';
import QuizResults from './components/QuizResults';
import Flashcard from './components/Flashcard';
import Timer from './components/Timer';
import ConfirmModal from './components/ConfirmModal';
import Toast from './components/Toast';
import InstallPrompt from './components/InstallPrompt';
import LoginModal from './components/LoginModal';

const REVIEW_MAX = 30;
const TOAST_MS = 3000;
const SYNC_DEBOUNCE_MS = 1500;

type ToastState = { message: string; type: 'success' | 'danger' };

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
  const { theme, toggleTheme } = useTheme();
  const {
    user,
    enabled: authEnabled,
    signInWithMagicLink,
    signOut,
  } = useAuth();

  const [view, setView] = useState<View>('home');
  const [pendingMode, setPendingMode] = useState<QuizMode | null>(null);
  const [session, setSession] = useState<SessionState | null>(null);
  const [resetOpen, setResetOpen] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const [pendingImport, setPendingImport] = useState<AppState | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);
  const toastTimerRef = useRef<number | null>(null);

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
        showToast(`Pobrano postęp z chmury (${merged.stats.totalAnswered} odp.)`);
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

  // --- Start ---
  const startMode = (mode: QuizMode) => {
    if (mode === 'exam') {
      beginQuiz('exam', { categories: [], count: cert.examCount });
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
    const shuffled = shuffle(pool).slice(0, config.count);
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
    setSession({
      ...session,
      answers: session.answers.map((a, i) =>
        i === session.currentIdx ? idx : a,
      ),
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
        stats: {
          ...prev.stats,
          totalAnswered: prev.stats.totalAnswered + 1,
          totalCorrect: prev.stats.totalCorrect + (isCorrect ? 1 : 0),
        },
        questionStats: { ...prev.questionStats, [questionId]: newStat },
        wrongIds: newWrongIds,
      };
    });
  };

  const submitAnswer = () => {
    if (!session || session.mode === 'exam' || session.answered) return;
    const cur = session.answers[session.currentIdx];
    if (cur === null) return;
    const q = session.questions[session.currentIdx];
    const isCorrect = cur === q.correct;
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
      if (s.mode === 'exam') {
        correctCount = 0;
        wrongCount = 0;
        s.questions.forEach((q, i) => {
          const ans = s.answers[i];
          const isCorrect = ans === q.correct;
          if (isCorrect) correctCount += 1;
          else wrongCount += 1;
          recordAnswer(q.id, isCorrect);
        });
      }
      const endTime = Date.now();
      const durationSec = Math.max(0, Math.floor((endTime - s.startTime) / 1000));
      setAppState((prev) => {
        const pct =
          s.questions.length === 0
            ? 0
            : (correctCount / s.questions.length) * 100;
        const isExamPass = s.mode === 'exam' && pct >= cert.examPassPct;
        const newRecord: SessionRecord = {
          timestamp: endTime,
          mode: s.mode,
          total: s.questions.length,
          correct: correctCount,
        };
        return {
          ...prev,
          stats: {
            ...prev.stats,
            sessions: prev.stats.sessions + 1,
            examsAttempted:
              prev.stats.examsAttempted + (s.mode === 'exam' ? 1 : 0),
            examsPassed: prev.stats.examsPassed + (isExamPass ? 1 : 0),
            totalTimeSec: (prev.stats.totalTimeSec ?? 0) + durationSec,
          },
          sessionHistory: [...(prev.sessionHistory ?? []), newRecord],
        };
      });
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

  // --- Backup: eksport / import ---
  const handleExport = () => {
    exportProgress(appState);
    showToast('Backup pobrany');
  };

  const handleImportRequest = (state: AppState) => {
    setPendingImport(state);
  };

  const confirmImport = () => {
    if (!pendingImport) return;
    const count = pendingImport.stats.totalAnswered;
    setAppState(pendingImport);
    setPendingImport(null);
    showToast(`Zaimportowano backup (${count} odp.)`);
  };

  const handleImportError = () => {
    showToast('Niepoprawny plik backupu', 'danger');
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
      const endTime = Date.now();
      const durationSec = Math.max(0, Math.floor((endTime - session.startTime) / 1000));
      setAppState((prev) => {
        const newRecord: SessionRecord = {
          timestamp: endTime,
          mode: 'flashcards',
          total: session.questions.length,
          correct: newCorrect,
        };
        return {
          ...prev,
          stats: {
            ...prev.stats,
            sessions: prev.stats.sessions + 1,
            totalTimeSec: (prev.stats.totalTimeSec ?? 0) + durationSec,
          },
          sessionHistory: [...(prev.sessionHistory ?? []), newRecord],
        };
      });
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
  useEffect(() => {
    if (view !== 'quiz' || !session) return;
    if (session.mode === 'flashcards') return;
    const handler = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const mapping: Record<string, number> = {
        '1': 0,
        '2': 1,
        '3': 2,
        '4': 3,
        a: 0,
        b: 1,
        c: 2,
        d: 3,
      };
      if (k in mapping) {
        e.preventDefault();
        if (!session.answered) selectAnswer(mapping[k]);
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        if (session.mode === 'exam') {
          goNext();
        } else if (!session.answered) {
          if (session.answers[session.currentIdx] !== null) submitAnswer();
        } else {
          goNext();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, session]);

  // --- Render ---
  return (
    <div className="min-h-screen bg-bg text-text">
      <Header
        cert={cert}
        certs={certs}
        onSwitchCert={onSwitchCert}
        theme={theme}
        onToggleTheme={toggleTheme}
        onReset={() => setResetOpen(true)}
        authEnabled={authEnabled}
        user={user}
        syncing={syncing}
        onLoginClick={() => setLoginOpen(true)}
        onLogout={handleLogout}
      />

      <InstallPrompt />

      {view === 'home' && (
        <Dashboard
          appState={appState}
          cert={cert}
          onStartMode={startMode}
          onExport={handleExport}
          onImport={handleImportRequest}
          onImportError={handleImportError}
        />
      )}

      {view === 'setup' && pendingMode && pendingMode !== 'exam' && (
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
            ) : null
          }
        />
      )}

      {view === 'results' && session && (
        <QuizResults
          mode={session.mode}
          examPassPct={cert.examPassPct}
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

      <ConfirmModal
        open={pendingImport !== null}
        title="Nadpisać postęp?"
        message={
          pendingImport
            ? `Backup zastąpi obecne staty (${pendingImport.stats.totalAnswered} odp., ${pendingImport.wrongIds.length} powtórek).`
            : ''
        }
        confirmLabel="Importuj"
        danger
        onConfirm={confirmImport}
        onCancel={() => setPendingImport(null)}
      />

      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSubmit={signInWithMagicLink}
      />

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
