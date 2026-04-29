"use client";
import React from "react";

interface TechCardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    icon?: React.ReactNode;
    highlight?: boolean;
}

export const TechCard: React.FC<TechCardProps> = ({
    children,
    className = "",
    title,
    icon,
    highlight = false,
}) => {
    return (
        <div className={`relative group ${className}`}>
            {/* Dynamic SVG Background / Border Shape */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Main Border Path */}
                <svg
                    className="w-full h-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    {/* The tech shape outline */}
                    <path
                        d="M 20 0 L 100 0 L 100 80 L 80 100 L 0 100 L 0 20 L 20 0 Z"
                        vectorEffect="non-scaling-stroke"
                        className={`stroke-1 fill-none transition-all duration-500 ${highlight
                            ? "stroke-primary/60 group-hover:stroke-primary"
                            : "stroke-white/25 group-hover:stroke-primary"
                            }`}
                    />
                </svg>

                {/* Clipped Background - apenas quando highlight */}
                <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: 'polygon(20% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%, 0% 20%)' }}
                >
                    {/* Background com gradiente vermelho */}
                    <div className={`absolute inset-0 ${highlight
                        ? "bg-linear-to-b from-black/80 via-primary/10 to-black/90"
                        : "bg-white/5"
                        }`} />

                    {/* Glow de fundo para highlight */}
                    {highlight && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/30 blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                    )}

                    {/* Brilho interno premium */}
                    {highlight && (
                        <div className="absolute inset-0 shadow-(--shadow-inner-primary-premium) pointer-events-none" />
                    )}
                </div>

                {/* Decorative HUD Elements */}
                <div className="absolute top-0 right-0 p-2">
                    <div
                        className={`w-2 h-2 rounded-full ${highlight
                            ? "bg-primary animate-pulse"
                            : "bg-white/40 group-hover:bg-primary"
                            }`}
                    />
                </div>
                <div className="absolute bottom-0 left-0 p-2">
                    <div className="w-16 h-0.5 bg-linear-to-r from-primary/0 via-primary/50 to-primary/0 opacity-50" />
                </div>

                {/* Corner Accents - apenas para cards sem highlight */}
                {!highlight && (
                    <>
                        <svg className="absolute -top-px -left-px w-8 h-8 text-primary transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                            <path
                                d="M 0 20 V 0 H 20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            />
                        </svg>
                        <svg className="absolute -bottom-px -right-px w-8 h-8 text-primary transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                            <path
                                d="M 32 12 V 32 H 12"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            />
                        </svg>
                    </>
                )}
            </div>

            {/* Content Container (Padding to fit inside shape) */}
            <div className="relative z-10 p-6 h-full flex flex-col">
                {/* Card Header */}
                {(title || icon) && (
                    <div className="flex items-center gap-3 pl-4 mb-4 border-b border-white/25 pb-3">
                        {icon && (
                            <div className={`${highlight ? "text-white" : "text-primary"}`}>
                                {icon}
                            </div>
                        )}
                        {title && (
                            <div className="flex flex-col">
                                <span
                                    className={`text-sm font-bold tracking-[0.2em] uppercase ${highlight ? "text-white" : "text-primary"
                                        }`}
                                >
                                    {title}
                                </span>
                            </div>
                        )}
                    </div>
                )}

                <div className="flex-1">{children}</div>
            </div>
        </div>
    );
};

export default TechCard;
