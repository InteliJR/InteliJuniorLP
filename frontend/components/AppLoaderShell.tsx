"use client";

/**
 * Gate de carregamento da aplicação.
 * - Aguarda `document.readyState === "complete"` para garantir assets críticos carregados.
 * - Exibe splash animado (Loading) e só libera a UI quando animação + DOM estão prontos.
 * - Expõe contexto para que seções saibam se ainda é loading (útil para atrasar animações pesadas).
 */
import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Loading from "@/components/loading/Loading";

type AppLoaderShellProps = {
    children: ReactNode;
};

type AppLoaderContextValue = {
    isDocumentReady: boolean;
    isAnimationComplete: boolean;
    isInitialLoading: boolean;
    isContentVisible: boolean;
};

const AppLoaderContext = createContext<AppLoaderContextValue | undefined>(undefined);

export const useAppLoader = () => {
    const context = useContext(AppLoaderContext);

    if (!context) {
        throw new Error("useAppLoader must be used within AppLoaderShell");
    }

    return context;
};

const AppLoaderShell = ({ children }: AppLoaderShellProps) => {
    const [documentReady, setDocumentReady] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        const handleReadyState = () => {
            if (document.readyState === "complete") {
                setDocumentReady(true);
            }
        };

        // Microtask evita flash quando o DOM já está pronto ao hidratar
        if (document.readyState === "complete") {
            queueMicrotask(() => setDocumentReady(true));
            return;
        }

        window.addEventListener("load", handleReadyState);
        document.addEventListener("readystatechange", handleReadyState);

        return () => {
            window.removeEventListener("load", handleReadyState);
            document.removeEventListener("readystatechange", handleReadyState);
        };
    }, []);

    const handleAnimationComplete = useCallback(() => {
        setAnimationComplete(true);
    }, []);

    const contentVisible = useMemo(() => documentReady && animationComplete, [documentReady, animationComplete]); // Gating duplo: DOM pronto + animação concluída

    return (
        <AppLoaderContext.Provider
            value={{
                isDocumentReady: documentReady,
                isAnimationComplete: animationComplete,
                isInitialLoading: !contentVisible,
                isContentVisible: contentVisible,
            }}
        >
            {!contentVisible && <Loading onComplete={handleAnimationComplete} />}
            <div
                className={`transition-opacity duration-500 ${contentVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                aria-hidden={!contentVisible}
            >
                {children}
            </div>
        </AppLoaderContext.Provider>
    );
};

export default AppLoaderShell;
