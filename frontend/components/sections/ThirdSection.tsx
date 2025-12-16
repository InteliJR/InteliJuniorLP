"use client";

/**
 * Seção de trajetória (Timeline).
 * - Três blocos anuais com TechCard/ImpactCard e CTA para documento público.
 * - Usa TextScramble em títulos/CTA e formatação numérica para manter consistência visual.
 */
import { Timeline } from "../ui/Timeline";
import { Trophy, Users, Rocket, DollarSign, Award, Target, ExternalLink } from "lucide-react";
import { TextScramble } from "../ui/textScramble";
import { m } from "framer-motion";
import { TechCard } from "../ui/TechCard";
import { ImpactCard } from "../ui/ImpactCard";
import { useCallback, useRef, useState } from "react";
import { useScrambleTrigger } from "@/hooks/useScrambleTrigger";

export default function ThirdSection() {
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    // Estado para o TextScramble do botão "Ver Documento"
    const [docPlayId, setDocPlayId] = useState(0);
    const docHoveringRef = useRef(false);

    const headerRef = useRef<HTMLDivElement | null>(null);
    const { triggered: headerTriggered, playId: headerPlayId } = useScrambleTrigger(headerRef, { threshold: 0.35, once: true });

    const resultsRef = useRef<HTMLDivElement | null>(null);
    const { triggered: resultsTriggered, playId: resultsPlayId } = useScrambleTrigger(resultsRef, { threshold: 0.35, once: true });

    const triggerDocScramble = useCallback(() => {
        if (docHoveringRef.current) return;
        docHoveringRef.current = true;
        setDocPlayId((prev) => prev + 1);
    }, []);

    const resetDocHoverState = useCallback(() => {
        docHoveringRef.current = false;
    }, []);

    const data = [
        {
            title: "2023",
            content: (
                <div className="space-y-8">
                    <div className="space-y-3">
                        <h4 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-widest">
                            O Início da Jornada
                        </h4>
                        <p className="text-gray-400 text-md border-l-2 border-primary pl-4 leading-relaxed">
                            Um ano de fundação e primeiras grandes conquistas. Estabelecemos nossa base e superamos todas as expectativas.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Card 1: Awards */}
                        <TechCard
                            title="Prêmios"
                            icon={<Award className="size-5" />}
                            className="backdrop-blur-[1.2px]"
                        >
                            <div className="space-y-4">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-white">
                                        07
                                    </span>
                                    <span className="text-sm text-gray-500 uppercase tracking-wider">Conquistas</span>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-sm text-gray-300 group/item">
                                        <span className="w-1.5 h-1.5 bg-primary/50 rotate-45 group-hover/item:bg-primary transition-colors" />
                                        <span className="group-hover/item:text-white transition-colors tracking-wide">Vortex</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-gray-300 group/item">
                                        <span className="w-1.5 h-1.5 bg-primary/50 rotate-45 group-hover/item:bg-primary transition-colors" />
                                        <span className="group-hover/item:text-white transition-colors tracking-wide">Embarque</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-gray-300 group/item">
                                        <span className="w-1.5 h-1.5 bg-primary/50 rotate-45 group-hover/item:bg-primary transition-colors" />
                                        <span className="group-hover/item:text-white transition-colors tracking-wide">ESP</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-gray-300 group/item">
                                        <span className="w-1.5 h-1.5 bg-primary/50 rotate-45 group-hover/item:bg-primary transition-colors" />
                                        <span className="group-hover/item:text-white transition-colors tracking-wide">Prêmio Fejesp</span>
                                    </li>
                                </ul>
                            </div>
                        </TechCard>

                        {/* Card 2: Financial */}
                        <TechCard
                            title="Faturamento"
                            icon={<Target className="size-5" />}
                            className="backdrop-blur-[1.2px]"
                        >
                            <div className="flex flex-col h-full justify-between gap-6 px-4">
                                <div className="relative pt-2">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-xs text-gray-500 uppercase tracking-widest">Realizado</span>
                                        <DollarSign className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="text-2xl lg:text-5xl font-bold text-white truncate">
                                        10K
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs text-gray-500 uppercase font-mono">
                                            <span>Progresso</span>
                                            <span>100%</span>
                                        </div>
                                        <div className="h-2 w-full bg-white/5 skew-x-[-20deg] overflow-hidden">
                                            <div
                                                className="h-full bg-primary shadow-[0_0_10px_#ff4d3a] transition-all duration-1000"
                                                style={{ width: '100%' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center pt-2 border-t border-white/5">
                                        <span className="text-xs text-gray-500 uppercase">Meta</span>
                                        <span className="text-sm font-mono text-gray-400 line-through decoration-primary/50">
                                            {formatCurrency(500)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </TechCard>

                        {/* Card 3: Members */}
                        <TechCard
                            title="Time"
                            icon={<Users className="size-5" />}
                            className="backdrop-blur-[1.2px]"
                        >
                            <div className="flex flex-col items-center justify-center h-full py-2">
                                <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                                    {/* Decorative Circles */}
                                    <div className="absolute inset-0 border-2 border-primary/50 rounded-full border-dashed animate-spin" style={{ animationDuration: '10s' }} />
                                    <div className="absolute inset-2 border border-white/5 rounded-full" />

                                    <div className="flex flex-col items-center">
                                        <span className="text-5xl font-bold text-white glow-text">
                                            15
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                                    <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Membros Ativos</span>
                                </div>
                            </div>
                        </TechCard>
                    </div>
                </div>
            ),
        },
        {
            title: "2024",
            content: (
                <div className="space-y-8">
                    <div className="space-y-3">
                        <h4 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-widest">
                            Expansão Acelerada
                        </h4>
                        <p className="text-gray-400 text-md border-l-2 border-primary pl-4 leading-relaxed">
                            Dobramos nosso time e multiplicamos nosso impacto. A consolidação da nossa cultura de excelência.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Card 1: Awards */}
                        <TechCard
                            title="Prêmios"
                            icon={<Award className="size-5" />}
                            className="backdrop-blur-[1.2px]"
                        >
                            <div className="space-y-4">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-white">
                                        05
                                    </span>
                                    <span className="text-sm text-gray-500 uppercase tracking-wider">Conquistas</span>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-sm text-gray-300 group/item">
                                        <span className="w-1.5 h-1.5 bg-primary/50 rotate-45 group-hover/item:bg-primary transition-colors" />
                                        <span className="group-hover/item:text-white transition-colors tracking-wide">Vortex</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-gray-300 group/item">
                                        <span className="w-1.5 h-1.5 bg-primary/50 rotate-45 group-hover/item:bg-primary transition-colors" />
                                        <span className="group-hover/item:text-white transition-colors tracking-wide">Dispare</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-gray-300 group/item">
                                        <span className="w-1.5 h-1.5 bg-primary/50 rotate-45 group-hover/item:bg-primary transition-colors" />
                                        <span className="group-hover/item:text-white transition-colors tracking-wide">ESP</span>
                                    </li>
                                </ul>
                            </div>
                        </TechCard>

                        {/* Card 2: Financial */}
                        <TechCard
                            title="Faturamento"
                            icon={<Target className="size-5" />}
                            className="backdrop-blur-[1.2px]"
                        >
                            <div className="flex flex-col h-full justify-between px-4 gap-6">
                                <div className="relative pt-2">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-xs text-gray-500 uppercase tracking-widest">Realizado</span>
                                        <DollarSign className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="text-2xl lg:text-5xl font-bold text-white truncate">
                                        43k
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs text-gray-500 uppercase font-mono">
                                            <span>Progresso</span>
                                            <span>100%</span>
                                        </div>
                                        <div className="h-2 w-full bg-white/5 skew-x-[-20deg] overflow-hidden">
                                            <div
                                                className="h-full bg-primary shadow-[0_0_10px_#ff4d3a] transition-all duration-1000"
                                                style={{ width: '100%' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center pt-2 border-t border-white/5">
                                        <span className="text-xs text-gray-500 uppercase">Meta</span>
                                        <span className="text-sm font-mono text-gray-400 line-through decoration-primary/50">
                                            {formatCurrency(13182)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </TechCard>

                        {/* Card 3: Members */}
                        <TechCard
                            title="Time"
                            icon={<Users className="size-5" />}
                            className="backdrop-blur-[1.2px]"
                        >
                            <div className="flex flex-col items-center justify-center h-full py-2">
                                <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                                    {/* Decorative Circles */}
                                    <div className="absolute inset-0 border-2 border-primary/50 rounded-full border-dashed animate-spin" style={{ animationDuration: '10s' }} />
                                    <div className="absolute inset-2 border border-white/5 rounded-full" />

                                    <div className="flex flex-col items-center">
                                        <span className="text-5xl font-bold text-white glow-text">
                                            33
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                                    <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Membros Ativos</span>
                                </div>
                            </div>
                        </TechCard>
                    </div>
                </div>
            ),
        },
        {
            title: "2025",
            content: (
                <div className="space-y-8">
                    <div className="space-y-3">
                        <h4 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-widest">
                            Rumo ao Topo
                        </h4>
                        <p className="text-gray-400 text-md border-l-2 border-primary pl-4 leading-relaxed">
                            Em busca do 5º cluster no nosso quinto ano. Uma ascensão rápida e contínua que define nossa história.
                        </p>
                    </div>

                    {/* 2025 Special Highlight Banner */}
                    <div className="relative w-full">
                        <TechCard highlight className="w-full backdrop-blur-[1.2px]">
                            <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                                <div className="p-4 bg-primary/10 rounded-full border border-primary/40 shadow-[0_0_20px_rgba(255,77,58,0.2)]">
                                    <Rocket className="w-8 h-8 text-primary" />
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h5 className="text-xl font-bold text-primary mb-2 uppercase tracking-wider">
                                        4 Clusters em 3 Anos
                                    </h5>
                                    <p className="text-gray-400 mb-4 md:mb-0 max-w-2xl text-sm">
                                        Um marco histórico de maturidade e resultados. Somos a prova de que agilidade e responsabilidade caminham juntas.
                                    </p>
                                </div>
                                <a
                                    href="https://drive.google.com/file/d/1nvpHTWDmKq0rdhbac4WYTE_aKadFaWcR/view"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative group inline-flex items-center justify-center"
                                    onMouseEnter={triggerDocScramble}
                                    onMouseLeave={resetDocHoverState}
                                    onFocus={triggerDocScramble}
                                    onBlur={resetDocHoverState}
                                >
                                    {/* Backdrop layer */}
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
                                    <div className="relative z-10 flex items-center px-6 py-3">
                                        <TextScramble
                                            as="span"
                                            className="text-sm font-bold uppercase tracking-wider text-black"
                                            duration={0.8}
                                            speed={0.035}
                                            trigger={true}
                                            playId={docPlayId}
                                        >
                                            {"Ver Documento"}
                                        </TextScramble>
                                        <ExternalLink className="ml-2 w-4 h-4 text-black transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                                    </div>
                                </a>
                            </div>
                        </TechCard>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Card 1: Awards */}
                        <TechCard
                            title="Prêmios"
                            icon={<Award className="size-5" />}
                            className="backdrop-blur-[1.2px]"
                        >
                            <div className="space-y-4">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-white">
                                        01
                                    </span>
                                    <span className="text-sm text-gray-500 uppercase tracking-wider">Conquistas</span>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-sm text-gray-300 group/item">
                                        <span className="w-1.5 h-1.5 bg-primary animate-pulse rotate-45" />
                                        <span className="group-hover/item:text-white transition-colors tracking-wide">Prêmio Vortex (Atual)</span>
                                    </li>
                                </ul>
                            </div>
                        </TechCard>

                        {/* Card 2: Financial */}
                        <TechCard
                            title="Faturamento"
                            icon={<Target className="size-5" />}
                            className="backdrop-blur-[1.2px]"
                        >
                            <div className="flex flex-col h-full justify-between gap-6 px-4">
                                <div className="relative pt-2">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-xs text-gray-500 uppercase tracking-widest">Realizado</span>
                                        <DollarSign className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="text-2xl lg:text-5xl font-bold text-white truncate">
                                        29k
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs text-gray-500 uppercase font-mono">
                                            <span>Progresso</span>
                                            <span>98%</span>
                                        </div>
                                        <div className="h-2 w-full bg-white/5 skew-x-[-20deg] overflow-hidden">
                                            <div
                                                className="h-full bg-primary shadow-[0_0_10px_#ff4d3a] transition-all duration-1000"
                                                style={{ width: '98%' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center pt-2 border-t border-white/5">
                                        <span className="text-xs text-gray-500 uppercase">Meta</span>
                                        <span className="text-sm font-mono text-gray-400 line-through decoration-primary/50">
                                            {formatCurrency(30108.75)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </TechCard>

                        {/* Card 3: Members */}
                        <TechCard
                            title="Time"
                            icon={<Users className="size-5" />}
                            className="backdrop-blur-[1.2px]"
                        >
                            <div className="flex flex-col items-center justify-center h-full py-2">
                                <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                                    {/* Decorative Circles */}
                                    <div className="absolute inset-0 border-2 border-primary/50 rounded-full border-dashed animate-spin" style={{ animationDuration: '10s' }} />
                                    <div className="absolute inset-2 border border-white/5 rounded-full" />

                                    <div className="flex flex-col items-center">
                                        <span className="text-5xl font-bold text-white glow-text">
                                            45
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                                    <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Membros Ativos</span>
                                </div>
                            </div>
                        </TechCard>
                    </div>
                </div>
            ),
        },
    ];
    return (
        <section id="trajetoria" className="w-full relative overflow-hidden">
            <m.div
                ref={headerRef}
                className="w-full flex items-center justify-between mx-auto -mb-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="h-[0.1px] w-1/9 bg-primary"></div>
                <div className="flex gap-18 items-center px-10">
                    <div className="flex flex-col">
                        <TextScramble
                            as="span"
                            className="text-md font-extralight uppercase text-primary tracking-[0.2em]"
                            duration={1}
                            speed={0.03}
                            trigger={headerTriggered}
                            playId={headerPlayId}
                        >
                            {"[3. De onde viemos]"}
                        </TextScramble>
                        <h2 className="text-4xl md:text-5xl font-light uppercase leading-tight mb-4 whitespace-nowrap">
                            Nossa <TextScramble
                                className="text-primary font-semibold"
                                duration={1}
                                speed={0.03}
                                trigger={headerTriggered}
                                playId={headerPlayId}
                            > trajetoria</TextScramble>
                        </h2>
                    </div>
                    <p className="text-muted-foreground text-lg">
                        De uma ideia ambiciosa a uma <span className="font-semibold text-white/70">referência no ecossistema júnior</span>. Confira os marcos da nossa evolução.
                    </p>
                </div>
                <div className="h-[0.1px] w-1/9 bg-primary"></div>
            </m.div>
            <Timeline data={data} />
            {/* Seção de Resultados - Grande Destaque */}
            <div className="relative pt-16 px-4 md:px-8 lg:px-10 overflow-hidden">
                {/* Background com gradiente sutil */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

                {/* Título da seção de resultados */}
                <m.div
                    ref={resultsRef}
                    className="relative z-10 text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <TextScramble
                        as="span"
                        className="text-md font-extralight uppercase text-primary tracking-[0.2em]"
                        duration={1}
                        speed={0.03}
                        trigger={resultsTriggered}
                        playId={resultsPlayId}
                    >
                        {"[Nossos Resultados]"}
                    </TextScramble>
                    <h3 className="text-4xl md:text-5xl font-light uppercase leading-tight mt-4">
                        O<TextScramble
                            className="text-primary font-semibold"
                            duration={1}
                            speed={0.03}
                            trigger={resultsTriggered}
                            playId={resultsPlayId}
                        > impacto </TextScramble>
                        que geramos
                    </h3>
                </m.div>

                <div className="relative z-10 px-24 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1 - Negócios Impactados */}
                    <ImpactCard
                        value="15+"
                        label="Negócios Impactados"
                        description="Empresas que confiaram em nossas soluções tecnológicas."
                        icon={
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                            </svg>
                        }
                        delay={0}
                    />

                    {/* Card 2 - Universitários Capacitados (Card Central - Destaque) */}
                    <ImpactCard
                        value="50+"
                        label="Universitários Capacitados"
                        description="Talentos formados com experiência real de mercado em projetos de alto impacto."
                        icon={<Users className="w-8 h-8" strokeWidth={1.5} />}
                        highlight={true}
                        delay={0.15}
                        className=""
                    />

                    {/* Card 3 - Impacto Econômico */}
                    <ImpactCard
                        value="100k+"
                        label="Impacto Econômico"
                        description="Valor gerado em projetos e soluções entregues ao mercado."
                        icon={<DollarSign className="w-8 h-8" strokeWidth={1.5} />}
                        delay={0.3}
                    />
                </div>
            </div>
        </section>
    );
}
