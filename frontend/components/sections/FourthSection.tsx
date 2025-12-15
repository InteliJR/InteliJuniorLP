"use client";

/**
 * Seção de Serviços (catálogo interativo).
 * - Cards 3D com flip controlado por scroll (useScroll + useMotionValueEvent) para evitar work desnecessário.
 * - Constantes de clip-path e SVG são memoizadas para reduzir re-render.
 * - Ícones e cores vêm de config local; animações usam framer-motion.
 */
import { useState, useCallback, useRef, memo, useEffect } from "react";
import { m, useScroll, useSpring, useMotionValueEvent, MotionValue } from "framer-motion";
import { useScrambleTrigger } from "@/hooks/useScrambleTrigger";
import { TextScramble } from "../ui/textScramble";
import { cn } from "@/lib/utils";
import {
    BarChart3,
    Palette,
    Globe,
    Code2,
    ArrowRight,
    MousePointerClick,
    Lock,
    Zap,
    Cpu
} from "lucide-react";

// Dados dos serviços
const services = [
    {
        id: 1,
        title: "Análise de Dados",
        subtitle: "Insights que transformam negócios",
        description: "Construção de dashboards interativos, centralização de dados dispersos, visualização inteligente e integrações robustas para transformar dados brutos em insights estratégicos de negócio.",
        features: ["Dashboards Interativos", "ETL & Pipelines", "Visualização de Dados", "Relatórios Automatizados"],
        icon: BarChart3,
        technologies: [
            { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
            { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
            { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
            { name: "Power BI", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" },
            { name: "Pandas", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
            { name: "Apache Spark", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-original.svg" },
        ],
        accentColor: "cyan",
        serial: "DAT-01"
    },
    {
        id: 2,
        title: "Identidade Visual",
        subtitle: "Marcas que se destacam",
        description: "Criação de protótipos de alta fidelidade, logotipos memoráveis, paleta de cores estratégica e definição do tom de voz da marca para construir uma presença forte e coerente no mercado.",
        features: ["Logotipos & Branding", "UI/UX Design", "Design System", "Guia de Marca"],
        icon: Palette,
        technologies: [
            { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
            { name: "Adobe XD", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-original.svg" },
            { name: "Illustrator", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg" },
            { name: "Photoshop", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg" },
            { name: "After Effects", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg" },
            { name: "Canva", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg" },
        ],
        accentColor: "pink",
        serial: "VIS-02"
    },
    {
        id: 3,
        title: "Landing Pages",
        subtitle: "Sua vitrine digital premium",
        description: "O cartão de entrada da sua empresa. Criamos sites de alta conversão que colocam você à vista no mercado, incluindo configuração de domínio personalizado e e-mail corporativo profissional.",
        features: ["Design Responsivo", "SEO Otimizado", "Alta Performance", "Domínio & E-mail"],
        icon: Globe,
        technologies: [
            { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
            { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
            { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
            { name: "Vercel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
            { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
            { name: "Framer Motion", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg" },
        ],
        accentColor: "emerald",
        serial: "WEB-03"
    },
    {
        id: 4,
        title: "Aplicações Completas",
        subtitle: "Da ideia à realidade",
        description: "Desenvolvimento de soluções de ponta a ponta: desde interfaces intuitivas e persistência de dados escalável até integrações complexas de sistemas e implantação em ambiente de produção.",
        features: ["Frontend & Backend", "APIs & Integrações", "Banco de Dados", "Deploy & DevOps"],
        icon: Code2,
        technologies: [
            { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
            { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
            { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
            { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
            { name: "GitHub Actions", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg" },
            { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-original.svg" },
        ],
        accentColor: "orange",
        serial: "SYS-04"
    },
];

// Mapeamento de cores para classes Tailwind
const colorMap = {
    cyan: {
        text: "text-cyan-400",
        border: "border-cyan-400/40",
        hoverBorder: "group-hover:border-cyan-400/60",
        bg: "bg-cyan-400",
        bgHover: "bg-cyan-400",
        bgHoverClass: "group-hover:bg-cyan-400",
        glow: "bg-cyan-400/20",
        stroke: "stroke-cyan-400/50",
        strokeHover: "group-hover:stroke-cyan-400/50",
        gradient: "bg-linear-to-b from-cyan-950/40 via-black/80 to-black/95",
        innerShadow: "shadow-[inset_0_1px_2px_rgba(34,211,238,0.15),inset_0_-20px_40px_rgba(0,0,0,0.4)]",
        line: "bg-cyan-500",
        shadow: "shadow-cyan-500/50",
    },
    pink: {
        text: "text-pink-400",
        border: "border-pink-400/40",
        hoverBorder: "group-hover:border-pink-400/60",
        bg: "bg-pink-400",
        bgHover: "bg-pink-400",
        bgHoverClass: "group-hover:bg-pink-400",
        glow: "bg-pink-400/20",
        stroke: "stroke-pink-400/50",
        strokeHover: "group-hover:stroke-pink-400/50",
        gradient: "bg-linear-to-b from-pink-950/40 via-black/80 to-black/95",
        innerShadow: "shadow-[inset_0_1px_2px_rgba(244,114,182,0.15),inset_0_-20px_40px_rgba(0,0,0,0.4)]",
        line: "bg-pink-500",
        shadow: "shadow-pink-500/50",
    },
    emerald: {
        text: "text-emerald-400",
        border: "border-emerald-400/40",
        hoverBorder: "group-hover:border-emerald-400/60",
        bg: "bg-emerald-400",
        bgHover: "bg-emerald-400",
        bgHoverClass: "group-hover:bg-emerald-400",
        glow: "bg-emerald-400/20",
        stroke: "stroke-emerald-400/50",
        strokeHover: "group-hover:stroke-emerald-400/50",
        gradient: "bg-linear-to-b from-emerald-950/40 via-black/80 to-black/95",
        innerShadow: "shadow-[inset_0_1px_2px_rgba(52,211,153,0.15),inset_0_-20px_40px_rgba(0,0,0,0.4)]",
        line: "bg-emerald-500",
        shadow: "shadow-emerald-500/50",
    },
    orange: {
        text: "text-orange-400",
        border: "border-orange-400/40",
        hoverBorder: "group-hover:border-orange-400/60",
        bg: "bg-orange-400",
        bgHover: "bg-orange-400",
        bgHoverClass: "group-hover:bg-orange-400",
        glow: "bg-orange-400/20",
        stroke: "stroke-orange-400/50",
        strokeHover: "group-hover:stroke-orange-400/50",
        gradient: "bg-linear-to-b from-orange-950/40 via-black/80 to-black/95",
        innerShadow: "shadow-[inset_0_1px_2px_rgba(251,146,60,0.15),inset_0_-20px_40px_rgba(0,0,0,0.4)]",
        line: "bg-orange-500",
        shadow: "shadow-orange-500/50",
    },
};

// ClipPath constante para evitar recriação
const CARD_CLIP_PATH = 'polygon(8% 0%, 100% 0%, 100% 92%, 92% 100%, 0% 100%, 0% 8%)';
const ICON_CLIP_PATH = 'polygon(15% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%, 0% 15%)';
const BADGE_CLIP_PATH = 'polygon(10% 0%, 100% 0%, 100% 100%, 90% 100%, 0% 100%, 0% 0%)';
const CTA_CLIP_PATH = 'polygon(8% 0%, 100% 0%, 100% 70%, 92% 100%, 0% 100%, 0% 30%)';

// SVG Border Path constante
const CARD_SVG_PATH = "M 8 0 L 100 0 L 100 92 L 92 100 L 0 100 L 0 8 L 8 0 Z";
const CTA_SVG_PATH = "M 8 0 L 100 0 L 100 70 L 92 100 L 0 100 L 0 30 L 8 0 Z";

// Componente de Corner Accents memoizado
const CornerAccents = memo(function CornerAccents({ colorClass, show = false }: { colorClass: string; show?: boolean }) {
    const baseClass = "absolute w-6 h-6 pointer-events-none z-40 transition-opacity duration-300";
    const visibilityClass = show ? "opacity-100" : "opacity-0 group-hover:opacity-100";

    return (
        <>
            <svg className={cn(baseClass, visibilityClass, "-top-px -left-px", colorClass)}>
                <path d="M 0 16 V 0 H 16" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
            <svg className={cn(baseClass, visibilityClass, "-bottom-px -right-px", colorClass)}>
                <path d="M 24 8 V 24 H 8" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
        </>
    );
});

// Componente SVG Border memoizado
const TechBorder = memo(function TechBorder({ strokeClass }: { strokeClass: string }) {
    return (
        <div className="absolute inset-0 pointer-events-none z-30">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                    d={CARD_SVG_PATH}
                    vectorEffect="non-scaling-stroke"
                    className={cn("stroke-1 fill-none transition-colors duration-300", strokeClass)}
                />
            </svg>
        </div>
    );
});

// Componente ServiceCard otimizado com memo
const ServiceCard = memo(function ServiceCard({
    service,
    align,
    scrollProgress,
    threshold
}: {
    service: typeof services[0],
    align: "left" | "right",
    scrollProgress: MotionValue<number>,
    threshold: number
}) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isActive, setIsActive] = useState(false);

    // Escuta o progresso do scroll para acionar a revelação
    useMotionValueEvent(scrollProgress, "change", (latest) => {
        // Ativa/desativa baseado no progresso local do scroll para cada card
        if (latest > threshold && !isActive) setIsActive(true);
        else if (latest <= threshold && isActive) setIsActive(false);
    });

    const Icon = service.icon;
    const colors = colorMap[service.accentColor as keyof typeof colorMap];

    const handleClick = useCallback(() => setIsFlipped(prev => !prev), []); // Toggle frente/verso
    const handleMouseLeave = useCallback(() => {
        setIsFlipped(false); // Volta para frente ao sair para evitar hover stuck
    }, []);

    return (
        <div
            className={cn(
                "relative w-full max-w-xl h-[500px] group perspective-[2000px] cursor-pointer",
                align === "left" ? "mr-auto" : "ml-auto"
            )}
            onClick={handleClick}
            onMouseLeave={handleMouseLeave}
        >
            {/* Container 3D - Adicionado will-change-transform para otimização de performance */}
            <div
                className={cn(
                    "relative w-full h-full transform-3d will-change-transform",
                    "transition-transform duration-700 cubic-bezier(0.2, 0.8, 0.2, 1)",
                    isFlipped ? "rotate-y-180" : "rotate-y-0"
                )}
            >
                {/* ========== FRENTE DO CARD (2 Estados: Bloqueado vs Desbloqueado) ========== */}
                <div
                    className={cn(
                        "absolute inset-0 w-full h-full backface-hidden",
                        isFlipped && "pointer-events-none"
                    )}
                >
                    {/* Borda SVG */}
                    <TechBorder strokeClass={cn(
                        "transition-all duration-500",
                        isActive ? colors.stroke : "stroke-white/30"
                    )} />

                    {/* Elementos HUD */}
                    <div className="absolute top-3 right-3 z-40 pointer-events-none flex gap-2">
                        <div className={cn(
                            "w-2 h-2 rounded-full transition-all duration-300",
                            isActive ? `${colors.bgHoverClass} shadow-[0_0_10px_currentColor]` : "bg-white/30"
                        )} />
                    </div>

                    {/* Camadas de fundo */}
                    <div className="absolute inset-0 overflow-hidden" style={{ clipPath: CARD_CLIP_PATH }}>
                        {/* Fundo Escuro Base - OPACO (bg-black) para não mostrar o fio atrás */}
                        <div className="absolute inset-0 bg-black" />

                        {/* Gradiente do Estado Desbloqueado (Ativo) */}
                        <div className={cn(
                            "absolute inset-0 transition-opacity duration-700",
                            isActive ? "opacity-100" : "opacity-0",
                            colors.gradient
                        )} />

                        {/* Padrão do Estado Bloqueado (!Ativo) */}
                        <div className={cn(
                            "absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%,transparent_100%)] bg-size-[20px_20px]",
                            isActive ? "opacity-0" : "opacity-100"
                        )} />

                        {/* Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[24px_24px] opacity-50" />
                    </div>

                    {/* CONTEÚDO: ESTADO BLOQUEADO (Idle) */}
                    <div className={cn(
                        "absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 p-8 text-center z-20",
                        isActive ? "opacity-0 translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"
                    )}>
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 animate-pulse-slow" />
                            <Icon className="w-16 h-16 text-white/20" strokeWidth={1} />
                            <Lock className="absolute -bottom-2 -right-2 w-6 h-6 text-white/30" />
                        </div>
                        <h3 className="text-2xl font-bold text-white/30 uppercase tracking-[0.3em] font-mono">
                            {service.serial}
                        </h3>
                        <div className="mt-4 px-3 py-1 bg-white/5 border border-white/5 rounded-full flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-red-500/50 rounded-full animate-pulse" />
                            <span className="text-[10px] uppercase tracking-widest text-white/40">Waiting Connection...</span>
                        </div>
                    </div>

                    {/* CONTEÚDO: ESTADO DESBLOQUEADO (Ativo) */}
                    <div className={cn(
                        "absolute inset-0 flex flex-col justify-between p-8 z-20 transition-all duration-500 delay-75",
                        isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
                    )}>
                        <div className="flex items-start justify-between">
                            <div
                                className={cn(
                                    "w-16 h-16 flex items-center justify-center",
                                    "bg-white/5 border transition-all duration-300",
                                    colors.border, colors.hoverBorder,
                                    "group-hover:bg-white/10"
                                )}
                                style={{ clipPath: ICON_CLIP_PATH }}
                            >
                                <Icon className={cn("w-7 h-7", colors.text)} strokeWidth={1.5} />
                            </div>

                            <div
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-white/60 text-xs"
                                style={{ clipPath: BADGE_CLIP_PATH }}
                            >
                                <MousePointerClick className="w-4 h-4 text-white" />
                                <span className="uppercase tracking-wider text-[10px]">Clique para ver stack</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-2xl font-semibold text-white uppercase tracking-[0.15em] mb-2 drop-shadow-lg">
                                    {service.title}
                                </h3>
                                <p className={cn("text-sm font-medium mb-3", colors.text)}>
                                    {service.subtitle}
                                </p>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    {service.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/10">
                                {service.features.map((feature) => (
                                    <div key={feature} className="flex items-center gap-2 text-white/60 text-xs">
                                        <Zap className={cn("w-3 h-3", colors.text)} />
                                        <span className="tracking-wide">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ========== VERSO DO CARD (Tech Stack) ========== */}
                <div
                    className={cn(
                        "absolute inset-0 w-full h-full backface-hidden rotate-y-180",
                        !isFlipped && "pointer-events-none"
                    )}
                >
                    <TechBorder strokeClass={cn("stroke-white/20", colors.stroke)} />

                    <CornerAccents colorClass={colors.text} show={true} />

                    {/* Background consolidado */}
                    <div className="absolute inset-0 overflow-hidden" style={{ clipPath: CARD_CLIP_PATH }}>
                        {/* Fundo Escuro Base - OPACO (bg-black) para não mostrar o fio atrás */}
                        <div className="absolute inset-0 bg-black" />
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[20px_20px]" />
                        <div className={cn("absolute inset-0 bg-linear-to-b from-transparent via-black/80 to-black/95", colors.bg)} />
                    </div>

                    {/* Conteúdo */}
                    <div className="relative z-20 h-full flex flex-col p-8">
                        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/35">
                            <div className="p-2 border border-white/10 bg-white/5 rounded-md">
                                <Cpu className={cn("w-5 h-5", colors.text)} />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white uppercase tracking-[0.15em]">
                                    {service.title}
                                </h3>
                                <span className={cn("text-xs uppercase tracking-widest opacity-80", colors.text)}>
                                    // Architecture Stack
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                            <div className="grid grid-cols-2 gap-3">
                                {service.technologies.map((tech, index) => (
                                    <div
                                        key={tech.name}
                                        className={cn(
                                            "flex items-center gap-3 p-3 bg-white/5 border border-white/25",
                                            "hover:bg-white/10 hover:border-white/20 transition-all duration-300",
                                            isFlipped ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                                        )}
                                        style={{
                                            transitionDelay: `${index * 50 + 200}ms`,
                                        }}
                                    >
                                        <img
                                            src={tech.logo}
                                            alt={tech.name}
                                            loading="lazy"
                                            decoding="async"
                                            width={20}
                                            height={20}
                                            className="w-5 h-5 object-contain shrink-0"
                                        />
                                        <span className="text-sm text-white/80">{tech.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Botão CTA */}
                        <a href="#contato" className="relative group/cta mt-6 inline-flex items-center justify-center w-full">
                            <div
                                className={cn("absolute inset-0 transition-colors duration-300 opacity-90 group-hover/cta:opacity-100", colors.bg)}
                                style={{ clipPath: CTA_CLIP_PATH }}
                            />
                            <div className="absolute inset-0 pointer-events-none">
                                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <path d={CTA_SVG_PATH} vectorEffect="non-scaling-stroke" className="stroke-1 fill-none stroke-white/20 group-hover/cta:stroke-white/40 transition-colors duration-300" />
                                </svg>
                            </div>
                            <div className="relative z-10 flex items-center justify-center px-6 py-3 w-full">
                                <span className="text-sm font-bold uppercase tracking-wider text-black">Solicitar Orçamento</span>
                                <ArrowRight className="ml-2 w-4 h-4 text-black transition-transform duration-300 group-hover/cta:translate-x-1" />
                            </div>
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
});

export default function FourthSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const { triggered: headerTriggered, playId: headerPlayId } = useScrambleTrigger(headerRef, { threshold: 0.35, once: true });
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    // Suaviza o progresso do scroll - Rigidez/amortecimento ajustados para melhor responsividade
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 30,
        restDelta: 0.001
    });

    // Limites personalizados para cada card para garantir o tempo correto em relação ao caminho zig-zag
    const thresholds = [0.05, 0.28, 0.58, 0.88];

    return (
        <section id="servicos" className="relative py-24 overflow-hidden">
            {/* Background decorativo */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/2 to-transparent" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-size-[60px_60px]" />
            </div>

            {/* Header da seção */}
            <m.div
                ref={headerRef}
                className="w-full flex items-center justify-between mx-auto pb-20 "
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="h-[0.1px] w-1/9 bg-primary"></div>
                <div className="flex items-center gap-18 px-10">
                    <div className="flex flex-col">
                        <TextScramble
                            as="span"
                            className="text-md font-extralight uppercase text-primary tracking-[0.2em]"
                            duration={1}
                            speed={0.03}
                            trigger={headerTriggered}
                            playId={headerPlayId}
                        >
                            {"[4. Nossos Serviços]"}
                        </TextScramble>
                        <h2 className="text-4xl md:text-5xl font-light uppercase leading-tight mb-4 whitespace-nowrap">
                            nossos <TextScramble
                                className="text-primary font-semibold"
                                duration={1}
                                speed={0.03}
                                trigger={headerTriggered}
                                playId={headerPlayId}
                            > serviços</TextScramble>
                        </h2>
                    </div>
                    <p className="text-muted-foreground text-md">
                        De uma ideia ambiciosa a uma <span className="font-semibold text-white/70">referência no ecossistema júnior</span>. Confira os marcos da nossa evolução.
                    </p>
                </div>
                <div className="h-[0.1px] w-1/9 bg-primary"></div>
            </m.div>

            {/* Container do Layout Zig-Zag */}
            <div ref={containerRef} className="relative container mx-auto px-4 lg:px-24 flex flex-col">

                {/* Fundo Principal dos Fios Cyber Zigzag - Controlado pelo Scroll */}
                <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block overflow-visible">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="wire-gradient-bg" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
                                <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
                            </linearGradient>

                            {/* Gradiente do componente correspondente - Adaptado para SVG Estático */}
                            <linearGradient id="wire-gradient-primary" x1="0%" y1="0%" x2="0%" y2="100%">
                                {/* Cauda (Topo) é fraca mas visível */}
                                <stop offset="0%" stopColor="var(--primary)" stopOpacity="1" />
                                {/* Seção média é mediana */}
                                <stop offset="50%" stopColor="var(--primary)" stopOpacity="1" />
                                {/* Cabeça (Fundo) é sólida para garantir visibilidade final */}
                                <stop offset="100%" stopColor="var(--primary)" stopOpacity="1" />
                            </linearGradient>

                            <filter id="glow-wire-active">
                                <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Trilho de Fundo (Inativo) */}
                        <path
                            d="M 25 0 V 20 H 75 V 45 H 25 V 70 H 75 V 100"
                            fill="none"
                            stroke="url(#wire-gradient-bg)"
                            strokeWidth="0.15"
                            className="opacity-50"
                        />

                        {/* Trilho Frontal (Ativo) - Controlado pelo Scroll */}
                        <m.path
                            d="M 25 0 V 20 H 75 V 45 H 25 V 70 H 75 V 100"
                            fill="none"
                            stroke="url(#wire-gradient-primary)"
                            strokeWidth="0.25"
                            strokeLinecap="round"
                            style={{ pathLength: smoothProgress }}
                            className="drop-shadow-[0_0_8px_rgba(var(--primary),1)]"
                        />
                    </svg>
                </div>

                {services.map((service, index) => {
                    const isEven = index % 2 === 0;
                    const isFirst = index === 0;

                    // Usa limites calculados para tempo de ativação preciso
                    const threshold = thresholds[index];

                    return (
                        <m.div
                            key={service.id}
                            className={cn(
                                "relative w-full flex items-center z-10 mb-0 md:mb-1 lg:mb-0",
                                !isFirst && "md:-mt-16 lg:-mt-36",
                                isEven
                                    ? "lg:justify-start lg:-translate-y-1"
                                    : "lg:justify-end lg:translate-y-1"
                            )}
                            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7, delay: index * 0.1 }}
                        >
                            <ServiceCard
                                service={service}
                                align={isEven ? "left" : "right"}
                                scrollProgress={smoothProgress}
                                threshold={threshold}
                            />
                        </m.div>
                    );
                })}
            </div>
        </section>
    );
}