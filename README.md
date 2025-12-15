# Tipa Trello

This project is a Trello-inspired board built with React, Vite, Tailwind, shadcn/ui, and Zustand.

## Installing dependencies in restricted networks

Some sandboxes block direct access to `registry.npmjs.org`, returning 403 errors during `npm install`. Use the included helper to clear proxy settings and force the public registry before installing:

```bash
./scripts/install-clean.sh
```

You can pass any additional npm arguments through to the script:

```bash
./scripts/install-clean.sh --legacy-peer-deps
```

The script unsets proxy environment variables, removes proxy config, points npm at the public registry, relaxes SSL for MITM-proxied labs, and disables fetch retries so failures return quickly instead of hanging.

## Running without `npm install`

If npm is blocked or unavailable, you can run the project directly with **Deno** using npm specifiers—no `node_modules` install step is required. Ensure Deno 1.39+ is installed, then run:

```bash
deno task dev
```

Deno will download npm packages into its own cache and serve the app on port 5173. You can also build or preview via:

```bash
deno task build
deno task preview
```
