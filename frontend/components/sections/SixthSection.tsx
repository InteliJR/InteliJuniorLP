"use client";

/**
 * Seção de Depoimentos/Membros.
 * - Alterna ex-membros e membros atuais em carrossel automático, pausando quando fora de viewport (useInView) ou em interação.
 * - Interface estilo console com painéis separados; navegação manual preserva acessibilidade.
 */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Terminal, Linkedin } from "lucide-react";
import { TextScramble } from "../ui/textScramble";
import { cn } from "@/lib/utils";

type Member = {
    name: string;
    role: string;
    area?: string;
    company?: string;
    course?: string;
    quote: string;
    linkedin?: string;
    photo?: string;
};

const exMembers: Member[] = [
    {
        name: "Clara Mohammad",
        role: "Ex-Diretora Admin-Fin",
        company: "Estagiária na AB InBev",
        course: "Engenharia de Software",
        quote: "Gestão financeira e liderança de verdade enquanto estudante. Essa vivência brilhou em todos os processos seletivos.",
        linkedin: "https://www.linkedin.com/in/claramohammad/",
        photo: "/images/members/clara_mohammad.webp",
    },
    {
        name: "Rodrigo Sales",
        role: "Ex-Desenvolvedor Backend",
        company: "Estagiário no BCGX",
        course: "Engenharia de Computação",
        quote: "A EJ me deu o relacionamento direto com cliente que faltava. Trabalhar com um time jovem e projetos reais foi o que me levou ao estágio em uma multinacional.",
        linkedin: "https://www.linkedin.com/in/rodrigo-sales-07/",
        photo: "/images/members/rodrigo_sales.webp",
    },
    {
        name: "Matheus Mendes",
        role: "Ex-Diretor de RI",
        company: "Estagiário na Uber",
        course: "Sistemas de Informação",
        quote: "Estratégia, liderança e entrega. A EJ foi minha escola prática e abriu a porta para a Uber.",
        linkedin: "https://www.linkedin.com/in/matheusmeendes/",
        photo: "/images/members/matheus_mendes.webp",
    },
    {
        name: "Ólin Costa",
        role: "Ex-Desenvolvedor Frontend",
        company: "Estagiário no BCGX",
        course: "Engenharia de Software",
        quote: "Ganhei confiança entregando soluções prontas para produção. Enfrentei desafios reais, com responsabilidade e foco em resultado.",
        linkedin: "https://www.linkedin.com/in/olincosta/",
        photo: "/images/members/olin_costa.webp",
    },
];

const currentMembers: Member[] = [
    {
        name: "Mirella Borim",
        role: "Presidente",
        area: "Gestão Estratégica",
        course: "Sistemas de Informação",
        quote: "Visão estratégica, sustentabilidade e cultura viva. Liderar a EJ foi o salto que me preparou para o mercado sênior.",
        linkedin: "https://www.linkedin.com/in/mirellaborim/",
        photo: "/images/members/mirella_borim.webp",
    },
    {
        name: "Igor Sampaio",
        role: "Diretor",
        area: "Pessoas & Cultura",
        course: "Sistemas de Informação",
        quote: "Seleção e desenvolvimento de pessoas. Processos, cultura e comunicação: aprendizados lapidados com o time.",
        linkedin: "https://www.linkedin.com/in/igor-sampaio-silva/",
        photo: "/images/members/igor_sampaio.webp",
    },
    {
        name: "Nataly Cunha",
        role: "Diretora",
        area: "Administrativo e Financeiro",
        course: "Engenharia de Software",
        quote: "Saúde financeira, jurídica e operacional na prática. Cada decisão é treino para o mercado real.",
        linkedin: "https://www.linkedin.com/in/natalycunha/",
        photo: "/images/members/nataly_cunha.webp",
    },
    {
        name: "Rodrigo Ferraz",
        role: "Assessor",
        area: "Vendas",
        course: "ADM-Tech",
        quote: "Laboratório de negociação e autoconfiança. Cresci com clientes reais e metas claras.",
        linkedin: "https://www.linkedin.com/in/rodrigo-ferraz-b8a946244/",
        photo: "/images/members/rodrigo_ferraz.webp",
    },
];

