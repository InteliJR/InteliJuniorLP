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
                <div className="flex items-center gap-3 px-1 py-1 text-xl font-thin tracking-tight uppercase md:text-2xl">
                    <Image
                        src="/images/logo.svg"
                        alt="Logo Inteli Junior"
                        width={28}
                        height={28}
                        className="size-8 md:size-10"
                        priority
                    />
                    <span>Inteli Júnior</span>
                </div>
                <nav className="hidden items-center gap-2 border border-white/25 px-3 py-2 font-thin uppercase tracking-[0.2em] text-white/90 md:flex">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="rounded-none px-3 py-2 transition hover:text-black"
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
                    <p className="font-medium leading-relaxed" data-split>
                        Engenharia, design e produto na mesma mesa. Construímos soluções com disciplina técnica, estética de ponta e velocidade de startup.
                    </p>
                    <a
                        href="#quem-somos"
                        className="group inline-flex items-center gap-2 border border-white/40 px-12 py-6 text-xs md:text-lg font-bold uppercase tracking-[0.22em] transition hover:border-white/80 hover:bg-white hover:text-black"
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
