import { createSupabaseServerClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export default async function DashboardPage() {
    const [products, inquiries, bookings, orders] = await Promise.all([
        supabaseAdmin.from('products').select('id', { count: 'exact', head: true }),
        supabaseAdmin.from('inquiries').select('id', { count: 'exact', head: true })
            .eq('is_read', false),
        supabaseAdmin.from('bookings').select('id', { count: 'exact', head: true })
            .eq('status', 'pending'),
        supabaseAdmin.from('orders').select('id', { count: 'exact', head: true }),
    ])

    const kpis = [
        { label: 'Products', value: products.count ?? 0 },
        { label: 'Unread inquiries', value: inquiries.count ?? 0 },
        { label: 'Pending bookings', value: bookings.count ?? 0 },
        { label: 'Orders', value: orders.count ?? 0 },
    ]

    return (
        <div>
            <h1>Dashboard</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
                {kpis.map(k => (
                    <div key={k.label}>
                        <p>{k.label}</p>
                        <p>{k.value}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}