type Mode = "ex" | "current";

export default function SixthSection() {
    // Contador único de passos - cada passo alterna o foco entre ex e current
    const [step, setStep] = useState(0);
    const [autoEnabled, setAutoEnabled] = useState(true);
    const autoResumeTimeoutRef = useRef<number | null>(null);

    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { amount: 0.2, once: false });

    // Derivar activePanel, activeEx e activeCurrent a partir do step
    // step=0: ex[0], step=1: current[0], step=2: ex[1], step=3: current[1], ...
    const activePanel: Mode = step % 2 === 0 ? "ex" : "current";
    const activeEx = Math.floor(step / 2) % exMembers.length;
    const activeCurrent = step >= 1 ? Math.floor((step - 1) / 2) % currentMembers.length : 0;

    // Intervalo simples: apenas incrementa o step
    useEffect(() => {
        if (!isInView || !autoEnabled) return;

        const id = window.setInterval(() => {
            setStep((prev) => prev + 1);
        }, 6500);

        return () => window.clearInterval(id);
    }, [isInView, autoEnabled]);

    // Função auxiliar para pausar o auto-rotate por alguns segundos após interação manual
    const pauseAutoRotate = useCallback(() => {
        setAutoEnabled(false);
        if (autoResumeTimeoutRef.current) {
            window.clearTimeout(autoResumeTimeoutRef.current);
        }
        autoResumeTimeoutRef.current = window.setTimeout(() => {
            setAutoEnabled(true);
        }, 10000); // retoma após 10s sem interação
    }, []);

    // Navegação manual - calcula o step correto para o membro desejado
    const handlePrev = useCallback((target: Mode) => {
        pauseAutoRotate();
        if (target === "ex") {
            // Calcular o step para o ex-membro anterior
            const newExIdx = (activeEx - 1 + exMembers.length) % exMembers.length;
            // step para ex[idx] = idx * 2
            setStep(newExIdx * 2);
        } else {
            // Calcular o step para o membro atual anterior
            const newCurrentIdx = (activeCurrent - 1 + currentMembers.length) % currentMembers.length;
            // step para current[idx] = idx * 2 + 1
            setStep(newCurrentIdx * 2 + 1);
        }
    }, [pauseAutoRotate, activeEx, activeCurrent]);

    const handleNext = useCallback((target: Mode) => {
        pauseAutoRotate();
        if (target === "ex") {
            const newExIdx = (activeEx + 1) % exMembers.length;
            setStep(newExIdx * 2);
        } else {
            const newCurrentIdx = (activeCurrent + 1) % currentMembers.length;
            setStep(newCurrentIdx * 2 + 1);
        }
    }, [pauseAutoRotate, activeEx, activeCurrent]);

    const handleSelectMember = useCallback((target: Mode, idx: number) => {
        pauseAutoRotate();
        if (target === "ex") {
            setStep(idx * 2);
        } else {
            setStep(idx * 2 + 1);
        }
    }, [pauseAutoRotate]);

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
                            <span className="flex items-center gap-1.5 text-green-500">
                                <div className="w-5 h-3 rounded-full bg-green-500 animate-pulse" />
                            </span>
                        </div>
                    </div>

                    {/* Área da Tela do Console */}
                    <div className="relative w-full grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:h-[600px] ">

                        {/* PAINEL ESQUERDO: EX-MEMBROS */}
                        <ConsoleWindow
                            variant="ex"
                            member={exMembers[activeEx]}
                            isActive={activePanel === "ex"}
                            onActivate={() => handleSelectMember("ex", activeEx)}
                            onNext={() => handleNext("ex")}
                            onPrev={() => handlePrev("ex")}
                            totalItems={exMembers.length}
                            currentIndex={activeEx}
                            onSelectMember={(idx) => handleSelectMember("ex", idx)}
                        />

                        {/* DIVISOR CENTRAL (Apenas Desktop) */}
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 z-20">
                            <div className="absolute top-1/2 -translate-y-1/2 -left-[3px] w-[7px] h-16 bg-black border-y border-white/20" />
                        </div>

                        {/* PAINEL DIREITO: MEMBROS ATUAIS */}
                        <ConsoleWindow
                            variant="current"
                            member={currentMembers[activeCurrent]}
                            isActive={activePanel === "current"}
                            onActivate={() => handleSelectMember("current", activeCurrent)}
                            onNext={() => handleNext("current")}
                            onPrev={() => handlePrev("current")}
                            totalItems={currentMembers.length}
                            currentIndex={activeCurrent}
                            onSelectMember={(idx) => handleSelectMember("current", idx)}
                        />

                        {/* Camada de Scanline */}
                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.005),rgba(0,0,255,0.01))] bg-size-[100%_2px,3px_100%] z-30 opacity-20" />
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
    onSelectMember
}: ConsoleWindowProps) {
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
                    <span className={cn("text font-mono uppercase tracking-[0.2em] mb-1", primaryColor)}>
                        {variant === "ex" ? "EX-MEMBRO" : "MEMBRO ATUAL"}
                    </span>
                </div>

                {variant === "ex" && (
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                            Empresa atual
                        </span>
                        <div className="h-7 md:h-8 flex items-center justify-center overflow-hidden">
                            {member.company.includes("BCGX") && (
                                <img
                                    src="/images/company_logos/BCG_X.png"
                                    alt="BCG X"
                                    className="h-full w-auto object-contain"
                                    loading="lazy"
                                    decoding="async"
                                />
                            )}
                            {member.company.toLowerCase().includes("uber") && (
                                <img
                                    src="/images/company_logos/uber.png"
                                    alt="Uber"
                                    className="h-full w-auto object-contain"
                                    loading="lazy"
                                    decoding="async"
                                />
                            )}
                            {member.company.toLowerCase().includes("ab inbev") && (
                                <img
                                    src="/images/company_logos/Anheuser-Busch-InBev-Logo.png"
                                    alt="AB InBev"
                                    className="h-full w-auto object-contain"
                                    loading="lazy"
                                    decoding="async"
                                />
                            )}
                        </div>
                    </div>
                )}
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
                                {member.course && (
                                    <p className="text-xs md:text-sm text-white/60">
                                        Curso: <span className="text-white/80">{member.course}</span>
                                    </p>
                                )}
                                <div className="flex flex-wrap gap-2 text-[10px] md:text-xs font-mono uppercase tracking-wider text-white/50">
                                    <span className="px-1.5 py-0.5 bg-white/5 border border-white/10">
                                        {member.area && `${member.area} • `}
                                        {member.role}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Seção de Citação */}
                        <div className="relative pl-4 border-l-2 border-white/10 min-h-[120px] md:min-h-[140px] flex flex-col gap-4 justify-between">
                            <p className={cn(
                                "text-base md:text-lg leading-relaxed italic",
                                isActive ? "text-white/90" : "text-white/40"
                            )}>
                                "{member.quote}"
                            </p>

                            {member.linkedin && (
                                <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 self-start px-3 py-1.5 border border-white/15 bg-white/5 hover:bg-white/10  text-white/70 hover:text-white transition-colors font-mono uppercase tracking-widest"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            )}
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
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!isActive) {
                                onActivate();
                                return;
                            }
                            onPrev();
                        }}
                        aria-label="Ver depoimento anterior"
                        className="p-2 border border-white/10 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!isActive) {
                                onActivate();
                                return;
                            }
                            onNext();
                        }}
                        aria-label="Ver próximo depoimento"
                        className="p-2 border border-white/10 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

        </div>
    );
}