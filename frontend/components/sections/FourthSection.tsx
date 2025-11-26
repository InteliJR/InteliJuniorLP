"use client";

import { useState } from "react";
import { TextScramble } from "../ui/textScramble";
import { cn } from "@/lib/utils";
import GlassBackground from "../GlassBackground";
import {
    BarChart3,
    Palette,
    Globe,
    Code2,
    ArrowRight,
    MousePointerClick,
    CheckCircle2
} from "lucide-react";

// Dados dos serviços com descrições mais elaboradas
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
        gradient: "from-cyan-400/25 to-sky-400/25",
        accentColor: "text-cyan-400",
        borderColor: "border-cyan-400/40",
        hoverBorderColor: "group-hover:border-cyan-400/60",
        glowColor: "rgba(34, 211, 238, 0.6)",
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
        gradient: "from-pink-500/25 to-purple-500/25",
        accentColor: "text-pink-400",
        borderColor: "border-pink-500/40",
        hoverBorderColor: "group-hover:border-pink-400/60",
        glowColor: "rgba(236, 72, 153, 0.6)",
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
        gradient: "from-emerald-500/25 to-green-400/25",
        accentColor: "text-emerald-400",
        borderColor: "border-emerald-500/40",
        hoverBorderColor: "group-hover:border-emerald-400/60",
        glowColor: "rgba(52, 211, 153, 0.6)",
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
        gradient: "from-orange-500/25 to-amber-400/25",
        accentColor: "text-orange-400",
        borderColor: "border-orange-500/40",
        hoverBorderColor: "group-hover:border-orange-400/60",
        glowColor: "rgba(251, 146, 60, 0.6)",
    },
];

