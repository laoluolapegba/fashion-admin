import { createSupabaseServerClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
    const supabase = await createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <div>
            <div style={{ marginBottom: 32 }}>
                <h1 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 36, fontWeight: 300,
                    color: 'var(--color-obsidian)',
                    marginBottom: 6,
                }}>Dashboard</h1>
                <p style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: 11, color: 'var(--color-smoke)',
                    letterSpacing: '0.05em',
                }}>
                    Welcome back, {user?.email}
                </p>
            </div>

            {/* KPI placeholders */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 16,
            }}>
                {['Products', 'Inquiries', 'Bookings', 'Orders'].map(label => (
                    <div key={label} style={{
                        background: 'var(--color-white)',
                        border: '1px solid var(--color-linen)',
                        padding: 24,
                    }}>
                        <div style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: 9, letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'var(--color-smoke)',
                            marginBottom: 12,
                        }}>{label}</div>
                        <div style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 32, fontWeight: 300,
                            color: 'var(--color-obsidian)',
                        }}>—</div>
                    </div>
                ))}
            </div>
        </div>
    )
}