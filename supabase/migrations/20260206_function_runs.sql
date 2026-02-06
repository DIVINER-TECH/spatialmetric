create extension if not exists pgcrypto;

create table if not exists function_runs (
  id uuid primary key default gen_random_uuid(),
  function_name text not null,
  executed_at timestamptz not null default now(),
  status text not null,
  duration_ms integer,
  details jsonb,
  created_at timestamptz not null default now()
);

create index if not exists function_runs_function_name_idx
  on function_runs (function_name);

create index if not exists function_runs_executed_at_idx
  on function_runs (executed_at desc);
