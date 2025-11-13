"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import GlassBackground from "../glass-background";
import { TextScramble } from "./text-scramble";
import Image from "next/image";
import { useAppLoader } from "../AppLoaderShell";

const NAV_ITEMS = [
    { label: "QUEM SOMOS", href: "#" },
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

    return (
        <header className="fixed z-40 w-fit pt-6 left-1/2 transform -translate-x-1/2">
            <GlassBackground cn="mx-auto flex items-center justify-between pr-26 pl-4 pointer-events-auto gap-12">
                <Image src="/images/logo.svg" alt="Logo Inteli Junior" className="py-2" width={32} height={32} />
                <nav>
                    <ul className="flex items-center gap-12 text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
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
                                        className="relative"
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