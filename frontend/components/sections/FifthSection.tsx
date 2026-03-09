import Image from "next/image";

export default function FifthSection() {
    return (
        <footer
            id="contato"
            data-graph-profile
            data-graph-line="0.18"
            data-graph-node="0.26"
            className="footer-sticky border-t border-white/15"
        >
            <div className="absolute inset-0">
                <Image
                    src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/1c6b6980-54e4-4d8c-9ff6-e09b844d7b01_3840w.webp"
                    alt="Background"
                    fill
                    sizes="100vw"
                    className="h-full w-full object-cover opacity-20 grayscale"
                    priority
                    fetchPriority="high"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-6 hidden w-px bg-white/10 md:block" />
            <div className="pointer-events-none absolute inset-y-0 right-6 hidden w-px bg-white/10 md:block" />

            <div className="relative z-10 w-full px-4 text-center lg:pl-28 lg:pr-10" data-footer-parallax>
                <div className="mb-8 text-xs font-semibold uppercase tracking-[0.3em] text-white/55" data-split>
                    [7. contato]
                </div>

                <a href="mailto:contato@intelijunior.com" className="group relative mx-auto block w-fit overflow-hidden">
                    <span className="font-display block text-[clamp(3rem,12vw,11rem)] leading-[0.85] tracking-tighter uppercase transition-transform duration-500 group-hover:-translate-y-full">
                        <span className="font-semibold">CONTATO</span>
                    </span>
                    <span className="font-display absolute top-0 left-0 block translate-y-full text-[clamp(3rem,12vw,11rem)] leading-[0.85] tracking-tighter text-primary uppercase transition-transform duration-500 group-hover:translate-y-0">
                        <span className="font-semibold">CONTATO</span>
                    </span>
                </a>

                <p className="mx-auto mt-6 max-w-xl text-sm uppercase tracking-[0.16em] text-white/55" data-split>
                    Vamos construir o futuro? Nosso time está pronto para entender seu desafio.
                </p>

                <div className="mt-24 flex w-full flex-col items-center justify-between gap-10 px-6 text-xs uppercase tracking-[0.2em] text-white/70 md:flex-row md:px-12">
                    <div className="text-[12px] text-white/60 md:text-left">
                        <span className="block" data-split>© 2025 Inteli Júnior</span>
                        <span className="block" data-split>Butantã, São Paulo - SP</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                        <a href="#servicos" className="hover:text-white transition-colors" data-split>Serviços</a>
                        <a href="https://www.linkedin.com/company/inteli-junior" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" data-split>LinkedIn</a>
                        <a href="mailto:contato@intelijunior.com" className="hover:text-white transition-colors" data-split>E-mail</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
