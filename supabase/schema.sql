-- QA Trainer - schema bazy.
--
-- Jak uzyc: w Supabase Dashboard -> SQL Editor -> wklej cala zawartosc -> Run.
-- Caly skrypt jest idempotentny (mozna uruchamiac wiele razy).
--
-- Model: jeden wiersz na uzytkownika, JSONB trzyma stan wszystkich certyfikacji
-- (kluczem jest cert.id, wartoscia AppState). Prosty, latwy do synchronizacji,
-- nie wymaga migracji przy zmianach ksztaltu AppState.

-- =============================================================================
-- Tabela: user_progress
-- =============================================================================

create table if not exists public.user_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

comment on table public.user_progress is
  'Per-user state aplikacji QA Trainer. state = { certId: AppState }';

-- =============================================================================
-- Row Level Security (RLS) - kazdy uzytkownik widzi/edytuje tylko swoje dane
-- =============================================================================

alter table public.user_progress enable row level security;

-- SELECT
drop policy if exists "Users can read their own progress" on public.user_progress;
create policy "Users can read their own progress"
  on public.user_progress for select
  using (auth.uid() = user_id);

-- INSERT
drop policy if exists "Users can insert their own progress" on public.user_progress;
create policy "Users can insert their own progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

-- UPDATE
drop policy if exists "Users can update their own progress" on public.user_progress;
create policy "Users can update their own progress"
  on public.user_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- DELETE (na przyszlosc: "zapomnij o mnie")
drop policy if exists "Users can delete their own progress" on public.user_progress;
create policy "Users can delete their own progress"
  on public.user_progress for delete
  using (auth.uid() = user_id);

-- =============================================================================
-- Trigger: auto-update updated_at
-- =============================================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_updated_at on public.user_progress;
create trigger set_updated_at
  before update on public.user_progress
  for each row
  execute function public.set_updated_at();
