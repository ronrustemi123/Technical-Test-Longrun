# LongRun Inventory Dashboard

A product inventory management system with server-side filtering, sorting, and pagination using React 19, React Router v7 (data mode), Zustand, and Supabase.

## Tech Stack

- **React 19** + **TypeScript**
- **React Router v7** (data mode — loader pattern)
- **Zustand** — client-side filter/sort/page state
- **Supabase** — PostgreSQL with PostgREST (server-side queries)
- **Tailwind CSS v4** + **shadcn/ui**

## Architecture

Every filter, sort, and pagination operation runs **server-side** via a single Supabase query using `.ilike()`, `.eq()`, `.gte()`, `.lte()`, `.order()`, and `.range()`. The client never fetches more data than the current page (10 rows).

State flows: **Zustand → React Router loader → Supabase → component**.

## Setup

1. Clone and install:
```bash
   npm install
```

2. Copy `.env.example` to `.env` and fill in your Supabase credentials.

3. Run the SQL scripts in `sql/` against your Supabase project (table, seed).

4. Start dev server:
```bash
   npm run dev
```

## Features

- Server-side search, category, price range, and stock filters
- Server-side sorting on all columns (toggle asc/desc)
- Server-side pagination (10/page) with smart page number display
- URL-synced state (shareable, bookmarkable links)
- Active filter chips with individual removal
- Loading skeleton during navigation transitions
- Responsive layout (sidebar collapses on mobile)
