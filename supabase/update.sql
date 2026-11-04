-- Run once in Supabase SQL Editor (adds lessons)
create table if not exists lessons (
  id uuid primary key default gen_random_uuid(), course_id uuid references courses(id),
  title text not null, video_url text not null, created_at timestamptz default now());
alter table lessons enable row level security; -- no policies: only the server (service key) can read it
