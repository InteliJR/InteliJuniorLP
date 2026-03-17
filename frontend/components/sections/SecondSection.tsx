
import ViewportMarquee from "@/components/ui/viewport-marquee";

export default function SecondSection() {
    const trustedCompanies = [
        "BTG Pactual",
        "Meta",
        "BCG",
        "Dell",
        "Banco Pan",
        "CPTM",
        "Uber",
        "Ambev",
        "Google",
        "Bank of America",
        "Sirio Libanes",
    ];

    const ejHighlights = [
        {
            label: "4 projetos reais por ano",
            index: "01",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <rect x="4" y="5" width="16" height="15" rx="2" />
                    <path d="M8 3v4" />
                    <path d="M16 3v4" />
                    <path d="M4 10h16" />
                </svg>
            ),
        },
        {
            label: "Blockchain a IoT",
            index: "02",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <rect x="3" y="9" width="5" height="5" rx="1" />
                    <rect x="16" y="4" width="5" height="5" rx="1" />
                    <rect x="16" y="15" width="5" height="5" rx="1" />
                    <path d="M8 11.5h4" />
                    <path d="M12 11.5a5 5 0 0 1 4-4.5" />
                    <path d="M12 11.5a5 5 0 0 0 4 4.5" />
                </svg>
            ),
        },
        {
            label: "Implantacao em produção",
            index: "03",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M4 18h16" />
                    <path d="M8 18v-5" />
                    <path d="M12 18V8" />
                    <path d="M16 18v-8" />
                    <path d="m9 6 3-3 3 3" />
                </svg>
            ),
        },
    ];

    return (
        <section
            id="quem-somos"
            data-graph-profile
            data-graph-line="0.16"
            data-graph-node="0.24"
            className="arch-shell relative w-full px-6 py-24 text-white md:px-12 lg:pl-32 lg:pr-16"
        >
            <div className="grid w-full grid-cols-1 border-b border-white/10 md:grid-cols-12 pb-12 md:pb-24">
                <div className="border-b border-white/10 md:col-span-7 md:border-b-0 ">
                    <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.24em] text-white/55" data-split>
                        [2. Quem somos]
                    </p>
                    <h2 className="text-[clamp(2.2rem,5vw,4.8rem)] leading-[1.02] tracking-[-0.03em] text-white uppercase">
                        <span className="block font-thin" data-split>
                            TECNOLOGIA DE VERDADE
                        </span>
                        <span className="block font-thin" data-split>
                            FEITA POR QUEM
                        </span>
                        <span className="block font-semibold text-primary" data-split>
                            VIVE O MERCADO.
                        </span>
                    </h2>
                </div>

                <div className="md:col-span-5">
                    <p className="text-[clamp(1rem,1.2vw,1.2rem)] font-thin leading-relaxed tracking-[0.03em] text-white/74 uppercase pt-4" data-split>
                        Nascemos no <span className="font-semibold text-primary">Inteli</span>, uma faculdade de ponta com metodologia inovadora. Nossos membros desenvolvem
                        4 projetos reais por ano para grandes empresas, usando tecnologias de ponta.
                    </p>
                    <div className="space-y-4 border-t border-white/10 pt-12 text-xs uppercase tracking-[0.15em] text-primary font-bold">
                        {ejHighlights.map((item) => (
                            <div key={item.index} className="flex items-center justify-between">
                                <span className="inline-flex items-center gap-2">
                                    <span className="h-3.5 w-3.5 shrink-0 text-primary">{item.icon}</span>
                                    <span data-split>{item.label}</span>
                                </span>
                                <span className="hidden md:block" data-split>
                                    {item.index}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="glass-panel grid w-full grid-cols-1 border-x border-y border-white/10 md:grid-cols-2">
                <div className="border-b border-white/10 p-8 md:border-b-0  md:p-12">
                    <h3 className="text-[clamp(2.1rem,4vw,4rem)] leading-[0.95] tracking-[-0.03em] uppercase text-white">
                        <span className="block font-thin" data-split>
                            DA IDEIA
                        </span>
                        <span className="block font-semibold text-primary lg:pl-12" data-split>
                            A ESCALA.
                        </span>
                    </h3>
                </div>
                <div className="p-8 md:flex md:items-end md:justify-end md:p-12">
                    <h3 className="text-[clamp(2.1rem,4vw,4rem)] leading-[0.95] tracking-[-0.03em] uppercase text-white/35 md:text-right">
                        <span className="block font-thin" data-split>
                            DO CAOS
                        </span>
                        <span className="block font-semibold text-white" data-split>
                            A CLAREZA.
                        </span>
                    </h3>
                </div>
            </div>

            <div className="glass-panel grid w-full grid-cols-1 divide-y divide-white/10 border-x border-b border-white/10 md:grid-cols-4 md:divide-x md:divide-y-0">
                <div className="flex h-full flex-col justify-between p-8 md:p-10">
                    <p className="text-[14px] uppercase tracking-[0.2em] text-primary font-extrabold" data-split>
                        Sobre a EJ
                    </p>
                    <p className="mt-5 text-lg uppercase leading-snug text-white/78" data-split>
                        Agilidade de startup com responsabilidade de entrega em produção.
                    </p>
                </div>
                <div className="group p-8 transition-colors hover:bg-white/4 md:p-10 flex flex-col items-start justify-end">
                    <p className="text-[clamp(2.2rem,4vw,4rem)] font-semibold tracking-[-0.03em] text-white transition-colors group-hover:text-primary" data-split>
                        30+
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/55" data-split>
                        Negocios impactados
                    </p>
                </div>
                <div className="group p-8 transition-colors hover:bg-white/4 md:p-10 flex flex-col items-start justify-end">
                    <p className="text-[clamp(2.2rem,4vw,4rem)] font-semibold tracking-[-0.03em] text-white transition-colors group-hover:text-primary" data-split>
                        60+
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/55" data-split>
                        Universitarios capacitados
                    </p>
                </div>
                <div className="group p-8 transition-colors hover:bg-white/4 md:p-10 flex flex-col items-start justify-end">
                    <p className="text-[clamp(2.2rem,4vw,4rem)] font-semibold tracking-[-0.03em] text-white transition-colors group-hover:text-primary" data-split>
                        R$110K+
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/55" data-split>
                        Impacto economico
                    </p>
                </div>
            </div>

            <div className="glass-panel border-x border-b border-white/10">
                <div className="flex items-center justify-between border-b border-white/10 px-8 py-4 md:px-10">
                    <p className="text-sm md:text-2xl uppercase tracking-[0.2em] text-primary" data-split>
                        Experiencia real com o mercado
                    </p>
                    <a
                        href="#portfolio"
                        className="text-[12px] font-bold uppercase tracking-[0.2em] text-primary transition-colors hover:text-white hidden md:block"
                        data-split
                    >
                        Ver portfolio
                    </a>
                </div>
                <div
                    className="relative overflow-hidden border-t border-white/10 py-12"
                    style={{
                        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                        WebkitMaskImage:
                            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                    }}
                >
                    <ViewportMarquee
                        className="px-8"
                        trackClassName="items-center"
                        groupClassName="items-center gap-12 md:gap-24 pr-14"
                        durationSeconds={34}
                    >
                        {trustedCompanies.map((company) => (
                            <span
                                key={company}
                                className="md:text-4xl font-semibold uppercase tracking-[0.02em] text-white/48 transition-colors hover:text-primary"
                                data-split
                            >
                                {company}
                            </span>
                        ))}
                    </ViewportMarquee>
                </div>
            </div>
        </section>
    );
}
