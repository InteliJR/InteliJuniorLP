"use client";


import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TextScramble } from "@/components/ui/textScramble/index";
import { useAppLoader } from "@/components/AppLoaderShell";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useScrambleTrigger } from "@/hooks/useScrambleTrigger";

import ImageStructure3D from "@/components/ImageStructure3D";

function useTilt3D(intensity = 1000, throttleDelay = 30) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastCallRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastCallRef.current < throttleDelay) return;
      lastCallRef.current = now;

      const box = container.getBoundingClientRect();
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      const centerX = box.width / 2;
      const centerY = box.height / 2;
      const rotateX = (y - centerY) / intensity;
      const rotateY = (centerX - x) / intensity;

      setRotate({ x: rotateX, y: rotateY });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setRotate({ x: 0, y: 0 });
      setIsHovered(false);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [intensity, throttleDelay]);

  return { containerRef, rotate, isHovered };
}


function GlassmorphismBackground({
  children,
  id,
  className,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  const { containerRef, rotate, isHovered } = useTilt3D(600, 30);
  const hoverScale = 1.0001;

  return (
    <section ref={containerRef} id={id} className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, #0b0a0b 0%, #05060f 100%)",
        }}
      />
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-1/4 -right-1/4 w-[60%] h-[60%] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(255,77,58,0.4) 0%, rgba(255,77,58,0.1) 40%, transparent 70%)",
            filter: "blur(60px)",
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-1/4 -left-1/4 w-[50%] h-[50%] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(255,120,85,0.35) 0%, rgba(255,77,58,0.1) 40%, transparent 70%)",
            filter: "blur(80px)",
            animation: "float 10s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(255,150,130,0.3) 0%, transparent 60%)",
            filter: "blur(100px)",
            animation: "pulse-glow 6s ease-in-out infinite",
          }}
        />
      </div>
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      <div
        className="absolute inset-6 will-change-transform"
        style={{
          transform: `perspective(5000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${isHovered ? hoverScale : 1}, ${isHovered ? hoverScale : 1}, 1)`,
          transition: "all 500ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
        }}
      >
        <div
          className="relative w-full h-full"
          style={{
            clipPath:
              "polygon(5% 0%, 100% 0%, 100% 92%, 95% 100%, 0% 100%, 0% 8%)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #0f0f12 0%, #1a0a0a 20%, #2d0d0d 45%, #3a1010 55%, #2d0d0d 70%, #1a0a0a 85%, #0f0f12 100%)",
            }}
          />
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 50%, rgba(0,0,0,0.05) 100%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
              clipPath:
                "polygon(5% 0%, 100% 0%, 100% 92%, 95% 100%, 0% 100%, 0% 8%)",
            }}
          />
        </div>
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M 5 0 L 100 0 L 100 92 L 95 100 L 0 100 L 0 8 L 5 0 Z"
            vectorEffect="non-scaling-stroke"
            className="stroke-[1.5px] fill-none stroke-white/20"
          />
        </svg>
        <svg className="absolute -top-px -left-px w-10 h-10 text-primary opacity-80 pointer-events-none">
          <path
            d="M 0 24 V 0 H 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          />
        </svg>
        <svg className="absolute -bottom-px -right-px w-10 h-10 text-primary opacity-80 pointer-events-none">
          <path
            d="M 40 16 V 40 H 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          />
        </svg>
      </div>

      {children}

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(20px, -20px) scale(1.05);
          }
        }
        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.1;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.15;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }
      `}</style>
    </section>
  );
}

export default function FirstSection() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { triggered: heroTriggered, playId: heroPlayId } = useScrambleTrigger(
    heroRef,
    { threshold: 0.35, once: true }
  );
  const { isInitialLoading } = useAppLoader();
  const isMobile = useIsMobile();
  const inView = heroTriggered;
  const hasTriggered = heroTriggered;
  const hasMounted = true;
  const headerTriggered = heroTriggered;

  const [contactPlayId, setContactPlayId] = useState(0);
  const contactHoveringRef = useRef(false);

  const triggerContactScramble = useCallback(() => {
    if (contactHoveringRef.current) return;
    contactHoveringRef.current = true;
    setContactPlayId((prev) => prev + 1);
  }, []);

  const resetContactHoverState = useCallback(() => {
    contactHoveringRef.current = false;
  }, []);


  return (
    <GlassmorphismBackground id="home" className="relative min-h-screen w-full">
      <div ref={heroRef} className="relative flex w-full h-screen">
        <div className="flex-1 flex flex-col items-start justify-end pl-[5%] pb-[8%] px-6 z-10">
          <div className="relative flex flex-col items-start justify-end">
            <div className="">
              <div className="flex flex-col gap-4 mb-10">
                <div className="text-5xl md:text-6xl lg:text-7xl text-balance uppercase">
                  <h1 className="">
                    já fazemos
                    <br />
                    soluções
                    <br />
                    como
                    <TextScramble
                      className=""
                      duration={1}
                      speed={0.03}
                      trigger={headerTriggered}
                      playId={heroPlayId}
                    >
                      {" "}
                      futuramente
                    </TextScramble>
                  </h1>
                </div>
              </div>
              <m.p
                initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                animate={
                  hasTriggered && inView && !isInitialLoading
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 1, y: 0, filter: "blur(0px)" }
                }
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                className="text-white/85 font-extralight uppercase tracking-[0.2em] mix-blend-difference pb-8"
              >
                Transformando desafios complexos em soluções de impacto com
                <br />
                tecnologia de ponta.
              </m.p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="#contato"
                className="z-10 relative group inline-flex items-center justify-center"
                onMouseEnter={triggerContactScramble}
                onMouseLeave={resetContactHoverState}
                onFocus={triggerContactScramble}
                onBlur={resetContactHoverState}
              >
                <div
                  className="absolute inset-0 bg-primary/90 group-hover:bg-primary transition-colors duration-300"
                  style={{
                    clipPath:
                      "polygon(8% 0%, 100% 0%, 100% 70%, 92% 100%, 0% 100%, 0% 30%)",
                  }}
                />
                <div className="absolute inset-0 pointer-events-none">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 8 0 L 100 0 L 100 70 L 92 100 L 0 100 L 0 30 L 8 0 Z"
                      vectorEffect="non-scaling-stroke"
                      className="stroke-1 fill-none stroke-white/20 group-hover:stroke-white/40 transition-all duration-300"
                    />
                  </svg>
                  <svg className="absolute -top-px -left-px w-4 h-4 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <path
                      d="M 0 12 V 0 H 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  <svg className="absolute -bottom-px -right-px w-4 h-4 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <path
                      d="M 16 4 V 16 H 4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="relative z-10 flex items-center px-8 py-4">
                  <TextScramble
                    as="span"
                    className="text-sm font-semibold uppercase tracking-[0.2em] text-white font-bold"
                    duration={0.8}
                    speed={0.035}
                    trigger={contactPlayId > 0}
                    playId={contactPlayId}
                    idleGlitch={false}
                  >
                    {"ENTRAR EM CONTATO"}
                  </TextScramble>
                  <ArrowRight className="ml-3 size-4 shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-125" />
                </div>
              </Link>
            </div>
          </div>
        </div>
        {hasMounted && !isMobile && (
          <div className="absolute right-6 top-6 bottom-6 w-[45%] z-20 pointer-events-auto">
            <ImageStructure3D className="w-full h-full" />
          </div>
        )}
      </div>
    </GlassmorphismBackground>
  );
}
