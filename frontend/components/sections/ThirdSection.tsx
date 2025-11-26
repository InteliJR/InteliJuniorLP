"use client";
import React from "react";
import { Timeline } from "../ui/Timeline";
import { Trophy, Users, Rocket, DollarSign } from "lucide-react";
import { TextScramble } from "../ui/textScramble";

export default function ThirdSection() {
    const data = [
        {
            title: "2023",
            content: (
                <div className="space-y-8">
                    <div className="flex flex-col gap-4">
                        <h4 className="text-2xl font-bold text-white uppercase tracking-[0.2rem]">O Início da Jornada</h4>
                        <p className="text-muted-foreground">
                            Um ano de fundação e primeiras grandes conquistas. Estabelecemos nossa base e superamos todas as expectativas.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative group overflow-hidden bg-white/5 border border-white/10 p-6 rounded-2xl transition-all duration-500 hover:border-primary/30 hover:bg-white/10">
                            {/* Brilho interno */}
                            <div className="absolute inset-0 rounded-2xl backdrop-blur-[1.5px] shadow-[var(--shadow-inner-glass)] pointer-events-none" />
                            {/* Gradiente no hover */}
                            <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none rounded-2xl" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4 text-primary">
                                    <Trophy className="size-5" />
                                    <span className="font-semibold text-sm uppercase tracking-[0.2rem]">7 Prêmios</span>
                                </div>
                                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-white/80">
                                    <li>• Vortex</li>
                                    <li>• Embarque</li>
                                    <li>• ESP</li>
                                    <li>• Prêmio Fejesp</li>
                                </ul>
                            </div>
                        </div>

                        <div className="relative group overflow-hidden bg-white/5 border border-white/10 p-6 rounded-2xl transition-all duration-500 hover:border-primary/30 hover:bg-white/10">
                            {/* Brilho interno */}
                            <div className="absolute inset-0 rounded-2xl backdrop-blur-[1.5px] shadow-[var(--shadow-inner-glass)] pointer-events-none" />
                            {/* Gradiente no hover */}
                            <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none rounded-2xl" />
                            <div className="relative z-10 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-white/60">
                                        <Users className="w-4 h-4" />
                                        <span className="text-sm">Membros</span>
                                    </div>
                                    <span className="text-xl font-bold">15</span>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <DollarSign className="w-10 h-10 text-primary" strokeWidth={1.5} />
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-white/60">Meta</span>
                                                <span className="text-white/40 line-through">R$ 500,00</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-primary font-semibold">Realizado</span>
                                                <span className="text-xl font-bold text-primary">R$ 10.140,00</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "2024",
            content: (
                <div className="space-y-8">
                    <div className="flex flex-col gap-4">
                        <h4 className="text-2xl font-bold text-white uppercase tracking-[0.2rem]">Expansão Acelerada</h4>
                        <p className="text-muted-foreground">
                            Dobramos nosso time e multiplicamos nosso impacto. A consolidação da nossa cultura de excelência.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative group overflow-hidden bg-white/5 border border-white/10 p-6 rounded-2xl transition-all duration-500 hover:border-primary/30 hover:bg-white/10">
                            {/* Brilho interno */}
                            <div className="absolute inset-0 rounded-2xl backdrop-blur-[1.5px] shadow-var(--shadow-inner-glass) pointer-events-none" />
                            {/* Gradiente no hover */}
                            <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none rounded-2xl" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4 text-primary">
                                    <Trophy className="size-5" />
                                    <span className="font-semibold text-sm uppercase tracking-[0.2rem]">5 Prêmios</span>
                                </div>
                                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-white/80">
                                    <li>• Vortex</li>
                                    <li>• Dispare</li>
                                    <li>• ESP</li>
                                </ul>
                            </div>
                        </div>

                        <div className="relative group overflow-hidden bg-white/5 border border-white/10 p-6 rounded-2xl transition-all duration-500 hover:border-primary/30 hover:bg-white/10">
                            {/* Brilho interno */}
                            <div className="absolute inset-0 rounded-2xl backdrop-blur-[1.5px] shadow-[var(--shadow-inner-glass)] pointer-events-none" />
                            {/* Gradiente no hover */}
                            <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none rounded-2xl" />
                            <div className="relative z-10 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-white/60">
                                        <Users className="w-4 h-4" />
                                        <span className="text-sm">Membros</span>
                                    </div>
                                    <span className="text-xl font-bold">33</span>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <DollarSign className="w-10 h-10 text-primary" strokeWidth={1.5} />
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-white/60">Meta</span>
                                                <span className="text-white/40 line-through">R$ 13.182,00</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-primary font-semibold">Realizado</span>
                                                <span className="text-xl font-bold text-primary">R$ 43.012,50</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "2025",
            content: (
                <div className="space-y-8">
                    <div className="flex flex-col gap-4">
                        <h4 className="text-2xl font-bold text-white uppercase tracking-[0.2rem]">Rumo ao Topo</h4>
                        <p className="text-muted-foreground">
                            Em busca do 5º cluster no nosso quinto ano. Uma ascensão rápida e contínua que define nossa história.
                        </p>
                    </div>

                    <div className="relative group overflow-hidden bg-linear-to-r from-primary/20 to-transparent border border-primary/20 p-6 rounded-2xl transition-all duration-500 hover:border-primary/50">
                        {/* Brilho interno com tom primário */}
                        <div className="absolute inset-0 rounded-2xl backdrop-blur-[1.5px] shadow-[var(--shadow-inner-primary)] pointer-events-none" />
                        {/* Gradiente no hover */}
                        <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none rounded-2xl" />
                        <div className="relative z-10 flex items-start gap-4">
                            <Rocket className="w-8 h-8 text-primary mt-1" />
                            <div>
                                <h5 className="text-lg font-bold text-white mb-2">
                                    <a href="https://drive.google.com/file/d/1nvpHTWDmKq0rdhbac4WYTE_aKadFaWcR/view" target="_blank" rel="noopener noreferrer" className="hover:underline decoration-primary underline-offset-4">
                                        3 Clusters em 3 Anos
                                    </a>
                                </h5>
                                <p className="text-sm text-white/80">
                                    Um marco histórico de maturidade e resultados. Somos a prova de que agilidade e responsabilidade caminham juntas.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative group overflow-hidden bg-white/5 border border-white/10 p-6 rounded-2xl transition-all duration-500 hover:border-primary/30 hover:bg-white/10">
                            {/* Brilho interno */}
                            <div className="absolute inset-0 rounded-2xl backdrop-blur-[1.5px] shadow-[var(--shadow-inner-glass)] pointer-events-none" />
                            {/* Gradiente no hover */}
                            <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none rounded-2xl" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4 text-primary">
                                    <Trophy className="size-5" />
                                    <span className="font-semibold text-sm uppercase tracking-[0.2rem]">Reconhecimento</span>
                                </div>
                                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-white/80">
                                    <li>• Prêmio Vortex (Atual)</li>
                                </ul>
                            </div>
                        </div>

                        <div className="relative group overflow-hidden bg-white/5 border border-white/10 p-6 rounded-2xl transition-all duration-500 hover:border-primary/30 hover:bg-white/10">
                            {/* Brilho interno */}
                            <div className="absolute inset-0 rounded-2xl backdrop-blur-[1.5px] shadow-[var(--shadow-inner-glass)] pointer-events-none" />
                            {/* Gradiente no hover */}
                            <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none rounded-2xl" />
                            <div className="relative z-10 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-white/60">
                                        <Users className="w-4 h-4" />
                                        <span className="text-sm">Membros</span>
                                    </div>
                                    <span className="text-xl font-bold">45</span>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <DollarSign className="w-10 h-10 text-primary" strokeWidth={1.5} />
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-white/60">Meta</span>
                                                <span className="text-white/40 line-through">R$ 30.108,75</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-primary font-semibold">Realizado</span>
                                                <span className="text-xl font-bold text-primary">R$ 29.650,00</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
    ];
    return (
        <section className="w-full relative overflow-hidden">
            <div className="w-full flex items-center justify-between mx-auto pt-20 -mb-12">
                <div className="h-[0.1px] w-1/9 bg-primary"></div>
                <div className="flex flex-col">
                    <TextScramble
                        as="span"
                        className="text-md font-extralight uppercase text-primary tracking-[0.2em]"
                        duration={1}
                        speed={0.03}
                        trigger={true}
                    >
                        {"[3. De onde viemos]"}
                    </TextScramble>
                    <h2 className="text-4xl md:text-5xl font-light uppercase leading-tight mb-4">
                        Nossa <span className="text-primary font-semibold">Trajetória</span>
                    </h2>
                </div>
                <p className="text-muted-foreground max-w-xl text-lg">
                    De uma ideia ambiciosa a uma <span className="font-semibold text-white/70">referência no ecossistema júnior</span>. Confira os marcos da nossa evolução.
                </p>
                <div className="h-[0.1px] w-1/9 bg-primary"></div>
            </div>
            <Timeline data={data} />
            {/* Seção de Resultados - Grande Destaque */}
            <div className="relative pt-16 px-4 md:px-8 lg:px-10 overflow-hidden">
                {/* Background com gradiente sutil */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

                {/* Título da seção de resultados */}
                <div className="relative z-10 text-center mb-16">
                    <TextScramble
                        as="span"
                        className="text-md font-extralight uppercase text-primary tracking-[0.2em]"
                        duration={1}
                        speed={0.03}
                        trigger={true}
                    >
                        {"[Nossos Resultados]"}
                    </TextScramble>
                    <h3 className="text-3xl md:text-4xl font-light uppercase leading-tight mt-4">
                        O <span className="text-primary font-semibold">Impacto</span> que geramos
                    </h3>
                </div>

                <div className="relative z-10 px-24 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1 - Negócios Impactados */}
                    <div className="relative group overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02]">
                        {/* Borda gradiente animada */}
                        <div className="absolute -inset-px bg-linear-to-br from-primary/50 via-white/20 to-primary/50 rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Conteúdo do card */}
                        <div className="relative bg-black/80 backdrop-blur-xl rounded-3xl p-10 h-full">
                            {/* Glow de fundo */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Brilho interno premium */}
                            <div className="absolute inset-0 rounded-3xl backdrop-blur-[1.5px] shadow-[var(--shadow-inner-glass-premium)] pointer-events-none" />

                            {/* Ícone decorativo */}
                            <div className="absolute top-6 right-6 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                                </svg>
                            </div>

                            {/* Conteúdo */}
                            <div className="relative z-10 flex flex-col h-full justify-end">
                                <div className="mb-4">
                                    <TextScramble
                                        as="span"
                                        className="text-6xl md:text-7xl font-bold text-primary"
                                        duration={1.5}
                                        speed={0.05}
                                        trigger={true}
                                    >
                                        {"10+"}
                                    </TextScramble>
                                </div>
                                <span className="text-white font-semibold text-lg mb-1">Negócios Impactados</span>
                                <p className="text-white/50 text-sm leading-relaxed">
                                    Empresas que confiaram em nossas soluções tecnológicas.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 - Universitários Capacitados (Card Central - Destaque Maior) */}
                    <div className="relative group overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02] md:-mt-4 md:mb-4">
                        {/* Borda gradiente animada - mais intensa */}
                        <div className="absolute -inset-px bg-linear-to-br from-primary via-orange-500 to-primary rounded-3xl opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Conteúdo do card */}
                        <div className="relative bg-linear-to-b from-black/90 to-black/95 backdrop-blur-xl rounded-3xl p-10 h-full">
                            {/* Glow de fundo mais intenso */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/40 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />

                            {/* Brilho interno premium */}
                            <div className="absolute inset-0 rounded-3xl backdrop-blur-[1.5px] shadow-[var(--shadow-inner-primary-premium)] pointer-events-none" />

                            {/* Ícone decorativo */}
                            <div className="absolute top-6 right-6 w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:scale-110 transition-transform duration-300">
                                <Users className="w-8 h-8 text-primary" strokeWidth={1.5} />
                            </div>

                            {/* Conteúdo */}
                            <div className="relative z-10 flex flex-col h-full justify-end">
                                <div className="mb-4">
                                    <TextScramble
                                        as="span"
                                        className="text-7xl md:text-8xl font-bold text-primary"
                                        duration={1.5}
                                        speed={0.05}
                                        trigger={true}
                                    >
                                        {"50+"}
                                    </TextScramble>
                                </div>
                                <span className="text-white font-semibold text-xl mb-2">Universitários Capacitados</span>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    Talentos formados com experiência real de mercado em projetos de alto impacto.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 - Impacto Econômico */}
                    <div className="relative group overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02]">
                        {/* Borda gradiente animada */}
                        <div className="absolute -inset-px bg-linear-to-br from-primary/50 via-white/20 to-primary/50 rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Conteúdo do card */}
                        <div className="relative bg-black/80 backdrop-blur-xl rounded-3xl p-10 h-full">
                            {/* Glow de fundo */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Brilho interno premium */}
                            <div className="absolute inset-0 rounded-3xl backdrop-blur-[1.5px] shadow-[var(--shadow-inner-glass-premium)] pointer-events-none" />

                            {/* Ícone decorativo */}
                            <div className="absolute top-6 right-6 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                                <DollarSign className="w-8 h-8 text-primary" strokeWidth={1.5} />
                            </div>

                            {/* Conteúdo */}
                            <div className="relative z-10 flex flex-col h-full justify-end">
                                <div className="mb-4">
                                    <TextScramble
                                        as="span"
                                        className="text-6xl md:text-7xl font-bold text-primary"
                                        duration={1.5}
                                        speed={0.05}
                                        trigger={true}
                                    >
                                        {"80k+"}
                                    </TextScramble>
                                </div>
                                <span className="text-white font-semibold text-lg mb-1">Impacto Econômico</span>
                                <p className="text-white/50 text-sm leading-relaxed">
                                    Valor gerado em projetos e soluções entregues ao mercado.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Linha decorativa final */}
                <div className="relative z-10 flex items-center justify-center mt-16">
                    <div className="h-px w-24 bg-linear-to-r from-transparent to-primary/50" />
                    <div className="mx-4 w-2 h-2 rounded-full bg-primary" />
                    <div className="h-px w-24 bg-linear-to-l from-transparent to-primary/50" />
                </div>
            </div>
        </section>
    );
}
