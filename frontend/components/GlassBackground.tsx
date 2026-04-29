export default function GlassBackground({ children, cn }: { children: React.ReactNode; cn?: string }) {
    return (
        <div className={`rounded-full bg-white/5 supports-backdrop-filter:bg-white/5 border-[0.5px] border-white/10 backdrop-blur-[1.5px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),var(--shadow-inner-glass)] transition duration-200 ${cn}`}>
            {children}
        </div>
    );
}