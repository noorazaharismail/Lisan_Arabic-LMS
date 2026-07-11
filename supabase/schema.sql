-- Lisān optional cloud sync schema
-- Apply only after choosing a dedicated / explicitly approved Supabase project.
-- Use a publishable key in the browser; never expose service_role.

create table if not exists public.learner_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.learner_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.practice_recordings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  storage_path text not null unique,
  passage_key text not null,
  duration_ms integer check (duration_ms is null or duration_ms >= 0),
  created_at timestamptz not null default now()
);

alter table public.learner_profiles enable row level security;
alter table public.learner_progress enable row level security;
alter table public.practice_recordings enable row level security;

-- Ownership policies. UPDATE uses both USING and WITH CHECK.
create policy "learner profiles own rows" on public.learner_profiles
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "learner progress own rows" on public.learner_progress
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "recording metadata own rows" on public.practice_recordings
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- If you create the Storage bucket `lisan-recordings`, add policies that restrict
-- object ownership to the authenticated user prefix: <auth.uid()>/<file>.
-- Test all policies with a non-owner account before enabling cloud audio upload.
