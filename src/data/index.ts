import type { Cert } from '../types';
import { ISTQB_CTFL } from './istqb-ctfl';
import { ISTQB_CTAL_TA } from './istqb-ctal-ta';

// Rejestr wszystkich dostępnych certyfikacji w aplikacji.
// Kolejność = kolejność w switcherze. Pierwszy element to default dla nowych użytkowników.
export const CERTS: Cert[] = [ISTQB_CTFL, ISTQB_CTAL_TA];

// Klucz LS dla statystyk per cert. Dla CTFL używamy starego klucza
// (backward compat dla istniejących użytkowników); dla pozostałych prefix + id.
export function stateKeyForCert(certId: string): string {
  return certId === 'istqb-ctfl' ? 'qa_trainer_v1' : `qa_trainer_state_v1_${certId}`;
}
