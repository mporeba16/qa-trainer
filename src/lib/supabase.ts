import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Env vars sa opcjonalne — bez nich aplikacja dziala lokalnie (sam localStorage),
// tylko z ukrytym przyciskiem logowania i bez sync. To pozwala robic lokalny
// dev bez .env i nie zlamac produkcji jesli ktos zapomni dodac env vars w Netlify.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase: SupabaseClient | null =
  url && key ? createClient(url, key) : null;

export const supabaseEnabled = supabase !== null;

if (!supabaseEnabled && import.meta.env.DEV) {
  console.warn(
    '[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY not set — running in offline-only mode (no login, no sync).',
  );
}
