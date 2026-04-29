"use client";

/**
 * Splash de carregamento.
 * - Anima SVG com GSAP (bordas e brilho) e lista de mensagens em loop.
 * - Chama onComplete após animação para liberar o conteúdo (controlado pelo AppLoaderShell).
 */
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

const LOADING_DURATION = 3000;

const Loading = ({ onComplete }: { onComplete: () => void }) => {

    const loadingRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const glowPathRefs = useRef<SVGPathElement[]>([]);
    const [dotCount, setDotCount] = useState(0);

    const registerGlowPathRef = useCallback((el: SVGPathElement | null, index: number) => {
        if (!el) return;
        glowPathRefs.current[index] = el;
    }, []);

    // Bloqueia scroll durante o loading
    useEffect(() => {
        // Salva o estilo original
        const originalStyle = document.body.style.overflow;
        const originalHeight = document.body.style.height;
        const htmlOverflow = document.documentElement.style.overflow;

        // Bloqueia scroll
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
        document.documentElement.style.overflow = 'hidden';

        // Restaura quando o componente for desmontado
        return () => {
            document.body.style.overflow = originalStyle;
            document.body.style.height = originalHeight;
            document.documentElement.style.overflow = htmlOverflow;
        };
    }, []); // Evita scroll bleed enquanto o splash está ativo

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
            }, LOADING_DURATION); // Call onComplete ao fim da timeline para liberar AppLoaderShell

            return () => {
                window.clearTimeout(exitTimeout);
            };
        });

        return () => ctx.revert();
    }, [onComplete]);



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
                className="text-primary text-xl -mt-8 tracking-[0.2rem]"
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
            </div>
        </div>
    );
};

export default Loading;