# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js App Router frontend. Application routes and shared page styling live in `src/app/` (`page.tsx`, `layout.tsx`, and `globals.css`). Feature sections are grouped under `src/components/` (for example, `home/hero.tsx`); reusable UI primitives live in `src/components/ui/`. Shared hooks and helpers belong in `src/hooks/` and `src/lib/`. Static assets should go in `public/` when added. The `@/*` TypeScript alias maps to `src/*`.

## Build, Test, and Development Commands

- `npm install` installs dependencies from the npm lockfile.
- `npm run dev` starts the local Next.js development server at `http://localhost:3000`.
- `npm run build` creates a production build; `npm start` serves that build locally.
- `npm run lint` runs ESLint with the Next.js Core Web Vitals and TypeScript rules.

There is no test script or test suite configured yet. Run lint and build before submitting changes that affect the application.

## Coding Style & Naming Conventions

Use TypeScript and React function components. Keep strict type checking enabled, prefer the `@/` alias for imports from `src/`, and follow the existing ESLint rules. Use two spaces for indentation and semicolons, matching current files. Name components and hooks in PascalCase/camelCase respectively; use descriptive, lowercase kebab-case filenames (for example, `toggle-theme.tsx`). Keep feature-specific components near their feature and generic primitives in `components/ui/`.

## Testing Guidelines

No automated test framework or coverage target is present. For UI changes, run `npm run lint` and `npm run build`; manually inspect affected routes in the dev server, including responsive behavior where relevant. If introducing tests, add the framework and scripts to `package.json` and document the command here.

## Commit & Pull Request Guidelines

Recent commits use short, lowercase, imperative summaries (for example, `implement hero section`). Follow that style and keep each commit focused. Pull requests should describe the user-visible change, note relevant validation commands and outcomes, link related work when available, and include screenshots for visual changes.

## Configuration

Keep secrets and machine-specific values out of source control. Put local environment values in an appropriate `.env.local` file and expose only values intended for the browser with the framework's public environment variable convention.
