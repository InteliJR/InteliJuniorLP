/**
 * Layout raiz da landing page
 * - Aplica fonte global e tema dark default.
 * - Injeta provedores críticos: LazyMotion (animações),
 *   SmoothScrolling (Lenis) e AppLoaderShell (splash + gate de carregamento).
 * Performance: pré-carrega fonte via next/font (swap) e pré-conecta domínio de imagens remotas.
 */
import "./globals.css";
import type { Metadata } from "next";
import AppLoaderShell from "@/components/AppLoaderShell";
import SmoothScrolling from "@/components/SmoothScrolling";
import LazyMotionProvider from "@/components/LazyMotionProvider";

export const metadata: Metadata = {
  title: "Inteli Júnior",
  description: "Criando soluções como futuramente",
  icons: {
    icon: "/images/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="dark">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <LazyMotionProvider>
          <SmoothScrolling>
            <AppLoaderShell>
              <main className="relative">
                {children}
              </main>
            </AppLoaderShell>
          </SmoothScrolling>
        </LazyMotionProvider>
      </body>
    </html>
  );
}
