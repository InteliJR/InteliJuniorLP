'use client';

/**
 * Seção hero (LCP): texto principal e CTAs.
 * - Desktop: AuroraFlow (Three.js) carregado dinamicamente; Mobile: fallback CSS leve para evitar custo de WebGL.
 * - TextScramble e animações só disparam após o loader para evitar jank.
 * - Placeholders estáveis previnem CLS enquanto AuroraFlow carrega.
 */
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { m } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { TextScramble } from '@/components/ui/textScramble/index';
import { useAppLoader } from '@/components/AppLoaderShell';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useScrambleTrigger } from '@/hooks/useScrambleTrigger';

// Dynamic import do AuroraFlow (WebGL) apenas em desktop para proteger LCP
const AuroraFlow = dynamic(
    () => import("@/components/AuroraFlow").then(mod => ({ default: mod.AuroraFlow })),
    {
        ssr: false,
        loading: () => (
            <div className="relative overflow-hidden w-full min-h-screen bg-background" />
        ),
    }
);

// Fallback estático para mobile (sem Three.js)
function MobileBackground({
    children,
    id,
    className
}: {
    children: React.ReactNode;
    id?: string;
    className?: string;
}) {
    return (
        <section id={id} className={`relative ${className}`}>
            {/* Gradiente animado CSS - muito mais leve que Three.js */}
            <div className="absolute inset-0 bg-background">
                <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-primary/10 animate-pulse"
                    style={{ animationDuration: '4s' }} />
                <div className="absolute inset-0 bg-linear-to-tl from-transparent via-primary/5 to-transparent" />
                {/* Partículas simuladas com CSS */}
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"
                    style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
                <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-pulse"
                    style={{ animationDuration: '5s', animationDelay: '1s' }} />
            </div>
            {children}
        </section>
    );
}

