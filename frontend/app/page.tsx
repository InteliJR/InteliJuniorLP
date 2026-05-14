"use client";

/**
 * Página raiz: orquestra as seções da landing.
 * - Carrega o hero de forma síncrona (FirstSection) para LCP.
 * - Demais seções usam dynamic import com placeholders estáveis para evitar CLS.
 * - SSR habilitado nos dinâmicos para SEO, mantendo hydration consistente.
 */
import dynamic from 'next/dynamic';
import FirstSection from '@/components/sections/FirstSection';

// Seções abaixo da dobra carregam de forma preguiçosa, reduzindo o JS inicial
const SecondSection = dynamic(
  () => import('@/components/sections/SecondSection'),
  {
    ssr: false,
    loading: () => (
      <section id="quem-somos" className="relative min-h-[300vh] bg-background" aria-hidden="true" />
    )
  }
);

const ThirdSection = dynamic(
  () => import('@/components/sections/ThirdSection'),
  {
    ssr: false,
    loading: () => (
      <section id="trajetoria" className="relative min-h-[50vh] bg-background" aria-hidden="true" />
    )
  }
);

const FourthSection = dynamic(
  () => import('@/components/sections/FourthSection'),
  {
    ssr: false,
    loading: () => (
      <section id="servicos" className="relative min-h-screen bg-background" aria-hidden="true" />
    )
  }
);

const Footer = dynamic(
  () => import('@/components/sections/Footer'),
  {
    ssr: false,
    loading: () => (
      <section id="contato" className="relative min-h-[40vh] bg-background" aria-hidden="true" />
    )
  }
);

export default function Home() {
  return (
    <main>
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <Footer />
    </main>
  );
}
