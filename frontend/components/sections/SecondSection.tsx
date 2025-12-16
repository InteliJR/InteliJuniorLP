"use client";

/**
 * Seção "Quem Somos" + carrossel de parceiros.
 * - Combina ZoomParallax (linha do tempo visual) e grid bento de cards com CTA.
 * - Carrossel de empresas fica ao final; placeholder evita CLS enquanto ZoomParallax carrega.
 */
import React, { useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { m, useInView } from "framer-motion";
import { TextScramble } from "../ui/textScramble";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Cpu,
  Trophy,
  ArrowRight,
  Users,
  ArrowUpRight,
} from "lucide-react";
import { CompaniesCarousel } from "../CompaniesCarousel";

// Dynamic import do ZoomParallax - componente pesado com Framer Motion
const ZoomParallax = dynamic(
  () =>
    import("@/components/ZoomParallax").then((mod) => ({
      default: mod.ZoomParallax,
    })),
  {
    ssr: true,
    loading: () => (
      // Placeholder com altura fixa para evitar CLS
      <div className="relative h-[300vh] bg-background" />
    ),
  }
);

const companies = [
  {
    name: "BTG Pactual",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Btg-logo-blue.svg",
    className: "h-14",
  },
  {
    name: "Meta",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    className: "h-8",
  },
  {
    name: "BCG",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Boston_Consulting_Group_2020_logo.svg",
    className: "h-10",
  },
  {
    name: "Dell",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Dell_logo.svg",
    className: "h-9",
  },
  {
    name: "Banco Pan",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Bancopanlogo.png",
    className: "h-18",
  },
  {
    name: "CPTM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fb/CPTM_%28Logo%29.svg",
    className: "h-9",
  },
  {
    name: "Uber",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg",
    className: "h-8",
  },
  {
    name: "Ambev",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Ambev_logo.svg",
    className: "h-10",
  },
  {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    className: "h-10",
  },
  {
    name: "Bank of America",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Bank_of_America_logo.svg",
    className: "h-8",
  },
  {
    name: "Sírio Libanês",
    logo: "https://placehold.co/400x200/transparent/ffffff?text=S%C3%ADrio+Liban%C3%AAs",
    className: "h-26",
  },
];

