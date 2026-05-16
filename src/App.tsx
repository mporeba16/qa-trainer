import { useCallback, useEffect, useState } from 'react';
import type {
  AppState,
  QuizMode,
  SessionState,
  SetupConfig,
  View,
} from './types';
import { DEFAULT_APP_STATE } from './types';
import { QUESTIONS } from './data/questions';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';
import { shuffle } from './utils/shuffle';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import QuizSetup from './components/QuizSetup';
import QuizQuestion from './components/QuizQuestion';
import QuizResults from './components/QuizResults';
import Timer from './components/Timer';
import ConfirmModal from './components/ConfirmModal';

const EXAM_DURATION_SEC = 60 * 60;
const EXAM_COUNT = 40;
const EXAM_PASS = 65;
const REVIEW_MAX = 30;

export default function App() {
  const [appState, setAppState] = useLocalStorage<AppState>(
    'qa_trainer_v1',
    DEFAULT_APP_STATE,
  );
  const { theme, toggleTheme } = useTheme();

  const [view, setView] = useState<View>('home');
  const [pendingMode, setPendingMode] = useState<QuizMode | null>(null);
  const [session, setSession] = useState<SessionState | null>(null);
  const [resetOpen, setResetOpen] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);

  // --- Start ---
  const startMode = (mode: QuizMode) => {
    if (mode === 'exam') {
      beginQuiz('exam', { categories: [], count: EXAM_COUNT });
      return;
    }
    if (mode === 'review' && appState.wrongIds.length === 0) return;
    setPendingMode(mode);
    setView('setup');
  };

  const beginQuiz = (mode: QuizMode, config: SetupConfig) => {
    let pool;
    if (mode === 'review') {
      pool = QUESTIONS.filter((q) => appState.wrongIds.includes(q.id));
    } else if (mode === 'exam') {
      pool = QUESTIONS;
    } else {
      pool =
        config.categories.length === 0
          ? QUESTIONS
          : QUESTIONS.filter((q) => config.categories.includes(q.cat));
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
        // exam: zliczamy + zapisujemy wszystko dopiero teraz
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
      // sesje + statystyki egzaminów
      setAppState((prev) => {
        const pct =
          s.questions.length === 0
            ? 0
            : (correctCount / s.questions.length) * 100;
        const isExamPass = s.mode === 'exam' && pct >= EXAM_PASS;
        return {
          ...prev,
          stats: {
            ...prev.stats,
            sessions: prev.stats.sessions + 1,
            examsAttempted:
              prev.stats.examsAttempted + (s.mode === 'exam' ? 1 : 0),
            examsPassed: prev.stats.examsPassed + (isExamPass ? 1 : 0),
          },
        };
      });
      return { ...s, correctCount, wrongCount, endTime: Date.now() };
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
  };

  // --- Skróty klawiszowe (tylko w widoku quizu) ---
  useEffect(() => {
    if (view !== 'quiz' || !session) return;
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
    // selectAnswer/submitAnswer/goNext są closure'ami nad `session` — wystarczy re-bind przy zmianie session
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, session]);

  // --- Render ---
  return (
    <div className="min-h-screen bg-bg text-text">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onReset={() => setResetOpen(true)}
      />

      {view === 'home' && (
        <Dashboard appState={appState} onStartMode={startMode} />
      )}

      {view === 'setup' && pendingMode && pendingMode !== 'exam' && (
        <QuizSetup
          mode={pendingMode}
          wrongIdsCount={appState.wrongIds.length}
          onCancel={() => {
            setPendingMode(null);
            setView('home');
          }}
          onStart={(config) => beginQuiz(pendingMode, config)}
        />
      )}

      {view === 'quiz' && session && (
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
                durationSec={EXAM_DURATION_SEC}
                onTimeUp={finishQuiz}
              />
            ) : null
          }
        />
      )}

      {view === 'results' && session && (
        <QuizResults
          mode={session.mode}
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
    </div>
  );
}
