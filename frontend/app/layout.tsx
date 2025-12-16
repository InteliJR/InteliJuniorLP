/**
 * Layout raiz da landing page
 * - Aplica fonte global e tema dark default.
 * - Injeta provedores críticos: LazyMotion (animações), ClientCursor (cursor desktop),
 *   SmoothScrolling (Lenis) e AppLoaderShell (splash + gate de carregamento).
 * - Mantém o <Header /> fixo e envelopa o conteúdo em <main>.
 * Performance: pré-carrega fonte via next/font (swap) e pré-conecta domínio de imagens remotas.
 */
import "./globals.css";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import AppLoaderShell from "@/components/AppLoaderShell";
import Header from "@/components/ui/Headerr";
import SmoothScrolling from "@/components/SmoothScrolling";
import ClientCursor from "@/components/ClientCursor";
import LazyMotionProvider from "@/components/LazyMotionProvider";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap", // mantém texto visível com fallback enquanto a fonte carrega
  preload: true,
});

export const metadata: Metadata = {
  title: "Inteli Junior",
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
      {/* cursor custom só em desktop; mobile mantém cursor padrão */}
      <body className={`${jetBrainsMono.variable} antialiased md:cursor-none`}>
        <LazyMotionProvider>
          <ClientCursor />
          <SmoothScrolling>
            <AppLoaderShell>
              <>
                <Header />
                <main className="relative">
                  {children}
                </main>
              </>
            </AppLoaderShell>
          </SmoothScrolling>
        </LazyMotionProvider>
      </body>
    </html>
  );
}
