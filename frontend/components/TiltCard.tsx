import { ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;

  intensity?: number;

  throttleDelay?: number;

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
