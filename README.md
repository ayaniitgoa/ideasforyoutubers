# Ideas For Youtubers

Public site: [www.ideasforyoutubers.com](https://www.ideasforyoutubers.com)

A public board for YouTube video ideas. Browse a roster of channels, open one, and add a title plus notes. Tagline: **What should they make next? You decide.**

This is not a generic prompt list. Ideas sit on a real channel page.

## What it does

- Search, filter (Gaming / Entertainment), and sort the roster
- Open a channel, add an idea, confirm it
- About, privacy, terms, and contact pages
- `robots.txt` and a generated `/sitemap.xml`

There are no accounts, votes, or private drafts. Submitted ideas are public.

## Stack

- Next.js 16 (App Router) and React 19
- Tailwind CSS 4
- Supabase (channel roster + ideas)
- Hosted at `https://www.ideasforyoutubers.com`

## Pages

| Path | What it is |
| --- | --- |
| `/` | Channel roster and FAQ |
| `/{slug}` | Channel page and idea form |
| `/about` | About us |
| `/privacy-policy` | Privacy policy |
| `/terms-and-conditions` | Terms and conditions |
| `/contact` | Contact us |
| `/sitemap.xml` | XML sitemap |
| `/robots.txt` | Crawler rules + sitemap link |

## Local setup

```bash
npm install
```

Create `.env.local` (this file is gitignored):

```bash
NEXT_PUBLIC_SITE_URL=https://www.ideasforyoutubers.com
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT.supabase.co:5432/postgres
```

`DATABASE_URL` is only needed to seed the database. URL-encode special characters in the password (for example `@` as `%40`).

Create tables and seed the 200-channel roster from `src/data/youtubers.json`:

```bash
npm run db:setup
```

Start the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Set the same `NEXT_PUBLIC_*` variables on Vercel (or your host). Attach `www.ideasforyoutubers.com` as the production domain. Apex `ideasforyoutubers.com` redirects to `www`.
