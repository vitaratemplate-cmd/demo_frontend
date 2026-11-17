/** @type {import('tailwindcss').Config} */

// Brand colours come from CSS variables in src/styles/brand.css (generated from src/config/brand.json).
const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
const brandScale = (name) => ({
  DEFAULT: `rgb(var(--brand-${name}-rgb) / <alpha-value>)`,
  foreground: `var(--brand-${name}-foreground)`,
  ...Object.fromEntries(SHADES.map((s) => [s, `rgb(var(--brand-${name}-${s}-rgb) / <alpha-value>)`])),
})

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--brand-font)'],
        // Fixed template display font; scripts it lacks (Arabic, Devanagari, Cyrillic, Greek) fall back to the brand font.
        display: ['"Fraunces"', 'var(--brand-font)'],
      },
      colors: {
        ink: '#0b1f2a',
        primary: brandScale('primary'),
        accent: brandScale('accent'),
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      },
      animation: { float: 'float 6s ease-in-out infinite' },
    },
  },
  plugins: [],
}
