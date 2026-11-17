import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import brand from './config/brand.json'
import localesConfig from './config/locales.json'
import site from './config/site.json'

// Texts live in src/locales/<code>/<file>.json. They are loaded through a glob, never imported folder by folder,
// so removing a language folder never breaks the build. Keys are "<file>.<path>", e.g. t('home.hero.title').
type Messages = Record<string, unknown>
const files = import.meta.glob<Messages>('./locales/*/*.json', { eager: true, import: 'default' })

const messages: Record<string, Messages> = {}
for (const [path, data] of Object.entries(files)) {
  const m = path.match(/\.\/locales\/([^/]+)\/([^/]+)\.json$/)
  if (m) (messages[m[1]] ??= {})[m[2]] = data
}

export type Language = { code: string; name: string; dir: 'ltr' | 'rtl' }
export const LANGUAGES = localesConfig.available.filter((l) => messages[l.code]) as Language[]
const DEFAULT = localesConfig.default
const STORAGE_KEY = 'lang'

// Values every text may use as {{placeholder}}: the brand and contact details are never written into translations.
const GLOBAL_VARS: Record<string, string> = {
  app_name: brand.app_name,
  tagline: brand.tagline,
  year: String(new Date().getFullYear()),
  ...site,
}

function lookup(lang: string, key: string): unknown {
  return key.split('.').reduce<unknown>((node, part) => (node && typeof node === 'object' ? (node as Messages)[part] : undefined), messages[lang])
}

function pickInitial(): string {
  const has = (c?: string | null) => !!c && LANGUAGES.some((l) => l.code === c)
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (has(saved)) return saved!
  } catch { /* storage unavailable */ }
  for (const pref of navigator.languages ?? []) {
    const exact = LANGUAGES.find((l) => l.code.toLowerCase() === pref.toLowerCase())
    if (exact) return exact.code
    const base = LANGUAGES.find((l) => l.code.split('-')[0] === pref.split('-')[0].toLowerCase())
    if (base) return base.code
  }
  return has(DEFAULT) ? DEFAULT : LANGUAGES[0]?.code ?? DEFAULT
}

type Ctx = {
  lang: string
  dir: 'ltr' | 'rtl'
  languages: Language[]
  setLang: (code: string) => void
  t: (key: string, vars?: Record<string, string | number>) => string
}
const I18nContext = createContext<Ctx | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState(pickInitial)
  const dir = LANGUAGES.find((l) => l.code === lang)?.dir ?? 'ltr'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }, [lang, dir])

  const setLang = useCallback((code: string) => {
    setLangState(code)
    try { localStorage.setItem(STORAGE_KEY, code) } catch { /* storage unavailable */ }
  }, [])

  const t = useCallback(
    (key: string, vars: Record<string, string | number> = {}) => {
      // Missing in the current language → fall back to the default language → show the key.
      const raw = lookup(lang, key) ?? lookup(DEFAULT, key)
      if (typeof raw !== 'string') return key
      const all: Record<string, string | number> = { ...GLOBAL_VARS, ...vars }
      return raw.replace(/\{\{(\w+)\}\}/g, (m, name: string) => (name in all ? String(all[name]) : m))
    },
    [lang],
  )

  const value = useMemo(() => ({ lang, dir, languages: LANGUAGES, setLang, t }), [lang, dir, setLang, t])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>')
  return ctx
}

/** Renders a text whose emphasis is marked with <em>…</em> in the translation. */
export function Rich({ text, emClassName }: { text: string; emClassName?: string }) {
  const parts = text.split(/<em>(.*?)<\/em>/)
  return <>{parts.map((part, i) => (i % 2 ? <em key={i} className={emClassName}>{part}</em> : part))}</>
}
