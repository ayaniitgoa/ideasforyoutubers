create extension if not exists pgcrypto;

create table if not exists public.youtubers (
  id text primary key,
  slug text not null unique,
  category text not null check (category in ('Gaming', 'Entertainment')),
  url text not null,
  image text not null,
  channel text not null,
  subscribers_label text not null,
  views_label text not null,
  videos_label text not null,
  subscribers bigint not null default 0,
  views bigint not null default 0,
  videos integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.ideas (
  id uuid primary key default gen_random_uuid(),
  youtuber_id text not null references public.youtubers (id) on delete cascade,
  title text not null,
  notes text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists ideas_youtuber_id_created_at_idx
  on public.ideas (youtuber_id, created_at desc);

alter table public.youtubers enable row level security;
alter table public.ideas enable row level security;

drop policy if exists "Public read youtubers" on public.youtubers;
create policy "Public read youtubers"
  on public.youtubers
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Public read ideas" on public.ideas;
create policy "Public read ideas"
  on public.ideas
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Public insert ideas" on public.ideas;
create policy "Public insert ideas"
  on public.ideas
  for insert
  to anon, authenticated
  with check (true);

grant usage on schema public to anon, authenticated;
grant select on public.youtubers to anon, authenticated;
grant select, insert on public.ideas to anon, authenticated;
