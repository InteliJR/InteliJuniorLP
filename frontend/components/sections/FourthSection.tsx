export default function FourthSection() {
    return (
        <section
            id="servicos"
            className="arch-shell w-full px-6 py-28 text-white md:px-12 lg:pl-32 lg:pr-16"
        >
            <div className="w-full">
                <div className="mb-4 grid grid-cols-1 md:items-start gap-8 md:grid-cols-2">
                    <div className="">
                        <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/45" data-split>
                            [4. nossos_servicos]
                        </p>
                        <h2 className="text-5xl lg:flex lg:gap-8 tracking-[-0.03em] uppercase md:text-6xl lg:text-7xl">
                            <span className="block font-thin text-center md:text-left" data-split>
                                NOSSOS
                            </span>
                            <span className="block font-semibold text-primary text-center md:text-left" data-split>
                                SERVIÇOS
                            </span>
                        </h2>
                    </div>
                    <p
                        className="text-center md:text-right text-[clamp(1.05rem,1.35vw,1.35rem)] font-thin leading-relaxed tracking-[0.03em] text-white/78 uppercase"
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
                            <div className="absolute left-12 top-14 flex items-center gap-2 pt-4">
                                <span className="h-1.5 w-1.5 rounded-full bg-(--brand-primary) shadow-[0_0_12px_rgba(var(--brand-primary-rgb),0.9)]" />
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
                            <p className="mt-3 text-base leading-relaxed text-white/74" data-split>
                                Diagnostico de dados, ETL e dashboards para transformar sinais operacionais em
                                decisoes executaveis.
                            </p>
                            <div className="mt-5 grid grid-cols-1 gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/58 sm:grid-cols-2">
                                <span data-split>Data mapping</span>
                                <span data-split>ETL pipelines</span>
                                <span data-split>Dashboards</span>
                                <span data-split>Alertas de negocio</span>
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

                        <p className="mb-6 text-base leading-relaxed text-white/50" data-split>
                            Definimos posicionamento, sistema visual e linguagem de marca com iteracoes rapidas e
                            validacao continua.
                        </p>

                        <div className="mt-auto space-y-4">
                            {[
                                ["Briefing + Imersao", "MAPPING"],
                                ["Prototipo de identidade", "DESIGN"],
                                ["Guia de aplicacao", "HANDOFF"],
                            ].map(([label, status], index) => (
                                <div key={label} className="group/row">
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-primary" data-split>
                                            {label}
                                        </span>
                                        <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-white/42">
                                            {status}
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
                        <p className="mt-3 max-w-sm text-base leading-relaxed text-white/50" data-split>
                            Estrutura de conversao, SEO tecnico e performance para campanhas com leitura clara e CTA
                            forte.
                        </p>

                        <div className="absolute inset-x-0 bottom-0 top-24 grid grid-cols-4 grid-rows-4 divide-x divide-y divide-white/10 border-t border-white/10">
                            {Array.from({ length: 16 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="relative"
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
                    <article className="relative overflow-hidden border-b border-white/10 p-8 md:col-span-8 md:border-b-0 md:border-r md:p-10" style={{ minHeight: "23rem" }}>
                        <p className="arch-kicker mb-2" data-split>
                            04
                        </p>
                        <h3 className="text-3xl font-thin uppercase tracking-tight" data-split>
                            Aplicações Completas
                        </h3>
                        <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/50" data-split>
                            Frontend, backend, dados e deploy coordenados no mesmo fluxo. Da arquitetura ao go-live,
                            tudo com padrao de produção.
                        </p>

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

                        <div className="relative z-10 mt-8 grid grid-cols-1 gap-3 text-[12px] font-bold uppercase tracking-[0.14em] text-primary sm:grid-cols-2 lg:grid-cols-4">
                            <span data-split>Arquitetura tecnica</span>
                            <span data-split>APIs e integracoes</span>
                            <span data-split>Banco de dados</span>
                            <span data-split>Deploy e observabilidade</span>
                        </div>
                    </article>

                    <aside className="flex flex-col justify-between p-8 md:col-span-4 md:p-10" style={{ minHeight: "23rem" }}>
                        <div>
                            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary" data-split>
                                Como trabalhamos
                            </p>
                            <h4 className="mt-3 text-[clamp(1.85rem,3.1vw,3rem)] leading-[1.05] uppercase text-white font-thin" data-split>
                                Blocos que se <span className="font-semibold">conectam</span>
                            </h4>
                            <p className="mt-4 text-base leading-relaxed text-white/50" data-split>
                                Descoberta, execucao e validacao em ciclos curtos, com checkpoints claros e
                                visibilidade do inicio ao fim.
                            </p>
                        </div>

                        <a
                            href="#contato"
                            className="group inline-flex w-full items-center justify-between border border-white/20 px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-(--brand-primary) hover:bg-(--brand-primary) hover:text-(--surface-dark-4)"
                            data-split
                        >
                            Solicitar orcamento
                            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                        </a>
                    </aside>
                </div>
            </div>
        </section>
    );
}
