# Portfolio Site

Personal portfolio built with Next.js 15, TypeScript, and Tailwind CSS.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
src/
├── app/              # App Router pages
├── components/       # Reusable UI components
├── data/             # Content data (projects, experiments, site config)
├── lib/              # Utilities
└── types/            # TypeScript interfaces
```

## Content

Edit data files to update content:

- `src/data/site.ts` — Site config, hero, about
- `src/data/projects.ts` — Project tree and **Notion page IDs**
- `src/data/lab.ts` — Lab experiments

## Notion CMS

Use the **official Notion integration token** in `.env.local` (`NOTION_TOKEN`). Pages must be shared with your integration.

Content is fetched via `notion-compat` + `@notionhq/client` and rendered with `react-notion-x`.

### Setup

1. Copy `.env.example` to `.env.local`
2. Add your Notion integration token and root page ID
3. In Notion, **Share to web** each page (required for `notion-client`)
4. Fill `pageId` in `src/data/projects.ts`
5. Discover IDs: `npm run notion:sync`

### Architecture

```
src/lib/notion.ts              → getNotionPage(pageId)
src/components/notion/
  NotionContent.tsx            → server fetch + error handling
  NotionPageRenderer.tsx       → react-notion-x client renderer
  NotionErrorState.tsx         → missing / 404 / permission errors
src/data/projects.ts           → slug + pageId config (single source of truth)
```

### Routes

All project content lives under `/projects/[...slug]`:

- `/projects/linktext`
- `/projects/xreal/gesture-interaction`
- `/projects/lab/ai-agent-simulator`

## Deploy

Deploy to [Vercel](https://vercel.com) with zero configuration.

```bash
npm run build
```
