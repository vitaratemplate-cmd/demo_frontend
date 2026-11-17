import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import {
  Activity, Ambulance, ArrowUpRight, Award, Baby, Bone, Brain, Building2, Clock, Eye, Globe,
  HeartPulse, Mail, MapPin, Menu, Microscope, Phone, ShieldCheck, Stethoscope, Users, X,
} from 'lucide-react'
import brand from './config/brand.json'
import site from './config/site.json'
import { Rich, useI18n } from './i18n'

const tel = (n: string) => `tel:${n.replace(/[^\d+]/g, '')}`

// Structure only: every text comes from src/locales/<code>/*.json.
const NAV = [
  ['nav.about', '#about'],
  ['nav.services', '#services'],
  ['nav.doctors', '#doctors'],
  ['nav.visit', '#visit'],
] as const

const STATS = [
  ['35+', 'years'],
  ['120', 'doctors'],
  ['450', 'beds'],
  ['24/7', 'emergency'],
] as const

const SERVICES = [
  { id: 'cardiology', icon: HeartPulse, span: 'md:col-span-2', dark: true },
  { id: 'neurosciences', icon: Brain, span: '' },
  { id: 'orthopaedics', icon: Bone, span: '' },
  { id: 'mother_child', icon: Baby, span: '' },
  { id: 'ophthalmology', icon: Eye, span: '' },
  { id: 'diagnostics', icon: Microscope, span: 'md:col-span-2' },
]

const DOCTORS = [
  { id: 'rao', initials: 'AR', years: 22, hue: 'from-primary-200 to-primary-600' },
  { id: 'mehta', initials: 'RM', years: 18, hue: 'from-accent-200 to-accent-500' },
  { id: 'nair', initials: 'PN', years: 15, hue: 'from-primary-300 to-primary-800' },
  { id: 'iyer', initials: 'KI', years: 16, hue: 'from-accent-300 to-accent-700' },
]

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: 'easeOut' as const },
}

function Section({ id, children, className = '' }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`mx-auto max-w-7xl scroll-mt-24 px-5 py-20 md:px-8 md:py-28 ${className}`}>
      {children}
    </section>
  )
}

function Logo({ size }: { size: 'sm' | 'md' }) {
  const box = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'
  if (brand.logo) return <img src={brand.logo} alt="" className={`${box} shrink-0 rounded-full object-contain`} />
  return (
    <span className={`grid ${box} shrink-0 place-items-center rounded-full bg-primary text-primary-foreground`}>
      <Activity size={size === 'sm' ? 16 : 20} />
    </span>
  )
}

function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { lang, setLang, languages, t } = useI18n()
  if (languages.length <= 1) return null
  return (
    <label className={`relative flex items-center ${className}`}>
      <Globe size={16} className="pointer-events-none absolute start-3 text-ink/60" />
      <span className="sr-only">{t('common.header.language')}</span>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="h-10 cursor-pointer appearance-none rounded-full border border-ink/10 bg-white/80 pe-4 ps-9 text-sm font-medium outline-none transition hover:border-primary focus-visible:ring-2 focus-visible:ring-primary"
      >
        {languages.map((l) => <option key={l.code} value={l.code}>{l.name}</option>)}
      </select>
    </label>
  )
}

function Header() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="glass mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full py-2.5 pe-2.5 ps-5 shadow-lg shadow-primary-900/5">
        <a href="#top" className="flex min-w-0 items-center gap-2 font-display text-xl font-semibold">
          <Logo size="sm" />
          <span className="truncate">{brand.app_name}</span>
        </a>
        <nav className="hidden gap-7 text-sm font-medium text-ink/70 lg:flex">
          {NAV.map(([k, h]) => <a key={h} href={h} className="whitespace-nowrap transition hover:text-primary-700">{t(`common.${k}`)}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden sm:flex" />
          <a href={tel(site.emergency_phone)} className="hidden items-center gap-2 whitespace-nowrap rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-800 lg:flex">
            <Phone size={14} /> {t('common.header.emergency')}
          </a>
          <button className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white lg:hidden" onClick={() => setOpen(!open)} aria-label={t('common.header.menu')} aria-expanded={open}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="glass mx-auto mt-2 max-w-6xl rounded-3xl p-5 lg:hidden">
          {NAV.map(([k, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="block py-3 text-lg font-medium">{t(`common.${k}`)}</a>
          ))}
          <a href={tel(site.emergency_phone)} className="mt-2 flex items-center gap-2 py-3 font-semibold text-accent-700">
            <Phone size={16} /> {t('common.header.emergency')}
          </a>
          <LanguageSwitcher className="mt-3 sm:hidden" />
        </div>
      )}
    </header>
  )
}

