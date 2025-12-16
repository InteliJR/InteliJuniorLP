"use client";

/**
 * Rodapé/Contato.
 * - Abas Formulário vs Agentes com transição animada e altura fixa para evitar jumps.
 * - Valida contato mínimo (email ou telefone) e simula envio; modal global reaproveitado.
 * - Inclui CTA com TextScramble, dados comerciais e links sociais/legais.
 */
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { TechCard } from "../ui/TechCard";
import { ContactModal } from "../ContactModal";
import { TextScramble } from "../ui/textScramble";
import {
    Instagram,
    Linkedin,
    ArrowRight,
    MapPin,
    Mail,
    Building2,
    Phone,
    User,
    Loader2,
    CheckCircle2,
    AlertCircle,
    Terminal,
    Github
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// --- DADOS ---

const commercialTeam = [
    { name: "Luisa Mangini", phone: "(11) 94700-5421", email: "luisa.mangini@sou.inteli.edu.br" },
    { name: "Danilo Neto", phone: "(31) 99638-9166", email: "danilo.neto@sou.inteli.edu.br" },
    { name: "Rafael Cabral", phone: "(12) 99143-5535", email: "Rafael.Silva2@sou.inteli.edu.br" },
    { name: "Rodrigo Ferraz", phone: "(44) 98805-0272", email: "rodrigo.ferraz@sou.inteli.edu.br" },
    { name: "Isadora Gatto", phone: "(11) 91022-1822", email: "isadora.gatto@sou.inteli.edu.br" },
    { name: "Livia Negrini", phone: "(11) 94373-2417", email: "livia.negrini@sou.inteli.edu.br" },
];

const partners = [
    { name: "Brasil Júnior", url: "https://brasiljunior.org.br/logo.png", scale: "scale-100" },
    { name: "FEJESP", url: "https://www.institutoexito.com.br/storage/app/uploads/yrsxOUMylu1UCuNFOfBzsCvsYiXs9UcHmY0acbak.png", scale: "scale-110" },
    { name: "NSP", url: "https://images.sympla.com.br/626ab7a161054.png", scale: "scale-90" },
];

const products = [
    "Análise de Dados",
    "Identidade Visual",
    "Landing Pages",
    "Aplicações Completas",
    "Outros"
];

// --- COMPONENTE PRINCIPAL ---

export default function Footer() {
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
    const [formError, setFormError] = useState<string | null>(null);
    const [activePanel, setActivePanel] = useState<"form" | "agents">("form");
    const [ctaHover, setCtaHover] = useState(false);
    const [ctaPlayId, setCtaPlayId] = useState(0);

    // Controla o TextScramble: dispara uma vez quando o título entra em viewport
    const titleRef = useRef<HTMLDivElement | null>(null);
    const isTitleInView = useInView(titleRef, { once: true, amount: 0.4 });
    const [hasTriggered, setHasTriggered] = useState(false);
    const [playId, setPlayId] = useState(0);

    useEffect(() => {
        if (isTitleInView && !hasTriggered) {
            setHasTriggered(true);
            setPlayId((id) => id + 1);
        }
    }, [isTitleInView, hasTriggered]);

    // Form States
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        email: "",
        phone: "",
        product: "",
        message: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (formError) setFormError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validação: Email OU Telefone obrigatórios
        if (!formData.email && !formData.phone) {
            setFormError("É necessário informar ao menos um contato (Email ou Telefone).");
            return;
        }

        if (!formData.product) {
            setFormError("Por favor, selecione um produto de interesse.");
            return;
        }

        setFormState("submitting");

        // Simulação de envio
        await new Promise(resolve => setTimeout(resolve, 2000));
        setFormState("success");
    };

    return (
        <footer id="contato" className="relative w-full overflow-hidden">
            <div className="container relative z-10 mx-auto">
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
                                trigger={isTitleInView}
                            >
                                {"[7. contato]"}
                            </TextScramble>
                            <h2 className="text-4xl md:text-5xl uppercase leading-tight whitespace-nowrap">
                                vamos construir<br />o
                                <TextScramble
                                    as="span"
                                    className="text-4xl md:text-5xl uppercase leading-tight text-primary font-semibold"
                                    duration={1}
                                    speed={0.03}
                                    trigger={hasTriggered}
                                    playId={playId}
                                >
                                    {" futuro?"}
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
                        <p className="text-white/88 text-md whitespace-normal">
                            Nossa equipe está pronta para decodificar seus desafios e programar soluções.
                            Preencha o formulário ou acesse nossa rede neural de especialistas.
                        </p>
                    </div>
                    <div className="h-px w-1/9 bg-primary" />
                </motion.div>

                {/* MAIN CONTENT GRID - Terminal Style Switcher */}
                <div className="relative mb-20 px-[5%]">
                    <div className="relative w-full overflow-hidden border border-white/20 bg-[#050505] shadow-[0_0_50px_rgba(0,0,0,0.7)]">
                        {/* Top bar */}
                        <div className="h-11 w-full bg-white/10 border-b border-white/20 flex items-center justify-between px-4">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                </div>
                                <div className="h-4 w-px bg-white/20" />
                                <span className="text-[11px] font-mono text-white/90 font-semibold uppercase tracking-[0.16em] flex gap-2">
                                    <Terminal className="w-3 h-3" />
                                    Transmissão_Projeto.exe
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-[10px] font-mono text-white/90">
                                <span className="flex items-center gap-1 font-semibold text-emerald-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                                    Online
                                </span>
                            </div>
                        </div>
                        {/* <div className="flex items-center justify-between border-b border-white/10 pb-3">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-white">Transmissão de Projeto</span>
                            </div>
                            <span className="text-[10px] font-mono text-white/50">INTERFACE: INPUT_MODE</span>
                        </div> */}

                        {/* Tab bar */}
                        <div className="flex items-center justify-between bg-white/10 border-b border-white/20 px-4 py-3">
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setActivePanel("form")}
                                    className={cn(
                                        "px-3 py-2 text-xs font-bold uppercase tracking-widest border transition-all duration-300",
                                        activePanel === "form"
                                            ? "bg-primary text-black border-primary shadow-[0_0_20px_rgba(255,77,58,0.35)]"
                                            : "text-white/88 border-white/20 hover:text-white hover:border-white/30 hover:bg-white/10"
                                    )}
                                    aria-pressed={activePanel === "form"}
                                >
                                    Formulário
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActivePanel("agents")}
                                    className={cn(
                                        "px-3 py-2 text-xs font-bold uppercase tracking-widest border transition-all duration-300",
                                        activePanel === "agents"
                                            ? "bg-primary text-black border-primary shadow-[0_0_20px_rgba(255,77,58,0.35)]"
                                            : "text-white/88 border-white/20 hover:text-white hover:border-white/30 hover:bg-white/10"
                                    )}
                                    aria-pressed={activePanel === "agents"}
                                >
                                    Agentes
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="relative min-h-[640px]">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,77,58,0.08),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.04),transparent_30%)]" />

                            <AnimatePresence mode="wait">
                                {activePanel === "form" ? (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                                        transition={{ duration: 0.35 }}
                                        className="relative z-10"
                                    >
                                        <div className="relative overflow-hidden border border-white/20 bg-linear-to-b from-black/80 via-primary/20 to-black/90 shadow-[0_0_35px_rgba(255,77,58,0.2)]">
                                            <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_30%_20%,rgba(255,77,58,0.2),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.08),transparent_30%)]" />
                                            <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" />
                                            <div className="absolute inset-10 blur-3xl bg-primary/25 opacity-40" />

                                            <div className="relative z-10 p-6 md:p-8 space-y-6">
                                                {formState === "success" ? (
                                                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-10">
                                                        <div className="relative">
                                                            <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full" />
                                                            <CheckCircle2 className="relative w-16 h-16 text-green-500" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider">Protocolo Enviado</h3>
                                                            <p className="text-white/88 max-w-md mx-auto">
                                                                Sua mensagem foi recebida pela nossa base. Um de nossos agentes entrará em contato em breve.
                                                            </p>
                                                        </div>
                                                        <button
                                                            onClick={() => { setFormState("idle"); setFormData({ name: "", company: "", email: "", phone: "", product: "", message: "" }); }}
                                                            className="text-xs text-primary hover:text-white uppercase tracking-widest border-b border-primary/30 hover:border-white transition-colors"
                                                        >
                                                            Enviar nova mensagem
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <form onSubmit={handleSubmit} className="space-y-6">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            <div className="space-y-2">
                                                                <label className="text-[10px] uppercase text-primary/85 font-bold tracking-widest ml-1">Nome Completo *</label>
                                                                <div className="relative group">
                                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/80 group-focus-within:text-primary transition-colors" />
                                                                    <input
                                                                        name="name"
                                                                        value={formData.name}
                                                                        onChange={handleInputChange}
                                                                        required
                                                                        placeholder="Seu nome"
                                                                        className="w-full bg-white/10 border border-white/20 focus:border-primary/60 text-white pl-10 pr-4 py-3 text-sm outline-none transition-all placeholder:text-white/40"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-[10px] uppercase text-white/88 font-bold tracking-widest ml-1">Empresa (Opcional)</label>
                                                                <div className="relative group">
                                                                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/80 group-focus-within:text-primary transition-colors" />
                                                                    <input
                                                                        name="company"
                                                                        value={formData.company}
                                                                        onChange={handleInputChange}
                                                                        placeholder="Sua empresa"
                                                                        className="w-full bg-white/10 border border-white/20 focus:border-primary/60 text-white pl-10 pr-4 py-3 text-sm outline-none transition-all placeholder:text-white/40"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            <div className="space-y-2">
                                                                <label className="text-[10px] uppercase text-primary/85 font-bold tracking-widest ml-1">Email</label>
                                                                <div className="relative group">
                                                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/80 group-focus-within:text-primary transition-colors" />
                                                                    <input
                                                                        name="email"
                                                                        type="email"
                                                                        value={formData.email}
                                                                        onChange={handleInputChange}
                                                                        placeholder="seu@email.com"
                                                                        className="w-full bg-white/10 border border-white/20 focus:border-primary/60 text-white pl-10 pr-4 py-3 text-sm outline-none transition-all placeholder:text-white/40"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-[10px] uppercase text-primary/85 font-bold tracking-widest ml-1">Telefone / WhatsApp</label>
                                                                <div className="relative group">
                                                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/80 group-focus-within:text-primary transition-colors" />
                                                                    <input
                                                                        name="phone"
                                                                        value={formData.phone}
                                                                        onChange={handleInputChange}
                                                                        placeholder="(00) 00000-0000"
                                                                        className="w-full bg-white/10 border border-white/20 focus:border-primary/60 text-white pl-10 pr-4 py-3 text-sm outline-none transition-all placeholder:text-white/40"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="text-[10px] text-white/88 -mt-4 ml-1">
                                                            * Preencha pelo menos um campo de contato.
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="text-[10px] uppercase text-primary/85 font-bold tracking-widest ml-1">Produto de Interesse *</label>
                                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                                {products.map((prod) => (
                                                                    <button
                                                                        key={prod}
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setFormData(prev => ({ ...prev, product: prod }));
                                                                            if (formError) setFormError(null);
                                                                        }}
                                                                        className={cn(
                                                                            "px-3 py-2 text-xs border transition-all duration-300 text-left",
                                                                            formData.product === prod
                                                                                ? "bg-primary text-black border-primary font-bold"
                                                                                : "bg-white/10 border-white/20 text-white/88 hover:bg-white/20 hover:border-white/30"
                                                                        )}
                                                                    >
                                                                        {prod}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="text-[10px] uppercase text-white/88 font-bold tracking-widest ml-1">Mensagem</label>
                                                            <textarea
                                                                name="message"
                                                                value={formData.message}
                                                                onChange={handleInputChange}
                                                                rows={4}
                                                                placeholder="Detalhes do projeto, dúvidas ou briefing inicial..."
                                                                className="w-full bg-white/10 border border-white/20 focus:border-primary/60 text-white p-4 text-sm outline-none transition-all placeholder:text-white/40 resize-none"
                                                            />
                                                        </div>

                                                        {formError && (
                                                            <div className="flex items-center gap-2 text-red-400 text-xs bg-red-950/20 p-3 border border-red-900/50 rounded-sm">
                                                                <AlertCircle className="w-4 h-4" />
                                                                {formError}
                                                            </div>
                                                        )}

                                                        <button
                                                            type="submit"
                                                            disabled={formState === "submitting"}
                                                            onMouseEnter={() => { setCtaHover(true); setCtaPlayId((p) => p + 1); }}
                                                            onFocus={() => { setCtaHover(true); setCtaPlayId((p) => p + 1); }}
                                                            onMouseLeave={() => setCtaHover(false)}
                                                            onBlur={() => setCtaHover(false)}
                                                            className="relative group inline-flex w-full items-center justify-center px-7 py-4 font-bold uppercase tracking-widest text-sm text-black overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            <div
                                                                className="absolute inset-0 bg-white group-hover:bg-primary transition-colors duration-300"
                                                                style={{ clipPath: "polygon(5% 0%, 100% 0%, 100% 72%, 95% 100%, 0% 100%, 0% 28%)" }}
                                                            />
                                                            <div className="absolute inset-0 pointer-events-none">
                                                                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                                                    <path
                                                                        d="M 5 0 L 100 0 L 100 72 L 95 100 L 0 100 L 0 28 L 5 0 Z"
                                                                        vectorEffect="non-scaling-stroke"
                                                                        className="stroke-1 fill-none stroke-white/25 group-hover:stroke-white/40 transition-all duration-300"
                                                                    />
                                                                </svg>
                                                                <svg className="absolute -top-px -left-px w-3 h-3 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                                    <path d="M 0 9 V 0 H 9" fill="none" stroke="currentColor" strokeWidth="2" />
                                                                </svg>
                                                                <svg className="absolute -bottom-px -right-px w-3 h-3 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                                    <path d="M 12 3 V 12 H 3" fill="none" stroke="currentColor" strokeWidth="2" />
                                                                </svg>
                                                            </div>
                                                            <div className="relative z-10 flex items-center justify-center gap-2">
                                                                {formState === "submitting" ? (
                                                                    <>
                                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                                        Processando...
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <TextScramble
                                                                            as="span"
                                                                            className="text-sm font-semibold uppercase tracking-[0.2em] text-black"
                                                                            duration={0.8}
                                                                            speed={0.035}
                                                                            trigger={ctaHover}
                                                                            playId={ctaPlayId}
                                                                            idleGlitch={false}
                                                                        >
                                                                            {"Inicializar Contato"}
                                                                        </TextScramble>
                                                                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                                                                    </>
                                                                )}
                                                            </div>
                                                        </button>
                                                    </form>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="agents"
                                        initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                                        transition={{ duration: 0.35 }}
                                        className="relative z-10"
                                    >
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between border-b border-white/20 pb-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                                    <h3 className="text-sm font-bold text-white uppercase tracking-widest">Operadores Comerciais</h3>
                                                </div>
                                                <span className="text-[10px] text-white/88 font-mono font-semibold">STATUS: ONLINE</span>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                                {commercialTeam.map((member, idx) => (
                                                    <TechCard key={idx} className="bg-white/8 hover:bg-white/20 transition-all group/member h-full">
                                                        <div className="flex flex-col h-full justify-between gap-3">
                                                            <div className="space-y-1">
                                                                <p className="text-white font-bold text-sm uppercase tracking-wide group-hover/member:text-primary transition-colors">
                                                                    {member.name}
                                                                </p>
                                                                <p className="text-white/88 text-[10px] font-mono">Sales Rep.</p>
                                                            </div>
                                                            <div className="space-y-1">
                                                                <a
                                                                    href={`https://wa.me/55${member.phone.replace(/\D/g, '')}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-2 text-xs text-white/90 hover:text-emerald-300 transition-colors px-2 py-2 min-h-11"
                                                                    aria-label={`Chamar ${member.name} no WhatsApp em ${member.phone}`}
                                                                >
                                                                    <Phone className="w-3 h-3" />
                                                                    {member.phone}
                                                                </a>
                                                                <a
                                                                    href={`mailto:${member.email}`}
                                                                    className="inline-flex items-center gap-2 text-[11px] text-white/90 hover:text-white transition-colors truncate px-2 py-2 min-h-11"
                                                                    aria-label={`Enviar email para ${member.name} em ${member.email}`}
                                                                >
                                                                    <Mail className="w-3 h-3" />
                                                                    {member.email}
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </TechCard>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.12)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-size-[100%_2px,3px_100%] opacity-20" />
                        </div>

                        {/* Bottom status bar */}
                        <div className="h-9 w-full bg-black/80 border-t border-white/20 flex items-center justify-between px-4 text-[10px] font-mono text-white/88">
                            <span>SECURE_CHANNEL_ESTABLISHED</span>
                            <span>{activePanel === "form" ? "INPUT_MODE: TRANSMISSÃO" : "INPUT_MODE: OPERADORES"}</span>
                        </div>
                    </div>
                </div>
                <section className="relative">
                    <div className="absolute inset-0 pointer-events-none -z-20">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[50px_50px]" />
                        <div className="absolute inset-0 bg-linear-to-t from-[#020202] via-[#020202]/80 to-transparent" />
                    </div>
                    <div className="mx-auto w-full px-[5%] py-16 lg:py-20 flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between relative z-10">
                        <div className="flex w-full flex-col gap-6 lg:max-w-md">
                            <Link href="#home" className="flex items-center gap-3 w-fit" aria-label="Voltar para o início da página">
                                <img src="/images/logo.svg" alt="Logo Inteli Júnior" className="h-10 w-auto" />
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-primary tracking-[0.18em] uppercase">Inteli</span>
                                    <span className="text-[10px] text-white/90 font-mono tracking-widest">JÚNIOR</span>
                                </div>
                            </Link>
                            <p className="text-sm text-white/88 leading-relaxed">
                                Consultoria universitária com excelência e entrega de alto nível. Transformamos desafios complexos em soluções digitais que performam.
                            </p>
                            <ul className="flex items-center space-x-4 text-white/88">
                                <li>
                                    <a
                                        href="https://www.instagram.com/inteli.jr/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Instagram da Inteli Júnior"
                                        className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/20 bg-white/10 hover:bg-primary/20 hover:border-primary/40 hover:text-white transition-colors"
                                    >
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm0 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7Zm9.75 1.25a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0ZM12 8.5A3.5 3.5 0 1 1 8.5 12A3.5 3.5 0 0 1 12 8.5Zm0 2a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 12 10.5Z" />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.linkedin.com/company/inteli-júnior/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="LinkedIn da Inteli Júnior"
                                        className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/20 bg-white/10 hover:bg-primary/20 hover:border-primary/40 hover:text-white transition-colors"
                                    >
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5S1.12 1 2.5 1S4.98 2.12 4.98 3.5zM.22 8.01h4.56V24H.22zM8.79 8.01h4.37v2.18h.06c.61-1.16 2.11-2.38 4.34-2.38c4.64 0 5.5 3.05 5.5 7.02V24h-4.56v-7.1c0-1.69-.03-3.87-2.36-3.87c-2.36 0-2.72 1.84-2.72 3.74V24H8.79z" />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="grid w-full gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
                            <div>
                                <h3 className="mb-4 font-bold uppercase tracking-[0.12em] text-white">Mapa do site</h3>
                                <ul className="space-y-3 text-sm text-white/88">
                                    <li><a className="hover:text-primary transition-colors" href="#home">Início</a></li>
                                    <li><a className="hover:text-primary transition-colors" href="#quem-somos">Quem somos</a></li>
                                    <li><a className="hover:text-primary transition-colors" href="#trajetoria">Trajetória</a></li>
                                    <li><a className="hover:text-primary transition-colors" href="#servicos">Serviços</a></li>
                                    <li><a className="hover:text-primary transition-colors" href="#cases">Portfólio</a></li>
                                    <li><a className="hover:text-primary transition-colors" href="#depoimentos">Membros</a></li>
                                    <li><a className="hover:text-primary transition-colors" href="#contato">Contato</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-4 font-bold uppercase tracking-[0.12em] text-white">Serviços</h3>
                                <ul className="space-y-3 text-sm text-white/88">
                                    <li><a className="hover:text-primary transition-colors" href="#servicos">Análise de Dados</a></li>
                                    <li><a className="hover:text-primary transition-colors" href="#servicos">Aplicações Completas</a></li>
                                    <li><a className="hover:text-primary transition-colors" href="#servicos">Landing Pages</a></li>
                                    <li><a className="hover:text-primary transition-colors" href="#cases">Cases em destaque</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-4 font-bold uppercase tracking-[0.12em] text-white">Contato</h3>
                                <ul className="space-y-3 text-sm text-white/88">
                                    <li><a className="hover:text-primary transition-colors" href="https://wa.me/5511947005421" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp comercial">WhatsApp Comercial</a></li>
                                    <li><a className="hover:text-primary transition-colors" href="mailto:contato@intelijunior.com" aria-label="Email de contato">contato@intelijunior.com</a></li>
                                    <li><a className="hover:text-primary transition-colors" href="#contato">Formulário de contato</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto w-full px-[5%] pb-10 flex flex-col gap-4 border-t border-white/20 pt-6 text-xs text-white/88 md:flex-row md:items-center md:justify-between relative z-10">
                        <p className="uppercase tracking-[0.12em]">© 2025 Inteli Júnior. Todos os direitos reservados.</p>
                        <a
                            href="https://github.com/souzajv"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-white/88 hover:text-primary transition-colors"
                            aria-label="GitHub de João Campos"
                        >
                            <Github className="w-4 h-4" />
                            Made by João Campos
                        </a>
                        <div className="flex gap-4 text-white/88">
                            <a className="hover:text-primary transition-colors" href="#">Política de Privacidade</a>
                            <a className="hover:text-primary transition-colors" href="#">Termos de Uso</a>
                        </div>
                    </div>
                </section>
            </div>

            {/* Modal de Contato (Para botões do topo da página que chamam o modal) */}
            <ContactModal
                isOpen={isContactOpen}
                onClose={() => setIsContactOpen(false)}
            />
        </footer>
    );
}