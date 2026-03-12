export default function FourthSection() {
    const dataFlowItems = [
        {
            label: "Data mapping",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <rect x="4" y="4" width="6" height="6" rx="1" />
                    <rect x="14" y="14" width="6" height="6" rx="1" />
                    <path d="M10 7h2a4 4 0 0 1 4 4v3" />
                </svg>
            ),
        },
        {
            label: "ETL pipelines",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M4 6h10" />
                    <path d="M4 12h14" />
                    <path d="M4 18h8" />
                    <path d="m14 4 4 2-4 2" />
                    <path d="m18 10 4 2-4 2" />
                    <path d="m12 16 4 2-4 2" />
                </svg>
            ),
        },
        {
            label: "Dashboards",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M4 19h16" />
                    <path d="M7 16v-5" />
                    <path d="M12 16V8" />
                    <path d="M17 16v-3" />
                </svg>
            ),
        },
        {
            label: "Alertas de negocio",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M12 4a5 5 0 0 0-5 5v3.5L5 15v1h14v-1l-2-2.5V9a5 5 0 0 0-5-5Z" />
                    <path d="M10 19a2 2 0 0 0 4 0" />
                </svg>
            ),
        },
    ];

    const visualIdentitySteps = [
        {
            label: "Briefing + Imersao",
            status: "MAPPING",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M4 5h16" />
                    <path d="M4 12h10" />
                    <path d="M4 19h7" />
                </svg>
            ),
        },
        {
            label: "Prototipo de identidade",
            status: "DESIGN",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M4 18 15.5 6.5a1.5 1.5 0 0 1 2.1 0l.9.9a1.5 1.5 0 0 1 0 2.1L7 21H4v-3Z" />
                </svg>
            ),
        },
        {
            label: "Guia de aplicacao",
            status: "HANDOFF",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <rect x="5" y="4" width="14" height="16" rx="2" />
                    <path d="M8 9h8" />
                    <path d="M8 13h8" />
                </svg>
            ),
        },
    ];

    const fullStackServices = [
        {
            label: "Arquitetura tecnica",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" aria-hidden="true">
                    <path d="M4 19h16" />
                    <path d="M6 19V9l6-4 6 4v10" />
                    <path d="M9 19v-5h6v5" />
                </svg>
            ),
        },
        {
            label: "APIs e integracoes",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" aria-hidden="true">
                    <circle cx="6" cy="12" r="2" />
                    <circle cx="18" cy="7" r="2" />
                    <circle cx="18" cy="17" r="2" />
                    <path d="M8 12h6" />
                    <path d="M16.3 8.5 12.8 11" />
                    <path d="M16.3 15.5 12.8 13" />
                </svg>
            ),
        },
        {
            label: "Banco de dados",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" aria-hidden="true">
                    <ellipse cx="12" cy="6" rx="6" ry="2.5" />
                    <path d="M6 6v6c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V6" />
                    <path d="M6 12v6c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-6" />
                </svg>
            ),
        },
        {
            label: "Deploy e observabilidade",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" aria-hidden="true">
                    <path d="M4 18h16" />
                    <path d="M7 18v-4" />
                    <path d="M12 18v-8" />
                    <path d="M17 18v-11" />
                    <path d="M7 8.5 12 4l5 3.5" />
                </svg>
            ),
        },
    ];

    return (
        <section
            id="servicos"
            className="arch-shell w-full px-6 py-28 text-white md:px-12 lg:pl-32 lg:pr-16"
        >
            <div className="w-full">
                <div className="mb-4 grid grid-cols-1 md:items-center gap-8 md:grid-cols-2">
                    <div className="">
                        <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/45" data-split>
                            [4. nossos_servicos]
                        </p>
                        <h2 className="text-5xl 2xl:flex tracking-[-0.03em] uppercase md:text-6xl lg:text-7xl">
                            <span className="block font-thin text-center md:text-left" data-split>
                                NOSSOS
                            </span>
                            <span className="block font-semibold text-primary text-center md:text-left" data-split>
                                SERVIÇOS
                            </span>
                        </h2>
                    </div>
                    <p
                        className="text-center md:text-right text-[clamp(1rem,1.25vw,1.25rem)] font-thin leading-relaxed tracking-[0.03em] text-white/78 uppercase"
                        data-split
                    >
                        Soluções conectadas de ponta a ponta. Cada bloco encaixa no seguinte, da estrategia
                        ao deploy, sem perder ritmo de entrega.
                    </p>
                </div>

                <div className="glass-panel grid w-full grid-cols-1 border border-white/10 md:grid-cols-12">
                    <article className="group relative overflow-hidden border-b border-white/10 p-8 md:col-span-4 md:border-b-0 md:border-r md:p-10" style={{ minHeight: "28rem" }}>
                        <div className="pointer-events-none absolute inset-0 -translate-y-12 opacity-85">
                            <div className="absolute left-1/2 top-1/2 h-65 w-65 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
                            <div className="absolute left-1/2 top-1/2 h-47.5 w-47.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
                            <div className="absolute left-1/2 top-1/2 h-30 w-30 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
                            <div className="absolute left-1/2 top-1/2 h-65 w-65 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg_235deg,rgba(var(--brand-primary-rgb),0.22)_360deg)] animate-[spin_5s_linear_infinite]" />
                            <div className="absolute left-4 top-12 flex items-center gap-2 pt-4">
                                <span className="size-1.5 rounded-full bg-(--brand-primary) shadow-[0_0_12px_rgba(var(--brand-primary-rgb),0.9)]" />
                                <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-(--brand-soft-accent)">
                                    Pipeline ativo
                                </span>
                            </div>
                        </div>

                        <div className="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-(--surface-dark-1) via-(--surface-dark-1)/85 to-transparent px-8 pb-8 pt-20">
                            <p className="arch-kicker mb-2" data-split>
                                01
                            </p>
                            <h3 className="text-2xl font-thin uppercase tracking-tight" data-split>
                                Analise de Dados
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-white/60 uppercase" data-split>
                                Diagnostico de dados, ETL e dashboards para transformar sinais operacionais em
                                decições executaveis.
                            </p>
                            <div className="mt-5 grid grid-cols-1 gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-primary sm:grid-cols-2">
                                {dataFlowItems.map((item) => (
                                    <span key={item.label} className="inline-flex items-center gap-2">
                                        <span className="h-3.5 w-3.5 shrink-0 text-primary">{item.icon}</span>
                                        <span data-split>{item.label}</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </article>

                    <article className="relative flex flex-col border-b border-white/10 p-8 md:col-span-4 md:border-b-0 md:border-r md:p-10" style={{ minHeight: "28rem" }}>
                        <div className="mb-5 flex items-start justify-between">
                            <div>
                                <p className="arch-kicker mb-2" data-split>
                                    02
                                </p>
                                <h3 className="text-2xl font-thin uppercase tracking-tight" data-split>
                                    Identidade Visual
                                </h3>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--brand-primary)/80" />
                                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-(--brand-primary)" />
                                </span>
                                <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-(--brand-soft-accent)">
                                    live
                                </span>
                            </div>
                        </div>

                        <p className="mb-6 text-sm leading-relaxed text-white/60 uppercase" data-split>
                            Definimos posicionamento, sistema visual e linguagem de marca com iteracoes rapidas e
                            validacao continua.
                        </p>

                        <div className="mt-auto space-y-4">
                            {visualIdentitySteps.map((step, index) => (
                                <div key={step.label} className="group/row">
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-primary">
                                            <span className="h-3.5 w-3.5 shrink-0 text-primary">{step.icon}</span>
                                            <span data-split>{step.label}</span>
                                        </span>
                                        <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-white/42 hidden md:block">
                                            {step.status}
                                        </span>
                                    </div>
                                    <div className="h-0.5 overflow-hidden rounded-full bg-white/10">
                                        <div
                                            className="h-full origin-left bg-(--brand-primary)"
                                            style={{
                                                animation: `svc-progress 2.6s cubic-bezier(0.4,0,0.2,1) infinite`,
                                                animationDelay: `${index * 0.35}s`,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="relative overflow-hidden p-8 md:col-span-4 md:p-10" style={{ minHeight: "28rem" }}>
                        <p className="arch-kicker mb-2" data-split>
                            03
                        </p>
                        <h3 className="text-2xl font-thin uppercase tracking-tight" data-split>
                            Landing Pages
                        </h3>
                        <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60 uppercase" data-split>
                            Estrutura de conversão, SEO tecnico e performance para campanhas com leitura clara e CTA
                            forte.
                        </p>

                        <div className="absolute inset-x-0 bottom-0 top-24 grid grid-cols-4 grid-rows-4 divide-x divide-y divide-white/10 border-t border-white/10">
                            {Array.from({ length: 16 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="relative -z-5"
                                    style={{
                                        animation: "svc-cell-flash 3.6s ease-in-out infinite",
                                        animationDelay: `${index * 0.14}s`,
                                    }}
                                >
                                    {(index === 6 || index === 10 || index === 13) && (
                                        <div className="absolute inset-0 m-auto flex h-8 w-8 items-center justify-center rounded-full border border-(--brand-primary)/35 bg-(--surface-dark-1)/90 text-(--brand-soft-accent)">
                                            <span className="text-[12px]">+</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </article>
                </div>

                <div className="glass-panel grid w-full grid-cols-1 border-x border-b border-white/10 md:grid-cols-12">
                    <article className="relative overflow-hidden border-b border-white/10 p-8 md:col-span-8 md:border-b-0 md:border-r md:p-10 flex flex-col justify-between" style={{ minHeight: "23rem" }}>
                        <p className="arch-kicker mb-2" data-split>
                            04
                        </p>
                        <div className="">
                            <h3 className="text-3xl font-thin uppercase tracking-tight" data-split>
                                Aplicações Completas
                            </h3>
                            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60 uppercase" data-split>
                                Frontend, backend, dados e deploy coordenados no mesmo fluxo. Da arquitetura ao go-live,
                                tudo com padrao de produção.
                            </p>
                        </div>
                        <div className="pointer-events-none absolute bottom-0 right-8 top-20 flex items-end gap-1 opacity-80">
                            {[0.3, 0.48, 0.65, 0.82].map((h, index) => (
                                <div
                                    key={h}
                                    className={`relative w-16 border border-dashed ${index === 3 ? "border-primary/50" : "border-white/20"}`}
                                    style={{ height: `${Math.round(h * 100)}%` }}
                                >
                                    <div
                                        className={`absolute bottom-0 left-0 w-full origin-bottom ${index === 3 ? "bg-primary/45" : "bg-primary/35"}`}
                                        style={{
                                            height: "100%",
                                            animation: "svc-bar-rise 3.8s ease-in-out infinite",
                                            animationDelay: `${index * 0.18}s`,
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="relative z-10 mt-8 grid grid-cols-1 gap-6 text-[12px] font-bold uppercase tracking-[0.14em] text-primary sm:grid-cols-2 lg:grid-cols-4">
                            {fullStackServices.map((service) => (
                                <div key={service.label} className="flex flex-col items-center justify-center gap-2">
                                    <span className="inline-flex size-10 md:size-14 items-center justify-center border border-primary/35 bg-primary/10 text-primary">
                                        <span className="size-6 md:size-10">{service.icon}</span>
                                    </span>
                                    <span data-split>{service.label}</span>
                                </div>
                            ))}
                        </div>
                    </article>

                    <aside className="flex flex-col justify-between p-8 md:col-span-4 md:p-10" style={{ minHeight: "23rem" }}>
                        <div>
                            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary" data-split>
                                Como trabalhamos
                            </p>
                            <h4 className="mt-3 text-[clamp(1.80rem,3vw,3rem)] leading-[1.05] uppercase text-white font-thin" data-split>
                                Blocos que se <span className="font-semibold">conectam</span>
                            </h4>
                            <p className="mt-4 text-sm leading-relaxed text-white/60 uppercase" data-split>
                                Descoberta, execucao e validacao em ciclos curtos, com checkpoints claros e
                                visibilidade do inicio ao fim.
                            </p>
                        </div>

                        <a
                            href="#contato"
                            className="mt-4 group inline-flex w-full items-center justify-center border border-white/20 px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-(--brand-primary) hover:bg-(--brand-primary) hover:text-(--surface-dark-4)"
                            data-split
                        >
                            Solicitar orcamento
                            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </a>
                    </aside>
                </div>
            </div>
        </section>
    );
}
