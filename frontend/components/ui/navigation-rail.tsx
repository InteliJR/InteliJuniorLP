"use client"
import {
    Briefcase,
    Home as HomeIcon,
    Layers,
    LucideIcon,
    Mail,
    Menu,
    User,
    Users,
    X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export type NavigationRailItem = {
    label: string;
    href: string;
    Icon: LucideIcon;
};

type NavigationRailProps = {
    items?: NavigationRailItem[];
    className?: string;
};

const defaultItems: NavigationRailItem[] = [
    { label: "Home", href: "#hero", Icon: HomeIcon },
    { label: "Quem somos", href: "#quem-somos", Icon: User },
    { label: "Portfólio", href: "#portfolio", Icon: Briefcase },
    { label: "Serviços", href: "#servicos", Icon: Layers },
    { label: "Membros", href: "#membros", Icon: Users },
    { label: "Contato", href: "#contato", Icon: Mail },
];

export function NavigationRail({ items = defaultItems, className }: NavigationRailProps) {
    const [hoveredHref, setHoveredHref] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (!isMobileMenuOpen) {
            document.body.style.overflow = "";
            return;
        }

        document.body.style.overflow = "hidden";
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsMobileMenuOpen(false);
        };

        window.addEventListener("keydown", handleEsc);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleEsc);
        };
    }, [isMobileMenuOpen]);

    if (!items.length) return null;

    return (
        <>
            <button
                type="button"
                className="fixed top-4 right-4 z-50 grid h-11 w-11 place-items-center border border-white/20 bg-black/40 text-white backdrop-blur-md transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 lg:hidden"
                aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation-drawer"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
                {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>

            <div
                className={cn(
                    "fixed inset-0 z-40 bg-black/60 backdrop-blur-[1px] transition-opacity duration-300 lg:hidden",
                    isMobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
                )}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden="true"
            />

            <aside
                id="mobile-navigation-drawer"
                className={cn(
                    "fixed inset-y-0 right-0 z-50 w-[min(82vw,22rem)] border-l border-white/15 bg-[rgba(var(--brand-deep-rgb),0.42)] px-6 py-8 backdrop-blur-xl transition-transform duration-300 ease-out lg:hidden",
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
                )}
                aria-label="Menu de navegação"
            >
                <div className="mt-16 flex h-full flex-col">
                    <span className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-white/55">Navegação</span>
                    <nav className="flex flex-col gap-2">
                        {items.map(({ href, label, Icon }) => (
                            <a
                                key={href}
                                href={href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="group inline-flex min-h-11 items-center gap-3 border border-white/10 bg-white/5 px-4 py-3 text-white/85 transition hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                                aria-label={label}
                            >
                                <Icon className="size-5" strokeWidth={1.6} absoluteStrokeWidth />
                                <span className="text-sm font-semibold uppercase tracking-[0.12em]">{label}</span>
                            </a>
                        ))}
                    </nav>
                </div>
            </aside>

            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-40 hidden w-14.5 border-r border-white/12 bg-black/30 backdrop-blur-sm lg:block",
                    className,
                )}
                aria-label="Navegação lateral"
            >
                <div className="flex h-full flex-col items-center py-4">
                    <nav className="mt-2 flex flex-1 flex-col items-center justify-center gap-10">
                        {items.map(({ href, label, Icon }) => {
                            const isHovered = hoveredHref === href;

                            return (
                                <a
                                    key={href}
                                    href={href}
                                    onMouseEnter={() => setHoveredHref(href)}
                                    onMouseLeave={() => setHoveredHref(null)}
                                    className="group relative grid h-9 w-9 place-items-center text-white/70 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                                    aria-label={label}
                                >
                                    <Icon
                                        className="size-8 duration-150 group-hover:text-primary"
                                        strokeWidth={isHovered ? 1.9 : 0.8}
                                        absoluteStrokeWidth
                                    />
                                    <span className="pointer-events-none absolute left-12 bg-black/20 px-2 py-1 font-semibold uppercase tracking-wide text-primary opacity-0 transition-opacity group-hover:opacity-100">
                                        {label}
                                    </span>
                                </a>
                            );
                        })}
                    </nav>
                </div>
            </aside>
        </>
    );
}

export default NavigationRail;