export default function DefaultDemo() {
  // REMOVIDO: Lenis duplicado - já existe um provider global em SmoothScrolling.tsx

  const titleRef = React.useRef<HTMLDivElement | null>(null);
  const [hasTriggered, setHasTriggered] = React.useState(false);
  const [playId, setPlayId] = React.useState(0);

  // Trigger do header "Elevando a maturidade" (seção principal após o parallax)
  const [headerTriggered, setHeaderTriggered] = React.useState(false);
  const [headerPlayId, setHeaderPlayId] = React.useState(0);
  const headerRef = React.useRef<HTMLDivElement | null>(null);
  const headerInView = useInView(headerRef, { amount: 0.35, once: true });

  React.useEffect(() => {
    if (headerInView && !headerTriggered) {
      setHeaderTriggered(true);
      setHeaderPlayId((prev) => prev + 1);
    }
  }, [headerInView, headerTriggered]);

  // Trigger do bloco "Empresas que confiam" quando entra em viewport
  const [companiesTriggered, setCompaniesTriggered] = React.useState(false);
  const [companiesPlayId, setCompaniesPlayId] = React.useState(0);

  // Estados e funções para o botão CTA
  const [contactPlayId, setContactPlayId] = React.useState(0);
  const contactHoveringRef = useRef(false);

  const triggerContactScramble = useCallback(() => {
    if (contactHoveringRef.current) return;
    contactHoveringRef.current = true;
    setContactPlayId((prev) => prev + 1);
  }, []);

  const resetContactHoverState = useCallback(() => {
    contactHoveringRef.current = false;
  }, []);

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

  const images = [
    {
      src: "/images/foto7.jpg",
      alt: "Imagem do time da empresa em 2025",
      date: "2025",
      description: "Cluster 4 Conquistado",
    },
    {
      src: "/images/foto11.webp",
      alt: "Imagem do time da empresa em 2024",
      date: "2024",
      description: "Cluster 3 Conquistado",
    },
    {
      src: "/images/foto8.webp",
      alt: "Imagem do time da empresa em 2025 no Inteli",
      date: "2025",
      description: "Crescimento Acelerado",
    },
    {
      src: "/images/foto5.webp",
      alt: "Mountain landscape",
      date: "2023",
      description: "Certificados que alcançamos no primeiro ano de atuação",
    },
    {
      src: "/images/foto.webp",
      alt: "Imagem do primeiro time da Inteli Júnior",
      date: "2023",
      description: "Fundação da EJ",
    },
    {
      src: "/images/foto4.webp",
      alt: "Certificado do Prêmio Vortex Conquistado em 2025",
      date: "2025",
      description: "Prêmio Vortex",
    },
    {
      src: "/images/foto9.webp",
      alt: "ESP 2024",
      date: "2024",
      description: "Evento ESP 2024",
    },
  ];
  return (
    <main className="min-h-screen w-full">
      {/* Seção título "3 clusters" com animação */}
      <m.div
        ref={titleRef}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative flex h-[50vh] items-center justify-center -mb-10"
      >
        <div className="h-[0.1px] w-1/9 bg-primary"></div>
        <div className="flex gap-18 whitespace-nowrap w-full items-center justify-center px-10">
          <div className="flex flex-col gap-1 items-start relative">
            <h2 className="text-4xl md:text-5xl font-light uppercase leading-tight">
              A primeira Empresa,
              <br />
              Junior a conquistar
            </h2>
            <TextScramble
              as="span"
              className="text-4xl md:text-5xl uppercase leading-tight text-primary font-semibold"
              duration={1}
              speed={0.03}
              trigger={hasTriggered}
              playId={playId}
            >
              {"4 clusters em 3 anos."}
            </TextScramble>
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={hasTriggered ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute -right-4 -top-2 flex items-center justify-center mt-2"
            >
              <div className="absolute inset-0 bg-primary/80 blur-2xl rounded-full scale-150" />
              <Trophy
                className="size-12 text-primary relative z-10"
                strokeWidth={1.5}
              />
            </m.div>
          </div>
          <p className="text-muted-foreground text-md whitespace-normal">
            Mais do que um título, esse marco representa a{" "}
            <span className="text-white/70 font-semibold">
              velocidade da nossa evolução
            </span>
            . Em apenas 3 anos, atingimos níveis de maturidade que levam tempo
            para serem construídos, provando que{" "}
            <span className="text-white/70 font-semibold">
              unimos a agilidade de uma startup com a responsabilidade de uma
              grande empresa
            </span>
            .
          </p>
        </div>
        <div className="h-[0.1px] w-1/9 bg-primary"></div>
      </m.div>
      <ZoomParallax images={images} />
      <section
        id="quem-somos"
        className="relative w-full py-32 overflow-hidden"
      >
        <div className="mx-auto space-y-24 flex flex-col w-full items-center justify-center">
          {/* Header da seção com animação */}
          <m.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={
              headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full flex flex-col md:flex-row justify-start items-center gap-18"
          >
            <div className="h-[0.1px] w-1/9 bg-primary"></div>
            <div className="space-y-4">
              <TextScramble
                as="span"
                className="text-md font-extralight uppercase text-primary tracking-[0.2em]"
                duration={1}
                speed={0.03}
                trigger={headerTriggered}
                playId={headerPlayId}
              >
                {"[2. Quem somos]"}
              </TextScramble>
              <h3 className="text-4xl md:text-5xl font-light uppercase leading-tight whitespace-nowrap">
                Elevando a
                <TextScramble
                  className="text-primary font-semibold"
                  duration={1}
                  speed={0.03}
                  trigger={headerTriggered}
                  playId={headerPlayId}
                >
                  {" "}
                  maturidade
                </TextScramble>
                <br />
                através da tecnologia
              </h3>
            </div>
            <p className="text-muted-foreground text-md w-full">
              Nascemos no <a href="https://www.inteli.edu.br/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">Inteli</a> para transformar o ecossistema universitário e{" "}
              <span className="text-white/70 font-semibold">
                gerar valor real para a sociedade
              </span>
              .
            </p>
            <div className="h-[0.1px] w-1/9 bg-primary"></div>
          </m.div>
          <div className="grid w-full grid-cols-1 md:grid-cols-3 md:grid-rows-[12rem_14rem_12rem] gap-4 px-24">
            {/* Coluna 1, Row 1+2 - Card Grande (topo esquerdo) ~70% */}
            <m.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="md:col-start-1 md:row-start-1 md:row-span-2 relative group overflow-visible"
            >
              {/* SVG Tech Border - diagonal cuts */}
              <div className="absolute inset-0 pointer-events-none z-30">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 8 0 L 100 0 L 100 92 L 92 100 L 0 100 L 0 8 L 8 0 Z"
                    vectorEffect="non-scaling-stroke"
                    className="stroke-1 fill-none stroke-white/25 transition-all duration-300 group-hover:stroke-primary"
                  />
                </svg>
              </div>
              {/* Decorative HUD Elements */}
              <div className="absolute top-3 right-3 z-40 pointer-events-none">
                <div className="w-2 h-2 bg-white/40 group-hover:bg-primary rounded-full transition-colors duration-300" />
              </div>
              {/* Corner Accents */}
              <svg className="absolute -top-px -left-px w-6 h-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-40">
                <path
                  d="M 0 16 V 0 H 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <svg className="absolute -bottom-px -right-px w-6 h-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-40">
                <path
                  d="M 24 8 V 24 H 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              {/* Clipped content */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  clipPath:
                    "polygon(8% 0%, 100% 0%, 100% 92%, 92% 100%, 0% 100%, 0% 8%)",
                }}
              >
                {/* Background Grid (Scanline effect interno) */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[20px_20px] z-0 pointer-events-none" />
                {/* Imagem de fundo */}
                <div className="absolute inset-0">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&crop=faces&auto=format&q=80"
                    alt="Equipe colaborando"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    quality={75}
                  />
                  {/* Overlay escuro */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/30" />
                </div>
                {/* Brilho interno (inset shadow) */}
                <div className="absolute inset-0 rounded-sm shadow-(--shadow-inner-glass) pointer-events-none z-20" />
                {/* Conteúdo */}
                <div className="relative z-10 h-full flex flex-col justify-between p-8">
                  {/* Ícone com Container de Vidro */}
                  <div className="w-fit p-3 bg-white/5 border border-white/10 rounded-lg group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors duration-300 backdrop-blur-md">
                    <img
                      src="/images/logo.svg"
                      alt="Inteli Júnior"
                      className="w-8 h-8"
                    />
                  </div>
                  <div className="transform transition-all duration-500 group-hover:translate-x-1">
                    <h4 className="text-xl font-semibold mb-2 text-primary uppercase tracking-[0.2em]">
                      Inteli Júnior
                    </h4>
                    <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors">
                       Somos uma
                      empresa júnior fundada e mantida pelos alunos do <a href="https://www.inteli.edu.br/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">Instituto
                      de Tecnologia e Liderança</a>. Nosso propósito é elevar a
                      maturidade dos universitários, conectando aprendizado e
                      inovação.
                    </p>
                  </div>
                </div>
              </div>
              {/* Laser Scan Animation */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-primary to-transparent opacity-0 group-hover:animate-scan-line pointer-events-none z-50 shadow-[0_0_15px_rgba(255,77,58,0.5)]" />
            </m.div>

            {/* Coluna 1, Row 3 - Card Pequeno (embaixo esquerdo) ~30% */}
            <m.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="md:col-start-1 md:row-start-3 relative group overflow-visible"
            >
              {/* SVG Tech Border - diagonal cuts */}
              <div className="absolute inset-0 pointer-events-none z-30">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 12 0 L 100 0 L 100 88 L 88 100 L 0 100 L 0 12 L 12 0 Z"
                    vectorEffect="non-scaling-stroke"
                    className="stroke-1 fill-white/5 stroke-white/25 transition-all duration-300 group-hover:stroke-primary"
                  />
                </svg>
              </div>
              {/* Decorative HUD Elements */}
              <div className="absolute top-3 right-3 z-40 pointer-events-none">
                <div className="w-2 h-2 bg-white/40 group-hover:bg-primary rounded-full transition-colors duration-300" />
              </div>
              {/* Corner Accents */}
              <svg className="absolute -top-px -left-px w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-40">
                <path
                  d="M 0 14 V 0 H 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <svg className="absolute -bottom-px -right-px w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-40">
                <path
                  d="M 20 6 V 20 H 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              {/* Clipped content */}
              <div
                className="absolute inset-0 overflow-hidden backdrop-blur-[1.5px]"
                style={{
                  clipPath:
                    "polygon(12% 0%, 100% 0%, 100% 88%, 88% 100%, 0% 100%, 0% 12%)",
                }}
              >
                {/* Background Grid (Scanline effect interno) */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[20px_20px] z-0 pointer-events-none" />
                {/* Brilho interno (inset shadow) */}
                <div className="absolute inset-0 shadow-(--shadow-inner-glass) pointer-events-none" />
                {/* Overlay no hover */}
                <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-white/2" />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between p-6">
                {/* Ícone com Container de Vidro */}
                <div className="w-fit p-3 bg-white/5 border border-white/10 rounded-lg group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors duration-300 backdrop-blur-md">
                  <Users
                    className="w-6 h-6 text-white group-hover:text-primary transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="transform transition-all duration-500 group-hover:translate-x-1">
                  <h4 className="text-lg font-semibold mb-1 text-white">
                    Vivência Ágil
                  </h4>
                  <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors">
                    Sprints, dailies e retrospectivas. Operamos com os mesmos
                    frameworks ágeis das big techs.
                  </p>
                </div>
              </div>
              {/* Laser Scan Animation */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-primary to-transparent opacity-0 group-hover:animate-scan-line pointer-events-none z-50 shadow-[0_0_15px_rgba(255,77,58,0.5)]" />
            </m.div>

            {/* Coluna 2, Row 1+2+3 - Card Vertical (ocupa todas as rows) */}
            <m.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
              className="md:col-start-2 md:row-start-1 md:row-span-3 relative group overflow-visible"
            >
              {/* SVG Tech Border - diagonal cuts */}
              <div className="absolute inset-0 pointer-events-none z-30">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 6 0 L 100 0 L 100 94 L 94 100 L 0 100 L 0 6 L 6 0 Z"
                    vectorEffect="non-scaling-stroke"
                    className="stroke-1 fill-none stroke-white/25 transition-all duration-300 group-hover:stroke-primary"
                  />
                </svg>
              </div>
              {/* Decorative HUD Elements */}
              <div className="absolute top-3 right-3 z-40 pointer-events-none">
                <div className="w-2 h-2 bg-white/40 group-hover:bg-primary rounded-full transition-colors duration-300" />
              </div>
              {/* Corner Accents */}
              <svg className="absolute -top-px -left-px w-6 h-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-40">
                <path
                  d="M 0 16 V 0 H 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <svg className="absolute -bottom-px -right-px w-6 h-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-40">
                <path
                  d="M 24 8 V 24 H 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              {/* Clipped content */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  clipPath:
                    "polygon(6% 0%, 100% 0%, 100% 94%, 94% 100%, 0% 100%, 0% 6%)",
                }}
              >
                {/* Background Grid (Scanline effect interno) */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[20px_20px] z-0 pointer-events-none" />
                {/* Imagem de fundo */}
                <div className="absolute inset-0">
                  <Image
                    src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=900&fit=crop&auto=format&q=80"
                    alt="Código de qualidade"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    quality={75}
                  />
                  {/* Overlay escuro */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/60 to-black/40" />
                </div>
                {/* Brilho interno (inset shadow) */}
                <div className="absolute inset-0 rounded-sm shadow-(--shadow-inner-glass) pointer-events-none z-20" />
                {/* Conteúdo */}
                <div className="relative z-10 h-full flex flex-col justify-between p-8">
                  {/* Ícone com Container de Vidro */}
                  <div className="w-fit p-3 bg-white/5 border border-white/10 rounded-lg group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors duration-300 backdrop-blur-md">
                    <Award
                      className="w-6 h-6 text-white group-hover:text-primary transition-colors duration-300"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="transform transition-all duration-500 group-hover:translate-x-1">
                    <h4 className="text-xl font-semibold mb-2 text-white">
                      Excelência no Trabalho
                    </h4>
                    <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors">
                      Comprometimento com a qualidade em cada entrega. Nossos
                      projetos seguem padrões rigorosos de desenvolvimento,
                      garantindo soluções robustas e escaláveis que superam as
                      expectativas.
                    </p>
                  </div>
                </div>
              </div>
              {/* Laser Scan Animation */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-primary to-transparent opacity-0 group-hover:animate-scan-line pointer-events-none z-50 shadow-[0_0_15px_rgba(255,77,58,0.5)]" />
            </m.div>

            {/* Coluna 3, Row 1 - Card Pequeno (topo direito) ~30% */}
            <m.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              className="md:col-start-3 md:row-start-1 relative group overflow-visible"
            >
              {/* SVG Tech Border - diagonal cuts */}
              <div className="absolute inset-0 pointer-events-none z-30">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 12 0 L 100 0 L 100 88 L 88 100 L 0 100 L 0 12 L 12 0 Z"
                    vectorEffect="non-scaling-stroke"
                    className="stroke-1 fill-white/5 stroke-white/25 transition-all duration-300 group-hover:stroke-primary"
                  />
                </svg>
              </div>
              {/* Decorative HUD Elements */}
              <div className="absolute top-3 right-3 z-40 pointer-events-none">
                <div className="w-2 h-2 bg-white/40 group-hover:bg-primary rounded-full transition-colors duration-300" />
              </div>
              {/* Corner Accents */}
              <svg className="absolute -top-px -left-px w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-40">
                <path
                  d="M 0 14 V 0 H 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <svg className="absolute -bottom-px -right-px w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-40">
                <path
                  d="M 20 6 V 20 H 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              {/* Clipped content */}
              <div
                className="absolute inset-0 overflow-hidden backdrop-blur-[1.5px]"
                style={{
                  clipPath:
                    "polygon(12% 0%, 100% 0%, 100% 88%, 88% 100%, 0% 100%, 0% 12%)",
                }}
              >
                {/* Background Grid (Scanline effect interno) */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[20px_20px] z-0 pointer-events-none" />
                {/* Brilho interno (inset shadow) */}
                <div className="absolute inset-0 shadow-(--shadow-inner-glass) pointer-events-none" />
                {/* Overlay no hover */}
                <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-white/2" />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between p-6">
                {/* Ícone com Container de Vidro */}
                <div className="w-fit p-3 bg-white/5 border border-white/10 rounded-lg group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors duration-300 backdrop-blur-md">
                  <Cpu
                    className="w-6 h-6 text-white group-hover:text-primary transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="transform transition-all duration-500 group-hover:translate-x-1">
                  <h4 className="text-lg font-semibold mb-1 text-white">
                    Metodologia & Ensino
                  </h4>
                  <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors">
                    Code review, CI/CD e boas práticas. Padrão de engenharia das
                    maiores empresas de tecnologia.
                  </p>
                </div>
              </div>
              {/* Laser Scan Animation */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-primary to-transparent opacity-0 group-hover:animate-scan-line pointer-events-none z-50 shadow-[0_0_15px_rgba(255,77,58,0.5)]" />
            </m.div>

            {/* Coluna 3, Row 2+3 - Card Grande (embaixo direito) ~70% - CTA */}
            <m.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
              className="md:col-start-3 md:row-start-2 md:row-span-2 relative group overflow-visible"
            >
              {/* SVG Tech Border - diagonal cuts */}
              <div className="absolute inset-0 pointer-events-none z-30">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 8 0 L 100 0 L 100 92 L 92 100 L 0 100 L 0 8 L 8 0 Z"
                    vectorEffect="non-scaling-stroke"
                    className="stroke-1 fill-none stroke-white/25 transition-all duration-300 group-hover:stroke-primary"
                  />
                </svg>
              </div>
              {/* Decorative HUD Elements */}
              <div className="absolute top-3 right-3 z-40 pointer-events-none">
                <div className="w-2 h-2 bg-white/40 group-hover:bg-primary rounded-full transition-colors duration-300" />
              </div>
              {/* Corner Accents */}
              <svg className="absolute -top-px -left-px w-6 h-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-40">
                <path
                  d="M 0 16 V 0 H 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <svg className="absolute -bottom-px -right-px w-6 h-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-40">
                <path
                  d="M 24 8 V 24 H 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              {/* Clipped content */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  clipPath:
                    "polygon(8% 0%, 100% 0%, 100% 92%, 92% 100%, 0% 100%, 0% 8%)",
                }}
              >
                {/* Background Grid (Scanline effect interno) */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[20px_20px] z-0 pointer-events-none" />
                {/* Imagem de fundo */}
                <div className="absolute inset-0">
                  <Image
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&auto=format&q=80"
                    alt="Inovação tecnológica"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    quality={75}
                  />
                  {/* Overlay com tom primário */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-primary/20 to-black/40" />
                </div>
                {/* Brilho interno (inset shadow) */}
                <div className="absolute inset-0 rounded-sm shadow-(--shadow-inner-primary) pointer-events-none z-20" />
                {/* Conteúdo */}
                <div className="relative z-10 h-full flex flex-col justify-between p-8">
                  {/* Ícone com Container de Vidro */}
                  <div className="w-fit p-3 bg-white/5 border border-white/10 rounded-lg group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors duration-300 backdrop-blur-md">
                    <ArrowUpRight
                      className="w-6 h-6 text-white group-hover:text-primary transition-colors duration-300"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="space-y-4 transform transition-all duration-500 group-hover:translate-x-1">
                    <div>
                      <h4 className="text-xl font-semibold mb-2 text-white">
                        Pronto para inovar?
                      </h4>
                      <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors">
                        Conheça nossas soluções personalizadas.
                      </p>
                    </div>
                    <Link
                      href="#contato"
                      className="z-10 relative group/btn inline-flex items-center justify-center"
                      onMouseEnter={triggerContactScramble}
                      onMouseLeave={resetContactHoverState}
                      onFocus={triggerContactScramble}
                      onBlur={resetContactHoverState}
                    >
                      {/* Backdrop blur layer */}
                      <div
                        className="absolute inset-0 bg-primary/90 group-hover/btn:bg-primary transition-colors duration-300"
                        style={{
                          clipPath:
                            "polygon(8% 0%, 100% 0%, 100% 70%, 92% 100%, 0% 100%, 0% 30%)",
                        }}
                      />
                      {/* Border SVG */}
                      <div className="absolute inset-0 pointer-events-none">
                        <svg
                          className="w-full h-full"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M 8 0 L 100 0 L 100 70 L 92 100 L 0 100 L 0 30 L 8 0 Z"
                            vectorEffect="non-scaling-stroke"
                            className="stroke-1 fill-none stroke-white/20 group-hover/btn:stroke-white/40 transition-all duration-300"
                          />
                        </svg>
                        {/* Corner accents */}
                        <svg className="absolute -top-px -left-px w-4 h-4 text-white/60 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                          <path
                            d="M 0 12 V 0 H 12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                        <svg className="absolute -bottom-px -right-px w-4 h-4 text-white/60 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                          <path
                            d="M 16 4 V 16 H 4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                      {/* Content */}
                      <div className="relative z-10 flex items-center px-8 py-4">
                        <TextScramble
                          as="span"
                          className="text-sm font-semibold uppercase tracking-[0.2em] text-black"
                          duration={0.8}
                          speed={0.035}
                          trigger={true}
                          playId={contactPlayId}
                        >
                          {"iniciar projeto"}
                        </TextScramble>
                        <ArrowRight className="ml-3 size-4 shrink-0 text-black transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:scale-125" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              {/* Laser Scan Animation */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-primary to-transparent opacity-0 group-hover:animate-scan-line pointer-events-none z-50 shadow-[0_0_15px_rgba(255,77,58,0.5)]" />
            </m.div>
          </div>
          {/* Título empresas com animação */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center justify-center gap-6 w-fit"
            onViewportEnter={() => {
              if (!companiesTriggered) {
                setCompaniesTriggered(true);
                setCompaniesPlayId((prev) => prev + 1);
              }
            }}
          >
            <TextScramble
              as="span"
              className="text-4xl text-white uppercase tracking-[0.2em]"
              duration={1}
              speed={0.03}
              trigger={companiesTriggered}
              playId={companiesPlayId}
            >
              {"EMPRESAS QUE CONFIAM EM NOSSSOS"}
            </TextScramble>
            <TextScramble
              as="span"
              className="text-4xl font-semibold text-primary uppercase tracking-[0.2em] border-b-2 border-primary"
              duration={1}
              speed={0.03}
              trigger={companiesTriggered}
              playId={companiesPlayId}
            >
              {"MEMBROS"}
            </TextScramble>
          </m.div>
          {/* Carrossel de empresas */}
          <CompaniesCarousel companies={companies} className="-mt-10" />
        </div>
      </section>
    </main>
  );
}
