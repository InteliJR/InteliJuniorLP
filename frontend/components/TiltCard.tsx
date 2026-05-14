import { ReactNode } from "react";

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
}: TiltCardProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
