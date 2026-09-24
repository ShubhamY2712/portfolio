# Shubham Yawalkar — Portfolio (with live admin dashboard)

Built with Next.js, Tailwind CSS, Motion, and Supabase (database + auth + file storage).

Anyone with the link sees a read-only public site. Only you, logged in at
`/admin`, can edit content, add/remove items, and upload files — no code
editing needed after initial setup.

## One-time setup

1. Create a free project at supabase.com.
2. In your Supabase project's SQL Editor, run `supabase/schema.sql`, then
   run `supabase/seed.sql` (in that order) — this creates every table and
   pre-fills it with your real content.
3. In Supabase: Authentication -> Users -> Add user. Create the one account
   you'll use to log in at `/admin`. Nobody else can create an account —
   there's no public sign-up.
4. Copy `.env.local.example` to `.env.local` and fill in your Supabase URL
   and anon key (Settings -> API in your Supabase dashboard).
5. Run `npm install`, then `npm run dev`. Visit `localhost:3000` for the
   public site, `localhost:3000/admin` to log in and edit.

## Deploying

Push to GitHub, import into Vercel, and add the same two environment
variables from `.env.local` in Vercel's project settings (Settings ->
Environment Variables) before deploying.

## Editing content going forward

Everything — Summary, Skills, Achievements, Certifications, both Projects,
your photo, resume, and PRDs — is edited at `/admin` on the live site
itself. You should never need to touch code again for a content change.
