# Tipa Trello

This project is a Trello-inspired board built with React, Vite, Tailwind, shadcn/ui, and Zustand.

## Running locally (npm-free)

You can develop, build, or preview the app with **Deno** using npm specifiers—no `npm install` step is required. Ensure Deno 1.39+ is installed, then run:

```bash
deno task dev
```

Deno will download npm packages into its own cache and serve the app on port 5173. You can also build or preview via:

```bash
deno task build
deno task preview
```

Once the dev server is running, open your browser at http://localhost:5173.

> Opening `index.html` directly from the file system will not load the bundle. Use `deno task dev` or `deno task preview` so the app is served and transpiled correctly.
