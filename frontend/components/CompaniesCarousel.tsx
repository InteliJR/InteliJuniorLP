'use client';

import React, { useRef, useEffect, useState } from 'react';
import { m } from 'framer-motion';

interface Company {
    name: string;
    logo: string;
    className?: string;
}

interface CompaniesCarouselProps {
    companies: Company[];
    className?: string;
}

export function CompaniesCarousel({ companies, className = '' }: CompaniesCarouselProps) {
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const [isCarouselVisible, setIsCarouselVisible] = useState(false);

    useEffect(() => {
        if (!carouselRef.current) return;
        const el = carouselRef.current;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsCarouselVisible(entry.isIntersecting);
            },
            { threshold: 0 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            ref={carouselRef}
            className={`relative w-full group/carousel ${className}`}
        >
            <div className="absolute inset-0 bg-white/4 backdrop-blur-[1px] border-y border-white/10">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[20px_20px] opacity-30" />
                <div className="absolute -top-px -left-px w-4 h-4 border-l-2 border-t-2 border-primary/50" />
                <div className="absolute -top-px -right-px w-4 h-4 border-r-2 border-t-2 border-primary/50" />
                <div className="absolute -bottom-px -left-px w-4 h-4 border-l-2 border-b-2 border-primary/50" />
                <div className="absolute -bottom-px -right-px w-4 h-4 border-r-2 border-b-2 border-primary/50" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-[1px] bg-primary/50" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-[1px] bg-primary/50" />
            </div>
            <div className="relative flex overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <div
                    className={`flex shrink-0 items-center ${isCarouselVisible ? 'animate-marquee' : ''} group-hover/carousel:paused`}
                >
                    {companies.map((company, index) => (
                        <div
                            key={`first-${index}`}
                            className="mx-12 flex items-center justify-center group/item min-w-[100px] relative"
                        >
                            <div className="absolute inset-0 -z-10 bg-primary/0 blur-2xl rounded-full transition-all duration-300 scale-125 group-hover/item:bg-primary/50 group-hover/item:scale-150" />
                            <img
                                src={company.logo}
                                alt={company.name}
                                width={200}
                                height={80}
                                loading="lazy"
                                decoding="async"
                                className={`${company.className || 'h-12'} w-auto object-contain opacity-50 brightness-0 invert transition-all duration-300 group-hover/item:opacity-100 relative z-10`}
                            />
                        </div>
                    ))}
                </div>
                <div
                    className={`flex shrink-0 items-center ${isCarouselVisible ? 'animate-marquee' : ''} group-hover/carousel:paused`}
                >
                    {companies.map((company, index) => (
                        <div
                            key={`second-${index}`}
                            className="mx-12 flex items-center justify-center group/item min-w-[100px] relative"
                        >
                            <div className="absolute inset-0 -z-10 bg-primary/0 blur-2xl rounded-full transition-all duration-300 scale-125 group-hover/item:bg-primary/50 group-hover/item:scale-150" />
                            <img
                                src={company.logo}
                                alt={company.name}
                                width={200}
                                height={80}
                                loading="lazy"
                                decoding="async"
                                className={`${company.className || 'h-12'} w-auto object-contain opacity-50 brightness-0 invert transition-all duration-300 group-hover/item:opacity-100 group-hover/item:brightness-100 group-hover/item:invert-0 relative z-10`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </m.div>
    );
}

export default CompaniesCarousel;
