import { useEffect, useState, RefObject } from "react";

export function useScrambleTrigger<T extends Element = Element>(
    ref: RefObject<T | null>,
    options?: { threshold?: number; once?: boolean }
) {
    const [triggered, setTriggered] = useState(false);
    const [playId, setPlayId] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (options?.once !== false && triggered) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTriggered(true);
                        setPlayId((prev) => prev + 1);
                        if (options?.once !== false) {
                            observer.disconnect();
                        }
                    }
                });
            },
            { threshold: options?.threshold ?? 0.35 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [ref, triggered, options?.threshold, options?.once]);

    return { triggered, playId } as const;
}
