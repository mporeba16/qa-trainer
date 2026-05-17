import type { AppState, QuestionStat, SessionRecord } from '../types';
import { supabase } from '../lib/supabase';

// =============================================================================
// Fetch / Upsert (per cert)
// =============================================================================

// Pobiera stan jednego certa z Supabase. Zwraca null gdy brak wiersza lub klucza.
export async function fetchCloudState(
  userId: string,
  certId: string,
): Promise<AppState | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('user_progress')
    .select('state')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) {
    console.warn('[sync] fetchCloudState error:', error.message);
    return null;
  }
  const state = data?.state as Record<string, AppState> | undefined;
  return (state?.[certId] ?? null);
}

// Zapisuje stan jednego certa do Supabase. Zachowuje stany innych certow
// (fetch + merge + upsert; race-condition-free na single user, OK dla MVP).
export async function uploadCloudState(
  userId: string,
  certId: string,
  appState: AppState,
): Promise<void> {
  if (!supabase) return;
  const { data, error: fetchErr } = await supabase
    .from('user_progress')
    .select('state')
    .eq('user_id', userId)
    .maybeSingle();
  if (fetchErr) {
    console.warn('[sync] uploadCloudState pre-fetch error:', fetchErr.message);
    return;
  }
  const existing = (data?.state as Record<string, AppState> | undefined) ?? {};
  const next = { ...existing, [certId]: appState };

  const { error } = await supabase
    .from('user_progress')
    .upsert({ user_id: userId, state: next, updated_at: new Date().toISOString() });
  if (error) {
    console.warn('[sync] uploadCloudState error:', error.message);
  }
}

// =============================================================================
// Merge — dla pierwszego sync (gdy user ma dane i w LS, i w chmurze)
// =============================================================================

// "Smart merge": preferuje wieksze wartosci, union dla list, dedup po timestamp.
// Bez tego pierwszy login by nadpisal historie ktoregos zrodla.
export function mergeAppStates(cloud: AppState | null, local: AppState): AppState {
  if (!cloud) return local;
  return {
    stats: {
      totalAnswered: Math.max(cloud.stats.totalAnswered ?? 0, local.stats.totalAnswered ?? 0),
      totalCorrect: Math.max(cloud.stats.totalCorrect ?? 0, local.stats.totalCorrect ?? 0),
      sessions: Math.max(cloud.stats.sessions ?? 0, local.stats.sessions ?? 0),
      examsAttempted: Math.max(cloud.stats.examsAttempted ?? 0, local.stats.examsAttempted ?? 0),
      examsPassed: Math.max(cloud.stats.examsPassed ?? 0, local.stats.examsPassed ?? 0),
      totalTimeSec: Math.max(cloud.stats.totalTimeSec ?? 0, local.stats.totalTimeSec ?? 0),
    },
    questionStats: mergeQuestionStats(cloud.questionStats, local.questionStats),
    wrongIds: Array.from(new Set([...cloud.wrongIds, ...local.wrongIds])),
    sessionHistory: dedupSessionHistory([
      ...(cloud.sessionHistory ?? []),
      ...(local.sessionHistory ?? []),
    ]),
  };
}

function mergeQuestionStats(
  cloud: Record<number, QuestionStat>,
  local: Record<number, QuestionStat>,
): Record<number, QuestionStat> {
  const result: Record<number, QuestionStat> = { ...cloud };
  for (const [key, stat] of Object.entries(local)) {
    const id = Number(key);
    const existing = result[id];
    if (!existing) {
      result[id] = stat;
      continue;
    }
    // bierzemy wieksze counters + lastCorrect z nowszej proby
    const newer = stat.lastAttempt > existing.lastAttempt ? stat : existing;
    result[id] = {
      attempts: Math.max(existing.attempts, stat.attempts),
      correct: Math.max(existing.correct, stat.correct),
      lastAttempt: newer.lastAttempt,
      lastCorrect: newer.lastCorrect,
    };
  }
  return result;
}

function dedupSessionHistory(records: SessionRecord[]): SessionRecord[] {
  const seen = new Set<string>();
  const sorted = [...records].sort((a, b) => a.timestamp - b.timestamp);
  const result: SessionRecord[] = [];
  for (const rec of sorted) {
    const key = `${rec.timestamp}|${rec.mode}|${rec.total}|${rec.correct}`;
    if (!seen.has(key)) {
      seen.add(key);
      result.push(rec);
    }
  }
  return result;
}