function Hero() {
  const { t } = useI18n()
  return (
    <div id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute -start-32 top-0 h-[500px] w-[500px] rounded-full bg-primary-200/60 blur-3xl" />
      <div className="pointer-events-none absolute -end-24 top-40 h-[420px] w-[420px] rounded-full bg-accent-100/70 blur-3xl" />
      <Section className="relative grid items-center gap-14 pt-40 md:grid-cols-[1.15fr_1fr] md:pt-48">
        <motion.div {...fade}>
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-primary-800">
            <ShieldCheck size={14} /> {t('home.hero.badge')}
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[1.1] md:text-7xl">
            <Rich text={t('home.hero.title')} emClassName="text-primary-600" />
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink/65">{t('home.hero.intro')}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#services" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:bg-primary-600">
              {t('home.hero.cta_primary')}
              <ArrowUpRight size={18} className="transition rtl:-scale-x-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </a>
            <a href="#visit" className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold transition hover:bg-white">
              {t('home.hero.cta_secondary')}
            </a>
          </div>
        </motion.div>

        <motion.div {...fade} transition={{ ...fade.transition, delay: 0.15 }} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 p-8 text-white shadow-2xl shadow-primary-900/25">
            <div className="absolute -end-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
            <div className="absolute -bottom-24 -start-10 h-72 w-72 rounded-full bg-primary-400/20" />
            <Stethoscope className="absolute bottom-10 end-8 text-white/10" size={220} strokeWidth={1} />
            <p className="relative font-display text-3xl leading-snug">{t('home.hero.quote')}</p>
            <p className="relative mt-4 text-sm text-white/70">{t('home.hero.quote_by')}</p>
          </div>
          <div className="glass absolute -start-6 bottom-16 flex animate-float items-center gap-3 rounded-2xl p-4 shadow-xl">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-100 text-accent-600"><Ambulance size={22} /></span>
            <div><p className="text-sm font-bold">{t('home.hero.emergency_title')}</p><p className="text-xs text-ink/60">{t('home.hero.emergency_text')}</p></div>
          </div>
          <div className="glass absolute -end-3 top-10 rounded-2xl p-4 shadow-xl">
            <p className="font-display text-3xl text-primary-700" dir="ltr">4.9<span className="text-base text-ink/50">/5</span></p>
            <p className="text-xs text-ink/60">{t('home.hero.rating_label')}</p>
          </div>
        </motion.div>
      </Section>
    </div>
  )
}

