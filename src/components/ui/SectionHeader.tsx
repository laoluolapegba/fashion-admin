interface SectionHeaderProps {
    label?: string       // small uppercase label above
    heading: string      // Cormorant display heading
    subheading?: string  // optional Jost body line below
    align?: 'left' | 'center'
}

export function SectionHeader({ label, heading, subheading, align = 'left' }: SectionHeaderProps) {
    return (
        <div style={{ textAlign: align, marginBottom: 48 }}>
            {label && (
                <div style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: 9, letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: 'var(--color-gold)',
                    marginBottom: 12,
                }}>{label}</div>
            )}
            <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 40, fontWeight: 300,
                color: 'var(--color-obsidian)',
                lineHeight: 1.1,
                marginBottom: subheading ? 16 : 0,
            }}>{heading}</h2>
            {subheading && (
                <p style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: 14, fontWeight: 300,
                    color: 'var(--color-smoke)',
                    lineHeight: 1.7,
                    maxWidth: align === 'center' ? 520 : 420,
                    margin: align === 'center' ? '0 auto' : 0,
                }}>{subheading}</p>
            )}
        </div>
    )
}