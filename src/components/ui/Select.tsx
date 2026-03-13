import { SelectHTMLAttributes, forwardRef } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    error?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, children, style, ...props }, ref) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {label && (
                <label style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: 9, letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--color-smoke)',
                }}>{label}</label>
            )}
            <select
                ref={ref}
                {...props}
                style={{
                    width: '100%', padding: '12px 16px',
                    fontFamily: 'var(--font-ui)', fontSize: 13,
                    background: 'var(--color-cream)',
                    border: `1px solid ${error ? 'var(--color-error)' : 'var(--color-linen)'}`,
                    color: 'var(--color-espresso)',
                    outline: 'none',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%236B6B6B'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
                    cursor: 'pointer',
                    ...style,
                }}
            >
                {children}
            </select>
            {error && (
                <span style={{
                    fontFamily: 'var(--font-ui)', fontSize: 11,
                    color: 'var(--color-error)',
                }}>{error}</span>
            )}
        </div>
    )
)
Select.displayName = 'Select'