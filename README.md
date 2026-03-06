# Tokis Website

[![GitHub](https://img.shields.io/badge/GitHub-PrerakMathur20%2FTokisWebsite-181717?logo=github)](https://github.com/PrerakMathur20/TokisWebsite)
[![Deploy](https://github.com/PrerakMathur20/TokisWebsite/actions/workflows/deploy.yml/badge.svg)](https://github.com/PrerakMathur20/TokisWebsite/actions/workflows/deploy.yml)

Documentation and playground for [Tokis](https://prerakmathur20.github.io/TokisWebsite/) — *Tokis Only Knows Its Styles*, a performance-first, token-native UI design system for React.

## Prerequisites

- Node.js 18+ (or 20/22)
- The [`TokisLib`](../TokisLib) monorepo must be present as a sibling directory and its packages must be built

```
Synu/
├── TokisLib/      ← library source (sibling, required)
└── TokisWebsite/  ← this project
```

## Getting Started

```bash
# 1. Build the library first (from TokisLib/)
cd ../TokisLib
npm install
npm run build

# 2. Install website dependencies
cd ../TokisWebsite
npm install

# 3. Start the dev server
npm run dev
```

The site will be available at `http://localhost:5173`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |

## Project Structure

```
src/
├── components/       # Layout, navbar, sidebar, TOC, search
├── pages/            # Route-level page components
│   └── docs/         # Individual documentation pages
├── lib/              # Navigation config, utilities
├── styles/           # site.css — all custom styles
├── App.tsx           # Route definitions
└── main.tsx          # Entry point
```

## Key Features

- **Docs** — Full component and API documentation with right-side TOC
- **Playground** — Interactive component sandbox
- **Search** — `⌘K` search modal scoped to docs pages
- **Sidebar** — Collapsible navigation with slide transition, works on all screen sizes
- **Theming** — Light/dark mode toggle, persisted to `localStorage`
- **Version** — Navbar version badge auto-reads from `TokisLib/packages/tokis/package.json`

## Tech Stack

- [React 18](https://react.dev) + [TypeScript](https://typescriptlang.org)
- [Vite 6](https://vitejs.dev)
- [React Router v6](https://reactrouter.com)
- [`@tokis/react`](../TokisLib/packages/react) — components
- [`@tokis/theme`](../TokisLib/packages/theme) — CSS design tokens

## Development Notes

- The library packages are linked locally via `file:../TokisLib/packages/*` — no npm publish needed during development.
- After pulling changes to `TokisLib`, rebuild the library (`npm run build` in TokisLib) and restart the dev server.
- The navbar version badge is injected at build time from `TokisLib/packages/tokis/package.json` via Vite's `define`.
