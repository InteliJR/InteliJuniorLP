"use client";

/**
 * HeroParallax: vitrine de cases em três linhas com deslocamento e tilt progressivos.
 * - Anima posições com scroll (useScroll + useTransform + useSpring) e mantém filas independentes.
 * - Exibe detalhe em modal (portal) com TextScramble nos títulos para consistência visual.
 */
import React from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
  AnimatePresence,
} from "motion/react";
import { useScrambleTrigger } from "@/hooks/useScrambleTrigger";
import { TextScramble } from "./textScramble";
import { Sparkles, X, ExternalLink, Calendar, Tag } from "lucide-react";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
    description?: string;
    renderLink?: boolean;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  }); // Usa sticky + scroll progress local para desacoplar do scroll global

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-500, 100]),
    springConfig
  );

  const [selectedProduct, setSelectedProduct] = React.useState<(typeof products)[0] | null>(null);
  const [mounted, setMounted] = React.useState(false);

  const [projectLinkPlayId, setProjectLinkPlayId] = React.useState(0);
  const projectLinkHoveringRef = React.useRef(false);

  React.useEffect(() => {
    if (!selectedProduct) {
      setProjectLinkPlayId(0);
      projectLinkHoveringRef.current = false;
    }
  }, [selectedProduct]);

  const triggerProjectLinkScramble = () => {
    if (projectLinkHoveringRef.current) return;
    projectLinkHoveringRef.current = true;
    setProjectLinkPlayId((prev) => prev + 1);
  };

  const resetProjectLinkHoverState = () => {
    projectLinkHoveringRef.current = false;
  };

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div
        ref={ref}
        className="h-[265vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto bg-transparent"
        style={{ perspective: '1000px' }}
      >
        {/* Fundo tech/cyberphonk */}
        <div className="pointer-events-none absolute inset-0">

        </div>

        <Header />
        <motion.div
          style={{
            rotateX,
            rotateZ,
            translateY,
            opacity,
            transformStyle: 'preserve-3d',
          }}
          className=""
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: -500, right: 500 }}
            className="flex flex-row-reverse space-x-reverse space-x-20 mb-20 cursor-grab active:cursor-grabbing"
          >
            {firstRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                key={product.title}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </motion.div>
          <motion.div
            drag="x"
            dragConstraints={{ left: -500, right: 500 }}
            className="flex flex-row mb-20 space-x-20 cursor-grab active:cursor-grabbing"
          >
            {secondRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateXReverse}
                key={product.title}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </motion.div>
          <motion.div
            drag="x"
            dragConstraints={{ left: -500, right: 500 }}
            className="flex flex-row-reverse space-x-reverse space-x-20 cursor-grab active:cursor-grabbing"
          >
            {thirdRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                key={product.title}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Modal via portal para escapar do contexto de perspective/transform do container */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-9999 flex items-center justify-center p-4 md:p-10"
            >
              <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                onClick={() => setSelectedProduct(null)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 50 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 300, damping: 25 }
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  y: 50,
                  transition: { duration: 0.2 }
                }}
                className="relative w-full max-w-5xl bg-black/90 border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-[0_0_50px_rgba(var(--primary-rgb),0.2)]"
                style={{
                  clipPath: 'polygon(2% 0%, 98% 0%, 100% 4%, 100% 96%, 98% 100%, 2% 100%, 0% 96%, 0% 4%)'
                }}
              >
                {/* Scanline Effect */}
                <motion.div
                  initial={{ top: "0%", opacity: 0.5 }}
                  animate={{ top: "100%", opacity: 0 }}
                  transition={{ duration: 0.8, ease: "linear" }}
                  className="absolute left-0 w-full h-1 bg-primary/50 z-50 pointer-events-none shadow-[0_0_20px_rgba(var(--primary-rgb),1)]"
                />

                {/* Tech Border SVG */}
                <div className="absolute inset-0 pointer-events-none z-20">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path
                      d="M 2 0 L 98 0 L 100 4 L 100 96 L 98 100 L 2 100 L 0 96 L 0 4 L 2 0 Z"
                      vectorEffect="non-scaling-stroke"
                      className="stroke-1 fill-none stroke-primary/30"
                    />
                  </svg>
                  {/* Corner Accents */}
                  <svg className="absolute top-0 left-0 w-12 h-12 text-primary">
                    <path d="M 2 30 V 2 L 30 2" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <svg className="absolute bottom-0 right-0 w-12 h-12 text-primary">
                    <path d="M 98 70 V 98 L 70 98" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 z-30 p-2 bg-white/5 hover:bg-primary/20 text-white/70 hover:text-primary rounded-full transition-colors cursor-pointer"
                >
                  <X size={24} />
                </button>                {/* Image Section */}
                <div className="w-full md:w-1/2 h-64 md:h-auto relative group">
                  <div className="absolute inset-0 bg-linear-to-r from-black/80 via-transparent to-transparent z-10 md:hidden" />
                  <div className="absolute inset-0 bg-linear-to-l from-black via-transparent to-transparent z-10 hidden md:block" />
                  <img
                    src={selectedProduct.thumbnail}
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Grid Overlay */}
                  <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-20">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 text-primary mb-2">
                        <span className="text-xs font-bold uppercase tracking-[0.2em]">[ Case de Sucesso ]</span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white uppercase leading-tight">
                        {selectedProduct.title}
                      </h2>
                    </div>

                    <div className="h-px w-20 bg-primary/50" />

                    <p className="text-gray-300 leading-relaxed text-lg">
                      {selectedProduct.description || "Projeto desenvolvido com foco em inovação e resultados, utilizando as mais recentes tecnologias do mercado para entregar valor real ao cliente."}
                    </p>

                    <div className="flex flex-wrap gap-3 pt-4">
                      <span className="px-3 py-1 bg-white/5 border border-white/10 text-xs text-white/60 uppercase tracking-wider flex items-center gap-2">
                        <Calendar size={12} /> 2024
                      </span>
                      <span className="px-3 py-1 bg-white/5 border border-white/10 text-xs text-white/60 uppercase tracking-wider flex items-center gap-2">
                        <Tag size={12} /> Tech
                      </span>
                    </div>

                    <div className="pt-8">
                      {selectedProduct.renderLink ? (
                        <a
                          href={selectedProduct.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="z-10 relative group inline-flex items-center justify-center"
                          onMouseEnter={triggerProjectLinkScramble}
                          onMouseLeave={resetProjectLinkHoverState}
                          onFocus={triggerProjectLinkScramble}
                          onBlur={resetProjectLinkHoverState}
                        >
                          {/* Backdrop blur layer */}
                          <div
                            className="absolute inset-0 bg-primary/90 group-hover:bg-primary transition-colors duration-300"
                            style={{
                              clipPath: 'polygon(8% 0%, 100% 0%, 100% 70%, 92% 100%, 0% 100%, 0% 30%)'
                            }}
                          />
                          {/* Border SVG */}
                          <div className="absolute inset-0 pointer-events-none">
                            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                              <path
                                d="M 8 0 L 100 0 L 100 70 L 92 100 L 0 100 L 0 30 L 8 0 Z"
                                vectorEffect="non-scaling-stroke"
                                className="stroke-1 fill-none stroke-white/20 group-hover:stroke-white/40 transition-all duration-300"
                              />
                            </svg>
                            {/* Corner accents */}
                            <svg className="absolute -top-px -left-px w-4 h-4 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <path d="M 0 12 V 0 H 12" fill="none" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            <svg className="absolute -bottom-px -right-px w-4 h-4 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <path d="M 16 4 V 16 H 4" fill="none" stroke="currentColor" strokeWidth="2" />
                            </svg>
                          </div>
                          {/* Content */}
                          <div className="relative z-10 flex items-center px-8 py-4">
                            <TextScramble
                              as="span"
                              className="text-sm font-semibold uppercase tracking-[0.2em] text-black"
                              duration={0.8}
                              speed={0.035}
                              trigger={projectLinkPlayId > 0}
                              playId={projectLinkPlayId}
                            >
                              {"Ver Projeto Online"}
                            </TextScramble>
                            <ExternalLink className="ml-3 size-4 shrink-0 text-black transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-125" />
                          </div>
                        </a>
                      ) : (
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 text-white/40 cursor-not-allowed">
                          <span className="font-bold uppercase tracking-widest text-sm">Projeto Interno / Confidencial</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export const Header = () => {
  const headerRef = React.useRef<HTMLDivElement>(null);
  const { triggered: headerTriggered, playId: headerPlayId } = useScrambleTrigger(headerRef, { threshold: 0.35, once: true });

  return (
    <div ref={headerRef} className="relative mx-auto py-40 w-full left-0 top-0">
      {/* Background Tech Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full flex flex-col md:flex-row justify-start items-center relative z-20"
      >
        <div className="h-[0.1px] w-1/9 bg-primary"></div>
        <div className="flex items-center px-10 gap-18">
          <div className="space-y-4 ">
            <TextScramble
              as="span"
              className="text-md font-extralight uppercase text-primary tracking-[0.2em]"
              duration={1}
              speed={0.03}
              trigger={headerTriggered}
              playId={headerPlayId}
            >
              {"[5. nosso_portifolio]"}
            </TextScramble>
            <h3 className="text-4xl md:text-5xl font-light uppercase leading-tight whitespace-nowrap">
              nosso <TextScramble
                className="text-primary font-semibold"
                duration={1}
                speed={0.03}
                trigger={headerTriggered}
                playId={headerPlayId}
              > portifólio</TextScramble>
            </h3>
          </div>
          <p className="text-muted-foreground text-sm md:text-md text-right md:text-left">
            Nascemos no Inteli para transformar o ecossistema universitário e <span className='text-white/70 font-semibold'>gerar valor real para a sociedade</span>.
          </p>
        </div>
        <div className="h-[0.1px] w-1/9 bg-primary"></div>
      </motion.div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
  onClick,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
    description?: string;
    renderLink?: boolean;
  };
  translate: MotionValue<number>;
  onClick: () => void;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-72 w-lg relative shrink-0 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-full w-full group overflow-visible pointer-events-auto">
        {/* Clipped content container */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath: 'polygon(5% 0%, 95% 0%, 100% 8%, 100% 92%, 95% 100%, 5% 100%, 0% 92%, 0% 8%)'
          }}
        >
          {/* Image */}
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 90vw, 420px"
            className="object-cover object-top absolute h-full w-full inset-0 transition-transform duration-700 group-hover/product:scale-110"
            loading="lazy"
            decoding="async"
            quality={70}
            onError={({ currentTarget }) => {
              currentTarget.src = 'https://placehold.co/600x400/1a1a1a/ff4d3a?text=' + encodeURIComponent(product.title);
            }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover/product:opacity-90 transition-opacity duration-500" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-18 group-hover/product:translate-y-0 transition-transform duration-500 ease-out">
            {/* Title */}
            <h2 className="text-2xl font-bold text-white mb-2">
              {product.title}
            </h2>

            {/* Description */}
            <p className="text-white/70 text-sm mb-4 opacity-0 group-hover/product:opacity-100 transition-opacity duration-500 delay-100 line-clamp-3">
              {product.description || "Clique para ver mais detalhes sobre este projeto."}
            </p>

            {/* CTA Hint */}
            <div className="opacity-0 group-hover/product:opacity-100 transition-opacity duration-500 delay-200">
              <span className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                Ver Detalhes <ExternalLink size={14} />
              </span>
            </div>
          </div>
        </div>

        {/* SVG Tech Border - outside clip-path */}
        <div className="absolute inset-0 pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 5 0 L 95 0 L 100 8 L 100 92 L 95 100 L 5 100 L 0 92 L 0 8 L 5 0 Z"
              vectorEffect="non-scaling-stroke"
              className="stroke-1 fill-none stroke-white/20 group-hover/product:stroke-primary/60 transition-colors duration-300"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};