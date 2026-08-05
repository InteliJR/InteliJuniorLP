"use client";


import { ReactLenis } from "lenis/react";
import { useIsMobile } from "@/hooks/useIsMobile";

function SmoothScrolling({ children }: { children: React.ReactNode }) {
    const isMobile = useIsMobile();

    if (isMobile) {
        return <>{children}</>;
    }

    return (
        <ReactLenis
            root
            options={{
                duration: 0.9,
                lerp: 0.14,
                smoothWheel: true,
            }}
        >
            {children}
        </ReactLenis>
    );
}

export default SmoothScrolling;
