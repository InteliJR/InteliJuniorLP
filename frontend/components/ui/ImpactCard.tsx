"use client";
import React from "react";
import { m } from "framer-motion";
import { TextScramble } from "../ui/textScramble";

interface ImpactCardProps {
    value: string;
    label: string;
    description: string;
    icon: React.ReactNode;
    highlight?: boolean;
    delay?: number;
    className?: string;
}

export const ImpactCard: React.FC<ImpactCardProps> = ({
    value,
    label,
    description,
    icon,
    highlight = false,
    delay = 0,
    className = "",
}) => {
    return (
        <m.div
            className={`relative group overflow-visible ${highlight ? "md:-mt-4 md:mb-4" : ""} ${className}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut", delay }}
        >
            <div className="absolute inset-0 pointer-events-none z-30">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path
                        d="M 20 0 L 100 0 L 100 80 L 80 100 L 0 100 L 0 20 L 20 0 Z"
                        vectorEffect="non-scaling-stroke"
                        className={`fill-none transition-all duration-300 ${highlight
                            ? "stroke-[1.5] stroke-primary/60 group-hover:stroke-primary"
                            : "stroke-1 stroke-white/25 group-hover:stroke-primary"
                            }`}
                    />
                </svg>
            </div>
            <div className="absolute top-3 right-3 z-40 pointer-events-none">
                <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${highlight
                    ? "bg-primary animate-pulse"
                    : "bg-white/40 group-hover:bg-primary"
                    }`} />
            </div>
            <svg className={`absolute -top-px -left-px w-8 h-8 text-primary transition-opacity duration-300 pointer-events-none z-40 ${highlight ? "opacity-70 group-hover:opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                <path d="M 0 20 V 0 H 20" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
            <svg className={`absolute -bottom-px -right-px w-8 h-8 text-primary transition-opacity duration-300 pointer-events-none z-40 ${highlight ? "opacity-70 group-hover:opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                <path d="M 32 12 V 32 H 12" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
            <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: 'polygon(20% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%, 0% 20%)' }}
            >
                <div className={`absolute inset-0 bg-size-[20px_20px] z-0 pointer-events-none ${highlight
                    ? "bg-[linear-gradient(rgba(255,77,58,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,77,58,0.03)_1px,transparent_1px)]"
                    : "bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]"
                    }`} />
                <div className={`absolute inset-0 ${highlight
                    ? "bg-linear-to-b from-black/80 via-primary/10 to-black/90"
                    : "bg-linear-to-b from-black/85 via-primary/5 to-black/90"
                    }`} />
                <div className={`absolute blur-3xl transition-opacity duration-500 ${highlight
                    ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/40 opacity-40 group-hover:opacity-70"
                    : "top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/30 opacity-50 group-hover:opacity-80"
                    }`} />
                <div className={`absolute inset-0 pointer-events-none z-10 ${highlight
                    ? "shadow-(--shadow-inner-primary-premium)"
                    : "shadow-(--shadow-inner-glass-premium)"
                    }`} />
            </div>
            <div
                className="absolute inset-0 backdrop-blur-[1.2px] z-5 pointer-events-none"
                style={{ clipPath: 'polygon(20% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%, 0% 20%)' }}
            />
            <div className={`relative z-20 p-10 h-full flex flex-col justify-between ${highlight ? "min-h-80" : "min-h-70"}`}>
                <div className="flex justify-end">
                    <div className={`w-fit p-4 transition-colors duration-300 ${highlight
                        ? "bg-primary/10 border border-primary/40 group-hover:border-primary group-hover:bg-primary/20 shadow-[0_0_20px_rgba(255,77,58,0.2)]"
                        : "bg-white/5 border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10"
                        }`}
                        style={{ clipPath: 'polygon(15% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%, 0% 15%)' }}>
                        <div className={highlight ? "text-primary" : "text-white group-hover:text-primary transition-colors duration-300"}>
                            {icon}
                        </div>
                    </div>
                </div>

                <div className="transform transition-all duration-500 group-hover:translate-x-1">
                    <div className="mb-3">
                        <TextScramble
                            as="span"
                            className={`font-bold text-primary ${highlight ? "text-7xl md:text-8xl" : "text-6xl md:text-7xl"}`}
                            duration={1.5}
                            speed={0.05}
                            trigger={true}
                        >
                            {value}
                        </TextScramble>
                    </div>
                    <span className={`text-white font-semibold block uppercase tracking-wider ${highlight ? "text-xl mb-2" : "text-lg mb-1"}`}>
                        {label}
                    </span>
                    <p className={`text-sm leading-relaxed transition-colors ${highlight
                        ? "text-white/60 group-hover:text-white/80"
                        : "text-white/50 group-hover:text-white/70"
                        }`}>
                        {description}
                    </p>
                </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-primary to-transparent opacity-0 group-hover:animate-scan-line pointer-events-none z-50 shadow-[0_0_15px_rgba(255,77,58,0.5)]" />
        </m.div>
    );
};
