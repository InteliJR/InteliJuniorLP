"use client";

import React, { useState, useCallback, MouseEvent, ReactNode } from "react";

function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Intensidade do efeito (menor = mais intenso). Default: 12 */
  intensity?: number;
  /** Delay do throttle em ms. Default: 50 */
  throttleDelay?: number;
  /** Escala no hover. Default: 1.02 */
  hoverScale?: number;
}

export function TiltCard({
  children,
  className = "",
  intensity = 12,
  throttleDelay = 50,
  hoverScale = 1.02,
}: TiltCardProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const onMouseMove = useCallback(
    throttle((e: MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      const box = card.getBoundingClientRect();
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      const centerX = box.width / 2;
      const centerY = box.height / 2;
      const rotateX = (y - centerY) / intensity;
      const rotateY = (centerX - x) / intensity;

      setRotate({ x: rotateX, y: rotateY });
    }, throttleDelay),
    [intensity, throttleDelay]
  );

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      className={`will-change-transform ${className}`}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${isHovered ? hoverScale : 1}, ${isHovered ? hoverScale : 1}, 1)`,
        transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
      }}
    >
      {children}
    </div>
  );
}
