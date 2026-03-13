import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'dark'
    padding?: number
}

export function Card({ variant = 'default', padding = 24, children, style, ...props }: CardProps) {
    return (
        <div
            {...props}
            style={{
                background: variant === 'dark' ? 'var(--color-charcoal)' : 'var(--color-white)',
                border: `1px solid ${variant === 'dark' ? 'var(--color-graphite)' : 'var(--color-linen)'}`,
                padding,
                ...style,
            }}
        >
            {children}
        </div>
    )
}