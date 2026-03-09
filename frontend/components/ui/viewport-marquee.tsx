"use client";

import { cn } from "@/lib/utils";

type ViewportMarqueeProps = {
    children: React.ReactNode;
    className?: string;
    trackClassName?: string;
    groupClassName?: string;
    durationSeconds?: number;
};

export default function ViewportMarquee({
    children,
    className,
    trackClassName,
    groupClassName,
    durationSeconds = 40,
}: ViewportMarqueeProps) {
    return (
        <div className={cn("relative overflow-hidden", className)}>
            <div
                className={cn("marquee-track-seamless flex w-max", trackClassName)}
                style={{
                    animation: `marquee-seamless ${durationSeconds}s linear infinite`,
                }}
            >
                <div className={cn("flex shrink-0", groupClassName)}>{children}</div>
                <div className={cn("flex shrink-0", groupClassName)} aria-hidden>
                    {children}
                </div>
            </div>
        </div>
    );
}
