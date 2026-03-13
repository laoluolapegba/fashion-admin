import type { Config } from 'tailwindcss'

const config: Config = {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                obsidian: '#0D0D0D',
                charcoal: '#1A1A1A',
                graphite: '#2E2E2E',
                smoke: '#6B6B6B',
                ash: '#A8A4A0',
                linen: '#F0EDE8',
                ivory: '#FAF9F7',
                gold: '#C9A96E',
                'gold-light': '#E8D5B0',
                'gold-dark': '#A07840',
            },
            fontFamily: {
                display: ['var(--font-cormorant)', 'Georgia', 'serif'],
                ui: ['var(--font-jost)', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                'label': ['10px', { letterSpacing: '0.25em', lineHeight: '1' }],
                'micro': ['9px', { letterSpacing: '0.15em', lineHeight: '1' }],
            },
            letterSpacing: {
                'display': '0.12em',
                'label': '0.25em',
                'wide': '0.15em',
            },
        },
    },
    plugins: [],
}

export default config