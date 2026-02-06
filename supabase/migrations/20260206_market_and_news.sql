create extension if not exists pgcrypto;

create table if not exists market_daily_snapshots (
  id uuid primary key default gen_random_uuid(),
  as_of_date date not null unique,
  data jsonb not null,
  sources jsonb,
  created_at timestamptz not null default now()
);

create index if not exists market_daily_snapshots_as_of_date_idx
  on market_daily_snapshots (as_of_date desc);

alter table market_daily_snapshots enable row level security;
drop policy if exists "Market snapshots are readable by everyone" on market_daily_snapshots;
create policy "Market snapshots are readable by everyone"
  on market_daily_snapshots for select
  using (true);

create table if not exists news_sources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  feed_url text not null unique,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists news_items (
  id uuid primary key default gen_random_uuid(),
  source_id uuid references news_sources(id) on delete set null,
  title text not null,
  url text not null unique,
  summary text,
  published_at timestamptz,
  fetched_at timestamptz not null default now()
);

create index if not exists news_items_published_at_idx
  on news_items (published_at desc);

alter table news_sources enable row level security;
alter table news_items enable row level security;

drop policy if exists "News sources are readable by everyone" on news_sources;
create policy "News sources are readable by everyone"
  on news_sources for select
  using (true);

drop policy if exists "News items are readable by everyone" on news_items;
create policy "News items are readable by everyone"
  on news_items for select
  using (true);

insert into news_sources (name, feed_url) values
  ('Road to VR', 'https://www.roadtovr.com/feed/'),
  ('UploadVR', 'https://uploadvr.com/feed/'),
  ('TechCrunch VR', 'https://techcrunch.com/tag/virtual-reality/feed/')
on conflict (feed_url) do nothing;
