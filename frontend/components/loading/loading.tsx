"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Loading.css";
import { TextScramble } from "../ui/textScramble";

const VERTICES = [
    { x: 0, y: 2.2 },
    { x: 1.9, y: 1.1 },
    { x: 1.9, y: -1.1 },
    { x: 0, y: -2.2 },
    { x: -1.9, y: -1.1 },
    { x: -1.9, y: 1.1 },
    { x: 0.95, y: 0.55 },
    { x: -0.35, y: -0.3 },
];

const EDGE_SEGMENTS: Array<[number, number]> = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 0],
    [0, 4],
    [0, 7],
    [0, 6],
    [6, 2],
    [4, 2],
    [4, 7],
    [7, 2],
    [7, 6],
];

const EDGE_PATH = EDGE_SEGMENTS.map(([from, to]) => {
    const start = VERTICES[from];
    const end = VERTICES[to];
    return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
}).join(" ");

const LOADING_DURATION = 4200;
const LINE_HEIGHT = 28;

const LOADER_LINES = [
    "Inicializando protocolos de inovação",
    "Extraindo excelência técnica",
    "Otimizando experiência do usuário",
    "Carregando módulos de alta performance",
    "Validando integridade dos dados",
    "Renderizando interfaces responsivas",
    "Aplicando diretrizes de acessibilidade",
    "Sincronizando design system",
    "Configurando estratégias de cache",
    "Finalizando otimizações de SEO",
    "Preparando ambiente de impacto",
    "Sistema pronto para decolar.",
];

const MAX_VISIBLE_LINES = 12;

const Loading = ({ onComplete }: { onComplete: () => void }) => {
    const loadingRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const glowPathRefs = useRef<SVGPathElement[]>([]);
    const codeContainerRef = useRef<HTMLDivElement>(null);
    const lineCursorRef = useRef(0);
    const lineNumberRef = useRef(1);

    const [visibleLines, setVisibleLines] = useState<Array<{ text: string; number: number }>>([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [dotCount, setDotCount] = useState(0);

    const totalLines = LOADER_LINES.length;

    const registerGlowPathRef = useCallback((el: SVGPathElement | null, index: number) => {
        if (!el) return;
        glowPathRefs.current[index] = el;
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (!loadingRef.current) return;

            gsap.fromTo(
                loadingRef.current,
                { opacity: 0, scale: 0.85 },
                { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
            );

            glowPathRefs.current.forEach((path, index) => {
                if (!path) return;

                const totalLength = path.getTotalLength();

                path.style.setProperty("--path-length", `${totalLength}`);

                const delaySeconds = index * 3;
                path.style.setProperty("--dash-delay", `${delaySeconds}s`);
            });

            const exitTimeout = window.setTimeout(() => {
                gsap.to(loadingRef.current, {
                    opacity: 0,
                    duration: 0.8,
                    delay: 0.65,
                    ease: "power2.out",
                    onComplete,
                });
            }, LOADING_DURATION);

            return () => {
                window.clearTimeout(exitTimeout);
            };
        });

        return () => ctx.revert();
    }, [onComplete]);

    useEffect(() => {
        if (!totalLines) return;

        const initialVisibleCount = 1;
        const initialLines = Array.from({ length: initialVisibleCount }, (_, idx) => ({
            text: LOADER_LINES[idx],
            number: idx + 1,
        }));

        setVisibleLines(initialLines);
        setScrollPosition(0);

        lineCursorRef.current = initialVisibleCount % totalLines;
        lineNumberRef.current = initialVisibleCount + 1;

        if (codeContainerRef.current) {
            codeContainerRef.current.scrollTop = 0;
        }
    }, [totalLines]);

    useEffect(() => {
        if (!totalLines) return undefined;

        const advanceTimer = window.setInterval(() => {
            setVisibleLines((prevLines) => {
                const nextLine = LOADER_LINES[lineCursorRef.current];
                const nextNumber = lineNumberRef.current;

                lineCursorRef.current = (lineCursorRef.current + 1) % totalLines;
                lineNumberRef.current += 1;

                const updated = [...prevLines, { text: nextLine, number: nextNumber }];
                if (updated.length > MAX_VISIBLE_LINES) {
                    return updated.slice(updated.length - MAX_VISIBLE_LINES);
                }

                return updated;
            });

            setScrollPosition((prevPosition) => prevPosition + LINE_HEIGHT);
        }, 600);

        return () => window.clearInterval(advanceTimer);
    }, [totalLines]);

    useEffect(() => {
        if (codeContainerRef.current) {
            codeContainerRef.current.scrollTop = scrollPosition;
        }
    }, [scrollPosition]);

    useEffect(() => {
        const dotsTimer = window.setInterval(() => {
            setDotCount((prev) => (prev + 1) % 4);
        }, 500);

        return () => window.clearInterval(dotsTimer);
    }, []);

    return (
        <div ref={loadingRef} className="loading-container flex flex-col items-center justify-center">
            <svg
                ref={svgRef}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 400 400"
                className="loader"
            >
                <g transform="translate(200 200) scale(50 -50)" stroke="currentColor" strokeWidth={0.08}>
                    <path
                        className="edge-base"
                        d={EDGE_PATH}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    {["primary", "secondary"].map((variant, index) => (
                        <path
                            key={`glow-${variant}`}
                            ref={(el) => registerGlowPathRef(el, index)}
                            className={`edge-glow edge-glow--${variant}`}
                            d={EDGE_PATH}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    ))}
                </g>
            </svg>
            <TextScramble
                as="span"
                duration={0.8}
                speed={0.035}
                trigger={true}
                className="text-primary text-xl -mt-8"
            >
                {"[INTELI JUNIOR]"}
            </TextScramble>
            <div className="mt-12 w-full flex flex-col items-center justify-center">
                <div className="flex gap-2 text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    <span className="">
                        CARREGANDO
                        <span aria-hidden="true" className="inline-flex w-6 justify-start tracking-normal">
                            {".".repeat(dotCount)}
                        </span>
                    </span>
                </div>
                <div className="relative mt-3 overflow-hidden rounded-lg text-muted-foreground">
                    <div
                        ref={codeContainerRef}
                        className="h-40 overflow-hidden font-mono text-xs leading-7"
                        style={{ scrollBehavior: "smooth" }}
                    >
                        <div>
                            {visibleLines.map((line) => (
                                <div key={`${line.number}-${line.text}`} className="flex h-7 items-center gap-3 px-3">
                                    <span className="w-6 shrink-0 text-right">
                                        {line.number.toString().padStart(2, "0")}
                                    </span>
                                    <span className="whitespace-nowrap">{line.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/30 via-black/10 to-black/0" />
                </div>
            </div>
        </div>
    );
};

export default Loading;