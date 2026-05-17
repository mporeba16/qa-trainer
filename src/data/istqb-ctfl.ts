import type { Cert } from '../types';
import { CATEGORIES, QUESTIONS } from './questions';

// ISTQB Certified Tester Foundation Level — domyślny cert aplikacji.
// Klucz LS stanu pozostaje 'qa_trainer_v1' (backward compat dla istniejących
// użytkowników, którzy już mają tu zapisany progres).
export const ISTQB_CTFL: Cert = {
  id: 'istqb-ctfl',
  name: 'ISTQB Foundation Level',
  shortName: 'CTFL',
  categories: CATEGORIES,
  questions: QUESTIONS,
  examCount: 40,
  examDurationSec: 60 * 60,
  examPassPct: 65,
};
