"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import GlassBackground from "../GlassBackground";
import { TextScramble } from "./textScramble";
import { useAppLoader } from "../AppLoaderShell";

const NAV_ITEMS = [
    { label: "QUEM\u00A0SOMOS", href: "#" },
    { label: "TRAJETORIA", href: "#" },
    { label: "SERVIÇOS", href: "#" },
    { label: "PORTFÓLIO", href: "#" },
    { label: "MEMBROS", href: "#" },
    { label: "CONTATO", href: "#" },
];

export default function Header() {
    const [playIds, setPlayIds] = useState(() => NAV_ITEMS.map(() => 0));
    const hoverLockRef = useRef<boolean[]>(NAV_ITEMS.map(() => false));
    const { isInitialLoading } = useAppLoader();
    const headerRef = useRef<HTMLElement | null>(null);
    const lastScrollYRef = useRef<number>(0);
    const scrollTimeoutRef = useRef<number | null>(null);
    const [isHidden, setIsHidden] = useState(false);

    const triggerScramble = useCallback((index: number) => {
        if (hoverLockRef.current[index]) return;

        hoverLockRef.current[index] = true;
        setPlayIds((prev) => {
            const next = [...prev];
            next[index] += 1;
            return next;
        });
    }, []);

    const resetHoverState = useCallback((index: number) => {
        hoverLockRef.current[index] = false;
    }, []);

    const hideHeader = useCallback(() => {
        if (isHidden) return;
        setIsHidden(true);
        if (headerRef.current) {
            gsap.killTweensOf(headerRef.current);
            gsap.to(headerRef.current, { y: -80, opacity: 0, duration: 0.35, ease: "power2.out" });
        }
    }, [isHidden]);

    const showHeader = useCallback(() => {
        if (!isHidden) return;
        setIsHidden(false);
        if (headerRef.current) {
            gsap.killTweensOf(headerRef.current);
            gsap.to(headerRef.current, { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" });
        }
    }, [isHidden]);

    useEffect(() => {
        // Initialize last scroll position
        lastScrollYRef.current = typeof window !== 'undefined' ? window.scrollY : 0;

        const onScroll = () => {
            const y = window.scrollY || 0;
            const delta = y - lastScrollYRef.current;
            lastScrollYRef.current = y;

            // small threshold to avoid noise
            if (Math.abs(delta) < 5) {
                // still reset stop timer
            }

            if (delta > 0) {
                // scrolling down
                hideHeader();
            } else if (delta < 0) {
                // scrolling up
                showHeader();
            }

            if (scrollTimeoutRef.current) {
                window.clearTimeout(scrollTimeoutRef.current);
            }

            scrollTimeoutRef.current = window.setTimeout(() => {
                // user stopped scrolling for 1.5s → show header
                showHeader();
            }, 1500) as unknown as number;
        };

        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
            if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
        };
    }, [hideHeader, showHeader]);

    return (
        <header
            ref={headerRef}
            className="fixed z-50 w-fit pt-14 left-1/2 transform -translate-x-1/2">
            <GlassBackground cn="mx-auto flex items-center justify-between pr-26 pl-4 pointer-events-auto gap-12">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 400 400"
                    className="size-12 text-primary mix-blend-difference"
                >
                    <g transform="translate(200 200) scale(50 -50)">
                        <path
                            d="M 0 2.2 L 1.9 1.1 M 1.9 1.1 L 1.9 -1.1 M 1.9 -1.1 L 0 -2.2 M 0 -2.2 L -1.9 -1.1 M -1.9 -1.1 L -1.9 1.1 M -1.9 1.1 L 0 2.2 M 0 2.2 L -1.9 -1.1 M 0 2.2 L -0.35 -0.3 M 0 2.2 L 0.95 0.55 M 0.95 0.55 L 1.9 -1.1 M -1.9 -1.1 L 1.9 -1.1 M -1.9 -1.1 L -0.35 -0.3 M -0.35 -0.3 L 1.9 -1.1 M -0.35 -0.3 L 0.95 0.55"
                            stroke="currentColor"
                            strokeWidth="0.18"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </g>
                </svg>
                <nav>
                    <ul className="flex items-center gap-12 text-xs font-semibold uppercase tracking-[0.28em] text-white/80 mix-blend-difference">
                        {NAV_ITEMS.map((item, index) => (
                            <li key={item.label}>
                                <Link
                                    href={item.href}
                                    className="relative inline-flex items-center justify-center whitespace-nowrap transition-colors duration-300 hover:text-primary"
                                    onMouseEnter={() => triggerScramble(index)}
                                    onMouseLeave={() => resetHoverState(index)}
                                    onFocus={() => triggerScramble(index)}
                                    onBlur={() => resetHoverState(index)}
                                >
                                    <TextScramble
                                        as="span"
                                        duration={0.8}
                                        speed={0.035}
                                        trigger={!isInitialLoading}
                                        playId={playIds[index]}
                                        className="relative whitespace-nowrap"
                                    >
                                        {item.label}
                                    </TextScramble>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </GlassBackground>
        </header>
    );
}