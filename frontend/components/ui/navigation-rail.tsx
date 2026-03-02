import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type NavigationRailItem = {
    label: string;
    href: string;
    Icon: LucideIcon;
};

type NavigationRailProps = {
    items: NavigationRailItem[];
    className?: string;
};

export function NavigationRail({ items, className }: NavigationRailProps) {
    if (!items.length) return null;

    return (
        <aside
            className={cn(
                "fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 lg:block",
                className,
            )}
            aria-label="Navegação lateral"
        >
            <nav>
                <div className="flex flex-col gap-2 rounded-full border border-white/20 bg-white/10 p-2 shadow-lg shadow-black/20 backdrop-blur">
                    {items.map(({ href, label, Icon }) => (
                        <a
                            key={href}
                            href={href}
                            className="group relative grid h-11 w-11 place-items-center rounded-full text-white/80 transition hover:-translate-y-0.5 hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                            aria-label={label}
                        >
                            <Icon className="h-5 w-5" />
                            <span className="pointer-events-none absolute left-14 rounded bg-white px-2 py-1 text-xs font-semibold uppercase tracking-wide text-[#ff4d3a] opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                                {label}
                            </span>
                        </a>
                    ))}
                </div>
            </nav>
        </aside>
    );
}

export default NavigationRail;
