"use client";

import { useState, useEffect } from 'react';


export function useIsMobile(): boolean {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;

            const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

            const mobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            );

            setIsMobile(isSmallScreen || (hasTouch && mobileUA));
        };

        checkMobile();

        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);

        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    return isMobile;
}


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
