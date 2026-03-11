"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

type LenisInstance = Lenis & { scroll?: number; resize?: () => void };

type PageShellProps = {
    children: React.ReactNode;
};

export default function PageShell({ children }: PageShellProps) {
    const loaderRef = useRef<HTMLDivElement>(null);
    const loaderBarRef = useRef<HTMLDivElement>(null);
    const lenisRef = useRef<Lenis | null>(null);
    const rafRef = useRef<number | null>(null);
    const animatedRef = useRef(false);

    useEffect(() => {
        if (lenisRef.current) return;

        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        }) as LenisInstance;

        lenisRef.current = lenis;

        const raf = (time: number) => {
            lenis.raf(time);
            rafRef.current = requestAnimationFrame(raf);
        };

        rafRef.current = requestAnimationFrame(raf);

        const handleAnchorClick = (event: Event) => {
            const anchor = event.currentTarget as HTMLAnchorElement | null;
            if (!anchor) return;
            const href = anchor.getAttribute("href");
            if (!href || !href.startsWith("#")) return;

            const target = document.querySelector(href);
            if (target) {
                event.preventDefault();
                lenis.scrollTo(target as HTMLElement, { offset: -48 });
            }
        };

        const anchors = Array.from(
            document.querySelectorAll('a[href^="#"]'),
        ) as HTMLAnchorElement[];
        anchors.forEach((anchor) => anchor.addEventListener("click", handleAnchorClick));

        const onScroll = () => ScrollTrigger.update();
        lenis.on("scroll", onScroll);

        const handleRefresh = () => {
            lenis.resize?.();
            ScrollTrigger.update();
        };
        ScrollTrigger.addEventListener("refresh", handleRefresh);
        window.addEventListener("resize", handleRefresh);
        ScrollTrigger.refresh();

        return () => {
            anchors.forEach((anchor) => anchor.removeEventListener("click", handleAnchorClick));
            ScrollTrigger.removeEventListener("refresh", handleRefresh);
            window.removeEventListener("resize", handleRefresh);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (animatedRef.current) return;
        animatedRef.current = true;

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {

            const splitWords = (selector: string) => {
                document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
                    if (el.querySelector(".word-wrap")) return;
                    const text = el.textContent?.trim();
                    if (!text) return;
                    const wrapped = text
                        .split(" ")
                        .map(
                            (word) =>
                                `<span class="word-wrap"><span class="word-inner">${word}&nbsp;</span></span>`,
                        )
                        .join("");
                    el.innerHTML = wrapped;
                });
            };

            const splitLetters = (selector: string, charClass: string, gapClass: string) => {
                document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
                    if (el.querySelector(`.${charClass}`)) return;
                    const text = el.textContent?.trim();
                    if (!text) return;
                    const chars = text
                        .split("")
                        .map((char) => {
                            if (char === " ") return `<span class="${gapClass}">&nbsp;</span>`;
                            return `<span class="${charClass}">${char}</span>`;
                        })
                        .join("");
                    el.innerHTML = chars;
                });
            };

            splitLetters("[data-hero-letters]", "hero-char", "hero-gap");
            splitWords("[data-split]");

            // Ensure hero fade elements start hidden for intro animation
            gsap.set("[data-hero-fade]", { opacity: 0, y: 20 });

            const runHeroIntro = () => {
                gsap.to(".hero-char", {
                    y: 0,
                    opacity: 1,
                    stagger: 0.045,
                    duration: 1.2,
                    ease: "power4.out",
                    delay: 0.2,
                });

                gsap.to("[data-hero-fade]", {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    delay: 0.35,
                });
            };

            const loaderTimeline = gsap.timeline({
                defaults: { ease: "power3.out" },
                onComplete: () => {
                    document.documentElement.style.overflow = "";
                    if (loaderRef.current) {
                        loaderRef.current.setAttribute("data-hidden", "true");
                    }
                    runHeroIntro();
                },
            });

            if (loaderRef.current && loaderBarRef.current) {
                document.documentElement.style.overflow = "hidden";
                const loaderText = loaderRef.current.querySelector(".loader-text");

                loaderTimeline
                    .to(loaderBarRef.current, {
                        width: "100%",
                        duration: 1.2,
                        ease: "expo.inOut",
                    })
                    .to(loaderText, {
                        y: -50,
                        opacity: 0,
                        duration: 0.6,
                        ease: "power3.in",
                    }, "-=0.2")
                    .to(loaderRef.current, {
                        yPercent: -100,
                        duration: 1.0,
                        ease: "power4.inOut",
                    });
            } else {
                runHeroIntro();
            }

            document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
                const words = el.querySelectorAll<HTMLElement>(".word-inner");
                gsap.to(words, {
                    y: "0%",
                    duration: 1.05,
                    ease: "power3.out",
                    stagger: 0.012,
                    scrollTrigger: {
                        trigger: el,
                        start: "top 82%",
                    },
                });
            });

            const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");
            cards.forEach((card, index) => {
                const inner = card.querySelector<HTMLElement>("[data-stack-inner]");
                const nextCard = cards[index + 1];
                if (!inner || !nextCard) return;

                gsap.set(inner, { filter: "brightness(1)" });
                gsap.to(inner, {
                    filter: "brightness(0.5)",
                    ease: "none",
                    scrollTrigger: {
                        trigger: nextCard,
                        start: "top bottom",
                        end: "top 10vh",
                        scrub: true,
                    },
                });
            });

            ScrollTrigger.refresh();

            const footer = document.querySelector<HTMLElement>("[data-footer-parallax]");
            const wrapper = document.querySelector<HTMLElement>("[data-main-wrapper]");
            if (footer && wrapper) {
                gsap.fromTo(
                    footer,
                    { y: 150, opacity: 0.5 },
                    {
                        y: 0,
                        opacity: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: wrapper,
                            start: "bottom 100%",
                            end: "bottom 20%",
                            scrub: true,
                        },
                    },
                );
            }
        });

        return () => {
            document.documentElement.style.overflow = "";
            ctx.revert();
            ScrollTrigger.clearScrollMemory?.();
        };
    }, []);

    return (
        <>
            <div ref={loaderRef} className="loader" aria-label="Carregando">
                <div className="loader-text flex flex-col items-center gap-8 md:gap-10 text-3xl md:text-5xl font-thin text-primary tracking-tight uppercase">
                    <Image
                        src="/images/logo.svg"
                        alt="Logo Inteli Junior"
                        width={120}
                        height={120}
                        className="size-24 md:size-34"
                        priority
                    />
                    <span>
                        Inteli <span className="font-semibold">Júnior</span>
                    </span>
                </div>
                <div ref={loaderBarRef} className="loader-bar" />
            </div>

            <div className="page-noise" aria-hidden="true" />

            {children}
        </>
    );
}