export default function FirstSection() {
    const heroRef = useRef<HTMLDivElement | null>(null);
    const { triggered: heroTriggered, playId: heroPlayId } = useScrambleTrigger(heroRef, { threshold: 0.35, once: true });
    const { isInitialLoading } = useAppLoader();
    const isMobile = useIsMobile();
    const [inView, setInView] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);
    const headerTriggered = heroTriggered;
    const [showCursor, setShowCursor] = useState(false);
    const [contactPlayId, setContactPlayId] = useState(0);
    const [portfolioPlayId, setPortfolioPlayId] = useState(0);
    const contactHoveringRef = useRef(false);
    const portfolioHoveringRef = useRef(false);

    const triggerContactScramble = useCallback(() => {
        if (contactHoveringRef.current) return;
        contactHoveringRef.current = true;
        setContactPlayId((prev) => prev + 1);
    }, []);

    const resetContactHoverState = useCallback(() => {
        contactHoveringRef.current = false;
    }, []);

    const triggerPortfolioScramble = useCallback(() => {
        if (portfolioHoveringRef.current) return;
        portfolioHoveringRef.current = true;
        setPortfolioPlayId((prev) => prev + 1);
    }, []);

    const resetPortfolioHoverState = useCallback(() => {
        portfolioHoveringRef.current = false;
    }, []);

    useEffect(() => {
        if (!heroTriggered) return;
        setInView(true);
        setHasTriggered(true);
    }, [heroTriggered]);

    useEffect(() => {
        if (!hasTriggered || isInitialLoading) return;

        const frame = requestAnimationFrame(() => {
            setShowCursor(true);
        });
        const cursorInterval = window.setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 480);

        return () => {
            cancelAnimationFrame(frame);
            window.clearInterval(cursorInterval);
        };
    }, [hasTriggered, isInitialLoading]); // Blinking cursor só começa após loader para evitar jank

    // Wrapper condicional: Mobile usa CSS puro, Desktop usa Three.js
    const BackgroundWrapper = isMobile ? MobileBackground : AuroraFlow;

    return (
        <BackgroundWrapper
            id="home"
            className="relative min-h-screen w-full"
        >
            <div ref={heroRef} className="pl-[5%] pb-[5%] relative flex w-full h-screen items-start justify-end flex-col gap-16 px-6 ">
                <div className="relative flex flex-col items-start justify-end">
                    <div className="">
                        <div className="flex flex-col gap-4 mb-10">
                            <div className="text-7xl text-balance uppercase">
                                <h1 className="">já fazemos<br />soluções<br />como
                                    <TextScramble
                                        className=""
                                        duration={1}
                                        speed={0.03}
                                        trigger={headerTriggered}
                                        playId={heroPlayId}
                                    > futuramente
                                    </TextScramble>
                                </h1>
                            </div>
                        </div>
                        <m.p
                            initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
                            animate={hasTriggered && inView && !isInitialLoading ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
                            className="text-white/85 font-extralight uppercase tracking-[0.2em] mix-blend-difference pb-8"
                        >
                            Transformando desafios complexos em soluções de impacto
                            com<br />tecnologia de ponta.
                        </m.p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        {/* Botão Iniciar Projeto - Tech Style */}
                        <Link
                            href="#contato"
                            className="z-10 relative group inline-flex items-center justify-center"
                            onMouseEnter={triggerContactScramble}
                            onMouseLeave={resetContactHoverState}
                            onFocus={triggerContactScramble}
                            onBlur={resetContactHoverState}
                        >
                            {/* Backdrop blur layer */}
                            <div
                                className="absolute inset-0 bg-primary/90 group-hover:bg-primary transition-colors duration-300"
                                style={{
                                    clipPath: 'polygon(8% 0%, 100% 0%, 100% 70%, 92% 100%, 0% 100%, 0% 30%)'
                                }}
                            />
                            {/* Border SVG */}
                            <div className="absolute inset-0 pointer-events-none">
                                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <path
                                        d="M 8 0 L 100 0 L 100 70 L 92 100 L 0 100 L 0 30 L 8 0 Z"
                                        vectorEffect="non-scaling-stroke"
                                        className="stroke-1 fill-none stroke-white/20 group-hover:stroke-white/40 transition-all duration-300"
                                    />
                                </svg>
                                {/* Corner accents */}
                                <svg className="absolute -top-px -left-px w-4 h-4 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <path d="M 0 12 V 0 H 12" fill="none" stroke="currentColor" strokeWidth="2" />
                                </svg>
                                <svg className="absolute -bottom-px -right-px w-4 h-4 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <path d="M 16 4 V 16 H 4" fill="none" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </div>
                            {/* Content */}
                            <div className="relative z-10 flex items-center px-8 py-4">
                                <TextScramble
                                    as="span"
                                    className="text-sm font-semibold uppercase tracking-[0.2em] text-black"
                                    duration={0.8}
                                    speed={0.035}
                                    trigger={contactPlayId > 0}
                                    playId={contactPlayId}
                                    idleGlitch={false}
                                >
                                    {"iniciar projeto"}
                                </TextScramble>
                                <ArrowRight className="ml-3 size-4 shrink-0 text-black transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-125" />
                            </div>
                        </Link>

                        {/* Botão Ver Portfólio - Tech Style */}
                        <Link
                            href="#cases"
                            className="z-10 relative group inline-flex items-center justify-center"
                            onMouseEnter={triggerPortfolioScramble}
                            onMouseLeave={resetPortfolioHoverState}
                            onFocus={triggerPortfolioScramble}
                            onBlur={resetPortfolioHoverState}
                        >
                            {/* Backdrop blur layer */}
                            <div
                                className="absolute inset-0 backdrop-blur-md bg-white/5 group-hover:bg-primary/10 transition-colors duration-300"
                                style={{
                                    clipPath: 'polygon(8% 0%, 100% 0%, 100% 70%, 92% 100%, 0% 100%, 0% 30%)'
                                }}
                            />
                            {/* Border SVG */}
                            <div className="absolute inset-0 pointer-events-none">
                                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <path
                                        d="M 8 0 L 100 0 L 100 70 L 92 100 L 0 100 L 0 30 L 8 0 Z"
                                        vectorEffect="non-scaling-stroke"
                                        className="stroke-1 fill-none stroke-white/25 group-hover:stroke-primary/50 transition-all duration-300"
                                    />
                                </svg>
                                {/* Corner accents */}
                                <svg className="absolute -top-px -left-px w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <path d="M 0 12 V 0 H 12" fill="none" stroke="currentColor" strokeWidth="2" />
                                </svg>
                                <svg className="absolute -bottom-px -right-px w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <path d="M 16 4 V 16 H 4" fill="none" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </div>
                            {/* Content */}
                            <div className="relative z-10 flex items-center px-8 py-4">
                                <TextScramble
                                    as="span"
                                    className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80 group-hover:text-primary transition-colors duration-300"
                                    duration={0.8}
                                    speed={0.035}
                                    trigger={portfolioPlayId > 0}
                                    playId={portfolioPlayId}
                                    idleGlitch={false}
                                >
                                    {"ver portfólio"}
                                </TextScramble>
                                <Play className="ml-3 size-4 shrink-0 text-white/80 group-hover:text-primary transition-all duration-300 group-hover:translate-x-1 group-hover:scale-125" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </BackgroundWrapper>
    );
}
