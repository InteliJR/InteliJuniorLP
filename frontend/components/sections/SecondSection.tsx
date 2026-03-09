
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

    return (
        <section
            id="quem-somos"
            data-graph-profile
            data-graph-line="0.16"
            data-graph-node="0.24"
            className="arch-shell relative w-full px-6 py-24 text-white md:px-12 lg:pl-32 lg:pr-16"
        >
            <div className="glass-panel grid w-full grid-cols-1 border border-white/10 md:grid-cols-12">
                <div className="border-b border-white/10 p-8 md:col-span-7 md:border-b-0 md:border-r md:p-12 lg:p-14">
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

                <div className="p-8 md:col-span-5 md:p-12 lg:p-14">
                    <p className="text-[clamp(1rem,1.2vw,1.2rem)] font-thin leading-relaxed tracking-[0.03em] text-white/74 uppercase" data-split>
                        Nascemos no <span className="font-semibold text-primary">Inteli</span>, uma faculdade de ponta com metodologia inovadora. Nossos membros desenvolvem
                        4 projetos reais por ano para grandes empresas, usando tecnologias de ponta.
                    </p>
                    <div className="mt-8 space-y-4 border-t border-white/10 pt-7 text-xs uppercase tracking-[0.15em] text-primary font-bold">
                        <div className="flex items-center justify-between">
                            <span data-split>4 projetos reais por ano</span>
                            <span className="hidden md:block" data-split>01</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span data-split>Blockchain a IoT</span>
                            <span className="hidden md:block" data-split>02</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span data-split>Implantacao em produção</span>
                            <span className="hidden md:block" data-split>03</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="glass-panel grid w-full grid-cols-1 border-x border-b border-white/10 md:grid-cols-2">
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
                    <p className="text-[12px] uppercase tracking-[0.2em] text-primary font-extrabold" data-split>
                        Sobre a EJ
                    </p>
                    <p className="mt-5 text-lg leading-snug text-white/78" data-split>
                        Agilidade de startup com responsabilidade de entrega em produção.
                    </p>
                </div>
                <div className="group p-8 transition-colors hover:bg-white/4 md:p-10">
                    <p className="text-[clamp(2.2rem,4vw,4rem)] font-semibold tracking-[-0.03em] text-white transition-colors group-hover:text-primary" data-split>
                        30+
                    </p>
                    <p className="mt-3 text-xs uppercase tracking-[0.18em] text-white/55" data-split>
                        Negocios impactados
                    </p>
                </div>
                <div className="group p-8 transition-colors hover:bg-white/4 md:p-10">
                    <p className="text-[clamp(2.2rem,4vw,4rem)] font-semibold tracking-[-0.03em] text-white transition-colors group-hover:text-primary" data-split>
                        60+
                    </p>
                    <p className="mt-3 text-xs uppercase tracking-[0.18em] text-white/55" data-split>
                        Universitarios capacitados
                    </p>
                </div>
                <div className="group p-8 transition-colors hover:bg-white/4 md:p-10">
                    <p className="text-[clamp(2.2rem,4vw,4rem)] font-semibold tracking-[-0.03em] text-white transition-colors group-hover:text-primary" data-split>
                        R$ 110K+
                    </p>
                    <p className="mt-3 text-xs uppercase tracking-[0.18em] text-white/55" data-split>
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
