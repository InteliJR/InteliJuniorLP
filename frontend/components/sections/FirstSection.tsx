import HeroHeader from "@/components/ui/hero-header";

export default function FirstSection() {
    return (
        <section
            data-graph-profile
            data-graph-line="0.07"
            data-graph-node="0.11"
            className="relative isolate min-h-screen overflow-hidden bg-(--surface-hero) text-white"
        >

            <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(var(--brand-deep-rgb),0.36)_0%,rgba(var(--brand-deep-rgb),0.14)_24%,rgba(var(--brand-primary-rgb),0)_48%),linear-gradient(180deg,rgba(var(--brand-primary-rgb),0)_40%,rgba(var(--brand-primary-rgb),0.08)_62%,rgba(var(--brand-deep-rgb),0.34)_84%,rgba(var(--brand-deep-rgb),0.52)_100%),radial-gradient(120%_72%_at_0%_50%,rgba(var(--brand-deep-rgb),0.24)_0%,rgba(var(--brand-deep-rgb),0.1)_45%,rgba(var(--brand-primary-rgb),0)_74%),radial-gradient(120%_72%_at_100%_50%,rgba(var(--brand-deep-rgb),0.24)_0%,rgba(var(--brand-deep-rgb),0.1)_45%,rgba(var(--brand-primary-rgb),0)_74%)]" />
            <div className="pointer-events-none absolute inset-0 z-0 opacity-70 blur-[2px] bg-[radial-gradient(70%_38%_at_50%_50%,rgba(var(--brand-primary-rgb),0.1)_0%,rgba(var(--brand-primary-rgb),0.05)_40%,rgba(var(--brand-primary-rgb),0)_100%)]" />

            <HeroHeader />
        </section>
    );
}
