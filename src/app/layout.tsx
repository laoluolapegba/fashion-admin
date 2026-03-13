import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import '@/styles/globals.css'

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600'],
    style: ['normal', 'italic'],
    variable: '--font-cormorant',
    display: 'swap',
})

const dmSans = DM_Sans({
    subsets: ['latin'],
    weight: ['300', '400', '500'],
    variable: '--font-dm-sans',
    display: 'swap',
})

export const metadata: Metadata = {
    title: { default: 'Admin — Eleven08', template: '%s | Eleven08 Admin' },
    description: 'Your style defines you. Eleven08 offers premium fashion and private styling for those who know exactly who they are.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
            <body>{children}</body>
        </html>
    )
}