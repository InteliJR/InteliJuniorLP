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
    {
        name: "Danilo Neto",
        phone: "(31) 99638-9166",
        email: "danilo.neto@intelijunior.com",
        role: "Diretor de Vendas",
        linkedin: "https://www.linkedin.com/in/danilo-de-castro-neto/",
        image: "/images/members/danilo_castro.webp",
    },
    {
        name: "Rafael Cabral",
        phone: "(12) 99143-5535",
        email: "rafael.cabral@intelijunior.com",
        role: "Representante de Vendas",
        linkedin: "https://www.linkedin.com/in/-rafael-cabral/",
        image: "/images/members/rafael_cabral.webp",
    },
    {
        name: "Rodrigo Ferraz",
        phone: "(44) 98805-0272",
        email: "rodrigo.ferraz@intelijunior.com",
        role: "Representante de Vendas",
        linkedin: "https://www.linkedin.com/in/rodrigo-ferraz-b8a946244/",
        image: "/images/members/rodrigo_ferraz.webp",
    },
    {
        name: "Livia Negrini",
        phone: "(11) 94373-2417",
        email: "livia.negrini@intelijunior.com",
        role: "Representante de Vendas",
        linkedin: "https://www.linkedin.com/in/livianegrini/",
        image: "/images/members/livia_negrini.webp",
    },
    {
        name: "Ana Júlia Ribeiro",
        phone: "(11) 98637-2353",
        email: "ana.ribeiro@intelijunior.com",
        role: "Representante de Vendas",
        linkedin: "https://www.linkedin.com/in/ana-j%C3%BAlia-ribeiro/",
        image: "/images/members/ana_julia.webp",
    },
    {
        name: "Luísa Mangini",
        phone: "(11) 94700-5421",
        email: "luisa.mangini@intelijunior.com",
        role: "Representante de Vendas",
        linkedin: "https://www.linkedin.com/in/lu%C3%ADsa-mangini/",
        image: "/images/members/luisa_mangini.jpg",
    },
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

const siteMapLinks = [
    { label: "Início", href: "#home" },
    { label: "Quem Somos", href: "#quem-somos" },
    { label: "Trajetória", href: "#trajetoria" },
    { label: "Serviços", href: "#servicos" },
    { label: "Contato", href: "#contato" },
];

const servicesFooterLinks = [
    { label: "Análise de Dados", href: "#servicos" },
    { label: "Identidade Visual", href: "#servicos" },
    { label: "Landing Pages", href: "#servicos" },
    { label: "Aplicações Completas", href: "#servicos" },
    { label: "Inteligência Artificial", href: "#servicos" },
];

// --- COMPONENTE PRINCIPAL ---

