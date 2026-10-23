import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import {
  Activity, Ambulance, ArrowUpRight, Award, Baby, Bone, Brain, Building2, Clock, Eye,
  HeartPulse, Mail, MapPin, Menu, Microscope, Phone, ShieldCheck, Stethoscope, Users, X,
} from 'lucide-react'

const NAV = [
  ['About', '#about'],
  ['Services', '#services'],
  ['Doctors', '#doctors'],
  ['Visit', '#visit'],
]

const STATS = [
  ['35+', 'Years of care'],
  ['120', 'Specialist doctors'],
  ['450', 'Patient beds'],
  ['24/7', 'Emergency & ICU'],
]

const SERVICES = [
  { icon: HeartPulse, title: 'Cardiology', text: 'Preventive heart care, cath lab, and advanced cardiac surgery.', span: 'md:col-span-2', dark: true },
  { icon: Brain, title: 'Neurosciences', text: 'Stroke, epilepsy, and spine care.', span: '' },
  { icon: Bone, title: 'Orthopaedics', text: 'Joint replacement and sports medicine.', span: '' },
  { icon: Baby, title: 'Mother & Child', text: 'Maternity, NICU, and paediatrics under one roof.', span: '' },
  { icon: Eye, title: 'Ophthalmology', text: 'Laser vision and retina care.', span: '' },
  { icon: Microscope, title: 'Diagnostics', text: 'MRI, CT, and a fully automated pathology lab with same-day reports.', span: 'md:col-span-2' },
]

const DOCTORS = [
  { name: 'Dr. Ananya Rao', role: 'Chief of Cardiology', exp: '22 yrs', hue: 'from-teal-200 to-teal-500' },
  { name: 'Dr. Rohan Mehta', role: 'Neurosurgeon', exp: '18 yrs', hue: 'from-sky-200 to-sky-500' },
  { name: 'Dr. Priya Nair', role: 'Obstetrics & Gynaecology', exp: '15 yrs', hue: 'from-rose-200 to-rose-400' },
  { name: 'Dr. Karan Iyer', role: 'Orthopaedic Surgeon', exp: '16 yrs', hue: 'from-amber-200 to-amber-400' },
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

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="glass mx-auto flex max-w-5xl items-center justify-between rounded-full py-2.5 pl-5 pr-2.5 shadow-lg shadow-teal-900/5">
        <a href="#top" className="flex items-center gap-2 font-display text-xl font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-teal-600 text-white"><Activity size={16} /></span>
          Meridian
        </a>
        <nav className="hidden gap-8 text-sm font-medium text-ink/70 md:flex">
          {NAV.map(([l, h]) => <a key={h} href={h} className="transition hover:text-teal-600">{l}</a>)}
        </nav>
        <a href="tel:+911800000000" className="hidden items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700 md:flex">
          <Phone size={14} /> Emergency 1800 000 000
        </a>
        <button className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <div className="glass mx-auto mt-2 max-w-5xl rounded-3xl p-5 md:hidden">
          {NAV.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="block py-3 text-lg font-medium">{l}</a>
          ))}
        </div>
      )}
    </header>
  )
}

function Hero() {
  return (
    <div id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-teal-200/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-40 h-[420px] w-[420px] rounded-full bg-sky-200/60 blur-3xl" />
      <Section className="relative grid items-center gap-14 pt-40 md:grid-cols-[1.15fr_1fr] md:pt-48">
        <motion.div {...fade}>
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-teal-700">
            <ShieldCheck size={14} /> NABH accredited · Multi-speciality
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] md:text-7xl">
            Care that feels <em className="text-teal-600">human</em>, backed by science.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink/65">
            Meridian Hospital brings together expert clinicians, modern technology, and a deeply personal approach — so you and your family are in safe hands at every stage of life.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#services" className="group inline-flex items-center gap-2 rounded-full bg-teal-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-teal-600/30 transition hover:bg-teal-700">
              Explore our care <ArrowUpRight size={18} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#visit" className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold transition hover:bg-white">
              Plan your visit
            </a>
          </div>
        </motion.div>

        <motion.div {...fade} transition={{ ...fade.transition, delay: 0.15 }} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-teal-600 via-teal-700 to-teal-900 p-8 text-white shadow-2xl shadow-teal-900/25">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
            <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-teal-400/20" />
            <Stethoscope className="absolute bottom-10 right-8 text-white/10" size={220} strokeWidth={1} />
            <p className="relative font-display text-3xl leading-snug">“Every patient is a story we're privileged to be part of.”</p>
            <p className="relative mt-4 text-sm text-white/70">— Our founding principle</p>
          </div>
          <div className="glass animate-float absolute -left-6 bottom-16 flex items-center gap-3 rounded-2xl p-4 shadow-xl">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-rose-100 text-rose-500"><Ambulance size={22} /></span>
            <div><p className="text-sm font-bold">24/7 Emergency</p><p className="text-xs text-ink/60">Avg. response under 8 min</p></div>
          </div>
          <div className="glass absolute -right-3 top-10 rounded-2xl p-4 shadow-xl">
            <p className="font-display text-3xl text-teal-700">4.9<span className="text-base text-ink/50">/5</span></p>
            <p className="text-xs text-ink/60">Patient satisfaction</p>
          </div>
        </motion.div>
      </Section>
    </div>
  )
}

