"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import { useLenis } from "lenis/react";
import { TextScramble } from "./textScramble";
import { useAppLoader } from "../AppLoaderShell";

const NAV_ITEMS = [
    { label: "QUEM\u00A0SOMOS", href: "#quem-somos" },
    { label: "TRAJETORIA", href: "#trajetoria" },
    { label: "SERVIÇOS", href: "#servicos" },
    { label: "PORTFÓLIO", href: "#cases" },
    { label: "MEMBROS", href: "#depoimentos" },
    { label: "CONTATO", href: "#contato" },
];

export default function Header() {
    const [playIds, setPlayIds] = useState(() => NAV_ITEMS.map(() => 0));
    const hoverLockRef = useRef<boolean[]>(NAV_ITEMS.map(() => false));
    const { isInitialLoading } = useAppLoader();
    const lenis = useLenis();
    const lastScrollYRef = useRef<number>(0);
    const stopTimeoutRef = useRef<number | null>(null);
    const tickingRef = useRef(false);
    const [isHidden, setIsHidden] = useState(false);

    const handleNavClick = useCallback((href: string, event: MouseEvent<HTMLAnchorElement> | PointerEvent<HTMLAnchorElement>) => {
        // evita duplicar quando já prevenimos no pointer/mousedown
        if (event.defaultPrevented) return;
        if (!href.startsWith("#")) return;

        const id = href.slice(1);
        const el = document.getElementById(id);
        if (!el) {
            // se a seção ainda não montou, deixa seguir o hash nativo
            window.location.hash = href;
            return;
        }

        event.preventDefault();

        if (lenis) {
            lenis.scrollTo(`#${id}`, { offset: -80, duration: 0.8 });
        } else {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        // Atualiza o hash no histórico para manter o estado da URL
        window.history.replaceState(null, "", href);
    }, [lenis]);

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

    useEffect(() => {
        lastScrollYRef.current = typeof window !== 'undefined' ? window.scrollY : 0;

        const onScroll = () => {
            if (tickingRef.current) return;
            tickingRef.current = true;
            window.requestAnimationFrame(() => {
                const y = window.scrollY || 0;
                const delta = y - lastScrollYRef.current;
                lastScrollYRef.current = y;

                if (Math.abs(delta) > 6) {
                    setIsHidden(delta > 0 && y > 120);
                }

                if (stopTimeoutRef.current) window.clearTimeout(stopTimeoutRef.current);
                stopTimeoutRef.current = window.setTimeout(() => setIsHidden(false), 1400) as unknown as number;

                tickingRef.current = false;
            });
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (stopTimeoutRef.current) window.clearTimeout(stopTimeoutRef.current);
        };
    }, []);

    return (
        <header
            className={`fixed z-50 w-fit pt-14 left-1/2 transform -translate-x-1/2 transition-all duration-300 ease-out ${isHidden ? '-translate-y-24 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>

            {/* Tech Header Container */}
            <div className="relative group">
                {/* Backdrop blur layer - clipped to tech shape */}
                <div
                    className="absolute inset-0 backdrop-blur-md"
                    style={{
                        clipPath: 'polygon(2% 0%, 100% 0%, 100% 70%, 98% 100%, 0% 100%, 0% 30%)'
                    }}
                />

                {/* SVG Tech Shape Border */}
                <div className="absolute inset-0 pointer-events-none">
                    <svg
                        className="w-full h-full"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                    >
                        {/* The tech shape outline - border only */}
                        <path
                            d="M 2 0 L 100 0 L 100 70 L 98 100 L 0 100 L 0 30 L 2 0 Z"
                            vectorEffect="non-scaling-stroke"
                            className="stroke-1 fill-white/5 stroke-white/25 transition-all duration-500"
                        />
                    </svg>

                </div>

                {/* Content */}
                <div className="relative z-10 mx-auto flex items-center justify-between pr-12 pl-8 py-1 pointer-events-auto gap-10">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 400 400"
                            className="size-10 text-primary"
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
                        <div className="hidden sm:flex flex-col">
                            <span className="text-xs font-bold text-primary tracking-[0.2em] uppercase">Inteli</span>
                            <span className="text-[10px] text-white/50 font-mono tracking-widest">JÚNIOR</span>
                        </div>
                    </div>

                    {/* Separator */}
                    <div className="h-6 w-px bg-white/25" />

                    {/* Navigation */}
                    <nav>
                        <ul className="flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                            {NAV_ITEMS.map((item, index) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="relative inline-flex items-center justify-center whitespace-nowrap transition-colors duration-300 hover:text-primary group/link"
                                        onMouseDown={(event) => handleNavClick(item.href, event)}
                                        onClick={(event) => handleNavClick(item.href, event)}
                                        onMouseEnter={() => triggerScramble(index)}
                                        onMouseLeave={() => resetHoverState(index)}
                                        onFocus={() => triggerScramble(index)}
                                        onBlur={() => resetHoverState(index)}
                                    >
                                        <TextScramble
                                            as="span"
                                            duration={0.8}
                                            speed={0.035}
                                            trigger={playIds[index] > 0}
                                            playId={playIds[index]}
                                            idleGlitch={false}
                                            className="relative whitespace-nowrap"
                                        >
                                            {item.label}
                                        </TextScramble>
                                        {/* Underline effect */}
                                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover/link:w-full" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}