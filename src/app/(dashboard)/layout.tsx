import { AdminSidebar } from '@/components/layout/AdminSidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-cream)' }}>
            <AdminSidebar />
            <main style={{ flex: 1, padding: 40, overflowY: 'auto' }}>
                {children}
            </main>
        </div>
    )
}