import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        caprasimo: ['var(--font-caprasimo)'],
        grotesk: ['var(--font-space-grotesk)'],
      },
    },
  },
}

export default config