create extension if not exists pgcrypto;

create table if not exists content_items (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  title text not null,
  excerpt text,
  content text,
  tags text[],
  sources jsonb,
  metadata jsonb,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists content_items_type_idx
  on content_items (type);

create index if not exists content_items_published_at_idx
  on content_items (published_at desc);

alter table content_items enable row level security;
drop policy if exists "Content items are readable by everyone" on content_items;
create policy "Content items are readable by everyone"
  on content_items for select
  using (true);
