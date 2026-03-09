"use client"
import {
    Briefcase,
    Home as HomeIcon,
    Layers,
    LucideIcon,
    Mail,
    User,
    Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useState } from "react";

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

    if (!items.length) return null;

    return (
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
                                className="group relative grid h-9 w-9 place-items-center rounded text-white/70 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                                aria-label={label}
                            >
                                <Icon
                                    className="size-8 duration-150 group-hover:text-primary"
                                    strokeWidth={isHovered ? 1.9 : 0.8}
                                    absoluteStrokeWidth
                                />
                                <span className="pointer-events-none absolute left-12 bg-black/50 px-2 py-1 font-semibold uppercase tracking-wide text-primary opacity-0 transition-opacity group-hover:opacity-100">
                                    {label}
                                </span>
                            </a>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}

export default NavigationRail;
