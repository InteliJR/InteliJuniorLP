"use client";

/**
 * Seção de Depoimentos/Membros.
 * - Alterna ex-membros e membros atuais em carrossel automático, pausando quando fora de viewport (useInView) ou em interação.
 * - Interface estilo console com painéis separados; navegação manual preserva acessibilidade.
 */
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Pause, Play, List, ChevronLeft, ChevronRight, Terminal, Search, X } from "lucide-react";
import { TextScramble } from "../ui/textScramble";
import { cn } from "@/lib/utils";

type Member = {
    name: string;
    role: string;
    company: string;
    course?: string;
    quote: string;
    linkedin?: string;
    photo?: string;
};

const exMembers: Member[] = [
    {
        name: "Rodrigo Sales",
        role: "Ex-Desenvolvedor Backend",
        company: "Estagiário no BCGX",
        course: "Eng. Computação",
        quote: "A EJ me deu o relacionamento direto com cliente que faltava. Trabalhar com um time jovem e projetos reais foi o que me levou ao estágio em uma multinacional.",
        linkedin: "#",
        photo: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=600&h=600&fit=crop",
    },
    {
        name: "Olin Costa",
        role: "Ex-Desenvolvedor Frontend",
        company: "Estagiário no BCGX",
        course: "Eng. Software",
        quote: "Ganhei confiança entregando soluções prontas para produção. Enfrentei desafios reais, com responsabilidade e foco em resultado.",
        linkedin: "#",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop",
    },
    {
        name: "Matheus Mendes",
        role: "Ex-Diretor de RI",
        company: "Estagiário na Uber",
        course: "RI & Ops",
        quote: "Estratégia, liderança e entrega. A EJ foi minha escola prática e abriu a porta para a Uber.",
        linkedin: "#",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=600&fit=crop",
    },
    {
        name: "Clara Mohammad",
        role: "Ex-Diretora Admin-Fin",
        company: "Estagiária na AB InBev",
        course: "Admin-Fin",
        quote: "Gestão financeira e liderança de verdade enquanto estudante. Essa vivência brilhou em todos os processos seletivos.",
        linkedin: "#",
        photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=600&fit=crop",
    },
];

const currentMembers: Member[] = [
    {
        name: "Rodrigo",
        role: "Área de Vendas",
        company: "ADM-Tech",
        course: "ADM-Tech",
        quote: "Laboratório de negociação e autoconfiança. Cresci com clientes reais e metas claras.",
        linkedin: "#",
        photo: "https://images.unsplash.com/photo-1541534401786-2077cedbb10b?w=600&h=600&fit=crop",
    },
    {
        name: "Nataly Cunha",
        role: "Diretora Admin-Fin",
        company: "Engenharia de Software",
        course: "Eng. Software",
        quote: "Saúde financeira, jurídica e operacional na prática. Cada decisão é treino para o mercado real.",
        linkedin: "#",
        photo: "https://images.unsplash.com/photo-1550525811-e5869dd03032?w=600&h=600&fit=crop",
    },
    {
        name: "Igor Sampaio",
        role: "Vice-presidente",
        company: "Sistemas de Informação",
        course: "SI",
        quote: "Seleção e desenvolvimento de pessoas. Processos, cultura e comunicação: aprendizados lapidados com o time.",
        linkedin: "#",
        photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=600&fit=crop",
    },
    {
        name: "Mirella Borim",
        role: "Presidente",
        company: "Sistemas de Informação",
        course: "SI",
        quote: "Visão estratégica, sustentabilidade e cultura viva. Liderar a EJ foi o salto que me preparou para o mercado sênior.",
        linkedin: "#",
        photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=600&fit=crop",
    },
];

type Mode = "ex" | "current";

