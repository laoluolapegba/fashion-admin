import { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'gold' | 'outline' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
}

const styles: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
        background: 'var(--color-obsidian)', color: 'var(--color-white)', border: 'none',
    },
    gold: {
        background: 'var(--color-gold)', color: 'var(--color-obsidian)', border: 'none',
    },
    outline: {
        background: 'transparent', color: 'var(--color-obsidian)',
        border: '1px solid var(--color-obsidian)',
    },
    ghost: {
        background: 'transparent', color: 'var(--color-smoke)', border: 'none',
        borderBottom: '1px solid var(--color-ash)', borderRadius: 0,
    },
}

export function Button({ variant = 'primary', children, style, disabled, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            disabled={disabled}
            style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 10, fontWeight: 400,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                padding: '13px 32px',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.5 : 1,
                transition: 'background 0.15s, color 0.15s',
                ...styles[variant],
                ...style,
            }}
        >
            {children}
        </button>
    )
}