function Stats() {
  const { t } = useI18n()
  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <motion.div {...fade} className="card grid grid-cols-2 divide-primary-900/5 p-2 md:grid-cols-4 md:divide-x rtl:md:divide-x-reverse">
        {STATS.map(([n, k]) => (
          <div key={k} className="p-6 text-center md:p-8">
            <p className="font-display text-4xl text-primary-700 md:text-5xl" dir="ltr">{n}</p>
            <p className="mt-1 text-sm text-ink/60">{t(`home.stats.${k}`)}</p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

function About() {
  const { t } = useI18n()
  const points = [
    [Users, 'teams'],
    [Award, 'excellence'],
    [Building2, 'facilities'],
  ] as const
  return (
    <Section id="about" className="grid gap-12 md:grid-cols-2">
      <motion.div {...fade}>
        <p className="eyebrow">{t('home.about.eyebrow')}</p>
        <h2 className="h2 mt-3">{t('home.about.title')}</h2>
        <p className="mt-5 text-lg text-ink/65">{t('home.about.text')}</p>
      </motion.div>
      <div className="space-y-4">
        {points.map(([Icon, k], i) => (
          <motion.div key={k} {...fade} transition={{ ...fade.transition, delay: i * 0.1 }} className="card flex gap-5 p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-50 text-primary-700"><Icon size={22} /></span>
            <div>
              <h3 className="font-semibold">{t(`home.about.points.${k}.title`)}</h3>
              <p className="mt-1 text-sm text-ink/60">{t(`home.about.points.${k}.text`)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function Services() {
  const { t } = useI18n()
  return (
    <Section id="services">
      <motion.div {...fade} className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">{t('home.services.eyebrow')}</p>
        <h2 className="h2 mt-3">{t('home.services.title')}</h2>
      </motion.div>
      <div className="mt-14 grid gap-4 md:grid-cols-4">
        {SERVICES.map(({ id, icon: Icon, span, dark }, i) => (
          <motion.div
            key={id}
            {...fade}
            transition={{ ...fade.transition, delay: (i % 4) * 0.08 }}
            className={`group relative overflow-hidden p-7 transition hover:-translate-y-1 ${span} ${dark ? 'rounded-3xl bg-ink text-white' : 'card'}`}
          >
            <span className={`grid h-12 w-12 place-items-center rounded-2xl ${dark ? 'bg-primary text-primary-foreground' : 'bg-primary-50 text-primary-700'}`}><Icon size={22} /></span>
            <h3 className="mt-14 font-display text-2xl">{t(`home.services.items.${id}.title`)}</h3>
            <p className={`mt-2 text-sm ${dark ? 'text-white/65' : 'text-ink/60'}`}>{t(`home.services.items.${id}.text`)}</p>
            <ArrowUpRight className={`absolute end-6 top-6 opacity-0 transition rtl:-scale-x-100 group-hover:opacity-100 ${dark ? 'text-white/60' : 'text-primary-700'}`} size={20} />
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function Doctors() {
  const { t } = useI18n()
  return (
    <Section id="doctors">
      <motion.div {...fade} className="max-w-xl">
        <p className="eyebrow">{t('home.doctors.eyebrow')}</p>
        <h2 className="h2 mt-3">{t('home.doctors.title')}</h2>
      </motion.div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {DOCTORS.map((d, i) => (
          <motion.div key={d.id} {...fade} transition={{ ...fade.transition, delay: i * 0.08 }} className="card overflow-hidden p-3">
            <div className={`relative grid aspect-square place-items-center rounded-2xl bg-gradient-to-br ${d.hue}`}>
              <span className="font-display text-6xl text-white/90">{d.initials}</span>
              <span className="glass absolute bottom-3 start-3 rounded-full px-3 py-1 text-xs font-semibold">{t('home.doctors.experience', { years: d.years })}</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{t(`home.doctors.items.${d.id}.name`)}</h3>
              <p className="text-sm text-ink/60">{t(`home.doctors.items.${d.id}.role`)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function Visit() {
  const { t } = useI18n()
  const rows = [
    [MapPin, t('home.visit.address_label'), t('home.visit.address'), undefined],
    [Clock, t('home.visit.hours_label'), t('home.visit.hours'), undefined],
    [Phone, t('home.visit.reception_label'), site.reception_phone, tel(site.reception_phone)],
    [Mail, t('home.visit.email_label'), site.email, `mailto:${site.email}`],
  ] as const
  return (
    <Section id="visit">
      <motion.div {...fade} className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary-800 to-ink p-8 text-white md:p-14">
        <div className="absolute -end-20 -top-20 h-80 w-80 rounded-full bg-primary-400/20 blur-2xl" />
        <div className="relative grid gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow !text-primary-200">{t('home.visit.eyebrow')}</p>
            <h2 className="h2 mt-3">{t('home.visit.title')}</h2>
            <p className="mt-5 max-w-md text-white/70">{t('home.visit.text')}</p>
            <a href={tel(site.emergency_phone)} className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 font-semibold text-ink transition hover:bg-primary-100">
              <Ambulance size={18} className="text-accent-600" /> {t('home.visit.emergency')}
            </a>
          </div>
          <ul className="space-y-3">
            {rows.map(([Icon, label, value, href]) => (
              <li key={label} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <Icon size={20} className="mt-0.5 shrink-0 text-primary-300" />
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-white/50">{label}</p>
                  {href
                    ? <a href={href} dir="ltr" className="mt-0.5 block break-words font-medium hover:underline">{value}</a>
                    : <p className="mt-0.5 font-medium">{value}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </Section>
  )
}

function Footer() {
  const { t } = useI18n()
  return (
    <footer className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-5 pb-10 pt-4 text-center text-sm text-ink/50 md:px-8">
      <div className="flex items-center gap-3 text-ink/80">
        <Logo size="md" />
        <div className="text-start">
          <p className="font-display text-lg font-semibold text-ink">{brand.app_name}</p>
          {brand.tagline && <p className="text-xs text-ink/60">{brand.tagline}</p>}
        </div>
      </div>
      <p>{t('common.footer.rights')} {t('common.footer.disclaimer')}</p>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Doctors />
        <Visit />
      </main>
      <Footer />
    </>
  )
}
