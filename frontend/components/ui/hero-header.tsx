import HeroTorusScene from "@/components/ui/hero-torus-scene";
import Image from "next/image";

const navLinks = [
    { label: "Quem somos", href: "#quem-somos" },
    { label: "Portfólio", href: "#portfolio" },
    { label: "Serviços", href: "#servicos" },
    { label: "Membros", href: "#membros" },
    { label: "Contato", href: "#contato" },
];

export default function HeroHeader() {
    return (
        <header
            id="hero"
            className="arch-shell relative flex min-h-screen flex-col justify-between overflow-hidden px-6 pt-4 pb-10 md:py-10 sm:px-10 lg:pl-32 lg:pr-16"
        >
            <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_60%_60%,rgba(255,255,255,0.08),transparent_35%)]" />
            <HeroTorusScene className="z-10" />
            <div className="pointer-events-none absolute bottom-0 right-0 hidden h-24 w-24 border-l border-t border-white/20 lg:block" />

            <div className="relative z-10 flex w-full items-start justify-between gap-6" data-hero-fade>
                <div className="flex items-center gap-[clamp(0.3rem,0.8vw,0.75rem)] px-1 py-1 text-[clamp(1rem,1.2vw+0.7rem,1.75rem)] font-thin tracking-tight uppercase">
                    <Image
                        src="/images/logo.svg"
                        alt="Logo Inteli Junior"
                        width={28}
                        height={28}
                        className="size-[clamp(1.5rem,2.3vw,2.5rem)]"
                        priority
                    />
                    <span>Inteli Júnior</span>
                </div>
                <nav className="hidden items-center gap-[clamp(0.25rem,0.7vw,0.5rem)] border border-white/25 px-[clamp(0.5rem,1vw,0.75rem)] py-[clamp(0.4rem,0.8vw,0.65rem)] font-thin uppercase tracking-[0.2em] text-[clamp(0.62rem,0.34vw+0.5rem,0.85rem)] text-white/90 md:flex">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="rounded-none px-[clamp(0.45rem,0.8vw,0.75rem)] py-[clamp(0.35rem,0.7vw,0.55rem)] transition hover:text-black"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
            </div>

            <div className="relative z-10 mt-12 grid w-full gap-12 md:mt-16 lg:grid-cols-12 lg:items-end">
                <div className="order-2 max-w-sm space-y-8 text-white/85 lg:order-1 lg:col-span-3" data-hero-fade>
                    <p className="arch-kicker" data-split>
                        Engenharia aplicada
                    </p>
                    <p className="leading-relaxed uppercase" data-split>
                        Engenharia, design e produto na mesma mesa. Construímos soluções com disciplina técnica, estética de ponta e velocidade de startup.
                    </p>
                    <a
                        href="#quem-somos"
                        className="group inline-flex min-h-11 items-center gap-[clamp(0.35rem,0.9vw,0.65rem)] border border-white/40 px-[clamp(1.4rem,4.5vw,3rem)] py-[clamp(0.8rem,2vw,1.5rem)] text-[clamp(0.72rem,0.55vw+0.5rem,1.1rem)] font-bold uppercase tracking-[clamp(0.14em,0.12em+0.2vw,0.22em)] transition hover:border-white/80 hover:bg-white hover:text-black"
                    >
                        Explorar <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                    </a>
                </div>

                <div className="order-1 text-right lg:order-2 lg:col-span-9">
                    <h1 className="pb-8 text-[clamp(2.35rem,11.5vw,8.5rem)] leading-[0.85] tracking-[-0.03em] text-white uppercase sm:pb-10 sm:text-[clamp(2.8rem,10vw,8.5rem)]">
                        <span className="block whitespace-nowrap font-thin" data-hero-letters>
                            Engenharia
                        </span>
                        <span className="block whitespace-nowrap font-thin" data-hero-letters>
                            para
                        </span>
                        <span className="block whitespace-nowrap font-semibold" data-hero-letters>
                            o Futuro
                        </span>
                    </h1>
                    <p className="mt-3 text-[clamp(1.05rem,2.2vw,1.7rem)] font-thin tracking-tight text-white/70 hidden md:block" data-hero-fade>
                        Inteli Júnior • Tecnologia pronta para produção
                    </p>
                </div>
            </div>
        </header>
    );
}
