import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
    id: string
    name: string
    brand?: string
    price: number
    currency?: string
    imageUrl?: string
    badge?: string
    colourCount?: number
    href?: string
}

export function ProductCard({
    id, name, brand, price, currency = '£',
    imageUrl, badge, colourCount, href,
}: ProductCardProps) {
    return (
        <Link href={href ?? `/shop/${id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div style={{
                background: 'var(--color-white)',
                border: '1px solid var(--color-linen)',
                cursor: 'pointer',
            }}>
                {/* Image */}
                <div style={{ position: 'relative', paddingTop: '133%', overflow: 'hidden' }}>
                    {imageUrl ? (
                        <Image src={imageUrl} alt={name} fill style={{ objectFit: 'cover' }} />
                    ) : (
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(160deg, var(--color-linen) 0%, #D8D3CC 100%)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <span style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: 12, color: 'var(--color-ash)',
                                letterSpacing: '0.08em',
                            }}>No image</span>
                        </div>
                    )}
                    {badge && (
                        <div style={{
                            position: 'absolute', top: 12, left: 12,
                            background: 'var(--color-espresso)',
                            color: 'var(--color-white)',
                            fontFamily: 'var(--font-ui)',
                            fontSize: 8, letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            padding: '4px 10px',
                        }}>{badge}</div>
                    )}
                </div>
                {/* Info */}
                <div style={{ padding: 16 }}>
                    {brand && (
                        <div style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: 8, letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'var(--color-smoke)',
                            marginBottom: 4,
                        }}>{brand}</div>
                    )}
                    <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 17, lineHeight: 1.2,
                        marginBottom: 8,
                    }}>{name}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 400 }}>
                            {currency}{price.toLocaleString()}
                        </div>
                        {colourCount && (
                            <div style={{
                                fontFamily: 'var(--font-ui)',
                                fontSize: 9, color: 'var(--color-smoke)',
                                letterSpacing: '0.1em',
                            }}>{colourCount} colour{colourCount > 1 ? 's' : ''}</div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}