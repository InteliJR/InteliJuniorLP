import {
    Briefcase,
    Flag,
    Home as HomeIcon,
    Layers,
    Mail,
    User,
} from "lucide-react";

import HeroTorusScene from "@/components/ui/hero-torus-scene";
import NavigationRail from "@/components/ui/navigation-rail";

const navLinks = [
    { label: "Quem somos", href: "#quem-somos" },
    { label: "Trajetória", href: "#trajetoria" },
    { label: "Serviços", href: "#servicos" },
    { label: "Portfólio", href: "#portfolio" },
    { label: "Membros", href: "#membros" },
    { label: "Contato", href: "#contato" },
];

const railLinks = [
    { label: "Home", href: "#hero", Icon: HomeIcon },
    { label: "Quem somos", href: "#quem-somos", Icon: User },
    { label: "Trajetória", href: "#trajetoria", Icon: Flag },
    { label: "Serviços", href: "#servicos", Icon: Layers },
    { label: "Portfólio", href: "#portfolio", Icon: Briefcase },
    { label: "Contato", href: "#contato", Icon: Mail },
];

export default function FirstSection() {
    return (
        <section className="relative min-h-screen bg-[#ff4d3a] text-white">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.08),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.06),transparent_36%),linear-gradient(180deg,rgba(0,0,0,0.14),rgba(0,0,0,0.22))]" />

            <NavigationRail items={railLinks} />

            <header
                id="hero"
                className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 py-10 sm:px-10 lg:px-16"
            >
                <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_60%_60%,rgba(255,255,255,0.08),transparent_35%)]" />
                <HeroTorusScene className="z-0" />

                <div className="relative z-10 flex items-start justify-between gap-6">
                    <div className="text-lg font-bold tracking-tight">Inteli Júnior</div>
                    <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.2em] text-white/75 md:flex">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="transition hover:text-white"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </div>

                <div className="relative z-10 mt-12 flex flex-col gap-12 md:mt-16 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-xs space-y-8 text-white/85">
                        <p className="text-sm font-medium leading-relaxed">
                            Engenharia, design e produto na mesma mesa. Construímos soluções com disciplina técnica, estética de ponta e velocidade de startup.
                        </p>
                        <a
                            href="#quem-somos"
                            className="group inline-flex items-center gap-2 border-b border-white pb-1 text-xs font-bold uppercase tracking-[0.28em] transition hover:border-white/60 hover:text-white/80"
                        >
                            Explorar <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
                        </a>
                    </div>

                    <div className="text-right">
                        <h1 className="text-5xl font-semibold leading-[0.9] tracking-tighter text-white sm:text-6xl lg:text-7xl">
                            <span className="block">Engenharia para</span>
                            <span className="block">o Futuro</span>
                        </h1>
                        <p className="mt-3 text-2xl font-medium tracking-tight text-white/70 sm:text-3xl">
                            Inteli Júnior • Tecnologia pronta para produção
                        </p>
                    </div>
                </div>
            </header>

            <section id="quem-somos" className="sr-only" aria-hidden="true">
                Âncora reservada para a seção Quem Somos.
            </section>
            <section id="trajetoria" className="sr-only" aria-hidden="true">
                Âncora reservada para a seção Trajetória.
            </section>
            <section id="servicos" className="sr-only" aria-hidden="true">
                Âncora reservada para a seção Serviços.
            </section>
            <section id="portfolio" className="sr-only" aria-hidden="true">
                Âncora reservada para a seção Portfólio.
            </section>
            <section id="membros" className="sr-only" aria-hidden="true">
                Âncora reservada para a seção Membros.
            </section>
            <section id="contato" className="sr-only" aria-hidden="true">
                Âncora reservada para a seção Contato.
            </section>
        </section>
    );
}
