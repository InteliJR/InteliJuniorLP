import { useState, useCallback, MouseEvent } from "react";

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

interface TiltState {
  x: number;
  y: number;
}

interface UseTiltOptions {
  /** Intensidade do efeito (menor = mais intenso). Default: 10 */
  intensity?: number;
  /** Delay do throttle em ms. Default: 50 */
  throttleDelay?: number;
}

export function useTilt(options: UseTiltOptions = {}) {
  const { intensity = 10, throttleDelay = 50 } = options;
  const [rotate, setRotate] = useState<TiltState>({ x: 0, y: 0 });

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

  const onMouseLeave = useCallback(() => {
    setRotate({ x: 0, y: 0 });
  }, []);

  const tiltStyle = {
    transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
    transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
  };

  return {
    rotate,
    onMouseMove,
    onMouseLeave,
    tiltStyle,
  };
}
