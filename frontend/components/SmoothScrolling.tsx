"use client";

/**
 * Habilita scroll suave (Lenis) apenas em desktop.
 * - Mobile mantém scroll nativo para preservar responsividade e consumo reduzido.
 * - Configuração curta para evitar delay perceptível e manter sensibilidade natural.
 */
import { ReactLenis } from "lenis/react";
import { useIsMobile } from "@/hooks/useIsMobile";

function SmoothScrolling({ children }: { children: React.ReactNode }) {
    const isMobile = useIsMobile();

    if (isMobile) {
        return <>{children}</>; // Mantém scroll nativo em touch para evitar interferir em gestos
    }

    return (
        <ReactLenis
            root
            options={{
                duration: 0.9,
                lerp: 0.14,
                smoothWheel: true,
            }}
        >
            {children}
        </ReactLenis>
    );
}

export default SmoothScrolling;
