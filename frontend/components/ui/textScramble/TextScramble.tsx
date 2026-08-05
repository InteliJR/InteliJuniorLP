'use client';
import { createElement, ReactNode, useEffect } from 'react';
import { MotionProps } from 'framer-motion';

type TextScrambleProps = {
    children: ReactNode;
    duration?: number;
    speed?: number;
    characterSet?: string;
    as?: React.ElementType;
    className?: string;
    trigger?: boolean;
    playId?: number;
    onScrambleComplete?: () => void;
    idleGlitch?: boolean;
} & MotionProps;

export function TextScramble({
    children,
    className,
    as: Component = 'p',
    onScrambleComplete,
    duration,
    speed,
    characterSet,
    trigger,
    playId,
    idleGlitch,
    ...props
}: TextScrambleProps) {
    void duration;
    void speed;
    void characterSet;
    void trigger;
    void playId;
    void idleGlitch;

    useEffect(() => {
        onScrambleComplete?.();
    }, [children, onScrambleComplete]);

    return createElement(Component, { className, ...props }, children);
}
