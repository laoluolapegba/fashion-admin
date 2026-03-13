'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Products', href: '/products' },
    { label: 'Collections', href: '/collections' },
    { label: 'Orders', href: '/orders' },
    { label: 'Inquiries', href: '/inquiries' },
    { label: 'Bookings', href: '/bookings' },
    { label: 'Subscribers', href: '/subscribers' },
]

export function AdminSidebar() {
    const pathname = usePathname()

    return (
        <aside style={{
            width: 220, flexShrink: 0,
            background: 'var(--color-charcoal)',
            display: 'flex', flexDirection: 'column',
            minHeight: '100vh',
            position: 'sticky', top: 0,
        }}>
            {/* Logo */}
            <div style={{
                padding: '28px 24px',
                borderBottom: '1px solid var(--color-graphite)',
            }}>
                <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 20, fontWeight: 300,
                    color: 'var(--color-white)',
                    letterSpacing: '0.12em',
                }}>ELEVEN08</div>
                <div style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: 8, fontWeight: 400,
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: 'var(--color-burnt-orange)',
                    marginTop: 3,
                }}>ADMIN</div>
            </div>

            {/* Nav */}
            <nav style={{ flex: 1, paddingTop: 16 }}>
                {navItems.map(item => {
                    const isActive = pathname === item.href
                    return (
                        <Link key={item.href} href={item.href} style={{
                            display: 'flex', alignItems: 'center',
                            padding: '11px 24px',
                            background: isActive ? 'var(--color-graphite)' : 'transparent',
                            borderLeft: isActive ? '2px solid var(--color-burnt-orange)' : '2px solid transparent',
                            fontFamily: 'var(--font-ui)',
                            fontSize: 11, fontWeight: 400,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: isActive ? 'var(--color-white)' : 'var(--color-ash)',
                            textDecoration: 'none',
                            transition: 'background 0.15s, color 0.15s',
                        }}>
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            {/* Footer */}
            <div style={{
                padding: '16px 24px',
                borderTop: '1px solid var(--color-graphite)',
            }}>
                <div style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: 9, letterSpacing: '0.1em',
                    color: 'var(--color-smoke)',
                    marginBottom: 8,
                }}>admin@ELEVEN08.com</div>
                <form action="/api/auth/signout" method="POST">
                    <button type="submit" style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: 9, letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--color-smoke)',
                        cursor: 'pointer',
                        padding: 0,
                    }}>Sign Out</button>
                </form>
            </div>
        </aside>
    )
}