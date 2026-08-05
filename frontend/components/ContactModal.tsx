"use client";


import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Terminal, Loader2, CheckCircle2, AlertCircle, Building2, Mail, Phone, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { TextScramble } from "./ui/textScramble/TextScramble";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const products = [
    "Análise de Dados",
    "Identidade Visual",
    "Landing Pages",
    "Aplicações Completas",
    "Outros"
];

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
    const [formError, setFormError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        company: "",
        email: "",
        phone: "",
        product: "",
        message: ""
    });

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (formError) setFormError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.email && !formData.phone) {
            setFormError("É necessário informar ao menos um contato (Email ou Telefone).");
            return;
        }

        if (!formData.product) {
            setFormError("Por favor, selecione um produto de interesse.");
            return;
        }

        setFormState("submitting");

        await new Promise(resolve => setTimeout(resolve, 2000));
        setFormState("success");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-999 bg-black/80 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                        className="fixed inset-0 z-1000 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="w-full max-w-lg pointer-events-auto flex flex-col bg-[#050505] border border-white/10 shadow-[0_0_50px_rgba(var(--primary),0.15)] overflow-hidden relative max-h-[90vh] overflow-y-auto custom-scrollbar">
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[20px_20px] pointer-events-none" />
                            <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-[#050505] border-b border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                                    </div>
                                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
                                        <Terminal className="w-3 h-3" />
                                        UPLINK_PROTOCOL.exe
                                    </span>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="text-white/40 hover:text-white transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="p-6 md:p-8 relative z-10">
                                {formState === "success" ? (
                                    <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                                        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                                            <CheckCircle2 className="w-8 h-8 text-green-500" />
                                        </div>
                                        <h3 className="text-xl text-white font-bold uppercase tracking-widest">Transmissão Recebida</h3>
                                        <p className="text-white/50 text-sm max-w-xs">
                                            Nossa equipe de operações interceptou sua mensagem. Entraremos em contato em breve.
                                        </p>
                                        <button
                                            onClick={onClose}
                                            className="mt-4 px-6 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white/70 text-xs uppercase tracking-widest transition-all"
                                        >
                                            Fechar Protocolo
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-6">
                                            <h2 className="text-2xl text-white font-bold uppercase leading-none mb-2">
                                                <TextScramble as="span" trigger={true}>Iniciar Projeto</TextScramble>
                                            </h2>
                                            <p className="text-sm text-white/40">
                                                Preencha os dados abaixo para estabelecer conexão com nossa equipe.
                                            </p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] uppercase tracking-widest text-primary font-mono ml-1">Identificação (Nome) *</label>
                                                <div className="relative group">
                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-white/30" />
                                                    <input
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        required
                                                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 text-white pl-9 pr-3 py-3 text-sm outline-none transition-all placeholder:text-white/10"
                                                        placeholder="Digite seu nome..."
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-[10px] uppercase tracking-widest text-primary font-mono ml-1">Empresa (Opcional)</label>
                                                <div className="relative group">
                                                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-white/30" />
                                                    <input
                                                        name="company"
                                                        value={formData.company}
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 text-white pl-9 pr-3 py-3 text-sm outline-none transition-all placeholder:text-white/10"
                                                        placeholder="Nome da organização..."
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] uppercase tracking-widest text-primary font-mono ml-1">Email</label>
                                                    <div className="relative group">
                                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-white/30" />
                                                        <input
                                                            name="email"
                                                            type="email"
                                                            value={formData.email}
                                                            onChange={handleInputChange}
                                                            className="w-full bg-black/50 border border-white/10 focus:border-primary/50 text-white pl-9 pr-3 py-3 text-sm outline-none transition-all placeholder:text-white/10"
                                                            placeholder="Email..."
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] uppercase tracking-widest text-primary font-mono ml-1">Telefone</label>
                                                    <div className="relative group">
                                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-white/30" />
                                                        <input
                                                            name="phone"
                                                            type="text"
                                                            value={formData.phone}
                                                            onChange={handleInputChange}
                                                            className="w-full bg-black/50 border border-white/10 focus:border-primary/50 text-white pl-9 pr-3 py-3 text-sm outline-none transition-all placeholder:text-white/10"
                                                            placeholder="Tel..."
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-[9px] text-white/30 text-right">
                                                * Preencha Email ou Telefone
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-[10px] uppercase tracking-widest text-primary font-mono ml-1">Produto de Interesse *</label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {products.map((prod) => (
                                                        <button
                                                            key={prod}
                                                            type="button"
                                                            onClick={() => {
                                                                setFormData(prev => ({ ...prev, product: prod }));
                                                                if (formError) setFormError(null);
                                                            }}
                                                            className={cn(
                                                                "px-2 py-2 text-[10px] border transition-all duration-300 text-left uppercase tracking-wider",
                                                                formData.product === prod
                                                                    ? "bg-primary text-black border-primary font-bold"
                                                                    : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                                                            )}
                                                        >
                                                            {prod}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-[10px] uppercase tracking-widest text-primary font-mono ml-1">Dados da Missão</label>
                                                <div className="relative group">
                                                    <textarea
                                                        name="message"
                                                        value={formData.message}
                                                        onChange={handleInputChange}
                                                        rows={3}
                                                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 text-white p-3 text-sm outline-none transition-all placeholder:text-white/10 resize-none"
                                                        placeholder="Descreva seu projeto..."
                                                    />
                                                </div>
                                            </div>

                                            {formError && (
                                                <div className="flex items-center gap-2 text-red-400 text-[10px] bg-red-950/20 p-2 border border-red-900/50">
                                                    <AlertCircle className="w-3 h-3" />
                                                    {formError}
                                                </div>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={formState === "submitting"}
                                                className="w-full bg-primary hover:bg-primary/90 text-black font-bold uppercase tracking-widest py-3 text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2 group"
                                            >
                                                {formState === "submitting" ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                        Criptografando...
                                                    </>
                                                ) : (
                                                    <>
                                                        Enviar Transmissão
                                                        <Send className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    </>
                                )}
                            </div>
                            <div className="bg-black/80 p-2 border-t border-white/10 flex justify-between items-center px-4 sticky bottom-0 z-20">
                                <span className="text-[9px] text-white/20 font-mono uppercase">SECURE_CONNECTION_V2.0</span>
                                <div className="flex gap-1">
                                    <div className="w-1 h-1 bg-white/20 rounded-full animate-pulse" />
                                    <div className="w-1 h-1 bg-white/20 rounded-full animate-pulse delay-75" />
                                    <div className="w-1 h-1 bg-white/20 rounded-full animate-pulse delay-150" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
