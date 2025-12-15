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
    ssr: true,
    loading: () => (
      <section id="quem-somos" className="relative min-h-[300vh] bg-background" aria-hidden="true" />
    )
  }
);

const ThirdSection = dynamic(
  () => import('@/components/sections/ThirdSection'),
  {
    ssr: true,
    loading: () => (
      <section id="trajetoria" className="relative min-h-[50vh] bg-background" aria-hidden="true" />
    )
  }
);

const FourthSection = dynamic(
  () => import('@/components/sections/FourthSection'),
  {
    ssr: true,
    loading: () => (
      <section id="servicos" className="relative min-h-screen bg-background" aria-hidden="true" />
    )
  }
);

const FifthSection = dynamic(
  () => import('@/components/sections/FifthSection'),
  {
    ssr: true,
    loading: () => (
      <section id="cases" className="relative min-h-[300vh] bg-background" aria-hidden="true" />
    )
  }
);

const SixthSection = dynamic(
  () => import('@/components/sections/SixthSection'),
  {
    ssr: true,
    loading: () => (
      <section id="depoimentos" className="relative min-h-[80vh] bg-background" aria-hidden="true" />
    )
  }
);

const Footer = dynamic(
  () => import('@/components/sections/Footer'),
  {
    ssr: true,
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
      <FifthSection />
      <SixthSection />
      <Footer />
    </main>
  );
}
