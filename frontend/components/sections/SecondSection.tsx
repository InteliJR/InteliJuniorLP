'use client';
import React from 'react';
import Lenis from '@studio-freight/lenis';
import { motion } from 'framer-motion';
import { ZoomParallax } from '@/components/ZoomParallax';
import { TextScramble } from '../ui/textScramble';
import { Cpu, Users, ArrowUpRight, Trophy, Award } from 'lucide-react';

const companies = [
    { name: "BTG Pactual", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Btg-logo-blue.svg", className: "h-8" },
    { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg", className: "h-8" },
    { name: "BCG", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Boston_Consulting_Group_2020_logo.svg", className: "h-6" },
    { name: "Dell", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Dell_logo.svg", className: "h-10" },
    { name: "Banco Pan", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Bancopanlogo.png", className: "h-10" },
    { name: "CPTM", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fb/CPTM_%28Logo%29.svg", className: "h-8" },
    { name: "Uber", logo: "https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg", className: "h-8" },
    { name: "Ambev", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Ambev_logo.svg", className: "h-12" },
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", className: "h-8" },
    { name: "Sírio Libanês", logo: "https://placehold.co/400x200/transparent/ffffff?text=S%C3%ADrio+Liban%C3%AAs", className: "h-14" },
    { name: "Bank of America", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Bank_of_America_logo.svg", className: "h-10" }
];

export default function DefaultDemo() {
    React.useEffect(() => {
        const lenis = new Lenis();

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }, []);

    const titleRef = React.useRef<HTMLDivElement | null>(null);
    const carouselRef = React.useRef<HTMLDivElement | null>(null);
    const [hasTriggered, setHasTriggered] = React.useState(false);
    const [playId, setPlayId] = React.useState(0);
    const [isCarouselVisible, setIsCarouselVisible] = React.useState(false);

    React.useEffect(() => {
        if (!titleRef.current || hasTriggered) return;
        const el = titleRef.current;

        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setHasTriggered(true);
                        setPlayId((prev) => prev + 1);
                    }
                });
            },
            { threshold: 0.3 }
        );

        obs.observe(el);
        return () => obs.disconnect();
    }, [hasTriggered]);

    // Intersection Observer para o carrossel
    React.useEffect(() => {
        if (!carouselRef.current) return;
        const el = carouselRef.current;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsCarouselVisible(entry.isIntersecting);
            },
            { threshold: 0 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const images = [
        {
            src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
            alt: 'Modern architecture building',
            date: '2025',
            description: 'Expansão Nacional'
        },
        {
            src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
            alt: 'Urban cityscape at sunset',
            date: '2024',
            description: 'Cluster 3 Conquistado'
        },
        {
            src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
            alt: 'Abstract geometric pattern',
            date: '2023',
            description: 'Crescimento Acelerado'
        },
        {
            src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
            alt: 'Mountain landscape',
            date: '2022',
            description: 'Primeiros Projetos'
        },
        {
            src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
            alt: 'Minimalist design elements',
            date: '2021',
            description: 'Fundação da EJ'
        },
        {
            src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
            alt: 'Ocean waves and beach',
            date: '2020',
            description: 'Planejamento'
        },
        {
            src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
            alt: 'Forest trees and sunlight',
            date: '2019',
            description: 'Ideação'
        },
    ];
    return (
        <main className="min-h-screen w-full">
            <div
                ref={titleRef}
                className="relative flex h-[50vh] items-center justify-center -mb-10"
            >
                <div className="h-[0.1px] w-1/9 bg-primary"></div>
                <div className="flex gap-18 whitespace-nowrap w-full items-center justify-center">
                    <div className="flex flex-col gap-1 items-start relative">
                        <TextScramble
                            as="h2"
                            className="text-4xl md:text-5xl font-light uppercase leading-tight"
                            duration={1}
                            speed={0.03}
                            trigger={hasTriggered}
                            playId={playId}
                        >
                            {'A primeira Empresa\nJunior a conquistar'}
                        </TextScramble>
                        <TextScramble
                            as="h2"
                            className="text-4xl md:text-5xl uppercase leading-tight text-primary font-semibold"
                            duration={1}
                            speed={0.03}
                            trigger={hasTriggered}
                            playId={playId}
                        >
                            {'3 clusters em 3 anos.'}
                        </TextScramble>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={hasTriggered ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="absolute -right-4 -top-2 flex items-center justify-center mt-2"
                        >
                            <div className="absolute inset-0 bg-primary/80 blur-2xl rounded-full scale-150" />
                            <Trophy className="size-12 text-primary relative z-10" strokeWidth={1.5} />
                        </motion.div>
                    </div>
                    <p className='text-muted-foreground max-w-sm text-sm md:text-base whitespace-normal'>
                        Mais do que um troféu, esse marco representa a <span className='text-white/70 font-semibold'>velocidade da nossa evolução</span>. Em apenas 3 anos, atingimos níveis de maturidade que levam tempo para serem construídos, provando que <span className='text-white/70 font-semibold'>unimos a agilidade de uma startup com a responsabilidade de uma grande empresa</span>.
                    </p>
                </div>
                <div className="h-[0.1px] w-1/9 bg-primary"></div>
            </div>
            <ZoomParallax images={images} />
            <section id="quem-somos" className="relative w-full py-32 overflow-hidden">
                <div className="mx-auto space-y-24 flex flex-col w-full items-center justify-center">
                    <div className="w-full flex flex-col md:flex-row justify-start items-center gap-18">
                        <div className="h-[0.1px] w-1/9 bg-primary"></div>
                        <div className="space-y-4 w-full">
                            <TextScramble
                                as="span"
                                className="text-md font-extralight uppercase text-primary tracking-[0.2em] w-full"
                                duration={1}
                                speed={0.03}
                                trigger={true}
                            >
                                {"[2. Quem somos]"}
                            </TextScramble>
                            <h3 className="text-4xl md:text-5xl font-light uppercase leading-tight">
                                Elevando a <span className="text-primary font-semibold">maturidade</span><br />
                                através da tecnologia
                            </h3>
                        </div>
                        <p className="text-muted-foreground max-w-md text-sm md:text-base text-right md:text-left">
                            Nascemos no Inteli para transformar o ecossistema universitário e <span className='text-white/70 font-semibold'>gerar valor real para a sociedade</span>.
                        </p>
                        <div className="h-[0.1px] w-1/9 bg-primary"></div>
                    </div>
                    <div className="grid w-full grid-cols-1 md:grid-cols-3 md:grid-rows-[12rem_14rem_12rem] gap-4 px-24">
                        {/* Coluna 1, Row 1+2 - Card Grande (topo esquerdo) ~70% */}
                        <div className="md:col-start-1 md:row-start-1 md:row-span-2 relative group overflow-hidden rounded-xl border border-white/10 transition-all duration-300 hover:border-primary/60">
                            {/* Imagem de fundo */}
                            <div className="absolute inset-0">
                                <img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&crop=faces&auto=format&q=80"
                                    alt="Equipe colaborando"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {/* Overlay escuro */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
                            </div>
                            {/* Brilho interno (inset shadow) */}
                            <div className="absolute inset-0 rounded-xl shadow-[var(--shadow-inner-glass)] pointer-events-none z-20" />
                            {/* Conteúdo */}
                            <div className="relative z-10 h-full flex flex-col justify-between p-8">
                                <img src="/images/logo.svg" alt="Inteli Júnior" className="w-12 h-12 origin-left transform-gpu transition-all duration-300 ease-in-out group-hover:scale-75" />
                                <div>
                                    <h4 className="text-xl font-semibold mb-2 text-primary uppercase tracking-[0.2em]">Inteli Júnior</h4>
                                    <p className="text-white/70 text-sm leading-relaxed">
                                        Somos uma empresa júnior fundada e mantida pelos alunos do Instituto de Tecnologia e Liderança. Nosso propósito é elevar a maturidade dos universitários.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Coluna 1, Row 3 - Card Pequeno (embaixo esquerdo) ~30% */}
                        <div className="md:col-start-1 md:row-start-3 relative group overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-primary/30 hover:bg-white/10">
                            {/* Brilho interno (inset shadow) */}
                            <div className="absolute inset-0 rounded-xl backdrop-blur-[1.5px] shadow-[var(--shadow-inner-glass)] pointer-events-none" />
                            {/* Overlay no hover */}
                            <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-white/2 rounded-xl" />
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <Users className="w-10 h-10 text-primary origin-left transform-gpu transition-all duration-300 ease-in-out group-hover:scale-75" strokeWidth={1.5} />
                                <div>
                                    <h4 className="text-lg font-semibold mb-1 text-white">Vivência Ágil</h4>
                                    <p className="text-white/70 text-sm leading-relaxed">
                                        Sprints, dailies e retrospectivas. Operamos com os mesmos frameworks ágeis das big techs.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Coluna 2, Row 1+2+3 - Card Vertical (ocupa todas as rows) */}
                        <div className="md:col-start-2 md:row-start-1 md:row-span-3 relative group overflow-hidden rounded-xl border border-white/10 transition-all duration-300 hover:border-primary/30">
                            {/* Imagem de fundo */}
                            <div className="absolute inset-0">
                                <img
                                    src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=900&fit=crop&auto=format&q=80"
                                    alt="Código de qualidade"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {/* Overlay escuro */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/40" />
                            </div>
                            {/* Brilho interno (inset shadow) */}
                            <div className="absolute inset-0 rounded-xl shadow-[var(--shadow-inner-glass)] pointer-events-none z-20" />
                            {/* Conteúdo */}
                            <div className="relative z-10 h-full flex flex-col justify-between p-8">
                                <Award className="w-12 h-12 text-primary origin-left transform-gpu transition-all duration-300 ease-in-out group-hover:scale-75" strokeWidth={1.5} />
                                <div>
                                    <h4 className="text-xl font-semibold mb-2 text-white">Excelência no Trabalho</h4>
                                    <p className="text-white/70 text-sm leading-relaxed">
                                        Comprometimento com a qualidade em cada entrega. Nossos projetos seguem padrões rigorosos de desenvolvimento, garantindo soluções robustas e escaláveis que superam as expectativas.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Coluna 3, Row 1 - Card Pequeno (topo direito) ~30% */}
                        <div className="md:col-start-3 md:row-start-1 relative group overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-primary/30 hover:bg-white/10">
                            {/* Brilho interno (inset shadow) */}
                            <div className="absolute inset-0 rounded-xl backdrop-blur-[1.5px] shadow-[var(--shadow-inner-glass)] pointer-events-none" />
                            {/* Overlay no hover */}
                            <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-white/2 rounded-xl" />
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <Cpu className="w-10 h-10 text-primary origin-left transform-gpu transition-all duration-300 ease-in-out group-hover:scale-75" strokeWidth={1.5} />
                                <div>
                                    <h4 className="text-lg font-semibold mb-1 text-white">Metodologia & Ensino</h4>
                                    <p className="text-white/70 text-sm leading-relaxed">
                                        Code review, CI/CD e boas práticas. Padrão de engenharia das maiores empresas de tecnologia.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Coluna 3, Row 2+3 - Card Grande (embaixo direito) ~70% - CTA */}
                        <div className="md:col-start-3 md:row-start-2 md:row-span-2 relative group overflow-hidden rounded-xl border border-white/10 transition-all duration-300 hover:border-primary/50">
                            {/* Imagem de fundo */}
                            <div className="absolute inset-0">
                                <img
                                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&auto=format&q=80"
                                    alt="Inovação tecnológica"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {/* Overlay com tom primário */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-primary/20 to-black/40" />
                            </div>
                            {/* Brilho interno (inset shadow) */}
                            <div className="absolute inset-0 rounded-xl shadow-[var(--shadow-inner-primary)] pointer-events-none z-20" />
                            {/* Conteúdo */}
                            <div className="relative z-10 h-full flex flex-col justify-between p-8">
                                <ArrowUpRight className="w-12 h-12 text-primary origin-left transform-gpu transition-all duration-300 ease-in-out group-hover:scale-75" strokeWidth={1.5} />
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-xl font-semibold mb-2 text-white">Pronto para inovar?</h4>
                                        <p className="text-white/70 text-sm leading-relaxed">
                                            Conheça nossas soluções personalizadas.
                                        </p>
                                    </div>
                                    <a
                                        href="#contato"
                                        className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-[0.2em] rounded-full border-[0.5px] border-white/20 transition-all duration-300 shadow-[var(--shadow-inner-button)] hover:border-transparent hover:shadow-[var(--shadow-inner-button-hover)] group/btn"
                                    >
                                        Iniciar Projeto
                                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:scale-125" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-6 w-fit">
                        <TextScramble
                            as="span"
                            className="text-4xl text-white uppercase tracking-[0.2em]"
                            duration={1}
                            speed={0.03}
                            trigger={true}
                        >
                            {"EMPRESAS QUE CONFIAM EM NOSSSOS"}
                        </TextScramble>
                        <TextScramble
                            as="span"
                            className="text-4xl font-semibold text-primary uppercase tracking-[0.2em] border-b-2 border-primary"
                            duration={1}
                            speed={0.03}
                            trigger={true}
                        >
                            {"MEMBROS"}
                        </TextScramble>
                    </div>
                    <div
                        ref={carouselRef}
                        className="relative bg-white/5 supports-backdrop-filter:bg-white/3 border-y-[0.5px] border-white/10 shadow-2xl -mt-10 group/carousel w-full overflow-hidden"
                    >
                        {/* Brilho interno - efeito card dentro do card */}
                        <div className="absolute inset-0 backdrop-blur-[1.5px] shadow-[var(--shadow-inner-glass)] pointer-events-none" />
                        <div className="relative flex py-4">
                            <div
                                className={`flex shrink-0 items-center ${isCarouselVisible ? 'animate-marquee' : ''} group-hover/carousel:paused`}
                            >
                                {companies.map((company, index) => (
                                    <div key={`first-${index}`} className="mx-12 flex items-center justify-center group/item min-w-[100px]">
                                        <img
                                            src={company.logo}
                                            alt={company.name}
                                            className={`${company.className || 'h-12'} w-auto object-contain opacity-50 brightness-0 invert transition-all duration-300 group-hover/item:opacity-100 group-hover/item:brightness-100 group-hover/item:invert-0`}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div
                                className={`flex shrink-0 items-center ${isCarouselVisible ? 'animate-marquee' : ''} group-hover/carousel:paused`}
                            >
                                {companies.map((company, index) => (
                                    <div key={`second-${index}`} className="mx-12 flex items-center justify-center group/item min-w-[100px]">
                                        <img
                                            src={company.logo}
                                            alt={company.name}
                                            className={`${company.className || 'h-12'} w-auto object-contain opacity-50 brightness-0 invert transition-all duration-300 group-hover/item:opacity-100 group-hover/item:brightness-100 group-hover/item:invert-0`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
