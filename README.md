# Mini MBA platform (Next.js + Supabase + Vercel)
1. Supabase: create a project, run `supabase/schema.sql` in the SQL editor.
2. Copy `.env.example` to `.env.local` and fill in your URL and anon key.
3. `npm install && npm run dev`
4. Deploy: push to GitHub, import in Vercel, add the same two env vars.
Applications appear in Supabase > Table editor > applications.
Generate a code per paid student: insert into access_codes (code, course_id, application_id) values ('MBA-7K4Q-X9PD', '<course id>', '<application id>');

## Simple workflow (no SQL needed)
1. Run `supabase/update.sql` once. 2. Add env vars in Vercel: SUPABASE_SERVICE_ROLE_KEY (type Secret), ADMIN_PASSWORD, NEXT_PUBLIC_SITE_URL.
3. Admin: /admin (applications, one-click code + WhatsApp, lessons). Students: /acces (email + code) then /cours.