export default function SixthSection() {
    const [mode, setMode] = useState<Mode>("ex");
    const [activeEx, setActiveEx] = useState(0);
    const [activeCurrent, setActiveCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { amount: 0.2, once: false });

    // Lógica de rotação automática
    const rotate = useCallback(() => {
        setMode((prev) => {
            const next = prev === "ex" ? "current" : "ex";
            if (next === "ex") {
                setActiveEx((idx) => (idx + 1) % exMembers.length);
            } else {
                setActiveCurrent((idx) => (idx + 1) % currentMembers.length);
            }
            return next;
        });
    }, []);

    // Intervalo roda só quando visível e não pausado
    useEffect(() => {
        if (paused || !isInView) return;

        const id = window.setInterval(rotate, 6500);
        return () => window.clearInterval(id);
    }, [paused, rotate, isInView]);

    // Navegação manual pausa o auto-rotate
    const handlePrev = useCallback((target: Mode) => {
        setPaused(true); // Pause on interaction
        if (target === "ex") {
            setActiveEx((idx) => (idx - 1 + exMembers.length) % exMembers.length);
            setMode("ex");
        } else {
            setActiveCurrent((idx) => (idx - 1 + currentMembers.length) % currentMembers.length);
            setMode("current");
        }
    }, []);

    const handleNext = useCallback((target: Mode) => {
        setPaused(true); // Pause on interaction
        if (target === "ex") {
            setActiveEx((idx) => (idx + 1) % exMembers.length);
            setMode("ex");
        } else {
            setActiveCurrent((idx) => (idx + 1) % currentMembers.length);
            setMode("current");
        }
    }, []);

    return (
        <section ref={sectionRef} id="depoimentos" className="relative w-full -mt-52 overflow-hidden">
            <Header />
            <div className="relative z-10 mx-[5%] space-y-12 shadow-inner-primary">

                {/* Container do Console */}
                <div className=" relative w-full overflow-hidden border border-white/10 bg-[#050505] shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                    {/* Barra de Cabeçalho do Console */}
                    <div className="h-10 w-full bg-white/5 border-b border-white/10 flex items-center justify-between px-4">
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                            </div>
                            <div className="h-4 w-px bg-white/10 mx-2" />
                            <span className="text-[10px] font-mono text-white/75 uppercase tracking-widest flex items-center gap-2">
                                <Terminal className="w-3 h-3" />
                                BASE_MEMBROS.exe
                            </span>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-mono text-white/70">
                            <span className={cn("flex items-center gap-1.5", paused ? "text-yellow-500" : "text-green-500")}>
                                <div className={cn("w-1.5 h-1.5 rounded-full", paused ? "bg-yellow-500" : "bg-green-500 animate-pulse")} />
                                {paused ? "MODO MANUAL" : "MODO AUTOMATICO"}
                            </span>
                        </div>
                    </div>

                    {/* Área da Tela do Console */}
                    <div className="relative w-full grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:h-[600px] ">

                        {/* PAINEL ESQUERDO: EX-MEMBROS */}
                        <ConsoleWindow
                            variant="ex"
                            member={exMembers[activeEx]}
                            isActive={mode === "ex"}
                            onActivate={() => { setMode("ex"); setPaused(true); }}
                            onNext={() => handleNext("ex")}
                            onPrev={() => handlePrev("ex")}
                            totalItems={exMembers.length}
                            currentIndex={activeEx}

                            // Drawer Props
                            allItems={exMembers}
                            onSelectMember={(idx) => { setActiveEx(idx); setMode("ex"); setPaused(true); }}
                        />

                        {/* DIVISOR CENTRAL (Apenas Desktop) */}
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 z-20">
                            <div className="absolute top-1/2 -translate-y-1/2 -left-[3px] w-[7px] h-16 bg-black border-y border-white/20" />
                        </div>

                        {/* PAINEL DIREITO: MEMBROS ATUAIS */}
                        <ConsoleWindow
                            variant="current"
                            member={currentMembers[activeCurrent]}
                            isActive={mode === "current"}
                            onActivate={() => { setMode("current"); setPaused(true); }}
                            onNext={() => handleNext("current")}
                            onPrev={() => handlePrev("current")}
                            totalItems={currentMembers.length}
                            currentIndex={activeCurrent}

                            // Drawer Props
                            allItems={currentMembers}
                            onSelectMember={(idx) => { setActiveCurrent(idx); setMode("current"); setPaused(true); }}
                        />

                        {/* Camada de Scanline */}
                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.005),rgba(0,0,255,0.01))] bg-size-[100%_2px,3px_100%] z-30 opacity-20" />
                    </div>

                    {/* Status do Rodapé do Console */}
                    <div className="h-8 w-full bg-black border-t border-white/10 flex items-center justify-between px-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setPaused(!paused)}
                                type="button"
                                aria-label={paused ? "Retomar rotação automática" : "Pausar rotação automática"}
                                className="hover:text-white text-white/50 transition-colors"
                            >
                                {paused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                            </button>
                            <div className="h-3 w-px bg-white/10" />
                            <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                                {isInView && (
                                    <motion.div
                                        className="h-full bg-primary"
                                        animate={{
                                            width: mode === "ex" ? "0%" : "100%",
                                            opacity: paused ? 0.3 : 1
                                        }}
                                        transition={{ duration: 6.5, ease: "linear", repeat: paused ? 0 : Infinity }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ----------------------------------------------------------------------
// SUB-COMPONENTES
// ----------------------------------------------------------------------

function Header() {
    const titleRef = useRef<HTMLDivElement | null>(null);
    const [hasTriggered, setHasTriggered] = useState(false);
    const [playId, setPlayId] = useState(0);

    useEffect(() => {
        if (!titleRef.current || hasTriggered) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setHasTriggered(true);
                        setPlayId((prev) => prev + 1);
                    }
                });
            },
            { threshold: 0.35 }
        );

        observer.observe(titleRef.current);
        return () => observer.disconnect();
    }, [hasTriggered]);

    return (
        <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-full flex h-[50vh] items-center -mb-10"
        >
            <div className="h-px w-1/9 bg-primary" />
            <div className="flex gap-18 w-full items-center justify-center px-10">
                <div className="flex flex-col gap-1 items-start relative">
                    <TextScramble
                        as="span"
                        className="text-md font-extralight uppercase text-primary tracking-[0.2em]"
                        duration={1}
                        speed={0.03}
                        trigger={true}
                    >
                        {"[6. nossos_membros]"}
                    </TextScramble>
                    <h2 className="text-4xl md:text-5xl uppercase leading-tight whitespace-nowrap">
                        pessoas que fizeram<br />e fazem a
                        <TextScramble
                            as="span"
                            className="text-4xl md:text-5xl uppercase leading-tight text-primary font-semibold"
                            duration={1}
                            speed={0.03}
                            trigger={hasTriggered}
                            playId={playId}
                        >
                            {" diferença."}
                        </TextScramble>
                    </h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={hasTriggered ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="absolute -right-4 -top-2 flex items-center justify-center mt-2"
                    >
                        <div className="absolute inset-0 bg-primary/80 blur-2xl rounded-full scale-150" />
                    </motion.div>
                </div>
                <p className="text-muted-foreground text-md whitespace-normal">
                    Mais do que um troféu, esse marco representa a <span className="text-white/70 font-semibold">velocidade da nossa evolução</span>. Em apenas 3 anos, atingimos níveis de maturidade que levam tempo para serem construídos, provando que <span className="text-white/70 font-semibold">unimos a agilidade de uma startup com a responsabilidade de uma grande empresa</span>.
                </p>
            </div>
            <div className="h-px w-1/9 bg-primary" />
        </motion.div>
    );
}

