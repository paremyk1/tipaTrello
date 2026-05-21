# TipaTrello Desktop

Production-oriented Trello-like desktop application scaffold built with Electron + Next.js + React + TypeScript + Tailwind + Framer Motion + Zustand + dnd-kit + SQLite + Prisma.

## Features
- Workspace/Board/List/Card domain model with local SQLite.
- Electron secure configuration (`contextIsolation: true`, `nodeIntegration: false`, preload + IPC bridge).
- Trello-like board page with animated cards and drag experience.
- Native tray, notification, and desktop menu bootstrapped.
- Ready for offline-first evolution with local DB as source of truth.

## Run
1. `npm install`
2. `npm run prisma:generate`
3. `npm run prisma:push`
4. `npm run seed`
5. `npm run dev`

## Build distributables
- `npm run dist`

## Architecture
- `app/` – Next.js routes and UI pages.
- `components/` – reusable and feature UI components.
- `lib/store` – state management with Zustand.
- `lib/services` – repository/service layer.
- `electron/main` – Electron main process and native APIs.
- `electron/preload` – secure IPC bridge.
- `prisma` – schema and seed for SQLite.

## Next roadmap to reach full parity with Trello
- Rich card modal with comments, checklist, attachments, members, labels, activity.
- Workspaces with roles and invites.
- Global search, command palette, filters, board templates.
- Hotkeys and deep-linking.
- Background sync, backups, import/export.
