export default function GlassBackground({ children, cn }: { children: React.ReactNode; cn?: string }) {
    return (
        <div className={`rounded-full bg-white/2 supports-backdrop-filter:bg-white/3 border-[0.5px] border-white/10 backdrop-blur-[1.3px] shadow-2xl transition duration-200 ${cn}`}>
            {children}
        </div>
    );
}