interface ConsoleWindowProps {
    variant: "ex" | "current";
    member: Member;
    isActive: boolean;
    onActivate: () => void;
    onNext: () => void;
    onPrev: () => void;
    totalItems: number;
    currentIndex: number;
    allItems: Member[];
    onSelectMember: (idx: number) => void;
}

function ConsoleWindow({
    variant,
    member,
    isActive,
    onActivate,
    onNext,
    onPrev,
    totalItems,
    currentIndex,
    allItems,
    onSelectMember
}: ConsoleWindowProps) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Cores do Tema
    const primaryColor = "text-primary";
    const primaryBg = "bg-primary";
    const primaryBorder = "border-primary/50";
    const shadowColor = "shadow-primary/20";

    return (
        <div
            className={cn(
                "relative h-full flex flex-col transition-all duration-700 p-6 md:p-10 group overflow-hidden border",
                isActive
                    ? "opacity-100 border-transparent"
                    : "bg-transparent opacity-60 grayscale-[0.8] hover:opacity-80 hover:grayscale-[0.4] hover:border-primary/40 hover:bg-white/5 border-transparent"
            )}
            onClick={!isActive ? onActivate : undefined}
        >
            {/* Fundo estilo ImpactCard; permanece enquanto ativo */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div
                    className={cn(
                        "absolute inset-0 bg-size-[20px_20px]",
                        isActive
                            ? "bg-[linear-gradient(rgba(255,77,58,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,77,58,0.04)_1px,transparent_1px)]"
                            : "bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)]"
                    )}
                />
                <div
                    className={cn(
                        "absolute inset-0 transition-colors duration-500",
                        isActive
                            ? "bg-linear-to-b from-black/80 via-primary/12 to-black/90"
                            : "bg-linear-to-b from-black/85 via-black/75 to-black/90"
                    )}
                />
                <div
                    className={cn(
                        "absolute inset-6 md:inset-10 blur-3xl transition-opacity duration-500",
                        isActive ? "bg-primary/35 opacity-60" : "bg-transparent opacity-0"
                    )}
                />
            </div>

            {/* Barra Superior da Janela */}
            <div className="relative z-10 flex items-center justify-between mb-8">
                <div className="flex flex-col">
                    <span className={cn("text-xs font-mono uppercase tracking-[0.2em] mb-1", primaryColor)}>
                        {variant === "ex" ? "[EX MEMBRO]" : "[MEMBRO ATUAL]"}
                    </span>
                    <span className="text-[10px] text-white/30 font-mono">
                        ID: {variant === "ex" ? "EX-" : "CUR-"}{currentIndex.toString().padStart(3, '0')}
                    </span>
                </div>

                <button
                    onClick={(e) => { e.stopPropagation(); setIsDrawerOpen(true); }}
                    className={cn(
                        "flex items-center gap-2 px-3 py-1.5 border transition-all duration-300 cursor-pointer",
                        "text-[10px] uppercase tracking-widest font-bold",
                        "hover:bg-white/5",
                        isActive ? "border-white/20 text-white" : "border-white/5 text-white/30"
                    )}
                >
                    <List className="w-3 h-3" />
                    Abrir Lista
                </button>
            </div>

            {/* Conteúdo Principal */}
            <div className="relative z-10 flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={member.name}
                        initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                        transition={{ duration: 0.4 }}
                        className="space-y-6"
                    >
                        {/* Seção do Avatar */}
                        <div className="flex items-center gap-6">
                            <div className={cn(
                                "relative w-24 h-24 md:w-32 md:h-32 shrink-0 border-2 overflow-hidden",
                                primaryBorder,
                                isActive ? shadowColor + " shadow-[0_0_20px]" : "border-white/10"
                            )}>
                                <img
                                    src={member.photo}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    decoding="async"
                                />

                                {/* Camada de Linha de Varredura - Otimizado para rodar apenas quando visível */}
                                {/* Scanline só quando ativo para não gastar offscreen */}
                                {isActive && (
                                    <motion.div
                                        className={cn("absolute inset-x-0 h-0.5 z-20 opacity-70", primaryBg)}
                                        whileInView={{ top: ["0%", "100%", "0%"] }}
                                        transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                                    />
                                )}

                                {/* Cantos Tecnológicos */}
                                <div className={cn("absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2", primaryBorder)} />
                                <div className={cn("absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2", primaryBorder)} />
                            </div>

                            <div className="space-y-1.5">
                                <h3 className={cn(
                                    "text-2xl md:text-3xl font-bold uppercase leading-none tracking-tight",
                                    isActive ? "text-white" : "text-white/60"
                                )}>
                                    {isActive ? (
                                        <TextScramble duration={0.6}>{member.name}</TextScramble>
                                    ) : member.name}
                                </h3>
                                <div className="flex flex-wrap gap-2 text-[10px] md:text-xs font-mono uppercase tracking-wider text-white/50">
                                    <span className="px-1.5 py-0.5 bg-white/5 border border-white/10">{member.role}</span>
                                    {member.course && <span className="px-1.5 py-0.5 bg-white/5 border border-white/10">{member.course}</span>}
                                </div>
                            </div>
                        </div>

                        {/* Seção de Citação */}
                        <div className="relative pl-4 border-l-2 border-white/10 min-h-[120px] md:min-h-[140px]">
                            <p className={cn(
                                "text-base md:text-lg leading-relaxed italic",
                                isActive ? "text-white/90" : "text-white/40"
                            )}>
                                "{member.quote}"
                            </p>
                            <div className="mt-4 flex items-center gap-2">
                                <span className={cn("text-xs font-bold uppercase tracking-widest", primaryColor)}>
                                    Agora em:
                                </span>
                                <span className="text-sm text-white/70 border-b border-white/10 pb-0.5">
                                    {member.company}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Controles Inferiores */}
            <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex gap-1">
                    {Array.from({ length: totalItems }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={(e) => { e.stopPropagation(); onSelectMember(idx); }}
                            aria-label={`Ir para depoimento ${idx + 1} de ${totalItems}`}
                            className={cn(
                                "w-8 h-1 transition-all duration-300",
                                idx === currentIndex
                                    ? primaryBg
                                    : "bg-white/10 hover:bg-white/30"
                            )}
                        />
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); onPrev(); }}
                        aria-label="Ver depoimento anterior"
                        className="p-2 border border-white/10 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onNext(); }}
                        aria-label="Ver próximo depoimento"
                        className="p-2 border border-white/10 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* === OVERLAY DA LISTA LATERAL === */}
            {/* Drawer lateral de seleção; bloqueia clique no card */}
            <AnimatePresence>
                {isDrawerOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute inset-0 z-50 bg-[#080808]/90 backdrop-blur-sm"
                        onClick={(e) => { e.stopPropagation(); setIsDrawerOpen(false); }}
                    >
                        <motion.div
                            initial={{ y: 16, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 12, opacity: 0 }}
                            transition={{ duration: 0.22, ease: "easeOut" }}
                            className="absolute inset-0 p-6 border border-white/10 bg-[#0c0c0c]/95 flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                                <span className={cn("text-xs font-mono uppercase tracking-widest flex items-center gap-2", primaryColor)}>
                                    <Search className="w-3 h-3" />
                                    SELECTION_MENU
                                </span>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsDrawerOpen(false); }}
                                    aria-label="Fechar lista de membros"
                                    className="text-white/65 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1">
                                {allItems.map((item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onSelectMember(idx);
                                            setIsDrawerOpen(false);
                                        }}
                                        className={cn(
                                            "w-full flex items-center gap-4 p-3 border transition-all duration-200 text-left group/item",
                                            idx === currentIndex
                                                ? "border-primary/40 bg-white/5"
                                                : "border-transparent hover:bg-white/5 hover:border-primary/30"
                                        )}
                                    >
                                        <span className={cn(
                                            "font-mono text-[10px] opacity-50",
                                            idx === currentIndex ? primaryColor : "text-white/30"
                                        )}>
                                            {idx.toString().padStart(2, '0')}
                                        </span>
                                        <div>
                                            <div className={cn(
                                                "text-sm font-bold uppercase",
                                                idx === currentIndex ? "text-white" : "text-white/60 group-hover/item:text-white"
                                            )}>
                                                {item.name}
                                            </div>
                                            <div className="text-[10px] uppercase tracking-wider text-white/30">
                                                {item.role}
                                            </div>
                                        </div>
                                        {idx === currentIndex && (
                                            <div className={cn("ml-auto w-1.5 h-1.5 rounded-full animate-pulse", primaryBg)} />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}