"use client";

import { MessageCircle } from "lucide-react";

export default function ContactFloatingButton() {
  const scrollToContact = () => {
    document.getElementById("contato")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToContact}
      aria-label="Quero entrar em contato"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full border border-white/15 bg-[#090b14]/95 p-1.5 pr-4 text-left shadow-[0_10px_35px_rgba(0,0,0,0.45)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-primary/80 hover:bg-[#101321] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:bottom-7 sm:right-7"
    >
      <span className="flex size-11 items-center justify-center rounded-full border border-primary/60 bg-primary text-primary-foreground shadow-[0_0_22px_rgba(255,77,58,0.38)] transition duration-300 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(255,77,58,0.62)]">
        <MessageCircle aria-hidden="true" className="size-5" strokeWidth={2} />
      </span>
      <span className="hidden text-xs font-semibold uppercase tracking-[0.12em] text-white sm:block">
        Quero entrar em contato
      </span>
    </button>
  );
}
