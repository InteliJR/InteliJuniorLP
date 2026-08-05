"use client";


import dynamic from 'next/dynamic';
import FirstSection from '@/components/sections/FirstSection';
import ContactFloatingButton from '@/components/ContactFloatingButton';

const FourthSection = dynamic(
  () => import('@/components/sections/FourthSection'),
  {
    ssr: false,
    loading: () => (
      <section id="servicos" className="relative min-h-screen bg-background" aria-hidden="true" />
    )
  }
);

const CompaniesSection = dynamic(
  () => import('@/components/sections/CompaniesSection'),
  {
    ssr: false,
    loading: () => (
      <section id="solucoes" className="relative min-h-[80vh] bg-background" aria-hidden="true" />
    )
  }
);

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
      <FourthSection />
      <CompaniesSection />
      <SecondSection />
      <ThirdSection />
      <Footer />
      <ContactFloatingButton />
    </main>
  );
}
