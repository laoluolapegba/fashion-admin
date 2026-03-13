import { TextareaHTMLAttributes, forwardRef } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, style, ...props }, ref) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {label && (
                <label style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: 9, letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--color-smoke)',
                }}>{label}</label>
            )}
            <textarea
                ref={ref}
                {...props}
                style={{
                    width: '100%', padding: '12px 16px',
                    fontFamily: 'var(--font-ui)', fontSize: 13,
                    background: 'var(--color-cream)',
                    border: `1px solid ${error ? 'var(--color-error)' : 'var(--color-linen)'}`,
                    color: 'var(--color-espresso)',
                    outline: 'none',
                    resize: 'vertical',
                    lineHeight: 1.6,
                    ...style,
                }}
            />
            {error && (
                <span style={{
                    fontFamily: 'var(--font-ui)', fontSize: 11,
                    color: 'var(--color-error)',
                }}>{error}</span>
            )}
        </div>
    )
)
Textarea.displayName = 'Textarea'