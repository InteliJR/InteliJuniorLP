import Image from "next/image";

const stackItems = [
    {
        id: "01",
        title: "BTG Pactual",
        location: "Dashboard financeiro",
        description:
            "Dashboard interativo para visualização de dados financeiros em tempo real, otimizando a tomada de decisão.",
        image:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
        cta: "Ver case",
    },
    {
        id: "02",
        title: "Meta",
        location: "Analytics platform",
        description:
            "Plataforma de análise de dados para campanhas de marketing, com relatórios automatizados e insights preditivos.",
        image:
            "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/952269bf-60f5-48dc-afce-13953bead1eb_1600w.webp",
        cta: "Ver case",
    },
    {
        id: "03",
        title: "BCG",
        location: "Business intelligence",
        description:
            "Sistema de BI para consultoria estratégica, integrando múltiplas fontes de dados para análises complexas.",
        image:
            "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1600&auto=format&fit=crop",
        cta: "Ver case",
    },
    {
        id: "04",
        title: "Dell",
        location: "Sistema de gestão",
        description:
            "ERP customizado para gestão de inventário e logística, reduzindo custos operacionais em 15%.",
        image:
            "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1600&auto=format&fit=crop",
        cta: "Ver case",
    },
];

export default function ThirdSection() {
    return (
        <section
            id="portfolio"
            data-graph-profile
            data-graph-line="0.17"
            data-graph-node="0.25"
            className="arch-shell relative w-full bg-(--surface-dark-4) px-6 py-24 text-white md:px-12 lg:pl-32 lg:pr-16"
        >
            <div className="flex w-full items-end justify-between gap-6">
                <div>
                    <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/45" data-split>
                        [3. PORTFÓLIO]
                    </p>
                    <h3 className="text-4xl font-thin text-white uppercase md:text-6xl">
                        CASES EM
                        <span className="font-semibold pl-9 text-primary" data-split>DESTAQUE</span>
                    </h3>
                </div>
                <p className="hidden max-w-xs text-right text-xs font-medium uppercase tracking-[0.2em] text-white/50 md:block" data-split>
                    Nossos membros já desenvolveram soluções para grandes empresas do mercado.
                </p>
            </div>

            <div className="mt-14 w-full space-y-14 pb-[10vh]">
                {stackItems.map((item, index) => (
                    <div key={item.id} data-stack-card className="group sticky top-[8vh] h-[76vh] w-full sm:h-[82vh] lg:top-[10vh] lg:h-[80vh]">
                        <div
                            data-stack-inner
                            className="glass-panel relative grid h-full w-full transform-gpu overflow-hidden rounded border border-white/10 bg-(--surface-dark-3) shadow-2xl shadow-black/40 lg:grid-cols-[1fr_1.5fr]"
                        >
                            <div className="absolute top-0 left-0 h-px w-full bg-(--brand-primary) opacity-65" />
                            <div className="relative z-10 order-2 flex flex-col justify-between bg-(--surface-dark-1) p-8 md:order-1 md:p-16">
                                <div>
                                    <div className="mb-6 text-4xl font-semibold text-white/10">{item.id}</div>
                                    <h4 className="mb-2 text-2xl leading-tight tracking-[-0.02em] text-white uppercase md:text-4xl">
                                        <span className="font-thin tracking-[0.06em]" data-split>
                                            {item.title.split(" ")[0]}
                                        </span>{" "}
                                        <span className="font-semibold" data-split>
                                            {item.title.split(" ").slice(1).join(" ")}
                                        </span>
                                    </h4>
                                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/50" data-split>
                                        {item.location}
                                    </p>
                                </div>
                                <div className="max-w-xs space-y-6">
                                    <p className="text-sm font-light leading-relaxed text-white/65" data-split>
                                        {item.description}
                                    </p>
                                    <a
                                        href="#contato"
                                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/75 transition-colors hover:text-primary"
                                        data-split
                                    >
                                        {item.cta} →
                                    </a>
                                </div>
                            </div>
                            <div className="relative order-1 h-full overflow-hidden md:order-2">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                                    className={`h-full w-full object-cover transition-transform duration-1500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 ${index === stackItems.length - 1 ? "grayscale group-hover:grayscale-0" : ""}`}
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/10" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
