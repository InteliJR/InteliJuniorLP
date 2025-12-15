"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import { ReactNode } from "react";

/**
 * LazyMotion provider para carregar apenas as features necessárias do Framer Motion
 * domAnimation é mais leve que domMax (sem layout animations)
 * Reduz o bundle size em ~17KB
 */
export default function LazyMotionProvider({ children }: { children: ReactNode }) {
    return (
        <LazyMotion features={domAnimation}>
            {children}
        </LazyMotion>
    );
}
