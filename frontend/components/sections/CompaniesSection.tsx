"use client";


import React from "react";
import { m } from "framer-motion";
import { TextScramble } from "../ui/textScramble";
import { CompaniesCarousel } from "../CompaniesCarousel";

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

export default function CompaniesSection() {
  const [companiesTriggered, setCompaniesTriggered] = React.useState(false);
  const [companiesPlayId, setCompaniesPlayId] = React.useState(0);

  return (
    <section id="solucoes" className="relative w-full pt-6 md:pt-10 pb-20 md:pb-28 overflow-hidden">
      <div className="mx-auto flex flex-col w-full items-center justify-center">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center justify-center gap-4 w-full max-w-4xl text-center px-8 mb-12 md:mb-16"
          onViewportEnter={() => {
            if (!companiesTriggered) {
              setCompaniesTriggered(true);
              setCompaniesPlayId((prev) => prev + 1);
            }
          }}
        >
          <TextScramble
            as="span"
            className="text-sm font-extralight uppercase text-primary tracking-[0.2em]"
            duration={1}
            speed={0.03}
            trigger={companiesTriggered}
            playId={companiesPlayId}
          >
            {"[Experiência real com o mercado]"}
          </TextScramble>
          <h3 className="text-3xl md:text-4xl font-light uppercase leading-tight">
            Nossos membros já{" "}
            <TextScramble
              as="span"
              className="text-primary font-semibold"
              duration={1}
              speed={0.03}
              trigger={companiesTriggered}
              playId={companiesPlayId}
            >
              {"desenvolveram soluções"}
            </TextScramble>
            <br />
            para essas empresas
          </h3>
          <p className="text-white/70 text-md max-w-2xl leading-relaxed">
            Durante a formação no Inteli, nossos membros trabalham em projetos reais com grandes empresas do mercado.
            Essa experiência prática nos diferencia:{" "}
            <span className="text-white font-semibold">
              chegamos preparados para entregar resultados de verdade
            </span>.
          </p>
        </m.div>
        <CompaniesCarousel companies={companies} />
      </div>
    </section>
  );
}
