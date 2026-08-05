"use client";


import React, { useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { m, useInView } from "framer-motion";
import { TextScramble } from "../ui/textScramble";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  Trophy,
  ArrowRight,
  ArrowUpRight,
  GitBranch,
  Cloud,
} from "lucide-react";
import { TiltCard } from "../TiltCard";

const ZoomParallax = dynamic(
  () =>
    import("@/components/ZoomParallax").then((mod) => ({
      default: mod.ZoomParallax,
    })),
  {
    ssr: true,
    loading: () => (
      <div className="relative h-[300vh] bg-background" />
    ),
  }
);

export default function DefaultDemo() {

  const titleRef = React.useRef<HTMLDivElement | null>(null);
  const [hasTriggered, setHasTriggered] = React.useState(false);
  const [playId, setPlayId] = React.useState(0);

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
      <m.div
        ref={titleRef}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative flex min-h-[50vh] lg:h-[50vh] items-center justify-center py-14 lg:py-0 -mb-10"
      >
        <div className="hidden lg:block h-px w-1/9 bg-primary"></div>
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10 xl:gap-14 w-full items-center justify-center px-6 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-1 items-center lg:items-start text-center lg:text-left shrink-0">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl uppercase leading-tight lg:whitespace-nowrap">
              A primeira Empresa,
              <br />
              Junior a conquistar
            </h2>
            <TextScramble
              as="span"
              className="text-3xl sm:text-4xl lg:text-5xl uppercase leading-tight text-primary font-semibold"
              duration={1}
              speed={0.03}
              trigger={hasTriggered}
              playId={playId}
            >
              {"5 clusters em 4 anos."}
            </TextScramble>
          </div>
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={hasTriggered ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center shrink-0"
          >
            <div className="absolute inset-0 bg-primary/80 blur-2xl rounded-full scale-150" />
            <Trophy
              className="size-12 text-primary relative z-10"
              strokeWidth={1.5}
            />
          </m.div>
          <p className="text-muted-foreground text-md whitespace-normal max-w-md lg:max-w-lg text-center lg:text-left">
            Mais do que um título, esse marco representa a{" "}
            <span className="text-white/70 font-semibold">
              velocidade da nossa evolução
            </span>
            . Em apenas 4 anos, atingimos níveis de maturidade que levam tempo
            para serem construídos, provando que{" "}
            <span className="text-white/70 font-semibold">
              unimos a agilidade de uma startup com a responsabilidade de uma
              grande empresa
            </span>
            .
          </p>
        </div>
        <div className="hidden lg:block h-px w-1/9 bg-primary"></div>
      </m.div>
      <ZoomParallax images={images} />
      <section
        id="quem-somos"
        className="relative w-full py-28 overflow-hidden"
      >
        <div className="mx-auto flex flex-col w-full items-center justify-center">
          <m.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={
              headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full flex items-center mb-16 md:mb-24"
          >
            <div className="hidden lg:block h-px w-1/9 bg-primary" />
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-18 w-full items-center justify-center px-6 sm:px-8 lg:px-10">
              <div className="flex flex-col gap-1 items-center lg:items-start text-center lg:text-left relative">
                <TextScramble
                  as="span"
                  className="text-md font-extralight uppercase text-primary tracking-[0.2em]"
                  duration={1}
                  speed={0.03}
                  trigger={headerTriggered}
                  playId={headerPlayId}
                >
                  {"[3. Quem somos]"}
                </TextScramble>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl uppercase leading-tight">
                  Tecnologia de
                  <TextScramble
                    as="span"
                    className="text-primary font-semibold"
                    duration={1}
                    speed={0.03}
                    trigger={headerTriggered}
                    playId={headerPlayId}
                  >
                    {" verdade"}
                  </TextScramble>
                  <br />
                  feita por quem vive o mercado
                </h3>
              </div>
              <p className="text-white/70 text-md whitespace-normal w-full max-w-lg text-center lg:text-left lg:shrink-0">
                Nascemos no{" "}
                <a
                  href="https://www.inteli.edu.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                >
                  Inteli
                </a>
                , uma faculdade que une tecnologia com liderança desenvolvendo projetos para as maiores empresas do Brasil. Trabalhamos com a metodologia ágil SCRUM e assim garantimos o seu projeto com a melhor entrega do mercado.
              </p>
            </div>
            <div className="hidden lg:block h-px w-1/9 bg-primary" />
          </m.div>

          <div className="grid w-full grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 px-6 sm:px-8 md:px-16 lg:px-32 mb-20 md:mb-28">
            <TiltCard className="order-1 md:order-1 lg:col-span-2" intensity={14} hoverScale={1.01}>
              <m.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="min-h-[360px] relative group overflow-visible h-full"
              >
              <div className="absolute inset-0 pointer-events-none z-30">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 4 0 L 100 0 L 100 96 L 96 100 L 0 100 L 0 4 L 4 0 Z"
                    vectorEffect="non-scaling-stroke"
                    className="stroke-1 fill-none stroke-white/25 transition-all duration-300 group-hover:stroke-primary"
                  />
                </svg>
              </div>
              <svg className="absolute -top-px -left-px w-6 h-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-40">
                <path d="M 0 16 V 0 H 16" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              <svg className="absolute -bottom-px -right-px w-6 h-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-40">
                <path d="M 24 8 V 24 H 8" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  clipPath: "polygon(4% 0%, 100% 0%, 100% 96%, 96% 100%, 0% 100%, 0% 4%)",
                }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[20px_20px] z-0 pointer-events-none" />
                <div className="absolute inset-0">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&crop=faces&auto=format&q=80"
                    alt="Equipe colaborando"
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    quality={75}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/70 to-black/40" />
                </div>
                <div className="absolute inset-0 rounded-sm shadow-(--shadow-inner-glass) pointer-events-none z-20" />
                <div className="relative z-10 h-full flex flex-col justify-between p-8">
                  <div className="w-fit p-3 bg-white/5 border border-white/10 rounded-lg group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors duration-300 backdrop-blur-md">
                    <img src="/images/logo.svg" alt="Inteli Júnior" className="w-8 h-8" />
                  </div>
                  <div className="transform transition-all duration-500 group-hover:translate-x-1">
                    <h4 className="text-xl font-semibold mb-3 text-primary uppercase tracking-[0.15em]">
                      Inteli Júnior
                    </h4>
                    <p className="text-white/90 text-sm leading-relaxed max-w-xl group-hover:text-white transition-colors">
                      Somos a empresa júnior do{" "}
                      <a href="https://www.inteli.edu.br/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">
                        Instituto de Tecnologia e Liderança
                      </a>
                      , a melhor faculdade de tecnologia do país, conhecida como MIT Brasileiro. Na Inteli Júnior unimos todo o aprendizado dos cursos e entregamos o produto do diagnóstico à implantação do seu projeto.
                      {" "}
                      <span className="text-white font-semibold">
                        Tecnologia aplicada, gestão ágil e entrega de ponta a ponta
                      </span>
                      .
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-primary to-transparent opacity-0 group-hover:animate-scan-line pointer-events-none z-50 shadow-[0_0_15px_rgba(255,77,58,0.5)]" />
              </m.div>
            </TiltCard>
            <TiltCard className="order-4 md:order-4" intensity={12} hoverScale={1.02}>
              <m.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                className="min-h-[420px] relative group overflow-visible h-full"
              >
              <div className="absolute inset-0 pointer-events-none z-30">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    d="M 8 0 L 100 0 L 100 92 L 92 100 L 0 100 L 0 8 L 8 0 Z"
                    vectorEffect="non-scaling-stroke"
                    className="stroke-1 fill-white/5 stroke-white/25 transition-all duration-300 group-hover:stroke-primary"
                  />
                </svg>
              </div>
              <svg className="absolute -top-px -left-px w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-40">
                <path d="M 0 14 V 0 H 14" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              <svg className="absolute -bottom-px -right-px w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-40">
                <path d="M 20 6 V 20 H 6" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              <div
                className="absolute inset-0 overflow-hidden backdrop-blur-[1.5px]"
                style={{
                  clipPath: "polygon(8% 0%, 100% 0%, 100% 92%, 92% 100%, 0% 100%, 0% 8%)",
                }}
              >
                <div className="absolute inset-0">
                  <Image
                    src="/images/foto13-card.jpg"
                    alt="Metodologia PBL na Inteli Júnior"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    quality={75}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/70 to-black/50" />
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[20px_20px] z-0 pointer-events-none" />
                <div className="absolute inset-0 shadow-(--shadow-inner-glass) pointer-events-none" />
                <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-white/2" />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between p-6">
                <div className="w-fit p-3 bg-white/5 border border-white/10 rounded-lg group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors duration-300 backdrop-blur-md">
                  <GraduationCap className="w-6 h-6 text-white group-hover:text-primary transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <div className="transform transition-all duration-500 group-hover:translate-x-1">
                  <h4 className="text-lg font-semibold mb-2 text-white">Metodologia PBL</h4>
                  <p className="text-white/80 text-sm leading-relaxed group-hover:text-white/90 transition-colors">
                    No Inteli, cada aluno desenvolve{" "}
                    <span className="text-primary font-medium">4 projetos por ano</span> para empresas do mercado como Meta, IBM, Google, Bayer, entre outras, aprendemos a desenvolver diversos projetos desde inteligência artificial até Internet of Things (IoT).
                  </p>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-primary to-transparent opacity-0 group-hover:animate-scan-line pointer-events-none z-50 shadow-[0_0_15px_rgba(255,77,58,0.5)]" />
              </m.div>
            </TiltCard>
            <TiltCard className="order-2 md:order-2" intensity={12} hoverScale={1.02}>
              <m.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
                className="min-h-[420px] relative group overflow-visible h-full"
              >
              <div className="absolute inset-0 pointer-events-none z-30">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    d="M 6 0 L 100 0 L 100 94 L 94 100 L 0 100 L 0 6 L 6 0 Z"
                    vectorEffect="non-scaling-stroke"
                    className="stroke-1 fill-none stroke-white/25 transition-all duration-300 group-hover:stroke-primary"
                  />
                </svg>
              </div>
              <svg className="absolute -top-px -left-px w-6 h-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-40">
                <path d="M 0 16 V 0 H 16" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              <svg className="absolute -bottom-px -right-px w-6 h-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-40">
                <path d="M 24 8 V 24 H 8" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  clipPath: "polygon(6% 0%, 100% 0%, 100% 94%, 94% 100%, 0% 100%, 0% 6%)",
                }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[20px_20px] z-0 pointer-events-none" />
                <div className="absolute inset-0">
                  <Image
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=900&fit=crop&auto=format&q=80"
                    alt="Reunião de sprint"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    quality={75}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/70 to-black/50" />
                </div>
                <div className="absolute inset-0 rounded-sm shadow-(--shadow-inner-glass) pointer-events-none z-20" />
                <div className="relative z-10 h-full flex flex-col justify-between p-8">
                  <div className="w-fit p-3 bg-white/5 border border-white/10 rounded-lg group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors duration-300 backdrop-blur-md">
                    <GitBranch className="w-6 h-6 text-white group-hover:text-primary transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <div className="transform transition-all duration-500 group-hover:translate-x-1">
                    <h4 className="text-xl font-semibold mb-2 text-white">Ágil na Prática</h4>
                    <p className="text-white/80 text-sm leading-relaxed group-hover:text-white/90 transition-colors">
                      Vivemos Scrum de verdade: sprints, dailies, retrospectivas e reviews com os parceiros.
                      Git Flow, code review e CI/CD — o que muitos só veem na teoria, nós praticamos desde o primeiro semestre.
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-primary to-transparent opacity-0 group-hover:animate-scan-line pointer-events-none z-50 shadow-[0_0_15px_rgba(255,77,58,0.5)]" />
              </m.div>
            </TiltCard>
            <TiltCard className="order-3 md:order-3" intensity={12} hoverScale={1.02}>
              <m.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                className="min-h-[420px] relative group overflow-visible h-full"
              >
              <div className="absolute inset-0 pointer-events-none z-30">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    d="M 6 0 L 100 0 L 100 94 L 94 100 L 0 100 L 0 6 L 6 0 Z"
                    vectorEffect="non-scaling-stroke"
                    className="stroke-1 fill-none stroke-white/25 transition-all duration-300 group-hover:stroke-primary"
                  />
                </svg>
              </div>
              <svg className="absolute -top-px -left-px w-6 h-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-40">
                <path d="M 0 16 V 0 H 16" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              <svg className="absolute -bottom-px -right-px w-6 h-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-40">
                <path d="M 24 8 V 24 H 8" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  clipPath: "polygon(6% 0%, 100% 0%, 100% 94%, 94% 100%, 0% 100%, 0% 6%)",
                }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[20px_20px] z-0 pointer-events-none" />
                <div className="absolute inset-0">
                  <Image
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=900&fit=crop&auto=format&q=80"
                    alt="Tecnologia cloud"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    quality={75}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/70 to-black/50" />
                </div>
                <div className="absolute inset-0 rounded-sm shadow-(--shadow-inner-glass) pointer-events-none z-20" />
                <div className="relative z-10 h-full flex flex-col justify-between p-8">
                  <div className="w-fit p-3 bg-white/5 border border-white/10 rounded-lg group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors duration-300 backdrop-blur-md">
                    <Cloud className="w-6 h-6 text-white group-hover:text-primary transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <div className="transform transition-all duration-500 group-hover:translate-x-1">
                    <h4 className="text-xl font-semibold mb-2 text-white">Tecnologia de Verdade</h4>
                    <p className="text-white/80 text-sm leading-relaxed group-hover:text-white/90 transition-colors">
                      Enquanto outras EJs usam no-code, nós implantamos soluções do zero de forma robusta em cloud.
                      Infraestrutura escalável, arquiteturas modernas e código de qualidade profissional.
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-primary to-transparent opacity-0 group-hover:animate-scan-line pointer-events-none z-50 shadow-[0_0_15px_rgba(255,77,58,0.5)]" />
              </m.div>
            </TiltCard>
            <TiltCard className="order-5 md:order-5" intensity={12} hoverScale={1.02}>
              <m.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
                className="min-h-[420px] relative group overflow-visible h-full"
              >
              <div className="absolute inset-0 pointer-events-none z-30">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    d="M 8 0 L 100 0 L 100 92 L 92 100 L 0 100 L 0 8 L 8 0 Z"
                    vectorEffect="non-scaling-stroke"
                    className="stroke-1 fill-none stroke-white/25 transition-all duration-300 group-hover:stroke-primary"
                  />
                </svg>
              </div>
              <svg className="absolute -top-px -left-px w-6 h-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-40">
                <path d="M 0 16 V 0 H 16" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              <svg className="absolute -bottom-px -right-px w-6 h-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-40">
                <path d="M 24 8 V 24 H 8" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  clipPath: "polygon(8% 0%, 100% 0%, 100% 92%, 92% 100%, 0% 100%, 0% 8%)",
                }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[20px_20px] z-0 pointer-events-none" />
                <div className="absolute inset-0">
                  <Image
                    src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=900&fit=crop&auto=format&q=80"
                    alt="Inovação"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    quality={75}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/95 via-primary/30 to-black/50" />
                </div>
                <div className="absolute inset-0 rounded-sm shadow-(--shadow-inner-primary) pointer-events-none z-20" />
                <div className="relative z-10 h-full flex flex-col justify-between p-8">
                  <div className="w-fit p-3 bg-white/5 border border-white/10 rounded-lg group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors duration-300 backdrop-blur-md">
                    <ArrowUpRight className="w-6 h-6 text-white group-hover:text-primary transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <div className="space-y-4 transform transition-all duration-500 group-hover:translate-x-1">
                    <div>
                      <h4 className="text-xl font-semibold mb-2 text-white bg-black/50 ">Pronto para inovar?</h4>
                    </div>
                    <Link
                      href="#contato"
                      className="z-10 relative group/btn inline-flex items-center justify-center"
                      onMouseEnter={triggerContactScramble}
                      onMouseLeave={resetContactHoverState}
                      onFocus={triggerContactScramble}
                      onBlur={resetContactHoverState}
                    >
                      <div
                        className="absolute inset-0 bg-primary/90 group-hover/btn:bg-primary transition-colors duration-300"
                        style={{
                          clipPath: "polygon(8% 0%, 100% 0%, 100% 70%, 92% 100%, 0% 100%, 0% 30%)",
                        }}
                      />
                      <div className="absolute inset-0 pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <path
                            d="M 8 0 L 100 0 L 100 70 L 92 100 L 0 100 L 0 30 L 8 0 Z"
                            vectorEffect="non-scaling-stroke"
                            className="stroke-1 fill-none stroke-white/20 group-hover/btn:stroke-white/40 transition-all duration-300"
                          />
                        </svg>
                      </div>
                      <div className="relative z-10 flex items-center px-8 py-4">
                        <TextScramble
                          as="span"
                          className="text-sm font-semibold uppercase tracking-[0.2em] text-white text-bold"
                          duration={0.8}
                          speed={0.035}
                          trigger={true}
                          playId={contactPlayId}
                        >
                          {"Entrar em contato"}
                        </TextScramble>
                        <ArrowRight className="ml-3 size-4 shrink-0 text-white transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:scale-125" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-primary to-transparent opacity-0 group-hover:animate-scan-line pointer-events-none z-50 shadow-[0_0_15px_rgba(255,77,58,0.5)]" />
              </m.div>
            </TiltCard>
          </div>
        </div>
      </section>
    </main>
  );
}
