import Image from "next/image";

import ViewportMarquee from "@/components/ui/viewport-marquee";

const members = [
    {
        name: "Clara Mohammad",
        role: "Ex-Diretora Admin-Fin",
        profile: "Engenharia de Software",
        company: "AB InBev",
        companyRole: "Estagiária",
        quote:
            "Gestão financeira e liderança de verdade enquanto estudante. Essa vivência brilhou em todos os processos seletivos.",
        image: "/images/members/clara_mohammad.webp",
        companyLogo: "/images/company_logos/Anheuser-Busch-InBev-Logo.png",
    },
    {
        name: "Rodrigo Sales",
        role: "Ex-Desenvolvedor Backend",
        profile: "Engenharia de Computação",
        company: "BCGX",
        companyRole: "Estagiário",
        quote:
            "A EJ me deu o relacionamento direto com cliente que faltava. Trabalhar com um time jovem e projetos reais foi o que me levou ao estágio em uma multinacional.",
        image: "/images/members/rodrigo_sales.webp",
        companyLogo: "/images/company_logos/BCG_X.png",
    },
    {
        name: "Matheus Mendes",
        role: "Ex-Diretor de RI",
        profile: "Sistemas de Informação",
        company: "Uber",
        companyRole: "Estagiário",
        quote:
            "Estratégia, liderança e entrega. A EJ foi minha escola prática e abriu a porta para a Uber.",
        image: "/images/members/matheus_mendes.webp",
        companyLogo: "/images/company_logos/uber.png",
    },
    {
        name: "Ólin Costa",
        role: "Ex-Desenvolvedor Frontend",
        profile: "Engenharia de Software",
        company: "BCGX",
        companyRole: "Estagiário",
        quote:
            "Ganhei confiança entregando soluções prontas para produção. Enfrentei desafios reais, com responsabilidade e foco em resultado.",
        image: "/images/members/olin_costa.webp",
        companyLogo: "/images/company_logos/BCG_X.png",
    },
    {
        name: "Mirella Borim",
        role: "Presidente",
        profile: "Sistemas de Informação",
        company: "Inteli Júnior",
        companyRole: "Gestão Estratégica",
        quote:
            "Visão estratégica, sustentabilidade e cultura viva. Liderar a EJ foi o salto que me preparou para o mercado sênior.",
        image: "/images/members/mirella_borim.webp",
    },
    {
        name: "Igor Sampaio",
        role: "Diretor",
        profile: "Sistemas de Informação",
        company: "Inteli Júnior",
        companyRole: "Pessoas & Cultura",
        quote:
            "Seleção e desenvolvimento de pessoas. Processos, cultura e comunicação: aprendizados lapidados com o time.",
        image: "/images/members/igor_sampaio.webp",
    },
    {
        name: "Nataly Cunha",
        role: "Diretora",
        profile: "Engenharia de Software",
        company: "Inteli Júnior",
        companyRole: "Administrativo e Financeiro",
        quote:
            "Saúde financeira, jurídica e operacional na prática. Cada decisão é treino para o mercado real.",
        image: "/images/members/nataly_cunha.webp",
    },
    {
        name: "Rodrigo Ferraz",
        role: "Assessor",
        profile: "ADM-Tech",
        company: "Inteli Júnior",
        companyRole: "Vendas",
        quote:
            "Laboratório de negociação e autoconfiança. Cresci com clientes reais e metas claras.",
        image: "/images/members/rodrigo_ferraz.webp",
    },
];

export default function IndustriesSection() {
    return (
        <section
            id="membros"
            data-graph-profile
            data-graph-line="0.14"
            data-graph-node="0.2"
            className="arch-shell w-full bg-(--surface-dark-4) px-6 py-20 text-white md:px-12 lg:pl-32 lg:pr-16"
        >
            <div className="mb-10 flex w-full items-end justify-between gap-6 border-x border-white/10 px-6 pb-6 md:px-10">
                <div>
                    <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/45" data-split>
                        [6. nossos_membros]
                    </p>
                    <h3 className="text-3xl font-thin uppercase tracking-[0.04em] text-white md:text-5xl">
                        PESSOAS QUE FIZERAM E
                        <span className="pl-4 font-semibold text-primary" data-split>
                            FAZEM A DIFERENÇA
                        </span>
                    </h3>
                </div>
                <p className="hidden max-w-md text-sm uppercase tracking-[0.16em] text-white/55 lg:block" data-split>
                    Ex-membros em grandes empresas e membros atuais liderando projetos reais.
                </p>
            </div>

            <div
                className="relative overflow-hidden border border-white/10"
                style={{
                    maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                    WebkitMaskImage:
                        "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                }}
            >
                <ViewportMarquee
                    className="px-5 py-6"
                    trackClassName="items-stretch"
                    groupClassName="items-stretch gap-5 pr-5"
                    durationSeconds={58}
                >
                    {members.map((member) => (
                        <article
                            key={member.name}
                            className="group glass-panel flex h-135 w-[82vw] shrink-0 flex-col border border-white/12 bg-(--surface-dark-3) sm:w-[64vw] lg:w-85"
                        >
                            <div className="relative h-[58%] overflow-hidden border-b border-white/10">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    sizes="(max-width: 640px) 82vw, (max-width: 1024px) 64vw, 340px"
                                    className="h-full w-full object-cover saturate-80 transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
                                <div className="absolute right-0 bottom-0 left-0 border-t border-white/15 bg-black/45 px-4 py-3 backdrop-blur-[1px]">
                                    <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/75" data-split>
                                        {member.role}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-1 flex-col justify-between p-5">
                                <div>
                                    <h4 className="text-3xl font-semibold tracking-[-0.02em] text-white" data-split>
                                        {member.name}
                                    </h4>
                                    <p className="mt-2 text-[12px] uppercase tracking-[0.15em] text-white/45" data-split>
                                        {member.profile}
                                    </p>
                                    <p className="mt-4 text-[13px] leading-relaxed text-white/72" data-split>
                                        {member.quote}
                                    </p>
                                </div>

                                <div className="mt-5 border-t border-white/10 pt-4">
                                    <div className="flex items-center gap-3 pb-2">
                                        {member.companyLogo ? (
                                            <Image
                                                src={member.companyLogo}
                                                alt={`Logo ${member.company}`}
                                                width={84}
                                                height={20}
                                                className="h-4.5 w-auto object-contain"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white" data-split>
                                                {member.company}
                                            </p>
                                        )}
                                    </div>
                                    <p className="text-[12px] uppercase tracking-[0.16em] font-bold text-primary" data-split>
                                        {member.companyRole}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </ViewportMarquee>
            </div>
        </section>
    );
}
