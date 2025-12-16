"use client";

/**
 * AuroraFlow: container decorativo com clip-path tech e background cinza escuro.
 * - Serve para criar um efeito de moldura diferenciada com clip-path.
 * - Background com degradê de cinzas elegante.
 */
import React, { useRef, useEffect, forwardRef } from "react";

// Main Component
interface AuroraFlowProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
}

export const AuroraFlow = forwardRef<HTMLDivElement, AuroraFlowProps>(
  ({ children, className = "", id }, ref) => {
    const localRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (ref) {
        if (typeof ref === "function") {
          ref(localRef.current);
        } else {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current =
            localRef.current;
        }
      }
    }, [ref]);

    return (
      <div
        id={id}
        ref={localRef}
        className={`relative overflow-hidden ${className}`}
      >
        <div className="absolute inset-0 -z-10 p-6">
          <div className="relative w-full h-full">
            {/* Tech shape container com background cinza escuro */}
            <div
              className="relative w-full h-full"
              style={{
                clipPath:
                  "polygon(5% 0%, 100% 0%, 100% 92%, 95% 100%, 0% 100%, 0% 8%)",
                background:
                  "linear-gradient(145deg, #1a1a1f 0%, #141418 30%, #0f0f12 60%, #0a0a0d 100%)",
              }}
            />

            {/* SVG Tech Border */}
            <div className="absolute inset-0 pointer-events-none">
              <svg
                className="w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path
                  d="M 5 0 L 100 0 L 100 92 L 95 100 L 0 100 L 0 8 L 5 0 Z"
                  vectorEffect="non-scaling-stroke"
                  className="stroke-1 fill-none stroke-white/15"
                />
              </svg>

              {/* Corner Accents */}
              <svg className="absolute -top-px -left-px w-8 h-8 text-white/30">
                <path
                  d="M 0 20 V 0 H 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <svg className="absolute -bottom-px -right-px w-8 h-8 text-white/30">
                <path
                  d="M 32 12 V 32 H 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Sutil inner glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                clipPath:
                  "polygon(5% 0%, 100% 0%, 100% 92%, 95% 100%, 0% 100%, 0% 8%)",
                boxShadow: "inset 0 0 40px rgba(255,255,255,0.03)",
              }}
            />
          </div>
        </div>
        <div className="relative w-full h-full">{children}</div>
      </div>
    );
  }
);

AuroraFlow.displayName = "AuroraFlow";