// Componente do Card Flip com animação de ondas
function ServiceCard({ service }: { service: typeof services[0] }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const Icon = service.icon;

    return (
        <div
            className="relative w-full h-[480px] group perspective-[2000px] cursor-pointer"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <div
                className={cn(
                    "relative w-full h-full",
                    "transform-3d",
                    "transition-all duration-700 ease-out",
                    isFlipped ? "rotate-y-180" : "rotate-y-0"
                )}
            >
                {/* Frente do Card */}
                <div
                    className={cn(
                        "absolute inset-0 w-full h-full",
                        "backface-hidden rotate-y-0",
                        "overflow-hidden rounded-2xl",
                        "bg-black/60 backdrop-blur-xl",
                        "border border-white/10",
                        "transition-all duration-500",
                        service.hoverBorderColor,
                        isFlipped ? "opacity-0" : "opacity-100"
                    )}
                >
                    {/* Brilho interno */}
                    <div className="absolute inset-0 rounded-2xl backdrop-blur-[1.5px] shadow-[var(--shadow-inner-glass)] pointer-events-none" />

                    {/* Gradiente de fundo */}
                    <div className={cn(
                        "absolute inset-0 bg-linear-to-br opacity-30 transition-opacity duration-500 group-hover:opacity-50",
                        service.gradient
                    )} />

                    {/* Animação de ondas pulsantes */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="relative w-[200px] h-[200px] flex items-center justify-center">
                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-16 h-16 rounded-full opacity-0 animate-wave"
                                    style={{
                                        animationDelay: `${i * 0.4}s`,
                                        boxShadow: `0 0 40px ${service.glowColor}`,
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Ícone grande de fundo */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                        <Icon className="w-48 h-48" strokeWidth={0.3} />
                    </div>

                    {/* Conteúdo */}
                    <div className="relative z-10 h-full flex flex-col justify-between p-8">
                        <div className="flex items-start justify-between">
                            <div className={cn(
                                "w-16 h-16 rounded-2xl flex items-center justify-center",
                                "bg-white/5 border",
                                service.borderColor,
                                "transition-all duration-300 group-hover:scale-110 group-hover:bg-white/10"
                            )}>
                                <Icon className={cn("w-8 h-8", service.accentColor)} strokeWidth={1.5} />
                            </div>

                            {/* Badge de interação */}
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/40 text-xs">
                                <MousePointerClick className="w-3 h-3" />
                                <span>Hover</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-2xl font-semibold text-white uppercase tracking-[0.2em] mb-2 transition-transform duration-500 group-hover:-translate-y-1">
                                    {service.title}
                                </h3>
                                <p className={cn("text-sm font-medium mb-3", service.accentColor)}>
                                    {service.subtitle}
                                </p>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    {service.description}
                                </p>
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-2 gap-2 pt-2">
                                {service.features.map((feature, index) => (
                                    <div
                                        key={feature}
                                        className="flex items-center gap-2 text-white/50 text-xs transition-all duration-300"
                                        style={{ transitionDelay: `${index * 50}ms` }}
                                    >
                                        <CheckCircle2 className={cn("w-3.5 h-3.5", service.accentColor)} />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Verso do Card - Tecnologias */}
                <div
                    className={cn(
                        "absolute inset-0 w-full h-full",
                        "backface-hidden rotate-y-180",
                        "overflow-hidden rounded-2xl",
                        "bg-black/90 backdrop-blur-xl",
                        "border border-primary/30",
                        "transition-all duration-500",
                        !isFlipped ? "opacity-0" : "opacity-100"
                    )}
                >
                    {/* Brilho interno com tom primário */}
                    <div className="absolute inset-0 rounded-2xl backdrop-blur-[1.5px] shadow-[var(--shadow-inner-primary)] pointer-events-none" />

                    {/* Gradiente de fundo */}
                    <div className={cn(
                        "absolute inset-0 bg-linear-to-br opacity-20",
                        service.gradient
                    )} />

                    {/* Conteúdo */}
                    <div className="relative z-10 h-full flex flex-col p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center",
                                "bg-white/5 border",
                                service.borderColor
                            )}>
                                <Icon className={cn("w-6 h-6", service.accentColor)} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white uppercase tracking-[0.2em]">
                                    {service.title}
                                </h3>
                                <span className="text-primary text-xs uppercase tracking-[0.15em]">
                                    Stack Tecnológica
                                </span>
                            </div>
                        </div>

                        <div className="flex-1">
                            <div className="grid grid-cols-2 gap-3">
                                {service.technologies.map((tech, index) => (
                                    <div
                                        key={tech.name}
                                        className={cn(
                                            "flex items-center gap-3 p-3 rounded-xl",
                                            "bg-white/5 border border-white/10",
                                            "transition-all duration-500",
                                            "hover:bg-white/10 hover:border-white/20"
                                        )}
                                        style={{
                                            transform: isFlipped ? "translateY(0)" : "translateY(20px)",
                                            opacity: isFlipped ? 1 : 0,
                                            transitionDelay: `${index * 60 + 100}ms`,
                                        }}
                                    >
                                        <img
                                            src={tech.logo}
                                            alt={tech.name}
                                            className="w-5 h-5 object-contain shrink-0"
                                        />
                                        <span className="text-sm text-white/80">{tech.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <a
                            href="#contato"
                            className={cn(
                                "mt-6 flex items-center justify-center gap-3",
                                "p-4 rounded-xl",
                                "bg-primary/20 border border-primary/30",
                                "transition-all duration-300",
                                "hover:bg-primary/30 hover:border-primary/50 hover:scale-[1.02]",
                                "group/cta"
                            )}
                        >
                            <span className="text-sm font-semibold text-white group-hover/cta:text-primary transition-colors">
                                Solicitar Orçamento
                            </span>
                            <ArrowRight className="w-4 h-4 text-primary transition-transform duration-300 group-hover/cta:translate-x-1" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function FourthSection() {
    return (
        <section id="servicos" className="relative py-20 overflow-hidden">
            {/* Keyframes para animação de ondas */}
            <style jsx global>{`
                @keyframes wave {
                    0% {
                        transform: scale(0.5);
                        opacity: 0;
                    }
                    30% {
                        opacity: 0.4;
                    }
                    100% {
                        transform: scale(3);
                        opacity: 0;
                    }
                }
                .animate-wave {
                    animation: wave 3s ease-out infinite;
                }
            `}</style>

            {/* Header da seção */}
            <div className="w-full flex items-center justify-between mx-auto">
                <div className="h-[0.1px] w-1/9 bg-primary"></div>
                <div className="flex flex-col">
                    <TextScramble
                        as="span"
                        className="text-md font-extralight uppercase text-primary tracking-[0.2em]"
                        duration={1}
                        speed={0.03}
                        trigger={true}
                    >
                        {"[4. NOSSOS SERVIÇOS]"}
                    </TextScramble>
                    <h2 className="text-4xl md:text-5xl font-light uppercase leading-tight mb-4">
                        NOSSOS <span className="text-primary font-semibold">SERVIÇOS</span>
                    </h2>
                </div>
                <p className="text-muted-foreground max-w-xl text-lg">
                    Soluções tecnológicas completas para <span className="font-semibold text-white/70">transformar sua ideia em realidade</span>. Do planejamento à entrega final.
                </p>
                <div className="h-[0.1px] w-1/9 bg-primary"></div>
            </div>

            {/* Dica de interação com GlassBackground */}
            <div className="flex items-center justify-center gap-3 mt-16 mb-12">
                <GlassBackground cn="px-6 py-3 flex items-center gap-3">
                    <MousePointerClick className="w-5 h-5 text-primary animate-pulse" />
                    <span className="text-white/60 text-sm">
                        Passe o mouse sobre os cards para descobrir as tecnologias
                    </span>
                </GlassBackground>
            </div>

            {/* Grid de Cards 2x2 */}
            <div className="mx-auto px-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            </div>

            {/* Nosso Diferencial */}
            <div className="mx-auto px-24 mt-14">
                <div className="relative group overflow-hidden rounded-2xl border border-primary/20 bg-linear-to-r from-primary/10 via-transparent to-primary/10 p-8 md:px-12 transition-all duration-500 hover:border-primary/40">
                    {/* Brilho interno */}
                    <div className="absolute inset-0 rounded-2xl backdrop-blur-[1.5px] shadow-[var(--shadow-inner-primary)] pointer-events-none" />

                    {/* Logo decorativa */}
                    <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                        <img src="/images/logo.svg" alt="Inteli Júnior" className="w-24 h-24" />
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30 shrink-0">
                            <img src="/images/logo.svg" alt="Inteli Júnior" className="w-8 h-8" />
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-2xl font-semibold text-white uppercase">
                                Nosso <span className="text-primary">Diferencial</span>
                            </h3>
                            <p className="text-white/70 leading-relaxed">
                                Todas as soluções que desenvolvemos envolvem um <span className="text-white font-medium">processo profundo de entendimento do negócio</span>, seguido pelo desenvolvimento e implantação. Fazemos os projetos de ponta a ponta: <span className="text-primary font-semibold">da ideia à realidade</span>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