export default function Footer() {
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
    const [formError, setFormError] = useState<string | null>(null);
    const activePanel: "form" | "agents" = "form";
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

    // Auto-reset do formulário após sucesso
    useEffect(() => {
        if (formState === "success") {
            const timer = setTimeout(() => {
                setFormState("idle");
                setFormData({ name: "", company: "", email: "", phone: "", products: [], message: "" });
            }, 5000); // 5 segundos
            return () => clearTimeout(timer);
        }
    }, [formState]);

    // Form States
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        email: "",
        phone: "",
        products: [] as string[],
        message: ""
    });

    // Máscara de telefone brasileiro
    const formatPhone = (value: string): string => {
        const digits = value.replace(/\D/g, '').slice(0, 11);
        if (digits.length <= 2) return digits;
        if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
        if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        if (name === 'phone') {
            setFormData(prev => ({ ...prev, phone: formatPhone(value) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
        
        if (formError) setFormError(null);
    };

    const toggleProduct = (product: string) => {
        setFormData(prev => ({
            ...prev,
            products: prev.products.includes(product)
                ? prev.products.filter(p => p !== product)
                : [...prev.products, product]
        }));
        if (formError) setFormError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Helper para verificar se string tem conteúdo real (não só espaços)
        const hasContent = (str: string) => str.trim().length > 0;

        // Limites de caracteres
        const LIMITS = {
            name: { min: 3, max: 100 },
            company: { max: 100 },
            email: { max: 100 },
            message: { max: 1000 }
        };

        // Validação: Nome obrigatório e limites
        const nameTrimmed = formData.name.trim();
        if (!hasContent(formData.name)) {
            setFormError("Por favor, informe seu nome.");
            return;
        }
        if (nameTrimmed.length < LIMITS.name.min) {
            setFormError(`O nome deve ter pelo menos ${LIMITS.name.min} caracteres.`);
            return;
        }
        if (nameTrimmed.length > LIMITS.name.max) {
            setFormError(`O nome deve ter no máximo ${LIMITS.name.max} caracteres.`);
            return;
        }

        // Validação: Empresa (opcional, mas com limite)
        if (formData.company.trim().length > LIMITS.company.max) {
            setFormError(`O nome da empresa deve ter no máximo ${LIMITS.company.max} caracteres.`);
            return;
        }

        // Validação: Email OU Telefone obrigatórios (com conteúdo real)
        const hasEmail = hasContent(formData.email);
        const hasPhone = hasContent(formData.phone);
        
        if (!hasEmail && !hasPhone) {
            setFormError("É necessário informar ao menos um contato (Email ou Telefone).");
            return;
        }

        // Validação: Email válido (se preenchido)
        if (hasEmail) {
            const emailTrimmed = formData.email.trim();
            if (emailTrimmed.length > LIMITS.email.max) {
                setFormError(`O email deve ter no máximo ${LIMITS.email.max} caracteres.`);
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailTrimmed)) {
                setFormError("Por favor, informe um email válido.");
                return;
            }
        }

        // Validação: Telefone válido (se preenchido) - mínimo 10 dígitos
        if (hasPhone) {
            const phoneDigits = formData.phone.replace(/\D/g, '');
            if (phoneDigits.length < 10) {
                setFormError("Por favor, informe um telefone válido (mínimo 10 dígitos).");
                return;
            }
        }

        // Validação: Pelo menos um produto selecionado
        if (formData.products.length === 0) {
            setFormError("Por favor, selecione pelo menos um produto de interesse.");
            return;
        }

        // Validação: Mensagem (opcional, mas com limite)
        if (formData.message.trim().length > LIMITS.message.max) {
            setFormError(`A mensagem deve ter no máximo ${LIMITS.message.max} caracteres.`);
            return;
        }

        setFormState("submitting");
        setFormError(null);

        const apiUrl = process.env.NEXT_PUBLIC_CONTACT_API_URL;
        const apiKey = process.env.NEXT_PUBLIC_CONTACT_API_KEY;

        if (!apiUrl || !apiKey) {
            console.error('Variáveis de ambiente da API não configuradas');
            setFormError("Erro de configuração. Tente novamente mais tarde.");
            setFormState("idle");
            return;
        }

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    company: formData.company.trim() || null,
                    email: formData.email.trim() || null,
                    phone: formData.phone.replace(/\D/g, '') || null,
                    product: formData.products.join(', '),
                    message: formData.message.trim() || null,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || errorData.error || 'Falha ao enviar formulário');
            }

            setFormState("success");
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            setFormError("Ocorreu um erro ao enviar sua mensagem. Tente novamente.");
            setFormState("idle");
        }
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
                                {"[5. contato]"}
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
                        <p className="text-white/70 text-md whitespace-normal">
                            Nosso time está pronto para entender o seu desafio e construir, junto com você, a melhor solução.
                            Preencha o formulário e nosso time retorna com os próximos passos.
                        </p>
                    </div>
                    <div className="h-px w-1/9 bg-primary" />
                </motion.div>

                {/* MAIN CONTENT GRID - Terminal Style Switcher */}
                <div className="relative mb-20 px-[5%]">
                    <div className="relative w-full overflow-hidden border border-white/10 bg-[#050505] shadow-[0_0_50px_rgba(0,0,0,0.7)]">
                        {/* Top bar */}
                        <div className="h-11 w-full bg-white/5 border-b border-white/10 flex items-center justify-between px-4">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                </div>
                                <div className="h-4 w-px bg-white/10" />
                                <span className="text-[11px] font-mono text-white/70 uppercase tracking-[0.16em] flex gap-2">
                                    <Terminal className="w-3 h-3" />
                                    Transmissão_Projeto.exe
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-[10px] font-mono text-white/70">
                                <span className="flex items-center gap-1 text-green-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                    ONLINE
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
                        <div className="flex items-center justify-between bg-white/5 border-b border-white/10 px-4 py-3">
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    className={cn(
                                        "px-3 py-2 text-xs font-bold uppercase tracking-widest border transition-all duration-300",
                                        activePanel === "form"
                                            ? "bg-primary text-black border-primary shadow-[0_0_20px_rgba(255,77,58,0.35)]"
                                            : "text-white/70 border-white/10 hover:text-white hover:border-white/30"
                                    )}
                                    aria-pressed={activePanel === "form"}
                                >
                                    Formulário
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
                                        className="relative z-10 h-full"
                                    >
                                        {formState === "success" ? (
                                            /* Tela de sucesso - ocupa todo o container sem borda interna */
                                            <div className="relative min-h-[500px] flex flex-col items-center justify-center text-center space-y-6 p-8">
                                                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.2),transparent_50%)]" />
                                                
                                                {/* Barra de progresso do auto-reset */}
                                                <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: "100%" }}
                                                        animate={{ width: "0%" }}
                                                        transition={{ duration: 5, ease: "linear" }}
                                                        className="h-full bg-green-500/60"
                                                    />
                                                </div>
                                                
                                                <motion.div 
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{ type: "spring", duration: 0.5 }}
                                                    className="relative"
                                                >
                                                    <div className="absolute inset-0 bg-green-500/30 blur-2xl rounded-full scale-150" />
                                                    <CheckCircle2 className="relative w-20 h-20 text-green-500" />
                                                </motion.div>
                                                
                                                <motion.div 
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.2 }}
                                                    className="space-y-3"
                                                >
                                                    <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wider">
                                                        Mensagem Enviada
                                                    </h3>
                                                    <p className="text-white/60 max-w-md mx-auto text-sm">
                                                        Sua mensagem foi recebida com sucesso. Nosso time entrará em contato em breve.
                                                    </p>
                                                </motion.div>
                                                
                                                <motion.button
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.4 }}
                                                    onClick={() => { setFormState("idle"); setFormData({ name: "", company: "", email: "", phone: "", products: [], message: "" }); }}
                                                    className="text-xs text-primary hover:text-white uppercase tracking-widest border-b border-primary/30 hover:border-white transition-colors mt-4"
                                                >
                                                    Enviar nova mensagem
                                                </motion.button>
                                                
                                                <motion.p
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.6 }}
                                                    className="text-[10px] text-white/30 font-mono"
                                                >
                                                    Retornando ao formulário em 5s...
                                                </motion.p>
                                            </div>
                                        ) : (
                                            /* Formulário */
                                            <div className="relative overflow-hidden border border-white/10 bg-linear-to-b from-black/80 via-primary/10 to-black/90 shadow-[0_0_35px_rgba(255,77,58,0.2)]">
                                                <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_30%_20%,rgba(255,77,58,0.16),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.06),transparent_30%)]" />
                                                <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" />
                                                <div className="absolute inset-10 blur-3xl bg-primary/25 opacity-40" />

                                                <div className="relative z-10 p-6 md:p-8 space-y-6">
                                                    <form onSubmit={handleSubmit} className="space-y-6">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            <div className="space-y-2">
                                                                <div className="flex justify-between items-center">
                                                                    <label className="text-[10px] uppercase text-primary/70 font-bold tracking-widest ml-1">Nome Completo *</label>
                                                                    <span className="text-[9px] text-white/40 font-mono">{formData.name.length}/100</span>
                                                                </div>
                                                                <div className="relative group">
                                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70 group-focus-within:text-primary transition-colors" />
                                                                    <input
                                                                        name="name"
                                                                        value={formData.name}
                                                                        onChange={handleInputChange}
                                                                        maxLength={100}
                                                                        required
                                                                        placeholder="Seu nome (mín. 3 caracteres)"
                                                                        className="w-full bg-white/5 border border-white/10 focus:border-primary/50 text-white pl-10 pr-4 py-3 text-sm outline-none transition-all placeholder:text-white/20"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <div className="flex justify-between items-center">
                                                                    <label className="text-[10px] uppercase text-white/70 font-bold tracking-widest ml-1">Empresa (Opcional)</label>
                                                                    <span className="text-[9px] text-white/40 font-mono">{formData.company.length}/100</span>
                                                                </div>
                                                                <div className="relative group">
                                                                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70 group-focus-within:text-primary transition-colors" />
                                                                    <input
                                                                        name="company"
                                                                        value={formData.company}
                                                                        onChange={handleInputChange}
                                                                        maxLength={100}
                                                                        placeholder="Sua empresa"
                                                                        className="w-full bg-white/5 border border-white/10 focus:border-primary/50 text-white pl-10 pr-4 py-3 text-sm outline-none transition-all placeholder:text-white/20"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            <div className="space-y-2">
                                                                <label className="text-[10px] uppercase text-primary/70 font-bold tracking-widest ml-1">Email</label>
                                                                <div className="relative group">
                                                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70 group-focus-within:text-primary transition-colors" />
                                                                    <input
                                                                        name="email"
                                                                        type="email"
                                                                        value={formData.email}
                                                                        onChange={handleInputChange}
                                                                        maxLength={100}
                                                                        placeholder="seu@email.com"
                                                                        className="w-full bg-white/5 border border-white/10 focus:border-primary/50 text-white pl-10 pr-4 py-3 text-sm outline-none transition-all placeholder:text-white/20"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-[10px] uppercase text-primary/70 font-bold tracking-widest ml-1">Telefone / WhatsApp</label>
                                                                <div className="relative group">
                                                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70 group-focus-within:text-primary transition-colors" />
                                                                    <input
                                                                        name="phone"
                                                                        type="tel"
                                                                        value={formData.phone}
                                                                        onChange={handleInputChange}
                                                                        maxLength={15}
                                                                        placeholder="(11) 99999-9999"
                                                                        className="w-full bg-white/5 border border-white/10 focus:border-primary/50 text-white pl-10 pr-4 py-3 text-sm outline-none transition-all placeholder:text-white/20 font-mono"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="text-[10px] text-white/70 -mt-4 ml-1">
                                                            * Preencha pelo menos um campo de contato.
                                                        </div>

                                                        <div className="space-y-2">
                                                            <div className="flex justify-between items-center">
                                                                <label className="text-[10px] uppercase text-primary/70 font-bold tracking-widest ml-1">Produtos de Interesse * (selecione um ou mais)</label>
                                                                <span className="text-[9px] text-white/40 font-mono">{formData.products.length} selecionado(s)</span>
                                                            </div>
                                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                                {products.map((prod) => {
                                                                    const isSelected = formData.products.includes(prod);
                                                                    return (
                                                                        <button
                                                                            key={prod}
                                                                            type="button"
                                                                            onClick={() => toggleProduct(prod)}
                                                                            className={cn(
                                                                                "px-3 py-2 text-xs border transition-all duration-300 text-left flex items-center gap-2",
                                                                                isSelected
                                                                                    ? "bg-primary text-black border-primary font-bold"
                                                                                    : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20"
                                                                            )}
                                                                        >
                                                                            <div className={cn(
                                                                                "w-3.5 h-3.5 rounded-sm border flex items-center justify-center flex-shrink-0 transition-all",
                                                                                isSelected ? "bg-black/20 border-black/30" : "border-white/30"
                                                                            )}>
                                                                                {isSelected && (
                                                                                    <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none">
                                                                                        <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                    </svg>
                                                                                )}
                                                                            </div>
                                                                            {prod}
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <div className="flex justify-between items-center">
                                                                <label className="text-[10px] uppercase text-white/70 font-bold tracking-widest ml-1">Mensagem (Opcional)</label>
                                                                <span className="text-[9px] text-white/40 font-mono">{formData.message.length}/1000</span>
                                                            </div>
                                                            <textarea
                                                                name="message"
                                                                value={formData.message}
                                                                onChange={handleInputChange}
                                                                maxLength={1000}
                                                                rows={4}
                                                                placeholder="Detalhes do projeto, dúvidas ou briefing inicial..."
                                                                className="w-full bg-white/5 border border-white/10 focus:border-primary/50 text-white p-4 text-sm outline-none transition-all placeholder:text-white/20 resize-none"
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
                                                                <svg className="absolute -top-px -left-px w-3 h-3 text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                                    <path d="M 0 9 V 0 H 9" fill="none" stroke="currentColor" strokeWidth="2" />
                                                                </svg>
                                                                <svg className="absolute -bottom-px -right-px w-3 h-3 text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                                                </div>
                                            </div>
                                        )}
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
                                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-6">
                                            {commercialTeam.map((member, idx) => (
                                                <TechCard key={idx} className="bg-white/[0.02] hover:bg-white/[0.05] border-white/[0.06] hover:border-primary/30 transition-all duration-300 group/member">
                                                    <div className="flex flex-col items-center text-center p-5 gap-4">
                                                        {/* Avatar */}
                                                        <div className="relative flex-none">
                                                            <div className="absolute -inset-1 bg-gradient-to-br from-primary/40 to-transparent rounded-full opacity-0 group-hover/member:opacity-100 blur-md transition-opacity duration-300" />
                                                            {member.image ? (
                                                                <div 
                                                                    className="relative rounded-full overflow-hidden border-2 border-white/10 group-hover/member:border-primary/40 transition-colors duration-300"
                                                                    style={{ width: '120px', height: '120px', minWidth: '120px', minHeight: '120px' }}
                                                                >
                                                                    <img
                                                                        src={member.image}
                                                                        alt={`Foto de ${member.name}`}
                                                                        className="object-cover"
                                                                        style={{ width: '120px', height: '120px' }}
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div 
                                                                    className="relative rounded-full border-2 border-white/10 bg-white/5 flex items-center justify-center text-lg font-semibold text-white/80 group-hover/member:border-primary/40 transition-colors duration-300"
                                                                    style={{ width: '120px', height: '120px', minWidth: '120px', minHeight: '120px' }}
                                                                >
                                                                    {member.name.split(" ").map((p: string) => p[0]).join("")}
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Info */}
                                                        <div className="space-y-1">
                                                            <p className="text-white font-bold text-sm uppercase tracking-wider group-hover/member:text-primary transition-colors duration-300">
                                                                {member.name}
                                                            </p>
                                                            <p className="text-primary/80 text-[11px] font-medium tracking-wide">
                                                                {member.role}
                                                            </p>
                                                        </div>

                                                        {/* Contatos */}
                                                        <div className="w-full space-y-2 pt-2 border-t border-white/5">
                                                            {member.phone && (
                                                                <a
                                                                    href={`https://wa.me/55${member.phone.replace(/\D/g, '')}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="flex items-center justify-center gap-2 text-xs text-white/60 hover:text-green-400 transition-colors py-1.5 rounded-sm hover:bg-green-500/10"
                                                                    aria-label={`Chamar ${member.name} no WhatsApp`}
                                                                >
                                                                    <Phone className="w-3.5 h-3.5" />
                                                                    <span className="font-mono">{member.phone}</span>
                                                                </a>
                                                            )}
                                                            <a
                                                                href={`mailto:${member.email}`}
                                                                className="flex items-center justify-center gap-2 text-xs text-white/60 hover:text-white transition-colors py-1.5 rounded-sm hover:bg-white/5"
                                                                aria-label={`Email de ${member.name}`}
                                                            >
                                                                <Mail className="w-3.5 h-3.5" />
                                                                <span className="truncate">{member.email}</span>
                                                            </a>
                                                        </div>

                                                        {/* LinkedIn Button */}
                                                        <a
                                                            href={member.linkedin}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center justify-center gap-2 w-full text-[11px] font-medium uppercase tracking-wider text-white/70 hover:text-primary border border-white/10 hover:border-primary/40 py-3.5 rounded-sm transition-all duration-300 hover:bg-primary/5"
                                                            aria-label={`LinkedIn de ${member.name}`}
                                                        >
                                                            <Linkedin className="w-3.5 h-3.5" />
                                                            Ver Perfil
                                                        </a>
                                                    </div>
                                                </TechCard>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.12)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-size-[100%_2px,3px_100%] opacity-20" />
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
                                    <span className="text-[10px] text-white/70 font-mono tracking-widest">JÚNIOR</span>
                                </div>
                            </Link>
                            <p className="text-sm text-white/70 leading-relaxed">
                                Consultoria universitária com excelência e entrega de alto nível. Transformamos desafios complexos em soluções digitais que performam.
                            </p>
                            <ul className="flex items-center space-x-4 text-white/70">
                                <li>
                                    <a
                                        href="https://www.instagram.com/inteli.jr/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Instagram da Inteli Júnior"
                                        className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 bg-white/5 hover:bg-primary/20 hover:border-primary/40 hover:text-white transition-colors"
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
                                        className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 bg-white/5 hover:bg-primary/20 hover:border-primary/40 hover:text-white transition-colors"
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
                                <ul className="space-y-3 text-sm text-white/70">
                                    {siteMapLinks.map((item) => (
                                        <li key={item.href}>
                                            <a className="hover:text-primary transition-colors" href={item.href}>{item.label}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-4 font-bold uppercase tracking-[0.12em] text-white">Serviços</h3>
                                <ul className="space-y-3 text-sm text-white/70">
                                    {servicesFooterLinks.map((item) => (
                                        <li key={item.label}>
                                            <a className="hover:text-primary transition-colors" href={item.href}>{item.label}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-4 font-bold uppercase tracking-[0.12em] text-white">Contato</h3>
                                <ul className="space-y-3 text-sm text-white/70">
                                    <li><a className="hover:text-primary transition-colors" href="https://wa.me/5531996389166" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp comercial">WhatsApp Comercial</a></li>
                                    <li><a className="hover:text-primary transition-colors" href="mailto:contato@intelijunior.com" aria-label="Email de contato">contato@intelijunior.com</a></li>
                                    <li><a className="hover:text-primary transition-colors" href="#contato">Formulário de contato</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto w-full px-[5%] pb-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/70 md:flex-row md:items-center md:justify-between relative z-10">
                        <p className="uppercase tracking-[0.12em]">© 2025 Inteli Júnior. Todos os direitos reservados.</p>
                        <a
                            href="https://github.com/souzajv"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-white/70 hover:text-primary transition-colors"
                            aria-label="GitHub de João Campos"
                        >
                            <Github className="w-4 h-4" />
                            Made by João Campos 
                        </a>
                        <div className="flex flex-col gap-4 text-white/70 text-[10px] md:text-xs md:items-end">
                            <a
                                href="https://share.google/SXZzbHvo95wP7AzUs"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary transition-colors"
                                aria-label="Endereço da Inteli Júnior no Google Maps"
                            >
                                Av. Prof. Almeida Prado, 520 - Butantã, São Paulo - SP, 05508-070
                            </a>
                            <span className="hover:text-primary transition-colors">
                                CNPJ: 48.820.726/0001-05
                            </span>
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
