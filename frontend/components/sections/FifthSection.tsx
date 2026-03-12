import Image from "next/image";
import { Briefcase, Github, Linkedin, Mail } from "lucide-react";

export default function FifthSection() {
    return (
        <footer
            data-graph-profile
            data-graph-line="0.18"
            data-graph-node="0.26"
            className="footer-sticky border-t border-white/15"
        >
            <div className="absolute inset-0">
                <Image
                    src="/images/foto7.jpg"
                    alt="Background"
                    fill
                    sizes="100vw"
                    className="h-full w-full object-cover opacity-40"
                    priority
                    fetchPriority="high"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-6 hidden w-px bg-white/10 md:block" />
            <div className="pointer-events-none absolute inset-y-0 right-6 hidden w-px bg-white/10 md:block" />

            <div className="relative z-10 w-full px-4 text-center lg:pl-28 lg:pr-10" data-footer-parallax>
                <div className="mb-8 text-xs font-bold uppercase tracking-[0.3em] text-primary" data-split>
                    [6. contato]
                </div>

                <a href="mailto:contato@intelijunior.com" className="group relative mx-auto block w-fit overflow-hidden">
                    <span className="font-display block text-[clamp(3rem,12vw,11rem)] leading-[0.85] tracking-tighter uppercase transition-transform duration-500 group-hover:-translate-y-full">
                        <span className="font-semibold">CONTATO</span>
                    </span>
                    <span className="font-display absolute top-0 left-0 block translate-y-full text-[clamp(3rem,12vw,11rem)] leading-[0.85] tracking-tighter text-primary uppercase transition-transform duration-500 group-hover:translate-y-0">
                        <span className="font-semibold">CONTATO</span>
                    </span>
                </a>

                <p className="mx-auto mt-6 max-w-xl uppercase tracking-[0.16em] text-white/80" data-split>
                    Vamos construir o futuro? Nosso time está pronto para entender seu desafio.
                </p>

                <div className="mt-24 flex w-full flex-col items-center justify-between gap-10 px-6 text-xs uppercase tracking-[0.2em] text-white md:flex-row md:px-12">
                    <div className="text-sx md:text-left flex flex-col items-center text-white/70 hover:text-primary gap-1 duration-200">
                        <span className="block" data-split>© 2026 Inteli Júnior</span>
                        <span className="block" data-split>Butantã, São Paulo - SP</span>
                        <span className="block" data-split>48.820.726/0001-05</span>

                    </div>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-white/80">
                        <a href="#servicos" className="group inline-flex flex-col items-center gap-2 hover:text-primary transition-colors justify-center">
                            <Briefcase className="size-10 md:size-20 transition-colors group-hover:text-primary" strokeWidth={0.4} />
                            <span className="">Serviços</span>
                        </a>
                        <a href="https://www.linkedin.com/company/inteli-junior" target="_blank" rel="noreferrer" className="group inline-flex flex-col items-center gap-2 hover:text-primary transition-colors justify-center">
                            <Linkedin className="size-10 md:size-20 transition-colors group-hover:text-primary" strokeWidth={0.4} />
                            <span>LinkedIn</span>
                        </a>
                        <a href="mailto:contato@intelijunior.com" className="group inline-flex flex-col items-center gap-2 hover:text-primary transition-colors justify-center">
                            <Mail className="size-10 md:size-20 transition-colors group-hover:text-primary" strokeWidth={0.4} />
                            <span>E-mail</span>
                        </a>
                    </div>
                    <a
                        href="https://github.com/souzajv"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-primary"
                        aria-label="GitHub de João Campos"
                    >
                        <Github className="size-4 md:size-6" />
                        <span className="text-[12px] md:text-sm font-bold uppercase tracking-[0.16em]">Made by João Campos</span>
                    </a>

                </div>
            </div>
        </footer>
    );
}
