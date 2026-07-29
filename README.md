<p align="center">
  <img src="./public/favicon.ico" width="56" alt="Portfolio Template logo" />
</p>

<h1 align="center">Portfolio Template</h1>

<p align="center">
  A bilingual, responsive portfolio for software professionals, built with
  Remix, React, TypeScript, Three.js, Tailwind CSS, and Framer Motion.
</p>

## Features

- English-first interface with a persistent Portuguese/English switch
- Responsive navigation, animated desktop dropdown, and mobile menu
- Light and dark themes
- WebGL particle sphere with browser fallbacks and reduced-motion support
- Professional history, achievements, projects, and skills sections
- Dedicated résumé, tools, and contact pages
- Optional EmailJS contact form
- Vercel-ready production configuration

## Requirements

- Node.js 22 or newer
- Bun 1.1.42 or newer

## Quick start

```bash
git clone https://github.com/your-username/your-portfolio.git
cd your-portfolio
bun install
cp .env.example .env
bun run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Customization

Start with these files:

| File | What to change |
| --- | --- |
| `app/config/site.ts` | Name, role, metadata, social links, and résumé path |
| `app/routes/_index.tsx` | Hero copy, timeline, achievements, and projects |
| `app/routes/uses.tsx` | Stack, tools, and workstation |
| `app/models/` | Project and skill data source |
| `app/tailwind.css` | Theme colors and global styles |
| `public/assets/` | Images, GIFs, favicon, and project artwork |

The included professional content is sample data. Replace it before publishing.

### Résumé

1. Add your PDF as `public/resume.pdf`.
2. Set `resumePath` to `"/resume.pdf"` in `app/config/site.ts`.
3. Optionally change `resumeDownloadName`.

Without a configured PDF, the résumé page displays a setup message instead of
a broken document viewer.

### Contact form

Create a `.env` file from `.env.example` and add your EmailJS values:

```dotenv
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

The form remains visible without these values and shows a configuration message
when submitted. No credentials are committed to the repository.

## Project structure

```text
app/
├── components/   Shared components and UI primitives
├── config/       Personal site settings
├── consts/       Presentation constants and icon mappings
├── cookies/      Theme session and persisted preferences
├── lib/          Shared contexts and utilities
├── models/       Domain data access
├── routes/       Remix routes and page content
├── services/     Server-side integrations
└── types/        Application and generated database types
public/           Static assets
supabase/         Optional local database configuration and migrations
```

Generated output, local environment files, and hosting metadata are ignored.

## Commands

```bash
bun run dev        # Start the development server
bun run typecheck  # Check TypeScript
bun run build      # Create a production build
bun run format     # Format the app directory with Biome
```

## Data layer

The repository ships with a no-network Supabase-compatible stub so the template
can run without credentials. Replace `app/services/supabase.server.ts` with a
real client when connecting a database, or replace the model functions with
local data.

## Deployment

The project includes the official Remix preset for Vercel. Import the
repository in Vercel and add the same environment variables from your local
`.env` before enabling the contact form or other external integrations.
