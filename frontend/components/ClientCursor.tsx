'use client';

/**
 * Cursor customizado (desktop apenas).
 * - Importa dinamicamente para não impactar LCP.
 * - Desliga no mobile para evitar sobrecarga e gestos touch.
 */
import dynamic from 'next/dynamic';
import { useIsMobile } from '@/hooks/useIsMobile';

const BlobCursor = dynamic(() => import('@/components/Cursor'), {
    ssr: false,
    loading: () => null,
});

export default function ClientCursor() {
    const isMobile = useIsMobile();

    if (isMobile) {
        return null; // Sem cursor customizado em mobile para não colidir com touch
    }

    return (
        <div className="fixed inset-0 pointer-events-none z-10000">
            <BlobCursor
                blobType="square"
                fillColor="#ff2d20"
                trailCount={3}
                sizes={[18, 34, 20]}
                innerSizes={[6, 10, 6]}
                innerColor="rgba(255, 134, 85, 0.7)"
                opacities={[0.98, 0.85, 0.7]}
                shadowColor="rgba(0,0,0,0.35)"
                shadowBlur={2}
                shadowOffsetX={2}
                shadowOffsetY={2}
                useFilter={false}
                fastDuration={0.02}
                slowDuration={0.7}
                zIndex={9999}
            />
        </div>
    );
}
