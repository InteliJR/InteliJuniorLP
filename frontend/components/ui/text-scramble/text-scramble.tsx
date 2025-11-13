'use client';
import { type JSX, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, MotionProps } from 'framer-motion';
import styles from './text-scramble.module.css';

type TextScrambleProps = {
    children: string;
    duration?: number;
    speed?: number;
    characterSet?: string;
    as?: React.ElementType;
    className?: string;
    trigger?: boolean;
    playId?: number;
    onScrambleComplete?: () => void;
} & MotionProps;

type TextSegment = {
    start: number;
    end: number;
    isWhitespace: boolean;
};

const defaultChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function TextScramble({
    children,
    duration = 0.8,
    speed = 0.04,
    characterSet = defaultChars,
    className,
    as: Component = 'p',
    trigger = true,
    playId = 0,
    onScrambleComplete,
    ...props
}: TextScrambleProps) {
    const MotionComponent = motion.create(
        Component as keyof JSX.IntrinsicElements
    );
    const [displayText, setDisplayText] = useState(children);
    const [isContainerActive, setIsContainerActive] = useState(false);
    const [activeSegmentIndex, setActiveSegmentIndex] = useState<number | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const isAnimatingRef = useRef(false);
    const glitchStartTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const glitchStopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const scheduleGlitchRef = useRef<() => void>(() => undefined);
    const text = children;
    const segments = useMemo<TextSegment[]>(() => {
        if (text.length === 0) {
            return [];
        }

        const result: TextSegment[] = [];
        let index = 0;

        while (index < text.length) {
            const isWhitespace = /\s/.test(text[index] ?? '');
            const start = index;

            while (index < text.length && /\s/.test(text[index] ?? '') === isWhitespace) {
                index++;
            }

            result.push({ start, end: index, isWhitespace });
        }

        return result;
    }, [text]);

    const wordSegmentIndices = useMemo(() => {
        return segments
            .map((segment, index) => (!segment.isWhitespace && segment.end > segment.start ? index : null))
            .filter((value): value is number => value !== null);
    }, [segments]);

    const clearGlitchTimers = useCallback(() => {
        if (glitchStartTimeoutRef.current) {
            clearTimeout(glitchStartTimeoutRef.current);
            glitchStartTimeoutRef.current = null;
        }

        if (glitchStopTimeoutRef.current) {
            clearTimeout(glitchStopTimeoutRef.current);
            glitchStopTimeoutRef.current = null;
        }
    }, []);

    const scheduleGlitchCycle = useCallback(() => {
        const delay = 1200 + Math.random() * 2000;

        glitchStartTimeoutRef.current = setTimeout(() => {
            glitchStartTimeoutRef.current = null;

            if (!trigger || isAnimatingRef.current) {
                return;
            }

            setIsContainerActive(false);

            if (wordSegmentIndices.length > 0) {
                const randomIndex = wordSegmentIndices[Math.floor(Math.random() * wordSegmentIndices.length)];
                setActiveSegmentIndex(randomIndex);
            } else {
                setIsContainerActive(true);
            }

            const activeDuration = 160 + Math.random() * 280;
            glitchStopTimeoutRef.current = setTimeout(() => {
                glitchStopTimeoutRef.current = null;
                setActiveSegmentIndex(null);
                setIsContainerActive(false);

                if (trigger && !isAnimatingRef.current) {
                    scheduleGlitchRef.current();
                }
            }, activeDuration);
        }, delay);
    }, [trigger, wordSegmentIndices]);

    scheduleGlitchRef.current = scheduleGlitchCycle;

    const scramble = useCallback(() => {
        if (isAnimatingRef.current) return;

        clearGlitchTimers();
        setActiveSegmentIndex(null);
        setIsContainerActive(true);
        isAnimatingRef.current = true;

        const steps = duration / speed;
        let step = 0;

        const interval = setInterval(() => {
            let scrambled = '';
            const progress = step / steps;

            for (let i = 0; i < text.length; i++) {
                if (text[i] === ' ') {
                    scrambled += ' ';
                    continue;
                }

                if (progress * text.length > i) {
                    scrambled += text[i];
                } else {
                    scrambled +=
                        characterSet[Math.floor(Math.random() * characterSet.length)];
                }
            }

            setDisplayText(scrambled);
            step++;

            if (step > steps) {
                clearInterval(interval);
                setDisplayText(text);
                isAnimatingRef.current = false;
                setIsContainerActive(false);
                setActiveSegmentIndex(null);

                if (trigger) {
                    scheduleGlitchRef.current();
                }

                onScrambleComplete?.();
            }
        }, speed * 1000);
        intervalRef.current = interval;
    }, [characterSet, clearGlitchTimers, duration, onScrambleComplete, scheduleGlitchCycle, speed, text, trigger]);

    useEffect(() => {
        if (!trigger) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }

            isAnimatingRef.current = false;
            setIsContainerActive(false);
            setActiveSegmentIndex(null);
            clearGlitchTimers();
            return;
        }

        scramble();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }

            isAnimatingRef.current = false;
            setIsContainerActive(false);
            setActiveSegmentIndex(null);
            clearGlitchTimers();
        };
    }, [scramble, trigger, clearGlitchTimers, playId]);

    const wrapperClassName = [styles.wrapper, className, isContainerActive ? styles.wrapperActive : '']
        .filter(Boolean)
        .join(' ');

    const renderedContent = segments.length
        ? segments.map((segment, index) => {
            const segmentText = displayText.slice(segment.start, segment.end);

            if (segment.isWhitespace) {
                return (
                    <span key={index} className={styles.space}>
                        {segmentText}
                    </span>
                );
            }

            const segmentClassName = [
                styles.segment,
                isContainerActive || activeSegmentIndex === index ? styles.segmentActive : '',
            ]
                .filter(Boolean)
                .join(' ');

            return (
                <span key={index} data-text={segmentText} className={segmentClassName}>
                    {segmentText}
                </span>
            );
        })
        : displayText;

    return (
        <MotionComponent className={wrapperClassName} {...props}>
            {renderedContent}
        </MotionComponent>
    );
}
