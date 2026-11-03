create table courses (id uuid primary key default gen_random_uuid(), slug text unique not null, title text not null, published boolean default false);
insert into courses (slug,title,published) values ('mini-mba','Mini MBA',true);

create table applications (
  id uuid primary key default gen_random_uuid(), created_at timestamptz default now(),
  full_name text not null, email text not null, phone text not null,
  profession text, motivation text, course_slug text default 'mini-mba',
  status text default 'new' -- new | contacted | paid | rejected
);
alter table applications enable row level security;
create policy "anyone can apply" on applications for insert to anon with check (status = 'new');

create table access_codes (
  code text primary key, course_id uuid references courses(id),
  application_id uuid references applications(id),
  redeemed_by uuid references auth.users(id), redeemed_at timestamptz,
  expires_at timestamptz default now() + interval '30 days', revoked boolean default false
);
alter table access_codes enable row level security;  -- no policies: only the function below can touch it

create table enrollments (
  user_id uuid references auth.users(id), course_id uuid references courses(id),
  created_at timestamptz default now(), primary key (user_id, course_id)
);
alter table enrollments enable row level security;
create policy "own enrollments" on enrollments for select using (auth.uid() = user_id);

-- Student redeems a personal single-use code (must be logged in)
create or replace function redeem_code(p_code text) returns boolean
language plpgsql security definer set search_path = public as $$
declare c access_codes;
begin
  select * into c from access_codes where code = upper(trim(p_code)) for update;
  if not found or c.revoked or c.redeemed_by is not null or c.expires_at < now() or auth.uid() is null then
    return false; end if;
  update access_codes set redeemed_by = auth.uid(), redeemed_at = now() where code = c.code;
  insert into enrollments (user_id, course_id) values (auth.uid(), c.course_id) on conflict do nothing;
  return true;
end $$;
-- Later: lessons table with policy "exists (select 1 from enrollments e where e.user_id = auth.uid() and e.course_id = lessons.course_id)"
