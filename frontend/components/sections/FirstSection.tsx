'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { AuroraFlow } from "@/components/AuroraFlow";
import { TextScramble } from '@/components/ui/textScramble/index';
import GlassBackground from '@/components/GlassBackground';
// import ImageStructure3D from '@/components/ImageStructure3D';
import { useAppLoader } from '@/components/AppLoaderShell';

export default function FirstSection() {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const { isInitialLoading } = useAppLoader();
    const [inView, setInView] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);
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
        if (!sectionRef.current) return;
        const el = sectionRef.current;
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setInView(true);
                        setHasTriggered(true);
                    }
                });
            },
            { threshold: 0.3 }
        );

        obs.observe(el);
        return () => obs.disconnect();
    }, []);

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
    }, [hasTriggered, isInitialLoading]);

    return (
        <AuroraFlow
            id="home"
            ref={sectionRef}
            className="relative min-h-screen w-full"
        >
            <div className="pl-[5%] pb-[5%] relative flex w-full h-screen items-start justify-end flex-col gap-16 px-6 ">
                <div className="relative space-y-12">
                    <div className="space-y-6">
                        <div className="flex flex-col gap-6">
                            <TextScramble
                                as="span"
                                className="text-md font-extralight uppercase text-primary tracking-[0.2em] mix-blend-difference"
                                duration={1}
                                speed={0.03}
                                trigger={hasTriggered && inView && !isInitialLoading}
                            >
                                {"[Inteli Junior]"}
                            </TextScramble>
                            <div className="text-7xl text-balance uppercase whitespace-pre-line">
                                <TextScramble
                                    as="h1"
                                    className=""
                                    duration={1}
                                    speed={0.03}
                                    trigger={hasTriggered && inView && !isInitialLoading}
                                >
                                    {"Já fazemos\nsoluções\ncomo futuramente"}
                                </TextScramble>
                                <span
                                    aria-hidden="true"
                                    className={`ml-2 inline-block align-baseline font-extralight text-foreground transition-opacity duration-150 ${showCursor && hasTriggered ? "opacity-90" : "opacity-0"
                                        }`}
                                >
                                    |
                                </span>
                            </div>
                        </div>
                        <TextScramble
                            as="span"
                            className="text-white/85 font-extralight uppercase tracking-[0.2em] h-22 mix-blend-difference"
                            duration={1}
                            speed={0.03}
                            trigger={hasTriggered && inView && !isInitialLoading}
                        >
                            {"Transformando desafios complexos em soluções de impacto\ncom tecnologia de ponta."}
                        </TextScramble>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <Link
                            href="#contato"
                            className="z-10 border-[0.5px] border-white/20 relative group inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground transition shadow-[var(--shadow-inner-button)] hover:border-none hover:shadow-[var(--shadow-inner-button-hover)]"
                            onMouseEnter={triggerContactScramble}
                            onMouseLeave={resetContactHoverState}
                            onFocus={triggerContactScramble}
                            onBlur={resetContactHoverState}
                        >
                            <TextScramble
                                as="span"
                                duration={0.8}
                                speed={0.035}
                                trigger={hasTriggered && inView && !isInitialLoading}
                                playId={contactPlayId}
                            >
                                {"iniciar projeto"}
                            </TextScramble>
                            <ArrowRight className="ml-3 size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-150" />
                        </Link>
                        <Link
                            href="#cases"
                            className="z-10 relative inline-flex items-center justify-center text-sm font-semibold uppercase tracking-[0.2em] text-foreground mix-blend-difference"
                            onMouseEnter={triggerPortfolioScramble}
                            onMouseLeave={resetPortfolioHoverState}
                            onFocus={triggerPortfolioScramble}
                            onBlur={resetPortfolioHoverState}
                        >
                            <GlassBackground cn='px-8 py-4 flex items-center justify-center group hover:border-primary/20 hover:bg-primary/6 hover:text-primary'>
                                <TextScramble
                                    as="span"
                                    duration={0.8}
                                    speed={0.035}
                                    trigger={hasTriggered && inView && !isInitialLoading}
                                    playId={portfolioPlayId}
                                >
                                    {"ver portfólio"}
                                </TextScramble>
                                <Play className="ml-3 size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-120" />
                            </GlassBackground>
                        </Link>
                    </div>
                </div>
            </div>
        </AuroraFlow>
    );
}
