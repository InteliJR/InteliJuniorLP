"use client";

import { useState, useEffect } from 'react';

/**
 * Hook para detectar se o dispositivo é mobile
 * Usa matchMedia para detectar telas menores que 768px
 * Também verifica touch capability como fallback
 */
export function useIsMobile(): boolean {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Verifica no client-side
        const checkMobile = () => {
            // Verifica largura da tela
            const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;

            // Verifica se tem touch (dispositivos móveis geralmente têm)
            const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

            // Verifica user agent como fallback
            const mobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            );

            // Considera mobile se tela pequena OU (tem touch E UA mobile)
            setIsMobile(isSmallScreen || (hasTouch && mobileUA));
        };

        checkMobile();

        // Escuta mudanças de tamanho de tela
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);

        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    return isMobile;
}

/**
 * Hook para detectar se deve usar recursos reduzidos
 * Considera mobile + preferência de reduced motion
 */
export function useReducedMotion(): boolean {
    const [prefersReduced, setPrefersReduced] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReduced(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    return prefersReduced;
}
