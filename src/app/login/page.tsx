'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const router = useRouter()
    const supabase = createClient()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError('')

        const { error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            setError('Invalid credentials. Please try again.')
            setLoading(false)
            return
        }

        router.push('/dashboard')
        router.refresh()
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--color-obsidian)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div style={{
                width: '100%',
                maxWidth: 400,
                padding: 48,
                background: 'var(--color-charcoal)',
                border: '1px solid var(--color-graphite)',
            }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 28, fontWeight: 300,
                        color: 'var(--color-white)',
                        letterSpacing: '0.15em',
                    }}>MAISON</div>
                    <div style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: 9, letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        color: 'var(--color-gold)',
                        marginTop: 4,
                    }}>Admin Portal</div>
                </div>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div>
                        <label style={{
                            display: 'block',
                            fontFamily: 'var(--font-ui)',
                            fontSize: 9, letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'var(--color-ash)',
                            marginBottom: 8,
                        }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            placeholder="you@example.com"
                            className="input-dark"
                        />
                    </div>

                    <div>
                        <label style={{
                            display: 'block',
                            fontFamily: 'var(--font-ui)',
                            fontSize: 9, letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'var(--color-ash)',
                            marginBottom: 8,
                        }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%', padding: '12px 16px',
                                fontFamily: 'var(--font-ui)', fontSize: 13,
                                background: 'var(--color-graphite)',
                                border: '1px solid var(--color-graphite)',
                                color: 'var(--color-white)',
                                outline: 'none',
                            }}
                        />
                    </div>

                    {error && (
                        <div style={{
                            fontFamily: 'var(--font-ui)', fontSize: 11,
                            color: '#C0392B',
                            padding: '10px 14px',
                            background: '#2A1515',
                            border: '1px solid #3A2020',
                        }}>{error}</div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: 10, letterSpacing: '0.25em',
                            textTransform: 'uppercase',
                            padding: '14px 32px',
                            background: loading ? 'var(--color-graphite)' : 'var(--color-gold)',
                            color: loading ? 'var(--color-smoke)' : 'var(--color-obsidian)',
                            border: 'none',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            marginTop: 8,
                        }}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    )
}