function Stats() {
  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <motion.div {...fade} className="card grid grid-cols-2 divide-teal-900/5 p-2 md:grid-cols-4 md:divide-x">
        {STATS.map(([n, l]) => (
          <div key={l} className="p-6 text-center md:p-8">
            <p className="font-display text-4xl text-teal-700 md:text-5xl">{n}</p>
            <p className="mt-1 text-sm text-ink/60">{l}</p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

function About() {
  const points = [
    [Users, 'Patient-first teams', 'Doctors, nurses and care coordinators who walk the journey with you.'],
    [Award, 'Clinical excellence', 'Outcomes benchmarked against leading international centres.'],
    [Building2, 'Modern facilities', 'Robotic surgery suites, hybrid OTs, and healing-first spaces.'],
  ] as const
  return (
    <Section id="about" className="grid gap-12 md:grid-cols-2">
      <motion.div {...fade}>
        <p className="eyebrow">About us</p>
        <h2 className="h2 mt-3">A hospital built around people, not procedures.</h2>
        <p className="mt-5 text-lg text-ink/65">
          For over three decades, Meridian has served our community with a simple promise: world-class medicine delivered with warmth, honesty, and respect.
        </p>
      </motion.div>
      <div className="space-y-4">
        {points.map(([Icon, t, d], i) => (
          <motion.div key={t} {...fade} transition={{ ...fade.transition, delay: i * 0.1 }} className="card flex gap-5 p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-teal-50 text-teal-600"><Icon size={22} /></span>
            <div><h3 className="font-semibold">{t}</h3><p className="mt-1 text-sm text-ink/60">{d}</p></div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function Services() {
  return (
    <Section id="services">
      <motion.div {...fade} className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Centres of excellence</p>
        <h2 className="h2 mt-3">Comprehensive care, all in one place.</h2>
      </motion.div>
      <div className="mt-14 grid gap-4 md:grid-cols-4">
        {SERVICES.map(({ icon: Icon, title, text, span, dark }, i) => (
          <motion.div
            key={title}
            {...fade}
            transition={{ ...fade.transition, delay: (i % 4) * 0.08 }}
            className={`group relative overflow-hidden p-7 transition hover:-translate-y-1 ${span} ${dark ? 'rounded-3xl bg-ink text-white' : 'card'}`}
          >
            <span className={`grid h-12 w-12 place-items-center rounded-2xl ${dark ? 'bg-teal-500 text-white' : 'bg-teal-50 text-teal-600'}`}><Icon size={22} /></span>
            <h3 className="mt-14 font-display text-2xl">{title}</h3>
            <p className={`mt-2 text-sm ${dark ? 'text-white/65' : 'text-ink/60'}`}>{text}</p>
            <ArrowUpRight className={`absolute right-6 top-6 opacity-0 transition group-hover:opacity-100 ${dark ? 'text-white/60' : 'text-teal-600'}`} size={20} />
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function Doctors() {
  return (
    <Section id="doctors">
      <motion.div {...fade} className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Our specialists</p>
          <h2 className="h2 mt-3">Meet the experts<br className="hidden md:block" /> behind your care.</h2>
        </div>
      </motion.div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {DOCTORS.map((d, i) => (
          <motion.div key={d.name} {...fade} transition={{ ...fade.transition, delay: i * 0.08 }} className="card overflow-hidden p-3">
            <div className={`relative grid aspect-square place-items-center rounded-2xl bg-gradient-to-br ${d.hue}`}>
              <span className="font-display text-6xl text-white/90">{d.name.split(' ').slice(1).map(w => w[0]).join('')}</span>
              <span className="glass absolute bottom-3 left-3 rounded-full px-3 py-1 text-xs font-semibold">{d.exp} experience</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{d.name}</h3>
              <p className="text-sm text-ink/60">{d.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function Visit() {
  const rows = [
    [MapPin, 'Address', '12 Meridian Avenue, Health District, Your City 400001'],
    [Clock, 'OPD hours', 'Mon–Sat · 8:00 AM – 8:00 PM'],
    [Phone, 'Reception', '+91 00000 00000'],
    [Mail, 'Email', 'care@meridianhospital.example'],
  ] as const
  return (
    <Section id="visit">
      <motion.div {...fade} className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-teal-700 to-ink p-8 text-white md:p-14">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-teal-400/20 blur-2xl" />
        <div className="relative grid gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow !text-teal-200">Visit us</p>
            <h2 className="h2 mt-3">We're here whenever you need us.</h2>
            <p className="mt-5 max-w-md text-white/70">Our emergency department and ICU never close. For appointments and enquiries, reach the front desk during OPD hours.</p>
            <a href="tel:+911800000000" className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 font-semibold text-ink transition hover:bg-teal-100">
              <Ambulance size={18} className="text-rose-500" /> Emergency: 1800 000 000
            </a>
          </div>
          <ul className="space-y-3">
            {rows.map(([Icon, l, v]) => (
              <li key={l} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <Icon size={20} className="mt-0.5 shrink-0 text-teal-300" />
                <div><p className="text-xs uppercase tracking-wider text-white/50">{l}</p><p className="mt-0.5 font-medium">{v}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </Section>
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
      <footer className="mx-auto max-w-7xl px-5 pb-10 pt-4 text-center text-sm text-ink/50 md:px-8">
        © {new Date().getFullYear()} Meridian Hospital. For informational purposes only — in a medical emergency, call 1800 000 000.
      </footer>
    </>
  )
}
