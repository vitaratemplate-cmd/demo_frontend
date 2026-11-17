# Meridian Hospital (template)

Single-page hospital website: React 19 + TypeScript, Vite 5, Tailwind CSS 3, Framer Motion, lucide-react.

- `npm run dev` serves on http://localhost:3000; `npm run build` type-checks and builds.
- All page sections live in `src/App.tsx`; the i18n layer is `src/i18n.tsx` (`useI18n().t('<file>.<path>')`).
- Contact details (phones, email) are in `src/config/site.json` and reach texts as `{{emergency_phone}}`, `{{reception_phone}}`, `{{email}}`.

## Brand and languages
- App name, tagline, logo, favicon, colours and font come from `src/config/brand.json`. Colours are CSS variables from
  `src/styles/brand.css` (generated, do not edit): use the Tailwind `primary` / `accent` colours, never a hex value.
- Every user-facing text is a translation key. When you add or change a text, update every folder in `src/locales/`.
  The languages are listed in `src/config/locales.json`.
- Never write the app name into a translation: use `{{app_name}}` (filled from `brand.json`).
- Use logical CSS (`ms-`, `pe-`, `start-`, `end-`, `text-start`) so right-to-left languages work.
